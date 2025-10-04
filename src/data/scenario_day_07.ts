 // src/data/scenario_day_07.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [];
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [];
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [];

/**
 * TAG 7 — 20 Entscheidungsblöcke (je 5 pro Rolle)
 * Fokus: Payroll-Tag, Bank-Feedback, Kundenabsicherung, QS/Eskalation
 * Hinweis: Bestehende 16 Blöcke unverändert belassen; je Rolle ein 5. Block ergänzt (aus Tag-6-Zusatzinfos abgeleitet).
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D07-CEO-1',
    day: 7,
    role: 'CEO',
    title: 'Nachholung Payroll-Day – CEO-Statement',
    context: 'Löhne werden heute ausgezahlt. Chance für Vertrauensaufbau.',
    dilemma: 'Jubelbotschaft vs. nüchterne Stabilität',
    hiddenAgendaHint: 'Konsequente Realistik stärkt Glaubwürdigkeit.',
    options: [{ id: 'a', label: 'Nüchternes Statement + Dank an Team, pünkliche Zahlung doch möglich',          kpiDelta: { cashEUR: -560000, profitLossEUR: -560000, workforceEngagement: +5, publicPerception: +2 } },
{ id: 'b', label: 'Jubelbotschaft („alles sicher") ',             kpiDelta: { cashEUR: -560000, profitLossEUR: -560000, publicPerception: +3, workforceEngagement: +1, bankTrust: -2 } },
{ id: 'c', label: 'Kein Statement',                                kpiDelta: { cashEUR: -560000, profitLossEUR: -560000, workforceEngagement: -1, publicPerception: -1 } },
{ id: 'd', label: 'Auftakt-Botschaft: Dank + künftig Regelmäßige Meetings der Belegschaft mit dem Vorstand',                     kpiDelta: { cashEUR: -560000, profitLossEUR: -5600000, workforceEngagement: +6, publicPerception: +2, bankTrust: -1 } }],
    attachments: ['d07_ceo_gehaltsauszahlung_statement.pdf', 'd07_ceo_mitarbeiterkommunikation_strategie.pdf']
  },
{
    id: 'D07-CEO-2',
    day: 7,
    role: 'CEO',
    title: 'Kundenvertragsverlängerungen pushen',
    context: 'Unsicherheit hemmt Verlängerungen.',
    dilemma: 'Rabatt vs. Laufzeitbindung',
    hiddenAgendaHint: 'Längere Laufzeiten stabilisieren Auslastung.',
    options: [{ id: 'a', label: '2-Jahres-Verlängerung mit Servicebonus',       kpiDelta: { customerLoyalty: +5, profitLossEUR: -34000, workforceEngagement: +2, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: '1-Jahr-Verlängerung ohne Bonus',               kpiDelta: { customerLoyalty: +2, workforceEngagement: +1, bankTrust: +1 } },
{ id: 'c', label: 'Kein Push, nur reagieren',                      kpiDelta: { customerLoyalty: -1, workforceEngagement: -1, bankTrust: -2 } },
{ id: 'd', label: 'Rabatt-Offensive 3 %',                          kpiDelta: { customerLoyalty: +4, profitLossEUR: -56000, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['d07_ceo_kundenbindung_vertragsverlaengerung.pdf', 'd07_ceo_vertragsverlaengerung_vorlage.pdf']
  },
{
    id: 'D07-CEO-3',
    day: 7,
    role: 'CEO',
    title: 'Beirat berichtet an Bank',
    context: 'Bank bittet um Beiratseinschätzung.',
    dilemma: 'Unabhängigkeit vs. Koordination',
    hiddenAgendaHint: 'Abgestimmtes Messaging verhindert Missverständnisse.',
    options: [{ id: 'a', label: 'Gemeinsames Briefing mit CFO/Beirat, Vorbereitungsmeeting',           kpiDelta: { bankTrust: +4, cashEUR: -6000, profitLossEUR: -6000 },
  isTradeOff: true },
{ id: 'b', label: 'Beirat frei sprechen lassen',                   kpiDelta: { bankTrust: +1, publicPerception: +1, cashEUR: -3000, profitLossEUR: -3000  } },
{ id: 'c', label: 'Bankkontakt auf später verschieben',            kpiDelta: { bankTrust: -2, publicPerception: -1, workforceEngagement: -1 } },
{ id: 'd', label: 'Nur schriftliches Update',                      kpiDelta: { bankTrust: -1, publicPerception: -1 } }],
    attachments: ['d07_ceo_beirat_bank_briefing.pdf', 'd07_ceo_bankkommunikation_protokoll.pdf']
  },
{
    id: 'D07-CEO-4',
    day: 7,
    role: 'CEO',
    title: 'Strategische Optionen sondieren',
    context: 'Minority-Investor oder Carve-out im Gespräch.',
    dilemma: 'Fokus vs. optionaler Hebel',
    hiddenAgendaHint: 'Früh sondieren, leise agieren.',
    options: [{ id: 'a', label: 'Breite Marktansprache',                          kpiDelta: { publicPerception: +2, bankTrust: -2, workforceEngagement: -2,  customerLoyalty: -1 } },
            { id: 'b', label: 'Teaser an 2 Industriepartner (NDA)',            kpiDelta: { bankTrust: +2, publicPerception: +1 } },
{ id: 'c', label: 'Keine Sondierung',                               kpiDelta: { bankTrust: -2 } },
{ id: 'd', label: 'Nur interne Szenarienarbeit',                    kpiDelta: { bankTrust: +1 } }],
    attachments: ['d07_ceo_minority_sale_teaser.pdf', 'd07_ceo_nda_template.docx']
  },
  {
    id: 'D07-CEO-5',
    day: 7,
    role: 'CEO',
    title: 'TV-Auftritt: Format & Kernbotschaften',
    context: 'Regional-TV plant Beitrag. O-Ton angefragt; Deutungsrahmen sonst bei Dritten.',
    dilemma: 'Sichtbarkeit vs. Risiko kritischer Nachfragen',
    hiddenAgendaHint: 'Vorbereitetes Statement mit Zahlenkorridor reduziert Spekulation.',
    options: [
      { id: 'a', label: 'Live-Interview mit Q&A (professionelle Vorbereitung)',               kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, publicPerception: +6, bankTrust: +1, workforceEngagement: +2,  customerLoyalty: +1  },
        variance: 0.8, execLeakage: 0.7 },
      { id: 'b', label: 'Vorab aufgezeichnetes Statement (max. 60 Sek.)',        kpiDelta: { cashEUR: -2000, profitLossEUR: -2000, publicPerception: +3, bankTrust: 0, workforceEngagement: +1,  customerLoyalty: +1 } },
      { id: 'c', label: 'Gastkommentar als Text (Zahlenkorridor)',               kpiDelta: { publicPerception: +2, bankTrust: +1 } },
      { id: 'd', label: 'Nur Pressemitteilung, kein O-Ton',                      kpiDelta: { publicPerception: +1, bankTrust: -1, workforceEngagement: -1  } }
    ],
    attachments: ['d07_ceo_tv_media_briefing.pdf', 'd07_ceo_qa_sheet_regional_tv.pdf']
  }
];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D07-CFO-1',
    day: 7,
    role: 'CFO',
    title: 'Payroll durchgeführt – Nachlauf',
    context: 'Cash-Bestand sinkt; nächste Woche Steuer/Sozial.',
    dilemma: 'Nachlauf glätten vs. Lieferanten bedienen',
    hiddenAgendaHint: 'Planbarkeit für Bank sicherstellen.',
    options: [{ id: 'a', label: 'Keine Anpassung, Weekly reicht',                kpiDelta: { bankTrust: 0 } },
              { id: 'b', label: 'Rolling-13-Week aktualisieren & teilen',       kpiDelta: { bankTrust: +4 } },
{ id: 'c', label: 'Lieferanten jetzt priorisiert zahlen',          kpiDelta: { cashEUR: -60000, customerLoyalty: +2, bankTrust: -1 },
  variance: 0.8,   execLeakage: 0.7},
{ id: 'd', label: 'Nur P1-Lieferanten bedienen',                   kpiDelta: { cashEUR: -30000, customerLoyalty: +1, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['d07_cfo_liquiditaetsplanung_rolling.pdf', 'd07_cfo_gehaltsauszahlung_auswirkungen.pdf']
  },
{
    id: 'D07-CFO-2',
    day: 7,
    role: 'CFO',
    title: 'Covenant-Waiver anstoßen',
    context: 'Verstoß gegen Mindest-EBITDA droht.',
    dilemma: 'Früh verhandeln vs. abwarten',
    hiddenAgendaHint: 'Frühzeitigkeit wird honoriert.',
    options: [{ id: 'a', label: 'Waiver-Gespräch proaktiv ansetzen',             kpiDelta: { bankTrust: +5 },
  isTradeOff: true },
{ id: 'b', label: 'Erst in 10 Tagen adressieren',                   kpiDelta: { bankTrust: -2 } },
{ id: 'c', label: 'Nur schriftlich anfragen',                       kpiDelta: { bankTrust: +2 } },
{ id: 'd', label: 'Nicht adressieren',                              kpiDelta: { bankTrust: -4 } }],
    attachments: ['d07_cfo_covenant_waiver_antrag.pdf']
  },
{
  id: 'D07-CFO-3',
  day: 7,
  role: 'CFO',
  title: 'Teilverkauf – Entscheidungsvorlage Varianten & Impact',
  context: 'Vorstandsvorlage vorbereiten: Minority-Sale (25/49 %) vs. Asset-Deal (Non-Core) – Effekte auf Cash/Covenants/Steuerung.',
  dilemma: 'Tempo/Bankvertrauen vs. Kosten/Signalwirkung',
  hiddenAgendaHint: 'Fundierte Vorlage jetzt erhöht Glaubwürdigkeit bei Bank und Gesellschaftern.',
  options: [
    { id: 'a', label: 'Vollständige Vorlage: Variantenvergleich (25 % / 49 % / Asset) inkl. Cash-Szenarien & Covenant-Impact; externes Review (Legal/M&A)',
      kpiDelta: { bankTrust: +4, cashEUR: -12000, profitLossEUR: -12000, publicPerception: +1, workforceEngagement: -4 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true,
      cooldownDays: 2, lagDays: 2 },
    { id: 'b', label: 'Red-Flag Light: Interne Analyse + indikative Bewertung + Bank-Update, externe valuiert',
      kpiDelta: { bankTrust: +2, cashEUR: -6000, profitLossEUR: -6000, workforceEngagement: +4 },
      variance: 0.5, execLeakage: 0.3,
      cooldownDays: 2, lagDays: 1 },
    { id: 'c', label: 'Single-Track Empfehlung (Minority 25 %) + LOI-Fahrplan skizzieren',
      kpiDelta: { bankTrust: +2, cashEUR: -5000, profitLossEUR: -5000, workforceEngagement: -2 },
      variance: 0.6, execLeakage: 0.6, isTradeOff: true,
      sideEffects: { publicPerception: 0 },
      cooldownDays: 2, lagDays: 1 },
    { id: 'd', label: 'Entscheidung vertagen; Monitoring bis nach Banktermin',
      kpiDelta: { bankTrust: -4 },
      variance: 0.4, execLeakage: 0.2,
      cooldownDays: 2, lagDays: 0 }
  ],
  attachments: ['d07_cfo_partial_sale_options_analysis.pdf', 'd07_cfo_ma_process_timeline.xlsx']
}, {
    id: 'D07-CFO-4',
    day: 7,
    role: 'CFO',
    title: 'Energiepreis-Kompensation beantragen',
    context: 'Förderfenster offen; Aufwand moderat.',
    dilemma: 'Kapazität vs. Zuschuss',
    hiddenAgendaHint: 'Signalisiert Transformationsfähigkeit.',
    options: [{ id: 'a', label: 'Nicht beantragen',                               kpiDelta: { bankTrust: 0 } },
                    { id: 'b', label: 'Interner Antrag light',                          kpiDelta: { bankTrust: +1 } },
 { id: 'c', label: 'Antrag stellen ( mit ext. Beratung, 6k, Chance 114k)',       kpiDelta: { profitLossEUR: -6000, bankTrust: +2, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Nur Absicht kommunizieren',                      kpiDelta: { publicPerception: +1, bankTrust: 0 } }],
    attachments: ['d07_cfo_energy_subsidy_application.pdf', 'd07_cfo_energy_consumption_analysis.xlsx']
  },
  {
    id: 'D07-CFO-5',
    day: 7,
    role: 'CFO',
    title: 'Fördermittel Vollantrag & Kofinanzierung',
    context: 'Vorprüfung positiv; Capex-/Einsparnachweise gefordert. Kofinanzierung klären.',
    dilemma: 'Beraterkosten vs. Signal für Bank/Zukunftsfähigkeit',
    hiddenAgendaHint: 'Sauberer Vollantrag stärkt Bankvertrauen und Außenwirkung.',
    options: [
      { id: 'a', label: 'Vollantrag mit Berater, DD-ready Zahlenkorridor',   kpiDelta: { cashEUR: +250000, profitLossEUR: -6000, bankTrust: +3, publicPerception: +1 },
        variance: 0.8, execLeakage: 0.7 },
      { id: 'b', label: 'Inhouse-Antrag (mehr Zeit, geringere Kosten)',           kpiDelta: { bankTrust: +2 } },
      { id: 'c', label: 'Scoping-Skizze einreichen, Vollantrag T+7',              kpiDelta: { bankTrust: +1, } },
      { id: 'd', label: 'Antrag verwerfen',                                       kpiDelta: { bankTrust: -2 } }
    ],
    attachments: ['d07_cfo_funding_authority_letter.pdf', 'd07_cfo_capex_plan_2025.xlsx']
  }
];

const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D07-OPS-1',
    day: 7,
    role: 'OPS',
    title: 'Qualitätsgate nach Payroll-Woche',
    context: 'Fehlerquote schwankt; Druck hoch.',
    dilemma: 'Strenge vs. Tempo',
    hiddenAgendaHint: 'Stabilität vor Tempo.',
    options: [{ id: 'a', label: 'QS intensivieren (3k)',                           kpiDelta: { cashEUR: -3000, profitLossEUR: -3000, customerLoyalty: +2, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Stichprobe leicht erhöhen',                       kpiDelta: { cashEUR: -1000, profitLossEUR: -1000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Keine Änderung',                                  kpiDelta: { customerLoyalty: 0 } },
{ id: 'd', label: 'Prüfung reduzieren, Kosten sparen (Risiko)',                     kpiDelta: { cashEUR: +1000, profitLossEUR: +1000, customerLoyalty: -2 } }],
  
  },
{
    id: 'D07-OPS-2',
    day: 7,
    role: 'OPS',
    title: 'A-Kunde Eskalationspfad testen',
    context: 'Verbindlicher Eskalationskontakt gefordert.',
    dilemma: 'Overhead vs. Vertrauen',
    hiddenAgendaHint: 'Schnelle Reaktionszeiten binden Kunden.',
    options: [{ id: 'a', label: '24/7-Standby für A-Kunden',           kpiDelta: { profitLossEUR: -5000, customerLoyalty: +4, publicPerception: +1,  workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Nur Bürozeiten SLA',                               kpiDelta: { customerLoyalty: +1 } },
{ id: 'c', label: 'Kein spezieller Pfad',                             kpiDelta: { customerLoyalty: -2 } },
{ id: 'd', label: 'Pilot für 2 A-Kunden',                             kpiDelta: { profitLossEUR: -2000, customerLoyalty: +2 },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['d07_ops_escalation_matrix.pdf', 'd07_ops_sla_proposal_key_accounts.pdf']
  },
{
    id: 'D07-OPS-3',
    day: 7,
    role: 'OPS',
    title: 'Engpassteile Kanban einführen',
    context: 'Materialfluss unzuverlässig.',
    dilemma: 'Einführungskosten vs. Stabilität',
    hiddenAgendaHint: 'Kanban reduziert Stockouts.',
    options: [{ id: 'a', label: 'Kein Kanban',                                      kpiDelta: { customerLoyalty: -2 } },
      { id: 'b', label: 'Kanban für Top-10 Teile',                     kpiDelta: { profitLossEUR: -6900, customerLoyalty: +3 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Pilot für 3 Teile',                                kpiDelta: { profitLossEUR: -2000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'ERP-Parameter nur anpassen',                       kpiDelta: { customerLoyalty: -1 } }],
    attachments: ['d07_ops_kanban_implementation_plan.pdf', 'd07_ops_material_shortage_analysis.xlsx']
  },
{
    id: 'D07-OPS-4',
    day: 7,
    role: 'OPS',
    title: 'Pönale-Management',
    context: 'Mehrere Verträge mit Strafklauseln.',
    dilemma: 'Kosten vs. Kundenbindung',
    hiddenAgendaHint: 'Proaktive Verhandlung reduziert Risiken.',
    options: [{ id: 'a', label: 'Pönale präventiv neu verhandeln',                  kpiDelta: { customerLoyalty: +2, profitLossEUR: +2000 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Nur im Einzelfall reagieren',                      kpiDelta: { customerLoyalty: 0 } },
{ id: 'c', label: 'Pönalen riskieren',                                kpiDelta: { customerLoyalty: -3, profitLossEUR: -10000 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Kulanz gegen Laufzeitverlängerung',                kpiDelta: { customerLoyalty: +3, profitLossEUR: -5000 },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['d07_ops_penalty_risk_assessment.pdf', 'd07_ops_contract_renegotiation_memo.docx']
  },
  {
    id: 'D07-OPS-5',
    day: 7,
    role: 'OPS',
    title: 'PPAP-Slot Zweitlieferant: Prüfpfad & Risiko',
    context: 'Erstmusterprüfung in 10 Tagen möglich. Pilotcharge im Anschluss.',
    dilemma: 'Verkürzter Prüfpfad vs. Vollprüfung',
    hiddenAgendaHint: 'Saubere Qualifikation verhindert spätere Reklamationen.',
    options: [
      { id: 'a', label: 'Vollprüfung nach Standard (14 Tage, 4k Kosten)',         kpiDelta: { profitLossEUR: -4000, customerLoyalty: +2 },
        variance: 0.8, execLeakage: 0.7 },
      { id: 'b', label: 'Verkürzter Pfad (7 Tage, Risiko-Aufschlag 2k)',             kpiDelta: { customerLoyalty: +1, profitLossEUR: -2000 },
        variance: 0.8, execLeakage: 0.7 },
      { id: 'c', label: 'Parallelprüfung mit Erstlieferant (Benchmark, 6k)',          kpiDelta: { profitLossEUR: -6000, customerLoyalty: +3 },
        variance: 0.8, execLeakage: 0.7 },
      { id: 'd', label: 'PPAP verschieben, Erstlieferant stabilisieren',          kpiDelta: { customerLoyalty: -1 } }
    ],
    attachments: ['d07_ops_ppap_checklist.pdf', 'd07_ops_supplier_qualification_process.pdf']
  }
];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D07-HRLEGAL-1',
    day: 7,
    role: 'HRLEGAL',
    title: 'Kommunikation Payroll abgeschlossen',
    context: 'Sicherheit demonstrieren.',
    dilemma: 'Zuversicht vs. Übermut',
    hiddenAgendaHint: 'Fakten, keine Versprechen.',
    options: [{ id: 'a', label: 'Emotionaler Appell',                               kpiDelta: { publicPerception: +1, bankTrust: -1, workforceEngagement: +2 } },
{ id: 'b', label: 'Faktenmemo + Dank',                                kpiDelta: { workforceEngagement: +4, publicPerception: +1 } },
              { id: 'c', label: 'Kein Memo',                                        kpiDelta: { workforceEngagement: -1, publicPerception: -1 } },
{ id: 'd', label: 'Q&A ohne CFO-Abstimmung',                           kpiDelta: { bankTrust: -1 } }],
    
  },
{
  id: 'D07-HRLEGAL-2',
  day: 7,
  role: 'HRLEGAL',
  title: 'Teilverkauf – Consent-Management & Change-of-Control (CoC)',
  context: 'Minority-Sale triggert ggf. Zustimmungs-/Abtretungsverbote in Kunden-, Lieferanten- und Kreditverträgen.',
  dilemma: 'Dealtempo vs. Rechtssicherheit/Preis',
  hiddenAgendaHint: 'Frühe Consent-Matrix reduziert Signing-Risiken und stärkt Bankvertrauen.',
  options: [
    { id: 'a', label: 'Vollständige Consent-Matrix (Top 30) + Vorabansprachen durch Counsel; Escrow-Letters (Treuhandkonto (Escrow Account)) vorbereiten',
      kpiDelta: { bankTrust: +4, profitLossEUR: -8000, publicPerception: +1 },
      variance: 0.6, execLeakage: 0.5, isTradeOff: true },
    { id: 'b', label: 'Red-Flag-Screening + Consent-Einholung nur bei Top 10 kritischen Verträgen',
      kpiDelta: { bankTrust: +2, profitLossEUR: -3000 },
      variance: 0.6, execLeakage: 0.4 },
    { id: 'c', label: 'Keine proaktive Consents; Risiko über Reps/Indemnity adressieren',
      kpiDelta: { bankTrust: -2, publicPerception: -1 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true },
    { id: 'd', label: 'Struktur anpassen (Asset-Perimeter ohne CoC-Klauseln), längerer Vorlauf',
      kpiDelta: { bankTrust: +1, profitLossEUR: -5000 },
      variance: 0.5, execLeakage: 0.3, isTradeOff: true }
  ],
  attachments: ['d07_hrlegal_coc_consent_matrix.xlsx', 'd07_hrlegal_contract_review_summary.pdf']
},
{
    id: 'D07-HRLEGAL-3',
    day: 7,
    role: 'HRLEGAL',
    title: 'Ethik-Hotline kommunizieren',
    context: 'Hinweise zu Freigaben/Beziehungen.',
    dilemma: 'Transparenz vs. Misstrauen',
    hiddenAgendaHint: 'Kanal für Sorgen reduziert Social-Leaks.',
    options: [{ id: 'a', label: 'Hotline + Verfahrensbeschreibung',                 kpiDelta: { workforceEngagement: +4, publicPerception: +2, bankTrust: +1,
      profitLossEUR: -4000, cashEUR: -4000 },
  isTradeOff: true },
{ id: 'b', label: 'Nur E-Mail-Adresse',                               kpiDelta: { publicPerception: +1, workforceEngagement: +2 } },
{ id: 'c', label: 'Kein Kanal',                                       kpiDelta: { publicPerception: -1, workforceEngagement: -2 } },
{ id: 'd', label: 'Anonyme Posts verbieten',                           kpiDelta: { publicPerception: -2, workforceEngagement: -4 } }],
    attachments: ['d07_hrlegal_ethics_hotline_policy.pdf', 'd07_hrlegal_whistleblower_protection_guidelines.pdf']
  },
{
    id: 'D07-HRLEGAL-4',
    day: 7,
    role: 'HRLEGAL',
    title: 'Arbeitsrecht: Mehrarbeit dokumentieren',
    context: 'Nachtschichten häufen sich.',
    dilemma: 'Tempo vs. Compliance',
    hiddenAgendaHint: 'Dokumentation vermeidet Bußgelder.',
    options: [{ id: 'a', label: 'Saubere Arbeitszeitdoku, Kontrollen',              kpiDelta: { bankTrust: +1, publicPerception: +1, workforceEngagement: +1 } },
{ id: 'b', label: 'Nur stichprobenartig',                             kpiDelta: { publicPerception: 0, workforceEngagement: +1} },
{ id: 'c', label: 'Ignorieren',                                       kpiDelta: { publicPerception: -2, workforceEngagement: -2 } },
{ id: 'd', label: 'Extern prüfen lassen (2k)',                         kpiDelta: { profitLossEUR: -2000, publicPerception: +1, workforceEngagement: -2  },
  variance: 0.8, 
  execLeakage: 0.7}],
    attachments: ['d07_hrlegal_overtime_documentation.xlsx', 'd07_hrlegal_labor_law_compliance_memo.pdf']
  },
  {
    id: 'D07-HRLEGAL-5',
    day: 7,
    role: 'HRLEGAL',
    title: 'Compliance-Pfad festlegen (Vorprüfung → Maßnahmen)',
    context: 'Anonymer Hinweis zu Lieferantenstopps; Vorprüfung läuft.',
    dilemma: 'Gründlichkeit vs. Geschwindigkeit',
    hiddenAgendaHint: 'Forensic-Light oder sauberer interner Prozess schützt Reputation.',
    options: [
      { id: 'a', label: 'Externe Forensic-Light beauftragen (3k)',                kpiDelta: { profitLossEUR: -18000, publicPerception: +2, workforceEngagement: +2  } ,
        variance: 0.8, execLeakage: 0.7 },
      { id: 'b', label: 'Interne Prüfung mit Maßnahmenplan',                      kpiDelta: { publicPerception: +1, workforceEngagement: +1 } },
      { id: 'c', label: 'Nur Memo/Reminder ohne Prüfung',                         kpiDelta: { publicPerception: -1 } },
      { id: 'd', label: 'Fall schließen (kein Handlungsbedarf)',                  kpiDelta: { publicPerception: -2, workforceEngagement: -2 } }
    ],
    attachments: ['d07_hrlegal_compliance_investigation_protocol.pdf', 'd07_hrlegal_forensic_audit_proposal.pdf']
  }
];

export const day7Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CFO_BLOCKS,
  ...OPS_BLOCKS,
  ...HRLEGAL_BLOCKS
];

// src/data/scenario_day_07.ts — NUR den News-Block ersetzen
export const day7News: DayNewsItem[] = [
  { 
    id: 'N7-1',
    day: 7,
    title: 'Payroll ausgezahlt – Erwartungsmanagement für T+30',
    source: 'internal',
    severity: 'critical',
    isImportant: true,
    content: 'Löhne wurden vollständig und pünktlich überwiesen; Fokus wechselt auf Stabilität der nächsten 30 Tage.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const kpi = ctx?.kpi ?? {};
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && e.id === id &&
          (e.choice === t ||
           (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || e?.chosenOptionLabel || ''))))
        );

      // Relevante Entscheidungen der Vortage/Heute
      const ceoStmtNuechtern = picked('D07-CEO-1', 'a');
      const ceoStmtJubel     = picked('D07-CEO-1', 'b');
      const ceoNoStatement   = picked('D07-CEO-1', 'c');
      const ceoRegMeet       = picked('D07-CEO-1', 'd');

      const cfoRolling       = picked('D07-CFO-1', 'b');
      const cfoPayAllSup     = picked('D07-CFO-1', 'c');
      const cfoPayP1Only     = picked('D07-CFO-1', 'd');

      const payrollFull      = picked('D05-CFO-3', 'a') || picked('D05-CFO-3', 'b');
      const apStop           = picked('D06-CFO-1', 'a') || picked('D06-CFO-1', 'b') || picked('D06-CFO-1', 'd');
      const factoringUsed    = picked('D06-CFO-4', 'a') || picked('D06-CFO-4', 'd') || picked('D02-CFO-2', 'd');
      const wcDashboard      = picked('D05-CFO-4', 'a') || picked('D05-CFO-4', 'b') || picked('D05-CFO-4', 'd');

      let s = 'Die Gehaltszahlungen sind heute vollständig und pünktlich erfolgt. Das nimmt spürbar Druck aus der Organisation und reduziert Gerüchte. ';
      if (ceoStmtNuechtern) s += 'Das nüchterne CEO‑Statement mit Dank wurde intern positiv aufgenommen – ohne überzogene Versprechen. ';
      if (ceoStmtJubel)     s += 'Die Jubelbotschaft erzeugt kurzfristig Rückenwind, erhöht aber die Erwartung an eine stabile T+30‑Sicht. ';
      if (ceoNoStatement)   s += 'Ohne CEO‑Einordnung bleiben Fragen offen; bitte kurzfristig ein kurzes Fakten‑Update nachreichen. ';
      if (ceoRegMeet)       s += 'Die Ankündigung regelmäßiger Formate schafft Verlässlichkeit – Termine direkt veröffentlichen. ';
      s += payrollFull ? 'Positiv: Die Payroll‑Absicherung aus den Vortagen wurde wie geplant umgesetzt. ' : '';
      s += apStop ? 'Bitte erläutern: Zahlungspriorisierung für Lieferanten bleibt bis auf Weiteres bestehen (AP‑Steuerung). ' : '';
      s += factoringUsed ? 'Hinweis: Der temporäre Factoring‑Hebel stabilisiert den Cash‑Pfad – transparent im Reporting ausweisen. ' : '';
      s += cfoRolling ? 'Das Rolling‑13‑Week wurde aktualisiert und der Bank übermittelt. ' : '';
      s += cfoPayAllSup ? 'Teile der Lieferanten werden priorisiert bedient – Zahlungsplan liegt vor. ' : '';
      s += cfoPayP1Only ? 'P1‑Lieferanten werden heute gezielt freigegeben; die übrigen erhalten Zeitpläne. ' : '';
      s += wcDashboard ? 'Das WC‑Dashboard (DSO/DPO/DIO) dient als täglicher Referenzrahmen für Fragen der Belegschaft. ' : '';
      s += (kpi?.workforceEngagement > 0)
        ? 'Stimmungsbild: spürbare Erleichterung; Führungskräfte berichten von ruhigerer Lage auf den Flächen.'
        : 'Stimmungsbild: weiterhin vorsichtige Zurückhaltung in einzelnen Teams; klare Aussagen zu T+30 helfen.';
      return s.trim();
    }
  },
  { 
    id: 'N7-2',
    day: 7,
    title: 'Kundenvertragsgespräche – Servicelevel & Laufzeiten im Fokus',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Key Accounts verknüpfen Verlängerungen mit belastbaren Terminzusagen und Eskalationswegen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));

      const push2Y     = picked('D07-CEO-2', 'a');
      const push1Y     = picked('D07-CEO-2', 'b');
      const noPush     = picked('D07-CEO-2', 'c');
      const discOff    = picked('D07-CEO-2', 'd');

      const rtThisW    = picked('D06-CEO-3', 'a') || picked('D06-CEO-3', 'b');
      const roundtable = picked('D06-CEO-3', 'a');
      const opsSLA     = picked('D07-OPS-2', 'a') || picked('D07-OPS-2', 'd') || picked('D07-OPS-2', 'b');
      const opsMix     = picked('D05-OPS-1', 'a') || picked('D05-OPS-1', 'b') || picked('D05-OPS-1', 'c');
      const penaltyMgmt= picked('D07-OPS-4', 'a') || picked('D07-OPS-4', 'd');

      let s = 'Mehrere Key Accounts haben für diese Woche Gespräche angesetzt. Erwartet werden klare Aussagen zu Lieferfähigkeit, Eskalationspfaden und SLAs. ';
      if (push2Y)  s += 'Die 2‑Jahres‑Verlängerung mit Servicebonus kommt gut an – bitte konkrete Meilensteine und KPI‑Level zusagen. ';
      if (push1Y)  s += 'Einjährige Verlängerungen sind möglich, wenn Priorisierung und Terminschutz nachvollziehbar sind. ';
      if (discOff) s += 'Rabatt‑Offensive erzeugt kurzfristig Zustimmung, erhöht aber Preisdruck – Laufzeitbindung mitverhandeln. ';
      if (noPush)  s += 'Ohne aktives Angebot steigt das Risiko von Testvolumina beim Wettbewerb. ';
      s += rtThisW ? (roundtable ? 'Der Roundtable bietet Raum für Q&A und stärkt Vertrauen. ' : 'Executive‑Calls als Ersatz funktionieren, wenn die Engpassliste geteilt wird. ') : '';
      s += opsSLA ? 'Die getesteten SLAs/Eskalationspfade (Pilot/24‑7/Bürozeiten) bitte kundenindividuell zuschneiden. ' : '';
      s += opsMix ? 'Der angepasste Produktionsmix (DB/Key‑Account‑Priorität) sollte transparent erläutert werden. ' : '';
      s += penaltyMgmt ? 'Proaktive Pönale‑Verhandlungen bzw. Kulanz‑gegen‑Laufzeit entlasten die Gespräche. ' : '';
      return s.trim();
    }
  },
  { 
    id: 'N7-3',
    day: 7,
    title: 'Bank erfragt kurzes Update – Bridge, Waiver, Milestones',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content: 'Status zu Covenant‑Bridge, Waiver‑Ansprache und Umsetzung der Auflagen erbeten.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));

      const bridgeReady = picked('D05-CFO-1', 'a') || picked('D05-CFO-1', 'd');
      const packReady   = picked('D04-CFO-4', 'a') || picked('D04-CFO-4', 'b');
      const waiverNow   = picked('D07-CFO-2', 'a') || picked('D07-CFO-2', 'c');
      const waiverLate  = picked('D07-CFO-2', 'b') || picked('D07-CFO-2', 'd');
      const rollingUp   = picked('D07-CFO-1', 'b');
      const signedTerms = picked('D06-CEO-1', 'a') || picked('D06-CEO-1', 'b');
      const factoring   = picked('D06-CFO-4', 'a') || picked('D06-CFO-4', 'd');

      let s = 'Die Hausbank bittet um ein knappes Lagebild: Bridge, Waiver‑Status und erste Umsetzungsnachweise. ';
      s += bridgeReady ? 'Die Covenant‑Bridge (inkl. Sensitivitäten/Plausibilisierung) gilt als Anker der Argumentation. ' : 'Bitte vollständige Bridge mit Sensitivitäten nachreichen. ';
      s += packReady   ? 'Das Reporting‑Pack aus Tag 4 kann referenziert werden. ' : '';
      s += waiverNow   ? 'Positiv: Waiver wurde proaktiv adressiert (bzw. schriftlich angefragt). ' : '';
      s += waiverLate  ? 'Hinweis: Späte Waiver‑Ansprache erhöht die Unsicherheit – Zeitplan offenlegen. ' : '';
      s += rollingUp   ? 'Das Rolling‑13‑Week wurde aktualisiert und geteilt. ' : '';
      s += signedTerms ? 'Der gezeichnete Auflagenbrief hilft; erste Proof‑Points binnen 7 Tagen einplanen. ' : '';
      s += factoring   ? 'Factoring‑Pilot als Cash‑Brücke bitte sauber erklären (Silent‑Assignment). ' : '';
      return s.trim();
    }
  },
  { 
    id: 'N7-4',
    day: 7,
    title: 'Qualität & Termine im Blick – Containment zeigt Wirkung',
    source: 'press',
    severity: 'low',
    isImportant: false,
    content: 'Lokale Medien greifen Kundenhinweise auf; Nacharbeiten und Verzögerungen werden diskutiert.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));

      const contain100  = picked('D06-OPS-3', 'a') || picked('D06-OPS-3', 'd') || picked('D06-OPS-3', 'b');
      const qgateBoost  = picked('D07-OPS-1', 'a') || picked('D07-OPS-1', 'b');
      const prog8D      = picked('D04-OPS-4', 'a') || picked('D05-OPS-4', 'a') || picked('D04-OPS-4', 'd') || picked('D05-OPS-4', 'd');

      let s = 'In Foren und Lokalmedien tauchen erneut Hinweise auf verspätete Auslieferungen und Mehrarbeit auf. ';
      s += contain100 ? 'Das eingeleitete Containment (Sperrbestände, 100 %‑Prüfung/kundennahe Liaison) wird explizit kommuniziert. ' : '';
      s += qgateBoost ? 'Das temporär verschärfte Qualitätsgate stabilisiert Ausschuss und Nacharbeit. ' : '';
      s += prog8D     ? 'Parallel laufen 8D/5‑Why‑Maßnahmen zur Ursachenbeseitigung – Status in wöchentlicher Kurzform veröffentlichen. ' : '';
      s += 'Bitte kurze Faktennote bereitstellen (Ausschussquote, Nacharbeitstrend, Ansprechpartner), um Fehlinterpretationen zu vermeiden.';
      return s.trim();
    }
  },
  { 
    id: 'N7-5',
    day: 7,
    title: 'TV‑Beitrag heute – O‑Ton angefragt',
    source: 'press',
    severity: 'medium',
    isImportant: true,
    content: 'Sender plant Abendbeitrag zu Bankauflagen, Lieferfähigkeit und Beschäftigung.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));

      const ceoLive    = picked('D07-CEO-5', 'a');
      const ceoTape    = picked('D07-CEO-5', 'b');
      const ceoOpEd    = picked('D07-CEO-5', 'c');
      const ceoPRonly  = picked('D07-CEO-5', 'd');

      const wk2OpEd    = picked('D06-CEO-2', 'b');
      const wk2PR      = picked('D06-CEO-2', 'c');
      const wk2Interview= picked('D06-CEO-2', 'd');

      let s = 'Der Regionalsender bittet um ein kurzes Statement (30–60 Sek.). ';
      s += ceoLive ? 'Live‑Interview: Q&A‑Leitfaden und No‑Gos sitzen; Zahlenkorridor (Umsatz/Cash/Runway) freigegeben. ' : '';
      s += ceoTape ? 'Vorab aufgezeichnetes Statement: präzise Kernbotschaften, riskante Details vermeiden. ' : '';
      s += ceoOpEd ? 'Alternativ: Gastkommentar im Wortlaut – Tonalität sachlich, konsistent mit Bankunterlagen. ' : '';
      s += ceoPRonly ? 'Nur PM: besser als Schweigen, aber O‑Ton‑Lücke bleibt. ' : '';
      s += wk2Interview ? 'Das Interview‑Training aus Woche 2 hilft – Stil beibehalten. ' : wk2OpEd ? 'Der Gastbeitrag aus Woche 2 kann als Bezugsrahmen dienen. ' : wk2PR ? 'Die PM‑Linie aus Woche 2 reicht als Grundlage; O‑Ton ergänzt die Glaubwürdigkeit. ' : '';
      return s.trim();
    }
  },
  { 
    id: 'N7-6',
    day: 7,
    title: 'Fördermittel: Frist T+5 – Unterlagen bündeln',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Capex‑Plan, Einsparnachweise und Kofinanzierung bis in fünf Tagen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));

      const vFull   = picked('D07-CFO-5', 'a');
      const vInhouse= picked('D07-CFO-5', 'b');
      const vSketch = picked('D07-CFO-5', 'c');
      const vDrop   = picked('D07-CFO-5', 'd');

      const t5ApplyA= picked('D05-CFO-2', 'a');
      const t5ApplyD= picked('D05-CFO-2', 'd');

      let s = 'Die Förderstelle hat eine Einreichfrist T+5 gesetzt. ';
      if (vFull)    s += 'Der Vollantrag läuft mit externer Unterstützung; Kofinanzierung und KPI‑Nachweise sind vorbereitet. ';
      else if (vSketch) s += 'Die Scoping‑Skizze liegt vor – Vollantrag bis T+7 sicherstellen. ';
      else if (vInhouse) s += 'Inhouse‑Antrag spart Kosten, benötigt aber zusätzliche Kapazität – Meilensteine heute fixieren. ';
      else if (vDrop)    s += 'Ohne Antrag bleibt ein relevanter Vertrauens‑ und Liquiditätshebel ungenutzt. ';
      s += t5ApplyA ? 'Die positive Vorprüfung aus Tag 5 erleichtert das Verfahren. ' : t5ApplyD ? 'Externe Antragstellung (Tag 5) wurde bereits angestoßen – Fristen beachten. ' : '';
      s += 'Bitte Datenraum aktualisieren (Capex‑Roadmap, Einsparlogik, KPI‑Dashboard) und CFO‑Sign‑off einholen.';
      return s.trim();
    }
  },
  { 
    id: 'N7-7',
    day: 7,
    title: 'Zweitlieferant: PPAP‑Slot bestätigt – Prüfpfad wählen',
    source: 'supplier',
    severity: 'medium',
    isImportant: true,
    content: 'Erstmusterprüfung in zehn Tagen; Pilotcharge im Anschluss möglich.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));

      const ppapFull  = picked('D07-OPS-5', 'a');
      const ppapShort = picked('D07-OPS-5', 'b');
      const ppapBench = picked('D07-OPS-5', 'c');
      const ppapDelay = picked('D07-OPS-5', 'd');

      const dualNow   = picked('D06-OPS-1', 'a');
      const dualPrep  = picked('D06-OPS-1', 'b');
      const mainOnly  = picked('D06-OPS-1', 'c');
      const consign   = picked('D04-OPS-2', 'd');

      let s = 'Der alternative Lieferant reserviert einen PPAP‑Slot in zehn Tagen. ';
      if (ppapFull)   s += 'Vollprüfung reduziert Reklamationsrisiken – Zeitpuffer einplanen. ';
      else if (ppapShort) s += 'Verkürzter Pfad beschleunigt den Ramp‑Up, erhöht aber das Restrisiko – Containment vorbereiten. ';
      else if (ppapBench) s += 'Parallelprüfung mit Erstlieferant erlaubt objektiven Vergleich und sauberen Übergang. ';
      else if (ppapDelay) s += 'Verschiebung setzt stabile Erstversorgung voraus – Risikoabwägung dokumentieren. ';
      s += dualNow ? 'Express‑Qualifizierung läuft bereits; QS/Einkauf täglich synchronisieren. ' : dualPrep ? 'Vorbereitung ist im Plan – Freigabepunkte terminieren. ' : mainOnly ? 'Bei Vorkasse am Hauptlieferanten Alternative als Plan B mitlaufen lassen. ' : '';
      s += consign ? 'Konsignationslager senken Vorfinanzierung und erleichtern den Hochlauf. ' : '';
      return s.trim();
    }
  },
  { 
    id: 'N7-8',
    day: 7,
    title: 'Compliance: Erstbefund – Maßnahmenpfad festlegen',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Vorprüfung stützt Hinweis teilweise; Dokumentationslücken bei Freigaben.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) => e && e.id === id && (e.choice === t || (t instanceof RegExp && t.test(String(e?.choiceLabel || e?.label || '')))));

      const protoOK   = picked('D03-HRLEGAL-4', 'a') || picked('D03-HRLEGAL-4', 'd') || picked('D03-HRLEGAL-4', 'e');
      const training  = picked('D04-HRLEGAL-3', 'a') || picked('D04-HRLEGAL-3', 'd');
      const limits    = picked('D03-CFO-4', 'a') || picked('D03-CFO-4', 'd') || picked('D03-CFO-4', 'b');
      const hotline   = picked('D07-HRLEGAL-3', 'a') || picked('D07-HRLEGAL-3', 'b');
      const pathFor   = picked('D07-HRLEGAL-5', 'a');
      const pathInt   = picked('D07-HRLEGAL-5', 'b');
      const pathMemo  = picked('D07-HRLEGAL-5', 'c');
      const pathClose = picked('D07-HRLEGAL-5', 'd');

      let s = 'Die Vorprüfung bestätigt den Hinweis teilweise: einzelne Freigabewege sind unvollständig dokumentiert. ';
      s += protoOK ? 'Transparenzprotokoll/Auditspur sind vorhanden und werden ergänzt. ' : 'Bitte kurzfristig ein Interims‑Protokoll je Freigabe einführen. ';
      s += training ? 'Durchgeführte Schulungen/Externaudit erhöhen die Glaubwürdigkeit. ' : '';
      s += limits   ? 'Formale Limits und Board‑Ausnahmen werden als Entscheidungsbasis herangezogen. ' : '';
      if (pathFor)      s += 'Empfehlung: Forensic‑Light beauftragen und Kommunikationspfad mit HR/Legal abstimmen. ';
      else if (pathInt) s += 'Empfehlung: Interne Prüfung mit Maßnahmenplan und Terminlage. ';
      else if (pathMemo) s += 'Warnung: Reminder ohne Prüfung adressiert die Lücke nicht – Risiko bleibt. ';
      else if (pathClose) s += 'Hinweis: Fall ohne Maßnahmen zu schließen erhöht Reputationsrisiko. ';
      s += hotline ? 'Hinweiskanal (Ethik‑Hotline/E‑Mail) aktiv bewerben; Feedback an Hinweisgeber fristgerecht dokumentieren.' : '';
      return s.trim();
    }
  },
  // Füllmeldungen (ohne Detailfenster)
  { id: 'N7-9',  day: 7, title: 'E‑Ladesäulen außer Betrieb',        source: 'internal', severity: 'low', isImportant: false, content: 'Technik prüft Wallboxen am Parkhaus; bitte auf Slots am Osttor ausweichen.', suppressHints: true },
  { id: 'N7-10', day: 7, title: 'Kurzzeitige Lichtflackerer gemeldet', source: 'internal', severity: 'low', isImportant: false, content: 'Stromschrank‑Wartung bis 11:30 Uhr; kurze Unterbrechungen möglich.', suppressHints: true },
  { id: 'N7-11', day: 7, title: 'VPN‑Neuanmeldung erforderlich',      source: 'internal', severity: 'low', isImportant: false, content: 'IT setzt heute Abend Token‑Refresh; bitte nach 19:00 Uhr neu anmelden.', suppressHints: true },
  { id: 'N7-12', day: 7, title: 'Markierungen in Halle 2 erneuert',   source: 'internal', severity: 'low', isImportant: false, content: 'Wege temporär gesperrt; Umleitung ist ausgeschildert.', suppressHints: true }
];
