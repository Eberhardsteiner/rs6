// src/data/attachmentDay2.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day2Attachments: Record<string, AttachmentContent> = {
  'entwurf-Email.pdf': {
    filename: 'entwurf-Email.pdf',
    title: 'E-Mail (CEO → Vertriebsleitung, Operations)',
    type: 'email',
    content: `Liebe Kolleginnen und Kollegen,

die letzten Gespräche zeigen, dass Verlässlichkeit derzeit mehr Wirkung entfaltet als jede Präsentation. Für die nächsten zwei Wochen schlage ich zwei persönliche Termine bei den sensibelsten Accounts vor; flankierend richten wir ein kompaktes virtuelles Format für die übrigen Top‑Kunden ein. Entscheidend ist die Tonlage: kein Alarm, keine Heilsversprechen, sondern ein glaubwürdiger Plan, dem man uns abnimmt.

Bitte bereitet mit mir eine Gesprächsarchitektur vor, die überall gleich wirkt: drei Kernaussagen, ein klarer Blick auf die nächsten Schritte und eine verbindliche Rückmeldefrist, falls etwas vom Plan abweicht. Wo es passt, überreiche ich ein kurzes Schreiben, das Erreichbarkeit und Priorisierung bestätigt – ohne rechtsverbindliche Zusagen (ein „Letter of Comfort“ in schlichtem Deutsch).

Ich möchte in jedem Termin mindestens eine konkrete Nachfrage antizipieren und mit einer nachvollziehbaren Antwort belegen. OPS ist gebeten, dafür zwei greifbare Beispiele aus der Fertigung mitzunehmen, Vertrieb steuert die Erwartung im Hinblick auf Terminfenster. 

Danke für die Vorbereitung bis Mittwoch Mittag; wir stimmen die Details dann in einem 20‑Minuten‑Slot ab.

Herzliche Grüße
[CEO]`
  },

 'presseanfrage_tag2.pdf': {
    filename: 'presseanfrage_tag2.pdf',
    title: 'Email Redaktion',
    type: 'email',
    content: `Betreff: Interviewanfrage: Stabilität & Ausblick bei Aurion Pumpen Systeme – Angebot zur Stellungnahme

Sehr geehrte Frau Sanches,

die Wirtschaftsredaktion des Boten für Stadt und Land bereitet aktuell einen Beitrag zur Stabilität und zum Ausblick von Aurion Pumpen Systeme vor. Grundlage sind neben öffentlich zugänglichen Informationen auch Hinweise aus unternehmensnahen Quellen. Im Sinne der gebotenen Ausgewogenheit möchten wir der Geschäftsführung die Möglichkeit geben, zeitnah Stellung zu nehmen und zentrale Punkte einzuordnen.

Unser Vorschlag

Interviewformat: 30 Minuten, telefonisch oder per Video

Zeitraum: heute bzw. in den kommenden Tagen (bitte nennen Sie gern zwei bis drei mögliche Zeitfenster)

Gesprächsmodus: standardmäßig on the record mit Namensnennung („Imelda Sanches, Head of Communication, Aurion Pumen Systeme"). Hintergrundgespräche sind nach vorheriger expliziter Vereinbarung möglich.

Alternativ: schriftliche Stellungnahme (gerne mit einem autorisierten Zitat).

Orientierende Themenblöcke

Einordnung der aktuellen operativen Stabilität und des Ausblicks

Kontext zu den uns vorliegenden internen Hinweisen (Validität, Einordnung, ggf. Korrekturen)

Maßnahmen zur Kommunikation mit Mitarbeitenden, Kunden und Partnern

Nächste Meilensteine bzw. Termine, die für Stakeholder relevant sind

Frist & Veröffentlichung
Der Beitrag ist in Vorbereitung und wird in jedem Fall erscheinen. Wir würden Ihre Rückmeldung bzw. einen Interviewtermin gerne bis heute Abend berücksichtigen. Sollten wir bis dahin keine Rückmeldung erhalten, werden wir vermerken, dass Aurion Pumpen Systeme trotz Anfrage keine Stellungnahme abgegeben hat.

Bitte bestätigen Sie kurz den Eingang dieser Anfrage und teilen Sie uns mit, über welchen Kanal (Telefon/Video/Schrift) Sie bevorzugt antworten möchten. Für Rückfragen stehe ich jederzeit zur Verfügung.

Mit Dank und freundlichen Grüßen

Beatrice Neumann
Wirtschaftsredakteurin 

E-Mail: b.neumann@botestadtundland.de`
  },
  
  'ext-Beirat1.pdf': {
    filename: 'ext-Beirat1.pdf',
    title: 'Brief (CEO → Beiratsvorsitz)',
    type: 'document',
    content: `Sehr geehrte Vorsitzende,

in den vergangenen Tagen ist deutlich geworden, dass wir weniger ein Liquiditäts‑ als ein Einordnungsproblem haben. An vielen Stellen entsteht Geschwindigkeit, doch nicht jede Annahme ist gleich belastbar. Genau an dieser Stelle kann der Beirat seinen größten Wert entfalten: ein kurzer, gut strukturierter Austausch, der tragfähige Annahmen von temporären Hypothesen trennt und uns hilft, Vertrauen zurückzugewinnen.

Ich rege ein Sondertreffen an (1 Tag, Fokus auf zwei kritische Themenfelder). Sensible Punkte erläutern wir mündlich im engen Kreis; schriftlich erhält der Beirat eine kurze Vorlese‑Notiz mit den entscheidenden Wegmarken. Ziel ist nicht, alle Details zu teilen, sondern das Relevante so, dass zügige Entscheidungen möglich bleiben.

Wenn Sie zustimmen, lassen Sie uns noch diese Woche die Agenda abstimmen. Mir ist bewusst, dass wir Ihnen damit Aufwand zumuten; die Alternative – mehrere bilaterale Runden – kostet nach meiner Erfahrung mehr Zeit und schafft weniger Orientierung.

Mit freundlichen Grüßen
[CEO] Aurion`
  },
  'Aktenn-Stab1.pdf': {
    filename: 'Aktenn-Stab1.pdf',
    title: 'Aktennotiz (Stabstelle CEO)',
    type: 'document',
    content: `Aktennotiz – Umgang mit nicht‑essenziellem Aufwand (Reisen, Marketing, Subscriptions)

Ausgangslage:
Die Summe vieler kleiner Positionen belastet das Bild stärker als einzelne große Maßnahmen. Gleichzeitig gibt es Vorhaben, bei denen Sparsamkeit nach außen teurer wäre als eine kontrollierte Fortführung.

Vorschlag:
Wir verhängen für zwei Wochen ein Zurückhaltungs‑Regime mit schlankem Ausnahmekanal. Begründungen sollen greifbar sein (Zweck, erwartbarer Beitrag, kurzer Nachweis im Ergebnis). Entscheidungen treffen wir möglichst nah am Steuerungspunkt; das reduziert Reibung und verhindert, dass ein generelles „Nein“ die Oberhand gewinnt.

Erwartete Wirkung:
Ein beruhigter Ausgabentrend, ohne dass wir wichtige Signale verspielen. Kommunikation sollten wir nüchtern halten: verschieben, wo späterer Nutzen regelmäßig zu erwarten ist; streichen, wo eine Wiederaufnahme unwahrscheinlich ist.
Entscheidung nötig:
Strenges Moratorium, Ausnahmen nur CFO, mit ca. 30 bis 40k Einsparung
10 % Cut generell, ca. 15 bis 20k
Nur Reisen und Marketing: ca. 10k

[gez. Leitung Stabstelle]`
  },
  'Memo-Skt1.pdf': {
    filename: 'Memo-Skt1.pdf',
    title: 'Memo Entwurf (CFO → CEO)',
    type: 'document',
    content: `Betreff: Skonto‑Gesuche – Nutzen heben, Signalwirkung steuern

Mehrere Kunden regen an, frühere Zahlung gegen Nachlass zu vereinbaren. Das entlastet spürbar, birgt aber eine zweite Ebene: Was als nüchterne Liquiditätsmaßnahme gemeint ist, wird in der Lieferkette gern als Hinweis auf knappe Verhältnisse gelesen. Diese Lesart kann kleben bleiben.

Vorschlag: Dort, wo Beziehung und Sichtbarkeit hoch sind, befristete Vereinbarungen mit klarer Begründung und Rücksprungpunkt. Keine Automatismen für Folgeaufträge, keine versteckten Rabatte. Ansonsten bleibt es bei Standardkonditionen – und wir verkaufen stattdessen Verlässlichkeit: nachvollziehbare Termine, erreichbare Ansprechpartner, proaktive Rückmeldung bei Abweichungen.

Skonto (in unserem Kontext: Nachlass für deutlich frühere Zahlung) ist ein Werkzeug; es darf nicht zur Erzählung werden.
[gez. CFO]`
  },
  'Aktennotiz_Fac1.pdf': {
    filename: 'Aktennotiz_Fac1.pdf',
    title: 'Aktennotiz Treasury an CFO',
    type: 'document',
    content: `Aktennotiz Treasury – Vorschlag Vorbereitung Factoring‑Prüfung

Ziel ist eine saubere Entscheidungsgrundlage ohne Vorfestlegung. Wir bereiten Debitorenlisten so auf, dass ein externer Partner sie prüfen könnte, ohne dass daraus ein „Muss“ wird. Strittige Fälle bleiben draußen, Sonderposten werden eindeutig markiert. 

Die Kommunikation nach außen: Vorbereitung ist Professionalität, keine Notmaßnahme. Wir erläutern auf Nachfrage, dass „Non‑Recourse“ (Factoring ohne Rückgriff) die Risikotragung verschiebt, aber nicht gratis ist; „Recourse“ (mit Rückgriff) ist günstiger, bringt jedoch weniger Entlastung. Beide Varianten bleiben Optionen – nicht mehr und nicht weniger.

So gewinnen wir Handlungsfähigkeit, ohne einen Kurswechsel zu verkünden.
[gez. Selin Orhan, Treasury]`
  },
  'Notiz_ZZ1.pdf': {
    filename: 'Notiz_ZZ1.pdf',
    title: 'Gesprächsnotiz (CFO ↔ Einkauf)',
    type: 'document',
    content: `Gesprächsnotiz – Zahlungsziele Top‑Lieferanten

Die Spannbreite reicht von entgegenkommend bis fordernd. Wir schließen die Reihen: eine einheitliche Erzählung, die Liefertreue und Stabilität betont, und ein fester Rahmen, in dem wir Entgegenkommen an überprüfbare Punkte knüpfen (Lieferflexibilität, Qualitätszusagen). 

Wo Alternativen vorhanden sind, nutzen wir sie ruhig, aber erkennbar. Wo es keine gibt, halten wir die Linie dennoch sachlich: Transparenz über unsere Steuerung und das klare Angebot, Abweichungen früh zu melden. Keine Einzelfallpolitik ohne Vermerk; so erkennen wir Muster, bevor sie Kosten produzieren. Sollten wir Bürgschaften prüfen lassen?

Ergebnis: verhandelbar bleiben, ohne sich treiben zu lassen.
[gez. CFO]`
  },
  'Memo-Treasury.pdf': {
    filename: 'Memo-Treasury.pdf',
    title: 'Vorstands-Memo (Vorschlag Stab CFO an CFO)',
    type: 'memo',
    content: `Betreff: Treasury‑Board – Tägliche Taktung

Die vielen kleinen Entscheidungen zum richtigen Zeitpunkt schlagen den einen großen Beschluss zur falschen Zeit. Wir setzen deshalb ein kurzes, verlässliches Ritual auf: jeden Werktag 15 Minuten, feste Uhrzeit, einseitiger Überblick zu Kontostand, erwarteten Bewegungen, und drei Punkten, die heute entschieden werden müssen. 

Das Board protokolliert knapp (zwei Zeilen pro Beschluss); Eskalation nur, wenn wir den gemeinsam definierten Korridor verlassen. So entsteht Tempo, ohne dass Spuren verwischen – und außen wird erkennbar, dass wir führen, nicht getrieben werden.

Alternativ könnten wir auch den Vorschlag von Dr. Gerlach aufgreifen und in Abstimmung mit ihr eine externe Vertrauenperson hinzuziehen, die im Treasury "nach dem rechten sieht" und der Bank Vertrauen vermittelt. Aber: WOLLEN WIR DAS? Dr. Gerlach hat da offenbar schon einen Vorschlag, Kosten sicherlich >10k, aber Vertrauen der Bank würden wir sicherlich erhöhen.
`
  },
  'Stoerungsmeldung1.pdf': {
    filename: 'Stoerungsmeldung1.pdf',
    title: 'Störungsmeldung & Maßnahmenplan (Werksleitung → COO)',
    type: 'document',
    content: `Störungsmeldung – Anlage K‑1 (Kernlinie)

Der Ausfall kam nicht aus heiterem Himmel; die letzten Wartungsprotokolle hatten bereits unruhigere Werte gezeigt. Wir sichern die Linie in drei Schritten ab: schnelle Schadbilderfassung, kurzfristige Umrüstung, und parallel das Angebot für externe Fertigungsstunden. Nicht jede Variante ist elegant, aber elegant ist heute nicht die Hauptkennziffer.

Kunden, die von K‑1 abhängig sind, erhalten eine proaktive Meldung mit realistischen Zeitfenstern. Intern dokumentieren wir Entscheidungen knapp – nicht als Selbstzweck, sondern damit die zweite Schicht anknüpfen kann, ohne neu zu raten. Optionen: Ersatzbeschaffung als Express mit saftigem Aufpreis von 18k (die nutzen unsere Lage schamlos aus!), interne Reparatur (Kosten 8k). Wir können den Auftrag auch bei einem Auftragsfertiger abarbeiten lassen, aber die Qualität kann ich da nicht garantieren, das kann auch schiefgehen und ist auch teuer (12 bis 15 k schätze ich). Oder wir lassen den Auftrag ausfallen, was den Kunden massiv verärgern wird und uns die Marge + Strafe von 12k kosten dürfte.

Ziel: Lieferzusagen halten, ohne der Fabrik eine zweite Baustelle zu zumuten.
[gez. Werksleitung]`
  },
  'Rohstoffe1.pdf': {
    filename: 'Rohstoffe1.pdf',
    title: 'Memo (OPS → Einkauf/CFO)',
    type: 'memo',
    content: `Betreff: Engpassrohstoffe – gezielte Puffer, gezügelte Bindung

Unser Sicherheitsnetz ist zu dünn, aber ein breites Aufpolstern würde uns an anderer Stelle fesseln. Wir fokussieren deshalb auf die Teile mit Hebelwirkung: dort bauen wir einen schmalen, kontrollierten Puffer auf (A-Teile, das kostet uns dann 50k Kapitalbindung). Wenn wir volle sicherheit wollen sind wir bei 120k.

Mit zwei Partnern sondieren wir ein Konsignationsmodell (Bestand ist bei uns im Lager, liegt formal aber beim Lieferanten, Abrechnung erst beim Abruf). Das gibt uns Luft, ohne die Liquidität unnötig zu binden. In weniger kritischen Positionen fahren wir weiterhin eng; der Effekt soll spürbar sein, nicht überall. Unklar, ob diese Lösung zustande kommt, würde uns aber Kapitalbindung ersparen.

Es  mus Sicherheit an den richtigen Stellen entstehen, nicht der Eindruck, wir holten pauschal die Schotten hoch.
[gez. OPS]`
  },
  'Produktmix1.pdf': {
    filename: 'Produktmix1.pdf',
    title: 'E-Mail (OPS → Vertrieb/Planung)',
    type: 'email',
    content: `Betreff: Produktmix – kurzfristige Ausrichtung auf stabile Beiträge

Die Linie P3 liefert seit Monaten den zuverlässigsten D-Beitrag, leidet aber unter Rüstaufwand. Für die nächsten Wochen schlage ich eine Taktung vor, die P3 verlässlich einbaut, ohne die Vielfalt komplett zu opfern. Der Hinweis an die Kunden ist wichtig: temporäre Schwerpunktsetzung, die wir nach jedem Sprint überprüfen. Wenn wir P3 maximal priorisieren, können wir sicherlich 22 bis 28k zusätzlich realsieren. Dann müssen andere zurückstecken, das wird uns sicherlich Kundenzufriedenheit kosten. Bei einem etwas ausgewogeneren Mix könnten 12 bis 18 k drin sein. Halten wir die Linie wie bisher um alle Kunden der P-Linie glücklich zu machen, müssen wir wegen des Maschinenausfalls sicherlich 6k drauflegen. Dann haben wir glückliche Kunden, aber was haben wir?

„Deckungsbeitrag“ ist kein Fabrikjargon, sondern eine Tatsache: Produkte, die mehr zum Fixkostenblock beitragen, stabilisieren den Gesamteindruck – solange wir die Beziehungen der anderen nicht vernachlässigen. Wo individuelle Zusagen sinnvoll sind, stimmen wir sie im kleinen Kreis ab und halten sie fest.

Bitte Rückmeldung bis  Mittag, dann fräsen wir die Sequenzen in den Plan.
[gez. OPS]`
  },
  'Qualitaet1.pdf': {
    filename: 'Qualitaet1.pdf',
    title: 'Qualitätsmeldung (QS/OPS)',
    type: 'document',
    content: `Entwurf Info an Fertigung: Qualitätsmeldung – Anpassung Prüfkonzept

Die letzte Charge hatte eine auffällige Streuung; wir verschieben kurzfristig die Gewichte zugunsten der Qualität. In den betroffenen Linien führen wir eine zusätzliche Abschlussprüfung ein; an anderer Stelle reicht eine feinere Stichprobe. Die Fabrik soll weiter atmen, aber wir wollen Nacharbeit vermeiden.

Hinweis: In der Stichprobenlogik orientieren wir uns am AQL‑Denken (akzeptierte Fehlergrenze in einer Probe). Das ist kein Selbstzweck, sondern schützt die Glaubwürdigkeit der Serie. Wir evaluieren nach zwei Wochen: Reklamationen, Durchsatz, Stimmung an den Arbeitsplätzen. Optionen: Zusätzliche Endprüfung (ca 6k) oder Stichprobenprüfungen (ca 2k) mit deutlich geringerer Kundenzufriedenheit. Auch die externe QS ist noch nicht vom Tisch, wobei uns das ca 10k kosten könnte, aber die Kundenzufiredenheit deutlich steigert. 

Bitte ab sofort auf jeden Fall das geänderte Prüfblatt nutzen.
[gez. QS/OPS]`
  },
  'Aktennotiz_Grippe.pdf': {
    filename: 'Aktennotiz_Grippe.pdf',
    title: 'Aktennotiz (HR/Legal)',
    type: 'document',
    content: `Aktennotiz – Personaleinsatz Montage

Die Ausfälle sind spürbar, kritische Projekte geraten näher an den Rand. Kurzfristige Mehrarbeit ist möglich, aber nicht beliebig dehnbar; wenn dieselben Personen immer wieder einspringen, kippt die Stimmung. Externe Unterstützung stabilisiert, erfordert aber klare Leitplanken (Einweisung, Arbeitssicherheit, Befristung, Kosten ca 15k).

Wir schlagen eine abgestufte Lösung vor: interne Umsetzungen dort, wo Qualifikationen anschlussfähig sind; externe Kräfte mit sauberer Dokumentation; transparente Kommunikation, damit sich das „Warum“ nicht in Gerüchte verflüchtigt. Rechtlich behalten wir die Grenzen der Arbeitszeit (ArbZG) im Blick und stimmen mit dem Betriebsrat eng. Wir haben verstanden, dass eine Priorisierung uns evtl. Vertragsstrafen kosten wird (8k). Wenn wir Sie richtig verstanden haben, ist nichts tun aber keine Lösung, wenn dann Gewinnausfälle von 18k drohen. Andererseits sind wir vielleicht gezwungen, in anderen bereich auf Kurzarbeit zu gehen, vielleicht sind Umschichtungen möglich, auch wenn uns natürlich klar ist, dass die Qualifikationen sich völlig unterscheiden.

Ziel ist Stabilität ohne Verschleiß.
[gez. HR/Legal]`
  },
  'Email-BR1.pdf': {
    filename: 'Email-BR1.pdf',
    title: 'Anschreiben mit Agenda (HR/Legal → BR)',
    type: 'document',
    content: `Betreff: Ihre Gesprächsanfrage – Kurzarbeit (Vorschlag zur Agenda)

Sehr geehrte Damen und Herren,

wir möchten die Planung zur Kurzarbeit frühzeitig mit Ihnen ordnen. Wichtiger als der Umfang ist eine faire, nachvollziehbare Verteilung und ein Verfahren, mit dem wir auf Veränderungen reagieren können. 

Vorgeschlagene Agenda:
1) Lage in den betroffenen Bereichen – was ist stabil, was ist volatil?
2) Verteilungskriterien und Umgang mit Härtefällen
3) Informationswege während der Laufzeit; wer meldet was, bis wann?
4) Dokumentation und gemeinsamer Überprüfungstakt

Ein Entwurf für die Informationsunterlagen liegt bereit; wir nehmen Ihre Hinweise gern auf. Ziel ist, Missverständnisse gar nicht erst entstehen zu lassen.
Mit freundlichen Grüßen
[HR/Legal]`
  },
  'Leitlinie_Geruechte.pdf': {
    filename: 'Leitlinie_Geruechte.pdf',
    title: 'Kurzleitlinie (HR/Legal → Belegschaft)',
    type: 'document',
    content: `Betreff: Hinweise zur Kommunikation in sozialen Medien

Liebe Kolleginnen und Kollegen,

wir möchten den offenen Austausch nicht einschränken – aber sensible Informationen gehören nicht in öffentliche Kanäle. Bitte keine Projektdetails, Finanzzahlen oder intern abstimmungsbedürftigen Themen posten. Wer eine Frage aus seinem Umfeld beantworten möchte, kann auf allgemein verfügbare Aussagen verweisen; für Formulierungshilfe stehen Kommunikation (Imelda Sanches & Team) und HR bereit.

Es geht nicht um Maulkörbe, sondern um Schutz vor unbeabsichtigten Schäden. Worte reisen weiter, als man beim Absenden ahnt – und häufig ohne Kontext. Vielen Dank für das Mitdenken.
HR/Legal`
  },
  'Datenschutz1.pdf': {
    filename: 'Datenschutz1.pdf',
    title: 'Rechtsgutachten-Memo (Legal → CFO/CEO)',
    type: 'memo',
    content: `Für die Weitergabe von Vorgangs‑ und Kundendaten an Dritte schlagen wir zwei Prüfpfade vor: eine kurze Risikobetrachtung für die konkreten Datenkategorien und eine klare vertragliche Grundlage. Beides beschleunigt spätere Schritte und verhindert Sperren im falschen Moment.

Kernpunkte:
• Zweckbindung: präzise Formulierung, wofür die Daten verarbeitet werden.
• Minimierung: nur, was zur Beurteilung nötig ist.
• Vertragliche Basis: Auftragsverarbeitung (Art. 28 DSGVO) oder – wo kein Auftrag vorliegt – eine konfidenzielle Vereinbarung, die Zugriff und Schutzmaßnahmen klar regelt (NDA).
• Speicher‑ und Löschfristen: eindeutig benennen, keine „ewigen“ Ablagen.
Für den Check müssen wir ca. 1k einplanen. Wenn wir das extern vergeben, erhöhen wir natürlich das Vertrauen und die Absicherung, aber dafür haben wir ein Angebot über 5k vorliegen.

So bleibt die Handlungsfähigkeit hoch, ohne dass der Datenschutz zur rhetorischen Bremse wird.
[gez. Legal]`
  }
};