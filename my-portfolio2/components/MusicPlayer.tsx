"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAuthUrl } from "@/utils/spotify";

const YOUR_PLAYLIST_ID = '6zCID88oNjNv9zx6puDHKj';

interface SpotifyTrack {
  id: string | null;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  images: { url: string }[];
}

export default function MusicPlayer() {
  const { t } = useTranslation("music-player");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMinimized, setIsMinimized] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Portfolio Music Player",
        getOAuthToken: cb => {
          fetch('/api/spotify/token')
            .then(res => res.json())
            .then(data => {
              if (data.access_token) {
                cb(data.access_token);
                setAccessToken(data.access_token);
                setIsAuthenticated(true);
                playYourPlaylist(data.access_token);
              }
            });
        },
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('player_state_changed', state => {
        if (state) {
          setIsPlaying(!state.paused);
          setCurrentTrack(state.track_window.current_track);
          setDuration(state.duration);
          setCurrentTime(state.position);
        }
      });

      player.connect();
      setPlayer(player);
    };

    return () => {
      player?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetch('/api/spotify/playlists', {
        headers: {
          'x-spotify-token': accessToken
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.items) {
            setPlaylists(data.items);
          }
        })
        .catch(console.error);
    }
  }, [accessToken]);

  const playYourPlaylist = (token: string) => {
    if (player) {
      fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context_uri: `spotify:playlist:${YOUR_PLAYLIST_ID}`,
        }),
      }).catch(console.error);
    }
  };

  const handlePlayPause = () => {
    if (!isAuthenticated) {
      window.location.href = getAuthUrl();
      return;
    }

    if (player) {
      player.togglePlay();
    }
  };

  const handleTimeSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (player) {
      player.seek(time);
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-16 right-4 z-30 bg-[#e3b1d2]/70 backdrop-blur-sm p-4 rounded-lg">
        <button
          className="text-white hover:text-cvs-lightBlue transition-colors flex items-center gap-2"
          onClick={() => window.location.href = getAuthUrl()}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11v4l3-2-3-2z"/>
          </svg>
          {t("connect_spotify")}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed z-30 transition-all duration-300 ease-in-out ${
        isMinimized
          ? "bottom-16 right-4 w-12 h-12 rounded-full overflow-hidden cursor-pointer hover:scale-110"
          : "bottom-16 right-4 w-72 rounded-lg"
      } bg-[#e3b1d2]/70 backdrop-blur-sm`}
      onClick={() => isMinimized && setIsMinimized(false)}
    >
      {isMinimized ? (
        <div className="w-full h-full flex items-center justify-center">
          <img
            alt={currentTrack?.name || t("no_track")}
            className="w-full h-full object-cover"
            src={currentTrack?.album.images[0]?.url || "/music/default-cover.jpg"}
          />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold truncate flex-1">
              {currentTrack?.name || t("select_playlist")}
            </h3>
            <button
              aria-label={t("minimize")}
              className="text-white hover:text-cvs-lightBlue transition-colors"
              onClick={() => setIsMinimized(true)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center mb-4">
            <img
              alt={currentTrack?.name || t("no_track")}
              className="w-16 h-16 rounded-md mr-3"
              src={currentTrack?.album.images[0]?.url || "/music/default-cover.jpg"}
            />
            <div>
              <p className="text-white text-sm">
                {currentTrack?.artists.map(a => a.name).join(", ") || t("no_artist")}
              </p>
              <div className="flex items-center mt-2">
                <input
                  aria-label={t("volume")}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                  max={1}
                  min={0}
                  step={0.1}
                  type="range"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>

          {playlists.length > 0 && (
            <select
              className="w-full mb-4 p-2 rounded bg-white/10 text-white"
              onChange={(e) => {
                if (player && accessToken) {
                  fetch(`https://api.spotify.com/v1/me/player/play`, {
                    method: 'PUT',
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      context_uri: `spotify:playlist:${e.target.value}`,
                    }),
                  }).catch(console.error);
                }
              }}
            >
              <option value="">{t("select_playlist")}</option>
              {playlists.map(playlist => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          )}

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-white text-xs">
                {formatTime(currentTime)}
              </span>
              <input
                className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                max={duration}
                min={0}
                type="range"
                value={currentTime}
                onChange={handleTimeSeek}
              />
              <span className="text-white text-xs">{formatTime(duration)}</span>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <button
                aria-label={isPlaying ? t("pause") : t("play")}
                className="text-white hover:text-cvs-lightBlue transition-colors"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
