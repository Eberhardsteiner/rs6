// src/reporting/reportBuilder.ts

import { ReportRun, DaySnapshot, KPI, DecisionDelta, WhatIfNote } from './reportTypes';

export const ReportStore = (() => {
  let current: ReportRun | null = null;

  function startRun(args: {
    kpiStart: KPI;
    roles: string[];
    playerName?: string;
    discountRatePA?: number;
    dayLengthInDays?: number;
    scoringWeights?: Record<string, number>;
  }) {
    current = {
      meta: {
        startedAt: new Date().toISOString(),
        roles: args.roles,
        playerName: args.playerName,
        discountRatePA: args.discountRatePA ?? 0.08,
        dayLengthInDays: args.dayLengthInDays ?? 1,
        scoringWeights: args.scoringWeights ?? { cashEUR: 0.5, profitLossEUR: 0.5 }
      },
      kpiStart: { ...args.kpiStart },
      days: [],
      whatIf: []
    };
  }

  function ensure(): ReportRun {
    if (!current) throw new Error('ReportStore not initialized. Call startRun(...) first.');
    return current;
  }

  // Hilfsfunktion: Tageszins aus Diskontsatz p.a.
  function dailyRate(pa: number, dayLengthInDays: number) {
    const annual = pa;
    const periodsPerYear = Math.max(1, Math.floor(365 / Math.max(1, dayLengthInDays)));
    return Math.pow(1 + annual, 1 / periodsPerYear) - 1;
  }

  function computeNPV(amount: number, dayIndex: number, discountRatePA: number, dayLengthInDays: number) {
    const r = dailyRate(discountRatePA, dayLengthInDays);
    const t = dayIndex; // 0-basiert: Tag 1 → t=1 (eine Periode)
    return amount / Math.pow(1 + r, t);
  }

  function sum(a: number | undefined | null, b: number | undefined | null) {
    return (a ?? 0) + (b ?? 0);
  }

  function addNPVToDecisions(day: number, decs: DecisionDelta[], meta: ReportRun['meta']): { totalNPV: number, withNPV: DecisionDelta[] } {
    let totalNPV = 0;
    const withNPV = decs.map(d => {
      // Cash-wirksamkeit aus kpiDelta ableiten (Inflow-Outflow)
      const inflow = d.kpiDelta.cashEURInflow ?? 0;
      const outflow = d.kpiDelta.cashEUROutflow ?? 0;
      const net = inflow - outflow;
      const npv = computeNPV(net, day, meta.discountRatePA ?? 0.08, meta.dayLengthInDays ?? 1);
      totalNPV += npv;
      return { ...d, npv };
    });
    return { totalNPV, withNPV };
  }

  function logDay(args: {
    day: number;
    beforeKPI: KPI;
    afterKPI: KPI;
    randomCash?: number | null;
    randomPL?: number | null;
    decisions: DecisionDelta[];
    insolvency?: boolean;
    whatIf?: WhatIfNote[];
  }) {
    const run = ensure();
    const { totalNPV, withNPV } = addNPVToDecisions(args.day, args.decisions, run.meta);
    const snapshot: DaySnapshot = {
      day: args.day,
      beforeKPI: { ...args.beforeKPI },
      afterKPI: { ...args.afterKPI },
      randomCash: args.randomCash ?? null,
      randomPL: args.randomPL ?? null,
      decisions: withNPV,
      decisionsNPVTotal: totalNPV,
      insolvency: !!args.insolvency
    };
    run.days.push(snapshot);
    if (args.whatIf && args.whatIf.length) {
      run.whatIf.push(...args.whatIf);
    }
    if (snapshot.insolvency && !run.insolventAtDay) {
      run.insolventAtDay = snapshot.day;
    }
  }

  function finalize() {
    const run = ensure();
    // Einfache Score-Berechnung: gewichteter Mix der End-KPI
    const weights = run.meta.scoringWeights ?? { cashEUR: 0.5, profitLossEUR: 0.5 };
    const last = run.days[run.days.length - 1];
    const baseKPI = last ? last.afterKPI : run.kpiStart;
    let score = 0;
    for (const [key, w] of Object.entries(weights)) {
      const v = (baseKPI as any)[key];
      if (typeof v === 'number') score += w * v;
    }
    run.finalScore = score;
    // Hinweistext
    if (run.insolventAtDay) {
      run.finalNote = `Zahlungsunfähigkeit festgestellt am Tag ${run.insolventAtDay}.`;
    } else {
      run.finalNote = `Keine Zahlungsunfähigkeit während der Simulation.`;
    }
  }

  return {
    startRun,
    logDay,
    finalize,
    get current() { return current; }
  };
})();

// Hilfsfunktionen für Integration in App

export function onDayAdvanced({
  prevState,
  nextState,
  chosenRoles
}: {
  prevState: any;
  nextState: any;
  chosenRoles: string[];
}) {
  if (!ReportStore.current) {
    ReportStore.startRun({
      kpiStart: prevState?.kpi ?? { cashEUR: 0, profitLossEUR: 0 },
      roles: chosenRoles ?? [],
      playerName: (nextState?.playerName || prevState?.playerName) ?? undefined
    });
  }
  const prevKPI = prevState?.kpi ?? { cashEUR: 0, profitLossEUR: 0 };
  const afterKPI = nextState?.kpi ?? prevKPI;
  const today = prevState?.day ?? 1;

  // Zufalls-Einfluss: bevorzugt aus engineMeta.lastApplied[today]
  const la = nextState?.engineMeta?.lastApplied?.[today];
  const randomCash = (la && typeof la.netCash === 'number') ? la.netCash : (afterKPI.cashEUR - prevKPI.cashEUR);
  const randomPL   = (la && typeof la.netPL   === 'number') ? la.netPL   : (afterKPI.profitLossEUR - prevKPI.profitLossEUR);

  // Entscheidungen extrahieren (best effort)
  const decisions = extractDecisionsForDay(prevState, today);

  // Zahlungsunfähigkeit hart als cash < 0 am Tagesende
  const insolvency = afterKPI?.cashEUR < 0;

  // What-if (optional, best effort)
  const whatIf = extractWhatIf(prevState, decisions);

  ReportStore.logDay({
    day: today,
    beforeKPI: prevKPI,
    afterKPI,
    randomCash,
    randomPL,
    decisions,
    insolvency,
    whatIf
  });
}

export function extractDecisionsForDay(state: any, day: number): DecisionDelta[] {
  // Erwartete Quellen:
  // - state.log: Array aus Tages-Logs mit getroffenen Optionen
  // - oder state.decisions[day]: tagesbezogene Entscheidungen
  const out: DecisionDelta[] = [];
  const dayLogs = (state?.log && Array.isArray(state.log))
    ? state.log.filter((e: any) => e?.day === day)
    : (state?.decisions && state.decisions[day]) ? state.decisions[day] : [];

  for (const e of (dayLogs || [])) {
    const entry = normalizeDecisionEntry(e);
    if (entry) out.push(entry);
  }
  return out;
}

function normalizeDecisionEntry(e: any): DecisionDelta | null {
  // Versucht, generische Felder zu lesen
  const id = String(e?.id ?? e?.optionId ?? e?.blockId ?? cryptoRandomId());
  const title = e?.title ?? e?.optionTitle ?? e?.blockTitle ?? undefined;
  const role = e?.role ?? e?.roleId ?? undefined;
  const kd = e?.kpiDelta ?? e?.delta ?? {};
  const kpiDelta = {
    ...kd,
    cashEURInflow: kd?.cashEURInflow ?? kd?.cashIn ?? 0,
    cashEUROutflow: kd?.cashEUROutflow ?? kd?.cashOut ?? 0,
    profitEUR: kd?.profitEUR ?? kd?.profit ?? 0,
    lossEUR: kd?.lossEUR ?? kd?.loss ?? 0
  };
  return {
    id, title, role, kpiDelta
  };
}

export function extractWhatIf(state: any, decisions: DecisionDelta[]): WhatIfNote[] {
  // Best-effort: Wenn es im State Blöcke mit Optionen gibt (todaysBlocks),
  // berechnen wir die Differenz zwischen der gewählten Option und der "besten" Alternative
  // nach einem einfachen Score (Gewichtung Cash + P&L).
  const blocks = state?.todaysBlocks;
  if (!Array.isArray(blocks)) return [];
  const weights = { cashEUR: 0.5, profitLossEUR: 0.5 };
  const notes: WhatIfNote[] = [];

  function scoreKPI(delta: any) {
    const cash = (delta?.cashEURInflow ?? 0) - (delta?.cashEUROutflow ?? 0);
    const pl = (delta?.profitEUR ?? 0) - (delta?.lossEUR ?? 0);
    return weights.cashEUR * cash + weights.profitLossEUR * pl;
    // (weitere KPI könnten einbezogen werden)
  }

  for (const b of blocks) {
    const chosen = decisions.find(d => d.id === (b?.chosenOptionId || b?.id));
    const options = Array.isArray(b?.options) ? b.options : [];
    if (!options.length) continue;

    let best = null as any;
    let bestScore = -Infinity;
    for (const o of options) {
      const kd = o?.kpiDelta || {};
      const candidate = {
        cashEURInflow: kd?.cashEURInflow ?? 0,
        cashEUROutflow: kd?.cashEUROutflow ?? 0,
        profitEUR: kd?.profitEUR ?? 0,
        lossEUR: kd?.lossEUR ?? 0
      };
      const sc = scoreKPI(candidate);
      if (sc > bestScore) { bestScore = sc; best = { optionId: o?.id, kpiDelta: candidate }; }
    }

    if (chosen && best && chosen.id !== best.optionId) {
      const diff = {
        cashEURInflow: (best.kpiDelta.cashEURInflow ?? 0) - (chosen.kpiDelta.cashEURInflow ?? 0),
        cashEUROutflow: (best.kpiDelta.cashEUROutflow ?? 0) - (chosen.kpiDelta.cashEUROutflow ?? 0),
        profitEUR: (best.kpiDelta.profitEUR ?? 0) - (chosen.kpiDelta.profitEUR ?? 0),
        lossEUR: (best.kpiDelta.lossEUR ?? 0) - (chosen.kpiDelta.lossEUR ?? 0)
      };
      notes.push({
        day: state?.day ?? 0,
        blockId: b?.id,
        chosenOptionId: chosen.id,
        bestAlternativeOptionId: best.optionId,
        kpiDeltaChosen: chosen.kpiDelta,
        kpiDeltaBestAlt: best.kpiDelta,
        kpiDeltaDiff: diff
      });
    }
  }
  return notes;
}

function cryptoRandomId() {
  try {
    const a = new Uint8Array(8);
    (globalThis.crypto || (globalThis as any).msCrypto).getRandomValues(a);
    return Array.from(a).map(x => x.toString(16).padStart(2,'0')).join('');
  } catch {
    return Math.random().toString(16).slice(2);
  }
}
