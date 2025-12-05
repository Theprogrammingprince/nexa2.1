import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = 're_VGNXzjwR_BrbmgG996twYLrs7A9vyWfQG';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ResetCodeData {
  code: string;
  email: string;
  timestamp: number;
  expiry: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { method } = req;
    const url = new URL(req.url);
    const action = url.searchParams.get('action'); // 'send' or 'verify' or 'reset'

    // SEND RESET CODE
    if (method === 'POST' && action === 'send') {
      console.log('=== FORGOT PASSWORD: SEND ACTION STARTED ===');
      const { email } = await req.json();
      console.log('Received email:', email);

      if (!email) {
        console.error('No email provided');
        return new Response(
          JSON.stringify({ error: 'Email is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if user exists in auth.users using service role
      console.log('Creating admin client...');
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      console.log('Fetching users from auth.users...');
      const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
      
      if (usersError) {
        console.error('Error fetching users:', usersError);
        return new Response(
          JSON.stringify({ error: 'Failed to verify user', details: usersError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`Found ${users?.length || 0} total users`);
      const user = users?.find(u => u.email?.toLowerCase() === email.toLowerCase());

      if (!user) {
        console.log('User not found for email:', email);
        return new Response(
          JSON.stringify({ error: 'Email not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('User found:', user.id);

      // Get profile for user's name
      console.log('Fetching profile for user:', user.id);
      const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      if (profileError) {
        console.warn('Profile fetch error (non-critical):', profileError.message);
      } else {
        console.log('Profile found:', profile?.full_name || 'No name');
      }

      // Generate 6-digit code
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
      console.log('Generated code:', code, 'Expiry:', new Date(expiry).toISOString());

      // Store reset code in database using admin client (bypasses RLS)
      console.log('Storing reset code in database...');
      const { error: insertError } = await supabaseAdmin
        .from('password_reset_codes')
        .insert({
          user_id: user.id,
          email: email,
          code: code,
          expiry: new Date(expiry).toISOString(),
          used: false,
        });

      if (insertError) {
        console.error('Error storing reset code:', JSON.stringify(insertError, null, 2));
        return new Response(
          JSON.stringify({ 
            error: 'Failed to generate reset code', 
            details: insertError.message,
            hint: insertError.hint,
            code: insertError.code
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Reset code stored successfully');

      // Send email via Resend
      console.log('Sending email via Resend...');
      console.log('From address: NEXA <noreply@nexaedu.ng>');
      console.log('To address:', email);
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'NEXA <noreply@nexaedu.ng>',
            to: [email],
            subject: 'Password Reset Code - NEXA',
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Password Reset</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
                    <tr>
                      <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                          <!-- Header -->
                          <tr>
                            <td style="background: linear-gradient(135deg, #101829 0%, #1a2744 100%); padding: 40px 30px; text-align: center;">
                              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">NEXA</h1>
                              <p style="margin: 10px 0 0; color: #e5e7eb; font-size: 14px;">Your Learning Platform</p>
                            </td>
                          </tr>
                          
                          <!-- Content -->
                          <tr>
                            <td style="padding: 40px 30px;">
                              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: 600;">Password Reset Request</h2>
                              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Hello ${profile?.full_name || user.email?.split('@')[0] || 'there'},
                              </p>
                              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                We received a request to reset your password. Use the verification code below to proceed:
                              </p>
                              
                              <!-- Code Box -->
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                  <td align="center" style="background-color: #f9fafb; border: 2px dashed #d1d5db; border-radius: 8px; padding: 30px;">
                                    <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #101829; font-family: 'Courier New', monospace;">
                                      ${code}
                                    </div>
                                    <p style="margin: 15px 0 0; color: #6b7280; font-size: 14px;">
                                      This code expires in <strong>5 minutes</strong>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                              
                              <p style="margin: 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                              </p>
                              
                              <!-- Security Notice -->
                              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                  <strong>Security Tip:</strong> Never share this code with anyone. NEXA staff will never ask for your verification code.
                                </p>
                              </div>
                            </td>
                          </tr>
                          
                          <!-- Footer -->
                          <tr>
                            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                                © ${new Date().getFullYear()} NEXA. All rights reserved.
                              </p>
                              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                This is an automated email. Please do not reply.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
              </html>
            `,
          }),
        });

        const resendData = await resendResponse.json();
        
        if (!resendResponse.ok) {
          console.error('Resend API error:', JSON.stringify(resendData, null, 2));
          console.error('Status:', resendResponse.status);
          throw new Error(`Failed to send email: ${resendData.message || 'Unknown error'}`);
        }

        console.log('Email sent successfully via Resend:', resendData.id);
        console.log('=== FORGOT PASSWORD: SEND ACTION COMPLETED ===');

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Reset code sent to your email',
            email: email 
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (emailError: any) {
        console.error('Email sending error:', emailError);
        console.error('Error message:', emailError.message);
        console.error('Error stack:', emailError.stack);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to send email. Please try again.',
            details: emailError.message 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // VERIFY CODE
    if (method === 'POST' && action === 'verify') {
      console.log('=== FORGOT PASSWORD: VERIFY ACTION STARTED ===');
      const { email, code } = await req.json();
      console.log('Verifying code for email:', email);

      if (!email || !code) {
        console.error('Missing email or code');
        return new Response(
          JSON.stringify({ error: 'Email and code are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create admin client for database operations
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      // Get the most recent unused code for this email
      console.log('Looking up reset code...');
      const { data: resetCode, error: codeError } = await supabaseAdmin
        .from('password_reset_codes')
        .select('*')
        .eq('email', email)
        .eq('code', code.toUpperCase())
        .eq('used', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (codeError || !resetCode) {
        console.error('Code lookup error:', codeError);
        return new Response(
          JSON.stringify({ error: 'Invalid verification code' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Reset code found:', resetCode.id);

      // Check if code is expired
      const expiryTime = new Date(resetCode.expiry).getTime();
      console.log('Checking expiry. Now:', Date.now(), 'Expiry:', expiryTime);
      if (Date.now() > expiryTime) {
        console.log('Code expired');
        return new Response(
          JSON.stringify({ error: 'Verification code has expired' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Mark code as used
      console.log('Marking code as used...');
      await supabaseAdmin
        .from('password_reset_codes')
        .update({ used: true })
        .eq('id', resetCode.id);

      console.log('=== FORGOT PASSWORD: VERIFY ACTION COMPLETED ===');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Code verified successfully',
          user_id: resetCode.user_id 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // RESET PASSWORD
    if (method === 'POST' && action === 'reset') {
      console.log('=== FORGOT PASSWORD: RESET ACTION STARTED ===');
      const { email, code, newPassword } = await req.json();
      console.log('Resetting password for email:', email);

      if (!email || !code || !newPassword) {
        console.error('Missing required fields');
        return new Response(
          JSON.stringify({ error: 'Email, code, and new password are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (newPassword.length < 6) {
        console.error('Password too short');
        return new Response(
          JSON.stringify({ error: 'Password must be at least 6 characters' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create admin client for database operations
      const supabaseAdminReset = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      // Verify code one more time
      console.log('Verifying reset code...');
      const { data: resetCode, error: codeError } = await supabaseAdminReset
        .from('password_reset_codes')
        .select('*')
        .eq('email', email)
        .eq('code', code.toUpperCase())
        .eq('used', true) // Should be marked as used from verify step
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (codeError || !resetCode) {
        console.error('Reset code verification failed:', codeError);
        return new Response(
          JSON.stringify({ error: 'Invalid or expired reset code' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Reset code verified for user:', resetCode.user_id);

      // Update password using Supabase Admin API
      console.log('Updating password for user:', resetCode.user_id);
      const { error: updateError } = await supabaseAdminReset.auth.admin.updateUserById(
        resetCode.user_id,
        { password: newPassword }
      );

      if (updateError) {
        console.error('Password update error:', JSON.stringify(updateError, null, 2));
        return new Response(
          JSON.stringify({ 
            error: 'Failed to reset password',
            details: updateError.message 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Password updated successfully');

      // Delete all reset codes for this user
      console.log('Cleaning up reset codes...');
      await supabaseAdminReset
        .from('password_reset_codes')
        .delete()
        .eq('user_id', resetCode.user_id);

      console.log('=== FORGOT PASSWORD: RESET ACTION COMPLETED ===');

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Password reset successfully' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('=== GLOBAL ERROR HANDLER ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', JSON.stringify(error, null, 2));
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        type: error.constructor.name 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
