// src/components/multiplayer/sections/OtherPlayersSection.tsx
import type { RoleId } from '@/core/models/domain';

export interface OtherPlayersSectionProps {
  otherPlayers: Array<{ id: string; name: string; role: RoleId }>;
}

export function OtherPlayersSection({ otherPlayers }: OtherPlayersSectionProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h3>Andere Spieler</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {otherPlayers.map((player) => (
          <div
            key={player.id}
            style={{
              padding: 8,
              background: '#f3f4f6',
              borderRadius: 6,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ color: '#374151' }}>{player.name}</span>
            <span
              style={{
                padding: '2px 6px',
                background: '#6366f1',
                color: 'white',
                borderRadius: 4,
                fontSize: 12
              }}
            >
              {player.role || 'Keine Rolle'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
