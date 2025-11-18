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

        const { type, ...itemData } = await req.json();

        let data, error;

        if (type === 'class') {
            const result = await supabase
                .from('schedule_classes')
                .insert({
                    user_id: user.id,
                    ...itemData
                })
                .select()
                .single();
            data = result.data;
            error = result.error;
        } else if (type === 'assignment') {
            const result = await supabase
                .from('assignments')
                .insert({
                    user_id: user.id,
                    ...itemData
                })
                .select()
                .single();
            data = result.data;
            error = result.error;
        } else if (type === 'study_session') {
            const result = await supabase
                .from('study_sessions')
                .insert({
                    user_id: user.id,
                    ...itemData
                })
                .select()
                .single();
            data = result.data;
            error = result.error;
        } else {
            return new Response(
                JSON.stringify({ error: 'Invalid type. Must be class, assignment, or study_session' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        if (error) throw error;

        return new Response(
            JSON.stringify({ data, message: 'Schedule item created successfully' }),
            { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
