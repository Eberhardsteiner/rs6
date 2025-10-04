// src/services/pdfReport.ts
// Erzeugt ein PDF-Protokoll mit pdfmake (Browser).
// Vorausgesetzt: Paket `pdfmake` installiert und vfs_fonts eingebunden.
//
// npm i pdfmake
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import type { ReportRun } from '../reporting/reportTypes';
import { appendFinalScoreToDocDefinition } from './pdfExtras';

type PdfMake = any;

function fmtEUR(n: any) {
  const v = typeof n === 'number' ? n : Number(n);
  if (!isFinite(v)) return '—';
  return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function sign(n: number | null | undefined) {
  if (n == null) return '';
  return n >= 0 ? '+' : '–';
}

export function buildDocDefinition(run: ReportRun) {
  const days = run.days || [];
  const insolvent = run.insolventAtDay ?? null;

  const header = {
    text: 'Gesamtprotokoll – Simulation',
    style: 'header'
  };

  const metaTable = {
    style: 'meta',
    table: {
      widths: ['*','*','*','*'],
      body: [
        ['Startzeit', run.meta.startedAt, 'Rollen', (run.meta.roles || []).join(', ') || '—'],
        ['Start-Cash', fmtEUR(run.kpiStart.cashEUR), 'Start-P&L', fmtEUR(run.kpiStart.profitLossEUR)],
        ['Diskontsatz p.a.', ((run.meta.discountRatePA ?? 0.08) * 100).toFixed(1) + ' %', 'Taglänge (Tage)', String(run.meta.dayLengthInDays ?? 1)]
      ]
    },
    layout: 'lightHorizontalLines'
  };

  // Tag für Tag
  const perDayContent: any[] = [];
  for (const d of days) {
    perDayContent.push({ text: `Runde / Tag ${d.day}`, style: 'h2', margin: [0,10,0,4] });

    // KPI-Übersicht
    perDayContent.push({
      style: 'tableSmall',
      table: {
        widths: ['*','*','*','*'],
        body: [
          [{text: 'KPI (vorher)', style: 'th'}, {text: 'KPI (nachher)', style: 'th'}, {text: 'Δ Zufall Cash', style: 'th'}, {text: 'Δ Zufall P&L', style: 'th'}],
          [
            `Cash: ${fmtEUR(d.beforeKPI.cashEUR)}\nP&L: ${fmtEUR(d.beforeKPI.profitLossEUR)}`,
            `Cash: ${fmtEUR(d.afterKPI.cashEUR)}\nP&L: ${fmtEUR(d.afterKPI.profitLossEUR)}`,
            `${sign(d.randomCash)} ${fmtEUR(Math.abs(d.randomCash ?? 0))}`,
            `${sign(d.randomPL)} ${fmtEUR(Math.abs(d.randomPL ?? 0))}`
          ]
        ]
      },
      layout: 'lightHorizontalLines'
    });

    // Entscheidungen
    const decRows = (d.decisions || []).map((dec: any) => [
      dec.role || '—',
      dec.title || dec.id,
      `${fmtEUR(dec.kpiDelta.cashEURInflow ?? 0)} / ${fmtEUR(dec.kpiDelta.cashEUROutflow ?? 0)}`,
      `${fmtEUR(dec.kpiDelta.profitEUR ?? 0)} / ${fmtEUR(dec.kpiDelta.lossEUR ?? 0)}`,
      fmtEUR(dec.npv ?? 0)
    ]);
    perDayContent.push({
      style: 'tableSmall',
      margin: [0,6,0,0],
      table: {
        widths: ['*','*','auto','auto','auto'],
        body: [
          [{text: 'Rolle', style: 'th'}, {text: 'Entscheidung', style: 'th'}, {text: 'Cash In/Out', style: 'th'}, {text: 'Profit/Loss', style: 'th'}, {text: 'NPV', style: 'th'}],
          ...decRows
        ]
      },
      layout: 'lightHorizontalLines'
    });

    // Insolvenzhinweis je Tag (falls vorhanden)
    if (d.insolvency) {
      perDayContent.push({ text: `⚠︎ Zahlungsunfähigkeit am Ende von Tag ${d.day} festgestellt.`, color: 'red', margin: [0,6,0,0] });
    }
  }
  // Communications (MP) – optional section based on run.meta.comms*
  function buildCommsTable(): any | null {
    const meta: any = (run as any)?.meta || {};
    const commsAll = meta.commsAll;
    const commsSelf = meta.commsSelf;
    const asBullet = (arr: Array<{day:number; text:string}> | undefined) => {
      if (!Array.isArray(arr) || arr.length === 0) return [{ text: '—', italics: true }];
      return arr.map(it => ({ text: `Tag ${it.day}: ${String(it.text)}` }));
    };

    if (commsAll && typeof commsAll === 'object') {
      const roles = ['CEO','CFO','OPS','HRLEGAL'];
      return {
        style: 'tableSmall',
        margin: [0,12,0,0],
        table: {
          widths: ['*','*','*','*'],
          body: [
            [{ text: 'CEO – Stakeholderkommunikation', style: 'th' },
             { text: 'CFO – Bankkommunikation', style: 'th' },
             { text: 'OPS – Kunden-/Lieferantenkommunikation', style: 'th' },
             { text: 'HR/Legal – Kommunikation (intern/extern)', style: 'th' }],
            [
              { stack: asBullet(commsAll.CEO) },
              { stack: asBullet(commsAll.CFO) },
              { stack: asBullet(commsAll.OPS) },
              { stack: asBullet(commsAll.HRLEGAL) }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      };
    }

    if (commsSelf && commsSelf.text) {
      const labelMap: any = {
        CEO: 'Stakeholderkommunikation',
        CFO: 'Bankkommunikation',
        OPS: 'Kunden-/Lieferantenkommunikation',
        HRLEGAL: 'Kommunikation (intern/extern)'
      };
      return {
        style: 'tableSmall',
        margin: [0,12,0,0],
        table: {
          widths: ['*','*'],
          body: [
            [{ text: `Rolle: ${String(commsSelf.role)} – ${labelMap[String(commsSelf.role)] || 'Kommunikation'}`, style: 'th' }, { text: 'Notizen', style: 'th' }],
            [`Tag ${commsSelf.day}`, String(commsSelf.text)]
          ]
        },
        layout: 'lightHorizontalLines'
      };
    }

    return null;
  }

  const commsBlock = buildCommsTable();
  const commsSection = commsBlock ? [
    { text: 'Kommunikationsnotizen (MP)', style: 'h2', margin: [0,12,0,6] },
    commsBlock
  ] : [];

  // What-if
  const whatIfRows = (run.whatIf || []).map((w: any) => [
    String(w.day),
    w.blockId || '—',
    w.chosenOptionId || '—',
    w.bestAlternativeOptionId || '—',
    `${fmtEUR((w.kpiDeltaDiff?.cashEURInflow ?? 0) - (w.kpiDeltaDiff?.cashEUROutflow ?? 0))}`,
    `${fmtEUR((w.kpiDeltaDiff?.profitEUR ?? 0) - (w.kpiDeltaDiff?.lossEUR ?? 0))}`
  ]);

  const whatIfTable = whatIfRows.length ? ({
    style: 'tableSmall',
    margin: [0,12,0,0],
    table: {
      widths: ['auto','*','*','*','auto','auto'],
      body: [
        [{text: 'Tag', style: 'th'}, {text: 'Block', style: 'th'}, {text: 'Gewählt', style: 'th'}, {text: 'Beste Alternative', style: 'th'}, {text: 'ΔCash (Alt-Chosen)', style: 'th'}, {text: 'ΔP&L (Alt-Chosen)', style: 'th'}],
        ...whatIfRows
      ]
    },
    layout: 'lightHorizontalLines'
  }) : { text: 'Keine What-if-Notizen.', italics: true, margin: [0,12,0,0] };

  // Zusammenfassung
  const last = days[days.length - 1];
  const summary = {
    style: 'tableSmall',
    margin: [0,12,0,0],
    table: {
      widths: ['*','*','*','*'],
      body: [
        [{text: 'Gesamtergebnis', style: 'th'}, {text: 'Final Score', style: 'th'}, {text: 'Zahlungsunfähigkeit', style: 'th'}, {text: 'Hinweis', style: 'th'}],
        [
          last ? `Cash: ${fmtEUR(last.afterKPI.cashEUR)}  •  P&L: ${fmtEUR(last.afterKPI.profitLossEUR)}` : '—',
          fmtEUR(run.finalScore ?? 0),
          insolvent ? `Ja (Tag ${insolvent})` : 'Nein',
          run.finalNote || '—'
        ]
      ]
    },
    layout: 'lightHorizontalLines'
  };

  const content: any[] = [
    header,
    { text: 'Metadaten', style: 'h2', margin: [0,10,0,4] },
    metaTable,
    { text: 'Verlauf pro Runde/Tag', style: 'h2', margin: [0,14,0,6] },
    ...perDayContent, ...commsSection,
    { text: 'What-if (KPI-Auswirkungen anderer Entscheidungen)', style: 'h2', margin: [0,14,0,6] },
    whatIfTable,
    { text: 'Zusammenfassung', style: 'h2', margin: [0,14,0,6] },
    summary
  ];

  const styles = {
    header: { fontSize: 18, bold: true },
    h2: { fontSize: 14, bold: true },
    th: { bold: true },
    meta: {},
    tableSmall: { fontSize: 10 }
  };

  return { content, styles, pageMargins: [40, 40, 40, 40] };
}


export async function exportSimulationReport(pdfMake: PdfMake, run: ReportRun, fileName = 'Gesamtprotokoll.pdf') {
  const def = buildDocDefinition(run);
  // <<< WICHTIG: Einheitliche Endwertung im PDF ergänzen (keine Änderung am Funktions-Signatur notwendig)
  // Wir übergeben `run` – pdfExtras kann daraus finalen KPI & Gewichte ableiten.
  appendFinalScoreToDocDefinition(def, run);

  return new Promise<void>((resolve, reject) => {
    try {
      const doc = pdfMake.createPdf(def);
      doc.download(fileName);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
