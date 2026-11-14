"use client";

import { useEffect, useState } from "react";
import { isWebGLAvailable } from "./performance";

export interface WebGLStatus {
  isWebGLSupported: boolean;
}

/**
 * useWebGL
 * True graceful degradation hook:
 * - Defaults to true so all standard desktop and mobile browsers immediately render the full 3D hero.
 * - Only switches to false if WebGL is genuinely unavailable in the browser environment,
 *   or if a catastrophic webglcontextlost event occurs.
 */
export function useWebGL(): WebGLStatus {
  // Always default to true so 3D renders immediately
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(true);

  useEffect(() => {
    // Check if WebGL is genuinely supported in the client browser
    if (typeof window !== "undefined") {
      const supported = isWebGLAvailable();
      if (!supported) {
        console.warn("[WebGL Detection] WebGL is not supported. Activating 2D fallback.");
        setIsWebGLSupported(false);
      }
    }

    // Listen for WebGL context loss
    const handleContextLost = (e: Event) => {
      console.warn("[WebGL Detection] System reported WebGL context loss. Activating 2D fallback.");
      e.preventDefault();
      setIsWebGLSupported(false);
    };

    window.addEventListener("webglcontextlost", handleContextLost);
    return () => {
      window.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  return {
    isWebGLSupported,
  };
}
