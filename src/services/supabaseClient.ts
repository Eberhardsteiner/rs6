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
  name: string;
  created_by: string;
  created_at: string;
  state: 'lobby' | 'running' | 'paused' | 'finished';
  current_day: number;
  kpi_values: any;
}

export interface Player {
  id: string;
  game_id: string;
  user_id: string;
  is_gm: boolean;
  name: string;
  role: 'CEO' | 'CFO' | 'OPS' | 'HRLEGAL' | null;
  joined_at: string;
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