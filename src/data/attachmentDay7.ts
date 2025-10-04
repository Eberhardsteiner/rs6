// src/data/attachmentDay7.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day7Attachments: Record<string, AttachmentContent> = {
  // CEO ATTACHMENTS
  'd07_ceo_gehaltsauszahlung_statement.pdf': {
    filename: 'd07_ceo_gehaltsauszahlung_statement.pdf',
    title: 'CEO-Statement Entwurf: Gehaltsauszahlung erfolgreich',
    type: 'document',
    content: `VERTRAULICHER ENTWURF
An: Gesamte Belegschaft
Von: Geschäftsführung
Betreff: Erfolgreiche Gehaltsauszahlung und Ausblick

Sehr geehrte Mitarbeiterinnen und Mitarbeiter,

heute Morgen wurden alle Gehälter vollständig überwiesen. Dies ist ein wichtiger Meilenstein in unserer aktuellen Restrukturierung, der nur durch Ihre außerordentliche Geduld und Ihr Vertrauen möglich wurde. Wir wissen, dass die Verzögerung für alle eine Belastung war, umso mehr freut es uns, dass wir die Löhne nun auszahlen konnten.

Die Fakten:
• Alle Mitarbeiter haben ihr volles Gehalt erhalten
• Die Liquiditätsplanung ist mit der Hausbank abgestimmt

Was dies bedeutet:
Die erfolgreiche Gehaltszahlung (Payroll) zeigt, dass unsere Stabilisierungsmaßnahmen greifen. Die konstruktiven Gespräche mit unserer Hausbank führten zu einer tragfähigen Lösung. Dies ist kein Grund zur Euphorie, aber ein solides Fundament für die nächsten Schritte.

Transparenz und Dialog:
Ab kommender Woche führen wir monatliche Belegschaftsversammlungen (Town-Hall-Meetings) ein, in denen der Vorstand direkt Rede und Antwort steht. Der erste Termin:
- Datum: Mittwoch, [Datum]
- Zeit: 14:00-15:30 Uhr
- Ort: Kantine (mit Videoübertragung für Schichtarbeiter)

Ihre Fragen sind uns wichtig:
• Neue Feedback-Box im Intranet (anonym möglich)
• Direkter Draht: geschaeftsfuehrung@aurion-ps.com
• Compliance-Hotline für vertrauliche Hinweise: 555-666

Der Weg vor uns:
Die kommenden Wochen bleiben herausfordernd. Unsere Prioritäten:
1. Langfristige Finanzierungssicherung (Eigenkapitalstärkung/Investorensuche)
2. Stabilisierung der Lieferketten (Dual-Sourcing-Strategie)
3. Intensivierung der Kundenbeziehungen (Vertragsverlängerungen)

Ihr Beitrag zählt:
Jeder von Ihnen trägt durch seine tägliche Arbeit zur Stabilisierung bei. Die Qualität unserer Produkte (PPM-Rate < 100), die Termintreue (OTD > 95%) und der Kundenservice sind unsere Trümpfe.

Anerkennung:
Ein besonderer Dank gilt:
- Dem Betriebsrat für die konstruktive Zusammenarbeit
- Der Finanzabteilung für das Krisenmanagement
- Allen Führungskräften für die transparente Kommunikation
- Ihnen allen für Ihre Loyalität und Geduld

Mit zuversichtlichem Gruß und Dank für Ihr Vertrauen

CEO
Vorsitzender der Geschäftsführung`
  },
  
  'd07_ceo_mitarbeiterkommunikation_strategie.pdf': {
    filename: 'd07_ceo_mitarbeiterkommunikation_strategie.pdf',
    title: 'Kommunikationsrichtlinie: Mitarbeiterinformation in der Restrukturierung',
    type: 'document',
    content: `INTERNE RICHTLINIE - STRENG VERTRAULICH
Kommunikation mit der Belegschaft während der Restrukturierungsphase

1. GRUNDPRINZIPIEN DER KRISENKOMMUNIKATION

1.1 Faktenbasiert
• Nur verifizierte Informationen kommunizieren
• Zahlen durch CFO/Controlling validieren lassen
• Bei Unsicherheit: "Wird geprüft" statt Spekulation

1.2 Zeitnah
• Kritische News innerhalb von 24 Stunden
• Reguläre Updates wöchentlich (jeden Mittwoch)
• Gerüchte schnell adressieren (max. 48h)

1.3 Konsistent
• Abstimmung CEO/CFO/HR vor Kommunikation
• Einheitliche Sprachregelung verwenden
• Widersprüche vermeiden

1.4 Empathisch
• Belastungssituation anerkennen
• Wertschätzung ausdrücken
• Konkrete Hilfsangebote machen

2. KOMMUNIKATIONSKANÄLE (nach Priorität)

Priorität 1: Persönliche Ansprache
- Town-Hall-Meetings (monatlich, 1. Mittwoch)
- Abteilungsrunden mit Vorstand (14-tägig)
- Führungskräfte-Kaskade für operative Themen
- Betriebsversammlung (quartalsweise)

Priorität 2: Schriftliche Updates
- CEO-Brief bei Meilensteinen (Payroll, Bankzusagen)
- Intranet-News (wöchentlich, mittwochs)
- FAQ-Bereich (laufende Aktualisierung)
- Aushänge am Schwarzen Brett

Priorität 3: Digitale Formate
- Video-Messages bei kritischen Entwicklungen
- Teams-Calls für Home-Office/Außendienst
- KPI-Dashboard (täglich aktualisiert)
- Podcast "Klartext" (monatlich)

3. THEMENCLUSTER UND VERANTWORTLICHKEITEN

Finanzsituation (CFO-Lead):
- Liquiditätsstatus (13-Wochen-Vorschau)
- Bankgespräche (Ergebnisse nach Terminen)
- Gehaltssicherheit (monatliche Bestätigung)
- Kennzahlen (EBITDA, Cash, Working Capital)

Operative Stabilität (COO-Lead):
- Lieferfähigkeit und OTD-Rate
- Qualitätskennzahlen (PPM, Reklamationen)
- Kundenbeziehungen und Neuaufträge
- Lieferantensituation

Personalthemen (HR-Lead):
- Arbeitsplatzsicherheit und Perspektiven
- Überstunden/Mehrarbeit-Regelungen
- Sozialleistungen und Benefits
- Gesundheitsmanagement

Strategische Themen (CEO-Lead):
- Investorensuche/M&A-Aktivitäten
- Marktentwicklung und Wettbewerb
- Innovationen und Zukunftsprojekte
- Standortsicherung

4. ESKALATIONSPFADE FÜR MITARBEITERANLIEGEN

Stufe 1: Direkte Führungskraft
→ Tägliche Ansprechbarkeit
→ Dokumentation in CRM

Stufe 2: HR Business Partner
→ Sprechstunde Di/Do 14-16 Uhr
→ Vertrauliche Beratung

Stufe 3: Bereichsleitung/Vorstand
→ Monatliche Sprechstunde
→ Voranmeldung über Sekretariat

Stufe 4: CEO direkt
→ CEO@unternehmen.de
→ Antwort binnen 72h garantiert

5. KOMMUNIKATIONS-TABUS (NO-GOs)

❌ Unbestätigte Gerüchte kommentieren
❌ Unrealistische Versprechen ("Alles wird gut")
❌ Schuldzuweisungen (Bank, Kunden, Markt)
❌ Widersprüchliche Aussagen
❌ Kommunikation ohne Vorstandsfreigabe
❌ Dramatisierung oder Verharmlosung
❌ Vertrauliche Informationen leaken

6. SPRACHREGELUNGEN (Dos & Don'ts)

Statt: "Krise" → Besser: "Herausfordernde Phase"
Statt: "Insolvenzgefahr" → Besser: "Restrukturierung"
Statt: "Entlassungen" → Besser: "Personalanpassung" (nur wenn unvermeidlich)
Statt: "Liquiditätsprobleme" → Besser: "Cash-Flow-Management"
Statt: "Banken machen Druck" → Besser: "Intensive Abstimmung mit Finanzpartnern"

7. ERFOLGSMESSUNG DER KOMMUNIKATION

Quantitative KPIs:
- Teilnahmequote Town-Halls (Ziel: >70%)
- Intranet-Zugriffe (Unique User/Woche)
- FAQ-Nutzung (Views/Updates)
- Rücklaufquote Mitarbeiterbefragung

Qualitative KPIs:
- Stimmungsbarometer (monatlicher Pulse-Check)
- Fluktuationsrate (Ziel: <5% p.a.)
- Krankenstand (Ziel: <6%)
- Feedback-Qualität

8. BESONDERE SITUATIONEN

Medienanfragen:
→ Verweis an Pressestelle
→ Keine Einzelinterviews ohne Freigabe
→ Social Media: Zurückhaltung

Kundenanfragen zur Lage:
→ Standardstatement verwenden
→ Fokus auf Leistungsfähigkeit
→ Bei Bedarf: Führungskraft einschalten

Lieferantenanfragen:
→ Verweis an Einkauf/CFO
→ Zahlungsfähigkeit bestätigen
→ Langfristperspektive betonen

9. RECHTLICHE HINWEISE

- Informationspflicht nach BetrVG beachten
- Insiderrecht bei börsennotierten Kunden/Lieferanten
- Datenschutz bei personenbezogenen Informationen
- Dokumentationspflicht für Compliance

10. ANLAGEN

□ Muster CEO-Brief
□ FAQ-Template
□ Krisen-Kommunikationsplan
□ Kontaktliste Krisenstab
□ Standardstatements (DE/EN)
□ PowerPoint-Template Town-Hall

Freigabe: GF/CFO/HR
Gültigkeit: Ab sofort
Review: Monatlich
Version: 2.1
Stand: Tag 7`
  },

  'd07_ceo_kundenbindung_vertragsverlaengerung.pdf': {
    filename: 'd07_ceo_kundenbindung_vertragsverlaengerung.pdf',
    title: 'Kundenanalyse: Vertragsverlängerungspotenziale und Handlungsempfehlungen',
    type: 'spreadsheet',
    content: `KUNDENBINDUNGSANALYSE - TAG 7
Vertraulichkeitsstufe: STRENG VERTRAULICH - Nur für Geschäftsleitung

EXECUTIVE SUMMARY:
• 42 A-Kunden mit Restlaufzeit < 12 Monate
• Gefährdeter Jahresumsatz: 8,4 Mio. EUR
• Quick-Win-Potenzial: 3,2 Mio. EUR bei 2-Jahres-Bindung
• Empfehlung: Sofort-Offensive bei Top-10

DETAILANALYSE TOP-10 KUNDEN:

Rang | Kunde | Umsatz p.a. | Restlaufzeit | DB1 | Zahlungsziel | Verlängerungschance | Maßnahme
-----|-------|-------------|--------------|-----|--------------|--------------------|---------
1 | Alpha Automotive GmbH | 680.000 € | 3 Monate | 42% | 30 Tage | Hoch (85%) | CEO-Call + 2J + Bonus
2 | Beta Systems AG | 540.000 € | 5 Monate | 38% | 45 Tage | Mittel (60%) | CFO-Call + Preisgarantie
3 | Gamma TechSolutions | 490.000 € | 2 Monate | 45% | 60 Tage | Kritisch (30%) | Sofort CEO vor Ort
4 | Delta Manufacturing | 420.000 € | 8 Monate | 35% | 30 Tage | Hoch (75%) | 2J + 2% Rabatt
5 | Epsilon Logistics | 380.000 € | 4 Monate | 40% | 45 Tage | Mittel (55%) | SLA-Gold + 1J
6 | Zeta Industries | 350.000 € | 6 Monate | 41% | 30 Tage | Hoch (80%) | Rahmenvertrag 3J
7 | Eta Electronics | 320.000 € | 3 Monate | 37% | 60 Tage | Niedrig (25%) | Krisenintervention
8 | Theta Chemicals | 310.000 € | 7 Monate | 43% | 45 Tage | Mittel (65%) | Tech-Workshop anbieten
9 | Iota Automotive | 290.000 € | 5 Monate | 39% | 30 Tage | Hoch (70%) | Co-Innovation Projekt
10 | Kappa Machinery | 280.000 € | 9 Monate | 36% | 45 Tage | Mittel (50%) | Flexibler Abruf

SZENARIEN-RECHNUNG:

Szenario A: "STABILITY PLUS" - 2-Jahres-Push mit Servicebonus
• Investition (kurfristige Auswirkung): 32.000 EUR einmalig + 2.000 EUR Betreuung
• Erwartete Bindungsquote: 75% der A-Kunden
• Umsatzsicherung: 6,3 Mio. EUR
• DB1-Effekt: +2,4 Mio. EUR über 2 Jahre
• Cash-Effekt: Positiv nach 3 Monaten
• Bankrating-Impact: Sehr positiv (+++)
• Mitarbeitereffekt: Motivationssteigerung

Szenario B: "WAIT & SEE" - 1-Jahr ohne Incentives  
• Kosten: 0 EUR
• Erwartete Bindung: 45% der A-Kunden
• Umsatzsicherung: 3,8 Mio. EUR  
• DB1-Effekt: +1,4 Mio. EUR
• Cash-Effekt: Neutral
• Bankrating-Impact: Leicht positiv (+)
• Risiko: Abwanderung zu Wettbewerb

Szenario C: "PRICE FIGHTER" - 3%-Rabatt-Offensive
• Kosten: 252.000 EUR p.a. (3% von 8,4 Mio)
(kurzfristige Auswirkung 56k)
• Erwartete Bindung: 65% der A-Kunden
• Umsatzsicherung: 5,5 Mio. EUR
• DB1-Effekt: +1,8 Mio. EUR (nach Rabatt)
• Cash-Effekt: Negativ ersten 6 Monate
• Bankrating-Impact: Neutral bis negativ
• Risiko: Preisspirale, Margenerosion

WETTBEWERBSANALYSE:

Hauptwettbewerber | Stärken | Schwächen | Abwerbestrategie
-----------------|---------|-----------|------------------
CompetitorTech | Preis -10% | Qualität | Lockangebote
GlobalSupply | Lieferzeit | Service | Rahmenverträge
LocalChamp | Regional | Kapazität | Persönliche Beziehung

VERTRIEBSARGUMENTATION (Elevator Pitch):

"Trotz aktueller Herausforderungen garantieren wir:
1. Preisstabilität für 24 Monate (trotz 8% Inflation)
2. Bevorzugte Belieferung durch dedizierte Kapazitäten
3. Persönlicher Eskalationspfad zum Management
4. Innovationspartnerschaft mit quartalsweisen Tech-Days
5. Flexible Abrufmengen (+/- 20% ohne Aufpreis)"

RISIKOBEWERTUNG:

Risikofaktor | Wahrscheinlichkeit | Impact | Gegenmaßnahme
-------------|-------------------|--------|---------------
Negative Presse | Hoch (70%) | Mittel | Referenzkunden aktivieren
Lieferverzug | Mittel (40%) | Hoch | Sicherheitslager aufbauen
Preisdruck | Hoch (80%) | Mittel | Value-Selling intensivieren
Zahlungsausfall | Niedrig (20%) | Hoch | Kreditversicherung prüfen
Kündigungswelle | Mittel (50%) | Hoch | Retention-Programm

QUICK WINS (binnen 48 Stunden):

✓ Top-3-Kunden: CEO-Anruf heute
✓ Top-10-Kunden: Terminanfrage diese Woche  
✓ Vertriebsmeeting: Morgen 8 Uhr
✓ Angebotsvorlagen: Heute finalisieren
✓ Erfolgs-Stories: Im Intranet publizieren
✓ Kunden-Event: In 4 Wochen planen

KEY ACCOUNT MANAGEMENT:

Kundensegment | Anzahl | Umsatz | Strategie | Owner
--------------|--------|--------|-----------|------
Platinum (>500k) | 5 | 2,5 Mio | CEO-Level | CEO/CSO
Gold (200-500k) | 15 | 4,2 Mio | Executive | Vertriebsleitung
Silver (100-200k) | 22 | 2,8 Mio | Standard | Key Account Manager
Bronze (<100k) | 85 | 3,5 Mio | Digital | Inside Sales

FORECAST VERTRAGSVERLÄNGERUNGEN:

Monat | Auslaufend | Verlängerung erwartet | Umsatzeffekt | Kumuliert
------|-----------|---------------------|--------------|----------
Monat 1 | 8 | 5 (63%) | +380k | 380k
Monat 2 | 6 | 4 (67%) | +290k | 670k
Monat 3 | 7 | 5 (71%) | +420k | 1.090k
Q2 | 12 | 9 (75%) | +980k | 2.070k
Q3 | 9 | 7 (78%) | +720k | 2.790k

INTERNE RESSOURCEN:

• Vertriebsteam: 12 Personen (davon 3 Großkunden)
• Marketing-Support: 2 Personen
• Technischer Vertrieb: 4 Personen
• Customer Success: 3 Personen
• After Sales: 5 Personen

MASSNAHMENPLAN:

Priorität | Maßnahme | Verantwortlich | Termin | Status
---------|----------|---------------|--------|--------
1 | CEO-Calls Top-5 | CEO | Heute | Offen
2 | Angebote erstellen | Vertrieb | Morgen | In Arbeit
3 | Referenzen aufbereiten | Marketing | Diese Woche | Offen
4 | Kundenevent planen | CSO | KW+4 | Offen
5 | Win-Back-Kampagne | Vertrieb | KW+2 | Planung

Freigabe: CEO/CFO
Erstellt: Tag 7, 09:00 Uhr  
Nächstes Update: Tag 8, 09:00 Uhr`
  },

  'd07_ceo_vertragsverlaengerung_vorlage.pdf': {
    filename: 'd07_ceo_vertragsverlaengerung_vorlage.pdf',
    title: 'Mustervertrag: Verlängerungsangebot für A-Kunden',
    type: 'document',
    content: `VERTRAGSVERLÄNGERUNG - SONDERKONDITIONEN
Programm "STABILITY PLUS 2025"

[Kundenname]
[Anschrift]
z.Hd. [Ansprechpartner]
[Datum]

Betreff: Exklusives Verlängerungsangebot für bewährte Partnerschaft

Sehr geehrte/r Frau/Herr [Name],

nach [X] Jahren erfolgreicher Zusammenarbeit möchten wir Ihnen ein exklusives Verlängerungsangebot unterbreiten, das Ihnen Planungssicherheit und attraktive Zusatzleistungen bietet.

VERLÄNGERUNGSANGEBOT "STABILITY PLUS"

Vertragslaufzeit: 24 Monate 
Beginn: [Datum]
Ende: [Datum + 24 Monate]

1. LEISTUNGSUMFANG

Grundleistungen (wie bisher):
• Lieferung gemäß Rahmenvertrag Nr. [XXX]
• Technische Spezifikationen unverändert
• Lieferorte gemäß Anlage A

Erweiterte Service-Level (NEU):
• Garantierte Lieferzeiten: Max. 5 Arbeitstage (bisher: 10 AT)
• On-Time-Delivery (OTD): Mind. 98% (bisher: 95%)
• Qualitätsniveau: Max. 50 PPM (bisher: 100 PPM)
• Reaktionszeit bei Reklamationen: 4 Stunden (bisher: 24h)

Zusätzliche Benefits:
✓ Preisstabilität: Keine Preiserhöhung für 24 Monate
✓ Servicebonus: Einmalige Gutschrift von 1.000 EUR
✓ Dedizierter Key Account Manager mit Direktdurchwahl
✓ Monatliche Performance-Reviews (persönlich oder digital)
✓ 24/7-Eskalationshotline für Notfälle
✓ 2 kostenlose Qualitätsaudits pro Jahr
✓ Bevorzugte Belieferung bei Kapazitätsengpässen
✓ Quartalsweise Executive-Meetings (CEO/Einkaufsleitung)
✓ Zugang zu Innovationsprojekten und Vorab-Mustern

2. KOMMERZIELLE KONDITIONEN

Preise:
• Einfrierung auf aktuellem Niveau (siehe Anlage B)
• Keine Weitergabe von Rohstoffpreissteigerungen
• Keine Energiekostenzuschläge
• Währungsklausel: EUR-Fixierung

Zahlungsbedingungen:
• Unverändert: [30/45/60] Tage netto
• Optional: 2% Skonto bei Zahlung innerhalb 10 Tagen
• Kreditlimit: [Betrag] EUR

Mengenflexibilität:
• Abruftoleranz: +/- 20% ohne Preisanpassung
• Mindestbestellmenge: Reduziert um 25%
• Konsignationslager möglich (Vereinbarung gesondert)

3. BESONDERE VEREINBARUNGEN

Change-of-Control-Klausel (CoC):
"Bei einem Kontrollwechsel (>50% der Anteile) auf Seiten des Lieferanten erhält der Kunde ein Sonderkündigungsrecht mit 3-monatiger Frist zum Monatsende."

Force-Majeure-Regelung:
"Höhere Gewalt umfasst auch Pandemien, Cyberangriffe und behördliche Produktionsstopps. Nachweis- und Minderungspflicht bleiben bestehen."

Continuous-Improvement-Programm (CIP):
"Jährliche Effizienzsteigerung von mind. 2% wird angestrebt. Einsparungen werden 50:50 geteilt."

Nachhaltigkeitsklausel:
"Lieferant verpflichtet sich zur CO2-Reduktion um 10% p.a. und legt jährlichen Nachhaltigkeitsbericht vor."

4. QUALITÄTSSICHERUNG

Vereinbarte Kennzahlen:
• PPM-Rate: Max. 50 (Parts Per Million)
• Erstmusterfreigabe: Max. 10 Arbeitstage
• 8D-Reports: Innerhalb von 5 Arbeitstagen
• Lieferantenbewertung: Mind. 90 Punkte

Pönale-Regelung:
• Bei OTD < 95%: 0,5% Preisnachlass
• Bei PPM > 100: 1% Preisnachlass
• Kumuliert max. 3% pro Quartal

5. INNOVATION UND ENTWICKLUNG

Gemeinsame Projekte:
• Quartalsweise Innovationsworkshops
• Zugang zu F&E-Ressourcen (40h/Quartal)
• Co-Development bei 2 Projekten/Jahr
• Shared IP bei gemeinsamen Entwicklungen

Digitalisierung:
• EDI-Anbindung ohne Zusatzkosten
• Zugang zu Lieferantenportal
• Echtzeit-Tracking von Lieferungen
• Digitale Rechnungsstellung

6. RECHTLICHE RAHMENBEDINGUNGEN

Gerichtsstand: [Ort]
Anwendbares Recht: Deutsches Recht unter Ausschluss UN-Kaufrecht
Schriftform: Änderungen nur schriftlich
Salvatorische Klausel: Standardformulierung

7. GÜLTIGKEIT UND ANNAHME

Dieses Angebot ist gültig bis: [Datum + 14 Tage]

Annahme erfolgt durch:
□ Unterschrift und Rücksendung
□ Elektronische Bestätigung (qualifiziert)
□ Konkludente Auftragserteilung

8. ANLAGEN

Anlage A: Lieferorte und Versandvorschriften
Anlage B: Preisliste (Stand: Tag 7)
Anlage C: Technische Spezifikationen
Anlage D: SLA-Definition "Gold-Standard"
Anlage E: Referenzen vergleichbarer Kunden
Anlage F: Wirtschaftsauskunft (Creditreform)

9. IHR NUTZEN AUF EINEN BLICK

✓ Planungssicherheit für 2 Jahre
✓ Garantierte Preisstabilität
✓ Verbesserte Lieferperformance
✓ Direkte Eskalationswege
✓ Messbare Qualitätssteigerung
✓ Innovationspartnerschaft
✓ Finanzielle Vorteile (>50.000 EUR)

10. KONTAKT FÜR RÜCKFRAGEN

CEO


PS: Gerne erläutern wir Ihnen die Vorteile in einem persönlichen Gespräch. 
Terminvorschläge: [Datum 1], [Datum 2], [Datum 3]`
  },

  'd07_ceo_beirat_bank_briefing.pdf': {
    filename: 'd07_ceo_beirat_bank_briefing.pdf',
    title: 'Briefing-Unterlage: Vorbereitung Beirat-Bank-Gespräch',
    type: 'document',
    content: `STRENG VERTRAULICH - NUR FÜR TEILNEHMER
Vorbereitungsmeeting Beirat-Bank-Gespräch
Datum: Tag 7, 10:00-11:30 Uhr
Teilnehmer: CEO, CFO, Beiratsvorsitzender
Ort: Vorstandsbüro

AGENDA UND GESPRÄCHSLEITFADEN

1. ZIELSETZUNG DES MEETINGS (10 Min.)
   
   Hauptziel: Abgestimmte Kommunikation ("One Voice")
   
   Erfolgskriterien:
   • Bank bestätigt/erweitert Kreditlinie
   • Covenant-Waiver grundsätzlich zugesagt
   • Vertrauen in Restrukturierung gestärkt
   • Nächster Review-Termin in 30+ Tagen

2. STATUS UPDATE - KERNBOTSCHAFTEN (20 Min.)
   
   CFO präsentiert:
   
   a) Liquidität (13-Wochen-Forecast)
   - Aktueller Kontostand: 1,2 Mio. EUR
   - Verfügbare Linie: 2,8 Mio. EUR
   - Kritische Woche: KW+3 (Steuerzahlung)
   - Puffer: 400.000 EUR
   
   b) Covenant-Status
   - EBITDA YTD: -15% ggü. Plan
   - Eigenkapitalquote: 18% (Soll: >20%)
   - Verschuldungsgrad: 3,8x (Soll: <3,5x)
   - Working Capital: 4,2 Mio. EUR
   
   c) Milestone-Tracking
   ✓ Payroll gesichert (100%)
   ✓ Kostensenkung initiiert (60%)
   □ Umsatzsteigerung (30%)
   □ Investorengespräche (20%)

3. KRITISCHE THEMEN - ARGUMENTATIONSLINIEN (25 Min.)
   
   Thema: Covenant-Breach EBITDA
   
   Faktenlage:
   - Q1 EBITDA: -480k EUR (Plan: +320k)
   - Hauptgründe: Einmaleffekte (60%), Markt (40%)
   - Gegenmaßnahmen eingeleitet
   
   Argumentationslinie:
   "Der EBITDA-Rückgang ist temporär und größtenteils auf Einmaleffekte zurückzuführen. Die Frühindikatoren (Auftragseingang +22%, Qualität verbessert) zeigen, dass die Trendwende eingeleitet ist."
   
   Waiver-Request:
   - Aussetzung für 2 Quartale
   - Oder: Anpassung auf realistisches Niveau
   - Kompensation: Zusätzliches Reporting

4. BANK-ERWARTUNGSMANAGEMENT (20 Min.)
   
   Erwartete Fragen und Modellantworten:
   
   Q: "Wie realistisch ist der Turnaround?"
   A: "Die Frühindikatoren sind positiv. Payroll gesichert, Aufträge steigen, erste Kostensenkungen greifen. Q2 wird zeigen, ob der Trend nachhaltig ist. Wir sind vorsichtig optimistisch."
   
   Q: "Welche Alternativen zur Kreditlinie existieren?"
   A: "Wir sind in fortgeschrittenen Gesprächen mit zwei Industrieinvestoren für eine Minderheitsbeteiligung. Zusätzlich prüfen wir Asset-Sales und haben Fördermittel beantragt."
   
   Q: "Wie ist die Gesellschafterposition?"
   A: "Die Gesellschafter stehen voll hinter der Restrukturierung. Eine Kapitalerhöhung von bis zu 2 Mio. EUR ist möglich, sobald die Perspektive klar ist."
   
   Q: "Was passiert bei Scheitern?"
   A: "Wir haben einen strukturierten M&A-Prozess vorbereitet. Mehrere strategische Käufer haben Interesse signalisiert. Ein Notverkauf ist nicht notwendig."
   
   Q: "Warum sollten wir die Linie halten?"
   A: "Die Substanz ist intakt, der Markt erholt sich, unsere Marktposition ist stark. Ein Abbruch jetzt würde Werte vernichten. Mit 6 Monaten Zeit schaffen wir die Wende."

5. ROLLENVERTEILUNG IM BANKGESPRÄCH (10 Min.)
   
   CEO :
   - Eröffnung und strategischer Ausblick
   - Investorengespräche und M&A-Optionen
   - Markt und Wettbewerb
   - Abschluss und Commitments
   
   CFO:
   - Zahlen und Forecasts
   - Covenant-Diskussion
   - Liquiditätsplanung
   - Technische Details
   
   Beirat (Prof. Weber):
   - Unabhängige Einschätzung
   - Bestätigung der Strategie
   - Governance und Kontrolle
   - Vertrauensbildung

6. KOMMUNIKATIONS-DOS AND DON'TS (10 Min.)
   
   DOs:
   ✓ Transparenz bei Herausforderungen
   ✓ Konkrete Maßnahmen mit Zeitplan
   ✓ Messbare Fortschritte betonen
   ✓ Quick Wins hervorheben
   ✓ Dank für bisherige Unterstützung
   ✓ Verbindlichkeit ohne Unterwürfigkeit
   
   DON'Ts:
   ✗ Beschönigung der Lage
   ✗ Unrealistische Versprechen
   ✗ Widersprüchliche Aussagen
   ✗ Kritik an Bankverhalten
   ✗ Dramatisierung
   ✗ Zeitdruck aufbauen

7. SIMULATIONSÜBUNG (15 Min.)
   
   Kritische Dialogsequenzen üben:
   
   Sequenz 1: Covenant-Breach erklären
   Sequenz 2: Investorenprozess darstellen
   Sequenz 3: Liquiditätsengpass adressieren
   Sequenz 4: Vertrauensfrage beantworten

8. UNTERLAGEN FÜR BANKTERMIN (5 Min.)
   
   Mitzubringen:
   □ 13-Wochen-Liquiditätsplan (final)
   □ Covenant-Berechnung mit Brücke
   □ Milestone-Tracking (Ampelsystem)
   □ Investoren-Teaser (vertraulich)
   □ Beirats-Statement (1 Seite)
   □ Präsentation (12 Slides max.)

9. NEXT STEPS BIS BANKTERMIN (5 Min.)
   
   Heute, 14:00: Zahlen-Update (CFO)
   Heute, 16:00: Beirats-Statement abstimmen
   Morgen, 09:00: Präsentation finalisieren
   Morgen, 11:00: Generalprobe
   Morgen, 14:00: Banktermin

10. PLAN B - WENN GESPRÄCH SCHLECHT LÄUFT
    
    Eskalationsstufen:
    1. Bedenkzeit erbitten (24-48h)
    2. Gesellschafter einbeziehen
    3. Senior Management der Bank
    4. Alternative Finanzierung aktivieren
    5. Kommunikation vorbereiten

ANLAGEN:
- 13-Wochen-Liquiditätsplan (CFO)
- Covenant-Berechnung mit Sensitivitäten
- Milestone-Tracking Dashboard
- Entwurf Beirats-Statement
- Bank-Präsentation (Draft v3)

NOTIZEN:
[Kosten für große Beiratslösung: 6k, wenn kleine Lösung ohne Vorbereitung 3k]`
  },

  'd07_ceo_bankkommunikation_protokoll.pdf': {
    filename: 'd07_ceo_bankkommunikation_protokoll.pdf',
    title: 'Protokoll: Standards für Bankkommunikation',
    type: 'document',
    content: `KOMMUNIKATIONSPROTOKOLL HAUSBANK
Verhaltenskodex während der Restrukturierungsphase

PRÄAMBEL
Die Kommunikation mit unserer Hausbank ist in der aktuellen Phase geschäftskritisch. Jede Interaktion kann direkten Einfluss auf unsere Kreditlinien (derzeit: 4 Mio. EUR), Konditionen (Zinssatz, Sicherheiten) und Handlungsspielräume haben.

1. KOMMUNIKATIONSGRUNDSÄTZE

1.1 Single Point of Truth
- Alle Zahlen müssen vom CFO validiert sein
- Keine widersprüchlichen Aussagen zwischen Personen
- Schriftlichkeit bei allen Zusagen
- Dokumentation aller Gespräche

1.2 Proaktive Transparenz  
- Negative Entwicklungen innerhalb 48h melden
- Positive Entwicklungen am selben Tag kommunizieren
- Keine Überraschungen bei Reportings
- Probleme mit Lösungsvorschlägen präsentieren

1.3 Professionelle Distanz
- Sachlich-konstruktiver Ton
- Keine emotionalen Reaktionen
- Verbindlich aber nicht unterwürfig
- Geschäftsbeziehung, keine Freundschaft

2. BERECHTIGTE SPRECHER (SPOKESPERSONS)

Stufe A - Strategische Themen:
- Dr. Michael Steinberg (CEO)
- Klaus Schmidt (CFO)  
- Prof. Dr. Weber (Beiratsvorsitzender)

Stufe B - Operative Themen:
- Maria Hofmann (Head of Treasury)
- Thomas Berg (Head of Controlling)

Stufe C - Administrative Themen:
- Treasury Team (nur nach Freigabe)
- Assistenz GF (Terminkoordination)

Nicht berechtigt:
- Alle anderen Mitarbeiter
- Externe Berater ohne Mandat
- Gesellschafter (nur über CEO)

3. THEMENKATALOG UND VERANTWORTLICHKEITEN

Liquidität/Cash Management:
- Lead: CFO (Klaus Schmidt)
- Support: Head of Treasury
- Frequenz: Wöchentlich (Mittwoch, 14:00)
- Format: Excel-Template "13-Week-Cashflow"

Financial Covenants:
- Lead: CFO
- Support: Head of Controlling
- Frequenz: Monatlich zum 5. Werktag
- Format: Standardisierte Berechnung mit Herleitung

Strategische Optionen (M&A, Investoren):
- Lead: CEO
- Support: CFO, ggf. Beirat
- Frequenz: Bei Material Change
- Format: Management Präsentation

Operative Performance:
- Lead: CFO
- Support: COO
- Frequenz: Monatlich
- Format: KPI-Dashboard (10 Kennzahlen)

4. ESKALATIONSSTUFEN

Normal (Grün):
- Reguläre Jour-Fixes
- Standardreporting per Mail
- Reaktionszeit: 48-72h

Erhöht (Gelb):
- Sondertermine binnen 24h möglich
- Erweiterte Berichterstattung
- Conference Calls mit Vorstand
- Reaktionszeit: 24h

Kritisch (Rot):
- Sofort-Termin (same day)
- CEO/CFO persönlich vor Ort
- Beirat wird einbezogen
- Gesellschafter in Bereitschaft
- Reaktionszeit: 2-4h

5. DOKUMENTATIONSPFLICHT

Für alle Bankgespräche gilt:
- Schriftliches Protokoll binnen 24h
- Versand an Teilnehmer zur Abstimmung
- Bestätigung wesentlicher Punkte durch Bank
- Ablage in SharePoint unter "Bank-Kommunikation"
- Information an Compliance

Minimaler Protokollinhalt:
- Datum, Zeit, Teilnehmer
- Besprochene Themen
- Vereinbarungen/Zusagen
- Offene Punkte
- Nächste Schritte mit Termin

6. FRÜHWARNSIGNALE VERTRAUENSVERLUST

Warnstufe 1 (Gelb):
⚠️ Kürzere Fristen für Berichte
⚠️ Zusätzliche Unterlagen angefordert
⚠️ Mehr Teilnehmer von Bankseite

Warnstufe 2 (Orange):
⚠️ Schriftform statt Telefonate
⚠️ Verweis auf Kreditausschuss
⚠️ Nachfragen zu Gesellschaftern

Warnstufe 3 (Rot):
⚠️ Sonderkündigungsrechte erwähnt
⚠️ Zusätzliche Sicherheiten gefordert
⚠️ Externe Prüfer angekündigt

Sofortmaßnahmen bei Warnsignalen:
→ CEO-Gespräch anbieten
→ Vor-Ort-Termin in Bankzentrale
→ Beirat als Mediator einschalten
→ Positive Entwicklungen sammeln
→ Plan B aktivieren (Alternative Banken)

7. POSITIVE SIGNALE UND VERSTÄRKUNG

Bei guten Nachrichten:
✓ Sofort melden (binnen 2 Stunden)
✓ Kontext herstellen (Trend, Nachhaltigkeit)
✓ Zahlen untermauern
✓ Nächste Erfolge ankündigen
✓ Dank für Unterstützung aussprechen

Beispiele positiver Nachrichten:
- Großauftrag gewonnen
- Meilenstein erreicht
- Kostenziel übertroffen
- Investor-Interesse
- Qualitätsverbesserung

8. KOMMUNIKATIONS-TABUS

Absolut zu vermeiden:
❌ "Kein Problem" (bei ernsten Themen)
❌ Schuldzuweisungen an Bank
❌ Ultimaten oder Drohungen
❌ Zusagen ohne interne Abstimmung
❌ Vertrauliche Interna preisgeben
❌ Parallelgespräche mit anderen Banken erwähnen
❌ Emotionale Ausbrüche
❌ Gesellschafterkonflikte thematisieren

9. SPRACHREGELUNGEN (WORDING)

Empfohlene Formulierungen:

Statt: "Liquiditätskrise"
→ "Temporärer Liquiditätsengpass"

Statt: "Die Lage ist kritisch"  
→ "Wir navigieren durch eine herausfordernde Phase"

Statt: "Ohne Sie sind wir pleite"
→ "Ihre Unterstützung ist ein wichtiger Stabilitätsfaktor"

Statt: "Der Markt bricht zusammen"
→ "Wir sehen temporäre Marktverwerfungen"

Statt: "Wir können Covenant nicht einhalten"
→ "Wir möchten Covenant-Anpassungen besprechen"

10. MEETING-VORBEREITUNG CHECKLISTE

Vor jedem Banktermin:
□ Zahlen mit CFO abstimmen
□ Sprechzettel vorbereiten
□ Unterlagen vollständig
□ Rollenteilung klären
□ Plan B in Schublade
□ Nachbereitung planen

ANHANG:
A. Template 13-Wochen-Liquidität
B. Covenant-Berechnungsschema
C. Muster-Gesprächsprotokoll
D. Kontaktliste Hausbank
E. Notfallplan Kreditlinie
F. Alternative Finanzierungsquellen

Freigabe: CEO/CFO
Version: 3.1
Stand: Tag 7
Review: Wöchentlich`
  },

  // CFO ATTACHMENTS
  'd07_cfo_liquiditaetsplanung_rolling.pdf': {
    filename: 'd07_cfo_liquiditaetsplanung_rolling.pdf',
    title: '13-Wochen-Liquiditätsplanung (Rolling Forecast)',
    type: 'spreadsheet',
    content: `13-WOCHEN-LIQUIDITÄTSPLANUNG
Stand: Tag 7, 14:00 Uhr
Status: VERTRAULICH - Bank-Version

EXECUTIVE SUMMARY:
• Kritischste Woche: KW+3 (Steuernachzahlung)
• Minimum-Cash: 380.000 EUR (KW+4)
• Handlungsbedarf: Kundenzahlungen beschleunigen

WOCHENÜBERSICHT (in TEUR, PLANUNG ab WOCHE +1):

Woche | Anfang | Einzahlungen | Auszahlungen | Saldo | Kreditlinie | Gesamt
------|--------|--------------|--------------|-------|-------------|--------
KW+1  | 970    | 520          | 440          | 1.050 | 2.800       | 3.850
KW+2  | 1.050  | 380          | 510          | 920   | 2.800       | 3.720
KW+3  | 920    | 410          | 890          | 440   | 2.800       | 3.240
KW+4  | 440    | 480          | 540          | 380   | 2.800       | 3.180
KW+5  | 380    | 620          | 460          | 540   | 2.800       | 3.340
KW+6  | 540    | 580          | 490          | 630   | 2.800       | 3.430
KW+7  | 630    | 550          | 520          | 660   | 2.800       | 3.460
KW+8  | 660    | 590          | 480          | 770   | 2.800       | 3.570
KW+9  | 770    | 610          | 500          | 880   | 2.800       | 3.680
KW+10 | 880    | 640          | 510          | 1.010 | 2.800       | 3.810
KW+11 | 1.010  | 600          | 490          | 1.120 | 2.800       | 3.920
KW+12 | 1.120  | 630          | 500          | 1.250 | 2.800       | 4.050
KW+13 | 1.250  | 650          | 480          | 1.420 | 2.800       | 4.220

DETAILANALYSE KRITISCHE WOCHEN:

KW+3 (Kritischste Woche):
Einzahlungen:
- Kundenzahlungen: 380 TEUR (davon unsicher: 120 TEUR)  
- Sonstige: 30 TEUR

Auszahlungen:
- Lohn/Gehalt: 420 TEUR (ohne Kurzarbeitseffekte)
- Steuernachzahlung: 280 TEUR
- Lieferanten P1: 140 TEUR
- Sonstige: 50 TEUR

Zahlung Lieferanten
60 TEUR oder priorisiert 30 TEUR

Maßnahmen zur Absicherung:
1. Factoring für Großkunde (150 TEUR)
2. Zahlungsziel Steuern verhandeln
3. Lieferanten auf KW+4 verschieben

SENSITIVITÄTSANALYSE:

Szenario | Wahrscheinlichkeit | Min-Cash | Kreditbedarf | Maßnahmen
---------|-------------------|----------|--------------|----------
Base Case | 60% | 380 TEUR | 0 | Monitoring
Pessimistisch | 30% | -120 TEUR | 500 TEUR | Krediterhöhung
Optimistisch | 10% | 680 TEUR | 0 | Sondertilgung

WESENTLICHE ZAHLUNGSSTRÖME:

TOP-5 EINZAHLUNGEN (Gesamt: 7.280 TEUR):
1. Alpha GmbH: 680 TEUR (verteilt auf 4 Wochen)
2. Beta AG: 540 TEUR (KW+2 und KW+6)
3. Gamma Tech: 490 TEUR (KW+5)
4. Fördermittel: 250 TEUR (KW+8, unsicher)
5. Sonstige Kunden: 5.320 TEUR

TOP-5 AUSZAHLUNGEN (Gesamt: 6.860 TEUR):
1. Personal: 2.240 TEUR (4x Payroll)
2. Steuern/Soziales: 896 TEUR
3. Lieferanten kritisch: 1.240 TEUR
4. Energie/Miete: 620 TEUR
5. Sonstige: 1.080 TEUR

RISIKEN UND CHANCEN:

Risiken (Impact auf Liquidität):
⊖ Kunde Gamma zahlt später: -490 TEUR in KW+5
⊖ Steuerstundung abgelehnt: -280 TEUR in KW+3
⊖ Lieferantenskonto gekürzt: -200 TEUR sofort
⊖ Fördermittel verzögert: -250 TEUR
Gesamt-Risiko: -1.220 TEUR

Chancen:
⊕ Factoring-Vertrag: +400 TEUR in KW+2
⊕ Asset-Verkauf: +300 TEUR in KW+6
⊕ Anzahlung Neukunde: +200 TEUR
⊕ Steuerstundung: +280 TEUR Verschiebung
Gesamt-Chance: +1.180 TEUR

WORKING CAPITAL ENTWICKLUNG:

Komponente | IST | KW+4 | KW+8 | KW+13 | Ziel
-----------|-----|------|------|-------|-----
Forderungen | 4.200 | 3.900 | 3.600 | 3.400 | 3.000
Vorräte | 2.100 | 2.000 | 1.900 | 1.800 | 1.500
Verbindlichkeiten | 3.800 | 3.600 | 3.400 | 3.200 | 2.500
Working Capital | 2.500 | 2.300 | 2.100 | 2.000 | 2.000

DSO: 45 Tage (Ziel: 35)
DIO: 28 Tage (Ziel: 20)
DPO: 52 Tage (Ziel: 45)

MASSNAHMEN ZUR LIQUIDITÄTSSICHERUNG:

Kurzfristig (bis KW+2):
✓ Mahnlauf inntensivieren
✓ Skonto anbieten (2/10 netto 30)
✓ Anzahlungen verhandeln
✓ Factoring aktivieren

Mittelfristig (bis KW+8):
□ Asset-Sale (Maschine XY)
□ Sale-and-Lease-Back
□ Konsignationslager reduzieren
□ Investor-Bridge-Loan

Langfristig (>KW+13):
□ Kapitalerhöhung
□ Minority-Sale abschließen
□ Restrukturierungskredit
□ Working-Capital-Linie erhöhen

COVENANT-Planung:

Kennzahl | IST | Soll | Status | Trend
---------|-----|------|--------|------
Min. Liquidität | 380k | >500k | ⚠️ | →
Eigenkapitalquote | 18% | >20% | ❌ | ↘
Net Debt/EBITDA | 3.8x | <3.5x | ❌ | ↗
DSCR | 0.9x | >1.2x | ❌ | →

KOMMUNIKATION AN BANK:

Key Messages:
"Liquidität auch in Stressszenario gesichert"
"Working Capital wird kontinuierlich optimiert"
"Mehrere Sicherungsinstrumente verfügbar"
"Frühindikatoren zeigen Verbesserung"

Nächste Updates:
Täglich: Cash-Position (Mail)
Wöchentlich: 13-Wochen-Rolling (Mittwoch)
Monatlich: Covenant-Test (5. Werktag)

Erstellt: CFO
Geprüft: Treasury
Freigabe: CEO`
  },

  'd07_cfo_gehaltsauszahlung_auswirkungen.pdf': {
    filename: 'd07_cfo_gehaltsauszahlung_auswirkungen.pdf',
    title: 'Analyse: Liquiditätsauswirkungen nach Gehaltsauszahlung',
    type: 'document',
    content: `LIQUIDITÄTSANALYSE POST-PAYROLL
Vertraulich - Nur für Geschäftsleitung

Datum: Tag 7
Ersteller: CFO
Verteiler: CEO, Controlling, Treasury

ZUSAMMENFASSUNG GEHALTSAUSZAHLUNG
Ausgezahlt am: Tag 7, 06:00 Uhr
Gesamtvolumen: 560.000 EUR

Nettolöhne: 180.000 EUR
Lohnsteuer/Sozialversicherung  224.000 EUR
Status: Vollständig durchgeführt ✓
Liquiditätseffekt: -560.000 EUR


KW+2 (Fällig in 14 Tagen):

Umsatzsteuer-Vorauszahlung: 186.000 EUR
Gewerbesteuer-Vorauszahlung: 45.000 EUR
Summe: 231.000 EUR

Kritisch: Gesamtbelastung 578.000 EUR in 14 Tagen

LIQUIDITÄTSBRÜCKE BIS NÄCHSTE PAYROLL
Tage bis nächste Payroll: 7
Benötigte Liquidität: 847.000 EUR
Erwartete Einzahlungen: 1.920.000 EUR
Geplante Auszahlungen: 1.650.000 EUR
Puffer: 270.000 EUR (16% der Auszahlungen)

SZENARIOANALYSE
Best Case (20% Wahrscheinlichkeit):

Alle Kunden zahlen pünktlich
Steuerstundung genehmigt
Min. Liquidität: 680.000 EUR

Base Case (60% Wahrscheinlichkeit):

85% Kundenzahlungen pünktlich
Keine Stundungen
Min. Liquidität: 380.000 EUR

Worst Case (20% Wahrscheinlichkeit):

30% Zahlungsverzug Kunden
Lieferanten fordern Vorkasse
Min. Liquidität: -120.000 EUR → Kreditlinie erforderlich!

MASSNAHMENPLAN
Sofortmaßnahmen (bis Tag 10):
□ Großkunden-Mahnlauf starten
□ Factoring für Alpha GmbH einleiten
□ Steuerstundung beantragen
□ Lieferantenzahlungen priorisieren

Mittelfristig (bis Tag 20):
□ Working Capital um 500k reduzieren
□ Asset-Sale vorbereiten
□ Anzahlungen bei Neukunden
□ Konsignationslager abbauen

KOMMUNIKATION
Intern:
✓ Erfolgs-Memo an Belegschaft
✓ Führungskräfte-Info zu Sparmaßnahmen
✓ Betriebsrat informiert

Extern:
□ Bank-Update vorbereiten
□ Positive Pressemitteilung
□ Schlüsselkunden informieren

RISIKOBEWERTUNG
Höchste Risiken:

Kunde Gamma (490k) zahlt nicht → Impact: Kritisch
Steuernachforderung → Impact: 280k EUR
Lieferantenstopp → Impact: Produktion

Mitigationsmaßnahmen:

Tägliches Cash-Monitoring
Wöchentliche Forecast-Updates
Eskalationsprozess definiert

Freigabe:CFO`
  },

  'd07_cfo_covenant_waiver_antrag.pdf': {
    filename: 'd07_cfo_covenant_waiver_antrag.pdf',
    title: 'Entwurf: Covenant-Waiver-Antrag an Hausbank',
    type: 'document',
    content: `[UNTERNEHMEN BRIEFKOPF]

Vereinigte Kreditbank AG
Abteilung Firmenkunden/Sonderengagements
Herrn Direktor Schuster
Neue Mainzer Straße 47
60311 Frankfurt am Main

Datum: Tag 7

Betreff: Antrag auf temporären Covenant-Waiver
Kreditvertrag vom 15.03.2023, Kundennummer: 123456789

Sehr geehrter Herr Müller,

im Rahmen unserer vereinbarten transparenten Kommunikation informieren wir Sie proaktiv über eine absehbare Unterschreitung der vereinbarten Financial Covenants zum Stichtag.

BETROFFENE COVENANTS
EBITDA-Marge:

Vereinbart: Min. 8% (rollierend 12 Monate)
Erwartet Q1/2025: 6,2%
Abweichung: -1,8 Prozentpunkte

Eigenkapitalquote:

Vereinbart: Min. 20%
Aktuell: 18,4%
Abweichung: -1,6 Prozentpunkte

Net Debt/EBITDA:

Vereinbart: Max. 3,5x
Aktuell: 3,8x
Abweichung: +0,3x

URSACHENANALYSE
Die Abweichungen resultieren aus:

Einmaleffekte (60% des Impacts):

Restrukturierungskosten: 180.000 EUR
Sonderabschreibungen: 120.000 EUR
Beraterhonorare: 85.000 EUR

Marktbedingte Faktoren (40%):

Verzögerter Auftragseingang Q4
Preisdruck durch Importkonkurrenz
Rohstoffpreisvolatilität

Dazu: Kreditversicherung senkt Limits → kritische Lieferanten verlangen Vorkasse/Anzahlung. 
Serienhochlauf (neues A‑Kunden‑Programm) → hohe Materialvorfinanzierung (Sicherheitsbestand + Vorlaufteile)
Temporärer Qualitätsvorfall (Los mit Fertigungsabweichungen) → Nacharbeit, Reklamationen, verspätete Meilensteinfreigaben
Projektverzögerungen bei zwei A‑Kunden → Cash‑Eingänge rutschen 2–3 Wochen nach hinten
Insolvenz eines Kunden mit größerem Zahlungsausfall

GEGENMASSNAHMEN (bereits eingeleitet)
Kostensenkungsprogramm "Projekt Phönix":

Personalkosten: -8% durch natürliche Fluktuation
Sachkosten: -12% durch Neuverhandlungen
Energiekosten: -15% durch Effizienzmaßnahmen
Erwartete Einsparung: 2,1 Mio. EUR p.a.

Umsatzsteigerung:

Vertragsverlängerungen A-Kunden: +3,2 Mio. EUR
Neukundengewinnung: +1,8 Mio. EUR Pipeline
Preiserhöhungen: +2,5% ab Q2/2025

Working Capital Optimierung:

Forderungsmanagement: DSO von 45 auf 35 Tage
Lagerreichweite: von 28 auf 20 Tage
Liquiditätseffekt: +1,2 Mio. EUR

WAIVER-REQUEST
Wir beantragen:

Temporäre Aussetzung für 2 Quartale (Q1+Q2):

EBITDA-Marge: Reduzierung auf 6%
Eigenkapitalquote: Reduzierung auf 17%
Net Debt/EBITDA: Erhöhung auf 4,0x

Oder alternativ:

Covenant-Holiday für 6 Monate mit:

Verstärktem Reporting (wöchentlich)
Zusätzlichem Beiratsmeeting
Investorenprozess-Updates

KOMPENSATION
Als Gegenleistung bieten wir:

Verstärktes Monitoring:

Wöchentliche Liquiditätsberichte
Monatliche Covenant-Berechnung
Quartalsweise Beiratssitzung mit Bankvertretung

Zusätzliche Sicherheiten:

Verpfändung Kundenforderungen Alpha GmbH
Sicherungsübereignung Maschinenpark Halle 2
Bürgschaft Gesellschafter (nachrangig)

Strukturelle Maßnahmen:

Minority-Investor-Prozess läuft
Asset-Sales in Vorbereitung
Kapitalerhöhung 2 Mio. EUR zugesagt

AUSBLICK
Wir erwarten eine nachhaltige Verbesserung ab Q3/2025:

Q3 (Prognose):

EBITDA-Marge: 7,5%
EK-Quote: 19,2%
Net Debt/EBITDA: 3,6x

Q4 (Prognose):

EBITDA-Marge: 8,8%
EK-Quote: 20,5%
Net Debt/EBITDA: 3,2x

Die Rückkehr zu den vereinbarten Covenants ist somit für Ende 2025 realistisch.

ZEITPLAN
Wir bitten um:

Bestätigung des Eingangs bis Tag 8
Erste Einschätzung bis Tag 10
Entscheidung bis Tag 14
Dokumentation bis Tag 20

Für ein persönliches Gespräch stehen wir jederzeit zur Verfügung. Terminvorschläge:

Tag 9, 10:00 Uhr
Tag 10, 14:00 Uhr
Tag 11, 09:00 Uhr

Wir danken für Ihr Vertrauen und die konstruktive Zusammenarbeit.

Mit freundlichen Grüßen

               
CFO                          CEO

Anlagen:
Aktuelle Covenant-Berechnung`
  
  },

  // HRLEGAL ANHÄNGE
  'd07_hrlegal_coc_consent_matrix.xlsx': {
    filename: 'd07_hrlegal_coc_consent_matrix.xlsx',
    title: 'Change-of-Control Consent Matrix',
    type: 'spreadsheet',
    content: `CHANGE OF CONTROL - CONSENT MATRIX UPA-Verkauf
Stand: Tag 7 | Vertraulichkeit: STRENG VERTRAULICH

EXECUTIVE SUMMARY
Verträge mit CoC-Klauseln: 67 von 234 (29%)
Kritische Consents benötigt: 23
Gefährdetes Volumen: EUR 12,4 Mio
Consent-Risiko: MITTEL bis HOCH

KRITISCHE VERTRÄGE - TOP 30

Nr | Vertragspartner | Typ | Volumen p.a. | CoC-Klausel | Consent nötig | Trigger | Risiko | Status
---|-----------------|-----|--------------|-------------|---------------|---------|--------|--------
1 | Alpha Automotive | Kunde | 680k | Ja - Standard | Ja | >50% Anteile | HOCH | Offen
2 | Sparkasse FFM | Kredit | 4.0M | Ja - Streng | Ja | >25% Anteile | KRITISCH | Offen
3 | Beta Systems | Kunde | 540k | Ja - Standard | Ja | Control-Wechsel | HOCH | Offen
4 | TechSupply AG | Lieferant | 2.4M | Nein | Nein | - | NIEDRIG | OK
5 | Gamma Tech | Kunde | 490k | Ja - Erweitert | Ja | >30% Anteile | HOCH | Offen
6 | Lease GmbH | Leasing | 800k | Ja | Ja | Jeder Wechsel | MITTEL | Offen
7 | Delta Manufact. | Kunde | 420k | Nein | Nein | - | NIEDRIG | OK
8 | IT-Systems | IT/Lizenz | 180k | Ja | Notification | >50% | NIEDRIG | Offen
9 | Epsilon Log. | Kunde | 380k | Ja - Mild | Info only | >50% | NIEDRIG | Plan
10 | Immobilien AG | Miete | 360k | Ja | Ja | Control | MITTEL | Offen

KLAUSEL-TYPEN ANALYSE

Typ | Anzahl | Anteil | Typische Trigger | Rechtsfolgen
----|--------|--------|------------------|-------------
Zustimmungspflicht | 23 | 34% | >25-50% Anteile | Vertragsbeendigung
Informationspflicht | 18 | 27% | Jeder Wechsel | Neuverhandlung
Kündigungsrecht | 15 | 22% | Control-Wechsel | Sonderkündigung
Anpassungsklausel | 8 | 12% | >50% Anteile | Konditionenänderung
Keine Regelung | 3 | 5% | - | Keine

CONSENT-STRATEGIE NACH PRIORITÄT

Priorität 1 - VOR Signing (Kritisch)
Partner | Begründung | Approach | Owner | Termin
--------|------------|----------|-------|--------
Sparkasse | Kreditlinie gefährdet | CFO-Gespräch, Transparenz | CFO | Tag 10
Alpha Auto | Größter Kunde | CEO-Call, Kontinuität zusichern | CEO | Tag 12
Beta Systems | Rahmenvertrag | Persönliches Meeting | Vertrieb | Tag 14

Priorität 2 - VOR Closing
Partner | Begründung | Approach | Owner | Termin
--------|------------|----------|-------|--------
Gamma Tech | Wichtiger Kunde | Brief + Follow-up | Vertrieb | Tag 20
Lease GmbH | Maschinenleasing | Formeller Antrag | CFO | Tag 18
Immobilien AG | Standorte | Vermieter-Gespräch | COO | Tag 22

Priorität 3 - POST Closing
Partner | Begründung | Approach | Owner | Termin
--------|------------|----------|-------|--------
IT-Systems | Nur Info nötig | Standard-Notification | IT | Tag 30
Kleinlieferanten | Geringes Risiko | Sammelschreiben | Einkauf | Tag 35
Sonstige | Unkritisch | Bei Bedarf | Legal | Laufend

RISIKOMATRIX CONSENT-VERWEIGERUNG

Partner | Verweigerungsrisiko | Impact | Alternative | Kosten Alternative
--------|-------------------|--------|-------------|-------------------
Sparkasse | 20% | Kreditkündigung | Alternative Bank | +2% Zinsen
Alpha | 30% | Vertragsverlust | Neuakquise | -680k Umsatz
Beta | 25% | Neuausschreibung | Wettbewerb | Preisdruck -10%
Gamma | 40% | Konditionenverschl. | Akzeptieren | -3% Marge
Lease | 15% | Vorfälligkeit | Kauf/Neuvertrag | 200k Cash

ARGUMENTATIONSLINIEN

Für Kunden:
"Der neue Partner bringt zusätzliche Stabilität und Investitionskraft. Ihre Versorgungssicherheit wird gestärkt, alle Vereinbarungen bleiben unverändert gültig."

Für Lieferanten:
"Die Eigentümerstruktur ändert sich teilweise, aber Management und operative Verantwortung bleiben bestehen. Zahlungsfähigkeit wird verbessert."

Für Banken:
"Der Einstieg eines finanzstarken Partners reduziert Ihr Kreditrisiko. Businessplan und Management bleiben unverändert. Transparenz garantiert."

Für Vermieter:
"Langfristige Standortsicherung durch stabilen Investor. Keine Änderungen in der Nutzung. Bonität wird gestärkt."

RECHTLICHE STRUKTUROPTIONEN

Option | Vorteil | Nachteil | CoC-Impact
-------|---------|----------|------------
Asset Deal | Keine CoC-Trigger | Komplexität | Umgehung
Share Deal <25% | Viele Consents unnötig | Geringerer Einfluss | Minimal
Stufenmodell | Zeitgewinn | Unsicherheit | Verzögert
Carve-Out | Selektiv | Aufwändig | Reduziert

MUSTERFORMULIERUNGEN

Consent Request (formal):
"Gemäß Ziffer X unseres Vertrages vom [Datum] zeigen wir Ihnen an, dass [Investor] beabsichtigt, [25-49]% der Geschäftsanteile zu erwerben. Wir bitten um Ihre Zustimmung..."

Information (mild):
"Wir informieren Sie über eine geplante Minderheitsbeteiligung zur Stärkung unserer Marktposition. Alle vertraglichen Vereinbarungen bleiben unverändert..."

Comfort Letter:
"Das Management versichert die unveränderte Fortführung aller Geschäftsbeziehungen. Der neue Partner unterstützt unsere Wachstumsstrategie..."

TIMELINE CONSENT-PROZESS

Tag | Aktivität | Verantwortlich | Dokumente
----|-----------|----------------|----------
7-9 | Vertragsscreening | Legal | Matrix final
10-12 | Strategie-Abstimmung | GF/Legal | Approach definiert
13-15 | Kritische Gespräche | CEO/CFO | Gesprächsprotokolle
16-20 | Formale Requests | Legal | Consent-Briefe
21-25 | Follow-up | Vertrieb | Nachfassen
26-30 | Dokumentation | Legal | Consent-Sammlung
31+ | Closing Prep | M&A Team | Condition Precedent

ESKALATIONSPFADE

Stufe 1: Operative Ebene
- Vertrieb/Einkauf
- Sachliche Erläuterung
- Standard-Argumente

Stufe 2: Management
- Bereichsleiter
- Persönliches Gespräch
- Zusicherungen

Stufe 3: Geschäftsführung
- CEO/CFO
- Verhandlung
- Zugeständnisse

Stufe 4: Investor
- Direct Approach
- Garantien
- Package Deal

MONITORING & REPORTING

KPI | Ziel | Status | Trend
----|------|--------|-------
Consents erhalten | 23 | 0 | →
Response Rate | 80% | 0% | →
Verweigerungen | <3 | 0 | →
Bearbeitungszeit Ø | 10 Tage | - | →`
  },

  'd07_hrlegal_contract_review_summary.pdf': {
    filename: 'd07_hrlegal_contract_review_summary.pdf',
    title: 'Vertragsreview: Zusammenfassung kritischer Klauseln',
    type: 'document',
    content: `VERTRAGSREVIEW - MANAGEMENT SUMMARY
Legal Due Diligence Light
Stand: Tag 7

EXECUTIVE SUMMARY

Geprüfte Verträge: 234
Kritische Findings: 31
Sofortiger Handlungsbedarf: 8
Deal-Breaker identifiziert: 2

1. KRITISCHE VERTRAGSRISIKEN

KATEGORIE A - DEAL-BREAKER

1. Kreditvertrag Sparkasse (EUR 4 Mio)
Klausel: Change-of-Control bei >25%
Risiko: Sofortige Kündigung/Fälligkeit
Impact: Liquiditätskrise
Maßnahme: VOR Signing Consent einholen

2. Exklusivvertrag Alpha Automotive
Klausel: Wettbewerbsverbot Automotive
Risiko: Investor ist Wettbewerber?
Impact: Vertragsstrafe 2 Mio EUR
Maßnahme: Carve-Out verhandeln

KATEGORIE B - HOCHRISIKO (Consent erforderlich)

3. Mietvertrag Hauptstandort
- Laufzeit bis 2028
- CoC-Klausel: Zustimmung Vermieter
- Risiko: Standortverlust
- Alternative: Schwierig (Spezialimmobilie)

4. Rahmenvertrag Beta Systems
- Volumen: 540k p.a.
- Kündigungsrecht bei CoC
- Verzugspönale: 1% täglich
- Maßnahme: Frühzeitige Ansprache

5. Leasingverträge Maschinenpark
- Restwert: EUR 1,2 Mio
- Vorfälligkeit bei CoC
- Refinanzierung nötig

KATEGORIE C - MITTELRISIKO

6-15. Kundenverträge mit Pönalen
- Kombiniertes Risiko: 680k
- Teilweise Neuverhandlung möglich
- Priorisierung nach Kritikalität

16-23. Lieferantenverträge
- Take-or-Pay-Verpflichtungen: 450k
- Mindestabnahmen gefährdet
- Flexibilisierung anstreben

2. POSITIVE VERTRAGSBESTÄNDE

Werthaltige Assets:
- Langfristverträge mit Preistreppe
- Patentlizenz-Einnahmen: 120k p.a.
- Exklusivvertrieb Osteuropa
- Rahmenverträge mit 5 DAX-Kunden

Übertragbare Rechte:
- Markenrechte (unbelastet)
- Software-Lizenzen (transferable)
- Kundenliste (DSGVO-konform)
- Zertifizierungen (ISO, CE)

3. ARBEITSRECHTLICHE THEMEN

Betriebsvereinbarungen:
- 12 BVs identifiziert
- 3 kritisch bei Investor-Einstieg:
  - Standortsicherung bis 2027
  - Beschäftigungsgarantie (befristet)
  - Altersteilzeit-Regelungen

Management-Verträge:
- 3 GF mit CoC-Klauseln
- Abfindung: 2 Jahresgehälter
- Gesamtrisiko: EUR 1,4 Mio
- Wettbewerbsverbote: 24 Monate

Pensionszusagen:
- Rückstellungen: EUR 2,3 Mio
- 23 Zusagen (Closed Group)
- Outsourcing möglich

4. IP UND LIZENZEN

Eigene Schutzrechte:
- 15 Patente (DE/EU)
- 8 Gebrauchsmuster
- 3 Marken
- Alle unbelastet

Fremdlizenzen:
- CAD-Software: 45 Plätze
- ERP-System: Named User
- Spezial-Software: Node-locked
- Übertragbarkeit prüfen

5. DATENSCHUTZ-COMPLIANCE

Kritische Punkte:
- Auftragsverarbeiter-Verträge: 60% aktuell
- Intern. Datentransfers: Teilweise SCC alt
- Löschkonzept: Unvollständig
- Breach-History: 1 Minor (2023)

Maßnahmen:
□ AV-Verträge updaten
□ Neue SCC implementieren
□ Löschkonzept finalisieren
□ DSGVO-Audit vor Closing

6. KARTELLRECHTLICHE ASPEKTE

Marktanteile:
- Deutschland: 8% (unkritisch)
- Regional Hessen: 22% (prüfen)
- Spezialsegment X: 35% (kritisch?)

Empfehlung:
- Kartellrechtliche Vorprüfung
- Ggf. Freigabe BKartA
- Timeline +4-6 Wochen

7. UMWELTRECHT/ALTLASTEN

Identifizierte Risiken:
- Altlastenverdacht Werk 2
- Auflage Lärmschutz pending
- WHG-Genehmigung erneuern 2025

Rückstellungen:
- Gebildet: EUR 150k
- Geschätzt nötig: EUR 200-300k
- Due Diligence Phase II empfohlen

8. VERSICHERUNGEN

Deckungslücken:
- Cyber: Sublimit 1 Mio (zu niedrig)
- D&O: Continuity fraglich
- Produkthaftung: USA ausgeschlossen
- Betriebsunterbrechung: Unterdeckung

Maßnahmen:
- Cyber-Police erhöhen
- W&I-Versicherung für Deal
- Post-Closing Harmonisierung

9. STREITIGKEITEN

Aktive Verfahren:
- Arbeitsrecht: 2 Kündigungsschutz
- Gewährleistung: 1 (Kunde klagt 45k)
- Forderungen: 3 Mahnverfahren

Drohende Streitigkeiten:
- Pönale-Forderung Alpha (17k)
- Mängelhaftung Beta (unbekannt)

10. EMPFEHLUNGEN

SOFORT (vor LOI/Term Sheet):
☑ Bank-Gespräch CoC
☑ Alpha/Beta Vorsondierung
☑ Kartellrecht-Check

VOR SIGNING:
☑ Critical Consents einholen
☑ Management Retention
☑ IP-Chain-of-Title

VOR CLOSING:
☑ Alle Consents sammeln
☑ Garantiekatalog final
☑ Escrow-Struktur

DEAL-STRUKTUR-EMPFEHLUNG:

Präferiert: Stufenmodell
- Phase 1: 24,9% (unter CoC-Schwellen)
- Phase 2: +24,1% nach Consents
- Vorteil: Zeit für Consent-Mgmt
- Nachteil: Komplexität

Alternative: Asset-Deal
- Nur werthaltiges übertragen
- CoC-Klauseln umgehen
- Aber: Aufwändig, Steuern

GARANTIEN/INDEMNITIES:

Empfohlene Caps:
- Fundamental: Kaufpreis
- Tax: 7 Jahre statutory
- Operational: 30% Kaufpreis
- De Minimis: EUR 10k
- Basket: EUR 100k

Specific Indemnities für:
- Pensions
- Umwelt/Altlasten
- Pending Litigations
- Kartellrecht

Dieser Review ersetzt keine vollständige Legal DD! 
Anmerkunge: kurfr. Beratungskosten für weitere Schritte zwischen 5k und 8k.

Erstellt: Legal Department
Geprüft: External Counsel
Freigabe: CEO/CFO pending`
  },

  'd07_hrlegal_ethics_hotline_policy.pdf': {
    filename: 'd07_hrlegal_ethics_hotline_policy.pdf',
    title: 'Richtlinie: Ethik-Hotline und Hinweisgebersystem',
    type: 'document',
    content: `KONZERNRICHTLINIE
ETHIK-HOTLINE UND HINWEISGEBERSYSTEM
(Whistleblower-Richtlinie gemäß EU-Direktive 2019/1937)

Gültig ab: Tag 8
Version: 1.0
Klassifikation: Intern

1. PRÄAMBEL

Integrität und regelkonformes Verhalten sind Grundpfeiler unserer Unternehmenskultur. Diese Richtlinie etabliert ein vertrauliches Meldesystem für Compliance-Verstöße und schützt Hinweisgeber vor Repressalien.

2. GELTUNGSBEREICH

Diese Richtlinie gilt für:
- Alle Mitarbeiter (unbefristet/befristet)
- Leiharbeitnehmer
- Organmitglieder
- Lieferanten und Geschäftspartner
- Externe Dritte

3. MELDEWEGE

INTERNE KANÄLE:

Ethik-Hotline (24/7):
- Telefon: 0800-ETHIK-00 (0800-384-4500)
- Mehrsprachig (DE/EN/PL/TR)
- Anonymität garantiert
- Externe Betreiber (Anwaltskanzlei)

Online-Portal:
- URL: ethics.company.com
- Verschlüsselte Übertragung
- Anonyme Dialogmöglichkeit
- Case-Tracking-Nummer

E-Mail:
- compliance@company.de
- Direkt an Compliance Officer
- Verschlüsselung empfohlen

Postalisch:
- Compliance Officer
- "Persönlich/Vertraulich"
- Keine Protokollierung Poststelle

Persönlich:
- Compliance Officer: Raum 3.14
- Terminvereinbarung: -599
- Auch außerhalb Büro möglich

EXTERNE KANÄLE:

Behörden:
- BaFin, BKartA, etc.
- Nur nach interner Meldung
- Oder bei Repressalien-Gefahr

4. MELDUNGSINHALTE

PFLICHTIG MELDBARE VERSTÖSSE:

Strafbare Handlungen:
- Korruption/Bestechung
- Betrug/Untreue
- Geldwäsche
- Kartellverstöße
- Insiderhandel

Schwere Verstöße:
- Bilanzmanipulation
- Diskriminierung
- Sexuelle Belästigung
- Datenschutzverletzungen
- Umweltvergehen

Sonstige Meldegründe:
- Interessenkonflikte
- Geschenke >50 EUR
- Sicherheitsmängel
- Qualitätsprobleme kritisch
- Verschwendung erheblich

NICHT ÜBER HOTLINE:

- HR-Themen (→ Personalabteilung)
- Technische Probleme (→ IT-Helpdesk)
- Kundenreklamationen (→ QM)
- Arbeitsschutz akut (→ Sifa)

5. VERFAHREN

EINGANGSBEHANDLUNG:

Binnen 7 Tagen:
- Eingangsbestätigung
- Case-Nummer vergeben
- Erste Plausibilitätsprüfung
- Zuständigkeit klären

UNTERSUCHUNG:

Untersuchungsteam:
- Compliance Officer (Lead)
- Fachabteilung
- Bei Bedarf: Legal, HR, Revision
- Extern: Forensik/Anwälte

Grundsätze:
- Unschuldsvermutung
- Verhältnismäßigkeit
- Datensparsamkeit
- Fair Trial
- Need-to-know

Maßnahmen:
- Dokumente sichern
- Interviews führen
- Digitale Forensik
- Vor-Ort-Prüfungen
- Externe Gutachten

ABSCHLUSS:

Binnen 3 Monaten:
- Abschlussbericht
- Maßnahmenempfehlung
- Information Hinweisgeber
- Dokumentation

Follow-Up:
- Umsetzungskontrolle
- Prozessverbesserung
- Lessons Learned
- Präventionsmaßnahmen

6. HINWEISGEBERSCHUTZ

ANONYMITÄT:

Garantien:
- Keine IP-Erfassung
- Keine Anrufererkennung
- Pseudonymisierung möglich
- Anwaltliches Zeugnisverweigerungsrecht

Grenzen:
- Bei Strafverfahren
- Bei falschen Anschuldigungen
- Selbstbelastung

REPRESSALIENSCHUTZ:

Verbotene Maßnahmen:
✗ Kündigung
✗ Versetzung
✗ Mobbing
✗ Gehaltskürzung
✗ Beförderungssperre
✗ Rufschädigung

Schutzmaßnahmen:
✓ Beweislastumkehr
✓ Unterlassungsanspruch
✓ Schadensersatz
✓ Anwaltskostenhilfe
✓ Psychologische Betreuung

SANKTIONEN BEI VERSTOSS:

Gegen Repressalien:
- Abmahnung bis Kündigung
- Persönliche Haftung
- Strafanzeige möglich

Bei Missbrauch:
- Falsche Anschuldigung
- Böswillige Nutzung
- Arbeitsrechtliche Konsequenzen

7. DATENSCHUTZ

Rechtsgrundlage:
- Art. 6 Abs. 1 lit. c, f DSGVO
- § 26 BDSG
- Hinweisgeberschutzgesetz

Betroffenenrechte:
- Information (eingeschränkt)
- Auskunft (eingeschränkt)
- Löschung nach Verfahren
- Keine Übermittlung Drittländer

Aufbewahrung:
- Laufende Verfahren: Unbegrenzt
- Abgeschlossen: 3 Jahre
- Unbegründet: Sofort löschen

8. GOVERNANCE

Compliance Officer:
- Unabhängig
- Direkter Zugang Vorstand
- Quartalsbericht
- Jahresbericht (anonymisiert)

Compliance Committee:
- Vorsitz: CEO
- Mitglieder: CFO, Legal, HR, Revision
- Quartalsmeeting
- Ad-hoc bei kritischen Fällen

Aufsichtsrat:
- Information bei C-Level
- Direktes Melderecht
- Jährlicher Bericht

9. KOMMUNIKATION & TRAINING

Rollout:
- All-Hands-Announcement
- Führungskräfte-Briefing
- Poster/Wallet-Cards
- Intranet-Kampagne

Training:
- E-Learning für alle (Pflicht)
- Präsenz für Führungskräfte
- Jährliche Auffrischung
- Case Studies

Awareness:
- Compliance-Week jährlich
- Newsletter quartalsweise
- Success Stories
- Tone from the Top

10. ERFOLGSMESSUNG

KPIs:
- Meldungen/Jahr: Ziel >0
- Substantiierungsquote: >30%
- Bearbeitungszeit: <90 Tage
- Repressalien: 0 toleriert
- Training-Quote: 100%

Benchmark:
- Branchenvergleich
- Best Practice Analyse
- Externe Audits
- Zertifizierung angestrebt

11. INKRAFTTRETEN

Diese Richtlinie tritt am Tag 8 in Kraft.
Frühere Regelungen werden ersetzt.

12. ANLAGEN

- Meldeformular
- Verfahrensschema
- FAQ-Katalog
- Gesetzestexte
- Kontaktliste

FREIGABE:

____________________        ____________________
       
CEO                         HR/LEGAL Direktorin

____________________        ____________________
            
CFO                        Compliance Officer

Datum: Tag 7`
  },

  'd07_hrlegal_whistleblower_protection_guidelines.pdf': {
    filename: 'd07_hrlegal_whistleblower_protection_guidelines.pdf',
    title: 'Leitfaden: Schutz von Hinweisgebern',
    type: 'document',
    content: `LEITFADEN HINWEISGEBERSCHUTZ
Praktische Umsetzung der EU-Whistleblower-Direktive

1. FÜR HINWEISGEBER

IHRE RECHTE:
✓ Anonymität gewährleistet
✓ Vertraulichkeit garantiert
✓ Schutz vor Nachteilen
✓ Rechtsbeistand möglich
✓ Psychologische Unterstützung

IHRE PFLICHTEN:
- Guter Glaube (bona fide)
- Wahre Angaben
- Keine Verleumdung
- Interne Meldung zuerst (Regel)
- Kooperation bei Aufklärung

WAS IST GESCHÜTZT:

Meldung von:
- Straftaten
- Ordnungswidrigkeiten
- Erhebliche Regelverstöße
- Ethik-Verletzungen
- Gefährdungen

Beweise:
- Dokumente (Kopien)
- E-Mails
- Fotos (datenschutzkonform)
- Zeugenaussagen
- Eigene Wahrnehmungen

PRAKTISCHE TIPPS:

DO:
✓ Fakten dokumentieren
✓ Datum/Zeit notieren
✓ Zeugen benennen
✓ Beweise sichern
✓ Case-Nummer merken

DON'T:
✗ Originale entwenden
✗ Illegal aufzeichnen
✗ Selbstjustiz
✗ An Presse zuerst
✗ Soziale Medien

2. FÜR FÜHRUNGSKRÄFTE

WARNSIGNALE ERKENNEN:
- Plötzliche Krankmeldungen
- Leistungsabfall
- Rückzug/Isolation
- Andeutungen
- Teamkonflikte

RICHTIGES VERHALTEN:

Bei direkter Ansprache:
1. Ernst nehmen
2. Vertraulichkeit zusichern
3. Nicht selbst ermitteln
4. An Compliance verweisen
5. Dokumentieren

Bei Verdacht auf Repressalien:
1. Sofort unterbinden
2. HR einschalten
3. Compliance informieren
4. Team sensibilisieren
5. Überwachen

VERBOTE:

Absolut unzulässig:
✗ Nachforschungen "wer war's"
✗ Drohungen/Andeutungen
✗ Schlechterstellung
✗ Isolation/Mobbing
✗ Information an Beschuldigte

Konsequenzen:
- Arbeitsrechtlich (bis Kündigung)
- Zivilrechtlich (Schadensersatz)
- Strafrechtlich (Nötigung etc.)

3. FÜR HR

PRÄVENTIONSMASSNAHMEN:

Recruiting:
- Integrity-Check
- Reference-Check erweitert
- Compliance-Commitment

Onboarding:
- Ethik-Training Tag 1
- Hotline-Information
- Kulturvermittlung

Performance Management:
- Ethik-Ziele integrieren
- 360°-Feedback
- Speak-up-Kultur fördern

INTERVENTION:

Bei Meldung:
- Fürsorgepflicht
- Neutralität wahren
- Keine Vorverurteilung
- Dokumentation
- Arbeitsrechtliche Prüfung

Bei Repressalien-Verdacht:
- Sofortmaßnahmen
- Beweissicherung
- Versetzung prüfen (Täter!)
- Mediation anbieten
- Monitoring 6 Monate

NACHBETREUUNG:

Für Hinweisgeber:
- Regelmäßige Check-ins
- Karriere-Monitoring
- Team-Integration
- Exit-Interview speziell

Für Teams:
- Aufarbeitung
- Teambuilding
- Supervision
- Kulturarbeit

4. FÜR COMPLIANCE

CASE MANAGEMENT:

Eingang:
□ Sofort erfassen
□ Risiko bewerten
□ Team zusammenstellen
□ Kommunikationsplan
□ Sicherungsmaßnahmen

Ermittlung:
□ Untersuchungsplan
□ Interview-Strategie
□ Dokumentensicherung
□ Forensik beauftragen
□ Legal Privilege sichern

Abschluss:
□ Bericht erstellen
□ Maßnahmen empfehlen
□ Stakeholder informieren
□ Umsetzung überwachen
□ Lessons Learned

KOMMUNIKATION:

Intern:
- Need-to-know strikt
- Vorstand bei Schwere
- Aufsichtsrat bei C-Level
- Keine Spekulation

Extern:
- Keine Kommentare
- PR-Abteilung einbeziehen
- Behörden kooperativ
- Anwalt bei Presse

5. ESKALATIONSMATRIX

Schwere | Beispiel | Team | Vorstand | Aufsichtsrat | Behörde
--------|----------|------|----------|--------------|--------
Niedrig | Spesen 100€ | Compliance | Info | - | -
Mittel | Geschenke 500€ | Compl.+HR | Quartal | - | -
Hoch | Bestechung | Compl.+Legal | Sofort | Info | Prüfen
Kritisch | Bilanzfälschung | Krisenstab | Sofort | Sofort | Melden

6. QUICK REFERENCE

HOTLINE: 0800-384-4500
PORTAL: ethics.company.com
EMAIL: compliance@company.de
COMPLIANCE OFFICER: Dr. List, Raum 3.14, -599

Notfall (unmittelbare Gefahr):
- Polizei: 110
- Werkschutz: -111
- Betriebsarzt: -222

7. FAQ

F: Kann ich anonym bleiben?
A: Ja, absolute Anonymität ist garantiert.

F: Was passiert nach meiner Meldung?
A: Eingangsbestätigung in 7 Tagen, dann Prüfung.

F: Bin ich vor Kündigung geschützt?
A: Ja, Repressalien sind verboten und sanktioniert.

F: Muss ich Beweise haben?
A: Nein, begründeter Verdacht genügt.

F: Kann ich mich beraten lassen?
A: Ja, auch externe Beratung ist geschützt.

F: Was wenn nichts passiert?
A: Nach 3 Monaten externe Meldung möglich.

8. FORMULAR-VORLAGEN

[Anlagen als separate Dateien verfügbar]
- Meldebogen
- Gesprächsprotokoll
- Maßnahmenplan
- Abschlussbericht

Dieser Leitfaden schützt Sie und das Unternehmen.
Bei Fragen: compliance@company.de`
  },

  'd07_hrlegal_overtime_documentation.xlsx': {
    filename: 'd07_hrlegal_overtime_documentation.xlsx',
    title: 'Arbeitszeitdokumentation und Mehrarbeitsanalyse',
    type: 'spreadsheet',
    content: `ARBEITSZEITDOKUMENTATION - COMPLIANCE CHECK
Stand: Tag 7 | Kritikalität: HOCH
Prüfzeitraum: Januar 2025

MANAGEMENT SUMMARY
Mitarbeiter gesamt: 120 VZÄ, 190 MA
Überstunden-Saldo: 5.925 Std
Compliance-Quote: 73% (Ziel: >95%)
Risiko Bußgeld: bis 30.000 EUR
Handlungsbedarf: SOFORT

ÜBERSICHT NACH BEREICHEN

Arbeitszeit & Compliance – skaliert auf 190 MA
Bereich	MA	Ø Std/MA	>10h/Tag	>48h/Wo	Ruhezeit <11h	Compliance
Produktion	94	44,2	5 Fälle	15 Fälle	10 Fälle	68%
Logistik	19	46,8	4 Fälle	5 Fälle	7 Fälle	61%
Verwaltung	31	41,2	0 Fälle	2 Fälle	1 Fall	89%
Vertrieb	15	43,5	1 Fall	3 Fälle	2 Fälle	78%
Entwicklung	10	45,1	2 Fälle	3 Fälle	3 Fälle	71%
QS	8	42,8	1 Fall	1 Fall	1 Fall	83%
Sonstige	13	40,1	0 Fälle	0 Fälle	0 Fälle	95%
TOP‑Risikomitarbeitende (ArbZG) – skaliert

Bei 190 MA entspricht „TOP 20“ rechnerisch TOP ≈ 5. Die vorliegenden fünf Datensätze bleiben inhaltlich unverändert (Einzelwerte skalieren nicht).

MA‑Nr	Name	Abt.	Überstd. Jan	Max Tag	Max Woche	Verstöße	Risiko
4711	[anonymisiert]	Prod	67h	14h	68h	12	KRITISCH
4298	[anonymisiert]	Logistik	71h	13h	64h	10	KRITISCH
3877	[anonymisiert]	Prod	58h	12h	61h	8	HOCH
5102	[anonymisiert]	Entw	62h	15h	59h	9	HOCH
4455	[anonymisiert]	Logistik	55h	11h	58h	7	HOCH
Verstoß‑Kategorien (Jan 2025) – skaliert
Verstoß	Anzahl	§ ArbZG	Bußgeld bis	Gefundene Fälle	Status

10h/Tag | 42 | §3 | 15.000€ | 13 | KRITISCH
48h/Woche (Ø) | 30 | §3 | 15.000€ | 20 | KRITISCH
Ruhezeit <11h | 24 | §5 | 15.000€ | 10 | HOCH
Sonntagsarbeit | 8 | §9 | 15.000€ | 8 | MITTEL
Keine Pause | 17 | §4 | 15.000€ | 5 | HOCH
Fehlende Aufz. | 28 | §16 | 15.000€ | 28 | KRITISCH

Schichtmodelle – Compliance‑Status (MA skaliert)
Schicht	Modell	MA	Plan-Std	Ist-Std Ø	Mehrarbeit	Legal
Früh	6‑14	31	38,5	42,1	3,6	OK*
Spät	14‑22	31	38,5	43,5	5,0	GRENZWERTIG
Nacht	22‑6	24	38,5	41,2	2,7	OK
Normal	8‑17	70	40,0	44,8	4,8	GRENZWERTIG
Gleitzeit	Flex	34	40,0	42,5	2,5	OK

* mit Ausnahmen

Ursachenanalyse Mehrarbeit – skaliert
Grund	Häufigkeit	Anteil	Vermeidbar	Maßnahme
Krankheitsvertretung	33	28%	Teilweise	Springer‑Pool
Auftragsspitzen	30	25%	Nein	Flexibilisierung
Liefertermine	22	19%	Teilweise	Bessere Planung
Störungen/Ausfall	15	13%	Ja	Präventive Wartung
Meetings/Admin	10	9%	Ja	Effizienz
Sonstige	7	6%	–	Einzelanalyse
Payroll‑Woche Spezial (Tag 1–7) – skaliert
Tag	Anwesend	Ø Arbeitszeit	Überstunden	Verstöße	Bemerkung
1	179	8,9h	72h	3	Payroll‑Unsicherheit
2	182	9,2h	92h	4	Meetings
3	184	9,8h	117h	7	Kritische Lieferungen
4	177	8,5h	65h	2	Beruhigung
5	180	8,7h	70h	2	Normal
6 (Sa)	10	6,2h	20h	1	Sonderschicht
7 (So)	3	4,1h	3h	0	Störung
Kostenkalkulation Überstunden – skaliert
Kategorie	Stunden	Satz	Zuschlag	Kosten	Rückstellung
Normal	4.139	28€	25%	144.865€	Gebildet
Samstag	269	28€	50%	11.298€	Teilweise
Sonntag	101	28€	100%	5.656€	Fehlend
Nacht	628	28€	25%	21.980€	Gebildet
Feiertag	40	28€	150%	2.800€	Fehlend
GESAMT	5.177			186.599€	152.538€

Gap (Rückstellung fehlt): ≈ 34.061€.

Benchmarking Branche – unverändert (quotierte Kennzahlen)
KPI	Unternehmen	Branche Ø	Best Practice	Status
Überstunden‑Quote	8,4%	5,2%	3,0%	SCHLECHT
Compliance‑Rate	73%	88%	95%	KRITISCH
Ø Wochenarbeitszeit	43,8h	40,2h	38,5h	HOCH
Krankheitstage	18,2	12,5	8,0	HOCH
Fluktuation	12%	8%	5%	HOCH
Maßnahmenplan – unverändert

(Festpreise/Projekte sind nicht linear headcount‑abhängig.)

Prio	Maßnahme	Verantwortlich	Termin	Status	Kosten
1	Arbeitszeiterfassung digital	IT/HR	Tag 30	Start	45k
2	Springer‑Pool aufbauen	HR	Tag 20	Planung	120k/a
3	Führungskräfte‑Schulung ArbZG	HR	Tag 14	Geplant	5k
4	Ampelsystem Überstunden	Control	Tag 10	Konzept	2k
5	Schichtmodell optimieren	Prod/HR	Tag 60	Analyse	8k
6	Betriebsvereinbarung neu	BR/HR	Tag 45	Entwurf	0
7	Audit Zeitwirtschaft	Extern	Tag 25	Beauftr.	12k
Audit‑Findings Stichprobe – skaliert
Finding	Schwere	Anzahl	Risiko	Maßnahme
Fehlende Unterschriften	Mittel	52	Beweis	Nacherfassung
Pausenzeiten nicht erfasst	Hoch	127	Bußgeld	System‑Update
Handzettel statt System	Hoch	28	Manipulation	Digitalisierung
Abweichung Stempel/Aufz.	Mittel	20	Beweis	Klärung
Genehm. Mehrarbeit fehlt	Hoch	100	Rechtswidrig	Prozess

GESETZLICHE LIMITS (zur Referenz)

Parameter | Limit | Ausnahme | Genehmigung
----------|-------|----------|-------------
Tag | 8h (10h) | Notfall | Aufsichtsbehörde
Woche | 48h Ø | 60h kurz | Tarifvertrag
Ruhezeit | 11h | 10h (Ausgleich) | Betriebsvereinb.
Pause | 30/45min | - | Nicht verschiebbar
Sonntag | Verboten | Ausnahmen §10 | Behörde
Aufzeichnung | Pflicht >8h | - | Keine

RISIKOBEWERTUNG

Risiko | Eintritt | Schaden | Maßnahme
-------|----------|---------|----------
Aufsichtsbehörde prüft | Hoch | 30k€ + Image | Sofort handeln
Betriebsrat eskaliert | Mittel | Unruhe | Dialog suchen  
Mitarbeiter klagt | Mittel | Präzedenz | Compliance
Krankheitsanstieg | Hoch | Produktivität | Prävention
Unfallgefahr | Mittel | Haftung | Überwachung

Diese Analyse erfordert SOFORTIGES HANDELN!
Compliance-Verstöße dokumentiert und meldepflichtig.`
  },

  'd07_hrlegal_labor_law_compliance_memo.pdf': {
    filename: 'd07_hrlegal_labor_law_compliance_memo.pdf',
    title: 'Memo: Arbeitsrechtliche Compliance - Sofortmaßnahmen',
    type: 'document',
    content: `DRINGENDES MEMO - ARBEITSRECHTLICHE COMPLIANCE

An: Geschäftsführung, alle Führungskräfte
Von: HR/Legal
Datum: Tag 7
Betreff: Kritische Compliance-Verstöße Arbeitszeit - Sofortmaßnahmen erforderlich
Klassifikation: VERTRAULICH

EXECUTIVE SUMMARY

Die Prüfung der Arbeitszeitaufzeichnungen zeigt erhebliche Verstöße gegen das Arbeitszeitgesetz. Sofortiges Handeln ist erforderlich, um Bußgelder (bis 30.000 EUR), Betriebsstilllegung und strafrechtliche Konsequenzen zu vermeiden.

1. KRITISCHE FESTSTELLUNGEN

Verstoßquote: 27% aller Mitarbeiter
Dokumentationsmängel: 38% der Aufzeichnungen
Geschätztes Bußgeldrisiko: 180.000 EUR
Reputationsrisiko: HOCH
Behördenprüfung: Jederzeit möglich

Hauptverstöße:
- 186 Fälle >10h Arbeitszeit/Tag
- 132 Fälle >48h/Woche im Durchschnitt
- 106 Fälle Ruhezeit <11h
- 124 Fälle fehlende Dokumentation

2. RECHTLICHE KONSEQUENZEN

BUSSGELDER (§ 22 ArbZG):
- Pro Verstoß bis 15.000 EUR
- Bei Vorsatz bis 30.000 EUR
- Wiederholung: Verdopplung
- Personenbezogen (auch Führungskraft!)

STRAFRECHTLICH (§ 23 ArbZG):
- Bei Gesundheitsgefährdung
- Freiheitsstrafe bis 1 Jahr
- Persönliche Haftung GF/FK

ZIVILRECHTLICH:
- Schadenserzatzansprüche
- Nachzahlung Überstunden
- Verzugszinsen 5% über Basiszins
- Unfallhaftung bei Übermüdung

WEITERE FOLGEN:
- Betriebsstilllegung möglich
- Ausschluss öffentliche Aufträge
- Compliance-Verstoß für Kunden
- Versicherungsschutz gefährdet

3. SOFORTMASSNAHMEN (BIS TAG 10)

AB SOFORT (Tag 7):

□ STOPP aller Überstunden >10h/Tag
□ Keine Arbeit ohne 11h Ruhezeit
□ Pausenzeiten strikt einhalten
□ Wochendendienste nur mit Genehmigung
□ Lückenlose Dokumentation ab heute

BIS TAG 8:

□ Führungskräfte-Briefing 14:00 Uhr
□ Mitarbeiter-Information versenden
□ Überstunden-Ampel aktivieren
□ Notfall-Hotline einrichten
□ Betriebsrat informieren

BIS TAG 10:

□ Alle Aufzeichnungen nacherfassen
□ Genehmigungen dokumentieren
□ Schulung ArbZG online starten
□ Externe Prüfung beauftragen
□ Maßnahmenplan finalisieren

4. VERANTWORTLICHKEITEN

GESCHÄFTSFÜHRUNG:
- Organisationsverschulden
- Persönliche Haftung
- Aufsichtspflicht
- Compliance-Verantwortung

FÜHRUNGSKRÄFTE:
- Direkte Überwachungspflicht
- Dokumentationsverantwortung  
- Fürsorgepflicht
- Persönliches Bußgeldrisiko

HR/LEGAL:
- Prozessverantwortung
- Schulung/Beratung
- Kontrolle/Audit
- Behördenkommunikation

MITARBEITER:
- Mitwirkungspflicht
- Wahrheitsgemäße Angaben
- Pausennahme
- Meldung von Verstößen

5. NEUE REGELN AB SOFORT

GENEHMIGUNGSPFLICHTEN:

Mehrarbeit >8h:
- Schriftliche Anordnung
- Begründung erforderlich
- Max. 10h/Tag absolut
- Ausgleich binnen 6 Monaten

Wochenendarbeit:
- Nur Notfälle/Störungen
- GF-Genehmigung
- Ersatzruhetag binnen 2 Wochen
- Dokumentation Grund

Verkürzung Ruhezeit:
- Nur Ausnahmefälle
- Ausgleich auf 12h
- Betriebsrat-Info
- Maximal 2x/Monat

DOKUMENTATIONSPFLICHTEN:

Täglich erfassen:
☑ Arbeitsbeginn (Minute genau)
☑ Arbeitsende (Minute genau)
☑ Pausen (Beginn/Ende)
☑ Unterbrechungen >15 Min
☑ Grund für Mehrarbeit

Wöchentlich prüfen:
☑ Wochenarbeitszeit
☑ Überstunden-Saldo
☑ Verstöße identifizieren
☑ Gegenmaßnahmen

6. AMPELSYSTEM ÜBERSTUNDEN

GRÜN (0-4h/Woche):
- Normal
- Keine Maßnahme

GELB (4-8h/Woche):
- Führungskraft informieren
- Ursache dokumentieren
- Ausgleich planen

ROT (>8h/Woche):
- Genehmigung erforderlich
- HR informieren
- Sofort-Ausgleich
- Eskalation bei Fortsetzung

SCHWARZ (Gesetzesverstoß):
- SOFORT STOPPEN
- GF-Information
- Compliance-Meldung
- Disziplinarmaßnahmen

7. KOMMUNIKATIONSPLAN

INTERN:

Mitarbeiter:
- Info-Mail heute 16:00
- Aushang Schwarzes Brett
- Team-Meetings morgen
- FAQ im Intranet

Führungskräfte:
- Sondersitzung Tag 8, 14:00
- Handlungsleitfaden
- Persönliche Haftung erläutern
- Q&A Session

Betriebsrat:
- Sofort-Gespräch CEO/HR
- Gemeinsame Lösung
- BV-Anpassung diskutieren

EXTERN (bei Prüfung):

Behörde:
- Kooperationsbereitschaft
- Maßnahmenplan vorlegen
- Externe Beratung einbeziehen
- Keine Einzelaussagen

8. LANGFRISTMASSNAHMEN

MONAT 1:
- Digitale Zeiterfassung
- Neue Betriebsvereinbarung
- Kapazitätsplanung
- Springer-Pool

QUARTAL 1:
- Schichtmodell-Optimierung
- Führungskräfte-Training
- Compliance-Audit
- Software-Implementation

JAHR 1:
- Kulturwandel
- Flexible Arbeitsmodelle
- Automatisierung
- Personalbemessung neu

9. ESKALATION

Bei Weigerung/Fortsetzung:
1. Ermahnung mündlich
2. Abmahnung schriftlich
3. Freistellung
4. Kündigung

Bei Meldung Behörde:
1. Krisenstab aktivieren
2. Anwalt einschalten
3. Kommunikationssperre
4. Dokumentation sichern

10. RECHTLICHE GRUNDLAGEN

- Arbeitszeitgesetz (ArbZG)
- EU-Arbeitszeitrichtlinie
- Tarifverträge Metall
- Betriebsvereinbarungen
- EuGH "Stechuhr-Urteil"

DIESE ANWEISUNG IST VERBINDLICH UND SOFORT UMZUSETZEN!

Rückfragen ausschließlich an:
- HR-Direktorin: (-500)
- Legal:  (-510)
- Compliance-Hotline: -555-777

Bestätigung der Kenntnisnahme bis Tag 8, 12:00 Uhr an HR.

gez.
HR Director
Legal Counsel

ANLAGEN:
- Gesetzestext ArbZG
- Muster Arbeitszeitnachweis
- FAQ Arbeitszeit
- Genehmigungsformular Mehrarbeit
- Checkliste Führungskräfte`
  },

  'd07_hrlegal_compliance_investigation_protocol.pdf': {
    filename: 'd07_hrlegal_compliance_investigation_protocol.pdf',
    title: 'Untersuchungsprotokoll: Compliance-Hinweis',
    type: 'document',
    content: `VERTRAULICHES UNTERSUCHUNGSPROTOKOLL
Compliance Case #2025-007

Klassifikation: STRENG VERTRAULICH - NEED TO KNOW
Verteiler: CEO, CFO, Legal, Compliance Officer
Datum: Tag 7
Status: LAUFENDE UNTERSUCHUNG

1. FALLÜBERSICHT

Case-ID: 2025-007
Eingang: Tag 5, 14:30 Uhr
Melder: Anonym (Hotline)
Kategorie: Verdacht auf Vorteilsnahme/Compliance-Verstoß
Priorität: HOCH
Risiko: Reputation, Rechtlich, Kunde

Vorwurf (zusammengefasst):
"Systematische Bevorzugung bestimmter Lieferanten gegen persönliche Vorteile. Aufträge ohne ordnungsgemäße Ausschreibung. Qualitätsprobleme werden vertuscht."

2. ERSTBEWERTUNG

Plausibilität: HOCH
- Konkrete Details genannt
- Nachprüfbare Fakten
- Zeitlicher Zusammenhang
- Interne Kenntnisse erkennbar

Betroffene Bereiche:
- Einkauf
- Qualitätssicherung  
- Möglicherweise Produktion

Potenzielle Schäden:
- Finanziell: bis 500k EUR
- Compliance-Verstoß
- Kundenvertrauen
- Strafrechtliche Relevanz

3. UNTERSUCHUNGSTEAM

Leitung: Dr. Weber (Compliance)
Legal: Dr. Müller (ext. Anwalt)
Finance: Controlling (Hr. Berg)
IT-Forensik: Extern beauftragt
HR: Nicht involviert (Befangenheit)

4. BISHERIGE MASSNAHMEN

Tag 5:
✓ Case eröffnet
✓ Erste Bewertung
✓ Team nominiert
✓ Beweissicherung initiiert

Tag 6:
✓ Dokumentensicherung
✓ E-Mail-Backup gezogen
✓ Zugriffsrechte gesichert
✓ Erste Analyse Einkaufsdaten

Tag 7:
✓ Interviews geplant
✓ Forensik beauftragt
✓ Lieferantenanalyse
□ Erste Zwischenergebnisse

5. VORLÄUFIGE FESTSTELLUNGEN

AUFFÄLLIGKEITEN IDENTIFIZIERT:

Lieferant X (Name geschwärzt):
- 340% Umsatzsteigerung in 12 Mon.
- Keine dokumentierte Ausschreibung
- Preise 15-20% über Markt
- Qualitätsprobleme dokumentiert
- Reklamationsquote 8% (Ø 2%)

Vergabeprozess:
- 12 Direktvergaben >50k EUR
- Fehlende Vergleichsangebote
- Unterschriften-Regelung umgangen
- Freigaben nachträglich

Persönliche Verbindungen:
- [Details unter Verschluss]
- Private Kontakte nachweisbar
- Gemeinsame Events
- Geschenke >Limit?

DOKUMENTIERTE VERSTÖSSE:

☑ Einkaufsrichtlinie §4.2 (Ausschreibung)
☑ Unterschriftenregelung §2.1
☑ Code of Conduct Ziff. 5 (Geschenke)
☐ Möglicher §299 StGB (Prüfung läuft)

6. DATENANALYSE

Geprüfte Dokumente: 2.341
Relevante Funde: 67
E-Mails analysiert: 12.450
Auffällige Kommunikation: 23

Muster erkannt:
- Umgehung Einkaufssystem
- Private E-Mail-Nutzung
- Löschungen vor Archivierung
- Absprachen außerhalb System

7. GEPLANTE INTERVIEWS

Priorität 1 (Tag 8-9):
□ Einkaufsleiter
□ Sachbearbeiter Einkauf (2)
□ QS-Mitarbeiter

Priorität 2 (Tag 10-11):
□ Lieferant X (rechtl. prüfen)
□ Produktionsleiter
□ Controlling

Priorität 3 (später):
□ Weitere Lieferanten
□ Ex-Mitarbeiter?

8. RECHTLICHE WÜRDIGUNG (vorläufig)

STRAFRECHTLICH:
- §299 StGB (Bestechlichkeit): Prüfung
- §266 StGB (Untreue): Möglich
- §263 StGB (Betrug): Unwahrscheinlich

ZIVILRECHTLICH:
- Schadensersatzansprüche
- Rückforderung Vorteile
- Vertragsstrafen Lieferanten

ARBEITSRECHTLICH:
- Abmahnung bis Kündigung
- Fristlos bei Bestätigung
- Rückforderung Gehalt teilw.

COMPLIANCE:
- Meldepflicht Kunden?
- Selbstanzeige Behörden?
- Versicherungsmeldung

9. RISIKOBEWERTUNG

Risiko | Wahrscheinl. | Impact | Maßnahme
-------|--------------|--------|----------
Kundenaudit | Hoch | Kritisch | Proaktive Info
Presseleaks | Mittel | Hoch | Kommunikation vorb.
Behördenermittlung | Mittel | Hoch | Anwalt bereit
Mitarbeiterunruhe | Hoch | Mittel | Info-Strategie
Folgefälle | Mittel | Mittel | Breite Prüfung

10. SOFORTMASSNAHMEN

BEREITS UMGESETZT:
✓ Zeichnungsberechtigung angepasst
✓ 4-Augen-Prinzip verschärft
✓ Lieferant X auf Hold
✓ Sonderprüfung Einkauf

GEPLANT (bis Tag 10):
□ Interviews durchführen
□ Forensik-Bericht
□ Entscheidung Suspendierung
□ Information Kunde Alpha?
□ Prozessanpassung

11. KOMMUNIKATIONSPLAN

INTERN:
- Vorstand: Täglich Update
- Aufsichtsrat: Bei Bestätigung
- Führungskräfte: Nach Abschluss
- Mitarbeiter: Allgemein nach Klärung

EXTERN:
- Kunden: Individuell bei Betroffenheit
- Lieferanten: Bei Notwendigkeit
- Behörden: Nach Rechtsberatung
- Presse: Keine proaktive Info

12. ZEITPLAN

Tag 8-9: Interviews Kernpersonen
Tag 10: Forensik-Zwischenbericht
Tag 11: Rechtliche Bewertung
Tag 12: Entscheidung Maßnahmen
Tag 14: Vorläufiger Abschlussbericht
Tag 21: Finaler Bericht
Tag 30: Prozessanpassungen

13. SZENARIEN

BEST CASE:
- Einzelfall
- Kein strafrechtl. Relevanz
- Interne Lösung
- Keine Kundenauswirkung

REALISTIC CASE:
- Systematisches Problem
- Arbeitsrechtl. Konsequenzen
- Prozessanpassungen nötig
- Einzelne Kundengespräche

WORST CASE:
- Strafrechtl. Ermittlungen
- Mehrere Beteiligte
- Kundenverluste
- Öffentlichkeit

14. LESSONS LEARNED (vorläufig)

- Einkaufsprozess zu schwach
- Kontrollen unzureichend
- Rotation fehlt
- Schulungen mangelhaft
- Hinweisgebersystem funktioniert!

15. NÄCHSTE SCHRITTE

Heute (Tag 7):
☑ Protokoll an CEO/CFO
□ Interview-Vorbereitung
□ IT-Forensik Brief

Morgen (Tag 8):
□ Erste Interviews
□ Datenanalyse vertiefen
□ Rechtliche Einschätzung

Diese Untersuchung unterliegt höchster Vertraulichkeit.
Keine Weitergabe. Keine Kopien. Legal Privilege.


Dr. Thomas Paulus
stv. Compliance Officer`
  },

  'd07_hrlegal_forensic_audit_proposal.pdf': {
    filename: 'd07_hrlegal_forensic_audit_proposal.pdf',
    title: 'Angebot: Forensische Sonderuntersuchung',
    type: 'document',
    content: `[BRIEFKOPF FORENSIK-KANZLEI]

CompliancePartners GmbH
Wirtschaftsprüfer | Rechtsanwälte | Forensik
Taunusanlage 11
60329 Frankfurt am Main

Aurion Pumpen Systeme
z.H. Dr. Thomas Paulus
stv. Compliance Officer
[Adresse]

Datum: Tag 7
Unser Zeichen: CP-2025-1247

ANGEBOT FORENSISCHE SONDERUNTERSUCHUNG
"Project Integrity" - Vertraulich

Sehr geehrter Herr Dr. Paulus,

bezugnehmend auf unser Telefonat vom heutigen Tag unterbreiten wir Ihnen hiermit unser Angebot für eine forensische Sonderuntersuchung.

1. AUSGANGSLAGE

Nach Ihrer Schilderung besteht der Verdacht auf:
- Compliance-Verstöße im Einkauf
- Mögliche Vorteilsnahme/gewährung
- Umgehung interner Kontrollen
- Qualitätsprobleme und deren Vertuschung

2. UNTERSUCHUNGSZIELE

- Sachverhaltsaufklärung vollumfänglich
- Beweissicherung gerichtsfest
- Schadensquantifizierung
- Verantwortlichkeiten klären
- Handlungsempfehlungen
- Prozessverbesserungen

3. LEISTUNGSUMFANG

PHASE 1: QUICK ASSESSMENT (3 Tage)
- Erstbewertung Sachverhalt
- Risikoeinstufung
- Sofortmaßnahmen-Empfehlung
- Untersuchungsplan
- Go/No-Go Entscheidung

Deliverable: Management Summary

PHASE 2: DATENFORENSIK (5-7 Tage)
- E-Mail-Analyse (PST/OST)
- Dokumentenanalyse
- Löschungen rekonstruieren
- Kommunikationsmuster
- Timeline-Erstellung
- Netzwerkanalyse

Tools: EnCase, Nuix, Relativity

PHASE 3: INTERVIEWS (3-5 Tage)
- Interview-Strategie
- Befragungen (8-10 Personen)
- Protokollierung
- Plausibilisierung
- Widersprüche klären

Methodik: Cognitive Interview Technique

PHASE 4: FINANCIAL FORENSICS (5 Tage)
- Transaktionsanalyse
- Preis-Benchmarking
- Schadensberechnung
- Red-Flag-Analyse
- Musterkennung

Software: IDEA, Power BI

PHASE 5: REPORTING (3 Tage)
- Detaillierter Bericht
- Executive Summary
- Beweisdokumentation
- Handlungsempfehlungen
- Präsentation Vorstand

4. TEAM

Projektleitung:
Marcus Hoffmann
Partner, Certified Fraud Examiner
20 Jahre Erfahrung Wirtschaftskriminalität

Forensik:
Thomas Klein, CPA
Senior Manager IT-Forensik
Spezialist Datenrekonstruktion

Legal:
Dr. Sarah Zimmermann
Counsel, Fachanwältin Strafrecht
Expertin Compliance-Verstöße

Support:
2 Forensik-Analysten
1 Projekt-Assistent

5. ZEITPLAN

Start: Tag 8 (bei Beauftragung heute)
Phase 1: Tag 8-10
Phase 2: Tag 11-17
Phase 3: Tag 12-16 (parallel)
Phase 4: Tag 15-20
Phase 5: Tag 21-23
Präsentation: Tag 24

Gesamtdauer: 16 Arbeitstage

6. HONORAR

Phase 1: EUR 12.000 (Festpreis)
Phase 2-5: Nach Aufwand

Stundensätze:
Partner: 450 EUR
Senior Manager: 350 EUR
Manager: 280 EUR
Analysten: 180 EUR

Geschätztes Gesamthonorar: 
EUR 78.000 - 95.000 zzgl. USt.

Kostenkontrolle:
- Wöchentliche Updates
- Cap möglich
- Abbruch nach Phase 1

7. LEGAL PRIVILEGE

Beauftragung über Rechtsanwalt sichert:
- Attorney-Client Privilege
- Beschlagnahmeschutz
- Vertraulichkeit
- Keine Zeugnispflicht

Empfehlung: Beauftragung durch Ihre Rechtsabteilung

8. VERTRAULICHKEIT

- Höchste Vertraulichkeit
- NDA selbstverständlich
- Sichere Datenräume
- Verschlüsselte Kommunikation
- Clean-Desk-Policy
- Löschung nach Projektende

9. REFERENZEN

Branchenreferenzen (anonymisiert):
- DAX-Konzern: Korruptionsfall
- Mittelstand: Einkaufskartell
- Automotive: Compliance-Verstoß

Gerne bei persönlichem Gespräch.

10. WARUM WIR?

✓ 500+ Forensik-Projekte
✓ Gerichtserfahrung
✓ Branchenkenntnis
✓ Krisenerprobung
✓ Diskret und schnell
✓ Senior-Team

11. VERSICHERUNG

Berufshaftpflicht: EUR 20 Mio.
Cyber-Versicherung: EUR 5 Mio.
Vertrauensschaden: EUR 2 Mio.

12. BEDINGUNGEN

Gültigkeit: 5 Tage
Zahlungsziel: 14 Tage
Kündigungsrecht: Täglich Phase 1
Gerichtsstand: Frankfurt
AGB: Beigefügt

13. OPTIONALE LEISTUNGEN

- Behördenkommunikation
- Krisenkommunkation
- Remediation-Begleitung
- Kontrollsystem-Design
- Schulungen
- Monitoring (6 Monate)

14. SOFORTMASSNAHMEN (kostenlos)

Bei Beauftragung heute:
- Telefonische Erstberatung
- Beweissicherungs-Checkliste
- Sperrung kritischer Zugriffe
- Kommunikationsempfehlung

15. KONTAKT 24/7

Hotline: +49 69 XXX XXX
Mobil: +49 171 XXX XXX
E-Mail: forensik@compliancepartnersxy4.de
Secure: signal/threema

Sehr geehrter Herr Dr. Paulus,

die Situation erfordert schnelles und professionelles Handeln. Wir stehen ab sofort zur Verfügung und können morgen mit Phase 1 beginnen.

Unsere Empfehlung: Beauftragen Sie zunächst nur Phase 1. Nach 3 Tagen haben Sie Klarheit über das Ausmaß und können informiert über das weitere Vorgehen entscheiden.

Für Rückfragen stehe ich Ihnen jederzeit zur Verfügung.

Mit freundlichen Grüßen

Marcus Hoffmann
Partner

Anlagen:
- AGB
- Teamprofile
- Methodik-Übersicht
- Referenzschreiben
- NDA-Entwurf`
},

  // CEO ANHÄNGE
  'd07_ceo_minority_sale_teaser.pdf': {
    filename: 'd07_ceo_minority_sale_teaser.pdf',
    title: 'Teaser: Minderheitsbeteiligung an etabliertem Mittelständler',
    type: 'document',
    content: `INVESTITIONSMÖGLICHKEIT
Minderheitsbeteiligung an deutscher Fertigungsexzellenz
STRENG VERTRAULICH - PROJEKT PHOENIX

ZUSAMMENFASSUNG
Ein führendes deutsches Fertigungsunternehmen sucht strategischen Minderheitsinvestor (25-49%) zur Wachstumsbeschleunigung und langfristigen Marktpositionssicherung.

WICHTIGSTE INVESTITIONSHIGHLIGHTS
- Umsatz: 44 Mio. EUR (LTM)
- 120 Mitarbeiter an 2 Standorten
- Etablierte Kundenbasis: 42 A-Kunden
- Starke Marktposition bei Präzisionsbauteilen
- ISO 9001/14001 zertifiziert
- Exportquote: 35%

STRATEGISCHE BEGRÜNDUNG
Das Unternehmen sucht einen Partner für:
- Bilanzstärkung (2-5 Mio. EUR frisches Kapital)
- Beschleunigung der Digitaltransformation
- Internationale Expansion
- Optimierung des Betriebskapitals

FINANZ-SNAPSHOT (LTM)
Umsatz: 44,0 Mio. EUR
EBITDA: 3,5 Mio. EUR (8,0%)
Betriebskapital: 2,5 Mio. EUR
Nettoverschuldung: 13,3 Mio. EUR
Mitarbeiter: 120

SEKTOR & MARKT
- Maritim  (45%)
- Industrielle Automatisierung (30%)
- Elektronik (25%)
- DACH-Region Fokus (65%)
- Wachsende Osteuropa-Präsenz
- Etablierte Basis in USA

INVESTITIONSSTRUKTUR
- Minderheitsbeteiligung: 25-49% verhandelbar
- Frisches Geld: 2-5 Mio. EUR
- Bewertung: Marktübliche Multiplikatoren
- Governance: Board-Repräsentation
- Exit: Put/Call-Optionen nach 3-5 Jahren

WERTSCHÖPFUNGSHEBEL
1. Operative Exzellenz-Programme
2. Kundendiversifizierung
3. Lieferkettenoptimierung
4. Digitale Transformation
5. Internationale Expansion

TRANSAKTIONSZEITPLAN
Woche 1-2: NDA und erste Informationen
Woche 3-4: Management-Präsentation
Woche 5-6: Due Diligence
Woche 7-8: Verbindliche Angebote
Woche 9-10: SPA-Verhandlung
Woche 11-12: Closing

IDEALES PARTNERPROFIL
- Industrieller/strategischer Investor bevorzugt
- Track Record in der Fertigung
- Internationales Netzwerk
- Langfristige Ausrichtung (3-5+ Jahre)
- Mehrwert-Fähigkeiten

HAUPTSTÄRKEN
✓ Treue Kundenbasis mit Langzeitverträgen
✓ Erfahrenes Management-Team
✓ Moderne Maschinen (Ø-Alter 6 Jahre)
✓ Starke Qualitätskennzahlen (PPM <100)
✓ Flexibilität und Individualisierungsfähigkeiten

WACHSTUMSCHANCEN
- 8+ Mio. EUR vertraglich gesicherte Pipeline
- 3 geplante Produktneueinführungen
- Osteuropa-Expansion
- Industrie 4.0-Implementierung
- Nachhaltigkeitszertifizierung

KONTAKT
Projekt Phoenix Beratungsteam
[Investment Bank Name]
phoenix@aurion-ps.com
+49 xx XXX XXX

Dieser Teaser ist streng vertraulich.
Verteilung nur an qualifizierte Investoren.`
  },

  'd07_ceo_nda_template.docx': {
    filename: 'd07_ceo_nda_template.docx',
    title: 'Non-Disclosure Agreement (Mutual) - M&A Process',
    type: 'document',
    content: `GEHEIMHALTUNGSVEREINBARUNG
(Gegenseitig)

Zwischen:
[FIRMENNAME] ("Unternehmen")
[Adresse]

Und:
[NAME INTERESSENT] ("Interessierte Partei")
[Adresse]

Jeweils eine "Partei", zusammen die "Parteien"

DA die Parteien eine potenzielle Geschäftstransaktion erkunden möchten ("Projekt Phoenix");

VEREINBAREN die Parteien hiermit:

1. VERTRAULICHE INFORMATIONEN
"Vertrauliche Informationen" bedeutet alle nicht-öffentlichen Informationen, die von einer Partei offengelegt werden, einschließlich aber nicht beschränkt auf:
- Finanzdaten und Prognosen
- Kunden- und Lieferantenlisten
- Technisches Know-how
- Geschäftspläne und Strategien
- Mitarbeiterinformationen
- Die Existenz dieser Gespräche

2. VERPFLICHTUNGEN
Jede Partei wird:
a) Alle vertraulichen Informationen streng geheim halten
b) Vertrauliche Informationen ausschließlich zur Bewertung der Transaktion verwenden
c) Nicht an Dritte ohne vorherige schriftliche Zustimmung weitergeben
d) Zugang auf Mitarbeiter mit Kenntniserfordernis beschränken
e) Gleiche Sorgfalt wie bei eigenen vertraulichen Informationen anwenden

3. ERLAUBTE OFFENLEGUNG
Offenlegung nur erlaubt:
a) An professionelle Berater, die zur Geheimhaltung verpflichtet sind
b) Falls gesetzlich oder durch Aufsichtsbehörde erforderlich
c) Falls Informationen ohne Verletzung öffentlich werden
d) Falls unabhängig ohne Nutzung vertraulicher Informationen entwickelt

4. KEINE VERPFLICHTUNG
Diese Vereinbarung verpflichtet keine Partei:
- Eine Transaktion einzugehen
- Bestimmte Informationen offenzulegen
- Gespräche fortzusetzen

5. RÜCKGABE VON INFORMATIONEN
Auf Anfrage wird jede Partei umgehend:
- Alle Dokumente und Materialien zurückgeben
- Alle elektronischen Kopien löschen
- Schriftliche Bestätigung der Einhaltung vorlegen

6. KEINE LIZENZ
Keine Lizenz oder Rechte gewährt außer ausdrücklich angegeben.

7. ABWERBEVERBOT
Für 24 Monate wird keine Partei Mitarbeiter der anderen ohne schriftliche Zustimmung abwerben oder einstellen.

8. LAUFZEIT
Diese Vereinbarung bleibt 3 Jahre ab Unterzeichnung in Kraft.

9. STILLHALTEVERPFLICHTUNG
Interessierte Partei verpflichtet sich, nicht:
- Unternehmenspapiere für 18 Monate zu erwerben
- Proxy-Contests zu initiieren
- Gruppen bezüglich Unternehmenspapiere zu bilden
- Öffentlich über potenzielle Transaktion zu kommentieren

10. RECHTSMITTEL
Parteien anerkennen, dass Verletzung irreparablen Schaden verursachen kann, für den Geldschäden unzureichend sind. Unterlassungsanspruch verfügbar.

11. GELTENDES RECHT
Diese Vereinbarung unterliegt deutschem Recht. Gerichte Frankfurt haben ausschließliche Zuständigkeit.

12. VERSCHIEDENES
- Vollständige Vereinbarung zwischen Parteien
- Änderungen nur schriftlich
- Kein Verzicht außer schriftlich
- Falls Bestimmung ungültig, bleibt Rest bestehen

UNTERSCHRIFTEN

UNTERNEHMEN:
_______________________
Name: Dr. Michael Steinberg
Titel: CEO
Datum: ___________

INTERESSIERTE PARTEI:
_______________________
Name: 
Titel: 
Datum: ___________

Zeuge:
_______________________
Name:
Datum:`
  },

  'd07_ceo_tv_media_briefing.pdf': {
    filename: 'd07_ceo_tv_media_briefing.pdf',
    title: 'Media Briefing: TV-Auftritt Vorbereitung',
    type: 'document',
    content: `TV-INTERVIEW BRIEFING DOKUMENT
Sender: Regional Business TV
Format: Wirtschaftsmagazin "Unternehmen im Fokus"
Sendezeit: Heute 19:30 Uhr (Aufzeichnung 15:00 Uhr)
Länge: 60-90 Sekunden O-Ton

KERNBOTSCHAFTEN (Rule of Three)

1. STABILITÄT GESICHERT
"Wir haben die operative Stabilität wiederhergestellt. Alle Gehälter sind gezahlt, die Produktion läuft auf Vollauslastung, und unsere Kunden erhalten termingerecht."

2. ZUKUNFT GESTALTEN
"Mit unseren 847 Mitarbeitern arbeiten wir an der Transformation: Digitalisierung, Nachhaltigkeit und internationale Expansion sind unsere Wachstumstreiber."

3. VERTRAUEN ZURÜCKGEWINNEN
"Die konstruktive Zusammenarbeit mit unserer Hausbank und die Unterstützung unserer Kunden zeigen: Der Weg aus der Krise ist machbar."

KRITISCHE FRAGEN & ANTWORTEN

F: "Wie akut ist die Insolvenzgefahr?"
A: "Eine Insolvenz steht nicht im Raum. Wir haben einen klaren Restrukturierungsplan, die Liquidität für die nächsten Monate ist gesichert, und wir arbeiten an nachhaltigen Lösungen."

F: "Sind Entlassungen geplant?"
A: "Unser Ziel ist der Erhalt aller Arbeitsplätze. Die Auftragslage ist gut, und wir setzen auf natürliche Fluktuation und Effizienzsteigerungen statt auf Stellenabbau."

F: "Was sagt die Bank?"
A: "Wir stehen in engem, konstruktivem Austausch. Die Bank unterstützt unseren Restrukturierungskurs und hat ihre Kreditlinien bestätigt."

F: "Suchen Sie einen Investor?"
A: "Wir prüfen alle strategischen Optionen, die unser Unternehmen stärken. Dazu gehören auch Partnerschaften, aber der Fokus liegt auf operativer Exzellenz."

F: "Wie geht es den Mitarbeitern?"
A: "Die Stimmung stabilisiert sich. Die pünktliche Gehaltszahlung war ein wichtiges Signal. Wir haben die interne Kommunikation intensiviert und führen regelmäßige Belegschaftstreffen durch."

ZAHLEN-KORRIDOR (nur wenn gefragt)
- Umsatz: "Rund 45 Millionen Euro"
- Mitarbeiter: "120"
- Exportquote: "Über 30 Prozent"
- Kunden: "Über 40 Stammkunden"
- Keine Details zu Verlusten/EBITDA!

BRIDGE-PHRASEN (Thema lenken)
- "Der wichtigere Punkt ist..."
- "Lassen Sie mich das in Kontext setzen..."
- "Was unsere Kunden interessiert ist..."
- "Die eigentliche Stärke liegt in..."

KÖRPERSPRACHE & AUFTRETEN
✓ Aufrechte Haltung (Kompetenz)
✓ Ruhige Gestik (Souveränität)
✓ Blickkontakt halten (Vertrauen)
✓ Leichtes Lächeln bei positiven Themen
✗ Keine verschränkten Arme
✗ Keine nervösen Gesten
✗ Kein Wegschauen bei kritischen Fragen

KLEIDUNG
- Dunkelblauer Anzug (Seriosität)
- Weißes Hemd (Klarheit)
- Dezente Krawatte (keine Signalfarben)
- Gepflegtes Erscheinungsbild

DO'S
✓ Kurze, klare Sätze
✓ Positive Formulierungen
✓ Konkrete Beispiele
✓ Dank an Stakeholder
✓ Zukunftsorientierung

DON'TS
✗ Schuldzuweisungen
✗ Detaillierte Krisenschilderung
✗ Unrealistische Versprechen
✗ Kritik an Bank/Kunden
✗ "Kein Kommentar"

NOTFALL-STATEMENT (bei Überraschung)
"Diese Details besprechen wir gerade intern. Was ich Ihnen aber sagen kann: Wir haben einen klaren Plan, die Unterstützung unserer Partner und arbeiten jeden Tag daran, gestärkt aus dieser Phase hervorzugehen."

NACH-INTERVIEW
- Visitenkarte übergeben
- Dank für faire Berichterstattung
- Angebot für Folgeinterview
- Keine Off-Record-Kommentare!`
  },

  'd07_ceo_qa_sheet_regional_tv.pdf': {
    filename: 'd07_ceo_qa_sheet_regional_tv.pdf',
    title: 'Q&A Sheet: Erweiterte Fragenkatalog TV',
    type: 'document',
    content: `Q&A SHEET - REGIONAL TV
Erweiterte Vorbereitung für alle Szenarien
Stand: Tag 7

KATEGORIE 1: KRISE & RESTRUKTURIERUNG

F: "wie nah war die Insolvenz?"
A: "Wir hatten eine Liquiditätsherausforderung, die wir durch schnelles Handeln und gute Zusammenarbeit mit allen Partnern gemeistert haben. Der Fokus liegt jetzt auf der Zukunft."

F: "Was ist schiefgelaufen?"
A: "Eine Kombination aus Marktverwerfungen und zu optimistischer Planung. Wir haben daraus gelernt und unsere Prozesse angepasst."

F: "Wer trägt die Verantwortung?"
A: "Als CEO trage ich die Gesamtverantwortung. Wichtiger als Schuldzuweisungen ist aber, dass wir als Team die Wende schaffen."

KATEGORIE 2: MITARBEITER & SOZIALES

F: "Bekommen die Mitarbeiter Weihnachtsgeld?"
A: "Sonderzahlungen sind derzeit ausgesetzt. Sobald wir nachhaltig profitabel sind, werden wir das neu bewerten."

F: "Wie ist die Stimmung in der Belegschaft?"
A: "Nach anfänglicher Verunsicherung stabilisiert sich die Lage. Die pünktliche Gehaltszahlung und offene Kommunikation helfen."

F: "Was sagt der Betriebsrat?"
A: "Wir arbeiten eng und konstruktiv zusammen. Der Betriebsrat unterstützt unseren Kurs und bringt wertvolle Impulse ein."

KATEGORIE 3: KUNDEN & MARKT

F: "Verlieren Sie Kunden?"
A: "Im Gegenteil - wir haben diese Woche drei Vertragsverlängerungen unterzeichnet. Unsere Kunden schätzen Qualität und Zuverlässigkeit."

F: "Wie sichern Sie die Lieferfähigkeit?"
A: "Durch Diversifizierung bei Lieferanten, optimiertes Lagerbestandsmanagement und verstärkte Qualitätskontrolle."

F: "Sind Sie noch wettbewerbsfähig?"
A: "Absolut. Unsere Stärken - Flexibilität, Qualität, Kundennähe - sind gerade jetzt gefragt."

KATEGORIE 4: FINANZEN & BANK

F: "Wie viel Schulden haben Sie?"
A: "Wir haben eine solide Finanzierungsstruktur mit überschaubarer Verschuldung im Branchenvergleich."

F: "Droht die Bank mit Kündigung?"
A: "Nein. Wir haben eine langjährige, vertrauensvolle Partnerschaft und arbeiten eng abgestimmt an Lösungen."

F: "Brauchen Sie frisches Geld?"
A: "Wir prüfen verschiedene Optionen zur Stärkung der Kapitalbasis, sind aber nicht unter Zeitdruck."

KATEGORIE 5: ZUKUNFT & STRATEGIE

F: "Wo steht das Unternehmen in einem Jahr?"
A: "Wieder profitabel, mit gestärkter Marktposition und neuen Produkten. Die Weichen dafür stellen wir jetzt."

F: "Verkaufen Sie das Unternehmen?"
A: "Ein Verkauf steht nicht zur Debatte. Wir suchen strategische Partnerschaften zur Stärkung."

F: "Prüfen Sie einen Verkauf Ihrer US-Tochter?"
A: "Wir arbeiten mit verschiedenen Szenarien, eine mögliche Straffung unserer Aktivitäten ist eine Option, aber das bedeutet nicht, dass wir uns von UPA treennen müssen."

KATEGORIE 6: PERSÖNLICHE FRAGEN

F: "Bereuen Sie etwas?"
A: "Dass wir nicht früher gegengesteuert haben. Aber Rückblick hilft nicht - jetzt zählt die Zukunft."

F: "Schlafen Sie noch gut?"
A: "Die Verantwortung für 120 Arbeitsplätze trägt man 24/7. Aber ich bin zuversichtlich, dass wir es schaffen."

F: "Bleiben Sie CEO?"
A: "Ich stehe zu meiner Verantwortung und werde das Unternehmen durch diese Phase führen."

KRITISCHE THEMEN - NICHT ANSPRECHEN
⚠️ Konkrete Verlustzahlen
⚠️ Namen von Problem-Kunden
⚠️ Details zu Bankgesprächen
⚠️ Interne Konflikte
⚠️ Konkrete Sparmaßnahmen

POSITIVE STORYS BEREITHALTEN
✓ Auszubildende übernommen
✓ Neues Patent angemeldet
✓ Energieeffizienz-Projekt
✓ Soziales Engagement trotz Krise
✓ Innovationsprojekt mit Hochschule

SCHLUSS-STATEMENT (immer)
"Wir haben schwierige Wochen hinter uns, aber auch bewiesen, dass wir kämpfen können. Mit unseren Mitarbeitern, Kunden und Partnern werden wir gestärkt aus dieser Phase hervorzugehen. Darauf arbeiten wir jeden Tag hin."`
  },

  // CFO ANHÄNGE
  'd07_cfo_partial_sale_options_analysis.pdf': {
    filename: 'd07_cfo_partial_sale_options_analysis.pdf',
    title: 'Analyse: Optionen Teilverkauf - Varianten & Impact',
    type: 'document',
    content: `VERTRAULICHE VORSTANDSVORLAGE
Optionen Teilverkauf (UPA) - Entscheidungsmatrix
Stand: Tag 7

EXECUTIVE SUMMARY
Drei Hauptoptionen mit unterschiedlichen Implikationen für Liquidität, Kontrolle und Stakeholder-Akzeptanz.
Wir bewerten die Optionen hier nach bestem Ermessen, können aber zum jetzigen Stand keine abschließenden Aussagen treffen. Wir empfehlen eine ausführliche Anaylse extern zu beauftragen (12k) oder zumindest unsere zu evaluieren (6k) oder LOI-Fahrplan skizzieren (5k).

OPTION A: MINORITY STAKE 25%

Struktur:
- Kapitalerhöhung gegen Bareinlage
- Verwässerung Altgesellschafter auf 75%
- Board-Sitz für Investor (3:1)
- Veto-Rechte bei Grundlagengeschäften

Financial Impact:
- Cash-Zufluss: EUR 3-4m (bei 12-16m Bewertung)
- Covenant-Effekt: EK-Quote +5-6PP auf ~24%
- Net Debt Reduktion: 3,0m → Ratio 2.8x
- Keine Steuereffekte (Kapitalerhöhung)

Pros:
✓ Schnelle Liquidität (4-6 Wochen)
✓ Kontrolle bleibt bei Altgesellschaftern
✓ Positives Signal an Markt
✓ Know-how-Transfer möglich

Cons:
✗ Verwässerung
✗ Neue Reporting-Pflichten
✗ Potenzielle Konflikte
✗ Exit-Komplexität steigt

Timeline: 6-8 Wochen bis Closing

OPTION B: STRATEGIC STAKE 49%

Struktur:
- Kombination Kapitalerhöhung + Share Deal
- Quasi-Kontrolle für Investor
- Paritätischer Beirat
- Umfassende Minderheitenrechte

Financial Impact:
- Cash-Zufluss: EUR 5-7m gesamt
- Davon Fresh Money: EUR 3m
- Kaufpreis an Altgesellschafter: EUR 2-4m
- Covenant-Effekt: EK-Quote +4PP
- Steuer auf Veräußerungsgewinn

Pros:
✓ Höhere Bewertung möglich
✓ Strategischer Partner
✓ Teilweise Liquidität für Altgesellschafter
✓ Professionalisierung Governance

Cons:
✗ Faktischer Kontrollverlust
✗ Komplexe Vereinbarungen nötig
✗ Längerer Prozess (10-12 Wochen)
✗ Change-of-Control-Klauseln triggered

Timeline: 10-12 Wochen bis Closing

OPTION C: CARVE-OUT NON-CORE ASSETS

Struktur:
- Verkauf Geschäftsbereich/Tochter
- Asset Deal oder Share Deal
- Keine Verwässerung
- Fokussierung Kerngeschäft

Identifizierte Assets:
- Werkzeugbau-Sparte: EUR 2-3m
- Grundstück Werk 2: EUR 1.5m
- Maschinenpark alt: EUR 0.8m
- Patent-Portfolio: EUR 0.5m

Financial Impact:
- Cash-Zufluss: EUR 2-4m (je nach Perimeter)
- Einmalertrag: EUR 0.5-1m
- Kosteneinsparung: EUR 0.3m p.a.
- Umsatzverlust: EUR 3-5m p.a.

Pros:
✓ Keine Verwässerung
✓ 100% Kontrolle bleibt
✓ Schnelle Teilliquidität möglich
✓ Strategische Fokussierung

Cons:
✗ Substanzverlust
✗ Geringerer Gesamterlös
✗ Mitarbeiter-Transfer nötig
✗ Operative Komplexität

Timeline: 8-10 Wochen bis Closing

BEWERTUNGSANSÄTZE

Multiple-Methode:
- EV/EBITDA: 4.0-5.0x (Peer Group)
- EV/Sales: 0.3-0.4x
- Implied Equity Value: EUR 12-18m

DCF-Methode:
- WACC: 9.5%
- Terminal Growth: 2%
- Equity Value: EUR 14-16m

Asset-Based:
- Buchwert EK: EUR 7m
- Stille Reserven: EUR 3-4m
- Adjusted Equity: EUR 10-11m

SENSITIVITÄTEN

Parameter | -20% | Base | +20%
----------|------|------|------
EBITDA Multiple | 11m | 14m | 17m
Growth Rate | 12m | 14m | 16m
WACC | 16m | 14m | 12m

STAKEHOLDER-ANALYSE

Banken:
- Präferenz: Option A (fresh money)
- Akzeptanz: B (mit Auflagen)
- Kritisch: C (Substanzverlust)

Betriebsrat:
- Präferenz: A (keine Jobverluste)
- Neutral: B (abhängig von Investor)
- Ablehnend: C (Arbeitsplätze)

Management:
- Präferenz: A (Kontrolle)
- Akzeptabel: C (Fokus)
- Kritisch: B (Machtverlust)

Kunden:
- Neutral: A & B (bei Industrieinvestor)
- Kritisch: C (Leistungsfähigkeit)

RISIKOMATRIX

Risiko | Option A | Option B | Option C
-------|----------|----------|----------
Execution Risk | Niedrig | Hoch | Mittel
Valuation Risk | Mittel | Hoch | Niedrig
Integration | Niedrig | Hoch | Mittel
Timing Risk | Niedrig | Hoch | Mittel
Reputation | Niedrig | Mittel | L/M

EMPFEHLUNG

Parallele Verfolgung von Option A & C:
1. Track 1: Minority Investor (25%) für Fresh Money
2. Track 2: Asset-Sale als Backup/Ergänzung

Begründung:
- Schnellste Liquidität
- Kontrolle gesichert
- Flexibilität erhalten
- Bank-Support wahrscheinlich

NÄCHSTE SCHRITTE

Sofort (Tag 7-8):
□ Board-Beschluss Prozessstart
□ Advisor-Mandat
□ Teaser finalisieren
□ Long-List Investoren

Woche 2:
□ NDAs versenden
□ Information Memorandum
□ Management Presentation
□ Data Room Setup

Woche 3-4:
□ First Round Meetings
□ Indicative Offers
□ DD-Vorbereitung
□ Stakeholder-Alignment`
  },

  'd07_cfo_ma_process_timeline.xlsx': {
    filename: 'd07_cfo_ma_process_timeline.xlsx',
    title: 'M&A Prozess-Timeline mit Meilensteinen',
    type: 'spreadsheet',
    content: `M&A PROZESS-TIMELINE
Project Phoenix - Detaillierte Zeitplanung UPA Verkauf

MASTER TIMELINE (Weeks from Start)

Week | Phase | Key Activities | Deliverables | Owner | Status
-----|-------|----------------|--------------|-------|--------
0 | Kick-off | Board Resolution | Mandate Letter | CEO/CFO | Pending
1 | Preparation | Advisor Selection | Engagement Letter | CFO | Open
1 | Preparation | Valuation Analysis | Indicative Range | CFO/Advisor | Open
2 | Preparation | Process Design | Process Letter | Advisor | Open
2 | Marketing Prep | Teaser Drafting | Final Teaser | CEO/Advisor | Draft
3 | Marketing Prep | Target List | Long List (30) | Advisor | Open
3 | Marketing Prep | IM Preparation | CIM Draft | CFO/Advisor | Open
4 | Outreach | Initial Contact | NDAs Sent | Advisor | Ready
4 | Outreach | Press Strategy | Comm Plan | CEO/PR | Open
5 | Phase I | NDA Execution | Signed NDAs | Legal | 0/15
5 | Phase I | IM Distribution | CIM Sent | Advisor | Ready
6 | Phase I | Management Pres | Deck Final | CEO/CFO | Draft
6 | Phase I | Q&A Sessions | FAQ Document | All | Open
7 | Phase I | Site Visits | Tour Schedule | COO | Planning
7 | Phase I | First Meetings | Meeting Notes | CEO/CFO | 0/8
8 | Bid Phase | Process Letter | Bid Instructions | Advisor | Draft
8 | Bid Phase | Indicative Bids | IOIs Received | Advisor | 0/5
9 | Selection | Bid Evaluation | Scoring Matrix | CFO/Advisor | Ready
9 | Selection | Shortlist | Top 3 Selected | Board | Pending
10 | Phase II | DD Preparation | Data Room Live | CFO/IT | 60%
10 | Phase II | DD Access | User Setup | IT | Ready
11 | Phase II | Expert Sessions | Expert Schedule | All | Open
11 | Phase II | Deep Dives | DD Protocols | CFO | Template
12 | Phase II | Contract Drafts | SPA Draft | Legal | Open
12 | Negotiations | Binding Offers | Final Bids | Advisor | 0/3
13 | Negotiations | SPA Negotiations | Mark-ups | Legal | N/A
13 | Negotiations | Price/Terms | Term Sheet | CEO/CFO | N/A
14 | Final Phase | Board Approval | Resolution | Board | Pending
14 | Final Phase | Signing | SPA Executed | All | Target
15 | Closing Prep | CP Fulfillment | CP List | Legal | Open
15 | Closing Prep | Regulatory | Clearances | Legal | Check
16 | Closing | Funds Transfer | Confirmation | CFO | Ready
16 | Closing | Share Transfer | Closing Memo | Legal | Template

WORKSTREAM DETAILS

1. FINANCIAL WORKSTREAM
Task | Due | Owner | Status | Dependencies
-----|-----|-------|--------|-------------
Historical Financials | W1 | CFO | Complete | None
Mgmt Accounts Update | W2 | CFO | In Progress | Month-end
Business Plan Update | W2 | CFO/CEO | Draft | Strategy
Working Capital Adj | W3 | CFO | Open | DD findings
Debt Schedule | W1 | CFO | Complete | Bank confirm
Tax Analysis | W4 | Tax Advisor | Open | Structure
Pension Liabilities | W3 | HR/CFO | In Progress | Actuary

2. LEGAL WORKSTREAM
Task | Due | Owner | Status | Dependencies
-----|-----|-------|--------|-------------
Corporate Housekeeping | W1 | Legal | 80% | Share register
Material Contracts | W2 | Legal | In Progress | Review
IP Portfolio | W3 | Legal/CTO | Open | Patent list
Litigation Review | W2 | Legal | Complete | None
Compliance Check | W3 | Legal/Comp | Open | Policies
Employment Review | W3 | HR/Legal | Open | Contracts
Real Estate | W2 | Legal/Ops | Complete | Title deeds

3. COMMERCIAL WORKSTREAM  
Task | Due | Owner | Status | Dependencies
-----|-----|-------|--------|-------------
Customer Analysis | W2 | Sales | Complete | CRM data
Pipeline Review | W2 | Sales | In Progress | Forecast
Competitor Analysis | W3 | Strategy | Open | Market research
Product Roadmap | W3 | CTO | Draft | R&D plan
Supplier Review | W2 | Procurement | Complete | Contracts
Market Study | W4 | Advisor | Open | External

4. OPERATIONAL WORKSTREAM
Task | Due | Owner | Status | Dependencies
-----|-----|-------|--------|-------------
Facility Tour Prep | W5 | COO | Planning | Schedule
IT Systems Map | W3 | CTO | In Progress | Architecture
Quality Certificates | W2 | Quality | Complete | ISO docs
Capacity Analysis | W3 | Production | Open | Utilization
Capex Plan | W3 | COO/CFO | Draft | Budget
Integration Planning | W8 | PMO | Open | Buyer input

CRITICAL PATH ITEMS
Priority | Item | deadline | Impact if Delayed
---------|------|----------|------------------
1 | Board Mandate | W0 | Process cannot start
2 | Teaser Final | W2 | Marketing delay
3 | NDA Template | W3 | Legal bottleneck  
4 | Data Room | W9 | DD delay
5 | Bank Consent | W10 | Deal risk
6 | Works Council | W11 | Social issues

STAKEHOLDER MANAGEMENT
Stakeholder | Information | Timing | Owner | Status
------------|------------|--------|-------|--------
Board | Full transparency | Weekly | CEO | Scheduled
Bank | Process update | Bi-weekly | CFO | Planned
Works Council | Information rights | W6 | CEO/HR | Pending
Key Customers | Comfort letters | W10 | CEO | Open
Key Suppliers | Continuity assurance | W10 | COO | Open
Management | Retention plan | W8 | CEO/HR | Draft

RISK REGISTER
Risk | Probability | Impact | Mitigation | Owner
-----|------------|--------|------------|-------
Leak to press | Medium | High | NDA, controlled comm | CEO
Bank objection | Low | High | Early engagement | CFO
Customer concerns | Medium | Medium | Proactive outreach | Sales
DD findings | Medium | Medium | Pre-DD cleanup | CFO
Valuation gap | High | Medium | Realistic expectations | Advisor
Process delay | Medium | Low | Buffer time, parallel tracks | PMO

SUCCESS METRICS
KPI | Target | Current | Status
----|--------|---------|--------
NDAs signed | 15+ | 0 | On track
IOIs received | 5+ | 0 | N/A
Valuation (EURm) | 14-18 | TBD | Indicative
Timeline (weeks) | 16 | 0 | Started
Stakeholder support | 100% | 60% | Building`
  },

  'd07_cfo_energy_subsidy_application.pdf': {
    filename: 'd07_cfo_energy_subsidy_application.pdf',
    title: 'Förderantrag: Energieeffizienz-Zuschuss',
    type: 'document',
    content: `FÖRDERANTRAG ENERGIEEFFIZIENZ
Bundesförderung für Energie- und Ressourceneffizienz (EEW)
Modul 4: Energie- und ressourcenbezogene Optimierung

ANTRAGSTELLER
Unternehmen: APS

Registergericht: Frankfurt HRB XXXXX
Anschrift: [Vollständige Adresse]
Branche: Metallverarbeitung/Maschinenbau/Pumpen
Mitarbeiter: 120
Jahresumsatz: EUR 44 Mio.

ANSPRECHPARTNER
CFO

E-Mail: cfo@aurion-ps.com

PROJEKTÜBERSICHT

Projekttitel: 
"Energieeffizienz-Offensive 2025 - Reduktion des Energieverbrauchs durch Prozessoptimierung und Modernisierung"

Projektlaufzeit: 
12 Monate

Gesamtinvestition: 
EUR 285.000 (netto)

Beantragte Förderung:
EUR 114.000 (40% Förderquote)

AUSGANGSSITUATION

Energieverbrauch Y-1:
- Strom: 4.200 MWh/a
- Gas: 2.800 MWh/a  
- Gesamt: 7.000 MWh/a
- Energiekosten: EUR 980.000/a
- CO2-Emissionen: 2.100 t/a

Energieintensive Bereiche:
1. Druckluftsystem (35%)
2. Beleuchtung (20%)
3. Heizung/Klima (25%)
4. Produktionsmaschinen (20%)

GEPLANTE MASSNAHMEN

1. DRUCKLUFTOPTIMIERUNG (EUR 95.000)
- Neue Kompressoren mit Wärmerückgewinnung
- Leckage-Ortung und -Beseitigung
- Bedarfsgerechte Steuerung
- Erwartete Einsparung: 380 MWh/a

2. LED-UMRÜSTUNG (EUR 75.000)
- Komplettumstellung auf LED
- Tageslichtsteuerung
- Bewegungsmelder
- Erwartete Einsparung: 420 MWh/a

3. WÄRMERÜCKGEWINNUNG (EUR 65.000)
- Abwärmenutzung Produktion
- Wärmepumpen-Integration
- Optimierung Heizkreisläufe
- Erwartete Einsparung: 350 MWh/a

4. ENERGIEMANAGEMENTSYSTEM (EUR 50.000)
- ISO 50001 Implementierung
- Digitale Verbrauchserfassung
- KI-gestützte Optimierung
- Erwartete Einsparung: 150 MWh/a

WIRTSCHAFTLICHKEITSBERECHNUNG

Investition: EUR 285.000
Förderung: EUR 114.000
Eigenanteil: EUR 171.000

Jährliche Einsparungen:
- Energie: 1.300 MWh/a
- Kosten: EUR 182.000/a
- CO2: 390 t/a

Amortisation:
- Mit Förderung: 0,94 Jahre
- Ohne Förderung: 1,57 Jahre
- ROI: 106% p.a.

FINANZIERUNG

Eigenkapital: EUR 85.000 (30%)
Bankdarlehen: EUR 200.000 (70%)
- Hausbank-Zusage liegt vor
- KfW-Kredit beantragt

PROJEKTUMSETZUNG

Q2:
- Ausschreibungen
- Auftragsvergabe
- Detailplanung

Q3:
- Installation Druckluft
- LED-Umrüstung Start

Q4:
- Wärmerückgewinnung
- Energiemanagement

Q1:
- Inbetriebnahme
- Optimierung
- Abschluss

NACHWEISE & ANLAGEN

☑ Energieaudit nach DIN 16247
☑ Angebote (3 je Maßnahme)
☑ Wirtschaftlichkeitsberechnung
☑ CO2-Bilanz
☑ Finanzierungszusage Bank
☑ Handelsregisterauszug
☑ Jahresabschluss 2023/2024
☑ De-minimis-Erklärung

ZUSÄTZLICHE FÖRDEREFFEKTE

Arbeitsplätze:
- Sicherung: 120
- Neue (indirekt): 2-3

Innovation:
- KI-Energiemanagement
- Digitaler Zwilling
- Predictive Maintenance

Multiplikator:
- Best Practice Sharing
- Lieferanten-Workshops
- Öffentlichkeitsarbeit

ERKLÄRUNGEN

Der Antragsteller versichert:
☑ Kein Beginn vor Bewilligung
☑ Alle Angaben korrekt
☑ Keine Doppelförderung
☑ Zweckbindung 5 Jahre
☑ Berichtspflichten bekannt

VERPFLICHTUNGEN

Bei Bewilligung verpflichtet sich der Antragsteller zu:
- Quartalweise Fortschrittsberichte
- Verwendungsnachweis binnen 3 Monaten
- Erfolgscontrolling für 3 Jahre
- Publizität gemäß Förderrichtlinie

Ort, Datum:  Tag 7

Rechtsverbindliche Unterschrift:

_______________________
CFO
(Einzelvertretungsberechtigt)

Stempel des Unternehmens`
  },

  'd07_cfo_energy_consumption_analysis.xlsx': {
    filename: 'd07_cfo_energy_consumption_analysis.xlsx',
    title: 'Energieverbrauchsanalyse mit Einsparpotentialen',
    type: 'spreadsheet',
    content: `ENERGIEVERBRAUCHSANALYSE 2024/2025
Basis für Förderantrag EEW

GESAMTÜBERSICHT ENERGIEVERBRAUCH

Energieträger | Y-2 | Y-1 | Y0 Plan | Einsparung | %
--------------|------|------|-----------|------------|-----
Strom (MWh) | 4.380 | 4.200 | 3.400 | 800 | -19%
Gas (MWh) | 3.100 | 2.800 | 2.300 | 500 | -18%
Gesamt (MWh) | 7.480 | 7.000 | 5.700 | 1.300 | -19%
Kosten (TEUR) | 1.047 | 980 | 798 | 182 | -19%
CO2 (Tonnen) | 2.244 | 2.100 | 1.710 | 390 | -19%

DETAILANALYSE STROMVERBRAUCH

Bereich | Ist Y-1 | Maßnahme | Einsparung | Neu Y0
--------|----------|----------|------------|----------
Druckluft | 1.470 MWh | Neue Kompressoren | -380 MWh | 1.090 MWh
Beleuchtung | 840 MWh | LED-Umrüstung | -420 MWh | 420 MWh
Produktion | 840 MWh | Optimierung | -100 MWh | 740 MWh
Klima/Lüftung | 630 MWh | Steuerung | -50 MWh | 580 MWh
Verwaltung | 210 MWh | Awareness | -20 MWh | 190 MWh
Sonstiges | 210 MWh | Diverses | -30 MWh | 180 MWh
TOTAL | 4.200 MWh | | -1.000 MWh | 3.200 MWh

DETAILANALYSE GASVERBRAUCH

Bereich | Ist Y-1 | Maßnahme | Einsparung | Neu Y0
--------|----------|----------|------------|----------
Raumheizung | 1.400 MWh | Wärmerückgew. | -350 MWh | 1.050 MWh
Prozesswärme | 980 MWh | Optimierung | -100 MWh | 880 MWh
Warmwasser | 280 MWh | Solar-Unterstützung | -50 MWh | 230 MWh
Sonstiges | 140 MWh | | 0 MWh | 140 MWh
TOTAL | 2.800 MWh | | -500 MWh | 2.300 MWh

MASSNAHMEN-PRIORISIERUNG (nach ROI)

Rang | Maßnahme | Invest | Einsparung/a | ROI | Amort.
-----|----------|--------|--------------|-----|--------
1 | LED-Umrüstung | 75k | 58,8k | 78% | 1,3 J
2 | Druckluft-Leckage | 25k | 18,2k | 73% | 1,4 J
3 | Bewegungsmelder | 15k | 9,8k | 65% | 1,5 J
4 | Kompressor-Upgrade | 70k | 35,0k | 50% | 2,0 J
5 | Wärmerückgewinnung | 65k | 28,0k | 43% | 2,3 J
6 | Energiemanagement | 50k | 21,0k | 42% | 2,4 J

BENCHMARK BRANCHENVERGLEICH

KPI | Unternehmen | Branche Ø | Best Practice | Ziel Y0
----|-------------|-----------|---------------|----------
kWh/Tsd EUR Umsatz | 159 | 142 | 95 | 130
kWh/Mitarbeiter | 8.274 | 7.500 | 5.000 | 6.730
Energiekosten/Umsatz | 2,2% | 2,0% | 1,3% | 1,8%
CO2/Mio EUR Umsatz | 48t | 43t | 28t | 39t

MONATSVERLAUF Y-1 (in MWh)

Monat | Strom | Gas | Gesamt | Kosten (EUR)
------|-------|-----|--------|-------------
Jan | 380 | 420 | 800 | 112.000
Feb | 360 | 380 | 740 | 103.600
Mär | 350 | 320 | 670 | 93.800
Apr | 340 | 200 | 540 | 75.600
Mai | 340 | 150 | 490 | 68.600
Jun | 350 | 120 | 470 | 65.800
Jul | 360 | 100 | 460 | 64.400
Aug | 340 | 100 | 440 | 61.600
Sep | 350 | 180 | 530 | 74.200
Okt | 360 | 280 | 640 | 89.600
Nov | 380 | 380 | 760 | 106.400
Dez | 390 | 470 | 860 | 120.400
TOTAL | 4.200 | 2.800 | 7.000 | 980.000

EINSPARPOTENTIAL NACH BEREICHEN

Bereich | Quick Wins (<3 Mon) | Mittelfr. (3-12 Mon) | Langfr. (>12 Mon)
--------|-------------------|---------------------|------------------
Produktion | 5% (50 MWh) | 15% (150 MWh) | 25% (250 MWh)
Gebäude | 10% (80 MWh) | 20% (160 MWh) | 35% (280 MWh)
Druckluft | 8% (120 MWh) | 20% (300 MWh) | 30% (450 MWh)
Beleuchtung | 15% (126 MWh) | 40% (336 MWh) | 50% (420 MWh)
IT/Büro | 5% (10 MWh) | 10% (20 MWh) | 15% (30 MWh)

INVESTITIONSPLAN ENERGIEEFFIZIENZ

Quartal | Maßnahmen | Investment | Förderung | Eigenanteil
--------|-----------|------------|-----------|-------------
Q2/2025 | LED, Sensoren | 90k | 36k | 54k
Q3/2025 | Druckluft | 95k | 38k | 57k
Q4/2025 | Wärme, HVAC | 65k | 26k | 39k
Q1/2026 | EnMS, Sonstige | 35k | 14k | 21k
TOTAL | | 285k | 114k | 171k

CONTROLLING & MONITORING

KPI | Ist | Soll | Messung | Verantwortlich
----|-----|-----|---------|---------------
Energieintensität | 159 | 130 | Monatlich | Controlling
Lastspitzen Strom | 850 kW | 700 kW | Täglich | Technik
Druckluft-Leckage | 28% | <10% | Quartalsweise | Wartung
Raumtemperatur | 22°C | 20°C | Kontinuierlich | Facility
Eigenerzeugung | 0% | 5% | Monatlich | Technik

RISIKEN & CHANCEN

Risiko/Chance | Wahrscheinl. | Impact | Maßnahme
--------------|--------------|--------|----------
Energiepreise +20% | Hoch | +196k | Hedging, Effizienz
Förderkürzung | Niedrig | -40k | Alternative Förderung
Technik-Ausfall | Mittel | -50k | Redundanz, Wartung
CO2-Bepreisung | Hoch | -60k | Dekarbonisierung
PV-Eigenversorgung | Mittel | +80k | Feasibility prüfen`
  },

  'd07_cfo_funding_authority_letter.pdf': {
    filename: 'd07_cfo_funding_authority_letter.pdf',
    title: 'Förderstelle: Anforderung Vollantrag',
    type: 'document',
    content: `[BRIEFKOPF FÖRDERSTELLE]

Wirtschaftsförderung 
Abteilung Mittelstandsförderung
Kaiser-Friedrich-Ring 75

An Aurion Pumpen Systeme
zH CFO


Datum: Tag 7
Unser Zeichen: WF-20-0147
Ihr Zeichen: Antrag vom Tag 3

Betreff: Förderprogramm "Transformation Mittelstand "
Ihr Vorantrag vom Tag 3 - Aufforderung zur Einreichung Vollantrag

Sehr geehrter Herr (Name),

wir beziehen uns auf Ihren Vorantrag vom Tag 3 für das Förderprogramm "Transformation Mittelstand " mit einem beantragten Fördervolumen von EUR 250.000.

Nach Prüfung Ihrer Unterlagen durch unseren Fachausschuss teilen wir Ihnen mit, dass Ihr Projekt grundsätzlich förderfähig erscheint und in die engere Auswahl aufgenommen wurde.

POSITIVE BEWERTUNG FOLGENDER ASPEKTE:

- Innovationsgrad der geplanten Digitalisierung
- Nachhaltigkeitseffekte (CO2-Reduktion >15%)
- Beschäftigungssicherung (120 Arbeitsplätze)
- Multiplikatorwirkung in der Region
- Kooperationen mit Hochschulen

VORAUSSETZUNGEN FÜR VOLLANTRAG:

Zur finalen Bewilligung benötigen wir binnen 5 Werktagen (bis Tag 12) folgende Unterlagen:

1. DETAILLIERTER MASSNAHMENPLAN
   - Meilensteine mit Terminen
   - Messbare Erfolgskriterien
   - Risikobewertung

2. INVESTITIONSPLAN MIT BELEGEN
   - Verbindliche Angebote (mind. 3 je Position)
   - Eigenanteil-Nachweis (mind. 40%)
   - Zahlungsplan über 24 Monate

3. KOFINANZIERUNGSNACHWEIS
   - Bankzusage über Kreditlinie
   - Oder: Gesellschafterbeschluss Kapitalerhöhung
   - Oder: Letter of Intent strategischer Partner
   - Liquiditätsplanung für Projektlaufzeit

4. EINSPAR-/EFFIZIENZNACHWEIS
   - Quantifizierte Einsparungen (EUR/Jahr)
   - CO2-Bilanz (vorher/nachher)
   - Energieaudit oder Gutachten
   - ROI-Berechnung

5. ARBEITSPLATZGARANTIE
   - Standortzusage für mind. 5 Jahre
   - Beschäftigungsgarantie 36 Monate
   - Ausbildungsplatzerhalt/-ausbau

6. WEITERE UNTERLAGEN
   - Aktueller Jahresabschluss (testiert)
   - Aktuelle BWA und SuSa
   - Unbedenklichkeitsbescheinigung Finanzamt
   - Unbedenklichkeitsbescheinigung Sozialversicherung
   - Compliance-Erklärung

FÖRDERBEDINGUNGEN (AUSZUG):

- Förderquote: Bis zu 40% der förderfähigen Kosten
- Maximale Förderung: EUR 250.000
- Eigenanteil: Mind. 40% (keine weiteren Fördermittel)
- Projektstart: Nicht vor Bewilligung
- Projektlaufzeit: Max. 24 Monate
- Verwendungsnachweis: 3 Monate nach Projektende
- Zweckbindung: 5 Jahre
- Berichtspflicht: Quartalsweise

WICHTIGE HINWEISE:

1. Die Frist zur Einreichung ist NICHT verlängerbar
2. Unvollständige Anträge führen zur Ablehnung
3. Nachreichungen sind nicht möglich
4. Die Mittel sind begrenzt (First-Come-First-Served)
5. Bewilligung unter Vorbehalt der Haushaltsmittel

BEWERTUNGSKRITERIEN (Gewichtung):

- Innovationsgrad: 30%
- Wirtschaftlichkeit: 25%  
- Nachhaltigkeit: 20%
- Beschäftigungseffekte: 15%
- Regionale Bedeutung: 10%

Ihr Projekt erreichte in der Vorbewertung 78 von 100 Punkten.
Schwellenwert für Förderung: 65 Punkte.

ZEITPLAN:

Tag 12: Frist Vollantrag
Tag 15: Ausschusssitzung
Tag 17: Bewilligungsbescheid (bei positivem Votum)
Tag 20: Mittelabruf möglich

ANSPRECHPARTNER:

Für Rückfragen steht Ihnen zur Verfügung:

Dr. Andrea Müller
Referatsleiterin Mittelstandsförderung
Tel: XXX-XXX-XXXX
E-Mail: mueller@wirtschaftsfoerderung-xy1.de

Sprechzeiten: Mo-Fr 9-12 Uhr

Wir weisen darauf hin, dass auch bei Erfüllung aller Voraussetzungen kein Rechtsanspruch auf Förderung besteht. Die Bewilligung erfolgt im Rahmen verfügbarer Haushaltsmittel.

Bitte bestätigen Sie den Erhalt dieses Schreibens und Ihre Absicht zur Antragstellung umgehend per E-Mail.

Mit freundlichen Grüßen

Dr. Andrea Müller
Referatsleiterin

Anlagen:
- Formular Vollantrag
- Merkblatt Verwendungsnachweis
- Muster Projektbericht
- FAQ-Katalog`
  },

  'd07_cfo_capex_plan_2025.xlsx': {
    filename: 'd07_cfo_capex_plan_2025.xlsx',
    title: 'Capex-Plan  für Förderantrag',
    type: 'spreadsheet',
    content: `CAPEX PLAN 
Investment- und Modernisierungsprogramm

EXECUTIVE SUMMARY
Gesamt-Capex: EUR 1.250.000
Davon förderfähig: EUR 625.000
Erwartete Förderung: EUR 250.000
Eigenfinanzierung: EUR 1.000.000
Beraterhonorar: EUR 6.000

INVESTITIONSÜBERSICHT NACH KATEGORIEN

Kategorie | Budget | Förderf. | Förderquote | Eigenanteil | Priorität
----------|--------|----------|-------------|-------------|----------
Digitalisierung | 450k | 450k | 40% | 270k | Hoch
Nachhaltigkeit | 350k | 175k | 40% | 280k | Hoch
Produktivität | 300k | 0k | 0% | 300k | Mittel
Instandhaltung | 150k | 0k | 0% | 150k | Niedrig
GESAMT | 1.250k | 625k | | 1.000k |

DETAILPLANUNG Q1-Q4 2025

Q1/2025 - START PHASE
Invest | Betrag | Förderung | Beschreibung | ROI
-------|--------|-----------|--------------|-----
ERP-Upgrade | 120k | 48k | SAP S/4 Migration | 24 Mon
Energiemanagement | 50k | 20k | ISO 50001 System | 18 Mon
LED Phase 1 | 45k | 18k | Halle 1+2 | 15 Mon
Subtotal Q1 | 215k | 86k | | 

Q2/2025 - DIGITALISIERUNG
Invest | Betrag | Förderung | Beschreibung | ROI
-------|--------|-----------|--------------|-----
MES-System | 85k | 34k | Prod.-Steuerung | 20 Mon
Predictive Maint. | 65k | 26k | KI-Wartung | 16 Mon
Druckluft | 95k | 38k | Kompressoren | 24 Mon
Digital Twin | 40k | 16k | Simulation | 30 Mon
Subtotal Q2 | 285k | 114k | |

Q3/2025 - NACHHALTIGKEIT
Invest | Betrag | Förderung | Beschreibung | ROI
-------|--------|-----------|--------------|-----
Wärmerückgew. | 65k | 26k | Abwärmenutzung | 28 Mon
Solar-Vorbereitung | 30k | 0k | Dach-Statik | 48 Mon
Recycling-System | 45k | 18k | Kreislaufwirtsch. | 36 Mon
LED Phase 2 | 30k | 12k | Verwaltung | 15 Mon
Subtotal Q3 | 170k | 56k | |

Q4/2025 - PRODUKTION
Invest | Betrag | Förderung | Beschreibung | ROI
-------|--------|-----------|--------------|-----
CNC-Retrofit | 180k | 0k | Modernisierung | 36 Mon
Roboter-Zelle | 120k | 0k | Automatisierung | 30 Mon
QS-Equipment | 40k | 0k | Messtechnik | 24 Mon
Wartung/Überholung | 80k | 0k | Planned Maint. | n/a
ERP Phase 2 | 60k | 24k | Rollout | 18 Mon
IoT-Sensorik | 35k | 14k | Vernetzung | 12 Mon
Schulungen | 30k | 12k | Qualifizierung | 12 Mon
Reserve | 35k | 0k | Puffer | n/a
Subtotal Q4 | 580k | 50k | |

FINANZIERUNGSPLAN

Quelle | Betrag | Anteil | Status | Konditionen
-------|--------|--------|--------|-------------
Förderung Land | 250k | 20% | Beantragt | Zuschuss
KfW-Kredit | 400k | 32% | In Prüfung | 2,5% p.a.
Hausbank | 300k | 24% | Zugesagt* | 4,5% p.a.
Leasing | 200k | 16% | Angebote | 3,8% eff.
Eigenkapital | 100k | 8% | Verfügbar | Opportunity
GESAMT | 1.250k | 100% | | 

*vorbehaltlich Covenant-Waiver

WIRTSCHAFTLICHKEITSBERECHNUNG

Jahr | Einsparung | Kum. Einsparung | Invest | Kum. CF
-----|------------|-----------------|--------|--------
2025 | 180k | 180k | -1.250k | -1.070k
2026 | 420k | 600k | 0k | -650k
2027 | 450k | 1.050k | 0k | -200k
2028 | 450k | 1.500k | 0k | +250k
2029 | 450k | 1.950k | 0k | +700k

NPV (8%): EUR 312k
IRR: 18,4%
Payback: 3,4 Jahre
Mit Förderung: 2,7 Jahre

FÖRDERANTRAG - KERNPROJEKTE

1. ERP-DIGITALISIERUNG (EUR 180k)
Förderfähig: 100%
Förderquote: 40%
Förderung: EUR 72k

Maßnahmen:
- SAP S/4HANA Migration
- Echtzeit-Analytics
- Mobile Apps
- KI-Prognosen

Nutzen:
- Transparenz +100%
- Durchlaufzeit -20%
- Bestände -15%
- Fehlerquote -30%

2. MES/IoT VERNETZUNG (EUR 120k)
Förderfähig: 100%
Förderquote: 40%
Förderung: EUR 48k

Maßnahmen:
- Maschinenanbindung
- Echtzeitdaten
- OEE-Tracking
- Predictive Analytics

Nutzen:
- OEE +15%
- Rüstzeiten -25%
- Ausschuss -20%
- Wartung optimiert

3. ENERGIEEFFIZIENZ (EUR 285k)
Förderfähig: 50%
Förderquote: 40%
Förderung: EUR 57k

Maßnahmen:
- LED-Umrüstung
- Druckluftoptimierung  
- Wärmerückgewinnung
- EnMS ISO 50001

Nutzen:
- Energiekosten -20%
- CO2 -390t/Jahr
- Zertifizierung
- Image-Gewinn

4. QUALIFIZIERUNG (EUR 40k)
Förderfähig: 100%
Förderquote: 60%
Förderung: EUR 24k

Maßnahmen:
- Digitalkompetenz
- Lean Management
- Energieeffizienz
- Führung 4.0

Nutzen:
- Produktivität +10%
- Fehlerquote -15%
- Innovation
- Mitarbeiterbindung

MEILENSTEINPLAN

MS | Termin | Beschreibung | Erfolgs-KPI
---|--------|--------------|-------------
1 | März 25 | Projektstart | Kick-off durchgeführt
2 | Apr 25 | ERP-Migration Start | Testumgebung live
3 | Jun 25 | MES produktiv | 30% Maschinen vernetzt
4 | Aug 25 | Energie-Audit | Baseline dokumentiert
5 | Okt 25 | Digital Twin live | Erste Simulation
6 | Dez 25 | Jahresabschluss | 50% Ziele erreicht
7 | März 26 | Phase 2 Start | Rollout Standort 2
8 | Juni 26 | Vollvernetzung | 80% IoT-Integration
9 | Sept 26 | Energieziele | -20% verifiziert
10 | Dez 26 | Projektabschluss | 100% Umsetzung

RISIKOMATRIX

Risiko | Wahrsch. | Impact | Maßnahme | Verantw.
-------|----------|--------|----------|----------
Förderung abgelehnt | Niedrig | Hoch | Plan B ready | CFO
Verzögerung Lieferanten | Mittel | Mittel | Puffer, Eskalation | COO
Budget-Überschreitung | Mittel | Mittel | Contingency 10% | CFO
Akzeptanz Mitarbeiter | Niedrig | Hoch | Change Mgmt | HR
Technische Probleme | Mittel | Niedrig | Support-Verträge | IT
Covenant-Verletzung | Niedrig | Hoch | Waiver vorbereitet | CFO`
  },

  // OPS ANHÄNGE
  'd07_ops_escalation_matrix.pdf': {
    filename: 'd07_ops_escalation_matrix.pdf',
    title: 'Eskalationsmatrix für A-Kunden',
    type: 'document',
    content: `ESKALATIONSMATRIX A-KUNDEN_
24/7 Erreichbarkeit und definierte Reaktionszeiten

KLASSIFIZIERUNG KUNDEN

Platinum (>500k EUR p.a.):
- Alpha Automotive GmbH
- Beta Systems AG
- Gamma TechSolutions
- Delta Manufacturing
- Epsilon Logistics
24/7-Hotline: 5k
Gold (200-500k EUR p.a.):
- 15 Kunden (Liste siehe Anhang)
- Umsatzanteil: 35%

Silver (100-200k EUR p.a.):
- 22 Kunden
- Umsatzanteil: 20%

ESKALATIONSSTUFEN

LEVEL 1 - OPERATIVE EBENE (Reaktion: <2 Stunden)
Trigger:
- Lieferverzug <24h
- Qualitätsabweichung <100 PPM
- Dokumentationsfehler

Ansprechpartner:
- Schichtleiter Produktion: +49 171 XXX (24/7)
- QS-Leiter: +49 172 XXX (Bürozeiten)
- Kundenservice: +49 69 XXX-100 (8-18 Uhr)

Befugnisse:
✓ Umplanung Produktion
✓ Express-Versand
✓ Sortieraktionen
✓ Kulanzentscheidungen bis 1.000 EUR

LEVEL 2 - MANAGEMENT (Reaktion: <1 Stunde)
Trigger:
- Lieferverzug >24h
- Qualität >100 PPM
- Reklamation A-Kunde
- Drohender Lieferstopp

Ansprechpartner:
- COO: +49 170 XXX (24/7)
- Leiter Vertrieb: +49 171 XXX (24/7)
- Werksleiter: +49 172 XXX (24/7)

Befugnisse:
✓ Sonderschichten anordnen
✓ Fremdvergabe bis 10k
✓ Kulanz bis 5.000 EUR
✓ Priorisierung ändern

LEVEL 3 - GESCHÄFTSFÜHRUNG (Reaktion: <30 Min)
Trigger:
- Bandstillstand Kunde
- Pönale >10k EUR
- Medialer Druck
- Vertragskündigung droht

Ansprechpartner:
- CEO: +49 170 XXX (24/7)
- CFO: +49 171 XXX (24/7)

Befugnisse:
✓ Alle erforderlichen Maßnahmen
✓ Externe Ressourcen
✓ Unbegrenzte Kulanz
✓ Strategische Entscheidungen

SPEZIELLE ESKALATIONSPFADE

QUALITÄTSPROBLEME:
1. QS-Hotline: +49 xx XXX-200
2. 8D-Report binnen 24h
3. Task Force vor Ort <48h
4. Interim-Maßnahmen sofort

LIEFERVERZUG:
1. Supply Chain Control: +49 69 XXX-300  
2. Alternativ-Routing prüfen
3. Teil-Lieferungen anbieten
4. Kompensation vereinbaren

IT-AUSFALL/CYBERATTACKE:
1. IT-Notfall: +49 xx XXX-911
2. Backup-Systeme aktivieren
3. Manuelle Prozesse
4. Krisenstab einberufen

WOCHENEND-/FEIERTAGSDIENST

Bereitschaftsplan:
- Woche 1: Team A (Müller/Schmidt/Weber)
- Woche 2: Team B (Meyer/Wagner/Becker)
- Rotation 14-tägig
- Vergütung gem. Betriebsvereinbarung

Erreichbarkeit:
- Zentrale Hotline: 0800-XXX (24/7)
- Automatische Weiterleitung
- Max. 3 Klingeltöne
- Rückruf binnen 15 Min

KOMMUNIKATIONSREGELN

Intern:
- WhatsApp-Gruppe "A-Kunden-Alert"
- E-Mail-Verteiler: a-customers@company.de
- Teams-Channel: #customer-escalation
- Tägliche Abstimmung 8:00 Uhr

Extern (zum Kunden):
- Erstmeldung binnen 2h
- Update alle 4h
- Abschlussbericht <48h
- Lessons Learned <1 Woche

DOKUMENTATION

Pflichtfelder Eskalation:
□ Kunde & Ansprechpartner
□ Problem-Beschreibung
□ Auswirkung beim Kunden
□ Sofortmaßnahmen
□ Root Cause (vorläufig)
□ Korrekturmaßnahmen
□ Zeitplan
□ Verantwortlicher

Tools:
- CRM-System (Ticket-Nr.)
- SharePoint (Dokumentation)
- SAP QM (Reklamation)
- Confluence (Lessons Learned)

TRAINING & AWARENESS

Schulungsplan:
- Neue MA: Einweisung Tag 1
- Quartalstraining: Fallbeispiele
- Jahresübung: Krisensimulation
- After-Action-Reviews

Verfügbarkeit Matrix:
- Intranet: Immer aktuell
- Wallet-Card: Alle MA
- Poster: Alle Bereiche
- App: In Entwicklung

ERFOLGSMESSUNG

KPIs:
- Reaktionszeit Ø: <45 Min (Ziel: <30)
- Lösungszeit Ø: <8h (Ziel: <6h)
- Eskalationsrate: 2,3% (Ziel: <2%)
- Kundenzufriedenheit: 8,2/10 (Ziel: >9)

Monatliches Review:
- Anzahl Eskalationen
- Ursachenanalyse
- Maßnahmen-Tracking
- Kundenfeedback

ANHANG:
A. Kundenliste mit Klassifizierung
B. Bereitschaftsplan 2025
C. Muster 8D-Report
D. Eskalationsformular
E. Training Materials`
  },

  'd07_ops_sla_proposal_key_accounts.pdf': {
    filename: 'd07_ops_sla_proposal_key_accounts.pdf',
    title: 'Service Level Agreement - Premium Service für A-Kunden',
    type: 'document',
    content: `SERVICE LEVEL AGREEMENT_
Premium Support für A-Kunden
Gültig ab: Tag 10

1. GELTUNGSBEREICH

Dieses SLA gilt für:
- Platinum-Kunden (>500k EUR p.a.)
- Gold-Kunden (200-500k EUR p.a.)
- Gesamt: 20 Kunden
- Umsatzanteil: 65%

2. SERVICE-LEVEL-DEFINITIONEN

PLATINUM SERVICE:

Verfügbarkeit:
- 24/7/365 Hotline (5k)
- Dedizierter Account Manager
- Backup-Ansprechpartner
- Management-Eskalation <30 Min

Lieferperformance:
- On-Time-Delivery: 99% (garantiert)
- Notfall-Lieferung: <24h
- Express-Option: <8h (Aufpreis)
- Bestandsreservierung möglich

Qualitätszusagen:
- PPM-Rate: <50
- 8D-Report: <24h
- Vor-Ort-Service: <48h
- Präventiv-Audits: 2x p.a.

Support:
- Technischer Support: 24/7
- Remote-Diagnose
- Ersatzteil-Express
- Schulungen inklusive

GOLD SERVICE:

Verfügbarkeit:
- Bürozeiten + Bereitschaft
- Key Account Manager
- Management-Eskalation <2h

Lieferperformance:
- OTD: 97% (garantiert)
- Notfall: <48h
- Express: <24h (Aufpreis)

Qualitätszusagen:
- PPM: <100
- 8D: <48h
- Vor-Ort: Nach Vereinbarung
- Audits: 1x p.a.

3. LEISTUNGSKATALOG

INKLUSIVE LEISTUNGEN:

Beratung:
✓ Monatliche Review-Calls
✓ Quarterly Business Reviews
✓ Technische Beratung
✓ Optimierungsvorschläge

Priorisierung:
✓ Bevorzugte Fertigung
✓ Kapazitätsreservierung
✓ Erste Wahl bei Engpässen
✓ Sonderwünsche möglich

Digital Services:
✓ EDI-Anbindung
✓ Portal-Zugang
✓ Real-Time Tracking
✓ Forecast-Sharing

Qualität:
✓ Erweiterte Eingangskontrollen
✓ Kundenspezifische Prüfungen
✓ Zertifikate digital
✓ Rückverfolgbarkeit 10 Jahre

ZUSATZLEISTUNGEN (kostenpflichtig):

- Konsignationslager
- VMI (Vendor Managed Inventory)
- Sequenzlieferung
- Sonderverpackung
- Wochenendproduktion

4. PERFORMANCE-METRIKEN

Metrik | Platinum | Gold | Messung
-------|----------|------|--------
OTD | 99% | 97% | Monatlich
Qualität PPM | <50 | <100 | Monatlich
Reaktionszeit | <30 Min | <2h | Pro Fall
Lösungszeit | <6h | <24h | Pro Fall
Verfügbarkeit | 99,5% | 98% | Jährlich

5. ESKALATIONSMATRIX

Level 1: Operations
→ Schichtleiter: 2h Reaktion
→ Befugnis: Bis 1.000 EUR

Level 2: Management  
→ COO/Vertrieb: 1h Reaktion
→ Befugnis: Bis 5.000 EUR

Level 3: Geschäftsführung
→ CEO/CFO: 30 Min
→ Befugnis: Unbegrenzt

6. PÖNALE-REGELUNG

Bei Unterschreitung SLA:

OTD <95%:
- 0,5% Preisnachlass/Monat

PPM >200:
- 1% Preisnachlass/Monat

Lieferstopp:
- 100 EUR/Stunde (max. 1.000/Tag)

Maximal: 3% pro Quartal

7. KOMPENSATION

Für Premium-Service:

Platinum:
- Grundgebühr: 2.500 EUR/Monat
- Oder: 1% Aufschlag auf Preise

Gold:
- Grundgebühr: 1.000 EUR/Monat
- Oder: 0,5% Aufschlag

Inkludiert:
- Alle definierten Services
- Software-Lizenzen
- Schulungen (2 Tage p.a.)

8. REPORTING

Monatlich:
- Performance Dashboard
- Trend-Analyse
- Maßnahmen-Status

Quartalsmäßig:
- Business Review
- Forecast-Abgleich
- Optimierungspotenziale
- Innovations-Roadmap

9. GOVERNANCE

Regeltermine:
- Monthly Call: 1. Mittwoch
- QBR: Quartalsende
- Jahresgespräch: November

Teilnehmer:
- Kunde: Einkauf, QS, Logistik
- Wir: KAM, QS, Operations

10. LAUFZEIT & KÜNDIGUNG

- Laufzeit: 24 Monate
- Verlängerung: Automatisch 12 Monate
- Kündigung: 3 Monate zum Jahresende
- Sonderkündigung bei Breach

11. KONTINUIERLICHE VERBESSERUNG

- Gemeinsame KVP-Workshops
- Innovationsprojekte
- Best-Practice-Sharing
- Win-Win-Orientierung

UNTERSCHRIFTEN:

Kunde:                    Lieferant:
_________________       _________________
Name:                    Name:
Datum:                   Datum:`
  },

  'd07_ops_kanban_implementation_plan.pdf': {
    filename: 'd07_ops_kanban_implementation_plan.pdf',
    title: 'Kanban-Einführungsplan für kritische Teile',
    type: 'document',
    content: `KANBAN IMPLEMENTATION PLAN_
Pilotprojekt für Top-10 Engpassteile

1. AUSGANGSSITUATION

Probleme:
- Materialengpässe bei 15% der A-Teile
- Überbestände bei C-Teilen (2,1 Mio. EUR)
- Fehlende Transparenz Materialfluss
- Manuelle Disposition fehleranfällig

Ziele:
- Bestandsreduktion 20%
- Lieferbereitschaft >99%
- Durchlaufzeit -15%
- Null Fehlteile

2. KANBAN-DESIGN

ZWEI-KARTEN-SYSTEM:

Produktions-Kanban:
- Signal für Fertigung
- Losgröße optimiert
- Rüstzeit berücksichtigt

Transport-Kanban:
- Signal für Materialnachschub
- Von Lager zu Verbrauchsort
- Standardbehälter

BERECHNUNG KANBAN-ANZAHL:

Formel: K = (D × L × (1+S)) / C

K = Anzahl Kanbans
D = Durchschnittlicher Tagesbedarf
L = Wiederbeschaffungszeit (Tage)
S = Sicherheitsfaktor (0,2)
C = Behälterkapazität

3. PILOT-TEILE (TOP 10)

Teil-Nr | Bezeichnung | Verbrauch/Tag | WBZ | Kanbans | Invest
--------|-------------|---------------|-----|---------|-------
A-1001 | Gehäuseteil | 200 Stk | 2 Tage | 6 | 600€
A-1002 | Welle D12 | 150 Stk | 3 Tage | 8 | 800€
A-1003 | Lagerblock | 100 Stk | 2 Tage | 4 | 400€
B-2001 | Elektronik | 80 Stk | 5 Tage | 10 | 1000€
B-2002 | Sensor X1 | 120 Stk | 3 Tage | 6 | 600€
C-3001 | Dichtung | 300 Stk | 1 Tag | 4 | 400€
C-3002 | Schraube M8 | 500 Stk | 1 Tag | 5 | 500€
D-4001 | Kabel 2m | 60 Stk | 4 Tage | 8 | 800€
D-4002 | Stecker | 90 Stk | 3 Tage | 6 | 600€
E-5001 | Platine | 40 Stk | 7 Tage | 12 | 1200€

Gesamt-Invest Pilot: 6.900 EUR/Pilot 2k

4. IMPLEMENTIERUNGSSCHRITTE

WOCHE 1-2: VORBEREITUNG
□ Teambildung (Lean-Manager, Produktion, Logistik)
□ Ist-Analyse Materialfluss
□ Kanban-Training Mitarbeiter
□ Behälter-Standardisierung
□ Stellplatz-Markierung

WOCHE 3-4: SETUP
□ Kanban-Boards installieren
□ Karten produzieren (wasserfest, Barcode)
□ IT-Anbindung (Scanner)
□ Supermarkt-Regale aufbauen
□ Erstbefüllung

WOCHE 5-6: PILOTSTART
□ Go-Live 3 Teile
□ Tägliches Monitoring
□ Feintuning Parameter
□ Problemlösung

WOCHE 7-8: ROLLOUT
□ Weitere 7 Teile
□ Stabilisierung
□ Mitarbeiter-Feedback
□ KPI-Messung

5. KANBAN-REGELN

GOLDENE REGELN:
1. Ohne Kanban keine Produktion
2. First-In-First-Out (FIFO)
3. Keine Überproduktion
4. Defekte sofort melden
5. Kontinuierliche Verbesserung

VERANTWORTLICHKEITEN:

Produktionsteam:
- Kanbans korrekt verwenden
- Qualität sicherstellen
- Probleme eskalieren

Logistikteam:
- Rechtzeitiger Nachschub
- Bestandskontrolle
- Kanban-Pflege

Lean-Manager:
- System-Optimierung
- Training
- Audit

6. IT-INTEGRATION

Hardware:
- 10 Scanner (3.000 EUR)
- 5 Displays (2.500 EUR)
- WLAN-Ausbau (1.500 EUR)

Software:
- SAP-Schnittstelle
- Real-Time Dashboard
- Alert-System
- Reporting-Tool

Funktionen:
✓ Automatische Nachbestellung
✓ Bestandstransparenz
✓ Durchlaufzeit-Tracking
✓ Engpass-Warnung

7. ERFOLGSMESSUNG

KPIs vorher/nachher:

Kennzahl | Ist | Ziel | Messung
---------|-----|------|--------
Bestand (EUR) | 320k | 256k | Monatlich
Reichweite (Tage) | 28 | 20 | Wöchentlich
OEE | 68% | 75% | Täglich
Fehlteile/Monat | 12 | 0 | Täglich
Durchlaufzeit | 5,2 Tage | 4,4 | Wöchentlich
Space (m²) | 450 | 360 | Einmalig

8. KOSTEN-NUTZEN

Einmalige Kosten:
- Kanban-Material: 6.900 EUR
- IT-Hardware: 7.000 EUR
- Schulung: 3.000 EUR
- Beratung: 5.000 EUR
- Gesamt: 21.900 EUR

Jährliche Einsparung:
- Bestandskosten: 15.000 EUR
- Fehlteile: 8.000 EUR
- Produktivität: 12.000 EUR
- Fläche: 3.000 EUR
- Gesamt: 38.000 EUR

ROI: 7 Monate

9. RISIKEN & MASSNAHMEN

Risiko | Maßnahme
-------|----------
Mitarbeiter-Widerstand | Change Management
Anfangsfehler | Intensiv-Betreuung
Lieferanten-Probleme | Sicherheitsbestand
System-Ausfall | Manuelles Backup

10. ERFOLGSFAKTOREN

✓ Top-Management-Support
✓ Pilotansatz (Klein starten)
✓ Intensive Schulung
✓ Transparente Kommunikation
✓ Schnelle Erfolge zeigen
✓ Kontinuierliche Optimierung`
  },

  'd07_ops_material_shortage_analysis.xlsx': {
    filename: 'd07_ops_material_shortage_analysis.xlsx',
    title: 'Materialengpass-Analyse mit Risikomatrix',
    type: 'spreadsheet',
    content: `MATERIALENGPASS-ANALYSE_
Kritikalitätsbewertung und Maßnahmenplan

EXECUTIVE DASHBOARD
Kritische Teile: 23 von 1.247 (1,8%)
Gefährdeter Umsatz: EUR 3,4 Mio/Monat
Betroffene Kunden: 12 A-Kunden
Sofortmaßnahmen: 8 eingeleitet

KRITIKALITÄTSMATRIX (Top 30)

Material | Verbrauch/Mon | Bestand | Reichw. | Lieferant | WBZ | Kritikalität | Risiko EUR
---------|---------------|---------|---------|-----------|-----|--------------|------------
CPU-Board Z80 | 450 | 120 | 8 Tage | Single | 60 T | KRITISCH | 450.000
Spezialstahl X | 12t | 2,1t | 5 Tage | Dual | 45 T | KRITISCH | 380.000
Sensor PT100 | 1.200 | 450 | 11 Tage | Single | 30 T | HOCH | 240.000
Alu-Profil | 800m | 480m | 18 Tage | Multi | 20 T | MITTEL | 160.000
Lager 6205 | 2.400 | 1.800 | 23 Tage | Multi | 14 T | NIEDRIG | 48.000
Elektronik-Bauteil | 3.000 | 800 | 8 Tage | Single | 40 T | KRITISCH | 180.000
Kunststoff PA6 | 5t | 1,5t | 9 Tage | Dual | 25 T | HOCH | 200.000
Kabel H07 | 2.000m | 1.500m | 23 Tage | Multi | 10 T | NIEDRIG | 20.000
Platine PCB-4L | 600 | 150 | 7,5 Tage | Single | 35 T | KRITISCH | 360.000
Hydraulikventil | 80 | 45 | 17 Tage | Dual | 20 T | MITTEL | 120.000

URSACHENANALYSE ENGPÄSSE

Ursache | Häufigkeit | Anteil | Maßnahme
--------|------------|--------|----------
Force Majeure Lieferant | 8 | 35% | Dual Sourcing
Zahlungsstopp | 5 | 22% | Payment Terms
Qualitätsprobleme | 4 | 17% | Lieferanten-Entw.
Forecast-Fehler | 3 | 13% | Prognose-Tool
Transport/Zoll | 2 | 9% | Alternativrouten
Sonstige | 1 | 4% | Einzelfallösung

LIEFERANTEN-RISIKOBEWERTUNG

Lieferant | Umsatz | Teile | Payment | Qualität | Liefer. | Gesamt-Score | Status
----------|--------|-------|---------|----------|---------|--------------|--------
TechSupply AG | 2,4M | 45 | OK | 98% | 92% | 85 | Strategisch
GlobalParts | 1,8M | 127 | 30T | 95% | 88% | 72 | Kritisch
Mueller GmbH | 1,2M | 23 | OK | 99% | 96% | 91 | Preferred
AsiaSource | 900k | 89 | 45T | 92% | 85% | 68 | Review
LocalMetals | 600k | 12 | OK | 97% | 94% | 88 | Stabil

MASSNAHMENPLAN KURZ/MITTEL/LANG

KURZFRISTIG (1-4 Wochen):
Maßnahme | Teile | Kosten | Effekt | Verantw. | Status
---------|-------|--------|--------|----------|--------
Expressfracht | 5 | 12k | 2 Wochen gewonnen | Einkauf | Läuft
Teillieferungen | 8 | 0 | Prod. aufrecht | Logistik | OK
Alternativteile | 3 | 5k | Freigabe läuft | Technik | Test
Lagerumverteilung | 12 | 2k | 1 Woche Puffer | Werke | Done
Priorisierung | Alle | 0 | A-Kunden first | Vertrieb | Aktiv

MITTELFRISTIG (1-3 Monate):
Maßnahme | Teile | Kosten | Effekt | Verantw. | Status
---------|-------|--------|--------|----------|--------
Zweitlieferanten | 10 | 20k | Risiko -50% | Einkauf | Suche
Rahmenverträge | 15 | 0 | Sicherheit | Einkauf | Verhandl.
Sicherheitslager | 8 | 45k | +2 Wochen | CFO | Prüfung
VMI-Vereinbarung | 5 | 10k | Verfügbarkeit | Logistik | Konzept
Forecast-Tool | Alle | 30k | Genauigkeit +20% | IT | Auswahl

LANGFRISTIG (>3 Monate):
Maßnahme | Teile | Kosten | Effekt | Verantw. | Status
---------|-------|--------|--------|----------|--------
Redesign | 20 | 100k | Multi-Source | Entw. | Planung
Insourcing | 5 | 200k | Unabhängigkeit | Prod. | Business Case
Lokalisierung | 30 | 50k | Kurze Wege | Einkauf | Strategie
Standardisierung | 100 | 80k | Komplexität -30% | Technik | Roadmap

ABC-XYZ-ANALYSE

Kategorie | Anzahl Teile | Wert-Anteil | Verbrauchs-Schwankung | Strategie
----------|--------------|-------------|----------------------|----------
AX | 45 | 42% | Gering | JIT, Rahmenvertrag
AY | 23 | 18% | Mittel | Sicherheitslager
AZ | 12 | 8% | Hoch | Hoher Bestand
BX | 134 | 20% | Gering | Kanban
BY | 89 | 8% | Mittel | Standard-Lager
BZ | 45 | 3% | Hoch | Einzelbeschaffung
CX | 456 | 1% | Gering | Sammelbestellung
CY | 234 | 0,5% | Mittel | Konsignation
CZ | 209 | 0,5% | Hoch | Bei Bedarf

SIMULATION WORST-CASE

Szenario | Wahrscheinl. | Impact | Dauer | Umsatzverlust | Gegenmaßnahme
---------|--------------|--------|-------|---------------|---------------
Hauptlieferant Ausfall | 15% | Hoch | 4 Wo | 2,4M | Dual Source NOW
China-Lockdown | 20% | Mittel | 6 Wo | 1,8M | Lageraufbau
Transportkollaps | 10% | Mittel | 2 Wo | 800k | Luftfracht ready
Qualitätsproblem | 25% | Niedrig | 1 Wo | 400k | 100% Prüfung
Energieausfall Liefer. | 5% | Hoch | 3 Wo | 1,5M | Alternative

EARLY WARNING INDICATORS

KPI | Schwellenwert | Aktuell | Trend | Status | Aktion
----|---------------|---------|-------|--------|-------
Lieferanten-OTD | <90% | 87% | ↓ | ROT | Eskalation
Reichweite A-Teile | <14 Tage | 11 Tage | ↓ | GELB | Nachorder
Überfällige POs | >5% | 8% | ↗ | ROT | Daily Call
Qualitäts-PPM Input | >200 | 234 | ↗ | ROT | Audit
Forecast Accuracy | <80% | 76% | → | GELB | Training`
  },

  'd07_ops_penalty_risk_assessment.pdf': {
    filename: 'd07_ops_penalty_risk_assessment.pdf',
    title: 'Pönale-Risikobewertung und Vermeidungsstrategien',
    type: 'document',
    content: `PÖNALE-RISIKOBEWERTUNG_
Vertragsstrafen-Management und Prävention

1. GESAMTRISIKO-ÜBERSICHT

Aktuelle Verträge mit Pönalen: 23
Maximales Risiko: EUR 680.000/Jahr
Realistisches Risiko: EUR 180.000/Jahr
Risiko T+7: EUR 10.000

Haupttrigger:
- Lieferverzug: 60%
- Qualitätsmängel: 25%  
- Mengenverfehlung: 15%

2. TOP-10 RISIKOKONTRAKTE

Kunde | Vertragsvolumen | Pönale-Klausel | Max. Risiko/Jahr | Wahrscheinl.
------|-----------------|-----------------|------------------|-------------
Alpha Automotive | 680k | 0,5%/Tag, max 10% | 68k | Mittel
Beta Systems | 540k | 100€/h Stillstand | 48k | Niedrig
Gamma Tech | 490k | 1000€/Verzugstag | 36k | Hoch
Delta Manufact. | 420k | 0,2%/Tag, max 5% | 21k | Niedrig
Epsilon Logist. | 380k | Pauschal 5k/Fall | 20k | Mittel

3. PÖNALE-ARTEN UND REGELUNGEN

LIEFERVERZUG:
Standard: 0,3% vom Auftragswert/Tag
Maximum: 5-10% vom Gesamtwert
Kulanzgrenze: 3 Tage meist pönalefrei

QUALITÄT:
PPM >100: 0,5% Abzug
PPM >500: 2% Abzug
Feldausfall: Vollkosten + Handling

MENGE:
<90% Abruf: 10% Preisaufschlag
<80% Abruf: 20% Aufschlag
>110% Abruf: Annahmeverweigerung

SERVICE-LEVEL:
OTD <95%: Bonus entfällt
OTD <90%: 1% Malus
OTD <85%: Lieferantenwechsel

4. PRÄVENTIONSSTRATEGIEN

ORGANISATORISCH:

Frühwarnsystem:
- Tägliches Verzugs-Monitoring
- Ampelsystem in ERP
- Eskalation ab Tag -2
- Kundeninfo bei Risiko

Pufferkapazitäten:
- Sicherheitsbestand 5%
- Springer-Pool 3 MA
- Wochenendbereitschaft
- Externe Kapazität

Priorisierung:
- A-Kunden first
- Pönale-Verträge vor Standard
- Kritische Teile bevorzugt
- Transparente Regeln

VERTRAGLICH:

Neuverhandlung:
□ Force-Majeure erweitern
□ Karenzzeiten einführen
□ Caps definieren
□ Gegenseitigkeit fordern

Umgehungsstrategien:
□ Teillieferungen vereinbaren
□ Alternativprodukte anbieten
□ Qualitätsvereinbarungen
□ Win-Win-Klauseln

TECHNISCH:

Qualitätssicherung:
- 100%-Prüfung bei Risiko
- Prozess-FMEA Update
- Poka-Yoke verstärken
- Lieferantenaudits

Kapazität:
- OEE-Steigerung
- Engpassbeseitigung
- Flexible Arbeitszeiten
- Automation prüfen

5. MASSNAHMENPLAN

SOFORT (Diese Woche):
Aktion | Owner | Termin | Status
-------|-------|--------|--------
Risiko-Review alle Verträge | Legal | Tag 8 | Gestartet
Gespräch Top-3 Risiken | CEO | Tag 9 | Geplant
Notfallplan aktivieren | COO | Tag 7 | Aktiv
Präventiv-Info an Kunden | Vertrieb | Tag 8 | Vorbereitet

KURZFRISTIG (Monat):
Aktion | Owner | Termin | Status
-------|-------|--------|--------
Vertragsanpassungen | Legal | Tag 30 | Konzept
Prozessoptimierung | COO | Tag 20 | Läuft
Bestandserhöhung | CFO | Tag 15 | Prüfung
Schulung Mitarbeiter | HR | Tag 25 | Geplant

MITTELFRISTIG (Quartal):
Aktion | Owner | Termin | Status
-------|-------|--------|--------
IT-System Upgrade | CIO | Q2 | Business Case
Rahmenverträge neu | Einkauf | Q2 | Strategie
QM-System ISO | Qualität | Q2 | Vorbereitung
Kapazitätserweiterung | COO | Q3 | Planung

6. KOMMUNIKATIONSSTRATEGIE

Bei drohendem Verzug:
1. Sofort (Tag -3): Vorwarnung
2. Tag -1: Optionen anbieten
3. Tag 0: Maßnahmen mitteilen
4. Täglich: Status-Update
5. Nach Lösung: Ursachenanalyse

Gesprächsführung:
DO:
✓ Proaktiv informieren
✓ Lösungen anbieten
✓ Dokumentieren
✓ Eskalationspfad nutzen

DON'T:
✗ Verschweigen
✗ Schuldzuweisung
✗ Unrealistische Zusagen
✗ Ohne Autorisierung

7. FALLBEISPIELE & LEARNINGS

Fall 1: Alpha Automotive (Q1/2024)
Problem: 5 Tage Verzug
Pönale: 17.000 EUR
Learning: Frühwarnung fehlte
Maßnahme: Ampelsystem eingeführt

Fall 2: Beta Systems (Q4/2023)
Problem: Qualität 200 PPM
Pönale: 5.400 EUR
Learning: Eingangskontrolle mangelhaft
Maßnahme: Lieferantenaudit

8. VERSICHERUNG/ABSICHERUNG

Optionen geprüft:
□ Vertragserfüllungsversicherung
□ D&O-Erweiterung
□ Rückstellungen bilden
□ Bankgarantien

Empfehlung:
- Rückstellung: 2% vom Umsatz
- Quartalsmäßige Anpassung
- Transparenz gegenüber Bank

9. REPORTING

Monatsbericht enthält:
- Angefallene Pönalen
- Vermiedene Pönalen
- Risikovorschau 3 Monate
- Maßnahmenstatus
- Trend-Analyse

KPIs:
- Pönalequote: 0,08% vom Umsatz
- Vermeidungsrate: 78%
- Durchschnittshöhe: 1.470 EUR
- Bearbeitungszeit: 4,2 Tage

10. NOTFALL-CHECKLISTE

Bei Pönale-Androhung:
□ Vertrag prüfen
□ Sachverhalt dokumentieren
□ Legal einbeziehen
□ Kulanz verhandeln
□ Alternativlösung anbieten
□ Eskalation wenn >10k
□ Kommunikation abstimmen
□ Lessons Learned`
  },

  'd07_ops_contract_renegotiation_memo.docx': {
    filename: 'd07_ops_contract_renegotiation_memo.docx',
    title: 'Memo: Vertragsanpassung Lieferbedingungen',
    type: 'document',
    content: `INTERNES MEMO

An: Geschäftsführung, Vertrieb, Legal
Von: OPS / COO
Datum: Tag 7
Betreff: Dringende Vertragsanpassungen - Lieferbedingungen

EXECUTIVE SUMMARY

Angesichts der aktuellen Liefersituation empfehle ich dringende Neuverhandlungen kritischer Kundenverträge. Ziel: Pönale-Risiko reduzieren, Flexibilität erhöhen, Win-Win-Situationen schaffen.

1. AUSGANGSLAGE

Problematische Vertragsklauseln:
- 23 Verträge mit harten Pönalen (0,5-1% täglich)
- Keine Force-Majeure-Erweiterung (Pandemie, Cyber)
- Unrealistische Service-Level (99% OTD)
- Einseitige Risikoverteilung

Aktuelle Performance:
- OTD Ist: 91% (Ziel: >95%)
- Qualität: 147 PPM (Ziel: <100)
- Kapazitätsauslastung: 87%
- Lieferantenperformance: 83%

2. VERHANDLUNGSZIELE

MUST-HAVE:
□ Karenzzeit 3 Tage bei Verzug
□ Force-Majeure-Erweiterung
□ Pönale-Cap bei 5% Auftragswert
□ Gegenseitigkeit bei Abnahmeverpflichtung

NICE-TO-HAVE:
□ Preisgleitklausel (Energie/Material)
□ Flexiblere Abrufmengen (+/- 20%)
□ Längere Reaktionszeiten
□ Bonus-Malus-System statt nur Pönale

3. PRIORISIERUNG KUNDEN

Prio 1 - Sofortverhandlung:
- Alpha Automotive (Pönale-Risiko: 68k)
- Gamma Tech (bereits kritisch)
- Kunde mit Neuausschreibung

Prio 2 - Binnen 30 Tage:
- Beta Systems
- Delta Manufacturing
- 5 weitere A-Kunden

Prio 3 - Regulärer Rhythmus:
- Restliche Kunden
- Bei Vertragsverlängerung

4. VERHANDLUNGSSTRATEGIE

ARGUMENTATION:

Transparenz-Ansatz:
"Die aktuellen Marktbedingungen erfordern eine faire Anpassung der Risikoteilung. Wir möchten langfristig Ihr zuverlässiger Partner bleiben."

Leistungs-Ansatz:
"Trotz schwieriger Umstände haben wir 91% OTD erreicht. Mit angepassten Bedingungen können wir 95% garantieren."

Win-Win-Ansatz:
"Flexible Vereinbarungen sichern Ihre Versorgung und unsere Leistungsfähigkeit. Davon profitieren beide Seiten."

KONZESSIONEN (Verhandlungsmasse):

Wir bieten:
- Erweiterte Lagerreichweite (+1 Woche)
- Dedizierter Ansprechpartner
- Quartalsreview vor Ort
- Preisgarantie 12 Monate
- Bevorzugte Belieferung

Wir fordern:
- Realistische Service-Level
- Force-Majeure-Anpassung
- Pönale-Deckelung
- Zahlungsziel-Verkürzung
- Mindestabnahme 80%

5. ALTERNATIVKONZEPTE

Plan A: Einvernehmliche Anpassung
→ Zusatzvereinbarung
→ Win-Win-Elemente
→ Sofort wirksam

Plan B: Paket-Deal
→ Klauselverlängerung gegen Anpassung (5k Pönale)
→ Rabatt gegen Flexibilität
→ Mittelfristig

Plan C: Service-Level-Differenzierung
→ Premium-Service mit Garantien (Aufpreis)
→ Standard-Service mit Flexibilität
→ Wahlmöglichkeit Kunde

6. RECHTLICHE ASPEKTE

Prüfung durch Legal erforderlich:
- AGB-Änderung möglich?
- Schriftformerfordernis
- Kündigungsrechte
- Übergangsregelungen

Risiken:
- Kunde besteht auf Alt-Vertrag
- Imageschaden bei Ablehnung
- Präzedenzwirkung

7. KOMMUNIKATIONSPLAN

Intern:
- Vertrieb/GF-Abstimmung: Tag 8
- Argumentationstraining: Tag 9
- Freigabe Legal: Tag 10

Extern:
- CEO-Call bei Top-3: Tag 11
- Verhandlungstermine: ab Tag 12
- Nachfassen: Tag 20

Botschaften:
- Partnerschaftlich
- Zukunftsorientiert
- Fair und transparent
- Gemeinsame Lösung

8. ERFOLGSMESSUNG

KPIs:
- Anpassungsquote: Ziel >60%
- Pönale-Reduktion: Ziel -50%
- Kundenzufriedenheit: Halten
- Vertragslaufzeit: +6 Monate Ø

Timeline:
- Woche 1: Top-3 Gespräche
- Woche 2-3: A-Kunden
- Woche 4: Review und Anpassung
- Monat 2: Rollout B-Kunden

9. RISIKOBEWERTUNG

Risiko | Wahrscheinl. | Impact | Maßnahme
-------|--------------|--------|----------
Kunde lehnt ab | Mittel | Hoch | Alternativen bieten
Präzedenzfall | Hoch | Mittel | Einzelfallargumentation
Vertrauensverlust | Niedrig | Hoch | Transparenz
Wettbewerb nutzt | Mittel | Mittel | USPs betonen

10. ENTSCHEIDUNGSBEDARF

Von der Geschäftsführung wird entschieden:

□ Freigabe Verhandlungsstrategie
□ Mandat für Vertrieb/Legal
□ Konzessionsrahmen
□ Eskalationsprozess
□ Kommunikationslinie

EMPFEHLUNG:
Sofortiger Start mit Top-3 Kunden. Pragmatischer Ansatz mit Fokus auf schnelle Erfolge. Bei Widerstand Eskalation auf GF-Ebene.

ANLAGEN:
- Vertragsliste mit Pönale-Klauseln
- Benchmark Marktstandard
- Argumentationsleitfaden
- Muster-Zusatzvereinbarung

gez. COO`
  },

  'd07_ops_ppap_checklist.pdf': {
    filename: 'd07_ops_ppap_checklist.pdf',
    title: 'PPAP-Checkliste für Zweitlieferant',
    type: 'document',
    content: `PPAP CHECKLISTE_
Production Part Approval Process - Level 3
Zweitlieferant Qualifikation

ALLGEMEINE INFORMATIONEN
Lieferant: [New Supplier Name]
Teilenummer: Multiple (siehe Anlage)
PPAP-Level: 3 (Standard)
Erstmustertermin: Tag 17
Freigabeziel: Tag 24

1. ERFORDERLICHE DOKUMENTE (Level 3)

Dokument | Eingegangen | Geprüft | Freigabe | Anmerkung
---------|-------------|---------|----------|----------
1. Design Records (Zeichnung) | ☐ | ☐ | ☐ |
2. Engineering Change Docs | ☐ | ☐ | ☐ | Falls zutreffend
3. Kundenfreigabe | ☐ | ☐ | ☐ |
4. DFMEA | ☐ | ☐ | ☐ |
5. Prozessflussdiagramm | ☐ | ☐ | ☐ |
6. PFMEA | ☐ | ☐ | ☐ | RPN <80
7. Kontrollplan | ☐ | ☐ | ☐ |
8. Messsystemanalyse (MSA) | ☐ | ☐ | ☐ | GR&R <10%
9. Dimensionsergebnisse | ☐ | ☐ | ☐ | 100% Merkmale
10. Material-/Leistungstests | ☐ | ☐ | ☐ |
11. Erstmusterprüfbericht | ☐ | ☐ | ☐ | 5 Teile min.
12. Prozessfähigkeit (CPK) | ☐ | ☐ | ☐ | CPK >1,33
13. Qualified Laboratory | ☐ | ☐ | ☐ | ISO 17025
14. Appearance Approval | ☐ | ☐ | ☐ | Falls relevant
15. Musterteile | ☐ | ☐ | ☐ | 10 Stück
16. Master Sample | ☐ | ☐ | ☐ | Archivierung
17. Prüfmittel | ☐ | ☐ | ☐ | Kalibriert
18. Kundenspezifisch | ☐ | ☐ | ☐ |

2. DIMENSIONSPRÜFUNG

Kritische Merkmale (100% prüfen):
Merkmal | Soll | Tol. | Ist (Min/Max/Ø) | CPK | Status
--------|------|------|------------------|-----|--------
Durchmesser A | 12,0 | ±0,02 | | | ☐
Länge B | 145,0 | ±0,1 | | | ☐
Winkel C | 90° | ±0,5° | | | ☐
Rauheit D | Ra 1,6 | max | | | ☐
Position E | 0 | ±0,05 | | | ☐

3. MATERIALTESTS

Test | Spezifikation | Ergebnis | Labor | Status
-----|---------------|----------|-------|--------
Zugfestigkeit | >450 N/mm² | | | ☐
Härte | 58-62 HRC | | | ☐
Chemische Analyse | Per Spec | | | ☐
Oberflächenschutz | 480h Salztest | | | ☐
Maßhaltigkeit | Nach 72h | | | ☐

4. PROZESSFÄHIGKEIT

Run @ Rate Test:
- Stückzahl: 300 minimum
- Produktionsgeschwindigkeit: 100%
- Schichten: Alle
- Maschinen: Alle geplanten
- Bediener: Normal-Besetzung

Ergebnisse:
- Output/Stunde: ___
- Ausschussrate: ___%
- Nacharbeit: ___%
- CPK gesamt: ___
- Engpass identifiziert: ☐

5. VERPACKUNG & LOGISTIK

Aspekt | Spezifikation | Validiert | Anmerkung
-------|---------------|-----------|----------
Verpackungsart | Gitterbox | ☐ |
Stück/Verpackung | 240 | ☐ |
Kennzeichnung | DMX-Label | ☐ |
Transportsicherung | Schaum | ☐ |
Stapelbarkeit | 3-fach | ☐ |
Lieferfrequenz | Wöchentlich | ☐ |

6. RISIKOBEWERTUNG

Risiko | Bewertung | Maßnahme | Verantw.
-------|-----------|----------|----------
Kapazität | Mittel | Zweischicht ready | Produktion
Qualifikation MA | Hoch | Schulung vor Start | Lieferant
Werkzeuge | Niedrig | Redundanz vorhanden | Lieferant
Transport | Mittel | 2 Spediteure | Logistik
Rohmaterial | Niedrig | 3 Sub-Lieferanten | Einkauf

7. AUDIT ZWEITLIEFERANT

Bereich | Punkte (max) | Erreicht | %
--------|-------------|----------|----
QM-System | 25 | | 
Produktion | 25 | |
Messtechnik | 20 | |
Lager/Logistik | 15 | |
Personal | 15 | |
GESAMT | 100 | | 
Mindestanforderung: 80 Punkte

8. FREIGABEPROZESS

Stufe | Verantwortlich | Datum | Unterschrift
------|----------------|-------|-------------
Technische Prüfung | Entwicklung | |
Qualitätsprüfung | QS | |
Produktionsfreigabe | Produktion | |
Kaufmännisch | Einkauf | |
Kundenfreigabe | Vertrieb | |
Final Release | COO | |

9. BEDINGUNGEN & AUFLAGEN

☐ Erstlieferung mit 100% Prüfung
☐ Wöchentliche Audits erste 4 Wochen
☐ Eskalationsprozess definiert
☐ 8D-Vereinbarung unterschrieben
☐ Poka-Yoke für kritische Merkmale
☐ Rückverfolgbarkeit sichergestellt

10. AKTIONSPLAN BEI ABWEICHUNGEN

Abweichung gefunden: ☐ Ja ☐ Nein

Wenn ja:
Beschreibung: _____________
Sofortmaßnahme: __________
Ursachenanalyse bis: ______
Korrekturmaßnahme: _______
Wirksamkeitsprüfung: ______

FREIGABEENTSCHEIDUNG:
☐ Vollfreigabe
☐ Bedingte Freigabe (siehe Auflagen)
☐ Ablehnung (Nacharbeit erforderlich)

Datum: _______
Unterschrift QS-Leitung: _______
Unterschrift COO: _______`
  },

  'd07_ops_supplier_qualification_process.pdf': {
    filename: 'd07_ops_supplier_qualification_process.pdf',
    title: 'Lieferanten-Qualifizierungsprozess',
    type: 'document',
    content: `LIEFERANTEN-QUALIFIZIERUNGSPROZESS_
Standard Operating Procedure (SOP)
Version 2.1 | Gültig ab: Tag 7

1. ZWECK UND GELTUNGSBEREICH

Diese SOP regelt die Qualifizierung neuer Lieferanten sowie die Requalifizierung bestehender Lieferanten. Ziel ist die Sicherstellung einer robusten Lieferkette.

Gilt für:
- Alle Produktionsmaterial-Lieferanten
- Kritische Dienstleister
- Lohnfertiger

2. VERANTWORTLICHKEITEN

Rolle | Verantwortung
------|---------------
Einkauf | Initiierung, kaufmännische Bewertung
Qualität | Technische Bewertung, Audit
Entwicklung | Spezifikation, technische Freigabe
Produktion | Prozessvalidierung
Supply Chain | Logistik-Assessment
CFO | Finanzielle Bewertung >100k

3. QUALIFIZIERUNGSPROZESS

PHASE 1: VORAUSWAHL (5 Tage)

Dokumente anfordern:
□ Firmenprofil
□ Zertifikate (ISO 9001 minimum)
□ Referenzkundenliste
□ Finanzauskunft (Creditreform)
□ Eigenerklärung Compliance
□ Versicherungsnachweise

Bewertung:
- Scoring-Matrix anwenden
- Mindestpunktzahl: 60/100
- K.O.-Kriterien prüfen

PHASE 2: BEWERTUNG (10 Tage)

Selbstauskunft:
- Online-Fragebogen (156 Fragen)
- Kategorien: QM, Technik, Logistik, Nachhaltigkeit
- Nachweise hochladen

Desktop-Review:
- Dokumentenprüfung
- Referenzen kontaktieren
- Finanz-Check
- Sanktionslisten-Screening

Risikobewertung:
□ Single Source Risiko
□ Geografisches Risiko
□ Finanzrisiko
□ Qualitätsrisiko
□ Kapazitätsrisiko

PHASE 3: AUDIT (2 Tage vor Ort)

Audit-Agenda Tag 1:
09:00 - Opening Meeting
10:00 - Management Review
11:00 - QM-System
13:00 - Produktion Rundgang
14:00 - Prozessbeobachtung
15:00 - Messtechnik/Labor
16:00 - Tagesreview

Audit-Agenda Tag 2:
09:00 - Lager/Logistik
10:00 - Lieferantenmanagement
11:00 - Personal/Training
13:00 - Korrekturmaßnahmen
14:00 - Verbesserungsprozess
15:00 - Closing Meeting
16:00 - Bericht-Draft

Audit-Checkliste:
- VDA 6.3 Prozessaudit
- Kundenspezifische Anforderungen
- Nachhaltigkeit/CSR
- IT-Security Basics

PHASE 4: MUSTERQUALIFIKATION (15 Tage)

Erstmuster:
- Anzahl: 10-50 Stück
- Prüfumfang: 100% kritische Merkmale
- Prüfbericht erforderlich
- Freigabe durch Entwicklung

Testproduktion:
- Kleinserie 100-500 Stück
- Prozessfähigkeit nachweisen
- CPK >1,33 für kritische Merkmale
- Run@Rate Test

PPAP-Prozess:
- Level 3 Standard
- 18 Dokumente
- Kundenfreigabe einholen
- PSW unterzeichnen

PHASE 5: VERTRAGSVERHANDLUNG (10 Tage)

Vertragsinhalte:
□ Rahmenvertrag
□ Qualitätssicherungsvereinbarung
□ Logistikvereinbarung
□ NDA
□ Code of Conduct
□ Preis-/Konditionenvereinbarung

Besondere Klauseln:
- Dual-Source-Verpflichtung
- Audit-Rechte
- Ersatzteilversorgung 10 Jahre
- Preisgleitklauseln
- Force Majeure erweitert

PHASE 6: RAMP-UP (30 Tage)

Hochlaufplan:
Woche 1: 25% Kapazität
Woche 2: 50% Kapazität
Woche 3: 75% Kapazität
Woche 4: 100% Kapazität

Begleitung:
- Wöchentliche Reviews
- Tägliche Qualitätsdaten
- Sofort-Eskalation bei Problemen
- Lessons Learned Workshop

4. KLASSIFIZIERUNG

Lieferanten-Kategorien:

A-Lieferant (Preferred):
- Score >85 Punkte
- Strategische Partnerschaft
- Entwicklungspartner
- Innovations-Pipeline

B-Lieferant (Qualified):
- Score 70-85 Punkte  
- Standardgeschäft
- Definierte Volumina
- Regelmäßige Reviews

C-Lieferant (Conditional):
- Score 60-70 Punkte
- Eingeschränkte Freigabe
- Entwicklungsprogramm
- Engmaschige Überwachung

5. DOKUMENTATION

Qualifizierungsakte enthält:
- Ausgefüllte Checklisten
- Audit-Berichte
- Musterdokumentation
- Verträge
- Freigabeprotokolle
- Risikoanalyse
- Maßnahmenpläne

Ablage:
- SharePoint: /Einkauf/Lieferanten/
- Aufbewahrung: 10 Jahre
- Zugriff: Einkauf, QM, GF

6. REQUALIFIZIERUNG

Trigger:
- Alle 3 Jahre regulär
- Bei Qualitätsproblemen
- Bei Prozessänderungen
- Bei Standortwechsel
- Nach M&A

Umfang:
- Reduziertes Audit (1 Tag)
- Dokumenten-Update
- Neue Risikobewertung
- Ggf. neue Muster

7. DISQUALIFIZIERUNG

Gründe:
- Score <60 Punkte
- Wiederholte Qualitätsprobleme
- Compliance-Verstöße
- Insolvenz/Zahlungsausfall
- Strategische Entscheidung

Prozess:
1. Warnung mit Fristsetzung
2. Verbesserungsplan
3. Review nach Frist
4. Entscheidung GF
5. Phase-Out Plan
6. Alternativ-Lieferant

8. KPIs

Kennzahl | Ziel | Ist | Trend
---------|------|-----|-------
Qualifizierungsdauer | <45 Tage | 52 | ↘
Erstauditquote | >80% | 76% | →
Lieferanten A-Level | >30% | 28% | ↗
Requalifizierung aktuell | 100% | 89% | ↘
Disqualifizierungen | <2/Jahr | 3 | ↗

9. TOOLS & TEMPLATES

Verfügbar im QM-System:
- Scoring-Matrix.xlsx
- Audit-Checkliste.pdf
- Fragebogen-Selbstauskunft.docx
- Vertragsmuster.docx
- Freigabeprotokoll.pdf
- Risikoanalyse-Tool.xlsx

10. REVISION

Dokumenten-Historie:
Version | Datum | Änderung | Autor
--------|-------|----------|-------
2.1 | Tag 7 | Ramp-Up Phase ergänzt | QM
2.0 | 2024-01 | Komplett-Überarbeitung | Einkauf
1.0 | 2022-06 | Erstversion | QM

Nächste Review: Tag 180
Freigabe: COO, CFO, QM-Leitung`
  }
};