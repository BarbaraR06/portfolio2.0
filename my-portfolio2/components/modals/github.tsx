"use client";
import React from "react";

import { GITHUB_URL } from "@/config/constants";

export default function GithubModal() {
  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <a
        className="text-cvs-lightBlue hover:text-cvs-pink transition-colors xl2:text-3xl"
        href={GITHUB_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        {GITHUB_URL}
      </a>
    </div>
  );
}
