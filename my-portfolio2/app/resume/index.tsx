import React from "react";

import { CV_FILE } from "@/config/constants";

export default function Resume() {
  const handleResumeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");

    link.href = CV_FILE;
    link.download = "Barbara-Ruiz-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="items-center flex flex-col">
      <img
        alt="Resume Icon"
        className="md:w-32 md:h-32 w-20 h-20 "
        src="/resume.svg"
        onClick={handleResumeClick}
      />
    </div>
  );
}
