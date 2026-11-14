"use client";

import React, { useState } from "react";
import { FEATURED_PROJECTS } from "@/content/reels/cyberpunk";
import { Project } from "@/lib/types";

export interface WorkSectionProps {
  className?: string;
  onInspectInTerminal?: (index: number) => void;
}

/**
 * WorkSection
 * Clean editorial project showcase featuring open-source repositories and verified builds.
 * - Stealth black squoval tile matrix pattern in each project card.
 * - Translucent dark glass container harmonizing with the global green silk gradient.
 * - High-contrast typography, interactive expand drawer, and instant links.
 */
export const WorkSection: React.FC<WorkSectionProps> = ({
  className = "",
  onInspectInTerminal,
}) => {
  const [filter, setFilter] = useState<"all" | "web" | "python">("all");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const projects = FEATURED_PROJECTS;

  const handleFilterClick = (newFilter: "all" | "web" | "python") => {
    setFilter(newFilter);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (filter === "web") return p.id.includes("adaptlearn") || p.id.includes("fullstack");
    if (filter === "python") return p.id.includes("python");
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  return (
    <section
      id="work"
      className={`relative w-full border-t border-white/10 bg-[#060B06]/75 backdrop-blur-md py-20 px-4 sm:px-10 lg:px-16 scroll-mt-6 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* ============================================================ */}
        {/* --- SECTION HEADER & FILTERS ------------------------------- */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] uppercase tracking-wider text-[#5DD62C]">
              <span className="h-2 w-2 rounded-full bg-[#5DD62C] animate-pulse" />
              Verified Open-Source Builds
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Featured Work
            </h2>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Curated architectural systems, adaptive educational tools, algorithmic suites, and full-stack challenges.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => handleFilterClick("all")}
              className={`rounded-full px-4 py-1.5 transition-all duration-200 ${
                filter === "all"
                  ? "bg-[#5DD62C] text-[#060B06] font-bold shadow-[0_0_12px_rgba(93,214,44,0.3)]"
                  : "border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => handleFilterClick("web")}
              className={`rounded-full px-4 py-1.5 transition-all duration-200 ${
                filter === "web"
                  ? "bg-[#5DD62C] text-[#060B06] font-bold shadow-[0_0_12px_rgba(93,214,44,0.3)]"
                  : "border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Web &amp; Full-Stack (2)
            </button>
            <button
              onClick={() => handleFilterClick("python")}
              className={`rounded-full px-4 py-1.5 transition-all duration-200 ${
                filter === "python"
                  ? "bg-[#5DD62C] text-[#060B06] font-bold shadow-[0_0_12px_rgba(93,214,44,0.3)]"
                  : "border border-white/15 bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Data &amp; Python (2)
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* --- PROJECTS LIST: STEALTH CARDS WITH SQUOVAL TEXTURE ------ */}
        {/* ============================================================ */}
        <div className="mt-8 space-y-6">
          {filteredProjects.map((project: Project) => {
            const isExpanded = expandedProjectId === project.id;
            const demoUrl = project.links?.find((l) =>
              l.label.toLowerCase().includes("demo") || l.label.toLowerCase().includes("live")
            )?.url;
            const repoUrl = project.links?.find((l) =>
              l.label.toLowerCase().includes("github") || l.label.toLowerCase().includes("repo")
            )?.url;

            return (
              <article
                key={project.id}
                className="group relative rounded-2xl border border-white/10 bg-[#0A120A]/85 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#5DD62C]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Stealth Black Squoval Tile Texture Background */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
                  style={{
                    backgroundImage: "url('/images/bg-black-pattern.jpg')",
                    backgroundSize: "cover",
                  }}
                />

                <div className="relative z-10">
                  {/* Project Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Meta & Title */}
                    <div className="flex-1 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-white/50 mb-2">
                        <span className="text-[#5DD62C] font-semibold">{project.year || "2024"}</span>
                        <span>•</span>
                        <span className="text-white/80 font-medium">
                          {project.role || "Software Engineering"}
                        </span>
                      </div>

                      <h3
                        onClick={() => toggleExpand(project.id)}
                        className="cursor-pointer text-2xl sm:text-3xl font-semibold tracking-tight text-white hover:text-[#5DD62C] transition-colors flex items-center gap-3"
                      >
                        <span>{project.title}</span>
                        <span
                          className={`font-mono text-sm text-white/40 transition-transform duration-300 ${
                            isExpanded ? "rotate-90 text-[#5DD62C]" : "group-hover:translate-x-1"
                          }`}
                        >
                          →
                        </span>
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed font-normal">
                        {project.summary}
                      </p>

                      {/* Clean Tech Stack Pills */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/80 transition-colors hover:border-[#5DD62C]/40 hover:text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions Right */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                      {demoUrl && (
                        <a
                          href={demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#5DD62C] px-4 py-2 font-mono text-xs font-bold text-[#060B06] shadow-[0_0_15px_rgba(93,214,44,0.3)] transition-all duration-200 hover:scale-105 hover:bg-[#52c027] active:scale-95"
                        >
                          <span>Live Demo</span>
                          <span className="text-xs">↗</span>
                        </a>
                      )}

                      {repoUrl && (
                        <a
                          href={repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#5DD62C] hover:text-[#060B06] hover:border-transparent active:scale-95"
                        >
                          <span>View Repo</span>
                          <span className="text-xs">↗</span>
                        </a>
                      )}

                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 font-mono text-xs text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
                      >
                        <span>{isExpanded ? "Hide Details" : "Details"}</span>
                        <span className="text-xs">{isExpanded ? "↑" : "↓"}</span>
                      </button>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* --- EXPANDABLE ARCHITECTURAL BREAKDOWN DRAWER ---------- */}
                  {/* ======================================================== */}
                  {isExpanded && project.processNotes && (
                    <div className="mt-6 rounded-xl border border-white/10 bg-[#060B06]/95 p-6 backdrop-blur-md shadow-inner transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div>
                          <span className="font-mono text-xs text-[#5DD62C] uppercase tracking-wider block mb-2 font-bold">
                            The Challenge &amp; Constraint
                          </span>
                          <p className="text-white/75 leading-relaxed font-normal text-xs sm:text-sm">
                            {project.processNotes.challenge}
                          </p>
                        </div>

                        <div>
                          <span className="font-mono text-xs text-[#5DD62C] uppercase tracking-wider block mb-2 font-bold">
                            Architecture &amp; Solution
                          </span>
                          <p className="text-white/75 leading-relaxed font-normal text-xs sm:text-sm">
                            {project.processNotes.architecture}
                          </p>
                        </div>
                      </div>

                      {project.processNotes.takeaway && (
                        <div className="mt-5 pt-4 border-t border-white/10">
                          <span className="font-mono text-xs text-white/60 uppercase tracking-wider block mb-1 font-semibold">
                            Key Takeaway
                          </span>
                          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                            {project.processNotes.takeaway}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Work Section Footer */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/60">
          <span>All repositories verified and open-source on GitHub</span>
          <a
            href="https://github.com/luthfan-tech"
            target="_blank"
            rel="noreferrer"
            className="text-[#5DD62C] hover:underline underline-offset-4 font-medium transition-colors"
          >
            Explore all repositories (@luthfan-tech) ↗
          </a>
        </div>
      </div>
    </section>
  );
};
