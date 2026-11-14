"use client";

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * 1. ELEGANT MARS ELEMENT
 * A subtle, understated red planet with muted terracotta tones,
 * faint orbital wireframe ring, and miniature telemetry satellite.
 * Micro-interactions:
 * - Hover: Probe accelerates in orbit, planet slightly scales up with specular rim catch.
 * - Click/Tap: Rapid orbital transmission burst with pulsing radio waves.
 */
export const MarsElement: React.FC<{
  position: [number, number, number];
  scale?: number;
}> = ({ position, scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Group>(null);
  const transmissionRingRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const actionTimer = useRef(0);
  const currentScale = useRef(scale);

  const handleClick = (e: any) => {
    e.stopPropagation();
    actionTimer.current = 1.8;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (actionTimer.current > 0) {
      actionTimer.current -= delta;
    }

    const isActing = actionTimer.current > 0;
    const targetScale = (hovered || isActing ? 1.15 : 1.0) * scale;
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 6.0, delta);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }

    // Peaceful vs accelerated axial rotation
    if (planetRef.current) {
      const rotSpeed = isActing ? 0.45 : hovered ? 0.25 : 0.12;
      planetRef.current.rotation.y = time * rotSpeed;
      planetRef.current.rotation.x = 0.25;
    }

    // Orbital telemetry satellite rotation (accelerates on interaction)
    if (satelliteRef.current) {
      const orbitSpeed = isActing ? 1.8 : hovered ? 0.9 : 0.45;
      const angle = time * orbitSpeed;
      const radius = 0.65;
      satelliteRef.current.position.x = Math.cos(angle) * radius;
      satelliteRef.current.position.z = Math.sin(angle) * radius;
      satelliteRef.current.rotation.y = -angle;
    }

    // Transmission wave pulse on click
    if (transmissionRingRef.current) {
      if (isActing) {
        transmissionRingRef.current.visible = true;
        const progress = 1 - actionTimer.current / 1.8;
        const waveScale = 1.0 + progress * 1.8;
        transmissionRingRef.current.scale.set(waveScale, waveScale, 1);
        const mat = transmissionRingRef.current.material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = (1 - progress) * 0.45;
      } else {
        transmissionRingRef.current.visible = false;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") document.body.style.cursor = "default";
      }}
      onClick={handleClick}
    >
      {/* Emerald Exoplanet Sphere - Cosmic Jade & Emerald Core */}
      <mesh ref={planetRef} castShadow>
        <sphereGeometry args={[0.38, 28, 28]} />
        <meshStandardMaterial
          color="#183D1B"
          roughness={0.55}
          metalness={0.2}
          emissive="#5DD62C"
          emissiveIntensity={hovered ? 0.35 : 0.12}
        />
      </mesh>

      {/* Subtle Polar Ice Cap Tint */}
      <mesh position={[0, 0.35, 0]} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 8]} />
        <meshStandardMaterial
          color="#F8F8F8"
          roughness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Delicate Orbital Ring */}
      <group ref={ringRef} rotation={[Math.PI / 3.2, 0.2, 0]}>
        <mesh>
          <ringGeometry args={[0.62, 0.635, 48]} />
          <meshBasicMaterial
            color="#5DD62C"
            transparent
            opacity={hovered ? 0.55 : 0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Miniature Tech Satellite Probe */}
        <group ref={satelliteRef}>
          <mesh>
            <boxGeometry args={[0.035, 0.035, 0.035]} />
            <meshStandardMaterial color="#F8F8F8" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.045, 0, 0]}>
            <boxGeometry args={[0.05, 0.018, 0.005]} />
            <meshStandardMaterial color="#5DD62C" roughness={0.3} emissive="#5DD62C" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[-0.045, 0, 0]}>
            <boxGeometry args={[0.05, 0.018, 0.005]} />
            <meshStandardMaterial color="#5DD62C" roughness={0.3} emissive="#5DD62C" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </group>

      {/* Expanding Radio Transmission Pulse Ring */}
      <mesh ref={transmissionRingRef} visible={false}>
        <ringGeometry args={[0.42, 0.44, 32]} />
        <meshBasicMaterial color="#5DD62C" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/**
 * 2. SOFT BLACK HOLE / GRAVITATIONAL ELEMENT
 * An understated, elegant cosmic void with a pure black event horizon,
 * softly glowing accretion disk, and gravitational lensing halo.
 * Micro-interactions:
 * - Hover: Accretion disk accelerates rotation, halo flares.
 * - Click/Tap: Gravitational wave ripple expands outward.
 */
export const BlackHoleElement: React.FC<{
  position: [number, number, number];
  scale?: number;
}> = ({ position, scale = 1 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const diskRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const pulseCoreRef = useRef<THREE.Mesh>(null);
  const waveRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const actionTimer = useRef(0);
  const currentScale = useRef(scale);

  const handleClick = (e: any) => {
    e.stopPropagation();
    actionTimer.current = 2.0;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (actionTimer.current > 0) {
      actionTimer.current -= delta;
    }

    const isActing = actionTimer.current > 0;
    const targetScale = (hovered || isActing ? 1.15 : 1.0) * scale;
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 6.0, delta);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }

    // Hypnotic swirling accretion disk (accelerates on interaction)
    if (diskRef.current) {
      const diskSpeed = isActing ? -0.85 : hovered ? -0.55 : -0.28;
      diskRef.current.rotation.z = time * diskSpeed;
    }

    // Gravitational breathing halo
    if (haloRef.current) {
      const pulseRate = isActing ? 4.5 : 1.8;
      const s = 1.0 + Math.sin(time * pulseRate) * (isActing ? 0.16 : 0.06);
      haloRef.current.scale.set(s, s, s);
    }

    // Singularity breathing core
    if (pulseCoreRef.current) {
      const s = 1.0 + Math.cos(time * 2.2) * (isActing ? 0.08 : 0.03);
      pulseCoreRef.current.scale.set(s, s, s);
    }

    // Gravitational wave ring ripple
    if (waveRef.current) {
      if (isActing) {
        waveRef.current.visible = true;
        const progress = 1 - actionTimer.current / 2.0;
        const s = 1.0 + progress * 2.2;
        waveRef.current.scale.set(s, s, s);
        const mat = waveRef.current.material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = (1 - progress) * 0.35;
      } else {
        waveRef.current.visible = false;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") document.body.style.cursor = "default";
      }}
      onClick={handleClick}
    >
      {/* 1. Pure Pitch Black Event Horizon */}
      <mesh ref={pulseCoreRef}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial color="#050505" />
      </mesh>

      {/* 2. Soft Accretion Disk */}
      <group ref={diskRef} rotation={[Math.PI / 2.6, 0.35, 0]}>
        <mesh>
          <ringGeometry args={[0.42, 0.68, 64]} />
          <meshBasicMaterial
            color="#202020"
            transparent
            opacity={hovered ? 0.65 : 0.42}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[0.66, 0.88, 64]} />
          <meshBasicMaterial
            color="#5DD62C"
            transparent
            opacity={hovered ? 0.32 : 0.16}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 3. Gravitational Lensing Halo */}
      <mesh ref={haloRef}>
        <ringGeometry args={[0.35, 0.44, 48]} />
        <meshBasicMaterial
          color="#F8F8F8"
          transparent
          opacity={hovered ? 0.35 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gravitational Wave Ripple */}
      <mesh ref={waveRef} visible={false}>
        <ringGeometry args={[0.45, 0.48, 48]} />
        <meshBasicMaterial color="#5DD62C" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/**
 * 3. MINI HARDWARE / ARDUINO COMPONENT
 * A miniature floating microcontroller PCB component.
 * Micro-interactions:
 * - Hover: Status LED flashes rapidly in data burst, board lifts and faces camera.
 * - Click/Tap: High-speed binary execution strobe!
 */
export const MiniTechComponent: React.FC<{
  position: [number, number, number];
  scale?: number;
}> = ({ position, scale = 1 }) => {
  const boardRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const actionTimer = useRef(0);
  const currentScale = useRef(scale);

  const handleClick = (e: any) => {
    e.stopPropagation();
    actionTimer.current = 1.8;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (actionTimer.current > 0) {
      actionTimer.current -= delta;
    }

    const isActing = actionTimer.current > 0;
    const targetScale = (hovered || isActing ? 1.18 : 1.0) * scale;
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 6.0, delta);

    if (boardRef.current) {
      boardRef.current.scale.setScalar(currentScale.current);
      boardRef.current.position.y =
        position[1] + (hovered ? 0.08 : 0) + Math.sin(time * 1.5) * 0.04;
      boardRef.current.rotation.y = Math.sin(time * 0.6) * 0.12 + (hovered ? 0.4 : 0.3);
      boardRef.current.rotation.x = Math.sin(time * 0.8) * 0.06 - (hovered ? 0.1 : 0.2);
    }

    // Heartbeat vs high-speed binary strobe
    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const strobeFreq = isActing ? 28.0 : hovered ? 12.0 : 4.0;
        mat.emissiveIntensity = 0.5 + Math.sin(time * strobeFreq) * 0.45;
      }
    }
  });

  return (
    <group
      ref={boardRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") document.body.style.cursor = "default";
      }}
      onClick={handleClick}
    >
      {/* Matte Green Solder-Mask PCB Board */}
      <mesh castShadow>
        <boxGeometry args={[0.44, 0.02, 0.34]} />
        <meshStandardMaterial color="#337418" roughness={0.5} />
      </mesh>

      {/* Microcontroller IC Chip */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.18, 0.025, 0.14]} />
        <meshStandardMaterial color="#0F0F0F" roughness={0.3} />
      </mesh>

      {/* Silver IC Contact Pins */}
      <mesh position={[-0.11, 0.015, 0]}>
        <boxGeometry args={[0.02, 0.015, 0.12]} />
        <meshStandardMaterial color="#F8F8F8" metalness={0.8} />
      </mesh>
      <mesh position={[0.11, 0.015, 0]}>
        <boxGeometry args={[0.02, 0.015, 0.12]} />
        <meshStandardMaterial color="#F8F8F8" metalness={0.8} />
      </mesh>

      {/* Copper Connection Traces */}
      <mesh position={[-0.08, 0.012, 0.1]}>
        <boxGeometry args={[0.16, 0.005, 0.02]} />
        <meshStandardMaterial color="#5DD62C" metalness={0.7} />
      </mesh>
      <mesh position={[0.08, 0.012, 0.1]}>
        <boxGeometry args={[0.16, 0.005, 0.02]} />
        <meshStandardMaterial color="#5DD62C" metalness={0.7} />
      </mesh>

      {/* Pulsing Status LED */}
      <mesh ref={ledRef} position={[0.16, 0.025, -0.1]}>
        <boxGeometry args={[0.03, 0.02, 0.03]} />
        <meshStandardMaterial
          color="#5DD62C"
          emissive="#5DD62C"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};
