/*
  # Fix alle Timestamp-Trigger

  ## Problem
  Der Trigger tg__set_timestamps versucht created_at und updated_at zu setzen,
  aber nicht alle Tabellen haben beide Spalten!

  ## Tabellen und ihre Spalten
  - events: nur created_at (fehlt updated_at)
  - game_admin_settings: nur updated_at (fehlt created_at)
  - game_injected_news: nur created_at (fehlt updated_at)
  - game_scenario_overrides: created_at + updated_at ✓
  - game_state_snapshots: nur created_at (fehlt updated_at)
  - games: created_at + updated_at ✓
  - trainer_memberships: nur created_at (fehlt updated_at)

  ## Lösung
  Trigger nur auf Tabellen behalten, die BEIDE Spalten haben (games, game_scenario_overrides)
  Alle anderen Trigger entfernen - die Spalten haben bereits DEFAULT now()
*/

-- Entferne Trigger von Tabellen ohne beide Spalten
DROP TRIGGER IF EXISTS tg_events_ts ON events;
DROP TRIGGER IF EXISTS tg_game_admin_settings_ts ON game_admin_settings;
DROP TRIGGER IF EXISTS tg_game_injected_news_ts ON game_injected_news;
DROP TRIGGER IF EXISTS tg_game_state_snapshots_ts ON game_state_snapshots;
DROP TRIGGER IF EXISTS tg_trainer_memberships_ts ON trainer_memberships;

-- Behalte Trigger nur auf Tabellen mit beiden Spalten
-- tg_games_ts - BEHALTEN
-- tg_game_scenario_overrides_ts - BEHALTEN

DO $$
DECLARE
  trigger_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger t
  JOIN pg_class c ON t.tgrelid = c.oid
  JOIN pg_proc p ON t.tgfoid = p.oid
  JOIN pg_namespace n ON c.relnamespace = n.oid
  WHERE n.nspname = 'public' 
    AND t.tgisinternal = false
    AND p.proname = 'tg__set_timestamps';
  
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Timestamp-Trigger korrigiert';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✓ Fehlerhafte Trigger entfernt: 5';
  RAISE NOTICE '✓ Verbleibende tg__set_timestamps Trigger: %', trigger_count;
  RAISE NOTICE '✓ Behalten: games, game_scenario_overrides';
  RAISE NOTICE '========================================';
END $$;
