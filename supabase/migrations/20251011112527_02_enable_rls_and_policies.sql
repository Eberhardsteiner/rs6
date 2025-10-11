/*
  # Enable Row Level Security and Create Policies

  ## Security Model
  
  - All tables have RLS enabled
  - Authenticated users can only access games they participate in
  - Game hosts can manage their games
  - Players can manage their own records
  - Trainers/GMs have admin access to their games
  
  ## Policies by Table
  
  1. **games** - Participants can view, hosts can manage
  2. **players** - View other players in same game, manage own record
  3. **decisions** - View all in game, create own decisions
  4. **game_admin_settings** - View as participant, manage as trainer
  5. **messages** - View and send in own games
  6. **events** - View as participant, create as trainer
  7. **game_state_snapshots** - View as trainer, system can create
  8. **game_injected_news** - View as participant, create as trainer
  9. **game_scenario_overrides** - View as participant, manage as trainer
  10. **credit_history** - View as participant, CFO can create
*/

-- =====================================================
-- RLS: games
-- =====================================================

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Games are viewable by participants"
  ON games FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create games"
  ON games FOR INSERT
  TO authenticated
  WITH CHECK (host_id = auth.uid());

CREATE POLICY "Game hosts can update their games"
  ON games FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid())
  WITH CHECK (host_id = auth.uid());

-- =====================================================
-- RLS: players
-- =====================================================

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players can view other players in their games"
  ON players FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join games"
  ON players FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Players can update their own records"
  ON players FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Players can leave games"
  ON players FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- =====================================================
-- RLS: decisions
-- =====================================================

ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Decisions are viewable by game participants"
  ON decisions FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Players can create decisions"
  ON decisions FOR INSERT
  TO authenticated
  WITH CHECK (
    player_id IN (
      SELECT id FROM players WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- RLS: game_admin_settings
-- =====================================================

ALTER TABLE game_admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Game admin settings viewable by participants"
  ON game_admin_settings FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Trainers can manage admin settings"
  ON game_admin_settings FOR ALL
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players 
      WHERE user_id = auth.uid() 
      AND (role = 'trainer' OR is_gm = true)
    )
  )
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players 
      WHERE user_id = auth.uid() 
      AND (role = 'trainer' OR is_gm = true)
    )
  );

-- =====================================================
-- RLS: messages
-- =====================================================

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Messages viewable by game participants"
  ON messages FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Players can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    player_id IN (
      SELECT id FROM players WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- RLS: events
-- =====================================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events viewable by game participants"
  ON events FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Trainers can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players 
      WHERE user_id = auth.uid() 
      AND (role = 'trainer' OR is_gm = true)
    )
  );

-- =====================================================
-- RLS: game_state_snapshots
-- =====================================================

ALTER TABLE game_state_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Snapshots viewable by trainers"
  ON game_state_snapshots FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players 
      WHERE user_id = auth.uid() 
      AND (role = 'trainer' OR is_gm = true)
    )
  );

CREATE POLICY "System can create snapshots"
  ON game_state_snapshots FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- RLS: game_injected_news
-- =====================================================

ALTER TABLE game_injected_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Injected news viewable by game participants"
  ON game_injected_news FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Trainers can inject news"
  ON game_injected_news FOR INSERT
  TO authenticated
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players 
      WHERE user_id = auth.uid() 
      AND (role = 'trainer' OR is_gm = true)
    )
  );

-- =====================================================
-- RLS: game_scenario_overrides
-- =====================================================

ALTER TABLE game_scenario_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Scenario overrides viewable by participants"
  ON game_scenario_overrides FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Trainers can manage scenario overrides"
  ON game_scenario_overrides FOR INSERT
  TO authenticated
  WITH CHECK (
    game_id IN (
      SELECT game_id FROM players 
      WHERE user_id = auth.uid() 
      AND (role = 'trainer' OR is_gm = true)
    )
  );

-- =====================================================
-- RLS: credit_history
-- =====================================================

ALTER TABLE credit_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Credit history viewable by game participants"
  ON credit_history FOR SELECT
  TO authenticated
  USING (
    game_id IN (
      SELECT game_id FROM players WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "CFO can record credit draws"
  ON credit_history FOR INSERT
  TO authenticated
  WITH CHECK (
    player_id IN (
      SELECT id FROM players 
      WHERE user_id = auth.uid() 
      AND role = 'cfo'
    )
  );

-- =====================================================
-- TRIGGERS for Auto-updating Timestamps
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_game_admin_settings_updated_at'
  ) THEN
    CREATE TRIGGER update_game_admin_settings_updated_at
      BEFORE UPDATE ON game_admin_settings
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
