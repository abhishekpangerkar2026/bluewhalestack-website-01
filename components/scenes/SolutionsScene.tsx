"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, RoundedBox, useCursor } from "@react-three/drei";
import { solutions, type SolutionDef } from "@/content/solutions";

/**
 * Live WebGL version of the product scene for the Solutions hero: the same
 * royal-blue slab, chrome rim and frosted shelves as the rendered scenes
 * (scripts/render-3d/infographic.html), with the six solutions as tiles you
 * can drag to rotate, hover to lift and click to open. Loaded client-side
 * only through SolutionsSceneLoader, which also provides the static fallback.
 */

// Units follow the offline renderer so the look matches the WebP scenes.
const BW = 12.4, BD = 8.0, BH = 1.2;
const TOP = 0.28 + BH;
const COLS = [-3.95, 0, 3.95];
const ROWS = [-1.8, 1.85];
const TILE_W = 3.35, TILE_D = 2.5, TILE_H = 0.22;

const ICON_FOR: Record<string, "inventory" | "provisioning" | "observe" | "migration" | "security" | "sovereign"> = {
  "unified-cloud-inventory": "inventory",
  "ai-native-provisioning": "provisioning",
  "bundled-observability": "observe",
  "cloud-migration": "migration",
  "security-compliance": "security",
  "sovereign-cloud": "sovereign",
};

type Mats = ReturnType<typeof makeMaterials>;

function makeMaterials() {
  return {
    base: new THREE.MeshPhysicalMaterial({ color: 0x0e3bd0, roughness: 0.2, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 0.3 }),
    baseDeep: new THREE.MeshPhysicalMaterial({ color: 0x0c2f9e, roughness: 0.3, metalness: 0.05, clearcoat: 0.8, envMapIntensity: 0.3 }),
    chrome: new THREE.MeshPhysicalMaterial({ color: 0xe6ebf3, roughness: 0.14, metalness: 1, clearcoat: 1, envMapIntensity: 0.9 }),
    frost: new THREE.MeshPhysicalMaterial({ color: 0xf6f9ff, roughness: 0.28, metalness: 0, clearcoat: 1, transparent: true, opacity: 0.94, envMapIntensity: 0.5 }),
    blue: new THREE.MeshPhysicalMaterial({ color: 0x2f62e6, roughness: 0.22, metalness: 0.1, clearcoat: 1, envMapIntensity: 0.3 }),
    blueLight: new THREE.MeshPhysicalMaterial({ color: 0x7fb3ff, roughness: 0.25, metalness: 0.05, clearcoat: 1, envMapIntensity: 0.3 }),
    gold: new THREE.MeshPhysicalMaterial({ color: 0xf2c14e, roughness: 0.2, metalness: 0.95, envMapIntensity: 0.3 }),
    green: new THREE.MeshPhysicalMaterial({ color: 0x1f9d55, roughness: 0.3, clearcoat: 1, envMapIntensity: 0.3 }),
    white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, envMapIntensity: 0.3 }),
    ring: new THREE.MeshBasicMaterial({ color: 0xdbe6ff, transparent: true, opacity: 0.6 }),
  };
}

/** Canvas-drawn label in the site's Inter face (next/font registers it under a hashed family name). */
function useLabelTexture(text: string, width: number, height: number, weight: number, px: number, color: string, shadow = false) {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    let alive = true;
    const family = getComputedStyle(document.body).fontFamily || "Inter, system-ui, sans-serif";
    const font = `${weight} ${px}px ${family}`;
    const draw = () => {
      if (!alive) return;
      const c = document.createElement("canvas");
      c.width = width;
      c.height = height;
      const g = c.getContext("2d");
      if (!g) return;
      g.clearRect(0, 0, width, height);
      g.font = font;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = color;
      if (shadow) {
        g.shadowColor = "rgba(0,0,0,.35)";
        g.shadowBlur = px * 0.12;
      }
      g.fillText(text, width / 2, height / 2 + px * 0.04);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      setTex((old) => {
        old?.dispose();
        return t;
      });
    };
    const ready = document.fonts?.load(font).then(() => document.fonts.ready) ?? Promise.resolve();
    ready.then(draw, draw);
    return () => {
      alive = false;
    };
  }, [text, width, height, weight, px, color, shadow]);
  return tex;
}

function LabelPlane({ text, position, rotation, size, weight = 700, px = 96, color = "#0b2a7a", shadow = false, canvas = [1024, 192] as [number, number] }: {
  text: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number];
  weight?: number;
  px?: number;
  color?: string;
  shadow?: boolean;
  canvas?: [number, number];
}) {
  const tex = useLabelTexture(text, canvas[0], canvas[1], weight, px, color, shadow);
  if (!tex) return null;
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

/* ── small 3D icons, one per solution ─────────────────────────────── */

function CubeCluster({ m, s = 0.5 }: { m: Mats; s?: number }) {
  return (
    <group>
      <mesh material={m.blue} position={[-0.3 * s * 1.05, s / 2, 0]} castShadow><boxGeometry args={[s, s, s]} /></mesh>
      <mesh material={m.chrome} position={[0.34 * s * 1.05, s / 2, 0.1 * s]} castShadow><boxGeometry args={[s, s, s]} /></mesh>
      <mesh material={m.blue} position={[0, s * 1.52, -0.05 * s]} castShadow><boxGeometry args={[s, s, s]} /></mesh>
    </group>
  );
}

function Magnifier({ m, s = 0.8 }: { m: Mats; s?: number }) {
  return (
    <group scale={s} rotation={[0.35, -0.5, 0]}>
      <mesh material={m.chrome} castShadow><torusGeometry args={[0.42, 0.08, 16, 48]} /></mesh>
      <mesh material={m.blue} position={[0.55, -0.55, 0]} rotation={[0, 0, Math.PI / 4]} castShadow><cylinderGeometry args={[0.07, 0.07, 0.75, 16]} /></mesh>
      <mesh position={[0, 0, 0]}><circleGeometry args={[0.36, 32]} /><meshPhysicalMaterial color={0xf2f6ff} roughness={0.05} transparent opacity={0.5} clearcoat={1} /></mesh>
    </group>
  );
}

function Docs({ m }: { m: Mats }) {
  return (
    <group>
      {[0, 1].map((i) => (
        <group key={i} position={[i * 0.22, 0, -i * 0.2]}>
          <mesh material={m.white} position={[0, 0.58, 0]} castShadow><boxGeometry args={[0.9, 1.15, 0.05]} /></mesh>
          {[0.3, 0.1, -0.1, -0.3].map((ly, k) => (
            <mesh key={k} material={m.blueLight} position={[k === 0 ? -0.12 : 0, 0.58 + ly, 0.035]}><boxGeometry args={[k === 0 ? 0.45 : 0.65, 0.05, 0.02]} /></mesh>
          ))}
        </group>
      ))}
      <mesh material={m.green} position={[0.62, 0.25, 0.35]} castShadow><boxGeometry args={[0.48, 0.48, 0.48]} /></mesh>
    </group>
  );
}

function Bars({ m }: { m: Mats }) {
  return (
    <group>
      {[0.5, 0.95, 1.4].map((h, i) => (
        <mesh key={i} material={i === 2 ? m.blue : m.chrome} position={[(i - 1) * 0.5, h / 2, 0]} castShadow><boxGeometry args={[0.36, h, 0.36]} /></mesh>
      ))}
    </group>
  );
}

function MigrationIcon({ m }: { m: Mats }) {
  const arrow = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.55, 0.35, 0), new THREE.Vector3(0, 1.0, 0), new THREE.Vector3(0.55, 0.55, 0)]);
    return new THREE.TubeGeometry(curve, 32, 0.06, 10, false);
  }, []);
  useEffect(() => () => arrow.dispose(), [arrow]);
  return (
    <group>
      <RoundedBox args={[0.9, 0.14, 0.9]} radius={0.05} position={[-0.85, 0.07, 0.1]} material={m.baseDeep} castShadow />
      <mesh material={m.blue} position={[-0.85, 0.36, 0.1]} castShadow><boxGeometry args={[0.4, 0.4, 0.4]} /></mesh>
      <group position={[0.85, 0, 0]}>
        <RoundedBox args={[1.0, 0.16, 1.0]} radius={0.06} position={[0, 0.08, 0]} material={m.baseDeep} castShadow />
        <RoundedBox args={[0.7, 0.15, 0.7]} radius={0.05} position={[0, 0.32, 0]} material={m.blue} castShadow />
        <RoundedBox args={[0.42, 0.13, 0.42]} radius={0.04} position={[0, 0.55, 0]} material={m.frost} castShadow />
      </group>
      <mesh geometry={arrow} material={m.blue} position={[0.0, 0.1, 0.1]} castShadow />
      <mesh material={m.blue} position={[0.6, 0.62, 0.1]} rotation={[0, 0, -2.1]} castShadow><coneGeometry args={[0.15, 0.34, 20]} /></mesh>
    </group>
  );
}

function Shield({ m }: { m: Mats }) {
  const geo = useMemo(() => {
    const sh = new THREE.Shape();
    sh.moveTo(0, 1); sh.lineTo(0.8, 0.65); sh.lineTo(0.8, 0);
    sh.quadraticCurveTo(0.8, -0.6, 0, -1); sh.quadraticCurveTo(-0.8, -0.6, -0.8, 0);
    sh.lineTo(-0.8, 0.65); sh.closePath();
    const back = new THREE.ExtrudeGeometry(sh, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3 });
    const front = new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3 });
    const check = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([new THREE.Vector3(-0.38, -0.05, 0.36), new THREE.Vector3(-0.1, -0.32, 0.36), new THREE.Vector3(0.42, 0.36, 0.36)]),
      24, 0.07, 12, false,
    );
    return { back, front, check };
  }, []);
  useEffect(() => () => { geo.back.dispose(); geo.front.dispose(); geo.check.dispose(); }, [geo]);
  return (
    <group scale={0.62} position={[0, 0.68, 0]} rotation={[0, -0.25, 0]}>
      <mesh geometry={geo.back} material={m.chrome} scale={[1.1, 1.1, 1]} castShadow />
      <mesh geometry={geo.front} material={m.blue} position={[0, 0, 0.08]} castShadow />
      <mesh geometry={geo.check} material={m.white} />
    </group>
  );
}

function Globe({ m }: { m: Mats }) {
  const r = 0.55;
  return (
    <group position={[-0.25, 0, 0]}>
      <group position={[0, r + 0.2, 0]}>
        <mesh material={m.blue} castShadow><sphereGeometry args={[r, 40, 40]} /></mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} material={m.ring} rotation={[0, (i * Math.PI) / 3, 0]}><torusGeometry args={[r * 1.006, 0.01, 8, 64]} /></mesh>
        ))}
        {[-0.28, 0, 0.28].map((ly, i) => (
          <mesh key={i} material={m.ring} rotation={[Math.PI / 2, 0, 0]} position={[0, ly, 0]}><torusGeometry args={[Math.sqrt(r * r - ly * ly), 0.01, 8, 64]} /></mesh>
        ))}
        <mesh material={m.chrome} position={[0, -r - 0.1, 0]}><cylinderGeometry args={[0.3, 0.3, 0.1, 32]} /></mesh>
      </group>
      <group position={[1.05, 0, 0.15]} scale={0.6}>
        <mesh material={m.gold} position={[0, 0.4, 0]} castShadow><boxGeometry args={[1.0, 0.8, 0.5]} /></mesh>
        <mesh material={m.chrome} position={[0, 0.8, 0]}><torusGeometry args={[0.32, 0.08, 16, 48, Math.PI]} /></mesh>
      </group>
    </group>
  );
}

function TileIcon({ kind, m }: { kind: string; m: Mats }) {
  switch (kind) {
    case "inventory":
      return (
        <group>
          <group position={[-0.45, 0, 0.1]}><CubeCluster m={m} /></group>
          <group position={[0.85, 0.7, 0.35]}><Magnifier m={m} /></group>
        </group>
      );
    case "provisioning":
      return <group position={[-0.2, 0, 0]}><Docs m={m} /></group>;
    case "observe":
      return <Bars m={m} />;
    case "migration":
      return <MigrationIcon m={m} />;
    case "security":
      return <Shield m={m} />;
    case "sovereign":
      return <Globe m={m} />;
    default:
      return <CubeCluster m={m} />;
  }
}

/* ── a solution tile ──────────────────────────────────────────────── */

function Tile({ s, x, z, hovered, onHover, onOpen, m }: {
  s: SolutionDef;
  x: number;
  z: number;
  hovered: boolean;
  onHover: (slug: string | null) => void;
  onOpen: (slug: string) => void;
  m: Mats;
}) {
  const g = useRef<THREE.Group>(null);
  const lift = useRef(0);
  useFrame((_, dt) => {
    lift.current = THREE.MathUtils.damp(lift.current, hovered ? 0.32 : 0, 9, dt);
    if (g.current) g.current.position.y = TOP + lift.current;
  });
  return (
    <group
      ref={g}
      position={[x, TOP, z]}
      onPointerOver={(e) => { e.stopPropagation(); onHover(s.slug); }}
      onPointerOut={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onOpen(s.slug); }}
    >
      <RoundedBox args={[TILE_W, TILE_H, TILE_D]} radius={0.11} smoothness={4} position={[0, TILE_H / 2, 0]} material={m.frost} castShadow receiveShadow />
      <group position={[0, TILE_H, -0.32]} scale={0.98}>
        <TileIcon kind={ICON_FOR[s.slug]} m={m} />
      </group>
      {/* nameplate on the front edge, tilted up toward the camera */}
      <group position={[0, TILE_H + 0.3, TILE_D / 2 - 0.05]} rotation={[-0.5, 0, 0]}>
        <RoundedBox args={[3.0, 0.58, 0.07]} radius={0.06} smoothness={3} material={m.white} castShadow />
        <LabelPlane text={s.name} position={[0, 0, 0.045]} size={[2.8, 0.49]} weight={700} px={100} color="#0b2a7a" canvas={[1440, 252]} />
      </group>
      {hovered && (
        <Html center position={[0, 2.5, 0]} zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink shadow-md">
            {s.name} <span className="text-accent">→ open</span>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ── the scene ────────────────────────────────────────────────────── */

type Controls = MutableRefObject<{ dragging: boolean; targetX: number; targetY: number; reduced: boolean }>;

function Model({ controls, onOpen }: { controls: Controls; onOpen: (slug: string) => void }) {
  const rig = useRef<THREE.Group>(null);
  const m = useMemo(makeMaterials, []);
  useEffect(() => () => { Object.values(m).forEach((mat) => mat.dispose()); }, [m]);
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null, "pointer", "auto");

  useFrame(({ clock }, dt) => {
    const c = controls.current;
    if (!c.dragging) {
      const idle = c.reduced ? 0 : Math.sin(clock.elapsedTime * 0.35) * 0.14;
      c.targetY = THREE.MathUtils.damp(c.targetY, idle, 1.6, dt);
      c.targetX = THREE.MathUtils.damp(c.targetX, 0, 1.6, dt);
    }
    const r = rig.current;
    if (!r) return;
    r.rotation.y = THREE.MathUtils.damp(r.rotation.y, c.targetY, 7, dt);
    r.rotation.x = THREE.MathUtils.damp(r.rotation.x, c.targetX, 7, dt);
  });

  return (
    <group ref={rig} position={[0, -0.7, 0]}>
      {/* chrome rim + royal-blue base, as in the rendered scenes */}
      <RoundedBox args={[BW + 0.5, 0.28, BD + 0.5]} radius={0.14} smoothness={4} position={[0, 0.14, 0]} material={m.chrome} receiveShadow />
      <RoundedBox args={[BW, BH, BD]} radius={0.28} smoothness={5} position={[0, 0.28 + BH / 2, 0]} material={m.base} castShadow receiveShadow />
      <LabelPlane text="BlueWhale Stack" position={[0, 0.28 + BH * 0.5, BD / 2 + 0.03]} size={[6.2, 0.78]} weight={800} px={190} color="#ffffff" shadow canvas={[2048, 256]} />

      {solutions.map((s, i) => (
        <Tile
          key={s.slug}
          s={s}
          x={COLS[i % 3]}
          z={ROWS[Math.floor(i / 3)]}
          hovered={hovered === s.slug}
          onHover={setHovered}
          onOpen={onOpen}
          m={m}
        />
      ))}

      {/* soft ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
    </group>
  );
}

function Studio() {
  // the same six-panel studio the offline renderer uses for chrome and glass reflections
  const panel = (p: [number, number, number], r: [number, number, number], w: number, h: number, color: string) => (
    <mesh position={p} rotation={r} key={`${p.join()}-${color}`}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
  return (
    <Environment resolution={256} frames={1}>
      <mesh><sphereGeometry args={[40, 16, 16]} /><meshBasicMaterial color="#dfe6f4" side={THREE.BackSide} /></mesh>
      {panel([0, 10, 0], [Math.PI / 2, 0, 0], 30, 30, "#ffffff")}
      {panel([0, -6, 0], [Math.PI / 2, 0, 0], 30, 30, "#8fa3c8")}
      {panel([-12, 4, 0], [0, Math.PI / 2, 0], 12, 10, "#bfd2ff")}
      {panel([12, 4, 0], [0, -Math.PI / 2, 0], 12, 10, "#ffffff")}
      {panel([0, 4, -12], [0, 0, 0], 20, 10, "#2f62e6")}
      {panel([0, 4, 12], [0, Math.PI, 0], 20, 10, "#ffffff")}
    </Environment>
  );
}

export function SolutionsScene({ onOpen, className }: { onOpen: (slug: string) => void; className?: string }) {
  const controls = useRef({ dragging: false, targetX: 0, targetY: 0, reduced: false });
  const drag = useRef<{ x: number; y: number; ry: number; rx: number } | null>(null);

  useEffect(() => {
    controls.current.reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  return (
    <div
      className={className}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, y: e.clientY, ry: controls.current.targetY, rx: controls.current.targetX };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        const dy = e.clientY - d.y;
        if (!controls.current.dragging && Math.hypot(dx, dy) < 4) return;
        controls.current.dragging = true;
        controls.current.targetY = THREE.MathUtils.clamp(d.ry + dx * 0.006, -0.65, 0.65);
        controls.current.targetX = THREE.MathUtils.clamp(d.rx + dy * 0.003, -0.1, 0.25);
      }}
      onPointerUp={() => { drag.current = null; controls.current.dragging = false; }}
      onPointerLeave={() => { drag.current = null; controls.current.dragging = false; }}
      onPointerCancel={() => { drag.current = null; controls.current.dragging = false; }}
    >
      <Canvas
        dpr={[1, 1.75]}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ fov: 24, position: [0, 10.2, 22.4], near: 0.1, far: 200 }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
          gl.setClearColor(0x000000, 0);
          // aim below the slab's centre so the model sits mid-canvas from this high viewpoint
          camera.lookAt(0, -1.3, 0);
        }}
        style={{ background: "transparent" }}
      >
        <hemisphereLight args={[0xffffff, 0x9fb4e0, 0.55]} />
        <directionalLight
          position={[-6, 14, 10]}
          intensity={2.1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-camera-near={1}
          shadow-camera-far={60}
          shadow-bias={-0.0005}
          shadow-radius={5}
        />
        <directionalLight position={[10, 6, 8]} intensity={0.6} color={0xbfd2ff} />
        <directionalLight position={[0, 6, -12]} intensity={0.5} color={0x4a7cf0} />
        <Studio />
        <Model controls={controls} onOpen={onOpen} />
      </Canvas>
    </div>
  );
}
