"use client";

import React, { Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { VoxelTypography } from "./VoxelTypography";
import {
  MarsElement,
  BlackHoleElement,
} from "./AtmosphericElements";
import { RetroCrtBotElement } from "./RetroCrtBotElement";
import { QuantumCoreElement } from "./QuantumCoreElement";
import {
  MechanicalKeycapElement,
  DeveloperBreadboardElement,
  ArticulatedRobotArmElement,
} from "./FloatingTechElements";
import { getClampedDpr } from "@/lib/performance";

/**
 * Floating Pixel Leaves & Pollen Drift
 * Subtle, non-distracting ambient particles in #5DD62C and #337418
 */
const AmbientFoliageParticles: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 20;

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 8.5,
      y: (Math.random() - 0.5) * 4.5,
      z: (Math.random() - 0.5) * 2.0 + 0.3,
      speed: 0.25 + Math.random() * 0.3,
      rotSpeed: 0.4 + Math.random() * 0.6,
      color: Math.random() > 0.45 ? "#5DD62C" : "#337418",
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mesh = meshRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const y = ((p.y - time * p.speed * 0.25 + 2.5) % 5.0) - 2.5;
      const x = p.x + Math.sin(time * p.speed + i) * 0.2;

      dummy.position.set(x, y, p.z);
      dummy.rotation.set(time * p.rotSpeed, time * p.rotSpeed * 0.5, 0);
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
      color.set(p.color);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 0.4]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.65} />
    </instancedMesh>
  );
};

/**
 * Soft Grounded Contact Shadow Plane
 * Grounded in dark elements #0F0F0F, #202020 and subtle deep green tone
 */
const GroundShadow: React.FC = () => {
  const shadowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const cx = 256,
      cy = 256;
    ctx.clearRect(0, 0, 512, 512);

    const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 240);
    grad.addColorStop(0.0, "rgba(15, 15, 15, 0.42)");
    grad.addColorStop(0.35, "rgba(32, 32, 32, 0.20)");
    grad.addColorStop(0.7, "rgba(51, 116, 24, 0.05)");
    grad.addColorStop(1.0, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    return new THREE.CanvasTexture(canvas);
  }, []);

  if (!shadowTexture) return null;

  return (
    <mesh position={[0, -2.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[9.5, 4.6]} />
      <meshBasicMaterial
        map={shadowTexture}
        transparent
        opacity={0.38}
        depthWrite={false}
      />
    </mesh>
  );
};

/**
 * HeroInteractiveFollowRig
 * Elegant, subtle 3D cursor-following physics:
 * - Gentle, smooth tracking: name + bots follow cursor smoothly with high-precision damping.
 * - Subtle ambient breathing & yaw sway for a calm, premium atmosphere.
 * - Clamped spring-loaded tilt if clicked/dragged; zero possibility of awkward 360 spin.
 */
interface HeroInteractiveFollowRigProps {
  onDragStateChange?: (isDragging: boolean) => void;
  children: React.ReactNode;
}

const HeroInteractiveFollowRig: React.FC<HeroInteractiveFollowRigProps> = ({
  onDragStateChange,
  children,
}) => {
  const rigRef = useRef<THREE.Group>(null);
  const isDraggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  const { gl } = useThree();

  useEffect(() => {
    const canvasEl = gl.domElement;
    if (!canvasEl) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDraggingRef.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      onDragStateChange?.(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = (e.clientX - dragStart.current.x) / (window.innerWidth || 1);
      const dy = (e.clientY - dragStart.current.y) / (window.innerHeight || 1);

      // Clamped gentle spring tilt (max ±14 deg beyond mouse follow)
      dragOffset.current.x = THREE.MathUtils.clamp(dx * 0.65, -0.24, 0.24);
      dragOffset.current.y = THREE.MathUtils.clamp(dy * 0.45, -0.16, 0.16);
    };

    const onPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        onDragStateChange?.(false);
      }
    };

    canvasEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      canvasEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [gl, onDragStateChange]);

  useFrame((state, delta) => {
    if (!rigRef.current) return;

    const time = state.clock.getElapsedTime();
    // Normalized pointer coordinates in R3F: [-1, 1]
    const px = state.pointer.x;
    const py = state.pointer.y;

    // Release drag springs back smoothly
    if (!isDraggingRef.current) {
      dragOffset.current.x = THREE.MathUtils.damp(dragOffset.current.x, 0, 4.5, delta);
      dragOffset.current.y = THREE.MathUtils.damp(dragOffset.current.y, 0, 4.5, delta);
    }

    // Subtle gentle ambient breathing wave
    const ambientBreathY = Math.sin(time * 1.15) * 0.03;
    const ambientSwayZ = Math.cos(time * 0.8) * 0.008;

    // Target rotations (subtle, high-end editorial tracking)
    // Follow the cursor horizontally (Y axis) and vertically (X axis)
    const targetRotY = px * 0.18 + dragOffset.current.x;
    const targetRotX = -py * 0.12 - dragOffset.current.y;
    const targetRotZ = ambientSwayZ - px * 0.015;

    // Target positions (smooth subtle parallax floating)
    const targetPosX = px * 0.18;
    const targetPosY = py * 0.12 + ambientBreathY;

    // High-precision damping with frame delta (60/120 FPS fluid)
    rigRef.current.rotation.y = THREE.MathUtils.damp(
      rigRef.current.rotation.y,
      targetRotY,
      3.5,
      delta
    );
    rigRef.current.rotation.x = THREE.MathUtils.damp(
      rigRef.current.rotation.x,
      targetRotX,
      3.5,
      delta
    );
    rigRef.current.rotation.z = THREE.MathUtils.damp(
      rigRef.current.rotation.z,
      targetRotZ,
      3.0,
      delta
    );

    rigRef.current.position.x = THREE.MathUtils.damp(
      rigRef.current.position.x,
      targetPosX,
      3.2,
      delta
    );
    rigRef.current.position.y = THREE.MathUtils.damp(
      rigRef.current.position.y,
      targetPosY,
      3.2,
      delta
    );
  });

  return <group ref={rigRef}>{children}</group>;
};

/**
 * ResponsiveHeroCenterpiece
 * Automatically computes exact frustum dimensions and adapts scale & vertical placement
 * so that "LUTFAN MOHAMMED ASIF", the 5 robots, and atmospheric corner elements
 * are ALWAYS fully visible, well-proportioned, and unclipped across all screen sizes.
 */
interface ResponsiveHeroCenterpieceProps {
  onDragStateChange?: (isDragging: boolean) => void;
}

const ResponsiveHeroCenterpiece: React.FC<ResponsiveHeroCenterpieceProps> = ({
  onDragStateChange,
}) => {
  const { width: vpWidth, height: vpHeight } = useThree((state) => state.viewport);

  // Exact responsive breakpoints in R3F frustum coordinates
  const isPortrait = vpWidth < 6.8;
  const isMobile = vpWidth < 4.8;
  const isSmallMobile = vpWidth < 3.4;

  // True bounding content width & height
  const contentWidth = isSmallMobile ? 7.5 : isMobile ? 7.8 : 8.5;
  const contentHeight = 4.65;

  // Safe padding margins factoring in headers, mobile bars, and footers
  const horizontalMargin = isSmallMobile ? 0.92 : isMobile ? 0.90 : isPortrait ? 0.88 : 0.86;
  const verticalMargin = isSmallMobile ? 0.62 : isMobile ? 0.66 : isPortrait ? 0.72 : 0.78;

  // Calculate proportional scale to fit strictly within frustum and feel full & imposing
  const scaleX = (vpWidth * horizontalMargin) / contentWidth;
  const scaleY = (vpHeight * verticalMargin) / contentHeight;
  const finalScale = Math.min(1.08, scaleX, scaleY);

  // Optical vertical centering: brought down to fill the lower quadrant comfortably above the CTAs
  const yOffset = isSmallMobile
    ? -0.18
    : isMobile
    ? -0.22
    : isPortrait
    ? -0.28
    : -0.34;

  // Responsive Robot Coordinates (tuned to sit snugly on and around the voxels)
  // Viewport-relative atmospheric element positioning & scaling
  const atmosphericScale = isSmallMobile ? 0.52 : isMobile ? 0.62 : isPortrait ? 0.80 : 0.92;
  const marsX = -vpWidth * (isSmallMobile ? 0.33 : isMobile ? 0.35 : 0.37);
  const marsY = vpHeight * (isSmallMobile ? 0.28 : isMobile ? 0.28 : 0.26);

  const blackHoleX = vpWidth * (isSmallMobile ? 0.33 : isMobile ? 0.35 : 0.37);
  const blackHoleY = vpHeight * (isSmallMobile ? 0.28 : isMobile ? 0.28 : 0.26);

  const techX = -vpWidth * (isSmallMobile ? 0.32 : isMobile ? 0.34 : 0.36);
  const techY = isMobile ? -vpHeight * 0.28 : -vpHeight * 0.28;

  const quantumX = vpWidth * (isSmallMobile ? 0.32 : isMobile ? 0.34 : 0.36);
  const quantumY = techY;

  // Immersive floating tech items (Keycaps, Breadboard, Robotic Arm) with diverse z-depths
  const keycapSwitchX = vpWidth * (isSmallMobile ? 0.31 : isMobile ? 0.33 : 0.35);
  const keycapSwitchY = vpHeight * (isSmallMobile ? 0.08 : isMobile ? 0.08 : 0.10);

  const keycapAsteriskX = -vpWidth * (isSmallMobile ? 0.30 : isMobile ? 0.32 : 0.34);
  const keycapAsteriskY = vpHeight * (isSmallMobile ? 0.06 : isMobile ? 0.06 : 0.08);

  const breadboardX = vpWidth * (isSmallMobile ? 0.29 : isMobile ? 0.31 : 0.33);
  const breadboardY = -vpHeight * (isSmallMobile ? 0.09 : isMobile ? 0.09 : 0.11);

  const robotArmX = -vpWidth * (isSmallMobile ? 0.35 : isMobile ? 0.37 : 0.39);
  const robotArmY = -vpHeight * (isSmallMobile ? 0.06 : isMobile ? 0.06 : 0.08);

  return (
    <group>
      {/* Interactive cursor follower rig for entire hero cosmos */}
      <HeroInteractiveFollowRig onDragStateChange={onDragStateChange}>
        {/* 1. Scaled Centerpiece (Typography + Ground Shadow) */}
        <group position={[0, yOffset, 0]} scale={finalScale}>
          {/* 3D Bold Voxel Centerpiece */}
          <VoxelTypography position={[0, 0, 0]} scale={1.0} />

          {/* Ground Contact Shadow (anchored to ground pedestal) */}
          <GroundShadow />
        </group>

        {/* 2. Atmospheric Elements (Positioned in Viewport Corners Across All Devices) */}
        {/* Corner 1 (Top Left): Cosmic Emerald Exoplanet */}
        <MarsElement position={[marsX, marsY, -0.8]} scale={atmosphericScale} />

        {/* Corner 2 (Top Right): Soft Black Hole */}
        <BlackHoleElement position={[blackHoleX, blackHoleY, -0.8]} scale={atmosphericScale} />

        {/* Corner 3 (Bottom Left): Retro CRT Computer with glowing green eyes and potted plant */}
        <RetroCrtBotElement position={[techX, techY, -0.5]} scale={atmosphericScale * 0.92} />

        {/* Corner 4 (Bottom Right): Quantum Silicon Neural Processor with glowing bus traces */}
        <QuantumCoreElement position={[quantumX, quantumY, -0.5]} scale={atmosphericScale * 0.95} />

        {/* 3. Floating Spatial Tech Artifacts (Small & Big, In & Out Depth Layering) */}
        {/* Foreground Bokeh: Transparent Switch with Emerald Stem */}
        <MechanicalKeycapElement
          position={[keycapSwitchX, keycapSwitchY, 1.0]}
          scale={atmosphericScale * 0.72}
          variant="switch"
        />

        {/* Midground Left: Tactile Asterisk PBT Keycap */}
        <MechanicalKeycapElement
          position={[keycapAsteriskX, keycapAsteriskY, 0.2]}
          scale={atmosphericScale * 0.75}
          variant="asterisk"
        />

        {/* Midground Right: Developer Solderless Breadboard with Microcontroller & Pulsing Emerald LED */}
        <DeveloperBreadboardElement
          position={[breadboardX, breadboardY, -0.3]}
          scale={atmosphericScale * 0.82}
        />

        {/* Deep Background Left: Articulated Industrial Robotic Arm (Dark Obsidian & White Armor) */}
        <ArticulatedRobotArmElement
          position={[robotArmX, robotArmY, -1.5]}
          scale={atmosphericScale * 0.78}
        />

        {/* 4. Ambient Drifting Particles */}
        <AmbientFoliageParticles />
      </HeroInteractiveFollowRig>
    </group>
  );
};

export interface HeroSceneProps {
  className?: string;
  onDragStateChange?: (isDragging: boolean) => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  className = "",
  onDragStateChange,
}) => {
  const dpr = useMemo(() => {
    return typeof window !== "undefined" ? getClampedDpr(2, 1) : 1;
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.05, 7.4], fov: 44 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        className="h-full w-full touch-none"
      >
        <Suspense fallback={null}>
          {/* ========================================================== */}
          {/* --- STUDIO LIGHTING ARRAY -------------------------------- */}
          {/* ========================================================== */}
          <ambientLight intensity={0.82} color="#F8F8F8" />

          {/* Warm Sunlight Key Light */}
          <directionalLight
            position={[6.0, 7.5, 6.0]}
            intensity={1.85}
            color="#F8F8F8"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={18}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-bias={-0.0001}
          />

          {/* Cool Sky Fill Light */}
          <directionalLight
            position={[-5.0, 3.5, 3.5]}
            intensity={0.28}
            color="#5DD62C"
          />

          {/* Crisp Hairline Edge / Foliage Rim Light */}
          <directionalLight
            position={[0, 6.5, -5.5]}
            intensity={1.5}
            color="#F8F8F8"
          />

          {/* Soft Ground Pedestal Bounce */}
          <directionalLight
            position={[0, -4.0, 3.0]}
            intensity={0.3}
            color="#F8F8F8"
          />

          {/* ========================================================== */}
          {/* --- RESPONSIVE CENTERPIECE WITH INTERACTIVE CURSOR FOLLOW - */}
          {/* ========================================================== */}
          <ResponsiveHeroCenterpiece onDragStateChange={onDragStateChange} />
        </Suspense>
      </Canvas>
    </div>
  );
};
