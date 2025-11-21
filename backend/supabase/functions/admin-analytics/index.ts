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

    // Verify admin user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Check if user is admin
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

    // Get overall statistics
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Total users
    const { count: totalUsers } = await supabaseClient
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student')

    // New users (last 30 days)
    const { count: newUsers } = await supabaseClient
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student')
      .gte('created_at', thirtyDaysAgo.toISOString())

    // Active users (last 7 days)
    const { data: recentActivity } = await supabaseClient
      .from('user_activity_log')
      .select('user_id')
      .gte('created_at', sevenDaysAgo.toISOString())

    const activeUsers = new Set(recentActivity?.map(a => a.user_id)).size

    // Total tests taken
    const { count: totalTests } = await supabaseClient
      .from('test_results')
      .select('*', { count: 'exact', head: true })

    // Tests taken (last 30 days)
    const { count: recentTests } = await supabaseClient
      .from('test_results')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString())

    // Average score
    const { data: allTestResults } = await supabaseClient
      .from('test_results')
      .select('score')

    const averageScore = allTestResults && allTestResults.length > 0
      ? allTestResults.reduce((sum: number, test: any) => sum + test.score, 0) / allTestResults.length
      : 0

    // Total summaries
    const { count: totalSummaries } = await supabaseClient
      .from('summaries')
      .select('*', { count: 'exact', head: true })

    // Premium users
    const { count: premiumUsers } = await supabaseClient
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student')
      .eq('subscription_tier', 'pro')

    // Support messages
    const { count: totalMessages } = await supabaseClient
      .from('support_messages')
      .select('*', { count: 'exact', head: true })

    const { count: unreadMessages } = await supabaseClient
      .from('support_messages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unread')

    // User growth over last 12 months
    const userGrowth = []
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)
      
      const { count } = await supabaseClient
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student')
        .gte('created_at', monthStart.toISOString())
        .lte('created_at', monthEnd.toISOString())

      userGrowth.push({
        month: monthStart.toLocaleString('default', { month: 'short', year: 'numeric' }),
        count: count || 0
      })
    }

    // Test activity over last 30 days
    const testActivity = []
    for (let i = 29; i >= 0; i--) {
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i + 1)
      
      const { count } = await supabaseClient
        .from('test_results')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', dayStart.toISOString())
        .lt('created_at', dayEnd.toISOString())

      testActivity.push({
        date: dayStart.toISOString().split('T')[0],
        count: count || 0
      })
    }

    // Most popular courses
    const { data: testsByCourse } = await supabaseClient
      .from('test_results')
      .select(`
        tests (
          course_code,
          title
        )
      `)

    const courseCounts: { [key: string]: { count: number; title: string } } = {}
    testsByCourse?.forEach((test: any) => {
      const courseCode = test.tests?.course_code || 'Unknown'
      const title = test.tests?.title || 'Unknown'
      if (!courseCounts[courseCode]) {
        courseCounts[courseCode] = { count: 0, title }
      }
      courseCounts[courseCode].count += 1
    })

    const popularCourses = Object.entries(courseCounts)
      .map(([code, data]) => ({ code, title: data.title, count: data.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Subscription revenue (if applicable)
    const { data: subscriptions } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')

    const monthlyRevenue = subscriptions?.length || 0 * 2000 // Assuming ₦2000 per subscription

    return new Response(
      JSON.stringify({
        overview: {
          totalUsers: totalUsers || 0,
          newUsers: newUsers || 0,
          activeUsers,
          premiumUsers: premiumUsers || 0,
          totalTests: totalTests || 0,
          recentTests: recentTests || 0,
          averageScore: Math.round(averageScore * 100) / 100,
          totalSummaries: totalSummaries || 0,
          totalMessages: totalMessages || 0,
          unreadMessages: unreadMessages || 0,
          monthlyRevenue,
        },
        charts: {
          userGrowth,
          testActivity,
          popularCourses,
        },
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
