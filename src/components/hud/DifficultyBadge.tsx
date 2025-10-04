// src/components/hud/DifficultyBadge.tsx
import React from 'react';

type Difficulty = 'easy'|'normal'|'hard';

function label(d: Difficulty): string {
  return d === 'easy' ? 'Easy' : d === 'hard' ? 'Hard' : 'Normal';
}

function loadInitial(): Difficulty {
  const g = (globalThis as any).__npcDifficulty as Difficulty | undefined;
  if (g) return g;
  try {
    const raw = localStorage.getItem('adminSettings');
    if (raw) {
      const s = JSON.parse(raw);
      if (s?.difficulty === 'easy' || s?.difficulty === 'normal' || s?.difficulty === 'hard') {
        return s.difficulty;
      }
    }
  } catch {}
  return 'normal';
}

export default function DifficultyBadge() {
  const [diff, setDiff] = React.useState<Difficulty>(loadInitial);

  React.useEffect(() => {
    const onAdmin = (e: Event) => {
      const d = (e as CustomEvent<any>).detail?.difficulty as Difficulty | undefined;
      if (d) setDiff(d);
    };
    const onApplied = (e: Event) => {
      const d = (e as CustomEvent<any>).detail?.difficulty as Difficulty | undefined;
      if (d) setDiff(d);
    };
    window.addEventListener('admin:settings', onAdmin);
    window.addEventListener('admin:settings-applied', onApplied);
    return () => {
      window.removeEventListener('admin:settings', onAdmin);
      window.removeEventListener('admin:settings-applied', onApplied);
    };
  }, []);

  return (
    <div
      title="Schwierigkeit wirkt auf NPC‑Entscheidungen (Fehlerquote). Bei Inaktivität: 45 % Fehler / 35 % Worst‑Pick."
      style={{
        padding: '4px 10px',
        borderRadius: 999,
        border: '1px solid #d1d5db',
        fontSize: 12,
        lineHeight: '16px',
        background: '#e1f9fa'
      }}
      aria-label={`Schwierigkeit: ${label(diff)}`}
    >
      Schwierigkeit: <strong>{label(diff)}</strong>
    </div>
  );
}
