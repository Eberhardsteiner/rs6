import React from 'react';
import type { RoleId } from '@/core/models/domain';
import type { GameState } from '@/core/engine/gameEngine';
import type { EndingResult } from '@/core/engine/ending';

interface GameOverScreenProps {
  state: GameState;
  finalEnding: EndingResult;
  role: RoleId;
  kpiEstimates: Array<{ day: number; kpi: string; value: number; actual?: number; diff: number; accuracy: number }>;
  loadingComms: boolean;
  commsByRole: Record<RoleId, Array<{ day: number; text: string }>>;
}

export function GameOverScreen({
  state,
  finalEnding,
  role,
  kpiEstimates,
  loadingComms,
  commsByRole
}: GameOverScreenProps) {
  if (!state.isOver || !finalEnding) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      overflowY: 'auto',
      padding: 20
    }}>
      <div className="card" style={{
        maxWidth: 900,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: 32,
        background: 'linear-gradient(135deg, #ffffff, #f8fafc)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 32,
          padding: 24,
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          borderRadius: 12,
          color: 'white'
        }}>
          <h1 style={{ margin: '0 0 12px 0', fontSize: 32 }}>🎮 Spiel beendet!</h1>
          <h2 style={{ margin: 0, fontSize: 24 }}>{finalEnding.title}</h2>
          <p style={{ margin: '12px 0 0 0', fontSize: 14, opacity: 0.9 }}>
            {finalEnding.summary}
          </p>
        </div>

        {/* Score Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 32
        }}>
          <div style={{
            padding: 16,
            background: finalEnding.score >= 70 ? '#d1fae5' : finalEnding.score >= 40 ? '#fed7aa' : '#fee2e2',
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Gesamtscore</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: finalEnding.score >= 70 ? '#10b981' : finalEnding.score >= 40 ? '#f59e0b' : '#ef4444' }}>
              {finalEnding.score}/100
            </div>
          </div>

          <div style={{
            padding: 16,
            background: '#e0e7ff',
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Deine Rolle</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#6366f1' }}>
              {role}
            </div>
          </div>

          <div style={{
            padding: 16,
            background: '#fef3c7',
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, color: '#374151', marginBottom: 4 }}>Spieltage</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>
              {state.day} / 14
            </div>
          </div>
        </div>

        {/* Rest of the component would go here - for now just show basic info */}
        <div style={{ padding: 20, background: '#f9fafb', borderRadius: 8 }}>
          <p style={{ margin: 0, color: '#374151' }}>
            Detaillierte Analyse und weitere Statistiken werden hier angezeigt...
          </p>
        </div>
      </div>
    </div>
  );
}
