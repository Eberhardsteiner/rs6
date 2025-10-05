// src/core/engine/random/randomValues.ts
import type { DailyRandomValues } from '../gameEngine';
import { currentRng } from '@/core/utils/prng';

export function generateDailyRandomValues(currentCash?: number): DailyRandomValues {
  const rng = currentRng();

  let cashInflow = Math.round(rng() * 40000 + 10000);
  let cashOutflow = Math.round(rng() * 35000 + 8000);

  if (currentCash !== undefined) {
    const maxSafeOutflow = Math.max(0, Math.round(currentCash * 0.5));

    if (currentCash < 20000) {
      cashOutflow = Math.min(cashOutflow, Math.round(currentCash * 0.2));
      cashInflow = Math.round(cashInflow * 1.2);
    } else {
      cashOutflow = Math.min(cashOutflow, maxSafeOutflow);
    }

    if (currentCash <= 5000) {
      cashOutflow = 0;
      cashInflow = Math.round(rng() * 30000 + 20000);
    }
  }

  const cashNet = cashInflow - cashOutflow;

  const plInflow = Math.round(rng() * 40000 + 8000);
  const plOutflow = Math.round(rng() * 35000 + 6000);
  const plNet = plInflow - plOutflow;

  return {
    cashInflow,
    cashOutflow,
    cashNet,
    plInflow,
    plOutflow,
    plNet
  };
}

export function generateSafeDailyRandomValues(
  currentCash: number,
  minCashBuffer: number = 10000
): DailyRandomValues {
  const rng = currentRng();
  const safetyMargin = Math.max(minCashBuffer, currentCash * 0.3);

  let cashInflow = Math.round(rng() * 40000 + 10000);
  let cashOutflow = Math.round(rng() * 35000 + 8000);

  const maxAllowedOutflow = Math.max(0, currentCash - safetyMargin);
  cashOutflow = Math.min(cashOutflow, maxAllowedOutflow);

  if (currentCash < safetyMargin) {
    cashOutflow = 0;
    cashInflow = Math.round(rng() * 30000 + 20000);
  }

  const cashNet = cashInflow - cashOutflow;

  const plInflow = Math.round(rng() * 40000 + 8000);
  const plOutflow = Math.round(rng() * 35000 + 6000);
  const plNet = plInflow - plOutflow;

  return {
    cashInflow,
    cashOutflow,
    cashNet,
    plInflow,
    plOutflow,
    plNet
  };
}

export function applyRandomValuesToKpi(
  kpi: { cashEUR: number; profitLossEUR: number },
  randoms: DailyRandomValues
): { cashEUR: number; profitLossEUR: number } {
  return {
    cashEUR: kpi.cashEUR + randoms.cashNet,
    profitLossEUR: kpi.profitLossEUR + randoms.plNet
  };
}
