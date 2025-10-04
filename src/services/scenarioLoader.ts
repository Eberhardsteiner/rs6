// src/services/scenarioLoader.ts
import type { KPI } from '@/core/models/domain';
import type { NewsItem, NewsCategory, NewsSeverity, NewsSign } from '@/core/engine/randomNews';

/**
 * Datentypen für Szenarien / Events (JSON).
 */
export type KpiKey = keyof KPI;
export type KpiRuleOp = '<' | '<=' | '>' | '>=' | '==' | '!=';

export type KpiRule = {
  key: KpiKey;
  op: KpiRuleOp;
  value: number;
};

export type ConditionSet = {
  /** Falls gesetzt, muss day == day sein. */
  day?: number;
  /** Inklusive Grenzen. */
  minDay?: number;
  maxDay?: number;
  /** KPI-Regeln, die *alle* erfüllt sein müssen (UND-Verknüpfung). */
  kpi?: KpiRule[];
};

export type ScenarioEvent = {
  id?: string;
  day: number;
  title: string;
  text: string;
  /** Kategorie für den News-Feed; default: 'oeffentlichkeit'. */
  category?: NewsCategory | 'bank'|'supplier'|'customer'|'press'|'internal'|'authority';
  /** Optional, sonst automatisch aus impact abgeleitet. */
  severity?: NewsSeverity;
  sign?: NewsSign;
  /** KPI-Wirkung dieses Events (wirkt am Tag `day`). */
  impact: Partial<KPI>;
  /** Bedingungen (optional). */
  conditions?: ConditionSet;
};

export type ScenarioJSON = {
  meta?: { title?: string; version?: number; author?: string; notes?: string };
  events: ScenarioEvent[];
};

export type CompiledScenario = {
  randomNews: Record<number, Array<NewsItem & { conditions?: ConditionSet }>>;
  scheduledDeltas: Record<number, Array<Partial<KPI> | { impact: Partial<KPI>; conditions?: ConditionSet; sourceId?: string }>>;
  meta?: ScenarioJSON['meta'];
};

/** Hilfsfunktion: Summe aller KPI-Deltas bzgl. Vorzeichen. */
function sumImpact(impact: Partial<KPI>): number {
  let s = 0;
  for (const k of Object.keys(impact) as (keyof KPI)[]) {
    const v = (impact as any)[k];
    if (typeof v === 'number' && Number.isFinite(v)) s += v;
  }
  return s;
}

/** Mapping alternativer Kategorienamen → NewsCategory. */
function normalizeCategory(cat?: ScenarioEvent['category']): NewsCategory {
  switch (cat) {
    case 'bank': return 'finanzen';
    case 'supplier': return 'kunden'; // Lieferanten ↔ Kundenumfeld im Feed
    case 'customer': return 'kunden';
    case 'press': return 'oeffentlichkeit';
    case 'internal': return 'belegschaft';
    case 'authority': return 'finanzen';
    default:
      return (cat as NewsCategory) || 'oeffentlichkeit';
  }
}

/** Kleines Validator-Set ohne Fremdbibliotheken. */
export function validateScenario(obj: any): { ok: true; scenario: ScenarioJSON } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (typeof obj !== 'object' || !obj) {
    return { ok: false, errors: ['Root ist kein Objekt'] };
  }
  if (!Array.isArray(obj.events)) {
    return { ok: false, errors: ['events: Array fehlt'] };
  }
  const events: ScenarioEvent[] = [];
  for (let i = 0; i < obj.events.length; i++) {
    const e = obj.events[i];
    const path = `events[${i}]`;
    if (typeof e !== 'object' || !e) { errors.push(`${path} ist kein Objekt`); continue; }
    const day = Number(e.day);
    if (!Number.isFinite(day) || day < 1) errors.push(`${path}.day muss Zahl ≥ 1 sein`);
    if (typeof e.title !== 'string' || !e.title.trim()) errors.push(`${path}.title fehlt`);
    if (typeof e.text !== 'string' || !e.text.trim()) errors.push(`${path}.text fehlt`);
    if (typeof e.impact !== 'object' || !e.impact) errors.push(`${path}.impact fehlt`);
    // Impact-Felder normalisieren
    const impact: Partial<KPI> = {};
    for (const key of ['cashEUR','profitLossEUR','customerLoyalty','bankTrust','workforceEngagement','publicPerception'] as (keyof KPI)[]) {
      const vRaw = (e.impact ?? ({} as any))[key];
      if (typeof vRaw === 'number' && Number.isFinite(vRaw) && vRaw !== 0) {
        (impact as any)[key] = Math.round(vRaw);
      }
    }
    const conditions: ConditionSet | undefined = (() => {
      const c = e.conditions;
      if (!c || typeof c !== 'object') return undefined;
      const out: ConditionSet = {};
      const num = (x: any) => (typeof x === 'number' && Number.isFinite(x)) ? x : undefined;
      if (num(c.day) !== undefined) out.day = num(c.day)!;
      if (num(c.minDay) !== undefined) out.minDay = num(c.minDay)!;
      if (num(c.maxDay) !== undefined) out.maxDay = num(c.maxDay)!;
      if (Array.isArray(c.kpi)) {
        const rules: KpiRule[] = [];
        for (const r of c.kpi) {
          if (!r || typeof r !== 'object') continue;
          const key = r.key as KpiKey;
          const op  = r.op as KpiRuleOp;
          const val = Number(r.value);
          const allowedOps = ['<','<=','>','>=','==','!='] as const;
          const allowedKeys = ['cashEUR','profitLossEUR','customerLoyalty','bankTrust','workforceEngagement','publicPerception'] as const;
          if ((allowedKeys as readonly string[]).includes(key as string) && (allowedOps as readonly string[]).includes(op as any) && Number.isFinite(val)) {
            rules.push({ key, op, value: val });
          }
        }
        if (rules.length) out.kpi = rules;
      }
      return Object.keys(out).length ? out : undefined;
    })();
    events.push({
      id: typeof e.id === 'string' ? e.id : undefined,
      day,
      title: String(e.title || '').trim(),
      text: String(e.text || '').trim(),
      category: normalizeCategory(e.category),
      severity: (['low','mid','high'] as const).includes(e.severity) ? e.severity : undefined,
      sign: (['+','-'] as const).includes(e.sign as any) ? (e.sign as NewsSign) : undefined,
      impact,
      conditions
    });
  }
  if (errors.length) return { ok: false, errors };
  return { ok: true, scenario: { meta: obj.meta ?? {}, events } };
}

/** Kompiliert validierte Events in EngineMeta-Strukturen. */
export function compileScenario(json: ScenarioJSON): CompiledScenario {
  const randomNews: CompiledScenario['randomNews'] = {};
  const scheduledDeltas: CompiledScenario['scheduledDeltas'] = {};
  for (const e of json.events) {
    const severity = e.severity || 'mid';
    const sum = sumImpact(e.impact || {});
    const sign: NewsSign = e.sign || (sum >= 0 ? '+' : '-');
    const cat = normalizeCategory(e.category);
    // Random-News-Eintrag (für UI und Wirkungen)
    const news: NewsItem & { conditions?: ConditionSet } = {
      id: e.id || `ev-${e.day}-${(Math.random()*1e9|0).toString(36)}`,
      day: e.day,
      category: cat,
      title: e.title,
      text: e.text,
      severity,
      sign,
      impact: e.impact || {},
      conditions: e.conditions
    };
    (randomNews[e.day] = randomNews[e.day] || []).push(news);
    // Scheduled Delta (gleiche Wirkung; ermöglicht Trennung von UI und Logik)
    const schedItem = e.conditions ? { impact: e.impact || {}, conditions: e.conditions, sourceId: news.id } : (e.impact || {});
    (scheduledDeltas[e.day] = scheduledDeltas[e.day] || []).push(schedItem);
  }
  return { randomNews, scheduledDeltas, meta: json.meta };
}

/** Lädt und validiert JSON aus Text. */
export function parseScenarioFromText(text: string): { ok: true; compiled: CompiledScenario; json: ScenarioJSON } | { ok: false; errors: string[] } {
  try {
    const obj = JSON.parse(text);
    const val = validateScenario(obj);
    if (!val.ok) return { ok: false, errors: val.errors };
    const compiled = compileScenario(val.scenario);
    return { ok: true, compiled, json: val.scenario };
  } catch (e: any) {
    return { ok: false, errors: ['JSON-Parse-Fehler: ' + String(e?.message || e)] };
  }
}

/** Browser-Helfer: Datei einlesen. */
export async function loadScenarioFromFile(file: File) {
  const text = await file.text();
  return parseScenarioFromText(text);
}

/** Export: Aus dem Editor-Modell wieder JSON erzeugen. */
export function buildScenarioJson(events: ScenarioEvent[], meta?: ScenarioJSON['meta']): ScenarioJSON {
  return { meta, events };
}
