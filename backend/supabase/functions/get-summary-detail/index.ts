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
        const summaryId = url.searchParams.get('id');

        if (!summaryId) {
            return new Response(
                JSON.stringify({ error: 'Summary ID is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get summary with sections and topics
        const { data: summary, error: summaryError } = await supabase
            .from('summaries')
            .select(`
                *,
                courses(title, code)
            `)
            .eq('id', summaryId)
            .single();

        if (summaryError) throw summaryError;

        // Get sections with topics
        const { data: sections, error: sectionsError } = await supabase
            .from('summary_sections')
            .select(`
                *,
                summary_topics(*)
            `)
            .eq('summary_id', summaryId)
            .order('order_index', { ascending: true });

        if (sectionsError) throw sectionsError;

        // Get user progress if authenticated
        const { data: { user } } = await supabase.auth.getUser();
        let progress = null;

        if (user) {
            const { data: progressData } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', user.id)
                .eq('summary_id', summaryId)
                .single();
            
            progress = progressData;
        }

        return new Response(
            JSON.stringify({ 
                summary: {
                    ...summary,
                    sections: sections.map(section => ({
                        ...section,
                        topics: section.summary_topics.sort((a: any, b: any) => a.order_index - b.order_index)
                    }))
                },
                progress
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
