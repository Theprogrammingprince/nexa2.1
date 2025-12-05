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
    const announcementId = url.searchParams.get('announcement_id')
    const target = url.searchParams.get('target') // 'users', 'landing', or 'both'

    // GET - Fetch announcements
    if (req.method === 'GET') {
      console.log('📢 GET announcements request')
      console.log('Target filter:', target)
      
      let query = supabaseClient
        .from('announcements')
        .select('*')
        .eq('active', true)

      if (target) {
        console.log('Applying target filter:', `target.eq.${target},target.eq.both`)
        query = query.or(`target.eq.${target},target.eq.both`)
      }

      if (announcementId) {
        query = query.eq('id', announcementId).single()
        const { data: announcement, error } = await query
        if (error) {
          console.error('❌ Error fetching single announcement:', error)
          throw error
        }
        console.log('✅ Single announcement fetched:', announcement?.id)
        return new Response(JSON.stringify({ announcement }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { data: announcements, error } = await query.order('created_at', { ascending: false })
      
      if (error) {
        console.error('❌ Error fetching announcements:', error)
        throw error
      }

      console.log(`✅ Fetched ${announcements?.length || 0} announcements`)
      if (announcements && announcements.length > 0) {
        console.log('First announcement:', JSON.stringify(announcements[0], null, 2))
      }

      return new Response(JSON.stringify({ announcements }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Verify admin for POST, PUT, DELETE
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

    // POST - Create announcement
    if (req.method === 'POST') {
      const {
        title,
        content,
        type,
        target,
        image_url,
        link_url,
        link_text,
        priority,
        start_date,
        end_date,
      } = await req.json()

      if (!title || !content) {
        return new Response(JSON.stringify({ error: 'Title and content are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { data: announcement, error } = await supabaseClient
        .from('announcements')
        .insert({
          title,
          content,
          type: type || 'general',
          target: target || 'users',
          image_url,
          link_url,
          link_text,
          priority: priority || 'normal',
          start_date: start_date || new Date().toISOString(),
          end_date,
          created_by: user.id,
          active: true,
        })
        .select()
        .single()

      if (error) throw error

      console.log('✅ Announcement created:', announcement.id)
      console.log('🎯 Target:', target)

      // Create notifications for all users if target includes 'users' or 'both'
      if (target === 'users' || target === 'both' || !target) {
        console.log('📢 Creating notifications for users...')
        const { data: users, error: usersError } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('role', 'student')

        if (usersError) {
          console.error('❌ Error fetching users:', usersError)
        } else {
          console.log(`👥 Found ${users?.length || 0} students`)
        }

        if (users && users.length > 0) {
          const notifications = users.map(u => ({
            user_id: u.id,
            type: 'announcement',
            title: `📢 ${title}`,
            message: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
            read: false,
          }))

          console.log(`📨 Inserting ${notifications.length} notifications...`)
          const { error: notifError } = await supabaseClient
            .from('notifications')
            .insert(notifications)

          if (notifError) {
            console.error('❌ Error creating notifications:', notifError)
          } else {
            console.log('✅ Notifications created successfully')
          }
        }
      }

      return new Response(JSON.stringify({ announcement, success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // PUT - Update announcement
    if (req.method === 'PUT') {
      if (!announcementId) {
        return new Response(JSON.stringify({ error: 'Announcement ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const updateData = await req.json()

      const { data: announcement, error } = await supabaseClient
        .from('announcements')
        .update(updateData)
        .eq('id', announcementId)
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify({ announcement, success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // DELETE - Delete announcement
    if (req.method === 'DELETE') {
      if (!announcementId) {
        return new Response(JSON.stringify({ error: 'Announcement ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { error } = await supabaseClient
        .from('announcements')
        .delete()
        .eq('id', announcementId)

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
