import type { RoleId, KPI } from '@/core/models/domain';
import type { InsolvencyRuleLite } from '@/admin/adminBridge';

type Difficulty = 'easy' | 'normal' | 'hard';
type InsolvencyMode = 'hard' | 'soft' | 'off';
type RoundTimeMode = 'off' | 'global' | 'matrix';
type NPCProfile = 'aggressive' | 'balanced' | 'conservative';

interface BankSettings {
  creditLineEUR?: number;
  interestRatePct?: number;
}

interface ScoringWeights {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
}

interface Invariants {
  optional: {
    pp_penalty_on_neg_cash: boolean;
    loyalty_penalty_on_neg_cash: boolean;
    payroll_delay_we_minus10: boolean;
    loss5_banktrust_minus8: boolean;
    loss5_publicperception_minus5: boolean;
    loss5_customerloyalty_minus5: boolean;
    banktrust_lt10_workengagement_minus10: boolean;
    banktrust_lt10_publicperception_minus10: boolean;
    profit5_banktrust_plus8: boolean;
    profit5_publicperception_plus8: boolean;
    profit5_customerloyalty_plus8: boolean;
    banktrust_gt80_workengagement_plus10: boolean;
    banktrust_gt80_publicperception_plus80: boolean;
  };
}

declare global {
  interface Window {
    __featureCoach?: boolean;
    __featureBankMechanics?: boolean;
    __featureSaveLoadMenu?: boolean;
    __featureAutoSave?: boolean;
    __featureWhatIfPreview?: boolean;
    __featureEventIntensity?: boolean;

    __insolvencyMode?: InsolvencyMode;
    __insolvencyRules?: Record<string, InsolvencyRuleLite>;

    __mpDifficulty?: Difficulty;
    __npcDifficulty?: Difficulty;
    __mode?: string;

    __randomNews?: boolean;
    __roleBasedRandomNews?: boolean;
    __difficultyAffectsRandoms?: boolean;
    __difficultyAffectsScoring?: boolean;

    __bankCreditLineEUR?: number;
    __bankInterestRatePct?: number;
    __bankSettings?: BankSettings;
    __usedCreditEUR?: number;
    __bankPendingDrawEUR?: number;

    __roundTimeMode?: RoundTimeMode;
    __roundTimeGlobalSec?: number;
    __roundTimeGraceSec?: number;
    __roundTimeMatrix?: Record<number, Partial<Record<RoleId, number>>>;

    __npcProfile?: NPCProfile;
    __leakageRole?: Record<string, number>;

    __eventIntensityByDay?: number[];

    __adaptiveDifficultyLightEnabled?: boolean;
    __scoringWeights?: ScoringWeights;

    __invariants?: Invariants;

    __rng?: () => number;

    __playerIdleToday?: boolean;
  }

  var __featureCoach: boolean | undefined;
  var __featureBankMechanics: boolean | undefined;
  var __featureSaveLoadMenu: boolean | undefined;
  var __featureAutoSave: boolean | undefined;
  var __featureWhatIfPreview: boolean | undefined;
  var __featureEventIntensity: boolean | undefined;

  var __insolvencyMode: InsolvencyMode | undefined;
  var __insolvencyRules: Record<string, InsolvencyRuleLite> | undefined;

  var __mpDifficulty: Difficulty | undefined;
  var __npcDifficulty: Difficulty | undefined;
  var __mode: string | undefined;

  var __randomNews: boolean | undefined;
  var __roleBasedRandomNews: boolean | undefined;
  var __difficultyAffectsRandoms: boolean | undefined;
  var __difficultyAffectsScoring: boolean | undefined;

  var __bankCreditLineEUR: number | undefined;
  var __bankInterestRatePct: number | undefined;
  var __bankSettings: BankSettings | undefined;
  var __usedCreditEUR: number | undefined;
  var __bankPendingDrawEUR: number | undefined;

  var __roundTimeMode: RoundTimeMode | undefined;
  var __roundTimeGlobalSec: number | undefined;
  var __roundTimeGraceSec: number | undefined;
  var __roundTimeMatrix: Record<number, Partial<Record<RoleId, number>>> | undefined;

  var __npcProfile: NPCProfile | undefined;
  var __leakageRole: Record<string, number> | undefined;

  var __eventIntensityByDay: number[] | undefined;

  var __adaptiveDifficultyLightEnabled: boolean | undefined;
  var __scoringWeights: ScoringWeights | undefined;

  var __invariants: Invariants | undefined;

  var __rng: (() => number) | undefined;

  var __playerIdleToday: boolean | undefined;
}

export interface AdminSettingsDetail {
  roundTimeMode?: RoundTimeMode;
  roundTimeGlobalSec?: number;
  roundTimeGraceSec?: number;
  roundTimeMatrix?: Record<number, Partial<Record<RoleId, number>>>;
  dayDurationSec?: number;
  gracePeriodSec?: number;
  difficulty?: Difficulty;
  randomNews?: boolean;
  seed?: number;
  npcProfile?: NPCProfile;
  leakage?: Record<string, number>;
  insolvencyMode?: InsolvencyMode;
  difficultyAffectsRandoms?: boolean;
  difficultyAffectsScoring?: boolean;
  features?: {
    coach?: boolean;
    bankMechanics?: boolean;
    saveLoadMenu?: boolean;
    autoSave?: boolean;
    whatIfPreview?: boolean;
    eventIntensity?: boolean;
  };
  eventIntensityByDay?: number[];
  bank?: BankSettings;
  scoringWeights?: Partial<ScoringWeights>;
  adaptiveDifficultyLight?: boolean;
  insolvencyConfig?: {
    rules?: Record<string, InsolvencyRuleLite>;
  };
}

export interface BankDrawEvent {
  amount: number;
}

export interface KPISetEvent {
  detail: Partial<KPI>;
}

export interface KPIAddEvent {
  detail: Partial<KPI>;
}

export interface ScenarioImportEvent {
  mode?: 'merge' | 'replace';
  scheduledDeltas?: Record<number, Array<Partial<KPI>>>;
  randomNews?: Record<number, unknown[]>;
  meta?: Record<string, unknown>;
}

declare global {
  interface WindowEventMap {
    'admin:settings': CustomEvent<AdminSettingsDetail>;
    'admin:kpi:set': CustomEvent<Partial<KPI>>;
    'admin:kpi:add': CustomEvent<Partial<KPI>>;
    'admin:reset': Event;
    'admin:set-day': CustomEvent<number>;
    'admin:advance-day': Event;
    'admin:scenario:import': CustomEvent<ScenarioImportEvent>;
    'admin:invariants': CustomEvent<Record<string, unknown>>;
    'admin:seed': CustomEvent<{ seed: number }>;
    'bank:draw-now': CustomEvent<BankDrawEvent>;
    'bank:pending-draw': CustomEvent<BankDrawEvent>;
    'ui:enter-game': Event;
  }
}

export {};
