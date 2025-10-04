import React from 'react';
import { GameState } from '@/core/engine/gameEngine';
import { exportRoundPdf, exportFullPdf } from '@/services/pdf';

export default function ExportButtons({ state }:{ state: GameState }) {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleRoundExport = async () => {
    setIsExporting(true);
    try {
      await exportRoundPdf(state);
    } finally {
      setIsExporting(false);
    }
  };

  const handleFullExport = async () => {
    setIsExporting(true);
    try {
      await exportFullPdf(state);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="card">
      <h3>Protokoll-Export</h3>
      <div className="row">
        <button 
          className="btn"
          onClick={handleRoundExport}
          disabled={isExporting}
          title="Exportiert nur die Entscheidungen des aktuellen Tages"
        >
          {isExporting ? '⏳ Exportiere...' : `📄 Runden-PDF (Tag ${state.day})`}
        </button>
        <button 
          className="btn"
          onClick={handleFullExport}
          disabled={isExporting}
          title="Exportiert alle Entscheidungen und KPI-Verläufe"
        >
          {isExporting ? '⏳ Exportiere...' : '📊 Gesamt-PDF'}
        </button>
      </div>
      <div style={{fontSize: 12, color: 'var(--muted)', marginTop: 8}}>
        Die PDFs enthalten alle Ihre Entscheidungen und können für die Nachbesprechung verwendet werden.
      </div>
    </div>
  );
}