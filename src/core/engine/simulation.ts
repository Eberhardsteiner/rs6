// src/core/engine/simulation.ts
import type { DecisionBlock, KPI, RoleId } from '@/core/models/domain';
import { currentRng } from '@/core/utils/prng';
import { getWeightsForRole } from './simulation/weights';
import { scoreDelta, calculateGuards, calculatePenalties, calculateJitter } from './simulation/scoring';
import { shouldPickWorstOption, shouldMakeError, pickFromTop3 } from './simulation/errorRate';

export { getWeightsForRole } from './simulation/weights';
export { calculateErrorRate } from './simulation/errorRate';

function rng(): number {
  const r = currentRng();
  return r();
}

export function pickOptionForBlock(
  block: DecisionBlock,
  role: RoleId,
  currentKpi: KPI
): 'a' | 'b' | 'c' | 'd' {
  const w = getWeightsForRole(role);
  const guards = calculateGuards(currentKpi);

  const scored = block.options.map(o => {
    const sBase = scoreDelta(w, o.kpiDelta);
    const variance = Math.max(0, Math.min(1, (o as any)?.variance ?? 0));
    const penalties = calculatePenalties(o.kpiDelta, variance, guards);
    const jitter = calculateJitter(variance, rng);

    const score = sBase - penalties.negCashPenalty - penalties.negBankPenalty - penalties.riskPenalty + jitter;
    return { id: o.id as 'a' | 'b' | 'c' | 'd', score };
  }).sort((a, b) => b.score - a.score);

  if (shouldPickWorstOption(rng)) {
    const last = scored[scored.length - 1];
    return (last?.id ?? scored[2]?.id ?? scored[1]?.id ?? scored[0].id);
  }

  if (shouldMakeError(rng)) {
    return (scored[2]?.id ?? scored[1]?.id ?? scored[0].id);
  }

  const choice = pickFromTop3(rng);
  return scored[choice]?.id ?? scored[0].id;
}
