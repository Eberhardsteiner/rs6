import React from 'react';
import { useRoundTimer, TimerConf } from '@/hooks/useRoundTimer';

export default function DayTimer({
  conf,
  onTimeout
}: { conf: TimerConf; onTimeout: () => void }) {
  const { remainingMs, pct, restart } = useRoundTimer(conf);
  const [hasTimedOut, setHasTimedOut] = React.useState(false);

  // Timeout-Handler
  React.useEffect(() => {
    if (remainingMs === 0 && !hasTimedOut) {
      setHasTimedOut(true);
      onTimeout();
    }
  }, [remainingMs, hasTimedOut, onTimeout]);

  // Reset timeout flag when timer restarts
  React.useEffect(() => {
    if (remainingMs > 0) {
      setHasTimedOut(false);
    }
  }, [remainingMs]);

  const totalSec = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  let color = 'var(--ok)';
  if (pct <= 0.6) color = 'var(--warn)';
  if (pct <= 0.2) color = 'var(--bad)';

  const timeDisplay = remainingMs > 0 
    ? `${minutes}:${String(seconds).padStart(2, '0')}`
    : `Zeit abgelaufen · Puffer ${Math.max(0, conf.gracePeriodSec)}s`;

  return (
    <div className="card">
      <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <strong>Timer (Tag)</strong>
        <div>{timeDisplay}</div>
      </div>
      <div className="timer" title="grün → gelb → rot">
        <div style={{ width: `${pct * 100}%`, background: color }} />
      </div>
      <div className="row" style={{ marginTop: 8, gap: 8 }}>
        <button 
          className="btn" 
          onClick={() => restart()}
          style={{ fontSize: 12 }}
        >
          🔄 Timer neu starten
        </button>
      </div>
    </div>
  );
}