// tools/checkOptionsArrays.ts
import * as fs from 'fs';
import * as path from 'path';

function checkFile(txt: string, file: string) {
  const issues: string[] = [];
  const re = /options\s*:\s*\[/g;

  for (;;) {
    const m = re.exec(txt);
    if (!m) break;

    let i = m.index + m[0].length, depth = 1, j = i;
    let inStr: string | null = null, esc = false;
    while (j < txt.length && depth > 0) {
      const ch = txt[j++];
      if (inStr) {
        if (esc) esc = false;
        else if (ch === '\\') esc = true;
        else if (ch === inStr) inStr = null;
      } else {
        if (ch === "'" || ch === '"' || ch === '`') inStr = ch;
        else if (ch === '[') depth++;
        else if (ch === ']') depth--;
      }
    }
    if (depth !== 0) { issues.push(`⚠️ Unbalanciertes options-Array (Pos ${m.index})`); continue; }

    const head = txt.slice(Math.max(0, j - 120), j);
    const tail = txt.slice(j, j + 120);
    const inside = txt.slice(i, j - 1);

    if (/^\s*\]/.test(tail)) issues.push(`❌ Doppeltes ']' nach options (Pos ${j})`);
    if (/\},\s*$/.test(head)) issues.push(`❌ '},' direkt vor Array-Ende – erwartet ']' (Pos ${j})`);
    if (/\battachments\s*:/.test(inside)) issues.push(`❌ 'attachments' innerhalb von options (Pos ${i})`);
  }

  if (issues.length) {
    console.log(`\n### ${file}`);
    for (const s of issues) console.log(' - ' + s);
    return false;
  }
  return true;
}

const dataDir = path.resolve(process.cwd(), 'src', 'data');
let ok = true;
for (const f of fs.readdirSync(dataDir).filter(x => x.startsWith('scenario_day_') && x.endsWith('.ts'))) {
  const p = path.join(dataDir, f);
  const txt = fs.readFileSync(p, 'utf8');
  ok = checkFile(txt, f) && ok;
}
if (!ok) process.exitCode = 1;
