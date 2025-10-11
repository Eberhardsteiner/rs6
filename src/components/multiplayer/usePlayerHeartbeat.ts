import { useEffect, useRef } from 'react';
import { supabase } from '@/services/supabaseClient';

const HEARTBEAT_INTERVAL = 45000;
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];

export function usePlayerHeartbeat(gameId: string | null, playerId: string | null, enabled: boolean = true) {
  const lastActivityRef = useRef<number>(Date.now());
  const lastHeartbeatRef = useRef<number>(0);
  const activityListenersRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    if (!enabled || !gameId || !playerId) {
      return;
    }

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    ACTIVITY_EVENTS.forEach(event => {
      const listener = () => updateActivity();
      window.addEventListener(event, listener, { passive: true });
      activityListenersRef.current.push(() => window.removeEventListener(event, listener));
    });

    const sendHeartbeat = async () => {
      const now = Date.now();

      if (now - lastHeartbeatRef.current < HEARTBEAT_INTERVAL) {
        return;
      }

      const timeSinceActivity = now - lastActivityRef.current;
      const isActive = timeSinceActivity < 60000;

      if (!isActive) {
        return;
      }

      try {
        await supabase
          .from('players')
          .update({ last_seen: new Date().toISOString() })
          .eq('id', playerId)
          .eq('game_id', gameId);

        lastHeartbeatRef.current = now;
      } catch (error) {
        console.error('[usePlayerHeartbeat] Error updating last_seen:', error);
      }
    };

    sendHeartbeat();

    const intervalId = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateActivity();
        sendHeartbeat();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      activityListenersRef.current.forEach(cleanup => cleanup());
      activityListenersRef.current = [];
    };
  }, [gameId, playerId, enabled]);
}
