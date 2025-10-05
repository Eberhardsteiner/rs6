// src/utils/scenarioUtils.ts
// Utility-Funktionen für Szenario-Management (Import/Export/Override)

import type { KPI } from '@/core/models/domain';
import type { ScenarioOverrides } from '@/types/core';
import { validateScenarioImport, validateJSON } from './validationUtils';
import { errorHandler } from './errorHandler';

// =============================================================================
// Scenario Import/Export
// =============================================================================

export interface ParsedScenario {
  scheduledDeltas?: Record<number, Array<Partial<KPI>>>;
  randomNews?: Record<number, unknown[]>;
  meta?: Record<string, unknown>;
}

export interface ScenarioParseResult {
  success: boolean;
  data?: ParsedScenario;
  errors?: string[];
  warnings?: string[];
}

export function parseScenarioJSON(jsonText: string): ScenarioParseResult {
  try {
    // Validate JSON
    const jsonResult = validateJSON(jsonText);
    if (!jsonResult.isValid) {
      return {
        success: false,
        errors: [jsonResult.error || 'Invalid JSON']
      };
    }

    // Validate scenario structure
    const validation = validateScenarioImport(jsonResult.data);
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
        warnings: validation.warnings
      };
    }

    return {
      success: true,
      data: jsonResult.data as ParsedScenario,
      warnings: validation.warnings
    };
  } catch (error) {
    errorHandler.logError('scenarioUtils', 'Failed to parse scenario', error);
    return {
      success: false,
      errors: ['Unerwarteter Fehler beim Parsen des Szenarios']
    };
  }
}

export function exportScenarioToJSON(scenario: ParsedScenario): string {
  try {
    return JSON.stringify(scenario, null, 2);
  } catch (error) {
    errorHandler.logError('scenarioUtils', 'Failed to export scenario', error);
    throw new Error('Fehler beim Exportieren des Szenarios');
  }
}

export function downloadScenario(scenario: ParsedScenario, filename: string = 'scenario.json'): void {
  try {
    const json = exportScenarioToJSON(scenario);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    errorHandler.logError('scenarioUtils', 'Failed to download scenario', error);
    throw new Error('Fehler beim Herunterladen des Szenarios');
  }
}

// =============================================================================
// Scenario Merging
// =============================================================================

export function mergeScenarios(
  base: ParsedScenario,
  override: ParsedScenario
): ParsedScenario {
  const result: ParsedScenario = {
    scheduledDeltas: { ...base.scheduledDeltas },
    randomNews: { ...base.randomNews },
    meta: { ...base.meta, ...override.meta }
  };

  // Merge scheduled deltas
  if (override.scheduledDeltas) {
    for (const [day, deltas] of Object.entries(override.scheduledDeltas)) {
      const dayNum = Number(day);
      if (result.scheduledDeltas) {
        result.scheduledDeltas[dayNum] = [
          ...(result.scheduledDeltas[dayNum] || []),
          ...deltas
        ];
      }
    }
  }

  // Merge random news
  if (override.randomNews) {
    for (const [day, news] of Object.entries(override.randomNews)) {
      const dayNum = Number(day);
      if (result.randomNews) {
        result.randomNews[dayNum] = [
          ...(result.randomNews[dayNum] || []),
          ...news
        ];
      }
    }
  }

  return result;
}

export function replaceScenario(override: ParsedScenario): ParsedScenario {
  return {
    scheduledDeltas: override.scheduledDeltas ? { ...override.scheduledDeltas } : {},
    randomNews: override.randomNews ? { ...override.randomNews } : {},
    meta: override.meta ? { ...override.meta } : {}
  };
}

// =============================================================================
// Scenario Filtering
// =============================================================================

export function getScenarioForDay(scenario: ParsedScenario, day: number): {
  deltas: Array<Partial<KPI>>;
  news: unknown[];
} {
  return {
    deltas: scenario.scheduledDeltas?.[day] || [],
    news: scenario.randomNews?.[day] || []
  };
}

export function getScenarioDayRange(scenario: ParsedScenario): { min: number; max: number } | null {
  const deltaDays = scenario.scheduledDeltas ? Object.keys(scenario.scheduledDeltas).map(Number) : [];
  const newsDays = scenario.randomNews ? Object.keys(scenario.randomNews).map(Number) : [];
  const allDays = [...deltaDays, ...newsDays];

  if (allDays.length === 0) return null;

  return {
    min: Math.min(...allDays),
    max: Math.max(...allDays)
  };
}

export function countScenarioEvents(scenario: ParsedScenario): {
  totalDeltas: number;
  totalNews: number;
  dayCount: number;
} {
  let totalDeltas = 0;
  let totalNews = 0;
  const days = new Set<number>();

  if (scenario.scheduledDeltas) {
    for (const [day, deltas] of Object.entries(scenario.scheduledDeltas)) {
      days.add(Number(day));
      totalDeltas += deltas.length;
    }
  }

  if (scenario.randomNews) {
    for (const [day, news] of Object.entries(scenario.randomNews)) {
      days.add(Number(day));
      totalNews += news.length;
    }
  }

  return {
    totalDeltas,
    totalNews,
    dayCount: days.size
  };
}

// =============================================================================
// Scenario Validation Helpers
// =============================================================================

export function validateScenarioDay(day: number): boolean {
  return Number.isInteger(day) && day >= 1 && day <= 14;
}

export function cleanScenario(scenario: ParsedScenario): ParsedScenario {
  const result: ParsedScenario = {
    scheduledDeltas: {},
    randomNews: {},
    meta: { ...scenario.meta }
  };

  // Clean scheduled deltas
  if (scenario.scheduledDeltas) {
    for (const [day, deltas] of Object.entries(scenario.scheduledDeltas)) {
      const dayNum = Number(day);
      if (validateScenarioDay(dayNum) && deltas.length > 0) {
        result.scheduledDeltas![dayNum] = deltas.filter(delta =>
          delta && typeof delta === 'object'
        );
      }
    }
  }

  // Clean random news
  if (scenario.randomNews) {
    for (const [day, news] of Object.entries(scenario.randomNews)) {
      const dayNum = Number(day);
      if (validateScenarioDay(dayNum) && news.length > 0) {
        result.randomNews![dayNum] = news.filter(item =>
          item && typeof item === 'object'
        );
      }
    }
  }

  return result;
}

// =============================================================================
// Scenario Templates
// =============================================================================

export function createEmptyScenario(): ParsedScenario {
  return {
    scheduledDeltas: {},
    randomNews: {},
    meta: {
      name: 'Neues Szenario',
      created: new Date().toISOString(),
      version: '1.0'
    }
  };
}

export function createScenarioFromTemplate(template: 'crisis' | 'recovery' | 'stable'): ParsedScenario {
  const base = createEmptyScenario();
  base.meta = {
    ...base.meta,
    name: `${template} Template`,
    template
  };

  switch (template) {
    case 'crisis':
      // Negative impacts über mehrere Tage
      base.scheduledDeltas = {
        1: [{ customerLoyalty: -10, publicPerception: -15 }],
        3: [{ bankTrust: -20, cashEUR: -100000 }],
        5: [{ workforceEngagement: -15, publicPerception: -10 }]
      };
      break;

    case 'recovery':
      // Positive impacts zur Erholung
      base.scheduledDeltas = {
        7: [{ customerLoyalty: 15, publicPerception: 10 }],
        10: [{ bankTrust: 20, cashEUR: 150000 }],
        13: [{ workforceEngagement: 15, publicPerception: 15 }]
      };
      break;

    case 'stable':
      // Minimale Schwankungen
      base.scheduledDeltas = {
        5: [{ cashEUR: 50000 }],
        10: [{ cashEUR: 50000 }]
      };
      break;
  }

  return base;
}

// =============================================================================
// Scenario Comparison
// =============================================================================

export function compareScenarios(a: ParsedScenario, b: ParsedScenario): {
  addedDays: number[];
  removedDays: number[];
  modifiedDays: number[];
} {
  const daysA = new Set<number>();
  const daysB = new Set<number>();

  if (a.scheduledDeltas) {
    Object.keys(a.scheduledDeltas).forEach(day => daysA.add(Number(day)));
  }
  if (a.randomNews) {
    Object.keys(a.randomNews).forEach(day => daysA.add(Number(day)));
  }

  if (b.scheduledDeltas) {
    Object.keys(b.scheduledDeltas).forEach(day => daysB.add(Number(day)));
  }
  if (b.randomNews) {
    Object.keys(b.randomNews).forEach(day => daysB.add(Number(day)));
  }

  const added: number[] = [];
  const removed: number[] = [];
  const modified: number[] = [];

  daysB.forEach(day => {
    if (!daysA.has(day)) {
      added.push(day);
    } else {
      // Check if content changed
      const deltaA = JSON.stringify(a.scheduledDeltas?.[day] || []);
      const deltaB = JSON.stringify(b.scheduledDeltas?.[day] || []);
      const newsA = JSON.stringify(a.randomNews?.[day] || []);
      const newsB = JSON.stringify(b.randomNews?.[day] || []);

      if (deltaA !== deltaB || newsA !== newsB) {
        modified.push(day);
      }
    }
  });

  daysA.forEach(day => {
    if (!daysB.has(day)) {
      removed.push(day);
    }
  });

  return {
    addedDays: added.sort((a, b) => a - b),
    removedDays: removed.sort((a, b) => a - b),
    modifiedDays: modified.sort((a, b) => a - b)
  };
}
