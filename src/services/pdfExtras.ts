// src/services/pdfExtras.ts
// Einheitliche Endwertung im PDF ergänzen – nutzt die Scoring-Engine.
// Diese Funktion kann sowohl mit dem GameState als auch mit einem
// ReportRun-ähnlichen Objekt (aus Ihrer Reporting-Pipeline) arbeiten.

import type { KPI } from '@/core/models/domain';
import { computeScoreFromState, computeScoreFromKPI, DEFAULT_WEIGHTS, normalizeWeights } from '@/core/engine/scoring';

type MaybeState = { kpi: KPI; engineMeta?: any; kpiHistory?: any[] } | null | undefined;
type ReportRunLike = any; // kompatibel zu Ihrem ReportRun

function kpiFromRun(run: ReportRunLike): KPI | null {
  // Versuche finalen KPI aus run zu extrahieren:
  // Erwartet: run.days[...].afterKPI ODER run.kpiEnd
  const last = Array.isArray(run?.days) && run.days.length ? run.days[run.days.length - 1] : null;
  const after = last?.afterKPI ?? run?.kpiEnd;
  if (!after) return null;
  return {
    cashEUR: Number(after.cashEUR ?? 0),
    profitLossEUR: Number(after.profitLossEUR ?? 0),
    customerLoyalty: Number(after.customerLoyalty ?? 0),
    bankTrust: Number(after.bankTrust ?? 0),
    workforceEngagement: Number(after.workforceEngagement ?? 0),
    publicPerception: Number(after.publicPerception ?? 0),
  } as KPI;
}

function weightsFromRun(run: ReportRunLike): any {
  const w = run?.meta?.scoringWeights ?? (globalThis as any).__scoringWeights ?? DEFAULT_WEIGHTS;
  return normalizeWeights(w);
}

// Fügt am Ende des Dokuments einen „Endwertung (Engine)“-Block an.
export function appendFinalScoreToDocDefinition(docDefinition: any, stateOrRun?: MaybeState | ReportRunLike) {
  try {
    let result: ReturnType<typeof computeScoreFromKPI> | null = null;

    // 1) Voller GameState vorhanden?
    if (stateOrRun && 'kpi' in (stateOrRun as any)) {
      result = computeScoreFromState(stateOrRun as any);
    } else if (stateOrRun) {
      // 2) ReportRun-artiges Objekt
      const kpi = kpiFromRun(stateOrRun);
      if (kpi) {
        const weights = weightsFromRun(stateOrRun);
        // Bonus/Malus wenn vorhanden übernehmen
        const metaLike = {
          bonusPoints: Number((stateOrRun as any)?.meta?.bonusPoints ?? 0),
          penaltyPoints: Number((stateOrRun as any)?.meta?.penaltyPoints ?? 0),
          achievements: Array.isArray((stateOrRun as any)?.meta?.achievements) ? (stateOrRun as any).meta.achievements : [],
          penalties: Array.isArray((stateOrRun as any)?.meta?.penalties) ? (stateOrRun as any).meta.penalties : [],
          scoringWeights: weights,
        };
        result = computeScoreFromKPI(kpi, weights, metaLike);
      }
    }

    if (!result) return; // nichts zu tun

    const endBlock = {
      style: 'tableSmall',
      margin: [0, 12, 0, 0],
      table: {
        widths: ['*','auto','auto','auto','auto'],
        body: [
          [
            { text: 'Endwertung (Engine)', style: 'th' },
            { text: 'Score', style: 'th' },
            { text: 'Verdikt', style: 'th' },
            { text: 'Bonus', style: 'th' },
            { text: 'Malus', style: 'th' },
          ],
          [
            `Gewichte: Bank ${result.weights.bankTrust}% · Public ${result.weights.publicPerception}% · Kunden ${result.weights.customerLoyalty}% · Team ${result.weights.workforceEngagement}%`,
            `${result.score} / 100`,
            result.verdict,
            `+${result.bonus}`,
            `-${result.malus}`,
          ]
        ]
      },
      layout: 'lightHorizontalLines'
    };

    docDefinition.content = docDefinition.content || [];
    docDefinition.content.push({ text: 'Endwertung', style: 'h2', margin: [0,14,0,6] });
    docDefinition.content.push(endBlock);
  } catch (e) {
    // Fallback: nie PDF-Abbruch riskieren
    console && console.warn && console.warn('[pdfExtras] appendFinalScoreToDocDefinition failed:', e);
  }
}
