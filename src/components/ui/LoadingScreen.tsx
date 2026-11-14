"use client";

import React, { useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";

export interface LoadingScreenProps {
  onLoaded?: () => void;
  minDisplayTimeMs?: number;
}

/**
 * LoadingScreen
 * A clean, architectural loading experience for the portfolio:
 * - Listens to Three.js / R3F asset loading via Drei's `useProgress`.
 * - Employs smooth spring-like progress interpolation (0% -> 100%) so there are zero abrupt jumps.
 * - Isometric animated voxel cube brand emblem in #5DD62C, #337418, and #0F0F0F.
 * - Sleek precision progress bar with segmented micro-voxel ticks.
 * - Dynamic architectural telemetry status log lines.
 * - Smooth, graceful fade-out transition once loading completes.
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoaded,
  minDisplayTimeMs = 1200,
}) => {
  const { active, progress: dreiProgress } = useProgress();

  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const rafIdRef = useRef<number | null>(null);
  const targetProgressRef = useRef<number>(0);
  const isFinishedRef = useRef<boolean>(false);

  // Track progress smoothly using requestAnimationFrame
  useEffect(() => {
    startTimeRef.current = Date.now();

    const updateLoop = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const timeRatio = Math.min(1, elapsed / minDisplayTimeMs);

      // We ensure the target progress advances gracefully with time and Drei's real progress
      const simulatedBase = timeRatio * 100;
      const rawTarget = Math.max(simulatedBase, dreiProgress);
      targetProgressRef.current = Math.min(100, rawTarget);

      setDisplayProgress((prev) => {
        // Smooth lerp towards target
        const diff = targetProgressRef.current - prev;
        if (Math.abs(diff) < 0.25) {
          return targetProgressRef.current;
        }
        return prev + diff * 0.14;
      });

      // Check if both time and Drei assets have completed
      const isDreiDone = !active || dreiProgress >= 100;
      const isTimeDone = elapsed >= minDisplayTimeMs;

      if (isDreiDone && isTimeDone && targetProgressRef.current >= 100 && !isFinishedRef.current) {
        setDisplayProgress(100);
        isFinishedRef.current = true;

        // Soft foley feedback on completion
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("foley-click"));
        }

        // Brief hold on 100% before initiating graceful fade-out
        setTimeout(() => {
          setIsFadingOut(true);
          onLoaded?.();

          // Unmount after transition duration completes (650ms)
          setTimeout(() => {
            setIsRemoved(true);
          }, 700);
        }, 220);

        return;
      }

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [active, dreiProgress, minDisplayTimeMs, onLoaded]);

  if (isRemoved) return null;

  const roundedProgress = Math.min(100, Math.floor(displayProgress));

  // Telemetry status readout changing dynamically with progress
  const getTelemetryStatus = () => {
    if (roundedProgress < 25) {
      return "01/04 // INITIALIZING THREE.JS KERNEL & WEBGL2";
    } else if (roundedProgress < 55) {
      return "02/04 // CONSTRUCTING 3D VOXEL MATRICES & SHADERS";
    } else if (roundedProgress < 85) {
      return "03/04 // MOUNTING CRT TERMINAL & AI AGENTS";
    } else if (roundedProgress < 100) {
      return "04/04 // STABILIZING 60FPS ORBIT RIG & AUDIO ENGINE";
    }
    return "READY // SYSTEM OPERATIONAL // ENTERING ARCHIVE";
  };

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio experience"
      className={`fixed inset-0 z-[99999] flex flex-col justify-between bg-[#F8F8F8] px-6 py-6 sm:px-12 sm:py-10 select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut
          ? "opacity-0 pointer-events-none scale-[1.015] blur-[1px]"
          : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* --- TOP ARCHITECTURAL METADATA BAR --- */}
      <div className="flex w-full items-center justify-between font-mono text-[11px] tracking-wider text-[#202020]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#0F0F0F]">LUTFAN // ARCHIVE</span>
          <span className="text-[#337418]">•</span>
          <span className="text-neutral-500 hidden sm:inline">BOOT SEQUENCE</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              roundedProgress >= 100
                ? "bg-[#5DD62C] shadow-[0_0_8px_#5DD62C]"
                : "bg-[#337418] animate-pulse"
            }`}
          />
          <span className="font-semibold text-[#0F0F0F] uppercase">
            {roundedProgress >= 100 ? "ONLINE" : "INITIALIZING"}
          </span>
        </div>
      </div>

      {/* --- CENTERPIECE: ISOMETRIC VOXEL EMBLEM + BRAND TOUCH + PROGRESS --- */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Animated Isometric Voxel Cube Cluster */}
        <div className="relative mb-8 h-20 w-20 flex items-center justify-center">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle, rgba(93, 214, 44, 0.22) 0%, rgba(51, 116, 24, 0.08) 50%, transparent 70%)",
              filter: "blur(14px)",
              transform: `scale(${0.8 + (roundedProgress / 100) * 0.4})`,
            }}
          />

          {/* Isometric Voxel Cube SVG */}
          <svg
            viewBox="0 0 100 100"
            className="h-16 w-16 drop-shadow-sm transition-transform duration-300"
            style={{
              transform: `scale(${0.92 + Math.sin(displayProgress * 0.1) * 0.05})`,
            }}
          >
            {/* Voxel Cube 1 (Base Left) */}
            <g transform="translate(14, 28)">
              {/* Top Face */}
              <polygon points="20,0 40,11 20,22 0,11" fill="#5DD62C" />
              {/* Left Face */}
              <polygon points="0,11 20,22 20,44 0,33" fill="#337418" />
              {/* Right Face */}
              <polygon points="20,22 40,11 40,33 20,44" fill="#0F0F0F" />
            </g>

            {/* Voxel Cube 2 (Base Right) */}
            <g transform="translate(46, 28)">
              {/* Top Face */}
              <polygon points="20,0 40,11 20,22 0,11" fill="#5DD62C" />
              {/* Left Face */}
              <polygon points="0,11 20,22 20,44 0,33" fill="#337418" />
              {/* Right Face */}
              <polygon points="20,22 40,11 40,33 20,44" fill="#202020" />
            </g>

            {/* Voxel Cube 3 (Elevated Apex) */}
            <g
              transform={`translate(30, ${10 - (displayProgress / 100) * 6})`}
              className="transition-transform duration-200"
            >
              {/* Top Face */}
              <polygon points="20,0 40,11 20,22 0,11" fill="#5DD62C" />
              {/* Left Face */}
              <polygon points="0,11 20,22 20,44 0,33" fill="#337418" />
              {/* Right Face */}
              <polygon points="20,22 40,11 40,33 20,44" fill="#0F0F0F" />
            </g>
          </svg>
        </div>

        {/* Brand Typographic Wordmark */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <h1 className="font-mono text-xl sm:text-2xl font-bold tracking-[0.32em] text-[#0F0F0F]">
              LUTFAN
            </h1>
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] shadow-[0_0_6px_#5DD62C]" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.24em] text-[#337418] uppercase mt-1.5 font-medium">
            CREATIVE DEVELOPER &amp; ARCHITECT
          </span>
        </div>

        {/* --- SLEEK PROGRESS BAR & PERCENTAGE READOUT --- */}
        <div className="mt-8 flex flex-col items-center w-full max-w-xs sm:max-w-sm">
          {/* Percentage Value with Tabular Monospace Digits */}
          <div className="flex items-baseline justify-between w-full mb-2 font-mono text-xs">
            <span className="text-[10px] tracking-widest text-[#202020] uppercase font-medium">
              SYSTEM READINESS
            </span>
            <span className="font-semibold text-[#0F0F0F] tabular-nums tracking-wider text-sm">
              [{String(roundedProgress).padStart(3, "0")}%]
            </span>
          </div>

          {/* Continuous Ultra-Thin Precision Bar */}
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-[#E6E4DC]">
            <div
              className="h-full rounded-full bg-[#5DD62C] transition-all duration-150 ease-out will-change-[width]"
              style={{
                width: `${displayProgress}%`,
                boxShadow: "0 0 10px rgba(93, 214, 44, 0.75)",
              }}
            />
          </div>

          {/* Segmented Micro-Voxel Ticks */}
          <div className="flex items-center justify-between w-full mt-2.5 px-0.5">
            {Array.from({ length: 16 }).map((_, i) => {
              const threshold = (i / 15) * 100;
              const isFilled = roundedProgress >= threshold;
              return (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-[1px] transition-colors duration-200 ${
                    isFilled
                      ? "bg-[#5DD62C] shadow-[0_0_4px_rgba(93,214,44,0.6)]"
                      : "bg-[#E6E4DC]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* --- BOTTOM TELEMETRY LOG & SPECIFICATIONS --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E6E4DC] pt-5 font-mono text-[10px] text-neutral-500 tracking-wider">
        {/* Dynamic Telemetry Log Line */}
        <div className="flex items-center gap-2">
          <span className="text-[#337418] font-bold">›</span>
          <span className="text-[#202020] font-medium tracking-wide">
            {getTelemetryStatus()}
          </span>
        </div>

        {/* Runtime Spec Marker */}
        <div className="flex items-center gap-3">
          <span>WEBGL2 // THREE.JS 169</span>
          <span className="text-neutral-300">•</span>
          <span className="text-[#0F0F0F] font-semibold">60 FPS ENGINE</span>
        </div>
      </div>
    </aside>
  );
};
