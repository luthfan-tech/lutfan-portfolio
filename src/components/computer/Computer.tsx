"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Project } from "@/lib/types";

export interface ComputerProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  isInteractive?: boolean;
  isActive?: boolean;
  mode?: "hero" | "work" | "about";
  activeProject?: Project | null;
  onActiveChange?: (active: boolean) => void;
  onHoverChange?: (hovered: boolean) => void;
  onDragStateChange?: (isDragging: boolean) => void;
}

export const Computer: React.FC<ComputerProps> = ({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isInteractive = true,
  isActive: externalIsActive,
  mode = "hero",
  activeProject,
  onActiveChange,
  onHoverChange,
  onDragStateChange,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const floatingGroupRef = useRef<THREE.Group>(null);
  const slowYawGroupRef = useRef<THREE.Group>(null);
  const screenMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const phosphorLightRef = useRef<THREE.PointLight>(null);
  const ledMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  const [internalActive, setInternalActive] = useState(false);
  const isActive = externalIsActive !== undefined ? externalIsActive : internalActive;

  const [hovered, setHovered] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  const animScale = useRef(scale);
  const animOffsetZ = useRef(0);
  const animOffsetY = useRef(0);
  const animEmissive = useRef(0.28);
  const ledBlinkTimer = useRef(0);

  // Synchronize cursor styles cleanly
  useEffect(() => {
    if (!isInteractive) return;

    if (isPointerDown) {
      document.body.style.cursor = "grabbing";
    } else if (hovered) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "default";
    }

    return () => {
      document.body.style.cursor = "default";
    };
  }, [hovered, isPointerDown, isInteractive]);

  // 1. Idle CRT Screen Texture
  const idleScreenTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#0F0F0F";
    ctx.fillRect(0, 0, 1024, 768);

    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    for (let y = 0; y < 768; y += 4) {
      ctx.fillRect(0, y, 1024, 2);
    }

    ctx.fillStyle = "#202020";
    ctx.fillRect(32, 32, 960, 48);
    ctx.fillStyle = "#5DD62C";
    ctx.font = "bold 22px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("◆ LUTFAN // CREATIVE ARCHIVE", 52, 64);
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("LUTFAN.OS v2.4 // ONLINE", 720, 64);

    ctx.strokeStyle = "#337418";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(32, 104, 960, 620);
    ctx.fillStyle = "#202020";
    ctx.fillRect(35, 107, 954, 40);
    ctx.fillStyle = "#5DD62C";
    ctx.font = "bold 18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("WORKSPACE: /VOLUMES/ARCHIVE/INDEX.SYS", 56, 133);

    ctx.fillStyle = "#5DD62C";
    ctx.font = "20px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("> INITIATING COLD BOOT: LUTFAN 68030 BUS", 60, 195);
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("  [OK] 64MB EXPANSION RAM VERIFIED", 60, 235);
    ctx.fillText("  [OK] HIGH-DENSITY FRAMEBUFFER LOADED (60Hz)", 60, 270);
    ctx.fillText("  [OK] FLOATING-POINT COPROCESSOR ACTIVE", 60, 305);
    ctx.fillText("  [OK] CINEMATIC PROCESS LOGS MOUNTED", 60, 340);

    ctx.strokeStyle = "#5DD62C";
    ctx.lineWidth = 2.5;
    const ox = 120, oy = 430, size = 150, offset = 48;
    ctx.strokeRect(ox, oy, size, size);
    ctx.strokeRect(ox + offset, oy - offset, size, size);
    ctx.beginPath();
    ctx.moveTo(ox, oy); ctx.lineTo(ox + offset, oy - offset);
    ctx.moveTo(ox + size, oy); ctx.lineTo(ox + size + offset, oy - offset);
    ctx.moveTo(ox, oy + size); ctx.lineTo(ox + offset, oy + size - offset);
    ctx.moveTo(ox + size, oy + size); ctx.lineTo(ox + size + offset, oy + size - offset);
    ctx.stroke();

    ctx.fillStyle = "#F8F8F8";
    ctx.font = "18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("READY TO EXPLORE.", 380, 480);
    ctx.fillText("DRAG TO ROTATE 360° VIEWPORT", 380, 520);
    ctx.fillText("CLICK COMPUTER TO OPEN ARCHIVE", 380, 555);

    ctx.fillStyle = "#5DD62C";
    ctx.fillRect(380, 580, 16, 26);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 8;
    return tex;
  }, []);

  // 2. Active Screen Texture (Work / Project Inspection)
  const activeScreenTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#0F0F0F";
    ctx.fillRect(0, 0, 1024, 768);

    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    for (let y = 0; y < 768; y += 4) {
      ctx.fillRect(0, y, 1024, 2);
    }

    ctx.fillStyle = "#202020";
    ctx.fillRect(32, 32, 960, 48);
    ctx.fillStyle = "#5DD62C";
    ctx.font = "bold 22px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("● LUTFAN // WORKSPACE ENGAGED", 52, 64);
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText(activeProject ? `PROJECT: ${activeProject.year}` : "FOCUS MODE [60 FPS]", 680, 64);

    ctx.strokeStyle = "#337418";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(32, 104, 960, 620);
    ctx.fillStyle = "#202020";
    ctx.fillRect(35, 107, 954, 40);
    ctx.fillStyle = "#5DD62C";
    ctx.font = "bold 18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText(
      activeProject
        ? `VIEW: ${activeProject.title.toUpperCase()}`
        : "STREAM // REAL-TIME GEOMETRY ENGINE ONLINE",
      56,
      133
    );

    ctx.fillStyle = "#5DD62C";
    ctx.font = "20px 'SF Mono', 'Courier New', monospace";
    ctx.fillText(
      activeProject
        ? `> ROLE: ${(activeProject.role || "LEAD ARCHITECT").toUpperCase()}`
        : "> EXECUTING EXECUTIVE PROCESS PIPELINE...",
      60,
      195
    );

    ctx.fillStyle = "#F8F8F8";
    ctx.font = "18px 'SF Mono', 'Courier New', monospace";
    if (activeProject) {
      ctx.fillText(`  • SUMMARY: ${activeProject.summary.slice(0, 62)}...`, 60, 235);
      ctx.fillText(`  • STACK: ${activeProject.tags.join(" // ")}`, 60, 270);
      ctx.fillText(
        `  • CHALLENGE: ${activeProject.processNotes?.challenge?.slice(0, 58) || "VERIFIED"}...`,
        60,
        305
      );
      ctx.fillText("  • STATUS: ALL UNITS NOMINAL // ARCHIVE OPEN", 60, 340);
    } else {
      ctx.fillText("  • GEOMETRY: CURVED CRT PHOSPHOR SURFACE", 60, 235);
      ctx.fillText("  • LIGHTING: STUDIO 5-POINT DIRECTIONAL ARRAY", 60, 270);
      ctx.fillText("  • INTERACTION: 360° ORBIT CAMERA ACTIVE", 60, 305);
      ctx.fillText("  • STATUS: PORTFOLIO ARCHIVES READY FOR PLAYBACK", 60, 340);
    }

    ctx.strokeStyle = "#5DD62C";
    ctx.lineWidth = 2;

    if (activeProject?.id === "project-100-c") {
      // Memory Register Grid for 100 C Programs
      ctx.fillStyle = "#202020";
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          ctx.strokeRect(100 + c * 45, 420 + r * 45, 40, 40);
          ctx.fillRect(102 + c * 45, 422 + r * 45, 36, 36);
        }
      }
      ctx.fillStyle = "#5DD62C";
      ctx.font = "10px 'SF Mono', monospace";
      ctx.fillText("PTR 0x00..0x3F", 100, 620);
    } else if (activeProject?.id === "project-100-python") {
      // Algorithmic Tree / Graph for 100 Python Programs
      const cx = 190, cy = 440;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.arc(cx - 50, cy + 60, 12, 0, Math.PI * 2);
      ctx.arc(cx + 50, cy + 60, 12, 0, Math.PI * 2);
      ctx.arc(cx - 80, cy + 130, 10, 0, Math.PI * 2);
      ctx.arc(cx - 20, cy + 130, 10, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy + 130, 10, 0, Math.PI * 2);
      ctx.arc(cx + 80, cy + 130, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy + 14); ctx.lineTo(cx - 50, cy + 48);
      ctx.moveTo(cx, cy + 14); ctx.lineTo(cx + 50, cy + 48);
      ctx.moveTo(cx - 50, cy + 72); ctx.lineTo(cx - 80, cy + 120);
      ctx.moveTo(cx - 50, cy + 72); ctx.lineTo(cx - 20, cy + 120);
      ctx.moveTo(cx + 50, cy + 72); ctx.lineTo(cx + 30, cy + 120);
      ctx.moveTo(cx + 50, cy + 72); ctx.lineTo(cx + 80, cy + 120);
      ctx.stroke();
    } else {
      // Adaptive Radar Lattice for AdaptLearn
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(190, 520, 25 + i * 26, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(70, 520); ctx.lineTo(310, 520);
      ctx.moveTo(190, 400); ctx.lineTo(190, 640);
      ctx.stroke();
    }

    ctx.fillStyle = "#5DD62C";
    ctx.font = "bold 20px 'SF Mono', 'Courier New', monospace";
    ctx.fillText(activeProject ? activeProject.title.slice(0, 26) : "ARCHIVE UNLOCKED", 380, 490);
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "17px 'SF Mono', 'Courier New', monospace";
    ctx.fillText(activeProject?.links?.[0]?.url ? "REPO: GITHUB.COM/LUTHFAN-TECH" : "SELECT ANY WORK IN THE LIST", 380, 530);
    ctx.fillText("CLICK 'BACK TO HERO' TO RETURN", 380, 565);

    ctx.fillStyle = "#5DD62C";
    ctx.fillRect(380, 595, 20, 26);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 8;
    return tex;
  }, [activeProject]);

  // 3. About / Dossier Screen Texture
  const aboutScreenTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#0F0F0F";
    ctx.fillRect(0, 0, 1024, 768);

    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    for (let y = 0; y < 768; y += 4) {
      ctx.fillRect(0, y, 1024, 2);
    }

    ctx.fillStyle = "#202020";
    ctx.fillRect(32, 32, 960, 48);
    ctx.fillStyle = "#5DD62C";
    ctx.font = "bold 22px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("● LUTFAN // BIOGRAPHY & DOSSIER", 52, 64);
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("OPERATOR: LUTFAN [ACTIVE]", 680, 64);

    ctx.strokeStyle = "#337418";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(32, 104, 960, 620);
    ctx.fillStyle = "#202020";
    ctx.fillRect(35, 107, 954, 40);
    ctx.fillStyle = "#5DD62C";
    ctx.font = "bold 18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("FILE: /ETC/PERSONNEL/LUTFAN_BIO.DAT", 56, 133);

    ctx.fillStyle = "#5DD62C";
    ctx.font = "20px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("> IDENTITY RECORD VERIFIED", 60, 195);
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "18px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("  • DISCIPLINE: CREATIVE DEVELOPER & ARCHITECT", 60, 235);
    ctx.fillText("  • ENGINE: THREE.JS • GLSL • NEXT.JS • WASM", 60, 270);
    ctx.fillText("  • ETHOS: SUB-10MS LATENCY & PHYSICAL KINETICS", 60, 305);
    ctx.fillText("  • AVAILABILITY: SELECT COMMERCIAL COMMISSIONS", 60, 340);

    // Vector Geometric Silhouette
    ctx.strokeStyle = "#5DD62C";
    ctx.lineWidth = 2.5;
    const cx = 200, cy = 520;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 80);
    ctx.lineTo(cx + 80, cy);
    ctx.lineTo(cx, cy + 80);
    ctx.lineTo(cx - 80, cy);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy - 80); ctx.lineTo(cx, cy + 80);
    ctx.moveTo(cx - 80, cy); ctx.lineTo(cx + 80, cy);
    ctx.stroke();

    ctx.strokeStyle = "#337418";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 100, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#5DD62C";
    ctx.font = "bold 20px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("LUTFAN // CORE SPEC", 380, 490);
    ctx.fillStyle = "#F8F8F8";
    ctx.font = "17px 'SF Mono', 'Courier New', monospace";
    ctx.fillText("OPEN TO COMMISSIONS & DIRECT ROLES", 380, 530);
    ctx.fillText("DIRECT MAIL: CONTACT@LUTFAN.DEV", 380, 565);

    ctx.fillStyle = "#5DD62C";
    ctx.fillRect(380, 595, 20, 26);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 8;
    return tex;
  }, []);

  // 4. Convex CRT Curvature Geometry
  const curvedScreenGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(1.28, 1.0, 32, 32);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const distSq = (x * x) / (0.64 * 0.64) + (y * y) / (0.5 * 0.5);
      const bulge = Math.max(0, 1 - distSq * 0.45) * 0.045;
      pos.setZ(i, bulge);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // 5. Smooth Damped Frame Loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const targetScale = scale * (hovered ? 1.02 : 1.0);
    animScale.current = THREE.MathUtils.damp(animScale.current, targetScale, 4.5, delta);

    const isMovedBack = isActive || mode === "work" || mode === "about";
    const targetOffsetZ = isMovedBack ? -0.22 : 0;
    const targetOffsetY = isMovedBack ? 0.04 : 0;
    animOffsetZ.current = THREE.MathUtils.damp(animOffsetZ.current, targetOffsetZ, 4.0, delta);
    animOffsetY.current = THREE.MathUtils.damp(animOffsetY.current, targetOffsetY, 4.0, delta);

    if (rootGroupRef.current) {
      rootGroupRef.current.scale.setScalar(animScale.current);
      rootGroupRef.current.position.z = position[2] + animOffsetZ.current;
      rootGroupRef.current.position.y = position[1] + animOffsetY.current;
    }

    if (floatingGroupRef.current) {
      floatingGroupRef.current.position.y = Math.sin(time * 0.85) * 0.052;
      floatingGroupRef.current.rotation.x = Math.sin(time * 0.6) * 0.016;
      floatingGroupRef.current.rotation.z = Math.cos(time * 0.72) * 0.012;
    }

    if (slowYawGroupRef.current) {
      slowYawGroupRef.current.rotation.y = Math.sin(time * 0.28) * 0.14;
    }

    const targetEmissive = isMovedBack ? 0.52 : (hovered ? 0.40 : 0.28);
    animEmissive.current = THREE.MathUtils.damp(animEmissive.current, targetEmissive, 5.0, delta);
    if (screenMaterialRef.current) {
      screenMaterialRef.current.emissiveIntensity = animEmissive.current;
    }

    if (phosphorLightRef.current) {
      const targetPointIntensity = isMovedBack ? 0.75 : (hovered ? 0.55 : 0.38);
      phosphorLightRef.current.intensity = THREE.MathUtils.damp(
        phosphorLightRef.current.intensity,
        targetPointIntensity,
        5.0,
        delta
      );
    }

    if (ledBlinkTimer.current > 0) {
      ledBlinkTimer.current -= delta;
      if (ledMaterialRef.current) {
        const blink = Math.sin(ledBlinkTimer.current * 25) > 0 ? 3.0 : 0.5;
        ledMaterialRef.current.emissiveIntensity = blink;
      }
    } else if (ledMaterialRef.current) {
      ledMaterialRef.current.emissiveIntensity = 1.4;
    }

    if (rootGroupRef.current && isInteractive) {
      const targetTiltY = hovered ? mousePos.current.x * 0.2 : 0;
      const targetTiltX = hovered ? -mousePos.current.y * 0.14 : 0;

      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        rotation[1] + targetTiltY,
        3.5,
        delta
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        rotation[0] + targetTiltX,
        3.5,
        delta
      );
    }
  });

  const handlePointerOver = () => {
    if (!isInteractive) return;
    setHovered(true);
    onHoverChange?.(true);
  };

  const handlePointerOut = () => {
    if (!isInteractive) return;
    setHovered(false);
    setIsPointerDown(false);
    onHoverChange?.(false);
    onDragStateChange?.(false);
  };

  const handlePointerDown = () => {
    if (!isInteractive) return;
    setIsPointerDown(true);
    onDragStateChange?.(true);
  };

  const handlePointerUp = () => {
    if (!isInteractive) return;
    setIsPointerDown(false);
    onDragStateChange?.(false);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!isInteractive) return;

    const nextActive = !isActive;
    setInternalActive(nextActive);
    onActiveChange?.(nextActive);

    ledBlinkTimer.current = 0.5;

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  const handlePointerMove = (e: any) => {
    if (!isInteractive) return;
    const { x, y } = e.point;
    mousePos.current = {
      x: Math.max(-1, Math.min(1, x * 0.4)),
      y: Math.max(-1, Math.min(1, y * 0.4)),
    };
  };

  const chassisMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#202020",
        roughness: 0.48,
        metalness: 0.04,
      }),
    []
  );

  const frontBezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0F0F0F",
        roughness: 0.42,
        metalness: 0.03,
      }),
    []
  );

  const chinBaseMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#202020",
        roughness: 0.52,
        metalness: 0.05,
      }),
    []
  );

  const darkCavityMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0F0F0F",
        roughness: 0.75,
        metalness: 0.15,
      }),
    []
  );

  const metallicBadgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#5DD62C",
        metalness: 0.9,
        roughness: 0.22,
      }),
    []
  );

  const activeTexture =
    mode === "about"
      ? aboutScreenTexture
      : isActive || mode === "work"
      ? activeScreenTexture
      : idleScreenTexture;

  return (
    <group
      ref={rootGroupRef}
      position={position}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
    >
      <group ref={floatingGroupRef}>
        <group ref={slowYawGroupRef}>
          {/* Main Enclosure Box */}
          <mesh position={[0, 0.15, -0.06]} material={chassisMaterial} castShadow receiveShadow>
            <boxGeometry args={[1.72, 1.95, 1.48]} />
          </mesh>

          {/* Tapered Rear Extension (CRT neck casing) */}
          <mesh position={[0, 0.18, -0.84]} material={chassisMaterial} castShadow receiveShadow>
            <boxGeometry args={[1.42, 1.62, 0.22]} />
          </mesh>

          {/* Front Bevel Frame */}
          <mesh position={[0, 0.25, 0.7]} rotation={[0.042, 0, 0]} material={frontBezelMaterial} castShadow>
            <boxGeometry args={[1.68, 1.7, 0.12]} />
          </mesh>

          {/* Recessed Dark Screen Bezel Chamfer */}
          <mesh position={[0, 0.46, 0.74]} rotation={[0.042, 0, 0]}>
            <boxGeometry args={[1.38, 1.1, 0.08]} />
            <meshStandardMaterial color="#0F0F0F" roughness={0.7} metalness={0.2} />
          </mesh>

          {/* Glowing Phosphor Screen Mesh */}
          <mesh position={[0, 0.46, 0.77]} rotation={[0.042, 0, 0]} geometry={curvedScreenGeometry}>
            {activeTexture ? (
              <meshStandardMaterial
                ref={screenMaterialRef}
                map={activeTexture}
                emissiveMap={activeTexture}
                emissive={mode === "about" ? "#337418" : isActive ? "#5DD62C" : "#5DD62C"}
                emissiveIntensity={0.28}
                roughness={0.16}
                metalness={0.1}
                toneMapped={false}
              />
            ) : (
              <meshStandardMaterial
                color="#0F0F0F"
                emissive="#337418"
                emissiveIntensity={0.5}
                roughness={0.12}
              />
            )}
          </mesh>

          {/* Reflective CRT Curved Glass Outer Shield */}
          <mesh position={[0, 0.46, 0.776]} rotation={[0.042, 0, 0]} geometry={curvedScreenGeometry}>
            <meshPhysicalMaterial
              color="#F8F8F8"
              transparent
              opacity={0.22}
              roughness={0.07}
              metalness={0.08}
              reflectivity={0.92}
              clearcoat={1.0}
              clearcoatRoughness={0.06}
              transmission={0.88}
              thickness={0.04}
              ior={1.48}
            />
          </mesh>

          {/* Phosphor glow on chin */}
          <pointLight
            ref={phosphorLightRef}
            position={[0, 0.46, 0.9]}
            color={mode === "about" ? "#337418" : isActive ? "#5DD62C" : "#5DD62C"}
            intensity={0.42}
            distance={1.4}
          />

          {/* Floppy Disk Drive & Front Chin */}
          <mesh position={[0.32, -0.32, 0.75]}>
            <boxGeometry args={[0.56, 0.04, 0.08]} />
            <primitive object={darkCavityMaterial} />
          </mesh>
          <mesh position={[0.32, -0.32, 0.77]}>
            <boxGeometry args={[0.52, 0.01, 0.04]} />
            <meshStandardMaterial color="#202020" metalness={0.88} roughness={0.26} />
          </mesh>
          <mesh position={[0.66, -0.32, 0.765]}>
            <boxGeometry args={[0.05, 0.026, 0.038]} />
            <meshStandardMaterial color="#F8F8F8" roughness={0.46} />
          </mesh>
          <mesh position={[0.0, -0.32, 0.762]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.014, 0.014, 0.02, 16]} />
            <meshStandardMaterial
              ref={ledMaterialRef}
              color="#5DD62C"
              emissive="#5DD62C"
              emissiveIntensity={1.4}
              roughness={0.2}
            />
          </mesh>
          <pointLight position={[0.0, -0.32, 0.78]} color="#5DD62C" intensity={0.25} distance={0.5} />

          {/* Studio Emblem Badge */}
          <mesh position={[-0.56, -0.32, 0.765]} material={metallicBadgeMaterial}>
            <boxGeometry args={[0.09, 0.09, 0.016]} />
          </mesh>

          {/* Lower Chin Styling Grooves */}
          {[-0.42, -0.48].map((y, i) => (
            <mesh key={`groove-${i}`} position={[0, y, 0.742]}>
              <boxGeometry args={[1.46, 0.014, 0.03]} />
              <meshStandardMaterial color="#0F0F0F" roughness={0.65} />
            </mesh>
          ))}

          {/* Top Carrying Handle */}
          <mesh position={[0, 1.13, -0.06]}>
            <boxGeometry args={[0.88, 0.08, 0.36]} />
            <meshStandardMaterial color="#202020" roughness={0.55} />
          </mesh>
          <mesh position={[0, 1.11, -0.06]} material={darkCavityMaterial}>
            <boxGeometry args={[0.68, 0.06, 0.24]} />
          </mesh>

          {/* Side Cooling Louvers */}
          {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={`vent-l-${i}`} position={[-0.87, 0.48 - i * 0.095, -0.18]} material={darkCavityMaterial}>
              <boxGeometry args={[0.022, 0.032, 0.62]} />
            </mesh>
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={`vent-r-${i}`} position={[0.87, 0.48 - i * 0.095, -0.18]} material={darkCavityMaterial}>
              <boxGeometry args={[0.022, 0.032, 0.62]} />
            </mesh>
          ))}

          {/* Rear Ports & Detailing */}
          <mesh position={[0, 0.12, -0.96]}>
            <boxGeometry args={[0.85, 0.42, 0.02]} />
            <meshStandardMaterial color="#0F0F0F" roughness={0.8} />
          </mesh>
          <mesh position={[0.45, -0.4, -0.82]}>
            <boxGeometry args={[0.08, 0.12, 0.04]} />
            <meshStandardMaterial color="#5DD62C" roughness={0.4} />
          </mesh>
          <mesh position={[-0.45, -0.4, -0.82]} material={darkCavityMaterial}>
            <boxGeometry args={[0.16, 0.1, 0.04]} />
          </mesh>
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={`rear-vent-${i}`} position={[0, 0.62 - i * 0.08, -0.96]} material={darkCavityMaterial}>
              <boxGeometry args={[0.92, 0.028, 0.02]} />
            </mesh>
          ))}

          {/* Elevated Base & Feet */}
          <mesh position={[0, -0.86, -0.06]} material={chinBaseMaterial} castShadow receiveShadow>
            <boxGeometry args={[1.58, 0.12, 1.36]} />
          </mesh>
          <mesh position={[0, -0.92, 0.44]}>
            <boxGeometry args={[1.4, 0.065, 0.26]} />
            <meshStandardMaterial color="#0F0F0F" roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.92, -0.48]}>
            <boxGeometry args={[1.4, 0.065, 0.26]} />
            <meshStandardMaterial color="#0F0F0F" roughness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
