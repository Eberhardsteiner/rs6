// src/core/engine/ending_extras.ts
import type { GameState } from './gameEngine';
import { determineEnding, type EndingResult } from './ending';
import { day1Blocks } from '@/data/scenario_day_01';
import { day2Blocks } from '@/data/scenario_day_02';
import { day3Blocks } from '@/data/scenario_day_03';
import { day4Blocks } from '@/data/scenario_day_04';
import { day5Blocks } from '@/data/scenario_day_05';
import { day6Blocks } from '@/data/scenario_day_06';
import { day7Blocks } from '@/data/scenario_day_07';
import { day8Blocks } from '@/data/scenario_day_08';
import { day9Blocks } from '@/data/scenario_day_09';
import { day10Blocks } from '@/data/scenario_day_10';
import { day11Blocks } from '@/data/scenario_day_11';
import { day12Blocks } from '@/data/scenario_day_12';
import { day13Blocks } from '@/data/scenario_day_13';
import { day14Blocks } from '@/data/scenario_day_14';

// ── NEU: Scoring-Gewichte (weiche KPIs) aus Admin-Settings ─────────────────────
type SoftWeights = {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
};

function __readScoringWeights(): SoftWeights {
  const g: any = (globalThis as any);
  const w = g?.__scoringWeights || { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 };
  return {
    bankTrust: Number(w.bankTrust || 25),
    publicPerception: Number(w.publicPerception || 25),
    customerLoyalty: Number(w.customerLoyalty || 25),
    workforceEngagement: Number(w.workforceEngagement || 25),
  };
}

function __normalizeWeights(w: SoftWeights): SoftWeights {
  const sum = (w.bankTrust||0) + (w.publicPerception||0) + (w.customerLoyalty||0) + (w.workforceEngagement||0);
  if (!isFinite(sum) || sum <= 0) return { bankTrust:25, publicPerception:25, customerLoyalty:25, workforceEngagement:25 };
  const f = 100 / sum;
  return {
    bankTrust: Math.round(w.bankTrust * f),
    publicPerception: Math.round(w.publicPerception * f),
    customerLoyalty: Math.round(w.customerLoyalty * f),
    workforceEngagement: Math.round(w.workforceEngagement * f),
  };
}

/** Gewichteter Soft-Score aus KPI-Werten (0..100) gem. Gewichten (Summe 100). */
function __computeWeightedSoftScore(k: KPI, wRaw?: SoftWeights): number {
  const w = __normalizeWeights(wRaw || __readScoringWeights());
  const s =
    (Number(k.bankTrust||0)            * w.bankTrust) +
    (Number(k.publicPerception||0)     * w.publicPerception) +
    (Number(k.customerLoyalty||0)      * w.customerLoyalty) +
    (Number(k.workforceEngagement||0)  * w.workforceEngagement);
  return Math.max(0, Math.min(100, Math.round(s / 100)));
}


// Replicate the logic from PerformanceIndicator's computeStatus for red/red-blink
function isPerceivedInsolvent(kpi: KPI, mode: 'hard' | 'soft' | 'off'): boolean {
  if (!kpi) return false;

  const cash = Number(kpi.cashEUR ?? 0);
  const pl = Number(kpi.profitLossEUR ?? 0);
  const bank = Number(kpi.bankTrust ?? 50);

  // Rot blinkend (nur bei soft/off): cash < 0 ODER pl < -5.000.000
  const blinkEligible = (mode === 'soft' || mode === 'off');
  if (blinkEligible && (cash < 0 || pl < -5_000_000)) {
    return true;
  }

  // Rot (statisch): (cash < 20.000 UND pl < 0) ODER bankTrust === 0
  if ((cash < 20_000 && pl < 0) || bank === 0) {
    return true;
  }

  return false;
}

// Combine all decision blocks for easy access
const ALL_DECISION_BLOCKS = [
  ...day1Blocks, ...day2Blocks, ...day3Blocks, ...day4Blocks,
  ...day5Blocks, ...day6Blocks, ...day7Blocks, ...day8Blocks,
  ...day9Blocks, ...day10Blocks, ...day11Blocks, ...day12Blocks,
  ...day13Blocks, ...day14Blocks
];

export interface EndingDiagnostics {
  payrollSecured: boolean;
  payrollNotPaid: boolean;
  waiverFinalized: boolean;
  commTransparent: boolean;
  hypercareActive: boolean;
  qualityProofActive: boolean;
  lowBankTrust: boolean;
  topImpacts: Record<
    'bankTrust'|'cashEUR'|'publicPerception'|'customerLoyalty'|'workforceEngagement'|'profitLossEUR',
    { positive: ImpactItem[]; negative: ImpactItem[] }
  >;
}

export interface ImpactItem {
  day: number;
  role: string;
  blockId: string;
  optionId: string;
  optionLabel: string;
  delta: number;         // z. B. +4 BankTrust
}

export interface EndingViewModel {
  ending: EndingResult;
  diagnostics: EndingDiagnostics;
  kpiRaw: GameState['kpi'];
  decisions: Array<{
    day: number; role: string; blockId: string; title?: string;
    optionId: string; optionLabel: string;
    kpiDelta: Partial<GameState['kpi']>; // real: nur die 6 KPI-Felder
  }>;
}

export function buildEndingViewModel(state: GameState): EndingViewModel {
  const ending = determineEndingWithContext(state);
  const diagnostics = buildDiagnostics(state);

  // Normalisiertes Decision-Log für UI (Titel optional; meist im Log vorhanden)
  const decisions = (state.log ?? []).map((e: any) => ({
    day: Number(e.day),
    role: String(e.role),
    blockId: String(e.blockId ?? e.id ?? ''),
    title: typeof e.title === 'string' ? e.title : undefined,
    optionId: String(e.chosenOptionId ?? ''),
    optionLabel: String(e.chosenOptionLabel ?? ''),
    kpiDelta: (e.kpiDelta ?? {})
  })).sort((a,b) => a.day - b.day || a.role.localeCompare(b.role));

  return { ending, diagnostics, kpiRaw: state.kpi, decisions };
}

// --------- Diagnostik ---------
export function buildDiagnostics(state: GameState): EndingDiagnostics {
  const get = (rx: RegExp) =>
    !!state?.log?.some((e: any) =>
      typeof e?.chosenOptionLabel === 'string' && rx.test(e.chosenOptionLabel)
    );

  const payrollSecured   = get(/payroll.*(freigeben|Vollzahlung|Treuhand|konto|deck|deckung|100 ?%)/i) || get(/l[oö]hne.*(gesichert|bezahlt)/i);
  const payrollNotPaid   = get(/payroll.*(Verzögerung|verschieben|nicht|stopp)/i) || (state.kpi?.workforceEngagement ?? 100) < 15;
  const waiverFinalized  = get(/waiver|sideletter.*(final|unterzeichnen|abschlie[ßs]en)/i);
  const commTransparent  = get(/fakten|statement|q\&a|faq|transpar|klar|briefing|message house|commitment|townhall/i);
  const hypercareActive  = get(/hypercare|24\/7|hotline|eskalation(s|s\-)?pfad|standby/i);
  const qualityProofActive = get(/defektrate|nacharbeit|qs|kurzreport|externer qs/i);
  const lowBankTrust     = Number(state?.kpi?.bankTrust ?? 100) < 45;

  const topImpacts = rankImpacts(state);

  return {
    payrollSecured, payrollNotPaid, waiverFinalized, commTransparent,
    hypercareActive, qualityProofActive, lowBankTrust, topImpacts
  };
}


// Rangiert die größten +/- Beiträge je KPI auf Basis der im Log hinterlegten kpiDelta.*
function rankImpacts(state: GameState): EndingDiagnostics['topImpacts'] {
  const KPIS = ['bankTrust','cashEUR','publicPerception','customerLoyalty','workforceEngagement','profitLossEUR'] as const;
  const out: any = {};
  
  const entries = (state.log ?? []) as any[];

  for (const k of KPIS) {
    const deltas: ImpactItem[] = [];
    for (const e of entries) {
      if (!e.chosenOptionId) continue;
      const block = ALL_DECISION_BLOCKS.find(b => b.id === e.blockId);
      if (!block) continue;
      const option = block.options.find(o => o.id === e.chosenOptionId);
      if (!option || !option.kpiDelta) continue;
      const d = Number(option.kpiDelta[k] ?? 0);
      if (!isFinite(d) || d === 0) continue;
      deltas.push({
        day: Number(e.day),
        role: String(e.role),
        blockId: String(e.blockId ?? e.id ?? ''),
        optionId: String(e.chosenOptionId ?? ''),
        optionLabel: String(e.chosenOptionLabel ?? ''),
        delta: d
      });
    }
    const pos = deltas.filter(x => x.delta > 0).sort((a,b)=>b.delta-a.delta).slice(0,5);
    const neg = deltas.filter(x => x.delta < 0).sort((a,b)=>a.delta-b.delta).slice(0,5);
    out[k] = { positive: pos, negative: neg };
  }
  return out;
}

// --------- Terminal Overrides ---------
export function determineEndingWithContext(state: GameState): EndingResult {
  const base = determineEnding(state);
  const diag = buildDiagnostics(state);
  const mode = (globalThis as any).__insolvencyMode as ('hard'|'soft'|'off'|undefined) ?? 'hard';

  // Nur wenn Payroll nicht bezahlt wurde UND Insolvenzmodus NICHT 'off' ist → Insolvenz erzwingen
  if (diag.payrollNotPaid && mode !== 'off') {
    return {
      ...base,
      id: 'INSOLVENCY',
      title: 'Finale: Insolvenz',
      summary:
        'Payroll wurde nicht gesichert bzw. deutlich verzögert – dadurch kippt die Lage rechtlich/reputational in das Insolvenz-Szenario.',
      score: base.score
    } as EndingResult;
  }

  return base;
}

// Export the helper function
export { isPerceivedInsolvent };
