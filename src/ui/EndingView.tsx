// src/components/end/EndingView.tsx
import React, { useMemo, useCallback } from 'react';
import styles from './EndingView.module.css';
import { buildEndingViewModel } from '@/core/engine/ending_extras';
import { exportEndingPdf } from '@/services/pdf';
import type { GameState } from '@/core/engine/gameEngine';
import type { EndingId } from '@/core/engine/ending';
import DebriefingVideoModal from '@/components/dialogs/DebriefingVideoModal';
import DebriefButton from '@/components/exports/DebriefButton';
import { computeScoreFromState } from '@/core/engine/scoring';

// ────────────────────────────────────────────────────────────────────────────────
// Typen (angepasst an ending_extras)
// ────────────────────────────────────────────────────────────────────────────────
type ImpactItem = {
  day: number;
  role: string;
  blockId: string;
  optionId: string;
  optionLabel: string;
  delta: number; // +/- Wert in KPI-Einheit (z. B. €, Score)
};
type ImpactData = { positive: ImpactItem[]; negative: ImpactItem[] };

type EndingVM = ReturnType<typeof buildEndingViewModel>;

// Video URLs für Debriefing basierend auf Ending
const DEBRIEFING_VIDEOS: Record<EndingId, string> = {
  INSOLVENCY: 'https://uvm-akademie.de/UFIK/LQ/LQ1-15-schlecht.mp4',
  PROTECTIVE_SHIELD: 'https://uvm-akademie.de/UFIK/LQ/LQ1-15-neutral.mp4',
  FRAGILE_CONTINUATION: 'https://uvm-akademie.de/UFIK/LQ/LQ1-15-neutral.mp4',
  TURNAROUND: 'https://uvm-akademie.de/UFIK/LQ/LQ1-15-gut.mp4'
};

type Props = {
  /** Optional: Zusätzliche Abschnitte (werden als Cards in der Grid angezeigt) */
  extraSections?: React.ReactNode | React.ReactNode[];
  /** Optional: State aus Store/Prop. Fallback ist window.__GAME_STATE__ */
  state?: GameState;
  /** Optional: Callback für „Neu starten" */
  onRestart?: () => void;
};

// ────────────────────────────────────────────────────────────────────────────────
function badgeFor(id: EndingId | string) {
  switch (id) {
    case 'INSOLVENCY': return '🟥';
    case 'PROTECTIVE_SHIELD': return '🟨';
    case 'FRAGILE_CONTINUATION': return '🟧';
    case 'TURNAROUND': return '🟩';
    default: return '⬜';
  }
}
function fmtCurrency(v?: number) {
  if (typeof v !== 'number' || !isFinite(v)) return '–';
  return v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}
function fmtScore(v?: number) {
  if (typeof v !== 'number' || !isFinite(v)) return '–';
  return `${Math.round(v)} / 100`;
}
function labelForKpi(k: string) {
  switch (k) {
    case 'bankTrust': return 'Bankvertrauen';
    case 'cashEUR': return 'Cash';
    case 'publicPerception': return 'Öffentl. Wahrnehmung';
    case 'customerLoyalty': return 'Kundenloyalität';
    case 'workforceEngagement': return 'Team‑Engagement';
    case 'profitLossEUR': return 'P&L';
    default: return k;
  }
}
function signed(v: unknown) {
  const n = Number(v);
  if (!isFinite(n) || n === 0) return '±0';
  return (n > 0 ? '+' : '') + n;
}
function recommendationsFor(id: EndingId | string, _d: any): string[] {
  if (id === 'TURNAROUND') {
    return [
      'Roadmap T+30: Maßnahmen institutionalisieren (WC‑KPIs, Lieferanten‑Regime, Council).',
      'Transparente Kommunikation beibehalten (Message‑House aktualisieren).',
      'Effizienzgewinne in Ergebnisqualität überführen (DB‑Mix, QS‑Trends).'
    ];
  }
  if (id === 'FRAGILE_CONTINUATION') {
    return [
      'WC‑Hebel konsequent weiterdrehen (Zielkorridore verbindlich).',
      'Kundenvertrauen mit QS‑Evidenz stabilisieren (Trendberichte).',
      'Bank‑Check‑ins (T+7/T+30) fix terminieren.'
    ];
  }
  if (id === 'PROTECTIVE_SHIELD') {
    return [
      'Governance/Compliance schließen (Disclosure‑Paket, Freigaben).',
      'Kernkunden mit Hypercare stabilisieren.',
      'Klares Maßnahmenboard mit Owner & Terminen pflegen.'
    ];
  }
  // INSOLVENCY
  return [
    'Geordnete Kommunikation (Team/Bank/Kunden) mit klaren Next Steps.',
    'Optionen im Verfahren prüfen (Asset‑Deal, Fortführungsprognose).',
    'Lernagenda dokumentieren (Post‑Mortem) für Neustart.'
  ];
}

function useEndingVM(state?: GameState): EndingVM {
  const fallback = (window as any).__GAME_STATE__ as GameState | undefined;
  return useMemo(() => buildEndingViewModel(state ?? fallback ?? ({} as any)), [state, fallback]);
}

// ────────────────────────────────────────────────────────────────────────────────
// Child Components
// ────────────────────────────────────────────────────────────────────────────────
const KpiBar: React.FC<{ 
  label: string; 
  score: number; 
  raw: string; 
  history?: number[];
}> = ({ label, score, raw, history }) => {
  const width = Math.max(0, Math.min(100, Number(score) || 0));
  const normalizedHistory = React.useMemo(() => {
    if (!history?.length) return [];
    const isEuro = label === 'Cash' || label === 'P&L';
    if (isEuro) {
      const min = Math.min(...history);
      const max = Math.max(...history);
      const range = max - min;
      if (range === 0) return history.map(() => 50);
      return history.map(v => ((v - min) / range) * 100);
    }
    return history;
  }, [history, label]);

  return (
    <div className={styles.kpi}>
      <div className={styles.kpiHead}>
        <span className={styles.kpiLabel}>{label}</span>
        <span className={styles.kpiRaw}>{raw}</span>
      </div>
      <div className={styles.kpiBar}>
        <div className={styles.kpiFill} style={{ width: `${width}%` }} />
      </div>
      <div className={styles.kpiScore}>{Math.round(width)}/100</div>
      {normalizedHistory.length > 0 && (
        <div className={styles.kpiHistory}>
          <div className={styles.historyTitle}>Verlauf (14 Tage)</div>
          <div className={styles.historyChart}>
            {normalizedHistory.map((value, index) => (
              <div
                key={index}
                className={styles.historyBar}
                style={{ height: `${Math.max(4, value * 0.6)}%` }}
                data-day={index + 1}
                title={`Tag ${index + 1}: ${history![index]}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ImpactList: React.FC<{ kpi: string; data: ImpactData; deltaUnit?: string }> = ({ kpi, data, deltaUnit }) => {
  const unit = deltaUnit ?? '';
  const hasData = data && (data.positive?.length > 0 || data.negative?.length > 0);

  return (
    <div className={styles.impactlist}>
      <h3>{kpi}</h3>
      {!hasData ? (
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
          Keine signifikanten Änderungen in diesem Bereich.
        </p>
      ) : (
        <div className={styles.impactCols}>
          <div>
            <div className={styles.impactLabel}>Top + ({data.positive?.length || 0})</div>
            {data.positive?.length > 0 ? (
              <ul>
                {data.positive.map((it, idx) => (
                  <li key={`${it.day}-${it.blockId}-${it.optionId}-pos-${idx}`} style={{ 
                    borderLeft: '4px solid #10b981', 
                    background: '#f0fdf4',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Tag {it.day} • {it.role}</span>
                      <span style={{ color: '#047857', fontWeight: 'bold', fontSize: '14px' }}>+{it.delta.toLocaleString('de-DE')}{unit}</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.4' }}>{it.optionLabel}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>Keine positiven Änderungen</p>
            )}
          </div>
          <div>
            <div className={styles.impactLabel}>Top − ({data.negative?.length || 0})</div>
            {data.negative?.length > 0 ? (
              <ul>
                {data.negative.map((it, idx) => (
                  <li key={`${it.day}-${it.blockId}-${it.optionId}-neg-${idx}`} style={{ 
                    borderLeft: '4px solid #ef4444', 
                    background: '#fef2f2',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Tag {it.day} • {it.role}</span>
                      <span style={{ color: '#b91c1c', fontWeight: 'bold', fontSize: '14px' }}>{it.delta.toLocaleString('de-DE')}{unit}</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#1f2937', lineHeight: '1.4' }}>{it.optionLabel}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>Keine negativen Änderungen</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────────
// Hauptkomponente
// ────────────────────────────────────────────────────────────────────────────────
export const EndingView: React.FC<Props> = ({ state, onRestart, extraSections }) => {
  const vm = useEndingVM(state);
  const [showDebriefingVideo, setShowDebriefingVideo] = React.useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = React.useState(false);

  // **NEU**: Endwertung ausschließlich aus Engine-Scoring berechnen
  const gameState = state ?? (window as any).__GAME_STATE__;
  const end = React.useMemo(() => computeScoreFromState(gameState), [gameState]);

  // Extrahiere KPI-History für Charts
  const kpiHistory = React.useMemo(() => {
    const game = gameState;
    if (!game?.kpiHistory) return {};
    const history = game.kpiHistory;
    const current = game.kpi;
    return {
      cashEUR: [...history.map(h => h.cashEUR), current.cashEUR],
      profitLossEUR: [...history.map(h => h.profitLossEUR), current.profitLossEUR],
      bankTrust: [...history.map(h => h.bankTrust), current.bankTrust],
      customerLoyalty: [...history.map(h => h.customerLoyalty), current.customerLoyalty],
      workforceEngagement: [...history.map(h => h.workforceEngagement), current.workforceEngagement],
      publicPerception: [...history.map(h => h.publicPerception), current.publicPerception],
    };
  }, [gameState]);

  const exportJson = useCallback(() => {
    const data = vm;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `ending_report_day14.json`; a.click();
    URL.revokeObjectURL(url);
  }, [vm]);

  const exportPdf = useCallback(() => {
    const game = gameState;
    exportEndingPdf(vm, game).catch(console.error);
  }, [vm, gameState]);

  const restart = useCallback(() => {
    setShowRestartConfirm(true);
  }, [onRestart]);

  const confirmRestart = useCallback(() => {
    if (onRestart) onRestart();
    else window.location.reload();
  }, [onRestart]);

  const openDebriefingVideo = useCallback(() => {
    setShowDebriefingVideo(true);
  }, []);

  const closeDebriefingVideo = useCallback(() => {
    setShowDebriefingVideo(false);
  }, []);

  return (
    <section className={styles.ending}>
      <header className={styles.endingHeader} data-ending={vm.ending.id}>
        <div className={styles.endingBadge}>{badgeFor(vm.ending.id)}</div>
        <div>
          <h1>{vm.ending.title}</h1>
          <p className={styles.endingSubtitle}>{vm.ending.summary}</p>
        </div>

        <DebriefButton
          id="debriefing-button"
          label="🧭 Debriefing"
          style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            border: 'none',
            padding: '16px 24px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '700',
            boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minWidth: '200px',
            height: '110px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.3)';
          }}
        />

        <button
          onClick={openDebriefingVideo}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: 'white',
            border: 'none',
            padding: '16px 24px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minWidth: '160px',
            height: '110px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
          }}
        >
          🎬 Debriefing-Video
        </button>
        <button
          onClick={exportPdf}
          style={{
            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            color: 'white',
            border: 'none',
            padding: '16px 24px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 16px rgba(14, 165, 233, 0.3)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minWidth: '160px',
            height: '110px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 165, 233, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(14, 165, 233, 0.3)';
          }}
        >
          📄 Abschlussbericht PDF
        </button>
        <div className={styles.endingScore} aria-label="Gesamtscore">
          <div className={styles.scoreValue}>{Math.round(end.score)}</div>
          <div className={styles.scoreLabel}>Gesamtscore – {end.verdict}</div>
        </div>
      </header>

      <div className={styles.grid}>
        {/* KPI Breakdown */}
        <section className={styles.card}>
          <h2>KPI-Entwicklung & Endbewertung</h2>
          <div className={styles.kpiGrid}>
            <KpiBar 
              label="Cash" 
              score={vm.ending.breakdown.cash} 
              raw={fmtCurrency(vm.kpiRaw.cashEUR)} 
              history={kpiHistory.cashEUR}
            />
            <KpiBar 
              label="P&L" 
              score={vm.ending.breakdown.pl} 
              raw={fmtCurrency(vm.kpiRaw.profitLossEUR)} 
              history={kpiHistory.profitLossEUR}
            />
            <KpiBar 
              label="Bankvertrauen" 
              score={vm.ending.breakdown.bank} 
              raw={fmtScore(vm.kpiRaw.bankTrust)} 
              history={kpiHistory.bankTrust}
            />
            <KpiBar 
              label="Kundenloyalität" 
              score={vm.ending.breakdown.customers} 
              raw={fmtScore(vm.kpiRaw.customerLoyalty)} 
              history={kpiHistory.customerLoyalty}
            />
            <KpiBar 
              label="Team‑Engagement" 
              score={vm.ending.breakdown.workforce} 
              raw={fmtScore(vm.kpiRaw.workforceEngagement)} 
              history={kpiHistory.workforceEngagement}
            />
            <KpiBar 
              label="Öffentl. Wahrnehmung" 
              score={vm.ending.breakdown.publicPerception} 
              raw={fmtScore(vm.kpiRaw.publicPerception)} 
              history={kpiHistory.publicPerception}
            />
          </div>

          <div className={styles.chips}>
            {end.bonus > 0 && <span className={`${styles.chip} ${styles.chipBonus}`}>Bonus +{Math.round(end.bonus)}</span>}
            {end.malus > 0 && <span className={`${styles.chip} ${styles.chipMalus}`}>Malus −{Math.round(end.malus)}</span>}
            {vm.diagnostics.commTransparent && <span className={styles.chip}>✅ konsistente Kommunikation</span>}
            {vm.diagnostics.waiverFinalized && <span className={styles.chip}>✅ Waiver/Sideletter finalisiert</span>}
            {vm.diagnostics.payrollSecured  && <span className={styles.chip}>✅ Versuch Payroll sichern</span>}
            {vm.diagnostics.lowBankTrust    && <span className={`${styles.chip} ${styles.chipWarn}`}>⚠️ Bankvertrauen niedrig</span>}
          </div>

          {/* **NEU**: Gewichts-Breakdown aus Scoring-Engine */}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Gewichtete Endwertung</div>
            <ul>
              {end.contributions.map(c => (
                <li key={c.kpi} style={{ lineHeight: 1.5 }}>
                  {labelForKpi(c.kpi)}: Wert {Math.round(c.value)} · Gewicht {Math.round(c.weight)}% → <strong>{Math.round(c.points)}</strong> Punkte
                </li>
              ))}
            </ul>
            {(end.achievements?.length ?? 0) > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong>Bonus (+{Math.round(end.bonus)}):</strong> {end.achievements.join(' · ')}
              </div>
            )}
            {(end.penalties?.length ?? 0) > 0 && (
              <div style={{ marginTop: 4 }}>
                <strong>Malus (−{Math.round(end.malus)}):</strong> {end.penalties.join(' · ')}
              </div>
            )}
          </div>
        </section>

        {/* Top Impacts */}
        <section className={styles.card}>
          <h2>Wichtigste Entscheidungen</h2>
          <div className={styles.impacts}>
            <ImpactList kpi="Bankvertrauen"           data={vm.diagnostics.topImpacts.bankTrust as ImpactData}         />
            <ImpactList kpi="Cash"                    data={vm.diagnostics.topImpacts.cashEUR as ImpactData}  deltaUnit="€" />
            <ImpactList kpi="Öffentliche Wahrnehmung" data={vm.diagnostics.topImpacts.publicPerception as ImpactData} />
            <ImpactList kpi="Kundenloyalität"         data={vm.diagnostics.topImpacts.customerLoyalty as ImpactData} />
            <ImpactList kpi="Team-Engagement"         data={vm.diagnostics.topImpacts.workforceEngagement as ImpactData} />
            <ImpactList kpi="P&L"                     data={vm.diagnostics.topImpacts.profitLossEUR as ImpactData} deltaUnit="€" />
          </div>
        </section>

        {/* Timeline */}
        <section className={styles.card}>
          <h2>Entscheidungs‑Timeline</h2>
          <div className={styles.timeline}>
            {vm.decisions.map(d => (
              <div key={`${d.day}-${d.blockId}-${d.optionId}`} className={styles.timelineItem}>
                <div className={styles.tlMeta}>
                  <span className={styles.tlDay}>Tag {d.day}</span>
                  <span className={styles.tlRole}>{d.role}</span>
                  <span className={styles.tlId}>{d.blockId}</span>
                </div>
                <div className={styles.tlBody}>
                  {d.title && <div className={styles.tlTitle}>{d.title}</div>}
                  <div className={styles.tlOption}>Gewählt: <em>{d.optionLabel}</em></div>
                  <div className={styles.tlDelta}>
                    {Object.entries(d.kpiDelta ?? {})
                      .filter(([, v]) => Number(v) !== 0)
                      .map(([k, v]) => (
                        <small key={k}>
                          <span
                            className={styles.delta}
                            data-neg={Number(v) < 0}
                          >
                            {labelForKpi(k)}: {signed(v)}
                          </span>
                        </small>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Empfehlungen */}
        <section className={styles.card}>
          <h2>Nächste Schritte</h2>
          <ul className={styles.nextSteps}>
            {recommendationsFor(vm.ending.id, vm.diagnostics).map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

  {/* MP‑Zusatzabschnitte (z. B. Kommunikationsqualität) */}
  {(() => {
    if (!extraSections) return null;
    const nodes = Array.isArray(extraSections) ? extraSections : [extraSections];
    return nodes.map((node, idx) => (
      <section key={`extra-${idx}`} className={styles.card}>
        {node}
      </section>
    ));
  })()}
</div>

<footer className={styles.endingFooter}>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={restart}>
          🔄 Neu starten
        </button>
        <button className={`${styles.btn}`} onClick={exportJson} style={{ marginLeft: 8 }}>
          ⬇️ JSON exportieren
        </button>
      </footer>

      {/* Restart Confirmation Modal */}
      {showRestartConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001
        }}>
          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 12,
            maxWidth: 400,
            width: '90%',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 16px', color: '#dc2626' }}>⚠️ Spiel zurücksetzen</h3>
            <p style={{ margin: '0 0 20px', color: '#374151' }}>
              Hiermit setzen Sie das Spiel zurück. Alle Fortschritte und Entscheidungen gehen verloren. Wollen Sie das wirklich?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button 
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: 8,
                  cursor: 'pointer'
                }}
                onClick={() => setShowRestartConfirm(false)}
              >
                Abbrechen
              </button>
              <button 
                style={{ 
                  padding: '8px 16px',
                  background: '#dc2626', 
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer'
                }} 
                onClick={confirmRestart}
              >
                Ja, zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}

      {showDebriefingVideo && (
        <DebriefingVideoModal
          videoUrl={DEBRIEFING_VIDEOS[vm.ending.id]}
          endingTitle={vm.ending.title}
          onClose={closeDebriefingVideo}
        />
      )}
    </section>
  );
};

export default EndingView;