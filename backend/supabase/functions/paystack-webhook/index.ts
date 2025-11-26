import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from 'https://deno.land/std@0.168.0/crypto/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-paystack-signature',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the raw body for signature verification
    const body = await req.text()
    
    // Verify webhook signature
    const signature = req.headers.get('x-paystack-signature')
    const secret = Deno.env.get('PAYSTACK_SECRET_KEY')

    if (!secret) {
      console.error('PAYSTACK_SECRET_KEY not configured')
      return new Response(
        JSON.stringify({ error: 'Webhook configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Compute expected signature
    const encoder = new TextEncoder()
    const data = encoder.encode(secret + body)
    const hashBuffer = await crypto.subtle.digest('SHA-512', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    // Verify signature
    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature')
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Parse the event
    const event = JSON.parse(body)
    console.log('Received webhook event:', event.event)

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        console.log('Payment successful:', event.data.reference)
        
        // Find user by email
        const { data: profiles, error: profileError } = await supabaseAdmin
          .from('profiles')
          .select('id, email')
          .eq('email', event.data.customer.email)
          .limit(1)

        if (profileError || !profiles || profiles.length === 0) {
          console.error('User not found for email:', event.data.customer.email)
          break
        }

        const userId = profiles[0].id

        // Check if transaction already exists
        const { data: existingTransaction } = await supabaseAdmin
          .from('transactions')
          .select('id')
          .eq('reference', event.data.reference)
          .limit(1)

        if (existingTransaction && existingTransaction.length > 0) {
          console.log('Transaction already processed:', event.data.reference)
          break
        }

        // Determine plan type from metadata
        const planType = event.data.metadata?.plan_type || 'monthly'

        // Calculate expiry date
        const now = new Date()
        const expiryDate = new Date(now)
        if (planType === 'yearly') {
          expiryDate.setFullYear(expiryDate.getFullYear() + 1)
        } else {
          expiryDate.setMonth(expiryDate.getMonth() + 1)
        }

        // Update user subscription
        // Note: We update both naming conventions to ensure compatibility
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({
            subscription_tier: 'pro',
            subscription_status: 'active',
            subscription_start: now.toISOString(), // For migration 012
            subscription_end: expiryDate.toISOString(), // For migration 012
            subscription_start_date: now.toISOString(), // For migration 020
            subscription_end_date: expiryDate.toISOString(), // For migration 020
            last_payment_date: now.toISOString(),
            updated_at: now.toISOString(),
          })
          .eq('id', userId)

        if (updateError) {
          console.error('Error updating profile:', updateError)
        } else {
          console.log('Subscription activated for user:', userId)
        }

        // Log transaction
        const { error: transactionError } = await supabaseAdmin
          .from('transactions')
          .insert([
            {
              user_id: userId,
              reference: event.data.reference,
              amount: event.data.amount / 100,
              status: 'successful',
              payment_method: 'paystack',
              plan_type: planType,
              metadata: event.data,
            },
          ])

        if (transactionError) {
          console.error('Error logging transaction:', transactionError)
        }

        break

      case 'subscription.create':
        console.log('Subscription created:', event.data)
        // Handle subscription creation if using Paystack subscriptions
        break

      case 'subscription.disable':
        console.log('Subscription cancelled:', event.data)
        
        // Find user by subscription code or email
        const { data: subProfiles } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('email', event.data.customer.email)
          .limit(1)

        if (subProfiles && subProfiles.length > 0) {
          // Update subscription status to cancelled
          await supabaseAdmin
            .from('profiles')
            .update({
              subscription_status: 'cancelled',
              updated_at: new Date().toISOString(),
            })
            .eq('id', subProfiles[0].id)

          console.log('Subscription cancelled for user:', subProfiles[0].id)
        }
        break

      case 'charge.failed':
        console.log('Payment failed:', event.data.reference)
        // Optionally log failed transactions
        break

      default:
        console.log('Unhandled event type:', event.event)
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
