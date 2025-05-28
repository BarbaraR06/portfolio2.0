"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const SPOTIFY_PLAYER_NAME = "Portfolio Web Player";
const PLAYLIST_URI = "spotify:playlist:1u4F50HA53L3Jwxbnk9IeO"; // Peaceful Piano playlist

export default function MusicPlayer() {
  const { t } = useTranslation("music-player");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMinimized, setIsMinimized] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<any>(null);

  // Check authentication
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    async function checkToken() {
      try {
        const response = await fetch('/api/spotify/token');
        const data = await response.json();
        console.log('[MusicPlayer] Token verificado:', data.access_token ? 'Sí' : 'No');
        
        if (response.ok && data.access_token) {
          setAccessToken(data.access_token);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          console.log('[MusicPlayer] No hay token válido');
          setIsAuthenticated(false);
          setAccessToken(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('[MusicPlayer] Error verificando token:', error);
        setIsAuthenticated(false);
        setAccessToken(null);
        setLoading(false);
      }
    }

    checkToken();
    const interval = setInterval(checkToken, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load Spotify SDK
  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;
    if (typeof window === "undefined") return;

    console.log("[MusicPlayer] Estado de autenticación:", { isAuthenticated, hasToken: !!accessToken });

    if ((window as any).Spotify) {
      console.log("[MusicPlayer] Spotify SDK ya cargado");
      setupPlayer();
    } else {
      console.log("[MusicPlayer] Cargando Spotify SDK...");
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        console.log("[MusicPlayer] Spotify SDK listo");
        setupPlayer();
      };
    }
  }, [isAuthenticated, accessToken]);

  function setupPlayer() {
    if (typeof window === "undefined") return;
    if (!accessToken) {
      console.log("[MusicPlayer] No token para inicializar el player");
      return;
    }
    if (player) {
      console.log("[MusicPlayer] Player ya inicializado");
      return;
    }

    console.log("[MusicPlayer] Inicializando Spotify Player...");
    const spotifyPlayer = new (window as any).Spotify.Player({
      name: SPOTIFY_PLAYER_NAME,
      getOAuthToken: (cb: any) => {
        cb(accessToken);
      },
      volume: 0.5,
    });

    setPlayer(spotifyPlayer);

    spotifyPlayer.addListener("ready", ({ device_id }: any) => {
      console.log("[MusicPlayer] Player ready, device_id:", device_id);
      setDeviceId(device_id);
      setIsReady(true);
    });

    spotifyPlayer.addListener("not_ready", () => {
      console.log("[MusicPlayer] Player not ready");
      setIsReady(false);
    });

    spotifyPlayer.addListener("player_state_changed", (state: any) => {
      if (!state) return;
      console.log("[MusicPlayer] Estado del player actualizado:", state);
      setCurrentTrack(state.track_window.current_track);
      setIsPlaying(!state.paused);
    });

    spotifyPlayer.addListener("initialization_error", ({ message }: any) => {
      console.error("[MusicPlayer] Initialization error:", message);
    });

    spotifyPlayer.addListener("authentication_error", ({ message }: any) => {
      console.error("[MusicPlayer] Authentication error:", message);
      setIsAuthenticated(false);
      setAccessToken(null);
    });

    spotifyPlayer.addListener("account_error", ({ message }: any) => {
      console.error("[MusicPlayer] Account error:", message);
    });

    spotifyPlayer.connect();
  }

  // Play playlist when ready
  useEffect(() => {
    if (isReady && deviceId && isAuthenticated) {
      console.log("[MusicPlayer] Player listo, intentando reproducir playlist...");
      playPlaylist();
    }
  }, [isReady, deviceId, isAuthenticated]);

  async function playPlaylist() {
    if (!accessToken || !deviceId) {
      console.log("[MusicPlayer] No token o deviceId para reproducir");
      return;
    }
    try {
      console.log("[MusicPlayer] Intentando reproducir playlist:", PLAYLIST_URI);
      const res = await fetch("https://api.spotify.com/v1/me/player/play?device_id=" + deviceId, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context_uri: PLAYLIST_URI,
          offset: { position: 0 },
          position_ms: 0,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[MusicPlayer] Error al reproducir playlist: ${res.status} - ${errorText}`);
      } else {
        console.log("[MusicPlayer] Playlist reproducida correctamente");
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("[MusicPlayer] Error en playPlaylist:", err);
    }
  }

  const handlePlayPause = async () => {
    if (!player || !accessToken) return;

    try {
      if (isPlaying) {
        await player.pause();
      } else {
        await player.resume();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("[MusicPlayer] Error al cambiar estado de reproducción:", error);
    }
  };

  const handlePrevious = async () => {
    if (!player || !accessToken) return;
    try {
      await player.previousTrack();
    } catch (error) {
      console.error("[MusicPlayer] Error al cambiar a la pista anterior:", error);
    }
  };

  const handleNext = async () => {
    if (!player || !accessToken) return;
    try {
      await player.nextTrack();
    } catch (error) {
      console.error("[MusicPlayer] Error al cambiar a la siguiente pista:", error);
    }
  };

  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (player) {
      try {
        await player.setVolume(newVolume);
      } catch (error) {
        console.error("[MusicPlayer] Error al cambiar el volumen:", error);
      }
    }
  };

  if (loading) return <div className="fixed bottom-16 right-4 w-72 rounded-lg bg-[#e3b1d2] p-4">{t("loading")}</div>;

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-16 right-4 w-72 rounded-lg bg-[#e3b1d2] p-4 flex flex-col items-center">
        <p className="mb-4 text-white">{t("login_spotify")}</p>
        <a
          href="/api/spotify/login"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {t("login_with_spotify")}
        </a>
      </div>
    );
  }

  return (
    <div
      className={`fixed transition-all duration-300 ease-in-out ${
        isMinimized
          ? "bottom-16 right-4 w-12 h-12 rounded-full overflow-hidden cursor-pointer hover:scale-110"
          : "bottom-16 right-4 w-72 rounded-lg"
      } bg-[#e3b1d2] backdrop-blur-lg`}
      onClick={() => isMinimized && setIsMinimized(false)}
    >
      {isMinimized ? (
        <div className="w-full h-full flex items-center justify-center">
          <img
            alt={currentTrack?.name || "Current track"}
            className="w-full h-full object-cover"
            src={currentTrack?.album?.images[0]?.url || "/music/default-cover.jpg"}
          />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold truncate flex-1">
              {currentTrack?.name || "No track playing"}
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
              alt={currentTrack?.name || "Current track"}
              className="w-16 h-16 rounded-md mr-3"
              src={currentTrack?.album?.images[0]?.url || "/music/default-cover.jpg"}
            />
            <div>
              <p className="text-white text-sm">
                {currentTrack?.artists?.map((artist: any) => artist.name).join(", ") || "Unknown artist"}
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

          <div className="flex justify-center items-center space-x-4">
            <button
              aria-label={t("previous")}
              className="text-white hover:text-cvs-lightBlue transition-colors"
              onClick={handlePrevious}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
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
            <button
              aria-label={t("next")}
              className="text-white hover:text-cvs-lightBlue transition-colors"
              onClick={handleNext}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}