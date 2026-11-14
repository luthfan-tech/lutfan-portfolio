import { PerformanceConfig, PerformanceTierLevel } from "./types";

/**
 * Checks if WebGL is supported and can be initialized in the current browser.
 * Defaults to true during SSR so 3D canvases are rendered immediately on hydration.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Checks if the runtime environment is a mobile device.
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const userAgentMatch = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  return userAgentMatch;
}

/**
 * Detects device hardware capability to determine performance tier.
 * Only returns isCapable: false when WebGL is genuinely unavailable.
 */
export function detectDeviceCapability(): {
  isCapable: boolean;
  tier: PerformanceTierLevel;
  reason: string;
} {
  if (typeof window === "undefined") {
    return { isCapable: true, tier: "high", reason: "SSR" };
  }

  // 1. Hard check: WebGL support
  if (!isWebGLAvailable()) {
    return { isCapable: false, tier: "low", reason: "WebGL not supported" };
  }

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
  const isMobile = isMobileDevice();

  const tier: PerformanceTierLevel = isMobile ? "medium" : cores >= 8 && memory >= 8 ? "high" : "medium";

  return {
    isCapable: true,
    tier,
    reason: "WebGL acceleration active",
  };
}

/**
 * Calculates a clamped devicePixelRatio.
 * Capped at 2 on desktop and 1.5 on mobile devices for optimal rendering performance.
 */
export function getClampedDpr(maxDpr = 2, minDpr = 1): number {
  if (typeof window === "undefined") return 1;

  const rawDpr = window.devicePixelRatio || 1;
  const isMobile = isMobileDevice();
  const upperLimit = isMobile ? Math.min(maxDpr, 1.5) : maxDpr;

  return Math.min(Math.max(rawDpr, minDpr), upperLimit);
}

/**
 * Helper to determine basic performance tier and default rendering parameters.
 */
export function getInitialPerformanceConfig(): PerformanceConfig {
  const { isCapable, tier } = detectDeviceCapability();
  const dpr = getClampedDpr();

  return {
    tier,
    dpr: isCapable ? dpr : 1,
    enablePostProcessing: tier === "high",
    enableShadows: isCapable && tier !== "low",
    isMobile: isMobileDevice(),
  };
}
