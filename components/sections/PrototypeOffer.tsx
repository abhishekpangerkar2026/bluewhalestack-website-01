import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { prototypeOfferContent } from "@/content/sections/platformPage";
import type { prototypeOffer } from "@/content/cms/docs/platformPage";
import type { Infer } from "@/content/cms/spec";
import styles from "./EditorialSections.module.css";

export type PrototypeOfferContent = Infer<typeof prototypeOffer.fields>;

/** The standing 90-day prototype offer. `offer` comes from the page's CMS document; the code copy is the fallback. */
export function PrototypeOffer({ tinted = false, offer = prototypeOfferContent }: { tinted?: boolean; offer?: PrototypeOfferContent }) {
  return (
    <section id="prototype" className={`border-b border-line py-20 sm:py-28 ${tinted ? "bg-sunken" : "bg-canvas"}`}>
      <Container>
        <Reveal><SectionHeading eyebrow={offer.eyebrow} title={offer.title} description={offer.description} /></Reveal>
        <ol className={styles.timeline}>
          {offer.steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span aria-hidden className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div aria-hidden className={styles.stepTrack} />
                <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-wide text-accent">{step.when}</p>
                <h3 className="text-lg font-semibold tracking-[-0.025em] text-ink">{step.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.85] text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <Reveal>
          <div className="mt-12 flex flex-col gap-7 border-t border-line pt-9 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-2xl"><p className="font-display text-lg font-semibold tracking-tight text-ink">{offer.ctaTitle}</p><p className="mt-2 text-sm leading-[1.8] text-muted">{offer.ctaBody}</p></div>
            <Button href={offer.ctaHref} size="lg" className="self-start lg:self-center">{offer.ctaLabel}<ArrowUpRight aria-hidden className="h-4 w-4" /></Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
