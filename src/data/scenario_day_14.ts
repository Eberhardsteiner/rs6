// src/data/scenario_day_14.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

/**
 * TAG 14 — Finale (16 Entscheidungsblöcke / 4 je Rolle)
 * Fokus: letzte Weichen vor Bewertung, Kommunikationsabschluss, Bank-/Kundencommitments,
 * Absicherung kritischer Zahlungen. Nach Tageswechsel greift die Ending-Logik.
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D14-CEO-1',
    day: 14,
    role: 'CEO',
    title: 'Verkauf von United Pumps of America"',
    context: 'Abschlussstatement an Mitarbeitende, Kunden, Bank und Öffentlichkeit.',
    dilemma: 'Realismus vs. Zuversicht',
    hiddenAgendaHint: 'Konsistenz mit Zahlen/Pack erhöht Glaubwürdigkeit.',
    options: [{ id: 'a', label: 'Faktenbasiertes Statement + klare Next Steps', kpiDelta: { bankTrust: +3, publicPerception: +3, customerLoyalty: +2, workforceEngagement: +3 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Optimistischer Ton, wenig Details',             kpiDelta: { publicPerception: +4, bankTrust: -2 } },
{ id: 'c', label: 'Nur interne Mail, extern erst später',          kpiDelta: { workforceEngagement: +2, publicPerception: -1 } },
{ id: 'd', label: 'Kein Abschlussstatement (Leise auslaufen)',     kpiDelta: { publicPerception: -3, bankTrust: -2 } }
  ],
  attachments: ['final_statement_tag14.docx', 'stakeholder_matrix_communication.pdf', 'message_house_finale.pptx']
  },
{
    id: 'D14-CEO-2',
    day: 14,
    role: 'CEO',
    title: 'Verkauf von United Pumps of Amercia finalisieren',
    context: 'Bank erwartet Entscheidung.',
    dilemma: 'Verbindlichkeit vs. Flexibilität',
    hiddenAgendaHint: 'Entscheidung treffen und kommunizieren.',
    options: [{ id: 'a', label: 'Verkauf finalisieren (Cash 30M)', kpiDelta: { cashEUR: +25000000, bankTrust: +6, publicPerception: -1, workforceEngagement: -4, customerLoyalty: -1 } },
{ id: 'b', label: 'Nachverhandeln',               kpiDelta: { bankTrust: -3, publicPerception: -1, workforceEngagement: +4, customerLoyalty: +1 } },
{ id: 'c', label: 'Kein Commitment – erst nächste Woche',                kpiDelta: { bankTrust: -4, publicPerception: -2, workforceEngagement: +1} },
{ id: 'd', label: 'Absagen',                  kpiDelta: { bankTrust: -6, publicPerception: -2, workforceEngagement: +4, customerLoyalty: +1 } }
  ],
  attachments: ['commitment_note_bank.pdf', 'united_pumps_valuation_final.xlsx']
  },
{
    id: 'D14-CEO-3',
    day: 14,
    role: 'CEO',
    title: 'Kunden-Beirat – Fortführung',
    context: 'Ob und wie der Kundenbeirat fortgeführt wird.',
    dilemma: 'Transparenz vs. Aufwand',
    hiddenAgendaHint: 'Ritualisierte Transparenz stützt Loyalität.',
    options: [{ id: 'a', label: 'Quartalsbeirat fixieren',               kpiDelta: { customerLoyalty: +4, publicPerception: +1 } },
{ id: 'b', label: 'Nur Ad-hoc bei Bedarf',                 kpiDelta: { customerLoyalty: +1 } },
{ id: 'c', label: 'Beirat pausieren',                      kpiDelta: { customerLoyalty: -2 } },
{ id: 'd', label: 'Beirat erweitern (2 neue A-Kunden, Kosten 5k)',    kpiDelta: { customerLoyalty: +5, cashEUR: -5000, profitLossEUR: -5000 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['customer_advisory_board_charter.pdf', 'key_account_feedback_summary.msg']
  },
{
    id: 'D14-CEO-4',
    day: 14,
    role: 'CEO',
    title: 'Einstieg Investor',
    context: 'Abschluss der Vorverhandlungen mit aktivem Investor.',
    dilemma: 'Cash vs. Abgabe von Einfluss',
    hiddenAgendaHint: 'Einstieg nur, wenn von Cash-Situation unvermeidbar',
    options: [{ id: 'a', label: 'Annahme der Offerte: 22,5 % Beteiligung für 5,5 Mio.',   kpiDelta: { cashEUR: 5500000, bankTrust: +6, publicPerception: +1, workforceEngagement: -8} },
{ id: 'b', label: 'Harte Ablehnung',           kpiDelta: { bankTrust: -4, publicPerception: +1, workforceEngagement: +4}  },
{ id: 'c', label: 'Verhandlungen vertagen',                      kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Anderen (freundlichen) Investor ins Spiel bringen',                   kpiDelta: { bankTrust: +1,  publicPerception: +2, workforceEngagement: +2 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['investor_due_diligence_report.pdf', 'equity_dilution_scenario.xlsx', 'betriebsrat_stellungnahme_investor.msg']
  }];

// Zusatz: 5. CEO-Block
const CEO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D14-CEO-5',
  day: 14,
  role: 'CEO',
  title: 'Stakeholder-Kaskade freigeben',
  context: 'Nach „Final View" für Verkauf von United Pumps of America müssen Bank, Beirat, Key Accounts und Team koordiniert abgeholt werden.',
  dilemma: 'Abschlussgefühl vs. laufende Erwartungs­steuerung',
  hiddenAgendaHint: 'Klar getaktete Touchpoints stabilisieren ohne neue Versprechen.',
  options: [
    { id: 'a', label: 'T+1 Townhall, T+3 Kundenbrief, T+7 Bank/Beirat-Update (Message House)', kpiDelta: { bankTrust: +2, customerLoyalty: +2, workforceEngagement: +2, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7, isTradeOff: true },
    { id: 'b', label: 'Nur interne T+1/T+7-Termine (Kunden später)',                           kpiDelta: { workforceEngagement: +1, bankTrust: +1 } },
    { id: 'c', label: 'Nur Bank „Thank You"-Note ohne Kaskade',                                 kpiDelta: { bankTrust: +1 } },
    { id: 'd', label: 'Keine Kaskade (ad hoc reagieren)',                                       kpiDelta: { workforceEngagement: -1, publicPerception: -1 } }
  ],
  attachments: ['stakeholder_cascade_timeline.pptx', 'thank_you_note_bank_draft.docx']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D14-CFO-1',
    day: 14,
    role: 'CFO',
    title: 'Payroll heute freigeben',
    context: 'Löhne reputationskritisch; Cash genau prüfen.',
    dilemma: 'Cash-Polster vs. Reputation',
    hiddenAgendaHint: 'Nichtfreigabe sendet kritisches Signal, Bankvertrauen bricht ein.',
    options: [{ id: 'a', label: 'Payroll vollständig freigeben (420k)', kpiDelta: { cashEUR: -560000, profitLossEUR: -560000, workforceEngagement: +6, publicPerception: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Payroll 80 % (Rest in 48h)',           kpiDelta: { cashEUR: -448000, profitLossEUR: -448000, workforceEngagement: +3, publicPerception: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Payroll verschieben (gefährlich)',     kpiDelta: { workforceEngagement: -6, publicPerception: -4, bankTrust: -6 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Bank-Überbrückung (kurzfristige Liquidität für 5 % Zinsen p.a. für 3 Monate )',       kpiDelta: {  cashEUR: -7200, profitLossEUR: -7200, workforceEngagement: +6, publicPerception: +2} }
  ],
  attachments: ['payroll_calculation_tag14.xlsx', 'bank_bridge_finance_offer.pdf', 'hr_payroll_priority_list.msg']
  },
{
    id: 'D14-CFO-2',
    day: 14,
    role: 'CFO',
    title: 'Finale Liquiditätsbrücke (13-Wochen)',
    context: 'Bank möchte Proof der Fortführungsfähigkeit.',
    dilemma: 'Ambition vs. Realismus',
    hiddenAgendaHint: 'Sensitivität & Maßnahmenzuordnung sind zentral.',
    options: [{ id: 'a', label: 'Bridge inkl. Sensitivitäten & Maßnahmen offenlegen', kpiDelta: { bankTrust: +6 } },
{ id: 'b', label: 'Nur Bridge ohne Sensitivität',            kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Verbales Update reicht',                  kpiDelta: { bankTrust: -2 } },
{ id: 'd', label: 'Externe Plausibilisierung (3k)',                     kpiDelta: { cashEUR: -3000, profitLossEUR: -3000, bankTrust: +3 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
attachments: ['13w_bridge_final.xlsx', 'sensitivity_analysis_memo.pdf', 'covenant_compliance_calculation.xlsx']
  },
{
    id: 'D14-CFO-3',
    day: 14,
    role: 'CFO',
    title: 'Lieferanten – Abschlussregime',
    context: 'Standstill & Gleichbehandlung dokumentieren.',
    dilemma: 'Stringenz vs. Einzelfall',
    hiddenAgendaHint: 'Dokumentation mindert Whistleblowing-Risiko.',
    options: [{ id: 'a', label: 'Abschlussnotiz zu Gleichbehandlung teilen', kpiDelta: { publicPerception: +1, bankTrust: +2 } },
{ id: 'b', label: 'Nur intern dokumentieren',                   kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Keine Doku (Tempo)',                         kpiDelta: { bankTrust: -2, publicPerception: -1 } },
{ id: 'd', label: 'Externen Kurzcheck (2k)',                    kpiDelta: { cashEUR: -2000, profitLossEUR: -2000, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['supplier_equal_treatment_protocol.pdf', 'whistleblower_prevention_note.docx']
  },
{
    id: 'D14-CFO-4',
    day: 14,
    role: 'CFO',
    title: 'Kreditlinie – Waiver/Sideletter',
    context: 'Formalisierung der Übergangsregeln.',
    dilemma: 'Verhandlungshärte vs. Abschlussfähigkeit',
    hiddenAgendaHint: 'Pragmatismus beschleunigt Stabilisierung.',
    options: [{ id: 'a', label: 'Waiver & Sideletter heute finalisieren', kpiDelta: { bankTrust: +5},
  isTradeOff: true },
{ id: 'b', label: 'Nur Eckpunkte, Detail nächste Woche',    kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Harte Nachverhandlung',                  kpiDelta: { bankTrust: -2 } },
{ id: 'd', label: 'Aufschub erbitten',                      kpiDelta: { bankTrust: -1 } }
  ],
  attachments: ['waiver_sideletter_draft.pdf', 'credit_facility_amendment.pdf']
  }];

// Zusatz: 5. CFO-Block
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D14-CFO-5',
  day: 14,
  role: 'CFO',
  title: 'Proof of Funds & Payment Advice senden',
  context: 'Bank und Top‑Lieferanten wollen Belege, dass Payroll und kritische Zahlungen heute angewiesen wurden.',
  dilemma: 'Transparenz vs. Datenschutz/Signaleffekt',
  hiddenAgendaHint: 'Gezielte Empfängerliste statt Massenaussendung.',
  options: [
    { id: 'a', label: 'PoF (Kontoauszug) + Payment Advices an Bank & 3 kritische Lieferanten', kpiDelta: { bankTrust: +4, customerLoyalty: +1, workforceEngagement: -2 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur PoF an Bank',                                                        kpiDelta: { bankTrust: +3 } },
    { id: 'c', label: 'Nur mündliche Bestätigung ohne Dokumente',                               kpiDelta: { bankTrust: -1 } },
    { id: 'd', label: 'Erst nach Buchungsbestätigung versenden',                                kpiDelta: { bankTrust: -2 } }
  ],
  attachments: ['critical_supplier_payment_list.xlsx']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D14-OPS-1',
    day: 14,
    role: 'OPS',
    title: 'A-Kunden-Lieferplan – Zusicherung',
    context: 'Letzte kritische Lieferungen heute/morgen.',
    dilemma: 'Kosten vs. Service',
    hiddenAgendaHint: 'Loyalitätsanker für Turnaround.',
    options: [{ id: 'a', label: 'Zusage + Express für A-Kunden ',    kpiDelta: { profitLossEUR: -22000, customerLoyalty: +5, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Zusage ohne Express',                   kpiDelta: { customerLoyalty: +2 } },
{ id: 'c', label: 'Keine Zusicherung',                     kpiDelta: { customerLoyalty: -3 } },
{ id: 'd', label: 'Nur B-Kunden priorisieren',             kpiDelta: { customerLoyalty: -4 } }
  ],
  attachments: ['express_logistics_quotation.msg', 'customer_priority_matrix.xlsx']
  },
{
    id: 'D14-OPS-2',
    day: 14,
    role: 'OPS',
    title: 'Qualität – Finaler Nachweis',
    context: 'Bank & Kunden wollen Stabilisierungsbeleg.',
    dilemma: 'Aufwand vs. Signal',
    hiddenAgendaHint: 'Externe Bestätigung erhöht Glaubwürdigkeit.',
    options: [{ id: 'a', label: 'Kurzreport mit KPI-Trend veröffentlichen', kpiDelta: { customerLoyalty: +2, bankTrust: +1 } },
{ id: 'b', label: 'Nur intern reporten',                      kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Kein Report',                              kpiDelta: { customerLoyalty: -1, bankTrust: -2 } },
{ id: 'd', label: 'Externer QS-Kurzcheck (5k)',               kpiDelta: { cashEUR: -4000, profitLossEUR: -4000, customerLoyalty: +3, publicPerception: +1 , bankTrust: +1},
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['quality_kpi_report_tag14.pdf', 'external_qs_audit_proposal.pdf', 'defect_rate_analysis.xlsx']
  },
{
    id: 'D14-OPS-3',
    day: 14,
    role: 'OPS',
    title: 'Materialfreigaben – Steuerungslogik für Carve-out & Kernproduktion',
    context: 'Nach LOI und laufenden Verhandlungen zum Verkauf United Pumps of America verlangen Bank und potenzieller Käufer belastbare Regeln für Materialeinsatz und Bestellungen. Ziel ist Kostenkontrolle ohne Liefertreue zu gefährden.',
    dilemma: 'Kurzfristige Flexibilität für Kunden vs. Disziplin zur Kosten- und Cash-Steuerung',
    hiddenAgendaHint: 'Eine transparente, nachvollziehbare Schwelle (DB = Deckungsbeitrag, Kritikalität A/B) stärkt Bankvertrauen und signalisiert Professionalität gegenüber dem Käufer.',
    options: [
      { id: 'a', label: 'Nur Freigaben bei DB > 25 % + Kritikalität A/B; alle anderen Aufträge pausieren',
        kpiDelta: { bankTrust: +2, customerLoyalty: +1, profitLossEUR: -80 },
        variance: 0.6, execLeakage: 0.4, isTradeOff: true,
        sideEffects: { publicPerception: +1 },
        cooldownDays: 2, lagDays: 1 },

      { id: 'b', label: 'Tageslimit je Linie (z. B. 50k Materialeinsatz) festlegen; Priorisierung intern durch OPS-Team',
        kpiDelta: { bankTrust: +1, profitLossEUR: 0 },
        variance: 0.5, execLeakage: 0.3,
        sideEffects: { workforceEngagement: -1 },
        cooldownDays: 1, lagDays: 0 },

      { id: 'c', label: 'Freigaben Ad-hoc nach Bauchgefühl der Produktionsleiter',
        kpiDelta: { bankTrust: -3, publicPerception: -2 },
        variance: 0.7, execLeakage: 0.7,
        sideEffects: { customerLoyalty: -1 },
        cooldownDays: 0, lagDays: 0 },

      { id: 'd', label: 'Materialfreigaben komplett einfrieren – Risiko Liefertreue bewusst eingehen',
        kpiDelta: { customerLoyalty: -3, bankTrust: 0 },
        variance: 0.6, execLeakage: 0.5,
        sideEffects: { workforceEngagement: -2 },
        cooldownDays: 0, lagDays: 0 }
    ],
    attachments: ['material_release_policy.pdf', 'contribution_margin_analysis.xlsx', 'production_steering_memo.docx']
    },
{
  id: 'D14-OPS-4',
  day: 14,
  role: 'OPS',
  title: 'Produktmix – Turnaround-Setup',
  context: 'Nach schwachen Wochen soll der Produktmix neu ausgerichtet werden. Ziel ist ein kurzfristiger Ergebnisschub durch DB-starke Produkte (Deckungsbeitrag > 30 %). Gleichzeitig droht Risiko: wichtige Kunden könnten sich vernachlässigt fühlen, wenn ihre weniger profitablen Produkte nicht mehr priorisiert werden.',
  dilemma: 'Maximierung kurzfristiger Ergebnisse vs. Aufrechterhaltung langfristiger Kundenbindung',
  hiddenAgendaHint: 'Eine enge Abstimmung mit Vertrieb und Key Account Management verhindert Reibungen und Fehlinterpretationen.',
  options: [
    { id: 'a', label: 'DB > 30 % als Default-Strategie (Ausnahmen nur für A-Kunden, um Vertragsstrafen zu vermeiden)',
      kpiDelta: { profitLossEUR: +12000, customerLoyalty: +1 },
      variance: 0.7, execLeakage: 0.5, isTradeOff: true,
      sideEffects: { bankTrust: +1 },
      cooldownDays: 2, lagDays: 1 },

    { id: 'b', label: 'Ausgewogener Mix: 50 % DB-stark, 50 % breiter Kundenbedarf – weniger Cash, aber stabilere Kundenbasis',
      kpiDelta: { profitLossEUR: +4000, customerLoyalty: +1 },
      variance: 0.6, execLeakage: 0.4,
      sideEffects: { publicPerception: +1 },
      cooldownDays: 2, lagDays: 1 },

    { id: 'c', label: 'A-Kunden strikt vor DB priorisieren – Kundenbindung sichern, Ergebnis kurzfristig schwächer',
      kpiDelta: { profitLossEUR: -6000, customerLoyalty: +3 },
      variance: 0.8, execLeakage: 0.6, isTradeOff: true,
      sideEffects: { bankTrust: -1 },
      cooldownDays: 1, lagDays: 0 },

    { id: 'd', label: 'Status quo beibehalten (kein Turnaround-Setup, kurzfristig keine Veränderung)',
      kpiDelta: { profitLossEUR: 0, customerLoyalty: 0 },
      variance: 0.5, execLeakage: 0.3,
      sideEffects: { workforceEngagement: -1 },
      cooldownDays: 0, lagDays: 0 }
  ],
  attachments: ['product_mix_turnaround_plan.pptx']
  }];

// Zusatz: 5. OPS-Block
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D14-OPS-5',
  day: 14,
  role: 'OPS',
  title: 'Hypercare 72h für A-Kunden',
  context: 'Nach Final View sollen Reklamationsrisiken aktiv gemanagt werden.',
  dilemma: 'Tempo/Kosten vs. Servicegrad',
  hiddenAgendaHint: 'Befristete Intensivbetreuung senkt Pönalen und stützt Zusagen.',
  options: [
    { id: 'a', label: '24/7‑Hotline + Onsite‑Bereitschaft (6k)',      kpiDelta: { profitLossEUR: -6000, customerLoyalty: +4, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Geschäftszeiten‑SLA + klarer Eskalationspfad (3k)', kpiDelta: {  profitLossEUR: -3000, customerLoyalty: +2 } },
    { id: 'c', label: 'Nur Standard‑Support',                         kpiDelta: { customerLoyalty: -1 } },
    { id: 'd', label: 'Hypercare nur Remote (1k)',                    kpiDelta: { profitLossEUR: -1000, customerLoyalty: +1 },
      variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['hypercare_sla_agreement.pdf', 'escalation_matrix_a_customers.xlsx', 'onsite_support_schedule.msg']
}];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D14-HRLEGAL-1',
    day: 14,
    role: 'HRLEGAL',
    title: 'Townhall „Verkauf United Pumps of America"',
    context: 'Abschlussformat mit Q&A.',
    dilemma: 'Offenheit vs. Erwartungsmanagement',
    hiddenAgendaHint: 'Wertschätzung + klare Roadmap senken Fluktuation.',
    options: [{ id: 'a', label: 'Townhall + Q&A + Roadmap teilen',  kpiDelta: { workforceEngagement: +5, publicPerception: +1 } },
{ id: 'b', label: 'Nur Q&A als E-Mail',                       kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Kein Format',                      kpiDelta: { workforceEngagement: -3 } },
{ id: 'd', label: 'Externer Coach (2k) moderiert',    kpiDelta: { profitLossEUR: -2000, workforceEngagement: +3 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['townhall_agenda_script.docx', 'employee_qa_preparation.pdf', 'roadmap_presentation.pptx']
  },
{
  id: 'D14-HRLEGAL-2',
  day: 14,
  role: 'HRLEGAL',
  title: 'Finalisierung Verkauf United Pumps of America – Closing-Package',
  context: 'Der Verkauf der Tochter steht unmittelbar vor dem Signing. Alle Closing-Dokumente (SPA, Disclosure Letter, Arbeitsrechtliche Überleitungen) müssen finalisiert und unterschriftsreif sein.',
  dilemma: 'Schnelles Closing vs. rechtliche Absicherung',
  hiddenAgendaHint: 'Ein ausgewogener Haftungsrahmen (Escrow, Garantien, §613a BGB) erhöht Bank- und Käufervertrauen.',
  options: [
    { id: 'a', label: 'Alle Dokumente finalisieren: SPA (Share Purchase Agreement), Disclosure Letter, Escrow-Vereinbarung und Mitarbeiter-Überleitung (§613a BGB), extern durch Kanzlei unterstützt (10k)',
      kpiDelta: { bankTrust: +5, publicPerception: +2, workforceEngagement: +1, cashEUR: -10000, profitLossEUR: -10000 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true },

    { id: 'b', label: 'Nur Kernpunkte (SPA + Zahlungsplan) unterzeichnen, restliche Dokumente nachreichen',
      kpiDelta: { bankTrust: +2, publicPerception: 0 },
      variance: 0.5, execLeakage: 0.4 },

    { id: 'c', label: 'Haftung stark begrenzen (Cap 10 %, kein Escrow), Risiko späterer Streitigkeiten in Kauf nehmen',
      kpiDelta: { bankTrust: -2, publicPerception: -1 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true },

    { id: 'd', label: 'Closing vertagen; offene Punkte (Garantien, Consent-Matrix) erst nächste Woche klären',
      kpiDelta: { bankTrust: -3, workforceEngagement: -1 },
      variance: 0.4, execLeakage: 0.3 }
  ],
  attachments: ['spa_united_pumps_final.pdf', 'disclosure_letter_draft.docx', 'employee_transfer_613a.pdf', 'escrow_agreement.pdf']
  },
{
    id: 'D14-HRLEGAL-3',
    day: 14,
    role: 'HRLEGAL',
    title: 'Compliance-Dossier an Bank',
    context: 'Gleichbehandlung/Whistleblowing/DSFA als Paket.',
    dilemma: 'Detailtiefe vs. Aufwand',
    hiddenAgendaHint: 'Geordnete Ablage reduziert PR-Risiko.',
    options: [{ id: 'a', label: 'Dossier final an Bank (Kurzfassung)', kpiDelta: { bankTrust: +3, publicPerception: +1 } },
{ id: 'b', label: 'Nur intern archivieren',              kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Noch nicht senden',                   kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Externer Kurzcheck (2k)',             kpiDelta: { profitLossEUR: -2000, bankTrust: +4,  publicPerception: +1  },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['compliance_dossier_summary.pdf', 'whistleblower_protection_protocol.docx', 'dsfa_assessment_final.pdf']
  },
{
    id: 'D14-HRLEGAL-4',
    day: 14,
    role: 'HRLEGAL',
    title: 'Konfliktprävention – Übergang in Normalbetrieb',
    context: 'CFO/OPS Spannungen entschärfen, Regeln für Alltag.',
    dilemma: 'Top-down vs. vereinbarte Regeln',
    hiddenAgendaHint: 'Klare Spielregeln verhindern Rückfälle.',
    options: [{ id: 'a', label: 'Konflikt-Charta + Eskalationspfad',   kpiDelta: { workforceEngagement: +3, bankTrust: +1 } },
{ id: 'b', label: 'Nur „goodwill" Appell',               kpiDelta: { workforceEngagement: 0 } },
{ id: 'c', label: 'Kein Schritt (zurück in Ad-hoc)',     kpiDelta: { workforceEngagement: -2 } },
{ id: 'd', label: 'Großflächige externe Mediation zusätzlich zu internen Konfliktmanagern',              kpiDelta: { cashEUR: -15000, profitLossEUR: -15000, workforceEngagement: +6 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['conflict_charter_draft.pdf', 'escalation_paths_overview.pptx', 'mediation_proposal.msg']
  }];

// Zusatz: 5. HR/Legal-Block
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D14-HRLEGAL-5',
  day: 14,
  role: 'HRLEGAL',
  title: 'Abschlusskommunikation – Freigabe & Sperrfristen',
  context: 'Für finale Statements/LOI‑Gerüchte wird eine klare Freigabe- und Sprachregelung benötigt.',
  dilemma: 'Transparenz vs. Rechtsrisiko',
  hiddenAgendaHint: 'Einheitliche Q&A und definierte Freigaben senken Fehlkommunikation.',
  options: [
    { id: 'a', label: 'Sprachregelung + Q&A + 14‑Tage Sperrfristen veröffentlichen', kpiDelta: { publicPerception: +2, bankTrust: +1 } },
    { id: 'b', label: 'Nur interne Leitlinie ohne Sperrfristen',                     kpiDelta: { bankTrust: +1 } },
    { id: 'c', label: 'Nicht adressieren (Gerüchterisiko)',                          kpiDelta: { publicPerception: -2 } },
    { id: 'd', label: 'Externe Kanzlei Schnellcheck (2k)',                           kpiDelta: { profitLossEUR: -2000, bankTrust: +1 },
      variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['communication_guidelines_final.pdf', 'qa_template_external.docx', 'legal_clearance_checklist.xlsx']
}];

export const day14Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CEO_BLOCKS_EXTRA,
  ...CFO_BLOCKS,
  ...CFO_BLOCKS_EXTRA,
  ...OPS_BLOCKS,
  ...OPS_BLOCKS_EXTRA,
  ...HRLEGAL_BLOCKS,
  ...HRLEGAL_BLOCKS_EXTRA
];

// -------------------------------------
// Helper-Funktionen für dynamische News
// -------------------------------------
function choseCommTransparent(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    e.day <= (ctx?.day ?? 99) &&
    typeof e.chosenOptionLabel === 'string' &&
    /fakten|statement|q\&a|faq|transpar|klar|briefing|message house|commitment\-note|townhall/i.test(e.chosenOptionLabel)
  );
}
function payrollSecured(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(payroll.*freigeben|payroll\-konto|lohn|gehälter|payroll.*deck(en|ung))/i.test(e.chosenOptionLabel)
  );
}
function waiverFinalized(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(waiver|sideletter).*(final|finalisieren)/i.test(e.chosenOptionLabel)
  );
}
function proofOfFundsShared(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(proof.*funds|payment.*advice|kontoauszug)/i.test(e.chosenOptionLabel)
  );
}
function opsHypercareActive(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(hypercare|24\/7|hotline|eskalationspfad)/i.test(e.chosenOptionLabel)
  );
}
function qualityProofActive(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(defektrate|nacharbeit|qs|kurzreport|externer qs\-check)/i.test(e.chosenOptionLabel)
  );
}
function lowBankTrust(ctx: any, thr: number = 70): boolean {
  const bt = Number(ctx?.kpi?.bankTrust ?? 100);
  return bt < thr;
}

// src/data/scenario_day_14.ts — NUR den News‑Block ersetzen
export const day14News: DayNewsItem[] = [
  // Kernmeldungen (ausgebaut, mit Entscheidungs‑Bezug und Rückblick)
  {
    id: 'N14-1',
    day: 14,
    title: 'Payroll heute fällig',
    source: 'internal',
    severity: 'critical',
    isImportant: true,
    content: 'Reputationskritischer Zahlungslauf.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const lowBT = lowBankTrust(ctx, 70);

      const cfoPayroll = log.find((e: any) => (e.id === 'D14-CFO-1' || e.decisionId === 'D14-CFO-1'));
      const payrollOpt = String(cfoPayroll?.optionId || '');
      const usedBridge = payrollOpt === 'd';
      const partial    = payrollOpt === 'b';
      const delayed    = payrollOpt === 'c';

      const basis = 'Die Lohn‑ und Gehaltszahlung wird heute ausgeführt. Eine reibungslose Abwicklung ist zentral für Reputation und Teamvertrauen. ';
      let tone = '';
      if (delayed) {
        tone = 'Achtung: Eine Verschiebung würde unmittelbar Vertrauen kosten und könnte interne Abwanderung triggern. ';
      } else if (partial) {
        tone = 'Die 80‑%‑Freigabe stabilisiert kurzfristig, verlangt aber heute eine klare Roadmap für die Restzahlung. ';
      } else if (usedBridge) {
        tone = 'Die kurzfristige Bank‑Überbrückung sichert den Zahlungslauf; die Zinslast ist überschaubar und sollte im Review‑Pack transparent gezeigt werden. ';
      } else {
        tone = 'Die vollständige Freigabe stützt das Momentum aus den letzten Tagen und signalisiert Handlungsfähigkeit. ';
      }

      const status = payrollSecured(ctx)
        ? 'Die Abdeckung ist vorbereitet; eine kurze interne Bestätigung an alle Teams (Owner, Uhrzeit, Kontakt) wird empfohlen. '
        : (lowBT ? 'Bei vorsichtigem Bankvertrauen ist eine faktenbasierte Statusmeldung inkl. Zahlungskette (Freigabe, Cut‑off, Buchung) dringend angeraten. '
                  : 'Ohne gesicherte Abdeckung steigt das Risiko von Gerüchten; bitte den Zahlungsfahrplan schriftlich bestätigen. ');

      const bank = proofOfFundsShared(ctx)
        ? 'Bank und relevante Stakeholder haben bereits Zahlungsnachweise (Payment Advices/Proof of Funds) erhalten. '
        : 'Empfehlung: Payment Advices/Proof of Funds heute an Bank/Beirat senden, sensible Daten redigieren. ';

      return (basis + tone + status + bank).trim();
    }
  },
  {
    id: 'N14-2',
    day: 14,
    title: 'Bank wartet auf Final View',
    source: 'bank',
    severity: 'high',
    isImportant: true,
    content: 'Waiver/Sideletter & 13‑Wochen‑Bridge.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const bridgeOpt = String(log.find((e: any) => (e.id === 'D14-CFO-2' || e.decisionId === 'D14-CFO-2'))?.optionId || '');
      const waiverOpt = String(log.find((e: any) => (e.id === 'D14-CFO-4' || e.decisionId === 'D14-CFO-4'))?.optionId || '');
      const saleOpt   = String(log.find((e: any) => (e.id === 'D14-CEO-2' || e.decisionId === 'D14-CEO-2'))?.optionId || '');

      const basis = 'Die Bank erwartet heute die finale Sicht inkl. 13‑Wochen‑Bridge sowie den Stand zu Waiver/Sideletter. ';
      let tone = '';
      if (bridgeOpt === 'a') tone += 'Bridge mit Sensitivitäten und Maßnahmenzuordnung wird positiv gewertet. ';
      if (bridgeOpt === 'b') tone += 'Nur Bridge ohne Sensitivitäten ist angreifbar; Downside‑Cases bitte nachreichen. ';
      if (bridgeOpt === 'c') tone += 'Ein rein verbales Update reicht nicht – formale Unterlagen sind erforderlich. ';
      if (bridgeOpt === 'd') tone += 'Externe Plausibilisierung erhöht die Akzeptanz, bitte Kernergebnisse in die Exec‑Summary übernehmen. ';

      if (waiverOpt === 'a') tone += 'Die Finalisierung von Waiver/Sideletter beschleunigt die Stabilisierung. ';
      if (waiverOpt === 'c') tone += 'Harte Nachverhandlungen könnten als Risikosignal gelesen werden; Nutzen gegen Zeitverlust abwägen. ';
      if (waiverOpt === 'd') tone += 'Aufschub schwächt das Momentum – knapper Taktplan (T+1/T+3) empfohlen. ';

      if (saleOpt === 'a') tone += 'Die Entscheidung zum Teilverkauf (Cash‑Zufluss) ist in der Covenant‑Bridge zu spiegeln. ';
      if (saleOpt === 'b') tone += 'Nachverhandlung erhöht Unsicherheit – bitte Effekte in Sensitivitäten kenntlich machen. ';
      if (saleOpt === 'c' || saleOpt === 'd') tone += 'Ohne Commitment sind Liquiditätsannnahmen konservativ zu halten. ';

      return (basis + tone).trim();
    }
  },
  {
    id: 'N14-3',
    day: 14,
    title: 'A‑Kunden fordern Zusicherung',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Servicegrad & Lieferplan für nächste 2 Wochen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const opsPlan = String(log.find((e: any) => (e.id === 'D14-OPS-1' || e.decisionId === 'D14-OPS-1'))?.optionId || '');
      const qsPlan  = String(log.find((e: any) => (e.id === 'D14-OPS-2' || e.decisionId === 'D14-OPS-2'))?.optionId || '');
      const hyper   = opsHypercareActive(ctx);

      const basis = 'A‑Kunden bitten um belastbare Zusagen zu Lieferterminen und Eskalationspfaden für die kommenden 14 Tage. ';
      let tone = '';
      if (opsPlan === 'a') tone += 'Die Option „Zusage + Express“ stärkt die Termintreue, Kosten bitte im Review sichtbar machen. ';
      if (opsPlan === 'b') tone += 'Zusage ohne Express ist vertretbar, sofern Risikoteile klar markiert sind. ';
      if (opsPlan === 'c' || opsPlan === 'd') tone += 'Ohne Zusicherung drohen Pönalen und Vertrauensverlust – gegensteuern. ';
      if (qsPlan === 'a') tone += 'Der KPI‑Kurzreport erleichtert die externe Kommunikation und senkt Rückfragen. ';
      if (qsPlan === 'd') tone += 'Ein externer QS‑Kurzcheck erhöht die Glaubwürdigkeit gegenüber Bank und A‑Kunden. ';
      tone += hyper ? 'Die geplante Hypercare‑Phase (72h) stützt die Zusicherungen zusätzlich. '
                    : 'Ein befristetes Hypercare‑Fenster würde die Absicherung weiter stärken. ';

      const bank = 'Empfehlung: Kundenbrief heute mit Terminlinie, QS‑Anhang (Trends/Containment) und Eskalationsmatrix versenden.';
      return (basis + tone + bank).trim();
    }
  },
  {
    id: 'N14-4',
    day: 14,
    title: 'Blog: „Turnaround bei APS?"',
    source: 'press',
    severity: 'medium',
    isImportant: false,
    content: 'Spekulation über Stabilisierungsschritte.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const mixOpt   = String(log.find((e: any) => (e.id === 'D14-OPS-4' || e.decisionId === 'D14-OPS-4'))?.optionId || '');
      const matrlOpt = String(log.find((e: any) => (e.id === 'D14-OPS-3' || e.decisionId === 'D14-OPS-3'))?.optionId || '');
      const commOK   = choseCommTransparent(ctx);

      const basis = 'Ein Branchenblog bewertet die Tragfähigkeit des Turnarounds und verweist auf Produktmix‑ und Materialfreigabe‑Entscheidungen. ';
      let tone = '';
      if (mixOpt === 'a') tone += 'Die DB‑starke Ausrichtung wirkt fokussiert; Ausnahmenregel für A‑Kunden sollte klar kommuniziert werden. ';
      if (mixOpt === 'b') tone += 'Der ausgewogene Mix balanciert Ergebnis und Kundenbindung – konservativ, aber stabil. ';
      if (mixOpt === 'c') tone += 'Die strikte A‑Kunden‑Priorisierung sichert Loyalität, drückt jedoch kurzfristig die Marge. ';
      if (matrlOpt === 'a' || matrlOpt === 'b') tone += 'Die dokumentierte Material‑Steuerungslogik untermauert Professionalität in der Krise. ';
      tone += commOK ? 'Ihre faktenbasierte Linie der letzten Tage reduziert Angriffsflächen. '
                     : 'Ohne konsistente Botschaften könnten Spekulationen an Fahrt gewinnen. ';
      return (basis + tone).trim();
    }
  },

  // Kontextmeldungen – je eine pro Rolle (ausgebaut)
  {
    id: 'N14-5',
    day: 14,
    title: 'CEO: T+1/T+7‑Kaskade angefragt',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Bank und zwei Key Accounts erbitten eine abgestimmte Kommunikationskaskade nach Tag 14.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const cascadeOpt = String(log.find((e: any) => (e.id === 'D14-CEO-5' || e.decisionId === 'D14-CEO-5'))?.optionId || '');
      const finalStmt  = String(log.find((e: any) => (e.id === 'D14-CEO-1' || e.decisionId === 'D14-CEO-1'))?.optionId || '');
      const saleOpt    = String(log.find((e: any) => (e.id === 'D14-CEO-2' || e.decisionId === 'D14-CEO-2'))?.optionId || '');

      const basis = 'Für die Zeit nach Tag 14 wird um einen klar getakteten Kommunikationsplan gebeten (intern/extern synchronisiert). ';
      let tone = '';
      if (cascadeOpt === 'a') tone += 'Die T+1/T+3/T+7‑Kaskade (Townhall, Kundenbrief, Bank/Beirat‑Update) schafft Verlässlichkeit. ';
      if (cascadeOpt === 'b') tone += 'Interner Fokus ist sinnvoll; Kunden sollten spätestens T+3 informiert werden. ';
      if (cascadeOpt === 'c') tone += 'Eine reine „Thank‑You“-Note an die Bank reicht als Minimalstandard, birgt aber Lücken zu Kunden. ';
      if (cascadeOpt === 'd') tone += 'Ad‑hoc‑Kommunikation würde das Erreichte riskieren – vermeiden. ';
      if (finalStmt === 'a') tone += 'Das faktenbasierte Abschlussstatement dient als guter Anker für die Kaskade. ';
      if (saleOpt === 'a')  tone += 'Bei finalisiertem Teilverkauf bitte Meilensteine (Escrow/Earn‑Out/Closing‑Steps) konsistent führen. ';

      const rec = 'Empfehlung: Message‑House finalisiert halten, Ansprechpartner je Touchpoint benennen und Fragenpool pflegen.';
      return (basis + tone + rec).trim();
    }
  },
  {
    id: 'N14-6',
    day: 14,
    title: 'CFO: Zahlungsnachweise angefragt',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content: 'Proof of Funds und Payment Advices zu Payroll/kritischen Rechnungen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const pofOpt   = String(log.find((e: any) => (e.id === 'D14-CFO-5' || e.decisionId === 'D14-CFO-5'))?.optionId || '');
      const payroll  = String(log.find((e: any) => (e.id === 'D14-CFO-1' || e.decisionId === 'D14-CFO-1'))?.optionId || '');
      const basis = 'Die Bank bittet um Nachweise über angewiesene Zahlungen (Payroll, Top‑Lieferanten). ';
      let tone = '';
      if (pofOpt === 'a') tone += 'PoF und Payment Advices sind adressiert – bitte sensible Daten redigieren und Zugriffsliste klein halten. ';
      if (pofOpt === 'b') tone += 'PoF an die Bank ist gesendet; Top‑Lieferanten können eine knappe Zahlungsbestätigung erhalten. ';
      if (pofOpt === 'c') tone += 'Mündliche Bestätigungen genügen nicht – Dokumente nachreichen. ';
      if (pofOpt === 'd') tone += 'Versand erst nach Buchungsbestätigung verzögert das Signal – Zwischenbestätigung erwägen. ';
      if (payroll === 'b') tone += 'Bei 80‑%‑Payroll bitte den Resttermin mitliefern, um Rückfragen zu vermeiden. ';
      const rec = 'Empfehlung: Einseitige Zusammenfassung beilegen (Summe, Datum, Cut‑off, Ansprechpartner).';
      return (basis + tone + rec).trim();
    }
  },
  {
    id: 'N14-7',
    day: 14,
    title: 'OPS: Hypercare‑Fenster vorgeschlagen',
    source: 'customer',
    severity: 'medium',
    isImportant: true,
    content: 'A‑Kunden regen 72‑Stunden‑Hypercare zur Absicherung an.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const hyperOpt = String(log.find((e: any) => (e.id === 'D14-OPS-5' || e.decisionId === 'D14-OPS-5'))?.optionId || '');
      const planOpt  = String(log.find((e: any) => (e.id === 'D14-OPS-1' || e.decisionId === 'D14-OPS-1'))?.optionId || '');

      const basis = 'Zur Absicherung der Zusagen schlagen A‑Kunden ein befristetes Hypercare‑Fenster vor. ';
      let tone = '';
      if (hyperOpt === 'a') tone += '24/7‑Hotline und Onsite‑Bereitschaft senden ein starkes Stabilitätssignal. ';
      if (hyperOpt === 'b') tone += 'Geschäftszeiten‑SLA ist kosteneffizient; bitte klare Eskalationsmatrix teilen. ';
      if (hyperOpt === 'd') tone += 'Remote‑Hypercare ist eine schlanke Alternative; Onsite bei Eskalation bereithalten. ';
      if (planOpt === 'a')  tone += 'Die Express‑Logik für A‑Kunden verzahnt sich gut mit Hypercare. ';

      const rec = 'Empfehlung: Hypercare‑Scope (Reaktionszeiten, Ansprechpartner) heute schriftlich fixieren.';
      return (basis + tone + rec).trim();
    }
  },
  {
    id: 'N14-8',
    day: 14,
    title: 'HR/Legal: Abschluss‑Disclosure abstimmen',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Freigabeprozess und Sperrfristen für finale Statements sollen heute formell bestätigt werden.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const discOpt  = String(log.find((e: any) => (e.id === 'D14-HRLEGAL-5' || e.decisionId === 'D14-HRLEGAL-5'))?.optionId || '');
      const closePkg = String(log.find((e: any) => (e.id === 'D14-HRLEGAL-2' || e.decisionId === 'D14-HRLEGAL-2'))?.optionId || '');
      const finalStmt= String(log.find((e: any) => (e.id === 'D14-CEO-1' || e.decisionId === 'D14-CEO-1'))?.optionId || '');

      const basis = 'Für die Abschlusskommunikation sind Sprachregelung, Q&A und Sperrfristen final freizugeben. ';
      let tone = '';
      if (discOpt === 'a') tone += 'Veröffentlichte Sperrfristen und Q&A reduzieren Fehlkommunikation spürbar. ';
      if (discOpt === 'b') tone += 'Interne Leitlinie hilft – Sperrfristen bitte zeitnah ergänzen. ';
      if (discOpt === 'c') tone += 'Ohne Regelung steigt das Gerüchterisiko; vermeiden. ';
      if (discOpt === 'd') tone += 'Schnellcheck durch Kanzlei ist sinnvoll; Ergebnis kurz dokumentieren. ';
      if (closePkg === 'a') tone += 'Das Closing‑Package (SPA/Disclosure/Escrow/§613a) ist abgestimmt – Kommunikationslinie daran ausrichten. ';
      if (finalStmt === 'a') tone += 'Das faktenbasierte Abschlussstatement dient als Referenztext für externe Anfragen. ';

      const rec = 'Empfehlung: Einseitige Freigabematrix (Owner, Kanal, Frist) im Intranet veröffentlichen.';
      return (basis + tone + rec).trim();
    }
  },

  // Füllmeldungen (ohne KPI‑Wirkung; keine Detailfenster)
  { id: 'N14-F1', day: 14, title: 'PV‑Anlage: Sichtprüfung bestanden', source: 'internal', severity: 'low', isImportant: false, content: 'Die jährliche Sichtprüfung der PV‑Anlage auf Halle 1 wurde ohne Beanstandungen abgeschlossen.', suppressHints: true },
  { id: 'N14-F2', day: 14, title: 'E‑Ladesäulen Nord kurzzeitig belegt', source: 'internal', severity: 'low', isImportant: false, content: 'Die beiden E‑Ladesäulen sind heute zwischen 12:00 und 14:00 Uhr wegen externer Besucher reserviert.', suppressHints: true },
  { id: 'N14-F3', day: 14, title: 'Drucker‑Tinte wird getauscht',        source: 'internal', severity: 'low', isImportant: false, content: 'Im Verwaltungsgebäude Nord werden am Nachmittag die Großformatdrucker mit neuer Tinte bestückt; kurze Ausfälle sind möglich.', suppressHints: true },
  { id: 'N14-F4', day: 14, title: 'Pflasterarbeiten Zufahrt West',       source: 'internal', severity: 'low', isImportant: false, content: 'An der Zufahrt West finden kleine Pflasterarbeiten statt; die Einfahrt ist temporär verengt.', suppressHints: true }
];
