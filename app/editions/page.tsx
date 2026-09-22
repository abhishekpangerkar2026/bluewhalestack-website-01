import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getEditions } from "@/lib/content";
import { modules } from "@/content/modules";
import { Iso, EDITION_ISO } from "@/components/illustrations/Iso";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "Editions",
  description:
    "Compare BlueWhale Stack editions — Standard, Enterprise, Telco & Datacenter, and Government — with a module-by-edition matrix.",
};

export default async function EditionsPage() {
  const editions = await getEditions();

  return (
    <InnerPage category="platform" current="/editions">
      {/* ── Intro: editorial split ── */}
      <CmsPhotoHero
        route="/editions"
        photo="editions-rack"
        eyebrow="Editions · four licences, one deployment"
        title={<>Four editions. <span className="text-accent">One architecture.</span></>}
        description="Standard at $24,000 a year for a single AWS, Azure or GCP estate; Enterprise at $120,000 a year for every cloud and every estate; the Telco & Datacenter Edition for operators who sell governed cloud services; the Government Edition for air-gapped, accredited estates. An upgrade is a licence change, never a migration."
      >
        <p className="max-w-xl text-[14px] font-semibold leading-relaxed text-ink">
          Choosing in one question: do you consume cloud (Standard), govern it at scale (Enterprise), sell it to tenants (Telco &amp; Datacenter) — or must it never leave the perimeter (Government)?
        </p>
      </CmsPhotoHero>
      <section className="bg-canvas py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {editions.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 4) * 70}>
                <Card
                  interactive
                  className={`flex h-full flex-col ${e.featured ? "ring-1 ring-accent" : ""} ${e.comingSoon ? "bg-sunken" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    {e.comingSoon ? (
                      <Badge tone="neutral">
                        Preview{e.gaTarget ? ` · GA ${e.gaTarget}` : ""}
                      </Badge>
                    ) : e.featured ? (
                      <Badge tone="warning">Most deployed</Badge>
                    ) : (
                      <span aria-hidden className="h-[26px]" />
                    )}
                    <span className="text-sm font-bold text-faint num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <Iso name={EDITION_ISO[e.slug]} className="mt-3 h-32 w-auto self-start" />
                  <h3 className="mt-3 text-xl font-bold text-ink">
                    {e.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium italic text-accent">
                    {e.tagline}
                  </p>
                  <div className="mt-4 flex-1 space-y-4">
                    <div>
                      <p className="eyebrow">Who it targets</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{e.audience}</p>
                    </div>
                    <div>
                      <p className="eyebrow">What it includes</p>
                      <ul className="mt-1.5 space-y-1">
                        {e.includes.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-sm text-ink">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow">The outcome</p>
                      <p className="mt-1 text-sm font-bold text-ink">{e.outcome}</p>
                    </div>
                  </div>
                  <dl className="mt-5 space-y-1.5 border-t border-line pt-5 text-sm">
                    <div className="flex justify-between gap-3">
                      <dt className="text-faint">Deploy</dt>
                      <dd className="text-right font-medium text-ink">
                        {e.deploy.join(" · ")}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-faint">Price</dt>
                      <dd className="text-right font-medium text-ink">
                        {e.priceAnchor}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/editions/${e.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5"
                  >
                    Explore {e.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison matrix on a tinted band ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Compare"
              title="Modules by edition"
              description="Fourteen modules across four editions. Standard carries eight, Enterprise twelve, and the operator and government editions add Tenancy & Monetization and Sovereign Operations respectively."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-4 pl-5 pr-4 text-left font-semibold text-ink">
                      Module
                    </th>
                    {editions.map((e) => (
                      <th
                        key={e.slug}
                        className="px-3 py-4 text-center font-semibold text-ink"
                      >
                        <span className={e.comingSoon ? "text-faint" : ""}>{e.name}</span>
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
                  {modules.map((m) => (
                    <tr key={m.slug} className="border-b border-line last:border-0">
                      <td className="py-3 pl-5 pr-4 text-left font-medium text-muted">
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

      <ClosingCTA
        eyebrow="Not sure which edition?"
        title="Send your account and resource counts; the edition falls out of the numbers."
        body="Cloud accounts, discovered resources, on-prem sites and the deployment mode you need decide the edition. A written proposal comes back within the week — or start with the 90-day prototype and decide on evidence."
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
        tertiary={{ label: "Published pricing", href: "/pricing", note: "quotas, terms and FAQ" }}
      />
    </InnerPage>
  );
}
