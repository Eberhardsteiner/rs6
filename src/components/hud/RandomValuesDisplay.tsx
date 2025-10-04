import React from 'react';

interface DailyRandomValues {
  cashInflow: number;
  cashOutflow: number;
  cashNet: number;
  plInflow: number;
  plOutflow: number;
  plNet: number;
}

interface RandomValuesDisplayProps {
  randomValues?: DailyRandomValues;
  day: number;
}

const RandomValuesDisplay: React.FC<RandomValuesDisplayProps> = ({ randomValues, day }) => {
  if (!randomValues) return null;
  
  const formatValue = (value: number) => {
    const absValue = Math.abs(value);
    const formatted = new Intl.NumberFormat('de-DE').format(absValue);
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
  };
  
  const getValueColor = (value: number) => {
    return value >= 0 ? '#10b981' : '#ef4444';
  };
  
  return (
    <div style={{ marginBottom: 16 }}>
      <h4 style={{ marginBottom: 12, fontSize: 14, color: '#64748b' }}>
        Tägliche Marktschwankungen (Tag {day})
      </h4>
      
      {/* Cash Box */}
      <div style={{
        backgroundColor: '#dbeafe',
        border: '1px solid #60a5fa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8
      }}>
        <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1e40af', marginBottom: 8 }}>
          💰 Cash-Bewegungen
        </div>
        <div style={{ fontSize: 11, lineHeight: '1.5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>Zufluss:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>
              +{new Intl.NumberFormat('de-DE').format(randomValues.cashInflow)} €
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>Abfluss:</span>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>
              -{new Intl.NumberFormat('de-DE').format(randomValues.cashOutflow)} €
            </span>
          </div>
          <div style={{ 
            borderTop: '1px solid #93c5fd', 
            paddingTop: 4, 
            marginTop: 4,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontWeight: 'bold' }}>Netto:</span>
            <span style={{ 
              color: getValueColor(randomValues.cashNet), 
              fontWeight: 'bold',
              fontSize: 12
            }}>
              {formatValue(randomValues.cashNet)} €
            </span>
          </div>
        </div>
      </div>
      
      {/* P&L Box */}
      <div style={{
        backgroundColor: '#fed7aa',
        border: '1px solid #fb923c',
        borderRadius: 8,
        padding: 12
      }}>
        <div style={{ fontSize: 12, fontWeight: 'bold', color: '#c2410c', marginBottom: 8 }}>
          📊 P&L-Bewegungen
        </div>
        <div style={{ fontSize: 11, lineHeight: '1.5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>Ertrag:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>
              +{new Intl.NumberFormat('de-DE').format(randomValues.plInflow)} €
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>Aufwand:</span>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>
              -{new Intl.NumberFormat('de-DE').format(randomValues.plOutflow)} €
            </span>
          </div>
          <div style={{ 
            borderTop: '1px solid #fdba74', 
            paddingTop: 4, 
            marginTop: 4,
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontWeight: 'bold' }}>Netto:</span>
            <span style={{ 
              color: getValueColor(randomValues.plNet), 
              fontWeight: 'bold',
              fontSize: 12
            }}>
              {formatValue(randomValues.plNet)} €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomValuesDisplay;