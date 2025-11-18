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

        const { title, course, courseCode, duration, difficulty, passingScore, questions } = await req.json();

        // Validate required fields
        if (!title || !courseCode || !duration || !questions || questions.length === 0) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get or create course
        let courseId;
        const { data: existingCourse } = await supabase
            .from('courses')
            .select('id')
            .eq('code', courseCode)
            .single();

        if (existingCourse) {
            courseId = existingCourse.id;
        } else {
            const { data: newCourse, error: courseError } = await supabase
                .from('courses')
                .insert({
                    title: course || title,
                    code: courseCode,
                    created_by: user.id
                })
                .select()
                .single();

            if (courseError) throw courseError;
            courseId = newCourse.id;
        }

        // Create test
        const { data: test, error: testError } = await supabase
            .from('tests')
            .insert({
                title,
                course_id: courseId,
                course_code: courseCode,
                duration: parseInt(duration),
                total_questions: questions.length,
                passing_score: parseInt(passingScore) || 70,
                difficulty,
                status: 'active',
                created_by: user.id
            })
            .select()
            .single();

        if (testError) throw testError;

        // Create questions
        const questionsToInsert = questions.map((q: any, index: number) => ({
            test_id: test.id,
            question: q.question,
            options: q.options,
            correct_answer: q.correctAnswer,
            explanation: q.explanation || '',
            order_index: index
        }));

        const { error: questionsError } = await supabase
            .from('questions')
            .insert(questionsToInsert);

        if (questionsError) throw questionsError;

        return new Response(
            JSON.stringify({ data: test, message: 'Test created successfully' }),
            { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
