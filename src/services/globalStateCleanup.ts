// src/services/globalStateCleanup.ts
import { errorHandler } from '@/utils/errorHandler';

const REDUNDANT_GLOBAL_KEYS = [
  '__difficultyFactor',
  '__adaptiveDifficultyLightEnabled',
  '__scoringWeights',
  '__npcDifficulty',
  '__npcProfile',
  '__insolvencyMode',
  '__roundTimeMode',
  '__roundTimeGlobalSec',
  '__roundTimeGraceSec',
  '__roundTimeMatrix',
  '__scenarioOverrides',
  '__rng',
  '__mode'
] as const;

export function logRedundantGlobalState(): void {
  const found: string[] = [];

  for (const key of REDUNDANT_GLOBAL_KEYS) {
    if ((globalThis as any)[key] !== undefined) {
      found.push(key);
    }
  }

  if (found.length > 0) {
    console.warn(
      `Found ${found.length} redundant global keys that should be in engineMeta or configService:`,
      found
    );
  }
}

export function migrateGlobalToEngineMeta(engineMeta: any = {}): any {
  const meta = { ...engineMeta };

  for (const key of REDUNDANT_GLOBAL_KEYS) {
    const value = (globalThis as any)[key];
    if (value !== undefined) {
      const metaKey = key.replace(/^__/, '');
      if (meta[metaKey] === undefined) {
        meta[metaKey] = value;
        console.log(`Migrated ${key} from globalThis to engineMeta.${metaKey}`);
      }
    }
  }

  return meta;
}

export function cleanupRedundantGlobals(): void {
  let cleaned = 0;

  for (const key of REDUNDANT_GLOBAL_KEYS) {
    if ((globalThis as any)[key] !== undefined) {
      try {
        delete (globalThis as any)[key];
        cleaned++;
      } catch (error) {
        errorHandler.logError('globalStateCleanup', `Failed to delete ${key}`, error);
      }
    }
  }

  if (cleaned > 0) {
    console.log(`Cleaned up ${cleaned} redundant global keys`);
  }
}

export function getGlobalStateSnapshot(): Record<string, unknown> {
  const snapshot: Record<string, unknown> = {};

  for (const key of REDUNDANT_GLOBAL_KEYS) {
    const value = (globalThis as any)[key];
    if (value !== undefined) {
      snapshot[key] = value;
    }
  }

  return snapshot;
}

export function restoreGlobalStateSnapshot(snapshot: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(snapshot)) {
    (globalThis as any)[key] = value;
  }
}

export function initializeCleanGlobalState(): void {
  cleanupRedundantGlobals();
  logRedundantGlobalState();
}
