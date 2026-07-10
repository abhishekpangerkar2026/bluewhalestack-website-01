"use client";

import { useState } from "react";
import { Wallet, Boxes, ShieldCheck } from "lucide-react";
import { ProductMockup } from "@/components/sections/ProductMockup";
import { InventoryMockup } from "@/components/sections/mockups/InventoryMockup";
import { SecurityMockup } from "@/components/sections/mockups/SecurityMockup";

/**
 * Product showcase — a tabbed set of code-based product screens (in lieu of
 * stock screenshots) so the platform page shows the real product, on-brand.
 */
const TABS = [
  {
    key: "finops",
    label: "FinOps",
    icon: Wallet,
    caption: "See, forecast and charge back every dollar across clouds.",
    render: () => <ProductMockup />,
  },
  {
    key: "inventory",
    label: "Inventory",
    icon: Boxes,
    caption: "A live, unified map of every resource and its dependencies.",
    render: () => <InventoryMockup />,
  },
  {
    key: "security",
    label: "Security",
    icon: ShieldCheck,
    caption: "Continuous CSPM and compliance posture in one view.",
    render: () => <SecurityMockup />,
  },
] as const;

export function ProductShowcase() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("finops");
  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <div>
      {/* tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-brand-200 bg-brand-50 text-brand-700"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* caption */}
      <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-500">
        {current.caption}
      </p>

      {/* screen */}
      <div
        key={current.key}
        className="mx-auto mt-8 max-w-2xl animate-fade-up px-2 sm:px-6"
      >
        {current.render()}
      </div>
    </div>
  );
}
