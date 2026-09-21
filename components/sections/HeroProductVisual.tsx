import { Wallet, ShieldCheck } from "lucide-react";
import { InventoryMockup } from "./mockups/InventoryMockup";

/**
 * The homepage hero's centerpiece: a real product screen (the same
 * code-built Inventory view used in ProductShowcase, not a photo or a 3D
 * illustration), with two more short annotations — cost and audit — layered
 * on top. This is what the 2026-09-20 review asked for in place of a
 * decorative scene: "a large real interface capture with two or three short
 * HTML annotations explaining inventory, cost or audit work."
 *
 * Honest by construction: it is the platform's real information architecture
 * (real nav, real module names) rendered with representative numbers, and it
 * says so — see the "Illustrative interface" label rendered by the caller.
 */
export function HeroProductVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-5 py-4 sm:px-8">
      <div className="w-full max-w-[520px]">
        <InventoryMockup />
      </div>

      {/* cost annotation — floats off the lower-left edge, clear of the browser chrome and the KPI row */}
      <div className="absolute left-0 top-[46%] hidden animate-fade-up rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xl sm:block [animation-delay:250ms]">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
            <Wallet className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-bold text-slate-900">One explainable bill</div>
            <div className="text-[10px] text-slate-500">every dollar to a workload and an owner</div>
          </div>
        </div>
      </div>

      {/* audit annotation — floats off the lower-right edge */}
      <div className="absolute right-0 bottom-[9%] hidden animate-fade-up rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xl sm:block [animation-delay:550ms]">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <div className="text-sm font-bold text-slate-900">Evidence, continuous</div>
            <div className="text-[10px] text-slate-500">generated, not assembled pre-audit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
