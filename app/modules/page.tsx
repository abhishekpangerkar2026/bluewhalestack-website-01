import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { CountUp } from "@/components/ui/CountUp";
import { familyTileSrc } from "@/content/moduleArt";
import { moduleDetails } from "@/content/moduleDetails";
import {
  modules,
  moduleGroups,
  moduleGroupOrder,
  moduleGroupBlurbs,
  moduleGroupIcons,
  type ModuleGroup,
} from "@/content/modules";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "What lives in the BlueWhale Stack platform core — 54 capabilities across nine families: Management & Delivery, Whalenomics · FinOps, Security & Identity, Governance & Audit, Whale AI, Migration & Discovery, Observability & ITSM, Tenancy & Monetization and Sovereign Operations — gated per edition.",
};

// Only families that actually contain modules — an empty section is worse than none.
const ORDER: ModuleGroup[] = moduleGroupOrder.filter((g) =>
  modules.some((m) => m.group === g),
);

export default function ModulesPage() {
  return (
    <InnerPage category="platform" current="/modules">
      {/* ── Hero ── */}
      <CmsPhotoHero
        route="/modules"
        photo="platform-stack"
        eyebrow="The nine capability families"
        title={<>What lives in the <span className="text-accent">platform core.</span></>}
        description="Fourteen modules across nine families, gated per edition — each with its own page showing what it does, how it works, the console screen, where it fits and the questions buyers ask. Maturity is stated on every card: GA, beta, preview or in progress."
        below={
          <div className="border-t border-line bg-sunken">
            <Container>
              <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-line">
                {[
                  { value: 54, label: "capabilities shipped across the platform" },
                  { value: ORDER.length, label: "capability families under one console" },
                  { value: modules.length, label: "modules, each with its own page and maturity" },
                  { value: 4, label: "editions on one architecture — upgrade is a licence change" },
                ].map((s) => (
                  <div key={s.label} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                    <p className="num text-3xl font-extrabold text-accent sm:text-4xl"><CountUp value={s.value} /></p>
                    <p className="mt-1 text-sm leading-snug text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        }
      >
        <p className="text-sm text-faint">One identity, one inventory and one policy plane. The full 54-capability list with edition mapping is in the technical datasheet, on request.</p>
      </CmsPhotoHero>

      <nav aria-label="Capability families" className="border-b border-line bg-surface">
        <Container>
          <div className="flex items-center gap-5 overflow-x-auto py-5">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-faint">Explore families</span>
            {ORDER.map((group, i) => (
              <a key={group} href={`#${group}`} className="inline-flex shrink-0 items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-accent">
                <span className="font-mono text-[10px] text-faint">0{i + 1}</span>{moduleGroups[group]}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {/* ── Family sections, alternating surface, indexed, asymmetric heading column ── */}
      {ORDER.map((group, gi) => {
        const groupMods = modules.filter((m) => m.group === group);
        const tinted = gi % 2 === 1;
        return (
          <section
            key={group}
            id={group}
            className={`scroll-mt-24 border-t border-line py-20 sm:py-24 ${
              tinted ? "bg-sunken" : "bg-canvas"
            }`}
          >
            <Container>
              <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
                <Reveal>
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <img
                      src={familyTileSrc(group, 800)}
                      srcSet={`${familyTileSrc(group, 480)} 480w, ${familyTileSrc(group, 800)} 800w`}
                      sizes="(min-width:1024px) 360px, 100vw"
                      alt=""
                      width={1200}
                      height={942}
                      loading="lazy"
                      className="mb-6 w-full max-w-[360px] rounded-xl border border-line shadow-md"
                    />
                    <div className="mb-4 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-fg">
                        <Icon name={moduleGroupIcons[group]} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold text-faint num">
                        {String(gi + 1).padStart(2, "0")} / {String(ORDER.length).padStart(2, "0")}
                      </span>
                    </div>
                    <SectionHeading
                      eyebrow={`${groupMods.length} ${groupMods.length === 1 ? "module" : "modules"} ship in this family`}
                      title={moduleGroups[group]}
                      description={moduleGroupBlurbs[group]}
                    />
                  </div>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2">
                  {groupMods.map((m, i) => (
                    <Reveal
                      key={m.slug}
                      delay={(i % 2) * 80}
                      className={groupMods.length === 1 ? "sm:col-span-2" : undefined}
                    >
                      <Link href={`/modules/${m.slug}`} className="group/card block h-full">
                        <Card interactive className="flex h-full flex-col">
                          <div className="flex items-center justify-between">
                            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
                              <Icon name={m.icon} className="h-5 w-5" />
                            </span>
                            <span className="text-sm font-bold text-faint num">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="mt-5 text-lg font-bold text-ink">
                            {m.name}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                            {m.tagline.replace(/\s*\([^)]*\)\s*$/, "")}
                          </p>
                          {moduleDetails[m.slug] && (
                            <span className="mt-3">
                              <Badge tone={moduleDetails[m.slug].status.tone}>{moduleDetails[m.slug].status.label}</Badge>
                            </span>
                          )}
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                            What it does, how it works, FAQ
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-1" />
                          </span>
                        </Card>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* ── Closing CTA ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="Not sure which families you need?"
              description="Tell us how you run today — we will map the families and edition to your estate, and show it running on your estate's shape in the discovery workshop."
            />
            <Button href="/contact?intent=demo" size="lg" className="shrink-0">
              Book the discovery workshop
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
