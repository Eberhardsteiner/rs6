// src/core/engine/reducers/advanceDayReducer.ts
import type { GameState } from '../gameEngine';
import { applyRandomEvents } from './randomEventsReducer';
import { applyScheduledDeltas } from './scenarioEventsReducer';
import { checkInsolvency, applyInsolvencyConsequences } from './insolvencyChecker';
import { applyBankingMechanics } from './bankingReducer';
import { clampKpi } from './kpiCalculations';
import { updateAdaptiveLight } from '../adaptiveLight';

export function advanceDay(state: GameState): GameState {
  let nextState = { ...state };

  nextState.kpiHistory = [...nextState.kpiHistory, { ...nextState.kpi }];

  nextState = applyPendingDeltas(nextState);

  nextState = applyScheduledDeltas(nextState);

  nextState = applyRandomEvents(nextState);

  nextState = applyBankingMechanics(nextState);

  nextState.kpi = clampKpi(nextState.kpi);

  const insolvencyResult = checkInsolvency(nextState);
  if (insolvencyResult.isInsolvent) {
    nextState = applyInsolvencyConsequences(nextState, insolvencyResult);
  }

  if (nextState.engineMeta) {
    nextState.engineMeta = updateAdaptiveLight(
      nextState.engineMeta,
      nextState.kpiHistory,
      { enabled: (globalThis as any).__adaptiveDifficultyLightEnabled === true }
    );
  }

  nextState.day += 1;

  return nextState;
}

function applyPendingDeltas(state: GameState): GameState {
  if (!state.pendingDeltas || state.pendingDeltas.length === 0) {
    return state;
  }

  let kpi = { ...state.kpi };

  for (const delta of state.pendingDeltas) {
    if (delta.cashEUR !== undefined) kpi.cashEUR += delta.cashEUR;
    if (delta.profitLossEUR !== undefined) kpi.profitLossEUR += delta.profitLossEUR;
    if (delta.customerLoyalty !== undefined) kpi.customerLoyalty += delta.customerLoyalty;
    if (delta.bankTrust !== undefined) kpi.bankTrust += delta.bankTrust;
    if (delta.workforceEngagement !== undefined) kpi.workforceEngagement += delta.workforceEngagement;
    if (delta.publicPerception !== undefined) kpi.publicPerception += delta.publicPerception;
  }

  return {
    ...state,
    kpi,
    pendingDeltas: []
  };
}

export function canAdvanceDay(state: GameState): boolean {
  if (state.isOver) return false;
  if (state.insolvency) return false;
  return true;
}

export function shouldEndGame(state: GameState, maxDays: number = 14): boolean {
  return state.day > maxDays;
}
