import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

serve(async (req) => {
    console.log('=== MANAGE-NOTES REQUEST ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    
    if (req.method === 'OPTIONS') {
        console.log('✅ CORS preflight request');
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // Check authorization header
        const authHeader = req.headers.get('Authorization');
        console.log('Auth header present:', !!authHeader);
        
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? '',
            Deno.env.get("SUPABASE_ANON_KEY") ?? '',
            {
                global: {
                    headers: { Authorization: authHeader! },
                },
            }
        );

        // TEMPORARY: Skip authentication for testing
        console.log('⚠️ AUTHENTICATION DISABLED FOR TESTING');
        
        // Use a hardcoded user ID for now
        const user = { id: '00000000-0000-0000-0000-000000000000' };
        console.log('🧪 Using test user ID:', user.id);

        const url = new URL(req.url);
        const method = req.method;
        const summaryId = url.searchParams.get('summary_id');
        const fetchAll = url.searchParams.get('all') === 'true';

        // GET - Fetch note(s) for a summary
        if (method === 'GET') {
            console.log('📖 GET request - Summary ID:', summaryId, 'Fetch all:', fetchAll);
            
            if (!summaryId) {
                console.error('❌ Missing summary_id');
                return new Response(
                    JSON.stringify({ error: 'Summary ID is required' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            // Fetch all notes for this summary
            if (fetchAll) {
                console.log('📚 Fetching all notes for user:', user.id, 'summary:', summaryId);
                const { data, error } = await supabase
                    .from('user_notes')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('summary_id', summaryId)
                    .order('updated_at', { ascending: false });

                if (error) {
                    console.error('❌ Error fetching all notes:', error.message);
                    throw error;
                }

                console.log('✅ Found', data?.length || 0, 'notes');
                return new Response(
                    JSON.stringify({ notes: data || [] }),
                    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            // Fetch single note
            console.log('📄 Fetching single note for user:', user.id, 'summary:', summaryId);
            const { data, error } = await supabase
                .from('user_notes')
                .select('*')
                .eq('user_id', user.id)
                .eq('summary_id', summaryId)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('❌ Error fetching note:', error.message);
                throw error;
            }

            console.log('✅ Note found:', !!data);
            return new Response(
                JSON.stringify({ note: data || null }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // POST - Create or update note
        if (method === 'POST') {
            console.log('💾 POST request - Saving note');
            const body = await req.json();
            const { summary_id, content, highlights, formatting } = body;
            
            console.log('📝 Note data - Summary ID:', summary_id, 'Content length:', content?.length || 0);

            if (!summary_id || !content) {
                console.error('❌ Missing required fields');
                return new Response(
                    JSON.stringify({ error: 'Summary ID and content are required' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            console.log('💿 Inserting new note for user:', user.id);
            const { data, error } = await supabase
                .from('user_notes')
                .insert({
                    user_id: user.id,
                    summary_id,
                    content,
                    highlights: highlights || [],
                    formatting: formatting || {}
                })
                .select()
                .single();

            if (error) {
                console.error('❌ Error saving note:', error.message);
                throw error;
            }

            console.log('✅ Note saved successfully, ID:', data.id);
            return new Response(
                JSON.stringify({ note: data, message: 'Note saved successfully' }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // DELETE - Delete note
        if (method === 'DELETE') {
            const noteId = url.searchParams.get('note_id');
            console.log('🗑️ DELETE request - Note ID:', noteId, 'Summary ID:', summaryId);
            
            if (!noteId && !summaryId) {
                console.error('❌ Missing note_id or summary_id');
                return new Response(
                    JSON.stringify({ error: 'Note ID or Summary ID is required' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            let query = supabase.from('user_notes').delete().eq('user_id', user.id);
            
            if (noteId) {
                console.log('🎯 Deleting by note ID:', noteId);
                query = query.eq('id', noteId);
            } else {
                console.log('🎯 Deleting by summary ID:', summaryId);
                query = query.eq('summary_id', summaryId);
            }

            const { error } = await query;

            if (error) {
                console.error('❌ Error deleting note:', error.message);
                throw error;
            }

            console.log('✅ Note deleted successfully');
            return new Response(
                JSON.stringify({ message: 'Note deleted successfully' }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.error('❌ Method not allowed:', method);
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('💥 FATAL ERROR:', error.message || error);
        console.error('Stack:', error.stack);
        return new Response(
            JSON.stringify({ error: error.message || 'Internal server error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
