import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { refreshAccessToken } from '@/utils/spotify';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('spotify_access_token');
    const refreshToken = cookieStore.get('spotify_refresh_token');

    if (!accessToken && !refreshToken) {
      console.error('No tokens found in cookies');
      return NextResponse.json({ error: 'No tokens found' }, { status: 401 });
    }

    // If we have an access token, return it
    if (accessToken?.value) {
      return NextResponse.json({ access_token: accessToken.value });
    }

    // If we only have a refresh token, try to get a new access token
    if (refreshToken?.value) {
      try {
        const data = await refreshAccessToken(refreshToken.value);
        
        // Set the new access token in cookies
        const response = NextResponse.json({ access_token: data.access_token });
        response.cookies.set('spotify_access_token', data.access_token, {
          httpOnly: true,
          secure: true,
          path: '/',
          sameSite: 'lax',
          domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
          maxAge: 3600 // 1 hour
        });
        
        return response;
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return NextResponse.json({ error: 'Failed to refresh token' }, { status: 401 });
      }
    }

    return NextResponse.json({ error: 'No valid tokens available' }, { status: 401 });
  } catch (error) {
    console.error('Error in token endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 