/*
  # Fix unique role constraint to allow multiple trainers

  ## Problem
  The previous constraint prevents multiple trainers from joining the same game.
  Trainers should be able to observe without role conflicts.

  ## Solution
  Use a partial unique INDEX instead of constraint that excludes TRAINER role.
  This allows:
  - Only one CEO, CFO, OPS, HRLEGAL per game
  - Multiple TRAINER roles per game

  ## Changes
  1. Drop the previous constraint
  2. Add partial UNIQUE INDEX that excludes TRAINER
*/

-- Drop the old constraint
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'uq_players_game_role'
  ) THEN
    ALTER TABLE players DROP CONSTRAINT uq_players_game_role;
  END IF;
END $$;

-- Drop the index if it exists (for idempotency)
DROP INDEX IF EXISTS idx_players_game_role_unique;

-- Add partial unique index: one role per game, EXCEPT for TRAINER
-- This allows multiple trainers but enforces uniqueness for all other roles
CREATE UNIQUE INDEX idx_players_game_role_unique 
  ON players (game_id, role)
  WHERE role IS NOT NULL AND role != 'TRAINER';
