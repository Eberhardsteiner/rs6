// src/components/SaveLoadMenu.tsx
import React from 'react';
import { listSlots, loadSlot, saveSlot, deleteSlot, renameSlot, type SaveMeta } from '@/services/storage';

type Props = {
  getState: () => any;
  applyState: (s: any) => void;
  selectMeta?: (s: any) => { day?: number; seed?: number | null; notes?: string };
  title?: string;
};

const box: React.CSSProperties = { border:'1px solid #e5e7eb', borderRadius:12, padding:16, marginBottom:16 };
const row: React.CSSProperties = { display:'flex', gap:8, alignItems:'center', margin:'6px 0', flexWrap:'wrap' };
const input: React.CSSProperties = { padding:'6px 8px', border:'1px solid #d1d5db', borderRadius:6 };

export default function SaveLoadMenu({ getState, applyState, selectMeta, title='Speichern / Laden' }: Props) {
  const [slots, setSlots] = React.useState<SaveMeta[]>(() => listSlots());
  const [newSlot, setNewSlot] = React.useState<string>('slot1');
  const [renameFrom, setRenameFrom] = React.useState<string>('');
  const [renameTo, setRenameTo] = React.useState<string>('');
  const [selected, setSelected] = React.useState<string>('');

  const refresh = React.useCallback(()=> setSlots(listSlots()), []);

  const doSave = (slot: string) => {
    const state = getState();
    const meta = selectMeta ? selectMeta(state) : {};
    saveSlot(slot, state, { day: meta?.day, seed: meta?.seed, notes: meta?.notes });
    refresh();
  };

  const doLoad = (slot: string) => {
    const rec = loadSlot(slot);
    if (!rec) return;
    applyState(rec.state);
  };

  const doDelete = (slot: string) => {
    if (!confirm(`Slot „${slot}“ wirklich löschen?`)) return;
    deleteSlot(slot);
    refresh();
  };

  const doRename = () => {
    if (!renameFrom || !renameTo || renameFrom === renameTo) return;
    renameSlot(renameFrom, renameTo);
    setRenameFrom(''); setRenameTo(''); refresh();
  };

  // Feature-Toggle: wenn Admin deaktiviert hat, UI nicht rendern
  const enabled = !!(globalThis as any).__featureSaveLoadMenu;
  if (!enabled) return null;

  return (
    <div style={box}>
      <div style={{ fontWeight:700, marginBottom:8 }}>{title}</div>
      <div style={row}>
        <input style={input} type="text" placeholder="neuer Slot" value={newSlot} onChange={(e)=>setNewSlot(e.currentTarget.value)} />
        <button onClick={()=> doSave(newSlot)}>In neuen Slot speichern</button>
      </div>

      <div style={{ ...row, marginTop: 10 }}>
        <select value={selected} onChange={(e)=> setSelected(e.currentTarget.value)} style={{ ...input, minWidth: 200 }}>
          <option value="">— Slot wählen —</option>
          {slots.map(s => (
            <option key={s.slot} value={s.slot}>
              {s.slot} (Tag {s.day ?? '–'}, {new Date(s.updatedAt).toLocaleString()})
            </option>
          ))}
        </select>
        <button disabled={!selected} onClick={()=> doSave(selected)} title="In gewählten Slot speichern">Speichern</button>
        <button disabled={!selected} onClick={()=> doLoad(selected)} title="Gewählten Slot laden">Laden</button>
        <button disabled={!selected} onClick={()=> doDelete(selected)} title="Gewählten Slot löschen">Löschen</button>
      </div>

      <div style={{ ...row, marginTop: 10 }}>
        <input style={input} type="text" placeholder="umbenennen: von" value={renameFrom} onChange={(e)=>setRenameFrom(e.currentTarget.value)} />
        <input style={input} type="text" placeholder="nach" value={renameTo} onChange={(e)=>setRenameTo(e.currentTarget.value)} />
        <button onClick={doRename}>Umbenennen</button>
      </div>

      <div style={{ fontSize:12, color:'#6b7280', marginTop:8 }}>
        Tipp: Legen Sie drei Slots an (A/B/C) und springen Sie zwischen ihnen.
      </div>
    </div>
  );
}
