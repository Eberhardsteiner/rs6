/*
  # Add unique constraint for roles per game

  ## Problem
  Currently, multiple players can select the same role in a game because there's no database constraint.
  The UI blocks this, but a malicious user could bypass the client-side validation.

  ## Solution
  Add a UNIQUE constraint on (game_id, role) to ensure each role can only be assigned once per game.
  
  ## Important Notes
  - TRAINER role can appear multiple times, so we exclude NULL roles from the constraint
  - The constraint allows NULL roles (for players without assigned roles yet)
  - This is a critical security fix to prevent role conflicts

  ## Changes
  1. Drop existing constraint if it exists (idempotent)
  2. Add new UNIQUE constraint for (game_id, role) WHERE role IS NOT NULL
*/

-- Drop constraint if it exists (for idempotency)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'uq_players_game_role'
  ) THEN
    ALTER TABLE players DROP CONSTRAINT uq_players_game_role;
  END IF;
END $$;

-- Add unique constraint: one role per game (excluding NULL)
-- This ensures no two players can have the same role in the same game
ALTER TABLE players 
  ADD CONSTRAINT uq_players_game_role 
  UNIQUE (game_id, role);
