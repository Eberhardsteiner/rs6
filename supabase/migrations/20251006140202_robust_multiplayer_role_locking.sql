/*
  # Robust Multiplayer Role Locking, Real-time Presence & Join-in-Progress

  ## Overview
  This migration implements three critical multiplayer features:
  1. **Role Locking**: Database-enforced unique role assignment per game (except TRAINER)
  2. **Real-time Presence**: Player status tracking for lobby visibility
  3. **Join-in-Progress**: Support for joining running games seamlessly

  ## Changes to `players` Table

  ### New Columns
  - `status`: Tracks player state (lobby/in_game/disconnected/left)
  - `left_at`: Timestamp when player left (enables soft deletes)

  ### Indexes & Constraints
  - Unique role per game (excluding TRAINER, excluding left players)
  - Unique user per game (excluding left players)
  - CHECK constraint for valid status values

  ## Changes to `games` Table

  ### Status Updates
  - Ensure `status` column exists with proper constraints

  ## RPC Functions

  ### `rpc_claim_role_and_join`
  Transactional role assignment with error codes:
  - GAME_NOT_FOUND: Game doesn't exist
  - GAME_ENDED: Game already finished
  - ROLE_TAKEN: Role already assigned to another player

  ### `rpc_mark_player_left`
  Soft-delete player record by setting left_at timestamp

  ### `rpc_set_game_status`
  Update game status (lobby/running/ended) - Host/Trainer only

  ## Security
  - RLS policies ensure players can only modify their own records
  - Trainers and hosts have elevated permissions
  - All mutations are idempotent and safe for concurrent access
*/

-- ============================================================================
-- STEP 1: Add missing columns to players table
-- ============================================================================

DO $$
BEGIN
  -- Add status column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'status'
  ) THEN
    ALTER TABLE players ADD COLUMN status TEXT DEFAULT 'lobby';
  END IF;

  -- Add left_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'left_at'
  ) THEN
    ALTER TABLE players ADD COLUMN left_at TIMESTAMPTZ NULL;
  END IF;
END $$;

-- Add CHECK constraint for status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'players_status_check'
  ) THEN
    ALTER TABLE players ADD CONSTRAINT players_status_check
      CHECK (status IN ('lobby', 'in_game', 'disconnected', 'left'));
  END IF;
END $$;

-- ============================================================================
-- STEP 2: Create unique indexes for role and user constraints
-- ============================================================================

-- Drop old unique role index if it exists (from previous migrations)
DROP INDEX IF EXISTS idx_players_game_role_unique;

-- Create unique index: one role per game (except TRAINER, exclude left players)
CREATE UNIQUE INDEX IF NOT EXISTS players_unique_role_per_game
  ON players (game_id, role)
  WHERE role IS NOT NULL
    AND role != 'TRAINER'
    AND left_at IS NULL;

-- Create unique index: one player record per user per game (exclude left players)
CREATE UNIQUE INDEX IF NOT EXISTS players_unique_user_in_game
  ON players (game_id, user_id)
  WHERE left_at IS NULL;

-- ============================================================================
-- STEP 3: Update trigger for automatic last_seen updates
-- ============================================================================

-- Enhance the existing trigger function to update last_seen on every update
CREATE OR REPLACE FUNCTION update_player_last_seen()
RETURNS TRIGGER AS $$
BEGIN
  -- Always update last_seen on any UPDATE
  NEW.last_seen := now();

  -- Sync display_name from name if needed (existing logic)
  IF (NEW.display_name IS NULL OR NEW.display_name = '') AND
     NEW.name IS NOT NULL AND NEW.name != '' THEN
    NEW.display_name := NEW.name;
  END IF;

  -- Fallback display_name if still empty
  IF NEW.display_name IS NULL OR NEW.display_name = '' THEN
    NEW.display_name := 'Spieler';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger to ensure it's using the updated function
DROP TRIGGER IF EXISTS trigger_sync_player_display_name ON players;
DROP TRIGGER IF EXISTS trigger_update_player_last_seen ON players;

CREATE TRIGGER trigger_update_player_last_seen
  BEFORE INSERT OR UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_player_last_seen();

-- ============================================================================
-- STEP 4: Indexes for performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_players_status ON players(status) WHERE status != 'left';
CREATE INDEX IF NOT EXISTS idx_players_left_at ON players(left_at) WHERE left_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_players_game_status ON players(game_id, status);

-- ============================================================================
-- STEP 5: RPC Functions
-- ============================================================================

-- Function: Claim a role and join a game (transactional, with error codes)
CREATE OR REPLACE FUNCTION rpc_claim_role_and_join(
  p_game_id UUID,
  p_desired_role TEXT,
  p_player_name TEXT DEFAULT NULL
)
RETURNS players
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_game_status TEXT;
  v_player players;
  v_current_role TEXT;
BEGIN
  -- Get authenticated user
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'UNAUTHORIZED: Not authenticated';
  END IF;

  -- Check if game exists and get status
  SELECT status INTO v_game_status
  FROM games
  WHERE id = p_game_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'GAME_NOT_FOUND: Game does not exist';
  END IF;

  IF v_game_status = 'ended' THEN
    RAISE EXCEPTION 'GAME_ENDED: Game has already ended';
  END IF;

  -- Check if player already exists in this game (and hasn't left)
  SELECT * INTO v_player
  FROM players
  WHERE game_id = p_game_id
    AND user_id = v_user_id
    AND left_at IS NULL;

  IF FOUND THEN
    -- Player exists, check if role change is requested
    v_current_role := v_player.role;

    IF v_current_role != p_desired_role THEN
      -- Check if desired role is available (not TRAINER, not taken by someone else)
      IF p_desired_role != 'TRAINER' THEN
        IF EXISTS (
          SELECT 1 FROM players
          WHERE game_id = p_game_id
            AND role = p_desired_role
            AND user_id != v_user_id
            AND left_at IS NULL
        ) THEN
          RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
        END IF;
      END IF;

      -- Update role and status
      UPDATE players
      SET
        role = p_desired_role,
        status = CASE WHEN v_game_status = 'running' THEN 'in_game' ELSE 'lobby' END,
        display_name = COALESCE(p_player_name, display_name, name, 'Spieler'),
        last_seen = now(),
        is_active = true
      WHERE id = v_player.id
      RETURNING * INTO v_player;
    ELSE
      -- Same role, just update last_seen and status
      UPDATE players
      SET
        status = CASE WHEN v_game_status = 'running' THEN 'in_game' ELSE 'lobby' END,
        last_seen = now(),
        is_active = true
      WHERE id = v_player.id
      RETURNING * INTO v_player;
    END IF;
  ELSE
    -- New player, check role availability (except TRAINER)
    IF p_desired_role != 'TRAINER' THEN
      IF EXISTS (
        SELECT 1 FROM players
        WHERE game_id = p_game_id
          AND role = p_desired_role
          AND left_at IS NULL
      ) THEN
        RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
      END IF;
    END IF;

    -- Insert new player
    INSERT INTO players (
      game_id,
      user_id,
      role,
      name,
      display_name,
      status,
      is_ready,
      is_active,
      game_state,
      last_seen
    ) VALUES (
      p_game_id,
      v_user_id,
      p_desired_role,
      COALESCE(p_player_name, 'Spieler'),
      COALESCE(p_player_name, 'Spieler'),
      CASE WHEN v_game_status = 'running' THEN 'in_game' ELSE 'lobby' END,
      false,
      true,
      '{}'::jsonb,
      now()
    )
    RETURNING * INTO v_player;
  END IF;

  RETURN v_player;
EXCEPTION
  WHEN unique_violation THEN
    -- This should be caught by our checks above, but handle it just in case
    RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
END;
$$;

-- Function: Mark player as left (soft delete)
CREATE OR REPLACE FUNCTION rpc_mark_player_left(
  p_player_id UUID
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_player_user_id UUID;
  v_game_id UUID;
  v_is_trainer BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'UNAUTHORIZED: Not authenticated';
  END IF;

  -- Get player info
  SELECT user_id, game_id, (role = 'TRAINER') INTO v_player_user_id, v_game_id, v_is_trainer
  FROM players
  WHERE id = p_player_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'PLAYER_NOT_FOUND: Player does not exist';
  END IF;

  -- Check authorization: must be the player themselves, or a trainer/host of the game
  IF v_user_id != v_player_user_id THEN
    IF NOT EXISTS (
      SELECT 1 FROM players
      WHERE game_id = v_game_id
        AND user_id = v_user_id
        AND (role = 'TRAINER' OR is_gm = true)
        AND left_at IS NULL
    ) THEN
      RAISE EXCEPTION 'UNAUTHORIZED: Not authorized to remove this player';
    END IF;
  END IF;

  -- Mark as left
  UPDATE players
  SET
    left_at = now(),
    status = 'left',
    is_active = false
  WHERE id = p_player_id;
END;
$$;

-- Function: Set game status (Host/Trainer only)
CREATE OR REPLACE FUNCTION rpc_set_game_status(
  p_game_id UUID,
  p_new_status TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_is_host BOOLEAN;
  v_is_trainer BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'UNAUTHORIZED: Not authenticated';
  END IF;

  -- Validate status
  IF p_new_status NOT IN ('lobby', 'waiting', 'running', 'ended') THEN
    RAISE EXCEPTION 'INVALID_STATUS: Status must be lobby, waiting, running, or ended';
  END IF;

  -- Check if user is host
  SELECT (host_id = v_user_id) INTO v_is_host
  FROM games
  WHERE id = p_game_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'GAME_NOT_FOUND: Game does not exist';
  END IF;

  -- Check if user is trainer
  SELECT EXISTS (
    SELECT 1 FROM players
    WHERE game_id = p_game_id
      AND user_id = v_user_id
      AND role = 'TRAINER'
      AND left_at IS NULL
  ) INTO v_is_trainer;

  -- Authorization check
  IF NOT v_is_host AND NOT v_is_trainer THEN
    RAISE EXCEPTION 'UNAUTHORIZED: Only host or trainer can change game status';
  END IF;

  -- Update game status
  UPDATE games
  SET
    status = p_new_status,
    state = CASE
      WHEN p_new_status = 'running' THEN 'running'
      WHEN p_new_status = 'ended' THEN 'ended'
      ELSE state
    END
  WHERE id = p_game_id;

  -- If setting to running, update all lobby players to in_game
  IF p_new_status = 'running' THEN
    UPDATE players
    SET status = 'in_game'
    WHERE game_id = p_game_id
      AND status = 'lobby'
      AND left_at IS NULL;
  END IF;
END;
$$;

-- ============================================================================
-- STEP 6: Update existing data
-- ============================================================================

-- Set default status for existing players
UPDATE players
SET status = COALESCE(status, 'lobby')
WHERE status IS NULL;

-- Ensure games have status
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'games' AND column_name = 'status'
  ) THEN
    ALTER TABLE games ADD COLUMN status TEXT DEFAULT 'waiting';
  END IF;
END $$;

UPDATE games
SET status = COALESCE(status, 'waiting')
WHERE status IS NULL;

-- ============================================================================
-- STEP 7: Grant execute permissions on RPC functions
-- ============================================================================

GRANT EXECUTE ON FUNCTION rpc_claim_role_and_join TO authenticated;
GRANT EXECUTE ON FUNCTION rpc_mark_player_left TO authenticated;
GRANT EXECUTE ON FUNCTION rpc_set_game_status TO authenticated;

-- ============================================================================
-- DONE: Migration complete
-- ============================================================================

-- Log migration completion
DO $$
BEGIN
  RAISE NOTICE 'Migration complete: Robust multiplayer role locking enabled';
  RAISE NOTICE '  - Role uniqueness enforced (except TRAINER)';
  RAISE NOTICE '  - User uniqueness enforced per game';
  RAISE NOTICE '  - Player status tracking active';
  RAISE NOTICE '  - RPC functions deployed with error codes';
END $$;
