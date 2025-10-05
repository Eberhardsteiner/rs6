// src/utils/typeGuards.ts
import type { GameState, KPI } from '@/core/engine/gameEngine';
import type { RoleId } from '@/core/models/domain';

export function isValidKPI(obj: unknown): obj is KPI {
  if (!obj || typeof obj !== 'object') return false;

  const kpi = obj as Partial<KPI>;

  return (
    typeof kpi.cashEUR === 'number' &&
    typeof kpi.profitLossEUR === 'number' &&
    typeof kpi.customerLoyalty === 'number' &&
    typeof kpi.bankTrust === 'number' &&
    typeof kpi.workforceEngagement === 'number' &&
    typeof kpi.publicPerception === 'number' &&
    kpi.customerLoyalty >= 0 && kpi.customerLoyalty <= 100 &&
    kpi.bankTrust >= 0 && kpi.bankTrust <= 100 &&
    kpi.workforceEngagement >= 0 && kpi.workforceEngagement <= 100 &&
    kpi.publicPerception >= 0 && kpi.publicPerception <= 100
  );
}

export function isValidGameState(obj: unknown): obj is GameState {
  if (!obj || typeof obj !== 'object') return false;

  const state = obj as Partial<GameState>;

  return (
    typeof state.day === 'number' &&
    state.day > 0 &&
    state.day <= 30 &&
    isValidKPI(state.kpi) &&
    typeof state.isOver === 'boolean' &&
    Array.isArray(state.kpiHistory) &&
    Array.isArray(state.log)
  );
}

export function isValidRoleId(value: unknown): value is RoleId {
  return (
    typeof value === 'string' &&
    ['CEO', 'CFO', 'OPS', 'HRLEGAL', 'TRAINER'].includes(value)
  );
}

export function isValidRole(value: unknown): value is RoleId | null {
  return value === null || isValidRoleId(value);
}

export function assertValidKPI(obj: unknown): asserts obj is KPI {
  if (!isValidKPI(obj)) {
    throw new Error('Invalid KPI object');
  }
}

export function assertValidGameState(obj: unknown): asserts obj is GameState {
  if (!isValidGameState(obj)) {
    throw new Error('Invalid GameState object');
  }
}

export function assertValidRoleId(value: unknown): asserts value is RoleId {
  if (!isValidRoleId(value)) {
    throw new Error(`Invalid RoleId: ${value}`);
  }
}

export function safeParseKPI(obj: unknown): KPI | null {
  try {
    if (isValidKPI(obj)) {
      return obj;
    }
    return null;
  } catch {
    return null;
  }
}

export function safeParseGameState(obj: unknown): GameState | null {
  try {
    if (isValidGameState(obj)) {
      return obj;
    }
    return null;
  } catch {
    return null;
  }
}

export function validateSupabaseGameState(data: unknown): GameState | null {
  if (!data || typeof data !== 'object') return null;

  const record = data as Record<string, unknown>;

  if (!record.state || typeof record.state !== 'object') return null;

  return safeParseGameState(record.state);
}

export function validateSupabasePlayer(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;

  const player = data as Record<string, unknown>;

  return (
    typeof player.id === 'string' &&
    typeof player.game_id === 'string' &&
    isValidRole(player.role) &&
    typeof player.player_name === 'string'
  );
}

export function validateSupabaseGame(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;

  const game = data as Record<string, unknown>;

  return (
    typeof game.id === 'string' &&
    typeof game.status === 'string' &&
    ['lobby', 'active', 'paused', 'ended'].includes(game.status as string)
  );
}
