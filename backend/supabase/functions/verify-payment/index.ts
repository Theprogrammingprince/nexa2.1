import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with user's auth token
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
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Get request body
    const { reference, plan_type } = await req.json()

    if (!reference) {
      return new Response(
        JSON.stringify({ success: false, error: 'Payment reference is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log(`Verifying payment for user ${user.id}, reference: ${reference}`)

    // Verify payment with Paystack
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY not configured')
      return new Response(
        JSON.stringify({ success: false, error: 'Payment configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
        },
      }
    )

    const paystackData = await paystackResponse.json()

    console.log('Paystack verification response:', JSON.stringify(paystackData))

    // Check if payment was successful
    if (!paystackData.status || paystackData.data.status !== 'success') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Payment verification failed',
          details: paystackData.message || 'Unknown error'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Calculate subscription expiry based on plan type
    const now = new Date()
    let expiryDate = new Date(now)
    
    if (plan_type === 'yearly') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)
    } else {
      // Default to monthly
      expiryDate.setMonth(expiryDate.getMonth() + 1)
    }

    console.log(`Setting subscription expiry to: ${expiryDate.toISOString()}`)

    // Update user subscription in profiles table
    // Note: We update both naming conventions to ensure compatibility
    const { error: updateError } = await supabaseClient
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
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      throw updateError
    }

    console.log('Profile updated successfully')

    // Log transaction in transactions table
    const { error: transactionError } = await supabaseClient
      .from('transactions')
      .insert([
        {
          user_id: user.id,
          reference: reference,
          amount: paystackData.data.amount / 100, // Convert from kobo to naira
          status: 'successful',
          payment_method: 'paystack',
          plan_type: plan_type || 'monthly',
          metadata: paystackData.data,
        },
      ])

    if (transactionError) {
      console.error('Error logging transaction:', transactionError)
      // Don't fail the request if transaction logging fails
    } else {
      console.log('Transaction logged successfully')
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Subscription activated successfully',
        data: {
          subscription_tier: 'pro',
          subscription_status: 'active',
          subscription_end: expiryDate.toISOString(),
          amount_paid: paystackData.data.amount / 100,
          plan_type: plan_type || 'monthly',
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in verify-payment function:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
