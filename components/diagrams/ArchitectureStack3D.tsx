import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { ArchDiagram, ArchLayer, ArchTone } from "@/content/architecture";

/**
 * Flat spec-sheet renderer for stack architecture diagrams.
 *
 * Each layer is a full-width hairline band: a mono index + uppercase title
 * in the left rail, the layer's nodes as flat chips on the right. The
 * highlighted layer (the control plane) is the one signal-blue band. Layers
 * are joined by a short vertical connector tick — an engineering drawing,
 * not an illustration. Pure HTML/CSS, server-rendered, theme-aware.
 */

const BAND: Record<ArchTone, string> = {
  source: "border-line bg-surface",
  plane: "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white",
  data: "border-line bg-sunken",
  experience: "border-line bg-surface",
  ai: "border-line bg-surface",
};

const CHIP: Record<ArchTone, string> = {
  source: "border-line bg-canvas text-ink",
  plane: "border-white/30 bg-white/10 text-white",
  data: "border-line bg-surface text-ink",
  experience: "border-line bg-canvas text-ink",
  ai: "border-line bg-canvas text-ink",
};

const ICON_TONE: Record<ArchTone, string> = {
  source: "text-accent",
  plane: "text-white",
  data: "text-accent",
  experience: "text-accent",
  ai: "text-[#7c5cd6]",
};

const TICK: Record<ArchTone, string> = {
  source: "bg-[var(--border-strong)]",
  plane: "bg-[var(--brand-blue)]",
  data: "bg-[var(--border-strong)]",
  experience: "bg-[var(--border-strong)]",
  ai: "bg-[#7c5cd6]",
};

export function ArchitectureStack3D({
  d,
}: {
  d: Extract<ArchDiagram, { kind: "stack" }>;
}) {
  return (
    <div className="relative">
      {d.layers.map((layer, i) => (
        <div key={layer.title}>
          <Band layer={layer} index={i} />
          {i < d.layers.length - 1 && (
            <div aria-hidden className="flex justify-center py-0.5">
              <span className="block h-3.5 w-px bg-line-strong" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Band({ layer, index }: { layer: ArchLayer; index: number }) {
  const tone: ArchTone = layer.highlight ? "plane" : (layer.tone ?? "source");
  const onPlane = tone === "plane";
  // The rail already numbers the band; drop a "1 · " style prefix from titles.
  const title = layer.title.replace(/^\d+\s*·\s*/, "");
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-3 rounded-[3px] border px-4 py-3.5 sm:grid-cols-[168px_1fr] sm:items-center sm:px-5",
        BAND[tone],
      )}
    >
      <div className="flex items-baseline gap-2.5 sm:block">
        <span
          className={cn(
            "font-mono text-[10px]",
            onPlane ? "text-white/60" : "text-faint",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "block font-mono text-[10.5px] font-medium uppercase leading-relaxed tracking-[0.1em] sm:mt-1",
            onPlane ? "text-white" : "text-muted",
          )}
        >
          {title}
          <span
            aria-hidden
            className={cn("ml-2 inline-block h-[5px] w-[5px] align-middle", TICK[tone])}
          />
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:justify-end">
        {layer.nodes.map((n) => (
          <div
            key={n.label}
            className={cn(
              "inline-flex max-w-full items-center gap-1.5 rounded-[2px] border px-2.5 py-1.5 text-[12px] font-medium leading-snug",
              CHIP[tone],
            )}
          >
            {n.icon && (
              <Icon
                name={n.icon}
                className={cn("h-3.5 w-3.5 shrink-0", ICON_TONE[tone])}
              />
            )}
            <span className="min-w-0">
              {n.label}
              {n.sub && (
                <span
                  className={cn(
                    "ml-1.5 font-normal",
                    onPlane ? "text-white/65" : "text-faint",
                  )}
                >
                  · {n.sub}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
