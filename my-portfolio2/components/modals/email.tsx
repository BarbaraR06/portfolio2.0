"use client";
import React from "react";

import { CONTACT_EMAIL } from "@/config/constants";

export default function EmailModal() {
  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <a
        className="text-cvs-lightBlue hover:text-cvs-pink transition-colors xl2:text-3xl"
        href={`mailto:${CONTACT_EMAIL}`}
      >
        {CONTACT_EMAIL}
      </a>
    </div>
  );
}
