import React from 'react';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KPI } from '@/core/models/domain';

interface KpiHistoryModalProps {
  kpiKey: keyof KPI;
  kpiHistory: KPI[];
  currentKpi: KPI;
  onClose: () => void;
}

const KPI_LABELS: Record<keyof KPI, string> = {
  cashEUR: 'Liquidität',
  profitLossEUR: 'Gewinn/Verlust',
  customerLoyalty: 'Kundentreue',
  bankTrust: 'Bankvertrauen',
  workforceEngagement: 'Belegschaftsengagement',
  publicPerception: 'Öffentliche Wahrnehmung'
};

const KPI_UNITS: Record<keyof KPI, string> = {
  cashEUR: '€',
  profitLossEUR: '€',
  customerLoyalty: 'Punkte',
  bankTrust: 'Punkte',
  workforceEngagement: 'Punkte',
  publicPerception: 'Punkte'
};

const formatValue = (value: number, kpiKey: keyof KPI): string => {
  if (kpiKey === 'cashEUR' || kpiKey === 'profitLossEUR') {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  }
  return `${Math.round(value)} Punkte`;
};

const getTrendIcon = (current: number, previous: number) => {
  if (current > previous) return <TrendingUp size={16} style={{ color: '#10b981' }} />;
  if (current < previous) return <TrendingDown size={16} style={{ color: '#ef4444' }} />;
  return <Minus size={16} style={{ color: '#6b7280' }} />;
};

const getTrendColor = (current: number, previous: number) => {
  if (current > previous) return '#10b981';
  if (current < previous) return '#ef4444';
  return '#6b7280';
};

export default function KpiHistoryModal({ kpiKey, kpiHistory, currentKpi, onClose }: KpiHistoryModalProps) {
  const label = KPI_LABELS[kpiKey];
  const unit = KPI_UNITS[kpiKey];
  
  // Vollständige Historie: kpiHistory + aktueller Wert
  const fullHistory = [...kpiHistory, currentKpi];
  const values = fullHistory.map(kpi => kpi[kpiKey]);
  
  // Chart-Daten für einfache Visualisierung
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;
  
  const normalizeValue = (value: number) => {
    if (range === 0) return 50; // Alle Werte gleich
    return ((value - minValue) / range) * 100;
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        className="modal" 
        onClick={e => e.stopPropagation()}
        style={{ 
          maxWidth: '800px', 
          width: '90vw',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '2px solid #0ea5e9',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px',
          borderBottom: '2px solid #e0f2fe',
          paddingBottom: '16px',
          background: 'linear-gradient(135deg, #e0f2fe 0%, #0ea5e910 100%)',
          margin: '-24px -24px 24px -24px',
          padding: '20px 24px',
          borderRadius: '16px 16px 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              color: '#0ea5e9',
              background: 'white',
              padding: '8px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <TrendingUp size={20} />
            </div>
            <h2 style={{ 
              margin: 0, 
              color: '#0369a1',
              fontSize: '1.5em',
              fontWeight: '700'
            }}>
              {label} - Entwicklung
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: 'white',
              border: '1px solid #0ea5e9',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#0ea5e9',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0ea5e9';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#0ea5e9';
            }}
          >
            <X size={16} />
            Schließen
          </button>
        </div>

        {/* Aktueller Wert */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          border: '1px solid #bae6fd',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#0369a1', marginBottom: '4px' }}>
            Aktueller Wert (Tag {fullHistory.length})
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0c4a6e' }}>
            {formatValue(currentKpi[kpiKey], kpiKey)}
          </div>
        </div>

        {/* Einfache Chart-Visualisierung */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Verlauf über {fullHistory.length} Tage</h3>
          <div style={{
            display: 'flex',
            alignItems: 'end',
            gap: '4px',
            height: '120px',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            {values.map((value, index) => {
              const height = Math.max(8, normalizeValue(value));
              const isLast = index === values.length - 1;
              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: `${height}%`,
                    background: isLast 
                      ? 'linear-gradient(180deg, #0ea5e9, #06b6d4)' 
                      : '#cbd5e1',
                    borderRadius: '2px',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  title={`Tag ${index + 1}: ${formatValue(value, kpiKey)}`}
                  onMouseEnter={(e) => {
                    if (!isLast) {
                      e.currentTarget.style.background = '#94a3b8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLast) {
                      e.currentTarget.style.background = '#cbd5e1';
                    }
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: '-24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                    color: '#6b7280',
                    fontWeight: isLast ? '600' : '400'
                  }}>
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detaillierte Tabelle */}
        <div style={{ 
          maxHeight: '300px', 
          overflowY: 'auto',
          border: '1px solid #e2e8f0',
          borderRadius: '12px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Tag</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Wert</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Trend</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Änderung</th>
              </tr>
            </thead>
            <tbody>
              {values.map((value, index) => {
                const previousValue = index > 0 ? values[index - 1] : value;
                const change = value - previousValue;
                const isLast = index === values.length - 1;
                
                return (
                  <tr 
                    key={index}
                    style={{ 
                      borderBottom: index < values.length - 1 ? '1px solid #f1f5f9' : 'none',
                      background: isLast ? '#f0f9ff' : 'white'
                    }}
                  >
                    <td style={{ 
                      padding: '12px', 
                      fontWeight: isLast ? '600' : '400',
                      color: isLast ? '#0c4a6e' : '#374151'
                    }}>
                      Tag {index + 1} {isLast && '(aktuell)'}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right',
                      fontWeight: isLast ? '600' : '400',
                      color: isLast ? '#0c4a6e' : '#374151'
                    }}>
                      {formatValue(value, kpiKey)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      {index > 0 ? getTrendIcon(value, previousValue) : '–'}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right',
                      color: getTrendColor(value, previousValue),
                      fontWeight: '500'
                    }}>
                      {index > 0 ? (
                        change === 0 ? '±0' : 
                        change > 0 ? `+${formatValue(Math.abs(change), kpiKey)}` : 
                        `-${formatValue(Math.abs(change), kpiKey)}`
                      ) : '–'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ 
          marginTop: '20px',
          padding: '12px',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #bae6fd',
          fontSize: '14px',
          color: '#0c4a6e'
        }}>
          💡 <strong>Hinweis:</strong> Die Entwicklung zeigt alle Werte vom Spielstart bis zum aktuellen Tag. 
          Änderungen werden erst beim Tageswechsel sichtbar.
        </div>
      </div>
    </div>
  );
}