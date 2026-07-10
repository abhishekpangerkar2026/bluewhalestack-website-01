import Link from "next/link";
import { Sparkles } from "lucide-react";
import { CloudLogo, cloudLogoNames } from "@/components/brand/CloudLogos";
import { modules, moduleGroups, type ModuleGroup } from "@/content/modules";

/**
 * D-1 — the signature control-plane layer map. Clouds & data centers at the
 * bottom, the BlueWhale Stack control plane (module groups) in the middle,
 * outcomes on top, and a Whale AI rail spanning every layer.
 *
 * Code-based SVG/HTML, on-brand, designed for a dark section. Server component.
 */

// Operational groups shown as rows; the AI group renders as the cross-cutting rail.
const ROW_GROUPS: ModuleGroup[] = [
  "foundation",
  "operations",
  "builder",
  "datacenter",
];

const DEFAULT_OUTCOMES = [
  "−28% cloud spend",
  "97% compliance score",
  "RPO < 1hr",
  "Govern at scale",
];

export function ControlPlaneMap({
  outcomes = DEFAULT_OUTCOMES,
}: {
  outcomes?: string[];
}) {
  return (
    <div
      role="img"
      aria-label="The BlueWhale Stack control plane sitting over nine clouds and hypervisors, with Whale AI across every layer, delivering cost, compliance and recovery outcomes."
      className="mx-auto max-w-5xl"
    >
      {/* sources */}
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
        Your clouds, hypervisors &amp; data centers
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {cloudLogoNames.map((c) => (
          <span
            key={c}
            className="rounded-lg border border-white/10 bg-white px-3 py-2"
          >
            <CloudLogo name={c} />
          </span>
        ))}
      </div>

      <Connector />

      {/* control plane + AI rail */}
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="rounded-2xl border border-brand-400/30 bg-gradient-to-br from-brand-600/25 to-brand-900/20 p-5">
          <p className="text-center text-sm font-semibold text-accent-400">
            BlueWhale Stack control plane
          </p>
          <div className="mt-4 space-y-2.5">
            {ROW_GROUPS.map((g) => (
              <div
                key={g}
                className="grid items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-[110px_1fr]"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-200">
                  {moduleGroups[g]}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {modules
                    .filter((m) => m.group === g)
                    .map((m) => (
                      <Link
                        key={m.slug}
                        href={`/modules/${m.slug}`}
                        className="rounded-md bg-white/[0.06] px-2 py-1 text-[11px] font-medium text-slate-200 transition hover:bg-white/[0.14] hover:text-white"
                      >
                        {m.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Whale AI rail — spans the full height of the control plane */}
        <Link
          href="/modules/whale-ai"
          className="group flex items-center justify-center rounded-2xl border border-accent-400/40 bg-gradient-to-b from-accent-500/15 to-brand-600/10 px-3 py-4 text-center transition hover:border-accent-400/70 lg:w-16 lg:flex-col"
        >
          <Sparkles className="h-4 w-4 text-accent-300" />
          <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-accent-200 lg:ml-0 lg:mt-2 lg:[writing-mode:vertical-rl] lg:rotate-180">
            Whale AI · every layer
          </span>
        </Link>
      </div>

      <Connector flip />

      {/* outcomes */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {outcomes.map((o) => (
          <div
            key={o}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center text-sm font-medium text-white"
          >
            {o}
          </div>
        ))}
      </div>
    </div>
  );
}

function Connector({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`mx-auto my-5 h-6 w-px bg-gradient-to-b ${
        flip
          ? "from-accent-400/60 to-white/30"
          : "from-white/30 to-accent-400/60"
      }`}
    />
  );
}
