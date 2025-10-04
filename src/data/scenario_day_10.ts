// src/data/scenario_day_10.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

/**
 * TAG 10 — 20 Entscheidungsblöcke (je 5 pro Rolle)
 * Fokus: Umsetzung Waiver-Auflagen, Bank-Zwischenprüfung, Kunden-/Lieferantenvertrauen, interne Ressourcenkonflikte
 * Hinweis: Bestehende 16 Blöcke bleiben unverändert; je Rolle wird ein 5. Block ergänzt (Folge aus Tag 9).
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D10-CEO-1',
    day: 10,
    role: 'CEO',
    title: 'Bank-Zwischenprüfung vorbereiten',
    context: 'Bank will in 48h Fortschritt zu Waiver-Meilensteinen sehen.',
    dilemma: 'Maximale Transparenz vs. taktisches Zurückhalten',
    hiddenAgendaHint: 'Erfüllte Punkte betonen, kritische in Arbeit darstellen.',
    options: [{ id: 'a', label: 'Vollständiger Status inkl. Risiken',              kpiDelta: { bankTrust: +4 } },
{ id: 'b', label: 'Nur erfüllte Milestones zeigen',                   kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Status verschieben, mehr Zeit gewinnen',           kpiDelta: { bankTrust: -3 } },
{ id: 'd', label: 'Externe Präsentation erstellen lassen',       kpiDelta: {cashEUR: -5000, profitLossEUR: -5000, bankTrust: +6 },
  variance: 0.8, 
  execLeakage: 0.7}]
  ,
  attachments: ['d10_ceo_bank_zwischenpruefung_briefing_tag10.pdf']
  },
{
    id: 'D10-CEO-2',
    day: 10,
    role: 'CEO',
    title: 'Partnerschaftsgespräch vertiefen',
    context: 'Industriepartner erwartet Entscheidung zu LOI.',
    dilemma: 'Frühe Bindung vs. mehr Bedenkzeit',
    hiddenAgendaHint: 'Signal an Bank und Markt, ohne Flexibilität zu verlieren.',
    options: [{ id: 'a', label: 'LOI mit Ausstiegsklausel unterzeichnen',           kpiDelta: { bankTrust: +2, publicPerception: +1,
       workforceEngagement: -1 },
  isTradeOff: true },
{ id: 'b', label: 'Nur Absichtserklärung per E-Mail',                 kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Entscheidung um 7 Tage verschieben',               kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Kooperation ablehnen',                             kpiDelta: { bankTrust: -2, publicPerception: -1,  workforceEngagement: +1 } }]
  ,
  attachments: ['d10_ceo_loi_gespraechsleitfaden_tag10.pdf']
  },
{
    id: 'D10-CEO-3',
    day: 10,
    role: 'CEO',
    title: 'Krisen-OKR Review durchführen',
    context: 'Nach 48h erste Auswertung der OKR aus Tag 9.',
    dilemma: 'Erfolge feiern vs. Lücken kaschieren',
    hiddenAgendaHint: 'Offenheit erhöht Engagement.',
    options: [
{ id: 'a', label: 'Nur Kernteam einbeziehen',                          kpiDelta: { workforceEngagement: +2 } },
      { id: 'b', label: 'Review mit allen Rollen offen durchführen',        kpiDelta: { workforceEngagement: +4, bankTrust: +2 },
  isTradeOff: true },
{ id: 'c', label: 'Review auf nächste Woche verschieben',              kpiDelta: { workforceEngagement: -1 } },
{ id: 'd', label: 'Nur schriftliche Auswertung',                       kpiDelta: { workforceEngagement: +1 } }]
  ,
  attachments: ['d10_ceo_okr_review_agenda_tag10.pdf']
  },
{
    id: 'D10-CEO-4',
    day: 10,
    role: 'CEO',
    title: 'Öffentliche Zwischenbilanz',
    context: 'Medien fragen nach erstem Eindruck der Restrukturierung.',
    dilemma: 'Positive PR vs. realistische Vorsicht',
    hiddenAgendaHint: 'Konsistenz mit Bank- und Kundenkommunikation.',
    options: [
{ id: 'a', label: 'Optimistische PM ohne Zahlen',                      kpiDelta: { publicPerception: +2, bankTrust: -1 } },
{ id: 'b', label: 'Nur ausgewählten Medien antworten',                  kpiDelta: { publicPerception: +1 } },
{ id: 'c', label: 'Faktenbasierte PM mit Kernfortschritten',           kpiDelta: { publicPerception: +3, bankTrust: +2 } },
      { id: 'd', label: 'Keine Stellungnahme',                                kpiDelta: { publicPerception: -2 } }]
  ,
  attachments: ['d10_ceo_pm_zwischenbilanz_entwurf_tag10.pdf']
  }];

// NEU (5. CEO-Block – Folge Tag 9: Medien-Nachlauf & Stakeholder-Alignment)
const CEO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D10-CEO-5',
  day: 10,
  role: 'CEO',
  title: 'Stakeholder-Roadshow vor Zwischenprüfung',
  context: 'Nach Waiver-Meeting und öffentlicher Debatte (Qualität) Erwartungsmanagement bei Bank/Kernkunden.',
  dilemma: 'Gezielte Aufklärung vs. Risiko zusätzlicher Angriffsflächen',
  hiddenAgendaHint: 'Kurze, faktenbasierte Touchpoints stabilisieren Vertrauen ohne Überkommunikation.',
  options: [
    { id: 'a', label: 'Roadshow: Bank & 5 Kernkunden (Slots je 20 Min.)', kpiDelta: { bankTrust: +2, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur Bank-Briefing mit CFO',                        kpiDelta: { bankTrust: +2 } },
    { id: 'c', label: 'Nur Social-Monitoring, keine Proaktivität',        kpiDelta: { publicPerception: -1, workforceEngagement: -1 } },
    { id: 'd', label: 'Breite Presseansprache statt Stakeholder-Fokus',   kpiDelta: { publicPerception: +2, bankTrust: -2 } }
  ]
,
  attachments: ['d10_ceo_stakeholder_roadshow_briefing_tag10.pdf']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D10-CFO-1',
    day: 10,
    role: 'CFO',
    title: 'Waiver-Reporting erstellen',
    context: 'Bank erwartet Zahlenupdate vor Zwischenprüfung.',
    dilemma: 'Detailtiefe vs. Ressourcenbindung',
    hiddenAgendaHint: 'Genaue Daten erhöhen Glaubwürdigkeit.',
    options: [{ id: 'a', label: 'Vollständiges Reporting mit Forecast',              kpiDelta: { bankTrust: +5 } },
{ id: 'b', label: 'Nur Ist-Zahlen liefern',                            kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Nur KPI-Ausschnitte teilen',                        kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Extern erstellen lassen',                      kpiDelta: { cashEUR: -4000, profitLossEUR: -4000, bankTrust: +3 },
  variance: 0.8, 
  execLeakage: 0.7}]
  ,
  attachments: ['d10_cfo_waiver_reporting_package_tag10.xlsx']
  },
{
    id: 'D10-CFO-2',
    day: 10,
    role: 'CFO',
    title: 'Übernahmeangebot bewerten',
    context: 'CEO gibt Offernte zur Prüfung.',
    dilemma: 'Finanzierungsoptzion vs. Einfluss',
    hiddenAgendaHint: 'Liquidität halten, ohne externen Investor aufzunehmen.',
    options: [{ id: 'a', label: 'CEO anderweitige Zwischenfinanzierung präsentieren',                kpiDelta: { bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'b', label: 'Beteiligung in Höhe von 5 % unterstützten',                       kpiDelta: { bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'c', label: 'Hinhaltende Prüfung',                              kpiDelta: { bankTrust: -4 } },
{ id: 'd', label: 'Aufnahme einer Zwischenfinanzierung für 3 Monate',                                        kpiDelta: { cashEUR: +100000, profitLossEUR: -3750, bankTrust: -1} }]
  ,
  attachments: ['d10_cfo_zwischenfinanzierung_vs_beteiligung_memorandum_tag10.pdf']
  },
{
    id: 'D10-CFO-3',
    day: 10,
    role: 'CFO',
    title: 'Lieferanten-Zahlungsplan anpassen',
    context: 'Eingangszahlen niedriger als prognostiziert.',
    dilemma: 'Härte vs. Lieferfähigkeit',
    hiddenAgendaHint: 'Engpasslieferanten bevorzugen.',
    options: [ 
{ id: 'a', label: 'Alle gleich behandeln',                               kpiDelta: { bankTrust: +1 } },
{ id: 'b', label: 'Nur A-Lieferanten bedienen',                          kpiDelta: { customerLoyalty: -2 } },
                                     { id: 'c', label: 'Plan nach DB & Kritikalität neu ordnen',              kpiDelta: { bankTrust: +2, customerLoyalty: +1 }},
{ id: 'd', label: 'Zahlungen pausieren, Bank informieren',               kpiDelta: { bankTrust: +3, customerLoyalty: -3 } }]
  ,
  attachments: ['d10_cfo_ap_zahlungsplan_priorisierung_playbook_tag10.pdf']
  },
{
    id: 'D10-CFO-4',
    day: 10,
    role: 'CFO',
    title: 'Controlling-Update für OKR',
    context: 'Finanz-OKR aus Tag 9 brauchen neue Zahlen.',
    dilemma: 'Schnelligkeit vs. Tiefe',
    hiddenAgendaHint: 'OKR-Zahlen stützen Bank- und Teamvertrauen.',
    options: [{ id: 'a', label: 'Tagesaktuelles Update liefern, System ausbauen',                       kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, bankTrust: +3, workforceEngagement: +1} },
{ id: 'b', label: 'Nur wöchentliche Zahlen',                              kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Kein Update',                                          kpiDelta: { bankTrust: -1 , workforceEngagement: -1} },
{ id: 'd', label: 'Externe Validierung',                             kpiDelta: {  cashEUR: -2000, profitLossEUR: -2000, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7}]
  ,
  attachments: ['d10_cfo_controlling_okr_update_brief_tag10.pdf']
  }];

// NEU (5. CFO-Block – Folge Tag 9: Bridge gezogen & Reporting operationalisiert)
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D10-CFO-5',
  day: 10,
  role: 'CFO',
  title: 'Bridge-Liquidität allokieren & Reporting-Takt fixieren',
  context: 'Nach Entscheidung zu Zwischenlinie/Top-up (Tag 9) Verteilung auf Payroll, P1-Lieferanten und WIP-Expedite festlegen.',
  dilemma: 'Kurze Wirkung im Cash vs. nachhaltige Stabilisierung',
  hiddenAgendaHint: 'Transparenter Allokationsschlüssel + Daily-Snapshot stärken Bank- und Kundenvertrauen.',
  options: [
    { id: 'a', label: '50k P1-Lieferanten / 30k Payroll-Puffer / 20k WIP-Expedite', kpiDelta: { customerLoyalty: +2, bankTrust: +1 } },
    { id: 'b', label: '70k P1-Lieferanten / 30k WIP, kein Payroll-Puffer',          kpiDelta: { customerLoyalty: +3, workforceEngagement: -1 } },
    { id: 'c', label: 'Nur Payroll-Puffer priorisieren (80k)',                      kpiDelta: { workforceEngagement: +2, customerLoyalty: -1 } },
    { id: 'd', label: 'Allokation vertagen, wöchentlich entscheiden',               kpiDelta: { bankTrust: -2 } }
  ]
,
  attachments: ['d10_cfo_bridge_liquiditaet_allokation_note_tag10.pdf']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D10-OPS-1',
    day: 10,
    role: 'OPS',
    title: 'Produktionsplan für kritische Aufträge',
    context: 'Neue Liefertermine von A-Kunden.',
    dilemma: 'Pünktlichkeit vs. Kosten',
    hiddenAgendaHint: 'Termintreue stützt Kundenbindung.',
    options: [{ id: 'a', label: 'Sonderschicht einlegen ',                          kpiDelta: { cashEUR: 8000, profitLossEUR: 8000, customerLoyalty: +4,  workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Standardplan halten',                                  kpiDelta: { customerLoyalty: -1 } },
{ id: 'c', label: 'Aufträge priorisieren',                                kpiDelta: { customerLoyalty: +2 } },
{ id: 'd', label: 'Aufträge ablehnen',                                     kpiDelta: { customerLoyalty: -5,  workforceEngagement: -1 } }]
  ,
  attachments: ['d10_ops_produktionsplan_kritische_auftraege_tag10.pdf']
  },
{
    id: 'D10-OPS-2',
    day: 10,
    role: 'OPS',
    title: 'Qualitätsinitiative fortführen',
    context: 'Audit aus Tag 9 hat Lücken gezeigt.',
    dilemma: 'Schnelle Korrektur vs. umfassende Lösung',
    hiddenAgendaHint: 'Kundenvertrauen durch Qualität.',
    options: [{ id: 'a', label: 'Sofortmaßnahmen umsetzen',                        kpiDelta: {cashEUR: -5000, profitLossEUR: -5000, customerLoyalty: +3 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Nur dringende Punkte angehen',                          kpiDelta: { customerLoyalty: +1, workforceEngagement: 0 } },
{ id: 'c', label: 'Alles vertagen',                                        kpiDelta: { customerLoyalty: -2, workforceEngagement: -1  } },
{ id: 'd', label: 'Externe QS für 3 Monate',                         kpiDelta: { cashEUR: 15000, profitLossEUR: -15000, customerLoyalty: +5, workforceEngagement: -1  },
  variance: 0.8, 
  execLeakage: 0.7}]
  ,
  attachments: ['d10_ops_qualitaetsinitiative_kurzprogramm_tag10.pdf']
  },
{
    id: 'D10-OPS-3',
    day: 10,
    role: 'OPS',
    title: 'Lagerbestände neu bewerten',
    context: 'Bestandswerte zu hoch bewertet.',
    dilemma: 'Abwertung vs. Bilanzbild',
    hiddenAgendaHint: 'Selektive Maßnahmen signalisieren Kontrolle.',
    options: [{ id: 'a', label: 'Abwertung von C-Teilen',                           kpiDelta: { profitLossEUR: -6000, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Abverkauf mit 10 % Abschlag',                           kpiDelta: { cashEUR: +20000, profitLossEUR: -6000, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'c', label: 'Keine Änderung',                                        kpiDelta: { bankTrust: -3 } },
{ id: 'd', label: 'Verwertung als B-Ware',                                    kpiDelta: { cashEUR: +25000, profitLossEUR: +15000, bankTrust: 0, customerLoyalty: -4  } }]
  ,
  attachments: ['d10_ops_bestandsbewertung_aktionsmemo_tag10.pdf']
  },
{
    id: 'D10-OPS-4',
    day: 10,
    role: 'OPS',
    title: 'Lieferanten-Review durchführen',
    context: 'Nach Waiver-Plan Anpassung der Partnerliste.',
    dilemma: 'Stabilität vs. Einsparung',
    hiddenAgendaHint: 'Langfristige Partnerbeziehungen wahren.',
    options: [{ id: 'a', label: 'Top-Partner halten, andere streichen',                  kpiDelta: { customerLoyalty: +2, bankTrust: +1 } },
{ id: 'b', label: 'Alle neu bewerten',                                     kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Kostensenkung vor Stabilität',                          kpiDelta: { bankTrust: +1, customerLoyalty: -2 } },
{ id: 'd', label: 'Partnerpool erweitern, Investition in Partnerschaft',                                 kpiDelta: { customerLoyalty: +3, cashEUR: -5000, profitLossEUR: -5000 },
  variance: 0.8, 
  execLeakage: 0.7}]
  ,
  attachments: ['d10_ops_lieferanten_review_briefing_tag10.pdf']
  }];

// NEU (5. OPS-Block – Folge Tag 9: Serienstart-Check & Ressourcenplanung)
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D10-OPS-5',
  day: 10,
  role: 'OPS',
  title: 'Serienstart-Ressourcen nach Pilotcharge',
  context: 'Nach erfolgreichem Pilotlauf (Tag 9) Kapazitäten für gestuften Ramp-up festlegen.',
  dilemma: 'Schneller Hochlauf vs. Qualitätssicherung',
  hiddenAgendaHint: 'Gestufte Freigabe mit Containment-Plan minimiert Reklamationsrisiko.',
  options: [
    { id: 'a', label: 'Ramp-up in 3 Stufen mit 100%-Prüfung (Woche 1-2)', kpiDelta: { customerLoyalty: +3, profitLossEUR: -8000 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Sofort Vollproduktion mit Stichproben-QS',          kpiDelta: { customerLoyalty: +1, profitLossEUR: +5000 } },
    { id: 'c', label: 'Nur Hauptkunde beliefern, Rest warten',              kpiDelta: { customerLoyalty: -1, bankTrust: +1 } },
    { id: 'd', label: 'Serienstart um 1 Woche verschieben',                 kpiDelta: { customerLoyalty: -2, bankTrust: -1 } }
  ]
,
  attachments: ['d10_ops_serienstart_ressourcen_rampup_tag10.pdf']
}];


const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D10-HRLEGAL-1',
    day: 10,
    role: 'HRLEGAL',
    title: 'Kommunikation Zwischenprüfung',
    context: 'Team fürchtet Konsequenzen bei negativem Bankfeedback.',
    dilemma: 'Offenheit vs. Verunsicherung',
    hiddenAgendaHint: 'Beruhigung mit Fakten.',
    options: [{ id: 'a', label: 'Faktenbasiertes Memo an alle',                          kpiDelta: { workforceEngagement: +3, publicPerception: +1 } },
{ id: 'b', label: 'Nur Führungskräfte informieren',                        kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Keine Info',                                            kpiDelta: { workforceEngagement: -2 } },
{ id: 'd', label: 'Optimismus ohne Fakten',                                kpiDelta: { publicPerception: +1, bankTrust: -1 } }]
  ,
  attachments: ['d10_hrlegal_team_memo_zwischenpruefung_tag10.pdf']
  },
{
    id: 'D10-HRLEGAL-2',
    day: 10,
    role: 'HRLEGAL',
    title: 'Compliance-Check Zwischenschritt',
    context: 'Waiver-Auflagen beinhalten Compliance-Nachweise.',
    dilemma: 'Tempo vs. Gründlichkeit',
    hiddenAgendaHint: 'Präzision beugt Bankrügen vor.',
    options: [{ id: 'a', label: 'Vollprüfung in 48h abschließen',                        kpiDelta: { bankTrust: +3 } },
{ id: 'b', label: 'Nur Hauptpunkte prüfen',                                kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Prüfung auf nächste Woche verschieben',                 kpiDelta: { bankTrust: -2 } },
{ id: 'd', label: 'Extern prüfen lassen ',                             kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7}]
  ,
  attachments: ['d10_hrlegal_compliance_check_zwischenschritt_tag10.pdf']
  },
{
    id: 'D10-HRLEGAL-3',
    day: 10,
    role: 'HRLEGAL',
    title: 'Arbeitszeit-Flexibilisierung',
    context: 'Sonderschichten für kritische Aufträge brauchen Abstimmung.',
    dilemma: 'Flexibilität vs. Arbeitsschutz',
    hiddenAgendaHint: 'Mitbestimmung einbeziehen.',
    options: [{ id: 'a', label: 'Betriebsrat einbeziehen',                              kpiDelta: { workforceEngagement: +2 } },
{ id: 'b', label: 'Nur mit Freiwilligen',                                  kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Standard-Überstunden anordnen',                         kpiDelta: { workforceEngagement: -1 } },
{ id: 'd', label: 'Externe Kapazität nutzen',                              kpiDelta: { cashEUR: -13000, profitLossEUR: -13000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7}]
  ,
  attachments: ['d10_hrlegal_arbeitszeit_flexibilisierung_tag10.pdf']
  },
{
    id: 'D10-HRLEGAL-4',
    day: 10,
    role: 'HRLEGAL',
    title: 'Datenschutz bei Bank-Reporting',
    context: 'Detaillierte Zahlen könnten Personendaten enthalten.',
    dilemma: 'Transparenz vs. Datenschutz',
    hiddenAgendaHint: 'Anonymisierung ist möglich.',
    options: [{ id: 'a', label: 'Daten anonymisieren',                                  kpiDelta: { bankTrust: +2 } },
{ id: 'b', label: 'Nur aggregierte Zahlen',                                kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Vollständige Transparenz',                              kpiDelta: { bankTrust: +3, workforceEngagement: -1 } },
{ id: 'd', label: 'Externe Beratung (2k)',                                 kpiDelta: { cashEUR: -2000, profitLossEUR: -2000, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7}]
  ,
  attachments: []
  }];

// NEU (5. HRLEGAL-Block – Folge Tag 9: Kurzreport/BR & LOI-Absicherung)
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D10-HRLEGAL-5',
  day: 10,
  role: 'HRLEGAL',
  title: 'LOI/NDA & Antitrust-Precheck',
  context: 'Vor Unterzeichnung des LOI mit Industriepartner rechtliche Absicherung sicherstellen.',
  dilemma: 'Schnelligkeit vs. rechtliche Absicherung',
  hiddenAgendaHint: 'Schlanke, robuste Dokumente vermeiden spätere Reputationsschäden.',
  options: [
    { id: 'a', label: 'NDA anpassen + kurzer Kartellrechts-Check',  kpiDelta: { profitLossEUR: -3000, bankTrust: +1, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur interner Review ohne externen Check',         kpiDelta: { bankTrust: 0 } },
    { id: 'c', label: 'Umfassende Due Diligence',                    kpiDelta: { profitLossEUR: -8000, bankTrust: +2 } },
    { id: 'd', label: 'Ohne rechtliche Prüfung fortfahren',               kpiDelta: { bankTrust: -2 } }
  ]
,
  attachments: ['d10_hrlegal_loi_nda_antitrust_precheck_tag10.pdf']
}];

export const day10Blocks: DecisionBlock[] = [
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
    /fakten|statement|q\&a|faq|transpar|klar|briefing|faktenbasiert/i.test(e.chosenOptionLabel)
  );
}

function mishandledComm(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    e.day <= (ctx?.day ?? 99) &&
    typeof e.chosenOptionLabel === 'string' &&
    /(ignorieren|keine weitere kommunikation|optimistisch.*ohne fakten|beschönigen)/i.test(e.chosenOptionLabel)
  );
}

function lowBankTrust(ctx: any, thr: number = 70): boolean {
  const bt = Number(ctx?.kpi?.bankTrust ?? 100);
  return bt < thr;
}

function signsOfPayDelays(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(zahlungsziel|teilzahlung|stunden|zahlung pausieren|skonto|liquidität|payment|vorkasse)/i.test(e.chosenOptionLabel)
  );
}

// src/data/scenario_day_10.ts — NUR den News‑Block ersetzen
export const day10News: DayNewsItem[] = [
  /**
   * Kernmeldungen Tag 10
   */
  {
    id: 'N10-1',
    day: 10,
    title: 'Bank‑Zwischenprüfung angekündigt',
    source: 'bank',
    severity: 'critical',
    isImportant: true,
    content: 'Erste Überprüfung der Waiver‑Meilensteine in 48 Stunden.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, pat: string | RegExp) =>
        log.some((e: any) =>
          (e?.id === id || e?.decisionId === id) &&
          (e?.optionId === pat || (pat instanceof RegExp && pat.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))))
        );

      const lowBT = Number(ctx?.kpi?.bankTrust ?? 100) < 70;
      const waiverTerminiert = picked('D08-CFO-1', 'a') || picked('D07-CFO-2', 'a');
      const auflagenGezeichnet = picked('D06-CEO-1', /zeichnen/i);
      const covBridgeGezeigt = picked('D05-CFO-1', /(bridge|sensitiv|plausibil)/i);
      const dashboardLive = picked('D05-CFO-4', /(daily|weekly|tool)/i) || picked('D09-CFO-5', /(dashboard|kpi)/i);

      let s = 'Die Hausbank kündigt eine Zwischenprüfung in 48 Stunden an. Abgefragt werden Umsetzungsstand je Meilenstein, Rolling‑13‑Week, Sensitivitäten sowie der Status bei Lieferanten‑ und Kundenstabilisierung. ';
      s += lowBT
        ? 'Die Tonalität ist fordernd: Ohne belastbare Nachweise drohen engere Auflagen und zusätzliche Informationsrechte. '
        : 'Der Tenor ist kooperativ: Fortschritte werden anerkannt, dennoch werden klare Belege und ein konsistentes Reporting erwartet. ';
      if (auflagenGezeichnet) s += 'Die Zeichnung des Auflagenbriefs wirkt vertrauensbildend, setzt aber zügige Proof‑Points voraus. ';
      if (waiverTerminiert)  s += 'Positiv: Das Waiver‑Gespräch wurde frühzeitig terminiert und vorbereitet. ';
      if (covBridgeGezeigt)  s += 'Die vorgestellte Covenant‑Bridge mit Sensitivitäten schafft Orientierung für den Pfad bis Quartalsende. ';
      if (dashboardLive)     s += 'Ein KPI‑Dashboard (Daily/Weekly) ist angekündigt bzw. live – bitte Reifegrad kurz im Pack erläutern. ';
      s += 'Empfehlung: Verantwortliche pro Meilenstein benennen, Statusampeln konsistent pflegen und ein 20‑minütiges Pre‑Briefing mit Beirat/CFO ansetzen.';
      return s.trim();
    }
  },
  {
    id: 'N10-2',
    day: 10,
    title: 'Industriepartner drängt auf LOI',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Partner erwartet Entscheidung bis Ende der Woche.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, pat: string | RegExp) =>
        log.some((e: any) =>
          (e?.id === id || e?.decisionId === id) &&
          (e?.optionId === pat || (pat instanceof RegExp && pat.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))))
        );

      const mouVorarbeit = picked('D09-CEO-3', /(mou|loi)/i);
      const commSauber   = !!choseCommTransparent(ctx);
      const qsPfad       = picked('D07-OPS-5', /(100|aql|parallel)/i) || picked('D06-OPS-3', /(containment|100)/i);

      let s = 'Der interessierte Industriepartner bittet um Entscheidung zum LOI bis Ende der Woche. Im Raum stehen Liefer‑ und Entwicklungskooperationen mit Option auf spätere Beteiligung. ';
      if (mouVorarbeit) s += 'Die Vorarbeit (MOU/LOI‑Skizze) erleichtert die Einigung auf Kernklauseln. ';
      s += commSauber
        ? 'Ihre faktenbasierte Kommunikationslinie wird positiv wahrgenommen; eine angemessene Ausstiegsklausel wird als fair angesehen. '
        : 'Nach jüngsten Debatten erwartet der Partner klare Governance und Risikoabschirmung. ';
      if (qsPfad) s += 'Stabile QS‑Pfadentscheidungen (z. B. AQL/100‑%‑Prüfung) stützen die Glaubwürdigkeit in der Anlaufphase. ';
      s += 'Empfehlung: NDA/Antitrust‑Precheck freigeben, Exklusivität/IP präzisieren und Bank über Meilensteinlogik informieren.';
      return s.trim();
    }
  },
  {
    id: 'N10-3',
    day: 10,
    title: 'Qualitätslücken öffentlich diskutiert',
    source: 'press',
    severity: 'medium',
    isImportant: false,
    content: 'Artikel kritisiert Qualitätsprobleme bei Fremdfertigung.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const qsStark = log.some((e: any) =>
        typeof e?.chosenOptionLabel === 'string' &&
        /(100.*%|aql|containment|poka|audit|liaison|serienstart)/i.test(e.chosenOptionLabel)
      );

      let s = 'Ein Branchenblog greift Qualitätsrisiken bei Fremdfertigung auf. Ihr Unternehmen wird im Kontext von Reklamationsvermeidung und Prüfplänen erwähnt. ';
      s += qsStark
        ? 'Ihre jüngsten QS‑Maßnahmen (z. B. 100‑%‑Prüfung, AQL‑Plan, Poka‑Yoke) werden als positives Signal gewertet – der Beitrag bleibt dennoch kritisch. '
        : 'Ohne sichtbare Gegenmaßnahmen bleibt die Berichterstattung skeptisch; belastbare Nachweise zu Prüfpfaden wären hilfreich. ';
      s += 'Empfehlung: Kurzstatement mit Fakten (Reklamationsquote, Prüfpfad, Kundenfreigaben) vorbereiten und internes Q&A bereitstellen.';
      return s.trim();
    }
  },
  {
    id: 'N10-4',
    day: 10,
    title: 'Team wartet auf OKR‑Review',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    content: 'Interne Spannung vor dem Review der Krisen‑OKR.',
    expandedText: (ctx: any) => {
      const we = Number(ctx?.kpi?.workforceEngagement ?? 0);
      const okrBreit = Array.isArray(ctx?.log) && ctx.log.some((e: any) =>
        (e?.id === 'D09-CEO-4' || e?.decisionId === 'D09-CEO-4') &&
        /(rolle|okr|b)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || ''))
      );

      let s = 'Teams bereiten das 48‑Stunden‑Review der Krisen‑OKR vor. Erwartet werden klare Aussagen zu Erfüllungsgrad, Hindernissen und nächsten Schritten. ';
      s += we > 0 ? 'Die Stimmung ist überwiegend konstruktiv; sichtbare Fortschritte motivieren. '
                  : 'Teile des Teams sind verunsichert; ein offener Umgang mit Lücken ist entscheidend. ';
      if (okrBreit) s += 'Das rollenbasierte OKR‑Set aus Tag 9 erleichtert Priorisierung und Messlogik. ';
      s += 'Empfehlung: Kurzagenda und Messbasis vorab teilen, Verantwortlichkeiten je Key Result bestätigen und Blocker transparent adressieren.';
      return s.trim();
    }
  },

  /**
   * Kontextmeldungen (Folge Tag 9 → Tag 10; je eine pro Rolle)
   */
  {
    id: 'N10-5',
    day: 10,
    title: 'Presse fragt nach Zwischenbilanz‑Interview',
    source: 'press',
    severity: 'medium',
    isImportant: true,
    content: 'Regionalzeitung bittet um kurzes Interview zur Lage nach Waiver‑Meeting.',
    expandedText: (ctx: any) => {
      const transparent = !!choseCommTransparent(ctx);
      const mishandled  = !!mishandledComm(ctx);

      let s = 'Die Regionalpresse fragt ein kurzes Interview an: Fortschritt seit Waiver‑Meeting, Qualitätssicherung und Kundenstabilität stehen im Fokus. ';
      s += transparent
        ? 'Mit Ihrer faktenorientierten Linie lassen sich Spekulationen gut eindämmen; Zahlenkorridore statt Punktprognosen werden empfohlen. '
        : mishandled
          ? 'Nach uneinheitlicher Kommunikation ist das Risiko von Spitzfindigkeiten höher; ein schriftliches Format könnte geeigneter sein. '
          : 'Ohne klare Botschaften birgt das Live‑Format Risiken; eine faktenbasierte PM als Alternative ist denkbar. ';
      s += 'Optionen: kurzes, abgestimmtes Gespräch (3 Kernbotschaften) oder Verweis auf eine schriftliche Zwischenbilanz.';
      return s.trim();
    }
  },
  {
    id: 'N10-6',
    day: 10,
    title: 'Zwischenlinie/Top‑up: Term Sheet übermittelt',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content: 'Konditionen und Reporting‑Anforderungen liegen vor.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, opt: string) =>
        log.some((e: any) => (e?.id === id || e?.decisionId === id) && e?.optionId === opt);

      const hatLinie = picked('D09-CFO-5', 'd') || picked('D08-CFO-5', 'a');
      const hatTopUp = picked('D09-CFO-5', 'a') || picked('D08-CFO-5', 'b');
      const dash     = log.some((e: any) =>
        (e?.id === 'D05-CFO-4' || e?.decisionId === 'D05-CFO-4' || e?.id === 'D09-CFO-5') &&
        /(dashboard|daily|weekly|kpi)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))
      );
      const lowBT = Number(ctx?.kpi?.bankTrust ?? 100) < 70;

      let s = 'Für die vereinbarte Zwischenlinie bzw. das Factoring‑Top‑up liegt ein Term Sheet vor. Enthalten sind Gebühren, Covenants und Reporting‑Takt. ';
      s += lowBT ? 'Die Konditionen sind eher streng; eine saubere, tägliche Datenlieferung wird vorausgesetzt. '
                 : 'Die Bedingungen sind angemessen; eine wöchentliche Verdichtung ist möglich, sofern Daily‑Snapshots vorliegen. ';
      if (hatLinie) s += 'Die Zwischenlinie adressiert die Brücke bis Förderbescheid; Covenants bitte transparent dokumentieren. ';
      if (hatTopUp) s += 'Das Top‑up auf A‑Forderungen ist grundsätzlich akzeptiert – Silent‑Assignment beachten. ';
      s += dash ? 'Gut: KPI‑Dashboard ist geplant oder live – Bitte Reifegrad und Verantwortungen im Pack beschreiben.'
               : 'Bitte ein schlankes KPI‑Dashboard kurzfristig aktivieren und Verantwortungen benennen.';
      return s.trim();
    }
  },
  {
    id: 'N10-7',
    day: 10,
    title: 'Serienstart‑Check: Ressourcenplanung',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'OPS meldet Bedarf an zusätzlicher QS‑Zeit für den Serienstart.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const go   = log.some((e: any) => (e?.id === 'D09-OPS-5' || e?.decisionId === 'D09-OPS-5') && /a|b/i.test(String(e?.optionId)));
      const onlyMain = log.some((e: any) => (e?.id === 'D09-OPS-5' || e?.decisionId === 'D09-OPS-5') && /d|c/i.test(String(e?.optionId)));
      const costPush = log.some((e: any) => typeof e?.chosenOptionLabel === 'string' && /(abschlag|kosten|abwertung|skonto|einspar)/i.test(e.chosenOptionLabel));

      let s = 'Für den Serienstart nach Pilotcharge werden zusätzliche QS‑Kapazitäten eingeplant (Stichprobenplan/100‑%‑Prüfung). ';
      if (go)       s += 'Der gestufte Ramp‑up rechtfertigt befristet höhere Prüftiefe. ';
      if (onlyMain) s += 'Ohne Zweitquelle steigt die Abhängigkeit; Containment‑Aufwand ist einzuplanen. ';
      s += costPush
        ? 'Aufgrund Kostendrucks ist die Prüftiefe umstritten; Reklamations‑ und Pönalekosten sollten gegengerechnet werden. '
        : 'Die Mehrstunden erscheinen vertretbar, wenn sie Pönalen und Reklamationen vermeiden. ';
      s += 'Empfehlung: Prüftiefe heute festlegen und A‑Kunden mit Terminkorridor informieren.';
      return s.trim();
    }
  },
  {
    id: 'N10-8',
    day: 10,
    title: 'LOI/NDA: Rückfragen des Partners',
    source: 'customer',
    severity: 'medium',
    isImportant: true,
    content: 'Partner stellt Rückfragen zu Exklusivität und IP‑Rechten.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const legalPrep = log.some((e: any) =>
        (e?.id === 'D10-HRLEGAL-5' || e?.decisionId === 'D10-HRLEGAL-5' || e?.id === 'D09-CEO-3') &&
        /(nda|antitrust|kartell|legal|mou|loi)/i.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))
      );

      let s = 'Zum LOI/NDA treffen zwei Rückfragen ein: Exklusivitätsklausel und IP‑Regelung. Der Partner bittet um rasche Klärung vor dem anvisierten Termin. ';
      s += legalPrep
        ? 'Die Vorarbeit erleichtert die Antwort; eine schlanke Ergänzung zur Exklusivität und eine präzise IP‑Klausel dürften genügen. '
        : 'Ohne vorbereitenden Check steigt das Risiko von Iterationen und Verzögerungen; ein kurzer Antitrust‑Precheck ist empfehlenswert. ';
      s += 'Empfehlung: HR/Legal Freigabe einholen, Antwortmatrix mit CEO/CFO abstimmen, Bank kurz über den Meilenstein informieren.';
      return s.trim();
    }
  },

  /**
   * Füllmeldungen (ohne KPI‑Wirkung; vollständige Sätze; kein Detailfenster)
   */
  { id: 'N10-F1', day: 10, title: 'Zufahrt Nord halbseitig gesperrt', source: 'internal', severity: 'low', isImportant: false, content: 'Wegen kurzfristiger Straßenarbeiten ist die nördliche Werkszufahrt bis 11:00 Uhr nur einspurig befahrbar; die Security regelt den Verkehr.', suppressHints: true },
  { id: 'N10-F2', day: 10, title: 'Spamfilter schärfer eingestellt',   source: 'internal', severity: 'low', isImportant: false, content: 'Die IT hat die Mail‑Filter temporär verschärft; externe Anhänge könnten in der Quarantäne landen und müssen manuell freigegeben werden.', suppressHints: true },
  { id: 'N10-F3', day: 10, title: 'Umschaltung Mittelspannung 22:00',  source: 'internal', severity: 'low', isImportant: false, content: 'Für Wartungsarbeiten wird heute um 22:00 Uhr kurzzeitig auf die Ersatzschiene umgeschaltet; es sind keine Auswirkungen auf die Produktion tagsüber zu erwarten.', suppressHints: true },
  { id: 'N10-F4', day: 10, title: 'Lokalbahn meldet Verspätungen',     source: 'internal', severity: 'low', isImportant: false, content: 'Der regionale Bahnverkehr ist am Morgen eingeschränkt; leichte Verzögerungen beim Schichtwechsel sind möglich.', suppressHints: true }
];
