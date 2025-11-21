-- TEMPORARY FIX: Disable RLS on user_notes for testing
-- Run this in your Supabase SQL Editor

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can manage their own notes" ON user_notes;

-- Create a temporary permissive policy that allows all operations
CREATE POLICY "Temporary allow all for testing" ON user_notes
    FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'user_notes';
