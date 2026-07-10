import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductMockup } from "@/components/sections/ProductMockup";
import { CloudLogo } from "@/components/brand/CloudLogos";
import { hero } from "@/content/home";

const TRUST_CLOUDS = ["aws", "azure", "gcp", "oracle", "vmware"];

export function Hero() {
  // Emphasize the highlight word(s) within the headline, if present.
  const parts =
    hero.highlight && hero.title.includes(hero.highlight)
      ? hero.title.split(hero.highlight)
      : null;

  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      {/* subtle dot grid, faded toward the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent_75%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          {/* Left: copy */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-muted shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success-fg)]" />
              {hero.badge}
            </span>

            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-ink sm:text-[3.4rem]">
              {parts ? (
                <>
                  {parts[0]}
                  <span className="text-accent">{hero.highlight}</span>
                  {parts[1]}
                </>
              ) : (
                hero.title
              )}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="outline">
                {hero.secondaryCta.label}
              </Button>
            </div>

            {/* trust row */}
            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
                Across every major cloud, on-prem &amp; hybrid
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 opacity-80">
                {TRUST_CLOUDS.map((c) => (
                  <CloudLogo key={c} name={c} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: product mock */}
          <div className="relative">
            <ProductMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
