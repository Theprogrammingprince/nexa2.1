-- Add scheduled_at column to study_sessions table
-- This combines the separate date and time columns into a single timestamp

ALTER TABLE study_sessions 
ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMPTZ;

-- Make scheduled_date and scheduled_time nullable since we're using scheduled_at now
ALTER TABLE study_sessions 
ALTER COLUMN scheduled_date DROP NOT NULL,
ALTER COLUMN scheduled_time DROP NOT NULL;

-- Update existing records to populate scheduled_at from scheduled_date and scheduled_time
UPDATE study_sessions 
SET scheduled_at = (scheduled_date::text || ' ' || scheduled_time::text)::timestamptz
WHERE scheduled_at IS NULL AND scheduled_date IS NOT NULL AND scheduled_time IS NOT NULL;
