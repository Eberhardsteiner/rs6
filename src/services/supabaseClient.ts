// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Diese Werte müssen aus Ihrem Supabase-Projekt kommen
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Multiplayer mode will be disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions für unsere Datenbank-Tabellen
export interface Game {
  id: string;
  name?: string;
  created_by: string;
  created_at: string;
  state: 'lobby' | 'running' | 'paused' | 'finished';
    status: 'waiting' | 'ready' | 'starting' | 'running' | 'finished';

  current_day: number;
  kpi_values: any;
  session_code?: string;
  join_code?: string;
  host_id?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  game_mode: 'standard' | 'challenge' | 'tutorial' | 'sandbox';
  scenario_data: Record<string, any>;
  theme: string;
  max_players: number;
}

export interface Player {
  id: string;
  game_id: string;
  user_id: string;
  is_gm: boolean;
  name?: string;
  display_name: string;
  role: 'ceo' | 'cfo' | 'ops' | 'hrlegal' | 'trainer' | null;
  joined_at: string;
  last_seen?: string;
  is_ready: boolean;
  game_state?: Record<string, any>;
}

export interface GameAdminSettings {
  game_id: string;
  settings: any;
  invariants: any;
  seed: number;
  pending_draw_eur: number;
  effective_day: number;
  version: number;
  updated_by: string;
  updated_at: string;
}