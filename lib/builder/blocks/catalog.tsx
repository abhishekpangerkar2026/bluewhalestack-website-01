/**
 * Blocks that show the site's catalog — editions, modules, industries,
 * people, certifications… Their data is fetched when the block is placed
 * (and again on every render), so they always mirror the CMS.
 */
import type { ComponentConfig } from "@puckeditor/core";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, Download, MapPin, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { CertificateVault } from "@/components/trust/CertificateVault";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";
import type { Certification } from "@/content/trust";
import type { ResourceDef } from "@/content/resources";
import { cn } from "@/lib/utils";
import { getCatalog, type CatalogKind } from "../data";
import { headingFields, select, text } from "../fields";
import { str, type Txt } from "./shared";

type Heading = { eyebrow?: Txt; title?: Txt; description?: Txt };
const Head = ({ h, right }: { h: Heading; right?: React.ReactNode }) =>
  h.title ? (
    <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <Reveal><SectionHeading eyebrow={str(h.eyebrow) || undefined} title={h.title} description={str(h.description) || undefined} /></Reveal>
      {right}
    </div>
  ) : null;

/** A catalog block: heading fields + optional link + data resolved from the CMS. */
function catalogBlock<T>(kind: CatalogKind, label: string, defaults: Heading & { linkLabel?: string; linkHref?: string }, render: (items: T[], props: Heading & { linkLabel: string; linkHref: string } & Record<string, unknown>) => React.ReactNode, extraFields: Record<string, unknown> = {}, extraDefaults: Record<string, unknown> = {}): ComponentConfig<Heading & { linkLabel: string; linkHref: string; items: T[] } & Record<string, unknown>> {
  return {
    label,
    fields: { ...headingFields, linkLabel: text("Link on the right (optional)"), linkHref: text("Link address"), ...(extraFields as Record<string, never>) },
    defaultProps: { eyebrow: defaults.eyebrow ?? "", title: defaults.title ?? "", description: defaults.description ?? "", linkLabel: defaults.linkLabel ?? "", linkHref: defaults.linkHref ?? "", items: [], ...extraDefaults },
    resolveData: async ({ props }) => ({ props: { ...props, items: (await getCatalog(kind)) as T[] }, readOnly: { items: true } }),
    render: ({ items: raw, ...props }) => {
      const items = raw as unknown as T[];
      const right = props.linkLabel ? <Link href={props.linkHref || "#"} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">{props.linkLabel} <ArrowUpRight size={17} /></Link> : undefined;
      return (
        <div>
          <Head h={props} right={right} />
          {items?.length ? render(items, props) : <div className="grid h-32 place-items-center rounded-xl border border-dashed border-line-strong text-sm text-faint">Loading {label.toLowerCase()}…</div>}
        </div>
      );
    },
  };
}

type Edition = { slug: string; name: string; tagline: string; audience: string; priceAnchor: string; priceSub: string; featured: boolean; comingSoon: boolean; gaTarget: string; includes: string[]; outcome: string };
export const Editions = catalogBlock<Edition>("editions", "Editions (four cards)", { eyebrow: "Editions", title: "Four editions. One architecture.", linkLabel: "Compare in full", linkHref: "/editions" }, (items) => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {items.map((e, i) => (
      <Reveal key={e.slug} delay={i * 70}>
        <Link href={`/editions/${e.slug}`} className={cn("card-lift relative flex h-full flex-col rounded-xl border p-6 shadow-sm", e.featured ? "border-[var(--gold)] bg-[var(--brand-deep)] text-white" : "border-line bg-surface")}>
          {e.featured && <span className="absolute right-5 top-5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--gold)]">Most deployed</span>}
          <h3 className={cn("text-xl font-bold tracking-[-0.02em]", e.featured ? "text-white" : "text-ink")}>{e.name}</h3>
          <p className={cn("mt-1 text-xs font-semibold", e.featured ? "text-[var(--gold)]" : "text-gold-text")}>{e.comingSoon ? `Preview · GA ${e.gaTarget}` : "Available now"}</p>
          <p className={cn("mt-3 flex-1 text-[13.5px] leading-relaxed", e.featured ? "text-white/72" : "text-muted")}>{e.audience}</p>
          <p className={cn("mt-5 border-t pt-4 text-[15px] font-bold", e.featured ? "border-white/15 text-white" : "border-line text-ink")}>{e.priceAnchor}</p>
          <span className={cn("mt-3 inline-flex items-center gap-1.5 text-sm font-semibold", e.featured ? "text-[var(--gold)]" : "text-accent")}>Explore <ArrowRight size={14} /></span>
        </Link>
      </Reveal>
    ))}
  </div>
));

type Family = { key: string; name: string; blurb: string; icon: string; tile: string };
export const Families = catalogBlock<Family>("families", "Capability families (nine tiles)", { eyebrow: "The nine capability families", title: "What lives in the platform core.", linkLabel: "All modules", linkHref: "/modules" }, (items) => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((f, i) => (
      <Reveal key={f.key} delay={(i % 3) * 70}>
        <Link href={`/modules#${f.key}`} className="card-lift group block h-full overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element -- catalog artwork */}
          <img src={f.tile} alt="" width={1200} height={942} loading="lazy" className="aspect-[1200/942] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <div className="border-t border-line p-5">
            <div className="flex items-center justify-between"><h3 className="text-[15px] font-bold text-ink">{f.name}</h3><span className="num text-xs font-bold text-gold-text">0{i + 1}</span></div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{f.blurb}</p>
          </div>
        </Link>
      </Reveal>
    ))}
  </div>
));

type Module = { slug: string; name: string; family: string; icon: string; tagline: string; status: { label: string; tone: "success" | "neutral" | "warning" } | null };
export const Modules = catalogBlock<Module>("modules", "Modules (all fourteen)", { eyebrow: "Modules", title: "Fourteen modules, nine families.", linkLabel: "Every module page", linkHref: "/modules" }, (items) => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((m, i) => (
      <Reveal key={m.slug} delay={(i % 3) * 60}>
        <Link href={`/modules/${m.slug}`} className="group/card block h-full">
          <Card interactive className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--bg-active)] text-accent"><Icon name={m.icon} className="h-5 w-5" /></span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-faint">{m.family}</span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-ink">{m.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{m.tagline}</p>
            {m.status && <span className="mt-3"><Badge tone={m.status.tone}>{m.status.label}</Badge></span>}
          </Card>
        </Link>
      </Reveal>
    ))}
  </div>
));

type Industry = { slug: string; name: string; icon: string; title: string; description: string; outcome: string; edition: string; comingSoon: boolean };
export const Industries = catalogBlock<Industry>("industries", "Industries (sector cards)", { eyebrow: "Industry solutions", title: "Packaged for your sector", linkLabel: "All industries", linkHref: "/industries" }, (items) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {items.map((ind, i) => (
      <Reveal key={ind.slug} delay={(i % 4) * 60}>
        <Link href={`/industries/${ind.slug}`} className="group/card block h-full">
          <Card interactive className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--bg-active)] text-accent"><Icon name={ind.icon} className="h-5 w-5" /></span>
              <Badge tone={ind.comingSoon ? "warning" : "success"}>{ind.comingSoon ? "Preview" : "Available"}</Badge>
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">{ind.name}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{ind.title}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{ind.outcome}</p>
            {ind.edition && <span className="mt-4 text-xs text-faint">{ind.edition} Edition</span>}
          </Card>
        </Link>
      </Reveal>
    ))}
  </div>
));

type Solution = { slug: string; name: string; icon: string; summary: string; fact: string };
export const Solutions = catalogBlock<Solution>("solutions", "Solutions (six outcomes)", { eyebrow: "By outcome", title: "Six solutions, one control plane", linkLabel: "All solutions", linkHref: "/solutions" }, (items) => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((s, i) => (
      <Reveal key={s.slug} delay={(i % 3) * 80}>
        <Link href={`/solutions/${s.slug}`} className="group/card block h-full">
          <Card interactive className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-fg"><Icon name={s.icon} className="h-5 w-5" /></span>
              <span className="num text-sm font-bold text-faint">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">{s.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
            {s.fact && <p className="mt-3 text-xs font-medium text-faint">{s.fact}</p>}
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">How it works <ArrowUpRight className="h-3.5 w-3.5" /></span>
          </Card>
        </Link>
      </Reveal>
    ))}
  </div>
));

type Story = { slug: string; industry: string; edition: string; headline: string; summary: string; challenge: string; org: string; note: string; metrics: { value: string; label: string }[] };
export const Stories = catalogBlock<Story>("stories", "Customer stories", { eyebrow: "Customer success stories", title: "Proven in regulated estates", linkLabel: "All case studies", linkHref: "/case-studies" }, (items) => (
  <div className="grid gap-5 md:grid-cols-2">
    {items.map((s, i) => (
      <Reveal key={s.slug} delay={(i % 2) * 80}>
        <Link href={`/case-studies/${s.slug}`} className="group/card block h-full">
          <Card interactive className="flex h-full flex-col">
            <div className="flex items-center gap-2"><Badge tone="brand">{s.industry}</Badge><span className="text-xs text-faint">{s.edition}</span></div>
            <h3 className="mt-3 text-lg font-bold leading-snug text-ink">{s.headline}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4">
              {s.metrics.map((m) => <div key={m.label}><dt className="text-base font-bold text-accent">{m.value}</dt><dd className="mt-0.5 text-[11px] leading-tight text-muted">{m.label}</dd></div>)}
            </dl>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Read the case study <ArrowRight className="h-3.5 w-3.5" /></span>
          </Card>
        </Link>
      </Reveal>
    ))}
  </div>
));

type Member = { name: string; role: string; bio: string; linkedin: string; image: string };
export const Team = catalogBlock<Member>("team", "Leadership & team", { eyebrow: "Leadership", title: "The team behind the platform", linkLabel: "Meet the full team", linkHref: "/about/leadership" }, (items, props) => (
  <div className={cn("grid gap-5 sm:grid-cols-2", props.layout === "bios" ? "lg:grid-cols-3" : "lg:grid-cols-5")}>
    {items.map((m, i) => (
      <Reveal key={m.name} delay={(i % 5) * 60} className="h-full">
        <Card className="flex h-full flex-col items-center gap-3 p-6 text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-line">
            {m.image ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={m.image} alt={m.name} width={80} height={80} loading="lazy" className="h-full w-full object-cover object-top" /> : <div className="grid h-full w-full place-items-center bg-brand-50 text-accent"><User className="h-8 w-8" /></div>}
          </div>
          <div>
            <p className="font-bold text-ink">{m.name}</p>
            <p className="mt-1 text-xs font-semibold leading-snug text-accent">{m.role}</p>
          </div>
          {props.layout === "bios" && m.bio && <p className="text-sm leading-relaxed text-muted">{m.bio}</p>}
          {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-accent">LinkedIn ↗</a>}
        </Card>
      </Reveal>
    ))}
  </div>
), { layout: select("Layout", [{ label: "Compact (name + role)", value: "compact" }, { label: "With bios", value: "bios" }]) }, { layout: "compact" });

type Job = { title: string; department: string; location: string; type: string; remote: string; applyUrl: string };
export const Jobs = catalogBlock<Job>("jobs", "Open roles", { eyebrow: "Open roles", title: "Find your role", linkLabel: "", linkHref: "" }, (items) => (
  <div className="flex flex-col divide-y divide-line">
    {items.map((j, i) => (
      <Reveal key={j.title} delay={(i % 6) * 40}>
        <div className="flex flex-col gap-3 py-5 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-ink">{j.title}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted"><span className="font-semibold text-ink">{j.department}</span><span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {j.location}</span><span>{j.type}</span><span>{j.remote}</span></div>
          </div>
          <Button href={j.applyUrl} size="sm" className="shrink-0 self-start sm:self-auto">Apply <ArrowRight className="h-3.5 w-3.5" /></Button>
        </div>
      </Reveal>
    ))}
  </div>
));

export const Certifications = catalogBlock<Certification>("certifications", "Certifications (Trust Center vault)", { eyebrow: "Certifications", title: "Five ISO certifications, independently audited. Three assessments, stated as such.", linkLabel: "Trust Center", linkHref: "/trust" }, (items) => (
  <CertificateVault certifications={items} />
));

type Collateral = { title: string; kind: string; blurb: string; url: string; size: string; file: string };
export const Collateral = catalogBlock<Collateral>("collateral", "Official collateral (PDF downloads)", { eyebrow: "Official collateral", title: "The documents we hand to prospects — as finished PDFs", linkLabel: "", linkHref: "" }, (items) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((d, i) => (
      <Reveal key={d.file} delay={(i % 3) * 60}>
        <a href={d.url} target="_blank" rel="noopener" className="card-lift group flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between"><span className="rounded-full border border-line bg-sunken px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{d.kind}</span><span className="text-xs text-faint">PDF · {d.size}</span></div>
          <h3 className="mt-4 text-[15px] font-bold leading-snug text-ink">{d.title}</h3>
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{d.blurb}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"><Download className="h-3.5 w-3.5" /> Download</span>
        </a>
      </Reveal>
    ))}
  </div>
));

type Post = { title: string; date: string; badge: string; body: string; href: string; image: string };
export const Newsroom = catalogBlock<Post>("posts", "Newsroom (latest announcements)", { eyebrow: "Latest", title: "Announcements", linkLabel: "Newsroom", linkHref: "/newsroom" }, (items) => (
  <div className="flex flex-col divide-y divide-line">
    {items.map((p, i) => (
      <Reveal key={p.title} delay={(i % 4) * 50}>
        <article className="flex flex-col gap-4 py-8 first:pt-0 sm:flex-row sm:gap-8">
          <div className="flex shrink-0 items-center gap-3 sm:w-44 sm:flex-col sm:items-start sm:gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-faint"><Calendar className="h-3.5 w-3.5" />{p.date}</span>
            <Badge tone="neutral" className="text-[11px]">{p.badge}</Badge>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-lg font-bold text-ink">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{p.body}</p>
            {p.href && <a href={p.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">Read more <ArrowUpRight className="h-3.5 w-3.5" /></a>}
          </div>
          {p.image && /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.image} alt="" loading="lazy" className="aspect-[3/2] w-full rounded-lg object-cover sm:w-56" />}
        </article>
      </Reveal>
    ))}
  </div>
));

export const Resources = catalogBlock<ResourceDef>("resources", "Resource library (filterable)", { eyebrow: "Library", title: "Browse the collection", linkLabel: "", linkHref: "" }, (items) => <ResourceLibrary resources={items} />);

export const catalogBlocks = { Editions, Families, Modules, Industries, Solutions, Stories, Team, Jobs, Certifications, Collateral, Newsroom, Resources };
