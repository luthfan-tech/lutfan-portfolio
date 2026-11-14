"use client";

import React, { useState, useEffect } from "react";

interface GitHubMetrics {
  stars: number;
  forks: number;
  updatedAt: string;
  defaultBranch: string;
}

export interface GitHubMetricsBadgeProps {
  repoUrl: string;
  className?: string;
}

// Fallback curated defaults if rate-limited by GitHub unauthenticated API
const DEFAULT_METRICS: Record<string, GitHubMetrics> = {
  "python-libs": {
    stars: 3,
    forks: 1,
    updatedAt: "Active",
    defaultBranch: "main",
  },
  "30-day-fullstack-challenge": {
    stars: 4,
    forks: 1,
    updatedAt: "Active",
    defaultBranch: "main",
  },
  "adaptlearn": {
    stars: 2,
    forks: 0,
    updatedAt: "Active",
    defaultBranch: "main",
  },
  "100-python-programs": {
    stars: 2,
    forks: 0,
    updatedAt: "Active",
    defaultBranch: "main",
  },
};

export const GitHubMetricsBadge: React.FC<GitHubMetricsBadgeProps> = ({
  repoUrl,
  className = "",
}) => {
  const [metrics, setMetrics] = useState<GitHubMetrics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Extract owner and repo from URL
    // e.g. https://github.com/luthfan-tech/python-libs.git -> luthfan-tech / python-libs
    const cleanUrl = repoUrl.replace(/\.git$/, "");
    const parts = cleanUrl.split("/").filter(Boolean);
    const repo = parts[parts.length - 1];
    const owner = parts[parts.length - 2] || "luthfan-tech";

    if (!repo) {
      setIsLoading(false);
      return;
    }

    const cacheKey = `gh_metrics_${owner}_${repo}`;

    // Check localStorage cache
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          setMetrics(parsed.data);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Ignore cache errors
    }

    // Fetch live from GitHub API
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub rate-limited");
        return res.json();
      })
      .then((data) => {
        // Format relative update time
        let updatedStr = "Recently";
        if (data.pushed_at) {
          const daysAgo = Math.floor(
            (Date.now() - new Date(data.pushed_at).getTime()) / (1000 * 60 * 60 * 24)
          );
          updatedStr = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;
        }

        const result: GitHubMetrics = {
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          updatedAt: updatedStr,
          defaultBranch: data.default_branch || "main",
        };

        setMetrics(result);
        setIsLoading(false);

        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data: result })
          );
        } catch {
          // Ignore storage quota
        }
      })
      .catch(() => {
        // Fallback gracefully
        const fallback = DEFAULT_METRICS[repo.toLowerCase()] || {
          stars: 1,
          forks: 0,
          updatedAt: "Active",
          defaultBranch: "main",
        };
        setMetrics(fallback);
        setIsLoading(false);
      });
  }, [repoUrl]);

  if (!metrics && !isLoading) return null;

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-[#5DD62C]/30 bg-[#0A140B]/90 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur-md shadow-xs ${className}`}
      title="Live GitHub metrics"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#5DD62C] animate-pulse shadow-[0_0_6px_#5DD62C]" />
      
      {/* Stars */}
      <span className="flex items-center gap-1 text-[#5DD62C] font-semibold">
        <span>★</span>
        <span>{isLoading ? "…" : metrics?.stars}</span>
      </span>

      <span className="text-white/20">•</span>

      {/* Forks */}
      <span className="flex items-center gap-1 text-white/70">
        <span>⑂</span>
        <span>{isLoading ? "…" : metrics?.forks}</span>
      </span>

      <span className="text-white/20">•</span>

      {/* Branch & Live Status */}
      <span className="text-[#5DD62C]/90 font-medium">
        {isLoading ? "syncing…" : `${metrics?.defaultBranch} // ${metrics?.updatedAt}`}
      </span>
    </div>
  );
};
