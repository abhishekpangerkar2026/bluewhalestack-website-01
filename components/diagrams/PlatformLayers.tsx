/** 7-layer BlueWhale Stack platform architecture diagram. */

interface CapabilityGroup {
  name: string;
  chips: string[];
}

interface LayerDef {
  id: string;
  name: string;
  subtitle: string;
  /** Hex accent for the left bar and chip fills */
  color: string;
  /** Hex background for the row */
  bg: string;
  description: string;
  items?: string[];
  subtext?: string;
  groups?: CapabilityGroup[];
  highlight?: string[];
}

const LAYERS: LayerDef[] = [
  {
    id: "industry",
    name: "Industry Layer",
    subtitle: "packaged per vertical",
    color: "#6366f1",
    bg: "#eef2ff",
    description:
      "Packaged for your world — Standard, Enterprise, Telco & Datacenter, Government, or as an MSP/partner offering.",
    items: ["Standard", "Enterprise", "Telco & Datacenter", "Government", "MSP / Partner"],
  },
  {
    id: "experience",
    name: "Experience Layer",
    subtitle: "how people engage",
    color: "#2563eb",
    bg: "#eff6ff",
    description:
      "The right way in for everyone — a unified console, self-service catalog, partner portal, open APIs, and an AI copilot.",
    items: ["Unified Console", "Self-Service Catalog", "Partner Portal", "Open APIs & SDK", "Ask Whale"],
  },
  {
    id: "capability",
    name: "Capability Layer",
    subtitle: "the platform core — compose what you need",
    color: "#002da1",
    bg: "#e8eefc",
    description:
      "The platform core — Discover & Manage · Build & Migrate · Optimize · Operate · Secure & Govern. Turn on what you need; they share one model so everything connects.",
    groups: [
      { name: "Discover & Manage", chips: ["Inventory", "Discovery", "Assessment", "Service Catalog"] },
      { name: "Build & Migrate", chips: ["Migration Engine", "WhaleForge IaC", "Landing Zone"] },
      { name: "Optimize", chips: ["FinOps (Whale Nomics)", "cost · carbon"] },
      { name: "Operate", chips: ["Observe", "ITSM"] },
      { name: "Secure & Govern", chips: ["Identity & Access", "Security scanning", "Compliance · Audit"] },
    ],
  },
  {
    id: "intelligence",
    name: "Intelligence Layer",
    subtitle: "woven across every capability",
    color: "#8b5cf6",
    bg: "#f5f0ff",
    description:
      "Whale AI woven through every capability — grounded in your real data, an assistant in every module.",
    highlight: [
      "✦ Whale AI — Spark · Tide · Abyss",
      "50+ use cases · grounded in your live data · an assistant in every module",
    ],
  },
  {
    id: "connectivity",
    name: "Connectivity Layer",
    subtitle: "connect once, flow everywhere",
    color: "#0891b2",
    bg: "#ecfeff",
    description:
      "Connect once and everything flows in — every cloud, on-prem, and your business systems.",
    items: ["Multi-cloud", "On-prem / Hybrid", "Business systems", "Edge & Hub"],
    subtext:
      "AWS · Azure · GCP · Oracle · IBM · Alibaba · VMware · Hyper-V · Nutanix · CRM · ERP · HCM · ITSM · Identity",
  },
  {
    id: "foundation",
    name: "Foundation & Trust",
    subtitle: "the platform you rely on",
    color: "#16a34a",
    bg: "#ecfdf5",
    description:
      "Identity, multi-tenancy, data residency, and governance you can stand behind — the basis for every regulated deal.",
    items: ["Identity & Access", "Multi-tenancy", "Data Residency & Sovereignty", "Governance & Audit"],
  },
  {
    id: "delivery",
    name: "Delivery Layer",
    subtitle: "run it your way",
    color: "#475569",
    bg: "#f8fafc",
    description:
      "Run it your way — our cloud (SaaS), your cloud (BYOC), or fully sovereign / air-gapped, in the region you choose.",
    items: ["SaaS", "Bring-Your-Own-Cloud", "Sovereign / Air-gapped", "Multi-region"],
  },
];

export function PlatformLayers() {
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      {LAYERS.map((layer, idx) => (
        <div
          key={layer.id}
          className="flex border-b border-line last:border-b-0"
          // Tint the row from the layer colour over the theme surface so it
          // stays legible in dark mode instead of a hardcoded pastel.
          style={{ background: `color-mix(in srgb, ${layer.color} 9%, var(--bg-surface))` }}
        >
          {/* Colored left accent */}
          <div className="w-[5px] shrink-0" style={{ background: layer.color }} />

          {/* Row content */}
          <div className="flex flex-1 flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start">
            {/* Layer name */}
            <div className="w-full shrink-0 sm:w-44">
              <p className="text-sm font-bold" style={{ color: layer.color }}>
                {layer.name}
              </p>
              <p className="mt-0.5 text-xs text-muted">{layer.subtitle}</p>
            </div>

            {/* Layer content */}
            <div className="min-w-0 flex-1">
              {/* Standard items */}
              {layer.items && (
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md px-2.5 py-1 text-xs font-semibold"
                      style={{
                        background: `color-mix(in srgb, ${layer.color} 12%, var(--bg-surface))`,
                        color: layer.color,
                        border: `1px solid color-mix(in srgb, ${layer.color} 30%, transparent)`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                  {layer.subtext && (
                    <p className="mt-1.5 w-full text-xs leading-relaxed text-muted">
                      {layer.subtext}
                    </p>
                  )}
                </div>
              )}

              {/* Capability sub-groups */}
              {layer.groups && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
                  {layer.groups.map((group) => (
                    <div
                      key={group.name}
                      className="min-w-0 rounded-lg bg-surface px-3.5 py-2.5"
                      style={{
                        border: `1px solid color-mix(in srgb, ${layer.color} 40%, transparent)`,
                      }}
                    >
                      <p className="text-xs font-bold" style={{ color: layer.color }}>
                        {group.name}
                      </p>
                      <div className="mt-1.5 space-y-0.5">
                        {group.chips.map((chip) => (
                          <span
                            key={chip}
                            className="block text-xs text-muted"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlight text (Intelligence layer) */}
              {layer.highlight && (
                <div>
                  {layer.highlight.map((line, i) => (
                    <p
                      key={i}
                      className={i === 0 ? "text-sm font-bold" : "mt-0.5 text-xs"}
                      style={{ color: layer.color }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Description (hidden on small screens) */}
            <p className="hidden w-64 shrink-0 text-sm leading-relaxed text-muted xl:block">
              {layer.description}
            </p>
          </div>
        </div>
      ))}

      {/* Legend strip at the bottom */}
      <div className="border-t border-line bg-surface px-5 py-3">
        <div className="flex flex-wrap gap-4">
          {LAYERS.map((l) => (
            <span key={l.id} className="flex items-center gap-1.5 text-xs text-muted">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: l.color }}
              />
              {l.name.replace(" Layer", "")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
