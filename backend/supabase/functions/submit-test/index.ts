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

        const { testId, answers, timeTaken } = await req.json();

        if (!testId || !answers) {
            return new Response(
                JSON.stringify({ error: 'Test ID and answers are required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get all questions with correct answers
        const { data: questions, error: questionsError } = await supabase
            .from('questions')
            .select('id, correct_answer')
            .eq('test_id', testId);

        if (questionsError) throw questionsError;

        // Calculate score
        let correctCount = 0;
        questions.forEach((question: any) => {
            if (answers[question.id] === question.correct_answer) {
                correctCount++;
            }
        });

        const score = correctCount;
        const percentage = (correctCount / questions.length) * 100;

        // Save submission
        const { data: submission, error: submissionError } = await supabase
            .from('test_submissions')
            .insert({
                test_id: testId,
                user_id: user.id,
                answers,
                score,
                percentage,
                time_taken: timeTaken,
                status: 'submitted',
                submitted_at: new Date().toISOString()
            })
            .select()
            .single();

        if (submissionError) throw submissionError;

        // Update user stats
        const { data: stats } = await supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (stats) {
            const newTotalTests = stats.total_tests_taken + 1;
            const newAverageScore = ((stats.average_score * stats.total_tests_taken) + percentage) / newTotalTests;

            await supabase
                .from('user_stats')
                .update({
                    total_tests_taken: newTotalTests,
                    average_score: newAverageScore,
                    last_activity: new Date().toISOString()
                })
                .eq('user_id', user.id);
        }

        // Create notification
        await supabase
            .from('notifications')
            .insert({
                user_id: user.id,
                type: 'grade',
                title: 'Test Submitted',
                message: `You scored ${percentage.toFixed(1)}% on the test`,
                read: false
            });

        return new Response(
            JSON.stringify({ 
                data: submission,
                score,
                percentage,
                totalQuestions: questions.length,
                correctAnswers: correctCount
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
