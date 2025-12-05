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

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    const { tier, successUrl, cancelUrl } = await req.json()

    // Validate tier
    if (tier !== 'pro') {
      throw new Error('Invalid subscription tier')
    }

    // Get or create Stripe customer
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('stripe_customer_id, email, full_name')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    // In production, you would use Stripe API here
    // Check Stripe configuration
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
    const STRIPE_PRO_PRICE_ID = Deno.env.get('STRIPE_PRO_PRICE_ID')
    const FRONTEND_URL = Deno.env.get('FRONTEND_URL')
    
    if (!STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not configured')
      throw new Error('Stripe secret key not configured. Please set STRIPE_SECRET_KEY environment variable.')
    }
    
    if (!STRIPE_PRO_PRICE_ID) {
      console.error('STRIPE_PRO_PRICE_ID not configured')
      throw new Error('Stripe price ID not configured. Please set STRIPE_PRO_PRICE_ID environment variable.')
    }
    
    if (!FRONTEND_URL) {
      console.error('FRONTEND_URL not configured')
      throw new Error('Frontend URL not configured. Please set FRONTEND_URL environment variable.')
    }

    // Create Stripe checkout session
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(
        Object.fromEntries(
          Object.entries({
            'mode': 'subscription',
            ...(customerId ? { 'customer': customerId } : { 'customer_email': profile?.email || '' }),
            'line_items[0][price]': STRIPE_PRO_PRICE_ID,
            'line_items[0][quantity]': '1',
            'success_url': successUrl || `${FRONTEND_URL}/billing?success=true`,
            'cancel_url': cancelUrl || `${FRONTEND_URL}/billing?cancelled=true`,
            'metadata[user_id]': user.id,
            'metadata[tier]': tier,
          }).filter(([_, v]) => v !== '')
        )
      ),
    })

    if (!stripeResponse.ok) {
      const error = await stripeResponse.text()
      throw new Error(`Stripe error: ${error}`)
    }

    const session = await stripeResponse.json()

    // Update customer ID if new
    if (!customerId && session.customer) {
      await supabaseClient
        .from('profiles')
        .update({ stripe_customer_id: session.customer })
        .eq('id', user.id)
    }

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
