// src/admin/multiplayer/TimerSettingsTab.tsx
import React from 'react';
import type { MultiplayerAdminSettings, RoleId } from '@/types/admin';
import { formatTime, validateRoundTime } from '@/utils/timerUtils';

interface TimerSettingsTabProps {
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

export function TimerSettingsTab({ settings, onUpdate }: TimerSettingsTabProps): JSX.Element {
  const roles: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];
  const days = Array.from({ length: 14 }, (_, i) => i + 1);

  const handleModeChange = (mode: 'off' | 'fixed' | 'matrix'): void => {
    onUpdate(s => ({ ...s, roundTimeMode: mode }));
  };

  const handleGlobalTimeChange = (seconds: number): void => {
    if (validateRoundTime(seconds)) {
      onUpdate(s => ({ ...s, roundTimeGlobalSec: seconds }));
    }
  };

  const handleGraceTimeChange = (seconds: number): void => {
    onUpdate(s => ({ ...s, roundTimeGraceSec: seconds }));
  };

  const handleMatrixChange = (role: RoleId, day: number, seconds: number): void => {
    if (!validateRoundTime(seconds)) return;

    onUpdate(s => ({
      ...s,
      roundTimeMatrix: {
        ...s.roundTimeMatrix,
        [role]: {
          ...(s.roundTimeMatrix?.[role] || {}),
          [day]: seconds
        }
      }
    }));
  };

  const handleSetAllForRole = (role: RoleId, seconds: number): void => {
    if (!validateRoundTime(seconds)) return;

    const roleTimes: Record<number, number> = {};
    days.forEach(day => {
      roleTimes[day] = seconds;
    });

    onUpdate(s => ({
      ...s,
      roundTimeMatrix: {
        ...s.roundTimeMatrix,
        [role]: roleTimes
      }
    }));
  };

  const handleSetAllForDay = (day: number, seconds: number): void => {
    if (!validateRoundTime(seconds)) return;

    onUpdate(s => {
      const newMatrix = { ...s.roundTimeMatrix };
      roles.forEach(role => {
        newMatrix[role] = {
          ...(newMatrix[role] || {}),
          [day]: seconds
        };
      });
      return { ...s, roundTimeMatrix: newMatrix };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Rundenzeit-Modus
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="radio"
              checked={settings.roundTimeMode === 'off'}
              onChange={() => handleModeChange('off')}
            />
            <span style={{ fontWeight: 600 }}>Aus</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              (Keine Zeitbegrenzung)
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="radio"
              checked={settings.roundTimeMode === 'fixed'}
              onChange={() => handleModeChange('fixed')}
            />
            <span style={{ fontWeight: 600 }}>Feste Zeit</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              (Gleiche Zeit für alle Rollen und Tage)
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="radio"
              checked={settings.roundTimeMode === 'matrix'}
              onChange={() => handleModeChange('matrix')}
            />
            <span style={{ fontWeight: 600 }}>Matrix</span>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              (Individuelle Zeit pro Rolle und Tag)
            </span>
          </label>
        </div>
      </div>

      {settings.roundTimeMode === 'fixed' && (
        <div style={box}>
          <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
            Feste Rundenzeit
          </h3>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
              Zeit pro Runde (Sekunden)
            </label>
            <input
              type="number"
              min={10}
              max={7200}
              step={30}
              value={settings.roundTimeGlobalSec || 300}
              onChange={e => handleGlobalTimeChange(Number(e.target.value))}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                width: 150
              }}
            />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              {formatTime(settings.roundTimeGlobalSec || 300)} pro Runde
            </div>
          </div>

          <div style={{
            padding: 12,
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: 6
          }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#0369a1' }}>
              ℹ️ Empfohlene Zeiten
            </h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#075985' }}>
              <li>Schnell: 180 Sekunden (3 Minuten)</li>
              <li>Standard: 300 Sekunden (5 Minuten)</li>
              <li>Komfortabel: 600 Sekunden (10 Minuten)</li>
            </ul>
          </div>
        </div>
      )}

      {settings.roundTimeMode === 'matrix' && (
        <div style={box}>
          <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
            Zeit-Matrix
          </h3>

          <div style={{
            overflowX: 'auto',
            marginBottom: 16
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 13
            }}>
              <thead>
                <tr>
                  <th style={{
                    padding: '8px',
                    textAlign: 'left',
                    borderBottom: '2px solid #e5e7eb',
                    fontWeight: 600
                  }}>
                    Rolle
                  </th>
                  {days.map(day => (
                    <th key={day} style={{
                      padding: '8px',
                      textAlign: 'center',
                      borderBottom: '2px solid #e5e7eb',
                      fontWeight: 600,
                      fontSize: 12
                    }}>
                      T{day}
                    </th>
                  ))}
                  <th style={{
                    padding: '8px',
                    textAlign: 'center',
                    borderBottom: '2px solid #e5e7eb',
                    fontWeight: 600
                  }}>
                    Alle
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role}>
                    <td style={{
                      padding: '8px',
                      fontWeight: 600,
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      {role}
                    </td>
                    {days.map(day => {
                      const time = settings.roundTimeMatrix?.[role]?.[day] || 300;
                      return (
                        <td key={day} style={{
                          padding: '4px',
                          textAlign: 'center',
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          <input
                            type="number"
                            min={10}
                            max={7200}
                            step={30}
                            value={time}
                            onChange={e => handleMatrixChange(role, day, Number(e.target.value))}
                            style={{
                              width: 60,
                              padding: '4px',
                              border: '1px solid #d1d5db',
                              borderRadius: 4,
                              textAlign: 'center',
                              fontSize: 12
                            }}
                          />
                        </td>
                      );
                    })}
                    <td style={{
                      padding: '4px',
                      textAlign: 'center',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <button
                        onClick={() => {
                          const time = prompt('Zeit (Sekunden) für alle Tage dieser Rolle:', '300');
                          if (time) handleSetAllForRole(role, Number(time));
                        }}
                        style={{
                          padding: '4px 8px',
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontSize: 11
                        }}
                      >
                        Set
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{
                    padding: '8px',
                    fontWeight: 600,
                    borderTop: '2px solid #e5e7eb'
                  }}>
                    Alle Rollen
                  </td>
                  {days.map(day => (
                    <td key={day} style={{
                      padding: '4px',
                      textAlign: 'center',
                      borderTop: '2px solid #e5e7eb'
                    }}>
                      <button
                        onClick={() => {
                          const time = prompt(`Zeit (Sekunden) für alle Rollen an Tag ${day}:`, '300');
                          if (time) handleSetAllForDay(day, Number(time));
                        }}
                        style={{
                          padding: '4px 8px',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontSize: 11
                        }}
                      >
                        Set
                      </button>
                    </td>
                  ))}
                  <td />
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{
            padding: 12,
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 6
          }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#92400e' }}>
              💡 Tipps zur Zeit-Matrix
            </h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#78350f' }}>
              <li>Frühe Tage: Mehr Zeit für Einarbeitung (600s)</li>
              <li>Mittlere Tage: Standard-Zeit (300s)</li>
              <li>Späte Tage: Weniger Zeit für mehr Druck (180s)</li>
              <li>CFO: Oft mehr Zeit wegen Kreditentscheidungen</li>
            </ul>
          </div>
        </div>
      )}

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Erweiterte Timer-Optionen
        </h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Gnadenfrist nach Ablauf (Sekunden)
          </label>
          <input
            type="number"
            min={0}
            max={300}
            step={10}
            value={settings.roundTimeGraceSec || 180}
            onChange={e => handleGraceTimeChange(Number(e.target.value))}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              width: 150
            }}
          />
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
            Zusätzliche Zeit nach Timer-Ablauf für langsame Spieler
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.showTimerWarnings ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                showTimerWarnings: e.target.checked
              }))}
            />
            <span>Timer-Warnungen anzeigen</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.pauseTimerOnDisconnect ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                pauseTimerOnDisconnect: e.target.checked
              }))}
            />
            <span>Timer pausieren bei Verbindungsabbruch</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.allowTimerExtension ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                allowTimerExtension: e.target.checked
              }))}
            />
            <span>Trainer darf Timer verlängern</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default TimerSettingsTab;
