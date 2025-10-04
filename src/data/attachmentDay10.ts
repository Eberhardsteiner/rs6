// src/data/attachmentDay10.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day10Attachments: Record<string, AttachmentContent> = {
  'd10_ceo_bank_zwischenpruefung_briefing_tag10.pdf': {
  filename: 'd10_ceo_bank_zwischenpruefung_briefing_tag10.pdf',
  title: 'Briefing – Zwischenprüfung Waiver: Leitfaden & Q&A',
  type: 'document',
  content: `VERTRAULICH – CEO BRIEFING
Von: CEO
An: CFO, Controlling, Ops, Vertrieb, HR/Legal
Betreff: Vorbereitung Bank-Zwischenprüfung (T-48h)

Ziel dieses Briefings
Die Prüfung ist kein Tribunal, sondern ein Nachweis, dass wir unsere Zusagen strukturiert abarbeiten. Wir präsentieren erfüllte Punkte sichtbar, laufende Punkte mit belastbarer Planung und definierter Verantwortlichkeit.

Vorgehen in drei Schritten
1) Ampel-Status je Meilenstein (Owner, Evidenz, nächster Beleg). Keine Schönfärberei; bei Gelb/Rot liegt eine konkrete Korrekturschleife bereit.
2) Cash-Transparenz über Rolling-13-Week mit Sensitivitäten (Konzept: „Was ändert sich, wenn X nicht eintritt?“). Szenarien nicht als Drama, sondern als Steuerungslogik.
3) Operative Beweise: Lieferfähigkeit (A-Kunden), Qualitätsbahn (Prüfpfad), Lieferantenstabilisierung (P1/P2).

Q&A-Spickzettel (Auszug)
• „Warum jetzt glaubwürdig?“ – Weil wir Evidenz zeigen: erledigte Teilpakete, dokumentierte Entscheidungen, identifizierbare Verantwortliche.
• „Was, wenn Annahmen kippen?“ – Wir zeigen Stellhebel und Frühwarnindikatoren (z. B. Abweichungsschwellen).
• „Welche Alternativen existieren?“ – Geordnete Reihenfolge: interne Hebel, Partner, externer Baustein – in dieser Reihenfolge.

Begriffe kurz erklärt
• Waiver: Temporäre Aussetzung/Anpassung vertraglicher Pflichten gegen Auflagen. 
• Sensitivität: Wirkung einer Abweichung (±) auf Cash/Termine; als Bandbreite, nicht als Fixzahl.

Rollen im Termin
CEO: Rahmen, Fortschrittsnarrativ, Governance. 
CFO: Zahlen, Szenarien, Datenherkunft.
Ops/Vertrieb: Belege für Stabilisierung (kurz, konkret).
Legal/HR: Auflagen-Compliance, interne Umsetzung.

Bitte bis EOD
– 1-Seiter je Meilenstein (Owner, Evidenz, nächster Beleg)
– Abgleich mit Presse-/Kundenstatements (Widersprüche ausschließen)
– 15-Min Pre-Briefing mit Beirat anfragen
-Klären ob externe Beratung für 5k nötig ist`
},

'd10_ceo_loi_gespraechsleitfaden_tag10.pdf': {
  filename: 'd10_ceo_loi_gespraechsleitfaden_tag10.pdf',
  title: 'Gesprächsleitfaden – LOI mit Industriepartner (Kompakt)',
  type: 'document',
  content: `INTERN – CEO / Deal-Team
Ziel des Gesprächs
Partnerschaft vertiefen ohne frühzeitige Unumkehrbarkeit. Der LOI ist eine Absicht, kein Abschluss; wo nötig, Reversibilität vorsehen.

Leitlinien
1) Offen sagen, was wir können: Liefer- und Entwicklungszusammenarbeit, priorisierte Projekte, Abstimmung zu Qualität und Ramp-up.
2) Offen sagen, was wir (noch) nicht können: keine frühe Exklusivität ohne Gegenleistung, keine Preisanker ohne Datenlage.
3) Schutzmechanismen: Ausstiegsklausel bei ausbleibenden Prüfmeilensteinen; befristete Gültigkeit; „Clean Team“ für sensible Einblicke.

Struktur des Gesprächs
• Einstieg: Gemeinsames Zielbild (Stabilisierung + Zukunftsoption).
• Kern: Meilensteinlogik (Pilot → Review → Ausbau). 
• Rechtlicher Rahmen: NDA, Antitrust-Precheck, keine marktbeeinflussenden Details.
• Abschluss: Nächste Schritte, knapper Zeitpfad, schriftliche Fixpunkte.

Klären: Ist Beteiligung iHv 10 % voraussetzung für Kooperation? Wie sieht das im Kontext von Teilverkauf UPA aus? Wie sieht das in Bezug auf Einstieg Investor aus? 

Begriffe
• LOI: Letter of Intent; signalisiert ernsthafte Absicht, lässt Verhandlungsspielraum. 
• Exklusivität: Einseitige Bindung – nur mit klarer Gegenleistung, strikt befristet. 
• Clean Team: Kleines, verpflichtetes Team, das sensible Informationen neutral prüft.

Signal an Stakeholder
Stabilität durch Kooperation – ohne Vorfestlegung auf spätere Strukturentscheidungen.`
},

'd10_ceo_okr_review_agenda_tag10.pdf': {
  filename: 'd10_ceo_okr_review_agenda_tag10.pdf',
  title: 'Agenda & Moderationsleitfaden – Krisen‑OKR Review (48h)',
  type: 'document',
  content: `OKR-REVIEW (DAUER: 45–60 MIN)
Ziel: Lernen vor Rechtfertigen. Fortschritt sichtbar machen, Lücken benennen, Blocker lösen.

Agenda
1) Kurzauftakt (CEO, 5 Min): Kontext, Tonalität, Erwartung an Offenheit.
2) Objektive (10 Min): Je Objective 60 Sek Elevator – was hat sich faktisch bewegt?
3) Key Results (20 Min): Nur Abweichungen; „rote“ KRs mit Pfad zur Entschärfung (Owner, Datum, erster Beleg).
4) Blockerboard (10 Min): Drei Top-Blocker – konkrete Eskalationswege.
5) Abschluss (5 Min): Zusagen wiederholen, Review-Termin fixieren.

Moderationsnotizen
• Kein KPI-Mikado. Entscheidungen zählen, nicht Folien.
• Erfolge feiern, ohne die Problemanzeige zu schwächen.
• Follow-ups live in der Task-Liste erfassen.

Begriffe
• OKR: Objectives (Richtung), Key Results (messbare Resultate). 
• Evidence-first: Fortschrittsbelege vor Meinungen.

Artefakte
– Einseitige KR-Steckbriefe (KR, Ist, Nächster Beleg, Owner) 
– Offenes Blockerboard (sichtbar im Intranet) 
– Kurzprotokoll mit Entscheidungen`
},

'd10_ceo_pm_zwischenbilanz_entwurf_tag10.pdf': {
  filename: 'd10_ceo_pm_zwischenbilanz_entwurf_tag10.pdf',
  title: 'Entwurf Pressemitteilung – Zwischenbilanz Restrukturierung',
  type: 'document',
  content: `PRESSEMITTEILUNG – ENTWURF
Aurion Pumpen Systeme gibt Zwischenbilanz im laufenden Stabilitätsprogramm

In den vergangenen Wochen hat Aurion zentrale Maßnahmen zur Stabilisierung und Zukunftsausrichtung umgesetzt. Dazu zählen u. a. eine eng getaktete Zusammenarbeit mit Finanzierungspartnern, strukturierte Schritte zur Lieferfähigkeit und eine gestärkte Qualitätssicherung.

„Wir arbeiten mit klaren Meilensteinen und transparenter Fortschrittsmessung. Partnerschaften mit Kunden und Lieferanten bleiben die Grundlage unseres Handelns“, sagt [CEO].

Die nächsten Schritte umfassen die Fortführung des regelmäßigen Austauschs mit der Hausbank im Rahmen der vereinbarten Zwischenprüfungen, die weitere Absicherung der Lieferketten sowie die Vertiefung von Gesprächen mit potenziellen Industriepartnern. 

Hinweis
Diese Zwischenbilanz beschreibt den aktuellen Arbeitsstand. Prognosen bleiben mit Unwägbarkeiten verbunden. [Unternehmensname] informiert seine Stakeholder fortlaufend über sichtbare Fortschritte.

Pressekontakt: [Imelda Sanches, imelda.sanches@aurion-ps.com]`
},

'd10_ceo_stakeholder_roadshow_briefing_tag10.pdf': {
  filename: 'd10_ceo_stakeholder_roadshow_briefing_tag10.pdf',
  title: 'Roadshow-Briefing – Erwartungsmanagement vor Zwischenprüfung',
  type: 'document',
  content: `ROADSHOW (KURZFORM)
Ziel: Erwartungsräume ausrichten – ohne Überkommunikation.

Adressaten
• Bank: Fortschritt je Auflage, Reporting-Takt, Evidenzen. 
• Kernkunden: Lieferplan, Eskalationspfad, Qualitätsschiene.
• Lieferanten (selektiv): Stabilität & Priorisierung, kein „Blankoscheck“.

Kernbotschaften
1) Wir arbeiten entlang nachvollziehbarer Meilensteine. 
2) Liefer- und Qualitätsrisiken adressieren wir mit klaren Prüfschritten.
3) Dialog bleibt offen, Texte bleiben nüchtern.

Format
20-Min-Calls mit vorbereiteten Einseitern; Q&A bewusst eingeplant. Keine Spekulationen, keine Namen Dritter, keine inoffiziellen Zusagen.`
},

'd10_cfo_waiver_reporting_package_tag10.xlsx': {
  filename: 'd10_cfo_waiver_reporting_package_tag10.xlsx',
  title: 'Waiver-Reporting – Paketstruktur & Datenherkunft (Beschreibung)',
  type: 'spreadsheet',
  content: `WORKBOOK-BESCHREIBUNG (TEXTUALISIERT)
Tab 1 – Deckblatt: Zweck, Prüfpfad, Ansprechpartner.
Tab 2 – Milestone-Status: Ampeln, Owner, nächster Beleg (Kommentarspalte).
Tab 3 – Rolling-13-Week: Basis, Sensitivitäten, Annahmenquellen.
Tab 4 – Kunden/Lieferfähigkeit: A-Aufträge, Terminlage, Eskalationspfade.
Tab 5 – Qualität: Reklamationspfad, Prüfpläne, wirksame Gegenmaßnahmen.
Tab 6 – Compliance: Auflagen-Matrix, Evidenzen, Datumsstempel.
Tab 7 – Datenherkunft: System/Report, Verantwortliche, Aktualität.

Hinweis zur Interpretation
Forecasts sind Bandbreiten mit erklärten Stellhebeln; jede Zahl trägt eine Quelle und einen Owner. Ziel ist Nachvollziehbarkeit, nicht Perfektion.
Frage: Brauchen wir hier noch externen Support (4k)?`
},

'd10_cfo_zwischenfinanzierung_vs_beteiligung_memorandum_tag10.pdf': {
  filename: 'd10_cfo_zwischenfinanzierung_vs_beteiligung_memorandum_tag10.pdf',
  title: 'Memorandum – Zwischenfinanzierung vs. Minderheitsbeteiligung',
  type: 'document',
  content: `INTERN – CFO MEMO
Fragestellung
Überbrückung sichern, ohne langfristig die Handlungsfreiheit unnötig zu beschneiden.

Optionen in der Betrachtung (qualitativ)
• Zwischenfinanzierung (z. B. Linie/Top-up/Factoring): schnell, reversibel; Zins- und Covenantrisiko; Reporting-Last steigt (400k, Zinsen 9 %). 
• Minderheitsbeteiligung (kleiner Einstieg): Signalwirkung, Eigenkapitalpuffer; Mitspracherechte, Prozesszeit, Vertraulichkeit (100k sofoert, 5 % Beteiligung max.)
• Kurzfristige Aufnahme von 100k gegen 15 % Zinsen, kurzfristig, 3 Monate fix.
• Keine Aktion: Risiko von Folgeschäden (Lieferstops, Vertrauensverlust).

Bewertungsrahmen
– Zeit bis Wirkung (Kurzfristigkeit)  
– Eingriff in Governance (Einfluss)  
– Nebenkosten (Transaktionsaufwand, Reporting)  
– Außenwirkung (Kunden/Banken)  

Hinweis
Wir vermeiden „Entweder‑oder“-Rhetorik: Ein sauberer Bridge‑Schritt kann Zeit kaufen, um den Partnerpfad professionell auszuhandeln.`
},

'd10_cfo_ap_zahlungsplan_priorisierung_playbook_tag10.pdf': {
  filename: 'd10_cfo_ap_zahlungsplan_priorisierung_playbook_tag10.pdf',
  title: 'Playbook – Lieferantenzahlungen: Priorisierung & Kommunikation',
  type: 'document',
  content: `AP-STEUERUNG – KURZANLEITUNG
Ziel
Lieferfähigkeit sichern, ohne das Vertrauensverhältnis unnötig zu beschädigen.
Betrifft alle Lieferanten, außer bei P1 (gesonderte Beurteilung von P1)

Schritte
1) Segmentierung:  P2 stabil; P3 optional/verschiebbar, P3x: optional.
2) Kriterien: Kritikalität, Deckungsbeitrag, vertragliche Pönalen, Abhängigkeiten.
3) Kommunikationsleitfaden: Ehrlich, knapp, mit neuem Zahlungsplan und nächstem Check-in.
4) Dokumentation: Jede Zusage schriftlich; Versionierung; Abgleich mit Bankreporting.
5) Eskalation: Kritische Fälle früh an CEO/COO – nicht aussitzen.

Begriffe
• Pönale: Vertragsstrafen bei Nichterfüllung; präventiv adressieren. 
• „Level Play“: Gleichbehandlung, aber nach transparenten Kriterien. 

Zielbild
Planbare, kleine Schritte schlagen große Versprechen.`
},

'd10_cfo_controlling_okr_update_brief_tag10.pdf': {
  filename: 'd10_cfo_controlling_okr_update_brief_tag10.pdf',
  title: 'Controlling-Brief – Update-Takt & Datenqualität für OKR',
  type: 'document',
  content: `BRIEF AN OKR-OWNER
Warum dieses Update?
Bank- und Teamvertrauen hängen an Konsistenz. Lieber wenige Kennzahlen, die belastbar sind, als breite, wechselnde Sets.

Was wird geliefert?
– Tages-/Wochen-Snapshot (knapp, unverändert im Layout)  
– Kurzkommentar bei Abweichungen („Was ist passiert? Was tun wir?“)  
– Hinweis auf Datenherkunft (System/Person)

Systemausbau für 5k liefert bessere Daten (kurzfristig möglich) oder externe Validierung für 2k?

Leitplanken
– Keine neuen KPIs ohne Vorwarnung  
– Abweichungsschwelle definieren (ab wann berichten wir gesondert?)  
– Einseitiges Format, max. 5 Min Lesezeit

Ergebnis
Weniger Nachfragen, mehr Zeit für Umsetzung.`
},

'd10_cfo_bridge_liquiditaet_allokation_note_tag10.pdf': {
  filename: 'd10_cfo_bridge_liquiditaet_allokation_note_tag10.pdf',
  title: 'Notiz – Bridge-Liquidität: Allokationsprinzip & Kommunikation',
  type: 'document',
  content: `KURZNOTIZ – CFO
Ziel
Die Brücke dorthin legen, wo sie die größte Stabilisierung bewirkt – sichtbar, nachvollziehbar, revidierbar.

Allokationsprinzip
1) Produktionskritisch vor kosmetisch.  
2) Verlässlichkeit vor Maximierung.  
3) Kleine Belege früh (Quick Wins), Großmaßnahmen nachgezogenen Prüfungen.

Kommunikation
– Intern: Wer warum wann bedient wurde (Transparenz verhindert Flurfunk).  
– Extern: Lieferanten erhalten eine klare Roadmap; Bank sieht den Allokationsschlüssel im Reporting.

Review
Wöchentlicher Check, ob die Verteilung noch zur Realität passt.`
},

'd10_ops_produktionsplan_kritische_auftraege_tag10.pdf': {
  filename: 'd10_ops_produktionsplan_kritische_auftraege_tag10.pdf',
  title: 'Produktionsmemo – Taktung für kritische A‑Aufträge',
  type: 'document',
  content: `ZIEL
Termintreue sichern, ohne das System zu überdrehen.

Planungslogik
– Sequenzierung nach zugesagten Kundenterminen und Materialverfügbarkeit.  
– „Störungsarme Fenster“ nutzen (Wartung, Schichtwechsel) – keine Heldenaktionen.  
– Engpassmaschinen mit Überlappung fahren; Puffer klein, aber real.

Koordination
– Täglicher 15‑Min Shopfloor‑Huddle (QS/Logistik dabei).  
– Eskalationsampel (Grün: im Takt, Gelb: drohende Abweichung, Rot: Entscheider rufen).

Hinweis
Sonderschichten sind Werkzeug, kein Dauerzustand. Jede Zusatzschicht erzeugt Folgelasten (Qualität, Instandhaltung, Menschen). (Nettoergebnis Sonderschicht 8k)`
},

'd10_ops_qualitaetsinitiative_kurzprogramm_tag10.pdf': {
  filename: 'd10_ops_qualitaetsinitiative_kurzprogramm_tag10.pdf',
  title: 'Qualitätsinitiative – Kurzprogramm „Stop & Stabilize“',
  type: 'document',
  content: `KURZPROGRAMM (14 TAGE)
1) Sofortmaßnahme: Störquellen eingrenzen (Containment), Prüfpfad schärfen (temporär höherer Umfang).
2) Ursachenarbeit: Top‑Fehlermuster, Machbarkeitscheck für schnelle Abstellmaßnahmen.
3) Kundenkommunikation: Faktische Updates, keine Floskeln; 8D‑Verlauf transparent.
4) Wissen sichern: Was funktioniert hat, am Ende standardisieren (Arbeitsanweisung).
Kosten: Kurzprogramm QS: 5k, umfassendes Programm 15k.
Begriffe
• Containment: Vorläufige Absicherung, um fehlerhafte Teile vom Kunden fernzuhalten. 
• 8D: Strukturiertes Problemlösungsverfahren – Disziplin statt Bauchgefühl.

Ergebnis
Weniger Geräusch, mehr belegte Fortschritte.`
},

'd10_ops_bestandsbewertung_aktionsmemo_tag10.pdf': {
  filename: 'd10_ops_bestandsbewertung_aktionsmemo_tag10.pdf',
  title: 'Aktionsmemo – Bestände selektiv bewerten & bewegen',
  type: 'document',
  content: `ZWECK
Bewusst entscheiden, was Wert beisteuert – und was nur Platz kostet - Abwertung gem. § 253 Abs. 4 HGB.

Vorgehensweise
– C‑Teile mit geringer Drehung identifizieren und neu bewerten (6k Abwertung nötig: realistische Sicht statt Wunschbilanz).  
– Alternative: Bündel, die Markt finden, aktiv abverkaufen – ohne die Marke zu beschädigen (Abwertung 6k, Cash 20k, Kanäle wählen).  
– Alternative: Technische Prüfung: Was lässt sich sinnvoll als B‑Ware einsetzen, ohne Kundenvertrauen zu riskieren (Cash 25k, Profit: 15k, aber REPUTATIONSRISIKO) ?

Kommunikation
– Innen: Keine Überraschungen in den Zahlen; Konsistenz mit Finance.  
– Außen: Keine lauten Abverkaufsaktionen, die Kunden verunsichern.`
},

'd10_ops_lieferanten_review_briefing_tag10.pdf': {
  filename: 'd10_ops_lieferanten_review_briefing_tag10.pdf',
  title: 'Briefing – Lieferantenreview & Partnerschaftspflege',
  type: 'document',
  content: `ZIEL
Stabile Lieferketten durch klare Kriterien statt Bauchgefühl.

Schritte
1) Segmentieren (A: Engpass/Kern, B: stabil, C: opportun).  
2) Für A‑Partner: Beziehungspflege, regelmäßige Lagebilder, klare Eskalationswege.  
3) Für B/C: Review der Konditionen und Kapazitäten; „Erweitern wo sinnvoll“, nicht „Streichen um jeden Preis“.
4) Investition in einer bessere Partnerschaft, könnte Lieferfähigkeit sichern, kostet aber 5k.
Prinzipien
– Konstanz zählt: Wiederholbare Zusagen sind mehr wert als einmalige Wunder.  
– Ein Partner weniger kann teurer sein als zwei, wenn der eine kippt.`
},

'd10_ops_serienfreigabe_pruefplan_tag10.pdf': {
  filename: 'd10_ops_serienfreigabe_pruefplan_tag10.pdf',
  title: 'Serienfreigabe – Prüfpfad & Ramp‑up Leitfaden',
  type: 'document',
  content: `SERIENFREIGABE-KOMPASS
Prüfpfad
– Start mit erhöhter Prüftiefe auf kritischen Merkmalen, zeitlich befristet (Kosten 8k, oder mit geringerer Prüftiefe für 5k).  
– Übergang auf AQL‑Plan sobald Stabilität belegt ist.  
– Dokumentation in einfachen, wiederholbaren Schritten.

Ramp‑up
– Stückzahl schrittweise erhöhen, erst nach stabilen Zyklen.  
– Kundenfreigaben eng begleiten (kurze Feedbackschleifen).

Ziel
Tempo ja – aber nicht um den Preis erneuter Reklamationen.`
},

'd10_hrlegal_team_memo_zwischenpruefung_tag10.pdf': {
  filename: 'd10_hrlegal_team_memo_zwischenpruefung_tag10.pdf',
  title: 'Team‑Info (E‑Mail‑Entwurf) – Zwischenprüfung',
  type: 'email',
  content: `Von: HR/Legal
An: Alle Kolleginnen und Kollegen
Betreff: Zwischenprüfung – was bedeutet das für uns intern?

Liebe Kolleginnen und Kollegen,
in den kommenden zwei Tagen findet eine turnusmäßige Zwischenprüfung unserer Maßnahmen statt. Das Format dient dazu, Fortschritt nachvollziehbar zu machen und Fragen sauber zu dokumentieren.

Was heißt das für den Alltag?
– Unsere Schichten und Abläufe laufen weiter.
– Einige Kolleginnen/Kollegen liefern Unterlagen; dafür bitten wir um Verständnis.
– Sollten Rückfragen zu Prozessen auftauchen, koordinieren HR/Legal die Antworten.

Warum sprechen wir darüber?
Transparenz senkt die Gerüchtequote. Wir versprechen keine Wunder – wir erklären, was belegt ist, und sagen offen, woran wir arbeiten.

An wen kann ich mich wenden?
HR‑Sprechstunde wie gewohnt; zusätzlich steht ein kurzer FAQ‑Eintrag im Intranet bereit.

Danke für Ihren Beitrag – sachlich bleiben, gemeinsam weiterarbeiten.`
},

'd10_hrlegal_compliance_check_interim_checkliste_tag10.pdf': {
  filename: 'd10_hrlegal_compliance_check_interim_checkliste_tag10.pdf',
  title: 'Interim‑Checkliste – Auflagen & Nachweispfade',
  type: 'document',
  content: `CHECKLISTE (INTERIM)
Ziel
Nachweisbar zeigen, dass wir die Auflagen verstanden haben und umsetzen.

Bausteine
□ Verantwortliche je Auflage benannt (mit Stellvertretung)
□ Dokumente mit Versionsstand und Datum (keine lose Ablage)
□ Schulungsstatus der betroffenen Bereiche (Anwesenheit, Verständnis)
□ Meldewege bei Abweichungen (wen rufe ich an?)
□ Datenschutz: Nur notwendige personenbezogene Daten, geschwärzte Versionen bei externen Einblicken
□ Protokolle: Kurz, aber entscheidungsfähig

Hinweis
Externe Unterstützung würde 5k kosten. Sinnvoll?.`
},

'd10_hrlegal_kurzarbeit_anpassung_memo_tag10.pdf': {
  filename: 'd10_hrlegal_kurzarbeit_anpassung_memo_tag10.pdf',
  title: 'Memo – Kurzarbeit: Feinjustierung & Fairnesskriterien',
  type: 'document',
  content: `INTERN – HR/Legal
Anlass
Rückmeldungen aus Bereichen deuten auf unterschiedliche Lasten hin. Ziel ist ein faires, rechtssicheres Modell, das die operative Lage abbildet.

Leitgedanken
– Gleichbehandlung bedeutet nicht Gleichmacherei: Bereiche mit Engpässen werden anders gesteuert als Bereiche in Ruhe.  
– Rotationsmodelle sind möglich, wenn Qualifikation und Arbeitsschutz passen.  
– Kommunikation über Führungskräfte und BR – nicht per Gerücht.

Begriffe
• Kurzarbeit: Vorübergehende Reduzierung der Arbeitszeit mit teilweisem Lohnausgleich.  
• Interessenausgleich/Sozialplan: Nur bei strukturellen Änderungen – aktuell geht es um temporäre Feinsteuerung.

Nächste Schritte
1) Betroffenheitsanalyse aktualisieren  
2) Anpassungsvorschlag mit BR abstimmen  
3) Informationspaket für Teams bereitstellen
4) Wenn nötig: Externe Ressourcen zuschalten für kurfristig 13k`
},

'd10_hrlegal_waiver_schulung_agenda_tag10.pdf': {
  filename: 'd10_hrlegal_waiver_schulung_agenda_tag10.pdf',
  title: 'Agenda – Kompakt‑Schulung Waiver‑Pflichten',
  type: 'document',
  content: `KOMPAKT-SCHULUNG (60 MIN)
Zielgruppe
Führungskräfte und Schlüsselrollen in den betroffenen Prozessen.

Inhalt
1) Was ist ein Waiver? – Kurzüberblick, warum Nachweise wichtig sind.  
2) Was wird geprüft? – Beispiele aus Alltag: Dokumentation, Freigaben, Meldewege.  
3) Was ist Tabu? – Improvisierte Zusagen, inkonsistente Zahlen, Umgehung von Freigaben.  
4) Wie dokumentieren wir richtig? – Kurzleitfaden, Vorlagen, Ansprechpartner.

Materialien
– Einseiter je Bereich  
– Q&A‑Katalog  
– Checkliste „Do&Don’t“

Ergebnis
Weniger Unsicherheit, weniger Fehler – mehr Souveränität.`
},

'd10_hrlegal_loi_nda_antitrust_precheck_tag10.pdf': {
  filename: 'd10_hrlegal_loi_nda_antitrust_precheck_tag10.pdf',
  title: 'Notiz – LOI/NDA & Kartellrecht: Pre‑Check',
  type: 'document',
  content: `INTERN – LEGAL
Kontext
Vor Unterzeichnung des LOI stellen wir sicher, dass Vertraulichkeit und Wettbewerbsrecht eingehalten werden.

Prüfpunkte
– NDA: Klarer Zweck, definierter Personenkreis, Rückgabe-/Löschungspflichten.  
– Exklusivität: Wenn überhaupt, dann strikt befristet und konditioniert; keine faktische Marktabstimmung.  
– IP/Know‑how: Nutzung nur für den Prüfzweck; keine Rechteübertragung vor Vertrag.  
– Kartellrecht: Keine preis- oder marktbezogenen Abstimmungen; Clean‑Team‑Setup für sensible Daten.
Kosten: Kurzcheck 3k, umfassender Check 8k.

Ergebnis
Schneller, sauberer Prozess – mit geringer Angriffsfläche.`
}

};