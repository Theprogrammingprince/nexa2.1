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

    const url = new URL(req.url)
    const studentId = url.searchParams.get('student_id')

    // If student_id is provided, get detailed info for that student
    if (studentId) {
      // Get student profile
      const { data: student, error: studentError } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', studentId)
        .eq('role', 'student')
        .single()

      if (studentError || !student) {
        return new Response(JSON.stringify({ error: 'Student not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      // Get student's test results
      const { data: testResults } = await supabaseClient
        .from('test_results')
        .select(`
          *,
          tests (
            title,
            course_code,
            total_questions
          )
        `)
        .eq('user_id', studentId)
        .order('created_at', { ascending: false })

      // Get student's summaries viewed
      const { data: summariesViewed } = await supabaseClient
        .from('user_activity_log')
        .select('*')
        .eq('user_id', studentId)
        .eq('activity_type', 'summary_viewed')
        .order('created_at', { ascending: false })
        .limit(10)

      // Get student's notes
      const { data: notes } = await supabaseClient
        .from('user_notes')
        .select('*')
        .eq('user_id', studentId)
        .order('created_at', { ascending: false })

      // Calculate stats
      const totalTests = testResults?.length || 0
      const averageScore = totalTests > 0
        ? testResults!.reduce((sum, test) => sum + test.score, 0) / totalTests
        : 0
      const highestScore = totalTests > 0
        ? Math.max(...testResults!.map(test => test.score))
        : 0
      const lowestScore = totalTests > 0
        ? Math.min(...testResults!.map(test => test.score))
        : 0

      // Get most taken course
      const courseCounts: { [key: string]: number } = {}
      testResults?.forEach(test => {
        const courseCode = test.tests?.course_code || 'Unknown'
        courseCounts[courseCode] = (courseCounts[courseCode] || 0) + 1
      })
      const mostTakenCourse = Object.keys(courseCounts).length > 0
        ? Object.entries(courseCounts).sort((a, b) => b[1] - a[1])[0]
        : null

      // Get highest scoring course
      const courseScores: { [key: string]: { total: number; count: number } } = {}
      testResults?.forEach(test => {
        const courseCode = test.tests?.course_code || 'Unknown'
        if (!courseScores[courseCode]) {
          courseScores[courseCode] = { total: 0, count: 0 }
        }
        courseScores[courseCode].total += test.score
        courseScores[courseCode].count += 1
      })
      const highestScoringCourse = Object.keys(courseScores).length > 0
        ? Object.entries(courseScores)
            .map(([course, data]) => ({ course, average: data.total / data.count }))
            .sort((a, b) => b.average - a.average)[0]
        : null

      return new Response(
        JSON.stringify({
          student,
          stats: {
            totalTests,
            averageScore: Math.round(averageScore * 100) / 100,
            highestScore,
            lowestScore,
            totalNotes: notes?.length || 0,
            summariesViewed: summariesViewed?.length || 0,
            mostTakenCourse: mostTakenCourse ? {
              course: mostTakenCourse[0],
              count: mostTakenCourse[1]
            } : null,
            highestScoringCourse: highestScoringCourse ? {
              course: highestScoringCourse.course,
              average: Math.round(highestScoringCourse.average * 100) / 100
            } : null,
          },
          recentTests: testResults?.slice(0, 10) || [],
          recentActivity: summariesViewed || [],
          notes: notes || [],
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Otherwise, get list of all students with basic stats
    const { data: students, error: studentsError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .order('created_at', { ascending: false })

    if (studentsError) {
      throw studentsError
    }

    // Get test counts and average scores for all students
    const studentsWithStats = await Promise.all(
      students.map(async (student) => {
        const { data: testResults } = await supabaseClient
          .from('test_results')
          .select('score')
          .eq('user_id', student.id)

        const totalTests = testResults?.length || 0
        const averageScore = totalTests > 0
          ? testResults!.reduce((sum, test) => sum + test.score, 0) / totalTests
          : 0

        return {
          ...student,
          totalTests,
          averageScore: Math.round(averageScore * 100) / 100,
        }
      })
    )

    return new Response(
      JSON.stringify({ students: studentsWithStats }),
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
