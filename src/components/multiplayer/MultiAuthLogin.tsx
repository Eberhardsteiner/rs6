import React from 'react';
import type { KPI } from '@/core/models/domain';
import AdminGate from '@/admin/AdminGate';
import ScenarioEditor from '@/admin/ScenarioEditor';
import { makeRng } from '@/core/utils/prng';
import { supabase } from '@/services/supabaseClient';
declare global {
  interface Window {
    __admin?: {
      setKpi?: (k: KPI) => void;
      addDelta?: (d: Partial<KPI>) => void;
      setDay?: (n: number) => void;
      advanceDay?: () => void;
      message?: (s: string) => void;
    };
  }
}

type Difficulty = 'easy'|'normal'|'hard';
type InsolvencyMode = 'hard'|'soft'|'off';

type ScoringWeights = {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
};
// ────────────────────────────────────────────────────────────────────────────────
// Insolvenz-Regeln (Admin-konfigurierbar)
// ────────────────────────────────────────────────────────────────────────────────
export type InsolvencyRule = { key: string; enabled: boolean; threshold: number };
export type InsolvencyRulesMap = Record<string, InsolvencyRule>;
export type InsolvencyConfig = { rules: InsolvencyRulesMap };


type MultiplayerAdminSettings = {
  authMode: 'email' | 'name-only' | 'preset-credentials';
  allowEarlyEntry: boolean;
  forceAllPlayersForAdvance: boolean;
  autoStartWhenReady: boolean;
  autoStartDelaySeconds: number;
  lobbyCountdownSeconds: number;
  presetCredentials: {
    CEO: { username: string; password: string };
    CFO: { username: string; password: string };
    OPS: { username: string; password: string };
    HRLEGAL: { username: string; password: string };
  };
  lobbySettings: {
    showTimer: boolean;
    backgroundTheme: 'corporate' | 'dynamic' | 'minimal';
    welcomeMessage: string;
  };

    gameSettings: {
    backgroundTheme: 'corporate' | 'dynamic' | 'minimal';
    allowUserOverride: boolean;
  };

      gameSettings: {
      backgroundTheme: 'dynamic',
      allowUserOverride: false
    },

  
gameSettings: {
    backgroundTheme: 'corporate' | 'dynamic' | 'minimal';
    allowUserOverride: boolean;
  };
  
  creditSettings?: {
    enabled: boolean;
    creditLineEUR: number;
    interestRatePct: number;
  };
};

type AdminSettings = {
  bank?: { creditLineEUR: number; interestRatePct: number };
  eventIntensityByDay?: number[];
  features?: { saveLoadMenu: boolean; autoSave: boolean; coach?: boolean; bankMechanics?: boolean; whatIfPreview?: boolean; eventIntensity?: boolean; /* allowCreditMP?: boolean  (via onApply merged) */ };
  insolvencyMode: InsolvencyMode;
  difficulty: Difficulty;
  randomNews: boolean;
  scoringWeights: ScoringWeights;
  adaptiveDifficultyLight: boolean;
  roundTimeMode?: 'off'|'global'|'matrix';
  roundTimeGlobalSec?: number;
  roundTimeGraceSec?: number;
  roundTimeMatrix?: Record<number, Partial<Record<'CEO'|'CFO'|'OPS'|'HRLEGAL', number>>>;
  insolvencyConfig?: InsolvencyConfig;
};

const LS_KEY = 'adminSettings';
// Insolvenz-Regeln: standardmäßig nur cashEUR aktiv mit Schwelle 0
const DEFAULT_INSOLVENCY_RULES: InsolvencyRulesMap = {
  cashEUR:            { key: 'cashEUR',            enabled: true,  threshold: 0 },
  profitLossEUR:      { key: 'profitLossEUR',      enabled: false, threshold: -999999 },
  customerLoyalty:    { key: 'customerLoyalty',    enabled: false, threshold: 0 },
  bankTrust:          { key: 'bankTrust',          enabled: false, threshold: 0 },
  workforceEngagement:{ key: 'workforceEngagement',enabled: false, threshold: 0 },
  publicPerception:   { key: 'publicPerception',   enabled: false, threshold: 0 },
  debt:               { key: 'debt',               enabled: false, threshold: 0 },
  receivables:        { key: 'receivables',        enabled: false, threshold: 0 },
};


function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }
function num(x: any, d = 0): number { const v = Number(x); return Number.isFinite(v) ? v : d; }

function normalizeWeights(w: ScoringWeights): ScoringWeights {
  const sum = w.bankTrust + w.publicPerception + w.customerLoyalty + w.workforceEngagement;
  if (sum <= 0) return { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 };
  const f = 100 / sum;
  return {
    bankTrust: Math.round(w.bankTrust * f),
    publicPerception: Math.round(w.publicPerception * f),
    customerLoyalty: Math.round(w.customerLoyalty * f),
    workforceEngagement: Math.round(w.workforceEngagement * f),
  };
}

function __readInputValue(e: React.ChangeEvent<HTMLInputElement>): string {
  const t = (e?.currentTarget ?? e?.target) as HTMLInputElement | null;
  return t?.value ?? '';
}

function __readInputNumber(e: React.ChangeEvent<HTMLInputElement>): number {
  const raw = __readInputValue(e).trim();
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

function __readChecked(e: React.ChangeEvent<HTMLInputElement>): boolean {
  const t = (e?.currentTarget ?? e?.target) as HTMLInputElement | null;
  return !!(t?.checked);
}

function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function loadAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const obj = JSON.parse(raw);

      const scoring = normalizeWeights(
        obj.scoringWeights ?? { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 }
      );

      const eventIntensityByDay = Array.isArray(obj.eventIntensityByDay)
        ? obj.eventIntensityByDay.map((n: any)=> Number(n)||1).slice(0,14)
        : Array.from({length:14},()=>1);

      const roundTimeMode = (obj.roundTimeMode ?? 'off') as ('off'|'global'|'matrix');
      const roundTimeGlobalSec = typeof obj.roundTimeGlobalSec === 'number' ? obj.roundTimeGlobalSec : 0;
      const roundTimeGraceSec = typeof obj.roundTimeGraceSec === 'number' ? obj.roundTimeGraceSec : 180;
      const roundTimeMatrix = (obj.roundTimeMatrix && typeof obj.roundTimeMatrix === 'object')
        ? obj.roundTimeMatrix as Record<number, Partial<Record<'CEO'|'CFO'|'OPS'|'HRLEGAL', number>>>
        : Object.fromEntries(Array.from({length:14}, (_,i)=>[i+1,{CEO:480,CFO:480,OPS:480,HRLEGAL:480}]) as any);

      
      // Insolvenz-Regeln lesen (robust)
      const insolvencyRules: InsolvencyRulesMap =
        (obj.insolvencyConfig && typeof obj.insolvencyConfig === 'object' && obj.insolvencyConfig.rules && typeof obj.insolvencyConfig.rules === 'object')
          ? (obj.insolvencyConfig.rules as InsolvencyRulesMap)
          : DEFAULT_INSOLVENCY_RULES;
      return {
        insolvencyMode: (obj.insolvencyMode ?? 'hard') as InsolvencyMode,
        difficulty: (obj.difficulty ?? 'normal') as Difficulty,
        randomNews: !!obj.randomNews,
        adaptiveDifficultyLight: !!obj.adaptiveDifficultyLight,
        scoringWeights: scoring,
        eventIntensityByDay,
        bank: {
          creditLineEUR: Number(obj.bank?.creditLineEUR || 0),
          interestRatePct: Number(obj.bank?.interestRatePct || 0)
        },
        features: {
          saveLoadMenu: !!(obj.features?.saveLoadMenu),
          autoSave: !!(obj.features?.autoSave),
          coach: !!(obj.features?.coach),
          bankMechanics: !!(obj.features?.bankMechanics),
          whatIfPreview: !!(obj.features?.whatIfPreview),
          eventIntensity: !!(obj.features?.eventIntensity),
          // allowCreditMP intentionally handled via onApply merge to avoid type churn
        },
        roundTimeMode,
        roundTimeGlobalSec,
        roundTimeGraceSec,
        roundTimeMatrix,
      
        insolvencyConfig: { rules: insolvencyRules }
      };
    }
  } catch {}
  return {
    insolvencyConfig: { rules: DEFAULT_INSOLVENCY_RULES },
    insolvencyMode: 'hard',
    roundTimeMode: 'off',
    roundTimeGlobalSec: 0,
    roundTimeGraceSec: 180,
    roundTimeMatrix: Object.fromEntries(Array.from({length:14}, (_,i)=>[i+1,{CEO:480,CFO:480,OPS:480,HRLEGAL:480}]) as any),
    difficulty: 'normal',
    adaptiveDifficultyLight: false,
    randomNews: true,
    scoringWeights: { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 },
    eventIntensityByDay: Array.from({length:14},()=>1),
    bank: { creditLineEUR: 0, interestRatePct: 0 },
    features: { saveLoadMenu: false, autoSave: false, coach: false, bankMechanics: false, whatIfPreview: false, eventIntensity: false },
  };
}

function loadMultiplayerSettings(): MultiplayerAdminSettings {
  const saved = localStorage.getItem('admin:multiplayer');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }
  return {
    authMode: 'name-only',
    allowEarlyEntry: false,
    forceAllPlayersForAdvance: true,
    autoStartWhenReady: false,
    autoStartDelaySeconds: 10,
    lobbyCountdownSeconds: 3,
    presetCredentials: {
      CEO: { username: 'ceo', password: 'ceo123' },
      CFO: { username: 'cfo', password: 'cfo123' },
      OPS: { username: 'ops', password: 'ops123' },
      HRLEGAL: { username: 'hrlegal', password: 'hr123' }
    },
    lobbySettings: {
      showTimer: true,
      backgroundTheme: 'corporate',
      welcomeMessage: 'Willkommen zur Crisis Management Simulation!'
    },

 gameSettings: {
    backgroundTheme: 'dynamic',       // dein gewünschtes Standard-Theme für die Spielseite
    allowUserOverride: false          // User-Override standardmäßig aus
  },
    
    creditSettings: {
      enabled: false,
      creditLineEUR: 500000,
      interestRatePct: 8.5
    }
  };
}

function saveAdminSettings(s: AdminSettings) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
}

function applyGlobals(s: AdminSettings) {
  (globalThis as any).__insolvencyMode = s.insolvencyMode;
  (globalThis as any).__mode = s.difficulty;
  (globalThis as any).__npcDifficulty = s.difficulty;
  (globalThis as any).__randomNews = s.randomNews;
  (globalThis as any).__adaptiveDifficultyLightEnabled = !!(s as any).adaptiveDifficultyLight;
  // Insolvenz-Regeln global setzen
  try { (globalThis as any).__insolvencyRules = (s as any).insolvencyConfig?.rules || {}; } catch {}
  (globalThis as any).__scoringWeights = normalizeWeights(s.scoringWeights);

  ;(globalThis as any).__roundTimeMode = (s as any).roundTimeMode || 'off';
  ;(globalThis as any).__roundTimeGlobalSec = typeof (s as any).roundTimeGlobalSec === 'number' ? (s as any).roundTimeGlobalSec : undefined;
  ;(globalThis as any).__roundTimeGraceSec = typeof (s as any).roundTimeGraceSec === 'number' ? (s as any).roundTimeGraceSec : undefined;
  ;(globalThis as any).__roundTimeMatrix = (s as any).roundTimeMatrix && typeof (s as any).roundTimeMatrix === 'object' ? (s as any).roundTimeMatrix : undefined;

  ;(globalThis as any).__featureSaveLoadMenu = !!(s.features && s.features.saveLoadMenu);
  ;(globalThis as any).__featureAutoSave    = !!(s.features && s.features.autoSave);
  ;(globalThis as any).__featureCoach       = !!(s.features && (s.features as any).coach);
  ;(globalThis as any).__featureBankMechanics = !!(s.features && (s.features as any).bankMechanics);
  ;(globalThis as any).__featureWhatIfPreview = !!(s.features && (s.features as any).whatIfPreview);
  ;(globalThis as any).__featureEventIntensity = !!(s.features && (s.features as any).eventIntensity);
  ;(globalThis as any).__eventIntensityByDay = Array.isArray((s as any).eventIntensityByDay) ? (s as any).eventIntensityByDay : Array.from({length:14},()=>1);

  const creditLineEUR = Number((s as any).bank?.creditLineEUR || 0);
  const interestRatePct = Number((s as any).bank?.interestRatePct || 0);
  ;(globalThis as any).__bankSettings = { creditLineEUR, interestRatePct };
  ;(globalThis as any).__bankCreditLineEUR   = creditLineEUR;
  ;(globalThis as any).__bankInterestRatePct = interestRatePct;

  try { window.dispatchEvent(new CustomEvent('admin:settings', { detail: s })); } catch {}
}

const LS_INV = 'admin:invariants';
const LS_SEED = 'admin:seed';

type InvariantsLocal = {
  ppPenaltyOnNegCash: boolean;
  loyaltyPenaltyOnNegCash: boolean;
  payrollDelay_weMinus10: boolean;
  loss5_bankTrustMinus8: boolean;
  loss5_publicPerceptionMinus5: boolean;
  loss5_customerLoyaltyMinus5: boolean;
  bankTrustLt10_workEngagementMinus10: boolean;
  bankTrustLt10_publicPerceptionMinus10: boolean;
  profit5_bankTrustPlus8: boolean;
  profit5_publicPerceptionPlus8: boolean;
  profit5_customerLoyaltyPlus8: boolean;
  bankTrustGt80_workEngagementPlus10: boolean;
  bankTrustGt80_publicPerceptionPlus80: boolean;
};

function loadInvariantsLocal(): InvariantsLocal {
  try {
    const raw = localStorage.getItem(LS_INV);
    if (raw) {
      const o = JSON.parse(raw);
      return {
        ppPenaltyOnNegCash: !!o.ppPenaltyOnNegCash,
        loyaltyPenaltyOnNegCash: !!o.loyaltyPenaltyOnNegCash,
        payrollDelay_weMinus10: !!o.payrollDelay_weMinus10,
        loss5_bankTrustMinus8: !!o.loss5_bankTrustMinus8,
        loss5_publicPerceptionMinus5: !!o.loss5_publicPerceptionMinus5,
        loss5_customerLoyaltyMinus5: !!o.loss5_customerLoyaltyMinus5,
        bankTrustLt10_workEngagementMinus10: !!o.bankTrustLt10_workEngagementMinus10,
        bankTrustLt10_publicPerceptionMinus10: !!o.bankTrustLt10_publicPerceptionMinus10,
        profit5_bankTrustPlus8: !!o.profit5_bankTrustPlus8,
        profit5_publicPerceptionPlus8: !!o.profit5_publicPerceptionPlus8,
        profit5_customerLoyaltyPlus8: !!o.profit5_customerLoyaltyPlus8,
        bankTrustGt80_workEngagementPlus10: !!o.bankTrustGt80_workEngagementPlus10,
        bankTrustGt80_publicPerceptionPlus80: !!o.bankTrustGt80_publicPerceptionPlus80,
      };
    }
  } catch {}
  return {
    ppPenaltyOnNegCash: false,
    loyaltyPenaltyOnNegCash: false,
    payrollDelay_weMinus10: false,
    loss5_bankTrustMinus8: false,
    loss5_publicPerceptionMinus5: false,
    loss5_customerLoyaltyMinus5: false,
    bankTrustLt10_workEngagementMinus10: false,
    bankTrustLt10_publicPerceptionMinus10: false,
    profit5_bankTrustPlus8: false,
    profit5_publicPerceptionPlus8: false,
    profit5_customerLoyaltyPlus8: false,
    bankTrustGt80_workEngagementPlus10: false,
    bankTrustGt80_publicPerceptionPlus80: false,
  };
}

function saveInvariantsLocal(v: InvariantsLocal) { try { localStorage.setItem(LS_INV, JSON.stringify(v)); } catch {} }

function applyInvariantsGlobals(v: InvariantsLocal) {
  (globalThis as any).__invariants = {
    optional: {
      pp_penalty_on_neg_cash: !!v.ppPenaltyOnNegCash,
      loyalty_penalty_on_neg_cash: !!v.loyaltyPenaltyOnNegCash,
      payroll_delay_we_minus10: !!v.payrollDelay_weMinus10,
      loss5_banktrust_minus8: !!v.loss5_bankTrustMinus8,
      loss5_publicperception_minus5: !!v.loss5_publicPerceptionMinus5,
      loss5_customerloyalty_minus5: !!v.loss5_customerLoyaltyMinus5,
      banktrust_lt10_workengagement_minus10: !!v.bankTrustLt10_workEngagementMinus10,
      banktrust_lt10_publicperception_minus10: !!v.bankTrustLt10_publicPerceptionMinus10,
      profit5_banktrust_plus8: !!v.profit5_bankTrustPlus8,
      profit5_publicperception_plus8: !!v.profit5_publicPerceptionPlus8,
      profit5_customerloyalty_plus8: !!v.profit5_customerLoyaltyPlus8,
      banktrust_gt80_workengagement_plus10: !!v.bankTrustGt80_workEngagementPlus10,
      banktrust_gt80_publicperception_plus80: !!v.bankTrustGt80_publicPerceptionPlus80,
    }
  };
  try { window.dispatchEvent(new CustomEvent('admin:invariants', { detail: v })); } catch {}
}

function loadSeedLocal(): number | null {
  try { const raw = localStorage.getItem(LS_SEED); if (raw != null) return Number(raw); } catch {}
  return null;
}

function saveSeedLocal(seed: number | null) {
  try {
    if (seed == null || Number.isNaN(seed)) localStorage.removeItem(LS_SEED);
    else localStorage.setItem(LS_SEED, String(seed));
  } catch {}
}

function applySeedGlobals(seed: number | null) {
  if (seed == null || Number.isNaN(seed)) return;
  (globalThis as any).__rng = makeRng(Number(seed));
  try { window.dispatchEvent(new CustomEvent('admin:seed', { detail: { seed: Number(seed) } })); } catch {}
}

function rollNewSeed(): number {
  const t = Date.now() ^ (Math.random() * 0xffffffff);
  return Math.abs((t >>> 0) | 0);
}

const box: React.CSSProperties = { border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, marginBottom: 16 };
const row: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'center', margin: '8px 0' };
const label: React.CSSProperties = { fontWeight: 600, minWidth: 180 };
const heading: React.CSSProperties = { fontSize: 18, fontWeight: 700, marginBottom: 8 };
const sub: React.CSSProperties = { fontSize: 12, color: '#6b7280' };
const btn: React.CSSProperties = { padding: '8px 14px', borderRadius: 8, border: '1px solid #111827', cursor: 'pointer', background: '#fff' };
const btnPrimary: React.CSSProperties = { ...btn, background:'#111827', color:'#fff' };
const gridTwo: React.CSSProperties = { display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap: 8 };
const gridFour: React.CSSProperties = { display:'grid', gridTemplateColumns:'repeat(4, minmax(0, 1fr))', gap: 8 };

const tabsBar: React.CSSProperties = { display:'flex', gap:8, borderBottom:'1px solid #e5e7eb', marginBottom:12, flexWrap:'wrap' };
const tabBtn: React.CSSProperties = { padding:'8px 12px', borderRadius:8, cursor:'pointer', border:'1px solid transparent' };
const tabBtnActive: React.CSSProperties = { ...tabBtn, borderColor:'#111827', background:'#111827', color:'#fff' };
const footerBar: React.CSSProperties = { position:'sticky', bottom:0, background:'#fff', borderTop:'1px solid #e5e7eb', padding:'12px 0', marginTop:12, display:'flex', gap:12 };

function SectionSettings({ settings, setSettings }:{ settings: AdminSettings; setSettings:(f:(s:AdminSettings)=>AdminSettings)=>void; }) {
  return (
    <div style={box}>
      <div style={heading}>Allgemeine Einstellungen</div>

      <div style={row}>
        <span style={label}>Schwierigkeit</span>
        <label><input type="radio" name="difficulty" checked={settings.difficulty==='easy'} onChange={()=>setSettings(s=>({...s,difficulty:'easy'}))}/> Easy</label>
        <label><input type="radio" name="difficulty" checked={settings.difficulty==='normal'} onChange={()=>setSettings(s=>({...s,difficulty:'normal'}))}/> Normal</label>
        <label><input type="radio" name="difficulty" checked={settings.difficulty==='hard'} onChange={()=>setSettings(s=>({...s,difficulty:'hard'}))}/> Hard</label>
      </div>

      <div style={row}>
        <span style={label}>Adaptive Difficulty (Light)</span>
        <label>
          <input
            type="checkbox"
            checked={!!(settings as any).adaptiveDifficultyLight}
            onChange={(e)=>setSettings(s=>({ ...(s as any), adaptiveDifficultyLight: (__readChecked(e) as boolean) }))}
          /> aktiv
        </label>
        <div className="small">Skaliert die NPC‑Fehlerquote (×0.9–1.2) basierend auf den letzten zwei Tagen.</div>
      </div>

      <div style={row}>
        <span style={label}>Insolvenzmodus</span>
        <label><input type="radio" name="insomode" checked={settings.insolvencyMode==='hard'} onChange={()=>setSettings(s=>({...s,insolvencyMode:'hard'}))}/> Abbruch (hart)</label>
        <label><input type="radio" name="insomode" checked={settings.insolvencyMode==='soft'} onChange={()=>setSettings(s=>({...s,insolvencyMode:'soft'}))}/> Hinweis (weich)</label>
        <label><input type="radio" name="insomode" checked={settings.insolvencyMode==='off'} onChange={()=>setSettings(s=>({...s,insolvencyMode:'off'}))}/> Keine Meldung (aus)</label>
      </div>

      <div style={row}>
        <span style={label}>Zufalls-News</span>
        <label><input type="checkbox" checked={settings.randomNews} onChange={e=>setSettings(s=>({...s,randomNews:__readChecked(e)}))}/> aktiv</label>
      </div>
      <div style={row}>
        <span style={label}>„What‑if" Vorschau</span>
        <label>
          <input
            type="checkbox"
            checked={!!(settings.features && (settings.features as any).whatIfPreview)}
            onChange={(e)=>setSettings(s=>({
              ...s,
              features: { ...(s.features||{}), whatIfPreview: __readChecked(e) }
            }))}
          /> aktiv
        </label>
        <div className="small">Aktiviert den Button „Vorschau" (zeigt KPI‑Deltas in Grau, ohne Persistenz).</div>
      </div>
    </div>
  );
}

function SectionRoundTime({ settings, setSettings }:{ settings: AdminSettings; setSettings:(f:(s:AdminSettings)=>AdminSettings)=>void; }) {
  const roles: Array<'CEO'|'CFO'|'OPS'|'HRLEGAL'> = ['CEO','CFO','OPS','HRLEGAL'];
  const days = Array.from({length:14}, (_,i)=>i+1);

  const mode = (settings as any).roundTimeMode || 'off';
  const matrix = (settings as any).roundTimeMatrix || {};
  const globalSec = Number((settings as any).roundTimeGlobalSec || 0);
  const graceSec = Number((settings as any).roundTimeGraceSec || 180);

  const setMode = (m:'off'|'global'|'matrix') => setSettings(s => ({ ...s, roundTimeMode: m }));
  const setGlobalSec = (n:number) => setSettings(s => ({ ...s, roundTimeGlobalSec: n }));
  const setGraceSec = (n:number) => setSettings(s => ({ ...s, roundTimeGraceSec: n }));
  const setCell = (day:number, role:'CEO'|'CFO'|'OPS'|'HRLEGAL', n:number) => setSettings(s => {
    const base = { ...(s as any).roundTimeMatrix } || {};
    const row = { ...(base[day] || {}) };
    row[role] = n;
    return { ...(s as any), roundTimeMatrix: { ...base, [day]: row } };
  });

  return (
    <div style={box}>
      <div style={heading}>Rundenzeiten</div>
      <div style={{ ...sub, marginBottom: 8 }}>
        Optional manuelle Steuerung der Rundenzeit. <strong>Automatik</strong> bleibt aktiv, wenn hier <em>aus</em> gewählt ist.
      </div>

      <div style={{ ...row }}>
        <span style={label}>Modus</span>
        <label><input type="radio" name="rtmode" checked={mode==='off'} onChange={()=>setMode('off')} /> Automatik</label>
        <label><input type="radio" name="rtmode" checked={mode==='global'} onChange={()=>setMode('global')} /> Global</label>
        <label><input type="radio" name="rtmode" checked={mode==='matrix'} onChange={()=>setMode('matrix')} /> Matrix (Tag×Rolle)</label>
      </div>

      {mode === 'global' && (
        <div style={{ ...row }}>
          <label>Rundenzeit gesamt (Sek.)<input type="number" min={0} value={isFinite(globalSec)?globalSec:0} onChange={(e)=>setGlobalSec(Number((e.currentTarget as HTMLInputElement).value)||0)} /></label>
          <label>Grace (Sek.)<input type="number" min={0} value={isFinite(graceSec)?graceSec:0} onChange={(e)=>setGraceSec(Number((e.currentTarget as HTMLInputElement).value)||0)} /></label>
        </div>
      )}

      {mode === 'matrix' && (
        <div style={{ marginTop: 8 }}>
          <div style={{ ...sub, marginBottom: 6 }}>Sekunden pro Tag und Rolle (Summe der Rollen ergibt Rundenzeit).</div>
          <div style={{ overflowX:'auto', border:'1px solid #e5e7eb', borderRadius: 8 }}>
            <table style={{ borderCollapse:'collapse', width:'100%' }}>
              <thead>
                <tr>
                  <th style={{ textAlign:'left', padding:'6px 8px', borderBottom:'1px solid #e5e7eb' }}>Tag</th>
                  {roles.map(r => <th key={r} style={{ textAlign:'right', padding:'6px 8px', borderBottom:'1px solid #e5e7eb' }}>{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {days.map(day => {
                  const rowv = (matrix as any)[day] || {};
                  return (
                    <tr key={day}>
                      <td style={{ padding:'6px 8px', borderBottom:'1px solid #f3f4f6' }}>{day}</td>
                      {roles.map(role => (
                        <td key={role} style={{ padding:'4px 8px', borderBottom:'1px solid #f3f4f6', textAlign:'right' }}>
                          <input
                            type="number"
                            min={0}
                            value={Number(rowv[role] ?? 480)}
                            onChange={(e)=>setCell(day, role, Number((e.currentTarget as HTMLInputElement).value)||0)}
                            style={{ width: 96 }}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ ...sub, marginTop: 6 }}>Tipp: 480 Sek. ≈ 8 Min. pro Rolle, wie in der Automatik.</div>
          <div style={{ ...row, marginTop: 8 }}>
            <label>Grace (Sek.)<input type="number" min={0} value={isFinite(graceSec)?graceSec:0} onChange={(e)=>setGraceSec(Number((e.currentTarget as HTMLInputElement).value)||0)} /></label>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionScoring({ settings, setSettings }:{ settings: AdminSettings; setSettings:(f:(s:AdminSettings)=>AdminSettings)=>void; }) {
  const [local, setLocal] = React.useState<ScoringWeights>(() => ({ ...settings.scoringWeights }));
  React.useEffect(() => { setLocal({ ...settings.scoringWeights }); }, [settings.scoringWeights]);

  const setField = (key: keyof ScoringWeights, val: number) => {
    const v = Math.max(0, Math.min(100, Math.round(val)));
    setLocal(s => ({ ...s, [key]: v } as ScoringWeights));
    setSettings(s => ({ ...s, scoringWeights: { ...s.scoringWeights, [key]: v } as ScoringWeights }));
  };

  const total = local.bankTrust + local.publicPerception + local.customerLoyalty + local.workforceEngagement;
  const warn = total !== 100;

  return (
    <div style={box}>
      <div style={heading}>Endwertung</div>
      <div style={{ ...sub, marginBottom: 8 }}>
        Gewichten Sie die vier weichen KPIs. Die Summe muss 100% ergeben. Standard: 25% je KPI.
      </div>
      <div style={gridFour}>
        <label>Bankvertrauen (%)<input type="number" value={local.bankTrust} min={0} max={100} onChange={(e)=>setField('bankTrust', __readInputNumber(e))} /></label>
        <label>Öffentliche Wahrnehmung (%)<input type="number" value={local.publicPerception} min={0} max={100} onChange={(e)=>setField('publicPerception', __readInputNumber(e))} /></label>
        <label>Kundentreue (%)<input type="number" value={local.customerLoyalty} min={0} max={100} onChange={(e)=>setField('customerLoyalty', __readInputNumber(e))} /></label>
        <label>Belegschaft (%)<input type="number" value={local.workforceEngagement} min={0} max={100} onChange={(e)=>setField('workforceEngagement', __readInputNumber(e))} /></label>
      </div>
      {warn && <div style={{ marginTop: 8, color:'#b45309' }}>Wird beim Übernehmen automatisch auf 100% normalisiert.</div>}
    </div>
  );
}

function SectionEventIntensity({ settings, setSettings }:{ settings: AdminSettings; setSettings:(f:(s:AdminSettings)=>AdminSettings)=>void; }) {
  return (
    <div style={box}>
      <div style={{ ...heading }}>Ereignis‑Intensität (14 Tage)</div>
      <div style={{ ...row }}>
        <label style={label}>Feature aktiv</label>
        <input type="checkbox" 
          checked={!!settings.features?.eventIntensity} 
          onChange={(e)=> setSettings(s => ({ 
            ...s, 
            features: { ...(s.features||{saveLoadMenu:false,autoSave:false,coach:false,bankMechanics:false,whatIfPreview:false,eventIntensity:false}), eventIntensity: __readChecked(e) } 
          }))} 
        />
      </div>
      <div style={{ ...sub, marginBottom: 8 }}>
        Pro Tag ein Multiplikator. 1.0 = normal, &lt;1 = ruhiger, &gt;1 = intensiver. Wirkt auf Tagesrauschen (Δ) und Zufalls‑News (Anzahl & Wucht).
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7, minmax(0,1fr))', gap: 6 }}>
        {Array.from({length:14}).map((_,i)=>(
          <label key={i} style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <span style={{ fontSize:11, color:'#6b7280' }}>Tag {i+1}</span>
            <input 
              type="number" step="0.1" min={0} 
              value={Number((settings as any).eventIntensityByDay?.[i] ?? 1)} 
              onChange={(e)=>{
                const val = __readInputNumber(e);
                setSettings(s => {
                  const arr = Array.isArray((s as any).eventIntensityByDay) ? ([...(s as any).eventIntensityByDay]) : Array.from({length:14}, ()=>1);
                  arr[i] = val;
                  return { ...(s as any), eventIntensityByDay: arr };
                });
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function SectionKpiControls({ k, setK, d, setD, doSet, setDoSet, doDelta, setDoDelta }:{ 
  k: KPI; setK: (f:(p:KPI)=>KPI)=>void;
  d: Partial<KPI>; setD: (f:(p:Partial<KPI>)=>Partial<KPI>)=>void;
  doSet: boolean; setDoSet:(v:boolean)=>void;
  doDelta: boolean; setDoDelta:(v:boolean)=>void;
}) {
  return (
    <div style={box}>
      <div style={heading}>KPI steuern (wirkt bei „Übernehmen")</div>

      <div style={{ ...row }}>
        <label><input type="checkbox" checked={doSet} onChange={(e)=>setDoSet(__readChecked(e))}/> Aktion: KPI setzen</label>
        <label><input type="checkbox" checked={doDelta} onChange={(e)=>setDoDelta(__readChecked(e))}/> Aktion: Δ anwenden</label>
      </div>

      <div style={{ ...gridTwo }}>
        <label>Cash (€)<input type="number" value={k.cashEUR||0} onChange={(e)=>setK(s=>({ ...s, cashEUR: __readInputNumber(e) }))}/></label>
        <label>G/V (€)<input type="number" value={k.profitLossEUR||0} onChange={(e)=>setK(s=>({ ...s, profitLossEUR: __readInputNumber(e) }))}/></label>
        <label>Kunden<input type="number" value={k.customerLoyalty||0} onChange={(e)=>setK(s=>({ ...s, customerLoyalty: __readInputNumber(e) }))}/></label>
        <label>Bank<input type="number" value={k.bankTrust||0} onChange={(e)=>setK(s=>({ ...s, bankTrust: __readInputNumber(e) }))}/></label>
        <label>Workforce<input type="number" value={k.workforceEngagement||0} onChange={(e)=>setK(s=>({ ...s, workforceEngagement: __readInputNumber(e) }))}/></label>
        <label>Public<input type="number" value={k.publicPerception||0} onChange={(e)=>setK(s=>({ ...s, publicPerception: __readInputNumber(e) }))}/></label>
      </div>

      <div style={{ marginTop: 20, ...sub as any }}>Δ‑Werte</div>
      <div style={{ ...gridTwo }}>
        <label>Δ Cash<input type="number" value={d.cashEUR||0} onChange={(e)=>setD(s=>({ ...s, cashEUR: __readInputNumber(e) }))}/></label>
        <label>Δ G/V<input type="number" value={d.profitLossEUR||0} onChange={(e)=>setD(s=>({ ...s, profitLossEUR: __readInputNumber(e) }))}/></label>
        <label>Δ Kunden<input type="number" value={d.customerLoyalty||0} onChange={(e)=>setD(s=>({ ...s, customerLoyalty: __readInputNumber(e) }))}/></label>
        <label>Δ Bank<input type="number" value={d.bankTrust||0} onChange={(e)=>setD(s=>({ ...s, bankTrust: __readInputNumber(e) }))}/></label>
        <label>Δ Workforce<input type="number" value={d.workforceEngagement||0} onChange={(e)=>setD(s=>({ ...s, workforceEngagement: __readInputNumber(e) }))}/></label>
        <label>Δ Public<input type="number" value={d.publicPerception||0} onChange={(e)=>setD(s=>({ ...s, publicPerception: __readInputNumber(e) }))}/></label>
      </div>
    </div>
  );
}

function SectionDayControls({ day, setDay, dayAction, setDayAction }:{
  day: number; setDay:(n:number)=>void;
  dayAction: 'none'|'set'|'advance'; setDayAction:(v:'none'|'set'|'advance')=>void;
}) {
  return (
    <div style={box}>
      <div style={heading}>Tag steuern (wirkt bei „Übernehmen")</div>
      <div style={{ display:'flex', gap: 12, alignItems:'center' }}>
        <label><input type="radio" name="dayaction" checked={dayAction==='none'} onChange={()=>setDayAction('none')} /> Keine Aktion</label>
        <label><input type="radio" name="dayaction" checked={dayAction==='set'} onChange={()=>setDayAction('set')} /> Tag setzen</label>
        <label><input type="radio" name="dayaction" checked={dayAction==='advance'} onChange={()=>setDayAction('advance')} /> Tageswechsel</label>
        <label style={{ marginLeft: 12 }}>Tag
          <input type="number" value={day} min={1} max={14} onChange={(e)=>setDay(__readInputNumber(e)||1)} />
        </label>
      </div>
    </div>
  );
}

function SectionCoach({ coach, setCoach, coachReset, setCoachReset }:{ coach:boolean; setCoach:(v:boolean)=>void; coachReset:boolean; setCoachReset:(v:boolean)=>void; }) {
  return (
    <div style={box}>
      <div style={{ ...heading }}>Onboarding‑Coach</div>
      <div style={{ ...row }}>
        <label style={label}>Onboarding‑Coach aktivieren</label>
        <input type="checkbox" checked={!!coach} onChange={(e)=> setCoach(__readChecked(e))} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Coach‑Fortschritt zurücksetzen (bei Übernehmen)</label>
        <input type="checkbox" checked={!!coachReset} onChange={(e)=> setCoachReset(__readChecked(e))} />
      </div>
      <div style={{ ...sub }}>„Zurücksetzen" wird bei der nächsten Ausführung von „Übernehmen" ausgeführt.</div>
    </div>
  );
}

function SectionSaveAuto({ settings, setSettings }:{ settings: AdminSettings; setSettings:(f:(s:AdminSettings)=>AdminSettings)=>void; }) {
  return (
    <div style={box}>
      <div style={{ ...heading }}>Speicherstände & Auto Save</div>
      <div style={{ ...row }}>
        <label style={label}>Speicher-/Laden-Menü anzeigen</label>
        <input type="checkbox" checked={!!settings.features?.saveLoadMenu} onChange={(e)=> setSettings(s=>({ ...s, features: { ...(s.features||{saveLoadMenu:false,autoSave:false,coach:false,bankMechanics:false}), saveLoadMenu: __readChecked(e) } }))} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Auto Save beim Tageswechsel aktivieren</label>
        <input type="checkbox" checked={!!settings.features?.autoSave} onChange={(e)=> setSettings(s=>({ ...s, features: { ...(s.features||{saveLoadMenu:false,autoSave:false,coach:false,bankMechanics:false}), autoSave: __readChecked(e) } }))} />
      </div>
      <div style={{ ...sub }}>Auto Save speichert standardmäßig in den Slot „__autosave__", sobald der Tageswechsel erfolgt.</div>
    </div>
  );
}

function SectionSeed({ seedInput, setSeedInput }:{ seedInput:string; setSeedInput:(v:string)=>void; }) {
  return (
    <div style={box}>
      <div style={{ ...heading }}>Deterministischer Seed</div>
      <div style={{ ...row }}>
        <label style={label}>Seed</label>
        <input type="number" value={seedInput} onChange={(e)=>setSeedInput(__readInputValue(e))} style={{ width: 180 }} />
        <button style={btn} onClick={()=>{ const s = rollNewSeed(); setSeedInput(String(s)); }}>neu würfeln</button>
      </div>
      <div style={{ ...sub }}>Der Seed wird erst bei „Übernehmen" angewendet. Gleicher Seed + gleiche Schritte ⇒ identischer Verlauf (News/Zufall).</div>
    </div>
  );
}

function SectionInvariants({ inv, setInv }:{ inv: any; setInv: (v:any)=>void; }) {
  return (
    <div style={box}>
      <div style={{ ...heading }}>Invarianten (optional)</div>

      <div style={{ ...row }}>
        <label style={label}>Zahlungsverzug (neg. Cash) → Public Perception −5</label>
        <input type="checkbox" checked={!!inv.ppPenaltyOnNegCash} onChange={(e)=> setInv({ ...inv, ppPenaltyOnNegCash: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Negativer Cash → Kundentreue −2</label>
        <input type="checkbox" checked={!!inv.loyaltyPenaltyOnNegCash} onChange={(e)=> setInv({ ...inv, loyaltyPenaltyOnNegCash: __readChecked(e) })} />
      </div>

      <div style={{ ...row }}>
        <label style={label}>Payroll-Verzögerung → Workforce Engagement −10</label>
        <input type="checkbox" checked={!!inv.payrollDelay_weMinus10} onChange={(e)=> setInv({ ...inv, payrollDelay_weMinus10: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>5 Perioden Loss → Bank Trust −8</label>
        <input type="checkbox" checked={!!inv.loss5_bankTrustMinus8} onChange={(e)=> setInv({ ...inv, loss5_bankTrustMinus8: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>5 Perioden Loss → Public Perception −5</label>
        <input type="checkbox" checked={!!inv.loss5_publicPerceptionMinus5} onChange={(e)=> setInv({ ...inv, loss5_publicPerceptionMinus5: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>5 Perioden Loss → Kundenzufriedenheit −5</label>
        <input type="checkbox" checked={!!inv.loss5_customerLoyaltyMinus5} onChange={(e)=> setInv({ ...inv, loss5_customerLoyaltyMinus5: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Bank Trust &lt; 10 → Workforce Engagement −10</label>
        <input type="checkbox" checked={!!inv.bankTrustLt10_workEngagementMinus10} onChange={(e)=> setInv({ ...inv, bankTrustLt10_workEngagementMinus10: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Bank Trust &lt; 10 → Public Perception −10</label>
        <input type="checkbox" checked={!!inv.bankTrustLt10_publicPerceptionMinus10} onChange={(e)=> setInv({ ...inv, bankTrustLt10_publicPerceptionMinus10: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>5 Perioden Profit → Bank Trust +8</label>
        <input type="checkbox" checked={!!inv.profit5_bankTrustPlus8} onChange={(e)=> setInv({ ...inv, profit5_bankTrustPlus8: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>5 Perioden Profit → Public Perception +8</label>
        <input type="checkbox" checked={!!inv.profit5_publicPerceptionPlus8} onChange={(e)=> setInv({ ...inv, profit5_publicPerceptionPlus8: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>5 Perioden Profit → Kundenzufriedenheit +8</label>
        <input type="checkbox" checked={!!inv.profit5_customerLoyaltyPlus8} onChange={(e)=> setInv({ ...inv, profit5_customerLoyaltyPlus8: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Bank Trust &gt; 80 → Workforce Engagement +10</label>
        <input type="checkbox" checked={!!inv.bankTrustGt80_workEngagementPlus10} onChange={(e)=> setInv({ ...inv, bankTrustGt80_workEngagementPlus10: __readChecked(e) })} />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Bank Trust &gt; 80 → Public Perception +80</label>
        <input type="checkbox" checked={!!inv.bankTrustGt80_publicPerceptionPlus80} onChange={(e)=> setInv({ ...inv, bankTrustGt80_publicPerceptionPlus80: __readChecked(e) })} />
      </div>

      <div style={{ ...sub }}>
        Aktivierte Invarianten greifen bei „Übernehmen". Harte Invarianten (Clamping 0–100; Bankvertrauen=0 bei negativem Cash) sind immer aktiv.
      </div>
    </div>
  );
}

function SectionBank({ settings, setSettings }:{ settings: AdminSettings; setSettings:(f:(s:AdminSettings)=>AdminSettings)=>void; }) {
  return (
    <div style={box}>
      <div style={{ ...heading }}>Bankmechanik (Überziehung & Zins)</div>
      <div style={{ ...row }}>
        <label style={label}>Aktivieren</label>
        <input
          type="checkbox"
          checked={!!(settings.features && (settings.features as any).bankMechanics)}
          onChange={(e)=> setSettings(s => ({ ...s, features: { ...(s.features||{}), bankMechanics: __readChecked(e) } }))}
        />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Kreditlinie (€)</label>
        <input
          type="number"
          value={Number((settings as any).bank?.creditLineEUR || 0)}
          onChange={(e)=> setSettings(s => ({ ...s, bank: { ...(s.bank||{ creditLineEUR:0, interestRatePct:0 }), creditLineEUR: __readInputNumber(e) } }))}
          style={{ width: 180 }}
        />
      </div>
      <div style={{ ...row }}>
        <label style={label}>Zins p.a. (%)</label>
        <input
          type="number"
          value={Number((settings as any).bank?.interestRatePct || 0)}
          onChange={(e)=> setSettings(s => ({ ...s, bank: { ...(s.bank||{ creditLineEUR:0, interestRatePct:0 }), interestRatePct: __readInputNumber(e) } }))}
          style={{ width: 180 }}
          step="0.1"
        />
      </div>
      <div style={{ ...sub }}>
        Wirkung: Negativer Cash wird bis zur Kreditlinie automatisch überzogen (Cash ≥ 0), der genutzte Betrag wird als usedCreditEUR geführt. 
        Täglich wird Zins (p.a./365) vom Gewinn/Verlust abgezogen. Insolvenz erst, wenn Cash + Kreditlinie − usedCreditEUR &lt; 0 (modusabhängig).
      </div>
    </div>
  );
}

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
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Authentifizierung</h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Anmelde-Modus
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
              Email-Registrierung
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

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Spielstart-Regeln</h3>

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

      {/* CFO-Kredit (einziger MP-Mechanismus) */}
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
            <span>Countdown-Timer beim Start anzeigen</span>
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
              Lobby-Design
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
  
  {/* Spielseite – Theme */}
<div style={box}>
  <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>Spielseite – Theme</h3>

  <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
    <label style={{ fontWeight: 600, display:'block' }}>Hintergrund</label>
    <select
      value={settings.gameSettings?.backgroundTheme ?? 'dynamic'}
      onChange={e => setSettings(s => ({
        ...s,
        gameSettings: {
          ...(s.gameSettings ?? { allowUserOverride: false }),
          backgroundTheme: e.target.value as any
        }
      }))}
      style={{ padding:'6px 12px', borderRadius: 6, width: '100%', maxWidth: 300 }}
    >
      <option value="dynamic">Dynamic (animiertes Neuronen‑Netz)</option>
      <option value="minimal">Minimal (schlicht, hell)</option>
      <option value="corporate">Corporate (statisch, dunkel)</option>
    </select>

    <label style={{ display:'flex', alignItems:'center', gap: 8 }}>
      <input
        type="checkbox"
        checked={!!settings.gameSettings?.allowUserOverride}
        onChange={e => setSettings(s => ({
          ...s,
          gameSettings: {
            ...(s.gameSettings ?? { backgroundTheme: 'dynamic' }),
            allowUserOverride: e.target.checked
          }
        }))}
      />
      <span>Spieler dürfen Theme überschreiben</span>
    </label>

    <div className="small" style={{ color:'#6b7280' }}>
      Benutzer‑Override via URL (`?gameTheme=dynamic|minimal|corporate`) oder kleines 🎨‑Widget auf der Spielseite (wenn aktiviert).
    </div>
  </div>
</div>

}

function SectionTrainer({ onTrainerAccess, settings, setSettings }: {
  onTrainerAccess: () => void;
  settings: MultiplayerAdminSettings;
  setSettings: (updater: (prev: MultiplayerAdminSettings) => MultiplayerAdminSettings) => void;
}) {
  const [password, setPassword] = React.useState('');
  const [gameId, setGameId] = React.useState('');
  const [error, setError] = React.useState('');
  const roles = ['CEO', 'CFO', 'OPS', 'HRLEGAL'] as const;

  // Eindeutig benannte Trainer-Handler (verhindern Namens-Kollisionen)
  const trainerGenerateCredentials = () => {
    const next = { ...settings.presetCredentials };
    (['CEO','CFO','OPS','HRLEGAL'] as const).forEach(role => {
      next[role] = {
        username: `${role.toLowerCase()}_${Math.random().toString(36).substring(2,8)}`,
        password: generatePassword()
      };
    });
    setSettings(s => ({ ...s, presetCredentials: next }));
  };

  const trainerCopyCredentials = async () => {
    const lines = (['CEO','CFO','OPS','HRLEGAL'] as const).map(r => {
      const c = settings.presetCredentials[r];
      return `${r}: ${c.username} / ${c.password}`;
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {
      const ta = document.createElement('textarea');
      ta.value = lines.join('\n');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };


    const handleTrainerLogin = async () => {
    setError('');
    if (password !== 'observer101') {
      setError('Falsches Passwort');
      return;
    }
    if (!gameId.trim()) {
      setError('Spiel-ID erforderlich');
      return;
    }
    try {
      // 1) Auth sicherstellen (anonym, falls nötig)
      let { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
        user = data.user!;
      }

      // 2) Spiel verifizieren
      const { data: game, error: gErr } = await supabase
        .from('games')
        .select('id')
        .eq('id', gameId)
        .single();
      if (gErr || !game) {
        setError('Spiel nicht gefunden');
        return;
      }

      // 3) Trainer-Player upsert (RLS: vorhanden über Auth)
      const { data: playerRow, error: upErr } = await supabase
        .from('players')
        .upsert({
          game_id: gameId,
          user_id: user.id,
          role: 'TRAINER',
          name: 'Trainer',
          is_gm: false,
          is_active: true,
          last_seen_at: new Date().toISOString()
        }, { onConflict: 'game_id,user_id' })
        .select()
        .single();
      if (upErr) {
        setError('Fehler beim Trainer-Login');
        return;
      }

     // ++ NEU: Trainer-Mitgliedschaft setzen (für RLS, vermeidet Rekursion)
      try {
        const { error: tmErr } = await supabase
          .from('trainer_memberships')
          .upsert({ game_id: gameId, user_id: user.id });
        if (tmErr) {
          // RLS evtl. noch nicht ausgerollt -> nicht hart abbrechen
          console.warn('[TrainerMemberships] Upsert warn:', tmErr.message || tmErr);
        }
      } catch (e) {
        console.warn('[TrainerMemberships] Upsert failed (non-fatal):', e);
      }

      // 4) Flags/IDs setzen
      sessionStorage.setItem('mp_trainer_mode', 'true');
sessionStorage.setItem('mp_trainer_game_id', gameId);
 sessionStorage.setItem('mp_current_role', 'TRAINER');
 sessionStorage.setItem('mp_current_game', gameId);
 if (playerRow?.id) sessionStorage.setItem('mp_player_id', playerRow.id);

      // 5) In den Multiplayer-Flow (Lobby holt den Bypass ab)
      onTrainerAccess();
    } catch (err) {
      setError('Fehler beim Trainer-Login');
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Trainer*in-Login */}
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>🎓 Trainer*in-Login</h3>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          Zugang nur für Trainingsleitung. Erlaubt Beobachtung aller Spielerentscheidungen.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <input
            type="password"
            placeholder="Passwort (Trainer*in)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
          />
          <input
            type="text"
            placeholder="Spiel-ID (UUID)"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
          />
          <button
            onClick={handleTrainerLogin}
            style={{
              padding: '8px 16px',
              background: '#111827',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer'
            }}
          >
            Als Trainer*in einloggen
          </button>
        </div>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </div>
    </div>
  );
}



// ────────────────────────────────────────────────────────────────────────────────
// Abschnitt: Insolvenz‑Regeln
// ────────────────────────────────────────────────────────────────────────────────
function SectionInsolvencyRules({ settings, setSettings }:{ settings: AdminSettings; setSettings:(f:(s:AdminSettings)=>AdminSettings)=>void; }) {
  const rules: InsolvencyRulesMap = (settings as any).insolvencyConfig?.rules || DEFAULT_INSOLVENCY_RULES;

  const updateRule = (key: string, patch: Partial<InsolvencyRule>) => {
    setSettings((s: AdminSettings) => {
      const curr: InsolvencyRulesMap = ((s as any).insolvencyConfig?.rules || DEFAULT_INSOLVENCY_RULES) as any;
      const next: InsolvencyRulesMap = { ...curr, [key]: { ...(curr as any)[key], ...patch, key } as any };
      return { ...(s as any), insolvencyConfig: { rules: next } } as AdminSettings;
    });
  };

  const resetDefaults = () => {
    setSettings((s: AdminSettings) => ({ ...(s as any), insolvencyConfig: { rules: DEFAULT_INSOLVENCY_RULES } } as AdminSettings));
  };

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

  return (
    <div style={box}>
      <div style={heading}>Insolvenz‑Regeln</div>
      <p className="small" style={{ marginBottom: 12 }}>
        Hier legen Sie fest, welche Kriterien eine Insolvenz auslösen. Aktivierte Regeln greifen <strong>zusätzlich</strong> zur bestehenden Negativ‑Cash‑Logik. 
        Standard: Nur <em>Cash &lt; 0</em> ist aktiv.
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
        {keys.map((k) => {
          const r = (rules as any)[k] || { key: k, enabled: false, threshold: 0 };
          return (
            <div key={k} style={{ border:'1px solid #e5e7eb', borderRadius:8, padding:12 }}>
              <label style={{ display:'flex', alignItems:'center', gap:8 }}>
                <input type="checkbox" checked={!!r.enabled} onChange={(e)=>updateRule(k,{ enabled: e.target.checked })} />
                <span style={{ fontWeight:600 }}>{labelFor(k)}</span>
              </label>
              <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:8 }}>
                <span className="small" style={{ minWidth: 100 }}>Schwelle</span>
                <input
                  type="number"
                  value={Number(r.threshold ?? 0)}
                  onChange={(e)=>updateRule(k,{ threshold: Number(e.target.value) || 0 })}
                  style={{ width: 140 }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop:12 }}>
        <button style={btn} onClick={resetDefaults}>Auf Standard zurücksetzen</button>
      </div>
      <div className="small" style={{ marginTop:8, color:'#6b7280' }}>
        Hinweis: Für <em>Cash</em> wird die „effektive Liquidität“ verwendet (Liquidität + ggf. heute geplante Kreditaufnahme).
      </div>
    </div>
  );
}
type TabId = 'general'|'zeit'|'scoring'|'szenario'|'kpi'|'insorules'|'tech'|'multiplayer';

function AdminPanelInner({ onClose }: { onClose?: () => void }) {
  const [draft, setDraft] = React.useState<AdminSettings>(() => loadAdminSettings());
  const [multiplayerSettings, setMultiplayerSettings] = React.useState<MultiplayerAdminSettings>(() => loadMultiplayerSettings());
  const [active, setActive] = React.useState<TabId>('general');
  const [toast, setToast] = React.useState<string>('');
  const [busy, setBusy] = React.useState(false);

  const [seedInput, setSeedInput] = React.useState<string>(() => {
    const s = loadSeedLocal();
    return s == null || Number.isNaN(s) ? '' : String(s);
  });
  const [inv, setInv] = React.useState<InvariantsLocal>(() => loadInvariantsLocal());
  const [coachReset, setCoachReset] = React.useState<boolean>(false);

  const [k, setK] = React.useState<KPI>({ cashEUR: 0, profitLossEUR: 0, customerLoyalty: 50, bankTrust: 50, workforceEngagement: 50, publicPerception: 50 });
  const [d, setD] = React.useState<Partial<KPI>>({});
  const [doSet, setDoSet] = React.useState(false);
  const [doDelta, setDoDelta] = React.useState(false);
  const [day, setDay] = React.useState<number>(1);
  const [dayAction, setDayAction] = React.useState<'none'|'set'|'advance'>('none');

  React.useEffect(()=>{ applyGlobals(draft); }, []);
  React.useEffect(() => {
    // Lade und setze Multiplayer Settings beim Start
    const saved = localStorage.getItem('admin:multiplayer');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        (globalThis as any).__multiplayerSettings = settings;
        console.log('Multiplayer Settings geladen:', settings);
      } catch (e) {
        console.error('Fehler beim Laden der Multiplayer Settings:', e);
      }
    }
  }, []);
  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(()=>setToast(''), 1600);
  }

  function normalizeDraftWeights(s: AdminSettings): AdminSettings {
    return { ...s, scoringWeights: normalizeWeights(s.scoringWeights) };
  }

  async function onApply() {
    try {
      setBusy(true);

      const norm = normalizeDraftWeights(draft);

      // 🔒 Merge & Enforce Exklusivität: allowCreditMP vs. CFO‑Kredit (MP)
      let allowCreditFromLS = false;
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
          const obj = JSON.parse(raw);
          allowCreditFromLS = !!(obj?.features?.allowCreditMP);
        }
      } catch {}

      const effectiveAllowCreditMP = multiplayerSettings.creditSettings?.enabled ? false : !!allowCreditFromLS;

      const norm2: AdminSettings = {
        ...norm,
        features: { ...(norm.features || {}), allowCreditMP: effectiveAllowCreditMP } as any
      };

      // Persist AdminSettings (inkl. allowCreditMP) & apply globals
      saveAdminSettings(norm2);
      applyGlobals(norm2);

      // Persist Multiplayer‑Settings
      localStorage.setItem('admin:multiplayer', JSON.stringify(multiplayerSettings));
      (globalThis as any).__multiplayerSettings = multiplayerSettings;

      saveInvariantsLocal(inv);
      applyInvariantsGlobals(inv);
      const seedNum = seedInput === '' ? null : Number(seedInput);
      saveSeedLocal(seedNum ?? 0);
      applySeedGlobals(seedNum);

      if (coachReset) {
        try { localStorage.removeItem('coach:v1'); window.dispatchEvent(new Event('coach:reset')); (window as any).__admin?.message?.('Coach zurückgesetzt'); } catch {}
        setCoachReset(false);
      }

      if (doSet) { try { window.dispatchEvent(new CustomEvent('admin:kpi:set', { detail: k })); } catch {} setDoSet(false); }
      if (doDelta) { try { window.dispatchEvent(new CustomEvent('admin:kpi:add', { detail: d })); } catch {} setDoDelta(false); }
      if (dayAction === 'set') { try { window.dispatchEvent(new CustomEvent('admin:set-day', { detail: day })); } catch {} setDayAction('none'); }
      if (dayAction === 'advance') { try { window.dispatchEvent(new Event('admin:advance-day')); } catch {} setDayAction('none'); }

      showToast('Einstellungen gespeichert & angewendet.');
    } finally {
      setBusy(false);
    }
  }

  async function onSaveAndClose() {
    await onApply();
    if (onClose) onClose();
  }

// Neue Komponente im AdminPanel.tsx
function SectionTrainerAccess() {
  const [pw, setPw] = React.useState('');
  const [code, setCode] = React.useState(''); // Game-ID oder Join-Code
  const [err, setErr] = React.useState('');

  const handle = async () => {
    if (pw !== 'observer101') { setErr('Falsches Passwort'); return; }
    let gameId = code.trim();
    if (gameId.length < 10) {
      // Join-Code → ID auflösen
      const { data } = await supabase.from('games').select('id').eq('join_code', gameId.toUpperCase()).single();
      if (!data?.id) { setErr('Spiel nicht gefunden'); return; }
      gameId = data.id;
    }
    localStorage.setItem('mp_trainer_mode', 'true');
    localStorage.setItem('mp_trainer_game_id', gameId);
    window.location.href = '/?multiplayer=1'; // führt via MultiAuthLogin in den Trainer-Flow
  };

  return (
    <div style={{border:'1px solid #e5e7eb', padding:12, borderRadius:8}}>
      <h3>🎓 Trainer*in-Zugang</h3>
      <input type="password" placeholder="Passwort" value={pw} onChange={e=>setPw(e.target.value)} />
      <input type="text" placeholder="Game-ID oder Join-Code" value={code} onChange={e=>setCode(e.target.value)} />
      <button onClick={handle}>Als Trainer*in einloggen</button>
      {err && <div style={{color:'#b91c1c'}}>{err}</div>}
    </div>
  );
}

  
  function onCancel() {
    const persisted = loadAdminSettings();
    setDraft(persisted);
    setMultiplayerSettings(loadMultiplayerSettings());
    setInv(loadInvariantsLocal());
    const s = loadSeedLocal(); setSeedInput(s == null || Number.isNaN(s) ? '' : String(s));
    setCoachReset(false);
    setDoSet(false); setDoDelta(false); setDayAction('none');
    if (onClose) onClose();
  }

  const tabs: Array<{id:TabId; title:string; body: React.ReactNode;}> = [
    {
      id:'general', title:'Allgemein',
      body:(
        <>
          <SectionSettings settings={draft} setSettings={setDraft} />
          <SectionSaveAuto settings={draft} setSettings={setDraft} />
        </>
      )
    },
    {
      id:'zeit', title:'Zeit & Ablauf',
      body:(
        <>
          <SectionRoundTime settings={draft} setSettings={setDraft} />
          <SectionDayControls day={day} setDay={setDay} dayAction={dayAction} setDayAction={setDayAction} />
        </>
      )
    },
    {
      id:'insorules', title:'Insolvenz‑Regeln',
      body:(
        <SectionInsolvencyRules settings={draft} setSettings={setDraft} />
      )
    },
    {

    
      id:'scoring', title:'Scoring & Bericht',
      body:(
        <SectionScoring settings={draft} setSettings={setDraft} />
      )
    },
    {
      id:'szenario', title:'Szenario & Intensität',
      body:(
        <>
          <ScenarioEditor />
          <SectionEventIntensity settings={draft} setSettings={setDraft} />
        </>
      )
    },
    {
      id:'kpi', title:'KPI & Steuerung',
      body:(
        <SectionKpiControls
          k={k} setK={fn=>setK(fn(k))}
          d={d} setD={fn=>setD(fn(d))}
          doSet={doSet} setDoSet={setDoSet}
          doDelta={doDelta} setDoDelta={setDoDelta}
        />
      )
    },
    {
      id:'tech', title:'Technik/Debug',
      body:(
        <>
          <SectionCoach
            coach={!!draft.features?.coach}
            setCoach={(v:boolean)=> setDraft(s=>({ ...s, features:{ ...(s.features||{}), coach: v } }))}
            coachReset={coachReset}
            setCoachReset={setCoachReset}
          />
          <SectionSeed seedInput={seedInput} setSeedInput={setSeedInput} />
          <SectionInvariants inv={inv} setInv={setInv} />
          <SectionBank settings={draft} setSettings={setDraft} />
        </>
      )
    },
   {
  id:'multiplayer', title:'🎮 Multiplayer',
  body:(
    <>
      <SectionMultiplayer 
        settings={multiplayerSettings}
        setSettings={setMultiplayerSettings}
      />
      <SectionTrainer
  onTrainerAccess={() => {
    window.location.href = '/?multiplayer=true';
  }}
  settings={multiplayerSettings} // Übergeben Sie die settings-Prop
  setSettings={setMultiplayerSettings} // Übergeben Sie die setSettings-Prop

      />
    </>
  )
},
 

 // ... (Der gesamte Code Ihrer AdminPanelInner-Funktion, einschließlich der Definition des 'tabs'-Arrays) ...

  ]; // <--- DIESE Klammer schließt das 'tabs'-Array ab.

  return ( // <--- DIESE Klammer öffnet das JSX-Return-Statement.
    <div style={{ padding: 16 }}>
      <h2 style={heading}>Admin‑Konsole</h2>
      {toast && <div style={{ margin:'8px 0', color:'#059669' }}>{toast}</div>}

      <div style={tabsBar}>
        {tabs.map(t => (
          <button key={t.id}
            style={active===t.id ? tabBtnActive : tabBtn}
            onClick={()=>setActive(t.id)}
            aria-selected={active===t.id}
            role="tab"
          >
            {t.title}
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-live="polite">
        {tabs.find(t=>t.id===active)?.body}
      </div>

      <div style={footerBar}>
        <button style={btnPrimary} onClick={onApply} disabled={busy}>Übernehmen</button>
        <button style={btn} onClick={onSaveAndClose} disabled={busy}>Speichern &amp; Schließen</button>
        <button style={btn} onClick={onCancel} disabled={busy}>Abbrechen</button>
      </div>
    </div>
   );
}

export default function AdminPanel({ onClose }: { onClose?: () => void }) {
  return <AdminPanelInner onClose={onClose} />;
}

export function AdminPanelWithGate({ onClose }: { onClose?: () => void }) {
  return (
    <AdminGate>
      <AdminPanelInner onClose={onClose} />
    </AdminGate>
  );
}