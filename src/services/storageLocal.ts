import { GameState } from '@/core/engine/gameEngine';
const KEY = 'durststrecke:v1:state';

export function saveState(s: GameState) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function clearState(){ localStorage.removeItem(KEY); }