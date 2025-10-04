// src/coach/CoachGate.tsx
import React from 'react';

/**
 * Gate für den Onboarding‑Coach:
 * Rendert den eigentlichen Coach **erst**, wenn das Spiel wirklich gestartet wurde.
 *
 * Aktivierungssignale (belastbare, additive Heuristik – kein UI‑Eingriff):
 *  - Event 'ui:enter-game'  → explizit beim Wechsel in die Spielansicht feuern
 *  - Event 'game:started'   → alternativ verwendbar
 *  - Event 'engine:day'     → wenn detail.day >= 1
 *  - Events 'admin:set-day' | 'admin:advance-day' → für Admin‑Startfälle
 *  - Global: (globalThis as any).__uiScreen === 'game'
 *  - Global: (globalThis as any).__engine?.state?.day >= 1
 *
 * Falls keines der Signale vorliegt, bleibt der Coach inaktiv – insbesondere auf dem Onboarding‑Screen.
 */
const LazyCoach = React.lazy(() => import('@/coach/CoachOverlay'));

function isGameNow(): boolean {
  const g: any = globalThis as any;
  if (g && g.__uiScreen === 'game') return true;
  try {
    const day = Number(g?.__engine?.state?.day ?? 0);
    if (Number.isFinite(day) && day >= 1) return true;
  } catch {}
  return false;
}

export default function CoachGate(props: any) {
  const [allowed, setAllowed] = React.useState<boolean>(() => isGameNow());

  React.useEffect(() => {
    // Standardstartphase ist "game". Wenn explizit anderes gewünscht, kann global überschrieben werden.
    const g: any = globalThis as any;
    const startPhase = (g?.__coachStartPhase ?? 'game') as 'game'|'onboarding';
    if (startPhase !== 'game') {
      setAllowed(true);
      return;
    }

    const markAllowed = () => setAllowed(true);

    const onUiEnterGame = () => markAllowed();
    const onGameStarted  = () => markAllowed();
    const onEngineDay    = (e: any) => {
      const d = Number(e?.detail?.day ?? e?.detail ?? 0);
      if (Number.isFinite(d) && d >= 1) markAllowed();
    };
    const onAdminAny     = () => markAllowed();

    window.addEventListener('ui:enter-game', onUiEnterGame);
    window.addEventListener('game:started', onGameStarted);
    window.addEventListener('engine:day', onEngineDay as EventListener);
    window.addEventListener('admin:set-day', onAdminAny);
    window.addEventListener('admin:advance-day', onAdminAny);

    // Sofortiger Check (z. B. wenn beim Mount bereits Tag ≥ 1 aktiv ist)
    if (isGameNow()) markAllowed();

    return () => {
      window.removeEventListener('ui:enter-game', onUiEnterGame);
      window.removeEventListener('game:started', onGameStarted);
      window.removeEventListener('engine:day', onEngineDay as EventListener);
      window.removeEventListener('admin:set-day', onAdminAny);
      window.removeEventListener('admin:advance-day', onAdminAny);
    };
  }, []);

  if (!allowed) return null;
  return (
    <React.Suspense fallback={null}>
      <LazyCoach {...props} />
    </React.Suspense>
  );
}
