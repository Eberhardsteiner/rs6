// src/admin/multiplayer/BankSettingsTab.tsx
import React from 'react';
import type { MultiplayerAdminSettings } from '@/types/admin';
import { formatCurrency } from '@/utils/kpiUtils';
import { validateCurrency, validateNumber } from '@/utils/validationUtils';

interface BankSettingsTabProps {
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

export function BankSettingsTab({ settings, onUpdate }: BankSettingsTabProps): JSX.Element {
  const [creditLineError, setCreditLineError] = React.useState<string>('');
  const [interestRateError, setInterestRateError] = React.useState<string>('');

  const handleCreditLineChange = (value: string): void => {
    const result = validateCurrency(value, false);

    if (!result.isValid) {
      setCreditLineError(result.error || '');
      return;
    }

    setCreditLineError('');
    onUpdate(s => ({
      ...s,
      creditSettings: {
        ...s.creditSettings,
        creditLineEUR: result.value || 0
      }
    }));
  };

  const handleInterestRateChange = (value: string): void => {
    const result = validateNumber(value, { min: 0, max: 100, allowNegative: false });

    if (!result.isValid) {
      setInterestRateError(result.error || '');
      return;
    }

    setInterestRateError('');
    onUpdate(s => ({
      ...s,
      creditSettings: {
        ...s.creditSettings,
        interestRatePct: result.value || 0
      }
    }));
  };

  const creditSettings = settings.creditSettings || {
    enabled: false,
    creditLineEUR: 500000,
    interestRatePct: 8.5
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Bank-Kreditlinie (CFO)
        </h3>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={creditSettings.enabled}
              onChange={e => onUpdate(s => ({
                ...s,
                creditSettings: {
                  ...s.creditSettings,
                  enabled: e.target.checked
                }
              }))}
            />
            <span style={{ fontWeight: 600 }}>
              Kreditlinie aktivieren
            </span>
          </label>
          <div style={{ fontSize: 12, color: '#6b7280', marginLeft: 28, marginTop: 4 }}>
            Ermöglicht dem CFO, bei Liquiditätsengpässen einen Kredit aufzunehmen
          </div>
        </div>

        {creditSettings.enabled && (
          <>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
                Kreditlinie (EUR)
              </label>
              <input
                type="number"
                min={0}
                step={10000}
                value={creditSettings.creditLineEUR}
                onChange={e => handleCreditLineChange(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: `1px solid ${creditLineError ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  width: '100%',
                  maxWidth: 250
                }}
              />
              {creditLineError && (
                <div style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>
                  {creditLineError}
                </div>
              )}
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                Aktuell: {formatCurrency(creditSettings.creditLineEUR)}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
                Jahreszins (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={creditSettings.interestRatePct}
                onChange={e => handleInterestRateChange(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: `1px solid ${interestRateError ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 6,
                  width: '100%',
                  maxWidth: 150
                }}
              />
              {interestRateError && (
                <div style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>
                  {interestRateError}
                </div>
              )}
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                Zinskosten werden täglich berechnet
              </div>
            </div>

            <div style={{
              padding: 12,
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: 6,
              marginTop: 16
            }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#0369a1' }}>
                ℹ️ Hinweise zur Kreditlinie
              </h4>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#075985' }}>
                <li>Nur der CFO kann die Kreditlinie nutzen</li>
                <li>Zinsen werden täglich auf den genutzten Betrag berechnet</li>
                <li>Die Kreditlinie kann mehrfach in Anspruch genommen werden</li>
                <li>Überschreitung der Kreditlinie ist nicht möglich</li>
              </ul>
            </div>

            <div style={{
              padding: 12,
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: 6,
              marginTop: 12
            }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#92400e' }}>
                ⚠️ Beispielrechnung
              </h4>
              <div style={{ fontSize: 13, color: '#78350f' }}>
                Bei einer Kreditlinie von {formatCurrency(creditSettings.creditLineEUR)} und
                einem Zins von {creditSettings.interestRatePct}% p.a.:
                <br />
                <strong>Tägliche Zinskosten bei voller Ausnutzung:</strong>{' '}
                {formatCurrency(
                  Math.round(creditSettings.creditLineEUR * (creditSettings.interestRatePct / 100) / 365)
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Erweiterte Bank-Optionen
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.allowOverdraft ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                allowOverdraft: e.target.checked
              }))}
            />
            <span>Kontoüberziehung erlauben (Dispositionskredit)</span>
          </label>

          {settings.allowOverdraft && (
            <div style={{ marginLeft: 28, marginTop: 8 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>
                Überziehungsrahmen (EUR):
              </label>
              <input
                type="number"
                min={0}
                step={10000}
                value={settings.overdraftLimitEUR ?? 100000}
                onChange={e => onUpdate(s => ({
                  ...s,
                  overdraftLimitEUR: Number(e.target.value)
                }))}
                style={{
                  padding: '6px 10px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  width: 200
                }}
              />
            </div>
          )}

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.showCreditHistory ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                showCreditHistory: e.target.checked
              }))}
            />
            <span>Kredit-Historie für CFO anzeigen</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.notifyTeamOnCreditDraw ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                notifyTeamOnCreditDraw: e.target.checked
              }))}
            />
            <span>Team über Kreditaufnahme benachrichtigen</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default BankSettingsTab;
