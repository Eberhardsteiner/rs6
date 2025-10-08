// src/services/multiplayerService.ts
import { supabase, type Game, type Player, type GameAdminSettings } from './supabaseClient';
import { makeRng } from '@/core/utils/prng';
import type { GameState, KPI, RoleId, DayNewsItem } from '@/core/models/domain';
import { DEFAULT_KPI_VALUES, validateAndClampKpi, generateSessionCode } from './kpiDefaults';


// Error types for robust error handling
export type MPErrorCode =
  | 'ROLE_TAKEN'
  | 'GAME_NOT_FOUND'
  | 'GAME_ENDED'
  | 'NETWORK_ERROR'
  | 'UNAUTHORIZED'
  | 'UNKNOWN';

export interface MPError {
  code: MPErrorCode;
  message: string;
  originalError?: Error;
}

export class MultiplayerService {
  private static instance: MultiplayerService;
  private gameId: string | null = null;
  private playerId: string | null = null;
  private userId: string | null = null;
  private currentPlayerName: string | null = null;
  private currentRole: RoleId | null = null;
  private subscriptions: any[] = [];
  private presenceChannel: any = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  static getInstance(): MultiplayerService {
    if (!MultiplayerService.instance) {
      MultiplayerService.instance = new MultiplayerService();
    }
    return MultiplayerService.instance;
  }

  
  // ===== Seed helpers (auto-deterministic MP) =====

  // Hilfsfunktion: stabilen 32-bit-Seed aus einer UUID ableiten (Fallback, wenn DB-Write nicht möglich)
  private deriveSeedFromGameId(id: string): number {
    try {
      const hex = id.replace(/-/g, '').slice(0, 8);
      const n = parseInt(hex, 16) >>> 0;
      return n || (Date.now() >>> 0);
    } catch {
      return (Date.now() >>> 0);
    }
  }

  /**
   * Stellt sicher, dass für dieses Spiel ein Seed existiert.
   * - Versucht zunächst, den vorhandenen Seed aus game_admin_settings zu lesen.
   * - Falls leer: setzt ihn einmalig (update where seed is null) oder upsertet eine neue Zeile.
   * - Falls DB-Schreiben nicht erlaubt ist, fällt deterministisch auf deriveSeedFromGameId(...) zurück.
   */
  public async ensureSeed(gameId?: string): Promise<number> {
    const gid = gameId || this.gameId!;
    if (!gid) throw new Error('ensureSeed(): no game id');

    // 1) Versuche zu lesen
    try {
      const { data: row } = await supabase
        .from('game_admin_settings')
        .select('seed')
        .eq('game_id', gid)
        .maybeSingle();
      if (row?.seed != null) {
        (globalThis as any).__gameSeed = row.seed;
        return row.seed;
      }
    } catch (_) {
      // no-op -> Fallback unten
    }

    // 2) Kandidaten-Seed erzeugen (Crypto, danach Fallback aus gameId)
    const candidate =
      globalThis.crypto?.getRandomValues?.(new Uint32Array(1))[0] ??
      this.deriveSeedFromGameId(gid);

    // 3) Versuche, Seed zu setzen wenn Zeile existiert und seed NULL ist
    try {
      const { error, count } = await (supabase as any)
        .from('game_admin_settings')
        .update({ seed: candidate, updated_at: new Date().toISOString() })
        .eq('game_id', gid)
        .is('seed', null)
        .select('seed', { count: 'exact' });
      if (!error && count && count > 0) {
        (globalThis as any).__gameSeed = candidate;
        return candidate;
      }
    } catch (_) { /* weiter */ }

    // 4) Upsert: lege Zeile ggf. an (onConflict=game_id)
    try {
      await (supabase as any)
        .from('game_admin_settings')
        .upsert(
          { game_id: gid, seed: candidate, settings: {}, updated_at: new Date().toISOString() },
          { onConflict: 'game_id', ignoreDuplicates: true }
        );
    } catch (_) { /* kann bei RLS scheitern */ }

    // 5) Read-back (falls ein anderer Client schneller war oder Upsert ignoriert wurde)
    try {
      const { data: row2 } = await supabase
        .from('game_admin_settings')
        .select('seed')
        .eq('game_id', gid)
        .maybeSingle();
      const finalSeed = row2?.seed ?? candidate;
      (globalThis as any).__gameSeed = finalSeed;
      return finalSeed;
    } catch {
      (globalThis as any).__gameSeed = candidate;
      return candidate; // deterministischer Fallback (aus gameId)
    }
  }

// ============ AUTH METHODS ============

  async signInAnonymously(playerName: string): Promise<void> {
    try {
      // Erstelle einen temporären Account für den Spieler
      const tempEmail = `player_${Date.now()}_${Math.random().toString(36).substring(7)}@temp.local`;
      const tempPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      const { data, error } = await supabase.auth.signUp({
        email: tempEmail,
        password: tempPassword,
        options: {
          data: { display_name: playerName }
        }
      });

      if (error) throw new Error('Anmeldung fehlgeschlagen: ' + error.message);
      if (!data.user) throw new Error('Kein User nach Anmeldung');

      this.userId = data.user.id;
      this.currentPlayerName = playerName;

      // Speichern für Session-Wiederherstellung
      localStorage.setItem('mp_user_id', data.user.id);
      localStorage.setItem('mp_user_name', playerName);
      localStorage.setItem('mp_temp_email', tempEmail);
      localStorage.setItem('mp_temp_password', tempPassword);

      console.log('Anonymous sign in successful:', this.userId);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

    async signInWithPreset(role: RoleId, username: string, password: string): Promise<void> {
    try {
      const tempEmail = `preset_${role.toLowerCase()}_${Date.now()}@temp.local`;

      const { data, error } = await supabase.auth.signUp({
        email: tempEmail,
        password,
        options: { data: { display_name: username, role } }
      });

      if (error) throw error;
      if (!data.user) throw new Error('Kein User erstellt');

      this.userId = data.user.id;
      this.currentPlayerName = username;
      // Client-seitig IMMER UPPERCASE führen (DB-Schreibpfade normalisieren selbst)
      this.currentRole = (role as string).toUpperCase() as RoleId;

      localStorage.setItem('mp_user_id', data.user.id);
      localStorage.setItem('mp_user_name', username);
      localStorage.setItem('mp_user_role', this.currentRole);
      // WICHTIG: damit getCurrentRole() stabil funktioniert
      localStorage.setItem('mp_current_role', this.currentRole);
      localStorage.setItem('mp_temp_email', tempEmail);

      console.log('Preset sign in successful:', this.userId, this.currentRole);
    } catch (error) {
      console.error('Preset sign in error:', error);
      throw error;
    }
  }


  async signInWithEmail(email: string, password: string): Promise<void> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      if (!data.user) throw new Error('Login fehlgeschlagen');
      
      this.userId = data.user.id;
      this.currentPlayerName = data.user.user_metadata?.display_name || email.split('@')[0];
      
      localStorage.setItem('mp_user_id', data.user.id);
      localStorage.setItem('mp_user_name', this.currentPlayerName);
      
      console.log('Email sign in successful:', this.userId);
    } catch (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
  }

  // ============ GAME METHODS ============

  async createGame(params: { 
    name: string; 
    max_players?: number; 
    settings?: any 
  }): Promise<{ gameId: string }> {
    try {
      // Stelle sicher, dass User angemeldet ist
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Nicht authentifiziert');

      // Generiere sicheren 6-stelligen Session-Code
      const sessionCode = generateSessionCode();
      console.log('[MP-Service] Creating game with code:', sessionCode);

      // Game erstellen mit standardisierten KPI-Werten
      const { data: game, error: gameError } = await supabase
        .from('games')
        .insert({
          session_code: sessionCode,
          host_id: user.id,
          state: 'lobby',
          status: 'waiting',
          current_day: 1,
          difficulty: params.settings?.difficulty || 'medium',
          game_mode: params.settings?.gameMode || 'standard',
          scenario_data: params.settings || {},
          theme: 'default',
          max_players: params.max_players || 4,
          kpi_values: DEFAULT_KPI_VALUES
        })
        .select()
        .single();

      if (gameError) {
        console.error('[MP-Service] Game creation error:', {
          error: gameError,
          message: gameError.message,
          details: gameError.details,
          hint: gameError.hint
        });
        throw new Error('Spiel konnte nicht erstellt werden: ' + gameError.message);
      }

      console.log('[MP-Service] Game created successfully:', game.id);

      // Als Host beitreten - NUR mit existierenden Spalten
      const { data: player, error: playerError } = await supabase
        .from('players')
        .insert({
          game_id: game.id,
          user_id: user.id,
          role: (this.currentRole || 'CEO').toLowerCase(),
          display_name: this.currentPlayerName || 'Host',
          is_ready: false,
          game_state: {}
        })
        .select()
        .single();

      if (playerError) {
        // Cleanup: Game löschen wenn Player nicht erstellt werden kann
        await supabase.from('games').delete().eq('id', game.id);
        throw new Error('Spieler konnte nicht erstellt werden: ' + playerError.message);
      }

            this.gameId = game.id;
      this.playerId = player.id;

      // Client-Rolle setzen (UPPERCASE)
      const assignedRole = (this.currentRole ? String(this.currentRole) : 'CEO').toUpperCase() as RoleId;
      this.currentRole = assignedRole;

      // In localStorage speichern
      localStorage.setItem('mp_current_game', game.id);
      localStorage.setItem('mp_player_id', player.id);
      localStorage.setItem('mp_current_role', this.currentRole as string);
      
      console.log('Game created successfully:', game.id);
      return { gameId: game.id };

      
    } catch (error) {
      console.error('Create game failed:', error);
      throw error;
    }
  }

  async joinGame(gameId: string, playerName: string, role?: RoleId): Promise<void> {
    try {
      // User prüfen
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Nicht authentifiziert');

      // Prüfen ob schon im Spiel
      const { data: existing, error: checkError } = await supabase
        .from('players')
        .select()
        .eq('game_id', gameId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        console.log('Already in game, updating...');
        // Update existing player - NUR mit existierenden Spalten
        const { error: updateError } = await supabase
          .from('players')
          .update({
            role: (role || existing.role).toLowerCase(),
            display_name: playerName || existing.display_name,
            last_seen: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (updateError) {
          // Spezifische Behandlung für Unique-Constraint-Verletzung
          if (updateError.code === '23505' || updateError.message?.includes('duplicate key') || updateError.message?.includes('idx_players_game_role_unique')) {
            throw new Error('Diese Rolle ist bereits belegt. Bitte wähle eine andere Rolle.');
          }
          throw updateError;
        }
        
        this.gameId = gameId;
        this.playerId = existing.id;
        this.currentRole = (role || existing.role)?.toLowerCase() || null;
      } else {
        // Neuen Player erstellen - NUR mit existierenden Spalten
        const { data: player, error } = await supabase
          .from('players')
          .insert({
            game_id: gameId,
            user_id: user.id,
            role: (role || 'CEO').toLowerCase(),
            display_name: playerName,
            is_ready: false,
            game_state: {}
          })
          .select()
          .single();

        if (error) {
          console.error('Join game error:', error);

          // Spezifische Behandlung für Unique-Constraint-Verletzung (Rolle bereits belegt)
          if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('idx_players_game_role_unique')) {
            throw new Error('Diese Rolle ist bereits belegt. Bitte wähle eine andere Rolle.');
          }

          throw new Error('Beitritt fehlgeschlagen: ' + error.message);
        }

        this.gameId = gameId;
        this.playerId = player.id;
        this.currentRole = role?.toLowerCase() || null;
      }
      
      this.currentPlayerName = playerName;
      
      // In localStorage speichern
      localStorage.setItem('mp_current_game', gameId);
      localStorage.setItem('mp_player_id', this.playerId);
      if (role) localStorage.setItem('mp_current_role', role);
      
      console.log('Joined game successfully:', gameId);
    } catch (error) {
      console.error('Join game failed:', error);
      throw error;
    }
  }

    async selectRole(role: RoleId): Promise<void> {
    if (!this.playerId) throw new Error('Not in game');

    const dbRole = String(role).toLowerCase();
    const { error } = await supabase
      .from('players')
      .update({ role: dbRole })
      .eq('id', this.playerId);

    if (error) {
      // ...
    }

    // Client-seitig konsequent UPPERCASE
    this.currentRole = (String(role).toUpperCase() as RoleId);
    localStorage.setItem('mp_current_role', this.currentRole);
  }


  async setPlayerReady(ready: boolean = true): Promise<void> {
    if (!this.playerId) throw new Error('Not in game');

    const { error } = await supabase
      .from('players')
      .update({
        is_ready: ready,
        last_seen: new Date().toISOString()
      })
      .eq('id', this.playerId);

    if (error) throw error;
  }

  async getGameInfo(): Promise<{ 
    game: Game; 
    players: Player[]; 
    settings?: any;
  }> {
    if (!this.gameId) {
      // Versuche aus localStorage zu laden
      const savedGameId = localStorage.getItem('mp_current_game');
      if (savedGameId) {
        this.gameId = savedGameId;
      } else {
        throw new Error('Not in game');
      }
    }

    try {
      // Game Info
      const { data: game, error: gameError } = await supabase
        .from('games')
        .select()
        .eq('id', this.gameId)
        .single();

      if (gameError) throw gameError;

      // Players Info - sortiere nach joined_at statt created_at
      const { data: players, error: playersError } = await supabase
        .from('players')
        .select()
        .eq('game_id', this.gameId)
        .order('joined_at', { ascending: true });

      if (playersError) throw playersError;

      return {
        game: this.normalizeGame(game as Game),
        players: players || [],
        settings: (async () => {

  

          
          try {
            const { data: admin } = await supabase
              .from('game_admin_settings')
              .select('seed, settings')
              .eq('game_id', this.gameId)
              .maybeSingle();
            let seed = admin?.seed as number | undefined;
            if (seed == null) {
              seed = await this.ensureSeed();
            }
            const merged = { ...(admin?.settings || {}), ...(seed != null ? { seed } : {}) };
            return merged;
          } catch {
            const seed = await this.ensureSeed();
            return { seed };
          }
        })() as any
      };
    } catch (error) {
      console.error('Get game info failed:', error);
      throw error;
    }
  }

  async startGame(): Promise<void> {
    if (!this.gameId) throw new Error('Not in game');

    // Genereller Fix: ausschliesslich über RPC starten
    await this.setGameStatus(this.gameId, 'running');
    console.log('Game started via RPC');
  }
  

  // ============ REAL-TIME SUBSCRIPTIONS ============

  subscribeToGameUpdates(
    onGameUpdate: (game: Game) => void,
    onPlayerUpdate: (players: Player[]) => void
  ) {
    if (!this.gameId) {
      console.error('Cannot subscribe: No game ID');
      return;
    }

    // Game updates
    const gameChannel = supabase
      .channel(`game-${this.gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games',
          filter: `id=eq.${this.gameId}`
        },
        (payload) => {
          console.log('Game update:', payload);
          if (payload.new) {
                       onGameUpdate(this.normalizeGame(payload.new as Game));

          }
        }
      )
      .subscribe();

    // Player updates
    const playerChannel = supabase
      .channel(`players-${this.gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `game_id=eq.${this.gameId}`
        },
        async () => {
          // Refetch all players
          const { data } = await supabase
            .from('players')
            .select()
            .eq('game_id', this.gameId!)
            .order('joined_at', { ascending: true });
          
          if (data) {
            console.log('Players update:', data);
            onPlayerUpdate(data);
          }
        }
      )
      .subscribe();

    this.subscriptions.push(gameChannel, playerChannel);
  }

  unsubscribeAll() {
    this.subscriptions.forEach(channel => {
      supabase.removeChannel(channel);
    });
    this.subscriptions = [];
  }

  // ============ HELPER METHODS ============

    /**
   * Normalisiert Game-Objekte aus Realtime/Reads, so dass 'state' und 'status' konsistent sind.
   * - Wenn entweder state oder status 'running' ist, werden beide auf 'running' gesetzt.
   * - Wenn entweder state oder status 'finished' ist, werden beide auf 'finished' gesetzt.
   * (Nur im zurückgegebenen Objekt; es erfolgt kein DB-Write.)
   */
    private normalizeGame(game: Game): Game {
    if (!game) return game;
    const g = { ...game };

    // 'state' ist die maßgebliche Laufanzeige.
    // Falls ein Client 'status' lokal auf 'running' gesetzt hatte, erzwinge das NICHT.
    // Wir vertrauen der DB-Domäne: status bleibt 'waiting'|'ready'|'starting'.
    if (g.state === 'running') {
      // nichts weiter tun; UI prüft auf state
    } else if (g.state === 'ended' || (g as any).state === 'finished') {
      g.state = 'ended';
    }

    return g;
  }



  async leaveGame(): Promise<void> {
    // Stop heartbeat
    this.stopHeartbeat();

    if (this.playerId) {
      try {
        // Use RPC to soft-delete (set left_at)
        await supabase.rpc('rpc_mark_player_left', { p_player_id: this.playerId });
      } catch (error) {
        console.error('Error marking player as left:', error);
        // Fallback: direct delete
        await supabase
          .from('players')
          .delete()
          .eq('id', this.playerId);
      }
    }

    this.gameId = null;
    this.playerId = null;
    this.currentPlayerName = null;
    this.currentRole = null;
    this.unsubscribeAll();

    // Clear localStorage
    localStorage.removeItem('mp_current_game');
    localStorage.removeItem('mp_player_id');
    localStorage.removeItem('mp_current_role');
  }

  // ============ NEW METHODS FOR ROBUST MULTIPLAYER ============

  /**
   * Parse error from Supabase RPC call to structured MPError
   */
  private parseRPCError(error: any): MPError {
    const message = error?.message || String(error);

    if (message.includes('ROLE_TAKEN')) {
      return {
        code: 'ROLE_TAKEN',
        message: 'Diese Rolle ist bereits belegt. Bitte wähle eine andere Rolle.',
        originalError: error
      };
    }
    if (message.includes('GAME_NOT_FOUND')) {
      return {
        code: 'GAME_NOT_FOUND',
        message: 'Spiel nicht gefunden. Bitte überprüfe den Spiel-Code.',
        originalError: error
      };
    }
    if (message.includes('GAME_ENDED')) {
      return {
        code: 'GAME_ENDED',
        message: 'Dieses Spiel ist bereits beendet.',
        originalError: error
      };
    }
    if (message.includes('UNAUTHORIZED')) {
      return {
        code: 'UNAUTHORIZED',
        message: 'Du bist nicht berechtigt, diese Aktion auszuführen.',
        originalError: error
      };
    }
    if (message.includes('network') || message.includes('fetch') || message.includes('timeout')) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Netzwerkfehler. Bitte überprüfe deine Verbindung.',
        originalError: error
      };
    }

    return {
      code: 'UNKNOWN',
      message: 'Ein unbekannter Fehler ist aufgetreten.',
      originalError: error
    };
  }

  /**
   * Claim a role and join game using new RPC function with robust error handling
   * Includes exponential backoff retry logic for network errors
   */
  async claimRoleAndJoin(
    gameId: string,
    desiredRole: RoleId,
    playerName: string,
    maxRetries: number = 3
  ): Promise<Player> {
    let lastError: MPError | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const { data, error } = await supabase.rpc('rpc_claim_role_and_join', {
          p_game_id: gameId,
          p_desired_role: desiredRole,
          p_player_name: playerName
        });

        if (error) {
          lastError = this.parseRPCError(error);

          // Don't retry on non-network errors
          if (lastError.code !== 'NETWORK_ERROR') {
            throw lastError;
          }

          // Exponential backoff for network errors
          const delayMs = Math.min(1000 * Math.pow(2, attempt), 5000);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }

        if (!data) {
          throw new Error('No player data returned from RPC');
        }

        // Success - update local state
        this.gameId = gameId;
        this.playerId = data.id;
        this.currentRole = desiredRole;
        this.currentPlayerName = playerName;

        // Update localStorage
        localStorage.setItem('mp_current_game', gameId);
        localStorage.setItem('mp_player_id', data.id);
        localStorage.setItem('mp_current_role', desiredRole);

        console.log('Successfully claimed role:', desiredRole, 'in game:', gameId);

        return data as Player;
      } catch (error) {
        if (attempt === maxRetries - 1) {
          lastError = lastError || this.parseRPCError(error);
          throw lastError;
        }
      }
    }

    throw lastError || this.parseRPCError(new Error('Failed after retries'));
  }

  /**
   * Observe a game with comprehensive real-time subscriptions
   * Sets up postgres_changes and Presence tracking
   */
  observeGame(
    gameId: string,
    callbacks: {
      onGameUpdate?: (game: Game) => void;
      onPlayersUpdate?: (players: Player[]) => void;
      onPresenceSync?: (presence: any) => void;
    }
  ): { unsubscribe: () => void } {
    const channels: any[] = [];

    // Subscribe to game updates
    if (callbacks.onGameUpdate) {
      const gameChannel = supabase
        .channel(`game-updates-${gameId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'games',
            filter: `id=eq.${gameId}`
          },
          (payload) => {
            console.log('Game update:', payload);
            if (payload.new) {
                           callbacks.onGameUpdate?.(this.normalizeGame(payload.new as Game));

            }
          }
        )
        .subscribe();

      channels.push(gameChannel);
      this.subscriptions.push(gameChannel);
    }

    // Subscribe to player updates
    if (callbacks.onPlayersUpdate) {
      const playersChannel = supabase
        .channel(`players-updates-${gameId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'players',
            filter: `game_id=eq.${gameId}`
          },
          async () => {
            // Refetch all active players
            const { data } = await supabase
              .from('players')
              .select('*')
              .eq('game_id', gameId)
              .is('left_at', null)
              .order('joined_at', { ascending: true });

            if (data) {
              console.log('Players update:', data);
              callbacks.onPlayersUpdate?.(data as Player[]);
            }
          }
        )
        .subscribe();

      channels.push(playersChannel);
      this.subscriptions.push(playersChannel);
    }

    // Set up Presence tracking
    if (callbacks.onPresenceSync) {
      this.presenceChannel = supabase
        .channel(`presence-${gameId}`, {
          config: {
            presence: {
              key: this.userId || 'anonymous'
            }
          }
        })
        .on('presence', { event: 'sync' }, () => {
          const state = this.presenceChannel.presenceState();
          console.log('Presence sync:', state);
          callbacks.onPresenceSync?.(state);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          console.log('Presence join:', key, newPresences);
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          console.log('Presence leave:', key, leftPresences);
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED' && this.playerId) {
            // Track presence
            await this.presenceChannel.track({
              user_id: this.userId,
              player_id: this.playerId,
              role: this.currentRole,
              online_at: new Date().toISOString()
            });
          }
        });

      channels.push(this.presenceChannel);
      this.subscriptions.push(this.presenceChannel);
    }

    return {
      unsubscribe: () => {
        channels.forEach(ch => supabase.removeChannel(ch));
        if (this.presenceChannel) {
          this.presenceChannel.untrack();
          this.presenceChannel = null;
        }
      }
    };
  }

  /**
   * Start heartbeat to update last_seen every 30 seconds
   */
  startHeartbeat(): void {
    if (this.heartbeatInterval) {
      return; // Already running
    }

    const updateHeartbeat = async () => {
      if (!this.playerId) return;

      try {
        await supabase
          .from('players')
          .update({
            last_seen: new Date().toISOString(),
            is_active: true
          })
          .eq('id', this.playerId);

        console.log('Heartbeat updated');
      } catch (error) {
        console.error('Heartbeat failed:', error);
      }
    };

    // Initial heartbeat
    updateHeartbeat();

    // Set interval for 30 seconds
    this.heartbeatInterval = setInterval(updateHeartbeat, 30000);
    console.log('Heartbeat started');
  }

  /**
   * Stop heartbeat
   */
  stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
      console.log('Heartbeat stopped');
    }
  }

  /**
   * Set game status (for host/trainer)
   */
  async setGameStatus(gameId: string, newStatus: 'lobby' | 'waiting' | 'running' | 'ended'): Promise<void> {
    try {
      const { error } = await supabase.rpc('rpc_set_game_status', {
        p_game_id: gameId,
        p_new_status: newStatus
      });

      if (error) {
        const mpError = this.parseRPCError(error);
        throw mpError;
      }

      console.log('Game status updated to:', newStatus);
    } catch (error) {
      console.error('Failed to set game status:', error);
      throw error;
    }
  }

  /**
   * Get occupied roles for a game (for UI role selection)
   */
    async getOccupiedRoles(gameId: string): Promise<Set<RoleId>> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('role, user_id')
        .eq('game_id', gameId)
        .is('left_at', null)
        .not('role', 'is', null);

      if (error) throw error;

      const currentUserId = (await supabase.auth.getUser()).data.user?.id;
      const occupied = new Set<RoleId>();

      (data || []).forEach((player: any) => {
        // Don't mark role as occupied if it's the current user's role
        if (player.role && player.user_id !== currentUserId) {
          occupied.add(String(player.role).toUpperCase() as RoleId); // ⇐ Normalisierung auf UPPERCASE
        }
      });

      return occupied;
    } catch (error) {
      console.error('Error fetching occupied roles:', error);
      return new Set();
    }
  }


  getCurrentGameId(): string | null {
    return this.gameId || localStorage.getItem('mp_current_game');
  }

  getCurrentPlayerId(): string | null {
    return this.playerId || localStorage.getItem('mp_player_id');
  }

   getCurrentRole(): RoleId | null {
    const inMem = this.currentRole ? (String(this.currentRole).toUpperCase() as RoleId) : null;
    if (inMem) return inMem;
    const fromLS = localStorage.getItem('mp_current_role') || localStorage.getItem('mp_user_role');
    return fromLS ? (String(fromLS).toUpperCase() as RoleId) : null;
  }


    static getRoleKpiVisibility(role: RoleId): (keyof KPI)[] {
    const key = (String(role || '') as string).toUpperCase() as RoleId;
    const visibility: Record<RoleId, (keyof KPI)[]> = {
      CEO: ['cashEUR', 'profitLossEUR', 'publicPerception', 'bankTrust'],
      CFO: ['cashEUR', 'profitLossEUR', 'bankTrust'],
      OPS: ['cashEUR', 'profitLossEUR', 'customerLoyalty'],
      HRLEGAL: ['publicPerception', 'workforceEngagement', 'bankTrust'],
      TRAINER: ['cashEUR', 'profitLossEUR', 'customerLoyalty', 'bankTrust', 'workforceEngagement', 'publicPerception']
    };
    return visibility[key] || [];
  }


  async isGameMaster(): Promise<boolean> {
    if (!this.playerId) return false;
    
    const { data } = await supabase
      .from('players')
      .select('is_gm')
      .eq('id', this.playerId)
      .single();
    
    return data?.is_gm || false;
  }

  /** Begrenzungen und Rundungen für KPI-Werte (delegiert an kpiDefaults) */
  private clampKpi(k: Partial<KPI>): KPI {
    return validateAndClampKpi(k);
  }

  /**
   * Admin-KPI-Update für Multiplayer: setzt oder addiert KPI-Werte und persistiert diese in Supabase.
   * Schreibt zusätzlich ein Event 'admin_kpi_change' und (best-effort) einen Snapshot.
   */
  async adminUpdateKpi(
    gameId: string,
    action: 'set' | 'add',
    payload: Partial<KPI>,
    reason?: string
  ): Promise<{ prev: KPI; next: KPI }> {
    if (!gameId) throw new Error('gameId required');

    // Aktuelle KPI laden
    const { data: game, error: selErr } = await supabase
      .from('games')
      .select('kpi_values, current_day')
      .eq('id', gameId)
      .single();
    if (selErr) throw selErr;

    const prev: KPI = validateAndClampKpi((game as any)?.kpi_values || {});

    let next: KPI = { ...prev };
    if (action === 'set') {
      next = this.clampKpi({ ...prev, ...payload } as KPI);
    } else {
      const d = payload;
      next = this.clampKpi({
        cashEUR: (prev.cashEUR || 0) + (Number(d.cashEUR) || 0),
        profitLossEUR: (prev.profitLossEUR || 0) + (Number(d.profitLossEUR) || 0),
        customerLoyalty: (prev.customerLoyalty || 0) + (Number(d.customerLoyalty) || 0),
        bankTrust: (prev.bankTrust || 0) + (Number(d.bankTrust) || 0),
        workforceEngagement: (prev.workforceEngagement || 0) + (Number(d.workforceEngagement) || 0),
        publicPerception: (prev.publicPerception || 0) + (Number(d.publicPerception) || 0),
      });
    }

    // Persistieren → Realtime triggert bei allen Clients
    const { error: updErr } = await supabase
      .from('games')
      .update({ kpi_values: next })
      .eq('id', gameId);
    if (updErr) throw updErr;

    // Event-Log (best-effort)
    try {
      await supabase.from('events').insert({
        game_id: gameId,
        day: (game as any).current_day,
        type: 'admin_kpi_change',
        content: {
          action,
          payload,
          prev,
          next,
          reason: reason || null,
          by: this.userId || null,
          ts: new Date().toISOString()
        }
      });
    } catch {}

    // Snapshot (wichtig für KPI-Historie)
    try {
      const { error: snapErr } = await supabase.from('game_state_snapshots').insert({
        game_id: gameId,
        day: (game as any).current_day,
        kpi: next,  // Direkt als JSONB-Feld
        state: {
          kpi: next,
          source: 'admin_kpi_change',
          prev: prev,
          delta: payload,
          action,
          ts: new Date().toISOString()
        },
        type: 'admin_kpi_change'
      });
      if (snapErr) {
        console.warn('Admin KPI-Snapshot konnte nicht erstellt werden:', snapErr);
      }
    } catch (e) {
      console.warn('Fehler beim Erstellen des Admin-KPI-Snapshots:', e);
    }

    return { prev, next };
  }

  /**
   * Setzt den aktuellen Tag eines MP-Spiels ABSOLUT (ohne KPI-Neuberechnung).
   * Persistiert in `games.current_day`, loggt ein Event und legt einen Snapshot an.
   */
  async adminSetDay(
    gameId: string,
    newDay: number,
    reason?: string
  ): Promise<{ prevDay: number; nextDay: number; kpi: KPI }> {
    if (!gameId) throw new Error('gameId required');

    // Aktuellen Zustand laden
    const { data: game, error: selErr } = await supabase
      .from('games')
      .select('id, current_day, kpi_values')
      .eq('id', gameId)
      .single();
    if (selErr) throw selErr;

    const prevDay = Number((game as any)?.current_day) || 1;
    const kpi: KPI = validateAndClampKpi((game as any)?.kpi_values || {});

    // Tag begrenzen (1..14)
    const nextDay = Math.max(1, Math.min(14, Math.round(newDay)));

    // Persistieren: nur current_day (KPI bleibt unverändert)
    const { error: updErr } = await supabase
      .from('games')
      .update({ current_day: nextDay })
      .eq('id', gameId);
    if (updErr) throw updErr;

    // Event-Log (best-effort)
    try {
      await supabase.from('events').insert({
        game_id: gameId,
        day: nextDay,
        type: 'admin_day_set',
        content: {
          prevDay,
          nextDay,
          reason: reason || null,
          by: this.userId || null,
          ts: new Date().toISOString()
        }
      });
    } catch {}

    // Snapshot (wichtig für KPI-Historie) – dokumentiert Sprung ohne KPI-Änderung
    try {
      const { error: snapErr } = await supabase.from('game_state_snapshots').insert({
        game_id: gameId,
        day: nextDay,
        kpi: kpi,  // Direkt als JSONB-Feld
        state: {
          kpi,
          source: 'admin_day_set',
          prevDay,
          ts: new Date().toISOString()
        },
        type: 'admin_day_set'
      });
      if (snapErr) {
        console.warn('Admin Day-Set-Snapshot konnte nicht erstellt werden:', snapErr);
      }
    } catch (e) {
      console.warn('Fehler beim Erstellen des Day-Set-Snapshots:', e);
    }

    return { prevDay, nextDay, kpi };
  }

  /**
   * Erzwingt einen Tageswechsel (prev→prev+1) OHNE KPI-Neuberechnung.
   * Sinnvoll als Admin-Override, falls Entscheidungen/Timer hängen.
   */
  async adminAdvanceDayForce(
    gameId: string,
    reason?: string
  ): Promise<{ prevDay: number; nextDay: number; kpi: KPI }> {
    if (!gameId) throw new Error('gameId required');

    // Aktuellen Zustand laden
    const { data: game, error: selErr } = await supabase
      .from('games')
      .select('id, current_day, kpi_values')
      .eq('id', gameId)
      .single();
    if (selErr) throw selErr;

    const prevDay = Number((game as any)?.current_day) || 1;
    const kpi: KPI = validateAndClampKpi((game as any)?.kpi_values || {});
    const nextDay = Math.max(1, Math.min(14, prevDay + 1));

    // Persistieren
    const { error: updErr } = await supabase
      .from('games')
      .update({ current_day: nextDay })
      .eq('id', gameId);
    if (updErr) throw updErr;

    // Event-Log (best-effort)
    try {
      await supabase.from('events').insert({
        game_id: gameId,
        day: nextDay,
        type: 'admin_day_advance_forced',
        content: {
          prevDay,
          nextDay,
          reason: reason || null,
          by: this.userId || null,
          ts: new Date().toISOString()
        }
      });
    } catch {}

    // Snapshot (wichtig für KPI-Historie)
    try {
      const { error: snapErr } = await supabase.from('game_state_snapshots').insert({
        game_id: gameId,
        day: nextDay,
        kpi: kpi,  // Direkt als JSONB-Feld
        state: {
          kpi,
          source: 'admin_day_advance_forced',
          prevDay,
          ts: new Date().toISOString()
        },
        type: 'admin_day_advance_forced'
      });
      if (snapErr) {
        console.warn('Admin Day-Advance-Snapshot konnte nicht erstellt werden:', snapErr);
      }
    } catch (e) {
      console.warn('Fehler beim Erstellen des Day-Advance-Snapshots:', e);
    }

    return { prevDay, nextDay, kpi };
  }
    // ─────────────────────────────────────────────────────────
  // Injizierte Multiplayer-News (global oder rollenbasiert)
  // ─────────────────────────────────────────────────────────

  /** Admin: einzelne News injizieren (global = roles leer/undefined → DB: NULL) */
  async adminInjectNews(
    gameId: string,
    data: {
      day: number;
      title: string;
      content?: string;
      source: 'press' | 'customer' | 'supplier' | 'internal' | 'rumor' | 'bank' | 'authority';
      severity: 'low' | 'medium' | 'high' | 'critical';
      roles?: RoleId[]; // optional: Zielrollen
    },
    reason?: string
  ): Promise<void> {
    if (!gameId) throw new Error('gameId required');
    if (!data?.title || !data?.day) throw new Error('day & title required');

    const row = {
      game_id: gameId,
      day: Math.max(1, Math.min(14, Math.round(data.day))),
      title: data.title,
      content: data.content ?? null,
      source: data.source,
      severity: data.severity,
      roles: (data.roles && data.roles.length) ? data.roles : null,
      created_by: this.userId || null
    };

    const { error } = await supabase.from('game_injected_news').insert(row);
    if (error) throw error;

    // Optional: Admin-Event zur Nachvollziehbarkeit
    try {
      await supabase.from('events').insert({
        game_id: gameId,
        day: row.day,
        type: 'admin_inject_news',
        content: { ...row, reason: reason || null, ts: new Date().toISOString() }
      });
    } catch {}
  }

  /** Hilfsfunktion: Row → DayNewsItem (id mit 'inj:' präfix) */
  private mapInjectedRow(row: any): DayNewsItem {
    return {
      id: `inj:${row.id}`,
      day: row.day,
      title: String(row.title || ''),
      source: row.source,
      severity: row.severity,
      content: row.content || undefined,
      // Extras bleiben im Objekt; Rollen lesen wir im View aus (als (any).roles)
      // attachments/isImportant/expandedText können bei Bedarf ergänzt werden
    } as DayNewsItem;
  }

  /** Alle injizierten News eines Tages laden (ungefiltert nach Rolle) */
  async fetchInjectedNewsForDay(gameId: string, day: number): Promise<Array<DayNewsItem & { roles?: RoleId[] | null }>> {
    if (!gameId) throw new Error('gameId required');

    const { data, error } = await supabase
  .from('game_scenario_overrides')
  .select('action,overrides,updated_at') // <-- Geändert zu 'updated_at'
  .eq('game_id', gameId)
  .order('updated_at', { ascending: true }); // <-- Geändert zu 'updated_at'


    if (error) throw error;
    return (data || []).map(r => Object.assign(this.mapInjectedRow(r), { roles: r.roles as RoleId[] | null }));
  }

  /**
   * Realtime-Abo: injizierte News für ein Spiel & Tag beobachten.
   * Ruft bei jeder Änderung die aktuelle Liste über fetchInjectedNewsForDay() ab.
   */
  subscribeInjectedNews(
    gameId: string,
    day: number,
    onUpdate: (items: Array<DayNewsItem & { roles?: RoleId[] | null }>) => void
  ) {
    if (!gameId) return null;

    const channel = supabase
      .channel(`gin-${gameId}-${day}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'game_injected_news', filter: `game_id=eq.${gameId}` },
        async (payload: any) => {
          try {
            // Nur reagieren, wenn die Änderung den aktuellen Tag betrifft
            const changedDay = Number((payload?.new || payload?.old || {}).day || 0);
            if (changedDay !== Math.max(1, Math.min(14, Math.round(day)))) return;
            const list = await this.fetchInjectedNewsForDay(gameId, day);
            onUpdate(list);
          } catch (e) {
            console.error('[MultiplayerService] subscribeInjectedNews fetch failed', e);
          }
        }
      )
      .subscribe();

    // Initiale Ladung
    this.fetchInjectedNewsForDay(gameId, day)
      .then(onUpdate)
      .catch(e => console.error('[MultiplayerService] initial fetchInjectedNewsForDay failed', e));

    this.subscriptions.push(channel);
    return channel;
  }

    /** Admin: Szenario IMPORT (ersetzen) – legt neuen 'import'-Eintrag an */
  async adminScenarioImport(gameId: string, payload: Record<string, any>, reason?: string): Promise<void> {
    if (!gameId) throw new Error('gameId required');
    if (!payload || typeof payload !== 'object') throw new Error('payload required');

    const { error } = await supabase
      .from('game_scenario_overrides')
      .insert({
        game_id: gameId,
        action: 'import',
        overrides: payload,
        created_by: this.userId || null
      });

    if (error) throw error;

    // Optional: Event-Log (best-effort)
    try {
      await supabase.from('events').insert({
        game_id: gameId,
        day: null,
        type: 'admin_scenario_import',
        content: { reason: reason || null, by: this.userId || null, ts: new Date().toISOString() }
      });
    } catch {}
  }

  /** Admin: Szenario APPEND (anhängen) – zusätzlicher Patch */
  async adminScenarioAppend(gameId: string, payload: Record<string, any>, reason?: string): Promise<void> {
    if (!gameId) throw new Error('gameId required');
    if (!payload || typeof payload !== 'object') throw new Error('payload required');

    const { error } = await supabase
      .from('game_scenario_overrides')
      .insert({
        game_id: gameId,
        action: 'append',
        overrides: payload,
        created_by: this.userId || null
      });

    if (error) throw error;

    // Optional: Event-Log (best-effort)
    try {
      await supabase.from('events').insert({
        game_id: gameId,
        day: null,
        type: 'admin_scenario_append',
        content: { reason: reason || null, by: this.userId || null, ts: new Date().toISOString() }
      });
    } catch {}
  }

  /** Holt alle Overrides und mergen sie deterministisch: letzter IMPORT als Basis, danach APPENDs in Zeitreihenfolge */
  async fetchMergedScenarioOverrides(gameId: string): Promise<Record<string, any>> {
    if (!gameId) throw new Error('gameId required');

  const { data, error } = await supabase
  .from('game_scenario_overrides')
  .select('action,overrides,updated_at') // <-- Geändert zu 'updated_at'
  .eq('game_id', gameId)
  .order('updated_at', { ascending: true }); // <-- Geändert zu 'updated_at'

    if (error) throw error;

    let base: any = {};
    for (const row of (data || [])) {
      if (row.action === 'import') {
        base = row.overrides || {};
      } else if (row.action === 'append') {
        base = this.deepMerge(base, row.overrides || {}, /*appendArrays*/ true);
      }
    }
    return base;
  }

  /** Realtime-Abo auf game_scenario_overrides; ruft onMerged(mergedScenario), wann immer sich etwas ändert */
  subscribeScenarioOverrides(gameId: string, onMerged: (s: Record<string, any>) => void) {
    if (!gameId) return null;

    const channel = supabase
      .channel(`game-scenario-${gameId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'game_scenario_overrides', filter: `game_id=eq.${gameId}` },
        async () => {
          try {
            const merged = await this.fetchMergedScenarioOverrides(gameId);
            onMerged(merged);
          } catch (e) {
            console.error('[MultiplayerService] subscribeScenarioOverrides fetch failed', e);
          }
        }
      )
      .subscribe();

    // initial laden
    this.fetchMergedScenarioOverrides(gameId)
      .then(onMerged)
      .catch(e => console.error('[MultiplayerService] initial fetchMergedScenarioOverrides failed', e));

    this.subscriptions.push(channel);
    return channel;
  }

  /** Tiefer Merge von JSON-Objekten; bei Arrays im Append-Modus konkaten & (falls 'id' vorhanden) deduplizieren */
  private deepMerge(base: any, patch: any, appendArrays = false): any {
    if (patch == null) return base;
    if (base == null) return patch;

    if (Array.isArray(base) && Array.isArray(patch)) {
      if (!appendArrays) return patch.slice();
      const byId = (arr: any[]) => {
        const m = new Map<any, any>();
        for (const x of arr) {
          const key = (x && typeof x === 'object' && 'id' in x) ? x.id : Symbol();
          m.set(key, x);
        }
        return m;
      };
      const m = byId(base);
      for (const x of patch) {
        const key = (x && typeof x === 'object' && 'id' in x) ? x.id : Symbol();
        if (m.has(key)) {
          const merged = this.deepMerge(m.get(key), x, appendArrays);
          m.set(key, merged);
        } else {
          m.set(key, x);
        }
      }
      // Map -> Array (Stabilität: Basisreihenfolge, neue hinten)
      const out: any[] = [];
      for (const [k, v] of m.entries()) out.push(v);
      return out;
    }

    if (typeof base === 'object' && typeof patch === 'object') {
      const out: any = { ...base };
      for (const k of Object.keys(patch)) {
        out[k] = (k in base) ? this.deepMerge(base[k], patch[k], appendArrays) : patch[k];
      }
      return out;
    }

    // Skalar: ersetzen
    return patch;
  }

}