import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { refreshAccessToken } from '@/utils/spotify';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('spotify_access_token');
  const refreshToken = cookieStore.get('spotify_refresh_token');

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: 'No tokens found' }, { status: 401 });
  }

  try {
    // If access token exists, return it
    if (accessToken) {
      return NextResponse.json({ access_token: accessToken.value });
    }

    // If only refresh token exists, get new access token
    if (refreshToken) {
      const data = await refreshAccessToken(refreshToken.value);
      return NextResponse.json({ access_token: data.access_token });
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
  }
} 