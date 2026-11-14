"use client";

import React, { useState } from "react";

interface TechItem {
  name: string;
  category: string;
  icon: string;
}

interface ToolItem {
  name: string;
  type: string;
}

const PALETTE = ["#0F0F0F", "#202020", "#337418", "#5DD62C"] as const;

function paletteAt(index: number) {
  return PALETTE[index % PALETTE.length];
}

function inkOn(color: string) {
  return color === "#5DD62C" ? "#0F0F0F" : "#F8F8F8";
}

// 1. Tech Stack: Python, FastAPI, JavaScript, React, Node.js, NumPy, Pandas, Matplotlib, PyTorch, HTML, CSS, SQL
const TECH_STACK: TechItem[] = [
  { name: "Python", category: "Core Language", icon: "PY" },
  { name: "FastAPI", category: "Backend APIs", icon: "API" },
  { name: "JavaScript", category: "Frontend Dynamic", icon: "JS" },
  { name: "React", category: "UI Architecture", icon: "RXT" },
  { name: "Node.js", category: "Runtime Engine", icon: "NODE" },
  { name: "NumPy", category: "Numerical Arrays", icon: "NUM" },
  { name: "Pandas", category: "Data Analysis", icon: "PD" },
  { name: "Matplotlib", category: "Visual Charts", icon: "MPL" },
  { name: "PyTorch", category: "Tensors & Autograd", icon: "TORCH" },
  { name: "HTML5", category: "Semantic Structure", icon: "HTML" },
  { name: "CSS3", category: "Responsive Layouts", icon: "CSS" },
  { name: "PostgreSQL", category: "Relational DB", icon: "SQL" },
];

// 2. Tools & Platforms: Git, GitHub, Linux, Web Speech API, Burp Suite, Wireshark, VS Code, Figma, Notion, etc.
const TOOLS_APPS: ToolItem[] = [
  { name: "Git", type: "Version Control" },
  { name: "GitHub", type: "Code Repository" },
  { name: "Linux", type: "Development OS" },
  { name: "Web Speech API", type: "Assistive Audio" },
  { name: "Burp Suite", type: "Security Labs" },
  { name: "Wireshark", type: "Network Analysis" },
  { name: "Nmap", type: "Network Recon" },
  { name: "VS Code", type: "Primary Editor" },
  { name: "Figma", type: "Interface Design" },
  { name: "Notion", type: "Knowledge & Docs" },
  { name: "Chrome DevTools", type: "DOM & Network Debug" },
  { name: "Postman", type: "API Testing" },
  { name: "Render", type: "Cloud Deployment" },
  { name: "Canva", type: "Creative Media" },
  { name: "Discord", type: "Developer Guilds" },
];

export const TechStackMarquee: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Repeat for 100% seamless, uninterrupted infinite loop across any viewport width
  const duplicatedTech = [
    ...TECH_STACK,
    ...TECH_STACK,
    ...TECH_STACK,
    ...TECH_STACK,
  ];
  const duplicatedTools = [...TOOLS_APPS, ...TOOLS_APPS];

  return (
    <section
      id="arsenal"
      className="relative w-full border-t border-white/10 bg-[#060B06]/75 backdrop-blur-md py-20 px-4 sm:px-8 overflow-hidden select-none"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* --- Clean Section Header --- */}
        <div className="mb-12 px-4">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] uppercase tracking-wider text-[#5DD62C]">
            <span className="h-2 w-2 rounded-full bg-[#5DD62C] animate-pulse" />
            08 Core Technologies • 23 Developer Instruments
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Arsenal &amp; Toolkit
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
            The core technologies, frameworks, and instruments I build with every day.
          </p>
        </div>

        {/* ============================================================ */}
        {/* --- CAROUSEL 1: TECH STACK -------------------------------- */}
        {/* ============================================================ */}
        <div className="mb-10">
          <div className="px-4 mb-3 font-mono text-xs text-[#5DD62C] uppercase tracking-wider font-semibold">
            Technologies &amp; Frameworks
          </div>

          {/* Soft Fade Mask Container */}
          <div className="marquee-mask overflow-hidden py-3">
            <div className="animate-marquee-left flex items-center gap-4">
              {duplicatedTech.map((tech, idx) => {
                const accent = paletteAt(idx % TECH_STACK.length);
                return (
                <div
                  key={`tech-${idx}`}
                  onMouseEnter={() => setActiveItem(tech.name)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="group relative flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#0A120A]/85 px-5 py-3 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[#5DD62C]/40 hover:bg-[#0D160D] hover:-translate-y-0.5 cursor-default shrink-0"
                >
                  {/* Styled Icon Avatar */}
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[11px] font-bold transition-transform duration-200 group-hover:scale-105 shadow-xs"
                    style={{ backgroundColor: accent, color: inkOn(accent) }}
                  >
                    {tech.icon}
                  </div>

                  {/* Name & Subtitle */}
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-white tracking-tight">
                      {tech.name}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase font-medium">
                      {tech.category}
                    </span>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* --- CAROUSEL 2: TOOLS & APPS ------------------------------- */}
        {/* ============================================================ */}
        <div className="mb-14">
          <div className="px-4 mb-3 font-mono text-xs text-[#5DD62C] uppercase tracking-wider font-semibold">
            Tools &amp; Platforms
          </div>

          {/* Soft Fade Mask Container */}
          <div className="marquee-mask overflow-hidden py-3">
            <div className="animate-marquee-right flex items-center gap-3">
              {duplicatedTools.map((tool, idx) => {
                const accent = paletteAt(idx % TOOLS_APPS.length);
                return (
                <div
                  key={`tool-${idx}`}
                  onMouseEnter={() => setActiveItem(tool.name)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="group relative flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0A120A]/85 px-4 py-2 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[#5DD62C]/40 hover:bg-[#0D160D] hover:-translate-y-0.5 cursor-default shrink-0"
                >
                  <span
                    className="h-2 w-2 rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{ backgroundColor: accent }}
                  />

                  {/* Tool Name */}
                  <span className="text-xs font-normal text-white tracking-tight font-sans">
                    {tool.name}
                  </span>

                  {/* Clean Functional Tag */}
                  <span className="rounded bg-white/10 border border-white/10 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white/70 uppercase">
                    {tool.type}
                  </span>
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* --- SECTION 3.5: HARDWARE & WORKSPACE ARSENAL -------------- */}
        {/* ============================================================ */}
        <div className="px-4 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#5DD62C] font-semibold mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] animate-pulse" />
                Physical Hardware &amp; Engineering Labs
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Engineering Workstation &amp; Sensor Arsenal
              </h3>
            </div>
            <span className="font-mono text-xs text-white/50">
              LAB ENVIRONMENT // ARSENAL 2024
            </span>
          </div>

          {/* Interactive Knolling Gear Showcase Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#080E08]/90 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
            <div
              className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
              style={{
                backgroundImage: "url('/images/bg-black-pattern.jpg')",
                backgroundSize: "cover",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image Preview with Interactive Hotspot Badges */}
              <div className="lg:col-span-7 relative overflow-hidden rounded-xl border border-white/15 bg-black/60 aspect-[16/10] sm:aspect-[16/9] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/developer-gear-arsenal.jpg"
                  alt="Developer EDC and Creative Hardware Arsenal Knolling"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Ambient Corner Spec Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/80 px-3 py-1 font-mono text-[10px] text-white backdrop-blur-md border border-white/15">
                  <span className="h-2 w-2 rounded-full bg-[#5DD62C] animate-ping" />
                  <span className="font-bold text-[#5DD62C]">HARDWARE MATRIX</span>
                </div>

                <div className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur-md border border-white/10">
                  <span>KNOLLED PERSPECTIVE // 4K SENSORS</span>
                </div>
              </div>

              {/* Hardware Spec Column */}
              <div className="lg:col-span-5 flex flex-col gap-4 font-mono text-xs">
                <div className="p-3 rounded-xl border border-white/10 bg-[#0B140B]/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-[#5DD62C] font-bold text-[11px] mb-1">
                    <span>COMPUTE WORKSTATION</span>
                    <span>PRIMARY HOST</span>
                  </div>
                  <p className="font-sans text-xs text-white/80 leading-relaxed font-normal">
                    Apple Silicon MacBook Pro, UNIX terminal environment, Docker local containers, and Next.js / Python dev pipelines.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-white/10 bg-[#0B140B]/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-[#5DD62C] font-bold text-[11px] mb-1">
                    <span>TESTING &amp; MULTI-PLATFORM</span>
                    <span>MOBILE / SIM</span>
                  </div>
                  <p className="font-sans text-xs text-white/80 leading-relaxed font-normal">
                    iOS test devices, Android testbed, and responsive Web Speech / Touch simulation rigs.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-white/10 bg-[#0B140B]/80 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-[#5DD62C] font-bold text-[11px] mb-1">
                    <span>SPATIAL &amp; EMBEDDED LABS</span>
                    <span>VISION / IOT</span>
                  </div>
                  <p className="font-sans text-xs text-white/80 leading-relaxed font-normal">
                    VR spatial headset, drone flight telemetry nodes, optical cameras, and breadboard microcontroller prototyping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
