import { cn } from "@/lib/utils";
import { scenes } from "@/content/scenes.generated";
import { ProductSceneFrame } from "./ProductSceneFrame";

/**
 * Native 3D product scene in a white (or navy) CGI studio. Server component:
 * renders the static poster (4:3 WebP from scripts/capture-scenes.mjs) as a
 * cover image with soft edges so it sits in the page like a backdrop rather
 * than a framed picture, and mounts the live, rotating WebGL scene over it on
 * desktop through ProductSceneFrame. Both come from one definition in
 * live/registry.ts.
 */

/** Module slugs whose scene is keyed differently. */
const ALIAS: Record<string, string> = { finops: "whalenomics" };
export type SceneRecord = { src: string; src800: string; dark?: string; dark800?: string; width: number; height: number; title: string; tagline: string };
export const resolveScene = (key: string): SceneRecord | undefined => (scenes as Record<string, SceneRecord>)[key in scenes ? key : ALIAS[key] ?? key];

function posterFor(s: SceneRecord, dark: boolean) {
  const src = dark && s.dark ? s.dark : s.src;
  const src800 = dark && s.dark800 ? s.dark800 : s.src800;
  return { src, src800 };
}

/** Compact card thumbnail: a 16:9 crop of the poster on a white tile. */
export function SceneThumb({ scene, className }: { scene: string; className?: string }) {
  const s = resolveScene(scene);
  if (!s) return null;
  return (
    <div className={cn("relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-line bg-white", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.src800}
        width={800}
        height={600}
        alt={`${s.title} — 3D product scene`}
        loading="lazy"
        decoding="async"
        className="scene-mask absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export function ProductScene({
  scene,
  variant = "light",
  tagline = false,
  live = true,
  className,
  priority = false,
}: {
  scene: string;
  variant?: "light" | "dark";
  /** show the scene's tagline as a chip inside the frame */
  tagline?: boolean;
  /** mount the rotating WebGL scene on desktop */
  live?: boolean;
  /** sizing and aspect ratio of the frame (defaults to 4:3) */
  className?: string;
  priority?: boolean;
}) {
  const key = scene in scenes ? scene : ALIAS[scene] ?? scene;
  const s = resolveScene(key);
  if (!s) return null;
  const dark = variant === "dark";
  const { src, src800 } = posterFor(s, dark);

  return (
    <div className={cn("relative w-full select-none overflow-hidden", !/aspect-/.test(className ?? "") && "aspect-[4/3]", className)} role="img" aria-label={`${s.title} — ${s.tagline}`}>
      <div className="scene-mask absolute inset-0">
        <ProductSceneFrame sceneKey={key} studio={dark ? "dark" : "light"} live={live}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            srcSet={`${src800} 800w, ${src} ${s.width}w`}
            sizes="(min-width: 1024px) 55vw, 100vw"
            width={s.width}
            height={s.height}
            alt=""
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className="block h-full w-full object-cover"
          />
        </ProductSceneFrame>
      </div>
      {tagline && (
        <p className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center">
          <span className={cn("inline-block rounded-lg border px-3 py-1.5 text-center text-[11px] font-semibold sm:px-4 sm:py-2 sm:text-sm", dark ? "border-white/15 bg-white/95 text-brand-900" : "border-line bg-surface/95 text-ink shadow-sm")}>
            {s.tagline}
          </span>
        </p>
      )}
    </div>
  );
}

/**
 * Hero art: the scene as the right-hand backdrop of a hero section — on large
 * screens it is absolutely positioned and bleeds to the viewport edge behind
 * the copy; below that it is a 4:3 block in the flow. The section must be
 * `relative overflow-hidden` with a white (or brand-900 for dark) background.
 */
export function HeroArt({ scene, variant = "light", priority = true, width = "54%", className }: { scene: string; variant?: "light" | "dark"; priority?: boolean; /** width of the art on lg+ screens */ width?: string; className?: string }) {
  return (
    <div className="absolute inset-y-0 right-0 hidden lg:block" style={{ width }}>
      <ProductScene scene={scene} variant={variant} priority={priority} className={cn("h-full", className)} />
    </div>
  );
}

/** The in-flow counterpart of HeroArt for screens below lg: place it after the hero copy. */
export function HeroArtMobile({ scene, variant = "light", className }: { scene: string; variant?: "light" | "dark"; className?: string }) {
  return (
    <div className={cn("pointer-events-auto mt-10 lg:hidden", className)}>
      <ProductScene scene={scene} variant={variant} priority className="aspect-[4/3]" />
    </div>
  );
}
