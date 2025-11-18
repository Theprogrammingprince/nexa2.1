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
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? '',
            Deno.env.get("SUPABASE_ANON_KEY") ?? '',
            {
                global: {
                    headers: { Authorization: req.headers.get('Authorization')! },
                },
            }
        );

        // Check if user is admin
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin') {
            return new Response(
                JSON.stringify({ error: 'Forbidden: Admin access required' }),
                { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get total students count
        const { count: totalStudents } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'student');

        // Get active tests count
        const { count: activeTests } = await supabase
            .from('tests')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'active');

        // Get average performance
        const { data: avgPerformance } = await supabase
            .from('user_stats')
            .select('average_score');

        const avgScore = avgPerformance && avgPerformance.length > 0
            ? avgPerformance.reduce((sum, stat) => sum + (stat.average_score || 0), 0) / avgPerformance.length
            : 0;

        // Get recent tests with stats
        const { data: recentTests } = await supabase
            .from('tests')
            .select(`
                *,
                test_submissions(count)
            `)
            .order('created_at', { ascending: false })
            .limit(10);

        // Get top performing students
        const { data: topStudents } = await supabase
            .from('user_stats')
            .select(`
                *,
                profiles(full_name)
            `)
            .order('average_score', { ascending: false })
            .limit(5);

        // Get recent submissions
        const { data: recentSubmissions } = await supabase
            .from('test_submissions')
            .select(`
                *,
                profiles(full_name),
                tests(title)
            `)
            .order('submitted_at', { ascending: false })
            .limit(10);

        return new Response(
            JSON.stringify({ 
                stats: {
                    totalStudents: totalStudents || 0,
                    activeTests: activeTests || 0,
                    avgPerformance: avgScore.toFixed(1)
                },
                recentTests,
                topStudents,
                recentSubmissions
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
