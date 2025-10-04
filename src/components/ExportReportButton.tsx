// src/components/ExportReportButton.tsx

import React from 'react';
import type { ReportRun } from '../reporting/reportTypes';
import { ReportStore } from '../reporting/reportBuilder';
import { exportSimulationReport } from '../services/pdfReport';

// Hinweise zur Einbindung von pdfmake:
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface Props {
  pdfMake: any; // übergeben Sie hier pdfMake (siehe Hinweis)
  fileName?: string;
  disabled?: boolean;
}

const ExportReportButton: React.FC<Props> = ({ pdfMake, fileName = 'Gesamtprotokoll.pdf', disabled }) => {
  const onClick = React.useCallback(async () => {
    const run = ReportStore.current;
    if (!run) return;
    // Finale Kennzahlen/Score berechnen
    ReportStore.finalize();
    await exportSimulationReport(pdfMake, run, fileName);
  }, [pdfMake, fileName]);

  return (
    <button onClick={onClick} disabled={disabled} title="Meta-Daten-Protokoll exportieren">
     Export PDF
   </button>
  );
};

export default ExportReportButton;
