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

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get user stats
        const { data: stats, error: statsError } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (statsError) throw statsError;

        // Get recent test submissions
        const { data: recentTests, error: testsError } = await supabase
            .from('test_submissions')
            .select(`
                *,
                tests(title, course_code)
            `)
            .eq('user_id', user.id)
            .order('submitted_at', { ascending: false })
            .limit(5);

        if (testsError) throw testsError;

        // Get progress on summaries
        const { data: progress, error: progressError } = await supabase
            .from('user_progress')
            .select(`
                *,
                summaries(title, course_code)
            `)
            .eq('user_id', user.id)
            .order('last_accessed', { ascending: false })
            .limit(5);

        if (progressError) throw progressError;

        // Get upcoming assignments
        const { data: upcomingAssignments, error: assignmentsError } = await supabase
            .from('assignments')
            .select('*')
            .eq('user_id', user.id)
            .eq('completed', false)
            .gte('due_date', new Date().toISOString())
            .order('due_date', { ascending: true })
            .limit(5);

        if (assignmentsError) throw assignmentsError;

        return new Response(
            JSON.stringify({ 
                stats,
                recentTests,
                progress,
                upcomingAssignments
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
