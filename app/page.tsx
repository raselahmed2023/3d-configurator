"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import ConfiguratorPanel from "./components/ConfiguratorPanel";

const ProductScene = dynamic(
  () => import("./components/ProductScene"),
  {
    ssr: false,
    loading: () => (
      <div className="scene-loading" role="status">
        Loading 3D experience...
      </div>
    ),
  }
);

export default function Home() {
  const [color, setColor] = useState("#2563eb");
  const [wireframe, setWireframe] = useState(false);
  const [metalness, setMetalness] = useState(0.45);
  const [roughness, setRoughness] = useState(0.35);
  const [autoRotate, setAutoRotate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setReducedMotion(mediaQuery.matches);

      if (mediaQuery.matches) {
        setAutoRotate(false);
      }
    };

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <main className="page-shell">
      <header className="hero">
        <div>
          <p className="hero-eyebrow">FE-AA2 · Interactive 3D</p>

          <h1>3D Product Configurator</h1>

          <p className="hero-copy">
            Explore a lightweight browser-based 3D product, rotate it, zoom in,
            and customize its material in real time.
          </p>
        </div>

        <div className="hero-badge">
          <span className="hero-badge-dot" />
          WebGL experience
        </div>
      </header>

      <section className="experience-grid">
        <div className="scene-card">
          <ProductScene
            color={color}
            wireframe={wireframe}
            metalness={metalness}
            roughness={roughness}
            autoRotate={autoRotate}
            reducedMotion={reducedMotion}
          />

          {!reducedMotion && (
            <div className="scene-help">
              <span>Drag to rotate</span>
              <span>Scroll / pinch to zoom</span>
            </div>
          )}
        </div>

        <ConfiguratorPanel
          color={color}
          setColor={setColor}
          wireframe={wireframe}
          setWireframe={setWireframe}
          metalness={metalness}
          setMetalness={setMetalness}
          roughness={roughness}
          setRoughness={setRoughness}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          reducedMotion={reducedMotion}
          setReducedMotion={setReducedMotion}
        />
      </section>

      <section className="performance-note">
        <div>
          <p className="panel-eyebrow">Performance strategy</p>
          <h2>Built to stay lightweight</h2>
        </div>

        <p>
          The demo uses procedural geometry instead of a large external model,
          keeps device pixel ratio capped, lazy-loads the Three.js canvas and
          provides a static fallback for reduced-motion contexts. The scene
          avoids physics and expensive post-processing to remain usable on
          mobile devices.
        </p>
      </section>
    </main>
  );
}