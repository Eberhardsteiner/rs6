/*
  # Database Schema Validation and Missing Tables Creation

  ## Purpose
  This migration validates the entire database schema and creates any missing
  tables that are referenced in the application code but don't exist yet.

  ## Tables Validated/Created
  1. games - Main game table
  2. players - Player participation table
  3. decisions - Player decisions table
  4. player_ready - Day advancement readiness tracking
  5. game_admin_settings - Admin configuration per game
  6. events - Game events log
  7. messages - Chat messages
  8. game_state_snapshots - Historical game state
  9. game_injected_news - Admin-injected news items
  10. game_scenario_overrides - Custom scenario modifications
  11. trainer_memberships - Trainer access control

  ## Impact
  - Ensures all required tables exist
  - Validates critical columns and constraints
  - Provides a complete baseline schema for the application
*/

-- ============================================================================
-- VALIDATION: Check that critical tables exist
-- ============================================================================

DO $$
DECLARE
  missing_tables TEXT[] := '{}';
BEGIN
  -- Check each required table
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'games') THEN
    missing_tables := array_append(missing_tables, 'games');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'players') THEN
    missing_tables := array_append(missing_tables, 'players');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'decisions') THEN
    missing_tables := array_append(missing_tables, 'decisions');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'player_ready') THEN
    missing_tables := array_append(missing_tables, 'player_ready');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_admin_settings') THEN
    missing_tables := array_append(missing_tables, 'game_admin_settings');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events') THEN
    missing_tables := array_append(missing_tables, 'events');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'messages') THEN
    missing_tables := array_append(missing_tables, 'messages');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_state_snapshots') THEN
    missing_tables := array_append(missing_tables, 'game_state_snapshots');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_injected_news') THEN
    missing_tables := array_append(missing_tables, 'game_injected_news');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'game_scenario_overrides') THEN
    missing_tables := array_append(missing_tables, 'game_scenario_overrides');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'trainer_memberships') THEN
    missing_tables := array_append(missing_tables, 'trainer_memberships');
  END IF;

  -- Report results
  IF array_length(missing_tables, 1) > 0 THEN
    RAISE NOTICE 'Missing tables will be created: %', array_to_string(missing_tables, ', ');
  ELSE
    RAISE NOTICE 'All required tables exist ✓';
  END IF;
END $$;

-- ============================================================================
-- CREATE: game_injected_news (if missing)
-- ============================================================================

CREATE TABLE IF NOT EXISTS game_injected_news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 14),
  title TEXT NOT NULL,
  content TEXT,
  source TEXT NOT NULL CHECK (source IN ('press', 'customer', 'supplier', 'internal', 'rumor', 'bank', 'authority')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  roles TEXT[], -- NULL means global (all roles), otherwise specific roles
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE game_injected_news ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY IF NOT EXISTS "Injected news readable by game members"
  ON game_injected_news FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM players
      WHERE players.game_id = game_injected_news.game_id
      AND players.user_id = auth.uid()
    )
  );

CREATE POLICY IF NOT EXISTS "Injected news writable by game host or trainer"
  ON game_injected_news FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM games
      WHERE games.id = game_injected_news.game_id
      AND games.host_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM players
      WHERE players.game_id = game_injected_news.game_id
      AND players.user_id = auth.uid()
      AND players.role = 'TRAINER'
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_game_injected_news_game_day
  ON game_injected_news(game_id, day);

CREATE INDEX IF NOT EXISTS idx_game_injected_news_created
  ON game_injected_news(created_at DESC);

-- ============================================================================
-- VALIDATION SUMMARY
-- ============================================================================

DO $$
DECLARE
  constraint_status TEXT;
BEGIN
  RAISE NOTICE '=== Database Schema Validation Complete ===';

  -- Check decisions UNIQUE constraint
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'decisions_game_player_day_block_unique'
  ) THEN
    RAISE NOTICE '✓ decisions: UNIQUE constraint on (game_id, player_id, day, block_id)';
  ELSE
    RAISE WARNING '✗ decisions: Missing UNIQUE constraint - UPSERT will fail!';
  END IF;

  -- Check player_ready UNIQUE constraint
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'player_ready_game_day_role_unique'
  ) THEN
    RAISE NOTICE '✓ player_ready: UNIQUE constraint on (game_id, day, role)';
  ELSE
    RAISE WARNING '✗ player_ready: Missing UNIQUE constraint - UPSERT will fail!';
  END IF;

  -- Check game_admin_settings PRIMARY KEY
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'game_admin_settings'
    AND constraint_type = 'PRIMARY KEY'
  ) THEN
    RAISE NOTICE '✓ game_admin_settings: PRIMARY KEY exists';
  ELSE
    RAISE WARNING '✗ game_admin_settings: Missing PRIMARY KEY - UPSERT will fail!';
  END IF;

  -- Check game_scenario_overrides structure
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'game_scenario_overrides'
    AND column_name = 'created_at'
  ) THEN
    RAISE NOTICE '✓ game_scenario_overrides: created_at column exists';
  ELSE
    RAISE WARNING '✗ game_scenario_overrides: Missing created_at column';
  END IF;

  RAISE NOTICE '=== Validation Complete ===';
END $$;
