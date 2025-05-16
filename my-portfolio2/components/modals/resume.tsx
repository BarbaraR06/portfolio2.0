"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/components/modal";
import { CV_FILE } from "@/config/constants";
type ResumeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { t } = useTranslation("resume");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = CV_FILE;
    link.download = "Barbara-Ruiz-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(false);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <Modal title={t("title")} onClose={onClose} onMinimize={() => {}}>
      <p className="text-center mt-10 text-xl text-defaultText">{t("download")}</p>
      <div className="flex gap-4 mt-10 justify-center font-bold text-defaultText">
        <button
          className="bg-cvs-lightBlue px-4 py-2 rounded hover:bg-cvs-darkBlue hover:text-white w-full uppercase"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {t("yes")}
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-600 hover:text-white w-full uppercase"
          onClick={onClose}
          disabled={isDownloading}
        >
          {t("no")}
        </button>
      </div>
    </Modal>
  );
}
