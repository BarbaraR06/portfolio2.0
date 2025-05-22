import { NextResponse } from 'next/server';
import spotifyApi from '@/utils/spotify';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const accessToken = request.headers.get('x-spotify-token');
    
    if (!accessToken) {
      return new NextResponse(
        JSON.stringify({ error: 'No access token provided' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    spotifyApi.setAccessToken(accessToken);
    const data = await spotifyApi.getUserPlaylists();
    
    return new NextResponse(
      JSON.stringify(data.body),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch playlists' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 