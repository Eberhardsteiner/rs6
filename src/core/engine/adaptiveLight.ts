// src/core/engine/adaptiveLight.ts
// Lightweight Adaptive Difficulty (rubber banding) for NPC error rate.
// Keeps a persistent multiplier in engineMeta (difficultyFactor, clamped to 0.9–1.2).
// Rule: if the last two days were "good", raise factor slightly; if the last two were "bad", lower it slightly; otherwise drift back to 1.0.
// "Good/bad" is determined from day-over-day changes in the 4 soft KPIs.
//
// Usage (in reducer 'ADVANCE_DAY'):
//    import { updateAdaptiveLight } from '@/core/engine/adaptiveLight';
//    meta = updateAdaptiveLight(meta, hist, { enabled: (globalThis as any).__adaptiveDifficultyLightEnabled === true });
//
// Usage (in simulation.ts when computing the NPC errorRate):
//    const df = (globalThis as any).__adaptiveDifficultyLightEnabled ? ((globalThis as any).__difficultyFactor ?? 1.0) : 1.0;
//    errorRate = clamp(errorRate * Math.max(0.9, Math.min(1.2, df)), 0.03, 0.50);
//
// The helper is pure and side-effect free; writing to globalThis is left to the caller (e.g., in App.tsx).

import type { KPI } from '@/core/models/domain';

export interface AdaptiveLightOptions {
  enabled?: boolean;
  clamp?: [number, number];      // default [0.9, 1.2]
  upStep?: number;               // +0.02 on two good days
  downStep?: number;             // -0.02 on two bad days
  neutralPull?: number;          // 0..1, pull towards 1.0 if neither good nor bad streak (default 0.25)
  goodThreshold?: number;        // sum of soft KPI deltas (≥ threshold) marks a "good" day (default 8)
  badThreshold?: number;         // sum of soft KPI deltas (≤ -threshold) marks a "bad" day (default 8)
}

export type EngineMetaLike = {
  difficultyFactor?: number;     // persistent multiplier in [0.9, 1.2]
};

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

function softDelta(a: KPI, b: KPI): number {
  return (
    (a.bankTrust - b.bankTrust) +
    (a.customerLoyalty - b.customerLoyalty) +
    (a.publicPerception - b.publicPerception) +
    (a.workforceEngagement - b.workforceEngagement)
  );
}

export function updateAdaptiveLight<T extends EngineMetaLike>(
  metaIn: T | undefined,
  kpiHistory: KPI[],
  options?: AdaptiveLightOptions
): T {
  const enabled = !!options?.enabled;
  const clampRange: [number, number] = options?.clamp ?? [0.9, 1.2];
  const upStep = options?.upStep ?? 0.02;
  const downStep = options?.downStep ?? 0.02;
  const neutralPull = options?.neutralPull ?? 0.25;
  const goodThreshold = options?.goodThreshold ?? 8;
  const badThreshold = options?.badThreshold ?? 8;

  const meta: T = { ...(metaIn ?? {}) };

  // Initialize
  let f = typeof meta.difficultyFactor === 'number' && Number.isFinite(meta.difficultyFactor)
    ? meta.difficultyFactor
    : 1.0;

  if (!enabled) {
    // When disabled we don't mutate the stored value, but callers can ignore it.
    return { ...meta, difficultyFactor: clamp(f, clampRange[0], clampRange[1]) } as T;
  }

  // Enough history? Need at least 3 snapshots to evaluate last two days.
  if (kpiHistory.length >= 3) {
    const n = kpiHistory.length;
    const d1 = softDelta(kpiHistory[n-1], kpiHistory[n-2]);  // today vs. yesterday
    const d2 = softDelta(kpiHistory[n-2], kpiHistory[n-3]);  // yesterday vs. day before
    const goodToday = d1 >= goodThreshold;
    const goodYesterday = d2 >= goodThreshold;
    const badToday = d1 <= -badThreshold;
    const badYesterday = d2 <= -badThreshold;

    if (goodToday && goodYesterday) {
      f += upStep;
    } else if (badToday && badYesterday) {
      f -= downStep;
    } else {
      // Gentle decay back to neutral (1.0)
      f += (1.0 - f) * neutralPull;
    }
  } else {
    // Early game – softly normalize towards 1.0
    f += (1.0 - f) * 0.5;
  }

  meta.difficultyFactor = clamp(Number(f.toFixed(3)), clampRange[0], clampRange[1]);
  return meta;
}
