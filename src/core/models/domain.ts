// src/core/models/domain.ts

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type RoleId = 'CEO' | 'CFO' | 'OPS' | 'HRLEGAL' | 'TRAINER';

/**
 * Zentrale KPI-Struktur des Spiels.
 */
export interface KPI {
  cashEUR: number;             // Liquidität €
  profitLossEUR: number;       // Gewinn/Verlust €
  customerLoyalty: number;     // Punkte 0-100
  bankTrust: number;           // Punkte 0-100
  workforceEngagement: number; // Punkte 0-100
  publicPerception: number;    // Punkte 0-100
}

/**
 * Rollenbeschreibung für CEO, CFO, OPS, HR/Legal.
 */
export interface Role {
  id: RoleId;
  name: string;
  mandate: string;
  responsibilities: string[];
  redLines: string[];
  hiddenAgenda: string[];
}

/**
 * Einzelne Entscheidungsoption (A–D) innerhalb eines DecisionBlocks.
 */
export interface DecisionOption {
  id: 'a' | 'b' | 'c' | 'd';
  label: string;
  kpiDelta: Partial<KPI>;
  /** optionale erweiterte Engine-Felder */
  lagDays?: number;
  cooldownDays?: number;
  execLeakage?: number; // 0..1 realisierter Anteil
  wcImpact?: { dsoDelta?: number; dpoDelta?: number; dioDelta?: number };
  sideEffects?: Partial<KPI>;
  variance?: number;
  prerequisites?: string[];
  explanation?: string;
}

/**
 * Entscheidungsblock pro Rolle und Tag.
 */
export interface DecisionBlock {
  id: string;
  day: number;
  role: RoleId;
  title: string;
  context: string;
  dilemma: string;
  hiddenAgendaHint?: string;
  options: [DecisionOption, DecisionOption, DecisionOption, DecisionOption];
  attachments?: string[];
}

/**
 * Kontextobjekt für expandedText-Funktionen.
 */
export type ExpandedTextFnCtx = {
  day: number;
  kpi: KPI;
  meta?: any;
  log?: any;
  roles?: RoleId[];
};

/**
 * Signatur für News-Detailtexte als Funktion.
 */
export type ExpandedTextFn = (ctx: ExpandedTextFnCtx) => string;

/**
 * Tagesmeldung (Newsfeed).
 * expandedText kann string oder Funktion sein.
 */
export interface DayNewsItem {
  id: string;
  day: number;
  title: string;
  source: 'press' | 'customer' | 'supplier' | 'internal' | 'rumor' | 'bank' | 'authority';
  severity: Severity;
  content?: string;
  attachments?: string[];
  isImportant?: boolean;
  expandedText?: string | ExpandedTextFn;
  suppressHints?: boolean;
}

/**
 * Stammdaten des Unternehmens.
 */
export interface CompanyProfile {
  name: string;
  industry: string;
  employees: number;
  location: string;
  initialKPI: KPI;
  openingBalanceEUR: number;
  openingPLForecastEUR: number;
  shortStory: string;
}
