// src/core/engine/scoring/scoreWeights.ts
import type { GameState } from '../gameEngine';

export interface ScoreWeights {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
}

export const DEFAULT_WEIGHTS: ScoreWeights = {
  bankTrust: 25,
  publicPerception: 25,
  customerLoyalty: 25,
  workforceEngagement: 25
};

function num(x: any, d = 0): number {
  const v = Number(x);
  return Number.isFinite(v) ? v : d;
}

export function normalizeWeights(w: Partial<ScoreWeights> | undefined): ScoreWeights {
  const src: ScoreWeights = {
    bankTrust: num(w?.bankTrust, DEFAULT_WEIGHTS.bankTrust),
    publicPerception: num(w?.publicPerception, DEFAULT_WEIGHTS.publicPerception),
    customerLoyalty: num(w?.customerLoyalty, DEFAULT_WEIGHTS.customerLoyalty),
    workforceEngagement: num(w?.workforceEngagement, DEFAULT_WEIGHTS.workforceEngagement)
  };

  const sum = src.bankTrust + src.publicPerception + src.customerLoyalty + src.workforceEngagement;
  if (sum <= 0) return { ...DEFAULT_WEIGHTS };

  const f = 100 / sum;
  return {
    bankTrust: Math.round(src.bankTrust * f),
    publicPerception: Math.round(src.publicPerception * f),
    customerLoyalty: Math.round(src.customerLoyalty * f),
    workforceEngagement: Math.round(src.workforceEngagement * f),
  };
}

export function readWeights(state: GameState): ScoreWeights {
  const fromMeta = (state.engineMeta as any)?.scoringWeights as Partial<ScoreWeights> | undefined;
  const fromGlobal = (globalThis as any).__scoringWeights as Partial<ScoreWeights> | undefined;
  return normalizeWeights(fromMeta ?? fromGlobal ?? DEFAULT_WEIGHTS);
}

export function weightsAreBalanced(weights: ScoreWeights): boolean {
  const sum = weights.bankTrust + weights.publicPerception +
              weights.customerLoyalty + weights.workforceEngagement;
  return Math.abs(sum - 100) < 1;
}

export function weightsAreEqual(weights: ScoreWeights): boolean {
  return weights.bankTrust === 25 &&
         weights.publicPerception === 25 &&
         weights.customerLoyalty === 25 &&
         weights.workforceEngagement === 25;
}
