import { Search, GitBranch, Filter, Boxes } from "lucide-react";
import { CloudLogo } from "@/components/brand/CloudLogos";
import { AppWindow } from "./AppWindow";

/**
 * Inventory & URM product screen — a live, unified resource map with a
 * dependency graph, faceted counts, and drift tracking. Code-based, on-brand.
 */
export function InventoryMockup() {
  return (
    <div className="relative">
      {/* floating accent card */}
      <div className="absolute -right-4 bottom-16 z-10 hidden rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xl sm:block animate-fade-up [animation-delay:400ms]">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Boxes className="h-4 w-4" />
          </span>
          <div>
            <div className="font-display text-sm font-bold text-slate-900">
              4,821
            </div>
            <div className="text-[10px] text-slate-500">resources · 6 clouds</div>
          </div>
        </div>
      </div>

      <AppWindow active="Inventory">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Inventory</div>
            <div className="font-display text-sm font-bold text-slate-900">
              Unified Resource Map
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1 text-[10px] text-slate-400">
            <Search className="h-3 w-3" /> Search 4,821 resources
          </span>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: "4,821", l: "Resources", d: "12+ data sources" },
            { v: "18", l: "Cloud accounts", d: "across 6 clouds" },
            { v: "12", l: "Drift items", d: "tracked", warn: true },
          ].map((k) => (
            <div
              key={k.l}
              className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5"
            >
              <div className="font-display text-sm font-bold text-slate-900">
                {k.v}
              </div>
              <div className="text-[10px] text-slate-500">{k.l}</div>
              <div
                className={`mt-0.5 text-[10px] ${
                  k.warn ? "text-amber-600" : "text-slate-400"
                }`}
              >
                {k.d}
              </div>
            </div>
          ))}
        </div>

        {/* dependency graph */}
        <div className="rounded-xl border border-slate-100 p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
              <GitBranch className="h-3 w-3" /> Dependency graph
            </span>
            <span className="text-[10px] text-slate-400">VPC · prod-sg-1</span>
          </div>
          <svg viewBox="0 0 320 96" className="h-24 w-full">
            {/* edges */}
            <g stroke="#cbd5e1" strokeWidth="1.5" fill="none">
              <path d="M58 48 L150 24" />
              <path d="M58 48 L150 48" />
              <path d="M58 48 L150 72" />
              <path d="M150 24 L250 24" />
              <path d="M150 48 L250 60" />
              <path d="M150 72 L250 60" />
            </g>
            {/* nodes */}
            <g>
              <circle cx="58" cy="48" r="9" fill="#002da1" />
              <circle cx="150" cy="24" r="6.5" fill="#2ad4d4" />
              <circle cx="150" cy="48" r="6.5" fill="#2ad4d4" />
              <circle cx="150" cy="72" r="6.5" fill="#2ad4d4" />
              <circle cx="250" cy="24" r="5.5" fill="#94a3b8" />
              <circle cx="250" cy="60" r="5.5" fill="#94a3b8" />
            </g>
            <g
              fill="#64748b"
              fontSize="8"
              fontFamily="ui-sans-serif, system-ui"
            >
              <text x="40" y="72">VPC</text>
              <text x="138" y="14">subnet</text>
              <text x="244" y="14">EC2</text>
              <text x="240" y="80">RDS</text>
            </g>
          </svg>
        </div>

        {/* facets by provider */}
        <div className="rounded-xl border border-slate-100 p-3">
          <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
            <Filter className="h-3 w-3" /> By provider
          </div>
          <div className="space-y-1.5">
            {[
              { name: "aws" as const, label: "AWS", count: "2,034", pct: 42 },
              { name: "azure" as const, label: "Azure", count: "1,588", pct: 33 },
              { name: "gcp" as const, label: "Google Cloud", count: "1,199", pct: 25 },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2">
                <CloudLogo name={p.name} className="w-14 shrink-0 scale-90" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span
                    className="block h-full rounded-full bg-brand-500"
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right text-[10px] tabular-nums text-slate-500">
                  {p.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </AppWindow>
    </div>
  );
}
