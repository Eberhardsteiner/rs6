// src/core/engine/simulation/weights.ts
import type { RoleId } from '@/core/models/domain';

export type Weights = {
  cash: number;
  pl: number;
  cust: number;
  bank: number;
  work: number;
  pub: number;
};

export const ROLE_WEIGHTS: Record<RoleId, Weights> = {
  CEO: { cash: 0.5, pl: 0.3, cust: 1.0, bank: 1.2, work: 0.6, pub: 0.8 },
  CFO: { cash: 1.4, pl: 0.8, cust: 0.2, bank: 1.2, work: 0.2, pub: 0.2 },
  OPS: { cash: 0.4, pl: 0.8, cust: 1.2, bank: 0.4, work: 0.4, pub: 0.3 },
  HRLEGAL: { cash: 0.1, pl: 0.2, cust: 0.3, bank: 0.6, work: 1.2, pub: 1.1 }
};

export type NpcProfile = 'balanced' | 'aggressive' | 'conservative';

export function scaleWeightsForProfile(w: Weights, _role: RoleId): Weights {
  const p: any = (globalThis as any).__npcProfile || 'balanced';

  if (p === 'aggressive') {
    return {
      cash: w.cash * 1.2,
      pl: w.pl * 1.1,
      cust: w.cust,
      bank: w.bank * 1.1,
      work: w.work * 0.85,
      pub: w.pub * 0.85
    };
  }

  if (p === 'conservative') {
    return {
      cash: w.cash * 1.0,
      pl: w.pl * 0.9,
      cust: w.cust * 1.05,
      bank: w.bank * 1.15,
      work: w.work * 1.1,
      pub: w.pub * 1.05
    };
  }

  return w;
}

export function getWeightsForRole(role: RoleId, profile?: NpcProfile): Weights {
  const baseW = ROLE_WEIGHTS[role] ?? ROLE_WEIGHTS.CEO;
  return scaleWeightsForProfile(baseW, role);
}
