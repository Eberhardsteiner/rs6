// src/core/engine/reducers/randomEventsReducer.ts
import type { GameState, DailyRandomValues } from '../gameEngine';
import { generateDailyRandomValues } from '../random/randomValues';
import { generateRandomNewsForDay } from '../randomNews';

export function applyRandomEvents(state: GameState): GameState {
  const randoms = generateRandomValues(state);
  const randomNews = generateRandomNews(state);

  const newKpi = {
    ...state.kpi,
    cashEUR: state.kpi.cashEUR + randoms.cashNet,
    profitLossEUR: state.kpi.profitLossEUR + randoms.plNet
  };

  const engineMeta = {
    ...state.engineMeta,
    dailyRandomValues: {
      ...state.engineMeta?.dailyRandomValues,
      [state.day]: randoms
    },
    currentDayRandoms: randoms,
    randomNews: {
      ...state.engineMeta?.randomNews,
      [state.day]: randomNews
    }
  };

  return {
    ...state,
    kpi: newKpi,
    engineMeta
  };
}

function generateRandomValues(state: GameState): DailyRandomValues {
  return generateDailyRandomValues(state.kpi.cashEUR);
}

function generateRandomNews(state: GameState) {
  try {
    return generateRandomNewsForDay(state);
  } catch (error) {
    console.error('Failed to generate random news:', error);
    return [];
  }
}

export function getRandomValuesForDay(state: GameState, day: number): DailyRandomValues | null {
  return state.engineMeta?.dailyRandomValues?.[day] || null;
}

export function getRandomNewsForDay(state: GameState, day: number) {
  return state.engineMeta?.randomNews?.[day] || [];
}

export function getCurrentDayRandoms(state: GameState): DailyRandomValues | null {
  return state.engineMeta?.currentDayRandoms || null;
}
