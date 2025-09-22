import { NextResponse } from 'next/server';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map(cookie => {
      const [name, value] = cookie.split('=');
      return [name, value];
    })
  );

  const accessToken = cookies['spotify_access_token'];
  const refreshToken = cookies['spotify_refresh_token'];

  console.log('[Spotify Token] Checking tokens:', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    clientId: client_id ? 'present' : 'missing',
    clientSecret: client_secret ? 'present' : 'missing',
    allCookies: Object.keys(cookies)
  });

  if (!accessToken) {
    console.log('[Spotify Token] No access token found');
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  try {
    if (!refreshToken) {
      console.log('[Spotify Token] No refresh token, returning current access token');
      return NextResponse.json({ access_token: accessToken });
    }

    console.log('[Spotify Token] Attempting to refresh token');
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('[Spotify Token] Error refreshing token:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: data
      });
      throw new Error(data.error_description || 'Failed to refresh token');
    }

    console.log('[Spotify Token] Token refreshed successfully');

    const jsonResponse = NextResponse.json({ access_token: data.access_token }); //responde con el nuevo access token

    jsonResponse.cookies.set('spotify_access_token', data.access_token, { //guarda el nuevo access token en una cookie
      httpOnly: false, 
      secure: false, 
      sameSite: 'lax',
      path: '/',
      maxAge: data.expires_in
    });

    if (data.refresh_token) {
      jsonResponse.cookies.set('spotify_refresh_token', data.refresh_token, {
        httpOnly: false,
        secure: false, 
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60 
      });
    }

    return jsonResponse;
  } catch (error) {
    console.error('[Spotify Token] Error in token endpoint:', error);
    return NextResponse.json({ error: 'Error refreshing token' }, { status: 401 });
  }
} 