"use client";
import Education from "./education";
import Email from "./email";
import Work from "./work";
import Resume from "./resume";
import Github from "./github";
import AboutMe from "./about-me";
import Modal from "@/components/modal";
import React, { useState } from "react";
import EducationModal from "@/components/modals/education";
import WorkModal from "@/components/modals/work";
import EmailModal from "@/components/modals/email";
import GithubModal from "@/components/modals/github";
import ResumeModal from "@/components/modals/resume";
import Footer from "@/app/footer";
import { useTranslation } from "react-i18next";
import AboutMeModal from "@/components/modals/about";
import TransitionOverlay from "@/components/TransitionOverlay";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [openTab, setOpenTab] = useState<string | null>(null);
  const [minimizedTabs, setMinimizedTabs] = useState<string[]>([]);
  const [iconsInFooter, setIconsInFooter] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useTranslation('home');

  const handleClick = (key: string) => {
    setSelected((prev) => (prev === key ? null : key));
  };

  const handleDoubleClick = (key: string) => {
    setOpenTab(key);

    setIconsInFooter((prev) => {
      if (!prev.includes(key)) {
        return [...prev, key];
      }
      return prev;
    });
    setMinimizedTabs((prev) => prev.filter((tab) => tab !== key));
  };

  const handleMinimizeTab = (key: string) => {
    setMinimizedTabs((prev) => [...prev, key]);
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
    Resume: <ResumeModal />,
  };

  return (
    <section onClick={() => setSelected(null)} className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-mesh-gradient-vertical bg-cover bg-center" />
      <div className="fixed inset-0 bg-grid-pattern bg-grid-size opacity-50" />
      
      <TransitionOverlay isActive={isTransitioning} />
      <div className="ml-4 mt-10 relative z-10">
        <div className="grid grid-cols-2 grid-rows-3 w-1/2 gap-4 md:w-1/5 text-defaultText">
          {[
            { component: <Education />, key: "Education", label: t("education") },
            { component: <Work />, key: "Work", label: t("work") },
            { component: <AboutMe />, key: "AboutMe", label: t("about") },
            { component: <Email />, key: "Email", label: t("email") },
            { component: <Github />, key: "Github", label: t("github") },
            { component: <Resume />, key: "Resume", label: t("resume") },
          ].map((item) => (
            <div
              key={item.key}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(item.key);
              }}
              onDoubleClick={() => handleDoubleClick(item.key)}
              className={`group p-4 border-2 rounded-lg border-transparent flex flex-col items-center justify-center w-full h-full transition-all duration-200
                ${selected === item.key 
                  ? "bg-cvs-rose bg-opacity-60 border-cvs-pink" 
                  : "hover:bg-cvs-rose hover:bg-opacity-40 hover:border-cvs-pink"}`}
            >
              <div className="flex flex-col items-center justify-center w-full text-center">
                {item.component}
                <span className="text-defaultText font-bold mt-2 text-lg xl2:text-4xl">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openTab && !minimizedTabs.includes(openTab) && (
        <Modal
          title={t(openTab.toLowerCase())}
          onMinimize={() => handleMinimizeTab(openTab)}
          onClose={() => handleCloseTab(openTab)}
        >
          {modalComponents[openTab] || null}
        </Modal>
      )}
      <MusicPlayer />
      <Footer 
        minimizedTabs={minimizedTabs} 
        onRestoreTab={handleRestoreTab} 
        iconsInFooter={iconsInFooter}
        setIsTransitioning={setIsTransitioning}
      />
    </section>
  );
}
