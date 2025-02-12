import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const brevoApiKey = process.env.VITE_BREVO_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { email } = await request.json();

    // Send email using Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'Glow Oil',
          email: 'welcome@yourdomain.com'
        },
        to: [{
          email: email
        }],
        subject: 'Welcome to Glow Oil Waitlist!',
        htmlContent: `
          <h1>Welcome to Glow Oil!</h1>
          <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
          <p>We'll keep you updated on our launch and any exciting news.</p>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send welcome email' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 