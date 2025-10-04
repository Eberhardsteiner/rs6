// src/core/engine/reducers.ts
import type { KPI, RoleId } from '@/core/models/domain';
import type { GameState } from '@/core/engine/gameEngine';
import type { DecisionLogEntry } from '@/core/models/decisionLog';
import { generateDailyRandomValues } from '@/core/engine/gameEngine';
import { generateRandomNewsForDay, type NewsItem, type NewsIntensity } from "@/core/engine/randomNews";
import { enforceInvariants } from '@/core/engine/invariants';
import { getDifficulty, scaleDeltaByDifficulty, capDailyCashOutflow, scaleRandomByDifficulty, shouldTriggerInsolvencyNow, applyOverdraftIfEasy } from '@/core/engine/difficulty';
import { updateAdaptiveLight } from '@/core/engine/adaptiveLight';
import { errorHandler, safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove, safeDispatchEvent } from '@/utils/errorHandler';

// Import globale Typen
import type { InsolvencyRule } from '@/types/global';

// -------------------------------------------------------------
// Szenario-Events: einfache Bedingungslogik
type KpiKeyLocal = 'cashEUR'|'profitLossEUR'|'customerLoyalty'|'bankTrust'|'workforceEngagement'|'publicPerception';
type KpiRuleOpLocal = '<' | '<=' | '>' | '>=' | '==' | '!=';
type KpiRuleLocal = { key: KpiKeyLocal; op: KpiRuleOpLocal; value: number };
type ConditionSetLocal = { day?: number; minDay?: number; maxDay?: number; kpi?: KpiRuleLocal[] };

function evalKpiRule(current: number, op: KpiRuleOpLocal, value: number): boolean {
  switch (op) {
    case '<':  return current < value;
    case '<=': return current <= value;
    case '>':  return current > value;
    case '>=': return current >= value;
    case '==': return current === value;
    case '!=': return current !== value;
    default:   return false;
  }
}

function evalConditions(conds: unknown, state: GameState): boolean {
  if (!conds || typeof conds !== 'object') return true;
  const c = conds as ConditionSetLocal;
  const day = state.day;
  if (typeof c.day === 'number' && day !== c.day) return false;
  if (typeof c.minDay === 'number' && day < c.minDay) return false;
  if (typeof c.maxDay === 'number' && day > c.maxDay) return false;
  if (Array.isArray(c.kpi)) {
    for (const r of c.kpi) {
      const key = r?.key as KpiKeyLocal;
      const v = state.kpi[key];
      if (!evalKpiRule(Number(v) || 0, r?.op as KpiRuleOpLocal, Number(r?.value) || 0)) return false;
    }
  }
  return true;
}

// -------------------------------------------------------------
// Erweiterte Typen für Engine-Meta und State
export interface EngineMeta {
  scheduledDeltas?: Record<number, Array<Partial<KPI> | { impact: Partial<KPI>; conditions?: unknown }>>;
  randomNews?: Record<number, (NewsItem & { conditions?: unknown })[]>;
  negCashStreak?: number;
  kpiReasons?: Record<number, KpiReasonEntry[]>;
  scoringWeights?: { bankTrust: number; publicPerception: number; customerLoyalty: number; workforceEngagement: number };
  difficultyFactor?: number;
  dailyRandomValues?: Record<number, {
    cashInflow: number;
    cashOutflow: number;
    plInflow: number;
    plOutflow: number;
    cashNet: number;
    plNet: number;
  }>;
  currentDayRandoms?: {
    cashNet: number;
    plNet: number;
  };
  bank?: {
    pendingDrawEUR?: number;
    effectiveCashForInsolv?: number;
    usedCreditEUR?: number;
    creditLineEUR?: number;
    interestRatePct?: number;
    availableCredit?: number;
    lastDrawNow?: number;
  };
  playedNewsIds?: string[];
  insolvencyTriggeredByRules?: string[];
  intensityByDay?: number[];
  seed?: number;
  userDeclaredInsolvency?: boolean;
  userDeclaredCause?: string;
  [key: string]: unknown;
}

// Erweitertes GameState mit Bank-Feldern
export interface ExtendedGameState extends GameState {
  engineMeta?: EngineMeta;
  creditLineEUR?: number;
  interestRatePct?: number;
  usedCreditEUR?: number;
}

// -------------------------------------------------------------
// Action-Typen
export type Action =
  | { type: 'INIT'; payload: Partial<ExtendedGameState> }
  | { type: 'SCENARIO_IMPORT'; mode?: 'merge'|'replace'; compiled: { scheduledDeltas?: Record<number, Array<Partial<KPI>>>; randomNews?: Record<number, unknown[]>; meta?: Record<string, unknown> } }
  | { type: 'CHOOSE_OPTION';
      blockId: string; day: number; role: RoleId;
      optId: 'a'|'b'|'c'|'d'; optLabel: string;
      kpiDelta: Partial<KPI> }
  | { type: 'SET_CUSTOM_TEXT';
      blockId: string; day: number; role: RoleId;
      text: string }
  | { type: 'ADVANCE_DAY' }
  | { type: 'DECLARE_INSOLVENCY'; cause?: string }
  | { type: 'SET_USER_NOTES'; notes: string }
  | { type: 'ADMIN_SET_KPI'; kpi: Partial<KPI> }
  | { type: 'ADMIN_ADD_KPI'; delta: Partial<KPI> }
  | { type: 'BANK_DRAW_NOW'; amount: number };

// -------------------------------------------------------------
// Hilfsfunktionen

function emptyKpi(): KPI {
  return {
    cashEUR: 0,
    profitLossEUR: 0,
    customerLoyalty: 0,
    bankTrust: 0,
    workforceEngagement: 0,
    publicPerception: 0
  };
}

function mergeDelta(base: KPI, delta?: Partial<KPI>): KPI {
  if (!delta) return base;
  const next: KPI = { ...base };
  (Object.keys(delta) as (keyof KPI)[]).forEach(k => {
    const v = delta[k];
    if (typeof v === 'number' && Number.isFinite(v)) {
      next[k] = Math.round((base[k] ?? 0) + v);
    }
  });
  return next;
}

function sumDeltas(deltas: Array<Partial<KPI>>): Partial<KPI> {
  const acc: Partial<Record<keyof KPI, number>> = {};
  for (const d of deltas) {
    for (const k of Object.keys(d) as (keyof KPI)[]) {
      const v = d[k];
      if (typeof v === 'number' && Number.isFinite(v)) {
        acc[k] = Math.round((acc[k] ?? 0) + v);
      }
    }
  }
  return acc as Partial<KPI>;
}

function clamp01to100(v: number): number { 
  return Math.max(0, Math.min(100, v)); 
}

// === Ereignis-Intensität (Admin-gesteuert) ===
function __readEventIntensityByDay(meta?: EngineMeta): number[] {
  try {
    const arrG = globalThis.__eventIntensityByDay;
    if (Array.isArray(arrG) && arrG.length >= 14) return arrG.map((x: number)=>Number(x)||0).slice(0,14);
  } catch (e) {
    errorHandler.debug('Failed to read event intensity from global', e, {
      category: 'UNEXPECTED',
      component: 'reducers',
      action: 'read-event-intensity-global',
    });
  }
  try {
    const arrM = Array.isArray(meta?.intensityByDay) ? meta.intensityByDay : null;
    if (arrM && arrM.length >= 14) return arrM.map((x: number)=>Number(x)||0).slice(0,14);
  } catch (e) {
    errorHandler.debug('Failed to read event intensity from meta', e, {
      category: 'UNEXPECTED',
      component: 'reducers',
      action: 'read-event-intensity-meta',
    });
  }
  return Array.from({length:14}, ()=>1);
}

function __intensityMultiplierForDay(day: number, meta?: EngineMeta): number {
  const enabled = !!globalThis.__featureEventIntensity;
  if (!enabled) return 1;
  const arr = __readEventIntensityByDay(meta);
  const idx = Math.max(0, Math.min(13, (Math.floor(day)-1)));
  const raw = Number(arr[idx] ?? 1);
  if (!Number.isFinite(raw)) return 1;
  return Math.max(0, Math.min(3, raw));
}

function __mapMultiplierToNewsIntensity(m: number): NewsIntensity {
  if (m <= 0.75) return 'low';
  if (m >= 1.5) return 'high';
  return 'normal';
}

function __scaleDelta(d: Partial<KPI>, m: number): Partial<KPI> {
  const out: Partial<Record<keyof KPI, number>> = {};
  (Object.keys(d || {}) as (keyof KPI)[]).forEach(k => {
    const v = d[k];
    if (typeof v === 'number' && Number.isFinite(v)) out[k] = Math.round(v * m);
  });
  return out;
}

// Invariante: Bankvertrauen fällt bei negativer Liquidität sofort auf 0
function enforceBankTrustInvariant(kpi: KPI): KPI {
  if (!kpi) return kpi;
  const clampedPoints = {
    ...kpi,
    customerLoyalty: clamp01to100(kpi.customerLoyalty),
    bankTrust: clamp01to100(kpi.bankTrust),
    workforceEngagement: clamp01to100(kpi.workforceEngagement),
    publicPerception: clamp01to100(kpi.publicPerception),
  };
  return (clampedPoints.cashEUR < 0)
    ? { ...clampedPoints, bankTrust: 0 }
    : clampedPoints;
}

type InsolvencyMode = 'hard'|'soft'|'off';
type InsolvencyCause = 'NEGATIVE_CASH'|'PAYROLL_UNPAID'|'EXTERNAL'|'OTHER';

function getInsolvencyMode(): InsolvencyMode {
  const m = globalThis.__insolvencyMode;
  return (m === 'hard' || m === 'soft' || m === 'off') ? m : 'hard';
}

interface InsolvencyMeta extends EngineMeta {
  insoWarnings?: Array<{ day: number; cause: string; cashEUR: number; ts: number }>;
  suppressedInsolvencyReasons?: Array<{ day: number; cause: string; cashEUR: number; ts: number }>;
  suppressedInsolvencyCount?: number;
}

function applyInsolvencyPolicy(
  mode: InsolvencyMode,
  cause: InsolvencyCause,
  day: number,
  cashEUR: number,
  metaIn: InsolvencyMeta
): { isOver: boolean; insolvency: boolean; meta: InsolvencyMeta } {
  const meta: InsolvencyMeta = { ...(metaIn ?? {}) };

  if (mode === 'hard') {
    return { isOver: true, insolvency: true, meta };
  }

  if (mode === 'soft') {
    const arr = Array.isArray(meta.insoWarnings) ? meta.insoWarnings : [];
    meta.insoWarnings = [...arr, { day, cause, cashEUR, ts: Date.now() }];
    safeDispatchEvent(new CustomEvent('game:insolvency-warning', { detail: { day, cause, cashEUR }}), {
      component: 'reducers',
      action: 'insolvency-warning',
    });
    return { isOver: false, insolvency: false, meta };
  }

  const sup = Array.isArray(meta.suppressedInsolvencyReasons) ? meta.suppressedInsolvencyReasons : [];
  meta.suppressedInsolvencyReasons = [...sup, { day, cause, cashEUR, ts: Date.now() }];
  meta.suppressedInsolvencyCount = Math.round(meta.suppressedInsolvencyCount || 0) + 1;
  safeDispatchEvent(new CustomEvent('game:insolvency-suppressed', { detail: { day, cause, cashEUR }}), {
    component: 'reducers',
    action: 'insolvency-suppressed',
  });
  return { isOver: false, insolvency: false, meta };
}

// -------------------------------------------------------------
// KPI-Reasons Typ
export interface KpiReasonEntry {
  kpi: keyof KPI;
  delta: number;
  reason: string;
  source?: string;
}

// -------------------------------------------------------------
// Reducer

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {

    case 'INIT': {
      const next: ExtendedGameState = {
        ...state,
        ...action.payload,
        kpi: { ...(state.kpi ?? emptyKpi()), ...(action.payload.kpi ?? {}) },
        kpiHistory: action.payload.kpiHistory ?? state.kpiHistory ?? [],
        pendingDeltas: action.payload.pendingDeltas ?? state.pendingDeltas ?? [],
        log: action.payload.log ?? state.log ?? [],
        engineMeta: { ...(state.engineMeta ?? {}), ...(action.payload?.engineMeta ?? {}) }
      };

      // Defaults für optionale Bank-Mechanik
      if (typeof next.creditLineEUR !== 'number') next.creditLineEUR = Number(globalThis.__bankSettings?.creditLineEUR ?? 0);
      if (typeof next.interestRatePct !== 'number') next.interestRatePct = Number(globalThis.__bankSettings?.interestRatePct ?? 0);
      if (typeof next.usedCreditEUR !== 'number') next.usedCreditEUR = 0;

      if (typeof next.day !== 'number' || !Number.isFinite(next.day)) {
        next.day = 1;
      }
      
      next.engineMeta = next.engineMeta || {};
      next.engineMeta.randomNews = next.engineMeta.randomNews || {};
      next.engineMeta.negCashStreak = Math.max(0, Number(next.engineMeta.negCashStreak) || 0);
      next.engineMeta.kpiReasons = next.engineMeta.kpiReasons || {};

      next.engineMeta.scoringWeights =
        next.engineMeta.scoringWeights
        ?? globalThis.__scoringWeights
        ?? { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 };
      
      const __inv_INIT = enforceInvariants(next.kpi as KPI, next as ExtendedGameState, { trigger: 'INIT' });
      next.kpi = __inv_INIT.kpi;
      safeDispatchEvent(new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } }), {
        component: 'reducers',
        action: 'hud-kpi-init',
      });

      return next;
    }

    case 'SCENARIO_IMPORT': {
      const mode = action.mode || 'replace';
      const compiled = action.compiled || {};
      const meta: EngineMeta = { ...(state.engineMeta || {}) };
      
      if (mode === 'replace') {
        if (compiled.scheduledDeltas) meta.scheduledDeltas = compiled.scheduledDeltas;
        if (compiled.randomNews) meta.randomNews = compiled.randomNews as Record<number, NewsItem[]>;
        if (compiled.meta) meta.scenarioMeta = compiled.meta;
      } else {
        const schedOld = (meta.scheduledDeltas = meta.scheduledDeltas || {});
        const schedNew = compiled.scheduledDeltas || {};
        for (const d of Object.keys(schedNew)) {
          const day = Number(d);
          const existing = schedOld[day] || [];
          const newItems = schedNew[day] || [];
          schedOld[day] = [...existing, ...newItems];
        }
        
        const rnOld = (meta.randomNews = meta.randomNews || {});
        const rnNew = compiled.randomNews || {};
        for (const d of Object.keys(rnNew)) {
          const day = Number(d);
          const existing = rnOld[day] || [];
          const newItems = (rnNew as Record<number, unknown[]>)[day] || [];
          rnOld[day] = [...existing, ...(newItems as NewsItem[])];
        }
        
        if (compiled.meta) meta.scenarioMeta = compiled.meta;
      }
      return { ...state, engineMeta: meta };
    }

    case 'CHOOSE_OPTION': {
      const entry: DecisionLogEntry = {
        ts: Date.now(),
        day: action.day,
        role: action.role,
        blockId: action.blockId,
        chosenOptionId: action.optId,
        chosenOptionLabel: action.optLabel,
        kpiDelta: action.kpiDelta
      };

      const next: GameState = {
        ...state,
        log: [...state.log, entry],
        pendingDeltas: [...state.pendingDeltas, action.kpiDelta]
      };
      return next;
    }

    case 'SET_CUSTOM_TEXT': {
      const existsAtIdx = state.log.findIndex(e =>
        e.day === action.day && e.role === action.role && e.blockId === action.blockId
      );

      let newLog: DecisionLogEntry[];
      if (existsAtIdx >= 0) {
        const cur = state.log[existsAtIdx];
        const upd: DecisionLogEntry = { ...cur, customText: action.text };
        newLog = [...state.log.slice(0, existsAtIdx), upd, ...state.log.slice(existsAtIdx + 1)];
      } else {
        const entry: DecisionLogEntry = {
          ts: Date.now(),
          day: action.day,
          role: action.role,
          blockId: action.blockId,
          customText: action.text
        };
        newLog = [...state.log, entry];
      }

      return { ...state, log: newLog };
    }

    case 'SET_USER_NOTES': {
      return { ...state, userNotes: action.notes };
    }

    case 'ADVANCE_DAY': {
      const hist = [...state.kpiHistory, state.kpi];
      let meta: EngineMeta = { ...(state.engineMeta ?? {}) };

      // Adaptive Difficulty (Light)
      try {
        const adaptiveEnabled = globalThis.__adaptiveDifficultyLightEnabled === true;
        meta = updateAdaptiveLight(meta, hist, { enabled: adaptiveEnabled });
        globalThis.__difficultyFactor = meta.difficultyFactor ?? 1.0;
      } catch (e) {
        errorHandler.warn('Failed to update adaptive difficulty', e, {
          category: 'UNEXPECTED',
          component: 'reducers',
          action: 'adaptive-difficulty',
        });
      }
      
      const sched = (meta.scheduledDeltas = meta.scheduledDeltas || {});
      
      const today = state.day;
      const nextDay = today + 1;
      
      // User-Entscheidungen und Scheduled Deltas
      const userDeltas = state.pendingDeltas || [];
      const scheduledForTodayRaw = Array.isArray(sched[today]) ? sched[today] : [];
      const scheduledForToday = scheduledForTodayRaw.flatMap((it) => {
        if (it && typeof it === 'object' && 'impact' in it) {
          const withConditions = it as { impact: Partial<KPI>; conditions?: unknown };
          return evalConditions(withConditions.conditions, state) ? [withConditions.impact] : [];
        }
        return [it as Partial<KPI>];
      });

      const diff = getDifficulty();

      // Zufalls-News für heute
      const newsForTodayAll: (NewsItem & { conditions?: unknown })[] = Array.isArray(meta.randomNews?.[today]) ? meta.randomNews[today] : [];
      const newsForToday: NewsItem[] = newsForTodayAll.filter((n) => evalConditions(n.conditions, state));
      const newsImpactRaw = newsForToday.length ? sumDeltas(newsForToday.map(n => n.impact ?? {})) : {};

      const userSumRaw = userDeltas.length ? sumDeltas(userDeltas) : {};
      const schedSumRaw = scheduledForToday.length ? sumDeltas(scheduledForToday) : {};

      const userSumScaled = scaleDeltaByDifficulty(userSumRaw, diff);
      const schedSumScaled = scaleDeltaByDifficulty(schedSumRaw, diff);

      const __mToday = __intensityMultiplierForDay(today, meta);
      const newsItemsScaled = newsForToday.map(n => ({ n, impact: __scaleDelta(scaleDeltaByDifficulty(n.impact ?? {}, diff), __mToday) }));
      const newsSumScaled = newsItemsScaled.length ? sumDeltas(newsItemsScaled.map(x => x.impact)) : {};

      const combinedBeforeCap = sumDeltas([userSumScaled, schedSumScaled, newsSumScaled]);
      const combinedDeltas = capDailyCashOutflow(combinedBeforeCap, diff);

      const cashAfterUserDecisions = state.kpi.cashEUR + (combinedDeltas.cashEUR || 0);

      // Randoms für NEXT day
      const randomValuesRaw = generateDailyRandomValues(cashAfterUserDecisions);
      const randomValues = scaleRandomByDifficulty(randomValuesRaw, diff);
      const __mNext = __intensityMultiplierForDay(nextDay, meta);
      const __rv = {
        cashInflow: Math.round(randomValues.cashInflow * __mNext),
        cashOutflow: Math.round(randomValues.cashOutflow * __mNext),
        plInflow: Math.round(randomValues.plInflow * __mNext),
        plOutflow: Math.round(randomValues.plOutflow * __mNext),
        cashNet: 0,
        plNet: 0
      };
      __rv.cashNet = Math.round(__rv.cashInflow - __rv.cashOutflow);
      __rv.plNet = Math.round(__rv.plInflow - __rv.plOutflow);
      meta.dailyRandomValues = meta.dailyRandomValues || {};
      meta.dailyRandomValues[nextDay] = __rv;
      meta.currentDayRandoms = __rv;

      // Randoms vom HEUTIGEN Tag
      const todaysRandoms = meta.dailyRandomValues?.[today] || { cashNet: 0, plNet: 0 };

      // Finale KPIs
      const kpiAppliedBase: KPI = {
        cashEUR: Math.round(cashAfterUserDecisions + Math.round((todaysRandoms.cashNet || 0) * __intensityMultiplierForDay(today, meta))),
        profitLossEUR: Math.round(
          state.kpi.profitLossEUR + 
          (combinedDeltas.profitLossEUR || 0) + 
          Math.round((todaysRandoms.plNet || 0) * __intensityMultiplierForDay(today, meta))
        ),
        customerLoyalty: clamp01to100(state.kpi.customerLoyalty + (combinedDeltas.customerLoyalty || 0)),
        bankTrust: clamp01to100(state.kpi.bankTrust + (combinedDeltas.bankTrust || 0)),
        workforceEngagement: clamp01to100(state.kpi.workforceEngagement + (combinedDeltas.workforceEngagement || 0)),
        publicPerception: clamp01to100(state.kpi.publicPerception + (combinedDeltas.publicPerception || 0))
      };

      // KPI-Reason-Protokoll
      const reasons: KpiReasonEntry[] = [];

      (Object.keys(userSumScaled) as (keyof KPI)[]).forEach(k => {
        const v = userSumScaled[k];
        if (typeof v === 'number' && v !== 0) {
          reasons.push({ kpi: k, delta: Math.round(v), reason: 'Entscheidungen (heute)', source: 'user' });
        }
      });
      
      (Object.keys(schedSumScaled) as (keyof KPI)[]).forEach(k => {
        const v = schedSumScaled[k];
        if (typeof v === 'number' && v !== 0) {
          reasons.push({ kpi: k, delta: Math.round(v), reason: 'Terminierte Effekte', source: 'scheduled' });
        }
      });
      
      for (const { n, impact } of newsItemsScaled) {
        (Object.keys(impact) as (keyof KPI)[]).forEach(k => {
          const v = impact[k];
          if (typeof v === 'number' && v !== 0) {
            reasons.push({ kpi: k, delta: Math.round(v), reason: `News: ${n.title}`, source: n.id });
          }
        });
      }
      
      const capAdj = Math.round((combinedDeltas.cashEUR ?? 0) - (combinedBeforeCap.cashEUR ?? 0));
      if (capAdj !== 0) {
        reasons.push({ kpi: 'cashEUR', delta: capAdj, reason: 'Cap (Easy) — Tageslimit Netto-Cash', source: 'easy-cap' });
      }
      
      if (todaysRandoms.cashNet) { 
        const __m = __intensityMultiplierForDay(today, meta); 
        reasons.push({ kpi: 'cashEUR', delta: Math.round((todaysRandoms.cashNet||0) * __m), reason: 'Tagesrauschen', source: 'randomDaily' }); 
      }
      if (todaysRandoms.plNet) { 
        const __m = __intensityMultiplierForDay(today, meta); 
        reasons.push({ kpi: 'profitLossEUR', delta: Math.round((todaysRandoms.plNet||0) * __m), reason: 'Tagesrauschen', source: 'randomDaily' }); 
      }

      // Überziehung (nur Easy) vor Invariante
      const bankMechOn = !!globalThis.__featureBankMechanics;
      const overdraftRes = bankMechOn
        ? { kpi: kpiAppliedBase, meta }
        : applyOverdraftIfEasy(diff, kpiAppliedBase, meta, nextDay);
      const overdraftInject = overdraftRes.kpi.cashEUR - kpiAppliedBase.cashEUR;
      meta = overdraftRes.meta;
      let kpiApplied = overdraftRes.kpi;

      if (overdraftInject > 0) {
        reasons.push({ kpi: 'cashEUR', delta: Math.round(overdraftInject), reason: 'Überziehungslinie (Easy)', source: 'overdraft' });
      }

      /* --- Bank-Mechanik (optional) --- */
      try {
        const extState = state as ExtendedGameState;
        const bankOn = !!globalThis.__featureBankMechanics;
        let creditLine = Number(extState.creditLineEUR ?? globalThis.__bankSettings?.creditLineEUR ?? 0) || 0;
        let ratePct = Number(extState.interestRatePct ?? globalThis.__bankSettings?.interestRatePct ?? 0) || 0;
        let usedCredit = Number(extState.usedCreditEUR ?? 0) || 0;
        
        if (bankOn && creditLine > 0) {
          // 1. Automatische Tilgung
          if (kpiApplied.cashEUR > 0 && usedCredit > 0) {
            const repayAmount = Math.min(kpiApplied.cashEUR, usedCredit);
            usedCredit = Math.round(usedCredit - repayAmount);
            kpiApplied.cashEUR = Math.round(kpiApplied.cashEUR - repayAmount);
            reasons.push({ kpi: 'cashEUR', delta: -repayAmount, reason: 'Automatische Kredit-Tilgung', source: 'bank-repay' });
          }
          
          // 2. Tägliche Zinsen
          if (usedCredit > 0) {
            const dailyRate = Math.max(0, ratePct) / 100 / 365;
            const interest = Math.round(usedCredit * dailyRate);
            if (interest > 0) {
              kpiApplied.profitLossEUR = Math.round(kpiApplied.profitLossEUR - interest);
              reasons.push({ kpi: 'profitLossEUR', delta: -interest, reason: `Kreditzinsen (${ratePct}% p.a.)`, source: 'bank-interest' });
            }
          }
          
          // 3. Automatische Kreditziehung
          if (kpiApplied.cashEUR < 0) {
            const need = -kpiApplied.cashEUR;
            const available = Math.max(0, creditLine - usedCredit);
            const draw = Math.min(need, available);
            
            if (draw > 0) {
              usedCredit = Math.round(usedCredit + draw);
              kpiApplied.cashEUR = Math.round(kpiApplied.cashEUR + draw);
              reasons.push({ kpi: 'cashEUR', delta: draw, reason: 'Automatische Kreditinanspruchnahme', source: 'bank-draw-auto' });
            }
          }
          
          // 4. Pending Draw
          let __pendingDraw = 0;
          try {
            const gpd = globalThis.__bankPendingDrawEUR;
            if (typeof gpd === 'number' && isFinite(gpd) && gpd > 0) __pendingDraw = gpd;
            else {
              const raw = safeLocalStorageGet('bank:pendingDraw', {
                component: 'reducers',
                action: 'read-pending-draw',
              });
              if (raw != null) {
                const n = Number(raw);
                if (Number.isFinite(n) && n > 0) __pendingDraw = n;
              }
            }
          } catch (e) {
            errorHandler.debug('Failed to read pending draw', e, {
              category: 'STORAGE',
              component: 'reducers',
              action: 'read-pending-draw-catch',
            });
          }
          
          const availableAfter = Math.max(0, creditLine - usedCredit);
          __pendingDraw = Math.max(0, Math.min(__pendingDraw, availableAfter));
          
          meta.bank = meta.bank || {};
          meta.bank.pendingDrawEUR = __pendingDraw;
          meta.bank.effectiveCashForInsolv = Math.round(kpiApplied.cashEUR + __pendingDraw);
          meta.bank.usedCreditEUR = usedCredit;
          meta.bank.creditLineEUR = creditLine;
          meta.bank.interestRatePct = ratePct;
          meta.bank.availableCredit = Math.max(0, creditLine - usedCredit);
          
          globalThis.__usedCreditEUR = usedCredit;
          
        } else {
          meta.bank = meta.bank || {};
          meta.bank.effectiveCashForInsolv = kpiApplied.cashEUR;
        }
      } catch (err) {
        errorHandler.error('Error in bank mechanics', err, {
          category: 'UNEXPECTED',
          component: 'reducers',
          action: 'bank-mechanics',
        });
        meta.bank = meta.bank || {};
        meta.bank.effectiveCashForInsolv = kpiApplied.cashEUR;
      }

      // Invariante
      const beforeBT = kpiApplied.bankTrust;
      const __inv_ADV = enforceInvariants(kpiApplied, state as ExtendedGameState, { trigger: 'ADVANCE_DAY' });
      const kpiFinal: KPI = __inv_ADV.kpi;
      if (kpiFinal.bankTrust < beforeBT) {
        const d = kpiFinal.bankTrust - beforeBT;
        reasons.push({ kpi: 'bankTrust', delta: d, reason: 'Negativ-Liquidität → Bankvertrauen = 0', source: 'invariant' });
      }

      // Cleanup
      if (scheduledForToday.length) {
        delete sched[today];
      }

      // Insolvenzprüfung (regelbasiert)
      let isOver = state.isOver;
      let insolvency = state.insolvency;
      
      try {
        const rules = globalThis.__insolvencyRules || {};
        const modeRB = getInsolvencyMode();
        if (modeRB !== 'off' && rules && typeof rules === 'object') {
          const effectiveCash = meta?.bank?.effectiveCashForInsolv ?? kpiFinal.cashEUR;
          const causes: string[] = [];
          
          for (const key of Object.keys(rules)) {
            const r = rules[key];
            if (!r || r.enabled !== true) continue;
            const thr = Number(r.threshold);
            if (!Number.isFinite(thr)) continue;
            
            let value: number | undefined = undefined;
            const extState = state as ExtendedGameState;
            switch (String(r.key || key)) {
              case 'cashEUR':            value = Number(effectiveCash); break;
              case 'profitLossEUR':      value = Number(kpiFinal.profitLossEUR); break;
              case 'customerLoyalty':    value = Number(kpiFinal.customerLoyalty); break;
              case 'bankTrust':          value = Number(kpiFinal.bankTrust); break;
              case 'workforceEngagement':value = Number(kpiFinal.workforceEngagement); break;
              case 'publicPerception':   value = Number(kpiFinal.publicPerception); break;
              case 'debt':               value = Number(extState.usedCreditEUR ?? meta?.bank?.usedCreditEUR); break;
              case 'receivables':        value = Number((extState as unknown as Record<string, unknown>).receivables ?? (extState as unknown as Record<string, unknown>).arEUR); break;
              default: value = undefined;
            }
            
            if (typeof value === 'number' && Number.isFinite(value)) {
              if (value < thr) causes.push(String(r.key || key));
            }
          }
          
          if (!isOver && causes.length > 0) {
            const causeLabel: InsolvencyCause = causes.includes('cashEUR') ? 'NEGATIVE_CASH' : 'OTHER';
            const resRB = applyInsolvencyPolicy(modeRB, causeLabel, nextDay, kpiFinal.cashEUR, meta);
            isOver = resRB.isOver;
            insolvency = resRB.insolvency;
            meta = resRB.meta;
            meta.insolvencyTriggeredByRules = causes;
          }
        }
      } catch (e) {
        errorHandler.error('Error in rule-based insolvency check', e, {
          category: 'UNEXPECTED',
          component: 'reducers',
          action: 'insolvency-rules',
        });
      }

      // Insolvenzprüfung mit Streak
      const mode = getInsolvencyMode();
      meta.negCashStreak = kpiFinal.cashEUR < 0 ? Math.round(meta.negCashStreak || 0) + 1 : 0;

      if (!isOver && shouldTriggerInsolvencyNow(getDifficulty(), mode, meta?.bank?.effectiveCashForInsolv ?? kpiFinal.cashEUR, meta.negCashStreak)) {
        const res = applyInsolvencyPolicy(mode, 'NEGATIVE_CASH', nextDay, kpiFinal.cashEUR, meta);
        isOver = res.isOver;
        insolvency = res.insolvency;
        meta = res.meta;
      }

      // News für nächsten Tag
      const newsEnabled = !!globalThis.__randomNews;
      meta.randomNews = meta.randomNews || {};
      meta.playedNewsIds = Array.isArray(meta.playedNewsIds) ? meta.playedNewsIds : [];
      
      if (newsEnabled) {
        const __mNews = __intensityMultiplierForDay(nextDay, meta);
        const newsIntensity = __mapMultiplierToNewsIntensity(__mNews);
        const alreadyPlayed: string[] = meta.playedNewsIds;
        const gen = generateRandomNewsForDay(state, {
          enabled: true,
          intensity: newsIntensity,
          difficulty: getDifficulty(),
          day: nextDay,
          alreadyPlayed
        });
        
        const daySet = new Set<string>();
        const items: NewsItem[] = [];
        const perDayCap = (diff === 'hard') ? 6 : (diff === 'normal') ? 4 : 2;

        for (const n of gen) {
          if (items.length >= perDayCap) break;
          if (daySet.has(n.title)) continue;
          daySet.add(n.title);
          items.push(n);
        }
        
        meta.randomNews[nextDay] = items;
        meta.playedNewsIds = Array.from(new Set([...alreadyPlayed, ...items.map(n => n.title)]));
      } else {
        meta.randomNews[nextDay] = [];
      }

      // KPI-Reasons ablegen
      meta.kpiReasons = meta.kpiReasons || {};
      meta.kpiReasons[nextDay] = reasons;

      // Spielende durch Tageslimit
      if (!isOver && nextDay > 14) {
        isOver = true;
      }
      
      const next: ExtendedGameState = {
        ...state,
        engineMeta: meta,
        kpiHistory: hist,
        kpi: kpiFinal,
        pendingDeltas: [],
        day: isOver ? state.day : nextDay,
        isOver,
        insolvency,
        creditLineEUR: meta.bank?.creditLineEUR ?? (state as ExtendedGameState).creditLineEUR,
        interestRatePct: meta.bank?.interestRatePct ?? (state as ExtendedGameState).interestRatePct,
        usedCreditEUR: meta.bank?.usedCreditEUR ?? (state as ExtendedGameState).usedCreditEUR,
      };

      // Pending Draw materialisieren
      try {
        const pend = Math.max(0, Math.round(meta.bank?.pendingDrawEUR ?? 0));
        if (pend > 0) {
          next.usedCreditEUR = Math.round((next.usedCreditEUR || 0) + pend);
          globalThis.__usedCreditEUR = next.usedCreditEUR;

          safeLocalStorageRemove('bank:pendingDraw', {
            component: 'reducers',
            action: 'clear-pending-draw',
          });
          try {
            globalThis.__bankPendingDrawEUR = 0;
          } catch (e) {
            errorHandler.debug('Failed to reset pending draw global', e, {
              category: 'UNEXPECTED',
              component: 'reducers',
              action: 'reset-pending-draw-global',
            });
          }
        }
      } catch (e) {
        errorHandler.warn('Failed to materialize pending bank draw', e, {
          category: 'UNEXPECTED',
          component: 'reducers',
          action: 'materialize-bank-draw',
        });
      }

      safeDispatchEvent(new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } }), {
        component: 'reducers',
        action: 'hud-kpi-day-advance',
      });
      safeDispatchEvent(new CustomEvent('engine:day-advanced', { detail: { day: next.day } }), {
        component: 'reducers',
        action: 'day-advanced',
      });

      return next;
    }

    case 'DECLARE_INSOLVENCY': {
      const meta: EngineMeta = { ...(state.engineMeta ?? {}) };
      meta.userDeclaredInsolvency = true;
      meta.userDeclaredCause = action.cause ?? 'EXTERNAL';
      const next: GameState = { ...state, engineMeta: meta, isOver: true, insolvency: true };
      safeDispatchEvent(new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } }), {
        component: 'reducers',
        action: 'hud-kpi-insolvency-declared',
      });
      return next;
    }

    case 'ADMIN_SET_KPI': {
      const newKpi = { ...(state.kpi ?? emptyKpi()), ...(action.kpi ?? {}) } as KPI;
      const { kpi } = enforceInvariants(newKpi, state as ExtendedGameState, { trigger: 'ADMIN_KPI_SET' });
      const next = { ...state, kpi };
      safeDispatchEvent(
        new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } }),
        { component: 'reducers', action: 'admin-set-kpi' }
      );
      return next;
    }

    case 'ADMIN_ADD_KPI': {
      const newKpi = mergeDelta(state.kpi ?? emptyKpi(), action.delta);
      const { kpi } = enforceInvariants(newKpi, state as ExtendedGameState, { trigger: 'ADMIN_KPI_SET' });
      const next = { ...state, kpi };
      safeDispatchEvent(
        new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } }),
        { component: 'reducers', action: 'admin-add-kpi' }
      );
      return next;
    }

    case 'BANK_DRAW_NOW': {
      try {
        const extState = state as ExtendedGameState;
        const bankOn = !!globalThis.__featureBankMechanics;
        if (!bankOn) return state;
        
        const creditLine = Number(extState.creditLineEUR ?? globalThis.__bankSettings?.creditLineEUR ?? 0) || 0;
        const ratePct = Number(extState.interestRatePct ?? globalThis.__bankSettings?.interestRatePct ?? 0) || 0;
        let usedCredit = Number(extState.usedCreditEUR ?? 0) || 0;
        const available = Math.max(0, creditLine - usedCredit);
        const rawAmt = Math.round(Number(action.amount) || 0);
        const amt = Math.max(0, Math.min(rawAmt, available));
        
        if (amt <= 0) return state;

        const kpi0 = state.kpi ?? ({} as KPI);
        const kpi1: KPI = {
          ...kpi0,
          cashEUR: Math.round((kpi0.cashEUR ?? 0) + amt),
        };

        usedCredit = Math.round(usedCredit + amt);

        const meta: EngineMeta = { ...(state.engineMeta ?? {}) };
        meta.bank = { ...(meta.bank ?? {}), lastDrawNow: amt };

        const next: ExtendedGameState = {
          ...state,
          engineMeta: meta,
          kpi: kpi1,
          usedCreditEUR: usedCredit,
        };
        
        globalThis.__usedCreditEUR = usedCredit;

        safeDispatchEvent(new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } }), {
          component: 'reducers',
          action: 'bank-draw-now',
        });

        safeLocalStorageRemove('bank:pendingDraw', {
          component: 'reducers',
          action: 'clear-pending-draw-now',
        });

        try {
          globalThis.__bankPendingDrawEUR = 0;
        } catch (e) {
          errorHandler.debug('Failed to reset pending draw global', e, {
            category: 'UNEXPECTED',
            component: 'reducers',
            action: 'reset-pending-draw-now',
          });
        }

        return next;
      } catch (e) {
        errorHandler.error('Bank draw now failed', e, {
          category: 'UNEXPECTED',
          component: 'reducers',
          action: 'bank-draw-now-error',
        });
        return state;
      }
    }

    default:
      return state;
  }
}

// =============================================================
// What-if Sandbox
export type NextDecisionInput = Partial<KPI> | Pick<DecisionLogEntry, 'kpiDelta'>;

export function simulateNext(
  state: GameState,
  decisions: NextDecisionInput[] = []
): { nextState: GameState; deltaToCurrent: Partial<KPI> } {
  const snapshotStr = JSON.stringify(state);
  const work: GameState = JSON.parse(snapshotStr);

  const addl: Partial<KPI>[] = [];
  for (const d of decisions || []) {
    if (d && typeof d === 'object') {
      const maybe = 'kpiDelta' in d && typeof d.kpiDelta === 'object'
        ? d.kpiDelta
        : d;
      const delta: Partial<KPI> = {};
      if (maybe && typeof maybe === 'object') {
        if (typeof maybe.cashEUR === 'number') delta.cashEUR = Math.round(maybe.cashEUR);
        if (typeof maybe.profitLossEUR === 'number') delta.profitLossEUR = Math.round(maybe.profitLossEUR);
        if (typeof maybe.customerLoyalty === 'number') delta.customerLoyalty = Math.round(maybe.customerLoyalty);
        if (typeof maybe.bankTrust === 'number') delta.bankTrust = Math.round(maybe.bankTrust);
        if (typeof maybe.workforceEngagement === 'number') delta.workforceEngagement = Math.round(maybe.workforceEngagement);
        if (typeof maybe.publicPerception === 'number') delta.publicPerception = Math.round(maybe.publicPerception);
        if (Object.keys(delta).length > 0) addl.push(delta);
      }
    }
  }
  work.pendingDeltas = [ ...work.pendingDeltas || [], ...addl ];

  // Seiteneffekte unterdrücken
  const origDispatch = typeof window !== 'undefined' && window.dispatchEvent ? window.dispatchEvent.bind(window) : null;
  
  const keysToSnapshot = [
    '__difficultyFactor',
    '__usedCreditEUR',
    '__bankPendingDrawEUR',
  ];
  
  const gSnapshot: Record<string, unknown> = {};
  for (const k of keysToSnapshot) {
    gSnapshot[k] = (globalThis as Record<string, unknown>)[k];
  }
  
  let lsKey = 'bank:pendingDraw';
  let lsVal: string | null = null;
  lsVal = safeLocalStorageGet(lsKey, {
    component: 'reducers',
    action: 'simulate-snapshot-storage',
  });

  try {
    if (window && window.dispatchEvent) { 
      (window as unknown as { dispatchEvent: () => boolean }).dispatchEvent = (() => true);
    }
    
    const after = reducer(work, { type: 'ADVANCE_DAY' });
    
    const delta: Partial<KPI> = {
      cashEUR: Math.round((after.kpi?.cashEUR ?? 0) - (state.kpi?.cashEUR ?? 0)),
      profitLossEUR: Math.round((after.kpi?.profitLossEUR ?? 0) - (state.kpi?.profitLossEUR ?? 0)),
      customerLoyalty: Math.round((after.kpi?.customerLoyalty ?? 0) - (state.kpi?.customerLoyalty ?? 0)),
      bankTrust: Math.round((after.kpi?.bankTrust ?? 0) - (state.kpi?.bankTrust ?? 0)),
      workforceEngagement: Math.round((after.kpi?.workforceEngagement ?? 0) - (state.kpi?.workforceEngagement ?? 0)),
      publicPerception: Math.round((after.kpi?.publicPerception ?? 0) - (state.kpi?.publicPerception ?? 0)),
    };
    
    return { nextState: after, deltaToCurrent: delta };
  } finally {
    // Seiteneffekte zurücksetzen
    try {
      if (origDispatch && window) {
        (window as unknown as { dispatchEvent: typeof origDispatch }).dispatchEvent = origDispatch;
      }
    } catch (e) {
      errorHandler.debug('Failed to restore original dispatchEvent', e, {
        category: 'UNEXPECTED',
        component: 'reducers',
        action: 'restore-dispatch',
      });
    }

    for (const k of keysToSnapshot) {
      try {
        (globalThis as Record<string, unknown>)[k] = gSnapshot[k];
      } catch (e) {
        errorHandler.debug(`Failed to restore global ${k}`, e, {
          category: 'UNEXPECTED',
          component: 'reducers',
          action: 'restore-globals',
        });
      }
    }

    if (lsVal == null) {
      safeLocalStorageRemove(lsKey, {
        component: 'reducers',
        action: 'simulate-restore-storage',
      });
    } else {
      safeLocalStorageSet(lsKey, lsVal, {
        component: 'reducers',
        action: 'simulate-restore-storage',
      });
    }
  }
}
