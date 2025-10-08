import React, { useState, useEffect } from 'react';
import { MultiplayerService } from '@/services/multiplayerService';
import { supabase } from '@/services/supabaseClient';
import type { RoleId } from '@/core/models/domain';
import '@/styles/onboarding.css';
import { isTrainerAuthenticated, clearTrainerAuth } from './TrainerAuthGate';

interface MultiAuthLoginProps {
  onSuccess: (gameId: string, role: RoleId) => void;
}

export default function MultiAuthLogin({ onSuccess }: MultiAuthLoginProps) {
  // Load admin settings or from localStorage as fallback

  let adminSettings = (globalThis as any).__multiplayerSettings;
  if (!adminSettings) {
    const stored = localStorage.getItem('admin:multiplayer');
    if (stored) {
      try {
        adminSettings = JSON.parse(stored);
        (globalThis as any).__multiplayerSettings = adminSettings;
      } catch (e) {}
    }
  }

  const isAdminConfigured = !!adminSettings?.authMode;

  const [authMode, setAuthMode] = useState<'email' | 'name-only' | 'preset-credentials'>(
    adminSettings?.authMode || 'name-only'
  );
  const [step, setStep] = useState<'game-mode' | 'role-auth' | 'joining'>('game-mode');

  
  // Trainer-Feature: über AdminPanelMPM schaltbar
  const trainerFeatureEnabled =
    !!adminSettings?.features?.trainerAccess ||
    !!(globalThis as any).__trainerAccessEnabled;



  
    // Check for trainer bypass (nur bei gültigem Token)
  useEffect(() => {
    (async () => {
      const isTrainerMode = localStorage.getItem('mp_trainer_mode') === 'true';
      const trainerGameId = localStorage.getItem('mp_trainer_game_id');
      // Nur fortfahren, wenn Flags + gültiges Token vorhanden sind
      if (!isTrainerMode || !trainerGameId || !isTrainerAuthenticated()) {
        // Stale Flags aufräumen, damit Rollenauswahl wieder sichtbar ist
        localStorage.removeItem('mp_trainer_mode');
        localStorage.removeItem('mp_trainer_game_id');
        return;
      }

      try {
        // 1) Auth sicherstellen
        let { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          const { data, error } = await supabase.auth.signInAnonymously();
          if (error) throw error;
          user = data.user!;
        }

        // 2) Spiel prüfen
        const { data: game } = await supabase
          .from('games')
          .select('id')
          .eq('id', trainerGameId)
          .maybeSingle();
        if (!game) {
          clearTrainerAuth();
          return;
        }

        // 3) Trainer-Mitgliedschaft sicherstellen
        const { error: tmErr } = await supabase.from('trainer_memberships').upsert({
          game_id: trainerGameId,
          user_id: user.id
        });
        if (tmErr) {
          console.error('[Trainer-Bypass] DB-Fehler:', tmErr);
          clearTrainerAuth();
          return;
        }

        // 4) LocalStorage vervollständigen
        localStorage.setItem('mp_current_game', trainerGameId);
        localStorage.setItem('mp_current_role', 'TRAINER');
        localStorage.removeItem('mp_player_id');

        // 5) Weiter in die App
        onSuccess(trainerGameId, 'TRAINER');
      } catch (e) {
        console.error('[Trainer-Bypass] Fehler:', e);
        clearTrainerAuth();
      }
    })();
  }, [onSuccess]);

  // Authentication fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [occupiedRoles, setOccupiedRoles] = useState<Set<RoleId>>(new Set());
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);

  // Game fields
  const [gameMode, setGameMode] = useState<'create' | 'join' | null>(null);
    // Trainer-spezifisches Passwortfeld
  const [trainerPass, setTrainerPass] = useState('');

  const [joinCode, setJoinCode] = useState('');
  const [gameCode, setGameCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mpService = MultiplayerService.getInstance();
// Trainer-Passwort (muss mit TrainerAuthGate übereinstimmen)
  const TRAINER_PASSWORD = 'observer101';
  
  // Trainer-spezifisch
  const [trainerPassword, setTrainerPassword] = useState('');
  const [trainerCreatedGameId, setTrainerCreatedGameId] = useState<string | null>(null);
  const [trainerJoinId, setTrainerJoinId] = useState<string>('');

  
  useEffect(() => {
    // Check URL parameters for game code
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game');
    if (game) {
      setJoinCode(game.toUpperCase());
      setGameMode('join');
      setGameCode(game);
    }
  }, []);

  // Funktion zum Abrufen der belegten Rollen (FIX: select user_id as well)
  const fetchOccupiedRoles = async (gameIdOrCode: string) => {
    try {
      // Zuerst versuchen wir es als Game-ID
      let gameId = gameIdOrCode;

     

      // Join-Code (Session) auf Game-ID auflösen
      gameId = gameIdOrCode.trim();
      try {
        const { data, error } = await supabase.rpc('resolve_join_code', { p_join_code: gameId });
        if (!error) {
          const rpcId = Array.isArray(data) ? data?.[0]?.game_id : data?.game_id;
          if (rpcId) gameId = rpcId;
        } else {
          console.warn('[resolve_join_code] RPC warn:', error.message ?? error);
        }
      } catch (e) {
        console.warn('[resolve_join_code] RPC exception:', e);
      }

        
      if (!gameId) {
        setOccupiedRoles(new Set());
        return;
      }

      // Jetzt holen wir die belegten Rollen (inkl. user_id)
      const { data: players, error: pErr } = await supabase
        .from('players')
        .select('role,user_id')
        .eq('game_id', gameId)
        .not('role', 'is', null);

      if (pErr) {
        console.error('Error fetching players:', pErr);
        setOccupiedRoles(new Set());
        return;
      }

      // Aktuelle User-ID holen
      const { data: { user } } = await supabase.auth.getUser();
      const currentUserId = user?.id;

      const occ = new Set<RoleId>();
      (players || []).forEach((p: any) => { 
        // Rolle nur als belegt markieren, wenn sie nicht vom aktuellen User ist
        if (p.role && p.user_id !== currentUserId) {
          occ.add(p.role as RoleId);
        }
      });

      setOccupiedRoles(occ);
      setCurrentGameId(gameId);
    } catch (e) {
      console.error('Error in fetchOccupiedRoles:', e);
      setOccupiedRoles(new Set());
    }
  };

  // Belegte Rollen für Join-Code laden und Echtzeit-Updates einrichten
  useEffect(() => {
    let subscription: any = null;
    let isMounted = true;

    const setupRealtimeAndFetch = async () => {
      if (gameMode !== 'join' || !joinCode || joinCode.trim().length < 3) {
        if (isMounted) {
          setOccupiedRoles(new Set());
          setCurrentGameId(null);
        }
        return;
      }

      // Initiale Daten laden
      await fetchOccupiedRoles(joinCode.trim());

      // Game-ID für Subscription holen
      const code = joinCode.trim().toUpperCase();
      const { data: game } = await supabase
        .from('games')
        .select('id')
        .eq('session_code', code)
        .single();

      if (game && isMounted) {
        // Echtzeit-Subscription einrichten
        subscription = supabase
          .channel(`game-${game.id}-players`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'players',
              filter: `game_id=eq.${game.id}`
            },
            async (payload) => {
              console.log('Player change detected:', payload);
              if (isMounted) {
                // Bei jeder Änderung die Rollen neu laden
                await fetchOccupiedRoles(code);
              }
            }
          )
          .subscribe();
      }
    };

    // Debounce für bessere Performance
    const timeoutId = setTimeout(setupRealtimeAndFetch, 400);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [joinCode, gameMode]);

  // Rolle reservieren (optimistische UI-Updates)
  const reserveRole = async (role: RoleId, gameId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      // Prüfen ob Rolle noch frei ist
      const { data: existingPlayers, error: existingErr } = await supabase
        .from('players')
        .select('id')
        .eq('game_id', gameId)
        .eq('role', role);

      if (existingErr) {
        console.error('Error checking role before reserving:', existingErr);
        return false;
      }
      if ((existingPlayers || []).length > 0) {
        setError('Diese Rolle wurde gerade von einem anderen Spieler gewählt.');
        return false;
      }

      // Rolle reservieren durch Update des eigenen Player-Eintrags
      const { error } = await supabase
        .from('players')
        .update({ role: role })
        .eq('game_id', gameId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error reserving role:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Error in reserveRole:', err);
      return false;
    }
  };

  // Step 1: Choose game mode (create or join)
  const handleGameAction = async () => {
    setError('');

    if (gameMode === 'join') {
      if (!joinCode.trim()) {
        setError('Bitte Spiel-Code eingeben');
        return;
      }

      // Fetch occupied roles before showing role selection
      setLoading(true);
      try {
        await fetchOccupiedRoles(joinCode.trim());
        setLoading(false);
      } catch (e) {
        setError('Fehler beim Laden der Spieldaten');
        setLoading(false);
        return;
      }
    }

    // Proceed to role selection
    setStep('role-auth');
  };

  // Step 2: Create or join game with selected role
  const handleFinalJoin = async () => {
    if (!selectedRole) {
      setError('Bitte wähle eine Rolle');
      return;
    }

    if (occupiedRoles.has(selectedRole)) {
      setError('Diese Rolle ist bereits belegt. Bitte wähle eine freie Rolle.');
      return;
    }

    setLoading(true);

    // Trainer-Passwort prüfen (nur bei TRAINER)
    if (selectedRole === 'TRAINER') {
      if (trainerPass !== TRAINER_PASSWORD) {
        setLoading(false);
        setError('Falsches Trainer-Passwort');
        return;
      }
    }


    setError('');
    setStep('joining');

    try {
      let finalGameId = '';

      if (gameMode === 'create') {
        // Create new game
        const { gameId } = await mpService.createGame({
          name: `${playerName}'s Spiel`,
          max_players: 4,
          settings: {
            authMode: authMode,
            seed: Math.floor(Math.random() * 1000000)
          }
        });
        finalGameId = gameId;

        // Join as host with selected role
        await mpService.joinGame(finalGameId, playerName, selectedRole);

      } else if (gameMode === 'join') {
        // Join existing game
        if (!joinCode) {
          throw new Error('Bitte Spiel-Code eingeben');
        }

        // Game-ID bestimmen
        const gid = currentGameId || (await (async () => {
          const { data: g } = await supabase.from('games').select('id').eq('session_code', joinCode).single();
          return g?.id || joinCode; // Fallback
        })());

        // FRISCHER SERVER-CHECK direkt vor dem Beitritt (vermeidet Race Conditions)
        const { data: existingPlayers, error: epErr } = await supabase
          .from('players')
          .select('id')
          .eq('game_id', gid)
          .eq('role', selectedRole);

        if (epErr) throw epErr;
        if ((existingPlayers || []).length > 0) {
          throw new Error('Diese Rolle wurde gerade von einem anderen Spieler gewählt.');
        }

        await mpService.joinGame(gid, playerName, selectedRole);
        finalGameId = gid;
      }

      // Falls Trainer*in: Modus markieren & ggf. Zugangsdaten mit Game-ID kopieren
      if (selectedRole === 'TRAINER') {
        try {
          localStorage.setItem('mp_trainer_mode', 'true');
          localStorage.setItem('mp_trainer_game_id', finalGameId);
          localStorage.setItem('mp_current_role', 'TRAINER');
          localStorage.setItem('mp_current_game', finalGameId);

          if (authMode === 'preset-credentials') {
            const creds = adminSettings?.presetCredentials;
            const lines = ['CEO','CFO','OPS','HRLEGAL']
              .map(r => `${r}: ${creds?.[r as keyof typeof creds]?.username} / ${creds?.[r as keyof typeof creds]?.password}`)
              .join('\n');
            const payload = `${lines}\nGame-ID: ${finalGameId}`;
            try { await navigator.clipboard.writeText(payload); }
            catch {
              const ta = document.createElement('textarea'); ta.value = payload; ta.style.position = 'fixed'; ta.style.opacity = '0';
              document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
            }
            alert('Game-ID und Zugangsdaten wurden in die Zwischenablage kopiert.');
          }
        } catch {}
      }

      
      // Success - call parent callback
      onSuccess(finalGameId, selectedRole);

    } catch (err: any) {
      setError(err.message || 'Fehler beim Spielbeitritt');
      setStep('game-mode');
      setLoading(false);
    }
  };

  // Email Registration
  const handleEmailRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: playerName }
        }
      });

      if (error) throw error;

      setVerificationSent(true);
      // Nach Verifizierung muss User sich einloggen
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Email Login
  const handleEmailLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      setIsAuthenticated(true);
      setPlayerName(data.user?.user_metadata?.display_name || email.split('@')[0]);
      setStep('game-mode');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Anonymous Login
  const handleAnonymousLogin = async () => {
    if (!playerName.trim()) {
      setError('Bitte Namen eingeben');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await mpService.signInAnonymously(playerName);
      setIsAuthenticated(true);
      setStep('game-mode');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Preset Credentials Login
  const handlePresetLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const username = (document.getElementById('preset-username') as HTMLInputElement)?.value;
      const password = (document.getElementById('preset-password') as HTMLInputElement)?.value;

      if (!username || !password) {
        throw new Error('Bitte Benutzername und Passwort eingeben');
      }

      await mpService.signInAnonymously(username);
      setPlayerName(username);
      setIsAuthenticated(true);
      setStep('game-mode');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Role selection handler with optimistic updates
  const handleRoleSelection = async (role: RoleId) => {
    if (occupiedRoles.has(role)) {
      setError(`Die Rolle ${role} ist bereits belegt.`);
      return;
    }

    // Rolle sofort als ausgewählt markieren
    setSelectedRole(role);
    setError('');
  };

  // Reagiere sofort, wenn die aktuell gewählte Rolle zwischenzeitlich belegt wird
  useEffect(() => {
    if (selectedRole && occupiedRoles.has(selectedRole)) {
      setSelectedRole(null);
      setError('Diese Rolle wurde soeben von einem anderen Spieler belegt. Bitte wähle eine andere.');
    }
  }, [occupiedRoles, selectedRole]);

  // Common styles
  const styles = {
    root: {
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top left, rgba(37,99,235,0.15) 0%, transparent 40%), radial-gradient(ellipse at bottom right, rgba(20,184,166,0.15) 0%, transparent 40%), linear-gradient(180deg, #0a0e1a 0%, #0f1729 50%, #0a0e1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    card: {
      width: '100%',
      maxWidth: '500px',
      background: 'linear-gradient(145deg, rgba(15,31,55,0.95) 0%, rgba(11,18,32,0.98) 50%, rgba(8,15,28,0.95) 100%)',
      border: '2px solid rgba(37,99,235,0.3)',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      backdropFilter: 'blur(12px)',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    panel: {
      width: '100%',
      background: 'linear-gradient(145deg, rgba(15,31,55,0.95) 0%, rgba(11,18,32,0.98) 50%, rgba(8,15,28,0.95) 100%)',
      border: '2px solid rgba(37,99,235,0.3)',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      backdropFilter: 'blur(12px)',
      position: 'relative' as const,
      zIndex: 1
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 25%, #2563eb 50%, #14b8a6 75%, #10b981 100%)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'gradient-shift 4s ease infinite',
      textAlign: 'center' as const,
      marginBottom: '12px',
      filter: 'drop-shadow(0 0 30px rgba(37,99,235,0.5))'
    },
    subtitle: {
      color: '#94a3b8',
      textAlign: 'center' as const,
      marginBottom: '32px',
      fontSize: '16px'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      background: 'rgba(11,18,32,0.8)',
      border: '2px solid rgba(37,99,235,0.3)',
      borderRadius: '12px',
      color: '#e6eefc',
      fontSize: '16px',
      marginBottom: '16px',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    button: {
      width: '100%',
      padding: '16px',
      background: 'linear-gradient(135deg, #14b8a6, #10b981)',
      color: '#041121',
      border: 'none',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(20,184,166,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px'
    },
    roleButton: {
      padding: '16px',
      border: '2px solid rgba(37,99,235,0.3)',
      borderRadius: '12px',
      background: 'rgba(16,35,63,0.4)',
      color: '#ffffff',
      WebkitTextFillColor: '#ffffff',
      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      position: 'relative' as const
    },
    roleButtonActive: {
      background: 'linear-gradient(145deg, rgba(37,99,235,0.3), rgba(59,130,246,0.4))',
      borderColor: '#14b8a6',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(20,184,166,0.3)',
      color: '#ffffff',
      WebkitTextFillColor: '#ffffff'
    },
    roleButtonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
      borderColor: 'rgba(239,68,68,0.9)',
      background: 'repeating-linear-gradient(45deg, rgba(127,29,29,0.5), rgba(127,29,29,0.5) 10px, rgba(185,28,28,0.4) 10px, rgba(185,28,28,0.4) 20px)',
      position: 'relative' as const,
      filter: 'grayscale(0.5) brightness(0.7)',
      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 10px rgba(239,68,68,0.3)',
      pointerEvents: 'none' as const
    },
    roleButtonUpdating: {
      animation: 'pulse-update 0.6s ease-out'
    },
    errorBox: {
      marginTop: '20px',
      padding: '14px',
      background: 'rgba(239,68,68,0.1)',
      border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: '12px',
      color: '#fca5a5',
      fontSize: '14px',
      animation: 'shake 0.5s ease-out'
    },
    modeCard: {
      padding: '24px',
      border: '2px solid rgba(37,99,235,0.3)',
      borderRadius: '16px',
      background: 'linear-gradient(145deg, rgba(16,35,63,0.4), rgba(12,25,45,0.6))',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      textAlign: 'center' as const,
      position: 'relative' as const,
      overflow: 'hidden'
    },
    modeCardActive: {
      transform: 'translateY(-8px) scale(1.02)',
      borderColor: '#14b8a6',
      background: 'linear-gradient(145deg, rgba(20,184,166,0.15), rgba(16,185,129,0.2))',
      boxShadow: '0 20px 40px rgba(20,184,166,0.3), 0 0 60px rgba(20,184,166,0.2)'
    },
    realtimeIndicator: {
      position: 'absolute' as const,
      top: '8px',
      right: '8px',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#10b981',
      animation: 'pulse-indicator 2s ease-in-out infinite'
    }
  };

  // Render Auth Mode Selector (disabled)
  const renderAuthModeSelector = () => null;

  // ========== SCREEN 1: GAME MODE SELECTION (Create vs Join) ==========
  const renderGameModeSelection = () => (
    <div style={styles.root}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.15), transparent 70%)',
        animation: 'pulse 3s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      <div style={{
        ...styles.panel,
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#14b8a6',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          Multiplayer-Modus
        </h2>
        <p style={{
          color: '#94a3b8',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '14px'
        }}>
          Wähle eine Option um zu starten
        </p>

        {/* CREATE GAME Button */}
        <button
          onClick={() => {
            setGameMode('create');
            setStep('role-auth');
          }}
          style={{
            width: '100%',
            padding: '20px',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(20,184,166,0.4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(20,184,166,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(20,184,166,0.4)';
          }}
        >
          🎮 Neues Spiel starten
        </button>

        {/* JOIN GAME Section */}
        <div style={{
          padding: '24px',
          background: 'rgba(15,23,42,0.8)',
          border: '1px solid rgba(20,184,166,0.2)',
          borderRadius: '12px'
        }}>
          <label style={{
            display: 'block',
            color: '#e6eefc',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            Einem Spiel beitreten
          </label>
          <input
            type="text"
            placeholder="Game-ID eingeben"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            style={{
              ...styles.input,
              marginBottom: '12px'
            }}
          />
          <button
            onClick={async () => {
              if (!joinCode.trim()) {
                setError('Bitte Game-ID eingeben');
                return;
              }
              setError('');
              setGameMode('join');
              // Fetch occupied roles
              await fetchOccupiedRoles(joinCode);
              setStep('role-auth');
            }}
            disabled={!joinCode.trim()}
            style={{
              ...styles.button,
              width: '100%',
              opacity: !joinCode.trim() ? 0.5 : 1,
              cursor: !joinCode.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            Beitreten →
          </button>
        </div>

        {error && (
          <div style={{
            ...styles.errorBox,
            marginTop: '16px'
          }}>
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );

  // Render Login Form
  const renderLoginForm = () => (
    <div style={styles.root}>
      {/* Animated glow effect */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(20,184,166,0.3) 0%, transparent 60%)',
        borderRadius: '50%',
        animation: 'pulse-glow 4s ease-in-out infinite'
      }} />

      {/* Flying Lines Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)',
          top: '25%',
          animation: 'fly-line 16s linear infinite 1s'
        }} />
        <div style={{
          position: 'absolute',
          width: '220px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)',
          top: '60%',
          animation: 'fly-line 21s linear infinite 5s'
        }} />
        <div style={{
          position: 'absolute',
          width: '1px',
          height: '180px',
          background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.4), transparent)',
          left: '20%',
          animation: 'fly-line-vertical 19s linear infinite 3s'
        }} />
        <div style={{
          position: 'absolute',
          width: '1px',
          height: '220px',
          background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.3), transparent)',
          left: '80%',
          animation: 'fly-line-vertical 24s linear infinite 8s'
        }} />
      </div>

      <div style={{...styles.card, position: 'relative'}}>
        {/* Realtime indicator */}
        {gameMode === 'join' && currentGameId && (
          <div style={styles.realtimeIndicator} title="Live-Synchronisation aktiv" />
        )}

        {/* Border Animation Effect */}
        <div style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '24px',
          padding: '2px',
          background: 'linear-gradient(90deg, #14b8a6, #2563eb, #a855f7, #14b8a6)',
          backgroundSize: '300% 100%',
          animation: 'border-flow 8s linear infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.6,
          pointerEvents: 'none'
        }} />

        {/* Glowing accent line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #14b8a6, transparent)',
          animation: 'scan-line 3s linear infinite'
        }} />

        <h1 style={styles.title}>Liquiditätskrise</h1>
        <p style={styles.subtitle}>
          {authMode === 'email' && 'Mit Email-Account anmelden'}
          {authMode === 'name-only' && 'Schnellstart ohne Registrierung'}
          {authMode === 'preset-credentials' && 'Mit vorgegebenen Zugangsdaten'}
        </p>

        {isAdminConfigured && (
          <div style={{ 
            marginBottom: '24px',
            padding: '8px 16px',
            background: 'rgba(37,99,235,0.1)',
            border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#94a3b8',
            textAlign: 'center'
          }}>
            🔐 Authentifizierungsmethode vom Administrator vorgegeben
          </div>
        )}

        {authMode === 'email' && (
          <>
            {step === 'login' ? (
              <>
                <input
                  type="email"
                  placeholder="Email-Adresse"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = '#14b8a6';
                    (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 40px rgba(20,184,166,0.3)';
                  }}
                  onBlur={(e) => {

                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(37,99,235,0.3)';
                    (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
                <input
                  type="password"
                  placeholder="Passwort"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = '#14b8a6';
                    (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 40px rgba(20,184,166,0.3)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(37,99,235,0.3)';
                    (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
                  }}
                />
                <button
                  onClick={handleEmailLogin}
                  disabled={loading}
                  style={{
                    ...styles.button,
                    opacity: loading ? 0.5 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.05)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(20,184,166,0.5), 0 0 60px rgba(20,184,166,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(20,184,166,0.4)';
                  }}
                >
                  {loading ? 'Anmelden...' : 'Anmelden'}
                </button>
                <button
                  onClick={() => setStep('register')}
                  style={{
                    ...styles.button,
                    background: 'transparent',
                    border: '2px solid rgba(20,184,166,0.5)',
                    color: '#14b8a6',
                    marginTop: '12px',
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,184,166,0.1)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#14b8a6';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(20,184,166,0.5)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  Neuen Account erstellen
                </button>
              </>
            ) : (
              // Register form
              <>
                {!verificationSent ? (
                  <>
                    <input
                      type="text"
                      placeholder="Spielername"
                      value={playerName}
                      onChange={e => setPlayerName(e.target.value)}
                      style={styles.input}
                    />
                    <input
                      type="email"
                      placeholder="Email-Adresse"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={styles.input}
                    />
                    <input
                      type="password"
                      placeholder="Passwort"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={styles.input}
                    />
                    <input
                      type="password"
                      placeholder="Passwort bestätigen"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      style={styles.input}
                    />
                    <button
                      onClick={handleEmailRegister}
                      disabled={loading}
                      style={{
                        ...styles.button,
                        opacity: loading ? 0.5 : 1
                      }}
                    >
                      {loading ? 'Registrieren...' : 'Registrieren'}
                    </button>
                  </>
                ) : (
                  <div style={{
                    padding: '24px',
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: '#10b981'
                  }}>
                    ✅ Bestätigungsmail wurde gesendet!<br/>
                    Bitte prüfen Sie Ihren Posteingang.
                    <button
                      onClick={() => { setStep('login'); setVerificationSent(false); }}
                      style={{ 
                        marginTop: '12px', 
                        color: '#14b8a6', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Zum Login
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {authMode === 'name-only' && (
          <>
            <input
              type="text"
              placeholder="Dein Spielername"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              style={styles.input}
              autoFocus
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = '#14b8a6';
                (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 40px rgba(20,184,166,0.3)';
                (e.currentTarget as HTMLInputElement).style.background = 'rgba(11,18,32,0.95)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(37,99,235,0.3)';
                (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLInputElement).style.background = 'rgba(11,18,32,0.8)';
              }}
            />
            <button
              onClick={handleAnonymousLogin}
              disabled={loading || !playerName.trim()}
              style={{
                ...styles.button,
                opacity: (!playerName.trim() || loading) ? 0.5 : 1,
                cursor: (!playerName.trim() || loading) ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (playerName.trim() && !loading) {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.05)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(20,184,166,0.5), 0 0 60px rgba(20,184,166,0.3)';
                  (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(20,184,166,0.4)';
                (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)';
              }}
            >
              {loading ? 'Starte...' : 'Weiter →'}
            </button>
          </>
        )}

        {authMode === 'preset-credentials' && (
          <>
            <input
              id="preset-username"
              type="text"
              placeholder="Benutzername"
              style={styles.input}
            />
            <input
              id="preset-password"
              type="password"
              placeholder="Passwort"
              style={styles.input}
            />
            <button
              onClick={handlePresetLogin}
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Anmelden...' : 'Anmelden'}
            </button>
          </>
        )}

        {error && (
          <div style={styles.errorBox} aria-live="assertive">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );

  // Render Role Selection Screen
  const renderRoleSelection = () => (
    <div style={styles.root}>
      {/* Flying Lines Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.5), transparent)',
          top: '30%',
          animation: 'fly-line 17s linear infinite 2s'
        }} />
        <div style={{
          position: 'absolute',
          width: '170px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)',
          top: '65%',
          animation: 'fly-line 22s linear infinite 6s'
        }} />
      </div>

      <div style={{...styles.card, position: 'relative'}}>
        {/* Border Animation Effect */}
        <div style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '24px',
          padding: '2px',
          background: 'linear-gradient(90deg, #2563eb, #14b8a6, #a855f7, #2563eb)',
          backgroundSize: '300% 100%',
          animation: 'border-flow 10s linear infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.7,
          pointerEvents: 'none'
        }} />

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            ...styles.title,
            fontSize: '28px',
            marginBottom: '8px'
          }}>
            Willkommen {playerName}!
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            {gameMode === 'create' && 'Neues Spiel erstellen'}
            {gameMode === 'join' && `Spiel beitreten: ${joinCode}`}
          </p>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '12px',
            fontWeight: '600',
            color: '#e6eefc',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Wähle deine Rolle:
            {gameMode === 'join' && occupiedRoles.size > 0 && (
              <span style={{
                fontSize: '12px',
                color: '#94a3b8',
                marginLeft: '8px',
                fontWeight: 'normal'
              }}>
                ({occupiedRoles.size} bereits belegt)
              </span>
            )}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {(
              trainerFeatureEnabled
                ? (['CEO','CFO','OPS','HRLEGAL','TRAINER'] as RoleId[])
                : (['CEO','CFO','OPS','HRLEGAL'] as RoleId[])
            ).map(role => {
              const isOccupied = occupiedRoles.has(role);
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  onClick={() => handleRoleSelection(role)}
                  disabled={isOccupied}
                  aria-disabled={isOccupied}
                  aria-label={isOccupied ? `${role} belegt` : `${role} frei`}
                  title={isOccupied ? 'Rolle belegt – Auswahl gesperrt' : (role === 'TRAINER' ? 'Trainer (Passwort erforderlich)' : 'Rolle wählen')}
                  style={{
                    ...styles.roleButton,
                    ...(isSelected ? styles.roleButtonActive : {}),
                    ...(isOccupied ? styles.roleButtonDisabled : {}),
                    color: '#ffffff',
                    WebkitTextFillColor: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    if (!isOccupied && selectedRole !== role) {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(37,99,235,0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isOccupied && selectedRole !== role) {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                    }
                  }}
                >
                  {isOccupied && (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        fontSize: 24,
                        filter: 'drop-shadow(0 0 8px rgba(239,68,68,1))',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    >
                      🔒
                    </div>
                  )}

                  <div style={{
                    fontSize: '16px',
                    color: isOccupied ? 'rgba(255,255,255,0.4)' : '#ffffff',
                    WebkitTextFillColor: isOccupied ? 'rgba(255,255,255,0.4)' : '#ffffff',
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    textDecoration: isOccupied ? 'line-through' : 'none'
                  }}>
                    {role}
                  </div>

                  {isOccupied && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.85)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      pointerEvents: 'none'
                    }}>
                      <div style={{
                        fontSize: '28px',
                        animation: 'pulse 2s ease-in-out infinite'
                      }}>
                        🔒
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '800',
                        color: '#ef4444',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        textShadow: '0 0 10px rgba(239,68,68,0.8), 0 0 20px rgba(239,68,68,0.5)'
                      }}>
                        BELEGT
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trainer Password Field */}
        {selectedRole === 'TRAINER' && (
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Trainer-Passwort"
              value={trainerPass}
              onChange={(e) => setTrainerPass(e.target.value)}
              style={{
                ...styles.input,
                borderColor: trainerPass ? '#14b8a6' : 'rgba(37,99,235,0.3)'
              }}
            />
          </div>
        )}

        <button
          onClick={handleFinalJoin}
          disabled={!selectedRole || loading}
          style={{
            ...styles.button,
            opacity: (!selectedRole || loading) ? 0.5 : 1,
            cursor: (!selectedRole || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Laden...' : (gameMode === 'create' ? '🚀 Spiel erstellen' : '✅ Spiel beitreten')}
        </button>

        <button
          onClick={() => {
            setStep('game-mode');
            setSelectedRole(null);
            setError('');
          }}
          style={{
            ...styles.button,
            background: 'rgba(100,116,139,0.2)',
            marginTop: '12px'
          }}
        >
          ← Zurück
        </button>

        {error && (
          <div style={styles.errorBox} aria-live="assertive">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );

  // Render Game Mode Selection
  const renderGameMode = () => (
    <div style={styles.root}>
      {/* Flying Lines Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.5), transparent)',
          top: '30%',
          animation: 'fly-line 17s linear infinite 2s'
        }} />
        <div style={{
          position: 'absolute',
          width: '170px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)',
          top: '65%',
          animation: 'fly-line 22s linear infinite 6s'
        }} />
        <div style={{
          position: 'absolute',
          width: '1px',
          height: '200px',
          background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.3), transparent)',
          left: '25%',
          animation: 'fly-line-vertical 20s linear infinite 4s'
        }} />
      </div>

      <div style={{...styles.card, position: 'relative'}}>
        {/* Border Animation Effect */}
        <div style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '24px',
          padding: '2px',
          background: 'linear-gradient(90deg, #2563eb, #14b8a6, #a855f7, #2563eb)',
          backgroundSize: '300% 100%',
          animation: 'border-flow 10s linear infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.7,
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #14b8a6, transparent)',
          animation: 'scan-line 3s linear infinite'
        }} />

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            ...styles.title,
            fontSize: '28px',
            marginBottom: '8px'
          }}>
            Willkommen {playerName}!
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Du spielst als <span style={{ 
              color: '#14b8a6', 
              fontWeight: '700',
              textShadow: '0 0 20px rgba(20,184,166,0.5)'
            }}>{selectedRole}</span>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <button
            onClick={() => setGameMode('create')}
            style={{
              ...styles.modeCard,
              ...(gameMode === 'create' ? styles.modeCardActive : {})
            }}
            onMouseEnter={(e) => {
              if (gameMode !== 'create') {
                Object.assign((e.currentTarget as HTMLButtonElement).style, {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(37,99,235,0.3)'
                });
              }
            }}
            onMouseLeave={(e) => {
              if (gameMode !== 'create') {
                Object.assign((e.currentTarget as HTMLButtonElement).style, {
                  transform: 'translateY(0)',
                  boxShadow: 'none'
                });
              }
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎮</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#e6eefc' }}>Neues Spiel</div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Erstelle ein neues Spiel</div>
          </button>

          <button
            onClick={() => setGameMode('join')}
            style={{
              ...styles.modeCard,
              ...(gameMode === 'join' ? styles.modeCardActive : {})
            }}
            onMouseEnter={(e) => {
              if (gameMode !== 'join') {
                Object.assign((e.currentTarget as HTMLButtonElement).style, {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(37,99,235,0.3)'
                });
              }
            }}
            onMouseLeave={(e) => {
              if (gameMode !== 'join') {
                Object.assign((e.currentTarget as HTMLButtonElement).style, {
                  transform: 'translateY(0)',
                  boxShadow: 'none'
                });
              }
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔗</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#e6eefc' }}>Beitreten</div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Mit Code beitreten</div>
          </button>
        </div>

        {gameMode === 'join' && (
          <>
            <input
              type="text"
              placeholder="Spiel-Code eingeben (z.B. ABC123)"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.toUpperCase())}
              style={{
                ...styles.input,
                fontSize: '20px',
                textAlign: 'center',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: '700',
                marginBottom: '24px'
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = '#14b8a6';
                (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 40px rgba(20,184,166,0.3)';
                (e.currentTarget as HTMLInputElement).style.background = 'rgba(11,18,32,0.95)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(37,99,235,0.3)';
                (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLInputElement).style.background = 'rgba(11,18,32,0.8)';
              }}
            />

            {/* Show occupied roles when joining */}
            {occupiedRoles.size > 0 && (
              <div style={{
                marginBottom: '16px',
                padding: '12px',
                background: 'rgba(37,99,235,0.1)',
                border: '1px solid rgba(37,99,235,0.3)',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#94a3b8',
                textAlign: 'center'
              }}>
                🔄 Live-Synchronisation aktiv • {occupiedRoles.size} Rolle(n) bereits belegt
              </div>
            )}
          </>
        )}

        <button
          onClick={handleGameAction}
          disabled={!gameMode || (gameMode === 'join' && !joinCode) || loading}
          style={{
            ...styles.button,
            opacity: (!gameMode || (gameMode === 'join' && !joinCode) || loading) ? 0.5 : 1,
            cursor: (!gameMode || (gameMode === 'join' && !joinCode) || loading) ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={(e) => {
            if (gameMode && (gameMode === 'create' || joinCode) && !loading) {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.05)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(20,184,166,0.5), 0 0 60px rgba(20,184,166,0.3)';
              (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(20,184,166,0.4)';
            (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)';
          }}
        >
          {loading ? 'Laden...' : (gameMode === 'create' ? '🚀 Spiel erstellen' : '✅ Spiel beitreten')}
        </button>

        {error && (
          <div style={styles.errorBox} aria-live="assertive">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );

  // ========== SCREEN 2: ROLE + AUTH SELECTION ==========
  const renderRoleAndAuth = () => {
    const roles: RoleId[] = trainerFeatureEnabled
      ? ['CEO', 'CFO', 'OPS', 'HRLEGAL', 'TRAINER']
      : ['CEO', 'CFO', 'OPS', 'HRLEGAL'];

    const handleRoleSelect = (role: RoleId) => {
      setSelectedRole(role);
      setError('');
    };

    const handleContinue = async () => {
      if (!selectedRole) {
        setError('Bitte wähle eine Rolle');
        return;
      }

      // TRAINER needs no auth - directly join/create
      if (selectedRole === 'TRAINER') {
        setLoading(true);
        try {
          // Get anon session
          let { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            const { data, error: authErr } = await supabase.auth.signInAnonymously();
            if (authErr) throw authErr;
            user = data.user!;
          }

          let finalGameId: string;

          if (gameMode === 'create') {
            // Create new game
            const { data: newGame, error: createErr } = await supabase
              .from('games')
              .insert({
                name: 'Trainer Game',
                created_by: user.id,
                host_id: user.id,
                session_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
                status: 'waiting',
                current_day: 1,
                difficulty: 'medium',
                game_mode: 'standard'
              })
              .select()
              .single();
            if (createErr) throw createErr;
            finalGameId = newGame.id;
          } else {
            // Join existing game
            const { data: existingGame, error: fetchErr } = await supabase
              .from('games')
              .select('id')
              .eq('id', joinCode)
              .single();
            if (fetchErr || !existingGame) throw new Error('Spiel nicht gefunden');
            finalGameId = existingGame.id;
          }

          // Upsert trainer player
          const { data: playerRow, error: upErr } = await supabase
            .from('players')
            .upsert({
              game_id: finalGameId,
              user_id: user.id,
              role: 'TRAINER',
              name: 'Trainer',
              is_gm: false,
              is_active: true,
              last_seen: new Date().toISOString()
            }, { onConflict: 'game_id,user_id' })
            .select()
            .single();

          if (upErr) {
            if (upErr.code === '23505') {
              throw new Error('Fehler beim Beitreten als Trainer. Bitte versuche es erneut.');
            }
            throw upErr;
          }

          try {
            await supabase.from('trainer_memberships').upsert({
              game_id: finalGameId,
              user_id: user.id
            });
          } catch (e) {
            console.warn('Trainer membership upsert failed:', e);
          }

          localStorage.setItem('mp_current_game', finalGameId);
          localStorage.setItem('mp_current_role', 'TRAINER');
          if (playerRow?.id) localStorage.setItem('mp_player_id', playerRow.id);

          onSuccess(finalGameId, 'TRAINER');
        } catch (e: any) {
          setError(e?.message || 'Fehler beim Trainer-Zugang');
        } finally {
          setLoading(false);
        }
        return;
      }

      // For other roles: proceed with auth
      setError('');
    };

    const handleAuth = async () => {
      if (!selectedRole || selectedRole === 'TRAINER') return;
      if (!playerName.trim()) {
        setError('Bitte Namen eingeben');
        return;
      }

      setLoading(true);
      try {
        // Auth based on authMode
        let user: any;
        if (authMode === 'email') {
          // Email login (simplified - assume already logged in or handle login)
          const { data: { user: emailUser } } = await supabase.auth.getUser();
          if (!emailUser) {
            setError('Bitte erst einloggen');
            setLoading(false);
            return;
          }
          user = emailUser;
        } else {
          // Anonymous/name-only
          const { data: { user: anonUser } } = await supabase.auth.getUser();
          if (!anonUser) {
            const { data, error: authErr } = await supabase.auth.signInAnonymously();
            if (authErr) throw authErr;
            user = data.user!;
          } else {
            user = anonUser;
          }
        }

        let finalGameId: string;

        if (gameMode === 'create') {
          // Create new game with initial KPI values
          const { data: newGame, error: createErr } = await supabase
            .from('games')
            .insert({
              name: `${playerName}'s Game`,
              created_by: user.id,
              host_id: user.id,
              session_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
              status: 'waiting',
              current_day: 1,
              difficulty: 'medium',
              game_mode: 'standard',
              kpi_values: {
                cashEUR: 100000,
                profitLossEUR: 0,
                customerLoyalty: 50,
                bankTrust: 50,
                workforceEngagement: 50,
                publicPerception: 50
              }
            })
            .select()
            .single();
          if (createErr) throw createErr;
          finalGameId = newGame.id;
        } else {
          // Join existing game
          const { data: existingGame, error: fetchErr } = await supabase
            .from('games')
            .select('id')
            .eq('id', joinCode)
            .single();
          if (fetchErr || !existingGame) throw new Error('Spiel nicht gefunden');
          finalGameId = existingGame.id;
        }

        // Upsert player
        const { data: playerRow, error: upErr } = await supabase
          .from('players')
          .upsert({
            game_id: finalGameId,
            user_id: user.id,
            role: selectedRole,
            name: playerName,
            is_gm: false,
            is_active: true,
            last_seen: new Date().toISOString()
          }, { onConflict: 'game_id,user_id' })
          .select()
          .single();

        if (upErr) {
          if (upErr.code === '23505' && upErr.message?.includes('idx_players_game_role_unique')) {
            throw new Error('Diese Rolle ist bereits belegt. Bitte wähle eine andere Rolle.');
          }
          throw upErr;
        }

        localStorage.setItem('mp_current_game', finalGameId);
        localStorage.setItem('mp_current_role', selectedRole);
        if (playerRow?.id) localStorage.setItem('mp_player_id', playerRow.id);

        onSuccess(finalGameId, selectedRole);
      } catch (e: any) {
        setError(e?.message || 'Fehler beim Beitreten');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div style={styles.root}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(20,184,166,0.15), transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
          pointerEvents: 'none'
        }} />

        <div style={{
          ...styles.panel,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#14b8a6',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            {gameMode === 'create' ? 'Neues Spiel' : 'Spiel beitreten'}
          </h2>
          <p style={{
            color: '#94a3b8',
            textAlign: 'center',
            marginBottom: '32px',
            fontSize: '14px'
          }}>
            {gameMode === 'join' && `Game-ID: ${joinCode}`}
          </p>

          {/* Role Selection */}
          <label style={{
            display: 'block',
            color: '#e6eefc',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            Wähle deine Rolle:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {roles.map(role => {
              const isOccupied = occupiedRoles.has(role);
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  onClick={() => !isOccupied && handleRoleSelect(role)}
                  disabled={isOccupied}
                  style={{
                    padding: '16px',
                    position: 'relative',
                    background: isSelected
                      ? 'linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)'
                      : isOccupied
                      ? 'repeating-linear-gradient(45deg, rgba(127,29,29,0.5), rgba(127,29,29,0.5) 10px, rgba(185,28,28,0.4) 10px, rgba(185,28,28,0.4) 20px)'
                      : 'rgba(15,23,42,0.8)',
                    border: isSelected
                      ? '2px solid #14b8a6'
                      : isOccupied
                      ? '2px solid rgba(239,68,68,0.9)'
                      : '1px solid rgba(20,184,166,0.3)',
                    borderRadius: '8px',
                    color: isOccupied ? 'rgba(255,255,255,0.4)' : '#fff',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isOccupied ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: isOccupied ? 0.7 : 1,
                    filter: isOccupied ? 'grayscale(0.5) brightness(0.7)' : 'none',
                    textDecoration: isOccupied ? 'line-through' : 'none',
                    pointerEvents: isOccupied ? 'none' : 'auto'
                  }}
                >
                  {role} {isOccupied && <span style={{ marginLeft: '8px', fontSize: '20px', animation: 'pulse 2s ease-in-out infinite' }}>🔒</span>}
                </button>
              );
            })}
          </div>

          {/* Auth Section - Only for non-TRAINER roles */}
          {selectedRole && selectedRole !== 'TRAINER' && (
            <>
              <label style={{
                display: 'block',
                color: '#e6eefc',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Dein Name:
              </label>
              <input
                type="text"
                placeholder="Namen eingeben"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={{
                  ...styles.input,
                  marginBottom: '20px'
                }}
              />
              <button
                onClick={handleAuth}
                disabled={loading || !playerName.trim()}
                style={{
                  ...styles.button,
                  width: '100%',
                  opacity: (!playerName.trim() || loading) ? 0.5 : 1,
                  cursor: (!playerName.trim() || loading) ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Wird geladen...' : (gameMode === 'create' ? 'Spiel erstellen' : 'Beitreten')}
              </button>
            </>
          )}

          {/* Trainer: Direct continue button */}
          {selectedRole === 'TRAINER' && (
            <button
              onClick={handleContinue}
              disabled={loading}
              style={{
                ...styles.button,
                width: '100%',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Wird geladen...' : (gameMode === 'create' ? 'Spiel als Trainer erstellen' : 'Als Trainer beitreten')}
            </button>
          )}

          {error && (
            <div style={{
              ...styles.errorBox,
              marginTop: '16px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={() => setStep('game-mode')}
            style={{
              marginTop: '16px',
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ← Zurück
          </button>
        </div>
      </div>
    );
  };

  // Render Joining Screen
  const renderJoining = () => (
    <div style={styles.root}>
      {/* Flying Lines Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          width: '250px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)',
          top: '15%',
          animation: 'fly-line 14s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.5), transparent)',
          top: '40%',
          animation: 'fly-line 18s linear infinite 4s'
        }} />
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)',
          top: '75%',
          animation: 'fly-line 16s linear infinite 8s'
        }} />
        <div style={{
          position: 'absolute',
          width: '1px',
          height: '250px',
          background: 'linear-gradient(180deg, transparent, rgba(20,184,166,0.5), transparent)',
          left: '10%',
          animation: 'fly-line-vertical 20s linear infinite 2s'
        }} />
        <div style={{
          position: 'absolute',
          width: '1px',
          height: '180px',
          background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.4), transparent)',
          left: '90%',
          animation: 'fly-line-vertical 23s linear infinite 7s'
        }} />
      </div>

      <div style={{
        textAlign: 'center',
        color: '#e6eefc'
      }}>
        <div style={{ 
          fontSize: '64px', 
          marginBottom: '24px',
          animation: 'rotate-slow 2s linear infinite'
        }}>
          ⏳
        </div>
        <h2 style={{
          ...styles.title,
          fontSize: '36px'
        }}>
          Trete Spiel bei...
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '18px' }}>Bitte warten</p>

        {/* Loading dots animation */}
        <div style={{ marginTop: '32px' }}>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#14b8a6',
            margin: '0 4px',
            animation: 'pulse 1.4s ease-in-out infinite'
          }} />
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#14b8a6',
            margin: '0 4px',
            animation: 'pulse 1.4s ease-in-out 0.2s infinite'
          }} />
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#14b8a6',
            margin: '0 4px',
            animation: 'pulse 1.4s ease-in-out 0.4s infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float-bg {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.1) rotate(120deg); }
          66% { transform: scale(0.95) rotate(240deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes pulse-indicator {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes pulse-update {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }

        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes fly-line {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(calc(100vw + 100%));
            opacity: 0;
          }
        }

        @keyframes fly-line-vertical {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(calc(100vh + 100%));
            opacity: 0;
          }
        }

        @keyframes border-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );

  // Main render logic - New Flow: game-mode → role-auth → joining
  if (step === 'game-mode') {
    return renderGameModeSelection();
  } else if (step === 'role-auth') {
    return renderRoleAndAuth();
  } else if (step === 'joining') {
    return renderJoining();
  }

  return renderGameModeSelection();
}
