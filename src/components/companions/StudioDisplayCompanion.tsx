"use client";

import React, { useState } from "react";

interface StudioDisplayCompanionProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * StudioDisplayCompanion
 * Sleek Apple Studio Display desktop workstation monitor on an aluminum L-stand.
 * - Perfectly themed to match the website's dark cosmic emerald palette (#060B06 & #5DD62C).
 * - Toggles between:
 *   1. "Cosmic Emerald Aurora" display wallpaper with micro scanline grid.
 *   2. "Live Kernel Telemetry" terminal mode with real-time stats.
 * - Micro-interactions:
 *   - Hover: Display screen illuminates, ambient emerald underglow intensifies.
 *   - Click: Switches display mode with tactile audio feedback.
 */
export const StudioDisplayCompanion: React.FC<StudioDisplayCompanionProps> = ({
  className = "",
  size = "md",
}) => {
  const [displayMode, setDisplayMode] = useState<"aurora" | "terminal">("aurora");

  const toggleMode = () => {
    setDisplayMode((prev) => (prev === "aurora" ? "terminal" : "aurora"));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  const sizeClasses = {
    sm: "w-64 h-52",
    md: "w-80 h-64",
    lg: "w-96 h-76",
  }[size];

  return (
    <div
      onClick={toggleMode}
      className={`group relative flex flex-col items-center justify-end select-none cursor-pointer transition-transform duration-300 ${sizeClasses} hover:scale-[1.02] ${className}`}
      role="button"
      tabIndex={0}
      title="Click to toggle display mode"
    >
      {/* Ambient Emerald Underglow */}
      <div className="absolute -bottom-2 w-48 h-6 bg-[#5DD62C]/15 blur-xl rounded-full transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-[#5DD62C]/30 pointer-events-none" />

      {/* Monitor Outer Chassis */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-[#0C120C] p-2 shadow-2xl transition-all duration-300 group-hover:border-[#5DD62C]/60 group-hover:shadow-[0_12px_36px_rgba(93,214,44,0.18)]">
        {/* Subtle Screen Bezel */}
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#060B06] flex flex-col justify-between">
          {displayMode === "aurora" ? (
            /* Mode 1: Cosmic Emerald Aurora Wallpaper */
            <div className="relative h-full w-full overflow-hidden flex flex-col justify-between p-3.5">
              {/* Emerald Radial Gradient Background */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 120%, #5DD62C 0%, #1E4E1C 35%, #0B1D0D 65%, #060B06 100%)",
                }}
              />

              {/* Scanline & Micro-Grid Texture */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* CRT Scanline Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 4px)",
                }}
              />

              {/* Top Bar: Specs & Status */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-0.5 font-mono text-[9px] text-white/90 backdrop-blur-xs border border-white/15 shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] shadow-[0_0_6px_#5DD62C] animate-pulse" />
                  <span className="font-semibold text-[#5DD62C]">DISPLAY 001</span>
                </div>
                <span className="font-mono text-[9px] text-white/70 bg-black/50 px-2 py-0.5 rounded border border-white/10 backdrop-blur-xs">
                  5K // 60HZ
                </span>
              </div>

              {/* Center Vector Typography */}
              <div className="relative z-10 text-center my-auto">
                <div className="font-mono text-[10px] tracking-[0.25em] text-[#5DD62C] uppercase font-bold drop-shadow-md">
                  LUTFAN.OS v2.4
                </div>
                <div className="font-mono text-[9px] text-white/80 tracking-wider mt-0.5">
                  COSMIC EMERALD CALIBRATION
                </div>
              </div>

              {/* Bottom Footer Info */}
              <div className="relative z-10 flex items-center justify-between pt-1 border-t border-white/15 font-mono text-[9px] text-white/70">
                <span>COLOR: #060B06 &amp; #5DD62C</span>
                <span className="text-[#5DD62C] font-semibold group-hover:text-white transition-colors">
                  [TAP TO TOGGLE]
                </span>
              </div>
            </div>
          ) : (
            /* Mode 2: Live Kernel Telemetry Terminal */
            <div className="relative h-full w-full overflow-hidden bg-[#070D07] p-3.5 font-mono text-[10px] text-[#5DD62C] flex flex-col justify-between">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-white/70 text-[9px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#5DD62C]" />
                  <span className="text-white font-semibold">KERNEL://LIVE_MONITOR</span>
                </div>
                <span className="text-[#5DD62C] font-bold">60 FPS</span>
              </div>

              {/* Telemetry Lines */}
              <div className="space-y-1 py-1">
                <p className="text-white/90">$ sysctl --inspect lutfan.core</p>
                <p className="text-[#5DD62C]">&gt; Engine: Next.js 14 / Three.js</p>
                <p className="text-white/70">&gt; Python 3.12 • NumPy • PyTorch</p>
                <p className="text-white/70">&gt; AdaptLearn Engine: ACTIVE</p>
                <p className="text-[#5DD62C] font-semibold">&gt; Status: ALL SYSTEMS NOMINAL</p>
              </div>

              {/* Terminal Footer */}
              <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-[9px] text-white/50">
                <span>MEM: 38.4 MB</span>
                <span className="text-[#5DD62C]">[AURORA MODE ↗]</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sleek Aluminum L-Stand Base */}
      <div className="flex flex-col items-center">
        {/* Vertical Stand Column */}
        <div className="h-5 w-7 bg-gradient-to-b from-[#2E362E] to-[#1E241E] border-x border-[#5DD62C]/20 shadow-inner" />
        {/* Horizontal Foot Pedestal */}
        <div className="h-2 w-24 rounded-t-sm rounded-b-md bg-gradient-to-r from-[#2A332B] via-[#3D473E] to-[#2A332B] border border-white/20 shadow-md" />
      </div>
    </div>
  );
};
