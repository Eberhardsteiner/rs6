/*
  # Standardize messages table columns

  ## Problem
  The messages table has two redundant columns for message content:
  - `content` (text, NOT NULL)
  - `message` (text, nullable)
  
  This causes confusion and inconsistent data storage.

  ## Solution
  1. Migrate any data from `message` to `content` if content is empty
  2. Drop the redundant `message` column
  3. Keep `content` as the single source of truth

  ## Data Safety
  - Checks for existing data in both columns
  - Only migrates if content is NULL/empty and message has value
  - No data loss

  ## Changes
  1. Data migration: message → content (where needed)
  2. Drop redundant `message` column
*/

-- Step 1: Migrate any data from 'message' to 'content' where content is missing
DO $$
BEGIN
  -- Check if message column exists before trying to migrate
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'message'
  ) THEN
    -- Update content from message where content is empty/null but message has value
    UPDATE messages 
    SET content = message 
    WHERE (content IS NULL OR content = '') 
      AND message IS NOT NULL 
      AND message != '';
  END IF;
END $$;

-- Step 2: Drop the redundant 'message' column
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' AND column_name = 'message'
  ) THEN
    ALTER TABLE messages DROP COLUMN message;
  END IF;
END $$;

-- Step 3: Ensure content is NOT NULL (should already be)
DO $$
BEGIN
  -- Make sure content column cannot be null
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'messages' 
      AND column_name = 'content'
      AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE messages ALTER COLUMN content SET NOT NULL;
  END IF;
END $$;
