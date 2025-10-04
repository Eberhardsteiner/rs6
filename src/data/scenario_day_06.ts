// src/data/scenario_day_06.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [];
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [];
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [];

/**
 * TAG 6 — 16 Entscheidungsblöcke (je 4 pro Rolle)
 * Fortsetzung: Auflagenbrief der Bank, S&L-LOI & Due Diligence, Payroll T-3, Kurzarbeit
 */

const CEO_BLOCKS: DecisionBlock[] = [{
  id: 'D06-CEO-1',
  day: 6,
  role: 'CEO',
  title: 'Auflagenbrief der Bank – Verpflichtungen zeichnen',
  context: 'Die Bank hat den Auflagenbrief übermittelt. Meilensteine, Reportingfrequenzen und Trigger sind definiert.',
  dilemma: 'Glaubwürdigkeit durch klare Zusagen vs. Flexibilität in der Umsetzung',
  hiddenAgendaHint: 'Frühe Unterschrift mit realistischen Milestones steigert Bankvertrauen spürbar.',
  options: [
    { id: 'a', label: 'Brief umgehend zeichnen; Milestones intern verankern', kpiDelta: {  workforceEngagement: -3, bankTrust: +7, publicPerception: +1, customerLoyalty: +2 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Zeichnen mit Vorbehalt; 2 Punkte nachverhandeln', kpiDelta: { bankTrust: +2 } },
    { id: 'c', label: 'Zeichnung verzögern; Alternativen sondieren', kpiDelta: { bankTrust: -3, customerLoyalty: -1 } },
    { id: 'd', label: 'Ablehnen; Zweitbank aktiv anspielen', kpiDelta: { bankTrust: -4, publicPerception: -1, customerLoyalty: -1 } }
  ],
  attachments: ['banktermin_sprechzettel_tag5.pdf']
}, {
  id: 'D06-CEO-2',
  day: 6,
      role: 'CEO',
    title: 'TV-Interview',
    context: 'Fernsehsender fragt Interview an',
    dilemma: 'Offenheit vs. Darlegung sensibler Daten',
    hiddenAgendaHint: 'Konsistente Botschaften verhindern Gerüchte.',
    options: [{ id: 'a', label: 'Ablehnen: Kein Interview',                                     kpiDelta: { workforceEngagement: -2, publicPerception: -4, customerLoyalty: -3, bankTrust: -2 } },
{ id: 'b', label: 'Nur schriftliches Statement',                                       kpiDelta: { workforceEngagement: -1, publicPerception: -1, customerLoyalty: +1, bankTrust: +1} },
{ id: 'c', label: 'Interview zusagen',      kpiDelta: { workforceEngagement: +4, customerLoyalty: +2, publicPerception: +1, bankTrust: +1 } },
{ id: 'd', label: 'Interview im Werk anbieten, Dokumentation, rundum Betreuung',                        kpiDelta: { publicPerception: +3, bankTrust: +2, workforceEngagement: +2, customerLoyalty: +3 } }],
     attachments: ['d06_ceo_medienstrategie_woche2_tag6.pdf']
}, {
  id: 'D06-CEO-3',
  day: 6,
  role: 'CEO',
  title: 'Key-Account-Roundtable einberufen',
  context: 'Top-10-Kunden fordern Lieferplan und Eskalationslogik für Engpässe.',
  dilemma: 'Kundenbindung durch Offenheit vs. Preisgabe von Priorisierungskriterien',
  hiddenAgendaHint: 'Transparente, DB-basierte Priorisierung beruhigt A-Kunden.',
  options: [
    { id: 'a', label: 'Virtuellen Roundtable diese Woche durchführen', kpiDelta: { customerLoyalty: +5, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Gezielte Executive-Calls statt Roundtable', kpiDelta: { customerLoyalty: +3 } },
    { id: 'c', label: 'Schriftliche Information ohne Q&A', kpiDelta: { customerLoyalty: +1 } },
    { id: 'd', label: 'Abwarten; Vertrieb regelt bilateral', kpiDelta: { customerLoyalty: -2 } }
  ],
  attachments: ['d06_ceo_keyaccount_roundtable_tag6.pdf']
}, {
  id: 'D06-CEO-4',
  day: 6,
  role: 'CEO',
  title: 'Stakeholder-Roadmap Q3/Q4 publizieren',
  context: 'Interne und externe Anspruchsgruppen erwarten verlässliche Roadmap.',
  dilemma: 'Verbindlichkeit vs. Risiko von Abweichungen',
  hiddenAgendaHint: 'Konkrete 60/90-Tage-Schritte schaffen Orientierung.',
  options: [
    { id: 'a', label: 'Nur intern (Führungskreis) publizieren', kpiDelta: { workforceEngagement: +2 } },
    { id: 'b', label: 'Roadmap intern & an Bank/Kernkunden freigeben', kpiDelta: { bankTrust: +3, customerLoyalty: +2, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Nur grobe Leitplanken kommunizieren', kpiDelta: { publicPerception: +1, customerLoyalty: -2 } },
    { id: 'd', label: 'Keine Roadmap veröffentlichen', kpiDelta: { publicPerception: -2, customerLoyalty: -4 } }
  ],
  attachments: ['d06_ceo_stakeholder_roadmap_q3q4_tag6.pdf']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
  id: 'D06-CFO-1',
  day: 6,
  role: 'CFO',
  title: 'Accounts Payable-Steuerung (AP-Steuerung): Zahlungsstopp für nichtkritische Posten',
  context: 'Cash-Schonung bis Payroll T7; Priorisierung nach Kritikalität/DB.',
  dilemma: 'Liquiditätsdisziplin vs. Lieferantenbeziehungen',
  hiddenAgendaHint: 'Transparente Kriterien + Zahlungspläne verhindern Eskalation.',
  options: [
    { id: 'a', label: 'Sofortiger Stopp nichtkritischer AP; Plan kommunizieren', kpiDelta: { cashEUR: +75000, bankTrust: +1, publicPerception: -1, customerLoyalty: -4 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Selektive Zahlungen nach DB/Kritikalität', kpiDelta: { cashEUR: +40000, customerLoyalty: -2 } },
    { id: 'c', label: 'Business as usual (kein Stopp)', kpiDelta: { cashEUR: 0, bankTrust: -4 } },
    { id: 'd', label: 'Ratenpläne mit Top-5-Lieferanten vereinbaren', kpiDelta: { cashEUR: +50000, bankTrust: +1, customerLoyalty: -1, workforceEngagement: -1 } }
  ],
  attachments: ['d06_cfo_apsteuerung_tag6.pdf']
}, {
  id: 'D06-CFO-2',
  day: 6,
  role: 'CFO',
  title: 'Vorauszahlungen Top-10 Kunden – Cash gegen Rabatt',
  context: 'Kurzfristiger Cashbedarf; offene Aufträge bei Top-10 Kunden.',
  dilemma: 'Liquidität jetzt vs. Marge/Kundenbindung',
  hiddenAgendaHint: 'Bank honoriert planbare Cash-Zuflüsse; aggressive Rabatte schwächen Marge.',
  options: [
    { id: 'a', label: '10 % Rabatt gegen 100 % Vorkasse auf laufende Aufträge', kpiDelta: { cashEUR: +300000, profitLossEUR: -45000, bankTrust: +1, customerLoyalty: -1 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true },
    { id: 'b', label: '5 % Rabatt gegen 50 % Vorkasse (Top-5 Kunden)', kpiDelta: { cashEUR: +150000, profitLossEUR: -25000, bankTrust: +1 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true },
    { id: 'c', label: 'Meilenstein-Rechnungsstellung vorziehen (ohne Rabatt)', kpiDelta: { cashEUR: +80000, bankTrust: +1 },
      variance: 0.5, execLeakage: 0.3 },
    { id: 'd', label: 'Keine Vorziehen/Keine Rabatte', kpiDelta: { bankTrust: -1 } }
  ],
  attachments: ['d06_cfo_vorauszahlungen_tag6.pdf']
}, {
  id: 'D06-CFO-3',
  day: 6,
  role: 'CFO',
  title: 'Abgaben-/Sozialversicherungs-Stundung',
  context: 'Engpass in 7–14 Tagen; erhebliches Volumen aus LSt/SV fällig.',
  dilemma: 'Rechtssicherheit/Reputation vs. Cash-Entlastung',
  hiddenAgendaHint: 'Transparente Stundung mit Bescheid ist bankenseitig akzeptabler als „stilles" Verzögern.',
  options: [
    { id: 'a', label: 'Offizielle Stundung LSt/SV für 3 Monate beantragen', kpiDelta: { cashEUR: +180000, bankTrust: +1, publicPerception: -2, workforceEngagement: -1 },
      variance: 0.6, execLeakage: 0.6, isTradeOff: true },
    { id: 'b', label: 'Teilzahlung (50 %) und Stundung des Restes', kpiDelta: { cashEUR: +90000, publicPerception: 0, workforceEngagement: -1 },
      variance: 0.5, execLeakage: 0.4 },
    { id: 'c', label: 'Inoffiziell verzögern ohne Antrag', kpiDelta: { cashEUR: +180000, bankTrust: -5, publicPerception: -3, workforceEngagement: -3 },
      variance: 0.9, execLeakage: 0.9, isTradeOff: true },
    { id: 'd', label: 'Fristgerecht vollständig zahlen', kpiDelta: { bankTrust: +1, publicPerception: +2 } }
  ],
  attachments: ['d06_cfo_abgabenstundung_tag6.pdf']
}, {
  id: 'D06-CFO-4',
  day: 6,
  role: 'CFO',
  title: 'Factoring-Pilot mit Top-Forderungen',
  context: 'Liquiditätshebel über selektives Factoring möglich.',
  dilemma: 'Kosten/Abschlag vs. Cash-Soforteffekt',
  hiddenAgendaHint: 'Silent-Assignment reduziert Irritation bei Kunden.',
  options: [
    { id: 'a', label: 'Pilot 250k, Silent-Assignment', kpiDelta: { cashEUR: +225000, profitLossEUR: -25000, bankTrust: +2 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur 100k pilotieren', kpiDelta: { cashEUR: +90000, profitLossEUR: -10000 } },
    { id: 'c', label: 'Kein Factoring', kpiDelta: { bankTrust: -1 } },
    { id: 'd', label: 'Vollprogramm (>500k) sofort', kpiDelta: { cashEUR: +450000, profitLossEUR: -50000, bankTrust: +2, publicPerception: -1 } }
  ],
  attachments: ['d06_cfo_factoringpilot_tag6.pdf']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
  id: 'D06-OPS-1',
  day: 6,
  role: 'OPS',
  title: 'Dual-Sourcing für kritische Teile beschleunigen',
  context: 'Engpasslieferant fordert Vorkasse; Alternativquelle in Qualifizierung.',
  dilemma: 'Schnelligkeit vs. Qualitäts-/Freigaberisiken',
  hiddenAgendaHint: 'Geführte PPAP/Erstmuster reduzieren Reklamationsrisiko.',
  options: [
    { id: 'a', label: 'Express-Qualifizierung neuer Lieferant & Pilotcharge freigeben', kpiDelta: { profitLossEUR: -6000, customerLoyalty: +3 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Dual-Sourcing vorbereiten, Start in 3 Wochen', kpiDelta: { customerLoyalty: +1 } },
    { id: 'c', label: 'Nur Hauptlieferant, Vorkasse akzeptieren', kpiDelta: { cashEUR: -18000, bankTrust: -1 } },
    { id: 'd', label: 'Fremdfertigung kurzfristig teurer zukaufen, keine langfristige Bindung', kpiDelta: { profitLossEUR: -10000, customerLoyalty: +2 } }
  ],
  attachments: ['d06_ops_dual_sourcing_ppap_plan_tag6.pdf']
}, {
  id: 'D06-OPS-2',
  day: 6,
  role: 'OPS',
  title: 'Schichtmodell anpassen (Kurzarbeit vs. Spitzenabdeckung)',
  context: 'Volatilität: Teilbereiche ohne Material, andere überlastet.',
  dilemma: 'Kostenstabilität vs. Liefertermintreue',
  hiddenAgendaHint: 'Gezielte Flex-Teams stabilisieren Engpassbereiche.',
  options: [
    { id: 'a', label: 'Kurzarbeit in Stillstandsbereichen, Flex-Pool für Engpässe', kpiDelta: { cashEUR: 15000, profitLossEUR: +15000, workforceEngagement: +2 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Überstunden in kritischen Linien, Rest Normalbetrieb', kpiDelta: { cashEUR: -8000, profitLossEUR: -8000, customerLoyalty: +2 } },
    { id: 'c', label: 'Status quo beibehalten', kpiDelta: { customerLoyalty: -1, workforceEngagement: -2 } },
    { id: 'd', label: 'Temporäre Leiharbeitskräfte für 2 Wochen', kpiDelta: { cashEUR: -17000, profitLossEUR: -17000, customerLoyalty: +2, workforceEngagement: -4, bankTrust: -1 } }
  ],
  attachments: ['d06_ops_schichtmodell_flexpool_beschluss_tag6.pdf']
}, {
  id: 'D06-OPS-3',
  day: 6,
  role: 'OPS',
  title: 'Reklamationswelle eindämmen (Containment)',
  context: 'Weiterer Anstieg Reklamationen in zwei Produktfamilien.',
  dilemma: 'Schnelle Eindämmung vs. Kosten/Nacharbeit',
  hiddenAgendaHint: 'Image-Schaden verhindern.',
  options: [
    { id: 'a', label: '100 %-Prüfung temporär', kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, publicPerception: +2, customerLoyalty: +2, workforceEngagement: -4 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Gezielte Stichprobe, Sperrbestände separieren', kpiDelta: { customerLoyalty: +1, workforceEngagement: -2 } },
    { id: 'c', label: 'Keine Zusatzmaßnahmen', kpiDelta: { publicPerception: -2, customerLoyalty: -4 } },
    { id: 'd', label: 'Kunden-Liaison-Engineer einsetzen ', kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, customerLoyalty: +2, workforceEngagement: -4, publicPerception: +1 } }
  ],
  attachments: ['d06_ops_containment_qs_programm_tag6.pdf']
}, {
  id: 'D06-OPS-4',
  day: 6,
  role: 'OPS',
  title: 'Spediteur: Dieselzuschlag verhandeln',
  context: 'Express/Nachtsendungen verteuern sich; Risiko Margendruck.',
  dilemma: 'Servicegrad vs. Kostendisziplin',
  hiddenAgendaHint: 'Pauschalen und klare Einsatzkriterien sichern Marge.',
  options: [
    { id: 'a', label: 'Pauschale mit Cap vereinbaren', kpiDelta: { profitLossEUR: -2000 } },
    { id: 'b', label: 'Einsatzkriterien auf A-Kunden/Pönale beschränken', kpiDelta: { profitLossEUR: -1000, customerLoyalty: +1 } },
    { id: 'c', label: 'Zuschlag akzeptieren, keine Änderung', kpiDelta: { profitLossEUR: -4000 } },
    { id: 'd', label: 'Kunden an Mehrkosten beteiligen', kpiDelta: { profitLossEUR: -1500, customerLoyalty: -4, publicPerception: -1 } }
  ],
  attachments: ['d06_ops_spediteur_dieselzuschlag_positionspapier_tag6.pdf']
}];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
  id: 'D06-HRLEGAL-1',
  day: 6,
  role: 'HRLEGAL',
  title: 'Teilverkauf Tochter – Mitbestimmung & Betriebsübergang',
  context: 'Teilverkauf (Minority/Carve-out) wird vorbereitet; Rechte von BR/Gesellschaftern  tangiert.',
  dilemma: 'Transaktionsgeschwindigkeit vs. Akzeptanz/Arbeitsrechtssicherheit',
  hiddenAgendaHint: 'Frühe Einbindung erhöht Bankvertrauen und senkt spätere Konfliktkosten.',
  options: [
    { id: 'a', label: 'BR frühzeitig beteiligen + Interessenausgleich/Sozialplan prüfen + Informationspaket', kpiDelta: { bankTrust: +3, workforceEngagement: +2, profitLossEUR: -6000, publicPerception: +1 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true },
    { id: 'b', label: 'Nur rechtliche Grundprüfung intern; BR nach Term Sheet informieren', kpiDelta: { bankTrust: +1, workforceEngagement: -3 },
      variance: 0.5, execLeakage: 0.4 },
    { id: 'c', label: 'Carve-out technisch vorbereiten (Ohne BR/§613a-Kommunikation)', kpiDelta: { bankTrust: -2, publicPerception: -1, workforceEngagement: -4 },
      variance: 0.7, execLeakage: 0.7 },
    { id: 'd', label: 'Teilverkauf vorerst stoppen; erst nach Banktermin entscheiden', kpiDelta: { bankTrust: -3 } }
  ],
  attachments: ['d06_hrlegal_betriebsuebergang_br_info_tag6.pdf']
}, {
  id: 'D06-HRLEGAL-2',
  day: 6,
  role: 'HRLEGAL',
  title: 'BR-Vereinbarung Kommunikationsgrundsätze',
  context: 'Uneinheitliche Botschaften; Risiko von Leaks und Gerüchten.',
  dilemma: 'Transparenz vs. Kommunikationskontrolle',
  hiddenAgendaHint: 'Klare Freigabewege schaffen Vertrauen und Compliance.',
  options: [
    { id: 'a', label: 'Gemeinsame Guideline mit BR verabschieden', kpiDelta: { workforceEngagement: +4, publicPerception: +1 } },
    { id: 'b', label: 'Nur Reminder an FK ohne formale Vereinbarung', kpiDelta: { workforceEngagement: +1 } },
    { id: 'c', label: 'Keine Regelung', kpiDelta: { publicPerception: -1 } },
    { id: 'd', label: 'Strikte Verbote andeuten', kpiDelta: { workforceEngagement: -3, publicPerception: -2 } }
  ],
  attachments: ['d06_hrlegal_betriebsvereinbarung_kommunikation_tag6.pdf']
}, {
  id: 'D06-HRLEGAL-3',
  day: 6,
  role: 'HRLEGAL',
  title: 'Teilverkauf Tochter – SPA-Klauseln & Haftungsrahmen',
  context: 'Vorbereitung der Vertragsdokumente (SPA/Anteilskauf); Verhandlungslinie zwischen Käuferinteressen und Schutzbedürfnis.',
  dilemma: 'Risikobegrenzung vs. Deal-Geschwindigkeit/Preis',
  hiddenAgendaHint: 'Ausgewogener Haftungsrahmen und W&I-Option stärken Bankvertrauen.',
  options: [
    { id: 'a', label: 'Balanced: Haftungscap 20 % / Escrow 10 % / MAC präzise / W&I light prüfen', kpiDelta: { bankTrust: +2, profitLossEUR: -10000, publicPerception: +1 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true },
    { id: 'b', label: 'Buyer-friendly: breites Reps/No W&I/MAC weit – schneller Abschluss', kpiDelta: { bankTrust: +1, profitLossEUR: -15000, workforceEngagement: -1 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true },
    { id: 'c', label: 'Seller-friendly: enge Reps/Cap 10 %/kein Escrow – längere Verhandlung', kpiDelta: { bankTrust: -2, workforceEngagement: +1 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true },
    { id: 'd', label: 'SPA erst nach verbindlichem Angebot (LOI+) ausformulieren', kpiDelta: { bankTrust: -2 },
      variance: 0.4, execLeakage: 0.3 }
  ],
  attachments: ['d06_hrlegal_spa_haftungsrahmen_notiz_tag6.pdf']
}, {
  id: 'D06-HRLEGAL-4',
  day: 6,
  role: 'HRLEGAL',
  title: 'DD-Datenraum & Datenschutz-Freigaben',
  context: 'Für S&L/Investor-DD müssen sensible Dokumente bereitgestellt werden.',
  dilemma: 'DD-Schnelligkeit vs. Datenschutz/Vertragsbindung',
  hiddenAgendaHint: 'Redaktionsleitfaden & Zugriffsmatrix vermeiden Folgerisiken.',
  options: [
    { id: 'a', label: 'Zugriffsmatrix + Redaktionsleitfaden freigeben', kpiDelta: { bankTrust: +2, publicPerception: +1, profitLossEUR: -800 }, isTradeOff: true },
    { id: 'b', label: 'Nur Minimalzugriff, Freigaben ad hoc', kpiDelta: { bankTrust: +1 } },
    { id: 'c', label: 'Datenraum verzögern', kpiDelta: { bankTrust: -2 } },
    { id: 'd', label: 'Externe DPO-Prüfung ergänzen', kpiDelta: { profitLossEUR: -20000, bankTrust: +1 } }
  ],
  attachments: ['d06_hrlegal_datenraum_redaktionsleitfaden_tag6.pdf']
}];

export const day6Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CFO_BLOCKS,
  ...OPS_BLOCKS,
  ...HRLEGAL_BLOCKS
];

// src/data/scenario_day_06.ts — NUR den News-Block ersetzen
export const day6News: DayNewsItem[] = [
  /**
   * Vier Kernmeldungen Tag 6
   */
  {
    id: 'N6-1',
    day: 6,
    title: 'Auflagenbrief der Bank liegt vor – „No surprises“ zählt jetzt',
    source: 'bank',
    severity: 'critical',
    isImportant: true,
    content: 'Meilensteine, Reporting‑Rhythmus und Abweichungs‑Trigger sind definiert.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (
          e.choice === t ||
          (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || e?.chosenOptionLabel || '')))
        ));

      const ceoT5_concrete   = picked('D05-CEO-1', 'b'); // konkrete Milestones zugesagt
      const ceoT5_generic    = picked('D05-CEO-1', 'a');
      const ceoT6_signNow    = picked('D06-CEO-1', 'a');
      const ceoT6_signCond   = picked('D06-CEO-1', 'b');
      const ceoT6_delayDecl  = picked('D06-CEO-1', 'c') || picked('D06-CEO-1', 'd');
      const covBridgeReady   = picked('D05-CFO-1', 'a') || picked('D05-CFO-1', 'd');
      const dailyReporting   = picked('D01-CFO-4', 'b') || picked('D01-CFO-4', /Daily Short-Report/i);
      const packReady        = picked('D04-CFO-4', 'a') || picked('D04-CFO-4', 'b');
      const payrollSecured   = picked('D05-CFO-3', 'a') || picked('D05-CFO-3', 'b');

      let s = 'Die Hausbank hat den Auflagenbrief geschickt: klare Milestones, wöchentliches Reporting, Trigger bei Abweichungen. ';
      if (ceoT5_concrete) s += 'Ihre Zusage aus Tag 5, mit konkreten Meilensteinen zu arbeiten, zahlt darauf ein. ';
      if (ceoT5_generic)  s += 'Allgemeine Zusagen aus Tag 5 wurden damals kritisch gesehen – heute zählt Substanz. ';
      s += covBridgeReady ? 'Die vorgelegte Covenant‑Bridge stützt die Glaubwürdigkeit. ' : 'Ohne vollständige Covenant‑Bridge drohen Nachfragen zur Annahmen‑Logik. ';
      s += dailyReporting ? 'Das bestehende Daily/Weekly‑Reporting dient als Vertrauensanker. ' : 'Ein engmaschiges Reporting‑Regime (Daily/Weekly) sollte eingerichtet werden. ';
      s += packReady ? 'Das Reporting‑Pack aus Tag 4 kann nahezu unverändert verwendet werden. ' : '';
      s += payrollSecured ? 'Positiv: Payroll‑Absicherung wurde vermerkt. ' : '';

      if (ceoT6_signNow)       s += 'Empfehlung: sofort zeichnen, Owner und Termine intern verankern, erste Proof‑Points in 7 Tagen liefern.';
      else if (ceoT6_signCond) s += 'Empfehlung: zwei Punkte sauber nachverhandeln, dann zeichnen – Begründung und Zeitschiene gegenüber der Bank dokumentieren.';
      else if (ceoT6_delayDecl) s += 'Achtung: Verzögerung oder Ablehnung verschlechtert das Risikoprofil – Alternativpfade (Zweitbank/Factoring) müssen dann belastbar sein.';
      return s.trim();
    }
  },
  {
    id: 'N6-2',
    day: 6,
    title: 'S&L: LOI‑Entwurf eingetroffen – Datenraum läuft an',
    source: 'internal',
    severity: 'high',
    isImportant: true,
    content: 'Der Partner sendet LOI und DD‑Anforderungsliste inkl. Fristen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));
      const acceptedT5  = picked('D05-CEO-2', 'a');
      const negoT5      = picked('D05-CEO-2', 'b');
      const rejectT5    = picked('D05-CEO-2', 'd');
      const dsMatrix    = picked('D06-HRLEGAL-4', 'a') || picked('D06-HRLEGAL-4', 'd');
      const govNDA      = picked('D05-HRLEGAL-2', 'a') || picked('D05-HRLEGAL-2', 'b');

      let s = 'Zum Sale‑&‑Leaseback liegt ein LOI‑Entwurf vor; die DD‑Liste fordert Finanz‑, Anlage‑ und Vertragsunterlagen mit kurzen Fristen. ';
      if (acceptedT5)     s += 'Nach dem Entscheid aus Tag 5 ist Tempo möglich – bitte Timeline und Closing‑Voraussetzungen mit Bank spiegeln. ';
      else if (negoT5)    s += 'Die Nachverhandlung aus Tag 5 sollte sich in den LOI‑Konditionen wiederfinden – Argumentation dokumentieren. ';
      else if (rejectT5)  s += 'Da S&L zuletzt verworfen wurde, ist der LOI als Option zu werten – Alternativpfade (Factoring/Fördermittel) priorisieren. ';
      s += dsMatrix ? 'Datenraum‑Zugriffsmatrix/DSGVO‑Freigaben sind vorbereitet – Upload nach Redaktionsleitfaden starten. ' : 'Bitte Zugriffsmatrix/DSGVO‑Freigaben festlegen, um spätere Sperren zu vermeiden. ';
      s += govNDA ? 'Die Mandats‑/NDA‑Governance von Tag 5 reduziert Leckagerisiko in der Due Diligence.' : '';
      return s.trim();
    }
  },
  {
    id: 'N6-3',
    day: 6,
    title: 'Key Accounts verlangen 60‑Tage‑Lieferplan',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Verträge werden von belastbaren Terminzusagen abhängig gemacht.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));
      const rtThisWeek = picked('D06-CEO-3', 'a');
      const execCalls  = picked('D06-CEO-3', 'b');
      const letterOnly = picked('D06-CEO-3', 'c');
      const noFormat   = picked('D06-CEO-3', 'd');
      const clientProg = picked('D05-CEO-4', 'a') || picked('D05-CEO-4', 'b') || picked('D05-CEO-4', 'c');
      const mixDB      = picked('D05-OPS-1', 'a') || picked('D05-OPS-1', 'b') || picked('D05-OPS-1', 'c');
      const nightLog   = picked('D04-OPS-3', 'a') || picked('D04-OPS-3', 'b') || picked('D04-OPS-3', 'd');

      let s = 'A‑Kunden bitten um einen realistischen 60‑Tage‑Plan plus Eskalationspfad für Engpässe. ';
      if (rtThisWeek)      s += 'Der Roundtable diese Woche schafft Sichtbarkeit: Engpassliste, Gegenmaßnahmen, Ansprechpartner. ';
      else if (execCalls)  s += 'Executive‑Calls funktionieren, wenn eine konsistente Engpassliste geteilt wird. ';
      else if (letterOnly) s += 'Eine reine Info ohne Q&A reduziert Rückfragen nicht – kurz ein Live‑Format einplanen. ';
      else if (noFormat)   s += 'Ohne Format drohen Volumenverlagerungen – proaktiv Termin anbieten. ';
      s += clientProg ? 'Das Kundenbindungsprogramm aus Tag 5 unterstützt die Verlängerungsgespräche. ' : '';
      s += mixDB ? 'Der angepasste Produktionsmix sollte transparent begründet werden (DB, A‑Kunden‑Priorität). ' : '';
      s += nightLog ? 'Nacht/Express‑Logistik kann als Kompensation bei kritischen Terminen angeboten werden.' : '';
      return s.trim();
    }
  },
  {
    id: 'N6-4',
    day: 6,
    title: 'Betriebsrat drängt auf Kurzarbeits‑Prüfung',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Für teilstillstehende Bereiche wird eine formale Anzeige vorbereitet.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));
      const hrTimingOK = picked('D04-HRLEGAL-1', 'b');
      const brTalks    = picked('D02-HRLEGAL-2', 'b');
      const flexAcc    = picked('D03-HRLEGAL-2', 'a') || picked('D03-HRLEGAL-2', 'e');
      const opsModel   = picked('D06-OPS-2', 'a') || picked('D06-OPS-2', 'b');

      let s = 'Der BR fordert Kriterien, Zeitachse und betroffene Bereiche für eine mögliche Kurzarbeit. ';
      s += brTalks ? 'Frühgespräche aus Tag 2 erleichtern die Abstimmung. ' : 'Ohne Vorabstimmung drohen Verzögerungen und Missverständnisse. ';
      s += flexAcc ? 'Die flexible BV/Arbeitszeitregelung aus Tag 3 liefert bereits einen Rahmen. ' : '';
      s += opsModel ? 'Das gewählte Schichtmodell (Flex‑Pool/Überstunden) ist in die Begründung aufzunehmen. ' : '';
      s += hrTimingOK ? 'Kommunikationsfenster: nach Banktermin – bitte BR vorab in die Sequenz einbinden.' : '';
      return s.trim();
    }
    
  },

  /**
   * Vier weitere kontextbezogene Geschichten (je eine pro Rolle)
   */
  {
    id: 'N6-5',
    day: 6,
    title: 'Fördermittelstelle fordert Nachweise an',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Capex‑Plan, Einsparnachweise und KMU‑Kriterien erbeten.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));
      const applyA = picked('D05-CFO-2', 'a');
      const applyB = picked('D05-CFO-2', 'b');
      const applyD = picked('D05-CFO-2', 'd');
      const dashboard = picked('D05-CFO-4', 'a') || picked('D05-CFO-4', 'b') || picked('D05-CFO-4', 'd');

      let s = 'Der Programmträger sieht grundsätzliche Förderfähigkeit und bittet um konsolidierte Unterlagen. ';
      s += applyA ? 'Externer Antrag ist unterwegs – Kofinanzierung/Meilensteine bitte klar dokumentieren. '
          : applyD ? 'Externe Antragstellung (hohe Erfolgswahrscheinlichkeit) läuft – Governance positiv. '
          : applyB ? 'Die interne Skizze ist ein Startpunkt, benötigt aber zügig Detailtiefe. '
          : 'Ohne Antrag bleibt ein wichtiger Liquiditäts‑ und Vertrauenshebel ungenutzt. ';
      s += dashboard ? 'Das KPI‑Dashboard liefert die nötige Datengrundlage für Nachweise und Sensitivitäten.' : '';
      return s.trim();
    }
  },
  {
    id: 'N6-6',
    day: 6,
    title: 'Regional‑TV terminiert Beitrag in zwei Tagen',
    source: 'press',
    severity: 'medium',
    isImportant: true,
    content: 'O‑Ton angefragt; Themen: Bankauflagen, Liefersituation, Beschäftigung.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));
      const mediaNone   = picked('D06-CEO-2', 'a');
      const mediaOpEd   = picked('D06-CEO-2', 'b');
      const mediaPR     = picked('D06-CEO-2', 'c');
      const mediaInter  = picked('D06-CEO-2', 'd');
      const letterSent  = picked('D05-CEO-3', 'c');

      let s = 'Der Sender bittet um 2–3 kurze Aussagen. ';
      s += mediaOpEd ? 'Ein Gastbeitrag mit Zahlenkorridor kann vorab gesetzt werden und gibt den Ton vor. ' : '';
      s += mediaPR   ? 'Eine sachliche Pressemitteilung schafft Basis, ersetzt aber kein O‑Ton‑Statement. ' : '';
      s += mediaInter? 'Fürs Interview bitte Q&A‑Leitfaden und No‑Gos bereitlegen. ' : '';
      s += mediaNone ? 'Ohne Statement prägen Dritte das Narrativ – ein kurzes, faktenbasiertes O‑Ton‑Fenster ist ratsam. ' : '';
      s += letterSent? 'Kernbotschaften aus dem Brief an Belegschaft/Key Accounts eignen sich als rote Linie.' : '';
      return s.trim();
    }
  },
  {
    id: 'N6-7',
    day: 6,
    title: 'Zweitlieferant bestätigt frühes Startfenster',
    source: 'supplier',
    severity: 'medium',
    isImportant: true,
    content: 'Pilotcharge in 2–3 Wochen bei schneller Freigabe möglich.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));
      const dualNow  = picked('D06-OPS-1', 'a');
      const dualPrep = picked('D06-OPS-1', 'b');
      const mainOnly = picked('D06-OPS-1', 'c');
      const outsource= picked('D06-OPS-1', 'd');
      const consignment = picked('D04-OPS-2', 'd');

      let s = 'Der alternative Lieferant ist grundsätzlich einsatzbereit – Voraussetzung sind PPAP/Erstmuster und eine kurze Freigabe‑Schleife. ';
      s += dualNow   ? 'Die Express‑Qualifizierung läuft – QS/Einkauf bitte täglich synchronisieren. ' : '';
      s += dualPrep  ? 'Die Vorbereitung ist im Plan; Freigabepunkte frühzeitig terminieren. ' : '';
      s += mainOnly  ? 'Bei Vorkasse am Hauptlieferanten bleibt das Ausfallrisiko – Alternative als Plan B bereithalten. ' : '';
      s += outsource ? 'Kurzfristige Fremdfertigung überbrückt – dennoch Dual‑Sourcing aufsetzen. ' : '';
      s += consignment ? 'Ein verhandeltes Konsignationslager senkt Vorfinanzierung und erleichtert den Ramp‑Up.' : '';
      return s.trim();
    }
  },
  {
    id: 'N6-8',
    day: 6,
    title: 'Compliance‑Vorprüfung gestartet – Freigabeprozesse im Blick',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Whistleblower‑Hinweis zu Zahlungs‑/Lieferantenprozessen wird triagiert.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));
      const protoOK  = picked('D03-HRLEGAL-4', 'a') || picked('D03-HRLEGAL-4', 'd') || picked('D03-HRLEGAL-4', 'e');
      const training = picked('D04-HRLEGAL-3', 'a') || picked('D04-HRLEGAL-3', 'd');
      const limits   = picked('D03-CFO-4', 'a') || picked('D03-CFO-4', 'd') || picked('D03-CFO-4', 'b');

      let s = 'Der anonyme Hinweis wird geprüft; Fokus liegt auf Gleichbehandlung, Dokumentation und Freigabewegen. ';
      s += protoOK ? 'Transparenzprotokoll/Auditspur erleichtern die Aufklärung. ' : 'Ohne Protokoll bitte kurzfristig eine Interim‑Dokumentation einführen. ';
      s += training ? 'Schulung/Auditoren erhöhen die Glaubwürdigkeit des Prozesses. ' : '';
      s += limits   ? 'Formale Limits und Board‑Ausnahmen bieten eine objektive Entscheidungsbasis.' : '';
      return s.trim();
    }
  },

  /**
   * Vier Füllmeldungen (ohne KPI‑Auswirkung, kein Detailfenster)
   */
  { id: 'N6-9',  day: 6, title: 'ÖPNV‑Warnstreik angekündigt',            source: 'internal', severity: 'low', isImportant: false, content: 'Pendler könnten morgen verspätet eintreffen; Shuttle wird geprüft.', suppressHints: true },
  { id: 'N6-10', day: 6, title: 'Zutrittsleser werden ausgetauscht',       source: 'internal', severity: 'low', isImportant: false, content: 'Kurzzeitige Zugangspausen an Tor West heute zwischen 13–15 Uhr.', suppressHints: true },
  { id: 'N6-11', day: 6, title: 'Wissensdatenbank: Suchfunktion instabil', source: 'internal', severity: 'low', isImportant: false, content: 'IT meldet sporadische Aussetzer; Indexierung läuft neu.', suppressHints: true },
  { id: 'N6-12', day: 6, title: 'Fototermin Imagebroschüre verschoben',    source: 'internal', severity: 'low', isImportant: false, content: 'Neuer Termin folgt; keine organisatorischen Maßnahmen nötig.', suppressHints: true },
   { id: 'N6-13', day: 6, title: 'Betriebsrat fordert Beteiligung am Verkaufsprozess',    source: 'internal', severity: 'high', isImportant: false, content: 'Der BR will eng in den Verkauf von UPA eingebunden werden.', suppressHints: true }
];
