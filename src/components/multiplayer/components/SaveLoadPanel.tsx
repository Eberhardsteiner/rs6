// src/components/multiplayer/components/SaveLoadPanel.tsx
import React, { useState, useEffect } from 'react';

export type SlotId = 'A' | 'B' | 'C' | 'D';

export interface SlotMeta {
  day: number;
  ts: number;
}

export interface SaveLoadPanelProps {
  gameId: string;
  role: string;
  onSave: (slotId: SlotId) => void;
  onLoad: (slotId: SlotId) => void;
  onDelete: (slotId: SlotId) => void;
}

export function SaveLoadPanel({
  gameId,
  role,
  onSave,
  onLoad,
  onDelete
}: SaveLoadPanelProps): JSX.Element {
  const [slotId, setSlotId] = useState<SlotId>('A');
  const [slotsMeta, setSlotsMeta] = useState<Record<SlotId, SlotMeta | null>>({
    A: null,
    B: null,
    C: null,
    D: null
  });

  useEffect(() => {
    const loadSlotsMeta = (): void => {
      const meta: Record<SlotId, SlotMeta | null> = { A: null, B: null, C: null, D: null };
      const slots: SlotId[] = ['A', 'B', 'C', 'D'];

      for (const slot of slots) {
        try {
          const raw = localStorage.getItem(`mp:save:${gameId}:${role}:${slot}`);
          if (!raw) continue;

          const parsed = JSON.parse(raw);
          if (parsed?.meta?.day && parsed?.meta?.ts) {
            meta[slot] = {
              day: parsed.meta.day,
              ts: parsed.meta.ts
            };
          }
        } catch {}
      }

      setSlotsMeta(meta);
    };

    loadSlotsMeta();

    const interval = setInterval(loadSlotsMeta, 2000);
    return () => clearInterval(interval);
  }, [gameId, role]);

  const getAutoSaveInfo = (): string => {
    try {
      const raw = localStorage.getItem(`mp:save:${gameId}:${role}:__autosave__`);
      if (!raw) return '— keiner —';

      const o = JSON.parse(raw);
      const ts = o?.meta?.ts ? new Date(o.meta.ts).toLocaleString('de-DE') : '?';
      const d = o?.state?.day ?? '?';
      return `Tag ${d} – ${ts}`;
    } catch {
      return '— ungültig —';
    }
  };

  return (
    <div
      style={{
        width: '100%',
        marginTop: 8,
        padding: 12,
        background: '#eef2ff',
        border: '1px solid #c7d2fe',
        borderRadius: 8
      }}
    >
      <div style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <label style={{ fontSize: 12, color: '#374151' }}>
          Slot:&nbsp;
          <select
            value={slotId}
            onChange={(e) => setSlotId(e.target.value as SlotId)}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid #c7d2fe'
            }}
          >
            {(['A', 'B', 'C', 'D'] as const).map(s => {
              const m = slotsMeta[s];
              const label = m
                ? `Slot ${s} – Tag ${m.day} (${new Date(m.ts).toLocaleString('de-DE')})`
                : `Slot ${s} – leer`;
              return <option key={s} value={s}>{label}</option>;
            })}
          </select>
        </label>

        <button
          onClick={() => onSave(slotId)}
          title="Lokalen Spielstand in diesem Slot sichern"
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #818cf8',
            background: 'white',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          💾 Speichern
        </button>

        <button
          onClick={() => onLoad(slotId)}
          title="Spielstand aus diesem Slot laden"
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #818cf8',
            background: 'white',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          📥 Laden
        </button>

        <button
          onClick={() => {
            if (confirm(`Slot ${slotId} löschen?`)) {
              onDelete(slotId);
            }
          }}
          title="Speicherstand in diesem Slot löschen"
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid #ef4444',
            background: 'white',
            fontWeight: 600,
            color: '#b91c1c',
            cursor: 'pointer'
          }}
        >
          🗑️ Löschen
        </button>
      </div>

      <div style={{
        marginTop: 8,
        fontSize: 12,
        color: '#6b7280'
      }}>
        Auto-Save: {getAutoSaveInfo()}
      </div>
    </div>
  );
}

export default SaveLoadPanel;
