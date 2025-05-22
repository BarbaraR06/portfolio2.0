import { NextResponse } from 'next/server';
import spotifyApi from '@/utils/spotify';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const accessToken = request.headers.get('x-spotify-token');
    
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
    }

    spotifyApi.setAccessToken(accessToken);
    const data = await spotifyApi.getUserPlaylists();
    
    return NextResponse.json(data.body);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 });
  }
} 