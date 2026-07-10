import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { modules, moduleGroups, type ModuleGroup } from "@/content/modules";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "The BlueWhale Stack module catalog — foundation, operations, builder, datacenter, and AI capabilities.",
};

const ORDER: ModuleGroup[] = [
  "foundation",
  "operations",
  "builder",
  "datacenter",
  "ai",
];

const GROUP_BLURB: Record<ModuleGroup, string> = {
  foundation: "Identity, connectors, inventory and the audit spine the whole platform stands on.",
  operations: "Run the estate day to day — service management, telemetry, migration and security.",
  builder: "Design landing zones, ship infrastructure-as-code, and account for every dollar.",
  datacenter: "Map and operate physical infrastructure down to the rack, unit and watt.",
  ai: "Claude-powered intelligence threaded across every module — not bolted on.",
};

export default function ModulesPage() {
  return (
    <>
      {/* ── Editorial intro ── */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <div className="grid items-end gap-x-16 gap-y-10 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Modules"
                title={
                  <>
                    Every capability,{" "}
                    <span className="text-accent">one platform.</span>
                  </>
                }
                description="A shared platform gated per edition. Compose the modules you need — from cloud connectors to DCIM to Whale AI — under one governance model."
              />
            </Reveal>
            <Reveal delay={90}>
              <div className="flex items-center gap-8 lg:justify-end">
                <div>
                  <div className="font-display text-6xl font-bold tracking-tight text-accent num">
                    {modules.length}
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted">
                    modules across {ORDER.length} groups
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Group sections, alternating surface, indexed, asymmetric heading column ── */}
      {ORDER.map((group, gi) => {
        const groupMods = modules.filter((m) => m.group === group);
        const tinted = gi % 2 === 1;
        return (
          <section
            key={group}
            className={`border-t border-line py-20 sm:py-24 ${
              tinted ? "bg-sunken" : "bg-canvas"
            }`}
          >
            <Container>
              <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
                <Reveal>
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-display text-sm font-bold text-faint num">
                        {`0${gi + 1}`}
                      </span>
                      <span aria-hidden className="h-px w-8 bg-line-strong" />
                    </div>
                    <SectionHeading
                      eyebrow={moduleGroups[group]}
                      title={moduleGroups[group]}
                      description={GROUP_BLURB[group]}
                    />
                  </div>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2">
                  {groupMods.map((m, i) => (
                    <Reveal key={m.slug} delay={(i % 2) * 80}>
                      <Link href={`/modules/${m.slug}`} className="group/card block h-full">
                        <Card interactive className="flex h-full flex-col">
                          <div className="flex items-center justify-between">
                            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg">
                              <Icon name={m.icon} className="h-5 w-5" />
                            </span>
                            <span className="font-display text-sm font-bold text-faint num">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="mt-5 font-display text-lg font-bold text-ink">
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
              title="Not sure which modules you need?"
              description="Tell us how you run today — we will map the modules and edition to your estate."
            />
            <Button href="/contact" size="lg" className="shrink-0">
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
