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

    const { action } = await req.json() // 'cancel', 'resume', 'update_payment'

    // Get user's subscription
    const { data: subscription } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!subscription) {
      throw new Error('No active subscription found')
    }

    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
    
    if (!STRIPE_SECRET_KEY) {
      throw new Error('Stripe not configured')
    }

    let result

    switch (action) {
      case 'cancel':
        // Cancel subscription at period end
        const cancelResponse = await fetch(
          `https://api.stripe.com/v1/subscriptions/${subscription.stripe_subscription_id}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              'cancel_at_period_end': 'true',
            }),
          }
        )

        if (!cancelResponse.ok) {
          throw new Error('Failed to cancel subscription')
        }

        result = await cancelResponse.json()

        // Update database
        await supabaseClient
          .from('subscriptions')
          .update({ 
            cancel_at_period_end: true,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)

        break

      case 'resume':
        // Resume cancelled subscription
        const resumeResponse = await fetch(
          `https://api.stripe.com/v1/subscriptions/${subscription.stripe_subscription_id}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              'cancel_at_period_end': 'false',
            }),
          }
        )

        if (!resumeResponse.ok) {
          throw new Error('Failed to resume subscription')
        }

        result = await resumeResponse.json()

        // Update database
        await supabaseClient
          .from('subscriptions')
          .update({ 
            cancel_at_period_end: false,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)

        break

      case 'update_payment':
        // Create portal session for payment method update
        const portalResponse = await fetch(
          'https://api.stripe.com/v1/billing_portal/sessions',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              'customer': subscription.stripe_customer_id,
              'return_url': `${Deno.env.get('FRONTEND_URL')}/billing`,
            }),
          }
        )

        if (!portalResponse.ok) {
          throw new Error('Failed to create portal session')
        }

        result = await portalResponse.json()
        break

      default:
        throw new Error('Invalid action')
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
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
