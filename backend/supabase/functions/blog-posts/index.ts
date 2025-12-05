import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const method = req.method;

    // GET - Fetch blog posts
    if (method === 'GET') {
      const slug = url.searchParams.get('slug');
      const category = url.searchParams.get('category');
      const status = url.searchParams.get('status') || 'published';
      const featured = url.searchParams.get('featured');
      const limit = url.searchParams.get('limit');

      let query = supabase
        .from('blog_posts')
        .select('*');

      // Filter by slug (for single post)
      if (slug) {
        query = query.eq('slug', slug).single();
      } else {
        // Filter by status
        if (status !== 'all') {
          query = query.eq('status', status);
        }

        // Filter by category
        if (category && category !== 'all') {
          query = query.eq('category', category);
        }

        // Filter by featured
        if (featured === 'true') {
          query = query.eq('featured', true);
        }

        // Apply limit
        if (limit) {
          query = query.limit(parseInt(limit));
        }

        // Order by published date
        query = query.order('published_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;

      // Increment view count if fetching single post
      if (slug && data) {
        await supabase
          .from('blog_posts')
          .update({ views: (data as any).views + 1 })
          .eq('slug', slug);
      }

      return new Response(JSON.stringify({ posts: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // POST - Create new blog post (admin only)
    if (method === 'POST') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        });
      }

      const body = await req.json();
      const { title, slug, excerpt, content, image_url, category, author, read_time, status, featured } = body;

      // Validate required fields
      if (!title || !slug || !excerpt || !content || !category || !author) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      const postData: any = {
        title,
        slug,
        excerpt,
        content,
        category,
        author,
        read_time: read_time || '5 min read',
        status: status || 'draft',
        featured: featured || false,
      };

      if (image_url) {
        postData.image_url = image_url;
      }

      if (status === 'published' && !postData.published_at) {
        postData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ post: data, message: 'Blog post created successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      });
    }

    // PUT - Update blog post (admin only)
    if (method === 'PUT') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        });
      }

      const postId = url.searchParams.get('id');
      if (!postId) {
        return new Response(JSON.stringify({ error: 'Post ID required' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      const body = await req.json();
      const updateData: any = { ...body };

      // Set published_at if status is being changed to published
      if (body.status === 'published' && !updateData.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ post: data, message: 'Blog post updated successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // DELETE - Delete blog post (admin only)
    if (method === 'DELETE') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        });
      }

      const postId = url.searchParams.get('id');
      if (!postId) {
        return new Response(JSON.stringify({ error: 'Post ID required' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      return new Response(JSON.stringify({ message: 'Blog post deleted successfully' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
