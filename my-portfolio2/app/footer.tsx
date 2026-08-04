"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";

import LanguageSwitcher from "@/components/languageSwitcher";
import WeatherFooter from "@/components/weather";
import Clock from "./clock";

type FooterProps = {
  minimizedTabs: string[];
  iconsInFooter: string[];
  onRestoreTab: (key: string) => void;
  setIsTransitioning: Dispatch<SetStateAction<boolean>>;
};

const iconPaths: Record<string, string> = {
  Education: "/education.svg",
  Experience: "/experience.svg",
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
        <div
          className={
            `text-defaultText font-bold absolute bottom-[3.5rem] left-0 bg-cvs-rose flex flex-col items-center w-1/2 md:w-1/6 rounded-xl mb-3 ml-3 ` +
            `origin-bottom transform transition-transform duration-700 ease-in-out ` +
            (isMenuOpen
              ? "scale-y-100 delay-0"
              : "delay-350 scale-y-0 pointer-events-none")
          }
        >
          <div
            className={
              `ml-10 w-full flex flex-col items-start transition-opacity duration-500 ease-out` +
              (isMenuOpen ? "opacity-100 delay-700" : "opacity-0 delay-0")
            }
          >
            <div className="overflow-hidden">
              <div
                className={`flex justify-start items-center transform transition-all duration-500 ease-out ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100 delay-500"
                    : "translate-y-full opacity-0 delay-0"
                }`}
              >
                <Image
                  alt="Shutdown icon"
                  src="/shut-down.svg"
                  width={24}
                  height={24}
                />

                <button
                  className="hover:bg-[#e3cadb] w-[95%] text-left m-2 p-2 rounded-lg"
                  onClick={handleShutdown}
                >
                  {t("shutdown")}
                </button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className={`flex justify-start items-center transform transition-all duration-500 ease-out ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100 delay-500"
                    : "translate-y-full opacity-0 delay-0"
                }`}
              >
                <Image
                  alt="Logout icon"
                  src="/logout.svg"
                  width={24}
                  height={24}
                />

                <button
                  className="hover:bg-[#e3cadb] w-[95%] text-left m-2 p-2 rounded-lg"
                  onClick={handleLogout}
                >
                  {t("logout")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {iconsInFooter.map((tab) => (
            <button
              key={tab}
              className="flex flex-row items-center justify-center gap-2 shrink-0 h-14 px-3 bg-[#e3cadb] hover:bg-[#552445] transition-colors"
              onClick={() => onRestoreTab(tab)}
            >
              <img
                src={iconPaths[tab]}
                alt={`${tab} icon`}
                className="block w-6 h-6 shrink-0"
              />

              <span className="block whitespace-nowrap text-defaultText font-bold">
                {tab}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <WeatherFooter />
        <LanguageSwitcher />
        <Clock />
      </div>
    </footer>
  );
}
