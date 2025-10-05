// src/core/engine/reducers/kpiCalculations.ts
// Zentrale KPI-Berechnungslogik für Reducer

import type { KPI } from '@/core/models/domain';
import { addKPIDelta, sumDeltas } from '@/utils/kpiUtils';
import { clampKPI } from '@/types/core';

export function mergeDelta(base: KPI, delta?: Partial<KPI>): KPI {
  if (!delta) return base;
  return clampKPI(addKPIDelta(base, delta));
}

export function applyDeltas(base: KPI, deltas: Array<Partial<KPI>>): KPI {
  if (deltas.length === 0) return base;
  const summed = sumDeltas(deltas);
  return mergeDelta(base, summed);
}

export interface KpiReasonEntry {
  source: string;
  delta: Partial<KPI>;
  label?: string;
}

export function addKpiReason(
  reasons: Record<number, KpiReasonEntry[]>,
  day: number,
  entry: KpiReasonEntry
): Record<number, KpiReasonEntry[]> {
  const dayReasons = reasons[day] || [];
  return {
    ...reasons,
    [day]: [...dayReasons, entry]
  };
}

export function getKpiReasonsForDay(
  reasons: Record<number, KpiReasonEntry[]> | undefined,
  day: number
): KpiReasonEntry[] {
  if (!reasons) return [];
  return reasons[day] || [];
}

export function clearOldReasons(
  reasons: Record<number, KpiReasonEntry[]>,
  keepDays: number = 3
): Record<number, KpiReasonEntry[]> {
  const days = Object.keys(reasons).map(Number).sort((a, b) => b - a);
  const keepDaysSet = new Set(days.slice(0, keepDays));

  const filtered: Record<number, KpiReasonEntry[]> = {};
  for (const day of keepDaysSet) {
    filtered[day] = reasons[day];
  }

  return filtered;
}

export function calculateKPIAverage(kpis: KPI[]): KPI {
  if (kpis.length === 0) {
    return {
      cashEUR: 0,
      profitLossEUR: 0,
      customerLoyalty: 0,
      bankTrust: 0,
      workforceEngagement: 0,
      publicPerception: 0
    };
  }

  const sum = kpis.reduce((acc, kpi) => ({
    cashEUR: acc.cashEUR + kpi.cashEUR,
    profitLossEUR: acc.profitLossEUR + kpi.profitLossEUR,
    customerLoyalty: acc.customerLoyalty + kpi.customerLoyalty,
    bankTrust: acc.bankTrust + kpi.bankTrust,
    workforceEngagement: acc.workforceEngagement + kpi.workforceEngagement,
    publicPerception: acc.publicPerception + kpi.publicPerception
  }), {
    cashEUR: 0,
    profitLossEUR: 0,
    customerLoyalty: 0,
    bankTrust: 0,
    workforceEngagement: 0,
    publicPerception: 0
  });

  return {
    cashEUR: Math.round(sum.cashEUR / kpis.length),
    profitLossEUR: Math.round(sum.profitLossEUR / kpis.length),
    customerLoyalty: Math.round(sum.customerLoyalty / kpis.length),
    bankTrust: Math.round(sum.bankTrust / kpis.length),
    workforceEngagement: Math.round(sum.workforceEngagement / kpis.length),
    publicPerception: Math.round(sum.publicPerception / kpis.length)
  };
}

export function roundKPI(kpi: KPI): KPI {
  return {
    cashEUR: Math.round(kpi.cashEUR),
    profitLossEUR: Math.round(kpi.profitLossEUR),
    customerLoyalty: Math.round(kpi.customerLoyalty),
    bankTrust: Math.round(kpi.bankTrust),
    workforceEngagement: Math.round(kpi.workforceEngagement),
    publicPerception: Math.round(kpi.publicPerception)
  };
}
