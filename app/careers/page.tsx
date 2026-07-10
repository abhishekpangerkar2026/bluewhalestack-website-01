import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { perks, jobs } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build the future of cloud infrastructure with BlueWhale Stack. Open roles across engineering, product, sales and more.",
};

export default function CareersPage() {
  return (
    <>
      {/* ── Hero: editorial split, oversized statement left ── */}
      <section className="border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-sm font-bold tabular-nums text-accent">
                    00
                  </span>
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Careers
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  Build the future of{" "}
                  <span className="text-accent">cloud infrastructure</span>.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="lg:pb-2">
                <p className="text-lg leading-relaxed text-muted">
                  We&apos;re a team of engineers, architects and product thinkers
                  solving enterprise cloud management at scale — for governments,
                  telcos and the world&apos;s leading enterprises.
                </p>
                <div className="mt-8">
                  <Button href="#roles" size="lg">
                    View open roles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Perks: bold heading + bordered grid ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Life here"
              title="Why you'll love working with us"
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 60}>
                <div className="h-full bg-surface p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Roles: dark statement band, split heading + role list ── */}
      <section
        id="roles"
        className="relative scroll-mt-24 overflow-hidden bg-brand-900 py-24 text-white sm:py-32"
      >
        <Container className="relative">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow="Open roles"
                  title="Find your role"
                  description="We hire across engineering, product, sales and operations — in India, the UAE, and remote."
                  inverse
                />
                <p className="mt-8 text-sm text-white/60">
                  Don&apos;t see your role?{" "}
                  <a href="/contact" className="font-semibold text-white hover:text-white/80">
                    Send us your CV
                  </a>{" "}
                  — we&apos;re always meeting great people.
                </p>
              </div>
            </Reveal>
            <div className="flex flex-col divide-y divide-white/10">
              {jobs.map((j, i) => (
                <Reveal key={j.title} delay={(i % 6) * 40}>
                  <div className="group flex flex-col gap-3 py-5 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white transition-colors group-hover:text-white/80">
                        {j.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
                        <span className="font-semibold text-white/90">
                          {j.department}
                        </span>
                        <span aria-hidden className="text-white/20">
                          /
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {j.location}
                        </span>
                        <span>{j.type}</span>
                        <span>{j.remote}</span>
                      </div>
                    </div>
                    <Button
                      href="/contact"
                      variant="white"
                      size="sm"
                      className="shrink-0 self-start sm:self-auto"
                    >
                      Apply
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
