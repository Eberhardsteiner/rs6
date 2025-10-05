// src/core/engine/reducers/scenarioEventsReducer.ts
import type { GameState, EngineMeta } from '../gameEngine';
import type { KPI } from '@/core/models/domain';

export function applyScheduledDeltas(state: GameState): GameState {
  const scheduled = state.engineMeta?.scheduledDeltas?.[state.day];

  if (!scheduled || scheduled.length === 0) {
    return state;
  }

  let kpi = { ...state.kpi };

  for (const delta of scheduled) {
    kpi = applyKpiDelta(kpi, delta);
  }

  return {
    ...state,
    kpi
  };
}

function applyKpiDelta(kpi: KPI, delta: Partial<KPI>): KPI {
  const result = { ...kpi };

  if (delta.cashEUR !== undefined) {
    result.cashEUR += delta.cashEUR;
  }
  if (delta.profitLossEUR !== undefined) {
    result.profitLossEUR += delta.profitLossEUR;
  }
  if (delta.customerLoyalty !== undefined) {
    result.customerLoyalty += delta.customerLoyalty;
  }
  if (delta.bankTrust !== undefined) {
    result.bankTrust += delta.bankTrust;
  }
  if (delta.workforceEngagement !== undefined) {
    result.workforceEngagement += delta.workforceEngagement;
  }
  if (delta.publicPerception !== undefined) {
    result.publicPerception += delta.publicPerception;
  }

  return result;
}

export function scheduleDeltas(
  meta: EngineMeta | undefined,
  day: number,
  deltas: Array<Partial<KPI>>
): EngineMeta {
  const m: EngineMeta = { ...(meta || {}) };
  const sched = (m.scheduledDeltas = m.scheduledDeltas || {});

  if (!sched[day]) {
    sched[day] = [];
  }

  sched[day].push(...deltas);
  return m;
}

export function getScheduledDeltasForDay(
  state: GameState,
  day: number
): Array<Partial<KPI>> {
  return state.engineMeta?.scheduledDeltas?.[day] || [];
}

export function hasScheduledDeltas(state: GameState, day: number): boolean {
  const deltas = getScheduledDeltasForDay(state, day);
  return deltas.length > 0;
}

export function clearScheduledDeltas(state: GameState, day: number): GameState {
  if (!state.engineMeta?.scheduledDeltas) {
    return state;
  }

  const scheduledDeltas = { ...state.engineMeta.scheduledDeltas };
  delete scheduledDeltas[day];

  return {
    ...state,
    engineMeta: {
      ...state.engineMeta,
      scheduledDeltas
    }
  };
}
