// Regenerates public/brand/hero-poster.svg as a faithful static render of the WebGL
// scene in src/components/three/meridian-scene.tsx. Small screens, reduced-motion
// users and browsers without WebGL only ever see this file, so it must match.
//
//   node scripts/build-hero-poster.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "public", "brand", "hero-poster.svg");

// Mirrors the scene constants.
const SIZE = 1000;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RPX = 340; // sphere radius in px, ~62% of canvas height for the pair
const MERIDIANS = 24;
const LATITUDES = 5;
const POLE_LIMIT = (76 * Math.PI) / 180;
const PRIME_LIMIT = (88 * Math.PI) / 180;
const TILT = (23.4 * Math.PI) / 180;
const SEGMENTS = 72;

const COLOR = {
  sphere: "#fbfaf8",
  rim: "#cdcac5",
  ink: "#1c1712",
  accent: "#1f5390",
};

const cosT = Math.cos(TILT);
const sinT = Math.sin(TILT);

/** Rotate about x by TILT, then project orthographically. Returns null when back-facing. */
function project([x, y, z], { cull = true } = {}) {
  const y2 = y * cosT - z * sinT;
  const z2 = y * sinT + z * cosT;
  if (cull && z2 < 0) return null;
  return [CX + x * RPX, CY - y2 * RPX];
}

function sphericalToCartesian(lat, lon, radius = 1) {
  const cosLat = Math.cos(lat);
  return [radius * cosLat * Math.sin(lon), radius * Math.sin(lat), radius * cosLat * Math.cos(lon)];
}

/** Builds one or more path "d" strings, breaking wherever the curve goes behind the sphere. */
function polylinePaths(points3d) {
  const runs = [];
  let run = [];
  for (const p of points3d) {
    const projected = project(p);
    if (projected) {
      run.push(projected);
    } else if (run.length > 1) {
      runs.push(run);
      run = [];
    } else {
      run = [];
    }
  }
  if (run.length > 1) runs.push(run);
  return runs.map(
    (r) => `M ${r.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")}`,
  );
}

const parts = [];

// Sphere body.
parts.push(`<circle cx="${CX}" cy="${CY}" r="${RPX}" fill="${COLOR.sphere}"/>`);

// Longitude arcs.
const longitudes = [];
for (let i = 0; i < MERIDIANS; i += 1) {
  const lon = (i / MERIDIANS) * Math.PI * 2;
  const pts = Array.from({ length: SEGMENTS + 1 }, (_, s) =>
    sphericalToCartesian(-POLE_LIMIT + (s / SEGMENTS) * POLE_LIMIT * 2, lon, 1.002),
  );
  longitudes.push(...polylinePaths(pts));
}
parts.push(
  `<g fill="none" stroke="${COLOR.ink}" stroke-opacity="0.2" stroke-width="1.1">${longitudes
    .map((d) => `<path d="${d}"/>`)
    .join("")}</g>`,
);

// Latitude rings.
const latitudes = [];
for (let i = 0; i < LATITUDES; i += 1) {
  const lat = -POLE_LIMIT + ((i + 1) / (LATITUDES + 1)) * POLE_LIMIT * 2;
  const pts = Array.from({ length: SEGMENTS * 2 + 1 }, (_, s) =>
    sphericalToCartesian(lat, (s / (SEGMENTS * 2)) * Math.PI * 2, 1.002),
  );
  latitudes.push(...polylinePaths(pts));
}
parts.push(
  `<g fill="none" stroke="${COLOR.ink}" stroke-opacity="0.11" stroke-width="1.1">${latitudes
    .map((d) => `<path d="${d}"/>`)
    .join("")}</g>`,
);

// Agent nodes: the same twelve latitudes and golden-angle phases as the scene, frozen at t=0.
const nodes = [];
for (let i = 0; i < 12; i += 1) {
  const lat = ((-58 + i * 10.5) * Math.PI) / 180;
  const lon = (i * 2.39996) % (Math.PI * 2);
  const projected = project(sphericalToCartesian(lat, lon, 1.012));
  if (projected) nodes.push(projected);
}
parts.push(
  `<g fill="${COLOR.accent}">${nodes
    .map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.4"/>`)
    .join("")}</g>`,
);

// Silhouette, then the governed line on top. Neither is tilted in the scene.
parts.push(
  `<circle cx="${CX}" cy="${CY}" r="${RPX}" fill="none" stroke="${COLOR.rim}" stroke-opacity="0.9" stroke-width="1.2"/>`,
);
const primeHalf = RPX * 1.016 * Math.sin(PRIME_LIMIT);
parts.push(
  `<path d="M ${CX} ${(CY - primeHalf).toFixed(1)} L ${CX} ${(CY + primeHalf).toFixed(1)}" stroke="${COLOR.accent}" stroke-opacity="0.95" stroke-width="1.6" fill="none"/>`,
);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="presentation">
<title>The Meridian</title>
${parts.join("\n")}
</svg>
`;

writeFileSync(OUT, svg, "utf8");
console.log(`wrote ${OUT} (${(svg.length / 1024).toFixed(1)} KB, ${nodes.length} nodes visible)`);
