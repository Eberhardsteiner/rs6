import React, { useState, useEffect } from 'react';

interface TrainerAuthGateProps {
  gameId: string;
  onAuthenticated: () => void;
  onCancel: () => void;
}

const TRAINER_PASSWORD = 'observer101';
const SESSION_KEY = 'mp_trainer_auth_token';
const SESSION_DURATION = 2 * 60 * 60 * 1000;

function generateToken(password: string, timestamp?: number): string {
  const ts = typeof timestamp === 'number' ? timestamp : Date.now();
  const combined = `${password}:${ts}`;
  const hash = computeHash(combined);
  return `${hash}:${ts}`;
}

function validateToken(token: string): boolean {
  try {
    const [hash, timestampStr] = token.split(':');
    const timestamp = parseInt(timestampStr, 10);
    if (!hash || isNaN(timestamp)) return false;

    const age = Date.now() - timestamp;
    if (age > SESSION_DURATION) return false;

    // WICHTIG: mit dem im Token eingebetteten Timestamp prüfen
    const expectedHash = computeHash(`${TRAINER_PASSWORD}:${timestamp}`);
    return hash === expectedHash;
  } catch {
    return false;
  }
}


export function isTrainerAuthenticated(): boolean {
  const token = sessionStorage.getItem(SESSION_KEY);
  if (!token) return false;

  const valid = validateToken(token);
  if (!valid) {
    sessionStorage.removeItem(SESSION_KEY);
    return false;
  }

  return true;
}

export function clearTrainerAuth(): void {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('mp_trainer_mode');
  localStorage.removeItem('mp_trainer_game_id');
}

export default function TrainerAuthGate({ gameId, onAuthenticated, onCancel }: TrainerAuthGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isTrainerAuthenticated()) {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 300));

    if (password !== TRAINER_PASSWORD) {
      setError('Falsches Passwort. Bitte versuchen Sie es erneut.');
      setLoading(false);
      return;
    }

    const token = generateToken(password);
    sessionStorage.setItem(SESSION_KEY, token);

    localStorage.setItem('mp_trainer_mode', 'true');
    localStorage.setItem('mp_trainer_game_id', gameId);

    setLoading(false);
    onAuthenticated();
  };

  const handleCancel = () => {
    clearTrainerAuth();
    onCancel();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #1a2332 0%, #2d3e52 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: 'white',
        borderRadius: 12,
        padding: '32px 40px',
        maxWidth: 420,
        width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: 24
        }}>
          <div style={{
            width: 64,
            height: 64,
            background: '#3b82f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 32
          }}>
            🔒
          </div>
          <h2 style={{
            margin: '0 0 8px',
            fontSize: 24,
            fontWeight: 600,
            color: '#1e293b'
          }}>
            Trainer-Authentifizierung
          </h2>
          <p style={{
            margin: 0,
            color: '#64748b',
            fontSize: 14
          }}>
            Bitte geben Sie das Trainer-Passwort ein
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 500,
              color: '#475569'
            }}>
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort eingeben"
              autoFocus
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: 8,
                fontSize: 16,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 8,
              color: '#dc2626',
              fontSize: 14,
              marginBottom: 20
            }}>
              {error}
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: 12
          }}>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 500,
                color: '#64748b',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={loading || !password}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: loading || !password ? '#94a3b8' : '#3b82f6',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 500,
                color: 'white',
                cursor: loading || !password ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!loading && password) {
                  e.currentTarget.style.background = '#2563eb';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && password) {
                  e.currentTarget.style.background = '#3b82f6';
                }
              }}
            >
              {loading ? 'Wird geprüft...' : 'Anmelden'}
            </button>
          </div>
        </form>

        <div style={{
          marginTop: 20,
          padding: 12,
          background: '#f8fafc',
          borderRadius: 8,
          fontSize: 12,
          color: '#64748b',
          textAlign: 'center'
        }}>
          Die Sitzung bleibt für 2 Stunden gültig
        </div>
      </div>
    </div>
  );
}
