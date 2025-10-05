// src/core/engine/scoring.ts
import type { GameState } from '@/core/engine/gameEngine';
import type { KPI } from '@/core/models/domain';
import { isPerceivedInsolvent } from './ending_extras';

export type ScoreVerdict = 'Exzellent' | 'Gut' | 'Stabil' | 'Fragil' | 'Kritisch';

export interface ScoreWeights {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
}

export interface ScoreContribution {
  kpi: keyof ScoreWeights;
  weight: number;   // in %
  value: number;    // 0..100 (aktueller KPI-Wert)
  points: number;   // Beitrag in Punkten (0..weight)
}

export interface ScoreResult {
  base: number;             // 0..100 (Basiswert, ohne Bonus/Malus)
  score: number;            // 0..100 (Finalwert inkl. Bonus/Malus)
  verdict: ScoreVerdict;
  contributions: ScoreContribution[];
  weights: ScoreWeights;
  bonus: number;
  malus: number;
  achievements: string[];
  penalties: string[];
}

/* -----------------------------------------------------------
   1) Hilfsfunktionen
----------------------------------------------------------- */
function clamp0to100(x: number): number {
  return Math.max(0, Math.min(100, Math.round(x)));
}
function num(x: any, d = 0): number {
  const v = Number(x);
  return Number.isFinite(v) ? v : d;
}
function nz01(x: any): number {
  const v = num(x, 0);
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

export const DEFAULT_WEIGHTS: ScoreWeights = {
  bankTrust: 25,
  publicPerception: 25,
  customerLoyalty: 25,
  workforceEngagement: 25
};

/** Normalisiert Gewichte auf Summe 100. */
export function normalizeWeights(w: Partial<ScoreWeights> | undefined): ScoreWeights {
  const src: ScoreWeights = {
    bankTrust:  num(w?.bankTrust, DEFAULT_WEIGHTS.bankTrust),
    publicPerception: num(w?.publicPerception, DEFAULT_WEIGHTS.publicPerception),
    customerLoyalty:  num(w?.customerLoyalty, DEFAULT_WEIGHTS.customerLoyalty),
    workforceEngagement: num(w?.workforceEngagement, DEFAULT_WEIGHTS.workforceEngagement)
  };
  const sum = src.bankTrust + src.publicPerception + src.customerLoyalty + src.workforceEngagement;
  if (sum <= 0) return { ...DEFAULT_WEIGHTS };
  const f = 100 / sum;
  return {
    bankTrust:  Math.round(src.bankTrust * f),
    publicPerception: Math.round(src.publicPerception * f),
    customerLoyalty:  Math.round(src.customerLoyalty * f),
    workforceEngagement: Math.round(src.workforceEngagement * f),
  };
}

function verdictFor(score: number): ScoreVerdict {
  if (score >= 85) return 'Exzellent';
  if (score >= 70) return 'Gut';
  if (score >= 55) return 'Stabil';
  if (score >= 40) return 'Fragil';
  return 'Kritisch';
}

/* -----------------------------------------------------------
   2) Gewichte aus State lesen
----------------------------------------------------------- */
function readWeights(state: GameState): ScoreWeights {
  const fromMeta = (state.engineMeta as any)?.scoringWeights as Partial<ScoreWeights> | undefined;
  const fromGlobal = (globalThis as any).__scoringWeights as Partial<ScoreWeights> | undefined;
  return normalizeWeights(fromMeta ?? fromGlobal ?? DEFAULT_WEIGHTS);
}

/* -----------------------------------------------------------
   3) Basis-Score berechnen
----------------------------------------------------------- */
function computeBase(state: GameState, weights: ScoreWeights) {
  const kpi: KPI = state.kpi as any;
  const vals = {
    bankTrust:           clamp0to100(num((kpi as any).bankTrust, 0)),
    publicPerception:    clamp0to100(num((kpi as any).publicPerception, 0)),
    customerLoyalty:     clamp0to100(num((kpi as any).customerLoyalty, 0)),
    workforceEngagement: clamp0to100(num((kpi as any).workforceEngagement, 0)),
  };

  const contributions: ScoreContribution[] = [
    { kpi: 'bankTrust',           weight: weights.bankTrust,           value: vals.bankTrust,           points: Math.round(vals.bankTrust * weights.bankTrust / 100) },
    { kpi: 'publicPerception',    weight: weights.publicPerception,    value: vals.publicPerception,    points: Math.round(vals.publicPerception * weights.publicPerception / 100) },
    { kpi: 'customerLoyalty',     weight: weights.customerLoyalty,     value: vals.customerLoyalty,     points: Math.round(vals.customerLoyalty * weights.customerLoyalty / 100) },
    { kpi: 'workforceEngagement', weight: weights.workforceEngagement, value: vals.workforceEngagement, points: Math.round(vals.workforceEngagement * weights.workforceEngagement / 100) },
  ];

  const base = clamp0to100(contributions.reduce((a, c) => a + c.points, 0));
  return { base, contributions, vals };
}

/* -----------------------------------------------------------
   4) Bonus/Malus berechnen (bestehende Logik)
----------------------------------------------------------- */
function computeAdjustments(state: GameState) {
  const k = state.kpi as any as KPI;
  const meta: any = state.engineMeta ?? {};
  const achievements: string[] = [];
  const penalties: string[] = [];

  let bonus = 0;
  let malus = 0;

  // Automatische Boni
  if (num(k.bankTrust, 0) >= 80) { bonus += 4; achievements.push('Bankvertrauen ≥ 80'); }
  if (num(k.customerLoyalty, 0) >= 80) { bonus += 3; achievements.push('Kundentreue ≥ 80'); }
  if (num(k.publicPerception, 0) >= 70) { bonus += 3; achievements.push('Öffentliche Wahrnehmung ≥ 70'); }
  if (num(k.workforceEngagement, 0) >= 60) { bonus += 3; achievements.push('Belegschaftsengagement ≥ 60'); }

  // Den aktuellen Insolvenzmodus aus globalThis abrufen
  const currentInsolvencyMode = (globalThis as any).__insolvencyMode as ('hard' | 'soft' | 'off' | undefined) ?? 'hard';
  
  // Bonus nur vergeben, wenn das Spiel beendet ist, nicht formal insolvent UND nicht als wahrgenommen insolvent gilt
  if ((state as any).isOver && !(state as any).insolvency && !isPerceivedInsolvent(k, currentInsolvencyMode)) {
    bonus += 5; 
    achievements.push('Kein Insolvenzstatus am Spielende');
  }

  // Automatische Malusse
  if ((state as any).insolvency) { malus += 15; penalties.push('Insolvenz am Spielende'); }

  const warnings = Array.isArray(meta.insoWarnings) ? meta.insoWarnings.length : 0;
  const suppressed = Math.round(meta.suppressedInsolvencyCount || 0);
  const softSignals = warnings + Math.floor(suppressed / 2);
  if (softSignals > 0) {
    const m = Math.min(10, Math.floor(softSignals / 1) * 2);
    malus += m;
    penalties.push(`Insolvenzhinweise (${softSignals})`);
  }

  if (num(k.workforceEngagement, 0) <= 20) { malus += 8; penalties.push('Team stark demotiviert (≤20)'); }
  if (num(k.bankTrust, 0) <= 30) { malus += 8; penalties.push('Bankvertrauen sehr niedrig (≤30)'); }

  // Admin-Override
  const adj = meta.scoringAdjustments || {};
  const bonusManual = num(adj.bonusManual, 0);
  const malusManual = num(adj.malusManual, 0);
  if (bonusManual) { bonus += bonusManual; achievements.push(adj.reasonBonus ? `Manueller Bonus: ${adj.reasonBonus}` : 'Manueller Bonus'); }
  if (malusManual) { malus += malusManual; penalties.push(adj.reasonMalus ? `Manueller Malus: ${adj.reasonMalus}` : 'Manueller Malus'); }

  return { bonus, malus, achievements, penalties };
}

/* -----------------------------------------------------------
   4b) NEU: Zusatz-Boni/Mali nach Auftraggeber-Regeln
   (ohne Breaking Changes; robust gegen fehlende Zeitreihe)
----------------------------------------------------------- */

type Series = number[];

function readSeries(meta: any, valueKeys: string[]): Series {
  const cands: Series[] = [];

  const collectFromArray = (arr: any[]) => {
    const vals = arr.map((row: any) => {
      if (typeof row === 'number') return Number(row);
      if (row && typeof row === 'object') {
        for (const k of valueKeys) {
          const v = (row as any)[k];
          if (typeof v === 'number' && Number.isFinite(v)) return Number(v);
        }
      }
      return NaN;
    }).filter((v) => Number.isFinite(v));
    if (vals.length) cands.push(vals);
  };

  const tryNode = (node: any) => {
    if (!node) return;
    if (Array.isArray(node)) collectFromArray(node);
    if (Array.isArray(node?.days)) collectFromArray(node.days);
    if (Array.isArray(node?.kpi)) collectFromArray(node.kpi);
    // Properties that directly hold numeric arrays
    for (const p of ['values','series','data','cashByDay','cashEURByDay','liquidityByDay','profitByDay','profitLossByDay','plByDay']) {
      const arr = node?.[p];
      if (Array.isArray(arr)) {
        const vals = arr.map((x:any) => Number(x)).filter((v:any)=>Number.isFinite(v));
        if (vals.length) cands.push(vals);
      }
    }
  };

  tryNode(meta?.kpiByDay);
  tryNode(meta?.kpiHistory);
  tryNode(meta?.kpiLog);
  tryNode(meta?.dailyKpi);
  tryNode(meta?.timeline);
  tryNode(meta?.days);
  tryNode(meta?.series);
  tryNode(meta);

  // pick the longest plausible series
  let best: number[] = [];
  for (const s of cands) if (s.length > best.length) best = s;
  return best;
}

function detectInsolvencyAny(state: GameState): boolean {
  const k = (state as any).kpi ?? {};
  const meta: any = (state as any).engineMeta ?? {};
  const currentInsolvencyMode = (globalThis as any).__insolvencyMode as ('hard'|'soft'|'off'|undefined) ?? 'hard';
  const perceived = isPerceivedInsolvent(k, currentInsolvencyMode);
  const ended = !!(state as any).insolvency;
  const hadDays = Array.isArray(meta.insolvencyDays) && meta.insolvencyDays.length > 0;
  const warned = Array.isArray(meta.insoWarnings) && meta.insoWarnings.length > 0;
  const suppressed = !!(meta.suppressedInsolvencyCount > 0 || (Array.isArray(meta.suppressedInsolvencyReasons) && meta.suppressedInsolvencyReasons.length > 0));
  return !!(ended || perceived || hadDays || warned || suppressed);
}

function computeExtras(state: GameState) {
  const k = (state as any).kpi ?? {};
  const meta: any = (state as any).engineMeta ?? {};

  // Zeitreihen (robust extrahieren; wenn nicht vorhanden, fallen Boni/Mali aus diesen Regeln ggf. weg)
  const cashSeries: number[] = readSeries(meta, ['cashEUR','cash','liquidity']);
  const profitSeries: number[] = readSeries(meta, ['profitLossEUR','profit','pl']);

  const cashEnd = num(k.cashEUR ?? (k.cash as any) ?? (k.liquidity as any), 0);
  const profitEnd = num(k.profitLossEUR ?? (k.profit as any) ?? (k.pl as any), 0);
  const customerLoyalty = nz01(k.customerLoyalty);
  const publicPerception = nz01(k.publicPerception);

  let bonus = 0;
  let malus = 0;
  const achievements: string[] = [];
  const penalties: string[] = [];

  // --- BONI (über gesamten Verlauf) ---
  if (cashSeries.length > 0) {
    const minCash = Math.min(...cashSeries.map((v)=>num(v,0)));
    if (minCash > 0) { bonus += 4; achievements.push('Liquidität im ganzen Spiel > 0'); }
    if (minCash > 50000) { bonus += 5; achievements.push('Liquidität im ganzen Spiel > 50.000'); }
  }
  if (profitSeries.length > 0) {
    const allProfitPos = profitSeries.every((v)=> num(v, 0) > 0);
    if (allProfitPos) { bonus += 4; achievements.push('Gewinn im ganzen Spiel > 0'); }
    if (profitSeries.length >= 2) {
      const fromDay2 = profitSeries.slice(1).every((v)=> num(v, 0) > 50000);
      if (fromDay2) { bonus += 5; achievements.push('Gewinn ab Tag 2 immer > 50.000'); }
    }
  }

  // --- BONI (Endwerte) ---
  if (cashEnd > 100000) { bonus += 2; achievements.push('Liquidität am Ende > 100.000'); }
  if (profitEnd > 500000) { bonus += 2; achievements.push('Gewinn am Ende > 500.000'); }

  // --- MALI (Endwerte) ---
  if (cashEnd < 50000) { malus += 2; penalties.push('Liquidität am Ende < 50.000'); }

  // Profit-Ende-staffel (nur höchste zutreffende Strafe anwenden)
  if (profitEnd < -100000) { malus += 5; penalties.push('Gewinn am Ende < -100.000'); }
  else if (profitEnd < 0)   { malus += 4; penalties.push('Gewinn am Ende < 0'); }
  else if (profitEnd < 50000) { malus += 2; penalties.push('Gewinn am Ende < 50.000'); }

  // KPI-Untergrenzen
  if (customerLoyalty < 30) { malus += 3; penalties.push('Kundentreue < 30'); }
  if (publicPerception < 30) { malus += 3; penalties.push('Öffentliche Wahrnehmung < 30'); }

  return { bonus, malus, achievements, penalties };
}

/* -----------------------------------------------------------
   5) Öffentliche API (Einstufung beibehalten, mit Insolvenz-Deckel)
----------------------------------------------------------- */
export function computeScoreFromState(state: GameState): ScoreResult {
  const weights = readWeights(state);
  const { base, contributions } = computeBase(state, weights);
  const adj = computeAdjustments(state);
  const extra = computeExtras(state);

  const rawFinal = base + adj.bonus + extra.bonus - (adj.malus + extra.malus);

  // ZERO-ERROR: immer auf [0..100] clampen
  let clamped = clamp0to100(rawFinal);

  // NEU: Insolvenz während des Verlaufs ODER am Ende => Deckel "Fragil" (max. 54)
  if (detectInsolvencyAny(state)) {
    clamped = Math.min(clamped, 54);
  }

  const verdict = verdictFor(clamped);

  return {
    base,
    score: clamped,
    verdict,
    contributions,
    weights,
    bonus: adj.bonus + extra.bonus,
    malus: adj.malus + extra.malus,
    achievements: [...adj.achievements, ...extra.achievements],
    penalties: [...adj.penalties, ...extra.penalties],
  };
}

/* -----------------------------------------------------------
   6) Rückwärtskompatibilität
----------------------------------------------------------- */
export function computeScoreFromKpiSnapshot(state: GameState): ScoreResult {
  return computeScoreFromState(state);
}

/* Alias, damit auch computeScoreFromKPI (mit großem I) verfügbar ist */
export function computeScoreFromKPI(state: GameState): ScoreResult {
  return computeScoreFromState(state);
}
