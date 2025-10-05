// src/components/multiplayer/components/OtherPlayersPanel.tsx
import React from 'react';
import type { RoleId } from '@/core/models/domain';

export interface PlayerInfo {
  id: string;
  role: RoleId;
  display_name: string;
  is_ready: boolean;
}

interface OtherPlayersPanelProps {
  players: PlayerInfo[];
}

export function OtherPlayersPanel({ players }: OtherPlayersPanelProps): JSX.Element {
  if (players.length === 0) {
    return (
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
          Andere Spieler
        </h3>
        <div style={{
          padding: 12,
          background: '#f9fafb',
          borderRadius: 8,
          color: '#6b7280',
          fontSize: 14
        }}>
          Keine anderen Spieler in diesem Spiel
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
        Andere Spieler
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {players.map(player => (
          <div
            key={player.id}
            style={{
              padding: 8,
              background: '#f3f4f6',
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <span style={{ fontWeight: 600, marginRight: 8 }}>
                {player.role}
              </span>
              <span style={{ color: '#6b7280' }}>
                {player.display_name}
              </span>
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: player.is_ready ? '#10b981' : '#ef4444'
              }}
              title={player.is_ready ? 'Bereit' : 'Nicht bereit'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherPlayersPanel;
