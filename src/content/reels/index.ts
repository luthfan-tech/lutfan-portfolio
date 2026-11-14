import { ReelData } from "@/lib/types";
import { CYBERPUNK_REEL } from "./cyberpunk";

export const NOIR_REEL: ReelData = {
  id: "reel-noir",
  title: "Reel 01: The Architect",
  genre: "noir",
  accentColor: "#337418",
  description: "Deep investigation into systems architecture, clean design patterns, and archival foundations.",
  themeTokens: {
    accentColor: "#337418",
    glowColor: "#5DD62C",
    fogColor: "#0F0F0F",
    fogNear: 3.5,
    fogFar: 16.0,
    ambientColor: "#202020",
    keyLightColor: "#F8F8F8",
    keyLightIntensity: 1.8,
    beamColor: "#5DD62C",
    groundColor: "#0F0F0F",
  },
  projects: [
    {
      id: "project-noir-core",
      title: "Monolithic Foundations",
      slug: "monolithic-foundations",
      summary: "Restructuring a tangled multi-repo architecture into a deterministic decoupled monorepo.",
      tags: ["Architecture", "TypeScript", "Turbo"],
      processNotes: {
        challenge: "Circular dependency deadlocks across shared internal packages.",
        architecture: "Strict dependency boundary enforcement with automated contract checks.",
        takeaway: "Clean abstraction boundaries saved hundreds of hours of debugging across teams.",
      },
    },
  ],
};

export const DOCUMENTARY_REEL: ReelData = {
  id: "reel-documentary",
  title: "Reel 03: The Chronicles",
  genre: "documentary",
  accentColor: "#5DD62C",
  description: "Authentic production case studies, post-mortems, and engineering decision records.",
  themeTokens: {
    accentColor: "#5DD62C",
    glowColor: "#5DD62C",
    fogColor: "#0F0F0F",
    fogNear: 3.0,
    fogFar: 15.0,
    ambientColor: "#202020",
    keyLightColor: "#F8F8F8",
    keyLightIntensity: 1.9,
    beamColor: "#5DD62C",
    groundColor: "#0F0F0F",
  },
  projects: [
    {
      id: "project-doc-postmortem",
      title: "The Outage That Taught Us Redundancy",
      slug: "outage-post-mortem",
      summary: "Detailed incident analysis of an edge CDN DNS propagation failure and how we resolved it.",
      tags: ["Post-Mortem", "DNS", "Resilience"],
      processNotes: {
        challenge: "Failover routes had not been exercised under live production traffic.",
        architecture: "Continuous automated chaos drills exercising edge fallbacks weekly.",
        takeaway: "Unexercised disaster recovery plans fail when needed most.",
      },
    },
  ],
};

export const SCIFI_REEL: ReelData = {
  id: "reel-scifi",
  title: "Reel 04: Orbital Speculation",
  genre: "scifi",
  accentColor: "#5DD62C",
  description: "Speculative computing paradigms, spatial interfaces, and experimental interactions.",
  themeTokens: {
    accentColor: "#5DD62C",
    glowColor: "#337418",
    fogColor: "#0F0F0F",
    fogNear: 3.2,
    fogFar: 15.5,
    ambientColor: "#202020",
    keyLightColor: "#F8F8F8",
    keyLightIntensity: 2.1,
    beamColor: "#5DD62C",
    groundColor: "#0F0F0F",
  },
  projects: [
    {
      id: "project-scifi-spatial",
      title: "Holographic Telemetry Canvas",
      slug: "holographic-telemetry-canvas",
      summary: "3D volumetric data projection in WebXR with hand-tracking gesture manipulation.",
      tags: ["WebXR", "Spatial UI", "Three.js"],
      processNotes: {
        challenge: "High input latency on mobile headsets during 6DOF pinch tracking.",
        architecture: "Kalman filtering on hand skeleton vectors running on a 90Hz prediction loop.",
        takeaway: "Perceived tactile feedback relies on immediate spatial response before visual cues.",
      },
    },
  ],
};

export const ALL_REELS: Record<string, ReelData> = {
  [NOIR_REEL.id]: NOIR_REEL,
  [CYBERPUNK_REEL.id]: CYBERPUNK_REEL,
  [DOCUMENTARY_REEL.id]: DOCUMENTARY_REEL,
  [SCIFI_REEL.id]: SCIFI_REEL,
};

export const REELS_LIST = Object.values(ALL_REELS);
export { CYBERPUNK_REEL };
