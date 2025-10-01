"use client";
import { useCallback } from "react";

export function useClickSound() {
  const playSound = useCallback(() => {
    const audio = new Audio("/click.mp3");
    audio.play().catch(() => {});
  }, []);

  return playSound;
}
