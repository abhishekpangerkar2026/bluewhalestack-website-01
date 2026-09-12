import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Iso } from "@/components/illustrations/Iso";
import { perks, jobs } from "@/content/careers";
import { leadership } from "@/content/about";
import { company } from "@/content/company";

const team = leadership.filter((l) => l.name && l.image);
const applyHref = (title: string) =>
  `mailto:${company.emails.careers}?subject=${encodeURIComponent(`Application: ${title}`)}`;

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
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="eyebrow text-accent">
                    Careers
                  </span>
                </div>
                <h1 className="display-1 text-ink">
                  Build the control plane that banks, ministries and operators run on.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  We are engineers, architects and product people in Mumbai, Ajman and Wilmington, building one platform
                  across six public clouds, virtualised estates and air-gapped sites. The work is concrete — connectors,
                  discovery engines, policy evaluation, an AI layer that runs offline — and it ships quarterly to customers
                  who audit what we build.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#roles" size="lg">
                    View open roles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/about/leadership" size="lg" variant="secondary">
                    Who you would work with
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="mx-auto w-full max-w-[360px]">
                <Iso name="network" title="A distributed team, one platform" />
              </div>
            </Reveal>
          </div>

          {/* the people you'd work with — real headshots from the leadership roster */}
          {team.length > 0 && (
            <Reveal delay={140}>
              <Link
                href="/about/leadership"
                className="group mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-lg border border-line bg-canvas p-5 transition-colors hover:border-line-strong sm:p-6"
              >
                <div className="flex -space-x-3">
                  {team.map((m) => (
                    <span
                      key={m.name}
                      className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-surface"
                    >
                      <Image
                        src={m.image!}
                        alt={m.name!}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover object-top"
                      />
                    </span>
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">
                    Meet the people you&apos;d be building with
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    Founder, product, delivery and go-to-market leads across Mumbai, Ajman and Wilmington.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Leadership &amp; team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          )}
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
        className="relative scroll-mt-24 overflow-hidden border-b border-white/10 bg-brand-900 py-24 text-white sm:py-32"
      >
        <Container className="relative">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow="Open roles"
                  title="Find your role"
                  description="We hire across engineering, product, sales and operations — in India, the UAE, the United States, and remote."
                  inverse
                />
                <p className="mt-8 text-sm text-white/70">
                  Don&apos;t see your role?{" "}
                  <a
                    href={`mailto:${company.emails.careers}?subject=${encodeURIComponent("General application")}`}
                    className="font-semibold text-white hover:text-white/80"
                  >
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
                      href={applyHref(j.title)}
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
