-- FIX: Remove foreign key constraint on user_id for testing
-- Run this in your Supabase SQL Editor

-- Drop the foreign key constraint on user_id
ALTER TABLE user_notes 
DROP CONSTRAINT IF EXISTS user_notes_user_id_fkey;

-- Verify the constraint was removed
SELECT conname, contype
FROM pg_constraint
WHERE conrelid = 'user_notes'::regclass;
