// src/services/pdfDebrief.ts
// Requires pdfmake as dependency (already present in the project)
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// ✅ robuste Initialisierung für verschiedene Bundler (Vite/ESM/CJS)
(pdfMake as any).vfs =
  (pdfFonts as any).pdfMake?.vfs ||
  (pdfFonts as any).default?.pdfMake?.vfs ||
  (pdfFonts as any).vfs;

import type { DebriefResponses, QuestionBank, ScenarioIndexEntry } from '@/debrief/types';

type TDocumentDefinitions = any;

export async function exportDebriefToPdf(args: {
  responses: DebriefResponses;
  questionBank: QuestionBank;
  scenarioIndex: Record<string, ScenarioIndexEntry>;
}) {
  const { responses, questionBank, scenarioIndex } = args;

  const today = new Date(responses.meta.dateISO || new Date().toISOString());
  const dateStr = today.toLocaleString('de-DE');

  function tableFromScale(obj: Record<string, number>, lookup: (id: string)=>string) {
    const rows = Object.entries(obj).map(([id, val]) => [lookup(id), String(val ?? '')]);
    return {
      style: 'table',
      table: {
        headerRows: 1,
        widths: ['*','auto'],
        body: [
          [{text: 'Frage', style:'th'}, {text:'Wertung (1–5)', style:'th'}],
          ...rows
        ]
      }
    };
  }

  function stackFromOpen(obj: Record<string, string>, lookup: (id: string)=>string) {
    const items = Object.entries(obj).map(([id, txt]) => ({
      text: [
        { text: lookup(id)+':\n', bold:true },
        (txt || '—')
      ],
      margin: [0,6,0,6]
    }));
    return { stack: items };
  }

  const content: any[] = [
    { text: 'Debriefing – Reflexion & Transfer', style: 'h1' },
    { text: `Teilnehmer: ${responses.meta.playerName || '—'} | Datum: ${dateStr}`, margin: [0,4,0,12] }
  ];

  // Global blocks
  const q = questionBank;
  content.push({ text: 'A. Gesamtreflexion (Skalen)', style: 'h2' });
  content.push(tableFromScale(responses.globalScale || {}, id => (q.globalScale.find(x=>x.id===id)?.text || id)));
  content.push({ text: 'B. Gesamtreflexion (Freitext)', style: 'h2', pageBreak: 'auto' });
  content.push(stackFromOpen(responses.globalOpen || {}, id => (q.globalOpen.find(x=>x.id===id)?.text || id)));

  // Role sections
  (['CEO','CFO','OPS','HRLEGAL'] as const).forEach(role => {
    const s = responses.roleScale?.[role] || {};
    const o = responses.roleOpen?.[role] || {};
    if (Object.keys(s).length || Object.keys(o).length) {
      content.push({ text: `C. Rollenreflexion – ${role}`, style: 'h2', pageBreak: 'auto' });
      if (Object.keys(s).length) {
        content.push(tableFromScale(s, id => (q.roleScale[role].find(x=>x.id===id)?.text || id)));
      }
      if (Object.keys(o).length) {
        content.push(stackFromOpen(o, id => (q.roleOpen[role].find(x=>x.id===id)?.text || id)));
      }
    }
  });

  // Decision reviews
  if (responses.decisions?.length) {
    content.push({ text: 'D. Entscheidungs-Reviews', style: 'h2' });
    responses.decisions.forEach((d, idx) => {
      const meta = scenarioIndex[d.blockId] || ({} as any);
      const header = `${d.blockId} – ${meta?.title || d.title || ''}`;
      const sub = `Tag ${meta?.day || d.day || '—'} • ${meta?.role || d.role || '—'} • Dilemma: ${(meta?.dilemma || d.dilemma || '—')}`;
      content.push({ text: header, style: 'h3', margin: [0,10,0,2] });
      content.push({ text: sub, margin: [0,0,0,8] });
      const opt = d.chosenOptionId
        ? `Gewählt: ${d.chosenOptionId.toUpperCase()} ${d.chosenOptionLabel ? '– '+d.chosenOptionLabel : ''}`
        : 'Gewählt: —';
      content.push({ text: opt, italics: true, margin: [0,0,0,8] });

      if (d.scale && Object.keys(d.scale).length) {
        content.push(tableFromScale(d.scale, id => (q.decisionReview.scale.find(x=>x.id===id)?.text || id)));
      }
      if (d.open && Object.keys(d.open).length) {
        content.push(stackFromOpen(d.open, id => (q.decisionReview.open.find(x=>x.id===id)?.text || id)));
      }
      if (idx < responses.decisions.length-1) {
        content.push({ text: '', pageBreak: 'after' });
      }
    });
  }

  const doc: TDocumentDefinitions = {
    content,
    styles: {
      h1: { fontSize: 18, bold: true },
      h2: { fontSize: 14, bold: true, margin: [0,10,0,6] },
      h3: { fontSize: 12, bold: true },
      th: { bold: true, fillColor: '#f3f4f6' },
      table: { margin: [0,6,0,10] }
    },
    defaultStyle: { fontSize: 10 }
  };

  (pdfMake as any).createPdf(doc).download('Debriefing.pdf');
}
