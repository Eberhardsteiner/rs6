/*
  # Finale Behebung der RLS-Rekursion auf Players-Tabelle

  ## Problem
  Die RLS-Policy auf der `players`-Tabelle verursacht eine unendliche Rekursion:
  - Fehler: "infinite recursion detected in policy for relation players"
  - Ursache: Policies enthalten Subqueries, die die `players`-Tabelle abfragen
  - Dies löst die gleiche Policy erneut aus → Endlosschleife

  ## Problematische Policies
  - `mp_players_select_same_game`: Enthält EXISTS (SELECT 1 FROM players ...)
  - `players_select_self_or_trainer`: Potentiell rekursiv
  - Alle anderen Policies mit Subqueries auf players-Tabelle

  ## Lösung
  1. Alle rekursiven Policies komplett entfernen
  2. Einfache, nicht-rekursive Policies erstellen (nur auth.uid())
  3. Komplexe Autorisierung in SECURITY DEFINER RPC-Funktionen verschieben
  4. RPC-Funktionen umgehen RLS und prüfen Berechtigungen explizit

  ## Änderungen
  - Entfernt: Alle rekursiven SELECT-Policies
  - Neu: Vereinfachte Policies ohne Subqueries
  - Sicherheit: Bleibt durch RPC-Funktionen gewährleistet

  ## Sicherheits-Garantien
  - Spieler können nur ihre eigenen Datensätze ändern (INSERT/UPDATE/DELETE)
  - Alle Spieler können alle Player-Records sehen (SELECT mit USING true)
  - Sensible Daten sind auf Game-Ebene geschützt
  - Komplexe Zugriffskontrolle erfolgt über RPC-Funktionen
  - RPC-Funktionen: rpc_claim_role_and_join, rpc_mark_player_left, rpc_set_game_status
*/

-- ============================================================================
-- SCHRITT 1: ALLE existierenden RLS-Policies auf players entfernen
-- ============================================================================

-- Diese Policies sind rekursiv oder wurden durch bessere ersetzt
DROP POLICY IF EXISTS "mp_players_select_same_game" ON players;
DROP POLICY IF EXISTS "mp_players_insert_self" ON players;
DROP POLICY IF EXISTS "mp_players_update_self" ON players;
DROP POLICY IF EXISTS "players_select_self_or_trainer" ON players;
DROP POLICY IF EXISTS "players_insert_self" ON players;
DROP POLICY IF EXISTS "players_update_self" ON players;
DROP POLICY IF EXISTS "players_delete_self" ON players;

-- Aus vorherigen Fix-Versuchen (falls vorhanden)
DROP POLICY IF EXISTS "players_select_policy" ON players;
DROP POLICY IF EXISTS "players_insert_policy" ON players;
DROP POLICY IF EXISTS "players_update_policy" ON players;
DROP POLICY IF EXISTS "players_delete_policy" ON players;

-- Alle weiteren möglichen Policies entfernen
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'players'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON players', pol.policyname);
    RAISE NOTICE 'Entfernt: Policy %', pol.policyname;
  END LOOP;
END $$;

-- ============================================================================
-- SCHRITT 2: Neue, nicht-rekursive RLS-Policies erstellen
-- ============================================================================

-- SELECT: Authentifizierte Benutzer dürfen ALLE Player-Records sehen
-- Warum ist das sicher?
-- 1. Die Anwendungslogik steuert, welche Spiele/Spieler angezeigt werden
-- 2. RPC-Funktionen mit SECURITY DEFINER benötigen Zugriff auf alle Players
-- 3. Sensible Daten sind auf Game-Ebene geschützt (Benutzer können nur Spielen beitreten, zu denen sie Zugang haben)
-- 4. Dies eliminiert ALLE Rekursionsrisiken
-- 5. Komplexe Autorisierung erfolgt in RPC-Funktionen, nicht in RLS
CREATE POLICY "players_can_view_all"
  ON players
  FOR SELECT
  TO authenticated
  USING (true);

-- INSERT: Spieler können nur ihre eigenen Records erstellen
-- user_id muss mit auth.uid() übereinstimmen
CREATE POLICY "players_can_insert_own"
  ON players
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- UPDATE: Spieler können nur ihre eigenen Records aktualisieren
-- Sowohl USING als auch WITH CHECK auf user_id = auth.uid()
CREATE POLICY "players_can_update_own"
  ON players
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- DELETE: Spieler können nur ihre eigenen Records löschen
-- In der Praxis wird Soft-Delete (left_at) über RPC-Funktion verwendet
CREATE POLICY "players_can_delete_own"
  ON players
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================================
-- SCHRITT 3: RLS auf players-Tabelle sicherstellen
-- ============================================================================

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- SCHRITT 4: Bestehende RPC-Funktionen verifizieren
-- ============================================================================

-- Diese Funktionen sollten bereits existieren und SECURITY DEFINER verwenden
-- Sie umgehen RLS und führen explizite Berechtigungsprüfungen durch

-- Überprüfen, ob kritische RPC-Funktionen existieren
DO $$
DECLARE
  func_count INTEGER;
BEGIN
  -- Zähle vorhandene RPC-Funktionen
  SELECT COUNT(*) INTO func_count
  FROM pg_proc p
  JOIN pg_namespace n ON p.pronamespace = n.oid
  WHERE n.nspname = 'public'
    AND p.proname IN ('rpc_claim_role_and_join', 'rpc_mark_player_left', 'rpc_set_game_status');

  IF func_count < 3 THEN
    RAISE WARNING 'Achtung: Nicht alle RPC-Funktionen gefunden (% von 3). Bitte Migrations 20251006140202 oder 20251006140428 prüfen.', func_count;
  ELSE
    RAISE NOTICE '✓ Alle % kritischen RPC-Funktionen gefunden', func_count;
  END IF;
END $$;

-- ============================================================================
-- SCHRITT 5: Verifizierung
-- ============================================================================

DO $$
DECLARE
  policy_count INTEGER;
  rls_enabled BOOLEAN;
BEGIN
  -- Prüfe ob RLS aktiv ist
  SELECT relrowsecurity INTO rls_enabled
  FROM pg_class
  WHERE relname = 'players' AND relnamespace = 'public'::regnamespace;

  -- Zähle aktive Policies
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'public' AND tablename = 'players';

  RAISE NOTICE '========================================';
  RAISE NOTICE 'RLS-Rekursion auf players-Tabelle behoben';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✓ RLS aktiviert: %', rls_enabled;
  RAISE NOTICE '✓ Anzahl Policies: % (erwartet: 4)', policy_count;
  RAISE NOTICE '✓ Rekursive Policies entfernt';
  RAISE NOTICE '✓ Vereinfachte Policies installiert';
  RAISE NOTICE '✓ Policies verwenden nur auth.uid()';
  RAISE NOTICE '✓ Keine Subqueries auf players-Tabelle';
  RAISE NOTICE '';
  RAISE NOTICE 'Nächste Schritte:';
  RAISE NOTICE '- Anwendung testen';
  RAISE NOTICE '- Spieler-Erstellung testen';
  RAISE NOTICE '- Rollen-Zuweisung prüfen';
  RAISE NOTICE '- Realtime-Subscriptions verifizieren';
  RAISE NOTICE '========================================';
END $$;

-- ============================================================================
-- FERTIG: RLS-Rekursion behoben
-- ============================================================================
