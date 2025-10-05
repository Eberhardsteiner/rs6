import { useEffect, Dispatch } from 'react';
import type { RoleId, KPI } from '@/core/models/domain';
import type { GameAction } from '../game/GameStateManager';
import { MultiplayerService } from '@/services/multiplayerService';
import { makeRng } from '@/core/utils/prng';
import { generateDailyRandomValues } from '@/core/engine/gameEngine';
import { errorHandler } from '@/utils/errorHandler';

interface UseGameInitializationProps {
  gameId: string;
  playerName: string;
  role: RoleId;
  dispatch: Dispatch<GameAction>;
  company: { initialKPI: KPI };
  setIsGM: (value: boolean) => void;
  setOtherPlayers: (players: Array<{ id: string; name: string; role: RoleId }>) => void;
  setRandomValuesByDay: (values: Record<number, Partial<KPI>>) => void;
  setRandomNewsByDay: (values: Record<number, Partial<KPI>>) => void;
  setScenarioOverrides: (overrides: any) => void;
  setScoringWeights: (weights: any) => void;
  setRoundSeconds: (seconds: number) => void;
  setCreditSettings: (settings: { enabled: boolean } | null) => void;
  setWhatIfEnabled: (enabled: boolean) => void;
  setSaveLoadEnabled: (enabled: boolean) => void;
}

export function useGameInitialization({
  gameId,
  playerName,
  role,
  dispatch,
  company,
  setIsGM,
  setOtherPlayers,
  setRandomValuesByDay,
  setRandomNewsByDay,
  setScenarioOverrides,
  setScoringWeights,
  setRoundSeconds,
  setCreditSettings,
  setWhatIfEnabled,
  setSaveLoadEnabled
}: UseGameInitializationProps) {
  useEffect(() => {
    const initGame = async () => {
      try {
        const mpService = MultiplayerService.getInstance(gameId);
        const gameInfo = await mpService.getGameInfo();

        const currentPlayerId = mpService.getCurrentPlayerId();
        const currentPlayer = gameInfo.players.find((p: { id: string; name: string; role: RoleId }) => p.id === currentPlayerId);
        setIsGM(currentPlayer?.is_gm || false);

        setOtherPlayers(gameInfo.players.filter((p: { id: string; name: string; role: RoleId }) => p.id !== currentPlayerId));

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
            playerRoles: [role]
          }
        });

        let allRandomValues: Record<number, Partial<KPI>> = {};
        let randomNews: Record<number, Partial<KPI>> = {};

        if (gameInfo.settings?.seed) {
          const seed = gameInfo.settings.seed;
          errorHandler.debug('[MP] Using game seed', undefined, { category: 'UNEXPECTED', component: 'useGameInitialization', action: 'init-game', metadata: { seed } });

          globalThis.__gameSeed = seed;

          for (let day = 1; day <= 14; day++) {
            const daySpecificSeed = seed + day * 1000;
            const dayRng = makeRng(daySpecificSeed);
            globalThis.__rng = dayRng;

            const baseKpi = day === 1
              ? (gameInfo.game.kpi_values?.cashEUR || company.initialKPI.cashEUR)
              : 100000;

            const dayRandoms = generateDailyRandomValues(baseKpi);
            allRandomValues[day] = dayRandoms;

            if (globalThis.__randomNews) {
              const g = globalThis as any;
              const useIntensity = !!g.__featureEventIntensity;
              const adminIntensity = g.__adminEventIntensity ?? 1;

              let genIntensity: 'low' | 'normal' | 'high' = 'normal';
              if (useIntensity) {
                if (adminIntensity < 0.7) genIntensity = 'low';
                else if (adminIntensity > 1.3) genIntensity = 'high';
              }

              const newsArr = g.__randomNews(role, genIntensity);
              const newsForDay = newsArr.find((n: any) => n.day === day);
              if (newsForDay?.kpiImpact) {
                randomNews[day] = newsForDay.kpiImpact;
              }
            }
          }

          setRandomValuesByDay(allRandomValues);
          setRandomNewsByDay(randomNews);
        }

        if (gameInfo.settings?.scenario_overrides) {
          setScenarioOverrides(gameInfo.settings.scenario_overrides);
        }
        if (gameInfo.settings?.scoring_weights) {
          setScoringWeights(gameInfo.settings.scoring_weights);
        }
        if (gameInfo.settings?.round_seconds) {
          setRoundSeconds(gameInfo.settings.round_seconds);
        }

        setCreditSettings(gameInfo.settings?.credit_enabled ? { enabled: true } : null);
        setWhatIfEnabled(!!gameInfo.settings?.what_if_enabled);
        setSaveLoadEnabled(!!gameInfo.settings?.save_load_enabled);

      } catch (error) {
        errorHandler.error('Failed to initialize multiplayer game', error, {
          category: 'UNEXPECTED',
          component: 'useGameInitialization',
          action: 'init-game'
        });
      }
    };

    initGame();
  }, [gameId, playerName, role]);
}
