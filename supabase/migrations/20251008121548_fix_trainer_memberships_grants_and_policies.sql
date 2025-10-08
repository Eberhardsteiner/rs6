/*
  # Fix trainer_memberships Table Grants and Policies

  ## Critical Issues Fixed
  1. **Missing Grants**: Add INSERT, UPDATE, DELETE grants for authenticated role
  2. **Realtime Publication**: Add trainer_memberships to supabase_realtime publication
  3. **Redundant Policies**: Remove duplicate RLS policies (tm_ins_self, tm_sel_self, tm_select_own)
  
  ## Changes Applied
  - Grant full DML permissions (INSERT, UPDATE, DELETE) to authenticated role on trainer_memberships
  - Add trainer_memberships to Realtime publication for real-time updates
  - Remove redundant policies, keep only: tm_insert_self, tm_select_self, tm_update_self, tm_delete_self
  
  ## Security Notes
  - RLS remains enabled on trainer_memberships
  - Policies ensure users can only access their own records (user_id = auth.uid())
  - No data access changes, only fixes missing permissions
*/

-- 1. Grant missing permissions to authenticated role
GRANT INSERT, UPDATE, DELETE ON public.trainer_memberships TO authenticated;

-- 2. Add to Realtime publication for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.trainer_memberships;

-- 3. Remove redundant policies
DROP POLICY IF EXISTS tm_ins_self ON public.trainer_memberships;
DROP POLICY IF EXISTS tm_sel_self ON public.trainer_memberships;
DROP POLICY IF EXISTS tm_select_own ON public.trainer_memberships;

-- 4. Ensure core policies exist (idempotent)
DO $$
BEGIN
  -- SELECT policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='trainer_memberships' AND policyname='tm_select_self'
  ) THEN
    CREATE POLICY tm_select_self ON public.trainer_memberships
      FOR SELECT 
      USING (user_id = auth.uid());
  END IF;

  -- INSERT policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='trainer_memberships' AND policyname='tm_insert_self'
  ) THEN
    CREATE POLICY tm_insert_self ON public.trainer_memberships
      FOR INSERT 
      WITH CHECK (user_id = auth.uid());
  END IF;

  -- UPDATE policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='trainer_memberships' AND policyname='tm_update_self'
  ) THEN
    CREATE POLICY tm_update_self ON public.trainer_memberships
      FOR UPDATE 
      USING (user_id = auth.uid()) 
      WITH CHECK (user_id = auth.uid());
  END IF;

  -- DELETE policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='public' AND tablename='trainer_memberships' AND policyname='tm_delete_self'
  ) THEN
    CREATE POLICY tm_delete_self ON public.trainer_memberships
      FOR DELETE 
      USING (user_id = auth.uid());
  END IF;
END $$;
