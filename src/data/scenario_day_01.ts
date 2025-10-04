// src/data/scenario_day_01.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [];
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [];
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [];

/**
 * TAG 1 — 16 Entscheidungsblöcke (je 4 pro Rolle)
 * Hinweis:
 * - Jede Entscheidung hat 4 klickbare Optionen (A–D) mit KPI-Deltas.
 * - Die KPI-Wirkung greift erst beim Tageswechsel (Engine-Logik).
 * - Optionale Attachments sind Platzhalter und können später ersetzt werden.
 */

/** CEO (4 Blöcke) **/
const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D01-CEO-1',
    day: 1,
    role: 'CEO',
    title: 'Kontokorrentkürzung – Governance & Narrativ',
    context:
      'Die Hausbank kündigt die Kürzung der Kreditlinie um 300.000 € an. Auflagen: 13-Wochen-Plan, Maßnahmenpaket, wöchentliches Reporting.',
    dilemma: 'Tempo vs. Qualität der Unterlagen',
    hiddenAgendaHint:
      'Bank erwartet „no surprises". Substanz schlägt Optimismus.',
    options: [{ id: 'a', label: '13-Wochen-Plan + Weekly + Zahlungspriorisierung sofort zusagen', kpiDelta: { bankTrust: +12, publicPerception: +2,
      profitLossEUR: -80 },
  variance: 0.8, 
  execLeakage: 0.7,
  isTradeOff: true },
{ id: 'b', label: 'Nur Weekly zusagen – Plan später nachreichen',        kpiDelta: { bankTrust: +4 } },
{ id: 'c', label: 'Optimistische Botschaften ohne belastbare Daten',      kpiDelta: { bankTrust: -10, publicPerception: -3 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Zweitbank „in Aussicht" stellen, aber ohne Unterlagen',kpiDelta: { bankTrust: -4 } }
  ],
  attachments: ['bank_brief_tag1.pdf']
  },
{
    id: 'D01-CEO-2',
    day: 1,
    role: 'CEO',
    title: 'Krisenstab & Meeting-Taktung',
    context:
      'Die Entscheidungsgeschwindigkeit ist zu gering. Es fehlt an klarer Taktung und Rollenverantwortung im Krisenmodus.',
    dilemma: 'Schnelle Entscheidungen vs. Überlastung der Führungskräfte',
    hiddenAgendaHint:
      'Ein sichtbarer Krisenmodus erhöht Bankvertrauen, kann aber die Belegschaft verunsichern.',
    options: [{ id: 'a', label: 'Nur Ad-hoc-Runden bei Bedarf',                               kpiDelta: { bankTrust: -4 } },
{ id: 'b', label: 'Zweimal pro Woche, dafür ausführlich (2 h)',               kpiDelta: { bankTrust: +2, workforceEngagement: +1 } },
{ id: 'c', label: 'Täglicher Krisenstab (30 Min), klare Owner je Maßnahme',    kpiDelta: { bankTrust: +6, workforceEngagement: +2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Externen Moderator beauftragen (Beraterhonorar 8.000 €)',   kpiDelta: { profitLossEUR: -8000, bankTrust: +4 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
  attachments: ['agenda_krisenstab_v1.docx']
  },
{
    id: 'D01-CEO-3',
    day: 1,
    role: 'CEO',
    title: 'Kommunikationslinie nach außen',
    context:
      'Kunden und Öffentlichkeit stellen Fragen. Es gibt Hinweise auf Social-Media-Spekulationen über Zahlungsziele.',
    dilemma: 'Transparenz vs. Beruhigung der Öffentlichkeit',
    hiddenAgendaHint:
      'Übertriebener Optimismus kann später als Irreführung gelten.',
    options: [{ id: 'a', label: 'Faktenbasiertes Statement + Q&A-Dokument veröffentlichen', kpiDelta: { publicPerception: +5, customerLoyalty: +2 } },
{ id: 'b', label: 'Nur Key Accounts proaktiv informieren',                    kpiDelta: { customerLoyalty: +3, publicPerception: -1 } },
{ id: 'c', label: 'Kein Statement – „keine Kommentare"',                      kpiDelta: { publicPerception: -3 } },
{ id: 'd', label: 'Optimistisches Interview ohne Details',                    kpiDelta: { publicPerception: +4, bankTrust: -3 } }
  ],
  attachments: ['statement_template_v1.pdf']
  },
{
    id: 'D01-CEO-4',
    day: 1,
    role: 'CEO',
    title: 'Notfall-Cash – Sale & Leaseback anstoßen?',
    context:
      'Die Liquiditätslinie wackelt. Ein kurzfristiger Sale-&-Leaseback (Maschinenpark) könnte 180.000 € heben.',
    dilemma: 'Runway sichern vs. künftige Fixkosten erhöhen',
    hiddenAgendaHint:
      'Bank registriert proaktiv gehobene Liquiditätsreserven positiv.',
    options: [{ id: 'a', label: 'S&L-Angebote einholen, Entscheidung Tag 3',       kpiDelta: { bankTrust: +5 } },
{ id: 'b', label: 'S&L sofort beauftragen (Kaufpreisabschlag 10 %)', kpiDelta: { cashEUR: +180000, profitLossEUR: -15000, bankTrust: +3 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'c', label: 'S&L ablehnen, Alternativen prüfen',               kpiDelta: { bankTrust: -2 } },
{ id: 'd', label: 'Nur Absicht kundtun, keine Schritte setzen',      kpiDelta: { bankTrust: -1 } }
  ],
  attachments: ['asset_register.pdf']
 }];

/** CFO (4 Blöcke) **/
const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D01-CFO-1',
    day: 1,
    role: 'CFO',
    title: 'Payment-Runs unter KK-Kürzung',
    context:
      'Unkoordinierte Auszahlungen können die Linie reißen. Ein strenges Priorisierungsregime ist nötig.',
    dilemma: 'Lieferbeziehung sichern vs. Runway sichern',
    hiddenAgendaHint:
      'Disziplin und Transparenz erhöhen Bankvertrauen.',
    options: [{ id: 'a', label: 'Stopp P3; 2× tägliche Runs nur P1/P2 (CFO-Freigabe)', kpiDelta: { cashEUR: +120000, bankTrust: +6, workforceEngagement: +2 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'b', label: '50 % Haircut über alle Rechnungen',                    kpiDelta: { cashEUR: +60000, bankTrust: -5, customerLoyalty: -5 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'c', label: 'Weiter wie bisher',                                    kpiDelta: { bankTrust: -8, customerLoyalty: -5 } },
{ id: 'd', label: 'Ad-hoc-Freigaben nach Beziehungen',                    kpiDelta: { bankTrust: -8, publicPerception: -2, customerLoyalty: -5 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
  attachments: ['zahlungspriorisierung_matrix.xlsx']
  },
{
    id: 'D01-CFO-2',
    day: 1,
    role: 'CFO',
    title: 'Skonto-Programm für Schnellzahler',
    context:
      'Mehrere Kunden wären bereit, gegen 3–4 % Nachlass sofort zu zahlen.',
    dilemma: 'Kurzfristige Liquidität vs. Ergebniseffekt & Signal an Bank',
    hiddenAgendaHint:
      'Gezielter Einsatz bei strategischen Kunden kann Loyalität stützen.',
    options: [{ id: 'a', label: 'Nur A-Kunden > 50.000 € anbieten (3 %)',     kpiDelta: { cashEUR: +50000, profitLossEUR: -2000, bankTrust: -1, customerLoyalty: +2 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'b', label: 'Breit ausrollen (4 % Nachlass)',              kpiDelta: { cashEUR: +90000, profitLossEUR: -5600, bankTrust: -3, customerLoyalty: +3 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'c', label: 'Fallweise entscheiden (ohne Policy)',         kpiDelta: { cashEUR: +40000, profitLossEUR: -12000, bankTrust: -3, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'd', label: 'Ablehnen, kein Skonto',                       kpiDelta: { bankTrust: +2, customerLoyalty: -3 } }
  ],
  attachments: ['kunden_offene_posten.xlsx']
  },
{
    id: 'D01-CFO-3',
    day: 1,
    role: 'CFO',
    title: 'Umsatzsteuer/Sozialabgaben – Stundungsantrag?',
    context:
      'Fällige Zahlungen in 10 Tagen. Eine Stundung würde Cash entlasten, birgt aber Reputationsrisiken.',
    dilemma: 'Liquidität jetzt vs. Signalwirkung gegenüber Stakeholdern',
    hiddenAgendaHint:
      'Bank sieht geordnetes Vorgehen positiv, Chaos negativ.',
    options: [{ id: 'a', label: 'Abwarten bis Tag 9 und kurzfristig entscheiden', kpiDelta: { bankTrust: -3, publicPerception: -1, customerLoyalty: -1 } },
{ id: 'b', label: '35.000 Euro Teilzahlung leisten, Rest stunden',           kpiDelta: { cashEUR: -35000, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'c', label: 'Termingerechte Zahlung ohne Stundung',        kpiDelta: { cashEUR: -70000, bankTrust: +2, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Steuerberater beauftragen, um Stundung zu erwirken (2k)',   kpiDelta: { cashEUR: -2000, profitLossEUR: -2000, bankTrust: +3, publicPerception: -1, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
  ],
  attachments: ['behörden_formulare.pdf']
  },
{
    id: 'D01-CFO-4',
    day: 1,
    role: 'CFO',
    title: 'Liquiditätsreporting an Bank (Daily vs. Weekly)',
    context:
      'Die Bank wünscht engmaschige Transparenz. Aufwand im Team ist begrenzt.',
    dilemma: 'Detailtiefe vs. Teamkapazität',
    hiddenAgendaHint:
      'Saubere Daten erhöhen Vertrauensscore, machen aber mehr Arbeit und geben tiefen Einblick.',
    options: [{ id: 'a', label: 'Nur Weekly Detail',                           kpiDelta: { bankTrust: +3, workforceEngagement: -1 } },
{ id: 'b', label: 'Daily Short-Report + Weekly Detail',          kpiDelta: { bankTrust: +7, workforceEngagement: -2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Wöchentliches Summary (1-Pager) ohne Details',kpiDelta: { bankTrust: -1, publicPerception: -1 } },
{ id: 'd', label: 'Ad-hoc nach Ereignislage',                    kpiDelta: { bankTrust: -5, publicPerception: -2, workforceEngagement: +1 } }
  ],
  attachments: ['reporting_template.xlsx']
 }];

/** OPS – Beschaffung & Produktion (4 Blöcke) **/
const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D01-OPS-1',
    day: 1,
    role: 'OPS',
    title: 'ChemAlloy – Vorkasse für kritische Gussteile',
    context:
      'Kreditversicherung entzieht Deckung; Lieferung nur gegen 70 % Vorkasse.',
    dilemma: 'Durchsatz sichern vs. Cash schonen',
    hiddenAgendaHint:
      'Selektive Freigabe mit DB-Schwelle signalisiert Professionalität, verzögert aber Entscheidungen.',
    options: [{ id: 'a', label: 'Gegenangebot: 35 % Vorkasse + Überweisung auf Anderkonto, teilweise Lieferverzögerung, Gewinnerfassung 300k', kpiDelta: { cashEUR: -150000, profitLossEUR: +300000, bankTrust: +3, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Vollständige Vorkasse (alle Aufträge termingerecht, Gewinnerfassung 600k )',        kpiDelta: { cashEUR: -420000, profitLossEUR: +600.000, customerLoyalty: +6, bankTrust: -2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Alternativlieferant (+20 % Kosten, Lieferverzögerung: 10 Tage, +14 Tage Zahlunsgziel, d.h. 420k Cash verschoben)', kpiDelta: { cashEUR: +420000, profitLossEUR: -60000, customerLoyalty: -6, bankTrust: +1, workforceEngagement: -1  },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Stopp bis Klärung (Lieferverzug kostet 120k, aber Cash in Höhe von 420k wird nicht fällig)',                            kpiDelta: { cashEUR: +420000, profitLossEUR: -120000, customerLoyalty: -8, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
  attachments: ['mail_chemalloy.eml']
  },
{
    id: 'D01-OPS-2',
    day: 1,
    role: 'OPS',
    title: 'Engpass in Montage – Linienumbau',
    context:
      'Eine Kernlinie ist überlastet. Mit Umbau können 12 % mehr Stückzahl erreicht werden, signifikante Reduktion von Nacharbeiten und Ausschuss. Kosten durch Abschreibungen, Zinsen, Einbußen durch Stillstand.',
    dilemma: 'Kurzfristige Lieferfähigkeit vs. Effizienzgewinn',
    hiddenAgendaHint:
      'Stückzahl hilft Liefertreue – sichtbar für Kunden, Liquidität muss von CFO freigegeben werden.',
    options: [{ id: 'a', label: 'Verschieben auf Tag 5',                         kpiDelta: { customerLoyalty: +2, workforceEngagement: -1 } },
{ id: 'b', label: 'Umbau nachts (kein Ausfall)',  kpiDelta: {cashEUR: -35000, profitLossEUR: -35000, customerLoyalty: +6, workforceEngagement: -2, bankTrust: -3 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Sofortiger Umbau (Kosten 18.000 €, Maschinenstillstand führt zu leichter Verzögerung)',           kpiDelta: { cashEUR: -18000, profitLossEUR: -18000, customerLoyalty: -3, bankTrust: -2, workforceEngagement: -2  },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Kein Umbau – Prozess beibehalten',              kpiDelta: { profitLossEUR: -6000, customerLoyalty: +1, bankTrust: -1, workforceEngagement: -1, publicperception: -2} }
  ],
  attachments: ['layout_montagelinie.dwg']
  },
{
    id: 'D01-OPS-3',
    day: 1,
    role: 'OPS',
    title: 'Kontraktlogistik – Zahlungsziel neu verhandeln',
    context:
      'Verhandlungen mit dem Zulieferer über neues Zahlungsziel: Logistikpartner bietet 14 Tage Zahlungsziel; Ziel sind 30 Tage.',
    dilemma: 'Cash-Schonung vs. Konditionsrisiko',
    hiddenAgendaHint:
      'Gute Logistikpartnerschaft reduziert Lieferrisiko.',
    options: [{ id: 'a', label: 'Harte Verhandlung auf 30 Tage',                 kpiDelta: { cashEUR: +20000, bankTrust: +1,  customerLoyalty: -4 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'b', label: 'Kompromiss 21 Tage + Volumenbindung',           kpiDelta: { cashEUR: +12000, customerLoyalty: +1},
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1 },
{ id: 'c', label: 'Status quo akzeptieren',                        kpiDelta: { cashEUR: 0, bankTrust: -2, customerLoyalty: +1 } },
{ id: 'd', label: 'Wechsel zu Billiganbieter (Risiko Ausfälle)',   kpiDelta: { cashEUR: +6000, profitLossEUR: +5000, customerLoyalty: -6, publicPerception: -1,  workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
  attachments: ['logistikvertrag_v2.pdf']
  },
{
    id: 'D01-OPS-4',
    day: 1,
    role: 'OPS',
    title: 'Qualitätsreklamation A-Kunde – Kulanz oder Streit?',
    context:
      'A-Kunde reklamiert eine Charge. Ersatzlieferung kostet 22.000 €. Reklamation ist nur teilweise berechtigt, aber langfrisitge gute Kundenbeziehung.',
    dilemma: 'Kundenbindung vs. kurzfristiger Ergebnisdruck',
    hiddenAgendaHint:
      'Schnelle Kulanz kann Social-Media-Schaden vermeiden.',
    options: [{ id: 'a', label: 'Sofortige Ersatzlieferung + Root-Cause-Report', kpiDelta: { profitLossEUR: -22000, customerLoyalty: +6, publicPerception: +2, workforceEngagement: -2, bankTrust: -2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: '50 % Kosten teilen',                             kpiDelta: { profitLossEUR: -11000, customerLoyalty: +3, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Kulanz ablehnen, auf Vertrag pochen',            kpiDelta: { customerLoyalty: -6, publicPerception: -2, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Kulanz zusagen, aber Lieferung verzögern',       kpiDelta: { profitLossEUR: -10000, customerLoyalty: -1, publicPerception: -2 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
  attachments: ['reklamation_a_kunde.pdf']
 }];

/** HR/Legal (4 Blöcke) **/
const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D01-HRLEGAL-1',
    day: 1,
    role: 'HRLEGAL',
    title: 'Interne Kommunikation – Lohnsicherheit',
    context:
      'Gerüchteküche brodelt: „Sind Löhne sicher?" Erste Rückzüge bei Bewerbungen.',
    dilemma: 'Transparenz vs. Unruhe',
    hiddenAgendaHint:
      'Q&A + Faktenmemo beruhigen, übertriebene Zusagen schaden.',
    options: [{ id: 'a', label: 'Minimalinfo nur an Führungskräfte',     kpiDelta: { workforceEngagement: +2 } },
{ id: 'b', label: 'Faktenmemo + Q&A + täglicher Ticker',  kpiDelta: { workforceEngagement: +8, publicPerception: +2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Kein Statement',                        kpiDelta: { workforceEngagement: -6, publicPerception: -3 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'd', label: 'Überschwänglicher Optimismus',          kpiDelta: {  workforceEngagement: -1, bankTrust: -3, publicPerception: +1 } }
  ],
  attachments: ['intranet_faq_v1.md']
  },
{
    id: 'D01-HRLEGAL-2',
    day: 1,
    role: 'HRLEGAL',
    title: 'Kurzarbeit prüfen',
    context:
      'Auftragsschwankungen und Cash-Stress sprechen für temporäre Kurzarbeit in Teilbereichen.',
    dilemma: 'Kosten senken vs. Signal an Markt/Belegschaft',
    hiddenAgendaHint:
      'Rechtskonforme Vorbereitung vermeidet Spätfolgen.',
    options: [{ id: 'a', label: 'Voranfrage bei Agentur stellen (formell korrekt)', kpiDelta: { workforceEngagement: -1, publicPerception: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Kurzarbeit sofort ankündigen (ohne Vorprüfung)',   kpiDelta: { cashEUR: +120000, profitLossEUR: +120000, workforceEngagement: -6, publicPerception: -4, bankTrust: -2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Nur vorbereiten, noch nicht kommunizieren',        kpiDelta: { bankTrust: +1 } },
{ id: 'd', label: 'Nicht prüfen, „weiter so"',                        kpiDelta: { profitLossEUR: 0, workforceEngagement: 0, bankTrust: -1 } }
  ],
  attachments: ['kurzarbeit_checkliste.pdf']
  },
{
    id: 'D01-HRLEGAL-3',
    day: 1,
    role: 'HRLEGAL',
    title: 'Freie Mitarbeitende/Leiharbeit – Verträge straffen',
    context:
      'Uneinheitliche Vertragslagen, Risiken bei Scheinselbstständigkeit.',
    dilemma: 'Schnelles Sparen vs. Compliance-Risiko',
    hiddenAgendaHint:
      'Saubere Verträge stärken Bank- und Marktvertrauen.',
    options: [{ id: 'a', label: 'Sofortige Vertragsprüfung & Nachträge, rechtskonforme Prüfung',  kpiDelta: { profitLossEUR: -15000, bankTrust: +2, publicPerception: +1, workforceEngagement: +2 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'b', label: 'Nur kritische Fälle anpassen',           kpiDelta: { profitLossEUR: -2000, bankTrust: +1, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7 },
{ id: 'c', label: 'Alles lassen (Zeit sparen)',             kpiDelta: { bankTrust: -2, workforceEngagement: -2, publicPerception: -1 } },
{ id: 'd', label: 'Temporär stoppen, externe Prüfung Tag 7, leichte Lieferverzögerungen möglich (8k Pönale)',kpiDelta: { cashEUR: +28000, profitLossEUR: +8000, bankTrust: +2, publicPerception: -2, workforceEngagement: -4, customerLoyalty: -2 },
  variance: 0.8, 
  execLeakage: 0.7 }
  ],
  attachments: ['vertrag_muster_freie.pdf']
  },
{
    id: 'D01-HRLEGAL-4',
    day: 1,
    role: 'HRLEGAL',
    title: 'Whistleblowing-Hinweis – verspätete Zahlungen',
    context:
      'Anonyme Meldung: „Zahlungen an kleine Lieferanten verzögert". Medienrisiko.',
    dilemma: 'Schnell aufklären vs. defensiv bleiben',
    hiddenAgendaHint:
      'Proaktive Aufarbeitung reduziert Reputationsschaden.',
    options: [{ id: 'a', label: 'Sofortige interne Untersuchung + Rückmeldung', kpiDelta: { publicPerception: +3, bankTrust: +2, workforceEngagement: +2 } },
{ id: 'b', label: 'Nur juristisch prüfen, keine Kommunikation',    kpiDelta: { bankTrust: +1, publicPerception: -1, workforceEngagement: -4 } },
{ id: 'c', label: 'Hinweis ignorieren',                            kpiDelta: { publicPerception: -3, bankTrust: -1, workforceEngagement: -6 } },
{ id: 'd', label: 'Gegenangriff: „Falsche Behauptung"',            kpiDelta: { publicPerception: -5, bankTrust: 0, workforceEngagement: +3  } }
  ],
  attachments: ['hinweisportal_ticket_4711.msg']
 }];

/** Export kombinierter Blöcke für Tag 1 **/
export const day1Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CFO_BLOCKS,
  ...OPS_BLOCKS,
  ...HRLEGAL_BLOCKS
];

/** News (erweitert) **/

 // src/data/scenario_day_01.ts — NUR den News-Block ersetzen
export const day1News: DayNewsItem[] = [
{
id: 'N1',
day: 1,
title: 'Hausbank erwägt Kürzung der Kreditlinie – Auflagen skizziert',
source: 'bank',
severity: 'critical',
isImportant: true,
content:
'Bank signalisiert: Kürzung um 300.000 € möglich. Erwartet werden 13-Wochen-Plan, Maßnahmenpaket und engmaschiges Reporting.',
expandedText:
'Die Bank fordert belastbare Governance: 13-Wochen-Plan, klare Meilensteine, wöchentliches Reporting sowie feste Ansprechpartner. Eine sichtbare Krisentaktung (Krisenstab) und sauberes Liquiditätsreporting erhöhen die Glaubwürdigkeit. Unbelegte Optimismus-Statements würden hingegen Vertrauen kosten.'
},
{
id: 'N2',
day: 1,
title: 'ChemAlloy verlangt 70 % Vorkasse für kritische Gussteile',
source: 'supplier',
severity: 'high',
isImportant: true,
content:
'Kreditversicherung zieht Deckung: Lieferung nur gegen hohe Anzahlung. Produktionsdurchsatz vs. Cash-Schonung abwägen.',
expandedText:
'Ohne Vorkasse drohen Lieferstopps und Terminrisiken. Selektive Freigaben mit DB-Schwelle oder Alternativlieferant sind möglich, haben jedoch Kosten-/Zeitfolgen. Ein strukturiertes Payment-Regime des CFO (P1/P2) kann Engpässe entschärfen, erhöht aber Druck auf andere Lieferanten.'
},
{
id: 'N3',
day: 1,
title: 'LinkedIn spekuliert über Zahlungsverzüge bei APS',
source: 'press',
severity: 'medium',
isImportant: false,
content:
'In sozialen Medien kursieren Hinweise auf verspätete Zahlungen und wackelige Zahlungsziele.',
expandedText:
'Ohne faktenbasiertes Statement kann sich das Narrativ verselbständigen. Ein Q&A-Dokument und abgestimmte Kernbotschaften stabilisieren die Außenwirkung. Ein rein optimistisches Interview ohne Details birgt Reputations- und Bankenrisiken.'
},
{
id: 'N4',
day: 1,
title: 'Zwei Bewerbende ziehen Bewerbungen zurück',
source: 'internal',
severity: 'low',
isImportant: false,
content:
'Verunsicherung im Arbeitsmarktumfeld wirkt sich auf Recruiting aus.',
expandedText:
'Gerüchte zu Lohnsicherheit und Kurzarbeit verunsichern. Ein faktenbasiertes internes Memo (Q&A, Ticker) kann Engagement und Vertrauen erhöhen. Überschwängliche Zusagen oder Schweigen verschärfen die Lage.'
},
{
id: 'N5',
day: 1,
title: 'A-Kunde fordert Terminsicherheit – Volumenverlagerung angedroht',
source: 'customer',
severity: 'high',
isImportant: true,
content:
'Kunde verlangt klare Zusagen zu Lieferterminen bei laufender Reklamation.',
expandedText:
'Kulante, schnelle Lösung mit Root-Cause-Report stärkt Bindung und Außenwirkung, kostet jedoch Ergebnis. Verzögerte Kulanz oder harte Vertragsposition bergen Social-Media- und Abwanderungsrisiken. Kapazitätsmaßnahmen (Linienumbau) beeinflussen Liefertreue sichtbar.'
},
{
id: 'N6',
day: 1,
title: 'Logistikpartner stellt Konditionen zur Disposition',
source: 'supplier',
severity: 'medium',
isImportant: false,
content:
'Zahlungsziele und Volumenbindungen sollen neu verhandelt werden.',
expandedText:
'Harte 30-Tage-Forderungen schonen Cash, können jedoch die Beziehung belasten. Kompromisslösungen (z. B. 21 Tage + Volumenbindung) stabilisieren die Supply-Chain. Ein Wechsel zu Billiganbietern erhöht Ausfallrisiken und kann die Außenwirkung verschlechtern.'
},
{
id: 'N7',
day: 1,
title: 'Whistleblowing-Portal: Hinweis zu verzögerten Kleinlieferanten-Zahlungen',
source: 'internal',
severity: 'medium',
isImportant: true,
content:
'Anonyme Meldung zu verspäteten Zahlungen – potenzielles Medien- und Compliance-Thema.',
expandedText:
'Eine rasche interne Aufklärung mit Rückmeldung reduziert Reputationsschaden und stärkt Vertrauen. Eine rein juristische Prüfung ohne Kommunikation oder ein Gegenangriff erhöhen das Risiko von Eskalationen.'
},
{
id: 'N1-F1',
day: 1,
title: 'Brandschutzübung um 12:00 Uhr',
source: 'internal',
severity: 'low',
isImportant: false,
suppressHints: true,
content:
'Alle Bereiche stoppen um 12:00 Uhr für eine Evakuierungsübung. Dauer ca. 20 Minuten.'
},
{
id: 'N1-F3',
day: 1,
title: 'Kurzzeitiger Stromausfall',
source: 'internal',
severity: 'low',
isImportant: false,
suppressHints: true,
content:
'Im Verwaltungsgebäude kommt es zwischen 14:10–14:25 Uhr zu einer Unterbrechung.'
}
];