// src/data/scenario_day_09.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

/**
 * TAG 9 — 20 Entscheidungsblöcke (je 5 pro Rolle)
 * Fokus: Waiver-Meeting, Kunden-Verlängerungen, Lieferantenplanung, Recht/Compliance
 * Hinweis: Bestehende 16 Blöcke unverändert belassen; je Rolle ein 5. Block ergänzt (Folge aus Tag 8).
 */

const CEO_BLOCKS: DecisionBlock[] = [

{
  id: 'D09-CEO-1',
  day: 9,
  role: 'CEO',
  title: 'Übernahmeangebot – Mehrheit oder Minderheit?',
  context: 'Ein strategischer Investor macht ein Übernahmeangebot:  25 % Minderheitsbeteiligung mit Option auf späteren Aufstockung auf 51 %. Bank drängt auf schnelle Entscheidung.',
  dilemma: 'Liquidität & Bankvertrauen vs. Kontrollverlust & Zukunftsgestaltung',
  hiddenAgendaHint: 'Mehrheitsverkauf stabilisiert Covenants, birgt aber Governance-Risiken. Minderheitsdeal hält Kontrolle, bringt weniger Cash.',
  options: [
    { id: 'a', label: '25 %  verkaufen – vollständige SPA (Share Purchase Agreement) mit Escrow (Treuhandkonto) & MAC-Klausel - Vertiefte Prüfung gegen zinsgünstigen Kredit (2 %) zusagen mit Disagio von 5 %',
      kpiDelta: { cashEUR: +475000, profitLossEUR: -25000, bankTrust: +6, publicPerception: +1, workforceEngagement: -10 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true },

    { id: 'b', label: 'Verhandeln: 10 % Minderheitsdeal – Cash (1M) kleiner, aber Kontrolle behalten; W&I (Warranty & Indemnity) Versicherung prüfen',
      kpiDelta: { bankTrust: +3, publicPerception: +1, workforceEngagement: -4 },
      variance: 0.5, execLeakage: 0.3, isTradeOff: true },

    { id: 'c', label: 'Angebot vertagen, erst Consent-Matrix & BR-Feedback abwarten',
      kpiDelta: { bankTrust: -3, publicPerception: -1, workforceEngagement: +1 },
      variance: 0.4, execLeakage: 0.2 },

    { id: 'd', label: 'Eigenes Gegenangebot: 40 % zu höherer Bewertung, Earn-Out-Struktur',
      kpiDelta: { bankTrust: +4, publicPerception: +2, workforceEngagement: -4 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true }
  ],
  attachments: ['d09_ceo_term_sheet_strategic_investor.pdf', 'd09_ceo_spa_draft_escrow_provisions.pdf']
},

{
  id: 'D09-CEO-2',
  day: 9,
  role: 'CEO',
  title: 'Kommunikation Übernahmeangebot – Stakeholder-Strategie',
  context: 'Nach Bekanntwerden des Angebots kursieren Gerüchte. Mitarbeiter, Kunden und Presse verlangen Klarheit, die Bank drängt auf Konsistenz mit dem Term Sheet.',
  dilemma: 'Transparenz & Bindung vs. Verhandlungsposition',
  hiddenAgendaHint: 'Ein abgestimmtes Narrativ hält Optionen offen und stabilisiert das Umfeld.',
  options: [
    { id: 'a', label: 'Interne Townhall + Kundenbrief mit Erklärung zentraler Begriffe (z. B. Escrow=Treuhandkonto, Earn-Out=Erfolgsabhängiger Kaufpreis)',
      kpiDelta: { workforceEngagement: +4, customerLoyalty: +3, publicPerception: +2, bankTrust: +1 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true },

    { id: 'b', label: 'Nur internes Memo (keine externe Kommunikation)',
      kpiDelta: { workforceEngagement: +2, publicPerception: -1 },
      variance: 0.4, execLeakage: 0.3 },

    { id: 'c', label: 'Externe PR-Meldung im Marketing-Ton ohne Details',
      kpiDelta: { publicPerception: +2, bankTrust: -2,  workforceEngagement: -1 },
      variance: 0.7, execLeakage: 0.7, isTradeOff: true },

    { id: 'd', label: 'Kommunikation vertagen bis zur nächsten Bankrunde',
      kpiDelta: { bankTrust: -3, workforceEngagement: -2, publicPerception: -2 },
      variance: 0.4, execLeakage: 0.2 }
  ],
  attachments: ['d09_ceo_townhall_agenda_investor.pdf', 'd09_ceo_pr_statement_draft.pdf']
},
{
    id: 'D09-CEO-3',
    day: 9,
    role: 'CEO',
    title: 'Strategische Partnerschaft vertiefen',
    context: 'Industriepartner zeigt Interesse an Kooperation.',
    dilemma: 'Kapazitätsbindung vs. Absatzsicherheit',
    hiddenAgendaHint: 'Option auf spätere Beteiligung offenhalten.',
    options: [{ id: 'a', label: 'Kooperations-MOU (rechtlich geprüft)',            kpiDelta: { bankTrust: +2, publicPerception: +1 } },
{ id: 'b', label: 'Nur Letter of Intent (LOI) ohne Details',                            kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Ablehnen',                                        kpiDelta: { bankTrust: 0 } },
{ id: 'd', label: 'Breit kommunizieren (Risiko)',                    kpiDelta: { publicPerception: +2, bankTrust: -2,  workforceEngagement: -2 } }],
    attachments: ['d09_ceo_mou_industriepartner_draft.pdf']
  },
{
    id: 'D09-CEO-4',
    day: 9,
    role: 'CEO',
    title: 'Krisen-OKR definieren',
    context: 'Fokus auf die kommenden 5 Tage.',
    dilemma: 'Ambition vs. Erreichbarkeit',
    hiddenAgendaHint: 'Messbare Ziele erhöhen Disziplin.',
    options: [
{ id: 'a', label: 'Nur Top-3 Unternehmensziele',                      kpiDelta: { workforceEngagement: +2 } },
{ id: 'b', label: 'OKR je Rolle (kurzzyklisch)',                      kpiDelta: { workforceEngagement: +4, bankTrust: +2 },
  isTradeOff: true },
      { id: 'c', label: 'Keine OKR',                                        kpiDelta: { workforceEngagement: -1 } },
{ id: 'd', label: 'Überambitionierte OKR',                            kpiDelta: { workforceEngagement: -2 } }],
    attachments: ['d09_ceo_okr_crisis_template.pdf']
 }];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D09-CFO-1',
    day: 9,
    role: 'CFO',
    title: 'Zwischenfinanzierung',
    context: 'Finanzierungsoptionen: Privater Investor bietet eine Finanzierung (550k) gegen spätere Option auf Anteile an.',
    dilemma: 'Kosten vs. Flexibilität',
    hiddenAgendaHint: 'Akzeptable Konditionen bei klaren Zielen.',
    options: [{ id: 'a', label: 'Zusage ohne weitere Abklärung',                 kpiDelta: { bankTrust: -5, cashEUR: +550000, workforceEngagement: -5 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Eintreten in Verhandlungen gegen "Eintrittsgebühr" von 100k',                        kpiDelta: { bankTrust: +1, cashEUR: +100000, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Konsequentes Ablehnen',             kpiDelta: { bankTrust: 0, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Gespräch verschieben, hinhalten, Optionen prüfen',                            kpiDelta: { bankTrust: -1 } }],
    attachments: ['d09_cfo_investor_bridge_financing_offer.pdf']
  },
{
    id: 'D09-CFO-2',
    day: 9,
    role: 'CFO',
    title: 'Cash-Forecast kalibrieren',
    context: 'Abweichungen Woche 1 analysieren.',
    dilemma: 'Genauigkeit vs. Aufwand',
    hiddenAgendaHint: 'Verbesserte Prognose stärkt Bankvertrauen.',
    options: [{ id: 'a', label: 'Treffergenauigkeit erhöhen (tägliche Abweichungsanalyse)', kpiDelta: { bankTrust: +3 } },
{ id: 'b', label: 'Weekly-Granularität reicht',                               kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Keine Kalibrierung',                                       kpiDelta: { bankTrust: -2 } },
{ id: 'd', label: 'Externes Tool testen (3k)',                                kpiDelta: { profitLossEUR: -3000, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7 }],
    attachments: ['d09_cfo_cashflow_variance_analysis']
  },
{
    id: 'D09-CFO-3',
    day: 9,
    role: 'CFO',
    title: 'Zero-Based-Budgeting',
    context: 'Alles auf den Prüfstand.',
    dilemma: 'Kosten vs. Motivation',
    hiddenAgendaHint: 'Alles auf den Prüfstand stellen, um Inefizienzen zu beseitigen.',
    options: [{ id: 'a', label: 'Externe Beratung beauftragen (Option A)',                  kpiDelta: { profitLossEUR: -35000, bankTrust: +2, customerLoyalty: +2, workforceEngagement: -4 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Verwerfen',                        kpiDelta: { profitLossEUR: 0, bankTrust: -2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Extere Beratung Option B)',                               kpiDelta: { cashEUR: -15000, profitLossEUR: -150000, bankTrust: +2, customerLoyalty: +2, workforceEngagement: -3} },
{ id: 'd', label: 'Intern durchführen (top down, Effekt 120k))',                        kpiDelta: { cashEUR: +120000, profitLossEUR: +120000, bankTrust: +2, customerLoyalty: +2, workforceEngagement: -6 },
  variance: 0.8, 
  execLeakage: 0.7 }],
    attachments: ['d09_cfo_zbb_consulting_proposal.pdf']
  },
{
    id: 'D09-CFO-4',
    day: 9,
    role: 'CFO',
    title: 'Kundenrabatte vs. Skonto',
    context: 'Verhandlungen über Preise/Skonto.',
    dilemma: 'Ertrag vs. Cash',
    hiddenAgendaHint: 'Skonto bevorzugen, wo möglich.',
    options: [{ id: 'a', label: 'Skonto 2 % statt Rabatt',                      kpiDelta: { cashEUR: +30000, profitLossEUR: -6000 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'b', label: 'Skonto 3 % breit',                                 kpiDelta: { cashEUR: +60000, profitLossEUR: -12000, customerLoyalty: +3, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Case-by-Case (Policy)',                            kpiDelta: { cashEUR: +15000, profitLossEUR: -4000 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'd', label: 'Keine Zugeständnisse',                              kpiDelta: { customerLoyalty: -1 } }],
    attachments: ['d09_cfo_skonto_policy_draft.pdf']
 }];

// NEU (5. CFO-Block – Folge Tag 8: Kofinanzierung/Bridge)

const CFO_BLOCKS_EXTRA: DecisionBlock[] = [{
    id: 'D09-CFO-5',
    day: 9,
    role: 'CFO',
    title: 'Factoring-Top-up vorbereiten',
    context: 'Factoring-Top-up vorbereiten; Umsetzung und Reporting festzurren.',
    dilemma: 'Kosten der Bridge vs. Sicherheit und Geschwindigkeit',
    hiddenAgendaHint: 'Automatisiertes Reporting stärkt Glaubwürdigkeit gegenüber Bank und Beirat.',
    options: [
      
      { id: 'a', label: 'Factoring-Top-up (90k) aktivieren, stilles Assignment',      kpiDelta: { cashEUR: +90000, profitLossEUR: -1600 } },
      { id: 'b', label: 'Eigenmittel nutzen, Bridge nicht ziehen',                    kpiDelta: { bankTrust: +1 } },
      { id: 'c', label: 'Entscheidung aufschieben (Risiko Signalwirkung)',            kpiDelta: { bankTrust: -3 } },
      { id: 'd', label: 'Statt Factoring: Zwischenlinie bei der Bank nutzen (100k), Zinskosten 5k',     kpiDelta: {cashEUR: +10000, profitLossEUR: -5000, bankTrust: +1 },
        variance: 0.8, execLeakage: 0.7 }
    ],
    attachments: ['d09_cfo_factoring_assignment_agreement.pdf', 'd09_cfo_covenant_kpi_dashboard.xlsx']
  }];

const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D09-OPS-1',
    day: 9,
    role: 'OPS',
    title: 'Line Balancing fortführen',
    context: 'Umbau aus Woche 1 zeigte Wirkung.',
    dilemma: 'Mehr Invest vs. Stabilität',
    hiddenAgendaHint: 'Kleine Schritte mit hoher Wirkung.',
    options: [{ id: 'a', label: 'Weiteres Balancing ',                           kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, customerLoyalty: +3, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Nur Verbesserungen ohne Kosten',                    kpiDelta: { customerLoyalty: +1 } },
{ id: 'c', label: 'Stoppen',                                           kpiDelta: { customerLoyalty: -1, workforceEngagement: -1 } },
{ id: 'd', label: 'Großinvest ',                                  kpiDelta: { cashEUR: -15000, profitLossEUR: -15000, customerLoyalty: +3, workforceEngagement: +2, bankTrust: -2  },
  variance: 0.8, 
  execLeakage: 0.7 }],
    attachments: ['d09_ops_production_efficiency_report.pdf']
  },
{
    id: 'D09-OPS-2',
    day: 9,
    role: 'OPS',
    title: 'Rohstoffpreis-Indexierung',
    context: 'Kosten schwanken stark.',
    dilemma: 'Kundenakzeptanz vs. Marge',
    hiddenAgendaHint: 'Transparenz mit Indexmechanik.',
    options: [{ id: 'a', label: 'Indexklausel bei neuen Verträgen',                  kpiDelta: { profitLossEUR: +6000, customerLoyalty: -3, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Pilot mit 2 Kunden',                                kpiDelta: { profitLossEUR: +3000 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Keine Indexierung',                                 kpiDelta: { profitLossEUR: 0, bankTrust: -2 } },
{ id: 'd', label: 'Indexierung + Servicegutschrift',                   kpiDelta: { profitLossEUR: +2000, customerLoyalty: -1, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7 }],
    attachments: ['d09_ops_material_price_index_clause.pdf']
  },
{
    id: 'D09-OPS-3',
    day: 9,
    role: 'OPS',
    title: 'Fremdfertigung Qualität verbessern',
    context: 'Reklamationen bei Partnerteilen.',
    dilemma: 'Kontrolle vs. Kosten',
    hiddenAgendaHint: 'SLA & Audit bringen Stabilität.',
    options: [{ id: 'a', label: 'Audit & Schulung ',                              kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, customerLoyalty: +3 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Nur Reklamationen nacharbeiten',                      kpiDelta: { cashEUR: -2000, profitLossEUR: -2000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Partner wechseln',                                    kpiDelta: { profitLossEUR: -8000, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Keine Maßnahme',                                      kpiDelta: { customerLoyalty: -2 } }],
    attachments: ['d09_ops_supplier_audit_report.pdf']
  },
{
    id: 'D09-OPS-4',
    day: 9,
    role: 'OPS',
    title: 'Express-Logistik optimieren',
    context: 'Kosten hoch, Nutzen variabel.',
    dilemma: 'Servicegrad vs. Kosten',
    hiddenAgendaHint: 'Gezielte Regeln statt Ad-hoc.',
    options: [
{ id: 'a', label: 'Kein Express mehr',                                    kpiDelta: { profitLossEUR: 0, customerLoyalty: -2 } },
{ id: 'b', label: 'Pauschalpreis mit Spediteur ',                           kpiDelta: { profitLossEUR: -2000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7 },
      { id: 'c', label: 'Regelwerk: nur A-Kunden/ Pönale (3k)',                     kpiDelta: { profitLossEUR: -3000, customerLoyalty: +2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Express ausweiten',                             kpiDelta: { profitLossEUR: -10000, customerLoyalty: +3 },
  variance: 0.8, 
  execLeakage: 0.7 }],
    attachments: ['d09_ops_logistics_service_level_agreement.pdf']
 }];

// NEU (5. OPS-Block – Folge Tag 8: Pilotcharge/Ramp-up)
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [{
    id: 'D09-OPS-5',
    day: 9,
    role: 'OPS',
    title: 'Dual-Sourcing Go/No-Go nach Pilotcharge für Linie Px7',
    context: 'Erste Erstmuster-Resultate liegen vor; Skalierungsentscheidung steht an.',
    dilemma: 'Versorgungssicherheit vs. Qualitäts-/Folgekosten',
    hiddenAgendaHint: 'Gestufter Ramp-up mit klaren Abnahmeplänen reduziert Risiko.',
    options: [
      { id: 'a', label: 'Go: Ramp-up Stufe 1 mit 100 %-Prüfung (4k)',                    kpiDelta: { profitLossEUR: -4000, customerLoyalty: +3 },
        variance: 0.8, execLeakage: 0.7 },
      { id: 'b', label: 'Teil-Go: Limitierter Ramp-up mit AQL-Plan (2k)',        kpiDelta: { profitLossEUR: -2000, customerLoyalty: +1 } },
      { id: 'c', label: 'No-Go: Erst vertiefte Prüfung vornehmen',         kpiDelta: { bankTrust: 0, customerLoyalty: -1 } },
      { id: 'd', label: 'Temporär Fremdfertigung ausweiten (7k)',                     kpiDelta: { profitLossEUR: -7000, customerLoyalty: +2 } }
    ],
    attachments: ['d09_ops_pilotcharge_quality_report.pdf', 'd09_ops_aql_sampling_plan.xlsx']
  }];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D09-HRLEGAL-1',
    day: 9,
    role: 'HRLEGAL',
    title: 'Kommunikation Übernahmeangebot',
    context: 'Team erwartet Klarheit.',
    dilemma: 'Transparenz vs. Rechtsrisiko',
    hiddenAgendaHint: 'Abgestimmte Botschaft mit CFO.',
    options: [{ id: 'a', label: 'Memo + FAQ mit Kernpunkten',                          kpiDelta: { workforceEngagement: +3, publicPerception: +1 } },
{ id: 'b', label: 'Nur Führungskräftebriefing',                          kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Kein Update',                                         kpiDelta: { workforceEngagement: -2 } },
{ id: 'd', label: 'Übertrieben positive Darstellung',                    kpiDelta: { publicPerception: +2, bankTrust: -2 } }],
    attachments: ['d09_hrlegal_employee_faq_acquisition.pdf']
  },
{
    id: 'D09-HRLEGAL-2',
    day: 9,
    role: 'HRLEGAL',
    title: 'Betriebsvereinbarung Homeoffice',
    context: 'Flexoptionen verbessern Bindung.',
    dilemma: 'Produktivität vs. Zufriedenheit',
    hiddenAgendaHint: 'Klarer Rahmen verhindert Missbrauch.',
    options: [{ id: 'a', label: 'BV Homeoffice mit KPIs',                              kpiDelta: { workforceEngagement: +3},
  isTradeOff: true },
{ id: 'b', label: 'Nur Empfehlung an Führungskräfte',                                      kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Kein Homeoffice mehr',                                     kpiDelta: { workforceEngagement: -3, customerLoyalty: +1 } },
{ id: 'd', label: 'Breites Homeoffice ohne Steuerung',                   kpiDelta: { workforceEngagement: +2, publicPerception: +1, customerLoyalty: -3 } }],
    attachments: ['d09_hrlegal_bv_homeoffice_draft.pdf']
  },
{
    id: 'D09-HRLEGAL-3',
    day: 9,
    role: 'HRLEGAL',
    title: 'Sozialplan-Risiko prüfen (nur Szenario)',
    context: 'Für den Fall von Kapazitätsanpassungen.',
    dilemma: 'Vorsorge vs. Signalwirkung',
    hiddenAgendaHint: 'Nur intern prüfen, nicht kommunizieren.',
    options: [{ id: 'a', label: 'Interne Szenarioprüfung mit Rechtsabteilung',          kpiDelta: { bankTrust: +1 } },
{ id: 'b', label: 'Externe Kanzlei beauftragen',                      kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Nicht prüfen',                                          kpiDelta: { bankTrust: -2, workforceEngagement: +2 } },
{ id: 'd', label: 'Breit kommunizieren (Risikohinweis)',                   kpiDelta: { publicPerception: -3, workforceEngagement: -6, bankTrust: +1 } }],
    attachments: ['d09_hrlegal_law_firm_memo_restructuring.pdf']
 }];

// NEU (5. HRLEGAL-Block – Folge Tag 8: Compliance-Maßnahmen/BR)
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [{
    id: 'D09-HRLEGAL-5',
    day: 9,
    role: 'HRLEGAL',
    title: 'Compliance-Kurzreport & BR-Vereinbarung freigeben',
    context: 'Maßnahmenplan steht; Frage der internen/externen Veröffentlichung.',
    dilemma: 'Reputationsschutz vs. juristische Vorsicht',
    hiddenAgendaHint: 'Kurzreport + BR-Vereinbarung und klarer Audit-Trail reduzieren Leaks.',
    options: [
          { id: 'a', label: 'Nur interne Veröffentlichung mit Audit-Trail',            kpiDelta: { publicPerception: +1 } },
        { id: 'b', label: 'Kurzreport intern + kurzes externes Statement (2k)',      kpiDelta: { profitLossEUR: -2000, publicPerception: +2, workforceEngagement: +2 },
        variance: 0.8, execLeakage: 0.7 },
      { id: 'c', label: 'Nur BR-Vereinbarung, kein Report',                        kpiDelta: { workforceEngagement: +2 } },
      { id: 'd', label: 'Kein Statement/keine Veröffentlichung',                   kpiDelta: { publicPerception: -2, workforceEngagement: -2 } }
    ],
    attachments: ['d09_hrlegal_compliance_audit_report.pdf', 'd09_hrlegal_br_agreement_draft.pdf']
  }];

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];

export const day9Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CEO_BLOCKS_EXTRA,
  ...CFO_BLOCKS,
  ...CFO_BLOCKS_EXTRA,
  ...OPS_BLOCKS,
  ...OPS_BLOCKS_EXTRA,
  ...HRLEGAL_BLOCKS,
  ...HRLEGAL_BLOCKS_EXTRA
];

// src/data/scenario_day_09.ts — NUR den News‑Block ersetzen
export const day9News: DayNewsItem[] = [
  /**
   * Kernmeldungen Tag 9
   */
  {
    id: 'N9-1',
    day: 9,
    title: 'Waiver‑Meeting durchgeführt',
    source: 'bank',
    severity: 'critical',
    isImportant: true,
    content: 'Konditionen verhandelt, Milestones protokolliert – Nachweise gefordert.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.optionId === t || e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')))));
      const lowBT = Number(ctx?.kpi?.bankTrust ?? 100) < 70;

      const waiverReady    = picked('D08-CFO-1', 'a') || picked('D07-CFO-2', 'a');
      const bridgePicked   = picked('D08-CFO-5', /zwischenlinie|top-up|factoring/i) || picked('D09-CFO-5', /(zwischenlinie|top-up|factoring|dashboard)/i);
      const covBridgeShown = picked('D05-CFO-1', /(bridge|sensitiv)/i);
      const rptPackReady   = picked('D04-CFO-4', /(detail|kurzpräsentation)/i);
      const termsSigned    = picked('D06-CEO-1', /zeichnen/);

      let s = 'Das Gespräch mit der Hausbank ist abgeschlossen. Konditionen, Informationsrechte und konkrete Meilensteine wurden verhandelt und protokolliert. ';
      s += lowBT
        ? 'Die Tonalität blieb vorsichtig: Ohne frühe Proof‑Points drohen engere Auflagen und ein strikteres Trigger‑Regime. '
        : 'Die Bank würdigt erste Fortschritte und knüpft die Linie an überprüfbare Umsetzung innerhalb der nächsten 7–10 Tage. ';
      if (waiverReady)    s += 'Die frühzeitige Terminierung und das vorbereitete Unterlagenpaket haben spürbar geholfen. ';
      if (covBridgeShown) s += 'Die präsentierte Covenant‑Bridge mit Sensitivitäten schafft Orientierung für den Pfad bis Q‑Ende. ';
      if (rptPackReady)   s += 'Das Reporting‑Pack aus Tag 4 dient als belastbare Referenz, bitte Aktualstände nachziehen. ';
      if (termsSigned)    s += 'Der gezeichnete Auflagenbrief unterstreicht Verbindlichkeit und wirkt vertrauensbildend. ';
      if (bridgePicked)   s += 'Positiv: Der Kofinanzierungs‑/Bridge‑Pfad ist definiert; die Bank erwartet dazu ein schlankes Dashboard. ';
      s += 'Nächste Schritte: Rolling‑13‑Week heute aktualisieren, Owner je Milestone benennen, kurzes Beirats‑Statement abstimmen.';
      return s.trim();
    }
  },
  {
    id: 'N9-2',
    day: 9,
    title: 'Kunden verlängern selektiv',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'A/B‑Kunden signalisieren Verlängerung – abhängig von Lieferplänen & SLAs.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.optionId === t || e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')))));

      const bindProg  = picked('D05-CEO-4', /(laufzeit|service|rabatt)/i) || picked('D07-CEO-2', /(verlängerung|bonus|rabatt)/i);
      const eskalPfad = picked('D07-OPS-2', /(pilot|24\/7|sla|bürozeiten)/i) || picked('D05-OPS-3', /(matrix|priorit)/i);
      const serviceOn = picked('D08-OPS-4', /(service-teams|vor ort|remote)/i);

      let s = 'Mehrere A/B‑Kunden sind zu Vertragsverlängerungen bereit, sofern die Lieferpläne T+60 und die Eskalationspfade verbindlich belegbar sind. ';
      if (bindProg)  s += 'Ihr leichtgewichtiges Bindungsprogramm zahlt ein – Laufzeit plus Servicebaustein werden gut aufgenommen. ';
      if (eskalPfad) s += 'Ein klarer Eskalationskontakt und definierte SLAs reduzieren Unsicherheiten auf Kundenseite. ';
      if (serviceOn) s += 'Die geplanten Service‑Einsätze vor Ort wirken vertrauensbildend in kritischen Ramp‑up‑Phasen. ';
      s += 'Empfehlung: SLA‑Entwürfe finalisieren, Lieferprioritäten nach DB/Kritikalität transparent machen und ein kurzes Kunden‑Update nach dem Banktermin bündeln.';
      return s.trim();
    }
  },
  {
    id: 'N9-3',
    day: 9,
    title: 'Lieferanten fordern belastbaren Zahlungsplan',
    source: 'supplier',
    severity: 'medium',
    isImportant: true,
    content: 'Top‑Partner bitten um Slots, Sicherheiten oder Ratenmodelle.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.optionId === t || e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')))));

      const standstill = picked('D04-CFO-1', /(standstill|sicherheiten|bürgschaft)/i);
      const kv         = picked('D03-CFO-3', /(kreditversicher|anderkonto|bürgschaft)/i);
      const apStop     = picked('D06-CFO-1', /(stopp|selektiv|ratenpläne)/i);

      let s = 'Schlüssellieferanten verlangen einen klaren, datierten Zahlungs‑ und Lieferplan – teils unterlegt mit Ratenmodellen oder Sicherheiten. ';
      if (standstill) s += 'Die Standstill‑Vorarbeit erleichtert die Gespräche; wöchentliche Updates wurden positiv bewertet. ';
      if (kv)         s += 'KV‑/Anderkonto‑Lösungen signalisieren Ernsthaftigkeit und reduzieren Einzelrisiken. ';
      if (apStop)     s += 'Parallel zum AP‑Regime sind saubere Ausnahmewege wichtig, um Vorkasseforderungen zu vermeiden. ';
      s += 'To‑dos: Slots je Lieferant bestätigen, Sicherheiten für Top‑3 definieren, Kommunikationspunkte bündeln (Einkauf/CFO).';
      return s.trim();
    }
  },
  {
    id: 'N9-4',
    day: 9,
    title: 'Compliance im Fokus öffentlicher Debatte',
    source: 'press',
    severity: 'low',
    isImportant: false,
    content: 'Fachpresse diskutiert Freigabedisziplin in Krisen – Ihr Unternehmen wird genannt.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.optionId === t || e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')))));

      const hotline   = picked('D07-HRLEGAL-3', /(hotline|whistle|verfahrensbeschreibung)/i);
      const training  = picked('D04-HRLEGAL-3', /(schulung|auditor)/i);
      const measures  = picked('D08-HRLEGAL-5', /(report|maßnahmen|audit-trail)/i) || picked('D07-HRLEGAL-5', /(forensic|interne prüfung)/i);

      let s = 'Branchennahe Medien diskutieren, wie Unternehmen in Krisen Zahlungs‑ und Freigabeprozesse absichern. Ihr Name fällt in Zusammenfassungen lokaler Berichte. ';
      if (hotline)  s += 'Die kommunizierte Ethik‑Hotline bietet einen klaren Kanal für Hinweise. ';
      if (training) s += 'Kurzschulungen und Stichproben‑Audits wurden intern bereits umgesetzt und können genannt werden. ';
      if (measures) s += 'Der Maßnahmenplan (Leitlinie + Audit‑Trail) dient als Beleg für systematisches Vorgehen. ';
      s += 'Empfehlung: kurzes Q&A für Führungskräfte bereitstellen und interne Fortschritte konsistent nachhalten.';
      return s.trim();
    }
  },

  /**
   * Kontextmeldungen (Folge Tag 8 → Tag 9; je eine pro Rolle)
   */
  {
    id: 'N9-5',
    day: 9,
    title: 'Presse greift Klarstellung auf',
    source: 'press',
    severity: 'medium',
    isImportant: true,
    content: 'Regionale Portale zitieren den Faktencheck – Tenor überwiegend sachlich.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.optionId === t || e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')))));

      const corr  = picked('D08-CEO-5', 'a');
      const oped  = picked('D07-CEO-5', 'c');
      const noOT  = picked('D07-CEO-5', 'd');

      let s = 'Mehrere regionale Portale übernehmen Kernaussagen aus Ihrem Faktencheck. Einzelne Kommentare bleiben kritisch, die Berichterstattung ist jedoch überwiegend nüchtern. ';
      if (corr) s += 'Die kurze Korrektur hat Fehldeutungen aus dem TV‑Beitrag sichtbar entschärft. ';
      if (oped) s += 'Ihr Gastkommentar liefert Referenzzitate für Fachmedien. ';
      if (noOT) s += 'Ohne O‑Ton bestimmen Dritte weiterhin Teile des Deutungsrahmens – Monitoring aufrechterhalten. ';
      s += 'Nächster Schritt: Bank und Key Accounts gezielt nachfassen und Q&A konsistent halten.';
      return s.trim();
    }
  },
  {
    id: 'N9-6',
    day: 9,
    title: 'Zwischenlinie/Top‑up in Aussicht',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content: 'Positives Echo auf Kofinanzierungsnachweis – Zusage an Reporting geknüpft.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.optionId === t || e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')))));
      const bt = Number(ctx?.kpi?.bankTrust ?? 100);

      const line   = picked('D08-CFO-5', 'a') || picked('D09-CFO-5', 'd');
      const topup  = picked('D08-CFO-5', 'b') || picked('D09-CFO-5', 'a');
      const own    = picked('D08-CFO-5', 'c') || picked('D09-CFO-5', 'b');
      const dash   = picked('D05-CFO-4', /(dashboard|daily|weekly)/i) || picked('D09-CFO-5', /(dashboard|kpi)/i);

      let s = 'Im Nachgang zum Förderantragspfad signalisiert die Bank Entgegenkommen für eine kleine Zwischenlinie oder ein Factoring‑Top‑up. ';
      s += bt >= 70 ? 'Das steigende Bankvertrauen verbessert Ihre Verhandlungsposition. ' : 'Die Zusage ist vorläufig und an klare Transparenz geknüpft. ';
      if (line)  s += 'Die Zwischenlinie adressiert den Zeitraum bis zum Förderbescheid; Konditionen bitte transparent dokumentieren. ';
      if (topup) s += 'Das Top‑up auf A‑Forderungen ist grundsätzlich akzeptiert – Silent‑Assignment beachten. ';
      if (own)   s += 'Eigenmittel wahren Flexibilität, senden jedoch kein zusätzliches Stabilitätssignal an Dritte. ';
      s += dash ? 'Gut: KPI‑Dashboard ist geplant oder live – Reporting‑Reifegrad bitte im Bankmemo hervorheben. ' : 'Bitte ein schlankes KPI‑Dashboard kurzfristig aktivieren.';
      return s.trim();
    }
  },
  {
    id: 'N9-7',
    day: 9,
    title: 'Pilotcharge: Erste QS‑Befunde',
    source: 'supplier',
    severity: 'medium',
    isImportant: true,
    content: 'Hauptmaße stabil, zwei Oberflächenabweichungen – korrigierbar.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.optionId === t || e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')))));
      const strict = picked('D07-OPS-5', 'a') || picked('D06-OPS-3', 'a');
      const short  = picked('D07-OPS-5', 'b');
      const bench  = picked('D07-OPS-5', 'c');

      let s = 'Die QS meldet nach Erstmusterprüfung stabile Hauptmaße; zwei Bauteile zeigen leichte Oberflächenabweichungen, die per Nacharbeit beherrschbar sind. ';
      if (strict) s += 'Die 100‑%‑Prüfung begrenzt das Reklamationsrisiko im Hochlauf sichtbar. ';
      if (short)  s += 'Beim verkürzten Prüfpfad ist ein enges Containment ratsam, bis Prozessfähigkeit nachgewiesen ist. ';
      if (bench)  s += 'Die Parallelprüfung mit dem Erstlieferanten schafft objektive Vergleichswerte für das Dual‑Sourcing. ';
      s += 'Empfehlung: Go/No‑Go für den Skalierungsgrad heute festlegen und A‑Kunden mit Terminkorridor informieren.';
      return s.trim();
    }
  },
  {
    id: 'N9-8',
    day: 9,
    title: 'BR‑Vereinbarung zu Compliance in Arbeit',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Entwurf adressiert Kommunikations‑ und Freigabedisziplin inkl. Audit‑Trail.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.optionId === t || e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || '')))));

      const brComm  = picked('D06-HRLEGAL-2', /(gemeinsame guideline|br)/i);
      const compRep = picked('D08-HRLEGAL-5', /(report|maßnahmen)/i) || picked('D07-HRLEGAL-3', /(hotline|whistle)/i);
      const retain  = picked('D08-CEO-4', /(retention|bonus)/i) || picked('D08-HRLEGAL-1', /(kriterien|gleichbehandlung)/i);

      let s = 'Der Betriebsrat prüft den Entwurf einer Vereinbarung zur Kommunikations‑ und Freigabedisziplin. Ziel ist ein klarer Freigabeweg mit dokumentiertem Audit‑Trail. ';
      if (brComm)  s += 'Die bereits verabredeten Kommunikationsgrundsätze bilden eine gute Basis. ';
      if (compRep) s += 'Der kombinierte Ansatz aus Kurzreport und Hotline stärkt die Glaubwürdigkeit. ';
      if (retain)  s += 'Transparente Kriterien bei Retention‑Maßnahmen fördern Akzeptanz und senken Leak‑Risiken. ';
      s += 'Vorschlag: wöchentlicher Jour fixe (30 Min) mit Maßnahmen‑Tracker und klaren Verantwortlichkeiten.';
      return s.trim();
    }
  },

  /**
   * Füllmeldungen (ohne KPI‑Wirkung, kein Detailfenster)
   */
  { id: 'N9-9',  day: 9, title: 'Zutrittsleser reagieren verzögert',  source: 'internal', severity: 'low', isImportant: false, content: 'Durch ein Firmware‑Update benötigen die Badge‑Leser heute vereinzelt zwei bis drei Sekunden länger. Es besteht kein Handlungsbedarf.', suppressHints: true },
  { id: 'N9-10', day: 9, title: 'Parkhaus Ost kurzzeitig gesperrt',   source: 'internal', severity: 'low', isImportant: false, content: 'Die Schranke am Parkhaus Ost ist wegen einer Störung für etwa 20 Minuten außer Betrieb. Die Security leitet Fahrzeuge auf die Westzufahrt um.', suppressHints: true },
  { id: 'N9-11', day: 9, title: 'Telefonanlage erhält Update',        source: 'internal', severity: 'low', isImportant: false, content: 'Zwischen 18:00 und 18:30 Uhr kann es zu kurzen Unterbrechungen bei Festnetzgesprächen kommen. Notrufwege sind nicht betroffen.', suppressHints: true },
  { id: 'N9-12', day: 9, title: 'Zustelldienst meldet Verzögerungen', source: 'internal', severity: 'low', isImportant: false, content: 'Der lokale Zustelldienst kündigt eine eintägige Verzögerung bei nicht priorisierten Sendungen an. Wichtige Dokumente werden bei Bedarf per Kurier versandt.', suppressHints: true }
];
