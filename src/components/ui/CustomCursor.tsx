"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor
 * Sculptural 3D aerodynamic arrow cursor based on the user's reference image:
 * - Thick, pillowy beveled arrow pointer with smooth rounded corners.
 * - Auto-inverting contrast: turns crisp light/white over dark surfaces,
 *   and rich dark/black over light surfaces.
 * - Hardware-accelerated 60/120 FPS positioning via translate3d with zero lag.
 * - Reactive micro-kinetics: scales and banks subtly on hover and click.
 * - Completely safe on touchscreens (auto-disabled via pointer: fine).
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isOverLightSurface, setIsOverLightSurface] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fineQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(fineQuery.matches);

    if (!fineQuery.matches) return;

    // Enable custom cursor styling on body (hiding OS cursor)
    document.body.classList.add("has-custom-cursor");

    // Helper: Detect whether the cursor is over a light-colored surface
    const checkLightSurface = (target: HTMLElement | null) => {
      if (!target) return false;
      let el: HTMLElement | null = target;
      while (el && el !== document.body) {
        // Explicit light element indicators
        if (
          el.classList.contains("bg-white") ||
          el.classList.contains("bg-[#F4F5F4]") ||
          el.classList.contains("bg-[#F8F8F8]") ||
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA"
        ) {
          return true;
        }

        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
          // Parse rgb/rgba
          const match = bg.match(/\d+/g);
          if (match && match.length >= 3) {
            const r = parseInt(match[0], 10);
            const g = parseInt(match[1], 10);
            const b = parseInt(match[2], 10);
            const a = match[3] ? parseFloat(match[3]) : 1;
            // Perceived luminance
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            if (luminance > 0.55 && a > 0.4) {
              return true;
            }
          }
        }
        el = el.parentElement;
      }
      return false;
    };

    const onPointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isPointer =
          typeof document !== "undefined" && document.body.style.cursor === "pointer";
        const interactive =
          isPointer ||
          Boolean(
            target.closest(
              'a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-cursor="pointer"]'
            )
          );
        setIsHovered(interactive);

        // Check surface luminance under cursor
        const isLight = checkLightSurface(target);
        setIsOverLightSurface(isLight);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Smooth lerping loop for the 3D aerodynamic cursor
    const renderLoop = () => {
      const lerpFactor = 0.35; // Snappy, ultra-responsive tracking
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        // Align precision tip exactly at mouse point (0, 0)
        transform: "translate3d(-100px, -100px, 0)",
      }}
      aria-hidden="true"
    >
      {/* Aerodynamic 3D Beveled Arrow Pointer Container */}
      <div
        className={`relative will-change-transform transition-all duration-150 ease-out ${
          isClicking
            ? "scale-90 -rotate-3"
            : isHovered
            ? "scale-115 rotate-2"
            : "scale-100 rotate-0"
        }`}
      >
        {/* SVG Recreation of User's Uploaded 3D Arrow Cursor */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Dark Theme Lighting (Luminous White & Emerald for Dark Surfaces) */}
            <linearGradient id="cursorBodyDarkSurface" x1="2" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#EAFBE6" />
              <stop offset="100%" stopColor="#5DD62C" />
            </linearGradient>

            {/* Light Theme Lighting (Obsidian Charcoal for Light Surfaces) */}
            <linearGradient id="cursorBodyLightSurface" x1="2" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A332B" />
              <stop offset="60%" stopColor="#111612" />
              <stop offset="100%" stopColor="#060B06" />
            </linearGradient>

            {/* Specular Bevel Top Edge Highlight */}
            <linearGradient id="cursorHighlight" x1="0" y1="0" x2="30" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Ambient Drop Shadow Filter */}
            <filter id="cursorShadow" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="3"
                floodColor={isOverLightSurface ? "rgba(0,0,0,0.4)" : "rgba(93,214,44,0.35)"}
              />
            </filter>
          </defs>

          {/* Main Beveled Aerodynamic Arrow Silhouette (Exact 1:1 match to reference image) */}
          <path
            d="M 2.5 2.5
               C 10.0 2.8, 22.0 6.2, 30.2 10.5
               C 32.0 12.5, 28.5 15.2, 24.5 15.8
               C 19.0 16.8, 16.5 19.5, 15.0 23.5
               C 13.5 27.5, 11.5 31.8, 9.2 31.5
               C 7.0 31.0, 5.8 26.0, 5.0 20.5
               C 3.8 13.5, 2.8 6.5, 2.5 2.5 Z"
            fill={isOverLightSurface ? "url(#cursorBodyLightSurface)" : "url(#cursorBodyDarkSurface)"}
            stroke={isOverLightSurface ? "#5DD62C" : "#060B06"}
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#cursorShadow)"
          />

          {/* 3D Bevel Top Ridge Highlight */}
          <path
            d="M 3.8 4.2 C 10.5 4.8, 18.0 7.5, 24.0 11.5"
            stroke="url(#cursorHighlight)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Emerald Center Indicator Core on Hover */}
          {isHovered && (
            <circle
              cx="11"
              cy="11"
              r="2"
              fill={isOverLightSurface ? "#5DD62C" : "#060B06"}
              className="animate-ping opacity-75"
            />
          )}
        </svg>

        {/* Pulsing Emerald Target Reticle when Hovering Buttons / Canvas */}
        {isHovered && (
          <div className="absolute -top-1 -left-1 h-8 w-8 rounded-full border border-[#5DD62C]/60 pointer-events-none animate-pulse" />
        )}
      </div>
    </div>
  );
};
