// src/core/engine/gameEngine.ts
import type { KPI, DayNewsItem, RoleId } from '@/core/models/domain';
import type { DecisionLogEntry } from '@/core/models/decisionLog';
import { currentRng, rngId } from '@/core/utils/prng';

export interface EngineMeta {
  difficultyFactor?: number;
  scheduledDeltas?: Record<number, Array<Partial<KPI>>>;
  randomNews?: Record<number, DayNewsItem[]>;
  suppressedInsolvencyCount?: number;
  intensityByDay?: number[];
  dailyRandomValues?: Record<number, DailyRandomValues>;
  currentDayRandoms?: DailyRandomValues;
  scoringWeights?: Record<string, number>;
  startedAt?: string;
  roles?: RoleId[];
  discountRatePA?: number;
  dayLengthInDays?: number;
  scenarioMeta?: Record<string, unknown>;
  commsAll?: Array<{ role: RoleId; day: number; text: string }>;
  commsSelf?: { role: RoleId; day: number; text: string };
  multiplayerRole?: RoleId;
  exportNote?: string;
  ts?: number;
}

export interface DailyRandomValues {
  cashInflow: number;
  cashOutflow: number;
  cashNet: number;
  plInflow: number;
  plOutflow: number;
  plNet: number;
}

export interface GameState {
  day: number;
  kpi: KPI;
  kpiHistory: KPI[];
  pendingDeltas: Array<Partial<KPI>>;
  log: DecisionLogEntry[];
  playerName: string;
  playerRole: RoleId;
  playerRoles: RoleId[];
  userNotes?: string;
  burnPerDayEUR: number;
  isOver: boolean;
  insolvency: boolean;
  engineMeta?: EngineMeta;
  creditLineEUR?: number;
  usedCreditEUR?: number;
  interestRatePct?: number;
}

export { emptyKpi, createInitialState, addPendingDelta, scheduleDelta, defaultIntensityByDay } from './state/stateFactory';
export { generateDailyRandomValues, generateSafeDailyRandomValues, applyRandomValuesToKpi } from './random/randomValues';

export function generateRandomNewsForDay(state: GameState): DayNewsItem[] {
  const rng = currentRng();
  const chance = rng();
  const items: DayNewsItem[] = [] as DayNewsItem[];

  if (chance < 0.4) {
    const sev = rng() < 0.5 ? 'info' : (rng() < 0.75 ? 'warn' : 'crit');
    const id = `rnd-${state.day}-${Math.floor(rng() * 1e6)}`;
    const deltaHint = rng() < 0.5 ? 'Kundentreue' : (rng() < 0.5 ? 'Bankvertrauen' : 'Öffentliche Wahrnehmung');
    const text = `Marktgerücht (${deltaHint}): Interne Quellen berichten von Bewegung – mögliche Auswirkungen auf die Stakeholder-Stimmung.`;
    items.push({
      id,
      day: state.day,
      title: 'Gerüchte im Markt',
      body: text,
      severity: sev as any
    } as DayNewsItem);
  }
  return items;
}
