// src/components/multiplayer/game/GameStateManager.tsx
import { useReducer, useEffect } from 'react';
import { company } from '@/data/companyProfile';
import { reducer } from '@/core/engine/reducers';
import type { GameState } from '@/core/engine/gameEngine';
import type { RoleId } from '@/core/models/domain';

export interface GameStateManagerProps {
  playerName: string;
  role: RoleId;
  onStateChange?: (state: GameState) => void;
}

export function useGameStateManager({ playerName, role, onStateChange }: GameStateManagerProps) {
  const initialDate = new Date();
  initialDate.setHours(9, 0, 0, 0);

  const [state, dispatch] = useReducer(reducer, {
    day: 1,
    currentDate: initialDate,
    kpi: company.initialKPI,
    kpiHistory: [],
    pendingDeltas: [],
    log: [],
    playerName: playerName,
    playerRole: role,
    playerRoles: [role],
    burnPerDayEUR: -411,
    isOver: false,
    insolvency: false
  } as GameState);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

  return { state, dispatch };
}
