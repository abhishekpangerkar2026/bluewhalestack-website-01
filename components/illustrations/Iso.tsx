/**
 * Isometric "3D" brand illustrations — the visual language of the official
 * decks: blue slabs with gold edges and glowing corners, floating clouds,
 * cubes, shields, coins and pins, drawn in a shared 30° projection.
 *
 * Pure inline SVG, server-rendered, no image assets. Every piece renders on
 * light cards and on the dark brand band (`variant="dark"`), and scales from a
 * 96px card thumbnail to a 560px hero without losing crispness.
 */

import { cn } from "@/lib/utils";

/* ─── projection & palette ────────────────────────────────────────────────── */

const C30 = 0.8660254;
const S30 = 0.5;

type Pt = [number, number];
type Proj = (x: number, y: number, z: number) => Pt;

function projector(ox: number, oy: number): Proj {
  return (x, y, z) => [ox + (x - y) * C30, oy + (x + y) * S30 - z];
}
const pts = (arr: Pt[]) => arr.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

const GOLD = "#f2c14e";
const GOLD_DEEP = "#c99a1f";
const TONES = {
  blue: { top: "#2f62e6", left: "#1a47c9", right: "#0f2f92" },
  deep: { top: "#1e4fd0", left: "#12388f", right: "#0b2670" },
  glass: { top: "#e4ecff", left: "#b9cdfb", right: "#93b0f5" },
  white: { top: "#ffffff", left: "#dbe6ff", right: "#b9cdfb" },
} as const;
type Tone = keyof typeof TONES;

export type IsoVariant = "light" | "dark";
type Ctx = { p: Proj; v: IsoVariant };

const ink = (v: IsoVariant) => (v === "dark" ? "#dbe6ff" : "#1a47c9");
const paper = (v: IsoVariant) => (v === "dark" ? "rgba(255,255,255,0.10)" : "#ffffff");

/* ─── primitives ──────────────────────────────────────────────────────────── */

function Glow({ at, r = 2.2 }: { at: Pt; r?: number }) {
  return (
    <>
      <circle cx={at[0]} cy={at[1]} r={r * 3.2} fill={GOLD} fillOpacity="0.22" />
      <circle cx={at[0]} cy={at[1]} r={r * 1.8} fill={GOLD} fillOpacity="0.35" />
      <circle cx={at[0]} cy={at[1]} r={r} fill="#fff3c4" />
    </>
  );
}

/** Oblique box: top face, left-front face (y = y+d) and right-front face (x = x+w). */
function Box({
  p,
  x,
  y,
  z,
  w,
  d,
  h,
  tone = "blue",
  edge = true,
  dots = false,
  stripes = 0,
  children,
}: {
  p: Proj;
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
  edge?: boolean;
  dots?: boolean;
  /** horizontal "server" stripes on the front faces */
  stripes?: number;
  children?: React.ReactNode;
}) {
  const c = TONES[tone];
  const T: Pt[] = [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)];
  const L: Pt[] = [p(x, y + d, z + h), p(x + w, y + d, z + h), p(x + w, y + d, z), p(x, y + d, z)];
  const R: Pt[] = [p(x + w, y, z + h), p(x + w, y + d, z + h), p(x + w, y + d, z), p(x + w, y, z)];
  const stripeEls = [];
  for (let i = 1; i <= stripes; i++) {
    const zz = z + (h * i) / (stripes + 1);
    stripeEls.push(
      <polyline
        key={i}
        points={pts([p(x + 3, y + d, zz), p(x + w - 3, y + d, zz)])}
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeLinecap="round"
      />,
      <polyline
        key={`r${i}`}
        points={pts([p(x + w, y + 3, zz), p(x + w, y + d - 3, zz)])}
        stroke="#ffffff"
        strokeOpacity="0.22"
        strokeWidth="1.2"
        strokeLinecap="round"
      />,
    );
  }
  return (
    <g>
      <polygon points={pts(L)} fill={c.left} />
      <polygon points={pts(R)} fill={c.right} />
      <polygon points={pts(T)} fill={c.top} />
      <polygon points={pts([T[0], T[1], T[2]])} fill="#ffffff" fillOpacity={tone === "glass" || tone === "white" ? 0.45 : 0.1} />
      {stripeEls}
      {edge && (
        <>
          <polygon points={pts(T)} fill="none" stroke={GOLD} strokeWidth="1.3" strokeLinejoin="round" />
          <polyline points={pts([T[2], p(x + w, y + d, z)])} stroke={GOLD} strokeOpacity="0.7" strokeWidth="1" />
        </>
      )}
      {dots && [T[1], T[2], T[3]].map((q, i) => <Glow key={i} at={q} />)}
      {children}
    </g>
  );
}

function Cloud({ x, y, s = 1, v }: { x: number; y: number; s?: number; v: IsoVariant }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M6 16h20a5.5 5.5 0 0 0 .6-11A8 8 0 0 0 11.5 3 7.5 7.5 0 0 0 6 16Z"
      fill={paper(v)}
      stroke={ink(v)}
      strokeWidth={1.6 / s}
      strokeLinejoin="round"
    />
  );
}

function Dotted({ a, b, v }: { a: Pt; b: Pt; v: IsoVariant }) {
  return (
    <line
      x1={a[0]}
      y1={a[1]}
      x2={b[0]}
      y2={b[1]}
      stroke={ink(v)}
      strokeOpacity="0.55"
      strokeWidth="1"
      strokeDasharray="2.5 3.5"
    />
  );
}

function Shadow({ cx, cy, rx, ry, v }: { cx: number; cy: number; rx: number; ry: number; v: IsoVariant }) {
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={v === "dark" ? "#000" : "#0b2a7a"} fillOpacity={v === "dark" ? 0.35 : 0.1} />
  );
}

function Coin({ x, y, r = 8 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y + 2} r={r} fill={GOLD_DEEP} />
      <circle cx={x} cy={y} r={r} fill={GOLD} stroke={GOLD_DEEP} strokeWidth="1" />
      <text x={x} y={y + r * 0.42} textAnchor="middle" fontSize={r * 1.2} fontWeight="700" fontFamily="Inter, Arial, sans-serif" fill="#7a5a05">
        $
      </text>
    </g>
  );
}

function Shield({ x, y, s = 1, check = true }: { x: number; y: number; s?: number; check?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0-20 16-13v13c0 10-8 17-16 21-8-4-16-11-16-21v-13z" fill="#2f62e6" stroke={GOLD} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M-5-13 11-6v6c0 7-5.5 12-11 15" fill="#ffffff" fillOpacity="0.14" />
      {check && (
        <polyline points="-7,-1 -2,4 8,-7" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </g>
  );
}

function Lock({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-5 0v-4a5 5 0 0 1 10 0v4" fill="none" stroke={GOLD_DEEP} strokeWidth="2" />
      <rect x="-7" y="0" width="14" height="10" rx="2" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="1" />
      <circle cx="0" cy="5" r="1.6" fill="#7a5a05" />
    </g>
  );
}

function Doc({ x, y, v, w = 30, h = 38 }: { x: number; y: number; v: IsoVariant; w?: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="3" fill={paper(v)} stroke={ink(v)} strokeWidth="1.4" />
      <path d={`M${w - 9} 0v9h9`} fill="none" stroke={ink(v)} strokeWidth="1.4" strokeLinejoin="round" />
      {[14, 20, 26].map((yy) => (
        <line key={yy} x1="6" y1={yy} x2={w - 6} y2={yy} stroke={ink(v)} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
      ))}
    </g>
  );
}

function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="12" fill={GOLD} fillOpacity="0.18" />
      <path d="M0 10C-6 2-9-2-9-7a9 9 0 0 1 18 0c0 5-3 9-9 17z" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="1" />
      <circle cx="0" cy="-7" r="3.2" fill="#fff8dc" />
    </g>
  );
}

function Sparkle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-9c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9z"
      fill={GOLD}
    />
  );
}

function Tag({ x, y, label, v }: { x: number; y: number; label: string; v: IsoVariant }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-11" y="-8" width="22" height="16" rx="3" fill={paper(v)} stroke={ink(v)} strokeWidth="1.2" />
      <text x="0" y="4" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Inter, Arial, sans-serif" fill={ink(v)}>
        {label}
      </text>
    </g>
  );
}

function Cylinder({ x, y, rx = 22, ry = 8, h = 16 }: { x: number; y: number; rx?: number; ry?: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M${-rx} 0v${h}a${rx} ${ry} 0 0 0 ${rx * 2} 0V0`} fill="#1a47c9" />
      <path d={`M${-rx} 0v${h}a${rx} ${ry} 0 0 0 ${rx} ${ry}V${ry}`} fill="#0f2f92" fillOpacity="0.6" />
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="#2f62e6" stroke={GOLD} strokeWidth="1.2" />
      <ellipse cx="0" cy="0" rx={rx * 0.55} ry={ry * 0.55} fill="#ffffff" fillOpacity="0.12" />
    </g>
  );
}

/* ─── illustrations ───────────────────────────────────────────────────────── */

function PlatformStack({ p, v }: Ctx) {
  const top = p(0, 0, 70);
  const back = p(-28, -28, 70);
  return (
    <>
      <Shadow cx={120} cy={178} rx={92} ry={14} v={v} />
      <Box p={p} x={-70} y={-70} z={0} w={140} d={140} h={14} tone="deep" dots />
      <Box p={p} x={-48} y={-48} z={30} w={96} d={96} h={14} tone="blue" dots />
      <Box p={p} x={-28} y={-28} z={60} w={56} d={56} h={10} tone="glass" dots />
      <Dotted a={back} b={[34, 42]} v={v} />
      <Dotted a={back} b={[196, 36]} v={v} />
      <Dotted a={top} b={[206, 104]} v={v} />
      <Cloud x={8} y={26} s={1.5} v={v} />
      <Cloud x={176} y={20} s={1.3} v={v} />
      <Cloud x={196} y={92} s={1.1} v={v} />
      <Glow at={back} r={2.6} />
    </>
  );
}

function CloudSlab({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={168} rx={78} ry={12} v={v} />
      <Box p={p} x={-52} y={-52} z={0} w={104} d={104} h={14} tone="blue" dots />
      <Dotted a={p(0, 0, 14)} b={[120, 68]} v={v} />
      <Cloud x={92} y={22} s={1.9} v={v} />
      <Glow at={p(0, 0, 14)} />
    </>
  );
}

function StackedSlabs({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={172} rx={80} ry={12} v={v} />
      <Box p={p} x={-56} y={-56} z={0} w={112} d={112} h={12} tone="deep" dots />
      <Box p={p} x={-38} y={-38} z={26} w={76} d={76} h={12} tone="blue" dots />
      <Box p={p} x={-22} y={-22} z={52} w={44} d={44} h={10} tone="glass" dots />
      <Cloud x={14} y={30} s={1.3} v={v} />
      <Cloud x={182} y={26} s={1.2} v={v} />
      <Cloud x={192} y={96} s={1} v={v} />
    </>
  );
}

function Servers({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={176} rx={86} ry={12} v={v} />
      <Box p={p} x={-70} y={-40} z={0} w={140} d={80} h={8} tone="deep" />
      {[-56, -14, 28].map((x, i) => (
        <Box key={i} p={p} x={x} y={-14} z={8} w={28} d={28} h={30} tone="blue" stripes={3} />
      ))}
      {[-42, 0, 42].map((x, i) => (
        <g key={i}>
          <Dotted a={p(x, 0, 38)} b={[p(x, 0, 38)[0], 46]} v={v} />
          <Tag x={p(x, 0, 38)[0]} y={36} label={`T${i + 1}`} v={v} />
        </g>
      ))}
      <Coin x={188} y={124} r={9} />
    </>
  );
}

function ShieldSlab({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={170} rx={78} ry={12} v={v} />
      <Box p={p} x={-52} y={-52} z={0} w={104} d={104} h={14} tone="blue" dots />
      <ellipse cx={120} cy={72} rx={52} ry={40} fill="none" stroke={GOLD} strokeWidth="1.2" strokeDasharray="4 4" />
      <Shield x={120} y={72} s={1.6} />
      <Lock x={172} y={116} />
    </>
  );
}

function Chart({ p, v }: Ctx) {
  const bars = [
    { x: -52, h: 28 },
    { x: -18, h: 46 },
    { x: 16, h: 66 },
  ];
  return (
    <>
      <Shadow cx={120} cy={172} rx={80} ry={12} v={v} />
      <Box p={p} x={-70} y={-34} z={0} w={130} d={68} h={10} tone="deep" />
      {bars.map((b, i) => (
        <Box key={i} p={p} x={b.x} y={-10} z={10} w={22} d={22} h={b.h} tone="blue" />
      ))}
      <polyline
        points={pts([p(-41, -22, 46), p(-7, -22, 64), p(27, -22, 84)])}
        fill="none"
        stroke={GOLD}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points={pts([p(27, -22, 84), p(18, -22, 82), p(24, -22, 72)])} fill={GOLD} />
      <Coin x={176} y={44} r={9} />
      <Coin x={196} y={62} r={7} />
    </>
  );
}

function AiCube({ p, v }: Ctx) {
  const c = p(0, 0, 46);
  const nodes: Pt[] = [
    [36, 46],
    [70, 24],
    [150, 20],
    [196, 52],
    [204, 108],
  ];
  return (
    <>
      <Shadow cx={120} cy={176} rx={82} ry={12} v={v} />
      <Box p={p} x={-56} y={-56} z={0} w={112} d={112} h={12} tone="deep" dots />
      {nodes.map((n, i) => (
        <g key={i}>
          <Dotted a={c} b={n} v={v} />
          <circle cx={n[0]} cy={n[1]} r="4.5" fill="#2f62e6" stroke={GOLD} strokeWidth="1.2" />
        </g>
      ))}
      <Box p={p} x={-17} y={-17} z={12} w={34} d={34} h={34} tone="blue" />
      <text
        x={p(0, 17, 30)[0] - 2}
        y={p(0, 17, 30)[1] + 4}
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fontFamily="Inter, Arial, sans-serif"
        fill="#ffffff"
      >
        AI
      </text>
      <Lock x={180} y={132} />
    </>
  );
}

function Migration({ p, v }: Ctx) {
  const a = p(-70, 20, 12);
  const b = p(48, -50, 12);
  return (
    <>
      <Shadow cx={64} cy={168} rx={44} ry={9} v={v} />
      <Shadow cx={176} cy={128} rx={44} ry={9} v={v} />
      <Box p={p} x={-100} y={-10} z={0} w={60} d={60} h={12} tone="blue" dots />
      <Box p={p} x={18} y={-80} z={0} w={60} d={60} h={12} tone="glass" dots />
      <path
        d={`M${a[0]} ${a[1] - 6} Q ${(a[0] + b[0]) / 2} ${Math.min(a[1], b[1]) - 60} ${b[0]} ${b[1] - 8}`}
        fill="none"
        stroke="#2f62e6"
        strokeWidth="2.6"
        strokeDasharray="6 5"
        strokeLinecap="round"
      />
      <polygon points={`${b[0]},${b[1] - 4} ${b[0] - 12},${b[1] - 14} ${b[0] - 3},${b[1] - 18}`} fill="#2f62e6" />
      <Box p={p} x={-30} y={-46} z={54} w={22} d={22} h={22} tone="blue" />
      <Cloud x={186} y={22} s={1.1} v={v} />
    </>
  );
}

function Audit({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={172} rx={70} ry={11} v={v} />
      <Box p={p} x={-60} y={-40} z={0} w={120} d={80} h={10} tone="deep" />
      <Doc x={126} y={44} v={v} w={40} h={52} />
      <Doc x={144} y={58} v={v} w={40} h={52} />
      <Shield x={84} y={94} s={2.2} />
      <Glow at={[190, 46]} r={2.6} />
    </>
  );
}

function Datacenter({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={178} rx={84} ry={12} v={v} />
      <Box p={p} x={-64} y={-48} z={0} w={128} d={96} h={8} tone="deep" />
      <Box p={p} x={-52} y={-40} z={8} w={34} d={34} h={36} tone="blue" stripes={3} />
      <Box p={p} x={10} y={-40} z={8} w={34} d={34} h={36} tone="blue" stripes={3} />
      <Box p={p} x={-20} y={4} z={8} w={34} d={34} h={36} tone="blue" stripes={3} />
      <Pin x={120} y={46} />
    </>
  );
}

function AppWindow({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={176} rx={70} ry={11} v={v} />
      <Box p={p} x={-64} y={-4} z={0} w={48} d={48} h={12} tone="blue" />
      <Box p={p} x={-20} y={-30} z={0} w={48} d={48} h={12} tone="glass" />
      <g transform="translate(66 34)">
        <rect width="108" height="76" rx="8" fill={paper(v)} stroke={ink(v)} strokeWidth="1.6" />
        <line x1="0" y1="18" x2="108" y2="18" stroke={ink(v)} strokeOpacity="0.4" strokeWidth="1.2" />
        {[10, 18, 26].map((cx, i) => (
          <circle key={i} cx={cx} cy="9" r="2.4" fill={i === 2 ? GOLD : ink(v)} />
        ))}
        {[34, 46, 58].map((yy, i) => (
          <rect key={yy} x="12" y={yy} width={i === 1 ? 70 : 50} height="5" rx="2.5" fill={ink(v)} fillOpacity={i === 1 ? 0.35 : 0.6} />
        ))}
      </g>
      <Glow at={[178, 40]} r={2.4} />
    </>
  );
}

function Racks({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={180} rx={80} ry={12} v={v} />
      {[-62, -12, 38].map((x, i) => (
        <Box key={i} p={p} x={x} y={-14} z={0} w={26} d={28} h={64} tone="blue" stripes={5} />
      ))}
      <Cloud x={92} y={14} s={1.5} v={v} />
      <Dotted a={[120, 40]} b={p(0, 0, 64)} v={v} />
    </>
  );
}

function Data({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={96} cy={176} rx={44} ry={9} v={v} />
      <Cylinder x={96} y={124} rx={30} ry={11} h={22} />
      <Cylinder x={96} y={96} rx={30} ry={11} h={22} />
      <Cylinder x={96} y={68} rx={30} ry={11} h={22} />
      <path d="M130 100 C 150 100, 150 70, 172 70" fill="none" stroke={ink(v)} strokeWidth="1.6" strokeDasharray="3 3" />
      <path d="M130 118 C 150 118, 150 140, 172 140" fill="none" stroke={ink(v)} strokeWidth="1.6" strokeDasharray="3 3" />
      <Sparkle x={182} y={68} s={1.1} />
      <g transform="translate(168 128)">
        <rect width="40" height="26" rx="5" fill={paper(v)} stroke={ink(v)} strokeWidth="1.4" />
        <polyline points="6,18 14,12 22,15 34,6" fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

function Network({ p, v }: Ctx) {
  const c: Pt = [120, 104];
  const ring: Pt[] = [
    [52, 60],
    [120, 34],
    [188, 60],
    [190, 150],
    [120, 176],
    [50, 150],
  ];
  return (
    <>
      {ring.map((n, i) => (
        <g key={i}>
          <line x1={c[0]} y1={c[1]} x2={n[0]} y2={n[1]} stroke={ink(v)} strokeOpacity="0.6" strokeWidth="1.4" />
          <line x1={n[0]} y1={n[1]} x2={ring[(i + 1) % ring.length][0]} y2={ring[(i + 1) % ring.length][1]} stroke={ink(v)} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={n[0]} cy={n[1]} r="6" fill="#2f62e6" stroke={GOLD} strokeWidth="1.3" />
        </g>
      ))}
      <circle cx={c[0]} cy={c[1]} r="16" fill={GOLD} fillOpacity="0.2" />
      <circle cx={c[0]} cy={c[1]} r="10" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="1.2" />
      <Sparkle x={196} y={30} s={1} />
    </>
  );
}

function Saas({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={168} rx={76} ry={12} v={v} />
      <Box p={p} x={-50} y={-50} z={0} w={100} d={100} h={14} tone="blue" dots />
      <Cloud x={88} y={24} s={1.7} v={v} />
      <polygon points="126,46 114,72 124,72 118,94 134,62 124,62" fill={GOLD} stroke={GOLD_DEEP} strokeWidth="0.8" />
    </>
  );
}

function Byoc({ p, v }: Ctx) {
  const t = p(0, 0, 14);
  return (
    <>
      <Shadow cx={120} cy={168} rx={76} ry={12} v={v} />
      <Box p={p} x={-50} y={-50} z={0} w={100} d={100} h={14} tone="blue" dots />
      <Dotted a={t} b={[54, 52]} v={v} />
      <Dotted a={t} b={[120, 30]} v={v} />
      <Dotted a={t} b={[188, 56]} v={v} />
      <Cloud x={28} y={30} s={1.2} v={v} />
      <Cloud x={100} y={8} s={1.2} v={v} />
      <Cloud x={166} y={34} s={1.2} v={v} />
    </>
  );
}

function Edge({ p, v }: Ctx) {
  return (
    <>
      <Shadow cx={120} cy={172} rx={70} ry={11} v={v} />
      <Box p={p} x={-46} y={-46} z={0} w={92} d={92} h={12} tone="deep" />
      <g transform="translate(120 80)">
        <circle r="38" fill="#2f62e6" stroke={GOLD} strokeWidth="1.6" />
        <ellipse rx="16" ry="38" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.2" />
        <line x1="-38" y1="0" x2="38" y2="0" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M-33-19h66M-33 19h66" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" />
      </g>
      <Sparkle x={64} y={44} s={0.9} />
      <Sparkle x={182} y={54} s={1.1} />
      <Sparkle x={170} y={118} s={0.7} />
    </>
  );
}

function Observe({ p, v }: Ctx) {
  const c = p(0, 0, 14);
  return (
    <>
      <Shadow cx={120} cy={168} rx={76} ry={12} v={v} />
      <Box p={p} x={-50} y={-50} z={0} w={100} d={100} h={14} tone="blue" dots />
      {[22, 40, 58].map((r, i) => (
        <path
          key={r}
          d={`M${c[0] - r} ${c[1]} A ${r} ${r} 0 0 1 ${c[0] + r} ${c[1]}`}
          fill="none"
          stroke={i === 1 ? GOLD : ink(v)}
          strokeOpacity={0.9 - i * 0.2}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <Glow at={c} r={3} />
    </>
  );
}

function Partners({ p, v }: Ctx) {
  const c = p(0, 0, 44);
  const sats: { x: number; y: number; tag: string }[] = [
    { x: -62, y: -6, tag: "LSP" },
    { x: 30, y: -62, tag: "SI" },
    { x: 30, y: 30, tag: "SP" },
  ];
  return (
    <>
      <Shadow cx={120} cy={178} rx={86} ry={12} v={v} />
      <Box p={p} x={-70} y={-70} z={0} w={140} d={140} h={12} tone="deep" dots />
      {sats.map((s) => (
        <Dotted key={s.tag} a={c} b={p(s.x + 13, s.y + 13, 36)} v={v} />
      ))}
      {sats.map((s) => (
        <g key={s.tag}>
          <Box p={p} x={s.x} y={s.y} z={12} w={26} d={26} h={24} tone="glass" />
          <Tag x={p(s.x + 13, s.y + 13, 36)[0]} y={p(s.x + 13, s.y + 13, 36)[1] - 14} label={s.tag} v={v} />
        </g>
      ))}
      <Box p={p} x={-16} y={-16} z={12} w={32} d={32} h={32} tone="blue" />
      <Glow at={c} r={2.8} />
      <Coin x={190} y={60} r={9} />
    </>
  );
}

function Solutions({ p, v }: Ctx) {
  const steps = [
    { x: -96, y: 14, z: 0, tone: "deep" as Tone },
    { x: -40, y: -14, z: 18, tone: "blue" as Tone },
    { x: 16, y: -42, z: 36, tone: "glass" as Tone },
  ];
  const tops = steps.map((s) => p(s.x + 24, s.y + 24, s.z + 12));
  return (
    <>
      <Shadow cx={120} cy={178} rx={86} ry={12} v={v} />
      {steps.map((s, i) => (
        <Box key={i} p={p} x={s.x} y={s.y} z={s.z} w={48} d={48} h={12} tone={s.tone} dots={i === 2} />
      ))}
      <polyline
        points={pts(tops)}
        fill="none"
        stroke={GOLD}
        strokeWidth="2.4"
        strokeDasharray="5 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {tops.map((t, i) => (
        <g key={i}>
          <circle cx={t[0]} cy={t[1] - 14} r="9" fill="#2f62e6" stroke={GOLD} strokeWidth="1.4" />
          <polyline
            points={`${t[0] - 4},${t[1] - 14} ${t[0] - 1},${t[1] - 11} ${t[0] + 4},${t[1] - 18}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
      <Sparkle x={196} y={40} s={1.1} />
      <Cloud x={20} y={26} s={1.1} v={v} />
    </>
  );
}

/* ─── registry ────────────────────────────────────────────────────────────── */

const SCENES = {
  "platform-stack": PlatformStack,
  "cloud-slab": CloudSlab,
  "stacked-slabs": StackedSlabs,
  servers: Servers,
  "shield-slab": ShieldSlab,
  chart: Chart,
  "ai-cube": AiCube,
  migration: Migration,
  audit: Audit,
  datacenter: Datacenter,
  "app-window": AppWindow,
  racks: Racks,
  data: Data,
  network: Network,
  saas: Saas,
  byoc: Byoc,
  edge: Edge,
  observe: Observe,
  partners: Partners,
  solutions: Solutions,
} as const;

export type IsoName = keyof typeof SCENES;

/** Edition slug → illustration (mirrors the edition cards in the decks). */
export const EDITION_ISO: Record<string, IsoName> = {
  standard: "cloud-slab",
  enterprise: "stacked-slabs",
  "telco-datacenter": "servers",
  government: "shield-slab",
};

/** Capability family → illustration. */
export const FAMILY_ISO: Record<string, IsoName> = {
  management: "cloud-slab",
  whalenomics: "chart",
  security: "shield-slab",
  governance: "audit",
  ai: "ai-cube",
  migration: "migration",
  observability: "observe",
  tenancy: "servers",
  sovereign: "edge",
};

/** Solution slug → illustration. */
export const SOLUTION_ISO: Record<string, IsoName> = {
  "unified-cloud-inventory": "cloud-slab",
  "ai-native-provisioning": "ai-cube",
  "bundled-observability": "observe",
  "cloud-migration": "migration",
  "security-compliance": "shield-slab",
  "sovereign-cloud": "edge",
};

/** Customer-story industry → illustration. */
export const INDUSTRY_ISO: Record<string, IsoName> = {
  BFSI: "audit",
  Government: "shield-slab",
  "Telco & Datacenter": "servers",
  Media: "edge",
};

/** Deployment mode → illustration (matches the deck's deployment row). */
export const DEPLOY_ISO: IsoName[] = ["saas", "byoc", "racks", "shield-slab", "edge"];

export function Iso({
  name,
  variant = "light",
  className,
  title,
}: {
  name: IsoName;
  variant?: IsoVariant;
  className?: string;
  title?: string;
}) {
  const Scene = SCENES[name];
  if (!Scene) return null;
  const p = projector(120, 108);
  return (
    <svg
      viewBox="0 0 240 210"
      className={cn("block h-auto w-full select-none", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <Scene p={p} v={variant} />
    </svg>
  );
}
