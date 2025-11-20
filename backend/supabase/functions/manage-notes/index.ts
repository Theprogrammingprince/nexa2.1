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

        // Get authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const url = new URL(req.url);
        const method = req.method;
        const noteId = url.searchParams.get('note_id');
        const courseId = url.searchParams.get('course_id');

        // GET - Fetch notes
        if (method === 'GET') {
            let query = supabase
                .from('notes')
                .select('*')
                .eq('user_id', user.id)
                .order('updated_at', { ascending: false });

            if (courseId) {
                query = query.eq('course_id', courseId);
            }

            if (noteId) {
                query = query.eq('id', noteId).single();
            }

            const { data, error } = await query;

            if (error) throw error;

            return new Response(
                JSON.stringify({ notes: data }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // POST - Create new note
        if (method === 'POST') {
            const body = await req.json();
            const { course_id, title, content, highlights, tags, is_favorite } = body;

            if (!title || !content) {
                return new Response(
                    JSON.stringify({ error: 'Title and content are required' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            const { data, error } = await supabase
                .from('notes')
                .insert({
                    user_id: user.id,
                    course_id: course_id || null,
                    title,
                    content,
                    highlights: highlights || [],
                    tags: tags || [],
                    is_favorite: is_favorite || false
                })
                .select()
                .single();

            if (error) throw error;

            return new Response(
                JSON.stringify({ note: data, message: 'Note created successfully' }),
                { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // PUT - Update note
        if (method === 'PUT') {
            if (!noteId) {
                return new Response(
                    JSON.stringify({ error: 'Note ID is required' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            const body = await req.json();
            const { title, content, highlights, tags, is_favorite } = body;

            const updateData: any = {};
            if (title !== undefined) updateData.title = title;
            if (content !== undefined) updateData.content = content;
            if (highlights !== undefined) updateData.highlights = highlights;
            if (tags !== undefined) updateData.tags = tags;
            if (is_favorite !== undefined) updateData.is_favorite = is_favorite;

            const { data, error } = await supabase
                .from('notes')
                .update(updateData)
                .eq('id', noteId)
                .eq('user_id', user.id)
                .select()
                .single();

            if (error) throw error;

            return new Response(
                JSON.stringify({ note: data, message: 'Note updated successfully' }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // DELETE - Delete note
        if (method === 'DELETE') {
            if (!noteId) {
                return new Response(
                    JSON.stringify({ error: 'Note ID is required' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            const { error } = await supabase
                .from('notes')
                .delete()
                .eq('id', noteId)
                .eq('user_id', user.id);

            if (error) throw error;

            return new Response(
                JSON.stringify({ message: 'Note deleted successfully' }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error managing notes:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
