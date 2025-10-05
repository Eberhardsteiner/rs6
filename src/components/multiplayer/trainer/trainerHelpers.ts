// src/components/multiplayer/trainer/trainerHelpers.ts
import type { KPI, RoleId } from '@/core/models/domain';

export interface Decision {
  id: string;
  game_id: string;
  player_id: string;
  day: number;
  block_id: string;
  option_id: string | null;
  custom_text: string | null;
  kpi_delta: Partial<KPI> | null;
  created_at: string;
  player?: { name: string; role: RoleId };
  decision_metadata?: { type?: string; [key: string]: unknown };
  metadata?: { type?: string; [key: string]: unknown };
}

export interface RoleImpact {
  cashEUR: number;
  profitLossEUR: number;
  customerLoyalty: number;
  bankTrust: number;
  workforceEngagement: number;
  publicPerception: number;
}

export const ROLES: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];

export function createEmptyRoleImpact(): RoleImpact {
  return {
    cashEUR: 0,
    profitLossEUR: 0,
    customerLoyalty: 0,
    bankTrust: 0,
    workforceEngagement: 0,
    publicPerception: 0
  };
}

export function aggregateImpactByRole(
  decisions: Decision[]
): Record<RoleId, RoleImpact> {
  const acc: Record<RoleId, RoleImpact> = {
    CEO: createEmptyRoleImpact(),
    CFO: createEmptyRoleImpact(),
    OPS: createEmptyRoleImpact(),
    HRLEGAL: createEmptyRoleImpact()
  };

  for (const dec of decisions) {
    const role = dec.player?.role;
    if (!role || !ROLES.includes(role)) continue;

    const delta = dec.kpi_delta;
    if (!delta || typeof delta !== 'object') continue;

    acc[role].cashEUR += delta.cashEUR || 0;
    acc[role].profitLossEUR += delta.profitLossEUR || 0;
    acc[role].customerLoyalty += delta.customerLoyalty || 0;
    acc[role].bankTrust += delta.bankTrust || 0;
    acc[role].workforceEngagement += delta.workforceEngagement || 0;
    acc[role].publicPerception += delta.publicPerception || 0;
  }

  return acc;
}

export function calculateTotalImpact(
  decisions: Decision[]
): RoleImpact {
  const total = createEmptyRoleImpact();

  for (const dec of decisions) {
    const delta = dec.kpi_delta;
    if (!delta || typeof delta !== 'object') continue;

    total.cashEUR += delta.cashEUR || 0;
    total.profitLossEUR += delta.profitLossEUR || 0;
    total.customerLoyalty += delta.customerLoyalty || 0;
    total.bankTrust += delta.bankTrust || 0;
    total.workforceEngagement += delta.workforceEngagement || 0;
    total.publicPerception += delta.publicPerception || 0;
  }

  return total;
}

export function getDecisionsForDay(
  decisions: Decision[],
  day: number
): Decision[] {
  return decisions.filter(d => d.day === day);
}

export function getDecisionsForRole(
  decisions: Decision[],
  role: RoleId
): Decision[] {
  return decisions.filter(d => d.player?.role === role);
}

export function getDecisionCount(decisions: Decision[]): Record<RoleId, number> {
  const counts: Record<RoleId, number> = {
    CEO: 0,
    CFO: 0,
    OPS: 0,
    HRLEGAL: 0
  };

  for (const dec of decisions) {
    const role = dec.player?.role;
    if (role && ROLES.includes(role)) {
      counts[role]++;
    }
  }

  return counts;
}

export function formatImpact(value: number, isFinancial: boolean = false): string {
  if (isFinancial) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  const sign = value > 0 ? '+' : '';
  return `${sign}${value}`;
}

export function getImpactColor(value: number): string {
  if (value > 0) return '#10b981';
  if (value < 0) return '#ef4444';
  return '#6b7280';
}

export function sortDecisionsByDate(decisions: Decision[]): Decision[] {
  return [...decisions].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
}

export function groupDecisionsByDay(
  decisions: Decision[]
): Record<number, Decision[]> {
  const grouped: Record<number, Decision[]> = {};

  for (const dec of decisions) {
    if (!grouped[dec.day]) {
      grouped[dec.day] = [];
    }
    grouped[dec.day].push(dec);
  }

  return grouped;
}
