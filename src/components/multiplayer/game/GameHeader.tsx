import React from 'react';
import type { RoleId } from '@/core/models/domain';

interface GameHeaderProps {
  gameId: string;
  role: RoleId;
  isGM: boolean;
  copiedGameId: boolean;
  onCopyGameId: () => void;
  onLeave: () => void;
}

export function GameHeader({
  gameId,
  role,
  isGM,
  copiedGameId,
  onCopyGameId,
  onLeave
}: GameHeaderProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      color: 'white',
      padding: '12px 16px',
      marginBottom: 24,
      borderRadius: 8,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 18 }}>🎮 Mehrspielermodus</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span title={`Vollständige ID: ${gameId}`}>Spiel: <strong>{gameId.substring(0, 8)}...</strong></span>
          <button
            onClick={onCopyGameId}
            aria-live="polite"
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.35)',
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 12
            }}
            title="Spiel-ID in die Zwischenablage kopieren"
          >
            {copiedGameId ? 'Kopiert ✓' : 'Spiel-ID kopieren'}
          </button>
        </div>
        <span>Rolle: <strong>{role}</strong></span>
        {isGM && <span style={{ background: '#f59e0b', padding: '2px 8px', borderRadius: 4 }}>👑 GM</span>}
      </div>
      <button
        onClick={onLeave}
        style={{
          padding: '8px 16px',
          background: 'white',
          color: '#6366f1',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 600
        }}
      >
        Spiel verlassen
      </button>
    </div>
  );
}
