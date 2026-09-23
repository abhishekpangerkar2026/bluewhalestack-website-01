import { cn } from "@/lib/utils";

/**
 * Section heading — the one h2 hierarchy used on every page.
 * `eyebrow` / `display-2` are site-wide utilities (app/globals.css), so the
 * tracked label and the title scale are identical from page to page.
 * Left-aligned by default.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  inverse?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("section-heading", centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-5 inline-flex items-center gap-3", inverse && "text-[var(--gold)]")}>
          <span aria-hidden className="h-px w-7 bg-[var(--gold)]" />
          {eyebrow}
        </p>
      )}
      <h2 className={cn("display-2", inverse ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[15px] leading-[1.85] text-pretty sm:text-base",
            inverse ? "text-white/70" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
