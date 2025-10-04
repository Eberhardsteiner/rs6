import * as React from 'react';

export type TimerConf = { dayDurationSec: number; gracePeriodSec: number };

export function useRoundTimer(conf: TimerConf) {
  const [deadline, setDeadline] = React.useState<number>(() => Date.now() + conf.dayDurationSec * 1000);
  const [now, setNow] = React.useState<number>(Date.now());

  // Tick alle 250ms
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  // ⇨ wenn sich die Dauer ändert: neue Deadline (= Neustart)
  React.useEffect(() => {
    setDeadline(Date.now() + conf.dayDurationSec * 1000);
  }, [conf.dayDurationSec]);

  const totalMs = (conf.dayDurationSec + conf.gracePeriodSec) * 1000;
  const remainingMs = Math.max(0, deadline + conf.gracePeriodSec * 1000 - now);
  const pct = Math.max(0, Math.min(1, remainingMs / totalMs));

  const restart = React.useCallback((secs = conf.dayDurationSec) => {
    setDeadline(Date.now() + secs * 1000);
  }, [conf.dayDurationSec]);

  return { remainingMs, pct, restart };
}