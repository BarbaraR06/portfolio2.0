"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Song {
  id: string;
  file: string;
  cover?: string;
}

// Cloudinary URL helper
const getCloudinaryUrl = (publicId: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}`;
};

const playlist: Song[] = [
  {
    id: "rainy",
    file: "https://res.cloudinary.com/dgft27lky/video/upload/v1747316493/portfolio/rainy.mp3",
    cover: "/music/cover.jpg",
  },
  {
    id: "sunny",
    file: "https://res.cloudinary.com/dgft27lky/video/upload/v1747316668/portfolio/sunny.mp3",
    cover: "/music/cover2.jpg",
  },
];

export default function MusicPlayer() {
  const { t } = useTranslation("music-player");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("error", (e) => {
        console.error("Error loading audio:", e);
        // Log more detailed error information
        const audio = audioRef.current;
        if (audio) {
          console.error("Audio error details:", {
            error: audio.error,
            networkState: audio.networkState,
            readyState: audio.readyState,
            currentSrc: audio.currentSrc
          });
        }
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error al reproducir:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1,
    );
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === playlist.length - 1 ? 0 : prevIndex + 1,
    );
    setIsPlaying(true);
  };

  const handleTimeSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);

    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentSong = playlist[currentSongIndex];

  return (
    <div
      className={`fixed transition-all duration-300 ease-in-out ${
        isMinimized
          ? "bottom-16 right-4 w-12 h-12 rounded-full overflow-hidden cursor-pointer hover:scale-110"
          : "bottom-16 right-4 w-72 rounded-lg"
      } bg-[#e3b1d2] backdrop-blur-lg`}
      onClick={() => isMinimized && setIsMinimized(false)}
    >
      <audio
        ref={audioRef}
        autoPlay={isPlaying}
        src={currentSong.file}
        onEnded={handleNext}
        onTimeUpdate={handleTimeUpdate}
      />

      {isMinimized ? (
        <div className="w-full h-full flex items-center justify-center">
          <img
            alt={t(`songs.${currentSong.id}.title`)}
            className="w-full h-full object-cover"
            src={currentSong.cover || "/music/default-cover.jpg"}
          />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold truncate flex-1">
              {t(`songs.${currentSong.id}.title`)}
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
              alt={t(`songs.${currentSong.id}.title`)}
              className="w-16 h-16 rounded-md mr-3"
              src={currentSong.cover || "/music/cover.jpg"}
            />
            <div>
              <p className="text-white text-sm">
                {t(`songs.${currentSong.id}.artist`)}
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

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-white text-xs">
                {formatTime(currentTime)}
              </span>
              <input
                className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                max={duration || 0}
                min={0}
                type="range"
                value={currentTime}
                onChange={handleTimeSeek}
              />
              <span className="text-white text-xs">{formatTime(duration)}</span>
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
        </div>
      )}
    </div>
  );
}
