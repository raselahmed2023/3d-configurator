"use client";

type ConfiguratorPanelProps = {
  color: string;
  setColor: (value: string) => void;

  wireframe: boolean;
  setWireframe: (value: boolean) => void;

  metalness: number;
  setMetalness: (value: number) => void;

  roughness: number;
  setRoughness: (value: number) => void;

  autoRotate: boolean;
  setAutoRotate: (value: boolean) => void;

  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
};

const COLORS = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#7c3aed",
  "#111827",
  "#f59e0b",
];

export default function ConfiguratorPanel({
  color,
  setColor,
  wireframe,
  setWireframe,
  metalness,
  setMetalness,
  roughness,
  setRoughness,
  autoRotate,
  setAutoRotate,
  reducedMotion,
  setReducedMotion,
}: ConfiguratorPanelProps) {
  return (
    <aside className="config-panel">
      <div>
        <p className="panel-eyebrow">Configurator</p>
        <h2>Customize the product</h2>
        <p className="panel-copy">
          Rotate with drag, zoom with the mouse wheel or pinch, and change the
          product material in real time.
        </p>
      </div>

      <section className="control-group">
        <h3>Color</h3>

        <div className="color-options" aria-label="Product color">
          {COLORS.map((item) => (
            <button
              key={item}
              type="button"
              aria-label={`Choose ${item} color`}
              aria-pressed={color === item}
              className={color === item ? "color-swatch active" : "color-swatch"}
              style={{ backgroundColor: item }}
              onClick={() => setColor(item)}
            />
          ))}
        </div>
      </section>

      <section className="control-group">
        <label htmlFor="metalness">
          <span>Metalness</span>
          <strong>{metalness.toFixed(2)}</strong>
        </label>

        <input
          id="metalness"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={metalness}
          onChange={(event) => setMetalness(Number(event.target.value))}
        />
      </section>

      <section className="control-group">
        <label htmlFor="roughness">
          <span>Roughness</span>
          <strong>{roughness.toFixed(2)}</strong>
        </label>

        <input
          id="roughness"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={roughness}
          onChange={(event) => setRoughness(Number(event.target.value))}
        />
      </section>

      <section className="toggle-list">
        <label className="toggle-row">
          <span>
            <strong>Wireframe</strong>
            <small>Inspect the geometry</small>
          </span>

          <input
            type="checkbox"
            checked={wireframe}
            onChange={(event) => setWireframe(event.target.checked)}
          />
        </label>

        <label className="toggle-row">
          <span>
            <strong>Auto rotate</strong>
            <small>Continuous product rotation</small>
          </span>

          <input
            type="checkbox"
            checked={autoRotate}
            disabled={reducedMotion}
            onChange={(event) => setAutoRotate(event.target.checked)}
          />
        </label>

        <label className="toggle-row">
          <span>
            <strong>Static fallback</strong>
            <small>Simulate reduced-motion mode</small>
          </span>

          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(event) => setReducedMotion(event.target.checked)}
          />
        </label>
      </section>
    </aside>
  );
}