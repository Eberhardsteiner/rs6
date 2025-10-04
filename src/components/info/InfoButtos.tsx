// src/components/info/InfoButtons.tsx
import React from 'react';
import { Building2, TrendingUp, DollarSign, AlertTriangle, Users, BookOpen, Info, FileText } from 'lucide-react';
import InfoModal from './InfoModal';
import { infoContents, InfoContent } from '@/data/infoContent';

export default function InfoButtons() {
  const [modalContent, setModalContent] = React.useState<InfoContent | null>(null);

  const openModal = (key: string) => {
    setModalContent(infoContents[key] || null);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const getButtonStyle = (color: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    fontSize: '13px',
    fontWeight: '600',
    textAlign: 'left',
    justifyContent: 'flex-start',
    minHeight: '48px',
    flex: '1',
    background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
    border: `1px solid ${color}30`,
    borderRadius: '12px',
    color: color,
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  });

  const buttonConfigs = [
    { key: 'apsProfile', icon: Building2, label: 'APS – Kurzprofil', color: '#0ea5e9' },
    { key: 'businessModel', icon: TrendingUp, label: 'Geschäftsmodell', color: '#10b981' },
    { key: 'financials', icon: DollarSign, label: 'Finanzielle Lage', color: '#f59e0b' },
    { key: 'trigger', icon: AlertTriangle, label: 'Liquiditätsfalle', color: '#ef4444' },
    { key: 'stakeholders', icon: Users, label: 'Stakeholder', color: '#8b5cf6' }, // Purple
    { key: 'glossary', icon: BookOpen, label: 'Glossar', color: '#06b6d4' }
  ];

  return (
    <>
      <div className="card" style={{ 
        marginTop: 12,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '16px' 
        }}>
          <Info size={18} style={{ color: '#0ea5e9' }} />
          <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>
            Hintergrundinformationen
          </h3>
        </div>
        
        <div style={{ display: 'grid', gap: '8px' }}>
          {buttonConfigs.map((config, index) => {
            const Icon = config.icon;
            return (
              <button
                key={config.key}
                onClick={() => openModal(config.key)}
                style={getButtonStyle(config.color)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${config.color}20 0%, ${config.color}10 100%)`;
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = `0 4px 16px ${config.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${config.color}10 0%, ${config.color}05 100%)`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                }}
              >
                <Icon size={16} />
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {modalContent && (
        <InfoModal content={modalContent} onClose={closeModal} />
      )}
    </>
  );
}