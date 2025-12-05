import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!signature || !STRIPE_WEBHOOK_SECRET) {
      throw new Error('Missing signature or webhook secret')
    }

    const body = await req.text()

    // Verify webhook signature (simplified - in production use Stripe SDK)
    // const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
    const event = JSON.parse(body)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata.user_id
        const tier = session.metadata.tier

        // Create subscription record
        await supabaseClient.from('subscriptions').upsert({
          user_id: userId,
          stripe_subscription_id: session.subscription,
          stripe_customer_id: session.customer,
          tier: tier,
          status: 'active',
          current_period_start: new Date(session.subscription_start * 1000).toISOString(),
          current_period_end: new Date(session.subscription_end * 1000).toISOString(),
        })

        // Create billing history
        await supabaseClient.from('billing_history').insert({
          user_id: userId,
          stripe_invoice_id: session.invoice,
          amount: session.amount_total / 100,
          currency: session.currency,
          status: 'paid',
          billing_reason: 'subscription_create',
        })

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object

        await supabaseClient
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', subscription.id)

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        await supabaseClient
          .from('subscriptions')
          .update({
            status: 'cancelled',
          })
          .eq('stripe_subscription_id', subscription.id)

        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object

        // Get user from customer ID
        const { data: subscription } = await supabaseClient
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', invoice.customer)
          .single()

        if (subscription) {
          await supabaseClient.from('billing_history').insert({
            user_id: subscription.user_id,
            stripe_invoice_id: invoice.id,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency,
            status: 'paid',
            invoice_url: invoice.hosted_invoice_url,
            invoice_pdf: invoice.invoice_pdf,
            billing_reason: invoice.billing_reason,
          })
        }

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object

        const { data: subscription } = await supabaseClient
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', invoice.customer)
          .single()

        if (subscription) {
          await supabaseClient.from('billing_history').insert({
            user_id: subscription.user_id,
            stripe_invoice_id: invoice.id,
            amount: invoice.amount_due / 100,
            currency: invoice.currency,
            status: 'failed',
            billing_reason: invoice.billing_reason,
          })

          // Update subscription status
          await supabaseClient
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_customer_id', invoice.customer)
        }

        break
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
