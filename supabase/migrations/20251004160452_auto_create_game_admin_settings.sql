/*
  # Auto-create game_admin_settings on game creation

  ## Problem
  When a new game is created, game_admin_settings row is not automatically created.
  This causes NULL reference errors when code tries to read/update settings.

  ## Solution
  Add a database trigger that automatically creates a game_admin_settings row
  whenever a new game is inserted, with sensible defaults.

  ## Benefits
  - Prevents NULL reference errors
  - Ensures every game has settings
  - Reduces application code complexity
  - Guarantees data consistency

  ## Changes
  1. Creates trigger function to insert default settings
  2. Attaches trigger to games table AFTER INSERT
  3. Uses default values for all required fields
*/

-- Function to auto-create game_admin_settings
CREATE OR REPLACE FUNCTION auto_create_game_admin_settings()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert default game_admin_settings for new game
  INSERT INTO game_admin_settings (
    game_id,
    settings,
    invariants,
    seed,
    pending_draw_eur,
    effective_day,
    version,
    updated_by,
    auth_mode,
    features,
    preset_credentials
  ) VALUES (
    NEW.id,
    jsonb_build_object(
      'difficulty', 'medium',
      'gameMode', 'standard',
      'enableRandomNews', true,
      'enableAdaptiveDifficulty', false
    ),
    '{}'::jsonb,
    floor(random() * 2147483647)::bigint,
    0,
    1,
    0,
    NEW.created_by,
    'name-only',
    '{}'::jsonb,
    '{}'::jsonb
  )
  ON CONFLICT (game_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists (idempotent)
DROP TRIGGER IF EXISTS trigger_auto_create_game_admin_settings ON games;

-- Create trigger on games table
CREATE TRIGGER trigger_auto_create_game_admin_settings
  AFTER INSERT ON games
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_game_admin_settings();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION auto_create_game_admin_settings() TO authenticated;
GRANT EXECUTE ON FUNCTION auto_create_game_admin_settings() TO anon;
