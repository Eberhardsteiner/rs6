import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [];
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [];
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [];

/**
 * TAG 3 — 16 Entscheidungsblöcke (je 4 pro Rolle)
 * Eskalation: Lohnlauf in Sicht, Behördenstundung, Kundeneskalation, Wartungsstau
 */

const CEO_BLOCKS: DecisionBlock[] = [{
  id: 'D03-CEO-1',
  day: 3,
  role: 'CEO',
  title: 'Kommunikations-Update nach Presseartikel',
  context: 'Artikel erscheint morgen. Abstimmung der Kernbotschaften nötig.',
  dilemma: 'Proaktive Offensive vs. kontrollierte Zurückhaltung',
  hiddenAgendaHint: 'Konsistenz zwischen Presse, Kunden und Bank entscheidend.',
  options: [
    { id: 'a', label: 'Multichannel-Update (Kundenbrief + Website + Bank-Note)', kpiDelta: { publicPerception: +4, customerLoyalty: +2, bankTrust: +2 },
      variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur Kundenbrief',                                         kpiDelta: { customerLoyalty: +2 } },
    { id: 'c', label: 'Keine weitere Kommunikation',                             kpiDelta: { publicPerception: -2, customerLoyalty: -1, bankTrust: -2 } },
    { id: 'd', label: 'Optimistischer Blogpost ohne Zahlen',                     kpiDelta: { publicPerception: +2, bankTrust: -2 } },
    // NEU (e):
    { id: 'e', label: 'Gerüchte-FAQ + Social Listening (1k)',                    kpiDelta: { cashEUR: -1000, profitLossEUR: -1000, publicPerception: +1, bankTrust: +1, customerLoyalty: +1 },
      variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Email_Artikel.pdf']
}, {
  id: 'D03-CEO-2',
  day: 3,
  role: 'CEO',
  title: 'Zweitbank sondieren',
  context: 'Anbahnung einer zweiten Hausbank als Option für Liquiditätsreserve.',
  dilemma: 'Signalstärke vs. Verhandlungsmacht',
  hiddenAgendaHint: 'Diskrete, datenbasierte Gespräche vermeiden Bankirritation.',
  options: [
    { id: 'a', label: 'Diskreter Pitch-Deck-Versand an 2 Banken',                 kpiDelta: { bankTrust: +1, publicPerception: 0 } },
    { id: 'b', label: 'Offener Bieterprozess',                                     kpiDelta: { bankTrust: -2, publicPerception: -1, customerLoyalty: -1 } },
    { id: 'c', label: 'Nur interne Vorbereitung, keine Ansprache',                 kpiDelta: { bankTrust: 0, workforceEngagement: -1 } },
    { id: 'd', label: 'Gerüchteweise andeuten (Druckmittel)',                      kpiDelta: { bankTrust: -3, publicPerception: -2, customerLoyalty: -1, workforceEngagement: -2  } },
    // NEU (e):
    { id: 'e', label: 'Beirat um stille Referenz bitten (stilles Intro)',         kpiDelta: { bankTrust: +2 } }
  ],
  attachments: ['Email_2Bank.pdf']
}, {
  id: 'D03-CEO-3',
  day: 3,
  role: 'CEO',
  title: 'Kundenbeirat gründen',
  context: 'Schlüsselkunden wollen früh informiert werden.',
  dilemma: 'Transparenz vs. Vertraulichkeit',
  hiddenAgendaHint: 'Formalisiertes Forum stärkt Loyalität, bindet aber Ressourcen.',
  options: [
    { id: 'a', label: 'Beirat mit vierteljährlichen Terminen, Chatham‑House‑Regel, Reisekosten (2k)',                     kpiDelta: { customerLoyalty: +5, publicPerception: +1, profitLossEUR: -2000, workforceEngagement: +1 }, isTradeOff: true },
    { id: 'b', label: 'Ad-hoc-Calls bei Bedarf',                                   kpiDelta: { customerLoyalty: +2 } },
    { id: 'c', label: 'Nur E-Mail-Updates',                                        kpiDelta: { customerLoyalty: +1 } },
    { id: 'd', label: 'Kein Beirat',                                               kpiDelta: { customerLoyalty: -2 } },
    // NEU (e):
    { id: 'e', label: 'Pilot-Beirat mit 2 A-Kunden (1k)',                          kpiDelta: { profitLossEUR: -1000, customerLoyalty: +3, publicPerception: +1 },
      variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Einladung_Entwurf_Beirat.pdf']
}, {
  id: 'D03-CEO-4',
  day: 3,
  role: 'CEO',
  title: 'Beraterauswahl Restrukturierung',
  context: 'Bank signalisiert Wunsch nach externem Restrukturierungsberater.',
  dilemma: 'Unabhängigkeit vs. Akzeptanz der Bank',
  hiddenAgendaHint: 'Banknaher Berater verbessert Vertrauensscore.',
  options: [
    { id: 'a', label: 'Banknahen Berater shortlist, Angebot einholen (Tag 5)',     kpiDelta: { bankTrust: +5, profitLossEUR: -15000, workforceEngagement: -4 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Eigenen Wunschberater nominieren',                           kpiDelta: { bankTrust: +2, profitLossEUR: -10000, workforceEngagement: -2 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Beratung ablehnen',                                          kpiDelta: { bankTrust: -6,  publicPerception: -1 } },
    { id: 'd', label: 'Nur „Light-Touch"-Mandat',                                   kpiDelta: { bankTrust: +1, profitLossEUR: -6000, workforceEngagement: -1 }, variance: 0.8, execLeakage: 0.7 },
    // NEU (e):
    { id: 'e', label: 'Dual-Track: Light-Touch jetzt, Vollmandat-Option',          kpiDelta: { bankTrust: +3, profitLossEUR: -3000, workforceEngagement: -1 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Email_Berater.pdf']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
  id: 'D03-CFO-1',
  day: 3,
  role: 'CFO',
  title: 'Payroll-Vorfinanzierung',
  context: 'Nacholung Lohnlauf an Tag 7 geplant, Kasse angespannt.',
  dilemma: 'Löhne priorisieren vs. Lieferanten zahlen',
  hiddenAgendaHint: 'Nicht-bediente Löhne wären Reputationsdesaster.',
  options: [
    { id: 'a', label: 'Planung: Teilweise Payroll- Treuhandkonto speisen (560)',                         kpiDelta: { workforceEngagement: +6, publicPerception: +2, bankTrust: -2, customerLoyalty: -1 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Planung Teilzahlung Payroll  – Rest nachreichen',                  kpiDelta: {  workforceEngagement: -4, publicPerception: -1, bankTrust: -1, customerLoyalty: -1 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Planung Löhne Vollzahlung (420k in Tag 7), Lieferanten schieben',                      kpiDelta: {  customerLoyalty: -4, bankTrust: -1, workforceEngagement: +6, publicPerception: -1 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'd', label: 'Zahlung aller fälligen Lieferanten vorziehen (100k), Planung Kommunikation: Lohnzahlung verzögern',                  kpiDelta: { cashEUR: -100000, workforceEngagement: -8, publicPerception: -3, customerLoyalty: +4, bankTrust: -1 }, variance: 0.8, execLeakage: 0.7 },
    // NEU (e):
    { id: 'e', label: '60 % Payroll sicher, 40k an Lieferanten + Short-Note an Bank',                       kpiDelta: { cashEUR: -40000, workforceEngagement: -2, bankTrust: +2, publicPerception: +1, customerLoyalty: +1  }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Memo-Payroll.pdf']
}, {
  id: 'D03-CFO-2',
  day: 3,
  role: 'CFO',
  title: 'Stundung Sozialabgaben (Nachzahlung) finalisieren',
  context: 'Sozialversicherung bitten um Unterlagen; Frist 48 Stunden.',
  dilemma: 'Vollständigkeit vs. Geschwindigkeit',
  hiddenAgendaHint: 'Geordnete Anträge erhöhen Erfolgschancen.',
  options: [
    { id: 'a', label: 'Vollständige Unterlagen heute einreichen',                      kpiDelta: { bankTrust: +3, cashEUR: +70000 }, variance: 0.8, execLeakage: 0.7, cooldownDays: 2, sideEffects: { publicPerception: -1 }, lagDays: 1 },
    { id: 'b', label: 'Nur Teilzahlung leisten (50 %) – Frist verlängern',                         kpiDelta: { bankTrust: -1, cashEUR: +35000, publicPerception: -1, workforceEngagement: -1 }, variance: 0.8, execLeakage: 0.7, cooldownDays: 2, sideEffects: { publicPerception: -1 }, lagDays: 1 },
    { id: 'c', label: 'Zahlung ohne Stundung',                                         kpiDelta: { cashEUR: -70000, publicPerception: +1 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'd', label: 'Abwarten, Risiko Mahnung',                                      kpiDelta: { bankTrust: -3 } },
    // NEU (e):
    { id: 'e', label: 'Ratenzahlungsplan aktiv vorschlagen',                           kpiDelta: { bankTrust: +1, cashEUR: +50000, publicPerception: -1}, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Email_Stundung.pdf']
}, {
  id: 'D03-CFO-3',
  day: 3,
  role: 'CFO',
  title: 'Kreditversicherung reaktivieren (Ausfallversicherung für Lieferanten, die uns gegen Rechnung liefern mit 30 Tagen Ziel)',
  context: 'KV hat Limits gesenkt; Reaktivierung für Top-3-Lieferanten möglich, sichert Lieferung der A-Teile vollständig, B-Teile mit Selbstbeteiligung 10 %, C-Teile mit 50 %.',
  dilemma: 'Gebühren vs. Versorgungssicherheit',
  hiddenAgendaHint: 'Signalisiert Stabilisierung an Lieferanten.',
  options: [
    { id: 'a', label: 'Top-3 reaktivieren',                               kpiDelta: { profitLossEUR: -10000, bankTrust: +2, customerLoyalty: +2 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur 1 kritischen Lieferanten absichern',                         kpiDelta: { profitLossEUR: -6000, bankTrust: +1, customerLoyalty: +1 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Keine Reaktivierung',                                            kpiDelta: { bankTrust: -1, customerLoyalty: -1  } },
    { id: 'd', label: 'Alternative Sicherheiten stellen (Bürgschaftsgebühren 5k)',               kpiDelta: { profitLossEUR: -5000, bankTrust: -2, customerLoyalty: +1 }, variance: 0.8, execLeakage: 0.7 },
    // NEU (e):
    { id: 'e', label: 'Anderkonto-Lösung über Kanzlei (4k)',                            kpiDelta: { profitLossEUR: -4000, bankTrust: +2, customerLoyalty: +2 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Aktennotiz_KV.pdf']
}, {
  id: 'D03-CFO-4',
  day: 3,
  role: 'CFO',
  title: 'Tageslimit für Freigaben',
  context: 'Ad-hoc-Entscheidungen gefährden Cash-Disziplin.',
  dilemma: 'Strenge Limits vs. Flexibilität',
  hiddenAgendaHint: 'Bank erwartet klare Freigabegrenzen.',
  options: [
    { id: 'a', label: 'Limit 25k je Tag, Ausnahmen im Board',                            kpiDelta: { cashEUR: +80000, bankTrust: +5, workforceEngagement: -3, profitLossEUR: -800 }, isTradeOff: true },
    { id: 'b', label: 'Limit 50k (mehr Flexibilität)',                                   kpiDelta: { cashEUR: +40000, bankTrust: +3,  workforceEngagement: -1, profitLossEUR: -400  } },
    { id: 'c', label: 'Keine Limits (nur CFO-Freigabe)',                                  kpiDelta: { bankTrust: -3, workforceEngagement: +1 } },
    { id: 'd', label: 'Dynamische Limits je Cash-Status',                                 kpiDelta: { bankTrust: +2 } },
    // NEU (e):
    { id: 'e', label: 'Digitale Freigabe-App einführen (3k)',                            kpiDelta: { profitLossEUR: -3000, bankTrust: +2, workforceEngagement: -1 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Vorstand_Freigaben.pdf']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
  id: 'D03-OPS-1',
  day: 3,
  role: 'OPS',
  title: 'Eilauftrag mit Pönale',
  context: 'A-Kunde droht mit Pönale bei Verzug von Lieferung',
  dilemma: 'Kostenintensive Schicht vs. Pönale',
  hiddenAgendaHint: 'Kulanz plus Tempo kann Loyalität retten.',
  options: [
    { id: 'a', label: 'Sonderschicht einplanen',                             kpiDelta: { profitLossEUR: -18000, customerLoyalty: +5, publicPerception: +1, workforceEngagement: -4 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Pönale akzeptieren, normal liefern',                               kpiDelta: { profitLossEUR: -30000, customerLoyalty: -4, bankTrust: -1, publicPerception: -1,  workforceEngagement: +1 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Teillieferung verhandeln',                                         kpiDelta: { customerLoyalty: +1, profitLossEUR: -8000 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'd', label: 'Auftrag abgeben (Ausfallschaden wegen Vorleistungen akzeptieren)',                                                  kpiDelta: { customerLoyalty: -6, workforceEngagement: -1, publicPerception: -1, bankTrust: -1, profitLossEUR: -20000  } },
    // NEU (e):
    { id: 'e', label: 'Alternatives Lieferfenster + Kulanzgutschrift (5k)',               kpiDelta: { profitLossEUR: -5000, customerLoyalty: -1 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Eilauftrag_OPS.pdf']
}, {
  id: 'D03-OPS-2',
  day: 3,
  role: 'OPS',
  title: 'Wartungsstau priorisieren',
  context: 'Mehrere Anlagen mit überfälliger Wartung; Ausfallrisiko steigt.',
  dilemma: 'Prävention vs. Durchsatz',
  hiddenAgendaHint: 'Gezielte Wartung reduziert Gesamtrisiko.',
  options: [
     { id: 'a', label: 'Externen Wartungsvertrag kündigen',                                 kpiDelta: { cashEUR: +6000, profitLossEUR: +6000, customerLoyalty: -3, workforceEngagement: -3 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur Sicherheitsrelevantes prüfen',                             kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, customerLoyalty: +1, workforceEngagement: -2 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Wartung verschieben',                                               kpiDelta: { cashEUR: +8000, customerLoyalty: -2, workforceEngagement: -2} },
   { id: 'd', label: 'Top-2 Anlagen sofort warten',                                 kpiDelta: { cashEUR: -18000, profitLossEUR: -18000, customerLoyalty: +3, workforceEngagement: +1 }, variance: 0.8, execLeakage: 0.7 },
    // NEU (e):
    { id: 'e', label: 'Mobiler Serviceeinsatz',                                kpiDelta: { cashEUR: -8000, profitLossEUR: -8000, customerLoyalty: +2 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Aktennotiz_Wartung.pdf']
}, {
  id: 'D03-OPS-3',
  day: 3,
  role: 'OPS',
  title: 'Fremdfertiger für Engpasskapazität',
  context: 'Partner kann kurzfristig 15 % Kapazität übernehmen.',
  dilemma: 'Mehrkosten vs. Liefertreue',
  hiddenAgendaHint: 'Temporäre Brücke für Schlüsselkunden.',
  options: [
    { id: 'a', label: 'Engpassteile auslagern (+25 % Kosten)',                              kpiDelta: { profitLossEUR: -14000, customerLoyalty: +3, workforceEngagement: -1, publicPerception: -1 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur A-Kunden-Bedarf auslagern',                                     kpiDelta: { profitLossEUR: -9000, customerLoyalty: +2 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Nicht auslagern',                                                   kpiDelta: { customerLoyalty: -3 } },
    { id: 'd', label: 'Langfristige Partnerschaft prüfen',                                 kpiDelta: { customerLoyalty: +1, bankTrust: +1,  publicPerception: +1 } },
    // NEU (e):
    { id: 'e', label: 'Qualitätsaudit beim Fremdfertiger vor Auslagerung',           kpiDelta: { profitLossEUR: -17000, customerLoyalty: +1, bankTrust: +1,  publicPerception: +1, workforceEngagement: +1 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['MemoOpsExternKapa.pdf']
}, {
  id: 'D03-OPS-4',
  day: 3,
  role: 'OPS',
  title: 'Lieferabrufe bündeln',
  context: 'Viele Kleinabrufe binden Cash und verursachen Rüstkosten.',
  dilemma: 'Effizienz vs. Reaktionsfähigkeit',
  hiddenAgendaHint: 'Bündeln verbessert DB, kann Kunden irritieren.',
  options: [
    { id: 'a', label: 'Abrufe auf Wochenlos bündeln',                                        kpiDelta: { cashEUR: +6000, profitLossEUR: +6000, customerLoyalty: -2, workforceEngagement: +2 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'b', label: 'Nur bei B-Kunden bündeln',                                            kpiDelta: { cashEUR: +3000, profitLossEUR: +3000, customerLoyalty: -1, workforceEngagement: +1 }, variance: 0.8, execLeakage: 0.7 },
    { id: 'c', label: 'Keine Änderung',                                                      kpiDelta: { profitLossEUR: 0, workforceEngagement: -1, customerLoyalty: +1, bankTrust: -1 } },
    { id: 'd', label: 'Bündeln + Express für A-Kunden',                                      kpiDelta: { profitLossEUR: +2000, customerLoyalty: +1, workforceEngagement: -3 }, variance: 0.8, execLeakage: 0.7 },
    // NEU (e):
    { id: 'e', label: 'Dynamische Bündelung (ab Mindestmenge)',                              kpiDelta: { profitLossEUR: +3000, customerLoyalty: -1, workforceEngagement: -2 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['OPSLIEFERABRUF.pdf']
}];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
  id: 'D03-HRLEGAL-1',
  day: 3,
  role: 'HRLEGAL',
  title: 'Interne Townhall vorbereiten',
  context: 'Unsicherheit steigt, Fragen zu Lohnsicherheit und Kurzarbeit, aber Produktivitätsausfall und Kosten für Catering.',
  dilemma: 'Offenheit vs. Verunsicherung',
  hiddenAgendaHint: 'Klare Q&A senkt Fluktuationsrisiko.',
  options: [
    { id: 'a', label: 'Townhall + Q&A-Katalog veröffentlichen',                            kpiDelta: { workforceEngagement: +6, publicPerception: +1, cashEUR: -2000, profitLossEUR: -2000 }, isTradeOff: true },
    { id: 'b', label: 'Nur Führungskräfte briefen',                                        kpiDelta: { workforceEngagement: +1 } },
    { id: 'c', label: 'Kein Format',                                                       kpiDelta: { publicPerception: -1, workforceEngagement: -3 } },
    { id: 'd', label: 'Nur schriftliche FAQ',                                              kpiDelta: { workforceEngagement: +2 } },
    // NEU (e):
    { id: 'e', label: 'Anonyme Fragebox + 2‑Min‑Video (1k)',                                kpiDelta: { profitLossEUR: -1000, workforceEngagement: +3 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Memo_Townhall.pdf']
}, {
  id: 'D03-HRLEGAL-2',
  day: 3,
  role: 'HRLEGAL',
  title: 'Arbeitszeitkonten flexibilisieren, mehr Möglichkeiten für Mitarbeitende schaffen, Überstunden auszugleichen',
  context: 'Überstunden & Unterlast variieren stark zwischen Bereichen.',
  dilemma: 'Flexibilität vs. Betriebsvereinbarung',
  hiddenAgendaHint: 'Einvernehmliche Anpassung verhindert Konflikte.',
  options: [
    { id: 'a', label: 'Temporäre BV-Änderung mit BR verhandeln',                           kpiDelta: { workforceEngagement: +3, customerLoyalty: +1, publicPerception: +1 }, isTradeOff: true },
    { id: 'b', label: 'Nur befristete Duldung von Überstundenausgleich',                   kpiDelta: { workforceEngagement: +1 } },
    { id: 'c', label: 'Keine Änderung',                                                    kpiDelta: { workforceEngagement: -1 } },
    { id: 'd', label: 'Top-down Anordnung (Risiko Konflikt)',                              kpiDelta: { workforceEngagement: -3, publicPerception: -1, customerLoyalty: +1 } },
    // NEU (e):
    { id: 'e', label: 'Pilot: Homeoffice und selbstgesteuerter Schichttausch',                              kpiDelta: { profitLossEUR: -8000, workforceEngagement: +4, publicPerception: +1, customerLoyalty: -2 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Akzennotiz-AZK.pdf']
}, {
  id: 'D03-HRLEGAL-3',
  day: 3,
  role: 'HRLEGAL',
  title: 'Kündigungsschutz-Sperrfrist prüfen',
  context: 'Einzelne Low-Performer verursachen hohe Fehlerkosten und ziehen die Motivation herunter.',
  dilemma: 'Schnelles Handeln vs. Rechtsrisiko',
  hiddenAgendaHint: 'Dokumentation vor Maßnahme ist Pflicht.',
  options: [
    { id: 'a', label: 'Dokumentation & Coaching vereinbaren',                               kpiDelta: { workforceEngagement: +2, customerLoyalty: +1, publicPerception: +1, profitLossEUR: -5000 }, isTradeOff: true },
    { id: 'b', label: 'Abmahnung ohne Dokumentation',                                       kpiDelta: { publicPerception: -1, workforceEngagement: -3 } },
    { id: 'd', label: 'Fristlose Kündigung (Risiko)',                                       kpiDelta: { bankTrust: +1, publicPerception: -3, workforceEngagement: -4, cashEUR: -18000, profitLossEUR: -18000 } },
    // NEU (e):
    { id: 'e', label: 'Versetzungs‑Pool + Mentoring',                                  kpiDelta: { cashEUR: -2000, profitLossEUR: -2000, workforceEngagement: +2,  publicPerception: +1 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['gutachten-Auszug-Kuendigung.pdf']
}, {
  id: 'D03-HRLEGAL-4',
  day: 3,
  role: 'HRLEGAL',
  title: 'Lieferanten-Gleichbehandlung dokumentieren',
  context: 'Whistleblower deutet „Beziehungszahlungen" an.',
  dilemma: 'Stringenz vs. Flexibilität',
  hiddenAgendaHint: 'Dokumentation schützt Reputation.',
  options: [
    { id: 'a', label: 'Transparenzprotokoll je Freigabe einführen',                          kpiDelta: { bankTrust: +3, publicPerception: +2, workforceEngagement: -1 } },
    { id: 'b', label: 'Nur CFO-Protokoll',                                                   kpiDelta: { bankTrust: +1 } },
    { id: 'c', label: 'Kein Protokoll',                                                      kpiDelta: { bankTrust: -2, publicPerception: -2 } },
    { id: 'd', label: 'Externe Audit-Stichprobe',                                       kpiDelta: { cashEUR: -5000, profitLossEUR: -5000, publicPerception: +2, bankTrust: +1, workforceEngagement: -1 }, variance: 0.8, execLeakage: 0.7 },
    // NEU (e):
    { id: 'e', label: 'Ethische Hotline/Hint‑Portal (4k)',                                   kpiDelta: { profitLossEUR: -4000, publicPerception: +2, bankTrust: +1, workforceEngagement: +1 }, variance: 0.8, execLeakage: 0.7 }
  ],
  attachments: ['Memo_Delivery1.pdf']
}];

export const day3Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CFO_BLOCKS,
  ...OPS_BLOCKS,
  ...HRLEGAL_BLOCKS
];

// Helper function for mishandledLinkedIn
function mishandledLinkedIn(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    e.day <= 2 &&
    typeof e.chosenOptionLabel === 'string' &&
    /(ignorieren|keine weitere kommunikation|optimistisch.*ohne fakten|beschönigen)/i.test(e.chosenOptionLabel)
  );
}

// Helper function for hintedStundung
function hintedStundung(ctx: any): boolean {
  return !!ctx?.log?.some((e: any) =>
    e.day <= 2 &&
    typeof e.chosenOptionLabel === 'string' &&
    /(stundung|behörde|aufschub|fristerstreckung)/i.test(e.chosenOptionLabel)
  );
}

// src/data/scenario_day_03.ts — NUR den News-Block ersetzen
export const day3News: DayNewsItem[] = [
  {
    id: 'N3-1',
    day: 3,
    title: 'Artikel erscheint morgen – Kernbotschaften synchronisieren',
    source: 'press',
    severity: 'medium',
    isImportant: true,
    content:
      'Die Regionalzeitung bringt morgen den Artikel. Erwartet werden belastbare Zahlen, ein klarer Fahrplan und Konsistenz zu Bank-/Kundenkommunikation.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const hasDay1Statement =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D01-CEO-3' && (e.choice === 'a' || /Faktenbasiertes Statement/i.test(e?.choiceLabel || e?.label || '')));
      const day2InterviewNuechtern =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-CEO-1' && (e.choice === 'd' || /Nüchternes Statement/i.test(e?.choiceLabel || e?.label || '')));
      const day2InterviewOptimistisch =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-CEO-1' && (e.choice === 'b' || /Optimistische Botschaften/i.test(e?.choiceLabel || e?.label || '')));
      const hasDailyReporting =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D01-CFO-4' && (e.choice === 'b' || /Daily Short-Report/i.test(e?.choiceLabel || e?.label || '')));
      const badLinkedIn = typeof (ctx?.mishandledLinkedIn) === 'function' ? ctx.mishandledLinkedIn(ctx) : false;

      let s = '';
      if (day2InterviewNuechtern) {
        s += 'Der Ton im Artikel dürfte sachlich ausfallen. Nutzen Sie die Chance, den Sanierungsfahrplan und Meilensteine präzise zu verankern. ';
      } else if (day2InterviewOptimistisch) {
        s += 'Rechnen Sie mit kritischen Nachfragen: Optimistische Aussagen ohne Daten aus Tag 2 werden gespiegelt. Legen Sie Zahlen und Maßnahmen offen. ';
      } else if (hasDay1Statement) {
        s += 'Knüpfen Sie an das faktenbasierte Statement von Tag 1 an und zeigen Sie Fortschritt gegen die Meilensteine. ';
      } else {
        s += 'Ohne offizielles Rahmenstatement braucht es nun extra Sorgfalt bei Zahlen, Annahmen und Verantwortlichkeiten. ';
      }
      s += hasDailyReporting
        ? 'Verweisen Sie auf das etablierte Daily-/Weekly-Reporting als Vertrauensanker für Bank und Kunden. '
        : 'Ein verbindliches Reporting‑Regime (Daily/Weekly) sollte im Artikel angekündigt werden. ';
      s += badLinkedIn
        ? 'Parallel Social‑Listening aktivieren und ein kurzes Gerüchte‑FAQ bereitstellen, um Fehlinterpretationen sofort zu korrigieren.'
        : 'Ein abgestimmtes Q&A (intern/extern) verhindert widersprüchliche Botschaften.';
      return s;
    }
  },
  {
    id: 'N3-2',
    day: 3,
    title: 'A‑Kunde droht Pönale bei Verzug',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content:
      'Ein A‑Kunde stellt bei erneutem Terminverzug eine Pönale von 30 k in Aussicht. Vorschläge: Teillieferung, Express oder Kulanzfenster.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const maschinenExpress =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-OPS-1' && (e.choice === 'a' || /Express-Ersatzteil/i.test(e?.choiceLabel || e?.label || '')));
      const fremdfertigung =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-OPS-1' && (e.choice === 'c' || /Fremdfertigung/i.test(e?.choiceLabel || e?.label || '')));
      const qualitaetsgateStrenger =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-OPS-4' && (e.choice === 'a' || e.choice === 'd' || /Endprüfung|Externe QS/i.test(e?.choiceLabel || e?.label || '')));
      const roadshowGeplant =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-CEO-2' && (e.choice === 'a' || e.choice === 'b' || /Roadshow|Roundtable/i.test(e?.choiceLabel || e?.label || '')));

      let s = 'Der Kunde erwartet heute einen verlässlichen Stabilisierungsplan mit konkreten Zusagen. ';
      if (maschinenExpress) s += 'Der Express‑Beschaffungsweg aus Tag 2 kann als Maßnahmenbeleg dienen. ';
      if (fremdfertigung) s += 'Die vorbereitete Fremdfertigung dient als Plan B zur Terminsicherung. ';
      if (qualitaetsgateStrenger) s += 'Das verschärfte Qualitätsgate reduziert Nacharbeit und stärkt die Liefertreue. ';
      s += roadshowGeplant
        ? 'Binden Sie die Roadshow/den Remote‑Roundtable in die Eskalationsentschärfung ein (Live‑Status, Engpassliste, Verantwortliche).'
        : 'Ein dediziertes Kundenbriefing (Live‑Status, Engpassliste, Verantwortliche) stabilisiert die Lage.';
      return s;
    }
  },
  {
    id: 'N3-3',
    day: 3,
    title: 'Behörde fordert Unterlagen zum Stundungsantrag (48 h Frist)',
    source: 'authority',
    severity: 'medium',
    isImportant: true,
    content:
      'Für Steuer/Sozialabgaben werden ergänzende Nachweise angefordert. Vollständige, geordnete Unterlagen erhöhen die Erfolgschance deutlich.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const day1Proaktiv =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D01-CFO-3' && (e.choice === 'd' || /Proaktive Stundung/i.test(e?.choiceLabel || e?.label || '')));
      const day1Termingerecht =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D01-CFO-3' && (e.choice === 'c' || /Termingerechte Zahlung/i.test(e?.choiceLabel || e?.label || '')));
      const hinted = typeof (ctx?.hintedStundung) === 'function' ? ctx.hintedStundung(ctx) : false;

      let s = '';
      if (day1Termingerecht) {
        s += 'Tag 1: termingerechte Zahlung – nun wird vermutlich eine ergänzende Prüfung des wirtschaftlichen Lagebilds verlangt. ';
      } else if (day1Proaktiv || hinted) {
        s += 'Der proaktiv angestoßene Stundungsprozess erfordert jetzt eine belastbare 13‑Wochen‑Planung, Liquiditätsbrücke und Begründung der Notlage. ';
      } else {
        s += 'Ohne Vorarbeit aus den Vortagen ist die Datenaufbereitung (OPOS, Liquiditätsvorschau, Maßnahmenplan) zu priorisieren. ';
      }
      s += 'Bitte Unterlagen als konsistentes Paket einreichen und Meilensteine/Owner benennen.';
      return s;
    }
  },
  {
    id: 'N3-4',
    day: 3,
    title: 'Kreditversicherung signalisiert Gesprächsbereitschaft',
    source: 'supplier',
    severity: 'low',
    isImportant: false,
    content:
      'KV prüft limitierte Reaktivierung gegen Gebühr. Ziel: stabile Konditionen für A‑Teile und reduzierte Ausfallrisiken.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const d2LieferantenZZ =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-CFO-3');
      let s = 'Die Kombination aus KV‑Reaktivierung und Zahlungsziel‑Verhandlungen stabilisiert den Materialfluss. ';
      s += d2LieferantenZZ
        ? 'Nutzen Sie die Ergebnisse der Sammelverhandlung aus Tag 2 als Argumentationsbasis.'
        : 'Bereiten Sie eine ABC‑Priorisierung (A‑Teile zuerst) für die Verhandlung vor.';
      return s;
    }
  },
  {
    id: 'N3-5',
    day: 3,
    title: 'Payroll‑Fenster öffnet sich – Freigaben abstimmen',
    source: 'internal',
    severity: 'high',
    isImportant: true,
    content:
      'Lohnlauf Tag 7 nachholen. Entscheidung zu Vorfinanzierung/Teilzahlung beeinflusst Engagement, Reputation und Bankdialog.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const treuhand =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D03-CFO-1' && (e.choice === 'a' || /Treuhandkonto/i.test(e?.choiceLabel || e?.label || '')));
      const teilzahlung =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D03-CFO-1' && (e.choice === 'b' || e.choice === 'e' || /Teilzahlung|60 % Payroll/i.test(e?.choiceLabel || e?.label || '')));
      let s = 'Transparente Priorisierung und saubere Kommunikation sind entscheidend. ';
      if (treuhand) s += 'Die Treuhandlösung dient als starkes Signal an Belegschaft und Öffentlichkeit. ';
      if (teilzahlung) s += 'Bei Teilzahlung bitte Erwartungsmanagement und Nachreichtermin verbindlich kommunizieren. ';
      s += 'Abstimmung mit Treasury‑Board/Bank empfohlen, um Signale konsistent zu halten.';
      return s;
    }
  },
  {
    id: 'N3-6',
    day: 3,
    title: 'Wartungsstau erhöht Ausfallrisiko – Priorisierung nötig',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content:
      'Mehrere Anlagen sind überfällig. Kurzfristige Priorisierung reduziert Folgeschäden trotz temporärer Durchsatzdelle.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const d2Maschinenausfall =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-OPS-1');
      let s = 'Bitte Sicherheitsrelevantes vorziehen und Engpasslinien absichern. ';
      s += d2Maschinenausfall
        ? 'Nach dem Ausfall der Kernlinie an Tag 2 sollte die Wartungspipeline heute aktiv abgearbeitet werden.'
        : 'Ein präventiver Mobile‑Service‑Slot kann kurzfristig das Gesamtrisiko senken.';
      return s;
    }
  },
  {
    id: 'N3-7',
    day: 3,
    title: 'Zweitbank sondiert – Erstgespräche möglich',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content:
      'Diskrete Erstkontakte zeigen Interesse, sofern 13‑Wochen‑Plan und Reporting konsistent sind.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const diskret =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D03-CEO-2' && (e.choice === 'a' || e.choice === 'e' || /Pitch-Deck|stilles Intro/i.test(e?.choiceLabel || e?.label || '')));
      const bieterprozess =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D03-CEO-2' && (e.choice === 'b' || /Bieterprozess/i.test(e?.choiceLabel || e?.label || '')));
      let s = '';
      s += diskret
        ? 'Die leise Ansprache über Referenzen/Pitch‑Decks vermeidet Irritationen bei der Hausbank und stärkt die Verhandlungsposition. '
        : bieterprozess
        ? 'Ein offener Bieterprozess erhöht zwar die Reichweite, stört aber oft das Vertrauensverhältnis zur Hausbank. '
        : 'Interne Vorbereitung (Datenraum, Q&A, Covenants) ist Voraussetzung für belastbare Gespräche. ';
      s += 'Bitte Konsistenz zu Bank‑Reporting und Maßnahmenplan sichern.';
      return s;
    }
  },
  {
    id: 'N3-8',
    day: 3,
    title: 'Gerüchtelage in Social Media bleibt volatil',
    source: 'press',
    severity: 'low',
    isImportant: false,
    content:
      'Vereinzelt kursieren erneut Spekulationen. Ein faktenbasiertes FAQ und Social‑Listening helfen, Threads früh zu korrigieren.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const hasGuideline =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-HRLEGAL-3' && (e.choice === 'a' || /Guideline.*Fact/i.test(e?.choiceLabel || e?.label || '')));
      const ceoFAQ =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D03-CEO-1' && (e.choice === 'e' || /Gerüchte-FAQ/i.test(e?.choiceLabel || e?.label || '')));
      let s = 'Bitte nur abgestimmte Kernbotschaften verwenden; interne Q&A aktuell halten. ';
      if (hasGuideline) s += 'Die Social‑Media‑Guideline aus Tag 2 bietet Formulierungsleitplanken. ';
      if (ceoFAQ) s += 'Das Gerüchte‑FAQ (inkl. Social‑Listening) hilft, Fehlinformationen zeitnah zu korrigieren.';
      return s;
    }
  },
  // Füll-/Service‑Meldungen
  {
    id: 'N3-F1',
    day: 3,
    title: 'Sperrung Nord‑Tor – ganztägig',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content:
      'Das Nord‑Tor bleibt heute wegen Reparaturarbeiten geschlossen. Zugang bitte über Tor West/Ost; Kfz‑Einfahrt am Nord‑Tor nicht möglich.'
  },
  {
    id: 'N3-F2',
    day: 3,
    title: 'Kantine: Kassen‑Update',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content:
      'Zwischen 11:30–12:00 Uhr kann es an den Kassen zu kurzen Verzögerungen kommen.'
  },
  {
    id: 'N3-F3',
    day: 3,
    title: 'IT‑Wartung Fileserver',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content:
      'Von 17:30–17:50 Uhr wechselt der Fileserver temporär in den Read‑Only‑Modus. Bitte größere Dateien vorher lokal speichern.'
  },
  {
    id: 'N3-F4',
    day: 3,
    title: 'Klimatisierung im Drosselbetrieb',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content:
      'Im Bürotrakt A läuft die Kühlung am Nachmittag zeitweise gedrosselt (Kalibrierung der Anlage).'
  }
];
