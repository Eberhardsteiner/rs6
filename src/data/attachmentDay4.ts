// src/data/attachmentDay4.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day4Attachments: Record<string, AttachmentContent> = {
  'banktermin_vorbereitung_ceo_tag4.pdf': {
    filename: 'banktermin_vorbereitung_ceo_tag4.pdf',
    title: 'Vorstands-Memo (CEO → CFO/HR/OPS/Kommunikation)',
    type: 'memo',
    content: `Betreff: Banktermin (Tag 5) – gemeinsame Linie & Unterlagenstand

Liebe Kolleginnen und Kollegen,

für den Termin morgen gilt: je einfacher die Geschichte, desto glaubwürdiger. Wir halten uns an drei feste Punkte – wo stehen wir heute, was ändern wir selbst, und wie messen wir in den kommenden zwei Wochen Fortschritt. Alle Nebenstränge, so wichtig sie im Alltag sind, parken wir außerhalb des Raums.

Bitte achtet auf Konsistenz über alle Unterlagen hinweg. Abkürzungen und Projektkürzel vermeiden; wo Fachsprache unvermeidbar ist, legen wir eine halbe Zeile Erklärung daneben. Der Eindruck, dass wir unsere Themen ordnen und nicht nur darlegen, ist wichtiger als jede „Zahl zum Beeindrucken".

In der Gesprächsführung lassen wir Luft für Rückfragen und greifen sie zügig auf. Kein Verteidigungsmodus, kein „Hoffentlich wird das nicht gefragt". Wo etwas vorläufig ist, sagen wir das so – mit einem klaren Datum, bis wann wir es erhärten. Das Angebot kurzfristig noch externe Unterstützung zu bekommen steht noch. Berater auf Abruf, aber für horrende 5k für einen halben Tag. Könnte helfen, uns gut vorzubereiten, hat Erfahrung und ist mit allen Wassern gewaschen. Bitte kurzfristige RS, ob das von Ihrer Seite aus sinnvoll erscheint.

Danke für die letzten Glättungen bis heute 17:00 Uhr. Danach frieren wir die Fassung ein, damit alle dieselbe Sprache benutzen.
[CEO]`
  },
  'stakeholder_mapping_ceo_tag4.pdf': {
    filename: 'stakeholder_mapping_ceo_tag4.pdf',
    title: 'Aktennotiz (CEO-Stab)',
    type: 'document',
    content: `Aktennotiz – Stakeholder-Übersicht (Stand Tag 4)

Wir haben die Übersicht um drei Gruppen ergänzt, die in den vergangenen Tagen an Gewicht gewonnen haben: zwei Schlüsselkunden, die sich verlässliche Taktung wünschen; ein Lieferant mit enger Kapazität; und ein Kreis von Mitarbeitenden, der Fragen zur mittelfristigen Ausrichtung sammelt.

Die Zuordnung bleibt schlicht: Einfluss, Erwartung, nächster Kontaktpunkt. Entscheidend ist die Anschlussfähigkeit – wer spricht als Nächster, was sagen wir dort, und wie stellen wir sicher, dass der Dritte im Bunde denselben Ton trifft. „Mehr Information" ist nicht automatisch „mehr Wirkung"; wir bevorzugen wenige, gut gepflegte Linien. Die Frage ist, ob wir uns auf die KEy-Stakeholder fokussieren (Bank, Kunde) oder es breit aufsetzten. Risiko ist dann natürlich eine undichte Stelle, die das ganze Vertrauen in uns zerstören kann. Frgae. Brauchen wir die externe Unterstützung, Angebot liegt vor, 8k.

Hinweis: Bei kritischen Stakeholdern vor Gesprächen eine kurze Einordnung notieren (1–2 Sätze). Es hilft der nächsten Person im Lauf, den Faden aufzunehmen, ohne zu raten.
[gez. Leitung Stabstelle]`
  },
  'sl_shortlist_entscheidung_ceo_tag4.pdf': {
    filename: 'sl_shortlist_entscheidung_ceo_tag4.pdf',
    title: 'Brief (CEO → CFO/Legal)',
    type: 'document',
    content: `Betreff: Entscheidung Shortlist S&L

Sehr geehrte Damen und Herren,

für die Shortlist berücksichtigen wir neben Konditionen vor allem die Praktikabilität: wer kann schnell prüfen, wer versteht unsere Prozesse, und wer behandelt das Thema als operative Maßnahme, nicht als Signal. Ich bitte um eine knappe Vorlage mit drei Kandidaten und jeweils einem halben Absatz zu Vorgehen, Geschwindigkeit und Referenzen. Ich sehe Cash-Hebel 180k–220k. Was ich gehört habe, ist das beste Angebot 200k, Abschlag 8 %. Bedenken sollten wir unsere erhöhte Fixkostenabhängigkeit und die neg. Wirkung auf die Belegschaft.

Zur Einordnung: „Sale & Leaseback" (S&L) – Vermögenswerte verkaufen und gleichzeitig zurückmieten – ist ein Werkzeug, kein Urteil. Die Außenwirkung hängt davon ab, wie wir es rahmen. In jedem Fall vermeiden wir den Anschein, kurzfristige Vorteile gegen langfristige Abhängigkeiten zu tauschen; Vertragslaufzeiten und Rückkaufklauseln deshalb bitte besonders im Blick.

Ich schlage eine Entscheidung im Umlauf vor, sobald die Kurznotiz steht.
Mit freundlichen Grüßen
[CEO]`
  },
  'kommunikation_banktermin_ceo_tag4.pdf': {
    filename: 'kommunikation_banktermin_ceo_tag4.pdf',
    title: 'E-Mail (CEO → alle Mitarbeitenden)',
    type: 'email',
    content: `Betreff: Morgen Bankgespräch – Vorgehen und Haltung

Liebe Kolleginnen und Kollegen,

morgen sprechen wir mit unserer Hausbank über die nächsten Schritte. Der Termin ist Teil eines geordneten Prozesses; keine „Sondersituation". Wir erläutern, was wir bereits verändert haben, und wie wir Stabilität sichern.

Für euch heißt das: keine Unruhe, keine Spekulationen – Fragen gern an die bekannten Stellen (Tom Verhagen oder Imelda Sanches), wir antworten zeitnah. Wer im Kundenkontakt steht, nutzt bitte die einfache Linie: Wir arbeiten an klaren, überprüfbaren Schritten und melden uns früh, wenn ein Plan sichtbar abweicht. Diese Nüchternheit hat uns in den letzten Tagen spürbar geholfen.

Danke für eure Unterstützung und den professionellen Umgang im Tagesgeschäft.
[CEO]`
  },
  'lieferanten_standstill_cfo_tag4.pdf': {
    filename: 'lieferanten_standstill_cfo_tag4.pdf',
    title: 'Memo (CFO → Einkauf/Legal)',
    type: 'memo',
    content: `Betreff: Standstill – Verhandlungslinie und Dokumentation

Standstill ist in unserem Fall eine Verabredung mit wesentlichen Lieferanten, während eines definierten Zeitraums keine Konditionen einseitig zu verschärfen (Zahlungsziel, Vorkasse, Lieferstopp), solange wir die vereinbarten Schritte liefern. Das ist keine Starrheit; es ist ein Korridor, in dem beide Seiten verlässlich planen. Wir glauben, dass wir dadurch eine Cashentlastung von 30 bis 60k erreichen können.

Vorgehen: Ein kurzes, respektvolles Anschreiben, ein klarer Zeitraum, ein Ansprechpartner. Wir knüpfen das an beiderseitige Zusagen – wir liefern Taktung und Rückmeldung, der Partner liefert Verlässlichkeit bei Abrufen und Qualität. Wichtig ist die Dokumentation je Fall (zwei Zeilen genügen), damit wir den Überblick behalten und keine widersprüchlichen Signale senden.

Rechtliche Feinarbeit bitte über Legal, insbesondere bei stillschweigenden Verlängerungen und Kündigungsfristen.
[gez. CFO]`
  },
  'zweitbank_teaser_cfo_tag4.pdf': {
    filename: 'zweitbank_teaser_cfo_tag4.pdf',
    title: 'E-Mail (CFO → Relationship Manager, vertraulich)',
    type: 'email',
    content: `Betreff: Vertrauliche Sondierung – Kurzunterlage (Teaser) und NDA

Sehr geehrte/r [Name],

wir prüfen die Einrichtung einer zweiten, langfristigen Bankbeziehung und möchten eine vertrauliche Sondierung starten. Beigefügt finden Sie einen knappen Teaser: Kontostruktur, Reporting-Takt, Überblick Working-Capital-Steuerung.

Vor weiterem Austausch schlagen wir ein NDA („Non-Disclosure Agreement", Vertraulichkeitsvereinbarung) vor. Uns geht es nicht um Konditionswettbewerb, sondern um eine belastbare zweite Säule in der Zusammenarbeit. Falls Ihrerseits Interesse besteht, stimmen wir gern einen kurzen Termin ab.

Mit freundlichen Grüßen
[CFO]`
  },
  'working_capital_quickwins_cfo_tag4.pdf': {
    filename: 'working_capital_quickwins_cfo_tag4.pdf',
    title: 'Memo (BuHa an CFO)',
    type: 'memo',
    content: `Betreff: Working-Capital – kleiner Sprint, saubere Wirkung

Wie gewünscht hier die Einschätzungen:

Mögliche Wirkungen:
Abverkauf: Cash +40k, DB-Verlust 6k
Mahnwesen schärfen: 30k
Rabattierung Sofortzahler:  +50k Verlust -9k

Wir raten von der KOmbination ab, damit wir keine negativen Signale senden.

MfG
BuHa`
  },
  'reporting_pack_banktermin_cfo_tag4.pdf': {
    filename: 'reporting_pack_banktermin_cfo_tag4.pdf',
    title: 'Memo (Stab an CFO)',
    type: 'memo',
    content: `Betreff: Unterlagen für den Termin am [Datum]

Sollen wir Beratung hinzuziehen (4k) für ausführliche Unterlagen oder nur für die Kurzpräsentation (1k)`
  },
   'cash-walk': {
    filename: 'cash-walk',
    title: 'Email (OPS an CFO)',
    type: 'email',
    content: `Betreff: Weitere Working Capital-Maßnahmen?

Auswertung zeigt zusätzliche Möglichkeiten wie folgt:
Priorisierung bei P1/P2 verschärfen; tägliche Runs mit CFO‑Freigabe, cash 80k
A‑Kunden skontieren mit 3%: Cash: 35- 45k, Aufwand -6k
Gesamtkunden 4 % Nachlass Cash 70k, Aufwand -14k

Warten auf Entscheidung CFO

`
  },
  'lieferabrufe_synchronisierung_ops_tag4.pdf': {
    filename: 'lieferabrufe_synchronisierung_ops_tag4.pdf',
    title: 'Operations-Anweisung (Werksleitung → Dispo/Logistik)',
    type: 'document',
    content: `Betreff: Lieferabrufe – Synchronisierung für verlässliche Taktung

Wir glätten in den nächsten Tagen die Auslieferung: gebündelte Fenster, klare Cut-offs, Express nur dort, wo vertraglich geboten oder faktisch unvermeidbar. Ziel ist kein „Aufhübschen", sondern das, was Kunden ohnehin mögen – Planbarkeit. Wenn wir uns auf die Kleinkunden konzentrieren, rechnen wir mit Pönalen von 3k.Wenn wir die Nachfrage breit drosseln, könnte das ein Risiko für unsere Liefertreue darstellen, Einsparungseffekte kurzfrisitg 12k, Verluste aus Pönalen in 4 Wochen 30k, Rückstellung dafür sofort).

Bitte die Sequenzen in den Plan einarbeiten; Besonderheiten kurz notieren (Kunde, Grund, Zeitraum). Ein ruhiges Muster wirkt nach außen stabilisierend, intern entlastet es das Tagesgeschäft.

[gez. Werksleitung]`
  },
  'eskalationsgespraech_lieferant_ops_tag4.pdf': {
    filename: 'eskalationsgespraech_lieferant_ops_tag4.pdf',
    title: 'Gesprächsleitfaden (OPS → Einkauf/Qualität)',
    type: 'document',
    content: `Gesprächsleitfaden – Lieferant [Name]

Wir müssen ins Gespräch kommen, wenn 100 % Vorkasse, belastet das Cash deutlich (100k), das ist eigentlich keine Option, außer aus Kundenzufriedenheit heraus, vorallem wegen Lieferproblemen in der Vergangenheit sind wir damit aber nicht glücklich. Selbst 50 % ist eine Last in der jetzigen Lage (wir finanzieren vor!). Wenn er darauf eingeht, werden wir ihm Abnahmegarantien geben müssen. Alternativ wäre ein Zweitlieferant eine Option, dort aber schlechtere Konditionen (+12k Kosten, aber evtl. längere Zahlungsfrist). Wenn wir ablehnen und Lieferung gestoppt, werden A-Kunden massiv verprellt.

Einstieg: „Wir wollen die nächsten Wochen sicher machen; dafür brauchen wir eine realistische Sicht auf Ihre Kapazität und unsere Zahlungen."
Sachstand: kurze, faktenfeste Darstellung unserer Nachfrage und Ihrer letzten Liefertreue.
Brücke bauen: „Wir legen offen, wo unsere Engstellen sind; sagen Sie offen, wo es bei Ihnen klemmt."
Lösungsraum: Alternativteile, Zweitwerkzeuge, Priorisierung. „Dual Sourcing" erklären, ohne Drohkulisse – parallele Bezugsquelle als Sicherheitsnetz.
Abschluss: konkreter Anker (Kontakt, Takt, Rückmeldung).
Ziel ist Steuerbarkeit. Das Gespräch bitte sofort protokollieren – zwei Absätze reichen.
[gez. OPS]`
  },
  'nachtlogistik_a_kunden_ops_tag4.pdf': {
    filename: 'nachtlogistik_a_kunden_ops_tag4.pdf',
    title: 'Memo (OPS → Vertrieb/Finanzen)',
    type: 'memo',
    content: `Betreff: Nachtlogistik – selektive Einführung für A-Kunden

Wir richten für ausgewählte A-Kunden eine Nachtlinie ein (9k): definierte Cut-offs am Nachmittag, konsolidierter Abgang, Zustellung im frühen Zeitfenster. Der Nutzen entsteht dort, wo Produktionspläne am Morgen von gesicherten Zuläufen leben. Alternative Lösungen: Expresslieferungen bei A-Kunden wenn es zu Verzögerungen kommt (4k) oder bei allen Kunden in dem Fall (15k).

Das Modell ist bewusst schmal gehalten; wir vermeiden neue Gewohnheitsrechte. Die Kommunikation nach außen ist sachlich: Verlässlichkeit in einem engen Fenster – nicht „Express um jeden Preis". Intern bitte Kostenstellen und Ausnahmen mitführen, damit wir nach zwei Wochen die Bilanz ziehen.

[gez. OPS]`
  },
  'qualitaetskosten_8d_programm_ops_tag4.pdf': {
    filename: 'qualitaetskosten_8d_programm_ops_tag4.pdf',
    title: 'Kick-off-Notiz (QS/OPS an OPS)',
    type: 'document',
    content: `Betreff: 8D-Programm – strukturierte Fehlerbearbeitung

Wir starten in den betroffenen Linien ein 8D-Vorgehen: Team bilden, Problem beschreiben, Sofortmaßnahme, Ursachen finden, Korrektur festziehen, Wirksamkeit prüfen, Standard anpassen, Mannschaft würdigen. Der Wert liegt in der Disziplin – nicht in der Länge der Dokumente. Kosten durch extrene Moderation 6k. Reduziert sich bei nur 5 Why-Workshop auf 2k. 

Bitte kleine, belastbare Schritte bevorzugen und jede Annahme im Prozess einmal „anzweifeln". Eine saubere 8D-Spur senkt Nacharbeit und schafft Vertrauen, ohne dass wir die Fabrik mit Formularen überziehen. Oder sollten wir lieber den Prozess komplett extern aufsetzen (10k).

[gez. QS/OPS]

Begriff: 8D – achtstufiges Problemlösungsverfahren aus dem Qualitätsmanagement.`
  },
  'kurzarbeit_timing_hrlegal_tag4.pdf': {
    filename: 'kurzarbeit_timing_hrlegal_tag4.pdf',
    title: 'Memo (HR/Legal → CEO/Kommunikation)',
    type: 'memo',
    content: `Betreff: Kurzarbeit – Takt und Ton

Es wurde alles nötige geklärt, wir können umsetzen. ABER: Das Thema ist erklärungsbedürftig, aber nicht jeder Kanal trägt dieselbe Last. Wir schlagen vor, zunächst intern sauber zu ordnen (Betroffenheit, Kriterien, Dauer) und erst danach eine kurze, klare Information an die Belegschaft zu senden. Der Ton ist aufgeräumt: erklären, was gilt; nicht alles, was denkbar wäre.

Wichtig: Frageräume offen lassen und konkrete Anlaufstellen nennen. Wer keine Antwort bekommt, baut sich selbst eine. Rechtliche Hinweise integrieren wir sparsam – genug für Sicherheit, nicht genug für Angst. Wenn wir starten, haben wir eine Cashentlastung von 20k berechnet.

[gez. HR/Legal]`
  },
  'flexkonten_betriebsvereinbarung_hrlegal_tag4.pdf': {
    filename: 'flexkonten_betriebsvereinbarung_hrlegal_tag4.pdf',
    title: 'Anschreiben mit Eckpunkten (HR/Legal → Betriebsrat)',
    type: 'document',
    content: `Betreff: Flexkonten – Eckpunkte für eine Betriebsvereinbarung

Sehr geehrte Damen und Herren,

zur Abfederung der Auslastungsschwankungen in einigen Bereichen möchten wir Flexkonten einführen bzw. schärfen. Leitplanken aus unserer Sicht: klare Ober- und Untergrenzen, transparente Erfassung, vorgesehene Rückführung und ein Verfahren für Härtefälle. Führungskräfte werden vorab geschult; Ziel ist, dass Elastizität nicht als Beliebigkeit erlebt wird.

Wir schlagen eine kleine Pilotgruppe vor und ein festes Datum zur gemeinsamen Auswertung. Eine saubere Vereinbarung schützt beide Seiten und reduziert Reibung im Alltag.
Insbesondere in Kombination mit Kurzarbeit in anderen Bereichen ist die Kommunikation hier sehr wichtig, weshalb wir gerne mit dem BR eine intensive Informationskampagne angehen möchten.
Mit freundlichen Grüßen
[HR/Legal]`
  },
  'compliance_schulung_cash_freigaben_tag4.pdf': {
    filename: 'compliance_schulung_cash_freigaben_tag4.pdf',
    title: 'Einladung/Agenda (Legal → Führungskräfte CFO-Bereich/OPS)',
    type: 'document',
    content: `Betreff: Kurzschulung – Freigaben und Dokumentation

In den vergangenen Wochen sind viele Entscheidungen richtig gewesen, aber nicht alle gleich gut dokumentiert. Wir bieten eine einstündige Kurzschulung an: Was gehört in eine Begründung, wie halten wir Ausnahmen fest, und wie vermeiden wir den Eindruck, vergleichbare Fälle würden ungleich behandelt. Schulungskosten 2k für Catering, externer Seminarraum (wir sind ausgelastet mit IT-Schulungen) und Reisekosten. Alternativ könnten wir das gleich extern vergeben mit externem Trainer für 6k. Spart Kapa bei uns in HRLEGAL, kostet aber eben mehr.

Kernpunkte: Vier-Augen-Prinzip als Normalfall, kurze Vermerke zu Zweck und Zeitraum, und eine gemeinsame Sprache, die außen wie innen trägt. Ziel ist kein Mehraufwand, sondern weniger Rückfragen.

[gez. Legal]`
  },
  'mitarbeiterhilfe_fonds_tag4.pdf': {
    filename: 'mitarbeiterhilfe_fonds_tag4.pdf',
    title: 'Rechts- und Umsetzungsmemo (HR/Legal → BR)',
    type: 'memo',
    content: `Betreff: Mitarbeiterhilfe – Fortführung in schweren Zeiten

Wir haben seit langem den Hilfsfond für Mitarbeiter in Not und auch in diesen harten Zeiten will die GF sich von diesem traditionsreichen Instrument nicht verabschieden. Die Erfolge sind auch zu deutlich: Wir konnten beim behindertengerechten Umbau helfen, bei einer unverschuldeten Privatinsolvenz und bei einem Unfall mit Fahrerflucht, um nur die wichtigsten Fälle aus dem letzten jahr zu nennen. Der Wunsch nach Fortführung der gezielten  Unterstützung ist nachvollziehbar. Unter den härteren Rahmenbedingungen schlagen wir ein schlankes Modell vor: zweckgebundene Unterstützung in klar definierten Fällen, die geringeren Mittel durch schnelle Entscheidung in einem kleinen Kreis gezielt an die richtigen Stellen lenken. Der Fond ist auf 10k reduziert. Weitere Einsparungen sind aber denkbar.

Rechtlich sind zwei Punkte zentral: Transparenz und Gleichlauf. Wo Mittel knapp sind, braucht es objektive Kriterien; Ausnahmen müssen begründet sein. 

So entsteht Hilfe, die ankommt, ohne neue Schlaglichter zu produzieren.
[gez. HR/Legal]`
  }
};