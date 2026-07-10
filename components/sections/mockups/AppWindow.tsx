import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Boxes,
  Wallet,
  ShieldCheck,
  MoveRight,
} from "lucide-react";

/**
 * Shared browser-chrome + sidebar shell for the code-based product mockups
 * (in lieu of stock screenshots). Pure HTML/SVG, on-brand. Pass the active
 * nav label and the screen content as children.
 *
 * Mirrors the chrome in components/sections/ProductMockup.tsx so every mockup
 * reads as the same product.
 */
const NAV = [
  { i: LayoutDashboard, l: "Overview" },
  { i: Boxes, l: "Inventory" },
  { i: Wallet, l: "FinOps" },
  { i: ShieldCheck, l: "Security" },
  { i: MoveRight, l: "Migrate" },
];

export function AppWindow({
  active,
  url = "app.bluewhalestack.com",
  children,
}: {
  active: string;
  url?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_40px_80px_-24px_rgba(15,23,42,0.35)]">
      {/* top bar */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <div className="ml-3 flex-1">
          <div className="mx-auto w-fit rounded-md bg-slate-100 px-3 py-1 text-[11px] text-slate-400">
            {url}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[150px_1fr] max-[420px]:grid-cols-1">
        {/* sidebar */}
        <aside className="hidden border-r border-slate-100 p-3 sm:block">
          <div className="flex items-center gap-2 px-2 pb-3">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-600 text-[10px] font-bold text-white">
              ▦
            </span>
            <span className="text-xs font-semibold text-slate-700">
              Control Plane
            </span>
          </div>
          {NAV.map((n) => {
            const isActive = n.l === active;
            return (
              <div
                key={n.l}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
                  isActive
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "text-slate-500"
                }`}
              >
                <n.i className="h-3.5 w-3.5" />
                {n.l}
              </div>
            );
          })}
        </aside>

        {/* main */}
        <div className="space-y-3 p-4">{children}</div>
      </div>
    </div>
  );
}
