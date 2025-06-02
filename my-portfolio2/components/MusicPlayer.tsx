"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const SPOTIFY_PLAYER_NAME = "Portfolio Web Player";
const PLAYLIST_URI = "spotify:playlist:1u4F50HA53L3Jwxbnk9IeO"; 

export default function MusicPlayer() {
  //estados para controlar el player
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

  // Verifica si hay token válido disponible
  useEffect(() => {
    if (typeof window === "undefined") return;
    async function checkToken() {
      try {
        const response = await fetch("/api/spotify/token");
        const data = await response.json();
        console.log(
          "[MusicPlayer] Token available:",
          data.access_token ? "yes" : "no"
        );

        if (response.ok && data.access_token) {
          setAccessToken(data.access_token);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          console.log("[MusicPlayer] no token available");
          setIsAuthenticated(false);
          setAccessToken(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("[MusicPlayer] error checking token:", error);
        setIsAuthenticated(false);
        setAccessToken(null);
        setLoading(false);
      }
    }

    checkToken();
    const interval = setInterval(checkToken, 30_000); // vuelve a verificar cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  // carga e inicia el SDK si está autenticado
  useEffect(() => {
    if (!isAuthenticated || !accessToken || typeof window === "undefined")
      return;

    if ((window as any).Spotify) {
      setupPlayer();
    } else {
      // Carga el script del SDK si no está cargado
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      // cuando el SDK está listo inicia el player
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        setupPlayer();
      };
    }
  }, [isAuthenticated, accessToken]);

  // configura el reproductor con el SDK de Spotify
  function setupPlayer() {
    if (!accessToken || player) return;

    const spotifyPlayer = new (window as any).Spotify.Player({
      name: SPOTIFY_PLAYER_NAME,
      getOAuthToken: (cb: any) => cb(accessToken),
      volume: 0.5,
    });

    setPlayer(spotifyPlayer);

    spotifyPlayer.addListener("ready", ({ device_id }: any) => {
      setDeviceId(device_id);
      setIsReady(true);
    });

    spotifyPlayer.addListener("not_ready", () => setIsReady(false));

    spotifyPlayer.addListener("player_state_changed", (state: any) => {
      if (!state) return;
      setCurrentTrack(state.track_window.current_track);
      setIsPlaying(!state.paused);
    });

    spotifyPlayer.addListener("initialization_error", ({ message }: any) => {
      console.error("Initialization error:", message);
    });

    spotifyPlayer.addListener("authentication_error", ({ message }: any) => {
      console.error("Authentication error:", message);
      setIsAuthenticated(false);
      setAccessToken(null);
    });

    spotifyPlayer.addListener("account_error", ({ message }: any) => {
      console.error("Account error:", message);
    });

    spotifyPlayer.connect();
  }

  // reproduce la playlist cuando el player esté listo
  useEffect(() => {
    if (isReady && deviceId && isAuthenticated) {
      playPlaylist();
    }
  }, [isReady, deviceId, isAuthenticated]);

  // llama API Spotify para reproducir la playlist
  async function playPlaylist() {
    if (!accessToken || !deviceId) return;

    try {
      const res = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
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
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          `[MusicPlayer] error playing playlist: ${res.status} - ${errorText}`
        );
      } else {
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("[MusicPlayer] error playing playlist:", err);
    }
  }

  // cambia el estado de reproducción play/pause
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
      console.error("[MusicPlayer] error changing playback state:", error);
    }
  };

  // cambia a la pista anterior
  const handlePrevious = async () => {
    if (!player || !accessToken) return;
    try {
      await player.previousTrack();
    } catch (error) {
      console.error(
        "[MusicPlayer] Error switching to the previous track:",
        error
      );
    }
  };

  // cambia a la siguiente pista
  const handleNext = async () => {
    if (!player || !accessToken) return;
    try {
      await player.nextTrack();
    } catch (error) {
      console.error("[MusicPlayer] Error switching to the next track:", error);
    }
  };

  // cambia el volumen
  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (player) {
      try {
        await player.setVolume(newVolume);
      } catch (error) {
        console.error("[MusicPlayer] error changing volume:", error);
      }
    }
  };

  // UI mientras se carga o si no está autenticado
  if (loading)
    return (
      <div className="fixed bottom-16 right-4 w-72 rounded-lg bg-[#e3b1d2] p-4">
        {t("loading")}
      </div>
    );

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
            src={
              currentTrack?.album?.images[0]?.url || "/music/default-cover.jpg"
            }
          />
        </div>
      ) : (
        <div className="p-4">
          {/* nombre de la canción y botón minimizar */}
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
          {/* info del track actual y control de volumen */}
          <div className="flex items-center mb-4">
            <img
              alt={currentTrack?.name || "Current track"}
              className="w-16 h-16 rounded-md mr-3"
              src={
                currentTrack?.album?.images[0]?.url ||
                "/music/default-cover.jpg"
              }
            />
            <div>
              <p className="text-white text-sm">
                {currentTrack?.artists
                  ?.map((artist: any) => artist.name)
                  .join(", ") || "Unknown artist"}
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
          {/* Controles de reproducción */}
          <div className="flex justify-center items-center space-x-4">
            <button
              aria-label={t("previous")}
              className="text-white hover:text-cvs-lightBlue transition-colors"
              onClick={handlePrevious}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
