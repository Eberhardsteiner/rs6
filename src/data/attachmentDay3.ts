// src/data/attachmentDay3.ts
import { AttachmentContent } from './attachmentContents';

export const day3Attachments: Record<string, AttachmentContent> = {
  'Email_Artikel.pdf': {
    filename: 'Email_Artikel.pdf',
    title: 'E-Mail (CEO → Kommunikation, Vertrieb, CFO)',
    type: 'email',
    content: `Betreff: Morgen erscheinender Artikel – letzte Fassung Kernbotschaften

Liebe Kolleginnen und Kollegen,

für dden Artikel, der morgen erscheint, haben wir die Passage zur Lieferfähigkeit und den Umgang mit kurzfristigen Ausschlägen noch einmal versucht zu glätten. Der Ton ist bewusst sachlich: wir erklären, was unter unserer Kontrolle steht, was wir beobachten, und wo wir frühzeitig informieren, wenn sich eine Planung sichtbar verschiebt. Das passt zur Wahrnehmung der letzten Tage – erwartungsvoll, aber nicht misstrauisch. In Bezug auf die Liquiditätslage haben wir offen, aber optimistisch kommuniziert.

Bitte stellt sicher, dass unsere Ansprechpartner bei zwei sensiblen Kunden dieselben Formulierungen verwenden. Ein „wir melden uns, wenn …" wirkt nur dann beruhigend, wenn es tatsächlich passiert. Falls Rückfragen zur Finanzierung kommen: wir sprechen nicht über Details, sondern über Verlässlichkeit der Prozesse. Die Bank wird denselben Text hören.

Danke für den kurzen Blick bis heute 16 Uhr. Danach frieren wir es ein, damit alle dieselbe Sprache verwenden.
[CEO]`
  },
  'Email_2Bank.pdf': {
    filename: 'Email_2Bank.pdf',
    title: 'Brief (CEO → CFO, mit Kopie an Beiratsvorsitz)',
    type: 'document',
    content: `Betreff: Vertrauliche Sondierung – zweite Hausbank

Sehr geehrte Damen und Herren,

wir wollen eine zweite, tragfähige Bankbeziehung anbahnen, ohne die bestehende Partnerschaft zu irritieren. Dazu brauchen wir eine stille, datenbasierte Ansprache: faktenfeste Kurzunterlagen (ohne Interpretationsspielräume), ein knappes Begleitschreiben und ein striktes NDA im Vorfeld. Mir geht es weniger um Konditionen als um das Signal, dass wir handlungsfähig bleiben, wenn das Umfeld lauter wird.

Bitte bereiten Sie in den kommenden drei Tagen eine „saubere Mappe" vor: Kontenstruktur, Zahlungsströme, die letzten Prüfvermerke und eine Erklärung, wie wir das Reporting takten. Keine Geschichten, nur Prüfbarkeit. Wir steuern die ersten Gespräche eng, ohne Namen im Haus zu streuen. Und: wir halten die Linie, dass dies ein Professionalitäts‑Schritt ist, kein Wechselsignal.

Mit freundlichen Grüßen
[CEO]


Begriff (implizit verwendet): NDA (Non‑Disclosure Agreement) – Vertraulichkeitsvereinbarung vor Austausch sensibler Informationen.`
  },
  'Einladung_Entwurf_Beirat.pdf': {
    filename: 'Einladung_Entwurf_Beirat.pdf',
    title: 'Einladungsschreiben (CEO → ausgewählte Schlüsselkunden)',
    type: 'document',
    content: `Betreff: Einladung zum Kundenbeirat – gemeinsame Orientierung

Sehr geehrte Damen und Herren,

wir möchten die regelmäßigen Gespräche auf eine verbindliche, schlanke Plattform heben: ein Kundenbeirat, der vierteljährlich zusammentritt und in Sondersituationen kurzfristig tagt. Die Idee ist einfach: Transparenz dort, wo sie Nutzen stiftet, Vertraulichkeit dort, wo sie Vertrauen schützt. Kein Marketingformat – ein Arbeitskreis.

Das erste Treffen (60 Minuten, virtuell) soll drei Dinge leisten: kurze Standortbestimmung, ein Blick auf die kommenden sechs Wochen und zwei konkrete Punkte, bei denen Ihre Erfahrung die bessere Entscheidung ermöglicht. Verbindliche Zusagen bleiben dem Tagesgeschäft vorbehalten; im Beirat entstehen keine Rechtsfolgen. Wo wir Informationen teilen, gilt stillschweigend die Regel, über Inhalte zu sprechen, nicht über Quellen.

Ich freue mich, wenn Sie eine Teilnahme ermöglichen und die Perspektive Ihrer Organisation einbringen.
[CEO]


Begriff im Text angedeutet: „Chatham‑House‑Regel" – Inhalte dürfen genutzt, aber Quellen nicht offengelegt werden.`
  },
  'Email_Berater.pdf': {
    filename: 'Email_Berater.pdf',
    title: 'Aktennotiz (CEO‑Stab)',
    type: 'document',
    content: `Aktennotiz – Vorgehen Beraterauswahl

Zur Unterstützung im Restrukturierungsprozess vergleichen wir zwei Ansätze: die große Beratung, banknah, mit breiter Infrastruktur (Auftakt 15k) und die fokussierte Boutique mit kurzer Reaktionszeit (10k). Entscheidend ist weniger die Außenwirkung als die Passung zum tatsächlichen Arbeitsmodus bei uns. Unabhängigkeit gegenüber Gläubigern ist zu betonen; zugleich hilft es, wenn ein Team die Sprache der Banken fließend spricht.

Wir bitten CFO/Legal, einen schlanken Mandatsentwurf zu skizzieren (klarer Auftrag, Meilensteine, Fixanteil plus moderater Erfolgskomponente). Ein erstes Gespräch führen wir mit beiden Kandidaten in derselben Woche, jeweils auf gleicher Faktenbasis. Die Entscheidung fällt danach rasch – nicht, weil wir müssen, sondern weil die Taktung sonst ins Rutschen gerät.

[gez. Leitung Stabstelle]


Begriffe (aus dem Kontext): CRO – externer Krisenmanager; Mandatsbrief – schriftliche Beauftragung mit Umfang, Honorar, Unabhängigkeitsklauseln.`
  },
  'Memo-Payroll.pdf': {
    filename: 'Memo-Payroll.pdf',
    title: 'Memo (CFO → CEO)',
    type: 'document',
    content: `Betreff: Lohnlauf – Vorbereitung und Kommunikationslinie

Die verschiebung der Lohnzahlung war kritisch, doch aus Liquiditätssicht nötig. Wir haben den Lohnlauf jetzt technisch sauber vorbereitet; zwei Zuflüsse liegen zeitlich eng. Eine „Vollgas‑Zusage" klingt gut, wirkt aber schnell wie eine Wette. Umgekehrt lässt zu viel Vorsicht unnötige Unruhe entstehen. Wir schlagen vor: Wir bestätigen die Auszahlungstermine in der bekannten Tonlage und erläutern intern knapp, wie wir die nächsten 72 Stunden überwachen. 

Punktuell lassen sich kleine Pufferelemente einziehen (ein Tageslimit hier, eine Testbuchung dort), ohne ein großes Thema daraus zu machen. Sollte eine Verzögerung absehbar werden, kommunizieren wir das früh und mit konkreter Lösung – kein Schwebenlassen. So halten wir Erwartung und Realität dicht beieinander.

[gez. CFO]`
  },
  'Email_Stundung.pdf': {
    filename: 'Email_Stundung.pdf',
    title: 'E-Mail (CFO → Leiter Steuern/HR‑Payroll)',
    type: 'email',
    content: `Betreff: Stundungsanträge – letzte Schliffe und Einreichung

Bitte schließen Sie die Unterlagen bis morgen ab. Für die Stundung zählt nicht die Länge der Begründung, sondern ihre Prüfbarkeit: kurze Herleitung, klare Fristen, sichtbare Zwischenziele. Ein Anruf bei der zuständigen Stelle im Vorfeld hat oft mehr Wirkung als ein farbiger Anhang. 

Wir formulieren in einem Satz, was die Stundung bewirkt: geordnete Abwicklung ohne Rückstau, sichtbare Entlastung für zwei Zeitkorridore, gleichzeitig Festhalten am regulären Verfahren. Die Tonlage ist respektvoll, nicht klagend. Falls Rückfragen kommen, antworten wir am selben Tag – auch wenn es nur ein Zwischenstand ist. Stundung bringt Cashentlastung von 70k. Ratenzahlung 50k.

Danke für die Konzentration auf das Wesentliche.
[gez. CFO]


Begriffe im Kontext: Stundung – bewilligte spätere Zahlung ohne offene Forderung zu bestreiten; Säumniszuschläge – Zuschläge bei verspäteter Zahlung, deren Vermeidung Teil der Zielsetzung ist.`
  },
  'Aktennotiz_KV.pdf': {
    filename: 'Aktennotiz_KV.pdf',
    title: 'Gesprächsnotiz (CFO ↔ Vertrieb/Einkauf)',
    type: 'document',
    content: `Gesprächsnotiz – Warenkreditversicherung

Ziel ist ein ruhigeres Feld für Lieferungen auf Rechnung. Die Versicherung springt  ein – allerdings nicht grenzenlos. Wir sammeln jetzt die relevanten Unterlagen, damit ein geordneter Antrag möglich ist: Kundenliste, Zahlungsverhalten, strittige Fälle getrennt. Für Top3-Kunden Prämie 10k. Nur Cufo AG absichern: 6k. Alternative wäre Bürgschaften für 5k, aber die belasten Kreditrahmen. 

Wichtig ist die Erwartung: eine Police ist kein Allheilmittel, sondern eine Stabilisierung. Selbstbehalte bleiben, Limits werden zugewiesen und gelegentlich gesenkt, wenn das Umfeld kippt. Das Narrativ nach außen ist nüchtern: professionelle Absicherung, keine Alarmmeldung.

[gez. CFO]


Begriffe: Limit – maximal versicherte Forderung je Kunde; Selbstbehalt – Anteil, den wir im Schadenfall selbst tragen.`
  },
  'Vorstand_Freigaben.pdf': {
    filename: 'Vorstand_Freigaben.pdf',
    title: 'Vorstands-Memo (CFO → CEO/OPS/HR)',
    type: 'document',
    content: `Betreff: Tageskorridore für Freigaben – Disziplin ohne Bremse

Wir bündeln Freigaben in Tageskorridoren, damit nicht jede Entscheidung einzeln am CFO‑Tisch landet. Der Korridor ist keine Mauer, sondern ein Geländer: Wenn ein Fall gut begründet ist, heben wir ihn über den Rand. Wenn er knapp ist, dokumentieren wir und holen am nächsten Tag nach. Manche kurzfristigen Entscheidungen könnten auch zu Mehrkosten führen. Casheinsparung zwischen 40 und 80k auf 14 Tage.

Das Entscheidende ist die Vorhersehbarkeit. Das Außenbild wird ruhiger, wenn drinnen die Muster stimmen. Bitte bis heute Abend Rückmeldung, ob es Bereiche gibt, in denen wir temporär eine andere Taktung brauchen.

[gez. CFO]`
  },
  'Eilauftrag_OPS.pdf': {
    filename: 'Eilauftrag_OPS.pdf',
    title: 'E-Mail (OPS → Vertrieb/Planung)',
    type: 'email',
    content: `Betreff: Eilauftrag [LIMA AG] – Umsetzung mit Puffer

Der Auftrag ist technisch machbar, aber nur, wenn wir das Rüsten eng takten und eine Schicht verschieben. Wir schlagen vor, den Plan mit einem kleinen Sicherheitsfenster zu versehen und den Kunden offen darauf hinzuweisen, dass wir zwei kritische Punkte im Blick behalten (Materialeingang und Prüfslot). Sonderschicht für 18k möglich.

Eine Pönale von 30k klingt nach Risiko, ist aber oft weniger schmerzhaft als ein unscharfes Versprechen. Das Verhältnis bleibt stabiler, wenn wir klar sagen, was wir schaffen – und was wir absichern. Bitte kurzer Schulterschluss mit QS, damit die Freigabe am Ende nicht auf dem Flur liegen bleibt. Teillieferung laut Kundenbetreuung für 8k möglich. Wenn wir Auftrag an Sub weiterleiten, verlieren wir auf jeden Fall 20k.

[gez. OPS]


Begriff: Pönale – Vertragsstrafe bei Termin‑ oder Leistungsabweichung.`
  },
  'Aktennotiz_Wartung.pdf': {
    filename: 'Aktennotiz_Wartung.pdf',
    title: 'Aktennotiz (Werksleitung)',
    type: 'document',
    content: `Aktennotiz – Wartungspaket, Staffel 1

Die letzten Wochen haben wir zu oft improvisiert. Wir ziehen deshalb drei überfällige Maßnahmen vor: eine vorausschauende Inspektion an der Engpasslinie, zwei prophylaktische Tauschpakete und eine kurz angesetzte Justage, die seit Monaten „noch eine Serie" warten sollte. Wir wissen, dass die Liquiditätssituation angespannt ist. Eine reduzierte Wartung kostet uns 5k. Wenn wir die Wartung verschieben, können wietere Ausfälle die Kunden verärgern. Eine umfassende Wartung der A-Linie kostet 18k, ist aber nachhaltig. Möglich wäre es auch, einen mobilen Serviceeinsatz vorzuhalten, der im Ernstfall einspringt und Ausfälle schnell beheben hilft - aber das ist nicht besonders nachhaltig (8k). wenn wir den externen Vertrag kündigen, können wir ca. 6k einsparen, gehen aber voll ins Risiko.

Nicht jede Minute bringt Output; aber ein geplanter Eingriff verhindert, dass wir zur Unzeit stehenbleiben. Wir dokumentieren Aufwand und Effekt knapp, um den Nachweis zu haben, dass die kleine Pause später Zeit spart.

[gez. Werksleitung]`
  },
  'MemoOpsExternKapa.pdf': {
    filename: 'MemoOpsExternKapa.pdf',
    title: 'Memo (Stab → OPS)',
    type: 'document',
    content: `Betreff: Externe Kapazität – temporäre Brücke

Ein Partner bietet an, kurzfristig einen Teil des Volumens zu übernehmen. Das ist kein Freifahrtschein; Qualität, Logistik und Freigaben müssen sitzen. Aber es ist die Option, die uns Luft gibt, wenn zwei Linien gleichzeitig Druck machen. Wir schlagen vor, mit einem klar abgegrenzten Paket zu starten: definierte Bauteile, definierte Mengen, definierte Prüfprotokolle.

Die Außenwirkung ist neutral, solange wir intern deutlich bleiben: wir kaufen keine Lösung, wir kaufen Zeit. Sobald die Engstelle vorbei ist, rollen wir zurück. Vertrieb informiert zwei betroffene Kunden proaktiv; keine Spielräume, die später wie Zusagen aussehen. Umsonst ist es nicht, auch wenn Zahlungskonditionen günstig (3 Monate): Komplettzuschaltung 14k, nur A-Kunden 9k, mit Qualitätsaudit 17k. Tun wir nichts und verzögert sich die Lieferung, fahren wir Kunden sauer.

[gez. S-OPS]`
  },
  'OPSLIEFERABRUF.pdf': {
    filename: 'OPSLIEFERABRUF.pdf',
    title: 'Gesprächsnotiz (OPS ↔ Logistik/Vertrieb)',
    type: 'document',
    content: `Gesprächsnotiz – Bündelungen in der Auslieferung

Viele kleine Abrufe fressen Rüstzeit und Fracht. Wir schlagen vor, Lieferungen in sinnvollen Fenstern zu bündeln und Express nur dort zuzulassen, wo Vertragszusagen oder echte Abhängigkeiten bestehen. Wichtig ist die Sprache nach außen: nicht „wir sparen", sondern „wir liefern zuverlässiger, wenn wir die Taktung stabilisieren".

Für zwei A‑Kunden halten wir eine Express‑Schiene offen, damit sich keine Legende bildet. Alle anderen erhalten klare Zeitfenster mit Ansprechpartner. Nach zwei Wochen ziehen wir Bilanz: Durchsatz, Reklamationen, Stimmung. Was bringt es uns? Wenn wir alles bündeln diese Woche 6k, wenn wir uns auf B-Kunden beschränken 3k, bei Expressservice 2k (mit gesteigerter Kudnenzufriedenheit). 

[gez. OPS]`
  },
  'Memo_Townhall.pdf': {
    filename: 'Memo_Townhall.pdf',
    title: 'Memo (HR/Legal → CEO/Kommunikation)',
    type: 'document',
    content: `Betreff: Townhall – Inhalte, Formate, Grenzen

Wir empfehlen, die Townhall als „Einordnungsrunde" zu rahmen: Was steht an, was ist stabil, wo sind noch Baustellen – in klarer, alltagstauglicher Sprache. Fragen sammeln wir im Vorfeld; spontane Wortmeldungen sind erwünscht, aber nicht grenzenlos. Sensible Punkte erläutern wir so, dass Verständnis entsteht, ohne vertrauliche Details zu verraten.

Die wichtigste Wirkung entsteht nach dem Termin: wer mit offener Flanke rausgeht, füllt sie am Kaffeetisch. Deshalb stellen wir ein kurzes Nachlese‑Dokument bereit und benennen drei Anlaufstellen für Rückfragen. Der Ton ist aufgeräumt, nicht glatt. Kosten für Catering etc. 2k.

[gez. HR/Legal]`
  },
  'Akzennotiz-AZK.pdf': {
    filename: 'Akzennotiz-AZK.pdf',
    title: 'Aktennotiz (Stab HR/Legal)',
    type: 'document',
    content: `Aktennotiz – Arbeitszeitkonten: gezielte Elastizität

In einzelnen Bereichen entsteht Druck, anderswo Leerlauf. Wir wollen die Last verteilen, ohne innere Gerechtigkeit zu verlieren. Arbeitszeitkonten können das abfedern, wenn die Regeln stimmen: klare Obergrenzen, saubere Erfassung, verlässliche Rückführung. wenn wir mehr Homeoffice zulassen, rechnen wir mit Kosten für Ausstattung und Koordinationsaufwand, Lizenzen für Videokonferenzen etc. von 8k.

Wir schlagen vor, mit einem klar dokumentierten Pilot zu starten und die Führungskräfte auf eine Tonlage einzuschwören: Es geht um Verschiebung, nicht um Verzicht. Wer regelmäßig mehr trägt, bekommt eine geregelte Rückgabe.

[gez. S-HR/Legal]`
  },
  'gutachten-Auszug-Kuendigung.pdf': {
    filename: 'gutachten-Auszug-Kuendigung.pdf',
    title: 'Rechtsgutachten-Kurzvermerk (Legal → HR)',
    type: 'document',
    content: `Betreff: Maßnahmen bei Leistungsschwäche – rechtlicher Rahmen

In zwei Fällen sind die Fehlerbilder teuer und wiederkehrend. Vor einer personellen Maßnahme brauchen wir eine lückenlose Dokumentation: klare Zielvereinbarungen, dokumentierte Abweichungen, Unterstützungsangebote – und die nachvollziehbare Schlussfolgerung, warum es trotz dessen nicht trägt. 

Eine vorschnelle Lösung produziert nur kurz Ruhe, danach Verfahren. Wir empfehlen, den Aktenstand in den nächsten zehn Tagen so zu ordnen, dass er von außen lesbar ist – und parallel Alternativen zu prüfen (Versetzung, befristete Zielvereinbarung). Erst wenn das sauber ist, kommen weitergehende Schritte in Frage. Aber klar ist auch, wenn das Schule macht und wir nichts tun, zieht das die ganze Belegschaft der Schicht runter. Möglich wäre auch, die FK zu coachen, denn hier ist offenbar einiges bei den FK-Kompetenzen im argen. Wir würden dafür 5k ansetzen. Eine Kündigung könnte und mit allem drum und dran 18k kosten. Ein Mentoring der beiden evtl. 2k.

[gez. Legal]`
  },
  'Memo_Delivery1.pdf': {
    filename: 'Memo_Delivery1.pdf',
    title: 'Memo (Legal → CFO/Einkauf)',
    type: 'document',
    content: `Betreff: Gleichbehandlungsgrundsatz – einfache Dokumentation je Freigabe

Ein Hinweis erreichte uns, wonach einzelne Entscheidungen angeblich „persönlich motiviert" seien. Ob da etwas dran ist, ist zweitrangig; entscheidend ist, dass der Prozess erkennbar fair ist. Wir führen deshalb pro Einzelfall ein kurzes Transparenzprotokoll: Sachgrund, Alternativen, Begründung – zwei Zeilen genügen. 

Flexibilität bleibt möglich; sie ist nur zu begründen. Wer später fragt, soll die Antwort finden, ohne Geschichten zu hören. So sinkt das Risiko von Missdeutungen, intern wie extern. Wenn wir ein externes Audit durchführen kommt uns das auf 5k.

[gez. Legal]`
  }
};