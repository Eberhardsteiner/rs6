// src/services/roleLock.ts
import { supabase } from '@/services/supabaseClient';
import type { RoleId } from '@/core/models/domain';

export type RoleLock = { role: RoleId; user_id: string | null };

/** Liest die belegten Rollen über RPC (funktioniert auch mit RLS). */
export async function getLockedRoles(gameId: string): Promise<RoleLock[]> {
  const { data, error } = await supabase.rpc('get_locked_roles', { p_game_id: gameId });
  if (error) throw error;
  return (data ?? []).map((r: any) => ({ role: r.role as RoleId, user_id: r.user_id ?? null }));
}

/** Versucht, eine Rolle exklusiv zu claimen. */
export async function claimRole(gameId: string, role: RoleId): Promise<{ success: boolean; locked_by?: string }> {
  const { data, error } = await supabase.rpc('claim_role', { p_game_id: gameId, p_role: role });
  if (error) throw error;
  // Supabase liefert bei LANGUAGE plpgsql meist ein Array von Rows
  const row = Array.isArray(data) ? data[0] : data;
  return { success: !!row?.success, locked_by: row?.locked_by ?? undefined };
}

/** Gibt die eigene Rolle wieder frei (setzt role=NULL). */
export async function unclaimRole(gameId: string): Promise<void> {
  const { error } = await supabase.rpc('unclaim_role', { p_game_id: gameId });
  if (error) throw error;
}

/** Realtime-Subscription (falls RLS Select-Ereignisse zulässt); sonst Polling im UI nutzen. */
export function subscribeRoleLocks(gameId: string, onChange: (locks: RoleLock[]) => void) {
  const ch = supabase
    .channel(`roles:${gameId}`)
    .on('postgres_changes',
        { event: '*', schema: 'public', table: 'players', filter: `game_id=eq.${gameId}` },
        async () => {
          try { onChange(await getLockedRoles(gameId)); } catch(e) { console.error(e); }
        })
    .subscribe();

  // initial
  getLockedRoles(gameId).then(onChange).catch(console.error);

  return () => { try { supabase.removeChannel(ch); } catch {} };
}
