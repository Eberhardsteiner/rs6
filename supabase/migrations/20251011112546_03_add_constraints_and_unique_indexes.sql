/*
  # Add Constraints and Unique Indexes

  ## Changes
  
  1. **Unique Constraints**
     - One role per game (excluding trainer role)
     - One player per user per game
     - Unique decision per player/day/block
  
  2. **Additional Indexes**
     - Composite indexes for common queries
     - Performance optimization for realtime subscriptions
  
  3. **Data Integrity**
     - Check constraints for valid ranges
     - Prevent duplicate entries
*/

-- =====================================================
-- Unique constraint: one role per game (excluding trainer)
-- =====================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_players_game_role_unique 
  ON players(game_id, role) 
  WHERE role IS NOT NULL AND role != 'trainer';

-- =====================================================
-- Unique constraint: one player per user per game
-- =====================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_players_game_user_unique 
  ON players(game_id, user_id);

-- =====================================================
-- Unique constraint: one decision per player/day/block
-- =====================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_decisions_unique 
  ON decisions(game_id, player_id, day, block_id);

-- =====================================================
-- Additional performance indexes
-- =====================================================

-- Composite index for player lookups by game and role
CREATE INDEX IF NOT EXISTS idx_players_game_role 
  ON players(game_id, role) 
  WHERE role IS NOT NULL;

-- Index for active games
CREATE INDEX IF NOT EXISTS idx_games_state_status 
  ON games(state, status) 
  WHERE state != 'finished';

-- Index for recent messages
CREATE INDEX IF NOT EXISTS idx_messages_game_created 
  ON messages(game_id, created_at DESC);

-- Index for scenario overrides by game
CREATE INDEX IF NOT EXISTS idx_scenario_overrides_game_created 
  ON game_scenario_overrides(game_id, created_at ASC);

-- =====================================================
-- Check constraints for data validation
-- =====================================================

-- Ensure current_day is within valid range
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'games_current_day_check'
  ) THEN
    ALTER TABLE games 
      ADD CONSTRAINT games_current_day_check 
      CHECK (current_day >= 1 AND current_day <= 14);
  END IF;
END $$;

-- Ensure valid difficulty levels
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'games_difficulty_check'
  ) THEN
    ALTER TABLE games 
      ADD CONSTRAINT games_difficulty_check 
      CHECK (difficulty IN ('easy', 'medium', 'hard'));
  END IF;
END $$;

-- Ensure valid game states
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'games_state_check'
  ) THEN
    ALTER TABLE games 
      ADD CONSTRAINT games_state_check 
      CHECK (state IN ('lobby', 'running', 'paused', 'finished'));
  END IF;
END $$;

-- Ensure valid player roles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'players_role_check'
  ) THEN
    ALTER TABLE players 
      ADD CONSTRAINT players_role_check 
      CHECK (role IS NULL OR role IN ('ceo', 'cfo', 'ops', 'hrlegal', 'trainer'));
  END IF;
END $$;

-- Ensure decision day is valid
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'decisions_day_check'
  ) THEN
    ALTER TABLE decisions 
      ADD CONSTRAINT decisions_day_check 
      CHECK (day >= 1 AND day <= 14);
  END IF;
END $$;
