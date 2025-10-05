// src/core/engine/scoring/scoreCalculation.ts
import type { GameState } from '../gameEngine';
import type { KPI } from '@/core/models/domain';
import type { ScoreWeights } from './scoreWeights';

export interface ScoreContribution {
  kpi: keyof ScoreWeights;
  weight: number;
  value: number;
  points: number;
}

function clamp0to100(x: number): number {
  return Math.max(0, Math.min(100, Math.round(x)));
}

function num(x: any, d = 0): number {
  const v = Number(x);
  return Number.isFinite(v) ? v : d;
}

export function computeBaseScore(
  state: GameState,
  weights: ScoreWeights
): { base: number; contributions: ScoreContribution[]; vals: Record<string, number> } {
  const kpi: KPI = state.kpi as any;
  const vals = {
    bankTrust: clamp0to100(num((kpi as any).bankTrust, 0)),
    publicPerception: clamp0to100(num((kpi as any).publicPerception, 0)),
    customerLoyalty: clamp0to100(num((kpi as any).customerLoyalty, 0)),
    workforceEngagement: clamp0to100(num((kpi as any).workforceEngagement, 0)),
  };

  const contributions: ScoreContribution[] = [
    {
      kpi: 'bankTrust',
      weight: weights.bankTrust,
      value: vals.bankTrust,
      points: Math.round(vals.bankTrust * weights.bankTrust / 100)
    },
    {
      kpi: 'publicPerception',
      weight: weights.publicPerception,
      value: vals.publicPerception,
      points: Math.round(vals.publicPerception * weights.publicPerception / 100)
    },
    {
      kpi: 'customerLoyalty',
      weight: weights.customerLoyalty,
      value: vals.customerLoyalty,
      points: Math.round(vals.customerLoyalty * weights.customerLoyalty / 100)
    },
    {
      kpi: 'workforceEngagement',
      weight: weights.workforceEngagement,
      value: vals.workforceEngagement,
      points: Math.round(vals.workforceEngagement * weights.workforceEngagement / 100)
    },
  ];

  const base = clamp0to100(contributions.reduce((a, c) => a + c.points, 0));
  return { base, contributions, vals };
}

export function computeWeightedScore(
  kpi: KPI,
  weights: ScoreWeights
): number {
  const bankScore = num((kpi as any).bankTrust, 0) * weights.bankTrust / 100;
  const publicScore = num((kpi as any).publicPerception, 0) * weights.publicPerception / 100;
  const customerScore = num((kpi as any).customerLoyalty, 0) * weights.customerLoyalty / 100;
  const workforceScore = num((kpi as any).workforceEngagement, 0) * weights.workforceEngagement / 100;

  return clamp0to100(bankScore + publicScore + customerScore + workforceScore);
}
