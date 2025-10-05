// src/components/multiplayer/game/SyncController.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { MultiplayerService } from '@/services/multiplayerService';
import { company } from '@/data/companyProfile';
import type { GameState, KPI } from '@/core/engine/gameEngine';
import type { RoleId } from '@/core/models/domain';
import { errorHandler } from '@/utils/errorHandler';

export interface SyncControllerProps {
  gameId: string;
  role: RoleId;
  playerName: string;
  dispatch: React.Dispatch<any>;
  onGameInfoUpdate?: (info: {
    isGM: boolean;
    otherPlayers: Array<{ id: string; name: string; role: RoleId }>;
  }) => void;
}

export function useSyncController({
  gameId,
  role,
  playerName,
  dispatch,
  onGameInfoUpdate
}: SyncControllerProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const mpService = MultiplayerService.getInstance();

  useEffect(() => {
    const initGame = async () => {
      try {
        const gameInfo = await mpService.getGameInfo();

        const currentPlayerId = mpService.getCurrentPlayerId();
        const currentPlayer = gameInfo.players.find((p: { id: string }) => p.id === currentPlayerId);
        const isGM = currentPlayer?.is_gm || false;

        const otherPlayers = gameInfo.players.filter((p: { id: string }) => p.id !== currentPlayerId);

        if (onGameInfoUpdate) {
          onGameInfoUpdate({ isGM, otherPlayers });
        }

        const gameDate = new Date();
        gameDate.setHours(9 + (gameInfo.game.current_day - 1) * 24, 0, 0, 0);

        dispatch({
          type: 'INIT',
          payload: {
            day: gameInfo.game.current_day,
            currentDate: gameDate,
            kpi: gameInfo.game.kpi_values || company.initialKPI,
            isOver: gameInfo.game.state === 'finished',
            playerName: playerName,
            playerRole: role,
            playerRoles: [role],
            burnPerDayEUR: -411,
            insolvency: false
          } as Partial<GameState>
        });

        setIsInitialized(true);
      } catch (error) {
        errorHandler.error('Failed to initialize game', error, {
          category: 'NETWORK',
          component: 'SyncController',
          action: 'init-game'
        });
      }
    };

    initGame();
  }, [gameId, role, playerName, dispatch, mpService, onGameInfoUpdate]);

  useEffect(() => {
    if (!isInitialized) return;

    const channel = supabase
      .channel(`game:${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'games',
          filter: `id=eq.${gameId}`
        },
        (payload) => {
          const newData = payload.new as { current_day?: number; kpi_values?: KPI; status?: string };

          if (newData.current_day !== undefined) {
            const gameDate = new Date();
            gameDate.setHours(9 + (newData.current_day - 1) * 24, 0, 0, 0);

            dispatch({
              type: 'SET_DAY',
              day: newData.current_day,
              currentDate: gameDate
            });
          }

          if (newData.kpi_values) {
            dispatch({
              type: 'ADMIN_SET_KPI',
              kpi: newData.kpi_values
            });
          }

          if (newData.status === 'finished') {
            dispatch({ type: 'END_GAME' });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, isInitialized, dispatch]);

  return { isInitialized };
}
