import { Icon } from "@/components/ui/Icon";
import type { IndustryDef } from "@/content/industries";

/**
 * Branded "industry snapshot" panel for the industry hero / featured card.
 * Pure HTML/SVG (no image files), server component. Renders the industry
 * icon, name, all four KPIs in a 2×2 grid, and compliance badges — sized to
 * its content rather than a forced aspect ratio, so nothing floats in space.
 */
export function IndustryVisual({ industry }: { industry: IndustryDef }) {
  const kpis = industry.kpis.slice(0, 4);
  const compliance = industry.compliance.slice(0, 4);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-line bg-surface shadow-md">
      {/* Subtle brand grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,black,transparent)]"
      />
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/10 blur-2xl"
      />

      <div className="relative flex flex-col p-6 sm:p-7">
        {/* Header: icon + name */}
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-fg shadow-md">
            <Icon name={industry.icon} className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="eyebrow text-accent">Industry cloud</p>
            <p className="truncate text-lg font-bold text-ink">
              {industry.name}
            </p>
          </div>
        </div>

        {/* KPIs — 2×2 so the panel earns its height */}
        {kpis.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-lg border border-line bg-sunken p-4 shadow-[3px_3px_0_0_rgba(0,45,161,0.06)]"
              >
                <div className="text-xl font-bold tracking-tight text-accent sm:text-2xl lg:text-3xl">
                  {k.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted">
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compliance chips */}
        {compliance.length > 0 && (
          <div className="mt-6">
            <p className="eyebrow mb-2 text-faint">Compliance &amp; controls</p>
            <div className="flex flex-wrap gap-2">
              {compliance.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full border border-line bg-brand-50 px-2.5 py-1 text-xs font-medium text-accent"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
