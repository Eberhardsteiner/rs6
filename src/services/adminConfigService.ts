// src/services/adminConfigService.ts
import type { ScoringWeights } from '@/types/core';
import { errorHandler } from '@/utils/errorHandler';

const SP_STORAGE_KEY = 'admin:singleplayer';

export interface SinglePlayerConfig {
  difficulty: 'easy' | 'medium' | 'hard';
  scoringWeights: ScoringWeights;
  insolvencyMode: 'off' | 'rules' | 'cash' | 'both';
  adaptiveDifficulty: boolean;
  maxDays: number;
}

function getDefaultSinglePlayerConfig(): SinglePlayerConfig {
  return {
    difficulty: 'medium',
    scoringWeights: {
      bankTrust: 25,
      publicPerception: 25,
      customerLoyalty: 25,
      workforceEngagement: 25
    },
    insolvencyMode: 'both',
    adaptiveDifficulty: false,
    maxDays: 14
  };
}

export function getSinglePlayerConfig(): SinglePlayerConfig {
  try {
    const stored = localStorage.getItem(SP_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...getDefaultSinglePlayerConfig(), ...parsed };
    }
  } catch (error) {
    errorHandler.logError('adminConfigService', 'Failed to load single player config', error);
  }
  return getDefaultSinglePlayerConfig();
}

export function setSinglePlayerConfig(config: Partial<SinglePlayerConfig>): void {
  try {
    const current = getSinglePlayerConfig();
    const updated = { ...current, ...config };
    localStorage.setItem(SP_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    errorHandler.logError('adminConfigService', 'Failed to save single player config', error);
  }
}

export function resetSinglePlayerConfig(): void {
  try {
    localStorage.removeItem(SP_STORAGE_KEY);
  } catch (error) {
    errorHandler.logError('adminConfigService', 'Failed to reset single player config', error);
  }
}

export function getSPDifficulty(): 'easy' | 'medium' | 'hard' {
  return getSinglePlayerConfig().difficulty;
}

export function setSPDifficulty(difficulty: 'easy' | 'medium' | 'hard'): void {
  setSinglePlayerConfig({ difficulty });
}

export function getSPScoringWeights(): ScoringWeights {
  return getSinglePlayerConfig().scoringWeights;
}

export function setSPScoringWeights(weights: ScoringWeights): void {
  setSinglePlayerConfig({ scoringWeights: weights });
}

export function getSPInsolvencyMode(): 'off' | 'rules' | 'cash' | 'both' {
  return getSinglePlayerConfig().insolvencyMode;
}

export function setSPInsolvencyMode(mode: 'off' | 'rules' | 'cash' | 'both'): void {
  setSinglePlayerConfig({ insolvencyMode: mode });
}

export function getSPAdaptiveDifficulty(): boolean {
  return getSinglePlayerConfig().adaptiveDifficulty;
}

export function setSPAdaptiveDifficulty(enabled: boolean): void {
  setSinglePlayerConfig({ adaptiveDifficulty: enabled });
}

export function getSPMaxDays(): number {
  return getSinglePlayerConfig().maxDays;
}

export function setSPMaxDays(days: number): void {
  if (days < 1 || days > 30) {
    throw new Error('Max days must be between 1 and 30');
  }
  setSinglePlayerConfig({ maxDays: days });
}
