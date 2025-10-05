// src/core/engine/reducers/bankingReducer.ts
// Bank-Kreditlinien-Logik

import type { KPI } from '@/core/models/domain';

export interface BankState {
  pendingDrawEUR?: number;
  effectiveCashForInsolv?: number;
  usedCreditEUR?: number;
  creditLineEUR?: number;
  interestRatePct?: number;
  availableCredit?: number;
  lastDrawNow?: number;
}

export interface CreditDrawResult {
  success: boolean;
  newCash: number;
  newUsedCredit: number;
  newBankState: BankState;
  error?: string;
}

export function calculateAvailableCredit(
  creditLineEUR: number,
  usedCreditEUR: number
): number {
  return Math.max(0, creditLineEUR - usedCreditEUR);
}

export function calculateDailyInterest(
  usedCreditEUR: number,
  interestRatePct: number
): number {
  if (usedCreditEUR <= 0) return 0;
  return Math.round((usedCreditEUR * (interestRatePct / 100)) / 365);
}

export function drawCredit(
  currentCash: number,
  amount: number,
  bankState: BankState
): CreditDrawResult {
  const creditLineEUR = bankState.creditLineEUR || 0;
  const usedCreditEUR = bankState.usedCreditEUR || 0;
  const availableCredit = calculateAvailableCredit(creditLineEUR, usedCreditEUR);

  if (amount <= 0) {
    return {
      success: false,
      newCash: currentCash,
      newUsedCredit: usedCreditEUR,
      newBankState: bankState,
      error: 'Betrag muss größer als 0 sein'
    };
  }

  if (amount > availableCredit) {
    return {
      success: false,
      newCash: currentCash,
      newUsedCredit: usedCreditEUR,
      newBankState: bankState,
      error: `Betrag überschreitet verfügbare Kreditlinie (verfügbar: ${availableCredit} EUR)`
    };
  }

  const newCash = currentCash + amount;
  const newUsedCredit = usedCreditEUR + amount;
  const newAvailableCredit = calculateAvailableCredit(creditLineEUR, newUsedCredit);

  const newBankState: BankState = {
    ...bankState,
    usedCreditEUR: newUsedCredit,
    availableCredit: newAvailableCredit,
    lastDrawNow: Date.now()
  };

  return {
    success: true,
    newCash,
    newUsedCredit,
    newBankState
  };
}

export function applyDailyInterest(
  kpi: KPI,
  bankState: BankState
): { newKPI: KPI; interestCharged: number } {
  const usedCreditEUR = bankState.usedCreditEUR || 0;
  const interestRatePct = bankState.interestRatePct || 0;

  if (usedCreditEUR <= 0) {
    return { newKPI: kpi, interestCharged: 0 };
  }

  const interestCharged = calculateDailyInterest(usedCreditEUR, interestRatePct);

  const newKPI = {
    ...kpi,
    cashEUR: kpi.cashEUR - interestCharged,
    profitLossEUR: kpi.profitLossEUR - interestCharged
  };

  return { newKPI, interestCharged };
}

export function repayCred(
  currentCash: number,
  amount: number,
  bankState: BankState
): CreditDrawResult {
  const usedCreditEUR = bankState.usedCreditEUR || 0;
  const creditLineEUR = bankState.creditLineEUR || 0;

  if (amount <= 0) {
    return {
      success: false,
      newCash: currentCash,
      newUsedCredit: usedCreditEUR,
      newBankState: bankState,
      error: 'Betrag muss größer als 0 sein'
    };
  }

  if (amount > usedCreditEUR) {
    return {
      success: false,
      newCash: currentCash,
      newUsedCredit: usedCreditEUR,
      newBankState: bankState,
      error: `Rückzahlungsbetrag überschreitet genutzten Kredit (genutzt: ${usedCreditEUR} EUR)`
    };
  }

  if (amount > currentCash) {
    return {
      success: false,
      newCash: currentCash,
      newUsedCredit: usedCreditEUR,
      newBankState: bankState,
      error: `Nicht genügend Liquidität für Rückzahlung (verfügbar: ${currentCash} EUR)`
    };
  }

  const newCash = currentCash - amount;
  const newUsedCredit = usedCreditEUR - amount;
  const newAvailableCredit = calculateAvailableCredit(creditLineEUR, newUsedCredit);

  const newBankState: BankState = {
    ...bankState,
    usedCreditEUR: newUsedCredit,
    availableCredit: newAvailableCredit
  };

  return {
    success: true,
    newCash,
    newUsedCredit,
    newBankState
  };
}

export function initializeBankState(
  creditLineEUR: number,
  interestRatePct: number
): BankState {
  return {
    pendingDrawEUR: 0,
    effectiveCashForInsolv: 0,
    usedCreditEUR: 0,
    creditLineEUR,
    interestRatePct,
    availableCredit: creditLineEUR,
    lastDrawNow: undefined
  };
}

export function updateBankState(
  currentState: BankState | undefined,
  updates: Partial<BankState>
): BankState {
  const base = currentState || {
    pendingDrawEUR: 0,
    effectiveCashForInsolv: 0,
    usedCreditEUR: 0,
    creditLineEUR: 0,
    interestRatePct: 0,
    availableCredit: 0
  };

  const updated = { ...base, ...updates };

  if (updates.creditLineEUR !== undefined || updates.usedCreditEUR !== undefined) {
    updated.availableCredit = calculateAvailableCredit(
      updated.creditLineEUR || 0,
      updated.usedCreditEUR || 0
    );
  }

  return updated;
}

export function getCreditUtilizationRate(bankState: BankState): number {
  const creditLineEUR = bankState.creditLineEUR || 0;
  const usedCreditEUR = bankState.usedCreditEUR || 0;

  if (creditLineEUR <= 0) return 0;

  return (usedCreditEUR / creditLineEUR) * 100;
}

export function isCreditAvailable(bankState: BankState, requiredAmount: number): boolean {
  const availableCredit = calculateAvailableCredit(
    bankState.creditLineEUR || 0,
    bankState.usedCreditEUR || 0
  );

  return availableCredit >= requiredAmount;
}
