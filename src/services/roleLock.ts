import { supabase } from '@/services/supabaseClient';
import type { RoleId } from '@/core/models/domain';

export type RoleLock = { role: RoleId; user_id: string | null };

export async function getLockedRoles(gameId: string): Promise<RoleLock[]> {
  const { data, error } = await supabase.rpc('get_locked_roles', { p_game_id: gameId });
  if (error) throw error;
  return (data ?? []).map((r: any) => ({ role: r.role as RoleId, user_id: r.user_id ?? null }));
}

export async function claimRole(gameId: string, role: RoleId): Promise<{ success: boolean; locked_by?: string }> {
  const { data, error } = await supabase.rpc('claim_role', { p_game_id: gameId, p_role: role });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return { success: !!row?.success, locked_by: row?.locked_by ?? undefined };
}

export async function unclaimRole(gameId: string): Promise<void> {
  const { error } = await supabase.rpc('unclaim_role', { p_game_id: gameId });
  if (error) throw error;
}

/** Optionaler Realtime‑Listener; bei restriktiver RLS zusätzlich Polling nutzen. */
export function subscribeRoleLocks(gameId: string, onChange: (locks: RoleLock[]) => void) {
  const ch = supabase
    .channel(`roles:${gameId}`)
    .on('postgres_changes',
        { event: '*', schema: 'public', table: 'players', filter: `game_id=eq.${gameId}` },
        async () => { try { onChange(await getLockedRoles(gameId)); } catch (e) { console.error(e); } })
    .subscribe();

  getLockedRoles(gameId).then(onChange).catch(console.error);
  return () => { try { supabase.removeChannel(ch); } catch {} };
}
