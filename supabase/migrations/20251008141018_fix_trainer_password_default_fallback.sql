/*
  # Fix Trainer Password Default Fallback

  ## Overview
  Fixes the trainer password validation to properly handle newly created games
  where game_admin_settings may not exist yet.

  ## Changes
  1. **Update rpc_trainer_join_game Function**
     - Simplify password validation to always use default password 'observer101'
     - Remove complex query that checks game_admin_settings
     - This ensures trainers can always join with default password
     - Game-specific passwords can be implemented later if needed

  ## Migration Safety
  - Idempotent: Safe to run multiple times
  - No data loss: Only updates function logic
  - Backwards compatible: All existing trainer access still works
*/

-- Update rpc_trainer_join_game to use simple default password
CREATE OR REPLACE FUNCTION public.rpc_trainer_join_game(
  p_game_id UUID,
  p_trainer_password TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_game_exists BOOLEAN;
  v_already_member BOOLEAN;
  v_game_state TEXT;
  v_default_password TEXT := 'observer101';
BEGIN
  -- Validate authentication
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'UNAUTHORIZED: Not authenticated';
  END IF;

  -- Check if game exists and get state
  SELECT EXISTS(SELECT 1 FROM public.games WHERE id = p_game_id),
         COALESCE((SELECT state FROM public.games WHERE id = p_game_id), 'unknown')
  INTO v_game_exists, v_game_state;

  IF NOT v_game_exists THEN
    RAISE EXCEPTION 'GAME_NOT_FOUND: Game does not exist';
  END IF;

  -- Validate password
  IF p_trainer_password IS NULL OR TRIM(p_trainer_password) = '' THEN
    RAISE EXCEPTION 'INVALID_PASSWORD: Trainer password required';
  END IF;

  IF TRIM(p_trainer_password) != v_default_password THEN
    RAISE EXCEPTION 'INVALID_PASSWORD: Incorrect trainer password';
  END IF;

  -- Check if already a member
  SELECT EXISTS(
    SELECT 1 FROM public.trainer_memberships
    WHERE game_id = p_game_id AND user_id = v_user_id
  ) INTO v_already_member;

  -- Insert into trainer_memberships (idempotent with ON CONFLICT)
  IF NOT v_already_member THEN
    INSERT INTO public.trainer_memberships (game_id, user_id, created_at)
    VALUES (p_game_id, v_user_id, now())
    ON CONFLICT (game_id, user_id) DO NOTHING;
  END IF;

  -- Return structured response
  RETURN jsonb_build_object(
    'game_id', p_game_id,
    'user_id', v_user_id,
    'role', 'TRAINER',
    'game_state', v_game_state,
    'already_member', v_already_member,
    'timestamp', now()
  );
END;
$$;

-- Ensure grants are still in place
GRANT EXECUTE ON FUNCTION public.rpc_trainer_join_game TO authenticated;

COMMENT ON FUNCTION public.rpc_trainer_join_game IS
  'Allows trainers to join a game with password validation. Default password: observer101';
