// src/reporting/reportTypes.ts

export type KPI = {
  cashEUR: number;
  profitLossEUR: number;
  [key: string]: any; // weitere KPI (Mitarbeiter, Marke, etc.)
};

export type DecisionDelta = {
  id: string;
  title?: string;
  role?: string;
  kpiDelta: Partial<KPI> & {
    cashEURInflow?: number;
    cashEUROutflow?: number;
    profitEUR?: number;
    lossEUR?: number;
  };
  npv?: number; // wird getrennt berechnet
};

export type DaySnapshot = {
  day: number;
  beforeKPI: KPI;
  afterKPI: KPI;
  randomCash?: number | null; // ΔCash aus Zufall (falls verfügbar)
  randomPL?: number | null;   // ΔP&L aus Zufall (falls verfügbar)
  decisions: DecisionDelta[];
  decisionsNPVTotal?: number;
  insolvency?: boolean;
};

export type WhatIfNote = {
  day: number;
  blockId?: string;
  chosenOptionId?: string;
  bestAlternativeOptionId?: string;
  kpiDeltaChosen?: Partial<KPI>;
  kpiDeltaBestAlt?: Partial<KPI>;
  kpiDeltaDiff?: Partial<KPI>; // was wäre gewesen, wenn (best alternative - chosen)
};

export type ReportRun = {
  meta: {
    startedAt: string;
    playerName?: string;
    roles: string[];
    discountRatePA?: number;   // Diskontierungszins p.a. (z.B. 0.08 = 8%)
    dayLengthInDays?: number;  // Sim-Tag als reale Tage (für Tageszins)
    scoringWeights?: Record<string, number>;
  };
  kpiStart: KPI;
  days: DaySnapshot[];
  whatIf: WhatIfNote[];
  finalScore?: number;
  finalNote?: string;
  insolventAtDay?: number | null;
};
