"use client";

import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/**
 * 1. TACTILE MECHANICAL KEYCAP & TRANSPARENT SWITCH
 * Inspired by reference: Mechanical keyboard keycaps with transparent switch & glowing stem.
 * - Keycap A: Clear acrylic mechanical switch with bright emerald '+' cross stem (#5DD62C)
 * - Keycap B: Matte off-white PBT keycap with tactile embossed asterisk '*'
 * - Positioned at varied z-depths (foreground bokeh & midground) for deep optical immersion.
 */
export const MechanicalKeycapElement: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  variant?: "switch" | "asterisk" | "action";
}> = ({ position, scale = 1, rotation = [0.2, -0.3, 0.1], variant = "switch" }) => {
  const groupRef = useRef<THREE.Group>(null);
  const stemRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const clickBounce = useRef(0);
  const currentScale = useRef(scale);

  const handleClick = (e: any) => {
    e.stopPropagation();
    clickBounce.current = 0.35; // Tactile key switch press
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    if (clickBounce.current > 0) {
      clickBounce.current -= delta;
    }

    const isPressed = clickBounce.current > 0;
    const targetScale = (hovered ? 1.12 : isPressed ? 0.92 : 1.0) * scale;
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 6.0, delta);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);

      // Organic sine wave floating with subtle cursor banking
      groupRef.current.position.y =
        position[1] + Math.sin(time * 1.4 + position[0]) * 0.08 + pointer.y * 0.04;
      groupRef.current.position.x =
        position[0] + Math.cos(time * 0.9 + position[1]) * 0.04 + pointer.x * 0.04;

      groupRef.current.rotation.y = rotation[1] + Math.sin(time * 0.8) * 0.08 + pointer.x * 0.15;
      groupRef.current.rotation.x = rotation[0] + Math.cos(time * 0.7) * 0.06 - pointer.y * 0.12;
    }

    if (stemRef.current) {
      const stemY = isPressed ? -0.06 : 0;
      stemRef.current.position.y = THREE.MathUtils.damp(stemRef.current.position.y, stemY, 15.0, delta);
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
      {variant === "switch" ? (
        /* Transparent Mechanical Switch with Emerald Cross Stem */
        <group>
          {/* Black Switch Base Housing */}
          <mesh position={[0, -0.15, 0]} castShadow>
            <boxGeometry args={[0.55, 0.22, 0.55]} />
            <meshStandardMaterial color="#111612" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Transparent Polycarbonate Top Housing */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.52, 0.24, 0.52]} />
            <meshPhysicalMaterial
              color="#F0FDF4"
              transmission={0.85}
              opacity={1}
              transparent
              roughness={0.12}
              ior={1.48}
              thickness={0.4}
              metalness={0.05}
            />
          </mesh>

          {/* Spring & Internal Metal Contacts */}
          <mesh position={[0, -0.02, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.22, 12]} />
            <meshStandardMaterial color="#D1D5DB" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Moving Emerald Green Switch Stem (+) */}
          <group ref={stemRef} position={[0, 0.12, 0]}>
            {/* Horizontal Stem Bar */}
            <mesh>
              <boxGeometry args={[0.22, 0.14, 0.07]} />
              <meshStandardMaterial
                color="#5DD62C"
                emissive="#5DD62C"
                emissiveIntensity={hovered ? 0.85 : 0.45}
                roughness={0.25}
              />
            </mesh>
            {/* Vertical Stem Bar */}
            <mesh>
              <boxGeometry args={[0.07, 0.14, 0.22]} />
              <meshStandardMaterial
                color="#5DD62C"
                emissive="#5DD62C"
                emissiveIntensity={hovered ? 0.85 : 0.45}
                roughness={0.25}
              />
            </mesh>
          </group>

          {/* Subtle Glow from Stem */}
          <pointLight position={[0, 0.15, 0]} intensity={hovered ? 0.6 : 0.3} color="#5DD62C" distance={0.8} />
        </group>
      ) : variant === "asterisk" ? (
        /* Matte Off-White Sculpted PBT Keycap with Tactile Asterisk */
        <group>
          {/* Keycap Shell (Slightly tapered pyramid box) */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.34, 0.42, 0.28, 4]} />
            <meshStandardMaterial color="#EAE8E3" roughness={0.4} metalness={0.05} />
          </mesh>
          {/* Concave Dish Top */}
          <mesh position={[0, 0.142, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.22, 32]} />
            <meshStandardMaterial color="#DDD9D0" roughness={0.35} />
          </mesh>
          {/* Tactile Asterisk Glyph Center */}
          <mesh position={[0, 0.146, 0]}>
            <boxGeometry args={[0.14, 0.01, 0.035]} />
            <meshBasicMaterial color="#1A2E1C" />
          </mesh>
          <mesh position={[0, 0.146, 0]} rotation={[0, Math.PI / 3, 0]}>
            <boxGeometry args={[0.14, 0.01, 0.035]} />
            <meshBasicMaterial color="#1A2E1C" />
          </mesh>
          <mesh position={[0, 0.146, 0]} rotation={[0, -Math.PI / 3, 0]}>
            <boxGeometry args={[0.14, 0.01, 0.035]} />
            <meshBasicMaterial color="#1A2E1C" />
          </mesh>
        </group>
      ) : (
        /* Obsidian Keycap with Emerald Accent */
        <group>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.34, 0.42, 0.28, 4]} />
            <meshStandardMaterial color="#141E15" roughness={0.35} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0.142, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.22, 32]} />
            <meshStandardMaterial color="#0A120A" roughness={0.3} />
          </mesh>
          {/* Emerald Action Arrow */}
          <mesh position={[0, 0.146, 0]}>
            <boxGeometry args={[0.14, 0.01, 0.035]} />
            <meshBasicMaterial color="#5DD62C" />
          </mesh>
          <mesh position={[0.05, 0.146, 0.03]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.07, 0.01, 0.035]} />
            <meshBasicMaterial color="#5DD62C" />
          </mesh>
          <mesh position={[0.05, 0.146, -0.03]} rotation={[0, -Math.PI / 4, 0]}>
            <boxGeometry args={[0.07, 0.01, 0.035]} />
            <meshBasicMaterial color="#5DD62C" />
          </mesh>
        </group>
      )}
    </group>
  );
};

/**
 * 2. DEVELOPER BREADBOARD & MICROCONTROLLER LAB
 * Inspired by reference: Mini developer breadboard with microcontroller, jumper wires, and glowing status LED.
 * - Solderless breadboard with tie-point rows & power rails
 * - Microcontroller DIP/QFP module with IC chip
 * - Arched jumper wires (green & emerald)
 * - Pulsing 5mm LED (#5DD62C)
 */
export const DeveloperBreadboardElement: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}> = ({ position, scale = 1, rotation = [0.3, -0.4, 0.15] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ledLightRef = useRef<THREE.PointLight>(null);
  const ledMeshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const clickStrobe = useRef(0);
  const currentScale = useRef(scale);

  // Procedural curved jumper wire tube geometries
  const wireGeometry1 = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.16, 0.06, 0.08),
      new THREE.Vector3(-0.16, 0.38, 0.12),
      new THREE.Vector3(0.08, 0.42, -0.08),
      new THREE.Vector3(0.08, 0.06, -0.08)
    );
    return new THREE.TubeGeometry(curve, 24, 0.014, 8, false);
  }, []);

  const wireGeometry2 = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.06, 0.06, 0.14),
      new THREE.Vector3(-0.04, 0.34, 0.22),
      new THREE.Vector3(0.18, 0.32, 0.06),
      new THREE.Vector3(0.18, 0.06, 0.06)
    );
    return new THREE.TubeGeometry(curve, 24, 0.014, 8, false);
  }, []);

  const handleClick = (e: any) => {
    e.stopPropagation();
    clickStrobe.current = 1.2; // Rapid Morse LED strobe
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    if (clickStrobe.current > 0) {
      clickStrobe.current -= delta;
    }

    const isStrobing = clickStrobe.current > 0;
    const targetScale = (hovered ? 1.14 : isStrobing ? 1.18 : 1.0) * scale;
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 6.0, delta);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);

      // Smooth floating kinetics
      groupRef.current.position.y =
        position[1] + Math.sin(time * 1.2 + 2.0) * 0.07 + pointer.y * 0.05;
      groupRef.current.position.x =
        position[0] + Math.cos(time * 0.85 + 1.5) * 0.05 + pointer.x * 0.04;

      groupRef.current.rotation.y = rotation[1] + Math.sin(time * 0.6) * 0.07 + pointer.x * 0.12;
      groupRef.current.rotation.x = rotation[0] + Math.cos(time * 0.5) * 0.05 - pointer.y * 0.1;
    }

    // LED Heartbeat & Morse Code Strobe
    if (ledMeshRef.current && ledLightRef.current) {
      let intensity = (Math.sin(time * 3.5) * 0.5 + 0.5) * 0.8 + 0.3;
      if (isStrobing) {
        intensity = Math.sin(time * 28) > 0 ? 2.5 : 0.2;
      } else if (hovered) {
        intensity = 1.8;
      }
      ledLightRef.current.intensity = intensity;
      const mat = ledMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = intensity * 1.5;
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
      {/* 1. Solderless Breadboard Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.12, 0.56]} />
        <meshStandardMaterial color="#EAE8E3" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Red & Blue Power Rail Strip Lines */}
      <mesh position={[0, 0.061, -0.24]}>
        <boxGeometry args={[0.76, 0.002, 0.015]} />
        <meshBasicMaterial color="#EF4444" />
      </mesh>
      <mesh position={[0, 0.061, 0.24]}>
        <boxGeometry args={[0.76, 0.002, 0.015]} />
        <meshBasicMaterial color="#3B82F6" />
      </mesh>

      {/* Center Divider Trough */}
      <mesh position={[0, 0.061, 0]}>
        <boxGeometry args={[0.76, 0.005, 0.04]} />
        <meshBasicMaterial color="#C8C4B8" />
      </mesh>

      {/* 2. Microcontroller Breakout Module */}
      <group position={[-0.18, 0.09, -0.04]}>
        {/* Navy Teal PCB */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.34, 0.035, 0.26]} />
          <meshStandardMaterial color="#0E3244" roughness={0.3} metalness={0.3} />
        </mesh>
        {/* Black QFP Silicon IC */}
        <mesh position={[0, 0.024, 0]}>
          <boxGeometry args={[0.16, 0.02, 0.16]} />
          <meshStandardMaterial color="#111612" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* USB-C Connector Port */}
        <mesh position={[-0.14, 0.03, 0]}>
          <boxGeometry args={[0.07, 0.035, 0.1]} />
          <meshStandardMaterial color="#D1D5DB" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 3. Looping Arched Jumper Wires */}
      <mesh geometry={wireGeometry1} castShadow>
        <meshStandardMaterial color="#5DD62C" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh geometry={wireGeometry2} castShadow>
        <meshStandardMaterial color="#337418" roughness={0.35} metalness={0.1} />
      </mesh>

      {/* 4. Axial Resistor */}
      <group position={[0.04, 0.075, 0.11]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.022, 0.022, 0.09, 12]} />
          <meshStandardMaterial color="#D97706" roughness={0.4} />
        </mesh>
        {/* Resistor Color Bands */}
        <mesh position={[-0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.023, 0.023, 0.012, 12]} />
          <meshBasicMaterial color="#DC2626" />
        </mesh>
        <mesh position={[0.01, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.023, 0.023, 0.012, 12]} />
          <meshBasicMaterial color="#5DD62C" />
        </mesh>
      </group>

      {/* 5. 5mm Through-Hole LED (Vibrant Emerald Glow) */}
      <group position={[0.26, 0.06, -0.06]}>
        {/* Metal Anode/Cathode Leads */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.12, 8]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Dome LED Lens */}
        <mesh ref={ledMeshRef} position={[0, 0.16, 0]}>
          <capsuleGeometry args={[0.045, 0.06, 12, 16]} />
          <meshStandardMaterial
            color="#5DD62C"
            emissive="#5DD62C"
            emissiveIntensity={1.2}
            roughness={0.15}
          />
        </mesh>
        {/* Volumetric Point Light */}
        <pointLight ref={ledLightRef} position={[0, 0.2, 0]} color="#5DD62C" distance={1.2} intensity={0.9} />
      </group>
    </group>
  );
};

/**
 * 3. HIGH-PRECISION ARTICULATED ROBOTIC ARM
 * Inspired by reference: Industrial articulated robot arm with hydraulic joints & precision end-effector.
 * - Themed in portfolio palette: Dark obsidian carbon fiber, crisp white armor shields,
 *   metallic chrome piston rods, and glowing emerald servo rings (#5DD62C).
 * - Inverse kinetics / smooth cursor-aiming head tracking.
 */
export const ArticulatedRobotArmElement: React.FC<{
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}> = ({ position, scale = 1, rotation = [0.1, 0.5, 0] }) => {
  const rootRef = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const wristRef = useRef<THREE.Group>(null);
  const gripperLeftRef = useRef<THREE.Mesh>(null);
  const gripperRightRef = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const calibrateTimer = useRef(0);
  const currentScale = useRef(scale);

  const handleClick = (e: any) => {
    e.stopPropagation();
    calibrateTimer.current = 1.5; // Industrial calibration pinch
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
    }
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    if (calibrateTimer.current > 0) {
      calibrateTimer.current -= delta;
    }
    const isCalibrating = calibrateTimer.current > 0;

    const targetScale = (hovered ? 1.08 : isCalibrating ? 1.12 : 1.0) * scale;
    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 5.0, delta);

    if (rootRef.current) {
      rootRef.current.scale.setScalar(currentScale.current);
      rootRef.current.position.y =
        position[1] + Math.sin(time * 0.9 + 1.2) * 0.05;
      rootRef.current.position.x =
        position[0] + Math.cos(time * 0.75) * 0.04;
    }

    // Shoulder & Elbow Kinematics: Aim towards cursor
    if (shoulderRef.current && elbowRef.current && wristRef.current) {
      const targetShoulderRotY = pointer.x * 0.45;
      const targetShoulderRotX = -pointer.y * 0.35 + (hovered ? 0.2 : 0);
      shoulderRef.current.rotation.y = THREE.MathUtils.damp(
        shoulderRef.current.rotation.y,
        targetShoulderRotY,
        3.5,
        delta
      );
      shoulderRef.current.rotation.x = THREE.MathUtils.damp(
        shoulderRef.current.rotation.x,
        targetShoulderRotX,
        3.5,
        delta
      );

      // Elbow flex
      const targetElbowRotX = 0.4 + pointer.y * 0.25 + Math.sin(time * 1.5) * 0.05;
      elbowRef.current.rotation.x = THREE.MathUtils.damp(
        elbowRef.current.rotation.x,
        targetElbowRotX,
        4.0,
        delta
      );

      // Wrist swivel
      wristRef.current.rotation.z = THREE.MathUtils.damp(
        wristRef.current.rotation.z,
        pointer.x * 0.5 + Math.sin(time * 2.0) * 0.08,
        4.5,
        delta
      );
    }

    // Gripper Pinching Action
    if (gripperLeftRef.current && gripperRightRef.current) {
      const pinch = isCalibrating
        ? Math.sin(time * 16) * 0.04 - 0.03
        : hovered
        ? -0.02
        : 0;
      gripperLeftRef.current.position.x = -0.045 + pinch;
      gripperRightRef.current.position.x = 0.045 - pinch;
    }
  });

  return (
    <group
      ref={rootRef}
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
      {/* 1. Heavy Base Turret & Pedestal */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.42, 0.16, 24]} />
        <meshStandardMaterial color="#111612" roughness={0.35} metalness={0.8} />
      </mesh>
      {/* Emerald Swivel Indicator Ring */}
      <mesh position={[0, -0.31, 0]}>
        <torusGeometry args={[0.31, 0.015, 8, 32]} />
        <meshBasicMaterial color="#5DD62C" />
      </mesh>

      {/* 2. Shoulder Joint & Lower Arm */}
      <group ref={shoulderRef} position={[0, -0.28, 0]}>
        {/* Turret Swivel Ball */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <sphereGeometry args={[0.18, 20, 20]} />
          <meshStandardMaterial color="#F4F5F4" roughness={0.25} metalness={0.1} />
        </mesh>

        {/* Lower Arm Boom (White Titanium Shell) */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.18, 0.65, 0.18]} />
          <meshStandardMaterial color="#F4F5F4" roughness={0.25} metalness={0.15} />
        </mesh>
        {/* Hydraulic Piston Rod */}
        <mesh position={[0.11, 0.45, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.45, 12]} />
          <meshStandardMaterial color="#E5E7EB" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* 3. Elbow Articulation Joint */}
        <group ref={elbowRef} position={[0, 0.85, 0]}>
          {/* Elbow Joint Pivot Ring */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.22, 16]} />
            <meshStandardMaterial color="#111612" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.125, 0.012, 8, 24]} />
            <meshBasicMaterial color="#5DD62C" />
          </mesh>

          {/* Forearm (Obsidian Carbon Fiber Shell) */}
          <mesh position={[0, 0.4, 0.06]} rotation={[-0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.14, 0.6, 0.14]} />
            <meshStandardMaterial color="#141E15" roughness={0.3} metalness={0.6} />
          </mesh>

          {/* 4. Wrist & Two-Finger Industrial Gripper */}
          <group ref={wristRef} position={[0, 0.72, 0.15]}>
            {/* Wrist Rotary Hub */}
            <mesh>
              <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
              <meshStandardMaterial color="#F4F5F4" roughness={0.3} metalness={0.2} />
            </mesh>
            <pointLight position={[0, 0.1, 0]} color="#5DD62C" intensity={hovered ? 0.8 : 0.4} distance={0.8} />

            {/* Gripper Actuator Plate */}
            <mesh position={[0, 0.08, 0]}>
              <boxGeometry args={[0.16, 0.03, 0.06]} />
              <meshStandardMaterial color="#111612" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Left Finger Claw */}
            <mesh ref={gripperLeftRef} position={[-0.045, 0.16, 0]} castShadow>
              <boxGeometry args={[0.025, 0.14, 0.035]} />
              <meshStandardMaterial color="#5DD62C" roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Right Finger Claw */}
            <mesh ref={gripperRightRef} position={[0.045, 0.16, 0]} castShadow>
              <boxGeometry args={[0.025, 0.14, 0.035]} />
              <meshStandardMaterial color="#5DD62C" roughness={0.3} metalness={0.5} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
