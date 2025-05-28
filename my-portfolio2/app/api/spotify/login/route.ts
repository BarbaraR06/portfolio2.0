import { NextResponse } from 'next/server';
import crypto from 'crypto';

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

  const state = generateRandomString(16);
  

  const scope = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state';
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('client_id', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', 'https://portfolio2-0-ochre-chi.vercel.app/api/spotify/callback');
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('show_dialog', 'true');

  console.log('[Spotify Login] Redirecting to Spotify auth URL:', authUrl.toString());
  
  const response = NextResponse.redirect(authUrl);

  response.cookies.set('spotify_auth_state', state, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax', 
    path: '/',
    maxAge: 60 * 10, 
    domain: 'portfolio2-0-ochre-chi.vercel.app' 
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

  console.log('[Spotify Login] Response headers:', {
    location: response.headers.get('location'),
    setCookie: response.headers.get('set-cookie')
  });

  return response;
} 