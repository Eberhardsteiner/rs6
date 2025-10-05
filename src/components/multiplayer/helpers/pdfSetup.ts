// src/components/multiplayer/helpers/pdfSetup.ts
import pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

type PdfMakeWithVfs = typeof pdfMake & { vfs?: Record<string, string> };
type PdfFontsModule = {
  default?: { pdfMake?: { vfs: Record<string, string> } };
  pdfMake?: { vfs: Record<string, string> };
  vfs?: Record<string, string>;
};

export function initializePdfMake(): void {
  (pdfMake as PdfMakeWithVfs).vfs =
    (pdfFonts as PdfFontsModule).default?.pdfMake?.vfs ||
    (pdfFonts as PdfFontsModule).pdfMake?.vfs;
}

export { pdfMake };
