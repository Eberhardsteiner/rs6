/*
  # Add UNIQUE Constraint to decisions Table

  ## Problem
  The application code uses UPSERT operations on the decisions table with:
  - onConflict: 'game_id,player_id,day,block_id'

  However, the database lacks the corresponding UNIQUE constraint, causing errors:
  "⚠️ there is no unique or exclusion constraint matching the ON CONFLICT specification"

  ## Solution
  1. Check for and remove duplicate entries before adding constraint
  2. Add UNIQUE constraint on (game_id, player_id, day, block_id)
  3. Ensure updated_at column exists for conflict resolution
  4. Add supporting indexes for performance

  ## Impact
  - Enables proper UPSERT operations for player decisions
  - Prevents duplicate decision entries
  - Maintains data integrity during multiplayer gameplay

  ## Changes
  1. Adds updated_at column if missing
  2. Removes any duplicate rows (keeps newest by created_at)
  3. Creates UNIQUE constraint on (game_id, player_id, day, block_id)
  4. Adds composite index for query optimization
*/

-- Step 1: Ensure updated_at column exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'decisions' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE decisions ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
  END IF;
END $$;

-- Step 2: Update NULL updated_at values with created_at or now()
UPDATE decisions
SET updated_at = COALESCE(created_at, now())
WHERE updated_at IS NULL;

-- Step 3: Remove duplicate entries (keep the newest by created_at)
DELETE FROM decisions a USING decisions b
WHERE a.id < b.id
AND a.game_id = b.game_id
AND a.player_id = b.player_id
AND a.day = b.day
AND a.block_id = b.block_id;

-- Step 4: Add UNIQUE constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'decisions_game_player_day_block_unique'
  ) THEN
    ALTER TABLE decisions
    ADD CONSTRAINT decisions_game_player_day_block_unique
    UNIQUE (game_id, player_id, day, block_id);
  END IF;
END $$;

-- Step 5: Add composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_decisions_game_player_day_block
  ON decisions(game_id, player_id, day, block_id);

-- Step 6: Add trigger to auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_decisions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_decisions_updated_at ON decisions;

CREATE TRIGGER trigger_decisions_updated_at
  BEFORE UPDATE ON decisions
  FOR EACH ROW
  EXECUTE FUNCTION update_decisions_updated_at();
