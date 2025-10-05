// src/core/engine/scoring/scoreExtras.ts
import type { GameState } from '../gameEngine';
import type { KPI } from '@/core/models/domain';
import type { Adjustments } from './scoreAdjustments';
import { isPerceivedInsolvent } from '../ending_extras';

type Series = number[];

function num(x: any, d = 0): number {
  const v = Number(x);
  return Number.isFinite(v) ? v : d;
}

function nz01(x: any): number {
  const v = num(x, 0);
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

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

    for (const p of ['values', 'series', 'data', 'cashByDay', 'cashEURByDay', 'liquidityByDay', 'profitByDay', 'profitLossByDay', 'plByDay']) {
      const arr = node?.[p];
      if (Array.isArray(arr)) {
        const vals = arr.map((x: any) => Number(x)).filter((v: any) => Number.isFinite(v));
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

  let best: number[] = [];
  for (const s of cands) if (s.length > best.length) best = s;
  return best;
}

export function detectInsolvencyAny(state: GameState): boolean {
  const k = (state as any).kpi ?? {};
  const meta: any = (state as any).engineMeta ?? {};
  const currentInsolvencyMode = (globalThis as any).__insolvencyMode as ('hard' | 'soft' | 'off' | undefined) ?? 'hard';
  const perceived = isPerceivedInsolvent(k, currentInsolvencyMode);
  const ended = !!(state as any).insolvency;
  const hadDays = Array.isArray(meta.insolvencyDays) && meta.insolvencyDays.length > 0;
  const warned = Array.isArray(meta.insoWarnings) && meta.insoWarnings.length > 0;
  const suppressed = !!(meta.suppressedInsolvencyCount > 0 || (Array.isArray(meta.suppressedInsolvencyReasons) && meta.suppressedInsolvencyReasons.length > 0));
  return !!(ended || perceived || hadDays || warned || suppressed);
}

export function computeExtras(state: GameState): Adjustments {
  const k = (state as any).kpi ?? {};
  const meta: any = (state as any).engineMeta ?? {};

  const cashSeries: number[] = readSeries(meta, ['cashEUR', 'cash', 'liquidity']);
  const profitSeries: number[] = readSeries(meta, ['profitLossEUR', 'profit', 'pl']);

  const cashEnd = num(k.cashEUR ?? (k.cash as any) ?? (k.liquidity as any), 0);
  const profitEnd = num(k.profitLossEUR ?? (k.profit as any) ?? (k.pl as any), 0);
  const customerLoyalty = nz01(k.customerLoyalty);
  const publicPerception = nz01(k.publicPerception);

  let bonus = 0;
  let malus = 0;
  const achievements: string[] = [];
  const penalties: string[] = [];

  if (cashSeries.length > 0) {
    const minCash = Math.min(...cashSeries.map((v) => num(v, 0)));
    if (minCash > 0) {
      bonus += 4;
      achievements.push('Liquidität im ganzen Spiel > 0');
    }
    if (minCash > 50000) {
      bonus += 5;
      achievements.push('Liquidität im ganzen Spiel > 50.000');
    }
  }

  if (profitSeries.length > 0) {
    const allProfitPos = profitSeries.every((v) => num(v, 0) > 0);
    if (allProfitPos) {
      bonus += 4;
      achievements.push('Gewinn im ganzen Spiel > 0');
    }
    if (profitSeries.length >= 2) {
      const fromDay2 = profitSeries.slice(1).every((v) => num(v, 0) > 50000);
      if (fromDay2) {
        bonus += 5;
        achievements.push('Gewinn ab Tag 2 immer > 50.000');
      }
    }
  }

  if (cashEnd > 100000) {
    bonus += 2;
    achievements.push('Liquidität am Ende > 100.000');
  }
  if (profitEnd > 500000) {
    bonus += 2;
    achievements.push('Gewinn am Ende > 500.000');
  }

  if (cashEnd < 50000) {
    malus += 2;
    penalties.push('Liquidität am Ende < 50.000');
  }

  if (profitEnd < -100000) {
    malus += 5;
    penalties.push('Gewinn am Ende < -100.000');
  } else if (profitEnd < 0) {
    malus += 4;
    penalties.push('Gewinn am Ende < 0');
  } else if (profitEnd < 50000) {
    malus += 2;
    penalties.push('Gewinn am Ende < 50.000');
  }

  if (customerLoyalty < 30) {
    malus += 3;
    penalties.push('Kundentreue < 30');
  }
  if (publicPerception < 30) {
    malus += 3;
    penalties.push('Öffentliche Wahrnehmung < 30');
  }

  return { bonus, malus, achievements, penalties };
}
