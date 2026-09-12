import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
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
    <>
      {/* ── Editorial intro ── */}
      <section className="border-b border-line bg-canvas pb-16 pt-20 sm:pt-28">
        <Container>
          <div className="grid items-end gap-x-16 gap-y-10 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="eyebrow text-accent">The nine capability families</span>
                </div>
                <h1 className="display-1 text-ink">
                  What lives in the{" "}
                  <span className="text-accent">platform core.</span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                  Nine capability families under one console, one identity,
                  one policy and one bill — 54 capabilities, gated per
                  edition. These are the modules that ship inside each family
                  today; the full capability list with edition mapping is in
                  the technical datasheet, on request.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flex items-end gap-10 lg:justify-end">
                <div className="lg:text-right">
                  <div className="text-6xl font-bold tracking-tight text-accent num sm:text-7xl">
                    54
                  </div>
                  <p className="eyebrow mt-1 text-faint">capabilities</p>
                </div>
                <div className="lg:text-right">
                  <div className="text-6xl font-bold tracking-tight text-ink num sm:text-7xl">
                    {ORDER.length}
                  </div>
                  <p className="eyebrow mt-1 text-faint">families</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

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
                            {m.tagline}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                            Explore module
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
    </>
  );
}
