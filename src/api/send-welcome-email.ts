import { createClient } from '@supabase/supabase-js';

export const config = {
  runtime: 'edge',
};

const brevoApiKey = process.env.VITE_BREVO_API_KEY!;

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
          name: 'Doc Bankman',
          email: 'thepharmacist@docbankman.com'
        },
        to: [{
          email: email
        }],
        subject: 'Welcome to Doc Bankman!',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; text-align: center;">Welcome to Glow Oil!</h1>
            <p>Thank you for joining our waitlist! We're excited to have you as part of our community.</p>
            <p>Here's what you can expect:</p>
            <ul style="color: #555;">
              <li>Early access to our launch</li>
              <li>Exclusive discounts</li>
              <li>Skincare tips and updates</li>
            </ul>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888;">Follow us on social media for daily updates:</p>
              <a href="#" style="color: #007bff; text-decoration: none; margin: 0 10px;">Instagram</a>
              <a href="#" style="color: #007bff; text-decoration: none; margin: 0 10px;">Twitter</a>
            </div>
          </div>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
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