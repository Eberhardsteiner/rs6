// src/data/scenario_day_08.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [];
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [];
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [];

/**
 * TAG 8 — 20 Entscheidungsblöcke (je 5 pro Rolle)
 * Fokus: Woche-2-Start, Waiver-Verhandlung, Kundenportfolio, Bestandsabbau
 */

/**
 * TAG 8 — 20 Entscheidungsblöcke (je 5 pro Rolle)
 * Fokus: Woche-2-Start, Waiver-Verhandlung, Kundenportfolio, Bestandsabbau
 */

const CEO_BLOCKS: DecisionBlock[] = [{
  id: 'D08-CEO-1',
  day: 8,
  role: 'CEO',
  title: 'Teilverkauf (UPA) – Strategie-Alignment im Führungskreis',
  context: 'Investorengespräche laufen; Bank und Belegschaft erwarten klare Linie. Führungsteam muss Deal-Strategie verstehen und mittragen.',
  dilemma: 'Transparenz vs. Verhandlungsspielraum',
  hiddenAgendaHint: 'Ein abgestimmtes Narrativ reduziert Unsicherheit und erhöht Glaubwürdigkeit bei Bank & Investoren.',
  options: [
    { id: 'a', label: 'Nur High-Level Info: „Wir prüfen Optionen" – keine Details',
      kpiDelta: { workforceEngagement: -2, bankTrust: 0 , publicPerception: -1} },
    { id: 'b', label: 'Klare Kommunikation + Führungskreis-Workshop: Varianten Minority-Sale (25 % / 49 %) vs. Asset-Deal erläutern; Fachbegriffe erklären (z. B. SPA=Share Purchase Agreement, Escrow=Treuhandkonto, MAC=Material Adverse Change)',
      kpiDelta: { workforceEngagement: +2, bankTrust: +3, publicPerception: +1 },
      variance: 0.6, execLeakage: 0.4, isTradeOff: true },
    { id: 'c', label: 'Externe Kommunikation vorbereiten (Q&A zu Teilverkauf, einfache Definitionen von Fachbegriffen wie „W&I=Warranty & Indemnity")',
      kpiDelta: { publicPerception: +3, workforceEngagement: +2, bankTrust: +2 },
      variance: 0.7, execLeakage: 0.5, isTradeOff: true },
    { id: 'd', label: 'Berater-Update ohne Einbindung der Führunhgskräfte (kleiner Kreis)',
      kpiDelta: { workforceEngagement: -3, bankTrust: +1, publicPerception: -1, profitLossEUR: -8000 } }
  ],
  attachments: ['d08_ceo_fuehrungskreis_workshop.pdf', 'd08_ceo_ma_glossar.pdf']
},
{
  id: 'D08-CEO-2',
  day: 8,
  role: 'CEO',
  title: 'Kundenmix strategisch justieren',
  context: 'Einige C-Kunden binden Kapazität ohne DB.',
  dilemma: 'DB vs. Marktpräsenz',
  hiddenAgendaHint: 'Fokus auf A/B-Kunden verbessert Runway.',
  options: [
    { id: 'a', label: 'C-Kunden pausieren, A/B priorisieren',
      kpiDelta: { profitLossEUR: +10000, customerLoyalty: -2 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'b', label: 'Moderate Preisanpassung C-Kunden (2 %)',
      kpiDelta: { profitLossEUR: +4000, publicPerception: -1, customerLoyalty: -2 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'c', label: 'Status quo',
      kpiDelta: { profitLossEUR: 0, bankTrust: -2 } },
    { id: 'd', label: 'C-Kunden: Kostensenkung beim Materialeinkauf, Absenkung auf Mindestqualität',
      kpiDelta: { profitLossEUR: +18000, customerLoyalty: -6, publicPerception: -1, workforceEngagement: -2 },
      variance: 0.8, execLeakage: 0.7}
  ],
  attachments: ['d08_ceo_kundenportfolio_analyse.xlsx', 'd08_ceo_db_optimierung.pdf']
},
{
  id: 'D08-CEO-3',
  day: 8,
  role: 'CEO',
  title: 'Teilverkauf – Investor Alignment & Bank Call',
  context: 'Nach interner Vorabstimmung fordert die Bank ein Update. Gleichzeitig erwarten potenzielle Investoren ein klares Signal zur Struktur (Minority vs. Asset-Deal).',
  dilemma: 'Bankvertrauen stärken vs. Verhandlungsspielraum bei Investoren behalten',
  hiddenAgendaHint: 'Offene Punkte (z. B. Consent-Matrix, Escrow, MAC-Klauseln) transparent erklären, ohne Preisanker zu früh preiszugeben.',
  options: [
    { id: 'a', label: 'Nur Bank Call: Status-Update ohne Details zum SPA (Share Purchase Agreement)',
      kpiDelta: { bankTrust: +2, publicPerception: 0, workforceEngagement: -2 } },
    { id: 'b', label: 'Joint Call: Bank & Investoren gemeinsam informieren; klare Definitionen (z. B. Escrow=Treuhandkonto, MAC=Material Adverse Change) erläutern',
      kpiDelta: { bankTrust: +4, publicPerception: +2, workforceEngagement: -1 },
      variance: 0.6, execLeakage: 0.4, isTradeOff: true },
    { id: 'c', label: 'Investor Alignment: nur Top-2 Investoren vertraulich über Struktur und mögliche W&I-Versicherung (Warranty & Indemnity) briefen',
      kpiDelta: { bankTrust: +2, publicPerception: +1 },
      variance: 0.7, execLeakage: 0.5, isTradeOff: true },
    { id: 'd', label: 'Kommunikation vertagen; Fokus auf interne Konsolidierung',
      kpiDelta: { bankTrust: -3, publicPerception: -2, workforceEngagement: -4 }}
  ],
  attachments: ['d08_ceo_bank_update_praesentation.pdf', 'd08_ceo_investor_alignment_protokoll.docx']
},
{
  id: 'D08-CEO-4',
  day: 8,
  role: 'CEO',
  title: 'Krisenbonus für Schlüsselkräfte?',
  context: 'Abgänge in kritischen Teams drohen.',
  dilemma: 'Kosten vs. Bindung',
  hiddenAgendaHint: 'Gezielte Boni statt Gießkanne.',
  options: [
    { id: 'a', label: 'Retention-Bonus für 10 Schlüsselkräfte)',
      kpiDelta: { cashEUR: -15000, profitLossEUR: -15000, workforceEngagement: +6 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'b', label: 'Nur symbolische Anerkennung',
      kpiDelta: { workforceEngagement: 0, publicPerception: +1 } },
    { id: 'c', label: 'Keine Maßnahme',
      kpiDelta: { workforceEngagement: -2 } },
    { id: 'd', label: 'Breiter Bonus (teuer, wenig Fokus)',
      kpiDelta: { cashEUR: -35000, profitLossEUR: -35000, workforceEngagement: +3, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7}
  ],
  attachments: ['d08_ceo_retention_programm.pdf', 'd08_ceo_schluesselkraefte_matrix.xlsx']
},
{
  id: 'D08-CEO-5',
  day: 8,
  role: 'CEO',
  title: 'Medienresonanz steuern (Korrektur/Follow-up)',
  context: 'Nach TV-Beitrag kursieren einzelne Zitate; Social-Media-Reaktionen gemischt.',
  dilemma: 'Korrektur vs. Ruhe lassen',
  hiddenAgendaHint: 'Sachliche Korrektur ohne Aufbauschen kann Deutungshoheit zurückgewinnen.',
  options: [
    { id: 'a', label: 'Kurze Korrektur zu unpräzisen Punkten + Stakeholder-Newsletter',
      kpiDelta: { publicPerception: +3, workforceEngagement: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur intern kommunizieren, extern abwarten',
      kpiDelta: { publicPerception: -1, workforceEngagement: +1 } },
    { id: 'c', label: 'Folgeinterview anbieten (proaktiv)',
      kpiDelta: { publicPerception: +2, bankTrust: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'd', label: 'Keine Reaktion',
      kpiDelta: { publicPerception: -2 } }
  ],
  attachments: ['d08_ceo_medienresonanz_analyse.pdf', 'd08_ceo_stakeholder_newsletter.pdf']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
  id: 'D08-CFO-1',
  day: 8,
  role: 'CFO',
  title: 'Waiver-Verhandlung terminieren',
  context: 'Covenant-Verstoß wahrscheinlich.',
  dilemma: 'Zeitpunkt vs. Vorbereitung',
  hiddenAgendaHint: 'Gute Unterlagen verbessern Chancen.',
  options: [
    { id: 'a', label: 'Termin in 3 Tagen + Unterlagenpaket',
      kpiDelta: { bankTrust: +5}, isTradeOff: true },
    { id: 'b', label: 'Nur schriftlich anfragen',
      kpiDelta: { bankTrust: +2 } },
    { id: 'c', label: 'Abwarten',
      kpiDelta: { bankTrust: -3 } },
    { id: 'd', label: 'Sondieren über Beirat',
      kpiDelta: { bankTrust: +2 } }
  ],
  attachments: ['d08_cfo_waiver_unterlagenpaket.pdf', 'd08_cfo_covenant_bridge_berechnung.xlsx']
},
{
  id: 'D08-CFO-2',
  day: 8,
  role: 'CFO',
  title: 'Bestandsabbau II – Langsamdreher',
  context: 'Geringe Auslastung, Platz und Cash binden.',
  dilemma: 'Abwertung vs. Cash',
  hiddenAgendaHint: 'Gezielte Abverkäufe schonen Marke, reduzieren aber Wiederanlaufpotential.',
  options: [
    { id: 'a', label: 'Aggressiver Abverkauf',
      kpiDelta: { cashEUR: +800000, profitLossEUR: -248000, bankTrust: +4, workforceEngagement: -1 },
      variance: 0.8, execLeakage: 0.7,
      cooldownDays: 2, sideEffects: { publicPerception: -1 }, lagDays: 1},
    { id: 'b', label: 'Realistischer Abverkauf',
      kpiDelta: { cashEUR: +300000, profitLossEUR: -75000, bankTrust: +2 }, variance: 0.8, execLeakage: 0.7},
    { id: 'c', label: 'Konservativer Abverkauf',
      kpiDelta: { cashEUR: +200000, profitLossEUR: -45000, bankTrust: +1 } },
    { id: 'd', label: 'Minimaler Abverkauf',
      kpiDelta: { cashEUR: +100000, profitLossEUR: -15000, customerLoyalty: +1, bankTrust: -1 },
      variance: 0.8, execLeakage: 0.7,
      cooldownDays: 2, sideEffects: { publicPerception: -1 }, lagDays: 1}
  ],
  attachments: ['d08_cfo_bestandsanalyse.xlsx', 'd08_cfo_abverkaufsstrategie.pdf']
},
{
  id: 'D08-CFO-3',
  day: 8,
  role: 'CFO',
  title: 'DSO/DPO/DIO öffentlich im Weekly',
  context: 'Transparenz intern erhöhen.',
  dilemma: 'Druck vs. Motivation',
  hiddenAgendaHint: 'Kennzahlen fördern Disziplin.',
  options: [
    { id: 'a', label: 'KPIs je Bereich offenlegen',
      kpiDelta: { workforceEngagement: +1, bankTrust: +2 } },
    { id: 'b', label: 'Nur Management-Sicht',
      kpiDelta: { bankTrust: +1 } },
    { id: 'c', label: 'Keine KPI-Transparenz',
      kpiDelta: { bankTrust: -1 } },
    { id: 'd', label: 'Scorecards mit Boni koppeln (5k)',
      kpiDelta: { profitLossEUR: -5000, workforceEngagement: +2 },
      variance: 0.8, execLeakage: 0.7}
  ],
  attachments: ['d08_cfo_kpi_dashboard.xlsx', 'd08_cfo_working_capital_weekly.pdf']
},
{
  id: 'D08-CFO-4',
  day: 8,
  role: 'CFO',
  title: 'Teilverkauf – Datenraum-Setup & Q&A-Vorbereitung',
  context: 'Investoren erwarten schnellen Zugang; parallele Anfragen mehrerer Bieter.',
  dilemma: 'Transparenz vs. Vertraulichkeit',
  hiddenAgendaHint: 'Strukturierter Datenraum beschleunigt DD und erhöht Bietervertrauen.',
  options: [
    { id: 'a', label: 'Vollständiger VDR mit Red-Flag-Report',
      kpiDelta: { bankTrust: +3, profitLossEUR: -15000 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'b', label: 'Basis-Datenraum selbst erstellen',
      kpiDelta: { bankTrust: +1 } },
    { id: 'c', label: 'Bilateral je Investor',
      kpiDelta: { bankTrust: 0, workforceEngagement: -1 } },
    { id: 'd', label: 'Datenraum vertagen',
      kpiDelta: { bankTrust: -2 } }
  ],
  attachments: ['d08_cfo_datenraum_struktur.pdf', 'd08_cfo_vendor_dd_checkliste.xlsx']
},
{
  id: 'D08-CFO-5',
  day: 8,
  role: 'CFO',
  title: 'Kofinanzierung & Zwischenfinanzierung bis Förderbescheid',
  context: 'Vorprüfung positiv; Einreichfrist läuft. Bridge bis Bewilligung klären.',
  dilemma: 'Kosten der Bridge vs. Geschwindigkeit/Sicherheit',
  hiddenAgendaHint: 'Kleine Zwischenlinie oder Factoring-Top-up signalisiert Steuerungsfähigkeit.',
  options: [
    { id: 'a', label: 'Bankbrief + kleine Zwischenlinie verhandeln',
      kpiDelta: { bankTrust: +2, cashEUR: +190000, profitLossEUR: -8000 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Factoring-Top-up auf A-Forderungen',
      kpiDelta: { cashEUR: +90000, profitLossEUR: -4500 } },
    { id: 'c', label: 'Eigenmittel nutzen, keine Bridge',
      kpiDelta: { bankTrust: 0 } },
    { id: 'd', label: 'Fristverlängerung beantragen (Risiko)',
      kpiDelta: { bankTrust: -2 } }
  ],
  attachments: ['d08_cfo_kofinanzierungsnachweis.pdf', 'd08_cfo_foerdermittel_timeline.xlsx']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
  id: 'D08-OPS-1',
  day: 8,
  role: 'OPS',
  title: 'Produktionslayout temporär ändern',
  context: 'Rüstzeiten reduzieren.',
  dilemma: 'Umbaukosten vs. Durchsatz',
  hiddenAgendaHint: 'Kurzfristige Effizienz hilft DB.',
  options: [
    { id: 'a', label: 'Umlaufoptimierung (8k)',
      kpiDelta: { profitLossEUR: -8000, customerLoyalty: +2, workforceEngagement: +2 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'b', label: 'Nur kleine Anpassungen',
      kpiDelta: { profitLossEUR: -2000, customerLoyalty: +1, workforceEngagement: +1 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'c', label: 'Keine Änderung',
      kpiDelta: { customerLoyalty: 0, workforceEngagement: -1 } },
    { id: 'd', label: 'Externe Layoutplanung (12k)',
      kpiDelta: { cashEUR: -12000, profitLossEUR: -12000, customerLoyalty: +3, workforceEngagement: -1 },
      variance: 0.8, execLeakage: 0.7}
  ],
  attachments: ['d08_ops_layout_optimierung.pdf', 'd08_ops_ruestzeitanalyse.xlsx']
},
{
  id: 'D08-OPS-2',
  day: 8,
  role: 'OPS',
  title: 'Qualitätskosten weiter senken',
  context: 'Fehlerbilder stabil, Nacharbeit teuer.',
  dilemma: 'Invest vs. Ersparnis',
  hiddenAgendaHint: 'Ursachenbeseitigung zahlt sich aus.',
  options: [
    { id: 'a', label: 'Poka-Yoke an 2 Stationen',
      kpiDelta: { profitLossEUR: -6000, customerLoyalty: +3 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'b', label: 'Nur Schulung',
      kpiDelta: { profitLossEUR: -2000, customerLoyalty: +1 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'c', label: 'Keine Maßnahme',
      kpiDelta: { customerLoyalty: -1 } },
    { id: 'd', label: 'Externer Audit',
      kpiDelta: { profitLossEUR: -7000, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7}
  ],
  attachments: ['d08_ops_pokayoke_konzept.pdf', 'd08_ops_qualitaetskostenrechnung.xlsx']
},
{
  id: 'D08-OPS-3',
  day: 8,
  role: 'OPS',
  title: 'Make-or-Buy kurzfristig',
  context: 'Engpassteil teuer in Eigenfertigung.',
  dilemma: 'Kosten vs. Kontrolle',
  hiddenAgendaHint: 'Buy reduziert Rüstkosten kurzfristig.',
  options: [
    { id: 'a', label: 'Buy für 4 Wochen (+12 % EK)',
      kpiDelta: { profitLossEUR: -9000, customerLoyalty: +2, workforceEngagement: -2 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'b', label: 'Eigenfertigung halten',
      kpiDelta: { profitLossEUR: 0, workforceEngagement: +2 } },
    { id: 'c', label: 'Hybridmodell',
      kpiDelta: { profitLossEUR: -4000, customerLoyalty: +1 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'd', label: 'Auftrag verschieben',
      kpiDelta: { customerLoyalty: -4, workforceEngagement: -2 } }
  ],
  attachments: ['d08_ops_makeorbuy_analyse.pdf', 'd08_ops_lieferantenvergleich.xlsx']
},
{
  id: 'D08-OPS-4',
  day: 8,
  role: 'OPS',
  title: 'Service-Team zu Kunden vor Ort',
  context: 'Reklamationen nehmen ab, Präsenz könnte beruhigen.',
  dilemma: 'Kosten vs. Image',
  hiddenAgendaHint: 'Vor-Ort-Präsenz schafft Vertrauen.',
  options: [
    { id: 'a', label: '2 Service-Teams für A-Kunden',
      kpiDelta: { profitLossEUR: -7000, customerLoyalty: +4, publicPerception: +1, workforceEngagement: +2 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'b', label: 'Nur Remote-Support',
      kpiDelta: { customerLoyalty: +1 } },
    { id: 'c', label: 'Keine Maßnahme',
      kpiDelta: { customerLoyalty: -1 } },
    { id: 'd', label: 'Service ausbauen',
      kpiDelta: { profitLossEUR: -15000, customerLoyalty: +5, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7}
  ],
  attachments: ['d08_ops_service_einsatzplan.pdf', 'd08_ops_kundenzufriedenheit_report.xlsx']
},
{
  id: 'D08-OPS-5',
  day: 8,
  role: 'OPS',
  title: 'Produktionsoptimierung & Kapazitätsplanung (Follow-up)',
  context: 'Nach den gestrigen Optimierungsmaßnahmen zeigen sich erste Effekte. Weitere Anpassungen möglich.',
  dilemma: 'Kontinuierliche Verbesserung vs. Stabilität',
  hiddenAgendaHint: 'Systematische Optimierung verbessert langfristig die Wettbewerbsfähigkeit.',
  options: [
    { id: 'a', label: 'Weitere Layoutoptimierung + Schulung',
      kpiDelta: { profitLossEUR: -10000, customerLoyalty: +3, workforceEngagement: +2 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur Monitoring der bisherigen Maßnahmen',
      kpiDelta: { customerLoyalty: +1 } },
    { id: 'c', label: 'Rückbau auf vorherige Konfiguration',
      kpiDelta: { workforceEngagement: -2, customerLoyalty: -1 } },
    { id: 'd', label: 'Externe Beratung für Lean-Konzept',
      kpiDelta: { profitLossEUR: -15000, customerLoyalty: +4, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['d08_ops_lean_konzept.pdf', 'd08_ops_kapazitaetsplanung.xlsx']
}];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
  id: 'D08-HRLEGAL-1',
  day: 8,
  role: 'HRLEGAL',
  title: 'Retention-Maßnahmen rechtssicher',
  context: 'Boni/Benefits prüfen.',
  dilemma: 'Schnelligkeit vs. Gleichbehandlung',
  hiddenAgendaHint: 'Dokumentation schützt vor Konflikten.',
  options: [
    { id: 'a', label: 'Kriterien + Dokumentation, BR informieren, Stufe A und B durchführen',
      kpiDelta: { workforceEngagement: +6, publicPerception: +1, profitLossEUR: -45000, cashEUR: -45000 },
      isTradeOff: true },
    { id: 'b', label: 'Stufe A durchführen',
      kpiDelta: { workforceEngagement: +3, profitLossEUR: -30000, cashEUR: -30000 } },
    { id: 'c', label: 'Keine Retention',
      kpiDelta: { workforceEngagement: -2 } },
    { id: 'd', label: 'Vertrauliche Einzelfallregelungen',
      kpiDelta: { publicPerception: -1, workforceEngagement: -2, profitLossEUR: -10000, cashEUR: -10000  } }
  ],
  attachments: ['d08_hrlegal_retention_richtlinie.pdf']
},
{
  id: 'D08-HRLEGAL-2',
  day: 8,
  role: 'HRLEGAL',
  title: 'Arbeitszeitflexibilisierung verlängern',
  context: 'Woche 2 braucht Stabilität.',
  dilemma: 'Planbarkeit vs. Freiheit',
  hiddenAgendaHint: 'Einvernehmliche Lösungen.',
  options: [
    { id: 'a', label: 'Befristete Verlängerung + Review',
      kpiDelta: { workforceEngagement: +2 } },
    { id: 'b', label: 'Unbefristet verlängern',
      kpiDelta: { workforceEngagement: -1 } },
    { id: 'c', label: 'Auslaufen lassen',
      kpiDelta: { workforceEngagement: -2 } },
    { id: 'd', label: 'Erweitern um Homeoffice',
      kpiDelta: { workforceEngagement: +2, publicPerception: +1, customerLoyalty: -2 },
      isTradeOff: true }
  ],
  attachments: []
},
{
  id: 'D08-HRLEGAL-3',
  day: 8,
  role: 'HRLEGAL',
  title: 'Kommunikation: Disziplin bei Freigaben',
  context: 'Gerüchte über „Sonderfreigaben für Lieferantenzahlungen" kursieren.',
  dilemma: 'Transparenz vs. Imageschaden',
  hiddenAgendaHint: 'Sachliche Information beruhigt.',
  options: [
    { id: 'a', label: 'Nur intern informieren',
      kpiDelta: { bankTrust: +1, workforceEngagement: +1, publicPerception: -1 } },
    { id: 'b', label: 'Nicht kommunizieren',
      kpiDelta: { publicPerception: -3, workforceEngagement: -1, bankTrust: -1} },
    { id: 'c', label: 'Prozessdarstellung & Audit-Trail teilen',
      kpiDelta: { bankTrust: +2, publicPerception: +2, workforceEngagement: +1 } },
    { id: 'd', label: 'Externe Prüfung ankündigen',
      kpiDelta: { profitLossEUR: -8000, publicPerception: +2, bankTrust: +1, workforceEngagement: -1 },
      variance: 0.8, execLeakage: 0.7}
  ],
  attachments: ['d08_hrlegal_freigabeprozess_dokumentation.pdf']
},
{
  id: 'D08-HRLEGAL-4',
  day: 8,
  role: 'HRLEGAL',
  title: 'Einstellungsstopp: Recruiting selektiv öffnen',
  context: 'Zwei Schlüsselpositionen bleiben kritisch.',
  dilemma: 'Freeze vs. Bedarf',
  hiddenAgendaHint: 'Gezielte Ausnahmen statt breiter Öffnung.',
  options: [
    { id: 'a', label: 'Ausnahme für 2 Schlüsselrollen',
      kpiDelta: { workforceEngagement: +3, bankTrust: -1, cashEUR: -15000, profitLossEUR: -15000 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'b', label: 'Freeze fortführen',
      kpiDelta: { workforceEngagement: -3 } },
    { id: 'c', label: 'Breit öffnen (Risiko Kosten)',
      kpiDelta: { cashEUR: -30000, profitLossEUR: -30000, publicPerception: -1, workforceEngagement: +4, bankTrust: -4 },
      variance: 0.8, execLeakage: 0.7},
    { id: 'd', label: 'Interne Versetzung priorisieren',
      kpiDelta: { workforceEngagement: -1 } }
  ],
  attachments: ['d08_hrlegal_stellenbesetzung_kritikalitaet.xlsx_recruiting_freeze_ausnahmen.pdf']
},
                                       
{
  id: 'D08-HRLEGAL-5',
  day: 8,
  role: 'HRLEGAL',
  title: 'Compliance-Maßnahmenplan & Kommunikation (intern/extern)',
  context: 'Vorprüfung identifizierte Lücken in der Freigabedoku; Reputationsrisiko managen.',
  dilemma: 'Gründlichkeit vs. Geschwindigkeit der Beruhigung',
  hiddenAgendaHint: 'Kurzreport + Schulung + BR-Einbindung senken Leak-Risiko.',
  options: [
    { id: 'a', label: 'Forensic-Light Kurzreport (3k) + Schulung fortführen (9k)',
      kpiDelta: {cashEUR: -12000, profitLossEUR: -12000, publicPerception: +2, workforceEngagement: +1 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Interner Maßnahmenplan + Audit-Trail',
      kpiDelta: { publicPerception: +1 } },
    { id: 'c', label: 'Nur Reminder/Memo ohne Maßnahmen',
      kpiDelta: { publicPerception: -1 } },
    { id: 'd', label: 'Kein externes Statement',
      kpiDelta: { publicPerception: -2, workforceEngagement: -2 } }
  ],
  attachments: ['d08_hrlegal_compliance_massnahmenplan.pdf']
}];


export const day8Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CFO_BLOCKS,
  ...OPS_BLOCKS,
  ...HRLEGAL_BLOCKS
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


export const day8News: DayNewsItem[] = [


  // Kleine Service-Infos (ohne Detailfenster)
  { id: 'N08-F1', day: 8, title: 'Kantine: Kassen-Update',        source: 'internal', severity: 'low',    isImportant: false, content: 'Zwischen 11:30–12:00 Uhr kann es an den Kassen zu kurzen Wartezeiten kommen.', suppressHints: true },
  { id: 'N08-F2', day: 8, title: 'IT: Backup erfolgreich',         source: 'internal', severity: 'low',    isImportant: false, content: 'Das wöchentliche System‑Backup wurde ohne Auffälligkeiten abgeschlossen.',   suppressHints: true },
  { id: 'N08-F3', day: 8, title: 'Facility: Tor Nord halbseitig',  source: 'internal', severity: 'low',    isImportant: false, content: 'Wegen Wartung ist Tor Nord vormittags nur einspurig befahrbar.',             suppressHints: true },
  { id: 'N08-F4', day: 8, title: 'KVP‑Notiz',                      source: 'internal', severity: 'low',    isImportant: false, content: 'Rüstzeit an Linie P2 durch kleine Layout‑Anpassung um ~4 % gesenkt.',        suppressHints: true },

  /**
   * Vier Kernmeldungen Tag 8
   */
  {
    id: 'N8-1',
    day: 8,
    title: 'Waiver‑Termin bestätigt – Unterlagenliste scharf',
    source: 'bank',
    severity: 'high',
    isImportant: true,
    content: 'Die Bank bestätigt den Waiver‑Slot und fordert ein präzises Dokumentenpaket.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.choice === t || e.optionId === t || (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))))
        );

      const lowBT       = lowBankTrust(ctx, 70);
      const term3days   = picked('D08-CFO-1', 'a');
      const waiverMail  = picked('D08-CFO-1', 'b');
      const waited      = picked('D08-CFO-1', 'c');
      const beiratPing  = picked('D08-CFO-1', 'd');

      const bridgeReady = picked('D05-CFO-1', 'a') || picked('D05-CFO-1', 'd');
      const packReady   = picked('D04-CFO-4', 'a') || picked('D04-CFO-4', 'b');
      const rolling     = picked('D07-CFO-1', 'b');
      const termsSigned = picked('D06-CEO-1', 'a') || picked('D06-CEO-1', 'b');

      let s = 'Die Hausbank hat den Termin zur Waiver‑Verhandlung fixiert und eine Unterlagenliste übermittelt (Rolling‑13‑Week, Sensitivitäten, Beirats‑Statement, Milestone‑Nachweise). ';
      s += lowBT
        ? 'Die Tonalität ist zurückhaltend: Ohne belastbare Proof‑Points drohen engere Auflagen und eine restriktive Linienführung. '
        : 'Die Bank signalisiert Konstruktivität – vorausgesetzt, Nachweise sind sauber und konsistent. ';
      if (term3days)  s += 'Vorteil: Die frühe Terminierung in drei Tagen schafft Planbarkeit, erhöht aber den Vorbereitungsdruck. ';
      if (waiverMail) s += 'Die schriftliche Anfrage liegt vor; ein persönlicher Slot erhöht die Chance auf Verständnis für Sensitivitäten. ';
      if (waited)     s += 'Hinweis: Abwarten wurde kritisch kommentiert – bitte Timeline und Gründe transparent machen. ';
      if (beiratPing) s += 'Positiv: Ein abgestimmtes Beirats‑Briefing kann die Glaubwürdigkeit erhöhen. ';
      s += bridgeReady ? 'Die Covenant‑Bridge steht – bitte aktuelle Annahmen und Szenarien beilegen. ' : 'Bitte die vollständige Bridge inkl. Szenarien ergänzen. ';
      s += packReady   ? 'Das Reporting‑Pack aus Tag 4 kann als Referenz dienen. ' : '';
      s += rolling     ? 'Das Rolling‑13‑Week wurde aktualisiert – gute Basis für das Gespräch. ' : '';
      s += termsSigned ? 'Der gezeichnete Auflagenbrief stützt die Verhandlungsposition. ' : '';
      s += 'Nächste Schritte: Owner je Anlage benennen, 20‑Min‑Briefing für Beirat/CFO terminieren, Q&A‑Katalog finalisieren.';
      return s.trim();
    }
  },
  {
    id: 'N8-2',
    day: 8,
    title: 'TV‑Beitrag nachhallt – Deutungsrahmen sichern',
    source: 'press',
    severity: 'medium',
    isImportant: true,
    content: 'Social‑Reaktionen sind gemischt; einzelne Zahlen werden aus dem Kontext zitiert.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.choice === t || e.optionId === t || (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))))
        );

      const transparent = choseCommTransparent(ctx);
      const mish        = mishandledComm(ctx);

      const tvLive      = picked('D07-CEO-5', 'a');
      const tvTape      = picked('D07-CEO-5', 'b');
      const opEd        = picked('D07-CEO-5', 'c');
      const prOnly      = picked('D07-CEO-5', 'd');

      const corrNow     = picked('D08-CEO-5', 'a');
      const internalOnly= picked('D08-CEO-5', 'b');
      const followUp    = picked('D08-CEO-5', 'c');
      const noReact     = picked('D08-CEO-5', 'd');

      let s = 'Der gestrige Beitrag im Regional‑TV wird breit geteilt. Kommentare fokussieren auf Bankauflagen, Lieferfähigkeit und Beschäftigung. ';
      s += transparent ? 'Die faktenbasierte Linie zahlt sich aus: Der Tenor bleibt überwiegend sachlich. ' : '';
      s += mish ? 'Mangels klarer Einordnung dominieren einzelne Spekulationen – Kontexte fehlen in Teilen der Berichterstattung. ' : '';
      if (tvLive) s += 'Das Live‑Format brachte Sichtbarkeit, birgt aber naturgemäß offene Flanken in der Q&A. ';
      if (tvTape) s += 'Das aufgezeichnete Statement wirkte kontrolliert, einzelne Passagen werden dennoch gekürzt kolportiert. ';
      if (opEd)   s += 'Der Gastkommentar wird von Fachlesern zitiert; Laienmedien greifen eher Schlagworte auf. ';
      if (prOnly) s += 'Ohne O‑Ton füllen Dritte den Deutungsrahmen. ';
      if (corrNow)      s += 'Geplant: kurze Korrektur zu zwei unpräzisen Stellen plus Stakeholder‑Newsletter. ';
      else if (followUp) s += 'Option: Ein kurzes Folgeinterview mit Zahlenkorridor könnte Spekulationen eindämmen. ';
      else if (internalOnly) s += 'Interne Einordnung hilft der Belegschaft, lässt aber externe Deutung offen. ';
      else if (noReact) s += 'Ohne Reaktion bleibt die Bewertung volatil – Monitoring erforderlich. ';
      s += 'Bitte CFO/Legal frühzeitig in Freigaben einbinden; Social‑Listening heute eng takten.';
      return s.trim();
    }
  },
  {
    id: 'N8-3',
    day: 8,
    title: 'PPAP‑Vorbereitung: Prüfplan & Ressourcen',
    source: 'supplier',
    severity: 'high',
    isImportant: true,
    content: 'QS‑Checklisten, AQL‑Plan und Abnahmefenster stehen – Ressourcen sind zu binden.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.choice === t || e.optionId === t || (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))))
        );

      const ppapFull  = picked('D07-OPS-5', 'a');
      const ppapShort = picked('D07-OPS-5', 'b');
      const ppapBench = picked('D07-OPS-5', 'c');
      const ppapDelay = picked('D07-OPS-5', 'd');

      const dualFast  = picked('D06-OPS-1', 'a') || picked('D06-OPS-1', 'b');
      const contain   = picked('D06-OPS-3', 'a') || picked('D06-OPS-3', 'b') || picked('D06-OPS-3', 'd');
      const qGate     = picked('D07-OPS-1', 'a') || picked('D07-OPS-1', 'b') || picked('D04-OPS-4', 'a') || picked('D05-OPS-4', 'a');

      let s = 'Für den bestätigten PPAP‑Slot sind QS‑Checklisten und AQL‑Sampling vorbereitet; Abnahmefenster wurden mit Einkauf abgestimmt. ';
      if (ppapFull)   s += 'Die Vollprüfung reduziert Reklamationsrisiken – bitte Zeitpuffer und Kapazität fixieren. ';
      else if (ppapShort) s += 'Der verkürzte Prüfpfad beschleunigt den Ramp‑Up, erfordert aber ergänzende Containment‑Maßnahmen. ';
      else if (ppapBench) s += 'Die Parallelprüfung mit dem Erstlieferanten erlaubt einen sauberen, datenbasierten Übergang. ';
      else if (ppapDelay) s += 'Eine Verschiebung setzt stabile Erstversorgung voraus – Risiko und Kundenkommunikation dokumentieren. ';
      s += dualFast ? 'Dual‑Sourcing läuft – tägliche Synchronisation von QS/EK/OPS empfohlen. ' : '';
      s += contain  ? 'Aktive Containment‑Maßnahmen werden fortgeführt, bis Prozessfähigkeit nachgewiesen ist. ' : '';
      s += qGate    ? 'Das verschärfte Qualitätsgate stabilisiert den Durchsatz und stützt die Außenwirkung. ' : '';
      s += 'Bitte Kunden mit Terminschutz‑Liste und Eskalationspfad informieren.';
      return s.trim();
    }
  },
  {
    id: 'N8-4',
    day: 8,
    title: 'Compliance‑Erstbefund: Doku‑Lücken schließen',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Vorprüfung bestätigt fehlende Nachweise bei einzelnen Freigaben – Maßnahmenpfad nötig.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.choice === t || e.optionId === t || (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))))
        );

      const protoOK  = picked('D03-HRLEGAL-4', 'a') || picked('D03-HRLEGAL-4', 'd') || picked('D03-HRLEGAL-4', 'e');
      const training = picked('D04-HRLEGAL-3', 'a') || picked('D04-HRLEGAL-3', 'd');
      const limits   = picked('D03-CFO-4', 'a') || picked('D03-CFO-4', 'b') || picked('D03-CFO-4', 'd');

      const pathFor  = picked('D07-HRLEGAL-5', 'a');
      const pathInt  = picked('D07-HRLEGAL-5', 'b');
      const pathMemo = picked('D07-HRLEGAL-5', 'c');
      const pathClose= picked('D07-HRLEGAL-5', 'd');

      let s = 'Die Vorprüfung stützt den Hinweis teilweise: Bei einzelnen Freigaben fehlt die lückenlose Dokumentation. ';
      s += protoOK ? 'Ein Transparenzprotokoll ist angelegt und wird erweitert. ' : 'Bitte kurzfristig ein Interims‑Protokoll je Freigabe einführen. ';
      s += training ? 'Durchgeführte Schulungen bzw. Stichproben‑Audits erhöhen die Glaubwürdigkeit. ' : '';
      s += limits   ? 'Formale Freigabe‑Limits sind etabliert; Ausnahmen werden über das Board dokumentiert. ' : '';
      if (pathFor)      s += 'Empfehlung: Externe Forensic‑Light beauftragen und Kommunikationspfad mit HR/Legal definieren. ';
      else if (pathInt) s += 'Empfehlung: Interner Maßnahmenplan mit Zielterminen und Audit‑Trail. ';
      else if (pathMemo) s += 'Warnung: Reminder ohne Prüfung adressiert die Lücke nicht – Reputationsrisiko bleibt. ';
      else if (pathClose) s += 'Hinweis: Fall ohne Maßnahmen zu schließen erhöht das externe Risiko deutlich. ';
      s += signsOfPayDelays(ctx) ? 'Da parallel Zahlungsbedingungen verhandelt werden, ist saubere Governance besonders wichtig. ' : '';
      s += 'BR‑Einbindung und kurzes Management‑Update sind empfohlen.';
      return s.trim();
    }
  },

  /**
   * Vier kontextbezogene Meldungen (Brücke Tag 7 → Tag 8)
   */
  {
    id: 'N8-5',
    day: 8,
    title: 'Stakeholder‑Newsletter: Entwurf mit Zahlenkorridor fertig',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Entwurf bündelt Bankauflagen, Lieferpläne und QS‑Fortschritt; Freigabe steht aus.',
    expandedText: (ctx: any) => {
      const transparent = choseCommTransparent(ctx);
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string) =>
        log.some((e: any) => e && (e.id === id || e.decisionId === id) && (e.choice === t || e.optionId === t));

      const doSend   = picked('D08-CEO-5', 'a');
      const waitInt  = picked('D08-CEO-5', 'b');
      const offerFo  = picked('D08-CEO-5', 'c');

      let s = 'Comms hat einen kompakten Newsletter vorbereitet (Kernbotschaften + Zahlenkorridore statt Punktprognosen). ';
      s += transparent ? 'Die Tonalität bleibt nüchtern; Aussagen sind mit Bank‑Reporting konsistent. ' : 'Zurückhaltende Tonalität, um keine falschen Erwartungen zu setzen. ';
      if (doSend)   s += 'Geplanter Versand: heute 16:00 Uhr nach Legal/CFO‑Freigabe. ';
      if (waitInt)  s += 'Interne Einordnung wird priorisiert; externer Versand nach Monitoring der TV‑Resonanz. ';
      if (offerFo)  s += 'Als Alternative ist ein kurzes Folgeinterview vorbereitet – Entscheidung bis Mittag sinnvoll. ';
      return s.trim();
    }
  },
  {
    id: 'N8-6',
    day: 8,
    title: 'Fördermittel: Kofinanzierung gefordert – Bridge festlegen',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Die Förderstelle verlangt einen belastbaren Kofinanzierungsnachweis bis Fristende.',
    expandedText: (ctx: any) => {
      const lowBT = lowBankTrust(ctx, 70);
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string) =>
        log.some((e: any) => e && (e.id === id || e.decisionId === id) && (e.choice === t || e.optionId === t));

      const bridgeLine = picked('D08-CFO-5', 'a');
      const factTopUp  = picked('D08-CFO-5', 'b');
      const ownFunds   = picked('D08-CFO-5', 'c');
      const extend     = picked('D08-CFO-5', 'd');

      let s = 'Für den Vollantrag ist ein Kofinanzierungsplan notwendig (Zwischenlinie, Factoring‑Top‑up oder Eigenmittel). ';
      s += lowBT ? 'Bei verhaltenem Bankvertrauen wirkt eine kleine, klar konditionierte Zwischenlinie als starkes Signal. ' : 'Mit stabiler Bankbeziehung kann ein gezieltes Factoring‑Top‑up ausreichend sein. ';
      if (bridgeLine) s += 'Die Zwischenlinie (+190 k) adressiert die Brücke bis Bescheid; Kosten bitte transparent darstellen. ';
      if (factTopUp)  s += 'Das Top‑up auf A‑Forderungen (+90 k) ist vorbereitet – Kundenkommunikation auf Silent‑Assignment achten. ';
      if (ownFunds)   s += 'Nutzung von Eigenmitteln erhält Flexibilität, sendet aber extern kein zusätzliches Stabilitätssignal. ';
      if (extend)     s += 'Eine reine Fristverlängerung birgt Risiko – Gegenargumentation vorbereiten. ';
      s += 'To‑does: Bankbrief aktualisieren, KPI‑Annahmen prüfen, Einreichpaket finalisieren.';
      return s.trim();
    }
  },
  {
    id: 'N8-7',
    day: 8,
    title: 'Pilotcharge: Express‑ vs. Normal‑Ramp‑up',
    source: 'supplier',
    severity: 'medium',
    isImportant: true,
    content: 'OPS legt zwei Varianten zur Entscheidung vor – inkl. Kosten‑ und QS‑Auswirkung.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string | RegExp) =>
        log.some((e: any) =>
          e && (e.id === id || e.decisionId === id) &&
          (e.choice === t || e.optionId === t || (t instanceof RegExp && t.test(String(e?.chosenOptionLabel || e?.choiceLabel || e?.label || ''))))
        );

      const layoutNow  = picked('D08-OPS-1', 'a') || picked('D08-OPS-1', 'b') || picked('D08-OPS-5', 'a');
      const serviceA   = picked('D08-OPS-4', 'a') || picked('D08-OPS-4', 'd');
      const penaltyMng = picked('D07-OPS-4', 'a') || picked('D07-OPS-4', 'd');
      const dieselCap  = picked('D06-OPS-4', 'a') || picked('D06-OPS-4', 'b');

      let s = 'Für die anstehende Pilotcharge liegen zwei Dispositionsvarianten vor: 1) Express mit 100‑%‑Prüfung, 2) Normaler Ramp‑up mit AQL‑Plan. ';
      s += layoutNow ? 'Die jüngsten Layout‑/Prozessanpassungen verbessern die Startbedingungen in der Fertigung. ' : '';
      s += serviceA  ? 'Kundennahes Service‑Set‑up (Vor‑Ort/erweitert) stützt die Außenwahrnehmung beim Hochlauf. ' : '';
      s += penaltyMng? 'Proaktive Pönale‑Strategien (Neu verhandeln/Kulanz gegen Laufzeit) reduzieren wirtschaftliche Risiken bei Verzögerungen. ' : '';
      s += dieselCap ? 'Der verhandelte Diesel‑Zuschlags‑Cap begrenzt Mehrkosten bei Expressfahrten. ' : '';
      s += 'Empfehlung: Variante anhand DB‑Schwelle und A‑Kundenbedarf entscheiden; Containment‑Ressourcen fest blocken.';
      return s.trim();
    }
  },
  {
    id: 'N8-8',
    day: 8,
    title: 'BR schlägt Jour fixe zu Compliance & Retention vor',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Regeltermin für Maßnahmenabstimmung und Informationsfluss angeboten.',
    expandedText: (ctx: any) => {
      const log = Array.isArray(ctx?.log) ? ctx.log : [];
      const picked = (id: string, t: string) =>
        log.some((e: any) => e && (e.id === id || e.decisionId === id) && (e.choice === t || e.optionId === t));

      const retLawful = picked('D08-HRLEGAL-1', 'a');
      const retention = picked('D08-CEO-4', 'a') || picked('D08-CEO-4', 'd') || picked('D08-CEO-4', 'b');
      const commProc  = picked('D08-HRLEGAL-3', 'c') || picked('D08-HRLEGAL-3', 'd');

      let s = 'Der Betriebsrat bietet einen regelmäßigen Austausch zu Compliance‑Maßnahmen und Retention‑Themen an. ';
      s += retLawful ? 'Die dokumentierte, rechtssichere Ausgestaltung von Retention‑Kriterien erleichtert die Abstimmung. ' : '';
      s += retention ? 'Gezielte Retention‑Schritte sind vorbereitet – Transparenz über Kriterien stärkt Akzeptanz. ' : '';
      s += commProc  ? 'Die geplante Prozessdarstellung/Audit‑Trail unterstützt die Glaubwürdigkeit in der Belegschaft. ' : 'Eine kurze Prozessskizze (Freigaben/Owner/Fristen) hilft, Leaks zu vermeiden. ';
      s += 'Vorschlag: Jour fixe wöchentlich, 30 Min, klarer Maßnahmen‑Tracker mit Verantwortlichen.';
      return s.trim();
    }
  },

  /**
   * Vier weitere Füllmeldungen (ohne KPI‑Wirkung)
   */
  { id: 'N8-9',  day: 8, title: 'ÖPNV: Verzögerungen möglich',         source: 'internal', severity: 'low', isImportant: false, content: 'Regionalbahn meldet Störungen am Morgen. Bitte Fahrzeit einplanen.', suppressHints: true },
  { id: 'N8-10', day: 8, title: 'Wasserspender defekt',               source: 'internal', severity: 'low', isImportant: false, content: 'Der Wasserspender im Erfrischungsraum ist außer Betrieb; Technik ist informiert.', suppressHints: true },
  { id: 'N8-11', day: 8, title: 'Praktikanten gesucht',               source: 'internal', severity: 'low', isImportant: false, content: 'Wir suchen Praktikant:innen für Produktion und Verwaltung. Hinweise bitte an HR.', suppressHints: true },
  { id: 'N8-12', day: 8, title: 'Parkdeck: Markierungen frisch',      source: 'internal', severity: 'low', isImportant: false, content: 'Zwischen 14–16 Uhr sind einzelne Stellplätze gesperrt. Bitte Beschilderung beachten.', suppressHints: true }
];
