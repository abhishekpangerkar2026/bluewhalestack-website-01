import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CertBadgeGrid } from "@/components/brand/CertBadge";
import { CertificateVault } from "@/components/trust/CertificateVault";
import { trustPageSpec } from "@/content/cms/docs/trustPage";
import { trustPage } from "@/content/sections/trustPage";
import { getPageDoc } from "@/lib/cms-page";
import { getCertifications } from "@/lib/content";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(trustPageSpec, trustPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/trust");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function TrustPage() {
  const built = await builtPage("/trust");
  if (built) return built;
  const [c, certifications] = await Promise.all([getContent(), getCertifications()]);
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
          <Button href={c.hero.primary.href} size="lg">
            {c.hero.primary.label}
          </Button>
          <Button href={c.hero.secondary.href} variant="outline" size="lg">
            {c.hero.secondary.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={c.hero.tertiary.href} variant="outline" size="lg">
            {c.hero.tertiary.label}
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
            {c.pillars.items.map((p, i) => (
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
            <SectionHeading {...c.certifications.heading} />
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
            <SectionHeading {...c.matrix.heading} />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-faint">
                      {c.matrix.columns.certification}
                    </th>
                    <th className="pb-3 text-center text-xs font-semibold normal-case tracking-wider text-faint">
                      {c.matrix.columns.saas}
                    </th>
                    <th className="pb-3 text-center text-xs font-semibold uppercase tracking-wider text-faint">
                      {c.matrix.columns.byoc}
                    </th>
                    <th className="pb-3 text-center text-xs font-semibold uppercase tracking-wider text-faint">
                      {c.matrix.columns.sovereign}
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
            <SectionHeading {...c.faq.heading} />
          </Reveal>
          <div className="mt-10 max-w-3xl divide-y divide-line">
            {c.faq.items.map((item, i) => (
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
                  {c.cta.title}
                </h2>
                <p className="mt-2 text-white/70">
                  {c.cta.body}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button href={c.cta.primary.href} variant="white" size="lg">
                  {c.cta.primary.label}
                </Button>
                <Button href={c.cta.secondary.href} variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  {c.cta.secondary.label}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </InnerPage>
  );
}
