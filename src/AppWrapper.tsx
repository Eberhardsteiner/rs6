// src/AppWrapper.tsx
import React, { useState } from 'react';
import GameModeSelector from './components/GameModeSelector';
import App from './App';
import MultiplayerApp from './components/multiplayer/MultiplayerApp';
import MultiAuthLogin from './components/multiplayer/MultiAuthLogin';
import AdminPanel from './admin/AdminPanel';
import AdminPanelMPM from './admin/AdminPanelMPM'; // <<— NEU
import Onboarding from './components/setup/Onboarding';
import OnboardingMSM from './components/setup/OnboardingMSM';
import '@/styles/onboarding.css';
import type { RoleId } from '@/core/models/domain';
import { MultiplayerService } from '@/services/multiplayerService';
import { imprintText } from './data/imprint';
import { privacyPolicyText } from './data/privacyPolicy';
import { disclaimerText } from './data/disclaimer';

type AppMode = 'selection' | 'singleplayer-onboarding' | 'multiplayer-onboarding' | 'admin';

export default function AppWrapper() {
  const [mode, setMode] = useState<AppMode>('selection');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPanelKind, setAdminPanelKind] = useState<'sp'|'mp'>('sp'); // <<— NEU
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showModal, setShowModal] = useState<'privacy' | 'imprint' | 'disclaimer' | null>(null);


  const handleModeSelect = (selectedMode: 'singleplayer' | 'multiplayer' | 'admin') => {
    if (selectedMode === 'singleplayer') {
      setMode('singleplayer-onboarding');
    } else if (selectedMode === 'multiplayer') {
      setMode('multiplayer-onboarding');
    } else if (selectedMode === 'admin') {
      setShowPasswordDialog(true);
      setPasswordError(false);
      setAdminPassword('');
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'controll99' || adminPassword === 'uvm2024') {
      setShowPasswordDialog(false);
      setPasswordError(false);
      setAdminPassword('');
      setShowAdminPanel(true);
    } else {
      setPasswordError(true);
    }
  };

  const handleBackToSelection = () => {
    setMode('selection');
    setShowAdminPanel(false);
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
  };

  // Handler for single player onboarding completion
  const handleSinglePlayerStart = () => {
    setMode('singleplayer');
  };

  // Handler for multiplayer onboarding completion (goes to login)
  const handleMultiplayerOnboardingComplete = () => {
    setMode('multiplayer-login');
  };

  // Handler for multiplayer login completion
  const handleLoginSuccess = (gameId: string, role: RoleId) => {
    // Persist the fresh multiplayer session so MultiplayerApp hydrates into the LOBBY (not PLAYING)
    try {
      // Store current session
      localStorage.setItem('mp_current_game', gameId);
      localStorage.setItem('mp_current_role', role);
      localStorage.setItem('mp_game_phase', 'lobby');

      // Set globals (optional, kept for parity with MultiplayerApp)
      (globalThis as any).__multiplayerMode = true;
      (globalThis as any).__currentRole = role;
      (globalThis as any).__gameId = gameId;
      (globalThis as any).__visibleKpis = MultiplayerService.getRoleKpiVisibility(role);

      // Update URL (?game=...) so a refresh keeps you in the right session
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('game', gameId);
        window.history.replaceState({}, '', url.toString());
      } catch {}
    } finally {
      // Switch to actual multiplayer app
      setMode('multiplayer');
    }
    };

  // Modal Component
  const InfoModal = () => {
    if (!showModal) return null;

    let title = '';
    let content = '';

    if (showModal === 'privacy') {
      title = 'Datenschutzerklärung';
      content = privacyPolicyText;
    } else if (showModal === 'imprint') {
      title = 'Impressum';
      content = imprintText;
    } else if (showModal === 'disclaimer') {
      title = 'Wichtiger Hinweis';
      content = disclaimerText;
    }

    return (
      <div className="ob-modal-backdrop">
        <div className="ob-modal">
          <h2 style={{ color: '#ffffff' }}>{title}</h2>
          <div style={{
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
            maxHeight: '60vh',
            overflowY: 'auto',
            padding: '0 10px',
            lineHeight: '1.6',
            color: '#ffffff'
          }}>
            {content}
          </div>
          <button
            className="ob-modal-close"
            onClick={() => setShowModal(null)}
          >
            Schließen
          </button>
        </div>
      </div>
    );
  };

  // Single Player Onboarding
  if (mode === 'singleplayer-onboarding') {
    return (
      <>
        <button
          onClick={handleBackToSelection}
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 9999,
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #1f2937, #111827)',
            color: '#e5e7eb',
            border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #374151, #1f2937)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #1f2937, #111827)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Zurück
        </button>
        <Onboarding 
          onStart={handleSinglePlayerStart}
          onShowModal={setShowModal}
        />
        <InfoModal />
      </>
    );
  }

  // Multiplayer Onboarding
  if (mode === 'multiplayer-onboarding') {
    return (
      <>
        <button
          onClick={handleBackToSelection}
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 9999,
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #1f2937, #111827)',
            color: '#e5e7eb',
            border: '1px solid rgba(20,184,166,0.3)',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #374151, #1f2937)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #1f2937, #111827)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Zurück
        </button>
        <OnboardingMSM 
          onStart={handleMultiplayerOnboardingComplete}
          onShowModal={setShowModal}
        />
        <InfoModal />
      </>
    );
  }

  // Multiplayer Login
  if (mode === 'multiplayer-login') {
    return (
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setMode('multiplayer-onboarding')}
          style={{
            position: 'fixed',
            top: 70,
            left: 20,
            zIndex: 9999,
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #1f2937, #111827)',
            color: '#e5e7eb',
            border: '1px solid rgba(20,184,166,0.3)',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #374151, #1f2937)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #1f2937, #111827)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Zurück
        </button>
        <MultiAuthLogin onSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Single Player Game - OHNE schwebenden Button, mit onBackToHome prop
  if (mode === 'singleplayer') {
    return <App onBackToHome={handleBackToSelection} />;
  }

  // Multiplayer Game - OHNE schwebenden Button, mit onBackToHome prop
  if (mode === 'multiplayer') {
    return <MultiplayerApp onBackToHome={handleBackToSelection} />;
  }

  // Admin Panel and Password Dialog (unchanged)
  if (mode === 'selection') {
    return (
      <>
        <GameModeSelector onSelectMode={handleModeSelect} />
        
        {/* Admin Password Dialog */}
        {showPasswordDialog && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11, 18, 32, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              background: 'linear-gradient(145deg, rgba(15,31,55,0.98), rgba(11,18,32,0.98))',
              border: '2px solid rgba(168,85,247,0.5)',
              borderRadius: 20,
              padding: 40,
              width: 'min(420px, 90vw)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}>
              <h2 style={{
                color: '#e6eefc',
                margin: '0 0 24px',
                fontSize: 24,
                textAlign: 'center'
              }}>
                Admin-Zugang
              </h2>
              
              <p style={{
                color: '#94a3b8',
                marginBottom: 24,
                textAlign: 'center'
              }}>
                Bitte geben Sie das Admin-Kennwort ein
              </p>
              
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdminLogin();
                }}
                placeholder="Kennwort"
                autoFocus
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(11,18,32,0.8)',
                  border: `2px solid ${passwordError ? '#ef4444' : 'rgba(168,85,247,0.3)'}`,
                  borderRadius: 10,
                  color: '#e6eefc',
                  fontSize: 16,
                  marginBottom: 8,
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
              />
              
              {passwordError && (
                <p style={{
                  color: '#ef4444',
                  fontSize: 14,
                  marginBottom: 16,
                  textAlign: 'center'
                }}>
                  Falsches Kennwort. Bitte erneut versuchen.
                </p>
              )}
              
              <div style={{
                display: 'flex',
                gap: 12,
                marginTop: 24
              }}>
                <button
                  onClick={() => {
                    setShowPasswordDialog(false);
                    setPasswordError(false);
                    setAdminPassword('');
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'transparent',
                    border: '2px solid rgba(168,85,247,0.3)',
                    borderRadius: 10,
                    color: '#a5b4cf',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)';
                  }}
                >
                  Abbrechen
                </button>
                
                <button
                  onClick={handleAdminLogin}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
                    border: 'none',
                    borderRadius: 10,
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(168,85,247,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(168,85,247,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(168,85,247,0.3)';
                  }}
                >
                  Anmelden
                </button>
              </div>
              
              <p style={{
                color: '#64748b',
                fontSize: 12,
                marginTop: 20,
                textAlign: 'center',
                borderTop: '1px solid rgba(168,85,247,0.1)',
                paddingTop: 16
              }}>
                Hinweis: Adminzugang nur für Trainerinnen und Trainer
              </p>
            </div>
          </div>
        )}

                {/* Admin Panel Modal */}
        {showAdminPanel && (
          <div className="admin-backdrop">
            <div className="admin-modal admin-card">
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                <button
                  onClick={() => setAdminPanelKind('sp')}
                  aria-pressed={adminPanelKind==='sp'}
                  style={{ padding:'6px 10px', borderRadius:6, border:'1px solid #e5e7eb', background: adminPanelKind==='sp' ? '#eef2ff' : '#fff' }}
                >
                  Einzelspieler‑Admin
                </button>
                <button
                  onClick={() => setAdminPanelKind('mp')}
                  aria-pressed={adminPanelKind==='mp'}
                  style={{ padding:'6px 10px', borderRadius:6, border:'1px solid #e5e7eb', background: adminPanelKind==='mp' ? '#eef2ff' : '#fff' }}
                >
                  Mehrspieler‑Admin (MPM)
                </button>
              </div>

              {adminPanelKind === 'mp'
                ? <AdminPanelMPM onClose={handleCloseAdminPanel} />
                : <AdminPanel onClose={handleCloseAdminPanel} />}
            </div>
          </div>
        )}

      </>
    );
  }

  // Fallback
  return <GameModeSelector onSelectMode={handleModeSelect} />;
}