// src/data/scenario_day_12.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

/**
 * TAG 12 — 16 Entscheidungsblöcke (je 4 pro Rolle)
 * Fokus: Bank-Zwischenprüfung heute, mögliche Waiver-Nachforderungen, letzte Weichenstellung
 * vor den Tagen 13–14 (Payroll/Finale). Reputations- und Vertrauensaspekte verdichten sich.
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D12-CEO-1',
    day: 12,
    role: 'CEO',
    title: 'Bank-Zwischenprüfung – Auftritt & Botschaften',
    context: 'Heute Review der Waiver-Meilensteine mit Bank.',
    dilemma: 'Maximale Offenheit vs. Schutz sensibler Details',
    hiddenAgendaHint: 'Klare „Next Steps" mit Ownern und Terminen stärken Glaubwürdigkeit.',
    options: [{ id: 'a', label: 'Offen & konkret (Fortschritte, Lücken, Plan)',     kpiDelta: { bankTrust: +7 } },
{ id: 'b', label: 'Überwiegend Fortschritte betonen',                  kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Vage bleiben (Risiko Nachfragen)',                  kpiDelta: { bankTrust: -3 } },
{ id: 'd', label: 'Externe Moderation (5k) beauftragen',               kpiDelta: { profitLossEUR: -5000, bankTrust: +4 },
  variance: 0.8, 
  execLeakage: 0.7 }],
  attachments: ['d12_ceo_bank_review_agenda_tag12.pdf', 'd12_ceo_milestone_tracking_dashboard.xlsx']
  },
{
    id: 'D12-CEO-2',
    day: 12,
    role: 'CEO',
    title: 'Nachforderung der Bank – Zusatzauflagen?',
    context: 'Die Bank erwägt zusätzliche Auflagen (z. B. monatliches Board-Update, Capex-Freeze).',
    dilemma: 'Zustimmung vs. Verhandlungsspielraum',
    hiddenAgendaHint: 'Ziel: Auflagen präzise, befristet, messbar.',
    options: [{ id: 'a', label: 'Auflagen annehmen, Laufzeit befristen',            kpiDelta: { profitLossEUR: -5000, cashEUR: -5000, bankTrust: +4 },
  isTradeOff: true },
{ id: 'b', label: 'Auflagen verhandeln (Softening)',                   kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Auflagen ablehnen (Risiko)',                        kpiDelta: { bankTrust: -4 } },
{ id: 'd', label: 'Auflagen annehmen + öffentlich machen (PR)',        kpiDelta: { profitLossEUR: -5000, cashEUR: -5000, publicPerception: +2, bankTrust: +1 } }],
  attachments: ['d12_ceo_bank_covenant_amendment_draft.docx']
  },
{
    id: 'D12-CEO-3',
    day: 12,
    role: 'CEO',
    title: 'Strategische Kommunikation nach dem Review',
    context: 'Teams, Kunden und Lieferanten erwarten Einordnung.',
    dilemma: 'Schnelligkeit vs. Konsistenz',
    hiddenAgendaHint: 'Einheitliche Kernbotschaften über alle Kanäle.',
    options: [{ id: 'a', label: 'Interne Townhall + Kundenbrief am selben Tag',      kpiDelta: { workforceEngagement: +4, customerLoyalty: +3, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Nur internes Memo, Kunden morgen',                  kpiDelta: { workforceEngagement: +2, customerLoyalty: +1 } },
{ id: 'c', label: 'Nur externe PM',                                    kpiDelta: { publicPerception: +1, workforceEngagement: -1 } },
{ id: 'd', label: 'Keine Kommunikation heute',                         kpiDelta: { workforceEngagement: -3, customerLoyalty: -2 } }],
  attachments: ['d12_ceo_kommunikationsplan_review.pptx', 'd12_ceo_kundenbrief_entwurf.docx']
  },
{
    id: 'D12-CEO-4',
    day: 12,
    role: 'CEO',
    title: 'Strategische Option: Teil-Carve-out prüfen',
    context: 'Bank fragt nach optionalen strukturellen Hebeln.',
    dilemma: 'Zukunftsbild vs. aktuellen Fokus',
    hiddenAgendaHint: 'Nur prüfen, keine Unruhe stiften.',
    options: [{ id: 'a', label: 'Carve-out-Screening (1–2 Bereiche) beauftragen (6k)', kpiDelta: { profitLossEUR: -6000, bankTrust: +2, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Interne Vorprüfung ohne externe Spuren',              kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Thema abwenden',                                       kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Öffentlich andeuten (hohes PR-Risiko)',               kpiDelta: { workforceEngagement: -4, publicPerception: -2, bankTrust: -2 } }],
  attachments: ['d12_ceo_carveout_preliminary_assessment.pdf']
  }];

// NEU (5. CEO-Block – ohne Kürzung der Originale)
const CEO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D12-CEO-5',
  day: 12,
  role: 'CEO',
  title: 'Stakeholder-Fahrplan 48h nach Review',
  context: 'Nach der Zwischenprüfung sollen Bank, Beirat, Key Accounts und Lieferanten konsistent abgeholt werden.',
  dilemma: 'Maximale Transparenz vs. gezielte Dosierung',
  hiddenAgendaHint: 'Kurzzyklische, faktenbasierte Touchpoints reduzieren Spekulationen.',
  options: [
    { id: 'a', label: 'Abgestimmter 48h-Plan (Bank/Beirat/Kunden/Lieferanten)', kpiDelta: { bankTrust: +2, customerLoyalty: +2, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur Bank & Beirat aktiv ansprechen',                     kpiDelta: { bankTrust: +2 } },
    { id: 'c', label: 'Nur Pressearbeit priorisieren',                          kpiDelta: { publicPerception: +2, bankTrust: -2 } },
    { id: 'd', label: 'Kein strukturierter Plan (ad hoc)',                      kpiDelta: { publicPerception: -1 } }
  ],
  attachments: ['d12_ceo_48h_stakeholder_matrix.xlsx']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D12-CFO-1',
    day: 12,
    role: 'CFO',
    title: 'Review-Pack final – Zahlenstand & Forecast',
    context: 'Letzte Aktualisierung vor dem Termin.',
    dilemma: 'Umfang vs. Lesbarkeit',
    hiddenAgendaHint: 'Konsistente Bridge bis Tag 14 zeigen.',
    options: [{ id: 'a', label: 'Detailpack + Executive Summary',                kpiDelta: { bankTrust: +6 } },
{ id: 'b', label: 'Kurzpräsentation + Anhang',                     kpiDelta: { bankTrust: +3 } },
{ id: 'c', label: 'Nur KPI-Seite',                                 kpiDelta: { bankTrust: 0 } },
{ id: 'd', label: 'Extern validieren (4k)',                        kpiDelta: { profitLossEUR: -4000, bankTrust: +3 },
  variance: 0.8, 
  execLeakage: 0.7 }],
attachments: ['review_pack_tag12.pptx', 'd12_cfo_covenant_compliance_certificate.pdf']
  },
{
    id: 'D12-CFO-2',
    day: 12,
    role: 'CFO',
    title: 'Cash-Polster Tag 13–14',
    context: 'Noch kleine Planunsicherheiten bei Eingängen.',
    dilemma: 'Zusatzpuffer vs. Signaleffekt',
    hiddenAgendaHint: 'Bank nicht mit Panik-Requests überfahren.',
    options: [{ id: 'a', label: 'Gezielte Skontoaktion kleiner Umfang',         kpiDelta: { cashEUR: +30000, profitLossEUR: -4500, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'b', label: 'Mini-Bestandsabverkauf ',          kpiDelta: { cashEUR: +20000, profitLossEUR: -3000 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'c', label: 'Kurzfristige Zwischenlinie anfragen',          kpiDelta: { bankTrust: +1 } },
{ id: 'd', label: 'Kein Puffer – Planung halten',                 kpiDelta: { bankTrust: 0 } }],
  attachments: ['d12_cfo_cash_forecast_sensitivities']
  },
{
  id: 'D12-CFO-3',
  day: 12,
  role: 'CFO',
  title: 'United Pumps of America – Kaufpreisstruktur & Closing-Plan',
  context: 'Investor legt Term Sheet vor: 40 Mio. Gesamtpreis, davon 30 Mio. Cash, 5 Mio. Escrow (Treuhandkonto), 5 Mio. Earn-Out (= variabler Kaufpreisanteil) abhängig vom EBITDA. Bank fordert klare Darstellung von Cash-Impact und Covenant-Effekten. Entscheidungsvorschlag für CEO erarbeiten.',
  dilemma: 'Liquidität kurzfristig vs. Risikoabsicherung & Governance',
  hiddenAgendaHint: 'Ein realistischer Zahlungsplan stärkt Bankvertrauen und sichert Verhandlungsposition.',
  options: [
    { id: 'a', label: 'Investorenvorschlag akzeptieren: 30 Mio. Cash + 5 Mio. Escrow (18 Monate) + 5 Mio. Earn-Out',
      kpiDelta: { bankTrust: +4, profitLossEUR: 0, publicPerception: +1,  workforceEngagement: -4 },
      variance: 0.6, execLeakage: 0.4, isTradeOff: true },

    { id: 'b', label: 'Escrow reduzieren (auf 2 Mio.), Cash-Anteil auf 33 Mio. erhöhen – Verhandlung mit Hinweis auf Due-Diligence-Sauberkeit',
      kpiDelta: { bankTrust: +2, workforceEngagement: -4 },
      variance: 0.7, execLeakage: 0.5, isTradeOff: true },

    { id: 'c', label: 'Earn-Out ausweiten (10 Mio.) gegen geringeren Cash-Anteil (25 Mio.) – Risiko in Zukunft verschieben',
      kpiDelta: { bankTrust: +1, publicPerception: -1,  workforceEngagement: -2 },
      variance: 0.8, execLeakage: 0.6, isTradeOff: true },

    { id: 'd', label: 'Closing verschieben; zunächst interne Covenant-Analyse (kein sofortiger Zufluss)',
      kpiDelta: { bankTrust: -2, publicPerception: -1 },
      variance: 0.5, execLeakage: 0.3 }
  ],
  attachments: ['d12_cfo_upa_term_sheet.pdf']
},
{
    id: 'D12-CFO-4',
    day: 12,
    role: 'CFO',
    title: 'DSO/DPO/DIO – Zielkorridore vereinbaren',
    context: 'Bank wünscht Zielkorridore für WC-KPIs.',
    dilemma: 'Ambition vs. Realismus',
    hiddenAgendaHint: 'Realisitische Etappen erhöhen Vertrauen.',
    options: [{ id: 'a', label: 'Ambitioniert, aber realistisch',                 kpiDelta: { bankTrust: +3, workforceEngagement: +1 } },
{ id: 'b', label: 'Sehr ambitioniert (Risiko Verfehlung)',          kpiDelta: { bankTrust: +2, workforceEngagement: -1 } },
{ id: 'c', label: 'Vage Ziele, nicht festlegen',                                     kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Keine Ziele (nur Beobachtung)',                  kpiDelta: { bankTrust: -2 } }],
  attachments: ['d12_cfo_working_capital_targets.pptx']
  }];

// NEU (5. CFO-Block – ohne Kürzung der Originale)
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D12-CFO-5',
  day: 12,
  role: 'CFO',
  title: 'Term-Sheet & Covenant-Trigger final festzurren',
  context: 'Im Review adressierte Trigger (Information Rights, Milestones, Fees) müssen vertraglich fixiert werden.',
  dilemma: 'Kosten vs. Flexibilität',
  hiddenAgendaHint: 'Klar definierte, messbare Milestones bei moderater Fee beschleunigen die Freigabe.',
  options: [
    { id: 'a', label: 'Moderate Fee + harte Milestones akzeptieren',      kpiDelta: { bankTrust: +4, profitLossEUR: -4000 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Redlines (leichtere Trigger, gleiche Fee) senden', kpiDelta: { bankTrust: +1 } },
    { id: 'c', label: 'Mehr Linie gegen höhere Fee verhandeln',           kpiDelta: { bankTrust: +3, profitLossEUR: -8000 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'd', label: 'Entscheidung vertagen',                            kpiDelta: { bankTrust: -3 } }
  ],
  attachments: ['d12_cfo_covenant_negotiation_matrix.pdf']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
   id: 'D12-OPS-NEU-1',
  day: 12,
  role: 'OPS',
  title: 'Schichtstabilität vs. Sonderaktionen',
  context: 'In der Produktion häufen sich kurzfristige Kundenanfragen für Sonderchargen. Gleichzeitig ist die Stammbelegschaft durch Krankheitsausfälle belastet, Schichten laufen am Limit.',
  dilemma: 'Kundenanforderungen sofort erfüllen vs. Stabilität der Kernlinien sichern',
  hiddenAgendaHint: 'Bank und Vertrieb achten gleichermaßen auf Liefertreue – operative Stabilität zahlt doppelt.',
  options: [
    {
      id: 'a',
      label: 'Sonderaufträge annehmen und Überstunden fahren',
      kpiDelta: { profitLossEUR: +8000, workforceEngagement: -3, bankTrust: -1, customerLoyalty: +2 },
      variance: 0.8,
      execLeakage: 0.6
    },
    {
      id: 'b',
      label: 'Kernlinien stabil halten, Sonderaufträge ablehnen',
      kpiDelta: { profitLossEUR: -4000, workforceEngagement: +1, bankTrust: +2, customerLoyalty: -1 },
      variance: 0.7,
      execLeakage: 0.5
    },
    {
      id: 'c',
      label: 'Temporäre Fremdkapazität einkaufen (Kosten 10k)',
      kpiDelta: { profitLossEUR: -10000, workforceEngagement: +2, customerLoyalty: +2, bankTrust: +1 },
      variance: 0.9,
      execLeakage: 0.7
    },
    {
      id: 'd',
      label: 'Priorisierungsmatrix mit Vertrieb einführen (1 Tag Verzögerung)',
      kpiDelta: { profitLossEUR: +2000, workforceEngagement: 0, bankTrust: +1, customerLoyalty: +1 },
      variance: 0.6,
      execLeakage: 0.4
    }],
  attachments: ['d12_ops_Kapa.pptx']
  },
{
    id: 'D12-OPS-2',
    day: 12,
    role: 'OPS',
    title: 'Qualitätsinitiative – Wirkung zeigen',
    context: 'Bank fragt nach messbaren Effekten.',
    dilemma: 'Schnelle Kennzahlen vs. echte Nachhaltigkeit',
    hiddenAgendaHint: 'Dokumentierte KPI-Trends stützen Argumentation.',
    options: [{ id: 'a', label: 'Defektrate & Nacharbeit wöchentlich berichten', kpiDelta: { bankTrust: +2, customerLoyalty: +2 } },
{ id: 'b', label: 'Nur interne Reports',                           kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Keine zusätzliche Messung',                     kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Externe QS-Bewertung',                     kpiDelta: { profitLossEUR: -8000, customerLoyalty: +3, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7 }],
  attachments: ['d12_ops_QS.pptx']
  },
{
    id: 'D12-OPS-3',
    day: 12,
    role: 'OPS',
    title: 'Lieferanten – Stabilitätsnachweise',
    context: 'Zwei kritische Lieferanten unter Beobachtung.',
    dilemma: 'Wechselkosten vs. Stabilität',
    hiddenAgendaHint: 'Stabilität ist bankseitig hoch gewichtet.',
    options: [{ id: 'a', label: 'Nachweise anfordern (Kapazität/Qualität)',      kpiDelta: { bankTrust: +1, customerLoyalty: +1 } },
{ id: 'b', label: 'Backup-Lieferant qualifizieren',            kpiDelta: { profitLossEUR: -6000, customerLoyalty: +2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Preis drücken statt Nachweise',                  kpiDelta: { profitLossEUR: +4000, customerLoyalty: -2, publicPerception: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Keine Maßnahme',                                 kpiDelta: { bankTrust: -1 } }],
  attachments: ['d12_ops_supplier_audit_request.docx']
  },
{
    id: 'D12-OPS-4',
    day: 12,
    role: 'OPS',
    title: 'Logistik – Servicelevel feinjustieren',
    context: 'Sonderfahrten häufen sich; Kosten steigen.',
    dilemma: 'Servicegrad vs. Ergebnis',
    hiddenAgendaHint: 'Regeln verhindern Wildwuchs.',
    options: [{ id: 'a', label: 'Express nur bei Pönalen/A-Kunden',               kpiDelta: { profitLossEUR: +2000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Standardisieren (Pauschalen vereinbaren)',       kpiDelta: { profitLossEUR: +1000 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Express stark reduzieren',                        kpiDelta: { profitLossEUR: +4000, customerLoyalty: -2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Express ausweiten (Image)',                       kpiDelta: { profitLossEUR: -9000, customerLoyalty: +3, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7 }],
  attachments: ['d12_ops_logistics_service_level_agreement.pdf']
  }];

// NEU (5. OPS-Block – ohne Kürzung der Originale)
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [{
   id: 'D12-OPS-5-NEU',
  day: 12,
  role: 'OPS',
  title: 'Kritische Maschinenwartung vs. Lieferterminsicherheit',
  context: 'Eine Kernanlage der A-Linie zeigt Warnsignale (Vibration, Temperaturspitzen). Der Hersteller empfiehlt dringend eine außerplanmäßige Wartung. Gleichzeitig drängen A-Kunden auf termingerechte Auslieferung in dieser Woche.',
  dilemma: 'Kurzfristige Lieferfähigkeit vs. Langfristige Betriebssicherheit',
  hiddenAgendaHint: 'Ein kalkulierter, transparenter Stillstand stärkt Vertrauen bei Bank und Kunden mehr als ein ungeplanter Totalausfall.',
  options: [
    {
      id: 'a',
      label: 'Anlage sofort für 24h zur Wartung stoppen (Kosten ca. 7k)',
      kpiDelta: { profitLossEUR: -7000, bankTrust: +2, customerLoyalty: +1, workforceEngagement: +1 },
      variance: 0.8,
      execLeakage: 0.6,
      attachments: ['d12_ops_machine_downtime_report.pdf']
    },
    {
      id: 'b',
      label: 'Wartung ins Wochenende verschieben (Mehrkosten ca. 4k, 2 Tage Risiko)',
      kpiDelta: { profitLossEUR: -4000, customerLoyalty: 0, bankTrust: +1 },
      variance: 0.7,
      execLeakage: 0.5
    },
    {
      id: 'c',
      label: 'Nur minimale Instandhaltung (Schichtteam), keine Vollwartung',
      kpiDelta: { profitLossEUR: -1000, bankTrust: -1, customerLoyalty: -1, workforceEngagement: -2 },
      variance: 0.8,
      execLeakage: 0.7
    },
    {
      id: 'd',
      label: 'Ohne Eingriff durchfahren – Fokus auf Auslieferung',
      kpiDelta: { profitLossEUR: +5000, bankTrust: -3, customerLoyalty: -2 },
      variance: 0.9,
      execLeakage: 0.8
    }
  ]
}];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D12-HRLEGAL-1',
    day: 12,
    role: 'HRLEGAL',
    title: 'Team-Briefing nach Review',
    context: 'Unsicherheiten im Team zu Auflagen und Zielen.',
    dilemma: 'Detailtiefe vs. Überforderung',
    hiddenAgendaHint: 'Konkrete To-dos senken Stress.',
    options: [{ id: 'a', label: 'Kurzbriefing + Q&A + FAQ-Update',                kpiDelta: { workforceEngagement: +4, publicPerception: +1 } },
{ id: 'b', label: 'Nur Führungskräftebriefing',                     kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Kein Briefing',                                  kpiDelta: { workforceEngagement: -3 } },
{ id: 'd', label: 'Motivations-Kampagne (2k)',                      kpiDelta: { cashEUR: -2000, profitLossEUR: -2000, workforceEngagement: +2, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7 }],
  attachments: ['d12_hrlegal_townhall']
  },

{
    id: 'D12-HRLEGAL-2',
    day: 12,
    role: 'HRLEGAL',
    title: 'Compliance – Bankauflagen dokumentieren',
    context: 'Neue/erweiterte Auflagen sind zu verschriftlichen.',
    dilemma: 'Tempo vs. Genauigkeit',
    hiddenAgendaHint: 'Saubere Dokumente verhindern spätere Konflikte.',
    options: [
{ id: 'a', label: 'Entwurf heute, final morgen',                    kpiDelta: { bankTrust: +1 } },
{ id: 'b', label: 'Nur E-Mail-Bestätigung',                         kpiDelta: { bankTrust: -2 } },
{ id: 'c', label: 'Dokumente sofort finalisieren',                  kpiDelta: { bankTrust: +3 } },
      { id: 'd', label: 'Extern prüfen lassen (2k)',                kpiDelta: { cashEUR: -2000, profitLossEUR: -2000, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7 }],
  attachments: ['d12_hrlegal_compliance_covenant_register.xlsx', 'd12_hrlegal_bank_requirements_checklist.pdf']
  },
{
    id: 'D12-HRLEGAL-3',
    day: 12,
    role: 'HRLEGAL',
    title: 'Interne Konflikte – Review-Nachwehen',
    context: 'Einzelne Bereiche fühlen sich überlastet.',
    dilemma: 'Kompensation vs. Produktivität',
    hiddenAgendaHint: 'Wertschätzung + Klarheit.',
    options: [
{ id: 'a', label: 'Überstunden ausgleichen ',            kpiDelta: { cashEUR: -24000, profitLossEUR: -24000, workforceEngagement: +6, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
      { id: 'b', label: 'Anerkennungsprämie  + klare Prioritäten',                kpiDelta: {  cashEUR: -15000, profitLossEUR: -15000, workforceEngagement: +4 } },
{ id: 'c', label: 'Nichts unternehmen',                                   kpiDelta: { workforceEngagement: -3 } },
{ id: 'd', label: 'Stellenausschreibung (langsam)',         kpiDelta: { workforceEngagement: +1, profitLossEUR: -3000 },
  variance: 0.8, 
  execLeakage: 0.7 }],
  attachments: ['d12_hrlegal_workload_assessment_memo.pdf']
  },
{
id: 'D12-HRLEGAL-4',
  day: 12,
  role: 'HRLEGAL',
  title: 'Prozessverbesserungs-Empfehlungen umsetzen',
  context: 'Das Bank-Review hat erhebliche Prozessschwächen aufgezeigt. Das beigefügte Dokument enthält über 20 Vorschläge mit hohem Einsparpotenzial (>500k €/Jahr). Nun gilt es, den Startumfang festzulegen.',
  dilemma: 'Schnelle Quick Wins vs. strategische Breite',
  hiddenAgendaHint: 'Ein fokussierter Einstieg mit sichtbaren Erfolgen stärkt Bankvertrauen und Motivation im Team.',
  options: [
    {id: 'a', label: 'Top-5 Quick Wins sofort starten', kpiDelta: { bankTrust: +2, workforceEngagement: +2, profitLossEUR: -10000 },
      variance: 0.7,
      execLeakage: 0.5
      
    },
    {
      id: 'b',
      label: 'Kurzfristige Verbesserungen (7–30 Tage) anstoßen',
      kpiDelta: { bankTrust: +3, workforceEngagement: +1, profitLossEUR: -35000 },
      variance: 0.7,
      execLeakage: 0.6
    },
    {
      id: 'c',
      label: 'Strukturelle Großprojekte planen (ERP, RPA )',
      kpiDelta: { bankTrust: -1, workforceEngagement: -1, profitLossEUR: -250000 },
      variance: 0.8,
      execLeakage: 0.7
    },
    {
      id: 'd',
      label: 'Keine sofortige Umsetzung – nur Monitoring & Diskussion',
      kpiDelta: { bankTrust: -2, workforceEngagement: -2 }
    }],
  attachments: ['d12_hrlegal_process_improvement_recommendations.docx']
  }];

// NEU (5. HRLEGAL-Block – ohne Kürzung der Originale)
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D12-HRLEGAL-5',
  day: 12,
  role: 'HRLEGAL',
  title: 'Ethik-Hotline: Hinweise aus Woche 2 abschließen',
  context: 'Offene Hinweise sollten dokumentiert und abgeschlossen werden.',
  dilemma: 'Schnelle Schließung vs. Sorgfalt',
  hiddenAgendaHint: 'Kurzprüfung mit sauberem Audit-Trail reduziert Reputationsrisiken.',
  options: [
    { id: 'a', label: 'Hotline-Angebote ausweiten und weiter bekannt machen (3k)',  kpiDelta: { profitLossEUR: -3000, bankTrust: +2, publicPerception: +1,  workforceEngagement: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Interne Prüfung abschließen, sonst nichts unternehmen',                 kpiDelta: { workforceEngagement: -1,  publicPerception: -1  } },
    { id: 'c', label: 'Ohne Ergebnis schließen (Risiko)',            kpiDelta: { workforceEngagement: -2, publicPerception: -1 } },
    { id: 'd', label: 'Ausführliche Dokumentation der Vorgehensweise und Erklärung der Ergebnisse',                    kpiDelta: { bankTrust: +2, publicPerception: +2,  workforceEngagement: +2  },
      variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['d12_hrlegal_ethics_hotline_closure_report.pdf']
}];

export const day12Blocks: DecisionBlock[] = [
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
    /fakten|statement|q\&a|faq|transpar|klar|briefing|faktenbasiert|factsheet|fact\-sheet|memo|townhall/i.test(e.chosenOptionLabel)
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

function hasKpiTransparency(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(kpi.*offenlegen|weekly.*kpi|scorecard|transparenz)/i.test(e.chosenOptionLabel)
  );
}

function hadLOIorCarve(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(loi|teaser|nda|partner|carve\-?out|beteiligung)/i.test(e.chosenOptionLabel)
  );
}

function qsRampUpFocus(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(aql|100.*%.*prüf|qs|containment|qualitätsinitiative|defektrate)/i.test(e.chosenOptionLabel)
  );
}

// src/data/scenario_day_12.ts — NUR den News‑Block ersetzen
export const day12News: DayNewsItem[] = [
  {
    id: 'N12-1',
    day: 12,
    title: 'Bank‑Zwischenprüfung startet',
    source: 'bank',
    severity: 'critical',
    isImportant: true,
    content: 'Review der Waiver‑Meilensteine heute.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const lowBT = lowBankTrust(ctx, 70);

      const ceoOpen      = log.some((e: any) => (e.id === 'D12-CEO-1' || e.decisionId === 'D12-CEO-1') && e.optionId === 'a');
      const ceoModerated = log.some((e: any) => (e.id === 'D12-CEO-1' || e.decisionId === 'D12-CEO-1') && e.optionId === 'd');

      const cfoFullPack  = log.some((e: any) => (e.id === 'D12-CFO-1' || e.decisionId === 'D12-CFO-1') && e.optionId === 'a');
      const cfoShortPack = log.some((e: any) => (e.id === 'D12-CFO-1' || e.decisionId === 'D12-CFO-1') && /b|c/.test(String(e.optionId)));
      const cfoExtVal    = log.some((e: any) => (e.id === 'D12-CFO-1' || e.decisionId === 'D12-CFO-1') && e.optionId === 'd')
                        || log.some((e: any) => (e.id === 'D10-CFO-1' || e.decisionId === 'D10-CFO-1') && e.optionId === 'd');

      const termSheetOk  = log.some((e: any) => (e.id === 'D11-CFO-5' || e.decisionId === 'D11-CFO-5' || e.id === 'D12-CFO-5' || e.decisionId === 'D12-CFO-5') && /a|c/.test(String(e.optionId)));
      const termSheetRL  = log.some((e: any) => (e.id === 'D11-CFO-5' || e.decisionId === 'D11-CFO-5' || e.id === 'D12-CFO-5' || e.decisionId === 'D12-CFO-5') && e.optionId === 'b');

      let s = 'Die Bank eröffnet die Zwischenprüfung mit Fokus auf Milestone‑Erfüllung, Forecast‑Sensitivitäten sowie Zahlungsdisziplin gegenüber kritischen Lieferanten. ';
      s += lowBT
        ? 'Die Gesprächsführung ist pointiert: Ohne klare Nachweise drohen intensivere Informationsrechte und engere Trigger. '
        : 'Die Tonalität ist konstruktiv: Fortschritte werden anerkannt, belastbare Evidenz bleibt jedoch Voraussetzung. ';
      if (ceoOpen)      s += 'Der offene CEO‑Auftritt (Lücken + Next Steps mit Ownern) wirkt vertrauensbildend. ';
      if (ceoModerated) s += 'Die externe Moderation strukturiert das Gespräch, Zahlen müssen dennoch sitzen. ';
      if (cfoFullPack)  s += 'Pluspunkt: Ein Detailpack mit Executive Summary liegt vor. ';
      if (cfoShortPack) s += 'Hinweis: Die Kurzfassung dürfte Rückfragen zu Downside‑Szenarien auslösen. ';
      if (cfoExtVal)    s += 'Die externe Plausibilisierung nimmt Druck aus der Zahlen‑Debatte. ';
      if (termSheetOk)  s += 'Ein vorab abgestimmtes Term Sheet (inkl. Trigger) schafft Klarheit über Spielregeln. ';
      if (termSheetRL)  s += 'Zu Redlines erwartet die Bank eine kurze Begründung. ';
      s += 'Empfehlung: Statusampeln aktualisieren, Owner/Termine sichtbar machen und ein 48‑Stunden‑Follow‑up an Bank/Beirat zusagen.';
      return s.trim();
    }
  },
  {
    id: 'N12-2',
    day: 12,
    title: 'Kunden beobachten aufmerksam',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Key Accounts erwarten rasche Einordnung noch am selben Tag.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const transparent = choseCommTransparent(ctx);
      const mish = mishandledComm(ctx);

      const sameDayComms = log.some((e: any) => (e.id === 'D12-CEO-3' || e.decisionId === 'D12-CEO-3') && e.optionId === 'a');
      const internalFirst = log.some((e: any) => (e.id === 'D12-CEO-3' || e.decisionId === 'D12-CEO-3') && e.optionId === 'b');
      const onlyPR        = log.some((e: any) => (e.id === 'D12-CEO-3' || e.decisionId === 'D12-CEO-3') && e.optionId === 'c');
      const plan48h       = log.some((e: any) => (e.id === 'D12-CEO-5' || e.decisionId === 'D12-CEO-5') && e.optionId === 'a');

      let s = 'Mehrere Key Accounts kündigen an, Entscheidungen zu Verlängerungen vom heutigen Review‑Ausgang abhängig zu machen. Eine zeitnahe, konsistente Einordnung wird explizit erbeten. ';
      if (transparent)  s += 'Ihre faktenbasierte Linie erzeugt Vertrauenskredit; Kunden sind bereit, kurzfristig zu verlängern, sofern die nächsten KPIs sichtbar sind. ';
      if (mish)         s += 'Nach jüngsten Unschärfen wird eine belastbare Darstellung gefordert; vage Aussagen würden aktuell als Warnsignal gelten. ';
      if (sameDayComms) s += 'Der geplante Townhall‑/Kundenbrief am selben Tag passt zur Erwartungslage. ';
      if (internalFirst) s += 'Ein internes Vorab‑Memo ist hilfreich, sollte aber innerhalb von 24 h um eine Kundenfassung ergänzt werden. ';
      if (onlyPR)       s += 'Eine reine PM reicht den Key Accounts selten; konkrete SLAs und Lieferpläne sind gefragt. ';
      if (plan48h)      s += 'Der abgestimmte 48‑Stunden‑Fahrplan (Bank/Beirat/Kunden/Lieferanten) reduziert Spekulation. ';
      s += 'Empfehlung: Direkt nach dem Review ein kompaktes Kunden‑Fact‑Sheet versenden und einen 20‑Minuten‑Q&A‑Slot anbieten.';
      return s.trim();
    }
  },
  {
    id: 'N12-3',
    day: 12,
    title: 'Branchenblog spekuliert über Carve‑out',
    source: 'press',
    severity: 'medium',
    isImportant: false,
    content: 'Artikel thematisiert mögliche Portfolio‑Maßnahmen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const hadOptions  = hadLOIorCarve(ctx);
      const coScreening = log.some((e: any) => (e.id === 'D12-CEO-4' || e.decisionId === 'D12-CEO-4') && e.optionId === 'a');
      const coInternal  = log.some((e: any) => (e.id === 'D12-CEO-4' || e.decisionId === 'D12-CEO-4') && e.optionId === 'b');
      const coPublic    = log.some((e: any) => (e.id === 'D12-CEO-4' || e.decisionId === 'D12-CEO-4') && e.optionId === 'd');

      let s = 'Ein Branchenblog diskutiert, ob Teilbereiche zur Kapitalfreisetzung veräußert werden könnten. Bezug genommen wird auf Bankauflagen und frühere Marktgerüchte. ';
      if (coPublic)    s += 'Ein öffentliches Andeuten erhöht die Angriffsfläche; kontrollierte Botschaften sind jetzt essenziell. ';
      if (coScreening) s += 'Das beauftragte Screening (1–2 Bereiche) bleibt unter NDA und liefert faktenbasierte Antworten ohne Unruhe zu stiften. ';
      if (coInternal)  s += 'Eine interne Vorprüfung ohne externe Spuren ist hilfreich, muss aber sauber dokumentiert sein. ';
      if (!coScreening && !coInternal && hadOptions) s += 'Da intern bereits Optionen sondiert wurden, lässt sich ein nicht‑präjudizierendes Statement vorbereiten. ';
      s += 'Empfehlung: Kurzes Q&A mit Rahmen (keine Zahlen), operative Stabilität betonen und Medienanfragen bündeln.';
      return s.trim();
    }
  },
  {
    id: 'N12-4',
    day: 12,
    title: 'Team fragt nach Ziele‑Korridoren',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    content: 'Erwartungen an klare WC‑Zielkorridore kommuniziert.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const trans = hasKpiTransparency(ctx);
      const cfoTargets = log.find((e: any) => (e.id === 'D12-CFO-4' || e.decisionId === 'D12-CFO-4'));

      let s = 'Aus mehreren Bereichen kommt die Nachfrage nach konkreten Zielkorridoren für DSO/DPO/DIO, um Beiträge zum Waiver messbar zu steuern. ';
      s += trans
        ? 'Da KPI‑Transparenz bereits etabliert ist, kann die Konkretisierung zügig erfolgen; die Eigensteuerung steigt. '
        : 'Ohne vorhandene KPI‑Transparenz ist die Festlegung der Korridore der nächste sinnvolle Schritt. ';
      if (cfoTargets?.optionId === 'a') s += 'Der Vorschlag „ambitioniert, aber realistisch" trifft die Stimmung im Team. ';
      if (cfoTargets?.optionId === 'b') s += 'Sehr ambitionierte Korridore motivieren, bergen aber Verfehlungsrisiken – Kommunikation wichtig. ';
      if (cfoTargets?.optionId === 'c' || cfoTargets?.optionId === 'd') s += 'Vage oder fehlende Ziele würden intern als Schwäche gewertet. ';
      s += 'Empfehlung: 30/60‑Tage‑Korridore definieren, im Weekly sichtbar tracken und Abweichungen kurz kommentieren.';
      return s.trim();
    }
  },

  // Kontextmeldungen (je 1 pro Rolle)
  {
    id: 'N12-5',
    day: 12,
    title: 'Review‑Feedback: CEO‑Auftritt überzeugt – Nachweise nachreichen',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content: 'Die Bank bewertet Ton und Klarheit positiv; bittet um zwei Downside‑Szenarien.',
    expandedText: (ctx: any) => {
      const lowBT = lowBankTrust(ctx, 70);
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const ceoOpen      = log.some((e: any) => (e.id === 'D12-CEO-1' || e.decisionId === 'D12-CEO-1') && e.optionId === 'a');
      const ceoProgress  = log.some((e: any) => (e.id === 'D12-CEO-1' || e.decisionId === 'D12-CEO-1') && e.optionId === 'b');
      const ceoVague     = log.some((e: any) => (e.id === 'D12-CEO-1' || e.decisionId === 'D12-CEO-1') && e.optionId === 'c');
      const cfoFullPack  = log.some((e: any) => (e.id === 'D12-CFO-1' || e.decisionId === 'D12-CFO-1') && e.optionId === 'a');
      const cfoExtVal    = log.some((e: any) => (e.id === 'D12-CFO-1' || e.decisionId === 'D12-CFO-1') && e.optionId === 'd');

      let s = 'Im direkten Feedback lobt die Bank den sachlichen Auftritt der Geschäftsführung, fordert jedoch zusätzliche Sensitivitäten (Lieferverzug, Preisabschläge) bis übermorgen. ';
      if (ceoOpen)     s += 'Die klare Benennung von Lücken + Next Steps kam gut an. ';
      if (ceoProgress) s += 'Das Betonen der Fortschritte war hilfreich, braucht aber harte Evidenz. ';
      if (ceoVague)    s += 'Vage Passagen führten zu Rückfragen – die Sensitivitäten werden umso wichtiger. ';
      if (cfoFullPack) s += 'Das Detailpack bildet eine solide Basis für die Nachreichung. ';
      if (cfoExtVal)   s += 'Die externe Validierung stützt die Glaubwürdigkeit. ';
      s += lowBT
        ? 'Die Frist ist straff; ein unvollständiges Paket würde als Steuerungsschwäche ausgelegt. '
        : 'Die Nachforderung gilt als formale Abrundung; die Linie bleibt konstruktiv. ';
      s += 'Empfehlung: Sensitivitäten ergänzen und Meilenstein‑Owner mit Terminverantwortung benennen.';
      return s.trim();
    }
  },
  {
    id: 'N12-6',
    day: 12,
    title: 'CFO: Zielkorridore vorläufig abgestimmt',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Vorabkorridore für DSO/DPO/DIO mit Banksprachregelung skizziert.',
    expandedText: (ctx: any) => {
      const trans = hasKpiTransparency(ctx);
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const opt = log.find((e: any) => (e.id === 'D12-CFO-4' || e.decisionId === 'D12-CFO-4'))?.optionId;

      let s = 'Der CFO skizziert vorläufige Zielkorridore (30/60 Tage) und schlägt eine abgestimmte Sprachregelung für Bank und Team vor. ';
      s += trans
        ? 'Durch die bestehende KPI‑Transparenz ist die Akzeptanz hoch; die Teams erwarten klare Verantwortlichkeiten je Kennzahl. '
        : 'Ohne etablierte Transparenz ist eine kurze Einführungsphase sinnvoll; einfache Dashboards fördern die Akzeptanz. ';
      if (opt === 'a') s += 'Die Mischung aus Ambition und Realismus gilt als tragfähig. ';
      if (opt === 'b') s += 'Sehr ambitionierte Werte motivieren, bergen aber Verfehlungsrisiken – Eskalationspfad definieren. ';
      if (opt === 'c' || opt === 'd') s += 'Vage/fehlende Ziele würden das Bankvertrauen eher schwächen. ';
      s += 'Empfehlung: Ziele im Weekly veröffentlichen und Abweichungen täglich kurz kommentieren.';
      return s.trim();
    }
  },
  {
    id: 'N12-7',
    day: 12,
    title: 'OPS: Ramp‑up nur mit zusätzlicher Prüftiefe realisierbar',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'QS meldet Engpass; A‑Linien benötigen temporäres Containment.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const freeze100 = log.some((e: any) => (e.id === 'D12-OPS-5' || e.decisionId === 'D12-OPS-5') && e.optionId === 'a');
      const aqlPlan   = log.some((e: any) => (e.id === 'D12-OPS-5' || e.decisionId === 'D12-OPS-5') && e.optionId === 'b');

      let s = 'OPS und QS berichten, dass der geplante Ramp‑up ohne temporär erhöhte Prüftiefe ein erhöhtes Reklamationsrisiko birgt. ';
      if (freeze100) s += 'Das 72‑Stunden‑Containment (100‑%‑Prüfung auf A‑Linien) ist vorbereitet und kurzfristig umsetzbar. ';
      if (aqlPlan)   s += 'Ein gestufter AQL‑Plan balanciert Risiko und Ressourcen. ';
      s += 'Empfehlung: Containment für A‑Linien befristet freigeben, B‑Linien per Stichprobe, Pönale‑Risiken aktiv managen.';
      return s.trim();
    }
  },
  {
    id: 'N12-8',
    day: 12,
    title: 'HR/Legal: Hotline‑Fall kann vorläufig geschlossen werden',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Die Prüfung ergab keine Pflichtverstöße; Dokumentation wird dem Review‑Paket beigefügt.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const hrCloseDoc  = log.some((e: any) => (e.id === 'D12-HRLEGAL-5' || e.decisionId === 'D12-HRLEGAL-5') && e.optionId === 'd');
      const hrExpand    = log.some((e: any) => (e.id === 'D12-HRLEGAL-5' || e.decisionId === 'D12-HRLEGAL-5') && e.optionId === 'a');
      const forensicAny = log.some((e: any) =>
        /(D11-HRLEGAL-5|D07-HRLEGAL-5|D10-HRLEGAL-2)/.test(String(e.id || e.decisionId)) &&
        /(forensic|prüfung|check)/i.test(String(e.chosenOptionLabel || e.choiceLabel || e.label || '')));

      let s = 'Der jüngste Hotline‑Hinweis zu „Sonderfreigaben" wurde geprüft; es fanden sich keine Pflichtverstöße, jedoch Prozesshinweise. ';
      if (forensicAny) s += 'Die dokumentierte Forensic‑Light‑Prüfung stützt die Nachvollziehbarkeit. ';
      if (hrCloseDoc)  s += 'Eine ausführliche Abschlussdokumentation macht den Audit‑Trail sichtbar. ';
      if (hrExpand)    s += 'Die Ausweitung der Hotline‑Angebote stärkt das Vertrauensumfeld. ';
      s += 'Empfehlung: Abschlussnotiz ins Review‑Pack, Lessons Learned in Leitlinien übertragen und BR‑Info synchronisieren.';
      return s.trim();
    }
  },

  // Füllmeldungen (ohne KPI‑Wirkung)
  { id: 'N12-F1', day: 12, title: 'E‑Mail‑Gateway: kurzes Greylisting aktiv', source: 'internal', severity: 'low', isImportant: false, content: 'Die IT meldet ein vorübergehendes Greylisting für externe E‑Mails bis 11:30 Uhr; Zustellungen können sich leicht verzögern.', suppressHints: true },
  { id: 'N12-F2', day: 12, title: 'Parkdeck B teilweise gesperrt',          source: 'internal', severity: 'low', isImportant: false, content: 'Aufgrund einer Sensorprüfung ist die zweite Ebene des Parkdecks B heute bis 16:00 Uhr gesperrt; bitte alternativ Parkdeck C nutzen.', suppressHints: true },
  { id: 'N12-F3', day: 12, title: 'Smartcards: Re‑Initialisierung',         source: 'internal', severity: 'low', isImportant: false, content: 'Zehn Mitarbeiterausweise müssen neu initialisiert werden; der Empfang informiert die betroffenen Personen direkt.', suppressHints: true },
  { id: 'N12-F4', day: 12, title: 'Heizkreis‑Kalibrierung Gebäude A',       source: 'internal', severity: 'low', isImportant: false, content: 'Die Haustechnik kalibriert heute Nachmittag den Heizkreis in Gebäude A; kurzzeitig kann es zu Temperaturabweichungen kommen.', suppressHints: true }
];
