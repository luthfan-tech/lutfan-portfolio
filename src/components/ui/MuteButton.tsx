"use client";

import React, { useState } from "react";
import { useArchiveStore } from "@/lib/store";

export interface MuteButtonProps {
  className?: string;
}

export const MuteButton: React.FC<MuteButtonProps> = ({ className = "" }) => {
  const isMuted = useArchiveStore((state) => state.isMuted);
  const volume = useArchiveStore((state) => state.volume);
  const toggleMute = useArchiveStore((state) => state.toggleMute);
  const setVolume = useArchiveStore((state) => state.setVolume);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative flex items-center gap-2 rounded-full border border-[#202020]/15 bg-[#F8F8F8]/92 p-2 text-[#0F0F0F] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[#0F0F0F]/30 hover:bg-[#0F0F0F]/5 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Audio controls"
    >
      {/* Volume Slider (reveals smoothly on hover) */}
      <div
        className={`flex items-center overflow-hidden transition-all duration-300 ${
          isHovered ? "w-20 opacity-100 pr-1 pl-2" : "w-0 opacity-0 p-0"
        }`}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            const newVol = parseFloat(e.target.value);
            setVolume(newVol);
            if (isMuted && newVol > 0) {
              toggleMute();
            }
          }}
          className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-[#202020]/20 accent-[#5DD62C] focus:outline-none"
          title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
        />
      </div>

      {/* Main Toggle Mute Button */}
      <button
        onClick={toggleMute}
        className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:text-[#337418]"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted || volume === 0 ? (
          // Muted Icon
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 14l4-4m0 0l-4-4m4 4H15"
            />
          </svg>
        ) : (
          // Unmuted / Audio Waves Icon
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
