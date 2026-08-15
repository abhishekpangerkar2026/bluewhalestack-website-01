import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerTracks } from "@/components/sections/PartnerTracks";
import { PartnerJourney } from "@/components/sections/PartnerJourney";
import { PartnerDocuments } from "@/components/sections/PartnerDocuments";
import { partnerPortal } from "@/content/company";
import { portalFeatures, tiers, tiersNote, whyPartner } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Three ways to partner with BlueWhale Stack — License Service Provider, System Implementation Partner, or Strategic (country) Partner. Apply and run your business through the Partner Portal at partner.bluewhalestack.com.",
};

export default function PartnersPage() {
  return (
    <>
      {/* ── Hero: clean light statement band ── */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
        />
        <Container className="relative">
          <div className="max-w-3xl py-20 sm:py-28">
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Partner Ecosystem
              </span>
            </div>
            <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
              Grow together.{" "}
              <span className="text-accent">Win together.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Three ways to partner with BlueWhale Stack — resell licenses,
              implement and support the platform for end customers, or operate
              as the official partner for your country. Apply in minutes and
              go live after approval.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={partnerPortal.register} external size="lg">
                Become a partner
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                href={partnerPortal.login}
                external
                size="lg"
                variant="secondary"
              >
                Partner login
              </Button>
            </div>
            <p className="mt-5 text-sm text-faint">
              Portal:{" "}
              <span className="text-accent">partners.bluewhalestack.com</span>
            </p>
          </div>
        </Container>
      </section>

      {/* ── Why partner: editorial split, heading left / reasons right ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow="Why partner"
                  title="A platform built to grow your business"
                  description="Hyperscaler-neutral, multi-edition, and backed by a portal that runs the commercial side for you."
                />
              </div>
            </Reveal>
            <div className="flex flex-col">
              {whyPartner.map((w, i) => (
                <Reveal key={w.title} delay={i * 90}>
                  <div className="flex items-start gap-6 border-t border-line py-7 first:border-t-0 first:pt-0">
                    <span className="num text-2xl font-bold text-accent/40">
                      0{i + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <Icon name={w.icon} className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-bold text-ink">
                          {w.title}
                        </h3>
                      </div>
                      <p className="mt-2 leading-relaxed text-muted">
                        {w.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Partner tracks: alternating detail + code-rendered visual ── */}
      <PartnerTracks />

      {/* ── Partner journey: tabbed onboarding path per track ── */}
      <section id="journey" className="scroll-mt-24 bg-canvas py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The journey"
              title="From application to launch"
              description="Every track runs through the Partner Portal, but the enablement steps differ. Pick a track to see its path."
            />
          </Reveal>
          <div className="mt-14">
            <PartnerJourney />
          </div>
        </Container>
      </section>

      {/* ── Program guides: gated PDF download per track ── */}
      <PartnerDocuments />

      {/* ── Partner Portal: asymmetric feature grid + tiers ── */}
      <section id="portal" className="scroll-mt-24 bg-canvas py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Partner Portal"
                title="Run your reselling business in one place"
                description="Deal registration, two-sided invoicing, margins, payments and provisioning — live at partners.bluewhalestack.com."
              />
            </Reveal>
            <Reveal delay={80}>
              <Button
                href={partnerPortal.login}
                external
                variant="secondary"
                className="shrink-0"
              >
                Open the portal
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {portalFeatures.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 70}>
                <div className="h-full bg-surface p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-accent">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tiers — quiet surface band */}
          <Reveal delay={120}>
            <div className="relative mt-12 overflow-hidden rounded-lg border border-line bg-surface p-8 shadow-sm">
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  LSP margin tiers
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  Tiers apply to License Service Providers and grow with
                  committed volume. Strategic Partners operate above Platinum
                  under a bespoke territory agreement.
                </p>
                <div className="mt-6 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-4">
                  {tiers.map((t, i) => (
                    <div key={t.name} className="h-full bg-surface p-5">
                      <div className="flex items-baseline gap-2">
                        <span className="num text-sm font-bold text-accent">
                          0{i + 1}
                        </span>
                        <div className="font-bold text-ink">
                          {t.name}
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted">
                        {t.note}
                      </p>
                      <dl className="mt-4 space-y-1.5 border-t border-line pt-3 text-xs">
                        <div className="flex justify-between gap-2">
                          <dt className="text-faint">Margin</dt>
                          <dd className="text-right font-semibold text-ink">{t.margin}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-faint">Commitment</dt>
                          <dd className="text-right font-semibold text-ink">{t.commitment}</dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs italic text-faint">{tiersNote}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={partnerPortal.register} external size="lg">
                Become a partner
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                href={partnerPortal.login}
                external
                size="lg"
                variant="secondary"
              >
                Partner login
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
