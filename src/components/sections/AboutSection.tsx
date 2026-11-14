"use client";

import React from "react";

export interface AboutSectionProps {
  className?: string;
  onOpenTerminal?: () => void;
}

/**
 * AboutSection
 * A rich, editorial biographical dossier detailing Lutfan's background, engineering philosophy,
 * core practice pillars, live system metrics, and direct inquiry channels.
 * - Layered with the stealth black squoval tile matrix pattern in cards & widgets.
 * - Translucent dark glass backdrop harmonizing with the global green silk spatial gradient.
 */
export const AboutSection: React.FC<AboutSectionProps> = ({
  className = "",
  onOpenTerminal,
}) => {
  return (
    <section
      id="about"
      className={`relative w-full border-t border-white/10 bg-[#060B06]/75 backdrop-blur-md py-20 px-4 sm:px-10 lg:px-16 scroll-mt-6 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* ============================================================ */}
        {/* --- SECTION HEADER ----------------------------------------- */}
        {/* ============================================================ */}
        <div className="pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] uppercase tracking-wider text-[#5DD62C]">
            <span className="h-2 w-2 rounded-full bg-[#5DD62C] animate-pulse" />
            Biographical Dossier &amp; Core Practices
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            About &amp; Philosophy
          </h2>
        </div>

        {/* ============================================================ */}
        {/* --- MAIN EDITORIAL GRID: NARRATIVE + METRICS --------------- */}
        {/* ============================================================ */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Span 7): Manifesto & Biography */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Core Principle Statement */}
            <blockquote className="text-xl sm:text-2xl font-normal text-white leading-snug border-l-2 border-[#5DD62C] pl-5 sm:pl-6">
              &ldquo;Real practice over passive watching. Understanding over copying. Consistency over perfection.&rdquo;
            </blockquote>

            {/* Narrative Body */}
            <div className="flex flex-col gap-4 text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              <p>
                I am a Computer Science student and Full-Stack Developer based in Karnataka, India,
                dedicated to building accessible learning tools, reliable backend APIs, and security-minded web applications.
              </p>
              <p>
                My foundations started with building 100 Python algorithmic programs, conducting numerical computing sprints
                with NumPy, Pandas, and PyTorch, and completing an intensive 30-day full-stack engineering challenge.
                I apply those foundations to real-world software—such as AdaptLearn, an adaptive educational prototype
                engineered for students with disabilities featuring Bayesian Knowledge Tracing and assistive browser speech APIs.
              </p>
              <p className="font-mono text-xs text-[#5DD62C] font-semibold tracking-wider">
                APPROACH: BUILD • DOCUMENT • TEST • IMPROVE
              </p>
            </div>

            {/* Core Practice Areas */}
            <div className="pt-4 border-t border-white/10">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#5DD62C] uppercase block mb-4">
                Core Practice Areas
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Area 1 */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A120A]/85 p-5 shadow-xs backdrop-blur-sm transition-all duration-200 hover:border-[#5DD62C]/40">
                  <div
                    className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                    style={{
                      backgroundImage: "url('/images/bg-black-pattern.jpg')",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] text-[#5DD62C] font-bold block mb-1">
                      01
                    </span>
                    <h4 className="font-semibold text-sm text-white mb-1">Web &amp; Full-Stack</h4>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Python, FastAPI, JavaScript, React, Node.js, Express, and Web Speech API.
                    </p>
                  </div>
                </div>

                {/* Area 2 */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A120A]/85 p-5 shadow-xs backdrop-blur-sm transition-all duration-200 hover:border-[#5DD62C]/40">
                  <div
                    className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                    style={{
                      backgroundImage: "url('/images/bg-black-pattern.jpg')",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] text-[#5DD62C] font-bold block mb-1">
                      02
                    </span>
                    <h4 className="font-semibold text-sm text-white mb-1">Data &amp; Computing</h4>
                    <p className="text-xs text-white/70 leading-relaxed">
                      NumPy arrays &amp; broadcasting, Pandas aggregation, Matplotlib charts, and PyTorch tensors.
                    </p>
                  </div>
                </div>

                {/* Area 3 */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A120A]/85 p-5 shadow-xs backdrop-blur-sm transition-all duration-200 hover:border-[#5DD62C]/40">
                  <div
                    className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                    style={{
                      backgroundImage: "url('/images/bg-black-pattern.jpg')",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] text-[#5DD62C] font-bold block mb-1">
                      03
                    </span>
                    <h4 className="font-semibold text-sm text-white mb-1">Security &amp; Auth</h4>
                    <p className="text-xs text-white/70 leading-relaxed">
                      HTTP lifecycle, sessions &amp; JWT, backend input validation, and OWASP-inspired defense.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Span 5): Verified Metrics & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Metrics Card with Stealth Black Squoval Pattern */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A120A]/85 p-6 backdrop-blur-md shadow-xs">
              <div
                className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: "url('/images/bg-black-pattern.jpg')",
                  backgroundSize: "cover",
                }}
              />
              <div className="relative z-10">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#5DD62C] uppercase block mb-4 pb-2 border-b border-white/10">
                  Verified Work Metrics
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-lg border border-white/10 bg-[#050A05]/80">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-white block">
                      100+
                    </span>
                    <span className="font-mono text-[10px] text-[#5DD62C] uppercase tracking-wider font-semibold">
                      Python Programs
                    </span>
                    <p className="text-[11px] text-white/60 mt-1 leading-tight">
                      Algorithmic &amp; computational suite.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-white/10 bg-[#050A05]/80">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-white block">
                      30-Day
                    </span>
                    <span className="font-mono text-[10px] text-[#5DD62C] uppercase tracking-wider font-semibold">
                      Full-Stack Sprint
                    </span>
                    <p className="text-[11px] text-white/60 mt-1 leading-tight">
                      Web architecture &amp; security habits.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-white/10 bg-[#050A05]/80">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-[#5DD62C] block">
                      HI-03
                    </span>
                    <span className="font-mono text-[10px] text-[#5DD62C] uppercase tracking-wider font-semibold">
                      AdaptLearn Prototype
                    </span>
                    <p className="text-[11px] text-white/60 mt-1 leading-tight">
                      Adaptive assistive learning system.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-white/10 bg-[#050A05]/80">
                    <span className="font-mono text-2xl sm:text-3xl font-bold text-white block">
                      100%
                    </span>
                    <span className="font-mono text-[10px] text-[#5DD62C] uppercase tracking-wider font-semibold">
                      Open Source
                    </span>
                    <p className="text-[11px] text-white/60 mt-1 leading-tight">
                      Verifiable code on GitHub.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Card with Stealth Pattern */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A120A]/85 p-6 backdrop-blur-md shadow-xs">
              <div
                className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: "url('/images/bg-black-pattern.jpg')",
                  backgroundSize: "cover",
                }}
              />
              <div className="relative z-10">
                <h3 className="font-semibold text-base text-white mb-1">
                  Let&apos;s Connect &amp; Collaborate
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-5">
                  Open for full-stack engineering collaborations, accessible web software projects, and internships. Based in Karnataka, India.
                </p>

                {/* Primary Email Button */}
                <a
                  href="mailto:contact@lutfan.dev"
                  className="group flex items-center justify-between rounded-full bg-[#5DD62C] px-5 py-3 font-mono text-xs font-bold text-[#060B06] shadow-[0_0_15px_rgba(93,214,44,0.3)] transition-all duration-200 hover:bg-[#52c027] hover:scale-105 active:scale-95"
                >
                  <span>Send an Email</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">
                    ✉ ↗
                  </span>
                </a>

                {/* Verified Profile Links */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 font-mono text-xs text-white/60">
                  <a
                    href="https://github.com/luthfan-tech"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#5DD62C] transition-colors"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lutfan-mohammed-asif-692676414"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#5DD62C] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://x.com/Luthfan_4"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#5DD62C] transition-colors"
                  >
                    X (Twitter) ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Trigger Card */}
            <div
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-retro-shell"));
                  window.dispatchEvent(new CustomEvent("foley-click"));
                }
              }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A120A]/85 p-5 backdrop-blur-md shadow-xs flex items-center justify-between gap-4 transition-all hover:border-[#5DD62C]/40 hover:bg-[#0B150C]"
            >
              <div
                className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: "url('/images/bg-black-pattern.jpg')",
                  backgroundSize: "cover",
                }}
              />
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#5DD62C] uppercase tracking-wider font-semibold mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] animate-pulse" />
                  Terminal Console
                </div>
                <h4 className="font-semibold text-sm text-white group-hover:text-[#5DD62C] transition-colors">
                  Retro CRT Shell // Easter Eggs
                </h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Type secret commands, launch falling matrix rain, and inspect system architecture.
                </p>
              </div>
              <div className="relative z-10 shrink-0 font-mono text-xs rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-white group-hover:border-[#5DD62C] group-hover:text-[#5DD62C] transition-colors">
                BOOT ↗
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
