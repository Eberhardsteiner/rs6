// src/components/setup/OnboardingMSM.tsx
import React from 'react';
import { company } from '@/data/companyProfile';
import type { RoleId, KPI } from '@/core/models/domain';
import { kpiHelp } from '@/services/tooltips';
import '@/styles/onboarding.css';

type Props = { 
  onStart: () => void; 
  onShowModal: (type: 'privacy' | 'imprint' | 'disclaimer' | null) => void 
};

type RoleMeta = {
  id: RoleId;
  title: string;
  short: string;
  mandate: string[];
  redLines: string[];
  hiddenAgenda: string[];
};

const ROLES: RoleMeta[] = [
  {
    id: 'CEO',
    title: 'CEO – Gesamtverantwortung & Narrativ',
    short: 'Stakeholderführung, „no surprises", Beirat/Bank, Meilensteine.',
    mandate: [
      'Gesamtausrichtung & Prioritäten',
      'Externe Kommunikation (Kunden/Bank/Presse)',
      'Beirat/Bankdialog, Meilensteine verantworten'
    ],
    redLines: ['Keine Irreführung; keine ungedeckten Zusagen', 'Keine Alleingänge gegen Governance'],
    hiddenAgenda: ['Vertrauen sichtbar erhöhen (Beirat, Meilensteine, S&L)', 'Key-Accounts persönlich binden']
  },
  {
    id: 'CFO',
    title: 'CFO – Liquidität & Bank',
    short: 'Runway, Payment-Regeln, Reporting, 13-Wochen-Plan, Covenants.',
    mandate: [
      'Runway sichern, Zahlungspriorisierung',
      '13-Wochen-Plan, Covenants & Reporting (Daily/Weekly)',
      'Stundungen/Factoring/Working Capital'
    ],
    redLines: ['Keine Intransparenz im Cash', 'Dokumentierte Gleichbehandlung; keine „Beziehungszahlungen"'],
    hiddenAgenda: ['Disziplin demonstrieren (Treasury-Board, Limits)', 'Bankvertrauen messbar steigern']
  },
  {
    id: 'OPS',
    title: 'Leitung Beschaffung & Produktion – Durchsatz',
    short: 'Materialverfügbarkeit, Produktionsmix, Qualität/Termintreue.',
    mandate: [
      'Lieferantenverträge, Materialverfügbarkeit',
      'Produktionsmix & Engpassmanagement',
      'Qualität & Pönalen vermeiden'
    ],
    redLines: ['Keine ungesicherte Vorkasse ohne DB-Schwelle/Anderkonto', 'Kein Qualitätsabfall'],
    hiddenAgenda: ['DB-starken Mix fahren, A-Kunden stabil halten', 'Engpasskapazitäten temporär extern brücken']
  },
  {
    id: 'HRLEGAL',
    title: 'Leitung Personal & Recht – Stabilität & Compliance',
    short: 'Interne Kommunikation, Kurzarbeit/BV, BR, Whistleblowing/DSGVO.',
    mandate: ['Townhall/FAQ, BR-Einbindung, Kurzarbeit/BV', 'Whistleblowing, Datenschutz, Gleichbehandlung'],
    redLines: ['Kein arbeits- oder datenschutzrechtlicher Blindflug', 'Keine „Maulkörbe"'],
    hiddenAgenda: ['Vertrauen im Haus sichern (Lohnsicherheit, Fairness)', 'Reputationsrisiken präventiv senken']
  }
];

/** Kleine, ruhige Sparkline */
function Sparkline({
  value, min, max, width = 120, height = 22, strokeWidth = 2, ariaLabel
}: {
  value: number; min: number; max: number; width?: number; height?: number; strokeWidth?: number; ariaLabel?: string;
}) {
  const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));
  const norm = (v: number) => (max === min ? 0.5 : clamp((v - min) / (max - min), 0, 1));
  const y = height - norm(value) * height;
  const pts = 12;
  const step = width / (pts - 1);
  const d = Array.from({ length: pts }, (_, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${y}`).join(' ');
  return (
    <svg className="ob-spark" width={width} height={height} role="img" aria-label={ariaLabel ?? 'Sparkline'}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Formatierer */
const fmtEUR = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const fmtInt = (n: number) => Math.round(n).toLocaleString('de-DE');

/** plausible Ranges für Mini-Sparklines */
const KPI_RANGES: Record<keyof KPI, { min: number; max: number; unit: 'eur' | 'pts' }> = {
  cashEUR: { min: -200_000, max: 400_000, unit: 'eur' },
  profitLossEUR: { min: -200_000, max: 200_000, unit: 'eur' },
  customerLoyalty: { min: 0, max: 100, unit: 'pts' },
  bankTrust: { min: 0, max: 100, unit: 'pts' },
  workforceEngagement: { min: 0, max: 100, unit: 'pts' },
  publicPerception: { min: 0, max: 100, unit: 'pts' }
};

const EXTENDED_STORY = `
APS ist ein eigentümergeführter Auftragsfertiger für hochspezialisierte Chemie- und Pharmapumpen.
Die Nachfrage ist grundsätzlich robust, doch mehrere Sondereffekte haben die Liquidität kurzfristig belastet:
ein Serienhochlauf mit hoher Materialvorfinanzierung, ein temporärer Qualitätsvorfall und parallele Projektverzögerungen
bei zwei A-Kunden. Gleichzeitig hat die Kreditversicherung Limits reduziert; einige Lieferanten verlangen Vorkasse.
Die Hausbank fordert belastbares Reporting und sichtbare Maßnahmen. In dieser Simulation steuern Sie die nächsten 14 Tage:
Sie priorisieren Zahlungen, sichern Durchsatz und stabilisieren die Organisation – mit klaren Trade-offs und Dilemmata.
`;

/** Eine Kachel im KPI-Cockpit */
function KpiMini({ label, keyName, value, help }: { label: string; keyName: keyof KPI; value: number; help: string }) {
  const range = KPI_RANGES[keyName];
  const valText = range.unit === 'eur' ? fmtEUR(value) : `${fmtInt(value)} Punkte`;
  return (
    <div className="ob-kpi">
      <div className="ob-kpi-top">
        <div className="ob-kpi-title tooltip">
          <strong>{label}</strong>
          <span className="tip">{help}</span>
        </div>
        <div className="ob-kpi-val">{valText}</div>
      </div>
      <div className="ob-kpi-bottom">
        <Sparkline value={value} min={range.min} max={range.max} ariaLabel={`Sparkline für ${label} (Startwert)`} />
      </div>
    </div>
  );
}

export default function OnboardingMSM({ onStart, onShowModal }: Props) {
  // --- State ---
  const [showDetailsFor, setShowDetailsFor] = React.useState<RoleId | null>(null);
  const [storyOpen, setStoryOpen] = React.useState(false);

  const k = ((globalThis as any).__previewKPI as KPI) || company.initialKPI;

  const handleStart = () => {
    // Navigate to MultiAuthLogin
    onStart();
  };

  return (
    <div className="ob-root">
      {/* Header mit Logo */}
      <header className="ob-header">
        <div className="ob-header-inner">
          <img 
            src="https://uvm-akademie.de/logo.png" 
            alt="UVM Akademie Logo" 
            className="ob-logo"
          />
          <h1 className="ob-header-text">LQ14 – Liquiditätskrise MEHRSPIELERMODUS</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="ob-hero">
        <div className="ob-hero-inner">
          <h1 className="ob-hero-title">AURION Pumpen Systeme GmbH (APS)</h1>
        </div>
        <p className="ob-hero-sub">
          14 Tage Präzisionsarbeit in der Liquiditätskrise – entscheiden, erklären, stabilisieren.
        </p>
      </section>

      <div className="ob-grid">
        {/* Unternehmen & Situation */}
        <section className="ob-card ob-company">
          <header className="ob-card-h">
            <span className="ob-kicker">Unternehmen & Situation</span>
            <h2>Wer wir sind – und was ansteht</h2>
          </header>
          <div className="ob-company-body">
            <ul className="ob-facts">
              <li><strong>Branche:</strong> {company.industry}</li>
              <li><strong>Größe:</strong> {company.employees} Mitarbeitende</li>
              <li><strong>Standort:</strong> {company.location}</li>
            </ul>

            <p className="ob-story">{company.shortStory}</p>

            {/* Mehr anzeigen */}
            <div className={`ob-more ${storyOpen ? 'open' : ''}`}>
              <div className="ob-more-content">
                {EXTENDED_STORY.split('\n').map((ln, i) => ln.trim() ? <p key={i}>{ln.trim()}</p> : null)}
              </div>
              <button
                type="button"
                className="ob-more-btn"
                onClick={() => setStoryOpen(v => !v)}
                aria-expanded={storyOpen}
              >
                {storyOpen ? 'Weniger anzeigen' : 'Mehr anzeigen'}
              </button>
            </div>

            <div className="ob-hint-box" style={{ marginTop: 12 }}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="ob-ic">
                <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
              </svg>
              <div>
                <div className="ob-hint-title">Ziel der Simulation</div>
                <div className="ob-hint-text">
                  14 Tage handlungsfähig bleiben – ohne Zahlungsunfähigkeit. Entscheidungen wirken zeitverzögert und
                  werden erst beim Tageswechsel auf die KPI angewandt. Im Mehrspielermodus wählt jeder Spieler seine individuelle Rolle.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPI – volle Breite */}
        <section className="ob-card ob-kpi-wide">
          <header className="ob-card-h">
            <span className="ob-kicker">KPIs</span>
            <h2>Start-KPI (Vorschau)</h2>
            <div className="ob-kpi-note">Skalierung illustrativ • Tooltips per Hover</div>
          </header>

          <div className="ob-kpi-grid">
            <KpiMini label="Liquidität" keyName="cashEUR" value={k.cashEUR} help={kpiHelp.cashEUR} />
            <KpiMini label="Gewinn/Verlust" keyName="profitLossEUR" value={k.profitLossEUR} help={kpiHelp.profitLossEUR} />
            <KpiMini label="Kundentreue" keyName="customerLoyalty" value={k.customerLoyalty} help={kpiHelp.customerLoyalty} />
            <KpiMini label="Bankvertrauen" keyName="bankTrust" value={k.bankTrust} help={kpiHelp.bankTrust} />
            <KpiMini label="Belegschaft" keyName="workforceEngagement" value={k.workforceEngagement} help={kpiHelp.workforceEngagement} />
            <KpiMini label="Öffentliche Wahrnehmung" keyName="publicPerception" value={k.publicPerception} help={kpiHelp.publicPerception} />
          </div>
        </section>

        {/* Rollen – nur Anzeige, keine Auswahl */}
        <section className="ob-card ob-roles">
          <header className="ob-card-h">
            <span className="ob-kicker">Verfügbare Rollen</span>
            <h2>Rollenübersicht im Mehrspielermodus</h2>
            <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: 14 }}>
              Jeder Spieler wählt seine Rolle individuell beim Login.
            </p>
          </header>

          <div className="ob-role-grid">
            {ROLES.map((r) => {
              return (
                <div
                  key={r.id}
                  className="ob-role"
                  style={{ cursor: 'default' }}
                >
                  <div className="ob-role-head">
                    <span className="ob-role-badge">{r.id}</span>
                    <span className="ob-role-title">{r.title}</span>
                  </div>

                  <p className="ob-role-short">{r.short}</p>

                  <div className="ob-role-actions">
                    <span
                      className="ob-role-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDetailsFor(showDetailsFor === r.id ? null : r.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Details {showDetailsFor === r.id ? '–' : '+'}
                    </span>
                  </div>

                  {showDetailsFor === r.id && (
                    <div className="ob-role-details">
                      <div className="ob-role-col">
                        <div className="ob-sub">Mandat</div>
                        <ul>{r.mandate.map((m, i) => <li key={i}>{m}</li>)}</ul>
                      </div>
                      <div className="ob-role-col">
                        <div className="ob-sub">Rote Linien</div>
                        <ul>{r.redLines.map((m, i) => <li key={i}>{m}</li>)}</ul>
                      </div>
                      <div className="ob-role-col">
                        <div className="ob-sub">Hidden Agenda</div>
                        <ul>{r.hiddenAgenda.map((m, i) => <li key={i}>{m}</li>)}</ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Wichtige Hinweise – volle Breite */}
        <section className="ob-card ob-howto">
          <header className="ob-card-h">
            <span className="ob-kicker">Wichtige Hinweise</span>
            <h2>So funktioniert der Mehrspielermodus</h2>
          </header>
          <ul className="ob-howto-list">
            <li>
              <IconCheck /> <strong>Teamspiel:</strong> Jeder Spieler übernimmt eine spezifische Rolle mit eigenen Verantwortlichkeiten.
            </li>
            <li>
              <IconTimer /> <strong>Synchronisierung:</strong> Alle Spieler agieren in der gleichen Spielzeit. Entscheidungen werden gemeinsam wirksam.
            </li>
            <li>
              <IconGraph /> <strong>Geteilte KPIs:</strong> Die Auswirkungen aller Entscheidungen beeinflussen die gemeinsamen Unternehmens-KPIs.
            </li>
            <li>
              <IconDoc /> <strong>Kommunikation:</strong> Abstimmung zwischen den Rollen ist entscheidend für den Erfolg.
            </li>
          </ul>
        </section>

        {/* Start Button – Weiterleitung zu MultiAuthLogin */}
        <aside className="ob-start ob-card">
          <header className="ob-start-h">
            <h2>Mehrspielermodus starten</h2>
            <p>Weiterleitung zum Team-Login für die gemeinsame Simulation.</p>
          </header>

          <button className="ob-btn ob-btn-primary" onClick={handleStart}>
            Zum Mehrspielermodus
          </button>

          <div className="ob-start-note">
            Sie werden zum Login-Bereich weitergeleitet, wo jeder Spieler seine Rolle wählt und sich anmeldet.
          </div>
        </aside>
      </div>

      {/* Fußzeile */}
      <footer className="ob-footer">
        <div className="ob-footer-inner">
          <div className="ob-footer-copyright">
            © 2026 UVM-Institut Prof. Dr. Steiner & Prof. Dr. Landes Partnerschaftsgesellschaft www.uvm-cg.de info@uvm-institut.de
          </div>
          <div className="ob-footer-links">
            <button 
              className="ob-footer-link" 
              onClick={() => onShowModal('privacy')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Datenschutzerklärung
            </button>
            <button 
              className="ob-footer-link" 
              onClick={() => onShowModal('imprint')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Impressum
            </button>
            <button 
              className="ob-footer-link" 
              onClick={() => onShowModal('disclaimer')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Wichtiger Hinweis
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/** Kleine Inline-Icons (erben Farbe aus CSS) */
function IconCheck() {
  return (
    <svg className="ob-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}
function IconTimer() {
  return (
    <svg className="ob-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 1H9v2h6V1Zm-3 4a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 5Zm1 9H8v-2h5v2Z" />
    </svg>
  );
}
function IconGraph() {
  return (
    <svg className="ob-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3h2v18H3V3Zm16 4h2v14h-2V7ZM11 11h2v10h-2V11ZM7 15h2v6H7v-6Zm8-8h2v14h-2V7Z" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg className="ob-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6" />
      <path d="M8 13h8v2H8zm0 4h8v2H8zM8 9h4v2H8z" />
    </svg>
  );
}