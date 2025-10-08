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
      const bypass = localStorage.getItem('mp_trainer_mode') === 'true';
      const idFromProps = (props as any)?.game?.id as string | undefined;
      const idFromLs =
        localStorage.getItem('mp_current_game') ||
        localStorage.getItem('mp_trainer_game_id') ||
        '';
      const idFromUrl = new URLSearchParams(window.location.search).get('game') || '';

      const trainerMode = bypass && isTrainerAuthenticated();
      setIsTrainer(trainerMode);
      setIsAuthenticated(trainerMode); // wenn Token gültig, direkt als authentifiziert markieren
      setGameId(idFromProps || idFromLs || idFromUrl || '');
    } finally {
      setResolved(true);
    }
  }, [ (props as any)?.game?.id ]);

  if (!resolved) return null;

  if (isTrainer && gameId) {
    return (
      <TrainerDashboard
        gameId={gameId}
        onLeave={() => {
          clearTrainerAuth();
          // Bei Leave auch Flags leeren
          localStorage.removeItem('mp_trainer_mode');
          localStorage.removeItem('mp_trainer_game_id');
        }}
      />
    );
  }

  // Kein gültiger Trainer-Token: normale Lobby/Rollenauswahl
  return <GameLobby {...props} />;
}
