// src/components/multiplayer/EnhancedGameLobby.tsx
import React from 'react';
import GameLobby from './GameLobby';
import TrainerAuthGate, { isTrainerAuthenticated, clearTrainerAuth } from './TrainerAuthGate';

// TrainerDashboard lazy importieren (robust gegen Ladefehler)
const TrainerDashboard = React.lazy(async () => {
  try {
    return await import('./TrainerDashboard');
  } catch (e) {
    console.error('TrainerDashboard lazy import failed:', e);
    return {
      default: ({ onLeave }: any) => (
        <div style={{ padding: 20, color: '#b91c1c' }}>
          Fehler beim Laden des Trainer‑Dashboards. Bitte die Seite neu laden.
          <div style={{ marginTop: 12 }}>
            <button onClick={onLeave}>Zurück</button>
          </div>
        </div>
      )
    };
  }
});

// Explizite Error‑Boundary, damit Dashboard‑Fehler die App nicht crashen
class TrainerErrorBoundary extends React.Component<
  { children: React.ReactNode; onLeave: () => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[TrainerErrorBoundary] Fehler im Trainer-Dashboard:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 40, textAlign: 'center', background: '#fef2f2',
          minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: 600, background: 'white', padding: 32, borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ margin: '0 0 12px', color: '#991b1b' }}>Fehler im Trainer‑Dashboard</h2>
            <p style={{ margin: '0 0 24px', color: '#6b7280' }}>
              {this.state.error?.message || 'Ein unerwarteter Fehler ist aufgetreten.'}
            </p>
            <button
              onClick={this.props.onLeave}
              style={{
                padding: '12px 24px', background: '#3b82f6', color: 'white',
                border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 16
              }}
            >
              Zurück zur Anmeldung
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

type GameLobbyProps = React.ComponentProps<typeof GameLobby>;

export default function EnhancedGameLobby(props: GameLobbyProps) {
  const [resolved, setResolved] = React.useState(false);
  const [isTrainer, setIsTrainer] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [gameId, setGameId] = React.useState<string>('');

  React.useEffect(() => {
    try {
      const lsRole = (localStorage.getItem('mp_current_role') || '').toUpperCase();
      const bypass = localStorage.getItem('mp_trainer_mode') === 'true';
      const idFromProps = (props as any)?.game?.id as string | undefined;
      const idFromLs =
        localStorage.getItem('mp_current_game') ||
        localStorage.getItem('mp_trainer_game_id') ||
        '';
      const idFromUrl = new URLSearchParams(window.location.search).get('game') || '';

      const trainerMode = bypass || lsRole === 'TRAINER';
      setIsTrainer(trainerMode);
      setGameId(idFromProps || idFromLs || idFromUrl || '');

      if (trainerMode) {
        setIsAuthenticated(isTrainerAuthenticated());
      }
    } finally {
      setResolved(true);
    }
  }, [ (props as any)?.game?.id ]);

  if (!resolved) return null;

  if (isTrainer && gameId) {
    if (!isAuthenticated) {
      return (
        <TrainerAuthGate
          gameId={gameId}
          onAuthenticated={() => setIsAuthenticated(true)}
          onCancel={() => {
            clearTrainerAuth();
            setIsTrainer(false);
            window.location.href = '/?multiplayer=1';
          }}
        />
      );
    }

    return (
      <TrainerErrorBoundary onLeave={() => { clearTrainerAuth(); window.location.href = '/?multiplayer=1'; }}>
        <React.Suspense fallback={
          <div style={{
            minHeight: '100vh', display: 'flex',
            alignItems: 'center', justifyContent: 'center', background: '#f8fafc'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
              <div style={{ fontSize: 18, color: '#6b7280' }}>Lade Trainer‑Dashboard.</div>
            </div>
          </div>
        }>
          <TrainerDashboard
            gameId={gameId}
            onLeave={() => { clearTrainerAuth(); }}
          />
        </React.Suspense>
      </TrainerErrorBoundary>
    );
  }

  return <GameLobby {...props} />;
}
