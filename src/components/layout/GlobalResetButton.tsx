import React from 'react';
import { RotateCcw } from 'lucide-react';
import { clearState } from '@/services/storageLocal';

export default function GlobalResetButton() {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    clearState();
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={handleReset}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)';
        }}
        title="Spiel komplett zurücksetzen und neu starten"
      >
        <RotateCcw size={16} />
        Neues Spiel
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001
        }}>
          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 12,
            maxWidth: 400,
            width: '90%',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 16px', color: '#dc2626' }}>⚠️ Spiel zurücksetzen</h3>
            <p style={{ margin: '0 0 20px', color: '#374151', lineHeight: '1.5' }}>
              Hiermit setzen Sie das Spiel zurück. Alle Fortschritte, Entscheidungen und gespeicherten Daten gehen verloren. Wollen Sie das wirklich?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button 
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setShowConfirm(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Abbrechen
              </button>
              <button 
                style={{ 
                  padding: '8px 16px',
                  background: '#dc2626', 
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }} 
                onClick={confirmReset}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#dc2626';
                }}
              >
                Ja, zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}