"use client";
import React from "react";

import { BEHANCE_URL } from "@/config/constants";

export default function BehanceModal() {
  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <a
        className="text-cvs-lightBlue hover:text-cvs-pink transition-colors xl2:text-3xl"
        href={BEHANCE_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        {BEHANCE_URL}
      </a>
    </div>
  );
}
