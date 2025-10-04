// src/components/CoachController.tsx
import React from 'react';
import { createPortal } from 'react-dom';
import TutorialCoach from '@/components/TutorialCoach';

type Props = {
  getState: () => any;
  controlsBeforeSelector?: string;   // CSS-Selector des Elements, VOR das der Button eingefügt wird
  fixedFallback?: boolean;           // falls kein Ziel gefunden: fixed oben rechts (default: true)
};

type CoachPersist = { version:number; enabled:boolean; idx:number; dismissed?:boolean; completed?:boolean };

export default function CoachController({ getState, controlsBeforeSelector, fixedFallback = true }: Props) {
  const COACH_KEY = 'coach:v1';
  const COACH_VERSION = 1;
  const loadCoach = (): CoachPersist => {
    try { return JSON.parse(localStorage.getItem(COACH_KEY) || '') || { version:COACH_VERSION, enabled:true, idx:0 }; }
    catch { return { version:COACH_VERSION, enabled:true, idx:0 }; }
  };
  const saveCoach = (v: CoachPersist) => { try { localStorage.setItem(COACH_KEY, JSON.stringify(v)); } catch {} };

  
// Feature-Freigabe strikt an Admin-Toggle koppeln
const [allowed, setAllowed] = React.useState<boolean>(() => {
  try { return !!(globalThis as any).__featureCoach; } catch { return false; }
});
const [coachEnabled, setCoachEnabled] = React.useState<boolean>(() => {
    const c = loadCoach();
    const globalFlag = (globalThis as any).__featureCoach;
    const base = (c.version === COACH_VERSION ? c.enabled : true) && !c.dismissed && !c.completed;
    return (typeof globalFlag === 'boolean') ? (base && !!globalFlag) : base;
  });
  const [restartKey, setRestartKey] = React.useState(0);

  const coachStart = () => {
    if (!allowed) return;
    const payload: CoachPersist = { version: COACH_VERSION, enabled: true, idx: 0, dismissed:false, completed:false };
    saveCoach(payload);
    setCoachEnabled(true);
    setRestartKey(k => k + 1); // erzwingt Remount von TutorialCoach
    try { window.dispatchEvent(new Event('coach:start')); } catch {}
  };
  const coachSkip  = () => {
    saveCoach({ version: COACH_VERSION, enabled: false, idx: 0, dismissed:true,  completed:false });
    setCoachEnabled(false);
    try { window.dispatchEvent(new Event('coach:dismiss')); } catch {}
  };

  React.useEffect(() => {
    if (!allowed) { setHostEl(null); return; }
    const recalc = () => {
      const c = loadCoach();
      const globalFlag = (globalThis as any).__featureCoach;
      const base = (c.version === COACH_VERSION ? c.enabled : true) && !c.dismissed && !c.completed;
      setCoachEnabled((typeof globalFlag === 'boolean') ? (base && !!globalFlag) : base);
      setAllowed(!!globalFlag);
};
    const onResetOrStart = () => { setRestartKey(k => k + 1); recalc(); };
    window.addEventListener('admin:settings', recalc as any);
    window.addEventListener('coach:reset', onResetOrStart as any);
    window.addEventListener('coach:start', onResetOrStart as any);
    return () => {
      window.removeEventListener('admin:settings', recalc as any);
      window.removeEventListener('coach:reset', onResetOrStart as any);
      window.removeEventListener('coach:start', onResetOrStart as any);
    };
  }, []);

  // Ziel ermitteln: 1) controlsBeforeSelector, 2) Head-Reset-Button, 3) Fallback fixed
  const [hostEl, setHostEl] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => {
    const mkPlaceholder = (beforeEl: Element | null) => {
      if (!beforeEl || !beforeEl.parentElement) return null;
      const placeholder = document.createElement('span');
      placeholder.setAttribute('data-coach-anchor', '1');
      beforeEl.parentElement.insertBefore(placeholder, beforeEl);
      return placeholder;
    };
    let placeholder: HTMLElement | null = null;

    const trySelectors: string[] = [];
    if (controlsBeforeSelector) trySelectors.push(controlsBeforeSelector);
    // Fallbacks rund um den Kopfzeilen-Reset-Button
    trySelectors.push('header button[title="Spiel komplett zurücksetzen und neu starten"]');
    trySelectors.push('header button[title*="Neustart"]');
    trySelectors.push('header button[title*="neu starten"]');
    trySelectors.push('header button[title*="zurücksetzen"]');

    for (const sel of trySelectors) {
      const el = document.querySelector(sel);
      if (el) {
        const ph = mkPlaceholder(el);
        if (ph) { setHostEl(ph); break; }
      }
    }
    return () => {
      if (hostEl && hostEl.parentElement) {
        try { hostEl.parentElement.removeChild(hostEl); } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlsBeforeSelector, allowed]);

  const controls =
    <div style={{ display:'inline-flex', gap:8, alignItems:'center' }}>
      {!coachEnabled && <button onClick={coachStart} className="btn btn-xs">Coach starten</button>}
      {coachEnabled &&  <button onClick={coachSkip}  className="btn btn-xs">Coach überspringen</button>}
    </div>;

  return (
    <>
      {allowed && (hostEl
        ? createPortal(controls, hostEl)
        : (fixedFallback ? <div style={{ position:'fixed', right:12, top:12, zIndex: 9999 }}>{controls}</div> : null)
      )}
      {allowed && (
      <TutorialCoach
        key={restartKey}
        enabled={coachEnabled}
        getState={getState}
        version={1}
      />)}
    </>
  );
}
