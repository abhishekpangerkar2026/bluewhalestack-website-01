import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { ArchDiagram, ArchLayer, ArchTone } from "@/content/architecture";

/**
 * 2.5D "exploded layers" renderer for stack architecture diagrams.
 *
 * Every layer is drawn as a floor slab in a shared oblique projection —
 * a skewed top face with a visible front edge for depth — and the layer's
 * nodes stand on it as upright cards with an extruded shadow. Because the
 * cards themselves are never skewed, every label stays fully legible at
 * any width (the weakness of a true isometric SVG), while the slabs, the
 * spine and the per-layer depth give it a genuine architecture-illustration
 * feel. Pure HTML/CSS, server-rendered, theme-aware, no image assets.
 */

const FLOOR: Record<ArchTone, string> = {
  source:
    "bg-[linear-gradient(135deg,var(--bg-surface),var(--bg-sunken))] ring-1 ring-line",
  plane:
    "bg-[linear-gradient(135deg,#1a47c9,#002da1_55%,#001b79)] ring-1 ring-brand-400/50",
  data:
    "bg-[linear-gradient(135deg,var(--bg-sunken),var(--bg-surface))] ring-1 ring-line",
  experience:
    "bg-[linear-gradient(135deg,var(--bg-active),var(--bg-surface))] ring-1 ring-line",
  ai: "bg-[linear-gradient(135deg,#efe9ff,#f7f4ff)] ring-1 ring-violet-200",
};

const EDGE: Record<ArchTone, string> = {
  source: "bg-line-strong/70",
  plane: "bg-brand-900",
  data: "bg-line-strong/70",
  experience: "bg-brand-100",
  ai: "bg-violet-200",
};

const CARD: Record<ArchTone, string> = {
  source:
    "border-line bg-surface text-ink shadow-[3px_3px_0_0_rgba(0,45,161,0.10)]",
  plane:
    "border-white/25 bg-white/12 text-white backdrop-blur-[2px] shadow-[3px_3px_0_0_rgba(0,0,0,0.28)]",
  data:
    "border-line bg-surface text-ink shadow-[3px_3px_0_0_rgba(0,45,161,0.10)]",
  experience:
    "border-brand-100 bg-surface text-ink shadow-[3px_3px_0_0_rgba(0,45,161,0.12)]",
  ai: "border-violet-200 bg-white text-violet-900 shadow-[3px_3px_0_0_rgba(109,40,217,0.12)]",
};

const ICON: Record<ArchTone, string> = {
  source: "bg-brand-50 text-accent",
  plane: "bg-white/15 text-white",
  data: "bg-brand-50 text-accent",
  experience: "bg-brand-50 text-accent",
  ai: "bg-violet-100 text-violet-700",
};

const TITLE: Record<ArchTone, string> = {
  source: "bg-surface text-faint ring-line",
  plane: "bg-brand-900 text-brand-100 ring-brand-400/40",
  data: "bg-surface text-faint ring-line",
  experience: "bg-surface text-accent ring-brand-100",
  ai: "bg-white text-violet-700 ring-violet-200",
};

/** The oblique floor: a skewed parallelogram (top face) over a darker edge strip (thickness). */
const FLOOR_CLIP = "[clip-path:polygon(7%_0,100%_0,93%_100%,0_100%)]";

export function ArchitectureStack3D({
  d,
}: {
  d: Extract<ArchDiagram, { kind: "stack" }>;
}) {
  return (
    <div className="relative py-2">
      {/* Spine: dashed vertical axis every layer hangs off */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 border-l border-dashed border-brand-300/60"
      />
      <div className="relative flex flex-col">
        {d.layers.map((layer, i) => (
          <div key={layer.title}>
            <Slab layer={layer} depth={i} total={d.layers.length} />
            {i < d.layers.length - 1 && (
              <div className="relative flex justify-center py-3">
                <span className="grid h-7 w-7 place-items-center rounded-full border border-line bg-surface text-accent shadow-sm">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Slab({
  layer,
  depth,
  total,
}: {
  layer: ArchLayer;
  depth: number;
  total: number;
}) {
  const tone: ArchTone = layer.highlight ? "plane" : (layer.tone ?? "source");
  // Layers further down the stack get a slightly stronger edge so the whole
  // thing reads as a real stack of slabs rather than flat bands.
  const edgeH = 10 + Math.round((depth / Math.max(total - 1, 1)) * 4);

  return (
    <div className="relative px-3 pb-6 pt-8 sm:px-8">
      {/* thickness / front edge */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 bottom-0 translate-y-[var(--edge)]",
          FLOOR_CLIP,
          EDGE[tone],
        )}
        style={{ ["--edge" as string]: `${edgeH}px` }}
      />
      {/* top face */}
      <div
        aria-hidden
        className={cn("absolute inset-0", FLOOR_CLIP, FLOOR[tone])}
      />
      {/* subtle grid texture on the top face */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 opacity-[0.10]",
          FLOOR_CLIP,
          layer.highlight ? "text-white" : "text-accent",
        )}
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* layer title tab */}
      <span
        className={cn(
          "absolute left-[9%] top-0 -translate-y-1/2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 shadow-sm",
          TITLE[tone],
        )}
      >
        {layer.title}
      </span>

      {/* nodes standing on the floor */}
      <div className="relative flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {layer.nodes.map((n) => (
          <div
            key={n.label}
            className={cn(
              "inline-flex max-w-full items-center gap-2 rounded-md border px-3 py-2 text-[13px] font-semibold leading-snug",
              CARD[tone],
            )}
          >
            {n.icon && (
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded",
                  ICON[tone],
                )}
              >
                <Icon name={n.icon} className="h-3.5 w-3.5" />
              </span>
            )}
            <span className="min-w-0">
              {n.label}
              {n.sub && (
                <span
                  className={cn(
                    "ml-1.5 font-medium",
                    layer.highlight ? "text-white/70" : "text-faint",
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
