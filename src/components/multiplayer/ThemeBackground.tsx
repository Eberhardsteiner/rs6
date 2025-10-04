import React, { useEffect, useRef } from "react";

export type ThemeMode = 'classic' | 'business' | 'dynamic';

/**
 * ThemeBackground
 * - classic: no special background
 * - business: subtle SVG grid
 * - dynamic: animated canvas (circuit-like)
 */
function ThemeBackgroundInternal({ mode }: { mode?: ThemeMode }) {
  const variant = (mode ?? "classic").toLowerCase() as ThemeMode;
  if (variant === 'business') return <BusinessBg />;
  if (variant === 'dynamic') return <DynamicBg />;
  return null;
}

function BusinessBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.55,
      }}
    >
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mpGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" opacity="0.08" />
          </pattern>
          <linearGradient id="mpGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#mpGrid)" />
        <rect width="100%" height="100%" fill="url(#mpGradient)" />
      </svg>
    </div>
  );
}

function DynamicBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const NODE_COUNT = Math.max(36, Math.floor((width * height) / 18000));
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    const getAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--mp-accent").trim() || "#6aa0ff";

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const alpha = 1 - dist / 120;
            ctx.globalAlpha = 0.08 + alpha * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = getAccent();
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // nodes
      ctx.globalAlpha = 0.7;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = getAccent();
        ctx.fill();
      }

      // move
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.65 }}
    />
  );
}

export default ThemeBackgroundInternal;
export { ThemeBackgroundInternal as ThemeBackground };
