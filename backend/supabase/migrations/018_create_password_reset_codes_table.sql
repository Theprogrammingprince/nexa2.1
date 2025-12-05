-- Create password_reset_codes table for secure password reset flow
CREATE TABLE IF NOT EXISTS password_reset_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expiry TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_password_reset_codes_email ON password_reset_codes(email);
CREATE INDEX idx_password_reset_codes_code ON password_reset_codes(code);
CREATE INDEX idx_password_reset_codes_user_id ON password_reset_codes(user_id);
CREATE INDEX idx_password_reset_codes_expiry ON password_reset_codes(expiry);

-- Enable RLS
ALTER TABLE password_reset_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies (only service role can access this table)
CREATE POLICY "Service role can manage reset codes"
  ON password_reset_codes
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to automatically clean up expired codes (runs daily)
CREATE OR REPLACE FUNCTION cleanup_expired_reset_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM password_reset_codes
  WHERE expiry < NOW() - INTERVAL '1 day';
END;
$$;

-- Optional: Create a cron job to run cleanup (if pg_cron is enabled)
-- SELECT cron.schedule('cleanup-expired-reset-codes', '0 2 * * *', 'SELECT cleanup_expired_reset_codes()');

COMMENT ON TABLE password_reset_codes IS 'Stores temporary password reset verification codes';
COMMENT ON COLUMN password_reset_codes.code IS '6-character alphanumeric code sent via email';
COMMENT ON COLUMN password_reset_codes.expiry IS 'Timestamp when the code expires (typically 5 minutes from creation)';
COMMENT ON COLUMN password_reset_codes.used IS 'Whether the code has been used to reset password';
