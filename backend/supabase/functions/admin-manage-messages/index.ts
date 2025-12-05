import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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

      console.log('📧 Received contact form submission:')
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Subject:', subject)

      if (!name || !email || !subject || !message) {
        console.error('❌ Missing required fields')
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

      console.log('✅ Message saved to database:', newMessage.id)

      // Create admin notification
      // Get all admin users
      const { data: admins, error: adminsError } = await supabaseClient
        .from('profiles')
        .select('id')
        .eq('role', 'admin')

      if (adminsError) {
        console.error('❌ Error fetching admins:', adminsError)
      } else {
        console.log(`👥 Found ${admins?.length || 0} admins`)
      }

      if (admins && admins.length > 0) {
        // Create notification for each admin
        const notifications = admins.map(admin => ({
          user_id: admin.id,
          type: 'system',
          title: `New message from ${name}`,
          message: `${subject} - ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}`,
          read: false,
        }))

        console.log(`📨 Creating ${notifications.length} admin notifications...`)
        const { error: notifError } = await supabaseClient
          .from('notifications')
          .insert(notifications)

        if (notifError) {
          console.error('❌ Error creating admin notifications:', notifError)
        } else {
          console.log('✅ Admin notifications created successfully')
        }
      }

      console.log('✅ Contact form submission completed successfully')
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
