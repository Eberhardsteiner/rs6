// src/core/engine/gameEngine.ts
import type { KPI, DayNewsItem, RoleId } from '@/core/models/domain';
import type { DecisionLogEntry } from '@/core/models/decisionLog';
import { currentRng, rngId } from '@/core/utils/prng';

/**
 * Zusatz-Metadaten des Spiel-Engines.
 * - scheduledDeltas: KPI-Änderungen, die an einem zukünftigen Tag angewendet werden.
 * - randomNews:   pro Tag dynamisch erzeugte News (optional).
 */
export interface EngineMeta {
  /** Persistenter Multiplikator für Adaptive Difficulty (Light), gekappt auf 0.9–1.2. */
  difficultyFactor?: number;
  scheduledDeltas?: Record<number, Array<Partial<KPI>>>;
  randomNews?: Record<number, DayNewsItem[]>;
  suppressedInsolvencyCount?: number;
  
// NEU: Tägliche Zufallswerte
    /** Ereignis-Intensität je Tag (1..14), Multiplikator; 1 = normal */
  intensityByDay?: number[];
dailyRandomValues?: Record<number, DailyRandomValues>;
  currentDayRandoms?: DailyRandomValues;
  
  // Erweiterungs-Haken für Admin/Runtime-Flags
  [key: string]: any;
}
export interface DailyRandomValues {
  cashInflow: number;
  cashOutflow: number;
  cashNet: number;
  plInflow: number;
  plOutflow: number;
  plNet: number;
}
/**
 * Globaler Spielzustand.
 */
export interface GameState {
  day: number;
  kpi: KPI;
  kpiHistory: KPI[];
  pendingDeltas: Array<Partial<KPI>>;
  log: DecisionLogEntry[];

  playerName: string;
  playerRole: RoleId;      // Legacy (Einzelrolle)
  playerRoles: RoleId[];   // Mehrrollen-Unterstützung
  userNotes?: string;      // Benutzernotizen zum Spielverlauf

  burnPerDayEUR: number;
  isOver: boolean;
  insolvency: boolean;

  engineMeta?: EngineMeta;

  // Bank-Mechanik (optional)
  creditLineEUR?: number;
  usedCreditEUR?: number;
  interestRatePct?: number;
}

/** Leeres KPI-Objekt (Standardwerte). */
export function emptyKpi(): KPI {
  return {
    cashEUR: 0,
    profitLossEUR: 0,
    customerLoyalty: 0,
    bankTrust: 0,
    workforceEngagement: 0,
    publicPerception: 0
  };
}

/** Neuen, initialen Spielzustand erzeugen (mit optionalen Überschreibungen). */

/** Default: 14 Tage mit Intensität 1.0 (neutral) */
export function defaultIntensityByDay(): number[] { return Array.from({length:14}, ()=>1); }
export function createInitialState(overrides: Partial<GameState> = {}): GameState {
  const base: GameState = {
    day: 1,
    kpi: emptyKpi(),
    kpiHistory: [],
    pendingDeltas: [],
    log: [],

    playerName: '',
    playerRole: 'CEO' as RoleId,
    playerRoles: ['CEO' as RoleId],

    burnPerDayEUR: -411,
    isOver: false,
    insolvency: false,

    engineMeta: { difficultyFactor: 1.0, intensityByDay: defaultIntensityByDay() }
  };
  const merged: GameState = {
    ...base,
    ...overrides,
    kpi: { ...base.kpi, ...(overrides.kpi || {}) },
    kpiHistory: overrides.kpiHistory ?? base.kpiHistory,
    pendingDeltas: overrides.pendingDeltas ?? base.pendingDeltas,
    log: overrides.log ?? base.log,
    engineMeta: { ...(base.engineMeta || {}), ...(overrides.engineMeta || {}) }
  };
  return merged;
}

/** Additiv ein pending KPI-Delta anhängen. */
export function addPendingDelta(s: GameState, delta: Partial<KPI>): GameState {
  return { ...s, pendingDeltas: [...(s.pendingDeltas || []), delta] };
}

/** Ein geplantes Delta in EngineMeta für einen Tag eintragen (immutable). */
export function scheduleDelta(meta: EngineMeta | undefined, day: number, delta: Partial<KPI>): EngineMeta {
  const m: EngineMeta = { ...(meta || {}) };
  const sched = (m.scheduledDeltas = m.scheduledDeltas || {});
  (sched[day] = sched[day] || []).push(delta);
  return m;
}

/**
 * Einfache Zufalls-News-Erzeugung als Fallback.
 * Diese Funktion ist optional; falls Ihr Projekt bereits eine spezialisierte
 * Generator-Logik hat, können Sie diese hier ersetzen.
 */
export function generateRandomNewsForDay(state: GameState): DayNewsItem[] {
  const rng = currentRng();
  const chance = rng();
  const items: DayNewsItem[] = [] as DayNewsItem[];
  // 40% Wahrscheinlichkeit, eine kurze Random-News zu erzeugen
  if (chance < 0.4) {
    const sev = rng() < 0.5 ? 'info' : (rng() < 0.75 ? 'warn' : 'crit');
    const id = `rnd-${state.day}-${Math.floor(rng()*1e6)}`;
    const deltaHint = rng() < 0.5 ? 'Kundentreue' : (rng() < 0.5 ? 'Bankvertrauen' : 'Öffentliche Wahrnehmung');
    const text = `Marktgerücht (${deltaHint}): Interne Quellen berichten von Bewegung – mögliche Auswirkungen auf die Stakeholder-Stimmung.`;
    items.push({
      id, day: state.day,
      title: 'Gerüchte im Markt',
      body: text,
      severity: sev as any
    } as DayNewsItem);
  }
  return items;
}
/** Zufallswerte-Generator für tägliche Cash/P&L Schwankungen mit Sicherheitsgrenzen */
export function generateDailyRandomValues(currentCash?: number): DailyRandomValues {
  const rng = currentRng();
  
  // Konservativere Basis-Ranges
  let cashInflow = Math.round(rng() * 40000 + 10000);   // 10k-50k EUR
  let cashOutflow = Math.round(rng() * 35000 + 8000);   // 8k-43k EUR
  
  // Wenn Cash bekannt ist, Outflow begrenzen
  if (currentCash !== undefined) {
    // Nie mehr als 50% des verfügbaren Cash als Zufalls-Outflow
    const maxSafeOutflow = Math.max(0, Math.round(currentCash * 0.5));
    
    // Wenn Cash unter 20k: sehr konservativ
    if (currentCash < 20000) {
      cashOutflow = Math.min(cashOutflow, Math.round(currentCash * 0.2)); // max 20% bei niedrigem Cash
      cashInflow = Math.round(cashInflow * 1.2); // Zuflüsse leicht erhöhen
    } else {
      cashOutflow = Math.min(cashOutflow, maxSafeOutflow);
    }
    
    // Bei negativem oder sehr niedrigem Cash: nur Zuflüsse
    if (currentCash <= 5000) {
      cashOutflow = 0;
      cashInflow = Math.round(rng() * 30000 + 20000); // 20k-50k Notfall-Zufluss
    }
  }
  
  const cashNet = cashInflow - cashOutflow;
  
  // P&L bleibt unverändert
  const plInflow = Math.round(rng() * 40000 + 8000);
  const plOutflow = Math.round(rng() * 35000 + 6000);
  const plNet = plInflow - plOutflow;
  
  return {
    cashInflow,
    cashOutflow,
    cashNet,
    plInflow,
    plOutflow,
    plNet
  };
}