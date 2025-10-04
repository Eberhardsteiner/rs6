// src/data/attachmentDay13.ts
export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

export const day13Attachments: Record<string, AttachmentContent> = {
  // ------------ CEO ------------
  'message_house_tag13.pptx': {
    filename: 'message_house_tag13.pptx',
    title: 'Message House – Finale Woche (Tag 13 → Tag 14)',
    type: 'presentation',
    content: `SLIDE 1 – TITEL
Abschlusskommunikation Richtung Tag 14 – Konsistentes Message House (CEO/CFO)

SLIDE 2 – KERNBOTSCHAFTEN (Übersicht)
• Stabilisierung wirkt: Payroll-Deckung auch künftig & Lieferfähigkeit gesichert
• Qualität im Griff: Temporäre 100%-Prüfungen / AQL-Plan für A-Linien
• Bank-Dialog: Waiver-Meilensteine on track, Reporting-Takt fixiert

SLIDE 3 – FÜR BANK
• Fakten: 13-Week-Cash, Covenant-Sensitivitäten, Fee Letter Redlines
• Zusagen: Weekly KPI, Trigger-Katalog (Liquidity Ratio, Payroll-Deckung)
• Tonalität: Realistisch, proaktiv, keine Überraschungen

SLIDE 4 – FÜR KUNDEN
• Liefertreue gesichert; Engpasslinien mit Containment (48h)
• Eskalationspfad: KAM → Vertriebsleitung → COO → CEO
• Transparenz: Wochenreport Defektrate/Nacharbeit, Termin-Commitments

SLIDE 5 – FÜR MITARBEITENDE
• Dank & Fokusliste für 72h
• Klare Prioritäten: A-Aufträge, QS-Containment, Logistik-Bündelung mit Express-Ausnahmen
• Gesundheit & Recht: Arbeitszeitgrenzen einhalten, Führungskräfte als Puffer

SLIDE 6 – Q&A & RISIKOSPRACHREGELUNG
• Bei LOI-Gerüchten: „Sondierungen ohne Vorfestlegung; Priorität Operative/Payroll“
• Zur Bank: „Trigger klar, Daten belastbar; wir liefern“
• Zur Qualität: „Fakten statt Anekdoten – Trend zeigt Verbesserung“

SLIDE 7 – NÄCHSTE SCHRITTE
• Heute: All-Hands, Key Account Briefs, Bank-Pre-Read
• Morgen: Payroll-Confirmation & Kunden-Statuscall
• Reporting: Daily Snapshot + Weekly Deep Dive`
  },
  'd13_ceo_allhands_script_tag13.pdf': {
    filename: 'd13_ceo_allhands_script_tag13.pdf',
    title: 'All-Hands-Skript: Finale 72 Stunden',
    type: 'document',
    content: `AN: Alle Mitarbeiterinnen und Mitarbeiter
VON: Geschäftsführung
BETREFF: Drei Tage, ein Ziel: Stabil bleiben – liefern – fair kommunizieren

1) DANK UND LAGE
Wir sind im Endspurt vor Tag 14 (Payroll). Die Bank-Zwischenziele wurden mehrheitlich erreicht. Qualität und Liefertreue verbessern sich sichtbar. Danke für Disziplin und Haltung.

2) PRIORITÄTEN (72h)
• A-Kunden termingerecht bedienen
• QS-Containment auf A-Linien (100% über 48h) – dann AQL-Plan
• Logistik bündeln, Express nur bei Pönale-/A-Kunden-Risiko
• Keine Überstunden über gesetzliche Grenzen; Führungskräfte achten aktiv darauf

3) TRANSPARENZ & GERÜCHTE
• LOI/Partnerschaft: Sondierungen laufen, keine Vorfestlegung. Wir reden erst, wenn es substanziell ist.
• Social Media: Keine internen Details posten. Offizielle Infos kommen über Intranet & Führungsrunde.

4) GESUNDHEIT UND RECHT
• Pausen einhalten. Keine 10+ Stunden-Schichten. HR/Legal unterstützt bei Planung.
• Sicherheit hat Vorrang. Kurzfristiger Output darf keine Unfälle provozieren.

5) AUSBLICK
• Kunden-Update mit Faktenblatt (Qualität/Lieferfähigkeit)
• Wir bleiben pragmatisch und respektvoll – das ist unsere Stärke.`
  },

  'd13_ceo_loi_internes_expectation_memo_tag13.pdf': {
    filename: 'd13_ceo_loi_internes_expectation_memo_tag13.pdf',
    title: 'Internes Erwartungsmanagement zum LOI/Partnerschaft',
    type: 'document',
    content: `ZWECK: Erwartungshaltung zum möglichen LOI ausbalancieren, ohne Vertraulichkeit zu verletzen.

KERNPUNKTE
• LOI ist kein Kaufvertrag: Er strukturiert Gespräche, gibt Zeitfenster und Prüfbereiche vor (Commercial/Legal/Operations).
• Reversibilität sichern: Ausstiegsklauseln, Nicht-Exklusivität, klare Meilensteine, keine Preisanker.
• Kartellrecht/Antitrust: Vorab-Check (No-Gun-Jumping); keine operativen Abstimmungen über wettbewerbssensible Punkte.
• Kommunikation: Nur vordefinierte Sprecher (CEO/CFO/Legal). Interne Q&A ist Leitlinie; externe Aussagen nur abgestimmt.

ERWARTUNGEN AN FÜHRUNGSKRÄFTE
• Fragen aufnehmen, nicht spekulieren.
• Teamfokus auf Lieferfähigkeit und Qualität; LOI-Arbeit streamlinet, nicht bremst.
• Risiken offen spiegeln (z. B. Ressourcenlast), aber Chancen nicht überhöhen.

TIMELINE (INDIKATIV)
• T0: NDA/Precheck
• T+1–2 Wochen: LOI-Feinzug
• T+3–6 Wochen: Indikative Prüfungen
• T+6–10 Wochen: Bindende Angebote/Alternativen`
  },

  'd13_ceo_advisor_light_mandate_tag13.docx': {
    filename: 'd13_ceo_advisor_light_mandate_tag13.docx',
    title: 'Mandat „Light-Touch“ – Externe Begleitung Finale',
    type: 'document',
    content: `GEGENSTAND
• Review der Zahlenteile (Forecast/Sensitivität) und der Kommunikationsmaterialien (Message House, Bank-Pre-Read)
• Moderation ausgewählter Term Sheets/Redlines (Fee Letter, Informationsrechte)
• Sparringsrolle für CEO/CFO (2x 90 Min Sessions)

LIEFERGEGENSTÄNDE
• Kurzmemorandum (max. 4 Seiten) mit Findings/Empfehlungen
• Redline-Liste zu Fee Letter/Triggern
• Feedback-Note für Stakeholder-Kommunikation

HONORAR & VERTRAULICHKEIT
• Pauschal 9.000 EUR, NDA bindend, Zugriff nur auf abgestimmte Datenräume
• Kein Presse-/Investor-Contact, keine Entscheidungsrechte
Vollmandat: 18.000 EUR, Light-Mandat: 6.000 EUR.

NUTZEN
• Vertrauenssignal an Bank/Beirat
• Entlastung im Endspurt ohne Overhead
• „Zweitmeinung“ auf kritischen Pfaden`
  },

  'risikomatrix_tag13.xlsx': {
    filename: 'risikomatrix_tag13.xlsx',
    title: 'Risikomatrix – Finale Woche (Owner/Termin/Mitigation)',
    type: 'spreadsheet',
    content: `RISIKO | EINTRITT | IMPACT | OWNER | DEADLINE | MITIGATION
Payroll-Freigabe verzögert | Mittel | Hoch | CFO | Tag 14, 08:00 | Pre-Read mit Bank + Backup-Freigabeprozess
A-Kunden-Pönalen | Niedrig-Mittel | Hoch | COO | Laufend | 100%-Prüfung A-Linien (48h), Express-Slots
Lieferanten-Stop | Niedrig | Hoch | CFO/COO | Laufend | Fixslots + Anderkonto-Option + DB/Kritikalität-Matrix
Gerüchte LOI | Mittel | Mittel | CEO/Legal | Laufend | Q&A, Pressestatement-Rahmen, einheitliche Sprecher
Überstunden/ArbZG | Mittel | Mittel | HR/Legal | Täglich | Schichtumplanung, Limits überwachen, Arzt/Ergo`
  },
  'd13_ceo_risiko_register_briefing_note_tag13.pdf': {
    filename: 'd13_ceo_risiko_register_briefing_note_tag13.pdf',
    title: 'Briefing-Note zum Risikoregister – Freigabelogik',
    type: 'document',
    content: `ZIEL
Die Bank erhält eine kondensierte Sicht auf Top-5-Risiken mit Owner, Termin und belastbarer Mitigation. Keine Alarmbilder, sondern Steuerungsbelege.

PRINZIPIEN
• Ein Risiko = ein Verantwortlicher = ein Termin
• Mitigationen sind messbar (z. B. „100%-Prüfung 48h“ statt „Qualität verbessern“)
• Keine Sammelbegriffe ohne Datenanhang

FREIGABE-EMPFEHLUNG
• Variante A (extern): Vollständige Tabelle + 1-seitige Erläuterung (empfohlen)
• Variante B (intern): Nur Executive Summary; Bank auf Nachfrage
• Kontext: Waiver-Logik, Fee Letter-Trigger, Reporting-Takt (Weekly KPI, Daily Snapshot) verweisen`
  },

  'd13_ceo_upa_sync_plan_tag13.pdf': {
    filename: 'd13_ceo_upa_sync_plan_tag13.pdf',
    title: 'Synchronisationsplan – United Pumps of America (UPA)',
    type: 'document',
    content: `ZWECK
Vorbereitung der synchronen Ansprache von Bank, Beirat, Key Accounts und Lieferanten zum Teilverkauf UPA.

ABLAUF (24–72h)
• H-24: Bank/Beirat Pre-Read (Dossier-Finanzteil, Carve-out-Readiness)
• H-12: Key Account Brief (Lieferfähigkeit, Kontinuität, Ansprechpartner)
• H-8: Lieferanten-Call (Slots/Bedarfe; keine Mengenüberraschungen)
• H-0: Interne All-Hands (Fakten, keine Spekulation)

KERNAUSSAGEN
• Operative Kontinuität: Carve-out ohne Lieferbruch (IT/Logistik-Entkopplung mit Stufenplan)
• Qualität: PPAP/Bemusterungen parallel abgesichert
• Datenschutz: Datenraum HR nur redigiert, §613a-Prozess sauber vorbereitet

ESKALATION
• Single Point of Contact pro Stakeholder-Gruppe
• Reaktionsfenster: 2h (A-Kunden), 4h (Bank/Beirat), 24h (Sonstige)

Professionelle Vorbereitung 10.000 EUR.`
  },

  // ------------ CFO ------------
  'd13_cfo_financial_dossier_upa_tag13.pdf': {
    filename: 'd13_cfo_financial_dossier_upa_tag13.pdf',
    title: 'Finanzdossier – United Pumps of America (UPA) – Kurzfassung',
    type: 'document',
    content: `INHALT
1) Historie 2022–2024: Umsatz, DB1, EBITDA (bericht./normalisiert)
2) Forecast 2025–2027: Annahmen, Sensitivitäten (Volumen/Preis/Mix)
3) Covenant-Analyse: Effekte auf Net Debt/EBITDA, DSCR
4) Cash-Impact Carve-out: Einmal-/laufende Effekte, Transaktionskosten
5) Brücke „Alt → Ziel“: Maßnahmenhebel (Working Capital, Opex, Capex)

KERNZAHLEN (Dummy/BEISPIELWERTE)
• Umsatz 2024: 12,4 Mio. EUR | EBITDA (norm.): 1,4 Mio. EUR
• Carve-out-Kosten einmalig: 0,6–0,9 Mio. EUR (IT/Logistik/Legal)
• Post-Carve-out FCF 2026: 1,1–1,4 Mio. EUR (Basis-Szenario)

BANK-RELEVANZ
• Covenant-Verläufe: Downside-Sensitivität zeigt Mindestpuffer
• Informationsrechte: Weekly KPI + Trigger bei Liquidity Ratio/Payroll-Deckung
• „No Surprise“-Commitment: Reporting-Kalender beigefügt

Vollständiges Dossier: 10.000 EUR, Red-Flag-Report: 5.000 EUR, Externe Beratung: 15.000 EUR.
`
  },
  'd13_cfo_valuation_models_summary_tag13.xlsx': {
    filename: 'd13_cfo_valuation_models_summary_tag13.xlsx',
    title: 'Bewertungsübersicht – DCF & Multiples (3 Szenarien)',
    type: 'spreadsheet',
    content: `TAB 1 – MULTIPLES
Peer Median EV/EBITDA: 6,5x | Spannweite: 5,2–8,1x
Aurion (norm. EBITDA 2025E): 4,5–6,2 Mio. → EV-Band: 29–40 Mio.

TAB 2 – DCF BASIS
WACC: 9,2% | Terminal Growth: 1,5% | EV: 31,8 Mio.

TAB 3 – DCF DOWNSIDE
WACC: 9,5% | Terminal Growth: 1,0% | EV: 26,4 Mio.

TAB 4 – DCF UPSIDE
WACC: 8,9% | Terminal Growth: 2,0% | EV: 37,1 Mio.

Mögliche Unterstützung: Bewertungsmodelle gegenprüfen 18k, Gesamtmandat 80k.
ANHANG – ANNAHMEN
• Umsatzpfad, Margenentwicklung, Capex-Quote, Working-Capital-Freigabe`
  },
  'd13_cfo_wc_quickwins_tasklist_tag13.xlsx': {
    filename: 'd13_cfo_wc_quickwins_tasklist_tag13.xlsx',
    title: 'Working-Capital Quick Wins – Tasks & Owner',
    type: 'spreadsheet',
    content: `TASK | OWNER | DEADLINE | IMPACT | STATUS
Top-10 AR Reminder (ohne Eskalation) | Treasury | +24h | +15k Cash | Offen
Skonto agressiv | Sales | +48h | +30k-40k Cash/-4,5k P&L | In Prüfung
Lieferantentermine fixieren (DB/Kritikalität) | COO | +24h | Stabilität | Laufend
Hartes Beitreiben | Treasury | +72h | +40-50k Cash | In Prüfung`
  },
  'final_view_pack_tag14.pptx': {
    filename: 'final_view_pack_tag14.pptx',
    title: 'Final View Pack – Bank Pre-Read (Tag 14)',
    type: 'presentation',
    content: `AGENDA
1) Executive Summary – Woche 2 Fazit
2) Bridge „IST → Ziel“ inkl. Sensitivitäten
3) Meilenstein-Tracking (Ampel, Owner, Datum)
4) Liquiditätslage (13-Week), Payroll-Deckung 
5) Informationsrechte/Trigger – Vorschlag
6) Q&A

KURZBOTSCHAFT
„Wir liefern belastbare Daten, klar zuordenbare Verantwortungen und transparente Trigger. Keine Überraschungen.“`
  },
  'd13_cfo_review_pack_exec_summary_tag13.pdf': {
    filename: 'd13_cfo_review_pack_exec_summary_tag13.pdf',
    title: 'Executive Summary – Review-Pack „Finale Sicht“',
    type: 'document',
    content: `• Fortschritt: 4/5 Waiver-Meilensteine grün, 1 gelb (Lieferanten-Standstill)
• Datenqualität: Forecasts plausibilisiert, Sensitivitäten dokumentiert
• Risiken: Payroll-Freigabekette  (Bank verlang klare Planung), A-Kunden-Pönalen, Lieferanten-Slots
• Gegenmaßnahmen: Daily Snapshot, 48h-Containment, Fixslots + Anderkonto
• Bitte an die Bank: Moderate Fee + präzise Trigger statt breiter Sonderrechte`
  },
  'd13_cfo_feeletter_redlines_tag13.docx': {
    filename: 'd13_cfo_feeletter_redlines_tag13.docx',
    title: 'Fee Letter – Redlines & Trigger-Katalog (Vorschlag)',
    type: 'document',
    content: `REDLINES (AUSZUG)
• Fee: 6k (statt 10k), zahlbar in 2 Tranchen (Tag 14 / Tag 30)
• Trigger nur auf: Liquidity Ratio, BankTrust-Index (intern definierte KPI-Basis), Payroll-Deckung
• Sonderrechte ausschließlich bei dokumentiertem Covenant-Verstoß, nicht bei Gerüchten

REPORTING-TAKT
• Weekly KPI (Mo), Daily Snapshot (Cash/KPI intern)

GOVERNANCE
• Eskalationspfad: CFO → CEO → Beirat → Bank (klar terminierte Slots)`
  },

  // ------------ OPS ------------
  'd13_ops_sonderschicht_freigabe_tag13.pdf': {
    filename: 'd13_ops_sonderschicht_freigabe_tag13.pdf',
    title: 'Sonderschicht-Freigabe – A-Kunden (48h)',
    type: 'document',
    content: `ZWECK
Gezielte Sonderschicht für zwei A-Kunden, um Liefertermine sicherzustellen und Pönalen zu vermeiden.

UMFANG
• Linien: P1, A1, A3 (Kritikalität hoch)
• Zeitraum: 48 Stunden, max. 2x 4h Zusatz pro Linie
• QS: 100%-Prüfung während Zusatzschicht
• HSE: Arbeitszeitgrenzen streng einhalten (keine >10h/Tag)

FREIGABE
• COO, HR/Legal, Betriebsrat informiert
• Budgetrahmen: 8.000 EUR (inkl. Zuschläge/Expressreserven), regelmäßiger Express bis 18k bei Freigabe CFO+ CEO`
  },
  'd13_ops_quality_trendreport_tag13.xlsx': {
    filename: 'd13_ops_quality_trendreport_tag13.xlsx',
    title: 'Qualitäts-Trendreport – Woche 2 (PPM/Erstdurchlauf/Nacharbeit)',
    type: 'spreadsheet',
    content: `KENNZAHL | ZIEL | WOCHE-2 IST | VORWOCHE | TREND
PPM gesamt | <100 | 92 | 115 | ↘
Erstdurchlaufquote | >95% | 96,3% | 94,1% | ↗
Nacharbeit (Std.) | <40 | 31 | 54 | ↘
A-Linien Reklamationen | 0 | 0 | 2 | ↘

ANMERKUNG
A-Linien unter 48h-Containment (100% Prüfungen), danach AQL-Plan (stufenweise).`
  },
  'd13_ops_backup_supplier_ppap_plan_tag13.pdf': {
    filename: 'd13_ops_backup_supplier_ppap_plan_tag13.pdf',
    title: 'PPAP-Plan – Backup-Lieferant (Level 3, verkürzt)',
    type: 'document',
    content: `DOKUMENTATION
• DFMEA/PFMEA – Kurzreview, Fokus auf kritische Merkmale
• Control Plan – Prüfplan mit Messsystemanalyse-Terminen
• Erstmuster: 30 Teile, CPK-Ziele >1,67 für kritische Merkmale
• Run@Rate: 2h, 300 Stk/h, Ausschuss <2%
• Kundenfreigabe: Datenpaket + Vor-Ort-/Remote-Audit

Qualifikation Backup-Lieferaten 6k oder Premium-Preise annehmen (7k)


ZEITPLAN
• Tag 13–14: Doku-Check + Erstmuster
• Tag 15: Run@Rate
• Tag 16: Bedingte Freigabe mit Containment`
  },
  'd13_ops_logistik_buendel_policy_tag13.pdf': {
    filename: 'd13_ops_logistik_buendel_policy_tag13.pdf',
    title: 'Logistik-Policy – Bündeln mit Express-Ausnahmen',
    type: 'document',
    content: `GRUNDSATZ
Bündelung reduziert Kosten, ohne A-Kunden zu gefährden.

Express-Bündelung: Einsparung 2k
Alles Bündelung: Einsparung 5k
Alles flexibel halten: Kosten 6k


REGELN
• Standard: Bündelversand 1x/Tag
• Ausnahmen: Express für A-Kunden bei Pönale-/Linienstopp-Risiko
• Entscheidungsbaum: KAM → Logistik → COO (SLAs: 2h/4h)
• Monitoring: Tagesreport Frachtkosten / Expressquote`
  },
 

  // ------------ HR/LEGAL ------------
  
  'd13_hrlegal_dataroom_privacy_protocol_tag13.pdf': {
    filename: 'd13_hrlegal_dataroom_privacy_protocol_tag13.pdf',
    title: 'Datenraum & Datenschutz – Verfahrensanweisung (HR/Legal)',
    type: 'document',
    content: `ZIEL
Transparenz in der DD, ohne Persönlichkeitsrechte zu verletzen.

PRINZIPIEN
• Datenminimierung: HR-Daten nur redigiert (Anonymisierung, Pseudonymisierung)
• Need-to-know: Access-Listen, Protokollierung aller Zugriffe
• Separate Schicht: besonders sensible Daten (Gesundheit, Religion) ausgeschlossen
• NDA-Erweiterung: Zweckbindung, Aufbewahrungs-/Löschfristen

PROZESS
1) Upload-Check durch Legal (Vier-Augen)
2) Freigabe über HR/Legal
3) Monitoring & Audit-Trail
4) Nach Abschluss: Löschbestätigung des Erwerbers

Beratung 12k extern sinnvoll?
`
  },
  'd13_hrlegal_conflict_mediation_brief_tag13.pdf': {
    filename: 'd13_hrlegal_conflict_mediation_brief_tag13.pdf',
    title: 'Konfliktmoderation CFO/OPS – Kurzbrief',
    type: 'document',
    content: `ZIEL
Handlungsfähigkeit vor Tag 14 sichern, Eskalation vermeiden.

VORGEHEN (90 MIN)
• Phase 1 (15’): Faktenklärung, kein Schuldnarrativ
• Phase 2 (45’): Engpassdefinition, 3 Sofortmaßnahmen
• Phase 3 (30’): Commitments, Review-Slot in 48h

REGELN
• „Ja, und …“ statt „Ja, aber …“
• Eine Person spricht, eine fasst zusammen, eine dokumentiert
• Entscheidungen: COO operational, CFO finanziell; CEO nur bei Patt`
  },
  'd13_hrlegal_labor_law_briefing_tag13.pdf': {
    filename: 'd13_hrlegal_labor_law_briefing_tag13.pdf',
    title: 'Arbeitsrechtliches Briefing – Teilverkauf (Betriebsübergang/BR/Sozialplan)',
    type: 'document',
    content: `INHALTE
• §613a BGB: Übergang der Arbeitsverhältnisse; Unterrichtungspflichten; Widerspruchsrecht
• Mitbestimmung: Informations-/Beratungsrechte BR; Interessenausgleich/Sozialplan (falls erforderlich)
• Datenschutz: Personalaktenzugriff nur redigiert; Zweckbindung

EMPFEHLUNG
• Frühzeitige Unterrichtung (Musterentwurf vorbereitet)
• BR-Dialog mit klaren Grenzen der Vertraulichkeit
• Checkliste „Do/Don’t“ für Führungskräfte bei Mitarbeiterfragen`
  },
  'd13_hrlegal_613a_employee_notice_template_tag13.docx': {
    filename: 'd13_hrlegal_613a_employee_notice_template_tag13.docx',
    title: 'Musterunterrichtung §613a BGB – Mitarbeiterinformation',
    type: 'document',
    content: `BETREFF: Geplanter Übergang Ihres Arbeitsverhältnisses auf [Erwerber] gemäß §613a BGB

SEHR GEEHRTE/R [NAME],
wir informieren Sie über den geplanten Übergang des Betriebsteils United Pumps of America auf [Erwerber]. Ihr Arbeitsverhältnis geht mit allen Rechten und Pflichten über.

WESENTLICHE PUNKTE
• Zeitpunkt des Übergangs: [Datum]
• Gründe des Übergangs: [Kurzbegründung]
• Rechtliche/sozialrechtliche Folgen: Keine Änderungen Ihrer wesentlichen Vertragsbedingungen
• Maßnahmen in Aussicht: [z. B. IT-Umstellung, Schulungen]
• Widerspruchsrecht: Sie können innerhalb eines Monats ab Zugang schriftlich widersprechen.

KONTAKT
Fragen beantwortet [HR-Kontakt] bzw. [Legal-Kontakt].`
  }
};