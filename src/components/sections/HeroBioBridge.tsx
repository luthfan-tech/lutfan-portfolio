"use client";

import React from "react";
import { StudioDisplayCompanion } from "@/components/companions/StudioDisplayCompanion";

interface HeroBioBridgeProps {
  className?: string;
  onExploreWork?: () => void;
  onExploreAbout?: () => void;
}

/**
 * HeroBioBridge
 * Positioned directly below the 3D hero section.
 * - Displays the primary editorial statement and credentials previously crowding the hero header.
 * - Right column features the interactive Apple Studio Display desktop workstation,
 *   completely themed in the matching dark cosmic emerald palette (#060B06 & #5DD62C).
 * - Harmonizes seamlessly with the global green silk gradient background.
 */
export const HeroBioBridge: React.FC<HeroBioBridgeProps> = ({
  className = "",
  onExploreWork,
  onExploreAbout,
}) => {
  return (
    <section
      className={`relative w-full border-y border-white/10 bg-[#060B06]/75 backdrop-blur-md py-14 px-4 sm:px-10 lg:px-16 transition-colors duration-300 ${className}`}
    >
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Column: Primary Developer Positioning & Bio */}
        <div className="flex-1 max-w-2xl">
          {/* Status Badge with Stealth Black Squoval Texture */}
          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0D120D]/90 px-3.5 py-1.5 font-mono text-[11px] text-white shadow-xs backdrop-blur-sm mb-4 overflow-hidden">
            <div
              className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
              style={{
                backgroundImage: "url('/images/bg-black-pattern.jpg')",
                backgroundSize: "cover",
              }}
            />
            <span className="relative z-10 h-2 w-2 rounded-full bg-[#5DD62C] shadow-[0_0_8px_#5DD62C] animate-pulse" />
            <span className="relative z-10 font-bold uppercase tracking-wider text-[#5DD62C]">
              Available for Commissions &amp; Roles
            </span>
            <span className="relative z-10 text-white/30">•</span>
            <span className="relative z-10 text-white/70 font-normal">Karnataka, India</span>
          </div>

          {/* Prominent Editorial Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
            Computer Science Student &amp; Full-Stack Developer
          </h2>

          {/* Descriptive Narrative Bio */}
          <p className="mt-3 text-sm sm:text-base font-normal text-white/75 leading-relaxed max-w-xl">
            Exploring accessible learning tools, backend systems architecture, algorithmic problem solving, and security-minded engineering. Focused on writing robust, clean, and tested code.
          </p>

          {/* Quick Technical Architecture Badges with Black Texture */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-white/80">
            {["[01 Systems Architecture]", "[02 Algorithmic Suites]", "[03 Accessible UI]"].map((badge, i) => (
              <span
                key={i}
                className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0B120B]/80 px-3 py-1.5 text-white/90 shadow-xs backdrop-blur-sm hover:border-[#5DD62C]/40 transition-colors"
              >
                <span
                  className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                  style={{
                    backgroundImage: "url('/images/bg-black-pattern.jpg')",
                    backgroundSize: "cover",
                  }}
                />
                <span className="relative z-10">{badge}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Studio Display Desktop Companion in Matching Emerald Theme */}
        <div className="shrink-0 flex flex-col items-center lg:items-end">
          <StudioDisplayCompanion size="md" />
          <span className="mt-3 font-mono text-[10px] tracking-wider text-white/50 uppercase">
            STUDIO WORKSTATION // CALIBRATED
          </span>
        </div>
      </div>
    </section>
  );
};
