import React from "react";

import { BEHANCE_URL } from "@/config/constants";

export default function Behance() {
  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(BEHANCE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="items-center flex flex-col">
      <img
        alt="Behance Icon"
        className="w-20 h-20"
        src="/behance.svg"
        onDoubleClick={handleGithubClick}
      />
    </div>
  );
}
