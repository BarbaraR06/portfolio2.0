import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/utils/spotify';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID) {
      throw new Error('Missing Spotify Client ID');
    }
    if (!process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI) {
      throw new Error('Missing Spotify Redirect URI');
    }

    const authUrl = getAuthUrl();
    if (!authUrl) {
      throw new Error('Failed to generate auth URL');
    }

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error initiating Spotify auth:', error);
    const errorUrl = new URL('/error', process.env.NEXT_PUBLIC_BASE_URL);
    errorUrl.searchParams.set('error', 'auth_failed');
    errorUrl.searchParams.set('message', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.redirect(errorUrl);
  }
} 