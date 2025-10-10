/*
  # Add indexes for game_credit_history table

  ## Purpose
  This migration adds performance indexes to the game_credit_history table
  to optimize queries for the Trainer Dashboard CFO credit display.

  ## Changes
  - Add composite index on (game_id, day) for efficient day-based queries
  - Add index on (game_id, created_at) for chronological queries
  - Add index on game_id for general game lookups

  ## Impact
  - Improves query performance for credit history lookups
  - Minimal storage overhead
  - No impact on existing data
*/

-- Index for querying credit history by game and day
CREATE INDEX IF NOT EXISTS idx_game_credit_history_game_day
  ON game_credit_history(game_id, day);

-- Index for querying credit history chronologically
CREATE INDEX IF NOT EXISTS idx_game_credit_history_game_created
  ON game_credit_history(game_id, created_at DESC);

-- Index for general game queries
CREATE INDEX IF NOT EXISTS idx_game_credit_history_game_id
  ON game_credit_history(game_id);
