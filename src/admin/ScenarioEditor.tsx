// src/admin/ScenarioEditor.tsx
import React from 'react';
import { adminStyles } from '@/admin/adminCommonStyles';
import type { KPI } from '@/core/models/domain';
import type { ScenarioEvent, ScenarioJSON, ConditionSet, KpiRule, KpiKey, KpiRuleOp } from '@/services/scenarioLoader';
import { parseScenarioFromText, buildScenarioJson, compileScenario } from '@/services/scenarioLoader';

const box = adminStyles.box;
const row: React.CSSProperties = { display:'flex', gap:8, alignItems:'flex-start', margin:'6px 0', flexWrap:'wrap' };
const input: React.CSSProperties = { padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:6 };
const label: React.CSSProperties = { minWidth:140, color:'#374151' };
const btn: React.CSSProperties = { padding:'6px 10px', border:'1px solid #d1d5db', borderRadius:6, background:'#fff', cursor:'pointer' };
const btnPrimary: React.CSSProperties = { ...btn, background:'#111827', color:'#fff', borderColor:'#111827' };
const table: React.CSSProperties = { width:'100%', borderCollapse:'collapse', marginTop:8 };
const th: React.CSSProperties = { textAlign:'left', borderBottom:'1px solid #e5e7eb', padding:'6px 4px', fontWeight:600 };
const td: React.CSSProperties = { borderBottom:'1px solid #f3f4f6', padding:'6px 4px', verticalAlign:'top' };
const small: React.CSSProperties = { color:'#6b7280', fontSize:12 };
const heading: React.CSSProperties = { margin:'12px 0 8px', fontSize:16, fontWeight:700 };

type LocalEvent = ScenarioEvent;

const KPI_KEYS: (keyof KPI)[] = [
  'cashEUR','profitLossEUR','customerLoyalty','bankTrust','workforceEngagement','publicPerception'
];
const OPS: KpiRuleOp[] = ['<','<=','>','>=','==','!='];
const CATS = ['finanzen','kunden','belegschaft','oeffentlichkeit'] as const;
const SEVERITIES = ['low','mid','high'] as const;

function readNum(v: any, def = 0) { const n = Number(v); return Number.isFinite(n) ? n : def; }

export default function ScenarioEditor() {
  const [events, setEvents] = React.useState<LocalEvent[]>([]);
  const [metaTitle, setMetaTitle] = React.useState<string>('');
  const [metaNotes, setMetaNotes] = React.useState<string>('');
  const [mode, setMode] = React.useState<'replace'|'merge'>('replace');
  const [importErrors, setImportErrors] = React.useState<string[] | null>(null);

  const addEmpty = () => {
    setEvents(s => [...s, {
      day: 1, title: 'Neues Ereignis', text: '',
      category: 'oeffentlichkeit', severity: 'mid', sign: '-',
      impact: {}, conditions: {}
    }]);
  };

  const updateEv = (idx: number, part: Partial<LocalEvent>) => {
    setEvents(s => s.map((e,i)=> i===idx ? ({ ...e, ...part }) : e));
  };
  const delEv = (idx: number) => setEvents(s => s.filter((_,i)=>i!==idx));
  const dupEv = (idx: number) => setEvents(s => {
    const e = s[idx]; if (!e) return s;
    return [...s.slice(0, idx+1), { ...e, id: undefined }, ...s.slice(idx+1)];
  });

  const setKpiDelta = (idx: number, key: keyof KPI, v: number) => {
    setEvents(s => s.map((e,i)=> i===idx ? ({ ...e, impact: { ...(e.impact||{}), [key]: v } }) : e));
  };

  const addKpiRule = (idx: number) => {
    setEvents(s => s.map((e,i)=> {
      if (i !== idx) return e;
      const cond: ConditionSet = { ...(e.conditions || {}) };
      const rules: KpiRule[] = [...(cond.kpi || [])];
      rules.push({ key: 'bankTrust', op: '<', value: 50 });
      cond.kpi = rules;
      return { ...e, conditions: cond };
    }));
  };
  const updateKpiRule = (idx: number, rIdx: number, part: Partial<KpiRule>) => {
    setEvents(s => s.map((e,i)=> {
      if (i !== idx) return e;
      const cond: ConditionSet = { ...(e.conditions || {}) };
      const rules: KpiRule[] = [...(cond.kpi || [])];
      rules[rIdx] = { ...rules[rIdx], ...part } as KpiRule;
      cond.kpi = rules;
      return { ...e, conditions: cond };
    }));
  };
  const delKpiRule = (idx: number, rIdx: number) => {
    setEvents(s => s.map((e,i)=> {
      if (i !== idx) return e;
      const cond: ConditionSet = { ...(e.conditions || {}) };
      const rules: KpiRule[] = [...(cond.kpi || [])].filter((_,j)=>j!==rIdx);
      cond.kpi = rules.length ? rules : undefined;
      return { ...e, conditions: cond };
    }));
  };

  const importText = async (text: string) => {
    const res = parseScenarioFromText(text);
    if (!res.ok) { setImportErrors(res.errors); return; }
    setImportErrors(null);
    setMetaTitle(res.json.meta?.title || '');
    setMetaNotes(res.json.meta?.notes || '');
    setEvents(res.json.events);
    try { localStorage.setItem('admin:scenario:raw', text); } catch {}
  };

  const onImportFile = async (file: File) => {
    const t = await file.text();
    await importText(t);
  };

  const exportJson = () => {
    const json: ScenarioJSON = buildScenarioJson(events, { title: metaTitle, notes: metaNotes });
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = (metaTitle?.trim() || 'scenario') + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  const applyToGame = () => {
    const compiled = compileScenario(buildScenarioJson(events, { title: metaTitle, notes: metaNotes }));
    try {
      window.dispatchEvent(new CustomEvent('admin:scenario:import', { detail: { ...compiled, mode } }));
      (window as any).__admin?.message?.(`Scenario ${mode === 'replace' ? 'übernommen' : 'angehängt'} (${events.length} Events).`);
    } catch {}
  };

  // Restore last raw on mount for convenience
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('admin:scenario:raw');
      if (raw) importText(raw);
    } catch {}
  }, []);

  return (
    <div style={{ ...box, marginTop: 12 }}>
      <div style={heading}>Szenario / Event Editor (JSON)</div>
      <p style={small}>Erstellen, Importieren und Anwenden von Ereignissen ohne Code. Events wirken am jeweils konfigurierten Tag und erscheinen im News-Feed.</p>

      <div style={{ ...row, marginTop: 8 }}>
        <label style={label}>Titel</label>
        <input style={{ ...input, minWidth: 260 }} value={metaTitle} onChange={e=>setMetaTitle(e.currentTarget.value)} placeholder="Szenario-Name" />
        <label style={{ ...label, minWidth: 80 }}>Modus</label>
        <select style={input} value={mode} onChange={e=>setMode(e.currentTarget.value as any)}>
          <option value="replace">Ersetzen</option>
          <option value="merge">Anhängen</option>
        </select>
        <button style={btnPrimary} onClick={applyToGame}>In Spiel injizieren</button>
        <button style={btn} onClick={addEmpty}>Event hinzufügen</button>
        <label style={{ ...btn }}>
          Import JSON
          <input type="file" accept="application/json" style={{ display:'none' }} onChange={e=>{
            const f = e.currentTarget.files?.[0]; if (f) onImportFile(f);
          }} />
        </label>
        <button style={btn} onClick={exportJson}>Export JSON</button>
      </div>

      {importErrors && importErrors.length > 0 && (
        <div style={{ color:'#b91c1c', background:'#fee2e2', border:'1px solid #fecaca', borderRadius:8, padding:8, marginTop:8 }}>
          <div style={{ fontWeight:600, marginBottom:4 }}>Import-Fehler</div>
          <ul style={{ margin:0, paddingLeft:16 }}>
            {importErrors.map((e,i)=><li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Tag</th>
            <th style={th}>Titel &amp; Text</th>
            <th style={th}>Kategorie</th>
            <th style={th}>Severity</th>
            <th style={th}>KPI Δ</th>
            <th style={th}>Bedingungen</th>
            <th style={th}>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, idx) => (
            <tr key={idx}>
              <td style={td}>
                <input type="number" min={1} style={{ ...input, width:40 }}
                  value={e.day} onChange={ev=>updateEv(idx, { day: readNum(ev.currentTarget.value, 1) })} />
              </td>
              <td style={td}>
                <input style={{ ...input, width:270, marginBottom:6 }} placeholder="Titel"
                  value={e.title} onChange={ev=>updateEv(idx, { title: ev.currentTarget.value })} />
                <textarea style={{ ...input, width:'100%', minHeight:80 }} placeholder="Text"
                  value={e.text} onChange={ev=>updateEv(idx, { text: ev.currentTarget.value })} />
              </td>
              <td style={td}>
                <select style={input} value={e.category || 'oeffentlichkeit'} onChange={ev=>updateEv(idx, { category: ev.currentTarget.value as any })}>
                  {CATS.map(c => <option value={c} key={c}>{c}</option>)}
                </select>
              </td>
              <td style={td}>
                <select style={{ ...input, width:110 }} value={e.severity || 'mid'} onChange={ev=>updateEv(idx, { severity: ev.currentTarget.value as any })}>
                  {SEVERITIES.map(s => <option value={s} key={s}>{s}</option>)}
                </select>
              </td>
              <td style={td}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:6 }}>
                  {KPI_KEYS.map(k => (
                    <label key={k} style={{ ...small, display:'flex', gap:6, alignItems:'center' }}>
                      <span style={{ width:130 }}>{k}</span>
                      <input type="number" style={{ ...input, width:90 }}
                        value={(e.impact as any)?.[k] ?? 0}
                        onChange={ev => setKpiDelta(idx, k, readNum(ev.currentTarget.value, 0))} />
                    </label>
                  ))}
                </div>
              </td>
              <td style={td}>
                <div style={{ ...small }}>
                  <div style={{ marginBottom:6 }}>
                    <label>minDay <input type="number" style={{ ...input, width:90 }} value={e.conditions?.minDay ?? ''} onChange={ev=>updateEv(idx, { conditions: { ...(e.conditions || {}), minDay: ev.currentTarget.value ? readNum(ev.currentTarget.value) : undefined } })} /></label>
                    <label style={{ marginLeft:8 }}>maxDay <input type="number" style={{ ...input, width:90 }} value={e.conditions?.maxDay ?? ''} onChange={ev=>updateEv(idx, { conditions: { ...(e.conditions || {}), maxDay: ev.currentTarget.value ? readNum(ev.currentTarget.value) : undefined } })} /></label>
                  </div>
                  <div>
                    <div style={{ fontWeight:600, marginBottom:4 }}>KPI-Regeln</div>
                    {(e.conditions?.kpi || []).map((r, rIdx) => (
                      <div key={rIdx} style={{ display:'flex', gap:6, alignItems:'center', marginBottom:4 }}>
                        <select style={{ ...input, width:150 }} value={r.key} onChange={ev=>updateKpiRule(idx, rIdx, { key: ev.currentTarget.value as KpiKey })}>
                          {KPI_KEYS.map(k => <option value={k} key={k}>{k}</option>)}
                        </select>
                        <select style={{ ...input, width:90 }} value={r.op} onChange={ev=>updateKpiRule(idx, rIdx, { op: ev.currentTarget.value as KpiRuleOp })}>
                          {OPS.map(o => <option value={o} key={o}>{o}</option>)}
                        </select>
                        <input type="number" style={{ ...input, width:90 }} value={r.value} onChange={ev=>updateKpiRule(idx, rIdx, { value: readNum(ev.currentTarget.value) })} />
                        <button style={btn} onClick={()=>delKpiRule(idx, rIdx)}>—</button>
                      </div>
                    ))}
                    <button style={btn} onClick={()=>addKpiRule(idx)}>Regel hinzufügen</button>
                  </div>
                </div>
              </td>
              <td style={td}>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  <button style={btn} onClick={()=>dupEv(idx)}>Duplizieren</button>
                  <button style={{ ...btn, borderColor:'#ef4444', color:'#ef4444' }} onClick={()=>delEv(idx)}>Löschen</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ ...small, marginTop:8 }}>
        Hinweis: <em>sign</em> wird automatisch aus der Summe der KPI-Wirkungen abgeleitet, falls nicht gesetzt.
      </div>
    </div>
  );
}
