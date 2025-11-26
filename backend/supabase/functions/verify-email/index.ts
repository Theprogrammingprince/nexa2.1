import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = 're_R2QNjfBq_EK68vtTviLJ6nVHMZvoJyKxY';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerificationCodeData {
  code: string;
  email: string;
  user_id: string;
  timestamp: number;
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action, email, code } = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // ACTION: SEND - Send verification code
    if (action === 'send') {
      console.log('=== EMAIL VERIFICATION: SEND ACTION ===');
      console.log('Email:', email);

      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get user by email
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      
      if (userError || !user) {
        return new Response(
          JSON.stringify({ error: 'User not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Generate 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Generated verification code:', verificationCode);

      // Store verification code in database
      const verificationData: VerificationCodeData = {
        code: verificationCode,
        email: email,
        user_id: user.id,
        timestamp: Date.now(),
      };

      const { error: insertError } = await supabaseClient
        .from('email_verification_codes')
        .insert({
          user_id: user.id,
          email: email,
          code: verificationCode,
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
        });

      if (insertError) {
        console.error('Error storing verification code:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to store verification code' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Verification code stored successfully');

      // Get user profile for personalization
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      // Send email via Resend
      console.log('Sending verification email via Resend...');
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
            subject: 'Verify Your Email - NEXA',
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Email Verification</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
                    <tr>
                      <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                          <!-- Header -->
                          <tr>
                            <td style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); padding: 40px 30px; text-align: center;">
                              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to NEXA! 🎉</h1>
                              <p style="margin: 10px 0 0; color: #e5e7eb; font-size: 14px;">Your Learning Journey Starts Here</p>
                            </td>
                          </tr>
                          
                          <!-- Content -->
                          <tr>
                            <td style="padding: 40px 30px;">
                              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: 600;">Verify Your Email Address</h2>
                              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Hello ${profile?.full_name || 'there'},
                              </p>
                              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Thank you for signing up with NEXA! To complete your registration and start your learning journey, please verify your email address using the code below:
                              </p>
                              
                              <!-- Code Box -->
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                  <td align="center">
                                    <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 12px; padding: 30px; display: inline-block;">
                                      <p style="margin: 0 0 10px; color: #ffffff; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">Verification Code</p>
                                      <p style="margin: 0; color: #ffffff; font-size: 42px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">${verificationCode}</p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              
                              <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                This code will expire in <strong>10 minutes</strong>. If you didn't create an account with NEXA, please ignore this email.
                              </p>
                              
                              <!-- Features Box -->
                              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                                <tr>
                                  <td>
                                    <p style="margin: 0 0 15px; color: #111827; font-size: 16px; font-weight: 600;">What's waiting for you:</p>
                                    <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
                                      <li>📚 Comprehensive course summaries</li>
                                      <li>✅ CBT practice tests</li>
                                      <li>📊 Performance tracking</li>
                                      <li>🎯 Personalized learning paths</li>
                                      <li>🏆 Achievement badges</li>
                                    </ul>
                                  </td>
                                </tr>
                              </table>
                              
                              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                Need help? Contact us at <a href="mailto:support@nexa.edu" style="color: #14b8a6; text-decoration: none;">support@nexa.edu</a>
                              </p>
                            </td>
                          </tr>
                          
                          <!-- Footer -->
                          <tr>
                            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                                © 2025 NEXA. All rights reserved.
                              </p>
                              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                Building Leaders, One Test at a Time.
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
          throw new Error(`Failed to send email: ${resendData.message || 'Unknown error'}`);
        }

        console.log('Verification email sent successfully:', resendData.id);

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Verification code sent to email',
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        return new Response(
          JSON.stringify({ error: 'Failed to send verification email' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // ACTION: VERIFY - Verify the code
    if (action === 'verify') {
      console.log('=== EMAIL VERIFICATION: VERIFY ACTION ===');
      console.log('Email:', email);
      console.log('Code:', code);

      if (!email || !code) {
        return new Response(
          JSON.stringify({ error: 'Email and code are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get user
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      
      if (userError || !user) {
        return new Response(
          JSON.stringify({ error: 'User not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get verification code from database
      const { data: verificationRecord, error: fetchError } = await supabaseClient
        .from('email_verification_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('email', email)
        .eq('code', code)
        .single();

      if (fetchError || !verificationRecord) {
        console.error('Verification code not found or invalid');
        return new Response(
          JSON.stringify({ error: 'Invalid verification code' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if code is expired
      const expiresAt = new Date(verificationRecord.expires_at);
      if (expiresAt < new Date()) {
        console.error('Verification code expired');
        return new Response(
          JSON.stringify({ error: 'Verification code has expired' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update user profile to mark email as verified
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({ 
          email_verified: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to verify email' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Delete used verification code
      await supabaseClient
        .from('email_verification_codes')
        .delete()
        .eq('id', verificationRecord.id);

      console.log('Email verified successfully');

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email verified successfully',
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Function error:', errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
