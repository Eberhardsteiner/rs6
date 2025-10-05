// src/admin/multiplayer/ScoringTab.tsx
import React from 'react';
import type { MultiplayerAdminSettings } from '@/types/admin';
import { normalizeWeights } from '@/types/core';
import { validateScoringWeights } from '@/utils/validationUtils';

interface ScoringTabProps {
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

export function ScoringTab({ settings, onUpdate }: ScoringTabProps): JSX.Element {
  const [errors, setErrors] = React.useState<string[]>([]);

  const weights = settings.scoringWeights || {
    bankTrust: 25,
    publicPerception: 25,
    customerLoyalty: 25,
    workforceEngagement: 25
  };

  const handleWeightChange = (key: keyof typeof weights, value: string): void => {
    const num = Number(value);

    if (isNaN(num) || num < 0 || num > 100) {
      setErrors([`${key}: Wert muss zwischen 0 und 100 liegen`]);
      return;
    }

    const newWeights = { ...weights, [key]: num };
    const validation = validateScoringWeights(newWeights);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    onUpdate(s => ({
      ...s,
      scoringWeights: newWeights
    }));
  };

  const handleNormalize = (): void => {
    const normalized = normalizeWeights(weights);
    setErrors([]);
    onUpdate(s => ({
      ...s,
      scoringWeights: normalized
    }));
  };

  const handleReset = (): void => {
    setErrors([]);
    onUpdate(s => ({
      ...s,
      scoringWeights: {
        bankTrust: 25,
        publicPerception: 25,
        customerLoyalty: 25,
        workforceEngagement: 25
      }
    }));
  };

  const handlePreset = (preset: 'balanced' | 'financial' | 'stakeholder' | 'reputation'): void => {
    let newWeights;

    switch (preset) {
      case 'balanced':
        newWeights = { bankTrust: 25, publicPerception: 25, customerLoyalty: 25, workforceEngagement: 25 };
        break;
      case 'financial':
        newWeights = { bankTrust: 40, publicPerception: 20, customerLoyalty: 20, workforceEngagement: 20 };
        break;
      case 'stakeholder':
        newWeights = { bankTrust: 20, publicPerception: 30, customerLoyalty: 30, workforceEngagement: 20 };
        break;
      case 'reputation':
        newWeights = { bankTrust: 20, publicPerception: 40, customerLoyalty: 20, workforceEngagement: 20 };
        break;
    }

    setErrors([]);
    onUpdate(s => ({
      ...s,
      scoringWeights: newWeights
    }));
  };

  const totalWeight = weights.bankTrust + weights.publicPerception +
                      weights.customerLoyalty + weights.workforceEngagement;

  const isValidTotal = Math.abs(totalWeight - 100) < 0.1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Scoring-Gewichte
        </h3>

        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>
          Diese Gewichte bestimmen, wie stark jeder KPI in die Gesamtbewertung einfließt.
          Die Summe muss genau 100% ergeben.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { key: 'bankTrust', label: 'Bankvertrauen', icon: '🏦' },
            { key: 'publicPerception', label: 'Öffentliche Wahrnehmung', icon: '🌍' },
            { key: 'customerLoyalty', label: 'Kundenloyalität', icon: '👥' },
            { key: 'workforceEngagement', label: 'Mitarbeiterengagement', icon: '⚡' }
          ].map(({ key, label, icon }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24, minWidth: 32 }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>
                  {label}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights[key as keyof typeof weights]}
                    onChange={e => handleWeightChange(
                      key as keyof typeof weights,
                      e.target.value
                    )}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={weights[key as keyof typeof weights]}
                    onChange={e => handleWeightChange(
                      key as keyof typeof weights,
                      e.target.value
                    )}
                    style={{
                      width: 70,
                      padding: '6px 8px',
                      border: '1px solid #d1d5db',
                      borderRadius: 6,
                      textAlign: 'right'
                    }}
                  />
                  <span style={{ fontSize: 14, color: '#6b7280', minWidth: 20 }}>%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 20,
          padding: 12,
          background: isValidTotal ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${isValidTotal ? '#bbf7d0' : '#fecaca'}`,
          borderRadius: 6
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: isValidTotal ? '#166534' : '#991b1b' }}>
              Summe:
            </span>
            <span style={{
              fontSize: 18,
              fontWeight: 700,
              color: isValidTotal ? '#166534' : '#991b1b'
            }}>
              {totalWeight.toFixed(1)}%
            </span>
          </div>
          {!isValidTotal && (
            <div style={{ fontSize: 12, color: '#991b1b', marginTop: 4 }}>
              Die Summe muss genau 100% ergeben
            </div>
          )}
        </div>

        {errors.length > 0 && (
          <div style={{
            marginTop: 12,
            padding: 12,
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 6
          }}>
            {errors.map((error, i) => (
              <div key={i} style={{ fontSize: 12, color: '#991b1b' }}>
                • {error}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button
            onClick={handleNormalize}
            disabled={isValidTotal}
            style={{
              padding: '8px 16px',
              background: isValidTotal ? '#e5e7eb' : '#3b82f6',
              color: isValidTotal ? '#9ca3af' : 'white',
              border: 'none',
              borderRadius: 6,
              cursor: isValidTotal ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            Auf 100% normalisieren
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            Zurücksetzen
          </button>
        </div>
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Vorlagen
        </h3>

        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 16 }}>
          Schnell verschiedene Schwerpunkte anwenden
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button
            onClick={() => handlePreset('balanced')}
            style={{
              padding: '12px',
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.background = '#f0f9ff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>⚖️ Ausgewogen</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Alle KPIs gleich gewichtet (25% / 25% / 25% / 25%)
            </div>
          </button>

          <button
            onClick={() => handlePreset('financial')}
            style={{
              padding: '12px',
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.background = '#f0f9ff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>💰 Finanziell</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Fokus auf Bankvertrauen (40% / 20% / 20% / 20%)
            </div>
          </button>

          <button
            onClick={() => handlePreset('stakeholder')}
            style={{
              padding: '12px',
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.background = '#f0f9ff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>👥 Stakeholder</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Fokus auf Kunden & Öffentlichkeit (20% / 30% / 30% / 20%)
            </div>
          </button>

          <button
            onClick={() => handlePreset('reputation')}
            style={{
              padding: '12px',
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.background = '#f0f9ff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>🌍 Reputation</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Fokus auf öffentliche Wahrnehmung (20% / 40% / 20% / 20%)
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoringTab;
