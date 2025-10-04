// src/App.tsx
import React from 'react';
import '@/admin/adminBridge';  // Anwenden gespeicherter Admin-Einstellungen beim App-Start
import Shell from '@/components/layout/Shell';
import Onboarding from '@/components/setup/Onboarding';
import KpiCockpit from '@/components/hud/KpiCockpit';
import DayTimer from '@/components/hud/DayTimer';
import NewsFeed from '@/components/news/NewsFeed';
import DecisionList from '@/components/decisions/DecisionList';
import ExportButtons from '@/components/exports/ExportButtons';
import DebriefButton from '@/components/exports/DebriefButton';
import IntranetButton from '@/components/intranet/IntranetButton';
import InsolvencyModal from '@/components/dialogs/InsolvencyModal';
import InfoButtons from '@/components/info/InfoButtons'; 
import EndingView from '@/ui/EndingView';
import KpiHistoryModal from '@/components/hud/KpiHistoryModal';
import UserNotesField from '@/components/notes/UserNotesField';
import AttachmentModal from '@/components/dialogs/AttachmentModal';
import InfoModal from '@/components/info/InfoModal';
import { infoContents } from '@/data/infoContent';

import { company } from '@/data/companyProfile';
import { day1Blocks, day1News } from '@/data/scenario_day_01';
import { day2Blocks, day2News } from '@/data/scenario_day_02';
import { day3Blocks, day3News } from '@/data/scenario_day_03';
import { day4Blocks, day4News } from '@/data/scenario_day_04';
import { day5Blocks, day5News } from '@/data/scenario_day_05';
import { day6Blocks, day6News } from '@/data/scenario_day_06';
import { day7Blocks, day7News } from '@/data/scenario_day_07';
import { day8Blocks, day8News } from '@/data/scenario_day_08';
import { day9Blocks, day9News } from '@/data/scenario_day_09';
import { day10Blocks, day10News } from '@/data/scenario_day_10';
import { day11Blocks, day11News } from '@/data/scenario_day_11';
import { day12Blocks, day12News } from '@/data/scenario_day_12';
import { day13Blocks, day13News } from '@/data/scenario_day_13';
import { day14Blocks, day14News } from '@/data/scenario_day_14';
import { generateDailyRandomValues } from '@/core/engine/gameEngine';
import type { EndingResult } from '@/core/engine/ending';
import { determineEndingWithContext } from '@/core/engine/ending_extras';
import type { GameState } from '@/core/engine/gameEngine';
import { reducer, simulateNext } from '@/core/engine/reducers';
import { KPI, DayNewsItem } from '@/core/models/domain';
import type { RoleId, DecisionBlock } from '@/core/models/domain';
import { saveState, loadState, clearState } from '@/services/storageLocal';
import type { AdminSettings } from '@/admin/adminBridge';
import { pickOptionForBlock } from '@/core/engine/simulation';
import RandomValuesDisplay from '@/components/hud/RandomValuesDisplay';
import RandomNewsPanel from '@/components/hud/RandomNewsPanel';
// >>> Coach nur auf der Spielseite einbinden (nicht im Onboarding):
import CoachController from '@/components/CoachController';

// ✅ korrekter Import für PDF-Export-Button (aus Deinem Snippet)
import ExportReportButton from './components/ExportReportButton';
// ✅ ReportStore-Import an den Dateikopf geholt (nicht in der Funktion)
import { ReportStore } from './reporting/reportBuilder';

import pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
(pdfMake as any).vfs = (pdfFonts as any).default?.pdfMake?.vfs || (pdfFonts as any).pdfMake?.vfs;

// Narrative (automatisch generiert)
import { narrativesByDay } from '@/data/narratives/auto';
import type { NarrativeBeat } from '@/data/narratives/types';
import SaveLoadMenu from '@/components/SaveLoadMenu';
import AutoSaveHook from '@/components/AutoSaveHook';

// -------------------------------------------------------------
// Simple seeded RNG function
function makeRng(seed: number) {
  let state = seed;
  return function() {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

// EUR-Helfer (lokal, keine globalen Styles/Änderungen)
function fmtEUR(n: number) {
  try {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(Math.round(n || 0));
  } catch {
    return `${Math.round(n || 0)} €`;
  }
}

// Admin-Feature-Flag sicher lesen (Global → LocalStorage-Fallback)
function __readWhatIfFlag(): boolean {
  try {
    const g: any = (globalThis as any);
    if (typeof g.__featureWhatIfPreview === 'boolean') return !!g.__featureWhatIfPreview;
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem('adminSettings');
      if (raw) {
        try {
          const obj = JSON.parse(raw);
          return !!(obj?.features?.whatIfPreview);
        } catch {}
      }
    }
  } catch {}
  return false;
}

// Konstanten
const DAY_SECONDS_DEFAULT = 300; // 5 Min Basis
const GRACE_SECONDS = 180;
const ALL_ROLES: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];
const computeDaySeconds = (nRoles: number) => 8 * 60 * Math.max(1, nRoles);

// ---- Rundenzeit-Override lesen (Admin) ----
function __getRoundTimeMode(): 'off'|'global'|'matrix' {
  const g: any = globalThis as any;
  const m = g.__roundTimeMode;
  return (m === 'global' || m === 'matrix') ? m : 'off';
}
function __getRoundTimeGrace(): number | undefined {
  const g: any = globalThis as any;
  const n = Number(g.__roundTimeGraceSec);
  return Number.isFinite(n) ? n : undefined;
}
function __getRoundTimeMatrix(): Record<number, Partial<Record<RoleId, number>>> | undefined {
  const g: any = globalThis as any;
  return g.__roundTimeMatrix as any;
}
function __getRoundTimeGlobalSec(): number | undefined {
  const g: any = globalThis as any;
  const n = Number(g.__roundTimeGlobalSec);
  return (Number.isFinite(n) && n > 0) ? n : undefined;
}
/** Ermittelt die Rundenzeit (Sek.) für gegebenen Tag/Rollen gemäß Admin-Override.
 *  Rückgabe: number (Sekunden) oder undefined (keine Vorgabe → Automatik verwenden).
 */
function getConfiguredDaySecondsFor(day: number, roles: RoleId[]): number | undefined {
  const mode = __getRoundTimeMode();
  if (mode === 'global') {
    const g = __getRoundTimeGlobalSec();
    if (typeof g === 'number') return g;
  }
  if (mode === 'matrix') {
    const M = __getRoundTimeMatrix();
    if (M) {
      const row = (M as any)[day] || (M as any)[String(day)];
      if (row && typeof row === 'object') {
        let sum = 0, any = false;
        for (const r of roles) {
          const v = Number((row as any)[r]);
          if (Number.isFinite(v) && v > 0) { sum += v; any = true; }
        }
        if (any) return sum;
      }
    }
  }
  return undefined;
}

// Tagesdaten
function getBlocksForDay(day: number): DecisionBlock[] {
  switch (day) {
    case 1:  return day1Blocks;
    case 2:  return day2Blocks;
    case 3:  return day3Blocks;
    case 4:  return day4Blocks;
    case 5:  return day5Blocks;
    case 6:  return day6Blocks;
    case 7:  return day7Blocks;
    case 8:  return day8Blocks;
    case 9:  return day9Blocks;
    case 10: return day10Blocks;
    case 11: return day11Blocks;
    case 12: return day12Blocks;
    case 13: return day13Blocks;
    case 14: return day14Blocks;
    default: return [];
  }
}
function getNewsForDay(day: number): DayNewsItem[] {
  switch (day) {
    case 1:  return day1News;
    case 2:  return day2News;
    case 3:  return day3News;
    case 4:  return day4News;
    case 5:  return day5News;
    case 6:  return day6News;
    case 7:  return day7News;
    case 8:  return day8News;
    case 9:  return day9News;
    case 10: return day10News;
    case 11: return day11News;
    case 12: return day12News;
    case 13: return day13News;
    case 14: return day14News;
    default: return [];
  }
}

// Zuordnung Narrativ ↔ Entscheidungen (heuristisch)
function inferRelatedDecisionIds(category: string, blocks: DecisionBlock[]): string[] {
  const pick = (roles: RoleId[]) => blocks.filter(b => roles.includes(b.role)).map(b => b.id);
  switch (category) {
    case 'bank':     return pick(['CEO','CFO']);
    case 'supplier': return pick(['OPS','CFO']);
    case 'customer': return pick(['OPS','CEO']);
    case 'press':    return pick(['CEO','HRLEGAL']);
    case 'internal': return pick(['HRLEGAL']);
    case 'authority':return pick(['CFO','HRLEGAL']);
    default:         return [];
  }
}

// -------------------------------------------------------------
interface AppProps {
  onBackToHome?: () => void;
}

export default function App({ onBackToHome }: AppProps) {
  // Back-Button für die Shell erstellen
  const backButton = onBackToHome ? (
    <button
      onClick={onBackToHome}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        color: '#e5e7eb',
        border: '1px solid rgba(37,99,235,0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #374151, #1f2937)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, #1f2937, #111827)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      }}
      title="Zur Startseite"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Zur Startseite
    </button>
  ) : null;

  // Reducer- und UI-State
  const [state, dispatch] = React.useReducer(reducer, {
    day: 1,
    kpi: company.initialKPI,
    kpiHistory: [],
    pendingDeltas: [],
    log: [],
    playerName: '',
    playerRole: 'CEO',     // legacy Feld
    playerRoles: ['CEO'],  // Mehrrollen
    burnPerDayEUR: -411,   // ~-150k/365 Tage
    isOver: false,
    insolvency: false
  } as GameState);

  // Bank: sofortige Inanspruchnahme (User) → sicher, global-konsistent, ohne 'debt'
  React.useEffect(() => {
    const handler = (e: Event) => {
      try {
        const amtReq = Math.round(Number((e as CustomEvent).detail?.amount) || 0);
        if (!Number.isFinite(amtReq) || amtReq <= 0) return;
        const g: any = globalThis as any;
        const bankOn = !!g.__featureBankMechanics;
        if (!bankOn) return;
        const creditLine = Number((g.__bankSettings?.creditLineEUR ?? g.__bankCreditLineEUR) || 0);
        let used = Math.max(0, Number(g.__usedCreditEUR || 0));
        const available = Math.max(0, creditLine - used);
        const amt = Math.max(0, Math.min(amtReq, available));
        if (amt <= 0) return;

        // 1) Globale Spiegelwerte aktualisieren (HUD liest daraus)
        used = Math.round(used + amt);
        g.__usedCreditEUR = used;
        try { if (typeof localStorage !== 'undefined') localStorage.setItem('bank:lastDraw', String(amt)); } catch {}

        // 2) KPI-Liquidität erhöhen (Reducer-seitig robust, kein 'debt' im Projekt)
        dispatch({ type: 'ADMIN_ADD_KPI', delta: { cashEUR: amt } } as any);

        // 3) Optional: Store-Shadow der Bankdaten sanft mergen (falls vorhanden)
        dispatch({ type: 'INIT', payload: { usedCreditEUR: used } } as any);
      } catch {
        // ignore
      }
    };
    window.addEventListener('bank:draw-now', handler as any);
    return () => window.removeEventListener('bank:draw-now', handler as any);
  }, []);

  // ✅ ReportStore-Start (Dein Snippet), jetzt korrekt nach der state-Deklaration
  React.useEffect(() => {
    if (!state) return;
    const roles = state.playerRoles?.length ? state.playerRoles : [state.playerRole].filter(Boolean);
    ReportStore.startRun({
      kpiStart: state.kpi,
      roles,
      playerName: state.playerName,      // falls vorhanden
      discountRatePA: 0.08,              // optional: NPV Diskontsatz p.a.
      dayLengthInDays: 1,                // optional: Sim-Tag-Länge (für Tageszins)
      scoringWeights: { cashEUR: 0.5, profitLossEUR: 0.5 } // optional
    });
    // nur einmal ausführen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [started, setStarted] = React.useState(false);
  const [showHistoryKey, setShowHistoryKey] = React.useState<keyof KPI | null>(null);
  const [daySeconds, setDaySeconds] = React.useState(DAY_SECONDS_DEFAULT);
  const [graceSeconds, setGraceSeconds] = React.useState(GRACE_SECONDS);
  const [finalShown, setFinalShown] = React.useState(false);
  const [showInsolvencyModal, setShowInsolvencyModal] = React.useState(false);

  // Attachment Modal State
  const [attachmentModalContent, setAttachmentModalContent] = React.useState<{ title: string; content: string } | null>(null);
  const [modalType, setModalType] = React.useState<'privacy' | 'imprint' | 'disclaimer' | null>(null);

  // News-Detailpanel
  const [openNewsId, setOpenNewsId] = React.useState<string | null>(null);
  const [activeRoleTab, setActiveRoleTab] = React.useState<RoleId | null>(null);

  // Automatisches Scrollen zum Seitenanfang bei wichtigen Änderungen
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.day, started, state.isOver]);

  // Persistenz
  React.useEffect(() => {
    const saved = loadState();
    if (saved && confirm('Gespeicherten Spielstand laden?')) {
      dispatch({ type: 'INIT', payload: saved });
      setStarted(true);
    }
  }, []);
  React.useEffect(() => { if (started) saveState(state); }, [state, started]);

  // Rundenzeit je Tag/Rollen live aus Admin-Override oder Automatik ableiten
  React.useEffect(() => {
    const roles = (state.playerRoles && state.playerRoles.length) ? state.playerRoles : [state.playerRole];
    const autoSec = computeDaySeconds(roles.length || 1);
    const confSec = getConfiguredDaySecondsFor(state.day || 1, roles);
    setDaySeconds(typeof confSec === 'number' ? confSec : autoSec);
    const gGrace = __getRoundTimeGrace();
    if (typeof gGrace === 'number') setGraceSeconds(gGrace);
  }, [state.day, state.playerRoles, state.playerRole]);

  // Szenario-Import (Editor)
  React.useEffect(() => {
    const onImport = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      dispatch({ type: 'SCENARIO_IMPORT', mode: detail.mode, compiled: { scheduledDeltas: detail.scheduledDeltas, randomNews: detail.randomNews, meta: detail.meta } } as any);
    };
    window.addEventListener('admin:scenario:import', onImport as EventListener);
    return () => { window.removeEventListener('admin:scenario:import', onImport as any); };
  }, []);

  // Admin-Bridge (Settings + KPI + Reset)
  React.useEffect(() => {
    const onSettings = (e: Event) => {
      const d = (e as CustomEvent<AdminSettings>).detail;
      const rolesNow = (state.playerRoles && state.playerRoles.length) ? state.playerRoles : [state.playerRole];
      const autoSecNow = computeDaySeconds(rolesNow.length || 1);
      const confSecNow = getConfiguredDaySecondsFor(state.day || 1, rolesNow);
      setDaySeconds(typeof confSecNow === 'number' ? confSecNow : (typeof (d as any).dayDurationSec === 'number' ? (d as any).dayDurationSec : autoSecNow));
      if (typeof (d as any).gracePeriodSec === 'number') setGraceSeconds((d as any).gracePeriodSec);
      else { const gg = __getRoundTimeGrace(); if (typeof gg === 'number') setGraceSeconds(gg); }
      if (d.difficulty) { (globalThis as any).__npcDifficulty = d.difficulty; }
      if (typeof d.randomNews === 'boolean') { (globalThis as any).__randomNews = d.randomNews; }
      if (typeof d.seed === 'number' && d.seed) { (globalThis as any).__rng = makeRng(d.seed); }
      if (d.npcProfile) { (globalThis as any).__npcProfile = d.npcProfile; }
      if (d.leakage) { (globalThis as any).__leakageRole = { ...((globalThis as any).__leakageRole||{}), ...d.leakage }; }
      if (d.insolvencyMode) { (globalThis as any).__insolvencyMode = d.insolvencyMode; } // ← NEU
      if (typeof (d as any).difficultyAffectsRandoms === 'boolean') { (globalThis as any).__difficultyAffectsRandoms = !!(d as any).difficultyAffectsRandoms; }
      if (typeof (d as any).difficultyAffectsScoring === 'boolean') { (globalThis as any).__difficultyAffectsScoring = !!(d as any).difficultyAffectsScoring; }
    };
    const onKpiSet = (e: Event) => {
      const kpi = (e as CustomEvent<Partial<KPI>>).detail;
      dispatch({ type: 'ADMIN_SET_KPI', kpi });
    };
    const onKpiAdd = (e: Event) => {
      const delta = (e as CustomEvent<Partial<KPI>>).detail;
      dispatch({ type: 'ADMIN_ADD_KPI', delta });
    };
    const onReset = () => { clearState(); window.location.reload(); };

    window.addEventListener('admin:settings', onSettings);
    window.addEventListener('admin:kpi:set', onKpiSet);
    window.addEventListener('admin:kpi:add', onKpiAdd);
    window.addEventListener('admin:reset', onReset as EventListener);

    return () => {
      window.removeEventListener('admin:settings', onSettings);
      window.removeEventListener('admin:kpi:set', onKpiSet as any);
      window.removeEventListener('admin:kpi:add', onKpiAdd as any);
      window.removeEventListener('admin:reset', onReset as any);
    };
  }, []);

  // Endbewertung
  React.useEffect(() => {
    if (state.isOver && !finalShown) {
      const ending = state.insolvency
        ? ({
            id: 'INSOLVENCY',
            title: 'Finale: Insolvenz',
            summary: 'Das Unternehmen ist zahlungsunfähig; kritische Zahlungen konnten nicht gesichert werden.',
            score: 0,
            breakdown: {
              cash: state.kpi.cashEUR,
              pl: state.kpi.profitLossEUR,
              customers: state.kpi.customerLoyalty,
              bank: state.kpi.bankTrust,
              workforce: state.kpi.workforceEngagement,
              publicPerception: state.kpi.publicPerception
            },
            bonus: 0,
            malus: 0,
            suppressedInsolvencyCount: state.engineMeta?.suppressedInsolvencyCount || 0
          } as EndingResult)
        : determineEndingWithContext(state);
      setFinalEnding(ending);
      setFinalShown(true);
      if (state.insolvency) setShowInsolvencyModal(true);
    }
  }, [state.isOver, state.insolvency, finalShown, state.kpi, state.engineMeta]);

  // Spielstart
  const startGame = (playerName: string, selectedRoles: RoleId[]) => {
    const secAuto = computeDaySeconds(selectedRoles.length || 1);
    const secConf = getConfiguredDaySecondsFor(1, selectedRoles);
    setDaySeconds(typeof secConf === 'number' ? secConf : secAuto);
    
    // Zufallswerte für Tag 1 generieren
    const initialRandoms = generateDailyRandomValues(company.initialKPI.cashEUR);
    
    dispatch({
      type: 'INIT',
      payload: {
        playerName,
        playerRole: selectedRoles[0] ?? 'CEO',
        playerRoles: selectedRoles,
        kpi: company.initialKPI,
        day: 1,
        isOver: false,
        insolvency: false,
        kpiHistory: [],
        log: [],
        pendingDeltas: [],
        engineMeta: {
          currentDayRandoms: initialRandoms,
          dailyRandomValues: { 1: initialRandoms }
        }
      }
    });
    setStarted(true);
    // >>> Startsignal für Spielansicht (Coach/start-of-game Hooks)
    try { window.dispatchEvent(new Event('ui:enter-game')); } catch {}
  };

  // Entscheidungen-Handler
  const onChoose = (b: DecisionBlock, optId: 'a' | 'b' | 'c' | 'd') => {
    const opt = b.options.find(o => o.id === optId)!;
    dispatch({
      type: 'CHOOSE_OPTION',
      blockId: b.id, day: b.day, role: b.role,
      optId, optLabel: opt.label, kpiDelta: opt.kpiDelta
    });
  };
  
  const onCustom = (b: DecisionBlock, text: string) => {
    dispatch({ type: 'SET_CUSTOM_TEXT', blockId: b.id, day: b.day, role: b.role, text });
  };

  // Attachment Handler
  const handleOpenAttachment = (filename: string) => {
    const content = `Inhalt der Datei: ${filename}`;
    setAttachmentModalContent({ title: filename, content });
  };

  // NPC-Autopilot
  const fillNpcDecisions = React.useCallback(() => {
    const myRoles = state.playerRoles?.length ? state.playerRoles : [state.playerRole];
    const npcRoles = ALL_ROLES.filter(r => !myRoles.includes(r));
    if (npcRoles.length === 0) return;

    const todaysBlocks = getBlocksForDay(state.day);
    const alreadyChosen = new Set(
      state.log.filter(e => e.day === state.day && e.chosenOptionId).map(e => e.blockId)
    );

    for (const b of todaysBlocks) {
      if (!npcRoles.includes(b.role)) continue;
      if (alreadyChosen.has(b.id)) continue;
      const optId = pickOptionForBlock(b, b.role, state.kpi);
      const opt = b.options.find(o => o.id === optId)!;
      dispatch({
        type: 'CHOOSE_OPTION',
        blockId: b.id, day: b.day, role: b.role,
        optId, optLabel: opt.label, kpiDelta: opt.kpiDelta
      });
    }
  }, [state.playerRoles, state.playerRole, state.day, state.kpi, state.log]);

  // advanceDay: Schalter setzen -> NPC-Entscheidungen -> Tag weiter
  const advanceDay = React.useCallback(() => {
    // Flag direkt setzen (ohne Hilfsvariable)
    (globalThis as any).__playerIdleToday = !state.log.some(e =>
      e.day === state.day &&
      ((e.blockId && e.chosenOptionId) || (typeof e.customText === 'string' && e.customText.trim()))
    );

    // NPC-Entscheidungen auffüllen
    fillNpcDecisions();

    // Tageswechsel
    dispatch({ type: 'ADVANCE_DAY' });
    setOpenNewsId(null);
  }, [
    fillNpcDecisions,
    state.playerRoles,
    state.playerRole,
    state.log,
    state.day
  ]);

  // ================== What-if Vorschau (Admin-Feature) ==================
  type PreviewResult = {
    delta: Partial<KPI>;
    nextKpi: KPI;
  };
  // Feature-Flag: What-if Vorschau sichtbar? (aus Adminpanel)
  const [whatIfEnabled, setWhatIfEnabled] = React.useState<boolean>(__readWhatIfFlag());

  React.useEffect(() => {
    const refresh = () => setWhatIfEnabled(__readWhatIfFlag());
    try { window.addEventListener('admin:settings', refresh as EventListener); } catch {}
    try { window.addEventListener('storage', refresh as EventListener); } catch {}
    try { window.addEventListener('focus', refresh as EventListener); } catch {}
    try { document.addEventListener('visibilitychange', refresh as EventListener); } catch {}
    return () => {
      try { window.removeEventListener('admin:settings', refresh as any); } catch {}
      try { window.removeEventListener('storage', refresh as any); } catch {}
      try { window.removeEventListener('focus', refresh as any); } catch {}
      try { document.removeEventListener('visibilitychange', refresh as any); } catch {}
    };
  }, []);

  const [preview, setPreview] = React.useState<PreviewResult | null>(null);

  const runPreview = React.useCallback(() => {
    try {
      // Feature-Flag prüfen
      if (!whatIfEnabled) {
        setPreview(null);
        return;
      }
      // Spieler heute idle?
      (globalThis as any).__playerIdleToday = !state.log.some(e =>
        e.day === state.day &&
        ((e.blockId && e.chosenOptionId) || (typeof e.customText === 'string' && e.customText.trim()))
      );

      // NPC-Entscheidungen nachbilden (ohne Persist)
      const myRoles = state.playerRoles?.length ? state.playerRoles : [state.playerRole];
      const npcRoles = ALL_ROLES.filter(r => !myRoles.includes(r));
      const todaysBlocks = getBlocksForDay(state.day);
      const alreadyChosen = new Set(
        state.log.filter(e => e.day === state.day && e.chosenOptionId).map(e => e.blockId)
      );
      const npcDeltas: Partial<KPI>[] = [];
      for (const b of todaysBlocks) {
        if (!npcRoles.includes(b.role)) continue;
        if (alreadyChosen.has(b.id)) continue;
        const optId = pickOptionForBlock(b, b.role, state.kpi);
        const opt = b.options.find(o => o.id === optId);
        if (opt && (opt as any).kpiDelta) {
          npcDeltas.push((opt as any).kpiDelta as Partial<KPI>);
        }
      }

      // Simulation – nutzt den echten Reducer ohne Seiteneffekte (keine Persistenz)
      const result = simulateNext(state as any, npcDeltas);
      setPreview({ delta: result.deltaToCurrent, nextKpi: result.nextState.kpi });
    } catch (err) {
      console.warn('Preview failed:', err);
      setPreview(null);
    }
  }, [state, whatIfEnabled]);

  // Timeout: nur advanceDay aufrufen
  const onTimeout = () => { advanceDay(); };

  // Admin: Tag setzen / Tag fortschalten
  React.useEffect(() => {
    const onSetDay = (e: Event) => {
      const n = (e as CustomEvent<number>).detail;
      if (typeof n === 'number' && n >= 1 && n <= 14) {
        dispatch({ type: 'INIT', payload: { day: n } as Partial<GameState> });
      }
    };
    const onAdvance = () => { advanceDay(); };

    window.addEventListener('admin:set-day', onSetDay as EventListener);
    window.addEventListener('admin:advance-day', onAdvance as EventListener);
    return () => {
      window.removeEventListener('admin:set-day', onSetDay as any);
      window.removeEventListener('admin:advance-day', onAdvance as any);
    };
  }, [advanceDay]);

  // Daten & Filter
  const blocksAll = getBlocksForDay(state.day);
  const newsBase = getNewsForDay(state.day);
  const newsRandom = (state.engineMeta as any)?.randomNews?.[state.day] || [];
   // Rollenselektive Sicht (aktiv, wenn im AdminPanel eingeschaltet)
  const spRole: RoleId = state.playerRole;
  const useRoleSpec = !!((globalThis as any).__roleBasedRandomNews);
  const newsRandomVisible = useRoleSpec
    ? (newsRandom as any[]).filter(n => !n?.roles || (Array.isArray(n.roles) && n.roles.includes(spRole)))
    : newsRandom;
  const news = React.useMemo(
    () => [...newsBase, ...(newsRandomVisible as any[])],
    [newsBase, newsRandomVisible]
  );
  const myRolesView = state.playerRoles?.length ? state.playerRoles : [state.playerRole];
  const blocks = blocksAll.filter(b => myRolesView.includes(b.role));

  // Heutige Auswahl pro Block (Hervorhebung)
  const todaysSelections = React.useMemo(() => {
    const m = new Map<string, 'a'|'b'|'c'|'d'>();
    state.log
      .filter(e => e.day === state.day && e.chosenOptionId)
      .forEach(e => {
        if (e.chosenOptionId) {
          m.set(e.blockId, e.chosenOptionId as 'a'|'b'|'c'|'d');
        }
      });
    return m;
  }, [state.log, state.day]);

  // Narrative-Panel (kein Overlay)
  const dayNarr = narrativesByDay[state.day];
  const selectedNews = openNewsId ? news.find(n => n.id === openNewsId) : null;
  const beatRaw: NarrativeBeat | null = openNewsId && dayNarr
    ? dayNarr.beats.find(b => b.newsId === openNewsId) || null
    : null;
  const beat = React.useMemo(() => {
    if (!beatRaw) return null;
    if (beatRaw.relatedDecisionIds?.length) return beatRaw;
    return { ...beatRaw, relatedDecisionIds: inferRelatedDecisionIds((beatRaw as any).category, blocksAll) };
  }, [beatRaw, blocksAll]);

  // Auto-Tabwahl gemäß Narrativ-Hinweis
  const rolesWithNotes: RoleId[] = React.useMemo(() => {
    const acc = new Set<RoleId>();
    if (beat?.relatedDecisionIds?.length) {
      blocks.forEach(b => { if (beat.relatedDecisionIds!.includes(b.id)) acc.add(b.role); });
    }
    return Array.from(acc);
  }, [beat, blocks]);
  React.useEffect(() => {
    if (!beat) return;
    const preferred = rolesWithNotes.find(r => myRolesView.includes(r));
    if (!activeRoleTab || (preferred && preferred !== activeRoleTab)) {
      setActiveRoleTab(preferred || null);
    }
  }, [beat, rolesWithNotes, myRolesView, activeRoleTab]);

  const canManuallyAdvance = (state.playerRoles?.length ?? 0) > 0;
  const declareInsolvency = () => dispatch({ type:'DECLARE_INSOLVENCY' });

  const onNotesChange = (notes: string) => {
    dispatch({ type: 'SET_USER_NOTES', notes });
  };

  const handleShowModal = (type: 'privacy' | 'imprint' | 'disclaimer') => {
    setModalType(type);
  };

  // Onboarding
  if (!started) {
    return (
      <Shell backButton={backButton}>

        <Onboarding onStart={startGame} onShowModal={handleShowModal} />
        {modalType && (
          <InfoModal
            title={infoContents[modalType].title}
            content={infoContents[modalType].content}
            onClose={() => setModalType(null)}
          />
        )}
      </Shell>
    );
  }

  // Endbildschirm
  if (state.isOver) {
    return (
      <Shell backButton={backButton}>
        <EndingView 
          state={state} 
          onRestart={() => { clearState(); location.reload(); }} 
        />
      </Shell>
    );
  }

  // Haupt-UI
  return (
    <Shell backButton={backButton}>
      {/* Coach NUR auf der Spielseite einbinden (nicht im Onboarding, nicht im Ending) */}
      {(globalThis as any).__featureCoach ? (
        <CoachController
          getState={() => state}
          controlsBeforeSelector="[data-coach-controls-anchor]"
          fixedFallback={false}
        />
      ) : null}
      <div className="row">
        <div className="card" style={{flex:'1 1 320px'}}>
          <h2>Tag {state.day} • {company.name}</h2>
          <div style={{marginBottom:12}}>
            Spieler: <strong>{state.playerName || '—'}</strong> • Rollen: <strong>{(state.playerRoles && state.playerRoles.length ? state.playerRoles.join(', ') : state.playerRole)}</strong>
          </div>
          <div style={{marginBottom:16}}>
            <KpiCockpit 
              kpi={state.kpi} 
              kpiHistory={state.kpiHistory}
              onOpenHistory={setShowHistoryKey} 
            />
            {/* ✅ PDF-Export-Button korrekt eingebunden (Import oben) */}
            <div style={{ margin: '8px 0' }}>
              <ExportReportButton pdfMake={pdfMake} fileName="Gesamtprotokoll.pdf" />
            </div>
          </div>
          
          {/* NEU: Zufallswerte-Anzeige */}
          <RandomValuesDisplay 
            randomValues={state.engineMeta?.currentDayRandoms} 
            day={state.day}
          />
          
          <div className="hr"></div>

          <DayTimer
            key={state.day}
            conf={{ dayDurationSec: daySeconds, gracePeriodSec: graceSeconds }}
            onTimeout={onTimeout}
          />

          <div className="row" style={{marginTop:12, gap:8}}>
            {canManuallyAdvance && (
              <button className="btn primary" onClick={advanceDay} style={{flex:1}}>
                ⏭️ Nächster Tag
              </button>
            )}
            <button className="btn danger" onClick={declareInsolvency} style={{flex: canManuallyAdvance ? 0 : 1}}>
              ⚠️ Insolvenz
            </button>
          </div>

          <InfoButtons />

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <ExportButtons state={state} />
            <DebriefButton />
          </div>

          <IntranetButton day={state.day} />
          
          { (globalThis as any).__featureSaveLoadMenu && (
            <div className="card" style={{flex:'1 1 320px'}}>
              <SaveLoadMenu
                getState={()=> state}
                applyState={(s:any)=> dispatch({ type:'INIT', payload: s })}
                selectMeta={(s:any)=>{
                  let seed: number | null = null;
                  try { const raw = localStorage.getItem('admin:seed'); if (raw!=null) seed = Number(raw); } catch {}
                  return { day: s?.day, seed };
                }}
              />
            </div>
          )}

        </div>

        <div className="card" style={{flex:'2 1 480px'}}>
          <h3>News</h3>
          <NewsFeed
            items={news}
            onOpenNarrative={(id)=>setOpenNewsId(id)}
          />
          <RandomNewsPanel
            news={state.engineMeta?.randomNews?.[state.day] ?? []}
            day={state.day}
          />
        </div>
      </div>

      {/* News-Detail-Panel als fester Bestandteil */}
      {openNewsId && selectedNews && beat && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0 }}>{selectedNews.title}</h3>
            <button className="btn" onClick={() => setOpenNewsId(null)}>Schließen</button>
          </div>

          {(() => {
            const expandedText = (selectedNews as any).expandedText;
            if (!expandedText) {
              return (
                <>
                  <p style={{ color: '#334155', marginBottom: 12 }}><em>{beat.summary}</em></p>
                  <p style={{ marginBottom: 12 }}>{beat.context}</p>
                </>
              );
            }
            
            let displayText = '';
            if (typeof expandedText === 'function') {
              try {
                displayText = expandedText({ 
                  day: state.day, 
                  kpi: state.kpi, 
                  log: state.log,
                  meta: state.engineMeta 
                });
              } catch (error) {
                console.warn('Error calling expandedText function:', error);
                displayText = beat.summary;
              }
            } else if (typeof expandedText === 'string') {
              displayText = expandedText;
            } else {
              displayText = beat.summary;
            }
            
            return (
              <p style={{ marginBottom: 12, lineHeight: '1.6', color: '#374151' }}>
                {displayText}
              </p>
            );
          })()}
          
          {beat.pressure && <p style={{ marginBottom: 12 }}><strong>Druck:</strong> {beat.pressure}</p>}
          {beat.twist && <p style={{ marginBottom: 12 }}><strong>Wendung:</strong> {beat.twist}</p>}

          {beat.kpiNotes?.length ? (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ marginBottom: 8 }}>KPI-Hinweise</h4>
              <ul style={{ marginBottom: 0 }}>
                {beat.kpiNotes.map((note, i) => <li key={i}>{note}</li>)}
              </ul>
            </div>
          ) : null}

          {beat.roleNotes && Object.keys(beat.roleNotes).length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ marginBottom: 8 }}>Rollenhinweise</h4>
              <ul style={{ marginBottom: 0 }}>
                {(['CEO', 'CFO', 'OPS', 'HRLEGAL'] as const)
                  .filter(role => beat.roleNotes?.[role]?.length)
                  .map(role => (
                    <li key={role}>
                      <strong>{role}:</strong> {beat.roleNotes![role]!.join(' • ')}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {beat.relatedDecisionIds?.length ? (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ marginBottom: 8 }}>Verwandte Entscheidungen</h4>
              <div style={{ fontSize: 12, color: '#6b7280' }}>
                {beat.relatedDecisionIds.map(id => {
                  const block = blocks.find(b => b.id === id);
                  return block ? (
                    <div
                      key={id}
                      style={{
                        padding: '8px 12px',
                        background: rolesWithNotes.includes(block.role) ? '#fef3c7' : '#f3f4f6',
                        borderRadius: '6px',
                        marginBottom: '6px',
                        border: rolesWithNotes.includes(block.role)
                          ? '1px solid #f59e0b'
                          : '1px solid #d1d5db',
                      }}
                    >
                      <strong>{block.role}:</strong> {block.title}
                      {rolesWithNotes.includes(block.role) && (
                        <span style={{ color: '#d97706', marginLeft: 8 }}>⚠️ Beachten</span>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ) : null}

          {selectedNews.attachments?.length ? (
            <div style={{ marginTop: 12, fontSize: 12, color: '#6b7280' }}>
              🔎 Anlagen: {selectedNews.attachments.join(', ')}
            </div>
          ) : null}
        </div>
      )}

      <div className="card">
        <h3>Entscheidungen</h3>
        <div className="tabs" style={{marginBottom:12}}>
          {myRolesView.map(r => (
            <button
              key={r}
              className={`tab ${activeRoleTab===r?'active':''}`}
              onClick={()=>setActiveRoleTab(r)}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="col" style={{gap:12}}>
          {myRolesView.map(r => (
            <div key={r} style={{display: activeRoleTab && activeRoleTab!==r ? 'none' : 'block'}}>
              <DecisionList
                blocks={blocks.filter(b => b.role===r)}
                day={state.day}
                role={r}
                onChoose={onChoose}
                onCustom={onCustom}
                selectedByBlock={todaysSelections}
                onOpenAttachment={handleOpenAttachment}
              />
            </div>
          ))}
        </div>
      </div>

      <UserNotesField 
        notes={state.userNotes || ''} 
        onNotesChange={onNotesChange} 
      />

      {showHistoryKey && (
        <KpiHistoryModal
          kpiKey={showHistoryKey}
          kpiHistory={state.kpiHistory}
          currentKpi={state.kpi}
          onClose={() => setShowHistoryKey(null)}
        />
      )}

      {showInsolvencyModal && (
        <InsolvencyModal onClose={() => setShowInsolvencyModal(false)} />
      )}

      {attachmentModalContent && (
        <AttachmentModal
          title={attachmentModalContent.title}
          content={attachmentModalContent.content}
          onClose={() => setAttachmentModalContent(null)}
        />
      )}
    
      {/* What-if Vorschau Overlay (grau) – nur wenn Feature aktiv, nur Spielseite */}
      {whatIfEnabled ? (
        <>
          <button 
            className="btn" 
            onClick={runPreview}
            title="Erwartete KPI-Deltas für den nächsten Tag anzeigen"
            style={{ position: 'fixed', left: 12, bottom: 12, opacity: 0.95, zIndex: 9998 }}
          >
            Vorschau
          </button>

          {preview && (
            <div
              style={{
                position: 'fixed',
                left: 12,
                bottom: 58,
                maxWidth: 320,
                background: '#f3f4f6',
                color: '#4b5563',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: 12,
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                fontSize: 13,
                zIndex: 9997
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                Erwartete Δ bis Tag {state.day + 1}, Achtung: Zufallseinflüsse können Abweichungen verursachen
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, lineHeight: 1.6 }}>
                <li>💶 Cash: {fmtEUR((preview.delta.cashEUR ?? 0) + 0)}</li>
                <li>📈 Gewinn/Verlust: {fmtEUR((preview.delta.profitLossEUR ?? 0) + 0)}</li>
                <li>🤝 Kundentreue: {(preview.delta.customerLoyalty ?? 0) >= 0 ? '+' : ''}{Math.round(preview.delta.customerLoyalty ?? 0)}</li>
                <li>🏦 Bankvertrauen: {(preview.delta.bankTrust ?? 0) >= 0 ? '+' : ''}{Math.round(preview.delta.bankTrust ?? 0)}</li>
                <li>👥 Engagement: {(preview.delta.workforceEngagement ?? 0) >= 0 ? '+' : ''}{Math.round(preview.delta.workforceEngagement ?? 0)}</li>
                <li>🌐 Öffentliche Wahrnehmung: {(preview.delta.publicPerception ?? 0) >= 0 ? '+' : ''}{Math.round(preview.delta.publicPerception ?? 0)}</li>
              </ul>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                <button className="btn" style={{ fontSize: 12 }} onClick={() => setPreview(null)}>Schließen</button>
              </div>
            </div>
          )}
        </>
      ) : null}
      
      <AutoSaveHook
        getState={()=> state}
        selectMeta={(s:any)=>{
          let seed: number | null = null;
          try { const raw = localStorage.getItem('admin:seed'); if (raw!=null) seed = Number(raw); } catch {}
          return { day: s?.day, seed };
        }}
      />

    </Shell>
  );
}