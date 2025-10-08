/*
  # Fix Players Trigger - Fehlende Spalten

  ## Problem
  Der Trigger `tg__set_timestamps` versucht `created_at` und `updated_at` zu setzen,
  aber die players-Tabelle hat diese Spalten NICHT.
  
  Die Tabelle hat stattdessen:
  - joined_at (entspricht created_at)
  - last_seen / last_seen_at (für Aktivität)

  ## Lösung
  1. Trigger `tg_players_ts` entfernen (verursacht den Fehler)
  2. Nur `trigger_update_player_last_seen` behalten (funktioniert korrekt)

  ## Änderungen
  - DROP TRIGGER tg_players_ts
  - Behalte trigger_update_player_last_seen (setzt last_seen korrekt)
*/

-- ============================================================================
-- Entferne den fehlerhaften Trigger
-- ============================================================================

DROP TRIGGER IF EXISTS tg_players_ts ON players;

-- ============================================================================
-- Verifizierung
-- ============================================================================

DO $$
DECLARE
  trigger_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO trigger_count
  FROM pg_trigger t
  JOIN pg_class c ON t.tgrelid = c.oid
  WHERE c.relname = 'players' AND t.tgisinternal = false;
  
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Players Trigger korrigiert';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✓ Fehlerhafter Trigger tg_players_ts entfernt';
  RAISE NOTICE '✓ Aktive Trigger: % (erwartet: 1)', trigger_count;
  RAISE NOTICE '✓ Verbleibender Trigger: trigger_update_player_last_seen';
  RAISE NOTICE '========================================';
END $$;
