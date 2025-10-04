import React from 'react';
import { AdminPanelWithGate } from './AdminPanel';
import { adminStyles } from './adminCommonStyles';

export default function AdminFloatingButton() {
  const [open, setOpen] = React.useState(false);

  // Tastenkürzel Alt+A zum Öffnen
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setOpen(v => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        style={{
          ...adminStyles.fab,
          transform: open ? 'translateY(-2px) scale(1.1)' : 'translateY(0) scale(1)'
        }}
        aria-label="Admin öffnen"
        title="Admin Panel (Alt+A)"
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = open ? 'translateY(-2px) scale(1.1)' : 'translateY(0) scale(1)';
        }}
      >
        ⚙️
      </button>

      {open && (
        <div style={adminStyles.backdrop} onClick={() => setOpen(false)}>
          <div style={adminStyles.modal} onClick={e => e.stopPropagation()}>
            <AdminPanelWithGate onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}