import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
};

serve(async (req) => {
    console.log('=== UPLOAD-PROFILE-IMAGE REQUEST ===');
    console.log('Method:', req.method);
    
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? '',
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? '',
        );

        // Get authenticated user
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: 'No authorization header' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: userError } = await supabase.auth.getUser(token);

        if (userError || !user) {
            console.error('❌ User auth error:', userError?.message);
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        console.log('✅ User authenticated:', user.id, user.email);

        // POST - Upload profile image
        if (req.method === 'POST') {
            const formData = await req.formData();
            const file = formData.get('file') as File;

            if (!file) {
                return new Response(
                    JSON.stringify({ error: 'No file provided' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            console.log('📤 Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                return new Response(
                    JSON.stringify({ error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                return new Response(
                    JSON.stringify({ error: 'File too large. Maximum size is 5MB.' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            // Delete old profile image if exists
            const { data: profile } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single();

            if (profile?.avatar_url) {
                const oldFileName = profile.avatar_url.split('/').pop();
                if (oldFileName) {
                    console.log('🗑️ Deleting old image:', oldFileName);
                    await supabase.storage
                        .from('profile-images')
                        .remove([`${user.id}/${oldFileName}`]);
                }
            }

            // Generate unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            console.log('💾 Uploading to:', filePath);

            // Convert File to ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('profile-images')
                .upload(filePath, uint8Array, {
                    contentType: file.type,
                    upsert: false,
                });

            if (uploadError) {
                console.error('❌ Upload error:', uploadError.message);
                throw uploadError;
            }

            console.log('✅ File uploaded:', uploadData.path);

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('profile-images')
                .getPublicUrl(filePath);

            console.log('🔗 Public URL:', publicUrl);

            // Update profile with new avatar URL
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', user.id);

            if (updateError) {
                console.error('❌ Profile update error:', updateError.message);
                throw updateError;
            }

            console.log('✅ Profile updated with new avatar');

            return new Response(
                JSON.stringify({ 
                    avatar_url: publicUrl,
                    message: 'Profile image uploaded successfully' 
                }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // DELETE - Remove profile image
        if (req.method === 'DELETE') {
            console.log('🗑️ Deleting profile image for user:', user.id);

            // Get current avatar URL
            const { data: profile } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single();

            if (profile?.avatar_url) {
                const fileName = profile.avatar_url.split('/').pop();
                if (fileName) {
                    const filePath = `${user.id}/${fileName}`;
                    
                    // Delete from storage
                    const { error: deleteError } = await supabase.storage
                        .from('profile-images')
                        .remove([filePath]);

                    if (deleteError) {
                        console.error('❌ Delete error:', deleteError.message);
                    }
                }
            }

            // Update profile to remove avatar URL
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: null })
                .eq('id', user.id);

            if (updateError) {
                console.error('❌ Profile update error:', updateError.message);
                throw updateError;
            }

            console.log('✅ Profile image deleted');

            return new Response(
                JSON.stringify({ message: 'Profile image deleted successfully' }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('💥 FATAL ERROR:', error.message || error);
        return new Response(
            JSON.stringify({ error: error.message || 'Internal server error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
