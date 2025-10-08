/*
  # Fix trainer_memberships INSERT Policy
  
  1. Problem
    - Die INSERT-Policy `tm_insert_self` erlaubt keine Inserts
    - INSERT-Policies brauchen nur WITH CHECK, kein USING
    
  2. Changes
    - DROP der fehlerhaften INSERT-Policy
    - CREATE neue INSERT-Policy nur mit WITH CHECK
    - WITH CHECK: user_id muss der eigenen auth.uid() entsprechen
*/

-- Alte fehlerhafte Policy entfernen
DROP POLICY IF EXISTS "tm_insert_self" ON trainer_memberships;

-- Neue korrekte INSERT-Policy erstellen (nur WITH CHECK bei INSERT)
CREATE POLICY "tm_insert_self"
  ON trainer_memberships
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
