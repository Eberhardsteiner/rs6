import React from 'react';
import type { RoleId } from '@/core/models/domain';
import type { GameState } from '@/core/engine/gameEngine';
import ExportButtons from '@/components/exports/ExportButtons';
import DebriefButton from '@/components/exports/DebriefButton';

interface ControlsPanelProps {
  role: RoleId;
  state: GameState;
  gameId: string;
  showDeclarationButton: boolean;
  onDeclareInsolvency: () => void;
  onShowDecisionHistory: () => void;
  InfoButtons?: React.ComponentType;
  ExportReportButtonMP: React.ComponentType<{ fileName: string; state: GameState; role: RoleId }>;
}

export function ControlsPanel({
  role,
  state,
  gameId,
  showDeclarationButton,
  onDeclareInsolvency,
  onShowDecisionHistory,
  InfoButtons,
  ExportReportButtonMP
}: ControlsPanelProps) {
  return (
    <>
      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {showDeclarationButton && role === 'CEO' && (
          <button
            onClick={onDeclareInsolvency}
            style={{
              flex: 1,
              padding: '8px',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ⚠️ Insolvenz erklären
          </button>
        )}

        <button
          onClick={onShowDecisionHistory}
          style={{
            flex: 1,
            padding: '8px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          📊 Entscheidungs-Historie
        </button>
      </div>

      {/* Export and Info Controls */}
      <div style={{
        padding: 12,
        background: '#f9fafb',
        borderRadius: 8,
        border: '1px solid #e5e7eb',
        marginBottom: 16
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#374151' }}>
          📋 Protokolle & Informationen
        </h4>

        {InfoButtons && <InfoButtons />}

        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 8
        }}>
          <ExportReportButtonMP
            fileName={`Gesamtprotokoll_${role}_Tag${state.day}.pdf`}
            state={state}
            role={role}
          />
          <DebriefButton
            label="🧭 Debriefing"
            style={{
              padding: '8px 16px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600
            }}
            state={state}
          />
        </div>

        <ExportButtons
          onExportStateJSON={() => {
            const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `game-state-${gameId}-day${state.day}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          style={{ marginTop: 8 }}
        />
      </div>
    </>
  );
}
