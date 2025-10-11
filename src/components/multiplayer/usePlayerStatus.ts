import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/services/supabaseClient';
import type { RoleId } from '@/core/models/domain';
import type { PlayerStatus } from './PlayerStatusLamp';

interface PlayerInfo {
  role: RoleId;
  last_seen: string | null;
  is_ready: boolean;
  game_state?: any;
}

interface PlayerStatusData {
  status: PlayerStatus;
  inactiveMinutes?: number;
  decisionsCount?: number;
}

const WARNING_THRESHOLD_MS = 5 * 60 * 1000;
const LEFT_THRESHOLD_MS = 7 * 60 * 1000;

export function usePlayerStatus(gameId: string, currentDay: number) {
  const [playerStatuses, setPlayerStatuses] = useState<Map<RoleId, PlayerStatusData>>(new Map());

  const calculatePlayerStatus = useCallback(async (role: RoleId, playerInfo: PlayerInfo | null, hasDecided: boolean): Promise<PlayerStatusData> => {
    if (!playerInfo) {
      return { status: 'offline' };
    }

    if (hasDecided && role !== 'CEO') {
      const count = 0;
      return { status: 'decided', decisionsCount: count };
    }

    const lastSeen = playerInfo.last_seen;
    if (!lastSeen) {
      if (playerInfo.is_ready === false) {
        return { status: 'lobby' };
      }
      return { status: 'offline' };
    }

    const lastSeenMs = new Date(lastSeen).getTime();
    const nowMs = Date.now();
    const inactiveMs = nowMs - lastSeenMs;
    const inactiveMinutes = Math.floor(inactiveMs / 60000);

    if (inactiveMs > LEFT_THRESHOLD_MS) {
      return { status: 'left', inactiveMinutes };
    }

    if (inactiveMs > WARNING_THRESHOLD_MS) {
      return { status: 'warning', inactiveMinutes };
    }

    if (playerInfo.is_ready === false) {
      return { status: 'lobby' };
    }

    return { status: 'present' };
  }, []);

  const updateAllStatuses = useCallback(async () => {
    try {
      const { data: players } = await supabase
        .from('players')
        .select('role, last_seen, is_ready, game_state')
        .eq('game_id', gameId);

      const { data: readyData } = await supabase
        .from('player_ready')
        .select('role, ready')
        .eq('game_id', gameId)
        .eq('day', currentDay);

      const readyMap = new Map<RoleId, boolean>();
      (readyData || []).forEach((r: any) => {
        if (r.ready) {
          readyMap.set(r.role as RoleId, true);
        }
      });

      const allRoles: RoleId[] = ['CEO', 'CFO', 'OPS', 'HRLEGAL'];
      const newStatuses = new Map<RoleId, PlayerStatusData>();

      for (const role of allRoles) {
        const playerInfo = (players || []).find((p: any) => p.role === role);
        const hasDecided = readyMap.get(role) || false;
        const statusData = await calculatePlayerStatus(role, playerInfo as PlayerInfo | null, hasDecided);
        newStatuses.set(role, statusData);
      }

      setPlayerStatuses(newStatuses);
    } catch (error) {
      console.error('[usePlayerStatus] Error updating statuses:', error);
    }
  }, [gameId, currentDay, calculatePlayerStatus]);

  useEffect(() => {
    updateAllStatuses();

    const intervalId = setInterval(updateAllStatuses, 15000);

    const playersChannel = supabase
      .channel(`player-status-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `game_id=eq.${gameId}`
        },
        () => {
          updateAllStatuses();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'player_ready',
          filter: `game_id=eq.${gameId}`
        },
        () => {
          updateAllStatuses();
        }
      )
      .subscribe();

    return () => {
      clearInterval(intervalId);
      playersChannel.unsubscribe();
    };
  }, [gameId, currentDay, updateAllStatuses]);

  return playerStatuses;
}
