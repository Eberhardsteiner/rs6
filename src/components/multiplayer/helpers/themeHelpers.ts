// src/components/multiplayer/helpers/themeHelpers.ts
import type { GameTheme } from '../GameThemeBackground';

export function getAdminGameTheme(): GameTheme {
  try {
    const g = globalThis.__multiplayerSettings
      || JSON.parse(localStorage.getItem('admin:multiplayer') || '{}');
    return (g?.gameSettings?.backgroundTheme ?? 'dynamic') as GameTheme;
  } catch {
    return 'dynamic';
  }
}

export function allowUserOverride(): boolean {
  try {
    const g = globalThis.__multiplayerSettings
      || JSON.parse(localStorage.getItem('admin:multiplayer') || '{}');
    return !!g?.gameSettings?.allowUserOverride;
  } catch {
    return false;
  }
}

export function readUserOverride(): GameTheme | null {
  try {
    const qp = new URLSearchParams(location.search);
    const p = qp.get('gameTheme');
    if (p === 'dynamic' || p === 'minimal' || p === 'corporate') return p;
  } catch {}

  try {
    const s = localStorage.getItem('user:gameTheme');
    if (s === 'dynamic' || s === 'minimal' || s === 'corporate') return s as GameTheme;
  } catch {}

  return null;
}

export function resolveGameTheme(): GameTheme {
  if (allowUserOverride()) {
    const override = readUserOverride();
    if (override) return override;
  }

  return getAdminGameTheme();
}
