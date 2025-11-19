import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // Get user_id from query parameter
        const url = new URL(req.url);
        const userId = url.searchParams.get('user_id');
        
        if (!userId) {
            return new Response(
                JSON.stringify({ error: 'user_id parameter is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.log('📊 Fetching stats for user:', userId);
        
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? '',
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? '',
        );

        // Get all test submissions for stats calculation
        const { data: allSubmissions, error: submissionsError } = await supabase
            .from('test_submissions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (submissionsError) throw submissionsError;

        // Calculate stats
        const totalTests = allSubmissions?.length || 0;
        const averageScore = totalTests > 0
            ? Math.round(allSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / totalTests)
            : 0;
        
        // Calculate course progress (percentage of courses with tests taken)
        const { data: allCourses } = await supabase
            .from('courses')
            .select('id')
            .eq('is_active', true);
        
        const coursesWithTests = new Set(allSubmissions?.map(s => s.course_id) || []);
        const courseProgress = allCourses?.length > 0
            ? Math.round((coursesWithTests.size / allCourses.length) * 100)
            : 0;

        // Calculate attendance (tests taken this week vs expected)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const testsThisWeek = allSubmissions?.filter(s => 
            new Date(s.created_at) >= oneWeekAgo
        ).length || 0;
        
        // Assume 3 tests per week is 100% attendance
        const attendance = Math.min(Math.round((testsThisWeek / 3) * 100), 100);

        // Get last 30 days performance for chart
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentSubmissions = allSubmissions?.filter(s =>
            new Date(s.created_at) >= thirtyDaysAgo
        ) || [];

        // Group by date for chart
        const performanceData = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayTests = recentSubmissions.filter(s =>
                s.created_at.startsWith(dateStr)
            );
            
            const avgScore = dayTests.length > 0
                ? Math.round(dayTests.reduce((sum, s) => sum + (s.score || 0), 0) / dayTests.length)
                : 0;
            
            performanceData.push({
                date: dateStr,
                score: avgScore,
                tests: dayTests.length
            });
        }

        // Get recent test submissions with course info
        const { data: recentTests, error: testsError } = await supabase
            .from('test_submissions')
            .select(`
                id,
                score,
                total_questions,
                correct_answers,
                created_at,
                course_id
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(5);

        if (testsError) throw testsError;

        // Enrich with course names
        const enrichedTests = await Promise.all(
            (recentTests || []).map(async (test) => {
                const { data: course } = await supabase
                    .from('courses')
                    .select('code, title')
                    .eq('id', test.course_id)
                    .single();
                
                return {
                    ...test,
                    course_code: course?.code || 'Unknown',
                    course_title: course?.title || 'Unknown Course'
                };
            })
        );

        return new Response(
            JSON.stringify({ 
                stats: {
                    totalTests,
                    averageScore,
                    courseProgress,
                    attendance
                },
                performanceData,
                recentTests: enrichedTests
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
