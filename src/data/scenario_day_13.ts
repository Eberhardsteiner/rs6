// src/data/scenario_day_13.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

/**
 * TAG 13 — 16 Entscheidungsblöcke (je 4 pro Rolle)
 * Fokus: Letzte Weichenstellungen vor Tag 14 (Payroll/Finale), Konsolidierung der
 * Waiver-Auflagen, Lieferanten-/Kundenstabilisierung, Reputations-„Landing".
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D13-CEO-1',
    day: 13,
    role: 'CEO',
    title: 'Abschlusskommunikation vor Tag 14',
    context: 'Mitarbeitende, Kunden und Bank erwarten ein klar strukturiertes Update vor der finalen Phase.',
    dilemma: 'Tempo vs. Abstimmung',
    hiddenAgendaHint: 'Einheitliches „Message House" minimiert Fehlinterpretationen.',
    options: [
{ id: 'a', label: 'Nur internes Update, Kunden morgen',                 kpiDelta: { workforceEngagement: +2, customerLoyalty: +1 } },
      { id: 'b', label: 'Gemeinsame Botschaft (CEO/CFO) an alle Stakeholder', kpiDelta: { bankTrust: +3, customerLoyalty: +2, workforceEngagement: +3, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Nur Bank informieren',                               kpiDelta: { bankTrust: +2, publicPerception: -1 } },
{ id: 'd', label: 'Keine Kommunikation (Ruhe bewahren)',                kpiDelta: { workforceEngagement: -2, customerLoyalty: -2 } }
  ],
  attachments: ['message_house_tag13.pptx', 'd13_ceo_allhands_script_tag13.pdf']
  },
{
    id: 'D13-CEO-2',
    day: 13,
    role: 'CEO',
    title: 'LOI/Partnerschaft – internes Erwartungsmanagement',
    context: 'Belegschaft spekuliert über einen LOI; Unsicherheit über Auswirkungen. Gerüchte über Beteiligung von Investor verbreiten sich.',
    dilemma: 'Transparenz vs. Vertraulichkeit',
    hiddenAgendaHint: 'Realistisches Framing verhindert Enttäuschungen.',
    options: [{ id: 'a', label: 'Intern klare Meilensteine & Unsicherheiten benennen', kpiDelta: { workforceEngagement: +3, publicPerception: +1 },
  isTradeOff: true },
{ id: 'b', label: 'Nur Führungskräfte informieren',                       kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Kein Kommentar (Gerüchte riskieren)',                  kpiDelta: { workforceEngagement: -2 } },
{ id: 'd', label: 'Öffentlich andeuten (PR-Risiko)',                      kpiDelta: { publicPerception: -2, bankTrust: -1, workforceEngagement: -2  } }
  ],
  attachments: ['d13_ceo_loi_internes_expectation_memo_tag13.pdf']
},
{
    id: 'D13-CEO-3',
    day: 13,
    role: 'CEO',
    title: 'Externe Berater – Mandat für Finale',
    context: 'Bank fragt nach externer Begleitung für die Abschlussphase von möglichen Beteiligungsverhandlungen.',
    dilemma: 'Kosten vs. Akzeptanz',
    hiddenAgendaHint: '„Light-Touch"-Mandat kann Vertrauenshebel sein.',
    options: [{ id: 'a', label: 'Light-Touch Mandat für Review/Moderation', kpiDelta: { cashEUR: -9000, profitLossEUR: -9000, bankTrust: +3 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Vollmandat – starkes Signal',               kpiDelta: {cashEUR: -18000,  profitLossEUR: -18000, bankTrust: +4, publicPerception: +3},
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Kein Mandat – intern lösen',                     kpiDelta: { bankTrust: -1, publicPerception: -2 } },
{ id: 'd', label: 'Nur Standby-Vereinbarung ',                  kpiDelta: { profitLossEUR: -6000, bankTrust: +2 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['d13_ceo_advisor_light_mandate_tag13.docx']
},
{
    id: 'D13-CEO-4',
    day: 13,
    role: 'CEO',
    title: 'Finale Risiko-Landkarte freigeben',
    context: 'Letzte Risiko-/Maßnahmenliste vor Tag 14 an Bank & Beirat?',
    dilemma: 'Offenlegung vs. Angriffsfläche',
    hiddenAgendaHint: 'Klarer Owner/Termin je Risiko zeigt Steuerungskompetenz.',
    options: [{ id: 'a', label: 'Risikoliste mit Owner & Termin freigeben',    kpiDelta: { bankTrust: +4, publicPerception: +1},
  isTradeOff: true },
{ id: 'b', label: 'Nur intern finalisieren',                      kpiDelta: { bankTrust: +1,  workforceEngagement: -2 } },
{ id: 'c', label: 'Vage Zusammenfassung ohne Details',            kpiDelta: { bankTrust: -1,  workforceEngagement: -2, publicPerception: -1 } },
{ id: 'd', label: 'Nicht teilen (intern behalten)',               kpiDelta: { bankTrust: -2, publicPerception: -2 } }
  ],
attachments: ['risikomatrix_tag13.xlsx', 'd13_ceo_risiko_register_briefing_note_tag13.pdf']
  }];

// NEU: 5. CEO-Block (keine Kürzungen, Zusatzblock)
const CEO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D13-CEO-5',
  day: 13,
  role: 'CEO',
  title: 'Letzte Klärungen Verkauf von United Pumps of America',
  context: 'Vor dem Finale sollen Bank, Beirat, Key Accounts und Lieferanten synchron abgeholt werden.',
  dilemma: 'Maximale Transparenz vs. gezielte Dosierung',
  hiddenAgendaHint: 'Eine abgestimmte Information mit Terminen reduziert Spekulationen.',
  options: [
       { id: 'a', label: 'Nur Bank & Beirat aktiv bedienen',                             kpiDelta: { bankTrust: +2, workforceEngagement: -2, publicPerception: -1 } },
    { id: 'b', label: 'Primär Medienarbeit priorisieren',                             kpiDelta: { publicPerception: +2, bankTrust: -2, workforceEngagement: -2 } },
     { id: 'c', label: 'Abgestimmter Plan (Bank/Beirat/Kunden/Lieferanten) ausrollen und professionell vorbereiten', kpiDelta: { bankTrust: +4, customerLoyalty: +2, publicPerception: +2, workforceEngagement: +2, cashEUR: -10000,  profitLossEUR: -10000,  },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'd', label: 'Kein strukturierter Plan (ad hoc)',                            kpiDelta: { publicPerception: -1, bankTrust: -2, workforceEngagement: -2  } }
  ],
  attachments: ['d13_ceo_upa_sync_plan_tag13.pdf']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
  id: 'D13-CFO-1',
  day: 13,
  role: 'CFO',
  title: 'Vorbereitung Verkaufsdossier – United Pumps of America',
  context: 'Der geplante Teilverkauf steht vor der Due Diligence. CFO muss Finanzteil des Dossiers vorbereiten: historische Zahlen, Cash-Impact, Covenants.',
  dilemma: 'Transparenz vs. Verhandlungsposition',
  hiddenAgendaHint: 'Ein klar strukturiertes Dossier erhöht Bank- und Investorenvertrauen.',
  options: [
    { id: 'a', label: 'Vollständiges Finanzdossier (3 Jahre Historie, Forecast, Covenant-Analyse) erstellen',
      kpiDelta: { bankTrust: +4, profitLossEUR: -10000, publicPerception: +1 },
      variance: 0.6, execLeakage: 0.4, isTradeOff: true },
    { id: 'b', label: 'Red-Flag Report (nur kritische Themen) vorbereiten',
      kpiDelta: { bankTrust: +2, profitLossEUR: -5000 },
      variance: 0.5, execLeakage: 0.3 },
    { id: 'c', label: 'Nur Management-Summary (keine Details) erstellen',
      kpiDelta: { bankTrust: -1, publicPerception: -1 },
      variance: 0.4, execLeakage: 0.2 },
    { id: 'd', label: 'Externe M&A-Beratung (15k) für Dossier-Erstellung beauftragen',
      kpiDelta: { bankTrust: +5, profitLossEUR: -15000, publicPerception: +2 },
      variance: 0.7, execLeakage: 0.5 }
  ],
  attachments: ['d13_cfo_financial_dossier_upa_tag13.pdf']
},
{
  id: 'D13-CFO-2',
  day: 13,
  role: 'CFO',
  title: 'Investor  – Bewertungsgrundlagen vorbereiten',
  context: 'Ein Finanzinvestor signalisiert Einstieg bei Aurion (geplant 25 %). CFO muss Bewertungsmodelle, Cash-Bedarf und Beteiligungsvarianten vorbereiten.',
  dilemma: 'Attraktive Bewertung vs. Realistische Erwartungen',
  hiddenAgendaHint: 'Bank und Gesellschafter achten auf Professionalität und Transparenz.',
  options: [
    { id: 'a', label: 'DCF- und Multiplikator-Modell mit drei Szenarien (Basis/Best/Worst Case) von Beratung erstellen lassen ',
      kpiDelta: { bankTrust: +3, profitLossEUR: -18000 },
      variance: 0.6, execLeakage: 0.4, isTradeOff: true },
    { id: 'b', label: 'Nur vereinfachtes Bewertungsmodell (EBITDA x Multiple) selbst erstellen',
      kpiDelta: { bankTrust: +1 },
      variance: 0.5, execLeakage: 0.3 },
    { id: 'c', label: 'Bewertung ganz dem Investor überlassen, nur Datenraum öffnen',
      kpiDelta: { bankTrust: -2, publicPerception: -1, workforceEngagement: -2  },
      variance: 0.4, execLeakage: 0.2 },
    { id: 'd', label: 'Externe Corporate-Finance-Beratung hinzuziehen für kompletten Prozess der Bewertungs- und Termsheet-Vorbereitung',
      kpiDelta: { bankTrust: +4, profitLossEUR: -80000, publicPerception: +2, workforceEngagement: -3 },
      variance: 0.7, execLeakage: 0.6 }
  ],
  attachments: ['d13_cfo_valuation_models_summary_tag13.xlsx']
},
{
    id: 'D13-CFO-3',
    day: 13,
    role: 'CFO',
    title: 'Working-Capital – letzte Quick Wins',
    context: 'DSO/DPO/DIO laufen; noch kleinere Hebel möglich.',
    dilemma: 'Ergebnis vs. Signalwirkung',
    hiddenAgendaHint: 'Kein Aktionismus',
    options: [{ id: 'a', label: 'Hartes Beitreiben von Außenständen',             kpiDelta: { cashEUR: +50000, customerLoyalty: -5, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'b', label: 'Gezieltes Mahnwesen (ohne Eskalation)',        kpiDelta: { cashEUR: +15000, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'c', label: 'Kein zusätzlicher Schritt (Stabilität)',       kpiDelta: { bankTrust: -1, customerLoyalty: +1 } },
{ id: 'd', label: 'Skonto-Push breit (Risiko Signal)',            kpiDelta: { cashEUR: +35000, profitLossEUR: -4500, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1}
  ],
  attachments: ['d13_cfo_wc_quickwins_tasklist_tag13.xlsx']
},
{
    id: 'D13-CFO-4',
    day: 13,
    role: 'CFO',
    title: 'Review-Pack „Finale Sicht"',
    context: 'Bank erwartet klare Perspektive.',
    dilemma: 'Ambition vs. Realismus',
    hiddenAgendaHint: 'Saubere Bridge + Sensitivität festigen Vertrauen.',
    options: [{ id: 'a', label: 'Bridge + Sensitivitäten + Meilensteintracking', kpiDelta: { bankTrust: +5 } },
{ id: 'b', label: 'Nur Bridge ohne Sensitivität',                   kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'KPI-Summary kurz (lesbar, aber dünn)',          kpiDelta: { bankTrust: -1 } },
{ id: 'd', label: 'Externe Plausibilitätsanalyse (6k)',                            kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, bankTrust: +3 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
attachments: ['final_view_pack_tag14.pptx', 'd13_cfo_review_pack_exec_summary_tag13.pdf']
  }];

// NEU: 5. CFO-Block
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D13-CFO-5',
  day: 13,
  role: 'CFO',
  title: 'Fee Letter & Informationsrechte – Verhandlungsabschluss',
  context: 'Bank verlangt finale Klarheit: Höhe der Waiver-Fee, Payroll Folgemonat gesichert, Reporting-Umfang und Trigger für Sonderrechte. CFO muss entscheiden, welche Kombination tragfähig ist.',
  dilemma: 'Kostenbelastung vs. operative Flexibilität',
  hiddenAgendaHint: 'Ein abgestimmter Mix aus Fee-Höhe und klaren, erfüllbaren Triggern stärkt Glaubwürdigkeit.',
  options: [
    { id: 'a', label: 'Fee gering halten, dafür enges Reporting (wöchentliche KPI + Sonderrechte bei Covenant-Verstoß)',
      kpiDelta: { bankTrust: +3, profitLossEUR: -3000 },
      variance: 0.7, execLeakage: 0.5, isTradeOff: true },

    { id: 'b', label: 'Moderate Fee + Trigger-Katalog präzise definieren (nur BankTrust, Liquidity Ratio, Payroll-Deckung)',
      kpiDelta: { bankTrust: +4, profitLossEUR: -6000 },
      variance: 0.6, execLeakage: 0.4, isTradeOff: true },

    { id: 'c', label: 'Hohe Fee verhandeln, dafür flexible Informationsrechte (Monatsreporting, keine Sonderrechte)',
      kpiDelta: { bankTrust: +2, profitLossEUR: -10000 },
      variance: 0.7, execLeakage: 0.5 },

    { id: 'd', label: 'Deal offenlassen, nur unverbindliche Absichtserklärung abgeben',
      kpiDelta: { bankTrust: -3, publicPerception: -1 },
      variance: 0.5, execLeakage: 0.3 }
  ],
  attachments: ['d13_cfo_feeletter_redlines_tag13.docx']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D13-OPS-1',
    day: 13,
    role: 'OPS',
    title: 'Produktionsplan – A-Kunden final absichern',
    context: 'Pönalen drohen bei zwei A-Kunden; letzte 48h entscheidend.',
    dilemma: 'Kosten vs. Loyalität',
    hiddenAgendaHint: 'Gezielte Sonderschichten statt Gießkanne.',
    options: [{ id: 'a', label: 'Sonderschicht/Engpassfreigabe',     kpiDelta: { cashEUR: -8000, profitLossEUR: -8000, customerLoyalty: +4, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Teil-Express nur bei drohender Pönale',         kpiDelta: { cashEUR: -3000, profitLossEUR: -3000, customerLoyalty: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Kein Sonderprogramm',                           kpiDelta: { customerLoyalty: -2 } },
{ id: 'd', label: 'Regelmäßig Express einsetzen (teuer)',          kpiDelta: { cashEUR: -12000, profitLossEUR: -12000, customerLoyalty: +3 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['d13_ops_sonderschicht_freigabe_tag13.pdf']
},
{
    id: 'D13-OPS-2',
    day: 13,
    role: 'OPS',
    title: 'Qualitätsnachweise – Kundenvertrauen stärken',
    context: 'Kunden möchten dokumentierte Stabilisierung sehen.',
    dilemma: 'Messaufwand vs. Wirkung',
    hiddenAgendaHint: 'Kennzahlen/Trendberichte stützen Narrativ.',
    options: [{ id: 'a', label: 'Defektrate & Nacharbeit wöchentlich teilen',     kpiDelta: { customerLoyalty: +2, bankTrust: +1 } },
{ id: 'b', label: 'Nur intern messen',                               kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Kein zusätzliches Reporting',                     kpiDelta: { customerLoyalty: -1 } },
{ id: 'd', label: 'Externe QS-Kurzbericht (5k)',                     kpiDelta: { profitLossEUR: -5000, customerLoyalty: +3, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['d13_ops_quality_trendreport_tag13.xlsx']
},
{
    id: 'D13-OPS-3',
    day: 13,
    role: 'OPS',
    title: 'Lieferantenabsicherung – letzte Lücken',
    context: 'Zwei kritische Teile mit Lieferunsicherheit.',
    dilemma: 'Höhere Preise vs. Lieferrisiko',
    hiddenAgendaHint: 'Backup-Lieferant kann langfrisitg absichern.',
    options: [{ id: 'a', label: 'Backup-Lieferant kurzfristig qualifizieren', kpiDelta: { profitLossEUR: -6000, customerLoyalty: +2, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Einmalige Premiumpreise akzeptieren',              kpiDelta: { profitLossEUR: -7000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Keine Maßnahme – Risiko tragen',                   kpiDelta: { customerLoyalty: -2 } },
{ id: 'd', label: 'Kunden-Lieferplan verschieben (abstimmen)',       kpiDelta: { customerLoyalty: -1 } }
  ],
  attachments: ['d13_ops_backup_supplier_ppap_plan_tag13.pdf']
},
{
    id: 'D13-OPS-4',
    day: 13,
    role: 'OPS',
    title: 'Logistik – Bündeln mit Ausnahmen',
    context: 'Kostenkontrolle vs. Flexibilität: viele Kleinlieferungen / Einzelabrufe die Logistikkosten massiv nach oben.',
    dilemma: 'Wenn man alles bündelt, sinken Kosten, aber Kunden leiden an Flexibilitätsverlust.',
    hiddenAgendaHint: 'Hybridregel: Bündeln + Express-Schutz für A-Kunden.',
    options: [{ id: 'a', label: 'Bündeln, Express nur für A-Kunden/Pönale vermeiden ',        kpiDelta: { cashEUR: +2000, profitLossEUR: +2000, customerLoyalty: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Alles bündeln (strikt) ',                           kpiDelta: { cashEUR: +5000, profitLossEUR: +5000, customerLoyalty: -2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Alles flexibel ',                            kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, customerLoyalty: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Keine Änderung',                                    kpiDelta: { profitLossEUR: 0 } }
  ],
  attachments: ['d13_ops_logistik_buendel_policy_tag13.pdf']
}];

// NEU: 5. OPS-Block
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D13-OPS-5',
  day: 13,
  role: 'OPS',
    title: 'Engpassmanagement in der Fertigung – Cash vs. Liefertreue',
  context: 'Nach der Krise sind die Produktionslinien wieder hochgefahren. Allerdings sind wichtige Rohstoffe knapp, Overtime-Kapazitäten teuer und die Bank verlangt Nachweise über stabile Prozesse. Gleichzeitig drängen A-Kunden auf termingerechte Auslieferung.',
  dilemma: 'Cash-Schonung vs. Liefertreue für Kernkunden',
  hiddenAgendaHint: 'Eine transparente, risikoorientierte Priorisierung stärkt sowohl Bankvertrauen als auch Kundenbindung.',
  options: [
    {
      id: 'a',
      label: 'A-Kunden strikt priorisieren – alle Ressourcen in Kernaufträge',
      kpiDelta: { customerLoyalty: +3, profitLossEUR: -4000, bankTrust: +1 },
      variance: 0.8,
      execLeakage: 0.6
    },
    {
      id: 'b',
      label: 'Cash-Fokus: Nur profitabelste Aufträge produzieren, Rest verschieben',
      kpiDelta: { profitLossEUR: +8000, customerLoyalty: -2, bankTrust: -1 },
      variance: 0.7,
      execLeakage: 0.5
    },
    {
      id: 'c',
      label: 'Zusatzschicht mit Fremdpersonal (Kosten ca. 10k) einplanen',
      kpiDelta: { profitLossEUR: -10000, customerLoyalty: +2, workforceEngagement: -1, bankTrust: +2 },
      variance: 0.9,
      execLeakage: 0.7
    },
    {
      id: 'd',
      label: 'Lieferplan mit Vertrieb anpassen, Bank informieren',
      kpiDelta: { customerLoyalty: +1, bankTrust: +2, profitLossEUR: -2000 },
      variance: 0.6,
      execLeakage: 0.4
    }
  ],
  
}];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D13-HRLEGAL-1',
    day: 13,
    role: 'HRLEGAL',
    title: 'Team-Ansprache: „Verkauf United Pumps of America"',
    context: 'Druck steigt; Erschöpfung sichtbar.',
    dilemma: 'Motivation vs. Überforderung',
    hiddenAgendaHint: 'Wertschätzung + klare Prioritäten.',
    options: [{ id: 'a', label: 'Kurzansprache + Dank + Fokusliste',              kpiDelta: { workforceEngagement: +3, publicPerception: +1 } },
{ id: 'b', label: 'Nur E-Mail',                                     kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Keine Ansprache',                                kpiDelta: { workforceEngagement: -2 } },
{ id: 'd', label: 'Zusätzlich zu a) Incentive für das Team (6k)',            kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, workforceEngagement: +4, publicPerception: +2 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: []
},
{
  id: 'D13-HRLEGAL-2',
  day: 13,
  role: 'HRLEGAL',
  title: 'Teilverkauf United Pumps – Datenraum & Vertraulichkeit',
  context: 'Für die Due Diligence des Käufers muss HR relevante Unterlagen (Verträge, Mitarbeiterlisten, Pensionspläne) bereitstellen. Datenschutz- und Geheimhaltungsfragen sind kritisch.',
  dilemma: 'Transparenz für Käufer vs. Schutz sensibler Mitarbeiter- und Unternehmensdaten',
  hiddenAgendaHint: 'Ein klarer Rechtsrahmen stärkt Bank- und Investorvertrauen, zu große Offenheit birgt Risiken.',
  options: [
    { id: 'a', label: 'Vollständige Offenlegung aller HR-Daten im Datenraum (inkl. Gehälter, Sozialpläne)',
      kpiDelta: { bankTrust: +3, publicPerception: -2, workforceEngagement: -3 },
      variance: 0.7, execLeakage: 0.6, isTradeOff: true },

    { id: 'b', label: 'Redigierte Unterlagen: Anonymisierung sensibler Daten + getrennte Offenlegung nur bei Bedarf',
      kpiDelta: { bankTrust: +2, workforceEngagement: +1, publicPerception: +1 },
      variance: 0.6, execLeakage: 0.4 },

    { id: 'c', label: 'Minimaloffenlegung: Nur Organigramm + Arbeitsverträge Führungskräfte',
      kpiDelta: { bankTrust: -1, workforceEngagement: +2 },
      variance: 0.5, execLeakage: 0.3 },

    { id: 'd', label: 'Externe Datenschutz-Kanzlei für Review beauftragen',
      kpiDelta: { cashEUR: -12000, profitLossEUR: -12000, bankTrust: +4, publicPerception: +2, workforceEngagement: -1 },
      variance: 0.8, execLeakage: 0.5 }
  ],
  attachments: ['d13_hrlegal_dataroom_privacy_protocol_tag13.pdf']
},
{
    id: 'D13-HRLEGAL-3',
    day: 13,
    role: 'HRLEGAL',
    title: 'Konfliktprävention CFO/OPS',
    context: 'Ressourcenkonflikte drohen erneut hochzukochen.',
    dilemma: 'Top-down vs. Mediation',
    hiddenAgendaHint: 'Kurzmoderation erhält Handlungsfähigkeit.',
    options: [{ id: 'a', label: 'Kein Eingreifen',                    kpiDelta: { workforceEngagement: -4, bankTrust: -1, publicPerception: -2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Nur bilaterale Kurzabstimmungen',                 kpiDelta: { workforceEngagement: +1 } },
{ id: 'c', label: 'Langfristige Maßnahmen (Konfliktmoderatoren ausbilden, (4k)) + kurfristige Intervention durch Moderation (2k)',                                kpiDelta: { cashEUR: -6000, profitLossEUR: -6000, bankTrust: +2, publicPerception: +2, workforceEngagement: +5 } },
{ id: 'd', label: 'Nur akute Konfliktmoderation (2k)',         kpiDelta: {cashEUR: -2000, profitLossEUR: -2000, bankTrust: +1, publicPerception: +1, workforceEngagement: +2 }}
  ],
  attachments: ['d13_hrlegal_conflict_mediation_brief_tag13.pdf']
},
{
    id: 'D13-HRLEGAL-4',
    day: 13,
    role: 'HRLEGAL',
    title: 'Arbeitsrechtliche Absicherung bei Teilverkauf',
    context: 'Der geplante Verkauf von United Pumps of America wirft arbeitsrechtliche Fragen auf: Betriebsübergang, Mitbestimmung, Sozialplan.',
    dilemma: 'Rechtssicherheit vs. Geschwindigkeit',
    hiddenAgendaHint: 'Frühzeitige Einbindung des Betriebsrats kann spätere Blockaden verhindern.',
    options: [
      { id: 'a', label: 'Vollständige arbeitsrechtliche Prüfung durch Kanzlei (15k) + Betriebsrat frühzeitig informieren',
        kpiDelta: { cashEUR: -15000, profitLossEUR: -15000, bankTrust: +3, workforceEngagement: +2, publicPerception: +1 },
        variance: 0.7, execLeakage: 0.5, isTradeOff: true },

      { id: 'b', label: 'Interne Prüfung + Betriebsrat erst bei konkretem Deal informieren',
        kpiDelta: { bankTrust: +1, workforceEngagement: -1 },
        variance: 0.6, execLeakage: 0.4 },

      { id: 'c', label: 'Minimale Prüfung, Betriebsrat nicht vorab informieren',
        kpiDelta: { bankTrust: -1, workforceEngagement: -3, publicPerception: -2 },
        variance: 0.5, execLeakage: 0.3 },

      { id: 'd', label: 'Externe Beratung nur für kritische Punkte (8k) + strukturierte BR-Information',
        kpiDelta: { cashEUR: -8000, profitLossEUR: -8000, bankTrust: +2, workforceEngagement: +1 },
        variance: 0.6, execLeakage: 0.4 }
    ],
    attachments: ['d13_hrlegal_labor_law_briefing_tag13.pdf']
  }];

// NEU: 5. HR/Legal-Block
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [{
  id: 'D13-HRLEGAL-5',
  day: 13,
  role: 'HRLEGAL',
  title: 'Teilverkauf United Pumps – Arbeitsrechtliche Überleitung (§613a BGB)',
  context: 'Im Carve-out müssen Mitarbeitende von United Pumps auf den Käufer übergehen. Rechtliche Pflichten (Information, Widerspruchsrechte, Sozialplan) sind komplex.',
  dilemma: 'Rechtssicherheit vs. Transaktionsgeschwindigkeit',
  hiddenAgendaHint: 'Ein sauberer Informationsprozess senkt Anfechtungs- und Klagerisiken, Bank und Käufer erwarten Compliance.',
  options: [
    { id: 'a', label: 'Frühzeitige schriftliche Unterrichtung aller betroffenen Mitarbeitenden mit Musterbelehrung nach §613a BGB',
      kpiDelta: { workforceEngagement: +3, bankTrust: +2, publicPerception: +1 },
      variance: 0.6, execLeakage: 0.4, isTradeOff: true },

    { id: 'b', label: 'Nur Kernmitarbeiter informieren, Rest nach Signing',
      kpiDelta: { workforceEngagement: -1, bankTrust: 0 },
      variance: 0.5, execLeakage: 0.3 },

    { id: 'c', label: 'Externe Kanzlei für Überleitungsprozess mandatieren (Kosten 20k)',
      kpiDelta: { profitLossEUR: -20000, bankTrust: +4, publicPerception: +2 },
      variance: 0.7, execLeakage: 0.5 },

    { id: 'd', label: 'Überleitung verzögern, Risiko von Klagen in Kauf nehmen',
      kpiDelta: { workforceEngagement: -3, bankTrust: -2, publicPerception: -2 },
      variance: 0.4, execLeakage: 0.3 }
    ],
  attachments: ['d13_hrlegal_613a_employee_notice_template_tag13.docx']
}];

export const day13Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CEO_BLOCKS_EXTRA,
  ...CFO_BLOCKS,
  ...CFO_BLOCKS_EXTRA,
  ...OPS_BLOCKS,
  ...OPS_BLOCKS_EXTRA,
  ...HRLEGAL_BLOCKS,
  ...HRLEGAL_BLOCKS_EXTRA
];

// -----------------------------
// Helper-Funktionen für dynamische News
// -----------------------------
function choseCommTransparent(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    e.day <= (ctx?.day ?? 99) &&
    typeof e.chosenOptionLabel === 'string' &&
    /fakten|statement|q\&a|faq|transpar|klar|briefing|factsheet|memo|townhall|message house/i.test(e.chosenOptionLabel)
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

function hasCashBufferMoves(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(skonto|abverkauf|zwischenlinie|payroll\-konto|polster|bestandsabverkauf)/i.test(e.chosenOptionLabel)
  );
}

function paymentPlanActive(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(zahlungsplan|anderkonto|bürgschaft|standstill|top\-20 lieferanten)/i.test(e.chosenOptionLabel)
  );
}

function opsQualityProofActive(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(defektrate|nacharbeit|qs|aql|100.*%.*prüf|containment|qualitätsinitiative)/i.test(e.chosenOptionLabel)
  );
}

function hadLOIorCarve(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    typeof e.chosenOptionLabel === 'string' &&
    /(loi|teaser|nda|partner|beteiligung|carve\-?out)/i.test(e.chosenOptionLabel)
  );
}

// src/data/scenario_day_13.ts — NUR den News‑Block ersetzen
export const day13News: DayNewsItem[] = [
  {
    id: 'N13-1',
    day: 13,
    title: 'Payroll morgen fällig',
    source: 'internal',
    severity: 'critical',
    isImportant: true,
    content: 'Letzte Absicherungsschritte laufen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const lowBT = lowBankTrust(ctx, 70);

      // Tag 12 – Cash‑Puffer & Brücken
      const skonto12    = log.some((e: any) => (e.id === 'D12-CFO-2' || e.decisionId === 'D12-CFO-2') && e.optionId === 'a');
      const abverk12    = log.some((e: any) => (e.id === 'D12-CFO-2' || e.decisionId === 'D12-CFO-2') && e.optionId === 'b');
      const line12      = log.some((e: any) => (e.id === 'D12-CFO-2' || e.decisionId === 'D12-CFO-2') && e.optionId === 'c');
      const noBuf12     = log.some((e: any) => (e.id === 'D12-CFO-2' || e.decisionId === 'D12-CFO-2') && e.optionId === 'd');

      // Tag 11/12 – Term Sheet / Covenants fix?
      const termSigned  = log.some((e: any) => (e.id === 'D11-CFO-5' || e.decisionId === 'D11-CFO-5' || e.id === 'D12-CFO-5' || e.decisionId === 'D12-CFO-5') && /a|c/.test(String(e.optionId)));
      const termRedline = log.some((e: any) => (e.id === 'D11-CFO-5' || e.decisionId === 'D11-CFO-5' || e.id === 'D12-CFO-5' || e.decisionId === 'D12-CFO-5') && e.optionId === 'b');

      // Tag 13 – Working‑Capital Quick Wins
      const wcHard      = log.some((e: any) => (e.id === 'D13-CFO-3' || e.decisionId === 'D13-CFO-3') && e.optionId === 'a');
      const wcGentle    = log.some((e: any) => (e.id === 'D13-CFO-3' || e.decisionId === 'D13-CFO-3') && e.optionId === 'b');
      const wcSkonto    = log.some((e: any) => (e.id === 'D13-CFO-3' || e.decisionId === 'D13-CFO-3') && e.optionId === 'd');

      let s = 'Die Lohn‑ und Gehaltszahlung steht morgen an. Das Team achtet auf eindeutige Signale zur Absicherung des Payroll‑Kontos und auf die Liquiditätsbrücke über das Wochenende. ';
      if (skonto12 || abverk12) s += 'Bereits angestoßene Puffermaßnahmen (Skonto/Abverkauf) schaffen Spielraum und erhöhen die Glaubwürdigkeit. ';
      if (line12 && termSigned) s += 'Mit unterschriebenem Term Sheet und angefragter Zwischenlinie ist die Abdeckung plausibel darstellbar. ';
      if (termRedline)          s += 'Zu offenen Redlines erwartet die Bank heute eine kurze Klarstellung. ';
      if (wcHard)               s += 'Achtung: Hartes Beitreiben kann kurzfristig helfen, belastet aber Kundenbeziehungen. ';
      if (wcGentle)             s += 'Gezieltes Mahnwesen stützt die Liquidität ohne Eskalation. ';
      if (wcSkonto)             s += 'Ein Skonto‑Push bringt Cash, erzeugt aber Signalwirkung – sauber begründen. ';
      if (noBuf12 && lowBT)     s += 'Ohne zusätzlichen Puffer und bei verhaltenem Bankvertrauen steigt das Gerüchterisiko; klare Fakten sind entscheidend. ';
      s += 'Empfehlung: Heute schriftlich Payroll‑Abdeckung und Freigabeprozess bestätigen (Owner/Zeitleiste), Bank/Beirat im CC.';
      return s.trim();
    }
  },
  {
    id: 'N13-2',
    day: 13,
    title: 'Kunden fordern finale Zusicherung',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Zwei A‑Kunden bitten um Liefergarantie.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];

      // QS / Containment (Tag 12/13 OPS)
      const cont12a = log.some((e: any) => (e.id === 'D12-OPS-5' || e.decisionId === 'D12-OPS-5') && e.optionId === 'a');
      const aql12   = log.some((e: any) => (e.id === 'D12-OPS-5' || e.decisionId === 'D12-OPS-5') && e.optionId === 'b');
      const cont13a = log.some((e: any) => (e.id === 'D13-OPS-5' || e.decisionId === 'D13-OPS-5') && e.optionId === 'a');
      const aql13   = log.some((e: any) => (e.id === 'D13-OPS-5' || e.decisionId === 'D13-OPS-5') && e.optionId === 'b');

      // Lieferzusagen / Sonderschicht (Tag 13 OPS‑1)
      const shift = log.some((e: any) => (e.id === 'D13-OPS-1' || e.decisionId === 'D13-OPS-1') && /a|b|d/.test(String(e.optionId)));

      let s = 'Zwei A‑Kunden stellen eine schriftliche Bestätigung zu Lieferterminen und Eskalationspfad für die nächsten 72 Stunden in Aussicht, gekoppelt an Qualitätssicherung. ';
      if (cont12a || cont13a) s += 'Die befristete 100‑%‑Prüfung wirkt vertrauensbildend; Reklamationsrisiko sinkt sichtbar. ';
      if ((aql12 || aql13) && !cont12a && !cont13a) s += 'Ein gestufter AQL‑Plan ist plausibel, sollte aber mit klaren Checkpoints unterlegt werden. ';
      if (shift) s += 'Die freigegebene Sonderschicht/Express‑Logik stützt die Termintreue. ';
      s += 'Empfehlung: Kurzbrief mit Terminlinie, Eskalationskontakt und QS‑Checkpoints (Anhang) noch heute senden.';
      return s.trim();
    }
  },
  {
    id: 'N13-3',
    day: 13,
    title: 'Lieferkettenlage stabilisiert sich',
    source: 'supplier',
    severity: 'medium',
    isImportant: false,
    content: 'Mehrere Partner signalisieren Kooperation.',
    expandedText: (ctx: any) => {
      const plan = paymentPlanActive(ctx);
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const d10Plan   = log.some((e: any) => (e.id === 'D10-CFO-3' || e.decisionId === 'D10-CFO-3') && e.optionId === 'c');
      const d11Plan   = log.some((e: any) => (e.id === 'D11-CFO-3' || e.decisionId === 'D11-CFO-3') && /a|b/.test(String(e.optionId)));
      const feeSigned = log.some((e: any) => (e.id === 'D11-CFO-5' || e.decisionId === 'D11-CFO-5' || e.id === 'D12-CFO-5' || e.decisionId === 'D12-CFO-5') && /a|c/.test(String(e.optionId)));

      let s = 'Mehrere Lieferanten signalisieren eine kooperative Haltung für die finale Woche, sofern Zahlungsdisziplin nachvollziehbar bleibt. ';
      if (plan || d10Plan || d11Plan) s += 'Der strukturierte Zahlungsplan (DB/Kritikalität, Slots/Sicherheiten) zeigt Wirkung; Eskalationen nehmen ab. ';
      if (feeSigned) s += 'Die fixierten Informationsrechte im Term Sheet erhöhen die Planbarkeit auf beiden Seiten. ';
      if (!plan && !d10Plan && !d11Plan) s += 'Ohne bestätigten Zahlungsplan bleibt die Lage fragil; einzelne Lieferstopps sind nicht ausgeschlossen. ';
      s += 'Empfehlung: Nächste Fix‑Slots bestätigen, Prioritätskriterien erneut teilen und Anderkonto/Bürgschaft dort nutzen, wo es Hebelwirkung hat.';
      return s.trim();
    }
  },
  {
    id: 'N13-4',
    day: 13,
    title: 'Blog spekuliert über LOI‑Timing',
    source: 'press',
    severity: 'low',
    isImportant: false,
    content: 'Artikel über mögliche Partnerschafts‑Optionen.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const had = hadLOIorCarve(ctx);
      const ceoMgmt = log.find((e: any) => (e.id === 'D13-CEO-2' || e.decisionId === 'D13-CEO-2'))?.optionId;

      let s = 'Ein Branchenblog diskutiert das mögliche Timing eines LOI und verknüpft dies mit dem Ergebnis der Woche‑2‑Stabilisierungsmaßnahmen. ';
      if (ceoMgmt === 'a') s += 'Das interne Erwartungsmanagement (Meilensteine + Unsicherheiten) dämpft Spekulationen. ';
      if (ceoMgmt === 'd') s += 'Ein öffentliches Andeuten erhöht die Angriffsfläche; Sprachregelung strikt einhalten. ';
      if (had) s += 'Da intern bereits sondiert wird, empfiehlt sich eine faktenbasierte, nicht‑präjudizierende Linie. ';
      s += 'Empfehlung: Q&A für Medien/Stakeholder mit Fokus auf Operative und Waiver‑Fortschritt bereitstellen, ohne Zahlen zu präjudizieren.';
      return s.trim();
    }
  },

  // Kontextmeldungen (je 1 pro Rolle, Anknüpfung an Entscheidungen)
  {
    id: 'N13-5',
    day: 13,
    title: 'CEO: Message House final abgestimmt',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Kernbotschaften für Bank, Kunden und Team liegen vor.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const msgAll  = log.some((e: any) => (e.id === 'D13-CEO-1' || e.decisionId === 'D13-CEO-1') && e.optionId === 'b');
      const msgInt  = log.some((e: any) => (e.id === 'D13-CEO-1' || e.decisionId === 'D13-CEO-1') && e.optionId === 'a');
      const msgBank = log.some((e: any) => (e.id === 'D13-CEO-1' || e.decisionId === 'D13-CEO-1') && e.optionId === 'c');

      let s = 'Das „Message House“ bündelt Waiver‑Fortschritt, Qualitätsstabilisierung und Lieferzusagen für die nächsten 72 Stunden. ';
      if (msgAll)  s += 'Die gemeinsame Botschaft (CEO/CFO) sorgt für hohe Konsistenz über alle Kanäle. ';
      if (msgInt)  s += 'Zunächst internes Update – Kundenbrief folgt morgen; Erwartungsmanagement beachten. ';
      if (msgBank) s += 'Bankfokus ist gesetzt; externe Fragen sollten mit einem schlanken Kunden‑Memo abgefangen werden. ';
      s += 'Empfehlung: Versand an Führungskräfte und Key Accounts mit identischen Kernpunkten und klaren Owners je Aussage.';
      return s.trim();
    }
  },
  {
    id: 'N13-6',
    day: 13,
    title: 'CFO: Fee Letter im Zielkorridor',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content: 'Bank konkretisiert Gebühren, Reporting und Trigger.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const feeOpt = log.find((e: any) => (e.id === 'D13-CFO-5' || e.decisionId === 'D13-CFO-5'))?.optionId;
      const finalPack = log.some((e: any) => (e.id === 'D13-CFO-4' || e.decisionId === 'D13-CFO-4') && /a|d/.test(String(e.optionId)));

      let s = 'Der Entwurf konkretisiert Gebühren, Informationsrechte und Milestone‑Trigger für die finale Phase. ';
      if (feeOpt === 'a') s += 'Niedrige Fee, dafür enges Reporting – operativ machbar, erfordert Disziplin. ';
      if (feeOpt === 'b') s += 'Moderate Fee mit präzisen Triggern; guter Kompromiss aus Kosten und Flexibilität. ';
      if (feeOpt === 'c') s += 'Höhere Fee gegen mehr Spielräume; Bank erwartet sichtbare Steuerungsstärke. ';
      if (feeOpt === 'd') s += 'Offenlassen des Deals wäre ein negatives Signal – vermeiden. ';
      if (finalPack)      s += 'Das „Final View“-Pack (Bridge/Sensitivitäten/Tracking) stützt die Verhandlung. ';
      s += 'Empfehlung: Executive Summary + Redlines heute finalisieren und zur Unterschrift vorbereiten.';
      return s.trim();
    }
  },
  {
    id: 'N13-7',
    day: 13,
    title: 'OPS: A‑Linien mit temporärem Containment',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Temporäre Prüftiefe soll Reklamationsrisiken mindern.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const a = log.some((e: any) => (e.id === 'D13-OPS-5' || e.decisionId === 'D13-OPS-5') && e.optionId === 'a');
      const b = log.some((e: any) => (e.id === 'D13-OPS-5' || e.decisionId === 'D13-OPS-5') && e.optionId === 'b');
      const c = log.some((e: any) => (e.id === 'D13-OPS-5' || e.decisionId === 'D13-OPS-5') && e.optionId === 'c');
      const d = log.some((e: any) => (e.id === 'D13-OPS-5' || e.decisionId === 'D13-OPS-5') && e.optionId === 'd');

      let s = 'Für A‑Linien ist eine befristete 100‑%‑Prüfung bzw. ein gestufter AQL‑Plan vorgesehen, um Pönalen zu vermeiden. ';
      if (a) s += '100‑%‑Prüfung für 48 h ist freigegeben – Reklamationsrisiko minimal, Kosten im Blick behalten. ';
      if (b) s += 'AQL‑Plan balanciert Risiko und Kapazität; enges Monitoring nötig. ';
      if (c) s += 'Ohne Zusatzprüfung steigt das Reklamationsrisiko deutlich – nicht empfohlen. ';
      if (d) s += 'Verschiebung dämpft Risiko, gefährdet jedoch Terminzusagen. ';
      s += 'Empfehlung: Startzeit, Prüfumfang und Verantwortliche schriftlich fixieren; Kunden kurz informieren.';
      return s.trim();
    }
  },
  {
    id: 'N13-8',
    day: 13,
    title: 'HR/Legal: Q&A zu LOI/Carve‑out intern geteilt',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Kurzleitfaden adressiert häufige Fragen und verweist auf Freigabeprozess.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const teamTalk  = log.some((e: any) => (e.id === 'D13-HRLEGAL-1' || e.decisionId === 'D13-HRLEGAL-1') && /a|d/.test(String(e.optionId)));
      const privacyOK = log.some((e: any) => (e.id === 'D13-HRLEGAL-2' || e.decisionId === 'D13-HRLEGAL-2') && /b|d/.test(String(e.optionId)));
      const riskyOpen = log.some((e: any) => (e.id === 'D13-HRLEGAL-2' || e.decisionId === 'D13-HRLEGAL-2') && e.optionId === 'a');

      let s = 'Die interne Q&A‑Notiz klärt typische Fragen zu LOI‑Gerüchten, betont Vertraulichkeit und verweist auf definierte Freigaben für externe Kommunikation. ';
      if (teamTalk)  s += 'Die Kombination aus kurzer Team‑Ansprache und klarer Fokusliste stabilisiert die Stimmung. ';
      if (privacyOK) s += 'Datenschutz ist geregelt (Anonymisierung/Review); Datenraum‑Anfragen können kontrolliert bedient werden. ';
      if (riskyOpen) s += 'Volloffenlegung birgt Reputations‑ und Datenschutzrisiken – strenge Zugriffskontrolle beachten. ';
      s += 'Empfehlung: Q&A im Intranet verlinken, Ansprechpartner nennen und den Freigabeprozess sichtbar machen.';
      return s.trim();
    }
  },

  // Füllmeldungen (ohne KPI‑Wirkung; keine Detailfenster)
  { id: 'N13-F1', day: 13, title: 'Lastenaufzug Halle 2 wird gewartet', source: 'internal', severity: 'low', isImportant: false, content: 'Der Lastenaufzug in Halle 2 wird heute zwischen 14:00 und 15:00 Uhr gewartet; in dieser Zeit ist nur der kleinere Aufzug verfügbar.', suppressHints: true },
  { id: 'N13-F2', day: 13, title: 'Telefonanlage: neue Bandansage',     source: 'internal', severity: 'low', isImportant: false, content: 'Die zentrale Bandansage wird aktualisiert; während des Neustarts kann es zu kurzen Unterbrechungen von eingehenden Anrufen kommen.', suppressHints: true },
  { id: 'N13-F3', day: 13, title: 'Besucherparkplätze knapp',           source: 'internal', severity: 'low', isImportant: false, content: 'Aufgrund mehrerer Lieferantentermine sind die Besucherparkplätze bis 11:30 Uhr ausgelastet; bitte Ausweichflächen nutzen.', suppressHints: true },
  { id: 'N13-F4', day: 13, title: 'VPN‑Client‑Update verteilt',          source: 'internal', severity: 'low', isImportant: false, content: 'Die IT rollt ein Minor‑Update des VPN‑Clients aus; ein einmaliger Neustart kann erforderlich sein.', suppressHints: true }
];
