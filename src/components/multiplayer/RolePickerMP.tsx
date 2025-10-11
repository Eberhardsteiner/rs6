import React from 'react';
import type { RoleId } from '@/core/models/domain';
import { claimRole, getLockedRoles, subscribeRoleLocks } from '@/services/roleLock';

type Props = {
  gameId: string;
  onClaimed?: (role: RoleId) => void;
  roles?: RoleId[];           // Default: CEO, CFO, OPS, HRLEGAL
  enableTrainer?: boolean;    // Trainerrolle optional einblenden (Admin-Schalter)
};

const DEFAULT_ROLES: RoleId[] = ['CEO','CFO','OPS','HRLEGAL'] as any;

export default function RolePickerMP({ gameId, onClaimed, roles = DEFAULT_ROLES, enableTrainer }: Props) {
  const [locks, setLocks] = React.useState<Record<RoleId, string | null>>({} as any);
  const [busy, setBusy]   = React.useState<RoleId | null>(null);
  const [err, setErr]     = React.useState<string>('');

  React.useEffect(() => {
    let off: null | (() => void) = null;
    // initial laden
    getLockedRoles(gameId).then(ls => setLocks(Object.fromEntries(ls.map(l => [l.role, l.user_id])) as any));
    // realtime (wenn RLS dies zulässt)
    off = subscribeRoleLocks(gameId, ls => setLocks(Object.fromEntries(ls.map(l => [l.role, l.user_id])) as any));
    // fallback-polling
    const iv = window.setInterval(async () => {
      try {
        const ls = await getLockedRoles(gameId);
        setLocks(Object.fromEntries(ls.map(l => [l.role, l.user_id])) as any);
      } catch {}
    }, 1500);
    return () => { if (off) try { off(); } catch {}; window.clearInterval(iv); };
  }, [gameId]);

  const allRoles: RoleId[] = React.useMemo(
    () => (enableTrainer ? ([...roles, 'TRAINER'] as any) : roles),
    [roles, enableTrainer]
  );
  const isLocked = (r: RoleId) => Boolean((locks as any)[r]);

  const claim = async (r: RoleId) => {
    setErr(''); setBusy(r);
    try {
      const { success } = await claimRole(gameId, r);
      if (!success) { setErr(`Rolle ${r} ist bereits vergeben.`); return; }
      onClaimed?.(r);
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally { setBusy(null); }
  };

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:12 }}>
      {allRoles.map(r => {
        const locked = isLocked(r);
        return (
          <button
            key={r}
            disabled={locked || busy===r}
            onClick={() => claim(r)}
            style={{
              padding:'14px 16px',
              borderRadius:8,
              border:'1px solid #d1d5db',
              fontWeight:700,
              cursor: locked ? 'not-allowed' : 'pointer',
              background: locked ? '#fee2e2' : '#10b981',
              color: locked ? '#991b1b' : '#ffffff',
              opacity: locked ? 0.7 : 1,
              transition:'transform .03s ease-in'
            }}
            title={locked ? `🔒 Rolle ${r} vergeben` : `Rolle ${r} wählen`}
            onMouseDown={(e)=>{ (e.currentTarget as HTMLButtonElement).style.transform='scale(0.98)'; }}
            onMouseUp={(e)=>{ (e.currentTarget as HTMLButtonElement).style.transform='scale(1)'; }}
          >
            {locked ? `🔒 ${r}` : `🎮 ${r} jetzt wählen`}
          </button>
        );
      })}
      {err && <div style={{ gridColumn:'1 / -1', color:'#b91c1c', marginTop:4 }}>{err}</div>}
    </div>
  );
}
