import { cn } from "@/lib/utils";
import { scenes } from "@/content/scenes.generated";
import { ProductSceneFrame } from "./ProductSceneFrame";

/**
 * Native 3D product scene. Server component: renders the static capture
 * (transparent WebP from scripts/capture-scenes.mjs) with the tagline as HTML,
 * and mounts the live, rotating WebGL scene over it on desktop through
 * ProductSceneFrame. Both come from one definition in live/registry.ts.
 */

/** Module slugs whose scene is keyed differently. */
const ALIAS: Record<string, string> = { finops: "whalenomics" };
type SceneRecord = { src: string; src800: string; width: number; height: number; title: string; tagline: string };
const resolve = (key: string): SceneRecord | undefined => (scenes as Record<string, SceneRecord>)[key in scenes ? key : ALIAS[key] ?? key];

/** Compact card thumbnail: the objects on a soft brand tile. */
export function SceneThumb({ scene, className }: { scene: string; className?: string }) {
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
  tagline = true,
  live = true,
  className,
  priority = false,
}: {
  scene: string;
  variant?: "light" | "dark";
  tagline?: boolean;
  /** mount the rotating WebGL scene on desktop */
  live?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const key = scene in scenes ? scene : ALIAS[scene] ?? scene;
  const s = resolve(key);
  if (!s) return null;
  const dark = variant === "dark";
  const chipCls = dark ? "border-white/15 bg-white/95 text-brand-900" : "border-line bg-surface text-ink shadow-sm";

  return (
    <div className={cn("relative w-full select-none", className)} role="img" aria-label={`${s.title} — ${s.tagline}`}>
      {/* ambient glow under the console */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-[48%] h-[40%] w-[76%] -translate-x-1/2 rounded-[100%] blur-3xl",
          dark ? "bg-brand-400/25" : "bg-brand-300/25",
        )}
      />
      <ProductSceneFrame sceneKey={key} live={live}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.src}
          srcSet={`${s.src800} 800w, ${s.src} ${s.width}w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={s.width}
          height={s.height}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className="block h-full w-full object-contain"
        />
      </ProductSceneFrame>
      {tagline && (
        <p className="mt-2 flex justify-center">
          <span className={cn("inline-block rounded-lg border px-3 py-1.5 text-center text-[11px] font-semibold sm:px-4 sm:py-2 sm:text-sm", chipCls)}>
            {s.tagline}
          </span>
        </p>
      )}
    </div>
  );
}
