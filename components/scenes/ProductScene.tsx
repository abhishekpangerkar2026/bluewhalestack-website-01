import { cn } from "@/lib/utils";
import { scenes, type SceneKey } from "@/content/scenes.generated";

/**
 * Native 3D product scene: the rendered objects (transparent WebP, see
 * scripts/render-scene.mjs) sit directly on the page surface, while the
 * provider pills, glowing cables, group labels and tagline are real HTML/SVG
 * positioned from the exported anchors — crisp, responsive, theme-aware and
 * selectable. Server component; motion is CSS only and honours
 * prefers-reduced-motion.
 */

const PROVIDERS = ["AWS", "Azure", "Google Cloud", "Oracle", "Alibaba", "Huawei", "On-prem & Hybrid"];

/** Module slugs whose scene is keyed differently. */
const ALIAS: Record<string, SceneKey> = { finops: "whalenomics" };
const resolve = (key: string) => scenes[(key in scenes ? key : ALIAS[key]) as SceneKey];

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
  className,
  priority = false,
}: {
  scene: SceneKey | string;
  variant?: "light" | "dark";
  pills?: boolean;
  labels?: boolean;
  tagline?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const s = resolve(scene);
  if (!s) return null;
  const dark = variant === "dark";
  const ratio = s.width / s.height;
  // Pill row height as a fraction of the image height, so cable geometry stays in one % space.
  const PILL_BAND = 0.22;
  const boxRatio = ratio / (1 + PILL_BAND);
  const toBox = ([x, y]: readonly number[]) => [x * 100, ((PILL_BAND + y) / (1 + PILL_BAND)) * 100] as const;
  const pillY = ((PILL_BAND * 0.62) / (1 + PILL_BAND)) * 100; // bottom of the pill row, in box %

  return (
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
          "pointer-events-none absolute left-1/2 top-[58%] h-[55%] w-[80%] -translate-x-1/2 rounded-[100%] blur-3xl",
          dark ? "bg-brand-400/25" : "bg-brand-300/30",
        )}
      />

      {/* cables: from each pill down into the console top */}
      {pills && (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
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
            const d = `M${x1} ${pillY} C ${x1} ${pillY + (y2 - pillY) * 0.55}, ${x2} ${y2 - (y2 - pillY) * 0.45}, ${x2} ${y2}`;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={dark ? "#4a7cf0" : "#4a7cf0"} strokeOpacity="0.18" strokeWidth="9" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                <path d={d} fill="none" stroke={`url(#cg-${scene})`} strokeOpacity="0.9" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                <path
                  d={d}
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.85"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeDasharray="6 14"
                  className="scene-flow"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* provider pills */}
      {pills && (
        <ul
          className="absolute left-0 right-0 top-0 grid grid-cols-7 gap-1.5 px-1 sm:gap-2"
          style={{ height: `${(PILL_BAND / (1 + PILL_BAND)) * 100}%` }}
        >
          {PROVIDERS.map((p, i) => (
            <li
              key={p}
              className={cn(
                "scene-float flex h-[62%] items-center justify-center rounded-md border text-center text-[9px] font-bold leading-tight sm:rounded-lg sm:text-[11px] lg:text-xs",
                dark
                  ? "border-white/20 bg-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur"
                  : "border-brand-100 bg-surface text-brand-900 shadow-[0_8px_24px_rgba(0,45,161,0.12)]",
              )}
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {p}
            </li>
          ))}
        </ul>
      )}

      {/* the rendered objects */}
      <div className="absolute inset-x-0 bottom-0" style={{ top: pills ? `${(PILL_BAND / (1 + PILL_BAND)) * 100}%` : 0 }}>
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

      {/* group labels */}
      {labels &&
        s.groups.map((g) => {
          const [x, y] = toBox(g.at);
          return (
            <span
              key={g.label}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border px-2 py-0.5 text-[10px] font-bold sm:px-2.5 sm:py-1 sm:text-xs",
                dark ? "border-white/20 bg-white/90 text-brand-900" : "border-brand-100 bg-surface text-brand-900 shadow-sm",
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {g.label}
            </span>
          );
        })}

      {/* tagline */}
      {tagline && (
        <span
          className={cn(
            "absolute -translate-x-1/2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-[11px] font-bold sm:px-5 sm:py-2 sm:text-sm",
            dark ? "border-white/20 bg-white text-brand-900" : "border-brand-100 bg-surface text-brand-900 shadow-md",
          )}
          style={{ left: `${toBox(s.tag)[0]}%`, top: `${toBox(s.tag)[1] - 3}%` }}
        >
          {s.tagline}
        </span>
      )}
    </div>
  );
}
