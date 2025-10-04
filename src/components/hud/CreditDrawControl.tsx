// src/components/hud/CreditDrawControl.tsx
import React from 'react';

/**
 * User-Steuerung: Manuelle Inanspruchnahme der Kreditlinie.
 * - Sichtbar nur, wenn Bankmechanik aktiv UND Kreditlinie > 0.
 * - Bei Überziehung wird der Betrag automatisch gekürzt und ein Hinweis angezeigt.
 */
export default function CreditDrawControl() {
  const [creditLine, setCreditLine] = React.useState<number>(0);
  const [usedCredit, setUsedCredit] = React.useState<number>(0);
  const [ratePct, setRatePct] = React.useState<number>(0);
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [pending, setPending] = React.useState<string>('');
  const [warning, setWarning] = React.useState<string>('');

  // Bootstrap aus Globals/LS
  React.useEffect(() => {
    const g: any = globalThis as any;
    const bankOn = !!g.__featureBankMechanics;
    const credit = Number((g.__bankSettings?.creditLineEUR ?? g.__bankCreditLineEUR) || 0);
    const used = Number(g.__usedCreditEUR || 0);
    const rate = Number((g.__bankSettings?.interestRatePct ?? g.__bankInterestRatePct) || 0);
    const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem('bank:pendingDraw') : null;
    const p = raw != null ? String(raw) : '';

    setEnabled(bankOn && credit > 0);
    setCreditLine(credit);
    setUsedCredit(Number.isFinite(used) ? used : 0);
    setRatePct(Number.isFinite(rate) ? rate : 0);
    setPending(p);
  }, []);

  React.useEffect(() => {
    const onUpd = () => {
      const g: any = globalThis as any;
      const credit = Number((g.__bankSettings?.creditLineEUR ?? g.__bankCreditLineEUR) || 0);
      const used = Number(g.__usedCreditEUR || 0);
      const rate = Number((g.__bankSettings?.interestRatePct ?? g.__bankInterestRatePct) || 0);
      const bankOn = !!g.__featureBankMechanics;
      setEnabled(bankOn && credit > 0);
      setCreditLine(credit);
      setUsedCredit(Number.isFinite(used) ? used : 0);
      setRatePct(Number.isFinite(rate) ? rate : 0);
    };
    window.addEventListener('admin:settings', onUpd as any);
    window.addEventListener('engine:day-advanced', onUpd as any);
    window.addEventListener('admin:kpi:set', onUpd as any);
    window.addEventListener('admin:kpi:add', onUpd as any);
    window.addEventListener('hud:kpi', onUpd as any);
    return () => {
      window.removeEventListener('admin:settings', onUpd as any);
      window.removeEventListener('engine:day-advanced', onUpd as any);
      window.removeEventListener('admin:kpi:set', onUpd as any);
      window.removeEventListener('admin:kpi:add', onUpd as any);
      window.removeEventListener('hud:kpi', onUpd as any);
    };
  }, []);

  // Warnung ausblenden nach 5 Sekunden
  React.useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => setWarning(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  if (!enabled) return null;

  const available = Math.max(0, creditLine - usedCredit);
  const pendingNum = pending.trim() === '' ? 0 : Math.max(0, Math.floor(Number(pending) || 0));
  const wasRequested = pendingNum;
  const clamped = Math.min(pendingNum, available);

  const onApply = () => {
    if (clamped <= 0) {
      if (wasRequested > 0) {
        setWarning('Kreditlinie erschöpft! Keine Entnahme möglich.');
      }
      return;
    }
    
    // Prüfen ob gekürzt wurde
    if (wasRequested > available && wasRequested > 0) {
      setWarning(`Kreditlinie überzogen! Betrag wurde auf ${fmtEUR(clamped)} gekürzt.`);
    } else {
      setWarning('');
    }
    
    // Event für sofortige Kreditnutzung feuern
    try { 
      window.dispatchEvent(new CustomEvent('bank:draw-now', { 
        detail: { amount: clamped } 
      })); 
    } catch {}
    
    // Pending zurücksetzen
    setPending('');
    try { 
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('bank:pendingDraw');
      }
    } catch {}
    (globalThis as any).__bankPendingDrawEUR = 0;
  };

  const onClear = () => { 
    setPending(''); 
    setWarning('');
    try { 
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('bank:pendingDraw');
      }
    } catch {}
    (globalThis as any).__bankPendingDrawEUR = 0;
  };

  const interestToday = (() => {
    const daily = Math.max(0, ratePct) / 100 / 365;
    const used = Math.max(0, usedCredit);
    return Math.round(used * daily);
  })();

  // Input-Validierung bei Eingabe
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setPending(value);
    
    // Live-Validierung
    const num = Math.max(0, Math.floor(Number(value) || 0));
    if (num > available && num > 0) {
      setWarning(`Achtung: Nur ${fmtEUR(available)} verfügbar!`);
    } else {
      setWarning('');
    }
  };

  return (
    <div style={box}>
      <div style={heading}>Kreditlinie – Inanspruchnahme</div>
      
      {/* Status-Anzeige */}
      <div style={{ ...row, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Kreditrahmen</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>Gesamt: <strong>{fmtEUR(creditLine)}</strong></span>
            <span>Genutzt: <strong style={{ color: '#dc2626' }}>{fmtEUR(usedCredit)}</strong></span>
            <span>Verfügbar: <strong style={{ color: available > 0 ? '#10b981' : '#ef4444' }}>{fmtEUR(available)}</strong></span>
          </div>
        </div>
      </div>

      <div style={row}>
        <label style={label}>Betrag (€)</label>
        <input
          type="number"
          value={pending}
          min={0}
          max={available}
          onChange={handleInputChange}
          style={{ 
            width: 180,
            borderColor: (pendingNum > available && pendingNum > 0) ? '#ef4444' : '#d1d5db'
          }}
          placeholder={`Max: ${available}`}
        />
        <button 
          style={{ 
            ...btn,
            opacity: clamped <= 0 ? 0.5 : 1,
            cursor: clamped <= 0 ? 'not-allowed' : 'pointer'
          }} 
          onClick={onApply}
          disabled={clamped <= 0}
        >
          Übernehmen
        </button>
        <button style={btn} onClick={onClear}>Zurücksetzen</button>
      </div>

      {/* Warnung/Hinweis */}
      {warning && (
        <div style={{
          padding: '8px 12px',
          marginTop: 8,
          borderRadius: 6,
          backgroundColor: '#fef2f2',
          borderLeft: '4px solid #ef4444',
          color: '#991b1b',
          fontSize: 13,
          fontWeight: 500
        }}>
          ⚠️ {warning}
        </div>
      )}

      <div style={{ ...sub, marginTop: 6 }}>
        Die Kreditinanspruchnahme erhöht sofort die Liquidität. Rückführung erfolg automatisch am Folgetag, bis Liquidität verbraucht.
        {usedCredit > 0 && ` Tägliche Zinsen: ${fmtEUR(interestToday)}`}
      </div>
    </div>
  );
}

// Styles
const box: React.CSSProperties = { 
  border: '1px solid #e5e7eb', 
  borderRadius: 12, 
  padding: 16, 
  marginTop: 8,
  backgroundColor: '#fafafa'
};
const row: React.CSSProperties = { 
  display: 'flex', 
  gap: 12, 
  alignItems: 'center', 
  margin: '8px 0' 
};
const label: React.CSSProperties = { 
  minWidth: 100, 
  fontWeight: 600 
};
const heading: React.CSSProperties = { 
  fontSize: 16, 
  fontWeight: 700, 
  marginBottom: 12 
};
const btn: React.CSSProperties = { 
  padding: '6px 12px', 
  borderRadius: 8, 
  border: '1px solid #111827', 
  cursor: 'pointer', 
  background: '#fff',
  transition: 'all 0.2s'
};
const sub: React.CSSProperties = { 
  fontSize: 12, 
  color: '#6b7280' 
};

function fmtEUR(n: number) {
  try {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR', 
      maximumFractionDigits: 0 
    }).format(n);
  } catch {
    return `${Math.round(n)} €`;
  }
}