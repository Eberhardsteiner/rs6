// src/components/multiplayer/game/ConfigManager.tsx
import { useState, useEffect } from 'react';
import type { GameTheme } from '../GameThemeBackground';

export function useConfigManager() {
  const [themeMode, setThemeMode] = useState<'classic' | 'business' | 'dynamic'>('classic');
  const [whatIfEnabled, setWhatIfEnabled] = useState<boolean>(false);
  const [saveLoadEnabled, setSaveLoadEnabled] = useState<boolean>(false);
  const [allowCreditMP, setAllowCreditMP] = useState<boolean>(false);
  const [creditSettings, setCreditSettings] = useState<unknown>(null);
  const [daySeconds, setDaySeconds] = useState<number>(300);
  const [graceSeconds, setGraceSeconds] = useState<number>(180);

  useEffect(() => {
    const applyTheme = () => {
      try {
        const s = (globalThis as any).__multiplayerSettings;
        const bg = s?.gameSettings?.backgroundTheme || 'minimal';
        const mapped = bg === 'corporate' ? 'business' : bg === 'dynamic' ? 'dynamic' : 'classic';
        setThemeMode(mapped as 'classic' | 'business' | 'dynamic');
      } catch {}
    };
    applyTheme();
    const handler = () => applyTheme();
    window.addEventListener('admin:settings', handler);
    return () => window.removeEventListener('admin:settings', handler);
  }, []);

  useEffect(() => {
    const checkWhatIf = () => {
      try {
        const g = globalThis as any;
        if (typeof g.__featureWhatIfPreview === 'boolean') {
          setWhatIfEnabled(g.__featureWhatIfPreview);
          return;
        }
        const raw = localStorage.getItem('adminSettings');
        if (raw) {
          const obj = JSON.parse(raw);
          setWhatIfEnabled(!!(obj?.features?.whatIfPreview));
        }
      } catch {}
    };

    checkWhatIf();
    window.addEventListener('admin:settings', checkWhatIf);
    window.addEventListener('storage', checkWhatIf);
    return () => {
      window.removeEventListener('admin:settings', checkWhatIf);
      window.removeEventListener('storage', checkWhatIf);
    };
  }, []);

  useEffect(() => {
    const loadCreditSettings = () => {
      const mpSettings = (globalThis as any).__multiplayerSettings;
      if (mpSettings?.creditSettings?.enabled) {
        setCreditSettings(mpSettings.creditSettings);
      }
    };

    loadCreditSettings();
    window.addEventListener('admin:settings', loadCreditSettings);

    return () => {
      window.removeEventListener('admin:settings', loadCreditSettings);
    };
  }, []);

  useEffect(() => {
    const readAllowCredit = () => {
      try {
        const g = globalThis as any;
        if (typeof g.__mpAllowCredit === 'boolean') {
          setAllowCreditMP(!!g.__mpAllowCredit);
          return;
        }
        const raw = localStorage.getItem('adminSettings');
        if (raw) {
          const obj = JSON.parse(raw);
          const val = !!(
            obj?.features?.allowCreditMP ||
            obj?.features?.allowBankCredit ||
            obj?.bank?.allowCredit ||
            obj?.bankSettings?.allowCredit
          );
          setAllowCreditMP(val);
          return;
        }
      } catch {}
      setAllowCreditMP(false);
    };

    readAllowCredit();
    window.addEventListener('admin:settings', readAllowCredit);
    window.addEventListener('storage', readAllowCredit);
    return () => {
      window.removeEventListener('admin:settings', readAllowCredit);
      window.removeEventListener('storage', readAllowCredit);
    };
  }, []);

  return {
    themeMode,
    whatIfEnabled,
    saveLoadEnabled,
    allowCreditMP,
    creditSettings,
    daySeconds,
    graceSeconds,
    setDaySeconds,
    setGraceSeconds
  };
}
