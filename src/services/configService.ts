// src/services/configService.ts
// Zentraler Service für Multiplayer-Konfiguration
// Konsolidiert Zugriff auf globalThis.__multiplayerSettings und localStorage

import type { GameTheme } from '@/components/multiplayer/GameThemeBackground';
import type { ScoringWeights, CreditSettings, GameConfiguration } from '@/types/core';
import type { MultiplayerAdminSettings, RoundTimeMatrix } from '@/types/admin';
import { isValidScoringWeights, isValidCreditSettings } from '@/types/core';
import { createDefaultScoringWeights, createDefaultCreditSettings, normalizeWeights } from '@/types/core';
import { errorHandler } from '@/utils/errorHandler';

const LS_KEY = 'admin:multiplayer';
const EVENT_KEY = 'admin:settings';

// Erweitere globalThis Typ
declare global {
  interface Window {
    __multiplayerSettings?: MultiplayerAdminSettings;
  }
  const globalThis: typeof window;
}

// =============================================================================
// Private Helper Functions
// =============================================================================

function getStoredSettings(): Partial<MultiplayerAdminSettings> | null {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    errorHandler.logError('configService', 'Failed to parse stored settings', error);
    return null;
  }
}

function saveSettings(settings: Partial<MultiplayerAdminSettings>): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(settings));
    globalThis.__multiplayerSettings = settings as MultiplayerAdminSettings;

    // Notify listeners
    window.dispatchEvent(new CustomEvent(EVENT_KEY, {
      detail: settings
    }));
  } catch (error) {
    errorHandler.logError('configService', 'Failed to save settings', error);
  }
}

function getSettings(): Partial<MultiplayerAdminSettings> {
  // Priorität: globalThis > localStorage
  const fromGlobal = globalThis.__multiplayerSettings;
  if (fromGlobal) return fromGlobal;

  const fromStorage = getStoredSettings();
  if (fromStorage) {
    globalThis.__multiplayerSettings = fromStorage as MultiplayerAdminSettings;
    return fromStorage;
  }

  return {};
}

// =============================================================================
// Game Theme Configuration
// =============================================================================

export function getGameTheme(): GameTheme {
  try {
    const settings = getSettings();
    const theme = settings.gameSettings?.backgroundTheme;

    if (theme && ['corporate', 'crisis', 'recovery', 'dynamic', 'minimal'].includes(theme)) {
      return theme as GameTheme;
    }

    return 'dynamic';
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get game theme', error);
    return 'dynamic';
  }
}

export function setGameTheme(theme: GameTheme): void {
  try {
    const settings = getSettings();
    const gameSettings = settings.gameSettings || {};
    gameSettings.backgroundTheme = theme;

    saveSettings({
      ...settings,
      gameSettings
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set game theme', error);
  }
}

export function getAllowUserThemeOverride(): boolean {
  try {
    const settings = getSettings();
    return settings.gameSettings?.allowUserOverride ?? false;
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get user theme override setting', error);
    return false;
  }
}

export function setAllowUserThemeOverride(allow: boolean): void {
  try {
    const settings = getSettings();
    const gameSettings = settings.gameSettings || {};
    gameSettings.allowUserOverride = allow;

    saveSettings({
      ...settings,
      gameSettings
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set user theme override', error);
  }
}

// =============================================================================
// Scoring Weights Configuration
// =============================================================================

export function getScoringWeights(): ScoringWeights {
  try {
    const settings = getSettings();
    const weights = settings.scoringWeights;

    if (weights && isValidScoringWeights(weights)) {
      return normalizeWeights(weights);
    }

    return createDefaultScoringWeights();
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get scoring weights', error);
    return createDefaultScoringWeights();
  }
}

export function setScoringWeights(weights: Partial<ScoringWeights>): void {
  try {
    const normalized = normalizeWeights(weights);
    const settings = getSettings();

    saveSettings({
      ...settings,
      scoringWeights: normalized
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set scoring weights', error);
  }
}

// =============================================================================
// Credit Settings Configuration
// =============================================================================

export function getCreditSettings(): CreditSettings {
  try {
    const settings = getSettings();
    const credit = settings.creditSettings;

    if (credit && isValidCreditSettings(credit)) {
      return credit;
    }

    return createDefaultCreditSettings();
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get credit settings', error);
    return createDefaultCreditSettings();
  }
}

export function setCreditSettings(settings: CreditSettings): void {
  try {
    if (!isValidCreditSettings(settings)) {
      throw new Error('Invalid credit settings');
    }

    const current = getSettings();
    saveSettings({
      ...current,
      creditSettings: settings
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set credit settings', error);
  }
}

export function isCreditEnabled(): boolean {
  try {
    const settings = getCreditSettings();
    return settings.enabled;
  } catch (error) {
    errorHandler.logError('configService', 'Failed to check credit enabled', error);
    return false;
  }
}

// =============================================================================
// Round Timer Configuration
// =============================================================================

export function getRoundTimeMode(): 'off' | 'fixed' | 'matrix' {
  try {
    const settings = getSettings();
    const mode = settings.roundTimeMode;

    if (mode && ['off', 'fixed', 'matrix'].includes(mode)) {
      return mode;
    }

    return 'off';
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get round time mode', error);
    return 'off';
  }
}

export function setRoundTimeMode(mode: 'off' | 'fixed' | 'matrix'): void {
  try {
    const settings = getSettings();
    saveSettings({
      ...settings,
      roundTimeMode: mode
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set round time mode', error);
  }
}

export function getFixedRoundTime(): number {
  try {
    const settings = getSettings();
    const time = settings.fixedRoundTimeSeconds;

    if (typeof time === 'number' && time >= 10 && time <= 7200) {
      return time;
    }

    return 300; // 5 Minuten default
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get fixed round time', error);
    return 300;
  }
}

export function setFixedRoundTime(seconds: number): void {
  try {
    if (seconds < 10 || seconds > 7200) {
      throw new Error('Round time must be between 10 and 7200 seconds');
    }

    const settings = getSettings();
    saveSettings({
      ...settings,
      fixedRoundTimeSeconds: seconds
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set fixed round time', error);
  }
}

export function getRoundTimeMatrix(): RoundTimeMatrix | null {
  try {
    const settings = getSettings();
    return settings.roundTimeMatrix || null;
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get round time matrix', error);
    return null;
  }
}

export function setRoundTimeMatrix(matrix: RoundTimeMatrix): void {
  try {
    const settings = getSettings();
    saveSettings({
      ...settings,
      roundTimeMatrix: matrix
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set round time matrix', error);
  }
}

// =============================================================================
// Difficulty Configuration
// =============================================================================

export function getDifficulty(): 'easy' | 'medium' | 'hard' {
  try {
    const settings = getSettings();
    const difficulty = settings.difficulty;

    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      return difficulty;
    }

    return 'medium';
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get difficulty', error);
    return 'medium';
  }
}

export function setDifficulty(difficulty: 'easy' | 'medium' | 'hard'): void {
  try {
    const settings = getSettings();
    saveSettings({
      ...settings,
      difficulty
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set difficulty', error);
  }
}

// =============================================================================
// Insolvency Configuration
// =============================================================================

export function getInsolvencyMode(): 'off' | 'rules' | 'cash' | 'both' {
  try {
    const settings = getSettings();
    const mode = settings.insolvencyMode;

    if (mode && ['off', 'rules', 'cash', 'both'].includes(mode)) {
      return mode;
    }

    return 'both';
  } catch (error) {
    errorHandler.logError('configService', 'Failed to get insolvency mode', error);
    return 'both';
  }
}

export function setInsolvencyMode(mode: 'off' | 'rules' | 'cash' | 'both'): void {
  try {
    const settings = getSettings();
    saveSettings({
      ...settings,
      insolvencyMode: mode
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to set insolvency mode', error);
  }
}

// =============================================================================
// Event Listeners
// =============================================================================

export type ConfigChangeListener = (settings: Partial<MultiplayerAdminSettings>) => void;

export function addConfigChangeListener(listener: ConfigChangeListener): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<Partial<MultiplayerAdminSettings>>;
    listener(customEvent.detail);
  };

  window.addEventListener(EVENT_KEY, handler);

  // Return cleanup function
  return () => {
    window.removeEventListener(EVENT_KEY, handler);
  };
}

// =============================================================================
// Complete Settings Management
// =============================================================================

export function getAllSettings(): Partial<MultiplayerAdminSettings> {
  return getSettings();
}

export function updateSettings(updates: Partial<MultiplayerAdminSettings>): void {
  try {
    const current = getSettings();
    saveSettings({
      ...current,
      ...updates
    });
  } catch (error) {
    errorHandler.logError('configService', 'Failed to update settings', error);
  }
}

export function resetSettings(): void {
  try {
    localStorage.removeItem(LS_KEY);
    delete globalThis.__multiplayerSettings;

    window.dispatchEvent(new CustomEvent(EVENT_KEY, {
      detail: {}
    }));
  } catch (error) {
    errorHandler.logError('configService', 'Failed to reset settings', error);
  }
}

// =============================================================================
// Export for backward compatibility
// =============================================================================

const ConfigService = {
  // Theme
  getGameTheme,
  setGameTheme,
  getAllowUserThemeOverride,
  setAllowUserThemeOverride,

  // Scoring
  getScoringWeights,
  setScoringWeights,

  // Credit
  getCreditSettings,
  setCreditSettings,
  isCreditEnabled,

  // Timer
  getRoundTimeMode,
  setRoundTimeMode,
  getFixedRoundTime,
  setFixedRoundTime,
  getRoundTimeMatrix,
  setRoundTimeMatrix,

  // Difficulty
  getDifficulty,
  setDifficulty,

  // Insolvency
  getInsolvencyMode,
  setInsolvencyMode,

  // Events
  addConfigChangeListener,

  // Complete
  getAllSettings,
  updateSettings,
  resetSettings
};

export default ConfigService;
