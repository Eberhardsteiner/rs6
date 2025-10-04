/*
  # Add Missing Columns to Games Table
  
  ## Problem
  The TypeScript code tries to insert/update columns that don't exist in the games table:
  - session_code (for 6-digit join codes)
  - host_id (game creator reference)
  - status (for lobby/waiting states)
  - difficulty (easy/medium/hard)
  - game_mode (standard/challenge/tutorial)
  - scenario_data (custom scenario config)
  - theme (visual theme)
  - max_players (player limit)
  - join_code (alternative session code name)
  
  This causes "Could not find column in schema cache" errors.
  
  ## Solution
  Add all missing columns to the games table with proper types, constraints, and defaults.
  
  ## Changes
  1. Add 9 missing columns to games table
  2. Add check constraints for valid enum values
  3. Add unique constraint for session_code
  4. Add foreign key for host_id
  5. Add indexes for frequently queried columns
  6. Ensure backward compatibility with existing data
  
  ## Security
  - RLS policies remain unchanged (already exist for games table)
  - No new security risks introduced
*/

-- Add missing columns to games table
DO $$
BEGIN
  -- session_code: 6-digit alphanumeric code for joining games
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'session_code'
  ) THEN
    ALTER TABLE games ADD COLUMN session_code TEXT;
  END IF;
  
  -- host_id: reference to the user who created the game
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'host_id'
  ) THEN
    ALTER TABLE games ADD COLUMN host_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
  
  -- status: additional status field for lobby states
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'status'
  ) THEN
    ALTER TABLE games ADD COLUMN status TEXT DEFAULT 'waiting';
  END IF;
  
  -- difficulty: game difficulty level
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'difficulty'
  ) THEN
    ALTER TABLE games ADD COLUMN difficulty TEXT DEFAULT 'medium';
  END IF;
  
  -- game_mode: type of game mode
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'game_mode'
  ) THEN
    ALTER TABLE games ADD COLUMN game_mode TEXT DEFAULT 'standard';
  END IF;
  
  -- scenario_data: custom scenario configuration
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'scenario_data'
  ) THEN
    ALTER TABLE games ADD COLUMN scenario_data JSONB DEFAULT '{}'::jsonb;
  END IF;
  
  -- theme: visual theme setting
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'theme'
  ) THEN
    ALTER TABLE games ADD COLUMN theme TEXT DEFAULT 'default';
  END IF;
  
  -- max_players: maximum number of players allowed
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'max_players'
  ) THEN
    ALTER TABLE games ADD COLUMN max_players INTEGER DEFAULT 4;
  END IF;
  
  -- join_code: alternative naming for session_code (compatibility)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'games' AND column_name = 'join_code'
  ) THEN
    ALTER TABLE games ADD COLUMN join_code TEXT;
  END IF;
END $$;

-- Add check constraints for valid enum values
DO $$
BEGIN
  -- difficulty constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'games_difficulty_check'
  ) THEN
    ALTER TABLE games ADD CONSTRAINT games_difficulty_check 
      CHECK (difficulty IN ('easy', 'medium', 'hard'));
  END IF;
  
  -- game_mode constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'games_game_mode_check'
  ) THEN
    ALTER TABLE games ADD CONSTRAINT games_game_mode_check 
      CHECK (game_mode IN ('standard', 'challenge', 'tutorial', 'sandbox'));
  END IF;
  
  -- status constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'games_status_check'
  ) THEN
    ALTER TABLE games ADD CONSTRAINT games_status_check 
      CHECK (status IN ('waiting', 'ready', 'starting'));
  END IF;
  
  -- max_players constraint
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'games_max_players_check'
  ) THEN
    ALTER TABLE games ADD CONSTRAINT games_max_players_check 
      CHECK (max_players >= 1 AND max_players <= 20);
  END IF;
END $$;

-- Add unique constraint for session_code
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'games_session_code_unique'
  ) THEN
    ALTER TABLE games ADD CONSTRAINT games_session_code_unique 
      UNIQUE (session_code);
  END IF;
END $$;

-- Add indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_games_session_code ON games(session_code) WHERE session_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_games_host_id ON games(host_id) WHERE host_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_games_difficulty ON games(difficulty);
CREATE INDEX IF NOT EXISTS idx_games_game_mode ON games(game_mode);
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);

-- Update existing rows to have valid default values
UPDATE games 
SET 
  difficulty = COALESCE(difficulty, 'medium'),
  game_mode = COALESCE(game_mode, 'standard'),
  status = COALESCE(status, 'waiting'),
  theme = COALESCE(theme, 'default'),
  max_players = COALESCE(max_players, 4),
  scenario_data = COALESCE(scenario_data, '{}'::jsonb)
WHERE 
  difficulty IS NULL 
  OR game_mode IS NULL 
  OR status IS NULL 
  OR theme IS NULL 
  OR max_players IS NULL 
  OR scenario_data IS NULL;

-- Make session_code sync with join_code (use session_code as primary, join_code as alias)
CREATE OR REPLACE FUNCTION sync_session_join_code()
RETURNS TRIGGER AS $$
BEGIN
  -- If session_code is set but join_code isn't, copy it
  IF NEW.session_code IS NOT NULL AND NEW.join_code IS NULL THEN
    NEW.join_code := NEW.session_code;
  END IF;
  
  -- If join_code is set but session_code isn't, copy it
  IF NEW.join_code IS NOT NULL AND NEW.session_code IS NULL THEN
    NEW.session_code := NEW.join_code;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists (idempotent)
DROP TRIGGER IF EXISTS trigger_sync_session_join_code ON games;

-- Create trigger to keep session_code and join_code in sync
CREATE TRIGGER trigger_sync_session_join_code
  BEFORE INSERT OR UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION sync_session_join_code();
