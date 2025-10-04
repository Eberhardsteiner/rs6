import React from 'react';

export type GameTheme = 'dynamic' | 'minimal' | 'corporate';

type Props = {
  theme: GameTheme;
  lavalamp?: boolean;     // optional, standard: aus
  fpsCap?: number;        // optional, z.B. 60
};

export default function GameThemeBackground({ theme, lavalamp = false, fpsCap = 60 }: Props) {
  const bgRef = React.useRef<HTMLCanvasElement | null>(null);
  const fxRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafId = React.useRef<number | null>(null);
  const lastTs = React.useRef<number>(0);

  // interne „Netz“-Struktur
  const netRef = React.useRef<{
    nodes: Array<{ x: number; y: number }>;
    edges: Array<{ a: number; b: number; len: number }>;
    impulses: Array<{ e: number; t: number; v: number }>;
  } | null>(null);

  const DPR = () => Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  const resize = React.useCallback(() => {
    const bg = bgRef.current, fx = fxRef.current;
    if (!bg || !fx) return;
    const dpr = DPR();
    const { innerWidth: w, innerHeight: h } = window;
    [bg, fx].forEach(c => {
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    });
        // statischen Hintergrund neu zeichnen
    drawStatic(bg, theme);
    // Netz (Nodes/Edges) neu aufbauen
    if (theme === 'dynamic' || theme === 'corporate') {
      netRef.current = buildNet(w * dpr, h * dpr);
      // ⟵ NEU: statische Linien IMMER zeichnen – auch im dynamischen Theme
      drawNetLines(bg.getContext('2d')!, netRef.current!, theme);
      // FX-Canvas leeren (Trails / Impulse laufen auf fx)
      fx.getContext('2d')!.clearRect(0, 0, fx.width, fx.height);
    } else {
      netRef.current = null;
      fx.getContext('2d')!.clearRect(0, 0, fx.width, fx.height);
    }

  }, [theme]);

  React.useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    const onDPR = () => resize();
    window.matchMedia?.(`(resolution: ${DPR()}dppx)`)?.addEventListener?.('change', onDPR);
    return () => {
      window.removeEventListener('resize', resize);
      try { window.matchMedia?.(`(resolution: ${DPR()}dppx)`)?.removeEventListener?.('change', onDPR); } catch {}
    };
  }, [resize]);

  React.useEffect(() => {
    cancel();
    if (theme !== 'dynamic') return; // nur Dynamic animiert Impulse
    const fx = fxRef.current!;
    const ctx = fx.getContext('2d')!;
    lastTs.current = performance.now();

    const loop = (ts: number) => {
      rafId.current = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (ts - lastTs.current) / 1000);
      if (dt * fpsCap < 1 / fpsCap) { /* soft cap */ }
      lastTs.current = ts;
      stepAndDrawFX(ctx, netRef.current!, dt);
    };
    rafId.current = requestAnimationFrame(loop);
    return cancel;
  }, [theme]);

  const cancel = () => { if (rafId.current != null) cancelAnimationFrame(rafId.current); rafId.current = null; };

  return (
    <div aria-hidden
         style={{
           position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
           // sorgt dafür, dass Content darüber liegt:
           mixBlendMode: 'normal'
         }}>
      <canvas ref={bgRef} style={{ position: 'absolute', inset: 0 }} />
      <canvas ref={fxRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}

/* ───────── Helpers ───────── */

function drawStatic(canvas: HTMLCanvasElement, theme: GameTheme) {
  const ctx = canvas.getContext('2d')!;
  const { width: W, height: H } = canvas;
  // Hintergrund-Verläufe
  if (theme === 'corporate') {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#071122');
    g.addColorStop(1, '#0b1f3a');
    ctx.fillStyle = g;
  } else if (theme === 'minimal') {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#f7fafc');
    g.addColorStop(1, '#eef2f7');
    ctx.fillStyle = g;
  } else {
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#051019');
    g.addColorStop(1, '#071b26');
    ctx.fillStyle = g;
  }
  ctx.fillRect(0, 0, W, H);
}

function buildNet(W: number, H: number) {
  const nodes: Array<{ x: number; y: number }> = [];
  const N = Math.round((W * H) / (1280 * 720) * 60); // skaliere mit Fläche (~60 auf FullHD)
  for (let i = 0; i < N; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H });
  // einfache K-nächste Nachbarn
  const edges: Array<{ a: number; b: number; len: number }> = [];
  const K = 3;
  for (let i = 0; i < N; i++) {
    const dists = nodes.map((p, j) => ({ j, d: (p.x - nodes[i].x) ** 2 + (p.y - nodes[i].y) ** 2 }))
                       .filter(o => o.j !== i)
                       .sort((a, b) => a.d - b.d)
                       .slice(0, K);
    for (const { j, d } of dists) {
      edges.push({ a: i, b: j, len: Math.sqrt(d) });
    }
  }
  // einige Impulse auf zufälligen Kanten
  const impulses: Array<{ e: number; t: number; v: number }> = [];
  const M = Math.round(N * 0.35);
  for (let m = 0; m < M; m++) {
    impulses.push({ e: (Math.random() * edges.length) | 0, t: Math.random(), v: 0.15 + Math.random() * 0.35 });
  }
  return { nodes, edges, impulses };
}

function drawNetLines(ctx: CanvasRenderingContext2D, net: ReturnType<typeof buildNet>, theme: GameTheme) {
  const color = theme === 'corporate'
    ? 'rgba(34, 211, 238, 0.18)' // statisch, kühl
    : 'rgba(20, 230, 209, 0.22)'; // dynamisch, etwas kräftiger
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.beginPath();
  for (const e of net.edges) {
    const a = net.nodes[e.a], b = net.nodes[e.b];
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  }
  ctx.stroke();
  ctx.restore();
}

function stepAndDrawFX(ctx: CanvasRenderingContext2D, net: NonNullable<ReturnType<typeof buildNet>>, dt: number) {
  const { width: W, height: H } = ctx.canvas;

  // sanft ausblenden (nur FX-Layer), „Kondensstreifen“ bleiben kurz sichtbar
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'; // Trails decay
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // Linien im FX ggf. leicht nachziehen (damit Trails sichtbar werden)
  ctx.save();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
  ctx.beginPath();
  for (const imp of net.impulses) {
    const e = net.edges[imp.e];
    const a = net.nodes[e.a], b = net.nodes[e.b];
    // Positionen entlang der Kante
    const t0 = Math.max(0, imp.t - 0.08);
    const t1 = imp.t;
    const x0 = a.x + (b.x - a.x) * t0, y0 = a.y + (b.y - a.y) * t0;
    const x1 = a.x + (b.x - a.x) * t1, y1 = a.y + (b.y - a.y) * t1;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
  }
  ctx.stroke();
  ctx.restore();

  // Impuls-Punkte mit kleinem Glow
  for (const imp of net.impulses) {
    const e = net.edges[imp.e];
    const a = net.nodes[e.a], b = net.nodes[e.b];
    const x = a.x + (b.x - a.x) * imp.t;
    const y = a.y + (b.y - a.y) * imp.t;

    ctx.save();
    ctx.fillStyle = 'rgba(167, 255, 245, 0.95)';
    ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(x, y, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // voranschreiten
    imp.t += imp.v * dt;
    if (imp.t >= 1) {
      imp.e = (Math.random() * net.edges.length) | 0;
      imp.t = 0;
      imp.v = 0.15 + Math.random() * 0.35;
    }
  }
}
