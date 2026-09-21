import { cn } from "@/lib/utils";
import { scenes } from "@/content/scenes.generated";
import { ProductSceneFrame } from "./ProductSceneFrame";

/**
 * The pictorial layer of the site: glossy 3D product renders (captured from
 * the live three.js scenes in components/scenes/live) presented as framed
 * figure plates inside the spec-sheet system — a hairline frame, a mono
 * caption bar, and the render itself. On desktop the static poster is
 * progressively replaced by the live, drag-to-rotate WebGL scene.
 *
 * These exist so a non-technical reader understands the platform at a
 * glance — clouds, racks and consoles as objects, not boxes and arrows.
 */

const ALIAS: Record<string, string> = { finops: "whalenomics" };
export type SceneRecord = { src: string; src800: string; dark?: string; dark800?: string; width: number; height: number; title: string; tagline: string };
export const resolveScene = (key: string): SceneRecord | undefined => (scenes as Record<string, SceneRecord>)[key in scenes ? key : ALIAS[key] ?? key];

function posterFor(s: SceneRecord, dark: boolean) {
  return {
    src: dark && s.dark ? s.dark : s.src,
    src800: dark && s.dark800 ? s.dark800 : s.src800,
  };
}

/** Compact plate for cards: the render cropped 16:9 behind a hairline. */
export function SceneThumb({ scene, className }: { scene: string; className?: string }) {
  const key = scene in scenes ? scene : ALIAS[scene] ?? scene;
  const s = resolveScene(key);
  if (!s) return null;
  return (
    <div className={cn("relative aspect-[16/9] w-full overflow-hidden rounded-[3px] border border-line bg-white", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.src800}
        width={800}
        height={800}
        alt={`${s.title} — 3D product scene`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
      />
    </div>
  );
}

export function ProductScene({
  scene,
  variant = "light",
  tagline = false,
  live = true,
  fill = false,
  className,
  priority = false,
}: {
  scene: string;
  variant?: "light" | "dark";
  /** show the scene's tagline as a caption row under the render */
  tagline?: boolean;
  /** mount the rotating WebGL scene on desktop */
  live?: boolean;
  /** stretch to the parent's height instead of locking a 4:3 aspect */
  fill?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const key = scene in scenes ? scene : ALIAS[scene] ?? scene;
  const s = resolveScene(key);
  if (!s) return null;
  const dark = variant === "dark";
  const { src, src800 } = posterFor(s, dark);

  return (
    <figure
      className={cn(
        "relative m-0 flex w-full min-w-0 select-none flex-col overflow-hidden rounded-[4px] border",
        dark ? "border-white/15 bg-[#0d1330]" : "border-line bg-white",
        className,
      )}
      aria-label={`${s.title} — ${s.tagline}`}
    >
      {/* mono caption bar — the figure label */}
      <div
        className={cn(
          "flex items-center justify-between gap-4 border-b px-4 py-2.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.11em] sm:px-5",
          dark ? "border-white/10 text-white/55" : "border-line text-faint",
        )}
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <span aria-hidden className={cn("h-[5px] w-[5px] shrink-0", dark ? "bg-[#e6c06a]" : "bg-[var(--brand-blue)]")} />
          <span className="truncate">Fig · {s.title}</span>
        </span>
        <span className="hidden shrink-0 sm:inline">Illustrative render</span>
      </div>

      {/* the render, with the live scene layered over it on desktop */}
      <div className={cn("relative w-full", fill ? "min-h-0 flex-1" : "aspect-[4/3]")}>
        <ProductSceneFrame sceneKey={key} studio={dark ? "dark" : "light"} live={live}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            srcSet={`${src800} 800w, ${src} ${s.width}w`}
            sizes="(min-width: 1024px) 46vw, 100vw"
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
        <figcaption
          className={cn(
            "border-t px-4 py-2.5 text-[12px] leading-relaxed sm:px-5",
            dark ? "border-white/10 text-white/70" : "border-line text-muted",
          )}
        >
          {s.tagline}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Hero art: the figure plate as the right-hand column of a hero on large
 * screens, in normal flow below the copy on small ones.
 */
export function HeroArt({ scene, variant = "light", priority = true, width = "50%", className }: {
  scene: string; variant?: "light" | "dark"; priority?: boolean; width?: string; className?: string;
}) {
  return (
    <div className="absolute inset-y-0 right-0 hidden items-center justify-center py-10 pl-4 pr-8 lg:flex xl:pr-12" style={{ width }}>
      <ProductScene scene={scene} variant={variant} priority={priority} tagline className={cn("w-full max-w-[620px]", className)} />
    </div>
  );
}

export function HeroArtMobile({ scene, variant = "light", className }: { scene: string; variant?: "light" | "dark"; className?: string }) {
  return <div className={cn("pointer-events-auto mt-10 lg:hidden", className)}><ProductScene scene={scene} variant={variant} priority tagline /></div>;
}
