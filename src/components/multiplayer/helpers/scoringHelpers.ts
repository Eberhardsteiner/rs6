// src/components/multiplayer/helpers/scoringHelpers.ts
import type { KPI } from '@/core/models/domain';

export type SoftScoringWeights = {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
};

export function getScoringWeightsSafe(): SoftScoringWeights {
  const g = globalThis;
  const w = g.__scoringWeights || {
    bankTrust: 25,
    publicPerception: 25,
    customerLoyalty: 25,
    workforceEngagement: 25
  };

  return {
    bankTrust: Number(w.bankTrust || 25),
    publicPerception: Number(w.publicPerception || 25),
    customerLoyalty: Number(w.customerLoyalty || 25),
    workforceEngagement: Number(w.workforceEngagement || 25),
  };
}

export function computeSoftScore(kpi: KPI, weights: SoftScoringWeights): number {
  const total = weights.bankTrust + weights.publicPerception +
                weights.customerLoyalty + weights.workforceEngagement;

  if (total === 0) return 0;

  const score = (
    kpi.bankTrust * weights.bankTrust +
    kpi.publicPerception * weights.publicPerception +
    kpi.customerLoyalty * weights.customerLoyalty +
    kpi.workforceEngagement * weights.workforceEngagement
  ) / total;

  return score;
}

export function compareKPIsByScore(kpi1: KPI, kpi2: KPI): number {
  const weights = getScoringWeightsSafe();
  const score1 = computeSoftScore(kpi1, weights);
  const score2 = computeSoftScore(kpi2, weights);
  return score2 - score1;
}

export function getPerformanceLevel(score: number): 'excellent' | 'good' | 'average' | 'poor' | 'critical' {
  if (score >= 80) return 'excellent';
  if (score >= 65) return 'good';
  if (score >= 50) return 'average';
  if (score >= 30) return 'poor';
  return 'critical';
}

export function getPerformanceColor(level: ReturnType<typeof getPerformanceLevel>): string {
  switch (level) {
    case 'excellent': return '#10b981';
    case 'good': return '#3b82f6';
    case 'average': return '#f59e0b';
    case 'poor': return '#ef4444';
    case 'critical': return '#991b1b';
  }
}
