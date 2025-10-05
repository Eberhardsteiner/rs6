// src/components/multiplayer/game/SaveLoadManager.tsx
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/services/supabaseClient';
import type { GameState } from '@/core/engine/gameEngine';
import type { RoleId } from '@/core/models/domain';
import { errorHandler } from '@/utils/errorHandler';

export interface SaveLoadManagerProps {
  gameId: string;
  role: RoleId;
  playerName: string;
  state: GameState;
  dispatch: React.Dispatch<any>;
}

export function useSaveLoadManager({ gameId, role, playerName, state, dispatch }: SaveLoadManagerProps) {
  const saveSlots = ['A', 'B', 'C', 'D'] as const;
  const [saveLoadEnabled, setSaveLoadEnabled] = useState<boolean>(false);
  const [slotId, setSlotId] = useState<string>('A');
  const [slotsMeta, setSlotsMeta] = useState<Record<string, { ts: number; day: number }>>({});

  const makeSaveKey = (slot: string) => `mp:save:${gameId}:${role}:${slot}`;

  const readSlotMeta = useCallback(
    (slot: string) => {
      try {
        const raw = localStorage.getItem(makeSaveKey(slot));
        if (!raw) return null;
        const obj = JSON.parse(raw);
        const meta = obj?.meta as { ts: number; day: number } | null;
        return meta && typeof meta.ts === 'number' ? meta : null;
      } catch {
        return null;
      }
    },
    [gameId, role]
  );

  const refreshSlotsMeta = useCallback(() => {
    const m: Record<string, { ts: number; day: number }> = {};
    [...saveSlots, '__autosave__'].forEach((s: string) => {
      const meta = readSlotMeta(s);
      if (meta) m[s] = meta;
    });
    setSlotsMeta(m);
  }, [readSlotMeta]);

  const saveSlot = useCallback(
    (slot: string, showToast = true) => {
      try {
        const toSave = {
          version: 1,
          meta: { ts: Date.now(), day: state.day, gameId, role, playerName },
          state: {
            ...state,
            currentDate: (() => {
              try {
                return state.currentDate instanceof Date
                  ? state.currentDate.toISOString()
                  : state.currentDate;
              } catch {
                return null;
              }
            })()
          }
        };
        localStorage.setItem(makeSaveKey(slot), JSON.stringify(toSave));
        refreshSlotsMeta();
        if (showToast) alert(`Gespeichert in Slot ${slot} (Tag ${state.day}).`);
      } catch (e) {
        alert('Speichern fehlgeschlagen.');
        errorHandler.warn('saveSlot failed', e, {
          category: 'STORAGE',
          component: 'SaveLoadManager',
          action: 'save-slot'
        });
      }
    },
    [state, gameId, role, playerName, refreshSlotsMeta]
  );

  const loadSlot = useCallback(
    async (slot: string) => {
      try {
        const raw = localStorage.getItem(makeSaveKey(slot));
        if (!raw) {
          alert('Kein Speicherstand in diesem Slot.');
          return;
        }
        const data = JSON.parse(raw);
        const saved = data?.state || {};

        const revivedDate = new Date();
        revivedDate.setHours(9 + (Number(saved.day || 1) - 1) * 24, 0, 0, 0);

        dispatch({ type: 'INIT', payload: { ...(saved as Partial<GameState>), currentDate: revivedDate } });

        try {
          await supabase
            .from('games')
            .update({ current_day: Number(saved.day || 1), kpi_values: saved.kpi })
            .eq('id', gameId);
        } catch (dbErr) {
          errorHandler.warn('DB-Sync beim Laden fehlgeschlagen', dbErr, {
            category: 'NETWORK',
            component: 'SaveLoadManager',
            action: 'load-slot'
          });
        }

        alert(`Spielstand aus Slot ${slot} geladen (Tag ${saved.day ?? '?'}).`);
      } catch (e) {
        alert('Laden fehlgeschlagen.');
        errorHandler.warn('loadSlot failed', e, {
          category: 'STORAGE',
          component: 'SaveLoadManager',
          action: 'load-slot'
        });
      }
    },
    [gameId, dispatch]
  );

  const deleteSlot = useCallback(
    (slot: string) => {
      try {
        localStorage.removeItem(makeSaveKey(slot));
        refreshSlotsMeta();
      } catch {}
    },
    [refreshSlotsMeta]
  );

  useEffect(() => {
    const readSaveLoad = () => {
      try {
        const g = globalThis as any;
        setSaveLoadEnabled(!!g.__featureSaveLoadMenu);
      } catch {}
    };
    readSaveLoad();
    window.addEventListener('admin:settings', readSaveLoad);
    window.addEventListener('storage', readSaveLoad);
    return () => {
      window.removeEventListener('admin:settings', readSaveLoad);
      window.removeEventListener('storage', readSaveLoad);
    };
  }, []);

  useEffect(() => {
    refreshSlotsMeta();
  }, [refreshSlotsMeta]);

  useEffect(() => {
    try {
      const g = globalThis as any;
      if (g.__featureAutoSave) {
        saveSlot('__autosave__', false);
      }
    } catch {}
  }, [state.day, saveSlot]);

  return {
    saveLoadEnabled,
    slotId,
    setSlotId,
    slotsMeta,
    saveSlots,
    saveSlot,
    loadSlot,
    deleteSlot
  };
}
