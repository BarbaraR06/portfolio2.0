import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Generate a cryptographically secure random string
function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}

export async function GET() {
  console.log('[Spotify Login] Starting login process', {
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ? 'present' : 'missing',
    redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ? 'present' : 'missing'
  });

  if (!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || !process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI) {
    console.error('[Spotify Login] Missing required environment variables');
    return NextResponse.json({ error: 'Missing required environment variables' }, { status: 500 });
  }

  // Generate a cryptographically secure state value
  const state = generateRandomString(16);
  
  // Set up the authorization URL
  const scope = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state';
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('client_id', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', 'https://portfolio2-0-ochre-chi.vercel.app/api/spotify/callback');
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('show_dialog', 'true');

  console.log('[Spotify Login] Redirecting to Spotify auth URL:', authUrl.toString());
  
  // Create response with redirect
  const response = NextResponse.redirect(authUrl);

  // Set state cookie with secure options
  response.cookies.set('spotify_auth_state', state, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === 'production', // Require HTTPS in production
    sameSite: 'lax', // Protect against CSRF
    path: '/',
    maxAge: 60 * 10, // 10 minutes
    domain: 'portfolio2-0-ochre-chi.vercel.app' // Set domain for production
  });

  console.log('[Spotify Login] Setting state cookie:', {
    state,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 10,
      domain: 'portfolio2-0-ochre-chi.vercel.app'
    }
  });

  // Log the response headers
  console.log('[Spotify Login] Response headers:', {
    location: response.headers.get('location'),
    setCookie: response.headers.get('set-cookie')
  });

  return response;
} 