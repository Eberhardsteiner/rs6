// src/components/multiplayer/EnhancedGameLobby.tsx
import React from 'react';
import GameLobby from './GameLobby';
import TrainerDashboard from './TrainerDashboard';
import TrainerAuthGate, { isTrainerAuthenticated, clearTrainerAuth } from './TrainerAuthGate';

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
      <TrainerDashboard
        gameId={gameId}
        onLeave={() => {
          clearTrainerAuth();
        }}
      />
    );
  }

  return <GameLobby {...props} />;
}
