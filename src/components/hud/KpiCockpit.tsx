import React from 'react';
import type { KPI, RoleId } from '@/core/models/domain';
import BankMetricsInline from '@/components/hud/BankMetricsInline';
import CreditDrawControl from '@/components/hud/CreditDrawControl';
import Sparkline from '@/components/Sparkline';

interface Props {
  kpi: KPI;
  kpiHistory?: KPI[];
  onOpenHistory?: (key: keyof KPI) => void;
  /**
   * Mehrspielermodus: Liste der für die aktuelle Rolle sichtbaren KPIs.
   * Wenn nicht gesetzt => Einzelspielermodus (alle sichtbar).
   */
  visibleKpis?: (keyof KPI)[];
  /** Nur für diese Anforderung ergänzt: */
  role?: RoleId;
  
}

interface KpiBoxProps {
  label: string;
  value: number | null;
  unit: string;
  help: string;
  valueColor: string;
  sparklineValues?: number[];
  sparklineColor?: string;
  onOpen?: () => void;         // intern: nur öffnen, wenn erlaubt
  isVisible: boolean;          // true = sichtbar (kein "???"), false = maskiert ("???")
}

function KpiBox({
  label,
  value,
  unit,
  help,
  valueColor,
  sparklineValues,
  sparklineColor,
  onOpen,
  isVisible
}: KpiBoxProps) {

  // "???" NUR für Rollen-Maskierung. Fehlender Wert wird als "—" dargestellt.
  const isMasked = !isVisible;
  const hasValue = value !== null;

  const displayValue = isMasked
    ? '???'
    : (hasValue ? value.toLocaleString('de-DE') : '—');

  const clickable = !isMasked && typeof onOpen === 'function';
  const showChart = !isMasked && hasValue && !!sparklineValues && sparklineValues.length > 0;

  const trend =
    showChart && sparklineValues!.length >= 2
      ? (() => {
          const lastValue = sparklineValues![sparklineValues!.length - 1];
          const prevValue = sparklineValues![sparklineValues!.length - 2];
          if (lastValue > prevValue) return { symbol: '↑', color: '#10b981' };
          if (lastValue < prevValue) return { symbol: '↓', color: '#ef4444' };
          return { symbol: '→', color: '#6b7280' };
        })()
      : null;

  const actualValueColor = isMasked || !hasValue ? '#6b7280' : valueColor;

  // HARTE BLOCKADE: Alle relevanten Events bereits in der Capturing-Phase schlucken, wenn maskiert.
  const swallowIfMasked = (e: React.SyntheticEvent) => {
    if (isMasked) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isMasked) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onOpen?.();
  };

  return (
    <div
      className="kpiBox"
      title={isMasked ? 'Dieser KPI ist für diese Rolle nicht sichtbar.' : help}
      // Capturing-Guards gegen jegliche Container-/Global-Listener:
      onClickCapture={swallowIfMasked}
      onMouseDownCapture={swallowIfMasked}
      onMouseUpCapture={swallowIfMasked}
      onPointerDownCapture={swallowIfMasked}
      onPointerUpCapture={swallowIfMasked}
      onKeyDownCapture={swallowIfMasked}
      // Klickhandler (wird nur ausgeführt, wenn nicht maskiert):
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      aria-disabled={isMasked ? true : undefined}
      data-masked={isMasked ? 'true' : 'false'}
      style={{
        position: 'relative',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '8px',
        flex: 1,
        cursor: clickable ? 'pointer' : 'not-allowed',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        minHeight: '80px',
        userSelect: 'none'
      }}
    >
      {/* Zusätzliche Overlay-Sicherung: fängt Events ab, falls doch etwas "durch" will */}
      {isMasked && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'transparent',
            pointerEvents: 'auto'
          }}
          onClickCapture={swallowIfMasked}
          onMouseDownCapture={swallowIfMasked}
          onMouseUpCapture={swallowIfMasked}
          onPointerDownCapture={swallowIfMasked}
          onPointerUpCapture={swallowIfMasked}
        />
      )}

      <div style={{ fontSize: '0.85rem', color: '#555' }}>{label}</div>
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: actualValueColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
        {displayValue} {unit}
        {trend && (
          <span style={{ fontSize: '0.9rem', color: trend.color, fontWeight: 'normal' }}>
            {trend.symbol}
          </span>
        )}
      </div>

      {/* Sparkline */}
      {showChart ? (
        <div style={{ marginTop: 'auto', paddingTop: '2px' }}>
          <Sparkline
            values={sparklineValues!}
            color={sparklineColor || '#888'}
            width={100}
            height={16}
          />
        </div>
      ) : (
        <div style={{ marginTop: 'auto', paddingTop: '2px', height: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '2px' }} />
      )}
    </div>
  );
}

// Hilfetexte für die KPI
const kpiHelp: Record<keyof KPI, string> = {
  cashEUR: "Liquidität: Aktueller Bargeldbestand des Unternehmens (EUR).",
  profitLossEUR: "Gewinn/Verlust: Jahresergebnis (EUR).",
  customerLoyalty: "Kundentreue: Bindung und Zufriedenheit der Kunden (0–100 Punkte).",
  bankTrust: "Bankvertrauen: Einschätzung der Kreditgeber (0–100 Punkte).",
  workforceEngagement: "Belegschaft: Motivation und Einsatzbereitschaft der Mitarbeiter (0–100 Punkte).",
  publicPerception: "Öffentliche Wahrnehmung: Image und Reputation am Markt (0–100 Punkte)."
};

export default function KpiCockpit({ kpi, kpiHistory = [], onOpenHistory, visibleKpis, role }: Props) {


  const getKpiValueColor = (key: keyof KPI, value: number | null): string => {
    if (value === null) return '#6b7280'; // neutral, wenn kein Wert vorliegt
    if (key === 'cashEUR') {
      if (value <= 10000) return '#ef4444';
      if (value <= 49000) return '#f59e0b';
      return '#10b981';
    } else if (key === 'profitLossEUR') {
      return value < 0 ? '#ef4444' : '#10b981';
    } else {
      if (value < 20) return '#ef4444';
      if (value <= 50) return '#f59e0b';
      return '#10b981';
    }
  };

  // Sichtbarkeits-Helper (Einzelspieler: alles sichtbar)
  const isVisible = (key: keyof KPI): boolean =>
    visibleKpis ? visibleKpis.includes(key) : true;

  // ZENTRALER GUARD: Öffnen nur, wenn KPI sichtbar ist (also kein "???")
  const handleOpenHistory = (key: keyof KPI) => {
    if (!isVisible(key)) return; // -> Modal NICHT öffnen
    onOpenHistory?.(key);
  };

  // Historie inkl. aktuellem Wert
  const getHistoricalValues = (key: keyof KPI): number[] => {
    const historyValues = (kpiHistory || [])
      .map(h => h[key])
      .filter((v): v is number => v !== null && v !== undefined);
    const currentValue = kpi[key];
    if (currentValue !== null && currentValue !== undefined) {
      historyValues.push(currentValue as number);
    }
    return historyValues;
  };

  // Sparkline-Farbe
  const getSparklineColor = (key: keyof KPI, values: number[]): string => {
    switch (key) {
      case 'cashEUR':
        return values.every(v => v >= 0) ? '#10b981' : '#ef4444';
      case 'profitLossEUR':
        return values.every(v => v >= 0) ? '#3b82f6' : '#ef4444';
      case 'bankTrust':
        return '#f59e0b';
      case 'publicPerception':
        return '#8b5cf6';
      case 'customerLoyalty':
        return '#06b6d4';
      case 'workforceEngagement':
        return '#eab308';
      default:
        return '#888';
    }
  };

  // *** NEU: Sichtbarkeit der Kredit-Eingabe ***
  // Admin schaltet das Feature via AdminPanel → global __featureBankMechanics. :contentReference[oaicite:2]{index=2}
  const canShowCreditDraw = React.useMemo(() => {
    const g: any = globalThis as any;
    const bankOn = !!g.__featureBankMechanics; // nur wenn Admin aktiv
    if (!bankOn) return false;
    // Im Multiplayer NUR CFO; im Einzelspieler wie bisher sichtbar
    if (!!g.__multiplayerMode) return false;
    return true;
    }, []);


  return (
    <div
      className="kpiGrid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '8px',
      }}
    >
      <KpiBox
        label="Liquidität"
        value={kpi.cashEUR}
        unit="€"
        help={kpiHelp.cashEUR}
        valueColor={getKpiValueColor('cashEUR', kpi.cashEUR)}
        sparklineValues={getHistoricalValues('cashEUR')}
        sparklineColor={getSparklineColor('cashEUR', getHistoricalValues('cashEUR'))}
        onOpen={() => handleOpenHistory('cashEUR')}
        isVisible={isVisible('cashEUR')}
      />
      <KpiBox
        label="Gewinn/Verlust"
        value={kpi.profitLossEUR}
        unit="€"
        help={kpiHelp.profitLossEUR}
        valueColor={getKpiValueColor('profitLossEUR', kpi.profitLossEUR)}
        sparklineValues={getHistoricalValues('profitLossEUR')}
        sparklineColor={getSparklineColor('profitLossEUR', getHistoricalValues('profitLossEUR'))}
        onOpen={() => handleOpenHistory('profitLossEUR')}
        isVisible={isVisible('profitLossEUR')}
      />
      <KpiBox
        label="Kundentreue"
        value={kpi.customerLoyalty}
        unit="Pkt"
        help={kpiHelp.customerLoyalty}
        valueColor={getKpiValueColor('customerLoyalty', kpi.customerLoyalty)}
        sparklineValues={getHistoricalValues('customerLoyalty')}
        sparklineColor={getSparklineColor('customerLoyalty', getHistoricalValues('customerLoyalty'))}
        onOpen={() => handleOpenHistory('customerLoyalty')}
        isVisible={isVisible('customerLoyalty')}
      />
      <KpiBox
        label="Bankvertrauen"
        value={kpi.bankTrust}
        unit="Pkt"
        help={kpiHelp.bankTrust}
        valueColor={getKpiValueColor('bankTrust', kpi.bankTrust)}
        sparklineValues={getHistoricalValues('bankTrust')}
        sparklineColor={getSparklineColor('bankTrust', getHistoricalValues('bankTrust'))}
        onOpen={() => handleOpenHistory('bankTrust')}
        isVisible={isVisible('bankTrust')}
      />
      <KpiBox
        label="Belegschaft"
        value={kpi.workforceEngagement}
        unit="Pkt"
        help={kpiHelp.workforceEngagement}
        valueColor={getKpiValueColor('workforceEngagement', kpi.workforceEngagement)}
        sparklineValues={getHistoricalValues('workforceEngagement')}
        sparklineColor={getSparklineColor('workforceEngagement', getHistoricalValues('workforceEngagement'))}
        onOpen={() => handleOpenHistory('workforceEngagement')}
        isVisible={isVisible('workforceEngagement')}
      />
      <KpiBox
        label="Öffentliche Wahrnehmung"
        value={kpi.publicPerception}
        unit="Pkt"
        help={kpiHelp.publicPerception}
        valueColor={getKpiValueColor('publicPerception', kpi.publicPerception)}
        sparklineValues={getHistoricalValues('publicPerception')}
        sparklineColor={getSparklineColor('publicPerception', getHistoricalValues('publicPerception'))}
        onOpen={() => handleOpenHistory('publicPerception')}
        isVisible={isVisible('publicPerception')}
      />

      {/* Bank-Metriken: Infos für alle; Eingabe (Kredit ziehen) nur wenn erlaubt */}
      {kpi.cashEUR !== null && (
        <div style={{ gridColumn: '1 / -1' }}>
          <BankMetricsInline />
          {canShowCreditDraw && (
            <div style={{ gridColumn: '1 / -1' }}>
              <CreditDrawControl />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
