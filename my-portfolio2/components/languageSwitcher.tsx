"use client";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    console.log("Changing language to:", lng);
    try {
      await i18n.changeLanguage(lng);
      document.documentElement.lang = lng;
      console.log(
        "Language changed successfully. Current language:",
        i18n.language,
      );
      console.log("Available translations:", i18n.store.data);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <button
      className="bg-[#e3cadb] p-4 hover:bg-[#552445] transition-colors text-defaultText font-bold hover:text-white"
      onClick={() => changeLanguage(i18n.language === "en" ? "es" : "en")}
    >
      {i18n.language === "en" ? "EN" : "ES"}
    </button>
  );
}
