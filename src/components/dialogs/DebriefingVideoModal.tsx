import React from 'react';
import { X } from 'lucide-react';

interface DebriefingVideoModalProps {
  videoUrl: string;
  endingTitle: string;
  onClose: () => void;
}

export default function DebriefingVideoModal({ videoUrl, endingTitle, onClose }: DebriefingVideoModalProps) {
  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        className="modal" 
        onClick={e => e.stopPropagation()}
        style={{ 
          maxWidth: '900px', 
          width: '90vw',
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            margin: 0, 
            color: '#1e293b',
            fontSize: '20px',
            fontWeight: '700'
          }}>
            🎬 Debriefing-Video: {endingTitle}
          </h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#64748b',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f1f5f9';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <X size={16} />
            Schließen
          </button>
        </div>
        
        <div style={{ 
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid #e2e8f0'
        }}>
          <video 
            controls 
            style={{ 
              width: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
            }}
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Ihr Browser unterstützt das Video-Element nicht.
          </video>
        </div>
        
        <div style={{ 
          marginTop: '16px',
          padding: '12px',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #bae6fd',
          fontSize: '14px',
          color: '#0c4a6e'
        }}>
          💡 <strong>Debriefing:</strong> Dieses Video bewertet Ihr Spielergebnis.
        </div>
      </div>
    </div>
  );
}