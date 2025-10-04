// src/types/global.d.ts
/**
 * Globale Type-Definitionen für Runtime-Globals und externe Libraries
 */

import type { KPI, RoleId } from '@/core/models/domain';

// pdfMake Types
declare module 'pdfmake/build/pdfmake.js' {
  const pdfMake: {
    vfs?: Record<string, string>;
    createPdf: (documentDefinition: unknown) => {
      download: (fileName?: string) => void;
      open: () => void;
      print: () => void;
    };
  };
  export default pdfMake;
}

declare module 'pdfmake/build/vfs_fonts.js' {
  export const pdfMake: {
    vfs: Record<string, string>;
  };
  export default {
    pdfMake: {
      vfs: Record<string, string>;
    };
  };
}

// Erweiterte Window/GlobalThis-Typen für Runtime-Konfiguration
export interface AdminInvariants {
  optional: {
    pp_penalty_on_neg_cash?: boolean;
    loyalty_penalty_on_neg_cash?: boolean;
    payroll_delay_we_minus10?: boolean;
    loss5_banktrust_minus8?: boolean;
    loss5_publicperception_minus5?: boolean;
    loss5_customerloyalty_minus5?: boolean;
    banktrust_lt10_workengagement_minus10?: boolean;
    banktrust_lt10_publicperception_minus10?: boolean;
    profit5_banktrust_plus8?: boolean;
    profit5_publicperception_plus8?: boolean;
    profit5_customerloyalty_plus8?: boolean;
    banktrust_gt80_workengagement_plus10?: boolean;
    banktrust_gt80_publicperception_plus80?: boolean;
  };
}

export interface InsolvencyRule {
  key: string;
  enabled: boolean;
  threshold: number;
}

export interface BankSettings {
  creditLineEUR: number;
  interestRatePct: number;
}

export interface ScoringWeights {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
}

export interface RoundTimeMatrix {
  [day: number]: {
    CEO: number;
    CFO: number;
    OPS: number;
    HRLEGAL: number;
  };
}

export interface MultiplayerSettings {
  authMode?: 'email' | 'name-only' | 'preset-credentials';
  allowEarlyEntry?: boolean;
  forceAllPlayersForAdvance?: boolean;
  autoStartWhenReady?: boolean;
  autoStartDelaySeconds?: number;
  lobbyCountdownSeconds?: number;
  dayDurationMin?: number;
  roundMinutes?: number;
  gameSettings?: {
    backgroundTheme?: 'dynamic' | 'minimal' | 'corporate';
    allowUserOverride?: boolean;
  };
  creditSettings?: {
    enabled: boolean;
    creditLineEUR: number;
    interestRatePct: number;
  };
  [key: string]: unknown;
}

export interface ScenarioOverrides {
  blocks?: Record<number, unknown[]>;
  news?: Record<number, unknown[]>;
  attachments?: Record<number, unknown[]>;
}

// Erweiterte GlobalThis-Typen
declare global {
  interface Window {
    __admin?: {
      setKpi?: (k: KPI) => void;
      addDelta?: (d: Partial<KPI>) => void;
      setDay?: (n: number) => void;
      advanceDay?: () => void;
      message?: (s: string) => void;
    };
  }

  // eslint-disable-next-line no-var
  var __insolvencyMode: 'hard' | 'soft' | 'off';
  // eslint-disable-next-line no-var
  var __mode: 'easy' | 'normal' | 'hard';
  // eslint-disable-next-line no-var
  var __npcDifficulty: 'easy' | 'normal' | 'hard';
  // eslint-disable-next-line no-var
  var __mpDifficulty: 'easy' | 'normal' | 'hard';
  // eslint-disable-next-line no-var
  var __randomNews: boolean;
  // eslint-disable-next-line no-var
  var __adaptiveDifficultyLightEnabled: boolean;
  // eslint-disable-next-line no-var
  var __roleBasedRandomNews: boolean;
  // eslint-disable-next-line no-var
  var __insolvencyRules: Record<string, InsolvencyRule>;
  // eslint-disable-next-line no-var
  var __scoringWeights: ScoringWeights;
  // eslint-disable-next-line no-var
  var __roundTimeMode: 'off' | 'global' | 'matrix';
  // eslint-disable-next-line no-var
  var __roundTimeGlobalSec: number | undefined;
  // eslint-disable-next-line no-var
  var __roundTimeGraceSec: number | undefined;
  // eslint-disable-next-line no-var
  var __roundTimeMatrix: RoundTimeMatrix | undefined;
  // eslint-disable-next-line no-var
  var __featureSaveLoadMenu: boolean;
  // eslint-disable-next-line no-var
  var __featureAutoSave: boolean;
  // eslint-disable-next-line no-var
  var __featureCoach: boolean;
  // eslint-disable-next-line no-var
  var __featureBankMechanics: boolean;
  // eslint-disable-next-line no-var
  var __featureWhatIfPreview: boolean;
  // eslint-disable-next-line no-var
  var __featureEventIntensity: boolean;
  // eslint-disable-next-line no-var
  var __trainerAccessEnabled: boolean;
  // eslint-disable-next-line no-var
  var __eventIntensityByDay: number[];
  // eslint-disable-next-line no-var
  var __bankSettings: BankSettings;
  // eslint-disable-next-line no-var
  var __bankCreditLineEUR: number;
  // eslint-disable-next-line no-var
  var __bankInterestRatePct: number;
  // eslint-disable-next-line no-var
  var __bankPendingDrawEUR: number;
  // eslint-disable-next-line no-var
  var __usedCreditEUR: number;
  // eslint-disable-next-line no-var
  var __mpAllowCredit: boolean;
  // eslint-disable-next-line no-var
  var __invariants: AdminInvariants;
  // eslint-disable-next-line no-var
  var __rng: () => number;
  // eslint-disable-next-line no-var
  var __gameSeed: number;
  // eslint-disable-next-line no-var
  var __difficultyFactor: number;
  // eslint-disable-next-line no-var
  var __multiplayerSettings: MultiplayerSettings;
  // eslint-disable-next-line no-var
  var __scenarioOverrides: ScenarioOverrides;
  // eslint-disable-next-line no-var
  var __playedNewsTitles: string[];
  // eslint-disable-next-line no-var
  var __dayStart: string;
  // eslint-disable-next-line no-var
  var __currentDayStart: string;
  // eslint-disable-next-line no-var
  var __mpDayStart: string;
  // eslint-disable-next-line no-var
  var __gameDayStart: string;
  // eslint-disable-next-line no-var
  var __roundStartIso: string;
  // eslint-disable-next-line no-var
  var __dayStartTs: number;
  // eslint-disable-next-line no-var
  var __startTs: number;
  // eslint-disable-next-line no-var
  var __dayDeadline: string;
  // eslint-disable-next-line no-var
  var __currentDayDeadline: string;
  // eslint-disable-next-line no-var
  var __mpDayEndsAt: string;
  // eslint-disable-next-line no-var
  var __dayEndsAt: string;
  // eslint-disable-next-line no-var
  var __roundDeadlineIso: string;
  // eslint-disable-next-line no-var
  var __deadlineTs: number;
  // eslint-disable-next-line no-var
  var __dayDeadlineTs: number;
  // eslint-disable-next-line no-var
  var __roundDeadlineTs: number;
}

export {};
