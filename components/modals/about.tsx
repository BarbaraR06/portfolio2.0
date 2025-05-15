"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutMeModal() {
  const { t } = useTranslation("about-me");

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col gap-2 text-defaultText font-bold px-1 xl2:text-3xl xl2:p-4 xl2:w-4/5 xl2:gap-6">
        <p>{t("paragraph1")}</p>
        <p>{t("paragraph2")}</p>
        <p>{t("paragraph3")}</p>
      </div>
      <div className="grid">
        <img 
          src="/pixel.svg" 
          alt="About Me" 
          className="col-start-1 row-start-1"
        />
        <img 
          src="/shimmer.svg" 
          alt="About Me" 
          className="fade-in-out col-start-1 row-start-1"
        />
      </div>
    </div>
  );
}
