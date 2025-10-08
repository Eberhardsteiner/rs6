/*
  # Fix rpc_claim_role_and_join - Block TRAINER Role

  ## Issue Fixed
  - rpc_claim_role_and_join was allowing TRAINER role in players table
  - This violates design: TRAINER should ONLY exist in trainer_memberships
  
  ## Changes Applied
  - Add validation to reject TRAINER role with clear error message
  - TRAINER users must use rpc_trainer_join_game instead
  - All other roles (CEO, CFO, OPS, HRLEGAL) continue to work normally
  
  ## Security Notes
  - Prevents data inconsistency (TRAINER in both tables)
  - Enforces separation of concerns (players vs trainers)
  - Clear error message guides users to correct function
*/

CREATE OR REPLACE FUNCTION public.rpc_claim_role_and_join(
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

  -- CRITICAL: Block TRAINER role - trainers use trainer_memberships table
  IF UPPER(p_desired_role) = 'TRAINER' THEN
    RAISE EXCEPTION 'ROLE_NOT_ALLOWED: TRAINER role must use rpc_trainer_join_game function, not this one. Trainers are stored in trainer_memberships table, not players.';
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
      -- Check if desired role is available (not taken by someone else)
      IF EXISTS (
        SELECT 1 FROM players
        WHERE game_id = p_game_id
          AND role = p_desired_role
          AND user_id != v_user_id
          AND left_at IS NULL
      ) THEN
        RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
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
    -- New player, check role availability
    IF EXISTS (
      SELECT 1 FROM players
      WHERE game_id = p_game_id
        AND role = p_desired_role
        AND left_at IS NULL
    ) THEN
      RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
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
    RAISE EXCEPTION 'ROLE_TAKEN: Role % is already taken', p_desired_role;
END;
$$;

COMMENT ON FUNCTION public.rpc_claim_role_and_join IS 
  'Claims a player role (CEO, CFO, OPS, HRLEGAL) and joins game. TRAINER role is blocked - use rpc_trainer_join_game instead.';
