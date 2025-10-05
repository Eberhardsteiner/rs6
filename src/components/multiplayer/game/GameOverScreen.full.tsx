import React from 'react';
import type { RoleId, KPI } from '@/core/models/domain';
import type { GameState } from '@/core/engine/gameEngine';
import type { EndingResult } from '@/core/engine/ending';
import { MultiplayerService } from '@/services/multiplayerService';

interface KpiEstimate {
  day: number;
  kpi: keyof KPI;
  value: number;
  actual?: number;
  diff: number;
  accuracy: number;
}

const CommQualitySection = ({ state, role, kpiEstimates }: { state: GameState; role: RoleId; kpiEstimates: KpiEstimate[] }) => {
  const visibleKpis = MultiplayerService.getRoleKpiVisibility(role);
  const nonVisible = (kpiEstimates || []).filter(est => !visibleKpis.includes(est.kpi));
  if (!nonVisible.length) return null;

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
};

const TeamCommunicationSection = ({
  loadingComms,
  commsByRole
}: {
  loadingComms: boolean;
  commsByRole: Record<RoleId, Array<{ day: number; text: string }>>;
}) => {
  return (
    <div
      style={{
        marginTop: 24,
        padding: 20,
        background: 'linear-gradient(135deg, #fff7ed, #fffbeb)',
        borderRadius: 12,
        border: '1px solid #fcd34d'
      }}
    >
      <h3
        className="mp-heading"
        style={{ margin: '0 0 12px 0', color: '#92400e' }}
      >
        🗣️ Kommunikationsnotizen (Team)
      </h3>
      {loadingComms ? (
        <div style={{ color: '#6b7280' }}>Lade Kommunikationsnotizen…</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12
          }}
        >
          {(['CEO', 'CFO', 'OPS', 'HRLEGAL'] as RoleId[]).map((r) => (
            <div
              key={r}
              style={{
                background: 'white',
                borderRadius: 8,
                padding: 12,
                border: '1px solid #f3f4f6'
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                {r === 'CEO'
                  ? 'CEO – Stakeholderkommunikation'
                  : r === 'CFO'
                  ? 'CFO – Bankkommunikation'
                  : r === 'OPS'
                  ? 'OPS – Kunden-/Lieferantenkommunikation'
                  : 'HR/Legal – Kommunikation (intern/extern)'}
              </div>
              {commsByRole[r] && commsByRole[r].length ? (
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {commsByRole[r].map((it, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>
                      <strong>Tag {it.day}:</strong> {it.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#6b7280', fontStyle: 'italic' }}>
                  Keine Einträge.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface GameOverScreenProps {
  state: GameState;
  finalEnding: EndingResult | null;
  role: RoleId;
  kpiEstimates: KpiEstimate[];
  loadingComms: boolean;
  commsByRole: Record<RoleId, Array<{ day: number; text: string }>>;
}

export function GameOverScreen({
  state,
  finalEnding,
  role,
  kpiEstimates,
  loadingComms,
  commsByRole
}: GameOverScreenProps) {
  if (!state.isOver || !finalEnding) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      overflowY: 'auto',
      padding: 20
    }}>
      <div className="card" style={{
        maxWidth: 900,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: 32,
        background: 'linear-gradient(135deg, #ffffff, #f8fafc)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 32,
          padding: 24,
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          borderRadius: 12,
          color: 'white'
        }}>
          <h1 style={{ margin: '0 0 12px 0', fontSize: 32 }}>🎮 Spiel beendet!</h1>
          <h2 style={{ margin: 0, fontSize: 24 }}>{finalEnding.title}</h2>
          <p style={{ margin: '12px 0 0 0', fontSize: 14, opacity: 0.9 }}>
            {finalEnding.summary}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 32
        }}>
          <div style={{
            padding: 16,
            background: finalEnding.score >= 70 ? '#d1fae5' : finalEnding.score >= 40 ? '#fed7aa' : '#fee2e2',
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Gesamtscore</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: finalEnding.score >= 70 ? '#10b981' : finalEnding.score >= 40 ? '#f59e0b' : '#ef4444' }}>
              {finalEnding.score}/100
            </div>
          </div>

          <div style={{
            padding: 16,
            background: '#e0e7ff',
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Deine Rolle</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#6366f1' }}>
              {role}
            </div>
          </div>

          <div style={{
            padding: 16,
            background: '#fef3c7',
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Spieltage</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>
              {state.day} / 14
            </div>
          </div>
        </div>

        {kpiEstimates.length > 0 && (
          <div style={{
            marginBottom: 32,
            padding: 20,
            background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
            borderRadius: 12,
            border: '1px solid #93c5fd'
          }}>
            <CommQualitySection
              state={state}
              role={role}
              kpiEstimates={kpiEstimates}
            />
          </div>
        )}

        <TeamCommunicationSection
          loadingComms={loadingComms}
          commsByRole={commsByRole}
        />

        <div style={{
          marginTop: 24,
          padding: 20,
          background: '#f9fafb',
          borderRadius: 8,
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7280', textAlign: 'center' }}>
            Das Spiel ist beendet. Verwende die Export-Funktionen um deine Ergebnisse zu sichern.
          </p>
        </div>
      </div>
    </div>
  );
}
