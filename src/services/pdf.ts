// src/services/pdf.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GameState } from '@/core/engine/gameEngine';
import { EndingResult } from '@/core/engine/ending';
import { EndingViewModel } from '@/core/engine/ending_extras';
import { appendFinalScoreToDocDefinition } from '@/services/pdfExtras';

// Logo und Footer-Konstanten
const LOGO_URL = 'https://uvm-akademie.de/logo.png';
const FOOTER_TEXT = `© 2026 UVM-Institut Prof. Dr. Steiner & Prof. Dr. Landes Partnerschaftsgesellschaft
www.uvm-cg.de | info@uvm-institut.de | Büro Erding: Pater-Alois-Weg 12, 85435 Erding | Büro Olching: Josef-Bergmann-Weg 1, 82150 Olching`;

// Logo als Base64 laden
async function loadLogoAsBase64(): Promise<string | null> {
  try {
    const response = await fetch(LOGO_URL);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function addHeaderAndFooter(doc: jsPDF, title: string, logoBase64?: string | null) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Header mit Logo und Titel
  if (logoBase64) {
    try {
      // Logo rechts oben (80x40 Pixel)
      doc.addImage(logoBase64, 'PNG', pageWidth - 100, 10, 80, 40);
    } catch {
      // Fallback wenn Logo nicht geladen werden kann
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('UVM-Institut', pageWidth - 100, 30);
    }
  } else {
    // Fallback ohne Logo
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('UVM-Institut', pageWidth - 100, 30);
  }
  
  // Titel links
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(title, 20, 30);
  
  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const footerLines = doc.splitTextToSize(FOOTER_TEXT, pageWidth - 40);
  const footerY = pageHeight - 30;
  doc.text(footerLines, 20, footerY);
}

export async function exportRoundPdf(s: GameState) {
  const logoBase64 = await loadLogoAsBase64();
  const doc = new jsPDF({ unit:'pt' });
  
  const title = `Tag ${s.day} – Entscheidungsprotokoll`;

  // Header und Footer auf erster Seite hinzufügen
  addHeaderAndFooter(doc, title, logoBase64);

  const rows = s.log
    .filter(e=>e.day===s.day)
    .map(e=>[
      e.day,
      e.role,
      e.blockId,
      e.chosenOptionId ? `${String(e.chosenOptionId).toUpperCase()} — ${e.chosenOptionLabel ?? ''}` : '–',
      e.customText ?? '–',
      new Date(e.timestampISO).toLocaleString('de-DE')
    ]);

  autoTable(doc, {
    head:[['Tag','Rolle','Block','Gewählte Option','Eigene Alternative','Zeit']],
    body: rows,
    startY: 60,
    styles:{ fontSize:10, cellPadding:6, overflow:'linebreak' },
    headStyles:{ fillColor:[30,30,30] },
    didDrawPage: function (data) {
      // Header und Footer auf jeder neuen Seite
      addHeaderAndFooter(doc, title, logoBase64);
    }
  });

  doc.save(`runde_tag_${s.day}.pdf`);
}

export async function exportFullPdf(s: GameState, ending?: EndingResult) {
  const logoBase64 = await loadLogoAsBase64();
  const doc = new jsPDF({ unit:'pt' });
  
  const mainTitle = 'Gesamtprotokoll – 14 Tage';

  // Header und Footer auf erster Seite
  addHeaderAndFooter(doc, mainTitle, logoBase64);

  // Endpfad (falls vorhanden)
  if (ending) {
    doc.setFontSize(12);
    doc.text(ending.title, 20, 70);
    doc.setFont('helvetica','normal');
    wrapText(doc, ending.summary, 20, 90, 520);
    autoTable(doc, {
      head:[['Kriterium','Punkte']],
      body:[
        ['Score (gesamt)', `${ending.score}`],
        ['Liquidität', `${ending.breakdown.cash}`],
        ['Gewinn/Verlust', `${ending.breakdown.pl}`],
        ['Kundentreue', `${ending.breakdown.customers}`],
        ['Bankvertrauen', `${ending.breakdown.bank}`],
        ['Belegschaftsengagement', `${ending.breakdown.workforce}`],
        ['Öffentliche Wahrnehmung', `${ending.breakdown.publicPerception}`],
        ['Bonus', `+${ending.bonus}`],
        ['Malus', `-${ending.malus}`],
      ],
      startY: 160,
      styles:{ fontSize:10, cellPadding:6 },
      headStyles:{ fillColor:[30,30,30] },
      didDrawPage: function (data) {
        addHeaderAndFooter(doc, mainTitle, logoBase64);
      }
    });
  }

  // Benutzernotizen (neue Seite)
  if (s.userNotes && s.userNotes.trim()) {
    doc.addPage();
    addHeaderAndFooter(doc, mainTitle, logoBase64);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Benutzernotizen zum Spielverlauf', 20, 70);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const notesLines = doc.splitTextToSize(s.userNotes.trim(), 520);
    doc.text(notesLines, 20, 95);
  }

  // Entscheidungslog
  doc.addPage();
  addHeaderAndFooter(doc, mainTitle, logoBase64);
  
  autoTable(doc, {
    head:[['Tag','Rolle','Block','Gewählte Option','Eigene Alternative','Zeit']],
    body: s.log.map(e=>[
      e.day,
      e.role,
      e.blockId,
      e.chosenOptionId ? `${String(e.chosenOptionId).toUpperCase()} — ${e.chosenOptionLabel ?? ''}` : '–',
      e.customText ?? '–',
      new Date(e.timestampISO || e.ts || Date.now()).toLocaleString('de-DE')
    ]),
    startY: 60,
    styles:{ fontSize:10, cellPadding:6, overflow:'linebreak' },
    headStyles:{ fillColor:[30,30,30] },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, mainTitle, logoBase64);
    }
  });

  // KPI-Verläufe
  doc.addPage();
  addHeaderAndFooter(doc, mainTitle, logoBase64);
  
  autoTable(doc, {
    head:[['Tag','Cash (€)','G/V (€)','Kunden','Bank','Belegschaft','Öffentlichkeit']],
    body: s.kpiHistory.map((k,i)=>[
      i+1,
      k.cashEUR,
      k.profitLossEUR,
      k.customerLoyalty,
      k.bankTrust,
      k.workforceEngagement,
      k.publicPerception
    ]),
    startY: 60,
    styles:{ fontSize:9, cellPadding:5 },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, mainTitle, logoBase64);
    }
  });

  if (s.insolvency) {
    doc.addPage();
    addHeaderAndFooter(doc, mainTitle, logoBase64);
  }

  // Seite: Cash Bridge
  doc.addPage();
  addHeaderAndFooter(doc, mainTitle, logoBase64);
  const bridge = (s.engineMeta && (s.engineMeta as any).bridge) || {};
  const rowsBridge: any[] = [];
  let sumE=0, sumW=0, sumF=0;
  for (let d=1; d<=14; d++) {
    const b = bridge[d] || { ebitToCash:0, workingCapital:0, financing:0 };
    rowsBridge.push([d, Math.round(b.ebitToCash), Math.round(b.workingCapital), Math.round(b.financing)]);
    sumE += b.ebitToCash||0; sumW += b.workingCapital||0; sumF += b.financing||0;
  }
  autoTable(doc, {
    startY: 60,
    head: [['Tag','EBIT→Cash','ΔWC/Residual','Finanzierung']],
    body: rowsBridge,
    foot: [['Summe', Math.round(sumE), Math.round(sumW), Math.round(sumF)]],
    styles:{ fontSize:9, cellPadding:4 },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, mainTitle, logoBase64);
    }
  });

  // Seite: Ereignisse (Band) & Nebenwirkungen/Notizen
  doc.addPage();
  addHeaderAndFooter(doc, mainTitle, logoBase64);
  const meta:any = (s.engineMeta||{});
  const rand = (meta.randomNews||{});
  const notes = (meta.notes||{});
  const rowsEv: any[] = [];
  for (let d=1; d<=14; d++) {
    const list = rand[d] || [];
    if (list.length) {
      list.forEach((n:any)=>rowsEv.push([d, n.title, n.source, n.severity]));
    }
  }
  autoTable(doc, {
    startY: 60,
    head: [['Tag','Titel','Quelle','Schwere']],
    body: rowsEv.length ? rowsEv : [[ '-', '—', '—', '—' ]],
    styles:{ fontSize:9, cellPadding:4 },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, mainTitle, logoBase64);
    }
  });

  doc.addPage();
  addHeaderAndFooter(doc, mainTitle, logoBase64);
  const rowsNotes: any[] = [];
  for (let d=1; d<=14; d++) {
    if (notes[d]) rowsNotes.push([d, notes[d]]);
  }
  autoTable(doc, {
    startY: 60,
    head: [['Tag','Hinweis']],
    body: rowsNotes.length ? rowsNotes : [[ '-', '—' ]],
    styles:{ fontSize:9, cellPadding:4 },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, mainTitle, logoBase64);
    }
  });

  // Trends (einfach: Pfeil anhand Vortagsdifferenz)
  doc.addPage();
  addHeaderAndFooter(doc, mainTitle, logoBase64);
  const rowsTrend: any[] = [];
  for (let d=2; d<=14; d++) {
    const prev = s.kpiHistory[d-2] || null;
    const cur  = s.kpiHistory[d-1] || null;
    if (!prev || !cur) continue;
    function arrow(x:number){ return x>0 ? '↑' : (x<0 ? '↓' : '→'); }
    rowsTrend.push([d,
      arrow(cur.customerLoyalty - prev.customerLoyalty),
      arrow(cur.bankTrust - prev.bankTrust),
      arrow(cur.workforceEngagement - prev.workforceEngagement),
      arrow(cur.publicPerception - prev.publicPerception)
    ]);
  }
  autoTable(doc, {
    startY: 60,
    head: [['Tag','Kunden','Bank','Belegschaft','Öffentlichkeit']],
    body: rowsTrend.length ? rowsTrend : [[ '-', '—','—','—','—' ]],
    styles:{ fontSize:9, cellPadding:4 },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, mainTitle, logoBase64);
    }
  });

  doc.save('gesamtprotokoll.pdf');
}

export async function exportEndingPdf(vm: EndingViewModel, state: GameState) {
  const logoBase64 = await loadLogoAsBase64();
  const doc = new jsPDF({ unit: 'pt' });
  
  const title = `Abschlussbericht – ${vm.ending.title}`;

  // Header und Footer auf erster Seite
  addHeaderAndFooter(doc, title, logoBase64);

  // Seite 1: Ending Summary
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(vm.ending.title, 20, 70);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(vm.ending.summary, 520);
  doc.text(summaryLines, 20, 100);

  // Score-Tabelle
  autoTable(doc, {
    head: [['Kriterium', 'Punkte', 'Aktueller Wert']],
    body: [
      ['Gesamtscore', `${vm.ending.score}/100`, '–'],
      ['Liquidität', `${vm.ending.breakdown.cash}`, `${vm.kpiRaw.cashEUR.toLocaleString('de-DE')} €`],
      ['Gewinn/Verlust', `${vm.ending.breakdown.pl}`, `${vm.kpiRaw.profitLossEUR.toLocaleString('de-DE')} €`],
      ['Kundentreue', `${vm.ending.breakdown.customers}`, `${Math.round(vm.kpiRaw.customerLoyalty)}/100`],
      ['Bankvertrauen', `${vm.ending.breakdown.bank}`, `${Math.round(vm.kpiRaw.bankTrust)}/100`],
      ['Belegschaftsengagement', `${vm.ending.breakdown.workforce}`, `${Math.round(vm.kpiRaw.workforceEngagement)}/100`],
      ['Öffentliche Wahrnehmung', `${vm.ending.breakdown.publicPerception}`, `${Math.round(vm.kpiRaw.publicPerception)}/100`],
      ['Bonus', `+${vm.ending.bonus}`, '–'],
      ['Malus', `-${vm.ending.malus}`, '–']
    ],
    startY: 180,
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [30, 30, 30] },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, title, logoBase64);
    }
  });

  // Seite 2: KPI-Entwicklung über alle Tage
  doc.addPage();
  addHeaderAndFooter(doc, title, logoBase64);
  
  // KPI-History Tabelle
  const kpiHistoryRows = [];
  for (let day = 1; day <= 14; day++) {
    const dayIndex = day - 1;
    const kpi = dayIndex < state.kpiHistory.length ? state.kpiHistory[dayIndex] : 
                (day === state.day ? state.kpi : null);
    
    if (kpi) {
      kpiHistoryRows.push([
        day,
        kpi.cashEUR.toLocaleString('de-DE'),
        kpi.profitLossEUR.toLocaleString('de-DE'),
        Math.round(kpi.customerLoyalty),
        Math.round(kpi.bankTrust),
        Math.round(kpi.workforceEngagement),
        Math.round(kpi.publicPerception)
      ]);
    }
  }

  autoTable(doc, {
    head: [['Tag', 'Cash (€)', 'G/V (€)', 'Kunden', 'Bank', 'Team', 'Öffentlich']],
    body: kpiHistoryRows,
    startY: 60,
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [30, 30, 30] },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, title, logoBase64);
    }
  });

  // Seite 3: Alle Entscheidungen chronologisch
  doc.addPage();
  addHeaderAndFooter(doc, title, logoBase64);
  
  const decisionRows = vm.decisions.map(d => [
    d.day,
    d.role,
    d.blockId,
    d.title || '–',
    `${d.optionId.toUpperCase()} — ${d.optionLabel}`,
    Object.entries(d.kpiDelta || {})
      .filter(([, v]) => Number(v) !== 0)
      .map(([k, v]) => `${k}: ${v > 0 ? '+' : ''}${v}`)
      .join(', ') || 'keine KPI-Änderung'
  ]);

  autoTable(doc, {
    head: [['Tag', 'Rolle', 'Block-ID', 'Titel', 'Gewählte Option', 'KPI-Auswirkungen']],
    body: decisionRows,
    startY: 60,
    styles: { fontSize: 8, cellPadding: 4, overflow: 'linebreak' },
    headStyles: { fillColor: [30, 30, 30] },
    columnStyles: {
      3: { cellWidth: 120 }, // Titel
      4: { cellWidth: 140 }, // Option
      5: { cellWidth: 120 }  // KPI-Auswirkungen
    },
    didDrawPage: function (data) {
      addHeaderAndFooter(doc, title, logoBase64);
    }
  });

  // Seite 4: Top-Entscheidungen nach KPI-Bereichen
  doc.addPage();
  addHeaderAndFooter(doc, title, logoBase64);
  
  let currentY = 60;
  const kpiAreas = [
    { key: 'bankTrust', label: 'Bankvertrauen' },
    { key: 'cashEUR', label: 'Liquidität (€)' },
    { key: 'customerLoyalty', label: 'Kundentreue' },
    { key: 'workforceEngagement', label: 'Team-Engagement' },
    { key: 'publicPerception', label: 'Öffentliche Wahrnehmung' },
    { key: 'profitLossEUR', label: 'Gewinn/Verlust (€)' }
  ];

  for (const area of kpiAreas) {
    const impacts = vm.diagnostics.topImpacts[area.key as keyof typeof vm.diagnostics.topImpacts];
    
    if (impacts && (impacts.positive.length > 0 || impacts.negative.length > 0)) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(area.label, 40, currentY);
      currentY += 20;

      const impactRows = [
        ...impacts.positive.slice(0, 3).map(it => [
          `Tag ${it.day}`,
          it.role,
          it.optionLabel,
          `+${it.delta}`,
          'Positiv'
        ]),
        ...impacts.negative.slice(0, 3).map(it => [
          `Tag ${it.day}`,
          it.role,
          it.optionLabel,
          `${it.delta}`,
          'Negativ'
        ])
      ];

      if (impactRows.length > 0) {
        autoTable(doc, {
          head: [['Tag', 'Rolle', 'Entscheidung', 'Auswirkung', 'Typ']],
          body: impactRows,
          startY: currentY,
          styles: { fontSize: 8, cellPadding: 3 },
          headStyles: { fillColor: [50, 50, 50] },
          margin: { left: 20, right: 20 },
          didDrawPage: function (data) {
            addHeaderAndFooter(doc, title, logoBase64);
          }
        });
        currentY = (doc as any).lastAutoTable.finalY + 15;
      }
    }
    
    // Neue Seite wenn nötig
    if (currentY > 700) {
      doc.addPage();
      addHeaderAndFooter(doc, title, logoBase64);
      currentY = 60;
    }
  }

  doc.save(`abschlussbericht_tag14_${vm.ending.id.toLowerCase()}.pdf`);
}

function wrapText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
}