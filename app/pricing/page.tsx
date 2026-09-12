import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Iso } from "@/components/illustrations/Iso";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { getEditions } from "@/lib/content";
import { modules } from "@/content/modules";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "BlueWhale Stack pricing — four editions from Standard to Government, with a feature-by-edition comparison.",
};

const faqs = [
  {
    q: "What's included in each edition?",
    a: "Every edition runs the same control plane. Standard is scoped to three public clouds (AWS/Azure/GCP) and a single tenant. Enterprise unlocks all six public clouds, on-prem via Edge Agent, and multi-tenancy. Telco & Datacenter and Government are full Enterprise plus domain-specific layers. See the comparison table below.",
  },
  {
    q: "Can I upgrade to a higher edition later?",
    a: "Yes — editions are licensing configurations of one platform, not separate products. Upgrading from Standard to Enterprise (or from Enterprise to Telco & Datacenter or Government) is a licensing change, not a migration or re-deployment.",
  },
  {
    q: "How does Managed Resource Unit (MRU) pricing work?",
    a: "Standard includes 1,000 MRU at the base price, with overage bands available. Enterprise includes 100 cloud accounts and up to 1,000,000 managed resources at $120K list. The Telco & Datacenter Edition is metered per network element (telecom operators) or per rack (datacenter operators).",
  },
  {
    q: "How is Whale AI priced?",
    a: "Each edition includes a Whale AI tier with a monthly token allowance — Spark (1M) for Standard, Spark/Tide/Abyss (100M) for Enterprise and above. Additional token packs are available as add-ons.",
  },
  {
    q: "Do you offer BYOC or air-gapped sovereign deployment?",
    a: "Yes. Enterprise supports SaaS, BYOC, and Sovereign. The Government edition is purpose-built for air-gapped sovereign deployment — FIPS crypto, PAM always-on, WORM audit log, in-region AI only, and offline update channel.",
  },
  {
    q: "Is there a proof-of-concept option?",
    a: "Yes — the 90-day prototype. A half-day discovery workshop agrees the success criteria, then the platform runs on your own estate for 90 days with no licence cost and is scored on those criteria before any licensing decision. Conversion pricing is agreed up front.",
  },
  {
    q: "Which currencies and procurement routes do you support?",
    a: "USD list prices; INR and AED invoicing through the Indian and UAE entities; USD through the Delaware entity. Government buys through tender or empanelment on 3–5 year fixed-bid terms; partners can transact through the Partner Portal.",
  },
  {
    q: "What about the DPA and security review?",
    a: "A DPA covering GDPR Article 28 and DPDP is standard. Five ISO certifications, a SOC 2 Type II readiness assessment and a CSA STAR Level 1 self-assessment are downloadable from the Trust Center; full audit reports are available under NDA.",
  },
];

export default function PricingPage() {
  const editions = getEditions();
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
                    Pricing
                  </span>
                </div>
                <h1 className="display-1 text-ink">
                  Two published prices. Two shaped to the estate.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Standard is $24,000 a year and Enterprise is $120,000 a year — flat, published, on 1-, 3- or 5-year
                  terms with 10% off for two years and 15% off for three. The Telco &amp; Datacenter and Government
                  editions are priced per operator or per contract, because they are metered on network elements, racks or
                  sovereignty scope rather than on cloud accounts.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-ink">The unit:</span> a Managed Resource Unit (MRU) is one discovered
                  resource under management — an instance, a bucket, a database, a VM. Standard includes 1,000; Enterprise
                  includes up to 1,000,000 across 100 cloud accounts.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact?intent=sales" size="lg">
                    Get a quote for your resource count
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="#compare" size="lg" variant="outline">
                    Module-by-edition matrix
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="mx-auto w-full max-w-[380px]">
                <Iso name="chart" title="Whalenomics — spend explained, decomposed, owned" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Tier cards: asymmetric, featured edition pulled forward ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Editions"
              title="Pick where you start"
              description="Every edition runs the same control plane. The featured plan is where most teams begin."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {editions.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 4) * 60}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-lg p-6 transition-all duration-200 ${
                    e.comingSoon
                      ? "border border-line bg-sunken"
                      : e.featured
                      ? "bg-surface shadow-md ring-2 ring-primary hover:-translate-y-0.5"
                      : "border border-line bg-surface shadow-sm hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md"
                  }`}
                >
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      {e.comingSoon ? (
                        <Badge tone="neutral">
                          Preview{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
                        </Badge>
                      ) : e.featured ? (
                        <Badge tone="brand" className="self-start">
                          Most popular
                        </Badge>
                      ) : (
                        <span className="num text-sm font-bold text-faint">
                          0{i + 1}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-ink">
                      {e.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      {e.tagline}
                    </p>
                    <div className="mt-4 num text-lg font-bold text-ink">
                      {e.priceAnchor}
                    </div>
                    {e.priceSub && (
                      <p className="mt-1 text-xs leading-snug text-faint">
                        {e.priceSub}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-ink">For:</span> {e.audience}
                    </p>
                    <ul className="mt-3 flex-1 space-y-1.5">
                      {e.includes.map((x) => (
                        <li key={x} className="flex items-start gap-2 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {x}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-xs text-faint">
                      {e.deploy.join(" · ")}
                    </div>
                    <Button
                      href={e.comingSoon ? "/contact?intent=preview" : "/contact?intent=sales"}
                      size="sm"
                      variant={e.featured ? "primary" : "secondary"}
                      className="mt-5"
                    >
                      {e.comingSoon
                        ? "Join the preview"
                        : ["standard", "enterprise"].includes(e.slug)
                        ? "Get a quote"
                        : "Talk to sales"}
                    </Button>
                    <Link
                      href={`/editions/${e.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent"
                    >
                      Edition details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What drives the price ── */}
      <section className="border-t border-line bg-canvas py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What drives the price"
              title="Four inputs, and a worked example"
              description="Every proposal is built from the same four numbers. Bring them to the quote and the answer comes back in days, not a procurement cycle."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Managed resources", v: "Discovered resources under management (MRU). Standard 1,000 · Enterprise up to 1,000,000." },
              { k: "Cloud accounts", v: "Standard 5 · Enterprise 100. On-prem sites connect through the Edge Agent and count by resource." },
              { k: "Deployment mode", v: "SaaS in four regions, BYOC in your accounts, on-premises, sovereign air-gapped or edge." },
              { k: "Operator or sovereign scope", v: "Telco & Datacenter is metered per network element or per rack; Government per contract and accreditation scope." },
            ].map((d) => (
              <div key={d.k} className="bg-surface p-6">
                <p className="font-bold text-ink">{d.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.v}</p>
              </div>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="mt-8 rounded-lg border-l-4 border-amber-400 bg-sunken p-6 text-sm leading-relaxed text-ink">
              <span className="font-bold">Worked example:</span> a bank with 60 AWS and Azure accounts, 180,000 discovered
              resources and two VMware sites, deployed BYOC in its own accounts, fits inside Enterprise at $120,000 a year —
              all twelve modules, 1,000 users and Whale AI at 100M tokens a month included. On a three-year term the list
              price is $102,000 a year.
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Comparison matrix ── */}
      <section id="compare" className="scroll-mt-20 bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Compare"
              title="Every module, mapped to every edition"
              description="Fourteen modules across four editions. A tick means included in the licence; the module pages carry each one's current maturity."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-4 pl-6 pr-4 text-left font-bold text-ink">
                      Module
                    </th>
                    {editions.map((e) => (
                      <th
                        key={e.slug}
                        className="px-3 py-4 text-center font-bold"
                      >
                        <span className={e.comingSoon ? "text-faint" : "text-ink"}>{e.name}</span>
                        {e.comingSoon && (
                          <span className="mt-0.5 block text-xs font-medium text-faint">
                            Preview{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m, i) => (
                    <tr
                      key={m.slug}
                      className={`border-b border-line last:border-0 ${i % 2 === 1 ? "bg-sunken/60" : ""}`}
                    >
                      <td className="py-3 pl-6 pr-4 text-left font-medium text-muted">
                        {m.name}
                      </td>
                      {editions.map((e) => (
                        <td key={e.slug} className="px-3 py-3 text-center">
                          {e.modules.includes(m.slug) ? (
                            <Check className="mx-auto h-4 w-4 text-accent" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-faint" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── FAQ: split editorial — heading left, numbered list right ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow="FAQ"
                  title="Pricing questions, answered"
                  description="Licensing unit, upgrade path, Whale AI allowances, sovereign deployment and proof-of-concept terms."
                />
                <Button href="/contact?intent=sales" variant="secondary" className="mt-8">
                  Get a quote for your resource count
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
            <div className="flex flex-col">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 70}>
                  <div className="group flex items-start gap-6 border-t border-line py-7 first:border-t-0 first:pt-0">
                    <span className="num text-2xl font-bold text-accent/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">
                        {f.q}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ClosingCTA
        eyebrow="Two ways to buy"
        title="A proposal for your estate, or a prototype on it."
        body="Send your account and resource counts and a written proposal comes back within the week. Or start with the 90-day prototype and decide on evidence."
        primary={{
          label: "Get a proposal for your estate",
          href: "/contact?intent=sales",
          note: "Account and resource counts in, a written proposal out — usually within a week",
        }}
        secondary={{
          label: "Start the 90-day prototype",
          href: "/platform#prototype",
          note: "Half-day discovery workshop, then 90 days on your estate with no licence cost.",
        }}
        tertiary={{ label: "Trust Center", href: "/trust", note: "certificates and the DPA for procurement" }}
      />
    </>
  );
}
