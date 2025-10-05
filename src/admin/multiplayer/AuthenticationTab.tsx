// src/admin/multiplayer/AuthenticationTab.tsx
import React from 'react';
import type { MultiplayerAdminSettings, RoleId } from '@/types/admin';

interface AuthenticationTabProps {
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

function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export function AuthenticationTab({ settings, onUpdate }: AuthenticationTabProps): JSX.Element {
  const roles: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];

  const generateCredentials = (): void => {
    const newCredentials = {} as typeof settings.presetCredentials;
    roles.forEach(role => {
      newCredentials[role] = {
        username: `${role.toLowerCase()}_${Math.random().toString(36).substring(7)}`,
        password: generatePassword()
      };
    });
    onUpdate(s => ({ ...s, presetCredentials: newCredentials }));
  };

  const handleCopyCredentials = async (): Promise<void> => {
    try {
      const text = Object.entries(settings.presetCredentials)
        .map(([role, creds]) => `${role}: ${creds.username} / ${creds.password}`)
        .join('\n');

      await navigator.clipboard.writeText(text);
      alert('Alle Zugangsdaten wurden in die Zwischenablage kopiert.');
    } catch (err) {
      console.error('Fehler beim Kopieren:', err);
      alert('Kopieren in die Zwischenablage nicht möglich.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Authentifizierung
        </h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Anmelde-Modus
          </label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                checked={settings.authMode === 'name-only'}
                onChange={() => onUpdate(s => ({ ...s, authMode: 'name-only' }))}
              />
              Nur Name (Anonym)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                checked={settings.authMode === 'email'}
                onChange={() => onUpdate(s => ({ ...s, authMode: 'email' }))}
              />
              Email-Registrierung
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="radio"
                checked={settings.authMode === 'preset-credentials'}
                onChange={() => onUpdate(s => ({ ...s, authMode: 'preset-credentials' }))}
              />
              Vorgegebene Zugangsdaten
            </label>
          </div>
        </div>

        {settings.authMode === 'preset-credentials' && (
          <div style={{
            marginTop: 20,
            padding: 16,
            background: '#f9fafb',
            borderRadius: 8
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12
            }}>
              <h4 style={{ margin: 0 }}>Zugangsdaten für Rollen</h4>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={generateCredentials}
                  style={{
                    padding: '6px 12px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  🎲 Neue generieren
                </button>
                <button
                  onClick={handleCopyCredentials}
                  style={{
                    padding: '6px 12px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  📋 Alle kopieren
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12
            }}>
              {roles.map(role => (
                <div
                  key={role}
                  style={{
                    padding: 12,
                    background: 'white',
                    borderRadius: 6,
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <h5 style={{ margin: '0 0 8px', color: '#374151' }}>
                    {role}
                  </h5>
                  <div style={{
                    fontSize: 13,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                  }}>
                    <div>
                      <span style={{ color: '#6b7280' }}>User:</span>{' '}
                      <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
                        {settings.presetCredentials[role].username}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#6b7280' }}>Pass:</span>{' '}
                      <span style={{ fontFamily: 'monospace', fontSize: 12 }}>
                        {settings.presetCredentials[role].password}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Spielstart-Regeln
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.allowEarlyEntry || false}
              onChange={e => onUpdate(s => ({
                ...s,
                allowEarlyEntry: e.target.checked
              }))}
            />
            <span>Früherer Eintritt erlauben (vor allen Spielern)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.forceAllPlayersForAdvance || false}
              onChange={e => onUpdate(s => ({
                ...s,
                forceAllPlayersForAdvance: e.target.checked
              }))}
            />
            <span>Alle Spieler müssen bereit sein für Tageswechsel</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.autoStartWhenReady || false}
              onChange={e => onUpdate(s => ({
                ...s,
                autoStartWhenReady: e.target.checked
              }))}
            />
            <span>Automatisch starten wenn alle bereit</span>
          </label>

          {settings.autoStartWhenReady && (
            <div style={{ marginLeft: 28, marginTop: 8 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>
                Verzögerung (Sekunden):
              </label>
              <input
                type="number"
                min={0}
                max={60}
                value={settings.autoStartDelaySeconds || 5}
                onChange={e => onUpdate(s => ({
                  ...s,
                  autoStartDelaySeconds: Number(e.target.value)
                }))}
                style={{
                  padding: '6px 10px',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  width: 100
                }}
              />
            </div>
          )}

          <div style={{ marginTop: 8 }}>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14 }}>
              Lobby-Countdown (Sekunden):
            </label>
            <input
              type="number"
              min={0}
              max={300}
              value={settings.lobbyCountdownSeconds || 10}
              onChange={e => onUpdate(s => ({
                ...s,
                lobbyCountdownSeconds: Number(e.target.value)
              }))}
              style={{
                padding: '6px 10px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                width: 100
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationTab;
