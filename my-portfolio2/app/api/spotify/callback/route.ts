import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // Get stored state from cookies using Next.js API
  const storedState = cookies().get('spotify_auth_state')?.value;

  console.log('[Spotify Callback] Received callback with:', {
    code: code ? 'present' : 'missing',
    state: state ? 'present' : 'missing',
    error: error || 'none',
    storedState: storedState ? 'present' : 'missing'
  });

  if (error) {
    console.error('[Spotify Callback] Error from Spotify:', error);
    return NextResponse.json({ error: `Spotify error: ${error}` }, { status: 400 });
  }

  if (!code) {
    console.error('[Spotify Callback] No code provided');
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // Verify state parameter
  console.log('[Spotify Callback] Verifying state:', {
    received: state,
    stored: storedState
  });

  if (!state || !storedState || state !== storedState) {
    console.error('[Spotify Callback] State mismatch:', {
      received: state,
      stored: storedState
    });
    return NextResponse.json(
      { error: 'State mismatch' },
      { status: 403 }
    );
  }

  try {
    console.log('[Spotify Callback] Attempting to exchange code for token');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || '',
        grant_type: 'authorization_code'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Spotify Callback] Token exchange failed:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      throw new Error(data.error_description || 'Failed to get access token');
    }

    console.log('[Spotify Callback] Successfully obtained tokens');

    // Create response with redirect using environment variable
    const redirectUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://portfolio2-0-ochre-chi.vercel.app');
    const redirectResponse = NextResponse.redirect(redirectUrl);

    // Clear the state cookie
    redirectResponse.cookies.set('spotify_auth_state', '', {
      path: '/',
      maxAge: 0
    });

    // Set tokens in response headers
    redirectResponse.cookies.set('spotify_access_token', data.access_token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production', // Require HTTPS in production
      sameSite: 'lax', // Protect against CSRF
      path: '/',
      maxAge: data.expires_in
    });

    redirectResponse.cookies.set('spotify_refresh_token', data.refresh_token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production', // Require HTTPS in production
      sameSite: 'lax', // Protect against CSRF
      path: '/',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    // Log the response headers
    console.log('[Spotify Callback] Response headers:', {
      location: redirectResponse.headers.get('location'),
      setCookie: redirectResponse.headers.get('set-cookie')
    });

    return redirectResponse;
  } catch (error) {
    console.error('[Spotify Callback] Error in callback:', error);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
} 