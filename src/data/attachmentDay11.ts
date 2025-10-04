// src/data/attachmentDay11.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day11Attachments: Record<string, AttachmentContent> = {
  'waiver_meilensteine_v1.pdf': {
  filename: 'waiver_meilensteine_v1.pdf',
  title: 'Fact‑Sheet für Key Accounts – Waiver‑Meilensteine (konsistent zur Bank)',
  type: 'document',
  content: `ZWECK
Kompakter Überblick für Schlüsselkunden vor Tag 12. Inhalt spiegelt 1:1 die Bank‑Logik, ohne vertrauliche Zahlen zu nennen.

INHALT (1 SEITE)
1) Fahrplan: Drei Kernmeilensteine mit Zielbild, Statusampel, nächstem belegbaren Schritt.
2) Lieferfähigkeit: A‑Kunden‑Slots, Eskalationspfad, Ansprechpartner.
3) Qualität: Prüfpfad (AQL/100 % befristet), Reklamationsbehandlung (8D), Lessons Learned.
4) Lieferanten: Stabilisierungsschritte (Zahlungsfenster/Anderkonto/Standstill‑Nachfolge).
5) Governance: Wer entscheidet was? Review‑Takt, Audit‑Trail.

Q&A (AUSZUG)
• „Woran messen wir Fortschritt?“ – An nachprüfbaren Belegen (Freigaben, Liefertermine, Abnahmeprotokolle). 
• „Wie gehen Sie mit Risiken um?“ – Vorab definierte Stellhebel + Frühwarnindikatoren; Entscheidungen dokumentiert. 

DO / DON’T
DO: kurz, faktenbasiert, identische Botschaften wie gegenüber der Bank.
DON’T: keine Preis-/Mengenversprechen, keine exklusiven Zusagen. 

BEGRIFFE
• Waiver: Zeitweise Anpassung von Kreditauflagen gegen Auflagen/Nachweise.
• Standstill: Temporäre Ruhe in Forderungen/Leistungen zur Stabilisierung.`
},

'loi_termsheet_v0.docx': {
  filename: 'loi_termsheet_v0.docx',
  title: 'LOI‑Termsheet (Arbeitsentwurf) – Eckpunkte, Ausstieg, Nichtexklusivität',
  type: 'document',
  content: `ZWECK
Rahmen für eine vertiefte Partnerschaft ohne frühzeitige Unumkehrbarkeit.

KERNKLAUSELN (ENTWURF)
1) Scope: Liefer‑/Entwicklungskorridor, keine Marktabstimmung.
2) Laufzeit: 6 Monate, Verlängerungsoption.
3) Exklusivität: Keine; falls gefordert, strikt befristet + Gegenleistung.
4) Exit‑Klausel: Ausstieg bei verfehlten Meilensteinen oder regulatorischen Einwänden.
5) Clean‑Team: Zugriff auf sensible Daten nur durch definierten Personenkreis.
6) IP/Know‑how: Nutzung nur für Prüfzweck; keine Übertragung.
7) Vertraulichkeit: NDA anbei; Rückgabepflichten klar geregelt.
8) Governance: Lenkungskreis, Eskalationspfad, Protokollpflicht.

REDLINE‑HINWEISE
– Vermeiden Sie Preisanker/Abnahmegarantien.
– Klare Abgrenzung zu Kartell‑/Wettbewerbsthemen (kein Austausch zu Marktpreisen/Margen). 

BEGRIFFE
• LOI: Letter of Intent, Absichtserklärung mit Leitplanken.
• Clean‑Team: Kleines, verpflichtetes Team für sensible Datenprüfung.`
},

'd11_ceo_sonderausschuss_investor_alignment_tag11.pdf': {
  filename: 'd11_ceo_sonderausschuss_investor_alignment_tag11.pdf',
  title: 'Sonderausschuss Investor – Agenda, Entscheidungslogik, Kommunikationsleitlinie',
  type: 'document',
  content: `ZIEL
Gemeinsames Lagebild und konsistenter Kommunikationsrahmen zu Offerte/Partnerpfad.

AGENDA (45–60 MIN)
1) Ausgangslage: Deal‑Druckpunkte, Waiver‑Status, Stakeholder‑Stimmung.
2) Optionenbild: Partner‑LOI vs. Investor‑Offerte vs. „Zeit kaufen“.
3) Kriterien: Handlungsfreiheit, Außenwirkung, Lieferfähigkeit, interne Wirkung.
4) Kommunikationsrahmen: Was wir sagen, was wir noch prüfen, was wir nicht sagen.
5) Nächste Schritte: Owners, Zeitpfad, Vorlagen.

ENTSCHEIDUNGSLOGIK (KURZ)
Evidenz vor Narrativ; Reversibilität wahren; identische Fakten für Bank/Kunden/BR.`
},

'd11_ceo_public_statement_sachlicher_rahmen_tag11.pdf': {
  filename: 'd11_ceo_public_statement_sachlicher_rahmen_tag11.pdf',
  title: 'Öffentliche Aussagen – sachlicher Rahmen & Formulierungsleitfaden',
  type: 'document',
  content: `ZWECK
Sichtbarkeit ohne Angriffsflächen: konsistente Botschaften in Presse/LinkedIn.

BAUSTEINE
• Fortschritte benennen (ohne Zahlen), Meilenstein‑Logik erklären.
• Qualitätssicherung: Prüfpfade, Kundenfreigaben in Arbeit.
• Partnerschaften: Gespräche laufen, Rahmen/NDA eingehalten.
• Dank & Ausblick: Nächste Reviews, weitere Updates angekündigt.

FORMULIERUNGSHILFEN
„Wir arbeiten entlang klarer Meilensteine und dokumentieren Fortschritt transparent.“
„Sensible Details teilen wir nach Freigabe – unser Fokus bleibt die Lieferfähigkeit.“

DON’T
– Keine Spekulation, keine exklusiven Zusagen, keine Dritten benennen.`
},

'd11_ceo_24h_alignment_playbook_tag11.pdf': {
  filename: 'd11_ceo_24h_alignment_playbook_tag11.pdf',
  title: '24‑Stunden‑Plan – Bank, Beirat, Key Accounts: Takt & Botschaften',
  type: 'document',
  content: `ZEITPLAN (T‑24 BIS T‑0)
T‑24 bis T‑20: CEO/CFO Pre‑Brief (Bank‑Meilensteine, identische Storyline).
T‑20 bis T‑16: Beirat – Fortschritt & offene Punkte; Freigaben abstimmen.
T‑16 bis T‑12: Key Accounts – 20‑Min‑Slots (Fact‑Sheet, Q&A).
T‑12 bis T‑8: Internes Q&A, Team‑Memo, Briefing der Führung.
T‑8 bis T‑0: Finales Deck; Sprecherregeln, Ein‑Seiter je Stakeholder.

KERNAUSSAGEN (ALLES FAKTENBASIERT)
• „Evidence first“: Belege nennen, keine Hypothesen verkaufen.
• Reversibilität: Optionen offen halten, Ausstiegsklauseln betonen.
• Konsistenz: Gleiche Botschaften für Bank und Kunden.

ARTEFAKTE
– 1‑Pager je Meilenstein
– Q&A‑Katalog (kritische Fragen)
– Kurzprotokoll der Gespräche (Audit‑Trail)`
},

'd11_cfo_cash_gatekeeping_runbook_tag11.pdf': {
  filename: 'd11_cfo_cash_gatekeeping_runbook_tag11.pdf',
  title: 'Runbook – Cash Gatekeeping bis Tag 14',
  type: 'document',
  content: `ZWECK
Lücke schließen, ohne Paniksignale. Gleiche Regeln für alle, dokumentiert.

MECHANIK
1) Inbound‑Beschleuniger: Skonto gezielt, Rechnungsklarheit, Clearing von „Klebstellen“.
2) Outbound‑Priorisierung: P1 Lieferanten, Payroll‑Puffer, Pönale‑Vermeidung.
3) Entscheidungsboard (täglich, 15 Min): Fälle > X Tsd. EUR, Owner, nächster Beleg.

CHECKLISTE (AUSZUG)
□ Rechnungsstopp vermeiden (Formalia im Griff) 
□ Zahlungsfenster kommuniziert (Lieferantenseite) 
□ Bankreporting synchron (gleiche Fakten)
Sollen wir extern plausibilisieren, um Bankvertrauen zu erhöhen (3k)?
BEGRIFFE
• Gatekeeping: Strukturierte Freigabe von Zahlungen mit klaren Kriterien.`
},

'd11_cfo_Action Liquidity_tag11.pdf': {
  filename: 'd11_cfo_Action Liquidity_tag11.pdf',
  title: 'Liquiditätsoptionen',
  type: 'email',
  content: `ZIEL
im Rahmen unserer aktuellen Liquiditätsplanung haben wir – wie besprochen – eine Restlücke von ca. 50.000 EUR bis Tag 21. Nachfolgend die möglichen Handlungsoptionen mit Cash- und P&L-Effekten:

Option A – Skontoaktion Top-Kunden (3 %)

Cash-Effekt: +50.000 EUR kurzfristig

P&L-Effekt: –7.500 EUR (Rabattkosten)

Nebenwirkungen: leichte Irritation am Markt, Bank erkennt erhöhte Liquiditätsorientierung

Option B – Abverkauf C-Bestände

Cash-Effekt: +35.000 EUR

P&L-Effekt: –5.000 EUR (Mindererlöse)

Nebenwirkungen: Reputationsrisiko, Bank neutral

Option C – Zwischenlinie bei Bank anfragen

Cash/P&L: kein unmittelbarer Effekt

Nebenwirkungen: Vertrauenseinbuße bei der Hausbank

Option D – Keine Maßnahme (Risiko)

Cash/P&L: keine Veränderung

Nebenwirkungen: erhöhtes Risiko im Bankdialog, da Unterdeckung sichtbar 

`
},

'd11_cfo_Lieferanten_tag11.pdf': {
  filename: '11_cfo_Lieferanten_tag11.pdf',
  title: 'Draft Note',
  type: 'memo',
  content: `INHALT
der aktuelle Standstill bei zwei Lieferanten läuft in Kürze aus. Wir müssen den Zahlplan neu justieren und dabei die Balance zwischen Härte und Versorgungssicherheit finden. Im Folgenden die möglichen Optionen:

Option A – DB-Matrix anwenden, A-Lieferanten bedienen

Auswirkung: Stärkt das Vertrauen der Bank in unsere Steuerungsfähigkeit und stabilisiert die Loyalität wichtiger Kunden.

Logik: Fokus auf die Lieferanten mit dem höchsten Deckungsbeitrag zeigt Priorisierungskompetenz und stärkt unsere Glaubwürdigkeit.

Risiko: B- und C-Lieferanten könnten sich benachteiligt fühlen – erfordert klare Kommunikation.

Option B – Gleichbehandlung aller Lieferanten

Auswirkung: Wird von der Bank als solides, aber wenig strategisches Vorgehen gewertet.

Logik: Einfach, nachvollziehbar und rechtlich unproblematisch.

Risiko: Fehlende Flexibilität bei kritischen Lieferketten; operative Nachteile möglich.

Option C – Zahlungen pausieren und Bank informieren

Auswirkung: Signalisiert der Bank hohe Disziplin und Strenge in der Liquiditätssteuerung, gefährdet jedoch die Verlässlichkeit gegenüber Kunden.

Logik: Kurzfristige Schonung der Liquidität und aktive Bankkommunikation.

Risiko: Hoher Vertrauensverlust bei Kunden, mögliche Lieferausfälle.

Option D – Vorleistung von Lieferanten fordern (Risiko Eskalation)

Auswirkung: Belastet die Kundenloyalität deutlich und kann das öffentliche Bild beschädigen.

Logik: Maximale Cash-Schonung durch Übertragung des Finanzierungsrisikos auf die Lieferanten.

Risiko: Eskalationsgefahr bis hin zu Lieferabbrüchen und Reputationsschäden.`
},

'd11_cfo_investor_tag11.pdf': {
  filename: 'd11_cfo_investor_tag11.pdf',
  title: 'Update – Investor',
  type: 'memo',
  content: `Memo
der Investor hat sein Angebot nachgebessert: 22,5 % Beteiligung für 5,5 Mio. EUR. Im Folgenden die möglichen Handlungsoptionen:

Option A – Vertiefte Verhandlungen empfehlen

Auswirkung: Könnte das Vertrauen der Bank in unsere Finanzierungsfähigkeit stärken, jedoch die Belegschaft verunsichern und in Teilen demotivieren. Öffentlich würde das Signal gemischt aufgenommen.

Logik: Ermöglicht Spielraum für bessere Bedingungen, birgt aber Risiko innerer Instabilität.

Option B – Weiter hinhalten und auf verbessertes Angebot warten

Auswirkung: Die Bank könnte zunehmende Ungeduld oder Zweifel wahrnehmen.

Logik: Verzögerung kann Zeit bringen, erhöht aber das Risiko, dass der Investor abspringt oder Druck aufbaut.

Option C – Ablehnung der Offerte empfehlen

Auswirkung: Belastet das Vertrauen der Bank erheblich, kann aber die Belegschaft stabilisieren und das externe Bild stärken („unabhängig und standhaft“).

Logik: Signalisiert Selbstbewusstsein und Unabhängigkeit, schwächt jedoch den finanziellen Puffer.

Option D – Annahme empfehlen

Auswirkung: Schafft deutliche Entspannung im Verhältnis zur Bank, aber demotiviert Belegschaft stark und wirkt öffentlich negativ (Eindruck von Abhängigkeit, kurzfristigem Deal).

Logik: Finanzielle Sicherheit wird kurzfristig erhöht, dafür entstehen strategische Abhängigkeiten und kulturelle Risiken.`
},

'd11_cfo_term_sheet_redlines_covenant_matrix_tag11.docx': {
  filename: 'd11_cfo_term_sheet_redlines_covenant_matrix_tag11.docx',
  title: 'Term Sheet – Redlines & Covenant‑Trigger‑Matrix (Arbeitsdokument)',
  type: 'document',
  content: `TEIL A – REDLINES (AUSZUG)
• Klarheit bei Triggern (objektive Schwellen, keine Interpretationsräume).
• Heilungsfristen: definierte Zeitfenster + Maßnahmenpfad.
• Informationsrechte: Umfang klar, Takt praktikabel (Snapshot + Wochenverdichtung).

TEIL B – COVENANT‑TRIGGER‑MATRIX
Spalten: Trigger | Messgröße | Datenquelle | Prüf‑Takt | Heilungspfad | Owner.
Ziel: Messbarkeit und Planbarkeit, kein KPI‑Mikado.

NOTIZ
Mehr Linie nur gegen klare, messbare Meilensteine – nicht gegen unscharfe Zusagen.`
},

'd11_ops_carve-out-UPA_tag11.pdf': {
  filename: 'd11_ops_carve-out-UPA_tag11.pdf',
  title: 'Produktionsmemo – Engpasssteuerung bei Carve‑out',
  type: 'memo',
  content: `ZIEL
m Zuge des geplanten Verkaufs unserer Tochtergesellschaft verlangt der Käufer Klarheit über die eigenständige Lieferfähigkeit der Einheit. Wir müssen entscheiden, wie weit wir IT- und Logistikprozesse vorab abtrennen. Im Folgenden die möglichen Handlungsoptionen:

Option A – Sofortige vollständige Trennung

Auswirkung: Stärkt das Vertrauen der Bank, da wir Deal-Readiness und Governance zeigen.

Risiko: Hoher organisatorischer und personeller Aufwand, deutliche Belastung für die Belegschaft.

Kosten: ca. 15.000 EUR (interner Projektaufwand).

Bewertung: Klare Trennung, signalisiert Professionalität, erzeugt aber kurzfristig Druck und Friktionen.

Option B – Teilweise Trennung (kritische Systeme sofort, Rest später)

Auswirkung: Signalisiert Handlungsfähigkeit und stärkt leicht die Kundenbeziehungen, da kritische Prozesse abgesichert werden.

Risiko: Belegschaft wird spürbar belastet, wenn auch weniger stark als bei Option A.

Kosten: ca. 8.000 EUR.

Bewertung: Kompromisslösung: Pragmatismus mit überschaubaren Kosten, aber potenziell unvollständige Sicherheit für Käufer.

Option C – Keine Trennung vorbereiten, Synergien betonen

Auswirkung: Bank könnte Zweifel an der Umsetzungsfähigkeit entwickeln; öffentliches Bild eher kritisch.

Kosten: keine direkten Zusatzkosten.

Bewertung: Kurzfristig ressourcenschonend, aber riskant, da Käufer möglicherweise Zweifel an der Separierbarkeit bekommt.

Option D – Externe Carve-out-Berater beauftragen

Auswirkung: Deutlich positives Signal an Bank und Käufer (Professionalität, Deal-Readiness).

Risiko: Hohe externe Abhängigkeit, interne Steuerung notwendig.

Kosten: ca. 20.000 EUR.

Bewertung: Professionelle Lösung mit klarer Außenwirkung, teuer und abhängig von Beratern.`
},

'd11_ops_Risikoanalyse_phase2_tag11.pdf': {
  filename: 'd11_ops_Risikoanalyse_phase2_tag11.pdf',
  title: 'Risikoanalyse Lieferanten – Phase 2',
  type: 'document',
  content: `Analyse
im Rahmen der Due Diligence fordert der Investor eine Übersicht über die kritischsten Zulieferer unserer Tochtergesellschaft. Wir müssen entscheiden, in welchem Umfang wir Transparenz gewähren. Hier die möglichen Optionen:

Option A – Vollständige Risikoanalyse inkl. Alternativlieferanten

Auswirkung: Stärkt das Vertrauen der Bank und unterstreicht unsere Professionalität, kann auch das öffentliche Bild verbessern. Gleichzeitig könnte die Offenlegung von Schwachstellen die Kundenbindung belasten.

Risiko: Wir machen Verwundbarkeiten sichtbar, die Verhandlungsspielräume schmälern.

Kosten: ca. 10.000 EUR (interne Analyse, Datenaufbereitung).

Option B – Dokumentation nur der Top-5 Zulieferer

Auswirkung: Signalisiert Handlungsfähigkeit und schafft ein Mindestmaß an Transparenz, bleibt aber oberflächlich.

Risiko: Bank honoriert dies eingeschränkt; Kunden könnten verunsichert reagieren.

Kosten: ca. 4.000 EUR.

Option C – Keine systematische Analyse, Antworten ad hoc

Auswirkung: Kann die Bank verunsichern und wirkt in der Außenwahrnehmung unprofessionell.

Risiko: Glaubwürdigkeitsverlust, Investor könnte mangelnde Vorbereitung unterstellen.

Kosten: keine direkten Zusatzkosten.

Option D – Externe Zertifizierung (Audit)

Auswirkung: Sehr positives Signal an die Bank, klare Professionalisierung gegenüber Investor.

Risiko: Teure externe Lösung, weniger Kontrolle über Details, möglicher Reputationsschaden bei kritischen Audit-Funden.

Kosten: ca. 15.000 EUR.`
},

'd11_ops_Kundenprio_tag11.pdf': {
  filename: 'd11_ops_Kundenprio_tag11.pdf',
  title: 'Priorisierung',
  type: 'document',
  content: `Frage (Stab-OPS an OPS)
Laut CFO: durch den Teilverkauf von UPA entstehen neue Verpflichtungen: ein Teil unserer Produktion soll künftig exklusiv für den Käufer laufen. Gleichzeitig drohen Engpässe in unseren Kernlinien, die für Stammkunden entscheidend sind. Wir stehen daher vor der Frage, wie wir Kapazitäten steuern.

Eine Möglichkeit wäre, die eigenen Kunden klar zu priorisieren und den Käufer mit reduzierter Kapazität zu bedienen. Das würde unsere Stammkunden binden, allerdings das Vertrauen der Bank beeinträchtigen, da Vertragstreue gegenüber dem Käufer nicht konsequent eingehalten wird.

Umgekehrt könnten wir die Aufträge des Käufers strikt erfüllen und unsere Kunden warten lassen. Das würde bei der Bank positiv wirken, aber bestehende Kundenbeziehungen erheblich belasten.

Ein ausgewogener Ansatz wäre eine 50/50-Aufteilung mit klaren Kontingenten. Damit blieben wir gegenüber Käufer und Stammkunden handlungsfähig und würden sowohl Kundenbindung als auch Bankvertrauen stabilisieren – wenn auch jeweils nur begrenzt.

Schließlich bestünde die Möglichkeit, externe Fertigungskapazitäten hinzuzunehmen. Das würde sowohl Kunden als auch Käufer zufriedenstellen und zudem Vertrauen bei der Bank schaffen. Allerdings müssten wir mit zusätzlichen Kosten von rund 12.000 EUR rechnen.

Ich bitte um Einschätzung, welche Linie wir verfolgen sollten, um Professionalität zu signalisieren und gleichzeitig unsere Kernbeziehungen zu sichern.`
},

'd11_ops_Kommunikation_tag11.pdf': {
  filename: 'd11_ops_Kommunikation_tag11.pdf',
  title: 'Kommunikation',
  type: 'document',
  content: `Ruhe reinbringen (Fertigung P1 an OPS)
In der Fertigung kursieren zunehmend Gerüchte über die Teilverkaufspläne, die Verunsicherung nimmt spürbar zu. Wir müssen klären, wie wir kommunikativ vorgehen.

Ein Ansatz wäre eine offene Informationsrunde mit begleitendem FAQ zum Carve-out-Prozess. Das würde die Mitarbeiterbindung stärken und auch nach außen ein positives Signal setzen. Gleichzeitig bedeutet es, dass wir früh viel preisgeben.

Alternativ könnten wir nur die engsten Führungskreise briefen. Das wäre kontrollierbarer, aber die Belegschaft insgesamt bliebe in Unsicherheit, was die Motivation schwächen könnte.

Wir könnten auch ganz auf Kommunikation verzichten und den Prozess strikt vertraulich halten. Das hätte den Vorteil absoluter Geheimhaltung, würde aber sowohl intern die Stimmung belasten als auch nach außen ein negatives Bild riskieren.

Schließlich gäbe es die Möglichkeit, externe Kommunikationsberater einzubeziehen. Das würde professionelle Unterstützung bringen, die Mitarbeiter in ihrer Bindung stärken und das öffentliche Bild deutlich verbessern. Allerdings müssten wir mit zusätzlichen Kosten von rund 8.000 EUR rechnen.

Ich bitte um Einschätzung, welche Linie wir hier wählen sollten, um Gerüchte einzufangen, Fluktuation zu vermeiden und dennoch die Vertraulichkeit im Prozess zu wahren.`
},

'd11_ops_serienstart_freeze_pruefplan_tag11.pdf': {
  filename: 'd11_ops_serienstart_freeze_pruefplan_tag11.pdf',
  title: 'Serienstart – Freeze‑Fenster & Prüfplan (A‑Linien priorisiert)',
  type: 'document',
  content: `KERN
• Freeze‑Fenster 72h: Änderungen nur mit Freigabe.
• Prüftiefe: 100 % auf A‑Linien (befristet), B‑Linien AQL.
• Ramp‑up: Stückzahl stufenweise, erst nach stabilen Zyklen hoch.

DOKUMENTATION
• Einfache Prüf‑Checklisten, Rückverfolgbarkeit, Freigabeprotokolle.`
},

'd11_hrlegal_Disclosure_tag11.pdf': {
  filename: 'd11_hrlegal_Disclosure_tag11.pdf',
  title: 'Disclosure Letter zum Teilverkauf CEO an HRLEGAL',
  type: 'document',
  content: `ZWECK
Liebe Kolleginnen und Kollegen,

im Rahmen der Verhandlungen zum Teilverkauf fordern die Investoren ein Disclosure Package, das sämtliche Haftungsausnahmen umfasst – insbesondere arbeits- und datenschutzrechtliche Themen sowie laufende Verfahren. Wir müssen entscheiden, wie weit wir dabei gehen.

Ein vollständiger Disclosure Letter, der alle relevanten Risiken offenlegt, würde das Vertrauen der Bank stärken und auch nach außen professionell wirken. Gleichzeitig könnte dies den Kaufpreis mindern und mit zusätzlichen internen Kosten von rund 10.000 EUR verbunden sein.

Eine abgespeckte Variante wäre, zunächst nur die arbeitsrechtlichen Risiken transparent zu machen und die übrigen Punkte später nachzuziehen. Das würde ebenfalls einen gewissen Vertrauenszuwachs bringen, wäre aber weniger umfassend und mit etwa 4.000 EUR Kosten verbunden.

Wir könnten auch versuchen, die Offenlegung auf ein Minimum zu reduzieren und Risiken über die Gewährleistungen im Kaufvertrag (SPA-Reps) zu schieben. Das würde kurzfristig Ressourcen sparen, aber die Bank könnte dies als intransparent werten und nach außen entstünde ein negatives Signal.

Schließlich bestünde die Möglichkeit, eine externe Kanzlei mit der Erstellung des Disclosure Letters zu beauftragen. Das würde hohe Professionalität demonstrieren und Vertrauen bei Banken und Investoren schaffen, allerdings zu einem Preis von rund 25.000 EUR und mit entsprechendem Ergebniseinfluss.

Ich bitte um Eure Einschätzung, welcher Weg aus HR- und Legal-Sicht vorzugswürdig ist, um Haftungsrisiken handhabbar zu machen und gleichzeitig unsere Verhandlungsposition nicht unnötig zu schwächen.

Beste Grüße`
},

'BR‑Informationsplan': {
  filename: 'BR‑Informationsplan',
  title: 'HR‑Paket (kombiniert) – BR‑Informationsplan & Konfliktmoderation Toolkit',
  type: 'document',
  content: `HINWEIS
Dieses Kombi‑Dokument deckt zwei Bedarfe ab (Mitbestimmung/BR + Moderation interner Konflikte), da der Dateiplatzhalter im Code identisch ist.

TEIL A – BR‑INFORMATIONSPLAN (TEILVERKAUF)
• Rechtsrahmen: Informationsrechte, Zeitpunkt, Inhalte (ohne vertrauliche Deal‑Details).
• Ablauf: Vorab‑Hinweis -> strukturierte Unterrichtung -> Q&A -> Protokoll.
• Do/Don’t: Keine Zusagen außerhalb des Rahmens; identische Fakten wie Bank/Käufer.

TEIL B – KONFLIKTMODERATION OPS/CFO
• Setup 2h: Zielbild, Regeln (Respekt, Klarheit, Ergebnisoffenheit).
• Struktur: Lagebild beider Seiten -> Faktenabgleich -> Optionen -> Entscheidungspfad.
• Artefakte: Kurzprotokoll, To‑Do‑Liste mit Ownern, Nachsteuerung in 7 Tagen.`
},

'compliance_checkliste_tag11.xlsx': {
  filename: 'compliance_checkliste_tag11.xlsx',
  title: 'Workbook – Compliance‑Nachweise (Tabellenbeschreibung)',
  type: 'spreadsheet',
  content: `TABS & INHALTE
1) Übersicht: Zweck, Ansprechpartner, Stichtage.
2) Auflagen‑Matrix: Pflicht | Evidenz | Quelle | Datum | Owner.
3) Schulungen: Teilnehmer | Inhalt | Datum | Testat.
4) Datenschutz: Datenarten | Rechtsgrund | Speicherort | Schwärzungen.
5) Audit‑Trail: Entscheidung | Datum | Dokument | Reviewer.

LEITGEDANKE
„Wir dokumentieren, was wir tun – und wir tun, was wir dokumentieren.“ Wenn wir extern Schnellcheck zukaufen: 2k `
},


  'Konflikt_Moderation.pdf': {
  filename: 'Konflikt_Moderation.pdf',
  title: 'Wie umgehen mit Konflikten (S-HRLEGAL an HRLEGAL',
  type: 'memo',
  content: `Vorschlag
Liebe Kolleginnen und Kollegen,

zwischen Operations und CFO-Bereich haben sich Ressourcenkonflikte so weit zugespitzt, dass die Zusammenarbeit erheblich leidet. Wir müssen klären, ob und wie wir moderierend eingreifen.

Eine Möglichkeit wäre ein extern moderierter Workshop von rund zwei Stunden. Das würde die Mitarbeiterbindung deutlich stärken und auch Vertrauen bei der Bank erzeugen. Gleichzeitig müssten wir dafür mit ca. 2.000 EUR zusätzlichen Kosten rechnen, die das Ergebnis belasten.

Alternativ könnten wir auf bilaterale Gespräche setzen und die Moderation intern übernehmen. Das wäre günstiger, würde die Lage zwar nicht so stark entspannen, aber dennoch ein Signal der Handlungsbereitschaft geben.

Falls wir ganz auf Moderation verzichten, droht die Situation zu eskalieren. Dies würde das Engagement der Belegschaft klar schwächen.

Schließlich könnten wir versuchen, die Konflikte durch eine Top-down-Entscheidung zu lösen. Damit hätten wir zwar schnelle Klarheit, riskieren aber massiven Vertrauensverlust in der Belegschaft und ein negatives Bild nach außen.

Empfehlenswert wäre ein Vorgehen, das unsere Allparteilichkeit betont und die Handlungsfähigkeit bewahrt. Ich bitte um Einschätzung, welchen Weg wir hier wählen sollten.

Beste Grüße
Stab HR/Legal`
},

'd11_hrlegal_ethik_hotline_forensic_quickcheck_tag11.pdf': {
  filename: 'd11_hrlegal_ethik_hotline_forensic_quickcheck_tag11.pdf',
  title: 'Ethik‑Hotline – Forensic‑Kurzprüfung & Audit‑Trail (Vorlage)',
  type: 'document',
  content: `ZIEL
Liebe Kolleginnen und Kollegen,

über die Ethik-Hotline ist ein Hinweis zu möglichen Complianceproblemen im Zusammenhang mit dem Teilverkauf eingegangen. Da der Investor morgen (Tag 12) weitere Unterlagen erwartet, müssen wir sorgfältig abwägen, wie wir mit dem Hinweis umgehen, um ein Reputationsrisiko zu vermeiden.

Eine Variante wäre eine kurze forensische Prüfung mit externem Blick, verbunden mit der Dokumentation in einem internen Audit-Trail. Das würde Vertrauen bei Bank und Öffentlichkeit stärken und die Belegschaft beruhigen, verursacht aber Zusatzkosten von rund 3.000 EUR.

Alternativ könnten wir den Fall im Compliance-Team intern prüfen. Das wäre ressourcenschonender und würde die Mitarbeiterbindung etwas stabilisieren, allerdings mit geringerer Außenwirkung.

Wenn wir uns auf reines Monitoring beschränken und keine Maßnahmen ergreifen, riskieren wir Vertrauensverluste bei Bank, Öffentlichkeit und Belegschaft – insbesondere wenn der Hinweis später bekannt wird.

Schließlich besteht die Möglichkeit, einen externen Ombudsmann einzuschalten. Dies würde Professionalität und Transparenz nach außen signalisieren, allerdings mit einem Kostenaufwand von rund 5.000 EUR.

Empfehlenswert erscheint eine Lösung, die dokumentierte Seriosität zeigt, ohne den Prozess öffentlich größer wirken zu lassen, als er ist. Ich bitte um Ihre Einschätzung, welchen Weg wir wählen sollten.

Beste Grüße
HR/Legal

BEGRIFFE
• Audit‑Trail: Nachvollziehbarer Entscheidungs‑/Dokumentationspfad.
• Ombudsstelle: Externer/Interner Meldungskanal mit Vertraulichkeit.`
}

};