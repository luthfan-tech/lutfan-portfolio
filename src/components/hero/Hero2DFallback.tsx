"use client";

import React, { useState, useEffect, useRef } from "react";

export interface Hero2DFallbackProps {
  className?: string;
  onExploreWork?: () => void;
}

/**
 * Hero2DFallback
 * A high-fidelity, architectural 2D fallback for the hero section:
 * - Employs isometric/voxel layered typography for "LUTFAN MOHAMMED ASIF" in #5DD62C, #337418, #0F0F0F.
 * - Corner atmospheric elements: Mars, Singularity Core, and MCU Microcontroller.
 * - Supports smooth mouse-tracking parallax and interactive click reactions.
 * - Zero WebGL required; runs at 60 FPS on low-power devices, battery saver, and non-WebGL browsers.
 */
export const Hero2DFallback: React.FC<Hero2DFallbackProps> = ({
  className = "",
  onExploreWork,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Smooth mouse parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === "undefined") return;
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x: xRatio * 14, y: yRatio * 10 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden flex items-center justify-center select-none bg-transparent ${className}`}
    >
      {/* ================================================================ */}
      {/* --- ATMOSPHERIC 2D CORNER ELEMENTS ---------------------------- */}
      {/* ================================================================ */}

      {/* 1. Mars Planet (Top-Right Atmospheric Element) */}
      <div
        className="absolute top-16 right-8 sm:top-20 sm:right-16 lg:right-24 pointer-events-none transition-transform duration-500 ease-out z-10"
        style={{
          transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px)`,
        }}
      >
        <div className="relative flex flex-col items-center group pointer-events-auto cursor-pointer">
          <div className="relative h-14 w-14 sm:h-18 sm:w-18 md:h-20 md:w-20 rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
            {/* Emerald Exoplanet Sphere Gradient */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, #5DD62C 0%, #2E7D1B 45%, #184410 80%, #081C06 100%)",
                boxShadow:
                  "inset -4px -4px 8px rgba(6, 11, 6, 0.7), 0 0 20px rgba(93, 214, 44, 0.35)",
              }}
            />
            {/* Crater 1 */}
            <div className="absolute top-3 left-4 h-3 w-4 rounded-full bg-[#0E290C]/50 -rotate-12 border border-[#5DD62C]/30" />
            {/* Crater 2 */}
            <div className="absolute bottom-4 right-3 h-4 w-5 rounded-full bg-[#0E290C]/40 rotate-15 border border-[#5DD62C]/30" />
            {/* Satellite / Moon Orbit Ring */}
            <div className="absolute -inset-2.5 rounded-full border border-[#5DD62C]/30 rotate-45 animate-spin-slow pointer-events-none">
              <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#F8F8F8] shadow-[0_0_8px_#5DD62C]" />
            </div>
          </div>
          <span className="mt-2 font-mono text-[9px] tracking-widest text-[#5DD62C] uppercase font-semibold">
            GLIESE // CORE
          </span>
        </div>
      </div>

      {/* 2. Soft Gravitational Black Hole (Top-Left Atmospheric Element) */}
      <div
        className="absolute top-16 left-6 sm:top-20 sm:left-14 lg:left-20 pointer-events-none transition-transform duration-500 ease-out z-10"
        style={{
          transform: `translate(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px)`,
        }}
      >
        <div className="relative flex flex-col items-center group pointer-events-auto cursor-pointer">
          <div className="relative h-14 w-14 sm:h-18 sm:w-18 md:h-20 md:w-20 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
            {/* Gravitational Lensing Glow */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#337418]/25 via-transparent to-[#5DD62C]/15 blur-md animate-pulse" />
            {/* Accretion Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-[#5DD62C]/40 rotate-12 animate-spin-slow" />
            {/* Event Horizon Core */}
            <div
              className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-[#0F0F0F] relative shadow-inner"
              style={{
                boxShadow:
                  "inset 0 0 10px rgba(0, 0, 0, 0.95), 0 0 12px rgba(93, 214, 44, 0.35)",
              }}
            >
              <span className="absolute inset-1 rounded-full border border-[#202020]" />
            </div>
          </div>
          <span className="mt-2 font-mono text-[9px] tracking-widest text-[#337418] uppercase font-semibold">
            SINGULARITY // CORE
          </span>
        </div>
      </div>

      {/* 3. Electronic / Microcontroller PCB (Bottom-Right Atmospheric Element) */}
      <div
        className="absolute bottom-28 right-8 sm:bottom-28 sm:right-16 lg:right-24 hidden sm:block pointer-events-none transition-transform duration-500 ease-out z-10"
        style={{
          transform: `translate(${mouseOffset.x * -0.4}px, ${mouseOffset.y * -0.4}px)`,
        }}
      >
        <div className="relative flex flex-col items-center group pointer-events-auto cursor-pointer p-2.5 rounded-lg border border-[#202020]/15 bg-[#F8F8F8]/90 backdrop-blur-sm shadow-sm transition-transform duration-200 hover:border-[#5DD62C]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] animate-ping" />
            <span className="font-mono text-[9px] font-bold text-[#0F0F0F] tracking-wider">
              MCU // ARDUINO
            </span>
          </div>
          <div className="h-6 w-16 bg-[#202020] rounded flex items-center justify-between px-1.5 text-[8px] font-mono text-[#5DD62C]">
            <span>TX</span>
            <span className="h-1 w-1 bg-[#5DD62C] rounded-full" />
            <span>RX</span>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* --- AMBIENT FLOATING PIXEL LEAVES / DRIFT PARTICLES ----------- */}
      {/* ================================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "15%", y: "25%", delay: "0s", duration: "8s", color: "#5DD62C" },
          { x: "85%", y: "30%", delay: "1.5s", duration: "9s", color: "#337418" },
          { x: "25%", y: "75%", delay: "3s", duration: "7.5s", color: "#5DD62C" },
          { x: "78%", y: "70%", delay: "4.5s", duration: "10s", color: "#337418" },
          { x: "50%", y: "15%", delay: "2s", duration: "8.5s", color: "#5DD62C" },
          { x: "40%", y: "85%", delay: "5s", duration: "9.5s", color: "#337418" },
        ].map((particle, idx) => (
          <div
            key={`p-${idx}`}
            className="absolute h-2 w-2 rounded-sm opacity-60 animate-float-leaf"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              boxShadow: `0 0 6px ${particle.color}`,
            }}
          />
        ))}
      </div>

      {/* ================================================================ */}
      {/* --- MAIN HERO 2D CENTERPIECE (VOXEL NAME TYPOGRAPHY) ---------- */}
      {/* ================================================================ */}
      <div
        className="relative z-20 flex flex-col items-center justify-center max-w-6xl w-full px-4 sm:px-8 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouseOffset.x}px, ${mouseOffset.y + 28}px)`,
        }}
      >
        {/* Soft Ground Contact Shadow */}
        <div
          className="absolute -bottom-8 h-10 w-3/4 max-w-2xl rounded-full blur-xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(15, 15, 15, 0.28) 0%, rgba(51, 116, 24, 0.12) 45%, rgba(0, 0, 0, 0) 75%)",
          }}
        />

        {/* -------------------------------------------------------------- */}
        {/* --- DENSE VOXEL ISOMETRIC TYPOGRAPHY: LUTFAN MOHAMMED ASIF --- */}
        {/* -------------------------------------------------------------- */}
        <div className="flex flex-col items-center justify-center text-center w-full my-4 py-2">
          {/* Subtitle / Architectural Tag */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] shadow-[0_0_8px_#5DD62C]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#337418] uppercase font-bold">
              VOXEL ARCHITECTURE // 2D LITE ENGINE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] shadow-[0_0_8px_#5DD62C]" />
          </div>

          {/* Line 1: LUTFAN */}
          <h1
            className="font-mono font-black tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase select-none transition-transform duration-200 hover:scale-[1.02] cursor-default"
            style={{
              color: "#5DD62C",
              textShadow:
                "3px 3px 0 #337418, 6px 6px 0 #0F0F0F, 8px 8px 16px rgba(15, 15, 15, 0.35)",
              letterSpacing: "-0.02em",
            }}
          >
            LUTFAN
          </h1>

          {/* Line 2: MOHAMMED ASIF */}
          <h2
            className="font-mono font-black tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase select-none transition-transform duration-200 hover:scale-[1.02] cursor-default mt-1 sm:mt-2"
            style={{
              color: "#5DD62C",
              textShadow:
                "2px 2px 0 #337418, 4px 4px 0 #0F0F0F, 6px 6px 14px rgba(15, 15, 15, 0.3)",
              letterSpacing: "-0.01em",
            }}
          >
            MOHAMMED ASIF
          </h2>

          {/* Subtext description */}
          <p className="mt-3 sm:mt-4 max-w-lg text-xs sm:text-sm font-medium text-[#202020] px-4 leading-relaxed">
            Creative Developer specializing in spatial systems, algorithmic architecture,
            and generative AI interfaces. Running in optimized 2D fallback mode.
          </p>
        </div>
      </div>
    </div>
  );
};
