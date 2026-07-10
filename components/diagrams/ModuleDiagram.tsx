import { Icon } from "@/components/ui/Icon";
import { moduleGroups, type ModuleDef } from "@/content/modules";

/**
 * Code-rendered (pure HTML/SVG) control-plane diagram for a module detail page.
 * Shows the module at the center, the shared platform tiers every module rides
 * on (Identity, Audit log, Data tier), and the module's own features as
 * connected nodes. Server component — no client hooks or handlers.
 */

const PLATFORM_TIERS: { label: string; sub: string; icon: string }[] = [
  { label: "Identity", sub: "SSO · RBAC", icon: "KeyRound" },
  { label: "Audit log", sub: "Hash-chained", icon: "ScrollText" },
  { label: "Data tier", sub: "Unified store", icon: "Layers" },
];

export function ModuleDiagram({ module }: { module: ModuleDef }) {
  return (
    <figure
      style={{ aspectRatio: "4/3" }}
      className="relative flex w-full flex-col overflow-hidden rounded-lg border border-line bg-sunken p-5 shadow-sm sm:p-6"
    >
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,rgba(0,45,161,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,45,161,0.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(120%_90%_at_50%_30%,black,transparent)]"
      />

      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* ── Shared platform tiers ─────────────────────────── */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-faint">
          Shared platform
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {PLATFORM_TIERS.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-2 shadow-sm"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-50 text-accent">
                <Icon name={t.icon} className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-semibold leading-tight text-ink">
                  {t.label}
                </span>
                <span className="block truncate text-[9px] leading-tight text-faint">
                  {t.sub}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* connector: tiers → module */}
        <Connector />

        {/* ── Module (center, highlighted) ──────────────────── */}
        <div className="rounded-lg border border-transparent bg-primary p-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15 text-primary-fg ring-1 ring-white/20">
              <Icon name={module.icon} className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[9px] font-semibold uppercase tracking-wider text-primary-fg/70">
                {moduleGroups[module.group]}
              </span>
              <span className="block truncate font-display text-sm font-bold leading-tight text-primary-fg">
                {module.name}
              </span>
            </span>
          </div>
        </div>

        {/* connector: module → features */}
        <Connector />

        {/* ── Module features as connected nodes ────────────── */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-faint">
          Capabilities
        </p>
        <ul className="mt-2 min-h-0 flex-1 space-y-1.5 overflow-hidden">
          {module.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 rounded-md border border-line bg-surface px-2.5 py-1.5 shadow-sm"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="truncate text-[11px] font-medium text-muted">
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/** Vertical connector with a centered node, echoing the arch-diagram spine. */
function Connector() {
  return (
    <div aria-hidden className="flex justify-center py-1.5">
      <span className="relative flex h-3 w-px bg-line-strong">
        <span className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-line-strong" />
      </span>
    </div>
  );
}
