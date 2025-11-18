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

        const url = new URL(req.url);
        const testId = url.searchParams.get('testId');

        if (!testId) {
            return new Response(
                JSON.stringify({ error: 'Test ID is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get test details
        const { data: test, error: testError } = await supabase
            .from('tests')
            .select('*')
            .eq('id', testId)
            .eq('status', 'active')
            .single();

        if (testError) throw testError;

        // Get questions (without correct answers for students)
        const { data: questions, error: questionsError } = await supabase
            .from('questions')
            .select('id, question, options, order_index')
            .eq('test_id', testId)
            .order('order_index', { ascending: true });

        if (questionsError) throw questionsError;

        return new Response(
            JSON.stringify({ test, questions }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
