// src/utils/validationUtils.ts
// Validierungs-Utilities für Input-Validierung und Boundary-Checks

import type { KPI } from '@/core/models/domain';
import type { ScoringWeights, CreditSettings } from '@/types/core';

// =============================================================================
// Numeric Validation
// =============================================================================

export interface NumericConstraints {
  min?: number;
  max?: number;
  integer?: boolean;
  allowNegative?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  value?: number;
}

export function validateNumber(
  value: unknown,
  constraints: NumericConstraints = {}
): ValidationResult {
  const {
    min,
    max,
    integer = false,
    allowNegative = true
  } = constraints;

  // Konvertiere zu Zahl
  const num = Number(value);

  // Prüfe ob Zahl
  if (!Number.isFinite(num)) {
    return {
      isValid: false,
      error: 'Der Wert muss eine gültige Zahl sein'
    };
  }

  // Prüfe Integer
  if (integer && !Number.isInteger(num)) {
    return {
      isValid: false,
      error: 'Der Wert muss eine ganze Zahl sein'
    };
  }

  // Prüfe Negativ
  if (!allowNegative && num < 0) {
    return {
      isValid: false,
      error: 'Der Wert darf nicht negativ sein'
    };
  }

  // Prüfe Minimum
  if (min !== undefined && num < min) {
    return {
      isValid: false,
      error: `Der Wert muss mindestens ${min} sein`
    };
  }

  // Prüfe Maximum
  if (max !== undefined && num > max) {
    return {
      isValid: false,
      error: `Der Wert darf maximal ${max} sein`
    };
  }

  return {
    isValid: true,
    value: num
  };
}

export function validateDay(day: unknown): ValidationResult {
  return validateNumber(day, {
    min: 1,
    max: 14,
    integer: true,
    allowNegative: false
  });
}

export function validatePercentage(value: unknown): ValidationResult {
  return validateNumber(value, {
    min: 0,
    max: 100,
    allowNegative: false
  });
}

export function validateCurrency(value: unknown, allowNegative = true): ValidationResult {
  return validateNumber(value, {
    allowNegative
  });
}

// =============================================================================
// String Validation
// =============================================================================

export interface StringConstraints {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  allowEmpty?: boolean;
}

export interface StringValidationResult {
  isValid: boolean;
  error?: string;
  value?: string;
}

export function validateString(
  value: unknown,
  constraints: StringConstraints = {}
): StringValidationResult {
  const {
    minLength,
    maxLength,
    pattern,
    allowEmpty = true
  } = constraints;

  if (typeof value !== 'string') {
    return {
      isValid: false,
      error: 'Der Wert muss ein Text sein'
    };
  }

  const str = value.trim();

  if (!allowEmpty && str.length === 0) {
    return {
      isValid: false,
      error: 'Dieses Feld darf nicht leer sein'
    };
  }

  if (minLength !== undefined && str.length < minLength) {
    return {
      isValid: false,
      error: `Der Text muss mindestens ${minLength} Zeichen lang sein`
    };
  }

  if (maxLength !== undefined && str.length > maxLength) {
    return {
      isValid: false,
      error: `Der Text darf maximal ${maxLength} Zeichen lang sein`
    };
  }

  if (pattern && !pattern.test(str)) {
    return {
      isValid: false,
      error: 'Der Text entspricht nicht dem erforderlichen Format'
    };
  }

  return {
    isValid: true,
    value: str
  };
}

export function validateUsername(value: unknown): StringValidationResult {
  return validateString(value, {
    minLength: 3,
    maxLength: 20,
    allowEmpty: false,
    pattern: /^[a-zA-Z0-9_-]+$/
  });
}

export function validatePassword(value: unknown): StringValidationResult {
  return validateString(value, {
    minLength: 6,
    maxLength: 100,
    allowEmpty: false
  });
}

export function validateDisplayName(value: unknown): StringValidationResult {
  return validateString(value, {
    minLength: 1,
    maxLength: 50,
    allowEmpty: false
  });
}

// =============================================================================
// KPI Validation
// =============================================================================

export function validateKPIDelta(delta: Partial<KPI>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const [key, value] of Object.entries(delta)) {
    if (value === undefined) continue;

    if (typeof value !== 'number' || !Number.isFinite(value)) {
      errors.push(`${key}: Wert muss eine gültige Zahl sein`);
      continue;
    }

    // Warnung bei extremen Werten
    if (key === 'cashEUR' || key === 'profitLossEUR') {
      if (Math.abs(value) > 10000000) {
        errors.push(`${key}: Wert ist ungewöhnlich hoch (${value})`);
      }
    } else {
      // KPI-Prozent-Werte
      if (Math.abs(value) > 100) {
        errors.push(`${key}: Delta darf nicht größer als ±100 sein (${value})`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateKPI(kpi: KPI): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Prüfe ob alle Felder vorhanden
  const requiredFields: (keyof KPI)[] = [
    'cashEUR',
    'profitLossEUR',
    'customerLoyalty',
    'bankTrust',
    'workforceEngagement',
    'publicPerception'
  ];

  for (const field of requiredFields) {
    if (kpi[field] === undefined) {
      errors.push(`${field} fehlt`);
      continue;
    }

    if (typeof kpi[field] !== 'number' || !Number.isFinite(kpi[field])) {
      errors.push(`${field} muss eine gültige Zahl sein`);
    }
  }

  // Prüfe Prozent-Werte
  const percentFields: (keyof KPI)[] = [
    'customerLoyalty',
    'bankTrust',
    'workforceEngagement',
    'publicPerception'
  ];

  for (const field of percentFields) {
    const value = kpi[field];
    if (typeof value === 'number') {
      if (value < 0 || value > 100) {
        errors.push(`${field} muss zwischen 0 und 100 liegen (ist ${value})`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// =============================================================================
// Configuration Validation
// =============================================================================

export function validateScoringWeights(weights: Partial<ScoringWeights>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const fields: (keyof ScoringWeights)[] = [
    'bankTrust',
    'publicPerception',
    'customerLoyalty',
    'workforceEngagement'
  ];

  for (const field of fields) {
    const value = weights[field];

    if (value === undefined) {
      errors.push(`${field} fehlt`);
      continue;
    }

    const result = validateNumber(value, { min: 0, max: 100, allowNegative: false });
    if (!result.isValid) {
      errors.push(`${field}: ${result.error}`);
    }
  }

  // Prüfe Summe
  if (errors.length === 0) {
    const sum = (weights.bankTrust ?? 0) +
                (weights.publicPerception ?? 0) +
                (weights.customerLoyalty ?? 0) +
                (weights.workforceEngagement ?? 0);

    if (Math.abs(sum - 100) > 0.1) {
      errors.push(`Die Summe der Gewichte muss 100% ergeben (ist ${sum.toFixed(1)}%)`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCreditSettings(settings: Partial<CreditSettings>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (settings.enabled === undefined) {
    errors.push('enabled fehlt');
  } else if (typeof settings.enabled !== 'boolean') {
    errors.push('enabled muss ein Boolean sein');
  }

  if (settings.creditLineEUR !== undefined) {
    const result = validateCurrency(settings.creditLineEUR, false);
    if (!result.isValid) {
      errors.push(`creditLineEUR: ${result.error}`);
    } else if (result.value !== undefined && result.value > 10000000) {
      errors.push('creditLineEUR: Wert ist ungewöhnlich hoch');
    }
  }

  if (settings.interestRatePct !== undefined) {
    const result = validateNumber(settings.interestRatePct, { min: 0, max: 100, allowNegative: false });
    if (!result.isValid) {
      errors.push(`interestRatePct: ${result.error}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateRoundTime(seconds: unknown): ValidationResult {
  return validateNumber(seconds, {
    min: 10,
    max: 7200,
    integer: true,
    allowNegative: false
  });
}

export function validateCountdownTime(seconds: unknown): ValidationResult {
  return validateNumber(seconds, {
    min: 0,
    max: 300,
    integer: true,
    allowNegative: false
  });
}

// =============================================================================
// JSON Validation
// =============================================================================

export function validateJSON(text: string): { isValid: boolean; error?: string; data?: unknown } {
  try {
    const data = JSON.parse(text);
    return {
      isValid: true,
      data
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Ungültiges JSON-Format'
    };
  }
}

export interface ScenarioValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateScenarioImport(data: unknown): ScenarioValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Szenario-Daten müssen ein Objekt sein');
    return { isValid: false, errors, warnings };
  }

  const scenario = data as Record<string, unknown>;

  // Prüfe scheduledDeltas
  if (scenario.scheduledDeltas !== undefined) {
    if (typeof scenario.scheduledDeltas !== 'object') {
      errors.push('scheduledDeltas muss ein Objekt sein');
    } else {
      const deltas = scenario.scheduledDeltas as Record<string, unknown>;
      for (const [day, dayDeltas] of Object.entries(deltas)) {
        const dayNum = Number(day);
        if (!Number.isInteger(dayNum) || dayNum < 1 || dayNum > 14) {
          errors.push(`Ungültiger Tag in scheduledDeltas: ${day}`);
          continue;
        }

        if (!Array.isArray(dayDeltas)) {
          errors.push(`scheduledDeltas für Tag ${day} muss ein Array sein`);
          continue;
        }

        for (let i = 0; i < dayDeltas.length; i++) {
          const delta = dayDeltas[i];
          if (typeof delta !== 'object' || delta === null) {
            errors.push(`scheduledDeltas Tag ${day} Index ${i}: Muss ein Objekt sein`);
            continue;
          }

          const validation = validateKPIDelta(delta as Partial<KPI>);
          if (!validation.isValid) {
            errors.push(`scheduledDeltas Tag ${day} Index ${i}: ${validation.errors.join(', ')}`);
          }
        }
      }
    }
  }

  // Prüfe randomNews
  if (scenario.randomNews !== undefined) {
    if (typeof scenario.randomNews !== 'object') {
      errors.push('randomNews muss ein Objekt sein');
    } else {
      const news = scenario.randomNews as Record<string, unknown>;
      for (const [day, dayNews] of Object.entries(news)) {
        const dayNum = Number(day);
        if (!Number.isInteger(dayNum) || dayNum < 1 || dayNum > 14) {
          errors.push(`Ungültiger Tag in randomNews: ${day}`);
          continue;
        }

        if (!Array.isArray(dayNews)) {
          errors.push(`randomNews für Tag ${day} muss ein Array sein`);
          continue;
        }

        for (let i = 0; i < dayNews.length; i++) {
          const newsItem = dayNews[i];
          if (typeof newsItem !== 'object' || newsItem === null) {
            errors.push(`randomNews Tag ${day} Index ${i}: Muss ein Objekt sein`);
            continue;
          }

          const item = newsItem as Record<string, unknown>;
          if (!item.id || typeof item.id !== 'string') {
            warnings.push(`randomNews Tag ${day} Index ${i}: Fehlende oder ungültige ID`);
          }
          if (!item.text || typeof item.text !== 'string') {
            errors.push(`randomNews Tag ${day} Index ${i}: Fehlender oder ungültiger Text`);
          }
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// =============================================================================
// Batch Validation
// =============================================================================

export function validateBatch<T>(
  items: T[],
  validator: (item: T) => { isValid: boolean; error?: string }
): { allValid: boolean; errors: Array<{ index: number; error: string }> } {
  const errors: Array<{ index: number; error: string }> = [];

  for (let i = 0; i < items.length; i++) {
    const result = validator(items[i]);
    if (!result.isValid && result.error) {
      errors.push({ index: i, error: result.error });
    }
  }

  return {
    allValid: errors.length === 0,
    errors
  };
}
