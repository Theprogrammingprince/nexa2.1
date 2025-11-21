-- FIX: Change summary_id from UUID to TEXT
-- Run this in your Supabase SQL Editor

-- Drop the foreign key constraint first
ALTER TABLE user_notes 
DROP CONSTRAINT IF EXISTS user_notes_summary_id_fkey;

-- Change the column type from UUID to TEXT
ALTER TABLE user_notes 
ALTER COLUMN summary_id TYPE TEXT;

-- Recreate the index
DROP INDEX IF EXISTS idx_user_notes_user_summary;
CREATE INDEX idx_user_notes_user_summary ON user_notes(user_id, summary_id);

-- Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_notes' AND column_name = 'summary_id';
