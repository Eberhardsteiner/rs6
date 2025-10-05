// src/core/engine/ending/endingTypes.ts

export type EndingId = 'INSOLVENCY' | 'PROTECTIVE_SHIELD' | 'SATISFACTORY' | 'FRAGILE_CONTINUATION' | 'TURNAROUND';

export interface EndingResult {
  id: EndingId;
  title: string;
  summary: string;
  score: number;
  breakdown: {
    cash: number;
    pl: number;
    customers: number;
    bank: number;
    workforce: number;
    publicPerception: number;
  };
  bonus: number;
  malus: number;
  suppressedInsolvencyCount?: number;
}

export const ENDING_TITLES: Record<EndingId, string> = {
  TURNAROUND: 'Turnaround',
  INSOLVENCY: 'Insolvenz',
  SATISFACTORY: 'Befriedigend',
  PROTECTIVE_SHIELD: 'Schutzschirm',
  FRAGILE_CONTINUATION: 'Fragile Fortführung'
};

export const ENDING_DESCRIPTIONS: Record<EndingId, string> = {
  TURNAROUND: 'Erfolgreiches Krisenmanagement mit nachhaltigem Turnaround',
  INSOLVENCY: 'Kritische finanzielle Lage führt zur Insolvenz',
  SATISFACTORY: 'Stabile Situation mit Verbesserungspotenzial',
  PROTECTIVE_SHIELD: 'Sanierung unter Schutzschirm erforderlich',
  FRAGILE_CONTINUATION: 'Fortsetzung unter unsicheren Bedingungen'
};
