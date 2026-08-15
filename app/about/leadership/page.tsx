import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { LeadershipSpotlight, LeadershipTile } from "@/components/sections/LeadershipCard";
import { leadership } from "@/content/about";

export const metadata: Metadata = {
  title: "Leadership & Team",
  description:
    "Meet the team building the command center for every cloud — engineers, architects and product thinkers solving enterprise cloud management at scale.",
};

const departments = [
  {
    name: "Engineering",
    icon: "Code2",
    description:
      "Platform infrastructure, cloud connectors, the Whale AI engine, and the core control-plane services that power every edition.",
    focus: ["Core Platform", "Cloud Connectors", "Whale AI", "Security & Compliance"],
  },
  {
    name: "Product",
    icon: "Layers",
    description:
      "Module strategy, UX design, and the roadmap that keeps every edition growing from Standard to Sovereign.",
    focus: ["Platform Strategy", "UX & Design", "Editions Roadmap", "Partner Integrations"],
  },
  {
    name: "Go-to-Market",
    icon: "Globe",
    description:
      "Sales, partnerships, and customer success — helping governments, telcos and enterprises get the most from the platform.",
    focus: ["Enterprise Sales", "Channel Partners", "Customer Success", "Solutions Engineering"],
  },
  {
    name: "Operations",
    icon: "ShieldCheck",
    description:
      "Trust, compliance, finance and business operations keeping the platform reliable and the company growing responsibly.",
    focus: ["Trust & Compliance", "Finance", "Legal", "People & Culture"],
  },
];

const values = [
  {
    icon: "Boxes",
    title: "Build for the whole estate",
    body: "We solve the hard problem — governing every cloud, on-prem and sovereign — not just one hyperscaler's happy path.",
  },
  {
    icon: "ShieldCheck",
    title: "Trust is earned, not claimed",
    body: "We hold ISO 27001 and completed a SOC 2 Type II readiness assessment. Our security posture is verifiable, not a marketing badge.",
  },
  {
    icon: "Sparkles",
    title: "Intelligence where work happens",
    body: "Whale AI runs inside every module. We embed intelligence into the workflow, not into a separate chat window.",
  },
  {
    icon: "MapPin",
    title: "Sovereign by design",
    body: "Air-gapped, in-region, and DPDP/GDPR-compliant from day one — because regulated customers can't retrofit these requirements.",
  },
];

const announcedLeaders = leadership.filter((l) => l.name);
const unannouncedRoles = leadership.filter((l) => !l.name);

export default function LeadershipPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    About · Leadership
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  The team building the command center for{" "}
                  <span className="text-accent">every cloud</span>.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="lg:pb-2">
                <p className="text-lg leading-relaxed text-muted">
                  Engineers, architects and product thinkers solving enterprise cloud management at scale —
                  for governments, telcos and the world&apos;s leading enterprises.
                  Based across Mumbai and Ajman, working globally.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/careers" size="lg">
                    Join the team
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/about" size="lg" variant="secondary">
                    Our story
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Leadership roster ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Meet the team"
              title="Leadership"
              description="The people setting direction for the platform, the product, and the company."
            />
          </Reveal>
          <div className="mt-14">
            {announcedLeaders.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                {announcedLeaders.map((l, i) => (
                  <Reveal key={l.name} delay={(i % 2) * 80}>
                    <LeadershipSpotlight member={l} />
                  </Reveal>
                ))}
              </div>
            )}
            {unannouncedRoles.length > 0 && (
              <div
                className={`grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 ${
                  announcedLeaders.length > 0 ? "mt-6" : ""
                }`}
              >
                {unannouncedRoles.map((l, i) => (
                  <Reveal key={l.role} delay={(i % 4) * 70}>
                    <LeadershipTile member={l} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Departments ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we're organised"
              title="Four disciplines, one platform"
              description="We build, ship, sell and support the platform as one team across India and the UAE."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {departments.map((d, i) => (
              <Reveal key={d.name} delay={(i % 2) * 60}>
                <Card className="flex h-full flex-col gap-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                      <Icon name={d.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-ink">{d.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{d.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {d.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-sunken px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Principles ── */}
      <section className="border-y border-line bg-sunken py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="The principles we build on"
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 60}>
                <div className="h-full bg-surface p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={v.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Where we are ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where we are"
              title="Global team, two hubs"
              description="Headquartered in Mumbai with a presence in Ajman, UAE — serving customers across Asia-Pacific, the Middle East and beyond."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {[
              {
                city: "Mumbai, India",
                label: "Headquarters",
                body: "Engineering, product, and operations. The core platform and Whale AI are built here.",
                detail: "Innov8 Ackruti Star, 3rd Floor, 301, Central Road, Marol MIDC, near Marol Telephone Exchange, Andheri (E), Mumbai, Maharashtra 400093",
              },
              {
                city: "Ajman, UAE",
                label: "Middle East",
                body: "Government, Telco and Enterprise customers across the GCC region.",
                detail: "Office BC-892084, 26th Floor, Amber Gem Tower, Sheikh Khalifa Street",
              },
            ].map((loc, i) => (
              <Reveal key={loc.city} delay={i * 80}>
                <Card className="flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-ink">{loc.city}</h3>
                    <span className="rounded-full bg-[var(--bg-active)] px-3 py-1 text-xs font-semibold text-accent">
                      {loc.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{loc.body}</p>
                  <p className="text-xs text-faint">{loc.detail}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Hiring CTA ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  We&apos;re hiring
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                  Build the platform that governs the world&apos;s clouds.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  Open roles across engineering, product, sales and operations —
                  in India, the UAE, and remote.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button href="/careers" size="lg" variant="white">
                  See open roles
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/contact" size="lg" className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15">
                  Send your CV
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
