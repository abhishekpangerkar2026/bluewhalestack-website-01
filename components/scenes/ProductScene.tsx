import { cn } from "@/lib/utils";
import { scenes } from "@/content/scenes.generated";
import { PlatformVisual } from "./PlatformVisual";

const ALIAS: Record<string, string> = { finops: "whalenomics" };
export type SceneRecord = { src: string; src800: string; dark?: string; dark800?: string; width: number; height: number; title: string; tagline: string };
/** Retained scene metadata; visual rendering is native HTML and CSS. */
export const resolveScene = (key: string): SceneRecord | undefined => (scenes as Record<string, SceneRecord>)[key in scenes ? key : ALIAS[key] ?? key];

export function SceneThumb({ scene, className }: { scene: string; className?: string }) {
  const record = resolveScene(scene);
  if (!record) return null;
  return <PlatformVisual scene={ALIAS[scene] ?? scene} title={record.title} compact className={className} />;
}

/** Readable capability maps; legacy loading props remain accepted by callers. */
export function ProductScene({ scene, variant = "light", tagline = false, className }: {
  scene: string; variant?: "light" | "dark"; tagline?: boolean; live?: boolean; className?: string; priority?: boolean;
}) {
  const record = resolveScene(scene);
  if (!record) return null;
  return <PlatformVisual scene={ALIAS[scene] ?? scene} title={record.title} caption={tagline ? record.tagline : undefined} variant={variant} className={className} />;
}

export function HeroArt({ scene, variant = "light", priority = true, width = "50%", className }: {
  scene: string; variant?: "light" | "dark"; priority?: boolean; width?: string; className?: string;
}) {
  return (
    <div className="absolute inset-y-0 right-0 hidden items-center justify-center py-10 pl-4 pr-8 lg:flex xl:pr-12" style={{ width }}>
      <ProductScene scene={scene} variant={variant} priority={priority} className={cn("w-full max-w-[600px]", className)} />
    </div>
  );
}

export function HeroArtMobile({ scene, variant = "light", className }: { scene: string; variant?: "light" | "dark"; className?: string }) {
  return <div className={cn("pointer-events-auto mt-10 lg:hidden", className)}><ProductScene scene={scene} variant={variant} priority /></div>;
}
