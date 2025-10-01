"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Education from "../education";
import Email from "../email";
import Work from "../work";
import Resume from "../resume";
import Github from "../github";
import AboutMe from "../about-me";
import Spotify from "../spotify";
import Behance from "../behance"
import Projects from "@/projects";

import Modal from "@/components/modal";
import EducationModal from "@/components/modals/education";
import WorkModal from "@/components/modals/work";
import EmailModal from "@/components/modals/email";
import GithubModal from "@/components/modals/github";
import ResumeModal from "@/components/modals/resume";
import AboutMeModal from "@/components/modals/about";
import SpotifyModal from "@/components/modals/spotify";
import BehanceModal from "@/components/modals/behance";
import ProjectsModal from "@/components/modals/projects";
import TransitionOverlay from "@/components/TransitionOverlay";
import Footer from "@/app/footer";
import { useClickSound } from "@/hooks/click";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [minimizedTabs, setMinimizedTabs] = useState<string[]>([]);
  const [iconsInFooter, setIconsInFooter] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const clickSound = useClickSound();

  const { t } = useTranslation("home");

  const handleClick = (key: string) => {
    setSelected((prev) => (prev === key ? null : key));
  };

  const handleDoubleClick = (key: string) => {
    setOpenTab(key);
    setIconsInFooter((prev) => (!prev.includes(key) ? [...prev, key] : prev));
    setMinimizedTabs((prev) => prev.filter((tab) => tab !== key));
  };

  const handleMinimizeTab = (key: string) => {
    setMinimizedTabs((prev) => [...prev, key]);
    setIconsInFooter((prev) => (prev.includes(key) ? prev : [...prev, key]));
    setOpenTab(null);
  };

  const handleRestoreTab = (key: string) => {
    setMinimizedTabs((prev) => prev.filter((tab) => tab !== key));
    setOpenTab(key);
  };

  const handleCloseTab = (key: string) => {
    setOpenTab(null);
    setIconsInFooter((prev) => prev.filter((tab) => tab !== key));
    setMinimizedTabs((prev) => prev.filter((tab) => tab !== key));
  };

  const modalComponents: Record<string, React.ReactNode> = {
    Education: <EducationModal />,
    Work: <WorkModal />,
    AboutMe: <AboutMeModal />,
    Email: <EmailModal />,
    Github: <GithubModal />,
    Spotify: <SpotifyModal />,
    Behance: <BehanceModal />,
    Projects: <ProjectsModal />,
    Resume: (
      <ResumeModal isOpen={true} onClose={() => handleCloseTab("Resume")} />
    ),  
  };

  return (
    <section
      className="min-h-[100dvh] relative overflow-hidden font-yomogi"
      onClick={() => setSelected(null)}
    >
      <div className="fixed inset-0 bg-mesh-gradient-vertical bg-cover bg-center" /> //background
      <div className="fixed inset-0 bg-grid-pattern bg-grid-size opacity-50" /> //background

      <TransitionOverlay isActive={isTransitioning} />
       
       */Icons/*
      <div className="ml-4 md:ml-0 mt-6 relative z-10">
        <div className="grid grid-cols-2 grid-rows-3 w-2/5 md:w-1/5 text-defaultText gap-4">
          {[
            { component: <Education />, key: "Education", label: t("education") },
            { component: <Work />, key: "Work", label: t("work") },
            { component: <AboutMe />, key: "AboutMe", label: t("about") },
            { component: <Email />, key: "Email", label: t("email") },
            { component: <Github />, key: "Github", label: t("github") },
            { component: <Resume />, key: "Resume", label: t("resume") },
            { component: <Spotify />, key: "Spotify", label: t("spotify") },
            { component: <Behance />, key: "Behance", label: t("behance") },
            { component: <Projects />, key: "Projects", label: t("projects") },
          ].map((item) => (
            <div
              key={item.key}
              className={`group p-1 border-2 rounded-lg border-transparent flex flex-col items-center justify-center h-full transition-all duration-200
                ${
                  selected === item.key
                    ? "bg-cvs-rose bg-opacity-60 border-cvs-pink"
                    : "hover:bg-cvs-rose hover:bg-opacity-40 hover:border-cvs-pink"
                }`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(item.key);
                clickSound();
              }}
              onDoubleClick={() => handleDoubleClick(item.key)}
              
            >
              <div className="flex flex-col items-center justify-center w-full text-center">
                {item.component}
                <span className="text-defaultText font-bold text-lg xl2:text-4xl">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openTab && !minimizedTabs.includes(openTab) && (
        <Modal
          title={t(openTab)}
          onClose={() => handleCloseTab(openTab)}
          onMinimize={() => handleMinimizeTab(openTab)}
        >
          {modalComponents[openTab] || null}
        </Modal>
      )}
      <Footer
        iconsInFooter={iconsInFooter}
        minimizedTabs={minimizedTabs}
        setIsTransitioning={setIsTransitioning}
        onRestoreTab={handleRestoreTab}
      />
    </section>
  );
}
