// src/data/scenario_day_05.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [];
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [];
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [];

/**
 * TAG 5 — 16 Entscheidungsblöcke (je 4 pro Rolle)
 * Eskalation: Bankgespräch, S&L-Beschluss, Fördermittel, Restrukturierung
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D05-CEO-1',
    day: 5,
    role: 'CEO',
    title: 'Bankgespräch führen – Tonalität & Zusagen',
    context: 'Erstes großes Gespräch mit Hausbank über Linie, Auflagen, Reporting.',
    dilemma: 'Verbindlichkeit vs. Flexibilität',
    hiddenAgendaHint: 'Konkrete Meilensteine stärken Glaubwürdigkeit.',
    options: [{ id: 'a', label: 'Allgemeine Zusagen ohne Daten',                           kpiDelta: { bankTrust: -3, publicPerception: -1,  workforceEngagement: -1 } },
{ id: 'b', label: 'Konkrete Milestones + 13-Wochen-Plan zusagen',           kpiDelta: { bankTrust: +8, publicPerception: +1,  workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Harte Forderung nach Linienerhöhung',                     kpiDelta: { bankTrust: -2, publicPerception: +1 } },
{ id: 'd', label: 'Zweitbank erwähnen als Option, nicht Drohung',           kpiDelta: { bankTrust: +2 } }],
    attachments: ['banktermin_sprechzettel_tag5.pdf']
  },
{
    id: 'D05-CEO-2',
    day: 5,
    role: 'CEO',
    title: 'Produktlinie XPL stilllegen',
    context: 'Kostenreduktion.',
    dilemma: 'Kosteneinsparung vs. Signaleffekt',
    hiddenAgendaHint: 'Ernsthaftes Prüfen, ob XPL Zukunft hat',
    options: [{ id: 'a', label: 'Einstellung vorbereiten, aber keine Fakten schaffen.',                    kpiDelta: { bankTrust: -1, workforceEngagement: -2, customerLoyalty: -1},
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'b', label: 'Verlustbringer einstellen',                                  kpiDelta: {  bankTrust: +4, workforceEngagement: -4, customerLoyalty: -4, cashEUR: +70000 } },
{ id: 'c', label: 'Investition in Produktlinie um Zeichen zu setzen',                                kpiDelta: { bankTrust: -2, workforceEngagement: +4, customerLoyalty: +4, cashEUR: -25000  } },
{ id: 'd', label: 'Keine Maßnahme',                                            kpiDelta: { bankTrust: -4, workforceEngagement: +2 } }],
    attachments: ['XPL-Einstellung.pdf']
  },
{
    id: 'D05-CEO-3',
    day: 5,
    role: 'CEO',
    title: 'Kommunikation nach Banktermin',
    context: 'Team & Kunden warten auf Einordnung.',
    dilemma: 'Detailgrad vs. Sicherheit',
    hiddenAgendaHint: 'Konsistente Botschaften verhindern Gerüchte.',
    options: [{ id: 'a', label: 'Keine Kommunikation',                                     kpiDelta: { workforceEngagement: -2, publicPerception: -1 } },
{ id: 'b', label: 'Nur internes Memo',                                       kpiDelta: { workforceEngagement: +2 } },
{ id: 'c', label: 'Brief an Belegschaft + Key Accounts, Bullet-Points, professionell gestaltet',      kpiDelta: { workforceEngagement: +4, customerLoyalty: +2, publicPerception: +1, cashEUR: -1000, profitLossEUR: -1000  } },
{ id: 'd', label: 'Optimistischer Post auf LinkedIn',                        kpiDelta: { publicPerception: +3, bankTrust: -2, workforceEngagement: +2 } }],
    attachments: ['nach_banktermin_sprachregelung_tag5.pdf']
  },
{
    id: 'D05-CEO-4',
    day: 5,
    role: 'CEO',
    title: 'Kundenbindungsprogramm light',
    context: 'Kundenverträge laufen teils aus; Unsicherheit hoch.',
    dilemma: 'Rabatte vs. Laufzeitbindung',
    hiddenAgendaHint: 'Mehrjährige Verlängerungen verbessern Planung.',
    options: [{ id: 'a', label: 'Laufzeitverlängerung gegen 1 % Bonus',                      kpiDelta: { customerLoyalty: +5, profitLossEUR: -5000 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Servicegutschein statt Rabatt',                             kpiDelta: { customerLoyalty: +3, profitLossEUR: -3000 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Preisrabatt 3 % sofort',                                    kpiDelta: { customerLoyalty: +4, profitLossEUR: -9000, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Kein Programm',                                             kpiDelta: { customerLoyalty: -3 } }],
    attachments: ['kundenbindungsprogramm_light_anschreiben_tag5.pdf']
  }
                                    
                                    
                                    
                                    
                                    ];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D05-CFO-1',
    day: 5,
    role: 'CFO',
    title: 'Covenant-Bridge präsentieren',
    context: 'Bank fordert Sicht auf Covenants und Gegenmaßnahmen.',
    dilemma: 'Offenlegung vs. Verhandlungsspielraum',
    hiddenAgendaHint: 'Klare Bridge erhöht Glaubwürdigkeit.',
    options: [{ id: 'a', label: 'Bridge mit Maßnahmenplan & Sensitivitäten',                 kpiDelta: { bankTrust: +7 } },
{ id: 'b', label: 'Nur Baseline ohne Sensitivität',                             kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Keine Bridge (nur verbale Einordnung)',                     kpiDelta: { bankTrust: -3, workforceEngagement: -2 } },
{ id: 'd', label: 'Externe Plausibilisierung',                             kpiDelta: { profitLossEUR: -5000, bankTrust: +8, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['covenant_bridge_bankmemo_tag5.pdf']
  },
{
    id: 'D05-CFO-2',
    day: 5,
    role: 'CFO',
    title: 'Fördermittel / Liquiditätszuschüsse',
    context: 'Programm für Transformations-/Energieeffizienz möglich.',
    dilemma: 'Beantragen vs. Aufwand',
    hiddenAgendaHint: 'Signalisiert Zukunftsfähigkeit.',
    options: [{ id: 'a', label: 'Antrag vorbereiten',               kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, bankTrust: +2, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Leichte Antragsskizze intern, Chance 50 %',                                kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Nicht beantragen',                                            kpiDelta: { bankTrust: 0 } },
{ id: 'd', label: 'Antragstellung extern vergeben ',                             kpiDelta: {profitLossEUR: -12000, cashEUR: -12000, bankTrust: +2,  workforceEngagement: -1 } }],
    attachments: ['foerdermittel_kurzantrag_rahmen_tag5.pdf']
  },
{
    id: 'D05-CFO-3',
    day: 5,
    role: 'CFO',
    title: 'Payroll-Absicherung final',
    context: 'Letzte Woche vor Lohnlauf.',
    dilemma: 'Cash-Bindung vs. Sicherheit',
    hiddenAgendaHint: 'Löhne sind Priorität für Reputation.',
    options: [{ id: 'a', label: 'Payroll-Konto voll decken (560k)',                             kpiDelta: { workforceEngagement: +6, publicPerception: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: '80 % decken, Rest kurz vor Zahllauf',                               kpiDelta: {  workforceEngagement: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Verzögerung planen um wenige Tage um Liquidität zu schonen',                             kpiDelta: { workforceEngagement: -4 } },
{ id: 'd', label: 'Kurzfristige Überbrückung bei Bank anfragen',                  kpiDelta: { bankTrust: +1, workforceEngagement: +2,  publicPerception: -2 } }],
    attachments: ['payroll_absicherung_aktennotiz_tag5.pdf']
  },
{
    id: 'D05-CFO-4',
    day: 5,
    role: 'CFO',
    title: 'Working-Capital KPI-Dashboard live schalten',
    context: 'Transparenz für tägliche Steuerung fehlt.',
    dilemma: 'Aufwand vs. Nutzen',
    hiddenAgendaHint: 'Dashboard fördert Disziplin und Bankvertrauen.',
    options: [{ id: 'a', label: 'Daily KPI (DSO/DPO/DIO) einführen',                            kpiDelta: { bankTrust: +4, workforceEngagement: +1 } },
{ id: 'b', label: 'Weekly KPI',                                                   kpiDelta: { bankTrust: +2, workforceEngagement: +1 } },
{ id: 'c', label: 'Kein Dashboard',                                               kpiDelta: { bankTrust: -2, workforceEngagement: -2 } },
{ id: 'd', label: 'Externes Tool',                                     kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, bankTrust: +4, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['wc_dashboard_go_live_memo_tag5.pdf']
  }];

const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D05-OPS-1',
    day: 5,
    role: 'OPS',
    title: 'Produktionsmix nach Banktermin anpassen',
    context: 'Fokus auf DB-starke Aufträge gefordert.',
    dilemma: 'Kurzfristiger DB vs. Kundenmix',
    hiddenAgendaHint: 'Transparente Kriterien mit Vertrieb abstimmen.',
    options: [{ id: 'a', label: 'DB>30 % priorisieren, Rest strecken',                            kpiDelta: {cashEUR: 18000, profitLossEUR: -18000, customerLoyalty: -2, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Ausgewogener Mix',                                               kpiDelta: { cashEUR: 6000, profitLossEUR: +6000, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'A-Kunden trotz niedrigem DB priorisieren',                       kpiDelta: { cashEUR: 8000, profitLossEUR: -8000, customerLoyalty: +4 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Status quo',                                                     kpiDelta: { profitLossEUR: 0, bankTrust: -4 } }],
    attachments: ['produktionsmix_update_tag5.pdf']
  },
{
    id: 'D05-OPS-2',
    day: 5,
    role: 'OPS',
    title: 'Engpasslogistik nachjustieren',
    context: 'Kapazität trotz Krise ausweiten.',
    dilemma: 'Servicegrad vs. Kosten',
    hiddenAgendaHint: 'Lieferunfähigkeit und Zusatzschichten vermeiden, Externe Zulieferung nutzen',
    options: [{ id: 'a', label: 'Lieferverzögerungen in Kauf nehmen',                              kpiDelta: { profitLossEUR: -8000, customerLoyalty: -4,  publicPerception: -1, workforceEngagement: -1  },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Externe Lieferungen bei Billiganbieter beauftragen',              kpiDelta: { profitLossEUR: -8000, customerLoyalty: -3, publicPerception: -1, workforceEngagement: -1 } },
{ id: 'c', label: 'Langfristigen Liefervertrag mit Premiumanbieter abschließen',                       kpiDelta: { profitLossEUR: -32000, customerLoyalty: +4, publicPerception: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Verhandlungen mit Kunden (Zeitverzögerung gegen Nachlass)',                                    kpiDelta: { profitLossEUR: -10000, customerLoyalty: +3, publicPerception: +1, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['engpasslogistik_memorandum_tag5.pdf']
  },
{
    id: 'D05-OPS-3',
    day: 5,
    role: 'OPS',
    title: 'Lieferanten-Prioritätenliste veröffentlichen',
    context: 'Transparenz über Freigabe-Logik gefordert.',
    dilemma: 'Planbarkeit vs. Verhandlungsposition',
    hiddenAgendaHint: 'DB-basierte Priorisierung erhöht Fairness.',
    options: [{ id: 'a', label: 'DB-/Kritikalität-Matrix kommunizieren',                           kpiDelta: { bankTrust: +2, customerLoyalty: +1 },
  isTradeOff: true },
{ id: 'b', label: 'Nur intern nutzen',                                               kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Nicht kommunizieren',                                             kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Individuell je Lieferant verhandeln',                             kpiDelta: { bankTrust: -1 } }],
    attachments: ['lieferanten_prioritaeten_rundschreiben_tag5.pdf']
  },
{
    id: 'D05-OPS-4',
    day: 5,
    role: 'OPS',
    title: 'Qualitätsprogramm nachschärfen (8D/5-Why)',
    context: 'Erste Effekte sichtbar, Fortführung?',
    dilemma: 'Kosten vs. nachhaltige Reduktion',
    hiddenAgendaHint: 'Qualität stützt Reputation.',
    options: [{ id: 'a', label: '8D auf 5 Themen ausweiten',                                  kpiDelta: { cashEUR: -18000, profitLossEUR: -18000, customerLoyalty: +4, publicPerception: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Status beibehalten',                                              kpiDelta: { customerLoyalty: +1, publicPerception: +1 } },
{ id: 'c', label: 'Programm einstellen',                                             kpiDelta: { customerLoyalty: -2, publicPerception: -1 } },
{ id: 'd', label: 'Externes Benchmarking',                                      kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, publicPerception: +2, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['qualitaetsprogramm_8d5why_kickoff_tag5.pdf']
  }];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D05-HRLEGAL-1',
    day: 5,
    role: 'HRLEGAL',
    title: 'Townhall nach Banktermin',
    context: 'Team erwartet klare Botschaften.',
    dilemma: 'Offenheit vs. juristische Vorsicht',
    hiddenAgendaHint: 'Konkrete nächste Schritte benennen.',
    options: [{ id: 'a', label: 'Kein Update',                                     kpiDelta: { workforceEngagement: -6 } },
{ id: 'b', label: 'Nur schriftliches Update',                                       kpiDelta: { workforceEngagement: +2 } },
{ id: 'c', label: 'Townhall + konkrete Maßnahmenliste',                             kpiDelta: { workforceEngagement: +6, publicPerception: +1 } },
{ id: 'd', label: 'Zukunftsversprechen ohne Substanz',                              kpiDelta: { publicPerception: +2, bankTrust: -2, workforceEngagement: -4 } }],
    attachments: ['townhall_nach_banktermin_leitfaden_tag5.pdf']
  },
{
   
  id: 'D05-HRLEGAL-2',
  day: 5,
  role: 'HRLEGAL',
  title: 'Mandatsgovernance & Vertraulichkeit (NDA / Common Interest)',
  context: 'Beraterzugriff auf sensible HR- und Finanzdaten; Bank fordert Informationsrechte.',
  dilemma: 'Bankvertrauen vs. Vertraulichkeit/Handlungsfreiheit',
  hiddenAgendaHint: 'Common-Interest/JDA schützt Privilegien; klare Regeln senken Leckagerisiko.',
  options: [{
    id: 'a', label: 'Common-Interest + beiderseitiges NDA; Berichte an Bank über Counsel (wöchentlich)',
    kpiDelta: { bankTrust: +5, publicPerception: +1, profitLossEUR: -6000, workforceEngagement: +1 },
    variance: 0.7, execLeakage: 0.3, isTradeOff: true
  },
  { id: 'b', label: 'Nur NDA mit Berater; Bank erhält Data-Room-Rohdatenzugriff',
    kpiDelta: { bankTrust: +4, publicPerception: -1, profitLossEUR: -3000, workforceEngagement: -1 },
    variance: 0.8, execLeakage: 0.7, isTradeOff: true },
  { id: 'c', label: 'Internes NDA; Updates nur schriftlich monatlich über Governance-Gremium',
    kpiDelta: { bankTrust: -1, profitLossEUR: -500, workforceEngagement: +1 },
    variance: 0.5, execLeakage: 0.2 },
  { id: 'd', label: 'Offene Informationsweitergabe ohne formale Vereinbarungen',
    kpiDelta: { bankTrust: +1, publicPerception: -3 },
    variance: 0.9, execLeakage: 0.9 }],
  attachments: ['mandatsgovernance_confidentiality_memo_tag5.pdf']
},

{
    id: 'D05-HRLEGAL-3',
    day: 5,
    role: 'HRLEGAL',
    title: 'Interne Leitlinien Krisenkommunikation',
    context: 'Uneinheitliche Botschaften schaden.',
    dilemma: 'Freiheit vs. Kontrolle',
    hiddenAgendaHint: 'Guidelines beugen Leaks vor.',
    options: [{ id: 'a', label: 'Guideline + Freigabeprozess veröffentlichen',                    kpiDelta: { publicPerception: +2, bankTrust: +1, profitLossEUR: -1000 },
  isTradeOff: true },
{ id: 'b', label: 'Nur Reminder an Führungskräfte',                                 kpiDelta: { publicPerception: +1 } },
{ id: 'c', label: 'Keine Richtlinie',                                               kpiDelta: { publicPerception: -1, bankTrust: -1 } },
{ id: 'd', label: 'Strenge Verbote ',                                 kpiDelta: { workforceEngagement: -3, publicPerception: -2 } }],
    attachments: ['krisenkommunikation_guideline_draft_tag5.pdf']
  },
{
  id: 'D05-HRLEGAL-4',
  day: 5,
  role: 'HRLEGAL',
  title: 'Teilverkauf Tochterunternehmen – rechtliche Vorprüfung. Der Generalbevollmächtigte hat uns beauftragt, streng vertraulich zu prüfen, ob ein Verkauf der Tochter United Pumps of America (UPA) kurzfrisitg möglich ist',
  context: 'Liquiditätsdruck; Bank drängt auf Liquiditätsschub. Rechtslage & Governance klären.',
  dilemma: 'Zeitdruck vs. Transaktionssicherheit/Preis',
  hiddenAgendaHint: 'Saubere Vendor-Due Diligence (DD) und Carve-out-Readiness erhöhen Bankvertrauen und Deal-Preis.',
  options: [{
    id: 'a', label: 'Vendor Legal DD + Carve-out-Readiness + Entwurf Beteiligungsvertrag',
    kpiDelta: { bankTrust: +5, publicPerception: +1, profitLossEUR: -15000, workforceEngagement: -4 },
    variance: 0.7, execLeakage: 0.3, isTradeOff: true
  },
  { id: 'b', label: 'schnelle, risikoorientierte Prüfung (Red-Flag Legal DD, 2 Wochen) + Letter of Intent (LOI) vorbereiten',
    kpiDelta: { bankTrust: +3, profitLossEUR: -8000, workforceEngagement: -2 },
    variance: 0.7, execLeakage: 0.5, isTradeOff: true },
  { id: 'c', label: 'Interner Check (ohne externen Counsel) + indikative Terms',
    kpiDelta: { bankTrust: +1, profitLossEUR: -1000, workforceEngagement: -4 },
    variance: 0.6, execLeakage: 0.6 },
  { id: 'd', label: 'Aufschub bis nach nächstem Banktermin',
    kpiDelta: { bankTrust: -3, publicPerception: -1 },
    variance: 0.4, execLeakage: 0.2 }],
  attachments: ['upa_teilverkauf_legal_vorpruefung_tag5.pdf']
}];

export const day5Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CFO_BLOCKS,
  ...OPS_BLOCKS,
  ...HRLEGAL_BLOCKS
];

// src/data/scenario_day_05.ts — NUR den News-Block ersetzen
export const day5News: DayNewsItem[] = [
  {
    id: 'N5-1',
    day: 5,
    title: 'Bankgespräch abgeschlossen – klare Meilensteine gefordert',
    source: 'bank',
    severity: 'critical',
    isImportant: true,
    content: 'Hausbank betont: belastbare 13‑Wochen‑Brücke, Reporting‑Disziplin und nachvollziehbare Maßnahmen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));

      const ceoConcrete    = chose('D05-CEO-1', 'b');
      const ceoGeneric     = chose('D05-CEO-1', 'a');
      const ceoHardAsk     = chose('D05-CEO-1', 'c');
      const ceoZweitbank   = chose('D05-CEO-1', 'd') || chose('D03-CEO-2', 'a') || chose('D03-CEO-2', 'e');
      const covBridgeReady = chose('D05-CFO-1', 'a') || chose('D05-CFO-1', 'd');
      const dailyReporting = chose('D01-CFO-4', 'b') || chose('D01-CFO-4', /Daily Short-Report/i);
      const packReady      = chose('D04-CFO-4', 'a') || chose('D04-CFO-4', 'b');
      const payrollSecured = chose('D05-CFO-3', 'a') || chose('D05-CFO-3', 'b');

      let s = 'Das Bankgespräch ist abgeschlossen. Erwartet werden verbindliche Meilensteine, eine belastbare 13‑Wochen‑Cash‑Brücke und konsistentes Reporting. ';
      if (ceoConcrete)  s += 'Sie haben konkrete Zusagen abgegeben; die Messlatte für Umsetzung und Nachweise liegt entsprechend hoch. ';
      if (ceoGeneric)   s += 'Allgemeine Zusagen ohne Daten wurden kritisch aufgenommen – Nachreichungen heute priorisieren. ';
      if (ceoHardAsk)   s += 'Die Forderung nach einer Linienerhöhung stieß auf Zurückhaltung; zunächst zählen sichtbare Fortschritte. ';
      if (ceoZweitbank) s += 'Die Erwähnung einer Zweitbank als Option wurde registriert – als Vorsorge, nicht als Drohung. ';
      s += covBridgeReady ? 'Die vorgelegte Covenant‑Bridge (inkl. Sensitivitäten/Plausibilisierung) stützt die Argumentation. ' : 'Bitte vollständige Covenant‑Bridge mit Sensitivitäten unverzüglich nachreichen. ';
      s += dailyReporting ? 'Daily‑Short‑Reports plus Weekly‑Detail bleiben gesetzt. ' : 'Die Bank erwartet engmaschigeres Reporting (mindestens Daily/Weekly). ';
      s += packReady ? 'Das Reporting‑Pack wirkte konsistent; Annahmen und KPI‑Bridge wurden nachvollzogen. ' : 'Ein kompaktes Executive‑Summary mit KPI‑Bridge wird zusätzlich erbeten. ';
      s += payrollSecured ? 'Positiv vermerkt: Absicherung des Lohnlaufs. ' : '';
      return s.trim();
    }
  },
  {
    id: 'N5-2',
    day: 5,
    title: 'S&L‑Entscheidung im Fokus – Markt spekuliert',
    source: 'press',
    severity: 'low',
    isImportant: false,
    content: 'Rund um einen möglichen Sale‑&‑Leaseback kursieren Gerüchte über einen kurzfristigen Liquiditätshebel.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const acceptNow   = chose('D05-CEO-2', 'a');
      const negotiate48 = chose('D05-CEO-2', 'b');
      const delayPayroll= chose('D05-CEO-2', 'c');
      const rejectSNL   = chose('D05-CEO-2', 'd');
      const earlyPrep   = chose('D01-CEO-4', 'a') || chose('D01-CEO-4', 'b');

      let s = 'Im Umfeld wird über einen S&L‑Deal spekuliert. ';
      if (acceptNow)    s += 'Der Abschluss wird intern vorbereitet; externe Kommunikation erst nach Unterzeichnung. Bank wertet gehobenen Cash‑Puffer positiv, trotz höherer Fixkosten. ';
      else if (negotiate48) s += 'Es laufen Nachverhandlungen (48 h). Bitte Bank/Belegschaft über Timing informieren, um Spekulationen zu vermeiden. ';
      else if (delayPayroll) s += 'Die Vertagung auf nach dem Lohnlauf erfordert Begründung gegenüber der Bank. ';
      else if (rejectSNL)    s += 'Der Verzicht reduziert den kurzfristigen Runway – alternative Hebel (Factoring/Fördermittel/Asset‑Verkauf) gewinnen an Gewicht. ';
      s += earlyPrep ? 'Die seit Tag 1 angestoßene S&L‑Spur erleichtert nun die Umsetzung. ' : 'Da S&L bisher nur sondiert wurde, sind Datenraum und Leasing‑Terms zügig nachzuarbeiten.';
      return s.trim();
    }
  },
  {
    id: 'N5-3',
    day: 5,
    title: 'Key Accounts verlangen klares Signal zur Liefersicherheit',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Vertragsverlängerungen hängen von verbindlichen Terminzusagen und Priorisierung bei Engpässen ab.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const extendBonus = chose('D05-CEO-4', 'a');
      const serviceVchr = chose('D05-CEO-4', 'b');
      const discountNow = chose('D05-CEO-4', 'c');
      const noProgram   = chose('D05-CEO-4', 'd');
      const nightLog    = chose('D04-OPS-3', 'a') || chose('D04-OPS-3', 'b') || chose('D04-OPS-3', 'd');
      const qualTight   = chose('D02-OPS-4', 'a') || chose('D02-OPS-4', 'd');

      let s = 'Kunden erwarten heute eine eindeutige Einordnung zu Terminrisiken, Kompensation und Priorisierung. ';
      if (extendBonus) s += 'Angebotene Laufzeitverlängerungen gegen Bonus kommen an – Servicelevel verbindlich zusichern. ';
      else if (serviceVchr) s += 'Servicegutscheine wirken vertrauensbildend, wenn sie an konkrete Meilensteine geknüpft sind. ';
      else if (discountNow) s += 'Sofortrabatte erhöhen Zustimmung, drücken aber Marge – Kappung und Laufzeit definieren. ';
      else if (noProgram)   s += 'Ohne Bindungsprogramm steigt das Risiko von Testverlagerungen. ';
      s += nightLog  ? 'Nacht-/Expresslogistik kann als Kompensation angeboten werden. ' : '';
      s += qualTight ? 'Das verschärfte Qualitätsgate adressiert Reklamationssorgen – bitte explizit benennen. ' : '';
      return s.trim();
    }
  },
  {
    id: 'N5-4',
    day: 5,
    title: 'Belegschaft fragt nach Lohnlauf – Erwartungsmanagement nötig',
    source: 'internal',
    severity: 'high',
    isImportant: true,
    content: 'Pünktliche und vollständige Zahlung wird aktiv hinterfragt.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const fullCover   = chose('D05-CFO-3', 'a');
      const partial80   = chose('D05-CFO-3', 'b');
      const bankBridge  = chose('D05-CFO-3', 'd');
      const townhallNow = chose('D05-HRLEGAL-1', 'c') || chose('D03-HRLEGAL-1', 'a');

      let s = 'Im Intranet häufen sich Fragen zum anstehenden Lohnlauf. ';
      if (fullCover) s += 'Die Volldeckung des Payroll‑Kontos kann heute proaktiv kommuniziert werden. ';
      else if (partial80) s += 'Die 80 %‑Deckung ist akzeptabel, sofern der Nachzahltermin verbindlich genannt wird. ';
      else if (bankBridge) s += 'Die angefragte Bank‑Überbrückung bitte zeitnah bestätigen – sonst alternative Sicherung kommunizieren. ';
      else s += 'Ohne klare Absicherung steigt die Nervosität – Payroll in den Zahlungsfreigaben priorisieren. ';
      s += townhallNow ? 'Eine Townhall mit Q&A stabilisiert die Lage.' : 'Ein kurzes HR‑Memo (FAQ, Ansprechpartner, Termine) reduziert Gerüchte.';
      return s.trim();
    }
  },
  {
    id: 'N5-5',
    day: 5,
    title: 'Regional‑TV bittet um kurze Stellungnahme',
    source: 'press',
    severity: 'medium',
    isImportant: true,
    content: 'Beitrag zu Bankgespräch, Lieferfähigkeit und Beschäftigung geplant. Anfrage ging an VP Communications',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const letterSent  = chose('D05-CEO-3', 'c');
      const internalOnly= chose('D05-CEO-3', 'b');
      const noComm      = chose('D05-CEO-3', 'a');
      const liOptimism  = chose('D05-CEO-3', 'd');
      const soberStyle  = chose('D02-CEO-1', 'd');

      let s = 'Der Sender erbittet 2–3 O‑Töne. ';
      s += letterSent   ? 'Nutzen Sie die Kernbotschaften aus dem Brief an Belegschaft/Key Accounts – mediengerecht verdichtet. ' : '';
      s += internalOnly ? 'Bisher erfolgte nur ein internes Update; ohne äußere Einordnung prägen Dritte das Narrativ. ' : '';
      s += noComm       ? 'Ein kurzes, faktenbasiertes Statement ist besser als Schweigen. ' : '';
      s += liOptimism   ? 'Ein optimistischer Social‑Post benötigt belastbare Zahlen, sonst drohen kritische Rückfragen im Beitrag. ' : '';
      s += soberStyle   ? 'Der nüchterne Stil aus Tag 2 hat funktioniert – bleiben Sie konsistent.' : '';
      return s.trim();
    }
  },
  {
    id: 'N5-6',
    day: 5,
    title: 'Fördermittel‑Vorprüfung fällt grundsätzlich positiv aus',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Programmträger sieht prinzipielle Förderfähigkeit – Vollantrag kurzfristig möglich.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const applyA = chose('D05-CFO-2', 'a');
      const applyB = chose('D05-CFO-2', 'b');
      const applyD = chose('D05-CFO-2', 'd');

      let s = 'Die fachliche Vorprüfung ist positiv. ';
      if (applyA) s += 'Mit externer Unterstützung ist der Vollantrag in Arbeit; Kofinanzierung und Meilensteine bitte klarziehen. ';
      else if (applyD) s += 'Externe Antragstellung (hohe Erfolgswahrscheinlichkeit) angestoßen; Governance wirkt bankenseitig positiv. ';
      else if (applyB) s += 'Die interne Skizze liefert eine Basis, erfordert aber bald detaillierte Unterlagen. ';
      else s += 'Ohne Antrag droht ein wichtiger Vertrauens‑ und Liquiditätshebel ungenutzt zu bleiben. ';
      s += 'Kommunikation: Zukunftsfähigkeit betonen, ohne Versprechen zum Auszahlungstiming.';
      return s.trim();
    }
  },
  {
    id: 'N5-7',
    day: 5,
    title: 'Spediteur erhebt Dieselzuschlag für Eilsendungen',
    source: 'supplier',
    severity: 'medium',
    isImportant: true,
    content: 'Kostensteigerung bei Express‑/Nachtlogistik angekündigt.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const nightLog = chose('D04-OPS-3', 'a') || chose('D04-OPS-3', 'b') || chose('D04-OPS-3', 'd');

      let s = 'Der Stammspediteur führt kurzfristig einen Dieselzuschlag für Eiltransporte ein. ';
      s += nightLog
        ? 'Da Sonderlogistik bereits genutzt wird, werden Mehrkosten spürbar – Einsatzkriterien bitte schärfen. '
        : 'Mehrkosten betreffen vor allem spontane Eilaufträge – Schwellenwerte definieren. ';
      s += 'Optionen: Pauschale verhandeln, Kunden anteilig beteiligen, Pönale‑Risiko gegen Transportkosten abwägen.';
      return s.trim();
    }
  },
  {
    id: 'N5-8',
    day: 5,
    title: 'Compliance‑Hinweis eingegangen – Freigaben im Fokus',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Anonyme Meldung zum Umgang mit Lieferantenstopp und Zahlungspriorisierung.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const chose = (id: string, test: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === test || (test instanceof RegExp && test.test(String(e?.choiceLabel || e?.label || '')))));
      const training   = chose('D04-HRLEGAL-3', 'a') || chose('D04-HRLEGAL-3', 'd');
      const protocol   = chose('D03-HRLEGAL-4', 'a') || chose('D03-HRLEGAL-4', 'd') || chose('D03-HRLEGAL-4', 'e');
      const limits     = chose('D03-CFO-4', 'a') || chose('D03-CFO-4', 'd');

      let s = 'Das Hinweisgebersystem meldet Bedenken zu Freigabe‑/Priorisierungsprozessen. ';
      s += protocol ? 'Transparenzprotokoll/Audit helfen bei der Aufklärung. ' : 'Ohne dokumentierte Gleichbehandlung besteht Interpretationsspielraum – Interim‑Dokumentation anlegen. ';
      s += training ? 'Schulung/Auditoren schaffen Glaubwürdigkeit. ' : '';
      s += limits ? 'Verweisen Sie auf formale Limits und Board‑Ausnahmen zur Einordnung. ' : '';
      s += 'Rückmeldung an Hinweisgeber fristgerecht dokumentieren.';
      return s.trim();
    }
  },
  // Füllmeldungen (ohne Detailfenster)
  { id: 'N5-9',  day: 5, title: 'Kurzzeitige Netzwerklatenzen im Intranet',    source: 'internal', severity: 'low', isImportant: false, content: 'IT meldet sporadische Verzögerungen bei Intranet‑Zugriffen.', suppressHints: true },
  { id: 'N5-10', day: 5, title: 'Zufahrt Nord wegen Baustelle eingeschränkt', source: 'internal', severity: 'low', isImportant: false, content: 'Die Reparatur des Nord‑Tores dauert an. Lkw bitte über Osttor anfahren; Verzögerungen möglich.', suppressHints: true },
  { id: 'N5-11', day: 5, title: 'Erhöhter Geräuschpegel in Halle 1',          source: 'internal', severity: 'low', isImportant: false, content: 'HVAC‑Wartung (Filtertausch) verursacht bis 14:00 Uhr erhöhte Lautstärke.', suppressHints: true },
  { id: 'N5-12', day: 5, title: 'E‑Mail‑Spamwelle – Quarantäne strenger',      source: 'internal', severity: 'low', isImportant: false, content: 'Filterregeln wurden verschärft; einzelne legitime Mails können verzögert zugestellt werden.', suppressHints: true }
];
