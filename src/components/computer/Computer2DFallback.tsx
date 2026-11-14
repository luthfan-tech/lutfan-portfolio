"use client";

import React, { useState } from "react";
import { Project } from "@/lib/types";

export interface Computer2DFallbackProps {
  className?: string;
  isActive?: boolean;
  mode?: "hero" | "work" | "about";
  activeProject?: Project | null;
}

/**
 * Computer2DFallback
 * High-fidelity 2D vector CRT terminal fallback:
 * - Emulates the retro CRT monitor from ComputerScene without requiring WebGL.
 * - Displays active project telemetry, ASCII wireframes, system memory stats, and scanlines.
 * - Responds to project selection changes and view modes in real time.
 */
export const Computer2DFallback: React.FC<Computer2DFallbackProps> = ({
  className = "",
  mode = "work",
  activeProject,
}) => {
  const [isDegaussing, setIsDegaussing] = useState(false);

  const handleDegauss = () => {
    setIsDegaussing(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
    setTimeout(() => {
      setIsDegaussing(false);
    }, 600);
  };

  return (
    <div
      className={`relative h-full w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F8F8F8] select-none ${className}`}
    >
      {/* Soft Pedestal Shadow */}
      <div
        className="absolute bottom-6 h-8 w-3/4 max-w-md rounded-full blur-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15, 15, 15, 0.35) 0%, rgba(32, 32, 32, 0.15) 50%, rgba(0, 0, 0, 0) 80%)",
        }}
      />

      {/* CRT Monitor Housing */}
      <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl border-4 border-[#202020] bg-[#0F0F0F] p-4 sm:p-5 shadow-2xl flex flex-col justify-between">
        {/* Top Bezel Vents & Model Badge */}
        <div className="flex items-center justify-between pb-2 border-b border-[#202020] font-mono text-[9px] text-[#F8F8F8]/60">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] animate-pulse" />
            <span className="text-[#5DD62C] font-bold">LUTFAN // CRT-01</span>
          </div>
          <div className="flex gap-1 text-[8px] tracking-widest text-[#202020]">
            <span>||||||||||||||||||||</span>
          </div>
          <span>2D LITE FALLBACK</span>
        </div>

        {/* CRT Curved Phosphor Screen */}
        <div
          className={`relative my-2 flex-1 rounded-xl border-2 border-[#202020] bg-[#0A0A0A] p-3 sm:p-4 overflow-hidden font-mono text-xs text-[#5DD62C] flex flex-col justify-between transition-all duration-300 ${
            isDegaussing ? "scale-98 brightness-150 blur-[1px]" : "scale-100"
          }`}
          style={{
            boxShadow:
              "inset 0 0 20px rgba(0, 0, 0, 0.95), inset 0 0 10px rgba(93, 214, 44, 0.15)",
          }}
        >
          {/* Scanline CRT Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.5) 50%)",
              backgroundSize: "100% 4px",
            }}
          />

          {/* Screen Content Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#5DD62C]/30 pb-1.5 text-[10px] tracking-wider">
            <span>TERMINAL: TTY1</span>
            <span>STATUS: 60 FPS // READY</span>
          </div>

          {/* Dynamic Content depending on view mode */}
          <div className="relative z-10 my-auto py-2 flex flex-col gap-2">
            {mode === "work" ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#337418] uppercase tracking-widest font-bold">
                    // ACTIVE REPOSITORY
                  </span>
                  <span className="text-[9px] bg-[#5DD62C]/20 text-[#5DD62C] px-1.5 py-0.5 rounded">
                    VERIFIED
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#F8F8F8] tracking-tight">
                  {activeProject ? activeProject.title : "FEATURED ARCHIVES"}
                </h3>

                <p className="text-[11px] text-[#5DD62C]/85 line-clamp-3 leading-relaxed">
                  {activeProject
                    ? activeProject.summary
                    : "Select a project to inspect architectural parameters, benchmarks, and source repositories."}
                </p>

                {activeProject && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeProject.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-[#5DD62C]/40 bg-[#5DD62C]/10 px-1.5 py-0.5 text-[9px] text-[#5DD62C]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#337418] uppercase tracking-widest font-bold">
                    // BIOGRAPHICAL DOSSIER
                  </span>
                  <span className="text-[9px] bg-[#5DD62C]/20 text-[#5DD62C] px-1.5 py-0.5 rounded">
                    ONLINE
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#F8F8F8] tracking-tight">
                  LUTFAN MOHAMMED ASIF
                </h3>

                <p className="text-[11px] text-[#5DD62C]/85 leading-relaxed">
                  Creative Developer &amp; Systems Architect. Specializing in high-fidelity 3D web environments and generative AI systems.
                </p>

                <div className="text-[10px] text-[#F8F8F8]/70 pt-1">
                  <span>LOC: CHENNAI // REMOTE • STATUS: AVAILABLE</span>
                </div>
              </>
            )}
          </div>

          {/* CRT Footer Telemetry Status */}
          <div className="relative z-10 border-t border-[#5DD62C]/30 pt-1.5 flex items-center justify-between text-[9px] text-[#5DD62C]/70">
            <span>MEM: 640K OK</span>
            <span>SYSTEM: NOMINAL</span>
          </div>
        </div>

        {/* Bottom Control Panel & Bezel Knobs */}
        <div className="flex items-center justify-between pt-2 font-mono text-[9px] text-[#F8F8F8]/60">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDegauss}
              className="rounded border border-[#202020] bg-[#151515] px-2 py-0.5 text-[9px] text-[#F8F8F8]/80 hover:text-[#5DD62C] hover:border-[#5DD62C] transition-colors"
            >
              [DEGAUSS]
            </button>
            <span className="text-[8px] text-[#202020]">BRIGHTNESS</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#5DD62C] shadow-[0_0_8px_#5DD62C]" />
            <span className="text-[9px] text-[#F8F8F8] font-semibold">POWER ON</span>
          </div>
        </div>
      </div>
    </div>
  );
};
