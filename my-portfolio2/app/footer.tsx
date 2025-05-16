"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import LanguageSwitcher from "@/components/languageSwitcher";

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
            className="w-14 h-14 xl:w-15 xl:h-15 hover:bg-[#552445] p-2"
            src="/cat.svg"
            onClick={toggleMenu}
          />
        </div>
        {isMenuOpen && (
          <div className="text-defaultText font-bold absolute bottom-[3.5rem] left-0 bg-cvs-rose flex flex-col items-center w-1/2 md:w-1/6 rounded-t-lg">
            <button
              className="hover:bg-[#e3cadb] w-full text-left p-2 pl-4 mt-4"
              onClick={handleShutdown}
            >
              {t("shutdown")}
            </button>
            <button
              className="hover:bg-[#e3cadb] w-full text-left p-2 pl-4"
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
              <img
                alt={tab}
                className="w-6 h-6"
                src={iconPaths[tab] || "/default-icon.svg"}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
