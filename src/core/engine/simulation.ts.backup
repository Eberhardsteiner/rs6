// src/core/engine/simulation.ts
// NPC-Entscheider: bewusst fehleranfälliger, mit Difficulty, Idle-Boost und Profilen

import type { DecisionBlock, KPI, RoleId } from '@/core/models/domain';
import { currentRng } from '@/core/utils/prng';

type Weights = { cash: number; pl: number; cust: number; bank: number; work: number; pub: number };

// Rollen-Grundgewichte (neutral). Diese werden vom Profil (balanced/aggressive/conservative) skaliert.
const ROLE_WEIGHTS: Record<RoleId, Weights> = {
  CEO:     { cash: 0.5, pl: 0.3, cust: 1.0, bank: 1.2, work: 0.6, pub: 0.8 },
  CFO:     { cash: 1.4, pl: 0.8, cust: 0.2, bank: 1.2, work: 0.2, pub: 0.2 },
  OPS:     { cash: 0.4, pl: 0.8, cust: 1.2, bank: 0.4, work: 0.4, pub: 0.3 },
  HRLEGAL: { cash: 0.1, pl: 0.2, cust: 0.3, bank: 0.6, work: 1.2, pub: 1.1 }
};

function rng(): number { const r = currentRng(); return r(); }

// NPC-Profile geben eine leichte Tendenz
function scaleWeightsForProfile(w: Weights, _role: RoleId): Weights {
  const p: any = (globalThis as any).__npcProfile || 'balanced';
  if (p === 'aggressive') {
    // mehr Fokus auf Cash/Bank, weniger auf Workforce/Public
    return { cash: w.cash*1.2, pl: w.pl*1.1, cust: w.cust, bank: w.bank*1.1, work: w.work*0.85, pub: w.pub*0.85 };
  }
  if (p === 'conservative') {
    // vorsichtiger, stakeholder-orientiert
    return { cash: w.cash*1.0, pl: w.pl*0.9, cust: w.cust*1.05, bank: w.bank*1.15, work: w.work*1.1, pub: w.pub*1.05 };
  }
  return w; // balanced
}

// lineare Normalisierung: EUR in Tsd., Punkte direkt
function scoreDelta(w: Weights, d: Partial<KPI> | undefined): number {
  const cash = ((d?.cashEUR ?? 0) / 1000);
  const pl   = ((d?.profitLossEUR ?? 0) / 1000);
  const cust =  (d?.customerLoyalty ?? 0);
  const bank =  (d?.bankTrust ?? 0);
  const work =  (d?.workforceEngagement ?? 0);
  const pub  =  (d?.publicPerception ?? 0);
  return w.cash*cash + w.pl*pl + w.cust*cust + w.bank*bank + w.work*work + w.pub*pub;
}

/**
 * NPC-Wahl für einen Entscheidungsblock.
 * - schlechtere Performance, wenn Spieler inaktiv war
 * - erhöhte Grund-Fehlerquote je Difficulty
 * - "Worst pick"-Kleinchance
 * - Top-3-Weighted-Pick 0.45/0.35/0.20
 * - Risiko-Komponente über optionale o.variance
 * - Guards gegen starken negativen Cash/Bank-Impact bei schlechter Lage
 */
export function pickOptionForBlock(
  block: DecisionBlock,
  role: RoleId,
  currentKpi: KPI
): 'a'|'b'|'c'|'d' {

  const baseW = ROLE_WEIGHTS[role] ?? ROLE_WEIGHTS.CEO;
  const w = scaleWeightsForProfile(baseW, role);

  // Guards: wenn Liquidität/Bank schwach, bestrafe zusätzliche Belastung stärker
  const cashGuard = currentKpi.cashEUR < 20_000 ? 1.6 : 1.0;
  const bankGuard = currentKpi.bankTrust < 50   ? 1.2 : 1.0;

  // Optionen bewerten
  const scored = block.options.map(o => {
    const sBase = scoreDelta(w, o.kpiDelta);
    const negCashPenalty = cashGuard * Math.max(0, - (o.kpiDelta?.cashEUR ?? 0) / 1000);
    const negBankPenalty = bankGuard * Math.max(0, - (o.kpiDelta?.bankTrust ?? 0));
    // Risiko-Bonus/Strafe über optionale variance (0..1). Über 0.3 wird es spürbar schlechter.
    const variance = Math.max(0, Math.min(1, (o as any)?.variance ?? 0));
    const riskPenalty = Math.max(0, variance - 0.3) * 0.8;
    // Jitter für Varianz/Streuung
    const jitterAmp = 1.0 + variance * 0.8; // bis 1.8x
    const jitter = (rng() - 0.5) * 1.2 * jitterAmp;
    const score = sBase - negCashPenalty - negBankPenalty - riskPenalty + jitter;
    return { id: o.id as 'a'|'b'|'c'|'d', score };
  }).sort((a,b) => b.score - a.score);

  // Fehlerquote: höher als zuvor + Idle-Boost, damit NPC nicht „perfekt“ spielen
  const diff: any = (globalThis as any).__npcDifficulty || 'normal';
const baseErr  = diff === 'hard' ? 0.18 : (diff === 'easy' ? 0.06 : 0.12);
const idle = (globalThis as any).__playerIdleToday ? true : false;
const dfRaw = (globalThis as any).__adaptiveDifficultyLightEnabled ? ((globalThis as any).__difficultyFactor ?? 1.0) : 1.0;
const df = Math.max(0.9, Math.min(1.2, typeof dfRaw === 'number' ? dfRaw : 1.0));
const errorRate = Math.max(0.03, idle ? 0.45 : Math.min(0.45, baseErr * df));


  // Kleine Chance, die schlechteste Option zu wählen (echter Patzer)
  const worstPickChance = 0.05;
  if ( ((globalThis as any).__playerIdleToday ? rng() < 0.35 : rng() < worstPickChance) ) {
    const last = scored[scored.length - 1];
    return (last?.id ?? scored[2]?.id ?? scored[1]?.id ?? scored[0].id);
  }

  // Mit Fehlerwahrscheinlichkeit bewusst nicht die beste Option nehmen
  if (rng() < errorRate) {
    return (scored[2]?.id ?? scored[1]?.id ?? scored[0].id); // drittbeste (oder zweitbeste)
  }

  // Reguläre Auswahl: Top-3 gewichtet 0.45 / 0.35 / 0.20
  const r = rng();
  if (r < 0.45 || !scored[1]) return scored[0].id;
  if (r < 0.80 || !scored[2]) return scored[1].id;
  return scored[2].id;
}