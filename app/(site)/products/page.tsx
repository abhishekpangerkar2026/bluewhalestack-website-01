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
import { productsPageSpec } from "@/content/cms/docs/productsPage";
import { productsPage } from "@/content/sections/productsPage";
import { getPageDoc } from "@/lib/cms-page";
import { getHomePage } from "@/lib/content";
import { editAttr, imageSrcSet, imageUrl } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(productsPageSpec, productsPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/products");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function ProductsPage() {
  const built = await builtPage("/products");
  if (built) return built;
  const [c, { portfolio }] = await Promise.all([getContent(), getHomePage()]);
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
          <Button href={c.hero.primary.href} size="lg">{c.hero.primary.label}<ArrowRight className="h-4 w-4" /></Button>
          <Button href={c.hero.secondary.href} size="lg" variant="outline">{c.hero.secondary.label}</Button>
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
                      <img data-sanity={editAttr(pr.image?.sanity ?? pr.editRef)} src={src} srcSet={srcSet} sizes="(min-width:768px) 30vw, 100vw" alt={pr.image?.alt ?? ph.alt} width={pr.image?.width ?? ph.width} height={pr.image?.height ?? ph.height} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] max-sm:aspect-[3/2]" style={{ objectPosition: pr.image?.focal }} />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <span className={cn("self-start rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]", pr.status === "Available" ? "border-[var(--gold)] bg-[var(--brand-deep)] text-white" : "border-line bg-sunken text-muted")}>{pr.status}</span>
                      <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-ink">{pr.name}</h2>
                      <p className="mt-1 text-[13px] font-semibold text-gold-text">{pr.role}</p>
                      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">{pr.body}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">{c.portfolio.cardLink} <ArrowRight className="h-3.5 w-3.5" /></span>
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
              <SectionHeading {...c.earns.heading} />
              <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                <table className="w-full text-sm">
                  <thead><tr className="bg-primary text-left text-primary-fg">{c.earns.columns.map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-line">
                    {c.earns.rows.map((r) => (<tr key={r.product}><td className="px-5 py-3.5 font-semibold text-ink">{r.product}</td><td className="px-5 py-3.5 text-muted">{r.model}</td></tr>))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <SectionHeading {...c.foundations.heading} />
              <ul className="mt-8 space-y-4">
                {c.foundations.items.map((f) => (
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

      <ClosingCTA {...c.closing} />
    </InnerPage>
  );
}
