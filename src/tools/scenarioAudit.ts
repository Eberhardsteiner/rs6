// tools/scenarioAudit.ts
import * as fs from 'fs';
import * as path from 'path';

function findArrays(text: string) {
  const out: Array<{ name:string, start:number, end:number }> = [];
  const re = /const\s+([A-Z_]+_BLOCKS)\s*:\s*DecisionBlock\[\]\s*=\s*\[/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    let i = m.index + m[0].length, depth = 1;
    while (i < text.length && depth > 0) {
      const ch = text[i++];
      if (ch === '[') depth++;
      else if (ch === ']') depth--;
    }
    out.push({ name: m[1], start: m.index, end: i });
  }
  return out;
}

function analyzeOptions(body: string) {
  const opts = body.match(/\{[\s\S]*?\}/g) || [];
  let hasNeg = false, hasTrade = false, riskyMissing = 0;
  for (const o of opts) {
    const nums = o.match(/:\s*([+\-]?\d+)/g)?.map(x=>parseInt(x.replace(/^.*:\s*/,''),10)) || [];
    const pos = nums.some(v => v>0);
    const neg = nums.some(v => v<0);
    hasNeg = hasNeg || neg;
    hasTrade = hasTrade || (pos && neg);
    const mag = nums.reduce((a,b)=>a+Math.abs(b),0);
    if (mag >= 8 && !/variance\s*:\s*[0-9]/.test(o)) riskyMissing++;
    if (mag >= 8 && !/execLeakage\s*:\s*[0-9]/.test(o)) riskyMissing++;
  }
  return { hasNeg, hasTrade, riskyMissing };
}

const dataDir = path.resolve(process.cwd(), 'src', 'data');
for (const f of fs.readdirSync(dataDir).filter(x => x.startsWith('scenario_day_') && x.endsWith('.ts'))) {
  const p = path.join(dataDir, f);
  const txt = fs.readFileSync(p, 'utf8');
  const arrays = findArrays(txt);
  console.log(`\n## ${f}`);
  for (const a of arrays) {
    const body = txt.slice(a.start, a.end);
    const metrics = analyzeOptions(body);
    console.log(`- ${a.name}: neg=${metrics.hasNeg} trade=${metrics.hasTrade} riskyMissing=${metrics.riskyMissing}`);
  }
}
