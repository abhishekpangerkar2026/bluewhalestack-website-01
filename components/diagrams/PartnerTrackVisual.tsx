import { Icon } from "@/components/ui/Icon";
import { MoveRight } from "lucide-react";
import type { PartnerTrack } from "@/content/partners";

/**
 * Code-rendered "how it works" panel for each partner track — no image
 * assets. Pure HTML/SVG, server component. Shares the light-panel shell used
 * by IndustryVisual, with a diagram body specific to each track's model.
 */
export function PartnerTrackVisual({ track }: { track: PartnerTrack }) {
  return (
    <div
      style={{ aspectRatio: "16/12" }}
      className="relative w-full overflow-hidden rounded-lg border border-line bg-surface shadow-md"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full text-accent/[0.06]"
      >
        <defs>
          <pattern
            id={`partner-visual-grid-${track.slug}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path d="M28 0H0V28" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#partner-visual-grid-${track.slug})`} />
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/10 blur-2xl"
      />

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-fg shadow-md">
            <Icon name={track.icon} className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
              How it works
            </p>
            <h3 className="truncate text-lg font-bold text-ink">
              {track.shortName}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          {track.slug === "lsp" && <LspDiagram />}
          {track.slug === "implementation" && <ImplementationDiagram />}
          {track.slug === "strategic" && <StrategicDiagram />}
        </div>
      </div>
    </div>
  );
}

function FlowNode({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex-1 rounded-lg border border-line bg-sunken p-3 text-center">
      <p className="text-xs font-bold leading-tight text-ink">{label}</p>
      <p className="mt-0.5 text-[10px] leading-tight text-faint">{sub}</p>
    </div>
  );
}

function LspDiagram() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <FlowNode label="BlueWhale Stack" sub="Wholesale" />
        <MoveRight className="h-4 w-4 shrink-0 text-faint" aria-hidden />
        <FlowNode label="You · LSP" sub="Retail + margin" />
        <MoveRight className="h-4 w-4 shrink-0 text-faint" aria-hidden />
        <FlowNode label="Customers" sub="End users" />
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-brand-50 px-3.5 py-2.5">
        <span className="text-xs font-semibold text-accent">
          Two-sided invoicing
        </span>
        <span className="text-xs font-bold text-accent">
          Tax handled automatically
        </span>
      </div>
    </div>
  );
}

const IMPLEMENTATION_STEPS = ["Discover", "Design", "Deploy", "Support"];

function ImplementationDiagram() {
  return (
    <div>
      <div className="flex items-center">
        {IMPLEMENTATION_STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex-1 rounded-lg border border-line bg-sunken py-3 text-center">
              <p className="num text-xs font-bold text-accent">0{i + 1}</p>
              <p className="mt-0.5 text-xs font-bold leading-tight text-ink">
                {s}
              </p>
            </div>
            {i < IMPLEMENTATION_STEPS.length - 1 && (
              <span aria-hidden className="mx-1 h-px w-3 shrink-0 bg-line-strong" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg border border-line bg-brand-50 px-3.5 py-2.5">
        <span className="text-xs font-semibold text-accent">
          Certified delivery team
        </span>
        <span className="text-xs font-bold text-accent">
          Co-led with BlueWhale Stack
        </span>
      </div>
    </div>
  );
}

function StrategicDiagram() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-900 text-white shadow-md">
          <Icon name="Globe" className="h-8 w-8" />
        </span>
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Official Partner
          </span>
          <p className="mt-1.5 text-xs leading-snug text-muted">
            One named partner per territory, operating under an exclusive or
            preferred agreement.
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-lg border border-line bg-sunken p-3">
          <p className="text-xs font-bold text-ink">Exclusive territory</p>
          <p className="mt-0.5 text-[10px] leading-tight text-faint">
            One partner, one country
          </p>
        </div>
        <div className="rounded-lg border border-line bg-sunken p-3">
          <p className="text-xs font-bold text-ink">Advance procurement</p>
          <p className="mt-0.5 text-[10px] leading-tight text-faint">
            Volume-committed licensing
          </p>
        </div>
      </div>
    </div>
  );
}
