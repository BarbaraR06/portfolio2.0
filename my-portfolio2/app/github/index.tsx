import React from "react";

import { GITHUB_URL } from "@/config/constants";

export default function Github() {
  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="items-center flex flex-col">
      <img
        alt="Github Icon"
        className="md:w-32 md:h-32 w-20 h-20 "
        src="/github.svg"
        onDoubleClick={handleGithubClick}
      />
    </div>
  );
}
