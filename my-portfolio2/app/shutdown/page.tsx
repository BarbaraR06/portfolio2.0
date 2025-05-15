"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import TransitionOverlay from "@/components/TransitionOverlay";

export default function ShutdownPage() {
  const router = useRouter();
  const { t } = useTranslation("shutdown");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let shakeCount = 0;
    let lastShake = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = new Date().getTime();
      const deltaX = Math.abs(e.clientX - lastX);
      const deltaY = Math.abs(e.clientY - lastY);

      if (deltaX > 30 || deltaY > 30) {
        if (currentTime - lastShake < 100) {
          shakeCount++;
          if (shakeCount >= 3) {
            setIsTransitioning(true);
            setTimeout(() => {
              router.push("/");
            }, 500);
          }
        } else {
          shakeCount = 1;
        }
        lastShake = currentTime;
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [router]);

  return (
    <div className="relative w-screen h-screen">
      <TransitionOverlay isActive={isTransitioning} />
      <div className="absolute inset-0 bg-[#68254b] bg-opacity-90" />
      <div className="relative z-10 w-full h-full flex items-center justify-center flex-col">
        <img
          alt="Pixel Sleep"
          className="w-[30%] h-[30%]"
          src="/pixelSleep.svg"
        />
        <div className="text-white text-xl text-center">
          <p>{t("shakeMouse")}</p>
        </div>
      </div>
    </div>
  );
}
