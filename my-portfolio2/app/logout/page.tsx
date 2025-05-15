"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import TransitionOverlay from "@/components/TransitionOverlay";

export default function LogoutPage() {
  const router = useRouter();
  const { t } = useTranslation("login");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Asegurar que la página sea visible al cargar
    document.body.style.opacity = '1';
  }, []);

  const handleSignIn = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-[#68254b] to-[#552445] flex items-center justify-center">
      <TransitionOverlay isActive={isTransitioning} />
      <div className="login-container bg-white/10 backdrop-blur-lg rounded-xl p-8 flex flex-col items-center gap-6 w-[90%] max-w-md fadeIn">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#cbbddd]">
          <img
            src="/pixel.svg"
            alt="Barbara Ruiz"
            className="w-full object-top"
          />
        </div>
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-2">{t("welcome")}</h2>
          <p className="text-white/80 text-lg">Barbara Ruiz</p>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-[#cbbddd] hover:bg-white/30 text-defaultText hover:text-white py-2 px-4 rounded-lg transition-colors duration-200 font-bold"
        >
          {t("signIn")}
        </button>
      </div>
    </div>
  );
} 