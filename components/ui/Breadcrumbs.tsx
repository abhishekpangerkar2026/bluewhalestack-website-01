import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

const SITE = "https://www.bluewhalestack.com";

/**
 * Breadcrumb trail for detail pages, with BreadcrumbList JSON-LD so search
 * engines get the position of the page as well as the reader.
 */
export function Breadcrumbs({
  items,
  inverse = false,
  className,
}: {
  items: Crumb[];
  inverse?: boolean;
  className?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Home", href: "/" }, ...items].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE}${c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  className={cn("h-3.5 w-3.5", inverse ? "text-white/40" : "text-faint")}
                  aria-hidden
                />
              )}
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className={cn(
                    "font-medium transition-colors",
                    inverse ? "text-white/70 hover:text-white" : "text-muted hover:text-accent",
                  )}
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn("font-semibold", inverse ? "text-white" : "text-ink")}
                >
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
