import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, code } = await req.json()

    if (!email || !code) {
      return new Response(
        JSON.stringify({ error: 'Missing email or code' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // For now, just log the code and return success
    // In production, integrate with email service (SendGrid, Resend, etc.)
    console.log(`Password reset code for ${email}: ${code}`)

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; }
            .header { text-align: center; margin-bottom: 30px; }
            .code-box { background-color: #101829; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .code { font-size: 32px; font-weight: bold; letter-spacing: 4px; }
            .message { color: #666; margin: 20px 0; line-height: 1.6; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="color: #101829; margin: 0;">NEXA</h1>
              <p style="color: #666; margin: 5px 0 0 0;">Password Reset Request</p>
            </div>
            
            <p class="message">Hello,</p>
            
            <p class="message">
              You requested to reset your password. Use the code below to proceed with your password reset. This code will expire in 5 minutes.
            </p>
            
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            
            <p class="message">
              If you didn't request a password reset, please ignore this email and your password will remain unchanged.
            </p>
            
            <p class="message">
              For security reasons, never share this code with anyone.
            </p>
            
            <div class="footer">
              <p>© 2025 NEXA. All rights reserved.</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Log that email would be sent (for development)
    console.log('Email template prepared for:', email)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Reset code sent to email',
        code: code, // For development only - remove in production
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Function error:', errorMessage)
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
