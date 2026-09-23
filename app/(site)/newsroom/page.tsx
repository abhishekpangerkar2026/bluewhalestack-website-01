import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatPostDate } from "@/content/newsroom";
import { newsroomPageSpec } from "@/content/cms/docs/newsroomPage";
import { newsroomPage } from "@/content/sections/newsroomPage";
import { getPageDoc } from "@/lib/cms-page";
import { getPosts } from "@/lib/content";
import { editAttr, imageUrl } from "@/lib/cms";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(newsroomPageSpec, newsroomPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/newsroom");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

type BadgeTone = "brand" | "accent" | "neutral" | "success" | "warning";
const badgeTone: Record<string, BadgeTone> = {
  "Product launch": "accent",
  "Trust & compliance": "success",
  Beta: "warning",
  GA: "success",
};

/** CMS posts carry ISO dates; the fallback list carries "June 2026". */
const showDate = (d: string) => (/^\d{4}-\d{2}-\d{2}$/.test(d) ? formatPostDate(d) : d);

export default async function NewsroomPage() {
  const built = await builtPage("/newsroom");
  if (built) return built;
  const [c, posts] = await Promise.all([getContent(), getPosts()]);
  return (
    <InnerPage category="company" current="/newsroom">
      {/* ── Hero ── */}
      <CmsPhotoHero
        route="/newsroom"
        photo="edge-tower"
        eyebrow="Newsroom"
        title="Releases, certifications and milestones — dated."
        description={
          <>
            What shipped and when: edition general availability, new cloud connectors, module betas and the certification
            audits as they complete. For press enquiries, reach us at{" "}
            <a href="mailto:contact@bluewhalestack.com" className="font-semibold text-accent underline-offset-2 hover:underline">
              contact@bluewhalestack.com
            </a>
            .
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href={c.hero.primary.href} size="lg">
            {c.hero.primary.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={c.hero.secondary.href} size="lg" variant="secondary">
            {c.hero.secondary.label}
          </Button>
        </div>
      </CmsPhotoHero>

      {/* ── Announcements ── */}
      <section id="announcements" className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.announcements.heading} />
          </Reveal>
          <div className="mt-14 flex flex-col divide-y divide-line">
            {posts.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 50}>
                <article className="group flex flex-col gap-4 py-8 first:pt-0 sm:flex-row sm:gap-8">
                  <div className="flex shrink-0 items-center gap-3 sm:w-44 sm:flex-col sm:items-start sm:gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                      <Calendar className="h-3.5 w-3.5" />
                      {showDate(item.date)}
                    </span>
                    <Badge tone={badgeTone[item.badge] ?? "neutral"} className="text-[11px]">
                      {item.badge}
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                    {item.href && (
                      <a href={item.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                        {c.announcements.readMoreLabel} <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  {item.cmsImage && (
                    <img
                      data-sanity={editAttr(item.cmsImage.sanity)}
                      src={imageUrl(item.cmsImage.src, 480)}
                      alt={item.cmsImage.alt ?? ""}
                      width={item.cmsImage.width}
                      height={item.cmsImage.height}
                      loading="lazy"
                      className="aspect-[3/2] w-full rounded-lg object-cover sm:w-56"
                      style={{ objectPosition: item.cmsImage.focal }}
                    />
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Press contacts ── */}
      <section className="border-t border-line bg-sunken py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading {...c.press.heading} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {c.press.contacts.map((contact, i) => (
              <Reveal key={contact.type} delay={i * 70}>
                <Card className="flex flex-col gap-3 p-6">
                  <p className="eyebrow">{contact.type}</p>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 text-lg font-bold text-accent hover:underline">
                    {contact.email}
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </a>
                  <p className="text-sm text-muted">{contact.note}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow text-[var(--gold)]">{c.cta.kicker}</p>
                <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                  {c.cta.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  {c.cta.body}
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <Button href={c.cta.button.href} size="lg" variant="white" className="shrink-0">
                {c.cta.button.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
