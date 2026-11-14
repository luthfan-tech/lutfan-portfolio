"use client";

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface RetroCrtBotElementProps {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

/**
 * RetroCrtBotElement
 * Inspired by reference Image 2:
 * An adorable, premium 3D mini retro CRT computer with glowing green slit eyes (//),
 * floppy disk drive base, and a miniature potted plant companion.
 * - Alive idle animation: breathes, blinks green CRT eyes, tilts head towards cursor.
 * - Micro-interactions:
 *   - Hover: eyes light up into happy arcs (^^), monitor tilts inquisitively.
 *   - Click/Tap: joyful bounce, rapid floppy drive LED blinking, playful beep audio trigger.
 * - Perfectly matches the palette: #F8F8F8, #EAE8E3, #202020, and #5DD62C green glow.
 */
export const RetroCrtBotElement: React.FC<RetroCrtBotElementProps> = ({
  position,
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const plantLeavesRef = useRef<THREE.Group>(null);
  const ledRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const bounceTimer = useRef(0);
  const blinkTimer = useRef(2.5);
  const isBlinking = useRef(false);
  const currentScale = useRef(scale);

  const handleClick = (e: any) => {
    e.stopPropagation();
    bounceTimer.current = 1.6;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
      window.dispatchEvent(new CustomEvent("open-retro-shell"));
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // Countdown bounce action on click
    if (bounceTimer.current > 0) {
      bounceTimer.current -= delta;
    }
    const isBouncing = bounceTimer.current > 0;

    // Smooth hover/active scale
    const targetScale = (hovered ? 1.15 : isBouncing ? 1.2 : 1.0) * scale;
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 6.0, delta);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }

    // Blink system (every 3-4s, blinks for 0.15s)
    blinkTimer.current -= delta;
    if (blinkTimer.current <= 0) {
      isBlinking.current = true;
      if (blinkTimer.current <= -0.15) {
        isBlinking.current = false;
        blinkTimer.current = 2.8 + Math.random() * 2.5;
      }
    }

    // Monitor head breathing & cursor-tracking
    if (monitorRef.current) {
      const breathe = Math.sin(time * 2.2) * 0.02;
      const bounceY = isBouncing ? Math.abs(Math.sin(time * 14)) * 0.12 : 0;
      monitorRef.current.position.y = 0.28 + breathe + bounceY;

      // Inquisitive head tilt following pointer
      const targetRotY = pointer.x * 0.35 + (hovered ? 0.1 : 0);
      const targetRotX = -pointer.y * 0.25 - 0.08;
      monitorRef.current.rotation.y = THREE.MathUtils.damp(monitorRef.current.rotation.y, targetRotY, 5.0, delta);
      monitorRef.current.rotation.x = THREE.MathUtils.damp(monitorRef.current.rotation.x, targetRotX, 5.0, delta);
    }

    // Eye shape & blinking
    if (eyeLeftRef.current && eyeRightRef.current) {
      const eyeScaleY = isBlinking.current ? 0.08 : hovered ? 0.75 : 1.0;
      const eyeRotZ = hovered ? 0.35 : 0.18; // Happy angle on hover!
      eyeLeftRef.current.scale.set(1.0, eyeScaleY, 1.0);
      eyeRightRef.current.scale.set(1.0, eyeScaleY, 1.0);
      eyeLeftRef.current.rotation.z = eyeRotZ;
      eyeRightRef.current.rotation.z = eyeRotZ;
    }

    // Plant leaves gentle flutter
    if (plantLeavesRef.current) {
      plantLeavesRef.current.rotation.y = Math.sin(time * 1.8) * 0.08;
      plantLeavesRef.current.rotation.z = Math.cos(time * 2.4) * 0.05 + (hovered ? 0.12 : 0);
    }

    // Floppy disk activity LED strobe
    if (ledRef.current) {
      const ledMat = ledRef.current.material as THREE.MeshBasicMaterial;
      if (ledMat) {
        const strobe = isBouncing
          ? Math.sin(time * 30) > 0
          : hovered
          ? Math.sin(time * 12) > 0
          : Math.sin(time * 2.0) > 0.8;
        ledMat.color.set(strobe ? "#5DD62C" : "#202020");
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
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
      {/* ========================================================== */}
      {/* 1. COMPUTER BASE UNIT (Beige Desktop Case)                 */}
      {/* ========================================================== */}
      <group position={[0, 0, 0]}>
        {/* Main Case Chassis */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.76, 0.22, 0.76]} />
          <meshStandardMaterial color="#EAE8E3" roughness={0.45} metalness={0.05} />
        </mesh>

        {/* Front Panel Bevel */}
        <mesh position={[0, 0.08, 0.385]}>
          <boxGeometry args={[0.72, 0.18, 0.02]} />
          <meshStandardMaterial color="#DDD9D0" roughness={0.4} />
        </mesh>

        {/* 3.5" Floppy Disk Slot */}
        <mesh position={[0.16, 0.09, 0.396]}>
          <boxGeometry args={[0.26, 0.035, 0.01]} />
          <meshBasicMaterial color="#1A1A1A" />
        </mesh>

        {/* Floppy Drive Eject Button */}
        <mesh position={[0.31, 0.09, 0.398]}>
          <boxGeometry args={[0.035, 0.035, 0.015]} />
          <meshStandardMaterial color="#C8C4B8" />
        </mesh>

        {/* Status / Activity LED (Pulses Green #5DD62C) */}
        <mesh ref={ledRef} position={[0.01, 0.09, 0.398]}>
          <boxGeometry args={[0.025, 0.025, 0.015]} />
          <meshBasicMaterial color="#5DD62C" />
        </mesh>

        {/* Side Cooling Vents (3 slots) */}
        {[-0.04, 0, 0.04].map((yOffset, i) => (
          <mesh key={i} position={[-0.385, 0.08 + yOffset, 0]}>
            <boxGeometry args={[0.01, 0.018, 0.32]} />
            <meshBasicMaterial color="#222222" />
          </mesh>
        ))}

        {/* Swivel Neck Mount between base and monitor */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.06, 16]} />
          <meshStandardMaterial color="#D0CCC2" roughness={0.5} />
        </mesh>
      </group>

      {/* ========================================================== */}
      {/* 2. CRT MONITOR HEAD (Rounded Retro Computer)              */}
      {/* ========================================================== */}
      <group ref={monitorRef} position={[0, 0.28, 0]}>
        {/* CRT Outer Plastic Enclosure */}
        <mesh position={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[0.68, 0.54, 0.58]} />
          <meshStandardMaterial color="#F0EFEA" roughness={0.35} metalness={0.05} />
        </mesh>

        {/* Back CRT Neck Taper */}
        <mesh position={[0, 0.28, -0.26]} castShadow>
          <boxGeometry args={[0.52, 0.42, 0.16]} />
          <meshStandardMaterial color="#E4E1D7" roughness={0.4} />
        </mesh>

        {/* Front Bezel Frame */}
        <mesh position={[0, 0.28, 0.285]}>
          <boxGeometry args={[0.62, 0.48, 0.03]} />
          <meshStandardMaterial color="#DDD9D0" roughness={0.3} />
        </mesh>

        {/* Curved Glass CRT Screen */}
        <mesh position={[0, 0.28, 0.298]}>
          <boxGeometry args={[0.52, 0.38, 0.02]} />
          <meshStandardMaterial color="#121212" roughness={0.15} metalness={0.2} />
        </mesh>

        {/* CRT Screen Glow Aura */}
        <pointLight position={[0, 0.28, 0.38]} intensity={hovered ? 0.8 : 0.45} color="#5DD62C" distance={1.2} />

        {/* ======================================================== */}
        {/* GLOWING GREEN SLIT EYES (// in #5DD62C)                   */}
        {/* ======================================================== */}
        <group position={[0, 0.28, 0.312]}>
          {/* Left Eye Slit */}
          <mesh ref={eyeLeftRef} position={[-0.09, 0, 0]}>
            <capsuleGeometry args={[0.026, 0.11, 8, 12]} />
            <meshBasicMaterial color="#5DD62C" />
          </mesh>

          {/* Right Eye Slit */}
          <mesh ref={eyeRightRef} position={[0.09, 0, 0]}>
            <capsuleGeometry args={[0.026, 0.11, 8, 12]} />
            <meshBasicMaterial color="#5DD62C" />
          </mesh>
        </group>
      </group>

      {/* ========================================================== */}
      {/* 3. MINI POTTED PLANT COMPANION (Beside Computer)           */}
      {/* ========================================================== */}
      <group position={[0.54, 0, 0.12]}>
        {/* Ceramic White Pot */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.07, 0.16, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
        </mesh>

        {/* Pot Soil */}
        <mesh position={[0, 0.155, 0]}>
          <cylinderGeometry args={[0.082, 0.082, 0.02, 16]} />
          <meshStandardMaterial color="#2B1D14" roughness={0.9} />
        </mesh>

        {/* Sprouting Green Leaves */}
        <group ref={plantLeavesRef} position={[0, 0.16, 0]}>
          {/* Leaf 1 */}
          <mesh position={[-0.03, 0.05, 0]} rotation={[0.2, 0.3, -0.4]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#5DD62C" roughness={0.3} />
          </mesh>
          {/* Leaf 2 */}
          <mesh position={[0.03, 0.06, 0.02]} rotation={[-0.1, -0.4, 0.35]} castShadow>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#4CAF50" roughness={0.3} />
          </mesh>
          {/* Leaf 3 */}
          <mesh position={[0, 0.08, -0.02]} rotation={[-0.3, 0.2, 0.1]} castShadow>
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshStandardMaterial color="#66BB6A" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* ========================================================== */}
      {/* 4. RETRO CLICKY MOUSE (In front of computer)               */}
      {/* ========================================================== */}
      <group position={[0.32, 0.02, 0.52]} rotation={[0, -0.2, 0]}>
        {/* Mouse Body */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.09, 0.035, 0.14]} />
          <meshStandardMaterial color="#EAE8E3" roughness={0.4} />
        </mesh>
        {/* Mouse Button Seam */}
        <mesh position={[0, 0.036, 0.03]}>
          <boxGeometry args={[0.005, 0.005, 0.07]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
      </group>
    </group>
  );
};
