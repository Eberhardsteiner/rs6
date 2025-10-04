// New component file: src/components/multiplayer/CFOCreditPanel.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';
import type { KPI } from '@/core/models/domain';

interface CFOCreditPanelProps {
  gameId: string;
  currentDay: number;
  currentKpi: KPI;
  onCreditTaken: (amount: number) => void;
}

export default function CFOCreditPanel({ 
  gameId, 
  currentDay, 
  currentKpi,
  onCreditTaken 
}: CFOCreditPanelProps) {
  const [creditSettings, setCreditSettings] = useState<any>(null);
  const [creditUsed, setCreditUsed] = useState(0);
  const [pendingCredit, setPendingCredit] = useState(0);
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const [creditAmount, setCreditAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Load credit settings from global multiplayer settings
  useEffect(() => {
    const loadSettings = () => {
      const mpSettings = (globalThis as any).__multiplayerSettings;
      if (mpSettings?.creditSettings?.enabled) {
        setCreditSettings(mpSettings.creditSettings);
      }
    };

    loadSettings();
    
    // Listen for admin updates
    const handleAdminUpdate = () => loadSettings();
    window.addEventListener('admin:settings', handleAdminUpdate);
    
    return () => {
      window.removeEventListener('admin:settings', handleAdminUpdate);
    };
  }, []);

  // Load credit history from database
  useEffect(() => {
    const loadCreditHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('game_credit_history')
          .select('amount')
          .eq('game_id', gameId)
          .eq('role', 'CFO');
        
        if (!error && data) {
          const totalUsed = data.reduce((sum, record) => sum + record.amount, 0);
          setCreditUsed(totalUsed);
        }
      } catch (err) {
        console.error('Error loading credit history:', err);
      }
    };

    if (creditSettings?.enabled) {
      loadCreditHistory();
    }
  }, [gameId, creditSettings, currentDay]);

  // Don't show if not enabled
  if (!creditSettings?.enabled) {
    return null;
  }

  const availableCredit = creditSettings.creditLineEUR - creditUsed;
  const dailyInterest = creditUsed * (creditSettings.interestRatePct / 100 / 365);

  const handleTakeCredit = async () => {
    const amount = parseFloat(creditAmount);
    
    if (!amount || amount <= 0) {
      alert('Bitte geben Sie einen gültigen Betrag ein');
      return;
    }

    if (amount > availableCredit) {
      alert(`Maximaler verfügbarer Kredit: €${availableCredit.toLocaleString('de-DE')}`);
      return;
    }

    setLoading(true);

    try {
      // Save credit decision to database
      await supabase.from('game_credit_history').insert({
        game_id: gameId,
        day: currentDay,
        role: 'CFO',
        amount: amount,
        interest_rate: creditSettings.interestRatePct,
        created_at: new Date().toISOString()
      });

      // Update local state
      setCreditUsed(creditUsed + amount);
      setPendingCredit(amount);
      
      // Notify parent component
      onCreditTaken(amount);
      
      // Close dialog
      setShowCreditDialog(false);
      setCreditAmount('');
      
      // Show success message
    //  setTimeout(() => {
       // alert(`Kredit über €${amount.toLocaleString('de-DE')} wurde aufgenommen!`);
     //   setPendingCredit(0);
 //     }, 100);
      
    } catch (error) {
      console.error('Error taking credit:', error);
      alert('Fehler bei der Kreditaufnahme');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      marginTop: 16,
      padding: 16,
      background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
      borderRadius: 12,
      border: '2px solid #f59e0b'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 12
      }}>
        <h3 style={{ margin: 0, color: '#92400e', display: 'flex', alignItems: 'center', gap: 8 }}>
          💰 CFO Kreditlinie
        </h3>
        <span style={{
          padding: '4px 8px',
          background: '#f59e0b',
          color: 'white',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 700
        }}>
          NUR CFO
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
        <div style={{ 
          padding: 12, 
          background: 'white', 
          borderRadius: 8,
          border: '1px solid #fed7aa'
        }}>
          <div style={{ fontSize: 11, color: '#78350f', marginBottom: 4 }}>
            Verfügbare Kreditlinie
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#92400e' }}>
            €{availableCredit.toLocaleString('de-DE')}
          </div>
        </div>

        <div style={{ 
          padding: 12, 
          background: 'white', 
          borderRadius: 8,
          border: '1px solid #fed7aa'
        }}>
          <div style={{ fontSize: 11, color: '#78350f', marginBottom: 4 }}>
            Bereits genutzt
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: creditUsed > 0 ? '#dc2626' : '#92400e' }}>
            €{creditUsed.toLocaleString('de-DE')}
          </div>
        </div>
      </div>

      {creditUsed > 0 && (
        <div style={{ 
          marginBottom: 12, 
          padding: 8, 
          background: '#fee2e2', 
          borderRadius: 6,
          border: '1px solid #fecaca'
        }}>
          <div style={{ fontSize: 12, color: '#991b1b' }}>
            ⚠️ Tägliche Zinsen: <strong>€{Math.round(dailyInterest).toLocaleString('de-DE')}</strong>
            <span style={{ marginLeft: 8, fontSize: 11, color: '#7f1d1d' }}>
              ({creditSettings.interestRatePct}% p.a.)
            </span>
          </div>
        </div>
      )}

      {pendingCredit > 0 && (
        <div style={{ 
          marginBottom: 12, 
          padding: 8, 
          background: '#dcfce7', 
          borderRadius: 6,
          border: '1px solid #bbf7d0'
        }}>
          <div style={{ fontSize: 12, color: '#166534' }}>
            ✅ Heute aufgenommen: <strong>€{pendingCredit.toLocaleString('de-DE')}</strong>
          </div>
        </div>
      )}

      {availableCredit > 0 ? (
        <button
          onClick={() => setShowCreditDialog(true)}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          🏦 Kredit aufnehmen
        </button>
      ) : (
        <div style={{
          padding: 12,
          background: '#fee2e2',
          borderRadius: 8,
          textAlign: 'center',
          color: '#991b1b',
          fontSize: 13
        }}>
          ❌ Kreditlinie vollständig ausgeschöpft
        </div>
      )}

      {/* Credit Dialog */}
      {showCreditDialog && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 12,
            maxWidth: 400,
            width: '90%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: 16 }}>Kredit aufnehmen</h3>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#374151' }}>
                Betrag in EUR (max. €{availableCredit.toLocaleString('de-DE')})
              </label>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="z.B. 100000"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  fontSize: 14
                }}
                disabled={loading}
                autoFocus
              />
            </div>

            <div style={{
              marginBottom: 16,
              padding: 12,
              background: '#fef3c7',
              borderRadius: 8,
              fontSize: 12,
              color: '#78350f'
            }}>
              <strong>Hinweis:</strong> Der Kredit wird sofort der Liquidität hinzugefügt. 
              Ab morgen fallen täglich Zinsen ({creditSettings.interestRatePct}% p.a.) an.
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={handleTakeCredit}
                disabled={loading || !creditAmount}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: loading || !creditAmount ? '#d1d5db' : '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: loading || !creditAmount ? 'not-allowed' : 'pointer',
                  fontWeight: 600
                }}
              >
                {loading ? 'Wird verarbeitet...' : 'Kredit aufnehmen'}
              </button>
              
              <button
                onClick={() => {
                  setShowCreditDialog(false);
                  setCreditAmount('');
                }}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  background: 'white',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}