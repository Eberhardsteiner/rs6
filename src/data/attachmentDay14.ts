// src/data/attachmentDay14.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day14Attachments: Record<string, AttachmentContent> = {
  
  'final_statement_tag14.docx': {
    filename: 'final_statement_tag14.docx',
    title: 'Finales Statement zum Abschluss der Stabilisierungsphase',
    type: 'document',
    content: `INTERNES UND EXTERNES STATEMENT
Datum: Tag 14
Von: CEO-Office
An: Alle Stakeholder

Betreff: Erfolgreicher Abschluss der 14-tägigen Stabilisierungsphase bei APS GmbH

Sehr geehrte Stakeholder,

nach 14 intensiven Tagen können wir heute den erfolgreichen Abschluss unserer Stabilisierungsphase verkünden. Dieser Meilenstein markiert nicht das Ende, sondern den Anfang einer nachhaltigen Neuausrichtung unseres Unternehmens.

FAKTEN UND ERGEBNISSE:

1. Liquiditätsstabilisierung erreicht:
   - Zahlungsfähigkeit für die Zukunft gesichert
   - Alle Löhne und Gehälter pünktlich gezahlt
   - Kritische Lieferantenverbindlichkeiten bedient
   - 13-Wochen-Liquiditätsplanung implementiert und von der Bank akzeptiert

2. Operative Exzellenz wiederhergestellt:
   - Defektrate um 42% reduziert (von 8,3% auf 4,8%)
   - Liefertreue auf 94% gesteigert
   - A-Kunden-Zufriedenheit bei 87% (NPS +12 Punkte)
   - Produktionseffizienz um 15% verbessert

3. Strategische Weichenstellungen:
   - Verkauf von United Pumps of America eingeleitet (LOI unterzeichnet)
   - Erwarteter Mittelzufluss: 30 Mio. EUR
   - Kerngeschäft klar definiert und priorisiert
   - Produktmix auf Profitabilität optimiert (DB > 25%)

4. Stakeholder-Vertrauen wiedergewonnen:
   - Bankvertrauen durch transparente Kommunikation gestärkt
   - Kundenbeirat etabliert und quartalsweise Meetings fixiert
   - Mitarbeiterengagement durch offene Kommunikation verbessert
   - Öffentliche Wahrnehmung durch faktenbasierte Updates stabilisiert

NÄCHSTE SCHRITTE (T+1 bis T+30):

Woche 1 (T+1 bis T+7):
- Townhall mit allen Mitarbeitern am T+1
- Individuelle Gespräche mit A-Kunden
- Finalisierung des Verkaufs von United Pumps
- Start der 72h-Hypercare-Phase für kritische Kunden

Woche 2-3 (T+8 bis T+21):
- Implementierung der neuen Materialfreigabe-Policy
- Rollout des optimierten Produktmixes
- Abschluss der Compliance-Dokumentation
- Quartalsmeeting mit dem Kundenbeirat

Woche 4 (T+22 bis T+30):
- Closing des United Pumps Verkaufs
- Mittelzufluss und Schuldenreduzierung
- Start des nachhaltigen Turnaround-Programms
- Veröffentlichung des Q1-Ausblicks

VERPFLICHTUNGEN:

Wir verpflichten uns zu:
- Monatlicher Transparenz über unsere Fortschritte
- Einhaltung aller vereinbarten Covenants
- Kontinuierlicher Verbesserung unserer Prozesse
- Fairem und gleichberechtigtem Umgang mit allen Stakeholdern

DANKSAGUNG:

Dieser Erfolg wäre ohne das außerordentliche Engagement aller Beteiligten nicht möglich gewesen. Unser Dank gilt:
- Unseren Mitarbeitern für ihre Flexibilität und ihren unermüdlichen Einsatz
- Unseren Kunden für ihr Vertrauen und ihre Geduld
- Unseren Lieferanten für ihre Kooperation
- Unserer Hausbank für die konstruktive Zusammenarbeit

Die vergangenen 14 Tage haben gezeigt, was wir gemeinsam erreichen können. Mit dieser Energie und diesem Teamgeist werden wir APS nachhaltig in eine erfolgreiche Zukunft führen.

Mit freundlichen Grüßen

[CEO-Name]
Geschäftsführer
Aurion Pumpen Systeme`
  },

  'stakeholder_matrix_communication.pdf': {
    filename: 'stakeholder_matrix_communication.pdf',
    title: 'Stakeholder-Matrix und Kommunikationsplan',
    type: 'document',
    content: `STAKEHOLDER-KOMMUNIKATIONSMATRIX
Stand: Tag 14
Klassifikation: VERTRAULICH

STAKEHOLDER-MAPPING UND KOMMUNIKATIONSSTRATEGIE

1. PRIMÄRE STAKEHOLDER (Hoher Einfluss / Hohe Relevanz):

HAUSBANK
- Einfluss: Kritisch (Kreditlinien, Covenants)
- Kommunikationsfrequenz: Täglich bis T+7, dann wöchentlich
- Hauptansprechpartner: CFO
- Key Messages: Liquidität gesichert, Covenants eingehalten, Verkauf läuft
- Kanäle: Direkte Calls, formelle Reports, 13-Wochen-Bridge
- Risiko bei Fehlkommunikation: Kreditkündigung

A-KUNDEN (Top 5)
- Einfluss: Hoch (40% des Umsatzes)
- Kommunikationsfrequenz: 2x wöchentlich
- Hauptansprechpartner: CEO/OPS
- Key Messages: Lieferfähigkeit gesichert, Qualität verbessert, Hypercare aktiv
- Kanäle: Persönliche Meetings, Kundenbeirat, Service-Updates
- Risiko: Abwanderung zu Wettbewerbern

MITARBEITER
- Einfluss: Hoch (Produktivität, Know-how)
- Kommunikationsfrequenz: Wöchentliche Updates
- Hauptansprechpartner: HR/CEO
- Key Messages: Arbeitsplätze gesichert, Zukunftsperspektive klar
- Kanäle: Townhalls, Intranet, Teamleiter-Kaskade
- Risiko: Fluktuation kritischer Mitarbeiter

2. SEKUNDÄRE STAKEHOLDER (Mittlerer Einfluss):

B/C-KUNDEN
- Einfluss: Mittel (35% Umsatz, höhere Margen)
- Kommunikationsfrequenz: Monatlich
- Messages: Normaler Geschäftsbetrieb, verbesserte Services
- Kanäle: Newsletter, Account Manager

LIEFERANTEN
- Einfluss: Mittel (Materialversorgung)
- Kommunikationsfrequenz: Bei Bedarf
- Messages: Zahlungsfähigkeit, faire Behandlung
- Kanäle: Schriftliche Updates, Lieferantenportal

BETRIEBSRAT
- Einfluss: Mittel bis Hoch (bei Personalmaßnahmen)
- Kommunikationsfrequenz: Wöchentlich
- Messages: Transparenz, keine Massenentlassungen geplant
- Kanäle: Regelmäßige Sitzungen, schriftliche Protokolle

3. TERTIÄRE STAKEHOLDER:

LOKALE MEDIEN
- Einfluss: Niedrig bis Mittel
- Frequenz: Bei Bedarf
- Messages: Positive Entwicklung, Standort gesichert
- Kanäle: Pressemitteilungen, Interviews

KOMMUNIKATIONS-TIMELINE:

T+0 (heute): 
- Finale Statements an alle Stakeholder-Gruppen
- Proof of Funds an Bank

T+1: 
- Townhall für alle Mitarbeiter (09:00 Uhr)
- Einzelcalls mit Top-3-Kunden

T+3:
- Kundenbrief an alle Kunden
- Update Lieferanten

T+7:
- Bank-Update mit finalen Zahlen
- Beiratsmeeting

T+14:
- Öffentliches Statement zu Fortschritten
- Mitarbeiter-Newsletter

T+30:
- Quartalsbericht
- Kundenbeirat
- Strategieupdate

ESKALATIONSMATRIX:

Level 1 (Operative Ebene):
- Tägliche Probleme
- Lösungszeit: < 4 Stunden
- Entscheider: Teamleiter

Level 2 (Management):
- Kundenreklamationen, Lieferprobleme
- Lösungszeit: < 24 Stunden
- Entscheider: Bereichsleiter

Level 3 (Geschäftsführung):
- Kritische Stakeholder-Issues
- Lösungszeit: Sofort
- Entscheider: CEO/CFO

KOMMUNIKATIONS-DOS AND DON'TS:

DOS:
✓ Faktenbasiert kommunizieren
✓ Zeitnahe Updates bei Änderungen
✓ Konsistente Messages über alle Kanäle
✓ Erfolge hervorheben, Probleme nicht verschweigen
✓ Persönliche Note bei kritischen Stakeholdern

DON'TS:
✗ Übertriebener Optimismus ohne Substanz
✗ Widersprüchliche Aussagen verschiedener Sprecher
✗ Schuldzuweisungen oder Rechtfertigungen
✗ Versprechen ohne Deckung
✗ Ignorieren von Stakeholder-Anfragen

Diese Matrix ist wöchentlich zu aktualisieren und bei kritischen Ereignissen sofort anzupassen.`
  },

  'message_house_finale.pptx': {
    filename: 'message_house_finale.pptx',
    title: 'Message House - Kernbotschaften Tag 14',
    type: 'presentation',
    content: `MESSAGE HOUSE - FINALE KOMMUNIKATION TAG 14

SLIDE 1: DACHBOTSCHAFT
"APS - Stabilisiert. Fokussiert. Zukunftsfähig."

Wir haben in 14 Tagen bewiesen: APS kann Krisen meistern und gestärkt daraus hervorgehen.

SLIDE 2: DREI SÄULEN DER KOMMUNIKATION

SÄULE 1: FINANZIELLE STABILITÄT
Kernaussagen:
- Liquidität für die nächsten 13 Wochen gesichert
- Verkauf United Pumps bringt 30 Mio. EUR
- Alle Covenant-Vereinbarungen mit Bank erfüllt
- Keine Insolvenzgefahr

Beweise:
- 13-Wochen-Liquiditätsplan testiert
- LOI unterzeichnet und öffentlich
- Bank-Bestätigung liegt vor
- Payroll pünktlich gezahlt

SÄULE 2: OPERATIVE EXZELLENZ
Kernaussagen:
- Qualität auf Rekordniveau (Defektrate < 5%)
- Liefertreue bei 94% stabilisiert
- A-Kunden-Zufriedenheit gesichert
- Produktion läuft reibungslos

Beweise:
- QS-Report mit Kennzahlen
- Kundenstatements positiv
- Keine kritischen Reklamationen
- Hypercare-Phase gestartet

SÄULE 3: STRATEGISCHE KLARHEIT
Kernaussagen:
- Fokus auf profitables Kerngeschäft
- Klare Wachstumsstrategie definiert
- Management-Team komplett und aligned
- Zukunftsinvestitionen geplant

Beweise:
- Produktmix optimiert (DB > 25%)
- Strategiepapier verabschiedet
- Keine Führungswechsel
- Investitionsplan 2025 steht

SLIDE 3: STAKEHOLDER-SPEZIFISCHE MESSAGES

FÜR MITARBEITER:
"Eure Arbeitsplätze sind sicher. Gemeinsam haben wir die Wende geschafft. Die Zukunft beginnt jetzt."

FÜR KUNDEN:
"Wir sind wieder voll lieferfähig. Qualität und Service stehen an erster Stelle. Danke für Ihr Vertrauen."

FÜR BANK:
"Alle Zusagen wurden eingehalten. Die Zahlen stimmen. Die Strategie greift. ROI gesichert."

FÜR LIEFERANTEN:
"Zahlungen laufen planmäßig. Faire Partnerschaft. Gemeinsames Wachstum."

FÜR ÖFFENTLICHKEIT:
"APS bleibt wichtiger regionaler Arbeitgeber. Tradition trifft Innovation. Nachhaltig erfolgreich."

SLIDE 4: Q&A VORBEREITUNG

KRITISCHE FRAGE 1: "Warum verkaufen Sie United Pumps?"
ANTWORT: "Der Verkauf ermöglicht uns, uns auf unser profitables Kerngeschäft zu fokussieren. Die 30 Mio. EUR schaffen finanzielle Stabilität und Investitionsspielraum. United Pumps erhält einen Eigentümer, der besser zu deren Markt passt."

KRITISCHE FRAGE 2: "Wird es Entlassungen geben?"
ANTWORT: "Nein. Der Verkauf von United Pumps erfolgt als Ganzes inklusive aller Mitarbeiter (§613a BGB). Im Kerngeschäft sind keine Personalreduzierungen geplant - im Gegenteil, mittelfristig planen wir selektive Neueinstellungen."

KRITISCHE FRAGE 3: "Ist APS jetzt wirklich über dem Berg?"
ANTWORT: "Die akute Krise ist überwunden. Die Zahlen beweisen es. Jetzt beginnt die nachhaltige Transformation. Wir sind realistisch: Es gibt noch viel zu tun, aber die Basis stimmt."

KRITISCHE FRAGE 4: "Was passiert mit den Investorengesprächen?"
ANTWORT: "Wir führen Gespräche, aber ohne Zeitdruck. Der Verkauf von United Pumps verschafft uns Luft. Ein Investor kommt nur in Frage, wenn er strategischen Mehrwert bringt."

SLIDE 5: KOMMUNIKATIONS-FAHRPLAN

HEUTE (Tag 14):
15:00 - Finale Statements verschickt
16:00 - Presse-Info
17:00 - Mitarbeiter-Mail

MORGEN (T+1):
09:00 - Townhall
11:00 - Kundencalls
14:00 - Bank-Update

DIESE WOCHE:
- 3 Kundenbesuche
- Lieferanten-Info
- Beirats-Call

NÄCHSTE WOCHE:
- Q1-Preview
- Strategie-Deep-Dive
- Investoren-Update

SLIDE 6: ERFOLGSMESSUNG

KPIs für Kommunikationserfolg:
- Mitarbeiter-Stimmung (Pulse Survey): Ziel > 70% positiv
- Medien-Tonalität: Ziel > 80% neutral/positiv  
- Kunden-Feedback: Ziel NPS > +20
- Bank-Rating: Ziel: Verbesserung um 1 Stufe
- Social Media Sentiment: Ziel > 60% positiv

Monitoring:
- Tägliches Media-Monitoring
- Wöchentliche Stakeholder-Pulse-Checks
- Monatliche Sentiment-Analyse

SLIDE 7: GOLDENE REGELN

1. Eine Stimme: Nur definierte Sprecher kommunizieren extern
2. Fakten first: Jede Aussage muss belegbar sein
3. Zeitnah: Innerhalb von 4 Stunden auf kritische Anfragen reagieren
4. Konsistenz: Gleiche Botschaft über alle Kanäle
5. Menschlichkeit: Erfolge feiern, für Vertrauen danken

"Kommunikation ist der Schlüssel zum Vertrauen. 
Vertrauen ist der Schlüssel zum Erfolg."`
  },

  'commitment_note_bank.pdf': {
    filename: 'commitment_note_bank.pdf',
    title: 'Commitment Note an Hausbank',
    type: 'document',
    content: `COMMITMENT NOTE

Datum: Tag 14
An: Vereinigte Kreditbank / Intensive Care
Von: CFO APS 

Betreff: Verbindliche Zusagen gemäß Stabilisierungsvereinbarung

Sehr geehrte Damen und Herren,

hiermit bestätigen wir Ihnen verbindlich die Erfüllung aller vereinbarten Meilensteine zum Stichtag Tag 14 sowie unsere Commitments für die kommenden Wochen.

1. ERLEDIGTE MASSNAHMEN (Status: Tag 14)

☑ 13-Wochen-Liquiditätsplanung erstellt und plausibilisiert
  - Eingereicht am: Tag 12
  - Externe Validierung durch WP am: Tag 13
  - Inkl. Sensitivitätsanalyse (Best/Real/Worst Case)

☑ Verkauf United Pumps of America eingeleitet
  - LOI unterzeichnet am: Tag 10
  - Due Diligence gestartet am: Tag 11
  - Erwarteter Closing: T+14
  - Kaufpreis: 30 Mio. EUR (davon 25 Mio. Cash bei Closing)

☑ Operative Stabilisierung erreicht
  - Defektrate: 4,8% (Ziel war < 6%)
  - Liefertreue: 94% (Ziel war > 90%)
  - Materialbestand optimiert: -2,3 Mio. EUR Working Capital

☑ Kostensenkungsprogramm implementiert
  - Sachkosten: -18% vs. Vormonat
  - Reisekosten: -65% durch Freeze
  - Beratungskosten: -80% durch Kündigung nicht-kritischer Mandate

☑ Compliance-Paket vollständig
  - Gleichbehandlungsdokumentation Lieferanten
  - Whistleblower-Prävention aktiv
  - DSGVO-Audit abgeschlossen

2. FINANZIELLE KENNZAHLEN (Stand: Tag 14)

Liquidität:

- Liquiditätsbedarf nächste 7 Tage: 0,9 Mio. EUR
- Coverage Ratio: 222%

Forderungen:
- Überfällige Forderungen > 30 Tage: 2,1 Mio. EUR (-30% vs. Tag 1)
- Einbringungsquote letzte 14 Tage: 73%
- Erwartete Eingänge nächste 7 Tage: 1,8 Mio. EUR

Verbindlichkeiten:
- Kritische Lieferanten (gestundet): 3,2 Mio. EUR
- Zahlungsplan vereinbart: 100% der kritischen Lieferanten
- Einhaltungsquote Zahlungspläne: 100%

3. VERBINDLICHE ZUSAGEN (T+1 bis T+30)

Woche 1 (T+1 bis T+7):
☐ Wöchentliches Liquiditäts-Reporting jeden Montag 10:00 Uhr
☐ Proof of Payment für alle kritischen Zahlungen
☐ Start Hypercare-Phase für A-Kunden (Reklamationsvorbeugung)

Woche 2-3 (T+8 bis T+21):
☐ Closing Preparation United Pumps (SPA finalisieren)
☐ Materialfreigabe-Policy implementieren (DB > 25%)
☐ Monatliches Covenant-Reporting
☐ Closing United Pumps (Mittelzufluss 25 Mio. EUR)

Woche 4 (T+22 bis T+30):

☐ Tilgung Kontokorrent (10 Mio. EUR)
☐ Aufbau Cash-Reserve (5 Mio. EUR)
☐ Start reguläres Turnaround-Programm

4. COVENANT-STATUS

Eigenkapitalquote:
- Ist: 18,3%
- Soll: > 15%
- Status: ✓ ERFÜLLT

Debt/EBITDA:
- Ist: 4,2x
- Soll: < 5,0x
- Status: ✓ ERFÜLLT

Working Capital Ratio:
- Ist: 1,15
- Soll: > 1,0
- Status: ✓ ERFÜLLT

EBITDA-Marge:
- Ist: 6,1% (bereinigt)
- Soll: > 5%
- Status: ✓ ERFÜLLT

5. ANFRAGE KREDITLINIEN-ANPASSUNG

Basierend auf der positiven Entwicklung beantragen wir:

a) Wiederherstellung der ursprünglichen KK-Linie 
   - Nach Eingang United Pumps Kaufpreis
   - Besicherung durch verlängerten Eigentumsvorbehalt

b) Avalrahmen für Kundenprojekte (2 Mio. EUR)
   - Für Anzahlungsbürgschaften
   - Ermöglicht Auftragsannahme Großprojekte

c) Reduzierung Berichtspflichten
   - Von täglich auf wöchentlich nach T+30
   - Von wöchentlich auf monatlich nach T+90

6. ANLAGEN

- 13-Wochen-Liquiditätsplan (XLSX)
- Covenant-Berechnung Detail (PDF)
- Payroll-Proof of Payment (PDF)
- United Pumps LOI (PDF)
- Testat Wirtschaftsprüfer (PDF)

Wir bedanken uns ausdrücklich für Ihre konstruktive Begleitung in dieser herausfordernden Phase. Die enge Abstimmung und Ihr Vertrauen waren essentiell für die erfolgreiche Stabilisierung.

Für Rückfragen stehe ich Ihnen jederzeit zur Verfügung.

Mit freundlichen Grüßen
CEO CFO
Aurion Pumpen Systeme

Anlagen: wie aufgeführt`
  },

  'united_pumps_valuation_final.xlsx': {
    filename: 'united_pumps_valuation_final.xlsx',
    title: 'Unternehmensbewertung United Pumps of America',
    type: 'spreadsheet',
    content: `UNITED PUMPS OF AMERICA - FINAL VALUATION
Stand: Tag 14 | VERTRAULICH

EXECUTIVE SUMMARY
Unternehmenswert (Enterprise Value): 32,5 Mio. EUR
Abzgl. Nettofinanzverbindlichkeiten: -2,5 Mio. EUR
Equity Value: 30,0 Mio. EUR

1. GEWINN- UND VERLUSTRECHNUNG (in Mio. EUR)

                    2022A   2023A   2024E   2025P   2026P
Umsatzerlöse         45,2    42,8    44,0    46,2    48,5
Materialaufwand     -27,1   -26,1   -26,4   -27,2   -28,1
Bruttoertrag         18,1    16,7    17,6    19,0    20,4
Bruttoertrags-%      40,0%   39,0%   40,0%   41,1%   42,1%

Personalaufwand      -8,6    -8,3    -8,4    -8,5    -8,7
Sonstige OpEx        -4,5    -4,8    -4,4    -4,2    -4,1
EBITDA                5,0     3,6     4,8     6,3     7,6
EBITDA-Marge        11,1%    8,4%   10,9%   13,6%   15,7%

Abschreibungen       -2,1    -2,2    -2,2    -2,3    -2,3
EBIT                  2,9     1,4     2,6     4,0     5,3

2. BILANZ-KENNZAHLEN (in Mio. EUR)

                    2023A   2024E
Anlagevermögen       12,5    11,8
Working Capital       8,3     7,9
Sonstiges             1,2     1,0
INVESTED CAPITAL     22,0    20,7

Eigenkapital         14,5    15,2
Finanzschulden        7,5     5,5
FINANZIERUNG         22,0    20,7

3. DCF-BEWERTUNG

WACC-BERECHNUNG:
Risikofreier Zins: 2,5%
Marktprämie: 7,0%
Beta: 1,2
Eigenkapitalkosten: 10,9%
Fremdkapitalkosten: 4,5%
Tax Shield: 30%
WACC: 8,8%

FREE CASH FLOW PROGNOSE (in Mio. EUR):
                    2025P   2026P   2027P   2028P   2029P
EBIT                  4,0     5,3     5,8     6,1     6,3
- Steuern (30%)      -1,2    -1,6    -1,7    -1,8    -1,9
NOPAT                 2,8     3,7     4,1     4,3     4,4
+ Abschreibungen      2,3     2,3     2,4     2,4     2,5
- Investitionen      -2,5    -2,4    -2,4    -2,5    -2,5
- Δ Working Capital  -0,4    -0,5    -0,3    -0,2    -0,2
FREE CASH FLOW        2,2     3,1     3,8     4,0     4,2

Terminal Value (Gordon Growth, g=2%): 48,5 Mio. EUR
PV of FCF (2025-2029): 14,3 Mio. EUR
PV of Terminal Value: 18,2 Mio. EUR
ENTERPRISE VALUE: 32,5 Mio. EUR

4. MULTIPLE-BEWERTUNG

VERGLEICHBARE TRANSAKTIONEN:
Unternehmen          EV/EBITDA   EV/Sales
PumpCo USA (2023)      7,2x       0,75x
FlowTech Inc (2024)    6,8x       0,82x
Liquid Systems (2023)  7,5x       0,71x
DURCHSCHNITT          7,2x       0,76x

ANGEWENDET AUF UNITED PUMPS:
EBITDA 2024E: 4,8 Mio. EUR
x Multiple: 7,0x (Abschlag wg. Größe)
= EV: 33,6 Mio. EUR

Umsatz 2024E: 44,0 Mio. EUR
x Multiple: 0,73x
= EV: 32,1 Mio. EUR

5. BEWERTUNGSSYNTHESE

Methode               Gewicht    EV
DCF                    50%      32,5
EBITDA-Multiple        30%      33,6
Sales-Multiple         20%      32,1
GEWICHTETER EV               32,6 Mio. EUR

Abschlag Quick Sale: -5%
FINALER EV: 31,0 Mio. EUR
- Nettoschulden: 2,5 Mio. EUR
+ Excess Cash: 1,5 Mio. EUR
EQUITY VALUE: 30,0 Mio. EUR

6. SENSITIVITÄTSANALYSE

WACC / Terminal Growth:
         1,5%    2,0%    2,5%
8,3%    31,8    33,5    35,6
8,8%    29,8    31,0    32,5
9,3%    28,1    29,0    30,2

EBITDA-MULTIPLE:
6,5x: 28,7 Mio. EUR
7,0x: 31,0 Mio. EUR
7,5x: 33,3 Mio. EUR

7. DEAL STRUKTUR

Kaufpreis: 30,0 Mio. EUR
Zahlung bei Closing: 25,0 Mio. EUR (83%)
Escrow (12 Monate): 3,0 Mio. EUR (10%)
Earn-Out (2 Jahre): 2,0 Mio. EUR (7%)

Verwendung Kaufpreis:
- Tilgung Bankverbindlichkeiten: 10,0 Mio. EUR
- Liquiditätsreserve: 8,0 Mio. EUR
- Working Capital Normalisierung: 5,0 Mio. EUR
- Restrukturierungskosten: 2,0 Mio. EUR

FAZIT:
Der Verkaufspreis von 30 Mio. EUR entspricht dem fairen Marktwert. 
Der sofortige Cash-Zufluss von 25 Mio. EUR sichert die Liquidität von APS nachhaltig.`
  },

  'customer_advisory_board_charter.pdf': {
    filename: 'customer_advisory_board_charter.pdf',
    title: 'Kundenbeirat Charta - Governance & Prozesse',
    type: 'document',
    content: `KUNDENBEIRAT APS GMBH
CHARTA UND GESCHÄFTSORDNUNG
Stand: Tag 14
Status: ENTWURF zur Abstimmung

1. ZIELSETZUNG UND AUFGABEN

Der Kundenbeirat der APS GmbH dient als institutionalisiertes Forum für den strategischen Dialog zwischen Unternehmensführung und Schlüsselkunden. 

Hauptaufgaben:
- Feedback zu Produktqualität und Servicelevels
- Input zu Innovationsprioritäten und Produktentwicklung
- Frühwarnsystem für Marktveränderungen
- Vertrauensbildung durch Transparenz
- Co-Creation neuer Lösungsansätze

2. ZUSAMMENSETZUNG

Stimmberechtigte Mitglieder:
- 5 A-Kunden (>500k EUR Jahresumsatz)
- 2 strategische B-Kunden (Innovationspartner)
- CEO APS GmbH
- Head of Sales APS GmbH

Beratende Teilnehmer (ohne Stimmrecht):
- CFO APS GmbH (bei Bedarf)
- Head of Operations (bei Qualitätsthemen)
- Head of R&D (bei Innovationsthemen)
- Protokollführer

Rotationsprinzip:
- Amtszeit: 2 Jahre
- Jährliche Rotation von 50% der Kundenmitglieder
- Wiederwahl möglich

3. SITZUNGSRHYTHMUS UND ORGANISATION

Reguläre Sitzungen:
- Quartalsmeetings (Q1: März, Q2: Juni, Q3: September, Q4: Dezember)
- Dauer: 3-4 Stunden
- Location: Rotierend (APS HQ / Kundenlocation / Hybrid)

Außerordentliche Sitzungen:
- Bei kritischen Ereignissen
- Auf Antrag von mindestens 3 Mitgliedern
- Mindestens 72h Vorlauf

Agenda-Setting:
- Versand 14 Tage vor Sitzung
- Input-Deadline: 7 Tage vorher
- Pre-Reads: 3 Tage vorher

4. THEMENFELDER UND KOMPETENZEN

Kernthemen:
✓ Qualitäts-KPIs und Verbesserungsmaßnahmen
✓ Lieferperformance und Supply Chain
✓ Produkt-Roadmap und Innovation
✓ Service Level Agreements
✓ Preismodelle und Konditionenpolitik (generell, nicht kundenspezifisch)
✓ Nachhaltigkeit und ESG-Themen

Ausgeschlossene Themen:
✗ Individuelle Vertragsverhandlungen
✗ Wettbewerbssensible Informationen einzelner Kunden
✗ Personalpolitik (außer Service-relevant)
✗ M&A-Aktivitäten (bis zur Veröffentlichung)
✗ Rechtsstreitigkeiten

5. ENTSCHEIDUNGSFINDUNG

Konsultativ:
- Der Beirat gibt Empfehlungen
- Keine bindenden Beschlüsse
- CEO behält finale Entscheidungsgewalt

Abstimmungsmodus:
- Einfache Mehrheit für Empfehlungen
- Protokollierung von Minderheitenvoten
- Vetorecht bei Interessenskonflikten

Follow-Up:
- Schriftliche Stellungnahme der GF binnen 30 Tagen
- Umsetzungstracking in Folgesitzung
- Transparente Begründung bei Nicht-Umsetzung

6. VERTRAULICHKEIT UND COMPLIANCE

NDA-Regelung:
- Alle Mitglieder unterzeichnen Vertraulichkeitsvereinbarung
- Gültigkeit: Amtszeit + 3 Jahre
- Informationsweitergabe nur im "Need-to-know"-Prinzip

Kartellrechtliche Vorgaben:
- Keine Preisabsprachen
- Kein Austausch von Wettbewerbsinformationen
- Compliance-Briefing zu Beginn jeder Sitzung
- Anwaltliche Begleitung bei kritischen Themen

Interessenskonflikte:
- Offenlegungspflicht
- Enthaltung bei betroffenen Themen
- Dokumentation im Protokoll

7. RESSOURCEN UND BUDGET

Kostenübernahme durch APS:
- Reisekosten für Präsenzmeetings
- Catering und Tagungsräume
- Externe Moderation (bei Bedarf)
- Beraterhonorare für Spezialthemen

Aufwandsentschädigung:
- Aktuell: keine monetäre Vergütung
- Bevorzugter Support-Status
- Früher Zugang zu Innovationen
- Exklusive Executive Events

Budget p.a.: 40.000 EUR
- Davon 20k für reguläre Meetings
- 10k für Sonderthemen/Studien
- 10k für Events/Hospitality

8. ERFOLGSMESSUNG

KPIs für Beiratsarbeit:
- Teilnahmequote (Ziel: >80%)
- Umgesetzte Empfehlungen (Ziel: >50%)
- NPS der Beiratsmitglieder (Ziel: >50)
- Geschäftsentwicklung Beiratskunden (+10% p.a.)

Jährliche Evaluation:
- Selbstbewertung des Beirats
- 360°-Feedback
- Anpassung der Charta bei Bedarf

9. INKRAFTTRETEN UND ÄNDERUNGEN

Diese Charta tritt mit Zustimmung der Gründungsmitglieder in Kraft.

Änderungen bedürfen:
- 2/3-Mehrheit der Mitglieder
- Zustimmung der Geschäftsführung
- Schriftform

Kündigung:
- Ordentlich: 3 Monate zum Quartalsende
- Außerordentlich: bei groben Pflichtverletzungen

10. ANSPRECHPARTNER

Beiratskoordination:
[Name]
Head of Strategic Customer Management
Tel: [Nummer]
Email: advisory.board@aurion-ps.com

Rechtsabteilung:
[Name]
General Counsel
Tel: [Nummer]
Email: legal@aurion-ps.com`
  },

  'key_account_feedback_summary.msg': {
    filename: 'key_account_feedback_summary.msg',
    title: 'E-Mail: Feedback der Key Accounts zu Beirat',
    type: 'email',
    content: `Von: Schmidt, Thomas <t.schmidt@megacorp.de>
An: CEO APS <ceo@aurion-ps.com>
CC: Purchasing Board MegaCorp
Datum: Tag 14, 09:45 Uhr
Betreff: RE: Kundenbeirat - Unser Feedback und Commitment

Sehr geehrter Herr [CEO],

vielen Dank für die Einladung zur Teilnahme am neu strukturierten Kundenbeirat.

Nach interner Abstimmung kann ich Ihnen mitteilen:

POSITIVE ASPEKTE:
+ Quartalstreffen sind machbar und sinnvoll
+ Transparenz zu Qualitäts-KPIs sehr willkommen
+ Mitsprache bei Produktentwicklung längst überfällig
+ Rotationsprinzip verhindert "Verkrustung"

UNSERE ANFORDERUNGEN:
1. Echte Mitsprache, nicht nur "Feigenblatt"
   → Ihre Zusage zu 30-Tage-Feedback gibt Vertrauen

2. Professionelle Vor-/Nachbereitung
   → Pre-Reads sind essentiell für effiziente Meetings

3. C-Level Commitment von APS
   → CEO-Teilnahme ist Pflicht, nicht Kür

4. Messbare Outcomes
   → KPI-Tracking der Empfehlungen ist gut

VERBESSERUNGSVORSCHLÄGE:
- Digital-first: Hybride Meetings als Standard
- Innovationsbudget: Gemeinsame Pilotprojekte fördern
- Benchmark-Daten: Vergleich mit Best-in-Class
- Quick-Wins: Pro Quartal mind. 1 sofort umsetzbare Maßnahme

UNSER COMMITMENT:
Wir nominieren unseren CPO, Herrn Dr. Weber, als permanentes Mitglied. Stellvertretung durch Head of Quality Assurance.

Teilnahme Q1-Meeting: Zugesagt für KW12
Location-Angebot: Q2 können wir in unserem Innovation Center hosten

ERWARTUNGEN AN TAG 14-KOMMUNIKATION:
Bitte kommunizieren Sie:
- Klares Bekenntnis zum Beirat
- Erste Themen für Q1 (Qualitätsoffensive?)
- Direkte Ansprechpartner
- Quick-Win bis Q1 (z.B. Verbesserte Reklamationsprozesse)

Persönliche Note:
Die letzten 14 Tage waren für alle Beteiligten herausfordernd. Die Einrichtung des Beirats ist ein starkes Signal, dass Sie aus der Krise lernen. Wir honorieren das mit unserem Commitment.

Lassen Sie uns gemeinsam die Zukunft gestalten.

Mit besten Grüßen
Thomas Schmidt
Chief Procurement Officer
MegaCorp International

P.S.: Unser CEO lässt ausrichten, dass er die Entwicklung mit Interesse verfolgt. Bei nachhaltigem Turnaround sind weitere Projekte möglich.

---
MEGACORP INTERNATIONAL
"Excellence in Partnership"
Diese E-Mail ist vertraulich.`
  },

  'payroll_calculation_tag14.xlsx': {
    filename: 'payroll_calculation_tag14.xlsx',
    title: 'Payroll-Berechnung und Priorisierung',
    type: 'spreadsheet', 
    content: `PAYROLL-KALKULATION TAG 14
Status: FINAL zur Freigabe
Lohnlauf: Dezember 2024

ÜBERSICHT PAYROLL

Gesamtvolumen: 561.500 EUR
Mitarbeiter: 120


AUFSCHLÜSSELUNG NACH KATEGORIEN:

1. FÜHRUNGSKRÄFTE (Prio 2)
Anzahl: 10
Brutto gesamt: 98.500 EUR
Netto gesamt: 58.750 EUR
Durchschnitt: 5.750 EUR netto
Bemerkung: Hohe Signalwirkung, aber rechtlich gleich, Vorstandsebene gesondert

2. PRODUKTION (Prio 1)
Anzahl: 80  
Brutto gesamt: 330.500 EUR
Netto gesamt: 198.800 EUR
Durchschnitt: 2.475 EUR netto
Bemerkung: Kritisch für Betriebsfrieden & Produktion

3. VERWALTUNG (Prio 3)
Anzahl: 15
Brutto gesamt: 46.200 EUR
Netto gesamt: 27.730 EUR
Durchschnitt: 1.878 EUR netto
Bemerkung: Wichtig für Kontinuität

4. VERTRIEB (Prio 2) 
Anzahl: 10
Brutto gesamt: 77.675 EUR
Netto gesamt: 46.605 EUR
Durchschnitt: 4.660,5 EUR netto
Bemerkung: Kundenkontakt, Provisionen kritisch

5. AUSZUBILDENDE (Prio 1)
Anzahl: 5
Brutto gesamt: 6.375 EUR
Netto gesamt: 3.825 EUR
Durchschnitt: 765 EUR netto
Bemerkung: Soziale Verantwortung, Imageschaden bei Verzug

6. MINIJOBBER/WERKSTUDENTEN (Prio 4)
Anzahl: 3 (nicht in Belegschaftszahl)
Brutto gesamt: 2.250 EUR
Netto gesamt: 1.350 EUR
Durchschnitt: 450 EUR netto
Bemerkung: Flexibel, aber faire Behandlung wichtig

ABGABEN UND STEUERN:


NETTO-AUSZAHLUNG: 337.060 EUR

SZENARIO-ANALYSE:

A) VOLLSTÄNDIGE ZAHLUNG (100%)
Auszahlung: 561.500 EUR
Cash-Impact: -561.500 EUR
Risiko: Keines
Benefit: Volle Motivation, keine Unruhe

B) 80% ZAHLUNG (GESTAFFELT)
Sofort: 449.200 EUR
In 48h: 112.300 EUR
Cash-Impact Tag 14: -449.200 EUR
Risiko: Mittel (Unruhe, Gerüchte)
Benefit: Liquiditätspuffer 112k für 2 Tage

C) PRIORISIERTE ZAHLUNG
Prio 1 (Produktion/Azubis): 336.875 EUR
Rest später: 224.625 EUR
Risiko: Hoch (Ungleichbehandlung, rechtlich fragwürdig)
Benefit: Kernbelegschaft beruhigt

D) VERSCHIEBUNG KOMPLETT
Auszahlung: 0 EUR
Cash-Impact: 0 EUR
Risiko: SEHR HOCH
- Arbeitsverweigerung wahrscheinlich
- Kündigungswelle
- Imageschaden irreparabel
- Evt. Insolvenzantragspflicht

FINANZIERUNGSOPTIONEN:

1. Kontokorrent ausschöpfen


2. Lieferantenzahlungen verschieben
Möglich: 200.000 EUR
Risiko: Lieferstopp
Opportunitätskosten: Skonto-Verlust 4.000 EUR

3. Forderungsverkauf (Factoring)
Verfügbare Forderungen: 650.000 EUR
Abschlag: 3%
Sofort verfügbar: 630.500 EUR

4. Bank-Überbrückung (Sonderkonditionen)
Angebot liegt vor: 500.000 EUR
Zinssatz: 5% p.a. 
Laufzeit: 3 Monate
Gesamtkosten: 7.200 EUR

EMPFEHLUNG FINANZABTEILUNG:

Variante A mit Finanzierungsoption 4
- Vollständige Payroll-Zahlung
- Überbrückungskredit nutzen
- Signal an alle Stakeholder
- Kosten vertretbar (7.200 EUR)

ZAHLUNGSLAUF-DETAILS:

Bankverbindungen geprüft: ✓
SEPA-Datei erstellt: ✓
Freigabe Personalabteilung: ✓
Freigabe CFO: AUSSTEHEND
Freigabe CEO: AUSSTEHEND

Ausführung bei Freigabe bis 14:00 Uhr:
→ Gutschrift Mitarbeiter: Tag 15, 00:01 Uhr

COMPLIANCE-HINWEISE:

§ 614 BGB: Vergütung ist zum Monatsende fällig
Tarifvertrag: Zahlung spätestens am letzten Arbeitstag
Betriebsvereinbarung: Keine Abweichung ohne BR-Zustimmung
Insolvenzrecht: Lohnrückstand > 2 Monate = Insolvenzgrund

Diese Kalkulation ist vertraulich und nur für die Geschäftsleitung bestimmt.`
  },

  'bank_bridge_finance_offer.pdf': {
    filename: 'bank_bridge_finance_offer.pdf',
    title: 'Angebot Überbrückungsfinanzierung der Hausbank',
    type: 'document',
    content: `SPARKASSE MÜNCHEN
Abteilung Firmenkundenbetreuung / Intensive Care

Datum: Tag 14
An: CFO APS GmbH
Betreff: Angebot Überbrückungsfinanzierung - EILIG

Sehr geehrte Damen und Herren,

bezugnehmend auf unser Telefonat von heute Morgen unterbreiten wir Ihnen folgendes Angebot für eine kurzfristige Überbrückungsfinanzierung:

RAHMENBEDINGUNGEN:

Kreditart: Betriebsmittelkredit (Sonderkondition)
Kredithöhe: bis zu 600.000 EUR
Laufzeit: 3 Monate (Verlängerung nach Prüfung möglich)
Verfügbarkeit: Sofort nach Unterzeichnung

KONDITIONEN:

Zinssatz: 5,00% p.a. (deutlich unter Marktniveau)
Bereitstellungsprovision: keine
Bearbeitungsgebühr: 500 EUR einmalig
Tilgung: endfällig oder bei Eingang Verkaufserlös United Pumps

VERWENDUNGSZWECK:

Ausschließlich für:
1. Payroll-Zahlungen (Priorität)
2. Kritische Lieferantenverbindlichkeiten
3. Betriebsnotwendige Ausgaben

Nicht zulässig für:
- Investitionen
- Schuldentilgung bei anderen Banken
- Ausschüttungen

SICHERHEITEN:

Aufgrund der aktuellen Situation und unserer langjährigen Partnerschaft:
- Verlängerter Eigentumsvorbehalt auf Warenlager
- Persönliche Bürgschaft der Gesellschafter (nachrangig)
- Abtretung Verkaufserlös United Pumps (vorrangig)

AUFLAGEN (COVENANTS):

Financial Covenants:
- Eigenkapitalquote > 15%
- Working Capital Ratio > 1,0
- Keine weiteren Finanzverbindlichkeiten ohne Zustimmung

Information Covenants:
- Wöchentliches Liquiditäts-Reporting
- Monatliche GuV
- Sofortige Info bei wesentlichen Ereignissen

Operational Covenants:
- Proof of Payment für Payroll
- Verwendungsnachweis binnen 7 Tagen
- Fortschrittsbericht United Pumps-Verkauf

BEDINGUNGEN FÜR AUSZAHLUNG:

☐ Unterzeichneter Kreditvertrag
☐ Aktueller Jahresabschluss (liegt vor)
☐ 13-Wochen-Liquiditätsplan (liegt vor)
☐ Bestätigung United Pumps LOI
☐ Beschluss der Gesellschafter

BESONDERE VEREINBARUNGEN:

Vorzeitige Rückführung:
- Jederzeit ohne Vorfälligkeitsentschädigung
- Bei Eingang United Pumps: automatische Tilgung 50%

Step-Down bei positiver Entwicklung:
- Nach 1 Monat: Review der Konditionen
- Bei Zielerreichung: Zinssatz -0,5%

Wandlungsoption:
- Nach United Pumps-Closing: Umwandlung in reguläre Kreditlinie möglich
- Kondition dann: Standard-Kontokorrent

BANKSTATEMENT:

Diese Überbrückungsfinanzierung ist Ausdruck unseres Vertrauens in die eingeleiteten Stabilisierungsmaßnahmen. Wir sehen dies als Investition in eine langfristige Partnerschaft.

Die Sonderkonditionen gelten vorbehaltlich:
- Positiver Geschäftsentwicklung
- Einhaltung aller Covenants  
- Erfolgreicher United Pumps-Transaktion

BEFRISTUNG DES ANGEBOTS:

Dieses Angebot ist gültig bis Tag 14, 16:00 Uhr.
Bei Annahme: Auszahlung innerhalb von 2 Stunden.

IHRE ANSPRECHPARTNER:

Kreditentscheidung:
Dr. Michael Förster
Bereichsleiter Firmenkunden
Tel: 089-XXXX-XXXX
Mobil: 0172-XXXX-XXXX

Operative Abwicklung:
Sandra Weber  
Senior Relationship Manager
Tel: 089-XXXX-XXXX
Email: weber@sparkasse-muenchen.de

NÄCHSTE SCHRITTE:

1. Telefonische Zusage bis 16:00 Uhr
2. Digitale Unterzeichnung via DocuSign
3. Auszahlung auf Geschäftskonto
4. Verwendungsnachweis binnen 7 Tagen

Wir sind überzeugt, dass diese Überbrückung den erfolgreichen Turnaround unterstützt und freuen uns auf die weitere Zusammenarbeit.

Mit freundlichen Grüßen

Dr. Michael Förster          Sandra Weber
Bereichsleiter Firmenkunden   Senior Relationship Manager

Anlagen:
- Kreditvertrag (Entwurf)
- Covenant-Definitionen
- Reporting-Templates`
  },

  '13w_bridge_final.xlsx': {
    filename: '13w_bridge_final.xlsx',
    title: '13-Wochen-Liquiditätsplan Final',
    type: 'spreadsheet',
    content: `13-WOCHEN-LIQUIDITÄTSBRÜCKE
Stand: Tag 15E | FINAL VERSION
Alle Angaben in TEUR

WOCHE 1 (Tag 15-21)

Anfangsbestand: 1.300

EINGÄNGE:
Forderungen Inland: 850
Forderungen Ausland: 620
Anzahlungen: 45
Sonstige: 15
SUMME EINGÄNGE: 1.530

AUSGÄNGE:
Personalkosten: -560
Material kritisch: -420
Material unkritisch: 0 (gestundet)
Energie/Miete: -125
Versicherungen: -45
Sonstige Fixkosten: -85
Finanzierungskosten: -12
SUMME AUSGÄNGE: -1.237

Endbestand Woche 1: 1.593

[Fortsetzung für alle 13 Wochen mit Details...]

WOCHE 4 - KRITISCHES EREIGNIS
Tag 14
Eingang United Pumps 

SENSITIVITÄTSANALYSE:

BEST CASE (+20% Eingänge):
Woche 13: 8.453 TEUR
Min. Liquidität: 982 TEUR (Woche 2)
Finanzierungsbedarf: 0 EUR

REALISTIC CASE (Basis):
Woche 13: 5.234 TEUR  
Min. Liquidität: 423 TEUR (Woche 2)
Finanzierungsbedarf: 0 EUR

WORST CASE (-20% Eingänge):
Woche 13: 1.232 TEUR
Min. Liquidität: -234 TEUR (Woche 2)
Finanzierungsbedarf: 500 TEUR

MASSNAHMEN ZUR LIQUIDITÄTSSICHERUNG:

Kurzfristig (Woche 1-2):
□ Factoring intensivieren (+400 TEUR)
□ Skonto-Verzicht (+50 TEUR)
□ Lagerabbau (+200 TEUR)

Mittelfristig (Woche 3-6):
□ United Pumps Closing beschleunigen
□ Working Capital Optimierung (+800 TEUR)
□ Sale-Leaseback Maschinen (+300 TEUR)

Langfristig (Woche 7-13):
□ Investoreneinstieg (+5.500 TEUR)
□ Kapitalerhöhung Gesellschafter (+1.000 TEUR)
□ Asset Sales Non-Core (+500 TEUR)`
  },

  'material_release_policy.pdf': {
    filename: 'material_release_policy.pdf',
    title: 'Materialfreigabe-Policy für Carve-Out Phase',
    type: 'document',
    content: `MATERIALFREIGABE-RICHTLINIE
Gültig ab: Tag 14
Version: 2.0 FINAL
Freigabe: CEO/CFO/OPS

1. GRUNDSÄTZE

Diese Policy regelt die Materialfreigaben während der Carve-Out-Phase (Verkauf United Pumps) und der parallelen Restrukturierung. Ziel ist die optimale Balance zwischen Liquiditätsschonung und Lieferfähigkeit.

Geltungsbereich:
- Alle Produktionsstandorte
- Alle Materialarten (Roh-, Hilfs-, Betriebsstoffe)
- Alle Auftragsarten (Bestands-, Kunden-, Ersatzteilaufträge)

2. FREIGABEKRITERIEN

AUTOMATISCHE FREIGABE bei:
✓ Deckungsbeitrag I > 25% UND
✓ Kundenkategorie A oder B UND
✓ Materialverfügbarkeit > 80% UND
✓ Zahlungsziel < 30 Tage

EINZELFALLPRÜFUNG bei:
- DB I zwischen 20-25% ODER
- Kundenkategorie C mit Strategierelevanz ODER
- Teilweise Materialverfügbarkeit (50-80%) ODER
- Sonderkonditionen erforderlich

KEINE FREIGABE bei:
✗ DB I < 20% (außer vertragliche Verpflichtung)
✗ Kunde in Zahlungsverzug > 60 Tage
✗ Materialwert > 100k ohne Vorstandsfreigabe
✗ Keine Anzahlung bei Neukunden

3. DECKUNGSBEITRAGSRECHNUNG

DB I = (Verkaufspreis - Materialeinzelkosten) / Verkaufspreis × 100

Einzubeziehen:
- Listenpreis abzgl. aller Rabatte
- Direkte Materialkosten (inkl. Verschnitt)
- Verpackungskosten
- Ausgangsfrachten (bei Lieferung frei Haus)

Nicht einbeziehen:
- Personalkosten
- Maschinenkosten
- Gemeinkosten

Beispielrechnung:
Verkaufspreis: 10.000 EUR
Materialkosten: 7.000 EUR
DB I = 3.000 EUR = 30% ✓ FREIGABE

4. KUNDENKATEGORISIERUNG

A-KUNDEN (automatische Priorität):
- Jahresumsatz > 500k EUR
- Strategische Partnerschaft
- Zahlungsmoral AAA
- Liste: siehe Anhang A (15 Kunden)

B-KUNDEN (Standard-Priorität):
- Jahresumsatz 100-500k EUR
- Zahlungsmoral AA oder besser
- Liste: siehe Anhang B (45 Kunden)

C-KUNDEN (Einzelfallprüfung):
- Jahresumsatz < 100k EUR
- Neukunden ohne Historie
- Zahlungsmoral B oder schlechter

5. FREIGABEPROZESS

STUFE 1: Automatische Systemprüfung
- SAP prüft DB-Schwellen
- Kundenbonitätsprüfung
- Materialverfügbarkeit

STUFE 2: Manuelle Prüfung (bei Bedarf)
< 50k: Produktionsleiter
50-100k: Head of Operations
> 100k: CFO/CEO

STUFE 3: Dokumentation
- Freigabenummer
- Entscheidungsgrund
- Verantwortlicher

6. TAGESLIMITS

Montag-Freitag:
- Linie 1: max. 50k EUR Material/Tag
- Linie 2: max. 50k EUR Material/Tag
- Linie 3: max. 30k EUR Material/Tag
- Gesamt: max. 130k EUR/Tag

Wochenende/Sonderschichten:
- Nur mit Vorstandsgenehmigung
- Max. 50% der Wochentagslimits

7. AUSNAHMEREGELN

SOFORTFREIGABE unabhängig von DB bei:
1. Drohender Konventionalstrafe > 50k
2. Gefahr Produktionsstopp Kunde
3. Sicherheitsrelevante Teile
4. Behördliche Auflagen

Genehmigung durch:
- CEO oder CFO
- Dokumentation zwingend
- Nachträgliche DB-Analyse

8. MONITORING & REPORTING

Tägliches Reporting (bis 16:00 Uhr):
- Freigegebene Aufträge
- Materialverbrauch in EUR
- DB-Durchschnitt
- Abweichungen von Policy

Wöchentliches Management-Review:
- DB-Entwicklung
- Kundenmix
- Liquiditätsimpact
- Policy-Anpassungsbedarf

9. ESKALATION

Bei Verstößen:
1. Warnung: Schriftliche Ermahnung
2. Warnung: Freigabeentzug 1 Woche
3. Warnung: Arbeitsrechtliche Konsequenzen

Bei Kundenreklamationen:
- Sofort-Eskalation an OPS-Leitung
- Sonderfreigabe möglich
- Root-Cause-Analyse binnen 24h

10. GÜLTIGKEIT

Start: Tag 14, 00:00 Uhr
Ende: Mit Closing United Pumps ODER Tag 60
Review: Wöchentlich

Diese Richtlinie ersetzt alle vorherigen Regelungen.

_________________     _________________
CFO                   Head of Operations

Anlagen:
- Kundenliste A/B/C
- DB-Berechnungstool
- Eskalationsmatrix`
  },

  'townhall_agenda_script.docx': {
    filename: 'townhall_agenda_script.docx',
    title: 'Townhall Agenda und Sprechzettel',
    type: 'document',
    content: `TOWNHALL TAG 14
"GEMEINSAM IN DIE ZUKUNFT"

Datum: Tag 14, 15:00 Uhr
Ort: Kantine / Live-Stream
Dauer: 60 Minuten
Moderation: CEO / HR-Leitung

AGENDA

15:00-15:05 | BEGRÜSSUNG (CEO)

"Liebe Kolleginnen und Kollegen,

14 Tage intensivster Arbeit liegen hinter uns. 14 Tage, in denen wir gemeinsam Außergewöhnliches geleistet haben. Heute möchte ich Ihnen danken und den Blick nach vorne richten.

Wir haben bewiesen: APS ist krisenfest. APS ist ein Team. APS hat Zukunft."

15:05-15:15 | RÜCKBLICK: WAS WIR ERREICHT HABEN

Liquidität:
"Zahlungsfähigkeit gesichert ✓
Alle Löhne pünktlich ✓
Keine Lieferantenkündigungen ✓"

Qualität:
"Defektrate halbiert: 8,3% → 4,8% ✓
Liefertreue: 94% ✓
Keine A-Kunden verloren ✓"

Team:
"287 Arbeitsplätze gesichert ✓
Keine Entlassungen ✓
Zusammenhalt gestärkt ✓"

15:15-15:25 | UNITED PUMPS: FAKTEN STATT GERÜCHTE

Die Entscheidung:
"Nach reiflicher Überlegung: Verkauf ist richtige Entscheidung.
- Pumps erhält spezialisierten Eigentümer
- Alle Arbeitsplätze bleiben erhalten (§613a)
- 30 Mio. EUR für unsere Zukunftsinvestitionen"

Was bedeutet das für Sie?
"- Kerngeschäft wird gestärkt
- Investitionen in Ihre Arbeitsplätze
- Keine Kündigungen im Kerngeschäft"

15:25-15:35 | DER WEG NACH VORNE: KONKRETE SCHRITTE

Woche 1-2:
"- Hypercare für A-Kunden
- Stabilisierung Produktion
- Quick Wins umsetzen"

Monat 1:
"- United Pumps Closing
- Liquidität nachhaltig sichern
- Prozessoptimierungen"

Quartal 1/2025:
"- Innovationsoffensive
- Neue Produkte
- Wachstum"

15:35-15:50 | Q&A: IHRE FRAGEN

Moderation: HR-Leitung

Erwartete Fragen:

F: "Wird es doch noch Entlassungen geben?"
A: "Nein. Wir haben eine klare Zusage: Keine betriebsbedingten Kündigungen im Kerngeschäft. United Pumps-Mitarbeiter werden 1:1 übernommen."

F: "Was ist mit unserem Weihnachtsgeld?"
A: "Wird planmäßig mit November-Gehalt ausgezahlt. Keine Kürzungen."

F: "Kommt ein Investor?"
A: "Wir führen Gespräche, aber nur wenn es uns strategisch weiterbringt. Kein Verkauf unter Wert, keine feindliche Übernahme."

F: "Wie sicher sind die 30 Mio. für United Pumps?"
A: "LOI ist unterschrieben, Due Diligence läuft, Closing in 3 Wochen. Käufer ist solvent und seriös."

F: "Was passiert mit den Kollegen von United Pumps?"
A: "Betriebsübergang nach §613a. Alle Rechte bleiben erhalten. Keine Verschlechterung der Arbeitsbedingungen."

15:50-15:55 | PERSÖNLICHE WORTE (CEO)

"Ich möchte persönlich werden:

Die letzten 14 Tage waren die härtesten meiner Karriere. Aber auch die beeindruckendsten.

Sie haben nicht aufgegeben.
Sie haben angepackt.
Sie haben an APS geglaubt.

Dafür danke ich Ihnen von Herzen.

Ja, es war ein Kraftakt. Ja, es gibt noch viel zu tun. Aber wir haben das Fundament gelegt.

Mein Versprechen an Sie:
- Transparente Kommunikation
- Keine Alleingänge
- Gemeinsame Zukunftsgestaltung

15:55-16:00 | ABSCHLUSS UND AUSBLICK

Nächste Termine:
- Montag: Bereichsmeetings
- Mittwoch: Kundenbeirat
- Freitag: Erste Erfolge

Symbolischer Akt:
"Die Krisenuhr in der Produktion wird heute abgehängt. Die Krise ist vorbei. Der Aufbau beginnt."

Schlusswort:
"14 Tage Krise. 
120 HeldInnen.
1 Team.
Unendliche Möglichkeiten.

Gemeinsam in die Zukunft!"

[Applaus]

NACHBEREITUNG:
- Video-Aufzeichnung ins Intranet
- Protokoll der Q&A
- Feedback-Box aufstellen
- Führungskräfte-Debriefing

KOMMUNIKATIONSKASKADE:
16:00 - Führungskräfte-Call
17:00 - Pressemitteilung
18:00 - Kundenmailing
Morgen - Follow-up Teams`
  },

  'spa_united_pumps_final.pdf': {
    filename: 'spa_united_pumps_final.pdf',
    title: 'Share Purchase Agreement - Finale Version',
    type: 'document',
    content: `SHARE PURCHASE AGREEMENT

zwischen

APS GmbH
[Adresse]
- "Verkäufer" -

und

Industrial Partners LLC  
[Adresse]
- "Käufer" -

betreffend

100% der Geschäftsanteile an
United Pumps of America, Inc.
- "Gesellschaft" oder "Target" -

PRÄAMBEL

Der Verkäufer hält sämtliche Anteile an United Pumps of America, Inc., einer Gesellschaft nach dem Recht von Delaware, USA. Der Käufer beabsichtigt, diese Anteile zu erwerben. Die Parteien vereinbaren:

§ 1 KAUFGEGENSTAND

1.1 Der Verkäufer verkauft 100% der Anteile (10.000 Shares, nominal value $1 each) an der Gesellschaft.

1.2 Die Anteile sind frei von Rechten Dritter.

§ 2 KAUFPREIS

2.1 Der Kaufpreis beträgt EUR 30.000.000 (dreißig Millionen Euro).

2.2 Zahlung:
- Closing: EUR 25.000.000
- Escrow: EUR 3.000.000 (12 Monate, 2% p.a.)
- Earn-Out: EUR 2.000.000 (Bedingung: EBITDA 2025 oder 2026 > EUR 5 Mio.)

§ 3 GARANTIEN DES VERKÄUFERS

3.1 Unternehmensrechtliche Garantien:
- Ordnungsgemäße Gründung und Bestand
- Inhaberschaft der Anteile
- Keine Belastungen

3.2 Finanzielle Garantien:
- Jahresabschlüsse entsprechen HGB/US-GAAP
- Keine verdeckten Verbindlichkeiten
- Working Capital mindestens EUR 8 Mio.

3.3 Operative Garantien:
- Wesentliche Verträge gültig und durchsetzbar
- Keine wesentlichen Rechtsstreitigkeiten
- IP-Rechte unbelastet

§ 4 HAFTUNG

4.1 Haftungsgrenzen:
- General Cap: 30% (EUR 9 Mio.)
- Fundamental Warranties: 100%
- De Minimis: EUR 25.000
- Basket: EUR 250.000

4.2 Verjährung:
- General: 18 Monate
- Fundamental: 5 Jahre
- Steuer: gesetzlich

§ 5 BETRIEBSÜBERGANG

5.1 Sämtliche Arbeitsverhältnisse gehen auf Käufer über (analog § 613a BGB).

5.2 Keine betriebsbedingten Kündigungen für 24 Monate.

§ 6 VOLLZUGSBEDINGUNGEN

6.1 Käufer:
- Keine MAC (Material Adverse Change)
- Kartellfreigabe
- Zustimmung Hausbank Verkäufer

6.2 Verkäufer:
- Proof of Funds
- Gesellschafterbeschluss

§ 7 WETTBEWERBSVERBOT

7.1 Der Verkäufer verpflichtet sich für 3 Jahre, nicht im Bereich Pumpentechnologie für Öl & Gas in Nordamerika tätig zu werden.

7.2 Vertragsstrafe: EUR 500.000 pro Verstoß.

§ 8 SCHLUSSBESTIMMUNGEN

8.1 Deutsches Recht, Schiedsgericht DIS Frankfurt.

8.2 Änderungen bedürfen der Schriftform.

_____________________     _____________________
Verkäufer                  Käufer
Ort, Datum                 Ort, Datum

ANLAGEN:
- Disclosure Letter
- Escrow Agreement  
- Liste Arbeitnehmer
- Wesentliche Verträge`
  },

  'conflict_charter_draft.pdf': {
    filename: 'conflict_charter_draft.pdf',
    title: 'Konflikt-Charta für nachhaltigen Betriebsfrieden',
    type: 'document',
    content: `KONFLIKT-CHARTA APS GMBH
"Gemeinsam Lösungen finden"

Gültig ab: Tag 15
Version: 1.0

PRÄAMBEL

Die vergangenen 14 Tage haben gezeigt: Unter Druck entstehen Spannungen. Diese Charta soll helfen, Konflikte konstruktiv zu lösen und den Betriebsfrieden nachhaltig zu sichern.

1. GRUNDPRINZIPIEN

RESPEKT: Jede Meinung zählt
TRANSPARENZ: Probleme offen ansprechen
LÖSUNGSFOKUS: Nicht Schuld, sondern Lösung suchen
FAIRNESS: Alle Seiten anhören
VERBINDLICHKEIT: Vereinbarungen einhalten

2. KONFLIKTARTEN UND ZUSTÄNDIGKEITEN

EBENE 1: Teammitglieder untereinander
→ Erst direkte Klärung
→ Bei Bedarf: Teamleiter
→ Lösung binnen 24h

EBENE 2: Zwischen Abteilungen (z.B. CFO ↔ OPS)
→ Abteilungsleiter-Gespräch
→ Bei Bedarf: Bereichsleiter
→ Lösung binnen 48h

EBENE 3: Führungskraft ↔ Mitarbeiter
→ HR als neutraler Vermittler
→ Bei Bedarf: Betriebsrat
→ Lösung binnen 72h

EBENE 4: Strategische Konflikte
→ Geschäftsführung
→ Bei Bedarf: externe Mediation
→ Lösung binnen 1 Woche

3. DER LÖSUNGSPROZESS

SCHRITT 1: ANSPRECHEN
"Ich habe ein Problem mit..."
- Zeitnah (max. 48h nach Vorfall)
- Sachlich
- Unter 4 Augen

SCHRITT 2: ANHÖREN
"Ich verstehe, dass..."
- Ausreden lassen
- Nachfragen
- Perspektive wechseln

SCHRITT 3: ANALYSIEREN
"Die Kernpunkte sind..."
- Fakten von Emotionen trennen
- Gemeinsame Interessen finden
- Win-Win suchen

SCHRITT 4: VEREINBAREN
"Wir einigen uns auf..."
- Konkrete Maßnahmen
- Messbare Ziele
- Timeline

SCHRITT 5: KONTROLLIEREN
"Funktioniert die Lösung?"
- Follow-up nach 1 Woche
- Bei Bedarf nachsteuern
- Erfolge würdigen

4. SPIELREGELN FÜR MEETINGS

VOR dem Meeting:
□ Agenda mit Konfliktpunkten
□ Alle Beteiligten einladen
□ Neutrale Moderation klären

IM Meeting:
□ Handys aus
□ Ausreden lassen
□ "Ich-Botschaften"
□ Keine Schuldzuweisungen
□ Lösungsfokus

NACH dem Meeting:
□ Protokoll an alle
□ Aufgaben verteilen
□ Nächsten Termin fixieren

5. SPANNUNGSFELD CFO ↔ OPS (SPEZIAL)

Erfahrung zeigt: Hier liegt Konfliktpotenzial

TYPISCHE KONFLIKTE:
- Budget vs. Qualität
- Kosten vs. Liefertermine
- Kontrolle vs. Flexibilität

VEREINBARTE REGELN:
1. Wöchentlicher Jour Fixe (Montag 10:00)
2. Gemeinsame KPIs definiert
3. Eskalation nur gemeinsam an CEO
4. Quartalsmäßige Strategieabstimmung

6. KOMMUNIKATIONSREGELN

DOS:
✓ "Ich sehe das so..."
✓ "Können wir gemeinsam..."
✓ "Was wäre wenn..."
✓ "Lass uns eine Lösung finden..."

DON'TS:
✗ "Du hast schon wieder..."
✗ "Ihr macht immer..."
✗ "Das war schon immer so..."
✗ "Daran bist du schuld..."

7. UNTERSTÜTZUNGSANGEBOTE

Intern:
- HR-Sprechstunde: täglich 14-15 Uhr
- Betriebsrat: nach Vereinbarung
- Vertrauensperson: [Name]

Extern:
- Mediationspool: 3 zertifizierte Mediatoren
- Konflikthotline: [Nummer]
- Coaching-Budget: 10k/Jahr

8. ERFOLGSMESSUNG

Monatliche Pulse-Checks:
- Betriebsklima-Index
- Konflikt-Häufigkeit
- Lösungsgeschwindigkeit
- Zufriedenheit mit Lösungen

Jährliche Evaluation:
- Mitarbeiterbefragung
- Anpassung der Charta
- Best Practice Sharing

9. VERBINDLICHKEIT

Diese Charta ist verbindlich für alle Mitarbeiter.

Unterschrift = Selbstverpflichtung

_____________________
Mitarbeiter/in

"Konflikte sind Chancen zur Verbesserung - wenn wir sie richtig angehen!"`
    },
'stakeholder_cascade_timeline.pptx': {
 filename: 'stakeholder_cascade_timeline.pptx',
 title: 'Stakeholder-Kaskade Timeline - Koordinierte Kommunikation',
 type: 'presentation',
 content: `STAKEHOLDER-KASKADE POST FINAL VIEW
Zeitraum: T+1 bis T+30
Ziel: Koordinierte, konsistente Information aller Stakeholder-Gruppen

ERFOLGS-KPIs:
- Message Consistency Score: >90%
- Stakeholder Satisfaction: >75% 
- Media Tonality: >60% neutral/positiv
- Zero Contradictions zwischen Kanälen

T+1 (Tag 15) - KICK-OFF:
09:00 | TOWNHALL "Gemeinsam in die Zukunft"
- Alle Mitarbeiter
- Live-Stream + Q&A
- Key Message: "Krise überwunden, Aufbau beginnt"
- Sprecher: CEO

11:00 | TOP-3-KUNDEN Individual Calls
- Message: "Hypercare aktiv, Liefersicherheit 100%"
- Sprecher: CEO + Head of Sales

14:00 | BANK FINAL UPDATE
- CFO Call mit Kreditabteilung
- Proof of Payments übermitteln
- Message: "Alle Commitments erfüllt"

16:00 | PRESSEMITTEILUNG
- "APS stabilisiert - United Pumps Verkauf eingeleitet"
- Lokale und Fachmedien
- Fokus: Arbeitsplätze sicher`
},

'thank_you_note_bank_draft.docx': {
 filename: 'thank_you_note_bank_draft.docx',
 title: 'Dankeschreiben an Hausbank - Entwurf',
 type: 'document',
 content: `PERSÖNLICHES DANKSCHREIBEN

Datum: Tag 14
Bernd Schuster  Dr. Iris Gerlach
Vereinigte Kreditbank

Lieber Herr Schuster, liebe Frau Dr. Gerlach,

14 Tage, die unsere Partnerschaft für immer geprägt haben.

Als wir am Tag 1 mit der Hiobsbotschaft zu Ihnen kamen, hätte niemand gedacht, dass wir heute hier stehen würden: Mit erfüllten Covenants, gesicherter Liquidität und einem klaren Plan für die Zukunft.

Das war nur möglich, weil Sie nicht nur Bankpartner waren, sondern echte Partner. In den dunkelsten Stunden haben Sie nicht die Reißleine gezogen, sondern die Hand gereicht.

Besonders hervorheben möchte ich:

- Die Überbrückungsfinanzierung zu Sonderkonditionen
 → Ohne diese wäre die Payroll in Gefahr gewesen

- Das tägliche Liquiditäts-Monitoring ohne Panik
 → Ihre Professionalität gab uns Ruhe zum Arbeiten

- Die pragmatische Herangehensweise bei den Covenants
 → Spielraum für operative Exzellenz statt Mikromanagement

- Das Vertrauen in unseren United Pumps-Plan
 → 30 Mio. EUR Zufluss werden unsere Bilanz transformieren

Mit tiefem Dank und herzlichen Grüßen

[CEO Unterschrift]
[Name], Geschäftsführer
APS `
},

'investor_due_diligence_report.pdf': {
 filename: 'investor_due_diligence_report.pdf',
 title: 'Investor Due Diligence Report - Industrial Growth Partners',
 type: 'document',
 content: `INVESTOR DUE DILIGENCE REPORT

Stand: Tag 14 | STRENG VERTRAULICH

EXECUTIVE SUMMARY:
Investor bietet 5,5 Mio. EUR für 22,5% Anteil an APS GmbH.
Post-Money-Bewertung: 24,4 Mio. EUR
Investoren-Typ: Aktiv, industriefokussiert, Turnaround-Erfahrung

1. INVESTOR-PROFIL

Unternehmensname: Industrial Growth Partners LLC
Gegründet: 2018
Domizil: Frankfurt am Main
AUM: 340 Mio. EUR
Portfolio: 12 Beteiligungen

TEAM:
Managing Partner: John Blight, PhD (ex-McKinsey, 15J Turnaround)
Investment Director: Sarah Chen (ex-Goldman Sachs, 8J PE)
Operating Partner: Frank Bender-Bühl (ex-Siemens, 20J Industrie)

TRACK RECORD:
- MaschinenbauCorp (2019-2022): 3,2x MOIC, erfolgreicher Exit
- TechComponents AG (2020-laufend): +180% EBITDA-Wachstum
- LogisticSolutions (2021-2023): Restrukturierung + Verkauf, 2,8x MOIC

2. INVESTMENT THESIS

"APS hat bewährte Industrietechnologie, loyale Kunden und erfahrenes Management. 
Die temporäre Liquiditätskrise überdeckt fundamentale Stärken. 
Mit Kapital und strategischer Unterstützung ist schnelle Profitabilitätssteigerung möglich."

EMPFEHLUNG: BEDINGTE ANNAHME

Das IGP-Angebot ist fair und strategisch sinnvoll, ABER Nachverhandlung bei:

1. Verwässerung reduzieren auf 20% 
  }
}(5,0 Mio. für 20%)
2. Zustimmungsschwellen erhöhen (> 1 Mio. statt 500k)
3. Ratchet-Klausel bei Überperformance
4. Co-Sale-Recht für Altgesellschafter beim Exit`
},

'equity_dilution_scenario.xlsx': {
 filename: 'equity_dilution_scenario.xlsx',
 title: 'Verwässerungsszenarien Eigenkapital',
 type: 'spreadsheet',
 content: `EQUITY DILUTION SCENARIOS
Stand: Tag 14

AUSGANGSLAGE (PRE-MONEY):
Gesellschafter               Anteile    Wert (EUR)
Gründerfamilie Klein-Berger  60,0%      12.000.000
Gründerfamilie Pustet        25,0%       5.000.000  
Management Beteiligung       15,0%       3.000.000
GESAMT PRE-MONEY            100,0%      20.000.000

SZENARIO 1: IGP-ANGEBOT UNVERÄNDERT
Investment: 5,5 Mio. EUR für 22,5%
Post-Money-Bewertung: 24,44 Mio. EUR

                              Vor Investment    Nach Investment
Gründerfamilie Klein-Berger   60,0% (12,0M)    46,5% (11,37M)
Gründerfamilie Pustet           25,0% (5,0M)     19,4% (4,73M)
Management                     15,0% (3,0M)     11,6% (2,84M)
IGP                            0,0%             22,5% (5,50M)
GESAMT                         100,0%           100,0% (24,44M)

Verwässerung: -22,5% für alle Altgesellschafter

SZENARIO 2: NACHVERHANDELT (20% für 5,0 Mio.)
Investment: 5,0 Mio. EUR für 20%
Post-Money-Bewertung: 25,0 Mio. EUR

                        Vor Investment    Nach Investment
Gründerfamilie Klein-Berger   60,0% (12,0M)    48,0% (12,0M)
Gründerfamilie Pustet     25,0% (5,0M)     20,0% (5,0M)
Management               15,0% (3,0M)     12,0% (3,0M)
IGP                      0,0%             20,0% (5,0M)
GESAMT                   100,0%           100,0% (25,0M)

Verwässerung: -20% für alle Altgesellschafter
Vorteil: +440k EUR höhere Bewertung

EMPFEHLUNG:
Szenario 2 (20% für 5,0 Mio.) + Ratchet-Klausel
= Beste Balance zwischen Kapital und Verwässerung`
},

'betriebsrat_stellungnahme_investor.msg': {
 filename: 'betriebsrat_stellungnahme_investor.msg',
 title: 'E-Mail Stellungnahme Betriebsrat zu Investoreneinstieg',
 type: 'email',
 content: `Von: Betriebsrat APS <betriebsrat@aurion-ps.com>
An: CEO APS <ceo@aurion-ps.com>
CC: Belegschaftsvertreter
Datum: Tag 14, 11:30 Uhr
Betreff: Stellungnahme zu geplantem Investoreneinstieg IGP

Sehr geehrte Geschäftsführung,

der Betriebsrat hat in seiner außerordentlichen Sitzung vom Tag 13 den geplanten Einstieg von Industrial Growth Partners intensiv beraten. Hiermit unsere offizielle Stellungnahme:

GRUNDSÄTZLICHE HALTUNG:
Nach den turbulenten 14 Tagen begrüßen wir grundsätzlich jeden Schritt, der die langfristige Stabilität des Unternehmens und damit unserer Arbeitsplätze sichert.

POSITIVE ASPEKTE:
✓ Keine geplanten Personalreduzierungen laut IGP-Präsentation
✓ Investitionen in Digitalisierung schaffen zukunftsfähige Arbeitsplätze  
✓ Erfahrung des Investors mit Turnaround-Situationen
✓ Mittelfristige Wachstumsstrategie statt kurzfristige Sanierung

KRITISCHE PUNKTE:
⚠ Ziel "12% EBITDA-Marge bis 2026" bedeutet erheblichen Kostendruck
⚠ "Effizienzsteigerungen" oft euphemistisch für Personalabbau
⚠ Internationale Expansion könnte Arbeitsplätze ins Ausland verlagern
⚠ Exit-Orientierung in 5-7 Jahren schafft Unsicherheit

UNSERE BEDINGUNGEN für eine positive Stellungnahme:

1. ARBEITSPLATZGARANTIE:
- Schriftliche Zusicherung: Keine betriebsbedingten Kündigungen für 36 Monate
- Bei Effizienzsteigerungen: Retraining statt Abbau
- Frühzeitige Einbindung des BR bei allen Umstrukturierungen

FAZIT:
Der Betriebsrat kann dem IGP-Einstieg unter den genannten Bedingungen zustimmen. Ohne diese Zusicherungen müssten wir von unserem Widerspruchsrecht Gebrauch machen.

Mit freundlichen Grüßen

Hans-Peter Zimmermann
Betriebsratsvorsitzender`
},

'hr_payroll_priority_list.msg': {
 filename: 'hr_payroll_priority_list.msg',
 title: 'E-Mail HR - Payroll Prioritäten und Risikobewertung',
 type: 'email',
 content: `Von: HR-Leitung <hr@aps-gmbh.de>
An: CFO <cfo@aps-gmbh.de>
CC: CEO <ceo@aps-gmbh.de>
Datum: Tag 14, 08:15 Uhr
Betreff: URGENT - Payroll-Priorisierung und Risikoanalyse

Lieber CFO,

zur Entscheidungsunterstützung für die heutige Payroll-Freigabe unsere Einschätzung zu den Risiken:

RECHTLICHE SITUATION:
§ 614 BGB: Lohn ist zum Monatsende fällig
Verzug ab Tag 15: Verzugszinsen + mögliche Schadenersatzansprüche
Ab 2 Monaten Rückstand: Kündigungsrecht der Arbeitnehmer

PRIORITÄTEN-MATRIX nach HR-Sicht:

PRIO 1 - NICHT VERSCHIEBBAR (267k EUR):
- Produktion (165 MA): 267.800 EUR netto
 Risiko bei Nicht-Zahlung: Sofortige Arbeitsniederlegung
 Betriebsrat hat "wilde Streiks" angedroht

- Auszubildende (12 MA): 9.180 EUR netto  
 Risiko: Imageschaden, IHK-Meldung, strafrechtlich relevant

RISIKO-ASSESSMENT bei Teilzahlung:

80%-Szenario (461k sofort, 115k in 48h):
- Rechtlich fragwürdig (Gleichbehandlungsgrundsatz)
- Unruhe und Gerüchte garantiert
- Vertrauensverlust bei 20% der Belegschaft

Komplette Verschiebung:
- 90% Wahrscheinlichkeit für "wilde Streiks" ab Tag 15
- Medialer Skandal ("APS zahlt keine Löhne")
- Totalausfall Produktion für mindestens 3 Tage

EMPFEHLUNG HR-ABTEILUNG:
Vollständige Zahlung um jeden Preis. 
Die 576k EUR sind weniger als der Schaden durch einen Tag Produktionsausfall.

Stehe für Rückfragen jederzeit zur Verfügung.

Mit freundlichen Grüßen
Sabine Hoffmann
Leitung Personal`
},

'sensitivity_analysis_memo.pdf': {
 filename: 'sensitivity_analysis_memo.pdf',
 title: 'Sensitivitätsanalyse 13-Wochen-Liquiditätsbrücke',
 type: 'document',
 content: `SENSITIVITÄTSANALYSE 13-WOCHEN-LIQUIDITÄTSPLANUNG
Stand: Tag 14 | CFO-Memo

ZUSAMMENFASSUNG:
Die 13-Wochen-Brücke zeigt unter realistischen Annahmen eine gesicherte Liquidität. 


SZENARIO-MODELLIERUNG:

1. BEST CASE (+20% Eingänge / -10% Ausgaben)
Liquiditätsverlauf:
Start: 1.200 TEUR
Minimum: Woche 2: 987 TEUR
Woche 4 (United Pumps): 28.234 TEUR
Ende (Woche 13): 12.678 TEUR
Bewertung: GRÜN - Keine Finanzierungslücke

2. REALISTIC CASE (Basis-Szenario)  
Liquiditätsverlauf:
Start: 1.200 TEUR
Minimum: Woche 2: 423 TEUR ← KRITISCH
Woche 4 (United Pumps): 25.789 TEUR  
Ende (Woche 13): 8.234 TEUR
Bewertung: GELB - Eng, aber machbar

3. STRESS CASE (-20% Eingänge / +15% Ausgaben)
Liquiditätsverlauf:
Start: 1.200 TEUR
Minimum: Woche 2: -234 TEUR ← FINANZIERUNGSBEDARF
Woche 4 (United Pumps): 23.456 TEUR
Ende (Woche 13): 5.123 TEUR
Bewertung: ROT - 500k Überbrückung nötig

KRITISCHE VARIABLEN:

1. FORDERUNGSEINGÄNGE (+/-10% = +/-1.200 TEUR Impact)
2. UNITED PUMPS TIMING (+/- 1 Woche = +/-400 TEUR Impact)  
3. MATERIALAUSGABEN (+/-15% = +/-630 TEUR Impact)

EMPFEHLUNG:
Das Realistic Case ist das wahrscheinlichste Szenario (70% Confidence). 
Die 500k-Überbrückung von der Bank gibt ausreichend Sicherheit auch bei Stress Case.`
},

'covenant_compliance_calculation.xlsx': {
 filename: 'covenant_compliance_calculation.xlsx',
 title: 'Covenant Compliance Berechnung',
 type: 'spreadsheet',
 content: `COVENANT COMPLIANCE CALCULATION
Stand: Tag 14 - FINAL

ÜBERBLICK COVENANTS:
Quelle: Kreditvertrag VKB vom 15.03.2024
Prüfungsturnus: Quartalsweise / bei wesentlichen Ereignissen
Status: ALLE ERFÜLLT ✓

1. EIGENKAPITALQUOTE (EKQ)
Definition: Eigenkapital / Bilanzsumme × 100
Minimum: 15,0%
Current: 18,3%
Status: ✓ ERFÜLLT (+3,3pp Puffer)

Berechnung (TEUR):
Eigenkapital (bilanziert):     4.275
+ Gesellschafter-Darlehn:        850  [nachrangig]
+ Jahresüberschuss (Plan):       125  [Q4-Estimate]
= Bereinigtes Eigenkapital:    5.250

Bilanzsumme:                  28.700
Eigenkapitalquote:             18,3%

2. DEBT-TO-EBITDA RATIO
Definition: Finanzverbindlichkeiten / EBITDA (LTM)
Maximum: 5,0x
Current: 4,2x
Status: ✓ ERFÜLLT (0,8x Puffer)

3. WORKING CAPITAL RATIO
Definition: Umlaufvermögen / kurzfristige Verbindlichkeiten  
Minimum: 1,0x
Current: 1,15x
Status: ✓ ERFÜLLT (0,15x Puffer)

4. EBITDA-MARGE
Definition: EBITDA / Umsatz × 100
Minimum: 5,0%
Current: 6,1% (bereinigt)
Status: ✓ ERFÜLLT (+1,1pp Puffer)

AUSWIRKUNG UNITED PUMPS VERKAUF:
Pro Forma nach Closing:
1. Eigenkapitalquote: 24,8% ✓✓
2. Debt/EBITDA: 1,1x ✓✓

RISIKO-ASSESSMENT: Niedrig (Wahrscheinlichkeit < 10%)`
},

'supplier_equal_treatment_protocol.pdf': {
 filename: 'supplier_equal_treatment_protocol.pdf',
 title: 'Gleichbehandlungsprotokoll Lieferanten',
 type: 'document',
 content: `GLEICHBEHANDLUNGSPROTOKOLL LIEFERANTEN
APS GmbH | Stand: Tag 14 | Version: FINAL

RECHTSGRUNDLAGE:
§ 138 BGB (Sittenwidrigkeit)
§ 826 BGB (Vorsätzliche sittenwidrige Schädigung)
InsO § 19 (Insolvenzanfechtung)

1. GRUNDSÄTZE DER GLEICHBEHANDLUNG

UNIVERSALITÄT: Alle Lieferanten werden nach einheitlichen Kriterien behandelt
TRANSPARENZ: Behandlungsregeln sind dokumentiert und nachvollziehbar
OBJEKTIVITÄT: Persönliche Beziehungen haben keinen Einfluss auf Zahlungen
VERHÄLTNISMÄSSIGKEIT: Maßnahmen stehen im Einklang mit wirtschaftlicher Situation

2. KATEGORISIERUNG LIEFERANTEN

KATEGORIE A - KRITISCH (18 Lieferanten):
Definition: Lieferanten ohne Ersatz, Produktionsstopp bei Ausfall
Beispiele: Hauptrohstoff-Lieferanten, Energie, IT-Services
Behandlung: Bevorzugte Zahlung im Rahmen der Liquidität

KATEGORIE B - WICHTIG (45 Lieferanten):  
Definition: Wichtige Zulieferer, Ersatz möglich aber aufwendig
Behandlung: Normale Reihenfolge nach Fälligkeit

KATEGORIE C - STANDARD (187 Lieferanten):
Definition: Standard-Zulieferer mit verfügbaren Alternativen  
Behandlung: Zahlungen nach Verfügbarkeit von Liquidität

3. ZAHLUNGSREIHENFOLGE-MATRIX

PRIORITÄT 1 (Sofortige Zahlung):
✓ Löhne und Gehälter (287 Mitarbeiter)
✓ Sozialversicherung und Steuern  
✓ Kategorie A Lieferanten (kritisch)
✓ Vertragsstrafen-Vermeidung

PRIORITÄT 2 (Binnen 14 Tagen):
✓ Kategorie B Lieferanten
✓ Überfällige Rechnungen > 60 Tage
✓ Lieferanten mit Eigentumsvorbehalt

GLEICHBEHANDLUNGS-NACHWEIS:
KEINE BEVORZUGUNG von:
✗ Gesellschafter-nahen Unternehmen
✗ Familienmitgliedern von Geschäftsführung
✗ Privaten Freundschaften

OBJEKTIVE KRITERIEN:
✓ Kritikalität für Produktion
✓ Rechtliche Konsequenzen bei Nichtzahlung
✓ Verfügbarkeit alternativer Lieferanten`
},

'whistleblower_prevention_note.docx': {
 filename: 'whistleblower_prevention_note.docx',
 title: 'Whistleblower-Prävention - Sensible Bereiche',
 type: 'document',
 content: `WHISTLEBLOWER-PRÄVENTION
APS GmbH | Tag 14 | VERTRAULICH

AUSGANGSLAGE:
In Krisensituationen steigt das Risiko von Whistleblowing durch:
- Unzufriedene Mitarbeiter
- Geschädigte Lieferanten  
- Konkurrenten
- Investigative Medien

1. IDENTIFIZIERTE RISIKOBEREICHE

FINANZIELLE UNREGELMÄSSIGKEITEN:
⚠ Bevorzugung einzelner Lieferanten ohne sachlichen Grund
⚠ Persönliche Geschäfte der Geschäftsführung mit Firmengeldern
⚠ "Verschwundene" Bestände oder Vermögenswerte
⚠ Unplausible Bewertungen oder Buchungen

PERSONALRECHTLICHE VERSTÖSSE:
⚠ Diskriminierung bei Gehaltskürzungen/Entlassungen
⚠ Umgehung des Betriebsrats bei Mitbestimmungsthemen
⚠ Missachtung von Arbeitsschutzbestimmungen unter Kostendruck

2. KONKRETE GEFÄHRDUNGSLAGEN BEI APS

HOHE WAHRSCHEINLICHKEIT:
1. Lieferanten-Behandlung: MetallWerke AG vs. andere
  → Nachweisbar objektive Kriterien etabliert ✓
  
2. Payroll-Entscheidungen: Vollständig vs. Teilweise
  → Gleichbehandlung aller Mitarbeiter ✓
  
3. United Pumps Verkauf: Bewertung/Prozess transparent?
  → Externe Gutachten zur Absicherung ✓

3. PRÄVENTIVE MASSNAHMEN

EXTERNE KOMMUNIKATION kontrollieren:
✓ Einheitliche Sprachregelungen für alle Mitarbeiter
✓ Nur autorisierte Sprecher (CEO, CFO, HR)
✓ Social Media Guidelines verschärft

INTERNE TRANSPARENZ erhöhen:
✓ Regelmäßige Updates zur wirtschaftlichen Lage
✓ Offene Kommunikation zu schwierigen Entscheidungen
✓ Betriebsrat frühzeitig einbinden

Diese Notiz ist STRENG VERTRAULICH und nur für Geschäftsführung bestimmt.`
},

'waiver_sideletter_draft.pdf': {
 filename: 'waiver_sideletter_draft.pdf',
 title: 'Waiver & Sideletter Entwurf - Kreditlinie',
 type: 'document',
 content: `WAIVER AND SIDELETTER AGREEMENT

zwischen

VKB
- "Bank" -

und  

APS GMBH
- "Kreditnehmer" -

Datum: Tag 14
Betreff: Übergangsregelungen Kreditfazilität

1. WAIVER (VERZICHTSERKLÄRUNG)

1.1 Die Bank verzichtet hiermit unwiderruflich auf die Geltendmachung folgender Covenant-Verletzungen für den Zeitraum Tag 1 bis Tag 14:

a) Unterschreitung der Mindest-Eigenkapitalquote von 15%:
  Tag 3: 13,2% (Verletzung: -1,8pp)
  Tag 7: 14,1% (Verletzung: -0,9pp)

b) Überschreitung des maximalen Debt/EBITDA-Verhältnisses von 5,0x:
  Tag 2: 5,8x (Verletzung: +0,8x)
  Tag 5: 5,3x (Verletzung: +0,3x)

2. SIDELETTER VEREINBARUNGEN

2.1 REPORTING MODIFIKATIONEN (T+1 bis T+30):
- Tägliche Liquiditätsmeldung (10:00 Uhr)
- Wöchentliche Covenant-Berechnung (montags)
- Verwendungsnachweis für alle Auszahlungen > EUR 50.000

2.2 ZUSÄTZLICHE SICHERHEITEN (temporär):
a) Erweiterte Sicherungsübereignung:
  - Warenlager zu 90% (statt bisher 80%)
  - Maschinen und Anlagen zu 70% (statt 60%)

b) Abtretung Verkaufserlös United Pumps:
  EUR 10.000.000 fließen in 14 Tagen an Bank zur Kredittilgung

3. KONDITIONENVERBESSERUNG

Als Anerkennung für die konstruktive Zusammenarbeit:
- Zinssatzreduktion um 0,25% ab T+15 (von 8,5% auf 8,25%)
- Wegfall der Überziehungsprovision für T+1 bis T+30

LAUFZEIT: Diese Vereinbarung läuft automatisch aus mit Closing United Pumps oder spätestens am 31.03.2025.`
},

'credit_facility_amendment.pdf': {
 filename: 'credit_facility_amendment.pdf',
 title: 'Nachtrag zum Kreditfazilitäten-Vertrag',
 type: 'document',
 content: `NACHTRAG ZUM KREDITVERTRAG
Änderung der Rahmenkreditvereinbarung

Vertragsnummer: KK-4455-2024
Ursprungsvertrag: 15.03.2024
Nachtrag Nr.: 001
Datum: Tag 14

ANLASS:
Temporäre Anpassungen aufgrund Stabilisierungsphase und United Pumps-Verkauf

ÄNDERUNGEN:

1. KREDITLINIE-ANPASSUNG
Bisherige Kreditlinie: EUR 8.000.000
Neue temporäre Erhöhung: EUR 500.000 
Gesamtlinie: EUR 8.500.000 (bis United Pumps Closing)

2. ZINSKONDITIONEN
Standard-Zinssatz: 8,50% p.a.
Sonderkondition (T+1 bis T+30): 8,25% p.a.
Bei Zielerreichung (T+31): 8,00% p.a.

3. COVENANTS - TEMPORÄRE ANPASSUNG
Standard Eigenkapitalquote: ≥ 15%
Temporär (bis T+30): ≥ 12%
Nach United Pumps: ≥ 18% (durch Mittelzufluss)

4. VERWENDUNGSBESCHRÄNKUNGEN
Nicht gestattet ohne Bankzustimmung:
✗ Investitionen > EUR 100.000
✗ Ausschüttungen an Gesellschafter  
✗ Aufnahme weiterer Kredite

5. SICHERHEITEN-ERWEITIERUNG
+ Abtretung United Pumps Kaufpreis (EUR 25 Mio.)
+ Erweiterte Warenlager-Verpfändung (90% statt 80%)
+ Patronatserklärung Hauptgesellschafter (EUR 2 Mio.)

6. POSITIVE INCENTIVES
Meilenstein 1 (T+30): Alle Covenants erfüllt → Zinssatz -0,25%
Meilenstein 2 (T+60): United Pumps geschlossen → Kreditlinie +4 Mio. möglich
Meilenstein 3 (T+90): 3 Monate störungsfreie GF → Standard-Reporting

Dieser Nachtrag tritt mit Unterzeichnung in Kraft.`
},

'pof_payment_advices_tag14.zip': {
 filename: 'pof_payment_advices_tag14.zip',
 title: 'Proof of Funds und Payment Advices - Sammelpaket',
 type: 'archive',
 content: `INHALT DES ZIP-ARCHIVS:

1. PROOF_OF_FUNDS_TAG14.PDF:
KONTOAUSZUG 
Geschäftskonto: DE89 xxx 0000 1234 5678 90
Datum: Tag 14, 17:45 Uhr

Tagesanfangssaldo:           524.567,89 EUR
EINGÄNGE:
14:23 | Kunde MegaCorp       345.000,00 EUR
15:12 | Factoring           127.500,00 EUR
16:01 | Sonstige             23.450,00 EUR

AUSGÄNGE:  
14:45 | PAYROLL-SAMMEL      576.482,00 EUR
15:30 | MetallWerke AG       89.000,00 EUR
16:15 | Stadtwerke           45.200,00 EUR

Tagesschlusssaldo:           397.485,89 EUR

VERFÜGBARE LIQUIDITÄT:
Kontostand:                  397.485,89 EUR
Kreditlinie frei:            234.567,00 EUR
GESAMT VERFÜGBAR:            632.052,89 EUR

2. PAYMENT_ADVICE_PAYROLL.PDF:
ZAHLUNGSANWEISUNG - PAYROLL TAG 14
Gesamtsumme: 576.482,00 EUR
Anzahl Empfänger: 287
Status: AUSGEFÜHRT ✓

3. PAYMENT_ADVICE_METALLWERKE.PDF:
ZAHLUNGSANWEISUNG - KRITISCHER LIEFERANT
Empfänger: MetallWerke AG
Betrag: 89.000,00 EUR
Begründung Priority-Zahlung:
- Kategorie A Lieferant (produktionskritisch)
- Drohender Lieferstopp bei Verzug
- Kein alternativer Lieferant verfügbar

4. BANK_CONFIRMATION_LETTER.PDF:
Bestätigung ordnungsgemäße Zahlungsabwicklung durch Sparkasse München`
},

'bank_account_statement.pdf': {
 filename: 'bank_account_statement.pdf',
 title: 'Kontoauszug Geschäftskonto Tag 14',
 type: 'document',
 content: `SPARKASSE MÜNCHEN
Kontoauszug Nr. 345/2024
Geschäftskonto: DE89 7015 0000 1234 5678 90
Kontoinhaber: APS GmbH
Auszugsdatum: Tag 14

KONTOBEWEGUNGEN TAG 14:

ANFANGSSALDO:                524.567,89 EUR

EINGÄNGE:
14:23 | Überweisung MegaCorp International    345.000,00 EUR
       "Zahlung RE-2024-1156"
15:12 | Factoring-Gutschrift                  127.500,00 EUR
       "Forderungsverkauf Batch-7"  
16:01 | Versicherungserstattung               23.450,00 EUR
       "Gutschrift Betriebsunterbrechung"

AUSGÄNGE:
14:45 | Sammelüberweisung Payroll            -576.482,00 EUR
       "Lohn+Gehalt Dezember 287 MA"
15:30 | Überweisung MetallWerke AG            -89.000,00 EUR
       "Kritische Materialzahlung"
16:15 | Lastschrift Stadtwerke München        -45.200,00 EUR
       "Energie Dezember"
16:45 | Diverse Kleinzahlungen                -12.350,00 EUR

SCHLUSSSALDO:                397.485,89 EUR

KREDITLINIE:
Eingeräumt:                8.500.000,00 EUR
In Anspruch genommen:      8.265.433,00 EUR
Verfügbar:                   234.567,00 EUR

ZINSEN UND GEBÜHREN:
Sollzinsen (täglich):              635,42 EUR
Kontoführungsgebühr:                12,50 EUR
Überweisungsgebühren:               48,75 EUR

Nächster Auszug: Tag 15 (automatisch)`
},

'critical_supplier_payment_list.xlsx': {
 filename: 'critical_supplier_payment_list.xlsx',
 title: 'Kritische Lieferanten Zahlungsmatrix',
 type: 'spreadsheet',
 content: `KRITISCHE LIEFERANTEN - ZAHLUNGSMATRIX TAG 14

Lieferant              Kategorie  Offene Posten  Gezahlt Tag14  Status       Begründung
MetallWerke AG         A          156.000 EUR    89.000 EUR     ✓ BEZAHLT    Produktionskritisch
Stadtwerke             A           45.200 EUR    45.200 EUR     ✓ BEZAHLT    Betriebsnotwendig
TechSolutions IT       A           23.400 EUR         0 EUR     GESTUNDET    3 Tage Aufschub
ChemieProdukts GmbH    A           67.800 EUR    15.000 EUR     TEILZAHLUNG  Rest bis Tag 17
TransportLogis AG      B           12.300 EUR         0 EUR     30 TAGE ZIEL Normal

ZUSAMMENFASSUNG:
Kategorie A (18 Lieferanten): 434.200 EUR offen → 149.200 EUR bezahlt (34%)
Kategorie B (45 Lieferanten): 267.800 EUR offen → 23.400 EUR bezahlt (9%) 
Kategorie C (187 Lieferanten): 123.900 EUR offen → 0 EUR bezahlt (0%)

ZAHLUNGSGRUND-DOKUMENTATION:
- Produktionskritische Lieferanten bevorzugt
- Vermeidung von Lieferausfällen  
- Gleichbehandlung innerhalb der Kategorien
- Objektive Kriterien angewendet

NÄCHSTE ZAHLUNGEN GEPLANT:
Tag 15: TechSolutions IT (23.400 EUR)
Tag 17: ChemieProdukts Rest (52.800 EUR)  
Tag 20: Kategorie B Sammelzahlung (150.000 EUR)`
  },
  'a_customer_delivery_commitment_v2.pdf': {
 filename: 'a_customer_delivery_commitment.pdf',
 title: 'A-Kunden Lieferverpflichtung - Verbindliche Zusagen',
 type: 'document',
 content: `A-KUNDEN LIEFERCOMMITMENT
Verbindliche Zusicherungen Tag 14
Status: FINAL - Freigegeben durch CEO/OPS

GRUNDSATZ:
APS GmbH verpflichtet sich zu höchsten Service-Standards für A-Kunden während und nach der Stabilisierungsphase.

A-KUNDEN DEFINITION:
- Jahresumsatz > 500.000 EUR
- Strategische Bedeutung für APS
- Langfristige Partnerschaft (> 3 Jahre)
- AAA-Bonität

AKTUELLE A-KUNDEN (15):
1. MegaCorp International - 2,3 Mio. EUR Umsatz
2. IndustrieGigant AG - 1,8 Mio. EUR Umsatz
3. TechPartner Solutions - 1,4 Mio. EUR Umsatz
4. GlobalMachinery Ltd - 1,1 Mio. EUR Umsatz
5. PrecisionTools GmbH - 0,9 Mio. EUR Umsatz

VERBINDLICHE ZUSAGEN:

1. LIEFERPERFORMANCE
✓ Liefertreue: 98% (vs. 94% Standard)
✓ Durchlaufzeit: -20% gegenüber regulären Aufträgen
✓ Expressbearbeitung bei Eilaufträgen (24h-Service)
✓ Prioritäts-Materialfreigabe auch bei knappen Beständen

2. QUALITÄTSNIVEAU  
✓ Null-Fehler-Toleranz bei Erstlieferungen
✓ Doppelte Qualitätsprüfung vor Versand
✓ Separate QS-Linie für A-Kunden-Aufträge
✓ Vollständige Rückverfolgbarkeit aller Chargen

3. KOMMUNIKATION & SERVICE
✓ Dedicated Account Manager (Direktdurchstelle)
✓ Wöchentliche Proaktiv-Updates zu laufenden Aufträgen
✓ 24/7-Hotline für kritische Anfragen (72h-Service)
✓ Quartalsweise Business Review Meetings

4. HYPERCARE-PHASE (72 STUNDEN)
Sondermaßnahmen Tag 14-17:
□ Daily Check-Calls mit allen 15 A-Kunden
□ Proaktive Status-Updates zu allen offenen Aufträgen  
□ Onsite-Bereitschaftsteam (2 Techniker)
□ 24/7-Hotline mit Durchstelle zu OPS-Leitung

VERTRAGSSTRAFEN bei Nicht-Erfüllung:
Lieferverzögerung ohne Ankündigung:
- 1-3 Tage: 0,5% des Auftragswertes
- 4-7 Tage: 1,0% des Auftragswertes
- >7 Tage: 2,0% + Schadenersatz

Diese Commitments sind rechtlich bindend und werden in alle A-Kunden-Verträge übernommen.`
},

'express_logistics_quotation.msg': {
 filename: 'express_logistics_quotation.msg',
 title: 'E-Mail Express-Logistik Angebot',
 type: 'email',
 content: `Von: ExpressLog GmbH <angebot@expresslog.de>
An: OPS APS <ops@aurion-ps.com>
CC: Vertrieb ExpressLog
Datum: Tag 14, 13:20 Uhr
Betreff: EXPRESS-ANGEBOT: 72h-Hypercare A-Kunden APS

Sehr geehrter Head of Operations,

vielen Dank für Ihre kurzfristige Anfrage zur logistischen Unterstützung Ihrer A-Kunden während der Hypercare-Phase.

ANGEBOT EXPRESS-SERVICES (Tag 14-17):

1. SAME-DAY DELIVERY (innerhalb Deutschland):
- Abholung bis 14:00 Uhr → Zustellung bis 20:00 Uhr
- Preis: 89 EUR pro Sendung bis 30 kg
- Preis: 149 EUR pro Sendung 31-100 kg  
- Tracking: Real-Time GPS + SMS-Updates

2. OVERNIGHT EXPRESS (Deutschland/EU):
- Abholung bis 18:00 Uhr → Zustellung bis 10:00 Uhr Folgetag
- Deutschland: 45 EUR pro Sendung bis 30 kg
- EU-Länder: 85 EUR pro Sendung bis 30 kg
- Zustellgarantie: 99,2%

3. EMERGENCY HOTLINE:
- 24/7-Erreichbarkeit unter 0800-EXPRESS-1
- Spontane Abholdienste innerhalb 2 Stunden
- Notfall-Aufschlag: +50% auf Standardpreise

4. ONSITE-SERVICE (bei Ihren Kunden):
- Techniker-Begleitung bei kritischen Lieferungen
- Installation/Inbetriebnahme-Support  
- Kosten: 180 EUR/Tag pro Techniker + Spesen
- Verfügbar: 2 Techniker für 72h-Phase

SONDERKONDITIONEN FÜR APS:
✓ 15% Rabatt auf alle Express-Services (72h-Phase)
✓ Keine Setup-Gebühren oder Mindestmengen
✓ Kostenlose Verpackungsmaterialien
✓ Dedicated Account Manager

KALKULATIONSBEISPIEL für Ihre 15 A-Kunden:
Annahme: 2 Express-Sendungen pro Kunde in 72h = 30 Sendungen

20x Same-Day (89 EUR): 1.780 EUR
10x Overnight (45 EUR): 450 EUR
Subtotal: 2.230 EUR
Abzgl. 15% Rabatt: -335 EUR
NETTO-KOSTEN: 1.895 EUR

GESAMTBUDGET 72h-HYPERCARE: ca. 3.000 EUR

Bei Fortsetzung nach Hypercare-Phase:
→ 10% Dauermehrwert auf alle Standard-Services
→ Bevorzugte Behandlung bei Kapazitätsengpässen

NÄCHSTE SCHRITTE:
1. Zusage bis heute 16:00 Uhr für Start Tag 15
2. Setup Tracking-Portal mit APS-Login
3. Kick-Off Call mit Account Manager

Mit freundlichen Grüßen
Marcus Weber
Vertriebsleiter Key Accounts
ExpressLog GmbH`
},

'customer_priority_matrix.xlsx': {
 filename: 'customer_priority_matrix.xlsx',
 title: 'Kunden-Prioritätsmatrix und Behandlungsregeln',
 type: 'spreadsheet',
 content: `KUNDEN-PRIORITÄTSMATRIX APS GMBH
Stand: Tag 14 - Operative Steuerung

KATEGORIE A - PREMIUM (15 Kunden)
Kriterien: Umsatz >500k EUR + Strategische Bedeutung + AAA Bonität

Kunde                    Umsatz 2024   Marge   Behandlung
A                       2.300k EUR    18%     PREMIUM+
B                        1.800k EUR    22%     PREMIUM+  
C                         1.400k EUR    15%     PREMIUM+
D                         1.100k EUR    20%     PREMIUM
E                         900k EUR    25%     PREMIUM

A-KUNDEN GESAMT: 14.100k EUR (58% des Gesamtumsatzes)

KATEGORIE B - STANDARD+ (32 Kunden)  
Kriterien: Umsatz 100-500k EUR + Gute Bonität + Wachstumspotential
B-KUNDEN GESAMT: 7.800k EUR (32% des Gesamtumsatzes)

KATEGORIE C - STANDARD (156 Kunden)
C-KUNDEN GESAMT: 2.400k EUR (10% des Gesamtumsatzes)

BEHANDLUNGSREGELN:

A-KUNDEN (PREMIUM):
✓ Lieferpriorität: 1 (höchste)
✓ Qualitätsprüfung: Doppelt (2 Prüfer)
✓ Durchlaufzeit: -20% vs Standard
✓ Express-Service: Kostenlos bis 2x/Quartal
✓ Account Manager: Dedicated Senior AM
✓ Hypercare: 24/7 Hotline (72h-Phase)
✓ Materialfreigabe: Auch bei DB <25% (Einzelfall)
✓ Zahlungsziel: 45 Tage (vs 30 Standard)

PREMIUM+ (Top-3):
Zusätzlich zu PREMIUM:
✓ CEO-Kontakt: Quartalsweise persönlich
✓ Innovations-Preview: Neue Produkte zuerst
✓ Supply Chain: Dedizierte Materialreserve  
✓ Notfall-Produktion: Sonderservice

B-KUNDEN (STANDARD+):
✓ Lieferpriorität: 2
✓ Express-Service: Gegen Aufpreis (+15%)
✓ Account Manager: Shared (1 AM für 8-12 Kunden)
✓ Zahlungsziel: 30 Tage

C-KUNDEN (STANDARD):
✓ Lieferpriorität: 3 (nach A/B-Kunden)
✓ Express-Service: Gegen vollen Aufpreis (+25%)
✓ Account Manager: Shared (1 AM für 15-20 Kunden)

OPERATIVE UMSETZUNG:
- A-Kunden-Aufträge: Grüne Markierung im SAP
- A-Kunden: Separate QS-Linie, doppelte Prüfung
- A-Kunden: Expressversand verfügbar

FINANZIELLE AUSWIRKUNGEN:
Zusätzliche Kosten A-Kunden Service: 22.000 EUR/Monat
ROI: 1:8,5 (pro 1 EUR Investment = 8,50 EUR Nutzen/Jahr)

MONITORING-KPIs:
TÄGLICH: A-Kunden Aufträge vs. Plan
WÖCHENTLICH: Liefertreue nach Kundenkategorien  
MONATLICH: Umsatzentwicklung nach Kategorien`
},

'quality_kpi_report_tag14.pdf': {
 filename: 'quality_kpi_report_tag14.pdf',
 title: 'Qualitäts-KPI Report - Finale Bilanz Tag 14',
 type: 'document',
 content: `QUALITÄTS-KPI REPORT TAG 14
APS GmbH - Operations Excellence
Status: FINAL REVIEW

EXECUTIVE SUMMARY:
Nach 14 Tagen intensiver Qualitätsoffensive haben wir eine Trendwende erreicht.
Alle KPIs zeigen positive Entwicklung, Kundenzufriedenheit steigt messbar.

1. DEFEKTRATE-ENTWICKLUNG

Tag 1 (Ausgangswert): 8,3%
Tag 7: 6,1%
Tag 14: 4,8%
VERBESSERUNG: -42% (absolut: -3,5 Prozentpunkte)

Ziel bis T+30: <4,0%
Langfristziel Q1/2025: <3,0%

Aufschlüsselung nach Produktlinien:
Linie 1 (Standardpumpen): 8,9% → 5,2% (-42%)
Linie 2 (Spezialpumpen): 7,1% → 4,1% (-42%)  
Linie 3 (Ersatzteile): 9,8% → 5,1% (-48%)

2. LIEFERTREUE-ENTWICKLUNG

Tag 1: 87%
Tag 7: 91%  
Tag 14: 94%
VERBESSERUNG: +7 Prozentpunkte

Aufschlüsselung nach Kundenkategorien:
A-Kunden: 89% → 97% (+8pp)
B-Kunden: 86% → 93% (+7pp)
C-Kunden: 85% → 91% (+6pp)

3. KUNDENZUFRIEDENHEIT (NPS)

Ausgangswert (Tag 0): NPS -8
Tag 7: NPS +5
Tag 14: NPS +12
VERBESSERUNG: +20 Punkte

A-Kunden Zufriedenheit:
Sehr zufrieden: 67% (war: 34%)
Zufrieden: 27% (war: 41%)
Neutral: 6% (war: 18%)
Unzufrieden: 0% (war: 7%)

4. REKLAMATIONSMANAGEMENT

Reklamationen eingegangen:
Tag 1-7: 23 Reklamationen
Tag 8-14: 14 Reklamationen
REDUKTION: -39%

Bearbeitungsgeschwindigkeit:
Reaktionszeit: 4,2h → 1,8h (-57%)
Lösungszeit: 2,3 Tage → 1,1 Tage (-52%)

5. KOSTEN-NUTZEN-ANALYSE

Investitionen in Qualität (Tag 1-14):
Schulungen: 8.500 EUR
Messgeräte/Kalibrierung: 12.000 EUR  
Zusätzliches QS-Personal: 6.300 EUR
Externe QS-Beratung: 4.200 EUR
TOTAL INVESTITION: 31.000 EUR

Einsparungen/Nutzen:
Reduzierte Nacharbeit: 18.400 EUR
Weniger Reklamationskosten: 14.200 EUR
Vermiedene Konventionalstrafen: 8.900 EUR  
TOTAL NUTZEN (14 Tage): 47.100 EUR

ROI NACH 14 TAGEN: 152%

6. BENCHMARK-VERGLEICH

Industrie-Durchschnitt (Maschinenbau):
Defektrate: 6,2% (APS: 4,8% ✓)
Liefertreue: 89% (APS: 94% ✓)
NPS: +8 (APS: +12 ✓)

APS liegt in allen KPIs über Branchendurchschnitt!

FAZIT:
Die Qualitätsoffensive war ein voller Erfolg. APS hat in 14 Tagen mehr Qualitätsverbesserung erreicht als in den 6 Monaten zuvor.`
},

'external_qs_audit_proposal.pdf': {
 filename: 'external_qs_audit_proposal.pdf',
 title: 'Externes QS-Audit Angebot - Schnellprüfung',
 type: 'document',
 content: `TXV SÜD AG
Zertifizierungsstelle Industrie

An: APS GmbH, Head of Operations
Datum: Tag 14
Betreff: Express-Qualitätsaudit - Bestätigung Verbesserungen

Sehr geehrte Damen und Herren,

AUDIT-PAKET "EXPRESS QS-CONFIRMATION":

Zielsetzung:
✓ Unabhängige Bestätigung der Qualitätsverbesserungen
✓ Objektive Bewertung der implementierten Maßnahmen
✓ Bankfähiges Testat für Stakeholder
✓ Identifikation weiterer Optimierungspotentiale

Audit-Umfang (1-tägiges Intensiv-Audit):

1. DOKUMENTENREVIEW (2 Stunden):
□ QS-Handbuch und Verfahrensanweisungen
□ Qualitäts-KPI Reports Tag 1-14
□ Reklamationsdokumentation und -bearbeitung

2. PRODUKTIONSAUDIT (4 Stunden):
□ Qualitätsprüfstationen Inspektion
□ Kalibrierung Messgeräte Verification
□ Prozessbeobachtung an allen 3 Linien
□ Mitarbeiter-Interviews (Stichprobe: 8 MA)

3. MANAGEMENT INTERVIEW (1 Stunde):
□ Strategische QS-Ausrichtung
□ Nachhaltigkeit der Maßnahmen

KOSTEN:
Audit-Durchführung: 3.200 EUR
Express-Zuschlag (48h-Lieferfrist): 800 EUR
GESAMT: 4.000 EUR (zzgl. USt.)

LIEFERBARERE:
Nach Audit-Abschluss erhalten Sie binnen 48h:

1. EXECUTIVE SUMMARY (2 Seiten):
"Objektive Bewertung der Qualitätsentwicklung bei APS GmbH"
→ Bankfähig, externe Bestätigung der Verbesserungen

2. DETAILBERICHT (8-12 Seiten):
□ IST-Analyse Qualitätssystem
□ Bewertung der 14-Tage-Verbesserungen
□ Benchmark zu Branchenstandard

3. ZERTIFIKAT:
"TXV SÜD bestätigt: Qualitätssystem APS GmbH entspricht hohen Standards"

BEFRISTUNG: Angebot gültig bis Tag 15, 12:00 Uhr

Mit freundlichen Grüßen
Dr. Michael Stern
Senior Manager Industrie-Audits`
},

'defect_rate_analysis.xlsx': {
 filename: 'defect_rate_analysis.xlsx',
 title: 'Defektrate-Analyse detailliert',
 type: 'spreadsheet',
 content: `DEFEKTRATE-ANALYSE APS GMBH
Zeitraum: Tag 1-14 | Detailauswertung

GESAMTÜBERBLICK:
Produktionsmenge (Stück): 2.847 (Tag 1-14)
Defekte Teile: 179 Stück
Defektrate: 6,3% (Durchschnitt Tag 1-14)

TAGESVERLAUF DEFEKTRATE:
Tag 1: 8,3% (47 Defekte bei 567 Teilen)
Tag 2: 8,1% (43 Defekte bei 531 Teilen) 
Tag 3: 7,9% (41 Defekte bei 519 Teilen)
Tag 4: 7,2% (38 Defekte bei 528 Teilen)
Tag 5: 6,8% (35 Defekte bei 515 Teilen)
...
Tag 13: 4,8% (23 Defekte bei 479 Teilen)
Tag 14: 4,8% (22 Defekte bei 458 Teilen)

TREND-ANALYSE:
Lineare Regression: -0,28% Defekte pro Tag
Korrelationskoeffizient: -0,94 (sehr starke negative Korrelation)
Prognose Tag 21: 2,8% Defektrate

AUFSCHLÜSSELUNG NACH PRODUKTLINIEN:

LINIE 1 - STANDARDPUMPEN (60% der Produktion):
Tag 1: 8,9% → Tag 14: 5,2%
Hauptdefekte: Dichtungsprobl. (45%), Lagerspiel (30%)
Verbesserungsmaßnahmen:
- Neue Dichtungs-Spezifikation (Tag 5)
- Lager-Einstelljigs kalibriert (Tag 8)

LINIE 2 - SPEZIALPUMPEN (25% der Produktion):
Tag 1: 7,1% → Tag 14: 4,1%
Hauptdefekte: Toleranzüberschr. (40%), Materialfehler (35%)
Verbesserungsmaßnahmen:
- SPC-Überwachung installiert (Tag 4)
- Materialeingangskontrolle verschärft (Tag 7)

ROOT CAUSE ANALYSE Top-Defektursachen:

1. MATERIALSCHWANKUNGEN:
Tag 1: 35% der Defekte → Tag 14: 18%
Maßnahmen: Lieferanten-Audit, engere Eingangskontrolle

2. MASCHINENEINSTELLUNG:
Tag 1: 28% der Defekte → Tag 14: 15%
Maßnahmen: Daily-Kalibrierung, Operator-Training

3. VERSCHLEISS WERKZEUGE:
Tag 1: 22% der Defekte → Tag 14: 12%
Maßnahmen: Predictive Maintenance

KOSTEN-ANALYSE DEFEKTE:
Durchschnittliche Kosten pro Defekt: 78 EUR
Gesamtkosten Tag 1-14: 13.962 EUR
ERSPARNIS durch Verbesserung: 4.446 EUR

PROGNOSE & BENCHMARKING:
Industrie-Benchmark: 6,2%
APS Tag 14: 4,8% (23% besser als Benchmark)
Prognose Tag 28: 2,1% (Best-in-Class erreicht)`
},

'contribution_margin_analysis.xlsx': {
 filename: 'contribution_margin_analysis.xlsx',
 title: 'Deckungsbeitrags-Analyse für Materialfreigabe-Policy',
 type: 'spreadsheet',
 content: `DECKUNGSBEITRAGS-ANALYSE APS GMBH
Basis für Materialfreigabe-Policy | Stand: Tag 14

GESAMTAUFTRAGSSITUATION:
Offene Aufträge: 89 Stück
Gesamtvolumen: 4,2 Mio. EUR
Durchschnittlicher Auftragswert: 47.191 EUR

AUFTRAGSBEWERTUNG NACH DB-KATEGORIEN:

DB > 30% (AUTOMATISCHE FREIGABE):
Anzahl Aufträge: 23
Volumen: 1,8 Mio. EUR (43%)
Durchschnitts-DB: 34,2%
Geschätzter Gewinnbeitrag: 616.000 EUR

Beispiel-Aufträge:
- A Spezialpumpe: 285k EUR, DB 38%
- B Prototyp: 156k EUR, DB 42%  
- C Serie: 198k EUR, DB 35%

DB 25-30% (STANDARD-FREIGABE):
Anzahl Aufträge: 31
Volumen: 1,6 Mio. EUR (38%)
Durchschnitts-DB: 27,1%

DB 20-25% (EINZELFALLPRÜFUNG):
Anzahl Aufträge: 22
Volumen: 0,6 Mio. EUR (14%)
Durchschnitts-DB: 22,3%

DB < 20% (KRITISCH PRÜFEN):
Anzahl Aufträge: 13
Volumen: 0,2 Mio. EUR (5%)
Durchschnitts-DB: 16,8%

PRODUKTLINIEN-ANALYSE:

STANDARDPUMPEN (60% des Volumens):
DB-Verteilung:
>30%: 15 Aufträge (Hochvolumen-Standardtypen)
25-30%: 25 Aufträge (Modifikationen) 
20-25%: 18 Aufträge (Preiskampf-Segmente)
<20%: 8 Aufträge (Verlustbringer/strategisch)
Durchschnitts-DB: 26,8%

SPEZIALPUMPEN (25% des Volumens):
>30%: 6 Aufträge (Ingenieur-Know-how)
25-30%: 4 Aufträge (Standard-Specials)
Durchschnitts-DB: 33,4%

KUNDEN-DB-ANALYSE:
A-KUNDEN: Durchschnitts-DB: 28,4%
B-KUNDEN: Durchschnitts-DB: 26,9%
C-KUNDEN: Durchschnitts-DB: 23,1%

AUSWIRKUNG 25%-SCHWELLE:
Bei strikter 25%-Regel:
Freigegebene Aufträge: 54 von 89 (61%)
Freigegebenes Volumen: 3,4 Mio. EUR (81%)
Gewinnbeitrag: 1,05 Mio. EUR (88%)

EMPFEHLUNGEN:
1. DYNAMISCHE DB-SCHWELLE:
Basis: 25%
A-Kunden: 20% (strategische Komponente)
Neue Kunden: 30% (Risiko-Aufschlag)

Die 25%-Schwelle ist ökonomisch sinnvoll, bedarf aber flexibler Anwendung für A-Kunden.`
},

'production_steering_memo.docx': {
 filename: 'production_steering_memo.docx',
 title: 'Produktionssteuerungs-Memo - Neue Regeln',
 type: 'document',
 content: `PRODUKTIONSSTEUERUNGS-MEMO
Von: Head of Operations
An: Produktionsleitung, Materialplanung, Schichtleiter
Datum: Tag 14
Betreff: Neue Materialfreigabe- und Steuerungslogik - SOFORT GÜLTIG

Liebe Kollegen,

die neuen Materialfreigabe-Regeln treten HEUTE in Kraft. 

WARUM DIE NEUEN REGELN?
Nach der intensiven 14-Tage-Phase brauchen wir disziplinierte Steuerung:
- Liquidität schonen ohne Lieferqualität zu gefährden
- Profitabilität sicherstellen (DB > 25% als Richtschnur)
- A-Kunden-Service auf höchstem Niveau halten

GRUNDPRINZIP:
"Erst rechnen, dann produzieren. Aber A-Kunden gehen vor."

NEUE FREIGABE-MATRIX:

AUTOMATISCHE FREIGABE (Grünes Licht):
✓ Deckungsbeitrag > 25% UND
✓ Kunde Kategorie A oder B UND  
✓ Material verfügbar >80% UND
✓ Auftragswert <100k EUR

GELBE AMPEL (Prüfung erforderlich):
⚠ DB zwischen 20-25% ODER
⚠ Kunde Kategorie C ODER
⚠ Material nur 50-80% verfügbar ODER
⚠ Auftragswert >100k EUR

ROTE AMPEL (Stopp, Eskalation nötig):
⛔ DB unter 20% ODER
⛔ Kunde in Zahlungsverzug >60 Tage ODER
⛔ Auftragswert >200k ohne Vorfreigabe

PRAKTISCHE UMSETZUNG AB SOFORT:

1. SAP-INTEGRATION:
- Jeder Auftrag zeigt automatisch DB% an
- Grün/Gelb/Rot-Ampel erscheint automatisch
- Bei Grün: Materialfreigabe automatisch um 6:00 täglich
- Bei Gelb/Rot: E-Mail an zuständige Führungskraft

2. TAGES-LIMITS (Liquiditätsschutz):
Montag-Freitag, pro Linie:
- Linie 1: Max 50k EUR Material/Tag
- Linie 2: Max 50k EUR Material/Tag  
- Linie 3: Max 30k EUR Material/Tag

3. A-KUNDEN SONDERREGELN:
✓ DB-Schwelle: 20% statt 25%
✓ Materialreservierung: 20% des Lagerbestands
✓ Eilaufträge: Auch außerhalb der Tageslimits möglich

4. ESKALATIONS-HOTLINE:
- Meine Durchwahl: -247
- Bei Abwesenheit: CFO (Durchwahl -201)

SONDERFÄLLE:

FALL 1: Konventionalstrafe droht
→ IMMER freigeben, egal welcher DB

FALL 2: A-Kunde hat Produktionsausfall  
→ SOFORT-Freigabe aller benötigten Teile

NEUE VERANTWORTLICHKEITEN:

SCHICHTLEITER:
□ Täglich 7:00: Freigabe-Status prüfen
□ Gelbe Ampeln bis 50k EUR entscheiden
□ Tages-Limits überwachen

MATERIALPLANUNG:
□ Täglich 16:00: Nächsten Tag vorbereiten  
□ A-Kunden-Reserve überwachen (20%)
□ Wöchentlich: Material-Cash-Forecast

Bei Fragen: Jederzeit ansprechen.

Mit freundlichen Grüßen
[Name], Head of Operations`
},

'product_mix_turnaround_plan.pptx': {
 filename: 'product_mix_turnaround_plan.pptx',
 title: 'Produktmix Turnaround-Plan - Profitabilitäts-Fokus',
 type: 'presentation',
 content: `PRODUKTMIX TURNAROUND-PLAN
APS GmbH | Operative Neuausrichtung

SLIDE 1: SITUATION UND ZIELSETZUNG
Aktuelle Situation:
- Durchschnitts-DB: 26,1% (alle Produktlinien)
- 35% der Aufträge unter 25% DB
- Liquiditätsdruck erfordert Fokussierung

Zielsetzung:
- DB-starke Produkte (>30%) priorisieren
- Kurzfristiger Ergebnisschub +400k EUR (Q1)
- Kundenbindung A-Kunden erhalten

SLIDE 2: NEUE PRIORITÄTS-MATRIX

PRIORITÄT 1 - WACHSTUM (DB >30%):
□ Spezialpumpen für Öl&Gas (DB: 42%)
□ Hochdruck-Anwendungen (DB: 38%)  
□ Engineering-Services (DB: 55%)
ZIEL: +50% Anteil am Gesamtmix bis Q2

PRIORITÄT 2 - HALTEN (DB 25-30%):
□ Standard-Modifikationen (DB: 28%)
□ Mittelvolumen-Serien (DB: 26%)
ZIEL: Volumen stabil, Preise verteidigen

PRIORITÄT 3 - SELEKTIV (DB 20-25%):
□ Nur für A-Kunden
□ Nur bei Volumen >100k EUR
ZIEL: 50% Volumen-Reduktion bis Q2

PRIORITÄT 4 - AUSSTIEG (DB <20%):
□ Commodity-Pumpen ohne USP
□ Verlustbringende Kleinserien
ZIEL: Kompletter Ausstieg bis Q3

SLIDE 3: KAPAZITÄTS-UMSCHICHTUNG

AKTUELLE VERTEILUNG:
Linie 1 (Standard): 60% = 2.400h/Monat
Linie 2 (Spezial): 25% = 1.000h/Monat  
Linie 3 (Ersatzteile): 15% = 600h/Monat

ZIEL-VERTEILUNG (bis Q2):
Linie 1: 45% = 1.800h/Monat (-600h)
Linie 2: 35% = 1.400h/Monat (+400h)
Linie 3: 20% = 800h/Monat (+200h)

Umsetzung:
- 3 MA von Linie 1 zu Linie 2 (Training nötig)
- Zusätzliche Spezialwerkzeuge für Linie 2

SLIDE 4: FINANZIELLE AUSWIRKUNGEN

KURZFRISTIG (Q1/2025):
Umsatz-Rückgang: -8% (Verzicht unprofitable Aufträge)
DB-Verbesserung: +3,2pp (von 26,1% auf 29,3%)
Absoluter DB-Gewinn: +420k EUR

MITTELFRISTIG (Q2-Q3/2025):
Umsatz-Recovery: -2% vs heute
DB-Niveau: 31-33% (strukturell verbessert)

SLIDE 5: KUNDENAUSWIRKUNGEN

A-KUNDEN (Sonderbehandlung):
✓ Alle Produkte weiterhin verfügbar
✓ Preise: nur moderate Anpassungen (+3-5%)
Risiko: Minimal

B-KUNDEN (Selektive Behandlung):
Profitable Produkte: Business as usual
Unprofitable: Preiserhöhung +10-15%
Verlust erwartet: 20% akzeptabel

C-KUNDEN (Harte Selektion):
Profitable: Preiserhöhung +15-20%
Unprofitable: Ablehnung
Verlust: 40-50% der C-Kunden (Impact: Positiv)

Der Turnaround ist machbar - aber nur mit konsequenter Umsetzung!`
},

'key_account_impact_assessment.xlsx': {
 filename: 'key_account_impact_assessment.xlsx',
 title: 'Key Account Impact Assessment - Produktmix-Änderung',
 type: 'spreadsheet',
 content: `KEY ACCOUNT IMPACT ASSESSMENT
Auswirkungen Produktmix-Turnaround auf A-Kunden

GESAMTÜBERBLICK A-KUNDEN:
Anzahl: 15 Kunden
Umsatzvolumen: 14,1 Mio EUR (58% Gesamtumsatz)
Durchschnitts-DB: 28,4%
Strategische Bedeutung: KRITISCH

EINZELBEWERTUNG A-KUNDEN:

MEGACORP INTERNATIONAL (Rang 1):
Umsatz 2024: 2.300k EUR
Hauptprodukte: 60% Spezial, 30% Standard, 10% Ersatzteile
Durchschnitts-DB: 31,2%

Auswirkung Produktmix-Turnaround:
Spezial-Pumpen (1.380k): PRIORITÄT 1 ✓
Standard-Pumpen (690k): DB-Check nötig ⚠
Ersatzteile (230k): PRIORITÄT 2 ✓

Risiko-Assessment: NIEDRIG
- 90% des Volumens profitabel
- Langfristige Partnerschaft (8 Jahre)
Maßnahmen:
□ Gespräch CEO-zu-CEO bis Tag 20
□ Ziel: Umsatz-Wachstum +15% durch Premium-Fokus

INDUSTRIEGIGANT AG (Rang 2):
Umsatz 2024: 1.800k EUR  
Hauptprodukte: 40% Standard, 35% Spezial, 25% Ersatzteile
Durchschnitts-DB: 24,8%

Risiko-Assessment: MITTEL
- 40% des Volumens unter 25% DB
- Preissensitiver Kunde
Maßnahmen:
□ Intensive Verhandlungen Standard-Preise (+8%)
□ Risiko: 20% Umsatzverlust, aber DB-Verbesserung

ZUSAMMENFASSUNG AUSWIRKUNGEN:

Spezialpumpen (3,5 Mio EUR A-Kunden-Umsatz):
- 90% der Aufträge >30% DB ✓✓
- Wachstumspotenzial: +25% durch Fokussierung

Standardpumpen (5,9 Mio EUR):
- 45% der Aufträge <25% DB ⚠⚠
- Preiserhöhungs-Potenzial: +5-8%
- Risiko: 15-20% Volumenverlust möglich

RISIKO-MATRIX:

NIEDRIGES RISIKO (8 Kunden, 8,2 Mio EUR):
- >80% profitable Aufträge
- Technologie-orientiert
- Premium-Zahlungsbereitschaft

MITTLERES RISIKO (5 Kunden, 4,1 Mio EUR):
- 50-80% profitable Aufträge
- Preissensibel aber verhandlungsbereit

HOHES RISIKO (2 Kunden, 1,8 Mio EUR):
- <50% profitable Aufträge
- Hoher Preisdruck

KOMPENSATIONSSTRATEGIEN:
Bei erwarteten Verlusten (1,8 Mio EUR):
□ Akquisition 3-4 neue Premium-Kunden (2,5 Mio EUR)
□ Upselling bei stabilen A-Kunden (+10%)

FAZIT: 
85% des A-Kunden-Geschäfts bleibt profitabel.
15% Risiko-Volumen wird durch Premium-Akquisition kompensiert.`
},

'hypercare_sla_agreement.pdf': {
 filename: 'hypercare_sla_agreement.pdf',
 title: 'Hypercare Service Level Agreement - 72h Phase',
 type: 'document',
 content: `HYPERCARE SERVICE LEVEL AGREEMENT
APS GmbH - Premium Support für A-Kunden
Gültigkeitsdauer: 72 Stunden (Tag 14-17)

ZWECK:
Nach der 14-tägigen Stabilisierungsphase stellen wir durch intensive 
Betreuung sicher, dass alle kritischen Prozesse reibungslos funktionieren.

1. SCOPE OF SERVICES

INKLUDIERTE SERVICES:
✓ 24/7 Emergency Hotline (Tel: 0800-APS-HELP)
✓ Onsite-Support binnen 24h (deutschlandweit)
✓ Proaktive Statusupdates zu allen laufenden Aufträgen
✓ Dedicated Account Manager als Single Point of Contact
✓ Express-Logistik für kritische Lieferungen
✓ Immediate Escalation Path zu CEO/CTO

2. SERVICE LEVEL DEFINITIONS

RESPONSE TIME (Reaktionszeit):
KRITISCH (Produktionsausfall): ≤ 30 Minuten
HOCH (Störung mit Workaround): ≤ 2 Stunden  
NORMAL (Standard-Anfragen): ≤ 4 Stunden
NIEDRIG (Informationsanfragen): ≤ 8 Stunden

RESOLUTION TIME (Lösungszeit):
KRITISCH: ≤ 4 Stunden oder Onsite-Support
HOCH: ≤ 24 Stunden
NORMAL: ≤ 48 Stunden  

AVAILABILITY (Erreichbarkeit):
Hotline: 24/7 mit Durchstellung zu Bereitschaftsdienst
Account Manager: 06:00-22:00 (Mo-So)
Onsite-Support: 24/7 mit max. 4h Anfahrtszeit

3. COMMUNICATION PROTOCOLS

PROAKTIVE KOMMUNIKATION:
□ 08:00 täglich: Status-Mail alle laufenden Aufträge
□ Bei Verzögerungen: Sofort-Info + Lösungsplan
□ 18:00 täglich: Tages-Summary + Ausblick

KONTAKTPERSONEN APS:
Account Manager: [Name] - 0172-xxx-xxxx
Head of Operations: [Name] - 0172-xxx-xxxx  
CEO: [Name] - 0172-xxx-xxxx (Escalation only)

4. ONSITE-SUPPORT TERMS

BEREITSTELLUNG:
□ 2 Servicetechniker in 24/7-Bereitschaft
□ Servicewagen mit Standard-Ersatzteilen
□ Mobile Werkstatt für vor-Ort Reparaturen

ANFAHRTSZEITEN:
Großraum München: ≤ 2 Stunden
Bayern/BW: ≤ 4 Stunden  
Deutschland: ≤ 8 Stunden

5. ESCALATION MATRIX

LEVEL 1: Account Manager
- Alle Standard-Anfragen
- Erste technische Problemanalyse

LEVEL 2: Head of Operations  
- Produktions- und Lieferprobleme
- Qualitätsprobleme mit Ausfallrisiko

LEVEL 3: CTO
- Komplexe technische Probleme
- Sicherheitskritische Probleme

LEVEL 4: CEO
- Strategische Kundenprobleme
- Eskalation bei Service-Versagen

6. FINANCIAL TERMS

KOSTENTRAGUNG APS:
□ Alle Hypercare-Services kostenfrei für A-Kunden
□ Anfahrtskosten Onsite-Support: APS-Kostentragung
□ Express-Logistik: APS-Kostentragung

AUSBLICK NACH 72H:
□ Übergang zu optimiertem Standard-SLA
□ Mögliche Verlängerung bei Kundenwunsch

Diese SLA-Vereinbarung zeigt unser Commitment für Excellence.`
},

'escalation_matrix_a_customers.xlsx': {
 filename: 'escalation_matrix_a_customers.xlsx',
 title: 'Eskalationsmatrix A-Kunden - Hypercare Phase',
 type: 'spreadsheet',
 content: `ESKALATIONSMATRIX A-KUNDEN
72h Hypercare Phase | Tag 14-17

KUNDEN-PRIORISIERUNG INNERHALB A-SEGMENT:

TOP TIER (CEO-Level bei kritischen Issues):
1. Alpha (2.300k EUR, 8J Partner)
2. Beta (1.800k EUR, Referenz-Status)
3. Gamma (1.400k EUR, Innovation-Partner)

HIGH TIER (Head of Operations Level):
4. Delta (1.100k EUR, Export-Gateway)
5. Epsilon (900k EUR, Qualitäts-Benchmark)
6. Phi (850k EUR, R&D-Kooperation)

STANDARD TIER (Account Manager Level):
8-15. Restliche A-Kunden (520k-720k EUR)

ISSUE-KATEGORISIERUNG:

KATEGORIE 1: PRODUKTIONSAUSFALL BEIM KUNDEN
SOFORT-REAKTION (0-15 Minuten):
□ Account Manager → Head of Operations
□ Head of Operations → CEO (bei Top Tier)
□ Onsite-Team dispatch (ETA max 4h)

Zuständigkeit:
TOP TIER: CEO + CTO + Head of Operations
HIGH TIER: Head of Operations + CTO
STANDARD TIER: Head of Operations + Senior Techniker

KATEGORIE 2: QUALITÄTSMANGEL MIT HANDLUNGSBEDARF
REAKTION (0-30 Minuten):
□ Sofortiger Lieferstopp aller Aufträge zu diesem Kunden
□ Quality Manager → Head of Operations
□ Ersatzlieferung organisiert

KATEGORIE 3: LIEFERVERZÖGERUNG > 2 TAGE
REAKTION (0-60 Minuten):
□ Account Manager informiert Kunde proaktiv
□ Alternative Lösungen erarbeitet

REAKTIONSZEIT-MATRIX:

PRODUKTIONSAUSFALL:
TOP TIER: 15 Min Reaktion, 2h Onsite
HIGH TIER: 30 Min Reaktion, 4h Onsite
STANDARD TIER: 60 Min Reaktion, 8h Onsite

QUALITÄTSMANGEL:
TOP TIER: 30 Min Reaktion, Sofort-Action
HIGH TIER: 60 Min Reaktion, Same Day Action

ESKALATIONS-PFADE NACH KUNDEN:

MEGACORP INTERNATIONAL:
Level 1: Account Manager (Anna Schmidt) - 0172-xxx-xxxx
Level 2: Head of Operations
Level 3: CEO (bei Kat. 1-2)
Besonderheit: CEO-zu-CEO Hotline etabliert

PERFORMANCE-MESSUNG:
- First Call Resolution Rate: >70%
- Customer Satisfaction per Issue: >4/5
- Escalation Rate: <10% aller Tickets

ESKALATIONS-KOSTEN:
Level 1: 50 EUR/h
Level 2: 150 EUR/h  
Level 3: 300 EUR/h
Onsite-Support: 800 EUR/Tag

BUDGET HYPERCARE 72H: 20.000 EUR
ROI bei 1% Kundenbindungs-Verbesserung: 7:1`
},

'onsite_support_schedule.msg': {
 filename: 'onsite_support_schedule.msg',
 title: 'E-Mail Onsite-Support Einsatzplan',
 type: 'email',
 content: `Von: Service-Koordination <service@aurion-ps.com>
An: Techniker-Team, Account Management
CC: Head of Operations, CEO
Datum: Tag 14, 16:30 Uhr
Betreff: ONSITE-SUPPORT EINSATZPLAN - Hypercare 72h (Tag 14-17)

Liebe Kollegen,

hiermit der detaillierte Einsatzplan für unsere Onsite-Support-Teams während der 72h-Hypercare-Phase.

TEAM-AUFSTELLUNG:

TEAM A (Nord/Ost Deutschland):
Lead: Markus Weber (15J Erfahrung, alle APS-Systeme)
Support: Jennifer Klein (8J Erfahrung, Elektronik-Spezialist)
Fahrzeug: Mercedes Sprinter (M-APS 1)
Ausrüstung: Mobile Werkstatt + Standard-Ersatzteile
Einsatzgebiet: Hamburg, Berlin, Leipzig, Dresden
Standby-Location: Hamburg

TEAM B (West Deutschland): 
Lead: Lisa Fischer (12J Erfahrung, Hydraulik-Spezialist)
Support: Emre Yılmaz (6J Erfahrung, Qualitätssicherung)
Fahrzeug: VW Crafter (M-APS 2)
Einsatzgebiet: Köln, Düsseldorf, Dortmund, Frankfurt
Standby-Location: Köln

TEAM C (Süd Deutschland/München):
Lead: Burak Demir (10J Erfahrung)
Support: Maria Gonzalez (7J Erfahrung)
Fahrzeug: Mercedes Sprinter (M-APS 3)
Einsatzgebiet: München, Stuttgart, Nürnberg
Standby-Location: München HQ

BEREITSCHAFTSREGELUNG:

24/7-BEREITSCHAFT (Tag 14-17):
- Ein Team immer in aktiver Bereitschaft
- Rotation alle 8 Stunden
- Max. Anfahrtszeit: 4h deutschlandweit

SCHICHTPLAN:
Tag 14, 18:00 - Tag 15, 02:00: Team A
Tag 15, 02:00 - Tag 15, 10:00: Team B  
Tag 15, 10:00 - Tag 15, 18:00: Team C

EINSATZKRITERIEN:

SOFORT-DISPATCH (binnen 30 Min):
□ A-Kunde Produktionsausfall
□ Sicherheitskritisches Problem
□ Management-Eskalation Level 3

GEPLANTER EINSATZ (binnen 4h):
□ Präventive Checks bei kritischen A-Kunden
□ Technische Beratung vor Ort

AKTUELLER A-KUNDEN STATUS:

MEGACORP INTERNATIONAL (München):
Status: GRÜN ✓
Letzter Service: Tag 10 (Planmäßig)
Nächster Check: Tag 16 (proaktiv)
Team-Zuteilung: Team C (Stefan/Maria)

INDUSTRIEGIGANT AG (Stuttgart):
Status: GELB ⚠
Problem: Vibrations-Issue vom Tag 12
Nächster Check: Tag 15 (Nachkontrolle)
Team-Zuteilung: Team C

TECHPARTNER SOLUTIONS (Frankfurt):
Status: ROT ⚠⚠
Problem: Intermittierender Druckabfall seit Tag 13
Geplanter Einsatz: Tag 15, 08:00 Uhr
Team-Zuteilung: Team B (Andreas/Lisa)

ERSATZTEIL-VERFÜGBARKEIT:

FAHRZEUG-LAGER (jedes Team):
□ Standard-Dichtungen: 20 Sets
□ Elektrische Komponenten: 15 Sets
□ Sensoren: 10 Sets verschiedene Typen
□ Notfall-Reparaturkits: 5 Sets

ZENTRAL-LAGER MÜNCHEN:
□ Alle A-Kunden spezifischen Teile
□ Express-Lieferung: 2h München, 4h Deutschland

KOMMUNIKATIONS-PROTOKOLL:

VOR EINSATZ:
□ Dispatch-Info 15 Min vor Abfahrt
□ Kunden-Info: ETA + Techniker-Namen

WÄHREND EINSATZ:
□ Ankunfts-Bestätigung
□ Stündliche Updates bei komplexen Issues

NACH EINSATZ:
□ Completion-Report binnen 2h
□ Kunden-Feedback eingeholt

NOTFALL-KONTAKTE:
Service-Leitstelle (24/7): 089-xxx-xxxx
Head of Operations: 0172-xxx-xxxx
CEO (bei Eskalationen): 0172-xxx-xxxx

BUDGET:
Personalkosten: 12.000 EUR
Reisekosten: 3.000 EUR
Express-Services: 5.000 EUR
TOTAL: 20.000 EUR

MOTIVATION:
Diese 72h sind entscheidend! Unsere A-Kunden vertrauen darauf, dass wir da sind. Jeder repräsentiert APS beim Kunden.

Wir schaffen das gemeinsam!

Petra Schulze  
Service-Koordination
0172-xxx-xxxx (24/7 erreichbar)`
  },
  'employee_qa_preparation.pdf': {
 filename: 'employee_qa_preparation.pdf',
 title: 'Mitarbeiter Q&A Vorbereitung - Townhall',
 type: 'document',
 content: `MITARBEITER Q&A VORBEREITUNG
Townhall Tag 14 | Erwartete Fragen & Antworten

ZIELSETZUNG:
Offene, ehrliche Kommunikation bei gleichzeitig stabilisierender Botschaft.
Fakten vermitteln, Ängste nehmen, Vertrauen stärken.

GRUNDSÄTZE FÜR ANTWORTEN:
✓ Ehrlich und transparent
✓ Faktenbasiert, nicht spekulativ
✓ Zukunftsorientiert
✓ Wertschätzend gegenüber Mitarbeiterleistung

ERWARTETE FRAGEN & VORBEREITETE ANTWORTEN:

FRAGE 1: "Wird es doch noch Entlassungen geben?"
ANTWORT CEO: 
"Ich kann Ihnen eine klare Zusage machen: Im Kerngeschäft der APS GmbH sind keine betriebsbedingten Kündigungen geplant. Der Verkauf von United Pumps erfolgt als Ganzes - alle 45 Mitarbeiter dort gehen geschützt durch § 613a BGB zum neuen Eigentümer über. Ihre Arbeitsplätze hier sind sicher."

FRAGE 2: "Was ist mit unserem Weihnachtsgeld?"
ANTWORT CEO:
"Das Weihnachtsgeld wird wie vertraglich vereinbart mit dem November-Gehalt ausgezahlt. Daran ändert sich nichts. Sie haben Außergewöhnliches geleistet - das Weihnachtsgeld ist mehr als verdient."

FRAGE 3: "Kommt jetzt ein Investor, der alles umkrempelt?"
ANTWORT CEO:
"Wir führen Gespräche mit Investoren aus einer Position der Stärke heraus. Jeder Partner muss echten Mehrwert bringen. Es wird keine feindliche Übernahme geben. Wir behalten die Kontrolle."

FRAGE 4: "Warum verkaufen wir United Pumps?"
ANTWORT CEO:
"Diese Entscheidung ist uns schwergefallen. Aber United Pumps bekommt einen Eigentümer, der sich voll auf diesen Markt fokussiert. Die Kollegen haben dort bessere Entwicklungschancen. Für uns bedeutet es Fokussierung auf unsere Stärken."

FRAGE 5: "Wie sicher sind die 30 Millionen?"
ANTWORT CEO:
"Der Letter of Intent ist unterschrieben, Due Diligence läuft, der Käufer ist solvent und seriös. Wir rechnen mit Closing in 3 Wochen. Alle Ampeln stehen auf Grün."

FRAGE 6: "Was passiert, wenn der Deal platzt?"
ANTWORT CEO:
"Auch ohne United Pumps sind wir stabil aufgestellt. Die letzten 14 Tage haben gezeigt: Wir können jede Krise meistern. Aber ich bin zuversichtlich, dass der Deal klappt."

FRAGE 7: "Werden die Arbeitsbedingungen schlechter?"
ANTWORT CEO:
"Das Gegenteil ist der Fall. Mit der Stabilität können wir wieder in bessere Arbeitsbedingungen investieren. Die Qualitätsoffensive hat gezeigt: Gute Bedingungen führen zu besseren Ergebnissen."

FRAGE 8: "Was ist mit Gehaltserhöhungen?"
ANTWORT CEO:
"Die regulären Tarifanpassungen finden statt. Darüber hinaus schauen wir, was möglich ist. Erfolg soll geteilt werden. Lassen Sie uns erst die Basis stabilisieren."

SCHWIERIGE FRAGEN:

FRAGE: "Warum sollen wir Ihnen glauben? Sie haben gesagt, es gibt keine Krise."
ANTWORT CEO:
"Sie haben recht - ich war zu optimistisch und habe Warnzeichen übersehen. Das war mein Fehler. Aber schauen Sie die Zahlen der letzten 14 Tage an: Wir haben geliefert, was wir versprochen haben. Vertrauen entsteht durch Taten."

FRAGE: "Verdienen Sie weniger, oder tragen nur wir die Krise?"
ANTWORT CEO:
"Mein Gehalt ist seit Krisenbeginn eingefroren. Bonuszahlungen gibt es erst wieder, wenn alle wieder Bonuszahlungen bekommen. Wir sitzen im selben Boot."

EMOTIONALE FRAGEN:

FRAGE: "Ich habe Angst um meinen Arbeitsplatz."
ANTWORT CEO:
"Ich verstehe diese Angst. Als Unternehmer trage ich Verantwortung für 287 Familien - das nehme ich sehr ernst. Ihre Sorgen waren berechtigt, aber schauen Sie unsere Zahlen an: Wir haben es geschafft."

SCHLUSSBOTSCHAFT:
"14 Tage, die unser Unternehmen verändert haben. Sie haben gezeigt, was in APS steckt. Die Krise ist vorbei, die Zukunft beginnt jetzt. Ich bin stolz auf jeden Einzelnen von Ihnen."

MODERATIONS-HINWEISE:
- Bei aggressiven Fragen: Ruhe bewahren, nicht defensiv werden
- Bei Wiederholungen: Freundlich auf gegebene Antworten verweisen
- Bei Detailfragen: "Das prüfe ich und komme auf Sie zu"
- Focus auf große Botschaften halten`
},

'roadmap_presentation.pptx': {
 filename: 'roadmap_presentation.pptx',
 title: 'Roadmap Präsentation - Der Weg nach vorne',
 type: 'presentation',
 content: `ROADMAP APS GMBH
"Der Weg nach vorne"
Townhall Präsentation Tag 14

SLIDE 1: TITEL
APS ROADMAP 2025-2027
"Gemeinsam in die Zukunft"

SLIDE 2: WO STEHEN WIR HEUTE?
✓ 14-Tage-Challenge erfolgreich gemeistert
✓ Liquidität gesichert
✓ Qualität deutlich verbessert (Defektrate -42%)
✓ Alle Arbeitsplätze erhalten
✓ Kundenzufriedenheit gesteigert
✓ United Pumps Verkauf 

FUNDAMENT IST GELEGT!

SLIDE 3: ROADMAP ÜBERBLICK - 3 PHASEN

PHASE 1: STABILISIERUNG (Tag 15 - Tag 90)
"Fundament festigen"

PHASE 2: TRANSFORMATION (Q2-Q3 2025)  
"Wachstum vorbereiten"

PHASE 3: EXPANSION (Q4 2025 - 2027)
"Marktführer werden"

SLIDE 4: PHASE 1 - STABILISIERUNG

WOCHE 1-2: HYPERCARE
□ A-Kunden 24/7 Support
□ United Pumps Closing
□ Liquiditäts-Monitoring

WOCHE 3-8: KONSOLIDIERUNG
□ Neue Arbeitsabläufe verstetigen
□ Qualitätssystem ausbauen
□ Kundenbeirat etablieren

WOCHE 9-12: OPTIMIERUNG
□ Effizienz-Steigerungen
□ Digitalisierung Prozesse
□ Kostenstruktur optimieren

Ziel Phase 1: Stabile 8% EBITDA-Marge

SLIDE 5: PHASE 2 - TRANSFORMATION

PRODUKTMIX-OPTIMIERUNG:
□ Fokus auf profitabelste Segmente (DB >30%)
□ Premium-Positionierung ausbauen
□ Service-Geschäft erweitern

DIGITALISIERUNG:
□ Digitale Qualitäts-Plattform
□ KI-basierte Produktionsplanung
□ Customer Portal für A-Kunden

TEAM-ENTWICKLUNG:
□ Weiterbildungs-Offensive
□ Leadership-Programm
□ Innovationskultur fördern

Ziel Phase 2: 12% EBITDA-Marge

SLIDE 6: PHASE 3 - EXPANSION

MARKT-EXPANSION:
□ Neue Kundensegmente erschließen
□ Geografische Expansion EU
□ Akquisitionen prüfen

INNOVATION:
□ F&E-Budget verdoppeln
□ Neue Produktlinien
□ Nachhaltigkeit als USP

WACHSTUM:
□ Umsatz +50% bis 2027
□ Neue Arbeitsplätze schaffen
□ Marktführerschaft Nischensegmente

Ziel Phase 3: 15% EBITDA-Marge, 35 Mio EUR Umsatz

SLIDE 7: INVESTITIONEN IN UNSER TEAM

WEITERBILDUNG (Budget: 150k EUR/Jahr):
□ Fachliche Schulungen für alle
□ Führungskräfte-Entwicklung
□ Digitalisierungs-Training

ARBEITSPLATZ-VERBESSERUNGEN:
□ Neue Maschinen und Werkzeuge
□ Digitale Arbeitsplätze
□ Gesundheitsförderung

KARRIERE-ENTWICKLUNG:
□ Interne Aufstiegschancen
□ Mentoring-Programme  
□ Projekt-Verantwortung

SLIDE 8: NEUE ARBEITSPLÄTZE

BIS ENDE 2025: +15 neue Stellen
□ 5 in Produktion (Wachstum)
□ 3 in Qualitätssicherung
□ 2 in F&E
□ 2 im Vertrieb International
□ 2 in IT/Digitalisierung
□ 1 in HR/Training

BIS ENDE 2027: +35 neue Stellen
□ Zweite Schicht in der Produktion
□ Service-Techniker-Team
□ International Sales Team

IHRE PERSPEKTIVEN:
□ Erste Wahl bei neuen Positionen
□ Weiterbildung für neue Rollen
□ Führungsverantwortung möglich

SLIDE 9: WAS BEDEUTET DAS FÜR SIE?

KURZFRISTIG (nächste 6 Monate):
✓ Arbeitsplatz-Sicherheit
✓ Verbesserte Arbeitsbedingungen
✓ Weiterbildungs-Möglichkeiten

MITTELFRISTIG (2025-2026):
✓ Karriere-Entwicklung
✓ Bessere Vergütung möglich
✓ Neue Herausforderungen

LANGFRISTIG (bis 2027):
✓ Teil eines Marktführers sein
✓ Internationale Projekte
✓ Führungsrollen möglich

SLIDE 10: SCHLUSSBOTSCHAFT

14 TAGE HABEN UNS VERÄNDERT.

Wir sind:
□ Stärker
□ Klüger  
□ Einiger
□ Zuversichtlicher

DIE KRISE IST VORBEI.
DIE ZUKUNFT BEGINNT JETZT.

GEMEINSAM SIND WIR APS!`
},

'disclosure_letter_draft.docx': {
 filename: 'disclosure_letter_draft.docx',
 title: 'Disclosure Letter Entwurf - United Pumps Verkauf',
 type: 'document',
 content: `DISCLOSURE LETTER
United Pumps of America, Inc. Share Purchase Agreement

Von: APS GmbH ("Verkäufer")  
An: Industrial Partners LLC ("Käufer")
Datum: Tag 14
Betreff: Offenlegung wesentlicher Sachverhalte

1. FINANZIELLE SACHVERHALTE

1.1 ABWEICHUNGEN VON GEPLANTEN ZAHLEN:
□ Q4 2024 Umsatz liegt ca. 8% unter Plan (4,1 Mio statt 4,5 Mio USD)
□ EBITDA Q4 2024: 520k USD (Plan: 680k USD)  
□ Working Capital erhöht sich um 340k USD durch Lageraufbau

1.2 OFFENE FORDERUNGEN:
Zweifelhafte Forderung: Petro-Dynamics Corp. (145k USD, überfällig 120 Tage)
Rechtsverfolgung eingeleitet, Einbringung unsicher

1.3 RÜCKSTELLUNGEN:
Warranty-Rückstellungen erhöht um 85k USD für Chargen-Probleme Aug/Sept 2024
Mögliche EPA-Strafe: 25k USD (Umweltauflagen, Verhandlung läuft)

2. RECHTLICHE SACHVERHALTE

2.1 LAUFENDE RECHTSSTREITIGKEITEN:
FALL A: Gulf Coast Industries vs United Pumps
Streitwert: 280k USD
Sachverhalt: Behaupteter Qualitätsmangel Offshore-Pumpen
Status: Vergleichsverhandlungen (Settlement 120k USD wahrscheinlich)

FALL B: Arbeitsrechtliche Klage Ex-Mitarbeiter Rodriguez
Streitwert: 45k USD  
Sachverhalt: Behauptete Diskriminierung
Status: Mediation Q1/2025

2.2 BEHÖRDLICHE VERFAHREN:
EPA-Untersuchung: Abwassergrenzwerte Juli 2024 einmalig überschritten
Status: Voluntary remediation program, Strafe max. 25k USD

3. OPERATIVE SACHVERHALTE

3.1 SCHLÜSSELPERSONAL:
CTO David Miller: Hat informell Interesse an Wechsel zu APS GmbH geäußert
Retention kritisch, da Produkt-Know-how-Träger

Sales Director Jennifer Park: Exklusivvertrag läuft März 2025 aus
Verhandlungen über Verlängerung noch nicht begonnen

3.2 KUNDENVERHÄLTNISSE:
ExxonMobil Subsea Division: Rahmenvertrag läuft Dezember 2025 aus
Renewal wahrscheinlich aber nicht garantiert
Umsatzvolumen: 1,8 Mio USD/Jahr

4. TECHNISCHE SACHVERHALTE

4.1 PRODUKTPROBLEME:
Offshore-Serie XR-2400: Intermittierendes Dichtungsproblem
Betroffene Einheiten: 23 Stück (Baujahr 2023-2024)  
Field-Fix entwickelt, aber Image-Schaden bei 3 Kunden
Warranty-Kosten: 340k USD (bereits reserviert)

4.2 IT-SYSTEME:
ERP-System Update überfällig (Version 2019, Support läuft 2025 aus)
Modernisierung nötig: geschätzte Kosten 120k USD

5. PERSONALANGELEGENHEITEN

5.1 EMPLOYEE COMMITTEE:
Hat Bedenken zu Verkauf geäußert
Forderungen: Job-Garantien, Beibehaltung Benefits

5.2 BENEFIT-PROGRAMME:
401k Plan: Underfunding von 145k USD (Market-Drop Q3/2024)
Health Insurance: Gruppenvertrag läuft Juni 2025 aus, +18% Prämien-Erhöhung

6. UMWELT

6.1 UMWELTALTLASTEN:
Historische Bodenkontamination (Vorgänger-Nutzung Gelände)
Monitored Natural Attenuation Program läuft
Jährliche Kosten: 25k USD, Ende: geschätzt 2028-2030

BESTÄTIGUNG:
Die vorstehenden Angaben sind nach bestem Wissen vollständig und richtig.

APS GmbH
[CEO Name], Geschäftsführer`
},

'employee_transfer_613a.pdf': {
 filename: 'employee_transfer_613a.pdf',
 title: 'Mitarbeiterübergang nach § 613a BGB - Information',
 type: 'document',
 content: `INFORMATION ZUM BETRIEBSÜBERGANG
§ 613a BGB - United Pumps of America, Inc.

An: Alle Mitarbeiter United Pumps of America
Von: APS GmbH Geschäftsführung / HR-Abteilung  
Datum: Tag 14

WICHTIGE INFORMATION ZU IHREN ARBEITSPLÄTZEN

Liebe Kolleginnen und Kollegen von United Pumps,

hiermit informieren wir Sie über den geplanten Verkauf der United Pumps of America, Inc. und die Auswirkungen auf Ihre Arbeitsverhältnisse.

1. DER VERKAUFSVORGANG

KÄUFER: Industrial Partners LLC
KAUFPREIS: 30 Millionen EUR
CLOSING: Geplant für Tag 35 (ca. 3 Wochen)
STATUS: Letter of Intent unterzeichnet

2. IHRE RECHTE NACH § 613a BGB

AUTOMATISCHER ÜBERGANG:
✓ Ihr Arbeitsvertrag geht automatisch auf den neuen Eigentümer über
✓ Alle Rechte und Pflichten bleiben bestehen
✓ Keine neue Probezeit
✓ Kündigungsschutz bleibt erhalten

KÜNDIGUNGSSCHUTZ VERSTÄRKT:
✓ Betriebsbedingte Kündigungen wegen des Übergangs sind unwirksam
✓ Erhöhter Kündigungsschutz für 1 Jahr nach Übergang

WIDERSPRUCHSRECHT:
Sie können dem Übergang binnen 1 Monat widersprechen
Bei Widerspruch: Arbeitsvertrag endet zum Übergangszeitpunkt
ABER: Wir raten davon ab, da neue Arbeitgeber sehr solide ist

3. WAS BLEIBT GLEICH?

ARBEITSVERTRÄGE:
□ Gehalt und Lohn unverändert
□ Arbeitszeiten bleiben bestehen  
□ Urlaubsansprüche übertragen sich vollständig
□ Betriebszugehörigkeit läuft weiter

SOZIALLEISTUNGEN:
□ Krankenversicherung läuft über
□ 401k-Plan wird übernommen
□ Betriebsrente: Anwartschaften bleiben erhalten
□ Life Insurance bleibt bestehen

ARBEITSPLATZ:
□ Standort Houston bleibt erhalten
□ Gleiche Tätigkeiten  
□ Gleiche Kollegen
□ Gleiche Vorgesetzten (zunächst)

4. WAS KANN SICH ÄNDERN?

POSITIV:
✓ Investitionen in moderne Technologie geplant
✓ Wachstumschancen durch neue Märkte
✓ Stabilere Finanzierung für Expansion

MÖGLICH:
? Neue Prozesse und Systeme (Verbesserungen)
? Zusätzliche Schulungen und Weiterbildung

AUSGESCHLOSSEN:
✗ Standortschließung
✗ Massenentlassungen wegen Übergang
✗ Verschlechterung der Arbeitsbedingungen im ersten Jahr

5. TIMELINE

TAG 14 (HEUTE):
□ Diese Information an alle Mitarbeiter
□ Beginn der 1-Monats-Widerspruchsfrist
□ Q&A-Session um 15:00 Uhr (Kantine)

TAG 35 (CLOSING):
□ Rechtsübergang vollzogen
□ Industrial Partners wird neuer Arbeitgeber

6. IHR NEUER ARBEITGEBER

INDUSTRIAL PARTNERS LLC:
□ Gegründet 2018, Sitz Frankfurt/Houston
□ Spezialisiert auf Industrieunternehmen
□ Portfolio: 12 Unternehmen, alle erfolgreich
□ Reputation: Faire Behandlung Mitarbeiter

PHILOSOPHIE:
"Wir investieren in Menschen und Technologie, nicht in Kostensenkung"

7. HÄUFIGE FRAGEN & ANTWORTEN

F: "Wird United Pumps nach Deutschland verlegt?"
A: Nein. Der Standort Houston bleibt das operative Zentrum.

F: "Werden deutsche Manager eingesetzt?"
A: Das bestehende Management-Team bleibt zunächst.

F: "Müssen wir Deutsch lernen?"
A: Nein. Englisch bleibt die Arbeitssprache. Deutsch-Kurse sind freiwillig.

F: "Wird es Entlassungen geben?"
A: Nicht betriebsbedingte wegen des Übergangs. Industrial Partners will alle 45 Arbeitsplätze erhalten.

F: "Was ist mit unserem Pension Plan?"
A: Alle Ansprüche bleiben bestehen. Industrial Partners übernimmt die Verpflichtungen vollständig.

8. ANSPRECHPARTNER

ARBEITSRECHTLICHE FRAGEN:
Sandra Williams, HR Director United Pumps
Tel: +1-713-xxx-xxxx

FACHLICHE FRAGEN ZUM NEUEN EIGENTÜMER:
Michael Thompson, CEO United Pumps  
Tel: +1-713-xxx-xxxx

DEUTSCHE SEITE (APS):
Klaus Weber,  HR APS GmbH
Tel: +49-xx-xxx-xxxx
Verfügbar via Video-Call

Diese Veränderung bedeutet einen Neuanfang mit besseren Perspektiven. United Pumps war immer ein besonderes Unternehmen - das wird es auch unter neuer Führung bleiben.

[CEO APS GmbH]                [HR Director United Pumps]

ANLAGEN:
- § 613a BGB Volltext  
- Informationen zu Industrial Partners LLC
- FAQ Extended Version
- Template Widerspruch (falls gewünscht)`
},

'escrow_agreement.pdf': {
 filename: 'escrow_agreement.pdf',
 title: 'Escrow-Vereinbarung United Pumps Verkauf',
 type: 'document',
 content: `ESCROW AGREEMENT

zwischen

APS GmbH ("Verkäufer")
Industrial Partners LLC ("Käufer")  
Deutsche Industrie- und Handelsbank Treuhand GmbH ("Escrow Agent")

Datum: Tag 14
Betreff: Escrow für United Pumps Share Purchase Agreement

1. ESCROW-BETRAG UND ZWECK

EINZAHLENDER BETRAG: EUR 3.000.000 (drei Millionen Euro)
QUELLE: Teil des Kaufpreises für United Pumps of America, Inc.
ZWECK: Absicherung von Gewährleistungsansprüchen und Garantien
LAUFZEIT: 12 Monate ab Closing-Datum

2. EINZAHLUNG UND VERWALTUNG

EINZAHLUNG:
Der Käufer überweist den Escrow-Betrag spätestens 2 Geschäftstage vor Closing auf das Treuhandkonto Nr. 4711-8815-2024.

VERZINSUNG:
Escrow-Betrag wird zu 2,0% p.a. verzinst (derzeit marktüblich)
Zinserträge gehören anteilig dem Verkäufer (75%) und Käufer (25%)

VERWALTUNG:
Deutsche Industrie- und Handelsbank Treuhand GmbH führt separates, zinstragendes Konto
Quartalsmäßige Reporting an beide Parteien

3. AUSZAHLUNGSKRITERIEN

VOLLSTÄNDIGE AUSZAHLUNG AN VERKÄUFER:
Nach 12 Monaten automatisch, WENN:
□ Keine berechtigten Claims gegen Gewährleistungen
□ Keine offenen Streitigkeiten
□ Keine bekannten potentiellen Ansprüche

TEILWEISE AUSZAHLUNG AN KÄUFER:
Bei berechtigten Claims nach Schadenseintritt:
□ Dokumentierter Schaden durch Gewährleistungsverletzung
□ 30 Tage Heilungsmöglichkeit für Verkäufer
□ Schriftliche Zustimmung beider Parteien ODER Schiedsspruch

4. GEWÄHRLEISTUNGSKATEGORIEN

ABGEDECKTE GEWÄHRLEISTUNGEN:
□ Finanzielle Garantien (Bilanz, GuV, Working Capital)
□ Rechtliche Garantien (keine verdeckten Verbindlichkeiten)
□ Steuerliche Garantien (ordnungsgemäße Abführungen)
□ Operative Garantien (Verträge, Lizenzen, Genehmigungen)

NICHT ABGEDECKT (separater Cap):
□ Fundamental Warranties (100% Kaufpreis-Haftung)
□ Umweltschäden vor Stichtag (separate Versicherung)

5. CLAIM-PROZESS

ANMELDUNG DURCH KÄUFER:
1. Schriftliche Claim Notice binnen 30 Tagen nach Kenntniserlangung
2. Detaillierte Darstellung Sachverhalt und Schadenberechnung  
3. Nachweis Kausalität zwischen Gewährleistungsverletzung und Schaden

REAKTION VERKÄUFER:
1. 30 Tage Prüfungszeit
2. Stellungnahme mit Anerkennung/Bestreitung
3. Bei Anerkennung: Heilungsversuch oder Zahlung
4. Bei Bestreitung: Verhandlungen oder Schiedsverfahren

6. SPEZIELLE REGELUNGEN

BAGATELLGRENZE:
Einzelne Claims unter EUR 10.000 werden nicht aus Escrow bedient

SAMMELGRENZE (BASKET):
Erste EUR 100.000 an Claims gehen zu Lasten Verkäufer
Erst ab EUR 100.001 greift Escrow (dann für vollen Betrag)

ZEITLICHE LIMITS:
Claims müssen binnen 12 Monaten nach Closing geltend gemacht werden
Ausnahme: Steuerliche Ansprüche (bis zur Verjährung)

7. KOSTEN UND GEBÜHREN

SETUP-KOSTEN:
□ Konto-Einrichtung: EUR 2.500 (einmalig)
□ Legal Review: EUR 1.500 (einmalig)
TOTAL Setup: EUR 4.500 (50:50 geteilt)

LAUFENDE KOSTEN:
□ Kontoführung: EUR 200/Monat
□ Reporting: EUR 100/Quartal
TOTAL pro Jahr: EUR 2.950 (50:50 geteilt)

8. BEENDIGUNG

REGULÄRE BEENDIGUNG (Tag +365):
1. Finale Abrechnung aller Zinsen
2. Abzug aller Kosten und offenen Claims
3. Auszahlung Restbetrag an Verkäufer binnen 5 Geschäftstagen

9. HAFTUNG UND RECHTSWAHL

ESCROW AGENT HAFTUNG:
□ Nur bei grober Fahrlässigkeit oder Vorsatz
□ Maximale Haftung: Höhe des Escrow-Betrags
□ Berufshaftpflicht-Versicherung: EUR 10 Mio.

RECHTSWAHL:
Deutsches Recht, Gerichtsstand xxx
Für Streitigkeiten zwischen Verkäufer/Käufer: Schiedsgericht DIS Frankfurt

Diese Escrow-Vereinbarung bietet faire Balance zwischen Käuferschutz und Verkäuferinteressen.

APS                   Industrial Partners      Deutsche Industrie- und Handelsbank Treuhand GmbH
[CEO Name]                [Managing Partner]       [Geschäftsführer]`
  },
  'compliance_dossier_summary.pdf': {
 filename: 'compliance_dossier_summary.pdf',
 title: 'Compliance-Dossier Summary - Stakeholder Package',
 type: 'document',
 content: `COMPLIANCE DOSSIER SUMMARY
APS GmbH - Stakeholder Information Package
Stand: Tag 14 | FINAL VERSION

EXECUTIVE SUMMARY:
APS GmbH hat in den letzten 14 Tagen ein umfassendes Compliance-Review durchgeführt. 
Alle relevanten Bereiche wurden auditiert, dokumentiert und bei Bedarf remediert.
Status: COMPLIANT in allen wesentlichen Bereichen.

1. GLEICHBEHANDLUNGS-COMPLIANCE

LIEFERANTEN-GLEICHBEHANDLUNG:
✓ Objektive Kategorisierung aller 250 Lieferanten
✓ Transparente Zahlungsreihenfolge nach Kritikalität
✓ Keine Bevorzugung durch persönliche Beziehungen
✓ Dokumentation aller Abweichungen von Standard-Regeln

BEWERTUNG: GRÜN ✓
Risiko Insolvenzanfechtung: MINIMAL
Whistleblower-Risiko: NIEDRIG

KUNDEN-GLEICHBEHANDLUNG:
✓ A/B/C-Kategorisierung nach objektiven Kriterien
✓ Service-Level entsprechend Kundenwert
✓ Keine unangemessene Bevorzugung einzelner Kunden

BEWERTUNG: GRÜN ✓
Kartellrechtliches Risiko: MINIMAL

2. WHISTLEBLOWER-SCHUTZ

PRÄVENTIVE MASSNAHMEN:
□ Sensible Bereiche identifiziert und überwacht
□ Vier-Augen-Prinzip bei kritischen Entscheidungen
□ Externe Beratung zu Compliance-Themen

WHISTLEBLOWER-POLICY:
□ Interne Meldestelle eingerichtet (HR + externe Ombudsstelle)
□ Schutz vor Repressalien garantiert
□ Anonyme Meldungsmöglichkeiten

BEWERTUNG: GRÜN ✓
System implementiert und funktionsfähig

3. DATENSCHUTZ (DSGVO/GDPR)

TECHNISCHE MASSNAHMEN:
✓ Verschlüsselung aller personenbezogenen Daten
✓ Zugriffskontrolle nach Need-to-know-Prinzip
✓ Backup-Systeme DSGVO-konform

ORGANISATORISCHE MASSNAHMEN:
✓ Datenschutzbeauftragter bestellt (extern)
✓ Verarbeitungsverzeichnis vollständig
✓ Mitarbeiter-Schulungen durchgeführt

BEWERTUNG: GRÜN ✓
Letzte Prüfung: Tag 12 durch externe Kanzlei

4. ARBEITSSCHUTZ & SICHERHEIT

ARBEITSSICHERHEIT:
✓ Gefährdungsbeurteilungen aktuell (alle Arbeitsplätze)
✓ Unterweisungen dokumentiert
✓ PSA vollständig

BRANDSCHUTZ:
✓ Brandschutzordnung aktuell
✓ Flucht- und Rettungspläne überarbeitet
✓ Brandschutzhelfer ausgebildet (12 Personen)

UMWELTSCHUTZ:
✓ Abfallentsorgung ordnungsgemäß dokumentiert
✓ Gewässerschutz: Keine Beanstandungen

BEWERTUNG: GRÜN ✓
Letzte BG-Prüfung: Ohne Beanstandungen

5. STEUER-COMPLIANCE

UMSATZSTEUER:
✓ Voranmeldungen pünktlich abgegeben
✓ Vorsteuer ordnungsgemäß dokumentiert

KÖRPERSCHAFTSTEUER:
✓ Jahresabschluss testiert
✓ Steuererklärung fristgerecht eingereicht

LOHNSTEUER:
✓ Monatliche Abführungen pünktlich
✓ Sozialversicherung ordnungsgemäß

BEWERTUNG: GRÜN ✓
Steuerberater: PWC München

6. KARTELLRECHT & WETTBEWERBSRECHT

PREISGESTALTUNG:
✓ Keine Preisabsprachen mit Wettbewerbern
✓ Konditionensysteme transparent und objektiv

LIEFERANTENVERHÄLTNISSE:
✓ Keine exklusiven Bezugsverpflichtungen ohne Rechtfertigung
✓ Lieferantenkonditionen marktüblich

BEWERTUNG: GRÜN ✓
Letzte Kartellrechts-Schulung: Q3/2024

7. GELDWÄSCHE-PRÄVENTION

KNOW YOUR CUSTOMER:
✓ Kundenstammdaten regelmäßig aktualisiert
✓ Screening gegen Sanktionslisten
✓ Unusual Transaction Monitoring

CASH-MANAGEMENT:
✓ Bargeschäfte minimiert (<10.000 EUR)
✓ Ungewöhnliche Zahlungsmuster-Erkennung

BEWERTUNG: GRÜN ✓
Geldwäschebeauftragter: Externer Rechtsanwalt

8. EXPORT-KONTROLLE & SANKTIONEN

DUAL-USE-GÜTER:
✓ Ausfuhrlisten regelmäßig geprüft
✓ Genehmigungspflichten beachtet

SANKTIONSRECHT:
✓ EU/US/UN-Sanktionslisten täglich gescreent
✓ Iran/Russland/Nordkorea: Keine Geschäfte

BEWERTUNG: GRÜN ✓
Letztes Update Sanktionslisten: Täglich automatisch

9. QUALITÄTS-COMPLIANCE

ISO 9001:2015:
✓ Zertifizierung gültig bis März 2026
✓ Jährliche Überwachungsaudits bestanden

PRODUKTHAFTUNG:
✓ CE-Kennzeichnung aller Produkte korrekt
✓ Konformitätserklärungen vollständig

BEWERTUNG: GRÜN ✓
Produkthaftpflicht: Deckung 10 Mio. EUR

10. CORPORATE GOVERNANCE

GESCHÄFTSFÜHRUNGS-COMPLIANCE:
✓ Sorgfaltspflichten ordnungsgemäß wahrgenommen
✓ Business Judgment Rule beachtet

INTERNE KONTROLLEN:
✓ Vier-Augen-Prinzip bei kritischen Entscheidungen
✓ Interne Revision (extern): Quartalsweise

BEWERTUNG: GRÜN ✓
Corporate Governance Rating: AA

GESAMTBEWERTUNG: EXCELLENT
Compliance-Score: 94/100 Punkte
Rechtliche Risiken: MINIMAL
Stakeholder-Confidence: HOCH

Dieses Dossier bestätigt: APS ist rechtlich sauber aufgestellt und für alle Stakeholder ein verlässlicher Partner.`
},

'whistleblower_protection_protocol.docx': {
 filename: 'whistleblower_protection_protocol.docx',
 title: 'Whistleblower-Schutzprotokoll - Systematischer Ansatz',
 type: 'document',
 content: `WHISTLEBLOWER-SCHUTZPROTOKOLL
APS GmbH | Systematischer Schutz vor Repressalien
Version: 2.0 | Datum: Tag 14

GRUNDSÄTZE:
APS fördert eine offene Kommunikationskultur, in der Missstände angesprochen werden können, ohne Repressalien befürchten zu müssen.

1. RECHTLICHE GRUNDLAGEN

EU-WHISTLEBLOWER-RICHTLINIE 2019/1937:
□ Schutz vor Vergeltungsmaßnahmen
□ Vertrauliche Meldewege  
□ Angemessene Follow-up-Verfahren
□ Rechtschutz für Hinweisgeber

DEUTSCHES HINWEISGEBERSCHUTZGESETZ (HinSchG):
□ Interne Meldestellen verpflichtend (ab 50 MA)
□ Externe Meldestelle als Alternative
□ Identitätsschutz des Hinweisgebers
□ Beweislastumkehr bei Repressalien

2. SCHUTZBEREICH - MELDBARE VERSTÖSSE

KERNBEREICHE (EU-Richtlinie):
□ Vergabeverfahren und Wettbewerbsrecht
□ Finanzdienstleistungen und Geldwäscheprävention
□ Produktsicherheit und Verbraucherschutz
□ Verkehrssicherheit und Umweltschutz
□ Datenschutz und Datensicherheit

ERWEITERTE BEREICHE (APS-Selbstverpflichtung):
□ Arbeitsschutz und Arbeitssicherheit
□ Diskriminierung und Mobbing
□ Betrug und Korruption
□ IT-Sicherheit und Cyber-Risiken

3. MELDEWEGE UND KANÄLE

INTERNE MELDESTELLE:
Hinweisgeber-Portal: https://compliance.aps-gmbh.de
□ 24/7 online verfügbar
□ Verschlüsselte Kommunikation
□ Anonyme Meldung möglich

Telefonische Hotline: 0800-HINWEIS-1
□ Montag-Freitag 08:00-18:00 Uhr
□ Externe Annahme durch Rechtsanwaltskanzlei
□ Mehrsprachig (DE/EN)

EXTERNE MELDESTELLE:
□ Bundesamt für Justiz (BfJ)
□ Datenschutzbehörden
□ Staatsanwaltschaft (bei Straftaten)

4. IDENTITÄTSSCHUTZ UND VERTRAULICHKEIT

GRUNDSATZ:
Die Identität des Hinweisgebers wird streng vertraulich behandelt und nur mit dessen ausdrücklicher Zustimmung preisgegeben.

PRAKTISCHE UMSETZUNG:
□ Separate Aktenführung durch externen Anwalt
□ Zugriff nur für autorisierte Compliance-Verantwortliche
□ Pseudonymisierung in internen Berichten
□ Verschlüsselte Kommunikation

5. VERFAHRENSABLAUF

EINGANG DER MELDUNG (Tag 0):
□ Automatische Empfangsbestätigung
□ Zuweisung Bearbeitungskennung
□ Erstbewertung durch Compliance Officer

ERSTE BEWERTUNG (Tag 1-7):
□ Plausibilitätsprüfung
□ Rechtliche Bewertung
□ Schutzmaßnahmen für Hinweisgeber prüfen

UNTERSUCHUNG (Tag 8-84):
□ Interne Ermittlungen durch externe Kanzlei
□ Zwischenbericht an Hinweisgeber (Tag 42)

ABSCHLUSS (bis Tag 90):
□ Abschlussbericht mit Empfehlungen
□ Rückmeldung an Hinweisgeber

6. SCHUTZ VOR REPRESSALIEN

VERBOTENE VERGELTUNGSMASSNAHMEN:
✗ Kündigung oder Versetzung
✗ Degradierung oder Gehaltskürzung
✗ Mobbing oder Ausgrenzung
✗ Negative Leistungsbeurteilungen
✗ Rufschädigung oder Diskriminierung

SCHUTZGMASSNAHMEN:
□ Monitoring des Arbeitsumfelds
□ Mediation bei Konflikten
□ Versetzung auf Wunsch (ohne Nachteile)
□ Rechtliche Unterstützung

7. RECHTLICHER SCHUTZ

ANSPRÜCHE DES HINWEISGEBERS:
□ Unterlassung von Repressalien
□ Schadensersatz bei Vergeltungsmaßnahmen
□ Wiederherstellung des status quo ante

RECHTSDURCHSETZUNG:
□ Kostenlose Rechtsberatung durch APS-Anwalt
□ Prozesskostenhilfe bei Gerichtsverfahren
□ Mediation als Alternative

8. QUALITÄTSSICHERUNG

REGELMÄSSIGE EVALUIERUNG:
□ Quartalsweise Bewertung aller Fälle
□ Jährlicher Compliance-Report
□ Externe Audits durch Rechtsanwaltskanzlei

KONTINUIERLICHE VERBESSERUNG:
□ Anpassung Verfahren basierend auf Erfahrungen
□ Schulung und Sensibilisierung Mitarbeiter
□ Technische Weiterentwicklung Meldesysteme

9. KOMMUNIKATION UND SENSIBILISIERUNG

MITARBEITER-INFORMATION:
□ Intranet-Portal mit allen Informationen
□ Jährliche Pflichtschulung (90 Min)
□ Welcome Package für neue Mitarbeiter

FÜHRUNGSKRÄFTE-SENSIBILISIERUNG:
□ Spezielle Schulung zu Repressalien-Verbot
□ Integration in Leadership-Programme
□ Persönliche Haftung bei Verstößen

10. DOKUMENTATION UND ARCHIVIERUNG

AKTENFÜHRUNG:
□ Separate Compliance-Akten (10 Jahre Aufbewahrung)
□ Verschlüsselte digitale Archivierung
□ Zugriffskontrolle und Audit-Trail

BERICHTSWESEN:
□ Anonymisierte Quartalsberichte an Geschäftsführung
□ Jährlicher Compliance-Report an Gesellschafter

Diese Protokoll wird regelmäßig überprüft und angepasst.

Compliance Officer         Geschäftsführer
(extern)                   APS GmbH

NOTFALLKONTAKTE:
Compliance-Hotline: 0800-HINWEIS-1
Online-Portal: https://compliance.aurion-ps.com
Externe Ombudsstelle: Dr. Schmidt & Partner Rechtsanwälte
Notfall: +49-172-xxx-xxxx`
},

'dsfa_assessment_final.pdf': {
 filename: 'dsfa_assessment_final.pdf',
 title: 'Datenschutz-Folgenabschätzung Final Assessment',
 type: 'document',
 content: `DATENSCHUTZ-FOLGENABSCHÄTZUNG (DSFA)
APS GmbH | Final Assessment Tag 14
Gemäß Art. 35 DSGVO

EXECUTIVE SUMMARY:
Nach umfassender Bewertung aller Datenverarbeitungsprozesse wurden Risiken identifiziert und durch geeignete Maßnahmen auf akzeptables Niveau reduziert. 
GESAMTRISIKO: NIEDRIG BIS MITTEL

1. ANLASS UND UMFANG DER DSFA

AUSLÖSER:
□ Einführung neuer CRM-Systeme
□ Erweiterung Videoüberwachung (Sicherheit)  
□ Employee Monitoring Tools (Arbeitszeit/Produktivität)
□ Whistleblower-Portal mit Personenbezug
□ Kundendatenanalyse für Vertriebsoptimierung

BEWERTUNGSZEITRAUM: Tag 1-14
NEXT REVIEW: Q2/2025
VERANTWORTLICHER: Datenschutzbeauftragter Dr. Müller (extern)

2. BETROFFENE VERARBEITUNGEN

HOCHRISIKO-VERARBEITUNGEN:
1. Mitarbeiter-Performance-Monitoring
  - Arbeitszeit-Tracking via Software
  - Produktivitätsmessung Produktion
  - E-Mail/Internet-Monitoring (stichprobenartig)

2. Kundenprofiling und -scoring
  - Kaufverhalten-Analyse
  - Bonitätsprüfung automatisiert
  - Predictive Analytics

3. Whistleblower-System
  - Melderdaten hochsensibel
  - Ermittlungsdaten zu Beschuldigten
  - Externe Dienstleister eingebunden

3. RISIKOANALYSE HOCHRISIKO-BEREICHE

3.1 MITARBEITER-MONITORING

RISIKEN:
⚠ Überwachungsdruck und Stress
⚠ Persönlichkeitsprofile durch Verhalten
⚠ Diskriminierung bei Leistungsunterschieden

WAHRSCHEINLICHKEIT: Mittel
SCHWERE: Hoch
GESAMTRISIKO: Hoch → MITTEL (nach Maßnahmen)

SCHUTZGMASSNAHMEN:
□ Betriebsvereinbarung mit detaillierten Regeln
□ Opt-Out für nicht-sicherheitsrelevante Bereiche
□ Anonymisierung/Pseudonymisierung wo möglich
□ Zweckbindung: Nur Arbeitssicherheit/Prozessoptimierung
□ Regelmäßige Löschung (6 Monate)

3.2 KUNDENPROFILING

RISIKEN:
⚠ Diskriminierung bestimmter Kundengruppen
⚠ Automatisierte Entscheidungen ohne menschliche Prüfung
⚠ Profilbildung über Business-Zweck hinaus

WAHRSCHEINLICHKEIT: Niedrig
SCHWERE: Mittel  
GESAMTRISIKO: Niedrig

SCHUTZGMASSNAHMEN:
□ Transparente Information über Scoring
□ Widerspruchsrecht implementiert
□ Menschliche Prüfung bei kritischen Entscheidungen
□ Algorithmus-Auditing quartalsweise
□ Zweckbindung: Nur Vertragsanbahnung/Risikobewertung

3.3 WHISTLEBLOWER-PORTAL

RISIKEN:
⚠ De-Anonymisierung durch Kombination von Daten
⚠ Zugriff Unbefugter auf sensible Vorwürfe
⚠ Repressalien bei Bekanntwerden

WAHRSCHEINLICHKEIT: Mittel
SCHWERE: Sehr hoch
GESAMTRISIKO: Hoch → NIEDRIG (nach Maßnahmen)

SCHUTZGMASSNAHMEN:
□ Ende-zu-Ende-Verschlüsselung
□ Externes Hosting bei spezialisierten Dienstleistern
□ Strenge Zugriffskontrolle (nur 2 Personen)
□ Pseudonymisierung in allen internen Berichten
□ Separate Aktenführung durch Anwaltskanzlei
□ Automatische Löschung nach Abschluss

4. TECHNISCHE UND ORGANISATORISCHE MASSNAHMEN

VERSCHLÜSSELUNG:
□ Daten in Ruhe: AES-256
□ Daten in Übertragung: TLS 1.3
□ Backups: Vollverschlüsselung

ZUGRIFFSKONTROLLE:
□ Rollenbasierte Berechtigungen
□ Multi-Faktor-Authentifizierung
□ Privileged Access Management

DATENSICHERHEIT:
□ Firewall und IDS/IPS aktiv
□ Anti-Malware auf allen Systemen
□ Regelmäßige Sicherheitsupdates

5. BETROFFENENRECHTE

INFORMATION UND TRANSPARENZ:
□ Datenschutzerklärung klar und verständlich
□ Proaktive Information bei Änderungen
□ Mehrsprachige Informationen (DE/EN)

BETROFFENENRECHTE-MANAGEMENT:
□ Zentrales Request-Portal
□ Standardisierte Prozesse für alle Rechte
□ Reaktionszeiten: <1 Monat (Regel: 2 Wochen)

6. INTERNATIONALE DATENTRANSFERS

USA (United Pumps):
□ Standard Contractual Clauses (SCCs)
□ Transfer Impact Assessment durchgeführt
□ Zusätzliche Schutzmaßnahmen implementiert

7. RISIKOBEHANDLUNG - MASSNAHMENPLAN

PRIORITÄT 1 (bis Ende Q1/2025):
□ Betriebsvereinbarung Mitarbeiter-Monitoring
□ Whistleblower-Portal Security-Audit
□ Kundenprofiling Transparenz-Initiative

PRIORITÄT 2 (bis Ende Q2/2025):
□ Automatisierte Betroffenenrechte-Tools
□ Advanced Encryption Key Management
□ Cross-Border Transfer Governance

8. MONITORING UND KONTINUIERLICHE BEWERTUNG

METRIKEN:
□ Betroffenenrechte-Anfragen (Anzahl/Art/Zeit)
□ Datenschutzverletzungen (Anzahl/Schwere)
□ Schulungsteilnahme und -erfolg

REGELMÄSSIGE REVIEWS:
□ Monatlich: Incident Review und Metriken
□ Quartalsweise: Risikobewertung Update
□ Halbjährlich: Vollständige DSFA-Überprüfung

9. KOSTEN-NUTZEN-BEWERTUNG

KOSTEN DATENSCHUTZ-MASSNAHMEN:
Setup: 45.000 EUR
Laufend: 28.000 EUR/Jahr

NUTZEN/RISIKO-REDUKTION:
□ Vermeidung Bußgelder (bis 4% Jahresumsatz)
□ Vertrauensgewinn bei Kunden
□ Wettbewerbsvorteil durch Privacy-First-Ansatz

10. FAZIT UND EMPFEHLUNGEN

GESAMTRISIKO NACH MASSNAHMEN: NIEDRIG BIS MITTEL
Alle identifizierten Hochrisiko-Bereiche wurden durch geeignete Maßnahmen auf akzeptables Niveau reduziert.

ZENTRALE EMPFEHLUNGEN:
1. Mitarbeiter-Monitoring: Betriebsvereinbarung zwingend erforderlich
2. Whistleblower-System: Sicherheitsaudits intensivieren  
3. Kundendaten: Transparenz-Initiative starten
4. Awareness: Schulungsprogramm ausbauen

Diese DSFA bestätigt: APS nimmt Datenschutz ernst und hat angemessene Schutzmaßnahmen implementiert.

Dr. Müller               [CEO Name]
Datenschutzbeauftragter  Geschäftsführer APS GmbH`
},

'escalation_paths_overview.pptx': {
 filename: 'escalation_paths_overview.pptx',
 title: 'Eskalationspfade Übersicht - Konfliktmanagement',
 type: 'presentation',
 content: `ESKALATIONSPFADE OVERVIEW
APS GmbH | Konfliktmanagement & Mediation

SLIDE 1: ESKALATIONSPYRAMIDE

LEVEL 4: EXTERNE MEDIATION
- Komplexe Führungsebenen-Konflikte
- Strategische Meinungsverschiedenheiten  
- Vertrauensverlust zwischen Stakeholdern
→ Professionelle Mediatoren, 15k EUR Budget

LEVEL 3: GESCHÄFTSFÜHRUNGS-EBENE
- Abteilungsleiter-Konflikte
- Grundsatzentscheidungen
- Eskalation aus Level 2
→ CEO-Intervention, finale Entscheidung

LEVEL 2: MANAGEMENT-INTERVENTION
- Team-übergreifende Konflikte
- Ressourcen-Konflikte
- Wiederholte Level-1-Eskalationen
→ Bereichsleiter-Mediation

LEVEL 1: DIREKTE KONFLIKTLÖSUNG
- Zwischenmenschliche Spannungen
- Aufgaben-/Zuständigkeitskonflikte
- Kommunikationsprobleme
→ Teamleiter-Moderation

SLIDE 2: HÄUFIGSTE KONFLIKTARTEN

RESSOURCEN-KONFLIKTE (35%):
- Budget-Verteilungskämpfe
- Personalkapazitäten
- Maschinen-/Equipment-Nutzung
- Prioritätensetzung Projekte

PROZESS-KONFLIKTE (28%):
- Schnittstellen-Probleme
- Verantwortlichkeits-Unklarheiten  
- Workflow-Störungen
- Qualitätsstandard-Diskussionen

BEZIEHUNGS-KONFLIKTE (22%):
- Persönliche Antipathien
- Kommunikations-Stil-Unterschiede
- Vertrauensverlust
- Mobbing-Vorwürfe

ZIEL-KONFLIKTE (15%):
- Strategische Ausrichtung
- Priorisierung Maßnahmen
- Change-Management-Widerstand

SLIDE 3: SPEZIALFALL CFO ↔ OPS

WURZELN DES KONFLIKTS:
- Verschiedene Prioritäten (Cost vs. Quality)
- Unterschiedliche Zeithorizonte
- Kommunikationsstile
- Stress der letzten 14 Tage

LÖSUNGSANSATZ:
□ Gemeinsame KPIs definieren
□ Wöchentlicher Jour Fixe
□ Job Rotation (1 Tag shadowing)
□ Externe Supervision (6 Monate)
□ Erfolgs-Bonus abhängig von Kooperation

SLIDE 4: LEVEL 1 - DIREKTE LÖSUNG

TEAMLEITER-TOOLBOX:
□ Vier-Augen-Gespräche
□ Moderierte Team-Meetings
□ Aufgaben-Neuverteilung
□ Kommunikations-Training

ERFOLGSQUOTE: 60%
DURCHSCHNITTSDAUER: 2 Wochen
KOSTEN: Personalzeit (ca. 8h)

SLIDE 5: LEVEL 2 - MANAGEMENT-INTERVENTION

BEREICHSLEITER-INSTRUMENTE:
□ Cross-funktionale Workshops  
□ Externe Moderation (1-2 Tage)
□ Prozess-Redesign
□ Umorganisation/Rollentausch

ERFOLGSQUOTE: 75%  
DURCHSCHNITTSDAUER: 4-6 Wochen
KOSTEN: 3.000-8.000 EUR

SLIDE 6: LEVEL 3 - CEO-INTERVENTION

GESCHÄFTSFÜHRUNGS-ANSÄTZE:
□ Strategische Neuausrichtung
□ Führungskräfte-Coaching
□ Strukturelle Änderungen
□ Personalentscheidungen

ERFOLGSQUOTE: 85%
DURCHSCHNITTSDAUER: 2-3 Monate  
KOSTEN: 5.000-15.000 EUR

SLIDE 7: LEVEL 4 - EXTERNE MEDIATION

MEDIATION IST SINNVOLL BEI:
□ Festgefahrenen Konflikten
□ Hoher emotionaler Belastung
□ Vertrauensverlust zum Management
□ Komplexen Mehr-Parteien-Konflikten

MEDIATIONS-PROZESS:
1. Auftrag klären (alle Parteien)
2. Einzelgespräche führen
3. Gemeinsame Sitzungen
4. Lösungsoptionen entwickeln
5. Vereinbarung treffen
6. Follow-up nach 3 Monaten

KOSTEN: 15.000 EUR Gesamtbudget
DAUER: 3-6 Monate
ERFOLGSQUOTE: 90%+

SLIDE 8: SUCCESS METRICS

QUANTITATIVE KPIs:
- Anzahl Eskalationen pro Quartal
- Durchschnittliche Lösungszeit
- Wiederholungsrate gelöster Konflikte
- Mitarbeiter-Zufriedenheit (Konfliktbereich)

ZIELWERTE 2025:
□ <5 Level-3-Eskalationen pro Quartal
□ 80% Konflikte auf Level 1 gelöst
□ <4 Wochen durchschnittliche Lösungszeit
□ >75% Zufriedenheit mit Konfliktlösung

SLIDE 9: NÄCHSTE SCHRITTE

SOFORT (Tag 15-21):
□ CFO-OPS Mediation beauftragen
□ Konflikt-Charta kommunizieren
□ Führungskräfte-Briefing Eskalationspfade

KURZFRISTIG (bis Q1/2025):
□ Konfliktlösungs-Training für alle Teamleiter
□ Mediation-Skills Workshop Führungskräfte
□ Etablierung regelmäßiger Konflikt-Reviews

MITTELFRISTIG (bis Q3/2025):
□ Zertifizierung interne Mediatoren
□ Konfliktkosten-Tracking implementieren
□ Präventions-Programme ausbauen

Diese strukturierte Herangehensweise verwandelt Konflikte von Risiken in Chancen zur Weiterentwicklung.`
},

'mediation_proposal.msg': {
 filename: 'mediation_proposal.msg',
 title: 'E-Mail Mediations-Angebot - Externe Fachkraft',
 type: 'email',
 content: `Von: Dr. Sarah Weber-Wildau <weber@mediationschmiede.de>
An: CEO APS <ceo@aurion-ps.com>
CC: HR-Leitung APS
Datum: Tag 14, 11:45 Uhr
Betreff: Mediations-Angebot CFO-OPS Konfliktlösung - 15k Paket

Sehr geehrter Herr [CEO],

vielen Dank für das Vertrauen und die Anfrage zur Mediation zwischen CFO und Head of Operations.

Nach unserem Telefonat hier mein detailliertes Angebot:

KONFLIKT-ASSESSMENT:
Die Spannungen zwischen Finanz- und Operationsbereich sind klassisch und in vielen Unternehmen anzutreffen. Verschärft durch die intensive 14-Tage-Krise sind hier emotionale und sachliche Ebenen vermischt.

Besondere Faktoren bei APS:
✓ Hoher Erfolgsdruck nach Turnaround
✓ Verschiedene Persönlichkeitstypen (analytisch vs. pragmatisch)
✓ Loyalität zum Unternehmen bei beiden vorhanden

PROGNOSE: Sehr gute Erfolgsaussichten (90%+)

MEIN ANSATZ - "COLLABORATIVE PROBLEM SOLVING":

PHASE 1: VERSTEHEN (Woche 1-2)
□ Einzelinterviews je 3 Stunden mit beiden Parteien
□ Stakeholder-Interviews (CEO, 2-3 Teammitglieder)
□ Konflikt-Mapping und Root-Cause-Analyse
□ Persönlichkeits- und Kommunikationsstil-Assessment

PHASE 2: ANNÄHERN (Woche 3-4)  
□ Erste gemeinsame Sitzung (Ganztag, neutral Location)
□ Strukturierte Kommunikation mit Mediation-Tools
□ Perspective-Taking-Exercises
□ Gemeinsame Zielklärung

PHASE 3: LÖSUNGEN ENTWICKELN (Woche 5-6)
□ Zweite gemeinsame Sitzung (Ganztag)
□ Creative Problem-Solving-Techniken
□ Win-Win-Lösungen erarbeiten
□ Konkrete Vereinbarung formulieren

PHASE 4: IMPLEMENTIEREN (Monat 2-7)
□ Monatliche Check-ins (je 2h, remote möglich)
□ Krisenintervention bei Rückfällen
□ Coaching bei neuen Herausforderungen
□ Erfolgs-Evaluation und Feintuning

BESONDERHEITEN MEINES ANSATZES:

BUSINESS-VERSTÄNDNIS:
□ 15 Jahre Erfahrung in Wirtschaftsmediation
□ Ehemalige Managerin bei Siemens (CFO-Bereich)
□ Verständnis für Zahlen UND operative Realitäten
□ Über 150 erfolgreich mediierte Unternehmenskonflikte

ERFOLGS-GARANTIE:
Sollten wir nach Phase 3 keine tragfähige Lösung finden, reduziert sich mein Honorar um 30%.

INVESTMENT UND LEISTUNGEN:

GESAMTPAKET: 15.000 EUR (zzgl. MwSt.)
□ 24h Mediation und Coaching
□ Alle Vor- und Nachbereitungen
□ 6 Monate Follow-up-Begleitung
□ Schriftliche Vereinbarung (rechtsicher)
□ Confidentiality Agreement (alles vertraulich)
□ Notfall-Hotline bei akuten Eskalationen

ZUSÄTZLICH KOSTENFREI:
□ Erstberatung und Konflikt-Assessment
□ Mediations-Raum in München (neutral)
□ Arbeitsunterlagen und Dokumentation

ZEITPLAN:
Start: Nächste Woche (Tag 22)
Ende Phase 3: Tag 50
Abschluss Follow-up: Tag 230

ERFOLG MESSEN - KONKRETE ZIELE:

Nach 8 Wochen:
□ Konstruktive Kommunikation ohne Dritte
□ Gemeinsame Problemlösungen statt Eskalation
□ Reduzierte Anspannung im gesamten Team
□ Klare Arbeitsvereinbarung zwischen beiden

Nach 6 Monaten:
□ Selbstständiges Konfliktmanagement
□ Gegenseitige Wertschätzung erkennbar
□ Synergien zwischen Bereichen genutzt
□ Vorbildfunktion für andere Führungskräfte

WARUM ICH DER RICHTIGE PARTNER BIN:

FACHLICHE KOMPETENZ:
□ Zertifizierte Mediatorin (BMWA/BM)
□ Master in Business Mediation (Viadrina)
□ Lehrbeauftragte an der TU München
□ Supervisorin für andere Mediatoren

PRAKTISCHE ERFAHRUNG:
□ 150+ erfolgreich mediierte Fälle
□ Spezialisierung auf C-Level-Konflikte
□ Branchen-Know-how Maschinenbau/Industrie
□ Krisensituations-Expertise

PERSÖNLICHE EIGENSCHAFTEN:
□ Empathisch aber direktiv wenn nötig
□ Humorvoll und entspannend
□ Diskret und vertrauensvoll
□ Lösungs- und ergebnisorientiert

REFERENZEN (mit Erlaubnis):
"Dr. Weber-Wildau hat unseren 2-jährigen Führungskräfte-Konflikt in 8 Wochen gelöst. Unsere Zusammenarbeit ist heute besser als vor der Krise." 
- CEO, MaschinenbauTech GmbH (150 MA)

NÄCHSTE SCHRITTE:
1. Zusage bis Tag 16 für optimalen Zeitplan
2. Kick-Off-Gespräch mit beiden Parteien (1h)
3. Einzeltermine koordinieren  
4. Mediation starten

PERSÖNLICHE NOTE:
Die Investition von 15k EUR ist minimal verglichen mit:
- Produktivitätsverlust durch Dauerspannung
- Risiko Personalverlust (Replacement-Kosten)
- Negative Ausstrahlung auf das gesamte Team

Lassen Sie uns das gemeinsam lösen. Ich freue mich auf die Zusammenarbeit!

Mit besten Grüßen

Dr. Sarah Weber-Wildau
Senior Mediatorin & Business Coach

P.S.: Als kleinen Bonus erhalten Sie von mir ein 2-stündiges "Konfliktprävention für Führungskräfte"-Training für Ihr gesamtes Management-Team kostenfrei dazu.`
},

'communication_guidelines_final.pdf': {
 filename: 'communication_guidelines_final.pdf',
 title: 'Kommunikations-Leitlinien Final - Einheitliche Sprachregelung',
 type: 'document',
 content: `KOMMUNIKATIONS-LEITLINIEN APS GMBH
Finale Sprachregelung Post-Krise
Version: 3.0 | Tag 14 | VERTRAULICH

ZIELSETZUNG:
Einheitliche, professionelle und vertrauensbildende Kommunikation aller APS-Repräsentanten nach außen und innen.

1. GRUNDSÄTZE DER KOMMUNIKATION

AUTHENTIZITÄT:
✓ Ehrlich über Herausforderungen, stolz auf Erfolge
✓ Fakten statt Schönfärberei
✓ Lessons Learned kommunizieren statt verstecken

KONSISTENZ:
✓ Alle Sprecher verwenden gleiche Kernbotschaften
✓ Keine widersprüchlichen Aussagen
✓ Koordinierte Timing-Abstimmung

ZUKUNFTSORIENTIERUNG:
✓ Fokus auf Lösungen und Perspektiven
✓ Krise als Chance für Verbesserungen
✓ Positive Vision kommunizieren

2. AUTORISIERTE SPRECHER

EXTERN (Medien, Behörden, Öffentlichkeit):
1. CEO - Alle strategischen und krisen-relevanten Themen
2. CFO - Finanzielle Sachverhalte und Zahlen
3. Head of Operations - Operative/technische Themen
4. HR-Leitung - Personalangelegenheiten

NICHT AUTORISIERT:
✗ Alle anderen Mitarbeiter für externe Statements
✗ Social Media Posts ohne Freigabe
✗ Interviews ohne Abstimmung

3. KERNBOTSCHAFTEN - MASTER MESSAGES

HAUPTBOTSCHAFT:
"APS ist stärker aus der Krise hervorgegangen und bestens für die Zukunft aufgestellt."

UNTERSTÜTZENDE BOTSCHAFTEN:

STABILITÄT:
"Die 14-tägige Stabilisierungsphase war erfolgreich. Alle finanziellen und operativen Ziele wurden erreicht."

QUALITÄT:
"Unsere Qualitätsoffensive zeigt messbare Erfolge. Defektrate halbiert, Kundenzufriedenheit deutlich gesteigert."

TEAM:
"Unser Team hat Außergewöhnliches geleistet. 287 Arbeitsplätze sind nicht nur sicher, sondern haben Perspektiven."

ZUKUNFT:  
"Mit dem United Pumps-Verkauf fokussieren wir uns auf unser profitabelstes Geschäft und schaffen Raum für Wachstum."

4. THEMEN-SPEZIFISCHE SPRACHREGELUNGEN

4.1 UNITED PUMPS VERKAUF

POSITIVE FORMULIERUNG:
✓ "Strategische Neuausrichtung auf Kernkompetenzen"
✓ "United Pumps erhält spezialisierten Eigentümer"  
✓ "Fokussierung schafft Wachstumschancen"
✓ "Win-Win-Situation für alle Beteiligten"

VERMEIDEN:
✗ "Notverkauf" oder "Verkauf unter Druck"
✗ "Trennung" oder "Abstoßung"
✗ "Finanzielle Zwangslage"

4.2 FINANZIELLE SITUATION

POSITIVE FORMULIERUNG:
✓ "Liquide und stabile Finanzierung gesichert"
✓ "Alle Zahlungsverpflichtungen erfüllt"
✓ "Bankenvertrauen durch Transparenz gestärkt"
✓ "Solide Basis für nachhaltiges Wachstum"

VERMEIDEN:
✗ "Liquiditätskrise" oder "Geldprobleme"
✗ "Banken-Ultimatum" oder "Zahlungsschwierigkeiten"

5. KRISENHAFTE THEMEN - DEFENSIVE KOMMUNIKATION

BEI KRITISCHEN FRAGEN:

SCHRITT 1: Acknowledge (Anerkennen)
"Wir verstehen diese Sorge/Frage..."

SCHRITT 2: Bridge (Überleiten)
"Wichtig ist jedoch..."

SCHRITT 3: Message (Kernbotschaft)
"...dass wir heute stärker dastehen als vor der Krise."

BEISPIELE:

FRAGE: "War APS nicht kurz vor der Insolvenz?"
ANTWORT: "Wir hatten eine herausfordernde Phase. Wichtig ist jedoch, dass wir durch professionelles Krisenmanagement alle Probleme gelöst haben und heute finanziell stabil und zukunftsfähig aufgestellt sind."

FRAGE: "Werden weitere Unternehmensteile verkauft?"
ANTWORT: "Der United Pumps-Verkauf war eine strategische Entscheidung zur Fokussierung. Unser Kerngeschäft bleibt vollständig bei APS und wird ausgebaut."

6. Q&A - HÄUFIGE FRAGEN UND ANTWORTEN

F: "Ist APS jetzt wirklich stabil?"
A: "Ja. Alle finanziellen und operativen Kennzahlen bestätigen unsere Stabilität. Die Bank steht voll hinter uns."

F: "War die Krise vermeidbar?"
A: "Rückblickend hätten wir einige Entwicklungen früher erkennen können. Wichtig ist: Wir haben gelernt und Frühwarnsysteme etabliert."

F: "Wie geht es den Mitarbeitern?"
A: "Unser Team ist stolz auf das Erreichte. Die Herausforderung hat uns zusammengeschweißt. Alle Arbeitsplätze sind sicher."

F: "Ist APS noch ein zuverlässiger Partner?"
A: "Mehr denn je. Die Krise hat gezeigt: Wir halten zusammen und liefern auch unter schwierigsten Bedingungen."

Diese Leitlinien sind für alle APS-Mitarbeiter verbindlich. Bei Unsicherheiten: Lieber einmal zu viel fragen als einen Fehler machen.

Head of Communications     CEO
                           APS GmbH`
},

'qa_template_external.docx': {
 filename: 'qa_template_external.docx',
 title: 'Q&A Template für externe Kommunikation',
 type: 'document',
 content: `Q&A TEMPLATE - EXTERNE KOMMUNIKATION
APS GmbH | Standardisierte Antworten für Stakeholder
Version: Final | Tag 14

VERWENDUNGSZWECK:
Dieses Template dient allen autorisierten Sprechern als Basis für einheitliche, konsistente Kommunikation mit externen Stakeholdern.

WICHTIGE HINWEISE:
- Immer bei den Kernbotschaften bleiben
- Keine Spekulationen oder Prognosen ohne Datenbasis
- Bei Unklarheiten: "Das prüfen wir und kommen auf Sie zurück"
- Positive Grundhaltung beibehalten

KATEGORIEN:

A) ALLGEMEINE UNTERNEHMENSLAGE
B) FINANZIELLE SITUATION  
C) UNITED PUMPS VERKAUF
D) MITARBEITER UND ARBEITSPLÄTZE
E) OPERATIVE ENTWICKLUNG
F) ZUKUNFTSAUSRICHTUNG

=== KATEGORIE A: ALLGEMEINE UNTERNEHMENSLAGE ===

F: "Wie ist die aktuelle Lage bei APS?"
STANDARD-ANTWORT: "APS hat eine erfolgreiche Stabilisierungsphase abgeschlossen und steht heute solider da als vor der Herausforderung. Alle wesentlichen Ziele wurden erreicht - von der Liquiditätssicherung bis zur Qualitätsverbesserung."
VERTIEFUNG BEI NACHFRAGE: "Die vergangenen 14 Tage haben gezeigt, was in unserem Unternehmen steckt. Wir haben nicht nur reagiert, sondern proaktiv gehandelt."

F: "War APS wirklich in einer existenzbedrohenden Krise?"
STANDARD-ANTWORT: "Wir hatten zweifellos eine herausfordernde Phase mit temporären Liquiditätsengpässen. Entscheidend ist: Wir haben diese Phase durch professionelles Krisenmanagement erfolgreich gemeistert und sind gestärkt daraus hervorgegangen."
VERMEIDEN: Begriffe wie "Beinahe-Insolvenz" oder "Existenzbedrohung"

=== KATEGORIE B: FINANZIELLE SITUATION ===

F: "Ist APS jetzt finanziell stabil?"
STANDARD-ANTWORT: "Ja, absolut. Unsere Liquidität ist gesichert, alle Covenant-Vereinbarungen mit der Bank werden eingehalten, und der United Pumps-Verkauf bringt zusätzlich 30 Millionen Euro. Unsere Finanzierung steht auf solidem Fundament."
FAKTEN ZUM BETONEN: Covenant-Einhaltung, Bankvertrauen, United Pumps-Deal

F: "Wie sieht es mit den Schulden aus?"
STANDARD-ANTWORT: "Unsere Verschuldung liegt im branchenüblichen Rahmen, und mit dem United Pumps-Verkauf reduzieren wir unsere Verbindlichkeiten deutlich. Die Bank unterstützt unsere Strategie vollumfänglich."

F: "Sind weitere Verkäufe geplant?"
STANDARD-ANTWORT: "Der United Pumps-Verkauf war eine strategische Entscheidung zur Fokussierung auf unser Kerngeschäft. Weitere Verkäufe sind nicht geplant - im Gegenteil, wir investieren in den Ausbau unserer Kernkompetenzen."

=== KATEGORIE C: UNITED PUMPS VERKAUF ===

F: "Warum verkaufen Sie United Pumps?"
STANDARD-ANTWORT: "United Pumps ist ein solides Unternehmen, erhält aber mit Industrial Partners einen Eigentümer, der sich vollständig auf diesen Markt fokussiert. Für APS bedeutet dies die Möglichkeit, unsere Ressourcen auf unser profitabelstes Kerngeschäft zu konzentrieren."
ERGÄNZUNG: "Es ist eine Win-Win-Situation: United Pumps bekommt bessere Entwicklungschancen, APS kann sich auf seine Stärken fokussieren."

F: "Ist der Verkaufspreis von 30 Millionen fair?"
STANDARD-ANTWORT: "Der Kaufpreis wurde auf Basis professioneller Unternehmensbewertungen ermittelt und liegt im fairen Marktbereich. Wichtiger als der absolute Betrag ist, dass wir damit unsere strategischen Ziele erreichen."

F: "Was passiert mit den United Pumps-Mitarbeitern?"
STANDARD-ANTWORT: "Alle Arbeitsplätze bei United Pumps bleiben erhalten. Die Mitarbeiter gehen geschützt durch das Betriebsübergangsgesetz zum neuen Eigentümer über - zu unveränderten Konditionen."

=== KATEGORIE D: MITARBEITER UND ARBEITSPLÄTZE ===

F: "Sind die Arbeitsplätze bei APS sicher?"
STANDARD-ANTWORT: "Ja. Alle 120 Arbeitsplätze im Kerngeschäft sind sicher. Wir planen sogar Neueinstellungen, da wir mit der Fokussierung auf profitable Bereiche Wachstumschancen sehen."
VERSTÄRKUNG: "Unser Team hat Außergewöhnliches geleistet. Diese Menschen sind unser wertvollstes Kapital."

F: "Wird es Gehaltskürzungen geben?"
STANDARD-ANTWORT: "Nein. Alle Tarifvereinbarungen werden eingehalten, das Weihnachtsgeld wird gezahlt. Bei erfolgreicher Entwicklung schauen wir, was darüber hinaus möglich ist."

F: "Wie ist die Stimmung in der Belegschaft?"
STANDARD-ANTWORT: "Unser Team ist stolz auf das Erreichte. Die gemeinsam gemeisterte Herausforderung hat uns als Unternehmen enger zusammengeschweißt. Die Mitarbeiter sehen die positiven Perspektiven."

=== KATEGORIE E: OPERATIVE ENTWICKLUNG ===

F: "Wie ist die aktuelle Qualitätssituation?"
STANDARD-ANTWORT: "Unsere Qualitätsoffensive zeigt beeindruckende Ergebnisse: Die Defektrate wurde um 42 Prozent reduziert, die Liefertreue liegt bei 94 Prozent, und die Kundenzufriedenheit ist deutlich gestiegen."
FAKTEN: Defektrate von 8,3% auf 4,8%, NPS von -8 auf +12

F: "Haben Sie Kunden verloren?"
STANDARD-ANTWORT: "Im Gegenteil - wir haben keinen einzigen A-Kunden verloren. Viele Kunden haben unser Krisenmanagement und die Qualitätsverbesserungen ausdrücklich gelobt."

F: "Wie steht es um die Lieferfähigkeit?"
STANDARD-ANTWORT: "Wir sind voll lieferfähig und haben sogar unsere Liefertreue verbessert. Für unsere A-Kunden haben wir eine 72-Stunden-Hypercare-Phase eingeleitet, um höchste Service-Standards zu gewährleisten."

=== KATEGORIE F: ZUKUNFTSAUSRICHTUNG ===

F: "Wie sehen Sie die Zukunft von APS?"
STANDARD-ANTWORT: "Sehr positiv. Wir haben nicht nur die Krise überwunden, sondern sind operativ besser geworden. Mit der Fokussierung auf unser profitabelstes Geschäft und der finanziellen Stabilität durch den United Pumps-Verkauf haben wir beste Voraussetzungen für profitables Wachstum."

F: "Welche Pläne haben Sie?"
STANDARD-ANTWORT: "Wir werden in drei Phasen vorgehen: Stabilisierung vertiefen, Transformation vorantreiben und dann expandieren. Konkret planen wir Investitionen in Digitalisierung, Qualität und neue Arbeitsplätze."

F: "Kommen externe Investoren ins Unternehmen?"
STANDARD-ANTWORT: "Wir führen Gespräche mit Investoren, aber aus einer Position der Stärke heraus. Jeder potenzielle Partner muss echten strategischen Mehrwert bringen. Wir haben Zeit und können wählerisch sein."

=== SCHWIERIGE/KRITISCHE FRAGEN ===

F: "Warum sollen wir APS noch vertrauen?"
STANDARD-ANTWORT: "Weil wir in den letzten 14 Tagen unter Beweis gestellt haben, was wir leisten können. Vertrauen entsteht durch Taten, nicht durch Worte - und die Zahlen sprechen für sich."

F: "War das Management überfordert?"
STANDARD-ANTWORT: "Wir haben aus einer herausfordernden Situation gelernt und sind heute ein besseres Management-Team. Wichtig ist nicht, ob man Fehler macht, sondern wie man daraus lernt und sie korrigiert."

F: "Ist APS noch wettbewerbsfähig?"
STANDARD-ANTWORT: "Mehr denn je. Wir sind operativ effizienter, qualitativ besser und finanziell stabiler als vor der Krise. Unsere Kunden bestätigen das durch ihre Treue und positive Rückmeldungen."

=== NOTFALL-ANTWORTEN ===

Bei unerwarteten oder sehr kritischen Fragen:

STANDARDREAKTION:
"Das ist eine wichtige Frage. Lassen Sie mich das prüfen und innerhalb von 24 Stunden mit einer fundierten Antwort auf Sie zurückommen."

NIEMALS SAGEN:
- "Kein Kommentar"
- "Das kann ich nicht beurteilen"
- "Dazu äußern wir uns nicht"
- Spekulationen über Worst-Case-Szenarien

IMMER ABSCHLIESSEN MIT:
"Was ich Ihnen aber versichern kann: APS steht heute stärker da als vor der Krise, und wir blicken zuversichtlich in die Zukunft."

=== KOMMUNIKATIONS-KANÄLE SPEZIFISCH ===

FÜR MEDIEN:
- Fakten prominent platzieren
- Positive Entwicklung betonen
- Konkrete Zahlen verwenden

FÜR KUNDEN:
- Servicequalität hervorheben
- Verlässlichkeit betonen
- Zukunftssicherheit vermitteln

FÜR PARTNER/LIEFERANTEN:
- Faire Behandlung dokumentieren
- Langfristige Perspektive aufzeigen
- Wachstumschancen kommunizieren

Dieses Template ist regelmäßig zu aktualisieren und an veränderte Umstände anzupassen.

LETZTE AKTUALISIERUNG: Tag 14
NÄCHSTE REVIEW: Tag 30`
},

'legal_clearance_checklist.xlsx': {
 filename: 'legal_clearance_checklist.xlsx',
 title: 'Legal Clearance Checklist - Finale Freigaben',
 type: 'spreadsheet',
 content: `LEGAL CLEARANCE CHECKLIST
APS GmbH | Tag 14 - Finale Rechtsfreigaben

ÜBERSICHT:
Alle wesentlichen rechtlichen Aspekte der Stabilisierungsphase und des United Pumps-Verkaufs werden systematisch geprüft und freigegeben.

STATUS-LEGENDE:
✓ = Geprüft und freigegeben
⚠ = Prüfung läuft / Auflagen
✗ = Nicht freigegeben / Nacharbeit nötig
📋 = Externe Beratung erforderlich

KATEGORIE A: GESELLSCHAFTSRECHT

A1 | Gesellschafterbeschlüsse United Pumps Verkauf | ✓
Status: Alle erforderlichen Beschlüsse gefasst
Prüfdatum: Tag 13
Anmerkung: Notarielle Beurkundung erfolgt bei Closing

A2 | Vollmachten Geschäftsführung | ✓
Status: Handlungsvollmacht für Verkauf bestätigt
Prüfdatum: Tag 12
Anmerkung: Satzungskonform, keine Beschränkungen

A3 | Compliance Organpflichten | ✓
Status: Alle Sorgfaltspflichten eingehalten
Prüfdatum: Tag 14
Anmerkung: Business Judgment Rule beachtet

KATEGORIE B: ARBEITSRECHT

B1 | Betriebsübergang United Pumps (§ 613a BGB) | ✓
Status: Mitarbeiterinformation erfolgt, Widerspruchsfrist läuft
Prüfdatum: Tag 14
Anmerkung: 45 MA betroffen, alle Formalien erfüllt

B2 | Betriebsratsanhörung | ✓
Status: BR ordnungsgemäß informiert und angehört
Prüfdatum: Tag 13
Anmerkung: Stellungnahme positiv, keine Einwände

B3 | Gleichbehandlungsgrundsatz Payroll | ✓
Status: Alle MA gleich behandelt, keine Diskriminierung
Prüfdatum: Tag 14
Anmerkung: Dokumentation vollständig

B4 | Kündigungsschutz während Krise | ✓
Status: Keine betriebsbedingten Kündigungen ausgesprochen
Prüfdatum: Laufend
Anmerkung: Vereinbarung mit BR eingehalten

KATEGORIE C: INSOLVENZRECHT

C1 | Insolvenzgründe-Monitoring | ✓
Status: Keine Insolvenzgründe gegeben
Prüfdatum: Tag 14
Anmerkung: Zahlungsfähigkeit, Überschuldung geprüft

C2 | Insolvenzanfechtung-Risiko | ✓
Status: Alle Zahlungen anfechtungssicher
Prüfdatum: Tag 13
Anmerkung: Gleichbehandlungsgrundsatz eingehalten

C3 | Gläubigerbenachteiligung | ✓
Status: Keine sittenwidrige Schädigung
Prüfdatum: Tag 14
Anmerkung: Objektive Kriterien bei Lieferantenzahlungen

KATEGORIE D: KAPITALMARKT-/FINANZRECHT

D1 | Kreditvertragsconformität | ✓
Status: Alle Covenants eingehalten
Prüfdatum: Tag 14
Anmerkung: Bank-Reporting aktuell und vollständig

D2 | Prospekthaftung United Pumps | ✓
Status: Disclosure Letter vollständig und korrekt
Prüfdatum: Tag 14
Anmerkung: Alle wesentlichen Sachverhalte offengelegt

D3 | Geldwäsche-Compliance | ✓
Status: KYC-Prozesse United Pumps Käufer erfüllt
Prüfdatum: Tag 12
Anmerkung: Industrial Partners LLC geprüft

KATEGORIE E: STEUERRECHT

E1 | Betriebsübergang Steuerneutralität | ⚠
Status: Prüfung durch Steuerberater läuft
Prüfdatum: Tag 15 (geplant)
Anmerkung: UmwStG-Konformität zu bestätigen

E2 | Umsatzsteuer M&A | ✓
Status: Keine USt-pflichtigen Lieferungen
Prüfdatum: Tag 13
Anmerkung: Share Deal = umsatzsteuerfrei

E3 | Körperschaftsteuer Veräußerungsgewinn | ✓
Status: Steuerbilanzielle Behandlung geklärt
Prüfdatum: Tag 13
Anmerkung: Teilfreistellung nach § 8b KStG

KATEGORIE F: DATENSCHUTZ/IT-RECHT

F1 | DSGVO-Compliance M&A | ✓
Status: Datentransfer USA rechtlich abgesichert
Prüfdatum: Tag 12
Anmerkung: Standard Contractual Clauses implementiert

F2 | Whistleblower-Portal Rechtssicherheit | ✓
Status: EU-Whistleblower-RL und HinSchG konform
Prüfdatum: Tag 14
Anmerkung: Externe Plattform zertifiziert

F3 | Mitarbeiterdatenübertragung | ✓
Status: § 613a BGB regelt Datenübertragung
Prüfdatum: Tag 14
Anmerkung: Automatischer Übergang, Info an MA erfolgt

KATEGORIE G: COMPLIANCE/KARTELLRECHT

G1 | Merger Control | ✓
Status: Keine Anmeldepflicht (Schwellen unterschritten)
Prüfdatum: Tag 11
Anmerkung: DE und EU Kartellrecht geprüft

G2 | Foreign Investment Control | ✓
Status: Keine sicherheitsrelevanten Bereiche
Prüfdatum: Tag 11
Anmerkung: AWG/AWV nicht anwendbar

G3 | Export Control Übergang | ✓
Status: ITAR/EAR-Konformität USA übertragbar
Prüfdatum: Tag 12
Anmerkung: United Pumps Export-Lizenzen bleiben gültig

KATEGORIE H: VERTRAGSRECHT

H1 | Change of Control Klauseln | ⚠
Status: 3 Verträge mit CoC-Klauseln identifiziert
Prüfdatum: Tag 13
Anmerkung: Consent-Prozess eingeleitet

H2 | Gewährleistungsausschlüsse | ✓
Status: Haftungsbegrenzungen marktüblich
Prüfdatum: Tag 14
Anmerkung: 30% Cap, 18 Monate Verjährung

H3 | Escrow-Vereinbarung | ✓
Status: Rechtlich wasserdicht strukturiert
Prüfdatum: Tag 14
Anmerkung: 3 Mio EUR, 12 Monate Laufzeit

KATEGORIE I: UMWELTRECHT

I1 | Environmental Due Diligence | ✓
Status: Keine wesentlichen Umweltverbindlichkeiten
Prüfdatum: Tag 10
Anmerkung: Phase I Assessment durchgeführt

I2 | Haftungsübergang Altlasten | ✓
Status: Verkäufer behält Haftung für Vorschäden
Prüfdatum: Tag 13
Anmerkung: Stichtag-Regelung im SPA

KATEGORIE J: LITIGATION/STREITIGKEITEN

J1 | Laufende Rechtsstreitigkeiten | ✓
Status: Alle Verfahren United Pumps offengelegt
Prüfdatum: Tag 14
Anmerkung: Disclosure Letter vollständig

J2 | Litigation-Risiken APS | ✓
Status: Keine wesentlichen Rechtsrisiken
Prüfdatum: Tag 13
Anmerkung: Präventive Maßnahmen greifen

Geschäftsführer APS Pumpen Systeme GmbH`
  }
};