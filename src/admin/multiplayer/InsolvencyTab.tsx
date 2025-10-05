// src/admin/multiplayer/InsolvencyTab.tsx
import React from 'react';
import type { MultiplayerAdminSettings, InsolvencyRule } from '@/types/admin';
import type { KPI } from '@/core/models/domain';

interface InsolvencyTabProps {
  settings: MultiplayerAdminSettings;
  onUpdate: (updater: (prev: MultiplayerAdminSettings) => MultiplayerAdminSettings) => void;
}

const box: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  padding: 16,
  background: '#fff',
  marginTop: 16
};

export function InsolvencyTab({ settings, onUpdate }: InsolvencyTabProps): JSX.Element {
  const kpiOptions: Array<{ value: keyof KPI; label: string }> = [
    { value: 'cashEUR', label: 'Liquidität (EUR)' },
    { value: 'profitLossEUR', label: 'Gewinn/Verlust (EUR)' },
    { value: 'customerLoyalty', label: 'Kundenloyalität (%)' },
    { value: 'bankTrust', label: 'Bankvertrauen (%)' },
    { value: 'workforceEngagement', label: 'Mitarbeiterengagement (%)' },
    { value: 'publicPerception', label: 'Öffentliche Wahrnehmung (%)' }
  ];

  const operatorOptions = [
    { value: '<', label: 'kleiner als' },
    { value: '<=', label: 'kleiner gleich' },
    { value: '>', label: 'größer als' },
    { value: '>=', label: 'größer gleich' },
    { value: '==', label: 'gleich' },
    { value: '!=', label: 'ungleich' }
  ];

  const rules = settings.insolvencyConfig?.rules || [];

  const addRule = (): void => {
    const newRule: InsolvencyRule = {
      id: `rule_${Date.now()}`,
      name: 'Neue Regel',
      kpiKey: 'bankTrust',
      operator: '<',
      threshold: 20,
      enabled: true
    };

    onUpdate(s => ({
      ...s,
      insolvencyConfig: {
        ...s.insolvencyConfig,
        rules: [...(s.insolvencyConfig?.rules || []), newRule]
      }
    }));
  };

  const updateRule = (index: number, updates: Partial<InsolvencyRule>): void => {
    onUpdate(s => {
      const newRules = [...(s.insolvencyConfig?.rules || [])];
      newRules[index] = { ...newRules[index], ...updates };
      return {
        ...s,
        insolvencyConfig: {
          ...s.insolvencyConfig,
          rules: newRules
        }
      };
    });
  };

  const deleteRule = (index: number): void => {
    onUpdate(s => {
      const newRules = [...(s.insolvencyConfig?.rules || [])];
      newRules.splice(index, 1);
      return {
        ...s,
        insolvencyConfig: {
          ...s.insolvencyConfig,
          rules: newRules
        }
      };
    });
  };

  const loadPreset = (preset: 'strict' | 'moderate' | 'lenient'): void => {
    let presetRules: InsolvencyRule[] = [];

    switch (preset) {
      case 'strict':
        presetRules = [
          { id: 'r1', name: 'Kritisches Bankvertrauen', kpiKey: 'bankTrust', operator: '<', threshold: 20, enabled: true },
          { id: 'r2', name: 'Kritische Kundenloyalität', kpiKey: 'customerLoyalty', operator: '<', threshold: 20, enabled: true },
          { id: 'r3', name: 'Kritisches Mitarbeiterengagement', kpiKey: 'workforceEngagement', operator: '<', threshold: 20, enabled: true },
          { id: 'r4', name: 'Kritische öffentliche Wahrnehmung', kpiKey: 'publicPerception', operator: '<', threshold: 20, enabled: true }
        ];
        break;
      case 'moderate':
        presetRules = [
          { id: 'r1', name: 'Sehr niedriges Bankvertrauen', kpiKey: 'bankTrust', operator: '<', threshold: 10, enabled: true },
          { id: 'r2', name: 'Sehr niedrige Kundenloyalität', kpiKey: 'customerLoyalty', operator: '<', threshold: 10, enabled: true }
        ];
        break;
      case 'lenient':
        presetRules = [
          { id: 'r1', name: 'Extremes Bankvertrauen', kpiKey: 'bankTrust', operator: '<=', threshold: 5, enabled: true }
        ];
        break;
    }

    onUpdate(s => ({
      ...s,
      insolvencyConfig: {
        ...s.insolvencyConfig,
        rules: presetRules
      }
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Insolvenz-Modus
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="radio"
              checked={settings.insolvencyMode === 'off'}
              onChange={() => onUpdate(s => ({ ...s, insolvencyMode: 'off' }))}
            />
            <span style={{ fontWeight: 600 }}>Aus</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              (Kein Game Over möglich)
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="radio"
              checked={settings.insolvencyMode === 'cash'}
              onChange={() => onUpdate(s => ({ ...s, insolvencyMode: 'cash' }))}
            />
            <span style={{ fontWeight: 600 }}>Nur Liquidität</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              (Game Over bei negativer Liquidität)
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="radio"
              checked={settings.insolvencyMode === 'rules'}
              onChange={() => onUpdate(s => ({ ...s, insolvencyMode: 'rules' }))}
            />
            <span style={{ fontWeight: 600 }}>Nur Regeln</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              (Game Over bei Regel-Verletzung)
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="radio"
              checked={settings.insolvencyMode === 'both'}
              onChange={() => onUpdate(s => ({ ...s, insolvencyMode: 'both' }))}
            />
            <span style={{ fontWeight: 600 }}>Beides (OR)</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              (Game Over bei Liquidität ODER Regeln)
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="radio"
              checked={settings.insolvencyMode === 'hard'}
              onChange={() => onUpdate(s => ({ ...s, insolvencyMode: 'hard' }))}
            />
            <span style={{ fontWeight: 600 }}>Hart (AND)</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              (Game Over bei Liquidität UND Regeln)
            </span>
          </label>
        </div>
      </div>

      {(settings.insolvencyMode === 'rules' || settings.insolvencyMode === 'both' || settings.insolvencyMode === 'hard') && (
        <>
          <div style={box}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                Insolvenz-Regeln
              </h3>
              <button
                onClick={addRule}
                style={{
                  padding: '8px 16px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600
                }}
              >
                + Regel hinzufügen
              </button>
            </div>

            {rules.length === 0 ? (
              <div style={{
                padding: 20,
                textAlign: 'center',
                color: '#6b7280',
                background: '#f9fafb',
                borderRadius: 6
              }}>
                Keine Regeln definiert. Fügen Sie eine Regel hinzu oder laden Sie eine Vorlage.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {rules.map((rule, index) => (
                  <div
                    key={rule.id || index}
                    style={{
                      padding: 12,
                      background: rule.enabled ? '#f0fdf4' : '#f9fafb',
                      border: `2px solid ${rule.enabled ? '#bbf7d0' : '#e5e7eb'}`,
                      borderRadius: 8
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 12
                    }}>
                      <input
                        type="text"
                        value={rule.name}
                        onChange={e => updateRule(index, { name: e.target.value })}
                        placeholder="Regelname"
                        style={{
                          flex: 1,
                          padding: '6px 10px',
                          border: '1px solid #d1d5db',
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: 14
                        }}
                      />
                      <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <input
                            type="checkbox"
                            checked={rule.enabled}
                            onChange={e => updateRule(index, { enabled: e.target.checked })}
                          />
                          <span style={{ fontSize: 13 }}>Aktiv</span>
                        </label>
                        <button
                          onClick={() => deleteRule(index)}
                          style={{
                            padding: '4px 8px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: 12
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 1fr',
                      gap: 8,
                      alignItems: 'center'
                    }}>
                      <select
                        value={rule.kpiKey}
                        onChange={e => updateRule(index, { kpiKey: e.target.value as keyof KPI })}
                        style={{
                          padding: '6px 10px',
                          border: '1px solid #d1d5db',
                          borderRadius: 6,
                          fontSize: 13
                        }}
                      >
                        {kpiOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={rule.operator}
                        onChange={e => updateRule(index, { operator: e.target.value as InsolvencyRule['operator'] })}
                        style={{
                          padding: '6px 10px',
                          border: '1px solid #d1d5db',
                          borderRadius: 6,
                          fontSize: 13
                        }}
                      >
                        {operatorOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        value={rule.threshold}
                        onChange={e => updateRule(index, { threshold: Number(e.target.value) })}
                        style={{
                          padding: '6px 10px',
                          border: '1px solid #d1d5db',
                          borderRadius: 6,
                          fontSize: 13
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={box}>
            <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
              Vorlagen
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <button
                onClick={() => loadPreset('lenient')}
                style={{
                  padding: '12px',
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: 8,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>😊 Nachsichtig</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  Nur extreme Werte führen zu Game Over
                </div>
              </button>

              <button
                onClick={() => loadPreset('moderate')}
                style={{
                  padding: '12px',
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: 8,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>⚖️ Moderat</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  Ausgewogene Schwierigkeit
                </div>
              </button>

              <button
                onClick={() => loadPreset('strict')}
                style={{
                  padding: '12px',
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: 8,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>😤 Streng</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  Alle KPIs müssen hoch bleiben
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Weitere Optionen
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.insolvencyConfig?.showWarnings ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                insolvencyConfig: {
                  ...s.insolvencyConfig,
                  showWarnings: e.target.checked
                }
              }))}
            />
            <span>Insolvenz-Warnungen anzeigen</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.insolvencyConfig?.allowRecovery ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                insolvencyConfig: {
                  ...s.insolvencyConfig,
                  allowRecovery: e.target.checked
                }
              }))}
            />
            <span>Erholung erlauben (Spiel läuft weiter)</span>
          </label>

          <div style={{ marginLeft: 28, marginTop: 8 }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>
              Gnadenfrist (Tage):
            </label>
            <input
              type="number"
              min={0}
              max={7}
              value={settings.insolvencyConfig?.gracePeriodDays ?? 3}
              onChange={e => onUpdate(s => ({
                ...s,
                insolvencyConfig: {
                  ...s.insolvencyConfig,
                  gracePeriodDays: Number(e.target.value)
                }
              }))}
              style={{
                padding: '6px 10px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                width: 100
              }}
            />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              Anzahl Tage mit negativer Liquidität vor Game Over
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsolvencyTab;
