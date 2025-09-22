import React from "react";
import { useTranslation } from "react-i18next";

import { OPENGRANO_URL, GAME_URL } from "@/config/constants";

export default function ProjectsModal() {
  const { t } = useTranslation("projects");

  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 xl2:gap-6 hover:bg-cvs-pink hover:bg-opacity-30 cursor-pointer">
        <a
          className="text-cvs-lightBlue hover:text-cvs-pink transition-colors xl2:text-3xl"
          href={OPENGRANO_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t("opengrano")}
        </a>
      </div>
      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 xl2:gap-6 hover:bg-cvs-pink hover:bg-opacity-30 cursor-pointer">
        <a
          className="text-cvs-lightBlue hover:text-cvs-pink transition-colors xl2:text-3xl"
          href={GAME_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t("game")}
        </a>
      </div>
    </div>
  );
}
