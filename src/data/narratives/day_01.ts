import type { DayNarrative } from './types';

export const narrativeDay01: DayNarrative = {
  day: 1,
  opening: 'Montag, 08:30 Uhr – die Bank signalisiert: Transparenz & Disziplin werden zur härtesten Währung.',
  beats: [
    {
      newsId: 'N1',
      category: 'bank',
      id: 'bank-covenants',
      title: 'Hausbank prüft Linienkürzung',
      summary: 'Auflagen: 13-Wochen-Plan, Maßnahmenpaket, Weekly-Reporting.',
      context:
        'Nach erhöhten Abflüssen und schwankender Ergebnislage stellt die Bank die Betriebsmittellinie auf den Prüfstand. Ohne belastbaren Cash-Plan droht die Kürzung – mit Signaleffekt Richtung Lieferanten.',
      pressure: 'Echtzeit-Transparenz und Payment-Disziplin jetzt sichtbar machen.',
      kpiNotes: [
        'Bankvertrauen ↑ bei „no surprises“ (Plan + Weekly).',
        'Cash-Runway hängt an Payment-Regeln (P1/P2) und WC-Hebeln.'
      ],
      roleNotes: {
        CEO: ['„no surprises“ Narrativ setzen; Beirat früh briefen.'],
        CFO: ['Daily Short-Report + Weekly Detail; Zahlungspriorisierung sofort aktiv.'],
        OPS: ['DB-starken Mix unterstützen (Lieferstabilität sichtbar).'],
        HRLEGAL: ['Compliance der Reports und Freigabeprozesse sichern.']
      },
      attachments: ['bank_brief_tag1.pdf']
    },
    {
      newsId: 'N2',
      category: 'supplier',
      id: 'supplier-prepay',
      title: 'Kritischer Lieferant verlangt Vorkasse',
      summary: 'Kreditversicherungslimit weg – 70 % Anzahlung.',
      context: 'Der Kernlieferant für Gussteile liefert nur noch gegen Vorkasse. Anderkonto oder DB-Schwelle können Vertrauen schaffen.',
      pressure: 'Durchsatz vs. Cash; Pönalen vermeiden.',
      kpiNotes: ['Kundentreue ↓ bei Verzug; Bankvertrauen ↑ bei nachvollziehbarer Freigabelogik.'],
      roleNotes: {
        OPS: ['DB>25 % priorisieren; Alternativlieferant antesten.'],
        CFO: ['Anderkonto prüfen; Teilfakturierung/Skonto mit Kunden.']
      },
      attachments: ['mail_chemalloy.eml']
    },
    {
      newsId: 'N3',
      category: 'press',
      id: 'linkedin-rumor',
      title: 'LinkedIn: „Zahlungsverzug?“',
      summary: 'Erste Spekulationen in Social Media.',
      context: 'Ein Kommentar greift Gerüchte auf. Reichweite gering, aber als Stimmungsindikator relevant.',
      kpiNotes: ['Öffentliche Wahrnehmung leicht ↓; proaktive Q&A stabilisiert.'],
      roleNotes: {
        CEO: ['Faktenstatement vorbereiten; Key-Accounts direkt adressieren.'],
        HRLEGAL: ['Guideline & Fact-Sheet; kein „Maulkorb“, aber klare Spielregeln.']
      }
    },
    {
      newsId: 'N4',
      category: 'internal',
      id: 'recruiting-drop',
      title: 'Bewerbende springen ab',
      summary: 'Unsicherheit wirkt in den Arbeitsmarkt hinein.',
      context: 'Zwei Bewerbende ziehen zurück. Employer Branding und Lohnsicherheit werden hinterfragt.',
      kpiNotes: ['Belegschaftsengagement/Reputation im Blick.'],
      roleNotes: {
        HRLEGAL: ['Lohnsicherheit adressieren (Townhall/FAQ).'],
        CEO: ['Glaubwürdige interne Ansprache; kein Overpromising.']
      }
    },
    {
      newsId: 'N5',
      category: 'customer',
      id: 'key-account-eta',
      title: 'A-Kunde fordert Terminsicherheit',
      summary: 'Volumenverlagerung im Raum.',
      context: 'Ein Schlüsselkunde will belastbare Lieferzusagen – inkl. Eskalationskontakt.',
      pressure: 'Pönale droht; Vertrauensanker setzen.',
      roleNotes: {
        OPS: ['Sonderschicht/Express punktuell; ETA verbindlich.'],
        CEO: ['Eskalationspfad benennen; persönlicher Call.']
      }
    },
    {
      newsId: 'N6',
      category: 'supplier',
      id: 'logistics-terms',
      title: 'Logistikpartner prüft Konditionen',
      summary: 'Zahlungsziele und Volumenbindung neu auf dem Tisch.',
      context: 'Partner will Planbarkeit – Chance auf Pauschalen/Korridore.',
      roleNotes: {
        OPS: ['Korridore & Pauschalen testen; A-Kunden schützen.'],
        CFO: ['Cash-Wirkung und Vertragstermine synchronisieren.']
      }
    },
    {
      newsId: 'N7',
      category: 'internal',
      id: 'whistle-small',
      title: 'Whistleblowing: „Kleinstlieferanten warten“',
      summary: 'Hinweis auf selektive Zahlungen.',
      context: 'Gleichbehandlungs-Vorwurf – Audit-Trail nötig.',
      roleNotes: {
        HRLEGAL: ['Antwort ans Portal; Prozessdarstellung.'],
        CFO: ['Transparente Freigabe-Policy dokumentieren.']
      }
    },
    {
      newsId: 'N8',
      category: 'press',
      id: 'press-interview',
      title: 'Regionalpresse will Interview',
      summary: 'Anfrage zur Lage bei APS.',
      context: 'Die Geschichte wird öffentlich – Linie zwischen Realismus und Zuversicht finden.',
      roleNotes: {
        CEO: ['Faktenbasiert + Q&A; Terminabstimmung mit HR/Legal.']
      }
    }
  ],
  cliffhanger: 'Morgen spricht die Presse – das Narrativ muss sitzen.'
};
