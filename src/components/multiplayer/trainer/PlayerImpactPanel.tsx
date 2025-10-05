// src/components/multiplayer/trainer/PlayerImpactPanel.tsx
import React from 'react';
import type { RoleId } from '@/core/models/domain';
import {
  aggregateImpactByRole,
  getDecisionCount,
  formatImpact,
  getImpactColor,
  type Decision,
  type RoleImpact,
  ROLES
} from './trainerHelpers';

interface PlayerImpactPanelProps {
  decisions: Decision[];
}

export function PlayerImpactPanel({ decisions }: PlayerImpactPanelProps): JSX.Element {
  const impactByRole = aggregateImpactByRole(decisions);
  const counts = getDecisionCount(decisions);

  return (
    <div style={{
      background: 'white',
      borderRadius: 8,
      padding: 16,
      border: '1px solid #e5e7eb',
      marginBottom: 16
    }}>
      <h3 style={{
        margin: '0 0 16px',
        fontSize: 18,
        fontWeight: 700
      }}>
        KPI-Impact nach Rolle
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12
      }}>
        {ROLES.map(role => {
          const impact = impactByRole[role];
          const count = counts[role];

          return (
            <div
              key={role}
              style={{
                padding: 12,
                background: '#f9fafb',
                borderRadius: 8,
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8
              }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>
                  {role}
                </span>
                <span style={{
                  fontSize: 12,
                  color: '#6b7280',
                  background: '#e5e7eb',
                  padding: '2px 8px',
                  borderRadius: 12
                }}>
                  {count} Entsch.
                </span>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                fontSize: 12
              }}>
                <ImpactRow
                  label="💰 Cash"
                  value={impact.cashEUR}
                  isFinancial
                />
                <ImpactRow
                  label="📊 P&L"
                  value={impact.profitLossEUR}
                  isFinancial
                />
                <ImpactRow
                  label="👥 Kunden"
                  value={impact.customerLoyalty}
                />
                <ImpactRow
                  label="🏦 Bank"
                  value={impact.bankTrust}
                />
                <ImpactRow
                  label="⚡ MA"
                  value={impact.workforceEngagement}
                />
                <ImpactRow
                  label="🌍 Public"
                  value={impact.publicPerception}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ImpactRowProps {
  label: string;
  value: number;
  isFinancial?: boolean;
}

function ImpactRow({ label, value, isFinancial = false }: ImpactRowProps): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ color: '#6b7280' }}>{label}</span>
      <span
        style={{
          fontWeight: 600,
          color: getImpactColor(value)
        }}
      >
        {formatImpact(value, isFinancial)}
      </span>
    </div>
  );
}

export default PlayerImpactPanel;
