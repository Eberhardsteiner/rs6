// src/services/statePersistence.ts
import type { GameState } from '@/core/engine/gameEngine';
import { supabase } from './supabaseClient';
import { errorHandler } from '@/utils/errorHandler';

const LOCAL_STORAGE_KEY = 'game:state';
const SESSION_STORAGE_KEY = 'game:session';

export type PersistenceMode = 'local' | 'supabase' | 'hybrid';

export interface PersistenceConfig {
  mode: PersistenceMode;
  gameId?: string;
  playerId?: string;
  autoSave?: boolean;
  autoSaveInterval?: number;
}

class StatePersistenceManager {
  private config: PersistenceConfig = {
    mode: 'local',
    autoSave: true,
    autoSaveInterval: 30000
  };
  private autoSaveTimer?: number;

  configure(config: Partial<PersistenceConfig>): void {
    this.config = { ...this.config, ...config };

    if (config.autoSave !== undefined) {
      if (config.autoSave) {
        this.startAutoSave();
      } else {
        this.stopAutoSave();
      }
    }
  }

  async saveState(state: GameState): Promise<void> {
    try {
      switch (this.config.mode) {
        case 'local':
          await this.saveToLocalStorage(state);
          break;
        case 'supabase':
          await this.saveToSupabase(state);
          break;
        case 'hybrid':
          await Promise.all([
            this.saveToLocalStorage(state),
            this.saveToSupabase(state)
          ]);
          break;
      }
    } catch (error) {
      errorHandler.logError('statePersistence', 'Failed to save state', error);
      throw error;
    }
  }

  async loadState(): Promise<GameState | null> {
    try {
      switch (this.config.mode) {
        case 'local':
          return await this.loadFromLocalStorage();
        case 'supabase':
          return await this.loadFromSupabase();
        case 'hybrid':
          const supabaseState = await this.loadFromSupabase();
          if (supabaseState) return supabaseState;
          return await this.loadFromLocalStorage();
      }
    } catch (error) {
      errorHandler.logError('statePersistence', 'Failed to load state', error);
      return null;
    }
  }

  async clearState(): Promise<void> {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);

      if (this.config.mode !== 'local' && this.config.gameId && this.config.playerId) {
        await supabase
          .from('game_states')
          .delete()
          .eq('game_id', this.config.gameId)
          .eq('player_id', this.config.playerId);
      }
    } catch (error) {
      errorHandler.logError('statePersistence', 'Failed to clear state', error);
    }
  }

  private async saveToLocalStorage(state: GameState): Promise<void> {
    const serialized = JSON.stringify({
      state,
      timestamp: Date.now(),
      version: '1.0'
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, serialized);
  }

  private async loadFromLocalStorage(): Promise<GameState | null> {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      return parsed.state || null;
    } catch {
      return null;
    }
  }

  private async saveToSupabase(state: GameState): Promise<void> {
    if (!this.config.gameId || !this.config.playerId) {
      throw new Error('Game ID and Player ID required for Supabase persistence');
    }

    const { error } = await supabase
      .from('game_states')
      .upsert({
        game_id: this.config.gameId,
        player_id: this.config.playerId,
        state: state as any,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
  }

  private async loadFromSupabase(): Promise<GameState | null> {
    if (!this.config.gameId || !this.config.playerId) {
      return null;
    }

    const { data, error } = await supabase
      .from('game_states')
      .select('state')
      .eq('game_id', this.config.gameId)
      .eq('player_id', this.config.playerId)
      .maybeSingle();

    if (error || !data) return null;
    return data.state as GameState;
  }

  private startAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }

    this.autoSaveTimer = window.setInterval(() => {
      const stateJson = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stateJson) {
        try {
          const state = JSON.parse(stateJson);
          this.saveState(state).catch(err => {
            errorHandler.logError('statePersistence', 'Auto-save failed', err);
          });
        } catch (error) {
          errorHandler.logError('statePersistence', 'Failed to parse session state', error);
        }
      }
    }, this.config.autoSaveInterval);
  }

  private stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = undefined;
    }
  }

  setSessionState(state: GameState): void {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
  }

  getSessionState(): GameState | null {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  cleanup(): void {
    this.stopAutoSave();
  }
}

export const statePersistenceManager = new StatePersistenceManager();

export function consolidateEngineMeta(state: GameState): GameState {
  const meta = state.engineMeta || {};

  const consolidated = {
    ...meta,
    ts: Date.now()
  };

  const redundantGlobalKeys = [
    '__difficultyFactor',
    '__adaptiveDifficultyLightEnabled',
    '__scoringWeights',
    '__npcDifficulty',
    '__npcProfile',
    '__insolvencyMode'
  ];

  for (const key of redundantGlobalKeys) {
    if ((globalThis as any)[key] !== undefined) {
      console.warn(`Found redundant global key: ${key}. Should be in engineMeta.`);
    }
  }

  return {
    ...state,
    engineMeta: consolidated
  };
}

export function migrateFromLegacyStorage(): GameState | null {
  try {
    const oldKeys = [
      'gameState',
      'game:kpi',
      'game:day',
      'game:log',
      'simulation:state'
    ];

    for (const key of oldKeys) {
      const stored = localStorage.getItem(key);
      if (stored) {
        console.log(`Migrating from legacy key: ${key}`);
        const parsed = JSON.parse(stored);

        localStorage.removeItem(key);

        if (parsed && typeof parsed === 'object') {
          return parsed as GameState;
        }
      }
    }

    return null;
  } catch (error) {
    errorHandler.logError('statePersistence', 'Migration from legacy storage failed', error);
    return null;
  }
}

export default statePersistenceManager;
