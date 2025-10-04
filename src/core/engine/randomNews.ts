// src/core/engine/randomNews.ts

import type { KPI, RoleId } from '@/core/models/domain';
import { newsPool, type NewsPoolEntry } from '@/data/newsPool';
import { currentRng, rngId } from '@/core/utils/prng';
import { newsPool, type NewsPoolEntry } from '@/data/newsPool';

export type NewsIntensity = 'low'|'normal'|'high';
export type Difficulty = 'easy'|'normal'|'hard';
export type NewsCategory = 'finanzen'|'kunden'|'belegschaft'|'oeffentlichkeit';
export type NewsSeverity = 'low'|'mid'|'high';
export type NewsSign = '+'|'-';

export interface NewsItem {
  id: string;
  day: number;
  category: NewsCategory;
  title: string;
  text: string;
  severity: NewsSeverity;
  sign: NewsSign;
  impact: Partial<KPI>;
  roles?: RoleId[];
}

export interface NewsConfig {
  enabled: boolean;
  intensity: NewsIntensity;
  difficulty: Difficulty;
  day: number;
  seed?: number;
  alreadyPlayed?: string[];
  /** NEU: Rollensicht – wenn 'respectRoles' true ist, werden nur passende News gezogen */
  respectRoles?: boolean;
  roleFilter?: RoleId | RoleId[]; // eine Rolle oder eine Menge erlaubter Rollen
}


// -------------------------------------------------------------
// Utilities
// -------------------------------------------------------------
function rand(rng = currentRng()): number { return rng(); }
function pick<T>(arr: T[], rng = currentRng()): T {
  return arr[Math.floor(rand(rng) * arr.length)] as T;
}

function weighted<T>(items: Array<{v: T; w: number}>, rng = currentRng()): T {
  const sum = items.reduce((a,b)=>a+b.w,0);
  let r = rand(rng) * sum;
  for (const it of items) { if ((r -= it.w) <= 0) return it.v; }
  return items[items.length-1].v;
}

function countByIntensity(intensity: NewsIntensity, rng = currentRng()): number {
  if (intensity === 'low') {
    // ~33% Chance auf 1 Meldung
    return rand(rng) < 0.33 ? 1 : 0;
  }
  if (intensity === 'high') {
    // Mindestens 1, 50% zweite, 20% dritte (Reducer deckelt später auf 2)
    let n = 1;
    if (rand(rng) < 0.5) n++;
    if (rand(rng) < 0.2) n++;
    return n;
  }
  // normal: ~80% 1 Meldung, 15% zweite
  let n = rand(rng) < 0.8 ? 1 : 0;
  if (rand(rng) < 0.15) n++;
  return n;
}

function severityByDifficulty(diff: Difficulty, rng = currentRng()): NewsSeverity {
  // Easy deutlich entschärfen
  if (diff === 'easy') return weighted([{v:'low',w:75},{v:'mid',w:22},{v:'high',w:3}], rng);
  if (diff === 'hard') return weighted([{v:'low',w:35},{v:'mid',w:45},{v:'high',w:20}], rng);
  return weighted([{v:'low',w:50},{v:'mid',w:40},{v:'high',w:10}], rng);
}

function signByDifficulty(diff: Difficulty, rng = currentRng()): NewsSign {
  // Easy mehr positive Meldungen
  if (diff === 'easy') return rand(rng) < 0.65 ? '+' : '-';
  if (diff === 'hard') return rand(rng) < 0.35 ? '+' : '-';
  return rand(rng) < 0.45 ? '+' : '-';
}

// NEU: Anzahl der Zufalls-News explizit an die Schwierigkeit koppeln
function countByDifficulty(diff: Difficulty, rng = currentRng()): number {
  if (diff === 'hard') {
    // 5–6 Meldungen/Tag, mit leichter Tendenz zu 6
    return 5 + (rand(rng) < 0.6 ? 1 : 0);
  }
  if (diff === 'easy') {
    // 1–2 Meldungen/Tag
    return 1 + (rand(rng) < 0.5 ? 1 : 0);
  }
  // normal: 3–4 Meldungen/Tag
  return 3 + (rand(rng) < 0.5 ? 1 : 0);
}


function categoryWeightsForDay(day: number): Array<{v: NewsCategory; w: number}> {
  // leichte Akzente über den Verlauf (14 Tage)

  // Anzahl der Zufalls‑News strikt an die Schwierigkeit koppeln:
// easy: 1–2, normal: 3–4, hard: 5–6
function countByDifficulty(diff: Difficulty, rng = currentRng()): number {
  const r = rand(rng);
  if (diff === 'hard')   return 5 + (r < 0.5 ? 1 : 0); // 5 oder 6
  if (diff === 'easy')   return 1 + (r < 0.5 ? 1 : 0); // 1 oder 2
  return 3 + (r < 0.5 ? 1 : 0);                        // 3 oder 4
}

  
  const phase = Math.max(1, Math.min(14, day));
  // Früh: Finanzen/Kunden, Spät: Belegschaft/Öffentlichkeit
  const fin = phase <= 6 ? 34 : 24;
  const kun = phase <= 6 ? 30 : 24;
  const bel = phase >= 9 ? 26 : 22;
  const off = phase >= 9 ? 26 : 22;
  return [
    { v:'finanzen', w: fin },
    { v:'kunden', w: kun },
    { v:'belegschaft', w: bel },
    { v:'oeffentlichkeit', w: off },
  ];
}

// -------------------------------------------------------------
// Anti-Duplikat: pickNewsFromPool
// -------------------------------------------------------------
export function pickNewsFromPool(
  category: NewsCategory,
  severity: NewsSeverity,
  sign: NewsSign,
  day: number,
  alreadyPlayed: Set<string> | string[],
  respectRoles?: boolean,
  roleFilter?: RoleId
): NewsItem | null {
  const played = new Set(Array.isArray(alreadyPlayed) ? alreadyPlayed : Array.from(alreadyPlayed));
  const pool = (newsPool as any)?.[category]?.[severity]?.[sign] as NewsPoolEntry[] | undefined;
  if (!pool || pool.length === 0) return null;

  // Rollen-Set (wenn aktiv)
  const rf = Array.isArray(roleFilter)
    ? new Set(roleFilter)
    : roleFilter
    ? new Set<RoleId>([roleFilter])
    : null;

  // Nur Titel, die noch nicht gespielt wurden – und ggf. rollenselektiv
  const available = pool.filter(p => {
    if (played.has(p.title)) return false;
    if (!respectRoles) return true;           // Rollensicht AUS → alles erlaubt
    if (!p.roles || p.roles.length === 0) return true; // global sichtbare News
    if (!rf || rf.size === 0) return false;   // Rollensicht AN, aber keine Rolle übergeben → keine rollenpflichtigen News
    return p.roles.some(r => rf.has(r));      // Schnittmenge mit erlaubten Rollen
  });
  if (available.length === 0) return null;

  const entry: NewsPoolEntry = pick(available);

  return {
    id: `${day}-${category}-${severity}-${sign}-${rngId(currentRng(), 6)}`,
    day,
    category,
    severity,
    sign,
    title: entry.title,
    text: entry.text,
    impact: entry.impact,
    roles: entry.roles
  };
}

// -------------------------------------------------------------
// Hauptgenerator: generateRandomNewsForDay
// -------------------------------------------------------------
export function generateRandomNewsForDay(_: unknown, cfg: NewsConfig): NewsItem[] {
  if (!cfg.enabled) return [];
  const rng = currentRng();
  let count = countByDifficulty(cfg.difficulty, rng); // ← neu: Schwierigkeit steuert Anzahl
  if (count <= 0) return [];


  // Cap anpassen: bis 6 zulassen (Ihr Wunsch für „hard“)
  count = Math.max(1, Math.min(6, count));


  const played = new Set(cfg.alreadyPlayed ?? []);
  const items: NewsItem[] = [];

  for (let i=0; i<count; i++) {
    const category = weighted(categoryWeightsForDay(cfg.day), rng);
    const severity = severityByDifficulty(cfg.difficulty, rng);
    const sign = signByDifficulty(cfg.difficulty, rng);

    const n = pickNewsFromPool(
  category, severity, sign, cfg.day, played,
  cfg.roleFilter ?? null,
  !!cfg.respectRoles
);
    if (n) {
      // Tages-Deduplikat nach Titel
      if (!items.find(x => x.title === n.title)) {
        items.push(n);
        played.add(n.title); // sofort blocken
      }
    }
  }
  return items;
}