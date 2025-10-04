/*
  # Add Performance Indexes for Multiplayer Tables

  ## Problem
  Frequently queried columns lack indexes, causing slow queries on larger datasets.
  Common query patterns filter by game_id, day, state, role combinations.

  ## Solution
  Add strategic indexes for:
  - Filtering games by state (lobby/running/ended)
  - Looking up players by game and role
  - Querying decisions by game and day
  - Fetching events by game and day
  - Retrieving messages chronologically per game
  - Foreign key lookups that aren't auto-indexed

  ## Performance Impact
  - Reduces query time from O(n) table scans to O(log n) index lookups
  - Particularly important for:
    - Game lobby listings (state filter)
    - Player role lookups (game_id + role)
    - Daily decision queries (game_id + day)
    - Chat message pagination (game_id + created_at)

  ## Changes
  Creates 7 new indexes on frequently queried columns and combinations.
  All use IF NOT EXISTS for idempotency.
*/

-- Games table indexes
-- Filter games by state (lobby, running, ended)
CREATE INDEX IF NOT EXISTS idx_games_state 
  ON games(state);

-- Look up games by creator (for "my games" queries)
CREATE INDEX IF NOT EXISTS idx_games_created_by 
  ON games(created_by);

-- Look up games by join code (for joining games)
CREATE INDEX IF NOT EXISTS idx_games_join_code 
  ON games(join_code);

-- Players table indexes
-- Find players by game and role (very common query)
CREATE INDEX IF NOT EXISTS idx_players_game_role 
  ON players(game_id, role) 
  WHERE role IS NOT NULL;

-- Look up players by user across all games
CREATE INDEX IF NOT EXISTS idx_players_user_id 
  ON players(user_id);

-- Decisions table indexes
-- Query decisions by game and day (daily summaries)
CREATE INDEX IF NOT EXISTS idx_decisions_game_day 
  ON decisions(game_id, day);

-- Query decisions by player and day (player history)
CREATE INDEX IF NOT EXISTS idx_decisions_player_day 
  ON decisions(player_id, day);

-- Look up specific decision blocks
CREATE INDEX IF NOT EXISTS idx_decisions_game_block 
  ON decisions(game_id, block_id);

-- Events table indexes
-- Query events by game and day (daily events)
CREATE INDEX IF NOT EXISTS idx_events_game_day 
  ON events(game_id, day) 
  WHERE day IS NOT NULL;

-- Query events by type (news, random_event, etc.)
CREATE INDEX IF NOT EXISTS idx_events_game_type 
  ON events(game_id, type);

-- Messages table indexes
-- Paginate chat messages chronologically
CREATE INDEX IF NOT EXISTS idx_messages_game_created 
  ON messages(game_id, created_at DESC);

-- Query messages by sender
CREATE INDEX IF NOT EXISTS idx_messages_game_sender 
  ON messages(game_id, sender_uid) 
  WHERE sender_uid IS NOT NULL;

-- Game admin settings lookup
CREATE INDEX IF NOT EXISTS idx_game_admin_settings_game 
  ON game_admin_settings(game_id);

-- Trainer memberships lookup
CREATE INDEX IF NOT EXISTS idx_trainer_memberships_user 
  ON trainer_memberships(user_id);

CREATE INDEX IF NOT EXISTS idx_trainer_memberships_game 
  ON trainer_memberships(game_id);

-- Game state snapshots lookup
CREATE INDEX IF NOT EXISTS idx_snapshots_game_day 
  ON game_state_snapshots(game_id, day);
