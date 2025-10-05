import { useEffect, Dispatch } from 'react';
import type { KPI, RoleId } from '@/core/models/domain';
import type { GameAction } from '../game/GameStateManager';
import type { GameState } from '@/core/engine/gameEngine';
import { MultiplayerService } from '@/services/multiplayerService';
import { errorHandler } from '@/utils/errorHandler';

interface UseGameSubscriptionsProps {
  mpService: MultiplayerService;
  dispatch: Dispatch<GameAction>;
  state: GameState;
  setOtherPlayers: (players: Array<{ id: string; name: string; role: RoleId }>) => void;
  setRandomValuesByDay: (fn: (prev: Record<number, Partial<KPI>>) => Record<number, Partial<KPI>>) => void;
}

export function useGameSubscriptions({
  mpService,
  dispatch,
  state,
  setOtherPlayers,
  setRandomValuesByDay
}: UseGameSubscriptionsProps) {
  useEffect(() => {
    mpService.subscribeToGameUpdates(
      (game: { kpi_values?: KPI; current_day?: number; state?: string; [key: string]: unknown }) => {
        const updatedDate = new Date();
        updatedDate.setHours(9 + ((game.current_day ?? 1) - 1) * 24, 0, 0, 0);

        dispatch({
          type: 'INIT',
          payload: {
            day: game.current_day,
            currentDate: updatedDate,
            kpi: game.kpi_values,
            isOver: game.state === 'finished'
          }
        });

        if (game.current_day !== state.day && state.engineMeta) {
          const meta = state.engineMeta as Record<string, unknown> | undefined;

          if (meta?.dailyRandomValues && (meta.dailyRandomValues as Record<number, Partial<KPI>>)[game.current_day ?? 1]) {
            errorHandler.debug('[MP] Using pre-generated random values for day', undefined, {
              category: 'UNEXPECTED',
              component: 'useGameSubscriptions',
              action: 'game-update',
              metadata: { day: game.current_day }
            });
          } else {
            errorHandler.debug('[MP] Updating random values for new day', undefined, {
              category: 'UNEXPECTED',
              component: 'useGameSubscriptions',
              action: 'game-update',
              metadata: { day: game.current_day }
            });

            setRandomValuesByDay((prev) => {
              if (!prev[game.current_day ?? 1]) {
                const newValues = { ...prev };
                return newValues;
              }
              return prev;
            });
          }
        }
      }
    );

    mpService.subscribeToPlayers(
      (players: Array<{ id: string; name: string; role: RoleId }>) => {
        const currentPlayerId = mpService.getCurrentPlayerId();
        setOtherPlayers(players.filter((p: { id: string; name: string; role: RoleId }) => p.id !== currentPlayerId));
      }
    );

    return () => {
      mpService.unsubscribeAll();
    };
  }, [state.day, state.engineMeta, mpService, dispatch, setOtherPlayers, setRandomValuesByDay]);
}
