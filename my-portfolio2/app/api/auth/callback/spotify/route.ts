import { NextResponse } from 'next/server';
import spotifyApi from '@/utils/spotify';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://portfolio2-0-ochre-chi.vercel.app'
  : 'http://localhost:3000';


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

    if (error) {
      return NextResponse.redirect(`${BASE_URL}/error?error=${error}`);
    }

    if (!code) {
      return NextResponse.redirect(`${BASE_URL}/error?error=no_code`);
    }

    const data = await spotifyApi.authorizationCodeGrant(code);
    
    const response = NextResponse.redirect(BASE_URL);
    
    response.cookies.set('spotify_access_token', data.body.access_token, {
      maxAge: data.body.expires_in,
      httpOnly: true,
      secure: true, 
      path: '/',
      sameSite: 'lax'
    });
    
    response.cookies.set('spotify_refresh_token', data.body.refresh_token, {
      maxAge: 30 * 24 * 60 * 60, 
      secure: true, 
      path: '/',
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('Error in Spotify callback:', error);
    return NextResponse.redirect(`${BASE_URL}/error?error=auth_failed`);
  }
} 