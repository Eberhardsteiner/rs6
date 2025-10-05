// src/components/multiplayer/game/AdminEventHandlers.tsx
import { useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';
import type { GameState, KPI } from '@/core/engine/gameEngine';
import { errorHandler } from '@/utils/errorHandler';

export interface AdminEventHandlersProps {
  gameId: string;
  state: GameState;
  dispatch: React.Dispatch<any>;
}

export function useAdminEventHandlers({ gameId, state, dispatch }: AdminEventHandlersProps) {
  useEffect(() => {
    const onKpiSet = async (e: Event) => {
      try {
        const kpi = (e as CustomEvent<KPI>).detail;
        if (!kpi) return;

        dispatch({ type: 'ADMIN_SET_KPI', kpi });

        await supabase.from('games').update({ kpi_values: kpi }).eq('id', gameId);
      } catch (err) {
        errorHandler.warn('[MP] admin:kpi:set failed', err, {
          category: 'EVENT',
          component: 'AdminEventHandlers',
          action: 'admin-kpi-set'
        });
      }
    };

    const onKpiAdd = async (e: Event) => {
      try {
        const delta = (e as CustomEvent<Partial<KPI>>).detail;
        if (!delta) return;

        const next: KPI = { ...state.kpi } as KPI;
        (Object.keys(delta) as (keyof KPI)[]).forEach((k) => {
          const dv = delta[k];
          if (typeof dv === 'number') {
            (next as Record<string, number>)[k] = Number(state.kpi[k] || 0) + dv;
          }
        });

        dispatch({ type: 'ADMIN_ADD_KPI', delta });

        await supabase.from('games').update({ kpi_values: next }).eq('id', gameId);
      } catch (err) {
        errorHandler.warn('[MP] admin:kpi:add failed', err, {
          category: 'EVENT',
          component: 'AdminEventHandlers',
          action: 'admin-kpi-add'
        });
      }
    };

    window.addEventListener('admin:kpi:set', onKpiSet as EventListener);
    window.addEventListener('admin:kpi:add', onKpiAdd as EventListener);

    return () => {
      window.removeEventListener('admin:kpi:set', onKpiSet);
      window.removeEventListener('admin:kpi:add', onKpiAdd);
    };
  }, [gameId, state.kpi, dispatch]);

  useEffect(() => {
    const onSetDay = async (e: Event) => {
      try {
        const detail = (e as CustomEvent<unknown>).detail;
        const raw = typeof detail === 'number' ? detail : (detail as any)?.day;
        const newDay = Number(raw);
        if (!Number.isFinite(newDay) || newDay < 1) return;
        if (!gameId) return;

        await supabase.from('games').update({ current_day: newDay }).eq('id', gameId);
      } catch (err) {
        errorHandler.warn('[MP] admin:set-day failed', err, {
          category: 'EVENT',
          component: 'AdminEventHandlers',
          action: 'admin-set-day'
        });
      }
    };

    const onAdvanceDay = async () => {
      try {
        if (!gameId) return;
        const next = Math.max(1, Number(state.day) + 1);

        await supabase.from('games').update({ current_day: next }).eq('id', gameId);
      } catch (err) {
        errorHandler.warn('[MP] admin:advance-day failed', err, {
          category: 'EVENT',
          component: 'AdminEventHandlers',
          action: 'admin-advance-day'
        });
      }
    };

    window.addEventListener('admin:set-day', onSetDay as EventListener);
    window.addEventListener('admin:advance-day', onAdvanceDay as EventListener);

    return () => {
      window.removeEventListener('admin:set-day', onSetDay);
      window.removeEventListener('admin:advance-day', onAdvanceDay);
    };
  }, [gameId, state.day]);
}
