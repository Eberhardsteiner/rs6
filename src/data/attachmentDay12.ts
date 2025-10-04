// src/data/attachmentDay12.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

// src/data/attachmentDay12.ts
export interface AttachmentContent {
 filename: string;
 title: string;
 type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
 content: string;
}

export const day12Attachments: Record<string, AttachmentContent> = {
 'd12_ceo_bank_review_agenda_tag12.pdf': {
   filename: 'd12_ceo_bank_review_agenda_tag12.pdf',
   title: 'Bank-Review Agenda - Waiver Milestone Meeting',
   type: 'document',
   content: `VERTRAULICH - NUR FÜR INTERNE VERWENDUNG

Vereinigte Kreditbank
Kreditabteilung Special Situations
Bernd Schuster


Datum: Tag 12 
Betreff: Zwischenprüfung Waiver-Vereinbarung - Agenda

Sehr geehrte Geschäftsführung,

zur heutigen Zwischenprüfung unserer Waiver-Vereinbarung vübersenden wir Ihnen die finale Agenda mit unseren Prüfschwerpunkten:

1. MEILENSTEIN-REVIEW (10:00 - 11:30 Uhr)
  - Erfüllungsgrad der definierten Milestones (MS1-MS8)
  - Evidenzprüfung der vorgelegten Nachweise
  - Diskussion kritischer Abweichungen
  - Zeitliche Verzögerungen und Recovery-Pläne

2. FINANCIAL PERFORMANCE (11:30 - 12:30 Uhr)
  - Ist-Zahlen vs. Forecast (Wochen 1-2)
  - Liquiditätsentwicklung und Cash-Conversion
  - Working Capital Management (DSO/DPO/DIO-Trends)
  - Sensitivitätsanalyse kritischer Annahmen

3. COVENANT COMPLIANCE (13:30 - 14:30 Uhr)
  - Current Ratio: Ist 1,18 vs. Min. 1,15 ✓
  - Debt Service Coverage: Ist 1,08 vs. Min. 1,05 ✓
  - EBITDA-Marge: Ist 4,2% vs. Min. 4,0% ✓
  - Minimum Liquidity: Ist 280k vs. Min. 250k ✓
  
4. STRUKTURELLE MASSNAHMEN (14:30 - 15:30 Uhr)
  - Status Carve-out-Prüfung (falls initiiert)
  - United Pumps of America - Term Sheet Review
  - Alternative Kapitalquellen
  - Strategische Partnerschaften

5. INFORMATION RIGHTS & NEXT STEPS (15:30 - 16:00 Uhr)
  - Erweiterte Reporting-Anforderungen?
  - Zusätzliche Trigger-Events?
  - Anpassung der Review-Frequenz?
  - 48h-Follow-up-Prozess

ERWARTETE UNTERLAGEN:
- Milestone-Tracking mit Owner & Deadlines
- Weekly Cash Flow (Ist vs. Plan)
- Kundenforderungen Aging-Report
- Lieferantenverbindlichkeiten nach Fälligkeit
- Management Commentary zu Abweichungen

TEILNEHMER BANK:
- Bernd Schuster, Dr. Iris Gerlach

Bitte beachten Sie: Die heutige Prüfung ist entscheidend für die Fortführung der bestehenden Linien. Unvollständige oder inkonsistente Informationen könnten zu zusätzlichen Auflagen oder Linienkürzungen führen.

Mit freundlichen Grüßen

ppa. Bernd Schuster ppa. Dr. Iris Gerlach


Anlage: Prüfkatalog mit 47 Einzelpositionen`
 },

 'd12_ceo_milestone_tracking_dashboard.xlsx': {
   filename: 'd12_ceo_milestone_tracking_dashboard.xlsx',
   title: 'Milestone Tracking Dashboard - Status Tag 12',
   type: 'spreadsheet',
   content: `MILESTONE TRACKING DASHBOARD - TAG 12
Letzte Aktualisierung: 09:45 Uhr

ÜBERSICHT ERFÜLLUNGSGRAD: 71% (Ziel: 75%)

ID | Milestone | Owner | Deadline | Status | Completion | Evidence | Bank-Kommentar
---|-----------|-------|----------|--------|------------|----------|----------------
MS1 | 13-Wochen-Liquiditätsplan | CFO | Tag 5 | COMPLETED | 100% | Vorliegend | "Qualität gut, Sensitivitäten fehlen"
MS2 | Kostensenkung 15% opex | CFO/OPS | Tag 10 | IN PROGRESS | 82% | Teilweise | "Nachweise für Umsetzung nötig"
MS3 | DSO Reduktion <45 Tage | CFO | Tag 12 | AT RISK | 65% | Aktuell: 52 Tage | "Kritisch - Maßnahmen?"
MS4 | Inventory Turn >8x | OPS | Tag 12 | ON TRACK | 88% | Aktuell: 7.8x | "Positive Entwicklung"
MS5 | A-Kunden-Retention 95% | CEO | Tag 10 | COMPLETED | 100% | 96% erreicht | "Sehr gut"
MS6 | Kurzarbeit-Implementation | HR | Tag 8 | COMPLETED | 100% | BA-Bescheid | "Konform"
MS7 | Lieferanten-Agreements | OPS | Tag 12 | IN PROGRESS | 70% | 7 von 10 | "3 kritische offen"
MS8 | Bank-Reporting Weekly | CFO | Laufend | ON TRACK | 100% | Woche 1&2 | "Pünktlich, Qualität OK"

KRITISCHE PFADE (NEXT 72h):
1. DSO-REDUKTION
  - Aktuelle Lücke: 7 Tage über Target
  - Maßnahme: Inkasso-Partner aktivieren
  - Owner: CFO / AR-Team
  - Review: Täglich 17:00 Uhr

2. LIEFERANTEN-AGREEMENTS  
  - Offen: Schmitt GmbH, TechParts AG, LogiExpress
  - Issue: Zahlungszielverkürzung gefordert
  - Eskalation: CEO-Call geplant heute 14:00
  
3. INVENTORY OPTIMIZATION
  - Gap to Target: 0.2 Turns
  - Quick Win: C-Artikel-Abverkauf
  - Potenzial: +50k Cash in 5 Tagen

RECOVERY ACTIONS:
- DSO: Factoring-Volumen um 200k erhöhen (Kosten: 3k)
- Lieferanten: Teil-Vorauszahlung anbieten (100k)
- Inventory: Flash-Sale B2B-Portal

DASHBOARD-METRIKEN:
Grün (>90%): 3 Milestones
Gelb (70-90%): 3 Milestones  
Rot (<70%): 2 Milestones

BANK OVERALL ASSESSMENT: "TEILWEISE ZUFRIEDENSTELLEND"
Empfehlung: Intensivierung der kritischen Themen, 48h-Update erforderlich`
 },

 'd12_ceo_bank_covenant_amendment_draft.docx': {
   filename: 'd12_ceo_bank_covenant_amendment_draft.docx',
   title: 'Entwurf Covenant-Ergänzung - Zusätzliche Auflagen',
   type: 'document',
   content: `AMENDMENT NO. 2 TO WAIVER AGREEMENT
(ENTWURF - VERTRAULICH)

Zwischen:
Vereinigte Kreditbank ("Bank")
und
Aurion Pumpen Systeme ("Kreditnehmer")

Datum: Tag 12 der Restrukturierung

PRÄAMBEL
Basierend auf der Zwischenprüfung vom heutigen Tage vereinbaren die Parteien folgende zusätzliche Auflagen zur bestehenden Waiver-Vereinbarung:

§1 ERWEITERTE INFORMATION RIGHTS
(1) Monthly Board Reporting
   Der Kreditnehmer verpflichtet sich, monatlich zum 5. Werktag einen Board-Report vorzulegen, der mindestens umfasst:
   - Management Summary (max. 2 Seiten)
   - Monats-GuV und Cash Flow
   - Forecast-Update (rollierend 3 Monate)
   - Top 5 Risiken und Mitigationsmaßnahmen
   - Status kritischer Projekte

(2) Ad-hoc Meldepflichten
   Unverzügliche Meldung (innerhalb 24h) bei:
   - Liquiditätsunterschreitung <300k
   - Kundenverlust >100k Jahresumsatz
   - Lieferantenkündigung (kritische Teile)
   - Abweichung Forecast >15%

§2 CAPEX-BESCHRÄNKUNGEN
(1) Capex-Freeze
   Investitionen >5k bedürfen der vorherigen schriftlichen Zustimmung der Bank
   Ausnahmen:
   - Sicherheitsrelevante Maßnahmen
   - Gesetzliche Anforderungen
   - Vorab genehmigte Maintenance-Liste

(2) Genehmigungsprozess
   - Antrag mit Business Case (ROI <12 Monate)
   - Bank-Entscheidung innerhalb 48h
   - Stillschweigende Genehmigung nach 72h

§3 STRUKTURELLE EINGRIFFE
(1) Veräußerungsvorbehalt
   Verkauf von Assets >50k nur mit Bank-Zustimmung
   Carve-out-Prüfungen sind zu dokumentieren

(2) Management-Kontinuität
   Änderungen in C-Level-Positionen meldepflichtig
   Nachbesetzung innerhalb 30 Tagen

§4 FINANCIAL COVENANTS (VERSCHÄRFT)
Ab sofort gelten folgende angepasste Grenzwerte:
- Current Ratio: ≥1,20 (vorher 1,15)
- DSCR: ≥1,10 (vorher 1,05)
- EBITDA-Marge: ≥5,0% (vorher 4,0%)
- Minimum Liquidity: ≥350k (vorher 250k)

Messung: Monatlich zum Ultimo
Grace Period: Einmalig 1 Monat
Heilung: Innerhalb 10 Werktagen

§5 ZUSÄTZLICHE FEES
(1) Waiver Monitoring Fee
   0,25% p.a. auf ausstehende Linien
   Zahlbar: Quartalsweise im Voraus
   Erstmals: Bei Unterzeichnung

(2) Amendment Fee
   Einmalig: 5.000 EUR
   Fällig: Bei Unterzeichnung

§6 LAUFZEIT UND REVIEW
- Gültigkeit: 6 Monate ab Unterzeichnung
- Nächste Review: Tag 30
- Automatische Verlängerung bei Covenant-Erfüllung

§7 SONSTIGES
Die übrigen Bestimmungen der ursprünglichen Vereinbarung bleiben unberührt. Im Konfliktfall gehen diese Ergänzungen vor.

UNTERSCHRIFTEN:

_______________________        _______________________
Für die Bank                    Für den Kreditnehmer

Anlagen:
- Maintenance-Capex-Liste
- Kritische Lieferanten-Liste
- Reporting-Templates`
 },

 'd12_ceo_kommunikationsplan_review.pptx': {
   filename: 'd12_ceo_kommunikationsplan_review.pptx',
   title: 'Kommunikationsplan Post-Review - 48h Roadmap',
   type: 'presentation',
   content: `KOMMUNIKATIONS-ROADMAP
Post-Review Tag 12 | STRENG VERTRAULICH

SLIDE 1: EXECUTIVE SUMMARY
Kernbotschaft: "Konstruktive Zwischenprüfung - Kurs bestätigt mit Nachschärfungen"

Key Messages:
✓ Hohe Meilenstein-Erfüllung 
✓ Liquiditätsaussichten ab D18 positiv bewertet
✓ Erste Erfolge bei Kostensenkung sichtbar
⚠ Zusätzliche Auflagen akzeptiert
⚠ Working Capital noch unter Plan

SLIDE 2: STAKEHOLDER-MATRIX & TIMING

SOFORT (0-2h):
► Führungskreis
 - Video-Call 16:30
 - Fakten + nächste Schritte
 - Q&A max. 15 Min

HEUTE (2-6h):
► Mitarbeiter
 - Email 17:00 Uhr
 - Townhall morgen 08:30
 - FAQ im Intranet

► Key Accounts (Top 10)
 - Persönlicher Call CEO
 - Kurz-Brief als Follow-up
 - "Business as usual" betonen

MORGEN (24h):
► Lieferanten (A-Kategorie)
 - Standard-Brief
 - Zahlungsstabilität bestätigen
 - Ansprechpartner benennen

► Betriebsrat
 - Sondersitzung 10:00
 - Kurzarbeit-Update
 - Keine weiteren Einschnitte

ÜBERMORGEN (48h):
► Bank/Beirat
 - Schriftliches Follow-up
 - Ergänzende Unterlagen
 - Next Review Prep

► Presse (bei Anfrage)
 - Holding Statement ready
 - Keine proaktive Kommunikation
 - Verweis auf Q1-Bericht

SLIDE 3: KERNBOTSCHAFTEN NACH ZIELGRUPPE

INTERN:
"Wir sind auf Kurs. Die Bank bestätigt unseren Weg. Jetzt kommt es auf jeden Einzelnen an, die gesetzten Ziele zu erreichen. Job-Sicherheit durch Performance."

KUNDEN:
"Die heutige Prüfung bestätigt unsere Stabilität. Lieferfähigkeit zu 100% gesichert. Wir investieren weiter in Qualität und Service. Ihr verlässlicher Partner - heute und morgen."

LIEFERANTEN:
"Liquidität für alle laufenden Verpflichtungen gesichert. Zahlungsziele werden eingehalten. Gemeinsam durch die Transformation. Faire Partnerschaft zahlt sich aus."

BANK:
"Commitment zu allen Auflagen. Transparenz und Übererfüllung als Ziel. Proaktive Kommunikation bei Abweichungen. Vertrauen durch Verlässlichkeit."

SLIDE 4: KRITISCHE Q&As

F: Drohen  Stellenstreichungen?
A: "Die aktuelle Kurzarbeitsregelung ist ausreichend. Bei Zielerreichung keine weiteren Personalmaßnahmen geplant."

F: Wie sicher ist die Finanzierung?
A: "Bank bestätigt Fortführung der Linien bei Meilenstein-Erfüllung."

F: Verkauft ihr Unternehmensteile?
A: "Wir prüfen alle strategischen Optionen. Fokus liegt auf organischem Turnaround. Keine Entscheidungen getroffen."

F: Warum zusätzliche Auflagen?
A: "Normale Praxis bei Zwischenprüfungen. Zeigt aktive Begleitung der Bank. Alle Auflagen sind erfüllbar."

SLIDE 5: KOMMUNIKATIONS-DONT'S

VERMEIDEN:
❌ Begriffe wie "Krise", "Rettung", "Survival"
❌ Schuldzuweisungen (Markt, Kunden, Vorgänger)
❌ Unrealistische Versprechen
❌ Details zu Carve-out-Überlegungen
❌ Interne Konflikte thematisieren
❌ Liquiditätszahlen nennen

SLIDE 6: SUCCESS MONITORING

KPIs für Kommunikationserfolg:
- Mitarbeiter-Pulse Check (Tag 13): Ziel >60% positiv
- Kündigungen Key Employees: Ziel 0
- Kundenstornos 48h: Ziel <50k
- Presseresonanz: Ziel neutral bis positiv
- Social Media Sentiment: Monitoring aktiv

VERANTWORTLICHKEITEN:
- CEO: Kunden-Calls, Führungskreis
- CFO: Bank-Follow-up, Zahlen
- HR: Interne Kommunikation, BR
- Corp Comm: Presse, Social Media

SLIDE 7: NOTFALL-PROTOKOLL

Bei negativen Entwicklungen:
1. Crisis Team aktivieren (CEO, CFO, HR, Legal)
2. Holding Statement anpassen
3. Beirat informieren
4. Bank proaktiv einbinden
5. Keine Einzelaktionen

Hotline für Führungskräfte: [560-760]
24/7 Erreichbarkeit Corp Comm: [800-888]

"EINE STIMME - EINE BOTSCHAFT - EIN TEAM"`
 },

 'd12_ceo_kundenbrief_entwurf.docx': {
   filename: 'd12_ceo_kundenbrief_entwurf.docx',
   title: 'Kundenbrief nach Bank-Review - Entwurf',
   type: 'document',
   content: `[BRIEFKOPF UNTERNEHMEN]

[Datum: Tag 12]

Betreff: Ihr verlässlicher Partner - Update zu unserer Unternehmensentwicklung

Sehr geehrte Geschäftspartner,

als Ihr langjähriger Partner möchten wir Sie über den aktuellen Stand unserer Restrukturierung informieren und Ihnen persönlich für Ihr Vertrauen danken.

POSITIVE ZWISCHENBILANZ

Heute fand eine planmäßige Überprüfung unserer Fortschritte mit unseren Finanzierungspartnern statt. Wir freuen uns, Ihnen mitteilen zu können:

- Unsere Lieferfähigkeit ist vollumfänglich gesichert
- Alle Kundenaufträge werden termingerecht bearbeitet
- Die Produktqualität bleibt auf gewohnt hohem Niveau
- Unsere Liquidität ist nachhaltig stabilisiert

Die eingeleiteten Maßnahmen zeigen bereits erste positive Effekte. Besonders erfreulich: 96% unserer A-Kunden haben ihre Verträge verlängert - ein starker Vertrauensbeweis.

IHRE VORTEILE

Durch unsere Optimierungen profitieren Sie direkt:

→ Straffere Prozesse = Kürzere Lieferzeiten
→ Fokus auf Kernkompetenzen = Besserer Service  
→ Digitale Tools = Transparentere Auftragsabwicklung
→ Stabilisierte Lieferketten = Höhere Verlässlichkeit

Konkret haben wir unsere Durchlaufzeiten um 15% reduziert und die Erstlösungsquote im Service um 20% gesteigert.

GEMEINSAMER BLICK NACH VORN

Die kommenden Wochen werden wir nutzen, um:

1. Das neue Kundenportal freizuschalten (ab Tag 20)
2. Express-Lieferoptionen zu erweitern
3. Dedizierte Ansprechpartner für Großkunden zu benennen
4. Qualitätszertifizierung ISO 9001:2015 abzuschließen

Wir verstehen, dass Veränderungen Fragen aufwerfen. Ihr persönlicher Ansprechpartner steht Ihnen jederzeit zur Verfügung:

[Key Account Manager Name]
Direktwahl: [Telefon]
E-Mail: [email]
Erreichbarkeit: Mo-Fr 7:00-19:00, Sa 8:00-12:00

UNSER VERSPRECHEN

✓ Keine Einschränkungen in Service und Qualität
✓ Alle vereinbarten Konditionen bleiben bestehen
✓ Investitionen in Ihre Zufriedenheit gehen weiter
✓ Transparente Kommunikation bei relevanten Entwicklungen

Für Rückfragen stehe ich Ihnen persönlich zur Verfügung. Gerne bespreche ich die Situation auch in einem persönlichen Gespräch.

Mit unternehmerischen Grüßen

[Name CEO]
Geschäftsführer



Anlagen:
- FAQ-Dokument
- Neue Service-Level-Agreements
- Kundenportal Zugangsguide`
 },

 'd12_ceo_carveout_preliminary_assessment.pdf': {
   filename: 'd12_ceo_carveout_preliminary_assessment.pdf',
   title: 'Carve-out Preliminary Assessment - VERTRAULICH',
   type: 'document',
   content: `STRENG VERTRAULICH - NUR FÜR GESCHÄFTSFÜHRUNG

PRELIMINARY CARVE-OUT ASSESSMENT
Management Summary

Erstellt von: Strategic Finance Team
Datum: Tag 12
Status: ERSTE EINSCHÄTZUNG - NICHT FINAL

EXECUTIVE SUMMARY

Die Bank hat die Prüfung weiterer struktureller Optionen angeregt. Diese erste Einschätzung identifiziert potenzielle Carve-out-Kandidaten ohne Präjudizierung einer Entscheidung.

1. METHODOLOGIE

Screening-Kriterien:
- Strategic Fit: Kerngeschäft vs. Randaktivitäten
- Financial Performance: EBITDA-Beitrag & Cash Generation
- Separability: Technische/operative Trennbarkeit
- Market Interest: Voraussichtliche Käufernachfrage
- Synergy Loss: Negative Effekte auf Restgeschäft

Bewertungsmatrix:
- Attraktivität (1-10)
- Komplexität (1-10)  
- Zeitrahmen (Wochen)
- Wertindikation (Mio. EUR)

2. IDENTIFIZIERTE KANDIDATEN

OPTION A: Kundenservice-SPARTE
Umsatz: 8 Mio. EUR p.a.
EBITDA: 0,6 Mio. EUR (7,5% Marge)
Mitarbeiter: 45 FTE
Assets: Fuhrpark (NBW 2,1 Mio.), WMS-Software

Bewertung:
+ Saubere Abgrenzung möglich
+ Interesse von 3 Logistikern signalisiert
+ Multiple 4-5x EBITDA realistisch
- Verlust interner Synergien (-200k EBITDA)
- Know-how in Route-Optimierung geht verloren

Wertindikation: 2,4-3,0 Mio. EUR
Zeithorizont: 8-10 Wochen

OPTION B: TOOL-MANAGEMENT-SERVICE
Umsatz: 4 Mio. EUR p.a.
EBITDA: 0,5 Mio. EUR (12,5% Marge)
Mitarbeiter: 20 FTE
Assets: Werkzeug-Pool (NBW 1,2 Mio.)

Bewertung:
+ Hohe Marge & Skalierbarkeit
+ Asset-Light-Geschäftsmodell
+ Strategischer Käufer identifiziert
- Enge Verzahnung mit Produktion
- Carve-out-Kosten ca. 150k

Wertindikation: 2,5-3,5 Mio. EUR
Zeithorizont: 10-12 Wochen

OPTION C: ENGINEERING-BÜRO OST
Umsatz: 3 Mio. EUR p.a.
EBITDA: 0,2 Mio. EUR (6,7% Marge)
Mitarbeiter: 25 FTE
Assets: CAD-Lizenzen, IP-Portfolio

Bewertung:
+ Regionale Abgrenzung klar
+ Management-Buy-Out möglich
- Niedrige Profitabilität
- Kundenverflechtungen komplex
- Retention-Risk bei Schlüsselpersonal

Wertindikation: 1,0-1,5 Mio. EUR
Zeithorizont: 12-16 Wochen

3. QUICK-WIN POTENZIAL

ASSET DEALS (OHNE CARVE-OUT):
- Sondermaschine Halle 3: 350k (Käufer vorhanden)
- Patent-Portfolio "Alt-Produkte": 200k
- Grundstück Nordseite: 800k (Bebauungsplan pending)
Gesamt: 1,35 Mio. EUR binnen 4 Wochen

4. PROZESSEMPFEHLUNG

Phase 1 (Tage 13-15): Interne Validierung
- Carve-out-Financials erstellen
- Dis-Synergien quantifizieren
- Legal Entity Check

Phase 2 (Tage 16-20): Markt-Sondierung
- Teaser erstellen (ohne Namen)
- Long-List potenzielle Käufer
- Erstgespräche führen

Phase 3 (Tage 21-30): Go/No-Go
- Indikative Angebote
- Bank-Abstimmung
- Entscheidungsvorlage GF

5. RISIKEN & MITIGATIONEN

RISIKEN:
⚠ Unruhe in Belegschaft → Kommunikation vorbereiten
⚠ Kundenverluste → Retention-Programm
⚠ Ablenkung Management → Externer Projektleiter
⚠ Bank-Erwartungen → Klare Timeline setzen
⚠ Wertvernichtung → Minimum-Preise definieren

KRITISCHE ERFOLGSFAKTOREN:
✓ Strikte Vertraulichkeit bis Phase 3
✓ Parallele Tracks (nicht sequenziell)
✓ Clean Team Setup für Due Diligence
✓ Story: "Fokussierung" statt "Notverkauf"

6. NÄCHSTE SCHRITTE

□ GF-Entscheidung über Vertiefung (heute)
□ Project Team nominieren (Tag 13)
□ Data Room Struktur (Tag 14)
□ Teaser-Entwurf (Tag 15)
□ Bank-Update (Tag 15)

ANHÄNGE:
- Bewertungsmatrix (Excel)
- Käufer-Long-List (vertraulich)
- Carve-out P&L Simulation
- Precedent Transactions

[ENDE DES DOKUMENTS]

Verteiler: CEO, CFO (keine weitere Zirkulation)`
 },

 'd12_ceo_48h_stakeholder_matrix.xlsx': {
   filename: 'd12_ceo_48h_stakeholder_matrix.xlsx',
   title: '48-Stunden Stakeholder-Management Matrix',
   type: 'spreadsheet',
   content: `48-STUNDEN STAKEHOLDER-MANAGEMENT MATRIX
Post-Review Kommunikation & Action Plan

PRIORISIERUNG NACH EINFLUSS/INTERESSE-MATRIX

                   HOCHINTERESSE   |   NIEDRIGINTERESSE
HOHER EINFLUSS     [MANAGE CLOSELY] |   [KEEP SATISFIED]
NIEDRIGER EINFLUSS [KEEP INFORMED]  |   [MONITOR]

GRUPPE A: MANAGE CLOSELY (Intensivbetreuung)
Stakeholder | Einfluss | Interesse | Zeitpunkt | Kanal | Owner | Key Message | Status
------------|----------|-----------|-----------|--------|-------|-------------|--------
Hausbank | 10/10 | 10/10 | T+2h | Call+Brief | CFO | "Meilensteine on track" | Pending
Großkunde AutoTech | 9/10 | 9/10 | T+4h | Vor-Ort | CEO | "Liefersicherheit 100%" | Scheduled
Beiratsvorsitzender | 9/10 | 8/10 | T+2h | Video | CEO | "Strategie bestätigt" | Done
Betriebsrat | 8/10 | 10/10 | T+24h | Meeting | HR | "Keine weiteren Cuts" | Scheduled
Hauptlieferant Steel+ | 8/10 | 8/10 | T+6h | Call | OPS | "Zahlung gesichert" | In Progress

GRUPPE B: KEEP SATISFIED (Regelmäßig informieren)
Stakeholder | Einfluss | Interesse | Zeitpunkt | Kanal | Owner | Key Message | Status
------------|----------|-----------|-----------|--------|-------|-------------|--------
Wirtschaftsprüfer | 8/10 | 5/10 | T+48h | Email | CFO | "Compliance Update" | Planned
IHK | 7/10 | 4/10 | T+72h | Brief | CEO | "Positive Entwicklung" | Planned
Kommune/Bürgermeister | 7/10 | 6/10 | T+48h | Call | CEO | "Standort sicher" | Planned
Versicherungen | 6/10 | 5/10 | T+72h | Email | Legal | "Deckung fortgeführt" | Planned

GRUPPE C: KEEP INFORMED (Transparenz schaffen)
Stakeholder | Einfluss | Interesse | Zeitpunkt | Kanal | Owner | Key Message | Status
------------|----------|-----------|-----------|--------|-------|-------------|--------
Alle Mitarbeiter | 5/10 | 10/10 | T+6h | Townhall | CEO | "Gemeinsam auf Kurs" | Scheduled
B-Kunden | 5/10 | 7/10 | T+24h | Newsletter | Sales | "Business as usual" | Drafted
Lokale Presse | 4/10 | 8/10 | T+24h | PM | PR | "Fortschritte sichtbar" | Ready
Verbände | 3/10 | 6/10 | T+48h | Update | Legal | "Mitgliedschaft aktiv" | Planned

GRUPPE D: MONITOR (Beobachten)
Stakeholder | Einfluss | Interesse | Zeitpunkt | Kanal | Owner | Key Message | Status
------------|----------|-----------|-----------|--------|-------|-------------|--------
Wettbewerber | 3/10 | 7/10 | - | - | Sales | Monitoring only | Ongoing
C-Kunden | 2/10 | 4/10 | T+72h | Web | Mktg | Standard-Info | Planned
Anwohner | 2/10 | 3/10 | - | - | - | Bei Bedarf | -
Alumni | 1/10 | 5/10 | - | LinkedIn | HR | Positive Signale | -

KOMMUNIKATIONSFAHRPLAN (STUNDEN NACH REVIEW):

T+0-2h (SOFORT):
☑ Bank-Call Nachbereitung (CFO)
☑ Beirat Information (CEO)
☐ Führungskreis Briefing (CEO)

T+2-6h (HEUTE ABEND):
☐ Mitarbeiter-Email (HR)
☐ Top-5-Kunden Calls (CEO)
☐ A-Lieferanten Info (OPS)
☐ Intranet-Update (Komm)

T+6-24h (MORGEN):
☐ All-Hands Townhall (CEO)
☐ Betriebsrat Sondersitzung (HR)
☐ Kunden-Newsletter (Sales)
☐ Presse-Statement (PR)

T+24-48h (ÜBERMORGEN):
☐ Bank Follow-up Paket (CFO)
☐ Beirat Protokoll (CEO)
☐ Behörden-Update (Legal)
☐ Partner-Kommunikation (OPS)

ERFOLGSMESSUNG:
KPI | Baseline | Ziel T+48h | Ist | Status
----|----------|------------|-----|--------
Mitarbeiter-Stimmung | 45% | >55% | - | Pending
Kunden-Hotline Anrufe | 20/Tag | <30/Tag | 18 | ✓
Negativ-Presse | 0 | 0 | 0 | ✓
Lieferanten-Beschwerden | 3 | <5 | 2 | ✓
Bank-Zufriedenheit | 6/10 | >7/10 | - | Pending

ESKALATIONSMATRIX:
Trigger | Aktion | Owner | Zeitrahmen
--------|--------|-------|------------
Kunde >500k droht Absprung | CEO-Intervention | CEO | <2h
Presse-Anfrage kritisch | Holding Statement | PR | <30min
Mitarbeiter-Panik | Sonder-Townhall | HR | <4h
Bank fordert Nach | CFO + CEO Call | CFO | <1h
Lieferant stoppt | Task Force | OPS | <2h

NOTIZEN:
- AutoTech-CEO ist morgen nur bis 14:00 erreichbar
- Betriebsrat fordert schriftliche Zusagen
- Lokalpresse plant Artikel für Freitag
- Bank erwartet Sensitivitäten bis Do. 12:00`
 },

 'review_pack_tag12.pptx': {
   filename: 'review_pack_tag12.pptx',
   title: 'Bank Review Pack - Financial Update Tag 12',
   type: 'presentation',
   content: `FINANCIAL REVIEW PACK
Tag 12 - Bank-Zwischenprüfung
STRENG VERTRAULICH

SLIDE 1: EXECUTIVE SUMMARY FINANCIALS
Est. Performance Woche 3-4

UMSATZ: 892k (Plan: 950k) = 94%
- Verzögerung Großauftrag Delta Tech (-40k)
- Kompensation durch Spot-Geschäft (+15k)

EBITDA: 38k (Plan: 45k) = 84%
- Einmaleffekt Kurzarbeit noch nicht wirksam
- Sonderkosten Review-Vorbereitung (-3k)

CASH: 312k (Plan: 280k) = 111%
- Vorzeitige Zahlung Kunde Gamma (Ankündigung) (+50k)
- Lieferantenskonto genutzt (+8k)

SLIDE 2: 13-WOCHEN-LIQUIDITÄTSPLAN

Woche | Anfang | Einzahlungen | Auszahlungen | Ende | Min-Case
------|---------|--------------|--------------|------|----------

W3 | 312k | 410k | -402k | 320k | 280k
W4 | 320k | 450k | -560k* | 190k | 150k
W5 | 190k | 480k | -320k | 350k | 290k
(*Payroll + Sozialabgaben)


Mitigation: Factoring-Erhöhung um 200k vorbereitet

SLIDE 3: WORKING CAPITAL ENTWICKLUNG

KPI | Start | Aktuell | Ziel T14 | Gap | Maßnahme
----|--------|---------|----------|-----|----------
DSO | 58 Tage | 52 Tage | 45 Tage | -7 | Inkasso + Factoring
DPO | 45 Tage | 51 Tage | 55 Tage | +4 | Verhandlung läuft
DIO | 46 Tage | 44 Tage | 40 Tage | -4 | Flash-Sales geplant

Cash Conversion Cycle: 45 Tage → 41 Tage → Ziel: 30 Tage

SLIDE 4: SENSITIVITÄTSANALYSE

Szenario | Wahrscheinlichkeit | Cash-Impact | EBITDA-Impact | Maßnahme
---------|-------------------|-------------|---------------|----------
Kunde AutoTech -20% | 20% | -80k/Monat | -12k/Monat | CEO-Gespräch
Rohstoff +10% | 40% | -30k/Monat | -30k/Monat | Preisklausel
Lieferant Stopp | 10% | -50k einmalig | -20k/Monat | Dual Sourcing
Factoring-Kürzung | 15% | -200k sofort | 0 | Alternative Bank

WORST CASE COMBINATION:
Cash würde auf 80k fallen → Under Covenant Minimum!
→ Präventiv: Zusatzlinie 150k beantragt

SLIDE 5: COVENANT COMPLIANCE STATUS

Covenant | Definition | Ist T12 | Minimum | Headroom | Trend
---------|-----------|---------|---------|----------|-------
Current Ratio | CA/CL | 1.18 | 1.15 | +2.6% | →
DSCR | EBITDA/Debt Serv. | 1.08 | 1.05 | +2.9% | ↑
EBITDA-Marge | EBITDA/Umsatz | 4.2% | 4.0% | +5.0% | →
Min. Liquidity | Cash + Facilities | 312k | 250k | +24.8% | ↑
Equity Ratio | EK/Bilanzsumme | 22% | 20% | +10.0% | →

Alle Covenants erfüllt! 
Kritisch: Current Ratio bei weiterem WC-Aufbau

SLIDE 6: BRIDGE TO RECOVERY

[WASSERFALLDIAGRAMM]
Start-EBITDA: -50k/Monat
+ Kurzarbeit: +40k
+ Kostensenkung: +35k
+ DB-Verbesserung: +25k
+ Volume Recovery: +30k
= Ziel-EBITDA: +80k/Monat (ab Monat 3)

Meilensteine:
- Monat 1: Break-even Operations
- Monat 2: Positive EBITDA
- Monat 3: Covenant-Puffer aufbauen

ANHÄNGE:
- Detaillierte GuV
- Bilanz-Entwicklung
- Forderungslaufzeiten
- Verbindlichkeitenspiegel`
 },

 'd12_cfo_covenant_compliance_certificate.pdf': {
   filename: 'd12_cfo_covenant_compliance_certificate.pdf',
   title: 'Covenant Compliance Certificate - Tag 12',
   type: 'document',
   content: `COVENANT COMPLIANCE CERTIFICATE

Gemäß § 7.2 der Kreditvereinbarung vom [Datum]

An: Vereinigte Kreditbank
Von: [CFO Name], Chief Financial Officer
Datum: Tag 12 der Restrukturierung
Periode: Stichtagsbetrachtung

Hiermit bestätige ich nach bestem Wissen und Gewissen die Einhaltung sämtlicher Financial Covenants:

1. LIQUIDITÄTS-KENNZAHLEN

Current Ratio (Umlaufvermögen / kurzfr. Verbindlichkeiten):
Berechnung: 2.450.000 € / 2.076.271 € = 1,18
Covenant Minimum: 1,15
Status: ✓ ERFÜLLT (Headroom: 2,6%)


2. PROFITABILITÄTS-KENNZAHLEN

EBITDA-Marge (EBITDA / Umsatzerlöse):
4,26%
Covenant Minimum: 4,00%
Status: ✓ ERFÜLLT (Headroom: 0,26 Prozentpunkte)

EBIT-Test (EBIT positiv ab Monat 3):
Aktueller Stand: n/a (Monat 1)
Status: NOCH NICHT ANWENDBAR

3. VERSCHULDUNGS-KENNZAHLEN

Debt Service Coverage Ratio (EBITDA / Schuldendienst):
1,08
Covenant Minimum: 1,05
Status: ✓ ERFÜLLT (Headroom: 2,9%)

Net Leverage Ratio (Nettofinanzverbindlichkeiten / EBITDA):
4,06x
Covenant Maximum: 4,50x
Status: ✓ ERFÜLLT (Headroom: 0,44x)

4. SONSTIGE AUFLAGEN

Capex-Beschränkung (max. 5.000 € ohne Genehmigung):
Periode: 3.200 € (nur Maintenance)
Status: ✓ ERFÜLLT

Ausschüttungssperre:
Ausschüttungen: 0 €
Status: ✓ ERFÜLLT

Change of Control:
Gesellschafterstruktur: Unverändert
Status: ✓ ERFÜLLT

5. ANMERKUNGEN UND ERLÄUTERUNGEN

a) Die Berechnung erfolgte auf Basis der vorläufigen Zahlen zum Stichtag. Die testierten Monatszahlen werden nachgereicht.

b) Der Rückgang der Current Ratio gegenüber Vorperiode (1,21) resultiert aus dem planmäßigen Lagerabbau zur Liquiditätsgenerierung.

c) Die EBITDA-Marge wird sich durch die Wirksamkeit der Kurzarbeitsregelung auf prognostizierte 5,5% verbessern.

d) Einmaleffekte wurden gemäß Vereinbarung bereinigt:
  - Restrukturierungskosten: 12.000 €
  - Review-Vorbereitung: 3.000 €

6. FORECAST COMPLIANCE (NÄCHSTE 4 WOCHEN)

Covenant | Woche 3 | Woche 4 | Woche 5 | Woche 6
---------|---------|---------|---------|----------
Current Ratio | 1,17 ✓ | 1,16 ✓ | 1,19 ✓ | 1,21 ✓
Min. Liquidity | 320k ✓ | 190k ⚠ | 350k ✓ | 380k ✓
EBITDA-Marge | 4,5% ✓ | 4,3% ✓ | 5,1% ✓ | 5,5% ✓
DSCR | 1,09 ✓ | 1,07 ✓ | 1,12 ✓ | 1,15 ✓

Warnung: Woche 4 Minimum Liquidity knapp wegen Payroll
Mitigation: Factoring-Erhöhung vorbereitet

7. BESTÄTIGUNG

Ich bestätige hiermit:
- Die Richtigkeit und Vollständigkeit aller Angaben
- Das Nichtvorliegen von Events of Default
- Die Einhaltung aller Information Covenants
- Die fristgerechte Zahlung aller Zins- und Tilgungsraten

_______________________
[CFO Name]
Chief Financial Officer

Anlagen:
- Berechnungsschema im Detail
- Testierte Zwischenzahlen (folgt)
- Wirtschaftsprüfer-Komfortletter`
 },
  'd12_hrlegal_kurzarbeit_anpassung_betriebsrat.docx': {
    filename: 'd12_hrlegal_kurzarbeit_anpassung_betriebsrat.docx',
    title: 'Kurzarbeit-Anpassung Betriebsratsvorlage',
    type: 'document',
    content: `BETRIEBSVEREINBARUNG - ERGÄNZUNG
Anpassung Kurzarbeitsregelung

Zwischen der Geschäftsführung der [Firmenname] GmbH
und dem Betriebsrat

Datum: Tag 12 der Restrukturierung

PRÄAMBEL

Aufgrund operativer Erfordernisse nach der Bank-Review und zur Sicherstellung kritischer Geschäftsprozesse vereinbaren die Parteien folgende Anpassungen der bestehenden Kurzarbeitsvereinbarung vom Tag 8:

§1 ANPASSUNG ENGPASSBEREICHE

(1) Identifizierte Engpassbereiche:
    - Qualitätssicherung A-Linien
    - Auftragsabwicklung Key Accounts
    - Finanz-Controlling
    - IT-Support

(2) Anpassung Arbeitszeit:
    Diese Bereiche werden von Kurzarbeit 60% auf 80% angehoben
    Betroffene Mitarbeiter: 28 Personen
    Gültigkeit: Tag 13 bis Tag 30

(3) Kompensation:
    Erhöhung KUG-Aufstockung auf 85% für diese Mitarbeiter
    Überstundenzuschläge bleiben bestehen

§2 ROTATIONSMODELL-ERWEITERUNG

(1) Flexiblere Rotation:
    Wechsel von 2-Wochen auf 1-Wochen-Rhythmus
    Ermöglicht bessere Auslastungssteuerung

(2) Freiwilligen-Pool:
    Mitarbeiter können sich für Mehrarbeit melden
    Liste wird wöchentlich aktualisiert
    Vergütung: Regulär + 10% Flexibilitätsprämie

(3) Fairness-Klausel:
    Niemand arbeitet mehr als 20% über Durchschnitt
    Monatliche Überprüfung durch BR

§3 SONDERREGELUNGEN

(1) A-Kunden-Projekte:
    Bei Gefahr von Pönalen: Vollzeit-Einsatz möglich
    Maximal 48h pro Fall
    Dokumentationspflicht

(2) Kritische Liefertermine:
    Task Forces können gebildet werden
    Freiwilligenbasis
    Sondervergütung: +25% für diese Einsätze

(3) Qualitäts-Containment:
    100%-Prüfung erfordert Vollbesetzung QS
    Befristet auf 72h-Perioden
    Vorherige BR-Information

§4 KOMMUNIKATION & TRANSPARENZ

(1) Wöchentlicher Jour Fixe GF/BR:
    Jeden Mittwoch 10:00 Uhr
    Review der Anpassungen
    Beschwerdemanagement

(2) Mitarbeiter-Information:
    Betroffene werden 48h vorher informiert
    Begründung wird mitgeteilt
    Widerspruchsmöglichkeit beim BR

(3) Dokumentation:
    Alle Anpassungen werden protokolliert
    Monatlicher Bericht an BR
    Fairness-Audit quartalsweise

§5 SOZIALE ABFEDERUNG

(1) Härtefallregelung:
    Alleinerziehende bevorzugt in Normalzeit
    Pflegende Angehörige: Individuelle Lösungen
    Gesundheitliche Einschränkungen berücksichtigen

(2) Kinderbetreuung:
    Notbetreuung bei kurzfristigen Änderungen
    Kostenübernahme durch Firma
    Max. 5 Tage/Monat

(3) Fahrtkostenerstattung:
    Bei Sondereinsätzen: volle Erstattung
    Carpooling-Prämie: 50€/Monat

§6 ERFOLGSBETEILIGUNG

Sollten die Ziele erreicht werden:
- Sonderprämie 500€ bei 100% Zielerreichung
- Vorzeitige Beendigung Kurzarbeit
- Garantie: Keine betriebsbedingten Kündigungen 2024

§7 MONITORING & ANPASSUNG

KPIs zur Überwachung:
- Mitarbeiterzufriedenheit (monatliche Pulse Checks)
- Krankheitsquote (Ziel <5%)
- Produktivitätskennzahlen
- Kundenzufriedenheit

Bei negativer Entwicklung: Sofortige Nachverhandlung

§8 LAUFZEIT & KÜNDIGUNG

- Gültigkeit: Ab Tag 13
- Laufzeit: Bis Tag 30 (automatische Verlängerung möglich)
- Kündigungsfrist: 3 Tage
- Außerordentliche Kündigung bei Covenant-Bruch

§9 STREITSCHLICHTUNG

Bei Meinungsverschiedenheiten:
1. Interne Klärung GF/BR
2. Moderation durch externen Mediator
3. Einigungsstelle als letzte Instanz

§10 SALVATORISCHE KLAUSEL

Sollten einzelne Bestimmungen unwirksam sein, bleiben die übrigen Regelungen bestehen. Die Parteien verpflichten sich, unwirksame Regelungen durch wirksame zu ersetzen, die dem Sinn am nächsten kommen.

UNTERSCHRIFTEN:

_______________________          _______________________
Für die Geschäftsführung           Für den Betriebsrat
[Name], CEO                        [Name], BR-Vorsitzende/r

_______________________          _______________________  
[Name], CFO                        [Name], stellv. BR-Vorsitz

ANHÄNGE:

1. Liste Engpassbereiche mit Mitarbeitern
2. Rotationsplan Woche 3-4
3. Freiwilligen-Pool Formular
4. Härtefall-Antrag Muster
5. FAQ für Mitarbeiter

PROTOKOLLNOTIZ:

Der Betriebsrat stimmt den Anpassungen zu unter der Bedingung, dass:
- Keine weiteren Verschlechterungen ohne BR-Zustimmung
- Monatliche Review-Meetings stattfinden
- Bei Zielerreichung Rückkehr zur Normalarbeitszeit
- Transparente Kommunikation gewährleistet wird

Diese Vereinbarung wurde in der außerordentlichen Betriebsratssitzung vom Tag 12 mit 7:2 Stimmen bei 1 Enthaltung angenommen.

[Protokollführer/in]`
  },

 'd12_cfo_cash_forecast_sensitivities': {
    filename: 'd12_cfo_cash_forecast_sensitivities',
    title: 'Liquidität - Tracking',
    type: 'memo',
    content: `Entscheidungsvorlage
für die Tage 13 und 14 bestehen noch kleinere Unsicherheiten bei den Zahlungseingängen. Wir müssen entscheiden, ob wir ein zusätzliches Polster schaffen oder darauf vertrauen, dass die Planung hält – und dabei sorgfältig abwägen, welches Signal wir an die Bank senden.

Eine Möglichkeit wäre eine begrenzte Skontoaktion. Damit könnten wir kurzfristig rund 30.000 EUR Cash mobilisieren, müssten jedoch Ertragseinbußen von etwa 4.500 EUR hinnehmen. Gleichzeitig bestünde das Risiko, dass die Bank die Maßnahme als Zeichen von Nervosität interpretiert und dies unser Vertrauen leicht schwächt. Auch nach außen könnte es als Belastung wahrgenommen werden.

Alternativ könnten wir einen kleinen Bestandsabverkauf starten. Dies würde etwa 20.000 EUR Cash freisetzen, allerdings auf Kosten von rund 3.000 EUR im Ergebnis und mit einem leichten Reputationsrisiko, da Sonderverkäufe schnell auffallen.

Eine weitere Option wäre, bei der Bank eine kurzfristige Zwischenlinie anzufragen. Das würde die Liquidität absichern und könnte bei guter Begründung Vertrauen aufbauen – birgt aber die Gefahr, dass wir als vorschnell oder übervorsichtig wahrgenommen werden.

Schließlich können wir auch auf zusätzliche Maßnahmen verzichten und die Planung wie vorgesehen halten. Das wäre das kostengünstigste Vorgehen, trägt jedoch das Risiko, dass selbst kleine Abweichungen unser Pufferkonzept gefährden.`
  }, 

 'd12_cfo_upa_term_sheet.pdf': {
    filename: 'd12_cfo_upa_term_sheet.pdf',
    title: 'UPA Verkauf',
    type: 'document',
    content: `Entscheidungsvorlage (HRLEGAL und S-CFO an CFO)
Lieber [CFO-Name],

das Term Sheet des Investors für den Verkauf von United Pumps of America liegt nun vor: 40 Mio. Gesamtpreis, davon 30 Mio. Cash, 5 Mio. Escrow (Treuhandkonto, 18 Monate) und 5 Mio. Earn-Out abhängig vom EBITDA. Die Bank fordert eine klare Darstellung der Liquiditätseffekte und möglicher Covenant-Auswirkungen. Im Folgenden die Handlungsoptionen, die wir abwägen sollten:

Die Annahme des Investorenvorschlags würde kurzfristig solide Liquidität schaffen und das Vertrauen der Bank erheblich stärken. Auch nach außen wäre dies ein positives Signal. Allerdings würde der Earn-Out ein Risiko in die Zukunft verlagern, und die Belegschaft könnte die Unsicherheit als Belastung empfinden.

Eine Verhandlung, die den Escrow-Anteil reduziert und den Cash-Anteil erhöht, würde ebenfalls positiv auf die Bank wirken und unsere Liquidität verbessern. Allerdings bleibt der Druck auf die Organisation bestehen, da wir Zugeständnisse im Deal durchsetzen müssten, die intern eher skeptisch aufgenommen würden.

Sollten wir den Earn-Out ausweiten – also den variablen Anteil auf 10 Mio. erhöhen und den Cash-Anteil auf 25 Mio. senken –, würden wir Risiken in die Zukunft verschieben. Die Bank könnte dies zwar noch akzeptieren, nach außen wäre es jedoch ein schwächeres Signal, und auch intern würde die Verunsicherung steigen.

Eine Verschiebung des Closings, um zunächst die internen Covenant-Effekte gründlich zu analysieren, würde unsere Position gegenüber der Bank schwächen und ein negatives Bild nach außen erzeugen. Dafür hätten wir jedoch Klarheit, bevor wir uns auf eine Struktur festlegen.

Aus Bankensicht gilt: Ein realistischer, klar strukturierter Zahlungsplan signalisiert Professionalität und stärkt unsere Verhandlungsposition. Wir müssen entscheiden, ob wir die Balance stärker auf sofortige Liquidität oder auf langfristige Risikosteuerung legen.

Beste Grüße
`
  }, 

   'd12_cfo_covenant_negotiation_matrix.pdf': {
    filename: 'd12_cfo_covenant_negotiation_matrix.pdf',
    title: 'Working Capital',
    type: 'memo',
    content: `Entscheidungsvorlage
im Rahmen des Term-Sheet-Reviews stehen nun die entscheidenden Punkte zu den Covenant-Triggern im Raum. Es geht um Information Rights, Milestones und Fees. Die Bank erwartet eine klare vertragliche Fixierung, bevor die Freigabe erfolgen kann. Wir müssen entscheiden, wie wir Kosten, Flexibilität und Verbindlichkeit austarieren.

Eine Möglichkeit ist es, eine moderate Fee zu akzeptieren und dafür harte, messbare Milestones zu vereinbaren. Das würde das Vertrauen der Bank deutlich stärken, da Transparenz und Nachvollziehbarkeit sichergestellt sind. Allerdings müssten wir dafür rund 4.000 EUR an zusätzlichen Kosten einplanen.

Wir könnten auch versuchen, mit Redlines zu arbeiten: also die Trigger abzumildern, ohne die Gebühr zu verändern. Das würde uns kurzfristig mehr Spielraum geben, allerdings wäre die positive Wirkung auf das Bankvertrauen vergleichsweise gering.

Ein dritter Ansatz wäre, eine höhere Gebühr in Kauf zu nehmen, dafür aber mehr Linie in den Covenants zu erhalten. Mit rund 8.000 EUR zusätzlichem Aufwand wäre dies teurer, die Bank würde aber dennoch ein hohes Maß an Professionalität wahrnehmen, da klare Regeln bestehen.

Schließlich könnten wir die Entscheidung vertagen. Das würde zwar kurzfristig Kosten sparen, hätte aber einen deutlich negativen Effekt auf das Bankvertrauen, da wir Unschlüssigkeit demonstrieren würden.

Zusammenfassend:

Moderate Fee mit harten Milestones = klares Signal, solide Kosten, stärkt Bankvertrauen erheblich.

Abgemilderte Trigger bei gleicher Fee = günstiger, aber schwaches Signal.

Mehr Linie gegen höhere Fee = teuer, aber ebenfalls bankenseitig positiv.

Vertagen = vermeintlich bequem, aber schädlich für Glaubwürdigkeit.

Empfehlenswert erscheint eine Lösung, die klare, messbare Meilensteine enthält und damit unsere Verhandlungs- und Steuerungsfähigkeit unter Beweis stellt – auch wenn dies mit moderaten Zusatzkosten verbunden ist.
`
  }, 

    'd12_ops_logistics_service_level_agreement.pdf': {
    filename: 'd12_ops_logistics_service_level_agreement.pdf',
    title: 'SLA',
    type: 'memo',
    content: `Entscheidungsvorlage
Betreff: Memo – Logistik-Servicelevel und Expressfahrten (Tag 12)

Von: COO / Leitung Operations
An: Geschäftsführung / CFO
Datum: Tag 12

Sehr geehrte Damen und Herren,

in den vergangenen Tagen ist die Zahl der Sonder- und Expressfahrten deutlich gestiegen. Diese Maßnahmen helfen zwar im Einzelfall, Termine zu halten und Kunden zu beruhigen, sie führen aber zu spürbaren Mehrkosten und einer unkontrollierten Entwicklung („Wildwuchs“). Die Bank hat signalisiert, dass sie eine klare Regelung der Logistikprozesse erwartet.

Handlungswege im Überblick:

Wenn wir Expressfahrten nur noch bei Pönalen oder A-Kunden zulassen, hätten wir weiterhin eine hohe Kundenzufriedenheit im Schlüsselsegment und zugleich eine deutliche Kostenbremse.

Eine andere Möglichkeit wäre, Expressfahrten durch Standardisierung und Pauschalen in die regulären Abläufe einzubetten. Dadurch wären die Kosten kalkulierbarer, der Servicelevel aber etwas weniger flexibel.

Sollten wir Expressfahrten stark reduzieren, könnten wir unsere Kostenbasis merklich entlasten. Allerdings besteht das Risiko, dass wir Kunden verlieren, die schnelle Reaktionsfähigkeit erwarten.

Schließlich könnten wir den Express-Service bewusst ausweiten und offensiv als Imagefaktor nutzen. Das würde unsere Wahrnehmung als verlässlicher Partner stärken und die Kundenzufriedenheit erhöhen, gleichzeitig aber erhebliche Zusatzkosten verursachen.

Bewertung:

Eine klare Regelung ist zwingend notwendig, um Transparenz und Steuerbarkeit sicherzustellen.

Bankenseitig wird ein strukturierter, kostendisziplinierter Ansatz erwartet.

Kunden erwarten Differenzierung: Schlüsselkunden brauchen Verlässlichkeit, während nicht jeder Auftrag Sonderbehandlung erhalten muss.

Reines Kostenoptimum (Reduktion) birgt Risiken im Markt, eine reine Image-Strategie (Ausweitung) belastet zu stark das Ergebnis.

Empfehlung:
Ein Regelwerk mit klaren Kriterien für Expressfahrten – beispielsweise nur bei Pönalen oder für A-Kunden – erscheint am sinnvollsten. Ergänzend können wir Pauschalen für planbare Sonderfahrten verhandeln. Damit kombinieren wir Kostenkontrolle mit Kundenbindung und senden an die Bank das Signal: „Wir haben die Logistik im Griff.“

Die beigefügte Unterlage (Service Level Agreement – Entwurf) enthält bereits ein mögliches Regelwerk zur Feinjustierung.

Beste Grüße
`
  }, 

  'd12_cfo_working_capital_targets.pptx': {
    filename: 'd12_cfo_working_capital_targets.pptx',
    title: 'Working Capital',
    type: 'memo',
    content: `Entscheidungsvorlage (OPS an CFO)
die Bank hat den Wunsch geäußert, dass wir konkrete Zielkorridore für unsere Working-Capital-Kennzahlen (DSO – Days Sales Outstanding, DPO – Days Payables Outstanding, DIO – Days Inventory Outstanding) vereinbaren. Diese sollen der Bank als Maßstab dienen, um unsere operative Steuerungsfähigkeit einzuschätzen.

Wir stehen dabei vor dem klassischen Spannungsfeld: Ambition vs. Realismus. Zu ambitionierte Zusagen wirken auf den ersten Blick stark, bergen aber das Risiko, dass wir sie nicht einhalten und dadurch Glaubwürdigkeit verspielen. Vage oder gar keine Zusagen würden hingegen sofort Misstrauen erzeugen.

Ein Ansatz wäre, ambitionierte, aber realistisch erreichbare Zielwerte zu nennen. Das würde Vertrauen bei der Bank schaffen und zugleich die Belegschaft positiv motivieren, da die Vorgaben erreichbar erscheinen. Dies wäre eine ausgewogene Lösung, die sowohl extern als auch intern trägt.

Alternativ könnten wir sehr ambitionierte Zielkorridore zusagen. Das würde zunächst Eindruck bei der Bank hinterlassen. Sollte es uns aber nicht gelingen, diese Werte einzuhalten, droht ein deutlicher Vertrauensverlust. Auch intern könnten solche überzogenen Ziele als Überforderung empfunden werden.

Wenn wir uns auf vage Formulierungen beschränken und uns nicht auf harte Korridore festlegen, würden wir zwar Flexibilität bewahren, doch die Bank würde dies als unklare oder schwache Steuerung interpretieren. Das könnte unser Standing belasten.

Sollten wir ganz auf Zielkorridore verzichten und lediglich ankündigen, die Kennzahlen zu beobachten, wäre das aus Sicht der Bank ein deutlich negatives Signal. Es würde den Eindruck erwecken, dass wir keine klare Linie im Working-Capital-Management haben.

Zusammenfassend:

Realistisch-ambitionierte Ziele signalisieren Professionalität und Umsetzungsstärke.

Überzogene Zielkorridore bergen das Risiko der Nichterfüllung.

Vage oder fehlende Zusagen unterminieren das Vertrauen der Bank.

Aus meiner Sicht ist daher ein realistischer Etappenplan mit klarer Kommunikation der Umsetzungsschritte der richtige Weg: ambitioniert genug, um die Bank zu überzeugen, aber so gestaltet, dass wir die Ziele auch tatsächlich erreichen können.

Beste Grüße
`
  }, 

 'd12_ops_supplier_audit_request.docx': {
    filename: 'd12_ops_supplier_audit_request.docx',
    title: 'Lieferanten',
    type: 'memo',
    content: `Entscheidungsvorlage (an OPS)
Betreff: Memo – Lieferantenstabilität: Nachweise & Handlungsoptionen (Tag 12)

Von: COO / Leitung Operations
An: Geschäftsführung / CFO
Datum: Tag 12

Sehr geehrte Damen und Herren,

zwei unserer kritischen Lieferanten stehen aktuell unter Beobachtung. Die Bank hat signalisiert, dass das Thema Stabilitätsnachweise in der Supply Chain für ihre Bewertung von hoher Bedeutung ist. Wir müssen nun entscheiden, wie wir vorgehen.

Handlungswege:

Nachweise anfordern (Kapazität, Qualität, Liefertreue):
Stärkt das Vertrauen der Bank und gibt uns Argumentationsmaterial gegenüber Kunden. Aufwand überschaubar, Wirkung hoch.

Backup-Lieferant qualifizieren (Kosten ca. 6.000 EUR):
Absicherung durch zweite Bezugsquelle. Kundenbindung würde steigen, Bankseite sähe zusätzliche Stabilität. Nachteil: Kostenbelastung und Einmalaufwand.

Preisdruck auf Lieferanten erhöhen statt Nachweise einholen:
Kurzfristiger finanzieller Vorteil durch bessere Konditionen. Allerdings drohen Reputationsschäden sowie eine Schwächung der Kundenloyalität, wenn Engpässe auftreten.

Keine Maßnahme ergreifen:
Spart Ressourcen, wird jedoch von der Bank klar negativ gewertet, da fehlende Steuerungsbereitschaft sichtbar würde.

Bewertung:

Bankenseitig hat Stabilität oberste Priorität.

Kunden erwarten Verlässlichkeit – jede Unsicherheit in der Lieferkette wirkt sich unmittelbar aus.

Kurzfristige Kostenvorteile (reiner Preisdruck) sind in der aktuellen Phase riskant.

Empfehlung:
Die Kombination aus formalen Nachweisen der bestehenden Lieferanten und – wenn finanziell darstellbar – einer Backup-Qualifizierung bietet die größte Sicherheit. Damit gewinnen wir Vertrauen bei Bank und Kunden und vermeiden operative Überraschungen.

Beste Grüße
`
  }, 
  
   'd12_hrlegal_townhall': {
    filename: 'd12_hrlegal_townhall',
    title: 'Townhall',
    type: 'memo',
    content: `Sehr geehrte Damen und Herren,

im Anschluss an das gestrige Bank-Review ist im Team eine spürbare Unsicherheit über Auflagen, Ziele und nächste Schritte entstanden. Rückmeldungen aus verschiedenen Abteilungen zeigen, dass die Mitarbeitenden mehr Klarheit zu Prioritäten und To-dos benötigen.

Wir stehen vor der Frage, wie wir kommunizieren: zu viele Details können überfordern, zu wenig Information erzeugt Unsicherheit und Gerüchte.

Handlungswege:

Ein kurzes Briefing mit anschließender Q&A-Session sowie ein aktualisiertes FAQ-Dokument würden Transparenz schaffen, konkrete Aufgaben verdeutlichen und das Stressniveau senken. Vorteil: die Belegschaft fühlt sich ernst genommen, gleichzeitig bleibt die Informationslast überschaubar.

Alternativ könnten wir ein Führungskräftebriefing durchführen und die Verantwortung für die Weitergabe von Informationen in die Linie verlagern. Das entlastet, schafft aber nur bedingt Sicherheit, da Informationen unterschiedlich gefiltert weitergegeben werden.

Sollten wir ganz auf ein Briefing verzichten, würde die Unsicherheit im Team steigen, was sich negativ auf Motivation und Engagement auswirkt.

Schließlich könnten wir eine Motivationskampagne aufsetzen (geschätzte Kosten ca. 2.000 EUR). Diese hätte eine positive Wirkung auf das Klima und unsere externe Wahrnehmung, bietet aber weniger konkrete Handlungsorientierung.

Bewertung:

Mitarbeitende benötigen jetzt vor allem konkrete Aufgaben und Klarheit über Prioritäten.

Die Bank erwartet, dass wir intern ein klares Bild schaffen, um operative Risiken durch Unsicherheit zu vermeiden.

Eine Kombination aus prägnantem Briefing, Q&A und FAQ-Update ist die wirkungsvollste Maßnahme, da sie sowohl Klarheit als auch Einbindung schafft.

Empfehlung:
Wir sollten kurzfristig ein Team-Briefing mit Q&A und FAQ-Update durchführen, um Verbindlichkeit und Sicherheit herzustellen. Damit erhöhen wir das Engagement, reduzieren Stress und senden auch nach außen das Signal, dass wir unsere Belegschaft aktiv einbinden und führen.

Beste Grüße
`
  }, 

 'd12_ops_Kapa.pptx': {
    filename: 'd12_ops_Kapa.pptx',
    title: 'Kapazitäten',
    type: 'memo',
    content: `Entscheidungsvorlage (Leitung Fab an OPS)


die Situation in der Fertigung hat sich in den letzten Tagen spürbar zugespitzt. Durch Krankheitsausfälle und Urlaubsüberhänge arbeiten die Schichten aktuell am Limit. Parallel gehen zunehmend kurzfristige Anfragen für Sonderchargen ein – vor allem aus dem A-Kundenbereich. Damit stehen wir vor einem klaren Zielkonflikt: Zusätzliche Aufträge bringen zwar Umsatz, gefährden aber die Stabilität der Kernlinien.

Handlungsoptionen:

Sonderaufträge annehmen und über Überstunden abfedern
→ Kurzfristiger Ergebniseffekt positiv, A-Kunden fühlen sich bedient. Gleichzeitig erhöht sich die Belastung der Belegschaft weiter, was Krankenstände verstärken und Bankenseitig als operative Unruhe interpretiert werden kann.

Kernlinien konsequent stabil halten, Sonderaufträge ablehnen
→ Liefertreue und Planungssicherheit steigen, die Bank würde dies als disziplinierte Steuerung positiv sehen. Allerdings riskieren wir Frustration bei wichtigen Kunden und verzichten auf kurzfristige Margen.

Temporäre Fremdkapazität einkaufen
→ Wir sichern sowohl Stammproduktion als auch Sonderaufträge ab und senden ein professionelles Signal an Bank und Kunden. Kostenbelastung ca. 10.000 EUR. Vorteil: Belegschaft wird entlastet, Kunden bleiben bedient. Nachteil: Ergebnisrückgang und Abhängigkeit von externen Partnern.

Einführung einer Priorisierungsmatrix gemeinsam mit Vertrieb (ein Tag Verzögerung)
→ Operativ etwas langsamer, dafür transparent und abgestimmt. Bank und Kunden sehen klare Governance, wir wahren Balance ohne Überlastung. Finanzielle Effekte kurzfristig überschaubar, mittelfristig Stabilität.

Bewertung:

Aus Sicht der Bank ist Stabilität und Steuerbarkeit entscheidend.

Aus Sicht der Kunden zählt die verlässliche Belieferung – Sonderaufträge sind aber nicht immer zwingend erfolgskritisch.

Aus Sicht der Belegschaft droht bei reinen Überstundenlösungen eine Überlastung, die mittelfristig mehr Schaden anrichtet.

Empfehlung: Ein klar strukturierter Ansatz (Matrix oder Fremdkapazitäten) signalisiert Professionalität und wahrt unsere Handlungsfähigkeit. Kurzfristige Gewinnoptimierung über reine Überlastung wäre riskant.

Beste Grüße
`
  }, 
  

  'd12_hrlegal_compliance_covenant_register.xlsx': {
    filename: 'd12_hrlegal_compliance_covenant_register.xlsx',
    title: 'Compliance Covenant Register - Tracking',
    type: 'spreadsheet',
    content: `COVENANT COMPLIANCE REGISTER
Stand: Tag 12, 17:00 Uhr | Verantwortlich: Legal/Compliance

ÜBERSICHT NEUE BANK-AUFLAGEN

Nr | Auflage | Typ | Frist | Owner | Status | Risiko | Dokumentation
---|---------|-----|-------|-------|--------|--------|---------------
1 | Monthly Board Report | Information | Monatlich, 5. WT | CFO | Setup läuft | Mittel | Template erstellt
2 | Capex >5k Genehmigung | Restriction | Laufend | CFO | Prozess definiert | Niedrig | Freigabematrix
3 | Ad-hoc Meldung <300k Liquidität | Information | 24h nach Ereignis | Treasury | Alert eingerichtet | Hoch | IT-Trigger aktiv
4 | Works Council Protokolle | Information | 48h nach Sitzung | HR | Bereits erfüllt | Niedrig | Standard-Prozess
5 | Keine Dividenden | Restriction | Bis Covenant-Ende | Legal | Implementiert | Niedrig | GV-Beschluss
6 | Management-Kontinuität | Restriction | Laufend | HR | Monitoring | Mittel | Succession Plan
7 | Weekly Cash Report | Information | Jeden Montag | Treasury | Läuft seit W1 | Niedrig | Automatisiert
8 | Covenant-Test monatlich | Financial | Monatsultimo | CFO | Prozess etabliert | Hoch | Excel-Tool ready
9 | Asset-Verkauf >50k | Restriction | Laufend | CFO/Legal | Prozess defined | Mittel | Approval Matrix
10 | Waiver Monitoring Fee | Financial | Quartalsweise | CFO | Q1 fällig | Niedrig | 6.250€ budgetiert

DETAILLIERTE COVENANT-ANFORDERUNGEN

FINANCIAL COVENANTS:
Covenant | Alt | Neu | Aktuell | Headroom | Nächster Test | Forecast | Action Required
---------|-----|-----|---------|----------|---------------|----------|----------------
Current Ratio | ≥1.15 | ≥1.20 | 1.18 | -0.02 | Tag 30 | 1.22 | WC-Optimierung
DSCR | ≥1.05 | ≥1.10 | 1.08 | -0.02 | Tag 30 | 1.12 | Cash-Generierung
EBITDA-Marge | ≥4.0% | ≥5.0% | 4.2% | -0.8% | Tag 30 | 5.3% | Kosten senken
Min. Liquidity | ≥250k | ≥350k | 312k | -38k | Daily | 380k | Factoring erhöhen

INFORMATION COVENANTS:
Report | Frequenz | Nächste Fälligkeit | Template | Verantwortlich | Automatisierung
--------|----------|-------------------|----------|----------------|------------------
Weekly Cash | Wöchentlich Mo | Tag 13 | ✓ Ready | Treasury | 80% automatisiert
Monthly Board Report | 5. Werktag | Tag 35 | In Arbeit | CFO | Template Phase
Covenant Certificate | Monatsende | Tag 30 | ✓ Ready | CFO | Excel-basiert
Ad-hoc Meldungen | Bei Trigger | - | ✓ Definiert | Compliance | Alert-System
Customer Loss >100k | 24h | - | ✓ Ready | Sales | CRM-Integration
Mgmt Changes | 48h | - | ✓ Ready | HR | HR-System Flag

DOKUMENTATIONS-TRACKER

Dokument | Status | Datum erstellt | Review-Zyklus | Nächstes Update | Storage
---------|--------|---------------|---------------|-----------------|----------
Waiver Agreement V2 | Final | Tag 12 | - | - | Legal Drive
Covenant Handbook | Draft | Tag 11 | Weekly | Tag 19 | Compliance Folder
Reporting Templates | 80% | Tag 10 | Monthly | Tag 30 | CFO SharePoint
Escalation Matrix | Final | Tag 12 | Quarterly | Tag 90 | Intranet
Fee Payment Schedule | Final | Tag 12 | - | - | Treasury System
Approval Authorities | Updated | Tag 12 | Monthly | Tag 30 | Compliance Wiki

RISIKO-MATRIX COVENANT-BRUCH

Covenant | Bruch-Wahrscheinlichkeit | Impact | Mitigation | Early Warning bei
---------|-------------------------|--------|------------|-------------------
Current Ratio | Mittel (30%) | Hoch | DSO-Reduktion | <1.22
DSCR | Niedrig (15%) | Hoch | Cost Cutting | <1.12
EBITDA-Marge | Mittel (25%) | Kritisch | Pricing Power | <5.2%
Min. Liquidity | Niedrig (10%) | Kritisch | Credit Line | <380k
Reporting Delay | Niedrig (5%) | Mittel | Automation | System-Ausfall

COMPLIANCE CHECKLIST TAG 13

MORGEN ZU ERLEDIGEN:
☐ Weekly Cash Report finalisieren (09:00)
☐ Bank-Call Vorbereitung (10:00)
☐ Covenant-Test Simulation (14:00)
☐ BR-Protokoll übermitteln (16:00)
☐ Capex-Anträge prüfen (17:00)

WÖCHENTLICHE TASKS:
☐ Covenant Dashboard Update (Mo)
☐ Risk Assessment (Mi)
☐ Bank-Kommunikation (Fr)
☐ Internal Audit Check (Fr)

MONATLICHE TASKS:
☐ Formal Covenant Testing
☐ Board Report Erstellung
☐ Fee Payment Processing
☐ Compliance Certificate

ACTION ITEMS MIT PRIORITÄT

Prio | Action | Owner | Deadline | Status | Impact wenn nicht erfüllt
-----|--------|-------|----------|--------|---------------------------
1 | Current Ratio verbessern | CFO | Tag 20 | In Arbeit | Covenant-Bruch möglich
2 | Board Report Template | CFO | Tag 15 | 60% fertig | Bank-Verärgerung
3 | Automatisierung Reports | IT | Tag 18 | Gestartet | Manuelle Fehler
4 | Training Compliance Team | Legal | Tag 16 | Geplant | Fehlerrisiko
5 | Backup-Prozesse | All | Tag 20 | Konzept | Keine Redundanz

KOMMUNIKATIONSPLAN COMPLIANCE

Stakeholder | Info-Bedarf | Kanal | Frequenz | Verantwortlich
------------|-------------|--------|----------|----------------
Bank | Alle Covenants | Portal/Email | Per Agreement | CFO
Beirat | Summary | Board Meeting | Monatlich | CEO
Management | Operational | Jour Fixe | Wöchentlich | Legal
Mitarbeiter | Relevant Changes | Intranet | Bei Änderung | HR
Wirtschaftsprüfer | Dokumentation | SharePoint | Quartalsweise | CFO`
  },

  'd12_hrlegal_bank_requirements_checklist.pdf': {
    filename: 'd12_hrlegal_bank_requirements_checklist.pdf',
    title: 'Bank Requirements Compliance Checklist',
    type: 'document',
    content: `BANK REQUIREMENTS COMPLIANCE CHECKLIST
Tag 12 - Post-Review Dokumentation

COMPLIANCE OFFICER: [Name]
DATUM: Tag 12, 18:00 Uhr
STATUS: DRINGEND - Umsetzung binnen 48h

1. NEUE REPORTING-ANFORDERUNGEN

☑ IMPLEMENTIERT | ☐ IN ARBEIT | ☐ OFFEN

☑ Weekly Cash Flow Report
  - Template: Finalisiert
  - Automatisierung: 80%
  - Erste Lieferung: Tag 13, 09:00
  - Qualitätssicherung: CFO-Review

☐ Monthly Board Report (IN ARBEIT)
  - Template: 60% fertig
  - Inhalt definiert: ✓
  - Review-Prozess: Defined
  - Deadline: Tag 15 für Finalisierung

☑ Daily Liquidity Monitoring
  - System-Alert: Konfiguriert
  - Schwellenwert: 350k
  - Eskalation: CFO → CEO → Bank
  - Test erfolgreich: Tag 11

☐ Ad-hoc Meldungen (IN ARBEIT)
  - Trigger definiert: ✓
  - Prozess dokumentiert: 70%
  - Verantwortlichkeiten: Assigned
  - Go-Live: Tag 13

2. OPERATIVE BESCHRÄNKUNGEN

CAPEX-BESCHRÄNKUNG (>5k benötigt Bank-Approval):
☑ Interne Weisung: Verteilt
☑ Genehmigungsprozess: Definiert
☑ Tracking-System: Excel eingerichtet
☐ Erste Anträge: 2 pending (Review Tag 13)

ASSET-VERKAUF (>50k benötigt Bank-Approval):
☑ Prozess: Dokumentiert
☐ Aktuelle Anfragen: UPA-Deal (40M€)
☐ Dokumentation: In Vorbereitung
☑ Legal Review: Completed

AUSSCHÜTTUNGSSPERRE:
☑ Gesellschafterbeschluss: Gefasst
☑ Handelsregister: Anmeldung vorbereitet
☑ Kommunikation: Erfolgt
☑ Überwachung: Legal/CFO

3. ERWEITERTE COVENANTS

Current Ratio ≥1.20 (vorher 1.15):
Status: 1.18 - KRITISCH
Maßnahmen:
☑ DSO-Reduktions-Taskforce
☐ Inventory-Abverkauf läuft
☐ Lieferanten-Verhandlungen
Forecast Tag 30: 1.22 ✓

DSCR ≥1.10 (vorher 1.05):
Status: 1.08 - WARNUNG
Maßnahmen:
☑ Kostensenkung Phase 2
☐ Preiserhöhungen geplant
☑ Cash-Generierung Fokus
Forecast Tag 30: 1.12 ✓

EBITDA-Marge ≥5.0% (vorher 4.0%):
Status: 4.2% - KRITISCH
Maßnahmen:
☐ Kurzarbeit Wirkung ab Tag 15
☑ DB-Fokus Produktion
☐ Overhead-Reduktion
Forecast Tag 30: 5.3% ✓

Minimum Liquidity ≥350k (vorher 250k):
Status: 312k - UNTER ZIEL
Maßnahmen:
☑ Factoring-Erhöhung beantragt
☑ Asset Sales vorbereitet
☐ Inkasso intensiviert
Forecast Tag 13: 380k ✓

4. DOKUMENTATIONS-ANFORDERUNGEN

PFLICHTDOKUMENTE:
☑ Covenant Compliance Certificate - Template ready
☑ Waiver Amendment - Unterschrieben
☐ Monthly Management Accounts - Prozess läuft
☐ Forecast-Update - Wöchentlich ab Tag 13
☑ Milestone Tracking - System etabliert

BACKUP-DOKUMENTATION:
☑ Email-Bestätigungen - Archiviert
☐ Meeting-Protokolle - In Erstellung
☑ Calculation Sheets - Versioniert
☐ External Validation - Geplant für Tag 20

5. GEBÜHREN UND KOSTEN

Waiver Monitoring Fee:
- Betrag: 6.250€ quartalsweise
- Erste Zahlung: Tag 15
- Budget: Freigegeben
- Buchung: Vorbereitet

Amendment Fee:
- Betrag: 5.000€ einmalig
- Fälligkeit: Bei Unterschrift (Tag 12)
- Status: Überweisung angewiesen
- Verbuchung: Als Einmalaufwand

Zusätzliche Kosten:
- Rechtsberatung: 3.000€ (bewilligt)
- Wirtschaftsprüfer: 2.000€ (pending)
- IT-Anpassungen: 1.500€ (freigegeben)

6. KRITISCHE DEADLINES

TAG 13:
☐ 09:00 - Weekly Cash Report
☐ 12:00 - Capex-Anträge Review
☐ 15:00 - Bank-Call Preparation
☐ 17:00 - Compliance Status Update

TAG 14:
☐ 10:00 - Board Report Draft
☐ 14:00 - Covenant Simulation
☐ 16:00 - Documentation Package

TAG 15:
☐ 09:00 - Fee Payment Processing
☐ 12:00 - Final Board Report
☐ 15:00 - Bank Submission Package
☐ 17:00 - Week 3 Planning

7. VERANTWORTLICHKEITEN

ROLLE | HAUPTAUFGABEN | BACKUP
------|---------------|--------
CFO | Covenant-Tests, Reporting | Deputy CFO
Legal | Dokumentation, Compliance | External Counsel
Treasury | Liquidität, Cash Reports | CFO
Controlling | KPI-Tracking, Forecast | Finance Manager
HR | Works Council, Protokolle | HR Manager
IT | Automatisierung, Alerts | External Support

8. RISIKEN UND MITIGATION

RISIKO: Covenant-Bruch Current Ratio
- Wahrscheinlichkeit: 30%
- Mitigation: DSO-Taskforce, Factoring
- Escalation: Sofort zu CEO/Bank

RISIKO: Reporting-Verzögerung
- Wahrscheinlichkeit: 15%
- Mitigation: Backup-Prozesse, Automatisierung
- Escalation: Manual Override

RISIKO: IT-System-Ausfall
- Wahrscheinlichkeit: 5%
- Mitigation: Excel-Backup, Cloud-Storage
- Escalation: External Support 24/7

9. KOMMUNIKATIONSPLAN

INTERN:
- Finance Team: Tägliches Stand-up 08:30
- Management: Update Email täglich 17:00
- Beirat: Wöchentlicher Call Freitags

EXTERN:
- Bank: Definierte Touchpoints
- Wirtschaftsprüfer: Cc auf alle Reports
- Berater: Bei Bedarf

10. BESTÄTIGUNG

Hiermit bestätige ich die Kenntnisnahme aller neuen Bank-Anforderungen und die Einleitung entsprechender Maßnahmen:

☑ CFO: [Unterschrift]
☑ Legal: [Unterschrift]
☐ CEO: [Pending]
☐ Beirat: [Information erfolgt]

NÄCHSTES REVIEW: Tag 13, 15:00 Uhr

"Compliance ist nicht optional - es ist unsere Lizenz zum Weitermachen!"`
  },

  'd12_hrlegal_workload_assessment_memo.pdf': {
    filename: 'd12_hrlegal_workload_assessment_memo.pdf',
    title: 'Workload Assessment - Überlastungssituation',
    type: 'memo',
    content: `MEMORANDUM
Arbeitsbelastungs-Analyse nach Bank-Review

An: Geschäftsführung
Von: HR/Legal
Datum: Tag 12
Betreff: DRINGEND - Überlastungssituation in kritischen Bereichen

EXECUTIVE SUMMARY

Die Bank-Review-Vorbereitung hat zu erheblichen Überlastungen geführt. 
Sofortmaßnahmen erforderlich zur Vermeidung von Ausfällen und Motivationsverlust.

1. BETROFFENE BEREICHE UND BELASTUNGSGRAD

CONTROLLING/FINANCE (Kritisch - 145% Auslastung):
- Mitarbeiter: 8 Personen
- Überstunden letzte 14 Tage: Ø 28h/Person
- Krankmeldungen: 2 (Erschöpfung)
- Stimmung: Kritisch (3/10)

Haupttreiber:
- Bank-Reporting (täglich 4h Extra)
- Covenant-Berechnungen
- Ad-hoc-Analysen
- Review-Vorbereitung

QUALITÄTSSICHERUNG (Hoch - 130% Auslastung):
- Mitarbeiter: 12 Personen  
- Überstunden: Ø 20h/Person
- Krankmeldungen: 1
- Stimmung: Angespannt (4/10)

Haupttreiber:
- 100%-Prüfung A-Produkte
- Dokumentationspflichten
- Reklamationsbearbeitung
- Audit-Vorbereitung

IT/DIGITALISIERUNG (Hoch - 125% Auslastung):
- Mitarbeiter: 5 Personen
- Überstunden: Ø 24h/Person
- Krankmeldungen: 0 (noch)
- Stimmung: Frustration (5/10)

Haupttreiber:
- Report-Automatisierung
- System-Stabilität
- Neue Bank-Anforderungen
- Fehlende Ressourcen

2. MITARBEITERFEEDBACK (ANONYMISIERT)

"Ich kann nicht mehr. 14 Tage Dauerstress ohne Ende in Sicht."
- Finance Team

"Kurzarbeit für andere, Überstunden für uns. Das ist unfair!"
- Controlling

"Wenn das so weitergeht, kündige ich. Gesundheit geht vor."
- QS-Mitarbeiter

"Wir retten die Firma und bekommen nicht mal Danke."
- IT-Team

"Die Chefs sehen unseren Einsatz nicht."
- Multiple Nennungen

3. RISIKOBEWERTUNG

SOFORT-RISIKEN:
- Krankheitswelle: 60% Wahrscheinlichkeit
- Kündigungen Schlüsselpersonal: 40%
- Fehler durch Übermüdung: 80%
- Compliance-Versagen: 30%

MITTEL-RISIKEN (7-14 Tage):
- Burnout-Fälle: 3-4 erwartet
- Teamzerfall: Möglich
- Sabotage/Dienst nach Vorschrift: 20%
- Image-Schaden als Arbeitgeber: Sicher

4. GEFORDERTE SOFORTMASSNAHMEN

FINANZIELLE ANERKENNUNG:
☐ Sonderprämie 500€ für Überlastete (Kosten: 12k)
☐ Überstundenzuschlag 50% (statt 25%)
☐ Essensgutscheine 10€/Tag
☐ Taxi-Heimfahrt bei >10h Arbeit

ENTLASTUNG:
☐ Externe Unterstützung (2 Leiharbeiter Finance)
☐ Priorisierung: Nicht-kritische Tasks stoppen
☐ Automatisierung beschleunigen
☐ Delegation an andere Abteilungen

WERTSCHÄTZUNG:
☐ CEO-Dankesrede (heute noch!)
☐ Persönliche Gespräche Führungskräfte
☐ Öffentliche Anerkennung (Intranet/Townhall)
☐ Kleine Gesten (Blumen, Pralinen)

AUSGLEICH:
☐ Garantierte Freizeit nach Tag 30
☐ Zusatz-Urlaubstage (3 Tage)
☐ Flexible Arbeitszeiten
☐ Home-Office wo möglich

5. KOMPENSATIONS-OPTIONEN

OPTION A: ÜBERSTUNDEN AUSZAHLEN (Empfohlen)
- Kosten: ca. 24.000€
- Vorteil: Sofortige Wirkung
- Nachteil: Cash-Impact
- Mitarbeiterwirkung: Sehr positiv

OPTION B: ZEITAUSGLEICH (Teilweise möglich)
- Nach Tag 30: Garantiert
- Verhältnis 1:1,5
- Problem: Erst später einlösbar
- Mitarbeiterwirkung: Neutral

OPTION C: ANERKENNUNGSPROGRAMM (Ergänzend)
- Budget: 15.000€
- Mix aus Geld/Sachleistungen
- Vorteil: Flexibel/Kreativ
- Mitarbeiterwirkung: Positiv

OPTION D: NICHTS TUN 
- Kosten: 0€ kurzfristig
- Risiko: Massive Folgekosten
- Kündigungen: Sicher
- Mitarbeiterwirkung: Katastrophal

6. VORSCHLAG PRIORISIERUNG

SOFORT (Heute):
1. CEO-Ansprache Team (17:00)
2. Pizza für alle Überstunden-Leistenden
3. Email: Anerkennung und Plan

MORGEN (Tag 13):
1. Einzelgespräche mit Überlasteten
2. Externe Unterstützung organisieren
3. Task-Priorisierung

DIESE WOCHE:
1. Prämienauszahlung ankündigen
2. Entlastungsplan kommunizieren
3. Erste Automatisierungen live

7. KOMMUNIKATIONSVORSCHLAG

"Liebes Team,

die letzten zwei Wochen waren außergewöhnlich - und ihr wart außergewöhnlich! 

Euer Einsatz hat uns durch die Bank-Review gebracht. Ohne euch wären wir nicht hier. Das sehe ich, das sehen wir alle, und das werden wir honorieren.

Konkret:
- Sonderprämie für alle mit >20h Überstunden
- Garantierter Ausgleich nach Tag 30
- Sofort externe Unterstützung
- Persönliche Gespräche diese Woche

Ihr rettet nicht nur Jobs - ihr rettet unsere Firma. DANKE!

[CEO Name]"

8. LANGFRIST-EMPFEHLUNGEN

STRUKTURELL:
- Dauerhaft 2 FTEs in Finance aufstocken
- Automatisierung Invest 50k
- Schulungsprogramm Stress-Management
- Gesundheitsmanagement ausbauen

KULTURELL:
- Feedback-Kultur stärken
- Wertschätzung systematisieren
- Work-Life-Balance ernst nehmen
- Führungskräfte sensibilisieren

9. BUDGET-IMPACT

Sofortmaßnahmen: 15.000€
Überstundenauszahlung: 60.000€
Externe Unterstützung: 8.000€
Automatisierung: 10.000€
GESAMT: 93.000€

Return on Investment:
- Vermiedene Kündigungen: 150.000€
- Vermiedene Fehler: 50.000€
- Produktivitätserhalt: 200.000€
ROI: >400%

10. ENTSCHEIDUNGSBEDARF

☐ SOFORT: CEO-Kommunikation
☐ SOFORT: Budget-Freigabe 15k
☐ Tag 13: Überstunden-Regelung
☐ Tag 14: Externer Support
☐ Tag 15: Langfrist-Plan

WARNUNG: Ohne Sofortmaßnahmen droht Eskalation mit unkalkulierbaren Folgen für den Turnaround!

[HR-Leitung]
[Legal-Leitung]

"Menschen sind keine Maschinen - sie brauchen Anerkennung, Erholung und Perspektive!"`
  },

  'd12_hrlegal_ethics_hotline_closure_report.pdf': {
    filename: 'd12_hrlegal_ethics_hotline_closure_report.pdf',
    title: 'Ethik-Hotline Abschlussbericht Woche 2',
    type: 'document',
    content: `VERTRAULICH - ETHIK-HOTLINE BERICHT
Abschluss offener Hinweise Woche 2

Berichtszeitraum: Tag 6-12
Erstellt: Tag 12, 16:00 Uhr
An: CEO, CFO, Aufsichtsrat (vertraulich)

1. ÜBERSICHT EINGEGANGENE HINWEISE

Woche 2 Statistik:
- Eingegangene Hinweise: 7
- Davon anonym: 5 (71%)
- Davon mit Kontaktdaten: 2
- Bearbeitungsstatus: 6 abgeschlossen, 1 in Prüfung

Kategorien:
- Führungsverhalten: 3
- Compliance-Verstöße: 1
- Unfaire Behandlung: 2
- Sicherheitsbedenken: 1

2. DETAILANALYSE ABGESCHLOSSENE FÄLLE

FALL Y-1-W2-001: FÜHRUNGSVERHALTEN
Hinweis: Vorgesetzter setzt Team unter extremen Druck, droht mit Kündigung
Bereich: Produktion
Prüfergebnis: 
- Teilweise bestätigt
- Führungskraft unter Stress wegen Bank-Review
- Kommunikation unangemessen

Maßnahmen:
☑ Coaching-Gespräch durchgeführt
☑ Team-Mediation erfolgt
☑ Follow-up in 14 Tagen geplant
Status: ABGESCHLOSSEN

FALL Y-1-W2-002: KURZARBEIT-UNGERECHTIGKEIT
Hinweis: Bevorzugung bestimmter Mitarbeiter bei Kurzarbeit-Rotation
Bereich: Verwaltung
Prüfergebnis:
- Nicht bestätigt
- Rotation folgt dokumentiertem Plan
- Missverständnis durch mangelhafte Kommunikation

Maßnahmen:
☑ Transparente Kommunikation Rotationsplan
☑ FAQ aktualisiert
Status: ABGESCHLOSSEN

FALL Y-1-W2-003: SICHERHEITSBEDENKEN
Hinweis: Wartungsintervalle werden zur Kosteneinsparung verlängert
Bereich: Technik
Prüfergebnis:
- Teilweise bestätigt
- Verschiebung nicht-kritischer Wartungen
- Sicherheitsrelevante Wartungen planmäßig

Maßnahmen:
☑ Wartungsplan-Review mit Sicherheitsbeauftragtem
☑ Priorisierung dokumentiert
☑ Kommunikation an Team
Status: ABGESCHLOSSEN

FALL Y-1-W2-004: COMPLIANCE-VERSTOSS
Hinweis: Manipulation von Qualitätskennzahlen für Bank-Review
Bereich: Qualitätsmanagement
Prüfergebnis:
- Nicht bestätigt
- Berechnungsmethode korrekt
- Verbesserte Zahlen durch tatsächliche Maßnahmen

Maßnahmen:
☑ Externe Validierung der Kennzahlen
☑ Dokumentation der Berechnungsmethodik
Status: ABGESCHLOSSEN

FALL Y-1-W2-005: DISKRIMINIERUNG
Hinweis: Ältere Mitarbeiter bei Kurzarbeit benachteiligt
Bereich: Verschiedene
Prüfergebnis:
- Nicht bestätigt
- Statistische Analyse zeigt keine Korrelation
- Altersverteilung entspricht Gesamtbelegschaft

Maßnahmen:
☑ Transparenz-Bericht erstellt
☑ Betriebsrat informiert
Status: ABGESCHLOSSEN

FALL Y-1-W2-006: FÜHRUNG - VERTRAUENSVERLUST
Hinweis: Management kommuniziert nicht ehrlich über Firmensituation
Bereich: Allgemein
Prüfergebnis:
- Teilweise nachvollziehbar
- Kommunikation könnte transparenter sein
- Keine bewusste Täuschung

Maßnahmen:
☑ Townhall-Meeting angesetzt
☑ FAQ erweitert
☑ Kommunikationstraining Management
Status: ABGESCHLOSSEN

FALL Y-1-W2-007: Seitenzahlungen
Hinweis: Lieferanten bei Rechnungszahlung gegen Seitenzahlung bevorzugt
Bereich: OPS/FIN
Prüfergebnis:
- Nicht bestätigt
- Forensic negativ
- Keine Anhaltspunkt
☑ Transparenz-Bericht erstellt
☑ HRLEGAL informiert
Status: ABGESCHLOSSEN

3. OFFENER FALL

FALL Y-2-W2-007: INTERESSENKONFLIKT
Hinweis: Vergabe von Aufträgen an befreundetes Unternehmen
Status: IN PRÜFUNG
Nächste Schritte:
- Einkaufsunterlagen prüfen
- Interviews mit Beteiligten
- Erwarteter Abschluss: Tag 15

4. TRENDS UND MUSTER

POSITIVE ENTWICKLUNGEN:
- Weniger Hinweise als Woche 1 (7 vs. 12)
- Höhere Qualität der Hinweise
- Mehr lösbare Themen

BESORGNISERREGEND:
- Vertrauensverlust in Führung
- Stress-bedingte Konflikte steigen
- Kommunikationsdefizite häufig genannt

5. EMPFEHLUNGEN

SOFORTMASSNAHMEN:
1. Verstärkte Führungskräfte-Kommunikation
2. Stress-Management-Angebote
3. Transparenz-Offensive

STRUKTURELLE VERBESSERUNGEN:
1. Kommunikationstraining für alle Führungskräfte
2. Regelmäßige Pulse-Checks
3. Mediatoren-Pool aufbauen
4. Ethik-Hotline bekannter machen

PRÄVENTIV:
1. Compliance-Schulungen intensivieren
2. Führungsleitlinien überarbeiten
3. Whistleblower-Schutz stärken

6. BENCHMARK UND BEWERTUNG

Vergleich Branchendurchschnitt:
- Meldequote: 3.3% (Branche: 2.1%) → Positiv, zeigt Vertrauen
- Anonymitätsrate: 71% (Branche: 65%) → Normal
- Bearbeitungszeit: 3.2 Tage (Branche: 7 Tage) → Sehr gut
- Bestätigungsquote: 33% (Branche: 40%) → Akzeptabel

7. MASSNAHMEN-TRACKING

Maßnahme | Verantwortlich | Deadline | Status
---------|---------------|----------|--------
Coaching Führungskraft #001 | HR | Tag 14 | Läuft
Team-Mediation Produktion | Extern | Tag 15 | Geplant
Wartungsplan-Kommunikation | Technik | Tag 13 | In Arbeit
FAQ-Update | Komm | Tag 13 | Fertig
Townhall-Meeting | CEO | Tag 13 | Angesetzt
Compliance-Training | Legal | Tag 20 | Konzept

8. KOSTEN-NUTZEN-ANALYSE

Kosten Hotline-Betrieb:
- Externe Hotline: 2.000€/Monat
- Interne Bearbeitung: 40h/Monat
- Maßnahmen-Umsetzung: ~5.000€

Vermiedene Risiken:
- Compliance-Verstöße: >100.000€
- Kündigungen durch Konflikte: 50.000€
- Rechtsstreitigkeiten: 75.000€
- Reputationsschäden: Unbezifferbar

ROI: Eindeutig positiv

9. WEITERENTWICKLUNG ETHIK-SYSTEM

GEPLANTE VERBESSERUNGEN:
☐ Online-Portal zusätzlich zur Hotline
☐ Quartalsweise Ethik-Audits
☐ Ethik-Beauftragte in Abteilungen
☐ Jährlicher Ethik-Bericht

BUDGET 2024: 35.000€
- Hotline-Betrieb: 24.000€
- Schulungen: 8.000€
- System-Verbesserungen: 3.000€

10. FAZIT UND AUSBLICK

Die Ethik-Hotline erfüllt ihren Zweck und trägt zur Früherkennung von Problemen bei. Die Meldungen zeigen hauptsächlich stress- und kommunikationsbedingte Themen, keine systematischen Compliance-Verstöße.

Kritisch: Vertrauensverlust in Führung muss adressiert werden!

Empfehlung: Hotline-System beibehalten und weiter ausbauen. Investment von 3.000€ für bessere Bekanntmachung und Prozessoptimierung.

[Compliance Officer]
[HR-Leitung]

VERTEILER: Streng vertraulich - nur genannte Empfänger`
  },

  'd12_hrlegal_process_improvement_recommendations.docx': {
    filename: 'd12_hrlegal_process_improvement_recommendations.docx',
    title: 'Prozessverbesserungs-Empfehlungen nach Review',
    type: 'document',
    content: `PROZESSVERBESSERUNGS-EMPFEHLUNGEN
Nach Bank-Review Tag 12

An: Geschäftsführung
Von: HR/Legal Process Excellence Team  
Datum: Tag 12
Betreff: Quick Wins und strukturelle Verbesserungen

EXECUTIVE SUMMARY

Die Vorbereitung der Bank-Review hat erhebliche Prozessschwächen aufgedeckt. 
Dieses Dokument identifiziert 20+ Verbesserungspotenziale mit einem Gesamteinsparpotenzial von >500k€/Jahr.

1. QUICK WINS (UMSETZUNG <7 TAGE)

DIGITALE UNTERSCHRIFTEN
Problem: Physische Unterschriften verzögern Prozesse um 2-3 Tage
Lösung: DocuSign/Adobe Sign einführen
Kosten: 200€/Monat
Nutzen: 10h/Woche Zeitersparnis
ROI: 3 Monate

AUTOMATISIERTE REPORTS
Problem: Manuelle Erstellung Weekly Cash Report (4h)
Lösung: Excel-Makros + Power BI
Kosten: 2.000€ Einrichtung
Nutzen: 16h/Monat Zeitersparnis
ROI: 2 Monate

DIGITALER URLAUBSANTRAG
Problem: Papierbasiert, oft verloren, keine Übersicht
Lösung: HR-System Modul aktivieren
Kosten: 0€ (bereits lizenziert)
Nutzen: 90% schnellere Bearbeitung
ROI: Sofort

MEETING-PROTOKOLL-TEMPLATE
Problem: Inkonsistente Dokumentation
Lösung: Standardtemplate + OneNote
Kosten: 0€
Nutzen: Compliance-Sicherheit
ROI: Sofort

2. KURZFRISTIGE VERBESSERUNGEN (7-30 TAGE)

RECHNUNGSFREIGABE-WORKFLOW
Aktuell: 6 Tage Durchlaufzeit, 30% Fehlerquote
Verbesserung:
- Digitaler Workflow
- Automatische Prüfregeln
- Mobile Freigabe
Investment: 5.000€
Einsparung: 60.000€/Jahr (Skonti + Effizienz)

KUNDEN-TICKETING-SYSTEM
Aktuell: Emails, Anrufe, keine Transparenz
Verbesserung:
- Zendesk/Freshdesk einführen
- SLAs definieren
- Automatische Eskalation
Investment: 300€/Monat
Nutzen: 50% schnellere Reaktionszeit

ONBOARDING-PROZESS
Aktuell: 2 Wochen bis Arbeitsfähigkeit
Verbesserung:
- Digital Onboarding Package
- Buddy-System
- Checklisten-App
Investment: 3.000€
Nutzen: 5 Tage schnellere Produktivität

3. STRUKTURELLE VERBESSERUNGEN (30-90 TAGE)

ERP-SYSTEM-UPGRADE
Problem: Veraltetes System, keine Schnittstellen
Lösung: Migration auf Cloud-ERP
Investment: 150.000€
Jährliche Einsparung: 200.000€
Payback: 9 Monate

PROZESS-MINING
Problem: Ineffizienzen unbekannt
Lösung: Celonis/ähnliche Tools
Investment: 50.000€/Jahr
Potenzial: 15-20% Effizienzsteigerung

ROBOTIC PROCESS AUTOMATION
Prozesse für RPA:
- Dateneingabe (20h/Woche)
- Report-Generierung (15h/Woche)
- Stammdatenpflege (10h/Woche)
Investment: 75.000€
Einsparung: 2 FTE = 120.000€/Jahr

4. PRIORISIERUNGS-MATRIX

Priorität | Maßnahme | Aufwand | Nutzen | Start
----------|----------|---------|--------|-------
A1 | Digitale Unterschriften | Klein | Hoch | Sofort
A2 | Report-Automatisierung | Klein | Hoch | Tag 13
A3 | Rechnungsworkflow | Mittel | Hoch | Tag 15
B1 | Ticketing-System | Klein | Mittel | Tag 20
B2 | Onboarding digital | Mittel | Mittel | Tag 25
C1 | ERP-Upgrade | Hoch | Hoch | Q2/2024
C2 | RPA-Einführung | Hoch | Hoch | Q3/2024

5. CHANGE MANAGEMENT

ERFOLGSFAKTOREN:
- Management Commitment sichtbar machen
- Quick Wins früh kommunizieren
- Multiplikatoren identifizieren
- Widerstände ernst nehmen

KOMMUNIKATIONSPLAN:
Woche 1: Ankündigung Verbesserungsinitiative
Woche 2: Erste Quick Wins zeigen
Woche 3: Feedback-Runden
Woche 4: Erfolge feiern

TRAINING:
- Digital Skills: 2h/Mitarbeiter
- Prozess-Denken: 4h/Führungskraft
- Change Agents: 16h Intensiv

6. RISIKEN UND MITIGATION

Risiko | Wahrscheinlichkeit | Impact | Mitigation
-------|-------------------|--------|------------
Widerstand MA | Hoch | Mittel | Einbindung, Kommunikation
IT-Überlastung | Mittel | Hoch | Externe Unterstützung
Budget-Kürzung | Mittel | Hoch | Quick Wins priorisieren
Kompetenz-Lücken | Hoch | Mittel | Training-Programm

7. ORGANISATIONS-ENTWICKLUNG

NEUE ROLLEN SCHAFFEN:
- Process Owner für Kernprozesse
- Digital Champion pro Abteilung
- Continuous Improvement Manager

KOMPETENZ-AUFBAU:
- Lean Management Training
- Agile Methoden Workshop
- Design Thinking Sessions

KPI-FRAMEWORK:
- Prozess-Effizienz messen
- Automatisierungsgrad tracken
- Fehlerquoten monitoren
- Durchlaufzeiten optimieren

8. INVESTITIONSPLANUNG

SOFORT (genehmigt):
Quick Wins: 10.000€

Q1/2024:
Kurzfristige Maßnahmen: 35.000€

Q2-Q3/2024:
Strukturelle Verbesserungen: 275.000€

GESAMT 2024: 320.000€
EINSPARUNG 2024: >500.000€
NET BENEFIT: >180.000€

9. ERFOLGSMESSUNG

KPI | Baseline | Ziel 30 Tage | Ziel 90 Tage
----|----------|--------------|-------------
Durchlaufzeit Prozesse | 100% | 80% | 60%
Automatisierungsgrad | 15% | 25% | 40%
Fehlerquote | 8% | 5% | 3%
Mitarbeiterzufriedenheit | 45% | 55% | 70%
Prozess-Reifegrad | 2.1 | 2.5 | 3.0

10. NÄCHSTE SCHRITTE

TAG 13:
☐ Budget-Freigabe Quick Wins
☐ Projektteam nominieren
☐ Kommunikation starten

TAG 14-15:
☐ Tool-Auswahl beginnen
☐ Pilot-Bereiche definieren
☐ Change Agents schulen

TAG 16-20:
☐ Erste Quick Wins umsetzen
☐ Erfolge kommunizieren
☐ Feedback sammeln

TAG 21-30:
☐ Skalierung erfolgreicher Pilots
☐ Mittelfristige Projekte starten
☐ Review & Adjust

VERANTWORTLICHKEITEN:

Gesamt-Projektleitung: COO/CFO
Quick Wins: Abteilungsleiter
IT-Themen: CTO/IT-Leiter
Change Management: HR
Controlling: CFO-Bereich

FAZIT:

Die identifizierten Verbesserungen sind nicht "nice-to-have" sondern essentiell für nachhaltigen Turnaround. Die Quick Wins schaffen sofort Entlastung und Motivation. Die strukturellen Maßnahmen sichern langfristige Wettbewerbsfähigkeit.

Empfehlung: SOFORT starten mit Top 5 Quick Wins!

[Process Excellence Team]

"Exzellenz ist keine Einmalleistung, sondern eine Gewohnheit" - Aristoteles`
  }
};