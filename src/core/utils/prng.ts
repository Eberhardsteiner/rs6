/**
 * Deterministic PRNG utilities (LCG).
 * Numerical Recipes constants: a = 1664525, c = 1013904223, m = 2^32.
 * Provides a single source of randomness for reproducible runs.
 */

export type RngFn = () => number;

function toUint32(n: number): number {
  // Force into unsigned 32-bit space. Avoid zero which produces a short cycle.
  const v = (n >>> 0);
  return v === 0 ? 1 : v;
}

/**
 * Create a deterministic RNG from a numeric seed.
 * Returns a function that yields numbers in [0, 1).
 */
export function makeRng(seed: number): RngFn {
  let state = toUint32(seed);
  return function rng(): number {
    // LCG: X_{n+1} = (a * X_n + c) mod 2^32
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    // Map to [0,1)
    return state / 4294967296; // 2^32
  };
}

declare global {
  // eslint-disable-next-line no-var
  var __rng: RngFn | undefined;
}

/**
 * Set or initialize the global RNG.
 * - If a function is passed, it becomes the active RNG.
 * - If a number is passed, a new LCG is created with that seed.
 * - If nothing is passed and no RNG exists, one is created from Date.now().
 * Returns the active RNG.
 */
export function setCurrentRng(rngOrSeed?: number | RngFn): RngFn {
  if (typeof rngOrSeed === 'function') {
    globalThis.__rng = rngOrSeed as RngFn;
  } else if (typeof rngOrSeed === 'number') {
    globalThis.__rng = makeRng(rngOrSeed);
  } else if (!globalThis.__rng) {
    globalThis.__rng = makeRng(Date.now() >>> 0);
  }
  return globalThis.__rng!;
}

/**
 * Get the active RNG, initializing if necessary.
 */
export function currentRng(): RngFn {
  return globalThis.__rng ?? setCurrentRng();
}

/**
 * Integer in [min, max] inclusive.
 */
export function rngInt(min: number, max: number, rng: RngFn = currentRng()): number {
  if (max < min) [min, max] = [max, min];
  const r = rng();
  const span = (max - min + 1);
  return min + Math.floor(r * span);
}

/**
 * Float in [min, max).
 */
export function rngBetween(min: number, max: number, rng: RngFn = currentRng()): number {
  const r = rng();
  return min + r * (max - min);
}

/**
 * Boolean with probability p of true.
 */
export function rngBool(p = 0.5, rng: RngFn = currentRng()): boolean {
  return rng() < p;
}

/**
 * Deterministic base-36 ID from RNG.
 */
export function rngId(rng: RngFn = currentRng(), length = 8): string {
  let out = '';
  for (let i = 0; i < length; i++) {
    const n = Math.floor(rng() * 36); // 0..35
    out += n.toString(36);
  }
  return out;
}

/**
 * In-place Fisher-Yates shuffle using the RNG.
 */
export function shuffleInPlace<T>(arr: T[], rng: RngFn = currentRng()): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
