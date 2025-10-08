import axios from 'axios';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

// Verificar variables de entorno
if (!clientId || !clientSecret || !redirectUri) {
  console.error('[Spotify Config] Faltan variables de entorno:', {
    clientId: !!clientId,
    clientSecret: !!clientSecret,
    redirectUri: !!redirectUri
  });
}

export function getLoginUrl() {
  if (!clientId || !redirectUri) {
    throw new Error('Faltan variables de entorno para Spotify');
  }

  const scope = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
  ].join(' ');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  console.log('[Spotify Config] Login URL generada:', url);
  return url;
}

export async function getTokens(code: string) {
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Faltan variables de entorno para Spotify');
  }

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  try {
    const res = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log('[Spotify Config] Tokens obtenidos exitosamente');
    return res.data;
  } catch (error) {
    console.error('[Spotify Config] Error obteniendo tokens:', (error as any).response?.data || (error as any).message);
    throw error;
  }
}

export async function refreshToken(refreshToken: string) {
  if (!clientId || !clientSecret) {
    throw new Error('Faltan variables de entorno para Spotify');
  }

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  try {
    const res = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log('[Spotify Config] Token refrescado exitosamente');
    return res.data;
  } catch (error) {
    console.error('[Spotify Config] Error refrescando token:', (error as any).response?.data || (error as any).message);
    throw error;
  }
}
