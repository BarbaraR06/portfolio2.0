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
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

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


  const timerId = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  useEffect(() => {
    return () => clearInterval(timerId);
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
    <div
      className={`fixed inset-0 flex-col w-screen h-screen flex items-center justify-center bg-[#29BEF2]`}
    >
       <img
        src="/cloud1.svg"
        alt="Cloud 1"
        className="absolute top-[5%] left-[-20%] w-[600px] animate-cloud1"
      />
      <img
        src="/cloud2.svg"
        alt="Cloud 2"
        className="absolute top-[25%] right-[-20%] w-[800px] animate-cloud2"
      />
      <img
        src="/cloud3.svg"
        alt="Cloud 3"
        className="absolute top-[50%] left-[-25%] w-[900px] animate-cloud3"
      />
      <img
        src="/cloud4.svg"
        alt="Cloud 4"
        className="absolute top-[70%] right-[-25%] w-[1000px] animate-cloud4"
      />
      <TransitionOverlay isActive={isTransitioning} />
      <div className="login-container bg-white/40 backdrop-blur-lg rounded-xl flex flex-col items-center fadeIn max-w-sm p-12 gap-4">
        <p className="text-white text-3xl font-mono mt-4">{formatted.date}</p>
        <p className="text-white text-5xl font-mono mt-2">{formatted.hours}</p>
        <p className="text-white text-4xl font-mono opacity-80 -mt-2">
          {formatted.minutes}
        </p>
      </div>
      <p className=" text-white opacity-80 animate-pulse mt-4">
        {" "}
        Press space to enter
      </p>
    </div>
  );
}
