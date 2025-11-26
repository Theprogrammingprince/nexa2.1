-- Create email verification codes table
CREATE TABLE IF NOT EXISTS email_verification_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_verification_user_id ON email_verification_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verification_email ON email_verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_email_verification_expires ON email_verification_codes(expires_at);

-- Add email_verified column to profiles table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'email_verified'
    ) THEN
        ALTER TABLE profiles ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE email_verification_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own verification codes
CREATE POLICY "Users can view their own verification codes"
    ON email_verification_codes
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy: System can insert verification codes
CREATE POLICY "System can insert verification codes"
    ON email_verification_codes
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: System can delete verification codes
CREATE POLICY "System can delete verification codes"
    ON email_verification_codes
    FOR DELETE
    TO authenticated
    USING (true);

-- Function to clean up expired verification codes
CREATE OR REPLACE FUNCTION cleanup_expired_verification_codes()
RETURNS void AS $$
BEGIN
    DELETE FROM email_verification_codes
    WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a scheduled job to clean up expired codes (optional, requires pg_cron extension)
-- This can be run manually or set up as a cron job
COMMENT ON FUNCTION cleanup_expired_verification_codes() IS 'Cleans up expired email verification codes. Run periodically.';
