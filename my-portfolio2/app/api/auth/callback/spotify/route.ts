import { NextResponse } from 'next/server';
import spotifyApi from '@/utils/spotify';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect('/error?error=' + error);
    }

    if (!code) {
      return NextResponse.redirect('/error?error=no_code');
    }

    const data = await spotifyApi.authorizationCodeGrant(code);
    
  
    const response = NextResponse.redirect('/');
    
    response.cookies.set('spotify_access_token', data.body.access_token, {
      maxAge: data.body.expires_in,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    
    response.cookies.set('spotify_refresh_token', data.body.refresh_token, {
      maxAge: 30 * 24 * 60 * 60, 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Error in Spotify callback:', error);
    return NextResponse.redirect('/error?error=auth_failed');
  }
} 