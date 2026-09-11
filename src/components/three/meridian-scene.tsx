"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** DESIGN.md §3 "3D scene palette". Hardcoded sRGB because WebGL cannot read CSS variables. */
const COLOR = {
  sphere: "#f9f7f4",
  rim: "#cdcac5",
  meridian: "#1c1712",
  prime: "#1f5390",
  node: "#1f5390",
  halo: "#e7f1fe",
  sky: "#fefdfc",
  ground: "#cdcac5",
} as const;

/** 12 great circles through the poles read as 24 longitude lines (DESIGN.md §7). */
const MERIDIAN_CIRCLES = 12;
const POINTS = 128;
const NODE_COUNT = 12;
const TILT = THREE.MathUtils.degToRad(23.4);
const IDLE_SPEED = 0.06;
const PULSE_MS = 600;

/** Points of one great circle through the poles, rotated by `longitude`. */
function meridianPoints(longitude: number, radius = 1.004): Float32Array {
  const array = new Float32Array(POINTS * 3);
  const cos = Math.cos(longitude);
  const sin = Math.sin(longitude);
  for (let i = 0; i < POINTS; i += 1) {
    const theta = (i / (POINTS - 1)) * Math.PI * 2;
    const x = Math.sin(theta) * radius;
    const y = Math.cos(theta) * radius;
    array[i * 3] = x * cos;
    array[i * 3 + 1] = y;
    array[i * 3 + 2] = x * sin;
  }
  return array;
}

function Meridians() {
  const geometries = useMemo(
    () =>
      Array.from({ length: MERIDIAN_CIRCLES }, (_, i) => {
        const longitude = (i / MERIDIAN_CIRCLES) * Math.PI;
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(meridianPoints(longitude), 3));
        return { geometry, isPrime: i === 0 };
      }),
    [],
  );

  return (
    <>
      {geometries.map(({ geometry, isPrime }, i) => (
        <line key={i}>
          <primitive object={geometry} attach="geometry" />
          <lineBasicMaterial
            attach="material"
            color={isPrime ? COLOR.prime : COLOR.meridian}
            transparent
            opacity={isPrime ? 1 : 0.28}
          />
        </line>
      ))}
    </>
  );
}

interface NodeConfig {
  longitude: number;
  speed: number;
  phase: number;
}

const NODES: NodeConfig[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
  // Spread the twelve agents across distinct meridians.
  longitude: ((i + 0.5) / MERIDIAN_CIRCLES) * Math.PI,
  speed: 0.10 + (i % 5) * 0.015,
  phase: (i / NODE_COUNT) * Math.PI * 2,
}));

/** One agent, travelling its meridian; pulses as it crosses the prime meridian plane. */
function AgentNode({ config, index }: { config: NodeConfig; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const pulseStart = useRef<number>(-Infinity);
  const wasNear = useRef(false);
  const position = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const group = groupRef.current;
    const halo = haloRef.current;
    if (!group || !halo) return;

    const t = state.clock.elapsedTime;
    const theta = config.phase + t * config.speed;
    const radius = 1.02;
    const x = Math.sin(theta) * radius;
    const y = Math.cos(theta) * radius;
    position.set(x * Math.cos(config.longitude), y, x * Math.sin(config.longitude));
    group.position.copy(position);

    // The prime meridian lies in the xy-plane at z = 0 and x >= 0.
    const near = Math.abs(position.z) < 0.06 && position.x > 0;
    if (near && !wasNear.current) pulseStart.current = t;
    wasNear.current = near;

    const since = (t - pulseStart.current) * 1000;
    if (since >= 0 && since < PULSE_MS) {
      const progress = since / PULSE_MS;
      const scale = 1 + 0.6 * progress;
      halo.scale.setScalar(scale);
      (halo.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - progress);
      halo.visible = true;
    } else {
      halo.visible = false;
    }
  });

  return (
    <group ref={groupRef} key={index}>
      <mesh>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color={COLOR.node} />
      </mesh>
      <mesh ref={haloRef} visible={false}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color={COLOR.halo} transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Globe({ interactive }: { interactive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * IDLE_SPEED;

    if (interactive) {
      // Pointer coords are -1..1; ±4 degrees of parallax, eased.
      const max = THREE.MathUtils.degToRad(4);
      target.current.x = state.pointer.y * max;
      target.current.y = state.pointer.x * max;
    }
    group.parent!.rotation.x = THREE.MathUtils.lerp(
      group.parent!.rotation.x,
      TILT + target.current.x,
      0.06,
    );
    group.parent!.rotation.z = THREE.MathUtils.lerp(group.parent!.rotation.z, target.current.y, 0.06);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={COLOR.sphere} roughness={0.95} metalness={0} />
      </mesh>
      <mesh scale={1.035}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={COLOR.rim} transparent opacity={0.18} side={THREE.BackSide} />
      </mesh>
      <Meridians />
      {NODES.map((config, index) => (
        <AgentNode key={index} config={config} index={index} />
      ))}
    </group>
  );
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
      camera={{ fov: 32, position: [0, 0.12, 5.6] }}
      onCreated={({ gl, camera }) => {
        gl.setClearAlpha(0);
        camera.lookAt(0, 0, 0);
        onReady?.();
      }}
    >
      <ambientLight intensity={1.9} />
      <hemisphereLight args={[COLOR.sky, COLOR.ground, 2.2]} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <group rotation={[TILT, 0, 0]}>
        <Globe interactive={interactive} />
      </group>
    </Canvas>
  );
}
