import { CompanyProfile } from '@/core/models/domain';

export const company: CompanyProfile = {
  name: 'AURION Pumpen Systeme GmbH (APS)',
  industry: 'Sonderpumpen für Chemie/Pharma (Auftragsfertiger)',
  employees: 120,
  location: 'Süddeutschland',
  initialKPI: {
    cashEUR: 50000,
    profitLossEUR: -10000,
    customerLoyalty: 75,
    bankTrust: 60,
    workforceEngagement: 70,
    publicPerception: 68
  },
  openingBalanceEUR: 0,
  openingPLForecastEUR: -150000,
  shortStory:
    'APS ist überraschend in eine Liquiditätsfalle geraten: Kreditlinie wird gekürzt, kritische Lieferanten fordern Vorkasse, Lohnzahlung muss auf Tag 7  verschoben werden und USt. wird fällig. Ziel: 14 Tage handlungsfähig bleiben – ohne Zahlungsunfähigkeit.'
};