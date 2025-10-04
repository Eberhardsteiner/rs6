/// src/data/attachmentDay9.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day9Attachments: Record<string, AttachmentContent> = {
  'd09_ceo_term_sheet_strategic_investor.pdf': {
    filename: 'd09_ceo_term_sheet_strategic_investor.pdf',
    title: 'Term Sheet – Strategic Investment Proposal',
    type: 'document',
    content: `STRENG VERTRAULICH / CONFIDENTIAL
    
TERM SHEET
zwischen
TechCap Ventures GmbH ("Investor")
und
[Ihr Unternehmen] ("Gesellschaft")

Datum: [Tag 9]

1. TRANSAKTIONSSTRUKTUR
Der Investor erwirbt 25% der Gesellschaftsanteile für EUR 5.000.000 ("Kaufpreis").

2. MATERIAL ADVERSE CHANGE (MAC) KLAUSEL
Eine wesentliche nachteilige Veränderung ("MAC") liegt vor bei:
- Umsatzrückgang > 20% gegenüber Vorjahresquartal
- EBITDA-Verschlechterung > 30%
- Verlust von A-Kunden (>15% des Gesamtumsatzes)
- Covenant-Breach bei bestehenden Kreditverträgen

Bei Eintritt eines MAC kann der Investor vom Kaufvertrag zurücktreten oder Nachverhandlungen verlangen.

3. ESCROW-MECHANISMUS (Treuhandkonto)
10% des Kaufpreises (EUR 500.000) werden auf ein Treuhandkonto bei der Commerzbank AG hinterlegt für:
- Garantieansprüche (18 Monate)
- Steuerverbindlichkeiten (7 Jahre)
- Kartellrechtliche Risiken (5 Jahre)

4. GOVERNANCE & ZUSTIMMUNGSVORBEHALTE
Folgende Geschäfte bedürfen der Zustimmung des Investors ("Consent Matrix"):
- Investitionen > EUR 100.000
- Personalentscheidungen Geschäftsführung/Prokura
- Aufnahme neuer Finanzierungen > EUR 250.000
- M&A-Transaktionen jeder Art
- Änderung der Geschäftsstrategie

5. EARN-OUT KOMPONENTE
Zusätzliche Kaufpreiszahlung bei Erreichen folgender Meilensteine:
- Jahr 1: EBITDA > EUR 2 Mio. → zusätzlich EUR 500.000
- Jahr 2: EBITDA > EUR 3 Mio. → zusätzlich EUR 750.000
- Jahr 3: Exit-Bewertung > EUR 40 Mio. → zusätzlich EUR 1.000.000

6. DRAG-ALONG / TAG-ALONG RECHTE
- Drag-Along: Bei Verkauf > 50% kann Investor Mitverkauf erzwingen
- Tag-Along: Bei Verkauf durch Altgesellschafter hat Investor Mitverkaufsrecht zu gleichen Konditionen

7. INFORMATION RIGHTS & REPORTING
Monatlich: Management-Report inkl. GuV, Bilanz, Cash-Flow
Quartalsmäßig: Forecast-Update und Abweichungsanalyse
Ad-hoc: Bei wesentlichen Ereignissen innerhalb 48h

8. EXCLUSIVITY & BREAK-UP FEE
6-wöchige Exklusivität ab Unterzeichnung
Break-Up Fee bei Abbruch: EUR 250.000

NÄCHSTE SCHRITTE:
- Due Diligence: 2 Wochen ab Unterzeichnung
- SPA-Verhandlung: parallel zur DD
- Signing: voraussichtlich Tag 20
- Closing: nach Freigabe Kartellamt (ca. 4 Wochen)
Zur Überbückung von Liquiditätsengpässen stellt der Investor der Aurion für 12 Wochen eine Kreditlinie von 500.000 Euro abzüglich 5 % Disagio zur Verfügung (2 % Zinsen fällig bei Rückzahlung).

_______________________        _______________________
Investor                        Gesellschaft`
  },

  'd09_ceo_spa_draft_escrow_provisions.pdf': {
    filename: 'd09_ceo_spa_draft_escrow_provisions.pdf',
    title: 'Share Purchase Agreement – Escrow-Klauseln (Auszug)',
    type: 'document',
    content: `KAUFVERTRAG (SHARE PURCHASE AGREEMENT)
Auszug: Escrow-Bestimmungen

§ 7 TREUHANDKONTO (ESCROW ACCOUNT)

7.1 Einrichtung
Die Parteien vereinbaren die Einrichtung eines Treuhandkontos bei der Commerzbank AG, Frankfurt ("Escrow Agent"). Der Käufer zahlt 10% des Kaufpreises (EUR 500.000) auf das Escrow Account.

7.2 Warranty & Indemnity (W&I) Versicherung
Alternativ zum Escrow kann eine W&I-Versicherung abgeschlossen werden:
- Deckungssumme: EUR 5 Mio. (100% Kaufpreis)
- Selbstbehalt: 1% des Kaufpreises
- Prämie: ca. 1,2-1,8% der Deckungssumme
- Vorteil: Sofortige Liquidität für Verkäufer
- Nachteil: Höhere Transaktionskosten

7.3 Freigabemechanismus
Staffelweise Freigabe der Escrow-Beträge:
- Nach 6 Monaten: 30% (EUR 150.000)
- Nach 12 Monaten: weitere 30% (EUR 150.000)
- Nach 18 Monaten: Restbetrag, vorbehaltlich offener Claims

7.4 Disagio-Regelung bei Zusatzfinanzierung
Bei Aufnahme des zinsgünstigen Darlehens (2% p.a., EUR 500.000):
- Disagio: 5% = EUR 25.000 (sofort fällig)
- Auszahlungsbetrag: EUR 475.000
- Rückzahlung: EUR 500.000 + Zinsen

7.5 Claims-Prozedur
- Anzeigefrist: innerhalb 30 Tagen nach Kenntniserlangung
- Substantiierung: detaillierte Schadensdarstellung mit Belegen
- Dispute Resolution: Schiedsgericht Frankfurt (DIS-Regeln)
- De-minimis-Schwelle: Einzelansprüche < EUR 10.000 werden nicht berücksichtigt
- Basket: Gesamtschaden muss EUR 50.000 übersteigen

7.6 Representations & Warranties (Zusicherungen)
Verkäufer sichert zu:
- Vollständigkeit der Disclosure Letter
- Keine versteckten Verbindlichkeiten (außer in Data Room offengelegt)
- Compliance mit allen wesentlichen Gesetzen
- Keine pending litigation > EUR 50.000
- Richtigkeit der Financial Statements (letzten 3 Jahre)

7.7 MAC-Klausel - Detaillierung
Material Adverse Change löst folgende Rechte aus:
a) Rücktrittsrecht vor Closing
b) Kaufpreisanpassung (Purchase Price Adjustment)
c) Zusätzliche Garantien/Sicherheiten

Nicht als MAC gelten:
- Allgemeine Wirtschaftslage
- Branchenweite Entwicklungen
- Bereits offengelegte Risiken im Data Room`
  },

  'd09_ceo_townhall_agenda_investor.pdf': {
    filename: 'd09_ceo_townhall_agenda_investor.pdf',
    title: 'Townhall Meeting – Agenda Investorenkommunikation',
    type: 'document',
    content: `TOWNHALL MEETING
"Unsere Zukunft gestalten – Transparenz zum Investorenprozess"

Datum: Tag 9, 14:00 Uhr
Ort: Hauptsitz, Große Halle / Teams-Hybrid

AGENDA

1. BEGRÜSSUNG & KONTEXT (CEO, 10 Min.)
- Warum externe Investoren?
- Unsere Verhandlungsposition
- Timeline der kommenden Wochen

2. WAS BEDEUTET DAS KONKRET? (CFO, 15 Min.)
Begriffserklärungen für alle:
- Escrow = Treuhandkonto (Sicherheit für beide Seiten)
- MAC-Klausel = Schutz bei negativen Überraschungen
- Earn-Out = Zusatzzahlung bei Erfolg
- Due Diligence = Tiefenprüfung des Unternehmens
- SPA = Share Purchase Agreement (Kaufvertrag)
- Drag-Along = Mitverkaufspflicht
- Tag-Along = Mitverkaufsrecht

3. AUSWIRKUNGEN AUF DIE BELEGSCHAFT (HR, 10 Min.)
- Keine betriebsbedingten Kündigungen geplant
- Investor will Wachstum, nicht Abbau
- Mitarbeiterbeteiligungsprogramm in Prüfung
- Bestehende Betriebsvereinbarungen bleiben

4. Q&A SESSION (Alle, 20 Min.)
Vorab gesammelte Fragen:
- "Werden unsere Jobs sicher sein?"
- "Ändert sich die Unternehmenskultur?"
- "Was passiert mit unserem Standort?"
- "Gibt es einen neuen CEO?"

5. NÄCHSTE SCHRITTE (CEO, 5 Min.)
- Wöchentliche Updates via Intranet
- Vertrauenspersonen in jeder Abteilung
- Anonyme Fragenbox eingerichtet
- Nächste Townhall in 2 Wochen

KERNBOTSCHAFTEN:
✓ Wir verhandeln aus Position der Stärke
✓ Mehrheit bleibt bei Gründerfamilie (bei 25%-Deal)
✓ Investor bringt Kapital UND Expertise
✓ Fokus auf Wachstum, nicht Kosten
✓ Transparenz ist unser Versprechen
✓ Entscheidung ist noch nicht gefallen

VERTRAULICHKEIT:
Diese Informationen sind streng vertraulich. Keine Weitergabe an Externe, keine Social Media Posts. Bei Presseanfragen: Verweis an CEO-Office.

Ihr Ansprechpartner für Rückfragen:
[Name HR-Leitung]
[Email] | Ext. 500-02`
  },

  'd09_ceo_pr_statement_draft.pdf': {
    filename: 'd09_ceo_pr_statement_draft.pdf',
    title: 'Pressemitteilung (Entwurf) – Strategische Partnerschaft',
    type: 'document',
    content: `PRESSEMITTEILUNG – ENTWURF
[SPERRFRIST: Freigabe nach Signing]

[IHR UNTERNEHMEN] GEWINNT STRATEGISCHEN INVESTOR FÜR WACHSTUMSKURS

[Stadt], [Datum] – Die [Ihr Unternehmen] gibt bekannt, dass TechCap Ventures als strategischer Minderheitsinvestor gewonnen werden konnte. Die Beteiligung von 25% sichert dem mittelständischen Technologieunternehmen Kapital für geplante Wachstumsinitiativen.

"Diese Partnerschaft ist ein Vertrauensbeweis in unsere Technologie und unser Team", erklärt [CEO-Name], Geschäftsführer der [Ihr Unternehmen]. "Mit TechCap Ventures gewinnen wir nicht nur finanziellen Spielraum, sondern auch einen Partner mit tiefem Branchenwissen und internationalem Netzwerk."

STRATEGISCHE VORTEILE DER PARTNERSCHAFT:
- Finanzierung von Produktinnovationen
- Erschließung neuer Märkte in Osteuropa und Asien
- Digitalisierung der Kernprozesse
- Ausbau der Produktionskapazitäten

Die Gründerfamilie behält mit 75% die Mehrheit und damit die unternehmerische Kontrolle. "Uns war wichtig, dass die DNA unseres Familienunternehmens erhalten bleibt", betont [CEO-Name].

TechCap Ventures Managing Partner [Name]: "Wir sind beeindruckt von der Innovationskraft und Resilienz des Unternehmens. Gerade in herausfordernden Zeiten zeigt sich wahre Unternehmensqualität."

ÜBER TECHCAP VENTURES:
TechCap Ventures ist ein führender Growth-Investor im deutschsprachigen Mittelstand mit einem verwalteten Vermögen von über EUR 2 Mrd. Portfolio-Unternehmen profitieren von Expertise in Digitalisierung, Internationalisierung und operativer Exzellenz.

Die Transaktion steht unter dem Vorbehalt der kartellrechtlichen Freigabe und soll bis Ende [Monat] abgeschlossen werden. Über weitere Details wurde Stillschweigen vereinbart.

PRESSEKONTAKT:
Imelda Sanches

Email: imelda.sanches@aurion-ps.com

HINWEIS AN REDAKTION:
Bildmaterial und Factsheet anbei. Interviewanfragen bitte über Pressestelle koordinieren. Sperrfrist beachten!`
  },

  'd09_ceo_mou_industriepartner_draft.pdf': {
    filename: 'd09_ceo_mou_industriepartner_draft.pdf',
    title: 'Memorandum of Understanding – Strategische Kooperation',
    type: 'document',
    content: `MEMORANDUM OF UNDERSTANDING (MOU)
STRATEGISCHE KOOPERATION

zwischen
IndustriePartner AG ("Partner")
und
Aurion Pumpen Systeme ("Gesellschaft")

Präambel:
Die Parteien beabsichtigen eine strategische Zusammenarbeit zur gemeinsamen Markterschließung und Technologieentwicklung.

1. KOOPERATIONSFELDER
1.1 Gemeinsame Produktentwicklung "Next-Gen-Solutions"
1.2 Cross-Selling in jeweiligen Kundenstämmen
1.3 Shared Services: Einkauf, Logistik, IT
1.4 Know-how-Transfer: Lean Production & Digitalisierung

2. WIRTSCHAFTLICHER RAHMEN
- Umsatzpotenzial: EUR 3-5 Mio. p.a. ab Jahr 2
- Cost-Savings durch Synergien: 15-20% in definierten Bereichen
- Revenue-Share-Modell: 70/30 je nach Wertschöpfungsanteil

3. OPTION AUF KAPITALBETEILIGUNG
Partner erhält Option auf 8% Beteiligung zu folgenden Konditionen:
- Ausübungszeitraum: Monat 12-24 der Kooperation
- Bewertung: 8x EBITDA (Durchschnitt letzte 2 Jahre)


4. RECHTLICHE EINORDNUNG
Dieses MOU ist rechtlich NICHT bindend ("non-binding"), außer:
- Vertraulichkeitsklausel (Ziffer 5)
- Exklusivität (Ziffer 6)
- Anwendbares Recht (Ziffer 7)

5. VERTRAULICHKEIT
Strengste Vertraulichkeit über Inhalt und Existenz dieses MOU.
Ausnahmen: Banken, Berater (unter NDA), gesetzliche Pflichten.

6. EXKLUSIVITÄT
90 Tage keine Parallelverhandlungen mit Wettbewerbern des Partners.
Break-up Fee bei Verletzung: EUR 100.000.

7. NÄCHSTE SCHRITTE & TIMELINE
- Tag 10-15: Due Diligence Light
- Tag 16-20: Definitive Agreements drafting
- Tag 21: Signing geplant
- Tag 30: Operative Umsetzung startet

8. ANWENDBARES RECHT
Deutsches Recht, Gerichtsstand .

_______________________        _______________________
IndustriePartner AG             CEO`
  },

  'd09_ceo_okr_crisis_template.pdf': {
    filename: 'd09_ceo_okr_crisis_template.pdf',
    title: 'Crisis OKR Template – 5-Tage-Sprint',
    type: 'document',
    content: `CRISIS MANAGEMENT OKRs
5-TAGE-SPRINT (Tag 9-13)

UNTERNEHMENS-EBENE

OBJECTIVE 1: Liquidität sichern und Bankvertrauen stabilisieren
Key Result 1: Cash-Runway auf 60 Tage erhöhen (aktuell: 35 Tage)
Key Result 2: Bankvertrauen von Score 5 auf 8 steigern
Key Result 3: Working Capital um EUR 500k verbessern

OBJECTIVE 2: Kundenbindung in Krise stärken
Key Result 1: Verlängerungsquote A/B-Kunden >80%
Key Result 2: NPS (Net Promoter Score) von -10 auf +20
Key Result 3: Zero Customer Defections bei Top-10

OBJECTIVE 3: Organisation krisenfest aufstellen
Key Result 1: Employee Engagement Score >60% halten
Key Result 2: Krankenstand <5% (Stressindikator)
Key Result 3: 100% Führungskräfte-Alignment auf Krisenstrategie

ROLLEN-SPEZIFISCHE OKRs

CEO OBJECTIVE: Investorenprozess erfolgreich steuern
KR1: Term Sheet finalisiert und von Board approved
KR2: Positive Due Diligence ohne Deal-Breaker
KR3: Kommunikation ohne Leak oder Missverständnis

CFO OBJECTIVE: Cash-Management optimieren
KR1: Daily Cash Position ±5% Forecast-Genauigkeit
KR2: DSO (Days Sales Outstanding) um 10 Tage reduzieren
KR3: Skontoerträge >EUR 50k realisieren

OPS OBJECTIVE: Lieferfähigkeit trotz Krise sichern
KR1: OTD (On-Time-Delivery) >95% halten
KR2: Qualitätskennzahl <2% Reklamationsquote
KR3: Produktionskosten -5% durch Quick-Wins

HR/LEGAL OBJECTIVE: Compliance & Motivation balancieren
KR1: Zero Compliance-Verstöße in DD-Prüfung
KR2: Betriebsrat-Support für Maßnahmenpaket
KR3: Fluktuationsrisiko <5% bei Schlüsselpersonal

TRACKING & REVIEW
- Daily Stand-up: 8:30 Uhr, max. 15 Min.
- Ampel-Status: Grün/Gelb/Rot je KR
- Blocker sofort eskalieren
- Mid-Sprint-Review: Tag 11
- Retrospektive: Tag 14

ERFOLGSKRITERIEN
✓ Messbar (quantifiziert)
✓ Zeitgebunden (5 Tage)
✓ Ambitious but Achievable
✓ Relevant für Krisenbewältigung
✓ Team-owned (klare Verantwortung)

Tool-Empfehlung: Simple Excel/Teams-Board, keine komplexe Software in der Krise!`
   },

  'd09_cfo_investor_bridge_financing_offer.pdf': {
    filename: 'd09_cfo_investor_bridge_financing_offer.pdf',
    title: 'Bridge Financing Offer – Private Investor',
    type: 'document',
    content: `CONFIDENTIAL
BRIDGE FINANCING PROPOSAL

To: CFO, Aurion
From: CapitalBridge Partners Ltd.
Date: Tag 9
Re: Immediate Liquidity Solution

Dear [CFO-Name],

Following our preliminary discussions, we are pleased to present our bridge financing offer:

FINANCING STRUCTURE:
- Amount: EUR 550,000 available immediately
- Type: Convertible Bridge Loan
- Interest Rate: 15% p.a. (monthly compounding)
- Term: 6 months (extension option +3 months)
- Upfront Fee: EUR 100,000 (deducted from disbursement)

CONVERSION FEATURE:
- Conversion Option: At our discretion within 12 months
- Conversion Price: Lesser of:
  - 20% discount to next equity round
  - EUR 10 Mio. pre-money valuation cap
- Minimum Ownership: 15% (on fully diluted basis)

SECURITY & COVENANTS:
- Senior Secured Position (ranking ahead of bank debt)
- Personal Guarantee from shareholders
- Monthly Reporting Package
- Board Observer Rights
- Veto Rights on new debt >EUR 100k

WARRANT COVERAGE:
Additional warrants for 5% equity at nominal value
Exercise period: 5 years
Anti-dilution: Full-ratchet protection

USE OF PROCEEDS RESTRICTIONS:
✓ Working Capital: max. 60%
✓ Debt Service: max. 30%
✗ Dividends/Distributions: prohibited
✗ Management Bonuses: prohibited
✓ Emergency CapEx: max. 10%

SPECIAL PROVISIONS:
"Pay-to-Play": In case of down-round, non-participating shareholders diluted 2x
Information Rights: Full access to books, records, facilities
Tagalong/Dragalong: As per industry standard
Liquidation Preference: 2x non-participating

TIMING & PROCESS:
- Verbal Commitment: within 24 hours
- Documentation: 48 hours (our lawyers)
- Funding: T+3 after signing
- DD-Light: parallel to documentation

ALTERNATIVE CONSIDERATION:
Should you require only advisory and door-opener fee:
EUR 100,000 upfront for introducing 3 qualified investors
Success Fee: 5% of raised capital
Minimum Engagement: 3 months

This offer expires in 48 hours and is subject to:
- Satisfactory legal review
- No MAC between now and funding
- Exclusive negotiation period

Please note: This is expensive capital, reflecting the risk and urgency. We strongly recommend comparing with other options like:
- Asset-Based Lending (ABL)
- Factoring Enhancement
- Sale-Leaseback arrangements
- Revenue-Based Financing

We remain at your disposal for immediate discussion.

Best regards,
Peter Fullton
Managing Partner
Mobile: [Nummer]
Available 24/7 for this opportunity`
  },

  'd09_cfo_cashflow_variance_analysis': {
    filename: 'd09_cfo_cashflow_variance_analysis',
    title: 'Cash-Flow Variance Analysis Week 1',
    type: 'email',
    content: `CASH-FLOW VARIANCE ANALYSIS
Internes Memo – CEO an CFO
Stand: Tag 9 – Vertraulich

Betreff

Anforderung einer Analyse zur Kalibrierung des Cash-Forecasts

Hintergrund

Die Auswertung der ersten Woche zeigt Abweichungen zwischen Plan- und Ist-Zahlen. Für die weitere Kommunikation mit unserer Hausbank und im Rahmen des wöchentlichen Reportings ist ein belastbarer Cash-Forecast entscheidend.

Die Bank hat wiederholt signalisiert, dass Prognosequalität und Transparenz wesentliche Faktoren für das Vertrauen in unsere Steuerungsfähigkeit sind.

Auftrag an CFO

Bitte legen Sie kurzfristig eine Analyse und Empfehlung zu folgenden Punkten vor:

Abweichungsanalyse Woche 1

Identifizierung der Ursachen (operativ, zahlungsbedingt, systemisch).

Quantifizierung der Abweichungen.

Handlungsoptionen

Tägliche Kalibrierung (höchste Genauigkeit, hoher Aufwand).

Wöchentliche Granularität (ausreichende Präzision, moderater Aufwand).

Keine Kalibrierung (Risiko Vertrauensverlust).

Pilotierung eines externen Tools (Kosten/Nutzen).

Bewertung

Auswirkungen auf Bankvertrauen und Kreditgespräche.

Interner Aufwand vs. entstehender Nutzen.

Finanzielle Effekte (inkl. Zusatzkosten).

Empfehlung

Klare Entscheidungsvorlage mit Begründung, welche Option für APS kurzfristig am sinnvollsten ist.

Hinweis

Bitte stellen Sie die Analyse bis morgen früh bereit, damit wir die Ergebnisse noch vor dem nächsten Bank-Call intern abstimmen können.`
 },

  'd09_cfo_zbb_consulting_proposal.pdf': {
    filename: 'd09_cfo_zbb_consulting_proposal.pdf',
    title: 'Zero-Based Budgeting – Beratungsangebot',
    type: 'document',
    content: `ANGEBOT
ZERO-BASED BUDGETING QUICK-IMPLEMENTATION

An: CFO Aurion
Von: EffiCon Management Consultants GmbH
Datum: Tag 9

Sehr geehrte/r [CFO-Name],

basierend auf unserem Gespräch unterbreiten wir Ihnen unser Fast-Track-Angebot für eine Zero-Based Budgeting (ZBB) Implementation:

1. AUSGANGSLAGE & ZIELSETZUNG
Ihre Situation:
- Akuter Kostendruck durch Liquiditätskrise
- Historisch gewachsene Kostenstrukturen
- Fehlende Transparenz über Wertbeitrag einzelner Aktivitäten

Unser Ziel:
- 15-25% Kostensenkung in indirekten Bereichen
- 10-15% in direkten Kosten (ohne Qualitätsverlust)
- Nachhaltige Kosten-Governance etablieren

2. METHODIK - ZBB IN 5 TAGEN

TAG 1: Baseline & Scoping
- IST-Kostenanalyse (letzte 12 Monate)
- Identifikation der "Sacred Cows" (unantastbar)
- Quick-Win-Identifikation (sofort umsetzbar)

TAG 2-3: Bottom-Up Neubewertung
Jede Ausgabe muss sich rechtfertigen:
- Business Case für jede Kostenstelle
- "Must-have" vs. "Nice-to-have" Klassifizierung
- Alternative Leistungserbringung prüfen

TAG 4: Top-Down Challenge
- Management-Review aller Budgets
- Stretch-Targets definieren
- Trade-offs transparent machen

TAG 5: Implementation Roadmap
- 100-Tage-Plan
- Change-Communication
- KPI-Dashboard Setup

3. ERWARTETE EINSPARUNGEN (konservativ)

KURZFRISTIG (0-30 Tage): EUR 80-120k
- Externe Dienstleister: -30k
- Marketing/Events: -20k
- Beraterhonorare: -15k
- Travel & Entertainment: -15k
- Subscriptions/Software: -10k
- Facility Costs: -10k

MITTELFRISTIG (30-90 Tage): EUR 200-300k
- Prozessoptimierung: -80k
- Einkaufsoptimierung: -60k
- Overhead-Reduktion: -50k
- IT-Konsolidierung: -40k

4. UNSER ANGEBOT

OPTION A: Full-Service (Empfehlung)
- 2 Senior Consultants für 5 Tage
- Kosten: EUR 35.000
- Garantierte Netto-Einsparung: min. EUR 80k (Jahr 1)
- Success Fee: 20% der Einsparungen über EUR 100k
- Zahlungsfrist 8 Wochen

OPTION B: Guided Self-Service  
- 1 Senior Consultant als Coach
- Kosten: EUR 15.000
- Templates & Tools inklusive
- 2x täglich Check-in Calls
- Vorkasse

OPTION C: Tool-Only
- ZBB-Excel-Framework
- Video-Tutorials (8h)
- Kosten: EUR 3.000
- Email-Support

5. KRITISCHE ERFOLGSFAKTOREN

Was wir von Ihnen brauchen:
✓ C-Level Sponsorship (CEO muss dahinterstehen)
✓ Transparente Kommunikation ("Kosten, nicht Köpfe")
✓ Dediziertes Projektteam (mind. 3 Personen)
✓ Zugang zu allen Finanzdaten
✓ Schnelle Entscheidungen

Typische Widerstände und unsere Antworten:
- "Das haben wir immer so gemacht" → Paradigmenwechsel nötig
- "Ohne geht es nicht" → Alternativen existieren immer
- "Die Mitarbeiter rebellieren" → Change Story wichtig
- "Qualität leidet" → Richtige Prioritäten setzen

6. REFERENZEN (anonymisiert)
- Maschinenbau, 500 MA: -22% Kosten, +5% EBITDA
- Automotive Zulieferer, 300 MA: -18% Kosten in 6 Wochen
- Tech-Mittelstand, 200 MA: EUR 2.5 Mio. Einsparung p.a.

7. QUICK-WINS VORAB (kann sofort gestartet werden)
□ Alle Abonnements kündigen und neu rechtfertigen
□ Hiring Freeze außer erfolgskritische Positionen  
□ Discretionary Spending Stop (Genehmigungspflicht)
□ Lieferantenkonditionen: 10% Nachlass fordern
□ Interne Services: Make-or-Buy-Analyse

NÄCHSTE SCHRITTE:
- Heute: Ihre Entscheidung
- Tag 10: Kick-off Workshop
- Tag 14: Erste Einsparungen realisiert
- Tag 30: Full-Impact sichtbar

Dieser Ansatz ist radikal aber notwendig. "Incremental thinking will not solve exponential problems."

Mit freundlichen Grüßen
[Name]
Partner
EffiCon Management Consultants

P.S.: Bei Beauftragung bis Tag 10 gewähren wir 10% Frühbucher-Rabatt.`
   },

  'd09_cfo_skonto_policy_draft.pdf': {
    filename: 'd09_cfo_skonto_policy_draft.pdf',
    title: 'Skonto-Policy – Liquiditätsoptimierung',
    type: 'document',
    content: `TREASURY POLICY
SKONTO-STRATEGIE ZUR LIQUIDITÄTSOPTIMIERUNG

Gültig ab: Tag 10
Erstellt: CFO-Office
Freigabe: CEO/CFO

1. GRUNDSATZ
Skonto ist ein Instrument zur Liquiditätsbeschleunigung, nicht zur Margenverschlechterung.

2. SKONTO-ANGEBOT (FORDERUNGEN)

STANDARD-KONDITIONEN:
- 2% Skonto bei Zahlung innerhalb 10 Tagen
- Netto 30 Tage
- Berechnung: 2/10 netto 30

GESTAFFELT NACH KUNDENKLASSIFIZIERUNG:
A-Kunden (>EUR 500k p.a.):
- 3% bei Zahlung innerhalb 5 Tagen
- 2% bei Zahlung innerhalb 10 Tagen
- 1% bei Zahlung innerhalb 14 Tagen

B-Kunden (EUR 100-500k p.a.):
- 2% bei Zahlung innerhalb 10 Tagen
- Keine weiteren Staffeln

C-Kunden (<EUR 100k p.a.):
- 1.5% bei Zahlung innerhalb 7 Tagen
- Vorkasse-Kunden: kein Skonto

3. WIRTSCHAFTLICHKEITSBERECHNUNG

Effektiver Jahreszins bei Skontoausnutzung:
2% Skonto, 20 Tage früher = 37.24% p.a. effektiv
3% Skonto, 25 Tage früher = 44.56% p.a. effektiv

  Skonto 2 % statt Rabatt cashEUR: +30000, profitLossEUR: -6000,
  Skonto 3 % breit: cashEUR: +60000, profitLossEUR: -12000
  Case-by-Case (Policy): cashEUR: +15000, profitLossEUR: -4000,

Break-Even vs. Kontokorrentkredit (12% p.a.):
→ Skonto lohnt sich immer bei Zinssatz > 0.66% (bei 2/10 netto 30)

4. SKONTO-ZIEHUNG (VERBINDLICHKEITEN)

ENTSCHEIDUNGSMATRIX:
Immer ziehen wenn:
- Liquidität ausreichend (>30 Tage Cash Runway)
- Effektivzins < Kontokorrent
- Lieferant strategisch wichtig

Nie ziehen wenn:
- Cash Runway <15 Tage
- Lieferant auf Verhandlungsliste
- Alternative Finanzierung günstiger

5. KOMMUNIKATION

KUNDENANSPRACHE:
"Sehr geehrter Geschäftspartner,
zur Optimierung unseres Working Capitals bieten wir Ihnen attraktive Skonto-Konditionen. Bei Zahlung innerhalb von X Tagen gewähren wir Y% Nachlass. Dies entspricht einer Rendite von Z% p.a. für Sie..."

INTERNE ANWEISUNG:
- Vertrieb: Skonto aktiv anbieten
- Buchhaltung: Tägliches Monitoring
- Controlling: Wöchentlicher Impact-Report

6. MONITORING & KPIs

ZIELWERTE:
- Skonto-Nutzungsquote: >60%
- DSO-Reduktion: -15 Tage
- Cash-Impact: +EUR 200k/Monat

REPORTING:
Weekly Dashboard mit:
- Skonto-Angebote vs. Nutzung
- Cash-Flow-Impact
- Margenerosion
- Customer Feedback

7. AUSNAHMEN

GENEHMIGUNGSPFLICHTIG DURCH CFO:
- Skonto >3%
- Zahlungsziel <5 Tage
- Kombination Skonto + Rabatt
- Nachträgliche Skonto-Gewährung

8. ALTERNATIVE INSTRUMENTE

ERGÄNZEND ZU SKONTO:
- Dynamic Discounting (tagesgenau)
- Supply Chain Finance
- Reverse Factoring
- Early Payment Programs

9. RISIKEN & MITIGATION

RISIKO: Margenerosion
→ MITIGATION: Max. 2% Standard, Monitoring

RISIKO: Kundenerwartung verfestigt sich
→ MITIGATION: Befristet auf Krisenzeitraum

RISIKO: Administrative Überlastung
→ MITIGATION: Automatisierung über ERP

10. GÜLTIGKEIT & REVIEW

Diese Policy gilt bis auf Widerruf.
Review: Monatlich durch CFO/Controlling
Anpassung: Bei Cash Runway <20 oder >60 Tage

Anlagen:
- Skonto-Kalkulator (Excel)
- Musteranschreiben Kunden
- FAQ für Vertrieb
- Legal Review Skonto-Klauseln`
   },

  'd09_cfo_factoring_assignment_agreement.pdf': {
    filename: 'd09_cfo_factoring_assignment_agreement.pdf',
    title: 'Factoring Assignment Agreement – Top-Up Line',
    type: 'document',
    content: `FACTORING ASSIGNMENT AGREEMENT
(Stilles Factoring - Top-Up)

zwischen
FactorPro GmbH ("Factor")
und
Aurion  ("Klient")

Vertragsnummer: FP-2024-TOPUP-001
Datum: Tag 9

§1 FACTORING-RAHMEN

1.1 Zusätzliches Volumen
Erhöhung der bestehenden Factoring-Linie um EUR 90,000
Gesamtrahmen neu: EUR [Bestand] + 90,000

1.2 Factoring-Variante
Stilles echtes Factoring (Undisclosed True Sale)
- Keine Abtretungsanzeige an Debitoren
- Übernahme Delkredererisiko durch Factor (90%)

§2 ANKAUFSKRITERIEN

Ankaufsfähige Forderungen:
✓ B2B-Forderungen aus Warenlieferung/Dienstleistung
✓ Bonität Debitor: mind. Credit Reform Score 250
✓ Forderungsalter: max. 90 Tage
✓ Keine strittigen Forderungen
✓ Inlandsforderungen (DACH-Region)

Ausschlüsse:
✗ Konzernforderungen
✗ Öffentliche Auftraggeber (verlängerte Zahlungsziele)
✗ Forderungen mit Eigentumsvorbehalten Dritter

§3 KONDITIONEN

Sofortauszahlung: 85% der Bruttoforderung
Sicherheitseinbehalt: 15% (Freigabe nach Zahlung)
Factoring-Gebühr: 1.8% der Bruttoforderung
Zinssatz: 3M-EURIBOR + 4.5% p.a. (auf Inanspruchnahme)
Delkrederegebühr: 0.3% (für Ausfallschutz)
Prüfgebühr: EUR 35 je Debitor (einmalig)

§4 VERFAHREN

4.1 Forderungsabtretung
- Upload Rechnungskopie in Factor-Portal
- Automatische Bonitätsprüfung (24h)
- Auszahlung innerhalb 48h nach Freigabe

4.2 Veritätsnachweis
Quartalsweise Saldenbestätigungen
Stichprobenartige Liefernachweise
Jahresabschluss-Prüfung durch Factor-Wirtschaftsprüfer

§5 SICHERHEITEN

Globalzession aller gegenwärtigen und zukünftigen Forderungen
Verlängerter Eigentumsvorbehalt an Waren
Verpfändung Geschäftskonten (nachrangig)
Bürgschaft Gesellschafter (begrenzt auf EUR 100k)

§6 COVENANTS

Financial Covenants:
- Minimum EBITDA: EUR [X] p.a.
- Eigenkapitalquote: min. 15%
- Working Capital Ratio: min. 1.1

Reporting:
- Monatliche BWA binnen 15 Tagen
- Quartals-Reporting Forderungsbestand
- Jährlicher Wirtschaftsprüfer-Bericht

§7 KÜNDIGUNGSRECHTE

Ordentliche Kündigung: 3 Monate zum Quartalsende
Außerordentliche Kündigung Factor bei:
- Zahlungsverzug >30 Tage
- Falschangaben zu Forderungen
- Covenant-Verletzung
- Insolvenzantrag

§8 BESONDERHEITEN TOP-UP

Befristung: 6 Monate (Verlängerung möglich)
Verwendungszweck: Ausschließlich Working Capital
Step-Down: Automatische Reduzierung bei Verbesserung Cash-Position
Conversion-Option: Umwandlung in revolvierende Linie nach 6 Monaten

§9 GEBÜHRENÜBERSICHT

Einrichtungsgebühr: EUR 1,500 (einmalig)
Monatliche Grundgebühr: EUR 250
Nicht-Nutzungsgebühr: 0.5% p.a. auf ungenutzten Rahmen
IT-Portal-Gebühr: EUR 50/Monat

§10 HAFTUNGSAUSSCHLUSS

Factor haftet nicht für:
- Wirtschaftliche Entscheidungen des Klienten
- Bonität der Debitoren (außer Delkredere-Übernahme)
- Folgeschäden aus verspäteter Auszahlung

ANLAGEN:
- Anlage 1: Debitorenliste (White-List)
- Anlage 2: Gebührenverzeichnis Detail
- Anlage 3: Muster Globalzession
- Anlage 4: Portal-Nutzungsbedingungen

_______________________        _______________________
FactorPro GmbH                  CFO`
  },

  'd09_cfo_covenant_kpi_dashboard.xlsx': {
    filename: 'd09_cfo_covenant_kpi_dashboard.xlsx',
    title: 'Covenant KPI Dashboard – Live Monitoring',
    type: 'document',
    content: `COVENANT COMPLIANCE DASHBOARD
Live-Monitoring für Bank-Reporting

STAND: Tag 9, 16:00 Uhr
STATUS: ⚠️ GELB (2 von 5 Covenants kritisch)

1. LIQUIDITÄTS-COVENANTS


13-Week Cash Runway  
IST: 28 Tage | SOLL: > 45 Tage | STATUS: 🟡 WARNING
Trend: → Stabil
Maßnahme: Investor-Bridge, Asset Sales

Quick Ratio (Cash + Receivables / Current Liabilities)
IST: 0.82 | SOLL: > 1.0 | STATUS: 🟡 WARNING  
Trend: ↓ Leichte Verschlechterung
Maßnahme: Forderungsmanagement intensivieren

2. PROFITABILITÄTS-COVENANTS

EBITDA Margin (Quarter)
IST: 4.2% | SOLL: > 5% | STATUS: 🟡 WARNING
Trend: ↑ Verbesserung erwartet
Maßnahme: Zero-Based Budgeting

Gross Margin
IST: 32.5% | SOLL: > 30% | STATUS: 🟢 OK
Trend: → Stabil
Maßnahme: Preiserhöhungen geplant

3. LEVERAGE COVENANTS

Net Debt / EBITDA
IST: 4.8x | SOLL: < 4.0x | STATUS: 🔴 BREACH
Trend: ↑ Verschlechterung
Maßnahme: Debt Reduction, EBITDA-Steigerung

Interest Coverage Ratio (EBITDA / Interest)
IST: 2.1x | SOLL: > 3.0x | STATUS: 🟡 WARNING
Trend: ↓ Verschlechterung
Maßnahme: Zinsoptimierung, Umschuldung

4. ASSET COVENANTS

Working Capital
IST: EUR 1.2 Mio | SOLL: > EUR 1.5 Mio | STATUS: 🟡 WARNING
Trend: ↓ Abbau läuft
Maßnahme: DSO/DPO-Optimierung

Asset Coverage Ratio
IST: 1.4x | SOLL: > 1.25x | STATUS: 🟢 OK
Trend: → Stabil
Maßnahme: Asset-Register aktualisieren

5. SONSTIGE COVENANTS

Change of Control
STATUS: 🟢 OK (Keine Änderung > 25%)
Investor-Deal: Wird Meldepflicht auslösen

Negative Pledge
STATUS: 🟢 OK (Keine neuen Sicherheiten)
Factoring: Bereits carved-out

Cross-Default
STATUS: 🟢 OK (Keine Defaults)
Kritisch: Lieferantenkredit bei EUR 280k

FORECAST NÄCHSTE 4 WOCHEN:

Woche 2: 2 Breaches erwartet (ohne Maßnahmen)
Woche 3: 1 Breach erwartet (mit Maßnahmen)
Woche 4: Alle Covenants erfüllt (Best Case)

AUTOMATISCHE ALERTS:

✉️ Daily Report an: CEO, CFO, Bank-Relationship
⚠️ Breach-Warning: -5 Tage vor Verletzung
🚨 Breach-Alert: Sofort bei Verletzung
📊 Weekly Forecast: Jeden Montag

MASSNAHMEN-TRACKER:

[1] Factoring EUR 90k: In Umsetzung (Tag 10)
[2] Skonto-Campaign: Gestartet
[3] Cost-Cutting: EUR 80k identifiziert
[4] Bridge Loan: In Verhandlung
[5] Asset Sales: Prüfung läuft

BANK-KOMMUNIKATION:

Letzter Call: Tag 8
Nächster Call: Tag 10 (Post-Waiver)
Stimmung: Vorsichtig optimistisch
Kritische Themen: Leverage, Liquidität
Positive Signale: Investor-Interest, Quick-Wins

TECHNICAL NOTES:

Data Sources: ERP (real-time), Bank (daily), Manual (gaps)
Update-Frequenz: Alle 4 Stunden
Audit-Trail: Vollständig, ISO 27001 compliant
Access-Rights: C-Level, Controlling, Bank (read-only)`
   },

  'd09_ops_production_efficiency_report.pdf': {
    filename: 'd09_ops_production_efficiency_report.pdf',
    title: 'Production Line Balancing – Efficiency Report',
    type: 'document',
    content: `PRODUCTION EFFICIENCY REPORT
Line Balancing Initiative – Week 1 Results

Executive Summary:
15% Produktivitätssteigerung erreicht (Ziel: 20%)
ROI nach 3 Wochen erwartet

1. AUSGANGSLAGE VOR LINE BALANCING

Takt-Zeit: 4.2 Minuten/Einheit
Bottleneck: Station 3 (Montage)
Auslastung: Ø 68% (Range: 45-95%)
WIP (Work-in-Process): 250 Einheiten
Durchlaufzeit: 8.5 Stunden

Probleme:
- Ungleichmäßige Arbeitsverteilung
- Warteschlangen vor Station 3
- Unterbeschäftigung Station 1 & 5
- Hohe Puffer zwischen Stationen

2. DURCHGEFÜHRTE MASSNAHMEN (Woche 1)

QUICK-WINS (ohne Invest):
✓ Arbeitsumverteilung Station 2→3
✓ Parallelprozesse eingeführt
✓ 5S-Optimierung Arbeitsplätze
✓ Andon-System reaktiviert

KLEINE INVESTMENTS (EUR 5,000):
✓ Vorrichtung Station 3 (EUR 2,000)
✓ Werkzeug-Upgrade (EUR 1,500)
✓ Schulung Mitarbeiter (EUR 1,000)
✓ Layout-Anpassung (EUR 500)

3. ERREICHTE VERBESSERUNGEN

Takt-Zeit: 3.6 Minuten/Einheit (-14%)
Bottleneck: Eliminiert (ausgeglichen)
Auslastung: Ø 82% (Range: 75-87%)
WIP: 150 Einheiten (-40%)
Durchlaufzeit: 6.2 Stunden (-27%)

Output-Steigerung:
- Täglich: +45 Einheiten
- Wöchentlich: +225 Einheiten
- Monatlich: +900 Einheiten

4. WIRTSCHAFTLICHKEIT

Mehrumsatz (bei Vollauslastung):
900 Einheiten × EUR 50 DB = EUR 45,000/Monat

Kosteneinsparung:
- Überstunden: -EUR 8,000/Monat
- Energie: -EUR 2,000/Monat
- Ausschuss: -EUR 3,000/Monat
Gesamt: EUR 13,000/Monat

Payback: 5,000 / (45,000+13,000) = < 3 Tage

5. NÄCHSTE SCHRITTE (Potenzial weitere EUR 10-15k)

PHASE 2 - MITTLERER INVEST (EUR 5,000):
- Automatisierung Handling (EUR 3,000)
- Digitales Werker-Führungssystem (EUR 1,500)
- Predictive Maintenance Setup (EUR 500)

PHASE 3 - GRÖSSER INVEST (EUR 15,000):
- Roboter-Integration Station 2
- Komplett-Layout nach Wertstrom
- MES-System (Manufacturing Execution)
- Inline-Qualitätsprüfung

6. MITARBEITER-FEEDBACK

Positiv:
"Weniger Stress durch gleichmäßige Auslastung"
"Endlich keine Warteschlangen mehr"
"Sinnvolle Werkzeug-Upgrades"

Kritisch:
"Anfangs Umstellung schwierig"
"Mehr Verantwortung pro Person"
"Dokumentation aufwändig"

Engagement-Score: +12 Punkte

7. KUNDEN-IMPACT

Liefertreue (OTIF): 78% → 91%
Reklamationsquote: 2.3% → 1.8%
Lead-Time: 8 Tage → 6 Tage

Kunden-Feedback:
"Deutlich verlässlichere Lieferungen"
"Qualität konstant hoch"

8. LESSONS LEARNED

Erfolgsfaktoren:
✓ Shopfloor-Team eingebunden
✓ Kleine Schritte, schnelle Erfolge
✓ Daten-basierte Entscheidungen
✓ Tägliche Shopfloor-Meetings

Herausforderungen:
- Initiale Widerstände ("haben wir immer so gemacht")
- Qualifikationslücken bei Mitarbeitern
- IT-Integration komplexer als erwartet

9. BENCHMARK

Branchendurchschnitt:
- Takt-Effizienz: 75% (wir: 82%)
- OEE (Overall Equipment Effectiveness): 65% (wir: 71%)
- First-Pass-Yield: 94% (wir: 96%)

Best-in-Class:
- Takt-Effizienz: 90%
- OEE: 85%
- First-Pass-Yield: 99%

10. EMPFEHLUNG

SOFORT: Phase 2 umsetzen (EUR 5k)
→ Erwarteter zusätzlicher Nutzen: EUR 20k/Monat

OPTIONAL: Phase 3 evaluieren
→ Abhängig von Auftragslage und Finanzierung

KRITISCH: Momentum nicht verlieren!
→ Wöchentliche Reviews
→ Continuous Improvement Kultur

Erstellt von: Production Engineering
Freigabe: COO/CFO`
  },

  'd09_ops_material_price_index_clause.pdf': {
    filename: 'd09_ops_material_price_index_clause.pdf',
    title: 'Rohstoffpreis-Indexklausel – Vertragsmuster',
    type: 'document',
    content: `ROHSTOFFPREIS-INDEXKLAUSEL
Mustervereinbarung zur Preisanpassung

Zwischen
Aurion PS (Lieferant)
und
[Kunde] (Abnehmer)

§1 GRUNDSATZ DER INDEXIERUNG

Die Vertragspreise unterliegen einer automatischen Anpassung basierend auf der Entwicklung relevanter Rohstoffindizes. Diese Klausel sichert faire Preise für beide Parteien bei volatilen Märkten.

§2 REFERENZINDIZES

Stahl: MEPS European Steel Price Index
Aluminium: LME (London Metal Exchange) 3-Month
Kunststoffe: ICIS PP Homo Injection EUR
Energie: EEX Phelix Day Base
Transport: Diesel-Index Statistisches Bundesamt

§3 BERECHNUNGSFORMEL

Neuer Preis = Basispreis × (0.6 + 0.4 × Index_neu/Index_basis)

Erklärung:
- 60% des Preises bleiben fix (Arbeitskosten, Overhead)
- 40% sind indexgebunden (Materialkosten)
- Transparente, nachvollziehbare Berechnung

§4 ANPASSUNGSMECHANISMUS

Schwellenwert: ±5% Veränderung zum Basisindex
Prüfung: Quartalsweise (jeweils zum 15.)
Ankündigung: 30 Tage vor Inkrafttreten
Gültigkeit: Mind. 3 Monate pro Anpassung

§5 BEISPIELRECHNUNG

Ausgangslage:
- Basispreis: EUR 100/Einheit
- Basisindex Stahl: 850 Punkte
- Aktueller Index: 935 Punkte (+10%)

Berechnung:
100 × (0.6 + 0.4 × 935/850) = 100 × (0.6 + 0.44) = EUR 104

Preiserhöhung: 4% (trotz 10% Rohstoffsteigerung)

§6 TRANSPARENZ & NACHWEIS

Lieferant verpflichtet sich:
- Indexstände monatlich mitzuteilen
- Berechnungen offenzulegen
- Sourcen zu dokumentieren
- Wirtschaftsprüfer-Testat jährlich

§7 CAPS & FLOORS

Maximum: +15% p.a. kumuliert
Minimum: -10% p.a. kumuliert
Härtefallklausel: Neuverhandlung bei >20%

§8 SERVICE-KOMPONENTE (Kunden-Akzeptanz)

Bei jeder Preiserhöhung enthält:
✓ Kostenlose Expresslieferung (3x/Quartal)
✓ Verlängerte Garantie (+6 Monate)
✓ Technischer Support Priority
✓ Quartalsbericht Marktentwicklung

§9 WIN-WIN ARGUMENTE

FÜR DEN KUNDEN:
- Transparenz statt Willkür
- Preissenkungen werden weitergegeben
- Planbare Budgets (Quartalszyklus)
- Keine versteckten Aufschläge
- Benchmark zu Wettbewerb möglich

FÜR DEN LIEFERANTEN:
- Margenschutz bei Kostensteigerung
- Reduzierte Neuverhandlungen
- Kundenbindung durch Fairness
- Automatismus statt Diskussion
- Forecasting-Sicherheit

§10 PILOT-PHASE

Vorschlag: 6-Monate-Test mit 2 Kunden
- Kunde A: Strategischer Partner
- Kunde B: Preissensibler Abnehmer
- Monatliches Review
- Exit-Option nach 3 Monaten
- Bei Erfolg: Roll-out auf alle Kunden

§11 ALTERNATIVEN ZUR VOLL-INDEXIERUNG

OPTION A: Staffel-Index
- Erste 100 Einheiten: Festpreis
- 101-500: 50% indexiert  
- >500: Voll indexiert

OPTION B: Rohstoff-Zuschlag
- Grundpreis fix
- Separater Materialzuschlag variabel
- Transparenz auf Rechnung

OPTION C: Corridor-Modell
- Preis fix bei Index 800-900
- Darüber/darunter: Anpassung

§12 KOMMUNIKATIONS-TEMPLATE

"Sehr geehrter Kunde,

die globalen Rohstoffmärkte zeigen erhebliche Volatilität. Um Ihnen Planungssicherheit bei fairen Preisen zu bieten, führen wir eine transparente Indexierung ein.

Ihr Vorteil:
- Preissenkungen geben wir 1:1 weiter
- Maximale Erhöhung gedeckelt
- Zusatz-Services inklusive

Berechnung:
[Formel mit Beispiel]

Gerne erläutern wir dies persönlich.

Mit partnerschaftlichen Grüßen"

§13 RECHTLICHE ABSICHERUNG

Schriftform: Änderungen nur schriftlich
AGB-Konformität: Geprüft nach BGB
Kartellrecht: Keine Preisabsprachen
Salvatorische Klausel: Standard

§14 KÜNDIGUNG

Ordentlich: 3 Monate zum Quartalsende
Außerordentlich: Bei Index-Manipulation
Rückfall: Auf letzte Festpreise

ANLAGEN:
- Excel-Tool Preiskalkulation
- Historische Indexentwicklung
- Benchmark Wettbewerber
- FAQ für Vertrieb

_______________________        _______________________
Lieferant                       Kunde`
    },

   'd09_ops_supplier_audit_report.pdf': {
    filename: 'd09_ops_supplier_audit_report.pdf',
    title: 'Supplier Quality Audit Report – Fremdfertigung',
    type: 'document',
    content: `SUPPLIER QUALITY AUDIT REPORT
Fremdfertiger: TechnoPartner GmbH
Audit-Datum: Tag 8-9
Auditor: QM-Team + Externe Zertifizierer

EXECUTIVE SUMMARY:
Gesamtscore: 68/100 (Minimum: 75)
Status: ⚠️ BEDINGT GEEIGNET
Kritische Findings: 3 Major, 8 Minor
Empfehlung: Sofortmaßnahmen + Re-Audit in 30 Tagen

1. AUDIT-SCOPE & METHODIK

Standard: ISO 9001:2015 + Automotive IATF 16949
Bereiche: Produktion, QM, Logistik, Management
Methode: Vor-Ort-Audit, Dokumentenprüfung, Stichproben
Produkte: Komponenten Serie A, B, C

2. KRITISCHE BEFUNDE (MAJOR)

FINDING #1: Fehlende Eingangsprüfung
- IST: Stichprobenartig, undokumentiert
- SOLL: 100% kritische Merkmale
- RISIKO: Fehlerhafte Vormaterialien
- MAßNAHME: Prüfplan implementieren (sofort)

FINDING #2: Kalibrierung Messmittel
- IST: Letzte Kalibrierung vor 18 Monaten
- SOLL: Jährlich nach DAkkS
- RISIKO: Falsche Messungen, Ausschuss
- MAßNAHME: Sofort-Kalibrierung (EUR 2,000)

5. REKLAMATIONSANALYSE (letzte 3 Monate)

Reklamationsquote: 4.8% (Ziel: <2%)
Hauptursachen:
- Maßabweichungen: 35%
- Oberflächenfehler: 25%
- Fehlende Teile: 20%
- Dokumentation: 15%
- Sonstige: 5%

EMPFEHLUNG: Beibehaltung mit Auflagen, Schulung (5k). Alternativ: Lieferant wechseln, Wechselkosten 8k.

Freigabe: Head of Quality
Verteiler: CEO, COO, CFO, Einkauf`
  },

  'd09_ops_logistics_service_level_agreement.pdf': {
    filename: 'd09_ops_logistics_service_level_agreement.pdf',
    title: 'Logistics Service Level Agreement – Express-Strategie',
    type: 'document',
    content: `SERVICE LEVEL AGREEMENT (SLA)
EXPRESS-LOGISTIK OPTIMIERUNG

Vereinbarung zwischen:
Aurion PS und Express-Log GmbH
Gültig ab: Tag 10

1. SERVICE-KLASSIFIZIERUNG

STANDARD (90% der Sendungen):
- Laufzeit: 48-72h
- Kosten: EUR 12/Sendung
- Tracking: Basic
- Versicherung: EUR 500

EXPRESS (8% der Sendungen):
- Laufzeit: 24h
- Kosten: EUR 45/Sendung
- Tracking: Real-time
- Versicherung: EUR 5,000

SAME-DAY (2% der Sendungen):
- Laufzeit: 4-8h
- Kosten: EUR 150/Sendung
- Tracking: Live + Anruf
- Versicherung: EUR 10,000

3. PAUSCHALPEIS-MODELL (EUR 2,000/Monat)

Inkludiert:
- 50x Standard
- 10x Express
- 2x Same-Day
- Alle Zuschläge (Treibstoff, Maut)
Bei Ausweitung auf einen größeren Kreis von Kunden bieten wir einen Sonderpreis von 10.000 Euro.
Break-Even-Analyse:
Normal: 50×12 + 10×45 + 2×150 = EUR 1,350
Pauschale: EUR 2,000
Delta: EUR +650 (für Planungssicherheit)

EINSPARUNG: EUR 14,000/Monat

_______________________        _______________________
[Aurion]                        Express-Log GmbH`
  },

  'd09_ops_pilotcharge_quality_report.pdf': {
    filename: 'd09_ops_pilotcharge_quality_report.pdf',
    title: 'Pilotcharge Quality Report – Dual Sourcing Decision',
    type: 'document',
    content: `PILOTCHARGE QUALITY REPORT
Dual-Sourcing Erstmusterprüfbericht

Lieferant: NewSource Manufacturing Ltd.
Prüfdatum: Tag 8-9
Stückzahl: 100 Einheiten (Pilotcharge)
Entscheidung: GO/NO-GO für Serienproduktion

EXECUTIVE SUMMARY:
Qualitätslevel: 94% (Ziel: >98%)
Empfehlung: TEIL-GO mit Auflagen
Investition: EUR 2,000-4,000 für Qualitätssicherung

1. ERSTMUSTER-PRÜFERGEBNISSE

DIMENSIONSPRÜFUNG:
Geprüfte Merkmale: 15
i.O.: 13
n.i.O.: 2 (Toleranzüberschreitung 0.02mm)
Kritikalität: Mittel

2. QUALITÄTSBEWERTUNG PILOTCHARGE

Gutteile: 94 Stück
Nacharbeit: 4 Stück  
Ausschuss: 2 Stück
First Pass Yield: 94%

PPM-Hochrechnung: 6,000 PPM
Ziel-PPM: <1,000

EMPFEHLUNG: TEIL-GO mit AQL-Plan (Option B)

Timeline:
Tag 10: Entscheidung
Tag 11: Vertragsunterzeichnung
Tag 12: Start Kleinserie
Tag 20: Review & Skalierung

Freigabe: ___________
COO/Head of Quality`
  },

  'd09_ops_aql_sampling_plan.xlsx': {
    filename: 'd09_ops_aql_sampling_plan.xlsx',
    title: 'AQL Sampling Plan – Stichprobenprüfung',
    type: 'document',
    content: `AQL SAMPLING PLAN
According to ISO 2859-1 / ANSI/ASQ Z1.4

GRUNDLAGEN:

AQL = Acceptable Quality Level
Die maximale Fehlerrate, die für den Prozess akzeptabel ist

STICHPROBENPLAN (General Inspection Level II):

Losgröße        Stichprobe    AQL 1.0         AQL 2.5         AQL 4.0
                (n)           Ac/Re           Ac/Re           Ac/Re
151-280         32            1/2             3/4             5/6
281-500         50            2/3             5/6             7/8
501-1200        80            3/4             7/8             10/11

Ac = Accept (Annahmezahl)
Re = Reject (Rückweisezahl)

ANWENDUNGSBEISPIEL:

Szenario: Losgröße 500 Stück, AQL 2.5
- Stichprobengröße: 50 Stück
- Annahmekriterium: max. 5 fehlerhafte Teile
- Rückweisekriterium: 6 oder mehr fehlerhafte Teile

KOSTENBETRACHTUNG:

100%-Prüfung:
Zeit: 2 Min/Stück × 500 = 1000 Min = 16.7h
Kosten: 16.7h × 35 EUR = 584 EUR/Los

AQL-Prüfung:
Zeit: 2 Min/Stück × 50 = 100 Min = 1.7h
Kosten: 1.7h × 35 EUR = 60 EUR/Los

Einsparung: 524 EUR/Los (90%)

Optionen:
 Go: Ramp-up mit 100 %-Prüfung: 4k
  Teil-Go: Limitierter Ramp-up mit AQL-Plan 2k
  No-Go: Beim Hauptlieferant bleiben, wir akzeptieren Vorkasse, 8k
   Temporär Fremdfertigung ausweiten (7k)


`
  },

  'd09_hrlegal_employee_faq_acquisition.pdf': {
    filename: 'd09_hrlegal_employee_faq_acquisition.pdf',
    title: 'Mitarbeiter-FAQ zum Investorenprozess',
    type: 'document',
    content: `HÄUFIG GESTELLTE FRAGEN (FAQ)
Investorenprozess und was er für Sie bedeutet

Stand: Tag 9
Vertraulich – Nur für Mitarbeiter

GRUNDSÄTZLICHES:

F: Warum brauchen wir einen Investor?
A: Die aktuelle Marktlage erfordert zusätzliches Kapital für Wachstum und Innovation. Ein strategischer Partner bringt nicht nur Geld, sondern auch Know-how, Netzwerk und neue Geschäftschancen.

F: Werden wir verkauft?
A: Nein. Es geht um eine Minderheitsbeteiligung (25%). Die Gründerfamilie behält die Mehrheit und damit die Kontrolle über die strategische Ausrichtung.

ARBEITSPLÄTZE & SICHERHEIT:

F: Sind mein Arbeitsplatz und mein Gehalt sicher?
A: Ja. Der Investor plant Wachstum, nicht Stellenabbau. Bestehende Arbeitsverträge bleiben unverändert. Das Lohnniveau wird nicht angetastet.

FACHBEGRIFFE ERKLÄRT:

Due Diligence (DD): Tiefenprüfung des Unternehmens durch den Käufer. Experten prüfen Finanzen, Verträge, Technik, Personal. Dauert 2-4 Wochen.

Term Sheet: Unverbindliche Absichtserklärung mit Eckpunkten des Deals (Preis, Beteiligungshöhe, Bedingungen).

SPA (Share Purchase Agreement): Der eigentliche Kaufvertrag. Regelt alle Details der Transaktion.

Escrow: Treuhandkonto, auf dem Teil des Kaufpreises als Sicherheit hinterlegt wird.

WAS SIE TUN KÖNNEN:

1. Fokussiert weiterarbeiten - Operative Exzellenz überzeugt Investoren
2. Positiv über das Unternehmen sprechen
3. Keine Gerüchte verbreiten oder auf Social Media posten
4. Fragen stellen statt spekulieren
5. Veränderung als Chance sehen

KONTAKT:

HR-Hotline: Durchwahl 500-555
Email: investor-faq@aurion-ps.com
Betriebsrat: Durchwahl 4580
Anonyme Box: Haupteingang

Diese FAQ wird laufend aktualisiert.
Letzte Änderung: Tag 9, 14:00 Uhr`
  },

  'd09_hrlegal_bv_homeoffice_draft.pdf': {
    filename: 'd09_hrlegal_bv_homeoffice_draft.pdf',
    title: 'Betriebsvereinbarung Homeoffice – Entwurf',
    type: 'document',
    content: `BETRIEBSVEREINBARUNG HOMEOFFICE
zwischen Geschäftsführung und Betriebsrat

Präambel:
Mobile Arbeit erhöht Flexibilität und Mitarbeiterzufriedenheit bei gleichzeitiger Sicherstellung der betrieblichen Erfordernisse.

§1 GELTUNGSBEREICH
Diese BV gilt für alle Arbeitnehmer mit Tätigkeiten, die remote ausführbar sind. Ausgenommen: Produktion, Lager, Kundendienst vor Ort.

§3 ANSPRUCH UND UMFANG

Umfang nach Tätigkeitsgruppen:
- Administration: max. 3 Tage/Woche
- IT/Entwicklung: max. 4 Tage/Woche  
- Vertrieb: nach Kundenterminen
- Führungskräfte: max. 2 Tage/Woche

Präsenzpflicht:
- Montag (Teammeeting)
- Kernzeit 10-14 Uhr erreichbar
- Betriebsversammlungen
- Wichtige Kundentermine

§5 PERFORMANCE-MESSUNG (KPIs)

Produktivitätskennzahlen:
- Output-Messung statt Präsenzzeit
- Wöchentliche Zielvereinbarungen
- Projektfortschritt-Tracking
- Response-Zeiten (SLA)

§6 TECHNISCHE AUSSTATTUNG

Vom Arbeitgeber gestellt:
- Laptop/PC (Standard-Config)
- Headset
- VPN-Zugang
- Software-Lizenzen
- IT-Support remote

Zuschüsse:
- Internet: 20 EUR/Monat
- Strom: 15 EUR/Monat
- Einmalig Bürostuhl: max. 150 EUR

§14 INKRAFTTRETEN

Diese BV tritt am Tag 10 in Kraft.
Kündigung: 3 Monate zum Quartalsende
Nachwirkung: Bis neue Regelung

_______________________        _______________________
Geschäftsführung                Betriebsrat`
  },

  'd09_hrlegal_law_firm_memo_restructuring.pdf': {
    filename: 'd09_hrlegal_law_firm_memo_restructuring.pdf',
    title: 'Kanzlei-Memo Restrukturierung – Sozialplan-Szenario',
    type: 'document',
    content: `STRENG VERTRAULICH - ATTORNEY-CLIENT PRIVILEGE

MEMORANDUM

An: Geschäftsführung Aurion Pumpen Systeme
Von: Dr. Gerlach, Dr. Jahn & Partner Rechtsanwälte
Datum: Tag 9
Re: Sozialplan-Szenarien bei Restrukturierung

1. RECHTLICHER RAHMEN

Betriebsverfassungsgesetz (BetrVG):
- §§ 111-113: Betriebsänderung und Sozialplan
- § 112a: Erzwingbarer Sozialplan
- § 112: Einigungsstelle

2. SZENARIO-ANALYSE

SZENARIO A: Sanfter Abbau (5% = 15 MA)
- Sozialplan: Nicht erzwingbar
- Kosten: Freiwillige Abfindungen
- Kalkulation: 0,5 Monatsgehälter/Dienstjahr
- Geschätzt: EUR 300.000

SZENARIO B: Mittlerer Einschnitt (10% = 30 MA)
- Sozialplan: Erzwingbar
- Interessenausgleich: Pflicht
- Kalkulation: 0,7 Monatsgehälter/Dienstjahr
- Geschätzt: EUR 750.000

4. VERMEIDUNGSSTRATEGIEN

Alternativen zur Kündigung:
☑ Kurzarbeit (bis 24 Monate)
☑ Arbeitszeitreduzierung
☑ Gehaltsverzicht (befristet)
☑ Natürliche Fluktuation
☑ Aufhebungsverträge
☑ Transfergesellschaft

12. EMPFEHLUNG

PRÄFERIERTE STRATEGIE:
1. Szenario nur intern prüfen
2. Keine Kommunikation nach außen
3. Fokus auf Alternativlösungen
4. Investor-Deal prioritär
5. Sozialplan als Ultima Ratio

Mit freundlichen Grüßen

Dr. Thomas Müller
Fachanwalt für Arbeitsrecht
Partner

Hinweis: Rechnung über EUR 6.000 (Pauschale Restrukturierungsberatung) folgt separat.`
  },

  'd09_hrlegal_compliance_audit_report.pdf': {
    filename: 'd09_hrlegal_compliance_audit_report.pdf',
    title: 'Compliance Audit Report – Maßnahmenplan',
    type: 'document',
    content: `COMPLIANCE AUDIT REPORT
Quick-Assessment für Investoren-Due-Diligence

Prüfungszeitraum: Tag 1-9
Status: GELB (Verbesserungsbedarf)
DD-Readiness: 75%

EXECUTIVE SUMMARY:

Kritische Compliance-Risiken: 2
Mittlere Risiken: 5
Quick-Wins identifiziert: 8
Investitionsbedarf: EUR 15.000

2. DATENSCHUTZ (DSGVO)

Status: ⚠️ GELB
- Datenschutzbeauftragter bestellt
- Verarbeitungsverzeichnis: 80% komplett
- Löschkonzept: In Arbeit
- TOMs dokumentiert

Kritisch:
- 3 Auftragsverarbeiter ohne AVV
- Cookie-Banner Website veraltet
- Mitarbeiterschulungen überfällig

7. FINANCIAL COMPLIANCE

Status: 🔴 ROT
- Vier-Augen-Prinzip: Teilweise
- Zahlungsfreigaben: Uneinheitlich
- IKS (Internes Kontrollsystem): Lückenhaft
- Fraud-Prevention: Minimal

9. QUICK-WINS (Sofort umsetzbar)

1. Compliance-Statement CEO (heute)
2. Update Unterschriftenregelung
3. Datenschutz-Refresher (Email)
4. Export-Screening aktivieren
5. Vier-Augen-Prinzip >EUR 10k
6. Passwort-Policy verschärfen
7. Compliance-Ordner DD anlegen
8. Q&A-Liste vorbereiten

FAZIT:
Mit den identifizierten Maßnahmen erreichen wir DD-Readiness von >90% innerhalb von 14 Tagen. Investment von EUR 15.000 ist gut angelegt und reduziert Deal-Risiko erheblich.

Erstellt: Compliance Team
Review: CEO/CFO
External Review: PWC (beauftragt)`
  },

  'd09_hrlegal_br_agreement_draft.pdf': {
    filename: 'd09_hrlegal_br_agreement_draft.pdf',
    title: 'Betriebsrats-Vereinbarung – Krisenbewältigung',
    type: 'document',
    content: `VEREINBARUNG
zwischen Geschäftsführung und Betriebsrat
zur gemeinsamen Krisenbewältigung

Präambel:
In der aktuellen wirtschaftlichen Herausforderung vereinbaren Geschäftsführung und Betriebsrat eine vertrauensvolle Zusammenarbeit zum Erhalt des Unternehmens und der Arbeitsplätze.

§1 GRUNDSÄTZE DER ZUSAMMENARBEIT

1.1 Gemeinsames Ziel
Überwindung der Krise bei maximalem Erhalt der Arbeitsplätze

1.2 Prinzipien
- Transparenz bei allen Maßnahmen
- Keine betriebsbedingten Kündigungen bis Tag 60
- Sozialverträgliche Lösungen
- Faire Lastenverteilung

§3 KURZFRISTIGE MASSNAHMEN (Tag 10-20)

VEREINBART:
☑ Einstellungsstopp (Ausnahme: kritisch)
☑ Überstundenabbau (Ziel: <500h)
☑ Urlaub 2024 bis März 2025 nehmen
☑ Dienstreisen nur mit Genehmigung
☑ Externe Beratung -50%

§5 INVESTOR-PROZESS

BR-Beteiligung:
- Information über Stand
- Stellungnahme zu Terms
- Due Diligence Unterstützung
- Kein Veto-Recht

Bedingungen BR:
1. Standortgarantie 3 Jahre
2. Tarifbindung bleibt
3. Keine Zerschlagung
4. Mitbestimmung erhalten

§6 POSITIVE ANREIZE

Bei Zielerreichung:
- Cash >45 Tage: Sonderzahlung EUR 500/MA
- Investor-Deal: Erfolgsbeteiligung 1%
- Schwarze Zahlen: 13. Monatsgehalt

§7 BESCHÄFTIGUNGSSICHERUNG

Garantien GF:
- Keine betriebsbedingten Kündigungen vor Tag 60
- Natürliche Fluktuation first
- Altersteilzeit-Angebote
- Qualifizierung statt Kündigung

§9 KOMMUNIKATION

Gemeinsame Botschaften:
- Einheitliche Sprachregelung
- Keine Alleingänge
- Mitarbeiterinfo gemeinsam
- Presse nur abgestimmt

Kernbotschaft:
"Geschäftsführung und Betriebsrat arbeiten Hand in Hand für die Zukunft des Unternehmens"

§12 POSITIVE VISION

Gemeinsames Zielbild:
"In 6 Monaten haben wir die Krise überwunden, sind mit einem starken Partner gewachsen und haben alle Arbeitsplätze erhalten."

Meilensteine:
- Tag 20: Investor-Zusage
- Tag 40: Liquidität gesichert
- Tag 60: Wachstum startet
- Tag 100: Erfolgsprämie

§14 LAUFZEIT

Gültigkeit: Tag 9 bis Tag 100
Verlängerung: Automatisch um 30 Tage
Kündigung: 14 Tage zum Monatsende
Nachwirkung: Bis neue Vereinbarung

UNTERSCHRIFTEN

_______________________        _______________________
Geschäftsführung                Betriebsrat
CEO                             Vorsitzende/r

_______________________        _______________________  
HRLEGAL                             Stellvertreter/in

Ort, Tag 9

Diese Vereinbarung wurde in vertrauensvoller Atmosphäre erarbeitet und zeigt den gemeinsamen Willen, das Unternehmen erfolgreich durch die Krise zu führen.`
  }
};