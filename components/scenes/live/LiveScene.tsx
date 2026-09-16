"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { SCENES } from "./registry";
import { buildScene, makeMaterials, type BuiltScene } from "./build";

/**
 * Live, rotating version of a product scene in a white (or navy) CGI studio:
 * infinite reflective floor, soft shadows, fog to the horizon. Drag to rotate
 * (springs back), gentle idle sway, pulses travelling down the provider
 * cables. Also drives the static posters (scripts/capture-scenes.mjs) and the
 * video clips through /scene-capture, where it renders fixed frames.
 */
export type Studio = "light" | "dark";

export interface LiveSceneProps {
  sceneKey: string;
  className?: string;
  /** white or navy studio (background, floor, fog) */
  studio?: Studio;
  /** pointer drag rotates the model */
  interactive?: boolean;
  /** idle sway + cable pulses */
  animate?: boolean;
  /** fixed yaw in radians (capture mode) */
  angle?: number;
  /** render once per state change instead of continuously (capture mode) */
  still?: boolean;
  dpr?: number | [number, number];
  onReady?: () => void;
}

export const STUDIO_BG: Record<Studio, string> = { light: "#ffffff", dark: "#00156b" };

/** Horizontal half-angle of the framing: the platform spans ~78% of the width in any aspect ratio. */
const TAN_HALF_H = 0.41;

export function StudioEnvironment() {
  // a six-panel studio for chrome and glass reflections: white ceiling, bright walls, a blue back wall
  const panel = (p: [number, number, number], r: [number, number, number], w: number, h: number, color: string, key: string) => (
    <mesh position={p} rotation={r} key={key}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
  return (
    <Environment resolution={256} frames={1}>
      <mesh><sphereGeometry args={[40, 16, 16]} /><meshBasicMaterial color="#eef2f8" side={THREE.BackSide} /></mesh>
      {panel([0, 10, 0], [Math.PI / 2, 0, 0], 30, 30, "#ffffff", "top")}
      {panel([0, -6, 0], [Math.PI / 2, 0, 0], 30, 30, "#b7c4d8", "floor")}
      {panel([-12, 4, 0], [0, Math.PI / 2, 0], 12, 10, "#dfe8f7", "left")}
      {panel([12, 4, 0], [0, -Math.PI / 2, 0], 12, 10, "#ffffff", "right")}
      {panel([0, 8.5, -12], [0, 0, 0], 16, 5, "#4f83f2", "back")}
      {panel([0, 4, 12], [0, Math.PI, 0], 20, 10, "#ffffff", "front")}
    </Environment>
  );
}

export function StageLights({ studio }: { studio: Studio }) {
  const dark = studio === "dark";
  return (
    <>
      <hemisphereLight args={[0xffffff, dark ? 0x1b3a9a : 0xa9bde6, dark ? 0.45 : 0.5]} />
      <directionalLight
        position={[-6, 15, 10]}
        intensity={dark ? 2.0 : 2.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-13}
        shadow-camera-right={13}
        shadow-camera-top={13}
        shadow-camera-bottom={-13}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-radius={6}
      />
      <directionalLight position={[10, 6, 8]} intensity={0.55} color={0xd6e4ff} />
      <directionalLight position={[0, 6, -12]} intensity={0.6} color={0x4a7cf0} />
    </>
  );
}

/** Keeps the horizontal field of view constant, whatever the canvas aspect ratio. */
function FitCamera({ lookY }: { lookY: number }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const aspect = Math.max(0.5, size.width / Math.max(1, size.height));
    camera.fov = (2 * Math.atan(TAN_HALF_H / aspect) * 180) / Math.PI;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    camera.lookAt(0, lookY, 0);
    invalidate();
  }, [camera, size.width, size.height, lookY, invalidate]);
  return null;
}

type Controls = { dragging: boolean; targetX: number; targetY: number; reduced: boolean };

function Model({ sceneKey, controls, angle, animate, studio, onReady }: { sceneKey: string; controls: React.MutableRefObject<Controls>; angle?: number; animate: boolean; studio: Studio; onReady?: () => void }) {
  const rig = useRef<THREE.Group>(null);
  const [built, setBuilt] = useState<BuiltScene | null>(null);
  const invalidate = useThree((s) => s.invalidate);
  const dark = studio === "dark";

  useEffect(() => {
    const def = SCENES[sceneKey];
    if (!def) return;
    let alive = true;
    let scene: BuiltScene | null = null;
    const M = makeMaterials();
    const family = getComputedStyle(document.body).fontFamily || "Inter, system-ui, sans-serif";
    // Canvas text drawn while a web font is still loading comes out invisible, and the textures are drawn
    // once — so wait for the page's fonts to settle (with a cap), and rebuild once if we had to build early.
    const fonts = document.fonts;
    const settled: Promise<unknown> = fonts
      ? fonts.load(`800 100px ${family}`).catch(() => undefined).then(() => fonts.ready)
      : Promise.resolve();
    const cap = new Promise<void>((r) => setTimeout(r, 6000));
    let timer: ReturnType<typeof setTimeout> | undefined;
    const build = () => {
      if (!alive) return;
      scene?.dispose();
      scene = buildScene(def, M, family);
      setBuilt(scene);
    };
    Promise.race([settled, cap]).then(() => {
      build();
      if (fonts && fonts.status === "loading") fonts.ready.then(() => { if (alive) timer = setTimeout(build, 50); });
    });
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
      scene?.dispose();
      Object.values(M).forEach((m) => m.dispose());
    };
  }, [sceneKey]);

  // the floor reflection: a mirrored copy of the model under a translucent floor
  const mirror = useMemo(() => {
    if (!built) return null;
    const m = built.group.clone(true);
    m.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) { mesh.castShadow = false; mesh.receiveShadow = false; mesh.renderOrder = -1; }
    });
    return m;
  }, [built]);

  useEffect(() => {
    if (!built) return;
    // one rendered frame after the model is in the graph (or the fixed angle changed)
    if (rig.current && angle !== undefined) rig.current.rotation.set(0, angle, 0);
    invalidate();
    const id = requestAnimationFrame(() => { invalidate(); requestAnimationFrame(() => onReady?.()); });
    return () => cancelAnimationFrame(id);
  }, [built, angle, invalidate, onReady]);

  useFrame(({ clock }, dt) => {
    const r = rig.current;
    if (!r) return;
    if (angle !== undefined) {
      r.rotation.set(0, angle, 0);
    } else {
      const c = controls.current;
      if (!c.dragging) {
        // a visible, slow turn: ±20° of yaw every ~11 s with a touch of pitch, so the scene reads as 3D without being asked
        const t = clock.elapsedTime;
        const idleY = animate && !c.reduced ? Math.sin(t * 0.55) * 0.35 : 0;
        const idleX = animate && !c.reduced ? Math.sin(t * 0.55 * 0.5 + 1) * 0.05 : 0;
        c.targetY = THREE.MathUtils.damp(c.targetY, idleY, 1.6, dt);
        c.targetX = THREE.MathUtils.damp(c.targetX, idleX, 1.6, dt);
      }
      r.rotation.y = THREE.MathUtils.damp(r.rotation.y, c.targetY, 7, dt);
      r.rotation.x = THREE.MathUtils.damp(r.rotation.x, c.targetX, 7, dt);
    }
    if (built && animate && !controls.current.reduced) {
      const t = clock.elapsedTime * 0.22;
      built.pulses.forEach((p, i) => {
        const u = (t + (p.userData.offset as number)) % 1;
        built.cables[i].getPointAt(u, p.position);
      });
    }
  });

  return (
    <group ref={rig} position={[0, -1.9, 0]}>
      {built && <primitive object={built.group} />}
      {mirror && (
        <group scale={[1, -1, 0.999]} position={[0, -0.002, 0]}>
          <primitive object={mirror} />
        </group>
      )}
      {/* the studio floor: white (or navy), glossy, translucent so the mirrored model shows through as a reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow renderOrder={0}>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={dark ? 0x081d66 : 0xffffff} roughness={dark ? 0.55 : 0.35} metalness={0} transparent opacity={dark ? 0.86 : 0.8} envMapIntensity={0} />
      </mesh>
    </group>
  );
}

export function LiveScene({ sceneKey, className, studio = "light", interactive = true, animate = true, angle, still = false, dpr = [1, 1.75], onReady }: LiveSceneProps) {
  const controls = useRef<Controls>({ dragging: false, targetX: 0, targetY: 0, reduced: false });
  const drag = useRef<{ x: number; y: number; ry: number; rx: number } | null>(null);
  // the six-layer stack is taller, so its camera sits a little higher and further back
  const stack = SCENES[sceneKey]?.layout === "stack";
  const camera = useMemo(
    () => ({ fov: 24, position: (stack ? [0, 11.6, 25.2] : [0, 10.2, 22.4]) as [number, number, number], near: 0.1, far: 300 }),
    [stack],
  );
  const lookY = stack ? 2.7 : 1.4;
  const bg = STUDIO_BG[studio];

  useEffect(() => {
    controls.current.reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  const handlers = interactive
    ? {
        onPointerDown: (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY, ry: controls.current.targetY, rx: controls.current.targetX }; },
        onPointerMove: (e: React.PointerEvent) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.x, dy = e.clientY - d.y;
          if (!controls.current.dragging && Math.hypot(dx, dy) < 4) return;
          controls.current.dragging = true;
          controls.current.targetY = THREE.MathUtils.clamp(d.ry + dx * 0.006, -0.7, 0.7);
          controls.current.targetX = THREE.MathUtils.clamp(d.rx + dy * 0.003, -0.1, 0.22);
        },
        onPointerUp: () => { drag.current = null; controls.current.dragging = false; },
        onPointerLeave: () => { drag.current = null; controls.current.dragging = false; },
        onPointerCancel: () => { drag.current = null; controls.current.dragging = false; },
      }
    : {};

  return (
    <div className={className} style={{ touchAction: "pan-y", background: bg }} {...handlers}>
      <Canvas
        dpr={dpr}
        shadows={{ type: THREE.PCFShadowMap }}
        frameloop={still ? "demand" : "always"}
        gl={{ alpha: false, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: still }}
        camera={camera}
        onCreated={({ gl, camera: cam }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
          gl.setClearColor(bg, 1);
          cam.lookAt(0, lookY, 0);
        }}
        style={{ background: bg }}
      >
        <color attach="background" args={[bg]} />
        <fog attach="fog" args={[bg, 34, 78]} />
        <FitCamera lookY={lookY} />
        <StageLights studio={studio} />
        <StudioEnvironment />
        <Model sceneKey={sceneKey} controls={controls} angle={angle} animate={animate && !still} studio={studio} onReady={onReady} />
      </Canvas>
    </div>
  );
}
