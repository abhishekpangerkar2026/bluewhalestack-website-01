import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronDown, ExternalLink, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CertBadgeGrid } from "@/components/brand/CertBadge";
import { CertificateVault } from "@/components/trust/CertificateVault";
import { certifications, trustPillars, trustFaq } from "@/content/trust";

export const metadata: Metadata = {
  title: "Trust Center — BlueWhale Stack",
  description:
    "BlueWhale Stack's security certifications, compliance posture, and privacy programme. ISO 27001, ISO 27017, ISO 27018, ISO 27701, ISO 22301, CSA STAR Level 1, SOC 2 Type II readiness assessment, GDPR, and India DPDP Act 2023.",
};

export default function TrustPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-500/30 blur-[120px]"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-brand-200" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                    Trust Center
                  </span>
                </div>
                <h1 className="text-[2.6rem] font-bold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Security and compliance,{" "}
                  <span className="text-brand-200">independently verified.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                  BlueWhale Stack holds nine certifications and compliance
                  attestations across information security, privacy, cloud
                  security, and business continuity — independently audited
                  ISO certifications, a CSA STAR self-assessment, and a SOC 2
                  Type II readiness assessment, all current and downloadable
                  below.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#certifications" size="lg">
                    Download certificates
                  </Button>
                  <Button
                    href="/legal/privacy"
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
                  >
                    Privacy policy
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    href="/legal/terms"
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white"
                  >
                    Terms of service
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Cert badge cloud — floats on a light card so the dark badge tiles keep contrast */}
            <Reveal delay={100}>
              <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-lg sm:p-7">
                <CertBadgeGrid />
              </div>
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
      <section id="certifications" className="scroll-mt-20 bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Certifications"
              title="Nine certifications. All current."
              description="ISO certifications are independently audited by accredited third-party bodies. CSA STAR Level 1 is a self-assessment and SOC 2 Type II is a readiness assessment — not a CPA-issued audit opinion. Signed certificate PDFs are available for download below; full audit reports and attestation letters are available to Enterprise customers under NDA."
            />
          </Reveal>

          <div className="mt-14">
            <CertificateVault certifications={certifications} />
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
                  Signed ISO certificates are downloadable above. SOC 2
                  readiness reports, underlying audit evidence, and DPA
                  templates are available to Enterprise customers under NDA.
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
