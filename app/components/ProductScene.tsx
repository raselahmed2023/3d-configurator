"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";

import ProductModel from "./ProductModel";

type ProductSceneProps = {
  color: string;
  wireframe: boolean;
  metalness: number;
  roughness: number;
  autoRotate: boolean;
  reducedMotion: boolean;
};

export default function ProductScene({
  color,
  wireframe,
  metalness,
  roughness,
  autoRotate,
  reducedMotion,
}: ProductSceneProps) {
  if (reducedMotion) {
    return (
      <div className="static-fallback" role="img" aria-label="3D product preview fallback">
        <div className="static-product">
          <div className="static-product-lens" />
        </div>

        <p>
          Reduced-motion mode is active. Interactive 3D animation is paused.
        </p>
      </div>
    );
  }

  return (
    <div className="canvas-shell">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [4.2, 2.5, 5.2],
          fov: 42,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#f8fafc"]} />

        <ambientLight intensity={0.9} />

        <directionalLight
          position={[4, 6, 4]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <pointLight
          position={[-4, 2, 2]}
          intensity={1.2}
          color="#bfdbfe"
        />

        <Suspense fallback={null}>
          <Float
            speed={1.1}
            rotationIntensity={0.15}
            floatIntensity={0.3}
          >
            <ProductModel
              color={color}
              wireframe={wireframe}
              metalness={metalness}
              roughness={roughness}
              autoRotate={autoRotate}
            />
          </Float>

          <Environment preset="city" />
        </Suspense>

        <ContactShadows
          position={[0, -0.72, 0]}
          opacity={0.28}
          scale={7}
          blur={2.8}
          far={4}
        />

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={3.5}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}