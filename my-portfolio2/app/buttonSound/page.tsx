"use client";
import { useCallback } from "react";

export function useClickSound(src: string = "/bubble-pop.mp3") {
  return useCallback(() => {
    const audio = new Audio(src);
    audio.currentTime = 0;
    audio.play();
  }, [src]);
}
