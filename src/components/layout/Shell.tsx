// src/components/layout/Shell.tsx
import React from 'react';
import DifficultyBadge from '@/components/hud/DifficultyBadge';
import PerformanceIndicator from '@/components/hud/PerformanceIndicator';
import AdminFloatingButton from '@/admin/AdminFloatingButton';
import { RotateCcw, Copy } from 'lucide-react';
import { clearState } from '@/services/storageLocal';

interface ShellProps {
  children: React.ReactNode;
  /** Optionaler Back-Button, der direkt neben "Neustart" angezeigt wird */
  backButton?: React.ReactNode;
  gameCodeToDisplay?: string;
}

export default function Shell({ children, backButton, gameCodeToDisplay }: ShellProps) {

  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    clearState();
    window.location.reload();
  };


  // MP-Schwierigkeit aus globalen Multiplayer-Einstellungen auslesen (nur Anzeige; SP bleibt unberührt)
  const g: any = globalThis as any;
  const __mpRaw = g?.__mpDifficulty ?? g?.__multiplayerSettings?.mpDifficulty;
  const mpDifficulty: 'easy' | 'normal' | 'hard' | null =
    __mpRaw === 'easy' || __mpRaw === 'normal' || __mpRaw === 'hard' ? __mpRaw : null;


  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '10px 16px',
          borderBottom: '1px solid #e5e7eb',
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 12 }}>
          Simulation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span data-coach-controls-anchor></span>

          {/* Im Mehrspieler: SP-DifficultyBadge ausblenden und eigenes MP-Badge anzeigen.
              Im Einzelspieler: weiterhin das bestehende DifficultyBadge. */}
          {mpDifficulty ? (
            <span
              // Flyover mit kurzer Erläuterung analog SP, aber MP-spezifisch
              title={
                'Mehrspieler-Schwierigkeit:\n' +
                '• Zufalls-News: Höhere Schwierigkeit ⇒ mehr „critical".\n' +
                '• Zufallswerte Cash & P&L (nur negativ): Hard ×1.3, Easy ×0.7.\n' +
                '• NPC-Entscheidungen bleiben unverändert.'
              }
              style={{
                padding: '2px 10px',
                borderRadius: 9999,
                border: '1px solid #d1d5db',
                fontSize: 12,
                // Farbcodierung: easy = grün, normal = gelb, hard = rosa
                background:
                  mpDifficulty === 'easy'
                    ? '#d1fae5' // grün (hell)
                    : mpDifficulty === 'hard'
                    ? '#fce7f3' // rosa (hell)
                    : '#fef9c3', // gelb (hell)
              }}
            >
              Schwierigkeit: {mpDifficulty.charAt(0).toUpperCase() + mpDifficulty.slice(1)}
            </span>
          ) : (
            <DifficultyBadge />
          )}


          {/* NEU: Laufende Performance-Anzeige (3 Kreise) */}
          <PerformanceIndicator />
          {/* Back-Button direkt neben dem Neustart-Button */}
          {backButton}
          <button
            onClick={handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
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
            <RotateCcw size={14} />
            Neustart
          </button>
        </div>
      </header>

      <main style={{ flex: 1 }}>{children}</main>

      <AdminFloatingButton />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
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
                onClick={() => setShowResetConfirm(false)}
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
    </div>
  );
}