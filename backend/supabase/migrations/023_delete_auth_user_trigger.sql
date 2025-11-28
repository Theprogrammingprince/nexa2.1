-- Create a function to delete auth user when profile is deleted
-- This is needed for cleaning up unverified accounts
CREATE OR REPLACE FUNCTION delete_auth_user_on_profile_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete the auth user when profile is deleted
    -- This requires service role permissions
    DELETE FROM auth.users WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically delete auth user when profile is deleted
DROP TRIGGER IF EXISTS trigger_delete_auth_user ON profiles;
CREATE TRIGGER trigger_delete_auth_user
    BEFORE DELETE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION delete_auth_user_on_profile_delete();

-- Add comment explaining the trigger
COMMENT ON FUNCTION delete_auth_user_on_profile_delete() IS 'Automatically deletes the corresponding auth.users entry when a profile is deleted. This is used for cleaning up unverified accounts.';
