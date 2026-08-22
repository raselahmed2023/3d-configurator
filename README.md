# FE-AA2 — 3D Product Configurator

## What I built

A lightweight interactive 3D product configurator built with Next.js, Three.js, React Three Fiber, and Drei.

Users can:
- Rotate the product
- Zoom with mouse wheel or touch pinch
- Change product color
- Adjust metalness
- Adjust roughness
- Toggle wireframe mode
- Enable or disable auto rotation
- Switch to a static fallback mode

## Performance notes

The experience uses procedural geometry instead of a large external GLB model, which keeps asset size small.

The 3D canvas is lazy-loaded and the device pixel ratio is capped to reduce GPU load. The scene avoids physics and heavy post-processing.

A static fallback is provided for reduced-motion contexts, and the responsive layout supports touch interaction on mobile devices.

## If I had more time

I would add:
- A compressed GLB product model
- Multiple product parts and material presets
- Environment switching
- Screenshot/export functionality
- More detailed mobile performance measurements