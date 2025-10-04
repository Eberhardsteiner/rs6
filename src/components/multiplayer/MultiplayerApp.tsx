// src/components/multiplayer/MultiplayerApp.tsx
import React, { useState, useEffect } from 'react';
import { MultiplayerService } from '@/services/multiplayerService';
import { supabase } from '@/services/supabaseClient';
import MultiAuthLogin from './MultiAuthLogin';
import EnhancedGameLobby from './EnhancedGameLobby';
import MultiplayerGameView from './MultiplayerGameView';
import App from '@/App';
import Shell from '@/components/layout/Shell';
import type { RoleId } from '@/core/models/domain';
import type { Game, Player } from '@/services/supabaseClient';
import '@/admin/adminBridge';  // Anwenden gespeicherter Admin-Einstellungen beim MP-Start

interface MultiplayerAppProps {
  onBackToHome?: () => void;
}

export default function MultiplayerApp({ onBackToHome }: MultiplayerAppProps) {
  const [multiplayerMode, setMultiplayerMode] = useState<boolean>(false);
  const [gamePhase, setGamePhase] = useState<'login' | 'lobby' | 'playing'>('login');
  const [currentRole, setCurrentRole] = useState<RoleId | null>(null);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [currentPlayerName, setCurrentPlayerName] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [gameData, setGameData] = useState<Game | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState('');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [lobbyLoading, setLobbyLoading] = useState(true);

  const mpService = MultiplayerService.getInstance();


// --- PATCH: Verhindere 406/PGRST116 für 'decisions' global, indem '.single()' auf '.maybeSingle()' gemappt wird ---
// Dieser Patch wirkt nur auf Tabellenname 'decisions' und nur im Mehrspielermodus.
useEffect(() => {
  if (!multiplayerMode) return;
  try {
    const s = supabase as any;
    if (s.__decisionsSinglePatched) return;
    const originalFrom = s.from.bind(s);
    s.from = (table: string) => {
      const builder = originalFrom(table);
      if (table === 'decisions') {
        const originalSelect = builder.select?.bind(builder);
        if (originalSelect) {
          builder.select = (...args: any[]) => {
            const q = originalSelect(...args);
            if (typeof q?.single === 'function' && typeof q?.maybeSingle === 'function') {
              // mappe Single -> MaybeSingle nur für 'decisions'
              q.single = q.maybeSingle.bind(q);
            }
            return q;
          };
        }
      }
      return builder;
    };
    s.__decisionsSinglePatched = true;
    return () => {
      s.from = originalFrom;
      s.__decisionsSinglePatched = false;
    };
  } catch (e) {
    console.warn('Supabase patch (single->maybeSingle) konnte nicht gesetzt werden:', e);
  }
}, [multiplayerMode]);
 // Load and apply multiplayer settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('admin:multiplayer');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        (globalThis as any).__multiplayerSettings = settings;
      } catch (e) {
        console.error('Error loading multiplayer settings:', e);
      }
    }
  }, []);

  // Back-Button für die Shell erstellen
  const backButton = onBackToHome ? (
    <button
      onClick={onBackToHome}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        color: '#e5e7eb',
        border: '1px solid rgba(20,184,166,0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #374151, #1f2937)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #1f2937, #111827)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      }}
      title="Zur Startseite"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Zur Startseite
    </button>
  ) : null;

  // Check Supabase connection when entering multiplayer mode
  useEffect(() => {
    if (multiplayerMode && gamePhase === 'login') {
      setIsCheckingConnection(true);
      
      Promise.all([
        supabase.from('games').select('count', { count: 'exact', head: true }),
        supabase.auth.getSession()
      ]).then(([gamesResult, sessionResult]) => {
        if (gamesResult.error) {
          if (gamesResult.error.message.includes('apikey')) {
            setConnectionError('Supabase ist nicht konfiguriert. Bitte VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY in .env setzen.');
          } else if (gamesResult.error.message.includes('relation') || gamesResult.error.message.includes('does not exist')) {
            setConnectionError('Datenbank-Tabellen fehlen. Bitte das SQL-Schema in Supabase ausführen.');
          } else {
            setConnectionError(`Verbindungsfehler: ${gamesResult.error.message}`);
          }
        } else {
          setConnectionError(null);
        }
      }).catch(err => {
        console.error('Connection check failed:', err);
        setConnectionError('Keine Verbindung zu Supabase möglich. Prüfe die Konfiguration.');
      }).finally(() => {
        setIsCheckingConnection(false);
      });
    }
  }, [multiplayerMode, gamePhase]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');
    
    if (gameId) {
      setMultiplayerMode(true);
      setCurrentGameId(gameId);
    }
    
    // Check for existing game session
    const existingGame = localStorage.getItem('mp_current_game');
    const existingRole = localStorage.getItem('mp_current_role') as RoleId;
    const existingName = localStorage.getItem('mp_user_name');
    const existingPhase = localStorage.getItem('mp_game_phase') as 'lobby' | 'playing';
    
    if (existingGame && existingRole) {
      setMultiplayerMode(true);
      setCurrentRole(existingRole);
      setCurrentGameId(existingGame);
      setCurrentPlayerName(existingName || 'Spieler');
      
      // Restore game phase
      if (existingPhase === 'playing') {
        setGamePhase('playing');
      } else {
        setGamePhase('lobby');
      }
      
      // Set global variables
      (globalThis as any).__multiplayerMode = true;
      (globalThis as any).__currentRole = existingRole;
      (globalThis as any).__gameId = existingGame;
      (globalThis as any).__visibleKpis = MultiplayerService.getRoleKpiVisibility(existingRole);
    }
  }, []);

  // Load game data when entering lobby
  useEffect(() => {
    if (gamePhase === 'lobby' && currentGameId) {
      setLobbyLoading(true);
      
      const loadGameData = async () => {
        try {
          const gameInfo = await mpService.getGameInfo();
          setGameData(gameInfo.game);
          setPlayers(gameInfo.players);
          
          const playerId = mpService.getCurrentPlayerId();
          const player = gameInfo.players.find(p => p.id === playerId);
          if (player) {
            setCurrentPlayer(player);
          }
          
          setLobbyLoading(false);
          
          // Hinweis: Nicht mehr automatisch in den Spielmodus springen,
          // auch wenn der DB-Status bereits 'running' ist.
          // Der Wechsel erfolgt nur noch explizit durch die Lobby (onGameStart)
          // oder durch Rehydration aus localStorage ('mp_game_phase' === 'playing').
        } catch (err) {
          console.error('Error loading game data:', err);
          setLobbyLoading(false);
        }
      };
      
      loadGameData();
      
      // Poll for updates
      const interval = setInterval(loadGameData, 2000);
      
      // Subscribe to realtime updates
      mpService.subscribeToGameUpdates(
        (game) => {
          setGameData(game);
          if (game.state === 'running') {
            handleActualGameStart();
          }
        },
        (updatedPlayers) => {
          setPlayers(updatedPlayers);
        }
      );
      
      return () => {
        clearInterval(interval);
        mpService.unsubscribeAll();
      };
    }
  }, [gamePhase, currentGameId]);

  const handleLoginSuccess = async (gameId: string, role: RoleId) => {
    try {
      const playerName = localStorage.getItem('mp_user_name') || 'Spieler';
      
      setMultiplayerMode(true);  // <-- DAS FEHLT!
      setCurrentRole(role);
      setCurrentGameId(gameId);
      setCurrentPlayerName(playerName);
      
      // Set global variables
      (globalThis as any).__multiplayerMode = true;
      (globalThis as any).__currentRole = role;
      (globalThis as any).__gameId = gameId;
      (globalThis as any).__visibleKpis = MultiplayerService.getRoleKpiVisibility(role);
      
       // Save to localStorage
      localStorage.setItem('mp_current_game', gameId);
      localStorage.setItem('mp_current_role', role);
      const nextPhase = role === 'TRAINER' ? 'playing' : 'lobby';
      localStorage.setItem('mp_game_phase', nextPhase);

      // Phase setzen
      setGamePhase(nextPhase);
      
    } catch (err: any) {
      setError(err.message || 'Fehler beim Beitreten');
    }
  };

  const handleActualGameStart = () => {
    // Move from lobby to playing
    setGamePhase('playing');
    localStorage.setItem('mp_game_phase', 'playing');
    
    // Update game state in Supabase if GM
    mpService.isGameMaster().then(isGM => {
      if (isGM && currentGameId) {
        supabase
          .from('games')
          .update({ state: 'running' })
          .eq('id', currentGameId);
      }
    });
  };

  const handleLeaveMultiplayer = async () => {
    try {
      await mpService.leaveGame();
      
      // Clear everything
      localStorage.removeItem('mp_current_game');
      localStorage.removeItem('mp_player_id');
      localStorage.removeItem('mp_current_role');
      localStorage.removeItem('mp_user_name');
      localStorage.removeItem('mp_game_phase');
      localStorage.removeItem('mp_trainer_mode');
      localStorage.removeItem('mp_trainer_game_id');
      
      // Clear global variables
      delete (globalThis as any).__multiplayerMode;
      delete (globalThis as any).__currentRole;
      delete (globalThis as any).__gameId;
      delete (globalThis as any).__visibleKpis;
      delete (globalThis as any).__gameState;
      delete (globalThis as any).__players;
      
      // Reset state
      setMultiplayerMode(false);
      setGamePhase('login');
      setCurrentRole(null);
      setCurrentGameId(null);
      setCurrentPlayerName(null);
      setConnectionError(null);
      
      window.location.href = '/';
    } catch (err) {
      console.error('Error leaving game:', err);
    }
  };

  // Single Player Mode - MIT SHELL
  if (!multiplayerMode) {
    return (
      <Shell backButton={backButton}>
        <div style={{ 
          position: 'fixed', 
          top: 60, 
          right: 16, 
          zIndex: 1000 
        }}>
          <button
            className="btn primary"
            onClick={() => setMultiplayerMode(true)}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            🎮 Mehrspielermodus
          </button>
        </div>
        <App />
      </Shell>
    );
  }

  // Connection Error
  if (connectionError && gamePhase === 'login') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8fafc',
        padding: 20
      }}>
        <div style={{
          background: 'white',
          padding: 32,
          borderRadius: 16,
          maxWidth: 600,
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#ef4444', marginTop: 0 }}>⚠️ Multiplayer nicht verfügbar</h2>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fee2e2',
            borderRadius: 8,
            padding: 16,
            marginBottom: 24
          }}>
            <p style={{ margin: 0, color: '#991b1b' }}>{connectionError}</p>
          </div>
          <button
            onClick={() => {
              setMultiplayerMode(false);
              setConnectionError(null);
            }}
            style={{
              padding: '10px 20px',
              background: 'white',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            Zurück zum Einzelspieler
          </button>
        </div>
      </div>
    );
  }

  // Checking Connection
  if (isCheckingConnection) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Prüfe Verbindung...</h2>
          <p>Verbinde mit Supabase-Server</p>
        </div>
      </div>
    );
  }

  // Login Phase
  if (multiplayerMode && gamePhase === 'login') {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <div style={{ 
          position: 'fixed', 
          top: 16, 
          left: 16, 
          zIndex: 1000 
        }}>
          <button
            className="btn"
            onClick={() => {
              setMultiplayerMode(false);
              setConnectionError(null);
              window.location.reload();
            }}
            style={{
              padding: '8px 16px',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            ← Einzelspieler
          </button>
        </div>
        
        <MultiAuthLogin onSuccess={handleLoginSuccess} />
        
        {error && (
          <div style={{ 
            position: 'fixed', 
            bottom: 16, 
            left: '50%', 
            transform: 'translateX(-50%)',
            background: '#ef4444',
            color: 'white',
            padding: '12px 24px',
            borderRadius: 8,
            zIndex: 1001
          }}>
            {error}
          </div>
        )}
      </div>
    );
  }

  // LOBBY PHASE - Loading
  if (multiplayerMode && gamePhase === 'lobby' && lobbyLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Lade Lobby...</h2>
          <p>Verbinde mit Spiel {currentGameId?.slice(0, 8)}...</p>
        </div>
      </div>
    );
  }

  // LOBBY PHASE - Show Lobby
  if (multiplayerMode && gamePhase === 'lobby' && !lobbyLoading && gameData && currentPlayer) {
    return (
      <EnhancedGameLobby
        game={gameData}
        players={players}
        currentPlayer={currentPlayer}
        onGameStart={handleActualGameStart}
      />
    );
  }

  // PLAYING PHASE
  if (multiplayerMode && gamePhase === 'playing' && currentRole && currentGameId) {
    const visibleKpis = MultiplayerService.getRoleKpiVisibility(currentRole);
    const playerName = currentPlayerName || 'Spieler';
    
    return (
      <div style={{ minHeight: '100vh' }}>
        
        <MultiplayerGameView
          gameId={currentGameId}
          role={currentRole}
          playerName={playerName}
          onLeave={handleLeaveMultiplayer}
        />
      </div>
    );
  }

  return null;
}