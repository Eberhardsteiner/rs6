// src/components/hud/PerformanceIndicator.tsx
import React from 'react';
import type { KPI } from '@/core/models/domain';

type Status = 'green' | 'yellow' | 'red' | 'red-blink';
type InsolvencyMode = 'hard'|'soft'|'off';

function getMode(): InsolvencyMode {
  const m = (globalThis as any).__insolvencyMode as InsolvencyMode | undefined;
  return (m === 'hard' || m === 'soft' || m === 'off') ? m : 'hard';
}

/**
 * Schwellwerte gemäß Vorgabe (Priorität: rot-blinkend > rot > gelb > grün):
 * - rot blinkend (nur bei soft/off): cash < 0 ODER pl < -5.000.000
 * - rot: (cash < 20.000 UND pl < 0) ODER bankTrust === 0
 * - gelb: cash <= 40.000 ODER pl < -50.000 ODER bankTrust < 50
 * - grün: (Baseline) wenn nichts davon greift
 *
 * WICHTIG: Sie hatten zusätzlich "grün, wenn cash > 40.000 UND pl > 0 UND bankTrust > 50" formuliert.
 *          Um die Lücke (wie im Beispiel) zu vermeiden, setzen wir grün als Baseline,
 *          wenn keine gelb/rot/rot-blinkend-Regel erfüllt ist. So wird Ihr Beispiel grün.
 */
function computeStatus(kpi: KPI | null | undefined, mode: InsolvencyMode): Status {
  if (!kpi) return 'green';

  const cash = Number(kpi.cashEUR ?? 0);
  const pl = Number(kpi.profitLossEUR ?? 0);
  const bank = Number(kpi.bankTrust ?? 50);

  // 1) Rot blinkend (nur bei soft/off)
  const blinkEligible = (mode === 'soft' || mode === 'off');
  if (blinkEligible && (cash < 0 || pl < -5_000_000)) {
    return 'red-blink';
  }

  // 2) Rot (statisch)
  if ((cash < 20_000 && pl < 0) || bank === 0) {
    return 'red';
  }

  // 3) Gelb
  if (cash <= 40_000 || pl < -50_000 || bank < 50) {
    return 'yellow';
  }

  // 4) Baseline: grün, wenn keine höhere Stufe zutrifft
  return 'green';
}

function Circle({
  active,
  color,
  blinking,
  label
}: {
  active: boolean;
  color: string;
  blinking?: boolean;
  label: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} title={label}>
      <span
        aria-label={label}
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          border: '1px solid #d1d5db',
          background: active ? color : '#ffffff',
          boxShadow: active ? '0 0 0 2px rgba(0,0,0,0.04) inset' : 'none',
          animation: blinking ? 'blink 1s linear infinite' : 'none'
        }}
      />
      <span style={{ fontSize: 12, color: '#374151' }}>{label}</span>
    </div>
  );
}

export default function PerformanceIndicator() {
  const [kpi, setKpi] = React.useState<KPI | null>(null);
  const [day, setDay] = React.useState<number>(1);
  const [mode, setMode] = React.useState<InsolvencyMode>(getMode());

  // Live-Updates aus Reducer und AdminPanel empfangen
  React.useEffect(() => {
    const onKpi = (e: Event) => {
      const d = (e as CustomEvent<any>).detail || {};
      if (d?.kpi) setKpi(d.kpi as KPI);
      if (typeof d?.day === 'number') setDay(d.day as number);
    };
    const onSettings = (e: Event) => {
      const m = (e as CustomEvent<any>).detail?.insolvencyMode as InsolvencyMode | undefined;
      if (m) setMode(m);
    };
    const onApplied = (e: Event) => {
      const m = (e as CustomEvent<any>).detail?.insolvencyMode as InsolvencyMode | undefined;
      if (m) setMode(m);
    };

    window.addEventListener('hud:kpi', onKpi);
    window.addEventListener('admin:settings', onSettings);
    window.addEventListener('admin:settings-applied', onApplied);
    return () => {
      window.removeEventListener('hud:kpi', onKpi);
      window.removeEventListener('admin:settings', onSettings);
      window.removeEventListener('admin:settings-applied', onApplied);
    };
  }, []);

  const status = computeStatus(kpi, mode);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <style>{`@keyframes blink { 0%{opacity:1} 50%{opacity:0.25} 100%{opacity:1} }`}</style>
      <Circle active={status==='green'} color="#22c55e" label="Fortführung" />
      <Circle active={status==='yellow'} color="#fbbf24" label="Fragilität" />
      <Circle
        active={status==='red' || status==='red-blink'}
        color="#ef4444"
        blinking={status==='red-blink'}
        label={status==='red-blink'
          ? 'Insolvenzindikator - Aurion müsste Insolvenz erklären'
          : 'Kurz vor Insolvenz'}
      />
    </div>
  );
}
