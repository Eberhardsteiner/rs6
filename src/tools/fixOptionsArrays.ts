// tools/fixOptionsArrays.ts
import * as fs from 'fs';
import * as path from 'path';

function fixText(txt: string) {
  // A) attachments aus options herausziehen
  txt = txt.replace(/(options\s*:\s*\[[\s\S]*?)\n\s*attachments\s*:/g, (_m, a) => a.replace(/\s*$/, '\n') + '],\n  attachments:');
  // B) doppeltes ']' vor attachments entfernen
  txt = txt.replace(/\]\s*\]\s*(?=\s*attachments\s*:)/g, ']\n');
  // C) '},' unmittelbar vor Array-Ende -> ']' ersetzen
  txt = txt.replace(/\},\s*(\n\s*\])/g, (_m, close) => close);
  return txt;
}

const dataDir = path.resolve(process.cwd(), 'src', 'data');
for (const f of fs.readdirSync(dataDir).filter(x => x.startsWith('scenario_day_') && x.endsWith('.ts'))) {
  const p = path.join(dataDir, f);
  const txt = fs.readFileSync(p, 'utf8');
  const fixed = fixText(txt);
  if (fixed !== txt) {
    fs.writeFileSync(p, fixed, 'utf8');
    console.log('fixed:', f);
  }
}
