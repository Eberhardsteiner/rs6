// src/utils/kpiUtils.ts
// Utility-Funktionen für KPI-Berechnungen und -Manipulationen

import type { KPI } from '@/core/models/domain';
import { createEmptyKPI, clampKPI } from '@/types/core';

// =============================================================================
// KPI Calculations
// =============================================================================

export function addKPIDelta(base: KPI, delta: Partial<KPI>): KPI {
  const result = { ...base };

  for (const key of Object.keys(delta) as (keyof KPI)[]) {
    const value = delta[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      result[key] = Math.round((base[key] ?? 0) + value);
    }
  }

  return clampKPI(result);
}

export function subtractKPIDelta(base: KPI, delta: Partial<KPI>): KPI {
  const inverseDelta: Partial<KPI> = {};

  for (const key of Object.keys(delta) as (keyof KPI)[]) {
    const value = delta[key];
    if (typeof value === 'number') {
      inverseDelta[key] = -value;
    }
  }

  return addKPIDelta(base, inverseDelta);
}

export function sumDeltas(deltas: Array<Partial<KPI>>): Partial<KPI> {
  const result: Partial<Record<keyof KPI, number>> = {};

  for (const delta of deltas) {
    for (const key of Object.keys(delta) as (keyof KPI)[]) {
      const value = delta[key];
      if (typeof value === 'number' && Number.isFinite(value)) {
        result[key] = Math.round((result[key] ?? 0) + value);
      }
    }
  }

  return result;
}

export function scaleKPIDelta(delta: Partial<KPI>, factor: number): Partial<KPI> {
  const result: Partial<KPI> = {};

  for (const key of Object.keys(delta) as (keyof KPI)[]) {
    const value = delta[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      result[key] = Math.round(value * factor);
    }
  }

  return result;
}

export function averageKPIs(kpis: KPI[]): KPI {
  if (kpis.length === 0) {
    return createEmptyKPI();
  }

  const sum = kpis.reduce((acc, kpi) => addKPIDelta(acc, kpi), createEmptyKPI());

  return {
    cashEUR: Math.round(sum.cashEUR / kpis.length),
    profitLossEUR: Math.round(sum.profitLossEUR / kpis.length),
    customerLoyalty: Math.round(sum.customerLoyalty / kpis.length),
    bankTrust: Math.round(sum.bankTrust / kpis.length),
    workforceEngagement: Math.round(sum.workforceEngagement / kpis.length),
    publicPerception: Math.round(sum.publicPerception / kpis.length)
  };
}

// =============================================================================
// KPI Comparison
// =============================================================================

export function compareKPIs(a: KPI, b: KPI): Partial<KPI> {
  return {
    cashEUR: b.cashEUR - a.cashEUR,
    profitLossEUR: b.profitLossEUR - a.profitLossEUR,
    customerLoyalty: b.customerLoyalty - a.customerLoyalty,
    bankTrust: b.bankTrust - a.bankTrust,
    workforceEngagement: b.workforceEngagement - a.workforceEngagement,
    publicPerception: b.publicPerception - a.publicPerception
  };
}

export function getKPIChangePercentage(before: KPI, after: KPI, key: keyof KPI): number {
  const beforeValue = before[key];
  const afterValue = after[key];

  if (beforeValue === 0) {
    return afterValue === 0 ? 0 : 100;
  }

  return ((afterValue - beforeValue) / Math.abs(beforeValue)) * 100;
}

// =============================================================================
// KPI Scoring
// =============================================================================

export interface ScoringWeights {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
}

export function calculateWeightedScore(kpi: KPI, weights: ScoringWeights): number {
  const score =
    (kpi.bankTrust * weights.bankTrust / 100) +
    (kpi.publicPerception * weights.publicPerception / 100) +
    (kpi.customerLoyalty * weights.customerLoyalty / 100) +
    (kpi.workforceEngagement * weights.workforceEngagement / 100);

  return Math.round(score * 100) / 100;
}

export function getKPIGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 45) return 'D';
  return 'F';
}

export function getKPIRating(score: number): string {
  if (score >= 90) return 'Exzellent';
  if (score >= 75) return 'Sehr gut';
  if (score >= 60) return 'Gut';
  if (score >= 45) return 'Ausreichend';
  return 'Ungenügend';
}

// =============================================================================
// KPI Formatting
// =============================================================================

export function formatCurrency(amount: number, showSign: boolean = false): string {
  const formatted = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.abs(amount));

  if (showSign && amount > 0) {
    return `+${formatted}`;
  } else if (amount < 0) {
    return `-${formatted}`;
  }

  return formatted;
}

export function formatPercentage(value: number, decimals: number = 0, showSign: boolean = false): string {
  const formatted = value.toFixed(decimals);

  if (showSign && value > 0) {
    return `+${formatted}%`;
  } else if (value < 0) {
    return `${formatted}%`;
  }

  return `${formatted}%`;
}

export function formatKPIValue(key: keyof KPI, value: number, showSign: boolean = false): string {
  if (key === 'cashEUR' || key === 'profitLossEUR') {
    return formatCurrency(value, showSign);
  } else {
    return formatPercentage(value, 0, showSign);
  }
}

export function formatKPIDelta(delta: Partial<KPI>): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(delta)) {
    if (value !== undefined && typeof value === 'number' && value !== 0) {
      const formatted = formatKPIValue(key as keyof KPI, value, true);
      const label = getKPILabel(key as keyof KPI);
      parts.push(`${label}: ${formatted}`);
    }
  }

  return parts.join(', ') || 'Keine Änderungen';
}

// =============================================================================
// KPI Labels and Colors
// =============================================================================

export function getKPILabel(key: keyof KPI): string {
  const labels: Record<keyof KPI, string> = {
    cashEUR: 'Liquidität',
    profitLossEUR: 'Gewinn/Verlust',
    customerLoyalty: 'Kundenloyalität',
    bankTrust: 'Bankvertrauen',
    workforceEngagement: 'Mitarbeiterengagement',
    publicPerception: 'Öffentliche Wahrnehmung'
  };

  return labels[key] || key;
}

export function getKPIIcon(key: keyof KPI): string {
  const icons: Record<keyof KPI, string> = {
    cashEUR: '💰',
    profitLossEUR: '📊',
    customerLoyalty: '👥',
    bankTrust: '🏦',
    workforceEngagement: '⚡',
    publicPerception: '🌍'
  };

  return icons[key] || '📈';
}

export function getKPIColor(key: keyof KPI, value: number): string {
  if (key === 'cashEUR') {
    if (value < 0) return 'text-red-600';
    if (value < 100000) return 'text-yellow-600';
    return 'text-green-600';
  }

  if (key === 'profitLossEUR') {
    if (value < 0) return 'text-red-600';
    if (value < 50000) return 'text-yellow-600';
    return 'text-green-600';
  }

  // Percentage-based KPIs
  if (value < 30) return 'text-red-600';
  if (value < 60) return 'text-yellow-600';
  return 'text-green-600';
}

export function getKPIDeltaColor(value: number): string {
  if (value < 0) return 'text-red-600';
  if (value > 0) return 'text-green-600';
  return 'text-gray-600';
}

// =============================================================================
// KPI Validation Helpers
// =============================================================================

export function isKPICritical(kpi: KPI): boolean {
  return (
    kpi.cashEUR < 0 ||
    kpi.customerLoyalty < 20 ||
    kpi.bankTrust < 20 ||
    kpi.workforceEngagement < 20 ||
    kpi.publicPerception < 20
  );
}

export function getKPICriticalFields(kpi: KPI): (keyof KPI)[] {
  const critical: (keyof KPI)[] = [];

  if (kpi.cashEUR < 0) critical.push('cashEUR');
  if (kpi.customerLoyalty < 20) critical.push('customerLoyalty');
  if (kpi.bankTrust < 20) critical.push('bankTrust');
  if (kpi.workforceEngagement < 20) critical.push('workforceEngagement');
  if (kpi.publicPerception < 20) critical.push('publicPerception');

  return critical;
}

export function getKPIWarningFields(kpi: KPI): (keyof KPI)[] {
  const warnings: (keyof KPI)[] = [];

  if (kpi.cashEUR >= 0 && kpi.cashEUR < 100000) warnings.push('cashEUR');
  if (kpi.profitLossEUR < 0) warnings.push('profitLossEUR');
  if (kpi.customerLoyalty >= 20 && kpi.customerLoyalty < 40) warnings.push('customerLoyalty');
  if (kpi.bankTrust >= 20 && kpi.bankTrust < 40) warnings.push('bankTrust');
  if (kpi.workforceEngagement >= 20 && kpi.workforceEngagement < 40) warnings.push('workforceEngagement');
  if (kpi.publicPerception >= 20 && kpi.publicPerception < 40) warnings.push('publicPerception');

  return warnings;
}

// =============================================================================
// KPI History Analysis
// =============================================================================

export interface KPITrend {
  direction: 'up' | 'down' | 'stable';
  magnitude: number;
  confidence: 'high' | 'medium' | 'low';
}

export function analyzeKPITrend(history: KPI[], key: keyof KPI, periods: number = 3): KPITrend {
  if (history.length < 2) {
    return { direction: 'stable', magnitude: 0, confidence: 'low' };
  }

  const recent = history.slice(-Math.min(periods, history.length));
  const values = recent.map(kpi => kpi[key]);

  let upCount = 0;
  let downCount = 0;
  let totalChange = 0;

  for (let i = 1; i < values.length; i++) {
    const change = values[i] - values[i - 1];
    totalChange += change;

    if (change > 0) upCount++;
    else if (change < 0) downCount++;
  }

  const avgChange = totalChange / (values.length - 1);
  const direction: 'up' | 'down' | 'stable' =
    Math.abs(avgChange) < 1 ? 'stable' :
    avgChange > 0 ? 'up' : 'down';

  const confidence: 'high' | 'medium' | 'low' =
    values.length >= periods && (upCount === values.length - 1 || downCount === values.length - 1) ? 'high' :
    values.length >= periods / 2 ? 'medium' : 'low';

  return {
    direction,
    magnitude: Math.abs(avgChange),
    confidence
  };
}

export function getKPIVolatility(history: KPI[], key: keyof KPI): number {
  if (history.length < 2) return 0;

  const values = history.map(kpi => kpi[key]);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;

  return Math.sqrt(variance);
}
