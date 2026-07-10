import { ArrowDown, ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import {
  diagrams,
  type ArchDiagram,
  type ArchLayer,
  type ArchTone,
} from "@/content/architecture";

const TONES: Record<ArchTone, string> = {
  source: "border-slate-200 bg-white text-slate-700",
  plane: "border-brand-200 bg-brand-50 text-brand-800",
  data: "border-slate-200 bg-slate-50 text-slate-700",
  experience: "border-accent-500/30 bg-accent-500/5 text-slate-700",
  ai: "border-violet-200 bg-violet-50 text-violet-800",
};

/** Renders a declarative architecture diagram (stack or flow) by id. */
export function ArchitectureDiagram({ id }: { id: string }) {
  const d = diagrams[id];
  if (!d) return null;
  return (
    <figure className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-5 sm:p-7">
      {d.kind === "stack" ? <Stack d={d} /> : <Flow d={d} />}
      {d.caption && (
        <figcaption className="mt-5 text-center text-sm text-slate-500">
          {d.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Stack({ d }: { d: Extract<ArchDiagram, { kind: "stack" }> }) {
  return (
    <div className="space-y-1">
      {d.layers.map((layer, i) => (
        <div key={layer.title}>
          <LayerRow layer={layer} />
          {i < d.layers.length - 1 && (
            <div className="flex justify-center py-1.5">
              <ArrowDown className="h-4 w-4 text-brand-300" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LayerRow({ layer }: { layer: ArchLayer }) {
  const tone = layer.tone ?? "source";
  return (
    <div
      className={cn(
        "rounded-xl border p-3",
        layer.highlight
          ? "border-brand-300 bg-gradient-to-br from-brand-600 to-brand-700 shadow-brand"
          : "border-slate-200 bg-white",
      )}
    >
      <p
        className={cn(
          "mb-2.5 px-1 text-[11px] font-semibold uppercase tracking-wider",
          layer.highlight ? "text-brand-100" : "text-slate-400",
        )}
      >
        {layer.title}
      </p>
      <div className="flex flex-wrap gap-2">
        {layer.nodes.map((n) => (
          <div
            key={n.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium",
              layer.highlight
                ? "border-white/20 bg-white/10 text-white"
                : TONES[tone],
            )}
          >
            {n.icon && <Icon name={n.icon} className="h-3.5 w-3.5 opacity-70" />}
            <span>
              {n.label}
              {n.sub && (
                <span className="ml-1 opacity-60">· {n.sub}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Flow({ d }: { d: Extract<ArchDiagram, { kind: "flow" }> }) {
  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {d.steps.map((s, i) => (
        <div key={s.label} className="flex flex-1 items-center gap-2">
          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-center shadow-soft">
            <div className="mx-auto grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
              {s.icon && <Icon name={s.icon} className="h-4 w-4" />}
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-900">
              {s.label}
            </div>
            {s.sub && <div className="mt-0.5 text-[11px] text-slate-500">{s.sub}</div>}
          </div>
          {i < d.steps.length - 1 && (
            <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand-300 lg:block" />
          )}
        </div>
      ))}
    </div>
  );
}
