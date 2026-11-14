import { create } from "zustand";
import { VisualThemeTokens } from "./types";
import { CYBERPUNK_REEL, ALL_REELS } from "@/content/reels";

export type ArchiveViewMode = "3d" | "2d";

export interface ArchiveStore {
  currentReel: string | null;
  isCommentaryOpen: boolean;
  isMuted: boolean;
  volume: number;
  isPlaying: boolean;
  isTransitioning: boolean;
  activeThemeColor: string;
  activeThemeTokens: VisualThemeTokens;
  progress: number; // 0.0 to 1.0 representing timeline position
  activeProjectIndex: number;
  viewMode: ArchiveViewMode;

  setReel: (reel: string | null) => void;
  toggleCommentary: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setPlaying: (isPlaying: boolean) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  setActiveThemeColor: (color: string) => void;
  setActiveThemeTokens: (tokens: VisualThemeTokens) => void;
  setProgress: (progress: number) => void;
  setActiveProjectIndex: (index: number) => void;
  seekToProject: (index: number) => void;
  setViewMode: (viewMode: ArchiveViewMode) => void;
  toggleViewMode: () => void;
}

export const useArchiveStore = create<ArchiveStore>((set, get) => ({
  currentReel: CYBERPUNK_REEL.id, // Pre-mount the first reel
  isCommentaryOpen: false,
  isMuted: false,
  volume: 0.7,
  isPlaying: false,
  isTransitioning: false,
  activeThemeColor: CYBERPUNK_REEL.themeTokens.accentColor,
  activeThemeTokens: CYBERPUNK_REEL.themeTokens,
  progress: 0.0,
  activeProjectIndex: 0,
  viewMode: "3d",

  setReel: (reel) => {
    const reelData = reel ? ALL_REELS[reel] : null;
    if (reelData) {
      set({
        currentReel: reel,
        activeThemeColor: reelData.themeTokens.accentColor,
        activeThemeTokens: reelData.themeTokens,
        progress: 0.0,
        activeProjectIndex: 0,
      });
    } else {
      set({ currentReel: reel });
    }
  },

  toggleCommentary: () => set((state) => ({ isCommentaryOpen: !state.isCommentaryOpen })),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setTransitioning: (isTransitioning) => set({ isTransitioning }),
  setActiveThemeColor: (activeThemeColor) => set({ activeThemeColor }),
  setActiveThemeTokens: (activeThemeTokens) =>
    set({ activeThemeTokens, activeThemeColor: activeThemeTokens.accentColor }),

  setProgress: (rawProgress) => {
    const progress = Math.max(0, Math.min(1, rawProgress));
    const state = get();
    const currentReelData = state.currentReel ? ALL_REELS[state.currentReel] : null;
    const projectCount = currentReelData?.projects.length || 1;
    const activeProjectIndex = Math.min(
      projectCount - 1,
      Math.floor(progress * projectCount)
    );

    set({ progress, activeProjectIndex });
  },

  setActiveProjectIndex: (activeProjectIndex) => set({ activeProjectIndex }),

  seekToProject: (index) => {
    const state = get();
    const currentReelData = state.currentReel ? ALL_REELS[state.currentReel] : null;
    const projectCount = currentReelData?.projects.length || 1;
    const clampedIndex = Math.max(0, Math.min(projectCount - 1, index));
    const newProgress = clampedIndex / projectCount;

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }

    set({
      progress: newProgress,
      activeProjectIndex: clampedIndex,
    });
  },

  setViewMode: (viewMode) => set({ viewMode }),
  toggleViewMode: () =>
    set((state) => ({ viewMode: state.viewMode === "3d" ? "2d" : "3d" })),
}));
