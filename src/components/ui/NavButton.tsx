"use client";

import React, { useState } from "react";

export interface NavButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  showDot?: boolean;
}

/**
 * NavButton
 * Clean, modern navigation button:
 * - Crisp typography
 * - Clean active state with subtle indicator dot
 * - Zero visual noise (no brackets or heavy borders)
 */
export const NavButton: React.FC<NavButtonProps> = ({
  label,
  active = false,
  onClick,
  className = "",
  showDot = true,
}) => {
  const handleClick = () => {
    onClick?.();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative flex items-center gap-1.5 font-mono text-xs tracking-wider transition-all duration-200 focus:outline-none rounded-full px-3.5 py-1.5 ${
        active
          ? "text-white font-semibold bg-white/10 shadow-xs"
          : "text-white/70 hover:text-white hover:bg-white/5"
      } ${className}`}
    >
      {/* Active Indicator Pip */}
      {active && showDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] shadow-[0_0_6px_#5DD62C]" />
      )}

      {/* Button Label */}
      <span className="transition-colors duration-200">{label}</span>
    </button>
  );
};
