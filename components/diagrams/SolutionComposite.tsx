import { Plus, ArrowRight, Target } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

/**
 * Solution composite — shows how a handful of platform modules combine into a
 * business outcome (e.g. Cloud Migration Factory = Inventory + Migration +
 * Landing Zone). Code-based, on-brand, for a light section.
 *
 * Reuses module slugs/icons from content/modules.ts so it stays in sync.
 */

export interface CompositeModule {
  name: string;
  icon: string; // lucide-react icon name (matches Icon registry)
  slug?: string;
}

const DEFAULT_MODULES: CompositeModule[] = [
  { name: "Inventory & URM", icon: "Boxes", slug: "inventory" },
  { name: "Migration Engine", icon: "MoveRight", slug: "migration" },
  { name: "Landing Zone Builder", icon: "LayoutTemplate", slug: "landing-zone" },
];

export function SolutionComposite({
  title = "Cloud Migration Factory",
  modules = DEFAULT_MODULES,
  outcome = "Structured migrations with RPO < 1hr",
}: {
  title?: string;
  modules?: CompositeModule[];
  outcome?: string;
}) {
  return (
    <figure
      role="img"
      aria-label={`${title}: ${modules
        .map((m) => m.name)
        .join(" plus ")} combine to deliver ${outcome}.`}
      className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/80 to-white p-5 sm:p-7"
    >
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {/* modules combine */}
        <div className="flex flex-1 flex-wrap items-center justify-center gap-2">
          {modules.map((m, i) => (
            <div key={m.name} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-center shadow-soft">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={m.icon} className="h-4 w-4" />
                </span>
                <span className="text-[11px] font-semibold leading-tight text-slate-700">
                  {m.name}
                </span>
              </div>
              {i < modules.length - 1 && (
                <Plus className="h-4 w-4 shrink-0 text-slate-300" />
              )}
            </div>
          ))}
        </div>

        <ArrowRight className="mx-auto hidden h-5 w-5 shrink-0 text-brand-400 lg:block" />

        {/* outcome */}
        <div className="relative flex-1 overflow-hidden rounded-xl border border-brand-200 bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-400/20 blur-2xl" />
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 text-accent-200">
              <Target className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-100">
                {title}
              </div>
              <div className="font-display text-sm font-bold leading-tight">
                {outcome}
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-5 text-center text-sm text-slate-500">
        Modules aren&apos;t silos — compose them into outcomes on one platform.
      </figcaption>
    </figure>
  );
}
