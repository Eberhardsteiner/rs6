// src/admin/multiplayer/MultiplayerAdminShell.tsx
import React, { useState, useEffect } from 'react';
import type { MultiplayerAdminSettings } from '@/types/admin';
import { AuthenticationTab } from './AuthenticationTab';
import { LobbySettingsTab } from './LobbySettingsTab';
import { GameSettingsTab } from './GameSettingsTab';
import { BankSettingsTab } from './BankSettingsTab';
import { ScoringTab } from './ScoringTab';
import { TimerSettingsTab } from './TimerSettingsTab';
import { InsolvencyTab } from './InsolvencyTab';
import { ScenarioTab } from './ScenarioTab';
import { errorHandler, safeLocalStorageGet, safeLocalStorageSet, safeJSONParse } from '@/utils/errorHandler';
import { normalizeWeights } from '@/types/core';

const LS_KEY = 'admin:multiplayer';

type TabId = 'auth' | 'lobby' | 'game' | 'bank' | 'scoring' | 'timer' | 'insolvency' | 'scenario';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  component: React.ComponentType<{
    settings: MultiplayerAdminSettings;
    onUpdate: (updater: (prev: MultiplayerAdminSettings) => MultiplayerAdminSettings) => void;
  }>;
}

const tabs: Tab[] = [
  { id: 'auth', label: 'Authentifizierung', icon: '🔐', component: AuthenticationTab },
  { id: 'lobby', label: 'Lobby', icon: '🏛️', component: LobbySettingsTab },
  { id: 'game', label: 'Spiel', icon: '🎮', component: GameSettingsTab },
  { id: 'bank', label: 'Bank', icon: '🏦', component: BankSettingsTab },
  { id: 'scoring', label: 'Scoring', icon: '📊', component: ScoringTab },
  { id: 'timer', label: 'Timer', icon: '⏱️', component: TimerSettingsTab },
  { id: 'insolvency', label: 'Insolvenz', icon: '⚠️', component: InsolvencyTab },
  { id: 'scenario', label: 'Szenario', icon: '📝', component: ScenarioTab }
];

function getDefaultSettings(): MultiplayerAdminSettings {
  return {
    authMode: 'name-only',
    allowEarlyEntry: false,
    forceAllPlayersForAdvance: false,
    autoStartWhenReady: false,
    autoStartDelaySeconds: 5,
    lobbyCountdownSeconds: 10,
    presetCredentials: {
      CEO: { username: 'ceo', password: 'ceo123' },
      CFO: { username: 'cfo', password: 'cfo123' },
      OPS: { username: 'ops', password: 'ops123' },
      HRLEGAL: { username: 'hr', password: 'hr123' },
    },
    lobbySettings: {
      showTimer: true,
      backgroundTheme: 'corporate',
      welcomeMessage: 'Willkommen zur Crisis Management Simulation!'
    },
    gameSettings: {
      backgroundTheme: 'dynamic',
      allowUserOverride: false
    },
    creditSettings: {
      enabled: false,
      creditLineEUR: 500000,
      interestRatePct: 8.5
    },
    roundTimeMode: 'off',
    roundTimeGlobalSec: 0,
    roundTimeGraceSec: 180,
    roundTimeMatrix: {},
    mpDifficulty: 'normal',
    randomNews: true,
    adaptiveDifficultyLight: false,
    insolvencyMode: 'both',
    scoringWeights: { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 },
    eventIntensityByDay: Array.from({ length: 14 }, () => 1),
    features: {
      saveLoadMenu: false,
      autoSave: false,
      coach: false,
      whatIfPreview: false,
      eventIntensity: false,
      trainerAccess: false,
      roleBasedRandomNews: false
    },
    insolvencyConfig: undefined,
  };
}

function upgradeSettings(base: MultiplayerAdminSettings, raw: unknown): MultiplayerAdminSettings {
  const s = { ...base, ...(raw && typeof raw === 'object' ? raw : {}) } as MultiplayerAdminSettings;

  s.features = { ...base.features, ...(raw?.features || {}) };
  s.presetCredentials = { ...base.presetCredentials, ...(raw?.presetCredentials || {}) };
  s.lobbySettings = { ...base.lobbySettings, ...(raw?.lobbySettings || {}) };
  s.gameSettings = { ...base.gameSettings, ...(raw?.gameSettings || {}) };
  s.creditSettings = { ...base.creditSettings, ...(raw?.creditSettings || {}) };

  s.eventIntensityByDay = Array.isArray(raw?.eventIntensityByDay) ? raw.eventIntensityByDay : base.eventIntensityByDay;
  s.roundTimeMatrix = raw?.roundTimeMatrix ?? base.roundTimeMatrix;
  s.roundTimeMode = raw?.roundTimeMode ?? base.roundTimeMode;
  s.roundTimeGlobalSec = typeof raw?.roundTimeGlobalSec === 'number' ? raw.roundTimeGlobalSec : base.roundTimeGlobalSec;
  s.roundTimeGraceSec = typeof raw?.roundTimeGraceSec === 'number' ? raw.roundTimeGraceSec : base.roundTimeGraceSec;

  s.insolvencyMode = raw?.insolvencyMode ?? base.insolvencyMode;
  s.insolvencyConfig = raw?.insolvencyConfig ?? base.insolvencyConfig;

  s.scoringWeights = normalizeWeights(raw?.scoringWeights);

  return s as MultiplayerAdminSettings;
}

function loadSettings(): MultiplayerAdminSettings {
  const base = getDefaultSettings();
  const saved = safeLocalStorageGet(LS_KEY, {
    component: 'MultiplayerAdminShell',
    action: 'load-settings',
  });
  if (saved) {
    const raw = safeJSONParse(saved, null, {
      component: 'MultiplayerAdminShell',
      action: 'parse-settings',
    });
    if (raw) {
      return upgradeSettings(base, raw);
    }
  }
  return base;
}

function saveSettings(s: MultiplayerAdminSettings): void {
  safeLocalStorageSet(LS_KEY, JSON.stringify(s), {
    component: 'MultiplayerAdminShell',
    action: 'save-settings',
  });
}

function applyToGlobals(s: MultiplayerAdminSettings): void {
  const g = globalThis;
  g.__multiplayerSettings = s;
  g.__mpDifficulty = s.mpDifficulty;
  g.__npcDifficulty = s.mpDifficulty;
  g.__randomNews = !!s.randomNews;
  g.__adaptiveDifficultyLightEnabled = !!s.adaptiveDifficultyLight;
  g.__mode = s.mpDifficulty;
  g.__scoringWeights = normalizeWeights(s.scoringWeights);
  g.__roundTimeMode = s.roundTimeMode || 'off';
  g.__roundTimeGlobalSec = typeof s.roundTimeGlobalSec === 'number' ? s.roundTimeGlobalSec : undefined;
  g.__roundTimeGraceSec = typeof s.roundTimeGraceSec === 'number' ? s.roundTimeGraceSec : undefined;
  g.__roundTimeMatrix = (s.roundTimeMatrix && typeof s.roundTimeMatrix === 'object') ? s.roundTimeMatrix : undefined;

  g.__featureSaveLoadMenu = !!s.features?.saveLoadMenu;
  g.__featureAutoSave = !!s.features?.autoSave;
  g.__featureCoach = !!s.features?.coach;
  g.__featureWhatIfPreview = !!s.features?.whatIfPreview;
  g.__featureEventIntensity = !!s.features?.eventIntensity;
  g.__roleBasedRandomNews = !!s.features?.roleBasedRandomNews;
  g.__trainerAccessEnabled = !!s.features?.trainerAccess;
  g.__eventIntensityByDay = Array.isArray(s.eventIntensityByDay) ? s.eventIntensityByDay : Array.from({ length: 14 }, () => 1);
  g.__insolvencyMode = s.insolvencyMode ?? 'both';
  g.__mpAllowCredit = !!s.creditSettings?.enabled;

  if (s.creditSettings) {
    g.__bankSettings = {
      creditLineEUR: Number(s.creditSettings.creditLineEUR || 0),
      interestRatePct: Number(s.creditSettings.interestRatePct || 0)
    };
    g.__bankCreditLineEUR = g.__bankSettings.creditLineEUR;
    g.__bankInterestRatePct = g.__bankSettings.interestRatePct;
  }

  if (s.insolvencyConfig && s.insolvencyConfig.rules) {
    g.__insolvencyRules = s.insolvencyConfig.rules;
  }

  window.dispatchEvent(new CustomEvent('admin:settings', { detail: { multiplayerSettings: s } }));
}

export function MultiplayerAdminShell(): JSX.Element {
  const [settings, setSettings] = useState<MultiplayerAdminSettings>(loadSettings);
  const [activeTab, setActiveTab] = useState<TabId>('auth');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    saveSettings(settings);
    applyToGlobals(settings);
    setHasUnsavedChanges(false);
  }, [settings]);

  const handleReset = (): void => {
    if (confirm('Alle Einstellungen zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      const defaults = getDefaultSettings();
      setSettings(defaults);
    }
  };

  const handleExport = (): void => {
    try {
      const json = JSON.stringify(settings, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'multiplayer-settings.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      errorHandler.logError('MultiplayerAdminShell', 'Export failed', error);
      alert('Fehler beim Exportieren der Einstellungen');
    }
  };

  const handleImport = (): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = event.target?.result as string;
          const parsed = JSON.parse(json);
          const upgraded = upgradeSettings(getDefaultSettings(), parsed);
          setSettings(upgraded);
          alert('Einstellungen erfolgreich importiert!');
        } catch (error) {
          errorHandler.logError('MultiplayerAdminShell', 'Import failed', error);
          alert('Fehler beim Importieren: Ungültiges JSON-Format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const ActiveTabComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
      padding: 20
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '24px 32px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
            Multiplayer Admin Panel
          </h1>
          <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: 14 }}>
            Konfiguration für Mehrspielermodus
          </p>
        </div>

        <div style={{
          display: 'flex',
          borderBottom: '2px solid #e5e7eb',
          overflowX: 'auto'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px',
                background: activeTab === tab.id ? 'white' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? '#667eea' : '#6b7280',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              <span style={{ marginRight: 8 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: 32 }}>
          {ActiveTabComponent && (
            <ActiveTabComponent
              settings={settings}
              onUpdate={setSettings}
            />
          )}
        </div>

        <div style={{
          padding: '24px 32px',
          background: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleExport}
              style={{
                padding: '10px 20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              📤 Exportieren
            </button>
            <button
              onClick={handleImport}
              style={{
                padding: '10px 20px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              📥 Importieren
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '10px 20px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              🔄 Zurücksetzen
            </button>
          </div>

          <div style={{ fontSize: 13, color: '#6b7280' }}>
            Einstellungen werden automatisch gespeichert
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiplayerAdminShell;
