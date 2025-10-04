// src/data/infoContent.ts

export interface InfoSection {
  heading?: string;
  paragraphs?: string[];
  listItems?: string[];
  subSections?: InfoSection[];
}

export interface InfoContent {
  title: string;
  sections: InfoSection[];
}

export const infoContents: Record<string, InfoContent> = {
  apsProfile: {
    title: "APS – Kurzprofil",
    sections: [
      { heading: "Rechtsträger", paragraphs: ["APS Präzisionspumpen GmbH (eigentümergeführt, 2. Generation)"] },
      { heading: "Sitz / Werke", paragraphs: ["Süddeutschland, 1 Werk mit 6 800 m² Produktions‑/Logistikfläche, 2 Montagehallen, 1 Prototypen‑/Qualifikationsbereich, mehrere Tochterunternehmen, darunter  United Pumps of America, Detroit"] },
      { heading: "Belegschaft", paragraphs: ["~ 180 Mitarbeitende in Deutschland (120 VZÄ, u.a. 12 Azubis, 8 QS/Validierung, 22 CNC/Mechanik, 16 Montage, 9 Service/After‑Sales, 19 Verwaltung/Vertrieb/Finanzen, 8 OPS‑Planung/Logistik)"] },
      { heading: "Produkte", paragraphs: ["Hochspezialisierte Dosier‑ und Prozesspumpen für Chemie/Pharma (CIP/SIP‑fähig, GMP‑nah, ATEX‑Zonen 1/2, Werkstoffe: Hastelloy C‑22/C‑276, PTFE‑Membranen)"] },
      { heading: "Zertifikate", paragraphs: ["ISO 9001, 14001; GMP‑konforme Doku‑Standards in Kundenprojekten"] },
      { heading: "Kundenstruktur (Umsatzanteile)", paragraphs: ["A‑Kunden 40 %, B‑Kunden 35 %, C‑Kunden 25 %"] },
      { heading: "Regionen", paragraphs: ["DACH 35 %, übriges EU 25 %, Nordamerika 25 %, APAC 15 %"] },
      { heading: "Umsatzmix", paragraphs: ["Neumaschinen 82 %, Service/After‑Sales 18 %"] },
      { heading: "Kapazitätsauslastung (normal)", paragraphs: ["~ 78 %, Engpässe: CNC & Dichtungssätze"] },
      { heading: "Kernlieferanten", paragraphs: ["Top‑20 decken ~70 % Einkaufsvolumen; kritisch: Speziallegierungen, Dichtungen, Steuerungskomponenten (SPS/Antriebe)"] },
      { heading: "Kreditversicherung", paragraphs: ["Limits für mehrere B‑Kunden reduziert (KV‑Risiko aktiv)"] }
    ]
  },
  businessModel: {
    title: "Geschäftsmodell & operative Realität",
    sections: [
      { paragraphs: ["APS liefert kundenindividuelle Pumpen mit hohen Anforderungen (Material‑ und Medienbeständigkeit, Validierung). Typische Aufträge haben Meilenstein‑Billing (30/40/30 %) und binden Material vor, weil Spezialteile lang und teuer sind. Dadurch ist das Working Capital dominanter Steuerhebel als klassisches OPEX‑Sparen."] },
      {
        heading: "Differenzierung",
        listItems: [
          "Dokumentierte Qualität (Qualifizierungsberichte, FAT/SAT)",
          "Kurze Time‑to‑Qualification (kundenseitige Qualifikations‑Last sinkt)",
          "After‑Sales (Dichtungssätze, Rebuilds) stabilisiert Margen"
        ]
      }
    ]
  },
  financials: {
    title: "Finanzielle Ausgangslage (letzte 12 Monate)",
    sections: [
      { paragraphs: ["Umsatz: ca. 38 Mio. €", "EBITDA‑Marge (normalisiert): ~ 9 % (≈ 3,4 Mio. €)", "Net Debt: ~ 2,4 Mio. €", "RCF‑Linie (vor Kürzung): 2,0 Mio. € zugesagt, typ. Inanspruchnahme 1,1–1,4 Mio. €"] },
      {
        heading: "Covenants (typisch, bankseitig relevant)",
        listItems: [
          "Net Debt / EBITDA ≤ 2,5× (Grenzfall)",
          "Mindest‑EBITDA p. a. ≥ 2,0 Mio. €",
          "Zinsdeckung ≥ 4,0×"
        ]
      },
      {
        heading: "Working‑Capital‑Baseline (vor Sondereffekten)",
        listItems: [
          "DSO: ~ 58 Tage (Milestone‑Billing treibt Spitzen)",
          "DPO: ~ 34 Tage",
          "DIO: ~ 68 Tage",
          "Cash‑Conversion‑Cycle: ~ 92–95 Tage"
        ]
      }
    ]
  },
  trigger: {
    title: "Der Auslöser der Liquiditätsfalle (soweit bekannt)",
    sections: [
      {
        heading: "Sondereffekte bündeln sich in kurzer Zeit",
        listItems: [
          "Serienhochlauf (neues A‑Kunden‑Programm) → hohe Materialvorfinanzierung (Sicherheitsbestand + Vorlaufteile)",
          "Temporärer Qualitätsvorfall (Los mit Fertigungsabweichungen) → Nacharbeit, Reklamationen, verspätete Meilensteinfreigaben",
          "Projektverzögerungen bei zwei A‑Kunden → Cash‑Eingänge rutschen 2–3 Wochen nach hinten",
          "Insolvenz eines Kunden mit größerem Zahlungsausfall"
        ],
        paragraphs: ["Dazu: Kreditversicherung senkt Limits → kritische Lieferanten verlangen Vorkasse/Anzahlung. Die Hausbank reagiert und kürzt die nutzbare Linie (nicht zwingend den Zusagebetrag, aber den Abrufrahmen) und verlangt engmaschiges Reporting."]
      },
      {
        heading: "Momentaufnahme (Letzter Stand vor drei Tagen (=T-3)",
        listItems: [
          "Kasse: ~ 50 k € (beweglich)",
          "RCF genutzt: ~ 1,1 Mio. €; verfügbar: nur noch + 500 k € Headroom (temporär)"
        ]
      },
      {
        heading: "Fällige/nahfällige Posten (14 Tage)",
        listItems: [
          "Payroll: 2 Läufe à ~ 560 k € (Tag 7/14) → gesamt 1.120 k €",
          "Umsatzsteuer (aktueller Zahllauf): ~ 70 k € (Stundung möglich)",
          "Vorkasse kritische Lieferanten: ~ 100–120 k € (je nach Liste/Losgröße)",
          "Nacharbeit/Qualitätskosten (zusätzliche Prüfung, Sonderfahrten): ~ 10–20 k € kurzfristig"
        ]
      },
      {
        heading: "Covenant‑Druck",
        paragraphs: ["EBITDA‑Run‑Rate kurzfristig gedrückt (~ 3–5 %); Risiko Waiver."]
      }
    ]
  },
  stakeholders: {
    title: "Stakeholder",
    sections: [
      { listItems: ["Hausbank", "Kritische Lieferanten", "A‑Kunden", "Team/BR", "Öffentlichkeit/Presse"] }
    ]
  },
  glossary: {
    title: "Glossar der Fachbegriffe",
    sections: [
      {
        heading: "Finanzierung & Bank",
        subSections: [
          { heading: "RCF (Revolving Credit Facility) / Kreditlinie", paragraphs: ["Drehkredit, den man flexibel ziehen und wieder zurückzahlen kann.", "Im Spiel: Verfügbarer Headroom der Linie entscheidet, wie viel Liquidität kurzfristig mobilisierbar ist."] },
          { heading: "Headroom (Linien‑Spielraum)", paragraphs: ["Noch frei abrufbarer Teil der Kreditlinie.", "Im Spiel: Puffert Schwankungen; wenig Headroom erhöht das Risiko von Zahlungsverzug."] },
          { heading: "Covenants", paragraphs: ["Vertragliche Finanzkennzahlen, die eingehalten werden müssen (z. B. Verschuldungsgrad).", "Im Spiel: Bruch → Waiver nötig, Bankvertrauen sinkt."] },
          { heading: "Net Debt (Nettoverschuldung)", paragraphs: ["Finanzschulden minus liquide Mittel.", "Im Spiel: Hoher Wert erhöht Covenant‑Druck."] },
          { heading: "EBITDA / EBITDA‑Marge", paragraphs: ["Operatives Ergebnis vor Zinsen, Steuern und Abschreibungen / Anteil am Umsatz.", "Im Spiel: Basis für Covenant‑Prüfungen und Bankvertrauen."] },
          { heading: "Zinsdeckung (Interest Coverage)", paragraphs: ["Wie oft der operative Gewinn die Zinsaufwände deckt.", "Im Spiel: Niedrige Deckung = höheres Bankrisiko."] },
          { heading: "Waiver", paragraphs: ["Ausnahmegenehmigung der Bank bei Covenant‑Verstößen.", "Im Spiel: Hält Finanzierung am Laufen, kostet Reputation/Gebühren."] },
          { heading: "Sideletter", paragraphs: ["Zusatzvereinbarung zum Kreditvertrag (z. B. Reporting‑Pflichten).", "Im Spiel: Definiert Auflagen (z. B. KPI‑Transparenz, Capex‑Freeze)."] },
          { heading: "Standstill (Lieferanten/Bank)", paragraphs: ["Temporäre Stillhalte‑Vereinbarung: keine Eskalation/Zwangsmaßnahmen.", "Im Spiel: Zeitgewinn; muss aktiv verhandelt/verlängert werden."] },
          { heading: "13‑Wochen‑Bridge / Cash‑Bridge", paragraphs: ["Rollierende Liquiditätsvorschau über 13 Wochen.", "Im Spiel: Kernartefakt, um Bank/CFO/CEO zu synchronisieren; beeinflusst Bankvertrauen stark."] },
          { heading: "S&L (Sale‑&‑Leaseback)", paragraphs: ["Vermögenswert verkaufen und zurückmieten → einmalig Cash, laufende Kosten steigen.", "Im Spiel: Schafft sofort Cash, belastet künftig P&L."] }
        ]
      },
      {
        heading: "Working Capital & Zahlungsbedingungen",
        subSections: [
          { heading: "Working Capital (WC)", paragraphs: ["Betriebliches Umlaufvermögen: Vorräte + Forderungen – Verbindlichkeiten.", "Im Spiel: Größter kurzfristiger Hebel (DSO/DPO/DIO)."] },
          { heading: "DSO (Days Sales Outstanding)", paragraphs: ["Durchschnittliche Forderungslaufzeit in Tagen.", "Im Spiel: DSO senken → schnellerer Cash‑Zufluss."] },
          { heading: "DPO (Days Payables Outstanding)", paragraphs: ["Durchschnittliche Lieferantenziel in Tagen.", "Im Spiel: DPO erhöhen (ohne Vertrauen zu zerstören) → Cash‑Schonung."] },
          { heading: "DIO (Days Inventory Outstanding)", paragraphs: ["Durchschnittliche Lagerreichweite in Tagen.", "Im Spiel: DIO senken → weniger Cash in Beständen gebunden."] },
          { heading: "CCC (Cash‑Conversion‑Cycle)", paragraphs: ["CCC = DSO + DIO − DPO → Zeitspanne von Zahlung an Lieferanten bis Zahlung durch Kunden.", "Im Spiel: Je kürzer, desto liquider."] },
          { heading: "Skonto", paragraphs: ["Preisnachlass bei schneller Zahlung (z. B. 2 % in 10 Tagen).", "Im Spiel: Verringert Marge, bringt aber schnell Cash."] },
          { heading: "Rabatt", paragraphs: ["Allgemeine Preisreduzierung (ohne Zahlungszielbezug).", "Im Spiel: Erhöht ggf. Absatz/Loyalität, verbessert Cash nicht automatisch."] },
          { heading: "Vorkasse / Anzahlung", paragraphs: ["Zahlung vor Lieferung.", "Im Spiel: Sichert Materialfluss, zehrt kurzfristig Cash."] },
          { heading: "Anderkonto (Escrow)", paragraphs: ["Treuhandkonto bei Anwalt/Notar: Geld wird nur bei Bedingungserfüllung freigegeben.", "Im Spiel: Lieferanten werden beruhigt, Cash‑Abfluss bleibt gesteuert."] },
          { heading: "Bürgschaft", paragraphs: ["Dritter (Bank/Versicherer) garantiert Zahlung.", "Im Spiel: Öffnet Materialflüsse ohne sofortigen Cash‑Abfluss, kostet Gebühr."] },
          { heading: "Abverkauf (C‑Bestände)", paragraphs: ["Lagerware mit Abschlag verkaufen.", "Im Spiel: Bringt schnell Cash, drückt P&L/Public."] }
        ]
      },
      {
        heading: "Umsatz & Kunden",
        subSections: [
          { heading: "Meilenstein‑Billing (30/40/30 %)", paragraphs: ["Rechnungsstellung in Phasen (z. B. Anzahlung, Abnahme FAT/SAT, Lieferung).", "Im Spiel: Verzögerte Meilensteine = DSO‑Spitzen, Cash rutscht."] },
          { heading: "A/B/C‑Kunden", paragraphs: ["Segmentierung nach Wert/Risiko (A = kritisch/umsatzstark).", "Im Spiel: A‑Kunden schützen (Service, Qualität) → Loyalität und Folgeaufträge."] },
          { heading: "SLA (Service Level Agreement)", paragraphs: ["Verbindliche Reaktions-/Verfügbarkeitszusagen.", "Im Spiel: Beruhigt A‑Kunden, erhöht ggf. Kosten/Overhead."] },
          { heading: "Pönale", paragraphs: ["Vertragsstrafe bei Termin-/Leistungsabweichung.", "Im Spiel: Vermeiden durch Sonderschichten/Express; sonst P&L‑Schaden + Public."] }
        ]
      },
      {
        heading: "Produktion, Qualität & Logistik",
        subSections: [
          { heading: "DB (Deckungsbeitrag)", paragraphs: ["Umsatz minus variable Kosten (Material, Fremdleistung etc.).", "Im Spiel: DB>30 % priorisieren → stabilisiert Ergebnis und Bankvertrauen."] },
          { heading: "Serienhochlauf", paragraphs: ["Anfahren einer neuen Serie mit Lernkurve und Vorratsaufbau.", "Im Spiel: Bindet Cash (Sicherheitsbestand/Vorlaufteile)."] },
          { heading: "Sicherheitsbestand / Vorlaufteile", paragraphs: ["Zusätzliche Bestände zur Risikoabsicherung.", "Im Spiel: Sichert Lieferfähigkeit, erhöht DIO/Cash‑Bindung."] },
          { heading: "Qualitätsvorfall / Nacharbeit", paragraphs: ["Fehlteile / Abweichungen erfordern Korrekturen.", "Im Spiel: Kosten + Verzögerungen (P&L, DSO, Public)."] },
          { heading: "FAT / SAT (Factory/Site Acceptance Test)", paragraphs: ["Werks‑ bzw. Vor‑Ort‑Abnahme durch den Kunden.", "Im Spiel: Meilensteinfreigaben hängen oft daran → Cash‑Trigger."] },
          { heading: "QS (Qualitätssicherung)", paragraphs: ["Prozesse/Messungen, die Fehler verhindern.", "Im Spiel: Sichtbare QS‑Trends beruhigen Kunden und Bank."] },
          { heading: "Express‑Logistik", paragraphs: ["Schnelle, teure Transporte.", "Im Spiel: Gezielter Einsatz (A‑Kunden/Pönale) schützt Loyalität, frisst P&L."] },
          { heading: "Make‑or‑Buy", paragraphs: ["Selbst fertigen oder zukaufen.", "Im Spiel: Kurzfristiges Buy entlastet Engpässe (Kosten ↑, Liefertreue ↑)."] },
          { heading: "Kanban", paragraphs: ["Einfaches Pull‑System zur Bestandssteuerung.", "Im Spiel: Reduziert Stockouts und Bestände, DIO sinkt."] }
        ]
      },
      {
        heading: "Kommunikation, Governance & Recht",
        subSections: [
          { heading: "PR (Public Relations)", paragraphs: ["Öffentlichkeitsarbeit.", "Im Spiel: Hoffnungs‑PR ohne Fakten senkt BankTrust/Public; faktenbasiert wirkt positiv."] },
          { heading: "Overpromising", paragraphs: ["Mehr versprechen als lieferbar.", "Im Spiel: Kurzfristig Public↑, mittelfristig Bank/Kunden‑Vertrauen↓."] },
          { heading: "FAQ / Q&A", paragraphs: ["Fragen‑&‑Antworten‑Sammlung / Live‑Fragerunde.", "Im Spiel: Senkt Team‑Unsicherheit, wirkt auf Workforce/Public."] },
          { heading: "BR (Betriebsrat)", paragraphs: ["Vertretung der Belegschaft.", "Im Spiel: Einbindung reduziert Konflikte (Kurzarbeit/Schichten)."] },
          { heading: "Kurzarbeit", paragraphs: ["Vorübergehende Arbeitszeit‑Reduzierung mit Lohnersatz.", "Im Spiel: Schont P&L, kann Engagement senken – faire Verteilung wichtig."] },
          { heading: "Compliance / Gleichbehandlung", paragraphs: ["Einhaltung von Regeln, keine Bevorzugungen bei Zahlungen/Freigaben.", "Im Spiel: Saubere Doku schützt Public/Bank (Whistleblowing‑Risiko ↓)."] },
          { heading: "DSFA (Datenschutz‑Folgenabschätzung)", paragraphs: ["Bewertung von Datenschutzrisiken (DSGVO).", "Im Spiel: Teil des Compliance‑Pakets; ordentliche Doku stärkt BankTrust/Public."] },
          { heading: "Plausibilisierung (\"Plausis\")", paragraphs: ["Externe Gegenprüfung von Zahlen/Plänen.", "Im Spiel: Erhöht Bankvertrauen, kostet Gebühren."] },
          { heading: "Capex / Capex‑Freeze", paragraphs: ["Investitionen in Anlagen/Equipment / Stopp dieser Ausgaben.", "Im Spiel: Entlastet kurzfristig Cash, kann Leistungsfähigkeit mindern."] },
          { heading: "OKR (Objectives & Key Results)", paragraphs: ["Kurzzyklische Ziele mit Messwerten.", "Im Spiel: Fokussiert Teams; klare OKR erhöhen Engagement und BankTrust."] },
          { heading: "LOI / MOU / NDA", paragraphs: ["Letter of Intent (Absichtserklärung) / Memorandum of Understanding (Grundverständnis) / Geheimhaltungsvereinbarung.", "Im Spiel: Strukturieren Partnerschafts‑Optionen ohne zu früh zu \"lock‑in\"."] }
        ]
      },
      {
        heading: "Branchen-/Regelwerksbegriffe",
        subSections: [
          { heading: "GMP‑nah", paragraphs: ["An Gute Herstellungspraxis angelehnte Doku‑/Prozessstandards (Pharma).", "Im Spiel: Qualitäts‑/Compliance‑Anker, erklärt QS‑Aufwand."] },
          { heading: "CIP / SIP", paragraphs: ["Cleaning/ Sterilization in Place – Reinigung/Sterilisation im System.", "Im Spiel: Technische Anforderung bei vielen Kunden; rechtfertigt Qualitätskosten."] },
          { heading: "ATEX (Zonen 1/2)", paragraphs: ["Explosionsschutz‑Richtlinie, Zonen klassifizieren Explosionsrisiko.", "Im Spiel: Erklärt Material‑/Prüfaufwand und Lieferantenselektion."] }
        ]
      },
      {
        heading: "KPI‑Begriffe (0–100‑Skala)",
        subSections: [
          { heading: "Bank Trust (bankTrust)", paragraphs: ["Einschätzung der Bank, wie steuerbar und glaubwürdig APS ist.", "Im Spiel: Treiber für Waiver/Sideletter und Linien‑Spielraum."] },
          { heading: "Customer Loyalty (customerLoyalty)", paragraphs: ["Bindung der Schlüsselkunden.", "Im Spiel: Beeinflusst Auftragslage und Toleranz bei Störungen."] },
          { heading: "Workforce Engagement (workforceEngagement)", paragraphs: ["Motivation und Sicherheitsgefühl der Belegschaft.", "Im Spiel: Treiber für Leistungsfähigkeit und Fluktuationsrisiko."] },
          { heading: "Public Perception (publicPerception)", paragraphs: ["Außenwirkung in Presse/Öffentlichkeit.", "Im Spiel: Verstärkt/entschärft Druck durch Gerüchte/Blogs."] },
          { heading: "Cash (cashEUR)", paragraphs: ["Liquiditätsbestand (EUR).", "Im Spiel: Harter Insolvenz‑Trigger bei negativem Stand."] },
          { heading: "P&L (profitLossEUR)", paragraphs: ["Ergebnis der Periode (EUR).", "Im Spiel: Wird durch Notmaßnahmen (Express/Abverkauf) belastet."] }
        ]
      }
    ]
  },
  privacyPolicy: {
    title: "Datenschutzerklärung für die Simulations-App",
    sections: [
      {
        paragraphs: [
          "Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Diese App dient der Durchführung einer interaktiven Unternehmenssimulation und nutzt für bestimmte Funktionen (z. B. Mehrspielermodus, Synchronisation, Chat) den Dienst Supabase als technischer Backend-Anbieter."
        ]
      },
      {
        paragraphs: [
          "Die folgenden Informationen erläutern, welche personenbezogenen Daten verarbeitet werden, zu welchen Zwecken dies geschieht und welche Rechte Ihnen zustehen."
        ]
      },
      {
        heading: "1. Verantwortliche Stelle",
        paragraphs: [
          "UVM-Institut",
          "Prof. Dr. Steiner und Prof. Dr. Landes Partnerschaft",
          "Pater-Alois-Weg 12",
          "85435 Erding",
          "Josef-Bergmann-Weg 1",
          "82150 Olching",
          "E-Mail: info@uvm-institut.de",
          "Telefon: 089 15 9000 75"
        ]
      },
      {
        heading: "2. Art der verarbeiteten Daten",
        paragraphs: [
          "Bei Nutzung der App im Einzelspielermodus werden keine personenbezogenen Daten an uns oder Dritte übermittelt; Spielstände werden ausschließlich lokal auf Ihrem Endgerät gespeichert."
        ],
        listItems: [
          "Registrierungsdaten: Anzeigename, E-Mail-Adresse (falls für Session-Login erforderlich)",
          "Spielbezogene Daten: Rollenwahl, Entscheidungen, Chat-Nachrichten, Spielstände",
          "Technische Daten: IP-Adresse, Zeitstempel von Aktionen",
          "Verbindungsdaten: Session-IDs, Token für Authentifizierung"
        ]
      },
      {
        heading: "3. Zweck der Verarbeitung",
        paragraphs: [
          "Die Verarbeitung erfolgt ausschließlich zu folgenden Zwecken:"
        ],
        listItems: [
          "Ermöglichung und Synchronisation des Mehrspielermodus",
          "Speicherung und Abruf gemeinsamer Spielstände",
          "Chat-Kommunikation zwischen Teilnehmenden",
          "Gewährleistung der technischen Sicherheit und Fehleranalyse"
        ]
      },
      {
        heading: "4. Rechtsgrundlage",
        paragraphs: [
          "Die Verarbeitung personenbezogener Daten im Mehrspielermodus erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung, Nutzung der App-Funktionen) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem und funktionierendem Betrieb)."
        ]
      },
      {
        heading: "5. Empfänger der Daten",
        paragraphs: [
          "Zur Bereitstellung der Mehrspielerfunktionen setzen wir den Dienst Supabase ein:",
          "Supabase Inc.",
          "970 Toa Payoh North #07-04, Singapore 318992",
          "Website: https://supabase.com",
          "Daten können auf Servern innerhalb der EU oder in Drittstaaten verarbeitet werden. Sofern eine Übermittlung in ein Drittland erfolgt, erfolgt diese auf Grundlage geeigneter Garantien nach Art. 46 DSGVO (z. B. Standardvertragsklauseln)."
        ]
      },
      {
        heading: "6. Speicherdauer",
        paragraphs: [
          "Spiel- und Sessiondaten werden gelöscht, sobald die Mehrspieler-Session beendet ist bzw. nach Ablauf der technisch notwendigen Vorhaltezeit.",
          "Chat-Nachrichten und Spielprotokolle werden nur so lange gespeichert, wie dies für die Funktionalität erforderlich ist.",
          "Daten aus dem Einzelspielermodus verbleiben ausschließlich auf Ihrem Gerät."
        ]
      },
      {
        heading: "7. SSL- bzw. TLS-Verschlüsselung",
        paragraphs: [
          "Diese App nutzt für alle Verbindungen zu Supabase eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile mit „https://\" beginnt und ein Schloss-Symbol angezeigt wird."
        ]
      },
      {
        heading: "8. Kontaktaufnahme",
        paragraphs: [
          "Wenn Sie uns per E-Mail kontaktieren, werden die übermittelten Daten ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter und löschen sie, sobald der Zweck entfällt, es sei denn, gesetzliche Aufbewahrungspflichten bestehen."
        ]
      },
      {
        heading: "9. Ihre Rechte gemäß DSGVO",
        listItems: [
          "Auskunft nach Art. 15 DSGVO",
          "Berichtigung nach Art. 16 DSGVO",
          "Löschung nach Art. 17 DSGVO",
          "Einschränkung der Verarbeitung nach Art. 18 DSGVO",
          "Widerspruch nach Art. 21 DSGVO",
          "Datenübertragbarkeit nach Art. 20 DSGVO"
        ],
        paragraphs: ["Bitte richten Sie Ihre Anfrage an: info@uvm-institut.de"]
      },
      {
        heading: "10. Beschwerderecht bei der Aufsichtsbehörde",
        paragraphs: [
          "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Zuständig für Bayern ist:",
          "Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)",
          "Promenade 18",
          "91522 Ansbach",
          "Telefon: 0981 180093-0",
          "Telefax: 0981 180093-800",
          "E-Mail: poststelle@lda.bayern.de",
          "Website: www.lda.bayern.de"
        ]
      }
    ]
  },
  imprint: {
    title: "Impressum",
    sections: [
      {
        heading: "Angaben gemäß § 5 TMG",
        paragraphs: [
          "UVM-Institut",
          "Prof. Dr. Steiner und Prof. Dr. Landes Partnerschaft",
          "Website: www.uvm-institut.de",
          "E-Mail: info@uvm-institut.de",
          "Telefon: 089 15 9000 75"
        ]
      },
      {
        heading: "Büro Erding",
        paragraphs: [
          "Pater-Alois-Weg 12",
          "85435 Erding"
        ]
      },
      {
        heading: "Büro Olching",
        paragraphs: [
          "Josef-Bergmann-Weg 1",
          "82150 Olching"
        ]
      },
      {
        heading: "Vertretungsberechtigte Partner",
        paragraphs: [
          "Prof. Dr. Eberhard Steiner",
          "Prof. Dr. Miriam Landes"
        ]
      },
      {
        heading: "Rechtsform",
        paragraphs: [
          "Partnerschaftsgesellschaft gemäß PartGG",
          "AG München PR 997"
        ]
      }
    ]
  },
  disclaimer: {
    title: "Wichtiger Hinweis",
    sections: [
      {
        paragraphs: [
          "Die in diesem Rollenspiel angegebenen Hinweise, Auswirkungen und Ratschläge erheben keinen Anspruch auf Richtigkeit oder Vollständigkeit und sind nicht als Beratung in Krisen- oder Insolvenzfällen zu verstehen oder als rechtlicher Rat zu nutzen. Es handelt sich um Fiktionen."
        ]
      }
    ]
  }
};