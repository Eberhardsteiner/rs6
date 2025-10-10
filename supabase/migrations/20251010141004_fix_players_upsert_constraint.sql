/*
  # Fix players table UPSERT constraint

  ## Problem
  The code performs UPSERT operations on players table without explicit onConflict,
  which means Supabase tries to use the PRIMARY KEY. However, the PRIMARY KEY is 'id',
  not (game_id, user_id). This causes the error:
  "⚠️ there is no unique or exclusion constraint matching the ON CONFLICT specification"

  ## Solution
  Add UNIQUE constraint on (game_id, user_id) to allow UPSERT operations.
  This ensures one player record per user per game.

  ## Impact
  - Enables UPSERT operations on players table
  - Prevents duplicate player entries per game
  - Maintains data integrity
*/

-- Step 1: Check for and remove duplicates before adding constraint
-- Keep the newest record by joined_at
DELETE FROM players a USING players b
WHERE a.id < b.id
AND a.game_id = b.game_id
AND a.user_id = b.user_id;

-- Step 2: Add UNIQUE constraint on (game_id, user_id)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'players_game_user_unique'
  ) THEN
    ALTER TABLE players
    ADD CONSTRAINT players_game_user_unique
    UNIQUE (game_id, user_id);
    
    RAISE NOTICE 'Added UNIQUE constraint on players(game_id, user_id)';
  ELSE
    RAISE NOTICE 'UNIQUE constraint already exists on players(game_id, user_id)';
  END IF;
END $$;

-- Step 3: Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_players_game_user
  ON players(game_id, user_id);
