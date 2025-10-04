// src/data/narratives/auto.ts
import type { RoleId } from '@/core/models/domain';
import type { DayNarrative, NarrativeBeat, BeatCategory } from './types';

import { day1News }  from '@/data/scenario_day_01';
import { day2News }  from '@/data/scenario_day_02';
import { day3News }  from '@/data/scenario_day_03';
import { day4News }  from '@/data/scenario_day_04';
import { day5News }  from '@/data/scenario_day_05';
import { day6News }  from '@/data/scenario_day_06';
import { day7News }  from '@/data/scenario_day_07';
import { day8News }  from '@/data/scenario_day_08';
import { day9News }  from '@/data/scenario_day_09';
import { day10News } from '@/data/scenario_day_10';
import { day11News } from '@/data/scenario_day_11';
import { day12News } from '@/data/scenario_day_12';
import { day13News } from '@/data/scenario_day_13';
import { day14News } from '@/data/scenario_day_14';

// Quelle -> Kategorie der Narrative (steuert Rollen- & KPI-Hinweise)
function toCategory(src: string): BeatCategory {
  if (src === 'press' || src === 'rumor') return 'press';
  if (src === 'customer')  return 'customer';
  if (src === 'supplier')  return 'supplier';
  if (src === 'internal')  return 'internal';
  if (src === 'bank')      return 'bank';
  if (src === 'authority') return 'authority';
  return 'press';
}

// Rollenspezifische Standard-Hinweise je Kategorie
const roleHints: Record<BeatCategory, Partial<Record<RoleId, string[]>>> = {
  bank: {
    CEO: ['„no surprises" Narrativ; Stakeholder früh briefen.'],
    CFO: ['Cash-Transparenz (Daily/Weekly); Payment-Regeln P1/P2 durchziehen.'],
    OPS: ['Lieferstabilität sichtbar machen (DB-starker Mix).'],
    HRLEGAL: ['Compliance der Reports/Prozesse sicherstellen.']
  },
  supplier: {
    OPS: ['DB>Schwelle priorisieren; Alternativlieferant testen; Express gezielt.'],
    CFO: ['Anderkonto/Skonto/Teilfakturierung prüfen; Zahlungsziele verhandeln.']
  },
  customer: {
    OPS: ['ETA verbindlich; Sonderschichten/Express punktuell gegen Pönale.'],
    CEO: ['Eskalationspfad nennen; Key-Account persönlich anrufen.']
  },
  press: {
    CEO: ['Faktenstatement + Q&A; Ton: realistisch & zuversichtlich.'],
    HRLEGAL: ['Guideline & Factsheet; Freigabeprozess für externe Kommunikation.']
  },
  internal: {
    HRLEGAL: ['Townhall/FAQ; Lohnsicherheit adressieren; Whistle-Antwort fristgerecht.'],
    CEO: ['Glaubwürdige interne Ansprache; kein Overpromising.']
  },
  authority: {
    CFO: ['Fristen einhalten; vollständige Unterlagen; Stundungen sauber begründen.'],
    HRLEGAL: ['Datenschutz/Arbeitsrecht bei Reports und Maßnahmen prüfen.']
  }
};

// KPI-Hinweise je Kategorie
const kpiHints: Record<BeatCategory, string[]> = {
  bank: [
    'Bankvertrauen ↑ bei belastbarem Plan + wöchentlichem Reporting.',
    'Cash-Runway hängt an Payment-Regeln und Working-Capital-Hebeln.'
  ],
  supplier: [
    'Kundentreue ↓ bei Lieferverzug; Bankvertrauen ↑ bei nachvollziehbarer Freigabe-Logik.'
  ],
  customer: [
    'Kundentreue ↑ bei verlässlicher ETA und sichtbarer Maßnahmen (Express/Sonderschicht).'
  ],
  press: [
    'Öffentliche Wahrnehmung ↑ bei konsistenten Fakten/Q&A; riskant: bloßes „Alles gut".'
  ],
  internal: [
    'Belegschaftsengagement ↑ bei transparenter Kommunikation; Reputationsrisiko bei Leaks.'
  ],
  authority: [
    'Bankvertrauen ↑ bei sauberer Compliance; Bußgeld-/PR-Risiko bei Versäumnissen.'
  ]
};

// Tagesauftakt/Cliffhanger (knapp, optional)
const openings: Record<number,string> = {
  1:'Montag, 08:30 – die Bank verlangt Disziplin & Transparenz.',
  2:'Dienstag, 09:00 – Pressedruck nimmt zu, Technik kämpft mit Engpässen.',
  3:'Mittwoch, 08:45 – Lohnlauf im Blick, Behörden warten auf Unterlagen.',
  4:'Donnerstag, 09:10 – Banktermin steht an, Lieferanten ruckeln.',
  5:'Freitag, 09:15 – Bankgespräch gelaufen, Entscheidungen müssen wirken.',
  6:'Montag, 08:50 – Payroll in zwei Tagen, Linienengpässe spürbar.',
  7:'Dienstag, 09:05 – Reorganisation & Qualität greifen langsam.',
  8:'Mittwoch, 09:00 – Kunden fordern ETA, Presse beobachtet.',
  9:'Donnerstag, 08:55 – Waiver-Vorgaben verdichten sich.',
 10:'Freitag, 09:10 – Zwischenprüfung naht, Partnerschaften konkretisieren.',
 11:'Montag, 08:40 – Standstills laufen aus, Beirat fragt nach.',
 12:'Dienstag, 08:45 – Bank-Zwischenprüfung heute.',
 13:'Mittwoch, 09:00 – Letzte Weichen vor Payroll.',
 14:'Donnerstag, 08:50 – Finale: Commitments, ETA & Lessons Learned.'
};
const cliffs: Record<number,string> = {
  1:'Morgen spricht die Presse – das Narrativ muss sitzen.',
  2:'Die Woche kippt – Technik/Payroll/Bank müssen zusammenpassen.',
  3:'Die Prüfungsergebnisse entscheiden die Tonalität nach außen.',
  4:'Nach dem Banktermin zählt Umsetzungsgeschwindigkeit.',
  5:'Nächste Woche steht Payroll final an.',
  6:'Morgen: Fokus auf Durchsatz & Kurzarbeit-Feintuning.',
  7:'Kommt das Qualitätsthema zur Ruhe, stabilisieren sich die Kunden.',
  8:'Die Zwischenprüfung wird messbare Effekte verlangen.',
  9:'48 Stunden bis zur Bank-Zwischenprüfung.',
 10:'Nachforderungen der Bank sind wahrscheinlich.',
 11:'Morgen Review – Zahlen müssen stimmen.',
 12:'Aus dem Review ergeben sich Auflagen & Zielkorridore.',
 13:'Payroll & Commitments entscheiden die Endpfade.',
 14:'Ausblick: Lessons Learned & Roadmap nach der Krise.'
};

// Beats aus News eines Tages bauen
function buildForDay(
  day: number,
  newsArr: { id:string; source:string; title:string; content:string; attachments?:string[] }[]
): DayNarrative {
  const beats: NarrativeBeat[] = newsArr.map((n: any) => {
    const cat = toCategory(n.source);
    return {
      newsId: n.id,
      category: cat,
      id: n.id,               // stabil: identisch zur News-ID
      title: n.title,
      summary: n.content,
      context: n.content,
      fullText: n.expandedText, // Map expandedText to fullText
      pressure:
        cat === 'bank'      ? 'Transparenz & Payment-Disziplin zeigen.'
      : cat === 'supplier'  ? 'Durchsatz vs. Cash balancieren.'
      : cat === 'customer'  ? 'ETA belastbar zusagen.'
      : cat === 'press'     ? 'Konsistente Botschaft wahren.'
      : cat === 'internal'  ? 'Sicherheit & Fairness kommunizieren.'
      :                        'Fristen & Vollständigkeit sicherstellen.',
      kpiNotes: kpiHints[cat],
      roleNotes: roleHints[cat],
      attachments: n.attachments
    };
  });
  return { day, opening: openings[day], cliffhanger: cliffs[day], beats };
}

// Export: alle Tage 1–14
export const narrativesByDay: Record<number, DayNarrative> = {
  1:  buildForDay(1,  day1News),
  2:  buildForDay(2,  day2News),
  3:  buildForDay(3,  day3News),
  4:  buildForDay(4,  day4News),
  5:  buildForDay(5,  day5News),
  6:  buildForDay(6,  day6News),
  7:  buildForDay(7,  day7News),
  8:  buildForDay(8,  day8News),
  9:  buildForDay(9,  day9News),
  10: buildForDay(10, day10News),
  11: buildForDay(11, day11News),
  12: buildForDay(12, day12News),
  13: buildForDay(13, day13News),
  14: buildForDay(14, day14News),
};