/*
  # Fix game_scenario_overrides Primary Key Issue
  
  ## Problem
  Die Tabelle game_scenario_overrides hat einen PRIMARY KEY auf (game_id), was bedeutet,
  dass nur EINE Zeile pro Spiel existieren kann. Der Code in multiplayerService.ts versucht
  jedoch mehrere Zeilen einzufügen (action='import' und action='append'), was zu Fehlern führt.
  
  ## Lösung
  1. Primary Key entfernen von (game_id)
  2. Neuen zusammengesetzten Primary Key hinzufügen: (game_id, created_at) oder auto-increment ID
  3. Alternative: ID-Spalte als Primary Key hinzufügen
  
  ## Änderungen
  - Entfernt PRIMARY KEY constraint von game_id
  - Fügt id-Spalte als neuen PRIMARY KEY hinzu (UUID mit gen_random_uuid())
  - Erstellt Index auf (game_id, updated_at) für schnelle Abfragen
  - Ermöglicht multiple Zeilen pro game_id
  
  ## Sicherheit
  - RLS bleibt aktiviert
  - Keine Änderung an bestehenden RLS-Policies erforderlich
*/

-- Schritt 1: Primary Key Constraint entfernen (falls vorhanden)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'game_scenario_overrides' 
    AND constraint_type = 'PRIMARY KEY'
  ) THEN
    ALTER TABLE game_scenario_overrides DROP CONSTRAINT game_scenario_overrides_pkey;
  END IF;
END $$;

-- Schritt 2: ID-Spalte hinzufügen (falls nicht vorhanden)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'game_scenario_overrides' AND column_name = 'id'
  ) THEN
    ALTER TABLE game_scenario_overrides ADD COLUMN id UUID DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Schritt 3: created_at Spalte hinzufügen (falls nicht vorhanden)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'game_scenario_overrides' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE game_scenario_overrides ADD COLUMN created_at TIMESTAMPTZ DEFAULT now();
  END IF;
END $$;

-- Schritt 4: created_by Spalte hinzufügen (falls nicht vorhanden)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'game_scenario_overrides' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE game_scenario_overrides ADD COLUMN created_by UUID;
  END IF;
END $$;

-- Schritt 5: Für alle bestehenden Zeilen ohne ID: ID generieren
UPDATE game_scenario_overrides 
SET id = gen_random_uuid() 
WHERE id IS NULL;

-- Schritt 6: Für alle bestehenden Zeilen ohne created_at: Zeitstempel setzen
UPDATE game_scenario_overrides 
SET created_at = COALESCE(created_at, updated_at, now()) 
WHERE created_at IS NULL;

-- Schritt 7: ID als NOT NULL setzen
ALTER TABLE game_scenario_overrides ALTER COLUMN id SET NOT NULL;

-- Schritt 8: Neuen Primary Key auf ID setzen
ALTER TABLE game_scenario_overrides ADD PRIMARY KEY (id);

-- Schritt 9: Index auf (game_id, created_at) für effiziente Abfragen in chronologischer Reihenfolge
CREATE INDEX IF NOT EXISTS idx_game_scenario_overrides_game_created 
  ON game_scenario_overrides(game_id, created_at);

-- Schritt 10: Index auf (game_id, action) für schnelle Filterung nach Action-Typ
CREATE INDEX IF NOT EXISTS idx_game_scenario_overrides_game_action 
  ON game_scenario_overrides(game_id, action);

-- Schritt 11: action-Spalte CHECK Constraint hinzufügen (falls nicht vorhanden)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'game_scenario_overrides_action_check'
  ) THEN
    ALTER TABLE game_scenario_overrides 
    ADD CONSTRAINT game_scenario_overrides_action_check 
    CHECK (action IN ('import', 'append'));
  END IF;
END $$;
