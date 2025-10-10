/*
  # Fix game_admin_settings PRIMARY KEY

  ## Problem
  The application code uses UPSERT operations on game_admin_settings with:
  - onConflict: 'game_id'

  The table needs a PRIMARY KEY or UNIQUE constraint on game_id to support this.
  Also, there's an auto-create trigger that inserts with ON CONFLICT (game_id) DO NOTHING.

  ## Solution
  1. Verify that game_id is the PRIMARY KEY
  2. If not, add PRIMARY KEY constraint on game_id
  3. Ensure the table structure supports one settings row per game

  ## Impact
  - Enables proper UPSERT operations for game admin settings
  - Ensures each game has exactly one settings row
  - Maintains data integrity for admin panel configuration

  ## Changes
  1. Verifies or creates PRIMARY KEY on game_id
  2. Removes any duplicate entries if they exist
  3. Ensures proper constraint for UPSERT operations
*/

-- Step 1: Check if game_admin_settings table exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_name = 'game_admin_settings'
  ) THEN
    -- Create table if it doesn't exist
    CREATE TABLE game_admin_settings (
      game_id UUID PRIMARY KEY REFERENCES games(id) ON DELETE CASCADE,
      settings JSONB DEFAULT '{}'::jsonb,
      invariants JSONB DEFAULT '{}'::jsonb,
      seed BIGINT,
      pending_draw_eur INTEGER DEFAULT 0,
      effective_day INTEGER DEFAULT 1,
      version INTEGER DEFAULT 0,
      updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
      auth_mode TEXT DEFAULT 'name-only',
      features JSONB DEFAULT '{}'::jsonb,
      preset_credentials JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    -- Enable RLS
    ALTER TABLE game_admin_settings ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Game admin settings readable by game members"
      ON game_admin_settings FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM players
          WHERE players.game_id = game_admin_settings.game_id
          AND players.user_id = auth.uid()
        )
      );

    CREATE POLICY "Game admin settings updatable by game host"
      ON game_admin_settings FOR UPDATE
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM games
          WHERE games.id = game_admin_settings.game_id
          AND games.host_id = auth.uid()
        )
      );

    RAISE NOTICE 'Created game_admin_settings table with PRIMARY KEY on game_id';
  ELSE
    -- Table exists, verify PRIMARY KEY
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE table_name = 'game_admin_settings'
      AND constraint_type = 'PRIMARY KEY'
    ) THEN
      -- No PRIMARY KEY exists, check for duplicates and add it

      -- Remove duplicates if any (keep newest by updated_at)
      CREATE TEMP TABLE game_admin_settings_unique AS
      SELECT DISTINCT ON (game_id) *
      FROM game_admin_settings
      ORDER BY game_id, updated_at DESC NULLS LAST, created_at DESC NULLS LAST;

      DELETE FROM game_admin_settings;
      INSERT INTO game_admin_settings SELECT * FROM game_admin_settings_unique;
      DROP TABLE game_admin_settings_unique;

      -- Add PRIMARY KEY
      ALTER TABLE game_admin_settings ADD PRIMARY KEY (game_id);

      RAISE NOTICE 'Added PRIMARY KEY constraint on game_id';
    ELSE
      -- PRIMARY KEY exists, verify it's on game_id
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.key_column_usage
        WHERE table_name = 'game_admin_settings'
        AND constraint_name IN (
          SELECT constraint_name FROM information_schema.table_constraints
          WHERE table_name = 'game_admin_settings'
          AND constraint_type = 'PRIMARY KEY'
        )
        AND column_name = 'game_id'
      ) THEN
        RAISE EXCEPTION 'PRIMARY KEY exists but is not on game_id column!';
      ELSE
        RAISE NOTICE 'PRIMARY KEY on game_id already exists - OK';
      END IF;
    END IF;
  END IF;
END $$;

-- Step 2: Ensure updated_at column exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'game_admin_settings' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE game_admin_settings ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
  END IF;
END $$;

-- Step 3: Add trigger to auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_game_admin_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_game_admin_settings_updated_at ON game_admin_settings;

CREATE TRIGGER trigger_game_admin_settings_updated_at
  BEFORE UPDATE ON game_admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_game_admin_settings_updated_at();

-- Step 4: Add index for foreign key lookup
CREATE INDEX IF NOT EXISTS idx_game_admin_settings_game_id
  ON game_admin_settings(game_id);
