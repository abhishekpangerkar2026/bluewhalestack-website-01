import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers, Building2, RadioTower, Landmark } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { GlobalInfra } from "@/components/sections/GlobalInfra";
import { StoryVisual } from "@/components/sections/CustomerStories";
import { PrototypeOffer } from "@/components/sections/PrototypeOffer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { LayerStack, LayerList } from "@/components/diagrams/LayerStack";
import { familyTileSrc } from "@/content/moduleArt";
import { photos, photoSrc, photoSrcSet } from "@/content/photos";
import { getCustomerStories, getEditions, getFamilies, getHomePage, getSiteSettings } from "@/lib/content";
import { editAttr, imageSrcSet, imageUrl } from "@/lib/cms";
import { cn } from "@/lib/utils";

const EDITION_ICONS: Record<string, typeof Layers> = { standard: Layers, enterprise: Building2, "telco-datacenter": RadioTower, government: Landmark };

export default async function HomePage() {
  const [home, editions, stories, families, settings] = await Promise.all([getHomePage(), getEditions(), getCustomerStories(), getFamilies(), getSiteSettings()]);
  const s = home.sections;
  const spotlight = stories.find((st) => st.slug === "bfsi-singapore-qatar") ?? stories[0];
  const dark = photos["dark-gateway"];
  return (
    <>
      <Hero data={home.hero} />

      {/* 01 — proof: outcomes from delivered engagements */}
      <section className="border-b border-line bg-sunken py-14 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="eyebrow flex items-center gap-3"><span aria-hidden className="h-px w-7 bg-[var(--gold)]" />{s.proofSection.kicker}</p>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent" href={s.proofSection.link.href}>{s.proofSection.link.label} <ArrowUpRight size={15} /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {home.proofStrip.map((p, i) => (
              <Reveal key={p.href + i} delay={i * 70}>
                <Link href={p.href} className="card-lift block h-full rounded-xl border border-line bg-surface p-6 shadow-sm">
                  <strong className="block text-[30px] font-extrabold leading-none tracking-[-0.03em] text-accent">{p.value}</strong>
                  <p className="mt-3 text-[14px] font-semibold leading-snug text-ink">{p.label}</p>
                  <span className="mt-3 block text-xs text-faint">{p.source}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 02 — the story: hook, problem, turn — on the brand band */}
      <section className="sheen relative overflow-hidden bg-brand-gradient text-white">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block [mask-image:linear-gradient(to_right,transparent_0%,black_38%)]">
          <img src={photoSrc("dark-gateway", 1536)} srcSet={photoSrcSet("dark-gateway")} sizes="55vw" alt="" width={dark.width} height={dark.height} loading="lazy" className="photo-drift h-full w-full object-cover" style={{ objectPosition: dark.focal }} />
        </div>
        <Container className="relative py-20 sm:py-28">
          <div className="lg:max-w-[54%]">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-[var(--gold)]"><span aria-hidden className="h-px w-7 bg-[var(--gold)]" />{home.story.eyebrow}</p>
              <h2 className="display-2 mt-5 text-white">{home.story.hook}</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/75">{home.story.problem}</p>
              <p className="mt-7 border-l-2 border-[var(--gold)] pl-5 text-xl font-semibold leading-snug text-white">{home.story.turn}</p>
            </Reveal>
            <div className="mt-11 grid gap-4 sm:grid-cols-3">
              {home.problems.map((p, i) => (
                <Reveal key={p.title} delay={120 + i * 80}>
                  <div className="h-full rounded-xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm">
                    <Icon name={p.icon} className="h-5 w-5 text-[var(--gold)]" />
                    <h3 className="mt-3 text-[14px] font-bold text-white">{p.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/65">{p.cost || p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <figure className="-mx-5 mt-12 sm:-mx-10 lg:hidden">
            <img src={photoSrc("dark-gateway", 1024)} srcSet={photoSrcSet("dark-gateway")} sizes="100vw" alt={dark.alt} width={dark.width} height={dark.height} loading="lazy" className="w-full object-cover" />
          </figure>
        </Container>
      </section>

      {/* 03 — the architecture, animated */}
      <section className="border-b border-line bg-deck py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <Reveal>
                <SectionHeading {...s.architectureSection.heading} />
              </Reveal>
              <Reveal delay={80}><LayerList className="mt-8" /></Reveal>
              <Reveal delay={120}>
                <Button href={s.architectureSection.cta.href} variant="outline" className="mt-8">{s.architectureSection.cta.label} <ArrowRight size={16} /></Button>
              </Reveal>
            </div>
            <Reveal delay={100}><LayerStack /></Reveal>
          </div>
        </Container>
      </section>

      {/* 04 — see the product: the real console, by job */}
      <section className="py-20 sm:py-28" id="product">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading {...s.productSection.heading} />
            <Link href={s.productSection.link.href} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">{s.productSection.link.label} <ArrowUpRight size={17} /></Link>
          </div>
          <div className="mt-12"><ProductShowcase /></div>
          <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {s.productSection.facts.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--bg-active)] text-accent"><Icon name={f.icon} className="h-4 w-4" /></span>
                <div><strong className="block text-[14px] font-bold text-ink">{f.title}</strong><span className="mt-1 block text-[13px] leading-relaxed text-muted">{f.body}</span></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 05 — what makes it different */}
      <section className="border-y border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal><SectionHeading eyebrow={home.differentiators.eyebrow} title={home.differentiators.title} description={home.differentiators.description} /></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {home.differentiators.items.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 80}>
                <div className="card-lift flex h-full flex-col rounded-xl border border-line bg-surface p-7 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-fg"><Icon name={d.icon} className="h-5 w-5" /></span>
                  <span className="gold-rule mt-6" aria-hidden />
                  <h3 className="mt-4 text-lg font-bold tracking-[-0.015em] text-ink">{d.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 06 — the nine capability families, in the official artwork */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading {...s.familiesSection.heading} />
            <Link href={s.familiesSection.link.href} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">{s.familiesSection.link.label} <ArrowUpRight size={17} /></Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {families.map((fam, i) => (
              <Reveal key={fam.key} delay={(i % 3) * 70}>
                <Link href={`/modules#${fam.key}`} className="card-lift group block h-full overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  {fam.tile ? (
                    <img data-sanity={editAttr(fam.tile.sanity)} src={imageUrl(fam.tile.src, 800)} srcSet={imageSrcSet(fam.tile.src, [480, 800, 1200])} sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" alt={fam.tile.alt ?? ""} width={fam.tile.width ?? 1200} height={fam.tile.height ?? 942} loading="lazy" className="aspect-[1200/942] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: fam.tile.focal }} />
                  ) : (
                    <img data-sanity={editAttr(fam.cmsId ? { id: fam.cmsId, type: "capabilityFamily", path: "tile" } : undefined)} src={familyTileSrc(fam.key, 800)} srcSet={`${familyTileSrc(fam.key, 480)} 480w, ${familyTileSrc(fam.key, 800)} 800w`} sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" alt="" width={1200} height={942} loading="lazy" className="aspect-[1200/942] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  )}
                  <div className="border-t border-line p-5">
                    <div className="flex items-center justify-between"><h3 className="text-[15px] font-bold text-ink">{fam.name}</h3><span className="num text-xs font-bold text-gold-text">0{i + 1}</span></div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{fam.blurb}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 07 — one deep case study */}
      {spotlight && (
        <section className="border-t border-line bg-sunken py-20 sm:py-28">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading {...s.spotlightSection.heading} />
              <Link href={s.spotlightSection.link.href} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">{s.spotlightSection.link.label} <ArrowUpRight size={17} /></Link>
            </div>
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="eyebrow">{spotlight.industry} · {spotlight.edition}</p>
                <h3 className="mt-4 text-[clamp(26px,3vw,36px)] font-bold leading-[1.12] tracking-[-0.03em] text-ink">{spotlight.headline}</h3>
                <p className="mt-5 max-w-[48ch] text-[15.5px] leading-[1.8] text-muted">{spotlight.summary}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-faint"><strong className="font-semibold text-ink">{spotlight.org}</strong><span>{spotlight.note}</span></div>
                <div className="mt-7 flex flex-wrap gap-6">
                  <Link href={`/case-studies/${spotlight.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent">{s.spotlightSection.readLabel} <ArrowUpRight size={15} /></Link>
                  <Link href="/customers" className="inline-flex items-center gap-2 text-sm font-semibold text-ink">{s.spotlightSection.allLabel} <ArrowRight size={15} /></Link>
                </div>
              </div>
              <StoryVisual story={spotlight} />
            </div>
          </Container>
        </section>
      )}

      {/* 08 — editions */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading {...s.editionsSection.heading} />
            <Link href={s.editionsSection.link.href} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">{s.editionsSection.link.label} <ArrowUpRight size={17} /></Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {editions.map((e, i) => {
              const I = EDITION_ICONS[e.slug] ?? Layers;
              return (
                <Reveal key={e.slug} delay={i * 70}>
                  <Link href={`/editions/${e.slug}`} className={cn("card-lift relative flex h-full flex-col rounded-xl border p-6 shadow-sm", e.featured ? "border-[var(--gold)] bg-[var(--brand-deep)] text-white" : "border-line bg-surface")}>
                    {e.featured && <span className="absolute right-5 top-5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--gold)]">{s.editionsSection.featuredLabel}</span>}
                    <span className={cn("grid h-10 w-10 place-items-center rounded-lg", e.featured ? "bg-white/10 text-[var(--gold)]" : "bg-[var(--bg-active)] text-accent")}><I aria-hidden size={18} /></span>
                    <h3 className={cn("mt-5 text-xl font-bold tracking-[-0.02em]", e.featured ? "text-white" : "text-ink")}>{e.name}</h3>
                    <p className={cn("mt-1 text-xs font-semibold", e.featured ? "text-[var(--gold)]" : "text-gold-text")}>{e.comingSoon ? `${s.editionsSection.previewPrefix} ${e.gaTarget}` : s.editionsSection.availableLabel}</p>
                    <p className={cn("mt-3 flex-1 text-[13.5px] leading-relaxed", e.featured ? "text-white/72" : "text-muted")}>{e.audience}</p>
                    <p className={cn("mt-5 border-t pt-4 text-[15px] font-bold", e.featured ? "border-white/15 text-white" : "border-line text-ink")}>{e.priceAnchor}</p>
                    <span className={cn("mt-3 inline-flex items-center gap-1.5 text-sm font-semibold", e.featured ? "text-[var(--gold)]" : "text-accent")}>{s.editionsSection.exploreLabel} <ArrowRight size={14} /></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-faint">
            {s.editionsSection.fabricNote} <Link href={s.editionsSection.fabricLink.href} className="font-semibold text-accent">{s.editionsSection.fabricLink.label} <ArrowRight className="inline h-3 w-3" /></Link>
          </p>
        </Container>
      </section>

      {/* 09 — the 90-day prototype, the standing offer */}
      <PrototypeOffer tinted offer={s.prototype} />

      {/* 10 — the product portfolio */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <Reveal><SectionHeading eyebrow={home.portfolio.eyebrow} title={home.portfolio.title} description={home.portfolio.description} /></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {home.portfolio.products.map((pr, i) => {
              const key = pr.photo ?? "platform-stack";
              const ph = photos[key];
              const src = pr.image ? imageUrl(pr.image.src, 640) : photoSrc(key, 640);
              const srcSet = pr.image ? imageSrcSet(pr.image.src) : photoSrcSet(key);
              return (
                <Reveal key={pr.name} delay={i * 70}>
                  <Link href={pr.href} className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                    <div className="overflow-hidden bg-[#f6f7fa]">
                      <img data-sanity={editAttr(pr.image?.sanity ?? pr.editRef)} src={src} srcSet={srcSet} sizes="(min-width:1280px) 320px, (min-width:768px) 50vw, 100vw" alt={pr.image?.alt ?? ph.alt} width={pr.image?.width ?? ph.width} height={pr.image?.height ?? ph.height} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" style={{ objectPosition: pr.image?.focal }} />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className={cn("self-start rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]", pr.status === "Available" ? "border-[var(--gold)] bg-[var(--brand-deep)] text-white" : "border-line bg-sunken text-muted")}>{pr.status}</span>
                      <h3 className="mt-4 text-lg font-bold tracking-[-0.015em] text-ink">{pr.name}</h3>
                      <p className="mt-1 text-[12.5px] font-semibold text-gold-text">{pr.role}</p>
                      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">{pr.body}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-faint">{home.portfolio.note}</p>
        </Container>
      </section>

      {/* 11 — deployment and trust: where it runs, in region */}
      <GlobalInfra content={s.global} regions={settings.regions} />

      <ClosingCTA {...s.closing} />
    </>
  );
}
