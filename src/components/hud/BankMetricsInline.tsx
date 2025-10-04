// src/components/hud/BankMetricsInline.tsx
import React from 'react';

/**
 * Zeigt (optional) Bank-Metriken im KPI-Kasten an:
 *  - Kreditlinie (€)
 *  - Verfügbar (€) = Kreditlinie - usedCreditEUR (geclamped >= 0)
 *  - Zins p.a. (%)
 *
 * Liest standardmäßig aus globalThis.__bankSettings und __featureBankMechanics.
 * Reagiert auf admin:settings, engine:day-advanced, admin:kpi:set, admin:kpi:add.
 */
export default function BankMetricsInline(props: {
  creditLineEUR?: number;
  usedCreditEUR?: number;
  interestRatePct?: number;
}) {
  const [metrics, setMetrics] = React.useState(() => readMetrics(props));

  React.useEffect(() => {
    setMetrics(readMetrics(props));
    const onUpdate = () => setMetrics(readMetrics(props));

    // Alle relevanten Events abonnieren
    const events = [
      'admin:settings',
      'engine:day-advanced', 
      'admin:kpi:set',
      'admin:kpi:add',
      'hud:kpi',
      'bank:draw-now',
      'bank:pending-draw'
    ];

    events.forEach(event => {
      window.addEventListener(event, onUpdate as EventListener);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, onUpdate as EventListener);
      });
    };
  }, [props.creditLineEUR, props.usedCreditEUR, props.interestRatePct]);

  const enabled = !!(globalThis as any).__featureBankMechanics;
  const { creditLineEUR, usedCreditEUR, interestRatePct } = metrics;
  const available = Math.max(0, creditLineEUR - usedCreditEUR);

  // Nur anzeigen wenn Bank-Mechanik aktiviert und Kreditlinie > 0
  if (!enabled || creditLineEUR <= 0) return null;

  const box: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap'
  };
  const chip: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: 6,
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '4px 8px',
    whiteSpace: 'nowrap'
  };
  const label: React.CSSProperties = { fontSize: 12, color: '#6b7280' };
  const value: React.CSSProperties = { fontWeight: 700 };
  
  // Farbcodierung für verfügbaren Kredit
  const availableColor = available === 0 ? '#ef4444' : 
                        available < creditLineEUR * 0.2 ? '#f59e0b' : 
                        '#10b981';

  return (
    <div style={box} data-testid="bank-metrics-inline">
      <div style={chip} title="Maximale Kreditlinie">
        <span style={label}>Kreditlinie</span>
        <span style={value}>{fmtEUR(creditLineEUR)}</span>
      </div>
      <div style={chip} title="Verfügbar = Kreditlinie − genutzter Kredit">
        <span style={label}>Verfügbar</span>
        <span style={{ ...value, color: availableColor }}>{fmtEUR(available)}</span>
      </div>
      {usedCreditEUR > 0 && (
        <div style={chip} title="Bereits genutzter Kredit">
          <span style={label}>Genutzt</span>
          <span style={{ ...value, color: '#dc2626' }}>{fmtEUR(usedCreditEUR)}</span>
        </div>
      )}
      <div style={chip} title="Zinssatz p.a.">
        <span style={label}>Zins p.a.</span>
        <span style={value}>{fmtPct(interestRatePct)}</span>
      </div>
    </div>
  );
}

function readMetrics(props: {
  creditLineEUR?: number;
  usedCreditEUR?: number;
  interestRatePct?: number;
}) {
  const g: any = globalThis as any;

  // 1) Props priorisieren
  let creditLine = safeNum(props.creditLineEUR);
  let usedCredit = safeNum(props.usedCreditEUR);
  let ratePct = safeNum(props.interestRatePct);

  // 2) Globals
  if (!Number.isFinite(creditLine)) {
    creditLine = safeNum(g.__bankSettings?.creditLineEUR, safeNum(g.__bankCreditLineEUR, 0));
  }
  if (!Number.isFinite(ratePct)) {
    ratePct = safeNum(g.__bankSettings?.interestRatePct, safeNum(g.__bankInterestRatePct, 0));
  }
  if (!Number.isFinite(usedCredit)) {
    usedCredit = safeNum(g.__usedCreditEUR, 0);
  }

  return {
    creditLineEUR: clamp0(creditLine),
    usedCreditEUR: clamp0(usedCredit),
    interestRatePct: clamp0(ratePct),
  };
}

function clamp0(n: number) { return Number.isFinite(n) ? Math.max(0, n) : 0; }
function safeNum(n: any, fallback = NaN) {
  const v = typeof n === 'string' ? Number(n) : n;
  return Number.isFinite(v) ? (v as number) : fallback;
}

function fmtEUR(n: number) {
  try {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  } catch {
    return `${Math.round(n)} €`;
  }
}
function fmtPct(n: number) {
  try {
    return `${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(n)}%`;
  } catch {
    return `${Math.round(n * 10) / 10}%`;
  }
}