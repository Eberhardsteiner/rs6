import React from 'react';
import { AdminPanelWithGate } from './AdminPanel';
import AdminPanelMPM from './AdminPanelMPM';
import { adminStyles } from './adminCommonStyles';

type Tab = 'singleplayer' | 'multiplayer';

const TAB_STORAGE_KEY = 'admin:lastActiveTab';

function loadLastActiveTab(): Tab {
  try {
    const saved = localStorage.getItem(TAB_STORAGE_KEY);
    if (saved === 'singleplayer' || saved === 'multiplayer') {
      return saved;
    }
  } catch {}
  return 'singleplayer';
}

function saveLastActiveTab(tab: Tab): void {
  try {
    localStorage.setItem(TAB_STORAGE_KEY, tab);
  } catch {}
}

export default function UnifiedAdminPanel({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = React.useState<Tab>(loadLastActiveTab);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    saveLastActiveTab(tab);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        handleTabChange('singleplayer');
      } else if (e.altKey && e.key === '2') {
        e.preventDefault();
        handleTabChange('multiplayer');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 16px',
        borderBottom: '2px solid #e5e7eb',
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#111827',
          marginRight: 'auto'
        }}>
          ⚙️ Admin Panel
        </div>

        <div style={{
          display: 'flex',
          gap: 4,
          background: 'white',
          padding: 4,
          borderRadius: 8,
          border: '1px solid #e5e7eb'
        }}>
          <button
            onClick={() => handleTabChange('singleplayer')}
            style={{
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: activeTab === 'singleplayer'
                ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                : 'transparent',
              color: activeTab === 'singleplayer' ? 'white' : '#6b7280',
              boxShadow: activeTab === 'singleplayer'
                ? '0 2px 4px rgba(59, 130, 246, 0.3)'
                : 'none'
            }}
            title="Einzelspieler-Einstellungen (Alt+1)"
          >
            Einzelspieler
          </button>
          <button
            onClick={() => handleTabChange('multiplayer')}
            style={{
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: activeTab === 'multiplayer'
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'transparent',
              color: activeTab === 'multiplayer' ? 'white' : '#6b7280',
              boxShadow: activeTab === 'multiplayer'
                ? '0 2px 4px rgba(16, 185, 129, 0.3)'
                : 'none'
            }}
            title="Multiplayer-Einstellungen (Alt+2)"
          >
            Multiplayer
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            padding: '6px 12px',
            fontSize: 13,
            fontWeight: 600,
            border: '1px solid #e5e7eb',
            borderRadius: 6,
            cursor: 'pointer',
            background: 'white',
            color: '#6b7280',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          ✕ Schließen
        </button>
      </div>

      <div style={{
        flex: 1,
        overflow: 'auto',
        position: 'relative'
      }}>
        <div style={{
          display: activeTab === 'singleplayer' ? 'block' : 'none',
          height: '100%'
        }}>
          <AdminPanelWithGate onClose={onClose} />
        </div>

        <div style={{
          display: activeTab === 'multiplayer' ? 'block' : 'none',
          height: '100%'
        }}>
          <AdminPanelMPM onClose={onClose} />
        </div>
      </div>

      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb',
        fontSize: 11,
        color: '#6b7280',
        textAlign: 'center'
      }}>
        Tastenkürzel: Alt+A (öffnen) • Alt+1 (Einzelspieler) • Alt+2 (Multiplayer)
      </div>
    </div>
  );
}
