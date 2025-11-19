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

        // First, get ALL questions for the course to enable proper randomization
        const { data: allQuestions, error: questionsError } = await supabase
            .from('questions')
            .select('id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, explanation')
            .eq('course_id', courseId);

        if (questionsError) throw questionsError;

        console.log(`📚 Found ${allQuestions?.length || 0} total questions for course`);

        if (!allQuestions || allQuestions.length === 0) {
            return new Response(
                JSON.stringify({ 
                    course, 
                    questions: [],
                    total_count: 0
                }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Shuffle ALL questions first using Fisher-Yates algorithm
        const shuffledQuestions = [...allQuestions];
        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
        }

        // Then slice to get the requested number (this ensures different questions each time)
        const limitNum = limit ? parseInt(limit) : shuffledQuestions.length;
        const selectedQuestions = shuffledQuestions.slice(0, Math.min(limitNum, shuffledQuestions.length));

        console.log(`🔀 Shuffled ${shuffledQuestions.length} questions and returning ${selectedQuestions.length}`);

        return new Response(
            JSON.stringify({ 
                course, 
                questions: selectedQuestions,
                total_count: allQuestions.length
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
