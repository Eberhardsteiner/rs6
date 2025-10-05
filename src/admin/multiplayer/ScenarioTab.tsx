// src/admin/multiplayer/ScenarioTab.tsx
import React from 'react';
import type { MultiplayerAdminSettings } from '@/types/admin';
import {
  parseScenarioJSON,
  exportScenarioToJSON,
  downloadScenario,
  createScenarioFromTemplate,
  countScenarioEvents,
  getScenarioDayRange,
  type ParsedScenario
} from '@/utils/scenarioUtils';

interface ScenarioTabProps {
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

export function ScenarioTab({ settings, onUpdate }: ScenarioTabProps): JSX.Element {
  const [importText, setImportText] = React.useState('');
  const [importErrors, setImportErrors] = React.useState<string[]>([]);
  const [importWarnings, setImportWarnings] = React.useState<string[]>([]);
  const [showImport, setShowImport] = React.useState(false);

  const currentScenario: ParsedScenario = {
    scheduledDeltas: settings.scenarioOverrides?.scheduledDeltas || {},
    randomNews: settings.scenarioOverrides?.randomNews || {},
    meta: settings.scenarioOverrides?.meta || {}
  };

  const stats = countScenarioEvents(currentScenario);
  const dayRange = getScenarioDayRange(currentScenario);

  const handleImport = (): void => {
    const result = parseScenarioJSON(importText);

    if (!result.success) {
      setImportErrors(result.errors || ['Unbekannter Fehler']);
      setImportWarnings(result.warnings || []);
      return;
    }

    setImportErrors([]);
    setImportWarnings(result.warnings || []);

    onUpdate(s => ({
      ...s,
      scenarioOverrides: {
        scheduledDeltas: result.data?.scheduledDeltas || {},
        randomNews: result.data?.randomNews || {},
        meta: result.data?.meta || {}
      }
    }));

    setImportText('');
    setShowImport(false);
    alert('Szenario erfolgreich importiert!');
  };

  const handleExport = (): void => {
    try {
      downloadScenario(currentScenario, 'scenario-export.json');
    } catch (error) {
      alert('Fehler beim Exportieren: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'));
    }
  };

  const handleClear = (): void => {
    if (confirm('Möchten Sie alle Szenario-Overrides wirklich löschen?')) {
      onUpdate(s => ({
        ...s,
        scenarioOverrides: {
          scheduledDeltas: {},
          randomNews: {},
          meta: {}
        }
      }));
    }
  };

  const handleLoadTemplate = (template: 'crisis' | 'recovery' | 'stable'): void => {
    const templateScenario = createScenarioFromTemplate(template);

    onUpdate(s => ({
      ...s,
      scenarioOverrides: {
        scheduledDeltas: templateScenario.scheduledDeltas || {},
        randomNews: templateScenario.randomNews || {},
        meta: templateScenario.meta || {}
      }
    }));

    alert(`Template "${template}" wurde geladen!`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setImportText(text);
      setShowImport(true);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Szenario-Status
        </h3>

        {stats.totalDeltas === 0 && stats.totalNews === 0 ? (
          <div style={{
            padding: 20,
            textAlign: 'center',
            background: '#f9fafb',
            borderRadius: 8,
            color: '#6b7280'
          }}>
            Kein Szenario-Override aktiv. Standard-Szenario wird verwendet.
          </div>
        ) : (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
              marginBottom: 16
            }}>
              <div style={{
                padding: 12,
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: 8,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#0369a1' }}>
                  {stats.totalDeltas}
                </div>
                <div style={{ fontSize: 13, color: '#075985' }}>
                  KPI-Deltas
                </div>
              </div>

              <div style={{
                padding: 12,
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 8,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#166534' }}>
                  {stats.totalNews}
                </div>
                <div style={{ fontSize: 13, color: '#14532d' }}>
                  News-Events
                </div>
              </div>

              <div style={{
                padding: 12,
                background: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: 8,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#92400e' }}>
                  {stats.dayCount}
                </div>
                <div style={{ fontSize: 13, color: '#78350f' }}>
                  Betroffene Tage
                </div>
              </div>
            </div>

            {dayRange && (
              <div style={{ fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
                Tage {dayRange.min} bis {dayRange.max}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Szenario-Verwaltung
        </h3>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowImport(!showImport)}
            style={{
              padding: '10px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            📥 Importieren
          </button>

          <button
            onClick={handleExport}
            disabled={stats.totalDeltas === 0 && stats.totalNews === 0}
            style={{
              padding: '10px 20px',
              background: stats.totalDeltas === 0 && stats.totalNews === 0 ? '#e5e7eb' : '#10b981',
              color: stats.totalDeltas === 0 && stats.totalNews === 0 ? '#9ca3af' : 'white',
              border: 'none',
              borderRadius: 6,
              cursor: stats.totalDeltas === 0 && stats.totalNews === 0 ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            📤 Exportieren
          </button>

          <label style={{
            padding: '10px 20px',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            display: 'inline-block'
          }}>
            📁 Datei laden
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          <button
            onClick={handleClear}
            disabled={stats.totalDeltas === 0 && stats.totalNews === 0}
            style={{
              padding: '10px 20px',
              background: stats.totalDeltas === 0 && stats.totalNews === 0 ? '#e5e7eb' : '#ef4444',
              color: stats.totalDeltas === 0 && stats.totalNews === 0 ? '#9ca3af' : 'white',
              border: 'none',
              borderRadius: 6,
              cursor: stats.totalDeltas === 0 && stats.totalNews === 0 ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            🗑️ Löschen
          </button>
        </div>
      </div>

      {showImport && (
        <div style={box}>
          <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
            Szenario importieren
          </h3>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
              JSON-Daten:
            </label>
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder='{"scheduledDeltas": {...}, "randomNews": {...}}'
              rows={10}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontFamily: 'monospace',
                fontSize: 12,
                resize: 'vertical'
              }}
            />
          </div>

          {importErrors.length > 0 && (
            <div style={{
              padding: 12,
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 6,
              marginBottom: 12
            }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#991b1b' }}>
                ❌ Fehler:
              </h4>
              {importErrors.map((error, i) => (
                <div key={i} style={{ fontSize: 13, color: '#991b1b' }}>
                  • {error}
                </div>
              ))}
            </div>
          )}

          {importWarnings.length > 0 && (
            <div style={{
              padding: 12,
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: 6,
              marginBottom: 12
            }}>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#92400e' }}>
                ⚠️ Warnungen:
              </h4>
              {importWarnings.map((warning, i) => (
                <div key={i} style={{ fontSize: 13, color: '#78350f' }}>
                  • {warning}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleImport}
              disabled={!importText.trim()}
              style={{
                padding: '10px 20px',
                background: importText.trim() ? '#3b82f6' : '#e5e7eb',
                color: importText.trim() ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: 6,
                cursor: importText.trim() ? 'pointer' : 'not-allowed',
                fontSize: 14,
                fontWeight: 600
              }}
            >
              ✓ Importieren
            </button>
            <button
              onClick={() => {
                setShowImport(false);
                setImportText('');
                setImportErrors([]);
                setImportWarnings([]);
              }}
              style={{
                padding: '10px 20px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Vorlagen
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <button
            onClick={() => handleLoadTemplate('crisis')}
            style={{
              padding: '16px',
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#ef4444';
              e.currentTarget.style.background = '#fef2f2';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>📉</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Crisis</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Negative KPI-Deltas über mehrere Tage verteilt
            </div>
          </button>

          <button
            onClick={() => handleLoadTemplate('recovery')}
            style={{
              padding: '16px',
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#10b981';
              e.currentTarget.style.background = '#f0fdf4';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>📈</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Recovery</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Positive KPI-Deltas zur Erholung
            </div>
          </button>

          <button
            onClick={() => handleLoadTemplate('stable')}
            style={{
              padding: '16px',
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
            <div style={{ fontSize: 32, marginBottom: 8 }}>⚖️</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Stable</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              Minimale Schwankungen für ruhiges Spiel
            </div>
          </button>
        </div>
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          ℹ️ Hinweise zum Szenario-Override
        </h3>

        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#6b7280' }}>
          <li style={{ marginBottom: 8 }}>
            Szenario-Overrides <strong>überschreiben</strong> das Standard-Szenario
          </li>
          <li style={{ marginBottom: 8 }}>
            <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
              scheduledDeltas
            </code> definiert KPI-Änderungen pro Tag
          </li>
          <li style={{ marginBottom: 8 }}>
            <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
              randomNews
            </code> definiert zusätzliche News-Events
          </li>
          <li style={{ marginBottom: 8 }}>
            JSON-Format: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
              {`{"scheduledDeltas": {"1": [...], "2": [...]}, "randomNews": {...}}`}
            </code>
          </li>
          <li>
            Verwenden Sie Templates als Ausgangspunkt und passen Sie diese an
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ScenarioTab;
