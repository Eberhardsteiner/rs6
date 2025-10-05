// src/types/core.ts
// Zentrale Type-Definitionen für die gesamte Anwendung

import type { KPI, RoleId, DecisionBlock, DayNewsItem } from '@/core/models/domain';

// =============================================================================
// Game State Types
// =============================================================================

export interface GameState {
  day: number;
  kpi: KPI;
  userNotes?: string;
  isGameOver?: boolean;
  gameOverCause?: string;
  decisions: Record<string, DecisionRecord>;
  engineMeta?: EngineMeta;
  creditLineEUR?: number;
  interestRatePct?: number;
  usedCreditEUR?: number;
}

export interface DecisionRecord {
  blockId: string;
  day: number;
  role: RoleId;
  optionId?: 'a' | 'b' | 'c' | 'd';
  optionLabel?: string;
  customText?: string;
  kpiDelta?: Partial<KPI>;
  timestamp?: number;
}

// =============================================================================
// Engine Meta Types
// =============================================================================

export interface EngineMeta {
  scheduledDeltas?: Record<number, Array<Partial<KPI> | { impact: Partial<KPI>; conditions?: unknown }>>;
  randomNews?: Record<number, Array<RandomNewsItem & { conditions?: unknown }>>;
  negCashStreak?: number;
  kpiReasons?: Record<number, KpiReasonEntry[]>;
  scoringWeights?: ScoringWeights;
  difficultyFactor?: number;
  dailyRandomValues?: Record<number, DailyRandomValues>;
  currentDayRandoms?: CurrentDayRandoms;
  bank?: BankState;
  playedNewsIds?: string[];
  insolvencyTriggeredByRules?: string[];
  intensityByDay?: number[];
  seed?: number;
  userDeclaredInsolvency?: boolean;
  userDeclaredCause?: string;
  [key: string]: unknown;
}

export interface DailyRandomValues {
  cashInflow: number;
  cashOutflow: number;
  plInflow: number;
  plOutflow: number;
  cashNet: number;
  plNet: number;
}

export interface CurrentDayRandoms {
  cashNet: number;
  plNet: number;
}

export interface BankState {
  pendingDrawEUR?: number;
  effectiveCashForInsolv?: number;
  usedCreditEUR?: number;
  creditLineEUR?: number;
  interestRatePct?: number;
  availableCredit?: number;
  lastDrawNow?: number;
}

export interface KpiReasonEntry {
  source: string;
  delta: Partial<KPI>;
  label?: string;
}

export interface RandomNewsItem {
  id: string;
  text: string;
  intensity?: 'low' | 'medium' | 'high';
  impact?: Partial<KPI>;
}

// =============================================================================
// Scoring Types
// =============================================================================

export interface ScoringWeights {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
}

// =============================================================================
// Configuration Types
// =============================================================================

export interface GameConfiguration {
  difficulty?: 'easy' | 'medium' | 'hard';
  insolvencyMode?: 'off' | 'rules' | 'cash' | 'both';
  creditSettings?: CreditSettings;
  roundTimeMode?: 'off' | 'fixed' | 'matrix';
  scoringWeights?: ScoringWeights;
  scenarioOverrides?: ScenarioOverrides;
}

export interface CreditSettings {
  enabled: boolean;
  creditLineEUR: number;
  interestRatePct: number;
}

export interface ScenarioOverrides {
  scheduledDeltas?: Record<number, Array<Partial<KPI>>>;
  randomNews?: Record<number, unknown[]>;
  meta?: Record<string, unknown>;
}

// =============================================================================
// Multiplayer Types
// =============================================================================

export interface MultiplayerGame {
  id: string;
  gameId: string;
  status: 'waiting' | 'ready' | 'playing' | 'finished';
  currentDay: number;
  createdAt?: string;
  updatedAt?: string;
  settings?: GameConfiguration;
}

export interface MultiplayerPlayer {
  id: string;
  gameId: string;
  userId?: string;
  displayName: string;
  role: RoleId;
  isReady: boolean;
  isOnline: boolean;
  lastSeen?: string;
}

export interface MultiplayerDecision {
  id: string;
  gameId: string;
  playerId: string;
  day: number;
  blockId: string;
  optionId?: 'a' | 'b' | 'c' | 'd';
  customText?: string;
  kpiDelta?: Partial<KPI>;
  createdAt?: string;
}

// =============================================================================
// Type Guards
// =============================================================================

export function isValidKPI(value: unknown): value is KPI {
  if (!value || typeof value !== 'object') return false;
  const kpi = value as Partial<KPI>;
  return (
    typeof kpi.cashEUR === 'number' &&
    typeof kpi.profitLossEUR === 'number' &&
    typeof kpi.customerLoyalty === 'number' &&
    typeof kpi.bankTrust === 'number' &&
    typeof kpi.workforceEngagement === 'number' &&
    typeof kpi.publicPerception === 'number'
  );
}

export function isValidPartialKPI(value: unknown): value is Partial<KPI> {
  if (!value || typeof value !== 'object') return false;
  const kpi = value as Partial<KPI>;
  const validKeys = ['cashEUR', 'profitLossEUR', 'customerLoyalty', 'bankTrust', 'workforceEngagement', 'publicPerception'];

  for (const key of Object.keys(kpi)) {
    if (!validKeys.includes(key)) return false;
    const val = kpi[key as keyof KPI];
    if (val !== undefined && typeof val !== 'number') return false;
  }

  return true;
}

export function isValidRoleId(value: unknown): value is RoleId {
  if (typeof value !== 'string') return false;
  return ['CEO', 'CFO', 'OPS', 'HRLEGAL'].includes(value);
}

export function isValidGameState(value: unknown): value is GameState {
  if (!value || typeof value !== 'object') return false;
  const state = value as Partial<GameState>;

  return (
    typeof state.day === 'number' &&
    state.day >= 1 &&
    state.day <= 14 &&
    isValidKPI(state.kpi) &&
    typeof state.decisions === 'object'
  );
}

export function isValidScoringWeights(value: unknown): value is ScoringWeights {
  if (!value || typeof value !== 'object') return false;
  const weights = value as Partial<ScoringWeights>;

  return (
    typeof weights.bankTrust === 'number' &&
    typeof weights.publicPerception === 'number' &&
    typeof weights.customerLoyalty === 'number' &&
    typeof weights.workforceEngagement === 'number' &&
    weights.bankTrust >= 0 &&
    weights.publicPerception >= 0 &&
    weights.customerLoyalty >= 0 &&
    weights.workforceEngagement >= 0
  );
}

export function isValidCreditSettings(value: unknown): value is CreditSettings {
  if (!value || typeof value !== 'object') return false;
  const settings = value as Partial<CreditSettings>;

  return (
    typeof settings.enabled === 'boolean' &&
    typeof settings.creditLineEUR === 'number' &&
    typeof settings.interestRatePct === 'number' &&
    settings.creditLineEUR >= 0 &&
    settings.interestRatePct >= 0
  );
}

export function isValidMultiplayerGame(value: unknown): value is MultiplayerGame {
  if (!value || typeof value !== 'object') return false;
  const game = value as Partial<MultiplayerGame>;

  return (
    typeof game.id === 'string' &&
    typeof game.gameId === 'string' &&
    typeof game.status === 'string' &&
    ['waiting', 'ready', 'playing', 'finished'].includes(game.status) &&
    typeof game.currentDay === 'number' &&
    game.currentDay >= 1 &&
    game.currentDay <= 14
  );
}

export function isValidMultiplayerPlayer(value: unknown): value is MultiplayerPlayer {
  if (!value || typeof value !== 'object') return false;
  const player = value as Partial<MultiplayerPlayer>;

  return (
    typeof player.id === 'string' &&
    typeof player.gameId === 'string' &&
    typeof player.displayName === 'string' &&
    isValidRoleId(player.role) &&
    typeof player.isReady === 'boolean' &&
    typeof player.isOnline === 'boolean'
  );
}

// =============================================================================
// Helper Functions
// =============================================================================

export function createEmptyKPI(): KPI {
  return {
    cashEUR: 0,
    profitLossEUR: 0,
    customerLoyalty: 0,
    bankTrust: 0,
    workforceEngagement: 0,
    publicPerception: 0
  };
}

export function createDefaultScoringWeights(): ScoringWeights {
  return {
    bankTrust: 25,
    publicPerception: 25,
    customerLoyalty: 25,
    workforceEngagement: 25
  };
}

export function createDefaultCreditSettings(): CreditSettings {
  return {
    enabled: false,
    creditLineEUR: 500000,
    interestRatePct: 8.5
  };
}

export function clampKPI(kpi: KPI): KPI {
  return {
    cashEUR: kpi.cashEUR,
    profitLossEUR: kpi.profitLossEUR,
    customerLoyalty: Math.max(0, Math.min(100, kpi.customerLoyalty)),
    bankTrust: Math.max(0, Math.min(100, kpi.bankTrust)),
    workforceEngagement: Math.max(0, Math.min(100, kpi.workforceEngagement)),
    publicPerception: Math.max(0, Math.min(100, kpi.publicPerception))
  };
}

export function normalizeWeights(weights: Partial<ScoringWeights>): ScoringWeights {
  const toNum = (n: unknown, fallback: number): number => {
    const x = Number(n);
    return isFinite(x) && x >= 0 ? x : fallback;
  };

  const base = {
    bankTrust: toNum(weights.bankTrust, 25),
    publicPerception: toNum(weights.publicPerception, 25),
    customerLoyalty: toNum(weights.customerLoyalty, 25),
    workforceEngagement: toNum(weights.workforceEngagement, 25)
  };

  let sum = base.bankTrust + base.publicPerception + base.customerLoyalty + base.workforceEngagement;

  if (!isFinite(sum) || sum <= 0) {
    return createDefaultScoringWeights();
  }

  const factor = 100 / sum;
  const normalized = {
    bankTrust: Math.round(base.bankTrust * factor),
    publicPerception: Math.round(base.publicPerception * factor),
    customerLoyalty: Math.round(base.customerLoyalty * factor),
    workforceEngagement: Math.round(base.workforceEngagement * factor)
  };

  // Korrigiere Rundungsfehler
  const drift = 100 - (normalized.bankTrust + normalized.publicPerception + normalized.customerLoyalty + normalized.workforceEngagement);
  if (drift !== 0) {
    const keys = ['bankTrust', 'publicPerception', 'customerLoyalty', 'workforceEngagement'] as const;
    let maxKey = keys[0];
    let maxVal = normalized[maxKey];
    for (const k of keys) {
      if (normalized[k] > maxVal) {
        maxVal = normalized[k];
        maxKey = k;
      }
    }
    normalized[maxKey] = normalized[maxKey] + drift;
  }

  return normalized;
}
