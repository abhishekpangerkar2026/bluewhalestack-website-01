/**
 * Builds a product scene as a three.js group from its SceneDef. Pure three.js;
 * no React. One definition drives the live WebGL scene, the static posters and
 * the video clips.
 *
 * Look: a white CGI studio — brushed-silver platforms with blue LED edges,
 * glass and chrome, graphite server racks with blue LEDs, white clouds on
 * floating chrome pucks, glowing ribbon cables — after the official
 * "Product 3D Images" set. Text is drawn to canvas textures in the page's own
 * Inter face, sized to stay legible at hero width.
 */
import * as THREE from "three";
import { DEFAULT_PROVIDERS, type SceneDef } from "./registry";

/* ── geometry constants (rig space: the floor is y = 0) ─────────── */
export const BW = 14.5, BD = 8.2, BH = 1.35;
const PLINTH = 0.28;
const SLAB_TOP = PLINTH + BH + 0.24; // 1.87 — the base slab's top surface
const SHELF_Y = PLINTH + BH + 0.12; // 1.75 — where things stand on the slab
const GX = [-3.3, 0, 3.3];
const GZ = 0.95;
const GY = SHELF_Y + 0.26;
const OBJ_Y = GY + 0.16 + 0.04;
const SCREEN_Z = -1.5;
const SCREEN_TILT = -0.42;
const SCREEN_W = 10.2, SCREEN_H = 2.9;
const PILL_Y = 6.3, PILL_Z = -1.6;
export const CABLE_TARGETS_X = [-4.2, -2.9, -1.6, 0, 1.6, 2.9, 4.2];

export type Materials = ReturnType<typeof makeMaterials>;

const phys = (color: number, p: Partial<THREE.MeshPhysicalMaterialParameters>) => new THREE.MeshPhysicalMaterial({ color, ...p });

export function makeMaterials() {
  const mats = {
    /* platforms */
    base: phys(0xe4e8ee, { roughness: 0.3, metalness: 0.62, clearcoat: 1, clearcoatRoughness: 0.2 }),
    baseDeep: phys(0x0d2f8f, { roughness: 0.32, metalness: 0.1, clearcoat: 0.9, clearcoatRoughness: 0.1 }),
    chrome: phys(0xeef2f8, { roughness: 0.1, metalness: 1.0, clearcoat: 1 }),
    steel: phys(0xb8c2d3, { roughness: 0.3, metalness: 0.9 }),
    graphite: phys(0x222a38, { roughness: 0.38, metalness: 0.6, clearcoat: 0.7, clearcoatRoughness: 0.2 }),
    glass: phys(0xd8e6ff, { roughness: 0.04, metalness: 0, transparent: true, opacity: 0.4, clearcoat: 1, depthWrite: false }),
    frost: phys(0xf2f6ff, { roughness: 0.22, metalness: 0, transparent: true, opacity: 0.92, clearcoat: 1 }),
    /* accents */
    blue: phys(0x1d5ce6, { roughness: 0.22, metalness: 0.15, clearcoat: 1 }),
    blueLight: phys(0x7fb3ff, { roughness: 0.25, metalness: 0.05, clearcoat: 1 }),
    cloud: phys(0xf9fbff, { roughness: 0.32, metalness: 0, clearcoat: 0.9, clearcoatRoughness: 0.35 }),
    white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }),
    gold: phys(0xe4bf66, { roughness: 0.28, metalness: 0.9 }),
    green: phys(0x2e9c5a, { roughness: 0.4, clearcoat: 0.6 }),
    leaf: new THREE.MeshStandardMaterial({ color: 0x3e9a48, roughness: 0.75 }),
    navy: new THREE.MeshStandardMaterial({ color: 0x0b2a7a, roughness: 0.5 }),
    slot: new THREE.MeshStandardMaterial({ color: 0x10182a, roughness: 0.5, metalness: 0.4 }),
    ring: new THREE.MeshBasicMaterial({ color: 0xdbe6ff, transparent: true, opacity: 0.6 }),
    /* lights — unlit so they stay saturated in the white studio */
    led: new THREE.MeshBasicMaterial({ color: 0x6fb4ff, toneMapped: false }),
    ledGlow: new THREE.MeshBasicMaterial({ color: 0x2f7dff, transparent: true, opacity: 0.5, depthWrite: false, toneMapped: false }),
    cableCore: new THREE.MeshBasicMaterial({ color: 0xeaf4ff, toneMapped: false }),
    cableGlow: new THREE.MeshBasicMaterial({ color: 0x2f7dff, transparent: true, opacity: 0.55, depthWrite: false, toneMapped: false }),
    pulse: new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }),
  };
  (Object.entries(mats) as [string, THREE.Material][]).forEach(([k, m]) => {
    if ("envMapIntensity" in m) {
      (m as THREE.MeshStandardMaterial).envMapIntensity =
        k === "chrome" || k === "steel" || k === "base" ? 1.0 : k === "glass" || k === "frost" || k === "cloud" ? 0.6 : 0.35;
    }
  });
  return mats;
}

/* ── canvas textures (drawn in the site's Inter face) ───────────── */
export type FontFamily = string;

function texture(draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  draw(g, w, h);
  // debug hook for scripts: the last console-panel canvas drawn
  if (w === 2560 && h === 640) (window as unknown as { __uiCanvas?: HTMLCanvasElement }).__uiCanvas = c;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

function roundRectPath(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** A nameplate: brushed plate, hairline border, centred text. Returns the texture and its aspect. */
function chipTexture(text: string, family: FontFamily, opts: { style: "plate" | "dark"; px: number; weight: number; padX: number; h: number }) {
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = `${opts.weight} ${opts.px}px ${family}`;
  const tw = Math.ceil(probe.measureText(text).width);
  const w = tw + opts.padX * 2;
  const h = opts.h;
  const tex = texture((g) => {
    const plate = opts.style === "plate";
    g.shadowColor = "rgba(11,42,122,0.22)";
    g.shadowBlur = h * 0.12;
    g.shadowOffsetY = h * 0.04;
    const grad = g.createLinearGradient(0, 0, 0, h);
    if (plate) { grad.addColorStop(0, "#ffffff"); grad.addColorStop(1, "#e4eaf3"); }
    else { grad.addColorStop(0, "#123a9e"); grad.addColorStop(1, "#0b2a7a"); }
    g.fillStyle = grad;
    roundRectPath(g, 2, 2, w - 4, h - 4, h * 0.26);
    g.fill();
    g.shadowColor = "transparent";
    g.lineWidth = Math.max(2, h * 0.02);
    g.strokeStyle = plate ? "rgba(11,42,122,0.28)" : "rgba(255,255,255,0.3)";
    g.stroke();
    // LED underline on the plate
    g.fillStyle = plate ? "rgba(47,125,255,0.85)" : "rgba(140,200,255,0.9)";
    roundRectPath(g, w * 0.18, h - h * 0.14, w * 0.64, h * 0.045, h * 0.02);
    g.fill();
    g.fillStyle = plate ? "#0b2a7a" : "#ffffff";
    g.font = `${opts.weight} ${opts.px}px ${family}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(text, w / 2, h / 2 - opts.px * 0.02);
  }, w, h);
  return { tex, aspect: w / h };
}

function chipMesh(text: string, family: FontFamily, height: number, style: "plate" | "dark" = "plate", px = 96) {
  const { tex, aspect } = chipTexture(text, family, { style, px, weight: 700, padX: px * 0.7, h: px * 2.1 });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(height * aspect, height), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false }));
  m.renderOrder = 2;
  return m;
}

/** Faint circuit traces for the platform top — a grid with a few brighter runs and pads. */
function traceTexture() {
  return texture((g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.strokeStyle = "rgba(47,125,255,0.14)"; g.lineWidth = 2;
    for (let x = 0; x <= w; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
    for (let y = 0; y <= h; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    g.strokeStyle = "rgba(47,125,255,0.42)"; g.lineWidth = 5; g.lineCap = "round";
    const runs: [number, number, number, number][] = [[96, 160, 96, 620], [96, 620, 420, 620], [w - 96, 160, w - 96, 700], [w - 96, 700, w - 380, 700], [520, 80, 520, 260], [w - 520, 80, w - 520, 260], [300, h - 90, w - 300, h - 90]];
    runs.forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
    g.fillStyle = "rgba(47,125,255,0.5)";
    [[96, 160], [420, 620], [w - 96, 160], [w - 380, 700], [520, 260], [w - 520, 260], [300, h - 90], [w - 300, h - 90]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 9, 0, Math.PI * 2); g.fill(); });
  }, 2048, 1152);
}

/** Radial glow disc (blue → transparent) for LED underlight on the floor. */
function glowTexture() {
  return texture((g, w, h) => {
    const grad = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grad.addColorStop(0, "rgba(47,125,255,0.55)");
    grad.addColorStop(0.55, "rgba(47,125,255,0.2)");
    grad.addColorStop(1, "rgba(47,125,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
  }, 512, 512);
}

/* ── primitive builders ─────────────────────────────────────────── */
function roundedRect(w: number, d: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -d / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + d - r); s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

type Ctx = { scene: THREE.Group; M: Materials; family: FontFamily };

function slab(c: Ctx, x: number, y: number, z: number, w: number, d: number, h: number, r: number, mat: THREE.Material, bevel = 0.06, parent: THREE.Object3D = c.scene) {
  const g = new THREE.ExtrudeGeometry(roundedRect(w, d, r), { depth: h, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 4, curveSegments: 16 });
  g.rotateX(-Math.PI / 2);
  g.translate(0, bevel, 0);
  const m = new THREE.Mesh(g, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
/** Blue LED strip running around a slab's top edge (core + soft glow). */
function ledRim(c: Ctx, x: number, y: number, z: number, w: number, d: number, r: number, inset: number, parent: THREE.Object3D = c.scene, radius = 0.045) {
  const pts = roundedRect(w - inset * 2, d - inset * 2, Math.max(0.05, r - inset)).getPoints(40).map((p) => new THREE.Vector3(p.x, 0, -p.y));
  const curve = new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.01);
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 160, radius, 8, true), c.M.led));
  const glow = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, radius * 3.2, 8, true), c.M.ledGlow);
  glow.renderOrder = 1;
  g.add(glow);
  parent.add(g);
  return g;
}
function box(c: Ctx, x: number, y: number, z: number, w: number, h: number, d: number, mat: THREE.Material, parent: THREE.Object3D = c.scene) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
}
function cyl(c: Ctx, x: number, y: number, z: number, r: number, h: number, mat: THREE.Material, parent: THREE.Object3D = c.scene, seg = 40) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
  m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
}
function group(c: Ctx, x: number, y: number, z: number) {
  const g = new THREE.Group(); g.position.set(x, y, z); c.scene.add(g); return g;
}

/* ── object sets ─────────────────────────────────────────────────── */
function rackStack(c: Ctx, x: number, z: number, units = 4, w = 1.25, d = 0.95) {
  const g = group(c, x, OBJ_Y, z);
  const h = units * 0.36;
  box(c, 0, h / 2, 0, w, h, d, c.M.graphite, g);
  // chrome frame: corner posts and a cap
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => box(c, sx * (w / 2 - 0.03), h / 2, sz * (d / 2 - 0.03), 0.07, h + 0.02, 0.07, c.M.chrome, g));
  box(c, 0, h + 0.02, 0, w + 0.02, 0.05, d + 0.02, c.M.chrome, g);
  for (let i = 0; i < units; i++) {
    const y = 0.18 + i * 0.36;
    box(c, 0, y, d / 2 + 0.01, w - 0.22, 0.24, 0.02, c.M.slot, g);
    box(c, -w / 2 + 0.3, y + 0.06, d / 2 + 0.03, 0.34, 0.035, 0.01, c.M.led, g);
    box(c, -w / 2 + 0.3, y - 0.04, d / 2 + 0.03, 0.22, 0.035, 0.01, c.M.led, g);
    box(c, w / 2 - 0.24, y, d / 2 + 0.03, 0.07, 0.07, 0.02, i % 2 ? c.M.led : c.M.green, g);
  }
  return g;
}
function dbStack(c: Ctx, x: number, z: number, n = 3, r = 0.55) {
  const g = group(c, x, OBJ_Y, z);
  for (let i = 0; i < n; i++) {
    cyl(c, 0, 0.16 + i * 0.36, 0, r, 0.3, i === n - 1 ? c.M.blue : c.M.chrome, g);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r + 0.005, 0.018, 8, 48), c.M.led); ring.rotation.x = Math.PI / 2; ring.position.y = 0.16 + i * 0.36 - 0.12; g.add(ring);
  }
  return g;
}
function cubeCluster(c: Ctx, x: number, z: number, s = 0.62) {
  const g = group(c, x, OBJ_Y, z);
  [[-0.5, 0, 0], [0.55, 0, 0.15], [0, 1, -0.05]].forEach(([px, py, pz], i) =>
    box(c, px * s, s / 2 + py * s * 1.02, pz * s, s, s, s, i === 1 ? c.M.chrome : c.M.blue, g));
  return g;
}
function magnifier(c: Ctx, x: number, y: number, z: number, s = 1) {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.08, 16, 48), c.M.chrome); ring.castShadow = true; g.add(ring);
  const lens = new THREE.Mesh(new THREE.CircleGeometry(0.36, 32), c.M.glass); g.add(lens);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.8, 16), c.M.graphite); handle.position.set(0.58, -0.58, 0); handle.rotation.z = Math.PI / 4; handle.castShadow = true; g.add(handle);
  g.rotation.set(0.35, -0.5, 0); g.scale.setScalar(s); g.position.set(x, y, z); c.scene.add(g); return g;
}
function coinStack(c: Ctx, x: number, z: number, n = 3, r = 0.42) {
  const g = group(c, x, OBJ_Y, z);
  for (let i = 0; i < n; i++) cyl(c, 0, 0.05 + i * 0.11, 0, r, 0.09, c.M.gold, g);
  return g;
}
function bars(c: Ctx, x: number, z: number, hs = [0.5, 0.9, 1.3]) {
  const g = group(c, x, OBJ_Y, z);
  hs.forEach((h, i) => box(c, (i - 1) * 0.62, h / 2, 0, 0.42, h, 0.42, i === 2 ? c.M.blue : c.M.chrome, g));
  return g;
}
function aiCube(c: Ctx, x: number, z: number, s = 1.2) {
  const g = group(c, x, OBJ_Y, z);
  box(c, 0, s / 2, 0, s, s, s, c.M.blue, g);
  const tex = texture((gg, w, h) => { gg.fillStyle = "#fff"; gg.font = `900 ${Math.round(h * 0.56)}px ${c.family}`; gg.textAlign = "center"; gg.textBaseline = "middle"; gg.fillText("AI", w / 2, h / 2 + h * 0.03); }, 512, 512);
  const f = new THREE.Mesh(new THREE.PlaneGeometry(s * 0.9, s * 0.9), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
  f.position.set(0, s / 2, s / 2 + 0.01); g.add(f);
  ledRim(c, 0, s + 0.01, 0, s, s, 0.08, 0.06, g, 0.03);
  return g;
}
function nodes(c: Ctx, x: number, z: number, n = 6) {
  const g = group(c, x, OBJ_Y, z);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2; const px = Math.cos(a) * 0.9, pz = Math.sin(a) * 0.9;
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), i % 2 ? c.M.chrome : c.M.led); s.position.set(px, 0.3 + (i % 2) * 0.5, pz); s.castShadow = true; g.add(s);
    const cc = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1, 8), c.M.blueLight); cc.position.set(px / 2, 0.4, pz / 2); cc.lookAt(new THREE.Vector3(px, 0.3 + (i % 2) * 0.5, pz)); cc.rotateX(Math.PI / 2); g.add(cc);
  }
  return g;
}
function shield3d(c: Ctx, x: number, z: number, s = 1, baseY = OBJ_Y) {
  const sh = new THREE.Shape(); sh.moveTo(0, 1); sh.lineTo(0.8, 0.65); sh.lineTo(0.8, 0); sh.quadraticCurveTo(0.8, -0.6, 0, -1); sh.quadraticCurveTo(-0.8, -0.6, -0.8, 0); sh.lineTo(-0.8, 0.65); sh.closePath();
  const g = new THREE.Group();
  const back = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3 }), c.M.chrome); back.scale.set(1.1, 1.1, 1); g.add(back);
  const front = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3 }), c.M.blue); front.position.z = 0.08; g.add(front);
  const chk = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-0.38, -0.05, 0.36), new THREE.Vector3(-0.1, -0.32, 0.36), new THREE.Vector3(0.42, 0.36, 0.36)]), 24, 0.07, 12, false), c.M.white); g.add(chk);
  g.children.forEach((ch) => (ch.castShadow = true));
  g.scale.setScalar(s); g.position.set(x, baseY + 1.05 * s, z); c.scene.add(g); return g;
}
function docs(c: Ctx, x: number, z: number) {
  const g = group(c, x, OBJ_Y, z);
  [0, 1, 2].forEach((i) => {
    box(c, i * 0.25, 0.7, -i * 0.22, 1.1, 1.4, 0.05, c.M.white, g);
    [0.35, 0.12, -0.11, -0.34].forEach((ly, k) => box(c, i * 0.25 + (k === 0 ? -0.15 : 0), 0.7 + ly, -i * 0.22 + 0.035, k === 0 ? 0.55 : 0.8, 0.06, 0.02, c.M.blueLight, g));
  });
  return g;
}
function lock3d(c: Ctx, x: number, z: number, s = 1, baseY = OBJ_Y) {
  const g = group(c, x, baseY, z);
  box(c, 0, 0.4, 0, 1.0, 0.8, 0.5, c.M.gold, g);
  const sh = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.08, 16, 48, Math.PI), c.M.chrome); sh.position.y = 0.8; sh.castShadow = true; g.add(sh);
  g.scale.setScalar(s); return g;
}
function globe3d(c: Ctx, x: number, z: number, r = 0.62, baseY = OBJ_Y) {
  const g = group(c, x, baseY + r + 0.22, z);
  const s = new THREE.Mesh(new THREE.SphereGeometry(r, 40, 40), c.M.blue); s.castShadow = true; g.add(s);
  for (let i = 0; i < 3; i++) { const t = new THREE.Mesh(new THREE.TorusGeometry(r * 1.006, 0.012, 8, 96), c.M.ring); t.rotation.y = (i * Math.PI) / 3; g.add(t); }
  [-0.45, 0, 0.45].forEach((ly) => { const rr = Math.sqrt(r * r - ly * ly); const t = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.012, 8, 96), c.M.ring); t.rotation.x = Math.PI / 2; t.position.y = ly; g.add(t); });
  cyl(c, 0, -r - 0.1, 0, 0.5, 0.12, c.M.chrome, g);
  return g;
}
function miniPlatform(c: Ctx, x: number, z: number, mat: THREE.Material) { slab(c, x, OBJ_Y, z, 1.6, 1.6, 0.18, 0.2, mat, 0.03); }
function arrow3d(c: Ctx, from: [number, number, number], to: [number, number, number], mat = c.M.blue) {
  const mid = new THREE.Vector3((from[0] + to[0]) / 2, Math.max(from[1], to[1]) + 0.7, (from[2] + to[2]) / 2);
  const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(...from), mid, new THREE.Vector3(...to)]), 48, 0.07, 12, false), mat);
  m.castShadow = true; c.scene.add(m);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.45, 24), mat); cone.position.set(...to); cone.lookAt(mid); cone.rotateX(-Math.PI / 2); c.scene.add(cone);
}
function stackMini(c: Ctx, x: number, z: number) {
  slab(c, x, OBJ_Y, z, 2.0, 2.0, 0.22, 0.25, c.M.base, 0.03);
  ledRim(c, x, OBJ_Y + 0.25, z, 2.0, 2.0, 0.25, 0.08, c.scene, 0.025);
  slab(c, x, OBJ_Y + 0.5, z, 1.4, 1.4, 0.2, 0.2, c.M.blue, 0.03);
  slab(c, x, OBJ_Y + 0.95, z, 0.85, 0.85, 0.16, 0.15, c.M.frost, 0.03);
}
function cloud3d(c: Ctx, x: number, y: number, z: number, s = 0.6, parent: THREE.Object3D = c.scene) {
  const g = new THREE.Group();
  ([[0, 0, 0, 0.42], [0.4, 0.12, 0, 0.32], [-0.38, 0.06, 0.05, 0.3], [0.1, 0.28, -0.05, 0.3], [0.02, -0.12, 0.2, 0.26]] as const).forEach(([cx, cy, cz, r]) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 20), c.M.cloud); m.position.set(cx, cy, cz); m.castShadow = true; g.add(m);
  });
  g.scale.setScalar(s); g.position.set(x, y, z); parent.add(g); return g;
}
function edgeBox(c: Ctx, x: number, z: number, w = 1.6) {
  const g = group(c, x, OBJ_Y, z);
  box(c, 0, 0.3, 0, w, 0.6, 1.1, c.M.chrome, g);
  box(c, 0, 0.3, 0.56, w - 0.3, 0.35, 0.02, c.M.slot, g);
  box(c, w / 2 - 0.35, 0.3, 0.58, 0.1, 0.1, 0.02, c.M.led, g);
  box(c, -w / 2 + 0.45, 0.3, 0.58, 0.4, 0.04, 0.01, c.M.led, g);
  return g;
}
function antenna(c: Ctx, x: number, z: number, h = 1.9) {
  const g = group(c, x, OBJ_Y, z);
  cyl(c, 0, h / 2, 0, 0.05, h, c.M.steel, g, 12);
  cyl(c, 0, 0.06, 0, 0.4, 0.12, c.M.chrome, g);
  [0.55, 0.8].forEach((r, i) => { const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 8, 40, Math.PI * 0.9), c.M.blueLight); t.position.y = h - 0.15; t.rotation.z = Math.PI * 0.55; t.position.x = -0.05 - i * 0.05; g.add(t); });
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), c.M.led); dot.position.y = h; g.add(dot);
  return g;
}
function tenantTiles(c: Ctx, x: number, z: number) {
  [x - 0.55, x + 0.55].forEach((tx, i) => {
    slab(c, tx, OBJ_Y, z + (i ? 0.5 : -0.4), 1.0, 1.0, 0.16, 0.15, c.M.glass, 0.03);
    box(c, tx, OBJ_Y + 0.16 + 0.28, z + (i ? 0.5 : -0.4), 0.5, 0.5, 0.5, i ? c.M.chrome : c.M.blue);
  });
}
/** A studio planter: chrome pot with a leafy shrub. */
function planter(c: Ctx, x: number, z: number, s = 1) {
  const g = group(c, x, 0, z);
  cyl(c, 0, 0.3, 0, 0.42, 0.6, c.M.chrome, g);
  cyl(c, 0, 0.6, 0, 0.36, 0.04, c.M.slot, g);
  ([[0, 0.95, 0, 0.34], [0.26, 0.85, 0.1, 0.26], [-0.25, 0.9, -0.06, 0.28], [0.05, 1.22, -0.12, 0.26], [-0.08, 0.78, 0.26, 0.22], [0.2, 1.12, 0.18, 0.2]] as const).forEach(([px, py, pz, r]) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), c.M.leaf); m.position.set(px, py, pz); m.scale.set(1, 1.25, 1); m.castShadow = true; g.add(m);
  });
  g.scale.setScalar(s);
  return g;
}

/* ── centre object sets ──────────────────────────────────────────── */
const CENTER: Record<string, (c: Ctx) => void> = {
  inventory: (c) => { rackStack(c, GX[0] - 0.55, GZ - 0.1); rackStack(c, GX[0] + 0.75, GZ + 0.35, 4); dbStack(c, GX[1] - 0.6, GZ - 0.2); dbStack(c, GX[1] + 0.55, GZ + 0.45, 2, 0.45); cubeCluster(c, GX[2] - 0.2, GZ - 0.2); magnifier(c, GX[2] + 1.15, OBJ_Y + 1.0, GZ + 1.5, 0.85); },
  whalenomics: (c) => { coinStack(c, GX[0] - 0.5, GZ - 0.2, 4); coinStack(c, GX[0] + 0.5, GZ + 0.4, 2); bars(c, GX[1], GZ); cubeCluster(c, GX[2], GZ, 0.5); magnifier(c, GX[2] + 1.6, OBJ_Y + 1.2, GZ + 1.3, 0.9); },
  "whale-ai": (c) => { rackStack(c, GX[0], GZ, 4, 1.1, 0.85); aiCube(c, GX[1], GZ, 1.2); nodes(c, GX[1], GZ - 0.1); lock3d(c, GX[2], GZ, 0.9); docs(c, GX[2] + 0.2, GZ - 0.6); },
  migration: (c) => { rackStack(c, GX[0], GZ, 4, 1.1, 0.85); miniPlatform(c, GX[1] - 0.3, GZ + 0.2, c.M.baseDeep); cubeCluster(c, GX[1] - 0.3, GZ + 0.2, 0.42); stackMini(c, GX[2], GZ); arrow3d(c, [GX[1] + 0.4, OBJ_Y + 0.9, GZ], [GX[2] - 0.5, OBJ_Y + 1.3, GZ]); },
  audit: (c) => { docs(c, GX[0], GZ); shield3d(c, GX[1], GZ, 0.72); lock3d(c, GX[2] - 0.4, GZ + 0.3, 0.8); magnifier(c, GX[2] + 1.0, OBJ_Y + 1.2, GZ + 1.2, 0.9); },
  sovereign: (c) => { lock3d(c, GX[0], GZ, 1.0); globe3d(c, GX[1], GZ, 0.62); rackStack(c, GX[2] - 0.5, GZ - 0.1, 4, 1.1, 0.85); cloud3d(c, GX[2] + 1.3, OBJ_Y + 1.6, GZ + 0.6, 0.55); },
  platform: (c) => { cloud3d(c, GX[0] - 0.4, OBJ_Y + 1.2, GZ, 0.7); cloud3d(c, GX[0] + 0.7, OBJ_Y + 0.7, GZ + 0.6, 0.5); rackStack(c, GX[1] - 0.6, GZ - 0.1, 4, 1.1, 0.85); dbStack(c, GX[1] + 0.7, GZ + 0.4, 2, 0.45); stackMini(c, GX[2], GZ); },
  connectors: (c) => { cloud3d(c, GX[0] - 0.5, OBJ_Y + 1.1, GZ - 0.2, 0.75); cloud3d(c, GX[0] + 0.7, OBJ_Y + 0.6, GZ + 0.6, 0.5); rackStack(c, GX[1] - 0.6, GZ - 0.1, 4, 1.1, 0.85); rackStack(c, GX[1] + 0.7, GZ + 0.4, 3, 1.0, 0.8); edgeBox(c, GX[2], GZ); },
  provisioning: (c) => { docs(c, GX[0], GZ); cubeCluster(c, GX[1], GZ, 0.55); stackMini(c, GX[2], GZ); },
  "landing-zone": (c) => { stackMini(c, GX[0], GZ); shield3d(c, GX[1], GZ, 0.72); cubeCluster(c, GX[2], GZ, 0.5); },
  whaleforge: (c) => { docs(c, GX[0], GZ); arrow3d(c, [GX[0] + 0.9, OBJ_Y + 1.0, GZ], [GX[1] - 0.7, OBJ_Y + 1.0, GZ]); cubeCluster(c, GX[1], GZ, 0.5); arrow3d(c, [GX[1] + 0.8, OBJ_Y + 1.0, GZ], [GX[2] - 0.8, OBJ_Y + 1.0, GZ]); stackMini(c, GX[2], GZ); },
  identity: (c) => { nodes(c, GX[0], GZ, 6); shield3d(c, GX[1], GZ, 0.72); lock3d(c, GX[2], GZ, 1.0); },
  observe: (c) => { docs(c, GX[0], GZ - 0.2); bars(c, GX[1], GZ, [0.5, 0.9, 1.3]); nodes(c, GX[2], GZ, 5); magnifier(c, GX[2] + 1.15, OBJ_Y + 1.0, GZ + 1.4, 0.8); },
  itsm: (c) => { docs(c, GX[0], GZ); rackStack(c, GX[1] - 0.5, GZ - 0.1, 4, 1.1, 0.85); dbStack(c, GX[1] + 0.7, GZ + 0.4, 2, 0.42); cubeCluster(c, GX[2], GZ, 0.5); },
  datacenter: (c) => { rackStack(c, GX[0] - 0.6, GZ - 0.1, 4, 1.1, 0.85); rackStack(c, GX[0] + 0.6, GZ + 0.4, 4, 1.0, 0.8); rackStack(c, GX[1], GZ, 4, 1.3, 1.0); cloud3d(c, GX[1] + 1.1, OBJ_Y + 2.1, GZ - 0.6, 0.45); coinStack(c, GX[2] - 0.5, GZ - 0.2, 4); coinStack(c, GX[2] + 0.5, GZ + 0.4, 2); },
  fabric: (c) => { rackStack(c, GX[0] - 0.55, GZ - 0.1, 4, 1.2, 0.9); rackStack(c, GX[0] + 0.7, GZ + 0.4, 4, 1.2, 0.9); rackStack(c, GX[1] - 0.5, GZ - 0.1, 4, 1.05, 0.8); rackStack(c, GX[1] + 0.6, GZ + 0.4, 3, 1.0, 0.8); rackStack(c, GX[2] - 0.4, GZ, 3, 0.9, 0.7); cloud3d(c, GX[2] + 0.9, OBJ_Y + 1.4, GZ + 0.4, 0.55); },
  tenancy: (c) => { tenantTiles(c, GX[0], GZ); docs(c, GX[1], GZ); coinStack(c, GX[2] - 0.5, GZ - 0.2, 4); coinStack(c, GX[2] + 0.5, GZ + 0.4, 2); },
  estate: (c) => { cloud3d(c, GX[0] - 0.5, OBJ_Y + 1.25, GZ - 0.1, 0.75); cloud3d(c, GX[0] + 0.7, OBJ_Y + 0.65, GZ + 0.6, 0.5); rackStack(c, GX[1] - 0.6, GZ - 0.1, 4, 1.1, 0.85); dbStack(c, GX[1] + 0.7, GZ + 0.45, 2, 0.45); edgeBox(c, GX[2] - 0.35, GZ - 0.2, 1.4); antenna(c, GX[2] + 0.85, GZ + 0.55, 1.3); },
  standard: (c) => { cloud3d(c, GX[0], OBJ_Y + 0.95, GZ, 0.7); cloud3d(c, GX[1], OBJ_Y + 0.95, GZ, 0.7); cloud3d(c, GX[2], OBJ_Y + 0.95, GZ, 0.7); coinStack(c, GX[1] + 0.9, GZ + 0.6, 3, 0.3); },
  enterprise: (c) => { cloud3d(c, GX[0] - 0.4, OBJ_Y + 1.2, GZ, 0.7); cloud3d(c, GX[0] + 0.7, OBJ_Y + 0.7, GZ + 0.6, 0.5); rackStack(c, GX[1] - 0.6, GZ - 0.1, 4, 1.1, 0.85); shield3d(c, GX[1] + 0.75, GZ + 0.45, 0.62); edgeBox(c, GX[2] - 0.2, GZ + 0.4, 1.4); globe3d(c, GX[2] + 0.7, GZ - 0.5, 0.5); },
  telco: (c) => { antenna(c, GX[0] - 0.7, GZ + 0.5, 1.4); nodes(c, GX[0] + 0.5, GZ - 0.1, 5); rackStack(c, GX[1] - 0.5, GZ - 0.1, 4, 1.1, 0.85); rackStack(c, GX[1] + 0.65, GZ + 0.4, 4, 1.0, 0.8); tenantTiles(c, GX[2], GZ); },
  government: (c) => { lock3d(c, GX[0] - 0.5, GZ - 0.2, 0.9); shield3d(c, GX[0] + 0.55, GZ + 0.4, 0.62); edgeBox(c, GX[1], GZ + 0.2, 1.5); globe3d(c, GX[2] - 0.3, GZ - 0.1, 0.62); antenna(c, GX[2] + 0.95, GZ + 0.6, 1.3); },
  "sol-inventory": (c) => { cloud3d(c, GX[0] - 0.4, OBJ_Y + 1.15, GZ - 0.1, 0.7); rackStack(c, GX[0] + 0.7, GZ + 0.4, 3, 0.95, 0.75); cubeCluster(c, GX[1], GZ, 0.55); dbStack(c, GX[2] - 0.55, GZ - 0.1, 3, 0.45); magnifier(c, GX[2] + 0.8, OBJ_Y + 1.1, GZ + 1.2, 0.9); },
  "sol-provisioning": (c) => { docs(c, GX[0], GZ); aiCube(c, GX[1], GZ, 1.2); stackMini(c, GX[2], GZ); },
  "sol-observe": (c) => { rackStack(c, GX[0] - 0.4, GZ, 4, 1.0, 0.8); nodes(c, GX[0] + 0.9, GZ + 0.3, 4); bars(c, GX[1], GZ, [0.5, 0.9, 1.3]); docs(c, GX[2] - 0.2, GZ - 0.2); magnifier(c, GX[2] + 0.95, OBJ_Y + 1.0, GZ + 1.3, 0.8); },
  "sol-migration": (c) => { rackStack(c, GX[0] - 0.5, GZ - 0.1, 4, 1.1, 0.85); rackStack(c, GX[0] + 0.7, GZ + 0.4, 3, 0.95, 0.75); docs(c, GX[1], GZ); arrow3d(c, [GX[1] + 0.8, OBJ_Y + 1.0, GZ], [GX[2] - 0.8, OBJ_Y + 1.3, GZ]); cloud3d(c, GX[2] - 0.2, OBJ_Y + 1.5, GZ - 0.4, 0.6); stackMini(c, GX[2] + 0.2, GZ + 0.2); },
  "sol-security": (c) => { nodes(c, GX[0], GZ, 6); shield3d(c, GX[1], GZ, 0.72); docs(c, GX[2] - 0.5, GZ); lock3d(c, GX[2] + 0.75, GZ + 0.4, 0.7); },
  "sol-sovereign": (c) => { globe3d(c, GX[0], GZ, 0.62); edgeBox(c, GX[1] - 0.2, GZ + 0.2, 1.5); lock3d(c, GX[1] + 0.9, GZ - 0.4, 0.6); aiCube(c, GX[2], GZ, 1.1); },
};

/* ── console screen texture ──────────────────────────────────────── */
function uiPanelTexture(def: SceneDef, family: FontFamily) {
  const W = 2560, H = 640;
  return texture((g) => {
    g.clearRect(0, 0, W, H);
    // sizes are chosen so the smallest words are still ~14px tall at a 640px-wide hero
    g.fillStyle = "#0b2a7a"; g.textAlign = "left"; g.textBaseline = "middle";
    let fs = 140;
    do { g.font = `800 ${fs}px ${family}`; fs -= 4; } while (g.measureText(def.ui.title).width > W - 180 && fs > 70);
    g.fillText(def.ui.title, 90, 108);
    // buttons first, sized to their labels, right-aligned; the search bar takes what is left
    g.font = `700 92px ${family}`;
    const bw = def.ui.buttons.map((b) => Math.ceil(g.measureText(b).width) + 140);
    const gap = 36;
    const totalB = bw.reduce((a, b) => a + b, 0) + gap * Math.max(0, bw.length - 1);
    const sy = 205, sh = 180, sx = 90;
    let bx = W - 90 - totalB;
    const sw = Math.max(600, bx - 60 - sx);
    g.fillStyle = "#ffffff"; g.strokeStyle = "rgba(26,71,201,.3)"; g.lineWidth = 6;
    roundRectPath(g, sx, sy, sw, sh, 56); g.fill(); g.stroke();
    g.fillStyle = "#6b7a99"; g.font = `600 88px ${family}`;
    g.strokeStyle = "#6b7a99"; g.lineWidth = 11; g.beginPath(); g.arc(sx + 92, sy + sh / 2 - 10, 30, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.moveTo(sx + 114, sy + sh / 2 + 12); g.lineTo(sx + 142, sy + sh / 2 + 40); g.stroke();
    let search = def.ui.search.replace(/…$/, "...");
    const maxW = sw - 300;
    while (search.length > 3 && g.measureText(search).width > maxW) search = search.replace(/\.\.\.$/, "").slice(0, -1).trimEnd() + "...";
    if (search.length < 12) search = "Search";
    g.fillText(search, sx + 180, sy + sh / 2 + 5);
    def.ui.buttons.forEach((b, i) => {
      const w = bw[i];
      g.fillStyle = i === 0 ? "#1a47c9" : "#ffffff"; g.strokeStyle = "rgba(26,71,201,.35)"; g.lineWidth = 6;
      roundRectPath(g, bx, sy, w, sh, 40); g.fill(); g.stroke();
      g.fillStyle = i === 0 ? "#ffffff" : "#0b2a7a"; g.font = `700 92px ${family}`; g.textAlign = "center";
      g.fillText(b, bx + w / 2, sy + sh / 2 + 5); g.textAlign = "left";
      bx += w + gap;
    });
    // a hint of a table under the toolbar
    g.fillStyle = "rgba(26,71,201,0.10)";
    [430, 522].forEach((y) => { roundRectPath(g, 90, y, W - 180, 62, 20); g.fill(); });
    g.fillStyle = "rgba(26,71,201,0.35)";
    [[130, 430, 520], [130, 522, 380], [1300, 430, 420], [1300, 522, 640]].forEach(([x, y, w]) => { roundRectPath(g, x, y + 16, w, 30, 10); g.fill(); });
    g.fillStyle = "#22c55e"; [[2280, 430], [2280, 522]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y + 31, 13, 0, Math.PI * 2); g.fill(); });
  }, W, H);
}

/* ── scene assembly ──────────────────────────────────────────────── */
export interface BuiltScene {
  group: THREE.Group;
  /** glowing cable curves (provider puck → platform) for the pulse animation */
  cables: THREE.CatmullRomCurve3[];
  pulses: THREE.Mesh[];
  dispose(): void;
}

const PROVIDER_KIND = (name: string): "cloud" | "rack" | "edge" =>
  /on-prem|rack|air-gapped|power|cooling|national|regional|gpu|tier|core/i.test(name) ? "rack" : /edge|mec|agent|site/i.test(name) ? "edge" : "cloud";

export function buildScene(def: SceneDef, M: Materials, family: FontFamily): BuiltScene {
  const root = new THREE.Group();
  const c: Ctx = { scene: root, M, family };
  const cables: THREE.CatmullRomCurve3[] = [];
  const pulses: THREE.Mesh[] = [];

  /* floor underlight, chrome plinth, brushed-silver base with an LED edge and the wordmark */
  {
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(BW * 1.5, BD * 1.9), new THREE.MeshBasicMaterial({ map: glowTexture(), transparent: true, depthWrite: false, toneMapped: false }));
    glow.rotation.x = -Math.PI / 2; glow.position.y = 0.012; glow.renderOrder = 1; root.add(glow);
  }
  slab(c, 0, 0, 0, BW + 0.5, BD + 0.5, PLINTH, 1.0, M.chrome, 0.08);
  ledRim(c, 0, PLINTH + 0.16 - 0.05, 0, BW + 0.5, BD + 0.5, 1.0, 0.09, root, 0.035);
  slab(c, 0, PLINTH, 0, BW, BD, BH, 0.9, M.base, 0.12);
  ledRim(c, 0, SLAB_TOP - 0.06, 0, BW, BD, 0.9, 0.1, root, 0.06);
  {
    // circuit traces on the platform top
    const traces = new THREE.Mesh(new THREE.PlaneGeometry(BW - 0.6, BD - 0.6), new THREE.MeshBasicMaterial({ map: traceTexture(), transparent: true, depthWrite: false, toneMapped: false }));
    traces.rotation.x = -Math.PI / 2; traces.position.set(0, SLAB_TOP + 0.004, 0); traces.renderOrder = 1; root.add(traces);
  }
  {
    const label = def.baseLabel ?? "BlueWhale Stack";
    const tex = texture((g, w, h) => {
      g.fillStyle = "#0b2a7a"; g.textAlign = "center"; g.textBaseline = "middle";
      let fs = 230; do { g.font = `800 ${fs}px ${family}`; fs -= 6; } while (g.measureText(label).width > w - 80 && fs > 90);
      g.fillText(label, w / 2, h / 2 + 10);
    }, 2560, 512);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(def.baseLabel ? 11.5 : 7, def.baseLabel ? 2.3 : 1.4), new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false }));
    plane.position.set(0, PLINTH + BH * 0.62, BD / 2 + 0.13);
    root.add(plane);
  }
  planter(c, -(BW / 2 + 1.05), -2.9, 1.05);
  planter(c, BW / 2 + 1.05, -2.9, 1.05);

  if (def.layout === "stack") {
    buildStack(c, def);
  } else {
    /* console: glass shelf, a tilted chrome-framed screen with the product UI */
    slab(c, 0, SHELF_Y, 0.9, 10.2, 5.2, 0.26, 0.5, M.glass, 0.05);
    {
      const scr = new THREE.Group();
      scr.position.set(0, SHELF_Y, SCREEN_Z);
      scr.rotation.x = SCREEN_TILT;
      const bezel = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedRect(SCREEN_W, SCREEN_H, 0.28), { depth: 0.14, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3, curveSegments: 16 }), M.chrome);
      bezel.position.set(0, SCREEN_H / 2, 0); bezel.castShadow = true; scr.add(bezel);
      const inner = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedRect(SCREEN_W - 0.3, SCREEN_H - 0.3, 0.2), { depth: 0.03, bevelEnabled: false, curveSegments: 12 }), M.graphite);
      inner.position.set(0, SCREEN_H / 2, 0.165); scr.add(inner);
      const face = new THREE.Mesh(new THREE.PlaneGeometry(SCREEN_W - 0.5, SCREEN_H - 0.5), M.frost);
      face.position.set(0, SCREEN_H / 2, 0.2); scr.add(face);
      const ui = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 2.4), new THREE.MeshBasicMaterial({ map: uiPanelTexture(def, family), transparent: true, toneMapped: false }));
      ui.position.set(0, SCREEN_H / 2, 0.215); scr.add(ui);
      // a thin LED line along the bottom of the bezel
      box(c, 0, 0.09, 0.22, SCREEN_W - 1.2, 0.03, 0.02, M.led, scr);
      root.add(scr);
      // chrome stand behind the screen
      [-3.2, 3.2].forEach((sx) => { const leg = box(c, sx, SHELF_Y + 1.0, SCREEN_Z - 0.75, 0.16, 2.0, 0.16, M.chrome); leg.rotation.x = 0.35; });
    }

    /* three mini shelves, each with a nameplate standing at its front edge, facing the camera */
    GX.forEach((x, i) => {
      slab(c, x, GY, GZ, 2.7, 2.6, 0.16, 0.35, M.base, 0.04);
      ledRim(c, x, GY + 0.2, GZ, 2.7, 2.6, 0.35, 0.09, root, 0.025);
      const chip = chipMesh(def.groups[i], family, 0.78);
      const w = (chip.geometry as THREE.PlaneGeometry).parameters.width;
      const s = Math.min(1, 3.15 / w); // never wider than the shelf spacing allows
      chip.scale.setScalar(s);
      chip.rotation.x = -0.38;
      chip.position.set(x, GY + 0.16 + 0.39 * s + 0.06, GZ + 1.3 + 0.16);
      root.add(chip);
    });

    (CENTER[def.center] ?? CENTER.inventory)(c);

    /* providers: clouds (or racks / edge boxes) on floating chrome pucks above the console,
       nameplate under each, a glowing ribbon down behind the screen into the platform */
    const providers = def.providers ?? DEFAULT_PROVIDERS;
    const n = providers.length;
    const plates = providers.map((p) => chipMesh(p, family, 0.6, "plate", 90));
    const gap = 0.36;
    const natural = plates.reduce((a, m) => a + Math.max(1.55, (m.geometry as THREE.PlaneGeometry).parameters.width), 0) + gap * (n - 1);
    const maxSpan = 13.6;
    const scale = Math.min(1, maxSpan / natural);
    const rowW = natural * scale;
    let cursor = -rowW / 2;
    providers.forEach((p, i) => {
      const plate = plates[i];
      const slotW = Math.max(1.55, (plate.geometry as THREE.PlaneGeometry).parameters.width) * scale;
      const x = cursor + slotW / 2;
      cursor += slotW + gap * scale;
      const puck = new THREE.Group();
      puck.position.set(x, PILL_Y, PILL_Z);
      puck.scale.setScalar(scale);
      cyl(c, 0, 0, 0, 0.74, 0.14, M.chrome, puck);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.03, 8, 48), M.led); ring.rotation.x = Math.PI / 2; ring.position.y = 0.04; puck.add(ring);
      const kind = PROVIDER_KIND(p);
      if (kind === "cloud") cloud3d(c, 0, 0.55, 0, 0.66, puck);
      else if (kind === "rack") { const r = rackStack(c, 0, 0, 2, 0.72, 0.56); r.position.set(0, 0.07, 0); puck.add(r); }
      else { const e = edgeBox(c, 0, 0, 1.0); e.position.set(0, 0.07, 0); e.scale.setScalar(0.85); puck.add(e); }
      plate.rotation.x = -0.3;
      plate.position.set(0, -0.5, 0.35);
      puck.add(plate);
      root.add(puck);
      const tx = CABLE_TARGETS_X[Math.round((i / Math.max(1, n - 1)) * 6)];
      const y0 = PILL_Y - 0.85 * scale;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x, y0, PILL_Z),
        new THREE.Vector3(x * 0.92, y0 - 0.9, PILL_Z - 0.5),
        new THREE.Vector3(tx, SHELF_Y + 1.3, -3.7),
        new THREE.Vector3(tx, SHELF_Y + 0.05, -3.8),
      ]);
      cables.push(curve);
      root.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.04, 8, false), M.cableCore));
      const glow = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.19, 8, false), M.cableGlow); glow.renderOrder = 1; root.add(glow);
      const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), M.pulse);
      pulse.userData.offset = (i * 0.37) % 1;
      pulses.push(pulse); root.add(pulse);
    });
  }

  root.traverse((o) => { if ((o as THREE.Mesh).isMesh && !(o as THREE.Mesh).userData.noShadow) { o.castShadow = true; o.receiveShadow = true; } });
  // unlit light strips and glows never cast shadows
  root.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh && (m.material === M.led || m.material === M.ledGlow || m.material === M.cableGlow || m.material === M.cableCore || m.material === M.pulse)) { m.castShadow = false; m.receiveShadow = false; } });
  return {
    group: root,
    cables,
    pulses,
    dispose() {
      root.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) {
          m.geometry?.dispose();
          const mat = m.material as THREE.Material | THREE.Material[];
          const mats = Array.isArray(mat) ? mat : [mat];
          mats.forEach((mm) => { const map = (mm as THREE.MeshBasicMaterial).map; if (map) map.dispose(); });
        }
      });
    },
  };
}

/* ── the six-layer architecture stack ───────────────────────────── */
function buildStack(c: Ctx, def: SceneDef) {
  const layers = def.layers ?? [];
  const mats = [c.M.base, c.M.blue, c.M.base, c.M.baseDeep, c.M.base, c.M.blueLight];
  const sizes: [number, number][] = [[12.6, 6.8], [11.5, 6.2], [10.4, 5.6], [9.3, 5.0], [8.2, 4.4], [7.1, 3.8]];
  const H = 0.64, GAP = 0.5;
  let y = SHELF_Y + 0.05;
  layers.forEach((name, i) => {
    const [w, d] = sizes[i] ?? [7, 3.8];
    const silver = mats[i % mats.length] === c.M.base;
    slab(c, 0, y, 0, w, d, H, 0.45, mats[i % mats.length], 0.05);
    if (silver) ledRim(c, 0, y + H + 0.06, 0, w, d, 0.45, 0.09, c.scene, 0.03);
    // nameplate on the front face
    const chip = chipMesh(name, c.family, 0.6, silver ? "plate" : "dark", 84);
    chip.position.set(0, y + H / 2 + 0.06, d / 2 + 0.12);
    c.scene.add(chip);
    if (i === 3) {
      // the nine capability families as chrome pucks with an LED ring on the core layer
      for (let k = 0; k < 9; k++) {
        const px = -3.2 + (k % 5) * 1.6 + (k >= 5 ? 0.8 : 0);
        const pz = k < 5 ? -0.9 : 0.7;
        cyl(c, px, y + H + 0.16, pz, 0.34, 0.18, c.M.chrome);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.02, 8, 40), c.M.led); ring.rotation.x = Math.PI / 2; ring.position.set(px, y + H + 0.22, pz); c.scene.add(ring);
      }
    }
    if (i === 1) {
      cloud3d(c, -4.2, y + H + 0.55, -0.6, 0.4);
      rackStack(c, 0, 0, 2, 0.8, 0.6).position.set(0, y + H + 0.1, -0.9);
      edgeBox(c, 4.0, 0, 1.0).position.set(4.0, y + H + 0.1, -0.6);
    }
    y += H + GAP;
  });
}
