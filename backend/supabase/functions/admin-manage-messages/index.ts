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

    const url = new URL(req.url)
    const messageId = url.searchParams.get('message_id')

    // GET - Fetch messages
    if (req.method === 'GET') {
      // Verify admin user
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
      if (userError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      if (messageId) {
        // Get specific message
        const { data: message, error } = await supabaseClient
          .from('support_messages')
          .select('*')
          .eq('id', messageId)
          .single()

        if (error) throw error

        return new Response(JSON.stringify({ message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Get all messages
      const { data: messages, error } = await supabaseClient
        .from('support_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return new Response(JSON.stringify({ messages }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // POST - Create new message (from contact form)
    if (req.method === 'POST') {
      const { name, email, subject, message, priority } = await req.json()

      if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Try to find user by email
      const { data: userProfile } = await supabaseClient
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

      const { data: newMessage, error } = await supabaseClient
        .from('support_messages')
        .insert({
          name,
          email,
          subject,
          message,
          priority: priority || 'normal',
          user_id: userProfile?.id || null,
          status: 'unread',
        })
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ message: newMessage, success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // PUT - Update message (mark as read, reply, etc.)
    if (req.method === 'PUT') {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
      if (userError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { status, reply_message } = await req.json()

      if (!messageId) {
        return new Response(JSON.stringify({ error: 'Message ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const updateData: any = {}
      if (status) updateData.status = status
      if (reply_message) {
        updateData.reply_message = reply_message
        updateData.replied_by = user.id
        updateData.replied_at = new Date().toISOString()
        updateData.status = 'replied'
      }

      const { data: updatedMessage, error } = await supabaseClient
        .from('support_messages')
        .update(updateData)
        .eq('id', messageId)
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ message: updatedMessage, success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // DELETE - Delete message
    if (req.method === 'DELETE') {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
      if (userError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      if (!messageId) {
        return new Response(JSON.stringify({ error: 'Message ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { error } = await supabaseClient
        .from('support_messages')
        .delete()
        .eq('id', messageId)

      if (error) throw error

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
