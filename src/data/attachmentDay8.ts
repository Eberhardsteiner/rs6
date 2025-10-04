// src/data/attachmentDay8.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day8Attachments: Record<string, AttachmentContent> = {
  // CEO ATTACHMENTS
  'd08_ceo_fuehrungskreis_workshop.pdf': {
    filename: 'd08_ceo_fuehrungskreis_workshop.pdf',
    title: 'Workshop-Agenda: Führungskreis-Alignment Teilverkauf',
    type: 'document',
    content: `WORKSHOP-AGENDA
Führungskreis-Alignment: Teilverkauf-Strategie
Datum: Tag 8, 14:00-17:00 Uhr
Teilnehmer: Geschäftsleitung, Bereichsleiter

ZIELSETZUNG
• Einheitliches Verständnis der M&A-Optionen
• Klärung von Fachbegriffen und Prozessen
• Abgestimmte Kommunikationsstrategie
• Identifikation kritischer Erfolgsfaktoren

1. BEGRÜSSUNG & KONTEXT (15 Min.)
   
   Status Quo:
   - 3 Investoren in fortgeschrittenen Gesprächen
   - Bank erwartet klare Strategie
   - Mitarbeiter verunsichert durch Gerüchte
   - Zeitfenster: 6-8 Wochen bis Signing

2. M&A-GLOSSAR - BEGRIFFE VERSTEHEN (30 Min.)

   Share Deal vs. Asset Deal:
   • Share Deal = Verkauf von Unternehmensanteilen
     → Käufer übernimmt alles (Aktiva & Passiva)
   • Asset Deal = Verkauf einzelner Vermögenswerte
     → Käufer wählt aus, was er kauft

   SPA (Share Purchase Agreement):
   = Kaufvertrag bei Unternehmensverkäufen
   - Regelt: Kaufpreis, Garantien, Bedingungen
   - Typisch: 50-100 Seiten
   - Verhandlungsdauer: 4-8 Wochen

   Due Diligence (DD):
   = Sorgfältige Prüfung vor dem Kauf
   - Financial DD: Zahlen, Bilanzen
   - Legal DD: Verträge, Risiken
   - Technical DD: Produktion, IT
   - Dauer: 3-6 Wochen

   Escrow Account (Treuhandkonto):
   = Sicherheitskonto für Garantieansprüche
   - Teil des Kaufpreises wird einbehalten
   - Typisch: 10-20% für 12-24 Monate
   - Absicherung gegen nachträgliche Ansprüche

   MAC-Klausel (Material Adverse Change):
   = Wesentliche nachteilige Veränderung
   - Käufer kann zurücktreten bei schweren Problemen
   - Beispiele: Kundenverlust >20%, Umsatzeinbruch
   - Sehr umstritten in Verhandlungen

   W&I-Versicherung (Warranty & Indemnity):
   = Garantieversicherung
   - Versichert Verkäufergarantien
   - Kosten: 1-2% des Kaufpreises
   - Vorteil: Verkäufer schneller aus Haftung

3. STRATEGISCHE OPTIONEN (45 Min.)

   Option A: Minority Sale 25%
   Pro:
   + Kontrolle bleibt bei uns
   + Schneller Kapitalzufluss
   + Know-how-Transfer möglich
   Contra:
   - Gesellschafterkonflikte möglich
   - Reporting-Pflichten
   - Exit-Strategien komplizierter

   Option B: Minority Sale 49%
   Pro:
   + Höherer Kaufpreis
   + Strategischer Partner
   + Gemeinsame Investitionen
   Contra:
   - Fast keine Kontrolle mehr
   - Viele Zustimmungspflichten
   - Faktischer Kontrollverlust

   Option C: Asset Deal (Teilbereich)
   Pro:
   + Keine Gesellschafteranteile
   + Cherry-Picking möglich
   + Steuervorteile möglich
   Contra:
   - Komplexe Abgrenzung
   - Mitarbeiterübergang (§613a BGB)
   - Kundenunsicherheit

4. KRITISCHE ERFOLGSFAKTOREN (30 Min.)

   Intern:
   □ Führungsteam-Alignment ✓
   □ Datenraum-Vorbereitung
   □ Red-Flag-Issues identifizieren
   □ Mitarbeiterkommunikation

   Extern:
   □ Bankzustimmung sichern
   □ Kundenkommunikation vorbereiten
   □ Investoren-Erwartungen managen
   □ Presse-Strategie

5. KOMMUNIKATIONSFAHRPLAN (30 Min.)

   Woche 1 (Tag 8-14):
   - Internes Alignment ✓
   - Bank-Update
   - Erste Investoren-Calls

   Woche 2-3:
   - Datenraum öffnen
   - Management-Präsentationen
   - Site Visits

   Woche 4-6:
   - Due Diligence
   - Vertragsverhandlungen
   - Finale Struktur

6. ROLLENVERTEILUNG (20 Min.)

   CEO: Gesamtverantwortung, Investorenkontakt
   CFO: Zahlen, Datenraum, Bank
   COO: Operations-DD, Integration
   HR/Legal: Verträge, Mitarbeiter, Compliance

7. Q&A UND DISKUSSION (25 Min.)

   Kritische Fragen:
   - Was passiert mit Arbeitsplätzen?
   - Wie verhindern wir Info-Leaks?
   - Wer entscheidet final?
   - Plan B wenn kein Deal?
   - Beratung? Berater an Bord (intern: für Vorbereitung 8k)

8. NEXT STEPS (10 Min.)

   Bis Tag 10:
   □ Investoren-Teaser finalisieren
   □ Bank-Call durchführen
   □ Mitarbeiter-Info vorbereiten
   □ Datenraum strukturieren

VERTRAULICHKEIT
Alle Informationen sind STRENG VERTRAULICH.
Keine Kommunikation ohne Freigabe der GF.

Ansprechpartner:
CEO: xxx-XXX
CFO: 0171-XXX`
  },

  'd08_ceo_ma_glossar.pdf': {
    filename: 'd08_ceo_ma_glossar.pdf',
    title: 'M&A-Glossar für Nicht-Experten',
    type: 'document',
    content: `M&A-GLOSSAR
Fachbegriffe einfach erklärt
Für: Führungskräfte und Mitarbeiter

GRUNDBEGRIFFE

M&A = Mergers & Acquisitions
Deutsch: Fusionen und Übernahmen
→ Sammelbegriff für Unternehmenskäufe/-verkäufe

Investor
= Jemand der Geld in Unternehmen investiert
Arten:
• Strategischer Investor = Unternehmen aus der Branche
• Finanzinvestor = Investmentfirma (Private Equity)
• Family Office = Vermögensverwaltung reicher Familien

Minority/Majority
• Minority = Minderheit (<50% der Anteile)
• Majority = Mehrheit (>50% der Anteile)
→ Wer die Mehrheit hat, bestimmt

VERKAUFSPROZESS

LOI = Letter of Intent
Deutsch: Absichtserklärung
→ "Wir wollen kaufen zu ungefähr diesem Preis"
→ Meist unverbindlich

DD = Due Diligence
Deutsch: Sorgfältige Prüfung
→ Käufer prüft alles ganz genau
→ Wie beim Hauskauf: Erst gucken, dann kaufen

Data Room / VDR
= Virtueller Datenraum
→ Gesicherter Online-Ordner mit allen Dokumenten
→ Käufer können reinschauen, aber nichts rausnehmen

Red Flag
Deutsch: Rote Flagge / Warnsignal
→ Probleme die beim Prüfen auffallen
→ Können den Deal gefährden oder Preis drücken

VERTRAGSTHEMEN

SPA = Share Purchase Agreement
Deutsch: Anteilskaufvertrag
→ Der eigentliche Kaufvertrag
→ Regelt alle Details des Verkaufs

Signing & Closing
• Signing = Vertragsunterschrift
• Closing = Tatsächlicher Vollzug
→ Oft zeitlicher Abstand (Behörden, Bedingungen)

Reps & Warranties
= Representations & Warranties
Deutsch: Zusicherungen und Garantien
→ Verkäufer garantiert bestimmte Dinge
→ Bei Falschaussagen: Schadensersatz

Escrow
Deutsch: Treuhandkonto
→ Teil des Kaufpreises wird zurückgehalten
→ Sicherheit für Garantieansprüche
→ Nach 1-2 Jahren Auszahlung

Purchase Price Adjustment
Deutsch: Kaufpreisanpassung
→ Endgültiger Preis wird später berechnet
→ Abhängig von Stichtags-Bilanz

SICHERHEITEN

MAC = Material Adverse Change
Deutsch: Wesentliche negative Veränderung
→ Rücktrittsrecht bei großen Problemen
→ Z.B. Hauptkunde kündigt

W&I Insurance
= Warranty & Indemnity Insurance
Deutsch: Garantieversicherung
→ Versicherung zahlt statt Verkäufer
→ Verkäufer schneller aus der Haftung

Indemnity
Deutsch: Freistellung/Schadloshaltung
→ Verkäufer muss Käufer entschädigen
→ Bei Problemen aus der Vergangenheit

BEWERTUNG

Enterprise Value (EV)
Deutsch: Unternehmenswert
→ Was ist die Firma insgesamt wert?
→ Basis für Preisverhandlungen

EBITDA Multiple
= Bewertungskennzahl
→ Unternehmenswert = X mal EBITDA
→ Typisch in unserer Branche: 4-6x

Valuation
Deutsch: Bewertung
→ Prozess der Wertermittlung
→ Verschiedene Methoden möglich

SONSTIGES

NDA = Non-Disclosure Agreement
Deutsch: Vertraulichkeitsvereinbarung
→ Pflicht zur Geheimhaltung
→ Erste Unterschrift im Prozess

Break-up Fee
Deutsch: Abbruchgebühr
→ Strafe wenn Deal platzt
→ Soll Ernsthaftigkeit sichern

Carve-out
Deutsch: Herauslösung
→ Teilbereich wird verkauft
→ Muss erst "herausgeschnitten" werden

Post-Merger Integration (PMI)
Deutsch: Integration nach dem Kauf
→ Zusammenführung der Unternehmen
→ Oft unterschätzt, sehr wichtig

IHRE FRAGEN?

Bei Unklarheiten wenden Sie sich an:
• Direkte Führungskraft
• HR-Business Partner
• CEO/CFO in Sprechstunde

Wichtig: Keine Spekulationen!
Bei Anfragen von außen: 
"Kein Kommentar, wenden Sie sich an die GF"

Stand: Tag 8
Version: 1.0`
  },

  'd08_ceo_kundenportfolio_analyse.xlsx': {
    filename: 'd08_ceo_kundenportfolio_analyse.xlsx',
    title: 'Kundenportfolio-Analyse mit DB-Optimierung',
    type: 'spreadsheet',
    content: `KUNDENPORTFOLIO-ANALYSE
Stand: Tag 8
Vertraulich - Nur für Geschäftsleitung

GESAMTÜBERSICHT (120 Mitarbeiter Basis):

Segment | Anzahl | Umsatz p.a. | DB1 | DB1 EUR | MA-Bindung
--------|--------|------------|-----|---------|------------
A-Kunden | 8 | 3,2 Mio | 42% | 1,34 Mio | 45 MA
B-Kunden | 15 | 2,8 Mio | 35% | 0,98 Mio | 35 MA  
C-Kunden | 42 | 2,0 Mio | 18% | 0,36 Mio | 25 MA
D-Kunden | 85 | 1,0 Mio | 8% | 0,08 Mio | 15 MA
Gesamt | 150 | 9,0 Mio | 31% | 2,76 Mio | 120 MA

DETAILANALYSE C-KUNDEN (Fokus):

Kunde | Umsatz | DB1% | DB1 EUR | MA | Strategische Bedeutung
------|--------|------|---------|-----|----------------------
C-01 TechParts | 95k | 22% | 21k | 1,5 | Referenzkunde
C-02 Mueller AG | 88k | 15% | 13k | 1,8 | Regional wichtig
C-03 Klein GmbH | 72k | 12% | 9k | 1,2 | Longstanding
C-04 Servo Ltd | 65k | 8% | 5k | 1,5 | Testmarkt
[... weitere 38 Kunden]

OPTIMIERUNGSSZENARIEN:

Szenario 1: C-Kunden pausieren
• Betroffene Kunden: 42
• Umsatzverlust: 2,0 Mio EUR
• DB1-Verlust: 360k EUR
• MA-Freisetzung: 25
• Kapazität für A/B: +20%
→ DB1-Verbesserung durch Fokus: +10k/Monat

Szenario 2: Preiserhöhung C-Kunden (+2%)
• Erwarteter Verlust: 8 Kunden
• Umsatzeffekt: -160k EUR  
• DB1-Verbesserung: +32k EUR p.a.
• Imagerisiko: Mittel

Szenario 3: Qualitätsreduktion C-Kunden
• Materialkostenersparnis: 18% 
• DB1-Verbesserung: +144k EUR p.a.
• Reklamationsrisiko: Hoch
• Imageschaden: Kritisch

EMPFEHLUNG VERTRIEB:

Sofortmaßnahmen:
1. Bottom-10 C-Kunden informieren (Pause)
2. Kapazitäten auf A-Kunden shiften
3. B-Kunden-Upgrade-Programm

Mittelfristig:
- Portfolio bereinigen
- Mindest-DB festlegen (>20%)
- Automatisierung für C/D

KOMMUNIKATIONSPLAN:

An C-Kunden:
"Aufgrund der aktuellen Marktsituation müssen wir unsere Produktionskapazitäten temporär auf strategische Partnerschaften konzentrieren. Wir melden uns proaktiv, sobald wieder Kapazitäten verfügbar sind."

RISIKEN:
⚠️ Marktverlust regional
⚠️ Wettbewerber nutzen Lücke
⚠️ Wiedereinstieg schwierig
⚠️ Mitarbeiter-Demotivation

CHANCEN:
✓ Fokus auf Profitabilität
✓ Bessere Ressourcennutzung
✓ Qualitätssteigerung A/B
✓ Cash-Verbesserung

KPI-TRACKING:

Woche | DB1-Soll | DB1-Ist | Delta | Maßnahme
------|----------|---------|-------|----------
KW1 | 53k | 51k | -2k | -
KW2 | 54k | 52k | -2k | Start Fokus
KW3 | 56k | 55k | -1k | C-Reduktion
KW4 | 58k | 59k | +1k | Effekt sichtbar`
  },

  'd08_ceo_db_optimierung.pdf': {
    filename: 'd08_ceo_db_optimierung.pdf',
    title: 'Deckungsbeitrags-Optimierung: Strategiepapier',
    type: 'document',
    content: `STRATEGIEPAPIER
Deckungsbeitragsoptimierung in der Restrukturierung

EXECUTIVE SUMMARY

Die aktuelle DB1-Situation erfordert radikale Fokussierung. Mit 120 Mitarbeitern können wir nicht alle 150 Kunden gleich gut bedienen. Empfehlung: Konsequente ABC-Strategie.

1. AUSGANGSLAGE

Deckungsbeitragsstruktur:
• A-Kunden (5%): 49% des DB1
• B-Kunden (10%): 36% des DB1  
• C-Kunden (28%): 13% des DB1
• D-Kunden (57%): 2% des DB1

Probleme:
- C/D-Kunden binden 33% der Kapazität
- Komplexitätskosten unterschätzt
- Rüstzeiten bei Kleinstmengen
- Verwaltungsoverhead

2. ZIELBILD

80/20-Regel konsequent:
• Top-20% Kunden = 80% Umsatz
• DB1 > 30% als Mindestanforderung
• Kapazitätsfokus auf A/B
• C/D nur noch opportunistisch

3. MASSNAHMENPLAN

Sofort (Tag 8-10):
☑ C-Kunden-Analyse
☐ Pausierungsgespräche Bottom-20
☐ Kapazitätsumschichtung
☐ Preiserhöhung kommunizieren

Kurzfristig (Tag 11-20):
☐ B→A Upgrade-Programm
☐ Mindestmengen definieren
☐ Rahmenverträge pushen
☐ Komplexitätskosten einpreisen

Mittelfristig (Tag 21+):
☐ Portfolio-Bereinigung
☐ Automatisierung C/D
☐ Plattform-Strategie
☐ Value-Pricing

4. UMSETZUNGSRISIKEN

Intern:
- Vertriebswiderstand ("Alle Kunden wichtig")
- Kapazitätsauslastung sinkt kurzfristig
- Know-how-Verlust bei Spezialthemen

Extern:
- Imageschaden regional
- Wettbewerber greifen zu
- Wiedereinstieg erschwert
- Referenzverluste

5. ERFOLGSFAKTOREN

✓ Klare Kommunikation
✓ Faire Übergangsfristen
✓ Alternative Anbieter nennen
✓ Tür offenhalten
✓ A/B-Erfolge kommunizieren

6. BUSINESS CASE

Basisszenario:
• DB1-Verbesserung: +2% Punkte
• Cashflow-Effekt: +15k/Monat
• Komplexität: -30%
• Break-even: Monat 2

Best Case:
• DB1 auf 35%
• Cash +25k/Monat
• Kapazität für Wachstum

Worst Case:
• Volumenverlust 15%
• DB1 stagniert
• Reputationsschaden

7. KOMMUNIKATION

Intern:
"Fokussierung auf Kernkunden sichert Zukunft"

Extern:
"Temporäre Kapazitätsanpassung"

Bank:
"Profitabilitätsprogramm zeigt Wirkung"

8. ENTSCHEIDUNGSVORLAGE

Empfehlung: Szenario 1
- C-Kunden Bottom-20 pausieren / Fokus ist A/B
- Preiserhöhung Top-20
- Qualität beibehalten
- DB1-Fokus kommunizieren
- DB1-Verbesserung: 10.000 EUR.

Alternativ: Szenario 2
- Moderate Preiserhöhung alle C
- Keine Pausierungen
- Risiko Abwanderung
- DB-Verbesserung: 4.000 EUR.

Nicht empfohlen: Szenario 3
- Qualitätsreduktion
- Kurzfristig profitabel
- Langfristiger Schaden
- DB-Verbesserung: 18.000 EUR.

Freigabe erforderlich durch:
☐ CEO ☐ CFO ☐ Vertriebsleitung

Datum: Tag 8`
  },

  // CFO ATTACHMENTS
  'd08_cfo_waiver_unterlagenpaket.pdf': {
    filename: 'd08_cfo_waiver_unterlagenpaket.pdf',
    title: 'Covenant-Waiver Unterlagenpaket für Bank',
    type: 'document',
    content: `COVENANT-WAIVER UNTERLAGENPAKET
Vorbereitung Bankgespräch Tag 11

INHALTSVERZEICHNIS

1. Executive Summary
2. Covenant-Berechnung & Bridge
3. Maßnahmenplan mit Meilensteinen
4. 13-Wochen-Liquiditätsplanung
5. Sensitivitätsanalyse
6. Beirats-Statement
7. Anhänge

1. EXECUTIVE SUMMARY

Sehr geehrte Damen und Herren,

wir beantragen hiermit einen temporären Waiver für Q2/Q3 2025 aufgrund einmaliger Restrukturierungseffekte.

Kernpunkte:
• Operative Trendwende eingeleitet
• Investor-Prozess läuft planmäßig
• Liquidität für 13 Wochen gesichert
• Quick Wins bereits realisiert

2. COVENANT-BERECHNUNG

EBITDA-Marge (LTM):
Ist: 6,2%
Soll: 8,0%
Gap: -1,8 PP
Ursache: 70% Einmaleffekte

Bridge zu Q3:
Heute: 6,2%
+ Kostensenkung: +1,0 PP
+ Preiserhöhung: +0,8 PP
+ Volumenerholung: +0,5 PP
Q3: 8,5% (über Covenant)

EK-Quote:
Ist: 18,4%
Soll: 20,0%
Gap: -1,6 PP
Heilung: Durch Kapitalzufluss Investor

Net Debt/EBITDA:
Ist: 3,8x
Soll: 3,5x
Gap: 0,3x
Bridge: EBITDA-Wachstum + Debt Paydown

3. MASSNAHMENPLAN

Bereits umgesetzt (✓):
✓ Kostensenkungsprogramm gestartet
✓ Kundenvertragsverlängerungen
✓ Working Capital Optimierung
✓ Investor-Prozess initiiert

In Umsetzung (→):
→ Portfolio-Bereinigung C-Kunden
→ Preiserhöhungen B-Kunden
→ Produktionsoptimierung
→ Due Diligence Vorbereitung

Geplant (□):
□ Investor-Signing (Tag 60)
□ Fresh Money Closing
□ Digitalisierungsprojekte
□ Internationalisierung

Meilenstein-Tracking:
[Detaillierte Tabelle mit 25 Meilensteinen]

4. 13-WOCHEN-LIQUIDITÄT

[Wochengenaue Aufstellung]
Min-Cash: Woche 4
Max-Cash: Woche 13 (nach Investor)
Kritische Zahlung: Steuern Woche 3

5. SENSITIVITÄTEN

Szenario | EBITDA | Liquidität | Waiver nötig?
---------|--------|-----------|---------------
Base | 6,2→8,5% | Ausreichend | Ja, 6 Monate
Best | 6,2→9,5% | Komfortabel | Ja, 3 Monate
Worst | 6,2→7,0% | Eng | Ja, 12 Monate

Kritische Annahmen:
- Keine Großkundenverluste
- Investor-Deal bis Tag 60
- Keine MAC-Events

6. BEIRATS-STATEMENT

"Der Beirat hat die vorgelegte Planung geprüft und hält diese für ambitioniert aber realistisch. Die eingeleiteten Maßnahmen zeigen bereits erste Wirkung. Ein temporärer Waiver erscheint gerechtfertigt, um den begonnenen Prozess erfolgreich abzuschließen.

Die Geschäftsführung hat das volle Vertrauen des Beirats."

gez. Prof. Weber, Beiratsvorsitzender

7. ANHÄNGE

A. Testierte Monatszahlen
B. Investor-Pipeline
C. Kundenliste mit DB1
D. Detailliertes Kostenprogramm
E. Gutachten Restrukturierungsberater

UNSERE BITTE:

Waiver-Konditionen:
• Laufzeit: 6 Monate (bis 30.09.)
• EBITDA-Marge: Reduktion auf 6%
• EK-Quote: Aussetzung
• Net Debt/EBITDA: Erhöhung auf 4,5x

Gegenleistung:
• Wöchentliches Reporting
• Monatliche Calls
• Beirats-Einbindung
• Investor-Updates
• Keine Dividenden

Zeitplan:
Tag 11: Gespräch
Tag 12: Prüfung Bank
Tag 14: Kreditausschuss
Tag 15: Waiver-Dokumentation

Mit freundlichen Grüßen
Schmidt, CFO`
  },

  // OPS ATTACHMENTS
  'd08_ops_layout_optimierung.pdf': {
    filename: 'd08_ops_layout_optimierung.pdf',
    title: 'Produktionslayout-Optimierung: Konzept',
    type: 'document',
    content: `PRODUKTIONSLAYOUT-OPTIMIERUNG
Konzept zur Rüstzeitreduzierung

1. AUSGANGSLAGE

Aktuelle Situation:
• Durchschnittliche Rüstzeit: 45 Minuten
• Rüstvorgänge/Tag: 8-12
• Produktivitätsverlust: 15%
• Hauptproblem: Wegezeiten, Werkzeugsuche

IST-Layout:
[Einfache Skizze]
- Maschinen nach Typ gruppiert
- Lange Wege zwischen Stationen
- Zentrale Werkzeugausgabe
- Keine Visualisierung

2. OPTIMIERUNGSKONZEPT

Neues Layout-Prinzip:
• Produktfamilien-orientiert
• U-Form für Hauptprodukte
• Dezentrale Werkzeugstationen
• 5S-Arbeitsplätze

Erwartete Verbesserungen:
- Rüstzeit: -30% (auf 32 Min)
- Durchlaufzeit: -20%
- Flächennutzung: +15%
- Fehlerquote: -10%

3. UMSETZUNGSVARIANTEN

Option A: Komplettumbau (12k EUR)
Zeitrahmen: 2 Wochenenden
Inhalt:
- Maschinenumstellung
- Neue Verkabelung
- Bodenmarkierungen
- Schulung alle MA

Option B: Teiloptimierung (8k EUR)
Zeitrahmen: 1 Wochenende
Inhalt:
- Kritische Maschinen
- Mobile Werkzeugwagen
- Teilmarkierung
- Schulung Kernteam

Option C: Minimal (2k EUR)
Zeitrahmen: 2 Tage
Inhalt:
- Nur Werkzeugstationen
- Wegeoptimierung
- Beschilderung

4. DETAILPLAN OPTION B (EMPFEHLUNG)

Phase 1: Vorbereitung (Tag 8-9)
□ Ist-Aufnahme Materialflüsse
□ Spaghetti-Diagramm
□ Mitarbeiter-Workshop
□ Umbauplan final

Phase 2: Umsetzung (Wochenende)
□ Maschine A + B umstellen
□ Werkzeugwagen positionieren
□ Kanban-Boards installieren
□ Erste Markierungen

Phase 3: Anlauf (Tag 11-12)
□ Testläufe Hauptprodukte
□ Feintuning
□ Schulung Schichtführer
□ Dokumentation

5. BUSINESS CASE

Investition: 8.000 EUR
Einsparung p.a.: 42.000 EUR

Berechnung:
- 10 Rüstvorgänge/Tag
- 13 Min Einsparung/Rüstung
- 130 Min/Tag = 2,2 Stunden
- 2,2h x 220 Tage x 35€/h = 16.940€
- Plus Qualität, Durchlaufzeit = 42.000€

ROI: 5,7 Monate

6. RISIKEN UND MASSNAHMEN

Risiko | Eintritt | Maßnahme
-------|----------|----------
Produktionsausfall | Niedrig | Wochenendumbau
MA-Widerstand | Mittel | Frühzeitige Einbindung
Anlaufschwierigkeiten | Hoch | Puffer einplanen
Kundentermine | Niedrig | Vorproduktion

7. ERFOLGSMESSUNG

KPI | IST | SOLL | Messung
----|-----|------|--------
Rüstzeit Produkt A | 52min | 35min | Täglich
Rüstzeit Produkt B | 38min | 25min | Täglich
OEE Gesamtanlage | 68% | 75% | Wöchentlich
Fehlerquote | 120ppm | 80ppm | Täglich

8. NÄCHSTE SCHRITTE

Heute (Tag 8):
☑ Entscheidung Option B
☐ Projektteam benennen
☐ Lieferanten beauftragen

Morgen (Tag 9):
☐ Mitarbeiter-Info
☐ Detailplanung
☐ Vorproduktion

Wochenende:
☐ Umbau durchführen

Montag (Tag 11):
☐ Anlauf begleiten
☐ Quick-Wins kommunizieren

Verantwortlich: Produktionsleitung
Support: Industrial Engineering
Budget: Freigegeben durch CFO`
  },

  // HR/Legal ATTACHMENTS
  'd08_hrlegal_retention_richtlinie.pdf': {
    filename: 'd08_hrlegal_retention_richtlinie.pdf',
    title: 'Richtlinie: Retention-Programm für Schlüsselkräfte',
    type: 'document',
    content: `RETENTION-RICHTLINIE
Krisenbonus und Haltemaßnahmen

Gültig: Ab Tag 8
Befristet: 6 Monate
Freigabe: GF/BR

1. ZIELSETZUNG

Sicherung kritischer Kompetenzen während der Restrukturierung durch:
• Gezielte finanzielle Anreize
• Nicht-monetäre Benefits
• Verbindliche Bleibevereinbarungen
• Faire und transparente Kriterien

2. ZIELGRUPPE

Kritikalitäts-Matrix:
                  Schwer ersetzbar | Leicht ersetzbar
Geschäftskritisch |     Stufe A     |     Stufe B
Standard          |     Stufe C     |     Stufe D

Stufe A (10 Personen): Sofort-Retention
Stufe B (15 Personen): Standard-Retention  
Stufe C (25 Personen): Monitoring
Stufe D (70 Personen): Keine Maßnahmen

3. KRITERIEN SCHLÜSSELKRAFT

Muss-Kriterien (alle erfüllt):
☑ Geschäftskritische Funktion
☑ Spezialkenntnisse/Zertifikate
☑ Wiederbeschaffung > 3 Monate
☑ Leistungsbeurteilung "gut" oder besser

Zusatzkriterien (mind. 2):
☐ Kundenkontakt A-Kunden
☐ Projektverantwortung kritisch
☐ Einziger Wissensträger
☐ Abwerbungsrisiko konkret

4. RETENTION-INSTRUMENTE

Stufe A - Premium (10 Personen):
• Krisenbonus: 1,5 Monatsgehälter
• Auszahlung: 50% sofort, 50% nach 6 Mon
• Bleibevereinbarung: 12 Monate
• Rückzahlung bei Kündigung

Stufe B - Standard (15 Personen):
• Krisenbonus: 0,5 Monatsgehälter
• Auszahlung: Nach 6 Monaten
• Bleibevereinbarung: 6 Monate

Nicht-monetäre Benefits (alle):
• Flexible Arbeitszeiten
• Homeoffice-Option (wo möglich)
• Weiterbildungsbudget
• Karrierezusagen Post-Krise

5. PROZESS

1. Nominierung durch Führungskraft
2. Prüfung durch HR
3. Freigabe durch GF
4. Information Betriebsrat
5. Gespräch mit Mitarbeiter
6. Vereinbarung unterzeichnen
7. Auszahlung veranlassen

6. BUDGET

Gesamtbudget: 45.000 EUR
Verteilung:
- Stufe A: 30.000 EUR
- Stufe B: 15.000 EUR
- Reserve: 0 EUR

Finanzierung:
- Einsparung Recruiting
- Vermeidung Produktivitätsverlust
- ROI: 3:1 kalkuliert

7. KOMMUNIKATION

Dos:
✓ Vertrauliche Einzelgespräche
✓ Wertschätzung ausdrücken
✓ Perspektive aufzeigen
✓ Fairness betonen

Don'ts:
✗ Öffentliche Listen
✗ Neid schüren
✗ Unrealistische Versprechen
✗ Druck aufbauen

8. RECHTLICHE ASPEKTE

Gleichbehandlung:
- Dokumentierte Kriterien
- Nachvollziehbare Entscheidung
- BR-Beteiligung
- Keine Diskriminierung

Steuer/Sozialversicherung:
- Voll zu versteuern
- SV-pflichtig
- Keine Sonderzahlung

Rückforderung:
- Bei Eigenkündigung < 12 Mon
- Bei verhaltensbedingter Kündigung
- Zeitanteilig

9. MONITORING

Monatliche Überprüfung:
- Fluktuation Schlüsselkräfte
- Abwerbungsversuche
- Stimmungsbarometer
- Budget-Verbrauch

Erfolgsmessung:
- Ziel: 0% Fluktuation Stufe A
- Max 10% Fluktuation Stufe B
- Keine Produktionsausfälle

10. ESKALATION

Bei drohender Kündigung:
1. Sofort-Gespräch Führungskraft
2. Einbindung HR
3. Ggf. CEO-Gespräch
4. Nachbesserung prüfen
5. Geordnete Übergabe

ANLAGEN:
- Kritikalitäts-Matrix (Excel)
- Muster-Bleibevereinbarung
- Gesprächsleitfaden
- FAQ für Führungskräfte

Ansprechpartner:
HR: Schneider (Durchwahl -500-50)
Legal: Dr. Becker (-510-60)`
  },

  'd08_hrlegal_freigabeprozess_dokumentation.pdf': {
    filename: 'd08_hrlegal_freigabeprozess_dokumentation.pdf',
    title: 'Freigabeprozess',
    type: 'document',
    content: `Freigabeprozess
1. Hintergrund

Im Zuge der aktuellen Restrukturierung kursieren Gerüchte über angebliche „Sonderfreigaben“ bei Lieferantenzahlungen. Dieses Dokument dient der Klarstellung des etablierten Prozesses und zeigt die möglichen Kommunikationswege auf.

2. Standardprozess der Zahlungsfreigabe

Vier-Augen-Prinzip: Jede Freigabe erfordert die Prüfung und Bestätigung durch mindestens zwei autorisierte Personen (Accounting & Bereichsleitung).

Systemgestützte Kontrolle: Alle Freigaben werden in unserem ERP-System dokumentiert, inklusive Zeitstempel und Benutzerkennung.

Audit-Trail: Jede Abweichung vom Standardprozess ist revisionssicher nachvollziehbar und wird durch den Compliance-Bereich protokolliert.

Ausnahmeregelung im Krisenfall: Dringende Zahlungen können nach klar definierten Kriterien (kritische Lieferanten, Produktionssicherung, rechtliche Verpflichtung) beschleunigt bearbeitet werden. Diese Vorgänge unterliegen nachgelagert einer Prüfung.

3. Kommunikationsoptionen zur aktuellen Situation
Option A – Nur interne Information

Inhalt: Sachliche Mitteilung an Mitarbeitende über den bestehenden Prozess und die interne Kontrollmechanik.

Wirkung: Beruhigt Belegschaft, stärkt Vertrauen intern, vermeidet externe Schlagzeilen.

Risiko: Externe Partner erfahren nichts; Deutungslücken in Medien und Markt.

Option B – Nicht kommunizieren

Inhalt: Keine aktive Stellungnahme.

Wirkung: Kein kurzfristiger Imageschaden nach außen.

Risiko: Verstärkung von Gerüchten, Verlust von Vertrauen bei Bank und Mitarbeitenden.

Option C – Prozessdarstellung & Audit-Trail teilen

Inhalt: Transparente Veröffentlichung des Freigabeprozesses mit Nachweis, dass keine unzulässigen Ausnahmen erfolgten.

Wirkung: Hohe Glaubwürdigkeit bei Bank, Mitarbeitenden und Öffentlichkeit.

Risiko: Detaillierte Informationen könnten von Wettbewerbern oder Medien aus dem Kontext gerissen werden.

Option D – Externe Prüfung ankündigen

Inhalt: Ankündigung einer unabhängigen Prüfung durch externe Auditoren.

Wirkung: Starker Vertrauensgewinn bei Öffentlichkeit und Bank.

Risiko: Zusatzkosten (8k), mögliche Verunsicherung in der Belegschaft („es besteht ein Problem“).

4. Empfehlung

Unabhängig von der gewählten Kommunikationsoption bleibt der Grundsatz:

Faktenbasierte, sachliche Information beruhigt.

Übertreibung oder Verschweigen verstärken das Risiko von Vertrauensverlust.
    
gez. Compliance Officer
Tag 8`
   },
  'd08_hrlegal_compliance_massnahmenplan.pdf': {
    filename: 'd08_hrlegal_compliance_massnahmenplan.pdf',
    title: 'Compliance-Maßnahmenplan nach Vorprüfung',
    type: 'document',
    content: `COMPLIANCE-MASSNAHMENPLAN
Ergebnis Vorprüfung und Sofortmaßnahmen

MANAGEMENT SUMMARY

Die Vorprüfung identifizierte Dokumentationslücken bei Lieferantenfreigaben. Kein Hinweis auf dolose Handlungen, aber Prozessschwächen. Sofortmaßnahmen eingeleitet.

1. BEFUND VORPRÜFUNG

Geprüfter Zeitraum: Q4 Y-1
Fokus: Lieferantenfreigaben

Feststellungen:
✓ 3 Freigaben ohne vollständige Dokumentation
✓ Vier-Augen-Prinzip teilweise umgangen
✓ Nachträgliche Genehmigungen
⚠️ Keine Hinweise auf Vorteilsnahme
⚠️ Prozess unklar definiert

2. RISIKOBEWERTUNG

Rechtliche Risiken:
• Compliance-Verstoß: Gering
• Strafrechtlich: Kein Anhaltspunkt
• Arbeitsrechtlich: Abmahnung möglich

Geschäftsrisiken:
• Reputationsschaden: Mittel
• Kundenvertrauen: Gering
• Bankbeziehung: Mittel
• Mitarbeiter: Hoch (Gerüchte)

3. SOFORTMASSNAHMEN (Tag 8-10)

Prozess-Ebene:
☑ Freigabematrix aktualisiert
☐ Vier-Augen-Prinzip verschärft
☐ SAP-Berechtigungen geprüft
☐ Unterschriftenliste erneuert

Kommunikation:
☐ Führungskräfte-Brief
☐ Betriebsrat informieren
☐ Betroffene ansprechen
☐ FAQ erstellen

Dokumentation:
☐ Audit-Trail einrichten
☐ Archivierung verbessern
☐ Prüfprotokolle

4. MITTELFRISTIGE MASSNAHMEN (Tag 11-30)

Schulungsprogramm:
• Zielgruppe: Alle mit Freigabebefugnis (25 Pers.)
• Inhalt: Compliance-Grundlagen
• Dauer: 2 Stunden
• Durchführung: Extern (12.000 EUR)

Prozessoptimierung:
• Digitaler Freigabe-Workflow
• Automatische Eskalation
• Limit-Kontrollen
• Reporting-Dashboard

Kontrollen:
• Monatliche Stichproben
• Quartals-Audit
• Jahres-Zertifizierung

5. FORENSIC-LIGHT OPTION

Angebot liegt vor: 12.000 EUR
Umfang:
- Transaktionsanalyse 6 Monate
- 5 Interviews
- Kurzgutachten

Pro:
+ Externe Objektivität
+ Rechtssicherheit
+ Signal an Stakeholder

Contra:
- Kosten
- Unruhe
- Zeitaufwand

Empfehlung: DURCHFÜHREN

6. KOMMUNIKATIONSPLAN

Intern - Heute:
"Wir haben aus eigenem Antrieb eine Prozessprüfung durchgeführt und Optimierungspotenziale identifiziert. Alle Maßnahmen zur Verbesserung sind eingeleitet."

Extern - Bei Anfrage:
"Im Rahmen unseres kontinuierlichen Verbesserungsprozesses optimieren wir laufend unsere internen Abläufe."

Bank - Proaktiv:
"Compliance-Review ohne kritische Findings. Prozesse werden präventiv verbessert."

7. VERANTWORTLICHKEITEN

Gesamtverantwortung: GF
Umsetzung: Compliance Officer
Kontrolle: Internal Audit
Begleitung: Legal
Kommunikation: HR/PR

8. ZEITPLAN

Tag 8: ✓ Maßnahmenplan verabschieden
Tag 9: ☐ BR-Information
Tag 10: ☐ Führungskräfte-Brief
Tag 11-12: ☐ Interviews Forensic
Tag 15: ☐ Erste Schulung
Tag 20: ☐ Forensic-Bericht
Tag 30: ☐ Abschlussbericht

9. BUDGET

Forensic-Light: 3.000 EUR
Schulungen: 3.000 EUR
Prozessanpassung: 2.000 EUR
Beratung: 4.000 EUR
GESAMT: 12.000 EUR

Freigabe: ☐ CEO ☐ CFO

10. ERFOLGSMESSUNG

KPIs:
• 0 Compliance-Verstöße
• 100% Schulungsteilnahme
• 100% Dokumentation
• Audit "grün"

ANLAGEN:
- Prüfbericht Vorprüfung
- Forensic-Angebot
- Schulungskonzept
- Prozessdiagramm neu

Vertraulichkeit: INTERN
Keine Weitergabe ohne GF-Freigabe

gez. Compliance Officer
Tag 8`
   },

  'd08_ceo_stakeholder_newsletter.pdf': {
    filename: 'd08_ceo_stakeholder_newsletter.pdf',
    title: 'Stakeholder-Newsletter: Restrukturierungsupdate',
    type: 'document',
    content: `STAKEHOLDER-NEWSLETTER
Restrukturierungsupdate - Tag 8

Liebe Geschäftspartner, Kunden und Wegbegleiter,

nach einer intensiven ersten Woche unserer Restrukturierung möchten wir Sie über die erzielten Fortschritte informieren.

POSITIVE ENTWICKLUNGEN

Operative Stabilisierung:
✓ Liefertreue bei A-Kunden: 98% erreicht
✓ Qualitätskennzahlen auf Rekordniveau
✓ Keine kritischen Personalabgänge
✓ Produktionsauslastung optimiert

Finanzielle Konsolidierung:
✓ Quick Wins bereits realisiert
✓ Kostensenkungsprogramm greift
✓ Working Capital um 3% reduziert

KLARE PERSPEKTIVE

Unsere strategische Neuausrichtung zeigt erste Erfolge:
- Fokussierung auf profitable Kundensegmente
- Investor-Gespräche für Wachstumsfinanzierung
- Modernisierung der Produktionsabläufe
- Stärkung der Innovationskraft

FÜR UNSERE KUNDEN

Ihre Aufträge haben höchste Priorität:
→ Lieferungen erfolgen termingerecht
→ Qualität wird weiter gesteigert  
→ Persönliche Ansprechpartner bleiben
→ Investitionen in Ihre Anforderungen

Bei Fragen steht Ihnen Ihr gewohnter Ansprechpartner oder unsere Hotline (Tel. 300-777) zur Verfügung.

FÜR UNSERE LIEFERANTEN

Wir setzen auf langfristige Partnerschaften:
→ Zahlungsfähigkeit ist gesichert
→ Gemeinsame Projekte werden fortgeführt
→ Faire und verlässliche Zusammenarbeit
→ Win-Win-Lösungen im Fokus

AUSBLICK

Die nächsten Wochen werden von drei Schwerpunkten geprägt:
1. Vertiefung der Investor-Gespräche
2. Weitere Effizienzsteigerungen
3. Ausbau der Marktposition

Wir sind zuversichtlich, gestärkt aus dieser Phase hervorzugehen und unsere Position als zuverlässiger Partner weiter auszubauen.

Vielen Dank für Ihr Vertrauen und Ihre Treue.

Mit freundlichen Grüßen
 CEO

---
KONTAKT
Fragen zur Restrukturierung: phoenix@aurion-ps.com
Kunde werden: salesaurion-ps.com
Medienanfragen: imelda.sanches@uaurion-ps.com

Stand: Tag 8 | Nächster Newsletter: Tag 15`
  },

  // CFO - Fehlende Attachments
  'd08_cfo_abverkaufsstrategie.pdf': {
    filename: 'd08_cfo_abverkaufsstrategie.pdf',
    title: 'Bestandsabverkauf: Systematische Verwertungsstrategie',
    type: 'document',
    content: `BESTANDSABVERKAUF-STRATEGIE
Systematische Verwertung Langsamdreher & Obsoletes

ZIELSETZUNG
Cash-Freisetzung: 800.000 EUR
Flächenfreisetzung: 450 m²  
Komplexitätsreduktion: 30%
Zeitrahmen: 4 Wochen

1. SEGMENTIERUNG

Kategorie A - Schnellverkäufer (150k EUR):
• Standardmaterialien
• Marktfähige Komponenten
• Geringe Abschläge (-5 bis -15%)
• Verkauf über Handelspartner

Kategorie B - Langsamdreher (110k EUR):
• Spezialkomponenten  
• Branchenspezifische Teile
• Moderate Abschläge (-15 bis -30%)
• Direkte Kundenansprache

Kategorie C - Obsoletes (65k EUR):
• Ausgelaufene Produkte
• Defekte/beschädigte Waren
• Hohe Abschläge (-50 bis -70%)
• Schrottverwerter/Recycling

2. VERKAUFSKANÄLE

Online-Plattformen (40%):
• eBay Business & Industrial
• Restposten.de
• Maschinensuchmaschine.de
• Eigene Website "Sonderposten"

Direktvertrieb (35%):
• Bestandskunden ansprechen
• Wettbewerber kontaktieren
• Branchennetzwerk nutzen
• Trade Shows/Messen

Händler/Broker (25%):
• Industriegüter-Händler
• Materialbroker
• Recycling-Unternehmen
• Exporteure

3. PREISGESTALTUNG

Preisstufen-Modell:
Woche 1: Listenpreis -10%
Woche 2: Listenpreis -20%  
Woche 3: Listenpreis -35%
Woche 4: Bestpreis akzeptieren

Mindestpreise:
A-Kategorie: >85% Buchwert
B-Kategorie: >70% Buchwert
C-Kategorie: >30% Buchwert

4. OPERATIVES VORGEHEN

Phase 1 (Tag 8-10): Vorbereitung
☐ Detailkatalog erstellen
☐ Fotos/Beschreibungen
☐ Preislisten kalkulieren
☐ Verkaufskanäle vorbereiten

Phase 2 (Tag 11-18): Verkaufsstart
☐ Online-Angebote aktivieren
☐ Kundenliste abarbeiten
☐ Händler-Roadshow
☐ Erste Abschlüsse

Phase 3 (Tag 19-25): Intensivierung
☐ Preise reduzieren
☐ Pakete schnüren
☐ Restposten-Deals
☐ Schrotterlöse

Phase 4 (Tag 26-32): Abschluss
☐ Finale Preissenkung
☐ En-bloc-Verkäufe
☐ Entsorgung Rest
☐ Bilanzabschluss

5. FINANZIELLE PROJEKTION

Woche | Verkäufe | Erlös kum. | Abschlag
------|----------|------------|----------
1 | 80.000 | 72.000 | -10%
2 | 120.000 | 168.000 | -12%
3 | 180.000 | 285.000 | -18%
4 | 245.000 | 420.000 | -25%

Ziel-Szenario: 800.000 EUR (-15% Ø)
Worst-Case: 650.000 EUR (-25% Ø)
Best-Case: 900.000 EUR (-8% Ø)

6. KUNDENVEREINBARUNGEN

Rücknahmerecht:
- 14 Tage ab Lieferung
- Original-Verpackung
- Nur bei Mängeln

Gewährleistung:
- Material wie besichtigt
- Keine Garantie Verfügbarkeit
- Eigene Qualitätsprüfung

Zahlung:
- Vorkasse/Überweisung
- PayPal für Kleinmengen
- Sofortrabatt 3% bei Vorkasse

7. MARKETING & KOMMUNIKATION

Interne Kommunikation:
"Bestandsoptimierung zur Fokussierung auf Kerngeschäft"

Externe Kommunikation:
"Sonderverkauf - Qualitätsmaterialien zu Vorzugspreisen"

Verkaufsargumente:
• Geprüfte Industriequalität
• Sofort verfügbar
• Mengenrabatte möglich  
• Faire Preise

8. ERFOLGS-KPIs

Finanziell:
- Cash-Generierung: >800k EUR
- Durchschnitts-Abschlag: <18%
- Verkaufsquote: >95% (Volumen)

Operational:
- Verkaufsdauer: <30 Tage
- Flächenfreisetzung: 450 m²
- Handling-Aufwand: <40 Std/Woche

9. RISIKOMANAGEMENT

Risiko | Wahrscheinlichkeit | Gegenmaßnahme
-------|-------------------|----------------
Preisverfall | Mittel | Flexible Preisstufen
Keine Nachfrage | Gering | Kanäle erweitern
Qualitätsprobleme | Niedrig | Vorab-Checks
Imageschaden | Niedrig | Professionelle Kommunikation

10. ORGANISATION

Projektleitung: CFO
Verkauf: Vertrieb + Einkauf
Logistik: Lager + Spedition
Controlling: Laufende Erfolgsmessung

Budget: 15.000 EUR
- Marketing: 5.000 EUR
- Logistik: 8.000 EUR  
- Personal: 2.000 EUR

ROI: 5.200% (800k/15k)

Freigabe: ☐ CFO ☐ CEO ☐ COO`
  },

  'd08_cfo_kpi_dashboard.xlsx': {
    filename: 'd08_cfo_kpi_dashboard.xlsx',
    title: 'KPI-Dashboard für Working Capital Management',
    type: 'spreadsheet',
    content: `WORKING CAPITAL KPI-DASHBOARD
Wöchentliches Management-Cockpit

ÜBERSICHT KENNZAHLEN (Ampelsystem):

KPI | Aktuell | Ziel | Abweichung | Status | Trend
----|---------|------|------------|--------|-------
DSO (Tage) | 49 | 35 | +14 | 🔴 | ↘
DIO (Tage) | 43 | 30 | +13 | 🟡 | ↘  
DPO (Tage) | 51 | 45 | +6 | 🟢 | ↗
CCC (Tage) | 41 | 20 | +21 | 🔴 | ↘
WC Absolut | 890k | 680k | +210k | 🟡 | ↘

DETAILANALYSE BEREICHE:

FORDERUNGSMANAGEMENT:
Altersstruktur | Betrag | % | Ziel% | Status
---------------|--------|-------|------|-------
0-30 Tage | 841.000 | 58% | 70% | 🔴
31-60 Tage | 363.000 | 25% | 20% | 🔴
61-90 Tage | 174.000 | 12% | 8% | 🔴
>90 Tage | 72.000 | 5% | 2% | 🔴
GESAMT | 1.450.000 | 100% | 100% | -

Top-5 Überfällige Kunden:
Kunde | Betrag | Tage | Risiko | Maßnahme
------|--------|------|--------|----------
Gamma Tech | 95.000 | 65 | Hoch | CEO-Call
Klein GmbH | 42.000 | 72 | Mittel | Mahnung
Mueller AG | 38.000 | 55 | Niedrig | Telefon
Servo Ltd | 28.000 | 48 | Niedrig | Brief
TechParts | 22.000 | 41 | Niedrig | Erinnerung

LAGERBESTANDSMANAGEMENT:
Kategorie | Bestand | Reichweite | Ziel | Status
----------|---------|------------|------|--------
A-Teile | 450.000 | 4 Wochen | 4 Wochen | 🟢
B-Teile | 520.000 | 8 Wochen | 6 Wochen | 🟡
C-Teile | 260.000 | 16+ Wochen | 8 Wochen | 🔴
Obsolet | 65.000 | Nie | 0 | 🔴
SUMME | 1.295.000 | 8,2 Wochen | 5,5 Wochen | 🟡

Bewegungsanalyse (letzte 4 Wochen):
Material | Zugang | Abgang | Bestand | Trend
---------|--------|--------|---------|-------
Stahl | 45.000 | 52.000 | 180.000 | ↘
Elektronik | 32.000 | 28.000 | 145.000 | ↗
Verpackung | 12.000 | 15.000 | 85.000 | ↘
Chemie | 8.000 | 6.000 | 95.000 | ↗

VERBINDLICHKEITENMANAGEMENT:
Fälligkeit | Betrag | % | Plan | Status
-----------|--------|-------|------|-------
Überfällig | 280.000 | 15% | 5% | 🔴
Diese Woche | 420.000 | 23% | 25% | 🟢
1-30 Tage | 650.000 | 35% | 40% | 🟢
31-60 Tage | 500.000 | 27% | 30% | 🟢
GESAMT | 1.850.000 | 100% | 100% | -

Kritische Lieferanten:
Lieferant | Betrag | Tage | Risiko | Plan
----------|--------|------|--------|------
Hauptlief. Stahl | 185.000 | 3 | Stopp | Zahlung KW
Energieversorger | 95.000 | 14 | Mahnung | Rate
Chemie GmbH | 65.000 | 28 | Skonto | Zahlung
Transport AG | 35.000 | 7 | Normal | Routine

CASH-CONVERSION-CYCLE BRIDGE:
Komponente | Beitrag Tage | Potenzial | Maßnahme
-----------|--------------|-----------|----------
DSO Reduktion | -10 | -300k WC | Factoring + Mahnung
DIO Optimierung | -8 | -240k WC | C-Teile Verkauf
DPO Verlängerung | +3 | +90k WC | Verhandlung
Netto-Effekt | -15 | -450k WC | Kombination

FORECAST NÄCHSTE 8 WOCHEN:

KW | DSO | DIO | DPO | CCC | WC EUR | Maßnahme
---|-----|-----|-----|-----|--------|----------

KW3 | 47 | 42 | 52 | 37 | 850k | Mahnung intensiv
KW4 | 45 | 40 | 53 | 32 | 780k | Factoring Start
KW5 | 43 | 39 | 54 | 28 | 720k | C-Teile Verkauf
KW6 | 40 | 38 | 52 | 26 | 680k | Bestand opt.
KW7 | 38 | 36 | 53 | 21 | 620k | Routine
KW8 | 36 | 35 | 54 | 17 | 580k | Ziel erreicht
KW10 | 35 | 30 | 45 | 20 | 520k | Normalbetrieb

ABTEILUNGS-SCORECARDS:

VERTRIEB (DSO):
Mitarbeiter | Kunden | DSO | Ziel | Performance
------------|--------|-----|------|------------
Schmidt, T. | 25 | 42 | 35 | 🟡 80%
Waller, M. | 18 | 38 | 35 | 🟢 92%  
Klein, A. | 22 | 55 | 35 | 🔴 64%
TEAM | 65 | 49 | 35 | 🔴 71%

EINKAUF (DPO):
Kategorie | Verbindl. | DPO | Ziel | Performance
----------|-----------|-----|------|------------
Material | 950k | 48 | 45 | 🟢 107%
Invest | 320k | 62 | 60 | 🟢 103%
Service | 280k | 45 | 45 | 🟢 100%
Energie | 300k | 52 | 30 | 🔴 58%

PRODUKTION (DIO):
Bereich | Bestand | DIO | Ziel | Performance
--------|---------|-----|------|------------
Stahl | 280k | 38 | 30 | 🟡 79%
Elektronik | 180k | 52 | 40 | 🔴 77%
Montage | 95k | 28 | 25 | 🟢 89%
GESAMT | 1.295k | 43 | 30 | 🟡 70%

AKTIONSLISTE:

Prio | Aktion | Verantwortlich | Frist | Impact WC
-----|--------|----------------|-------|----------
1 | Factoring A-Kunden | CFO | KW3 | -200k
2 | C-Teile Abverkauf | COO | KW4 | -150k  
3 | Gamma-Zahlung | CEO | KW2 | -95k
4 | DPO +5 Tage | Einkauf | KW3 | -80k
5 | Skonto nutzen | Alle | Laufend | -15k/Mon

WEEKLY REVIEW TERMIN:
Jeden Freitag 14:00 Uhr
Teilnehmer: CFO, COO, Sales, Einkauf
Dauer: 30 Minuten
Fokus: Rote KPIs & Aktionsplan

Report erstellt: Tag 8, 16:00 Uhr
Nächster Report: Tag 15, 16:00 Uhr`
  },

  'd08_cfo_vendor_dd_checkliste.xlsx': {
    filename: 'd08_cfo_vendor_dd_checkliste.xlsx',
    title: 'Vendor Due Diligence - Komplette Prüfcheckliste',
    type: 'spreadsheet',  
    content: `VENDOR DUE DILIGENCE CHECKLISTE
Vorbereitung für Investor-Prüfung
Hinweis: Externe Begleitung Red-Flag-Report 15k
FINANCIAL DUE DILIGENCE CHECKLIST:

Nr | Dokument | Kategorie | Status | Priorität | Verantwortlich
---|----------|-----------|--------|-----------|----------------
1.1 | Jahresabschluss 2022 testiert | Basis | ✓ | Hoch | CFO
1.2 | Jahresabschluss 2023 testiert | Basis | ✓ | Hoch | CFO  
1.3 | Jahresabschluss 2024 Entwurf | Basis | ✓ | Hoch | CFO
1.4 | BWA letzte 24 Monate | Detail | ✓ | Hoch | Controlling
1.5 | Monatliche P&L 2024 | Detail | ✓ | Hoch | Controlling
1.6 | Bilanz monatlich 2024 | Detail | ✓ | Hoch | Controlling
1.7 | Cash Flow Statement | Detail | ✓ | Hoch | CFO
1.8 | Working Capital Analyse | Detail | ✓ | Hoch | CFO
1.9 | Budget 2025 Board-approved | Planung | ✓ | Hoch | CFO
1.10 | 3-Jahres-Businessplan | Planung | ✓ | Mittel | CEO/CFO
1.11 | Capex-Planung 3 Jahre | Planung | → | Mittel | COO
1.12 | Debt Schedule | Finanzierung | ✓ | Hoch | CFO
1.13 | Covenant Tracking | Finanzierung | ✓ | Hoch | CFO
1.14 | Bank Agreements | Finanzierung | ✓ | Hoch | Legal
1.15 | Leasing Verträge | Finanzierung | ✓ | Mittel | CFO

OPERATIONAL DUE DILIGENCE:

Nr | Dokument | Status | Owner | Red Flags
---|----------|--------|-------|----------
2.1 | Produktionskapazitäten | ✓ | COO | Überkapazität
2.2 | Auslastungsgrade 2024 | ✓ | COO | Schwankung Q4
2.3 | OEE-Entwicklung | ✓ | Produktion | Nur 68%
2.4 | Qualitätskennzahlen | ✓ | QS | PPM über 100
2.5 | Ausschussquoten | ✓ | QS | Kostenfaktor
2.6 | Maschinenalter/-zustand | → | COO | Invest-Rückstau
2.7 | Wartungshistorie | ✓ | Instandhaltung | Versäumnisse
2.8 | Zertifikate (ISO, TS) | ✓ | QS | Re-Audit nötig
2.9 | Kundenzufriedenheit | ✓ | Sales | Beschwerde Gamma
2.10 | Lieferperformance | ✓ | Logistik | Verbesserung Q4

COMMERCIAL DUE DILIGENCE:

Nr | Analyse | Status | Findings | Risk Level
---|---------|--------|----------|------------
3.1 | Top-10 Kunden (5 Jahre) | ✓ | Konzentration 45% | Hoch
3.2 | Kundenverträge | ✓ | Meist jährlich | Mittel
3.3 | Preisgestaltung/-entwicklung | ✓ | Preisdruck | Hoch
3.4 | Marktanteil/-entwicklung | → | Rückgang 2024 | Hoch
3.5 | Wettbewerbsposition | → | Fragmentiert | Mittel
3.6 | Produktportfolio-Analyse | ✓ | ABC-klassifiziert | Niedrig
3.7 | Innovation Pipeline | ✓ | Schwach | Hoch
3.8 | Geografische Verteilung | ✓ | Regional fokus | Mittel

LEGAL DUE DILIGENCE:

Nr | Rechtsbereich | Status | Kritikalität | Bemerkung
---|---------------|--------|--------------|----------
4.1 | Gesellschaftsrecht | ✓ | Niedrig | Standard GmbH
4.2 | Immobilien/Mieten | ✓ | Mittel | Langlaufende Verträge
4.3 | Arbeitsrecht | ✓ | Niedrig | Keine Altlasten
4.4 | Umweltrecht | → | Mittel | Altstandort-Prüfung
4.5 | Patente/IP | ✓ | Niedrig | 3 Gebrauchsmuster
4.6 | Litigation | ✓ | Niedrig | Keine wesentlichen
4.7 | Compliance | ⚠️ | Mittel | Lücken identifiziert
4.8 | Datenschutz | ✓ | Niedrig | DSGVO-konform
4.9 | IT-Sicherheit | → | Mittel | Audit läuft

HR DUE DILIGENCE:

Nr | Personalbereich | Status | Findings
---|-----------------|--------|---------
5.1 | Organigramm aktuell | ✓ | Flache Hierarchie
5.2 | Mitarbeiterliste | ✓ | 120 Vollzeitäquivalente
5.3 | Gehaltsstrukturen | ✓ | Marktgerecht
5.4 | Pensionsverpflichtungen | ✓ | Gering (neu GmbH)
5.5 | Betriebsvereinbarungen | ✓ | Standard-Inhalte
5.6 | Schlüsselpersonen | ✓ | 10 identifiziert
5.7 | Fluktuation/Krankenstand | ✓ | Branchentypisch
5.8 | Weiterbildung | ✓ | Unterinvestiert

TECHNOLOGY/IT DUE DILIGENCE:

Nr | IT-Bereich | Status | Assessment
---|------------|--------|------------
6.1 | Systemlandschaft | → | Legacy-dominant
6.2 | ERP-System | ✓ | SAP-Standard
6.3 | Cybersecurity | → | Verbesserungsbedarf
6.4 | Software-Lizenzen | ✓ | Compliant
6.5 | Hardware-Alter | ✓ | Invest-Plan nötig
6.6 | Backup/Disaster Recovery | → | Risiko identifiziert

RED FLAG REGISTER:

Kategorie | Red Flag | Impact | Wahrscheinlichkeit | Mitigation
----------|----------|--------|-------------------|------------
Financial | Covenant Breach | Hoch | 80% | Waiver läuft
Operational | Hauptkunde Gamma | Hoch | 30% | Diversifikation
Commercial | Preisdruck | Mittel | 90% | Kostensenkung
Legal | Compliance-Lücken | Mittel | 20% | Programm läuft
HR | Schlüsselpersonal-Risiko | Mittel | 40% | Retention-Plan
IT | Cyber-Angriff | Hoch | 10% | Security-Update

MANAGEMENT INTERVIEWS VORBEREITUNG:

Position |  | Topics | Duration
---------|-------------|--------|----------
CEO |  | Strategy, Market, Vision | 2h
CFO |  | Financials, Controls | 2h  
COO |  | Operations, Quality | 1.5h
Sales |  | Customers, Pricing | 1h
HR |  | Personnel, Culture | 1h

STANDORT-BESICHTIGUNG CHECKLIST:

Bereich | Punkte | Verantwortlich
--------|--------|----------------
Produktion | Layout, Sauberkeit, 5S | COO
Lager | Bestände, System | Logistik
Labor | Ausstattung, Kalibrierung | QS  
Büro | IT-Infrastruktur | IT
Sicherheit | Brandschutz, Arbeitsschutz | HSE

DATENRAUM ZUGRIFFS-LOG:

User | Login | Views | Downloads | Hot Topics
-----|-------|-------|-----------|------------
Investor A | 25x | 145 | 23 | Financials, Legal
Investor B | 18x | 98 | 15 | Commercial, Tech
Bank | 8x | 45 | 8 | Financials nur
Berater | 42x | 234 | 67 | Alle Bereiche

Q&A LOG TRACKING:

Datum | Investor | Frage | Bereich | Antwort bis | Status
------|----------|--------|---------|-------------|--------
Tag 6 | A | EBITDA Bridge | Financial | Tag 8 | ✓
Tag 7 | B | Kundenwachstum | Commercial | Tag 9 | →  
Tag 7 | A | IT-Roadmap | Technology | Tag 10 | →
Tag 8 | B | Umwelt-Audits | Legal | Tag 11 | →

NÄCHSTE MEILENSTEINE:

Termin | Event | Vorbereitung | Owner
-------|-------|--------------|-------
Tag 12 | Site Visit Investor A | Agenda final | CEO
Tag 13 | Management Presentation | Deck update | CEO/CFO
Tag 15 | Indikative Angebote | Bewertung prep | CFO
Tag 18 | Site Visit Investor B | Lessons learned | CEO
Tag 20 | DD Phase Start | Projekt-Team | CFO

PROJEKT-TEAM:

Rolle | Name | Erreichbarkeit | Backup
------|------|----------------|--------  
DD-Lead |  (CFO) | 24/7 | CEO
Finance | Controller | Mo-Fr 8-18 | CFO
Legal | Dr. Becker | Mo-Fr 9-17 | Kanzlei
Operations |  (COO) | Mo-Sa 7-19 | Produktionsleiter
Commercial |  (Sales) | Mo-Fr 8-18 | Vertriebsleiter

STATUS SUMMARY:
Total Items: 75
Completed: 52 (69%)
In Progress: 18 (24%)
Not Started: 5 (7%)`
  },

  'd08_cfo_kofinanzierungsnachweis.pdf': {
    filename: 'd08_cfo_kofinanzierungsnachweis.pdf',
    title: 'Kofinanzierungsnachweis für Fördermittel-Antrag',
    type: 'document',
    content: `KOFINANZIERUNGSNACHWEIS
Förderprojekt "Digitalisierung Produktion 4.0"

ANTRAGSSTELLER
Firma: Aurion Pumpen Systeme
Anschrift: [Adresse]
Projektnummer: FOR-2025-4711
Antragssumme: 480.000 EUR
Eigenanteil (60%): 288.000 EUR
Förderanteil (40%): 192.000 EUR

PROJEKTÜBERSICHT

Projekttitel: Digitalisierung Produktionslinie A+B
Laufzeit: 18 Monate 
Gesamtvolumen: 480.000 EUR

Investitionsschwerpunkte:
• IoT-Sensorik & Datenerfassung: 180.000 EUR
• MES-System Implementation: 120.000 EUR
• Robotik & Automation: 110.000 EUR
• Qualifikation Mitarbeiter: 70.000 EUR

NACHWEIS KOFINANZIERUNGSFÄHIGKEIT

1. LIQUIDE MITTEL
Kasse & Bankguthaben: 350.000 EUR
Davon verfügbar für Projekt: 120.000 EUR

2. ZUGESAGTE KREDITLINIEN
Hausbank (bestätigt): 200.000 EUR
Davon für Projekt reserviert: 100.000 EUR

3. INVESTOR-COMMITMENT
Strategischer Investor (LOI): 2.000.000 EUR
Davon für Modernisierung: 500.000 EUR
Erwarteter Closing: Q2/2025

4. CASH-FLOW-PROJEKTION

Quartal | Op. Cash Flow | Projekt-Bedarf | Kumuliert
--------|---------------|----------------|----------
Q2 | 85.000 | -60.000 | +25.000
Q3 | 95.000 | -80.000 | +40.000
Q4 | 105.000 | -85.000 | +60.000
Q1 Y+1 | 110.000 | -63.000 | +107.000

Fazit: Kofinanzierung über Operational Cash Flow gedeckt

RISIKOBEWERTUNG & ABSICHERUNG

Hauptrisiken:
1. Investor-Closing verzögert sich
2. Operativer Cash Flow schwächer
3. Projektkosten steigen

Absicherungsmaßnahmen:
1. Zusätzliche Kreditlinie (Backup: 150k EUR)
2. Konservative CF-Planung (-15% Puffer)
3. Projektphasen-Finanzierung

BESTÄTIGUNGEN FINANZIERUNGSPARTNER

HAUSBANK-BESTÄTIGUNG:
"Hiermit bestätigen wir, dass für das o.g. Digitalisierungsprojekt Kreditlinien i.H.v. 200.000 EUR bereitgestellt werden können, vorbehaltlich der üblichen Prüfung."

VKB
i.A. Kundenberater Schmidt
Datum: Tag 7

STEUERBERATER-BESTÄTIGUNG:
"Nach Prüfung der vorgelegten Unterlagen bestätigen wir die Finanzierungsfähigkeit des Kofinanzieru​ngsanteils von 288.000 EUR."

Steuerberatung Dr. Öhrlle & Partner
i.A. Dr. Öhrrle, Steuerberater  
Datum: Tag 8

BEIRATS-STATEMENT:
"Der Beirat der Gesellschaft hat das Digitalisierungsprojekt in seiner Sitzung vom Tag 5 genehmigt und die Kofinanzierung freigegeben."

Prof. Dr. Weber, Beiratsvorsitzender
Datum: Tag 5

ZWISCHENFINANZIERUNG

Falls Fördermittel-Auszahlung verzögert:

Option A - Bankkredit:
Zusätzliche Linie: 190.000 EUR
Zinssatz: 4,8% p.a.
Laufzeit: 12 Monate
Kosten: ca. 8.000 EUR

Option B - Factoring Top-Up:
Zusätzlich verfügbar: 90.000 EUR
Zinssatz: 6,2% p.a.
Sofort verfügbar
Kosten: ca. 4.500 EUR

Option C - Investor Bridge:
Vorabfinanzierung: 200.000 EUR
Zinssatz: 3,5% p.a.
Rückzahlung bei Closing
Kosten: ca. 2.500 EUR

EMPFEHLUNG: Option C (Investor Bridge)

MEILENSTEIN-FINANZIERUNG

Meilenstein | Termin | Projekt-Kosten | Finanzierung
------------|--------|----------------|---------------
MS1: Planung | Q2 | 60.000 | Eigenmittel
MS2: Hardware | Q3 | 80.000 | Bank + Eigenmittel  
MS3: Software | Q4 | 85.000 | Förderung 1. Rate
MS4: Integration | Q1 Y+1 | 63.000 | Förderung 2. Rate
MS5: Schulung | Q2 Y+1 | 45.000 | Förderung 3. Rate
MS6: Rollout | Q3 Y+1 | 47.000 | Förderung final
Puffer | - | 100.000 | Reserve

CONTROLLING & MONITORING

Monatliches Berichtswesen an:
• Fördergeber (Mittelverwendung)
• Hausbank (Kreditlinie)
• Investor (Fortschritt)
• Geschäftsführung (Budget)

KPIs:
- Budget-Einhaltung
- Meilenstein-Termine  
- Liquiditätssituation
- Abruf-Rate Fördermittel

RECHTLICHE HINWEISE

Förderbedingungen:
☑ De-minimis-Regeln beachtet
☑ Beihilferecht konform
☑ Vergaberecht bei Auftragsvergabe
☑ Dokumentationspflichten erfüllt

Verwendungsnachweis:
- Originale Rechnungen
- Zahlungsbelege
- Projektberichte
- Prüfung durch Wirtschaftsprüfer

FAZIT UND ERKLÄRUNG

Hiermit erklären wir verbindlich, dass die Kofinanzierung des beantragten Förderprojekts in Höhe von 288.000 EUR sichergestellt ist. Die notwendigen Mittel stehen zum erforderlichen Zeitpunkt zur Verfügung.

Bei vorzeitigem Projektabbruch oder Nichterhalt der Förderung können wir das Gesamtprojekt aus eigenen Mitteln finanzieren.

[Ort], Tag 8

_____________________        _____________________
CEO                  
Geschäftsführer              Prokurist

ANLAGEN:
- Bankbestätigung Kreditlinie
- Steuerberater-Bestätigung
- Beiratsbeschluss
- LOI Investor (Auszug)
- Liquiditätsplanung 18 Monate


`
  },

  'd08_cfo_foerdermittel_timeline.xlsx': {
    filename: 'd08_cfo_foerdermittel_timeline.xlsx',
    title: 'Fördermittel-Timeline und Prozessübersicht',
    type: 'spreadsheet',
    content: `FÖRDERMITTEL-PROZESS TIMELINE
Projekt: Digitalisierung Produktion 4.0

ÜBERSICHT FÖRDERLANDSCHAFT:


HAUPTANTRAG: DIGITAL JETZT (BMWK):

Phase | Termin | Status | Verantwortlich | Bemerkung
------|--------|--------|----------------|----------
Antragstellung | Tag -15 | ✓ | CFO | Fristgerecht
Vollständigkeitsprüfung | Tag -10 | ✓ | Förderbank | Nachreichung OK
Fachliche Bewertung | Tag -5 bis +10 | → | Gutachter | Läuft
Förderbescheid | Tag +15-20 | □ | Ministerium | Erwartet
1. Auszahlung (40%) | Tag +25 | □ | Bank | Nach Freigabe

DETAILLIERTER PROJEKTPLAN:

Meilenstein | KW | Aktivität | Kosten | Förderung | Eigenanteil
------------|-------|-----------|--------|-----------|-------------
M1 Kick-off | KW10 | Projektstart | 15.000 | 6.000 | 9.000
M2 Analyse | KW12 | IST-Aufnahme | 25.000 | 10.000 | 15.000
M3 Konzept | KW16 | SOLL-Konzept | 35.000 | 14.000 | 21.000
M4 Hardware | KW20 | Beschaffung | 120.000 | 48.000 | 72.000
M5 Software | KW24 | Implementation | 85.000 | 34.000 | 51.000
M6 Integration | KW28 | Inbetriebnahme | 75.000 | 30.000 | 45.000
M7 Schulung | KW32 | MA-Qualifikation | 45.000 | 18.000 | 27.000
M8 Rollout | KW36 | Vollbetrieb | 80.000 | 32.000 | 48.000
SUMME | - | - | 480.000 | 192.000 | 288.000

CASH-FLOW PLANUNG (mit Förderung):

Monat | Projektausgaben | Eigenmittel | Förderabruf | Netto-Bedarf
------|-----------------|-------------|-------------|-------------
Apr  | -15.000 | -9.000 | 0 | -9.000
Mai  | -25.000 | -15.000 | +77.000 | +62.000
Jun  | -35.000 | -21.000 | 0 | -21.000
Jul  | -60.000 | -36.000 | 0 | -36.000
Aug  | -60.000 | -36.000 | +77.000 | +41.000
Sep  | -85.000 | -51.000 | 0 | -51.000
Okt  | -75.000 | -45.000 | 0 | -45.000
Nov  | -45.000 | -27.000 | +38.000 | +11.000
Dez  | -40.000 | -24.000 | 0 | -24.000
Jan  | -40.000 | -24.000 | 0 | -24.000

AUSZAHLUNGSPLAN FÖRDERUNG:

Rate | Anteil | Betrag | Auslöser | Termin (Plan)
-----|--------|--------|----------|-------------
Abschlag | 40% | 76.800 | Bewilligung | Tag +25
Zwischenrate | 40% | 76.800 | MS4 Nachweis | KW22
Schlussrate | 20% | 38.400 | Verwendungsnachweis | KW40
SUMME | 100% | 192.000 | - | -

PARALLELANTRAG: LAND BAYERN

Programm | Digitalisierung Plus | Max. 200k | Quote 40%
---------|---------------------|-----------|----------
Antragsfrist | 31. März  | Noch offen
Fokus | KI & Industrie 4.0 | Passt perfekt
Kombination | Mit Bund möglich | Aufstockung
Einreichung | Tag +5 geplant | Vorbereitung läuft

RISIKOMANAGEMENT:

Risiko | Eintrittsw. | Impact | Mitigation
-------|-------------|--------|------------
Antrag abgelehnt | 30% | -192k | Backup-Finanzierung
Verzögerung Bescheid | 40% | Zinskosten | Bridge-Kredit
Projektkosten steigen | 50% | +50k | Puffer 10%
Förderrückzahlung | 10% | -192k | Compliance strikt

COMPLIANCE & DOKUMENTATION:

Pflicht | Verantwortlich | Rhythmus | Status
--------|----------------|----------|--------
Mittelverwendungsnachweis | CFO | Monatlich | Setup läuft
Projektfortschrittsbericht | Projektleiter | Quartalsweise | Vorlage erstellt
Originalbelege sammeln | Buchhaltung | Laufend | System ready
Wirtschaftsprüfer-Testat | WP | Am Ende | Angebot eingeholt

STEUERLICHE BEHANDLUNG:

Aspekt | Behandlung | Impact | Beratung nötig
-------|------------|--------|---------------
Umsatzsteuer | 19% auf Eigenanteil | +55k | Ja
Ertragsteuer | Förderung steuerfrei | Neutral | Nein
Investitionsabschreibung | Normal möglich | +AfA | Ja
Sonderabschreibung | Zusätzlich 40% | +Steuereffekt | Ja

ALTERNATIVE FÖRDERMÖGLICHKEITEN:

Falls Hauptantrag scheitert:
1. KfW-Digitalisierungskredit (günstig)
2. BAFA-Beratungsförderung (nachgelagert)
3. Regionale Programme (kleiner)
4. Branchenverband-Unterstützung

KOSTEN-NUTZEN FÖRDERUNG:

Aufwand Antragstellung: 40 Stunden
Kosten externe Beratung: 5.000 EUR
Administrativer Mehraufwand: 60 Stunden
Summe Aufwand: 15.000 EUR

Fördervolumen: 192.000 EUR
Netto-Nutzen: 177.000 EUR
ROI Förderantrag: 1.180%

ERFOLGSFAKTOREN:

✓ Frühzeitige Antragstellung
✓ Professionelle Vorbereitung
✓ Vollständige Unterlagen
✓ Kofinanzierung gesichert
✓ Projekt wirtschaftlich sinnvoll
✓ Innovation nachweisbar

KONTAKTE & ANSPRECHPARTNER:

Institution | Ansprechpartner | Telefon | E-Mail
------------|----------------|---------|--------
BMWK | Herr Schmidt | 030-XXX | 
Förderbank | Frau Müller | xxx-XXX | 
Steuerberater | Dr. Öhrrle | xxx-XXX | 
WP | Castrop | xxx-XXX | 

NÄCHSTE SCHRITTE:

Heute (Tag 8):
☐ Kofinanzierungsnachweis final
☐ Landesprogramm prüfen
☐ Bridge-Finanzierung setup

Tag +10:
☐ Bescheid erwarten
☐ Projektstart vorbereiten
☐ Team-Briefing

Tag +15:
☐ Bei Zusage: Kick-off
☐ Bei Absage: Plan B
☐ Stakeholder informieren

Status: Sehr gute Chancen auf Bewilligung
Risiko: Verzögerung um 4-6 Wochen möglich
Empfehlung: Parallel bridge-Finanzierung vorbereiten`
  },

  // OPS - Fehlende Attachments
  'd08_ops_ruestzeitanalyse.xlsx': {
    filename: 'd08_ops_ruestzeitanalyse.xlsx',
    title: 'Rüstzeit-Analyse und Optimierungspotenziale',
    type: 'spreadsheet',
    content: `RÜSTZEITANALYSE - OPTIMIERUNGSPOTENZIALE
Stand: Tag 8

GESAMTÜBERSICHT RÜSTZEITEN:

Maschine | Durchschn. Rüstzeit | Anzahl/Tag | Zeit/Tag | Kosten/Tag
---------|-------------------|------------|----------|------------
CNC-01 | 52 Min | 4 | 208 Min | 122 EUR
CNC-02 | 48 Min | 3 | 144 Min | 84 EUR
CNC-03 | 65 Min | 2 | 130 Min | 76 EUR
Drehbank A | 38 Min | 5 | 190 Min | 111 EUR
Drehbank B | 42 Min | 4 | 168 Min | 98 EUR
Fräse Universal | 75 Min | 2 | 150 Min | 88 EUR
Schleifmaschine | 85 Min | 1 | 85 Min | 50 EUR
SUMME | 58 Min Ø | 21 | 1.075 Min | 629 EUR

RÜSTZEIT-KOMPONENTEN ANALYSE:

Tätigkeit | Zeit Min | % Anteil | Optimierung möglich
----------|----------|----------|--------------------
Werkzeug suchen/holen | 18 | 31% | Hoch (Werkzeugwagen)
Werkzeug wechseln | 12 | 21% | Mittel (Schnellwechsel)
Einstellung/Justage | 15 | 26% | Hoch (Voreinstellung)
Erste Teile prüfen | 8 | 14% | Niedrig (Qualität)
Dokumentation | 3 | 5% | Mittel (Digital)
Sonstiges/Pausen | 2 | 3% | Mittel (Disziplin)
GESAMT | 58 | 100% | -

BEST-PRACTICE BENCHMARKS:

Maschinen-Typ | Unsere Zeit | Branchenschnitt | Best Practice | Gap
--------------|-------------|----------------|---------------|-----
CNC-Bearbeitungszentrum | 55 Min | 42 Min | 28 Min | -27 Min
Drehmaschine | 40 Min | 35 Min | 20 Min | -20 Min
Universalfräse | 75 Min | 58 Min | 35 Min | -40 Min
Schleifmaschine | 85 Min | 68 Min | 45 Min | -40 Min

SMED-ANALYSE (Single Minute Exchange of Die):

Phase | Aktivität | Zeit IST | Extern/Intern | Optimiert
------|-----------|----------|---------------|----------
1 | Auftrag/Zeichnung holen | 5 Min | Extern | 2 Min
2 | Werkzeuge zusammenstellen | 15 Min | Extern | 3 Min
3 | Maschine stoppen | 1 Min | Intern | 1 Min
4 | Alte Werkzeuge ausbauen | 8 Min | Intern | 5 Min
5 | Neue Werkzeuge einbauen | 12 Min | Intern | 8 Min
6 | Einstellungen vornehmen | 10 Min | Intern | 6 Min
7 | Probelauf/Kontrolle | 7 Min | Intern | 5 Min
GESAMT | | 58 Min | | 30 Min

OPTIMIERUNGS-MAßNAHMEN:

Maßnahme | Invest EUR | Einsparung Min | ROI Monate
---------|------------|----------------|------------
Werkzeugwagen je Maschine | 3.000 | -12 | 2
Schnellwechsel-System | 8.000 | -8 | 6  
Voreinstellgeräte | 15.000 | -10 | 8
RFID-Werkzeugverwaltung | 12.000 | -6 | 12
Digitale Rüstkarten | 2.000 | -3 | 4
5S-Arbeitsplätze | 5.000 | -5 | 6
SUMME | 45.000 | -44 Min | 6 Mon Ø

WIRTSCHAFTLICHKEITSBERECHNUNG:

IST-Zustand:
- Rüstvorgänge/Tag: 21
- Durchschn. Rüstzeit: 58 Min
- Rüstzeit/Tag: 1.075 Min = 17,9 Stunden
- Kosten/Stunde Maschinenstillstand: 35 EUR
- Kosten/Tag: 626 EUR
- Kosten/Jahr: 163.760 EUR

SOLL-Zustand (nach Optimierung):
- Rüstvorgänge/Tag: 21
- Durchschn. Rüstzeit: 30 Min (-48%)
- Rüstzeit/Tag: 630 Min = 10,5 Stunden
- Kosteneinsparung/Tag: 311 EUR
- Kosteneinsparung/Jahr: 81.360 EUR

INVESTITION vs. NUTZEN:
- Gesamtinvestition: 45.000 EUR
- Jährlicher Nutzen: 81.360 EUR
- Amortisation: 6,6 Monate
- ROI Jahr 1: 181%

UMSETZUNGSPLAN:

Phase 1 (Wochen 1-2): Quick Wins
☐ 5S an allen Maschinen
☐ Werkzeugwagen beschaffen
☐ Rüstkarten digitalisieren
Invest: 10.000 EUR, Einsparung: 20 Min/Rüstung

Phase 2 (Wochen 3-6): Technische Lösungen
☐ Schnellwechselsysteme
☐ Voreinstellgeräte
☐ RFID-System planen
Invest: 25.000 EUR, Einsparung: weitere 15 Min

Phase 3 (Wochen 7-12): Vollausbau
☐ RFID-System installieren
☐ Schulungen durchführen
☐ KPI-System etablieren
Invest: 10.000 EUR, Einsparung: weitere 9 Min

SCHULUNGSKONZEPT:

Zielgruppe | Inhalt | Dauer | Termin
-----------|--------|-------|--------
Maschinenführer | SMED-Grundlagen | 4h | Woche 1
Einrichter | Technische Details | 8h | Woche 2
Schichtführer | Koordination | 2h | Woche 1
Instandhaltung | Wartung neue Systeme | 6h | Woche 4

ERFOLGSMESSUNG:

KPI | IST | Ziel 3 Mon | Ziel 12 Mon
----|-----|------------|------------
Ø Rüstzeit | 58 Min | 40 Min | 30 Min
Rüstvorgänge/Tag | 21 | 25 | 30
Maschinenverfügbarkeit | 73% | 78% | 83%
OEE Gesamt | 68% | 72% | 78%

RISIKEN UND GEGENSTEUERUNG:

Risiko | Wahrscheinlichkeit | Gegenmaßnahme
-------|-------------------|----------------
MA-Widerstand | Mittel | Frühe Einbindung, Schulung
Technische Probleme | Niedrig | Pilotinstallation
Investitionskosten | Niedrig | Stufenweise Umsetzung
ROI nicht erreicht | Niedrig | Intensives Monitoring

KONTINUIERLICHE VERBESSERUNG:

Monatliches Review:
- Rüstzeiten-Tracking
- Maschinenauslastung
- Kosteneinsparung
- Verbesserungsvorschläge

Quartalsweise:
- Benchmark mit Branche
- Technologie-Update
- Schulungsbedarfsanalyse
- ROI-Kalkulation Update

NÄCHSTE SCHRITTE:

Tag 8:
☑ Analyse abgeschlossen
☐ Investitionsantrag CFO
☐ Projektteam benennen

Tag 10:
☐ Freigabe erhalten
☐ Erste Bestellungen
☐ Pilotmaschine auswählen

Tag 12:
☐ 5S-Training starten
☐ Werkzeugwagen installieren
☐ Erste Messungen

Verantwortlich: Produktionsleitung
Support: Industrial Engineering
Berichtswesen: Wöchentlich an COO`
  },

  'd08_ops_pokayoke_konzept.pdf': {
    filename: 'd08_ops_pokayoke_konzept.pdf',
    title: 'Poka-Yoke Konzept: Fehlervermeidung in der Produktion',
    type: 'document',
    content: `POKA-YOKE KONZEPT
Fehlervermeidung durch narrensichere Konstruktion

ZIELSETZUNG
Reduzierung Ausschuss von 3% auf <1%
Vermeidung Nacharbeit um 80%
Qualitätskostensenkung: 65.000 EUR/Jahr
Zero-Defect-Mindset etablieren

1. IST-ANALYSE FEHLERQUELLEN

Hauptfehlertypen (letzte 6 Monate):
Fehlertyp | Häufigkeit | Kosten EUR | Ursache
----------|------------|------------|----------
Verwechslung | 35% | 22.800 | Ähnliche Teile
Vergessen | 28% | 18.200 | Arbeitsschritt ausgelassen
Falsche Orientierung | 20% | 13.000 | Teil verkehrt eingesetzt
Fehlmontage | 12% | 7.800 | Falsche Reihenfolge
Beschädigung | 5% | 3.200 | Unsachgemäße Handhabung
GESAMT | 100% | 65.000 | -

Top-5 Fehlerstellen:
Station | Fehler/Monat | Typ | Nachwirkung
--------|--------------|-----|-------------
Montage A | 15 | Verwechslung | Kunde reklamiert
Prüfung B | 12 | Vergessen | Nacharbeit 2h
Schweißen | 8 | Orientierung | Ausschuss komplett
Lackierung | 6 | Beschädigung | Neulackierung
Verpackung | 4 | Verwechslung | Falschlieferung

2. POKA-YOKE GRUNDPRINZIPIEN

Typ 1: Kontaktmethode
→ Physische Eigenschaften nutzen
→ Form, Abmessung, Gewicht
→ "Passt nur richtig rein"

Typ 2: Festwertmethode  
→ Bestimmte Anzahl Bewegungen
→ Checklisten, Zähler
→ "Alle Schritte erfüllt?"

Typ 3: Bewegungsschrittmethode
→ Reihenfolge vorgegeben
→ Sequenzielle Freigabe
→ "Erst A, dann B, dann C"

3. GEPLANTE POKA-YOKE LÖSUNGEN

Lösung 1: Verwechslungsschutz Montage A
Problem: 2 ähnliche Buchsen verwechselt
Lösung: Unterschiedliche Aufnahmen (asymmetrisch)
Invest: 1.200 EUR
Nutzen: 15.600 EUR/Jahr

Lösung 2: Vergessensschutz Prüfung B
Problem: Drucktest nicht durchgeführt
Lösung: Pneumatik-Verriegelung + Leuchtanzeige
Invest: 2.800 EUR
Nutzen: 12.400 EUR/Jahr

Lösung 3: Orientierungsschutz Schweißen
Problem: Werkstück falsch eingespannt
Lösung: Formschlüssige Spannvorrichtung
Invest: 1.500 EUR
Nutzen: 8.900 EUR/Jahr

Lösung 4: Beschädigungsschutz Lackierung
Problem: Kratzer durch Aufhängung
Lösung: Weiche Aufnahmen + Führungen
Invest: 800 EUR
Nutzen: 2.200 EUR/Jahr

4. DETAILKONZEPT LÖSUNG 1

Station: Montage Arbeitsplatz A
Fehler: Buchse 4711 vs. 4712 verwechselt

IST-Zustand:
- Buchsen sehen ähnlich aus (Ø22 vs. Ø23)
- In gleichen Behältern
- Nur Teilenummer unterscheidet
- MA muss Nummer lesen + vergleichen

SOLL-Zustand:
- Buchse 4711: Runde Aufnahme
- Buchse 4712: Ovale Aufnahme
- Passt nur in richtige Öffnung
- Visueller Unterschied durch Farbe

Umsetzung:
☐ Aufnahmen konstruieren
☐ Behälter anpassen
☐ Farbkodierung einführen
☐ Arbeitsanweisung anpassen

5. DETAILKONZEPT LÖSUNG 2

Station: Prüfplatz B
Fehler: Drucktest vergessen

IST-Zustand:
- MA soll manuell Drucktest starten
- Kein Zwang, oft Zeitdruck
- Vergessensrate 8%

SOLL-Zustand:
- Werkstück einlegen → automatisch erkannt
- Drucktest startet automatisch
- Ohne OK-Signal keine Entnahme möglich
- LED zeigt Status

Umsetzung:
☐ Näherungsschalter installieren
☐ Pneumatikventil + Verriegelung
☐ Ampel-System einbauen
☐ SPS-Programm erstellen

6. IMPLEMENTIERUNGSPLAN

Woche 1-2: Vorbereitung
☐ Konstruktionszeichnungen
☐ Materialbeschaffung
☐ Fertigungsaufträge
☐ MA-Information

Woche 3-4: Installation
☐ Umbau Station A (Lösung 1)
☐ Umbau Station B (Lösung 2)
☐ Tests & Justage
☐ Schulung MA

Woche 5-6: Rollout
☐ Probebetrieb
☐ Feintuning
☐ Weitere Stationen
☐ Standardisierung

7. ERFOLGSMESSUNG

KPIs vor/nach Umsetzung:
Kennzahl | Vorher | Nachher | Verbesserung
---------|--------|---------|-------------
Fehlerrate | 3,0% | 0,8% | -73%
Nacharbeit h/Monat | 45h | 12h | -73%
Ausschusskosten | 5.400€ | 1.200€ | -78%
Kundenreklamationen | 8/Monat | 2/Monat | -75%

8. WIRTSCHAFTLICHKEIT

2  Stationen: 6.300 EUR
Externe Auditierung: 7.000 EUR
Minimal Test: 2.000 EUR

Jährliche Einsparungen:
- Weniger Ausschuss: 50.400 EUR
- Weniger Nacharbeit`
  },

 
  'd08_ceo_bank_update_praesentation.pdf': {
    filename: 'd08_ceo_bank_update_praesentation.pdf',
    title: 'Bank Update Präsentation: Teilverkauf Status',
    type: 'presentation',
    content: `BANK UPDATE PRÄSENTATION
Teilverkauf & Restrukturierungsstatus
Tag 8 - Vertraulich

AGENDA
1. Restrukturierungsfortschritt
2. Teilverkauf-Status
3. Investor Pipeline
4. Covenant-Situation
5. Nächste Schritte

1. RESTRUKTURIERUNGSFORTSCHRITT

Quick Wins realisiert:
✓ Kostensenkung: -180k EUR/Monat
✓ Working Capital: -12% in 7 Tagen
✓ Liefertreue A-Kunden: 98%
✓ Keine kritischen Personalabgänge

Operative Stabilisierung:
- Produktionsauslastung: 78% (Ziel: 85%)
- Qualität: PPM von 120 auf 95 reduziert
- DSO: 49 Tage (Ziel: 35)
- Cash-Runway: 13 Wochen gesichert

2. TEILVERKAUF-STATUS

Struktur-Optionen:
A) Minority Sale 25%
   - Kontrolle bleibt
   - Fresh Money: 2-3 Mio EUR
   - Closing: 6-8 Wochen

B) Minority Sale 49%
   - Strategischer Partner
   - Fresh Money: 4-5 Mio EUR
   - Synergie-Potenziale

C) Asset Deal Teilbereich
   - Komplexität höher
   - Selective Cherry-Picking
   - Steuervorteile möglich

3. INVESTOR PIPELINE

Investor A (Strategisch):
- LOI erwartet: Tag 15
- Bewertung: 6x EBITDA
- DD-Start: Tag 20
- Synergiepotenzial: Hoch

Investor B (Finanz):
- Erstkontakt positiv
- Site Visit: Tag 18
- Fokus: Turnaround
- Exit-Horizont: 3-5 Jahre

Investor C (Family Office):
- Langfrist-Orientierung
- Regional verwurzelt
- Mittelstand-Erfahrung
- Entscheidung: Q2/2025

4. COVENANT-SITUATION

Status Q1/2025:
                IST    SOLL   Status
EBITDA-Marge:   6,2%   8,0%   🔴
EK-Quote:       18,4%  20,0%  🟡
Net Debt/EBITDA: 3,8x   3,5x   🔴

Bridge zu Compliance:
- Waiver für 6 Monate beantragt
- Meilensteine definiert
- Wöchentliches Reporting
- Beirats-Support gesichert

5. NÄCHSTE SCHRITTE

Bis Tag 15:
☐ Waiver-Dokumentation final
☐ Investor A - LOI verhandeln
☐ Datenraum komplett
☐ Management Präsentation

Erwartungen an Bank:
- Konstruktive Waiver-Verhandlung
- Keine Linienkürzung
- Support bei Investor-Gesprächen
- Flexibilität bei Covenants

KERNBOTSCHAFTEN

✓ Restrukturierung greift
✓ Investor-Interesse hoch
✓ Transparenz gewährleistet
✓ Partnerschaftlicher Ansatz

Fragen & Diskussion

Kontakt:
CEO: xxx-XXX
CFO: 0171-XXX`
  },

  'd08_ceo_investor_alignment_protokoll.docx': {
    filename: 'd08_ceo_investor_alignment_protokoll.docx',
    title: 'Protokoll: Investor Alignment Call',
    type: 'document',
    content: `PROTOKOLL
Investor Alignment Call
Datum: Tag 8, 14:00-15:30 Uhr
Teilnehmer: CEO, CFO, Investor A+B Vertreter

1. BEGRÜSSUNG UND ZIELSETZUNG

CEO eröffnet mit Überblick über Fortschritte seit letztem Kontakt. 
Beide Investoren bestätigen grundsätzliches Interesse.

2. STRUKTURDISKUSSION

Investor A präferiert:
- Minority Stake 49% 
- Aktive Rolle im Beirat
- Gemeinsame Vertriebssynergien
- Technologie-Transfer beidseitig
- Preisvorstellung: 5,5-6,5x EBITDA

Investor B favorisiert:
- Majority Stake möglich
- Hands-off Approach
- Fokus auf Profitabilität
- Exit-Strategie klar
- Preisvorstellung: 4,5-5,5x EBITDA

Konsens-Punkte:
✓ Due Diligence kann parallel laufen
✓ Exklusivität erst ab Signing
✓ Break-up Fee wird diskutiert
✓ W&I-Versicherung sinnvoll

3. INFORMATIONSBEDARF

Gemeinsame Anforderungen:
- 3-Jahres Business Plan Detail
- Kundenprofitabilitätsanalyse  
- Management Assessment extern
- Technologie-Roadmap
- ESG-Compliance Check

Spezifisch Investor A:
- Integrationsmöglichkeiten
- Cross-Selling Potenziale
- F&E Pipeline

Spezifisch Investor B:
- 100-Tage-Plan Post-Closing
- Cost-Cutting weitere Potenziale
- Working Capital Deep-Dive

4. PROZESS UND TIMELINE

Vereinbart:
Tag 10: Teaser Update versenden
Tag 12-14: Management Presentations
Tag 15: Indikative Angebote
Tag 18-20: Site Visits
Tag 20-40: Due Diligence
Tag 45: Binding Offers
Tag 60: Signing angestrebt

5. KRITISCHE ERFOLGSFAKTOREN

Von Investorenseite genannt:
- Banken-Support essentiell
- Keine Schlüsselpersonal-Abgänge
- Kundenbindung A-Segment
- Saubere DD ohne Überraschungen
- Realistische Businessplanung

6. OFFENE PUNKTE

Zu klären bis Tag 10:
? Vendor DD Report Umfang
? Data Room Zugangsregelungen
? Q&A Prozess Definition
? Consent-Requirements Bank
? Management Incentive Plan

7. NÄCHSTE SCHRITTE

CEO/CFO:
☐ Datenraum finalisieren
☐ Präsentation vorbereiten
☐ Bank informieren
☐ Berater briefen

Investoren:
☐ NDA unterzeichnen (done)
☐ Projektteams benennen
☐ Technical Experts nominieren
☐ Financing Partner einbinden

8. VERTRAULICHKEIT

Alle Parteien bestätigen:
- Strikte Vertraulichkeit
- Keine Mitarbeiterkontakte direkt
- Kommunikation nur über CEO/CFO
- Keine Kundenkontakte ohne Abstimmung

FAZIT

Konstruktiver Austausch. Beide Investoren bleiben im Prozess.
Keine Red Flags identifiziert. Timeline ambitioniert aber machbar.

Nächster Call: Tag 12 vor Präsentationen

Protokoll erstellt: Tag 8, 16:00 Uhr
Verteiler: CEO, CFO, Beirat (Info)

gez. CFO`
  },

  'd08_ceo_retention_programm.pdf': {
    filename: 'd08_ceo_retention_programm.pdf',
    title: 'Retention-Programm für Krisenzeiten',
    type: 'document',
    content: `RETENTION-PROGRAMM
Mitarbeiterbindung in der Restrukturierung

MANAGEMENT SUMMARY

In Krisenzeiten ist der Erhalt von Schlüsselkräften erfolgskritisch.
Dieses Programm definiert gezielte Maßnahmen zur Bindung der 
Top-25 Mitarbeiter während der nächsten 12 Monate.

1. AUSGANGSLAGE

Marktumfeld:
- Wettbewerber werben aktiv ab
- Fachkräftemangel verschärft Situation
- Unsicherheit durch Restrukturierung
- Medienberichterstattung negativ

Interne Situation:
- 3 Kündigungen in Q4/2024
- 5 MA in fortgeschrittenen Gesprächen extern
- Stimmung angespannt aber stabil
- Kernteam noch loyal

2. ZIELGRUPPE DEFINITION

Kategorie A - Mission Critical (10 MA):
- Ohne sie Stillstand in 24h
- Wiederbeschaffung >6 Monate
- Spezialwissen/Kundenkontakte
- Abwerbungsrisiko sehr hoch

Kategorie B - Sehr wichtig (15 MA):
- Signifikante Störung bei Ausfall
- Wiederbeschaffung 3-6 Monate
- Wichtiges Know-how
- Abwerbungsrisiko mittel

Kategorie C - Wichtig (25 MA):
- Temporäre Engpässe bei Ausfall
- Wiederbeschaffung <3 Monate
- Standard-Qualifikation+
- Abwerbungsrisiko gering

3. INSTRUMENTENKASTEN

Finanzielle Anreize:
Instrument | Zielgruppe | Kosten | Wirkung
-----------|------------|--------|----------
Krisenbonus | A | 15k EUR | Hoch
Halteprämie | A+B | 20k EUR | Sehr hoch
Erfolgsbonus | Alle | 30k EUR | Mittel
Sonderzahlung | A | 8k EUR | Mittel

Nicht-monetäre Anreize:
- Karrieregarantie Post-Krise
- Weiterbildungsbudget erhöht
- Flexible Arbeitsmodelle
- Mehr Verantwortung/Projekte
- Direkte CEO-Linie
- Mentoring-Programme

4. KONKRETE MASSNAHMEN

Sofortmaßnahmen (Tag 8-10):
☑ 10 Kritische MA identifiziert
☐ Persönliche CEO-Gespräche
☐ Retention-Bonus A-Kategorie
☐ Karrierepfade aufzeigen

Kurzfristig (Tag 11-30):
☐ B-Kategorie Gespräche
☐ Team-Events "Zusammenhalt"
☐ Success Stories kommunizieren
☐ Weiterbildung starten

Mittelfristig (Monat 2-6):
☐ Quartalsgespräche
☐ Bonus-Auszahlung Tranche 1
☐ Projekt-Verantwortung
☐ Externe Coaches

5. KOMMUNIKATIONSSTRATEGIE

Kernbotschaften:
"Ihr seid die Zukunft des Unternehmens"
"Gemeinsam durch die Krise"
"Danach bessere Positionen"
"Investition in Eure Entwicklung"

Kanäle:
- 1:1 Gespräche (präferiert)
- Team-Meetings
- CEO-Newsletter
- Informelle Treffen

Dos:
✓ Ehrlich über Situation
✓ Perspektive aufzeigen
✓ Wertschätzung zeigen
✓ Schnell handeln

Don'ts:
✗ Unrealistische Versprechen
✗ Öffentliche Listen
✗ Ungleichbehandlung sichtbar
✗ Zu spät reagieren

6. BUDGET UND ROI

Gesamtbudget: 85.000 EUR
Verteilung:
- Sofortboni: 30.000 EUR
- breite Halteprämien: 35.000 EUR
- Retention-Bonus für 10 Schlüsselkräfte: 15.000
- Events/Sonstiges: 5.000 EUR

ROI-Berechnung:
Kosten Fluktuation 1 A-MA: 120.000 EUR
Kosten Programm gesamt: 85.000 EUR
Break-Even: 1 verhinderte Kündigung
Erwartung: 5-8 verhindert = 400% ROI

7. ERFOLGSMESSUNG

KPIs:
- Fluktuation Zielgruppe <5%
- Abwerbungsversuche dokumentiert
- Stimmungsbarometer >70
- Produktivität stabil
- Kundenfeedback positiv

Review-Rhythmus:
- Wöchentlich: A-Kategorie
- Monatlich: B-Kategorie  
- Quartalsweise: Gesamtprogramm

8. RISIKOMANAGEMENT

Wenn MA trotzdem kündigt:
1. Exit-Interview führen
2. Gegnangebot prüfen
3. Saubere Übergabe
4. Nachfolge aktivieren
5. Team stabilisieren
6. Lessons Learned

9. RECHTLICHER RAHMEN

Vertragsgestaltung:
- Rückzahlungsklauseln klar
- Keine sittenwidrige Bindung
- BR-Zustimmung einholen
- Gleichbehandlung beachten
- Steueroptimiert gestalten

10. UMSETZUNGSVERANTWORTUNG

Rolle | Verantwortung | Befugnis
------|---------------|----------
CEO | Gesamt + A-Kategorie | Freigabe alle
HR | Operative Umsetzung | bis 5k EUR
CFO | Budget-Kontrolle | Veto-Recht
Führungskraft | Nominierung | Vorschlag

Start: Sofort
Review: Wöchentlich
Laufzeit: 12 Monate

Freigabe CEO: ________________
Datum: Tag 8`
  },

  'd08_ceo_schluesselkraefte_matrix.xlsx': {
    filename: 'd08_ceo_schluesselkraefte_matrix.xlsx',
    title: 'Schlüsselkräfte-Matrix mit Risikobewertung',
    type: 'spreadsheet',
    content: `SCHLÜSSELKRÄFTE-MATRIX
Kritikalitäts- und Risikobewertung
Stand: Tag 8 - STRENG VERTRAULICH

ÜBERSICHT KATEGORISIERUNG:

Kategorie | Anzahl | Ø-Gehalt | Fluktuationsrisiko | Budget Retention
----------|--------|----------|-------------------|------------------
A - Mission Critical | 10 | 75.000 | Sehr hoch (60%) | 30.000 EUR
B - Sehr wichtig | 15 | 55.000 | Hoch (40%) | 35.000 EUR
C - Wichtig | 25 | 45.000 | Mittel (25%) | 15.000 EUR
D - Standard | 70 | 38.000 | Niedrig (10%) | 5.000 EUR
GESAMT | 120 | 43.000 | 22% Durchschnitt | 85.000 EUR

KATEGORIE A - MISSION CRITICAL (TOP 10):

Nr | Name | Position | Kritikalität | Abwerberisiko | Maßnahme | Budget
---|------|----------|--------------|---------------|----------|--------
1 | Müller, T. | Leiter Produktion | 10/10 | Sehr hoch | CEO-Gespräch + 15k Bonus | 15.000
2 | Schmidt, A. | Key Account Gamma | 10/10 | Hoch | Karrieregarantie + 10k | 10.000
3 | Weber, K. | Entwicklungsleiter | 9/10 | Sehr hoch | Projekt + 12k Bonus | 12.000
4 | Klein, S. | Qualitätsleiter | 9/10 | Mittel | Weiterbildung + 8k | 8.000
5 | Fischer, M. | IT-Leiter | 8/10 | Hoch | Homeoffice + 10k | 10.000
6 | Wagner, L. | Einkaufsleiter | 8/10 | Hoch | Firmenwagen-Upgrade | 5.000
7 | Becker, R. | Controller | 8/10 | Mittel | Entwicklungsplan + 8k | 8.000
8 | Schulz, D. | Vertriebsleiter Süd | 8/10 | Sehr hoch | Provision + 15k | 15.000
9 | Meyer, C. | Produktionsplaner | 7/10 | Hoch | Team-Lead + 10k | 10.000
10 | Hoffmann, J. | Instandhaltungsleiter | 7/10 | Mittel | Fortbildung + 7k | 7.000

RISIKO-MATRIX (Impact vs. Wahrscheinlichkeit):

            Niedrig(1-3) | Mittel(4-6) | Hoch(7-10)
Hoch(7-10)  |     -      | Fischer(5)  | Müller(1), Schmidt(2), Weber(3)
Mittel(4-6) |  Meyer(9)  | Klein(4)    | Wagner(6), Schulz(8)
Niedrig(1-3)|     -      | Becker(7)   | Hoffmann(10)

ABWERBEVERSUCHE DOKUMENTIERT:

Mitarbeiter | Datum | Firma | Angebot | Status | Gegenmaßnahme
------------|-------|-------|---------|---------|---------------
Müller, T. | Tag -5 | Competitor AG | +20% Gehalt | Abgewehrt | Sofortbonus
Schmidt, A. | Tag -8 | TechCorp | Teamleiter | Offen | CEO-Gespräch
Weber, K. | Tag -3 | StartUp | CTO-Position | Kritisch | Karriereplan
Schulz, D. | Tag -10 | Konkurrent | +15% + Auto | Abgewehrt | Provision erhöht

KOMPETENZ-VERFÜGBARKEITS-ANALYSE:

Schlüsselkompetenz | Träger | Backup | Risiko | Maßnahme
-------------------|--------|--------|---------|----------
CNC-Programmierung | Müller + Klein | Wagner | Hoch | Cross-Training
Gamma-Relationship | Schmidt | Niemand | Kritisch | Deputy aufbauen
SAP-Customizing | Fischer | Extern | Mittel | Dokumentation
Qualitätszertifikate | Klein | Berater | Hoch | Stellvertreter
Anlagenwissen Alt | Hoffmann | Niemand | Kritisch | Wissenstransfer

WIEDERBESCHAFFUNGSANALYSE:

Position | Markt-Verfügbarkeit | Einarbeitungszeit | Kosten | Risiko-Score
---------|-------------------|------------------|--------|-------------
Produktionsleiter | 2-3 Kandidaten | 6 Monate | 120k | 9/10
Key Account Manager | 5-8 Kandidaten | 3 Monate | 80k | 7/10
Entwicklungsleiter | 1-2 Kandidaten | 9 Monate | 150k | 10/10
Qualitätsleiter | 3-5 Kandidaten | 4 Monate | 90k | 6/10
IT-Leiter | 10+ Kandidaten | 2 Monate | 70k | 4/10

RETENTIONS-TRACKING:

KW | Gespräche geführt | Maßnahmen | Budget verwendet | Kündigungen | Erfolgsquote
---|------------------|-----------|-----------------|-------------|-------------
1 | 3 | 2 | 15.000 | 0 | 100%
2 | 5 | 4 | 28.000 | 1 | 80%
3 | 2 | 2 | 8.000 | 0 | 100%
Ziel | 10 | 10 | 85.000 | <2 | >80%

MASSNAHMEN-TIMELINE:

Tag | Aktion | Zielgruppe | Verantwortlich | Status
----|--------|------------|----------------|--------
8 | CEO-Gespräche starten | Top-3 | CEO | ☐
9 | Boni-Briefe | Kategorie A | HR | ☐
10 | Team-Event ankündigen | Alle A+B | CEO | ☐
12 | Karrieregespräche | Kategorie B | FK | ☐
15 | Erste Auszahlung | Kategorie A | CFO | ☐
20 | Review & Anpassung | Alle | CEO/HR | ☐

BUDGET-ALLOKATION:

Maßnahme | Budget Plan | Verwendet | Rest | Wirksamkeit
---------|-------------|-----------|------|-------------
Sofortboni | 30.000 | 15.000 | 15.000 | Hoch
Halteprämien | 35.000 | 0 | 35.000 | Ausstehend
Weiterbildung | 15.000 | 3.000 | 12.000 | Mittel
Events | 5.000 | 0 | 5.000 | Geplant
GESAMT | 85.000 | 18.000 | 67.000 | -

STIMMUNGSBAROMETER (1-10 Skala):

Kategorie | Vorwoche | Diese Woche | Trend | Ziel
----------|----------|-------------|-------|------
A - Critical | 5,2 | 6,1 | ↗ | 8,0
B - Wichtig | 5,8 | 6,3 | ↗ | 7,5
C - Standard | 6,0 | 5,9 | → | 7,0
Gesamt | 5,8 | 6,1 | ↗ | 7,5

HANDLUNGSEMPFEHLUNG:

Priorität 1 (Heute):
! Müller sofort CEO-Gespräch
! Schmidt Gegenangebot
! Weber Karriereplan vorlegen

Priorität 2 (Diese Woche):
- Weitere A-Kategorie Gespräche
- Boni-Auszahlung vorbereiten
- Team-Event planen

Priorität 3 (Nächste Woche):
- B-Kategorie einbinden
- Erfolge kommunizieren
- Monitoring intensivieren

Erstellt: Tag 8, 09:00 Uhr
Nächstes Update: Tag 10`
  },

  'd08_ceo_medienresonanz_analyse.pdf': {
    filename: 'd08_ceo_medienresonanz_analyse.pdf',
    title: 'Medienresonanz-Analyse nach TV-Beitrag',
    type: 'document',
    content: `MEDIENRESONANZ-ANALYSE
TV-Beitrag Nachbetrachtung & Social Media Monitoring

EXECUTIVE SUMMARY

Der TV-Beitrag vom Tag 7 hat gemischte Reaktionen ausgelöst.
Reichweite: 45.000 Zuschauer + 12.000 Online.
Tonalität: 40% positiv, 35% neutral, 25% negativ.
Handlungsempfehlung: Gezielte Korrektur einzelner Punkte.

1. QUANTITATIVE ANALYSE

Medium | Reichweite | Interaktionen | Tonalität
-------|------------|---------------|----------
TV Regional | 45.000 | - | Neutral
Online-Stream | 12.000 | 89 Kommentare | Gemischt
Facebook | 3.400 | 156 Reactions | Negativ-Neutral
LinkedIn | 2.100 | 43 Comments | Positiv
Twitter/X | 890 | 34 Retweets | Gemischt
Lokalpresse | 5.000 | 12 Leserbriefe | Kritisch

Gesamt-Reichweite: 68.390 Kontakte
Engagement-Rate: 4,8% (überdurchschnittlich)

2. QUALITATIVE ANALYSE

Positive Aspekte (40%):
✓ "Ehrlicher Umgang mit Krise"
✓ "CEO wirkt kompetent"
✓ "Guter Arbeitgeber kämpft"
✓ "Wichtig für die Region"
✓ "Transparenz lobenswert"

Neutrale Themen (35%):
- Faktische Berichterstattung
- Wirtschaftliche Einordnung
- Branchenvergleiche
- Historische Entwicklung

Kritische Punkte (25%):
✗ "Zahlen wirken geschönt"
✗ "Keine klare Strategie erkennbar"
✗ "Mitarbeiter verunsichert"
✗ "Zu optimistisch"
✗ "Investor = Ausverkauf"

3. FEHLERHAFTE DARSTELLUNGEN

Falsch wiedergegeben:
Thema | TV-Darstellung | Korrekt | Impact
------|----------------|---------|--------
Mitarbeiterzahl | "150 gefährdet" | 120 gesamt | Hoch
Umsatzrückgang | "40% Einbruch" | 28% tatsächlich | Mittel
Investorensuche | "Verzweifelt" | Strategisch geplant | Hoch
Lieferfähigkeit | "Probleme" | 98% A-Kunden | Kritisch

4. INFLUENCER & MEINUNGSFÜHRER

Positiv geäußert:
- IHK-Präsident Weber
- Bürgermeister Klein
- Wirtschaftsredakteur Schulz
- Gewerkschafter Müller

Kritisch/Neutral:
- Blogger "Wirtschaftswacht"
- Konkurrent (anonymer Kommentar)
- Ex-Mitarbeiter Forum

5. SOCIAL MEDIA DETAIL

Facebook-Analyse:
Post | Reach | Engagement | Sentiment
------|-------|------------|----------
TV-Teaser | 1.200 | 45 | Neutral
Hauptbeitrag | 1.800 | 89 | Gemischt
Follow-up | 400 | 22 | Negativ

Top-Kommentare:
"Hoffe, die schaffen das!" (123 Likes)
"Warum keine Staatshilfe?" (67 Likes)
"Investor = Arbeitsplatzabbau!" (89 Likes)

LinkedIn-Resonanz:
- Professioneller Ton
- B2B-Unterstützung
- Kunden zeigen Solidarität
- Fachkräfte interessiert

6. MEDIENANFRAGEN

Eingegangen seit Ausstrahlung:
Medium | Thema | Deadline | Empfehlung
-------|-------|----------|------------
Wirtschaftswoche | Restrukturierung | Tag 12 | Zusagen
Handelsblatt | Mittelstand-Krise | Tag 15 | Prüfen
Radio Bayern | Live-Interview | Tag 9 | Zusagen
Fachmagazin | Investor-Prozess | Tag 20 | Absagen

7. HANDLUNGSEMPFEHLUNGEN

Sofortmaßnahmen (Tag 8):
☐ Faktische Richtigstellung publizieren
☐ Stakeholder-Newsletter versenden
☐ Mitarbeiter-Information
☐ Key Accounts anrufen

Kurzfristig (Tag 9-10):
☐ Radio-Interview vorbereiten
☐ LinkedIn-Artikel CEO
☐ Kunden-Testimonials sammeln
☐ Positive Nachrichten streuen

Mittelfristig:
☐ Medientraining Management
☐ PR-Agentur evaluieren
☐ Crisis Communication Plan
☐ Erfolgs-Stories aufbereiten

8. KERNBOTSCHAFTEN KORREKTUR

Richtigstellung-Entwurf:
"Wir möchten einige Punkte präzisieren:
- 120 Arbeitsplätze, alle gesichert
- Umsatz stabil bei -28% (Branche -35%)
- Investor als Wachstumspartner
- Lieferfähigkeit bei 98%"

9. RISIKEN & CHANCEN

Risiken:
⚠️ Negative Dynamik verselbständigt
⚠️ Kunden verunsichert
⚠️ Mitarbeiter-Abwerbung
⚠️ Bank wird nervös

Chancen:
✓ Öffentlicher Support
✓ Politische Unterstützung
✓ Investor-Aufmerksamkeit
✓ Kundenloyalität zeigen

10. MONITORING FORTFÜHRUNG

Tägliches Tracking:
- Google Alerts aktiv
- Social Media Dashboard
- Pressespiegel digital
- Kundenfeedback sammeln

KPIs:
- Sentiment-Verbesserung auf 60% positiv
- Reichweite Korrektur >20.000
- Keine negativen Folgeartikel
- MA-Stimmung stabil

FAZIT

Situation kontrollierbar. Schnelle, faktenbasierte Korrektur 
notwendig. Proaktive Kommunikation fortsetzen. 
Erfolge stärker herausstellen.

Nächste Review: Tag 10
Verantwortlich: CEO/Head of Communications Imelda Sanches`
  },

  'd08_cfo_covenant_bridge_berechnung.xlsx': {
    filename: 'd08_cfo_covenant_bridge_berechnung.xlsx',
    title: 'Covenant Bridge Berechnung Q2-Q3 ',
    type: 'spreadsheet',
    content: `COVENANT BRIDGE BERECHNUNG
Weg zur Covenant-Compliance Q3

ÜBERSICHT COVENANT-ENTWICKLUNG:

Covenant | Q4 Y-1 Ist | Q1Y0 Ist | Q2Y0 Plan | Q3Y0 Ziel | Bank-Limit | Status
---------|-----------|-----------|-------------|------------|------------|--------
EBITDA-Marge | 7,1% | 6,2% | 7,3% | 8,5% | >8,0% | 🔴→🟢
EK-Quote | 19,2% | 18,4% | 19,8% | 21,5% | >20,0% | 🟡→🟢
Net Debt/EBITDA | 3,5x | 3,8x | 3,3x | 2,9x | <3,5x | 🔴→🟢
DSO (Tage) | 45 | 49 | 40 | 35 | <40 | 🔴→🟢
Current Ratio | 1,15 | 1,08 | 1,18 | 1,25 | >1,2 | 🔴→🟢

EBITDA-MARGE BRIDGE (in %):

Q1/25 Ausgangswert: 6,2%

Maßnahme | Impact | Kumuliert | Timing
---------|--------|-----------|--------
Kostensenkung Personal | +0,4% | 6,6% | Ab Tag 10
Materialkosten optimiert | +0,3% | 6,9% | Ab Tag 15
Energieeffizienz | +0,2% | 7,1% | Ab Tag 20
Preiserhöhung B-Kunden | +0,5% | 7,6% | Ab Tag 25
C-Kunden Portfolio | +0,3% | 7,9% | Ab Tag 30
Produktivität +5% | +0,4% | 8,3% | Ab Tag 40
Sonstige Quick Wins | +0,2% | 8,5% | Ab Tag 45

Q3 Zielwert: 8,5% ✓

EIGENKAPITALQUOTE BRIDGE:

Q1: 18,4% (EK: 3,68 Mio / Bilanzsumme: 20 Mio)

Maßnahme | EK-Effekt | BS-Effekt | Neue Quote
---------|-----------|-----------|------------
Gewinn Q2 | +150k | +150k | 18,8%
Investor Fresh Money | +2.000k | +2.000k | 20,5%
Gewinn Q3 | +200k | +200k | 20,9%
Working Capital Opt. | 0 | -400k | 21,5%

Q3: 21,5% ✓

NET DEBT/EBITDA BRIDGE:

Komponente | Q1/25 | Veränderung | Q3
-----------|--------|-------------|-------
Gross Debt | 3,2 Mio | -0,4 Mio | 2,8 Mio
- Cash | 0,4 Mio | +0,8 Mio | 1,2 Mio
= Net Debt | 2,8 Mio | -1,2 Mio | 1,6 Mio
EBITDA (LTM) | 0,74 Mio | +0,26 Mio | 1,0 Mio
Ratio | 3,8x | | 1,6x

Schlüsselfaktoren:
- Debt Paydown: -400k
- Cash-Aufbau: +800k
- EBITDA-Wachstum: +35%

SENSITIVITÄTSANALYSE:

Szenario | EBITDA-M | EK-Quote | ND/EBITDA | Waiver nötig?
---------|----------|----------|-----------|---------------
Base Case | 8,5% | 21,5% | 2,9x | Nein 
Best Case | 9,2% | 22,8% | 2,5x | Nein 
Realistic | 8,1% | 20,8% | 3,1x | Kurz Q2-Q3
Worst Case | 7,2% | 19,5% | 3,7x | Ja, 9 Monate
Stress Test | 6,5% | 18,0% | 4,2x | Ja, Neuverhandlung

KRITISCHE MEILENSTEINE:

Meilenstein | Termin | Impact Covenants | Status | Risiko
------------|--------|------------------|--------|--------
Kostenprogramm wirkt | Tag 15 | +0,4% EBITDA | On Track | Low
Preiserhöhung durch | Tag 25 | +0,5% EBITDA | Geplant | Medium
Investor Closing | Tag 45 | +2,0% EK-Quote | Verhandlung | High
WC-Optimierung | Tag 30 | -0,3x Debt | Läuft | Low
Q2 Ergebnis positiv | Tag 90 | Alle KPIs | Unsicher | Medium

MONATSPROJEKTION DETAIL:

Monat | Umsatz | EBITDA | EBITDA-% | EK-Quote | ND/EBITDA
------|--------|--------|----------|----------|----------
Apr  | 750k | 48k | 6,4% | 18,5% | 3,7x
Mai  | 780k | 55k | 7,1% | 18,7% | 3,5x
Jun  | 810k | 61k | 7,5% | 19,0% | 3,3x
Jul  | 850k | 68k | 8,0% | 20,8% | 3,0x
Aug  | 880k | 75k | 8,5% | 21,2% | 2,8x
Sep  | 900k | 77k | 8,6% | 21,5% | 2,6x

COVENANT-HEADROOM ANALYSE:

Covenant | Limit | Q3 Plan | Headroom | Buffer %
---------|-------|---------|----------|----------
EBITDA-Marge | 8,0% | 8,5% | 0,5% | 6,3%
EK-Quote | 20,0% | 21,5% | 1,5% | 7,5%
Net Debt/EBITDA | 3,5x | 2,9x | 0,6x | 17,1%

Komfort-Level: Ausreichend bei Planumsetzung

MASSNAHMEN-TRACKING:

ID | Maßnahme | Owner | Status | EBITDA | Start | Ende
---|----------|-------|--------|---------|-------|------
M1 | Personalkosten -10% | HR | Aktiv | +0,4% | Tag 5 | Tag 20
M2 | Materialkosten -5% | CFO | Aktiv | +0,3% | Tag 8 | Tag 25
M3 | Energieoptimierung | COO | Plan | +0,2% | Tag 15 | Tag 35
M4 | Preiserhöhung 2% | Sales | Start | +0,5% | Tag 10 | Tag 30
M5 | Portfolio-Bereinigung | CEO | Aktiv | +0,3% | Tag 8 | Tag 40
M6 | Produktivität +5% | COO | Plan | +0,4% | Tag 20 | Tag 60

Gesamtfortschritt: 35% umgesetzt

RISIKOBEWERTUNG:

Risiko | Wahrsch. | Impact | Mitigation
-------|----------|---------|------------
Investor springt ab | 20% | -2% EK | Backup-Investor
Preiserhöhung scheitert | 30% | -0,5% EBITDA | Gestaffelt umsetzen
Großkunde kündigt | 15% | -0,8% EBITDA | Intensivbetreuung
Kostenprogramm verzögert | 25% | -0,3% EBITDA | Verschärfen
Umsatz unter Plan | 35% | -0,6% EBITDA | Vertriebsoffensive

KOMMUNIKATION BANK:

Argumentation für Waiver:
1. Klarer Pfad zu Compliance in Q3
2. Investor-Prozess bestätigt Substanz
3. Operative Maßnahmen greifen bereits
4. Keine strukturellen Probleme
5. Management committed

Waiver-Konditionen (erwartet):
- Laufzeit: 6 Monate (bis 30.09.)
- EBITDA-Marge: Reduktion auf 6%
- Reporting: Wöchentlich
- Meilensteine: Quartalsweise
- Pricing: +50 BP auf Marge

NÄCHSTE SCHRITTE:

☐ Bank-Termin Tag 11 vorbereiten
☐ Q1-Zahlen final attestieren
☐ Maßnahmen-Nachweise sammeln
☐ Investor LOI als Backup
☐ Beirat einbinden`
  },

  'd08_cfo_bestandsanalyse.xlsx': {
    filename: 'd08_cfo_bestandsanalyse.xlsx',
    title: 'Detaillierte Bestandsanalyse für Abverkauf',
    type: 'spreadsheet',
    content: `BESTANDSANALYSE - ABVERKAUFSPOTENZIAL
Identifikation von Langsamdrehern und Ladenhütern

GESAMTBESTAND NACH KATEGORIEN:

Kategorie | Bestand EUR | % Total | Umschlag p.a. | Reichweite | Abverkauf-Potenzial
----------|-------------|---------|---------------|------------|--------------------
A-Material (Schnelldreher) | 450.000 | 35% | 12x | 4 Wochen | 0 (behalten)
B-Material (Normal) | 390.000 | 30% | 6x | 8 Wochen | 50.000
C-Material (Langsamdreher) | 325.000 | 25% | 2x | 26 Wochen | 180-200.000
D-Material (Ladenhüter) | 95.000 | 7% | 0,5x | 104 Wochen | 85.000
E-Material (Obsolet) | 40.000 | 3% | 0x | Nie | 40.000
GESAMT | 1.300.000 | 100% | 5,8x | 9 Wochen | 375.000

LANGSAMDREHER-DETAIL (C-KATEGORIE):

Material-Nr | Bezeichnung | Bestand | Letzter Abgang | Alter Monate | Verwertung
------------|-------------|---------|----------------|--------------|------------
MAT-4711 | Spezialstahl 15CrNi6 | 35.000 | vor 4 Mon | 18 | Verkauf -20%
MAT-4892 | Elektronikbauteile alt | 28.000 | vor 6 Mon | 24 | Verkauf -35%
MAT-5134 | Verpackung Sonder | 22.000 | vor 3 Mon | 12 | Verkauf -15%
MAT-5677 | Chemie Additiv XY | 19.000 | vor 5 Mon | 20 | Verkauf -25%
MAT-6234 | Halbfertigteile | 31.000 | vor 2 Mon | 9 | Intern nutzen
[... weitere 45 Positionen]

LADENHÜTER-DETAIL (D-KATEGORIE):

Material | Bestand EUR | Beschaffung | Grund Lagerung | Aktion
---------|-------------|-------------|----------------|--------
Sonderlegierung | 18.000 | 2021 | Projekt gecancelt | Schrottpreis
Altmaschinen-ET | 15.000 | 2020 | Maschine verkauft | eBay
Import-Teile | 12.000 | 2022 | Lieferant gewechselt | Rückgabe prüfen
Prototypen | 10.000 | 2023 | Entwicklung gestoppt | Verschrottung
[... weitere Positionen]

OBSOLET-MATERIAL (E-KATEGORIE):

Typ | Menge | Wert EUR | Entsorgung EUR | Netto-Erlös
----|--------|----------|----------------|------------
Chemikalien abgelaufen | 200kg | 8.000 | -2.000 | 6.000
Elektronikschrott | 500kg | 5.000 | -500 | 4.500
Metallschrott | 2000kg | 12.000 | 0 | 12.000
Verpackung beschädigt | 1000Stk | 6.000 | -1.000 | 5.000
Sonstiges | Diverse | 9.000 | -1.500 | 7.500
SUMME | - | 40.000 | -5.000 | 35.000

ABVERKAUFSSTRATEGIE NACH PRIORITÄT:

Prio | Kategorie | Volumen | Abschlag | Erlös | Timing | Kanal
-----|-----------|---------|----------|-------|---------|-------
1 | Obsolet E | 40.000 | -70% | 12.000 | Sofort | Schrott
2 | Ladenhüter D | 95.000 | -40% | 57.000 | Woche 1 | eBay/Händler
3 | Langsamdreher C1 | 100.000 | -25% | 75.000 | Woche 2 | B2B-Portal
4 | Langsamdreher C2 | 100.000 | -20% | 80.000 | Woche 3 | Direktverkauf
5 | Normalbestand B | 50.000 | -15% | 42.500 | Woche 4 | Kunden

KUNDENSPEZIFISCHE ANGEBOTE:

Kunde | Material-Match | Bestand | Angebotspreis | Potenzial
------|----------------|---------|---------------|----------
TechCorp | Elektronik | 45.000 | -18% | Hoch
Mueller AG | Stahl/Metall | 38.000 | -22% | Mittel
Klein GmbH | Verpackung | 15.000 | -15% | Hoch
Industrie24 | Diverse | 65.000 | -25% | Mittel

CASH-IMPACT SIMULATION:

Szenario | Abverkauf | Abschlag Ø | Erlös | Cash-Timing | P&L Impact
---------|-----------|------------|-------|-------------|------------
Aggressiv | 800.000 | -30% | 280.000 | 2 Wochen | -240.000
Realistisch | 300.000 | -25% | 225.000 | 4 Wochen | -75.000
Konservativ | 200.000 | -20% | 160.000 | 6 Wochen | -40.000
Minimal | 100.000 | -15% | 85.000 | 8 Wochen | -15.000

EMPFEHLUNG: Realistisches Szenario

OPERATIVE UMSETZUNG:

Woche 1: Vorbereitung
☐ Fotodokumentation
☐ Bestandslisten final
☐ Preiskalkulation
☐ Verkaufskanäle setup

Woche 2: Launch
☐ Online-Angebote live
☐ Kunden-Mailing
☐ Händler kontaktieren
☐ Erste Abschlüsse

Woche 3-4: Intensivierung
☐ Preise nachsenken
☐ Paketangebote
☐ Restposten-Deals
☐ Zielerfüllung

ERFOLGSMESSUNG:

KPI | Ziel | Woche 1 | Woche 2 | Woche 3 | Woche 4
----|------|---------|---------|---------|----------
Erlös kumuliert | 225k | 40k | 95k | 160k | 225k
Positionen verkauft | 80% | 20% | 40% | 65% | 80%
Lagerplatz frei | 400m² | 50m² | 150m² | 280m² | 400m²
Cash-Zufluss | 225k | 30k | 70k | 140k | 225k

RISIKEN & MASSNAHMEN:

Risiko | Wahrscheinl. | Impact | Gegenmaßnahme
-------|--------------|---------|---------------
Keine Käufer | Niedrig | Hoch | Mehr Kanäle, Preis senken
Preisverfall | Mittel | Mittel | Mindestpreise definiert
Image-Schaden | Niedrig | Mittel | Professionell kommunizieren
Logistik-Überlastung | Mittel | Niedrig | Externe Unterstützung`
  },

  'd08_cfo_working_capital_weekly.pdf': {
    filename: 'd08_cfo_working_capital_weekly.pdf',
    title: 'Working Capital Weekly Report',
    type: 'document',
    content: `WORKING CAPITAL WEEKLY REPORT
KW 2 - Management Dashboard

EXECUTIVE SUMMARY
Working Capital: 890k EUR (-60k vs. Vorwoche)
Cash Conversion Cycle: 41 Tage (-2 Tage)
Trend: Positiv, aber unter Plan
Fokus: DSO-Reduzierung intensivieren

1. KEY PERFORMANCE INDICATORS

Metrik | Aktuell | Vorwoche | Ziel | Status | Trend
-------|---------|----------|------|--------|-------
DSO | 49 Tage | 51 Tage | 35 | 🔴 | ↘
DIO | 43 Tage | 44 Tage | 30 | 🟡 | ↘
DPO | 51 Tage | 49 Tage | 45 | 🟢 | ↗
CCC | 41 Tage | 46 Tage | 20 | 🔴 | ↘
WC absolut | 890k | 950k | 680k | 🟡 | ↘

2. DSO - FORDERUNGSMANAGEMENT

Altersstruktur Forderungen:
0-30 Tage: 841k EUR (58%)
31-60 Tage: 363k EUR (25%)
61-90 Tage: 174k EUR (12%)
>90 Tage: 72k EUR (5%)
GESAMT: 1.450k EUR

Top-Maßnahmen diese Woche:
✓ Mahnstufe 2 bei 8 Kunden
✓ CEO-Call mit Gamma (95k)
✓ Factoring-Gespräche gestartet
☐ Inkasso für >90 Tage prüfen
☐ Skonto-Anreize erhöhen

Erfolge:
- 120k Eingänge (Ziel: 100k)
- Gamma Teilzahlung zugesagt
- 2 Kunden auf Lastschrift

3. DIO - BESTANDSMANAGEMENT

Bestandsentwicklung:
Rohstoffe: 450k (-20k)
WIP: 320k (+10k)
Fertigwaren: 260k (-30k)
Obsolet: 65k (-5k)
GESAMT: 1.095k (-45k)

Fokus-Aktionen:
✓ C-Teile Abverkauf gestartet
✓ Obsolet-Liste an Schrott
✓ Min-Max-Levels angepasst
☐ Langsamdreher identifiziert
☐ VMI mit Hauptlieferant

4. DPO - VERBINDLICHKEITEN

Fälligkeitsstruktur:
Überfällig: 280k (15%)
Diese Woche: 420k (23%)
1-30 Tage: 650k (35%)
31-60 Tage: 500k (27%)
GESAMT: 1.850k

Strategische Zahlungen:
- Kritische Lieferanten: bezahlt
- Unkritische: Aufschub +14 Tage
- Skonto genutzt: 3.200 EUR
- Ratenzahlung vereinbart: 4 Fälle

5. CASH-FLOW-PROGNOSE

Woche | Eingänge | Ausgänge | Netto | Kum. Cash
------|----------|----------|-------|----------
KW2 | 180k | -165k | +15k | 415k
KW3 | 220k | -190k | +30k | 445k
KW4 | 195k | -210k | -15k | 430k
KW5 | 240k | -185k | +55k | 485k

Kritischer Punkt: KW4
Maßnahme: Factoring-Aktivierung

6. BEREICHS-PERFORMANCE

VERTRIEB (DSO-Verantwortung):
Team | DSO | Ziel | Performance
------|-----|------|------------
Nord | 42 | 35 | 83%
Süd | 38 | 35 | 92%
West | 55 | 35 | 64%
Key Acc. | 62 | 40 | 65%

EINKAUF (DPO-Verantwortung):
Kategorie | DPO | Ziel | Performance
----------|-----|------|------------
Material | 48 | 45 | 107%
Services | 45 | 45 | 100%
Energie | 52 | 30 | 173%
Invest | 62 | 60 | 103%

PRODUKTION (DIO-Verantwortung):
Lager | DIO | Ziel | Performance
------|-----|------|------------
Rohstoff | 35 | 30 | 86%
WIP | 12 | 10 | 83%
Fertig | 28 | 20 | 71%

7. AKTIONSPLAN KW3

Priorität | Maßnahme | Owner | Impact
---------|----------|-------|--------
1 | Gamma-Zahlung sichern | CEO | -95k DSO
2 | Factoring aktivieren | CFO | -200k DSO
3 | C-Teile Verkauf | COO | -150k DIO
4 | Zahlungsziele +5 Tage | Einkauf | +80k DPO

8. RISIKEN & CHANCEN

Risiken:
⚠️ Gamma-Zahlung unsicher
⚠️ Lieferantenlimits kritisch
⚠️ Bestandsabbau zu langsam

Chancen:
✓ Factoring bis 400k möglich
✓ Investor-Cash in Sicht
✓ Saisonales Hoch kommt

9. BENCHMARK

Unternehmen | CCC | DSO | DIO | DPO
------------|-----|-----|-----|-----
Wir | 41 | 49 | 43 | 51
Branche Ø | 35 | 42 | 38 | 45
Best in Class | 18 | 30 | 25 | 37
Gap zu BiC | -23 | -19 | -18 | +14

10. MANAGEMENT ATTENTION

Eskalation erforderlich:
! Kunde West-Tech (42k) droht Insolvenz
! Lieferant StahlAG stoppt bei Nichtzahlung
! Factoring-Vertrag bis Tag 10 nötig

Entscheidungen nötig:
? Inkasso für >90 Tage Forderungen?
? Lagerverkauf unter Buchwert?
? Vorkasse bei Neukunden?

NÄCHSTER REPORT: KW3, Freitag 14:00 Uhr
Verteiler: CEO, CFO, COO, Controlling`
  },

  'd08_cfo_datenraum_struktur.pdf': {
    filename: 'd08_cfo_datenraum_struktur.pdf',
    title: 'Virtueller Datenraum - Strukturierung für DD',
    type: 'document',
    content: `VIRTUELLER DATENRAUM (VDR)
Strukturierung für Investor Due Diligence

ÜBERSICHT

Platform: Drooms
Zugang: 2-Faktor-Authentifizierung
User: Max. 5 je Investor
Tracking: Vollständiges Activity-Log
Status: 75% befüllt

1. DATENRAUM-STRUKTUR

📁 1. FINANCIAL INFORMATION
├── 📁 1.1 Historical Financials
│   ├── 1.1.1 Jahresabschluss Y-3 (testiert)
│   ├── 1.1.2 Jahresabschluss Y-2 (testiert)
│   ├── 1.1.3 Jahresabschluss Y-1 (Entwurf)
│   └── 1.1.4 Lageberichte
├── 📁 1.2 Management Accounts
│   ├── 1.2.1 Monatliche BWA Y-1
│   ├── 1.2.2 Monatliche BWA Y0 YTD
│   ├── 1.2.3 Kostenstellenrechnung
│   └── 1.2.4 Deckungsbeitragsrechnung
├── 📁 1.3 Planning & Forecasting
│   ├── 1.3.1 Budget Y0
│   ├── 1.3.2 3-Jahres-Businessplan
│   ├── 1.3.3 Sensitivitätsanalysen
│   └── 1.3.4 Restrukturierungsplan
└── 📁 1.4 Working Capital
    ├── 1.4.1 Forderungslaufzeiten
    ├── 1.4.2 Verbindlichkeitenspiegel
    └── 1.4.3 Bestandsanalyse

📁 2. LEGAL & COMPLIANCE
├── 📁 2.1 Corporate
│   ├── 2.1.1 Gesellschaftsvertrag
│   ├── 2.1.2 Handelsregister
│   ├── 2.1.3 Gesellschafterliste
│   └── 2.1.4 Organigramm
├── 📁 2.2 Material Contracts
│   ├── 2.2.1 Kundenverträge TOP-10
│   ├── 2.2.2 Lieferantenverträge
│   ├── 2.2.3 Mietverträge
│   └── 2.2.4 Versicherungen
└── 📁 2.3 Compliance
    ├── 2.3.1 Compliance-Richtlinien
    ├── 2.3.2 Datenschutz-Dokumentation
    └── 2.3.3 Zertifikate (ISO etc.)

📁 3. COMMERCIAL
├── 📁 3.1 Customers
│   ├── 3.1.1 Kundenliste komplett
│   ├── 3.1.2 Umsatz-Analyse 5 Jahre
│   ├── 3.1.3 Pipeline-Report
│   └── 3.1.4 Kundenzufriedenheit
├── 📁 3.2 Products & Services
│   ├── 3.2.1 Produktkatalog
│   ├── 3.2.2 Preislisten
│   └── 3.2.3 Technische Spezifikationen
└── 📁 3.3 Market & Competition
    ├── 3.3.1 Marktanalyse
    ├── 3.3.2 Wettbewerbsübersicht
    └── 3.3.3 USP-Dokumentation

📁 4. OPERATIONS
├── 📁 4.1 Production
│   ├── 4.1.1 Kapazitätsanalyse
│   ├── 4.1.2 Maschinenpark
│   └── 4.1.3 Produktionsprozesse
├── 📁 4.2 Quality
│   ├── 4.2.1 QM-Handbuch
│   ├── 4.2.2 Reklamationsstatistik
│   └── 4.2.3 Audit-Berichte
└── 📁 4.3 IT & Technology
    ├── 4.3.1 IT-Infrastruktur
    ├── 4.3.2 Software-Lizenzen
    └── 4.3.3 Cybersecurity-Audit

📁 5. HUMAN RESOURCES
├── 5.1 Mitarbeiterliste (anonymisiert)
├── 5.2 Organigramm Detail
├── 5.3 Gehaltsstrukturen
├── 5.4 Betriebsvereinbarungen
└── 5.5 Pensionsverpflichtungen

📁 6. ASSETS & IP
├── 6.1 Anlagenspiegel
├── 6.2 Immobilien-Dokumentation
├── 6.3 Patente & Schutzrechte
└── 6.4 Markenrechte

2. ZUGRIFFSRECHTE-MATRIX

Dokument-Typ | Investor A | Investor B | Bank | Berater
-------------|------------|------------|------|----------
Financials | Voll | Voll | Voll | Voll
Legal | Voll | Voll | Eingeschränkt | Voll
Commercial | Voll | Voll | Nein | Voll
Operations | Voll | Eingeschränkt | Nein | Les
HR | Eingeschränkt | Eingeschränkt | Nein | Voll
IP/Assets | Voll | Voll | Übersicht | Voll

3. ACTIVITY TRACKING

User | Logins | Dokumente | Downloads | Verweildauer
-----|--------|-----------|-----------|-------------
Investor A Team | 12 | 89 | 23 | 4,2h
Investor B Team | 8 | 56 | 15 | 2,8h
Bank | 3 | 12 | 5 | 0,5h
Berater | 25 | 234 | 67 | 12,3h

Top-Dokumente nach Views:
1. 3-Jahres-Businessplan (45 Views)
2. Kundenliste (38 Views)
3. Jahresabschluss 2024 (35 Views)
4. Restrukturierungsplan (32 Views)
5. Management Präsentation (28 Views)

4. KRITISCHE DOKUMENTE

Noch fehlend:
⚠️ Steuerliche Außenprüfung Bericht
⚠️ Umweltgutachten Altstandort
⚠️ Management Assessment extern
⚠️ Kundenverträge 2025 (3 Stück)

Problematisch:
🔴 Garantierückstellungen unklar
🔴 Pensionsgutachten veraltet
🔴 Ein Rechtsstreit nicht dokumentiert

5. Q&A MANAGEMENT

Offene Fragen: 18
Beantwortet diese Woche: 12
Durchschnittliche Antwortzeit: 1,8 Tage

Häufigste Themen:
- EBITDA-Adjustments (8 Fragen)
- Kundenkonzentration (5 Fragen)
- Working Capital Normalisierung (5 Fragen)
- Management Retention (4 Fragen)

6. ZEITPLAN

Tag 8-10: Vervollständigung
☐ Fehlende Dokumente hochladen
☐ Rechtsprüfung sensitiv
☐ Zahlen-Update Q1

Tag 11-15: Go-Live
☐ Zugang für Investoren
☐ Kick-off Call
☐ Q&A-Prozess starten

Tag 16-40: DD-Phase
☐ Tägliches Q&A
☐ Expert Calls
☐ Site Visits

7. BEST PRACTICES

Do's:
✓ Klare Ordnerstruktur
✓ Einheitliche Benennung
✓ PDF-Format präferiert
✓ Aktualität sicherstellen
✓ Wasserzeichen verwenden

Don'ts:
✗ Keine unfertigen Dokumente
✗ Keine widersprüchlichen Versionen
✗ Keine unleserlichen Scans
✗ Keine vertraulichen Dritten-Infos
✗ Keine Überladung

8. RED FLAG REPORT

Potenzielle Deal-Breaker:
- Kundenverlust-Risiko Gamma
- Covenant-Breach absehbar
- Schlüsselpersonal-Fluktuation
- Altlasten Umwelt unklar

Vorbereitung:
→ Management-Erklärungen ready
→ Mitigation-Strategien dokumentiert
→ Externe Gutachten beauftragt

9. VENDOR DD REPORT

Status: In Arbeit
Fertigstellung: Tag 12
Umfang: 40 Seiten
Ersteller: PwC

Inhalt:
- Financial Fact Book
- Commercial Assessment
- Operational Review
- Management & Organization

10. TECHNISCHE HINWEISE

Upload-Limits: 100 MB/Datei
Formate: PDF, Excel, Word
Verschlüsselung: 256-bit SSL
Backup: Stündlich
Support: 24/7 Hotline

Admin-Kontakt:
CFO : Admin-Rechte
Controller Pick: Co-Admin
IT Mueller: Technischer Support

Nächstes Update: Tag 10`
  },

  'd08_ops_qualitaetskostenrechnung.xlsx': {
    filename: 'd08_ops_qualitaetskostenrechnung.xlsx',
    title: 'Qualitätskostenrechnung und Fehleranalyse',
    type: 'spreadsheet',
    content: `QUALITÄTSKOSTENRECHNUNG
Analyse und Optimierungspotenziale

ÜBERSICHT QUALITÄTSKOSTEN (Jahresbasis):

Kostenart | Betrag EUR | % vom Umsatz | Branche Ø | Delta | Status
----------|------------|--------------|-----------|--------|--------
Prüfkosten | 145.000 | 1,6% | 1,2% | -0,4% | 🔴
Fehlerkosten intern | 238.000 | 2,6% | 1,5% | -1,1% | 🔴
Fehlerkosten extern | 195.000 | 2,2% | 0,8% | -1,4% | 🔴
Präventionskosten | 42.000 | 0,5% | 1,0% | +0,5% | 🟢
GESAMT | 620.000 | 6,9% | 4,5% | -2,4% | 🔴

DETAILANALYSE FEHLERKOSTEN:

INTERNE FEHLERKOSTEN (238.000 EUR/Jahr):
Fehlerart | Häufigkeit/Jahr | Kosten/Fall | Gesamt EUR | % Anteil
----------|-----------------|-------------|------------|----------
Nacharbeit | 450 | 180 | 81.000 | 34%
Ausschuss | 120 | 420 | 50.400 | 21%
Maschinenstillstand | 85 | 520 | 44.200 | 19%
Materialverlust | 210 | 145 | 30.450 | 13%
Prüfwiederholung | 380 | 85 | 32.300 | 13%

EXTERNE FEHLERKOSTEN (195.000 EUR/Jahr):
Kategorie | Fälle/Jahr | Ø-Kosten | Gesamt EUR | Trend
----------|------------|-----------|------------|-------
Kundenreklamation | 95 | 850 | 80.750 | ↗
Garantieleistung | 42 | 1.200 | 50.400 | →
Rückrufaktion | 2 | 15.000 | 30.000 | ↗
Kulanzleistungen | 120 | 180 | 21.600 | ↗
Pönalen | 8 | 1.500 | 12.000 | →`

  },

  'd08_ops_makeorbuy_analyse.pdf': {
    filename: 'd08_ops_makeorbuy_analyse.pdf',
    title: 'Make-or-Buy Analyse für Engpassteile',
    type: 'document',
    content: `MAKE-OR-BUY ANALYSE
Kurzfristige Entscheidung Engpassteile

MANAGEMENT SUMMARY

Engpassteil 4711-B verursacht Kapazitätsprobleme.
Eigenfertigung: 42 EUR/Stück bei 8h Rüstzeit
Fremdbezug: 47 EUR/Stück (+12%) sofort verfügbar
Empfehlung: 4 Wochen Buy, dann Review

1. AUSGANGSSITUATION

Teil: Präzisionswelle 4711-B
Bedarf: 800 Stück/Monat
Aktuell: 100% Eigenfertigung
Problem: Kapazitätsengpass CNC-03

Auswirkungen Engpass:
- Lieferverzug A-Kunde: 3 Tage
- Überstunden: 450h/Monat
- Maschinenverfügbarkeit: 68%
- Opportunitätskosten: 18k/Monat

2. KOSTENVERGLEICH

MAKE - Eigenfertigung:
Kostenart | EUR/Stück | EUR/Monat
----------|-----------|----------
Material | 18,50 | 14.800
Fertigung | 12,00 | 9.600
Rüstkosten | 4,50 | 3.600
Gemeinkosten | 7,00 | 5.600
SUMME | 42,00 | 33.600

BUY - Fremdbezug:
Kostenart | EUR/Stück | EUR/Monat
----------|-----------|----------
Einkaufspreis | 51,25 | 41.000
Transport | 1,20 | 960
Eingangsprüfung | 0,80 | 640
SUMME | 53,25 | 42.600
Hinweis Hybrid Delta 4000 Euro

3. QUALITATIVE FAKTOREN

Kriterium | Make | Buy | Gewicht | Score
----------|------|-----|---------|-------
Kosten | ++ | + | 25% | Make
Flexibilität | + | ++ | 20% | Buy
Qualität | ++ | + | 20% | Make
Lieferzeit | - | ++ | 15% | Buy
Know-how | ++ | - | 10% | Make
Abhängigkeit | ++ | - | 10% | Make
GESAMT | | | 100% | Make 55/Buy 45

4. LIEFERANTENANALYSE

Lieferant | Preis | Qualität | Lieferzeit | Kapazität | Score
----------|-------|----------|------------|-----------|-------
TechSupply AG | 52,2 | ISO 9001 | 5 Tage | 2000/Mon | 85
Mueller Parts | 56,50 | Gut | 7 Tage | 1500/Mon | 78
Asia Source | 35,00 | Mittel | 21 Tage | 5000/Mon | 65
Premium GmbH | 54,50 | Exzellent | 3 Tage | 800/Mon | 82

Empfehlung: TechSupply AG

5. RISIKOBEWERTUNG

MAKE-Risiken:
- Maschinenausfall → Totalausfall
- Werkzeugbruch → 2 Tage Stillstand
- Fachkräftemangel → Qualitätsprobleme
- Kapazitätsengpass → Lieferverzug

BUY-Risiken:
- Lieferantenausfall → Alternative vorhanden
- Qualitätsprobleme → Eingangsprüfung
- Preiserhöhung → Vertrag 6 Monate
- Know-how-Verlust → Dokumentation

6. SZENARIOANALYSE

Szenario 1: 4 Wochen Buy
- Kosten: +16.000 EUR
- Kapazität frei: 120h
- Opportunität: +45.000 EUR
- Netto-Vorteil: +29.000 EUR

Szenario 2: Dauerhaft Buy
- Jahreskosten: +48.000 EUR
- CNC-03 für A-Teile frei
- Flexibilität erhöht
- Strategisch kritisch

Szenario 3: Hybrid 50/50
- Mehrkosten: +24.000 EUR/Jahr
- Risikominimierung
- Flexibilität optimal
- Komplex in Steuerung

7. ENTSCHEIDUNGSMATRIX

Kriterium | Gewicht | Make | Buy 4W | Hybrid
----------|---------|------|--------|--------
Kosten | 30% | 9 | 7 | 8
Zeit/Kapazität | 25% | 4 | 9 | 7
Qualität | 20% | 9 | 7 | 8
Flexibilität | 15% | 5 | 9 | 8
Risiko | 10% | 6 | 8 | 9
SCORE | 100% | 7,1 | 7,9 | 7,9

8. EMPFEHLUNG

Kurzfristig (4 Wochen):
→ BUY bei TechSupply AG
→ 800 Stück/Monat
→ Festpreis 45 EUR
→ Qualitätsvereinbarung

Begründung:
✓ Sofortige Kapazitätsentlastung
✓ A-Kunden-Liefertreue sichern
✓ Überstunden reduzieren
✓ Test für Langfrist-Option

Parallel:
- Eigenfertigung optimieren
- Rüstzeiten reduzieren
- Alternative Lieferanten
- Hybrid-Modell prüfen

9. UMSETZUNGSPLAN

Tag 8-9: Entscheidung
☐ Management-Freigabe
☐ Lieferant informieren
☐ Vertrag vorbereiten

Tag 10: Start
☐ Erste Bestellung
☐ Qualitätsvereinbarung
☐ Produktionsumstellung

Woche 2-4:
☐ Lieferungen monitoren
☐ Qualität prüfen
☐ Kapazität nutzen

Tag 30: Review
☐ Ergebnisse bewerten
☐ Fortsetzung entscheiden
☐ Optimierung planen

10. CONTROLLING

KPIs Week 1-4:
- Liefertreue Buy-Teile
- Qualität PPM
- Kostendelta vs. Plan
- Freigewordene Kapazität
- Opportunitätsnutzung

Wöchentlicher Report an:
- COO (Verantwortlich)
- CFO (Kosten)
- QM (Qualität)

FAZIT

Buy für 4 Wochen ist wirtschaftlich sinnvoll.
Netto-Vorteil 29.000 EUR trotz höherer Stückkosten.
Langfriststrategie nach Test-Phase entscheiden.

Freigabe: _____________
Datum: Tag 8`
  },

  'd08_ops_lieferantenvergleich.xlsx': {
    filename: 'd08_ops_lieferantenvergleich.xlsx',
    title: 'Lieferantenvergleich für Fremdbezug',
    type: 'spreadsheet',
    content: `LIEFERANTENVERGLEICH
Make-or-Buy Entscheidung Teil 4711-B

ÜBERSICHT LIEFERANTEN:

Lieferant | Land | Zertifizierung | Erfahrung | Referenzen | Status
----------|------|----------------|-----------|------------|--------
TechSupply AG | DE | ISO 9001, TS | 15 Jahre | VW, Bosch | Präferiert
Mueller Parts | DE | ISO 9001 | 8 Jahre | Regional | Backup
Asia Source | CN | ISO 9001 | 5 Jahre | Unbekannt | Reserve
Premium GmbH | CH | ISO 9001, TS | 20 Jahre | Premium | Teuer
Local Precision | DE | Keine | 3 Jahre | Klein | Ausgeschlossen

PREISVERGLEICH (EUR/Stück):

Menge/Monat | TechSupply | Mueller | Asia | Premium | Make (eigen)
------------|------------|---------|------|---------|-------------
100 | 54,00 | 59,50 | 39,00 | 58,00 | 45,00
500 | 53,40 | 57,00 | 39,00 | 55,00 | 43,00
800 | 52,20 | 56,50 | 35,00 | 54,50 | 42,00
1000 | 44,00 | 55,50 | 36,00 | 53,00 | 41,00
2000 | 42,00 | 54,00 | 34,00 | 49,00 | 39,00

LIEFERKONDITIONEN:

Lieferant | Lieferzeit | MOQ | Zahlungsziel | Incoterm | Verpackung
----------|------------|-----|--------------|----------|------------
TechSupply | 5 Tage | 100 | 30 Tage | DAP | Mehrweg
Mueller | 7 Tage | 200 | 14 Tage | EXW | Einweg
Asia | 21 Tage | 1000 | Vorkasse | FOB | See-Container
Premium | 3 Tage | 50 | 45 Tage | DDP | Premium
Local | 10 Tage | 500 | 30 Tage | DAP | Standard

QUALITÄTSBEWERTUNG:

Kriterium | Gewicht | TechSupply | Mueller | Asia | Premium
----------|---------|------------|---------|------|----------
Musterqualität | 25% | 9/10 | 8/10 | 6/10 | 10/10
Zertifikate | 20% | 10/10 | 8/10 | 7/10 | 10/10
Audit-Ergebnis | 20% | 92% | 85% | n/a | 95%
PPM-Zusage | 15% | <50 | <100 | <500 | <25
Prozessfähigkeit | 20% | Cpk 1,67 | Cpk 1,33 | Cpk 1,0 | Cpk 2,0
SCORE | 100% | 9,1 | 8,0 | 6,5 | 9,6

GESAMTKOSTENBETRACHTUNG (TCO):

Kostenart | TechSupply | Mueller | Asia | Premium
----------|------------|---------|------|----------
Stückpreis (800) | 52,25 | 56,50 | 36,00 | 53,00
Transport | 1,20 | 2,00 | 4,50 | 0,50
Eingangsprüfung | 0,80 | 1,20 | 3,00 | 0,30
Kapitalbindung | 0,65 | 0,75 | 2,20 | 0,90
Qualitätsrisiko | 0,50 | 0,80 | 2,50 | 0,25
Verwaltung | 0,85 | 0,85 | 1,80 | 0,85


LIEFERANTENRISIKO-MATRIX:

Risikofaktor | TechSupply | Mueller | Asia | Premium
-------------|------------|---------|------|----------
Ausfallrisiko | Niedrig | Niedrig | Hoch | Sehr niedrig
Qualitätsrisiko | Niedrig | Mittel | Hoch | Sehr niedrig
Lieferrisiko | Niedrig | Niedrig | Sehr hoch | Niedrig
Preisrisiko | Mittel | Mittel | Niedrig | Hoch
Währungsrisiko | Keine | Keine | Hoch (USD) | Mittel (CHF)
Abhängigkeit | Mittel | Mittel | Hoch | Niedrig

KAPAZITÄTSANALYSE:

Lieferant | Max. Kapazität/Mon | Verfügbar | Auslastung | Flexibilität
----------|-------------------|-----------|------------|-------------
TechSupply | 5.000 | 2.000 | 60% | Hoch
Mueller | 3.000 | 1.500 | 50% | Mittel
Asia | 20.000 | 20.000 | 20% | Sehr hoch
Premium | 1.000 | 800 | 20% | Niedrig

VERTRAGSKONDITIONEN:

Aspekt | TechSupply | Mueller | Asia | Premium
-------|------------|---------|------|----------
Mindestlaufzeit | 6 Monate | 3 Monate | 12 Monate | keine
Preisbindung | 6 Monate | 3 Monate | 12 Monate | Monatlich
Mengenflexibilität | ±30% | ±20% | ±10% | ±50%
Kündigungsfrist | 3 Monate | 1 Monat | 6 Monate | 1 Monat
Pönale PPM>100 | 1% Warenwert | keine | keine | 2% Warenwert
Eskalation | 24h | 48h | 5 Tage | 12h

BEWERTUNGSMATRIX (Scoring 1-10):

Kriterium | Gew. | TechSupply | Mueller | Asia | Premium
----------|------|------------|---------|------|----------
Preis | 25% | 8 | 7 | 10 | 5
Qualität | 25% | 9 | 8 | 6 | 10
Lieferperformance | 20% | 9 | 8 | 4 | 10
Flexibilität | 15% | 8 | 7 | 5 | 6
Risiko | 10% | 8 | 8 | 4 | 9
Service | 5% | 9 | 7 | 5 | 10
GESAMT | 100% | 8,5 | 7,6 | 6,2 | 8,1

ENTSCHEIDUNGSEMPFEHLUNG:

Hauptlieferant: TechSupply AG
- Beste Balance Preis/Leistung
- Kurze Lieferzeit
- Hohe Flexibilität
- Akzeptables Risiko

Backup: Mueller Parts
- Schnell aktivierbar
- Ähnliche Konditionen
- Regionaler Partner

Strategie:
1. Start mit TechSupply (80%)
2. Mueller qualifizieren (20%)
3. Nach 4 Wochen Review
4. Ggf. Hybrid-Modell

NÄCHSTE SCHRITTE:

Tag 8: ☐ Entscheidung treffen
Tag 9: ☐ Lieferanten informieren
Tag 10: ☐ Verträge unterzeichnen
Tag 11: ☐ Erste Lieferung
Tag 15: ☐ Qualitätsprüfung
Tag 30: ☐ Performance Review`
  },

  'd08_ops_service_einsatzplan.pdf': {
    filename: 'd08_ops_service_einsatzplan.pdf',
    title: 'Service-Team Einsatzplan für A-Kunden',
    type: 'document',
    content: `SERVICE-TEAM EINSATZPLAN
Vor-Ort-Support für A-Kunden

EXECUTIVE SUMMARY

2 Service-Teams à 2 Techniker
Fokus: 8 A-Kunden
Kosten: 7.000 EUR/Monat
ROI: Kundenbindung + Upselling

1. ZIELSETZUNG

Primärziele:
- Reklamationen um 50% reduzieren
- Kundenzufriedenheit >90%
- Reaktionszeit <4h
- First-Time-Fix-Rate >85%

Sekundärziele:
- Upselling-Potenzial 20k/Monat
- Fehlerprävention
- Kundennähe demonstrieren
- Wettbewerbsvorteil

2. TEAM-STRUKTUR

Team Nord (Hamburg-Berlin):
- Techniker 1: Scarletti (Senior)
- Techniker 2: Parstetter (Junior)
- Fahrzeug: VW Crafter
- Kunden: 4 (Gamma, Delta, Epsilon, Zeta)

Team Süd (München-Stuttgart):
- Techniker 1: Yhilc (Senior)
- Techniker 2: Kuhn (Junior)  
- Fahrzeug: Mercedes Sprinter
- Kunden: 4 (Alpha, Beta, Theta, Iota)

3. KUNDENZUORDNUNG

A-KUNDEN PRIORISIERUNG:

Kunde | Umsatz/Jahr | Reklamationen | Priorität | Team
------|-------------|---------------|-----------|------
Gamma Tech | 850k | 8/Monat | Kritisch | Nord
Alpha Systems | 720k | 5/Monat | Hoch | Süd
Beta Manufacturing | 680k | 3/Monat | Hoch | Süd
Delta Engineering | 550k | 6/Monat | Hoch | Nord
Epsilon GmbH | 480k | 4/Monat | Mittel | Nord
Zeta Industries | 420k | 2/Monat | Mittel | Nord
Theta Corp | 380k | 3/Monat | Mittel | Süd
Iota Solutions | 350k | 1/Monat | Normal | Süd

4. WOCHENEINSATZPLAN

TEAM NORD - WOCHE 1:

Tag | Kunde | Aktivität | Zeit | km
----|-------|-----------|------|----
Mo | Gamma | Präventivwartung | 8h | 120
Di | Delta | Schulung Bediener | 6h | 80
Mi | Epsilon | Reklamation | 4h | 60
Do | Gamma | Prozessoptimierung | 8h | 120
Fr | Zeta | Routine-Check | 4h | 150

TEAM SÜD - WOCHE 1:

Tag | Kunde | Aktivität | Zeit | km
----|-------|-----------|------|----
Mo | Alpha | Reklamation | 6h | 90
Di | Beta | Präventivwartung | 8h | 110
Mi | Alpha | Schulung | 6h | 90
Do | Theta | Qualitätsaudit | 4h | 140
Fr | Iota | Routine-Check | 3h | 180

5. SERVICE-LEISTUNGEN

Standard-Paket:
- Monatlicher Routine-Check
- Hotline-Support 24/7
- Reaktionszeit <4h
- Ersatzteile-Express
- Fernwartung

Premium-Services:
- Wöchentliche Präsenz
- Präventivwartung
- Bediener-Schulung
- Prozessoptimierung
- Sonderteile-Lager

6. AUSRÜSTUNG SERVICE-FAHRZEUGE

Werkzeug-Grundausstattung:
□ Mechanischer Werkzeugsatz
□ Elektrischer Werkzeugsatz
□ Messgeräte (Multimeter, Oszilloskop)
□ Diagnose-Laptop
□ Hydraulik-Werkzeuge

Ersatzteile-Sortiment:
□ Verschleißteile Top-10
□ Elektronik-Komponenten
□ Dichtungen-Set
□ Schmierstoffe
□ Kleinmaterial

Sicherheit/Sonstiges:
□ Arbeitsschutz-Ausrüstung
□ Erste-Hilfe-Set
□ Dokumentation
□ Tablet für Berichte
□ Firmenkleidung

7. KOSTEN-NUTZEN-ANALYSE

Monatliche Kosten:
Personal (2x2 Techniker): 4.800 EUR
Fahrzeuge (Leasing+Betrieb): 1.200 EUR
Material/Ersatzteile: 600 EUR
Sonstiges: 400 EUR
GESAMT: 7.000 EUR (Vollausbaustufe ca. 15k)

Erwarteter Nutzen:
Reklamationsreduktion: 4.000 EUR
Kundenbindung: 8.000 EUR
Upselling: 3.000 EUR
Effizienzgewinn: 2.000 EUR
GESAMT: 17.000 EUR

ROI: 143% monatlich

8. ERFOLGSMESSUNG

KPIs:
- Kundenzufriedenheit (NPS)
- Reklamationsquote
- First-Time-Fix-Rate
- Reaktionszeit
- Verfügbarkeit Anlagen
- Upselling-Quote

Reporting:
- Tagesbericht per App
- Wochenreport Management
- Monatsauswertung Kunden
- Quartalsgespräch Review

9. ESKALATIONSPROZESS

Stufe 1: Techniker vor Ort
→ Lösung < 2h

Stufe 2: Senior-Techniker remote
→ Lösung < 4h

Stufe 3: Entwicklung/QM
→ Lösung < 8h

Stufe 4: Geschäftsleitung
→ Lösung < 24h

10. KOMMUNIKATIONSPLAN

Kundenankündigung:
"Ab sofort bieten wir Ihnen einen exklusiven Vor-Ort-Service. Ihr persönliches Service-Team steht Ihnen mit Rat und Tat zur Seite."

Interne Kommunikation:
- Kick-off Meeting Tag 9
- Wöchentliche Team-Calls
- Monatliches Review
- Quartals-Workshop

Marketing:
- Success Stories sammeln
- Testimonials A-Kunden
- Website-Update
- Newsletter-Artikel

11. RISIKEN UND CHANCEN

Risiken:
⚠️ Techniker-Ausfall
⚠️ Fahrzeugpanne
⚠️ Kunde erwartet zu viel
⚠️ Kosten überschreiten Budget

Chancen:
✓ Alleinstellungsmerkmal
✓ Premium-Preise durchsetzbar
✓ Wettbewerber-Kunden gewinnen
✓ Innovationen gemeinsam entwickeln

12. ROLLOUT-PLAN

Tag 8: Entscheidung
Tag 9: Teams informieren
Tag 10: Fahrzeuge ausrüsten
Tag 11: Kunden-Ankündigung
Tag 12: Start Team Süd
Tag 13: Start Team Nord
Tag 20: Erste Auswertung
Tag 30: Review & Optimierung

Verantwortlich: COO
Projektleiter: Service-Manager`
  },

  'd08_ops_kundenzufriedenheit_report.xlsx': {
    filename: 'd08_ops_kundenzufriedenheit_report.xlsx',
    title: 'Kundenzufriedenheits-Report mit Handlungsfeldern',
    type: 'spreadsheet',
    content: `KUNDENZUFRIEDENHEITS-REPORT
Q4/2024 und Trend Q1/2025

GESAMTÜBERSICHT KUNDENZUFRIEDENHEIT:

Kategorie | Q3/24 | Q4/24 | Q1/25 Plan | Trend | Benchmark
----------|--------|--------|------------|-------|----------
Gesamtzufriedenheit | 72% | 68% | 75% | ↘ | 82%
Produktqualität | 78% | 75% | 80% | ↘ | 85%
Liefertreue | 65% | 62% | 75% | ↘ | 90%
Service | 70% | 71% | 78% | → | 80%
Preis-Leistung | 74% | 70% | 72% | ↘ | 75%
Kommunikation | 68% | 64% | 72% | ↘ | 78%

NET PROMOTER SCORE (NPS):

Kundengruppe | Promoter | Passive | Detraktoren | NPS | Ziel
-------------|----------|---------|-------------|-----|-----
A-Kunden | 35% | 42% | 23% | +12 | +40
B-Kunden | 28% | 48% | 24% | +4 | +30
C-Kunden | 18% | 51% | 31% | -13 | +10
Gesamt | 27% | 47% | 26% | +1 | +30

DETAILANALYSE A-KUNDEN:

Kunde | Umsatz | Zufriedenheit | NPS | Hauptkritik | Risiko
------|--------|---------------|-----|-------------|--------
Gamma Tech | 850k | 62% | -10 | Lieferzeiten | Hoch
Alpha Systems | 720k | 78% | +20 | Preise | Mittel
Beta Manufacturing | 680k | 81% | +30 | - | Niedrig
Delta Engineering | 550k | 58% | -20 | Qualität | Hoch
Epsilon GmbH | 72% | 72% | +10 | Service | Mittel
Zeta Industries | 420k | 85% | +40 | - | Niedrig
Theta Corp | 380k | 69% | 0 | Kommunikation | Mittel
Iota Solutions | 350k | 77% | +15 | Flexibilität | Niedrig

REKLAMATIONSANALYSE:

Reklamationsgrund | Anzahl Q4 | % Anteil | Kosten EUR | Trend
------------------|-----------|----------|------------|-------
Qualitätsmängel | 45 | 38% | 52.000 | ↗
Lieferverzug | 32 | 27% | 28.000 | ↗
Falschlieferung | 18 | 15% | 15.000 | →
Transportschaden | 12 | 10% | 8.000 | ↘
Mengendifferenz | 8 | 7% | 3.000 | →
Sonstiges | 4 | 3% | 2.000 | ↘
GESAMT | 119 | 100% | 108.000 | ↗

KUNDENBEFRAGUNG - WICHTIGKEIT VS. ZUFRIEDENHEIT:

Kriterium | Wichtigkeit | Zufriedenheit | Gap | Priorität
----------|-------------|---------------|-----|----------
Liefertreue | 95% | 62% | -33 | 1
Qualität | 92% | 75% | -17 | 2  
Reaktionszeit | 88% | 68% | -20 | 3
Flexibilität | 85% | 70% | -15 | 4
Preis | 82% | 70% | -12 | 5
Innovation | 78% | 72% | -6 | 6
Beratung | 75% | 73% | -2 | 7
Nachhaltigkeit | 65% | 68% | +3 | 8

BENCHMARK-VERGLEICH:

KPI | Wir | Hauptwettbewerber | Branche Ø | Best in Class
----|-----|-------------------|-----------|---------------
Kundenzufriedenheit | 68% | 75% | 78% | 92%
NPS | +1 | +18 | +22 | +55
Reklamationsquote | 1,3% | 0,8% | 0,9% | 0,3%
Wiederkaufrate | 72% | 81% | 78% | 95%
Kundenabwanderung | 8,5% | 5,2% | 6,0% | 2,1%

KUNDENKOMMENTARE (Auszüge):

Positive:
"Technisch kompetente Beratung"
"Langjährige Partnerschaft geschätzt"
"Qualität wenn geliefert sehr gut"
"Flexibel bei Sonderwünschen"

Negative:
"Liefertermine nicht eingehalten"
"Kommunikation bei Problemen mangelhaft"
"Preiserhöhungen nicht nachvollziehbar"
"Service-Reaktionszeit zu lang"
"Reklamationsbearbeitung zäh"

VERLUSTKUNDENANALYSE:

Kunde | Umsatz p.a. | Grund | Wettbewerber | Rückgewinnbar
------|-------------|-------|--------------|---------------
TechnoServ | 180k | Preis | AsiaSupply | Nein
MicroParts | 95k | Qualität | Konkurrent AG | Vielleicht
BuildCorp | 145k | Lieferzeit | LocalFast | Ja
SystemX | 88k | Service | PremiumTech | Nein

HANDLUNGSFELDER PRIORISIERT:

Priorität 1: Liefertreue verbessern
Maßnahmen:
- Produktionsplanung optimieren
- Sicherheitsbestände A-Kunden
- Echtzeit-Tracking einführen
Budget: 15.000 EUR
Zeithorizont: 4 Wochen

Priorität 2: Qualität stabilisieren
Maßnahmen:
- Poka-Yoke implementieren
- Eingangskontrolle verstärken
- Prozess-FMEA aktualisieren
Budget: 12.000 EUR
Zeithorizont: 6 Wochen

Priorität 3: Kommunikation verbessern
Maßnahmen:
- CRM-System upgraden
- Proaktive Information
- Account Manager Training
Budget: 8.000 EUR
Zeithorizont: 3 Wochen

FORECAST KUNDENZUFRIEDENHEIT:

Monat | Mit Maßnahmen | Ohne Maßnahmen | Delta
------|---------------|----------------|-------
Jan 25 | 68% | 66% | +2
Feb 25 | 71% | 65% | +6
Mrz 25 | 74% | 64% | +10
Apr 25 | 77% | 63% | +14
Mai 25 | 80% | 62% | +18
Jun 25 | 82% | 61% | +21

CUSTOMER JOURNEY SCHMERZPUNKTE:

Phase | Zufriedenheit | Hauptprobleme | Quick Win
------|---------------|---------------|----------
Anfrage | 78% | Reaktionszeit | Chat-Bot
Angebot | 72% | Transparenz | Konfigurator
Bestellung | 68% | Komplexität | Portal
Produktion | 65% | Updates fehlen | Tracking
Lieferung | 62% | Verspätungen | Planung
After-Sales | 71% | Erreichbarkeit | Hotline

AKTIONSPLAN:

Sofort (Tag 8-10):
☐ Task Force Gamma-Kunde
☐ Liefertreue-Dashboard
☐ Service-Teams aktivieren

Kurzfristig (Tag 11-20):
☐ Qualitäts-Offensive
☐ Kunden-Portal Launch
☐ Eskalationsprozess

Mittelfristig (Tag 21-40):
☐ CRM-Upgrade
☐ Schulungsprogramm
☐ NPS-Tracking monatlich

KPI-ZIELE Q2/2025:
- Kundenzufriedenheit: >80%
- NPS: >+25
- Reklamationsquote: <0,8%
- Liefertreue: >95%`
  },

  'd08_ops_lean_konzept.pdf': {
    filename: 'd08_ops_lean_konzept.pdf',
    title: 'Lean Production Konzept - Externe Beratung',
    type: 'document',
    content: `LEAN PRODUCTION KONZEPT
Empfehlung externe Beratungsunterstützung

EXECUTIVE SUMMARY

Produktivitätspotenzial: +25%
Durchlaufzeit: -40%
Bestände: -35%
Investition: 15.000 EUR Beratung
Oder rein Intern: 10.000 EUR
ROI: 6 Monate

1. IST-ANALYSE VERSCHWENDUNG

7 Arten der Verschwendung (Muda):

Verschwendungsart | Beispiele bei uns | Kosten p.a. | Potenzial
------------------|-------------------|-------------|----------
Überproduktion | Lagerbestände C-Teile | 120k | 30k
Wartezeiten | Maschinenstillstand | 180k | 60k
Transport | Innerbetrieblich | 45k | 15k
Überbearbeitung | Zu enge Toleranzen | 65k | 20k
Bestände | WIP zu hoch | 95k | 40k
Bewegung | Ineffiziente Wege | 35k | 12k
Fehler/Nacharbeit | Ausschuss 3% | 160k | 80k
GESAMT | | 700k | 257k

2. LEAN-REIFEGRAD ASSESSMENT

Bereich | Ist-Zustand | Reifegrad | Ziel | Gap
--------|-------------|-----------|------|-----
5S | Teilweise | 2/5 | 4/5 | -2
Standardisierung | Gering | 1/5 | 4/5 | -3
Kontinuierlicher Fluss | Batch | 2/5 | 4/5 | -2
Pull-System | Push | 1/5 | 3/5 | -2
Kaizen-Kultur | Anfänge | 2/5 | 4/5 | -2
Visuelles Management | Wenig | 1/5 | 4/5 | -3
TPM | Reaktiv | 2/5 | 4/5 | -2
Wertstromdesign | Nicht vorhanden | 0/5 | 3/5 | -3

Gesamt-Reifegrad: 1,4/5 (Anfänger)

3. WERTSTROMANALYSE (VALUE STREAM)

Hauptproduktfamilie A:
Prozessschritt | Bearbeitungszeit | Wartezeit | Wertschöpfung
---------------|------------------|-----------|---------------
Wareneingang | 5 min | 120 min | Nein
Lager | 0 min | 2880 min | Nein
Zuschnitt | 15 min | 45 min | Ja
Bearbeitung | 35 min | 180 min | Ja
Montage | 25 min | 90 min | Ja
Prüfung | 10 min | 30 min | Teilweise
Verpackung | 5 min | 15 min | Nein
Versand | 5 min | 240 min | Nein

Gesamt: 100 min Bearbeitung, 3.600 min Durchlaufzeit
Wertschöpfungsanteil: 2,8% (!!)

4. EXTERNES BERATUNGSKONZEPT

Berater: Lean Excellence Consulting
Erfahrung: 15 Jahre, 200+ Projekte
Branchenfokus: Metallverarbeitung
Referenzen: Mittelstand ähnlicher Größe

Phase 1: Assessment (2 Tage)
- Ist-Aufnahme komplett
- Wertstromanalyse
- Potenzialermittlung
- Quick-Win-Identifikation

Phase 2: Konzeption (3 Tage)
- Soll-Wertstrom Design
- Umsetzungsroadmap
- Schulungskonzept
- KPI-System

Phase 3: Pilotierung (5 Tage)
- Pilotlinie auswählen
- 5S implementieren
- Rüstzeitoptimierung
- Erste Erfolge

Phase 4: Rollout (5 Tage verteilt)
- Ausweitung auf Produktion
- Schulung Multiplikatoren
- Standard-Arbeit
- Nachhaltigkeit

5. METHODENBAUKASTEN

Kurzfristig (Quick Wins):
- 5S-Arbeitsplätze
- SMED Rüstoptimierung
- Andon-System
- Visuelles Management

Mittelfristig:
- Kanban-Steuerung
- One-Piece-Flow
- Milk-Run
- TPM-Einführung

Langfristig:
- Pull-Produktion
- Heijunka-Nivellierung
- Jidoka-Automatisierung
- Kaizen-Kultur

6. INVESTITION UND NUTZEN

Beratungskosten:
Tagessatz: 1.200 EUR
15 Tage gesamt: 18.000 EUR
Rabatt Krisenfall: -3.000 EUR
NETTO: 15.000 EUR

Erwarteter Nutzen Jahr 1:
Produktivität +15%: 180k EUR
Bestandsreduktion: 95k EUR
Qualitätsverbesserung: 60k EUR
Durchlaufzeit: 45k EUR
GESAMT: 380k EUR

ROI: 380k / 15k = 25-fach
Payback: < 1 Monat

7. IMPLEMENTIERUNGSFAHRPLAN

Woche 1-2: Assessment & Konzept
☐ Kick-off Workshop
☐ Gemba-Walks
☐ Datenanalyse
☐ Potenziale quantifizieren

Woche 3-4: Pilotlinie
☐ Linie A optimieren
☐ 5S einführen
☐ SMED umsetzen
☐ Erste Messungen

Woche 5-8: Ausrollung
☐ Weitere Linien
☐ Schulungen
☐ Standards etablieren
☐ KPIs tracken

Woche 9-12: Stabilisierung
☐ Feintuning
☐ Problemlösung
☐ Kultur verankern
☐ Selbstständigkeit

8. ERFOLGSFAKTOREN

Critical Success Factors:
✓ Management Commitment
✓ Freistellung Kernteam
✓ Kommunikation transparent
✓ Quick Wins feiern
✓ Widerstände ernst nehmen
✓ Nachhaltigkeit planen

Typische Fehler vermeiden:
✗ Zu viel auf einmal
✗ Nur Berater machen lassen
✗ Alte Denkmuster
✗ Keine Messungen
✗ Rückfall in alte Muster

9. CHANGE MANAGEMENT

Stakeholder | Einstellung | Strategie
-----------|-------------|----------
Geschäftsführung | Positiv | Champion
Produktion MA | Skeptisch | Einbinden
Meister | Neutral | Überzeugen
Betriebsrat | Vorsichtig | Transparenz
Controlling | Positiv | Zahlen zeigen

Kommunikationsplan:
- Wöchentliche Info-Boards
- Monatliche Townhalls
- Success Stories
- Lean-Newsletter
- Shopfloor-Meetings

10. NACHHALTIGKEIT

Nach Beratungsende:
- Lean-Koordinator benennen
- Monatliche Lean-Reviews
- Kontinuierliche Schulung
- Best Practice Austausch
- Audit-System
- Zielvereinbarungen

KPI-Tracking:
- OEE (Ziel: >85%)
- Durchlaufzeit (Ziel: -40%)
- Bestände (Ziel: -35%)
- PPM (Ziel: <50)
- 5S-Audit (Ziel: >4,0)

ENTSCHEIDUNGSVORLAGE

Empfehlung: Beratung beauftragen
Invest: 15.000 EUR
Nutzen Jahr 1: 380.000 EUR
Risiko: Gering bei guter Umsetzung

Alternative: Internes Projekt
Pro: Günstiger, Know-how bleibt
Contra: Langsamer, weniger Expertise

Freigabe: _____________
Datum: Tag 8`
  },

  'd08_ops_kapazitaetsplanung.xlsx': {
    filename: 'd08_ops_kapazitaetsplanung.xlsx',
    title: 'Kapazitätsplanung nach Optimierung',
    type: 'spreadsheet',
    content: `KAPAZITÄTSPLANUNG NACH OPTIMIERUNG
Status Tag 8 - Nach ersten Maßnahmen

MASCHINENKAPAZITÄT ÜBERSICHT:

Maschine | Verfügbar h/Wo | Geplant h/Wo | Auslastung % | Nach Opt. % | Status
---------|----------------|--------------|--------------|-------------|--------
CNC-01 | 120 | 118 | 98% | 92% | 🔴→🟡
CNC-02 | 120 | 108 | 90% | 85% | 🟡→🟢
CNC-03 | 120 | 125 | 104% | 88% | 🔴→🟢
Drehbank A | 80 | 72 | 90% | 82% | 🟡→🟢
Drehbank B | 80 | 68 | 85% | 78% | 🟢→🟢
Fräse Universal | 80 | 78 | 98% | 85% | 🔴→🟢
Montage 1 | 160 | 145 | 91% | 88% | 🟡→🟢
Montage 2 | 160 | 138 | 86% | 83% | 🟢→🟢
Qualitätsprüfung | 80 | 82 | 103% | 95% | 🔴→🟡

EFFEKTE DER OPTIMIERUNG:

Maßnahme | Kapazitätsgewinn h/Wo | Kosteneinsparung EUR/Wo
---------|----------------------|----------------------
Rüstzeitoptimierung | +18 | 630
Layout-Anpassung | +12 | 420
Make-or-Buy Teil 4711 | +15 | 525
Schichtmodell flexibel | +10 | 350
5S-Arbeitsplätze | +8 | 280
GESAMT | +63 h | 2.205 EUR

AUFTRAGSEINLASTUNG KW 2-5:

Kunde | Produkt | KW2 h | KW3 h | KW4 h | KW5 h | Priorität
------|---------|--------|--------|--------|--------|----------
Gamma Tech | Serie A | 45 | 48 | 50 | 45 | 1
Alpha Systems | Serie B | 38 | 42 | 44 | 40 | 2
Beta Manufacturing | Serie C | 30 | 32 | 31 | 29 | 2
Delta Engineering | Serie D | 26 | 28 | 30 | 28 | 3
Epsilon GmbH | Serie E | 22 | 24 | 25 | 23 | 3

FAZIT
Nach Umsetzung der ersten Maßnahmen sinken Überlastungen auf kritischen Anlagen deutlich. Engpässe werden überwacht; Review in KW5.`},


 'd08_hrlegal_stellenbesetzung_kritikalitaet.xlsx_recruiting_freeze_ausnahmen.pdf': {
  filename: 'd08_hrlegal_stellenbesetzung_kritikalitaet.xlsx_recruiting_freeze_ausnahmen.pdf',
  title: 'Stellenbesetzungen',
  type: 'memo',
  content: `Stellen

Stand: Tag 8 – Vertraulich

1. Ausgangslage

Im Zuge der Liquiditätssicherung gilt seit Tag 3 ein Einstellungsstopp (Recruiting Freeze).
Aktuell sind zwei Schlüsselpositionen vakant, die für die Aufrechterhaltung kritischer Geschäftsprozesse erforderlich sind:

Leitung Produktionsplanung (Schnittstelle zu Operations, Kapazitätssteuerung, Liefertermintreue).

Senior Entwicklungsingenieur (Weiterentwicklung Kernprodukt, Sicherstellung Innovationsfähigkeit).

Ein längerfristiger Verzicht gefährdet Stabilität und strategische Handlungsfähigkeit.

2. Dilemma

Freeze beibehalten = maximale Kostendisziplin, aber Risiko von Engpässen und Demotivation.

Bedarf decken = gezielte Ausnahme, aber erhöhte Kosten und Signal an Stakeholder („Kürze vs. Personalaufbau“).

3. Handlungsoptionen

Option A – Ausnahme für 2 Schlüsselrollen  
Inhalt: Zielgerichtete Rekrutierung für die zwei definierten Schlüsselpositionen.  
Wirkung: Sicherung kritischer Prozesse, positives Signal an Fachbereiche.  
Risiko: Kostenbelastung, leichte Irritation bei Bank (Disziplin-Frage).  

Option B – Freeze fortführen  
Inhalt: Keine Neueinstellungen, auch nicht für Schlüsselrollen.  
Wirkung: Strikte Kostendisziplin, positiv bei Bank.  
Risiko: Prozesse gefährdet, Motivationseinbruch bei Teams.  

Option C – Breite Öffnung des Recruitings  
Inhalt: Einstellungsstopp vollständig aufheben, mehrere offene Stellen besetzen.  
Wirkung: Motivation hoch, starke Entlastung in Fachbereichen.  
Risiko: Kostenexplosion, massiver Vertrauensverlust bei Bank und Investoren.  

Option D – Interne Versetzungen priorisieren  
Inhalt: Umlenkung vorhandener Mitarbeitender auf Schlüsselpositionen.  
Wirkung: Kostenneutral, Bankvertrauen bleibt stabil.  
Risiko: Belastung anderer Bereiche, eingeschränkte Wirksamkeit.  

4. Empfehlung (HR/Legal)  

Gezielte Ausnahmen (Option A): Eng gefasst auf 2 Schlüsselrollen, nachvollziehbar begründet und transparent dokumentiert.  

Kommunikation: Klarstellen, dass es sich nicht um eine generelle Aufweichung des Einstellungsstopps handelt, sondern um eng begrenzte Ausnahmen zur Sicherung des Kerngeschäfts.`,
}

};