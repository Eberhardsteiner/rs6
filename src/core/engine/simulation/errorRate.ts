// src/core/engine/simulation/errorRate.ts

export type Difficulty = 'easy' | 'normal' | 'hard';

export function calculateErrorRate(): number {
  const diff: any = (globalThis as any).__npcDifficulty || 'normal';
  const baseErr = diff === 'hard' ? 0.18 : (diff === 'easy' ? 0.06 : 0.12);
  const idle = (globalThis as any).__playerIdleToday ? true : false;
  const dfRaw = (globalThis as any).__adaptiveDifficultyLightEnabled
    ? ((globalThis as any).__difficultyFactor ?? 1.0)
    : 1.0;
  const df = Math.max(0.9, Math.min(1.2, typeof dfRaw === 'number' ? dfRaw : 1.0));

  return Math.max(0.03, idle ? 0.45 : Math.min(0.45, baseErr * df));
}

export function shouldPickWorstOption(rng: () => number): boolean {
  const worstPickChance = 0.05;
  const idle = (globalThis as any).__playerIdleToday ? true : false;
  return idle ? rng() < 0.35 : rng() < worstPickChance;
}

export function shouldMakeError(rng: () => number): boolean {
  const errorRate = calculateErrorRate();
  return rng() < errorRate;
}

export function pickFromTop3(rng: () => number): 0 | 1 | 2 {
  const r = rng();
  if (r < 0.45) return 0;
  if (r < 0.80) return 1;
  return 2;
}
