// src/types/admin.ts
/**
 * Type-Definitionen für Admin-Panels und Konfigurationen
 */

import type { KPI, RoleId } from '@/core/models/domain';
import type { ScoringWeights, InsolvencyRule, BankSettings, RoundTimeMatrix } from './global';

export type Difficulty = 'easy' | 'normal' | 'hard';
export type InsolvencyMode = 'hard' | 'soft' | 'off';

export interface InsolvencyRulesMap {
  cashEUR: InsolvencyRule;
  profitLossEUR: InsolvencyRule;
  customerLoyalty: InsolvencyRule;
  bankTrust: InsolvencyRule;
  workforceEngagement: InsolvencyRule;
  publicPerception: InsolvencyRule;
  debt: InsolvencyRule;
  receivables: InsolvencyRule;
  [key: string]: InsolvencyRule;
}

export interface InsolvencyConfig {
  rules: InsolvencyRulesMap;
}

export interface AdminFeatures {
  saveLoadMenu: boolean;
  autoSave: boolean;
  coach?: boolean;
  bankMechanics?: boolean;
  whatIfPreview?: boolean;
  eventIntensity?: boolean;
  roleBasedRandomNews?: boolean;
  trainerAccess?: boolean;
}

export interface AdminSettings {
  insolvencyMode: InsolvencyMode;
  difficulty: Difficulty;
  randomNews: boolean;
  adaptiveDifficultyLight?: boolean;
  scoringWeights: ScoringWeights;
  eventIntensityByDay?: number[];
  bank?: BankSettings;
  features: AdminFeatures;
  roundTimeMode?: 'off' | 'global' | 'matrix';
  roundTimeGlobalSec?: number;
  roundTimeGraceSec?: number;
  roundTimeMatrix?: RoundTimeMatrix;
  insolvencyConfig?: InsolvencyConfig;
}

export interface InvariantsLocal {
  ppPenaltyOnNegCash: boolean;
  loyaltyPenaltyOnNegCash: boolean;
  payrollDelay_weMinus10: boolean;
  loss5_bankTrustMinus8: boolean;
  loss5_publicPerceptionMinus5: boolean;
  loss5_customerLoyaltyMinus5: boolean;
  bankTrustLt10_workEngagementMinus10: boolean;
  bankTrustLt10_publicPerceptionMinus10: boolean;
  profit5_bankTrustPlus8: boolean;
  profit5_publicPerceptionPlus8: boolean;
  profit5_customerLoyaltyPlus8: boolean;
  bankTrustGt80_workEngagementPlus10: boolean;
  bankTrustGt80_publicPerceptionPlus80: boolean;
}

export interface PresetCredentials {
  CEO: { username: string; password: string };
  CFO: { username: string; password: string };
  OPS: { username: string; password: string };
  HRLEGAL: { username: string; password: string };
}

export interface LobbySettings {
  showTimer: boolean;
  backgroundTheme: 'corporate' | 'dynamic' | 'minimal';
  welcomeMessage?: string;
}

export interface GameSettings {
  backgroundTheme: 'corporate' | 'dynamic' | 'minimal';
  allowUserOverride: boolean;
}

export interface CreditSettings {
  enabled: boolean;
  creditLineEUR: number;
  interestRatePct: number;
}

export interface MultiplayerAdminSettings {
  authMode: 'email' | 'name-only' | 'preset-credentials';
  allowEarlyEntry: boolean;
  forceAllPlayersForAdvance: boolean;
  autoStartWhenReady: boolean;
  autoStartDelaySeconds: number;
  lobbyCountdownSeconds: number;
  presetCredentials: PresetCredentials;
  lobbySettings: LobbySettings;
  gameSettings: GameSettings;
  creditSettings: CreditSettings;
  roundTimeMode: 'off' | 'global' | 'matrix';
  roundTimeGlobalSec?: number;
  roundTimeGraceSec?: number;
  roundTimeMatrix?: RoundTimeMatrix;
  mpDifficulty: Difficulty;
  randomNews: boolean;
  adaptiveDifficultyLight: boolean;
  scoringWeights: ScoringWeights;
  eventIntensityByDay: number[];
  features: AdminFeatures;
  insolvencyMode: InsolvencyMode;
  insolvencyConfig?: {
    rules: InsolvencyRulesMap;
  };
}

export interface DecisionMetadata {
  role?: RoleId;
  type?: string;
  [key: string]: unknown;
}

export interface PlayerInfo {
  id: string;
  name: string;
  role: RoleId;
}

export interface GameKpiValues extends KPI {
  [key: string]: number;
}
