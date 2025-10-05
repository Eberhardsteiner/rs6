// src/core/engine/simulation/scoring.ts
import type { KPI } from '@/core/models/domain';
import type { Weights } from './weights';

export function scoreDelta(w: Weights, d: Partial<KPI> | undefined): number {
  const cash = ((d?.cashEUR ?? 0) / 1000);
  const pl = ((d?.profitLossEUR ?? 0) / 1000);
  const cust = (d?.customerLoyalty ?? 0);
  const bank = (d?.bankTrust ?? 0);
  const work = (d?.workforceEngagement ?? 0);
  const pub = (d?.publicPerception ?? 0);
  return w.cash * cash + w.pl * pl + w.cust * cust + w.bank * bank + w.work * work + w.pub * pub;
}

export function calculateGuards(currentKpi: KPI): { cashGuard: number; bankGuard: number } {
  const cashGuard = currentKpi.cashEUR < 20_000 ? 1.6 : 1.0;
  const bankGuard = currentKpi.bankTrust < 50 ? 1.2 : 1.0;
  return { cashGuard, bankGuard };
}

export function calculatePenalties(
  kpiDelta: Partial<KPI> | undefined,
  variance: number,
  guards: { cashGuard: number; bankGuard: number }
): { negCashPenalty: number; negBankPenalty: number; riskPenalty: number } {
  const negCashPenalty = guards.cashGuard * Math.max(0, -(kpiDelta?.cashEUR ?? 0) / 1000);
  const negBankPenalty = guards.bankGuard * Math.max(0, -(kpiDelta?.bankTrust ?? 0));
  const riskPenalty = Math.max(0, variance - 0.3) * 0.8;
  return { negCashPenalty, negBankPenalty, riskPenalty };
}

export function calculateJitter(variance: number, rng: () => number): number {
  const jitterAmp = 1.0 + variance * 0.8;
  return (rng() - 0.5) * 1.2 * jitterAmp;
}
