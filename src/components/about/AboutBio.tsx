"use client";

import React from "react";

export interface AboutBioProps {
  onClose?: () => void;
  className?: string;
}

export const AboutBio: React.FC<AboutBioProps> = ({
  onClose,
  className = "",
}) => {
  const handleDownloadCv = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("foley-click"));

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to download CV");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Lutfan_Mohammed_Asif_CV</title>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
              padding: 40px;
              color: #111;
              line-height: 1.5;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { font-size: 26px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px; }
            .subtitle { color: #2e7d32; font-weight: 600; font-size: 14px; margin-bottom: 12px; }
            .contact { font-size: 12px; color: #555; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #2e7d32; }
            h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-top: 24px; color: #222; }
            .item { margin-bottom: 14px; }
            .item-title { font-weight: bold; font-size: 13px; display: flex; justify-content: space-between; }
            .item-desc { font-size: 12px; color: #444; margin-top: 2px; }
            .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; }
            @media print {
              body { padding: 20px; }
              @page { margin: 1.5cm; }
            }
          </style>
        </head>
        <body>
          <h1>Lutfan Mohammed Asif</h1>
          <div class="subtitle">Computer Science Student &amp; Full-Stack Developer</div>
          <div class="contact">
            Karnataka, India &bull; Email: contact@lutfan.dev &bull; GitHub: github.com/luthfan-tech &bull; Portfolio: lutfan.dev
          </div>

          <h2>Summary &amp; Engineering Philosophy</h2>
          <p style="font-size: 12px; color: #333;">
            Computer Science undergraduate and systems-oriented full-stack developer specializing in accessible education technology, distributed backend architectures, and high-performance spatial web interfaces. Committed to rigorous documentation, automated test contracts, and sub-10ms UI latency.
          </p>

          <h2>Core Technical Arsenal</h2>
          <div class="skills-grid">
            <div><strong>Frontend &amp; Spatial:</strong> React, Next.js, TypeScript, Three.js, GSAP, TailwindCSS</div>
            <div><strong>Backend &amp; APIs:</strong> Python, FastAPI, Node.js, Express, REST Architecture</div>
            <div><strong>Data &amp; Machine Learning:</strong> NumPy, Pandas, Matplotlib, PyTorch Autograd, SQL</div>
            <div><strong>Databases &amp; DevOps:</strong> PostgreSQL, MongoDB, Docker, Git, OWASP Best Practices</div>
          </div>

          <h2>Featured Projects &amp; Systems</h2>
          <div class="item">
            <div class="item-title"><span>AdaptLearn &mdash; Adaptive Learning System</span><span>2024</span></div>
            <div class="item-desc">Multi-format educational platform for students with disabilities featuring Bayesian Knowledge Tracing, Epsilon-greedy presentation selection, and browser Web Speech APIs.</div>
          </div>
          <div class="item">
            <div class="item-title"><span>30-Day Full-Stack Foundations Sprint</span><span>2024</span></div>
            <div class="item-desc">Comprehensive client-server curriculum covering React hooks, state lifting, REST contracts, JWT security, and OWASP defense strategies.</div>
          </div>
          <div class="item">
            <div class="item-title"><span>Python Libraries Sprint &mdash; Data &amp; ML</span><span>2024</span></div>
            <div class="item-desc">Applied data science routines using NumPy broadcasting, Pandas aggregations, Matplotlib visualization suites, and PyTorch gradient descent loops.</div>
          </div>
          <div class="item">
            <div class="item-title"><span>100 Python Programs Suite</span><span>2024</span></div>
            <div class="item-desc">100 curated computational algorithms, recursive structures, OOP patterns, custom generators, and exception handling patterns.</div>
          </div>

          <h2>Education</h2>
          <div class="item">
            <div class="item-title"><span>Bachelor of Engineering in Computer Science</span><span>2022 &ndash; 2026</span></div>
            <div class="item-desc">Karnataka, India &bull; Core Coursework: Data Structures, Algorithms, Operating Systems, Database Management Systems, Computer Networks.</div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div
      className={`flex flex-col h-full w-full overflow-y-auto px-6 py-8 sm:px-10 lg:px-14 text-[#F4F5F4] ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-8 border-b border-white/10 animate-card-fade-up" style={{ animationDelay: "40ms" }}>
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#5DD62C] font-semibold uppercase">
            PROFILE // DOSSIER
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-1">
            About &amp; Practice
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleDownloadCv}
            className="group flex items-center gap-2 rounded-full bg-[#5DD62C] px-4 py-2 font-mono text-xs font-bold text-[#060B06] shadow-[0_0_16px_rgba(93,214,44,0.3)] transition-all duration-200 hover:scale-105 hover:bg-[#52c027] active:scale-95"
            title="Download / Print 1-Click Developer Dossier CV"
          >
            <span>⬇ DOSSIER / CV (PDF)</span>
          </button>

          {/* Close / Return Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[#5DD62C] hover:bg-[#5DD62C]/20 hover:text-white"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 text-[#5DD62C]">←</span>
              <span>BACK TO HERO</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Editorial Content */}
      <div className="flex flex-col gap-10 py-8 max-w-2xl">
        {/* Lead Strong Bio Statement */}
        <div className="animate-card-fade-up" style={{ animationDelay: "100ms" }}>
          <p className="font-mono text-[11px] font-semibold tracking-widest text-[#5DD62C] uppercase mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C]" />
            <span>01 // BACKGROUND</span>
          </p>
          <p className="text-xl sm:text-2xl font-normal leading-relaxed text-white tracking-tight">
            I am Lutfan Mohammed Asif — a Computer Science student and Full-Stack Developer based in Karnataka, India, operating at the intersection of accessible learning tools, distributed backend architectures, and high-performance spatial web engineering.
          </p>
        </div>

        {/* Narrative Columns / Philosophy & Practice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-white/80 leading-relaxed font-normal animate-card-fade-up" style={{ animationDelay: "160ms" }}>
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-2">
              <span className="text-[#5DD62C]">●</span>
              <span>PHILOSOPHY</span>
            </h3>
            <p className="leading-relaxed text-white/70">
              Treating the browser as a continuous, high-performance rendering canvas
              rather than a collection of static document pages. I focus on sub-10ms
              frame latency, tactile micro-kinetics, and sensory depth that makes
              software feel physical and permanent.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-white font-bold mb-2 flex items-center gap-2">
              <span className="text-[#5DD62C]">●</span>
              <span>PRACTICE</span>
            </h3>
            <p className="leading-relaxed text-white/70">
              Building accessible educational engines, real-time spatial interfaces,
              systematic full-stack architectures, and robust open-source repositories
              with verified tests and comprehensive documentation.
            </p>
          </div>
        </div>

        {/* Capabilities & Discipline Grid */}
        <div className="pt-4 border-t border-white/10">
          <p className="font-mono text-[11px] font-semibold tracking-widest text-[#5DD62C] uppercase mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C]" />
            <span>02 // CORE DISCIPLINES &amp; STACK</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A120A]/85 p-4 backdrop-blur-sm shadow-xs transition-all duration-200 hover:border-[#5DD62C]/40">
              <div
                className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: "url('/images/bg-black-pattern.jpg')",
                  backgroundSize: "cover",
                }}
              />
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-[#5DD62C] block mb-1 font-semibold">
                  [01] GRAPHICS
                </span>
                <h4 className="font-semibold text-sm text-white mb-2">Real-Time 3D</h4>
                <p className="text-xs text-white/70 leading-normal">
                  Three.js, GLSL Custom Shaders, React Three Fiber, WebGL Buffers.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A120A]/85 p-4 backdrop-blur-sm shadow-xs transition-all duration-200 hover:border-[#5DD62C]/40">
              <div
                className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: "url('/images/bg-black-pattern.jpg')",
                  backgroundSize: "cover",
                }}
              />
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-[#5DD62C] block mb-1 font-semibold">
                  [02] SYSTEMS
                </span>
                <h4 className="font-semibold text-sm text-white mb-2">Architecture</h4>
                <p className="text-xs text-white/70 leading-normal">
                  Python 3.12, FastAPI, TypeScript, Next.js App Router, PostgreSQL.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A120A]/85 p-4 backdrop-blur-sm shadow-xs transition-all duration-200 hover:border-[#5DD62C]/40">
              <div
                className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: "url('/images/bg-black-pattern.jpg')",
                  backgroundSize: "cover",
                }}
              />
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-[#5DD62C] block mb-1 font-semibold">
                  [03] MOTION
                </span>
                <h4 className="font-semibold text-sm text-white mb-2">Kinematics</h4>
                <p className="text-xs text-white/70 leading-normal">
                  GSAP Orchestration, Physics Damping, Procedural Audio &amp; Foley.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Direct Inquiries */}
        <div className="pt-4 border-t border-white/10">
          <p className="font-mono text-[11px] font-semibold tracking-widest text-[#5DD62C] uppercase mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C]" />
            <span>03 // DIRECT CHANNELS &amp; INQUIRIES</span>
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
            {/* Primary Action: Direct Email Contact */}
            <a
              href="mailto:contact@lutfan.dev"
              className="group flex items-center gap-2 rounded-full bg-[#5DD62C] px-5 py-2.5 font-bold text-[#060B06] shadow-[0_0_20px_rgba(93,214,44,0.35)] transition-all duration-200 hover:scale-105 hover:bg-[#52c027] hover:shadow-[0_0_28px_rgba(93,214,44,0.55)] active:scale-95"
            >
              <span className="h-2 w-2 rounded-full bg-[#060B06]" />
              <span>START A CONVERSATION // EMAIL DIRECT</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">✉ ↗</span>
            </a>

            {/* Action: 1-Click CV Download */}
            <button
              onClick={handleDownloadCv}
              className="group flex items-center gap-2 rounded-full border border-[#5DD62C]/50 bg-[#5DD62C]/10 px-4 py-2 text-[#5DD62C] font-mono text-xs font-semibold shadow-xs transition-all duration-200 hover:bg-[#5DD62C] hover:text-[#060B06] hover:scale-105 active:scale-95"
            >
              <span>⬇ DOWNLOAD DOSSIER (PDF)</span>
            </button>

            {/* Secondary Link: GitHub */}
            <a
              href="https://github.com/luthfan-tech"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white font-medium shadow-sm transition-all duration-200 hover:border-[#5DD62C] hover:bg-[#5DD62C]/20 hover:scale-105 active:scale-95"
            >
              <span>GITHUB</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 text-[#5DD62C]">↗</span>
            </a>

            {/* Secondary Link: LinkedIn */}
            <a
              href="https://www.linkedin.com/in/lutfan-mohammed-asif-692676414"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white font-medium shadow-sm transition-all duration-200 hover:border-[#5DD62C] hover:bg-[#5DD62C]/20 hover:scale-105 active:scale-95"
            >
              <span>LINKEDIN</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 text-[#5DD62C]">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-auto pt-10 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/60 border-t border-white/10">
        <span>LOC // KARNATAKA, INDIA</span>
        <span className="text-[#5DD62C]">STATUS // AVAILABLE FOR COMMISSIONS &amp; ROLES</span>
      </div>
    </div>
  );
};
