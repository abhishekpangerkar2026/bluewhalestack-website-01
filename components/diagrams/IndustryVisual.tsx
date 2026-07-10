import { Icon } from "@/components/ui/Icon";
import type { IndustryDef } from "@/content/industries";

/**
 * Branded "industry snapshot" panel for the industry detail hero.
 * Pure HTML/SVG (no image files), server component. Renders the industry
 * icon, name, its first two KPIs, and compliance badges as a dashboard card.
 */
export function IndustryVisual({ industry }: { industry: IndustryDef }) {
  const kpis = industry.kpis.slice(0, 2);
  const compliance = industry.compliance.slice(0, 4);

  return (
    <div
      style={{ aspectRatio: "4/3" }}
      className="relative w-full overflow-hidden rounded-lg border border-line bg-surface shadow-md"
    >
      {/* Subtle brand grid backdrop */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full text-accent/[0.06]"
      >
        <defs>
          <pattern
            id="industry-visual-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0V28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#industry-visual-grid)" />
      </svg>
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/10 blur-2xl"
      />

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        {/* Header: icon + name */}
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-fg shadow-md">
            <Icon name={industry.icon} className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
              Industry Cloud
            </p>
            <h3 className="truncate text-lg font-bold text-ink">
              {industry.name}
            </h3>
          </div>
        </div>

        {/* KPIs */}
        {kpis.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-lg border border-line bg-sunken p-4"
              >
                <div className="text-2xl font-bold tracking-tight text-accent sm:text-3xl">
                  {k.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-faint">
                  {k.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compliance chips */}
        {compliance.length > 0 && (
          <div className="mt-auto pt-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-faint">
              Compliance &amp; controls
            </p>
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
