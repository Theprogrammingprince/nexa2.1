import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// You'll need to add your OpenAI API key to Supabase secrets
// Run: supabase secrets set OPENAI_API_KEY=your_key_here
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

interface ExplainRequest {
    questionId: string;
    questionText: string;
    questionType: string;
    userAnswer: string;
    correctAnswer: string;
    options?: {
        option_a?: string;
        option_b?: string;
        option_c?: string;
        option_d?: string;
    };
    courseId: string;
}

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

        const requestData: ExplainRequest = await req.json();
        const { questionId, questionText, questionType, userAnswer, correctAnswer, options, courseId } = requestData;

        // Validate required fields
        if (!questionId || !questionText || !courseId) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get course details
        const { data: course, error: courseError } = await supabase
            .from('courses')
            .select('code, title, department, level')
            .eq('id', courseId)
            .single();

        if (courseError) {
            console.error('Error fetching course:', courseError);
        }

        // Get question explanation from database if available
        const { data: question, error: questionError } = await supabase
            .from('questions')
            .select('explanation')
            .eq('id', questionId)
            .single();

        if (questionError) {
            console.error('Error fetching question:', questionError);
        }

        // Fetch course materials (summaries) for context
        const { data: summaries, error: summariesError } = await supabase
            .from('summaries')
            .select(`
                title,
                description,
                summary_sections (
                    title,
                    summary_topics (
                        subtitle,
                        content
                    )
                )
            `)
            .eq('course_id', courseId)
            .limit(3);

        if (summariesError) {
            console.error('Error fetching summaries:', summariesError);
        }

        // Build context from course materials
        let courseMaterialContext = '';
        if (summaries && summaries.length > 0) {
            courseMaterialContext = '\n\nRelevant Course Material:\n';
            summaries.forEach((summary: any) => {
                courseMaterialContext += `\n### ${summary.title}\n`;
                if (summary.description) {
                    courseMaterialContext += `${summary.description}\n`;
                }
                if (summary.summary_sections) {
                    summary.summary_sections.forEach((section: any) => {
                        courseMaterialContext += `\n#### ${section.title}\n`;
                        if (section.summary_topics) {
                            section.summary_topics.slice(0, 2).forEach((topic: any) => {
                                courseMaterialContext += `**${topic.subtitle}**: ${topic.content.substring(0, 200)}...\n`;
                            });
                        }
                    });
                }
            });
        }

        // Format the options for display
        let optionsText = '';
        if (options && questionType === 'multiple_choice') {
            optionsText = `\nOptions:\nA. ${options.option_a || 'N/A'}\nB. ${options.option_b || 'N/A'}`;
            if (options.option_c) optionsText += `\nC. ${options.option_c}`;
            if (options.option_d) optionsText += `\nD. ${options.option_d}`;
        }

        // Build the prompt for OpenAI
        const systemPrompt = `You are an expert educational AI tutor specializing in ${course?.department || 'various subjects'}. Your role is to help students understand why they got a question wrong and guide them to the correct understanding. Be encouraging, clear, and pedagogical.`;

        const userPrompt = `
Course: ${course?.code || 'Unknown'} - ${course?.title || 'Unknown'} (${course?.level || 'Unknown'})

Question: ${questionText}
${optionsText}

Student's Answer: ${userAnswer || '(No answer provided)'}
Correct Answer: ${correctAnswer}

${question?.explanation ? `Instructor's Explanation: ${question.explanation}\n` : ''}
${courseMaterialContext}

Please provide a comprehensive explanation that:
1. Clearly explains why the student's answer was incorrect (if applicable)
2. Explains why the correct answer is right, using concepts from the course material when available
3. Provides a clear breakdown of the key concepts involved
4. Offers a study tip or mnemonic to help remember this concept
5. If course material is provided, reference specific concepts from it

Keep your explanation concise but thorough (200-300 words). Use a friendly, encouraging tone.
`;

        // Check if OpenAI API key is configured
        if (!OPENAI_API_KEY) {
            // Fallback to a basic explanation if no API key
            const fallbackExplanation = generateFallbackExplanation(
                questionText,
                userAnswer,
                correctAnswer,
                question?.explanation,
                questionType
            );

            return new Response(
                JSON.stringify({ 
                    explanation: fallbackExplanation,
                    source: 'fallback'
                }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Call OpenAI API
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Using the cost-effective model
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!openaiResponse.ok) {
            const errorData = await openaiResponse.text();
            console.error('OpenAI API error:', errorData);
            
            // Fallback to basic explanation
            const fallbackExplanation = generateFallbackExplanation(
                questionText,
                userAnswer,
                correctAnswer,
                question?.explanation,
                questionType
            );

            return new Response(
                JSON.stringify({ 
                    explanation: fallbackExplanation,
                    source: 'fallback',
                    error: 'AI service temporarily unavailable'
                }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const aiData = await openaiResponse.json();
        const aiExplanation = aiData.choices[0]?.message?.content || 'Unable to generate explanation';

        return new Response(
            JSON.stringify({ 
                explanation: aiExplanation,
                source: 'ai',
                courseMaterial: summaries && summaries.length > 0
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error in ai-explain-answer:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});

// Fallback explanation generator when AI is not available
function generateFallbackExplanation(
    questionText: string,
    userAnswer: string,
    correctAnswer: string,
    dbExplanation?: string,
    questionType?: string
): string {
    let explanation = `## Understanding Your Answer\n\n`;
    
    if (userAnswer && userAnswer !== correctAnswer) {
        explanation += `**Your Answer:** ${userAnswer}\n`;
        explanation += `**Correct Answer:** ${correctAnswer}\n\n`;
    }
    
    if (dbExplanation) {
        explanation += `### Explanation\n${dbExplanation}\n\n`;
    } else {
        explanation += `### Why This Matters\n`;
        explanation += `The correct answer is **${correctAnswer}**. `;
        
        if (questionType === 'fill_in_blank') {
            explanation += `For fill-in-the-blank questions, the answer must match exactly. Make sure to review the specific terminology and definitions from your course material.\n\n`;
        } else {
            explanation += `Review the question carefully and consider the key concepts being tested.\n\n`;
        }
    }
    
    explanation += `### Study Tip\n`;
    explanation += `Review your course notes and materials related to this topic. Pay special attention to definitions, key concepts, and examples that relate to this question.\n\n`;
    explanation += `*Note: For a more detailed AI-powered explanation, please contact your administrator to configure the AI service.*`;
    
    return explanation;
}
