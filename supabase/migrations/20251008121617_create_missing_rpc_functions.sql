/*
  # Create Missing RPC Functions

  ## New Functions
  1. **resolve_join_code**: Resolves session_code or join_code to game_id
     - Used by MultiAuthLogin.tsx to find games by code
     - Supports both session_code (TEXT) and join_code (UUID) formats
  
  2. **rpc_trainer_join_game**: Dedicated function for trainers to join games
     - Inserts into trainer_memberships table (NOT players table)
     - Validates game existence
     - Returns structured JSONB response
     - Idempotent (safe to call multiple times)
  
  ## Security
  - Both functions use SECURITY DEFINER to bypass RLS during lookup
  - resolve_join_code granted to authenticated and anon (lobby join)
  - rpc_trainer_join_game granted to authenticated only
  - Auth validation via auth.uid() in functions
*/

-- 1. Create resolve_join_code function
CREATE OR REPLACE FUNCTION public.resolve_join_code(p_join_code TEXT)
RETURNS TABLE(game_id UUID) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Return game_id from session_code (TEXT) or join_code (UUID)
  RETURN QUERY
  SELECT g.id 
  FROM public.games g
  WHERE UPPER(g.session_code) = UPPER(p_join_code)
     OR g.join_code::text = p_join_code
  LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.resolve_join_code(TEXT) TO authenticated, anon;

COMMENT ON FUNCTION public.resolve_join_code IS 
  'Resolves a session_code or join_code to a game_id. Used for lobby join flow.';

-- 2. Create rpc_trainer_join_game function
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

  -- Optional: Password validation (can be implemented later)
  -- IF p_trainer_password IS NOT NULL THEN
  --   PERFORM validate_trainer_password(p_game_id, p_trainer_password);
  -- END IF;

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

GRANT EXECUTE ON FUNCTION public.rpc_trainer_join_game TO authenticated;

COMMENT ON FUNCTION public.rpc_trainer_join_game IS 
  'Allows trainers to join a game via trainer_memberships table. Does NOT create player record.';
