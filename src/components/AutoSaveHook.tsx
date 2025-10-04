// src/components/AutoSaveHook.tsx
import React from 'react';
import { autoSave, type SaveMeta } from '@/services/storage';

type Props = {
  getState: () => any;
  slotName?: string;
  selectMeta?: (s: any) => Partial<SaveMeta>;
  listenEvents?: string[];
  throttleMs?: number;
};

export default function AutoSaveHook({ 
  getState, 
  slotName='__autosave__', 
  selectMeta, 
  listenEvents=['engine:day-advanced','admin:advance-day','admin:set-day'], 
  throttleMs=400 
}: Props) {
  const last = React.useRef<number>(0);
  const saving = React.useRef<boolean>(false);

  const handler = React.useCallback(() => {
    // Feature-Toggle prüfen
    if (!(globalThis as any).__featureAutoSave) return;
    const t = Date.now();
    if (t - last.current < throttleMs) return;
    last.current = t;
    if (saving.current) return;
    saving.current = true;
    try {
      const s = getState();
      const meta = selectMeta ? selectMeta(s) : {};
      autoSave(slotName, s, meta || {});
    } finally {
      saving.current = false;
    }
  }, [getState, slotName, selectMeta, throttleMs]);

  React.useEffect(() => {
    const evts = listenEvents && listenEvents.length ? listenEvents : ['engine:day-advanced','admin:advance-day','admin:set-day'];
    evts.forEach(name => window.addEventListener(name as any, handler as any as EventListener));
    (window as any).__autosave = { saveNow: handler };
    return () => {
      evts.forEach(name => window.removeEventListener(name as any, handler as any as EventListener));
      try { delete (window as any).__autosave; } catch {}
    };
  }, [handler, listenEvents]);

  return null;
}
