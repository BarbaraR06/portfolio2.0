"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import LanguageSwitcher from "@/components/languageSwitcher";
import Clock from "./clock";

type FooterProps = {
  minimizedTabs: string[];
  iconsInFooter: string[];
  onRestoreTab: (key: string) => void;
  setIsTransitioning: Dispatch<SetStateAction<boolean>>;
};

const iconPaths: Record<string, string> = {
  Education: "/education.svg",
  Work: "/work.svg",
  AboutMe: "/about.svg",
  Email: "/mail.svg",
  Github: "/github.svg",
  Resume: "/resume.svg",
  Spotify: "/spotify.svg",
  Behance: "/behance.svg",
  Projects: "/projects.svg",
};

export default function Footer({
  minimizedTabs,
  onRestoreTab,
  iconsInFooter,
  setIsTransitioning,
}: FooterProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { t } = useTranslation("footer");
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleTransition = (route: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(route);
    }, 500);
  };

  const handleShutdown = () => {
    handleTransition("/shutdown");
  };

  const handleLogout = () => {
    handleTransition("/logout");
  };

  return (
    <footer className="flex justify-between bg-cvs-rose fixed bottom-0 w-full h-14 z-40">
      <div className="flex items-center">
        <div className="flex">
          <img
            alt="Home cat icon"
            className="w-14 h-14 xl:w-15 xl:h-15 p-2 cursor-pointer hover:bg-[#552445] "
            src="/cat.svg"
            onClick={toggleMenu}
          />
        </div>
        {isMenuOpen && (
          <div className="text-defaultText font-bold absolute bottom-[3.5rem] left-0 bg-cvs-rose flex flex-col items-center w-1/2 md:w-1/6 rounded-tr-lg">
            <button
              className="hover:bg-[#e3cadb] w-[95%] text-left p-2 mt-4 rounded-sm"
              onClick={handleShutdown}
            >
              {t("shutdown")}
            </button>
            <button
              className="hover:bg-[#e3cadb] w-[95%] text-left p-2 rounded-sm "
              onClick={handleLogout}
            >
              {t("logout")}
            </button>
          </div>
        )}
        <div className="flex">
          {iconsInFooter.map((tab) => (
            <button
              key={tab}
              className="bg-[#e3cadb] p-4 hover:bg-[#552445] transition-colors"
              onClick={() => onRestoreTab(tab)}
            >
              <img alt={tab} className="w-6 h-6" src={iconPaths[tab]} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
        <Clock />
      </div>
    </footer>
  );
}
