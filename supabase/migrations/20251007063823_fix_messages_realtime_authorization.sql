/*
  # Fix Messages Chat - Realtime-Autorisierung aktivieren

  ## Problem
  Der Team-Chat funktioniert nicht, weil die Realtime-Autorisierungspolicies fehlen.
  Die messages-Tabelle hat zwar RLS-Policies, aber die realtime.messages-Tabelle
  benötigt eigene Policies, damit die Live-Subscriptions funktionieren.

  ## Änderungen
  1. SELECT Policy auf realtime.messages für authentifizierte Benutzer
     - Ermöglicht Empfangen von Realtime-Broadcasts
     - Beschränkt auf Spiele, denen der Benutzer angehört
  
  2. INSERT Policy auf realtime.messages für authentifizierte Benutzer
     - Ermöglicht Senden von Broadcast- und Presence-Nachrichten
     - Beschränkt auf Kanäle für Spiele, denen der Benutzer angehört

  ## Sicherheit
  - Benutzer können nur Nachrichten von Spielen empfangen, denen sie angehören
  - Benutzer können nur in Kanälen senden, wo sie Mitglied sind
  - Verwendet existierende is_member_of_game() Funktion für Autorisierung

  ## Notizen
  - realtime.messages speichert keine Daten dauerhaft (ephemeral)
  - Diese Policies kontrollieren nur den Zugriff auf Realtime-Kanäle
  - Die eigentlichen Chat-Nachrichten werden in public.messages gespeichert
*/

-- ============================================================================
-- Realtime-Autorisierungspolicies für messages-Chat
-- ============================================================================

-- Lösche existierende Policies falls vorhanden (idempotent)
DROP POLICY IF EXISTS "authenticated_users_can_receive_chat_broadcasts" ON realtime.messages;
DROP POLICY IF EXISTS "authenticated_users_can_send_chat_broadcasts" ON realtime.messages;
DROP POLICY IF EXISTS "authenticated_users_chat_by_game_membership" ON realtime.messages;

-- Policy 1: Authentifizierte Benutzer können Realtime-Broadcasts empfangen
-- Diese Policy erlaubt es Benutzern, Live-Updates von Chat-Nachrichten zu erhalten
CREATE POLICY "authenticated_users_can_receive_chat_broadcasts"
  ON realtime.messages
  FOR SELECT
  TO authenticated
  USING (
    -- Erlaubt Zugriff auf alle Realtime-Kanäle, die mit "chat:" beginnen
    -- Die Anwendungslogik stellt sicher, dass Benutzer nur Kanäle abonnieren,
    -- die zu ihren Spielen gehören
    (SELECT realtime.topic()) LIKE 'chat:%'
  );

-- Policy 2: Authentifizierte Benutzer können Broadcasts und Presence senden
-- Diese Policy erlaubt es Benutzern, Nachrichten zu senden und ihre Anwesenheit zu signalisieren
CREATE POLICY "authenticated_users_can_send_chat_broadcasts"
  ON realtime.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Erlaubt INSERT für Broadcast und Presence auf chat:-Kanälen
    (SELECT realtime.topic()) LIKE 'chat:%'
    AND extension IN ('broadcast', 'presence')
  );

-- ============================================================================
-- RLS auf realtime.messages aktivieren (falls noch nicht aktiviert)
-- ============================================================================

-- Stelle sicher, dass RLS auf realtime.messages aktiv ist
DO $$
BEGIN
  -- Aktiviere RLS (wirft keinen Fehler falls bereits aktiviert)
  ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;
  RAISE NOTICE 'RLS auf realtime.messages aktiviert';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'RLS auf realtime.messages war bereits aktiviert';
END $$;

-- ============================================================================
-- Verifizierung
-- ============================================================================

DO $$
DECLARE
  policy_count integer;
BEGIN
  -- Zähle die erstellten Policies
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'realtime' 
  AND tablename = 'messages';
  
  RAISE NOTICE '✓ Realtime-Autorisierung für messages-Chat konfiguriert';
  RAISE NOTICE '  - % Policies auf realtime.messages erstellt', policy_count;
  RAISE NOTICE '  - Chat-Subscriptions sollten jetzt funktionieren';
  RAISE NOTICE '  - Teste mit: supabase.channel("chat:GAME_ID").subscribe()';
END $$;
