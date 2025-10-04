import React from 'react';
import Shell from '@/components/layout/Shell';
import EndingView from '@/ui/EndingView';
import { MultiplayerService } from '@/services/multiplayerService';
import type { GameState, KPI } from '@/core/engine/gameEngine';
import type { RoleId } from '@/core/models/domain';

interface KpiEstimate {
  day: number;
  kpi: keyof KPI;
  value: number;
  actualValue?: number;
}

interface InsolvencyViewMPProps {
  state: GameState;
  role: RoleId;
  playerName: string;
  kpiEstimates: KpiEstimate[];
  onRestart: () => void;
  onExport?: () => void;
}

/** Kommunikationsqualität (Vergleich geschätzter vs. tatsächlicher KPI-Werte; nur nicht sichtbare KPIs) */
function CommQualitySection({ state, role, kpiEstimates }: { state: GameState; role: RoleId; kpiEstimates: KpiEstimate[] }) {
  const visibleKpis = MultiplayerService.getRoleKpiVisibility(role);
  const nonVisible = (kpiEstimates || []).filter(est => !visibleKpis.includes(est.kpi));
  if (!nonVisible.length) {
    return (
      <div>
        <h2>📊 Kommunikationsqualität (Mehrspielermodus)</h2>
        <p style={{ color: '#6b7280', marginTop: 4 }}>Keine erfassten Schätzwerte für nicht sichtbare KPIs vorhanden.</p>
      </div>
    );
  }

  const rows = nonVisible.map(est => {
    const actual = state.kpi[est.kpi] as number;
    const diff = (actual ?? 0) - (est.value ?? 0);
    const accuracy = (typeof actual === 'number' && actual !== 0)
      ? Math.max(0, Math.min(100, 100 - Math.abs((est.value - actual) / actual * 100)))
      : 0;
    return { ...est, actual, diff, accuracy };
  });
  const avgAccuracy = rows.reduce((s, r) => s + r.accuracy, 0) / rows.length;

  const kpiLabels: Record<keyof KPI, string> = {
    cashEUR: 'Liquidität',
    profitLossEUR: 'Gewinn/Verlust',
    customerLoyalty: 'Kundentreue',
    bankTrust: 'Bankvertrauen',
    workforceEngagement: 'Belegschaft',
    publicPerception: 'Öff. Wahrnehmung'
  };

  const fmtVal = (k:string, v:number) => k.includes('EUR')
    ? new Intl.NumberFormat('de-DE', { style:'currency', currency:'EUR', maximumFractionDigits:0 }).format(v||0)
    : `${Math.round(v||0)}`;

  return (
    <div>
      <h2>📊 Kommunikationsqualität (Mehrspielermodus)</h2>
      <p style={{ marginTop: 4, color: '#374151' }}>
        Vergleich der gemeldeten KPI‑Werte (Teamkommunikation) mit den tatsächlichen Endwerten.
        Berücksichtigt werden nur KPIs, die für die Rolle <strong>{role}</strong> nicht direkt sichtbar waren.
      </p>

      <div style={{
        margin: '12px 0 16px',
        padding: 12,
        background: avgAccuracy > 80 ? '#d1fae5' : avgAccuracy > 60 ? '#fef3c7' : '#fee2e2',
        border: '1px solid ' + (avgAccuracy > 80 ? '#86efac' : avgAccuracy > 60 ? '#fde68a' : '#fecaca'),
        borderRadius: 8,
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 12, color: '#6b7280' }}>Durchschnittliche Genauigkeit</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: avgAccuracy > 80 ? '#059669' : avgAccuracy > 60 ? '#b45309' : '#b91c1c' }}>
          {avgAccuracy.toFixed(1)}%
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
          <thead>
            <tr style={{ borderBottom:'2px solid #e5e7eb', background:'#f9fafb' }}>
              <th style={{ padding:8, textAlign:'left' }}>Tag</th>
              <th style={{ padding:8, textAlign:'left' }}>KPI</th>
              <th style={{ padding:8, textAlign:'right' }}>Gemeldet</th>
              <th style={{ padding:8, textAlign:'right' }}>Tatsächlich</th>
              <th style={{ padding:8, textAlign:'right' }}>Abweichung</th>
              <th style={{ padding:8, textAlign:'right' }}>Genauigkeit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} style={{ borderBottom:'1px solid #f3f4f6' }}>
                <td style={{ padding:8, color:'#374151' }}>{r.day}</td>
                <td style={{ padding:8, color:'#374151' }}>{kpiLabels[r.kpi]}</td>
                <td style={{ padding:8, textAlign:'right', color:'#374151' }}>{fmtVal(r.kpi, r.value)}</td>
                <td style={{ padding:8, textAlign:'right', color:'#374151' }}>{fmtVal(r.kpi, r.actual as number)}</td>
                <td style={{ padding:8, textAlign:'right', color: Math.abs(r.diff) > (Number(r.actual)||1) * 0.2 ? '#ef4444' : '#f59e0b' }}>
                  {fmtVal(r.kpi, r.diff)}
                </td>
                <td style={{ padding:8, textAlign:'right', fontWeight:600, color: r.accuracy > 80 ? '#10b981' : r.accuracy > 60 ? '#f59e0b' : '#ef4444' }}>
                  {r.accuracy.toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function InsolvencyViewMP({ state, role, playerName, kpiEstimates, onRestart, onExport }: InsolvencyViewMPProps) {
  const extra = <CommQualitySection state={state} role={role} kpiEstimates={kpiEstimates} />;

  return (
    <Shell>
      <EndingView state={state} onRestart={onRestart} extraSections={extra} />
    </Shell>
  );
}