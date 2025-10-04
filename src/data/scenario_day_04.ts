// src/data/scenario_day_04.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [];
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [];
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [];

/**
 * TAG 4 — 16 Entscheidungsblöcke (je 4 pro Rolle)
 * Eskalation: Banktermin, Zweitbank, Lieferantenstandstill, Pönalen
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D04-CEO-1',
    day: 4,
    role: 'CEO',
    title: 'Banktermin vorbereiten (Tag 5)',
    context: 'Erstes strukturiertes Bankgespräch steht an.',
    dilemma: 'Optimismus vs. Realismus',
    hiddenAgendaHint: '„No surprises" und belastbare Zahlen sind entscheidend.',
    options: [{ id: 'a', label: 'Optimistische Pipeline ohne Belege',                kpiDelta: { bankTrust: -3, publicPerception: +2, workforceEngagement: -1} },
{ id: 'b', label: 'Realistisches Deckblatt + KPI-Bridge + Maßnahmen', kpiDelta: { bankTrust: +4, publicPerception: +2, workforceEngagement: +1 } },
{ id: 'c', label: 'Nur Kurzpräsentation',                              kpiDelta: { bankTrust: +1 } },
{ id: 'd', label: 'Berater übernehmen lassen',                    kpiDelta: { bankTrust: +5, profitLossEUR: -5000, cashEUR: -5000,  workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7,}],
  attachments: ['banktermin_vorbereitung_ceo_tag4.pdf']
  },
{
    id: 'D04-CEO-2',
    day: 4,
    role: 'CEO',
    title: 'Stakeholder-Mapping aktualisieren',
    context: 'Neue Player: BR-Vorsitz, Kreditversicherer, Zweitbank, Presse.',
    dilemma: 'Breite Einbindung vs. Leak-Risiko',
    hiddenAgendaHint: 'Gezielte Botschaften je Stakeholder nötig.',
    options: [{ id: 'a', label: 'Stakeholder-Map + Message House erstellen',          kpiDelta: { publicPerception: +2, bankTrust: +2, workforceEngagement: +1 } },
{ id: 'b', label: 'Nur Bank & Kunden priorisieren',                      kpiDelta: { bankTrust: +4, customerLoyalty: +3, workforceEngagement: -2 } },
{ id: 'c', label: 'Kein Update',                                         kpiDelta: { publicPerception: -1, bankTrust: -2, customerLoyalty: -1, workforceEngagement: -2 } },
{ id: 'd', label: 'Externe PR-Agentur',                             kpiDelta: { cashEUR: -8000, profitLossEUR: -8000, publicPerception: +3, bankTrust: +4, customerLoyalty: +6, workforceEngagement: -3 },
  variance: 0.8, 
  execLeakage: 0.7,}],
  attachments: ['stakeholder_mapping_ceo_tag4.pdf']
  },
{
    id: 'D04-CEO-3',
    day: 4,
    role: 'CEO',
    title: 'S&L-Shortlist entscheiden',
    context: 'Angebote für Sale & Lease-Back eingetroffen',
    dilemma: 'Runway vs. Fixkostenbindung',
    hiddenAgendaHint: 'Bank bewertet gehebte Reserven positiv.',
    options: [{ id: 'a', label: 'Bestes Angebot annehmen',        kpiDelta: { cashEUR: +200000, profitLossEUR: -16000, publicPerception: -1, bankTrust: +2, workforceEngagement: -3  },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1,},
{ id: 'b', label: 'Zweite Runde verhandeln, um bessere Konditionen zu erhalten',                              kpiDelta: { publicPerception: -1, bankTrust: +1, workforceEngagement: -1 } },
{ id: 'c', label: 'Vertagen bis nach Banktermin',                         kpiDelta: { publicPerception: -2, bankTrust: -1, workforceEngagement: +1  } },
{ id: 'd', label: 'S&L verwerfen',                                        kpiDelta: { publicPerception: -3, bankTrust: -3, workforceEngagement: +4  } }],
  attachments: ['sl_shortlist_entscheidung_ceo_tag4.pdf']
  },
{
    id: 'D04-CEO-4',
    day: 4,
    role: 'CEO',
    title: 'Kommunikation an Mitarbeitende vor Banktermin',
    context: 'Gerüchteküche brodelt vor wichtigem Termin.',
    dilemma: 'Offenheit vs. Verunsicherung',
    hiddenAgendaHint: 'Sicherheit und Plan vermitteln.',
    options: [{ id: 'a', label: 'Kurzvideo + FAQ „Was heißt Banktermin?"',             kpiDelta: { workforceEngagement: +4, publicPerception: +1 } },
{ id: 'b', label: 'Nur E-Mail an Führungskräfte',                        kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Keine Kommunikation',                                 kpiDelta: { workforceEngagement: -4, publicPerception: -1 } },
{ id: 'd', label: '„Alles bestens"-Botschaft',                           kpiDelta: { publicPerception: +2, bankTrust: -2, workforceEngagement: -6 } }],
  attachments: ['kommunikation_banktermin_ceo_tag4.pdf']
 },

  ];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D04-CFO-1',
    day: 4,
    role: 'CFO',
    title: 'Lieferanten-Standstill verhandeln',
    context: 'Top-5-Lieferanten fordern energisch Vorkasse.',
    dilemma: 'Cash-Schutz vs. Spannungen',
    hiddenAgendaHint: 'Verbindliche Zahlungsreihenfolge schafft Vertrauen.',
    options: [{ id: 'a', label: '30 Tage Standstill gegen wöchentliches Update',        kpiDelta: { cashEUR: +60000, bankTrust: +3, customerLoyalty: -4 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1,},
{ id: 'b', label: 'Teil-Standstill (nur B/C-Teile-Lieferanten, A voll bedienen)',                         kpiDelta: { cashEUR: +30000, bankTrust: +1, customerLoyalty: -2 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1,},
{ id: 'c', label: 'Kein Standstill, harte Priorisierung',                  kpiDelta: { bankTrust: -2, customerLoyalty: +1 } },
{ id: 'd', label: 'Sicherheiten stellen (Bürgschaft 10k)',                 kpiDelta: { bankTrust: +2, customerLoyalty: +4, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7,}],
  attachments: ['lieferanten_standstill_cfo_tag4.pdf']
  },
{
    id: 'D04-CFO-2',
    day: 4,
    role: 'CFO',
    title: 'Zweitbank-Teaser verschicken',
    context: 'Liquiditätslinie ergänzen.',
    dilemma: 'Signal an Hausbank vs. optionaler Hebel',
    hiddenAgendaHint: 'Diskretion wahrt Vertrauen.',
    options: [{ id: 'a', label: 'Teaser an 2 Banken mit NDA',                           kpiDelta: { bankTrust: +1 } },
{ id: 'b', label: 'Offenes Rundschreiben an 6 Banken',                    kpiDelta: { bankTrust: -3, publicPerception: +1, workforceEngagement: -1, customerLoyalty: -1 } },
{ id: 'c', label: 'Nur vorbereiten, noch nicht versenden',                kpiDelta: { bankTrust: 0 } },
{ id: 'd', label: 'Hausbank informieren und um Zustimmung bitten',        kpiDelta: { bankTrust: +3 } }],
  attachments: ['zweitbank_teaser_cfo_tag4.pdf']
  },
{
    id: 'D04-CFO-3',
    day: 4,
    role: 'CFO',
    title: 'Working-Capital-Quick-Wins',
    context: 'Lagerbestände hoch, Forderungen offen.',
    dilemma: 'Schneller Cash vs. Rabatte',
    hiddenAgendaHint: 'Gezielt, nicht pauschal.',
    options: [{ id: 'a', label: 'Überbestände abverkaufen ',  kpiDelta: { cashEUR: +40000, profitLossEUR: -6000, workforceEngagement: -1, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1,},
{ id: 'b', label: 'Enges Mahnwesen A/B-Kunden (ohne Eskalation)',        kpiDelta: { cashEUR: +30000, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1,},
{ id: 'c', label: 'Pauschale Rabatte für Sofortzahlung',                  kpiDelta: { cashEUR: +50000, profitLossEUR: -9000, bankTrust: -1, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1,},
{ id: 'd', label: 'Keine Working Capital-Maßnahmen',                                   kpiDelta: { bankTrust: -2, customerLoyalty: -1 } }],
  attachments: ['working_capital_quickwins_cfo_tag4.pdf']
  },
{
    id: 'D04-CFO-4',
    day: 4,
    role: 'CFO',
    title: 'Reporting-Pack Banktermin final',
    context: 'Zahlen, Maßnahmen, Covenants, Forecast.',
    dilemma: 'Detailtiefe vs. Lesbarkeit',
    hiddenAgendaHint: 'Klare KPIs und Runway-Sicht entscheidend.',
    options: [{ id: 'a', label: 'Qualitativ hochwertiger Detail-Pack + Executive Summary',                      kpiDelta: { bankTrust: +6, cashEUR: -4000, profitLossEUR: -4000 },
  isTradeOff: true, },
{ id: 'b', label: 'Kurzpräsentation mit Anhängen',                        kpiDelta: { bankTrust: +3, cashEUR: -1000, profitLossEUR: -1000 } },
{ id: 'c', label: 'Nur Executive Summary',                                kpiDelta: { bankTrust: +1 } },
{ id: 'd', label: 'Unvollständig – Zeit sparen',                          kpiDelta: { bankTrust: -4 } }],
  attachments: ['reporting_pack_banktermin_cfo_tag4.pdf']
},
{
    id: 'D04-CFO-5',
    day: 4,
    role: 'CFO',
    title: 'Cash‑Walk Abweichungen – Sofortmaßnahmen',
    context: 'Die Auswertung von Tag 3 zeigt Working‑Capital‑Abweichungen; Banktermin erfordert Gegensteuerung.',
    dilemma: 'Schnelle Liquiditätswirkung vs. Lieferanten- und Kundenbeziehungen',
    hiddenAgendaHint: 'Transparenz über Annahmen und Effekte verhindert Missverständnisse.',
    options: [
      { id: 'a', label: 'Priorisierungsregime P1/P2 verschärfen; tägliche Runs mit CFO‑Freigabe', kpiDelta: { cashEUR: 80000, bankTrust: 4, workforceEngagement: -1 } },
      { id: 'b', label: 'Skonto gezielt nur A‑Kunden anbieten (3 %)', kpiDelta: { cashEUR: 40000, profitLossEUR: -6000, customerLoyalty: 1, bankTrust: -1 } },
      { id: 'c', label: 'Breit 4 % Nachlass anbieten', kpiDelta: { cashEUR: 70000, profitLossEUR: -14000, bankTrust: -2 } },
      { id: 'd', label: 'Abwarten bis nach dem Banktermin', kpiDelta: { bankTrust: -2 } }
    ],
    attachments: ['cash-walk']
  }];

const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D04-OPS-1',
    day: 4,
    role: 'OPS',
    title: 'Lieferabrufe synchronisieren (Banktermin im Blick)',
    context: 'Materialbestellungen sollen Cash nicht sprengen, Lieferfähigkeit könnte kurzfristig leiden.',
    dilemma: 'Durchsatz vs. Cash',
    hiddenAgendaHint: 'Kommunikation mit CFO über Freigaben.',
    options: [{ id: 'a', label: 'Freigaben durch CFO, wenn DB-Marge über 25 % betroffen, evtl. Seiteneffekte wegen Nachlieferungen möglich',        kpiDelta: { bankTrust: +2, customerLoyalty: +1, profitLossEUR: -3000, cashEUR: -3000 },
  isTradeOff: true, },
{ id: 'b', label: 'Freigaben über ein starres Tageslimit',                             kpiDelta: { bankTrust: +3, customerLoyalty: -3 } },
{ id: 'c', label: 'Status quo',                                           kpiDelta: { bankTrust: -2 } },
{ id: 'd', label: 'Nachfrage drosseln ',              kpiDelta: { bankTrust: +6, customerLoyalty: -4, cashEUR: +12000, profitLossEUR: -30000  } }],
  attachments: ['lieferabrufe_synchronisierung_ops_tag4.pdf']
  },
{
    id: 'D04-OPS-2',
    day: 4,
    role: 'OPS',
    title: 'Kritischer Lieferant – Eskalationsgespräch',
    context: 'Forderung: 100 % Vorkasse, sonst Stopp.',
    dilemma: 'Nachgeben vs. Alternative',
    hiddenAgendaHint: 'Teil-Absicherung + Volumenbindungsdeal.',
    options: [{ id: 'a', label: '50 % Vorkasse + Rahmenvertrag',                         kpiDelta: { cashEUR: -50000, customerLoyalty: +2, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7,},
{ id: 'b', label: 'Wechsel zu Alternative (+15 % Kosten)',                 kpiDelta: { profitLossEUR: -12000, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7,},
{ id: 'c', label: 'Harter Stopp ohne Alternative: Eskalation mit der Ziel des Einlenkens',   kpiDelta: { customerLoyalty: -5 } },
              { id: 'd', label: 'Konsignationslager verhandeln',   kpiDelta: { customerLoyalty: +2 } },
{ id: 'e', label: 'Volle Vorkasse',                          kpiDelta: { cashEUR: -100000, bankTrust: -2, customerLoyalty: +2 } }],
  attachments: ['eskalationsgespraech_lieferant_ops_tag4.pdf']
  },
{
    id: 'D04-OPS-3',
    day: 4,
    role: 'OPS',
    title: 'Nachtlogistik für A-Kunden',
    context: 'Termindruck erfordert Sonderfahrten.',
    dilemma: 'Kosten vs. Wahrnehmung',
    hiddenAgendaHint: 'Punktuelle Maßnahmen stärken Loyalität.',
    options: [{ id: 'a', label: 'Nachtlogistik für zwei A-Kunden',          kpiDelta: { profitLossEUR: -9000, customerLoyalty: +4, publicPerception: +1, workforceEngagement: -4 },
  variance: 0.8, 
  execLeakage: 0.7,},
{ id: 'b', label: 'Nur Express bei drohender Pönale',                      kpiDelta: { profitLossEUR: -4000, customerLoyalty: +2, workforceEngagement: -2 },
  variance: 0.8, 
  execLeakage: 0.7,},
{ id: 'c', label: 'Keine Sonderlogistik',                                  kpiDelta: { customerLoyalty: -4 } },
{ id: 'd', label: 'Regelmäßig Express (teuer)',                             kpiDelta: { profitLossEUR: -15000, customerLoyalty: +4, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7,}],
  attachments: ['nachtlogistik_a_kunden_ops_tag4.pdf']
  },
{
    id: 'D04-OPS-4',
    day: 4,
    role: 'OPS',
    title: 'Qualitätskosten senken – 8D-Programm',
    context: 'Reklamationsquote erhöht sich.',
    dilemma: 'Aufwand vs. nachhaltige Wirkung',
    hiddenAgendaHint: '8D strukturiert die Ursachenbeseitigung.',
    options: [{ id: 'a', label: '8D für Top-3 Fehlerbilder',                         kpiDelta: { profitLossEUR: -6000, customerLoyalty: +3, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7,},
{ id: 'b', label: 'Nur 5-Why-Workshops',                                     kpiDelta: { profitLossEUR: -2000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7,},
{ id: 'c', label: 'Keine Maßnahme',                                          kpiDelta: { customerLoyalty: -2, workforceEngagement: -2,  publicPerception: -1 } },
{ id: 'd', label: 'Externer QS-Lead',                                  kpiDelta: { profitLossEUR: -10000, customerLoyalty: +4, publicPerception: +1, workforceEngagement: -3 },
  variance: 0.8, 
  execLeakage: 0.7,}],
  attachments: ['qualitaetskosten_8d_programm_ops_tag4.pdf']
 }];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D04-HRLEGAL-1',
    day: 4,
    role: 'HRLEGAL',
    title: 'Kommunikation Kurzarbeit – Timing',
    context: 'Vor Banktermin sensibel.',
    dilemma: 'Frühe Sicherheit vs. Verunsicherung',
    hiddenAgendaHint: 'Gute Erklärung reduziert Gerüchte.',
    options: [ { id: 'a', label: 'Sofort ankündigen',                                       kpiDelta: { workforceEngagement: -2, publicPerception: -1 }},
{ id: 'b', label: 'Voranzeige + Q&A nach Banktermin',          kpiDelta: { workforceEngagement: +2, publicPerception: +1 } },
{ id: 'c', label: 'Nur vorbereiten, nicht kommunizieren',                    kpiDelta: { workforceEngagement: 0 } },
{ id: 'd', label: 'Ankündigen und sofort starten',                           kpiDelta: { cashEUR: +20000, profitLossEUR: +20000, workforceEngagement: -3, publicPerception: -1, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7,}],
  attachments: ['kurzarbeit_timing_hrlegal_tag4.pdf']
  },
{
    id: 'D04-HRLEGAL-2',
    day: 4,
    role: 'HRLEGAL',
    title: 'Betriebsvereinbarung Flexkonten',
    context: 'Flexibilität für Schichten notwendig.',
    dilemma: 'Mitbestimmung vs. Tempo',
    hiddenAgendaHint: 'Kooperative Lösung stärkt Klima.',
    options: [{ id: 'a', label: 'Einseitige Anordnung',                                    kpiDelta: { workforceEngagement: -3, publicPerception: -1 } },
{ id: 'b', label: 'Nur Absichtserklärung',                                   kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Keine Änderung',                                          kpiDelta: { workforceEngagement: -1 } },
{ id: 'd', label: 'BV-Änderung befristet abschließen',                       kpiDelta: { workforceEngagement: +3, customerLoyalty: +1},
  isTradeOff: true }],
  attachments: ['flexkonten_betriebsvereinbarung_hrlegal_tag4.pdf']
},
{
    id: 'D04-HRLEGAL-3',
    day: 4,
    role: 'HRLEGAL',
    title: 'Compliance-Schulung Cash-Freigaben',
    context: 'Vorwürfe selektiver Zahlungen im Raum.',
    dilemma: 'Aufwand vs. Schutz',
    hiddenAgendaHint: 'Schulung mindert Risiko & erhöht Bankvertrauen.',
    options: [{ id: 'a', label: 'Kurzschulung verpflichtend (2h)',                            kpiDelta: { bankTrust: +2, publicPerception: +1, profitLossEUR: -2000,  workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7,},
{ id: 'b', label: 'Nur Richtlinie per E-Mail',                                  kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Keine Maßnahme',                                             kpiDelta: { bankTrust: -1, publicPerception: -1 } },
{ id: 'd', label: 'Externer Auditor',                                      kpiDelta: { profitLossEUR: -6000, publicPerception: +2, bankTrust: +2, workforceEngagement: -2 },
  variance: 0.8, 
  execLeakage: 0.7}],
  attachments: ['compliance_schulung_cash_freigaben_tag4.pdf']
},
{
    id: 'D04-HRLEGAL-4',
    day: 4,
    role: 'HRLEGAL',
    title: 'Mitarbeiterhilfe-Fonds prüfen, BR fordert Unterstützung',
    context: 'Härtefälle durch Kurzarbeit/Unsicherheit.',
    dilemma: 'Kosten vs. Loyalität',
    hiddenAgendaHint: 'Gezielte Unterstützung bindet Schlüsselkräfte.',
    options: [{ id: 'a', label: 'Kleinerer Fonds für Härtefälle',                         kpiDelta: { cashEUR: -10000, profitLossEUR: -10000, workforceEngagement: +4, publicPerception: +1, bankTrust: -2 },
  variance: 0.8, 
  execLeakage: 0.7,},
{ id: 'b', label: 'Nur noch Beratung/Hotline',                                       kpiDelta: { workforceEngagement: -1, cashEUR: -1000, profitLossEUR: -1000 } },
{ id: 'c', label: 'Keine Maßnahmen mehr',                                             kpiDelta: { workforceEngagement: -4, publicPerception: -1 } },
{ id: 'd', label: 'Spendenaufruf intern (Image-Risiko)',                        kpiDelta: { publicPerception: -2,  workforceEngagement: -1 } }],
  attachments: ['mitarbeiterhilfe_fonds_tag4.pdf']
}];

export const day4Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CFO_BLOCKS,
  ...OPS_BLOCKS,
  ...HRLEGAL_BLOCKS,
];

// src/data/scenario_day_04.ts — NUR den News-Block ersetzen
export const day4News: DayNewsItem[] = [
  {
    id: 'N4-1',
    day: 4,
    title: 'Banktermin für morgen bestätigt – „No surprises“ gilt',
    source: 'bank',
    severity: 'high',
    isImportant: true,
    content: 'Gespräch zu Kreditlinie, 13‑Wochen‑Plan und Auflagen ist für morgen terminiert.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const hasDailyReporting = chose('D01-CFO-4', 'b') || chose('D01-CFO-4', /Daily Short-Report/i);
      const packReady         = chose('D04-CFO-4', 'a') || chose('D04-CFO-4', 'b');
      const ceoRealistic      = chose('D04-CEO-1', 'b') || chose('D04-CEO-5', 'a');
      const externalAdvisor   = chose('D04-CEO-1', 'd') || chose('D03-CEO-4', /Berater/i);
      const stundungActive    = chose('D03-CFO-2', 'a') || chose('D03-CFO-2', 'e') || chose('D01-CFO-3', 'd');
      const treasuryBoard     = chose('D02-CFO-4', 'a');

      let s = 'Morgen steht das strukturierte Bankgespräch an. Erwartet werden belastbare Zahlen, Maßnahmen, Meilensteine und Zuständigkeiten. ';
      s += hasDailyReporting ? 'Das etablierte Daily/Weekly‑Reporting dient als Vertrauensanker. ' : 'Ein klares Reporting‑Regime (Daily/Weekly) sollte adressiert werden. ';
      s += packReady ? 'Das Reporting‑Pack ist vorbereitet; bitte Kennzahlenbrücken und Annahmen konsistent erläutern. ' : 'Bitte Executive‑Summary und KPI‑Bridge bis heute finalisieren. ';
      s += ceoRealistic ? 'Realistisches Narrativ schlägt Optimismus; „No surprises“. ' : '';
      s += externalAdvisor ? 'Die Einbindung eines (banknahen) Beraters kann Akzeptanz und Tempo erhöhen. ' : '';
      s += treasuryBoard ? 'Treasury‑Board priorisiert Zahlungsflüsse und Entscheidungspfade. ' : '';
      s += stundungActive ? 'Wichtig: Konsistenz zu Behördenunterlagen (Stundung/Ratenplan) sicherstellen.' : '';
      return s.trim();
    }
  },
  {
    id: 'N4-2',
    day: 4,
    title: 'Kritischer Lieferant droht mit Lieferstopp',
    source: 'supplier',
    severity: 'high',
    isImportant: true,
    content: 'Für eine Kernbaugruppe wird Vorkasse gefordert – sonst Stopp.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const d1SelectivePrepay = chose('D01-OPS-1', 'a');
      const d1FullPrepay      = chose('D01-OPS-1', 'b');
      const standstillDeal    = chose('D04-CFO-1', 'a') || chose('D04-CFO-1', 'b');
      const consignment       = chose('D04-OPS-2', 'd');
      const altSource         = chose('D04-OPS-2', 'b') || chose('D03-OPS-3', 'a') || chose('D03-OPS-3', 'b');
      const kvActive          = chose('D03-CFO-3', 'a') || chose('D03-CFO-3', 'b') || chose('D03-CFO-3', 'd') || chose('D03-CFO-3', 'e');

      let s = 'Die Forderung nach Vorkasse erhöht das Termin‑ und Durchsatzrisiko. ';
      s += d1SelectivePrepay ? 'Ihre selektive Vorkasse‑Linie (DB‑Schwelle) aus Tag 1 kann als Blaupause dienen. ' : '';
      s += d1FullPrepay ? 'Die umfassende Vorkasse‑Praxis aus Tag 1 entlastete Termine, belastete aber Cash – Priorisierung ist nötig. ' : '';
      s += standstillDeal ? 'Ein verhandelter (Teil‑)Standstill schafft kurzfristig Luft, verlangt aber wöchentliches Update. ' : '';
      s += consignment ? 'Konsignationslager reduziert Vorfinanzierung und stabilisiert die Beziehung. ' : '';
      s += altSource ? 'Alternativbezug/Fremdfertigung steht als Plan B bereit. ' : '';
      s += kvActive ? 'Reaktivierte Kreditversicherung oder Sicherheiten stärken die Lieferantenvertrauensbasis.' : '';
      return s.trim();
    }
  },
  {
    id: 'N4-3',
    day: 4,
    title: 'Presse greift Thema erneut auf – Kommentarspalten aktiv',
    source: 'press',
    severity: 'medium',
    isImportant: true,
    content: 'Nach dem Bericht in der Zeitung drehen Social‑Threads wieder hoch, andere Zeitungen springen auf das Thema auf.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const ceoUpdateA   = chose('D03-CEO-1', 'a') || chose('D03-CEO-1', 'e');
      const ceoSilent    = chose('D03-CEO-1', 'c') || chose('D02-CEO-1', 'c');
      const smGuideline  = chose('D02-HRLEGAL-3', 'a');

      let s = 'Erwartet werden Fakten zu Liquidität, Maßnahmenplan und Lieferfähigkeit. ';
      s += ceoUpdateA ? 'Ihr Multichannel‑Update/FAQ schafft eine sachliche Referenz – bitte tagesaktuell halten. ' : '';
      s += smGuideline ? 'Die Social‑Media‑Guideline und das Fact‑Sheet liefern Formulierungsleitplanken. ' : '';
      s += ceoSilent ? 'Ohne proaktive Klarstellung dominieren Spekulationen; kurze, faktenbasierte Korrekturen werden empfohlen.' : 'Q&A und Kernbotschaften unbedingt konsistent mit Bank‑ und Kundenkommunikation halten.';
      return s.trim();
    }
  },
  {
    id: 'N4-4',
    day: 4,
    title: 'Betriebsrat fordert Status zu Kurzarbeit',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'BR bittet um Kriterien, Zeitplan und betroffene Bereiche.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const townhall    = chose('D03-HRLEGAL-1', 'a') || chose('D03-HRLEGAL-1', 'e');
      const timingAfter = chose('D04-HRLEGAL-1', 'b');

      let s = 'Transparenz senkt Konfliktpotenzial und stabilisiert das Klima. ';
      s += townhall ? 'Die Townhall/Fragebox liefert bereits eine Grundlage; bitte Zahlen und Kriterien ergänzen. ' : 'Ohne Forum drohen Gerüchte; ein kurzes Informationspaket (FAQ/Zeitplan) wird empfohlen. ';
      s += timingAfter ? 'Kommunikationszeitpunkt: nach dem Banktermin – bitte diesen Rahmen mit BR abstimmen.' : 'Bitte Timing klarstellen und BR frühzeitig einbinden.';
      return s.trim();
    }
  },
  {
    id: 'N4-5',
    day: 4,
    title: 'Krisenstab erhöht Taktung bis zum Banktermin',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Daily‑Stand‑up wird temporär auf zwei Slots pro Tag angehoben; klare Owner je Maßnahme.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const hadDailyCrisis = chose('D01-CEO-2', 'c');
      const moderator      = chose('D01-CEO-2', 'd');
      const treasuryBoard  = chose('D02-CFO-4', 'a');

      let s = 'Ziel: Blocker sichtbar machen, Entscheidungen beschleunigen, Risiken tracken. ';
      s += hadDailyCrisis ? 'Die Struktur aus Tag 1 (täglicher Krisenstab) wird verdichtet. ' : 'Ein klarer Takt reduziert Ad‑hoc‑Aktionismus und Doppelarbeit. ';
      s += moderator ? 'Der externe Moderator sichert Prozessdisziplin. ' : '';
      s += treasuryBoard ? 'Treasury‑Board liefert Input zu Zahlungsprioritäten und Cash‑Fenstern.' : '';
      return s.trim();
    }
  },
  {
    id: 'N4-6',
    day: 4,
    title: 'Liquiditätsreport Tag 3: Abweichungen adressiert',
    source: 'finance',
    severity: 'medium',
    isImportant: true,
    content: 'Cash‑Walk zeigt Working Capital‑Abweichungen; Gegenmaßnahmen werden umgesetzt.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const limitStrict  = chose('D03-CFO-4', 'a');
      const limitDyn     = chose('D03-CFO-4', 'd') || chose('D03-CFO-4', 'b');
      const factoring    = chose('D02-CFO-2', 'd') || chose('D02-CFO-2', 'b') || chose('D02-CFO-2', 'c');
      const payrollNow   = chose('D03-CFO-1', 'a') || chose('D03-CFO-1', 'c') || chose('D03-CFO-1', 'e');

      let s = 'Abweichungen stammen v. a. aus Forderungen und Beständen.';
      s += limitStrict ? 'Strenge Tageslimits und Board‑Ausnahmen disziplinieren Freigaben. ' : '';
      s += limitDyn ? 'Dynamische/angepasste Limits sichern Handlungsfähigkeit bei Engpässen. ' : '';
      s += factoring ? 'Factoring‑Pfad dient als optionaler Liquiditätshebel – Signalwirkung beachten. ' : '';
      s += payrollNow ? 'Payroll‑Entscheidungen sind in der Liquiditätsplanung bereits berücksichtigt.' : '';
      return s.trim();
    }
  },
  {
    id: 'N4-7',
    day: 4,
    title: 'Ersatzlieferant für Engpassteil in technischer Prüfung',
    source: 'supplier',
    severity: 'medium',
    isImportant: true,
    content: 'Alternative mit +15 % Kosten, +7 Tage LT – Machbarkeit wird bewertet.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const d2Breakdown  = chose('D02-OPS-1', /Maschinenausfall|Express|Fremdfertigung/i) || chose('D02-OPS-1', 'a') || chose('D02-OPS-1', 'c');
      const d3Outsource  = chose('D03-OPS-3', 'a') || chose('D03-OPS-3', 'b');
      const kv           = chose('D03-CFO-3', 'a') || chose('D03-CFO-3', 'e') || chose('D03-CFO-3', 'd');

      let s = 'Ziel: Liefertreue für A‑Kunden absichern, ohne Kosten und Risiko aus dem Ruder laufen zu lassen. ';
      s += d2Breakdown ? 'Nach dem Ausfall an Tag 2 ist die Redundanz sinnvoll. ' : '';
      s += d3Outsource ? 'Die bestehende Fremdfertigungsbrücke erleichtert die Umstellung. ' : '';
      s += kv ? 'Kreditversicherung/Sicherheiten können die Geschäftsgrundlage mit dem Ersatzlieferanten stabilisieren.' : '';
      return s.trim();
    }
  },
  {
    id: 'N4-8',
    day: 4,
    title: 'Intranet‑FAQ zu Kurzarbeit aktualisiert',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Beispiele und Berechnungslogik ergänzt; wöchentliche Updates vorgesehen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const guideline = chose('D02-HRLEGAL-3', 'a');
      const timingOK  = chose('D04-HRLEGAL-1', 'b');

      let s = 'Das FAQ erläutert Kriterien, Prozess und Ansprechpartner. ';
      s += guideline ? 'Es baut auf den Social‑Guidelines/Fact‑Sheet von Tag 2 auf. ' : '';
      s += timingOK ? 'Kommunikationsfenster: nach Banktermin – Erwartungen intern entsprechend steuern.' : 'Bitte Kommunikationszeitpunkt zu Banktermin/BR‑Gespräch klarziehen.';
      return s.trim();
    }
  },
  // Service-/Füllmeldungen
  {
    id: 'N4-F1',
    day: 4,
    title: 'BGM‑Kurzvortrag „Rückengesundheit“ um 13:00 Uhr',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content: 'Teilnahme via virtuellem Meeting; Einwahldaten im Intranet.'
  },
  {
    id: 'N4-F2',
    day: 4,
    title: 'Kantine: Heute keine warmen Speisen',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content: 'Elektronikfehler an den Herden; es gibt Salate und belegte Brote.'
  },
  {
    id: 'N4-F3',
    day: 4,
    title: 'IT: Kurzfristige VPN‑Wartung',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content: 'Zwischen 17:40–18:00 Uhr kann es zu Verbindungsabbrüchen kommen.'
  },
  {
    id: 'N4-F4',
    day: 4,
    title: 'Klima‑Wartung in Trakt A',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content: 'Für ca. 45 Minuten sind leicht höhere Temperaturen zu erwarten.'
  }
];
