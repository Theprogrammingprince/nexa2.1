-- ALLOW MULTIPLE NOTES PER SUMMARY
-- Run this in your Supabase SQL Editor

-- Drop the unique constraint that prevents multiple notes per summary
ALTER TABLE user_notes 
DROP CONSTRAINT IF EXISTS user_notes_user_id_summary_id_key;

-- Verify the constraint was removed
SELECT conname, contype
FROM pg_constraint
WHERE conrelid = 'user_notes'::regclass;
