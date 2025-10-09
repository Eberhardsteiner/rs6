// src/components/multiplayer/TrainerDashboard.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/services/supabaseClient';
import type { KPI, RoleId, DecisionBlock, DayNewsItem } from '@/core/models/domain';

// --- PDF-Export (pdfmake inkl. Fonts) ---
import pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
// vfs initialisieren (verschiedene Bundler-Varianten absichern)
(pdfMake as any).vfs =
  (pdfFonts as any).default?.pdfMake?.vfs ||
  (pdfFonts as any).pdfMake?.vfs ||
  (pdfFonts as any).vfs;

/** NEU: Modal + Inhalte für Attachments (aus Data/ZIP) */
import AttachmentModal from '@/components/dialogs/AttachmentModal';
import { attachmentContents } from '@/data/attachmentContents';


// --- Szenario/Zufallswerte ---
import { generateDailyRandomValues } from '@/core/engine/gameEngine';
import { makeRng } from '@/core/utils/prng';
import { generateRandomNewsForDay } from '@/core/engine/randomNews';

// Szenario-Daten für 14 Tage
import { day1Blocks, day1News }   from '@/data/scenario_day_01';
import { day2Blocks, day2News }   from '@/data/scenario_day_02';
import { day3Blocks, day3News }   from '@/data/scenario_day_03';
import { day4Blocks, day4News }   from '@/data/scenario_day_04';
import { day5Blocks, day5News }   from '@/data/scenario_day_05';
import { day6Blocks, day6News }   from '@/data/scenario_day_06';
import { day7Blocks, day7News }   from '@/data/scenario_day_07';
import { day8Blocks, day8News }   from '@/data/scenario_day_08';
import { day9Blocks, day9News }   from '@/data/scenario_day_09';
import { day10Blocks, day10News } from '@/data/scenario_day_10';
import { day11Blocks, day11News } from '@/data/scenario_day_11';
import { day12Blocks, day12News } from '@/data/scenario_day_12';
import { day13Blocks, day13News } from '@/data/scenario_day_13';
import { day14Blocks, day14News } from '@/data/scenario_day_14';

interface Decision {
  id: string;
  game_id: string;
  player_id: string;
  day: number;
  block_id: string;
  option_id: string | null;
  custom_text: string | null;
  kpi_delta: any;
  created_at: string;
  player?: { name: string; role: RoleId };
}

const ROLES: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];

// Tag->Daten Mappings
const blocksByDay: Record<number, DecisionBlock[]> = {
   1: day1Blocks as any,  2: day2Blocks as any,  3: day3Blocks as any,  4: day4Blocks as any,
   5: day5Blocks as any,  6: day6Blocks as any,  7: day7Blocks as any,  8: day8Blocks as any,
   9: day9Blocks as any, 10: day10Blocks as any, 11: day11Blocks as any, 12: day12Blocks as any,
  13: day13Blocks as any,14: day14Blocks as any
};
const newsByDay: Record<number, DayNewsItem[]> = {
   1: day1News as any,  2: day2News as any,  3: day3News as any,  4: day4News as any,
   5: day5News as any,  6: day6News as any,  7: day7News as any,  8: day8News as any,
   9: day9News as any, 10: day10News as any, 11: day11News as any, 12: day12News as any,
  13: day13News as any,14: day14News as any
};

// Optional: Szenario-Overrides (wie im MP-View)
function readScenarioOverride(kind: 'blocks' | 'news' | 'attachments', day: number): any[] | null {
  try {
    const g: any = globalThis as any;
    const byDay = g?.__scenarioOverrides?.[kind];
    if (byDay && Array.isArray(byDay[day])) return byDay[day];
    const raw = localStorage.getItem('scenario:overrides');
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (o && o[kind] && Array.isArray(o[kind][day])) return o[kind][day];
  } catch {}
  return null;
}

// KPI-Impact je Rolle (für „Punktstände“)
// Robust: nutzt Spieler‑Rolle ODER – falls noch nicht vorhanden – die Block‑Rolle
function aggregateImpactByRole(
  list: Decision[],
  blockRoleById?: Map<string, RoleId>
) {
  const acc: Record<
    RoleId,
    {
      cashEUR: number; profitLossEUR: number;
      customerLoyalty: number; bankTrust: number; workforceEngagement: number; publicPerception: number;
    }
  > = {
    CEO: { cashEUR: 0, profitLossEUR: 0, customerLoyalty: 0, bankTrust: 0, workforceEngagement: 0, publicPerception: 0 },
    CFO: { cashEUR: 0, profitLossEUR: 0, customerLoyalty: 0, bankTrust: 0, workforceEngagement: 0, publicPerception: 0 },
    OPS: { cashEUR: 0, profitLossEUR: 0, customerLoyalty: 0, bankTrust: 0, workforceEngagement: 0, publicPerception: 0 },
    HRLEGAL: { cashEUR: 0, profitLossEUR: 0, customerLoyalty: 0, bankTrust: 0, workforceEngagement: 0, publicPerception: 0 }
  };

  for (const d of list) {
    // 1) Primär: Spieler‑Rolle aus der Entscheidung (falls schon bekannt)
    let r = (d.player?.role as RoleId | undefined);

    // 2) Fallback: Rolle aus dem Block (sofort live zählbar, ohne Join)
    if (!r && blockRoleById) {
      const cand = blockRoleById.get(String(d.block_id)) as RoleId | undefined;
      if (cand) r = cand;
    }

    if (!r || !acc[r] || !d.kpi_delta) continue;

    const k = d.kpi_delta as any;
    acc[r].cashEUR             += Number(k?.cashEUR ?? 0) || 0;
    acc[r].profitLossEUR       += Number(k?.profitLossEUR ?? 0) || 0;
    acc[r].customerLoyalty     += Number(k?.customerLoyalty ?? 0) || 0;
    acc[r].bankTrust           += Number(k?.bankTrust ?? 0) || 0;
    acc[r].workforceEngagement += Number(k?.workforceEngagement ?? 0) || 0;
    acc[r].publicPerception    += Number(k?.publicPerception ?? 0) || 0;
  }

  // Gewichte aus AdminPanel (Standard 25/25/25/25)
  const W = (globalThis as any).__scoringWeights || {
    bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25
  };

  const withPoints = Object.fromEntries(
    ROLES.map(r => {
      const x = acc[r];
      const points = Math.round(
        (x.customerLoyalty     * (W.customerLoyalty     || 0)) +
        (x.bankTrust           * (W.bankTrust           || 0)) +
        (x.workforceEngagement * (W.workforceEngagement || 0)) +
        (x.publicPerception    * (W.publicPerception    || 0))
      );
      return [r, { ...x, points }];
    })
  ) as Record<RoleId, any>;

  return withPoints;
}


/* ──────────────────────────────────────────────────────────────────────────
   Hilfsfunktionen: Optionen & KPI-Delta robust aus Szenario-Blöcken lesen
   (tolerant ggü. verschiedenen Feldnamen; fällt elegant auf JSON zurück)
   ────────────────────────────────────────────────────────────────────────── */
const OPTION_KEYS = ['options','choices','alternatives','answers','actions','variants','opts'];

function getBlockId(b: any): string {
  return (b?.id ?? b?.key ?? b?.slug ?? b?.code ?? b?.title ?? '—') as string;
}
function getBlockRole(b: any): string {
  return (b?.role ?? b?.assignee ?? b?.owner ?? '—') as string;
}
// ── EINMALIG: Map-Utilities (nicht doppelt definieren) ─────────────────────
function mapIntensity(factor: number): 'low'|'normal'|'high' {
  const f = Number(factor || 1);
  if (f <= 0.75) return 'low';
  if (f >= 1.25) return 'high';
  return 'normal';
}
function mapSeverityForUi(s: 'low'|'mid'|'high'): 'low'|'medium'|'high' {
  return s === 'mid' ? 'medium' : s;
}
function rolesLabel(rs?: string[] | null): string {
  if (!rs || rs.length === 0) return 'alle';
  return rs.join('/');
}

// Bestätigungs-Indikatoren: CFO, HRLEGAL, OPS -> grüne Lampe wenn bestätigt
const DECISION_CONFIRM_KEYS = [
  'DECISION_DONE','CONFIRM_DECISIONS','DECISIONS_SUBMIT','DAY_DONE','END_TURN','DECISION_MADE'
];

function DecisionStatusBar({ decisionsToday, players }: { decisionsToday: Array<any>; players: Array<any> }) {
  type R = 'CEO'|'CFO'|'HRLEGAL'|'OPS';
  type PlayerStatus = 'left' | 'present' | 'lobby' | 'decided';

  const getPlayerStatus = (role: R): PlayerStatus => {
    try {
      const player = (players || []).find((p: any) =>
        (p?.role || '').toUpperCase() === role
      );

      if (!player) return 'left';

      const hasDecided = (decisionsToday || []).some(d => {
        if ((d?.player?.role || '').toUpperCase() !== role) return false;
        const blk = (d?.block_id || '').toString().toUpperCase();
        const metaType = (d?.decision_metadata?.type || d?.metadata?.type || '').toString().toLowerCase();
        return DECISION_CONFIRM_KEYS.some(k => blk.includes(k)) ||
               ['decision_confirmed','decisions_submit','done','confirm'].includes(metaType);
      });

      if (hasDecided) return 'decided';

      const lastSeen = player?.last_seen;
      if (!lastSeen) return 'lobby';

      const lastSeenMs = new Date(lastSeen).getTime();
      const nowMs = Date.now();
      const inactiveMs = nowMs - lastSeenMs;
      const INACTIVE_THRESHOLD = 5 * 60 * 1000;

      if (inactiveMs > INACTIVE_THRESHOLD) return 'left';

      const isReady = player?.is_ready;
      if (isReady === false) return 'lobby';

      return 'present';
    } catch (err) {
      console.error(`[DecisionStatusBar] Error getting status for ${role}:`, err);
      return 'left';
    }
  };

  const Lamp = ({status, label}: {status: PlayerStatus; label: string}) => {
    const getConfig = (s: PlayerStatus) => {
      switch (s) {
        case 'decided':
          return {
            color: '#10b981',
            bg: 'rgba(16,185,129,0.2)',
            shadow: '0 0 8px #10b981',
            title: `${label}: Entscheidung bestätigt`,
            animate: false
          };
        case 'present':
          return {
            color: '#f59e0b',
            bg: 'rgba(245,158,11,0.2)',
            shadow: '0 0 6px rgba(245,158,11,0.5)',
            title: `${label}: Anwesend`,
            animate: false
          };
        case 'lobby':
          return {
            color: '#f59e0b',
            bg: 'rgba(245,158,11,0.15)',
            shadow: 'none',
            title: `${label}: In der Lobby`,
            animate: true
          };
        case 'left':
        default:
          return {
            color: '#ef4444',
            bg: 'rgba(239,68,68,0.15)',
            shadow: 'none',
            title: `${label}: Spiel verlassen/inaktiv`,
            animate: false
          };
      }
    };

    const config = getConfig(status);

    return (
      <span
        title={config.title}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 8px',
          borderRadius: 999, border: '1px solid rgba(255,255,255,0.35)',
          background: config.bg
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: config.color,
            boxShadow: config.shadow,
            animation: config.animate ? 'pulse-orange 2s ease-in-out infinite' : 'none'
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 700 }}>{label}</span>
        <style>{`
          @keyframes pulse-orange {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.85); }
          }
        `}</style>
      </span>
    );
  };

  return (
    <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Lamp status={getPlayerStatus('CEO')} label="CEO" />
      <Lamp status={getPlayerStatus('CFO')} label="CFO" />
      <Lamp status={getPlayerStatus('OPS')} label="OPS" />
      <Lamp status={getPlayerStatus('HRLEGAL')} label="HRLEGAL" />
    </div>
  );
}


// ── Timer/Deadline lesen (tolerant ggü. Quellen) ────────────────────────────


// ── FIX: formatDuration korrekt schließen ───────────────────────────────────
function formatDuration(ms: number): string {
  const neg = ms < 0;
  const s = Math.max(0, Math.floor(Math.abs(ms) / 1000));
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return (neg ? '-' : '') + `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

// ── Anhänge-Utilities (einmalig definieren) ─────────────────────────────────
type Attachment = {
  id?: string;
  title: string;
  url: string;
  type?: string | null;
  size?: number | null;
  from?: string | null;
};
const ATTACHMENT_KEYS = ['attachments','files','documents','links','assets','annex','appendix'];

function normalizeAttachment(a: any, idx: number): Attachment | null {
  // NEU: String-Schlüssel (z. B. "D01_INVESTOR_MAIL") -> aus attachmentContents lesen
  if (typeof a === 'string') {
    const key = a.trim();
    const meta: any = (attachmentContents as any)?.[key] || {};
    return {
      id: key,
      title: (meta.title || key) as string,
      url: `inline:${key}`,                  // Kennzeichnung: Inhalt kommt aus attachmentContents
      type: (meta.type || null) as any,
      size: (typeof meta.size === 'number' ? meta.size : null),
      from: 'dataset'
    };
  }

  // Klassische Objektform mit URL
  const url = a?.url ?? a?.href ?? a?.link ?? a?.src ?? a?.path;
  if (typeof url !== 'string') return null;
  const title = a?.title ?? a?.name ?? a?.label ?? a?.filename ?? a?.fileName ?? (url.split('/').pop() || `Attachment ${idx + 1}`);
  const type  = a?.type ?? a?.mime ?? a?.mimetype ?? (url.match(/\.([a-z0-9]+)(?:[\?#]|$)/i)?.[1] || null);
  const size  = typeof a?.size === 'number' ? a.size : null;
  return {
    id: (a?.id ?? a?.key ?? a?.code ?? `att-${idx}`) + '',
    title: String(title),
    url: String(url),
    type,
    size
  };
}

function extractAttachmentsFromAny(obj: any): Attachment[] {
  if (!obj || typeof obj !== 'object') return [];
  for (const k of ATTACHMENT_KEYS) {
    const arr = obj?.[k];
    if (Array.isArray(arr)) return arr.map((v: any, i: number) => normalizeAttachment(v, i)).filter(Boolean) as Attachment[];
  }
  const single = obj?.attachment || obj?.file || obj?.document || obj?.link;
  if (single) { const out = normalizeAttachment(single, 0); return out ? [out] : []; }
  return [];
}
function dedupeAttachments(list: Attachment[]): Attachment[] {
  const seen = new Set<string>(); const out: Attachment[] = [];
  for (const a of list) { const key = `${a.url}|${a.title || ''}`; if (!seen.has(key)) { seen.add(key); out.push(a); } }
  return out;
}
function guessExt(url?: string): string {
  if (!url) return ''; const m = /\.([a-z0-9]+)(?:[\?#]|$)/i.exec(url); return m ? m[1] : '';
}
function formatBytes(n?: number | null): string {
  if (!n || n <= 0) return ''; const units = ['B','KB','MB','GB','TB']; let i = 0, v = n;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

/** Hilfsfunktion: inline:KEY -> KEY */
function stripInline(u?: string | null) {
  if (!u) return '';
  return u.startsWith('inline:') ? u.slice('inline:'.length) : u;
}


// ── Timer/Deadline lesen (tolerant ggü. Quellen) ─────────────
function readDayStartTs(day: number): number | null {
  try {
    const g: any = globalThis as any;
    const keysIso = ['__dayStart', '__currentDayStart', '__mpDayStart', '__gameDayStart', '__roundStartIso'];
    for (const k of keysIso) { const v = g?.[k]; if (typeof v === 'string') { const t = +new Date(v); if (!isNaN(t)) return t; } }
    const keysNum = ['__dayStartTs', '__startTs'];
    for (const k of keysNum) { const v = g?.[k]; if (typeof v === 'number' && isFinite(v)) return v; }
    const raw = localStorage.getItem('mp:dayStartIso') || localStorage.getItem('mp:day_start');
    if (raw) { const t = +new Date(raw); if (!isNaN(t)) return t; }
  } catch {}
  return null;
}

function readDayDeadlineTs(day: number): number | null {
  try {
    const g: any = globalThis as any;
    const keysIso = ['__dayDeadline', '__currentDayDeadline', '__mpDayEndsAt', '__dayEndsAt', '__roundDeadlineIso'];
    for (const k of keysIso) { const v = g?.[k]; if (typeof v === 'string') { const t = +new Date(v); if (!isNaN(t)) return t; } }
    const keysNum = ['__deadlineTs', '__dayDeadlineTs', '__roundDeadlineTs'];
    for (const k of keysNum) { const v = g?.[k]; if (typeof v === 'number' && isFinite(v)) return v; }
    // aus Start + Dauer rekonstruieren
    const start = readDayStartTs(day);
    const durMin = g?.__dayDurationMin ?? g?.__multiplayerSettings?.dayDurationMin ?? g?.__multiplayerSettings?.roundMinutes ?? null;
    if (start && typeof durMin === 'number' && isFinite(durMin)) return start + durMin * 60 * 1000;
    const raw = localStorage.getItem('mp:deadlineIso') || localStorage.getItem('mp:dayDeadline') || localStorage.getItem('mp_day_deadline');
      if (raw) { const t = +new Date(raw); if (!isNaN(t)) return t; }
  } catch {}
  return null;
}



function getBlockOptions(b: any): any[] {
  for (const k of OPTION_KEYS) {
    if (Array.isArray(b?.[k])) return b[k] as any[];
  }
  return [];
}
function getOptionId(o: any, idx: number): string {
  return (o?.id ?? o?.option_id ?? o?.key ?? o?.value ?? o?.code ?? String(idx + 1)) + '';
}
function getOptionTitle(o: any, fallbackId: string): string {
  return (o?.title ?? o?.label ?? o?.text ?? o?.name ?? `Option ${fallbackId}`) + '';
}
function getOptionDescription(o: any): string {
  return (o?.description ?? o?.desc ?? o?.subtitle ?? '') + '';
}
function getOptionKpi(o: any): any {
  return (o?.kpi ?? o?.kpi_delta ?? o?.kpiDelta ?? o?.impact ?? null);
}
function formatKpiShort(k: any): string {
  if (!k || typeof k !== 'object') return '—';
  const n = (x: any) => (x == null ? 0 : Number(x));
  const parts = [
    `Cash ${Math.round(n(k.cashEUR))}€`,
    `P&L ${Math.round(n(k.profitLossEUR))}€`,
    `Kunden ${Math.round(n(k.customerLoyalty))}`,
    `Bank ${Math.round(n(k.bankTrust))}`,
    `Workforce ${Math.round(n(k.workforceEngagement))}`,
    `Öffentl. ${Math.round(n(k.publicPerception))}`
  ];

 
  


  
  // Prüfen, ob alles 0 ist -> dann auf JSON zurückfallen
  const allZero = parts.every(p => / 0(€)?$/.test(p));
  return allZero ? JSON.stringify(k) : parts.join(' · ');
}




export default function TrainerDashboard({
  gameId,
  onLeave
}: {
  gameId: string;
  onLeave: () => void;
}) {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [gameKpis, setGameKpis] = useState<KPI | null>(null);
  const [error, setError] = useState<string>('');
  const [hintDrafts, setHintDrafts] = useState<Record<string, string>>({});
  const [isLoadingKpis, setIsLoadingKpis] = useState(true);

    // --- Broadcast/Anzeige-Daten ---
  const [broadcastAll, setBroadcastAll] = useState('');
  const [newsForDay, setNewsForDay] = useState<DayNewsItem[]>([]);
  const [randomNewsForDay, setRandomNewsForDay] = useState<DayNewsItem[]>([]);
  const playedTitlesRef = React.useRef<string[]>([]); // Duplikatvermeidung über Tage

  // Rollensicht für Zufalls-News (Trainer) – identisch zur Spielersicht
  const [selectedRole, setSelectedRole] = useState<RoleId | 'ALL'>('ALL');

  // --- Live-Update Hilfen für decisions (bulletproof) ---
  // Wir halten die jeweils aktuellen Spieler (Name/Role) referenzierbar,
  // damit neue Entscheidungen direkt mit Metadaten angezeigt werden können.
  const playersRef = React.useRef<any[]>([]);
  useEffect(() => { playersRef.current = Array.isArray(players) ? players : []; }, [players]);

  // Entscheidung in den lokalen State einpflegen/aktualisieren (defensiv)
  const upsertDecisionInState = useCallback((row: any) => {
    if (!row || !row.id) return; // ungültiger Payload -> ignorieren
    setDecisions((prev) => {
      const idx = prev.findIndex(d => d.id === row.id);
      const p = playersRef.current.find((pp: any) => pp?.id === row.player_id);
      const playerMeta = p ? { name: p.name || p.display_name || '', role: p.role } : undefined;
      const normalized: Decision = { ...row, player: playerMeta };

      if (idx === -1) return [normalized, ...prev];
      const next = prev.slice();
      next[idx] = { ...prev[idx], ...normalized };
      return next;
    });
  }, []);

  // Entscheidung aus dem lokalen State entfernen (für DELETE)
  const removeDecisionFromState = useCallback((id: string) => {
    if (!id) return;
    setDecisions((prev) => prev.filter(d => d.id !== id));
  }, []);


  
  // Abgeleitete Liste entsprechend ausgewählter Rolle (robust: Rollenfeld optional)
  const randomNewsForRole = useMemo(() => {
    const list = Array.isArray(randomNewsForDay) ? randomNewsForDay : [];
    if (selectedRole === 'ALL') return list;
    return list.filter((n: any) => {
      const rs = Array.isArray((n as any)?.roles) ? (n as any).roles as string[] : null;
      return !rs || rs.includes(selectedRole);
    });
  }, [randomNewsForDay, selectedRole]);



  const [blocksForDay, setBlocksForDay] = useState<DecisionBlock[]>([]);
  const [dailyRandoms, setDailyRandoms] = useState<{
    cashEUR?: number;
    profitLossEUR?: number;
    customerLoyalty?: number;
    bankTrust?: number;
    workforceEngagement?: number;
    publicPerception?: number;
  } | null>(null);

  // Lookup: Block-ID -> Rolle (für sofortiges, join-freies Scoring)
  const blockRoleById = useMemo(() => {
    const m = new Map<string, RoleId>();
    for (const b of (blocksForDay || [])) {
      const bid = String(getBlockId(b as any));
      const r   = String(getBlockRole(b as any)).toUpperCase() as RoleId;
      if (bid) m.set(bid, r);
    }
    return m;
  }, [blocksForDay]);



  
const [attachmentsForDay, setAttachmentsForDay] = useState<Attachment[]>([]);
  const [deadlineTs, setDeadlineTs] = useState<number | null>(null);
  const [startTs, setStartTs] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState<number>(Date.now());
  const [gameSeed, setGameSeed] = useState<number | null>(null);

  /** NEU: Attachment-Modal (zeigt Inhalte aus attachmentContents) */
  const [showAttachment, setShowAttachment] = useState<string | null>(null);


  
  // -- Kopier-Status für Game-ID
const [copiedId, setCopiedId] = useState(false);
const copyGameId = useCallback(async () => {
  try {
    await navigator.clipboard.writeText(gameId);
    setCopiedId(true);
    window.setTimeout(() => setCopiedId(false), 1200);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = gameId;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    setCopiedId(true); window.setTimeout(() => setCopiedId(false), 1200);
  }
}, [gameId]);


  // Abgeleitete Sichten
  const decisionsToday = useMemo(
    () => decisions.filter(d => d.day === currentDay),
    [decisions, currentDay]
  );

  const decisionsByBlockToday = useMemo(() => {
    const m = new Map<string, Decision[]>();
    for (const d of decisionsToday) {
      const arr = m.get(d.block_id) || [];
      arr.push(d);
      m.set(d.block_id, arr);
    }
    return m;
  }, [decisionsToday]);

  const isDayComplete = useMemo(() => {
    if (!blocksForDay || blocksForDay.length === 0) return false;
    // Ein Tag gilt hier als „abgeschlossen“, wenn für jeden Block mind. eine Entscheidung vorliegt
    return blocksForDay.every(b => decisionsByBlockToday.has(getBlockId(b as any)));
  }, [blocksForDay, decisionsByBlockToday]);

  // „Verlassen/Abmelden": Supabase-Session beenden + Bypass/Flags löschen + Auth-Token löschen
  const handleLeave = useCallback(async () => {
    try { await supabase.auth.signOut(); } catch {}
    ['mp_trainer_mode', 'mp_trainer_game_id', 'mp_current_role', 'mp_current_game', 'mp_player_id']
      .forEach(k => { try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch {} });

    // WICHTIG: Auth-Token aus sessionStorage entfernen
    try { sessionStorage.removeItem('mp_trainer_auth_token'); } catch {}

    try { onLeave(); } catch {}
    try { window.location.href = '/?multiplayer=0'; } catch {}
  }, [onLeave]);

  // Daten laden
  const loadAllData = useCallback(async () => {
    try {
      setError('');
      setIsLoadingKpis(true);

           // Spieler laden (Trainer ausblenden) – display_name statt name
      const { data: playersData, error: pErr } = await supabase
        .from('players')
        .select('id, display_name, role')
        .eq('game_id', gameId);
      if (pErr) throw pErr;

      // Normalisieren: in der UI wird player.name erwartet
      const normalizedPlayers = (playersData || [])
        .filter((p: any) => p.role !== 'TRAINER')
        .map((p: any) => ({ ...p, name: p.display_name || p.name || '' }));

      setPlayers(normalizedPlayers);


      // Entscheidungen mit eingebetteter Spielerinfo
      let decisionsData: any[] = [];
      try {
               const res = await supabase
          .from('decisions')
          .select('*, players(display_name, role)')
          .eq('game_id', gameId)
          .order('created_at', { ascending: false });
        if (res.error) throw res.error;

        decisionsData = (res.data || []).map((d: any) => {
          const pl = d.players || d.player || null;
          return {
            ...d,
            player: pl ? { name: pl.display_name || pl.name || '', role: pl.role } : null
          };
        });

      } catch {
        // Fallback ohne Join
                const { data: d2, error: e2 } = await supabase
          .from('decisions')
          .select('*')
          .eq('game_id', gameId)
          .order('created_at', { ascending: false });
        if (e2) throw e2;

        // Map mit normalisiertem Namen
        const map = new Map<string, any>();
        (playersData || []).forEach((p: any) => {
          map.set(p.id, { name: p.display_name || p.name || '', role: p.role });
        });

        decisionsData = (d2 || []).map((d) => ({ ...d, player: map.get(d.player_id) || null }));

      }
      setDecisions(decisionsData as any);

      // Spielstand
      const { data: gameData, error: gErr } = await supabase
        .from('games')
        .select('current_day, kpi_values')
        .eq('id', gameId)
        .single();
      if (gErr) throw gErr;

      console.log('[TrainerDashboard] Geladene Spielstanddaten:', gameData);

      const kpiValues = (gameData as any)?.kpi_values;
      console.log('[TrainerDashboard] KPI-Werte aus DB:', kpiValues);

      setCurrentDay((gameData as any)?.current_day || 1);

      // NEU: Seed und Einstellungen aus game_admin_settings laden
      const { data: settingsData, error: settingsErr } = await supabase
        .from('game_admin_settings')
        .select('seed, settings, features')
        .eq('game_id', gameId)
        .single();

      if (!settingsErr && settingsData) {
        const seed = settingsData.seed;
        setGameSeed(seed);
        console.log('[TrainerDashboard] Geladener Seed aus DB:', seed);

        // Globale Variablen synchronisieren (wie im MultiplayerGameView)
        (globalThis as any).__gameSeed = seed;

        // Shared played titles aus globalThis übernehmen (falls vorhanden)
        if ((globalThis as any).__playedNewsTitles && Array.isArray((globalThis as any).__playedNewsTitles)) {
          playedTitlesRef.current = [...(globalThis as any).__playedNewsTitles];
        }
      } else {
        console.warn('[TrainerDashboard] Keine game_admin_settings gefunden oder Fehler:', settingsErr);
      }

      // Validierung und Initialisierung der KPI-Werte
      if (!kpiValues || typeof kpiValues !== 'object' || Object.keys(kpiValues).length === 0) {
        console.warn('[TrainerDashboard] Keine oder ungültige KPI-Werte gefunden. Initialisiere mit Standardwerten...');

        // Versuche, die KPI-Werte in der Datenbank zu initialisieren
        const initialKpis = {
          cashEUR: 100000,
          profitLossEUR: 0,
          customerLoyalty: 50,
          bankTrust: 50,
          workforceEngagement: 50,
          publicPerception: 50
        };

        try {
          const { error: updateErr } = await supabase
            .from('games')
            .update({ kpi_values: initialKpis })
            .eq('id', gameId);

          if (updateErr) {
            console.error('[TrainerDashboard] KPI-Update fehlgeschlagen:', updateErr);
          } else {
            console.log('[TrainerDashboard] KPI-Werte erfolgreich initialisiert');
            setGameKpis(initialKpis as KPI);
            setIsLoadingKpis(false);
            return;
          }
        } catch (updateError) {
          console.error('[TrainerDashboard] Fehler beim KPI-Update:', updateError);
        }

        setGameKpis(null);
      } else {
        setGameKpis(kpiValues as KPI);
      }

      setIsLoadingKpis(false);
    } catch (e: any) {
      console.error('[TrainerDashboard] Fehler beim Laden der Daten:', e);
      setError(e?.message || 'Zugriff verweigert (RLS?)');
      setIsLoadingKpis(false);
    }
  }, [gameId]);

   // Live-Subscription (robust & ereignisspezifisch)
  useEffect(() => {
    // Initial laden
    loadAllData();

    const channel = supabase.channel(`trainer-${gameId}`);

    // decisions: schnelle, inkrementelle Aktualisierung ohne Voll-Reload
    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'decisions', filter: `game_id=eq.${gameId}` },
        (payload: any) => {
          try {
            if (payload?.new) upsertDecisionInState(payload.new);
          } catch {
            // Fallback (fehlerfrei): kompletter Reload
            loadAllData();
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'decisions', filter: `game_id=eq.${gameId}` },
        (payload: any) => {
          try {
            if (payload?.new) upsertDecisionInState(payload.new);
          } catch {
            loadAllData();
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'decisions', filter: `game_id=eq.${gameId}` },
        (payload: any) => {
          try {
            const id = payload?.old?.id as string | undefined;
            if (id) removeDecisionFromState(id);
          } catch {
            loadAllData();
          }
        }
      );

    // games/players: Voll-Reload (beeinflussen mehrere Sichten)
    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'games', filter: `id=eq.${gameId}` },
        () => loadAllData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'players', filter: `game_id=eq.${gameId}` },
        () => loadAllData()
      );

    const subscription = channel.subscribe((status) => {
      // Defensive: Bei Fehlern trotzdem Daten konsistent halten
      if (status === 'CHANNEL_ERROR') {
        try { loadAllData(); } catch {}
      }
    });

    return () => {
      try { supabase.removeChannel(channel); } catch {}
    };
  }, [gameId, loadAllData, upsertDecisionInState, removeDecisionFromState]);


// Countdown-Ticker (1 Hz)
  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Deadline/Start neu lesen, wenn sich der Tag ändert
  useEffect(() => {
    setStartTs(readDayStartTs(currentDay));
    setDeadlineTs(readDayDeadlineTs(currentDay));
  }, [currentDay]);

  

  // News/Blöcke/Randoms für aktuellen Tag vorbereiten
  useEffect(() => {
    const d = currentDay || 1;

    // Szenario-Blöcke & -News mit optionalen Overrides
    const blocks = readScenarioOverride('blocks', d) || blocksByDay[d] || [];
    const news   = readScenarioOverride('news',   d) || newsByDay[d]   || [];
    setBlocksForDay(blocks);
    setNewsForDay(news);

// Anhänge aus Overrides, News & Blöcken + Data/ZIP (tageweise)
try {
  const overrideAtt   = readScenarioOverride('attachments', d) || [];
  const fromOverrides = Array.isArray(overrideAtt) ? overrideAtt.flatMap(extractAttachmentsFromAny) : [];
  const fromNews      = (news   || []).flatMap(extractAttachmentsFromAny);
  const fromBlocks    = (blocks || []).flatMap(extractAttachmentsFromAny);

  // Data/ZIP: anhand der Schlüssel/Metadaten in attachmentContents dem Tag d zuordnen
  let fromDataset: Attachment[] = [];
  try {
    const allKeys = Object.keys((attachmentContents as any) || {});
    const keysForDay = allKeys.filter((key) => {
      const meta: any = (attachmentContents as any)[key] || {};
      if (typeof meta.day === 'number') return meta.day === d; // 1. harte day-Meta
      // 2. Heuristik: "day01", "d01", "D1", "Tag 1" im Key oder im Titel
      const inKey   = key.match(/(?:^|[_-])(?:d|day)\s*0?(\d{1,2})(?:[_-]|$)/i);
      const inTitle = typeof meta.title === 'string' ? meta.title.match(/(?:Tag|Day)\s*0?(\d{1,2})/i) : null;
      const num = inKey ? Number(inKey[1]) : (inTitle ? Number(inTitle[1]) : NaN);
      return num === d;
    });
    fromDataset = keysForDay.map((k, i) => normalizeAttachment(k, i)).filter(Boolean) as Attachment[];
  } catch { /* dataset optional */ }

  setAttachmentsForDay(
    dedupeAttachments([...fromOverrides, ...fromNews, ...fromBlocks, ...fromDataset])
  );
} catch {
  setAttachmentsForDay([]);
}

    

 // Deterministische Randoms (Seed, Event-Intensität)
  try {
    let seed: number | null = null;
    try {
      const g: any = globalThis as any;
      if (typeof g.__gameSeed === 'number') seed = g.__gameSeed;
      else {
        const raw = localStorage.getItem('admin:seed');
        if (raw != null) seed = Number(raw);
      }
    } catch (e) { /* seed-Read optional */ }

    const baseCash = gameKpis?.cashEUR ?? 100000;
    if (typeof seed === 'number' && Number.isFinite(seed)) {
      const rng = makeRng(seed + d * 1000);
      (globalThis as any).__rng = rng;
    }
    const rv = generateDailyRandomValues(baseCash);
    setDailyRandoms(rv as any);

    // Zufalls‑News optional – aus newsPool via SP‑Generator, inkl. KPI‑Impact
    const g2: any = globalThis as any;
    const useRandomNews = !!g2.__randomNews;
    let dayRandomNews: DayNewsItem[] = [];

    if (useRandomNews) {
      // KRITISCH: Seed muss aus game_admin_settings kommen (bereits in gameSeed State geladen)
      const s = (typeof seed === 'number' && Number.isFinite(seed)) ? seed : (gameSeed || Math.floor(Math.random() * 1e9));
      const prevRng = (globalThis as any).__rng;

      // Admin‑Intensität → Generator‑Intensität
      const useIntensity = !!g2.__featureEventIntensity;
      const arr = Array.isArray(g2.__eventIntensityByDay) ? g2.__eventIntensityByDay : [];
      const intensityStr = mapIntensity(useIntensity ? (Number(arr[d - 1]) || 1) : 1);
      const diff = (g2.__mpDifficulty || g2.__multiplayerSettings?.mpDifficulty || 'normal') as 'easy'|'normal'|'hard';

      // EXAKT wie MultiplayerGameView: Seed + Tag * 1000 + 500
      const daySpecificSeed = s + d * 1000;

      // Synchronisiere mit globalThis.__playedNewsTitles (gemeinsame Duplikatvermeidung)
      const played: string[] = (globalThis as any).__playedNewsTitles || [];
      const seen = new Set([...played, ...playedTitlesRef.current]);

      // RNG für News deterministisch setzen (EXAKT wie MultiplayerGameView)
      (globalThis as any).__rng = makeRng(daySpecificSeed + 500);

      // Pool-basierte News erzeugen (EXAKT wie MultiplayerGameView)
      const items = generateRandomNewsForDay(undefined, {
        enabled: true,
        intensity: intensityStr,
        difficulty: diff,
        day: d,
        alreadyPlayed: Array.from(seen)
      });

      // RNG wiederherstellen
      (globalThis as any).__rng = prevRng;

      // In DayNewsItem-Form bringen (EXAKT wie MultiplayerGameView)
      dayRandomNews = (items as any[]).map((n: any) => ({
        id: n.id,
        title: n.title,
        text: n.text,
        source: n.category,
        severity: mapSeverityForUi(n.severity),
        impact: n.impact,
        roles: (n as any).roles ?? null
      }));

      // Gespielte Titel synchronisieren (KRITISCH für Duplikatvermeidung)
      const newTitles = (items as any[]).map(n => n.title);
      playedTitlesRef.current.push(...newTitles);

     
    }

    // Einmalig am Ende setzen (leer, falls useRandomNews=false)
    setRandomNewsForDay(dayRandomNews as any);
  } catch (e) {
    console.warn('[Trainer] Randoms/RandomNews konnten nicht berechnet werden:', e);
    setDailyRandoms(null);
    setRandomNewsForDay([]);
  }

      
  }, [currentDay, gameKpis]);


  
  const sendTrainerHint = useCallback(
    async (playerId: string) => {
      const msg = (hintDrafts[playerId] || '').trim();
      if (!msg) return;
      try {
        const { data: { user }, error: authErr } = await supabase.auth.getUser();
        if (authErr) throw authErr;
        if (!user) throw new Error('Nicht angemeldet.');

        // Spalte: sender_uid
        const { error: insErr } = await supabase.from('trainer_hints').insert({
          game_id: gameId,
          player_id: playerId,
          sender_uid: user.id,
          message: msg,
          sent_at: new Date().toISOString()
        });
        if (insErr) throw insErr;

        setHintDrafts((prev) => ({ ...prev, [playerId]: '' }));
      } catch (e: any) {
        console.error('[TrainerHint] insert failed', e);
        setError(e?.message || 'Hinweis konnte nicht gesendet werden.');
      }
    },
    [gameId, hintDrafts]
  );

  // Broadcast an alle Spieler
  const sendBroadcastToAll = useCallback(async () => {
    const msg = (broadcastAll || '').trim();
    if (!msg) return;
    try {
      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr) throw authErr;
      if (!user) throw new Error('Nicht angemeldet.');

      const rows = (players || []).map((p) => ({
        game_id: gameId,
        player_id: p.id, // explizit pro Spieler (statt NULL)
        sender_uid: user.id,
        message: msg,
        sent_at: new Date().toISOString()
      }));

      const { error: insErr } = await supabase.from('trainer_hints').insert(rows);
      if (insErr) throw insErr;

      setBroadcastAll('');
    } catch (e: any) {
      console.error('[TrainerHint] broadcast failed', e);
      setError(e?.message || 'Broadcast konnte nicht gesendet werden.');
    }
  }, [broadcastAll, gameId, players]);

  return (
    <div style={{ padding: 20, background: '#f8fafc', minHeight: '100vh' }}>
        {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          color: 'white',
          padding: 16,
          borderRadius: 8,
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>🎓 Trainer*in Dashboard</h1>

          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span>Spiel‑ID: <code style={{ background: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: 4 }}>{gameId}</code></span>
            <button
              onClick={copyGameId}
              style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.08)', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}
              title="Spiel‑ID in die Zwischenablage kopieren"
            >
              {copiedId ? 'Kopiert ✓' : 'ID kopieren'}
            </button>
            <span>• Tag {currentDay}/14</span>
          </div>

          {/* Verbleibende Zeit + Fortschritt */}
          <div style={{ marginTop: 6 }}>
            ⏰ Verbleibende Zeit: <strong>{deadlineTs == null ? '—' : formatDuration((deadlineTs || 0) - nowMs)}</strong>
          </div>
          {startTs != null && deadlineTs != null && deadlineTs > startTs && (
            <div style={{ marginTop: 6, width: 320 }}>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.35)', borderRadius: 4 }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, Math.max(0, Math.round(((nowMs - startTs) / (deadlineTs - startTs)) * 100)))}%`,
                    background: '#ffffff', borderRadius: 4
                  }}
                />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', marginTop: 2 }}>
                {Math.min(100, Math.max(0, Math.round(((nowMs - startTs) / (deadlineTs - startTs)) * 100)))}%
              </div>
            </div>
          )}

          {/* Status-Lampen */}
          <DecisionStatusBar decisionsToday={decisionsToday as any} players={players} />

          {error && <div style={{ marginTop: 6, color: '#fee2e2' }}>⚠ {error}</div>}
        </div>

        {/* „Abmelden“ leert Flags & Session */}
        <button
          onClick={handleLeave}
          style={{ padding: '8px 16px', background: 'white', color: '#6366f1', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Verlassen
        </button>
      </div>


      {/* Zugangsdaten (optional, aus AdminPanelMPM) */}
      {(() => {
        try {
          const admin = (globalThis as any).__multiplayerSettings
            || JSON.parse(localStorage.getItem('admin:multiplayer') || '{}');
          if (admin?.authMode === 'preset-credentials' && admin?.presetCredentials) {
            const creds = admin.presetCredentials as Record<string, { username: string; password: string }>;
            const copyAll = async () => {
              const text = Object.entries(creds)
                .map(([role, c]) => `${role}: ${c.username} / ${c.password}`).join('\n');
              try { await navigator.clipboard.writeText(text); alert('Zugangsdaten kopiert.'); } catch {}
            };
            return (
              <div style={{ marginBottom: 16, padding: 12, background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>🔑 Vorgegebene Zugangsdaten</strong>
                  <button onClick={copyAll}
                          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #6366f1', background: 'white', color: '#4f46e5', cursor: 'pointer', fontWeight: 600 }}>
                    📋 Alle kopieren
                  </button>
                </div>
                <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 8 }}>
                  {(['CEO','CFO','OPS','HRLEGAL'] as const).map(r => (
                    <div key={r} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 6, padding: 8 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{r}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: 12 }}>User: {creds[r]?.username || '—'}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: 12 }}>Pass: {creds[r]?.password || '—'}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        } catch {}
        return null;
      })()}

      
      {/* Tagesstatus (neu) */}
      <div style={{ marginBottom: 16 }}>
        {isDayComplete ? (
          <div style={{ padding: 12, background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: 8, color: '#065f46' }}>
            ✅ Tagesabschluss: Alle Entscheidungsblöcke für Tag {currentDay} sind entschieden.
          </div>
        ) : (
          <div style={{ padding: 12, background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 8, color: '#7c2d12' }}>
            ⏳ Tag {currentDay}: {decisionsByBlockToday.size}/{blocksForDay.length} Blöcken entschieden.
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        {/* Spieler-Übersicht + Hint-Eingabe */}
        <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
          <h3>Spieler-Status</h3>

          {/* Broadcast an alle Spieler (einmalig, nicht innerhalb des .map) */}
          <div
            style={{
              marginBottom: 12,
              padding: 8,
              background: '#ecfeff',
              border: '1px solid #a5f3fc',
              borderRadius: 6
            }}
          >
            <div style={{ fontSize: 12, color: '#0369a1', marginBottom: 6, fontWeight: 700 }}>
              Hinweis an alle Spieler senden
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Kurzer Hinweis an das ganze Team"
                value={broadcastAll}
                onChange={(e) => setBroadcastAll(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendBroadcastToAll();
                  }
                }}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: 6,
                  border: '1px solid #a5f3fc',
                  background: 'white',
                  fontSize: 13,
                  color: '#111827'
                }}
              />
              <button
                onClick={sendBroadcastToAll}
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: 'none',
                  background: '#0891b2',
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                title="Sendet den Hinweis an alle Spieler (trainer_hints)"
              >
                An alle senden
              </button>
            </div>
          </div>

          {players.map((player) => (
            <div
              key={player.id}
              style={{
                padding: 12,
                marginBottom: 8,
                background: '#f3f4f6',
                borderRadius: 6
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{player.name}</div>
                  <div style={{ fontSize: 14, color: '#6b7280' }}>Rolle: {player.role}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>
                    Entscheidungen: {decisions.filter((d) => d.player_id === player.id).length}
                  </div>
                </div>
              </div>

              {/* Hint-Eingabe (nur Trainer sichtbar) */}
              <div
                style={{
                  marginTop: 8,
                  padding: 8,
                  background: '#eef2ff',
                  border: '1px solid #c7d2fe',
                  borderRadius: 6
                }}
              >
                <div style={{ fontSize: 12, color: '#4f46e5', marginBottom: 6, fontWeight: 700 }}>
                  Hinweis an {player.name} senden
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Kurz-Hinweis (sichtbar gekennzeichnet)"
                    value={hintDrafts[player.id] || ''}
                    onChange={(e) => setHintDrafts((prev) => ({ ...prev, [player.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        sendTrainerHint(player.id);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      borderRadius: 6,
                      border: '1px solid #c7d2fe',
                      background: 'white',
                      fontSize: 13,
                      color: '#111827'
                    }}
                  />
                  <button
                    onClick={() => sendTrainerHint(player.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: 'none',
                      background: '#6366f1',
                      color: 'white',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    title="Sendet den Hinweis in die Tabelle trainer_hints"
                  >
                    Senden
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Entscheidungen Feed */}
        <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
          <h3>Alle Entscheidungen (Live)</h3>
          <div style={{ maxHeight: 600, overflowY: 'auto' }}>
            {decisions.map((decision) => (
              <div
                key={decision.id}
                style={{
                  padding: 12,
                  marginBottom: 8,
                  background: '#f9fafb',
                  borderRadius: 6,
                  borderLeft: `4px solid ${
                    decision.player?.role === 'CEO'
                      ? '#3b82f6'
                      : decision.player?.role === 'CFO'
                      ? '#10b981'
                      : decision.player?.role === 'OPS'
                      ? '#f59e0b'
                      : '#8b5cf6'
                  }`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>
                    {decision.player?.name || 'Unbekannt'} ({decision.player?.role || '—'})
                  </strong>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>Tag {decision.day}</span>
                </div>
                <div style={{ fontSize: 14, marginTop: 4 }}>Block: {decision.block_id}</div>
                {decision.option_id && <div style={{ fontSize: 14 }}>Option: {decision.option_id}</div>}
                {decision.custom_text && (
                  <div
                    style={{ marginTop: 8, padding: 8, background: '#fef3c7', borderRadius: 4, fontSize: 13 }}
                  >
                    Freitext: "{decision.custom_text}"
                  </div>
                )}
                {decision.kpi_delta && (
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                    KPI-Delta: {JSON.stringify(decision.kpi_delta)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Punktstände (aggregierter KPI-Impact je Rolle) */}
      <div style={{ marginTop: 20, background: 'white', padding: 16, borderRadius: 8 }}>
        <h3>Punktstände (Summe KPI-Impact je Rolle)</h3>
        {(() => {
          const agg = aggregateImpactByRole(decisions, blockRoleById);
          const rows = ROLES.map(r => ({ r, ...agg[r] })).sort((a, b) => b.points - a.points);
          return (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead style={{ background: '#f3f4f6' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 8 }}>Rolle</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Cash Δ</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>P&L Δ</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Kunden</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Bank</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Belegschaft</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Öffentlichkeit</th>
                    <th style={{ textAlign: 'right', padding: 8 }}>Punkte (gewichtet)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.r} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{ padding: 8 }}>{row.r}</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{Math.round(row.cashEUR).toLocaleString('de-DE')} €</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{Math.round(row.profitLossEUR).toLocaleString('de-DE')} €</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{Math.round(row.customerLoyalty)}</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{Math.round(row.bankTrust)}</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{Math.round(row.workforceEngagement)}</td>
                      <td style={{ padding: 8, textAlign: 'right' }}>{Math.round(row.publicPerception)}</td>
                      <td style={{ padding: 8, textAlign: 'right', fontWeight: 700 }}>{row.points.toLocaleString('de-DE')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })()}

        <div style={{ marginTop: 12 }}>
          <button
            onClick={async () => {
              try {
                const agg = aggregateImpactByRole(decisions, blockRoleById);
                const rows = ROLES.map(r => ({ r, ...agg[r] })).sort((a, b) => b.points - a.points);

                // Daten für PDF: Blöcke & Optionen (kompakt formatiert)
                const blockRowsForPdf = (blocksForDay as any[]).map((b: any) => {
                  const bid = getBlockId(b);
                  const brole = getBlockRole(b);
                  const opts = getBlockOptions(b);
                  const optLines = opts.length
                    ? opts.map((o: any, i: number) => {
                        const oid = getOptionId(o, i);
                        const title = getOptionTitle(o, oid);
                        const k = getOptionKpi(o);
                        return `• ${oid}: ${title} — KPI ${formatKpiShort(k)}`;
                      }).join('\n')
                    : '– keine Optionen gefunden –';
                  return [brole, `${b.title || bid} (${bid})`, optLines];
                });

                // Tagesabschluss-Zeilen
                const resolutionRowsForPdf = Array.from(decisionsByBlockToday.entries()).map(([bid, list]) => {
                  const latest = list.slice().sort((a,b) => +new Date(b.created_at) - +new Date(a.created_at))[0];
                  const p = latest?.player;
                  const time = latest ? new Date(latest.created_at).toLocaleTimeString('de-DE') : '—';
                  const optId = latest?.option_id || '—';
                  const kpi = latest?.kpi_delta ? formatKpiShort(latest.kpi_delta) : '—';
                  return [bid, `${p?.name || '—'} (${p?.role || '—'})`, optId, time, kpi];
                });

                const doc: any = {
                  pageMargins: [40, 40, 40, 40],
                  content: [
                    { text: 'Trainer*in-Protokoll', style: 'h1' },
                    { text: `Spiel ${gameId.substring(0, 8)} · Tag ${currentDay}/14`, style: 'h2', margin: [0, 0, 0, 12] },

                    { text: 'Spieler', style: 'h3', margin: [0, 8, 0, 4] },
                    { ul: (players || []).map(p => `${p.name} – ${p.role}`), margin: [0, 0, 0, 8] },

                    { text: 'Punktstände (KPI-Impact je Rolle)', style: 'h3', margin: [0, 8, 0, 4] },
                    {
                      table: {
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: [
                          ['Rolle', 'Cash Δ', 'P&L Δ', 'Kunden', 'Bank', 'Belegschaft', 'Öffentlichkeit', 'Punkte'],
                          ...rows.map(row => [
                            row.r,
                            `${Math.round(row.cashEUR).toLocaleString('de-DE')} €`,
                            `${Math.round(row.profitLossEUR).toLocaleString('de-DE')} €`,
                            Math.round(row.customerLoyalty),
                            Math.round(row.bankTrust),
                            Math.round(row.workforceEngagement),
                            Math.round(row.publicPerception),
                            row.points.toLocaleString('de-DE')
                          ])
                        ]
                      },
                      layout: 'lightHorizontalLines',
                      fontSize: 9
                    },

                    { text: 'KPI (aktuell)', style: 'h3', margin: [0, 12, 0, 4] },
                    {
                      table: {
                        widths: ['*', '*', '*', '*', '*', '*'],
                        body: [[
                          `Cash: ${Math.round(gameKpis?.cashEUR || 0).toLocaleString('de-DE')} €`,
                          `P&L: ${Math.round(gameKpis?.profitLossEUR || 0).toLocaleString('de-DE')} €`,
                          `Kunden: ${Math.round(gameKpis?.customerLoyalty || 0)}`,
                          `Bank: ${Math.round(gameKpis?.bankTrust || 0)}`,
                          `Belegschaft: ${Math.round(gameKpis?.workforceEngagement || 0)}`,
                          `Öffentlichkeit: ${Math.round(gameKpis?.publicPerception || 0)}`
                        ]]
                      },
                      layout: 'noBorders',
                      fontSize: 10
                    },

                    { text: 'News des Tages', style: 'h3', margin: [0, 12, 0, 4] },
                    { ul: newsForDay.map(n => `${n.title}${n.source ? ' · ' + n.source : ''}`), margin: [0, 0, 0, 8] },

 { text: 'Anhänge (Tag)', style: 'h3', margin: [0, 12, 0, 4] },
                    {
                      ul: (attachmentsForDay.length
                       ? attachmentsForDay.map(a => `${a.title || a.url} — ${(a.type || (a.url.match(/\.([a-z0-9]+)(?:[\\?#]|$)/i)?.[1] || '')).toUpperCase()}`)
                       : ['—'])
                   },
                    
                // Zufalls‑News (gesamt) inkl. Rollen & KPI-Δ
{ text: `Zufalls-News (rollenbasiert${ (globalThis as any).__roleBasedRandomNews ? ' – Rollensicht AKTIV' : ' – Rollensicht INAKTIV' })`,
  style: 'h3', margin: [0, 12, 0, 4] },
{ ul: ((selectedRole === 'ALL' ? randomNewsForDay : randomNewsForRole) || []).map(n => {

    const k = (n as any).impact ? formatKpiShort((n as any).impact) : '—';
    const rl = rolesLabel((n as any).roles);
    return `${n.title} (${n.severity}) • Rollen: ${rl} • KPI Δ: ${k}`;
  })
},

// Sichtbarkeit je Rolle (nur wenn Rollenspezifikation aktiv wirklich relevant)
{ text: 'Sichtbarkeit je Rolle', style: 'h3', margin: [0, 10, 0, 4] },
{
  table: {
    widths: ['auto', '*'],
    body: [
      ['Rolle', 'Zufalls-News'],
      ...(['CEO','CFO','OPS','HRLEGAL'] as RoleId[]).map(r => {
        const roleOn = !!((globalThis as any).__roleBasedRandomNews);
        const list = (randomNewsForDay || [])
          .filter(n => {
            const rs = (n as any).roles as string[] | undefined;
            return roleOn ? (!rs || (Array.isArray(rs) && rs.includes(r))) : true;
          })
          .map(n => `${n.title} (${n.severity})`)
          .join('\n') || '—';
        return [r, list];
      })
    ]
  },
  layout: 'lightHorizontalLines',
  fontSize: 9
},

                    { text: 'Tages-Randoms', style: 'h3', margin: [0, 12, 0, 4] },
                    {
                      ul: [
                        `Cash Δ: ${Math.round(dailyRandoms?.cashEUR || 0).toLocaleString('de-DE')} €`,
                        `P&L Δ: ${Math.round(dailyRandoms?.profitLossEUR || 0).toLocaleString('de-DE')} €`,
                        `Kunden Δ: ${Math.round(dailyRandoms?.customerLoyalty || 0)}`,
                        `Bank Δ: ${Math.round(dailyRandoms?.bankTrust || 0)}`,
                        `Belegschaft Δ: ${Math.round(dailyRandoms?.workforceEngagement || 0)}`,
                        `Öffentlichkeit Δ: ${Math.round(dailyRandoms?.publicPerception || 0)}`
                      ]
                    },

                    { text: 'Entscheidungsblöcke & Optionen (Tag aktuell)', style: 'h3', margin: [0, 12, 0, 4] },
                    {
                      table: {
                        widths: ['auto','*','*'],
                        body: [
                          ['Rolle','Block','Optionen (mit KPI)'],
                          ...blockRowsForPdf
                        ]
                      },
                      layout: 'lightHorizontalLines',
                      fontSize: 9
                    },

                    { text: 'Entscheidungen (aktuell)', style: 'h3', margin: [0, 12, 0, 4] },
                    {
                      table: {
                        widths: [60, '*', '*', '*', '*'],
                        body: [
                          ['Zeit', 'Rolle', 'Block', 'Option', 'Freitext'],
                          ...decisions.slice(0, 200).map(d => [
                            new Date(d.created_at).toLocaleTimeString('de-DE'),
                            `${d.player?.name || '—'} (${d.player?.role || '—'})`,
                            d.block_id,
                            d.option_id || '—',
                            d.custom_text || '—'
                          ])
                        ]
                      },
                      layout: 'lightHorizontalLines',
                      fontSize: 9
                    },

                    ...(isDayComplete ? [
                      { text: 'Tagesabschluss – getroffene Entscheidungen', style: 'h3', margin: [0, 12, 0, 4] },
                      {
                        table: {
                          widths: ['*','*','auto','auto','*'],
                          body: [
                            ['Block','Spieler/Rolle','Option','Zeit','KPI Δ'],
                            ...resolutionRowsForPdf
                          ]
                        },
                        layout: 'lightHorizontalLines',
                        fontSize: 9
                      }
                    ] : [])
                  ],
                  styles: {
                    h1: { fontSize: 18, bold: true },
                    h2: { fontSize: 12, color: '#6b7280' },
                    h3: { fontSize: 11, bold: true }
                  }
                };

                pdfMake.createPdf(doc).download(`Trainer_${gameId.substring(0, 8)}_Tag${currentDay}.pdf`);
              } catch (e: any) {
                alert('Export fehlgeschlagen: ' + (e?.message || 'Unbekannter Fehler'));
              }
            }}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600
            }}
            title="Exportiert Trainer-Report (Spieler, Punktstände, KPI, News, Blöcke+Optionen, Entscheidungen)"
          >
            📄 Trainer-Report (PDF)
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────── */}
      {/* News, Zufalls‑News, Tages‑Randoms & Entscheidungsblöcke             */}
      {/* ──────────────────────────────────────────────────────────────────── */}
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Szenario‑News des Tages */}
        <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>📰 Szenario‑News (Tag {currentDay})</h3>
          {newsForDay.length === 0 ? (
            <div style={{ color: '#6b7280' }}>Keine Szenario‑News für diesen Tag.</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {newsForDay.map((n) => (
                <li key={n.id || n.title} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    Quelle: {n.source || '—'} • Intensität: {n.severity ?? '—'}
                  </div>
                  {(n as any).content && <div style={{ fontSize: 13, marginTop: 4 }}>{(n as any).content}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>

                {/* Zufalls‑News (deterministisch aus Seed/Intensität) */}
                <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🎲 Zufalls‑News (Tag {currentDay})</h3>

          {/* Rollensicht – entspricht der Spielersicht */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '4px 0 10px 0' }}>
            <label style={{ fontSize: 12, color: '#6b7280' }}>Rollensicht:</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as any)}
              style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #e5e7eb' }}
            >
              <option value="ALL">Alle</option>
              <option value="CEO">CEO</option>
              <option value="CFO">CFO</option>
              <option value="OPS">OPS</option>
              <option value="HRLEGAL">HR/Legal</option>
            </select>
          </div>

          {randomNewsForDay.length === 0 ? (
            <div style={{ color: '#6b7280' }}>Keine Zufalls‑News erzeugt.</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {randomNewsForRole.map((n) => (

                <li key={n.id || n.title} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    Quelle: {n.source || '—'} • Intensität: {n.severity ?? '—'} {(n as any).roles ? `• Rollen: ${rolesLabel((n as any).roles)}` : '• Rollen: alle'}
                  </div>
                  {(n as any).impact && (
                    <div style={{ fontSize: 12, marginTop: 4 }}>
                      KPI Δ: <code style={{ fontSize: 12, background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
                        {formatKpiShort((n as any).impact)}
                      </code>
                    </div>
                  )}
                  {(n as any).content && <div style={{ fontSize: 13, marginTop: 4 }}>{(n as any).content}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>


     




        {/* Tages‑Randoms (Engine‑Δ‑Werte) */}


        {/* Anhänge des Tages (aus Szenario, Overrides & Data/ZIP) */}
        <div
          style={{
            background: 'white',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            gridColumn: '1 / -1'
          }}
        >
          <h3 style={{ margin: '0 0 10px 0' }}>📎 Anhänge (Tag {currentDay})</h3>

          {attachmentsForDay.length === 0 ? (
            <div style={{ color: '#6b7280' }}>Keine Anhänge für diesen Tag gefunden.</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {attachmentsForDay.map((a, idx) => {
                const key = stripInline(a.url);
                const inDataset = a?.url?.startsWith('inline:') && (attachmentContents as any)[key];

                return (
                  <li key={a.id || a.url || idx} style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: 6,
                        padding: 8
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          {a.title || key || a.url}
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>
                          {(
                            a.type ||
                            guessExt(a.url) ||
                            (inDataset ? ((attachmentContents as any)[key]?.type || '') : '')
                          )
                            ?.toString()
                            ?.toUpperCase() || '—'}
                          {a.size ? ` • ${formatBytes(a.size)}` : ''}
                          {a.from === 'dataset' ? ' • Quelle: Data' : ''}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        {inDataset ? (
                          <button
                            onClick={() => setShowAttachment(key)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: 6,
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                            title="Im Modal öffnen"
                          >
                            Im&nbsp;Modal&nbsp;öffnen
                          </button>
                        ) : (
                          <>
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: '6px 10px',
                                borderRadius: 6,
                                background: 'white',
                                border: '1px solid #d1d5db',
                                textDecoration: 'none',
                                color: '#111827',
                                fontWeight: 600
                              }}
                            >
                              Öffnen
                            </a>
                            <a
                              href={a.url}
                              download
                              style={{
                                padding: '6px 10px',
                                borderRadius: 6,
                                background: '#6366f1',
                                border: 'none',
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 700
                              }}
                            >
                              Download
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>


        
        <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>📈 Tages‑Randoms</h3>
          {dailyRandoms ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <tbody>
                <tr>
                  <td style={{ padding: 6, color: '#6b7280' }}>Δ Cash</td>
                  <td style={{ padding: 6, textAlign: 'right', fontWeight: 600 }}>
                    {(dailyRandoms.cashEUR ?? 0).toLocaleString('de-DE')} €
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 6, color: '#6b7280' }}>Δ Gewinn/Verlust</td>
                  <td style={{ padding: 6, textAlign: 'right', fontWeight: 600 }}>
                    {(dailyRandoms.profitLossEUR ?? 0).toLocaleString('de-DE')} €
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 6, color: '#6b7280' }}>Δ Kundentreue</td>
                  <td style={{ padding: 6, textAlign: 'right', fontWeight: 600 }}>
                    {Math.round(dailyRandoms.customerLoyalty ?? 0)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 6, color: '#6b7280' }}>Δ Bankvertrauen</td>
                  <td style={{ padding: 6, textAlign: 'right', fontWeight: 600 }}>
                    {Math.round(dailyRandoms.bankTrust ?? 0)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 6, color: '#6b7280' }}>Δ Workforce</td>
                  <td style={{ padding: 6, textAlign: 'right', fontWeight: 600 }}>
                    {Math.round(dailyRandoms.workforceEngagement ?? 0)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: 6, color: '#6b7280' }}>Δ Public</td>
                  <td style={{ padding: 6, textAlign: 'right', fontWeight: 600 }}>
                    {Math.round(dailyRandoms.publicPerception ?? 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div style={{ color: '#6b7280' }}>Keine Δ‑Werte berechnet.</div>
          )}
        </div>

        {/* Entscheidungsblöcke des Tages – jetzt mit Optionen & KPI-Auswirkung */}
        <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🧩 Entscheidungsblöcke aller Rollen (Tag {currentDay})</h3>
          {blocksForDay.length === 0 ? (
            <div style={{ color: '#6b7280' }}>Keine Blöcke für diesen Tag.</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {(blocksForDay as any[]).map((b) => {
                const bid = getBlockId(b);
                const brole = getBlockRole(b);
                const opts = getBlockOptions(b);
                const taken = decisionsByBlockToday.get(bid) || [];

                return (
                  <li key={bid} style={{ marginBottom: 12 }}>
                    <div style={{ padding: 12, background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div>
                          <strong style={{ marginRight: 8 }}>{brole || '—'}</strong>
                          <span style={{ color: '#374151' }}>{(b as any).title || bid}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>ID: {bid}</div>
                      </div>

                      {/* Optionen-Tabelle */}
                      <div style={{ marginTop: 8 }}>
                        {opts.length === 0 ? (
                          <div style={{ fontSize: 13, color: '#6b7280' }}>Keine Optionen im Szenario-Datenobjekt gefunden.</div>
                        ) : (
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                              <thead>
                                <tr style={{ background: '#f3f4f6' }}>
                                  <th style={{ textAlign: 'left', padding: 6 }}>Option</th>
                                  <th style={{ textAlign: 'left', padding: 6 }}>Titel / Beschreibung</th>
                                  <th style={{ textAlign: 'left', padding: 6 }}>KPI‑Auswirkung</th>
                                </tr>
                              </thead>
                              <tbody>
                                {opts.map((o: any, i: number) => {
                                  const oid = getOptionId(o, i);
                                  const title = getOptionTitle(o, oid);
                                  const desc = getOptionDescription(o);
                                  const k = getOptionKpi(o);
                                  const wasPicked = taken.some(t => (t.option_id || '') === String(oid));
                                  return (
                                    <tr key={oid} style={{ borderTop: '1px solid #e5e7eb', background: wasPicked ? '#ecfdf5' : undefined }}>
                                      <td style={{ padding: 6, fontWeight: 600 }}>{oid}</td>
                                      <td style={{ padding: 6 }}>
                                        <div>{title}</div>
                                        {desc && <div style={{ fontSize: 12, color: '#6b7280' }}>{desc}</div>}
                                      </td>
                                      <td style={{ padding: 6 }}>
                                        <code style={{ fontSize: 12, background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
                                          {formatKpiShort(k)}
                                        </code>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {/* Getroffene Entscheidung(en) für diesen Block */}
                      {taken.length > 0 && (
                        <div style={{ marginTop: 10, padding: 10, background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 6 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#4f46e5', marginBottom: 6 }}>
                            Getroffene Entscheidung(en) – Tag {currentDay}
                          </div>
                                                <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {taken
                          .sort((a,b) => +new Date(a.created_at) - +new Date(b.created_at))
                          .map(t => (
                            <li key={t.id} style={{ marginBottom: 4 }}>
                              <span style={{ fontWeight: 600 }}>{t.player?.name || '—'} ({t.player?.role || '—'})</span>{' '}
                              wählte <strong>Option {t.option_id || '—'}</strong>{' '}
                              um {new Date(t.created_at).toLocaleTimeString('de-DE')}
                              {t.custom_text ? <> – „{t.custom_text}“</> : null}
                              {t.kpi_delta ? (
                                <>
                                  {' '}• KPI Δ: <code style={{ fontSize: 12 }}>{formatKpiShort(t.kpi_delta)}</code>
                                </>
                              ) : null}
                            </li>
                          ))}
                      </ul>

                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* KPI-Übersicht */}
      <div style={{ marginTop: 20, background: 'white', padding: 16, borderRadius: 8, border: '2px solid #3b82f6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: '#1f2937', fontSize: 18 }}>📊 Aktuelle KPIs (Alle sichtbar)</h3>
          <button
            onClick={loadAllData}
            disabled={isLoadingKpis}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              background: isLoadingKpis ? '#9ca3af' : '#3b82f6',
              color: 'white',
              fontWeight: 600,
              cursor: isLoadingKpis ? 'not-allowed' : 'pointer',
              fontSize: 13
            }}
            title="KPI-Daten neu laden"
          >
            {isLoadingKpis ? '🔄 Lädt...' : '🔄 Neu laden'}
          </button>
        </div>

        {(() => {
          // Ladezustand
          if (isLoadingKpis) {
            return (
              <div style={{
                padding: 32,
                textAlign: 'center',
                color: '#6b7280',
                background: '#f9fafb',
                borderRadius: 8,
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>KPI-Daten werden geladen...</div>
              </div>
            );
          }

          // Explizite Null-Prüfung
          if (gameKpis === null) {
            return (
              <div style={{
                padding: 24,
                background: '#fef2f2',
                border: '2px solid #fca5a5',
                borderRadius: 8
              }}>
                <div style={{ color: '#dc2626', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                  ⚠️ FEHLER: Keine KPI-Daten verfügbar!
                </div>
                <div style={{ color: '#991b1b', fontSize: 14, marginBottom: 12 }}>
                  Die KPI-Werte konnten nicht aus der Datenbank geladen werden.
                </div>
                <div style={{
                  padding: 12,
                  background: 'white',
                  border: '1px solid #fca5a5',
                  borderRadius: 6,
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#6b7280'
                }}>
                  <strong>Debug-Informationen:</strong><br />
                  Game-ID: {gameId}<br />
                  Status: gameKpis ist null<br />
                  <br />
                  Mögliche Ursachen:<br />
                  • Das Spiel wurde noch nicht vollständig initialisiert<br />
                  • Die kpi_values-Spalte in der Datenbank ist leer<br />
                  • RLS-Policy verhindert den Zugriff auf Spielstanddaten
                </div>
                <button
                  onClick={loadAllData}
                  style={{
                    marginTop: 12,
                    padding: '10px 20px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#dc2626',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  🔄 Erneut versuchen
                </button>
              </div>
            );
          }

          // Validierung der KPI-Struktur
          const kpiLabels: Record<string, string> = {
            cashEUR: 'Liquide Mittel',
            profitLossEUR: 'Gewinn/Verlust',
            customerLoyalty: 'Kundentreue',
            bankTrust: 'Bankvertrauen',
            workforceEngagement: 'Mitarbeiterzufriedenheit',
            publicPerception: 'Öffentliche Wahrnehmung'
          };

          const formatValue = (key: string, val: any) => {
            if (key === 'cashEUR' || key === 'profitLossEUR') {
              return `${Number(val || 0).toLocaleString('de-DE')} €`;
            }
            return String(val || 0);
          };

          const entries = Object.entries(gameKpis);

          // Prüfe ob alle erforderlichen KPI-Felder vorhanden sind
          const requiredFields = ['cashEUR', 'profitLossEUR', 'customerLoyalty', 'bankTrust', 'workforceEngagement', 'publicPerception'];
          const missingFields = requiredFields.filter(field => !(field in gameKpis));

          if (missingFields.length > 0) {
            return (
              <div style={{
                padding: 24,
                background: '#fffbeb',
                border: '2px solid #fbbf24',
                borderRadius: 8
              }}>
                <div style={{ color: '#d97706', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                  ⚠️ WARNUNG: Unvollständige KPI-Daten!
                </div>
                <div style={{ color: '#92400e', fontSize: 14, marginBottom: 12 }}>
                  Folgende KPI-Felder fehlen: {missingFields.join(', ')}
                </div>
                <button
                  onClick={loadAllData}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#d97706',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  🔄 Neu initialisieren
                </button>
              </div>
            );
          }

          // Erfolgreiche Anzeige
          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {entries.map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    padding: 16,
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    border: '1px solid #bae6fd',
                    borderRadius: 8,
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ fontSize: 13, color: '#0369a1', marginBottom: 8, fontWeight: 600 }}>
                    {kpiLabels[key] || key}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#0c4a6e' }}>
                    {formatValue(key, value)}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Tagesabschluss-Übersicht (gesamthaft), sichtbar sobald alle Blöcke entschieden */}
      {isDayComplete && (
        <div style={{ marginTop: 20, background: 'white', padding: 16, borderRadius: 8 }}>
          <h3>✅ Tagesabschluss (Tag {currentDay}) – getroffene Entscheidungen</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead style={{ background: '#f3f4f6' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: 8 }}>Block</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Spieler/Rolle</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Option</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Zeit</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>KPI Δ</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(decisionsByBlockToday.entries()).map(([bid, list]) => {
                  const latest = list.slice().sort((a,b) => +new Date(b.created_at) - +new Date(a.created_at))[0];
                  return (
                    <tr key={bid} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{ padding: 8 }}>{bid}</td>
                      <td style={{ padding: 8 }}>{latest?.player?.name || '—'} ({latest?.player?.role || '—'})</td>
                      <td style={{ padding: 8 }}>{latest?.option_id || '—'}</td>
                      <td style={{ padding: 8 }}>{latest ? new Date(latest.created_at).toLocaleTimeString('de-DE') : '—'}</td>
                      <td style={{ padding: 8 }}>
                        {latest?.kpi_delta ? (
                          <code style={{ fontSize: 12 }}>{formatKpiShort(latest.kpi_delta)}</code>
                        ) : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
                    {/* Attachment-Modal (Inhalte aus attachmentContents) */}
      {showAttachment && (attachmentContents as any)[showAttachment] && (
        <AttachmentModal
          title={(attachmentContents as any)[showAttachment].title}
          content={(attachmentContents as any)[showAttachment].content}
          onClose={() => setShowAttachment(null)}
        />
      )}

    </div>
  );
}
