// src/services/kpiDefaults.ts
import type { KPI } from '@/core/models/domain';

/**
 * Standard KPI-Werte für den Start eines neuen Spiels.
 * Diese Werte werden verwendet für:
 * - Neue Multiplayer-Games
 * - Reset/Neustart eines Spiels
 * - Admin-Overrides ohne explizite Werte
 */
export const DEFAULT_KPI_VALUES: KPI = {
  cashEUR: 100000,
  profitLossEUR: 0,
  customerLoyalty: 50,
  bankTrust: 50,
  workforceEngagement: 50,
  publicPerception: 50
};

/**
 * Validiert KPI-Werte und gibt sanitized Version zurück
 */
export function validateAndClampKpi(kpi: Partial<KPI>): KPI {
  return {
    cashEUR: Math.round(Number(kpi.cashEUR ?? DEFAULT_KPI_VALUES.cashEUR)),
    profitLossEUR: Math.round(Number(kpi.profitLossEUR ?? DEFAULT_KPI_VALUES.profitLossEUR)),
    customerLoyalty: Math.max(0, Math.min(100, Math.round(Number(kpi.customerLoyalty ?? DEFAULT_KPI_VALUES.customerLoyalty)))),
    bankTrust: Math.max(0, Math.min(100, Math.round(Number(kpi.bankTrust ?? DEFAULT_KPI_VALUES.bankTrust)))),
    workforceEngagement: Math.max(0, Math.min(100, Math.round(Number(kpi.workforceEngagement ?? DEFAULT_KPI_VALUES.workforceEngagement)))),
    publicPerception: Math.max(0, Math.min(100, Math.round(Number(kpi.publicPerception ?? DEFAULT_KPI_VALUES.publicPerception))))
  };
}

/**
 * Generiert einen sicheren 6-stelligen Session-Code (Großbuchstaben + Zahlen)
 */
export function generateSessionCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // ohne I, O, 0, 1 (Verwechslungsgefahr)
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Prüft ob ein Session-Code gültig ist (Format + Eindeutigkeit)
 */
export function isValidSessionCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  if (code.length !== 6) return false;
  return /^[A-Z0-9]{6}$/.test(code);
}
