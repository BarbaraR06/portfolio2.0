import { NextResponse } from 'next/server';
import spotifyApi from '@/utils/spotify';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const validateRedirectUri = () => {
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  if (process.env.NODE_ENV === 'production' && !redirectUri?.startsWith('https://')) {
    throw new Error('Redirect URI must use HTTPS in production');
  }
  return redirectUri;
};

export async function GET(request: Request) {
  try {
    validateRedirectUri();

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    if (error) {
      return NextResponse.redirect(new URL(`/error?error=${error}`, BASE_URL));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/error?error=no_code', BASE_URL));
    }

    const data = await spotifyApi.authorizationCodeGrant(code);
    
    const response = NextResponse.redirect(new URL('/', BASE_URL));
    
    // Get the domain from BASE_URL for production
    let domain;
    if (process.env.NODE_ENV === 'production') {
      try {
        domain = new URL(BASE_URL || '').hostname;
      } catch (e) {
        console.error('Error parsing BASE_URL:', e);
      }
    }
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax' as const,
      domain: domain
    };
    
    response.cookies.set('spotify_access_token', data.body.access_token, {
      ...cookieOptions,
      maxAge: data.body.expires_in
    });
    
    response.cookies.set('spotify_refresh_token', data.body.refresh_token, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return response;
  } catch (error) {
    console.error('Error in Spotify callback:', error);
    return NextResponse.redirect(new URL('/error?error=auth_failed', BASE_URL));
  }
} 