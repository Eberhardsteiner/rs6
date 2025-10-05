// src/core/engine/ending/endingDetermination.ts
import type { GameState } from '../gameEngine';
import type { KPI } from '@/core/models/domain';
import type { EndingId } from './endingTypes';

export function determineEndingId(state: GameState, score: number): EndingId {
  const k = state.kpi;

  if (k.bankTrust <= 0 || k.cashEUR < 0) {
    return 'INSOLVENCY';
  }

  if (score >= 75) {
    return 'TURNAROUND';
  }

  if (score > 35) {
    return 'SATISFACTORY';
  }

  if (score <= 35) {
    return 'PROTECTIVE_SHIELD';
  }

  return 'FRAGILE_CONTINUATION';
}

export function isGameEndCondition(kpi: KPI): boolean {
  return kpi.bankTrust <= 0 || kpi.cashEUR < 0;
}

export function getEndingThreshold(endingId: EndingId): { min: number; max: number } {
  switch (endingId) {
    case 'TURNAROUND':
      return { min: 75, max: 100 };
    case 'SATISFACTORY':
      return { min: 36, max: 74 };
    case 'PROTECTIVE_SHIELD':
      return { min: 0, max: 35 };
    case 'INSOLVENCY':
      return { min: 0, max: 0 };
    case 'FRAGILE_CONTINUATION':
      return { min: 0, max: 100 };
  }
}
