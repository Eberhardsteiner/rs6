// src/core/engine/ending.ts
import { GameState } from './gameEngine';
import { computeScoreFromState } from './scoring';
import type { EndingId, EndingResult } from './ending/endingTypes';
import { ENDING_TITLES } from './ending/endingTypes';
import { determineEndingId } from './ending/endingDetermination';

export type { EndingId, EndingResult };
export { ENDING_TITLES, ENDING_DESCRIPTIONS } from './ending/endingTypes';
export { determineEndingId, isGameEndCondition, getEndingThreshold } from './ending/endingDetermination';

function clamp01to100(v: number): number {
  return Math.max(0, Math.min(100, v));
}

export function determineEnding(s: GameState): EndingResult {
  const k = s.kpi;

  const scoreResult = computeScoreFromState(s);
  const score = scoreResult.score;
  const bonus = scoreResult.bonus;
  const malus = scoreResult.malus;

  const id = determineEndingId(s, score);

  let summary = `Final score: ${score} (${scoreResult.verdict}).`;
  if (scoreResult.achievements.length > 0) {
    summary += ` Bonus: ${scoreResult.achievements.join(',\n')}.`;
  }
  if (scoreResult.penalties.length > 0) {
    summary += ` Malus: ${scoreResult.penalties.join(',\n')}.`;
  }

  return {
    id,
    title: ENDING_TITLES[id],
    summary,
    score,
    breakdown: {
      cash: k.cashEUR,
      pl: k.profitLossEUR,
      customers: k.customerLoyalty,
      bank: k.bankTrust,
      workforce: k.workforceEngagement,
      publicPerception: k.publicPerception
    },
    bonus,
    malus,
    suppressedInsolvencyCount: s.engineMeta?.suppressedInsolvencyCount || 0
  };
}
