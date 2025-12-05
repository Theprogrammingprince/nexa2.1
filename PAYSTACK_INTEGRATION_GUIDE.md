# Paystack Payment Integration Guide for NEXA

## Overview
This guide will help you integrate Paystack as your payment gateway for the NEXA platform to handle subscription payments (₦2,000/month).

---

## Prerequisites

1. **Paystack Account**
   - Sign up at [https://paystack.com](https://paystack.com)
   - Complete business verification
   - Get your API keys from the dashboard

2. **Required Information**
   - Business name
   - Business email
   - Bank account details (for settlements)
   - Valid ID for verification

---

## Step 1: Get Your Paystack API Keys

1. Log in to your Paystack Dashboard
2. Navigate to **Settings** → **API Keys & Webhooks**
3. Copy your keys:
   - **Public Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

⚠️ **Important**: Use test keys during development, live keys in production

---

## Step 2: Add Environment Variables

Add these to your `.env` file:

```env
# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
PAYSTACK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

---

## Step 3: Install Paystack Libraries

### Frontend (React)
```bash
cd frontend
npm install react-paystack
```

### Backend (Supabase Edge Functions)
No installation needed - we'll use fetch API to call Paystack REST API

---

## Step 4: Create Paystack Payment Component

Create `frontend/src/components/PaystackPayment.tsx`:

```typescript
import { usePaystackPayment } from 'react-paystack';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface PaystackPaymentProps {
  email: string;
  amount: number; // in kobo (₦2,000 = 200000 kobo)
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

const PaystackPayment = ({ email, amount, onSuccess, onClose }: PaystackPaymentProps) => {
  const [loading, setLoading] = useState(false);

  const config = {
    reference: `NEXA_${new Date().getTime()}`,
    email: email,
    amount: amount, // Amount in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    currency: 'NGN',
    metadata: {
      custom_fields: [
        {
          display_name: 'Subscription Plan',
          variable_name: 'plan',
          value: 'Pro Monthly'
        }
      ]
    }
  };

  const onPaymentSuccess = (reference: any) => {
    console.log('Payment successful:', reference);
    toast.success('Payment successful!');
    onSuccess(reference.reference);
  };

  const onPaymentClose = () => {
    console.log('Payment closed');
    toast.error('Payment cancelled');
    onClose();
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    setLoading(true);
    initializePayment(onPaymentSuccess, onPaymentClose);
    setLoading(false);
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Pay ₦${(amount / 100).toLocaleString()}`}
    </button>
  );
};

export default PaystackPayment;
```

---

## Step 5: Update BillingPage to Use Paystack

Modify `frontend/src/pages/BillingPage.tsx`:

```typescript
import PaystackPayment from '../components/PaystackPayment';
import { useAuth } from '../context/AuthContext';

// Inside your component
const { user } = useAuth();
const [showPayment, setShowPayment] = useState(false);

const handlePaymentSuccess = async (reference: string) => {
  try {
    // Verify payment on backend
    const response = await fetch(`${FUNCTIONS_URL}/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await supabase.auth.getSession().then(s => s.data.session?.access_token)}`
      },
      body: JSON.stringify({ reference })
    });

    const data = await response.json();

    if (data.success) {
      toast.success('Subscription activated!');
      // Refresh user subscription status
      window.location.reload();
    }
  } catch (error) {
    toast.error('Failed to verify payment');
  }
};

// In your JSX
{showPayment && user?.email && (
  <PaystackPayment
    email={user.email}
    amount={200000} // ₦2,000 in kobo
    onSuccess={handlePaymentSuccess}
    onClose={() => setShowPayment(false)}
  />
)}
```

---

## Step 6: Create Payment Verification Edge Function

Create `backend/supabase/functions/verify-payment/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { reference } = await req.json()

    // Verify payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
        },
      }
    )

    const paystackData = await paystackResponse.json()

    if (!paystackData.status || paystackData.data.status !== 'success') {
      return new Response(
        JSON.stringify({ success: false, error: 'Payment verification failed' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Payment verified, update user subscription
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 1) // 1 month subscription

    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({
        subscription_tier: 'pro',
        subscription_status: 'active',
        subscription_start: new Date().toISOString(),
        subscription_end: expiryDate.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) throw updateError

    // Log transaction
    await supabaseClient.from('transactions').insert([
      {
        user_id: user.id,
        reference: reference,
        amount: paystackData.data.amount / 100, // Convert from kobo to naira
        status: 'successful',
        payment_method: 'paystack',
        metadata: paystackData.data,
      },
    ])

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Subscription activated successfully',
        data: paystackData.data,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
```

---

## Step 7: Create Transactions Table Migration

Create `backend/supabase/migrations/012_create_transactions.sql`:

```sql
-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reference VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON transactions(reference);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own transactions"
    ON transactions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions"
    ON transactions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Add subscription fields to profiles if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50) DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'inactive';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_start TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_end TIMESTAMP WITH TIME ZONE;

-- Comment
COMMENT ON TABLE transactions IS 'Stores payment transaction records';
```

---

## Step 8: Set Up Webhooks (Important!)

Webhooks allow Paystack to notify your app about payment events.

### 1. Create Webhook Handler

Create `backend/supabase/functions/paystack-webhook/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from 'https://deno.land/std@0.168.0/crypto/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-paystack-signature',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify webhook signature
    const signature = req.headers.get('x-paystack-signature')
    const body = await req.text()
    
    const hash = await crypto.subtle.digest(
      'SHA-512',
      new TextEncoder().encode(Deno.env.get('PAYSTACK_WEBHOOK_SECRET') + body)
    )
    const expectedSignature = Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    if (signature !== expectedSignature) {
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const event = JSON.parse(body)

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        // Payment successful
        console.log('Payment successful:', event.data.reference)
        // Update subscription status if needed
        break

      case 'subscription.create':
        // Subscription created
        console.log('Subscription created:', event.data)
        break

      case 'subscription.disable':
        // Subscription cancelled
        console.log('Subscription cancelled:', event.data)
        // Update user subscription status
        break

      default:
        console.log('Unhandled event:', event.event)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
```

### 2. Configure Webhook in Paystack Dashboard

1. Go to **Settings** → **Webhooks**
2. Add webhook URL: `https://your-project.supabase.co/functions/v1/paystack-webhook`
3. Copy the webhook secret and add to your environment variables

---

## Step 9: Deploy Edge Functions

```bash
cd backend

# Deploy verify-payment function
supabase functions deploy verify-payment

# Deploy webhook handler
supabase functions deploy paystack-webhook

# Set secrets
supabase secrets set PAYSTACK_SECRET_KEY=sk_test_xxxxx
supabase secrets set PAYSTACK_WEBHOOK_SECRET=whsec_xxxxx
```

---

## Step 10: Testing

### Test Mode
1. Use test API keys
2. Use Paystack test cards:
   - **Success**: `4084084084084081`
   - **Decline**: `5060666666666666666`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - PIN: `1234`

### Test Flow
1. Navigate to billing page
2. Click subscribe
3. Enter test card details
4. Complete payment
5. Verify subscription is activated

---

## Step 11: Go Live Checklist

- [ ] Complete Paystack business verification
- [ ] Add live API keys to production environment
- [ ] Test payment flow with real card (small amount)
- [ ] Set up webhook URL in production
- [ ] Configure proper error handling
- [ ] Set up email notifications for successful payments
- [ ] Implement subscription renewal logic
- [ ] Add payment history page
- [ ] Test subscription expiry handling

---

## Pricing Configuration

Current pricing: **₦2,000/month**

```typescript
const PRICING = {
  monthly: {
    amount: 200000, // in kobo
    display: '₦2,000',
    interval: 'monthly'
  },
  yearly: {
    amount: 2000000, // ₦20,000 in kobo (save ₦4,000)
    display: '₦20,000',
    interval: 'yearly'
  }
};
```

---

## Additional Features to Implement

### 1. Subscription Plans API
Create an endpoint to fetch available plans

### 2. Payment History
Show users their transaction history

### 3. Auto-Renewal
Implement recurring payments using Paystack subscriptions

### 4. Proration
Handle mid-cycle upgrades/downgrades

### 5. Failed Payment Handling
Retry logic and notification system

### 6. Refunds
Implement refund processing

---

## Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Always verify payments** on the backend
3. **Use webhooks** for reliable payment confirmation
4. **Validate webhook signatures** to prevent fraud
5. **Store sensitive data** encrypted
6. **Log all transactions** for audit trail
7. **Implement rate limiting** on payment endpoints
8. **Use HTTPS** for all payment-related requests

---

## Troubleshooting

### Payment not verifying
- Check API keys are correct
- Verify webhook is receiving events
- Check Supabase function logs

### Webhook not working
- Verify webhook URL is accessible
- Check signature validation
- Review Paystack webhook logs

### Subscription not activating
- Check database permissions
- Verify RLS policies
- Review Edge Function logs

---

## Support Resources

- **Paystack Documentation**: https://paystack.com/docs
- **Paystack API Reference**: https://paystack.com/docs/api
- **Paystack Support**: support@paystack.com
- **Test Environment**: https://dashboard.paystack.com/#/test

---

## Next Steps

1. ✅ Set up Paystack account
2. ✅ Get API keys
3. ✅ Install dependencies
4. ✅ Create payment component
5. ✅ Create verification endpoint
6. ✅ Set up webhooks
7. ✅ Test with test cards
8. ✅ Deploy to production
9. ✅ Go live!

---

**Need Help?** Contact Paystack support or refer to their comprehensive documentation.

Good luck with your payment integration! 🚀
