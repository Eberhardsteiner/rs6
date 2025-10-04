// src/services/storage.ts
export type SaveMeta = {
  slot: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  day?: number;
  seed?: number | null;
  sizeBytes: number;
  notes?: string;
};

export type SaveRecord = { meta: SaveMeta; state: any };

const STORAGE_PREFIX = 'adaptio:slot:';
const INDEX_KEY = 'adaptio:slots:index';
const VERSION = 1;

function nowIso(): string { try { return new Date().toISOString(); } catch { return '' as any; } }

export function listSlots(): SaveMeta[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as SaveMeta[];
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

function writeIndex(update: (cur: SaveMeta[]) => SaveMeta[]): void {
  const cur = listSlots();
  const next = update(cur);
  try { localStorage.setItem(INDEX_KEY, JSON.stringify(next)); } catch {}
}

function keyFor(slot: string): string { return STORAGE_PREFIX + slot; }

export function loadSlot(slot: string): SaveRecord | null {
  try {
    const raw = localStorage.getItem(keyFor(slot));
    if (!raw) return null;
    const rec = JSON.parse(raw) as SaveRecord;
    return rec && rec.meta && 'state' in rec ? rec : null;
  } catch { return null; }
}

export function saveSlot(slot: string, state: any, metaPatch?: Partial<SaveMeta>): SaveMeta {
  if (!slot || /[^a-zA-Z0-9._-]/.test(slot)) throw new Error('Ungültiger Slot-Name. Erlaubt: a–Z, 0–9, ., _, -');
  let json = '';
  try { json = JSON.stringify(state); }
  catch {
    const shallow: any = {};
    try {
      Object.keys(state || {}).forEach(k => {
        const v = (state as any)[k];
        if (typeof v !== 'function' && typeof v !== 'symbol') shallow[k] = v;
      });
      json = JSON.stringify(shallow);
    } catch { json = JSON.stringify({}); }
  }
  const sizeBytes = json.length;
  const existing = loadSlot(slot);
  const createdAt = existing?.meta?.createdAt ?? nowIso();
  const updatedAt = nowIso();
  const meta: SaveMeta = {
    slot, createdAt, updatedAt, version: VERSION, sizeBytes,
    day: (metaPatch && metaPatch.day != null) ? metaPatch.day : existing?.meta?.day,
    seed: (metaPatch && metaPatch.seed !== undefined) ? metaPatch.seed : existing?.meta?.seed,
    notes: metaPatch?.notes ?? existing?.meta?.notes,
  };
  const rec: SaveRecord = { meta, state: JSON.parse(json) };
  try { localStorage.setItem(keyFor(slot), JSON.stringify(rec)); } catch {}
  writeIndex(cur => {
    const other = cur.filter(m => m.slot !== slot);
    return [meta, ...other].sort((a,b)=> (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  });
  return meta;
}

export function deleteSlot(slot: string): void {
  try { localStorage.removeItem(keyFor(slot)); } catch {}
  writeIndex(cur => cur.filter(m => m.slot !== slot));
}

export function renameSlot(oldSlot: string, newSlot: string): SaveMeta | null {
  const rec = loadSlot(oldSlot);
  if (!rec) return null;
  const meta = saveSlot(newSlot, rec.state, { day: rec.meta.day, seed: rec.meta.seed, notes: rec.meta.notes });
  deleteSlot(oldSlot);
  return meta;
}

export function autoSave(slot: string, state: any, meta?: Partial<SaveMeta>) {
  return saveSlot(slot, state, meta);
}
