import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { InnerPage } from "@/components/layout/InnerPage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { photos, photoSrc, photoSrcSet } from "@/content/photos";
import { getHomePage } from "@/lib/content";
import { imageSrcSet, imageUrl } from "@/lib/cms";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products — four products, one platform DNA",
  description:
    "BlueWhale Stack, the flagship control plane; WhaleDocs for governed enterprise content; BlueWhale Public Cloud as consumable governed regions; and the OEM Appliance, rack-ready. One identity, policy, audit and tenancy engine underneath all four.",
};

const EARNS = [
  { product: "BlueWhale Stack", model: "Annual licence by edition — renewable, upgradeable" },
  { product: "WhaleDocs", model: "Per-seat / per-repository subscription" },
  { product: "BlueWhale Public Cloud", model: "Metered consumption on governed regions" },
  { product: "BlueWhale Appliance — OEM", model: "Hardware margin plus the attached platform subscription" },
];

const FOUNDATIONS = [
  "One trust story — the certification set (ISO/IEC 27001 · 22301 · 27017 · 27018 · 27701, GDPR and CSA STAR Level 1 assessments, SOC 2 Type II readiness assessed) and the Trust Center cover the product line.",
  "One identity, policy and audit engine — built once in the Stack, inherited by every product.",
  "One support model — L1/L2 with the customer or partner, L3 with BlueWhale, a 24×7 critical bridge at 99.9%.",
  "One roadmap discipline — quarterly releases; no forced upgrades on sovereign estates.",
];

export default async function ProductsPage() {
  const { portfolio } = await getHomePage();
  return (
    <InnerPage category="platform" current="/products">
      <CmsPhotoHero
        route="/products"
        photo="appliance-enclosure"
        eyebrow={portfolio.eyebrow}
        title={<>Four products. <span className="text-accent">One platform DNA.</span></>}
        description={portfolio.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/platform" size="lg">The flagship platform<ArrowRight className="h-4 w-4" /></Button>
          <Button href="/contact?intent=sales" size="lg" variant="outline">Talk to sales</Button>
        </div>
      </CmsPhotoHero>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {portfolio.products.map((pr, i) => {
              const key = pr.photo ?? "platform-stack";
              const ph = photos[key];
              const src = pr.image ? imageUrl(pr.image.src, 1024) : photoSrc(key, 1024);
              const srcSet = pr.image ? imageSrcSet(pr.image.src) : photoSrcSet(key);
              return (
                <Reveal key={pr.name} delay={(i % 2) * 80}>
                  <Link href={pr.href} className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm sm:flex-row">
                    <div className="overflow-hidden bg-[#f6f7fa] sm:w-[44%] sm:shrink-0">
                      <img src={src} srcSet={srcSet} sizes="(min-width:768px) 30vw, 100vw" alt={pr.image?.alt ?? ph.alt} width={pr.image?.width ?? ph.width} height={pr.image?.height ?? ph.height} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] max-sm:aspect-[3/2]" style={{ objectPosition: pr.image?.focal }} />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <span className={cn("self-start rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]", pr.status === "Available" ? "border-[var(--gold)] bg-[var(--brand-deep)] text-white" : "border-line bg-sunken text-muted")}>{pr.status}</span>
                      <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-ink">{pr.name}</h2>
                      <p className="mt-1 text-[13px] font-semibold text-gold-text">{pr.role}</p>
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">{pr.body}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Learn more <ArrowRight className="h-3.5 w-3.5" /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-faint">{portfolio.note}</p>
        </Container>
      </section>

      <section className="border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="How the products earn" title="Four doors, one governed story." description="A customer entering through any product inherits the same identity, policy, audit and tenancy engine — and an upgrade to the full platform is an extension, never a migration." />
              <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                <table className="w-full text-sm">
                  <thead><tr className="bg-primary text-left text-primary-fg"><th className="px-5 py-3 font-semibold">Product</th><th className="px-5 py-3 font-semibold">Revenue model</th></tr></thead>
                  <tbody className="divide-y divide-line">
                    {EARNS.map((r) => (<tr key={r.product}><td className="px-5 py-3.5 font-semibold text-ink">{r.product}</td><td className="px-5 py-3.5 text-muted">{r.model}</td></tr>))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <SectionHeading eyebrow="Shared foundations" title="Built once. Inherited by every product." />
              <ul className="mt-8 space-y-4">
                {FOUNDATIONS.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 shadow-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--gold)] text-white"><Check className="h-3 w-3" /></span>
                    <span className="text-[14px] leading-relaxed text-ink">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <ClosingCTA
        eyebrow="Next step"
        title="Start with the platform — every other product inherits it."
        body="The discovery workshop puts the control plane on your estate's shape in half a day; the 90-day prototype proves it on your real environments before any commercial conversation."
        primary={{ label: "Book the discovery workshop", href: "/contact?intent=demo", note: "Half a day · your technology and finance leads" }}
        secondary={{ label: "Compare the editions", href: "/editions", note: "Standard · Enterprise · Telco & Datacenter · Government" }}
        tertiary={{ label: "Trust Center", href: "/trust", note: "certificates and the compliance posture behind every product" }}
      />
    </InnerPage>
  );
}
