-- Migration already exists as file, applying via MCP
-- See: supabase/migrations/20251006140202_robust_multiplayer_role_locking.sql

-- STEP 1: Add missing columns to players table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'status'
  ) THEN
    ALTER TABLE players ADD COLUMN status TEXT DEFAULT 'lobby';
  END IF;

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

-- STEP 2: Create unique indexes
DROP INDEX IF EXISTS idx_players_game_role_unique;

CREATE UNIQUE INDEX IF NOT EXISTS players_unique_role_per_game
  ON players (game_id, role)
  WHERE role IS NOT NULL
    AND role != 'TRAINER'
    AND left_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS players_unique_user_in_game
  ON players (game_id, user_id)
  WHERE left_at IS NULL;

-- STEP 3: Update trigger
CREATE OR REPLACE FUNCTION update_player_last_seen()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_seen := now();
  IF (NEW.display_name IS NULL OR NEW.display_name = '') AND
     NEW.name IS NOT NULL AND NEW.name != '' THEN
    NEW.display_name := NEW.name;
  END IF;
  IF NEW.display_name IS NULL OR NEW.display_name = '' THEN
    NEW.display_name := 'Spieler';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_player_display_name ON players;
DROP TRIGGER IF EXISTS trigger_update_player_last_seen ON players;

CREATE TRIGGER trigger_update_player_last_seen
  BEFORE INSERT OR UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_player_last_seen();

-- STEP 4: Performance indexes
CREATE INDEX IF NOT EXISTS idx_players_status ON players(status) WHERE status != 'left';
CREATE INDEX IF NOT EXISTS idx_players_left_at ON players(left_at) WHERE left_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_players_game_status ON players(game_id, status);

-- STEP 5: RPC Functions
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
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'UNAUTHORIZED: Not authenticated';
  END IF;

  SELECT status INTO v_game_status FROM games WHERE id = p_game_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'GAME_NOT_FOUND: Game does not exist';
  END IF;
  IF v_game_status = 'ended' THEN
    RAISE EXCEPTION 'GAME_ENDED: Game has already ended';
  END IF;

  SELECT * INTO v_player FROM players
  WHERE game_id = p_game_id AND user_id = v_user_id AND left_at IS NULL;

  IF FOUND THEN
    v_current_role := v_player.role;
    IF v_current_role != p_desired_role THEN
      IF p_desired_role != 'TRAINER' THEN
        IF EXISTS (SELECT 1 FROM players WHERE game_id = p_game_id AND role = p_desired_role AND user_id != v_user_id AND left_at IS NULL) THEN
          RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
        END IF;
      END IF;
      UPDATE players SET
        role = p_desired_role,
        status = CASE WHEN v_game_status = 'running' THEN 'in_game' ELSE 'lobby' END,
        display_name = COALESCE(p_player_name, display_name, name, 'Spieler'),
        last_seen = now(),
        is_active = true
      WHERE id = v_player.id RETURNING * INTO v_player;
    ELSE
      UPDATE players SET
        status = CASE WHEN v_game_status = 'running' THEN 'in_game' ELSE 'lobby' END,
        last_seen = now(),
        is_active = true
      WHERE id = v_player.id RETURNING * INTO v_player;
    END IF;
  ELSE
    IF p_desired_role != 'TRAINER' THEN
      IF EXISTS (SELECT 1 FROM players WHERE game_id = p_game_id AND role = p_desired_role AND left_at IS NULL) THEN
        RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
      END IF;
    END IF;
    INSERT INTO players (game_id, user_id, role, name, display_name, status, is_ready, is_active, game_state, last_seen)
    VALUES (p_game_id, v_user_id, p_desired_role, COALESCE(p_player_name, 'Spieler'), COALESCE(p_player_name, 'Spieler'),
            CASE WHEN v_game_status = 'running' THEN 'in_game' ELSE 'lobby' END, false, true, '{}'::jsonb, now())
    RETURNING * INTO v_player;
  END IF;
  RETURN v_player;
EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
END;
$$;

CREATE OR REPLACE FUNCTION rpc_mark_player_left(p_player_id UUID)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_user_id UUID;
  v_player_user_id UUID;
  v_game_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'UNAUTHORIZED: Not authenticated'; END IF;
  SELECT user_id, game_id INTO v_player_user_id, v_game_id FROM players WHERE id = p_player_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'PLAYER_NOT_FOUND: Player does not exist'; END IF;
  IF v_user_id != v_player_user_id THEN
    IF NOT EXISTS (SELECT 1 FROM players WHERE game_id = v_game_id AND user_id = v_user_id AND (role = 'TRAINER' OR is_gm = true) AND left_at IS NULL) THEN
      RAISE EXCEPTION 'UNAUTHORIZED: Not authorized to remove this player';
    END IF;
  END IF;
  UPDATE players SET left_at = now(), status = 'left', is_active = false WHERE id = p_player_id;
END;
$$;

CREATE OR REPLACE FUNCTION rpc_set_game_status(p_game_id UUID, p_new_status TEXT)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_user_id UUID;
  v_is_host BOOLEAN;
  v_is_trainer BOOLEAN;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'UNAUTHORIZED: Not authenticated'; END IF;
  IF p_new_status NOT IN ('lobby', 'waiting', 'running', 'ended') THEN
    RAISE EXCEPTION 'INVALID_STATUS: Status must be lobby, waiting, running, or ended';
  END IF;
  SELECT (host_id = v_user_id) INTO v_is_host FROM games WHERE id = p_game_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'GAME_NOT_FOUND: Game does not exist'; END IF;
  SELECT EXISTS (SELECT 1 FROM players WHERE game_id = p_game_id AND user_id = v_user_id AND role = 'TRAINER' AND left_at IS NULL) INTO v_is_trainer;
  IF NOT v_is_host AND NOT v_is_trainer THEN RAISE EXCEPTION 'UNAUTHORIZED: Only host or trainer can change game status'; END IF;
  UPDATE games SET status = p_new_status, state = CASE WHEN p_new_status = 'running' THEN 'running' WHEN p_new_status = 'ended' THEN 'ended' ELSE state END WHERE id = p_game_id;
  IF p_new_status = 'running' THEN
    UPDATE players SET status = 'in_game' WHERE game_id = p_game_id AND status = 'lobby' AND left_at IS NULL;
  END IF;
END;
$$;

-- STEP 6: Update existing data
UPDATE players SET status = COALESCE(status, 'lobby') WHERE status IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'games' AND column_name = 'status') THEN
    ALTER TABLE games ADD COLUMN status TEXT DEFAULT 'waiting';
  END IF;
END $$;

UPDATE games SET status = COALESCE(status, 'waiting') WHERE status IS NULL;

-- STEP 7: Grant permissions
GRANT EXECUTE ON FUNCTION rpc_claim_role_and_join TO authenticated;
GRANT EXECUTE ON FUNCTION rpc_mark_player_left TO authenticated;
GRANT EXECUTE ON FUNCTION rpc_set_game_status TO authenticated;