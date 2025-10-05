import React from 'react';
import type { RoleId, KPI } from '@/core/models/domain';

interface WhatIfPreviewProps {
  enabled: boolean;
  preview: { delta: Partial<KPI> } | null;
  role: RoleId;
  currentDay: number;
  onRunPreview: () => void;
  onClose: () => void;
}

export function WhatIfPreview({
  enabled,
  preview,
  role,
  currentDay,
  onRunPreview,
  onClose
}: WhatIfPreviewProps) {
  if (!enabled) return null;

  return (
    <>
      <button
        className="btn"
        onClick={onRunPreview}
        title="Erwartete KPI-Deltas für den nächsten Tag (nur sichtbare KPIs)"
        style={{
          position: 'fixed',
          left: 12,
          bottom: 12,
          opacity: 0.95,
          zIndex: 9998,
          padding: '8px 16px',
          background: '#8b5cf6',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        🔮 Vorschau
      </button>

      {preview && (
        <div
          style={{
            position: 'fixed',
            left: 12,
            bottom: 58,
            maxWidth: 320,
            background: 'linear-gradient(135deg, #f3f4f6, #ffffff)',
            color: '#4b5563',
            border: '2px solid #8b5cf6',
            borderRadius: 8,
            padding: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: 13,
            zIndex: 9997
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8, color: '#6366f1' }}>
            📊 Erwartete Δ bis Tag {currentDay + 1}
          </div>
          <div style={{ fontSize: 11, marginBottom: 6, color: '#9ca3af' }}>
            Nur sichtbare KPIs • Rolle: {role}
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, lineHeight: 1.6 }}>
            {Object.entries(preview.delta).map(([key, value]) => {
              const labels: Record<string, string> = {
                cashEUR: '💶 Cash',
                profitLossEUR: '📈 Gewinn/Verlust',
                customerLoyalty: '🤝 Kundentreue',
                bankTrust: '🏦 Bankvertrauen',
                workforceEngagement: '👥 Engagement',
                publicPerception: '🌍 Öff. Wahrnehmung'
              };

              if (value === undefined || value === null) return null;

              const formatted = key.includes('EUR')
                ? new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                    maximumFractionDigits: 0
                  }).format(value as number)
                : `${value >= 0 ? '+' : ''}${Math.round(value as number)}`;

              return (
                <li
                  key={key}
                  style={{
                    padding: '4px 0',
                    borderBottom: '1px solid #e5e7eb',
                    color: (value as number) >= 0 ? '#10b981' : '#ef4444',
                    fontWeight: 500
                  }}
                >
                  {labels[key] || key}: {formatted}
                </li>
              );
            })}
          </ul>
          <div
            style={{
              marginTop: 10,
              padding: 8,
              background: '#fef3c7',
              borderRadius: 4,
              fontSize: 11,
              color: '#92400e'
            }}
          >
            ⚠️ Zufallseinflüsse können Abweichungen verursachen
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
            <button
              className="btn"
              style={{
                fontSize: 12,
                padding: '4px 12px',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: 4,
                cursor: 'pointer',
                color: '#374151'
              }}
              onClick={onClose}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
