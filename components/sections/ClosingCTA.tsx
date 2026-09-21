import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import styles from "./EditorialSections.module.css";

export interface CtaPath {
  label: string;
  href: string;
  /** What happens after this next step, and its time commitment. */
  note?: string;
}

export function ClosingCTA({ eyebrow = "Next step", title, body, primary, secondary, tertiary, variant = "dark" }: {
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
    <section className={cn(styles.closing, "py-20 sm:py-28 lg:py-32", dark ? "bg-[#0a1530] text-white" : "border-t border-line bg-sunken text-ink")}>
      {dark && <div aria-hidden className={styles.orbits} />}
      <Container>
        <Reveal>
          <div className="max-w-4xl">
            <p className={cn("eyebrow mb-6 flex items-center gap-2.5", dark ? "text-[#83d9ee]" : "text-accent")}><span aria-hidden className="h-1.5 w-1.5 rounded-sm bg-current" />{eyebrow}</p>
            <h2 className={styles.closingHeadline}>{title}</h2>
            <p className={cn("mt-7 max-w-2xl text-base leading-[1.85] sm:text-[17px]", dark ? "text-slate-300" : "text-muted")}>{body}</p>
          </div>
          <div className={cn("mt-10 grid gap-8 border-t pt-9 sm:mt-12 sm:gap-12", secondary ? "md:grid-cols-2" : "max-w-lg", dark ? "border-white/15" : "border-line")}>
            <div>
              <Button href={primary.href} size="lg" variant={dark ? "white" : "primary"} className="max-w-full whitespace-normal text-left leading-snug">{primary.label}<ArrowUpRight aria-hidden className="h-4 w-4" /></Button>
              {primary.note && <p className={cn("mt-4 max-w-md text-xs leading-relaxed", dark ? "text-slate-400" : "text-muted")}>{primary.note}</p>}
            </div>
            {secondary && <div>
              <Link href={secondary.href} className={cn("group inline-flex min-h-[3.25rem] items-center gap-3 text-sm font-semibold", dark ? "text-white" : "text-ink")}>{secondary.label}<ArrowRight aria-hidden className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" /></Link>
              {secondary.note && <p className={cn("mt-4 max-w-md text-xs leading-relaxed", dark ? "text-slate-400" : "text-muted")}>{secondary.note}</p>}
            </div>}
          </div>
          {tertiary && <div className="mt-9"><Link href={tertiary.href} className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs", dark ? "text-slate-300 hover:text-white" : "text-muted hover:text-accent")}><span className="font-semibold">{tertiary.label}</span><ArrowUpRight aria-hidden className="h-3.5 w-3.5" />{tertiary.note && <span className={cn("w-full sm:ml-3 sm:w-auto", dark ? "text-slate-400" : "text-faint")}>{tertiary.note}</span>}</Link></div>}
        </Reveal>
      </Container>
    </section>
  );
}
