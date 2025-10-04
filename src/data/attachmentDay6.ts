// src/data/attachmentDay6.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day6Attachments: Record<string, AttachmentContent> = {
  // Hier werden die Attachment-Inhalte für Tag 6 eingefügt
'd06_ceo_auflagenbrief_bank_tag6.pdf': {
  filename: 'd06_ceo_auflagenbrief_bank_tag6.pdf',
  title: 'Anschreiben – Auflagenbrief Bank',
  type: 'document',
  content: `Von: CEO
An: CFO, Legal, OPS
Betreff: Auflagenbrief der Bank – Verpflichtungen zeichnen

Die Hausbank hat uns den Auflagenbrief mit klaren Meilensteinen, wöchentlichem Reporting und Triggern bei Abweichungen zugestellt. Die Nachricht dazu (N6-1) spricht eine eindeutige Sprache: „No surprises“. 

Das Dilemma ist spürbar: Je früher wir unterschreiben, desto mehr Vertrauen gewinnen wir – auf Kosten von Bewegungsfreiheit. Ein Zeichnen mit Vorbehalten signalisiert, dass wir Verantwortung sehen, aber Detailfragen klären müssen. Verzögerung oder Ablehnung verschiebt die Diskussion in Richtung Risiko – mit der Gefahr, dass die Linie reduziert wird oder die Bank Alternativen sucht.

Für die innere Umsetzung heißt das: Jeder Milestone muss einen klar benannten Owner haben, mit Termin und Nachweis. Abweichungen dürfen nicht zwischen Stühlen verschwinden, sondern müssen früh kommuniziert werden. Legal ergänzt Formulierungen, die Abhängigkeiten von Dritten sichtbar machen. OPS prüft die Umsetzbarkeit. CFO sichert die 13-Wochen-Cash-Planung, die als Referenz dient.

Kommunikativ brauchen wir eine Linie: Wir zeichnen Verpflichtungen, wir wissen, wie wir liefern, und wir melden Abweichungen sofort. Damit ist die Bank nicht „beruhigt“, sondern überzeugt, dass wir führen.`
},

'd06_ceo_medienstrategie_woche2_tag6.pdf': {
  filename: 'd06_ceo_medienstrategie_woche2_tag6.pdf',
  title: 'Briefing – Medienstrategie Woche 2',
  type: 'document',
  content: `Von: CEO
An: Kommunikation, Vertrieb
Betreff: Medienstrategie Woche 2 – Ton und Takt

Regional-TV und Lokalpresse planen weitere Beiträge. Die Öffentlichkeit sucht Orientierung, die Bank erwartet Konsistenz, die Belegschaft Klarheit. Unser Dilemma: Sichtbarkeit und Kontrolle vs. Risiko kritischer Nachfragen.

Optionen gibt es viele: Schweigen, eine sachliche Pressemitteilung, ein Gastbeitrag mit kontrollierter Botschaft oder ein Interview, das große Wirkung entfalten kann – positiv wie negativ. Wir entscheiden, wie viel Bühne wir geben und wie stark wir den Ton steuern.

Kernbotschaften für alle Formate:
- Wir arbeiten mit klaren Meilensteinen und Reporting.
- Wir erkennen Risiken früh und benennen sie offen.
- Wir sichern Lieferpläne für A-Kunden und kommunizieren Eskalationslogik.

Zahlen werden nur in Korridoren genannt, keine Prognosen, die wir nicht halten können. Vertrieb und Kommunikation verwenden identisches Wording. Jede Abweichung würde sofort als Widerspruch gewertet. Der O-Ton dient der Verlässlichkeit, nicht der Selbstdarstellung.`
},


'd06_ceo_keyaccount_roundtable_tag6.pdf': {
  filename: 'd06_ceo_keyaccount_roundtable_tag6.pdf',
  title: 'Einladung – Key-Account-Roundtable',
  type: 'email',
  content: `Von: CEO
An: Geschäftsführungen Top-10-Kunden
Betreff: Einladung zum Roundtable – Lieferplan und Eskalationslogik ENTWURF FÜR FREIGABE CEO VON S-CEO

Sehr geehrte Damen und Herren,

mehrere unserer A-Kunden haben in den vergangenen Tagen verbindliche Pläne für die nächsten 60 Tage eingefordert. Die Forderung ist nachvollziehbar: Unsicherheit in der Lieferkette schlägt unmittelbar auf Ihre Planungen durch. Gleichzeitig können wir Priorisierungen nicht beliebig offenlegen, ohne Wettbewerbsfähigkeit zu gefährden.

Wir schlagen deshalb einen virtuellen Roundtable vor, der beides verbindet: Transparenz dort, wo sie Ihre Planung stabilisiert, und Diskretion dort, wo sensible Details geschützt bleiben müssen. Inhalte: ein abgestimmter Lieferplan mit klaren Zeitfenstern, eine Eskalationslogik für den Fall von Engpässen, und ein Verfahren, wie wir Abweichungen kommunizieren – früh und verlässlich.

Unsere Priorisierung erfolgt entlang Kritikalität und Deckungsbeitrag. Das heißt: Projekte mit hoher Systemrelevanz und starker Wertschöpfung werden vorrangig bedient. Wir erläutern die Kriterien offen, ohne vertrauliche Kundeninformationen preiszugeben. 

Bitte senden Sie uns vorab zwei Punkte: Ihre dringendste Sorge und eine Beobachtung aus Ihrem Betrieb, die uns hilft, die Situation besser einzuschätzen. Unser Gegenangebot: dieselbe Offenheit unsererseits – ohne übertriebene Versprechen, aber mit überprüfbaren Zuschnitten.

Ziel ist eine partnerschaftliche Steuerung. Statt individueller Telefonate und widersprüchlicher Signale schaffen wir eine gemeinsame Bühne, auf der wir Konsistenz herstellen. So halten wir Ihre Planungen stabil und unsere Beziehungen belastbar.

Mit freundlichen Grüßen
CEO`
},


'd06_ceo_stakeholder_roadmap_q3q4_tag6.pdf': {
  filename: 'd06_ceo_stakeholder_roadmap_q3q4_tag6.pdf',
  title: 'Notiz – Stakeholder-Roadmap Q3/Q4',
  type: 'document',
  content: `Von: CEO-Stab
An: CEO, Führungskreis
Betreff: Stakeholder-Roadmap Q3/Q4 – Erwartung steuern

Bank, Kunden, Lieferanten und Belegschaft fordern Orientierung für die kommenden Monate. Eine Roadmap erfüllt diese Erwartung, birgt jedoch das Risiko, dass Abweichungen öffentlich als Kontrollverlust gelesen werden. Das Dilemma: Verbindlichkeit schafft Vertrauen, zu große Präzision macht angreifbar.

Wir schlagen eine Roadmap vor, die beides ausbalanciert: klare Eckpunkte für die nächsten 60 und 90 Tage, ergänzt um definierte Ausweichpfade. Inhalte: Bankgespräche mit Reporting-Milestones, Kundenrunden zu Lieferplänen, Lieferanten-Check-ins zu kritischen Teilen, interne Formate (Townhalls, Betriebsratssitzungen). Für jeden Punkt wird das Zielbild formuliert und eine Antwort auf die Frage: „Was tun wir, wenn es anders kommt?“.

Kommunikation differenziert: Intern detaillierter, damit Führungskräfte handlungsfähig bleiben. Gegenüber Bank und A-Kunden verdichtet, aber mit festen Terminen. Öffentlich nur die Leitplanken, um Spekulationen nicht zu befeuern.

Die Roadmap ist kein Poster für die Wand, sondern ein Steuerungsinstrument. Sie muss gepflegt werden – wenige Punkte, dafür belastbar. Terminverschiebungen melden wir von uns aus, bevor sie zum Gerücht werden. So entsteht innen wie außen das Bild einer Organisation, die die nächsten Kurven kennt und bewusst steuert.`
},

'd06_cfo_apsteuerung_tag6.pdf': {
  filename: 'd06_cfo_apsteuerung_tag6.pdf',
  title: 'Verfügung – AP‑Steuerung: Zahlungsdisziplin mit Augenmaß',
  type: 'document',
  content: `Von: CFO-Stab an CFO (Vorschlag)
An: Einkauf, Buchhaltung, Treasury
Betreff: Zahlungsstopp für nichtkritische Posten – Umsetzung bis Payroll T‑3

Ausgangslage
Der nachgeholte Lohnlauf steht an. Parallel erwartet die Hausbank nach dem Auflagenbrief  ein sichtbares Maß an Disziplin und Vorhersehbarkeit. Wir müssen Liquidität sichern, ohne Lieferketten und Reputation unnötig zu belasten. „Business as usual“ ist in dieser Phase kein handhabbarer Ansatz – ebenso wenig eine pauschale Vollbremsung.

Steuerungsprinzip
Wir priorisieren Zahlungen entlang zweier Achsen: (1) Kritikalität für Lieferfähigkeit/Sicherheit/Compliance und (2) wirtschaftlicher Beitrag Lieferungen zu Produkten (Deckungsbeitrag, Vertragsstrafen, A‑Kunden‑Abhängigkeit). Daraus entstehen drei Klassen:
• Klasse A – sicherheits‑/produktions‑/rechtskritisch: Zahlungen laufen.  
• Klasse B – betriebsnotwendig, aber verschiebbar: Tageskorridor; Freigabe nur mit kurzer Begründung.  
• Klasse C – nichtkritisch: Stopp bis nach Payroll; Ausnahmen nur mit CFO‑Freigabe.

Vorgehen ab sofort
1) Einkauf kennzeichnet alle offenen Posten in A/B/C und ergänzt je B‑Fall eine Zwei‑Zeilen‑Begründung (Zweck, erwarteter Beitrag).  
2) Buchhaltung setzt für B/C einen „Hold“ im System und legt ein Tageslimit je Werk fest; A‑Posten werden ausgenommen.  
3) Treasury erstellt 13‑Uhr‑Sicht auf fällige/gestoppte Beträge inkl. Abweichungen zum Vortag und verteilt sie an CEO/CFO/OPS.  
4) Top‑5‑Lieferanten: Ratenpläne sind zulässig, sofern sie planbare Leistung sichern. Vereinbarungen sind schriftlich zu fixieren (Zeithorizont, Meilensteine, Rücksprungpunkt).

Kommunikation nach außen
Tonlage: respektvoll, sachlich, planbar – keine Rechtfertigungen, keine Drohkulisse. Vorschlagstext: „Wir priorisieren Zahlungen derzeit nach Lieferkritikalität und vereinbarten Meilensteinen. Für Ihren Posten schlagen wir eine gestaffelte Abwicklung vor. Unser Ziel ist Verlässlichkeit – wir melden Abweichungen früh.“ Damit vermeiden wir, dass selektive Zurückstellungen als Willkür gelesen werden und reduzieren das Risiko von Eskalationen.

Compliance und Dokumentation
Die Compliance‑Vorprüfung macht Sorgfalt zwingend: Jeder Ausnahmefall erhält einen Kurzvermerk (Grund, Betrag, Datum, Entscheider). Kein Workaround über Bar‑ oder Privatkonten, keine eigenmächtigen Zusagen einzelner. Rückfragen von Prüfstellen beantworten wir mit Prozess und Dokumentation, nicht mit Einzelfallanekdoten.

Schnittstellen
• OPS: Meldet tagesaktuelle Material‑/Kapazitätsengpässe, damit A/B‑Einstufungen belastbar bleiben.  
• Vertrieb: Eskalationsfälle mit A‑Kunden frühzeitig spiegeln, um Pönalen zu vermeiden.  
• Bank: Kurzlage zu „Zahlungsdisziplin“ ins wöchentliche Reporting übernehmen.

Wirkungen:
Kompletter Stopp ca. 75000 Euro.
Teilweiser Stopp ca. 40000 Euro
Ratenpläne mit Top-Lieferanten ca. 50000 Euro

Zielbild
Weniger Geräusch, mehr Muster: planbare Freigaben, begründete Ausnahmen, konsistente Sprache. So sichern wir die Payroll und stärken gleichzeitig das Bild einer steuerbaren Liquidität.`
},

'd06_cfo_vorauszahlungen_tag6.pdf': {
  filename: 'd06_cfo_vorauszahlungen_tag6.pdf',
  title: 'Memo – Vorauszahlungen Top‑10: früheres Geld gegen echte Gegenleistung',
  type: 'document',
  content: `Von: CFO
An: Vertrieb, CEO
Betreff: Vorauszahlungen bei Top‑Kunden – Leitplanken, Gesprächsführung, Risiken

Ausgangslage
Mehrere Kernkunden signalisieren Bereitschaft, Zahlungen vorzuziehen, sofern ihnen ein Gegenwert entsteht. Der Ansatz ist verlockend, weil planbare Zuflüsse die Bankerwartung stützen. Gleichzeitig verschieben Rabatte Erwartungshorizonte dauerhaft und können als Schwächesignal gelesen werden.

Leitplanken
• Selektivität: Nur stabile Kundenbeziehungen mit geringer Reklamationsquote und verlässlichem Abrufverhalten.  
• Gegenleistung: Nicht „Rabatt gegen Geschwindigkeit“, sondern „Planbarkeit gegen Kondition“ (verbindliche Abnahmefenster, Fixtermine, schlanke Change‑Requests).  
• Befristung: Jedes Angebot hat ein Ablaufdatum sowie einen klaren Rücksprungpunkt auf Standardkonditionen.  
• Governance: Jede Vereinbarung benötigt CFO‑Freigabe; keine individuellen „Deals“ ohne Schriftform.

Gesprächsführung (Vorschlag)
„Wir konsolidieren aktuell unsere Zahlungsströme. Wenn Sie Kapazitätssicherheit früh erhalten möchten, können wir Rechnungsstellung/Teilfakturierung vorziehen – im Gegenzug sichern Sie verbindliche Abruffenster zu. So entsteht Planbarkeit auf beiden Seiten. Rabatte setzen wir bewusst sparsam und befristet ein; wichtiger ist uns Verlässlichkeit in Termin und Menge.“

Operative Umsetzung
• Rechnungslogik: Wo möglich, Meilenstein‑Fakturierung statt pauschaler Vorkasse; Anzahlungsscheine sauber kennzeichnen.  
• Recht/Steuern: AGB‑Prüfung, Vorleistungs‑ und Eigentumsvorbehaltsklauseln klären; keine Nebenabsprachen per Mail.  
• Reporting: Vertrieb liefert wöchentlich eine Kundenliste „Voran‑Cash“ mit Betrag, Gegenleistung, Enddatum; Treasury spiegelt Effekte im 13‑Wochen‑Plan.

Risiken und Gegenmaßnahmen
• Marge: Konditionen strikt befristen, „Rabattspirale“ vermeiden.  
• Reputation: Keine pauschalen Rundschreiben; individuelle, ruhige Ansprache.  
• Abhängigkeit: Keine Kopplung „Vorauszahlung = Priorität um jeden Preis“. Priorisierung bleibt an Kritikalität/DB ausgerichtet und wird gegenüber OPS transparent gemacht.

Zielbild
Früheres Geld ist ein Werkzeug – nicht unser Narrativ. Wir verkaufen Planbarkeit, nicht Unsicherheit. So entsteht Liquidität, ohne Vertriebsrealität und Bankvertrauen zu untergraben.

Was ist drin?
10 % Rabatt gegen 100 % Vorkasse auf laufende Aufträge: cash: +300000, Loss -45000
5 % Rabatt gegen 50 % Vorkasse (Top-5 Kunden): cash: +150000, Loss: -25000
 Meilenstein-Rechnungsstellung vorziehen (ohne Rabatt) cash: +80000
`
},

'd06_cfo_abgabenstundung_tag6.pdf': {
  filename: 'd06_cfo_abgabenstundung_tag6.pdf',
  title: 'Anschreiben – Antrag auf befristete Stundung von Abgaben und Sozialversicherungsbeiträgen',
  type: 'document',
  content: `Von: CFO
An: Finanzamt für Körperschaften / zuständige Einzugsstellen
Betreff: Antrag auf befristete Stundung – geordnete Sicherung der Zahlungsfähigkeit

Sehr geehrte Damen und Herren,

im Zuge einer eng getakteten Stabilisierung (vgl. Bankauflagen) beantragen wir die befristete Stundung der anstehenden Lohnsteuer‑ und Sozialversicherungsbeiträge. Hintergrund sind temporäre Verschiebungen auf der Einzahlungsseite bei parallel hoher Notwendigkeit, den Lohnlauf fristgerecht sicherzustellen.

Unser Ziel ist Planbarkeit: Wir schlagen eine befristete Stundung mit festen Zwischenständen vor. Die Rückführung soll entlang abgesicherter Zahlungsmeilensteine erfolgen. Wir verzichten bewusst auf informelle Verzögerungen – der geordnete, nachvollziehbare Weg ist für alle Beteiligten vorzugswürdig.

Beigefügt finden Sie:
• Kurzlage Liquidität (13‑Wochen‑Sicht) mit markierten Stichtagen,  
• Übersicht vorgesehener Einzahlungen aus Kundenprojekten (ohne vertrauliche Einzelangaben),  
• Bestätigung unserer Reporting‑Taktung und Ansprechstellen.

Für ein kurzes Abstimmungsgespräch stehen wir kurzfristig zur Verfügung. Unser Anliegen ist keine Dramatisierung, sondern die verlässliche Bedienung aller Verpflichtungen im vereinbarten Rahmen.

Mit freundlichen Grüßen
CFO`
},

'd06_cfo_factoringpilot_tag6.pdf': {
  filename: 'd06_cfo_factoringpilot_tag6.pdf',
  title: 'Vorbereitungsnotiz – Factoring‑Pilot „silent assignment“',
  type: 'document',
  content: `Von: Treasury
An: CFO
Betreff: Factoring‑Pilot – Datenraum, Kommunikation, Rücksprungpunkt

Ausgangslage
Zur kurzfristigen Stärkung der Liquidität prüfen wir einen eng umrissenen Factoring‑Piloten. Ziel ist Handlungsfähigkeit ohne Nebengeräusche in Richtung Kunden oder Presse. Bevorzugt wird die stille Zession („silent assignment“), damit Kundenbeziehungen ungestört bleiben.

Arbeitsplan (zwei Wochen)
1) Portfolio‑Screening: Auswahl bonitätsstarker Forderungen mit klarer Leistungsabnahme, keine strittigen Fälle.  
2) Datenraum: Debitorenlisten, Historien, Alterungsanalysen, Abtretungsfähigkeit je Vertrag.  
3) Recht/Verträge: Prüfung Abtretungsverbote, Covenants, erforderliche Zustimmungen; Standard‑Abtretungstexte vorbereiten.  
4) Anbieter‑Shortlist: Zwei seriöse Faktoren, Konditionsrahmen, Servicelevel, Abwicklungsgeschwindigkeit.  
5) Buchung/Prozess: Klare Zuordnung von Gebühren, Auszahlungen, Rückläufern; Verantwortlichkeiten in Buchhaltung/Treasury.  
6) Kommunikation: Kein Breitrundschreiben; bei Bedarf neutrales Wording („Standard‑Working‑Capital‑Instrument, begrenzter Umfang“).  
7) Rücksprungpunkt: Abbruchkriterien (Konditionsverschlechterung, zu hoher Kunden‑Touch, Prozessinstabilität) vor Start definieren.

Risikobild
• Marge: Gebühren sind Preis für sofortige Liquidität – wir begrenzen den Umfang, messen Nutzen pro Euro.  
• Kundenwahrnehmung: „Silent“ bleibt nur „silent“, wenn Prozesse sauber greifen; daher Testlauf mit enger Begleitung.  
• Operative Reibung: Fakturakette und Reklamationsbearbeitung sauber abbilden, damit keine Doppelarbeit entsteht.

Möglichkeiten:
 Pilot 250k, Gebühren 25k
 Nur 100k pilotieren, Gbeühren 10k
 Vollprogramm (>500k) sofort, Gebühren 50k

Ergebnisnutzung
Der Pilot ist kein Selbstzweck: Entweder bestätigt er, dass das Instrument in engen Fenstern sinnvoll skaliert werden kann – oder er liefert Argumente, ihn geordnet zu beenden. Beides ist ein gutes Ergebnis, solange es dokumentiert und kontrolliert erfolgt.`
},
'd06_ops_dual_sourcing_ppap_plan_tag6.pdf': {
  filename: 'd06_ops_dual_sourcing_ppap_plan_tag6.pdf',
  title: 'Technisches Briefing & Prüfplan – Dual‑Sourcing (Express‑Qualifizierung)',
  type: 'document',
  content: `INTERN – OPS/QS – TECHNISCHES BRIEFING
Betreff: Express‑Qualifizierung Zweitlieferant (kritische Dreh-/Frästeile)

1) Hintergrund und Ziel
Der Hauptlieferant hat Vorkasse gefordert; die Versorgung ist angespannt. Parallel signalisiert ein Zweitlieferant ein Startfenster (Pilotcharge in 2–3 Wochen). Ziel ist eine belastbare, risikominimierte Express‑Qualifizierung mit begrenztem Freigabefenster, um die Lieferfähigkeit in den nächsten 60 Tagen zu stabilisieren (Kosten 6k).

2) Vorgehen in drei Strängen
A. Dokumentation (PPAP Level 3 – automotive‑nah)
   • DFMEA/PFMEA, Control Plan, Prozessfluss, Messsystemanalyse (MSA)
   • Erstmusterprüfbericht (EMPB) auf kritische Maße
   • Material-/Leistungstests inkl. Laborzertifikate
   • Part Submission Warrant (PSW) nach erfolgreicher Run@Rate
B. Produktion & Test
   • Erstmuster: 30–50 Teile unter Serienbedingungen
   • AQL‑basiertes Prüfregime (AQL = akzeptierte Qualitätsgrenze; pragmatisch 0,65–1,0 bei kritischen Merkmalen)
   • Run@Rate: min. 2 h, Zielleistung = Serienbedarf/h, Ausschuss < 2 %
C. Kunden-/Kommunikationspfad
   • Proaktive Information Top‑Kunden (A‑Kunden) über kontrollierte Zweitquelle
   • Lieferfreigabe in Wellen: Sicherheitsmenge an A‑Kunden, Monitoring wöchentlich

3) Zeitplan (Tageslogik ab Tag 6)
   • Tag 6–7: Dokumentenpaket (FMEA/CP/MSA) sichten, Messmittelabgleich
   • Tag 8–9: Erstmusterprüfung (50 Stk.), Labor parallel
   • Tag 10: Vor‑Audit remote (Prozess, SPC‑Nachweise)
   • Tag 11: Run@Rate vor Ort, Abnahmeprotokoll
   • Tag 12: Conditional Release (bedingt), Volumenfreigabe ≤ 20 % Anteil
   • Tag 13–20: Monitoring (PPM, OEE, Nacharbeit), wöchentliche Review
   • Tag 21+: ggf. volle Freigabe

4) Risiko‑/Maßnahmen‑Matrix (Auszug)
   • Maßabweichung kritisches Merkmal → Sofortmaßnahme: 100 % Sortierung; Poka‑Yoke nachziehen
   • Messsystem unsicher → MSA wiederholen (GR&R), alternative Lehre einsetzen
   • Kapazitätslücke → Parallel‑Los beim Hauptlieferanten sichern; Priorisierung A‑Kunden
   • Know‑how‑Leak → Zeichnungsstufen verknappen, Clean‑Team‑Prinzip

5) Begriffe im Kontext
   • PPAP (Production Part Approval Process): strukturierter Freigabeprozess vor Serienbelieferung.
   • Run@Rate: Nachweis, dass ein Prozess die geforderte Ausbringung stabil liefert.
   • AQL: statistische Obergrenze der Fehlerquote, die im Prüflos noch akzeptiert wird.

6) Governance & Freigabekriterien
   • Freigabe‑Board: QS‑Leitung, Produktion, Einkauf, OPS; bei Abweichungen CFO/Legal involvieren (Garantie-/Haftungsfragen).
   • KPI‑Trigger für Eskalation: PPM > 150 in Woche 1, OTD‑Gefährdung bei A‑Kunden, Laborfail.

   Alternativen:
   Vorauszahlung akzeptieren: 18k
   Fremdfertigung zukaufen: 10k
   

Anlagen (intern):
   1. Prüfplan K‑Merkmale (Draft)
   2. Checkliste Run@Rate/Abnahme
   3. Kundentemplate „Zweitquelle – Qualitätssicherung”
`
},

'd06_ops_schichtmodell_flexpool_beschluss_tag6.pdf': {
  filename: 'd06_ops_schichtmodell_flexpool_beschluss_tag6.pdf',
  title: 'Beschlussvorlage OPS: Flex‑Pool & Kurzarbeit (selektiv) – Schichtmodell Woche 2',
  type: 'document',
  content: `VERTRAULICH – VORSTAND/BR
Betreff: Schichtmodell Woche 2 – Flex‑Pool für Engpässe, Kurzarbeit in Stillstandsbereichen

Executive Summary
Volatile Materiallage führt zu Überlast in Engpasslinien und Leerläufen in anderen Bereichen. Wir schlagen ein hybrides Schichtmodell vor: selektive Kurzarbeit dort, wo Material fehlt; ein Flex‑Pool (qualifizierte Springer) stabilisiert kritische Linien (Einsparung 15k). Kommunikationspaket an Führungskräfte/BR vorbereitet.

1) Zielbild
   • Termintreue für A‑Kunden priorisieren
   • Überstunden reduzieren, Gesundheit schützen
   • Transparenz gegenüber BR, saubere Dokumentation

2) Maßnahmenpaket
   A. Flex‑Pool (10–15 MA, befristet)
      – Qualifikationsmix: Montage, QS‑Endprüfung, Instandhaltung
      – Rufbereitschaft geregelt; Einsatzplanung 48 h‑Raster
   B. Kurzarbeit selektiv
      – Bereiche ohne Freigaben/Material; wöchentlicher Review
      – Rotationsprinzip (Fairness), Kriterienkatalog dokumentiert
   C. Führungsroutine
      – Daily 15 min an den Engpasslinien (Sicherheits‑/Qualitätscheck, Kapazität)
      – Wochenreview mit BR‑Vertreter (Stimmung, Belastung)

3) Kommunikationslinien (internal only)
   • „Sicherheit & Planbarkeit“ betonen; kurzfristige Anpassungen werden erklärt
   • Kein Generalverdacht: Kurzarbeit ist kein „Downgrade“, sondern temporäre Steuerung
   • Ansprechpartner je Schicht sichtbar (Aushang & Intranet)

4) Rechtliche/soziale Leitplanken
   • Kurzarbeit nach Anzeige/Prüfung HR/Legal; Dokumentation Anwesenheiten
   • Gesundheitsschutz: 10‑h‑Grenze, Ruhezeiten; Nachsteuerung bei Auffälligkeiten
   • Betriebsrat frühzeitig einbinden (Protokoll, Kriterien, Evaluation)

5) Risiken & Mitigation
   • Friktion im Team → Rotationslogik + transparente Kriterien
   • Qualitätseinbruch in Engpasslinien → Doppelter Start‑of‑Shift‑Check, zusätzliche QS‑Stichprobe
   • Wissensinseln → Kurztrainings (30–60 min) vor Einsatz Flex‑Pool

6) Monitoring
   • OTD/OTIF in kritischen Linien (täglich)
   • Abwesenheits-/Überstundenquote (wöchentlich)
   • Reklamationen/PPM (wöchentlich)
   • BR‑Feedback (Jour fixe)

   7) Alternativen:
   Überstunden in kritischen Linien, Rest Normalbetrieb 8k
   Leihkräfte 17k

Anlagen:
   1. Einsatzraster Flex‑Pool (Muster)
   2. Kriterienkatalog Kurzarbeit (Entwurf)
   3. Teamleitfaden: Schichtbriefing 7‑5‑3 (Ziele/Belastung/Risiken)
`
},

'd06_ops_containment_qs_programm_tag6.pdf': {
  filename: 'd06_ops_containment_qs_programm_tag6.pdf',
  title: 'Containment‑Programm Qualität – Kundeninformation & interne Arbeitsanweisung',
  type: 'email',
  content: `VON: Leitung QS
AN: Key Accounts (A‑Kunden), Vertrieb, COO
BETREFF: Sofortmaßnahmen Qualität – Containment & Kundenunterstützung

Sehr geehrte Damen und Herren,

wir setzen mit sofortiger Wirkung ein befristetes Containment‑Programm für zwei Produktfamilien auf. Ziel ist, die Lieferfähigkeit zu sichern und Reklamationen zuverlässig zu verhindern, bis die Ursachenanalyse abgeschlossen und die Abstellmaßnahmen greifen.

WAS WIR TUN
• 100 %‑Prüfung für kritische Merkmale in den betroffenen Linien (befristet)
• Separater Materialfluss: „gesperrt“ → „sortiert“ → „frei gegeben“ (farbcodiert)
• Kundenseitig: Liaison‑Unterstützung nach Bedarf (Vor‑Ort oder Remote), 8D‑Reports entlang definierter Meilensteine
• Zusätzliche Stichproben an Wareneingang/Warenausgang (AQL‑gestützt)

Alternativen
100 %-Prüfung temporär (5k)
Gezielte Stichprobe, Sperrbestände separieren: 0k
Kunden-Liaison-Engineer einsetzen (6k)

WAS WIR NICHT TUN
• Wir liefern nichts aus, das nicht den Prüfkriterien entspricht.
• Wir versprechen keine endgültige Ursache, bevor die Daten belastbar sind.

ZEITBILD
• D0–D1: Sofortmaßnahmen (Sortierung, Sperrbestände separieren)
• D2–D5: Analyse (Ishikawa, 5‑Why, Messsystemcheck), Zwischenbericht
• D6+: Wirksamkeitsprüfung der Abstellmaßnahmen, schrittweise Rücknahme der 100 %‑Prüfung

BEGRIFFE IM KONTEXT (kurz)
• Containment: Vorübergehender „Schutzzaun“, der Fehlerdurchlauf zum Kunden verhindert.
• 8D‑Report: Strukturierter Problemlösungsbericht in acht Disziplinen (Team, Problem, Sofortmaßn., Ursachen, Abstellung, Wirksamkeit, Prävention, Abschluss).
• AQL: Akzeptierte Qualitätsgrenze – statistische Definition für Stichprobenprüfung.

KONTAKT
• QS‑Leitung: [Name], Tel. [xxx], Mail [xxx]
• Kunden‑Liaison: [Name], Tel. [xxx], Mail [xxx]
• Eskalation (COO): [Name], Mobil [xxx]

Intern – Arbeitsanweisung (Auszug)
1) Materialfluss umbrechen; rot/gelb/grün Kennzeichnung
2) Prüfanweisung: kritische Maße 100 %, Nebenmerkmale AQL 0,65–1,0
3) Dokumentation im Prüfprotokoll (digital), Losverfolgung sicherstellen
4) Abweichung → Quarantäne, 8D D3 aktualisieren, Teamleiter informieren

Mit freundlichen Grüßen
[Unterschrift QS‑Leitung]`
},

'd06_ops_spediteur_dieselzuschlag_positionspapier_tag6.pdf': {
  filename: 'd06_ops_spediteur_dieselzuschlag_positionspapier_tag6.pdf',
  title: 'Positionspapier Logistik: Dieselzuschlag, Cap & Einsatzkriterien Express',
  type: 'memo',
  content: `AN DEN SPEDITEUR – VERHANDLUNGSGRUNDLAGE (ENTWURF)
Betreff: Anpassung Dieselzuschlag & Einsatzkriterien Express/Nacht

Ausgangslage
Steigende Dieselpreise und ein höherer Expressanteil treiben die Frachtkosten. Ziel ist ein planbarer Zuschlag mit Kostendeckel (Cap) sowie klare Einsatzkriterien für Expresssendungen, um Terminrisiken zu reduzieren, ohne die Marge dauerhaft zu belasten.

Vorschlagspaket
1) Dieselzuschlag – Cap‑Modell
   • Indexbindung (z. B. DE‑Dieselindex) mit monatlicher Justierung
   • Cap/Deckel je Sendungskategorie (Standard, Express, Nacht)
   • Transparenter Basiswert; gleitende Bandbreite (Beispiel: ±x %)
2) Einsatzkriterien Express/Nacht
   • Zulässig für: A‑Kunden, drohende Pönale, medizinisch/sicherheitskritische Teile
   • Freigabeprozess: OPS‑Freigabe + Vertriebskürzel; nachträgliche Prüfung in Weekly‑Review
   • Alternativen prüfen: Vorziehen, Konsolidieren, Tourentausch
3) Service‑Level & Reporting
   • OTIF‑Ziele (On‑Time‑In‑Full) je Kategorie
   • Monatsreport mit Kosten, OTIF, Root‑Cause bei Abweichungen
   • Quartalsgespräch über Optimierungen (Routen, Konsolidierung)

Kundenseitige Kommunikation (intern vorbereitet)
   • Bei zwingendem Express: Vorabinfo an Kunde mit Gründen (Termin/Pönale/Qualität)
   • Wo möglich: Kostenneutrale Alternativen (Slottausch, Bündelung, frühere Abholung)
   • Einheitliche Begründungsliste, um Diskussionen zu verkürzen

Risiken & Absicherung
   • Marktschwankung Treibstoff → Index/Cap statt fixer Zuschlag
   • Serviceeinbruch bei zu striktem Regime → Ausnahmetür mit Genehmigungspfad
   • Reputationsrisiko bei Kostendurchreichung → saubere Belege, SLA‑Bezug, Vorabtransparenz

Begriffe im Kontext
   • „Cap“: Obergrenze; Mehrkosten oberhalb des Caps werden nicht weitergegeben.
   • OTIF: Lieferungen termingerecht und vollständig; harte Servicekennzahl.
   • Pönale: Vertragsstrafe bei Nichteinhaltung von Liefer-/Qualitätszusagen.

Nächste Schritte
   • Termin mit Spediteur: Varianten „Cap“ vs. „Fix + Bandbreite“ gegeneinander legen
   • Testmonat mit Reportpflicht starten; danach Finale
   • Interne Schulung: Wann Express? – Entscheidungsleitfaden für Vertrieb/OPS

   INTERN ALTERNATIVEN:
 Pauschale mit Cap vereinbaren -2000
 Einsatzkriterien auf A-Kunden/Pönale beschränken -1000
 Zuschlag akzeptieren -4000
 Kunden an Mehrkosten beteiligen -1500

Anlage:
   1. Muster‑Report Logistik (OTIF/Kosten je Kategorie)
   2. Entscheidungsbaum „Express ja/nein”
   3. Formblatt „Express‑Freigabe”`
},
'd06_hrlegal_betriebsuebergang_br_info_tag6.pdf': {
  filename: 'd06_hrlegal_betriebsuebergang_br_info_tag6.pdf',
  title: 'Aktennotiz an den Betriebsrat – Teilverkauf/Carve‑out & § 613a BGB (Vorinformation)',
  type: 'document',
  content: `VERTRAULICH – ARBEITSRECHT / BR
Von: Leiterin Recht & Arbeitsbeziehungen
An: Betriebsratsvorsitzende/r (Vorabinformation gem. guter Praxis)
Betreff: Geplanter Teilverkauf/Carve‑out – Eckpunkte der Arbeitnehmerseite

1) Anlass
Wir bereiten einen strukturierten Teilverkauf (Minderheitsbeteiligung/JV‑ähnliches Setup) einer Tochter bzw. eines abgegrenzten Geschäftsbereichs vor. Zielbild: Eigenkapitalstärkung und operative Entflechtung ohne Kompetenzverlust. Die Bank hat einen Rahmen aus Meilensteinen und Reporting gesetzt; wir wollen keine Fakten schaffen, sondern rechtzeitig eine gemeinsame Linie finden.

2) Was das für Beschäftigte bedeutet
• Sollte es zu einem Betriebsübergang i.S.d. § 613a BGB kommen, gehen Arbeitsverhältnisse mit allen Rechten/Pflichten auf den Erwerber über; Kündigungen „wegen des Übergangs“ sind unzulässig.  
• Bestehende Betriebsvereinbarungen gelten als Inhalt der Arbeitsverhältnisse fort; Anpassungen nur über verhandelte Lösungen.  
• Unterschied zwischen „Share Deal“ (Anteilskauf, oft ohne 613a‑Übergang) und „Asset Deal“ (Übertragung von Betrieb/Teilbetrieb, regelmäßig 613a‑relevant).

3) Vorgehensvorschlag – Beteiligung & Fairness
• Frühe BR‑Einbindung in einer vertraulichen Arbeitsgruppe („Clean Team“: notwendige Infos, personenbezogen minimiert).  
• Interessenausgleich/Sozialplan nur falls strukturelle Änderungen geplant sind; heute keine Entscheidung hierüber.  
• Transparenz: Informationsschreiben an Betroffene erst nach Klarheit der Struktur; Q&A‑Sprechstunden parallel.

4) Schutzmechanismen, die wir verankern wollen
• Standort‑ und Beschäftigungssicherung in Kernbereichen (regelmäßig befristete Klauseln).  
• Anrechnung von Betriebszugehörigkeit und Besitzständen (Zulagen, Sonderzahlungen) in Zielgesellschaft.  
• Mitbestimmung fortführen: Wahlgremien, BV‑Fortgeltung, ggf. Übergangs‑BV.

5) Begriffe kurz erläutert
• Carve‑out: Abtrennung eines Geschäfts(teils) in eine eigene Einheit; organisatorisch/IT/HR erfordert klare Schnittstellen.  
• § 613a BGB: Schutzregel beim Übergang von Betrieben/Teilbetrieben – Rechte und Pflichten gehen über, Kündigungen „wegen des Übergangs“ sind unwirksam.  
• Clean Team: Kleiner, verpflichteter Personenkreis, der sensible Informationen (z. B. Gehälter, Kundendetails) in aggregierter/geschwärzter Form bearbeitet.

6) Zeitliche Leitplanken (ohne Vorwegnahme von Ergebnissen)
• Woche 1–2: Strukturprüfung (Share vs. Asset), datenschutzarme Szenarien.  
• Woche 3+: Erstes gemeinsames Briefing mit BR‑Spitze, Linien‑HR, Legal.  
• Nach LOI‑Klarheit: Betroffenenkreis definieren, Informationsschreiben vorbereiten.

Wir wollen die Diskussion auf Augenhöhe führen und bitten um einen kleinen Kreis für die Vorabstimmung.`
},

'd06_hrlegal_betriebsvereinbarung_kommunikation_tag6.pdf': {
  filename: 'd06_hrlegal_betriebsvereinbarung_kommunikation_tag6.pdf',
  title: 'Betriebsvereinbarung – Kommunikations‑ und Vertraulichkeitsleitlinie in Veränderungsprozessen (Entwurf)',
  type: 'document',
  content: `ENTWURF – BETRIEBSVEREINBARUNG


Präambel
In Phasen mit hoher Exponierung (Restrukturierung, Investorengespräche, Carve‑outs) ist eine verlässliche, respektvolle Kommunikation wesentlich für Arbeitsfrieden, Gesundheitsschutz und die Reputation des Unternehmens.

§1 Ziele
(1) Vermeidung von Gerüchten, widersprüchlichen Aussagen und Leaks.  
(2) Sicherstellung schneller, belastbarer Informationen für Beschäftigte.  
(3) Schutz personenbezogener Daten und Geschäftsgeheimnisse.

§2 Informationswege
(1) Regel‑Formate: Monats‑Townhall, Bereichs‑Updates, BR‑Jour fixe.  
(2) Ad‑hoc: Innerhalb von 48 h bei wesentlichen Entwicklungen.  
(3) Q&A‑Drehscheibe im Intranet; Antworten durch zuständige Fachbereiche.  
(4) Hinweisgebersystem bleibt unberührt; Meldungen werden vertraulich behandelt.

§3 Freigabeprozess (Need‑to‑know)
(1) Inhalte, die Markt‑/Vertrags‑ oder Personaldaten berühren, werden vor Veröffentlichung durch Kommunikation + Legal + HR geprüft.  
(2) Sprecherregelung: CEO/CFO (Finanz‑/Strategiethemen), HR (Personal), BR‑Vorsitz (BR‑Sicht).  
(3) Externe Medienkontakte erfolgen ausschließlich über die Pressestelle.

§4 Umgang mit sensiblen Inhalten
(1) Datenminimierung: Nur notwendige Fakten, keine Einzelgehälter, keine Klarnamen in Entwürfen.  
(2) Pseudonymisierung/Schwärzung bei Dokumenten für Dritte (z. B. Investoren).  
(3) Dokumentationspflicht: Freigaben versioniert, Aufbewahrung nachvollziehbar.

§5 Gesundheitsschutz / Belastungssteuerung
(1) Führungskräfte achten auf realistische Taktung von Informationsflüssen.  
(2) Bei erhöhter Belastung werden zusätzliche Sprechstunden (HR/BR) angeboten.

§6 Schlussbestimmungen
(1) Geltung für die Dauer des Veränderungsprozesses; Überprüfung alle 4 Wochen.  
(2) Diese BV berührt Mitbestimmungsrechte nicht und ersetzt keine Beteiligungsverfahren.

Erläuterung (nicht Bestandteil der BV)
• Need‑to‑know: Zugriff nur für Personen, die Informationen zur Aufgabenerfüllung zwingend benötigen.  
• Pseudonymisierung: Ersetzen von Identifikatoren (z. B. Namen) durch Codes; Rückführbarkeit bleibt intern geschützt.  
• „Leak“: Unbefugte Weitergabe; interne Meldemöglichkeit bleibt gewahrt.`
},

'd06_hrlegal_spa_haftungsrahmen_notiz_tag6.pdf': {
  filename: 'd06_hrlegal_spa_haftungsrahmen_notiz_tag6.pdf',
  title: 'Internal Legal Note – SPA‑Werkzeugkasten (Haftungscaps, Escrow, MAC, W&I)',
  type: 'document',
  content: `VERTRAULICH – NUR INTERN (CEO/CFO/Legal)
Betreff: SPA‑Leitplanken für Teilverkauf – Ausgewogener Haftungsrahmen

Kontext
Wir bereiten die Vertragsarchitektur für einen Anteilskaufvertrag (SPA) vor. Ziel ist ein robustes, bankkompatibles Setup ohne Überfrachtung – pragmatisch verhandelbar, mit klaren Triggern.

1) Haftungsarchitektur – Kernelemente
• Cap: Gesamtobergrenze der Verkäuferhaftung; marktüblich im zweistelligen Prozentbereich des Kaufpreises.  
• Basket / De‑minimis: Kleinere Ansprüche werden gebündelt; nur oberhalb eines Schwellenwerts wird gehaftet.  
• Escrow: Treuhandkonto zur Absicherung definierter Risiken für eine befristete Zeit; Rückzahlung bei Ausbleiben von Claims.  
• Survival Periods: Laufzeiten der Zusicherungen (z. B. 18–24 Monate allgemein; länger bei Steuer/IP).  
• Bring‑down: Zusicherungen werden zum Closing erneut bestätigt; Abweichungen lösen Rechte aus.

2) Risikoklauseln
• MAC‑Klausel („Material Adverse Change“): Präzise und objektiv fassen; externe, beidseitig unbeeinflussbare Ereignisse adressieren – operative Normalfluktuation ausnehmen.  
• „No Leakage“ (bei Carve‑outs): Keine Wertextraktionen zwischen Stichtag und Closing außerhalb definierter Ausnahmen.  
• „Conduct of Business“: Geschäftsgang in der Übergangsphase; Genehmigungsliste (consent list) für außergewöhnliche Maßnahmen.

3) W&I‑Versicherung (Warranty & Indemnity) (10k/15k)
• Dient zur Absicherung von Gewährleistungsrisiken; Prämie vs. Entlastung des Haftungsvolumens abwägen.  
• „Light“ bedeutet: zentrale Zusicherungen versichert, Ausnahmekatalog bleibt.

4) Verhandlungssignale (ohne Festlegung auf Optionen)
• Bankerwartung: Klarer, messbarer Trigger‑Katalog unterstützt Vertrauen.  
• Käuferseite drängt oft auf breitere Reps; wir schlagen einen „balanced“ Zuschnitt vor mit punktuellem Tiefgang (Steuern, IP, Arbeitsrecht).

5) Begriffe
• Escrow: Treuhandlösung – neutraler Dritter verwahrt einen Teil des Kaufpreises bis Fristablauf/Claim‑klärung.  
• MAC: Wesentliche nachteilige Veränderung – muss eng definiert werden, um Rechtsunsicherheit zu vermeiden.  
• W&I: Versicherungslösung, die Repräsentationsrisiken (teilweise) vom Verkäufer auf Versicherer verlagert.

Nächste Schritte
• Redline‑Set vorbereiten (Cap/Basket/Survival/MAC); Freigabe CEO/CFO.  
• Claim‑Prozess (Notice, Fristen, Governance) als Anlage formulieren.  
• Steuer‑Sideletter skizzieren (Sonderlaufzeiten).`
},

'd06_hrlegal_datenraum_redaktionsleitfaden_tag6.pdf': {
  filename: 'd06_hrlegal_datenraum_redaktionsleitfaden_tag6.pdf',
  title: 'Redaktionsleitfaden & Zugriffsmatrix – Due‑Diligence‑Datenraum (DSGVO‑konform)',
  type: 'document',
  content: `DD‑DATENRAUM – REDAKTION & ZUGRIFF (INTERN)
Zweck
Schnelle Bereitstellung prüfrelevanter Unterlagen, ohne Datenschutz‑, Geheimnis‑ oder Vertragsverstöße zu riskieren. Grundlage: Datenminimierung (Art. 5 DSGVO), berechtigtes Interesse (Art. 6 Abs. 1 f DSGVO), Vertraulichkeit (NDA).

1) Redaktionsgrundsätze (Auszug)
• Personenbezug vermeiden: Klarnamen schwärzen; Rollen/IDs verwenden (z. B. „MA‑ID‑017“).  
• Kundensensible Daten: Kundennamen pseudonymisieren, Preisklauseln nur als Bandbreite; Einzelrabatte geschwärzt.  
• Lieferantenverträge: Kündigungs‑/CoC‑Klauseln kenntlich machen; Anhänge mit Bankdaten schwärzen.  
• HR‑Dokumente: Nur aggregierte Statistiken (Headcount, Kostenbänder, Altersstruktur), keine Einzelverträge/Zeugnisse.  
• IP/Tech: Nur Schutzrechtsliste und Zusammenfassungen; Quellcodes/Betriebsgeheimnisse bleiben offline, Einsicht nur im „Read‑only“‑Room nach Ankündigung.

2) Zugriffsmatrix (Rollen)
• Käuferkernteam (Commercial/Finance/Legal): Lesezugriff auf rot markierte Kernordner, kein Download sensibler HR/IP‑Daten.  
• Externe Berater (WP/RA/Tax): Zugriff nach namentlicher Freigabe, Protokollierung aktiv.  
• Interne Projektleitung („Clean Team“): Vollzugriff auf Originale; erstellt geschwärzte Fassungen.  
• Bank/Finanzierer: Paket „Financial Highlights“ (Abschlüsse, Cash‑Forecast, Covenants); keine HR‑Einzelheiten.

3) Dokumentenkategorien & Beispiele
A Legal: Gesellschafterliste, wesentliche Verträge, Streitstände (zusammengefasst).  
B Financial: Jahresabschlüsse, Management Accounts, 13‑Wochen‑Cash, Working‑Capital‑Brücken.  
C Commercial: Top‑10 Kunden, Pipeline, Marktstudien (ohne personenbezogene Details).  
D HR: Organigramme, Skill‑Matrix, FTE‑Entwicklung (aggregiert).  
E Operations: Zertifikate, QS‑Kennzahlen, Lieferkettenrisiken.  
F Compliance: Richtlinien, Auditberichte (Auszüge).  

4) Prozess & Protokollierung
• Vier‑Augen‑Freigabe je Upload (Owner + Legal).  
• Änderungsjournal, Q&A‑Log, Download‑Protokolle wöchentlich prüfen.  
• „Take‑down“‑Pfad: Bei Beanstandung sofortige Entfernung, Ersatzfassung nach Review.

5) Begriffe
• Pseudonymisierung: Ersetzen von Identifikatoren durch Codes; Rückschlüsselung nur intern möglich.  
• Clean Team: Enger Personenkreis, der Originaldaten verarbeitet und geschwärzte Versionen erstellt.  
• CoC‑Klausel (Change‑of‑Control): Zustimmungspflichten bei Eigentümerwechsel; vorab markieren.

Nächste Schritte
• Upload‑Wave 1: Legal/Financial/Commercial Kernpaket; HR/IP in Aggregaten.  
• Schulung Upload‑Owner (30 Min Call, Checkliste „Do/Don’t“).  
• Optional: Externe DPO‑Sichtung (20k), bevor HR‑Aggregationen live gehen.`
}
};