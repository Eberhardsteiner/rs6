/*
  # Fehlende Spalten zur Players-Tabelle hinzufügen
  
  ## Problem
  Der Code versucht, folgende Spalten zu verwenden, die NICHT existieren:
  - last_seen (Zeitstempel der letzten Aktivität)
  - display_name (Anzeigename des Spielers)
  - game_state (Spielstatus als JSONB)
  - is_ready (Bereitschaftsstatus Boolean)
  
  Dies führt zu "Could not find column in schema cache" Fehlern.
  
  ## Lösung
  Alle fehlenden Spalten zur players-Tabelle hinzufügen.
  
  ## Änderungen
  1. Fügt 4 fehlende Spalten hinzu
  2. Setzt sinnvolle Standardwerte
  3. Aktualisiert bestehende Zeilen mit Defaults
  4. Erstellt Indexes für häufig abgefragte Spalten
*/

-- Fehlende Spalten zur players-Tabelle hinzufügen
DO $$
BEGIN
  -- last_seen: Zeitstempel der letzten Spieleraktivität
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' AND column_name = 'last_seen'
  ) THEN
    ALTER TABLE players ADD COLUMN last_seen TIMESTAMPTZ DEFAULT now();
  END IF;
  
  -- display_name: Anzeigename des Spielers
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' AND column_name = 'display_name'
  ) THEN
    ALTER TABLE players ADD COLUMN display_name TEXT NOT NULL DEFAULT '';
  END IF;
  
  -- game_state: Spielstatus-Daten als JSONB
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' AND column_name = 'game_state'
  ) THEN
    ALTER TABLE players ADD COLUMN game_state JSONB DEFAULT '{}'::jsonb;
  END IF;
  
  -- is_ready: Bereitschaftsstatus des Spielers
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' AND column_name = 'is_ready'
  ) THEN
    ALTER TABLE players ADD COLUMN is_ready BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Bestehende Zeilen mit Standardwerten aktualisieren
UPDATE players 
SET 
  last_seen = COALESCE(last_seen, now()),
  display_name = COALESCE(display_name, name, 'Spieler'),
  game_state = COALESCE(game_state, '{}'::jsonb),
  is_ready = COALESCE(is_ready, false)
WHERE 
  last_seen IS NULL 
  OR display_name IS NULL 
  OR display_name = ''
  OR game_state IS NULL 
  OR is_ready IS NULL;

-- Trigger: display_name automatisch aus name kopieren wenn leer
CREATE OR REPLACE FUNCTION sync_player_display_name()
RETURNS TRIGGER AS $$
BEGIN
  -- Wenn display_name leer ist aber name gesetzt, kopiere name zu display_name
  IF (NEW.display_name IS NULL OR NEW.display_name = '') AND NEW.name IS NOT NULL AND NEW.name != '' THEN
    NEW.display_name := NEW.name;
  END IF;
  
  -- Wenn display_name immer noch leer, setze Fallback
  IF NEW.display_name IS NULL OR NEW.display_name = '' THEN
    NEW.display_name := 'Spieler';
  END IF;
  
  -- last_seen bei jedem Update aktualisieren
  NEW.last_seen := now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger löschen falls vorhanden (idempotent)
DROP TRIGGER IF EXISTS trigger_sync_player_display_name ON players;

-- Trigger erstellen
CREATE TRIGGER trigger_sync_player_display_name
  BEFORE INSERT OR UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION sync_player_display_name();

-- Indexes für häufig abgefragte Spalten erstellen
CREATE INDEX IF NOT EXISTS idx_players_last_seen ON players(last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_players_is_ready ON players(is_ready) WHERE is_ready = true;
CREATE INDEX IF NOT EXISTS idx_players_display_name ON players(display_name);

-- NOT NULL Constraint für display_name (nach dem Update)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'players' 
    AND column_name = 'display_name'
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE players ALTER COLUMN display_name SET NOT NULL;
  END IF;
END $$;
