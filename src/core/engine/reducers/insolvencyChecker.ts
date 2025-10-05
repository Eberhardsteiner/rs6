// src/core/engine/reducers/insolvencyChecker.ts
// Zentrale Insolvenz-Prüfungslogik

import type { KPI } from '@/core/models/domain';
import type { InsolvencyRule } from '@/types/global';

export interface InsolvencyCheckResult {
  isInsolvent: boolean;
  triggeredRules: string[];
  reason?: string;
}

export function checkCashInsolvency(
  cashEUR: number,
  mode: 'off' | 'cash' | 'rules' | 'both' | 'hard'
): boolean {
  if (mode === 'off' || mode === 'rules') {
    return false;
  }

  return cashEUR < 0;
}

export function checkRuleBasedInsolvency(
  kpi: KPI,
  rules: InsolvencyRule[] | undefined,
  mode: 'off' | 'cash' | 'rules' | 'both' | 'hard'
): { isInsolvent: boolean; triggeredRules: string[] } {
  if (mode === 'off' || mode === 'cash') {
    return { isInsolvent: false, triggeredRules: [] };
  }

  if (!rules || rules.length === 0) {
    return { isInsolvent: false, triggeredRules: [] };
  }

  const triggeredRules: string[] = [];

  for (const rule of rules) {
    if (!rule.enabled) continue;

    const kpiKey = rule.kpiKey as keyof KPI;
    const kpiValue = kpi[kpiKey];

    if (typeof kpiValue !== 'number') continue;

    let triggered = false;

    switch (rule.operator) {
      case '<':
        triggered = kpiValue < rule.threshold;
        break;
      case '<=':
        triggered = kpiValue <= rule.threshold;
        break;
      case '>':
        triggered = kpiValue > rule.threshold;
        break;
      case '>=':
        triggered = kpiValue >= rule.threshold;
        break;
      case '==':
        triggered = kpiValue === rule.threshold;
        break;
      case '!=':
        triggered = kpiValue !== rule.threshold;
        break;
    }

    if (triggered) {
      const ruleName = rule.name || `${kpiKey} ${rule.operator} ${rule.threshold}`;
      triggeredRules.push(ruleName);
    }
  }

  return {
    isInsolvent: triggeredRules.length > 0,
    triggeredRules
  };
}

export function checkInsolvency(
  kpi: KPI,
  rules: InsolvencyRule[] | undefined,
  mode: 'off' | 'cash' | 'rules' | 'both' | 'hard' = 'both'
): InsolvencyCheckResult {
  if (mode === 'off') {
    return {
      isInsolvent: false,
      triggeredRules: []
    };
  }

  const cashCheck = checkCashInsolvency(kpi.cashEUR, mode);
  const ruleCheck = checkRuleBasedInsolvency(kpi, rules, mode);

  const isCashInsolvent = cashCheck;
  const isRuleInsolvent = ruleCheck.isInsolvent;

  let isInsolvent = false;
  let reason: string | undefined;

  if (mode === 'cash') {
    isInsolvent = isCashInsolvent;
    if (isInsolvent) {
      reason = 'Liquidität unter 0 EUR';
    }
  } else if (mode === 'rules') {
    isInsolvent = isRuleInsolvent;
    if (isInsolvent) {
      reason = `Insolvenzregeln ausgelöst: ${ruleCheck.triggeredRules.join(', ')}`;
    }
  } else if (mode === 'both' || mode === 'hard') {
    isInsolvent = isCashInsolvent || isRuleInsolvent;

    if (isCashInsolvent && isRuleInsolvent) {
      reason = `Liquidität unter 0 EUR UND Insolvenzregeln: ${ruleCheck.triggeredRules.join(', ')}`;
    } else if (isCashInsolvent) {
      reason = 'Liquidität unter 0 EUR';
    } else if (isRuleInsolvent) {
      reason = `Insolvenzregeln ausgelöst: ${ruleCheck.triggeredRules.join(', ')}`;
    }
  }

  return {
    isInsolvent,
    triggeredRules: ruleCheck.triggeredRules,
    reason
  };
}

export function shouldTriggerInsolvency(
  kpi: KPI,
  rules: InsolvencyRule[] | undefined,
  mode: 'off' | 'cash' | 'rules' | 'both' | 'hard' = 'both',
  negCashStreak: number = 0,
  streakThreshold: number = 3
): InsolvencyCheckResult {
  const result = checkInsolvency(kpi, rules, mode);

  if (mode === 'cash' || mode === 'both' || mode === 'hard') {
    if (kpi.cashEUR < 0 && negCashStreak < streakThreshold) {
      return {
        isInsolvent: false,
        triggeredRules: [],
        reason: `Liquidität negativ (${negCashStreak + 1}/${streakThreshold} Tage)`
      };
    }
  }

  return result;
}

export function formatInsolvencyReason(result: InsolvencyCheckResult): string {
  if (!result.isInsolvent) {
    return 'Kein Insolvenzgrund';
  }

  if (result.reason) {
    return result.reason;
  }

  if (result.triggeredRules.length > 0) {
    return `Insolvenzregeln ausgelöst: ${result.triggeredRules.join(', ')}`;
  }

  return 'Insolvenz festgestellt';
}

export function getInsolvencyWarningLevel(
  kpi: KPI,
  rules: InsolvencyRule[] | undefined,
  mode: 'off' | 'cash' | 'rules' | 'both' | 'hard'
): 'none' | 'warning' | 'critical' {
  if (mode === 'off') {
    return 'none';
  }

  const result = checkInsolvency(kpi, rules, mode);

  if (result.isInsolvent) {
    return 'critical';
  }

  if (kpi.cashEUR < 100000) {
    return 'warning';
  }

  const lowKPIs = [
    kpi.bankTrust < 30,
    kpi.customerLoyalty < 30,
    kpi.workforceEngagement < 30,
    kpi.publicPerception < 30
  ].filter(Boolean).length;

  if (lowKPIs >= 2) {
    return 'warning';
  }

  return 'none';
}
