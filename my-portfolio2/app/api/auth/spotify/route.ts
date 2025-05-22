import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/utils/spotify';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const authUrl = getAuthUrl();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error initiating Spotify auth:', error);
    return NextResponse.redirect(new URL('/error?error=auth_failed', process.env.NEXT_PUBLIC_BASE_URL || ''));
  }
} 