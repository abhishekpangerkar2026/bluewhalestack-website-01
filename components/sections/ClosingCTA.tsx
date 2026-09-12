import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface CtaPath {
  label: string;
  href: string;
  /** one line under the button: what happens, how long it takes */
  note?: string;
}

/**
 * The one closing CTA used on every page. It always states a proposition
 * (what the reader gets) and gives two or three concrete next steps with the
 * time cost attached — never a bare "Book a demo".
 */
export function ClosingCTA({
  eyebrow = "Next step",
  title,
  body,
  primary,
  secondary,
  tertiary,
  variant = "dark",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primary: CtaPath;
  secondary?: CtaPath;
  tertiary?: CtaPath;
  variant?: "dark" | "light";
}) {
  const dark = variant === "dark";
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 sm:py-24",
        dark ? "bg-brand-900 text-white" : "border-t border-line bg-sunken text-ink",
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-500/30 blur-[110px]"
        />
      )}
      <Container className="relative">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <p className={cn("eyebrow", dark ? "text-brand-200" : "text-accent")}>{eyebrow}</p>
              <h2
                className={cn(
                  "mt-5 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl",
                  dark ? "text-white" : "text-ink",
                )}
              >
                {title}
              </h2>
              <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted")}>
                {body}
              </p>
            </div>

            <div
              className={cn(
                "flex flex-col gap-5 rounded-xl border p-6",
                dark ? "border-white/10 bg-white/[0.04]" : "border-line bg-surface shadow-sm",
              )}
            >
              <div>
                <Button
                  href={primary.href}
                  size="lg"
                  variant={dark ? "white" : "primary"}
                  className="w-full sm:w-auto"
                >
                  {primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                {primary.note && (
                  <p className={cn("mt-2.5 text-sm leading-snug", dark ? "text-white/60" : "text-muted")}>
                    {primary.note}
                  </p>
                )}
              </div>
              {secondary && (
                <div className={cn("border-t pt-5", dark ? "border-white/10" : "border-line")}>
                  <Button
                    href={secondary.href}
                    size="lg"
                    variant="outline"
                    className={cn(
                      "w-full sm:w-auto",
                      dark && "border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {secondary.label}
                  </Button>
                  {secondary.note && (
                    <p className={cn("mt-2.5 text-sm leading-snug", dark ? "text-white/60" : "text-muted")}>
                      {secondary.note}
                    </p>
                  )}
                </div>
              )}
              {tertiary && (
                <Link
                  href={tertiary.href}
                  className={cn(
                    "group inline-flex flex-wrap items-center gap-x-2 text-sm font-semibold",
                    dark ? "text-brand-100 hover:text-white" : "text-accent",
                  )}
                >
                  {tertiary.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  {tertiary.note && (
                    <span className={cn("font-normal", dark ? "text-white/50" : "text-faint")}>
                      · {tertiary.note}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
