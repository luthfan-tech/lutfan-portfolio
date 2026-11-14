"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { generateWordVoxels, calculateWordWidth, Voxel } from "./PixelFont";

export interface VoxelTypographyProps {
  position?: [number, number, number];
  scale?: number;
}

interface VoxelPhysicsData {
  origX: number;
  origY: number;
  origZ: number;
  dirX: number;
  dirY: number;
  dirZ: number;
  dist: number;
  rotX: number;
  rotY: number;
  rotZ: number;
}

export const VoxelTypography: React.FC<VoxelTypographyProps> = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const [hovered, setHovered] = useState(false);

  // Micro-interaction physics tracking
  const currentScale = useRef<number>(scale);
  const currentZ = useRef<number>(position[2]);
  const currentRotZ = useRef<number>(0);
  const currentEmissive = useRef<number>(0);

  // Voxel Dispersion Physics State (Scatter & Snap Back)
  const dispersePower = useRef<number>(0);
  const isDispersing = useRef<boolean>(false);

  // Calibrated scale: thick, dense, monumental without screen crowding
  const voxelSize = 0.115;
  const depth = 3;
  const letterSpacing = voxelSize * 1.3;

  // Generate solid, dense voxels across "LUTFAN MOHAMMED ASIF"
  const allVoxels: Voxel[] = useMemo(() => {
    const widthLutfan = calculateWordWidth("LUTFAN", voxelSize, letterSpacing);
    const widthMohammed = calculateWordWidth("MOHAMMED", voxelSize, letterSpacing);
    const widthAsif = calculateWordWidth("ASIF", voxelSize, letterSpacing);

    // Line 1: "LUTFAN" (Centered at x = 0, top tier)
    const line1 = generateWordVoxels(
      "LUTFAN",
      -widthLutfan / 2,
      0.82,
      0.15,
      voxelSize,
      depth
    );

    // Line 2: "MOHAMMED" (Centered at x = 0, middle tier)
    const line2 = generateWordVoxels(
      "MOHAMMED",
      -widthMohammed / 2,
      -0.42,
      0.08,
      voxelSize,
      depth
    );

    // Line 3: "ASIF" (Centered at x = 0, bottom tier)
    const line3 = generateWordVoxels(
      "ASIF",
      -widthAsif / 2,
      -1.66,
      0.0,
      voxelSize,
      depth
    );

    return [...line1, ...line2, ...line3];
  }, [voxelSize, depth, letterSpacing]);

  // Pre-calculate per-voxel scatter vectors & tumbling rotational velocities
  const physicsData: VoxelPhysicsData[] = useMemo(() => {
    return allVoxels.map((v) => {
      // Calculate outward direction vector from word centers
      const dx = v.x + (Math.random() - 0.5) * 0.4;
      const dy = v.y + (Math.random() - 0.5) * 0.4;
      const dz = v.z + (Math.random() - 0.5) * 0.6 + 0.3; // outward bias

      const length = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      const dirX = dx / length;
      const dirY = dy / length;
      const dirZ = dz / length;

      // Random dispersion distance between 1.2 and 2.5 units
      const dist = 1.2 + Math.random() * 1.4;

      // Random tumbling rotational speeds
      const rotX = (Math.random() - 0.5) * 6;
      const rotY = (Math.random() - 0.5) * 6;
      const rotZ = (Math.random() - 0.5) * 6;

      return {
        origX: v.x,
        origY: v.y,
        origZ: v.z,
        dirX,
        dirY,
        dirZ,
        dist,
        rotX,
        rotY,
        rotZ,
      };
    });
  }, [allVoxels]);

  // Rounded voxel geometry for continuous solid contact with specular edge catch
  const geometry = useMemo(() => {
    return new RoundedBoxGeometry(
      voxelSize,
      voxelSize,
      voxelSize,
      2,
      0.012
    );
  }, [voxelSize]);

  // Initialize and populate InstancedMesh base matrices and colors
  useEffect(() => {
    const mesh = instancedMeshRef.current;
    if (!mesh) return;

    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < allVoxels.length; i++) {
      const v = allVoxels[i];
      dummy.position.set(v.x, v.y, v.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1.0, 1.0, 1.0);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);

      color.set(v.color);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [allVoxels]);

  // Interactive Click / Tap: Trigger Momentary Dispersion and Magnetic Snap Back
  const handleClick = (e: any) => {
    e.stopPropagation();

    // Trigger explosive dispersion
    dispersePower.current = 1.0;
    isDispersing.current = true;

    // Audio & tactile feedback
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("foley-click"));
      // Optional sound notification
      window.dispatchEvent(new CustomEvent("voxel-disperse"));
    }
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // 1. Dispersion Spring Physics
    if (isDispersing.current) {
      // Exponential magnetic decay pulling cubes back toward origin
      dispersePower.current = THREE.MathUtils.damp(
        dispersePower.current,
        0,
        3.8, // Snappy magnetic recovery speed
        delta
      );

      const mesh = instancedMeshRef.current;
      if (mesh) {
        const dummy = new THREE.Object3D();
        const p = dispersePower.current;

        for (let i = 0; i < physicsData.length; i++) {
          const pd = physicsData[i];

          // Compute dispersed position
          const posX = pd.origX + pd.dirX * pd.dist * p;
          const posY = pd.origY + pd.dirY * pd.dist * p;
          const posZ = pd.origZ + pd.dirZ * pd.dist * p;

          dummy.position.set(posX, posY, posZ);

          // Tumbling rotation while in flight
          dummy.rotation.set(
            pd.rotX * p * Math.PI,
            pd.rotY * p * Math.PI,
            pd.rotZ * p * Math.PI
          );

          // Subtle cube breathing scale during dispersion
          const scaleMod = 1.0 - p * 0.15;
          dummy.scale.set(scaleMod, scaleMod, scaleMod);

          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
      }

      // Check if settled completely back into rest
      if (dispersePower.current < 0.002) {
        dispersePower.current = 0;
        isDispersing.current = false;

        // Reset all exact rest matrices once
        if (mesh) {
          const dummy = new THREE.Object3D();
          for (let i = 0; i < physicsData.length; i++) {
            const pd = physicsData[i];
            dummy.position.set(pd.origX, pd.origY, pd.origZ);
            dummy.rotation.set(0, 0, 0);
            dummy.scale.set(1.0, 1.0, 1.0);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
          }
          mesh.instanceMatrix.needsUpdate = true;
        }
      }
    }

    // 2. Centerpiece Group Floating & Hover Reactions
    const targetScale = scale * (hovered ? 1.025 : 1.0);
    const targetZ = position[2] + (hovered ? 0.08 : 0);

    currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 6.0, delta);
    currentZ.current = THREE.MathUtils.damp(currentZ.current, targetZ, 6.0, delta);

    groupRef.current.scale.setScalar(currentScale.current);
    groupRef.current.position.z = currentZ.current;

    // 3. Emissive highlight on material
    const targetEmissive = (hovered ? 0.16 : 0.0) + dispersePower.current * 0.45;
    currentEmissive.current = THREE.MathUtils.damp(currentEmissive.current, targetEmissive, 6.0, delta);
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = currentEmissive.current;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
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
      <instancedMesh
        ref={instancedMeshRef}
        args={[geometry, undefined, allVoxels.length]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={materialRef}
          color="#5DD62C"
          emissive="#5DD62C"
          emissiveIntensity={0}
          roughness={0.24}
          metalness={0.16}
        />
      </instancedMesh>
    </group>
  );
};
