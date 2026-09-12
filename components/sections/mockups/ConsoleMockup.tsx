import { AppWindow } from "./AppWindow";

/**
 * Data-driven product screen for module pages — the same browser chrome and
 * sidebar as the other mockups, with a KPI row, a data table and an optional
 * breakdown panel described by content. Code-based, on-brand, no stock
 * screenshots. Everything shown is illustrative sample data.
 */
export interface ConsoleScreen {
  /** sidebar item to highlight */
  nav: "Overview" | "Inventory" | "FinOps" | "Security" | "Migrate";
  eyebrow: string;
  title: string;
  kpis: { value: string; label: string; note?: string; tone?: "ok" | "warn" }[];
  table: {
    caption: string;
    columns: string[];
    rows: (string | { chip: string; tone: "ok" | "warn" | "info" | "muted" })[][];
  };
  bars?: { caption: string; items: { label: string; value: string; pct: number }[] };
}

const CHIP: Record<"ok" | "warn" | "info" | "muted", string> = {
  ok: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warn: "bg-amber-50 text-amber-700 ring-amber-200",
  info: "bg-brand-50 text-brand-700 ring-brand-200",
  muted: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function ConsoleMockup({ screen }: { screen: ConsoleScreen }) {
  return (
    <AppWindow active={screen.nav}>
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] text-slate-400">{screen.eyebrow}</div>
          <div className="text-sm font-bold text-slate-900">{screen.title}</div>
        </div>
        <span className="rounded-md border border-slate-200 px-2 py-1 text-[10px] text-slate-400">
          Last sync · 2 min ago
        </span>
      </div>

      {/* KPI cards */}
      <div className={`grid gap-2 ${screen.kpis.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
        {screen.kpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
            <div className="text-sm font-bold text-slate-900">{k.value}</div>
            <div className="text-[10px] text-slate-500">{k.label}</div>
            {k.note && (
              <div className={`mt-0.5 text-[10px] ${k.tone === "warn" ? "text-amber-600" : k.tone === "ok" ? "text-emerald-600" : "text-slate-400"}`}>
                {k.note}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <div className="border-b border-slate-100 bg-slate-50/60 px-3 py-1.5 text-[11px] font-medium text-slate-600">
          {screen.table.caption}
        </div>
        <table className="w-full text-[10px]">
          <thead>
            <tr className="text-left text-slate-400">
              {screen.table.columns.map((c) => (
                <th key={c} className="px-3 py-1.5 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {screen.table.rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-100 text-slate-700">
                {r.map((cell, j) => (
                  <td key={j} className="px-3 py-1.5">
                    {typeof cell === "string" ? (
                      <span className={j === 0 ? "font-medium text-slate-900" : ""}>{cell}</span>
                    ) : (
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ring-1 ring-inset ${CHIP[cell.tone]}`}>
                        {cell.chip}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* breakdown bars */}
      {screen.bars && (
        <div className="rounded-xl border border-slate-100 p-3">
          <div className="mb-2 text-[11px] font-medium text-slate-600">{screen.bars.caption}</div>
          <div className="space-y-1.5">
            {screen.bars.items.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="w-24 shrink-0 truncate text-[10px] text-slate-500">{b.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span className="block h-full rounded-full bg-brand-500" style={{ width: `${b.pct}%` }} />
                </div>
                <span className="w-14 shrink-0 text-right text-[10px] tabular-nums text-slate-500">{b.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppWindow>
  );
}
