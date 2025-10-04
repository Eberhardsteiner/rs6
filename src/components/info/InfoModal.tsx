// src/components/info/InfoModal.tsx
import React from 'react';
import { Building2, TrendingUp, DollarSign, AlertTriangle, Users, BookOpen, X, ChevronRight, FileText, Info } from 'lucide-react';
import type { InfoContent, InfoSection } from '@/data/infoContent';

interface InfoModalProps {
  content: InfoContent;
  onClose: () => void;
}

// Icon mapping for different content types
const getIconForContent = (title: string) => {
  if (title.includes('Kurzprofil')) return <Building2 size={20} />;
  if (title.includes('Geschäftsmodell')) return <TrendingUp size={20} />;
  if (title.includes('Finanzielle')) return <DollarSign size={20} />;
  if (title.includes('Liquiditätsfalle')) return <AlertTriangle size={20} />;
  if (title.includes('Stakeholder')) return <Users size={20} />;
   if (title.includes('Glossar')) return <BookOpen size={20} />;
  return <ChevronRight size={20} />;
};

// Color scheme for different content types
const getColorScheme = (title: string) => {
  if (title.includes('Kurzprofil')) return { primary: '#0ea5e9', light: '#e0f2fe', dark: '#0369a1' };
  if (title.includes('Geschäftsmodell')) return { primary: '#10b981', light: '#ecfdf5', dark: '#047857' };
  if (title.includes('Finanzielle')) return { primary: '#f59e0b', light: '#fef3c7', dark: '#d97706' };
  if (title.includes('Liquiditätsfalle')) return { primary: '#ef4444', light: '#fee2e2', dark: '#dc2626' };
  if (title.includes('Stakeholder')) return { primary: '#8b5cf6', light: '#f3e8ff', dark: '#7c3aed' };
  if (title.includes('Glossar')) return { primary: '#06b6d4', light: '#cffafe', dark: '#0891b2' };
   return { primary: '#6b7280', light: '#f9fafb', dark: '#374151' };
};

const renderSection = (section: InfoSection, level: number = 0): React.ReactNode => {
  const HeadingTag = `h${Math.min(6, level + 3)}` as keyof JSX.IntrinsicElements; // h3, h4, h5, h6
  const key = section.heading || `section-${level}-${Math.random()}`;

  return (
    <div key={key} style={{ 
      marginBottom: level === 0 ? '1.5em' : '1em',
      padding: level === 0 ? '16px' : '12px',
      backgroundColor: level === 0 ? '#f8fafc' : 'transparent',
      borderRadius: level === 0 ? '12px' : '0',
      border: level === 0 ? '1px solid #e2e8f0' : 'none'
    }}>
      {section.heading && (
        <HeadingTag style={{ 
          marginTop: level > 0 ? '1.2em' : '0.8em', 
          marginBottom: '0.6em',
          color: level === 0 ? '#0f172a' : '#374151',
          fontSize: level === 0 ? '1.1em' : '1em',
          fontWeight: level === 0 ? '600' : '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {level === 0 && <ChevronRight size={16} style={{ color: '#0ea5e9' }} />}
          {section.heading}
        </HeadingTag>
      )}
      
      {section.paragraphs && section.paragraphs.map((p, idx) => (
        <p key={idx} style={{ 
          marginBottom: '0.8em', 
          lineHeight: '1.5',
          color: 'black',
          fontSize: '14px'
        }}>
          {p}
        </p>
      ))}
      
      {section.listItems && (
        <ul style={{ 
          margin: '0.8em 0', 
          paddingLeft: '1.5em',
         
          fontSize: '14px'
        }}>
          {section.listItems.map((li, idx) => (
            <li key={idx} style={{ 
              marginBottom: '0.4em',
              lineHeight: '1.4',
              position: 'relative',
               color: 'black'
            }}>
              {li}
            </li>
          ))}
        </ul>
      )}
      
      {section.subSections && section.subSections.map(sub => renderSection(sub, level + 1))}
    </div>
  );
};

export default function InfoModal({ content, onClose }: InfoModalProps) {
  const colorScheme = getColorScheme(content.title);
  const icon = getIconForContent(content.title);

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
          maxWidth: '900px', 
          width: '90vw',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: `2px solid ${colorScheme.primary}`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px ${colorScheme.primary}20`
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5em',
          borderBottom: `2px solid ${colorScheme.light}`,
          paddingBottom: '1em',
          background: `linear-gradient(135deg, ${colorScheme.light} 0%, ${colorScheme.primary}10 100%)`,
          margin: '-24px -24px 1.5em -24px',
          padding: '20px 24px',
          borderRadius: '16px 16px 0 0'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px'
          }}>
            <div style={{ 
              color: colorScheme.primary,
              background: 'white',
              padding: '8px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              {icon}
            </div>
            <h2 style={{ 
              margin: 0, 
              color: colorScheme.dark,
              fontSize: '1.5em',
              fontWeight: '700'
            }}>
              {content.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: 'white',
              border: `1px solid ${colorScheme.primary}`,
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: colorScheme.primary,
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colorScheme.primary;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = colorScheme.primary;
            }}
          >
            <X size={16} />
            Schließen
          </button>
        </div>
        
        <div style={{ 
          maxHeight: '70vh', 
          overflowY: 'auto', 
          paddingRight: '10px',
          scrollbarWidth: 'thin',
          scrollbarColor: `${colorScheme.primary} ${colorScheme.light}`
        }}>
          {content.sections.map((section, idx) => renderSection(section, 0))}
        </div>
      </div>
    </div>
  );
}