"use client";
import React from "react";
import { GITHUB_URL } from "@/config/constants";

export default function GithubModal() {

  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <a 
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cvs-lightBlue hover:text-cvs-pink transition-colors xl2:text-3xl"
      >
        {GITHUB_URL}
      </a>
    </div>
  );
}
