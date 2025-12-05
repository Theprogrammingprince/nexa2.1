-- Fix Notification Trigger - Remove priority field
-- Run this in Supabase SQL Editor

-- First, let's check the notifications table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'notifications'
ORDER BY ordinal_position;

-- Drop the existing trigger and function if they exist
-- IMPORTANT: Drop trigger FIRST, then function (or use CASCADE)
DROP TRIGGER IF EXISTS on_announcement_created ON announcements;
DROP TRIGGER IF EXISTS trigger_notify_users_announcement ON announcements;
DROP FUNCTION IF EXISTS notify_users_announcement() CASCADE;

-- Create corrected function WITHOUT priority field
CREATE OR REPLACE FUNCTION notify_users_announcement()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create notifications if target includes 'users' or 'both'
  IF NEW.target IN ('users', 'both') AND NEW.active = true THEN
    INSERT INTO notifications (user_id, type, title, message, read)
    SELECT 
      id, 
      'announcement', 
      '📢 ' || NEW.title, 
      LEFT(NEW.content, 200) || CASE WHEN LENGTH(NEW.content) > 200 THEN '...' ELSE '' END,
      false
    FROM profiles 
    WHERE role = 'student';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run after announcement insert
CREATE TRIGGER on_announcement_created
  AFTER INSERT ON announcements
  FOR EACH ROW
  EXECUTE FUNCTION notify_users_announcement();

-- Test: Check if trigger exists
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table, 
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_announcement_created';

-- Verify the function
SELECT 
  routine_name, 
  routine_type, 
  data_type
FROM information_schema.routines
WHERE routine_name = 'notify_users_announcement';
