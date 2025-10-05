// src/core/engine/scoring/scoreAdjustments.ts
import type { GameState } from '../gameEngine';
import type { KPI } from '@/core/models/domain';
import { isPerceivedInsolvent } from '../ending_extras';

function num(x: any, d = 0): number {
  const v = Number(x);
  return Number.isFinite(v) ? v : d;
}

export interface Adjustments {
  bonus: number;
  malus: number;
  achievements: string[];
  penalties: string[];
}

export function computeBasicAdjustments(state: GameState): Adjustments {
  const k = state.kpi as any as KPI;
  const meta: any = state.engineMeta ?? {};
  const achievements: string[] = [];
  const penalties: string[] = [];

  let bonus = 0;
  let malus = 0;

  if (num(k.bankTrust, 0) >= 80) {
    bonus += 4;
    achievements.push('Bankvertrauen ≥ 80');
  }
  if (num(k.customerLoyalty, 0) >= 80) {
    bonus += 3;
    achievements.push('Kundentreue ≥ 80');
  }
  if (num(k.publicPerception, 0) >= 70) {
    bonus += 3;
    achievements.push('Öffentliche Wahrnehmung ≥ 70');
  }
  if (num(k.workforceEngagement, 0) >= 60) {
    bonus += 3;
    achievements.push('Belegschaftsengagement ≥ 60');
  }

  const currentInsolvencyMode = (globalThis as any).__insolvencyMode as ('hard' | 'soft' | 'off' | undefined) ?? 'hard';

  if ((state as any).isOver && !(state as any).insolvency && !isPerceivedInsolvent(k, currentInsolvencyMode)) {
    bonus += 5;
    achievements.push('Kein Insolvenzstatus am Spielende');
  }

  if ((state as any).insolvency) {
    malus += 15;
    penalties.push('Insolvenz am Spielende');
  }

  const warnings = Array.isArray(meta.insoWarnings) ? meta.insoWarnings.length : 0;
  const suppressed = Math.round(meta.suppressedInsolvencyCount || 0);
  const softSignals = warnings + Math.floor(suppressed / 2);
  if (softSignals > 0) {
    const m = Math.min(10, Math.floor(softSignals / 1) * 2);
    malus += m;
    penalties.push(`Insolvenzhinweise (${softSignals})`);
  }

  if (num(k.workforceEngagement, 0) <= 20) {
    malus += 8;
    penalties.push('Team stark demotiviert (≤20)');
  }
  if (num(k.bankTrust, 0) <= 30) {
    malus += 8;
    penalties.push('Bankvertrauen sehr niedrig (≤30)');
  }

  const adj = meta.scoringAdjustments || {};
  const bonusManual = num(adj.bonusManual, 0);
  const malusManual = num(adj.malusManual, 0);

  if (bonusManual) {
    bonus += bonusManual;
    achievements.push(adj.reasonBonus ? `Manueller Bonus: ${adj.reasonBonus}` : 'Manueller Bonus');
  }
  if (malusManual) {
    malus += malusManual;
    penalties.push(adj.reasonMalus ? `Manueller Malus: ${adj.reasonMalus}` : 'Manueller Malus');
  }

  return { bonus, malus, achievements, penalties };
}

export function combineAdjustments(...adjustments: Adjustments[]): Adjustments {
  const combined: Adjustments = {
    bonus: 0,
    malus: 0,
    achievements: [],
    penalties: []
  };

  for (const adj of adjustments) {
    combined.bonus += adj.bonus;
    combined.malus += adj.malus;
    combined.achievements.push(...adj.achievements);
    combined.penalties.push(...adj.penalties);
  }

  return combined;
}
