
// src/debrief/DebriefModule.tsx
import React from 'react';
import '@/styles/debrief.css';
import questionBankJson from '@/debrief/questionBank.json';
import scenarioIndexJson from '@/debrief/scenarioIndex.json';
import type { QuestionBank, DebriefResponses, ScenarioIndexEntry, RoleId } from '@/debrief/types';
import { exportDebriefToPdf } from '@/services/pdfDebrief';

// GameState (for reading decision log and playerName)
type DecisionLogEntry = {
  blockId: string; day: number; role: RoleId;
  chosenOptionId?: 'a'|'b'|'c'|'d'|null;
  chosenOptionLabel?: string|null;
  timestampISO?: string;
  customText?: string|null;
};
type GameState = {
  playerName?: string;
  log: DecisionLogEntry[];
  day: number;
};

const questionBank = questionBankJson as QuestionBank;
const scenarioIndex   = scenarioIndexJson as Record<string, ScenarioIndexEntry>;

function readStateFromLocalStorage(): GameState | null {
  try {
    const raw = localStorage.getItem('durststrecke:v1:state');
    return raw ? JSON.parse(raw) as GameState : null;
  } catch { return null; }
}

export default function DebriefModule({ open, onClose }:{ open: boolean; onClose: ()=>void }) {
  const [state] = React.useState<GameState | null>(() => readStateFromLocalStorage());
  const [responses, setResponses] = React.useState<DebriefResponses>(() => ({
    meta: { playerName: state?.playerName, dateISO: new Date().toISOString(), appVersion: 'debrief-v1' },
    globalScale: {},
    globalOpen: {},
    roleScale: {},
    roleOpen: {},
    decisions: []
  }));

  // Initialize decisions from log (unique by blockId)
  React.useEffect(() => {
    if (!state) return;
    const seen = new Set<string>();
    const ds = state.log.filter(e => !!e.blockId && !seen.has(e.blockId) && seen.add(e.blockId));
    const enrich = ds.map(d => ({
      blockId: d.blockId,
      day: d.day,
      role: d.role,
      title: scenarioIndex[d.blockId]?.title,
      dilemma: scenarioIndex[d.blockId]?.dilemma,
      chosenOptionId: d.chosenOptionId || null,
      chosenOptionLabel: d.chosenOptionLabel || null,
      scale: {},
      open: {}
    }));
    setResponses(r => ({ ...r, decisions: enrich }));
  }, [open]);

  if (!open) return null;

  const setGlobalScale = (id: string, val: number) =>
    setResponses(r => ({ ...r, globalScale: { ...r.globalScale, [id]: val } }));
  const setGlobalOpen = (id: string, text: string) =>
    setResponses(r => ({ ...r, globalOpen: { ...r.globalOpen, [id]: text } }));

  const setRoleScale = (role: RoleId, id: string, val: number) =>
    setResponses(r => ({ ...r, roleScale: { ...r.roleScale, [role]: { ...(r.roleScale?.[role]||{}), [id]: val } } }));
  const setRoleOpen = (role: RoleId, id: string, text: string) =>
    setResponses(r => ({ ...r, roleOpen: { ...r.roleOpen, [role]: { ...(r.roleOpen?.[role]||{}), [id]: text } } }));

  const setDecisionScale = (idx: number, id: string, val: number) =>
    setResponses(r => {
      const copy = [...r.decisions];
      copy[idx] = { ...copy[idx], scale: { ...copy[idx].scale, [id]: val } };
      return { ...r, decisions: copy };
    });
  const setDecisionOpen = (idx: number, id: string, text: string) =>
    setResponses(r => {
      const copy = [...r.decisions];
      copy[idx] = { ...copy[idx], open: { ...copy[idx].open, [id]: text } };
      return { ...r, decisions: copy };
    });

  const saveLocally = () => {
    try { localStorage.setItem('debrief:v1:responses', JSON.stringify(responses)); } catch {}
  };
  const loadLocally = () => {
    try {
      const raw = localStorage.getItem('debrief:v1:responses');
      if (raw) setResponses(JSON.parse(raw));
    } catch {}
  };

  const exportPdf = async () => {
    await exportDebriefToPdf({ responses, questionBank, scenarioIndex });
  };

  const roles: RoleId[] = ['CEO','CFO','OPS','HRLEGAL'];

  return (
    <div className="debrief-modal" role="dialog" aria-modal="true" aria-label="Debriefing">
      <div className="debrief-panel">
        <div className="debrief-header">
          <h2 style={{margin:0}}>🧭 Debriefing – Reflexion & Transfer</h2>
          <div>
            <button className="btn" onClick={saveLocally}>💾 Speichern</button>
            <button className="btn" onClick={loadLocally}>📂 Laden</button>
            <button className="btn primary" onClick={exportPdf}>⬇️ PDF</button>
            <button className="btn" onClick={onClose} aria-label="Schließen">✖︎</button>
          </div>
        </div>

        <div className="small">
          {questionBank.meta.scaleHint}
        </div>

        {/* Global Scale */}
        <div className="debrief-section">
          <h3>1) Gesamtreflexion (Skalen)</h3>
          <div className="debrief-grid">
            {questionBank.globalScale.map(q => (
              <div className="scale-row" key={q.id}>
                <div className="question-label">{q.text}</div>
                <div className="scale-inputs">
                  {[1,2,3,4,5].map(v => (
                    <label key={v}><input type="radio" name={"gs_"+q.id} value={v}
                      checked={responses.globalScale[q.id]===v}
                      onChange={()=>setGlobalScale(q.id, v as number)} /> {v}</label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Open */}
        <div className="debrief-section">
          <h3>2) Gesamtreflexion (Freitext)</h3>
          <div className="debrief-grid">
            {questionBank.globalOpen.map(q => (
              <div key={q.id}>
                <div className="question-label">{q.text}</div>
                <textarea value={responses.globalOpen[q.id]||''}
                  onChange={e=>setGlobalOpen(q.id, e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        {/* Role sections */}
        <div className="debrief-section">
          <h3>3) Rollenreflexion</h3>
          {roles.map(role => (
            <div key={role} style={{marginBottom: 12}}>
              <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                <h4 style={{margin:'8px 0'}}>Rolle {role}</h4>
                <span className="role-badge">{role}</span>
              </div>
              <div className="debrief-grid">
                {(questionBank.roleScale as any)[role].map((q:any)=>(
                  <div className="scale-row" key={q.id}>
                    <div className="question-label">{q.text}</div>
                    <div className="scale-inputs">
                      {[1,2,3,4,5].map(v=>(
                        <label key={v}><input type="radio" name={role+"_rs_"+q.id} value={v}
                          checked={(responses.roleScale?.[role]||{})[q.id]===v}
                          onChange={()=>setRoleScale(role, q.id, v as number)} /> {v}</label>
                      ))}
                    </div>
                  </div>
                ))}
                {(questionBank.roleOpen as any)[role].map((q:any)=>(
                  <div key={q.id}>
                    <div className="question-label">{q.text}</div>
                    <textarea value={(responses.roleOpen?.[role]||{})[q.id]||''}
                      onChange={e=>setRoleOpen(role, q.id, e.target.value)} />
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))}
        </div>

        {/* Decisions section */}
        <div className="debrief-section">
          <h3>4) Entscheidungs-Reviews</h3>
          <div className="small">Es werden alle getroffenen Entscheidungen aus dem Spielverlauf geladen. Entfernen Sie ggf. Einträge, die Sie nicht reflektieren möchten.</div>
          {(responses.decisions||[]).map((d, idx) => (
            <div key={d.blockId} style={{border:'1px solid #e5e7eb', borderRadius:8, padding:12, marginTop:12}}>
              <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                <div className="block-chip">{d.blockId}</div>
                <div className="question-label">{scenarioIndex[d.blockId]?.title || d.title || '—'}</div>
              </div>
              <div className="small">Tag {scenarioIndex[d.blockId]?.day || d.day || '—'} • {scenarioIndex[d.blockId]?.role || d.role || '—'} • Dilemma: {scenarioIndex[d.blockId]?.dilemma || d.dilemma || '—'}</div>
              <div className="small">Gewählt: {d.chosenOptionId ? (String(d.chosenOptionId).toUpperCase()) : '—'} {d.chosenOptionLabel ? '– '+d.chosenOptionLabel : ''}</div>
              <div className="debrief-grid" style={{marginTop:8}}>
                {questionBank.decisionReview.scale.map(q=>(
                  <div className="scale-row" key={q.id}>
                    <div className="question-label">{q.text}</div>
                    <div className="scale-inputs">
                      {[1,2,3,4,5].map(v=>(
                        <label key={v}><input type="radio" name={"dr_"+idx+"_"+q.id} value={v}
                          checked={(responses.decisions[idx].scale||{})[q.id]===v}
                          onChange={()=>setDecisionScale(idx, q.id, v as number)} /> {v}</label>
                      ))}
                    </div>
                  </div>
                ))}
                {questionBank.decisionReview.open.map(q=>(
                  <div key={q.id}>
                    <div className="question-label">{q.text}</div>
                    <textarea value={(responses.decisions[idx].open||{})[q.id]||''}
                      onChange={e=>setDecisionOpen(idx, q.id, e.target.value)} />
                  </div>
                ))}
              </div>
              <div className="btnbar">
                <button className="btn" onClick={()=>{
                  setResponses(r=>{
                    const copy = [...r.decisions]; copy.splice(idx,1); return { ...r, decisions: copy };
                  });
                }}>🗑 Entfernen</button>
              </div>
            </div>
          ))}
        </div>

        <div className="btnbar">
          <button className="btn" onClick={saveLocally}>💾 Zwischenspeichern</button>
          <button className="btn primary" onClick={exportPdf}>⬇️ Antworten als PDF</button>
          <button className="btn" onClick={onClose}>Schließen</button>
        </div>
      </div>
    </div>
  );
}
