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

    // Add contact to Brevo waitlist
    const createContactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [4], // Your waitlist ID
        updateEnabled: true,
        attributes: {
          SIGNUP_DATE: new Date().toISOString(),
          SOURCE: 'Website Waitlist'
        }
      })
    });

    if (!createContactResponse.ok) {
      const errorData = await createContactResponse.json();
      console.error('Failed to add contact to Brevo:', errorData);
      throw new Error('Failed to add to waitlist');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add to waitlist' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 