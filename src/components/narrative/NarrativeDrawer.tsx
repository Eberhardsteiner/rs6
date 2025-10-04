// src/components/narrative/NarrativeDrawer.tsx
import React from 'react';
import type { DayNewsItem, RoleId } from '@/core/models/domain';
import type { GameState } from '@/core/engine/gameEngine';

export default function NarrativeDrawer({
  beat, currentRoles, gameState, onClose
}:{ beat: DayNewsItem; currentRoles: RoleId[]; gameState: GameState; onClose:()=>void }) {

  // Ermittelt den vollständigen Text aus expandedText (String oder Funktion) mit Fallbacks
  const getFullText = (): string => {
    const anyBeat = beat as any;
    if (!anyBeat.expandedText) {
      return anyBeat.content ?? ''; // Fallback auf content
    }

    if (typeof anyBeat.expandedText === 'function') {
      try {
        const ctx = {
          day: gameState.day,
          kpi: gameState.kpi,
          log: gameState.log,
          meta: gameState.engineMeta,
          roles: currentRoles
        };
        return String(anyBeat.expandedText(ctx));
      } catch (error) {
        console.error('Error executing expandedText function:', error);
        return anyBeat.content ?? '';
      }
    }

    return String(anyBeat.expandedText); // direkter String
  };

  const fullText = getFullText();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <h3 style={{margin:0}}>{(beat as any).title ?? 'Details'}</h3>
          <button className="btn" onClick={onClose}>Schließen</button>
        </div>

        <div style={{
          marginTop: 16,
          padding: 16,
          background: '#f8fafc',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          lineHeight: 1.6,
          fontSize: 14,
          color: '#374151'
        }}>
          {fullText.split('\n').map((line, i) => (
            <p key={i} style={{ margin: '0 0 12px' }}>
              {line.trim() || '\u00A0'}
            </p>
          ))}
        </div>

        {/* Anlagen anzeigen falls vorhanden */}
        {Array.isArray((beat as any).attachments) && (beat as any).attachments.length > 0 && (
          <div style={{
            marginTop: 16,
            padding: 12,
            background: '#f0f9ff',
            borderRadius: 8,
            border: '1px solid #bae6fd',
            fontSize: 14,
            color: '#0c4a6e'
          }}>
            <strong>Anlagen:</strong> {(beat as any).attachments.join(', ')}
          </div>
        )}

        {/* Quelle & Severity */}
        <div style={{
          marginTop: 16,
          padding: 12,
          background: '#f1f5f9',
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          fontSize: 14,
          color: '#334155'
        }}>
          <strong>Quelle:</strong> {(beat as any).source ?? '–'} |{' '}
          <strong>Schweregrad:</strong> {(beat as any).severity ?? 'info'}
        </div>
      </div>
    </div>
  );
}
