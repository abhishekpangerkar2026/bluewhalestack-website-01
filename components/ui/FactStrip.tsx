import { cn } from "@/lib/utils";

export interface Fact {
  value: string;
  label: string;
}

/**
 * Proof row under a hero: three or four facts in a hairline strip. The value
 * is set at a size that suits words as well as numbers, so "Outbound only"
 * reads as a fact and not as a fake KPI.
 */
export function FactStrip({
  facts,
  inverse = false,
  className,
}: {
  facts: Fact[];
  inverse?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-lg border sm:grid-cols-3",
        facts.length === 4 && "lg:grid-cols-4",
        inverse ? "border-white/10 bg-white/10" : "border-line bg-line",
        className,
      )}
    >
      {facts.map((f) => (
        <div key={f.label} className={cn("px-5 py-4", inverse ? "bg-brand-900" : "bg-surface")}>
          <dt className={cn("font-display text-[19px] font-semibold tracking-[-0.02em]", inverse ? "text-white" : "text-ink")}>
            {f.value}
          </dt>
          <dd className={cn("mt-1.5 text-[12.5px] leading-snug", inverse ? "text-white/60" : "text-muted")}>
            {f.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
