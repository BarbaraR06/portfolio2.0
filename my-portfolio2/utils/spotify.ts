import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'user-library-read',
  'playlist-read-private',
];

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
});

export const getAuthUrl = () => {
  const state = Math.random().toString(36).substring(7);
  return `https://accounts.spotify.com/authorize?client_id=${
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  }&response_type=code&redirect_uri=${
    encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || '')
  }&scope=${encodeURIComponent(scopes.join(' '))}&state=${state}`;
};

export const setAccessToken = (token: string) => {
  spotifyApi.setAccessToken(token);
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    spotifyApi.setRefreshToken(refreshToken);
    const data = await spotifyApi.refreshAccessToken();
    return data.body;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export default spotifyApi; 