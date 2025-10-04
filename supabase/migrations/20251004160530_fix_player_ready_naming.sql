/*
  # Fix player_ready table naming inconsistency

  ## Problem
  The player_ready table uses `is_ready` column name, but the players table
  uses `ready`. This inconsistency causes confusion.

  ## Solution
  Rename `is_ready` to `ready` in player_ready table for consistency.

  ## Benefits
  - Consistent naming across tables
  - Easier to understand and query
  - Reduces cognitive load for developers

  ## Changes
  Renames column from `is_ready` to `ready` in player_ready table.
*/

-- Rename is_ready to ready for consistency
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'player_ready' AND column_name = 'is_ready'
  ) THEN
    ALTER TABLE player_ready RENAME COLUMN is_ready TO ready;
  END IF;
END $$;
