// src/admin/adminBridge.ts
import { makeRng } from '@/core/utils/prng';
import type { AdminSettingsDetail } from '@/types/global';

/**
 * Initialisiert globale Flags/Settings beim App-Start aus LocalStorage.
 * Wird als Side-Effect in App.tsx importiert:  import 'src/admin/adminBridge';
 *
 * Hinweis: Keine Typ-Imports aus AdminPanel, um Zirkularität zu vermeiden.
 */

const LS_KEY_SETTINGS = 'adminSettings';
const LS_KEY_INV      = 'admin:invariants';
const LS_KEY_SEED     = 'admin:seed';

// Ergänzung: Minimale Typen für Insolvenz-Regeln
export type InsolvencyRuleLite = { key: string; enabled: boolean; threshold: number };
export type InsolvencyRulesMapLite = Record<string, InsolvencyRuleLite>;

/** Minimale Struktur, wie sie im AdminPanel persistiert wird. */
type InsolvencyMode = 'hard'|'soft'|'off';
type Difficulty = 'easy'|'normal'|'hard';

interface ScoringWeights {
  bankTrust: number;
  publicPerception: number;
  customerLoyalty: number;
  workforceEngagement: number;
}

interface AdminSettingsLite {
  roundTimeMode?: 'off'|'global'|'matrix';
  roundTimeGlobalSec?: number;
  roundTimeGraceSec?: number;
  roundTimeMatrix?: Record<number, Partial<Record<'CEO'|'CFO'|'OPS'|'HRLEGAL', number>>>;
  bank?: { creditLineEUR?: number; interestRatePct?: number };
  features?: {
    saveLoadMenu?: boolean;
    autoSave?: boolean;
    coach?: boolean;
    bankMechanics?: boolean;
    whatIfPreview?: boolean;
    eventIntensity?: boolean;
  };
  insolvencyMode?: InsolvencyMode;
  difficulty?: Difficulty;
  randomNews?: boolean;
  scoringWeights?: Partial<ScoringWeights>;
  adaptiveDifficultyLight?: boolean;
  leakage?: Record<string, number>;
  eventIntensityByDay?: number[];
  insolvencyConfig?: {
    rules?: Record<string, InsolvencyRuleLite>;
  };
}

/** Normalisiert Gewichte auf Summe 100 (ganzzahlig). */
function normalizeWeights(w?: Partial<ScoringWeights>): ScoringWeights {
  const base: ScoringWeights = {
    bankTrust: Math.round(w?.bankTrust ?? 25),
    publicPerception: Math.round(w?.publicPerception ?? 25),
    customerLoyalty: Math.round(w?.customerLoyalty ?? 25),
    workforceEngagement: Math.round(w?.workforceEngagement ?? 25),
  };
  const sum = base.bankTrust + base.publicPerception + base.customerLoyalty + base.workforceEngagement;
  if (sum <= 0) return { bankTrust:25, publicPerception:25, customerLoyalty:25, workforceEngagement:25 };
  const f = 100 / sum;
  return {
    bankTrust: Math.round(base.bankTrust * f),
    publicPerception: Math.round(base.publicPerception * f),
    customerLoyalty: Math.round(base.customerLoyalty * f),
    workforceEngagement: Math.round(base.workforceEngagement * f),
  };
}

/** Robust parse helper */
function readJSON<T>(raw: string | null): T | null {
  if (!raw) return null;
  try { return JSON.parse(raw) as T; } catch { return null; }
}

/** Überträgt Settings aus AdminSettingsLite in globale Flags/Variablen. */
export function applyAdminSettings(s: AdminSettingsLite | null | undefined) {
  const g = globalThis;
  if (!s) return;

  // Grundlegende Modi / Flags
  if (s.insolvencyMode) g.__insolvencyMode = s.insolvencyMode;

  // NEU: Schwierigkeit nur noch für Multiplayer führen
  if (s.difficulty) {
    g.__mpDifficulty = s.difficulty;
    // Legacy-Flags bewusst neutralisieren, damit SP/NPC unbeeinflusst bleiben
    delete g.__mode;
    delete g.__npcDifficulty;
  }

  if (typeof s.randomNews === 'boolean') g.__randomNews = !!s.randomNews;

  // Feature-Flags
  const feat = s.features || {};
  if (typeof feat.coach === 'boolean') g.__featureCoach = !!feat.coach;
  if (typeof feat.bankMechanics === 'boolean') g.__featureBankMechanics = !!feat.bankMechanics;
  if (typeof feat.saveLoadMenu === 'boolean') g.__featureSaveLoadMenu = !!feat.saveLoadMenu;
  if (typeof feat.autoSave === 'boolean') g.__featureAutoSave = !!feat.autoSave;
  if (typeof feat.whatIfPreview === 'boolean') g.__featureWhatIfPreview = !!feat.whatIfPreview;
  if (typeof feat.eventIntensity === 'boolean') g.__featureEventIntensity = !!feat.eventIntensity;
  if (Array.isArray(s.eventIntensityByDay)) g.__eventIntensityByDay = s.eventIntensityByDay;

  // Bank-Settings
  if (s.bank) {
    const credit = Number(s.bank.creditLineEUR || 0);
    const rate   = Number(s.bank.interestRatePct || 0);
    g.__bankCreditLineEUR   = credit;
    g.__bankInterestRatePct = rate;
    g.__bankSettings = { creditLineEUR: credit, interestRatePct: rate };
  }

  // Adaptive Difficulty (Light)
  g.__adaptiveDifficultyLightEnabled = !!s.adaptiveDifficultyLight;

  // Endscore-Gewichte
  g.__scoringWeights = normalizeWeights(s.scoringWeights);
  // Insolvenz-Regeln global setzen (aus persistenten Admin-Settings)
  try { globalThis.__insolvencyRules = s?.insolvencyConfig?.rules || globalThis.__insolvencyRules || {}; } catch {}

  // Rundenzeiten (optional)
  g.__roundTimeMode = s.roundTimeMode || 'off';
  g.__roundTimeGlobalSec = (typeof s.roundTimeGlobalSec === 'number' && s.roundTimeGlobalSec > 0) ? s.roundTimeGlobalSec : undefined;
  g.__roundTimeGraceSec = (typeof s.roundTimeGraceSec === 'number' && s.roundTimeGraceSec >= 0) ? s.roundTimeGraceSec : undefined;
  g.__roundTimeMatrix = (s.roundTimeMatrix && typeof s.roundTimeMatrix === 'object') ? s.roundTimeMatrix : undefined;

  // Optionale „Leakage"-Konfigurationen (durchreichen)
  if (s.leakage && typeof s.leakage === 'object') {
    g.__leakageRole = { ...(g.__leakageRole || {}), ...s.leakage };
  }

  // Events für Live-Aktualisierung
  try { window.dispatchEvent(new CustomEvent<AdminSettingsDetail>('admin:settings', { detail: s as AdminSettingsDetail })); } catch {}
}

/** Lädt Settings aus LocalStorage (falls vorhanden). */
export function loadAdminSettings(): AdminSettingsLite | null {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(LS_KEY_SETTINGS) : null;
  return readJSON<AdminSettingsLite>(raw);
}

/** Invarianten (optional) laden und anwenden. */
export function applyInvariantsFromStorage() {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(LS_KEY_INV) : null;
  const o = readJSON<Record<string, boolean | number | string>>(raw) || {};

  const g = globalThis;
  g.__invariants = {
    optional: {
      pp_penalty_on_neg_cash:            !!o.ppPenaltyOnNegCash,
      loyalty_penalty_on_neg_cash:       !!o.loyaltyPenaltyOnNegCash,
      payroll_delay_we_minus10:          !!o.payrollDelay_weMinus10,
      loss5_banktrust_minus8:            !!o.loss5_bankTrustMinus8,
      loss5_publicperception_minus5:     !!o.loss5_publicPerceptionMinus5,
      loss5_customerloyalty_minus5:      !!o.loss5_customerLoyaltyMinus5,
      banktrust_lt10_workengagement_minus10: !!o.bankTrustLt10_workEngagementMinus10,
      banktrust_lt10_publicperception_minus10: !!o.bankTrustLt10_publicPerceptionMinus10,
      profit5_banktrust_plus8:           !!o.profit5_bankTrustPlus8,
      profit5_publicperception_plus8:    !!o.profit5_publicPerceptionPlus8,
      profit5_customerloyalty_plus8:     !!o.profit5_customerLoyaltyPlus8,
      banktrust_gt80_workengagement_plus10: !!o.bankTrustGt80_workEngagementPlus10,
      banktrust_gt80_publicperception_plus80: !!o.bankTrustGt80_publicPerceptionPlus80,
    }
  };

  try { window.dispatchEvent(new CustomEvent<Record<string, unknown>>('admin:invariants', { detail: o })); } catch {}
}

/** Seed laden und PRNG initialisieren (deterministische Reproduzierbarkeit). */
export function applySeedFromStorage() {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(LS_KEY_SEED) : null;
  const seed = raw != null ? Number(raw) : NaN;
  if (!Number.isFinite(seed)) return;
  const rng = makeRng(Number(seed));
  globalThis.__rng = rng;
  try { window.dispatchEvent(new CustomEvent<{ seed: number }>('admin:seed', { detail: { seed: Number(seed) } })); } catch {}
}

/** Settings speichern (Hilfsfunktion) + sofort anwenden. */
export function saveAdminSettings(s: AdminSettingsLite) {
  try { localStorage.setItem(LS_KEY_SETTINGS, JSON.stringify(s)); } catch {}
  applyAdminSettings(s);
}

/** Beim Import einmalig ausführen: Settings + Invarianten + Seed anwenden. */
const __bootSettings = loadAdminSettings();
applyAdminSettings(__bootSettings);
applyInvariantsFromStorage();
applySeedFromStorage();
applyPendingDrawFromStorage();

/** Pending-Kredit Inanspruchnahme aus Storage laden (für heutige Insolvenzbewertung). */
export function applyPendingDrawFromStorage() {
  try {
    const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem('bank:pendingDraw') : null;
    const n = raw != null ? Number(raw) : NaN;
    globalThis.__bankPendingDrawEUR = Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    globalThis.__bankPendingDrawEUR = 0;
  }
  try { window.dispatchEvent(new CustomEvent('bank:pending-draw', { detail: { amount: globalThis.__bankPendingDrawEUR || 0 } })); } catch {}
}
