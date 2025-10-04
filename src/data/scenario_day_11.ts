// src/data/scenario_day_11.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

/**
 * TAG 11 — 20 Entscheidungsblöcke (je 5 pro Rolle)
 * Fokus: Umsetzung der Waiver-Auflagen, Lieferanten-Standstill läuft partiell aus,
 * Kundenbindung kurz vor Endphase, interne Spannungen wegen Ressourcen.
 * Hinweis: Die ursprünglichen 16 Blöcke bleiben unverändert; je Rolle wird ein 5. Block ergänzt.
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D11-CEO-1',
    day: 11,
    role: 'CEO',
    title: 'Waiver-Meilensteine öffentlich machen?',
    context: 'Vor der Zwischenprüfung (Tag 12) überlegt das Management, Meilensteine gegenüber Schlüsselkunden zu teilen.',
    dilemma: 'Transparenz vs. Angriffsfläche',
    hiddenAgendaHint: 'Glaubwürdigkeit steigt, wenn die Kommunikation konsistent mit der Bank ist.',
    options: [
{ id: 'a', label: 'Interne Info nur an Vertrieb',             kpiDelta: { customerLoyalty: +1, workforceEngagement: +1 } },
{ id: 'b', label: 'Kurz-Fact-Sheet an Key Accounts',          kpiDelta: { customerLoyalty: +3, bankTrust: +2, publicPerception: +1, workforceEngagement: +2 } },
      { id: 'c', label: 'Keine proaktive Info',                     kpiDelta: { customerLoyalty: -2, workforceEngagement: -1 } },
{ id: 'd', label: 'LinkedIn-Post mit allgemeinen Aussagen',   kpiDelta: { publicPerception: +2, bankTrust: -1, workforceEngagement: -1 } }
  ],
  attachments: ['waiver_meilensteine_v1.pdf']
  },
{
    id: 'D11-CEO-2',
    day: 11,
    role: 'CEO',
    title: 'LOI mit Industriepartner konkretisieren',
    context: 'Der in Aussicht stehende LOI (Tag 10) benötigt Eckpunkte.',
    dilemma: 'Verbindlichkeit vs. Flexibilität',
    hiddenAgendaHint: 'Reversibilität über Ausstiegsklauseln wahren.',
    options: [{ id: 'a', label: 'LOI inkl. Exit-Klausel & Nichtexklusivität', kpiDelta: { bankTrust: +2, publicPerception: +1,
      workforceEngagement: +1 },
  isTradeOff: true },
{ id: 'b', label: 'Nur Absichtserklärung ohne Zahlen',           kpiDelta: { bankTrust: 0, publicPerception: +1 } },
{ id: 'c', label: 'Entscheidung vertagen',                       kpiDelta: { bankTrust: -1, workforceEngagement: -1} },
{ id: 'd', label: 'LOI absagen',                                 kpiDelta: { bankTrust: -2, publicPerception: -1, workforceEngagement: -2 } }
  ],
  attachments: ['loi_termsheet_v0.docx']
  },
{
    id: 'D11-CEO-3',
    day: 11,
    role: 'CEO',
    title: 'Krisen-OKR – Fokus nachschärfen',
    context: 'Zu viele parallele Initiativen – Fokus droht zu verwässern.',
    dilemma: 'Breite vs. Tiefe',
    hiddenAgendaHint: 'Weniger, aber glasklar gemanagt, erhöht Erfolgschancen.',
    options: [{ id: 'a', label: 'Top-5 OKR priorisieren, Rest parken',        kpiDelta: { workforceEngagement: +3, bankTrust: +1 } },
{ id: 'b', label: 'Alle OKR fortführen (Breite halten)',        kpiDelta: { workforceEngagement: -1 } },
{ id: 'c', label: 'OKR komplett neu schneiden',                 kpiDelta: { workforceEngagement: 0 } },
{ id: 'd', label: 'OKR öffentlich machen (PR-Risiko)',          kpiDelta: { publicPerception: +1, bankTrust: -1, customerLoyalty: -1 } }
  ],
  attachments: ['d10_ceo_okr_review_agenda_tag10.pdf']
  },

{
    id: 'D11-CEO-4',
    day: 11,
    role: 'CEO',
    title: 'Kunden-Council kurzfristig einberufen',
    context: 'Einige A-Kunden bitten um Update vor Tag 12.',
    dilemma: 'Zeitaufwand vs. Vertrauensgewinn',
    hiddenAgendaHint: 'Gezieltes Council stützt Loyalität und Orders.',
    options: [{ id: 'a', label: '30-Min Call mit Top-3 Kunden',               kpiDelta: { customerLoyalty: +4, publicPerception: +1 },
  isTradeOff: true },
{ id: 'b', label: 'Schriftliches Update statt Call',            kpiDelta: { customerLoyalty: +1 } },
{ id: 'c', label: 'Individuellen Key-Account-Call',         kpiDelta: { customerLoyalty: +6 } },
{ id: 'd', label: 'Kein Council',                               kpiDelta: { customerLoyalty: -2, publicPerception: -1 } }
  ],
  attachments: ['d11_ceo_public_statement_sachlicher_rahmen_tag11.pdf']
  },
];

// NEU (5. CEO-Block – Folge Tag 10: Medien-/Stakeholder-Alignment vor Zwischenprüfung)
const CEO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D11-CEO-5',
  day: 11,
  role: 'CEO',
  title: 'Stakeholder-Alignment 24h-Plan',
  context: 'Nach LOI-Druck (Tag 10), Übernahme-Offerte und Qualitätsdebatte sollen Bank, Beirat und Kernkunden in einem abgestimmten Ablauf beruhigt werden.',
  dilemma: 'Gezielte Aufklärung vs. Risiko zusätzlicher Angriffsflächen',
  hiddenAgendaHint: 'Kurze, faktenbasierte Touchpoints stabilisieren Vertrauen ohne Überkommunikation.',
  options: [
   
    { id: 'a', label: 'Nur Bank/Beirat briefen, Kunden schriftlich',      kpiDelta: { bankTrust: +2, customerLoyalty: +1 } },
     { id: 'b', label: 'Joint-Briefing Bank/Beirat + Key-Account-Roundup', kpiDelta: { bankTrust: +2, customerLoyalty: +2, publicPerception: +2 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Nur Pressearbeit (breit) statt Stakeholder-Fokus', kpiDelta: { publicPerception: +2, customerLoyalty: -2, bankTrust: -2, workforceEngagement: -1 } },
    { id: 'd', label: 'Monitoring ohne proaktive Kontakte',               kpiDelta: { publicPerception: -1, workforceEngagement: -1, ustomerLoyalty: -2 } }
  ]
,
  attachments: ['d11_ceo_24h_alignment_playbook_tag11.pdf']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D11-CFO-1',
    day: 11,
    role: 'CFO',
    title: 'Waiver-Reporting finalisieren',
    context: 'Datenschnitt bis gestern Abend; Bank erwartet Forecast-Update.',
    dilemma: 'Detailtiefe vs. Geschwindigkeit',
    hiddenAgendaHint: 'Sensitivitäten erhöhen Akzeptanz.',
    options: [{ id: 'a', label: 'Waiver-Vollreport + Sensitivitäten (Base/Downside)', kpiDelta: { bankTrust: +6 } },
{ id: 'b', label: 'Waiver - Nur Base-Case liefern',                       kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Nur KPI-Summary',                              kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Extern plausibilisieren',                 kpiDelta: { cashEUR: -3000, profitLossEUR: -3000, bankTrust: +3 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
attachments: ['d11_cfo_cash_gatekeeping_runbook_tag11.pdf']
  },
{
    id: 'D11-CFO-2',
    day: 11,
    role: 'CFO',
    title: 'Cash-Polster bis Tag 21 schließen',
    context: 'Liquiditätsplanung zeigt Restlücke von rund 50k.',
    dilemma: 'Ergebnis vs. Runway',
    hiddenAgendaHint: 'Bank darf keinen Panikmodus erkennen.',
    options: [{ id: 'a', label: 'Gezielte Skontoaktion Top-Kunden (3 %)',      kpiDelta: { cashEUR: +50000, profitLossEUR: -7500, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'b', label: 'Abverkauf C-Bestände',           kpiDelta: { cashEUR: +35000, profitLossEUR: -5000 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'c', label: 'Zwischenlinie bei Bank anfragen',             kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Keine Maßnahme (Risiko)',                      kpiDelta: { bankTrust: -2 } }
  ],
  attachments: ['d11_cfo_Action Liquidity_tag11.pdf']
  },

{
    id: 'D11-CFO-3',
    day: 11,
    role: 'CFO',
    title: 'Lieferanten-Zahlplan nachschärfen',
    context: 'Standstill bei zwei Lieferanten läuft aus.',
    dilemma: 'Härte vs. Versorgungssicherheit',
    hiddenAgendaHint: 'DB/Kritikalität konsistent anwenden.',
    options: [{ id: 'a', label: 'DB-Matrix nachziehen, A-Lieferanten bedienen', kpiDelta: { bankTrust: +2, customerLoyalty: +1 } },
{ id: 'b', label: 'Gleichbehandlung (einfach, aber unflexibel)',  kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Zahlungen pausieren und Bank informieren',     kpiDelta: { bankTrust: +2, customerLoyalty: -2 } },
{ id: 'd', label: 'Vorleistung fordern (Risiko Eskalation)',      kpiDelta: { customerLoyalty: -3, publicPerception: -1 } }
  ],
  attachments: ['11_cfo_Lieferanten_tag11.pdf']
  },
{
    id: 'D11-CFO-4',
    day: 11,
    role: 'CFO',
    title: 'Übernahme-Offerte',
    context: 'Investor verbessert sein Angebot: 22,5 % für 5,5M. CEO fordert Einschätzung.',
    dilemma: 'Unabhängigkeit vs. finanzielle Entspannung',
    hiddenAgendaHint: 'Informationen zum Investor ergeben gemischtes Bild: Erwartet schnelle Rendite, harte Einschnitte und will Einfluss.',
    options: [{ id: 'a', label: 'Vertiefte Verhandlungen empfehlen',                   kpiDelta: { bankTrust: +2, workforceEngagement: -4, publicPerception: -1  } },
{ id: 'b', label: 'Weiter hinhalten und verbessertes Angebot abwarten.',                 kpiDelta: { bankTrust: -1 } },
{ id: 'c', label: 'Ablehnung der Offerte empfehlen',                               kpiDelta: { bankTrust: -3,  workforceEngagement: +3, publicPerception: +1 } },
{ id: 'd', label: 'Annahme empfehlen',                kpiDelta: { bankTrust: +4, workforceEngagement: -6, publicPerception: -2 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
  attachments: ['d11_cfo_investor_tag11.pdf']
  }];

// NEU (5. CFO-Block – Folge Tag 10: Term Sheet & Covenants)
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D11-CFO-5',
  day: 11,
  role: 'CFO',
  title: 'Term Sheet unterschreiben & Covenant-Trigger festlegen',
  context: 'Bank-Term Sheet liegt vor; Gebühren, Informationsrechte und Trigger müssen final bestätigt werden.',
  dilemma: 'Kosten vs. Flexibilität',
  hiddenAgendaHint: 'Moderate Gebühr mit klaren, messbaren Milestones erhöht Akzeptanz.',
  options: [
    { id: 'a', label: 'Term Sheet mit moderater Fee + harten Milestones zeichnen',  kpiDelta: { bankTrust: +4, profitLossEUR: -4000 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Redlines senden (leichtere Trigger, geringere Fee)',           kpiDelta: { bankTrust: +1, profitLossEUR: -2000  } },
    { id: 'c', label: 'Mehr Linie gegen höhere Fee akzeptieren',                    kpiDelta: { bankTrust: +3, profitLossEUR: -8000 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'd', label: 'Entscheidung vertagen (Signalrisiko)',                       kpiDelta: { bankTrust: -3 } }
  ]
,
  attachments: ['d11_cfo_term_sheet_redlines_covenant_matrix_tag11.docx']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
  id: 'D11-OPS-1',
  day: 11,
  role: 'OPS',
  title: 'Verkauf Tochterunternehmen UPA: Carve-out Operations – Separierung der Systeme',
  context: 'Käufer verlangt Klarheit über eigenständige Lieferfähigkeit der zu veräußernden Einheit.',
  dilemma: 'IT/Logistik trennen vs. Synergieeffekte erhalten',
  hiddenAgendaHint: 'Saubere Carve-out-Readiness erhöht Deal-Wert.',
  options: [
    { id: 'a', label: 'IT- und Logistikprozesse sofort abspalten (hoher Aufwand, klare Trennung)',
      kpiDelta: { bankTrust: +2, profitLossEUR: -15000, customerLoyalty: 0,  workforceEngagement: -6 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true },
    { id: 'b', label: 'Teilweise Trennung (kritische Systeme sofort, Rest später)',
      kpiDelta: { bankTrust: +1, profitLossEUR: -8000, customerLoyalty: +1,  workforceEngagement: -4 },
      variance: 0.6, execLeakage: 0.5 },
    { id: 'c', label: 'Keine Trennung vorbereiten; Synergien betonen',
      kpiDelta: { bankTrust: -2, publicPerception: -1 },
      variance: 0.5, execLeakage: 0.4 },
    { id: 'd', label: 'Externe Carve-out-Berater beauftragen',
      kpiDelta: { bankTrust: +3, profitLossEUR: -20000 },
      variance: 0.8, execLeakage: 0.6 }
  ],
  attachments: ['d11_ops_carve-out-UPA_tag11.pdf']
  },
{
  id: 'D11-OPS-2',
  day: 11,
  role: 'OPS',
  title: 'Lieferkette – Risikoanalyse für Käufer-Tochterunternehmen',
  context: 'Investor fordert Übersicht kritischer Zulieferer (Top 20) für die Due Diligence.',
  dilemma: 'Transparenz vs. Verhandlungsposition',
  hiddenAgendaHint: 'Frühe Transparenz stärkt Glaubwürdigkeit, kann aber Schwächen offenlegen.',
  options: [
    { id: 'a', label: 'Vollständige Risikoanalyse inkl. Alternativlieferanten',
      kpiDelta: { bankTrust: +4, profitLossEUR: -10000, publicPerception: +1,  customerLoyalty: -2 },
      variance: 0.7, execLeakage: 0.5, isTradeOff: true },
    { id: 'b', label: 'Nur Top-5 Zulieferer dokumentieren',
      kpiDelta: { bankTrust: +2, profitLossEUR: -4000,  customerLoyalty: -1 },
      variance: 0.6, execLeakage: 0.4 },
    { id: 'c', label: 'Keine systematische Analyse – Antworten ad hoc',
      kpiDelta: { bankTrust: -3, publicPerception: -1 },
      variance: 0.5, execLeakage: 0.5 },
    { id: 'd', label: 'Externe Zertifizierung',
      kpiDelta: { bankTrust: +5, profitLossEUR: -15000 },
      variance: 0.8, execLeakage: 0.6 }
  ],
  attachments: ['d11_ops_Risikoanalyse_phase2_tag11.pdf']
  },
{
  id: 'D11-OPS-3',
  day: 11,
  role: 'OPS',
  title: 'Kapazitätssteuerung nach Teilverkauf UPA',
  context: 'Ein Teil der Produktion soll künftig exklusiv für den Käufer laufen. Engpässe drohen in Kernlinien.',
  dilemma: 'Verkäuferpflichten erfüllen vs. Stammkunden halten',
  hiddenAgendaHint: 'Priorisierung signalisiert Professionalität.',
  options: [
    { id: 'a', label: 'Eigene Kunden priorisieren; Käufer bekommt reduzierte Kapazität',
      kpiDelta: { customerLoyalty: +3, bankTrust: -1 },
      variance: 0.7, execLeakage: 0.5 },
    { id: 'b', label: 'Käufer-Aufträge strikt erfüllen; eigene Kunden warten',
      kpiDelta: { bankTrust: +2, customerLoyalty: -2 },
      variance: 0.7, execLeakage: 0.5 },
    { id: 'c', label: '50/50-Splitting mit klaren Kontingenten',
      kpiDelta: { customerLoyalty: +1, bankTrust: +1 },
      variance: 0.6, execLeakage: 0.4 },
    { id: 'd', label: 'Externe Fertigungskapazität (Kosten 12k) hinzunehmen',
      kpiDelta: { profitLossEUR: -12000, customerLoyalty: +2, bankTrust: +2 },
      variance: 0.8, execLeakage: 0.6 }
  ],
  attachments: ['d11_ops_Kundenprio_tag11.pdf']
  },
{
  id: 'D11-OPS-4',
  day: 11,
  role: 'OPS',
  title: 'Kommunikation in der Fertigung – Gerüchte um Käufer',
  context: 'Mitarbeiter in der Produktion hören von Teilverkaufsplänen, Unsicherheit wächst.',
  dilemma: 'Offene Kommunikation vs. Vertraulichkeit im Prozess',
  hiddenAgendaHint: 'Gezielte Info vermeidet Fluktuation.',
  options: [
    { id: 'a', label: 'Transparente Info-Runde + FAQ zu Carve-out-Prozess',
      kpiDelta: { workforceEngagement: +4, publicPerception: +1 },
      variance: 0.6, execLeakage: 0.4 },
    { id: 'b', label: 'Nur enge Führungskreise briefen',
      kpiDelta: { workforceEngagement: -1 },
      variance: 0.5, execLeakage: 0.3 },
    { id: 'c', label: 'Keine Kommunikation, alles vertraulich halten',
      kpiDelta: { workforceEngagement: -3, publicPerception: -2 },
      variance: 0.4, execLeakage: 0.2 },
    { id: 'd', label: 'Externe Kommunikationsberater beiziehen',
      kpiDelta: { profitLossEUR: -8000, workforceEngagement: +2, publicPerception: +4 },
      variance: 0.7, execLeakage: 0.6 }
  ],
  attachments: ['d11_ops_Kommunikation_tag11.pdf']
  }];

// NEU (5. OPS-Block – Folge Tag 10: Qualitätssicherung nach Lieferanten-Standstill)
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D11-OPS-5',
  day: 11,
  role: 'OPS',
  title: 'Qualitätssicherung nach Lieferanten-Standstill',
  context: 'Nach dem partiellen Auslaufen des Lieferanten-Standstills müssen QS-Prozesse für kritische Komponenten nachgeschärft werden.',
  dilemma: 'Sicherheit vs. Geschwindigkeit',
  hiddenAgendaHint: 'Strenge QS-Kontrollen reduzieren Reklamationsrisiken, können aber Lieferzeiten verlängern.',
  options: [
    { id: 'a', label: '72h-Freeze mit 100%-Prüfung für A-Komponenten',
      kpiDelta: { customerLoyalty: +3, profitLossEUR: -8000 },
      variance: 0.7, execLeakage: 0.6 },
    { id: 'b', label: 'AQL-Plan mit gestuftem Ramp-up',
      kpiDelta: { customerLoyalty: +2, profitLossEUR: -4000 },
      variance: 0.6, execLeakage: 0.5 },
    { id: 'c', label: 'Standard-QS beibehalten',
      kpiDelta: { customerLoyalty: -1 },
      variance: 0.5, execLeakage: 0.4 },
    { id: 'd', label: 'Nur Hauptlieferanten prüfen',
      kpiDelta: { customerLoyalty: +1, profitLossEUR: -2000 },
      variance: 0.6, execLeakage: 0.5 }
  ],
  attachments: ['']
}];


const HRLEGAL_BLOCKS: DecisionBlock[] = [{
  id: 'D11-HRLEGAL-1',
  day: 11,
  role: 'HRLEGAL',
  title: 'Teilverkauf – Disclosure Letter & Garantiekatalog',
  context: 'Investoren verlangen ein Disclosure Package (Haftungsausnahmen), inkl. arbeits- und datenschutzrechtlicher Risiken.',
  dilemma: 'Transparenz vs. Haftungsrisiko',
  hiddenAgendaHint: 'Ein sauberer Disclosure Letter stärkt Bankvertrauen, kann aber Kaufpreis mindern.',
  options: [
    { id: 'a', label: 'Vollständiger Disclosure Letter mit allen Risiken (Arbeitsrecht, Datenschutz, laufende Verfahren)',
      kpiDelta: { bankTrust: +4, cashEUR: -10000, profitLossEUR: -10000, publicPerception: +1 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true },
    { id: 'b', label: 'Nur arbeitsrechtliche Risiken offenlegen, Rest später',
      kpiDelta: { bankTrust: +2, cashEUR: -4000, profitLossEUR: -4000 },
      variance: 0.6, execLeakage: 0.5 },
    { id: 'c', label: 'Disclosure auf Minimum reduzieren; Risiken über SPA-Reps (Share Purchase Agreement) schieben',
      kpiDelta: { bankTrust: -2, publicPerception: -1 },
      variance: 0.5, execLeakage: 0.5 },
    { id: 'd', label: 'Externe Kanzlei für Disclosure-Redaktion beauftragen',
      kpiDelta: { bankTrust: +5, cashEUR: -25000, profitLossEUR: -25000, publicPerception: +2 },
      variance: 0.8, execLeakage: 0.6 }
  ],
  attachments: ['d11_hrlegal_Disclosure_tag11.pdf']
  },
{
  id: 'D11-HRLEGAL-2',
  day: 11,
  role: 'HRLEGAL',
  title: 'Teilverkauf – Mitbestimmungsrechte & Informationspflichten',
  context: 'Betriebsrat fordert frühzeitige Einbindung, während Verhandlungen vertraulich bleiben sollen.',
  dilemma: 'Rechtssicherheit vs. Vertraulichkeit',
  hiddenAgendaHint: 'Ein abgestimmter Informationsplan senkt Anfechtungsrisiken und stärkt Vertrauen.',
  options: [
    { id: 'a', label: 'Frühzeitige BR-Information mit rechtlicher Absicherung (Interessenausgleich vorbereiten)',
      kpiDelta: { workforceEngagement: +4, bankTrust: +2, publicPerception: +1, customerLoyalty: -2 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true },
    { id: 'b', label: 'Nur gesetzliches Minimum erfüllen (Info kurz vor Signing)',
      kpiDelta: { bankTrust: -1, workforceEngagement: -2 },
      variance: 0.5, execLeakage: 0.4 },
    { id: 'c', label: 'BR komplett außen vor lassen – Deal als „reine Eigentümerfrage“ behandeln',
      kpiDelta: { workforceEngagement: -4, publicPerception: -2 },
      variance: 0.7, execLeakage: 0.6 },
    { id: 'd', label: 'Externe Mediatoren einbinden (Kosten 8k) zur Verhandlungsvorbereitung',
      kpiDelta: { profitLossEUR: -8000, workforceEngagement: +2, publicPerception: +2, bankTrust: +2, customerLoyalty: +1 },
      variance: 0.8, execLeakage: 0.6 }
  ],
  attachments: ['BR‑Informationsplan']
  },
{
    id: 'D11-HRLEGAL-3',
    day: 11,
    role: 'HRLEGAL',
    title: 'Compliance-Nachweise bündeln',
    context: 'Für Tag 12 müssen Dokumente vollständig sein.',
    dilemma: 'Vollständigkeit vs. Aufwand',
    hiddenAgendaHint: 'Ordnung senkt Bankreklamationen.',
    options: [{ id: 'a', label: 'Checkliste abarbeiten, Vier-Augen-Prinzip',     kpiDelta: { bankTrust: +3 } },
{ id: 'b', label: 'Nur Kernpunkte',                                 kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Auf nächste Woche schieben',                     kpiDelta: { bankTrust: -2 } },
{ id: 'd', label: 'Externen Schnellcheck',                     kpiDelta: { profitLossEUR: -2000, bankTrust: +4 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
attachments: ['compliance_checkliste_tag11.xlsx']
  },
{
    id: 'D11-HRLEGAL-4',
    day: 11,
    role: 'HRLEGAL',
    title: 'Interne Konflikte moderieren',
    context: 'Ressourcenkonflikte zwischen OPS und CFO eskalieren.',
    dilemma: 'Partei ergreifen vs. Mediation',
    hiddenAgendaHint: 'Allparteilichkeit erhält Handlungsfähigkeit.',
    options: [{ id: 'a', label: 'Extern moderierter Workshop (2h)',                      kpiDelta: { workforceEngagement: +3, bankTrust: +1, cashEUR: -2000, profitLossEUR: -2000 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Nur bilaterale Gespräche, interne Moderation',                       kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Keine Moderation',                               kpiDelta: { workforceEngagement: -3 } },
{ id: 'd', label: 'Entscheidung Top-down (Risiko)',                 kpiDelta: { workforceEngagement: -4, publicPerception: -2 } }
  ],
  attachments: ['Konflikt_Moderation.pdf']
  }];

// NEU (5. HRLEGAL-Block – Folge Tag 10: Compliance/Hotline)
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D11-HRLEGAL-5',
  day: 11,
  role: 'HRLEGAL',
  title: 'Ethik-Hotline: Hinweisbearbeitung priorisieren',
  context: 'Über die Hotline ging ein Hinweis zu Complianceproblemen im Rahen des Teilverkaufs ein; Reputationsrisiko vor Tag 12 minimieren.',
  dilemma: 'Schnelle Aufklärung vs. Aufwand und Sichtbarkeit',
  hiddenAgendaHint: 'Kurzer, dokumentierter Forensic-Check schafft Vertrauensschutz ohne große Bühne.',
  options: [
    { id: 'a', label: 'Forensic-Kurzprüfung + Audit-Trail publizieren (intern)', kpiDelta: { cashEUR: -3000, profitLossEUR: -3000, bankTrust: +2, publicPerception: +2, workforceEngagement: +3 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Interne Prüfung durch Compliance-Team',                        kpiDelta: { bankTrust: +1, workforceEngagement: +2 } },
    { id: 'c', label: 'Nur Monitoring, keine Maßnahme',                               kpiDelta: { bankTrust: -1, publicPerception: -1, workforceEngagement: -2 } },
    { id: 'd', label: 'Externer Ombudsmann beauftragen',                         kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, workforceEngagement: +1, bankTrust: +1, publicPerception: +2 } }
  ]
,
  attachments: ['d11_hrlegal_ethik_hotline_forensic_quickcheck_tag11.pdf']
}];

export const day11Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CEO_BLOCKS_EXTRA,
  ...CFO_BLOCKS,
  ...CFO_BLOCKS_EXTRA,
  ...OPS_BLOCKS,
  ...OPS_BLOCKS_EXTRA,
  ...HRLEGAL_BLOCKS,
  ...HRLEGAL_BLOCKS_EXTRA
];

// Helper-Funktionen für dynamische News
function choseCommTransparent(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    e.day <= (ctx?.day ?? 99) &&
    typeof e.chosenOptionLabel === 'string' &&
    /fakten|statement|q\&a|faq|transpar|klar|briefing|faktenbasiert|factsheet|fact\-sheet|memo/i.test(e.chosenOptionLabel)
  );
}

function mishandledComm(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    e.day <= (ctx?.day ?? 99) &&
    typeof e.chosenOptionLabel === 'string' &&
    /(ignorieren|keine.*kommunikation|optimistisch.*ohne fakten|beschönigen|nur marketing)/i.test(e.chosenOptionLabel)
  );
}

function lowBankTrust(ctx: any, thr: number = 70): boolean {
  const bt = Number(ctx?.kpi?.bankTrust ?? 100);
  return bt < thr;
}

function hasSupplierPlanOrSecurity(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(zahlungsplan|slots|standstill|sicherheiten|anderkonto|bürgschaft|term sheet|zwischenlinie|top\-up)/i.test(e.chosenOptionLabel)
  );
}

// src/data/scenario_day_11.ts — NUR den News‑Block ersetzen
export const day11News: DayNewsItem[] = [
  {
    id: 'N11-1',
    day: 11,
    title: 'Zwischenprüfung morgen bestätigt',
    source: 'bank',
    severity: 'critical',
    isImportant: true,
    content: 'Bank bittet um vollständiges Waiver‑Update (Tag 12).',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, opt?: string | RegExp) =>
        log.some((e: any) => (e?.id === id || e?.decisionId === id) &&
          (opt === undefined
            ? true
            : typeof opt === 'string'
              ? e?.optionId === opt
              : opt.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))));

      const lowBT = Number(ctx?.kpi?.bankTrust ?? 100) < 70;
      const vollreport   = picked('D11-CFO-1', 'a') || picked('D10-CFO-1', 'a');
      const nurSummary   = picked('D11-CFO-1', 'c');
      const externCheck  = picked('D11-CFO-1', 'd') || picked('D10-CFO-1', 'd');
      const termSheetFix = picked('D11-CFO-5', 'a') || picked('D11-CFO-5', 'c');
      const termSheetRL  = picked('D11-CFO-5', 'b');
      const dashboard    = log.some((e: any) =>
        /(dashboard|daily|weekly|kpi)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')) &&
        /(D05-CFO-4|D08-CFO-3|D09-CFO-5|D10-CFO-5)/.test(String(e?.id || e?.decisionId || '')));

      let s = 'Die Hausbank bestätigt die Zwischenprüfung für morgen (Tag 12). Abgefragt werden je Meilenstein der Umsetzungsstand, Rolling‑13‑Week inkl. Sensitivitäten sowie Status bei Lieferanten‑ und Kundenstabilisierung. ';
      s += lowBT
        ? 'Die Tonlage ist fordernd: Ohne belastbare Nachweise drohen engere Informationsrechte und zusätzliche Covenants. '
        : 'Der Tenor ist kooperativ: Fortschritte werden anerkannt, valide Belege und konsistentes Reporting bleiben Voraussetzung. ';
      if (vollreport)  s += 'Pluspunkt: Ein Vollreport mit Base/Downside liegt vor – das erhöht die Akzeptanz. ';
      if (nurSummary)  s += 'Warnhinweis: Ein reines KPI‑Summary könnte Nachfragen auslösen; Downside bitte nachziehen. ';
      if (externCheck) s += 'Die externe Plausibilisierung unterlegt die Zahlen und nimmt Druck aus der Diskussion. ';
      if (termSheetFix) s += 'Das vorbereitete Term Sheet (inkl. Trigger) schafft Klarheit über die Spielregeln. ';
      if (termSheetRL)  s += 'Redlines sind adressiert – bitte die Begründung für Trigger/Fees in zwei Sätzen vorhalten. ';
      if (dashboard)    s += 'Ein KPI‑Dashboard (Daily/Weekly) ist angekündigt bzw. live; Reifegrad und Verantwortliche im Pack kurz erläutern. ';
      s += 'Empfehlung: Statusampeln aktualisieren, Owner je Meilenstein benennen und ein 20‑minütiges Pre‑Briefing mit Beirat/CFO fahren.';
      return s.trim();
    }
  },
  {
    id: 'N11-2',
    day: 11,
    title: 'Standstill einzelner Lieferanten endet',
    source: 'supplier',
    severity: 'high',
    isImportant: true,
    content: 'Zwei Partner fordern neue Zahlungsmodalitäten.',
    expandedText: (ctx: any) => {
      const planOrSec = hasSupplierPlanOrSecurity(ctx);
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const bridgeGezogen = log.some((e: any) =>
        (e?.id === 'D09-CFO-5' || e?.decisionId === 'D09-CFO-5') &&
        /a|d/i.test(String(e?.optionId))); // Top‑up oder Zwischenlinie
      const allokationP1 = log.some((e: any) =>
        (e?.id === 'D10-CFO-5' || e?.decisionId === 'D10-CFO-5') &&
        /(p1|lieferant|allokation|70k|50k)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')));

      let s = 'Bei zwei kritischen Lieferanten läuft der Standstill aus. Gefordert werden klar terminierte Zahlungen oder Sicherheiten (Bürgschaft/Anderkonto), um Materialflüsse aufrechtzuerhalten. ';
      s += planOrSec
        ? 'Gut: Der vorbereitete Zahlungsplan und angebotene Sicherheiten erleichtern die Einigung und senken Eskalationsgefahr. '
        : 'Ohne definierte Slots wächst das Risiko von Vorkasseforderungen bis hin zu Lieferstopps. ';
      if (bridgeGezogen) s += 'Die verfügbare Bridge‑Liquidität schafft Spielraum für P1‑Freigaben. ';
      if (allokationP1)  s += 'Die beschlossene Allokation an P1‑Lieferanten kann gezielt für diese beiden Fälle genutzt werden. ';
      s += 'Empfehlung: DB/Kritikalität‑Matrix anwenden, Zahlungsfenster bestätigen und – falls möglich – Anderkonto für mindestens einen Partner nutzen.';
      return s.trim();
    }
  },
  {
    id: 'N11-3',
    day: 11,
    title: 'Kunden möchten „Fortschrittsindikatoren“',
    source: 'customer',
    severity: 'medium',
    isImportant: true,
    content: 'Key Accounts fragen nach Meilensteinen.',
    expandedText: (ctx: any) => {
      const transparent = choseCommTransparent(ctx);
      const mish = mishandledComm(ctx);
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const factsheetGesendet = log.some((e: any) =>
        (e?.id === 'D11-CEO-1' || e?.decisionId === 'D11-CEO-1') && e?.optionId === 'b');
      const wcKPIs = log.some((e: any) =>
        /(D05-CFO-4|D08-CFO-3)/.test(String(e?.id || e?.decisionId)) &&
        /(kpi|dso|dpo|dio|dashboard)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')));

      let s = 'Mehrere Key Accounts bitten um objektive Indikatoren zum Restrukturierungsfortschritt (z. B. Meilenstein‑Status, DSO‑Trend, Pönale‑Risiko). ';
      if (factsheetGesendet) s += 'Ihr kompaktes Fact‑Sheet adressiert genau diese Erwartung. ';
      s += transparent
        ? 'Die faktenbasierte Linie erzeugt Bereitschaft, kurzzyklische Abnahmen zu verlängern. '
        : mish
          ? 'Nach jüngsten Unschärfen ist die Erwartungshaltung hoch; konkrete Zahlen werden als Bedingung genannt. '
          : 'Die Kunden sind offen, knüpfen Zusagen aber an transparente Kennzahlen. ';
      if (wcKPIs) s += 'Transparente WC‑KPIs (DSO/DPO/DIO) stützen die Argumentation. ';
      s += 'Empfehlung: Fact‑Sheet mit 3–5 Kennzahlen versenden und Q&A entlang der Bank‑Meilensteine spiegeln.';
      return s.trim();
    }
  },
  {
    id: 'N11-4',
    day: 11,
    title: 'Gerüchte über LOI',
    source: 'press',
    severity: 'low',
    isImportant: false,
    content: 'Branchenblog spekuliert über strategische Partnerschaft.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const legalPrep = log.some((e: any) =>
        /(D10-HRLEGAL-5|D11-CEO-2|D09-CEO-3)/.test(String(e?.id || e?.decisionId)) &&
        /(nda|antitrust|kartell|loi|exit|nichtexklusiv|mou|precheck)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')));
      const linkedinOnly = log.some((e: any) =>
        (e?.id === 'D11-CEO-1' || e?.decisionId === 'D11-CEO-1') && e?.optionId === 'd');

      let s = 'Ein Branchenblog berichtet über einen möglichen LOI mit einem Industriepartner. Details sind spekulativ; Bezug genommen wird auf Qualitätsthemen und Bankauflagen. ';
      s += legalPrep
        ? 'Durch NDA/Antitrust‑Precheck sowie klaren LOI‑Rahmen sind Kernfragen adressierbar; kontrollierte Kommunikation ist möglich. '
        : 'Ohne vorbereitete Eckpunkte könnte die öffentliche Debatte Angriffsflächen eröffnen. ';
      if (linkedinOnly) s += 'Ein allgemeiner LinkedIn‑Post ersetzt kein abgestimmtes Wording – Vorsicht bei Interpretationen. ';
      s += 'Empfehlung: Kurzstatement mit Rahmenbedingungen (ohne Zahlen) bereit halten, interne Q&A aktualisieren und externe Anfragen bündeln.';
      return s.trim();
    }
  },

  /**
   * Kontextmeldungen (Folge Tag 10 → Tag 11; je eine pro Rolle)
   */
  {
    id: 'N11-5',
    day: 11,
    title: 'Key Accounts reagieren positiv auf Fact‑Sheet',
    source: 'customer',
    severity: 'medium',
    isImportant: true,
    content: 'Zwei A‑Kunden signalisieren Verlängerung bei stabiler Liefersicht.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const factsheet = log.some((e: any) =>
        (e?.id === 'D11-CEO-1' || e?.decisionId === 'D11-CEO-1') && e?.optionId === 'b');
      const council   = log.some((e: any) =>
        (e?.id === 'D11-CEO-4' || e?.decisionId === 'D11-CEO-4') && /a|c/i.test(String(e?.optionId)));
      const slaPfad   = log.some((e: any) =>
        /(SLA|Eskalation|A-Kunde|24\/7|Roundtable)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')));

      let s = 'Nach Versand eines kompakten Fortschritts‑Fact‑Sheets melden zwei A‑Kunden Bereitschaft, die Zusammenarbeit um 6–12 Monate zu verlängern – vorbehaltlich verlässlicher Eskalationspfade. ';
      if (factsheet) s += 'Das Dokument liefert die gewünschte Objektivität. ';
      if (council)   s += 'Die direkten Gespräche (Council/Executive‑Calls) erhöhen die Bindung. ';
      if (slaPfad)   s += 'Ein klarer SLA/Eskalationspfad untermauert die Liefersicherheit. ';
      s += 'Empfehlung: SLA‑Anhänge finalisieren und Übergabe an OPS/Service mit festen Response‑Zeiten.';
      return s.trim();
    }
  },
  {
    id: 'N11-6',
    day: 11,
    title: 'Term Sheet: Bank erbittet Sensitivitäten',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content: 'Für die Unterzeichnung werden zusätzliche Downside‑Szenarien angefragt.',
    expandedText: (ctx: any) => {
      const lowBT = Number(ctx?.kpi?.bankTrust ?? 100) < 70;
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const baseOnly  = log.some((e: any) => (e?.id === 'D11-CFO-1' || e?.decisionId === 'D11-CFO-1') && e?.optionId === 'b');
      const fullSens  = log.some((e: any) => (e?.id === 'D11-CFO-1' || e?.decisionId === 'D11-CFO-1') && e?.optionId === 'a');
      const allokDoc  = log.some((e: any) => (e?.id === 'D10-CFO-5' || e?.decisionId === 'D10-CFO-5'));

      let s = 'Vor Zeichnung des Term Sheets bittet die Bank um zwei zusätzliche Downside‑Szenarien (Lieferverzug/Preisabschläge) inklusive Covenant‑Effekten. ';
      s += lowBT
        ? 'Die Bank möchte Risiken explizit quantifiziert sehen, bevor Spielräume eingeräumt werden. '
        : 'Die Anfrage dient der formalen Absicherung – die Linie bleibt konstruktiv. ';
      if (fullSens) s += 'Ihre Sensitivitäten (Base/Downside) sind eine gute Grundlage; bitte die Triggerwirkung kurz erklären. ';
      if (baseOnly) s += 'Mit Base‑Case allein bleibt die Transparenz begrenzt; Downside bitte ergänzen. ';
      if (allokDoc) s += 'Der dokumentierte Allokationsschlüssel für Bridge‑Mittel hilft bei der Nachvollziehbarkeit. ';
      s += 'Empfehlung: Szenarien heute ergänzen und Zeichnung vorbereiten.';
      return s.trim();
    }
  },
  {
    id: 'N11-7',
    day: 11,
    title: 'Serienstart: QS‑Kapazitäten knapp',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'OPS meldet Engpässe in der Prüfkapazität für A‑Linien.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const freeze100 = log.some((e: any) =>
        (e?.id === 'D11-OPS-5' || e?.decisionId === 'D11-OPS-5') && e?.optionId === 'a');
      const aqlPlan   = log.some((e: any) =>
        (e?.id === 'D11-OPS-5' || e?.decisionId === 'D11-OPS-5') && e?.optionId === 'b');
      const onlyMain  = log.some((e: any) =>
        (e?.id === 'D10-OPS-5' || e?.decisionId === 'D10-OPS-5' || e?.id === 'D09-OPS-5' || e?.decisionId === 'D09-OPS-5') &&
        /d|c/i.test(String(e?.optionId)));

      let s = 'Die für den Serienstart vorgesehene Prüftiefe bindet QS‑Ressourcen stärker als kalkuliert. A‑Linien sollten priorisiert werden. ';
      if (freeze100) s += 'Das 72‑Stunden‑Freeze mit 100‑%‑Prüfung reduziert das Reklamationsrisiko, erhöht aber den Kapazitätsbedarf. ';
      if (aqlPlan)   s += 'Der AQL‑Plan mit gestuftem Ramp‑up balanciert Risiko und Ressourcen. ';
      if (onlyMain)  s += 'Ohne Zweitquelle bleibt die Abhängigkeit hoch – Containment‑Aufwand einplanen. ';
      s += 'Empfehlung: Befristete 100‑%‑Prüfung für A‑Linien bestätigen, B‑Linien per Stichprobe und Kunden mit Terminkorridor informieren.';
      return s.trim();
    }
  },
  {
    id: 'N11-8',
    day: 11,
    title: 'Ethik‑Hotline: neuer Hinweis eingegangen',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Anonymer Hinweis zu „Sonderfreigaben“ in der Beschaffung und Compliance beim Teilverkauf.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const guideline = log.some((e: any) =>
        /(leitlinie|guideline|audit\-trail|compliance|kurzreport|forensic)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')));
      const forensicLight = log.some((e: any) =>
        (e?.id === 'D07-HRLEGAL-5' || e?.decisionId === 'D07-HRLEGAL-5' || e?.id === 'D10-HRLEGAL-2' || e?.decisionId === 'D10-HRLEGAL-2') &&
        /(forensic|check|prüfung)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')));

      let s = 'Über die Hotline geht ein Hinweis zu angeblichen „Sonderfreigaben“ ein. Genannt sind zwei Bestellungen aus Woche 1–2; zusätzlich wird im Kontext des Teilverkaufs eine unzulässige Einflussnahme behauptet. ';
      s += guideline
        ? 'Bestehende Leitlinien und Audit‑Trails erleichtern die Aufklärung und verringern Leckagerisiken. '
        : 'Ohne definierte Richtlinie drohen Fehlinterpretationen; eine kurze, dokumentierte Prüfung ist ratsam. ';
      if (forensicLight) s += 'Ein Forensic‑Light‑Pfad ist vorbereitet und kann kurzfristig aktiviert werden. ';
      s += 'Empfehlung: Kurzprüfung anstoßen, Ergebnis in den Compliance‑Anhang des Waiver‑Reportings aufnehmen und BR‑Info synchronisieren.';
      return s.trim();
    }
  },

  /**
   * Füllmeldungen (ohne KPI‑Wirkung; vollständige Sätze; kein Detailfenster)
   */
  { id: 'N11-F1', day: 11, title: 'WLAN‑Controller Neustart um 12:30 Uhr', source: 'internal', severity: 'low', isImportant: false, content: 'Die IT führt heute um 12:30 Uhr einen kurzen Neustart des WLAN‑Controllers durch; Verbindungen können für wenige Minuten abbrechen.', suppressHints: true },
  { id: 'N11-F2', day: 11, title: 'Leichte Wasserspur im Flur West',      source: 'internal', severity: 'low', isImportant: false, content: 'Facility meldet eine kleine Undichtigkeit im Flur West, die bereits provisorisch abgedichtet ist; Wege sind frei – bitte vorsichtig gehen.', suppressHints: true },
  { id: 'N11-F3', day: 11, title: 'Zählerablesung Strom am Nachmittag',   source: 'internal', severity: 'low', isImportant: false, content: 'Der Versorger liest heute zwischen 15:00 und 16:00 Uhr die Zähler in Gebäude B ab; Unterbrechungen sind nicht zu erwarten.', suppressHints: true },
  { id: 'N11-F4', day: 11, title: 'Externe Besuchergruppen gemeldet',     source: 'internal', severity: 'low', isImportant: false, content: 'Zwei kleine Besuchergruppen sind für Werksführungen angemeldet; die Security bittet um sichtbares Tragen der Besucherausweise in den Korridoren.', suppressHints: true }
];
