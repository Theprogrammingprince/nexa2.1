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

    // Get all students with their test results
    const { data: students } = await supabaseClient
      .from('profiles')
      .select('id, full_name, email, avatar_url, department, level')
      .eq('role', 'student')

    if (!students) {
      return new Response(JSON.stringify({ topPerformers: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get test results for all students
    const performersData = await Promise.all(
      students.map(async (student) => {
        const { data: testResults } = await supabaseClient
          .from('test_results')
          .select(`
            score,
            created_at,
            tests (
              course_code,
              title
            )
          `)
          .eq('user_id', student.id)

        if (!testResults || testResults.length === 0) {
          return null
        }

        // Calculate statistics
        const totalTests = testResults.length
        const averageScore = testResults.reduce((sum: number, test: any) => sum + test.score, 0) / totalTests
        const highestScore = Math.max(...testResults.map((test: any) => test.score))
        
        // Find highest scoring test
        const highestScoringTest = testResults.find((test: any) => test.score === highestScore)
        
        // Count courses taken
        const courseCounts: { [key: string]: { count: number; title: string } } = {}
        testResults.forEach((test: any) => {
          const courseCode = test.tests?.course_code || 'Unknown'
          const title = test.tests?.title || 'Unknown'
          if (!courseCounts[courseCode]) {
            courseCounts[courseCode] = { count: 0, title }
          }
          courseCounts[courseCode].count += 1
        })

        // Find most taken course
        const mostTakenCourse = Object.entries(courseCounts)
          .sort((a, b) => b[1].count - a[1].count)[0]

        // Calculate average score per course
        const courseScores: { [key: string]: { total: number; count: number; title: string } } = {}
        testResults.forEach((test: any) => {
          const courseCode = test.tests?.course_code || 'Unknown'
          const title = test.tests?.title || 'Unknown'
          if (!courseScores[courseCode]) {
            courseScores[courseCode] = { total: 0, count: 0, title }
          }
          courseScores[courseCode].total += test.score
          courseScores[courseCode].count += 1
        })

        // Find best performing course
        const bestCourse = Object.entries(courseScores)
          .map(([code, data]) => ({
            code,
            title: data.title,
            average: data.total / data.count,
            testsCount: data.count
          }))
          .sort((a, b) => b.average - a.average)[0]

        return {
          student: {
            id: student.id,
            name: student.full_name,
            email: student.email,
            avatar: student.avatar_url,
            department: student.department,
            level: student.level,
          },
          stats: {
            totalTests,
            averageScore: Math.round(averageScore * 100) / 100,
            highestScore,
            highestScoringTest: highestScoringTest ? {
              course: highestScoringTest.tests?.course_code,
              title: highestScoringTest.tests?.title,
              score: highestScoringTest.score,
            } : null,
            mostTakenCourse: mostTakenCourse ? {
              code: mostTakenCourse[0],
              title: mostTakenCourse[1].title,
              count: mostTakenCourse[1].count,
            } : null,
            bestPerformingCourse: bestCourse,
          },
        }
      })
    )

    // Filter out null values and sort by average score
    const topPerformers = performersData
      .filter((p) => p !== null)
      .sort((a, b) => b!.stats.averageScore - a!.stats.averageScore)
      .slice(0, 10) // Top 10 performers

    return new Response(
      JSON.stringify({ topPerformers }),
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
