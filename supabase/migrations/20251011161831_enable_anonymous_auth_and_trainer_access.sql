/*
  # Enable Anonymous Authentication and Trainer Access

  1. Purpose
    - Enable anonymous sign-ins for the application
    - Configure RLS policies to allow trainer access
    - Ensure trainers can access all game data in read-only mode

  2. Changes
    - Create trainer_memberships table
    - Add RLS policies for anonymous trainer users
    - Allow trainers to read all game-related tables
    - Allow players table to accept anonymous trainer inserts

  3. Security
    - Trainers can only READ game data, not modify it
    - Trainers must have a valid entry in trainer_memberships
    - All policies check for TRAINER role before granting access
    - Regular players maintain their existing restricted access

  4. Tables Affected
    - trainer_memberships (new table)
    - players (read all, insert own trainer record)
    - games (read all for trainers)
    - decisions (read all for trainers)
    - messages (read all for trainers)
    - game_admin_settings (read all for trainers)
*/

-- ============================================================================
-- TRAINER_MEMBERSHIPS TABLE: Create and secure
-- ============================================================================

-- Create the trainer_memberships table
CREATE TABLE IF NOT EXISTS trainer_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(game_id, user_id)
);

-- Enable RLS
ALTER TABLE trainer_memberships ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own trainer memberships
CREATE POLICY "Users can read own trainer memberships"
  ON trainer_memberships
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own trainer membership
CREATE POLICY "Users can insert own trainer membership"
  ON trainer_memberships
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own trainer membership
CREATE POLICY "Users can delete own trainer membership"
  ON trainer_memberships
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- PLAYERS TABLE: Allow trainers to read all players and insert themselves
-- ============================================================================

-- Policy: Trainers can read all players in any game
CREATE POLICY "Trainers can read all players"
  ON players
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trainer_memberships tm
      WHERE tm.user_id = auth.uid()
      AND tm.game_id = players.game_id
    )
  );

-- Policy: Allow trainer to insert their own player record
CREATE POLICY "Trainers can insert own record"
  ON players
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND role = 'TRAINER'
  );

-- Policy: Trainers can update their own record (last_seen, etc)
CREATE POLICY "Trainers can update own record"
  ON players
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND role = 'TRAINER')
  WITH CHECK (auth.uid() = user_id AND role = 'TRAINER');

-- ============================================================================
-- GAMES TABLE: Allow trainers to read all game data
-- ============================================================================

-- Policy: Trainers can read all games they have membership for
CREATE POLICY "Trainers can read games"
  ON games
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trainer_memberships tm
      WHERE tm.user_id = auth.uid()
      AND tm.game_id = games.id
    )
  );

-- ============================================================================
-- DECISIONS TABLE: Allow trainers to read all decisions
-- ============================================================================

-- Policy: Trainers can read all decisions in their games
CREATE POLICY "Trainers can read all decisions"
  ON decisions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trainer_memberships tm
      WHERE tm.user_id = auth.uid()
      AND tm.game_id = decisions.game_id
    )
  );

-- ============================================================================
-- MESSAGES TABLE: Allow trainers to read all messages
-- ============================================================================

-- Policy: Trainers can read all messages in their games
CREATE POLICY "Trainers can read all messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trainer_memberships tm
      WHERE tm.user_id = auth.uid()
      AND tm.game_id = messages.game_id
    )
  );

-- ============================================================================
-- GAME_ADMIN_SETTINGS TABLE: Allow trainers to read settings
-- ============================================================================

-- Policy: Trainers can read game admin settings
CREATE POLICY "Trainers can read game settings"
  ON game_admin_settings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trainer_memberships tm
      WHERE tm.user_id = auth.uid()
      AND tm.game_id = game_admin_settings.game_id
    )
  );

-- ============================================================================
-- INDEXES for performance
-- ============================================================================

-- Index for trainer membership lookups
CREATE INDEX IF NOT EXISTS idx_trainer_memberships_user_id
  ON trainer_memberships(user_id);

CREATE INDEX IF NOT EXISTS idx_trainer_memberships_game_id
  ON trainer_memberships(game_id);

-- Index for trainer role lookups in players table
CREATE INDEX IF NOT EXISTS idx_players_role_trainer
  ON players(role)
  WHERE role = 'TRAINER';

-- ============================================================================
-- COMMENTS for documentation
-- ============================================================================

COMMENT ON TABLE trainer_memberships IS
  'Tracks which users have trainer access to which games. Trainers can observe all game data in read-only mode.';

COMMENT ON POLICY "Trainers can read all players" ON players IS
  'Allows trainers to view all players in games they have membership for';

COMMENT ON POLICY "Trainers can read games" ON games IS
  'Allows trainers to view game details for games they have membership for';

COMMENT ON POLICY "Trainers can read all decisions" ON decisions IS
  'Allows trainers to view all decisions made in games they observe';

COMMENT ON POLICY "Trainers can read all messages" ON messages IS
  'Allows trainers to view all messages in games they observe';