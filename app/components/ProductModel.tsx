"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

type ProductModelProps = {
  color: string;
  wireframe: boolean;
  metalness: number;
  roughness: number;
  autoRotate: boolean;
};

export default function ProductModel({
  color,
  wireframe,
  metalness,
  roughness,
  autoRotate,
}: ProductModelProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.08, -0.5, 0]}>
      {/* Main body */}
      <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[2.4, 1.25, 1.1]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          wireframe={wireframe}
        />
      </mesh>

      {/* Top panel */}
      <mesh castShadow position={[0, 0.85, 0]}>
        <boxGeometry args={[1.7, 0.18, 0.78]} />
        <meshStandardMaterial
          color={color}
          metalness={Math.min(1, metalness + 0.15)}
          roughness={roughness}
          wireframe={wireframe}
        />
      </mesh>

      {/* Front lens / detail */}
      <mesh castShadow position={[0, 0.2, 0.58]}>
        <cylinderGeometry args={[0.34, 0.34, 0.18, 48]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.6}
          roughness={0.22}
        />
      </mesh>

      <mesh position={[0, 0.2, 0.7]}>
        <circleGeometry args={[0.22, 48]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#1d4ed8"
          emissiveIntensity={0.35}
          roughness={0.15}
        />
      </mesh>

      {/* Side controls */}
      <mesh castShadow position={[1.25, 0.38, 0]}>
        <boxGeometry args={[0.15, 0.3, 0.4]} />
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Feet */}
      {[
        [-0.75, -0.55, -0.3],
        [0.75, -0.55, -0.3],
        [-0.75, -0.55, 0.3],
        [0.75, -0.55, 0.3],
      ].map((position, index) => (
        <mesh
          key={index}
          castShadow
          position={position as [number, number, number]}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.13, 20]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      ))}
    </group>
  );
}