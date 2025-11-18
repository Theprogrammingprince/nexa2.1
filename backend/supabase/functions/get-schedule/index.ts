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

        const { data: classes, error: classesError } = await supabase
            .from('schedule_classes')
            .select('*')
            .eq('user_id', user.id)
            .order('day_of_week', { ascending: true });

        if (classesError) throw classesError;

        const { data: assignments, error: assignmentsError } = await supabase
            .from('assignments')
            .select('*')
            .eq('user_id', user.id)
            .order('due_date', { ascending: true });

        if (assignmentsError) throw assignmentsError;

        const { data: studySessions, error: sessionsError } = await supabase
            .from('study_sessions')
            .select('*')
            .eq('user_id', user.id)
            .order('scheduled_date', { ascending: true });

        if (sessionsError) throw sessionsError;

        return new Response(
            JSON.stringify({ 
                classes,
                assignments,
                studySessions
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
