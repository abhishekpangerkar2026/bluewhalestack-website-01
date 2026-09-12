import { cn } from "@/lib/utils";
import { scenes, type SceneKey } from "@/content/scenes.generated";
import { TiltFrame } from "./TiltFrame";

/**
 * Native 3D product scene: the rendered objects (transparent WebP, see
 * scripts/render-scene.mjs) sit directly on the page surface, while the
 * provider pills, glowing cables, group labels and tagline are real HTML/SVG
 * positioned from the exported anchors — crisp, responsive, theme-aware and
 * selectable. Server component; motion is CSS only and honours
 * prefers-reduced-motion. Wrapped in TiltFrame for a light pointer tilt.
 */

/** Short labels so pills never wrap; full names on hover. */
const PROVIDERS: { short: string; full: string }[] = [
  { short: "AWS", full: "Amazon Web Services" },
  { short: "Azure", full: "Microsoft Azure" },
  { short: "GCP", full: "Google Cloud" },
  { short: "Oracle", full: "Oracle Cloud" },
  { short: "Alibaba", full: "Alibaba Cloud" },
  { short: "Huawei", full: "Huawei Cloud" },
  { short: "On-prem", full: "On-prem, private, hybrid & edge" },
];

/** Module slugs whose scene is keyed differently. */
const ALIAS: Record<string, SceneKey> = { finops: "whalenomics" };
const resolve = (key: string) => scenes[(key in scenes ? key : ALIAS[key]) as SceneKey];

// Layout bands, as fractions of the image height: pills above, tagline below.
const PILL_BAND = 0.2;
const TAG_BAND = 0.16;

/** Compact card thumbnail: the objects on a soft brand tile, no pills or labels. */
export function SceneThumb({ scene, className }: { scene: SceneKey | string; className?: string }) {
  const s = resolve(scene);
  if (!s) return null;
  return (
    <div
      className={cn(
        "relative flex aspect-[16/9] w-full items-end justify-center overflow-hidden rounded-lg border border-line bg-[radial-gradient(ellipse_80%_70%_at_50%_30%,var(--bg-active),var(--bg-sunken))] px-4 pt-4",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.src800}
        width={800}
        height={Math.round((800 * s.height) / s.width)}
        alt={`${s.title} — 3D product scene`}
        loading="lazy"
        decoding="async"
        className="relative block h-auto w-full object-contain drop-shadow-[0_18px_24px_rgba(0,45,161,0.22)]"
      />
    </div>
  );
}

export function ProductScene({
  scene,
  variant = "light",
  pills = true,
  labels = true,
  tagline = true,
  tilt = true,
  className,
  priority = false,
}: {
  scene: SceneKey | string;
  variant?: "light" | "dark";
  pills?: boolean;
  labels?: boolean;
  tagline?: boolean;
  tilt?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const s = resolve(scene);
  if (!s) return null;
  const dark = variant === "dark";
  const ratio = s.width / s.height;
  const top = pills ? PILL_BAND : 0.04;
  const bottom = tagline ? TAG_BAND : 0.04;
  const total = 1 + top + bottom;
  const boxRatio = ratio / total;
  // image-space (0..1) → box-space (%)
  const toBox = ([x, y]: readonly number[]) => [x * 100, ((top + y) / total) * 100] as const;
  const imgTop = (top / total) * 100;
  const imgH = (1 / total) * 100;
  const pillBottom = ((top * 0.7) / total) * 100;

  const pillCls = dark
    ? "border-white/15 bg-white/10 text-white backdrop-blur"
    : "border-line bg-surface text-ink shadow-sm";
  const chipCls = dark ? "border-white/15 bg-white/95 text-brand-900" : "border-line bg-surface text-ink shadow-sm";

  const body = (
    <div
      className={cn("relative w-full select-none", className)}
      style={{ aspectRatio: `${boxRatio}` }}
      role="img"
      aria-label={`${s.title} — ${s.tagline}`}
    >
      {/* ambient glow under the console */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 h-[46%] w-[76%] -translate-x-1/2 rounded-[100%] blur-3xl",
          dark ? "bg-brand-400/25" : "bg-brand-300/25",
        )}
        style={{ top: `${imgTop + imgH * 0.45}%` }}
      />

      {/* cables: from each pill down into the console top */}
      {pills && (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id={`cg-${scene}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={dark ? "#9cc4ff" : "#7fb3ff"} />
              <stop offset="1" stopColor={dark ? "#dbe6ff" : "#1a47c9"} />
            </linearGradient>
          </defs>
          {s.cableTargets.map((t, i) => {
            const x1 = ((i + 0.5) / PROVIDERS.length) * 100;
            const [x2, y2] = toBox(t);
            const d = `M${x1} ${pillBottom} C ${x1} ${pillBottom + (y2 - pillBottom) * 0.55}, ${x2} ${y2 - (y2 - pillBottom) * 0.45}, ${x2} ${y2}`;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke="#4a7cf0" strokeOpacity="0.16" strokeWidth="8" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                <path d={d} fill="none" stroke={`url(#cg-${scene})`} strokeOpacity="0.9" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                <path
                  d={d}
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.85"
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeDasharray="5 13"
                  className="scene-flow"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* provider pills — equal columns, short labels, one line */}
      {pills && (
        <ul
          className="absolute left-0 right-0 top-0 grid grid-cols-7 gap-1 sm:gap-1.5"
          style={{ height: `${(top / total) * 100}%` }}
        >
          {PROVIDERS.map((p, i) => (
            <li
              key={p.short}
              title={p.full}
              className={cn(
                "scene-float flex h-[70%] items-center justify-center whitespace-nowrap rounded-md border px-1 text-[10px] font-semibold leading-none sm:text-[11px] lg:text-xs",
                pillCls,
              )}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {p.short}
            </li>
          ))}
        </ul>
      )}

      {/* the rendered objects */}
      <div className="absolute inset-x-0" style={{ top: `${imgTop}%`, height: `${imgH}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.src}
          srcSet={`${s.src800} 800w, ${s.src} ${s.width}w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={s.width}
          height={s.height}
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block h-full w-full object-contain"
        />
      </div>

      {/* group labels — on the base surface, in front of the objects */}
      {labels &&
        s.groups.map((g) => {
          const [x, y] = toBox(g.at);
          return (
            <span
              key={g.label}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-0.5 text-[10px] font-semibold leading-none sm:px-2.5 sm:py-1 sm:text-[11px]",
                chipCls,
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {g.label}
            </span>
          );
        })}

      {/* tagline — its own band under the base */}
      {tagline && (
        <span
          className={cn(
            "absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-[11px] font-semibold sm:px-4 sm:py-2 sm:text-sm",
            chipCls,
          )}
          style={{ top: `${((top + 1 + bottom * 0.12) / total) * 100}%` }}
        >
          {s.tagline}
        </span>
      )}
    </div>
  );

  return tilt ? <TiltFrame>{body}</TiltFrame> : body;
}
