import { cn } from "@/lib/utils";

export function Stat({
  value,
  label,
  className,
  inverse = false,
}: {
  value: string;
  label: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <div className={cn("text-left", className)}>
      <div
        className={cn(
          "num font-display text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-[2.75rem]",
          inverse ? "text-white" : "text-ink",
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "mt-2.5 max-w-[20ch] text-[13px] leading-relaxed",
          inverse ? "text-white/70" : "text-muted",
        )}
      >
        {label}
      </div>
    </div>
  );
}
