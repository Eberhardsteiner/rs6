// src/core/engine/state/stateFactory.ts
import type { GameState, EngineMeta } from '../gameEngine';
import type { KPI, RoleId } from '@/core/models/domain';

export function emptyKpi(): KPI {
  return {
    cashEUR: 0,
    profitLossEUR: 0,
    customerLoyalty: 0,
    bankTrust: 0,
    workforceEngagement: 0,
    publicPerception: 0
  };
}

export function defaultIntensityByDay(): number[] {
  return Array.from({ length: 14 }, () => 1);
}

export function createInitialState(overrides: Partial<GameState> = {}): GameState {
  const base: GameState = {
    day: 1,
    kpi: emptyKpi(),
    kpiHistory: [],
    pendingDeltas: [],
    log: [],

    playerName: '',
    playerRole: 'CEO' as RoleId,
    playerRoles: ['CEO' as RoleId],

    burnPerDayEUR: -411,
    isOver: false,
    insolvency: false,

    engineMeta: {
      difficultyFactor: 1.0,
      intensityByDay: defaultIntensityByDay()
    }
  };

  const merged: GameState = {
    ...base,
    ...overrides,
    kpi: { ...base.kpi, ...(overrides.kpi || {}) },
    kpiHistory: overrides.kpiHistory ?? base.kpiHistory,
    pendingDeltas: overrides.pendingDeltas ?? base.pendingDeltas,
    log: overrides.log ?? base.log,
    engineMeta: { ...(base.engineMeta || {}), ...(overrides.engineMeta || {}) }
  };

  return merged;
}

export function addPendingDelta(s: GameState, delta: Partial<KPI>): GameState {
  return { ...s, pendingDeltas: [...(s.pendingDeltas || []), delta] };
}

export function scheduleDelta(
  meta: EngineMeta | undefined,
  day: number,
  delta: Partial<KPI>
): EngineMeta {
  const m: EngineMeta = { ...(meta || {}) };
  const sched = (m.scheduledDeltas = m.scheduledDeltas || {});
  (sched[day] = sched[day] || []).push(delta);
  return m;
}
