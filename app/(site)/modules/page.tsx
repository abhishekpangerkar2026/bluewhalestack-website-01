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
import { modulesPageSpec } from "@/content/cms/docs/modulesPage";
import { modulesPage } from "@/content/sections/modulesPage";
import { getPageDoc } from "@/lib/cms-page";
import { editAttr, imageSrcSet, imageUrl } from "@/lib/cms";
import { getFamilies, getModules } from "@/lib/content";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(modulesPageSpec, modulesPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/modules");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function ModulesPage() {
  const built = await builtPage("/modules");
  if (built) return built;
  const [c, families, modules] = await Promise.all([getContent(), getFamilies(), getModules()]);
  // Only families that actually contain modules — an empty section is worse than none.
  const ORDER = families.filter((fam) => modules.some((m) => m.group === fam.key));
  const shipsKicker = (n: number) => (n === 1 ? c.families.shipsOne : c.families.shipsMany).replace("{n}", String(n));
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
                  { value: c.hero.statCapabilities.value, label: c.hero.statCapabilities.label },
                  { value: ORDER.length, label: c.hero.statFamiliesLabel },
                  { value: modules.length, label: c.hero.statModulesLabel },
                  { value: c.hero.statEditions.value, label: c.hero.statEditions.label },
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
        <p className="text-sm text-faint">{c.hero.note}</p>
      </CmsPhotoHero>

      <nav aria-label="Capability families" className="border-b border-line bg-surface">
        <Container>
          <div className="flex items-center gap-5 overflow-x-auto py-5">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-faint">{c.families.navLabel}</span>
            {ORDER.map((fam, i) => (
              <a key={fam.key} href={`#${fam.key}`} className="inline-flex shrink-0 items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-accent">
                <span className="font-mono text-[10px] text-faint">0{i + 1}</span>{fam.name}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {/* ── Family sections, alternating surface, indexed, asymmetric heading column ── */}
      {ORDER.map((fam, gi) => {
        const groupMods = modules.filter((m) => m.group === fam.key);
        const tinted = gi % 2 === 1;
        return (
          <section
            key={fam.key}
            id={fam.key}
            className={`scroll-mt-24 border-t border-line py-20 sm:py-24 ${
              tinted ? "bg-sunken" : "bg-canvas"
            }`}
          >
            <Container>
              <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
                <Reveal>
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    {fam.tile ? (
                      <img
                        data-sanity={editAttr(fam.tile.sanity)}
                        src={imageUrl(fam.tile.src, 800)}
                        srcSet={imageSrcSet(fam.tile.src, [480, 800, 1200])}
                        sizes="(min-width:1024px) 360px, 100vw"
                        alt={fam.tile.alt ?? ""}
                        width={fam.tile.width ?? 1200}
                        height={fam.tile.height ?? 942}
                        loading="lazy"
                        className="mb-6 w-full max-w-[360px] rounded-xl border border-line shadow-md"
                        style={{ objectPosition: fam.tile.focal }}
                      />
                    ) : (
                      <img
                        data-sanity={editAttr(fam.cmsId ? { id: fam.cmsId, type: "capabilityFamily", path: "tile" } : undefined)}
                        src={familyTileSrc(fam.key, 800)}
                        srcSet={`${familyTileSrc(fam.key, 480)} 480w, ${familyTileSrc(fam.key, 800)} 800w`}
                        sizes="(min-width:1024px) 360px, 100vw"
                        alt=""
                        width={1200}
                        height={942}
                        loading="lazy"
                        className="mb-6 w-full max-w-[360px] rounded-xl border border-line shadow-md"
                      />
                    )}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-fg">
                        <Icon name={fam.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-bold text-faint num">
                        {String(gi + 1).padStart(2, "0")} / {String(ORDER.length).padStart(2, "0")}
                      </span>
                    </div>
                    <SectionHeading
                      eyebrow={shipsKicker(groupMods.length)}
                      title={fam.name}
                      description={fam.blurb}
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
                            {c.families.cardLink}
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
            <SectionHeading {...c.closing.heading} />
            <Button href={c.closing.cta.href} size="lg" className="shrink-0">
              {c.closing.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
