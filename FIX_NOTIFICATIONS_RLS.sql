-- ========================================
-- FIX NOTIFICATIONS RLS POLICIES
-- ========================================
-- This fixes notification creation issues for tasks and announcements

-- 1. Check current RLS policies on notifications table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'notifications';

-- 2. Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can insert own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can delete own notifications" ON notifications;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON notifications;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON notifications;

-- 3. Create new permissive RLS policies
-- Allow users to view their own notifications
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow service role and authenticated users to insert notifications
-- This is needed for:
-- - Backend functions creating notifications for users (announcements, messages)
-- - Users creating notifications for themselves (tasks)
CREATE POLICY "Allow insert notifications"
ON notifications FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow users to update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
ON notifications FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own notifications
CREATE POLICY "Users can delete own notifications"
ON notifications FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 4. Ensure RLS is enabled
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 5. Verify the table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'notifications'
ORDER BY ordinal_position;

-- 6. Test: Try to insert a notification (replace with your user_id)
-- INSERT INTO notifications (user_id, type, title, message, read)
-- VALUES ('your-user-id-here', 'test', 'Test Notification', 'This is a test', false);

-- 7. Check if notifications exist
SELECT id, user_id, type, title, message, read, created_at
FROM notifications
ORDER BY created_at DESC
LIMIT 10;

-- ========================================
-- Expected Results:
-- ========================================
-- After running this script:
-- 1. Task notifications should work when creating todos with notify enabled
-- 2. Users should receive notifications when announcements are created
-- 3. Admin notifications should work when messages are received
-- 4. No more 400 Bad Request errors on notification inserts

-- ========================================
-- Notes:
-- ========================================
-- The notifications table should have these columns:
-- - id (uuid, primary key)
-- - user_id (uuid, foreign key to profiles)
-- - type (varchar) - 'system', 'announcement', 'task', etc.
-- - title (text)
-- - message (text)
-- - read (boolean)
-- - created_at (timestamp)
--
-- It should NOT have:
-- - priority column (this was causing 400 errors)
