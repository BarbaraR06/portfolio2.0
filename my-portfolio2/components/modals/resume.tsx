"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { CV_FILE } from "@/config/constants";

export default function ResumeModal() {
  const { t } = useTranslation("home");

  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <a 
        href={CV_FILE}
        download="Barbara-Ruiz-CV.pdf"
        className="text-cvs-lightBlue hover:text-cvs-pink transition-colors xl2:text-3xl"
      >
        {t("resume")}
      </a>
    </div>
  );
}
