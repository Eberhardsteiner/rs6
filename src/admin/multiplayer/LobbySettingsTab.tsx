// src/admin/multiplayer/LobbySettingsTab.tsx
import React from 'react';
import type { MultiplayerAdminSettings } from '@/types/admin';

interface LobbySettingsTabProps {
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

export function LobbySettingsTab({ settings, onUpdate }: LobbySettingsTabProps): JSX.Element {
  const lobbyThemes = [
    { value: 'corporate', label: 'Corporate' },
    { value: 'crisis', label: 'Crisis' },
    { value: 'minimal', label: 'Minimal' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Lobby-Einstellungen
        </h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Hintergrund-Theme
          </label>
          <select
            value={settings.lobbySettings?.backgroundTheme || 'corporate'}
            onChange={e => onUpdate(s => ({
              ...s,
              lobbySettings: {
                ...s.lobbySettings,
                backgroundTheme: e.target.value as 'corporate' | 'crisis' | 'minimal'
              }
            }))}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              width: '100%',
              maxWidth: 300
            }}
          >
            {lobbyThemes.map(theme => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.lobbySettings?.showTimer ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                lobbySettings: {
                  ...s.lobbySettings,
                  showTimer: e.target.checked
                }
              }))}
            />
            <span>Timer in Lobby anzeigen</span>
          </label>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Willkommensnachricht
          </label>
          <textarea
            value={settings.lobbySettings?.welcomeMessage || ''}
            onChange={e => onUpdate(s => ({
              ...s,
              lobbySettings: {
                ...s.lobbySettings,
                welcomeMessage: e.target.value
              }
            }))}
            placeholder="Willkommen zur Crisis Management Simulation!"
            rows={3}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              width: '100%',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
            Diese Nachricht wird in der Lobby angezeigt
          </div>
        </div>
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Spieler-Verwaltung
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.allowSpectators ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                allowSpectators: e.target.checked
              }))}
            />
            <span>Zuschauer erlauben</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.allowRoleSwitch ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                allowRoleSwitch: e.target.checked
              }))}
            />
            <span>Rollen-Wechsel in Lobby erlauben</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.showPlayerList ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                showPlayerList: e.target.checked
              }))}
            />
            <span>Spielerliste anzeigen</span>
          </label>
        </div>
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Erweiterte Optionen
        </h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Maximale Anzahl Spieler
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={settings.maxPlayers ?? 4}
            onChange={e => onUpdate(s => ({
              ...s,
              maxPlayers: Number(e.target.value)
            }))}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              width: 100
            }}
          />
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
            Standard: 4 (CEO, CFO, OPS, HRLEGAL)
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Lobby-Timeout (Minuten)
          </label>
          <input
            type="number"
            min={5}
            max={120}
            value={settings.lobbyTimeoutMinutes ?? 30}
            onChange={e => onUpdate(s => ({
              ...s,
              lobbyTimeoutMinutes: Number(e.target.value)
            }))}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              width: 100
            }}
          />
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
            Automatisch schließen nach Inaktivität
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={settings.requireAllRolesFilled ?? true}
            onChange={e => onUpdate(s => ({
              ...s,
              requireAllRolesFilled: e.target.checked
            }))}
          />
          <span>Alle Rollen müssen besetzt sein zum Spielstart</span>
        </label>
      </div>
    </div>
  );
}

export default LobbySettingsTab;
