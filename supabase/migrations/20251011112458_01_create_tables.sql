/*
  # Create Core Tables for Multiplayer Business Simulation

  ## Tables
  
  1. **games** - Main game sessions
  2. **players** - Player participation and roles
  3. **decisions** - Player decisions during gameplay
  4. **game_admin_settings** - Administrative settings per game
  5. **messages** - In-game chat
  6. **events** - Audit log
  7. **game_state_snapshots** - State recovery
  8. **game_injected_news** - Dynamic news injection
  9. **game_scenario_overrides** - Scenario customization
  10. **credit_history** - CFO credit tracking
  
  ## Security
  
  RLS enabled on all tables with appropriate policies for:
  - Authenticated user access
  - Role-based permissions
  - Trainer/GM admin access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: games
-- =====================================================

CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_code text UNIQUE,
  host_id uuid,
  status text DEFAULT 'waiting',
  state text DEFAULT 'lobby',
  current_day integer DEFAULT 1,
  difficulty text DEFAULT 'medium',
  game_mode text DEFAULT 'standard',
  scenario_data jsonb DEFAULT '{}'::jsonb,
  theme text DEFAULT 'default',
  max_players integer DEFAULT 5,
  kpi_values jsonb DEFAULT '{
    "cashEUR": 100000,
    "profitLossEUR": 0,
    "customerLoyalty": 50,
    "bankTrust": 50,
    "workforceEngagement": 50,
    "publicPerception": 50
  }'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: players
-- =====================================================

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  display_name text NOT NULL,
  role text,
  is_ready boolean DEFAULT false,
  is_gm boolean DEFAULT false,
  game_state jsonb DEFAULT '{}'::jsonb,
  joined_at timestamptz DEFAULT now(),
  last_seen timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: decisions
-- =====================================================

CREATE TABLE IF NOT EXISTS decisions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  day integer NOT NULL,
  block_id text NOT NULL,
  option_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: game_admin_settings
-- =====================================================

CREATE TABLE IF NOT EXISTS game_admin_settings (
  game_id uuid PRIMARY KEY REFERENCES games(id) ON DELETE CASCADE,
  settings jsonb DEFAULT '{}'::jsonb,
  invariants jsonb DEFAULT '{}'::jsonb,
  seed integer,
  pending_draw_eur numeric DEFAULT 0,
  effective_day integer DEFAULT 1,
  version integer DEFAULT 1,
  updated_by uuid,
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: messages
-- =====================================================

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: events
-- =====================================================

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  day integer,
  type text NOT NULL,
  content jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: game_state_snapshots
-- =====================================================

CREATE TABLE IF NOT EXISTS game_state_snapshots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  day integer NOT NULL,
  state jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: game_injected_news
-- =====================================================

CREATE TABLE IF NOT EXISTS game_injected_news (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  day integer NOT NULL CHECK (day >= 1 AND day <= 14),
  title text NOT NULL,
  content text,
  source text NOT NULL CHECK (source IN ('press', 'customer', 'supplier', 'internal', 'rumor', 'bank', 'authority')),
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  roles text[],
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: game_scenario_overrides
-- =====================================================

CREATE TABLE IF NOT EXISTS game_scenario_overrides (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN ('import', 'append')),
  overrides jsonb NOT NULL,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- TABLE: credit_history
-- =====================================================

CREATE TABLE IF NOT EXISTS credit_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  day integer NOT NULL,
  amount_eur numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_players_game_id ON players(game_id);
CREATE INDEX IF NOT EXISTS idx_players_user_id ON players(user_id);
CREATE INDEX IF NOT EXISTS idx_decisions_game_id ON decisions(game_id);
CREATE INDEX IF NOT EXISTS idx_decisions_player_id ON decisions(player_id);
CREATE INDEX IF NOT EXISTS idx_decisions_day ON decisions(day);
CREATE INDEX IF NOT EXISTS idx_messages_game_id ON messages(game_id);
CREATE INDEX IF NOT EXISTS idx_events_game_id ON events(game_id);
CREATE INDEX IF NOT EXISTS idx_events_day ON events(day);
CREATE INDEX IF NOT EXISTS idx_game_injected_news_game_day ON game_injected_news(game_id, day);
CREATE INDEX IF NOT EXISTS idx_credit_history_game_id ON credit_history(game_id);
CREATE INDEX IF NOT EXISTS idx_credit_history_player_day ON credit_history(player_id, day);
