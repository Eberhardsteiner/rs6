import { supabase } from './supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

export type GameState = 'LOBBY' | 'IN_PROGRESS' | 'ENDED';
export type PlayerStatus = 'OFFLINE' | 'LOBBY' | 'IN_MATCH';
export type RoleId = 'CEO' | 'CFO' | 'OPS' | 'HRLEGAL' | 'TRAINER';

export interface JoinableGame {
  game_id: string;
  game_name: string;
  state: GameState;
  current_players: number;
  max_players: number;
  available_roles: RoleId[];
  host_name: string;
  created_at: string;
}

export interface LobbyPlayer {
  player_id: string;
  player_name: string;
  role: RoleId;
  status: PlayerStatus;
  is_ready: boolean;
  last_seen_seconds_ago: number;
  is_online: boolean;
}

export interface RoleSelectionResult {
  success: boolean;
  role?: RoleId;
  game_state?: GameState;
  error?: string;
  message?: string;
}

export interface PresenceUpdate {
  success: boolean;
  status?: PlayerStatus;
  timestamp?: string;
  error?: string;
}

export class EnhancedMultiplayerService {
  private static instance: EnhancedMultiplayerService;
  private presenceChannel: RealtimeChannel | null = null;
  private roleLocksChannel: RealtimeChannel | null = null;
  private heartbeatInterval: number | null = null;

  static getInstance(): EnhancedMultiplayerService {
    if (!EnhancedMultiplayerService.instance) {
      EnhancedMultiplayerService.instance = new EnhancedMultiplayerService();
    }
    return EnhancedMultiplayerService.instance;
  }

  /**
   * US1: Atomic Role Selection with Race Condition Prevention
   * Calls the stored procedure for guaranteed atomic role assignment
   */
  async selectRoleAtomic(
    gameId: string,
    playerId: string,
    role: RoleId
  ): Promise<RoleSelectionResult> {
    try {
      const { data, error } = await supabase.rpc('select_role_atomic', {
        p_game_id: gameId,
        p_player_id: playerId,
        p_role: role
      });

      if (error) {
        console.error('[EnhancedMP] selectRoleAtomic RPC error:', error);
        return {
          success: false,
          error: 'RPC_ERROR',
          message: error.message
        };
      }

      return data as RoleSelectionResult;
    } catch (err: any) {
      console.error('[EnhancedMP] selectRoleAtomic exception:', err);
      return {
        success: false,
        error: 'UNKNOWN_ERROR',
        message: err.message || 'Ein unbekannter Fehler ist aufgetreten'
      };
    }
  }

  /**
   * US3: Get Joinable Games for Hot-Join Feature
   * Returns list of games that can be joined with available roles
   */
  async getJoinableGames(): Promise<JoinableGame[]> {
    try {
      const { data, error } = await supabase.rpc('get_joinable_games');

      if (error) {
        console.error('[EnhancedMP] getJoinableGames RPC error:', error);
        return [];
      }

      return (data || []) as JoinableGame[];
    } catch (err) {
      console.error('[EnhancedMP] getJoinableGames exception:', err);
      return [];
    }
  }

  /**
   * US2: Get Lobby Presence for Real-time Player Status
   * Returns list of players in a game lobby with their online status
   */
  async getLobbyPresence(gameId: string): Promise<LobbyPlayer[]> {
    try {
      const { data, error } = await supabase.rpc('get_lobby_presence', {
        p_game_id: gameId
      });

      if (error) {
        console.error('[EnhancedMP] getLobbyPresence RPC error:', error);
        return [];
      }

      return (data || []) as LobbyPlayer[];
    } catch (err) {
      console.error('[EnhancedMP] getLobbyPresence exception:', err);
      return [];
    }
  }

  /**
   * US2: Update Player Presence (Heartbeat)
   * Keeps player status current and enables presence detection
   */
  async updatePlayerPresence(
    playerId: string,
    gameId?: string
  ): Promise<PresenceUpdate> {
    try {
      const { data, error } = await supabase.rpc('update_player_presence', {
        p_player_id: playerId,
        p_game_id: gameId || null
      });

      if (error) {
        console.error('[EnhancedMP] updatePlayerPresence RPC error:', error);
        return {
          success: false,
          error: error.message
        };
      }

      return data as PresenceUpdate;
    } catch (err: any) {
      console.error('[EnhancedMP] updatePlayerPresence exception:', err);
      return {
        success: false,
        error: err.message
      };
    }
  }

  /**
   * US2: Start Automatic Heartbeat for Presence Tracking
   * Sends heartbeat every 15 seconds to maintain online status
   */
  startPresenceHeartbeat(playerId: string, gameId: string): void {
    // Clear existing interval
    this.stopPresenceHeartbeat();

    // Send immediate heartbeat
    this.updatePlayerPresence(playerId, gameId);

    // Set up interval (every 15 seconds)
    this.heartbeatInterval = window.setInterval(() => {
      this.updatePlayerPresence(playerId, gameId);
    }, 15000);

    console.log('[EnhancedMP] Presence heartbeat started for player:', playerId);
  }

  /**
   * Stop Automatic Heartbeat
   */
  stopPresenceHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
      console.log('[EnhancedMP] Presence heartbeat stopped');
    }
  }

  /**
   * US1: Subscribe to Role Locks (Real-time)
   * Listens to player changes to update role availability in real-time
   */
  subscribeToRoleLocks(
    gameId: string,
    onRoleUpdate: (occupiedRoles: Set<RoleId>) => void
  ): RealtimeChannel {
    // Clean up existing subscription
    if (this.roleLocksChannel) {
      this.unsubscribeFromRoleLocks();
    }

    this.roleLocksChannel = supabase
      .channel(`role-locks-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `game_id=eq.${gameId}`
        },
        async (payload) => {
          console.log('[EnhancedMP] Role lock change detected:', payload);

          // Fetch current occupied roles
          const { data, error } = await supabase
            .from('players')
            .select('role')
            .eq('game_id', gameId)
            .eq('is_active', true)
            .is('left_at', null);

          if (!error && data) {
            const occupiedRoles = new Set<RoleId>(
              data.map(p => p.role as RoleId)
            );
            onRoleUpdate(occupiedRoles);
          }
        }
      )
      .subscribe((status) => {
        console.log('[EnhancedMP] Role locks subscription status:', status);
      });

    // Initial fetch
    (async () => {
      const { data } = await supabase
        .from('players')
        .select('role')
        .eq('game_id', gameId)
        .eq('is_active', true)
        .is('left_at', null);

      if (data) {
        const occupiedRoles = new Set<RoleId>(
          data.map(p => p.role as RoleId)
        );
        onRoleUpdate(occupiedRoles);
      }
    })();

    return this.roleLocksChannel;
  }

  /**
   * Unsubscribe from Role Locks
   */
  unsubscribeFromRoleLocks(): void {
    if (this.roleLocksChannel) {
      supabase.removeChannel(this.roleLocksChannel);
      this.roleLocksChannel = null;
      console.log('[EnhancedMP] Unsubscribed from role locks');
    }
  }

  /**
   * US2: Subscribe to Lobby Presence (Real-time)
   * Listens to player status changes for live lobby updates
   */
  subscribeToLobbyPresence(
    gameId: string,
    onPresenceUpdate: (players: LobbyPlayer[]) => void
  ): RealtimeChannel {
    // Clean up existing subscription
    if (this.presenceChannel) {
      this.unsubscribeFromLobbyPresence();
    }

    this.presenceChannel = supabase
      .channel(`lobby-presence-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `game_id=eq.${gameId}`
        },
        async () => {
          console.log('[EnhancedMP] Lobby presence change detected');

          // Refetch all players
          const players = await this.getLobbyPresence(gameId);
          onPresenceUpdate(players);
        }
      )
      .subscribe((status) => {
        console.log('[EnhancedMP] Lobby presence subscription status:', status);
      });

    // Initial fetch
    (async () => {
      const players = await this.getLobbyPresence(gameId);
      onPresenceUpdate(players);
    })();

    return this.presenceChannel;
  }

  /**
   * Unsubscribe from Lobby Presence
   */
  unsubscribeFromLobbyPresence(): void {
    if (this.presenceChannel) {
      supabase.removeChannel(this.presenceChannel);
      this.presenceChannel = null;
      console.log('[EnhancedMP] Unsubscribed from lobby presence');
    }
  }

  /**
   * US3: Check if a specific game is hot-joinable
   */
  async isGameHotJoinable(gameId: string): Promise<{
    joinable: boolean;
    availableRoles: RoleId[];
    state: GameState | null;
  }> {
    try {
      const { data: game, error: gameError } = await supabase
        .from('games')
        .select('state, max_players')
        .eq('id', gameId)
        .single();

      if (gameError || !game) {
        return { joinable: false, availableRoles: [], state: null };
      }

      const { data: players, error: playersError } = await supabase
        .from('players')
        .select('role')
        .eq('game_id', gameId)
        .eq('is_active', true)
        .is('left_at', null);

      if (playersError) {
        return { joinable: false, availableRoles: [], state: game.state };
      }

      const allRoles: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];
      const takenRoles = new Set((players || []).map(p => p.role as RoleId));
      const availableRoles = allRoles.filter(role => !takenRoles.has(role));

      const isJoinable =
        (game.state === 'LOBBY' || game.state === 'IN_PROGRESS') &&
        availableRoles.length > 0 &&
        (players?.length || 0) < game.max_players;

      return {
        joinable: isJoinable,
        availableRoles,
        state: game.state
      };
    } catch (err) {
      console.error('[EnhancedMP] isGameHotJoinable exception:', err);
      return { joinable: false, availableRoles: [], state: null };
    }
  }

  /**
   * Clean up all subscriptions and intervals
   */
  cleanup(): void {
    this.unsubscribeFromRoleLocks();
    this.unsubscribeFromLobbyPresence();
    this.stopPresenceHeartbeat();
    console.log('[EnhancedMP] All resources cleaned up');
  }
}

export const enhancedMpService = EnhancedMultiplayerService.getInstance();
