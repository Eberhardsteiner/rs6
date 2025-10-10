/*
  # Add UNIQUE Constraint to player_ready Table

  ## Problem
  The application code uses UPSERT operations on the player_ready table with:
  - onConflict: 'game_id,day,role'

  However, the database lacks the corresponding UNIQUE constraint, causing errors:
  "⚠️ there is no unique or exclusion constraint matching the ON CONFLICT specification"

  This is used in DaySyncController.tsx to track which players are ready for day advancement.

  ## Solution
  1. Ensure all required columns exist (game_id, day, role, ready, updated_at)
  2. Check for and remove duplicate entries before adding constraint
  3. Add UNIQUE constraint on (game_id, day, role)
  4. Add supporting indexes for performance

  ## Impact
  - Enables proper UPSERT operations for player ready status
  - Prevents duplicate ready state entries
  - Maintains data integrity during multiplayer synchronization

  ## Changes
  1. Ensures updated_at column exists
  2. Removes any duplicate rows (keeps newest by updated_at)
  3. Creates UNIQUE constraint on (game_id, day, role)
  4. Adds composite index for query optimization
*/

-- Step 1: Ensure updated_at column exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'player_ready' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE player_ready ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
  END IF;
END $$;

-- Step 2: Ensure ready column exists (renamed from is_ready in earlier migration)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'player_ready' AND column_name = 'ready'
  ) THEN
    -- If is_ready exists, rename it
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'player_ready' AND column_name = 'is_ready'
    ) THEN
      ALTER TABLE player_ready RENAME COLUMN is_ready TO ready;
    ELSE
      -- Otherwise create ready column
      ALTER TABLE player_ready ADD COLUMN ready BOOLEAN DEFAULT false NOT NULL;
    END IF;
  END IF;
END $$;

-- Step 3: Update NULL updated_at values
UPDATE player_ready
SET updated_at = COALESCE(created_at, now())
WHERE updated_at IS NULL;

-- Step 4: Remove duplicate entries (keep the newest by updated_at)
-- Create a temporary table with unique entries
CREATE TEMP TABLE player_ready_unique AS
SELECT DISTINCT ON (game_id, day, role) *
FROM player_ready
ORDER BY game_id, day, role, updated_at DESC NULLS LAST;

-- Step 5: Delete all rows from original table
DELETE FROM player_ready;

-- Step 6: Re-insert unique rows
INSERT INTO player_ready
SELECT * FROM player_ready_unique;

-- Step 7: Drop temporary table
DROP TABLE player_ready_unique;

-- Step 8: Add UNIQUE constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'player_ready_game_day_role_unique'
  ) THEN
    ALTER TABLE player_ready
    ADD CONSTRAINT player_ready_game_day_role_unique
    UNIQUE (game_id, day, role);
  END IF;
END $$;

-- Step 9: Add composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_player_ready_game_day_role
  ON player_ready(game_id, day, role);

-- Step 10: Add index for filtering by ready status
CREATE INDEX IF NOT EXISTS idx_player_ready_game_day_ready
  ON player_ready(game_id, day) WHERE ready = true;

-- Step 11: Add trigger to auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_player_ready_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_player_ready_updated_at ON player_ready;

CREATE TRIGGER trigger_player_ready_updated_at
  BEFORE UPDATE ON player_ready
  FOR EACH ROW
  EXECUTE FUNCTION update_player_ready_updated_at();
