import React from 'react';
import { adminStyles } from './adminCommonStyles';

const gateStyles = {
  card: {
    ...adminStyles.card,
    maxWidth: '400px',
    width: '100%'
  },
  title: {
    margin: '0 0 16px',
    fontSize: '24px',
    color: '#0f172a',
    textAlign: 'center' as const,
    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  text: {
    color: '#64748b',
    fontSize: '14px',
    margin: '0 0 16px',
    textAlign: 'center' as const
  },
  input: {
    ...adminStyles.input,
    padding: '12px 16px',
    fontSize: '16px',
    marginBottom: '16px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  btn: {
    ...adminStyles.btnPrimary,
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600'
  },
  note: {
    color: '#9ca3af',
    fontSize: '12px',
    textAlign: 'center' as const
  }
};

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = React.useState<boolean>(localStorage.getItem('admin_ok') === '1');
  const [pw, setPw] = React.useState('');

  if (ok) return <>{children}</>;

  return (
    <div style={gateStyles.card}>
      <h3 style={gateStyles.title}>🔐 Admin Login</h3>
      <p style={gateStyles.text}>Bitte Passwort eingeben.</p>
      <input
        style={gateStyles.input}
        type="password"
        placeholder="Passwort"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { if (pw === 'Boss' || pw === 'controll99') { localStorage.setItem('admin_ok', '1'); setOk(true); } } }}
      />
      <div style={gateStyles.actions}>
        <button
          style={gateStyles.btn}
          onClick={() => {
            if (pw === 'controll99') { localStorage.setItem('admin_ok', '1'); setOk(true); }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >🚀 Anmelden</button>
      </div>
      <div style={gateStyles.note}>Hinweis: einfacher Zugang (Client-seitig).</div>
    </div>
  );
}

export function AdminLogoutButton() {
  return (
    <button
      style={{
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        padding: '8px 12px',
        background: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s ease'
      }}
      onClick={() => { localStorage.removeItem('admin_ok'); window.location.reload(); }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#f3f4f6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'white';
      }}
    >🚪 Abmelden</button>
  );
}