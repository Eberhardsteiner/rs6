import React from 'react';
import { X, FileText } from 'lucide-react';

interface AttachmentModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export default function AttachmentModal({ title, content, onClose }: AttachmentModalProps) {
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
    marginTop: '60px', // NEU: Fügt einen oberen Rand hinzu
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px'
          }}>
            <div style={{ 
              color: '#0ea5e9',
              background: 'white',
              padding: '8px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <FileText size={20} />
            </div>
            <h2 style={{ 
              margin: 0, 
              color: '#0369a1',
              fontSize: '1.5em',
              fontWeight: '700'
            }}>
              {title}
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
        
        <div style={{ 
          maxHeight: '70vh', 
          overflowY: 'auto', 
          paddingRight: '10px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#0ea5e9 #e0f2fe'
        }}>
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #e2e8f0',
            lineHeight: '1.6',
            fontSize: '14px',
            color: '#374151'
          }}>
            {content.split('\n').map((line, index) => (
              <p key={index} style={{ margin: '0 0 12px 0' }}>
                {line.trim() || '\u00A0'}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}