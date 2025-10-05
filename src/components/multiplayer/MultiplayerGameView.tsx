// src/components/multiplayer/MultiplayerGameView.tsx
import React, { useReducer, useEffect, useState, useMemo, useCallback } from 'react';
import { MultiplayerService } from '@/services/multiplayerService';
import { DecisionQueueService } from '@/services/decisionQueueService';
import { supabase } from '@/services/supabaseClient';
import { upsertDecision } from '@/services/decisions_upsert';
import MultiplayerDecisionList from './MultiplayerDecisionList';
import DaySyncController from './DaySyncController';
import DecisionHistoryViewer from './DecisionHistoryViewer';
import InsolvencyViewMP from './InsolvencyViewMP';
import EndingView from '@/ui/EndingView';
import ThemeBackground from './ThemeBackground';
// Import necessary components from main app
import Shell from '@/components/layout/Shell';
import KpiCockpit from '@/components/hud/KpiCockpit';
import NewsFeed from '@/components/news/NewsFeed';
import UserNotesField from '@/components/notes/UserNotesField';
import KpiHistoryModal from '@/components/hud/KpiHistoryModal';
import RandomValuesDisplay from '@/components/hud/RandomValuesDisplay';
import RandomNewsPanel from '@/components/hud/RandomNewsPanel';
import AttachmentModal from '@/components/dialogs/AttachmentModal';
import DebriefButton from '@/components/exports/DebriefButton';
import IntranetButton from '@/components/intranet/IntranetButton';
import ExportButtons from '@/components/exports/ExportButtons';
 import GameChat from './GameChat';
// Import game data
import CFOCreditPanel from './CFOCreditPanel';
import { company } from '@/data/companyProfile';
import { reducer } from '@/core/engine/reducers';
import { generateDailyRandomValues } from '@/core/engine/gameEngine';
import type { GameState, KPI } from '@/core/engine/gameEngine';
import type { RoleId, DecisionBlock, DayNewsItem } from '@/core/models/domain';

// Import narratives
import { narrativesByDay } from '@/data/narratives/auto';
import type { NarrativeBeat } from '@/data/narratives/types';
// Import simulation for What-If preview
import { simulateNext } from '@/core/engine/reducers';
import { pickOptionForBlock } from '@/core/engine/simulation';

// Import ending functions
import { determineEnding, EndingResult } from '@/core/engine/ending';
import { determineEndingWithContext } from '@/core/engine/ending_extras';

// Import day data
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

// Import PDF functionality  
import pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
type PdfMakeWithVfs = typeof pdfMake & { vfs?: Record<string, string> };
type PdfFontsModule = { default?: { pdfMake?: { vfs: Record<string, string> } }; pdfMake?: { vfs: Record<string, string> }; vfs?: Record<string, string> };
(pdfMake as PdfMakeWithVfs).vfs = (pdfFonts as PdfFontsModule).default?.pdfMake?.vfs || (pdfFonts as PdfFontsModule).pdfMake?.vfs;

// Thema laden
import GameThemeBackground, { type GameTheme } from './GameThemeBackground';
import './game-theme.css';

// Import Report Store and PDF export
import { ReportStore } from '@/reporting/reportBuilder';
import { exportSimulationReport } from '@/services/pdfReport';

// Import makeRng for random value generation
import { makeRng } from '@/core/utils/prng';
import { generateRandomNewsForDay } from '@/core/engine/randomNews';
import { errorHandler } from '@/utils/errorHandler';
import { resolveGameTheme } from './helpers/themeHelpers';
import { computeRoundSecondsForDay, readGraceSeconds } from './helpers/roundTimeHelpers';
import { getBlocksForDay, getNewsForDay } from './helpers/scenarioDataLoader';
import { getScoringWeightsSafe } from './helpers/scoringHelpers';
import { setupPdfMake } from './helpers/pdfSetup';
import { GameHeader } from './game/GameHeader';
import { ControlsPanel } from './game/ControlsPanel';
import { WhatIfPreview } from './game/WhatIfPreview';
import { GameOverScreenFull } from './game/GameOverScreenFull';
import { KpiSection, DecisionsSection, NewsSection, OtherPlayersSection } from './sections';

// Local ThemeMode type and top-level lazy for TrainerDashboard
type ThemeMode = 'classic' | 'business' | 'dynamic';
const TrainerDashboard = React.lazy(async () => {
 try {
    return await import('./TrainerDashboard');
  } catch (e) {
   errorHandler.error('TrainerDashboard lazy import failed', e, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'lazy-import' });
    return { default: ({ onLeave }: { onLeave: () => void }) => (
      <div style={{ padding: 20, color: '#b91c1c' }}>
        Fehler beim Laden des Trainer‑Dashboards. Bitte die Seite neu laden.
        <div style={{ marginTop: 12 }}>
          <button onClick={onLeave}>Zurück</button>
        </div>
      </div>
    ) };
  }
});

const GAME_THEME: GameTheme = 'dynamic'; // 'dynamic' | 'minimal' | 'corporate'

/** ── Admin/Trainer-übersteuerbare Rundenzeiten (global/matrix) ───────────── */
const RT_ROLES = ['CEO','CFO','OPS','HRLEGAL'] as const;

/** Trainer-Präsenzindikator (blaue Lampe) **/
function TrainerPresenceLamp({ gameId }: { gameId: string }) {
  const [present, setPresent] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    const fetchPres = async () => {
      const { data } = await supabase
        .from('players')
        .select('id')
        .eq('game_id', gameId)
        .eq('role', 'TRAINER')
        .maybeSingle();
      if (!active) return;
      setPresent(!!data);
    };
    fetchPres();
    const ch = supabase
      .channel(`trainer-pres-${gameId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'players', filter: `game_id=eq.${gameId}` },
        fetchPres
      )
      .subscribe();
    return () => { active = false; supabase.removeChannel(ch); };
  }, [gameId]);

  if (!present) return null;
  return (
    <div title="Trainer*in anwesend" style={{
      position: 'fixed', top: 8, right: 8, zIndex: 2000,
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '6px 10px', background: 'rgba(59,130,246,0.12)',
      border: '1px solid rgba(59,130,246,0.35)', borderRadius: 999
    }}>
      <div style={{
        width: 10, height: 10, borderRadius: '50%',
        background: '#60a5fa', boxShadow: '0 0 12px #60a5fa'
      }} />
      <span style={{ color: '#1e40af', fontWeight: 600, fontSize: 12 }}>Trainer anwesend</span>
    </div>
  );
}

/** ── Adaptive Difficulty (Light) ─────────────────────────────────────────────
 * Nutzt Admin-Flag __adaptiveDifficultyLightEnabled und skaliert die NPC-Fehlerquote
 * (×0.9–1.2) basierend auf den letzten zwei Tagen (weiche KPIs).
 * Wirkt ausschließlich auf die What‑If‑Vorschau im MP (NPC‑Autopilot).
 */

async function computeAdaptiveFactor(gameId: string): Promise<number> {
  const g = globalThis;
  if (!g.__adaptiveDifficultyLightEnabled) return 1.0;
  try {
    const { data } = await supabase
      .from('game_state_snapshots')
      .select('day, state')
      .eq('game_id', gameId)
      .order('day', { ascending: false })
      .limit(2);
    return computeAdaptiveFactorFromSnapshots(data || []);
  } catch {
    return 1.0;
  }
}

// Types
interface MultiplayerGameViewProps {
  gameId: string;
  role: RoleId;
  playerName: string;
  onLeave: () => void;
}

interface KpiEstimate {
  day: number;
  kpi: keyof KPI;
  value: number;
  actualValue?: number;
}

// Export Report Button Component
function ExportReportButtonMP({ 
  fileName, 
  state, 
  role 
}: { 
  fileName: string;
  state: GameState;
  role: RoleId;
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      ReportStore.updateFromState(state);
      const run = ReportStore.finalizeRun();
      
      if (run && run.meta) {
        run.meta.multiplayerRole = role;
        run.meta.exportNote = `Mehrspielermodus - Rolle: ${role}`;
                // Kommunikationsnotizen einbetten (MP)
        try {
          const dq = DecisionQueueService.getInstance();
          const mp = MultiplayerService.getInstance();
          const gid = mp.getCurrentGameId();
          const commsAll: Record<string, Array<{ day: number; text: string }>> = { CEO: [], CFO: [], OPS: [], HRLEGAL: [] };
          if (gid) {
            const list = await dq.getDecisionHistory(gid);
            for (const d of (list || [])) {
              if (d.block_id && d.block_id.startsWith('COMMS_') && d.custom_text) {
                const r = (d.decision_metadata?.role as string) || (d.block_id.split('_')[1] as string);
                if (r && commsAll[r]) commsAll[r].push({ day: d.day, text: d.custom_text as string });
              }
            }
            (Object.keys(commsAll) as Array<keyof typeof commsAll>).forEach(r => commsAll[r].sort((a,b)=>a.day-b.day));
          }
          (run as Record<string, unknown> & { meta?: Record<string, unknown> }).meta = (run as Record<string, unknown> & { meta?: Record<string, unknown> }).meta || {};
          (run as Record<string, unknown> & { meta?: Record<string, unknown> }).meta.commsAll = commsAll;
          const own = (state.log || []).slice().reverse().find(e => e.blockId === `COMMS_${role}` && e.day === state.day && e.role === role);
          (run as Record<string, unknown> & { meta?: Record<string, unknown> }).meta.commsSelf = { role, day: state.day, text: own?.customText || '' };
        } catch (e) {
          errorHandler.warn('Could not attach communications to report', e, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'export-report' });
        }

      }
      
      await exportSimulationReport(pdfMake, run, fileName);
    } catch (error) {
      errorHandler.error('Export failed', error, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'export-report' });
      alert('Fehler beim Export: ' + (error as { message?: string })?.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      style={{
        padding: '8px 16px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: isExporting ? 'not-allowed' : 'pointer',
        fontWeight: 600,
        opacity: isExporting ? 0.7 : 1,
        transition: 'all 0.2s ease',
        fontSize: 13,
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
      }}
      onMouseEnter={(e) => {
        if (!isExporting) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
      }}
      title="Exportiert den vollständigen Spielverlauf als PDF"
    >
      {isExporting ? '⏳ Exportiere...' : '📊 Gesamtprotokoll PDF'}
    </button>
  );
}

// Main Component
function MultiplayerGameViewInner({ 
  gameId, 
  role, 
  playerName,
  onLeave 
}: MultiplayerGameViewProps) {

  
// ---- Theme Binding (Classic / Business / Dynamic) via AdminPanel ----
const [themeMode, setThemeMode] = useState<ThemeMode>('classic');
useEffect(() => {
  const applyTheme = () => {
    try {
      const s = globalThis.__multiplayerSettings;
      const bg = s?.gameSettings?.backgroundTheme || 'minimal';
      const mapped = bg === 'corporate' ? 'business' : (bg === 'dynamic' ? 'dynamic' : 'classic');
      setThemeMode(mapped as ThemeMode);
    } catch {}
  };
  applyTheme();
  const handler = () => applyTheme();
  window.addEventListener('admin:settings', handler);
  return () => window.removeEventListener('admin:settings', handler);
}, []);

  // FIX: Initialize with a valid currentDate
  const initialDate = new Date();
  initialDate.setHours(9, 0, 0, 0); // Set to 9:00 AM for game start
  
  const [state, dispatch] = useReducer(reducer, {
    day: 1,
    currentDate: initialDate, // FIX: Add currentDate initialization
    kpi: company.initialKPI,
    kpiHistory: [],
    pendingDeltas: [],
    log: [],
    playerName: playerName,
    playerRole: role,
    playerRoles: [role],
    burnPerDayEUR: -411,
    isOver: false,
    insolvency: false
  } as GameState);

  const [isGM, setIsGM] = useState(false);
  const [otherPlayers, setOtherPlayers] = useState<Array<{ id: string; name: string; role: RoleId }>>([]);
  const [showHistoryKey, setShowHistoryKey] = useState<keyof KPI | null>(null);
  const [showDecisionHistory, setShowDecisionHistory] = useState(false);
  const [openNewsId, setOpenNewsId] = useState<string | null>(null);
  const [activeRoleTab, setActiveRoleTab] = useState<RoleId | null>(role);
  const [daySeconds, setDaySeconds] = useState<number>(() => computeRoundSecondsForDay(1));
const [graceSeconds, setGraceSeconds] = useState<number>(() => readGraceSeconds());

// Rundenzeiten aus Admin-Panel (global/matrix) berücksichtigen
useEffect(() => {
  const updateTimes = () => {
    setDaySeconds(computeRoundSecondsForDay(state.day));
    setGraceSeconds(readGraceSeconds());
  };
  updateTimes();
  window.addEventListener('admin:settings', updateTimes);
  window.addEventListener('storage', updateTimes);
  return () => {
    window.removeEventListener('admin:settings', updateTimes);
    window.removeEventListener('storage', updateTimes);
  };
}, [state.day]);

  // Admin: KPI steuern (setzen / Δ anwenden) – Listener + DB-Sync (MP)
useEffect(() => {
  const onKpiSet = async (e: Event) => {
    try {
      const kpi = (e as CustomEvent<KPI>).detail;
      if (!kpi) return;
      // Lokales UI sofort aktualisieren
      dispatch({ type: 'ADMIN_SET_KPI', kpi });
      // DB -> Realtime für alle Spieler
      await supabase.from('games')
        .update({ kpi_values: kpi })
        .eq('id', gameId);
    } catch (err) {
      errorHandler.warn('[MP] admin:kpi:set failed', err, { category: 'EVENT', component: 'MultiplayerGameView', action: 'admin-kpi-set' });
    }
  };

  const onKpiAdd = async (e: Event) => {
    try {
      const delta = (e as CustomEvent<Partial<KPI>>).detail;
      if (!delta) return;
      // Nächste KPI-Werte lokal berechnen
      const next: KPI = { ...state.kpi } as KPI;
      (Object.keys(delta) as (keyof KPI)[]).forEach((k) => {
        const dv = delta[k];
        if (typeof dv === 'number') {
          (next as Record<string, number>)[k] = Number(state.kpi[k] || 0) + dv;
        }
      });
      // Lokales UI sofort aktualisieren
      dispatch({ type: 'ADMIN_ADD_KPI', delta });
      // DB -> Realtime für alle Spieler
      await supabase.from('games')
        .update({ kpi_values: next })
        .eq('id', gameId);
    } catch (err) {
      errorHandler.warn('[MP] admin:kpi:add failed', err, { category: 'EVENT', component: 'MultiplayerGameView', action: 'admin-kpi-add' });
    }
  };

  window.addEventListener('admin:kpi:set', onKpiSet as EventListener);
  window.addEventListener('admin:kpi:add', onKpiAdd as EventListener);
  return () => {
    window.removeEventListener('admin:kpi:set', onKpiSet);
    window.removeEventListener('admin:kpi:add', onKpiAdd);
  };
}, [gameId, state.kpi]);

// Admin: Day‑Steuerung (setzen / +1 vorwärts) – Listener + DB‑Sync (MP)
useEffect(() => {
  const onSetDay = async (e: Event) => {
    try {
      const detail = (e as CustomEvent<unknown>).detail;
      const raw = (typeof detail === 'number') ? detail : detail?.day;
      const newDay = Number(raw);
      if (!Number.isFinite(newDay) || newDay < 1) return;
      if (!gameId) return;

      // DB -> Realtime für alle Spieler (lokales UI erhält Update über Realtime-Listener)
      await supabase
        .from('games')
        .update({ current_day: newDay })
        .eq('id', gameId);
    } catch (err) {
      errorHandler.warn('[MP] admin:set-day failed', err, { category: 'EVENT', component: 'MultiplayerGameView', action: 'admin-set-day' });
    }
  };

  const onAdvanceDay = async () => {
    try {
      if (!gameId) return;
      const next = Math.max(1, Number(state.day) + 1);

      // DB -> Realtime für alle Spieler
      await supabase
        .from('games')
        .update({ current_day: next })
        .eq('id', gameId);
    } catch (err) {
      errorHandler.warn('[MP] admin:advance-day failed', err, { category: 'EVENT', component: 'MultiplayerGameView', action: 'admin-advance-day' });
    }
  };

  window.addEventListener('admin:set-day', onSetDay as EventListener);
  window.addEventListener('admin:advance-day', onAdvanceDay as EventListener);
  return () => {
    window.removeEventListener('admin:set-day', onSetDay);
    window.removeEventListener('admin:advance-day', onAdvanceDay);
  };
}, [gameId, state.day]);

  
  const [showInsolvencyView, setShowInsolvencyView] = useState(false);
  const [attachmentModalContent, setAttachmentModalContent] = useState<{ title: string; content: string } | null>(null);
  const [whatIfEnabled, setWhatIfEnabled] = useState<boolean>(false);
  const [preview, setPreview] = useState<{ delta: Partial<KPI>; nextKpi: KPI } | null>(null);
  const [finalShown, setFinalShown] = useState(false);
  const [finalEnding, setFinalEnding] = useState<EndingResult | null>(null);
   const [kpiEstimates, setKpiEstimates] = useState<KpiEstimate[]>([]);
  const [currentKpiInputs, setCurrentKpiInputs] = useState<Partial<KPI>>({});
  const [creditSettings, setCreditSettings] = useState<unknown>(null);
  const [mpDifficulty, setMpDifficulty] = useState<'easy'|'normal'|'hard'>(
    globalThis.__mpDifficulty || 'normal'
  );

   // --- Save/Load (MP) – lokal (localStorage) + DB-Sync (Supabase 'games') ---
  const saveSlots = ['A','B','C','D'] as const;
  const [saveLoadEnabled, setSaveLoadEnabled] = useState<boolean>(false);
  const [slotId, setSlotId] = useState<string>('A');
  const [slotsMeta, setSlotsMeta] = useState<Record<string, { ts: number; day: number }>>({});

  const makeSaveKey = (slot: string) => `mp:save:${gameId}:${role}:${slot}`;

  const readSlotMeta = React.useCallback((slot: string) => {
    try {
      const raw = localStorage.getItem(makeSaveKey(slot));
      if (!raw) return null;
      const obj = JSON.parse(raw);
      const meta = obj?.meta as { ts: number; day: number } | null;
      return meta && typeof meta.ts === 'number' ? meta : null;
    } catch { return null; }
  }, [gameId, role]);

  const refreshSlotsMeta = React.useCallback(() => {
    const m: Record<string, { ts: number; day: number }> = {};
    [...saveSlots, '__autosave__'].forEach((s: string) => {
      const meta = readSlotMeta(s);
      if (meta) m[s] = meta;
    });
    setSlotsMeta(m);
  }, [readSlotMeta]);

  const saveSlot = React.useCallback((slot: string, showToast = true) => {
    try {
      // Serialisieren (Dates in Strings; EngineMeta ist JSON-fähig)
      const toSave = {
        version: 1,
        meta: { ts: Date.now(), day: state.day, gameId, role, playerName },
        state: {
          ...state,
          currentDate: (() => {
            try { return (state.currentDate instanceof Date) ? state.currentDate.toISOString() : state.currentDate; }
            catch { return null; }
          })()
        }
      };
      localStorage.setItem(makeSaveKey(slot), JSON.stringify(toSave));
      refreshSlotsMeta();
      if (showToast) alert(`Gespeichert in Slot ${slot} (Tag ${state.day}).`);
    } catch (e) {
      alert('Speichern fehlgeschlagen.');
      errorHandler.warn('saveSlot failed', e, { category: 'STORAGE', component: 'MultiplayerGameView', action: 'save-slot' });
    }
  }, [state, gameId, role, playerName, refreshSlotsMeta]);

  const loadSlot = React.useCallback(async (slot: string) => {
    try {
      const raw = localStorage.getItem(makeSaveKey(slot));
      if (!raw) { alert('Kein Speicherstand in diesem Slot.'); return; }
      const data = JSON.parse(raw);
      const saved = data?.state || {};
      // currentDate rekonstruieren
      const revivedDate = new Date();
      revivedDate.setHours(9 + (Number(saved.day || 1) - 1) * 24, 0, 0, 0);

      // Lokale Sicht sofort aktualisieren
      dispatch({ type: 'INIT', payload: { ...(saved as Partial<GameState>), currentDate: revivedDate } });

      // MP-Quelle synchronisieren → löst Realtime-Update bei allen Clients aus
      try {
        await supabase
          .from('games')
          .update({ current_day: Number(saved.day || 1), kpi_values: saved.kpi })
          .eq('id', gameId);
      } catch (dbErr) {
        errorHandler.warn('DB-Sync beim Laden fehlgeschlagen', dbErr, { category: 'NETWORK', component: 'MultiplayerGameView', action: 'load-slot' });
      }

      alert(`Spielstand aus Slot ${slot} geladen (Tag ${saved.day ?? '?'}).`);
    } catch (e) {
      alert('Laden fehlgeschlagen.');
      errorHandler.warn('loadSlot failed', e, { category: 'STORAGE', component: 'MultiplayerGameView', action: 'load-slot' });
    }
  }, [gameId, dispatch]);

  const deleteSlot = React.useCallback((slot: string) => {
    try {
      localStorage.removeItem(makeSaveKey(slot));
      refreshSlotsMeta();
    } catch {}
  }, [refreshSlotsMeta]);

  // Flags aus AdminPanel übernehmen (Save/Load aktivieren)
  useEffect(() => {
    const readSaveLoad = () => {
      try {
        const g = globalThis;
        setSaveLoadEnabled(!!g.__featureSaveLoadMenu); // Flag kommt aus AdminPanel.applyGlobals
      } catch {}
    };
    readSaveLoad();
    window.addEventListener('admin:settings', readSaveLoad);
    window.addEventListener('storage', readSaveLoad);
    return () => {
      window.removeEventListener('admin:settings', readSaveLoad);
      window.removeEventListener('storage', readSaveLoad);
    };
  }, []);

  // Slots-Metadaten initial einlesen
  useEffect(() => { refreshSlotsMeta(); }, [refreshSlotsMeta]);

  

  

  
  // States for optional components
  const [CoachController, setCoachController] = useState<unknown>(null);
  const [InfoButtons, setInfoButtons] = useState<unknown>(() => () => null);

  const mpService = MultiplayerService.getInstance();
  const dqService = DecisionQueueService.getInstance();
  // --- Role-specific communication notes (per day) ---
  const commsBlockId = `COMMS_${role}`;
  const [roleCommsDraft, setRoleCommsDraft] = useState<string>('');
  const [loadingComms, setLoadingComms] = useState<boolean>(false);
  const [commsByRole, setCommsByRole] = useState<Record<RoleId, Array<{ day: number; text: string }>>>({
    CEO: [], CFO: [], OPS: [], HRLEGAL: []
  });

  // Load optional components
  useEffect(() => {
    const loadOptionalComponents = async () => {
      try {
        const coachModule = await import('@/components/CoachController');
        setCoachController(() => coachModule.default);
      } catch {
        // Coach not available
      }
      
      try {
        const infoModule = await import('@/components/info/InfoButtons');
        setInfoButtons(() => infoModule.default);
      } catch {
        // InfoButtons not available - use placeholder
        setInfoButtons(() => () => null);
      }
    };
    
    loadOptionalComponents();
  }, []);
// Load credit settings from global multiplayer settings
useEffect(() => {
  const loadCreditSettings = () => {
    const mpSettings = globalThis.__multiplayerSettings;
    if (mpSettings?.creditSettings?.enabled) {
      setCreditSettings(mpSettings.creditSettings); // Jetzt funktioniert das
    }
  };
  
  loadCreditSettings();
  window.addEventListener('admin:settings', loadCreditSettings);
  
  return () => {
    window.removeEventListener('admin:settings', loadCreditSettings);
  };
}, []);

  // Initialize Report Store
  useEffect(() => {
    ReportStore.startRun({
      kpiStart: company.initialKPI,
      roles: [role],
      playerName: playerName,
      discountRatePA: 0.08,
      dayLengthInDays: 1,
      scoringWeights: { cashEUR: 0.5, profitLossEUR: 0.5 }
    });
  }, [role, playerName]);

    // MP: Kreditaufnahme-Flag live verfolgen (Adminpanel → adminSettings)
  useEffect(() => {
    const readAllowCredit = () => {
      try {
        const g = globalThis;
        if (typeof g.__mpAllowCredit === 'boolean') {
          setAllowCreditMP(!!g.__mpAllowCredit);
          return;
        }
        const raw = localStorage.getItem('adminSettings');
        if (raw) {
          const obj = JSON.parse(raw);
          const val =
            !!(obj?.features?.allowCreditMP ||
               obj?.features?.allowBankCredit ||
               obj?.bank?.allowCredit ||
               obj?.bankSettings?.allowCredit);
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
  
// Prefill role communication for current day from local log
  useEffect(() => {
    try {
      const entry = (state.log || []).slice().reverse().find(e =>
        e.blockId === commsBlockId && e.day === state.day && e.role === role
      );
      setRoleCommsDraft(entry?.customText || '');
    } catch {}
  }, [state.day, role, commsBlockId, state.log]);
  
  useEffect(() => {
    const checkWhatIf = () => {
      try {
        const g = globalThis;
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

  // Load saved KPI estimates
  useEffect(() => {
    const saved = localStorage.getItem(`mp_kpi_estimates_${gameId}_${role}`);
    if (saved) {
      try {
        setKpiEstimates(JSON.parse(saved));
      } catch {}
    }
  }, [gameId, role]);

  // Save KPI estimates
  useEffect(() => {
    localStorage.setItem(`mp_kpi_estimates_${gameId}_${role}`, JSON.stringify(kpiEstimates));
  }, [kpiEstimates, gameId, role]);

   // Auto-Save: bei Tageswechsel in __autosave__ sichern (wenn aktiviert)
  useEffect(() => {
    try {
      const g = globalThis;
      if (g.__featureAutoSave) {
        saveSlot('__autosave__', false);
      }
    } catch {}
  }, [state.day, saveSlot]);
  
    // Initialize game with synchronized random values

  useEffect(() => {
    const initGame = async () => {
      try {
        const gameInfo = await mpService.getGameInfo();
        
        const currentPlayerId = mpService.getCurrentPlayerId();
        const currentPlayer = gameInfo.players.find((p: { id: string; name: string; role: RoleId }) => p.id === currentPlayerId);
        setIsGM(currentPlayer?.is_gm || false);
        
        setOtherPlayers(gameInfo.players.filter((p: { id: string; name: string; role: RoleId }) => p.id !== currentPlayerId));
        
        // FIX: Ensure currentDate is properly set
        const gameDate = new Date();
        gameDate.setHours(9 + (gameInfo.game.current_day - 1) * 24, 0, 0, 0);
        
        dispatch({
          type: 'INIT',
          payload: {
            day: gameInfo.game.current_day,
            currentDate: gameDate, // FIX: Add currentDate to init
            kpi: gameInfo.game.kpi_values || company.initialKPI,
            isOver: gameInfo.game.state === 'finished',
            playerName: playerName,
            playerRole: role,
            playerRoles: [role]
          }
        });

        
        // SYNCHRONIZED RANDOM VALUES using Seed
        let allRandomValues: Record<number, Partial<KPI>> = {};
        let randomNews: Record<number, Partial<KPI>> = {};
        
        if (gameInfo.settings?.seed) {
          const seed = gameInfo.settings.seed;
          errorHandler.debug('[MP] Using game seed', undefined, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'init-game', metadata: { seed } });
          
          globalThis.__gameSeed = seed;
          
          for (let day = 1; day <= 14; day++) {
            const daySpecificSeed = seed + day * 1000;
            const dayRng = makeRng(daySpecificSeed);
            globalThis.__rng = dayRng;
            
            const baseKpi = day === 1 
              ? (gameInfo.game.kpi_values?.cashEUR || company.initialKPI.cashEUR)
              : 100000;
            
            const dayRandoms = generateDailyRandomValues(baseKpi);
            allRandomValues[day] = dayRandoms;
            
 // Zufalls‑News (MP) aus newsPool via SP‑Generator – inkl. KPI‑Impact
          
if (globalThis.__randomNews) {
  const g = globalThis;

  // Admin-Eventintensität (Skalar) → Generator-Intensität (low/normal/high)
  const useIntensity = !!g.__featureEventIntensity;
  const arr = Array.isArray(g.__eventIntensityByDay) ? g.__eventIntensityByDay : [];
  const intensityStr = mapIntensity(useIntensity ? (Number(arr[day - 1]) || 1) : 1);

  // Schwierigkeit aus AdminPanelMPM (easy/normal/hard)
  const mpDiff = (g.__mpDifficulty || g.__multiplayerSettings?.mpDifficulty || 'normal') as 'easy'|'normal'|'hard';

  // Duplikat-Vermeidung über Tage (nach Titel)
  globalThis.__playedNewsTitles = globalThis.__playedNewsTitles || [];
  const played: string[] = globalThis.__playedNewsTitles;

  // RNG für News deterministisch (Seed + Tages-Offset + 500)
  const prevRng = globalThis.__rng;
  globalThis.__rng = makeRng(daySpecificSeed + 500);

  // Pool-basierte News erzeugen (inkl. KPI + optional roles)
  const items = generateRandomNewsForDay(undefined, {
    enabled: true,
    intensity: intensityStr,
    difficulty: mpDiff,
    day,
    alreadyPlayed: played
  });

  // RNG wiederherstellen
  globalThis.__rng = prevRng;

  // In DayNewsItem-Form bringen (UI-Severity + Quelle + optional roles)
  const dayNews = (items as Array<{ id: string; title: string; text: string; category: string; severity: string; impact: Partial<KPI>; roles?: string[] }>).map((n) => ({
    id: n.id,
    title: n.title,
    text: n.text,
    source: n.category,                 // Kategorie als Quelle
    severity: mapSeverityForUi(n.severity),
    impact: n.impact,                   // KPI-Wirkung bleibt erhalten
    roles: n.roles ?? null     // ← rollenspezifische Sichtbarkeit
  }));

  randomNews[day] = dayNews;
  played.push(...items.map((n: { title: string }) => n.title));
}

         
          }

          const currentDayRng = makeRng(ensuredSeed + gameInfo.game.current_day * 1000);
          globalThis.__rng = currentDayRng;
        }

        // Einheitlich den effektiven Seed ermitteln (DB-Seed oder ensuredSeed)
        const effectiveSeed = gameInfo.settings?.seed ?? globalThis.__gameSeed;

        dispatch({
          type: 'INIT',
          payload: {

            engineMeta: {
              currentDayRandoms: allRandomValues[gameInfo.game.current_day],
              dailyRandomValues: allRandomValues,
              randomNews: randomNews,
               seed: effectiveSeed
            }
          }
        });
      } catch (error) {
        errorHandler.error('Error initializing game', error, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'init-game' });
        // FIX: Set fallback currentDate on error
        dispatch({
          type: 'INIT', 
          payload: {
            currentDate: new Date()
          }
        });
      }
    };

    initGame();
  }, [gameId, role, playerName]);

// Re-Render bei Änderungen aus dem Szenario‑Editor (optional)
const [, forceScenarioRefresh] = useState(0);
useEffect(() => {
  const onScenario = () => forceScenarioRefresh(n => n + 1);
  window.addEventListener('admin:scenario', onScenario);
  window.addEventListener('storage', onScenario);
  return () => {
    window.removeEventListener('admin:scenario', onScenario);
    window.removeEventListener('storage', onScenario);
  };
}, []);
  
  // Subscribe to game updates
  useEffect(() => {
    mpService.subscribeToGameUpdates(
      (game: { kpi_values?: KPI; current_day?: number; [key: string]: unknown }) => {
        // FIX: Calculate proper currentDate based on day
        const updatedDate = new Date();
        updatedDate.setHours(9 + (game.current_day - 1) * 24, 0, 0, 0);
        
        dispatch({
          type: 'INIT',
          payload: {
            day: game.current_day,
            currentDate: updatedDate, // FIX: Include currentDate in updates
            kpi: game.kpi_values,
            isOver: game.state === 'finished'
          }
        });
        
        if (game.current_day !== state.day && state.engineMeta) {
          const meta = state.engineMeta as Record<string, unknown> | undefined;
          
          if (meta.dailyRandomValues && meta.dailyRandomValues[game.current_day]) {
            errorHandler.debug('[MP] Using pre-generated random values for day', undefined, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'init-game', metadata: { day: game.current_day } });
            
            if (meta.seed) {
              const dayRng = makeRng(meta.seed + game.current_day * 1000);
              globalThis.__rng = dayRng;
            }
            
            dispatch({
              type: 'INIT',
              payload: {
                engineMeta: {
                  ...meta,
                  currentDayRandoms: meta.dailyRandomValues[game.current_day]
                }
              }
            });
          } else {
            errorHandler.warn('[MP] No pre-generated values for day', undefined, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'init-game', metadata: { day: game.current_day } });

            // Setze tages-spezifische RNG auch im Fallback deterministisch:
            const seed = (meta?.seed ?? globalThis.__gameSeed) as number | undefined;
            if (seed != null) {
              const dayRng = makeRng(seed + game.current_day * 1000);
              globalThis.__rng = dayRng;
            }

            
            const randomValues = generateDailyRandomValues(game.kpi_values?.cashEUR || 100000);
            dispatch({
              type: 'INIT',
              payload: {
                engineMeta: {
                  currentDayRandoms: randomValues,
                  dailyRandomValues: { 
                    ...(meta?.dailyRandomValues || {}), 
                    [game.current_day]: randomValues 
                  },
                  randomNews: meta?.randomNews || {},
                  seed: meta?.seed
                }
              }
            });
          }
        }
      },
      (players: Array<{ id: string; name: string; role: RoleId }>) => {
        const currentPlayerId = mpService.getCurrentPlayerId();
        setOtherPlayers(players.filter((p: { id: string; name: string; role: RoleId }) => p.id !== currentPlayerId));
      }
    );

    return () => {
      mpService.unsubscribeAll();
    };
  }, [state.day, state.engineMeta]);

 // Check for game ending or insolvency
useEffect(() => {
  if (state.insolvency && !showInsolvencyView) {
    setShowInsolvencyView(true);
  }
  
  if (state.isOver && !state.insolvency && !finalShown) {
    const ending = determineEndingWithContext(state);
    setFinalEnding(ending);
    setFinalShown(true);
    
       // Load all communications for end-view (once game is over)
    (async () => {
      setLoadingComms(true);
      try {
        const all = await dqService.getDecisionHistory(gameId);
        const map: Record<RoleId, Array<{ day: number; text: string }>> = { CEO: [], CFO: [], OPS: [], HRLEGAL: [] };
        for (const d of (all || [])) {
          if (d.block_id && d.block_id.startsWith('COMMS_') && d.custom_text) {
            const r = (d.decision_metadata?.role as RoleId) || (d.block_id.split('_')[1] as RoleId);
            if (r && map[r]) map[r].push({ day: d.day, text: d.custom_text as string });
          }
        }
        (Object.keys(map) as RoleId[]).forEach(r => map[r].sort((a,b) => a.day - b.day));
        setCommsByRole(map);
      } catch (e) {
        errorHandler.warn('Could not load communications', e, { category: 'NETWORK', component: 'MultiplayerGameView', action: 'load-communications' });
      } finally {
        setLoadingComms(false);
      }
    })();

    if (ending) {
      setKpiEstimates(prev => prev.map(est => ({
        ...est,
        actualValue: state.kpi[est.kpi]
      })));
    }
  }
}, [state.isOver, state.insolvency, showInsolvencyView, finalShown, state.kpi, state.engineMeta, gameId]);

// --- Optional Invariants (AdminPanelMPM -> globalThis.__invariants.optional) ---
type SoftKpi = 'customerLoyalty'|'bankTrust'|'workforceEngagement'|'publicPerception';

function clampSoft(v: number): number { return Math.max(0, Math.min(100, Math.round(v))); }

function readOptionalInv(): Record<string, boolean> {
  try { return (globalThis.__invariants?.optional) || {}; } catch { return {}; }
}

  function mapIntensity(factor: number): 'low'|'normal'|'high' {
  const f = Number(factor || 1);
  if (f <= 0.75) return 'low';
  if (f >= 1.25) return 'high';
  return 'normal';
}
function mapSeverityForUi(s: 'low'|'mid'|'high'): 'low'|'medium'|'high' {
  return s === 'mid' ? 'medium' : s;
}

  
function mergeDelta(a: Partial<KPI>, b: Partial<KPI>): Partial<KPI> {
   const out: Record<string, unknown> = { ...(a || {}) };
   (Object.keys(b || {}) as (keyof KPI)[]).forEach((k) => {
     const bv = (b as Record<string, unknown>)[k];
     if (typeof bv === 'number') out[k] = (out[k] ?? 0) + bv;
   });
   return out;
 }
 
/** Mappt numerische Event-Intensität (Admin) auf SP-Generator-Intensität. */
function mapIntensity(factor: number): 'low'|'normal'|'high' {
  const f = Number(factor || 1);
  if (f <= 0.75) return 'low';
  if (f >= 1.25) return 'high';
  return 'normal';
}

/** Mappt SP-Schweregrad auf UI-Strings. */
function mapSeverityForUi(s: 'low'|'mid'|'high'): 'low'|'medium'|'high' {
  return s === 'mid' ? 'medium' : s;
}

/** Summiert KPI-Impacts aus generierten News. */
function sumNewsImpact(list: Array<{ impact?: Partial<KPI> }>): Partial<KPI> {
  const acc: Partial<KPI> = {};
  for (const it of (list || [])) {
    if (!it?.impact) continue;
    (Object.keys(it.impact) as (keyof KPI)[]).forEach((k) => {
      const v = (it.impact as Partial<KPI>)[k as keyof KPI];
      if (typeof v === 'number') (acc as Record<string, number>)[k] = ((acc as Record<string, number>)[k] || 0) + v;
    });
  }
  return acc;
}

function applyDeltaToKpi(base: KPI, delta: Partial<KPI>): KPI {
  const next: Partial<KPI> = { ...base };
  (Object.keys(delta) as (keyof KPI)[]).forEach((k) => {
    const v = (delta as Record<string, number>)[k];
    if (typeof v === 'number') next[k] = Number(next[k] || 0) + v;
  });
  // Weiche KPIs clampen, um Ausreißer zu vermeiden
  (['customerLoyalty','bankTrust','workforceEngagement','publicPerception'] as SoftKpi[])
    .forEach((k) => { next[k] = clampSoft(Number(next[k] || 0)); });
  return next as KPI;
}

/** Liefert die aus optionalen Invarianten resultierende KPI-Delta für den Übergang auf den nächsten Tag. */
function computeInvariantDelta(nextKpi: KPI, history: KPI[]): Partial<KPI> {
  const opt = readOptionalInv();
  const delta: Partial<KPI> = {};

  // Negative Liquidität → Strafen
  if (Number(nextKpi.cashEUR) < 0) {
    if (opt.pp_penalty_on_neg_cash)            delta.publicPerception     = (delta.publicPerception     || 0) - 5;
    if (opt.loyalty_penalty_on_neg_cash)       delta.customerLoyalty      = (delta.customerLoyalty      || 0) - 2;
    if (opt.payroll_delay_we_minus10)          delta.workforceEngagement  = (delta.workforceEngagement  || 0) - 10;
  }

  // Banktrust Schwellen
  if (Number(nextKpi.bankTrust) < 10) {
    if (opt.banktrust_lt10_workengagement_minus10) delta.workforceEngagement  = (delta.workforceEngagement  || 0) - 10;
    if (opt.banktrust_lt10_publicperception_minus10)delta.publicPerception     = (delta.publicPerception     || 0) - 10;
  }
  if (Number(nextKpi.bankTrust) > 80) {
    if (opt.banktrust_gt80_workengagement_plus10)  delta.workforceEngagement  = (delta.workforceEngagement  || 0) + 10;
    if (opt.banktrust_gt80_publicperception_plus80) delta.publicPerception     = (delta.publicPerception     || 0) + 80;
  }

  // 5× Verlust / 5× Profit (letzte 5 Perioden betrachten)
  const last = (history || []).slice(-5);
  if (last.length >= 5) {
    const pl = last.map(k => Number(k.profitLossEUR) || 0);
    const allLoss   = pl.every(v => v < 0);
    const allProfit = pl.every(v => v > 0);

    if (allLoss) {
      if (opt.loss5_banktrust_minus8)           delta.bankTrust         = (delta.bankTrust         || 0) - 8;
      if (opt.loss5_publicperception_minus5)    delta.publicPerception  = (delta.publicPerception  || 0) - 5;
      if (opt.loss5_customerloyalty_minus5)     delta.customerLoyalty   = (delta.customerLoyalty   || 0) - 5;
    }
    if (allProfit) {
      if (opt.profit5_banktrust_plus8)          delta.bankTrust         = (delta.bankTrust         || 0) + 8;
      if (opt.profit5_publicperception_plus8)   delta.publicPerception  = (delta.publicPerception  || 0) + 8;
      if (opt.profit5_customerloyalty_plus8)    delta.customerLoyalty   = (delta.customerLoyalty   || 0) + 8;
    }
  }
  return delta;
}

  
  // Handler functions
 const handleDayAdvance = async (newDay: number, kpiDelta: Partial<KPI>) => {
  // Datum des neuen Tages (09:00) vorbereiten
  const newDate = new Date();
  newDate.setHours(9 + (newDay - 1) * 24, 0, 0, 0);

  // 1) Historie fortschreiben (aktueller Stand wird Teil der Historie)
  dispatch({
    type: 'INIT',
    payload: {
      kpiHistory: [...state.kpiHistory, state.kpi],
      currentDate: newDate
    }
  });

  // 1b) KPI‑Δ aus heutigen Zufalls‑News hinzumischen
  const todaysNews = ((state.engineMeta as Record<string, unknown>)?.randomNews?.[state.day] || []) as Array<{ impact?: Partial<KPI> }>;
  const newsDelta = sumNewsImpact(todaysNews);
  const mergedDelta = mergeDelta(kpiDelta || {}, newsDelta);

  // 2) Vorläufigen Next‑KPI aus (Entscheidungen + News) berechnen
  const predictedNext = applyDeltaToKpi(state.kpi, mergedDelta);

  // 3) Optional‑Invarianten berechnen (auf Basis predictedNext und Historie inkl. predictedNext)
  const invDelta = computeInvariantDelta(predictedNext, [...state.kpiHistory, predictedNext]);

   // 4) Deltas zusammenführen und endgültigen KPI berechnen
  const combinedDelta = mergeDelta(mergedDelta, invDelta);
   const resultKpi = applyDeltaToKpi(state.kpi, combinedDelta);

  // 5) UI aktualisieren (einmaliges AddDelta – vermeidet Doppelanwendung)
  dispatch({ type: 'ADMIN_ADD_KPI', delta: combinedDelta });

  // 6) Tag umschalten
  dispatch({ type: 'INIT', payload: { day: newDay } });

  // 7) DB synchronisieren (idempotent; DaySyncController/Realtime verträgt das)
  try {
    await supabase
      .from('games')
      .update({ current_day: newDay, kpi_values: resultKpi })
      .eq('id', gameId);
  } catch (dbErr) {
    errorHandler.warn('DB‑Sync beim Tageswechsel (Invarianten) fehlgeschlagen', dbErr, { category: 'NETWORK', component: 'MultiplayerGameView', action: 'advance-day' });
  }

  // 8) Reporting aktualisieren (best effort)
  try {
    ReportStore.updateFromState(state);
  } catch (err) {
    errorHandler.warn('ReportStore update failed', err, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'advance-day' });
  }
};

      

 const declareInsolvency = () => {
  if (role === 'CEO') {
    dispatch({ type: 'DECLARE_INSOLVENCY' });
    setShowInsolvencyView(true);
  }
};

// ✅ NEU: Export/Restart-Handler auf Komponentenebene
const handleExportReport = useCallback(() => {
  try {
    const exportBtn = document.querySelector('[title*="Gesamtprotokoll"]') as HTMLButtonElement | null;
    if (exportBtn) exportBtn.click();
  } catch (err) {
    errorHandler.warn('Export-Button nicht gefunden oder nicht klickbar', err, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'export-click' });
  }
}, []);

const handleRestart = useCallback(() => {
  onLeave();
}, [onLeave]);

const handleCreditTaken = async (amount: number) => {
   const nextKpi = { ...state.kpi, cashEUR: (state.kpi.cashEUR || 0) + amount };

   // UI: sofortiges, optimistisches Update  Log
   dispatch({ type: 'ADMIN_ADD_KPI', delta: { cashEUR: amount } });
   dispatch({
     type: 'INIT',
     payload: {
       log: [
         ...(state.log || []),
         {
           day: state.day,
           role,
           chosenOptionId: 'credit_taken',
           message: `CFO hat einen Kredit über €${amount.toLocaleString('de-DE')} aufgenommen`,
           kpiDelta: { cashEUR: amount }
         }
       ]
     }
   });

   // DB: Realtime-Quelle aktualisieren
   try {
     await supabase
       .from('games')
       .update({ kpi_values: nextKpi })
       .eq('id', gameId);
   } catch (e) {
     errorHandler.error('KPI‑Update fehlgeschlagen', e, { category: 'NETWORK', component: 'MultiplayerGameView', action: 'update-kpi' });
   }
 };

const saveRoleComms = useCallback(async (text: string) => {
  try {
    // Update local log immediately
    dispatch({ type: 'SET_CUSTOM_TEXT', blockId: commsBlockId, day: state.day, role, text });
    // Persist to DB (idempotent via upsert)
    await upsertDecision(supabase, {
      game_id: gameId,
      player_id: mpService.getCurrentPlayerId()!,
      day: state.day,
      block_id: commsBlockId,
      option_id: null,
      custom_text: text || null,
      kpi_delta: null,
      decision_metadata: { type: 'role_communication', role, ts: Date.now() }
    });
  } catch (err) {
    errorHandler.warn('[MP] saveRoleComms failed', err, { category: 'NETWORK', component: 'MultiplayerGameView', action: 'save-comms' });
  }
}, [gameId, commsBlockId, role, state.day]);

// Kopierfunktion für Spiel-ID
const [copiedGameId, setCopiedGameId] = useState(false);

const handleCopyGameId = async () => {
  try {
    try {
      await navigator.clipboard.writeText(gameId);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = gameId;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedGameId(true);
    setTimeout(() => setCopiedGameId(false), 1200);
  } catch {
    // no-op
  }
};

  const handleOpenAttachment = (filename: string) => {
    let content = `Inhalt der Datei: ${filename}\n\n`;
    if (filename.includes('bilanz')) {
      content += 'Bilanzierung und Finanzdaten...';
    } else if (filename.includes('vertrag')) {
      content += 'Vertragliche Vereinbarungen...';
    } else {
      content += 'Dokumentinhalt wird geladen...';
    }
    setAttachmentModalContent({ title: filename, content });
  };

    // --- MP: Kreditaufnahme (nur CFO) ---
  const [allowCreditMP, setAllowCreditMP] = useState<boolean>(false);
const [creditAmount, setCreditAmount] = useState<string>('');
const [creditBusy, setCreditBusy] = useState<boolean>(false);
const [creditError, setCreditError] = useState<string | null>(null);
  const handleCreditDraw = async () => {
    setCreditError(null);
    const amt = Math.round(Number(creditAmount || '0'));
    if (!Number.isFinite(amt) || amt <= 0) {
      setCreditError('Bitte einen gültigen Betrag in € eingeben.');
      return;
    }
    try {
      setCreditBusy(true);
 

      // 1) Entscheidung protokollieren (Upsert)
      await upsertDecision(supabase, {
        game_id: gameId,
        player_id: mpService.getCurrentPlayerId(),
        day: state.day,
        block_id: 'BANK_DRAW_NOW',
        option_id: null,
        custom_text: null,
        kpi_delta: { cashEUR: amt },
        decision_metadata: { type: 'bank_draw', amount: amt, by: role, ts: Date.now() }
      });

      // 2) Kassenbestand in DB erhöhen → Realtime-Update erreicht alle Spieler
     const nextKpi = {
  ...company.initialKPI,          // Defaults sicherstellen
  ...(state.kpi || {}),
  cashEUR: (state.kpi.cashEUR || 0) + amt
};
await supabase.from('games').update({ kpi_values: nextKpi }).eq('id', gameId);

      // 3) Lokales, optimistisches Update für sofortiges Feedback
      dispatch({ type: 'ADMIN_ADD_KPI', delta: { cashEUR: amt } });

      setCreditAmount('');
    } catch (err: unknown) {
      errorHandler.error('Credit draw failed', err, { category: 'NETWORK', component: 'MultiplayerGameView', action: 'credit-draw' });
      setCreditError(err?.message || 'Fehler bei der Kreditaufnahme.');
    } finally {
      setCreditBusy(false);
    }
  };

  
// --- PATCH: Persistiere Entscheidungen robust via Upsert (DB hat UNIQUE auf game_id,player_id,day,block_id) ---
const handleDecisionMade = useCallback(async (...args: unknown[]) => {
  try {
    const playerId = mpService.getCurrentPlayerId();
    let blockId: string | undefined;
    let optionId: string | undefined;
    let kpiDelta: Partial<KPI> | null = null;
    let decisionMeta: Record<string, unknown> = {};

    const a0 = args[0];
    if (a0 && typeof a0 === 'object') {
      blockId = a0.blockId || a0.id || a0.block_id || a0.block?.id;
      optionId = a0.optionId || a0.option_id || a0.choiceId || a0.option?.id;
      kpiDelta = a0.kpiDelta || a0.delta || a0.kpi_delta || null;
      decisionMeta = a0.metadata || a0.decision_metadata || {};
    } else {
      blockId = args[0];
      optionId = args[1];
      kpiDelta = args[2] ?? null;
      decisionMeta = args[3] ?? {};
    }

    if (!blockId) {
      errorHandler.warn('[MP] onDecisionMade ohne blockId – übergebene Argumente', undefined, { category: 'VALIDATION', component: 'MultiplayerGameView', action: 'decision-made', metadata: { args } });
      return;
    }

    await upsertDecision(supabase, {
      game_id: gameId,
      player_id: playerId,
      day: state.day,
      block_id: blockId,
      option_id: optionId ?? null,
      custom_text: null,
      kpi_delta: kpiDelta,
      decision_metadata: decisionMeta
    });
  } catch (err) {
    errorHandler.error('[MP] upsertDecision fehlgeschlagen', err, { category: 'NETWORK', component: 'MultiplayerGameView', action: 'upsert-decision' });
  }
}, [gameId, state.day]);

  
const runPreview = useCallback(async () => {
    try {
      if (!whatIfEnabled) {
        setPreview(null);
        return;
      }

      // Adaptive Faktor aus den letzten zwei Tagen (falls aktiviert)
      const adaptiveFactor = await computeAdaptiveFactor(gameId);
      const rng = getRng();

      const ALL_ROLES: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];
      const npcRoles = ALL_ROLES.filter(r => r !== role);
      const todaysBlocks = getBlocksForDay(state.day);
      
            // NPC-Entscheidungen ohne Schwierigkeitseinfluss (Engine-Standard)
      const npcDeltas: Partial<KPI>[] = [];
      for (const b of todaysBlocks) {
        if (!npcRoles.includes(b.role)) continue;
        const optId = pickOptionForBlock(b, b.role, state.kpi);
        const opt = b.options.find(o => o.id === optId);
        if (opt && opt.kpiDelta) {
          npcDeltas.push(opt.kpiDelta as Partial<KPI>);
        }
      }

      const result = simulateNext(state as GameState, npcDeltas);
      
      const visibleKpis = MultiplayerService.getRoleKpiVisibility(role);
      const filteredDelta: Partial<KPI> = {};
      const filteredNext: KPI = { ...result.nextState.kpi };
      
      Object.keys(result.deltaToCurrent).forEach(key => {
        if (visibleKpis.includes(key as keyof KPI)) {
          filteredDelta[key as keyof KPI] = result.deltaToCurrent[key as keyof KPI];
        }
      });
      
      Object.keys(filteredNext).forEach(key => {
        if (!visibleKpis.includes(key as keyof KPI)) {
          (filteredNext as Record<string, unknown>)[key] = '???';
        }
      });
      
      setPreview({ delta: filteredDelta, nextKpi: filteredNext });
    } catch (err) {
      errorHandler.warn('Preview failed', err, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'run-preview' });
      setPreview(null);
    }
  }, [state, whatIfEnabled, role, gameId]);

  const handleKpiInput = (kpiKey: keyof KPI, value: string) => {
    const numValue = parseFloat(value) || 0;
    setCurrentKpiInputs({
      ...currentKpiInputs,
      [kpiKey]: numValue
    });
    
    const newEstimate: KpiEstimate = {
      day: state.day,
      kpi: kpiKey,
      value: numValue
    };
    
    setKpiEstimates(prev => {
      const filtered = prev.filter(e => !(e.day === state.day && e.kpi === kpiKey));
      return [...filtered, newEstimate];
    });
  };

  const getVisibleKpi = (): KPI => {
    const visibleKpis = MultiplayerService.getRoleKpiVisibility(role);
    const filtered: Record<string, unknown> = {};
    Object.keys(state.kpi).forEach(key => {
      const kpiKey = key as keyof KPI;
      if (visibleKpis.includes(kpiKey)) {
        filtered[key] = state.kpi[kpiKey];
      } else {
        const estimate = kpiEstimates.find(e => e.day === state.day && e.kpi === kpiKey);
        filtered[key] = estimate?.value ?? currentKpiInputs[kpiKey] ?? null;
      }
    });
    
    return filtered as KPI;
  };

  // Get data for current day
  const allBlocks = getBlocksForDay(state.day);
  const roleBlocks = allBlocks.filter(b => b.role === role);
  const newsBase = getNewsForDay(state.day);
const newsRandomAll = ((state.engineMeta as Record<string, unknown>)?.randomNews?.[state.day] || []);

// Nur globale News (ohne roles) oder solche für die eigene Rolle
const newsRandom = useMemo(() => {
  return (newsRandomAll as Array<DayNewsItem & { roles?: string[] }>).filter((n) => {
    const rs: string[] | null = n?.roles ?? null;
    return !rs || rs.includes(role);
  });
}, [newsRandomAll, role]);

  // Injizierte MP‑News (global + rollenbasiert)
  const [injectedNews, setInjectedNews] = useState<Array<DayNewsItem & { roles?: string[] | null }>>([]);

  useEffect(() => {
    if (!gameId) return;
    const svc = MultiplayerService.getInstance();
    let disposed = false;

    const apply = (list: Array<DayNewsItem & { roles?: string[] | null }>) => {
      if (!disposed) setInjectedNews(list || []);
    };

    // Abo für aktuellen Tag starten (+ initial laden)
    const ch = svc.subscribeInjectedNews(gameId, state.day, apply);

    return () => { disposed = true; if (ch) supabase.removeChannel(ch); };
  }, [gameId, state.day]);

  // Nur Nachrichten anzeigen, die global sind (roles==null) oder die eigene Rolle enthalten
  const newsInjected = useMemo(() => {
    return (injectedNews || []).filter((n: DayNewsItem & { roles?: string[] }) => {
      const rs: string[] | null = n?.roles ?? null;
      return !rs || rs.includes(role);
    });
  }, [injectedNews, role]);

const news = useMemo(() => [...newsBase, ...newsInjected, ...newsRandom], [newsBase, newsInjected, newsRandom]);

  
  // Narrative handling
  const dayNarr = narrativesByDay[state.day];
    

  const selectedNews = openNewsId ? news.find(n => n.id === openNewsId) : null;
  const beatRaw: NarrativeBeat | null = openNewsId && dayNarr
    ? dayNarr.beats.find(b => b.newsId === openNewsId) || null
    : null;
  const beat = useMemo(() => {
    if (!beatRaw) return null;
    if (beatRaw.relatedDecisionIds?.length) return beatRaw;
    return { ...beatRaw, relatedDecisionIds: inferRelatedDecisionIds(beatRaw.category, allBlocks) };
  }, [beatRaw, allBlocks]);

  const rolesWithNotes: RoleId[] = useMemo(() => {
    const acc = new Set<RoleId>();
    if (beat?.relatedDecisionIds?.length) {
      roleBlocks.forEach(b => { 
        if (beat.relatedDecisionIds!.includes(b.id)) acc.add(b.role); 
      });
    }
    return Array.from(acc);
  }, [beat, roleBlocks]);

const [gameTheme, setGameTheme] = React.useState<GameTheme>(() => {
  const admin = getAdminGameTheme();
  const user = allowUserOverride() ? readUserOverride() : null;
  return (user ?? admin);
});

/** ▼▼ REPLACE: jetzt sowohl auf localStorage (andere Tabs) als auch auf 'admin:settings' (gleiche Tab) reagieren */
React.useEffect(() => {
  const sync = () => {
    const admin = getAdminGameTheme();
    const user = allowUserOverride() ? readUserOverride() : null;
    setGameTheme(user ?? admin);
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key === 'admin:multiplayer' || e.key === 'user:gameTheme') sync();
  };
  const onAdmin = () => sync();

  window.addEventListener('storage', onStorage);
  window.addEventListener('admin:settings', onAdmin);

  // initialer Sync (falls AdminPanel offen war)
  sync();

  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('admin:settings', onAdmin);
  };
}, []);

  // Szenario-Overrides (MP): initial laden + Realtime aktualisieren → in localStorage spiegeln
React.useEffect(() => {
  if (!gameId) return;
  let alive = true;
  const svc = MultiplayerService.getInstance();

  (async () => {
    try {
      const ov = await svc.getScenarioOverrides(gameId);
      if (!alive) return;
      localStorage.setItem('scenario:overrides', JSON.stringify(ov || {}));
      window.dispatchEvent(new Event('scenario:overrides:updated'));
    } catch (e) {
      errorHandler.warn('[MP] getScenarioOverrides failed', e, { category: 'NETWORK', component: 'MultiplayerGameView', action: 'get-scenario-overrides' });
    }
  })();

  const ch = supabase
    .channel(`scenario-overrides-${gameId}`)
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'game_scenario_overrides', filter: `game_id=eq.${gameId}` },
      (payload: { new?: Record<string, unknown>; old?: Record<string, unknown>; eventType?: string }) => {
        const row = payload?.new || payload?.old || {};
        const ov = row?.overrides || {};
        localStorage.setItem('scenario:overrides', JSON.stringify(ov || {}));
        window.dispatchEvent(new Event('scenario:overrides:updated'));
      }
    )
    .subscribe();

  return () => { alive = false; supabase.removeChannel(ch); };
}, [gameId]);

// Realtime: Auf Spieleintrag reagieren (Admin-Tag-Set/Jump)
React.useEffect(() => {
  if (!gameId) return;
  let active = true;

  const ch = supabase
    .channel(`game-updates-${gameId}`)
    .on('postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'games', filter: `id=eq.${gameId}` },
      (payload: { new?: Record<string, unknown>; old?: Record<string, unknown>; eventType?: string }) => {
        if (!active) return;
        const row = payload?.new || {};
        const newDay = Number(row?.current_day) || 1;

        if (newDay !== state.day) {
          // Tages-Randoms für newDay sicherstellen
          const meta = state.engineMeta || {};
          const daily: Record<number, Partial<KPI>> = (meta?.dailyRandomValues || {});
          let currentDayRandoms = daily[newDay];

          if (!currentDayRandoms) {
            const baseKpiCash = row?.kpi_values?.cashEUR ?? state.kpi.cashEUR ?? 100000;
            currentDayRandoms = generateDailyRandomValues(baseKpiCash);
          }

          // „9 Uhr + (Tag-1)*24h“ wie in handleDayAdvance()
          const newDate = new Date();
          newDate.setHours(9 + (newDay - 1) * 24, 0, 0, 0);

          // Lokalen Zustand angleichen
          dispatch({
            type: 'INIT',
            payload: {
              day: newDay,
              kpi: row?.kpi_values || state.kpi,
              currentDate: newDate,
              engineMeta: {
                ...(meta || {}),
                currentDayRandoms,
                dailyRandomValues: { ...(daily || {}), [newDay]: currentDayRandoms },
                randomNews: (meta?.randomNews || {}),
                seed: meta?.seed
              }
            }
          });
        }
      }
    )
    .subscribe();

  return () => { active = false; supabase.removeChannel(ch); };
}, [gameId, state.day, state.engineMeta, state.kpi.cashEUR]);

// Realtime: Szenario-Overrides aus DB laden & weiterreichen (Kompatibilität: localStorage + Event)
React.useEffect(() => {
  if (!gameId) return;
  const svc = MultiplayerService.getInstance();
  let disposed = false;

  const apply = (merged: Record<string, unknown>) => {
    if (disposed) return;
    try {
      // 1) Kompatibilität: localStorage setzen
      localStorage.setItem('scenario:overrides', JSON.stringify(merged));
      // 2) Event wie im SP-Editor feuern
      window.dispatchEvent(new CustomEvent('admin:scenario:import', { detail: merged }));
      errorHandler.debug('[MP] scenario overrides applied (merged)', undefined, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'apply-scenario-overrides' });
    } catch (e) {
      errorHandler.error('[MP] scenario overrides apply failed', e, { category: 'UNEXPECTED', component: 'MultiplayerGameView', action: 'apply-scenario-overrides' });
    }
  };

  // Abo starten (lädt initial und bei INSERT)
  const ch = svc.subscribeScenarioOverrides(gameId, apply);

  return () => {
    disposed = true;
    if (ch) supabase.removeChannel(ch);
  };
}, [gameId]);

// Show insolvency view if insolvency occurred
// Spiel beendet (nicht Insolvenz): Seite wie im SP + Kommunikationsqualität
if (state.isOver && !state.insolvency) {
 return (
  <div className={`mp-theme theme-${themeMode}`}>
    <ThemeBackground mode={themeMode} />
    <div className="mp-content" style={{
      padding: '80px 60px',
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'transparent',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(10px)'
      }}>
        <Shell gameCodeToDisplay={gameId}>
        
          <EndingView
            state={state}
            onRestart={onLeave}
            extraSections={
              <>
                <CommQualitySection
                  state={state}
                  role={role}
                  kpiEstimates={kpiEstimates}
                />
                <TeamCommunicationSection
                  loadingComms={loadingComms}
                  commsByRole={commsByRole}
                />
              </>
            }
          />
        </Shell>
      </div>
    </div>
     </div>
  );
    }

  // INSOLVENCY VIEW - kommt VOR dem Haupt-return
if (showInsolvencyView && state.insolvency) {
  return (
    <InsolvencyViewMP
      state={state}
      role={role}
      playerName={playerName}
      kpiEstimates={kpiEstimates}
      onExport={handleExportReport}
      onRestart={handleRestart}
    />
  );
}

  
// HAUPT-RETURN - nur HIER die Änderungen machen
return (
  <div className={`mp-theme theme-${gameTheme}`}>
    <GameThemeBackground theme={gameTheme} />
    {allowUserOverride() && (
      <div style={{
        position:'fixed', right:12, bottom:12, zIndex: 3,
        background:'rgba(0,0,0,0.5)', color:'#fff',
        borderRadius:8, padding:6
      }}>
        <label style={{ fontSize:12, marginRight:6 }}>🎨 Theme</label>
        <select
          value={gameTheme}
          onChange={(e) => {
            const v = e.target.value as GameTheme;
            try { localStorage.setItem('user:gameTheme', v); } catch {}
            setGameTheme(v);
          }}
          style={{ background:'transparent', color:'#fff',
                   border:'1px solid rgba(255,255,255,0.4)',
                   borderRadius:6, padding:'4px 6px' }}
        >
          <option value="dynamic">Dynamic</option>
          <option value="minimal">Minimal</option>
          <option value="corporate">Corporate</option>
        </select>
      </div>
    )}
    <div className="mp-content" style={{
      padding: '80px 60px',
      maxWidth: '1400px',

      margin: '0 auto',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '6px',
        padding: '3px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(10px)'
      }}>
        <Shell gameCodeToDisplay={gameId}>
        {/* Coach System */}

        {CoachController && globalThis.__featureCoach && (
          <CoachController
            getState={() => state}
            controlsBeforeSelector="[data-coach-controls-anchor]"
            fixedFallback={false}
            multiplayerRole={role}
          />
        )}

        <div data-coach-controls-anchor style={{ display: 'none' }} />

      <GameHeader
        gameId={gameId}
        role={role}
        isGM={isGM}
        copiedGameId={copiedGameId}
        onCopyGameId={handleCopyGameId}
        onLeave={onLeave}
      />

      {/* Day Sync Controller */}
      <DaySyncController
        gameId={gameId}
        currentDay={state.day}
        state={state}
        onDayAdvance={handleDayAdvance}
        onGameStateUpdate={(update) => dispatch({ type: 'INIT', payload: update })}
        isGM={isGM}
        role={role}
        daySeconds={daySeconds}
        graceSeconds={graceSeconds}
      />

      <div className="row" style={{ 
  marginTop: 24,
  gap: '24px',
  display: 'flex',
  flexWrap: 'wrap',
  margin: '24px -12px'  // Negativer margin für gap-Kompensation
}}>
        
        {/* Left Column */}
        <div className="card" style={{ 
  flex: '1 1 320px',
  margin: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
}}>
          <h2>Tag {state.day} • {company.name}</h2>
          <div style={{ marginBottom: 12 }}>
            Spieler: <strong>{playerName}</strong> • Rolle: <strong>{role}</strong>
          </div>

          {/* KPI Display with communication inputs */}
          <div style={{ marginBottom: 16 }}>
            <h3>KPIs</h3>
            <KpiCockpit
              kpi={getVisibleKpi()}
              kpiHistory={state.kpiHistory}
              onOpenHistory={setShowHistoryKey}
              visibleKpis={MultiplayerService.getRoleKpiVisibility(role)}
            />
            
            {/* Input fields for non-visible KPIs */}
            <div style={{ marginTop: 12, padding: 12, background: '#f3f4f6', borderRadius: 8 }}>
              <h4 style={{ fontSize: 14, marginBottom: 8, color: '#374151' }}>
                📊 Von anderen gemeldete KPIs (Tag {state.day})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {Object.keys(state.kpi).map(key => {
                  const kpiKey = key as keyof KPI;
                  const visibleKpis = MultiplayerService.getRoleKpiVisibility(role);
                  if (visibleKpis.includes(kpiKey)) return null;
                  
                  const labels: Record<keyof KPI, string> = {
                    cashEUR: 'Liquidität (€)',
                    profitLossEUR: 'G/V (€)',
                    customerLoyalty: 'Kundentreue',
                    bankTrust: 'Bankvertrauen',
                    workforceEngagement: 'Belegschaft',
                    publicPerception: 'Öff. Wahrnehmung'
                  };
                  
                  return (
                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label style={{ fontSize: 11, color: '#6b7280' }}>
                        {labels[kpiKey]}
                      </label>
                      <input
                        type="number"
                        placeholder="?"
                        value={currentKpiInputs[kpiKey] || ''}
                        onChange={(e) => handleKpiInput(kpiKey, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          border: '1px solid #d1d5db',
                          fontSize: 12,
                          color: '#374151',
                          background: '#ffffff'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
           {/* --- MP: Kreditaufnahme (nur CFO, nur wenn Admin erlaubt) --- */}
           {role === 'CFO' && allowCreditMP && !creditSettings?.enabled && (
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  background: '#eef2ff',
                  border: '1px solid #c7d2fe',
                  borderRadius: 8
                }}
              >
                <h4 style={{ fontSize: 14, margin: 0, color: '#3730a3' }}>🏦 Kreditaufnahme (MP)</h4>
                <p style={{ fontSize: 12, color: '#4b5563', margin: '8px 0 12px' }}>
                  Sichtbar nur für CFO • vom Admin freigeschaltet
                </p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    placeholder="Betrag in €"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      borderRadius: 6,
                      border: '1px solid #c7d2fe',
                      fontSize: 13,
                      color: '#111827',
                      background: '#ffffff'
                    }}
                  />
                  <button
                    onClick={handleCreditDraw}
                    disabled={creditBusy}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: 'none',
                      background: '#6366f1',
                      color: 'white',
                      fontWeight: 600,
                      cursor: creditBusy ? 'not-allowed' : 'pointer'
                    }}
                    title="Erhöht die Liquidität (sofort) und protokolliert die Maßnahme"
                  >
                    {creditBusy ? '…' : 'Kredit ziehen'}
                  </button>
                </div>
                {creditError && (
                  <div style={{ color: '#b91c1c', fontSize: 12, marginTop: 6 }}>
                    {creditError}
                  </div>
                )}
              </div>
            )}
          {/* CFO Credit Panel - Only visible to CFO role when enabled */}
          {role === 'CFO' && creditSettings?.enabled && (
            <CFOCreditPanel
              gameId={gameId}
              currentDay={state.day}
              currentKpi={state.kpi}
              onCreditTaken={handleCreditTaken}
            />
           )}
          {/* Random Values Display */}
          <RandomValuesDisplay 
            randomValues={state.engineMeta?.currentDayRandoms} 
            day={state.day}
          />

          <ControlsPanel
            role={role}
            state={state}
            gameId={gameId}
            showDeclarationButton={role === 'CEO'}
            onDeclareInsolvency={declareInsolvency}
            onShowDecisionHistory={() => setShowDecisionHistory(true)}
            InfoButtons={InfoButtons}
            ExportReportButtonMP={ExportReportButtonMP}
          />

            {saveLoadEnabled && (
              <div
                style={{
                  width: '100%',
                  marginTop: 8,
                  padding: 12,
                  background: '#eef2ff',
                  border: '1px solid #c7d2fe',
                  borderRadius: 8
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <label style={{ fontSize: 12, color: '#374151' }}>
                    Slot:&nbsp;
                    <select
                      value={slotId}
                      onChange={(e) => setSlotId(e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #c7d2fe' }}
                    >
                      {(['A','B','C','D'] as const).map(s => {
                        const m = slotsMeta[s];
                        const label = m
                          ? `Slot ${s} – Tag ${m.day} (${new Date(m.ts).toLocaleString('de-DE')})`
                          : `Slot ${s} – leer`;
                        return <option key={s} value={s}>{label}</option>;
                      })}
                    </select>
                  </label>

                  <button
                    onClick={() => saveSlot(slotId)}
                    className="btn"
                    title="Lokalen Spielstand in diesem Slot sichern und (bei Bedarf) später laden"
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #818cf8', background: 'white', fontWeight: 600 }}
                  >
                    💾 Speichern
                  </button>

                  <button
                    onClick={() => loadSlot(slotId)}
                    className="btn"
                    title="Spielstand aus diesem Slot laden und mit dem MP-Server synchronisieren"
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #818cf8', background: 'white', fontWeight: 600 }}
                  >
                    📥 Laden
                  </button>

                  <button
                    onClick={() => { if (confirm(`Slot ${slotId} löschen?`)) deleteSlot(slotId); }}
                    className="btn"
                    title="Speicherstand in diesem Slot löschen"
                    style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ef4444', background: 'white', fontWeight: 600, color: '#b91c1c' }}
                  >
                    🗑️ Löschen
                  </button>
                </div>

                <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>
                  Auto‑Save:&nbsp;
                  {(() => {
                    try {
                      const raw = localStorage.getItem(`mp:save:${gameId}:${role}:__autosave__`);
                      if (!raw) return '— keiner —';
                      const o = JSON.parse(raw);
                      const ts = o?.meta?.ts ? new Date(o.meta.ts).toLocaleString('de-DE') : '?';
                      const d  = o?.state?.day ?? '?';
                      return `Tag ${d} – ${ts}`;
                    } catch { return '— ungültig —'; }
                  })()}
                </div>
              </div>
            )}

            
            <details style={{ marginTop: 12 }}>
              <summary style={{ 
                cursor: 'pointer', 
                fontSize: 13,
                color: '#6b7280',
                userSelect: 'none' 
              }}>
                Weitere Export-Optionen...
              </summary>
              <div style={{ marginTop: 8 }}>
                <ExportButtons state={state} />
              </div>
            </details>
          </div>
          
          <IntranetButton day={state.day} />

          {/* Other Players */}
          <div style={{ marginBottom: 16 }}>
            <h3>Andere Spieler</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {otherPlayers.map(player => (
                <div key={player.id} style={{
                  padding: 8,
                  background: '#f3f4f6',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#374151' }}>{player.name}</span>
                  <span style={{
                    padding: '2px 6px',
                    background: '#6366f1',
                    color: 'white',
                    borderRadius: 4,
                    fontSize: 12
                  }}>
                    {player.role || 'Keine Rolle'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
        {/* News Column */}
        <div className="card" style={{ 
  flex: '2 1 480px',
  margin: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
}}>
          <h3>News</h3>
          <NewsFeed
            items={news}
            onOpenNarrative={(id) => setOpenNewsId(id)}
          />
          <RandomNewsPanel
  news={newsRandom}   // ← nur die zur Rolle passenden Zufalls-News
  day={state.day}
/>
        </div>
      </div>

      <WhatIfPreview
        enabled={whatIfEnabled}
        preview={preview}
        role={role}
        currentDay={state.day}
        onRunPreview={runPreview}
        onClose={() => setPreview(null)}
      />

      <GameOverScreenFull
        state={state}
        finalEnding={finalEnding}
        role={role}
        kpiEstimates={kpiEstimates}
        loadingComms={loadingComms}
        commsByRole={commsByRole}
      />

      <GameChat
        gameId={gameId}
        playerName={playerName}
        playerRole={role}
        isGM={isGM}
      />
    </Shell>
      </div>  
    </div>    
  </div> 
);
}
/** Wrapper ohne Hooks: trennt Trainer-Ansicht (verhindert Hook-Reihenfolgewechsel) */
export default function MultiplayerGameView(props: MultiplayerGameViewProps) {
  if (props.role === 'TRAINER') {
    return (
      <React.Suspense fallback={<div>Lade Trainer-Dashboard...</div>}>
        <TrainerDashboard gameId={props.gameId} onLeave={props.onLeave} />
      </React.Suspense>
    );
  }
  return <MultiplayerGameViewInner {...props} />;
}
