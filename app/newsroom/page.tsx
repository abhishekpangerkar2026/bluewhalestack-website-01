import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Product launches, partnerships, and company milestones from BlueWhale Stack. Press enquiries: contact@bluewhalestack.com",
};

const announcements = [
  {
    date: "June 2026",
    category: "Product",
    title: "Whale AI reaches 50+ use cases across the platform",
    body: "The Whale AI layer now covers 50+ production use cases spanning FinOps, security, ITSM, migration and observability — available in Spark, Tide and Abyss tiers from Standard edition up.",
    badge: "Product launch",
  },
  {
    date: "May 2026",
    category: "Certification",
    title: "BlueWhale Stack achieves ISO 27001:2022 and completes SOC 2 Type II readiness",
    body: "ISO 27001:2022 is now certified, alongside a SOC 2 Type II readiness assessment against the AICPA Trust Services Criteria. Signed certificates are downloadable from the Trust Center.",
    badge: "Trust & compliance",
  },
  {
    date: "April 2026",
    category: "Product",
    title: "WhaleForge IaC enters public beta",
    body: "WhaleForge — the declarative YAML-to-Terraform engine — is now in public beta with support for AWS, Azure and GCP, plus live HLD/LLD/TOGAF architecture diagrams.",
    badge: "Beta",
  },
  {
    date: "March 2026",
    category: "Platform",
    title: "Landing Zone Builder ships for AWS Control Tower & Azure CLZ",
    body: "The visual Landing Zone Builder generates multi-account baseline HCL for AWS Control Tower, Azure Cloud Landing Zone and GCP foundations — no Terraform expertise required.",
    badge: "Product launch",
  },
  {
    date: "January 2026",
    category: "Platform",
    title: "Government Edition: sovereign & air-gapped deployment GA",
    body: "The Government Edition with full air-gapped, in-region sovereign deployment is generally available. Supports DPDP, GDPR and NCA-ECC compliance with no outbound connectivity required.",
    badge: "GA",
  },
  {
    date: "December 2025",
    category: "Platform",
    title: "Oracle Cloud, IBM Cloud and Alibaba Cloud connectors live",
    body: "The Cloud Connectors module now covers all six major public clouds — AWS, Azure, GCP, Oracle Cloud, IBM Cloud and Alibaba Cloud — plus on-prem via the Edge Agent.",
    badge: "Product launch",
  },
];

const pressContacts = [
  {
    type: "Press & media",
    email: "contact@bluewhalestack.com",
    note: "For interview requests, product briefings and press kit access.",
  },
  {
    type: "Partnerships",
    email: "partners@bluewhalestack.com",
    note: "Technology alliances, channel and reseller partnerships.",
  },
];

type BadgeTone = "brand" | "accent" | "neutral" | "success" | "warning";
const badgeTone: Record<string, BadgeTone> = {
  "Product launch": "accent",
  "Trust & compliance": "success",
  "Beta": "warning",
  "GA": "success",
};

export default function NewsroomPage() {
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
                    Newsroom
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl">
                  News &amp; announcements from{" "}
                  <span className="text-accent">BlueWhale Stack</span>.
                </h1>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="lg:pb-2">
                <p className="text-lg leading-relaxed text-muted">
                  Product launches, certifications, partnerships and company milestones.
                  For press enquiries, reach us at{" "}
                  <a
                    href="mailto:contact@bluewhalestack.com"
                    className="font-semibold text-accent underline-offset-2 hover:underline"
                  >
                    contact@bluewhalestack.com
                  </a>
                  .
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact" size="lg">
                    Contact press team
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/trust" size="lg" variant="secondary">
                    Trust Center
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Announcements ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Latest"
              title="Announcements"
              description="Recent product milestones, certifications and platform updates."
            />
          </Reveal>
          <div className="mt-14 flex flex-col divide-y divide-line">
            {announcements.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 50}>
                <article className="group flex flex-col gap-4 py-8 first:pt-0 sm:flex-row sm:gap-8">
                  <div className="flex shrink-0 items-center gap-3 sm:w-44 sm:flex-col sm:items-start sm:gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                    <Badge tone={badgeTone[item.badge] ?? "neutral"} className="text-[11px]">
                      {item.badge}
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Press contacts ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Media"
              title="Press &amp; media contacts"
              description="We aim to respond to press enquiries within one business day."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {pressContacts.map((c, i) => (
              <Reveal key={c.type} delay={i * 70}>
                <Card className="flex flex-col gap-3 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                    {c.type}
                  </p>
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-1.5 text-lg font-bold text-accent hover:underline"
                  >
                    {c.email}
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </a>
                  <p className="text-sm text-muted">{c.note}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  See it live
                </p>
                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                  Ready to put every cloud on one control plane?
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  Book a personalised demo and see BlueWhale Stack across your actual estate.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <Button href="/contact" size="lg" variant="white" className="shrink-0">
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
