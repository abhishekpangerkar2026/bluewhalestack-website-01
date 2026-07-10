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
          "num font-sans text-3xl font-bold tracking-tight sm:text-4xl",
          inverse ? "text-white" : "text-ink",
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "mt-1.5 text-sm",
          inverse ? "text-white/70" : "text-muted",
        )}
      >
        {label}
      </div>
    </div>
  );
}
