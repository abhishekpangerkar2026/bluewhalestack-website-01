"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { SCENES } from "./registry";
import { buildScene, makeMaterials, type BuiltScene } from "./build";

/**
 * Live, rotating version of a product scene. Drag to rotate (springs back),
 * gentle idle sway, pulses travelling down the provider cables. Also drives
 * the static captures (scripts/capture-scenes.mjs) through /scene-capture,
 * where it renders one frame at a fixed angle on a transparent canvas.
 */
export interface LiveSceneProps {
  sceneKey: string;
  className?: string;
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

export function Studio() {
  // the same six-panel studio the offline renderer uses for chrome and glass reflections
  const panel = (p: [number, number, number], r: [number, number, number], w: number, h: number, color: string, key: string) => (
    <mesh position={p} rotation={r} key={key}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  );
  return (
    <Environment resolution={256} frames={1}>
      <mesh><sphereGeometry args={[40, 16, 16]} /><meshBasicMaterial color="#dfe6f4" side={THREE.BackSide} /></mesh>
      {panel([0, 10, 0], [Math.PI / 2, 0, 0], 30, 30, "#ffffff", "top")}
      {panel([0, -6, 0], [Math.PI / 2, 0, 0], 30, 30, "#8fa3c8", "floor")}
      {panel([-12, 4, 0], [0, Math.PI / 2, 0], 12, 10, "#bfd2ff", "left")}
      {panel([12, 4, 0], [0, -Math.PI / 2, 0], 12, 10, "#ffffff", "right")}
      {panel([0, 4, -12], [0, 0, 0], 20, 10, "#2f62e6", "back")}
      {panel([0, 4, 12], [0, Math.PI, 0], 20, 10, "#ffffff", "front")}
    </Environment>
  );
}

export function StageLights() {
  return (
    <>
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
    </>
  );
}

type Controls = { dragging: boolean; targetX: number; targetY: number; reduced: boolean };

function Model({ sceneKey, controls, angle, animate, onReady }: { sceneKey: string; controls: React.MutableRefObject<Controls>; angle?: number; animate: boolean; onReady?: () => void }) {
  const rig = useRef<THREE.Group>(null);
  const [built, setBuilt] = useState<BuiltScene | null>(null);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const def = SCENES[sceneKey];
    if (!def) return;
    let alive = true;
    let scene: BuiltScene | null = null;
    const M = makeMaterials();
    const family = getComputedStyle(document.body).fontFamily || "Inter, system-ui, sans-serif";
    const ready = (document.fonts?.load(`800 100px ${family}`).then(() => document.fonts.ready) ?? Promise.resolve()) as Promise<unknown>;
    ready.then(
      () => { if (!alive) return; scene = buildScene(def, M, family); setBuilt(scene); },
      () => { if (!alive) return; scene = buildScene(def, M, family); setBuilt(scene); },
    );
    return () => {
      alive = false;
      scene?.dispose();
      Object.values(M).forEach((m) => m.dispose());
    };
  }, [sceneKey]);

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
        const idle = animate && !c.reduced ? Math.sin(clock.elapsedTime * 0.32) * 0.16 : 0;
        c.targetY = THREE.MathUtils.damp(c.targetY, idle, 1.6, dt);
        c.targetX = THREE.MathUtils.damp(c.targetX, 0, 1.6, dt);
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <shadowMaterial opacity={0.16} />
      </mesh>
    </group>
  );
}

export function LiveScene({ sceneKey, className, interactive = true, animate = true, angle, still = false, dpr = [1, 1.75], onReady }: LiveSceneProps) {
  const controls = useRef<Controls>({ dragging: false, targetX: 0, targetY: 0, reduced: false });
  const drag = useRef<{ x: number; y: number; ry: number; rx: number } | null>(null);
  // tight framing: the slab fills the 16:9 canvas so the static capture and the live view line up;
  // the six-layer stack is taller, so it sits a little further back
  const stack = SCENES[sceneKey]?.layout === "stack";
  const camera = useMemo(
    () => ({ fov: 24, position: (stack ? [0, 10.4, 24.6] : [0, 9.3, 22.1]) as [number, number, number], near: 0.1, far: 200 }),
    [stack],
  );
  const lookY = stack ? 2.6 : 1.15;

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
    <div className={className} style={{ touchAction: "pan-y" }} {...handlers}>
      <Canvas
        dpr={dpr}
        shadows={{ type: THREE.PCFShadowMap }}
        frameloop={still ? "demand" : "always"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: still }}
        camera={camera}
        onCreated={({ gl, camera: cam }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
          gl.setClearColor(0x000000, 0);
          cam.lookAt(0, lookY, 0);
        }}
        style={{ background: "transparent" }}
      >
        <StageLights />
        <Studio />
        <Model sceneKey={sceneKey} controls={controls} angle={angle} animate={animate && !still} onReady={onReady} />
      </Canvas>
    </div>
  );
}
