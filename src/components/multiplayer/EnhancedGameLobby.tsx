// src/components/multiplayer/EnhancedGameLobby.tsx
import React from 'react';
import GameLobby from './GameLobby';
import TrainerDashboard from './TrainerDashboard';

type GameLobbyProps = React.ComponentProps<typeof GameLobby>;

export default function EnhancedGameLobby(props: GameLobbyProps) {
  const [resolved, setResolved] = React.useState(false);
  const [isTrainer, setIsTrainer] = React.useState(false);
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

      setIsTrainer(bypass || lsRole === 'TRAINER');
      setGameId(idFromProps || idFromLs || idFromUrl || '');
    } finally {
      setResolved(true); // verhindert "Flackern" der Lobby vor dem Umschalten
    }
  }, [ (props as any)?.game?.id ]);

  if (!resolved) return null;

  if (isTrainer && gameId) {
    // Direkter Sprung ins Trainer-Dashboard
    return (
      <TrainerDashboard
        gameId={gameId}
        onLeave={() => {
          // TrainerDashboard hat bereits einen eigenen Leave-Flow;
          // hier optional: Navigation zurück auf Landing Page, falls gewünscht.
        }}
      />
    );
  }

  // Standardfall: Spielerlobby
  return <GameLobby {...props} />;
}
