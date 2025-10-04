
// src/services/decisions_upsert.ts
export type UUID = string;

export interface DecisionRow {
  id?: UUID;
  game_id: UUID;
  player_id: UUID;
  day: number;
  block_id: string;
  option_id?: string | null;
  custom_text?: string | null;
  kpi_delta?: Record<string, number> | null;
  decision_metadata?: Record<string, any> | null;
}

/**
 * Einziger Schreibpfad: robustes Upsert + maybeSingle() → kein 406 mehr.
 * Voraussetzung: UNIQUE (game_id, player_id, day, block_id) in der DB.
 */
export async function upsertDecision(supabase: any, row: DecisionRow): Promise<UUID | null> {
  const { data, error } = await supabase
    .from('decisions')
    .upsert(row, { onConflict: 'game_id,player_id,day,block_id' })
    .select('id')
    .maybeSingle(); // vermeidet PGRST116 bei 0 Treffern

  if (error) throw error;
  return data?.id ?? null;
}
