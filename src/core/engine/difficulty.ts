// src/core/engine/difficulty.ts
import type { KPI } from '@/core/models/domain';

export type Diff = 'easy'|'normal'|'hard';
export type InsolvencyMode = 'hard'|'soft'|'off';

export const DifficultyTuning = {
  easy: {
    kpiScale: { pos: 1.15, neg: 0.35 },
    randomAmplitude: 0.5,
    capexDailyCapEUR: 200_000,
    overdraftCreditLineEUR: 250_000,
    negCashConsecutiveDays: 2
  },
  normal: {
    kpiScale: { pos: 1.0,  neg: 1.0 },
    randomAmplitude: 1.0,
    capexDailyCapEUR: Number.POSITIVE_INFINITY,
    overdraftCreditLineEUR: 0,
    negCashConsecutiveDays: 1
  },
  hard: {
    kpiScale: { pos: 0.95, neg: 1.1 },
    randomAmplitude: 1.15,
    capexDailyCapEUR: Number.POSITIVE_INFINITY,
    overdraftCreditLineEUR: 0,
    negCashConsecutiveDays: 1
  }
} as const;

export function getDifficulty(): Diff {
  const d = (globalThis as any).__npcDifficulty as Diff | undefined
          ?? (globalThis as any).__mode as Diff | undefined;
  return d === 'easy' || d === 'hard' ? d : 'normal';
}

export function getMultiplayerDifficulty(): Diff {
  const d = (globalThis as any).__mpDifficulty as Diff | undefined;
  return d === 'easy' || d === 'hard' ? d : 'normal';
}


export function scaleDeltaByDifficulty(delta: Partial<KPI>, diff: Diff): Partial<KPI> {
  if (!delta) return delta;
  const { pos, neg } = DifficultyTuning[diff].kpiScale;
  const out: Partial<KPI> = {};
  (Object.keys(delta) as (keyof KPI)[]).forEach(k => {
    const v = delta[k];
    if (typeof v === 'number' && Number.isFinite(v)) {
      out[k] = Math.round(v >= 0 ? v * pos : v * neg);
    }
  });
  return out;
}

export function capDailyCashOutflow(delta: Partial<KPI>, diff: Diff): Partial<KPI> {
  if (!delta) return delta;
  const cap = DifficultyTuning[diff].capexDailyCapEUR;
  if (!Number.isFinite(cap) || cap === Number.POSITIVE_INFINITY) return delta;
  const cash = Math.round(delta.cashEUR ?? 0);
  if (cash >= 0) return delta;
  const limited = Math.max(cash, -cap);
  return { ...delta, cashEUR: limited };
}

export function scaleRandomByDifficulty<T extends { cashNet:number; plNet:number }>(r: T, diff: Diff): T {
  const f = DifficultyTuning[diff].randomAmplitude;
  return { ...r, cashNet: Math.round(r.cashNet * f), plNet: Math.round(r.plNet * f) };
}

export function shouldTriggerInsolvencyNow(diff: Diff, mode: InsolvencyMode, cashEUR: number, negCashStreak: number): boolean {
  if (mode === 'off') return false;
  const need = DifficultyTuning[diff].negCashConsecutiveDays;
  return cashEUR < 0 && negCashStreak >= need;
}

export function applyOverdraftIfEasy(diff: Diff, kpi: KPI, meta: any, day: number) {
  if (diff !== 'easy') return { kpi, meta };
  const limit = DifficultyTuning.easy.overdraftCreditLineEUR;
  if (kpi.cashEUR < 0 && limit > 0) {
    const inject = Math.min(limit, -kpi.cashEUR);
    const kpi2 = { ...kpi, cashEUR: kpi.cashEUR + inject };
    const m = { ...(meta ?? {}) };
    m.overdraft = m.overdraft || { total: 0, days: [] as number[] };
    m.overdraft.total = Math.round((m.overdraft.total || 0) + inject);
    if (!m.overdraft.days.includes(day)) m.overdraft.days.push(day);
    return { kpi: kpi2, meta: m };
  }
  return { kpi, meta };
}
