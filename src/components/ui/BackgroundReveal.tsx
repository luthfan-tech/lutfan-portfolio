"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * BackgroundReveal
 * Ethereal, modern background reveal effect that smoothly illuminates
 * a soft light aura and architectural micro-pattern under the cursor.
 * - Hardware-accelerated 60/120 FPS via requestAnimationFrame + CSS variables (0 React re-renders).
 * - Multi-stop ambient glow palette matching Accent Green #5DD62C and Deeper Green #337418.
 * - Architectural micro-dot matrix revealed via dynamic radial gradient mask.
 * - Safe on mobile / touch devices (hidden via pointer: fine).
 */
export const BackgroundReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -1000, y: -1000 });
  const auraPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);

  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [isCanvas, setIsCanvas] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fineQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(fineQuery.matches);
    if (!fineQuery.matches) return;

    const onPointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (containerRef.current) {
        containerRef.current.style.setProperty("--cursor-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--cursor-y", `${e.clientY}px`);
        containerRef.current.style.opacity = "1";
      }

      // Check hover context for dynamic aura modulation
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest(
            'a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-cursor="pointer"]'
          )
        );
        setIsInteractive(interactive);

        const canvas = Boolean(target.closest("canvas"));
        setIsCanvas(canvas);
      }
    };

    const onPointerLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    };

    const onPointerEnter = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.documentElement.addEventListener("mouseenter", onPointerEnter);

    // Smooth lerp loop for the ambient light aura follower
    const renderLoop = () => {
      const lerpFactor = 0.12;
      auraPos.current.x += (mousePos.current.x - auraPos.current.x) * lerpFactor;
      auraPos.current.y += (mousePos.current.y - auraPos.current.y) * lerpFactor;

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraPos.current.x}px, ${auraPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.documentElement.removeEventListener("mouseenter", onPointerEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-0 transition-opacity duration-700 select-none"
      aria-hidden="true"
    >
      {/* 1. Soft Ambient Radial Light Follower (Ethereal Emerald & Sunlight Halo) */}
      <div
        ref={auraRef}
        className={`fixed top-0 left-0 -ml-[340px] -mt-[340px] h-[680px] w-[680px] rounded-full will-change-transform transition-[scale,opacity] duration-500 ease-out ${
          isCanvas
            ? "scale-110 opacity-100"
            : isInteractive
            ? "scale-105 opacity-90"
            : "scale-100 opacity-75"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(93, 214, 44, 0.085) 0%, rgba(93, 214, 44, 0.035) 32%, rgba(51, 116, 24, 0.015) 52%, transparent 72%)",
          filter: "blur(28px)",
        }}
      />

      {/* 2. Architectural Micro-Grid Pattern softly revealed exclusively around the cursor */}
      <div
        className="absolute inset-0 h-full w-full transition-opacity duration-300"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15, 15, 15, 0.09) 1.2px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(circle 340px at var(--cursor-x, -1000px) var(--cursor-y, -1000px), black 0%, rgba(0,0,0,0.5) 45%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle 340px at var(--cursor-x, -1000px) var(--cursor-y, -1000px), black 0%, rgba(0,0,0,0.5) 45%, transparent 80%)",
        }}
      />

      {/* 3. Subtle Ethereal Concentric Halo under the cursor */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background:
            "radial-gradient(circle 240px at var(--cursor-x, -1000px) var(--cursor-y, -1000px), rgba(93, 214, 44, 0.045) 0%, rgba(51, 116, 24, 0.01) 45%, transparent 70%)",
          maskImage:
            "radial-gradient(circle 240px at var(--cursor-x, -1000px) var(--cursor-y, -1000px), black 0%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(circle 240px at var(--cursor-x, -1000px) var(--cursor-y, -1000px), black 0%, transparent 95%)",
        }}
      />
    </div>
  );
};
