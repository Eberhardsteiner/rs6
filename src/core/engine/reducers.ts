// src/core/engine/reducers.ts
import type { KPI, RoleId } from '@/core/models/domain';
import type { GameState } from '@/core/engine/gameEngine';
import type { DecisionLogEntry } from '@/core/models/decisionLog';
import { generateDailyRandomValues } from '@/core/engine/gameEngine';
import { generateRandomNewsForDay, type NewsItem, type NewsIntensity } from "@/core/engine/randomNews";
import { enforceInvariants } from '@/core/engine/invariants';
import { getDifficulty, scaleDeltaByDifficulty, capDailyCashOutflow, scaleRandomByDifficulty, shouldTriggerInsolvencyNow, applyOverdraftIfEasy } from '@/core/engine/difficulty';
import { updateAdaptiveLight } from '@/core/engine/adaptiveLight';


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
function evalConditions(conds: any, state: GameState): boolean {
  if (!conds || typeof conds !== 'object') return true;
  const c = conds as ConditionSetLocal;
  const day = state.day;
  if (typeof c.day === 'number' && day !== c.day) return false;
  if (typeof c.minDay === 'number' && day < c.minDay) return false;
  if (typeof c.maxDay === 'number' && day > c.maxDay) return false;
  if (Array.isArray(c.kpi)) {
    for (const r of c.kpi) {
      const key = r?.key as KpiKeyLocal;
      const v = (state.kpi as any)[key];
      if (!evalKpiRule(Number(v) || 0, r?.op as KpiRuleOpLocal, Number(r?.value) || 0)) return false;
    }
  }
  return true;
}
// -------------------------------------------------------------
// Action-Typen (Top-Level, nicht in Blöcken definieren!)
export type Action =
  | { type: 'INIT'; payload: Partial<GameState> }
  | { type: 'SCENARIO_IMPORT'; mode?: 'merge'|'replace'; compiled: { scheduledDeltas?: Record<number, any[]>; randomNews?: Record<number, any[]>; meta?: any } }
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
  // ---------------------------------------------------------
  // ERGÄNZUNG: Admin-Panel direkte KPI-Steuerung
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
      // Geldwerte runden wir auf ganze EUR, Punkte auf ganze Punkte
      (next as any)[k] = Math.round(((base as any)[k] ?? 0) + v);
    }
  });
  return next;
}

function sumDeltas(deltas: Array<Partial<KPI>>): Partial<KPI> {
  const acc: any = {};
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
function __readEventIntensityByDay(meta?: any): number[] {
  try {
    // 1) aus Global (AdminPanel)
    const arrG = (globalThis as any).__eventIntensityByDay;
    if (Array.isArray(arrG) && arrG.length >= 14) return arrG.map((x: any)=>Number(x)||0).slice(0,14);
  } catch {}
  try {
    // 2) aus EngineMeta (falls Szenario/Init gesetzt)
    const arrM = Array.isArray(meta?.intensityByDay) ? meta.intensityByDay : null;
    if (arrM && arrM.length >= 14) return arrM.map((x: any)=>Number(x)||0).slice(0,14);
  } catch {}
  // 3) Fallback: neutral
  return Array.from({length:14}, ()=>1);
}
function __intensityMultiplierForDay(day: number, meta?: any): number {
  const enabled = !!((globalThis as any).__featureEventIntensity);
  if (!enabled) return 1;
  const arr = __readEventIntensityByDay(meta);
  const idx = Math.max(0, Math.min(13, (Math.floor(day)-1)));
  const raw = Number(arr[idx] ?? 1);
  if (!Number.isFinite(raw)) return 1;
  // Begrenzen: 0..3 (harmlos bis dreifache Wucht)
  return Math.max(0, Math.min(3, raw));
}
function __mapMultiplierToNewsIntensity(m: number): NewsIntensity {
  if (m <= 0.75) return 'low';
  if (m >= 1.5) return 'high';
  return 'normal';
}
function __scaleDelta(d: Partial<KPI>, m: number): Partial<KPI> {
  const out: any = {};
  (Object.keys(d || {}) as (keyof KPI)[]).forEach(k => {
    const v = (d as any)[k];
    if (typeof v === 'number' && Number.isFinite(v)) out[k] = Math.round(v * m);
  });
  return out;
}


// Invariante: Bankvertrauen fällt bei negativer Liquidität sofort auf 0
function enforceBankTrustInvariant(kpi: KPI): KPI {
  if (!kpi) return kpi as any;
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

// Insolvenzeinschätzung
function shouldBeInsolvent(kpi: KPI): boolean {
  const mode = (globalThis as any).__insolvencyMode as ('hard'|'soft'|'off') | undefined;
  if (mode === 'off') return false;
  if (mode === 'hard') return kpi.cashEUR < 0;
  if (mode === 'soft') return kpi.cashEUR < -10000;
  return kpi.cashEUR < 0;
}

type InsolvencyMode = 'hard'|'soft'|'off';
type InsolvencyCause = 'NEGATIVE_CASH'|'PAYROLL_UNPAID'|'EXTERNAL'|'OTHER';

function getInsolvencyMode(): InsolvencyMode {
  const m = (globalThis as any).__insolvencyMode as InsolvencyMode | undefined;
  return (m === 'hard' || m === 'soft' || m === 'off') ? m : 'hard';
}

function applyInsolvencyPolicy(
  mode: InsolvencyMode,
  cause: InsolvencyCause,
  day: number,
  cashEUR: number,
  metaIn: any
): { isOver: boolean; insolvency: boolean; meta: any } {
  const meta = { ...(metaIn ?? {}) };

  if (mode === 'hard') {
    return { isOver: true, insolvency: true, meta };
  }

  if (mode === 'soft') {
    const arr = Array.isArray(meta.insoWarnings) ? meta.insoWarnings : [];
    meta.insoWarnings = [...arr, { day, cause, cashEUR, ts: Date.now() }];
    try { window.dispatchEvent(new CustomEvent('game:insolvency-warning', { detail: { day, cause, cashEUR }})); } catch {}
    return { isOver: false, insolvency: false, meta };
  }

  const sup = Array.isArray(meta.suppressedInsolvencyReasons) ? meta.suppressedInsolvencyReasons : [];
  meta.suppressedInsolvencyReasons = [...sup, { day, cause, cashEUR, ts: Date.now() }];
  meta.suppressedInsolvencyCount = Math.round(meta.suppressedInsolvencyCount || 0) + 1;
  try { window.dispatchEvent(new CustomEvent('game:insolvency-suppressed', { detail: { day, cause, cashEUR }})); } catch {}
  return { isOver: false, insolvency: false, meta };
}

function wouldBeInsolventByCash(mode: InsolvencyMode, cashEUR: number): boolean {
  if (mode === 'off') return false;
  if (mode === 'hard') return cashEUR < 0;
  return cashEUR < -10000;
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
      // Sanftes Mergen; fehlende Strukturen initialisieren
      const next: GameState = {
        ...state,
        ...action.payload,
        kpi: { ...(state.kpi ?? emptyKpi()), ...(action.payload.kpi ?? {}) },
        kpiHistory: action.payload.kpiHistory ?? state.kpiHistory ?? [],
        pendingDeltas: action.payload.pendingDeltas ?? state.pendingDeltas ?? [],
        log: action.payload.log ?? state.log ?? [],
        engineMeta: { ...(state.engineMeta ?? {}), ...(action.payload as any)?.engineMeta }
      };

      // Defaults für optionale Bank-Mechanik übernehmen (idempotent)
      if (typeof (next as any).creditLineEUR !== 'number') (next as any).creditLineEUR = Number(((globalThis as any).__bankSettings?.creditLineEUR) ?? 0);
      if (typeof (next as any).interestRatePct !== 'number') (next as any).interestRatePct = Number(((globalThis as any).__bankSettings?.interestRatePct) ?? 0);
      if (typeof (next as any).usedCreditEUR !== 'number') (next as any).usedCreditEUR = 0;

      // Tageszahl plausibilisieren
      if (typeof (next as any).day !== 'number' || !Number.isFinite((next as any).day)) {
        (next as any).day = 1;
      }
      
      // EngineMeta-Erweiterungen
      (next.engineMeta as any) = next.engineMeta || {};
      (next.engineMeta as any).randomNews = (next.engineMeta as any).randomNews || {};
      (next.engineMeta as any).negCashStreak = Math.max(0, Number((next.engineMeta as any).negCashStreak) || 0);
      (next.engineMeta as any).kpiReasons = (next.engineMeta as any).kpiReasons || {};

      // Scoring-Gewichte einmalig in Meta spiegeln (falls noch leer)
      (next.engineMeta as any).scoringWeights =
        (next.engineMeta as any).scoringWeights
        ?? (globalThis as any).__scoringWeights
        ?? { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 };
      
      // Invariante anwenden
      const __inv_INIT = enforceInvariants(next.kpi as KPI, next as any, { trigger: 'INIT' });
      next.kpi = __inv_INIT.kpi;
      try { window.dispatchEvent(new CustomEvent('hud:kpi', { detail: { day: (next as any).day, kpi: next.kpi } })); } catch {}

      return next;
    }

    
    case 'SCENARIO_IMPORT': {
      const mode = action.mode || 'replace';
      const compiled = action.compiled || {};
      const meta: any = { ...(state.engineMeta || {}) };
      if (mode === 'replace') {
        if (compiled.scheduledDeltas) meta.scheduledDeltas = compiled.scheduledDeltas;
        if (compiled.randomNews) meta.randomNews = compiled.randomNews;
        if (compiled.meta) meta.scenarioMeta = compiled.meta;
      } else { // merge
        const schedOld = (meta.scheduledDeltas = meta.scheduledDeltas || {});
        const schedNew = compiled.scheduledDeltas || {};
        for (const d of Object.keys(schedNew)) {
          const day = Number(d);
          (schedOld[day] = schedOld[day] || []).push(...(schedNew as any)[day]);
        }
        const rnOld = (meta.randomNews = meta.randomNews || {});
        const rnNew = compiled.randomNews || {};
        for (const d of Object.keys(rnNew)) {
          const day = Number(d);
          (rnOld[day] = rnOld[day] || []).push(...(rnNew as any)[day]);
        }
        if (compiled.meta) meta.scenarioMeta = compiled.meta;
      }
      return { ...state, engineMeta: meta };
    }
case 'CHOOSE_OPTION': {
      // Log-Eintrag erzeugen
      const entry: DecisionLogEntry = {
        ts: Date.now(),
        day: action.day,
        role: action.role,
        blockId: action.blockId,
        chosenOptionId: action.optId,
        chosenOptionLabel: action.optLabel,
        kpiDelta: action.kpiDelta
      } as any;

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
        } as any;
        newLog = [...state.log, entry];
      }

      return { ...state, log: newLog };
    }

    case 'SET_USER_NOTES': {
      return { ...state, userNotes: action.notes };
    }

    case 'ADVANCE_DAY': {
      const hist = [...state.kpiHistory, state.kpi];
      let meta: any = { ...(state.engineMeta ?? {}) };

      // Adaptive Difficulty (Light): Faktor aktualisieren und persistent speichern
      try {
        const adaptiveEnabled = (globalThis as any).__adaptiveDifficultyLightEnabled === true;
        meta = updateAdaptiveLight(meta, hist, { enabled: adaptiveEnabled });
        (globalThis as any).__difficultyFactor = meta.difficultyFactor ?? 1.0;
      } catch {}
      
      const sched = (meta.scheduledDeltas = meta.scheduledDeltas || {} as Record<number, Array<Partial<KPI>>>);
      
      const today = state.day;
      const nextDay = today + 1;
      
      // 1. User-Entscheidungen und Scheduled Deltas
      const userDeltas = state.pendingDeltas || [];
      const scheduledForTodayRaw = Array.isArray(sched[today]) ? sched[today] : [];
      const scheduledForToday = scheduledForTodayRaw.flatMap((it: any) => {
        if (it && typeof it === 'object' && 'impact' in it) {
          return evalConditions((it as any).conditions, state) ? [(it as any).impact] : [];
        }
        return [it as any];
      });

      // Difficulty
      const diff = getDifficulty();

      // Heutige Zufalls-News wirken heute
      const newsForTodayAll: NewsItem[] = Array.isArray(meta.randomNews?.[today]) ? meta.randomNews[today] : [];
      const newsForToday: NewsItem[] = newsForTodayAll.filter((n: any) => evalConditions((n as any).conditions, state));
      const newsImpactRaw = newsForToday.length ? sumDeltas(newsForToday.map(n => n.impact ?? {})) : {};

      // >>> Deltas skalieren & Cash-Cap (Easy) — getrennt, um Gründe zu protokollieren
      const userSumRaw = userDeltas.length ? sumDeltas(userDeltas) : {};
      const schedSumRaw = scheduledForToday.length ? sumDeltas(scheduledForToday) : {};

      const userSumScaled = scaleDeltaByDifficulty(userSumRaw, diff);
      const schedSumScaled = scaleDeltaByDifficulty(schedSumRaw, diff);

      const __mToday = __intensityMultiplierForDay(today, meta);
      const newsItemsScaled = newsForToday.map(n => ({ n, impact: __scaleDelta(scaleDeltaByDifficulty(n.impact ?? {}, diff), __mToday) }));
      const newsSumScaled = newsItemsScaled.length ? sumDeltas(newsItemsScaled.map(x => x.impact)) : {};

      const combinedBeforeCap = sumDeltas([userSumScaled, schedSumScaled, newsSumScaled]);
      const combinedDeltas = capDailyCashOutflow(combinedBeforeCap, diff);

      // Zwischen-Cash
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
      meta.dailyRandomValues[nextDay] = __rv as any;
      meta.currentDayRandoms = __rv as any;

      // Randoms vom HEUTIGEN Tag
      const todaysRandoms = meta.dailyRandomValues?.[today] || { cashNet: 0, plNet: 0 };

      // Finale KPIs dieses Tages (vor Overdraft/Invariant)
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

      // >>> KPI-Reason-Protokoll (für nextDay)
      const reasons: KpiReasonEntry[] = [];

      // Gründe: User-Entscheidungen
      (Object.keys(userSumScaled) as (keyof KPI)[]).forEach(k => {
        const v = (userSumScaled as any)[k];
        if (typeof v === 'number' && v !== 0) {
          reasons.push({ kpi: k, delta: Math.round(v), reason: 'Entscheidungen (heute)', source: 'user' });
        }
      });
      // Gründe: Terminierte Effekte
      (Object.keys(schedSumScaled) as (keyof KPI)[]).forEach(k => {
        const v = (schedSumScaled as any)[k];
        if (typeof v === 'number' && v !== 0) {
          reasons.push({ kpi: k, delta: Math.round(v), reason: 'Terminierte Effekte', source: 'scheduled' });
        }
      });
      // Gründe: News (pro Item)
      for (const { n, impact } of newsItemsScaled) {
        (Object.keys(impact) as (keyof KPI)[]).forEach(k => {
          const v = (impact as any)[k];
          if (typeof v === 'number' && v !== 0) {
            reasons.push({ kpi: k, delta: Math.round(v), reason: `News: ${n.title}`, source: n.id });
          }
        });
      }
      // Cap-Reason (wenn Cash begrenzt wurde)
      const capAdj = Math.round((combinedDeltas.cashEUR ?? 0) - (combinedBeforeCap.cashEUR ?? 0));
      if (capAdj !== 0) {
        reasons.push({ kpi: 'cashEUR', delta: capAdj, reason: 'Cap (Easy) — Tageslimit Netto-Cash', source: 'easy-cap' });
      }
      // Tagesrauschen (heute)
      if (todaysRandoms.cashNet) { const __m = __intensityMultiplierForDay(today, meta); reasons.push({ kpi: 'cashEUR', delta: Math.round((todaysRandoms.cashNet||0) * __m), reason: 'Tagesrauschen', source: 'randomDaily' }); }
if (todaysRandoms.plNet) { const __m = __intensityMultiplierForDay(today, meta); reasons.push({ kpi: 'profitLossEUR', delta: Math.round((todaysRandoms.plNet||0) * __m), reason: 'Tagesrauschen', source: 'randomDaily' }); }
// >>> Überziehung (nur Easy) vor Invariante
      const bankMechOn = !!(globalThis as any).__featureBankMechanics;
      const overdraftRes = bankMechOn
        ? { kpi: kpiAppliedBase, meta }
        : applyOverdraftIfEasy(diff, kpiAppliedBase, meta, nextDay);
      const overdraftInject = overdraftRes.kpi.cashEUR - kpiAppliedBase.cashEUR;
      meta = overdraftRes.meta;
      let kpiApplied = overdraftRes.kpi;

      if (overdraftInject > 0) {
        reasons.push({ kpi: 'cashEUR', delta: Math.round(overdraftInject), reason: 'Überziehungslinie (Easy)', source: 'overdraft' });
      }

      /* --- Bank-Mechanik (optional, via Admin-Panel) --- */
      try {
        const bankOn = !!((globalThis as any).__featureBankMechanics);
        let creditLine = Number(((state as any).creditLineEUR ?? (globalThis as any).__bankSettings?.creditLineEUR) ?? 0) || 0;
        let ratePct = Number(((state as any).interestRatePct ?? (globalThis as any).__bankSettings?.interestRatePct) ?? 0) || 0;
        let usedCredit = Number(((state as any).usedCreditEUR) ?? 0) || 0;
        
        if (bankOn && creditLine > 0) {
          // ========= SCHRITT 1: Automatische Tilgung am BEGINN des neuen Tages =========
          // Wenn wir Liquidität haben UND Kredit genutzt wird -> zurückzahlen
          if (kpiApplied.cashEUR > 0 && usedCredit > 0) {
            const repayAmount = Math.min(kpiApplied.cashEUR, usedCredit);
            usedCredit = Math.round(usedCredit - repayAmount);
            kpiApplied.cashEUR = Math.round(kpiApplied.cashEUR - repayAmount);
            
            // Reason protokollieren
            reasons.push({ 
              kpi: 'cashEUR', 
              delta: -repayAmount, 
              reason: 'Automatische Kredit-Tilgung', 
              source: 'bank-repay' 
            });
          }
          
          // ========= SCHRITT 2: Tägliche Zinsen auf VERBLEIBENDE Nutzung =========
          if (usedCredit > 0) {
            const dailyRate = Math.max(0, ratePct) / 100 / 365;
            const interest = Math.round(usedCredit * dailyRate);
            if (interest > 0) {
              kpiApplied.profitLossEUR = Math.round(kpiApplied.profitLossEUR - interest);
              
              // Reason protokollieren
              reasons.push({ 
                kpi: 'profitLossEUR', 
                delta: -interest, 
                reason: `Kreditzinsen (${ratePct}% p.a.)`, 
                source: 'bank-interest' 
              });
            }
          }
          
          // ========= SCHRITT 3: Automatische Kreditziehung bei negativem Cash =========
          if (kpiApplied.cashEUR < 0) {
            const need = -kpiApplied.cashEUR;
            const available = Math.max(0, creditLine - usedCredit);
            const draw = Math.min(need, available);
            
            if (draw > 0) {
              usedCredit = Math.round(usedCredit + draw);
              kpiApplied.cashEUR = Math.round(kpiApplied.cashEUR + draw);
              
              // Reason protokollieren
              reasons.push({ 
                kpi: 'cashEUR', 
                delta: draw, 
                reason: 'Automatische Kreditinanspruchnahme', 
                source: 'bank-draw-auto' 
              });
            }
          }
          
          // ========= SCHRITT 4: Manuelle Inanspruchnahme (Pending Draw) =========
          let __pendingDraw = 0;
          try {
            const gpd = (globalThis as any).__bankPendingDrawEUR;
            if (typeof gpd === 'number' && isFinite(gpd) && gpd > 0) __pendingDraw = gpd;
            else {
              const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem('bank:pendingDraw') : null;
              if (raw != null) {
                const n = Number(raw);
                if (Number.isFinite(n) && n > 0) __pendingDraw = n;
              }
            }
          } catch {}
          
          // Clamp an verfügbaren Spielraum
          const availableAfter = Math.max(0, creditLine - usedCredit);
          __pendingDraw = Math.max(0, Math.min(__pendingDraw, availableAfter));
          
          // Für die Insolvenzprüfung heute berücksichtigen
          (meta.bank = meta.bank || {}).pendingDrawEUR = __pendingDraw;
          (meta.bank = meta.bank || {}).effectiveCashForInsolv = Math.round(kpiApplied.cashEUR + __pendingDraw);
          
          // ========= SCHRITT 5: State aktualisieren =========
          (meta.bank = meta.bank || {}).usedCreditEUR = usedCredit;
          (meta.bank = meta.bank || {}).creditLineEUR = creditLine;
          (meta.bank = meta.bank || {}).interestRatePct = ratePct;
          (meta.bank = meta.bank || {}).availableCredit = Math.max(0, creditLine - usedCredit);
          
          // Globale Variablen für UI-Komponenten aktualisieren
          (globalThis as any).__usedCreditEUR = usedCredit;
          
        } else {
          // Bank-Mechanik deaktiviert
          (meta.bank = meta.bank || {}).effectiveCashForInsolv = kpiApplied.cashEUR;
        }
      } catch (err) {
        console.error('Error in bank mechanics:', err);
        (meta.bank = meta.bank || {}).effectiveCashForInsolv = kpiApplied.cashEUR;
      }
      /* --- /Bank-Mechanik --- */

      // Invariante
      const beforeBT = kpiApplied.bankTrust;
      const __inv_ADV = enforceInvariants(kpiApplied, state as any, { trigger: 'ADVANCE_DAY' });
      const kpiFinal: KPI = __inv_ADV.kpi;
      if (kpiFinal.bankTrust < beforeBT) {
        const d = kpiFinal.bankTrust - beforeBT;
        reasons.push({ kpi: 'bankTrust', delta: d, reason: 'Negativ-Liquidität → Bankvertrauen = 0', source: 'invariant' });
      }

      // Cleanup
      if (scheduledForToday.length) {
        delete sched[today];
      }

      
      // Insolvenzprüfung (Regelbasiert aus Admin‑Konsole)
      try {
        const rules = (globalThis as any).__insolvencyRules || {};
        const modeRB = getInsolvencyMode();
        if (modeRB !== 'off' && rules && typeof rules === 'object') {
          const effectiveCash = (meta?.bank?.effectiveCashForInsolv ?? kpiFinal.cashEUR);
          const causes: string[] = [];
          for (const key of Object.keys(rules)) {
            const r = (rules as any)[key];
            if (!r || r.enabled !== true) continue;
            const thr = Number(r.threshold);
            if (!Number.isFinite(thr)) continue;
            let value: number | undefined = undefined;
            switch (String(r.key || key)) {
              case 'cashEUR':            value = Number(effectiveCash); break;
              case 'profitLossEUR':      value = Number(kpiFinal.profitLossEUR); break;
              case 'customerLoyalty':    value = Number(kpiFinal.customerLoyalty); break;
              case 'bankTrust':          value = Number(kpiFinal.bankTrust); break;
              case 'workforceEngagement':value = Number(kpiFinal.workforceEngagement); break;
              case 'publicPerception':   value = Number(kpiFinal.publicPerception); break;
              case 'debt':               value = Number(((state as any).usedCreditEUR ?? meta?.bank?.usedCreditEUR)); break;
              case 'receivables':        value = Number((state as any).receivables ?? (state as any).arEUR); break;
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
            try { (meta as any).insolvencyTriggeredByRules = causes; } catch {}
          }
        }
      } catch {}
// Insolvenzprüfung mit Streak
      let isOver = state.isOver;
      let insolvency = state.insolvency;
      const mode = getInsolvencyMode();

      meta.negCashStreak = kpiFinal.cashEUR < 0 ? Math.round(meta.negCashStreak || 0) + 1 : 0;

      if (!isOver && shouldTriggerInsolvencyNow(getDifficulty(), mode, ((meta as any).bank?.effectiveCashForInsolv ?? kpiFinal.cashEUR), meta.negCashStreak)) {
        const res = applyInsolvencyPolicy(mode, 'NEGATIVE_CASH', nextDay, kpiFinal.cashEUR, meta);
        isOver = res.isOver;
        insolvency = res.insolvency;
        meta = res.meta;
      }

      // News für nächsten Tag
      const newsEnabled = !!(globalThis as any).__randomNews;
      meta.randomNews = meta.randomNews || {};
      meta.playedNewsIds = Array.isArray(meta.playedNewsIds) ? meta.playedNewsIds : [];
      if (newsEnabled) {
        const __mNews = __intensityMultiplierForDay(nextDay, meta);
        const newsIntensity = (__mapMultiplierToNewsIntensity(__mNews));
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

        // Obergrenze je Schwierigkeit: easy 2, normal 4, hard 6
        const perDayCap = (diff === 'hard') ? 6 : (diff === 'normal') ? 4 : 2;

        for (const n of gen) {
          if (items.length >= perDayCap) break;   // ← statt: >= 2
          if (daySet.has(n.title)) continue;

        }
        meta.randomNews[nextDay] = items;
        meta.playedNewsIds = Array.from(new Set([...alreadyPlayed, ...items.map(n => n.title)]));
      } else {
        meta.randomNews[nextDay] = [];
      }

      // >>> KPI-Reasons ablegen (für nextDay)
      meta.kpiReasons = meta.kpiReasons || {};
      meta.kpiReasons[nextDay] = reasons;

      // Spielende durch Tageslimit
      if (!isOver && nextDay > 14) {
        isOver = true;
      }
      
      const next: GameState = {
        ...state,
        engineMeta: meta,
        kpiHistory: hist,
        kpi: kpiFinal,
        pendingDeltas: [],
        day: isOver ? state.day : nextDay,
        isOver,
        insolvency,
        // Bank-Werte aus Meta übernehmen für Persistierung
        creditLineEUR: meta.bank?.creditLineEUR ?? (state as any).creditLineEUR,
        interestRatePct: meta.bank?.interestRatePct ?? (state as any).interestRatePct,
        usedCreditEUR: meta.bank?.usedCreditEUR ?? (state as any).usedCreditEUR,
      } as any;

      // ---- Pending Draw NACH State-Erstellung materialisieren ----
      try {
        const pend = Math.max(0, Math.round((meta.bank?.pendingDrawEUR ?? 0)));
        if (pend > 0) {
          // Pending Draw wird für den NÄCHSTEN Tag vorbereitet
          next.usedCreditEUR = Math.round((next.usedCreditEUR || 0) + pend);
          (globalThis as any).__usedCreditEUR = next.usedCreditEUR;
          
          // Pending löschen
          try { if (typeof localStorage !== 'undefined') localStorage.removeItem('bank:pendingDraw'); } catch {}
          try { (globalThis as any).__bankPendingDrawEUR = 0; } catch {}
        }
      } catch {}

      try { window.dispatchEvent(new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } })); } catch {}
      try { window.dispatchEvent(new CustomEvent('engine:day-advanced', { detail: { day: next.day } })); } catch {}

      return next;
    }

    case 'DECLARE_INSOLVENCY': {
      const meta = { ...(state.engineMeta ?? {}) } as any;
      meta.userDeclaredInsolvency = true;
      meta.userDeclaredCause = (action as any).cause ?? 'EXTERNAL';
      const next: GameState = { ...state, engineMeta: meta, isOver: true, insolvency: true };
      try { window.dispatchEvent(new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } })); } catch {}
      return next;
    }

    // ---------------------------------------------------------
    // ERGÄNZUNG: Admin-Panel direkte KPI-Steuerung
    case 'ADMIN_SET_KPI': {
      const newKpi = { ...(state.kpi ?? emptyKpi()), ...(action.kpi ?? {}) } as KPI;
      const { kpi } = enforceInvariants(newKpi, state as any, { trigger: 'ADMIN_KPI_SET' });
      const next = { ...state, kpi };
      try {
        window.dispatchEvent(
          new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } })
        );
      } catch {}
      return next;
    }

    case 'ADMIN_ADD_KPI': {
      const newKpi = mergeDelta(state.kpi ?? emptyKpi(), action.delta);
      const { kpi } = enforceInvariants(newKpi, state as any, { trigger: 'ADMIN_KPI_SET' });
      const next = { ...state, kpi };
      try {
        window.dispatchEvent(
          new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } })
        );
      } catch {}
      return next;
    }

    case 'BANK_DRAW_NOW': {
      try {
        const bankOn = !!((globalThis as any).__featureBankMechanics);
        if (!bankOn) return state;
        
        const creditLine = Number(((state as any).creditLineEUR ?? (globalThis as any).__bankSettings?.creditLineEUR) ?? 0) || 0;
        const ratePct = Number(((state as any).interestRatePct ?? (globalThis as any).__bankSettings?.interestRatePct) ?? 0) || 0;
        let usedCredit = Number(((state as any).usedCreditEUR) ?? 0) || 0;
        const available = Math.max(0, creditLine - usedCredit);
        const rawAmt = Math.round(Number((action as any).amount) || 0);
        const amt = Math.max(0, Math.min(rawAmt, available));
        
        if (amt <= 0) return state;

        const kpi0 = state.kpi ?? ({} as any);
        const kpi1: KPI = {
          ...kpi0,
          cashEUR: Math.round((kpi0.cashEUR ?? 0) + amt),
        };

        usedCredit = Math.round(usedCredit + amt);

        const meta = { ...(state.engineMeta ?? {}) } as any;
        meta.bank = { ...(meta.bank ?? {}), lastDrawNow: amt };

        const next: GameState = {
          ...state,
          engineMeta: meta,
          kpi: kpi1,
          usedCreditEUR: usedCredit as any,
        } as any;
        
        (globalThis as any).__usedCreditEUR = usedCredit;
        
        try { window.dispatchEvent(new CustomEvent('hud:kpi', { detail: { day: next.day, kpi: next.kpi } })); } catch {}
        
        // pendingDraw zurücksetzen
        try { if (typeof localStorage !== 'undefined') localStorage.removeItem('bank:pendingDraw'); } catch {}
        try { (globalThis as any).__bankPendingDrawEUR = 0; } catch {}
        
        return next;
      } catch {
        return state;
      }
    }

    default:
      return state;
  }
}

// =============================================================
// What-if Sandbox: reine Simulationsfunktion (kein Persist / keine Writes)
// Simuliert den nächsten Tag mit zusätzlich angegebenen Entscheidungen
// und gibt das hypothetische Ergebnis sowie die KPI-Deltas zurück.
export type NextDecisionInput = Partial<KPI> | Pick<DecisionLogEntry, 'kpiDelta'>;

export function simulateNext(
  state: GameState,
  decisions: NextDecisionInput[] = []
): { nextState: GameState; deltaToCurrent: Partial<KPI> } {
  // 1) Deep-Copy des States (keine Mutation des Originals)
  const snapshotStr = JSON.stringify(state);
  const work: GameState = JSON.parse(snapshotStr);

  // 2) Pending-Deltas vorbereiten (User hat u.U. bereits pendingDeltas)
  const addl: Partial<KPI>[] = [];
  for (const d of decisions || []) {
    if (d && typeof d === 'object') {
      const maybe = (d as any).kpiDelta && typeof (d as any).kpiDelta === 'object'
        ? (d as any).kpiDelta
        : d;
      const delta: any = {};
      if (maybe && typeof maybe === 'object') {
        if (typeof maybe.cashEUR === 'number') delta.cashEUR = Math.round(maybe.cashEUR);
        if (typeof maybe.profitLossEUR === 'number') delta.profitLossEUR = Math.round(maybe.profitLossEUR);
        if (typeof maybe.customerLoyalty === 'number') delta.customerLoyalty = Math.round(maybe.customerLoyalty);
        if (typeof maybe.bankTrust === 'number') delta.bankTrust = Math.round(maybe.bankTrust);
        if (typeof maybe.workforceEngagement === 'number') delta.workforceEngagement = Math.round(maybe.workforceEngagement);
        if (typeof maybe.publicPerception === 'number') delta.publicPerception = Math.round(maybe.publicPerception);
        if (Object.keys(delta).length > 0) addl.push(delta as Partial<KPI>);
      }
    }
  }
  (work as any).pendingDeltas = [ ...(work as any).pendingDeltas || [], ...addl ];

  // 3) Seiteneffekte unterdrücken: Events + bank:pendingDraw + ausgewählte Global-Keys
  const g: any = (globalThis as any);
  const w: any = (typeof window !== 'undefined') ? window : g;
  const origDispatch = w && w.dispatchEvent ? w.dispatchEvent.bind(w) : null;
  const keysToSnapshot = [
    '__difficultyFactor',
    '__usedCreditEUR',
    '__bankPendingDrawEUR',
  ];
  const gSnapshot: Record<string, any> = {};
  for (const k of keysToSnapshot) {
    gSnapshot[k] = g[k];
  }
  let lsKey = 'bank:pendingDraw';
  let lsVal: string | null = null;
  try {
    if (typeof localStorage !== 'undefined') {
      lsVal = localStorage.getItem(lsKey);
    }
  } catch {}

  try {
    if (w && w.dispatchEvent) { (w as any).dispatchEvent = (() => true) as any; }
    const after = reducer(work, { type: 'ADVANCE_DAY' } as any);
    // 4) KPI-Delta berechnen
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
    // 5) Seiteneffekte zurücksetzen
    try { if (origDispatch && w) (w as any).dispatchEvent = origDispatch; } catch {}
    for (const k of keysToSnapshot) {
      try { g[k] = gSnapshot[k]; } catch {}
    }
    try {
      if (typeof localStorage !== 'undefined') {
        if (lsVal == null) localStorage.removeItem(lsKey);
        else localStorage.setItem(lsKey, lsVal);
      }
    } catch {}
  }
}
