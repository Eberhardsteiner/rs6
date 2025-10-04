// src/data/attachmentDay1.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day1Attachments: Record<string, AttachmentContent> = {
  'bank_brief_tag1.pdf': {
    filename: 'bank_brief_tag1.pdf',
    title: 'Brief der Hausbank - Linienkürzung',
    type: 'document',
    content: `Sehr geehrte Damen und Herren,

nach eingehender Prüfung Ihrer aktuellen Geschäftslage sehen wir uns veranlasst, die bestehende Kontokorrentlinie um 300.000 Euro zu reduzieren. 

Hintergrund dieser Entscheidung sind die in den vergangenen Wochen beobachteten Schwankungen in Ihrem Cash-Flow sowie die erhöhten Risiken in Ihrer Branche. Um eine weitere Zusammenarbeit zu ermöglichen, benötigen wir von Ihnen:

1. Einen detaillierten 13-Wochen-Liquiditätsplan
2. Ein strukturiertes Maßnahmenpaket zur Stabilisierung
3. Wöchentliches Reporting über die Geschäftsentwicklung

Wir sind überzeugt, dass diese Schritte zu einer nachhaltigen Stabilisierung Ihres Unternehmens beitragen werden. Für Rückfragen stehen wir Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen
ppa. Bernd Schuster ppa. Dr. Iris Gerlach
Vereinigte Kreditbank AG
Firmenkundenbetreuung`
  },
  'zahlungspriorisierung_matrix.xlsx': {
    filename: 'zahlungspriorisierung_matrix.xlsx',
    title: 'Zahlungspriorisierung Matrix',
    type: 'spreadsheet',
    content: `ZAHLUNGSPRIORISIERUNG MATRIX

PRIORITÄT 1 (P1) - KRITISCH:
- Löhne und Gehälter
- Sozialversicherungsbeiträge
- Steuern (bei Vollstreckungsrisiko)
- Sicherheitskritische Lieferanten
- Energieversorgung
- Miete/Pacht

PRIORITÄT 2 (P2) - WICHTIG:
- A-Kunden-relevante Lieferanten
- Wartungsverträge kritischer Anlagen
- Versicherungen
- Rechtsanwalts-/Beraterhonorare
- IT-Services (produktionskritisch)

PRIORITÄT 3 (P3) - VERSCHIEBBAR:
- Marketing-Ausgaben
- Nicht-kritische Wartungen
- Reisekosten
- Fortbildungen
- Büromaterial
- Sonstige Dienstleistungen

ENTSCHEIDUNGSMATRIX:
Betrag < 1.000 EUR: Bereichsleiter
Betrag 1.000-10.000 EUR: CFO-Freigabe
Betrag > 10.000 EUR: CEO + CFO gemeinsam`
  },
  'kunden_offene_posten.xlsx': {
    filename: 'kunden_offene_posten.xlsx',
    title: 'Offene Posten Kunden - Skonto-Analyse',
    type: 'spreadsheet',
    content: `OFFENE POSTEN ANALYSE

A KUNDEN:
Offener Betrag: EUR 245.000
Durchschnittliche Zahlungsdauer: 52 Tage
Skonto-Bereitschaft: Ja (4% bei 10 Tagen)
Risikobewertung: Niedrig

B KUNDEN:
Offener Betrag: EUR 180.000
Durchschnittliche Zahlungsdauer: 38 Tage
Skonto-Bereitschaft: Ja (4% bei 7 Tagen)
Risikobewertung: Niedrig

C KUNDEN:
Offener Betrag: EUR 320.000
Durchschnittliche Zahlungsdauer: 65 Tage
Skonto-Bereitschaft: Bedingt (4% bei 5 Tagen)
Risikobewertung: Mittel

GESAMTPOTENZIAL SKONTO:
Nur A-Kunden gezielt: EUR 50.000 Cash-Zufluss, Ergebnisbelastung: EUR 2.000
Breites Ausrollen: EUR 90.000, Ergebnisbelastung: EUR 5.600
Ohne Policy: Nicht vorhersagbar`
  },
  'behörden_formulare.pdf': {
    filename: 'behörden_formulare.pdf',
    title: 'Stundungsantrag Umsatzsteuer/Sozialabgaben',
    type: 'document',
    content: `ANTRAG AUF STUNDUNG

An das Finanzamt für Körperschaften Großburgstadt
Betreff: Antrag auf Stundung der Umsatzsteuer

Sehr geehrte Damen und Herren,

hiermit beantragen wir die Stundung der fälligen Umsatzsteuer in Höhe von EUR 70.000.

BEGRÜNDUNG:
Aufgrund temporärer Liquiditätsengpässe, verursacht durch verzögerte Kundenzahlungen und erhöhte Materialvorauszahlungen, können wir die fällige Umsatzsteuer nicht termingerecht entrichten.

VORGESCHLAGENER ZAHLUNGSPLAN:
- Sofortzahlung: EUR 35.000 (50%)
- Restbetrag EUR 35.000 in 3 Raten à EUR 11.667 in den drei Folgemonaten

ANLAGEN:
- Liquiditätsplanung 13 Wochen
- Bestätigung Hausbank
- Betriebswirtschaftliche Auswertung

Mit freundlichen Grüßen
[Unterschrift CFO]`
  },
  'reporting_template.xlsx': {
    filename: 'reporting_template.xlsx',
    title: 'Bank-Reporting Template',
    type: 'spreadsheet',
    content: `WEEKLY BANK REPORT TEMPLATE

LIQUIDITÄT:
- Kassenbestand: [Betrag]
- Kontokorrent genutzt: [Betrag]
- Verfügbarer Rahmen: [Betrag]
- 13-Wochen-Prognose: [Anhang]

GESCHÄFTSVERLAUF:
- Umsatz Woche: [Betrag]
- Auftragseingang: [Betrag]
- Wichtige Kundenentscheidungen: [Text]

MASSNAHMEN:
- Umgesetzte Schritte: [Liste]
- Geplante Maßnahmen: [Liste]
- Risiken/Abweichungen: [Text]

COVENANTS:
- Net Debt/EBITDA: [Wert]
- Mindest-EBITDA: [Status]
- Zinsdeckung: [Wert]

AUSBLICK:
- Erwartete Zahlungseingänge: [Liste]
- Kritische Ausgaben: [Liste]
- Nächste Meilensteine: [Termine]`
  },
  'mail_chemalloy.eml': {
    filename: 'mail_chemalloy.eml',
    title: 'E-Mail von ChemAlloy - Vorkasseforderung',
    type: 'email',
    content: `Von: procurement@chemalloy.com
An: einkauf@aurion-ps.com
Betreff: Änderung Zahlungskonditionen - Sofortige Wirkung

Sehr geehrte Damen und Herren,

aufgrund der Kündigung der Kreditversicherungsdeckung für Ihr Unternehmen sehen wir uns leider gezwungen, unsere Zahlungskonditionen mit sofortiger Wirkung anzupassen.

Für alle neuen Bestellungen benötigen wir:
- 70% Vorauszahlung bei Auftragsbestätigung
- 30% bei Lieferung

Diese Regelung gilt für alle Gussteile der Serien GT-400 bis GT-800, die für Ihre Kernproduktion kritisch sind.

Wir bedauern diesen Schritt, sehen aber aufgrund der aktuellen Marktlage keine Alternative. Gerne sind wir bereit, über alternative Sicherheiten (Bankbürgschaft, Akkreditiv) zu sprechen.

Mit freundlichen Grüßen
ChemAlloy Procurement Team`
  },
  'layout_montagelinie.dwg': {
    filename: 'layout_montagelinie.dwg',
    title: 'Layout Montagelinie - Umbauplan',
    type: 'document',
    content: `TECHNISCHE ZEICHNUNG - MONTAGELINIE UMBAU

AUSGANGSLAGE:
- Aktuelle Taktzeit: 4,2 Minuten/Einheit
- Engpass: Station 3 (Endmontage)
- Auslastung: 68% (schwankend 45-95%)
- Ausschusskosten 4-6k/Monat

UMBAU-KONZEPT:
- Parallelstation für Station 3
- Optimierte Materialzuführung
- Ergonomische Arbeitsplätze
- Integrierte Qualitätsprüfung

ERWARTETE VERBESSERUNGEN:
- Taktzeit: 3,6 Minuten/Einheit (-14%)
- Auslastung: 82% (stabilisiert)
- Durchsatz: +12% Stückzahl
- Qualität: Weniger Nacharbeit

KOSTEN:
- Umbau tagsüber: EUR 18.000 + 2 Tage Stillstand
- Umbau nachts: EUR 35.000 + kein Stillstand
- ROI: 8-12 Wochen

RISIKEN:
- Anlaufprobleme erste Woche
- Schulungsbedarf Mitarbeiter
- Temporär höhere Fehlerquote`
  },
  'logistikvertrag_v2.pdf': {
    filename: 'logistikvertrag_v2.pdf',
    title: 'Logistikvertrag Verhandlung - Zahlungsziele',
    type: 'document',
    content: `VERHANDLUNGSPROTOKOLL LOGISTIKPARTNER

AUSGANGSLAGE:
- Aktuelles Zahlungsziel: 14 Tage
- Gewünschtes Ziel: 30 Tage
- Jahresvolumen: EUR 480.000

VERHANDLUNGSOPTIONEN:

OPTION A: Harte Verhandlung auf 30 Tage
- Risiko: Partner lehnt ab
- Cash-Effekt: +EUR 20.000
- Beziehungsrisiko: Hoch

OPTION B: Kompromiss 21 Tage + Volumenbindung
- Zusätzliche Bindung: +20% Volumen
- Cash-Effekt: +EUR 12.000
- Beziehungsrisiko: Niedrig

OPTION C: Alternative Anbieter
- 3 Anbieter identifiziert
- Preisunterschied: -15% bis +8%
- Qualitätsrisiko: Mittel bis hoch
- Umstellungskosten: EUR 15.000

EMPFEHLUNG Einkaufsabt. (D.Jörg):
Kompromiss mit Volumenbindung und Qualitäts-SLA`
  },
  'reklamation_a_kunde.pdf': {
    filename: 'reklamation_a_kunde.pdf',
    title: 'Reklamation A-Kunde - Qualitätsproblem',
    type: 'document',
    content: `REKLAMATIONSMELDUNG

KUNDE: PharmaMax AG (A-Kunde)
AUFTRAG: PM-2024-0847
CHARGE: C240815-03

REKLAMATIONSGRUND:
Oberflächenrauheit bei 12 von 50 Pumpengehäusen außerhalb der Spezifikation (Ra 0,8 statt gefordert Ra 0,4).

AUSWIRKUNGEN BEIM KUNDEN:
- Verzögerung Qualifizierung: 3 Wochen
- Zusätzliche Prüfkosten: EUR 8.000
- Imageschaden bei Endkunden

FORDERUNG:
- Sofortige Ersatzlieferung (50 Stück)
- Übernahme der Prüfkosten
- Root-Cause-Analyse mit 8D-Report
- Präventivmaßnahmen für Folgeaufträge

UNSERE EINSCHÄTZUNG:
- Reklamation teilweise berechtigt (8 von 12 Teilen)
- Ursache: Werkzeugverschleiß Station 4
- Kosten Ersatzlieferung: EUR 22.000
- Kulanzspielraum vorhanden

OPTIONEN:
A) Volle Kulanz + Root-Cause
B) 50% Kostenteilung
C) Nur berechtigte Teile ersetzen
D) Verhandlung über Kompensation`
  },
  'intranet_faq_v1.md': {
    filename: 'intranet_faq_v1.md',
    title: 'Intranet FAQ - Lohnsicherheit',
    type: 'document',
    content: `# HÄUFIG GESTELLTE FRAGEN - LOHNSICHERHEIT

## Sind unsere Löhne sicher?
**Ja.** Die Lohn- und Gehaltszahlungen haben oberste Priorität. Wir haben entsprechende Maßnahmen eingeleitet, um die Liquidität zu sichern.

## Was bedeutet die Bankensituation für uns?
Die Bank fordert mehr Transparenz und regelmäßige Berichte. Das ist ein normaler Vorgang bei angespannten Marktbedingungen. Wir arbeiten eng mit der Bank zusammen.

## Wird es Entlassungen geben?
Aktuell sind keine betriebsbedingten Kündigungen geplant. Unser Fokus liegt auf der Stabilisierung des Geschäfts.

## Was ist mit Kurzarbeit?
Kurzarbeit wird als Option geprüft, aber nur für bestimmte Bereiche und zeitlich begrenzt. Der Betriebsrat wird frühzeitig einbezogen.

## Wie geht es weiter?
Wir informieren Sie regelmäßig über wichtige Entwicklungen. Bei Fragen wenden Sie sich an Ihre Führungskraft oder HR.

## An wen kann ich mich wenden?
- HR-Hotline: Durchwahl 4567
- Betriebsrat: Durchwahl 4580
- Geschäftsführung: Nach Terminvereinbarung

*Letzte Aktualisierung: [Datum]*`
  },
  'kurzarbeit_checkliste.pdf': {
    filename: 'kurzarbeit_checkliste.pdf',
    title: 'Kurzarbeit Checkliste - Rechtliche Voraussetzungen',
    type: 'document',
    content: `KURZARBEIT - RECHTLICHE CHECKLISTE

VORAUSSETZUNGEN (§ 96 SGB III):
☐ Erheblicher Arbeitsausfall (> 10% der Beschäftigten)
☐ Arbeitsausfall ist vorübergehend
☐ Arbeitsausfall ist unvermeidbar
☐ Betriebsrat wurde informiert/angehört
☐ Anzeige bei Arbeitsagentur erstattet

ANZEIGEPFLICHT:
☐ Schriftliche Anzeige spätestens bis zum Ablauf des Kalendermonats
☐ Begründung des Arbeitsausfalls
☐ Anzahl der betroffenen Arbeitnehmer
☐ Beginn und voraussichtliche Dauer

BETRIEBSRAT:
☐ Information über geplante Kurzarbeit
☐ Anhörung zu Auswahlkriterien
☐ Stellungnahme einholen
☐ Betriebsvereinbarung prüfen

SOZIALAUSWAHL:
☐ Soziale Gesichtspunkte berücksichtigen
☐ Betriebliche Belange beachten
☐ Dokumentation der Auswahlkriterien

ANTRAGSSTELLUNG:
☐ Antrag innerhalb von 3 Monaten nach Anzeige
☐ Nachweis der Voraussetzungen
☐ Aufstellung der betroffenen Arbeitnehmer

DAUER:
☐ Längstens 12 Monate (verlängerbar auf 24 Monate)
☐ Regelmäßige Überprüfung der Voraussetzungen`
  },
  'vertrag_muster_freie.pdf': {
    filename: 'vertrag_muster_freie.pdf',
    title: 'Mustervertrag Freie Mitarbeiter',
    type: 'document',
    content: `WERKVERTRAG

zwischen
APS Pumpen Systeme GmbH (Auftraggeber)
und
[Name] (Auftragnehmer)

§ 1 VERTRAGSGEGENSTAND
Der Auftragnehmer verpflichtet sich zur Erbringung von [Leistungsbeschreibung] als selbständiger Unternehmer.

§ 2 SCHEINSELBSTÄNDIGKEIT VERMEIDEN
- Freie Zeiteinteilung des Auftragnehmers
- Keine Eingliederung in Arbeitsorganisation
- Eigene Betriebsmittel des Auftragnehmers
- Unternehmerisches Risiko beim Auftragnehmer
- Möglichkeit der Vertretung

§ 3 VERGÜTUNG
Pauschale: EUR [Betrag] für das Gesamtwerk
Zahlbar in [Anzahl] Raten nach Leistungsfortschritt

§ 4 HAFTUNG
Der Auftragnehmer haftet für Mängel nach den gesetzlichen Bestimmungen.

§ 5 DATENSCHUTZ/VERTRAULICHKEIT
Strenge Vertraulichkeit über alle Betriebsgeheimnisse.

§ 6 KÜNDIGUNG
Ordentliche Kündigung mit 4 Wochen Frist zum Monatsende.

[Unterschriften]`
  },
  'hinweisportal_ticket_4711.msg': {
    filename: 'hinweisportal_ticket_4711.msg',
    title: 'Whistleblowing Hinweis #4711',
    type: 'email',
    content: `HINWEISPORTAL - TICKET #4711

Eingangsdatum: [Datum]
Status: Neu
Kategorie: Compliance/Zahlungen

HINWEIS (anonymisiert):
"Es werden nicht alle Lieferanten gleich behandelt. Kleine Lieferanten müssen länger auf ihr Geld warten, während größere bevorzugt werden. Das ist unfair und möglicherweise rechtswidrig."

ERSTE EINSCHÄTZUNG:
- Plausibilität: Mittel
- Dringlichkeit: Hoch (Reputationsrisiko)
- Betroffene Bereiche: Einkauf, Finanzen

NÄCHSTE SCHRITTE:
1. Zahlungshistorie der letzten 4 Wochen prüfen
2. Gespräch mit Einkaufsleitung
3. Dokumentation Freigabeprozesse
4. Rückmeldung an Hinweisgeber

VERANTWORTLICH:
Compliance Officer + HR-Leitung

FRIST:
Erste Rückmeldung binnen 5 Werktagen`
  },
  'agenda_krisenstab_v1.docx': {
    filename: 'agenda_krisenstab_v1.docx',
    title: 'Krisenstab Agenda - Tägliche Runde',
    type: 'document',
    content: `KRISENSTAB - TÄGLICHE RUNDE
Zeit: 08:30 - 09:00 Uhr
Teilnehmer: CEO, CFO, COO, HR-Leitung

AGENDA (30 Min):

1. LIQUIDITÄTSLAGE (CFO, 5 Min)
   - Kassenstand aktuell
   - Erwartete Ein-/Ausgänge heute
   - Kritische Zahlungen

2. OPERATIVE LAGE (COO, 5 Min)
   - Produktionsstatus
   - Lieferantenprobleme
   - Kundenreklamationen

3. PERSONAL/RECHT (HR, 5 Min)
   - Stimmung in der Belegschaft
   - Rechtliche Risiken
   - Compliance-Themen

4. ENTSCHEIDUNGEN (CEO, 10 Min)
   - Offene Punkte von gestern
   - Neue Entscheidungen heute
   - Owner und Deadlines

5. KOMMUNIKATION (CEO, 5 Min)
   - Interne Kommunikation
   - Externe Anfragen
   - Pressethemen

PROTOKOLL:
- Kurze Stichpunkte
- Entscheidungen mit Owner
- Verteilung an Führungskreis`
  },
  'statement_template_v1.pdf': {
    filename: 'statement_template_v1.pdf',
    title: 'Pressemitteilung Template',
    type: 'document',
    content: `PRESSEMITTEILUNG - ENTWURF

APS INFORMIERT ÜBER AKTUELLE GESCHÄFTSLAGE

APS informiert über die aktuelle Geschäftsentwicklung und die eingeleiteten Stabilisierungsmaßnahmen.

"Wir durchlaufen derzeit eine herausfordernde Phase, die durch externe Faktoren verstärkt wird", erklärt [CEO-Name], Geschäftsführer derAurion. "Gleichzeitig haben wir konkrete Maßnahmen eingeleitet, um die Situation zu stabilisieren."

EINGELEITETE MASSNAHMEN:
- Intensivierung der Zusammenarbeit mit Finanzpartnern
- Optimierung der Zahlungsströme
- Fokussierung auf Kernkunden und -produkte
- Verstärkung der Qualitätssicherung

"Unser Ziel ist es, gestärkt aus dieser Phase hervorzugehen", so [CEO-Name] weiter. "Wir setzen auf Transparenz gegenüber allen Stakeholdern und auf die bewährte Qualität unserer Produkte."

Das Unternehmen wird seine Stakeholder regelmäßig über weitere Entwicklungen informieren.

ÜBER Aurion Pumpensysteme:
[Kurzbeschreibung in der Anlage]

PRESSEKONTAKT:
[Imelda Sanches, Head of Communications, i.sanches@aurion-ps.com]`
  },
  'asset_register.pdf': {
    filename: 'asset_register.pdf',
    title: 'Anlagenverzeichnis - Sale & Leaseback Kandidaten',
    type: 'document',
    content: `ANLAGENVERZEICHNIS - S&L ANALYSE

MASCHINE 1: CNC-Bearbeitungszentrum DMG Mori
- Anschaffungswert: EUR 450.000
- Buchwert: EUR 280.000
- Marktwert (geschätzt): EUR 320.000
- S&L-Potenzial: EUR 200.000 (Abschlag 37%)

MASCHINE 2: Koordinatenmessgerät Zeiss
- Anschaffungswert: EUR 180.000
- Buchwert: EUR 95.000
- Marktwert (geschätzt): EUR 120.000
- S&L-Potenzial: EUR 85.000 (Abschlag 29%)

MASCHINE 3: Montageanlage (Sonderanfertigung)
- Anschaffungswert: EUR 220.000
- Buchwert: EUR 140.000
- Marktwert (geschätzt): EUR 160.000
- S&L-Potenzial: EUR 110.000 (Abschlag 31%)

GESAMTPOTENZIAL: EUR 395.000
LEASINGKOSTEN (5 Jahre): EUR 95.000 p.a.
EFFEKTIVE KOSTEN: 24% p.a.

RISIKEN:
- Bindung an Leasinggeber
- Höhere laufende Kosten
- Eingeschränkte Verfügungsgewalt`
  }
};