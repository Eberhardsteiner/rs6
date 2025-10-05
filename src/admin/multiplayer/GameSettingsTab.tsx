// src/admin/multiplayer/GameSettingsTab.tsx
import React from 'react';
import type { MultiplayerAdminSettings } from '@/types/admin';

interface GameSettingsTabProps {
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

export function GameSettingsTab({ settings, onUpdate }: GameSettingsTabProps): JSX.Element {
  const gameThemes = [
    { value: 'dynamic', label: 'Dynamisch (KPI-basiert)' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'crisis', label: 'Crisis' },
    { value: 'recovery', label: 'Recovery' },
    { value: 'minimal', label: 'Minimal' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Einfach' },
    { value: 'normal', label: 'Normal' },
    { value: 'hard', label: 'Schwer' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Visuelle Einstellungen
        </h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Hintergrund-Theme
          </label>
          <select
            value={settings.gameSettings?.backgroundTheme || 'dynamic'}
            onChange={e => onUpdate(s => ({
              ...s,
              gameSettings: {
                ...s.gameSettings,
                backgroundTheme: e.target.value as 'dynamic' | 'corporate' | 'crisis' | 'recovery' | 'minimal'
              }
            }))}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              width: '100%',
              maxWidth: 350
            }}
          >
            {gameThemes.map(theme => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
            {settings.gameSettings?.backgroundTheme === 'dynamic' &&
              'Theme passt sich automatisch an die KPI-Performance an'}
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={settings.gameSettings?.allowUserOverride ?? false}
            onChange={e => onUpdate(s => ({
              ...s,
              gameSettings: {
                ...s.gameSettings,
                allowUserOverride: e.target.checked
              }
            }))}
          />
          <span>Spieler dürfen Theme ändern</span>
        </label>
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Schwierigkeitsgrad
        </h3>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Grund-Schwierigkeit
          </label>
          <select
            value={settings.mpDifficulty || 'normal'}
            onChange={e => onUpdate(s => ({
              ...s,
              mpDifficulty: e.target.value as 'easy' | 'normal' | 'hard'
            }))}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              width: '100%',
              maxWidth: 250
            }}
          >
            {difficulties.map(diff => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
            Beeinflusst KPI-Deltas und Event-Häufigkeit
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={settings.adaptiveDifficultyLight ?? false}
            onChange={e => onUpdate(s => ({
              ...s,
              adaptiveDifficultyLight: e.target.checked
            }))}
          />
          <span>Adaptive Schwierigkeit (Light-Modus)</span>
        </label>
        <div style={{ fontSize: 12, color: '#6b7280', marginLeft: 28, marginTop: 4 }}>
          Passt Schwierigkeit dynamisch an Team-Performance an
        </div>
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Spielmechanik
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.randomNews ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                randomNews: e.target.checked
              }))}
            />
            <span>Zufällige News-Events aktivieren</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.features?.roleBasedRandomNews ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                features: {
                  ...s.features,
                  roleBasedRandomNews: e.target.checked
                }
              }))}
            />
            <span>Rollenbasierte Random News</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.features?.eventIntensity ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                features: {
                  ...s.features,
                  eventIntensity: e.target.checked
                }
              }))}
            />
            <span>Event-Intensität pro Tag konfigurierbar</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.features?.whatIfPreview ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                features: {
                  ...s.features,
                  whatIfPreview: e.target.checked
                }
              }))}
            />
            <span>What-If Preview für Entscheidungen</span>
          </label>
        </div>
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Zusatzfunktionen
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.features?.saveLoadMenu ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                features: {
                  ...s.features,
                  saveLoadMenu: e.target.checked
                }
              }))}
            />
            <span>Speichern/Laden-Menü</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.features?.autoSave ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                features: {
                  ...s.features,
                  autoSave: e.target.checked
                }
              }))}
            />
            <span>Automatisches Speichern</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.features?.coach ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                features: {
                  ...s.features,
                  coach: e.target.checked
                }
              }))}
            />
            <span>Coach-Funktion aktivieren</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.features?.trainerAccess ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                features: {
                  ...s.features,
                  trainerAccess: e.target.checked
                }
              }))}
            />
            <span>Trainer-Zugriff aktivieren</span>
          </label>
        </div>
      </div>

      <div style={box}>
        <h3 style={{ marginTop: 0, fontSize: 18, fontWeight: 700 }}>
          Chat & Kommunikation
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.enableChat ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                enableChat: e.target.checked
              }))}
            />
            <span>Team-Chat aktivieren</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.allowPrivateMessages ?? false}
              onChange={e => onUpdate(s => ({
                ...s,
                allowPrivateMessages: e.target.checked
              }))}
            />
            <span>Private Nachrichten erlauben</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={settings.showTypingIndicator ?? true}
              onChange={e => onUpdate(s => ({
                ...s,
                showTypingIndicator: e.target.checked
              }))}
            />
            <span>Tipp-Indikator anzeigen</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default GameSettingsTab;
