/**
 * Branded skyline illustrations for the three BlueWhale Stack offices.
 * Pure inline SVG (no image files, no licensing) drawn in the Deep Ocean
 * palette: night-blue sky → brand horizon, navy silhouettes, accent glass.
 *
 *  - Mumbai      → Bandra–Worli Sea Link with the Gateway of India
 *  - Ajman       → Amber Gem Tower on the Ajman corniche
 *  - Wilmington  → Delaware skyline over the Christina River
 */

import { cn } from "@/lib/utils";

export type OfficeCity = "Mumbai" | "Ajman" | "Wilmington";

const LANDMARK: Record<OfficeCity, string> = {
  Mumbai: "Bandra–Worli Sea Link · Gateway of India",
  Ajman: "Amber Gem Tower · Ajman Corniche",
  Wilmington: "Downtown skyline · Christina River",
};

const W = 400;
const H = 180;
const HORIZON = 132;

/* ─── shared scenery ─────────────────────────────────────────────────────── */

function Sky({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#061a4a" />
          <stop offset="0.55" stopColor="#0b2f8a" />
          <stop offset="1" stopColor="#1f6ff2" />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a5fe0" />
          <stop offset="1" stopColor="#0a2a7a" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fb3ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#1f6ff2" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-dots`} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="#ffffff" fillOpacity="0.12" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <rect width={W} height={HORIZON} fill={`url(#${id}-dots)`} />
      {/* stars */}
      {[
        [22, 18], [61, 40], [98, 12], [140, 30], [188, 16], [236, 38], [281, 10], [322, 26], [366, 44], [388, 14],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.8} fill="#ffffff" fillOpacity={0.55} />
      ))}
    </>
  );
}

function Sea({ id, y = HORIZON }: { id: string; y?: number }) {
  return (
    <>
      <rect x="0" y={y} width={W} height={H - y} fill={`url(#${id}-sea)`} />
      {/* reflections */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={18 + i * 50}
          y={y + 8 + (i % 3) * 9}
          width={14 + (i % 4) * 8}
          height="1.5"
          rx="0.75"
          fill="#9cc4ff"
          fillOpacity={0.35}
        />
      ))}
    </>
  );
}

function Sun({ id, cx, cy, r = 26 }: { id: string; cx: number; cy: number; r?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r * 1.9} fill={`url(#${id}-glow)`} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill="#ffd27a" />
    </>
  );
}

/** Window grid for a rectangular tower */
function Windows({
  x,
  y,
  w,
  h,
  cols,
  rows,
  opacity = 0.55,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
  opacity?: number;
}) {
  const cw = w / cols;
  const rh = h / rows;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // deterministic "lights on" pattern
      const lit = (r * 7 + c * 3) % 5 !== 0;
      if (!lit) continue;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x + c * cw + cw * 0.25}
          y={y + r * rh + rh * 0.25}
          width={cw * 0.5}
          height={rh * 0.5}
          fill="#ffd27a"
          fillOpacity={opacity * ((r + c) % 3 === 0 ? 0.6 : 1)}
        />,
      );
    }
  }
  return <>{cells}</>;
}

/* ─── Mumbai ─────────────────────────────────────────────────────────────── */

function Mumbai({ id }: { id: string }) {
  const navy = "#071a45";
  const mid = "#0c2a70";
  return (
    <>
      <Sky id={id} />
      <Sun id={id} cx={300} cy={64} r={22} />
      {/* distant skyline */}
      <g fill={mid}>
        <rect x="6" y="84" width="14" height="48" />
        <rect x="24" y="70" width="18" height="62" />
        <rect x="46" y="92" width="10" height="40" />
        <rect x="60" y="60" width="22" height="72" />
        <rect x="86" y="78" width="12" height="54" />
        <rect x="102" y="88" width="16" height="44" />
        <rect x="122" y="66" width="14" height="66" />
        <rect x="140" y="96" width="20" height="36" />
        <rect x="336" y="86" width="12" height="46" />
        <rect x="352" y="74" width="16" height="58" />
        <rect x="372" y="90" width="22" height="42" />
      </g>
      <Windows x={60} y={64} w={22} h={60} cols={3} rows={9} opacity={0.35} />
      <Windows x={24} y={74} w={18} h={50} cols={2} rows={7} opacity={0.3} />
      <Windows x={352} y={78} w={16} h={48} cols={2} rows={7} opacity={0.3} />

      {/* Gateway of India (right) */}
      <g fill={navy}>
        <rect x="248" y="96" width="82" height="36" />
        {/* central dome + side turrets */}
        <path d="M268 96 L268 84 Q289 62 310 84 L310 96 Z" />
        <rect x="252" y="80" width="10" height="16" />
        <rect x="316" y="80" width="10" height="16" />
        <path d="M252 80 Q257 70 262 80 Z" />
        <path d="M316 80 Q321 70 326 80 Z" />
        {/* finial */}
        <rect x="288" y="62" width="2" height="8" />
      </g>
      {/* arch opening */}
      <path d="M279 132 L279 112 Q289 100 299 112 L299 132 Z" fill="#1f6ff2" fillOpacity="0.7" />
      {/* small side arches */}
      <path d="M257 132 L257 120 Q262 114 267 120 L267 132 Z" fill="#1f6ff2" fillOpacity="0.45" />
      <path d="M311 132 L311 120 Q316 114 321 120 L321 132 Z" fill="#1f6ff2" fillOpacity="0.45" />

      <Sea id={id} />

      {/* Bandra–Worli Sea Link: deck + two pylons + cables */}
      <g>
        <rect x="0" y="118" width="240" height="5" fill={navy} />
        <rect x="0" y="123" width="240" height="2" fill="#5b9cff" fillOpacity="0.5" />
        {/* pylons */}
        <path d="M72 118 L76 52 L80 52 L84 118 Z" fill={navy} />
        <path d="M156 118 L160 52 L164 52 L168 118 Z" fill={navy} />
        {/* cables — left pylon */}
        {[10, 22, 34, 46, 58].map((d) => (
          <g key={`l${d}`} stroke="#9cc4ff" strokeOpacity="0.7" strokeWidth="0.8">
            <line x1="78" y1="56" x2={78 - d} y2="118" />
            <line x1="78" y1="56" x2={78 + d} y2="118" />
          </g>
        ))}
        {[10, 22, 34, 46, 58].map((d) => (
          <g key={`r${d}`} stroke="#9cc4ff" strokeOpacity="0.7" strokeWidth="0.8">
            <line x1="162" y1="56" x2={162 - d} y2="118" />
            <line x1="162" y1="56" x2={162 + d} y2="118" />
          </g>
        ))}
        {/* pylon lights */}
        <circle cx="78" cy="53" r="1.4" fill="#ffd27a" />
        <circle cx="162" cy="53" r="1.4" fill="#ffd27a" />
        {/* piers */}
        {[30, 118, 205].map((x) => (
          <rect key={x} x={x} y="123" width="6" height="14" fill={navy} />
        ))}
      </g>
    </>
  );
}

/* ─── Ajman ──────────────────────────────────────────────────────────────── */

function Ajman({ id }: { id: string }) {
  const navy = "#071a45";
  const mid = "#0c2a70";
  return (
    <>
      <Sky id={id} />
      {/* crescent moon */}
      <circle cx="82" cy="40" r="14" fill="#ffd27a" />
      <circle cx="88" cy="36" r="13" fill="#0a2a7a" />
      <circle cx="88" cy="36" r="13" fill={`url(#${id}-sky)`} />

      {/* mid skyline */}
      <g fill={mid}>
        <rect x="8" y="96" width="18" height="36" />
        <rect x="30" y="84" width="14" height="48" />
        <rect x="48" y="102" width="26" height="30" />
        <rect x="120" y="90" width="16" height="42" />
        <rect x="140" y="78" width="20" height="54" />
        <rect x="290" y="86" width="14" height="46" />
        <rect x="308" y="98" width="22" height="34" />
        <rect x="336" y="80" width="18" height="52" />
        <rect x="358" y="94" width="14" height="38" />
        <rect x="376" y="104" width="20" height="28" />
      </g>
      <Windows x={140} y={82} w={20} h={46} cols={3} rows={7} opacity={0.3} />
      <Windows x={336} y={84} w={18} h={44} cols={2} rows={6} opacity={0.3} />

      {/* Amber Gem Tower — tall glass slab with stepped crown */}
      <g>
        <rect x="192" y="22" width="44" height="110" fill={navy} />
        <rect x="196" y="26" width="36" height="104" fill={`url(#${id}-glass)`} fillOpacity="0.55" />
        {/* floor lines */}
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x="196" y={30 + i * 4.2} width="36" height="0.6" fill="#071a45" fillOpacity="0.55" />
        ))}
        {/* vertical mullions */}
        <rect x="208" y="26" width="0.8" height="104" fill="#071a45" fillOpacity="0.5" />
        <rect x="220" y="26" width="0.8" height="104" fill="#071a45" fillOpacity="0.5" />
        {/* crown */}
        <rect x="200" y="14" width="28" height="8" fill={navy} />
        <rect x="210" y="6" width="8" height="8" fill={navy} />
        <rect x="213" y="0" width="2" height="6" fill={navy} />
        <circle cx="214" cy="1.5" r="1.4" fill="#ff6b6b" />
        {/* lit floors */}
        <Windows x={196} y={40} w={36} h={84} cols={3} rows={12} opacity={0.35} />
        {/* podium + neighbouring tower */}
        <rect x="184" y="110" width="60" height="22" fill={navy} />
        <rect x="244" y="60" width="24" height="72" fill={mid} />
        <Windows x={244} y={64} w={24} h={64} cols={3} rows={9} opacity={0.3} />
      </g>

      {/* palms on the corniche */}
      {[100, 112, 280].map((x, i) => (
        <g key={i} stroke={navy} strokeWidth="2" strokeLinecap="round" fill="none">
          <path d={`M${x} 132 Q${x + 2} 118 ${x + 1} 108`} />
          <path d={`M${x + 1} 108 q-10 -6 -14 2`} />
          <path d={`M${x + 1} 108 q10 -6 14 2`} />
          <path d={`M${x + 1} 108 q-6 -10 -2 -14`} />
          <path d={`M${x + 1} 108 q6 -10 2 -14`} />
        </g>
      ))}

      <Sea id={id} />
      {/* corniche promenade */}
      <rect x="0" y="130" width="400" height="4" fill={navy} />
      {/* dhow */}
      <g>
        <path d="M312 160 L352 160 L346 166 L318 166 Z" fill={navy} />
        <path d="M332 160 L332 140 Q346 146 334 158 Z" fill="#dbe8ff" fillOpacity="0.9" />
        <rect x="331.5" y="138" width="1" height="22" fill={navy} />
      </g>
    </>
  );
}

/* ─── Wilmington ─────────────────────────────────────────────────────────── */

function Wilmington({ id }: { id: string }) {
  const navy = "#071a45";
  const mid = "#0c2a70";
  const riverY = 138;
  return (
    <>
      <Sky id={id} />
      <Sun id={id} cx={330} cy={48} r={20} />

      {/* downtown skyline: mid-rise office blocks with a few taller towers */}
      <g fill={mid}>
        <rect x="10" y="92" width="22" height="46" />
        <rect x="36" y="102" width="16" height="36" />
        <rect x="336" y="96" width="20" height="42" />
        <rect x="360" y="108" width="30" height="30" />
      </g>
      <g fill={navy}>
        {/* stepped art-deco tower */}
        <rect x="60" y="74" width="30" height="64" />
        <rect x="66" y="62" width="18" height="12" />
        <rect x="71" y="54" width="8" height="8" />
        {/* wide slab */}
        <rect x="98" y="86" width="44" height="52" />
        {/* tallest tower (glass) */}
        <rect x="150" y="40" width="34" height="98" />
        <rect x="154" y="44" width="26" height="92" fill={`url(#${id}-glass)`} fillOpacity="0.45" />
        <rect x="163" y="32" width="8" height="8" />
        <rect x="166" y="24" width="2" height="8" />
        {/* twin block */}
        <rect x="192" y="70" width="22" height="68" />
        <rect x="218" y="70" width="22" height="68" />
        <rect x="192" y="64" width="48" height="6" />
        {/* mansard-roof classic */}
        <rect x="250" y="84" width="40" height="54" />
        <path d="M250 84 L256 72 L284 72 L290 84 Z" />
        {/* low block */}
        <rect x="298" y="104" width="30" height="34" />
      </g>
      <Windows x={60} y={78} w={30} h={56} cols={4} rows={8} opacity={0.35} />
      <Windows x={98} y={90} w={44} h={44} cols={6} rows={6} opacity={0.3} />
      <Windows x={154} y={50} w={26} h={84} cols={3} rows={12} opacity={0.4} />
      <Windows x={192} y={74} w={22} h={60} cols={3} rows={8} opacity={0.3} />
      <Windows x={218} y={74} w={22} h={60} cols={3} rows={8} opacity={0.3} />
      <Windows x={250} y={88} w={40} h={46} cols={5} rows={6} opacity={0.3} />

      {/* riverfront trees */}
      {[14, 44, 306, 372].map((x, i) => (
        <g key={i} fill={navy}>
          <rect x={x + 3} y="126" width="2" height="12" />
          <circle cx={x + 4} cy="122" r="6" />
          <circle cx={x} cy="126" r="4.5" />
          <circle cx={x + 8} cy="126" r="4.5" />
        </g>
      ))}

      <Sea id={id} y={riverY} />
      {/* river bridge (Market Street) — arched */}
      <g>
        <rect x="0" y={riverY - 4} width="400" height="4" fill={navy} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${i * 80} ${riverY} q40 -22 80 0`}
            fill="none"
            stroke="#9cc4ff"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
        ))}
        {[40, 120, 200, 280, 360].map((x) => (
          <rect key={x} x={x - 3} y={riverY} width="6" height="12" fill={navy} />
        ))}
        {/* deck lamps */}
        {[20, 100, 180, 260, 340].map((x) => (
          <circle key={x} cx={x} cy={riverY - 6} r="1.2" fill="#ffd27a" />
        ))}
      </g>
      {/* tall ship on the Christina */}
      <g>
        <path d="M40 168 L84 168 L78 174 L46 174 Z" fill={navy} />
        <rect x="55" y="146" width="1.2" height="22" fill={navy} />
        <rect x="68" y="150" width="1.2" height="18" fill={navy} />
        <path d="M56 148 L56 162 L66 162 Z" fill="#dbe8ff" fillOpacity="0.9" />
        <path d="M69 152 L69 163 L77 163 Z" fill="#dbe8ff" fillOpacity="0.85" />
      </g>
    </>
  );
}

/* ─── Public component ───────────────────────────────────────────────────── */

const SCENES: Record<OfficeCity, (p: { id: string }) => React.ReactNode> = {
  Mumbai: (p) => <Mumbai {...p} />,
  Ajman: (p) => <Ajman {...p} />,
  Wilmington: (p) => <Wilmington {...p} />,
};

export function LocationVisual({
  city,
  className,
  caption = true,
}: {
  city: OfficeCity | string;
  className?: string;
  caption?: boolean;
}) {
  const key = (city in SCENES ? city : "Mumbai") as OfficeCity;
  const id = `loc-${key.toLowerCase()}`;
  return (
    <div className={cn("relative w-full overflow-hidden bg-brand-900", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`${key} skyline illustration`}
        preserveAspectRatio="xMidYMid slice"
      >
        {SCENES[key]({ id })}
      </svg>
      {caption && (
        <span className="absolute bottom-2.5 left-3 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
          {LANDMARK[key]}
        </span>
      )}
    </div>
  );
}
