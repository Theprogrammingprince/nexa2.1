-- Fix infinite recursion in profiles policies
-- The issue is that the admin policy tries to SELECT from profiles while checking profiles

-- Drop all existing policies first
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Recreate simple policies without recursion
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Users can insert their own profile (for auto-creation)
CREATE POLICY "Users can insert their own profile" ON profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);
