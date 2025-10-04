
// src/data/newsPool.ts

import type { KPI, RoleId } from "@/core/models/domain";

export interface NewsPoolEntry {
  title: string;
  text: string;
  impact: Partial<KPI>;
  roles?: RoleId[]; // ← NEU: optional, z. B. ['CEO','CFO']
}


export type NewsPool = {
  [category: string]: {
    low: { "+": NewsPoolEntry[]; "-": NewsPoolEntry[] };
    mid: { "+": NewsPoolEntry[]; "-": NewsPoolEntry[] };
    high: { "+": NewsPoolEntry[]; "-": NewsPoolEntry[] };
  };
};

export const newsPool: NewsPool = {
  finanzen: {
    low: {
      "+": [
        {
          title: "Kleine Steuernachzahlung erstattet",
          text: "Das Finanzamt erstattet überraschend 15.000 Euro aus der letzten Betriebsprüfung. Die Liquidität verbessert sich leicht für anstehende Investitionen.",
          impact: { cashEUR: 15000, bankTrust: 0.5 }
        },
        {
          title: "Skonti durch frühere Zahlungen realisiert",
          text: "Durch optimierte Zahlungsläufe konnten diesen Monat 8.000 Euro Skonti gezogen werden. Die Gewinnmarge erhöht sich minimal bei gleichbleibender Liquidität.",
          impact: { profitLossEUR: 8000, cashEUR: -2000 }
        },
        {
          title: "Währungsgewinne bei Dollar-Geschäften",
          text: "Der günstige Dollarkurs beschert einen unrealisierten Gewinn von 12.000 Euro. Die Bilanz zeigt eine leicht verbesserte Position zum Quartalsende.",
          impact: { profitLossEUR: 12000, bankTrust: 0.3 }
        },
        {
          title: "Versicherung senkt Prämien minimal",
          text: "Die Betriebshaftpflichtversicherung reduziert die Jahresprämie um 5.000 Euro. Die laufenden Kosten sinken geringfügig und entlasten das Budget.",
          impact: { cashEUR: 5000, profitLossEUR: 5000 }
        },
        {
          title: "Energiekosten-Rückerstattung eingegangen",
          text: "Der Energieversorger erstattet 7.500 Euro aufgrund einer Fehlberechnung. Die unerwartete Gutschrift verbessert kurzfristig die Liquiditätslage.",
          impact: { cashEUR: 7500, profitLossEUR: 7500 }
        }
      ],
      "-": [
        {
          title: "Mahngebühren durch verspätete Zahlung",
          text: "Eine übersehene Lieferantenrechnung verursacht Mahngebühren von 2.500 Euro. Die zusätzlichen Kosten belasten minimal das Monatsergebnis.",
          impact: { cashEUR: -2500, profitLossEUR: -2500 }
        },
        {
          title: "Bankgebühren unerwartet erhöht",
          text: "Die Hausbank erhöht die Kontoführungsgebühren um monatlich 800 Euro. Die laufenden Kosten steigen leicht und schmälern die Marge.",
          impact: { cashEUR: -800, profitLossEUR: -9600 }
        },
        {
          title: "Kleine Forderung wird uneinbringlich",
          text: "Ein Kleinkunde meldet Insolvenz an, 8.000 Euro Außenstände sind verloren. Die Abschreibung belastet das Quartalsergebnis geringfügig.",
          impact: { cashEUR: 0, profitLossEUR: -8000 }
        },
        {
          title: "Zinsanpassung verteuert Kontokorrent minimal",
          text: "Die Bank erhöht den Kontokorrentzins um 0,5 Prozentpunkte. Die Finanzierungskosten steigen jährlich um etwa 10.000 Euro.",
          impact: { profitLossEUR: -10000, bankTrust: -0.2 }
        },
        {
          title: "Softwarelizenz-Nachzahlung fällig",
          text: "Eine Lizenzprüfung ergibt eine Nachzahlungspflicht von 6.000 Euro. Die ungeplante Ausgabe belastet kurzfristig die Liquidität.",
          impact: { cashEUR: -6000, profitLossEUR: -6000 }
        }
      ]
    },
    mid: {
      "+": [
        {
          title: "Fördermittel für Digitalisierung bewilligt",
          text: "Das Wirtschaftsministerium bewilligt 150.000 Euro Förderung für ein Digitalisierungsprojekt. Die Investitionskraft steigt deutlich ohne Eigenkapitalbelastung.",
          impact: { cashEUR: 150000, bankTrust: 2 }
        },
        {
          title: "Verkauf alter Maschinen bringt Erlös",
          text: "Der Verkauf ausgemusterter Produktionsanlagen erzielt 85.000 Euro Erlös. Die Liquidität verbessert sich spürbar für geplante Neuanschaffungen.",
          impact: { cashEUR: 85000, profitLossEUR: 45000 }
        },
        {
          title: "Steuervorauszahlung deutlich reduziert",
          text: "Das Finanzamt senkt die Vorauszahlungen um 120.000 Euro jährlich. Die monatliche Liquidität verbessert sich um 10.000 Euro.",
          impact: { cashEUR: 30000, bankTrust: 1.5 }
        },
        {
          title: "Versicherung zahlt Schadensfall vollständig",
          text: "Die Versicherung erstattet 75.000 Euro für einen Maschinenschaden komplett. Die befürchtete Eigenbelastung entfällt und sichert die Planungssicherheit.",
          impact: { cashEUR: 75000, profitLossEUR: 0 }
        },
        {
          title: "Zinssatz-Swap spart erhebliche Kosten",
          text: "Ein günstig abgeschlossener Zinsswap reduziert die Finanzierungskosten um 60.000 Euro jährlich. Die verbesserte Kostenbasis stärkt die Wettbewerbsfähigkeit.",
          impact: { profitLossEUR: 60000, bankTrust: 1 }
        }
      ],
      "-": [
        {
          title: "Großkunde zahlt verspätet",
          text: "Ein wichtiger Kunde verschiebt die Zahlung von 200.000 Euro um zwei Monate. Die Liquiditätsplanung muss kurzfristig angepasst werden.",
          impact: { cashEUR: -200000, bankTrust: -1 }
        },
        {
          title: "Unerwartete Steuernachzahlung fällig",
          text: "Das Finanzamt fordert 95.000 Euro Gewerbesteuernachzahlung für das Vorjahr. Die ungeplante Belastung erfordert Inanspruchnahme des Kontokorrentkredits.",
          impact: { cashEUR: -95000, profitLossEUR: -95000 }
        },
        {
          title: "Währungsverluste bei Export-Geschäft",
          text: "Der schwache Dollar verursacht Kursverluste von 70.000 Euro bei US-Geschäften. Die Exportmarge sinkt deutlich unter die Planwerte.",
          impact: { profitLossEUR: -70000, bankTrust: -0.5 }
        },
        {
          title: "Leasingrate wird deutlich teurer",
          text: "Die Leasinggesellschaft erhöht die Raten für den Fuhrpark um 40.000 Euro jährlich. Die laufenden Kosten übersteigen das geplante Budget erheblich.",
          impact: { cashEUR: -3333, profitLossEUR: -40000 }
        },
        {
          title: "Rechtsstreit verursacht hohe Anwaltskosten",
          text: "Ein Patentstreit erfordert eine Rückstellung von 80.000 Euro für Rechtskosten. Das Jahresergebnis wird voraussichtlich deutlich belastet.",
          impact: { profitLossEUR: -80000, bankTrust: -1.5 }
        }
      ]
    },
    high: {
      "+": [
        {
          title: "Großauftrag vorzeitig komplett bezahlt",
          text: "Ein Neukunde zahlt überraschend 2,5 Millionen Euro Projektvolumen als Vorauskasse. Die Liquidität und Kreditwürdigkeit verbessern sich drastisch.",
          impact: { cashEUR: 2500000, bankTrust: 5 }
        },
        {
          title: "Verkauf Firmengrundstück bringt Millionenerlös",
          text: "Ein ungenutztes Betriebsgrundstück wird für 3,2 Millionen Euro verkauft. Der Erlös ermöglicht schuldenfreie Expansion in neue Märkte.",
          impact: { cashEUR: 3200000, profitLossEUR: 1800000 }
        }
      ],
      "-": [
        {
          title: "Millionenverlust durch Betrugsskandal",
          text: "Ein leitender Mitarbeiter bei einem Partner hat über Jahre Gelder veruntreut, wir erleiden einen Schaden von 2,5 Millionen Euro.",
          impact: { cashEUR: -2500000, profitLossEUR: -2500000, bankTrust: -8 }
        },
        {
          title: "Währungsabsicherung verursacht Millionenverlust",
          text: "Fehlerhafte Devisentermingeschäfte führen zu Verlusten von 1,8 Millionen Euro. Das Eigenkapital ist nahezu aufgezehrt und Insolvenz droht.",
          impact: { profitLossEUR: -1800000, bankTrust: -7 }
        },
        {
          title: "Kunde meldet Insolvenz an",
          text: "Der A- Kunde mit 1,2 Millionen Euro Außenständen meldet Insolvenz an. Die Forderungsausfälle bedrohen die eigene Zahlungsfähigkeit akut.",
          impact: { cashEUR: 0, profitLossEUR: -1200000, bankTrust: -9 }
        },
        {
          title: "Steuernachforderung in Millionenhöhe",
          text: "Eine Betriebsprüfung ergibt Steuernachforderungen von 1,2 Millionen Euro sofort fällig. Die Liquidität reicht nicht aus, eine Stundung wird abgelehnt.",
          impact: { cashEUR: -1200000, profitLossEUR: -1200000, bankTrust: -6 }
        }
      ]
    }
  },
  kunden: {
    low: {
      "+": [
        {
          title: "Kleinkunde empfiehlt Unternehmen weiter",
          text: "Ein zufriedener Kunde gewinnt zwei neue Interessenten durch persönliche Empfehlung. Die Akquisitionskosten sinken und das Image verbessert sich lokal.",
          impact: { customerLoyalty: 1, publicPerception: 0.5 }
        },
        {
          title: "Positive Produktbewertung online",
          text: "Ein Kunde veröffentlicht eine 5-Sterne-Bewertung auf einer Branchenplattform. Die Online-Reputation verbessert sich schrittweise.",
          impact: { customerLoyalty: 0.5, publicPerception: 1 }
        },
        {
          title: "Stammkunde verlängert Rahmenvertrag",
          text: "Ein langjähriger Kunde verlängert seinen Jahresvertrag über 50.000 Euro vorzeitig. Die Planungssicherheit für das kommende Quartal steigt.",
          impact: { customerLoyalty: 2, profitLossEUR: 5000 }
        },
        {
          title: "Kunde lobt Kundenservice öffentlich",
          text: "Ein Geschäftskunde bedankt sich per LinkedIn-Post für exzellenten Support. Die Sichtbarkeit in der Zielgruppe erhöht sich positiv.",
          impact: { customerLoyalty: 1.5, publicPerception: 1 }
        },
        {
          title: "Testauftrag von Neukunden erfolgreich",
          text: "Ein potenzieller Großkunde ist mit dem Testauftrag sehr zufrieden. Die Chancen auf einen Jahresvertrag steigen deutlich.",
          impact: { customerLoyalty: 1, profitLossEUR: 3000 }
        }
      ],
      "-": [
        {
          title: "Kunde beschwert sich über Lieferverzug",
          text: "Ein Kleinauftrag wird drei Tage zu spät geliefert und der Kunde ist verärgert. Die Kundenbeziehung ist leicht belastet, aber nicht gefährdet.",
          impact: { customerLoyalty: -1, profitLossEUR: -500 }
        },
        {
          title: "Negative Bewertung auf Google",
          text: "Ein unzufriedener Kunde hinterlässt eine 2-Sterne-Bewertung wegen mangelnder Beratung. Die Online-Reputation verschlechtert sich minimal.",
          impact: { customerLoyalty: -0.5, publicPerception: -0.5 }
        },
        {
          title: "Kleinkunde wechselt zum Wettbewerber",
          text: "Ein Kunde mit 30.000 Euro Jahresumsatz kündigt und wechselt zur Konkurrenz. Der Verlust ist verkraftbar, aber ein schlechtes Signal.",
          impact: { customerLoyalty: -1.5, profitLossEUR: -30000 }
        },
        {
          title: "Reklamation wegen Qualitätsmangel",
          text: "Ein Kunde reklamiert kleinere Mängel an einer Lieferung im Wert von 10.000 Euro. Die Nachbesserung verursacht zusätzliche Kosten und Imageschaden.",
          impact: { customerLoyalty: -1, profitLossEUR: -10000 }
        },
        {
          title: "Kunde kritisiert Preiserhöhung",
          text: "Ein Stammkunde droht mit Auftragsstopp wegen einer Preiserhöhung. Die Verhandlungen gestalten sich schwierig und zeitintensiv.",
          impact: { customerLoyalty: -2, profitLossEUR: -1000 }
        }
      ]
    },
    mid: {
      "+": [
        {
          title: "Mittelständler wird Exklusivkunde",
          text: "Ein regionaler Mittelständler unterzeichnet einen Exklusivvertrag über 500.000 Euro jährlich. Die Auslastung der Produktion ist für zwölf Monate gesichert.",
          impact: { customerLoyalty: 5, profitLossEUR: 50000 }
        },
        {
          title: "Branchenverband empfiehlt Unternehmen",
          text: "Der Fachverband nimmt das Unternehmen in seine Lieferantenempfehlung auf. Die Anfragen von Neukunden steigen.",
          impact: { customerLoyalty: 4, publicPerception: 5 }
        },
        {
          title: "Großkunde verdoppelt Bestellvolumen",
          text: "Ein wichtiger Kunde erhöht seine Jahresbestellung von 300.000 auf 600.000 Euro.",
          impact: { customerLoyalty: 6, profitLossEUR: 30000 }
        },
        {
          title: "Erfolgreiche Produktpräsentation auf Messe",
          text: "Die Messeteilnahme generiert 15 qualifizierte Leads mit Potenzial von 2 Millionen Euro. Die Vertriebspipeline füllt sich vielversprechend für die nächsten Quartale.",
          impact: { customerLoyalty: 3, publicPerception: 3 }
        },
        {
          title: "Kunde gewinnt Innovationspreis mit Produkt",
          text: "Ein Kunde erhält einen Branchenpreis für ein Produkt mit unseren Komponenten. Die Referenz stärkt die Marktposition erheblich.",
          impact: { customerLoyalty: 4, publicPerception: 6 }
        }
      ],
      "-": [
        {
          title: "Wichtiger Kunde droht mit Vertragskündigung",
          text: "Ein Kunde mit 400.000 Euro Jahresumsatz ist unzufrieden mit der Servicequalität. Intensive Krisengespräche sind erforderlich, um den Kunden zu halten.",
          impact: { customerLoyalty: -5, profitLossEUR: -20000 }
        },
        {
          title: "Sammelklage wegen Produktfehler angedroht",
          text: "Mehrere Kunden drohen mit rechtlichen Schritten wegen wiederkehrender Qualitätsprobleme. Die Rechtsabteilung prüft Haftungsrisiken von bis zu 300.000 Euro.",
          impact: { customerLoyalty: -6, publicPerception: -4 }
        },
        {
          title: "Negativer Testbericht in Fachzeitschrift",
          text: "Eine Branchenpublikation bewertet das Hauptprodukt als mangelhaft im Vergleichstest. Die Neukundengewinnung wird erheblich erschwert.",
          impact: { customerLoyalty: -4, publicPerception: -5 }
        },
        {
          title: "Großauftrag an Konkurrenz verloren",
          text: "Ein sicher geglaubter Auftrag über 80.000 Euro geht an den Wettbewerber. Die Jahresplanung muss nach unten korrigiert werden.",
          impact: { customerLoyalty: -3, profitLossEUR: -80000 }
        },
        {
          title: "Kunde storniert Großbestellung",
          text: "Ein Kunde zieht eine Bestellung über 250.000 Euro wegen Projektverzögerung zurück. Die bereits produzierte Ware muss eingelagert werden.",
          impact: { customerLoyalty: -4, cashEUR: -50000 }
        }
      ]
    },
    high: {
      "+": [
        {
          title: "Konzern wird strategischer Partner",
          text: "Ein DAX-Konzern unterzeichnet eine strategische Partnerschaft über 5 Jahre. Das Auftragsvolumen von 10 Millionen Euro sichert nachhaltiges Wachstum.",
          impact: { customerLoyalty: 10,  publicPerception: 8, bankTrust: 5 }
        },
        {
          title: "Exklusivlieferant für Großprojekt",
          text: "Das Unternehmen wird alleiniger Lieferant für ein 15-Millionen-Euro-Infrastrukturprojekt. Die Referenz öffnet Türen zu weiteren Großaufträgen.",
          impact: { customerLoyalty: 8, bankTrust: 5, publicPerception: 8 }
        },
        {
          title: "Internationaler Großkonzern als Neukunde",
          text: "Ein Fortune-500-Unternehmen bestellt erstmals für 6 Millionen Euro. Die internationale Reputation steigt enorm und weitere Märkte öffnen sich.",
          impact: { customerLoyalty: 10, bankTrust: 5, publicPerception: 10 }
        },
        {
          title: "Kunde verdreifacht Rahmenvertrag",
          text: "Der größte Bestandskunde erhöht sein Kontingent von 3 auf 4 Millionen Euro. Die Produktionskapazitäten müssen erweitert werden.",
          impact: { customerLoyalty: 8, profitLossEUR: 100000, bankTrust: 3 }
        }
      ],
      "-": [
        {
          title: "Größter Kunde kündigt sofort",
          text: "Ein Kunde beendet die Zusammenarbeit fristlos.",
          impact: { customerLoyalty: -4, profitLossEUR: -50000, bankTrust: -2 }
        },
        {
          title: "Kartellamt untersagt Großkundenprojekt",
          text: "Die Wettbewerbsbehörde verbietet eine geplante Kooperation im Wert von 12 Millionen Euro. Die Expansionspläne sind gescheitert und Investitionen verloren.",
          impact: { customerLoyalty: -1, bankTrust: -4 , publicPerception: -4 }
        },
        {
          title: "Produktrückruf bei allen Großkunden",
          text: "Ein kritischer Sicherheitsmangel erfordert Rückruf von Produkten. Der Reputationsschaden ist immens und Klagen drohen.",
          impact: { customerLoyalty: -9, bankTrust: -2, publicPerception: -10 }
        },
        {
          title: "Schadensersatzklage in Millionenhöhe",
          text: "Ein Kunde verklagt auf 190.000 Euro Schadensersatz wegen Lieferausfällen. Der Rechtsstreit bedroht die finanzielle Stabilität.",
          impact: { customerLoyalty: -2, profitLossEUR: -190000, publicPerception: -2 }
        }
      ]
    }
  },
  belegschaft: {
    low: {
      "+": [
        {
          title: "Team gewinnt internen Innovationswettbewerb",
          text: "Die Entwicklungsabteilung erhält 5.000 Euro Prämie für eine Prozessverbesserung. Die Motivation im Team steigt spürbar.",
          impact: { workforceEngagement: 2, profitLossEUR: 10000 }
        },
        {
          title: "Mitarbeiter absolviert erfolgreiche Weiterbildung",
          text: "Ein Produktionsmitarbeiter qualifiziert sich zum Schichtleiter. Die interne Aufstiegsmöglichkeit motiviert andere Kollegen.",
          impact: { workforceEngagement: 1.5, profitLossEUR: 2000 }
        },
        {
          title: "Betriebsausflug stärkt Teamgeist",
          text: "Der jährliche Betriebsausflug wird von 95 Prozent der Belegschaft besucht werden. Die abteilungsübergreifende Zusammenarbeit verbessert sich.",
          impact: { workforceEngagement: 1, publicPerception: 0.5 }
        },
        {
          title: "Azubi erhält Auszeichnung",
          text: "Eine Auszubildende wird Landesbeste in ihrem Ausbildungsberuf. Das Unternehmen profitiert vom positiven Image als Ausbildungsbetrieb.",
          impact: { workforceEngagement: 1, publicPerception: 1.5 }
        }
      ],
      "-": [
        {
          title: "Krankenstand leicht erhöht",
          text: "Die Krankheitsquote steigt diesen Monat auf 8 Prozent durch Grippewelle. Einzelne Projekte verzögern sich um wenige Tage.",
          impact: { workforceEngagement: -1, profitLossEUR: -5000 }
        },
        {
          title: "Mitarbeiter kündigt nach Konflikt",
          text: "Ein erfahrener Mitarbeiter verlässt nach Meinungsverschiedenheiten das Unternehmen. Die Nachbesetzung wird einige Wochen dauern.",
          impact: { workforceEngagement: -1.5, profitLossEUR: -8000 }
        },
        {
          title: "Parkplatzmangel sorgt für Unmut",
          text: "Beschwerden über fehlende Mitarbeiterparkplätze häufen sich. Die Stimmung in der Frühschicht ist merklich gereizt.",
          impact: { workforceEngagement: -1, publicPerception: -0.5 }
        },
        {
          title: "Kantine erhöht Preise",
          text: "Die Essenspreise in der Betriebskantine steigen um 15 Prozent. Viele Mitarbeiter sind verärgert über die Mehrkosten.",
          impact: { workforceEngagement: -1.5, cashEUR: 2000 }
        },
        {
          title: "Urlaubssperre sorgt für Frustration",
          text: "Eine kurzfristige Urlaubssperre wegen Auftragsspitze verärgert  Mitarbeitende. Die Überstundenberge wachsen weiter an.",
          impact: { workforceEngagement: -2, profitLossEUR: -3000 }
        }
      ]
    },
    mid: {
      "+": [
        {
          title: "Gesundheitsprogramm senkt Krankenstand",
          text: "Das neue Betriebssportprogramm reduziert den Krankenstand um 30 Prozent. Die Produktivität steigt und Kosten sinken.",
          impact: { workforceEngagement: 4, profitLossEUR: 40000 }
        },
        {
          title: "Top-Experte wechselt vom Wettbewerber",
          text: "Ein renommierter Branchenexperte verstärkt das Entwicklungsteam. Das Know-how und die Innovationskraft steigen erheblich.",
          impact: { workforceEngagement: 3, customerLoyalty: 2 }
        }
      ],
      "-": [
        {
          title: "Abteilungsleiter kündigen gemeinsam",
          text: "Drei Abteilungsleiter verlassen frustriert das Unternehmen zum Monatsende. Die Führungskrise destabilisiert mehrere Teams.",
          impact: { workforceEngagement: -5, profitLossEUR: -60000 }
        },
        {
          title: "Mobbing-Vorwürfe erschüttern Betriebsklima",
          text: "Schwere Mobbing-Vorwürfe gegen eine Führungskraft werden öffentlich. Das Betriebsklima ist nachhaltig beschädigt.",
          impact: { workforceEngagement: -5, publicPerception: -4 }
        },
        {
          title: "Arbeitsunfall mit mehreren Verletzten",
          text: "Ein Sicherheitsversäumnis führt zu einem Unfall mit drei Schwerverletzten. Die Berufsgenossenschaft ermittelt und Strafen drohen.",
          impact: { workforceEngagement: -6, publicPerception: -5, profitLossEUR: -100000 }
        }
      ]
    },
    high: {
      "+": [
        {
          title: "Unternehmen wird Arbeitgeber des Jahres",
          text: "Eine nationale Auszeichnung als bester Mittelstandsarbeitgeber wird verliehen. Die Bewerberzahlen verfünffachen sich innerhalb weniger Wochen.",
          impact: { workforceEngagement: 4, publicPerception: 6, bankTrust: 3 }
        },
        {
          title: "Mitarbeiterbeteiligung hilft Unternehmen",
          text: "Die Belegschaft investiert 100000  Euro eigenes Kapital ins Unternehmen. Die drohende Insolvenz wird abgewendet und alle Arbeitsplätze gesichert.",
          impact: { workforceEngagement: 10, cashEUR: 100000, bankTrust: 5 }
        },
        {
          title: "Revolutionäre Erfindung durch Mitarbeiter",
          text: "Ein Entwicklerteam meldet ein bahnbrechendes Patent an.",
          impact: { workforceEngagement: 8, bankTrust: 3, publicPerception: 9 }
        }
      ],
      "-": [
        {
          title: "Kernteam gründet Konkurrenzunternehmen",
          text: "Einige erfahrene Mitarbeitende aus der Entwicklung machen sich selbstständig. Der Wissensverlust ist enorm.",
          impact: { workforceEngagement: -4, customerLoyalty: -4,  bankTrust: -3 }
        },
        {
          title: "Korruptionsskandal",
          text: "Ermittlungen decken  Veruntreuung durch Führungskräfte auf. Das Vertrauen der Belegschaft ist beschädigt.",
          impact: { workforceEngagement: -4, publicPerception: -4, bankTrust: -3 }
        },
        {
          title: "Wilder Streik legt Produktion lahm",
          text: "Ein spontaner Streik stoppt die gesamte Produktion für unbestimmte Zeit.Verluste durch Vertragsstrafen drohen.",
          impact: { workforceEngagement: -4, customerLoyalty: -6, bankTrust: -3, profitLossEUR: -50000 }
        },
        {
          title: "Sabotage zerstört Produktionsanlage",
          text: "Ein entlassener Mitarbeiter sabotiert Maschinen im Wert von 300000 Million Euro. Der Produktionsausfall gefährdet Kundenaufträge.",
          impact: { profitLossEUR: -300000, customerLoyalty: -7 }
        }
      ]
    }
  },
  oeffentlichkeit: {
    low: {
      "+": [
        {
          title: "Lokale Zeitung berichtet positiv",
          text: "Ein Artikel würdigt das soziale Engagement des Unternehmens in der Region. Das lokale Ansehen verbessert sich spürbar.",
          impact: { publicPerception: 2, workforceEngagement: 0.5 }
        },
        {
          title: "Sponsoring des Stadtfests",
          text: "Das Unternehmen unterstützt das Stadtfest mit 10.000 Euro. Die Sichtbarkeit und Sympathie in der Region steigen.",
          impact: { publicPerception: 1.5, customerLoyalty: 0.5 }
        },
        {
          title: "Umweltzertifikat erhalten",
          text: "Das Unternehmen erhält ein regionales Umweltzertifikat für Nachhaltigkeit. Das grüne Image wird gestärkt.",
          impact: { publicPerception: 1, bankTrust: 0.3 }
        },
        {
          title: "Azubi-Projekt gewinnt Regionalpreis",
          text: "Ein Ausbildungsprojekt wird von der IHK ausgezeichnet. Die Attraktivität als Ausbildungsbetrieb steigt.",
          impact: { publicPerception: 1.5, workforceEngagement: 1 }
        },
        {
          title: "Charity-Aktion sammelt Spenden",
          text: "Mitarbeiter sammeln 5.000 Euro für lokales Kinderhospiz. Das soziale Engagement wird öffentlich gewürdigt.",
          impact: { publicPerception: 1, workforceEngagement: 1.5 }
        }
      ],
      "-": [
        {
          title: "Lärmbeschwerde von Anwohnern",
          text: "Nachbarn beschweren sich über nächtlichen Lieferverkehr. Das Verhältnis zur Nachbarschaft ist leicht belastet.",
          impact: { publicPerception: -1, workforceEngagement: -0.5 }
        },
        {
          title: "Kritik an Verkehrsbelastung",
          text: "Die Gemeinde moniert erhöhtes LKW-Aufkommen durch das Werk. Gespräche über Verkehrskonzepte werden notwendig.",
          impact: { publicPerception: -1.5, profitLossEUR: -2000 }
        },
        {
          title: "Negativ-Kommentare in sozialen Medien",
          text: "Ein unzufriedener Ex-Mitarbeiter postet kritische Kommentare auf LinkedIn. Die Online-Reputation leidet leicht.",
          impact: { publicPerception: -1, workforceEngagement: -1 }
        },
        {
          title: "Geruchsbelästigung gemeldet",
          text: "Anwohner melden unangenehme Gerüche aus der Produktion. Das Ordnungsamt kündigt Kontrollen an.",
          impact: { publicPerception: -2, profitLossEUR: -5000 }
        },
        {
          title: "Sponsoring-Absage sorgt für Kritik",
          text: "Der Rückzug vom Sponsoring des örtlichen Sportvereins wird kritisiert. Das lokale Ansehen verschlechtert sich.",
          impact: { publicPerception: -1.5, customerLoyalty: -0.5 }
        }
      ]
    },
    mid: {
      "+": [
        {
          title: "TV-Bericht über Innovationskraft",
          text: "Ein überregionaler Fernsehsender berichtet prime-time über das Unternehmen. Die Bekanntheit steigt deutschlandweit erheblich.",
          impact: { publicPerception: 5, customerLoyalty: 3 }
        },
        {
          title: "Nachhaltigkeitspreis gewonnen",
          text: "Das Unternehmen erhält einen nationalen Preis für nachhaltige Produktion. ESG-orientierte Investoren zeigen verstärkt Interesse.",
          impact: { publicPerception: 6, bankTrust: 3 }
        },
        {
          title: "Politiker lobt Unternehmen öffentlich",
          text: "Der Wirtschaftsminister besucht das Werk und lobt es als Vorzeigeunternehmen. Die politische Unterstützung öffnet neue Türen.",
          impact: { publicPerception: 4, bankTrust: 2 }
        },
        {
          title: "Stiftung für Bildung gegründet",
          text: "Das Unternehmen gründet eine Stiftung mit 500.000 Euro Startkapital. Das gesellschaftliche Engagement wird überregional gewürdigt.",
          impact: { publicPerception: 5, workforceEngagement: 3 }
        },
        {
          title: "Doku zeigt Unternehmen als Vorreiter",
          text: "Eine Wirtschaftsdokumentation präsentiert das Unternehmen als Branchenvorreiter. Die Reputation steigt national und international.",
          impact: { publicPerception: 6, customerLoyalty: 4 }
        }
      ],
      "-": [
        {
          title: "Umweltskandal aufgedeckt",
          text: "Journalisten decken illegale Entsorgung von Chemikalien auf. Behörden ermitteln und das Image ist  beschädigt.",
          impact: { publicPerception: -2, bankTrust: -3, profitLossEUR: -40000 }
        },
        {
          title: "Shitstorm nach Entlassungen",
          text: "Gerüchte über Stellenabbau löst massive Online-Proteste aus. Kunden drohen mit Boykott.",
          impact: { publicPerception: -5, customerLoyalty: -3 }
        },
        {
          title: "Datenschutzverletzung wird publik",
          text: "Ein Datenleck betrifft  Kundendaten und wird öffentlich. DSGVO-Strafen und Schadensersatzforderungen drohen.",
          impact: { publicPerception: -4, customerLoyalty: -5, profitLossEUR: -50000 }
        },
        {
          title: "NGO startet Kampagne gegen Firma",
          text: "Umweltaktivisten protestieren vor dem Werkstor und in sozialen Medien. Die Negativ-PR schadet dem Markenimage erheblich.",
          impact: { publicPerception: -6, workforceEngagement: -2 }
        }
      ]
    },
    high: {
      "+": [
        {
          title: "Verbände zeichnet Unternehmen aus",
          text: "Wirtschaftsverbände verleihen einen Preis für nachhaltige Entwicklung. Das Unternehmen wird zum  Vorbild.",
          impact: { publicPerception: 4, customerLoyalty: 4, bankTrust: 3 }
        },
        {
          title: "Positive Cover-Story über CEO",
          text: "Der Geschäftsführer wird als Visionär präsentiert. Die Reputation erreicht neue Höhen.",
          impact: { publicPerception: 4, bankTrust: 3, customerLoyalty: 4 }
        }
      ],
      "-": [
        {
          title: "Staatsanwaltschaft durchsucht Zentrale",
          text: "Razzia wegen Verdacht auf Steuerhinterziehung in Millionenhöhe erschüttert das Unternehmen. Der Reputationsschaden ist groß.",
          impact: { publicPerception: -5, bankTrust: -5, customerLoyalty: -5 }
        },
        {
          title: "Tödlicher Produktfehler aufgedeckt",
          text: "Ein Produktmangel wird mit mehreren Todesfällen in Verbindung gebracht. Klagen drohen.",
          impact: { publicPerception: -5, customerLoyalty: -5, profitLossEUR: -500000 }
        },
        {
          title: "EU ermittelt",
          text: "Kartellverstöße könnten zu Strafen führen. Das Unternehmen steht am Pranger.",
          impact: { publicPerception: -8, bankTrust: -6 }
        }
      ]
    }
  }
};
