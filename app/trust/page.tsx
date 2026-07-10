import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronDown, ExternalLink, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CertBadge, CertBadgeGrid } from "@/components/brand/CertBadge";
import {
  certifications,
  certCategories,
  trustPillars,
  trustFaq,
  type CertCategory,
} from "@/content/trust";

export const metadata: Metadata = {
  title: "Trust Center — BlueWhale Stack",
  description:
    "BlueWhale Stack's security certifications, compliance posture, and privacy programme. ISO 27001, ISO 27017, ISO 27018, ISO 27701, ISO 22301, CSA STAR Level 2, SOC 2 Type II, GDPR, and India DPDP Act 2023.",
};

const CATEGORY_ORDER: CertCategory[] = [
  "information-security",
  "cloud-security",
  "privacy",
  "business-continuity",
  "compliance",
];


export default function TrustPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    meta: certCategories[cat],
    items: certifications.filter((c) => c.category === cat),
  }));

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line bg-canvas">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_50%_at_60%_0%,black,transparent_80%)]"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Trust Center
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Security and compliance,{" "}
                  <span className="text-accent">independently verified.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                  BlueWhale Stack holds nine international certifications across
                  information security, privacy, cloud security, and business
                  continuity — all third-party audited and current.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact" size="lg">
                    Request audit reports
                  </Button>
                  <Button href="/legal/privacy" variant="outline" size="lg">
                    Privacy policy
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Cert badge cloud — real SVG badges */}
            <Reveal delay={100}>
              <CertBadgeGrid />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Trust pillars ── */}
      <section className="border-b border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Certifications by category ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Certifications"
              title="Nine certifications. All current."
              description="Every certification is independently audited by an accredited third party. Audit reports and attestation letters are available to Enterprise customers under NDA."
            />
          </Reveal>

          <div className="mt-14 space-y-16">
            {grouped.map(({ cat, meta, items }) =>
              items.length === 0 ? null : (
                <Reveal key={cat}>
                  <div>
                    {/* Category header */}
                    <div className="mb-6 flex items-center gap-4">
                      <h2 className="text-lg font-bold text-ink">{meta.label}</h2>
                      <span className="h-px flex-1 bg-line" />
                      <Badge tone="neutral">{items.length}</Badge>
                    </div>

                    {/* Cert cards */}
                    <div className="grid gap-5 md:grid-cols-2">
                      {items.map((cert, i) => (
                        <Reveal key={cert.id} delay={i * 70}>
                          <Card className="h-full">
                            <div className="flex items-start gap-4">
                              {/* SVG certification badge */}
                              <div className="w-16 shrink-0">
                                <CertBadge certId={cert.id} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-base font-bold text-ink">
                                    {cert.name}
                                  </h3>
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--success-bg)] px-2.5 py-0.5 text-xs font-semibold text-[var(--success-fg)]">
                                    <Check className="h-3 w-3" />
                                    Certified
                                  </span>
                                </div>
                                <p className="mt-0.5 text-xs text-faint">
                                  {cert.fullName}
                                </p>
                              </div>
                            </div>

                            <p className="mt-4 text-sm leading-relaxed text-muted">
                              {cert.description}
                            </p>

                            <dl className="mt-5 grid gap-3 border-t border-line pt-4 text-xs sm:grid-cols-2">
                              <div>
                                <dt className="font-semibold text-ink">Scope</dt>
                                <dd className="mt-1 text-muted">{cert.scope}</dd>
                              </div>
                              <div>
                                <dt className="font-semibold text-ink">Audit cycle</dt>
                                <dd className="mt-1 text-muted">{cert.cycle}</dd>
                              </div>
                            </dl>
                          </Card>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* ── Compliance matrix strip ── */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Deployment models"
              title="Compliance across every deployment"
              description="All certifications apply to SaaS. BYOC and Sovereign deployments additionally scope in-region data residency and customer-managed key controls."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-faint">
                      Certification
                    </th>
                    <th className="pb-3 text-center text-xs font-semibold uppercase tracking-wider text-faint">
                      SaaS
                    </th>
                    <th className="pb-3 text-center text-xs font-semibold uppercase tracking-wider text-faint">
                      BYOC
                    </th>
                    <th className="pb-3 text-center text-xs font-semibold uppercase tracking-wider text-faint">
                      Sovereign
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {certifications.map((cert) => (
                    <tr key={cert.id} className="group">
                      <td className="py-3.5 font-medium text-ink">{cert.name}</td>
                      <td className="py-3.5 text-center">
                        <Check className="mx-auto h-4 w-4 text-[var(--success-fg)]" />
                      </td>
                      <td className="py-3.5 text-center">
                        <Check className="mx-auto h-4 w-4 text-[var(--success-fg)]" />
                      </td>
                      <td className="py-3.5 text-center">
                        <Check className="mx-auto h-4 w-4 text-[var(--success-fg)]" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Common security questions"
            />
          </Reveal>
          <div className="mt-10 max-w-3xl divide-y divide-line">
            {trustFaq.map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <details className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
                    <span className="text-base font-semibold text-ink">
                      {item.q}
                    </span>
                    <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--brand-deep)] py-16 text-white">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Need the full audit package?
                </h2>
                <p className="mt-2 text-white/70">
                  SOC 2 Type II report, ISO certificates, and DPA templates are
                  available to Enterprise customers under NDA.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button href="/contact" variant="white" size="lg">
                  Request documents
                </Button>
                <Button href="/editions/sovereign" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Sovereign edition
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
