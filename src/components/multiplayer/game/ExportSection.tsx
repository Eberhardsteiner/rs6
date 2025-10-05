// src/components/multiplayer/game/ExportSection.tsx
import { useState } from 'react';
import { MultiplayerService } from '@/services/multiplayerService';
import { DecisionQueueService } from '@/services/decisionQueueService';
import { ReportStore } from '@/reporting/reportBuilder';
import { exportSimulationReport } from '@/services/pdfReport';
import type { GameState } from '@/core/engine/gameEngine';
import type { RoleId } from '@/core/models/domain';
import { errorHandler } from '@/utils/errorHandler';
import pdfMake from 'pdfmake/build/pdfmake.js';

export interface ExportReportButtonMPProps {
  fileName: string;
  state: GameState;
  role: RoleId;
}

export function ExportReportButtonMP({ fileName, state, role }: ExportReportButtonMPProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      ReportStore.updateFromState(state);
      const run = ReportStore.finalizeRun();

      if (run && run.meta) {
        run.meta.multiplayerRole = role;
        run.meta.exportNote = `Mehrspielermodus - Rolle: ${role}`;

        try {
          const dq = DecisionQueueService.getInstance();
          const mp = MultiplayerService.getInstance();
          const gid = mp.getCurrentGameId();
          const commsAll: Record<string, Array<{ day: number; text: string }>> = {
            CEO: [],
            CFO: [],
            OPS: [],
            HRLEGAL: []
          };
          if (gid) {
            const list = await dq.getDecisionHistory(gid);
            for (const d of list || []) {
              if (d.block_id && d.block_id.startsWith('COMMS_') && d.custom_text) {
                const r = ((d.decision_metadata?.role as string) || d.block_id.split('_')[1]) as string;
                if (r && commsAll[r]) commsAll[r].push({ day: d.day, text: d.custom_text as string });
              }
            }
            (Object.keys(commsAll) as Array<keyof typeof commsAll>).forEach((r) =>
              commsAll[r].sort((a, b) => a.day - b.day)
            );
          }
          (run as any).meta = (run as any).meta || {};
          (run as any).meta.commsAll = commsAll;
          const own = (state.log || [])
            .slice()
            .reverse()
            .find((e) => e.blockId === `COMMS_${role}` && e.day === state.day && e.role === role);
          (run as any).meta.commsSelf = { role, day: state.day, text: own?.customText || '' };
        } catch (e) {
          errorHandler.warn('Could not attach communications to report', e, {
            category: 'UNEXPECTED',
            component: 'ExportSection',
            action: 'export-report'
          });
        }
      }

      await exportSimulationReport(pdfMake, run, fileName);
    } catch (error) {
      errorHandler.error('Export failed', error, {
        category: 'UNEXPECTED',
        component: 'ExportSection',
        action: 'export-report'
      });
      alert('Fehler beim Export: ' + (error as { message?: string })?.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      style={{
        padding: '8px 16px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: isExporting ? 'not-allowed' : 'pointer',
        fontWeight: 600,
        opacity: isExporting ? 0.7 : 1,
        transition: 'all 0.2s ease',
        fontSize: 13,
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
      }}
      onMouseEnter={(e) => {
        if (!isExporting) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
      }}
      title="Exportiert den vollständigen Spielverlauf als PDF"
    >
      {isExporting ? '⏳ Exportiere...' : '📊 Gesamtprotokoll PDF'}
    </button>
  );
}
