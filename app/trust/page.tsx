import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CertBadgeGrid } from "@/components/brand/CertBadge";
import { CertificateVault } from "@/components/trust/CertificateVault";
import { certifications, trustPillars, trustFaq } from "@/content/trust";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "BlueWhale Stack's security certifications, compliance posture, and privacy programme. ISO 27001, ISO 27017, ISO 27018, ISO 27701, ISO 22301, CSA STAR Level 1, SOC 2 Type II readiness assessment, GDPR, and India DPDP Act 2023.",
};

export default function TrustPage() {
  return (
    <InnerPage category="resources" current="/trust">
      {/* ── Hero ── */}
      <CmsPhotoHero
        route="/trust"
        photo="sovereign-vault"
        eyebrow="Trust Center"
        title={<>Security and compliance, <span className="text-accent">independently verified.</span></>}
        description="Five ISO management-system certifications — 27001, 27017, 27018, 27701 and 22301 — audited by accredited third-party bodies, plus a CSA STAR Level 1 self-assessment, a GDPR compliance assessment and a SOC 2 Type II readiness assessment. All current, with eight signed certificates downloadable below and full audit reports available to customers under NDA."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#certifications" size="lg">
            Download certificates
          </Button>
          <Button href="/legal/privacy" variant="outline" size="lg">
            Privacy policy
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/legal/terms" variant="outline" size="lg">
            Terms of service
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CmsPhotoHero>

      {/* Cert badge cloud — the real certification marks */}
      <section className="border-b border-line bg-sunken py-10">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-md sm:p-7">
              <CertBadgeGrid />
            </div>
          </Reveal>
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
              title="Five ISO certifications, independently audited. Three assessments, stated as such."
              description="ISO certifications are audited by accredited third-party bodies and carry certificate numbers you can verify. CSA STAR Level 1 is a self-assessment, GDPR is a compliance assessment, and SOC 2 Type II is a readiness assessment — not a CPA-issued audit opinion. Signed certificate PDFs are below; full audit reports and attestation letters are available to Enterprise customers under NDA."
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
                    <th className="pb-3 text-center text-xs font-semibold normal-case tracking-wider text-faint">
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
                <Button href="/editions/government" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Government Edition
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </InnerPage>
  );
}
