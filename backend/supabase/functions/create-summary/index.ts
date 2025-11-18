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

        const { title, course, courseCode, category, difficulty, description, readTime, isPremium, sections } = await req.json();

        // Validate required fields
        if (!title || !courseCode || !sections || sections.length === 0) {
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
                    description: description,
                    created_by: user.id
                })
                .select()
                .single();

            if (courseError) throw courseError;
            courseId = newCourse.id;
        }

        // Create summary
        const { data: summary, error: summaryError } = await supabase
            .from('summaries')
            .insert({
                title,
                course_id: courseId,
                course_code: courseCode,
                category,
                difficulty,
                description,
                read_time: readTime,
                is_premium: isPremium || false,
                created_by: user.id
            })
            .select()
            .single();

        if (summaryError) throw summaryError;

        // Create sections and topics
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            
            const { data: createdSection, error: sectionError } = await supabase
                .from('summary_sections')
                .insert({
                    summary_id: summary.id,
                    title: section.title,
                    order_index: i
                })
                .select()
                .single();

            if (sectionError) throw sectionError;

            // Create topics for this section
            if (section.topics && section.topics.length > 0) {
                const topicsToInsert = section.topics.map((topic: any, j: number) => ({
                    section_id: createdSection.id,
                    subtitle: topic.subtitle,
                    content: topic.content,
                    order_index: j
                }));

                const { error: topicsError } = await supabase
                    .from('summary_topics')
                    .insert(topicsToInsert);

                if (topicsError) throw topicsError;
            }
        }

        return new Response(
            JSON.stringify({ data: summary, message: 'Summary created successfully' }),
            { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
