// src/admin/AdminPanelMPM.tsx
import React from 'react';
import { supabase } from '@/services/supabaseClient';
import { MultiplayerService } from '@/services/multiplayerService';
import type { RoleId } from '@/core/models/domain';
// NEU
import ScenarioEditor from '@/admin/ScenarioEditor';
import { parseScenarioFromText, compileScenario } from '@/services/scenarioLoader';


/** Schlanke, vom Einzelspielermodus getrennte Adminoberfläche NUR für den Mehrspielermodus (MPM).
 *  Persistiert ausschliesslich in localStorage('admin:multiplayer') und spiegelt in globalThis.__multiplayerSettings.
 *  Löst 'admin:settings' aus, damit laufende MP-Views (Lobby, GameView) sofort reagieren.
 */

type Difficulty = 'easy'|'normal'|'hard';
type InsolvencyMode = 'hard' | 'soft' | 'off';

type ScoringWeights = {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
};

export type InsolvencyRuleLite = { key: string; enabled: boolean; threshold: number };
export type InsolvencyRulesMapLite = Record<string, InsolvencyRuleLite>;
export type InsolvencyConfigLite = { rules: InsolvencyRulesMapLite };

type KPI = {
  cashEUR?: number;
  profitLossEUR?: number;
  customerLoyalty?: number;
  bankTrust?: number;
  workforceEngagement?: number;
  publicPerception?: number;
};


type MultiplayerAdminSettings = {
  // Auth & Lobby
  authMode: 'email' | 'name-only' | 'preset-credentials';
  allowEarlyEntry: boolean;
  forceAllPlayersForAdvance: boolean;
  autoStartWhenReady: boolean;
  autoStartDelaySeconds: number;
  lobbyCountdownSeconds: number;
  presetCredentials: {

  /** NEU: Start-Optionen (zentraler Container) */
  start?: {
    /** Startmodus */
    mode?: 'manual' | 'auto_all_logged_in' | 'scheduled' | 'trainer';
    /** Freigabe: Spieler dürfen selbst starten (globale Wirkung) */
    allowPlayerSelfStart?: boolean;
    /** Optional: Geplante Startzeit (nur bei mode='scheduled'), ISO-String */
    at?: string;
    /** Optional: Geplante Startzeit als Epochenzeit (ms) – Redundanz/Fallback */
    atMs?: number;
    /** Optional: Countdown-Verzögerung (Sekunden) für auto_all_logged_in */
    delaySeconds?: number;
  };

    
    CEO: { username: string; password: string };
    CFO: { username: string; password: string };
    OPS: { username: string; password: string };
    HRLEGAL: { username: string; password: string };
  };
  lobbySettings: {
    showTimer: boolean;
    backgroundTheme: 'corporate' | 'dynamic' | 'minimal';
    welcomeMessage?: string;
  };

  // Spielseite
  gameSettings: {
    backgroundTheme: 'corporate' | 'dynamic' | 'minimal';
    allowUserOverride: boolean;
  };

  // Rundenzeit
  roundTimeMode: 'off'|'global'|'matrix';
  roundTimeGlobalSec?: number;
  roundTimeGraceSec?: number;
  roundTimeMatrix?: Record<number, { CEO:number; CFO:number; OPS:number; HRLEGAL:number; }>;

  // Schwierigkeits-/Simulationsparameter
  mpDifficulty: Difficulty;
  randomNews: boolean;
  adaptiveDifficultyLight: boolean;
  scoringWeights: ScoringWeights;
  eventIntensityByDay: number[];

  // Bank/Kredit
  creditSettings: {
    enabled: boolean;
    creditLineEUR: number;
    interestRatePct: number;
  };

  // Feature-Schalter
  features: {
    saveLoadMenu: boolean;
    autoSave: boolean;
    coach?: boolean;
    whatIfPreview: boolean;
    eventIntensity: boolean;
    /** NEU: steuert Trainer-Rolle im Login */
    trainerAccess?: boolean;
     /** NEU: rollenspezifische Zufalls-News (wirkt auch im MP-Client für Sicht) */
   roleBasedRandomNews?: boolean;
  };


  
  // Insolvenz (MP übernimmt Modus + lite-Regeln)
  insolvencyMode: InsolvencyMode;
  insolvencyConfig?: InsolvencyConfigLite;
};


const LS_KEY = 'admin:multiplayer';

function validateSettings(s: MultiplayerAdminSettings): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!s.mpDifficulty || !['easy', 'normal', 'hard'].includes(s.mpDifficulty)) {
    errors.push('Ungültige Schwierigkeit');
  }

  if (!s.authMode || !['email', 'name-only', 'preset-credentials'].includes(s.authMode)) {
    errors.push('Ungültiger Authentifizierungsmodus');
  }

  if (s.roundTimeMode && !['off', 'global', 'matrix'].includes(s.roundTimeMode)) {
    errors.push('Ungültiger Rundenzeitmodus');
  }

  if (s.insolvencyMode && !['hard', 'soft', 'off'].includes(s.insolvencyMode)) {
    errors.push('Ungültiger Insolvenzmodus');
  }

  if (s.creditSettings) {
    if (typeof s.creditSettings.creditLineEUR !== 'number' || s.creditSettings.creditLineEUR < 0) {
      errors.push('Ungültige Kreditlinie');
    }
    if (typeof s.creditSettings.interestRatePct !== 'number' || s.creditSettings.interestRatePct < 0) {
      errors.push('Ungültiger Zinssatz');
    }
  }

  if (!Array.isArray(s.eventIntensityByDay) || s.eventIntensityByDay.length !== 14) {
    errors.push('Ungültige Event-Intensität-Daten');
  }

  // NEU: Start-Validierung
  const m = s.start?.mode;
  if (m && !['manual','auto_all_logged_in','scheduled','trainer'].includes(m)) {
    errors.push('Ungültiger Startmodus');
  }
  if (m === 'scheduled') {
    const hasAt = !!s.start?.at || typeof s.start?.atMs === 'number';
    if (!hasAt) errors.push('Startmodus "scheduled": Startzeit fehlt (start.at oder start.atMs).');
  }
  if (m === 'auto_all_logged_in') {
    const d = s.start?.delaySeconds;
    if (d !== undefined && (typeof d !== 'number' || d < 0 || !isFinite(d))) {
      errors.push('Startmodus "auto_all_logged_in": delaySeconds ungültig.');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}


function normalizeWeights(w?: Partial<ScoringWeights> | null): ScoringWeights {
  const toNum = (n: any, fallback: number) => {
    const x = Number(n);
    return isFinite(x) && x >= 0 ? x : fallback;
  };
  const base = {
    bankTrust:           toNum(w?.bankTrust, 25),
    publicPerception:    toNum(w?.publicPerception, 25),
    customerLoyalty:     toNum(w?.customerLoyalty, 25),
    workforceEngagement: toNum(w?.workforceEngagement, 25),
  };
  let sum = base.bankTrust + base.publicPerception + base.customerLoyalty + base.workforceEngagement;
  if (!isFinite(sum) || sum <= 0) {
    return { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 };
  }
  const f = 100 / sum;
  const out = {
    bankTrust:           Math.round(base.bankTrust * f),
    publicPerception:    Math.round(base.publicPerception * f),
    customerLoyalty:     Math.round(base.customerLoyalty * f),
    workforceEngagement: Math.round(base.workforceEngagement * f),
  };
  // Rundungsdrift auf exakt 100% korrigieren
  const drift = 100 - (out.bankTrust + out.publicPerception + out.customerLoyalty + out.workforceEngagement);
  if (drift !== 0) {
    const keys = ['bankTrust','publicPerception','customerLoyalty','workforceEngagement'] as const;
    let maxKey = keys[0]; let maxVal = out[maxKey];
    for (const k of keys) { if (out[k] > maxVal) { maxVal = out[k]; maxKey = k; } }
    (out as any)[maxKey] = out[maxKey] + drift;
  }
  return out;
}


function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
  let password = '';
  for (let i = 0; i < 12; i++) password += chars.charAt(Math.floor(Math.random() * chars.length));
  return password;
}
function getDefaultSettings(): MultiplayerAdminSettings {
  return {
    authMode: 'name-only',
    allowEarlyEntry: false,
    forceAllPlayersForAdvance: false,
    autoStartWhenReady: false,
    autoStartDelaySeconds: 5,
    lobbyCountdownSeconds: 10,

    /** NEU: Start-Defaults */
    start: {
      mode: 'manual',
      allowPlayerSelfStart: false,
      delaySeconds: 5
      // at/atMs optional
    },

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

    // ▼ neu
    insolvencyMode: 'hard',

    scoringWeights: { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 },
    eventIntensityByDay: Array.from({ length: 14 }, () => 1),
    features: { saveLoadMenu: false, autoSave: false, coach: false, whatIfPreview: false, eventIntensity: false, trainerAccess: false, roleBasedRandomNews: false },
    insolvencyConfig: undefined,
  };
}




function upgradeSettings(base: MultiplayerAdminSettings, raw: any): MultiplayerAdminSettings {
  const s: any = { ...base, ...(raw || {}) };

  // Verschachtelte Objekte mit Defaults mergen
  s.features          = { ...base.features,          ...(raw?.features || {}) };
  s.presetCredentials = { ...base.presetCredentials, ...(raw?.presetCredentials || {}) };
  s.lobbySettings     = { ...base.lobbySettings,     ...(raw?.lobbySettings || {}) };
  s.gameSettings      = { ...base.gameSettings,      ...(raw?.gameSettings || {}) };
  s.creditSettings    = { ...base.creditSettings,    ...(raw?.creditSettings || {}) };

  // NEU: Start-Container robust mergen
  s.start = {
    ...(base.start || { mode: 'manual', allowPlayerSelfStart: false, delaySeconds: base.autoStartDelaySeconds }),
    ...(raw?.start || {})
  };
  if (typeof s.start.delaySeconds !== 'number' || !isFinite(s.start.delaySeconds)) {
    s.start.delaySeconds = base.autoStartDelaySeconds;
  }

  // Arrays / optionale Felder defensiv übernehmen
  s.eventIntensityByDay = Array.isArray(raw?.eventIntensityByDay) ? raw.eventIntensityByDay : base.eventIntensityByDay;
  s.roundTimeMatrix     = raw?.roundTimeMatrix ?? base.roundTimeMatrix;
  s.roundTimeMode       = raw?.roundTimeMode   ?? base.roundTimeMode;
  s.roundTimeGlobalSec  = typeof raw?.roundTimeGlobalSec === 'number' ? raw.roundTimeGlobalSec : base.roundTimeGlobalSec;
  s.roundTimeGraceSec   = typeof raw?.roundTimeGraceSec  === 'number' ? raw.roundTimeGraceSec  : base.roundTimeGraceSec;

  s.insolvencyMode   = raw?.insolvencyMode   ?? base.insolvencyMode;
  s.insolvencyConfig = raw?.insolvencyConfig ?? base.insolvencyConfig;

  // Kritisch: scoringWeights *immer* valide & normiert
  s.scoringWeights = normalizeWeights(raw?.scoringWeights);

  return s as MultiplayerAdminSettings;
}



function loadSettings(): MultiplayerAdminSettings {
  const base = getDefaultSettings();
  const saved = localStorage.getItem(LS_KEY);
  if (saved) {
    try {
      const raw = JSON.parse(saved);
      return upgradeSettings(base, raw);
    } catch {}
  }
  return base;
}


function saveSettings(s: MultiplayerAdminSettings) {
  try {
    const serialized = JSON.stringify(s);
    localStorage.setItem(LS_KEY, serialized);
  } catch (e) {
    console.error('[AdminPanelMPM] Failed to save settings to localStorage:', e);
    throw new Error('Speichern der Einstellungen fehlgeschlagen. Möglicherweise ist der Speicher voll.');
  }
}

function applyToGlobals(s: MultiplayerAdminSettings) {
  try {
    const g: any = globalThis as any;
    // Spiel-/Lobby-Themes
    g.__multiplayerSettings = s;
    // Schwierigkeits-/Simulations-Flags
    g.__mpDifficulty = s.mpDifficulty;
    g.__npcDifficulty = s.mpDifficulty; // Kompatibilität
    g.__randomNews = !!s.randomNews;
    g.__adaptiveDifficultyLightEnabled = !!s.adaptiveDifficultyLight;

    // NEU: Difficulty-Kompatibilität
    g.__mode = s.mpDifficulty;

    g.__scoringWeights = normalizeWeights(s.scoringWeights);
    // Rundenzeiten
    g.__roundTimeMode = s.roundTimeMode || 'off';
    g.__roundTimeGlobalSec = typeof s.roundTimeGlobalSec === 'number' ? s.roundTimeGlobalSec : undefined;
    g.__roundTimeGraceSec  = typeof s.roundTimeGraceSec  === 'number' ? s.roundTimeGraceSec  : undefined;
    g.__roundTimeMatrix    = (s.roundTimeMatrix && typeof s.roundTimeMatrix === 'object') ? s.roundTimeMatrix : undefined;

    // Features
    g.__featureSaveLoadMenu   = !!s.features?.saveLoadMenu;
    g.__featureAutoSave       = !!s.features?.autoSave;
    g.__featureCoach          = !!s.features?.coach;
    g.__featureWhatIfPreview  = !!s.features?.whatIfPreview;
    g.__featureEventIntensity = !!s.features?.eventIntensity;
    g.__roleBasedRandomNews   = !!s.features?.roleBasedRandomNews;
    g.__trainerAccessEnabled  = !!s.features?.trainerAccess;
    // NEU: Event-Intensity (für GameView)
    g.__eventIntensityByDay = Array.isArray(s.eventIntensityByDay) ? s.eventIntensityByDay : Array.from({ length: 14 }, () => 1);

    // NEU: Insolvenzmodus
    g.__insolvencyMode = s.insolvencyMode ?? 'hard';


    // CFO-Kredit (Legacy‑Schalter)
    g.__mpAllowCredit = !!s.creditSettings?.enabled;

    // NEU: Bank-Settings zusätzlich unter SP-kompatiblen Keys spiegeln
    if (s.creditSettings) {
      g.__bankSettings = {
        creditLineEUR: Number(s.creditSettings.creditLineEUR || 0),
        interestRatePct: Number(s.creditSettings.interestRatePct || 0)
      };
      g.__bankCreditLineEUR   = g.__bankSettings.creditLineEUR;
      g.__bankInterestRatePct = g.__bankSettings.interestRatePct;
    }

    // Insolvenzregeln (aus Einzelspieler‑Admin übernommen, falls vorhanden)
    if (s.insolvencyConfig && s.insolvencyConfig.rules) {
      g.__insolvencyRules = s.insolvencyConfig.rules;
    }

    // Event-Dispatch mit verbessertem Error Handling
    try {
      window.dispatchEvent(new CustomEvent('admin:settings', { detail: { multiplayerSettings: s } }));
    } catch (eventError) {
      console.error('[AdminPanelMPM] Failed to dispatch admin:settings event:', eventError);
    }
  } catch (e) {
    console.error('[AdminPanelMPM] Failed to apply settings to globals:', e);
    throw new Error('Anwenden der Einstellungen fehlgeschlagen.');
  }
}

const box: React.CSSProperties = { border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, background: '#fff', marginTop: 16 };

function SectionMultiplayer({ settings, setSettings }: { 
  settings: MultiplayerAdminSettings; 
  setSettings: (updater: (prev: MultiplayerAdminSettings) => MultiplayerAdminSettings) => void; 
}) {



  
  const roles = ['CEO', 'CFO', 'OPS', 'HRLEGAL'] as const;

  const mpGenerateCredentials = () => {
    const newCredentials = {} as typeof settings.presetCredentials;
    roles.forEach(role => {
      newCredentials[role] = {
        username: `${role.toLowerCase()}_${Math.random().toString(36).substring(7)}`,
        password: generatePassword()
      };
    });
    setSettings(s => ({ ...s, presetCredentials: newCredentials }));
  };

  const handleCopyCredentials = async () => {
    try {
      const text = Object.entries(settings.presetCredentials)
        .map(([role, creds]) => `${role}: ${creds.username} / ${creds.password}`)
        .join('\n');

      await navigator.clipboard.writeText(text);
      alert('Alle Zugangsdaten wurden in die Zwischenablage kopiert.');
    } catch (err) {
      console.error('Fehler beim Kopieren:', err);
      alert('Kopieren in die Zwischenablage nicht möglich.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Authentifizierung */}
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Authentifizierung</h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Anmelde‑Modus
          </label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                checked={settings.authMode === 'name-only'}
                onChange={() => setSettings(s => ({ ...s, authMode: 'name-only' }))}
              />
              Nur Name (Anonym)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                checked={settings.authMode === 'email'}
                onChange={() => setSettings(s => ({ ...s, authMode: 'email' }))}
              />
              Email‑Registrierung
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                checked={settings.authMode === 'preset-credentials'}
                onChange={() => setSettings(s => ({ ...s, authMode: 'preset-credentials' }))}
              />
              Vorgegebene Zugangsdaten
            </label>
          </div>
        </div>

        {settings.authMode === 'preset-credentials' && (
          <div style={{ marginTop: 20, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ margin: 0 }}>Zugangsdaten für Rollen</h4>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={mpGenerateCredentials}
                  style={{ padding: '6px 12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
                  🎲 Neue generieren
                </button>
                <button onClick={handleCopyCredentials}
                  style={{ padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>
                  📋 Alle kopieren
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {roles.map(role => (
                <div key={role} style={{ padding: 12, background: 'white', borderRadius: 6, border: '1px solid #e5e7eb' }}>
                  <h5 style={{ margin: '0 0 8px', color: '#374151' }}>{role}</h5>
                  <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div><span style={{ color: '#6b7280' }}>User:</span>{' '}
                      <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
                        {settings.presetCredentials[role].username}
                      </span>
                    </div>
                    <div><span style={{ color: '#6b7280' }}>Pass:</span>{' '}
                      <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
                        {settings.presetCredentials[role].password}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spielstart‑Regeln */}
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Spielstart‑Regeln</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.allowEarlyEntry}
              onChange={e => setSettings(s => ({ ...s, allowEarlyEntry: e.target.checked }))}
            />
            <span>Spieler können das SPIEL starten/beitreten, auch wenn nicht alle da sind (Einzelstart möglich)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.forceAllPlayersForAdvance}
              onChange={e => setSettings(s => ({ ...s, forceAllPlayersForAdvance: e.target.checked }))}
            />
            <span>Alle Spieler müssen ihre Entscheidungen abgeben vor Tageswechsel</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.autoStartWhenReady}
              onChange={e => setSettings(s => ({ ...s, autoStartWhenReady: e.target.checked }))}
            />
            <span>Automatischer Start wenn alle bereit sind</span>
          </label>

          {settings.autoStartWhenReady && (
            <div style={{ marginLeft: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
              <label>Verzögerung (Sekunden):</label>
              <input
                type="number"
                min={0}
                max={60}
                value={settings.autoStartDelaySeconds}
                onChange={e => setSettings(s => ({ ...s, autoStartDelaySeconds: parseInt(e.target.value) || 0 }))}
                style={{ width: 80, padding: '4px 8px', borderRadius: 4 }}
              />
            </div>
          )}
        </div>
      </div>

      {/* MP‑Schwierigkeit */}
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Schwierigkeit (Mehrspielermodus)</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="radio"
              name="mp-difficulty"
              checked={(settings.mpDifficulty || 'normal') === 'easy'}
              onChange={() => setSettings(s => ({ ...s, mpDifficulty: 'easy' }))}
            />
            Easy
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="radio"
              name="mp-difficulty"
              checked={(settings.mpDifficulty || 'normal') === 'normal'}
              onChange={() => setSettings(s => ({ ...s, mpDifficulty: 'normal' }))}
            />
            Normal
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="radio"
              name="mp-difficulty"
              checked={(settings.mpDifficulty || 'normal') === 'hard'}
              onChange={() => setSettings(s => ({ ...s, mpDifficulty: 'hard' }))}
            />
            Hard
          </label>
        </div>
        <div className="small" style={{ marginTop: 6, color: '#6b7280' }}>
          Wirkt nur im Mehrspielermodus auf: (1) <em>Zufalls‑News</em> (Anteil <strong>critical</strong> steigt mit Schwierigkeit) und
          (2) negative Zufallswerte bei <em>Cash</em> &amp; <em>P&amp;L</em> (Hard ≙ ×1.3, Easy ≙ ×0.7). NPC‑Entscheidungen bleiben unberührt.
        </div>
      </div>

      {/* CFO‑Kredit */}
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>💰 CFO Kreditaufnahme (Mehrspielermodus)</h3>

        <div style={{ marginBottom: 16, padding: 12, background: '#f0f9ff', borderRadius: 8, border: '1px solid #bae6fd' }}>
          <p style={{ margin: 0, fontSize: 13, color: '#0c4a6e' }}>
            Aktiviert die Kreditaufnahme‑Mechanik aus dem Einzelspielermodus speziell für den CFO im MP.
          </p>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <input
            type="checkbox"
            checked={settings.creditSettings?.enabled ?? false}
            onChange={e => setSettings(s => ({
              ...s,
              creditSettings: {
                ...s.creditSettings,
                enabled: e.target.checked,
                creditLineEUR: s.creditSettings?.creditLineEUR ?? 500000,
                interestRatePct: s.creditSettings?.interestRatePct ?? 8.5
              }
            }))}
          />
          <span style={{ fontWeight: 600 }}>Kreditaufnahme für CFO aktivieren</span>
        </label>

        {settings.creditSettings?.enabled && (
          <div style={{ padding: 16, background: 'white', borderRadius: 8, border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: '#374151' }}>Kreditlinie (EUR)</label>
              <input
                type="number"
                value={settings.creditSettings?.creditLineEUR ?? 500000}
                onChange={e => setSettings(s => ({ ...s, creditSettings: { ...s.creditSettings!, creditLineEUR: parseInt(e.target.value) || 0 } }))}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                placeholder="z.B. 500000"
              />
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>Maximaler Kreditrahmen für den CFO.</div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 13, color: '#374151' }}>Zinssatz p.a. (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.creditSettings?.interestRatePct ?? 8.5}
                onChange={e => setSettings(s => ({ ...s, creditSettings: { ...s.creditSettings!, interestRatePct: parseFloat(e.target.value) || 0 } }))}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14 }}
                placeholder="z.B. 8.5"
              />
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>Jährlicher Zinssatz (Abzug täglich p.a./365).</div>
            </div>
          </div>
        )}
      </div>

      {/* Warteraum (Lobby) */}
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Warteraum (Lobby)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.lobbySettings.showTimer}
              onChange={e => setSettings(s => ({
                ...s,
                lobbySettings: { ...s.lobbySettings, showTimer: e.target.checked }
              }))}
            />
            <span>Countdown‑Timer beim Start anzeigen</span>
          </label>

          {settings.lobbySettings.showTimer && (
            <div style={{ marginLeft: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
              <label>Countdown (Sekunden):</label>
              <input
                type="number"
                min={3}
                max={10}
                value={settings.lobbyCountdownSeconds}
                onChange={e => setSettings(s => ({ ...s, lobbyCountdownSeconds: parseInt(e.target.value) || 3 }))}
                style={{ width: 80, padding: '4px 8px', borderRadius: 4 }}
              />
            </div>
          )}

          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
              Lobby‑Design
            </label>
            <select
              value={settings.lobbySettings.backgroundTheme}
              onChange={e => setSettings(s => ({
                ...s,
                lobbySettings: { ...s.lobbySettings, backgroundTheme: e.target.value as any }
              }))}
              style={{ padding: '6px 12px', borderRadius: 6, width: '100%', maxWidth: 300 }}
            >
              <option value="corporate">Corporate (Professionell)</option>
              <option value="dynamic">Dynamic (Animiert)</option>
              <option value="minimal">Minimal (Schlicht)</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
              Willkommensnachricht
            </label>
            <textarea
              value={settings.lobbySettings.welcomeMessage}
              onChange={e => setSettings(s => ({
                ...s,
                lobbySettings: { ...s.lobbySettings, welcomeMessage: e.target.value }
              }))}
              placeholder="z.B. Willkommen zur Crisis Management Simulation!"
              style={{
                width: '100%',
                minHeight: 60,
                padding: 8,
                borderRadius: 6,
                border: '1px solid #e5e7eb',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionGameTheme({
  settings,
  setSettings
}: {
  settings: MultiplayerAdminSettings;
  setSettings: (updater: (prev: MultiplayerAdminSettings) => MultiplayerAdminSettings) => void;
}) {
  return (
    <div style={box}>
      <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Spielseite – Theme</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontWeight: 600, display: 'block' }}>Hintergrund</label>
        <select
          value={settings.gameSettings?.backgroundTheme ?? 'dynamic'}
          onChange={e =>
            setSettings(s => ({
              ...s,
              gameSettings: {
                ...(s.gameSettings ?? { allowUserOverride: false }),
                backgroundTheme: e.target.value as any
              }
            }))
          }
          style={{ padding: '6px 12px', borderRadius: 6, width: '100%', maxWidth: 300 }}
        >
          <option value="dynamic">Dynamic (animiertes Neuronen‑Netz)</option>
          <option value="minimal">Minimal (schlicht, hell)</option>
          <option value="corporate">Corporate (statisch, dunkel)</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={!!settings.gameSettings?.allowUserOverride}
            onChange={e =>
              setSettings(s => ({
                ...s,
                gameSettings: {
                  ...(s.gameSettings ?? { backgroundTheme: 'dynamic' }),
                  allowUserOverride: e.target.checked
                }
              }))
            }
          />
          <span>Spieler dürfen Theme überschreiben</span>
        </label>

        <div className="small" style={{ color: '#6b7280' }}>
          Benutzer‑Override via URL (<code>?gameTheme=…</code>) oder 🎨‑Widget auf der Spielseite (wenn aktiviert).
        </div>
      </div>
    </div>
  );
}

/** ───────────────────────── Gameplay/Features (MP) ───────────────────────── */
function SectionGameplayMP({
  settings, setSettings
}:{ settings: MultiplayerAdminSettings; setSettings: React.Dispatch<React.SetStateAction<MultiplayerAdminSettings>>; }) {
  return (
    <div style={box}>
      <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Gameplay &amp; Features</h3>

      {/* Zufalls-News */}
      <label style={{ display:'flex', alignItems:'center', gap:8 }}>
        <input
          type="checkbox"
          checked={!!settings.randomNews}
          onChange={e => setSettings(s => ({ ...s, randomNews: e.target.checked }))}
        />
        <span>Zufalls‑News aktiv</span>
      </label>
{/* Rollenspezifische Zufalls-News */}
     <label style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
       <input
         type="checkbox"
         checked={!!settings.features?.roleBasedRandomNews}
         onChange={e => setSettings(s => ({ ...s, features: { ...(s.features||{}), roleBasedRandomNews: e.target.checked } }))}
       />
       <span>Rollenspezifische Zufalls‑News</span>
     </label>
      {/* Adaptive Difficulty (Light) */}
      <label style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
        <input
          type="checkbox"
          checked={!!settings.adaptiveDifficultyLight}
          onChange={e => setSettings(s => ({ ...s, adaptiveDifficultyLight: e.target.checked }))}
        />
        <span>Adaptive Difficulty (Light)</span>
      </label>

      <div style={{ height:8 }} />

      {/* Feature‑Schalter */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:8 }}>
        <label><input type="checkbox"
          checked={!!settings.features?.saveLoadMenu}
          onChange={e => setSettings(s => ({ ...s, features:{ ...(s.features||{}), saveLoadMenu: e.target.checked } }))}
        /> Speicher-/Laden‑Menü</label>

        <label><input type="checkbox"
          checked={!!settings.features?.autoSave}
          onChange={e => setSettings(s => ({ ...s, features:{ ...(s.features||{}), autoSave: e.target.checked } }))}
        /> Auto‑Save</label>

        <label><input type="checkbox"
          checked={!!settings.features?.coach}
          onChange={e => setSettings(s => ({ ...s, features:{ ...(s.features||{}), coach: e.target.checked } }))}
        /> Coach</label>

        <label><input type="checkbox"
          checked={!!settings.features?.eventIntensity}
          onChange={e => setSettings(s => ({ ...s, features:{ ...(s.features||{}), eventIntensity: e.target.checked } }))}
        /> Event‑Intensity (Feature)</label>
      </div>
    </div>
  );
}

/** ───────────────────────── Trainer-Teilnahme (Schalter) ───────────────────────── */
function SectionTrainerAccess({
  settings, setSettings
}:{
  settings: MultiplayerAdminSettings;
  setSettings: React.Dispatch<React.SetStateAction<MultiplayerAdminSettings>>;
}) {
  const enabled = !!settings.features?.trainerAccess;

  const handleTrainerAccessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(s => ({
      ...s,
      features: { ...(s.features||{}), trainerAccess: e.target.checked }
    }));
  };

  return (
    <div style={box}>
      <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Trainer*in‑Teilnahme</h3>
      <label style={{ display:'flex', alignItems:'center', gap:8 }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleTrainerAccessChange}
        />
        <span>Trainer*in‑Teilnahme aktivieren (fünfte Rolle im Login sichtbar)</span>
      </label>
      <div className="small" style={{ color:'#6b7280', marginTop:6 }}>
        Der/die Trainer*in meldet sich künftig über das Login‑Panel als Rolle <strong>TRAINER</strong> an (passwortgeschützt).
        Das Adminpanel enthält keinen Trainer‑Login mehr.
      </div>
    </div>
  );
}


/** ───────────────────────── Rundenzeiten (MP) ───────────────────────── */
function SectionRoundTimeMP({
  settings, setSettings
}:{ settings: MultiplayerAdminSettings; setSettings: React.Dispatch<React.SetStateAction<MultiplayerAdminSettings>>; }) {
  const roles = ['CEO','CFO','OPS','HRLEGAL'] as const;
  const days  = Array.from({length:14}, (_,i)=>i+1);
  const mode = settings.roundTimeMode || 'off';
  const matrix = settings.roundTimeMatrix || {};
  const globalSec = Number(settings.roundTimeGlobalSec || 0);
  const graceSec  = Number(settings.roundTimeGraceSec  || 180);

  const setMode       = (m:'off'|'global'|'matrix') => setSettings(s => ({ ...s, roundTimeMode: m }));
  const setGlobalSec  = (n:number) => setSettings(s => ({ ...s, roundTimeGlobalSec: n }));
  const setGraceSec   = (n:number) => setSettings(s => ({ ...s, roundTimeGraceSec: n }));
  const setCell = (day:number, role:(typeof roles)[number], n:number) => {
    setSettings(s => {
      const base = { ...(s.roundTimeMatrix||{}) } as any; const row = { ...(base[day]||{}) };
      row[role] = n; return { ...s, roundTimeMatrix: { ...base, [day]: row } };
    });
  };

  return (
    <div style={box}>
      <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Rundenzeiten</h3>

      <div style={{ display:'flex', gap:12, alignItems:'center' }}>
        <span style={{ fontWeight:600, minWidth:180 }}>Modus</span>
        <label><input type="radio" name="rtmode" checked={mode==='off'} onChange={()=>setMode('off')} /> Automatik</label>
        <label><input type="radio" name="rtmode" checked={mode==='global'} onChange={()=>setMode('global')} /> Global</label>
        <label><input type="radio" name="rtmode" checked={mode==='matrix'} onChange={()=>setMode('matrix')} /> Matrix (Tag×Rolle)</label>
      </div>

      {mode === 'global' && (
        <div style={{ display:'flex', gap:12, alignItems:'center', marginTop:8 }}>
          <label>Rundenzeit gesamt (Sek.) <input type="number" min={0} value={isFinite(globalSec)?globalSec:0}
            onChange={e=>setGlobalSec(Number((e.target as HTMLInputElement).value)||0)} /></label>
          <label>Grace (Sek.) <input type="number" min={0} value={isFinite(graceSec)?graceSec:0}
            onChange={e=>setGraceSec(Number((e.target as HTMLInputElement).value)||0)} /></label>
        </div>
      )}

      {mode === 'matrix' && (
        <div style={{ marginTop:8 }}>
          <div style={{ overflowX:'auto', border:'1px solid #e5e7eb', borderRadius:8 }}>
            <table style={{ borderCollapse:'collapse', width:'100%' }}>
              <thead>
                <tr>
                  <th style={{ textAlign:'left', padding:'6px 8px', borderBottom:'1px solid #e5e7eb' }}>Tag</th>
                  {roles.map(r => <th key={r} style={{ textAlign:'right', padding:'6px 8px', borderBottom:'1px solid #e5e7eb' }}>{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {days.map(day => {
                  const rowv:any = (matrix as any)[day] || {};
                  return (
                    <tr key={day}>
                      <td style={{ padding:'6px 8px', borderBottom:'1px solid #f3f4f6' }}>{day}</td>
                      {roles.map(role => (
                        <td key={role} style={{ padding:'4px 8px', borderBottom:'1px solid #f3f4f6', textAlign:'right' }}>
                          <input type="number" min={0} value={Number(rowv[role] ?? 480)}
                            onChange={e=>setCell(day, role, Number((e.target as HTMLInputElement).value)||0)}
                            style={{ width:96 }} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ display:'flex', gap:12, alignItems:'center', marginTop:8 }}>
            <label>Grace (Sek.) <input type="number" min={0} value={isFinite(graceSec)?graceSec:0}
              onChange={e=>setGraceSec(Number((e.target as HTMLInputElement).value)||0)} /></label>
          </div>
        </div>
      )}
    </div>
  );
}

/** ───────────────────────── Scoring (MP) ───────────────────────── */
function SectionScoringMP({
  settings, setSettings
}:{ settings: MultiplayerAdminSettings; setSettings: React.Dispatch<React.SetStateAction<MultiplayerAdminSettings>>; }) {
  const [local, setLocal] = React.useState<ScoringWeights>({...settings.scoringWeights});
  React.useEffect(()=>{ setLocal({...settings.scoringWeights}); }, [settings.scoringWeights]);

  const setField = (key: keyof ScoringWeights, val: number) => {
    const v = Math.max(0, Math.min(100, Math.round(val)));
    setLocal(s => ({ ...s, [key]: v } as ScoringWeights));
    setSettings(s => ({ ...s, scoringWeights: { ...s.scoringWeights, [key]: v } }));
  };
  const total = local.bankTrust + local.publicPerception + local.customerLoyalty + local.workforceEngagement;
  const warn = total !== 100;

  return (
    <div style={box}>
      <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>Endwertung</h3>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0, 1fr))', gap:8 }}>
        <label>Bankvertrauen (%)<input type="number" value={local.bankTrust} min={0} max={100} onChange={e=>setField('bankTrust', Number((e.target as HTMLInputElement).value)||0)} /></label>
        <label>Öffentliche Wahrnehmung (%)<input type="number" value={local.publicPerception} min={0} max={100} onChange={e=>setField('publicPerception', Number((e.target as HTMLInputElement).value)||0)} /></label>
        <label>Kundentreue (%)<input type="number" value={local.customerLoyalty} min={0} max={100} onChange={e=>setField('customerLoyalty', Number((e.target as HTMLInputElement).value)||0)} /></label>
        <label>Belegschaft (%)<input type="number" value={local.workforceEngagement} min={0} max={100} onChange={e=>setField('workforceEngagement', Number((e.target as HTMLInputElement).value)||0)} /></label>
      </div>
      {warn && <div style={{ marginTop:8, color:'#b45309' }}>Wird beim Übernehmen automatisch auf 100% normalisiert.</div>}
    </div>
  );
}

/** ───────────────────────── Event‑Intensity (MP) ───────────────────────── */
function SectionEventIntensityMP({
  settings, setSettings
}:{ settings: MultiplayerAdminSettings; setSettings: React.Dispatch<React.SetStateAction<MultiplayerAdminSettings>>; }) {
  const arr = Array.isArray(settings.eventIntensityByDay) ? settings.eventIntensityByDay : Array.from({length:14}, ()=>1);
  const setIdx = (i:number, v:number) => {
    setSettings(s => {
      const next = [...(Array.isArray(s.eventIntensityByDay) ? s.eventIntensityByDay : Array.from({length:14}, ()=>1))];
      next[i] = v; return { ...s, eventIntensityByDay: next };
    });
  };
  return (
    <div style={box}>
      <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>Ereignis‑Intensität (14 Tage)</h3>

      <label style={{ display:'flex', alignItems:'center', gap:8 }}>
        <input type="checkbox"
          checked={!!settings.features?.eventIntensity}
          onChange={e=> setSettings(s => ({ ...s, features: { ...(s.features||{}), eventIntensity: e.target.checked } }))}
        />
        <span>Feature aktiv</span>
      </label>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(7, minmax(0, 1fr))', gap:6, marginTop:8 }}>
        {arr.map((v, i)=>(
          <label key={i} style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <span style={{ fontSize:11, color:'#6b7280' }}>Tag {i+1}</span>
            <input type="number" step="0.1" min={0}
              value={Number(v ?? 1)}
              onChange={e => setIdx(i, Number((e.target as HTMLInputElement).value) || 0)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

/** ───────────────────────── Insolvenz (MP) ───────────────────────── */
function SectionInsolvencyMP({
  settings, setSettings
}:{ settings: MultiplayerAdminSettings; setSettings: React.Dispatch<React.SetStateAction<MultiplayerAdminSettings>>; }) {
  const rules = (settings.insolvencyConfig?.rules || {}) as InsolvencyRulesMapLite;
  const labelFor = (k: string) => {
    switch (k) {
      case 'cashEUR': return 'Cash (effektiv, inkl. Pending‑Draw) < Schwelle';
      case 'profitLossEUR': return 'P&L (kumuliert) < Schwelle';
      case 'customerLoyalty': return 'Kundenloyalität < Schwelle';
      case 'bankTrust': return 'Bankvertrauen < Schwelle';
      case 'workforceEngagement': return 'Team‑Engagement < Schwelle';
      case 'publicPerception': return 'Öffentl. Wahrnehmung < Schwelle';
      case 'debt': return 'Verschuldung (genutzter Kredit) < Schwelle';
      case 'receivables': return 'Forderungen < Schwelle';
      default: return k;
    }
  };
  const keys = ['cashEUR','profitLossEUR','customerLoyalty','bankTrust','workforceEngagement','publicPerception','debt','receivables'] as const;
  const updateRule = (key: string, patch: Partial<InsolvencyRuleLite>) => {
    setSettings(s => {
      const curr = (s.insolvencyConfig?.rules || {}) as InsolvencyRulesMapLite;
      const next = { ...curr, [key]: { ...(curr as any)[key], ...patch, key } as InsolvencyRuleLite };
      return { ...s, insolvencyConfig: { rules: next } };
    });
  };

  const handleRuleEnabledChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRule(key, { enabled: e.target.checked });
  };

  const handleRuleThresholdChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateRule(key, { threshold: Number(e.currentTarget.value) || 0 });
  };

  return (
    <div style={box}>
      <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>Insolvenz</h3>

      {/* Modus */}
      <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:8 }}>
        <span style={{ fontWeight:600, minWidth:180 }}>Modus</span>
        <label><input type="radio" name="insomode" checked={settings.insolvencyMode==='hard'} onChange={()=>setSettings(s=>({ ...s, insolvencyMode:'hard' }))}/> Abbruch (hart)</label>
        <label><input type="radio" name="insomode" checked={settings.insolvencyMode==='soft'} onChange={()=>setSettings(s=>({ ...s, insolvencyMode:'soft' }))}/> Hinweis (weich)</label>
        <label><input type="radio" name="insomode" checked={settings.insolvencyMode==='off'} onChange={()=>setSettings(s=>({ ...s, insolvencyMode:'off' }))}/> Keine Meldung (aus)</label>
      </div>

      {/* Regeln */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        {keys.map(k => {
          const r:any = (rules as any)[k] || { key:k, enabled:false, threshold:0 };
          return (
            <div key={k} style={{ border:'1px solid #e5e7eb', borderRadius:8, padding:12 }}>
              <label style={{ display:'flex', alignItems:'center', gap:8 }}>
                <input type="checkbox" checked={!!r.enabled} onChange={handleRuleEnabledChange(k)} />
                <span style={{ fontWeight:600 }}>{labelFor(k)}</span>
              </label>
              <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:8 }}>
                <span className="small" style={{ minWidth:100 }}>Schwelle</span>
                <input type="number" value={Number(r.threshold ?? 0)} onChange={handleRuleThresholdChange(k)} style={{ width:140 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** ───────────────────────── Szenario-Editor (MP – wie SP, aber DB-Bridge) ───────────────────────── */
function SectionScenarioEditorMP() {
  const [gameId, setGameId] = React.useState<string>(() => {
  try {
    return (
      localStorage.getItem('mp_current_game') ||
      localStorage.getItem('admin:lastGameId') ||
      ''
    );
  } catch { return ''; }
});
  const [busy, setBusy] = React.useState(false);
  const svc = MultiplayerService.getInstance();

  // Bridge: fängt Events aus ScenarioEditor auf und schreibt in die DB
  React.useEffect(() => {
    const onInject = async (ev: Event) => {
      const ce = ev as CustomEvent<any>;
      const detail = ce?.detail;

      // Schutz: Nur reagieren, wenn der Editor feuert (der SP-Editor setzt 'mode')
      if (!detail || typeof detail !== 'object' || !('mode' in detail)) return;

      const gid = (gameId || '').trim();
      if (!gid) { alert('Bitte Game‑ID angeben.'); return; }

      try {
        setBusy(true);
        const { mode, ...compiled } = detail;
        // SP-Editor nutzt 'replace' | 'merge' → MPM erwartet 'import' | 'append'
        const isAppend = String(mode) === 'merge';
        if (isAppend) {
          await svc.adminScenarioAppend(gid, compiled);
        } else {
          await svc.adminScenarioImport(gid, compiled);
        }
        try { localStorage.setItem('admin:lastGameId', gid); } catch {}
        alert(isAppend ? 'Szenario angehängt (MP).' : 'Szenario ersetzt (MP).');
      } catch (e) {
        console.error('[AdminPanelMPM] Szenario-DB-Update fehlgeschlagen:', e);
        alert('Fehler beim Anwenden des Szenarios im Multiplayer (Details siehe Konsole).');
      } finally {
        setBusy(false);
      }
    };

    window.addEventListener('admin:scenario:import', onInject as EventListener);
    return () => window.removeEventListener('admin:scenario:import', onInject as EventListener);
  }, [gameId, svc]);

  return (
    <div style={{ marginTop: 16, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
      <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Szenario-Editor (Mehrspieler)</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontWeight: 600 }}>Game‑ID</div>
        <input
  type="text"
  value={gameId}
  onChange={e => {
    const v = (e.target as HTMLInputElement).value;
    setGameId(v);
    try { localStorage.setItem('admin:lastGameId', v); } catch {}
  }}
           placeholder="games.id (UUID)"
          style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 6 }}
        />
      </div>

      {/* Originaler SP-Editor – liefert UI & Kompilierungslogik */}
      <ScenarioEditor />

      {busy && (
        <div style={{ marginTop: 8, color: '#6b7280' }}>
          Anwenden im Multiplayer läuft …
        </div>
      )}
      <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>
        Hinweis: „In Spiel injizieren“ kompiliert wie im Einzelspieler und schreibt das Ergebnis in die DB des angegebenen Spiels.
      </div>
    </div>
  );
}


/** ───────────────────────── KPI/Tag/Szenario (MP – DB) ───────────────────────── */
function SectionOperationsMP() {
  const [gameId, setGameId] = React.useState('');
  const [day, setDay] = React.useState<number>(1);

  // KPI-Steuerung
  const [k, setK]   = React.useState<KPI>({ cashEUR:0, profitLossEUR:0, customerLoyalty:50, bankTrust:50, workforceEngagement:50, publicPerception:50 });
  const [d, setD]   = React.useState<Partial<KPI>>({});
  const [doSet, setDoSet] = React.useState(false);
  const [doDelta, setDoDelta] = React.useState(false);

  const handleDoSetChange = (e: React.ChangeEvent<HTMLInputElement>) => setDoSet(e.target.checked);
  const handleDoDeltaChange = (e: React.ChangeEvent<HTMLInputElement>) => setDoDelta(e.target.checked);

  // Szenario-Import/Append
  const [scenarioText, setScenarioText] = React.useState('');
  const svc = MultiplayerService.getInstance();

  const applyKpi = async () => {
    const gid = (gameId || '').trim();
    if (!gid) { alert('Bitte Game‑ID angeben.'); return; }
    try {
      if (doSet)   { window.dispatchEvent(new CustomEvent('admin:kpi:set', { detail: k })); setDoSet(false); }
      if (doDelta) { window.dispatchEvent(new CustomEvent('admin:kpi:add', { detail: d })); setDoDelta(false); }
      alert('KPI‑Event(s) gesendet.');
    } catch (e) {
      console.error('[AdminPanelMPM] KPI‑Event‑Dispatch fehlgeschlagen:', e);
      alert('Fehler beim Senden der KPI‑Events (Details siehe Konsole).');
    }
  };

    const applyDay = async (mode: 'set' | 'advance') => {
    const gid = (gameId || '').trim();
    if (!gid) { alert('Bitte Game‑ID angeben.'); return; }
    try {
      if (mode === 'set') {
        // Event für laufende GameViews
        window.dispatchEvent(new CustomEvent('admin:set-day', { detail: day }));
        // Fallback: DB-Update sicherstellen (solange kein Listener in GameView vorhanden ist)
        await svc.adminSetDay(gid, day);
      } else if (mode === 'advance') {
        // Event für laufende GameViews
        window.dispatchEvent(new Event('admin:advance-day'));
        // Fallback: DB-Advance sicherstellen (siehe Hinweis oben)
        await svc.adminAdvanceDayForce(gid);
      }
      alert('Tagessteuerung ausgelöst.');
    } catch (e) {
      console.error('[AdminPanelMPM] Day‑Control fehlgeschlagen:', e);
      alert('Fehler bei der Tagessteuerung (Details siehe Konsole).');
    }
  };

  
  const importScenario = async (mode:'import'|'append') => {
    const gid = (gameId||'').trim(); if (!gid) { alert('Bitte Game‑ID angeben.'); return; }
    const payload = JSON.parse(scenarioText || '{}');
    if (mode==='import') await svc.adminScenarioImport(gid, payload);
    if (mode==='append') await svc.adminScenarioAppend(gid, payload);
    alert(mode==='import' ? 'Szenario (ersetzt) importiert.' : 'Szenario‑Patch angehängt.');
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Game-ID */}
      <div style={box}>
        <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>Ziel: Multiplayer‑Spiel</h3>
        <label style={{ fontWeight:600, display:'block', marginBottom:8 }}>Game‑ID (UUID)</label>
        <input type="text" value={gameId} onChange={e=>setGameId((e.target as HTMLInputElement).value)} placeholder="games.id (UUID)"
               style={{ width:'100%', maxWidth:360, padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:6 }} />
      </div>

      {/* KPI */}
      <div style={box}>
        <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>KPI steuern</h3>
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <label><input type="checkbox" checked={doSet}   onChange={handleDoSetChange} /> KPI setzen</label>
          <label><input type="checkbox" checked={doDelta} onChange={handleDoDeltaChange} /> Δ anwenden</label>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0,1fr))', gap:8, marginTop:8 }}>
          <label>Cash (€)<input type="number" value={k.cashEUR||0} onChange={e=>setK(s=>({ ...s, cashEUR:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>G/V (€)<input type="number" value={k.profitLossEUR||0} onChange={e=>setK(s=>({ ...s, profitLossEUR:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Kunden<input type="number" value={k.customerLoyalty||0} onChange={e=>setK(s=>({ ...s, customerLoyalty:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Bank<input type="number" value={k.bankTrust||0} onChange={e=>setK(s=>({ ...s, bankTrust:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Workforce<input type="number" value={k.workforceEngagement||0} onChange={e=>setK(s=>({ ...s, workforceEngagement:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Public<input type="number" value={k.publicPerception||0} onChange={e=>setK(s=>({ ...s, publicPerception:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
        </div>

        <div style={{ marginTop:12, fontSize:12, color:'#6b7280' }}>Δ‑Werte</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0,1fr))', gap:8 }}>
          <label>Δ Cash<input type="number" value={d.cashEUR||0} onChange={e=>setD(s=>({ ...s, cashEUR:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Δ G/V<input type="number" value={d.profitLossEUR||0} onChange={e=>setD(s=>({ ...s, profitLossEUR:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Δ Kunden<input type="number" value={d.customerLoyalty||0} onChange={e=>setD(s=>({ ...s, customerLoyalty:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Δ Bank<input type="number" value={d.bankTrust||0} onChange={e=>setD(s=>({ ...s, bankTrust:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Δ Workforce<input type="number" value={d.workforceEngagement||0} onChange={e=>setD(s=>({ ...s, workforceEngagement:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
          <label>Δ Public<input type="number" value={d.publicPerception||0} onChange={e=>setD(s=>({ ...s, publicPerception:Number((e.target as HTMLInputElement).value)||0 }))} /></label>
        </div>

        <div style={{ marginTop:12, display:'flex', justifyContent:'flex-end' }}>
          <button onClick={applyKpi} style={{ padding:'8px 12px', fontWeight:600 }} disabled={!gameId || (!doSet && !doDelta)}>In Multiplayer übernehmen</button>
        </div>
      </div>

      {/* Tag steuern */}
      <div style={box}>
        <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>Tag steuern</h3>
        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <label>Tag <input type="number" min={1} max={14} value={day} onChange={e=>setDay(Number((e.target as HTMLInputElement).value)||1)} /></label>
          <button onClick={()=>applyDay('set')}     style={{ padding:'6px 12px' }} disabled={!gameId}>Tag setzen</button>
          <button onClick={()=>applyDay('advance')} style={{ padding:'6px 12px' }} disabled={!gameId}>Tageswechsel (erzwingen)</button>
        </div>
      </div>

      {/* Szenario */}
      <div style={box}>
        <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>Szenario‑Editor (Import/Append)</h3>
        <textarea value={scenarioText} onChange={e=>setScenarioText((e.target as HTMLTextAreaElement).value)}
          placeholder='JSON (z.B. {"days":[...]})' style={{ width:'100%', minHeight:140, border:'1px solid #e5e7eb', borderRadius:6, padding:8, fontFamily:'monospace' }}/>
        <div style={{ marginTop:8, display:'flex', gap:8, justifyContent:'flex-end' }}>
          <button onClick={()=>importScenario('import')} style={{ padding:'6px 12px' }} disabled={!gameId}>Import (ersetzen)</button>
          <button onClick={()=>importScenario('append')} style={{ padding:'6px 12px' }} disabled={!gameId}>Append (anhängen)</button>
        </div>
      </div>
    </div>
  );
}

/** ───────────────────────── MP‑News injizieren ───────────────────────── */
function SectionMpInjectNews() {
  const [gameId, setGameId] = React.useState('');
  const [day, setDay] = React.useState<number>(1);
  const [source, setSource] = React.useState<'press'|'customer'|'supplier'|'internal'|'rumor'|'bank'|'authority'>('internal');
  const [severity, setSeverity] = React.useState<'low'|'medium'|'high'|'critical'>('medium');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [roles, setRoles] = React.useState<RoleId[]>([]);
  const [err, setErr] = React.useState<string>('');

  const toggleRole = (r: RoleId) => setRoles(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);

  const inject = async (target: 'all' | 'roles') => {
    const gid = (gameId || '').trim();
    if (!gid) { alert('Bitte Multiplayer Game‑ID angeben.'); return; }
    if (!title.trim()) { alert('Bitte Titel eingeben.'); return; }

    try {
      setErr('');
      const svc = MultiplayerService.getInstance();
      await svc.adminInjectNews(gid, {
        day, title: title.trim(), content: content || undefined, source, severity,
        roles: (target === 'roles') ? roles : undefined
      });
      setTitle(''); setContent(''); alert('Inhalt wurde injiziert.');
    } catch (e:any) {
      console.error('[AdminPanelMPM] inject news failed:', e);
      setErr(String(e?.message || e)); alert('Fehler beim Injizieren (Details in der Konsole).');
    }
  };

  return (
    <div style={{ marginTop: 24, padding: 16, background: '#f9fafb', borderRadius: 8 }}>
      <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>Inhalte injizieren (Multiplayer)</h3>

      <div style={{ display:'grid', gridTemplateColumns:'160px 1fr', gap:12, alignItems:'center' }}>
        <div style={{ fontWeight:600 }}>Game‑ID</div>
        <input type="text" value={gameId} onChange={e=>setGameId((e.target as HTMLInputElement).value)} placeholder="games.id (UUID)"
               style={{ width:'100%', padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:6 }} />

        <div style={{ fontWeight:600 }}>Tag</div>
        <input type="number" min={1} max={14} value={day} onChange={e=>setDay(Math.max(1, Math.min(14, Number((e.target as HTMLInputElement).value||'1'))))}
               style={{ width:120, padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:6 }} />

        <div style={{ fontWeight:600 }}>Quelle</div>
        <select value={source} onChange={e=>setSource((e.target as HTMLSelectElement).value as any)}
                style={{ width:220, padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:6 }}>
          <option value="internal">internal</option>
          <option value="press">press</option>
          <option value="customer">customer</option>
          <option value="supplier">supplier</option>
          <option value="bank">bank</option>
          <option value="authority">authority</option>
          <option value="rumor">rumor</option>
        </select>

        <div style={{ fontWeight:600 }}>Schweregrad</div>
        <select value={severity} onChange={e=>setSeverity((e.target as HTMLSelectElement).value as any)}
                style={{ width:220, padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:6 }}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
          <option value="critical">critical</option>
        </select>

        <div style={{ fontWeight:600 }}>Titel</div>
        <input type="text" value={title} onChange={e=>setTitle((e.target as HTMLInputElement).value)} placeholder="z.B. Lieferengpass bei Zulieferer X"
               style={{ width:'100%', padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:6 }} />

        <div style={{ fontWeight:600, alignSelf:'start' }}>Nachricht</div>
        <textarea value={content} onChange={e=>setContent((e.target as HTMLTextAreaElement).value)} placeholder="Kurztext oder Details…"
                  style={{ width:'100%', minHeight:120, padding:8, border:'1px solid #d1d5db', borderRadius:6, fontFamily:'monospace' }}/>
      </div>

      <div style={{ marginTop:12, fontWeight:600 }}>Zielrollen (optional)</div>
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginTop:6 }}>
        {(['CEO','CFO','OPS','HRLEGAL'] as RoleId[]).map(r => (
          <label key={r} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <input type="checkbox" checked={roles.includes(r)} onChange={()=>toggleRole(r)} />
            <span>{r}</span>
          </label>
        ))}
      </div>
      <div style={{ fontSize:12, color:'#6b7280', marginTop:4 }}>Ohne Auswahl gilt die Nachricht als <strong>global</strong> (alle Rollen).</div>

      <div style={{ display:'flex', gap:8, marginTop:12 }}>
        <button style={{ padding:'8px 14px', borderRadius:6, border:'1px solid #111827', background:'#111827', color:'#fff' }}
                onClick={()=>inject('all')} disabled={!gameId.trim() || !title.trim()} title="Global injizieren (alle Rollen)">
          Global injizieren (alle Rollen)
        </button>
        <button style={{ padding:'8px 14px', borderRadius:6, border:'1px solid #111827', background:'#fff' }}
                onClick={()=>inject('roles')} disabled={!gameId.trim() || !title.trim() || roles.length===0} title="Nur an ausgewählte Rollen">
          An ausgewählte Rollen injizieren
        </button>
      </div>
      {err && <div style={{ color:'#b91c1c', marginTop:8 }}>{err}</div>}
    </div>
  );
}



// Invarianten (optional)
type InvariantsLocal = {
  ppPenaltyOnNegCash: boolean; loyaltyPenaltyOnNegCash: boolean; payrollDelay_weMinus10: boolean;
  loss5_bankTrustMinus8: boolean; loss5_publicPerceptionMinus5: boolean; loss5_customerLoyaltyMinus5: boolean;
  bankTrustLt10_workEngagementMinus10: boolean; bankTrustLt10_publicPerceptionMinus10: boolean;
  profit5_bankTrustPlus8: boolean; profit5_publicPerceptionPlus8: boolean; profit5_customerLoyaltyPlus8: boolean;
  bankTrustGt80_workEngagementPlus10: boolean; bankTrustGt80_publicPerceptionPlus80: boolean;
};
const LS_INV = 'admin:invariants';
function loadInvariantsLocal(): InvariantsLocal {
  try { const raw = localStorage.getItem(LS_INV); if (raw) return JSON.parse(raw); } catch {}
  return {
    ppPenaltyOnNegCash:false, loyaltyPenaltyOnNegCash:false, payrollDelay_weMinus10:false,
    loss5_bankTrustMinus8:false, loss5_publicPerceptionMinus5:false, loss5_customerLoyaltyMinus5:false,
    bankTrustLt10_workEngagementMinus10:false, bankTrustLt10_publicPerceptionMinus10:false,
    profit5_bankTrustPlus8:false, profit5_publicPerceptionPlus8:false, profit5_customerLoyaltyPlus8:false,
    bankTrustGt80_workEngagementPlus10:false, bankTrustGt80_publicPerceptionPlus80:false
  };
}
function saveInvariantsLocal(v: InvariantsLocal) {
  try {
    localStorage.setItem(LS_INV, JSON.stringify(v));
  } catch (e) {
    console.error('[AdminPanelMPM] Failed to save invariants to localStorage:', e);
    throw new Error('Speichern der Invarianten fehlgeschlagen.');
  }
}
function applyInvariantsGlobals(v: InvariantsLocal) {
  try {
    (globalThis as any).__invariants = { optional: {
      pp_penalty_on_neg_cash:!!v.ppPenaltyOnNegCash, loyalty_penalty_on_neg_cash:!!v.loyaltyPenaltyOnNegCash, payroll_delay_we_minus10:!!v.payrollDelay_weMinus10,
      loss5_banktrust_minus8:!!v.loss5_bankTrustMinus8, loss5_publicperception_minus5:!!v.loss5_publicPerceptionMinus5, loss5_customerloyalty_minus5:!!v.loss5_customerLoyaltyMinus5,
      banktrust_lt10_workengagement_minus10:!!v.bankTrustLt10_workEngagementMinus10, banktrust_lt10_publicperception_minus10:!!v.bankTrustLt10_publicPerceptionMinus10,
      profit5_banktrust_plus8:!!v.profit5_bankTrustPlus8, profit5_publicperception_plus8:!!v.profit5_publicPerceptionPlus8, profit5_customerloyalty_plus8:!!v.profit5_customerLoyaltyPlus8,
      banktrust_gt80_workengagement_plus10:!!v.bankTrustGt80_workEngagementPlus10, banktrust_gt80_publicperception_plus80:!!v.bankTrustGt80_publicPerceptionPlus80
    }};

    try {
      window.dispatchEvent(new CustomEvent('admin:invariants', { detail: v }));
    } catch (eventError) {
      console.error('[AdminPanelMPM] Failed to dispatch admin:invariants event:', eventError);
    }
  } catch (e) {
    console.error('[AdminPanelMPM] Failed to apply invariants to globals:', e);
    throw new Error('Anwenden der Invarianten fehlgeschlagen.');
  }
}
function SectionInvariantsMP({ inv, setInv }:{ inv:InvariantsLocal; setInv:(v:InvariantsLocal)=>void; }) {
  const handleInvariantChange = (k: keyof InvariantsLocal) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInv({ ...inv, [k]: e.target.checked });
  };

  const Row = ({label, k}:{label:string; k: keyof InvariantsLocal}) => (
    <div style={{ display:'flex', gap:12, alignItems:'center', margin:'6px 0' }}>
      <label style={{ minWidth:420 }}>{label}</label>
      <input type="checkbox" checked={!!inv[k]} onChange={handleInvariantChange(k)} />
    </div>
  );
  return (
    <div style={box}>
      <h3 style={{ marginTop:0, fontSize:18, fontWeight:700 }}>Invarianten (optional)</h3>
      <Row label="Zahlungsverzug (neg. Cash) → Public Perception −5" k="ppPenaltyOnNegCash" />
      <Row label="Negativer Cash → Kundentreue −2" k="loyaltyPenaltyOnNegCash" />
      <Row label="Payroll-Verzögerung → Workforce Engagement −10" k="payrollDelay_weMinus10" />
      <Row label="5 Perioden Loss → Bank Trust −8" k="loss5_bankTrustMinus8" />
      <Row label="5 Perioden Loss → Public Perception −5" k="loss5_publicPerceptionMinus5" />
      <Row label="5 Perioden Loss → Kundenzufriedenheit −5" k="loss5_customerLoyaltyMinus5" />
      <Row label="Bank Trust < 10 → Workforce Engagement −10" k="bankTrustLt10_workEngagementMinus10" />
      <Row label="Bank Trust < 10 → Public Perception −10" k="bankTrustLt10_publicPerceptionMinus10" />
      <Row label="5 Perioden Profit → Bank Trust +8" k="profit5_bankTrustPlus8" />
      <Row label="5 Perioden Profit → Public Perception +8" k="profit5_publicPerceptionPlus8" />
      <Row label="5 Perioden Profit → Kundenzufriedenheit +8" k="profit5_customerLoyaltyPlus8" />
      <Row label="Bank Trust > 80 → Workforce Engagement +10" k="bankTrustGt80_workEngagementPlus10" />
      <Row label="Bank Trust > 80 → Public Perception +80" k="bankTrustGt80_publicPerceptionPlus80" />
      <div className="small" style={{ color:'#6b7280', marginTop:6 }}>Aktiviert bei „Übernehmen“ (siehe Footer‑Buttons).</div>
    </div>
  );
}


export default function AdminPanelMPM({ onClose }: { onClose?: () => void }) {
  const [settings, setSettings] = React.useState<MultiplayerAdminSettings>(() => loadSettings());
  const [busy, setBusy] = React.useState(false);
  const [toast, setToast] = React.useState('');
  const [inv, setInv] = React.useState<InvariantsLocal>(() => loadInvariantsLocal());
  const [applyTimeoutId, setApplyTimeoutId] = React.useState<number | null>(null);

  const showToast = (msg: string) => { setToast(msg); window.setTimeout(() => setToast(''), 1600); };

  const onApply = async () => {
    if (applyTimeoutId !== null) {
      window.clearTimeout(applyTimeoutId);
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setBusy(true);

        const next = { ...settings, scoringWeights: normalizeWeights((settings as any)?.scoringWeights) };

        const validation = validateSettings(next);
        if (!validation.valid) {
          alert('Einstellungen sind ungültig:\n' + validation.errors.join('\n'));
          return;
        }

        saveSettings(next);
        applyToGlobals(next);

        saveInvariantsLocal(inv);
        applyInvariantsGlobals(inv);

        showToast('MP‑Einstellungen übernommen');
      } catch (e) {
        console.error('[AdminPanelMPM] apply failed:', e);
        const errorMessage = e instanceof Error ? e.message : 'Unbekannter Fehler';
        alert(`Fehler beim Übernehmen der MP‑Einstellungen:\n${errorMessage}\n\nDetails siehe Konsole.`);
      } finally {
        setBusy(false);
        setApplyTimeoutId(null);
      }
    }, 100);

    setApplyTimeoutId(timeoutId);
  };


  return (
    <div className="admin-panel" style={{ padding: 16, maxWidth: 1200 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>🎮 Admin – Mehrspielermodus</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onApply} disabled={busy} style={{ padding: '8px 12px', fontWeight: 600 }}>Übernehmen</button>
          {onClose && <button onClick={onClose} style={{ padding: '8px 12px' }}>Schließen</button>}
        </div>
      </div>

      <SectionMultiplayer settings={settings} setSettings={setSettings} />

      

      <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button onClick={onApply} disabled={busy} style={{ padding: '10px 16px', fontWeight: 700 }}>Übernehmen</button>
      </div>

      {/* Neu hinzugefügte Sektionen (MP) */}
      <SectionGameplayMP settings={settings} setSettings={setSettings} />
      <SectionRoundTimeMP settings={settings} setSettings={setSettings} />
      <SectionScoringMP   settings={settings} setSettings={setSettings} />
      <SectionEventIntensityMP settings={settings} setSettings={setSettings} />
      <SectionInsolvencyMP settings={settings} setSettings={setSettings} />
      <SectionGameTheme settings={settings} setSettings={setSettings} />
        {/* NEU: SP-kompatibler Szenario-Editor mit DB-Bridge */}
  <SectionScenarioEditorMP />

            <SectionOperationsMP />
      <SectionMpInjectNews />
      {/* NEU: Nur Schalter – keine Trainer-Anmeldung mehr im Adminpanel */}
      <SectionTrainerAccess settings={settings} setSettings={setSettings} />
      <SectionInvariantsMP inv={inv} setInv={setInv} />



      {toast && (
        <div style={{ position:'fixed', right: 12, bottom: 12, background:'#111827', color:'#fff', padding:'8px 12px', borderRadius: 6 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
