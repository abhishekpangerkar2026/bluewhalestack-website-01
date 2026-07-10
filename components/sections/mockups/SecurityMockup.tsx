import { ShieldCheck, FileCheck } from "lucide-react";
import { AppWindow } from "./AppWindow";

/**
 * Security & Compliance product screen — a compliance score, findings by
 * severity, and per-framework posture. Code-based, on-brand.
 */

const SCORE = 97;
// circumference for r=26 ring
const R = 26;
const C = 2 * Math.PI * R;

export function SecurityMockup() {
  return (
    <div className="relative">
      {/* floating accent card */}
      <div className="absolute -left-5 top-14 z-10 hidden rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-xl sm:block animate-fade-up [animation-delay:300ms]">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <div className="font-display text-sm font-bold text-slate-900">
              0 critical
            </div>
            <div className="text-[10px] text-slate-500">open findings</div>
          </div>
        </div>
      </div>

      <AppWindow active="Security">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">Security &amp; Compliance</div>
            <div className="font-display text-sm font-bold text-slate-900">
              Posture
            </div>
          </div>
          <span className="rounded-md border border-slate-200 px-2 py-1 text-[10px] text-slate-500">
            CSPM · continuous
          </span>
        </div>

        {/* score + severities */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-xl border border-slate-100 p-3">
          {/* radial gauge */}
          <div className="relative grid h-[72px] w-[72px] place-items-center">
            <svg viewBox="0 0 64 64" className="h-[72px] w-[72px] -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={R}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r={R}
                fill="none"
                stroke="#002da1"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - SCORE / 100)}
              />
            </svg>
            <div className="absolute text-center">
              <div className="font-display text-base font-bold leading-none text-slate-900">
                {SCORE}%
              </div>
              <div className="text-[8px] text-slate-400">score</div>
            </div>
          </div>
          {/* severities */}
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { l: "Critical", v: "0", c: "bg-red-500" },
              { l: "High", v: "3", c: "bg-orange-400" },
              { l: "Medium", v: "41", c: "bg-amber-400" },
              { l: "Low", v: "88", c: "bg-slate-300" },
            ].map((s) => (
              <div
                key={s.l}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-2 py-1"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500">
                  <span className={`h-2 w-2 rounded-full ${s.c}`} />
                  {s.l}
                </span>
                <span className="font-display text-xs font-bold tabular-nums text-slate-800">
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* frameworks */}
        <div className="rounded-xl border border-slate-100 p-3">
          <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
            <FileCheck className="h-3 w-3" /> Frameworks
          </div>
          <div className="space-y-1.5">
            {[
              { f: "CIS", pct: 98 },
              { f: "NIST", pct: 95 },
              { f: "ISO 27001", pct: 96 },
              { f: "HIPAA", pct: 99 },
            ].map((r) => (
              <div key={r.f} className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-[10px] font-medium text-slate-600">
                  {r.f}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span
                    className="block h-full rounded-full bg-accent-500"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-[10px] tabular-nums text-slate-500">
                  {r.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </AppWindow>
    </div>
  );
}
