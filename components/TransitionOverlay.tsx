"use client";
import React from 'react';

interface TransitionOverlayProps {
  isActive: boolean;
}

export default function TransitionOverlay({ isActive }: TransitionOverlayProps) {
  return (
    <div 
      className={`fixed inset-0 bg-[#68254b] transition-opacity duration-500 pointer-events-none z-[9999] ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'opacity' }}
    />
  );
} 