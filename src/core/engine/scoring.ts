// src/core/engine/scoring.ts
import type { GameState } from '@/core/engine/gameEngine';
import type { KPI } from '@/core/models/domain';
import { readWeights, normalizeWeights, type ScoreWeights, DEFAULT_WEIGHTS } from './scoring/scoreWeights';
import { computeBaseScore, type ScoreContribution } from './scoring/scoreCalculation';
import { computeBasicAdjustments, combineAdjustments } from './scoring/scoreAdjustments';
import { computeExtras, detectInsolvencyAny } from './scoring/scoreExtras';

export type { ScoreWeights, ScoreContribution };
export { DEFAULT_WEIGHTS, normalizeWeights };

export type ScoreVerdict = 'Exzellent' | 'Gut' | 'Stabil' | 'Fragil' | 'Kritisch';

export interface ScoreResult {
  base: number;
  score: number;
  verdict: ScoreVerdict;
  contributions: ScoreContribution[];
  weights: ScoreWeights;
  bonus: number;
  malus: number;
  achievements: string[];
  penalties: string[];
}

function clamp0to100(x: number): number {
  return Math.max(0, Math.min(100, Math.round(x)));
}

function verdictFor(score: number): ScoreVerdict {
  if (score >= 85) return 'Exzellent';
  if (score >= 70) return 'Gut';
  if (score >= 55) return 'Stabil';
  if (score >= 40) return 'Fragil';
  return 'Kritisch';
}

export function computeScoreFromState(state: GameState): ScoreResult {
  const weights = readWeights(state);
  const { base, contributions } = computeBaseScore(state, weights);
  const adj = computeBasicAdjustments(state);
  const extra = computeExtras(state);

  const rawFinal = base + adj.bonus + extra.bonus - (adj.malus + extra.malus);

  let clamped = clamp0to100(rawFinal);

  if (detectInsolvencyAny(state)) {
    clamped = Math.min(clamped, 54);
  }

  const verdict = verdictFor(clamped);

  return {
    base,
    score: clamped,
    verdict,
    contributions,
    weights,
    bonus: adj.bonus + extra.bonus,
    malus: adj.malus + extra.malus,
    achievements: [...adj.achievements, ...extra.achievements],
    penalties: [...adj.penalties, ...extra.penalties],
  };
}

export function computeScoreFromKpiSnapshot(state: GameState): ScoreResult {
  return computeScoreFromState(state);
}

export function computeScoreFromKPI(state: GameState): ScoreResult {
  return computeScoreFromState(state);
}
