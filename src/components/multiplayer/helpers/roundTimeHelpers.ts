// src/components/multiplayer/helpers/roundTimeHelpers.ts

const RT_ROLES = ['CEO', 'CFO', 'OPS', 'HRLEGAL'] as const;

export function computeRoundSecondsForDay(day: number): number {
  const g = globalThis;
  const mode = g.__roundTimeMode || 'off';

  if (mode === 'global' && typeof g.__roundTimeGlobalSec === 'number' && g.__roundTimeGlobalSec > 0) {
    return g.__roundTimeGlobalSec;
  }

  if (mode === 'matrix' && g.__roundTimeMatrix && typeof g.__roundTimeMatrix === 'object') {
    const row = g.__roundTimeMatrix[day] || {};
    const total = RT_ROLES.reduce((s, r) => s + (Number(row[r]) || 0), 0);
    if (total > 0) return total;
  }

  return 300;
}

export function readGraceSeconds(): number {
  const g = globalThis;
  const n = Number(g.__roundTimeGraceSec);
  return Number.isFinite(n) && n >= 0 ? n : 180;
}

export function getRoundTimeForRole(day: number, role: typeof RT_ROLES[number]): number {
  const g = globalThis;
  const mode = g.__roundTimeMode || 'off';

  if (mode === 'off') {
    return 0;
  }

  if (mode === 'global' && typeof g.__roundTimeGlobalSec === 'number') {
    return g.__roundTimeGlobalSec;
  }

  if (mode === 'matrix' && g.__roundTimeMatrix && typeof g.__roundTimeMatrix === 'object') {
    const roleMatrix = g.__roundTimeMatrix[role];
    if (roleMatrix && typeof roleMatrix[day] === 'number') {
      return roleMatrix[day];
    }
  }

  return 300;
}

export function isRoundTimerEnabled(): boolean {
  const g = globalThis;
  const mode = g.__roundTimeMode || 'off';
  return mode !== 'off';
}
