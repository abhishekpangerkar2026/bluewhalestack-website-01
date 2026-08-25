import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { ArchitectureStack3D } from "@/components/diagrams/ArchitectureStack3D";
import { diagrams, type ArchDiagram } from "@/content/architecture";

/**
 * Renders a declarative architecture diagram by id.
 *  - "stack" diagrams render as a 2.5D exploded-layers illustration
 *    (see ArchitectureStack3D) — floors with depth, upright node cards.
 *  - "flow" diagrams render as a left→right step strip.
 */
export function ArchitectureDiagram({ id }: { id: string }) {
  const d = diagrams[id];
  if (!d) return null;
  return (
    <figure className="relative overflow-hidden rounded-xl border border-line bg-surface p-4 shadow-sm sm:p-8">
      {/* faint dot grid backdrop so the slabs read as sitting in space */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]"
      />
      <div className="relative">
        {d.kind === "stack" ? <ArchitectureStack3D d={d} /> : <Flow d={d} />}
      </div>
      {d.caption && (
        <figcaption className="relative mt-6 border-t border-line pt-5 text-center text-sm leading-relaxed text-muted">
          {d.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Flow({ d }: { d: Extract<ArchDiagram, { kind: "flow" }> }) {
  return (
    <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {d.steps.map((s, i) => (
        <div key={s.label} className="flex flex-1 items-center gap-2">
          <div className="flex-1 rounded-lg border border-line bg-surface p-4 text-center shadow-[3px_3px_0_0_rgba(0,45,161,0.10)]">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-md bg-brand-50 text-accent">
              {s.icon && <Icon name={s.icon} className="h-5 w-5" />}
            </div>
            <div className="mt-2.5 text-sm font-semibold text-ink">
              {s.label}
            </div>
            {s.sub && <div className="mt-0.5 text-xs text-muted">{s.sub}</div>}
          </div>
          {i < d.steps.length - 1 && (
            <ArrowRight className="hidden h-4 w-4 shrink-0 text-accent/60 lg:block" />
          )}
        </div>
      ))}
    </div>
  );
}
