// src/data/scenario_day_02.ts
import { DecisionBlock, DayNewsItem } from '@/core/models/domain';

const CEO_BLOCKS_EXTRA: DecisionBlock[] = [];
const CFO_BLOCKS_EXTRA: DecisionBlock[] = [];
const OPS_BLOCKS_EXTRA: DecisionBlock[] = [];
const HRLEGAL_BLOCKS_EXTRA: DecisionBlock[] = [];

/**
 * TAG 2 — 16 Entscheidungsblöcke (je 4 pro Rolle)
 * Eskalation: Presseinteresse, Skonto/Cash-Push, Maschinenausfall, Krankheitswelle
 */

const CEO_BLOCKS: DecisionBlock[] = [{
    id: 'D02-CEO-1',
    day: 2,
    role: 'CEO',
    title: 'Presseinterview zu Stabilität & Ausblick',
    context: 'Regionale Wirtschaftszeitung bittet um Interview zu Gerüchten über Zahlungsschwierigkeiten.',
    dilemma: 'Transparenz vs. Beruhigung der Öffentlichkeit',
    hiddenAgendaHint: 'Zu positive Aussagen können später als Irreführung gewertet werden.',
    options: [ { id: 'a', label: 'Auf spätere Veröffentlichung drängen',              kpiDelta: { publicPerception: -3, bankTrust: +1,  workforceEngagement: -1 }},
{ id: 'b', label: 'Optimistische Botschaften ohne Details',            kpiDelta: { publicPerception: +6, bankTrust: -4, workforceEngagement: +1,  customerLoyalty: +1  },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Interview ablehnen',                                kpiDelta: { publicPerception: -5, workforceEngagement: -1,  customerLoyalty: -1, bankTrust: -1, } },
{ id: 'd', label: 'Nüchternes Statement + Sanierungsfahrplan nennen', kpiDelta: { publicPerception: +4, bankTrust: +3, workforceEngagement: +2,  customerLoyalty: +1 }  }
  ],
  attachments: ['presseanfrage_tag2.pdf']
  },
{
    id: 'D02-CEO-2',
    day: 2,
    role: 'CEO',
    title: 'Key-Account-Roadshow organisieren',
    context: 'Top-5-Kunden der us-amerikanischen Tochter (United Pumps of America) verlangen persönliche Einordnung der Liefersicherheit der nächsten 6 Wochen.',
    dilemma: 'Fokus auf Auslandsreise vs. Remote-Briefing',
    hiddenAgendaHint: 'Persönliche Präsenz stärkt Loyalität, kostet Zeit und Reisekosten.',
    options: [{ id: 'a', label: 'Vor-Ort-Besuche (2 Tage) für Top-3',             kpiDelta: { cashEUR: -10000, customerLoyalty: +6, profitLossEUR: -10000, publicPerception: +2, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Remote-Roundtable mit allen Top-5',              kpiDelta: { customerLoyalty: +4, publicPerception: +1, workforceEngagement: +1 } },
{ id: 'c', label: 'Letter-of-Comfort ohne Meetings',                kpiDelta: { customerLoyalty: +1, publicPerception: -1 } },
{ id: 'd', label: 'Kein spezifisches Programm',                     kpiDelta: { customerLoyalty: -3, publicPerception: -2, bankTrust: -1 } }
  ],
  attachments: ['entwurf-Email.pdf']
  },
{
    id: 'D02-CEO-3',
    day: 2,
    role: 'CEO',
    title: 'Externer Beirat aktivieren',
    context: 'Beirat von acht Expertinnen und Experten war inaktiv. Einberufung kann Governance-Signal setzen, kostet aber zusätzliche Tagessätze.',
    dilemma: 'Zeit & Offenheit vs. mögliche Leaks und Kosten',
    hiddenAgendaHint: 'Bank wertet professionelle Governance positiv.',
    options: [{ id: 'a', label: 'Ad-hoc-Beirat mit Zahlen-Offenlegung',           kpiDelta: { bankTrust: +8, publicPerception: +3,
      profitLossEUR: -18000, cashEUR: -18000, workforceEngagement: +2 },
  isTradeOff: true },
{ id: 'b', label: 'Beirat schriftlich informieren, Meeting in 12 Tagen', kpiDelta: { profitLossEUR: -18000, bankTrust: +3, workforceEngagement: +1 } },
{ id: 'c', label: 'Nur CEO/CFO-Kurzbriefing',                       kpiDelta: { profitLossEUR: -6000, bankTrust: +1 } },
{ id: 'd', label: 'Beirat auflösen, um Kosten zu sparen',                               kpiDelta: { profitLossEUR: +8000, cashEUR: +8000, bankTrust: -4, workforceEngagement: -1, publicPerception: -4 } }
  ],
  attachments: ['ext-Beirat1.pdf']
},
{
    id: 'D02-CEO-4',
    day: 2,
    role: 'CEO',
    title: 'Kostenmoratorium für nicht-essenzielle Ausgaben',
    context: 'Viele kleinere Ausgaben summieren sich (Reisen, Marketing, Subscriptions).',
    dilemma: 'Strenge Sperre vs. Handlungsfähigkeit',
    hiddenAgendaHint: 'Signalisiert Ernsthaftigkeit, kann interne Friktion erzeugen.',
    options: [{ id: 'a', label: 'Harter Freeze sofort (Ausnahmen per CFO-Genehmigung)', kpiDelta: { cashEUR: +40000, workforceEngagement: -5, bankTrust: +3, publicPerception: -1  },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'b', label: '10 % pauschaler Cut, Review in 14 Tagen',              kpiDelta: { cashEUR: +20000, workforceEngagement: -3, bankTrust: +1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'c', label: 'Nur Marketing & Reisen einfrieren',                    kpiDelta: { cashEUR: +15000, customerLoyalty: -1, publicPerception: -1, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'd', label: 'Kein Moratorium',                                      kpiDelta: { bankTrust: -3, customerLoyalty: +1, workforceEngagement: +2 } }
  ],
  attachments: ['Aktenn-Stab1.pdf']
}];

const CFO_BLOCKS: DecisionBlock[] = [{
    id: 'D02-CFO-1',
    day: 2,
    role: 'CFO',
    title: 'Skonto-Angebote der Kunden',
    context: 'Mehrere Kunden bieten sofortige Zahlung gegen 6 % Preisnachlass.',
    dilemma: 'Kurzfristige Liquidität vs. langfristiger Ertrag',
    hiddenAgendaHint: 'Bank könnte Skontoaktionen als Notlage interpretieren.',
    options: [{ id: 'a', label: 'Für Rechnungen > 50k annehmen (6 %)',        kpiDelta: { cashEUR: +60000, profitLossEUR: -20000, bankTrust: -3, customerLoyalty: +3 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'b', label: 'Nur strategische Kunden (A-Kunden)',         kpiDelta: { cashEUR: +30000, profitLossEUR: -10000, customerLoyalty: +2, bankTrust: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'c', label: 'Ablehnen',                                   kpiDelta: { bankTrust: +2, customerLoyalty: -4 } },
{ id: 'd', label: 'Fallweise, ohne klare Policy',                kpiDelta: { cashEUR: +25000, profitLossEUR: -16000, bankTrust: -4, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1}
  ],
  attachments: ['Memo-Skt1.pdf']
},
{
    id: 'D02-CFO-2',
    day: 2,
    role: 'CFO',
    title: 'Factoring kurzfristig prüfen',
    context: 'Offene Forderungen von 1,2 Mio. €; Non-Recourse-Factoring bietet 85 % Vorauszahlung, Gebühr 2,2 % auf die 1,2 Mio.',
    dilemma: 'Cash-Anhebung vs. Kosten/Signal',
    hiddenAgendaHint: 'Saubere Kommunikation verhindert Fehlinterpretation durch Bank.',
    options: [{ id: 'a', label: 'Nicht prüfen',                                kpiDelta: { bankTrust: -1 } },
     { id: 'b', label: 'Vollumfänglich sofort',                       kpiDelta: { cashEUR: +1020000, profitLossEUR: -26400, bankTrust: -2, customerLoyalty: -2, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'c', label: 'Nur vorbereiten, mit Bank vorher abstimmen',               kpiDelta: { cashEUR: +0, bankTrust: +3 } },
 { id: 'd', label: 'Pilot mit 300k Portfolio (Gebühr 2,2 %)',    kpiDelta: { cashEUR: +255000, profitLossEUR: -6600, bankTrust: +1, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
  ],
  attachments: ['Aktennotiz_Fac1.pdf']
},
{
    id: 'D02-CFO-3',
    day: 2,
    role: 'CFO',
    title: 'Zahlungsziel der Lieferanten – Sammelverhandlung',
    context: 'Top-10-Lieferanten verlangen Vorkasse aufgrund negativer Berichte.',
    dilemma: 'Härte vs. Beziehung',
    hiddenAgendaHint: 'Selektive Priorisierung nach Ersetzbarkeit.',
    options: [{ id: 'a', label: 'Ersetzbarkeits-basierte Staffel (0–30 Tage)',             kpiDelta: { cashEUR: -40000, bankTrust: -2, customerLoyalty: +2 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'b', label: 'Einheitlich 21 Tage anbieten',                 kpiDelta: { cashEUR: -20000, bankTrust: -1, customerLoyalty: +1  },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'c', label: 'Individuelle Deals (kein Schema)',             kpiDelta: { cashEUR: -15000, bankTrust: -2, customerLoyalty: -1 },
  variance: 0.8, 
  execLeakage: 0.7,
  cooldownDays: 2,
  sideEffects: { publicPerception: -1 },
  lagDays: 1},
{ id: 'd', label: 'Forderungen akzeptieren',                       kpiDelta: { cashEUR: -120000, bankTrust: -6, customerLoyalty: +4  } }
  ],
  attachments: ['Notiz_ZZ1.pdf']
},
{
    id: 'D02-CFO-4',
    day: 2,
    role: 'CFO',
    title: 'Treasury-Board einrichten',
    context: 'Cash-Entscheidungen sind fragmentiert.',
    dilemma: 'Zentralisierung vs. Geschwindigkeit',
    hiddenAgendaHint: 'Disziplin wird von der Bank positiv gesehen.',
    options: [{ id: 'a', label: 'Tägliches 15-Min-Board mit CEO/OPS/HR',       kpiDelta: { bankTrust: +5, workforceEngagement: +1 } },
{ id: 'b', label: 'Wöchentliches Board',                          kpiDelta: { bankTrust: +2 } },
{ id: 'c', label: 'Kein Board – CFO entscheidet allein',          kpiDelta: { bankTrust: -2, workforceEngagement: -1 } },
{ id: 'd', label: 'Externen Treasurer in Abstimmung mit Bank temporär hinzuziehen', kpiDelta: { profitLossEUR: -11000, bankTrust: +6, workforceEngagement: -3 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['Memo-Treasury.pdf']
}];

const OPS_BLOCKS: DecisionBlock[] = [{
    id: 'D02-OPS-1',
    day: 2,
    role: 'OPS',
    title: 'Maschinenausfall Kernlinie',
    context: 'Eine Produktionsmaschine fällt aus; Ersatzteil in 14 Tagen verfügbar, sonst kommt es zu Verzögerungen bei der Auftragsabarbeitung.',
    dilemma: 'Schnelle Reparatur vs. günstige Beschaffung',
    hiddenAgendaHint: 'Termintreue bei Schlüsselkunden entscheidend.',
    options: [{ id: 'a', label: 'Express-Ersatzteil (teuer)',            kpiDelta: { cashEUR: -18000, customerLoyalty: +4, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Interne Reparatur, Lieferverzug wird akzeptiert',              kpiDelta: { profitLossEUR: -8000, customerLoyalty: -3, workforceEngagement: +1, publicPerception: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Fremdfertigung (+20 % Kosten)',                kpiDelta: { profitLossEUR: -15000, customerLoyalty: +2, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Auftrag stornieren (Vertragsstrafe + Gewinnausfall)',                           kpiDelta: { profitLossEUR: -12000, customerLoyalty: -8, workforceEngagement: -3, publicPerception: -2  },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['Stoerungsmeldung1.pdf']
},
{
    id: 'D02-OPS-2',
    day: 2,
    role: 'OPS',
    title: 'Kritische Rohstoffe – Sicherheitsbestand',
    context: 'Sicherheitsbestand deckt nur 5 Tage; Lieferketten volatil.',
    dilemma: 'Cash-Bindung vs. Liefersicherheit',
    hiddenAgendaHint: 'Gezielte Puffer nur für A-Teile.',
    options: [{ id: 'a', label: 'Nur A-Teile nachbestellen',     kpiDelta: { cashEUR: -50000, customerLoyalty: +3, bankTrust: +1, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Voller Sicherheitsbestand',             kpiDelta: { cashEUR: -120000, customerLoyalty: +5,  bankTrust: -1, workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Gar nicht nachbestellen',                      kpiDelta: { customerLoyalty: -6, workforceEngagement: -2 } },
{ id: 'd', label: 'Konsignationslager mit Lieferant verhandeln',  kpiDelta: { bankTrust: +2, customerLoyalty: +2 } }
  ],
  attachments: ['Rohstoffe1.pdf']
},
{
    id: 'D02-OPS-3',
    day: 2,
    role: 'OPS',
    title: 'Produktmix kurzfristig verschieben',
    context: 'Hoher DB bei Produktlinie P3, aber lange Rüstzeiten.',
    dilemma: 'DB-Maximierung vs. Komplexität',
    hiddenAgendaHint: 'Kommunikation mit Vertrieb zwingend.',
    options: [{ id: 'a', label: 'Fokus P3 (DB-Marge>30 %) – andere drosseln',         kpiDelta: { profitLossEUR: +25000, customerLoyalty: -1, workforceEngagement: -1},
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Ausgewogener Mix',                              kpiDelta: { profitLossEUR: +15000 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Kundenorientierte Fertigung priorisieren',      kpiDelta: { customerLoyalty: +4, profitLossEUR: -6000, workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'd', label: 'Status quo',                                    kpiDelta: { profitLossEUR: 0, bankTrust: -2, workforceEngagement: +1 } }
  ],
  attachments: ['Produktmix1.pdf']
},
{
    id: 'D02-OPS-4',
    day: 2,
    role: 'OPS',
    title: 'Qualitätsgate verschärfen',
    context: 'Fehlerrate steigt; Nacharbeit bindet Kapazität und kostet Geld.',
    dilemma: 'Strenge Qualitätskontrolle vs. Durchsatz',
    hiddenAgendaHint: 'Kurzfristig langsamer, mittelfristig stabiler.',
    options: [{ id: 'a', label: 'Zusätzliche Endprüfung (temporär)',             kpiDelta: { profitLossEUR: -4000, customerLoyalty: +3,  workforceEngagement: -1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Nur Stichprobe erhöhen',                        kpiDelta: { profitLossEUR: -1500, customerLoyalty: +1,  workforceEngagement: +1 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'c', label: 'Kein Change (Tempo halten)',                    kpiDelta: { customerLoyalty: -2 } },
{ id: 'd', label: 'Externe QS kurzfristig',                   kpiDelta: { profitLossEUR: -8000, customerLoyalty: +4, publicPerception: +1,  workforceEngagement: -4 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['Qualitaet1.pdf']
}];

const HRLEGAL_BLOCKS: DecisionBlock[] = [{
    id: 'D02-HRLEGAL-1',
    day: 2,
    role: 'HRLEGAL',
    title: 'Krankheitswelle in der Montage',
    context: '10 % krank; kritische Projekte betroffen.',
    dilemma: 'Leiharbeit vs. Überstunden vs. Priorisierung',
    hiddenAgendaHint: 'Überlastung erhöht Fluktuationsrisiko.',
    options: [{ id: 'a', label: 'Leiharbeit kurzfristig einsetzen',              kpiDelta: { profitLossEUR: -15000, workforceEngagement: +2 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Überstunden anordnen',                           kpiDelta: { workforceEngagement: -4, customerLoyalty: +2, publicPerception: -1 } },
{ id: 'c', label: 'Projekte priorisieren',                         kpiDelta: {  profitLossEUR: -8000, customerLoyalty: -2, workforceEngagement: +1 } },
{ id: 'd', label: 'Keine Maßnahme',                                kpiDelta: { profitLossEUR: -18000, customerLoyalty: -6 } }
  ],
  attachments: ['Aktennotiz_Grippe.pdf']
},
{
    id: 'D02-HRLEGAL-2',
    day: 2,
    role: 'HRLEGAL',
    title: 'Betriebsratsgespräch zur Kurzarbeit',
    context: 'BR fordert Transparenz und Mitbestimmung.',
    dilemma: 'Tempo vs. Beteiligung',
    hiddenAgendaHint: 'Saubere Einbindung reduziert Konflikte.',
    options: [{ id: 'a', label: 'Nur Minimalinfo',                               kpiDelta: { workforceEngagement: -4, publicPerception: -1 } },
{ id: 'b', label: 'Frühgespräch + Informationspaket',              kpiDelta: { workforceEngagement: +4, publicPerception: +1 } },
              { id: 'c', label: 'Kein Gespräch (formale Frist ausreizen)',       kpiDelta: { workforceEngagement: -6, publicPerception: -2 } },
{ id: 'd', label: 'Externer Moderator',                            kpiDelta: {cashEUR: -6000, profitLossEUR: -6000, workforceEngagement: +3, publicPerception: +1 },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['Email-BR1.pdf']
},
{
    id: 'D02-HRLEGAL-3',
    day: 2,
    role: 'HRLEGAL',
    title: 'Gerüchte in Social Media eindämmen',
    context: 'Mitarbeitende posten Spekulationen.',
    dilemma: 'Meinungsfreiheit vs. Unternehmensinteresse',
    hiddenAgendaHint: 'Guidelines und Faktencheck statt Maulkorb.',
    options: [{ id: 'a', label: 'Social-Media-Guideline & Fact-Sheet',           kpiDelta: { publicPerception: +3, workforceEngagement: +1,
      profitLossEUR: -1000, cashEUR: -1000 },
  isTradeOff: true },
{ id: 'b', label: 'Nur HR-Newsletter intern',                      kpiDelta: { publicPerception: 0, workforceEngagement: +1 } },
{ id: 'c', label: 'Warnung: Postings untersagen',                   kpiDelta: { publicPerception: -2, workforceEngagement: -4 } },
{ id: 'd', label: 'Ignorieren',                                    kpiDelta: { publicPerception: -4 } }
  ],
  attachments: ['Leitlinie_Geruechte.pdf']
},
{
    id: 'D02-HRLEGAL-4',
    day: 2,
    role: 'HRLEGAL',
    title: 'Datenschutzprüfung für Factoring/Beirat',
    context: 'Datenweitergabe an Dritte (Factoring, Beirat) steht an.',
    dilemma: 'Geschwindigkeit vs. Compliance',
    hiddenAgendaHint: 'Präventive Prüfung verhindert spätere Sperren.',
    options: [{ id: 'a', label: 'DSFA/AVV-Check sofort anstoßen',                 kpiDelta: { bankTrust: +2, publicPerception: +1, profitLossEUR: -1000 },
  variance: 0.8, 
  execLeakage: 0.7},
{ id: 'b', label: 'Nur Minimalprüfung',                             kpiDelta: { bankTrust: +1 } },
{ id: 'c', label: 'Keine Prüfung',                                  kpiDelta: { bankTrust: -2, publicPerception: -1 } },
{ id: 'd', label: 'Extern vergeben',                           kpiDelta: { profitLossEUR: -5000, bankTrust: +2, workforceEngagement: -1  },
  variance: 0.8, 
  execLeakage: 0.7}
  ],
  attachments: ['Datenschutz1.pdf']
}];

export const day2Blocks: DecisionBlock[] = [
  ...CEO_BLOCKS,
  ...CFO_BLOCKS,
  ...OPS_BLOCKS,
  ...HRLEGAL_BLOCKS
];

// src/data/scenario_day_02.ts — NUR den News-Block ersetzen
export const day2News: DayNewsItem[] = [
  {
    id: 'N2-1',
    day: 2,
    title: 'Regionale Presse fordert Interview zu Stabilität & Ausblick',
    source: 'press',
    severity: 'high',
    isImportant: true,
    content: 'Wirtschaftsredaktion kündigt Beitrag an und bittet um Interview-Slot heute/nächste Tage. Der Bericht wird in vorbereitet und basiert auch auf Insiderinformationen aus dem Unternehmen. Die Journalistin will der Geschäftsführung die Mölgichkeit geben, auf die Informationen zu reagieren, wird den bericht aber in jedem Fall veröffentlichen.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const hasStatement =
        Array.isArray(log) &&
        log.some(e =>
          e &&
          e.id === 'D01-CEO-3' &&
          (e.choice === 'a' ||
            /Faktenbasiertes Statement/i.test(e?.choiceLabel || e?.label || '')
          )
        );
      const wasOptimistic =
        Array.isArray(log) &&
        log.some(e =>
          e &&
          e.id === 'D01-CEO-3' &&
          (e.choice === 'd' ||
            /Optimistisches Interview/i.test(e?.choiceLabel || e?.label || '')
          )
        );
      const hasDailyReporting =
        Array.isArray(log) &&
        log.some(e =>
          e &&
          e.id === 'D01-CFO-4' &&
          (e.choice === 'b' ||
            /Daily Short-Report/i.test(e?.choiceLabel || e?.label || '')
          )
        );

      let s = '';
      if (hasStatement) {
        s += 'Das Interview knüpft an Ihr faktenbasiertes Statement und das Q&A aus Tag 1 an. ';
      } else if (wasOptimistic) {
        s += 'Achten Sie auf Konsistenz: Der Optimismus aus Tag 1 ohne belastbare Daten wird kritisch hinterfragt werden. ';
      } else {
        s += 'Mangels offizieller Stellungnahme von Tag 1 braucht es nun klare Botschaften auf Basis belastbarer Zahlen. ';
      }
      s += 'Schwerpunkte: Maßnahmenplan, 13-Wochen-Liquiditätsbrücke, Zuständigkeiten – ohne neue Versprechen. ';
      s += hasDailyReporting
        ? 'Der Verweis auf Daily-Short-Reports plus Weekly-Detailreporting erhöht die Glaubwürdigkeit bei Bank und Kunden.'
        : 'Ein konsistentes Reporting-Regime (Daily/Weekly) erhöht die Glaubwürdigkeit bei Bank und Kunden.';
      return s;
    }
  },
  {
    id: 'N2-2',
    day: 2,
    title: 'Skonto-Push: Kunden bieten Sofortzahlung gegen 4 % Nachlass',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Mehrere Kunden fragen aktiv nach Skonto-Deals außerhalb bestehender Konditionen.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const day1Broad =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-CFO-2' &&
          (e.choice === 'b' || /Breit ausrollen/i.test(e?.choiceLabel || e?.label || ''))
        );
      const day1Selective =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-CFO-2' &&
          (e.choice === 'a' || /A-Kunden/i.test(e?.choiceLabel || e?.label || ''))
        );
      const day1Rejected =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-CFO-2' &&
          (e.choice === 'd' || /kein Skonto/i.test(e?.choiceLabel || e?.label || ''))
        );

      let s = 'Sofortzahlungsangebote nehmen zu; die Erwartung eines generellen Skonto-Rahmens verbreitet sich. ';
      if (day1Broad) {
        s += 'Absehbare Folge der gestrigen breiten Skonto-Policy: Bitte Begründung und Kriterien konsistent halten; Bank achtet auf Signalwirkung. ';
      } else if (day1Selective) {
        s += 'Selektiver Ansatz von Tag 1 (A-Kunden) wird nun von B-/C-Kunden eingefordert – ohne klare Policy drohen Einzelfallzusagen. ';
      } else if (day1Rejected) {
        s += 'Trotz Ablehnung am Vortag steigt der Druck; Alternativen (z. B. Factoring-Pilot, Zahlungsplan) transparent kommunizieren. ';
      }
      s += 'Hinweis: Auswirkung auf Marge quantifizieren und gegenüber Treasury/Bank sauber verorten.';
      return s;
    }
  },
  {
    id: 'N2-3',
    day: 2,
    title: 'Weitere Lieferanten stellen auf Vorkasse um',
    source: 'supplier',
    severity: 'medium',
    isImportant: true,
    content: 'Nach ChemAlloy signalisieren zwei weitere Zulieferer Vorkasse- oder kürzere Zahlungsziele.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const selectivePrepay =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-OPS-1' &&
          (e.choice === 'a' || /70 % Vorkasse.*DB/i.test(e?.choiceLabel || e?.label || ''))
        );
      const fullPrepay =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-OPS-1' &&
          (e.choice === 'b' || /Vollständige Vorkasse/i.test(e?.choiceLabel || e?.label || ''))
        );

      let s = 'Konditionsverschärfungen wirken in die Breite. ';
      if (selectivePrepay) {
        s += 'Die selektive Vorkasse-Linie (DB-Schwelle, ggf. Anderkonto) von Tag 1 dient als Blaupause für neue Fälle. ';
      } else if (fullPrepay) {
        s += 'Die vollständige Vorkasse-Praxis von Tag 1 erhöht den kurzfristigen Durchsatz, belastet jedoch Cash – Treasury-Board sollte Prioritäten setzen. ';
      } else {
        s += 'Ohne definierte Freigabekriterien (DB-Schwelle, Anderkonto) drohen inkonsistente Zusagen und Reibungsverluste. ';
      }
      s += 'OPS und CFO synchronisieren Payment-Runs, um Liefersicherheit und Liquidität zu balancieren.';
      return s;
    }
  },
  {
    id: 'N2-4',
    day: 2,
    title: 'Maschinenausfall in Kernlinie – Terminplan unter Druck',
    source: 'internal',
    severity: 'high',
    isImportant: true,
    content: 'Kernmaschine steht; Standard-Ersatzteil in ~14 Tagen, Express verfügbar gegen Aufpreis.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const nightRebuild =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-OPS-2' &&
          (e.choice === 'b' || /Umbau nachts/i.test(e?.choiceLabel || e?.label || ''))
        );
      const immediateRebuild =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-OPS-2' &&
          (e.choice === 'c' || /Sofortiger Umbau/i.test(e?.choiceLabel || e?.label || ''))
        );

      let s = 'Die Terminrisiken treffen A-Kunden zuerst. ';
      if (nightRebuild || immediateRebuild) {
        s += 'Die gestern angestoßenen Umbauten erleichtern die Umplanung/Bottleneck-Entschärfung, ersetzen aber die Reparatur nicht. ';
      } else {
        s += 'Ohne Umbaumaßnahmen von Tag 1 fehlt Puffer – Express-Ersatzteil oder Fremdfertigung prüfen. ';
      }
      s += 'Kommunikation an Vertrieb/Key Accounts mit klaren Kompensationsmaßnahmen (z. B. Fremdfertigung, Schichttausch).';
      return s;
    }
  },
  {
    id: 'N2-5',
    day: 2,
    title: 'Krankheitswelle in der Montage – Kapazität minus ~10 %',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'Mehrere Teams stark betroffen; kritische Projekte priorisieren erforderlich.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const strongInternalComms =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-HRLEGAL-1' &&
          (e.choice === 'b' || /Faktenmemo.*Ticker/i.test(e?.choiceLabel || e?.label || ''))
        );

      let s = 'Ausfallquote belastet Durchsatz und Terminlage. ';
      s += strongInternalComms
        ? 'Der interne Q&A-Ticker aus Tag 1 hilft bei Schichtumbauten und Transparenz.'
        : 'Ohne aktives internes Informationspaket drohen Gerüchte und Doppelbelastung – HR sollte Guideline/FAQ bereitstellen.';
      return s;
    }
  },
  {
    id: 'N2-6',
    day: 2,
    title: 'Key-Accounts verlangen Roadshow/Briefing zur Liefersicherheit',
    source: 'customer',
    severity: 'high',
    isImportant: true,
    content: 'Top-Kunden bitten um persönliche Einordnung der nächsten 6 Wochen. Die Kunden werden nervös, da sie von den Schwierigkeiten erfahren haben und Lieferverzögerungen befürchten. Zudem könnten neue Zölle die Produkte verteuern. Deshalb wird angefragt, ob CEO und OPS für persönliche Treffen zeitnah zur Verfügung stehen.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const fastGoodwill =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-OPS-4' &&
          (e.choice === 'a' || /Ersatzlieferung.*Root/i.test(e?.choiceLabel || e?.label || ''))
        );
      const hardStance =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-OPS-4' &&
          (e.choice === 'c' || /Vertrag pochen/i.test(e?.choiceLabel || e?.label || ''))
        );

      let s = 'Kundenseitig zählt jetzt Sichtbarkeit von Kapazität, Risiken und Gegenmaßnahmen. ';
      if (fastGoodwill) {
        s += 'Die schnelle Kulanz aus Tag 1 schafft Vertrauen – Roadshow/Remote-Briefing festigt die Bindung.';
      } else if (hardStance) {
        s += 'Nach der harten Vertragslinie von Tag 1 ist persönliche Präsenz ratsam, um Eskalationen und Volumenverlagerungen vorzubeugen.';
      } else {
        s += 'Ein strukturiertes Briefing (Meilensteine, Engpassliste, Ansprechpartner) stabilisiert Erwartungsmanagement.';
      }
      return s;
    }
  },
  {
    id: 'N2-7',
    day: 2,
    title: 'Factoring-Anbieter bietet Rahmen – 85 % Vorschuss, 2,2 % Gebühr',
    source: 'bank',
    severity: 'medium',
    isImportant: true,
    content: 'Angebot für Non-Recourse-Factoring liegt vor; Vorabprüfung durch Bank/DSGVO empfohlen.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const hasTreasuryBoard =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-CFO-4' && (e.choice === 'a' || /Tägliches.*Board/i.test(e?.choiceLabel || e?.label || '')));
      const hasDSCheckPlanned =
        Array.isArray(log) &&
        log.some(e => e && e.id === 'D02-HRLEGAL-4' && (e.choice === 'a' || e.choice === 'd' || /DSFA|Datenschutz/i.test(e?.choiceLabel || e?.label || '')));

      let s = 'Liquiditätshebel ist signifikant; Kosten und Signalwirkung müssen sauber adressiert werden. ';
      s += hasTreasuryBoard
        ? 'Das Treasury-Board priorisiert Umfang/Timing und stellt die Bank-Kohärenz sicher. '
        : 'Ein zentrales Treasury-Gremium würde Priorisierung und Bank-Kohärenz vereinfachen. ';
      s += hasDSCheckPlanned
        ? 'DSGVO-Themen (DSFA/AVV) sind bereits angestoßen – Freigaben dokumentieren.'
        : 'Bitte DSFA/AVV früh prüfen, um spätere Sperren zu vermeiden.';
      return s;
    }
  },
  {
    id: 'N2-8',
    day: 2,
    title: 'Betriebsrat fordert Kurzarbeits-Vorgespräch',
    source: 'internal',
    severity: 'medium',
    isImportant: true,
    content: 'BR erwartet Transparenz zu Kriterien, Dauer und betroffenen Bereichen.',
    expandedText: (ctx) => {
      const log = (ctx && ctx.log) ? ctx.log : [];
      const preCheckDone =
        Array.isArray(log) &&
        log.some(e =>
          e && e.id === 'D01-HRLEGAL-2' &&
          (e.choice === 'a' || /Voranfrage/i.test(e?.choiceLabel || e?.label || ''))
        );

      let s = 'Frühe Einbindung reduziert Konflikte und beschleunigt die Umsetzung. ';
      s += preCheckDone
        ? 'Die formelle Voranfrage von Tag 1 erleichtert die Argumentation gegenüber dem BR.'
        : 'Ohne Vorprüfung fehlen belastbare Zahlen/Prozesse – bitte Nachreichung abstimmen.';
      return s;
    }
  },
  {
    id: 'N2-F1',
    day: 2,
    title: 'Brandschutzübung um 11:30 Uhr',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content: 'Um 11:30 Uhr findet eine Evakuierungsübung statt; Produktion stoppt kurzzeitig.'
  },
  {
    id: 'N2-F3',
    day: 2,
    title: 'Kurzfristige IT-Wartung',
    source: 'internal',
    severity: 'low',
    isImportant: false,
    suppressHints: true,
    content: 'Zwischen 16:00–16:20 Uhr kann es zu VPN-Unterbrechungen kommen.'
  }
];
