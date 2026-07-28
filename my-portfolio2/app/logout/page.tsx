"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import TransitionOverlay from "@/components/TransitionOverlay";

export default function LogoutPage() {
  const router = useRouter();
  const { t } = useTranslation("login");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    document.body.style.opacity = "1";
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleEnter = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/home");
    }, 1200);
  };

  //efecto para desktop
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        handleEnter();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //efecto para mobile

  useEffect(() => {
    const handleTouchOrClick = () => {
      handleEnter();
    };
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      window.addEventListener("touchstart", handleTouchOrClick);
      document.addEventListener("click", handleTouchOrClick);
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchOrClick);
      document.removeEventListener("click", handleTouchOrClick);
    };
  }, []);

  const formatTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const month = monthNames[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return {
      date: `${month} ${day}`,
      hours: hours,
      minutes: minutes,
    };
  };

  const formatted = formatTime(currentTime);

  return (
    <section className="font-yomogi fixed inset-0 w-screen h-screen bg-logout bg-no-repeat bg-cover bg-center overflow-hidden">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <img
          src="/cloud1.png"
          alt="Cloud 1"
          className="absolute top-[5%] left-[-20%] w-[900px] animate-cloud1"
        />
        <img
          src="/cloud2.png"
          alt="Cloud 2"
          className="absolute top-[10%] right-[-20%] w-[1800px] animate-cloud2"
        />
        <img
          src="/cloud3.png"
          alt="Cloud 3"
          className="absolute -top-[30%] left-[25%] w-[1900px] animate-cloud3"
        />
        <img
          src="/cloud4.png"
          alt="Cloud 4"
          className="absolute top-[20%] right-[-15%] w-[2000px] animate-cloud4"
        />
        <img
          src="/bunny.png"
          alt="bunny"
          className="absolute top-[10%] w-[800px] right-[50%] "
        />
        <TransitionOverlay isActive={isTransitioning} />
        <div className="login-container bg-white/40 backdrop-blur-lg rounded-xl flex flex-col items-center fadeIn max-w-sm p-12 gap-4">
          <p className="text-white text-3xl font-mono ">{formatted.date}</p>
          <p className="text-white text-5xl font-mono mt-2">
            {formatted.hours}
          </p>
          <p className="text-white text-4xl font-mono opacity-80 -mt-2">
            {formatted.minutes}
          </p>
        </div>
        <p className=" text-white animate-pulse mt-4">
          {" "}
          Press space or tap to enter
        </p>
      </div>
    </section>
  );
}
