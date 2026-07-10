import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ctaSection } from "@/content/home";

export function CTASection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-xl border border-line bg-surface px-6 py-16 shadow-sm sm:px-14 sm:py-20">
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Get started
              </p>
              <h2 className="mt-5 max-w-2xl text-[2.1rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {ctaSection.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                {ctaSection.subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button href={ctaSection.primaryCta.href} variant="primary" size="lg">
                {ctaSection.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={ctaSection.secondaryCta.href}
                size="lg"
                variant="outline"
              >
                {ctaSection.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
