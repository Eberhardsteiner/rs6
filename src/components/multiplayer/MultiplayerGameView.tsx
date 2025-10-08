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
(pdfMake as any).vfs = (pdfFonts as any).default?.pdfMake?.vfs || (pdfFonts as any).pdfMake?.vfs;

// Thema laden
import GameThemeBackground, { type GameTheme } from './GameThemeBackground';
import './game-theme.css';

// Import Report Store and PDF export
import { ReportStore } from '@/reporting/reportBuilder';
import { exportSimulationReport } from '@/services/pdfReport';

// Import makeRng for random value generation
import { makeRng } from '@/core/utils/prng';
import { generateRandomNewsForDay } from '@/core/engine/randomNews';







function getAdminGameTheme(): GameTheme {
  try {
    const g: any = (globalThis as any).__multiplayerSettings
      || JSON.parse(localStorage.getItem('admin:multiplayer') || '{}');
    return (g?.gameSettings?.backgroundTheme ?? 'dynamic') as GameTheme;
  } catch { return 'dynamic'; }
}

function allowUserOverride(): boolean {
  try {
    const g: any = (globalThis as any).__multiplayerSettings
      || JSON.parse(localStorage.getItem('admin:multiplayer') || '{}');
    return !!g?.gameSettings?.allowUserOverride;
  } catch { return false; }
}

function readUserOverride(): GameTheme | null {
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





// Local ThemeMode type and top-level lazy for TrainerDashboard
type ThemeMode = 'classic' | 'business' | 'dynamic';
const TrainerDashboard = React.lazy(async () => {
 try {
    return await import('./TrainerDashboard');
  } catch (e) {
   console.error('TrainerDashboard lazy import failed:', e);
    return { default: ({ onLeave }: any) => (
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


function computeRoundSecondsForDay(day: number): number {
  const g: any = globalThis as any;
  const mode = g.__roundTimeMode || 'off';
  if (mode === 'global' && typeof g.__roundTimeGlobalSec === 'number' && g.__roundTimeGlobalSec > 0) {
    return g.__roundTimeGlobalSec;
  }
  if (mode === 'matrix' && g.__roundTimeMatrix && typeof g.__roundTimeMatrix === 'object') {
    const row = (g.__roundTimeMatrix as any)[day] || {};
    const total = RT_ROLES.reduce((s, r) => s + (Number(row[r]) || 0), 0);
    if (total > 0) return total;
  }
  // Fallback (wie bisher)
  return 300;
}
function readGraceSeconds(): number {
  const g: any = globalThis as any;
  const n = Number(g.__roundTimeGraceSec);
  return Number.isFinite(n) && n >= 0 ? n : 180;
}

/** ── Szenario-Übersteuerung (vom ScenarioEditor) ─────────────────────────── */
function readScenarioOverride(kind: 'blocks'|'news', day: number): any[] | null {
  try {
    const g: any = globalThis as any;
    const byDay = g?.__scenarioOverrides?.[kind];
    if (byDay && Array.isArray(byDay[day])) return byDay[day];
    // Fallback: aus LocalStorage lesen (vom Editor persistiert)
    const raw = localStorage.getItem('scenario:overrides');
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (o && o[kind] && Array.isArray(o[kind][day])) return o[kind][day];
  } catch {}
  return null;
}

/** ── Adaptive Difficulty (Light) ─────────────────────────────────────────────
 * Nutzt Admin-Flag __adaptiveDifficultyLightEnabled und skaliert die NPC-Fehlerquote
 * (×0.9–1.2) basierend auf den letzten zwei Tagen (weiche KPIs).
 * Wirkt ausschließlich auf die What‑If‑Vorschau im MP (NPC‑Autopilot).
 */

type SoftScoringWeights = {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
};

function getScoringWeightsSafe(): SoftScoringWeights {
  const g: any = globalThis as any;
  const w = g.__scoringWeights || { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 };
  return {
    bankTrust: Number(w.bankTrust || 25),
    publicPerception: Number(w.publicPerception || 25),
    customerLoyalty: Number(w.customerLoyalty || 25),
    workforceEngagement: Number(w.workforceEngagement || 25),
  };
}

/** Grobe Nutzenfunktion für Optionsbewertung (weiche KPIs gewichtet, Cash/P&L leicht gewichtet). */
function scoreOptionByKpiDelta(opt: any): number {
  const d = (opt?.kpiDelta || {}) as Partial<KPI>;
  const w = getScoringWeightsSafe();
  const soft =
    (Number(d.bankTrust || 0) * w.bankTrust) +
    (Number(d.publicPerception || 0) * w.publicPerception) +
    (Number(d.customerLoyalty || 0) * w.customerLoyalty) +
    (Number(d.workforceEngagement || 0) * w.workforceEngagement);
  // Cash/P&L skalieren, damit Größenordnung vergleichbar bleibt
  const hard = (Number(d.cashEUR || 0) / 1000) + (Number(d.profitLossEUR || 0) / 1000);
  return soft + hard;
}

function readBaseErrorByDifficulty(): number {
  const g: any = globalThis as any;
  const diff = (g.__npcDifficulty || g.__mode || 'normal') as ('easy'|'normal'|'hard');
  switch (diff) {
    case 'easy': return 0.08;
    case 'hard': return 0.25;
    default: return 0.15;
  }
}

/** Ermittelt adaptiven Skalierungsfaktor (0.9..1.2) aus den letzten zwei Tagen (weiche KPIs). */
function computeAdaptiveFactorFromSnapshots(snapshots: any[]): number {
  const g: any = globalThis as any;
  if (!g.__adaptiveDifficultyLightEnabled) return 1.0;

  try {
    if (!Array.isArray(snapshots) || snapshots.length < 2) return 1.0;
    const k0 = snapshots[0]?.state?.kpi || {};
    const k1 = snapshots[1]?.state?.kpi || {};
    const s0 = Number(k0.customerLoyalty || 50) + Number(k0.bankTrust || 50) +
               Number(k0.workforceEngagement || 50) + Number(k0.publicPerception || 50);
    const s1 = Number(k1.customerLoyalty || 50) + Number(k1.bankTrust || 50) +
               Number(k1.workforceEngagement || 50) + Number(k1.publicPerception || 50);
    const diffAvg = ((s0 - s1) / 4); // [-100..100]
    const scale = Math.max(-0.1, Math.min(0.2, diffAvg / 250)); // -0.1..0.2
    return 1.0 + scale;
  } catch {
    return 1.0;
  }
}

async function computeAdaptiveFactor(gameId: string): Promise<number> {
  const g: any = globalThis as any;
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

function getRng(): () => number {
  const g: any = globalThis as any;
  const r = g.__rng;
  return typeof r === 'function' ? r : Math.random;
}

/** Wählt eine NPC‑Option, die je nach Schwierigkeit + adaptivem Faktor bewusst nicht immer optimal ist. */
function chooseNpcOptionWithDifficulty(
  b: DecisionBlock,
  role: RoleId,
  kpi: KPI,
  adaptiveFactor = 1.0,
  rng: () => number = Math.random
): string {
  const options = (b as any)?.options || [];
  if (!options?.length) return pickOptionForBlock(b, role, kpi);

  // Optionen nach Heuristik bewerten
  const scored = options
    .map((o: any) => ({ id: o.id, opt: o, score: scoreOptionByKpiDelta(o) }))
    .sort((a: any, b: any) => b.score - a.score);

  const bestId = scored[0]?.id ?? pickOptionForBlock(b, role, kpi);

  // Fehlerwahrscheinlichkeit aus Schwierigkeit × adaptiver Faktor
  const base = readBaseErrorByDifficulty();
  const errorProb = Math.max(0.02, Math.min(0.45, base * adaptiveFactor));

  if (rng() < errorProb && scored.length > 1) {
    // Leicht suboptimale Wahl (zweite Wahl); selten deutlich schlechter (untere Hälfte).
    if (rng() < 0.75) {
      return scored[Math.min(1, scored.length - 1)].id;
    } else {
      const lowerStart = Math.floor(scored.length / 2);
      const idx = lowerStart + Math.floor(rng() * Math.max(1, scored.length - lowerStart));
      return scored[Math.min(idx, scored.length - 1)].id;
    }
  }

  return bestId;
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

// Helper functions
function getBlocksForDay(day: number): DecisionBlock[] {
  // 1) Admin/Editor-Override
  const override = readScenarioOverride('blocks', day) as DecisionBlock[] | null;
  if (override) return override;

  // 2) Standard
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
  // 1) Admin/Editor-Override
  const override = readScenarioOverride('news', day) as DayNewsItem[] | null;
  if (override) return override;

  // 2) Standard
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
          (run as any).meta = (run as any).meta || {};
          (run as any).meta.commsAll = commsAll;
          const own = (state.log || []).slice().reverse().find(e => e.blockId === `COMMS_${role}` && e.day === state.day && e.role === role);
          (run as any).meta.commsSelf = { role, day: state.day, text: own?.customText || '' };
        } catch (e) {
          console.warn('Could not attach communications to report:', e);
        }

      }
      
      await exportSimulationReport(pdfMake, run, fileName);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Fehler beim Export: ' + (error as any)?.message);
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
      const s: any = (globalThis as any).__multiplayerSettings;
      const bg = s?.gameSettings?.backgroundTheme || 'minimal';
      const mapped = bg === 'corporate' ? 'business' : (bg === 'dynamic' ? 'dynamic' : 'classic');
      setThemeMode(mapped as ThemeMode);
    } catch {}
  };
  applyTheme();
  const handler = () => applyTheme();
  window.addEventListener('admin:settings', handler as any);
  return () => window.removeEventListener('admin:settings', handler as any);
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
  const [otherPlayers, setOtherPlayers] = useState<any[]>([]);
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
      console.warn('[MP] admin:kpi:set failed:', err);
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
          (next as any)[k] = Number((state.kpi as any)[k] || 0) + dv;
        }
      });
      // Lokales UI sofort aktualisieren
      dispatch({ type: 'ADMIN_ADD_KPI', delta });
      // DB -> Realtime für alle Spieler
      await supabase.from('games')
        .update({ kpi_values: next })
        .eq('id', gameId);
    } catch (err) {
      console.warn('[MP] admin:kpi:add failed:', err);
    }
  };

  window.addEventListener('admin:kpi:set', onKpiSet as EventListener);
  window.addEventListener('admin:kpi:add', onKpiAdd as EventListener);
  return () => {
    window.removeEventListener('admin:kpi:set', onKpiSet as any);
    window.removeEventListener('admin:kpi:add', onKpiAdd as any);
  };
}, [gameId, state.kpi]);

// Admin: Day‑Steuerung (setzen / +1 vorwärts) – Listener + DB‑Sync (MP)
useEffect(() => {
  const onSetDay = async (e: Event) => {
    try {
      const detail = (e as CustomEvent<any>).detail;
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
      console.warn('[MP] admin:set-day failed:', err);
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
      console.warn('[MP] admin:advance-day failed:', err);
    }
  };

  window.addEventListener('admin:set-day', onSetDay as EventListener);
  window.addEventListener('admin:advance-day', onAdvanceDay as EventListener);
  return () => {
    window.removeEventListener('admin:set-day', onSetDay as any);
    window.removeEventListener('admin:advance-day', onAdvanceDay as any);
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
  const [creditSettings, setCreditSettings] = useState<any>(null);
  const [mpDifficulty, setMpDifficulty] = useState<'easy'|'normal'|'hard'>(
    (globalThis as any).__mpDifficulty || 'normal'
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
    [...saveSlots, '__autosave__' as any].forEach((s: any) => {
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
      console.warn('saveSlot failed:', e);
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
        console.warn('DB-Sync beim Laden fehlgeschlagen:', dbErr);
      }

      alert(`Spielstand aus Slot ${slot} geladen (Tag ${saved.day ?? '?'}).`);
    } catch (e) {
      alert('Laden fehlgeschlagen.');
      console.warn('loadSlot failed:', e);
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
        const g: any = globalThis as any;
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
  const [CoachController, setCoachController] = useState<any>(null);
  const [InfoButtos, setInfoButtos] = useState<any>(() => () => null);

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
        const infoModule = await import('@/components/info/InfoButtos');
        setInfoButtos(() => infoModule.default);
      } catch {
        // InfoButtos not available - use placeholder
        setInfoButtos(() => () => null);
      }
    };
    
    loadOptionalComponents();
  }, []);
// Load credit settings from global multiplayer settings
useEffect(() => {
  const loadCreditSettings = () => {
    const mpSettings = (globalThis as any).__multiplayerSettings;
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
        const g: any = globalThis as any;
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
        const g: any = globalThis as any;
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
      const g: any = globalThis as any;
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
        const currentPlayer = gameInfo.players.find((p: any) => p.id === currentPlayerId);
        setIsGM(currentPlayer?.is_gm || false);

        setOtherPlayers(gameInfo.players.filter((p: any) => p.id !== currentPlayerId));

        // FIX: Ensure currentDate is properly set
        const gameDate = new Date();
        gameDate.setHours(9 + (gameInfo.game.current_day - 1) * 24, 0, 0, 0);

        // Load KPI history from Supabase snapshots
        let kpiHistory: KPI[] = [];
        try {
          const { data: snapshots, error: snapErr } = await supabase
            .from('game_state_snapshots')
            .select('day, kpi, state')
            .eq('game_id', gameId)
            .order('day', { ascending: true });

          if (!snapErr && snapshots && snapshots.length > 0) {
            kpiHistory = snapshots.map((snap: any) => {
              // Prüfe zuerst das kpi-Feld (neu), dann state.kpi (alt)
              const kpiData = snap.kpi || snap.state?.kpi;
              return kpiData || company.initialKPI;
            });
            console.log(`KPI-Historie geladen: ${kpiHistory.length} Einträge für Tage 1-${kpiHistory.length}`);
          } else if (snapErr) {
            console.warn('Fehler beim Laden der KPI-Historie:', snapErr);
          }
        } catch (histErr) {
          console.warn('KPI-Historie konnte nicht geladen werden:', histErr);
        }

        dispatch({
          type: 'INIT',
          payload: {
            day: gameInfo.game.current_day,
            currentDate: gameDate, // FIX: Add currentDate to init
            kpi: gameInfo.game.kpi_values || company.initialKPI,
            kpiHistory: kpiHistory,  // Laden der Historie aus Supabase
            isOver: gameInfo.game.state === 'finished',
            playerName: playerName,
            playerRole: role,
            playerRoles: [role]
          }
        });



        
        // SYNCHRONIZED RANDOM VALUES using Seed
        let allRandomValues: Record<number, any> = {};
        let randomNews: Record<number, any> = {};
        
        if (gameInfo.settings?.seed) {
          const seed = gameInfo.settings.seed;
          console.log('[MP] Using game seed:', seed);
          
          (globalThis as any).__gameSeed = seed;
          
          for (let day = 1; day <= 14; day++) {
            const daySpecificSeed = seed + day * 1000;
            const dayRng = makeRng(daySpecificSeed);
            (globalThis as any).__rng = dayRng;
            
            const baseKpi = day === 1 
              ? (gameInfo.game.kpi_values?.cashEUR || company.initialKPI.cashEUR)
              : 100000;
            
            const dayRandoms = generateDailyRandomValues(baseKpi);
            allRandomValues[day] = dayRandoms;
            
 // Zufalls‑News (MP) aus newsPool via SP‑Generator – inkl. KPI‑Impact
          
if ((globalThis as any).__randomNews) {
  const g: any = globalThis as any;

  // Admin-Eventintensität (Skalar) → Generator-Intensität (low/normal/high)
  const useIntensity = !!g.__featureEventIntensity;
  const arr = Array.isArray(g.__eventIntensityByDay) ? g.__eventIntensityByDay : [];
  const intensityStr = mapIntensity(useIntensity ? (Number(arr[day - 1]) || 1) : 1);

  // Schwierigkeit aus AdminPanelMPM (easy/normal/hard)
  const mpDiff = (g.__mpDifficulty || g.__multiplayerSettings?.mpDifficulty || 'normal') as 'easy'|'normal'|'hard';

  // Duplikat-Vermeidung über Tage (nach Titel)
  (globalThis as any).__playedNewsTitles = (globalThis as any).__playedNewsTitles || [];
  const played: string[] = (globalThis as any).__playedNewsTitles;

  // RNG für News deterministisch (Seed + Tages-Offset + 500)
  const prevRng = (globalThis as any).__rng;
  (globalThis as any).__rng = makeRng(daySpecificSeed + 500);

  // Pool-basierte News erzeugen (inkl. KPI + optional roles)
  const items = generateRandomNewsForDay(undefined, {
    enabled: true,
    intensity: intensityStr,
    difficulty: mpDiff,
    day,
    alreadyPlayed: played
  });

  // RNG wiederherstellen
  (globalThis as any).__rng = prevRng;

  // In DayNewsItem-Form bringen (UI-Severity + Quelle + optional roles)
  const dayNews = (items as any[]).map((n: any) => ({
    id: n.id,
    title: n.title,
    text: n.text,
    source: n.category,                 // Kategorie als Quelle
    severity: mapSeverityForUi(n.severity),
    impact: n.impact,                   // KPI-Wirkung bleibt erhalten
    roles: (n as any).roles ?? null     // ← rollenspezifische Sichtbarkeit
  }));

  randomNews[day] = dayNews;
  played.push(...(items as any[]).map(n => n.title));
}


         
          }

          const currentDayRng = makeRng(ensuredSeed + gameInfo.game.current_day * 1000);
          (globalThis as any).__rng = currentDayRng;
        }

        // Einheitlich den effektiven Seed ermitteln (DB-Seed oder ensuredSeed)
        const effectiveSeed = gameInfo.settings?.seed ?? (globalThis as any).__gameSeed;

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
        console.error('Error initializing game:', error);
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

  // NEW: Start heartbeat and set up real-time observation for join-in-progress
  useEffect(() => {
    console.log('[MP] Starting heartbeat and real-time observation');

    // Start heartbeat to keep player active
    mpService.startHeartbeat();

    // Set up comprehensive real-time observation
    const { unsubscribe } = mpService.observeGame(gameId, {
      onGameUpdate: (game) => {
        console.log('[MP] Game status update:', game.status, 'Day:', game.current_day);
        // Game updates are already handled by existing subscription
      },
      onPlayersUpdate: (players) => {
        console.log('[MP] Players update:', players.length, 'active players');
        const currentPlayerId = mpService.getCurrentPlayerId();
        setOtherPlayers(players.filter((p: any) => p.id !== currentPlayerId));
      },
      onPresenceSync: (presenceState) => {
        console.log('[MP] Presence sync:', Object.keys(presenceState).length, 'online');
      }
    });

    return () => {
      console.log('[MP] Stopping heartbeat and cleaning up observation');
      mpService.stopHeartbeat();
      unsubscribe();
    };
  }, [gameId]);

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
      (game: any) => {
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
          const meta = state.engineMeta as any;
          
          if (meta.dailyRandomValues && meta.dailyRandomValues[game.current_day]) {
            console.log('[MP] Using pre-generated random values for day', game.current_day);
            
            if (meta.seed) {
              const dayRng = makeRng(meta.seed + game.current_day * 1000);
              (globalThis as any).__rng = dayRng;
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
            console.warn('[MP] No pre-generated values for day', game.current_day);

            // Setze tages-spezifische RNG auch im Fallback deterministisch:
            const seed = (meta?.seed ?? (globalThis as any).__gameSeed) as number | undefined;
            if (seed != null) {
              const dayRng = makeRng(seed + game.current_day * 1000);
              (globalThis as any).__rng = dayRng;
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
      (players: any) => {
        const currentPlayerId = mpService.getCurrentPlayerId();
        setOtherPlayers(players.filter((p: any) => p.id !== currentPlayerId));
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
        console.warn('Could not load communications:', e);
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

function readOptionalInv(): any {
  try { return ((globalThis as any).__invariants?.optional) || {}; } catch { return {}; }
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
   const out: any = { ...(a || {}) };
   (Object.keys(b || {}) as (keyof KPI)[]).forEach((k) => {
     const bv = (b as any)[k];
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
      const v = (it.impact as any)[k];
      if (typeof v === 'number') (acc as any)[k] = ((acc as any)[k] || 0) + v;
    });
  }
  return acc;
}

function applyDeltaToKpi(base: KPI, delta: Partial<KPI>): KPI {
  const next: any = { ...base };
  (Object.keys(delta) as (keyof KPI)[]).forEach((k) => {
    const v = (delta as any)[k];
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
    if (opt.pp_penalty_on_neg_cash)            (delta as any).publicPerception     = ((delta as any).publicPerception     || 0) - 5;
    if (opt.loyalty_penalty_on_neg_cash)       (delta as any).customerLoyalty      = ((delta as any).customerLoyalty      || 0) - 2;
    if (opt.payroll_delay_we_minus10)          (delta as any).workforceEngagement  = ((delta as any).workforceEngagement  || 0) - 10;
  }

  // Banktrust Schwellen
  if (Number(nextKpi.bankTrust) < 10) {
    if (opt.banktrust_lt10_workengagement_minus10) (delta as any).workforceEngagement  = ((delta as any).workforceEngagement  || 0) - 10;
    if (opt.banktrust_lt10_publicperception_minus10)(delta as any).publicPerception     = ((delta as any).publicPerception     || 0) - 10;
  }
  if (Number(nextKpi.bankTrust) > 80) {
    if (opt.banktrust_gt80_workengagement_plus10)  (delta as any).workforceEngagement  = ((delta as any).workforceEngagement  || 0) + 10;
    if (opt.banktrust_gt80_publicperception_plus80) (delta as any).publicPerception     = ((delta as any).publicPerception     || 0) + 80;
  }

  // 5× Verlust / 5× Profit (letzte 5 Perioden betrachten)
  const last = (history || []).slice(-5);
  if (last.length >= 5) {
    const pl = last.map(k => Number(k.profitLossEUR) || 0);
    const allLoss   = pl.every(v => v < 0);
    const allProfit = pl.every(v => v > 0);

    if (allLoss) {
      if (opt.loss5_banktrust_minus8)           (delta as any).bankTrust         = ((delta as any).bankTrust         || 0) - 8;
      if (opt.loss5_publicperception_minus5)    (delta as any).publicPerception  = ((delta as any).publicPerception  || 0) - 5;
      if (opt.loss5_customerloyalty_minus5)     (delta as any).customerLoyalty   = ((delta as any).customerLoyalty   || 0) - 5;
    }
    if (allProfit) {
      if (opt.profit5_banktrust_plus8)          (delta as any).bankTrust         = ((delta as any).bankTrust         || 0) + 8;
      if (opt.profit5_publicperception_plus8)   (delta as any).publicPerception  = ((delta as any).publicPerception  || 0) + 8;
      if (opt.profit5_customerloyalty_plus8)    (delta as any).customerLoyalty   = ((delta as any).customerLoyalty   || 0) + 8;
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
  const todaysNews = ((state.engineMeta as any)?.randomNews?.[state.day] || []) as Array<{ impact?: Partial<KPI> }>;
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
    console.warn('DB‑Sync beim Tageswechsel (Invarianten) fehlgeschlagen:', dbErr);
  }

  // 8) Reporting aktualisieren (best effort)
  try {
    ReportStore.updateFromState(state);
  } catch (err) {
    console.warn('ReportStore update failed:', err);
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
    console.warn('Export-Button nicht gefunden oder nicht klickbar:', err);
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
     console.error('KPI‑Update fehlgeschlagen:', e);
   }
 };

const saveRoleComms = useCallback(async (text: string) => {
  try {
    // Update local log immediately
    dispatch({ type: 'SET_CUSTOM_TEXT', blockId: commsBlockId, day: state.day, role, text });
    // Persist to DB (idempotent via upsert)
    await upsertDecision(supabase as any, {
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
    console.warn('[MP] saveRoleComms failed:', err);
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
      await upsertDecision(supabase as any, {
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
    } catch (err: any) {
      console.error('Credit draw failed:', err);
      setCreditError(err?.message || 'Fehler bei der Kreditaufnahme.');
    } finally {
      setCreditBusy(false);
    }
  };


  
// --- PATCH: Persistiere Entscheidungen robust via Upsert (DB hat UNIQUE auf game_id,player_id,day,block_id) ---
const handleDecisionMade = useCallback(async (...args: any[]) => {
  try {
    const playerId = mpService.getCurrentPlayerId();
    let blockId: string | undefined;
    let optionId: string | undefined;
    let kpiDelta: any = null;
    let decisionMeta: any = {};

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
      console.warn('[MP] onDecisionMade ohne blockId – übergebene Argumente:', args);
      return;
    }

    await upsertDecision(supabase as any, {
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
    console.error('[MP] upsertDecision fehlgeschlagen:', err);
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
        if (opt && (opt as any).kpiDelta) {
          npcDeltas.push((opt as any).kpiDelta as Partial<KPI>);
        }
      }


      const result = simulateNext(state as any, npcDeltas);
      
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
          (filteredNext as any)[key] = '???';
        }
      });
      
      setPreview({ delta: filteredDelta, nextKpi: filteredNext });
    } catch (err) {
      console.warn('Preview failed:', err);
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
    const filtered: any = {};
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
const newsRandomAll = (state.engineMeta as any)?.randomNews?.[state.day] || [];

// Nur globale News (ohne roles) oder solche für die eigene Rolle
const newsRandom = useMemo(() => {
  return (newsRandomAll as any[]).filter((n: any) => {
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
    return (injectedNews || []).filter((n: any) => {
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
    return { ...beatRaw, relatedDecisionIds: inferRelatedDecisionIds((beatRaw as any).category, allBlocks) };
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
// Kommunikationsqualität als Zusatzkarte (Mehrspielermodus)
const CommQualitySection = ({ state, role, kpiEstimates }: { state: GameState; role: RoleId; kpiEstimates: KpiEstimate[] }) => {
  const visibleKpis = MultiplayerService.getRoleKpiVisibility(role);
  const nonVisible = (kpiEstimates || []).filter(est => !visibleKpis.includes(est.kpi));
  if (!nonVisible.length) return null;

  const rows = nonVisible.map(est => {
    const actual = state.kpi[est.kpi] as number;
    const diff = (actual ?? 0) - (est.value ?? 0);
    const accuracy = (typeof actual === 'number' && actual !== 0)
      ? Math.max(0, Math.min(100, 100 - Math.abs((est.value - actual) / actual * 100)))
      : 0;
    return { ...est, actual, diff, accuracy };
  });
  const avgAccuracy = rows.reduce((s, r) => s + r.accuracy, 0) / rows.length;

  const kpiLabels: Record<keyof KPI, string> = {
    cashEUR: 'Liquidität',
    profitLossEUR: 'Gewinn/Verlust',
    customerLoyalty: 'Kundentreue',
    bankTrust: 'Bankvertrauen',
    workforceEngagement: 'Belegschaft',
    publicPerception: 'Öff. Wahrnehmung'
  };
  const fmtVal = (k:string, v:number) => k.includes('EUR')
    ? new Intl.NumberFormat('de-DE', { style:'currency', currency:'EUR', maximumFractionDigits:0 }).format(v||0)
    : `${Math.round(v||0)}`;

  return (
    <div>
      <h2>📊 Kommunikationsqualität (Mehrspielermodus)</h2>
      <p style={{ marginTop: 4, color: '#374151' }}>
        Vergleich der gemeldeten KPI‑Werte (Teamkommunikation) mit den tatsächlichen Endwerten.
        Berücksichtigt werden nur KPIs, die für die Rolle <strong>{role}</strong> nicht direkt sichtbar waren.
      </p>
      <div style={{
        margin: '12px 0 16px',
        padding: 12,
        background: avgAccuracy > 80 ? '#d1fae5' : avgAccuracy > 60 ? '#fef3c7' : '#fee2e2',
        border: '1px solid ' + (avgAccuracy > 80 ? '#86efac' : avgAccuracy > 60 ? '#fde68a' : '#fecaca'),
        borderRadius: 8,
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 12, color: '#6b7280' }}>Durchschnittliche Genauigkeit</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: avgAccuracy > 80 ? '#059669' : avgAccuracy > 60 ? '#b45309' : '#b91c1c' }}>
          {avgAccuracy.toFixed(1)}%
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
          <thead>
            <tr style={{ borderBottom:'2px solid #e5e7eb', background:'#f9fafb' }}>
              <th style={{ padding:8, textAlign:'left' }}>Tag</th>
              <th style={{ padding:8, textAlign:'left' }}>KPI</th>
              <th style={{ padding:8, textAlign:'right' }}>Gemeldet</th>
              <th style={{ padding:8, textAlign:'right' }}>Tatsächlich</th>
              <th style={{ padding:8, textAlign:'right' }}>Abweichung</th>
              <th style={{ padding:8, textAlign:'right' }}>Genauigkeit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} style={{ borderBottom:'1px solid #f3f4f6' }}>
                <td style={{ padding:8, color:'#374151' }}>{r.day}</td>
                <td style={{ padding:8, color:'#374151' }}>{kpiLabels[r.kpi]}</td>
                <td style={{ padding:8, textAlign:'right', color:'#374151' }}>{fmtVal(r.kpi, r.value)}</td>
                <td style={{ padding:8, textAlign:'right', color:'#374151' }}>{fmtVal(r.kpi, r.actual as number)}</td>
                <td style={{ padding:8, textAlign:'right', color: Math.abs(r.diff) > (Number(r.actual)||1) * 0.2 ? '#ef4444' : '#f59e0b' }}>
                  {fmtVal(r.kpi, r.diff)}
                </td>
                <td style={{ padding:8, textAlign:'right', fontWeight:600, color: r.accuracy > 80 ? '#10b981' : r.accuracy > 60 ? '#f59e0b' : '#ef4444' }}>
                  {r.accuracy.toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

  // Team-Kommunikation für EndingView
const TeamCommunicationSection = ({
  loadingComms,
  commsByRole
}: {
  loadingComms: boolean;
  commsByRole: Record<RoleId, Array<{ day: number; text: string }>>;
}) => {
  return (
    <div
      style={{
        marginTop: 24,
        padding: 20,
        background: 'linear-gradient(135deg, #fff7ed, #fffbeb)',
        borderRadius: 12,
        border: '1px solid #fcd34d'
      }}
    >
      <h3
        className="mp-heading"
        style={{ margin: '0 0 12px 0', color: '#92400e' }}
      >
        🗣️ Kommunikationsnotizen (Team)
      </h3>
      {loadingComms ? (
        <div style={{ color: '#6b7280' }}>Lade Kommunikationsnotizen…</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12
          }}
        >
          {(['CEO', 'CFO', 'OPS', 'HRLEGAL'] as RoleId[]).map((r) => (
            <div
              key={r}
              style={{
                background: 'white',
                borderRadius: 8,
                padding: 12,
                border: '1px solid #f3f4f6'
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                {r === 'CEO'
                  ? 'CEO – Stakeholderkommunikation'
                  : r === 'CFO'
                  ? 'CFO – Bankkommunikation'
                  : r === 'OPS'
                  ? 'OPS – Kunden-/Lieferantenkommunikation'
                  : 'HR/Legal – Kommunikation (intern/extern)'}
              </div>
              {commsByRole[r] && commsByRole[r].length ? (
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {commsByRole[r].map((it, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>
                      <strong>Tag {it.day}:</strong> {it.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
                  Keine Einträge.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};





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
  window.addEventListener('admin:settings', onAdmin as any);

  // initialer Sync (falls AdminPanel offen war)
  sync();

  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('admin:settings', onAdmin as any);
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
      console.warn('[MP] getScenarioOverrides failed:', e);
    }
  })();

  const ch = supabase
    .channel(`scenario-overrides-${gameId}`)
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'game_scenario_overrides', filter: `game_id=eq.${gameId}` },
      (payload: any) => {
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
      (payload: any) => {
        if (!active) return;
        const row: any = payload?.new || {};
        const newDay = Number(row?.current_day) || 1;

        if (newDay !== state.day) {
          // Tages-Randoms für newDay sicherstellen
          const meta: any = state.engineMeta || {};
          const daily: Record<number, any> = (meta?.dailyRandomValues || {}) as any;
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

  const apply = (merged: Record<string, any>) => {
    if (disposed) return;
    try {
      // 1) Kompatibilität: localStorage setzen
      localStorage.setItem('scenario:overrides', JSON.stringify(merged));
      // 2) Event wie im SP-Editor feuern
      window.dispatchEvent(new CustomEvent('admin:scenario:import', { detail: merged }));
      console.log('[MP] scenario overrides applied (merged)');
    } catch (e) {
      console.error('[MP] scenario overrides apply failed', e);
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

        {CoachController && (globalThis as any).__featureCoach && (
          <CoachController
            getState={() => state}
            controlsBeforeSelector="[data-coach-controls-anchor]"
            fixedFallback={false}
            multiplayerRole={role}
          />
        )}

        <div data-coach-controls-anchor style={{ display: 'none' }} />
      {/* Multiplayer Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        color: 'white',
        padding: '12px 16px',
        marginBottom: 24,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 18 }}>🎮 Mehrspielermodus</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span title={`Vollständige ID: ${gameId}`}>Spiel: <strong>{gameId.substring(0, 8)}...</strong></span>
            <button
              onClick={handleCopyGameId}
              aria-live="polite"
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.08)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 12
              }}
              title="Spiel-ID in die Zwischenablage kopieren"
            >
              {copiedGameId ? 'Kopiert ✓' : 'Spiel-ID kopieren'}
            </button>
          </div>
          <span>Rolle: <strong>{role}</strong></span>

          {isGM && <span style={{ background: '#f59e0b', padding: '2px 8px', borderRadius: 4 }}>👑 GM</span>}

        
        </div>
        <button
          onClick={onLeave}
          style={{
            padding: '8px 16px',
            background: 'white',
            color: '#6366f1',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Spiel verlassen
        </button>
      </div>

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

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {role === 'CEO' && (
              <button
                onClick={declareInsolvency}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                ⚠️ Insolvenz erklären
              </button>
            )}
            
            <button
              onClick={() => setShowDecisionHistory(true)}
              style={{
                flex: 1,
                padding: '8px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              📊 Entscheidungs-Historie
            </button>
          </div>

          {/* Export and Info Controls */}
          <div style={{ 
            padding: 12,
            background: '#f9fafb',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            marginBottom: 16 
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#374151' }}>
              📋 Protokolle & Informationen
            </h4>
            
            {InfoButtos && <InfoButtos />}
            
            <div style={{ 
              display: 'flex', 
              gap: 8, 
              flexWrap: 'wrap',
              marginBottom: 8 
            }}>
              <ExportReportButtonMP 
                fileName={`Gesamtprotokoll_${role}_Tag${state.day}.pdf`}
                state={state}
                role={role}
              />
              <DebriefButton 
                label="🧭 Debriefing"
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}
              />
            </div>

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

      {/* News Detail Panel with Narratives */}
     {openNewsId && selectedNews && beat && (
  <div className="card" style={{
    margin: '24px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
 }}>
   
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 className="mp-heading" style={{ margin: 0 }}>{selectedNews.title}</h3>
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
                  .filter(r => beat.roleNotes?.[r]?.length)
                  .map(r => (
                    <li key={r}>
                      <strong>{r}:</strong> {beat.roleNotes![r]!.join(' • ')}
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
                  const block = roleBlocks.find(b => b.id === id);
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
              📎 Anlagen: {selectedNews.attachments.join(', ')}
            </div>
          ) : null}
        </div>
      )}

      {/* Decisions Section */}
      <div className="card" style={{
  margin: '24px 12px',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
}}>
  <h3>Entscheidungen - {role}</h3>
        <MultiplayerDecisionList
          blocks={roleBlocks}
          day={state.day}
          role={role}
          currentGameDay={state.day}
          onDecisionMade={handleDecisionMade}
          onOpenAttachment={handleOpenAttachment}
        />
      </div>

      {/* User Notes */}
      <UserNotesField
        notes={state.userNotes || ''}
        onNotesChange={(notes) => dispatch({ type: 'SET_USER_NOTES', notes })}
      />

      {/* Role Communication (per day / per role) */}
     <div className="card" style={{ 
  marginTop: 24,
  margin: '24px 12px',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
}}>
  <h3>Kommunikation – {role === 'CEO' ? 'Stakeholderkommunikation' :
                             role === 'CFO' ? 'Bankkommunikation' :
                             role === 'OPS' ? 'Kunden-/Lieferantenkommunikation' :
                             'Kommunikation (intern/extern)'}</h3>
        <textarea
          value={roleCommsDraft}
          onChange={(e) => setRoleCommsDraft(e.target.value)}
          onBlur={() => saveRoleComms(roleCommsDraft)}
          placeholder={role === 'CEO' ? 'Notizen zur Stakeholderkommunikation...' :
                      role === 'CFO' ? 'Notizen zur Bankkommunikation...' :
                      role === 'OPS' ? 'Notizen zur Kunden-/Lieferantenkommunikation...' :
                      'Notizen zur internen/externen Kommunikation...'}
          rows={4}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
        />
        <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>
          Wird automatisch mit dem Team geteilt und im PDF aufgeführt.
        </div>
      </div>

       
      {/* Modals */}
      {showHistoryKey && MultiplayerService.getRoleKpiVisibility(role).includes(showHistoryKey) && (
        <KpiHistoryModal
          kpiKey={showHistoryKey}
          kpiHistory={state.kpiHistory}
          currentKpi={state.kpi}
          onClose={() => setShowHistoryKey(null)}
        />
      )}

      {showDecisionHistory && (
        <DecisionHistoryViewer
          gameId={gameId}
          role={role}
          currentDay={state.day}
          onClose={() => setShowDecisionHistory(false)}
        />
      )}

      
      {attachmentModalContent && (
        <AttachmentModal
          title={attachmentModalContent.title}
          content={attachmentModalContent.content}
          onClose={() => setAttachmentModalContent(null)}
        />
      )}

      {/* What-If Preview */}
      {whatIfEnabled && (
        <>
          <button 
            className="btn" 
            onClick={runPreview}
            title="Erwartete KPI-Deltas für den nächsten Tag (nur sichtbare KPIs)"
            style={{ 
              position: 'fixed', 
              left: 12, 
              bottom: 12, 
              opacity: 0.95, 
              zIndex: 9998,
              padding: '8px 16px',
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🔮 Vorschau
          </button>

          {preview && (
            <div
              style={{
                position: 'fixed',
                left: 12,
                bottom: 58,
                maxWidth: 320,
                background: 'linear-gradient(135deg, #f3f4f6, #ffffff)',
                color: '#4b5563',
                border: '2px solid #8b5cf6',
                borderRadius: 8,
                padding: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                fontSize: 13,
                zIndex: 9997
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 8, color: '#6366f1' }}>
                📊 Erwartete Δ bis Tag {state.day + 1}
              </div>
              <div style={{ fontSize: 11, marginBottom: 6, color: '#9ca3af' }}>
                Nur sichtbare KPIs • Rolle: {role}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, lineHeight: 1.6 }}>
                {Object.entries(preview.delta).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    cashEUR: '💶 Cash',
                    profitLossEUR: '📈 Gewinn/Verlust',
                    customerLoyalty: '🤝 Kundentreue',
                    bankTrust: '🏦 Bankvertrauen',
                    workforceEngagement: '👥 Engagement',
                    publicPerception: '🌍 Öff. Wahrnehmung'
                  };
                  
                  if (value === undefined || value === null) return null;
                  
                  const formatted = key.includes('EUR') 
                    ? new Intl.NumberFormat('de-DE', { 
                        style: 'currency', 
                        currency: 'EUR', 
                        maximumFractionDigits: 0 
                      }).format(value as number)
                    : `${value >= 0 ? '+' : ''}${Math.round(value as number)}`;
                    
                  return (
                    <li key={key} style={{
                      padding: '4px 0',
                      borderBottom: '1px solid #e5e7eb',
                      color: (value as number) >= 0 ? '#10b981' : '#ef4444',
                      fontWeight: 500
                    }}>
                      {labels[key] || key}: {formatted}
                    </li>
                  );
                })}
              </ul>
              <div style={{ 
                marginTop: 10, 
                padding: 8, 
                background: '#fef3c7',
                borderRadius: 4,
                fontSize: 11,
                color: '#92400e'
              }}>
                ⚠️ Zufallseinflüsse können Abweichungen verursachen
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
                <button 
                  className="btn" 
                  style={{ 
                    fontSize: 12,
                    padding: '4px 12px',
                    background: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: 4,
                    cursor: 'pointer',
                    color: '#374151'
                  }} 
                  onClick={() => setPreview(null)}
                >
                  Schließen
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* VOLLSTÄNDIGES Game Over Screen - Enhanced Ending View */}
      {state.isOver && finalEnding && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          overflowY: 'auto',
          padding: 20
        }}>
          <div className="card" style={{
            maxWidth: 900,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: 32,
            background: 'linear-gradient(135deg, #ffffff, #f8fafc)'
          }}>
            {/* Header with Ending Title */}
            <div style={{
              textAlign: 'center',
              marginBottom: 32,
              padding: 24,
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              borderRadius: 12,
              color: 'white'
            }}>
              <h1 style={{ margin: '0 0 12px 0', fontSize: 32 }}>🎮 Spiel beendet!</h1>
              <h2 style={{ margin: 0, fontSize: 24 }}>{finalEnding.title}</h2>
              <p style={{ margin: '12px 0 0 0', fontSize: 14, opacity: 0.9 }}>
                {finalEnding.summary}
              </p>
            </div>

            {/* Score Overview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginBottom: 32
            }}>
              <div style={{
                padding: 16,
                background: finalEnding.score >= 70 ? '#d1fae5' : finalEnding.score >= 40 ? '#fed7aa' : '#fee2e2',
                borderRadius: 8,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Gesamtscore</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: finalEnding.score >= 70 ? '#10b981' : finalEnding.score >= 40 ? '#f59e0b' : '#ef4444' }}>
                  {finalEnding.score}/100
                </div>
              </div>
              
              <div style={{
                padding: 16,
                background: '#e0e7ff',
                borderRadius: 8,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Deine Rolle</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#6366f1' }}>
                  {role}
                </div>
              </div>

              <div style={{
                padding: 16,
                background: '#fef3c7',
                borderRadius: 8,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Spieltage</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>
                  {state.day} / 14
                </div>
              </div>
            </div>

            {/* Communication Quality Analysis */}
            {kpiEstimates.length > 0 && (
              <div style={{
                marginBottom: 32,
                padding: 20,
                background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                borderRadius: 12,
                border: '1px solid #bae6fd'
              }}>
                <h3 className="mp-heading" style={{ margin: '0 0 16px 0', color: '#0c4a6e' }}>
                  📊 Kommunikationsqualität - Wie genau waren deine KPI-Schätzungen?
                </h3>
                
                {(() => {
                  const avgAccuracy = kpiEstimates.reduce((sum, est) => {
                    const actual = state.kpi[est.kpi];
                    const accuracy = actual ? Math.abs((1 - Math.abs((actual - est.value)) / actual) * 100) : 0;
                    return sum + accuracy;
                  }, 0) / kpiEstimates.length;
                  
                  return (
                    <div style={{
                      padding: 12,
                      background: avgAccuracy > 80 ? '#d1fae5' : avgAccuracy > 60 ? '#fed7aa' : '#fee2e2',
                      borderRadius: 8,
                      marginBottom: 16,
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: 14, color: '#374151' }}>Durchschnittliche Genauigkeit</div>
                      <div style={{ 
                        fontSize: 28, 
                        fontWeight: 700,
                        color: avgAccuracy > 80 ? '#10b981' : avgAccuracy > 60 ? '#f59e0b' : '#ef4444'
                      }}>
                        {avgAccuracy.toFixed(1)}%
                      </div>
                    </div>
                  );
                })()}

                <div style={{ 
                  maxHeight: 250, 
                  overflowY: 'auto',
                  background: 'white',
                  borderRadius: 8,
                  padding: 12
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                        <th style={{ padding: '8px', textAlign: 'left', fontSize: 12, color: '#111827' }}>Tag</th>
                        <th style={{ padding: '8px', textAlign: 'left', fontSize: 12, color: '#111827' }}>KPI</th>
                        <th style={{ padding: '8px', textAlign: 'right', fontSize: 12, color: '#111827' }}>Geschätzt</th>
                        <th style={{ padding: '8px', textAlign: 'right', fontSize: 12, color: '#111827' }}>Tatsächlich</th>
                        <th style={{ padding: '8px', textAlign: 'right', fontSize: 12, color: '#111827' }}>Genauigkeit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kpiEstimates.map((est, idx) => {
                        const actual = state.kpi[est.kpi];
                        const diff = actual - est.value;
                        const accuracy = actual ? Math.abs((1 - Math.abs(diff) / actual) * 100) : 0;
                        
                        return (
                          <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '8px', fontSize: 11, color: '#374151' }}>{est.day}</td>
                            <td style={{ padding: '8px', fontSize: 11, color: '#374151' }}>{est.kpi}</td>
                            <td style={{ padding: '8px', textAlign: 'right', fontSize: 11, color: '#374151' }}>{est.value}</td>
                            <td style={{ padding: '8px', textAlign: 'right', fontSize: 11, color: '#374151' }}>{actual}</td>
                            <td style={{ 
                              padding: '8px', 
                              textAlign: 'right',
                              fontSize: 11,
                              fontWeight: 600,
                              color: accuracy > 80 ? '#10b981' : accuracy > 60 ? '#f59e0b' : '#ef4444'
                            }}>
                              {accuracy.toFixed(0)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Complete KPIs - All Visible */}
            <div style={{
              marginBottom: 32,
              padding: 20,
              background: 'linear-gradient(135deg, #f3f4f6, #ffffff)',
              borderRadius: 12,
              border: '1px solid #d1d5db'
            }}>
              <h3 className="mp-heading" style={{ margin: '0 0 16px 0', color: '#374151' }}>
                🎯 Finale KPIs - Jetzt vollständig sichtbar!
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                {Object.entries(state.kpi).map(([key, value]) => {
                  const visibleKpis = MultiplayerService.getRoleKpiVisibility(role);
                  const wasVisible = visibleKpis.includes(key as keyof KPI);
                  
                  const labels: Record<string, string> = {
                    cashEUR: 'Liquidität',
                    profitLossEUR: 'Gewinn/Verlust',
                    customerLoyalty: 'Kundentreue',
                    bankTrust: 'Bankvertrauen',
                    workforceEngagement: 'Belegschaft',
                    publicPerception: 'Öff. Wahrnehmung'
                  };
                  
                  return (
                    <div key={key} style={{
                      padding: 12,
                      background: wasVisible ? 'white' : 'linear-gradient(135deg, #fef3c7, #fed7aa)',
                      borderRadius: 8,
                      border: wasVisible ? '1px solid #e5e7eb' : '2px solid #f59e0b',
                      position: 'relative'
                    }}>
                      {!wasVisible && (
                        <div style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          background: '#f59e0b',
                          color: 'white',
                          fontSize: 9,
                          padding: '2px 6px',
                          borderRadius: 4,
                          fontWeight: 700
                        }}>
                          NEU
                        </div>
                      )}
                      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>
                        {labels[key] || key}
                      </div>
                      <div style={{ 
                        fontSize: 20, 
                        fontWeight: 700,
                        color: '#111827'
                      }}>
                        {key.includes('EUR') 
                          ? new Intl.NumberFormat('de-DE', { 
                              style: 'currency', 
                              currency: 'EUR',
                              maximumFractionDigits: 0 
                            }).format(value as number)
                          : value
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KPI Development Chart */}
            <div style={{
              marginBottom: 32,
              padding: 20,
              background: 'white',
              borderRadius: 12,
              border: '1px solid #e5e7eb'
            }}>
              <h3 className="mp-heading" style={{ margin: '0 0 16px 0', color: '#374151' }}>
                📈 KPI-Entwicklung über 14 Tage
              </h3>
              
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: 8, textAlign: 'left', position: 'sticky', left: 0, background: '#f9fafb', color: '#111827' }}>Tag</th>
                      <th style={{ padding: 8, textAlign: 'right', color: '#111827' }}>Cash €</th>
                      <th style={{ padding: 8, textAlign: 'right', color: '#111827' }}>G/V €</th>
                      <th style={{ padding: 8, textAlign: 'center', color: '#111827' }}>Kunden</th>
                      <th style={{ padding: 8, textAlign: 'center', color: '#111827' }}>Bank</th>
                      <th style={{ padding: 8, textAlign: 'center', color: '#111827' }}>Team</th>
                      <th style={{ padding: 8, textAlign: 'center', color: '#111827' }}>Öffentl.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...state.kpiHistory, state.kpi].map((kpi, idx) => (
                      <tr key={idx} style={{ 
                        borderBottom: '1px solid #f3f4f6',
                        background: idx === state.kpiHistory.length ? '#f0f9ff' : 'white'
                      }}>
                        <td style={{ 
                          padding: 8, 
                          fontWeight: idx === state.kpiHistory.length ? 700 : 400,
                          position: 'sticky',
                          left: 0,
                          background: idx === state.kpiHistory.length ? '#f0f9ff' : 'white',
                          color: '#374151'
                        }}>
                          {idx + 1} {idx === state.kpiHistory.length && '(Final)'}
                        </td>
                        <td style={{ padding: 8, textAlign: 'right', color: '#374151' }}>
                          {kpi.cashEUR.toLocaleString('de-DE')}
                        </td>
                        <td style={{ padding: 8, textAlign: 'right', color: '#374151' }}>
                          {kpi.profitLossEUR.toLocaleString('de-DE')}
                        </td>
                        <td style={{ padding: 8, textAlign: 'center', color: '#374151' }}>{Math.round(kpi.customerLoyalty)}</td>
                        <td style={{ padding: 8, textAlign: 'center', color: '#374151' }}>{Math.round(kpi.bankTrust)}</td>
                        <td style={{ padding: 8, textAlign: 'center', color: '#374151' }}>{Math.round(kpi.workforceEngagement)}</td>
                        <td style={{ padding: 8, textAlign: 'center', color: '#374151' }}>{Math.round(kpi.publicPerception)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Score Breakdown */}
            <div style={{
              marginBottom: 32,
              padding: 20,
              background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
              borderRadius: 12,
              border: '1px solid #fecaca'
            }}>
              <h3 className="mp-heading" style={{ margin: '0 0 16px 0', color: '#991b1b' }}>
                🏆 Detaillierte Bewertung
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: 14, color: '#7f1d1d' }}>KPI-Punkte</h4>
                  <div className="mp-elevated" style={{ background: 'white', borderRadius: 8, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#374151' }}>
                      <span>Liquidität:</span>
                      <strong>{finalEnding.breakdown.cash} Punkte</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#374151' }}>
                      <span>Gewinn/Verlust:</span>
                      <strong>{finalEnding.breakdown.pl} Punkte</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#374151' }}>
                      <span>Kundentreue:</span>
                      <strong>{finalEnding.breakdown.customers} Punkte</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#374151' }}>
                      <span>Bankvertrauen:</span>
                      <strong>{finalEnding.breakdown.bank} Punkte</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#374151' }}>
                      <span>Belegschaft:</span>
                      <strong>{finalEnding.breakdown.workforce} Punkte</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                      <span>Öffentlichkeit:</span>
                      <strong>{finalEnding.breakdown.publicPerception} Punkte</strong>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: 14, color: '#7f1d1d' }}>Modifikatoren</h4>
                  <div className="mp-elevated" style={{ background: 'white', borderRadius: 8, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#374151' }}>
                      <span>Bonus:</span>
                      <strong style={{ color: '#10b981' }}>+{finalEnding.bonus}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#374151' }}>
                      <span>Malus:</span>
                      <strong style={{ color: '#ef4444' }}>-{finalEnding.malus}</strong>
                    </div>
                    <div style={{ 
                      borderTop: '2px solid #e5e7eb', 
                      paddingTop: 8,
                      marginTop: 8
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#374151' }}>
                        <span><strong>Gesamt:</strong></span>
                        <strong style={{ fontSize: 18, color: '#111827' }}>{finalEnding.score}/100</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role-specific Performance */}
            <div style={{
              marginBottom: 32,
              padding: 20,
              background: 'linear-gradient(135deg, #e0f2fe, #dbeafe)',
              borderRadius: 12,
              border: '1px solid #bae6fd'
            }}>
              <h3 className="mp-heading" style={{ margin: '0 0 16px 0', color: '#075985' }}>
                👤 Deine Rollenleistung als {role}
              </h3>
              
              <div className="mp-elevated" style={{ background: 'white', borderRadius: 8, padding: 16 }}>
                <p style={{ margin: '0 0 12px 0', color: '#374151' }}>
                  Als <strong>{role}</strong> warst du verantwortlich für:
                </p>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#6b7280' }}>
                  {role === 'CEO' && (
                    <>
                      <li>Strategische Führung und Gesamtverantwortung</li>
                      <li>Stakeholder-Kommunikation</li>
                      <li>Krisenmanagement und Insolvenzentscheidungen</li>
                    </>
                  )}
                  {role === 'CFO' && (
                    <>
                      <li>Finanzmanagement und Liquiditätssteuerung</li>
                      <li>Bankbeziehungen und Kreditverhandlungen</li>
                      <li>Kostenoptimierung</li>
                    </>
                  )}
                  {role === 'OPS' && (
                    <>
                      <li>Operative Exzellenz und Prozessoptimierung</li>
                      <li>Kundenbeziehungen und Lieferantenmanagement</li>
                      <li>Qualitätssicherung</li>
                    </>
                  )}
                  {role === 'HRLEGAL' && (
                    <>
                      <li>Personalmanagement und Mitarbeitermotivation</li>
                      <li>Rechtliche Compliance</li>
                      <li>Interne Kommunikation</li>
                    </>
                  )}
                </ul>
                
                <div style={{ 
                  marginTop: 16,
                  padding: 12,
                  background: '#f0f9ff',
                  borderRadius: 6,
                  border: '1px solid #bae6fd'
                }}>
                  <div style={{ fontSize: 12, color: '#0c4a6e', marginBottom: 4 }}>
                    Entscheidungen getroffen:
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#0284c7' }}>
                    {state.log.filter(e => e.role === role && e.chosenOptionId).length}
                  </div>
                </div>
              </div>
            </div>


            {/* Communications (MP) */}
            <div style={{
              marginBottom: 32,
              padding: 20,
              background: 'linear-gradient(135deg, #fff7ed, #fffbeb)',
              borderRadius: 12,
              border: '1px solid #fcd34d'
            }}>
              <h3 className="mp-heading" style={{ margin: '0 0 12px 0', color: '#92400e' }}>🗣️ Kommunikationsnotizen (Team)</h3>
              {loadingComms ? (
                <div style={{ color: '#6b7280' }}>Lade Kommunikationsnotizen…</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                  {(['CEO','CFO','OPS','HRLEGAL'] as RoleId[]).map(r => (
                    <div key={r} style={{ background: 'white', borderRadius: 8, padding: 12, border: '1px solid #f3f4f6' }}>
                      <div style={{ fontWeight: 700, marginBottom: 8 }}>
                        {r === 'CEO' ? 'CEO – Stakeholderkommunikation' :
                         r === 'CFO' ? 'CFO – Bankkommunikation' :
                         r === 'OPS' ? 'OPS – Kunden-/Lieferantenkommunikation' :
                         'HR/Legal – Kommunikation (intern/extern)'}
                      </div>
                      {(commsByRole[r] && commsByRole[r].length) ? (
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                          {commsByRole[r].map((it, idx) => (
                            <li key={idx} style={{ marginBottom: 6 }}>
                              <strong>Tag {it.day}:</strong> {it.text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div style={{ color: '#6b7280', fontStyle: 'italic' }}>Keine Einträge.</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: 16, 
              justifyContent: 'center',
              paddingTop: 20,
              borderTop: '2px solid #e5e7eb'
            }}>
              <button
                onClick={() => {
                  // Export final report
                  const exportBtn = document.querySelector('[title*="Gesamtprotokoll"]') as HTMLButtonElement;
                  if (exportBtn) exportBtn.click();
                }}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                📄 Abschlussbericht exportieren
              </button>
              
              <button
                onClick={onLeave}
                style={{
                  padding: '12px 24px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                Zurück zur Lobby
              </button>
            </div>
          </div>
        </div>
      )}
       {/* Game Chat System */}
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
/** Error Boundary für Trainer-Dashboard */
class TrainerErrorBoundary extends React.Component<
  { children: React.ReactNode; onLeave: () => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[TrainerErrorBoundary] Fehler im Trainer-Dashboard:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 40,
          textAlign: 'center',
          background: '#fef2f2',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: 600,
            background: 'white',
            padding: 32,
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ margin: '0 0 12px', color: '#991b1b' }}>
              Fehler im Trainer-Dashboard
            </h2>
            <p style={{ margin: '0 0 24px', color: '#6b7280' }}>
              {this.state.error?.message || 'Ein unerwarteter Fehler ist aufgetreten.'}
            </p>
            <button
              onClick={this.props.onLeave}
              style={{
                padding: '12px 24px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 16
              }}
            >
              Zurück zur Anmeldung
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/** Wrapper ohne Hooks: trennt Trainer-Ansicht (verhindert Hook-Reihenfolgewechsel) */
export default function MultiplayerGameView(props: MultiplayerGameViewProps) {
  if (props.role === 'TRAINER') {
    return (
      <TrainerErrorBoundary onLeave={props.onLeave}>
        <React.Suspense fallback={
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8fafc'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
              <div style={{ fontSize: 18, color: '#6b7280' }}>Lade Trainer-Dashboard...</div>
            </div>
          </div>
        }>
          <TrainerDashboard gameId={props.gameId} onLeave={props.onLeave} />
        </React.Suspense>
      </TrainerErrorBoundary>
    );
  }
  return <MultiplayerGameViewInner {...props} />;
}
