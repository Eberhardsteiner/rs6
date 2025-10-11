/*
  # Enable Anonymous Authentication
  
  This migration ensures anonymous authentication is properly enabled for the application.
  
  1. Configuration
    - Sets up auth configuration for anonymous users
    - Ensures proper policies are in place for anonymous access
  
  2. Security
    - Anonymous users can create and join games
    - Anonymous users can only access their own data
    - Trainers have special permissions
*/

-- Ensure anonymous users can be created in auth.users
-- This table is managed by Supabase Auth, but we need to ensure policies allow anonymous access

-- Update RLS policies to allow anonymous users to create games
DROP POLICY IF EXISTS "Allow anonymous users to create games" ON games;
CREATE POLICY "Allow anonymous users to create games"
  ON games
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Update RLS policies to allow anonymous users to read games
DROP POLICY IF EXISTS "Allow users to read games they are part of" ON games;
CREATE POLICY "Allow users to read games they are part of"
  ON games
  FOR SELECT
  TO anon, authenticated
  USING (
    id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    -- Trainers can see all games they have access to
    id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

-- Update RLS policies to allow anonymous users to update games they host
DROP POLICY IF EXISTS "Allow hosts to update their games" ON games;
CREATE POLICY "Allow hosts to update their games"
  ON games
  FOR UPDATE
  TO anon, authenticated
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());

-- Update players table policies for anonymous users
DROP POLICY IF EXISTS "Allow users to insert themselves as players" ON players;
CREATE POLICY "Allow users to insert themselves as players"
  ON players
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Allow users to read players in their games" ON players;
CREATE POLICY "Allow users to read players in their games"
  ON players
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    -- Trainers can see all players in games they have access to
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow users to update their own player record" ON players;
CREATE POLICY "Allow users to update their own player record"
  ON players
  FOR UPDATE
  TO anon, authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Allow users to delete their own player record" ON players;
CREATE POLICY "Allow users to delete their own player record"
  ON players
  FOR DELETE
  TO anon, authenticated
  USING (user_id = auth.uid());

-- Update game_admin_settings policies for anonymous users
DROP POLICY IF EXISTS "Allow game hosts to read admin settings" ON game_admin_settings;
CREATE POLICY "Allow game hosts to read admin settings"
  ON game_admin_settings
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT id FROM games WHERE host_id = auth.uid()
    ) OR
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow game hosts to insert admin settings" ON game_admin_settings;
CREATE POLICY "Allow game hosts to insert admin settings"
  ON game_admin_settings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    game_id IN (
      SELECT id FROM games WHERE host_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow game hosts to update admin settings" ON game_admin_settings;
CREATE POLICY "Allow game hosts to update admin settings"
  ON game_admin_settings
  FOR UPDATE
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT id FROM games WHERE host_id = auth.uid()
    )
  )
  WITH CHECK (
    game_id IN (
      SELECT id FROM games WHERE host_id = auth.uid()
    )
  );

-- Update decisions policies for anonymous users
DROP POLICY IF EXISTS "Allow players to insert their own decisions" ON decisions;
CREATE POLICY "Allow players to insert their own decisions"
  ON decisions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    player_id IN (
      SELECT id FROM players WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow players to read decisions in their games" ON decisions;
CREATE POLICY "Allow players to read decisions in their games"
  ON decisions
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

-- Update messages policies for anonymous users
DROP POLICY IF EXISTS "Allow players to insert messages in their games" ON messages;
CREATE POLICY "Allow players to insert messages in their games"
  ON messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow players to read messages in their games" ON messages;
CREATE POLICY "Allow players to read messages in their games"
  ON messages
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

-- Update events policies for anonymous users
DROP POLICY IF EXISTS "Allow reading events from accessible games" ON events;
CREATE POLICY "Allow reading events from accessible games"
  ON events
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow inserting events in accessible games" ON events;
CREATE POLICY "Allow inserting events in accessible games"
  ON events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

-- Update game_state_snapshots policies for anonymous users
DROP POLICY IF EXISTS "Allow reading snapshots from accessible games" ON game_state_snapshots;
CREATE POLICY "Allow reading snapshots from accessible games"
  ON game_state_snapshots
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow inserting snapshots in accessible games" ON game_state_snapshots;
CREATE POLICY "Allow inserting snapshots in accessible games"
  ON game_state_snapshots
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

-- Update game_injected_news policies for anonymous users
DROP POLICY IF EXISTS "Allow reading injected news from accessible games" ON game_injected_news;
CREATE POLICY "Allow reading injected news from accessible games"
  ON game_injected_news
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow inserting injected news in accessible games" ON game_injected_news;
CREATE POLICY "Allow inserting injected news in accessible games"
  ON game_injected_news
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

-- Update game_scenario_overrides policies for anonymous users
DROP POLICY IF EXISTS "Allow reading scenario overrides from accessible games" ON game_scenario_overrides;
CREATE POLICY "Allow reading scenario overrides from accessible games"
  ON game_scenario_overrides
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow inserting scenario overrides in accessible games" ON game_scenario_overrides;
CREATE POLICY "Allow inserting scenario overrides in accessible games"
  ON game_scenario_overrides
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

-- Update credit_history policies for anonymous users
DROP POLICY IF EXISTS "Allow reading credit history from accessible games" ON credit_history;
CREATE POLICY "Allow reading credit history from accessible games"
  ON credit_history
  FOR SELECT
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    ) OR
    game_id IN (
      SELECT game_id FROM trainer_memberships WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Allow inserting credit history in accessible games" ON credit_history;
CREATE POLICY "Allow inserting credit history in accessible games"
  ON credit_history
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    player_id IN (
      SELECT id FROM players WHERE user_id = auth.uid()
    )
  );

-- Trainer memberships policies
DROP POLICY IF EXISTS "Allow trainers to read their memberships" ON trainer_memberships;
CREATE POLICY "Allow trainers to read their memberships"
  ON trainer_memberships
  FOR SELECT
  TO anon, authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Allow game hosts to manage trainer memberships" ON trainer_memberships;
CREATE POLICY "Allow game hosts to manage trainer memberships"
  ON trainer_memberships
  FOR ALL
  TO anon, authenticated
  USING (
    game_id IN (
      SELECT id FROM games WHERE host_id = auth.uid()
    )
  )
  WITH CHECK (
    game_id IN (
      SELECT id FROM games WHERE host_id = auth.uid()
    )
  );