-- Create transactions table for payment records
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reference VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50) NOT NULL DEFAULT 'paystack',
    plan_type VARCHAR(50), -- 'monthly' or 'yearly'
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own transactions
CREATE POLICY "Users can view their own transactions"
    ON transactions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy: System can insert transactions (authenticated users via Edge Functions)
CREATE POLICY "System can insert transactions"
    ON transactions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: System can update transactions (for status changes)
CREATE POLICY "System can update transactions"
    ON transactions
    FOR UPDATE
    TO authenticated
    USING (true);

-- Add subscription fields to profiles table if they don't exist
-- Note: subscription_tier and subscription_status may already exist from migration 020
DO $$ 
BEGIN
    -- Add subscription_tier column if it doesn't exist (may exist from migration 020)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'subscription_tier'
    ) THEN
        ALTER TABLE profiles ADD COLUMN subscription_tier VARCHAR(50) DEFAULT 'free';
    END IF;

    -- Add subscription_status column if it doesn't exist (may exist from migration 020)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'subscription_status'
    ) THEN
        ALTER TABLE profiles ADD COLUMN subscription_status VARCHAR(50) DEFAULT 'inactive';
    ELSE
        -- Update default value if column exists
        ALTER TABLE profiles ALTER COLUMN subscription_status SET DEFAULT 'inactive';
    END IF;

    -- Add subscription_start column if it doesn't exist
    -- Note: migration 020 uses subscription_start_date, we use subscription_start
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'subscription_start'
    ) THEN
        ALTER TABLE profiles ADD COLUMN subscription_start TIMESTAMP WITH TIME ZONE;
    END IF;

    -- Add subscription_end column if it doesn't exist
    -- Note: migration 020 uses subscription_end_date, we use subscription_end
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'subscription_end'
    ) THEN
        ALTER TABLE profiles ADD COLUMN subscription_end TIMESTAMP WITH TIME ZONE;
    END IF;

    -- Add last_payment_date column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'last_payment_date'
    ) THEN
        ALTER TABLE profiles ADD COLUMN last_payment_date TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_transactions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_transactions_updated_at_trigger ON transactions;
CREATE TRIGGER update_transactions_updated_at_trigger
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_transactions_updated_at();

-- Add comment
COMMENT ON TABLE transactions IS 'Stores payment transaction records from Paystack and other payment gateways';
