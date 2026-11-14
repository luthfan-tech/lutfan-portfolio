"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Computer } from "./Computer";
import { getClampedDpr } from "@/lib/performance";
import { Project } from "@/lib/types";

/**
 * Dynamic Soft Ground Contact Shadow
 * Feathered radial shadow texture on an offscreen canvas
 * modulated in scale & opacity in sync with the computer's breathing float.
 */
const GroundContactShadow: React.FC<{ isActive?: boolean }> = ({ isActive = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const shadowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const cx = 256;
    const cy = 256;
    ctx.clearRect(0, 0, 512, 512);

    // Wide diffused ambient occlusion penumbra
    const gradOuter = ctx.createRadialGradient(cx, cy, 10, cx, cy, 240);
    gradOuter.addColorStop(0.0, "rgba(15, 15, 15, 0.35)");
    gradOuter.addColorStop(0.2, "rgba(15, 15, 15, 0.22)");
    gradOuter.addColorStop(0.5, "rgba(32, 32, 32, 0.08)");
    gradOuter.addColorStop(0.8, "rgba(32, 32, 32, 0.02)");
    gradOuter.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");

    ctx.fillStyle = gradOuter;
    ctx.fillRect(0, 0, 512, 512);

    // Inner dense contact core
    const gradInner = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
    gradInner.addColorStop(0.0, "rgba(15, 15, 15, 0.55)");
    gradInner.addColorStop(0.4, "rgba(15, 15, 15, 0.38)");
    gradInner.addColorStop(0.8, "rgba(32, 32, 32, 0.12)");
    gradInner.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");

    ctx.fillStyle = gradInner;
    ctx.fillRect(0, 0, 512, 512);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 0.85);

    if (meshRef.current) {
      const scaleFactor = 1.0 + floatY * 0.045;
      meshRef.current.scale.set(scaleFactor, scaleFactor, 1);
      const targetZ = isActive ? -0.18 : 0;
      meshRef.current.position.z = THREE.MathUtils.damp(
        meshRef.current.position.z,
        targetZ,
        4.0,
        delta
      );
    }

    if (materialRef.current) {
      materialRef.current.opacity = 0.3 - floatY * 0.05;
    }
  });

  if (!shadowTexture) return null;

  return (
    <group position={[0, -1.36, 0]}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[3.6, 3.4]} />
        <meshBasicMaterial
          ref={materialRef}
          map={shadowTexture}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[1.5, 1.3]} />
        <meshBasicMaterial
          color="#0F0F0F"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export interface ComputerSceneProps {
  className?: string;
  isActive?: boolean;
  mode?: "hero" | "work" | "about";
  activeProject?: Project | null;
  onActiveChange?: (active: boolean) => void;
  onHoverChange?: (hovered: boolean) => void;
  onDragStateChange?: (isDragging: boolean) => void;
  onLoaded?: () => void;
}

export const ComputerScene: React.FC<ComputerSceneProps> = ({
  className = "",
  isActive,
  mode = "hero",
  activeProject,
  onActiveChange,
  onHoverChange,
  onDragStateChange,
  onLoaded,
}) => {
  const dpr = useMemo(() => {
    return typeof window !== "undefined" ? getClampedDpr(2, 1) : 1;
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0.7, 0.35, 4.3], fov: 37 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        className="h-full w-full touch-none"
      >
        <Suspense fallback={null}>
          {/* Studio Ambient Base */}
          <ambientLight intensity={0.68} color="#F8F8F8" />

          {/* Warm Key Light */}
          <directionalLight
            position={[3.8, 5.4, 4.2]}
            intensity={1.85}
            color="#F8F8F8"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={12}
            shadow-camera-left={-2.5}
            shadow-camera-right={2.5}
            shadow-camera-top={2.5}
            shadow-camera-bottom={-2.5}
            shadow-bias={-0.0001}
          />

          {/* Gentle Cool Fill */}
          <directionalLight
            position={[-4.2, 2.2, 2.5]}
            intensity={0.22}
            color="#5DD62C"
          />

          {/* Rim / Hairline Backlight */}
          <directionalLight
            position={[-2.8, 4.4, -4.2]}
            intensity={1.45}
            color="#F8F8F8"
          />

          {/* Studio Floor Bounce */}
          <directionalLight
            position={[0, -3.2, 2.0]}
            intensity={0.32}
            color="#F8F8F8"
          />

          {/* 3D 90's Computer */}
          <Computer
            position={[0, 0.08, 0]}
            scale={1.05}
            isActive={isActive}
            mode={mode}
            activeProject={activeProject}
            onActiveChange={onActiveChange}
            onHoverChange={onHoverChange}
            onDragStateChange={onDragStateChange}
          />

          {/* Ground Soft Contact Shadow */}
          <GroundContactShadow isActive={isActive || mode !== "hero"} />

          {/* Orbit Controls */}
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.06}
            minDistance={2.8}
            maxDistance={5.8}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.12}
            minPolarAngle={Math.PI / 4.2}
            onStart={() => {
              onDragStateChange?.(true);
              document.body.style.cursor = "grabbing";
            }}
            onEnd={() => {
              onDragStateChange?.(false);
              document.body.style.cursor = "default";
            }}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
