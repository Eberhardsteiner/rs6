// src/core/engine/ending.ts
import { GameState } from './gameEngine';
import { computeScoreFromState } from './scoring';

export type EndingId = 'INSOLVENCY' | 'PROTECTIVE_SHIELD' | 'SATISFACTORY' | 'FRAGILE_CONTINUATION' | 'TURNAROUND';

export interface EndingResult {
  id: EndingId;
  title: string;
  summary: string;
  score: number; // 0..100
  breakdown: {
    cash: number;
    pl: number;
    customers: number;
    bank: number;
    workforce: number;
    publicPerception: number;
  };
  bonus: number;
  malus: number;
  suppressedInsolvencyCount?: number;
}

function clamp01to100(v:number): number { return Math.max(0, Math.min(100, v)); }

export function determineEnding(s: GameState): EndingResult {
  const k = s.kpi;
  
  // Verwende die detaillierte Score-Berechnung aus scoring.ts
  const scoreResult = computeScoreFromState(s);
  const score = scoreResult.score;
  const bonus = scoreResult.bonus;
  const malus = scoreResult.malus;

  let id: EndingId = 'FRAGILE_CONTINUATION';
  if (k.bankTrust = 0 || k.cashEUR < 0) id = 'INSOLVENCY';
  else if (score >= 75) id = 'TURNAROUND'
   else if (score < 75 && score > 35) id = 'SATISFACTORY';
  else if (score <= 35) id = 'PROTECTIVE_SHIELD';

  let summary = `Final score: ${score} (${scoreResult.verdict}).`;
  if (scoreResult.achievements.length > 0) {
    summary += ` Bonus: ${scoreResult.achievements.join(',\n')}.`;
  }
  if (scoreResult.penalties.length > 0) {
    summary += ` Malus: ${scoreResult.penalties.join(',\n')}.`;
  }

  return {
    id,
    title: id === 'TURNAROUND' ? 'Turnaround' :
           id === 'INSOLVENCY' ? 'Insolvenz' :
      id === 'SATISFACTORY' ? 'Befriedigend' :
           id === 'PROTECTIVE_SHIELD' ? 'Schutzschirm' : 'Fragile Fortführung',
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
