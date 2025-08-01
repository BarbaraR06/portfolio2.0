// src/components/Clock.tsx
"use client";
import React, { useEffect, useState } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(timerId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedDate = currentTime.toLocaleDateString([], {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col text-sm text-defaultText font-bold text-center p-4">
      <span>{formattedTime}</span>
      <span>{formattedDate}</span>
    </div>
  );
}
