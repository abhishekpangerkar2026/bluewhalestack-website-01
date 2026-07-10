import { cn } from "@/lib/utils";

/**
 * Branded placeholder for imagery / diagrams not yet supplied.
 * Documents the intended subject + aspect ratio so a real asset
 * can be dropped in later. See design/diagrams.md for diagram specs.
 */
export function Placeholder({
  label,
  ratio = "16/9",
  tone = "brand",
  className,
}: {
  label: string;
  ratio?: string;
  tone?: "brand" | "dark" | "subtle";
  className?: string;
}) {
  const tones = {
    brand:
      "bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 border-brand-200",
    dark: "bg-gradient-to-br from-ink-900 to-brand-900 text-brand-100 border-white/10",
    subtle: "bg-slate-50 text-slate-400 border-slate-200",
  };
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex w-full items-center justify-center rounded-2xl border border-dashed",
        tones[tone],
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1 px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest opacity-60">
          Placeholder
        </span>
        <span className="text-sm font-medium">{label}</span>
        <span className="text-[0.7rem] opacity-50">{ratio}</span>
      </div>
    </div>
  );
}
