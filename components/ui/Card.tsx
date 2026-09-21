import { cn } from "@/lib/utils";

/**
 * Surface card — matches the product app: white/elevated surface, hairline
 * border, 8px radius, subtle shadow. `interactive` adds a hover lift.
 */
export function Card({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "surface-card rounded-xl border border-line bg-surface p-6 shadow-sm sm:p-7",
        interactive && "card-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
