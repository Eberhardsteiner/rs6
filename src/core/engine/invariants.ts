// src/core/engine/invariants.ts
import type { KPI } from '@/core/models/domain';
import type { GameState } from '@/core/engine/gameEngine';

export type RuleTrigger = 'INIT' | 'ADVANCE_DAY' | 'ADMIN_KPI_SET';

type OptionalFlags = {
  // bestehend
  pp_penalty_on_neg_cash?: boolean;
  loyalty_penalty_on_neg_cash?: boolean;
  // neu
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

export interface InvariantsConfig {
  optional?: OptionalFlags;
}

function getConfig(): InvariantsConfig {
  const g = (globalThis as any).__invariants as InvariantsConfig | undefined;
  return g ?? {};
}

function clamp0100(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}

function getDay(state: any): number {
  return Number(
    (state && (state.day ?? state.currentDay ?? state.dayNumber ?? state.dayIndex)) ?? 0
  ) || 0;
}

function isPayrollDelayed(state: any): boolean {
  const s = state || {};
  return !!(
    s?.payroll?.delayed ||
    s?.hr?.payrollDelayed ||
    s?.finance?.payrollDelayed ||
    (typeof s?.finance?.daysPastDuePayroll === 'number' && s.finance.daysPastDuePayroll > 0) ||
    s?.payrollDelayed
  );
}

type Runtime = {
  day0: number;
  lastAppliedDay: Record<string, number>;
  lossStreak: number;
  profitStreak: number;
};

function rt(): Runtime {
  const g = (globalThis as any);
  if (!g.__invariantsRuntime) {
    g.__invariantsRuntime = { day0: -1, lastAppliedDay: {}, lossStreak: 0, profitStreak: 0 } as Runtime;
  }
  return g.__invariantsRuntime as Runtime;
}

function noteApplied(ruleId: string, day: number) {
  rt().lastAppliedDay[ruleId] = day;
}

function wasAppliedToday(ruleId: string, day: number): boolean {
  return rt().lastAppliedDay[ruleId] === day;
}

/**
 * Zentrale Durchsetzung der deterministischen Spiel-Invarianten.
 * - Harte Regeln: immer aktiv
 * - Optionale Regeln: via Admin-Panel (__invariants.optional)
 * - Idempotent pro Tick; optionale Effekte höchstens 1x pro Tag und Regel
 */
export function enforceInvariants(
  inputKpi: KPI,
  state: GameState,
  opts?: { trigger?: RuleTrigger }
): { kpi: KPI; log: Array<{ kpi: keyof KPI; delta: number; reason: string; source?: string }> } {
  const cfg = getConfig();
  const log: Array<{ kpi: keyof KPI; delta: number; reason: string; source?: string }> = [];
  const next: KPI = { ...inputKpi };
  const trigger = opts?.trigger ?? 'ADVANCE_DAY';
  const day = getDay(state as any);

  // ---- Runtime/Streaks pflegen (deterministisch) --------------------------
  if (trigger === 'INIT') {
    const R = rt();
    R.day0 = day;
    R.lossStreak = (next.profitLossEUR ?? 0) < 0 ? 1 : 0;
    R.profitStreak = (next.profitLossEUR ?? 0) > 0 ? 1 : 0;
    R.lastAppliedDay = {};
  } else if (trigger === 'ADVANCE_DAY') {
    const R = rt();
    const pl = Number(next.profitLossEUR ?? 0);
    if (pl < 0) { R.lossStreak = (R.lossStreak || 0) + 1; R.profitStreak = 0; }
    else if (pl > 0) { R.profitStreak = (R.profitStreak || 0) + 1; R.lossStreak = 0; }
    else { R.lossStreak = 0; R.profitStreak = 0; }
  } // ADMIN_KPI_SET: Streaks nicht automatisch verändern

  // ---- HARTE INVARIANTEN ---------------------------------------------------
  // 1) 0..100-Clamp für Score-KPIs
  next.customerLoyalty = clamp0100(next.customerLoyalty);
  next.bankTrust = clamp0100(next.bankTrust);
  next.workforceEngagement = clamp0100(next.workforceEngagement);
  next.publicPerception = clamp0100(next.publicPerception);

  // 2) Bankvertrauen = 0 bei negativem Cash
  if ((next.cashEUR ?? 0) < 0 && next.bankTrust !== 0) {
    const before = next.bankTrust;
    next.bankTrust = 0;
    log.push({ kpi: 'bankTrust', delta: next.bankTrust - before, reason: 'Negativ-Liquidität → Bankvertrauen = 0', source: 'invariant:hard' });
  }

  // ---- OPTIONALE INVARIANTEN -----------------------------------------------
  const apply = (ruleId: string, cond: boolean, applyDelta: () => { k: keyof KPI; delta: number; reason: string } | null) => {
    if (!cond) return;
    if (wasAppliedToday(ruleId, day)) return;
    const res = applyDelta();
    if (res) {
      const before = next[res.k] as unknown as number;
      const after = clamp0100(before + res.delta);
      (next as any)[res.k] = after;
      log.push({ kpi: res.k, delta: after - before, reason: res.reason, source: 'invariant:optional' });
      noteApplied(ruleId, day);
    }
  };

  // A) Bestehende optional: Negativ-Cash → Wahrnehmung -5 / Loyalität -2
  if (cfg.optional?.pp_penalty_on_neg_cash && (next.cashEUR ?? 0) < 0) {
    apply('opt.pp_on_neg_cash', true, () => ({ k: 'publicPerception', delta: -5, reason: 'Zahlungsverzug/negativer Cash → Public Perception -5' }));
  }
  if (cfg.optional?.loyalty_penalty_on_neg_cash && (next.cashEUR ?? 0) < 0) {
    apply('opt.loyalty_on_neg_cash', true, () => ({ k: 'customerLoyalty', delta: -2, reason: 'Zahlungsverzug/negativer Cash → Kundentreue -2' }));
  }

  // B) Neu: Payroll-Verzögerungen → WorkforceEngagement -10
  if (cfg.optional?.payroll_delay_we_minus10) {
    apply('opt.payroll_delay_we_minus10', isPayrollDelayed(state), () => ({ k: 'workforceEngagement', delta: -10, reason: 'Payroll-Verzögerung → Workforce Engagement -10' }));
  }

  const L = rt().lossStreak || 0;
  const P = rt().profitStreak || 0;
  const loss5 = L >= 5;
  const profit5 = P >= 5;

  // C) Neu: 5x Loss in Folge
  if (cfg.optional?.loss5_banktrust_minus8) {
    apply('opt.loss5_bt_-8', loss5, () => ({ k: 'bankTrust', delta: -8, reason: '5 Perioden Loss in Folge → Bank Trust -8' }));
  }
  if (cfg.optional?.loss5_publicperception_minus5) {
    apply('opt.loss5_pp_-5', loss5, () => ({ k: 'publicPerception', delta: -5, reason: '5 Perioden Loss in Folge → Public Perception -5' }));
  }
  if (cfg.optional?.loss5_customerloyalty_minus5) {
    apply('opt.loss5_cl_-5', loss5, () => ({ k: 'customerLoyalty', delta: -5, reason: '5 Perioden Loss in Folge → Kundenzufriedenheit -5' }));
  }

  // D) Neu: BankTrust < 10 → WorkforceEngagement -10 / PublicPerception -10
  const btLt10 = (next.bankTrust ?? 0) < 10;
  if (cfg.optional?.banktrust_lt10_workengagement_minus10) {
    apply('opt.bt_lt10_we_-10', btLt10, () => ({ k: 'workforceEngagement', delta: -10, reason: 'Bank Trust < 10 → Workforce Engagement -10' }));
  }
  if (cfg.optional?.banktrust_lt10_publicperception_minus10) {
    apply('opt.bt_lt10_pp_-10', btLt10, () => ({ k: 'publicPerception', delta: -10, reason: 'Bank Trust < 10 → Public Perception -10' }));
  }

  // E) Neu: 5x Profit in Folge
  if (cfg.optional?.profit5_banktrust_plus8) {
    apply('opt.profit5_bt_+8', profit5, () => ({ k: 'bankTrust', delta: +8, reason: '5 Perioden Profit in Folge → Bank Trust +8' }));
  }
  if (cfg.optional?.profit5_publicperception_plus8) {
    apply('opt.profit5_pp_+8', profit5, () => ({ k: 'publicPerception', delta: +8, reason: '5 Perioden Profit in Folge → Public Perception +8' }));
  }
  if (cfg.optional?.profit5_customerloyalty_plus8) {
    apply('opt.profit5_cl_+8', profit5, () => ({ k: 'customerLoyalty', delta: +8, reason: '5 Perioden Profit in Folge → Kundenzufriedenheit +8' }));
  }

  // F) Neu: BankTrust > 80 → WorkforceEngagement +10 / PublicPerception +80
  const btGt80 = (next.bankTrust ?? 0) > 80;
  if (cfg.optional?.banktrust_gt80_workengagement_plus10) {
    apply('opt.bt_gt80_we_+10', btGt80, () => ({ k: 'workforceEngagement', delta: +10, reason: 'Bank Trust > 80 → Workforce Engagement +10' }));
  }
  if (cfg.optional?.banktrust_gt80_publicperception_plus80) {
    apply('opt.bt_gt80_pp_+80', btGt80, () => ({ k: 'publicPerception', delta: +80, reason: 'Bank Trust > 80 → Public Perception +80' }));
  }

  return { kpi: next, log };
}
