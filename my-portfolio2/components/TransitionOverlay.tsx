"use client";
import React from "react";
import { useTranslation } from "react-i18next";

interface TransitionOverlayProps {
  isActive: boolean;
}

export default function TransitionOverlay({
  isActive,
}: TransitionOverlayProps) {
  const { t } = useTranslation("transition");
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-cvs-lightBlue transition-opacity duration-500 pointer-events-none ${
        isActive ? "opacity-100" : "opacity-0"
      } z-50`}
      style={{ willChange: "opacity" }}
    >
      {isActive && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />

          <div className="flex gap-1 text-white text-xl font-cherry uppercase ">
            {t("loading")
              .split("")
              .map((letter, index) => (
                <span
                  key={index}
                  className="inline-block animate-wave"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
