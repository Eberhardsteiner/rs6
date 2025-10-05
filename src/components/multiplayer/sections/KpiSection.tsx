// src/components/multiplayer/sections/KpiSection.tsx
import KpiCockpit from '@/components/hud/KpiCockpit';
import { MultiplayerService } from '@/services/multiplayerService';
import type { GameState, KPI } from '@/core/engine/gameEngine';
import type { RoleId } from '@/core/models/domain';

export interface KpiSectionProps {
  state: GameState;
  role: RoleId;
  currentKpiInputs: Partial<KPI>;
  onKpiInput: (kpiKey: keyof KPI, value: string) => void;
  onOpenHistory: (key: keyof KPI) => void;
  getVisibleKpi: () => KPI;
}

export function KpiSection({
  state,
  role,
  currentKpiInputs,
  onKpiInput,
  onOpenHistory,
  getVisibleKpi
}: KpiSectionProps) {
  const visibleKpis = MultiplayerService.getRoleKpiVisibility(role);

  const labels: Record<keyof KPI, string> = {
    cashEUR: 'Liquidität (€)',
    profitLossEUR: 'G/V (€)',
    customerLoyalty: 'Kundentreue',
    bankTrust: 'Bankvertrauen',
    workforceEngagement: 'Belegschaft',
    publicPerception: 'Öff. Wahrnehmung'
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <h3>KPIs</h3>
      <KpiCockpit
        kpi={getVisibleKpi()}
        kpiHistory={state.kpiHistory}
        onOpenHistory={onOpenHistory}
        visibleKpis={visibleKpis}
      />

      <div style={{ marginTop: 12, padding: 12, background: '#f3f4f6', borderRadius: 8 }}>
        <h4 style={{ fontSize: 14, marginBottom: 8, color: '#374151' }}>
          📊 Von anderen gemeldete KPIs (Tag {state.day})
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {Object.keys(state.kpi).map((key) => {
            const kpiKey = key as keyof KPI;
            if (visibleKpis.includes(kpiKey)) return null;

            return (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, color: '#6b7280' }}>{labels[kpiKey]}</label>
                <input
                  type="number"
                  placeholder="?"
                  value={currentKpiInputs[kpiKey] || ''}
                  onChange={(e) => onKpiInput(kpiKey, e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: '1px solid #d1d5db',
                    fontSize: 12,
                    color: '#374151',
                    background: '#ffffff'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
