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
        "surface-card rounded-lg border border-line bg-surface p-6 sm:p-7",
        interactive &&
          "transition-colors duration-200 hover:border-line-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}
