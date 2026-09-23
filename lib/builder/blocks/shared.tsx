import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export const bgClass = (bg?: string) =>
  ({
    white: "bg-white",
    sunken: "bg-sunken",
    sky: "bg-[var(--brand-sky)]",
    dark: "bg-brand-900 text-white",
    gradient: "bg-brand-gradient text-white sheen",
    deck: "bg-deck",
  })[bg ?? "white"] ?? "bg-white";

export const isDark = (bg?: string) => bg === "dark" || bg === "gradient";

export const padClass = (pad?: string) =>
  ({ none: "", sm: "py-10 sm:py-12", md: "py-16 sm:py-20", lg: "py-24 sm:py-32" })[pad ?? "md"] ?? "py-16 sm:py-20";

export const widthClass = (w?: string) =>
  ({ narrow: "max-w-2xl", normal: "max-w-3xl", wide: "max-w-5xl", full: "" })[w ?? "normal"] ?? "max-w-3xl";

/** A page band: background + vertical rhythm + the site container. */
export function Band({ bg, pad = "md", border, className, children, inner }: { bg?: string; pad?: string; border?: boolean; className?: string; inner?: string; children: ReactNode }) {
  return (
    <section className={cn("relative", bgClass(bg), padClass(pad), border && (isDark(bg) ? "border-t border-white/10" : "border-t border-line"), className)}>
      <Container className={inner}>{children}</Container>
    </section>
  );
}

/** Renders a Puck richtext value (HTML when published, a live editor node inside the builder). */
export function Rich({ content, className }: { content: unknown; className?: string }) {
  if (typeof content === "string") return <div className={cn("builder-prose", className)} dangerouslySetInnerHTML={{ __html: content }} />;
  return <div className={cn("builder-prose", className)}>{content as ReactNode}</div>;
}

/** Text props are strings when published and live nodes while editing inline — both render the same way. */
export type Txt = string | ReactNode;
export const str = (v: unknown): string => (typeof v === "string" ? v : "");
