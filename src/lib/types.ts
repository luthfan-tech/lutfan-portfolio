export type GenreType =
  | "noir"
  | "scifi"
  | "documentary"
  | "western"
  | "cyberpunk"
  | "classic"
  | string;

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectProcessNotes {
  challenge?: string;
  architecture?: string;
  takeaway?: string;
  rawNotes?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  year?: string | number;
  role?: string;
  tags: string[];
  links?: ProjectLink[];
  coverImage?: string;
  reelId?: string;
  processNotes?: ProjectProcessNotes;
}

export interface VisualThemeTokens {
  accentColor: string;
  glowColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  ambientColor: string;
  keyLightColor: string;
  keyLightIntensity: number;
  beamColor: string;
  groundColor: string;
}

export interface DirectorCommentary {
  id: string;
  timestamp: string;
  title: string;
  content: string;
  author?: string;
  tag?: string;
  style?: "sticky" | "redline" | "slate";
}

export interface ReelData {
  id: string;
  title: string;
  genre: GenreType;
  accentColor: string;
  description: string;
  themeTokens: VisualThemeTokens;
  projects: Project[];
  commentary?: DirectorCommentary[];
  durationSeconds?: number;
}

export type PerformanceTierLevel = "high" | "medium" | "low";

export interface PerformanceConfig {
  tier: PerformanceTierLevel;
  dpr: number;
  enablePostProcessing: boolean;
  enableShadows: boolean;
  isMobile: boolean;
}
