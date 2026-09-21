import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, Sparkles, Server, ShieldCheck, Layers, Building2, RadioTower, Landmark } from "lucide-react";
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
import { proofStrip, story, problems, differentiators, portfolio } from "@/content/home";
import { customerStories } from "@/content/customers";
import { moduleGroups, moduleGroupOrder, moduleGroupBlurbs } from "@/content/modules";
import { familyTileSrc } from "@/content/moduleArt";
import { photos, photoSrc, photoSrcSet } from "@/content/photos";
import { getEditions } from "@/lib/content";
import { cn } from "@/lib/utils";

const spotlight = customerStories.find((s) => s.slug === "bfsi-singapore-qatar") ?? customerStories[0];

/** One-line teasers for the facts row under the console. */
const CONSOLE_FACTS = [
  { icon: Boxes, title: "Nine families, one inventory", body: "A cost anomaly, a finding and a ticket point at the same workload and owner." },
  { icon: Sparkles, title: "Whale AI in every family", body: "50+ grounded use cases, including fully offline inside the perimeter." },
  { icon: Server, title: "Six clouds, one datacenter floor", body: "Public cloud by API; VMware, Hyper-V and Nutanix by Edge Agent." },
  { icon: ShieldCheck, title: "Sovereign by architecture", body: "SaaS, BYOC, on-premises or fully air-gapped — the same build, every mode." },
];

const EDITION_ICONS: Record<string, typeof Layers> = { standard: Layers, enterprise: Building2, "telco-datacenter": RadioTower, government: Landmark };

export default function HomePage() {
  const editions = getEditions();
  const dark = photos["dark-gateway"];
  return (
    <>
      <Hero />

      {/* 01 — proof: outcomes from delivered engagements */}
      <section className="border-b border-line bg-sunken py-14 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="eyebrow flex items-center gap-3"><span aria-hidden className="h-px w-7 bg-[var(--gold)]" />From delivered engagements · anonymized under confidentiality</p>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent" href="/case-studies">The outcomes <ArrowUpRight size={15} /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofStrip.map((p, i) => (
              <Reveal key={p.href} delay={i * 70}>
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
              <p className="eyebrow flex items-center gap-3 text-[var(--gold)]"><span aria-hidden className="h-px w-7 bg-[var(--gold)]" />{story.eyebrow}</p>
              <h2 className="display-2 mt-5 text-white">{story.hook}</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/75">{story.problem}</p>
              <p className="mt-7 border-l-2 border-[var(--gold)] pl-5 text-xl font-semibold leading-snug text-white">{story.turn}</p>
            </Reveal>
            <div className="mt-11 grid gap-4 sm:grid-cols-3">
              {problems.map((p, i) => (
                <Reveal key={p.title} delay={120 + i * 80}>
                  <div className="h-full rounded-xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm">
                    <Icon name={p.icon} className="h-5 w-5 text-[var(--gold)]" />
                    <h3 className="mt-3 text-[14px] font-bold text-white">{p.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/65">{p.cost}</p>
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
                <SectionHeading
                  eyebrow="The architecture"
                  title="One platform, six layers — read top-down, the way value flows."
                  description="Industries consume governed services through the Digital Experience Layer; nine capability families in the Unified Platform Core govern every estate underneath — in whichever mode it must run."
                />
              </Reveal>
              <Reveal delay={80}><LayerList className="mt-8" /></Reveal>
              <Reveal delay={120}>
                <Button href="/platform#architecture" variant="outline" className="mt-8">See the full architecture <ArrowRight size={16} /></Button>
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
            <SectionHeading eyebrow="See the product" title="One console. Every job." description="Cost, inventory and security posture — three of the screens teams live in. Every module page shows its own screen alongside how it works." />
            <Link href="/modules" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">Explore all modules <ArrowUpRight size={17} /></Link>
          </div>
          <div className="mt-12"><ProductShowcase /></div>
          <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {CONSOLE_FACTS.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--bg-active)] text-accent"><f.icon aria-hidden size={16} /></span>
                <div><strong className="block text-[14px] font-bold text-ink">{f.title}</strong><span className="mt-1 block text-[13px] leading-relaxed text-muted">{f.body}</span></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 05 — what makes it different */}
      <section className="border-y border-line bg-sunken py-20 sm:py-28">
        <Container>
          <Reveal><SectionHeading eyebrow={differentiators.eyebrow} title={differentiators.title} description={differentiators.description} /></Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.items.map((d, i) => (
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
            <SectionHeading eyebrow="The nine capability families" title="What lives in the platform core." description="Fifty-four capabilities under one console, one identity, one policy and one bill — every family reads from and writes to the same inventory, identity and policy plane." />
            <Link href="/modules" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">All fourteen modules <ArrowUpRight size={17} /></Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moduleGroupOrder.map((g, i) => (
              <Reveal key={g} delay={(i % 3) * 70}>
                <Link href={`/modules#${g}`} className="card-lift group block h-full overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                  <img src={familyTileSrc(g, 800)} srcSet={`${familyTileSrc(g, 480)} 480w, ${familyTileSrc(g, 800)} 800w`} sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" alt="" width={1200} height={942} loading="lazy" className="aspect-[1200/942] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <div className="border-t border-line p-5">
                    <div className="flex items-center justify-between"><h3 className="text-[15px] font-bold text-ink">{moduleGroups[g]}</h3><span className="num text-xs font-bold text-gold-text">0{i + 1}</span></div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{moduleGroupBlurbs[g]}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 07 — one deep case study */}
      <section className="border-t border-line bg-sunken py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Delivered in the real world" title="One estate, told in full." description="Anonymized under confidentiality; every figure is as briefed by BlueWhale Stack, not illustrative." />
            <Link href="/case-studies" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">All engagements <ArrowUpRight size={17} /></Link>
          </div>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow">{spotlight.industry} · {spotlight.edition}</p>
              <h3 className="mt-4 text-[clamp(26px,3vw,36px)] font-bold leading-[1.12] tracking-[-0.03em] text-ink">{spotlight.headline}</h3>
              <p className="mt-5 max-w-[48ch] text-[15.5px] leading-[1.8] text-muted">{spotlight.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-faint"><strong className="font-semibold text-ink">{spotlight.org}</strong><span>{spotlight.note}</span></div>
              <div className="mt-7 flex flex-wrap gap-6">
                <Link href={`/case-studies/${spotlight.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent">Read the full case study <ArrowUpRight size={15} /></Link>
                <Link href="/customers" className="inline-flex items-center gap-2 text-sm font-semibold text-ink">All success stories <ArrowRight size={15} /></Link>
              </div>
            </div>
            <StoryVisual story={spotlight} />
          </div>
        </Container>
      </section>

      {/* 08 — editions */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Editions" title="Four editions. One architecture." description="Standard and Enterprise carry published prices; the operator and government editions are shaped to the estate. An upgrade is a licence change, not a migration." />
            <Link href="/editions" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">Compare in full <ArrowUpRight size={17} /></Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {editions.map((e, i) => {
              const I = EDITION_ICONS[e.slug] ?? Layers;
              return (
                <Reveal key={e.slug} delay={i * 70}>
                  <Link href={`/editions/${e.slug}`} className={cn("card-lift relative flex h-full flex-col rounded-xl border p-6 shadow-sm", e.featured ? "border-[var(--gold)] bg-[var(--brand-deep)] text-white" : "border-line bg-surface")}>
                    {e.featured && <span className="absolute right-5 top-5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--gold)]">Most deployed</span>}
                    <span className={cn("grid h-10 w-10 place-items-center rounded-lg", e.featured ? "bg-white/10 text-[var(--gold)]" : "bg-[var(--bg-active)] text-accent")}><I aria-hidden size={18} /></span>
                    <h3 className={cn("mt-5 text-xl font-bold tracking-[-0.02em]", e.featured ? "text-white" : "text-ink")}>{e.name}</h3>
                    <p className={cn("mt-1 text-xs font-semibold", e.featured ? "text-[var(--gold)]" : "text-gold-text")}>{e.comingSoon ? `Preview · GA ${e.gaTarget}` : "Available now"}</p>
                    <p className={cn("mt-3 flex-1 text-[13.5px] leading-relaxed", e.featured ? "text-white/72" : "text-muted")}>{e.audience}</p>
                    <p className={cn("mt-5 border-t pt-4 text-[15px] font-bold", e.featured ? "border-white/15 text-white" : "border-line text-ink")}>{e.priceAnchor}</p>
                    <span className={cn("mt-3 inline-flex items-center gap-1.5 text-sm font-semibold", e.featured ? "text-[var(--gold)]" : "text-accent")}>Explore <ArrowRight size={14} /></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-faint">
            Telco &amp; Datacenter Edition is also what BlueWhale Stack Fabric runs on — a market&apos;s datacenter capacity, every operator and tier, consumed as one sovereign cloud. <Link href="/fabric" className="font-semibold text-accent">Explore the Fabric <ArrowRight className="inline h-3 w-3" /></Link>
          </p>
        </Container>
      </section>

      {/* 09 — the 90-day prototype, the standing offer */}
      <PrototypeOffer tinted />

      {/* 10 — the product portfolio */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <Reveal><SectionHeading eyebrow={portfolio.eyebrow} title={portfolio.title} description={portfolio.description} /></Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {portfolio.products.map((pr, i) => {
              const ph = photos[pr.photo];
              return (
                <Reveal key={pr.name} delay={i * 70}>
                  <Link href={pr.href} className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                    <div className="overflow-hidden bg-[#f6f7fa]">
                      <img src={photoSrc(pr.photo, 640)} srcSet={photoSrcSet(pr.photo)} sizes="(min-width:1280px) 320px, (min-width:768px) 50vw, 100vw" alt={ph.alt} width={ph.width} height={ph.height} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
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
          <p className="mt-5 text-xs text-faint">{portfolio.note}</p>
        </Container>
      </section>

      {/* 11 — deployment and trust: where it runs, in region */}
      <GlobalInfra />

      <ClosingCTA
        eyebrow="Your next chapter"
        title="We prove it on your estate, in ninety days, before any commercial conversation."
        body="Start with the discovery workshop — half a day with your technology and finance leaders. Bring your hardest audit finding and your least explainable cloud bill; we show what the platform does with both, on your estate's shape."
        primary={{ label: "Book the discovery workshop", href: "/contact?intent=demo", note: "Half a day · success criteria agreed with technology and finance" }}
        secondary={{ label: "The 90-day prototype", href: "/platform#prototype", note: "Full-featured on your own estate, no licence cost, scored on day 90." }}
        tertiary={{ label: "Published pricing", href: "/pricing", note: "Standard $24,000 · Enterprise $120,000 a year" }}
      />
    </>
  );
}
