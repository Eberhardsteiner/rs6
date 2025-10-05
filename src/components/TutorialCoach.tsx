// src/components/TutorialCoach.tsx
import React from 'react';
import { createPortal } from 'react-dom';
import { errorHandler, safeJSONParse, safeLocalStorageGet, safeLocalStorageSet } from '@/utils/errorHandler';

type Props = {
  enabled: boolean;
  getState: () => any;
  version?: number;
  storageKey?: string;
  selectors?: Partial<Record<'kpiBar'|'adminFab'|'dayButton'|'scoringCard'|'newsCard'|'cashValue'|'bankTrustValue'|'seedBox'|'saveMenu'|'invariantsBox', string>>;
  onComplete?: () => void;
  onExit?: () => void;
};

type Step = {
  id: string;
  title: string;
  body: React.ReactNode;
  selector?: string;
  when?: (s: any) => boolean;
  awaitEvent?: string | string[];
};

type Persisted = {
  version: number;
  enabled: boolean;
  idx: number;
  seen: string[];
  dismissed?: boolean;
  completed?: boolean;
};

const defaultKey = 'coach:v1';

function lsGet<T=any>(k: string): T | null {
  const raw = safeLocalStorageGet(k, { component: 'TutorialCoach', action: 'get' });
  return raw ? safeJSONParse(raw, null, { component: 'TutorialCoach', action: 'parse' }) : null;
}
function lsSet(k: string, v: any) {
  safeLocalStorageSet(k, JSON.stringify(v), { component: 'TutorialCoach', action: 'set' });
}

function readKpi(s: any) {
  const src = s || {};
  const k = src.kpi || src;
  return {
    cashEUR: Number(k.cashEUR ?? 0),
    profitLossEUR: Number(k.profitLossEUR ?? 0),
    customerLoyalty: Number(k.customerLoyalty ?? 50),
    bankTrust: Number(k.bankTrust ?? 50),
    workforceEngagement: Number(k.workforceEngagement ?? 50),
    publicPerception: Number(k.publicPerception ?? 50),
    day: Number((src.day ?? k.day ?? 1))
  };
}

function getRect(el: Element | null): DOMRect | null {
  if (!el) return null;
  try { return el.getBoundingClientRect(); } catch { return null; }
}

function useEventListener<K extends keyof WindowEventMap>(name: K, fn: (ev: any)=>void) {
  React.useEffect(() => {
    window.addEventListener(name, fn as any);
    return () => window.removeEventListener(name, fn as any);
  }, [name, fn]);
}

export default function TutorialCoach({
  enabled,
  getState,
  version = 1,
  storageKey = defaultKey,
  selectors = {},
  onComplete,
  onExit
}: Props) {
  const persistedRef = React.useRef<Persisted>((() => {
    const cur = lsGet<Persisted>(storageKey);
    if (!cur || cur.version !== version) {
      return { version, enabled, idx: 0, seen: [], dismissed: false, completed: false } as any;
    }
    return cur;
  })());
  const [idx, setIdx] = React.useState<number>(persistedRef.current.idx || 0);
  const [visible, setVisible] = React.useState<boolean>(!!enabled && !persistedRef.current.dismissed && !persistedRef.current.completed);
  const [rect, setRect] = React.useState<DOMRect | null>(null);

  const steps: Step[] = React.useMemo(() => {
    const sels = selectors || {};
    return [
      { id:'welcome', title:'Willkommen!', body: 'Dieser kurze Coach erklärt die wichtigsten Bereiche, KPIs und Aktionen. Sie können jederzeit „Überspringen" wählen.' },
      { id:'kpis', title:'KPIs im Blick', selector: sels.kpiBar, body: 'Die vier weichen KPIs (0–100) und sowie Liquidität und Gewinn/Verlust beeinflussen die Wertung. Viele Effekte greifen beim Tageswechsel: Entweder durch Ihre Entscheidungen, Entscheidungen der vom Computer übernommenen Rollen oder Zufallsereignisse.' },
        { id:'LIQPL', title:'Tagesereignisse', selector: sels.kpiBar, body: 'Jeden Tag kommt es zu Ein- und Auszahlungen, zu Erträgen und Aufwendungen. Diese werden Ihnen im Cockpit angezeigt.' },
      { id:'Indicator', title:'Indikatoren', selector: sels.adminFab, body: 'Der Indikator oben rechts zeigt Ihnen die wirtschaftliche Lage. Grün= Stabil. Gelb: Fragil. Rot: Insolvenz. Rot blinkend: Insolvenzlage erreicht (nur in der Einstellung: Keine automatische Insolvenz).' },
            { id:'News', title:'News', selector: sels.adminFab, body: 'Einige Nachrichten zeigen weitere Details im unteren Bildschirmbereich, wenn Sie auf "Öffnen" klicken. Zufallsereignisse werden unter dem Nachrichtenbereich angezeigt und können auf die KPI EInfluss haben.' },
                  { id:'Intranet', title:'Intranetmeldung', selector: sels.adminFab, body: 'Die täglichen Intranetmeldungen geben Ihnen Informationen aus dem Unternehmen - natürlich durch die Brille der Internen Kommunikation.' },
        { id:'Entscheidungen', title:'Entscheidungen', selector: sels.adminFab, body: 'Sie können jeden Tag Entscheidungen treffen, indem Sie eine Option A-D wählen. Diese haben positive oder negative Auswirkungen auf die KPI. Sofern Sie abweichende Entscheidungen treffen würden, können Sie dies im Freitextfeld erfassen, eine KPI-Auswirkung hat dies aber nicht.' },
   //   { id:'advance-day', title:'Tageswechsel', selector: sels.dayButton, body: 'Lösen Sie einen Tageswechsel aus – der Coach springt danach automatisch weiter.', awaitEvent: ['engine:day-advanced','admin:advance-day'] },
      { id:'neg-cash', title:'Liquidität {'<'} 0', selector: sels.cashValue, body: <>Bei Cash {'<'} 0 greift die harte Invariante: Bankvertrauen = 0. Optionale Regeln können weitere Malusse auslösen.</>, when: (s)=> (readKpi(s).cashEUR < 0) },
      { id:'Attachments', title:'Anlagen', selector: sels.newsCard, body: 'Die Anlagen erläutern die Entscheidungssituation weiter.' },
      { id:'seed', title:'Seed & Reproduzierbarkeit', selector: sels.seedBox, body: 'Unter „Deterministischer Seed" können Sie einen Seed vorgeben. Gleicher Seed + gleiche Entscheidungen ⇒ identischer Verlauf für Trainingsläufe.' },
      { id:'save', title:'Speichern & Auto Save', selector: sels.saveMenu, body: 'Im Speicher‑/Laden‑Menü können Sie Slots anlegen und Zustände vergleichen. Auto Save schreibt standardmäßig nach Tageswechsel einen Speicherpunkt.' },
      { id:'invariants', title:'Invarianten', selector: sels.invariantsBox, body: 'Harte Regeln (z. B. Bankvertrauen=0 bei negativem Cash) gelten immer. Optionale Invarianten lassen sich im Admin‑Panel zu‑/abschalten.' },
      { id:'scoring', title:'Endwertung', selector: sels.scoringCard, body: 'Gewichten Sie die vier KPIs (Summe 100%). Das beeinflusst die Endwertung Ihrer Session.' },
      { id:'finish', title:'Fertig!', body: 'Sie kennen nun die wichtigsten Bereiche. Den Coach können Sie jederzeit neu starten.' },
    ];
  }, [selectors]);

  React.useEffect(() => {
    const p = persistedRef.current;
    p.enabled = enabled;
    const mustShow = !!enabled && !p.dismissed && !p.completed;
    setVisible(mustShow);
    if (mustShow) setIdx(p.idx || 0);
  }, [enabled]);

  const computeRect = React.useCallback(() => {
    const step = steps[idx];
    const el = step?.selector ? document.querySelector(step.selector) : null;
    const r = getRect(el);
    setRect(r);
  }, [idx, steps]);
  useEventListener('resize', computeRect as any);
  useEventListener('scroll', computeRect as any);
  React.useEffect(() => { computeRect(); }, [idx, computeRect]);

  const goNext = React.useCallback((source: 'button'|'event'='button') => {
    const step = steps[idx];
    try {
      if (source==='button' && step?.when && !step.when(getState())) return;
    } catch (e) {
      errorHandler.debug('Tutorial step condition check failed', e, {
        category: 'UNEXPECTED',
        component: 'TutorialCoach',
        action: 'check-step-condition',
      });
    }
    if (idx < steps.length - 1) { const n = idx + 1; setIdx(n); persist(n); setTimeout(computeRect, 0); }
    else { setVisible(false); persist('complete'); onComplete && onComplete(); }
  }, [idx, steps, getState, computeRect, onComplete]);

  const onEngineEvent = React.useCallback((ev: any) => {
    const step = steps[idx];
    const awaited = step?.awaitEvent;
    if (!awaited) return;
    const types = Array.isArray(awaited) ? awaited : [awaited];
    if (types.includes(ev?.type)) goNext('event');
  }, [idx, steps, goNext]);

  React.useEffect(() => {
    const step = steps[idx];
    const awaited = step?.awaitEvent;
    if (!awaited) return;
    const types = Array.isArray(awaited) ? awaited : [awaited];
    const h = (e: any) => onEngineEvent(e);
    types.forEach(t => window.addEventListener(t as any, h as any));
    return () => { types.forEach(t => window.removeEventListener(t as any, h as any)); };
  }, [idx, steps, onEngineEvent]);

  React.useEffect(() => {
    let timer: any;
    const tick = () => {
      if (!visible) return;
      const step = steps[idx];
      if (step?.when) { try { step.when(getState()); } catch {} }
      timer = window.setTimeout(tick, 400);
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [idx, steps, getState, visible]);

  function persist(nextIdx: number | 'complete' | 'dismiss') {
    const p = persistedRef.current;
    if (nextIdx === 'complete') { p.completed = true; p.enabled = false; }
    else if (nextIdx === 'dismiss') { p.dismissed = true; p.enabled = false; }
    else { p.idx = nextIdx; p.enabled = true; }
    p.version = version;
    lsSet(storageKey, p);
  }

  function goPrev() { if (idx > 0) { const n = idx - 1; setIdx(n); persist(n); setTimeout(computeRect, 0); } }
  function skipStep() { if (idx < steps.length - 1) { const n = idx + 1; setIdx(n); persist(n); setTimeout(computeRect, 0); } else { setVisible(false); persist('complete'); onComplete && onComplete(); } }
  function dismissAll() { setVisible(false); persist('dismiss'); onExit && onExit(); }

  if (!visible) return null;

  const step = steps[idx];
  const r = rect;
  const highlight = !!r;

  return createPortal(
    <div aria-live="polite" role="dialog" aria-modal="true" style={overlayStyle}>
      <div style={backdropStyle} onClick={dismissAll} />
      {highlight && <div style={spotStyle(r!)} aria-hidden="true" />}
      <div style={cardStyle(r)}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{step.title}</div>
        <div style={{ fontSize: 14, lineHeight: 1.35, marginBottom: 12 }}>{step.body}</div>
        {step.when && (() => {
          let ok = false;
          try { ok = step.when(getState()); } catch {}
          return !ok ? (
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
              Hinweis: Dieser Schritt wird aktiv, sobald die Bedingung im Spiel eintritt.
              Sie können den Schritt auch überspringen.
            </div>
          ) : null;
        })()}
        <div style={{ display:'flex', gap:8, justifyContent:'space-between' }}>
          <div><button onClick={dismissAll} style={btnGhost}>Überspringen</button></div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={goPrev} disabled={idx===0} style={btn}>{'←'} Zurück</button>
            <button onClick={()=>goNext('button')} style={btnPrimary}>{idx < steps.length-1 ? 'Weiter →' : 'Fertig'}</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

const overlayStyle: React.CSSProperties = { position:'fixed', inset:0, zIndex: 10000, pointerEvents:'auto' };
const backdropStyle: React.CSSProperties = { position:'absolute', inset:0, background:'rgba(0,0,0,0.45)' };
function spotStyle(r: DOMRect): React.CSSProperties {
  const pad = 8;
  return { position:'absolute', left:Math.max(8, r.left - pad), top:Math.max(8, r.top + window.scrollY - pad),
    width:r.width + pad*2, height:r.height + pad*2, borderRadius:10, boxShadow:'0 0 0 9999px rgba(0,0,0,0.45), 0 0 0 2px #fff', pointerEvents:'none' };
}
function cardStyle(r: DOMRect | null): React.CSSProperties {
  const base: React.CSSProperties = { position:'absolute', maxWidth:420, background:'#fff', color:'#111827', borderRadius:12, border:'1px solid #e5e7eb', boxShadow:'0 20px 50px rgba(0,0,0,0.3)', padding:14 };
  if (!r) return { ...base, left:'50%', top:'15%', transform:'translateX(-50%)' };
  const top = Math.max(12, r.top + window.scrollY + r.height + 10);
  const left = Math.min(Math.max(12, r.left), window.innerWidth - 440);
  return { ...base, top, left };
}
const btn: React.CSSProperties = { padding:'8px 12px', borderRadius:8, border:'1px solid #111827', background:'#fff', cursor:'pointer' };
const btnPrimary: React.CSSProperties = { ...btn, background:'#111827', color:'#fff' };
const btnGhost: React.CSSProperties = { ...btn, borderColor:'#d1d5db', color:'#374151' };
