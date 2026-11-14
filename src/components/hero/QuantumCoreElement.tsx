"use client";

import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface QuantumCoreElementProps {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

/**
 * QuantumCoreElement
 * A premium, architectural 3D floating Silicon Neural Core / Quantum Processor:
 * - Pairs symmetrically with the Retro CRT Computer (Foundations -> Future Systems).
 * - Obsidian & dark ceramic carrier substrate with metallic gold pins.
 * - Center reflective silicon die etched with glowing emerald bus traces.
 * - Floating holographic orbital ring and rotating crystalline data node.
 * - Micro-interactions:
 *   - Alive idle: floats smoothly with pointer tilt.
 *   - Hover: bus traces intensify with emerald phosphor glow.
 *   - Click/Tap: kinetic data pulse wave with audio feedback.
 */
export const QuantumCoreElement: React.FC<QuantumCoreElementProps> = ({
  position,
  scale = 1,
  rotation = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const chipRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreDieRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const pulseTimer = useRef(0);
  const currentScale = useRef(scale);

  // Materials
  const materials = useMemo(() => {
    return {
      substrate: new THREE.MeshStandardMaterial({
        color: 0x141a15,
        roughness: 0.35,
        metalness: 0.7,
      }),
      siliconDie: new THREE.MeshStandardMaterial({
        color: 0x0a100c,
        roughness: 0.15,
        metalness: 0.9,
        emissive: new THREE.Color(0x5dd62c),
        emissiveIntensity: 0.3,
      }),
      goldPins: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.2,
        metalness: 0.95,
      }),
      emeraldTraces: new THREE.MeshStandardMaterial({
        color: 0x5dd62c,
        emissive: new THREE.Color(0x5dd62c),
        emissiveIntensity: 1.8,
        roughness: 0.1,
      }),
      hologramRing: new THREE.MeshStandardMaterial({
        color: 0x5dd62c,
        emissive: new THREE.Color(0x5dd62c),
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.45,
        wireframe: true,
      }),
    };
  }, []);

  const handleClick = (e: any) => {
    e.stopPropagation();
    pulseTimer.current = 1.4;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // Pulse countdown on click
    if (pulseTimer.current > 0) {
      pulseTimer.current -= delta;
    }
    const isPulsing = pulseTimer.current > 0;

    // Scale spring
    const targetScale = (hovered ? 1.15 : isPulsing ? 1.22 : 1.0) * scale;
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 6.0, delta);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }

    // Chip floating and cursor tracking
    if (chipRef.current) {
      const floatY = Math.sin(time * 1.8) * 0.04;
      chipRef.current.position.y = floatY;

      const targetRotY = pointer.x * 0.45 + (hovered ? 0.2 : 0);
      const targetRotX = -pointer.y * 0.3 + 0.15;
      chipRef.current.rotation.y = THREE.MathUtils.damp(chipRef.current.rotation.y, targetRotY, 5.0, delta);
      chipRef.current.rotation.x = THREE.MathUtils.damp(chipRef.current.rotation.x, targetRotX, 5.0, delta);
      chipRef.current.rotation.z = Math.sin(time * 0.8) * 0.05;
    }

    // Hologram ring orbital spin
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.8;
      ringRef.current.rotation.y = time * 1.2;
    }

    // Core silicon die emissive glow pulse
    if (coreDieRef.current) {
      const basePulse = Math.sin(time * 3.0) * 0.3 + 0.5;
      const boost = isPulsing ? 2.5 : hovered ? 1.4 : 1.0;
      materials.siliconDie.emissiveIntensity = basePulse * boost;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "auto";
        }
      }}
    >
      <group ref={chipRef}>
        {/* Main Ceramic Substrate Carrier (Chamfered Slab) */}
        <mesh material={materials.substrate} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.1, 1.05]} />
        </mesh>

        {/* Central Raised Silicon Die */}
        <mesh
          ref={coreDieRef}
          position={[0, 0.07, 0]}
          material={materials.siliconDie}
          castShadow
        >
          <boxGeometry args={[0.55, 0.05, 0.55]} />
        </mesh>

        {/* Emerald Circuit Bus Core (Center Light Matrix) */}
        <mesh position={[0, 0.1, 0]} material={materials.emeraldTraces}>
          <boxGeometry args={[0.22, 0.02, 0.22]} />
        </mesh>

        {/* Gold Corner Heat Spreader Brackets */}
        {[
          [-0.42, 0.06, -0.42],
          [0.42, 0.06, -0.42],
          [-0.42, 0.06, 0.42],
          [0.42, 0.06, 0.42],
        ].map(([bx, by, bz], i) => (
          <mesh
            key={`bracket-${i}`}
            position={[bx, by, bz]}
            material={materials.goldPins}
          >
            <boxGeometry args={[0.12, 0.04, 0.12]} />
          </mesh>
        ))}

        {/* Gold Edge Interconnect Pins */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((offset, i) => (
          <React.Fragment key={`pins-${i}`}>
            {/* North Edge */}
            <mesh position={[offset, 0, -0.56]} material={materials.goldPins}>
              <boxGeometry args={[0.04, 0.03, 0.08]} />
            </mesh>
            {/* South Edge */}
            <mesh position={[offset, 0, 0.56]} material={materials.goldPins}>
              <boxGeometry args={[0.04, 0.03, 0.08]} />
            </mesh>
            {/* West Edge */}
            <mesh position={[-0.56, 0, offset]} material={materials.goldPins}>
              <boxGeometry args={[0.08, 0.03, 0.04]} />
            </mesh>
            {/* East Edge */}
            <mesh position={[0.56, 0, offset]} material={materials.goldPins}>
              <boxGeometry args={[0.08, 0.03, 0.04]} />
            </mesh>
          </React.Fragment>
        ))}

        {/* Holographic Wireframe Data Gyro-Ring */}
        <mesh ref={ringRef} material={materials.hologramRing} position={[0, 0, 0]}>
          <torusGeometry args={[0.85, 0.015, 8, 36]} />
        </mesh>
      </group>
    </group>
  );
};
