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
        "rounded-lg border border-line bg-surface p-6 shadow-sm",
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
