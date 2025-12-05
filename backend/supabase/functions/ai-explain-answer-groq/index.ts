import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Groq API Key - FREE and FAST!
// Get it from: https://console.groq.com/keys
const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

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

        if (!questionId || !questionText || !courseId) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Get course details
        const { data: course } = await supabase
            .from('courses')
            .select('code, title, department, level')
            .eq('id', courseId)
            .single();

        // Get question explanation
        const { data: question } = await supabase
            .from('questions')
            .select('explanation')
            .eq('id', questionId)
            .single();

        // Fetch course materials
        const { data: summaries } = await supabase
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

        // Format options
        let optionsText = '';
        if (options && questionType === 'multiple_choice') {
            optionsText = `\nOptions:\nA. ${options.option_a || 'N/A'}\nB. ${options.option_b || 'N/A'}`;
            if (options.option_c) optionsText += `\nC. ${options.option_c}`;
            if (options.option_d) optionsText += `\nD. ${options.option_d}`;
        }

        const systemPrompt = `You are an expert educational AI tutor specializing in ${course?.department || 'various subjects'}. Help students understand their mistakes with clear, encouraging explanations.`;

        const userPrompt = `Course: ${course?.code || 'Unknown'} - ${course?.title || 'Unknown'} (${course?.level || 'Unknown'})

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

Keep your explanation concise but thorough (100-200 words). Use a friendly, encouraging tone.`;

        if (!GROQ_API_KEY) {
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

        // Call Groq API (OpenAI-compatible)
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant', // Fast and free
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.text();
            console.error('Groq API error:', errorData);
            
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

        const groqData = await groqResponse.json();
        const aiExplanation = groqData.choices[0]?.message?.content || 'Unable to generate explanation';

        return new Response(
            JSON.stringify({ 
                explanation: aiExplanation,
                source: 'ai',
                provider: 'groq',
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
