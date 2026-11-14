"use client";

import React, { useState } from "react";
import { Project } from "@/lib/types";
import { useArchiveStore } from "@/lib/store";
import { FEATURED_PROJECTS } from "@/content/reels/cyberpunk";
import { GitHubMetricsBadge } from "@/components/work/GitHubMetricsBadge";

export interface EditorialArchiveProps {
  onClose?: () => void;
  onSelectProject?: (index: number) => void;
  className?: string;
}

export const EditorialArchive: React.FC<EditorialArchiveProps> = ({
  onClose,
  onSelectProject,
  className = "",
}) => {
  const { activeProjectIndex, setActiveProjectIndex } = useArchiveStore();
  const [filter, setFilter] = useState<"all" | "builds" | "journeys">("all");
  const [expandedId, setExpandedId] = useState<string | null>(
    FEATURED_PROJECTS[0]?.id || null
  );

  const projects = FEATURED_PROJECTS;

  const filteredProjects = projects.filter((p) => {
    if (filter === "builds") return p.id.includes("adaptlearn");
    if (filter === "journeys") return p.id.includes("100-");
    return true;
  });

  const handleSelect = (project: Project) => {
    const originalIdx = projects.findIndex((p) => p.id === project.id);
    if (originalIdx !== -1) {
      setActiveProjectIndex(originalIdx);
      onSelectProject?.(originalIdx);
    }
    setExpandedId(expandedId === project.id ? null : project.id);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  return (
    <div
      className={`flex flex-col h-full w-full overflow-y-auto px-6 py-8 sm:px-10 lg:px-14 text-[#F4F5F4] ${className}`}
    >
      {/* Top Showcase Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 animate-card-fade-up" style={{ animationDelay: "40ms" }}>
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#5DD62C] font-semibold uppercase">
            CURATED PORTFOLIO // LUTFAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-1">
            Featured Projects &amp; Journeys
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="mailto:contact@lutfan.dev"
            className="group flex items-center gap-1.5 rounded-full bg-[#5DD62C] px-3.5 py-2 font-mono text-xs font-bold text-[#060B06] shadow-[0_0_16px_rgba(93,214,44,0.3)] transition-all duration-200 hover:scale-105 hover:bg-[#52c027] hover:shadow-[0_0_24px_rgba(93,214,44,0.5)] active:scale-95"
          >
            <span>GET IN TOUCH</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 font-bold">✉ ↗</span>
          </a>

          {/* Close / Return Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[#5DD62C] hover:bg-[#5DD62C]/20 hover:text-white active:scale-95"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 text-[#5DD62C]">←</span>
              <span>BACK TO HERO</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Category Bar */}
      <div className="flex items-center justify-between py-4 border-b border-white/10 font-mono text-xs animate-card-fade-up" style={{ animationDelay: "80ms" }}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-3.5 py-1 transition-all duration-200 ${
              filter === "all"
                ? "bg-[#5DD62C] text-[#060B06] font-bold shadow-[0_0_12px_rgba(93,214,44,0.3)] scale-105"
                : "text-white/70 hover:text-white bg-white/5 border border-white/15 hover:border-[#5DD62C]"
            }`}
          >
            ALL [{projects.length}]
          </button>
          <button
            onClick={() => setFilter("builds")}
            className={`rounded-full px-3.5 py-1 transition-all duration-200 ${
              filter === "builds"
                ? "bg-[#5DD62C] text-[#060B06] font-bold shadow-[0_0_12px_rgba(93,214,44,0.3)] scale-105"
                : "text-white/70 hover:text-white bg-white/5 border border-white/15 hover:border-[#5DD62C]"
            }`}
          >
            BUILDS [1]
          </button>
          <button
            onClick={() => setFilter("journeys")}
            className={`rounded-full px-3.5 py-1 transition-all duration-200 ${
              filter === "journeys"
                ? "bg-[#5DD62C] text-[#060B06] font-bold shadow-[0_0_12px_rgba(93,214,44,0.3)] scale-105"
                : "text-white/70 hover:text-white bg-white/5 border border-white/15 hover:border-[#5DD62C]"
            }`}
          >
            LEARNING JOURNEYS [2]
          </button>
        </div>

        <span className="hidden sm:inline font-mono text-[10px] text-white/60 uppercase tracking-widest flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C]" />
          <span>INTERACTIVE TELEMETRY SYNCED</span>
        </span>
      </div>

      {/* Curated Projects List */}
      <div className="divide-y divide-white/10">
        {filteredProjects.map((project, idx) => {
          const originalIdx = projects.findIndex((p) => p.id === project.id);
          const isSelected = activeProjectIndex === originalIdx;
          const isExpanded = expandedId === project.id;
          const numStr = (originalIdx + 1).toString().padStart(2, "0");
          const isJourney = project.id.includes("100-");
          const repoUrl = project.links?.[0]?.url;

          return (
            <article
              key={project.id}
              onClick={() => handleSelect(project)}
              style={{ animationDelay: `${idx * 80 + 120}ms` }}
              className={`group cursor-pointer py-7 transition-all duration-300 animate-card-fade-up ${
                isSelected ? "opacity-100" : "opacity-80 hover:opacity-100"
              }`}
            >
              <div className="flex flex-col gap-3.5">
                {/* Meta Row: Index + Category + Role + Year */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-semibold transition-colors duration-200 flex items-center gap-1.5 ${
                        isSelected ? "text-white" : "text-white/60"
                      }`}
                    >
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] shadow-[0_0_6px_#5DD62C]" />}
                      [{numStr}]
                    </span>

                    {/* Category Badge */}
                    <span
                      className={`rounded px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider ${
                        isJourney
                          ? "bg-white/10 text-white/90 border border-white/20"
                          : "bg-[#5DD62C]/15 text-[#5DD62C] border border-[#5DD62C]/30"
                      }`}
                    >
                      {isJourney ? "LEARNING JOURNEY" : "FEATURED BUILD"}
                    </span>

                    <span className="hidden sm:inline text-white/30">•</span>
                    <span className="hidden sm:inline uppercase tracking-wider text-white/70 text-[11px]">
                      {project.role || "ENGINEERING"}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-white/60 font-medium">
                    {project.year || "2026"}
                  </span>
                </div>

                {/* Title & External Link Pill */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-[#5DD62C] transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 shrink-0">
                    {repoUrl && (
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] text-white shadow-sm transition-all duration-200 hover:border-[#5DD62C] hover:bg-[#5DD62C] hover:text-[#060B06]"
                      >
                        <span>CODE</span>
                        <span className="text-[10px] text-[#5DD62C] group-hover:text-[#060B06]">↗</span>
                      </a>
                    )}

                    <span
                      className={`font-mono text-xs text-white/60 transition-transform duration-300 ${
                        isExpanded ? "rotate-90 text-[#5DD62C]" : "group-hover:translate-x-1"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm font-normal leading-relaxed text-white/75 max-w-2xl">
                  {project.summary}
                </p>

                {/* Live GitHub Repository Metrics Badge */}
                {repoUrl && (
                  <div className="pt-1">
                    <GitHubMetricsBadge repoUrl={repoUrl} />
                  </div>
                )}

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-white/15 bg-[#0B120B]/80 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Collapsible Process Notes & Engineering Breakdown Drawer */}
                {isExpanded && project.processNotes && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative overflow-hidden mt-4 rounded-xl border border-white/15 bg-[#0A120A]/95 p-5 backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2 shadow-lg"
                  >
                    <div
                      className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                      style={{
                        backgroundImage: "url('/images/bg-black-pattern.jpg')",
                        backgroundSize: "cover",
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#5DD62C] uppercase font-semibold">
                        ENGINEERING &amp; ARCHITECTURAL BREAKDOWN
                      </span>
                      {repoUrl && (
                        <a
                          href={repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] text-white shadow-sm transition-all duration-200 hover:border-[#5DD62C] hover:bg-[#5DD62C] hover:text-[#060B06] hover:scale-105"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] shadow-[0_0_6px_#5DD62C]" />
                          <span>SOURCE REPO</span>
                          <span className="text-[#5DD62C] group-hover:text-[#060B06] transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
                        </a>
                      )}
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                      <div>
                        <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider block mb-1 font-medium">
                          01. THE CHALLENGE
                        </span>
                        <p className="text-white/80 leading-relaxed font-normal">
                          {project.processNotes.challenge}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider block mb-1 font-medium">
                          02. ARCHITECTURAL PATTERN
                        </span>
                        <p className="text-white/80 leading-relaxed font-normal">
                          {project.processNotes.architecture}
                        </p>
                      </div>
                    </div>

                    {project.processNotes.takeaway && (
                      <div className="relative z-10 mt-4 pt-3.5 border-t border-white/10">
                        <span className="font-mono text-[10px] text-white/60 uppercase tracking-wider block mb-1 font-medium">
                          03. CORE LESSON &amp; TAKEAWAY
                        </span>
                        <p className="text-white/90 text-xs font-normal leading-relaxed">
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

      {/* Footer Info */}
      <div className="mt-auto pt-10 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/60 border-t border-white/10">
        <span>ALL REPOSITORIES OPEN SOURCE ON GITHUB</span>
        <span className="text-[#5DD62C]">AUTHOR // LUTFAN (@LUTHFAN-TECH)</span>
      </div>
    </div>
  );
};
