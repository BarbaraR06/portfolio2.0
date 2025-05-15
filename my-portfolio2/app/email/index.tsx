import React from "react";
import { CONTACT_EMAIL } from "@/config/constants";

export default function Email() {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  };

  return (
    <div className="items-center flex flex-col">
      <img
        src="/mail.svg"
        alt="Email Icon"
        className="md:w-32 md:h-32 w-20 h-20"
        onClick={handleEmailClick}
      />
    </div>
  );
}
