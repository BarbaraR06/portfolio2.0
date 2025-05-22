import { NextResponse } from 'next/server';
import spotifyApi from '@/utils/spotify';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set');
}

if (!REDIRECT_URI) {
  throw new Error('NEXT_PUBLIC_SPOTIFY_REDIRECT_URI environment variable is not set');
}

const validateRedirectUri = () => {
  if (!REDIRECT_URI) {
    throw new Error('Spotify redirect URI is not configured');
  }

  if (process.env.NODE_ENV === 'production' && !REDIRECT_URI.startsWith('https://')) {
    throw new Error('Redirect URI must use HTTPS in production');
  }

  spotifyApi.setRedirectURI(REDIRECT_URI);
  return REDIRECT_URI;
};

export async function GET(request: Request) {
  try {
    const redirectUri = validateRedirectUri();
    console.log('Using redirect URI:', redirectUri); 

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Spotify auth error:', error); 
      return NextResponse.redirect(new URL(`/error?error=${error}`, BASE_URL));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/error?error=no_code', BASE_URL));
    }

    const data = await spotifyApi.authorizationCodeGrant(code);
    
    const response = NextResponse.redirect(new URL('/', BASE_URL));
    
    response.cookies.set('spotify_access_token', data.body.access_token, {
      maxAge: data.body.expires_in,
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax'
    });
    
    response.cookies.set('spotify_refresh_token', data.body.refresh_token, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Error in Spotify callback:', error);
    return NextResponse.redirect(new URL('/error?error=auth_failed', BASE_URL));
  }
} 