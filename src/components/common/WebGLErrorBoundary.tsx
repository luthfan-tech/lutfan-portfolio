"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

export interface WebGLErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * WebGLErrorBoundary
 * Catches WebGL initialization failures, context loss, shader compilation exceptions,
 * and Three.js runtime crashes, smoothly rendering the 2D fallback without breaking the page.
 */
export class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): WebGLErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn(
      "[WebGL Error Boundary] Caught WebGL/3D initialization error:",
      error.message
    );
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
