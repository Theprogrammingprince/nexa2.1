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
        const courseId = url.searchParams.get('courseId');
        const limit = url.searchParams.get('limit');

        if (!courseId) {
            return new Response(
                JSON.stringify({ error: 'Course ID is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get course details
        const { data: course, error: courseError } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .eq('is_active', true)
            .single();

        if (courseError) throw courseError;

        if (!course) {
            return new Response(
                JSON.stringify({ error: 'Course not found or inactive' }),
                { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Build query for questions (using new schema with question_text, option_a, etc.)
        let query = supabase
            .from('questions')
            .select('id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation')
            .eq('course_id', courseId);

        // Apply limit if provided
        if (limit) {
            query = query.limit(parseInt(limit));
        }

        const { data: questions, error: questionsError } = await query;

        if (questionsError) throw questionsError;

        console.log(`📚 Found ${questions?.length || 0} questions for course`);

        // Shuffle questions using Fisher-Yates algorithm for better randomization
        const shuffledQuestions = questions ? [...questions] : [];
        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
        }

        console.log(`🔀 Shuffled and returning ${shuffledQuestions.length} questions`);

        return new Response(
            JSON.stringify({ 
                course, 
                questions: shuffledQuestions,
                total_count: questions?.length || 0
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error fetching course questions:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
