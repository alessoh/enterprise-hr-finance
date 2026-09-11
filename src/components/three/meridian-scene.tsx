"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** DESIGN.md §3 "3D scene palette". Hardcoded sRGB because WebGL cannot read CSS variables. */
const COLOR = {
  sphere: "#fbfaf8",
  rim: "#cdcac5",
  meridian: "#1c1712",
  prime: "#1f5390",
  node: "#1f5390",
  halo: "#7ea7dc",
  sky: "#fefdfc",
  ground: "#e3e1dd",
} as const;

const MERIDIANS = 24;
const LATITUDES = 5;
/** Longitude arcs stop short of the poles so they never converge into a knot. */
const POLE_LIMIT = THREE.MathUtils.degToRad(76);
const SEGMENTS = 96;
const NODE_COUNT = 12;
const TILT = THREE.MathUtils.degToRad(23.4);
const IDLE_SPEED = 0.075;
const PULSE_MS = 700;
const R = 1;

const toGeometry = (points: THREE.Vector3[]) => new THREE.BufferGeometry().setFromPoints(points);

/** One longitude arc at `lon`, running between the pole limits. */
function longitudeArc(lon: number, radius = R * 1.002): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= SEGMENTS; i += 1) {
    const lat = -POLE_LIMIT + (i / SEGMENTS) * (POLE_LIMIT * 2);
    const cosLat = Math.cos(lat);
    points.push(
      new THREE.Vector3(
        radius * cosLat * Math.sin(lon),
        radius * Math.sin(lat),
        radius * cosLat * Math.cos(lon),
      ),
    );
  }
  return toGeometry(points);
}

/** One full latitude ring at `lat`. */
function latitudeRing(lat: number, radius = R * 1.002): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const r = radius * Math.cos(lat);
  const y = radius * Math.sin(lat);
  for (let i = 0; i <= SEGMENTS; i += 1) {
    const a = (i / SEGMENTS) * Math.PI * 2;
    points.push(new THREE.Vector3(r * Math.sin(a), y, r * Math.cos(a)));
  }
  return toGeometry(points);
}

/** The graticule: 24 longitudes and 5 latitudes, drawn as an instrument, not a globe. */
function Graticule() {
  const { longitudes, latitudes } = useMemo(
    () => ({
      longitudes: Array.from({ length: MERIDIANS }, (_, i) =>
        longitudeArc((i / MERIDIANS) * Math.PI * 2),
      ),
      latitudes: Array.from({ length: LATITUDES }, (_, i) =>
        latitudeRing(-POLE_LIMIT + ((i + 1) / (LATITUDES + 1)) * POLE_LIMIT * 2),
      ),
    }),
    [],
  );

  return (
    <>
      {longitudes.map((geometry, i) => (
        <line key={`lon-${i}`}>
          <primitive object={geometry} attach="geometry" />
          <lineBasicMaterial attach="material" color={COLOR.meridian} transparent opacity={0.2} />
        </line>
      ))}
      {latitudes.map((geometry, i) => (
        <line key={`lat-${i}`}>
          <primitive object={geometry} attach="geometry" />
          <lineBasicMaterial attach="material" color={COLOR.meridian} transparent opacity={0.11} />
        </line>
      ))}
    </>
  );
}

interface NodeConfig {
  /** Latitude the agent travels along. */
  lat: number;
  speed: number;
  phase: number;
}

const NODES: NodeConfig[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
  lat: THREE.MathUtils.degToRad(-58 + i * 10.5),
  speed: 0.1 + (i % 5) * 0.014,
  // Golden-angle phases so the twelve never bunch up.
  phase: (i * 2.39996) % (Math.PI * 2),
}));

/**
 * Twelve agents. Each travels its own latitude; when it passes the governed line at the
 * front of the frame it pulses once. Work crossed the line and was checked.
 */
function AgentNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const haloRef = useRef<THREE.InstancedMesh>(null);
  const pulses = useRef<number[]>(NODES.map(() => -Infinity));
  const wasNear = useRef<boolean[]>(NODES.map(() => false));
  const haloOpacity = useRef(0);

  // Reused every frame; nothing is allocated in the loop.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const world = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    const halo = haloRef.current;
    const group = groupRef.current;
    if (!mesh || !halo || !group) return;
    const t = state.clock.elapsedTime;
    let peak = 0;

    for (let i = 0; i < NODES.length; i += 1) {
      const config = NODES[i];
      const lon = config.phase + t * config.speed;
      const radius = R * 1.012;
      const cosLat = Math.cos(config.lat);
      dummy.position.set(
        radius * cosLat * Math.sin(lon),
        radius * Math.sin(config.lat),
        radius * cosLat * Math.cos(lon),
      );
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // The governed line is fixed at the front of the frame: world x near 0, z positive.
      world.copy(dummy.position).applyMatrix4(group.matrixWorld);
      const near = Math.abs(world.x) < 0.05 && world.z > 0;
      if (near && !wasNear.current[i]) pulses.current[i] = t;
      wasNear.current[i] = near;

      const since = (t - pulses.current[i]) * 1000;
      if (since >= 0 && since < PULSE_MS) {
        const progress = since / PULSE_MS;
        peak = Math.max(peak, 1 - progress);
        dummy.scale.setScalar(1 + 2.4 * progress);
      } else {
        dummy.scale.setScalar(0.0001);
      }
      dummy.updateMatrix();
      halo.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    halo.instanceMatrix.needsUpdate = true;
    haloOpacity.current = Math.max(peak, haloOpacity.current * 0.86);
    (halo.material as THREE.MeshBasicMaterial).opacity = 0.45 * haloOpacity.current;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.019, 14, 14]} />
        <meshBasicMaterial color={COLOR.node} />
      </instancedMesh>
      <instancedMesh ref={haloRef} args={[undefined, undefined, NODE_COUNT]} frustumCulled={false}>
        <sphereGeometry args={[0.019, 12, 12]} />
        <meshBasicMaterial color={COLOR.halo} transparent opacity={0} depthWrite={false} />
      </instancedMesh>
    </group>
  );
}

/** Paper sphere, graticule, and the travelling agents. This is what rotates. */
function Globe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * IDLE_SPEED;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[R, 48, 48]} />
        <meshStandardMaterial color={COLOR.sphere} roughness={1} metalness={0} />
      </mesh>
      <Graticule />
      <AgentNodes />
    </group>
  );
}

/**
 * The governed line and the silhouette. Neither rotates: the work turns past the line.
 * The line is drawn clear of the surface so it is always legible.
 */
function GovernedLine() {
  const { prime, silhouette } = useMemo(() => {
    // Runs almost pole to pole and hugs the surface, so it reads as a meridian on the
    // sphere rather than a rule drawn over it.
    const primeLimit = THREE.MathUtils.degToRad(88);
    const primeRadius = R * 1.016;
    const primePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= SEGMENTS; i += 1) {
      const lat = -primeLimit + (i / SEGMENTS) * (primeLimit * 2);
      primePoints.push(
        new THREE.Vector3(0, primeRadius * Math.sin(lat), primeRadius * Math.cos(lat)),
      );
    }
    const ringPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= SEGMENTS * 2; i += 1) {
      const a = (i / (SEGMENTS * 2)) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(R * Math.cos(a), R * Math.sin(a), 0));
    }
    return { prime: toGeometry(primePoints), silhouette: toGeometry(ringPoints) };
  }, []);

  return (
    <>
      <line>
        <primitive object={silhouette} attach="geometry" />
        <lineBasicMaterial attach="material" color={COLOR.rim} transparent opacity={0.9} />
      </line>
      <line>
        <primitive object={prime} attach="geometry" />
        <lineBasicMaterial attach="material" color={COLOR.prime} transparent opacity={0.95} />
      </line>
    </>
  );
}

/** Holds the axial tilt and the pointer parallax. */
function Rig({ interactive, children }: { interactive: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const max = THREE.MathUtils.degToRad(4);
    const targetX = interactive ? TILT + state.pointer.y * max : TILT;
    const targetZ = interactive ? state.pointer.x * max : 0;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.06);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetZ, 0.06);
  });
  return <group ref={ref}>{children}</group>;
}

export interface MeridianSceneProps {
  /** Pointer parallax; off on touch devices. */
  interactive?: boolean;
  onReady?: () => void;
}

export default function MeridianScene({ interactive = true, onReady }: MeridianSceneProps) {
  return (
    <Canvas
      aria-hidden
      className="size-full"
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      camera={{ fov: 32, position: [0, 0.05, 5.7] }}
      onCreated={({ gl, camera }) => {
        gl.setClearAlpha(0);
        camera.lookAt(0, 0, 0);
        onReady?.();
      }}
    >
      <ambientLight intensity={2.9} />
      <hemisphereLight args={[COLOR.sky, COLOR.ground, 2.4]} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
      <Rig interactive={interactive}>
        <Globe />
      </Rig>
      {/* Outside the rig: the governed line and the silhouette stay fixed in frame. */}
      <GovernedLine />
    </Canvas>
  );
}
