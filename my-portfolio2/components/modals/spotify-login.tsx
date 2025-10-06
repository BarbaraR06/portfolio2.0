"use client";

import Modal from "../modal";
import React from "react";
import { useTranslation } from "react-i18next";

type ModalProps = {
  onMinimize: () => void;
  isOpen?: boolean;
  onClose: () => void;
};

export default function SpotifyLogin({ onClose, onMinimize }: ModalProps) {
  const { t } = useTranslation("music-player");

  return (
    <>
      <Modal
        title={t("title")}
        onClose={onClose}
        onMinimize={onMinimize}
      >
        <p className="text-center mt-4 text-xl text-defaultText">
          {t("login_with_spotify")}
        </p>
        <div className="flex gap-4 mt-10 justify-center font-bold text-defaultText text-center ">
          <a
            href="/api/spotify/login"
            className="bg-cvs-lightBlue px-4 py-2 rounded hover:bg-cvs-darkBlue hover:text-white w-full uppercase"
          >
            {t("login_spotify")}
          </a>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-600 hover:text-white w-full uppercase"
          >
            {t("cancel")}
          </button>
        </div>
      </Modal>
    </>
  );
}
