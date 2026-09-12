import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { customerStories, type CustomerStory } from "@/content/customers";

/** Sector icon for the story monogram — an org sigil, not a person's initials. */
const SECTOR_ICON: Record<string, string> = {
  BFSI: "Banknote",
  Government: "Landmark",
  "Telco & Datacenter": "Server",
  Media: "Clapperboard",
};

/** Customer stories — alternating image + story, with metric rows. */
export function CustomerStories() {
  return (
    <section className="bg-canvas py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Customer success stories"
              title="Trusted across governments, telcos & enterprises"
              description="Delivered engagements in the regulated, multi-cloud environments BlueWhale Stack is built for — anonymized under confidentiality, real in every outcome."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href="/customers" variant="outline">
                All success stories
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/case-studies" variant="secondary">
                Case studies
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 space-y-12">
          {customerStories.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 80}>
              <article className="grid items-center gap-8 lg:grid-cols-2">
                {/* Image / visual — the sector illustration sits on top of the branded metric panel */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <StoryVisual story={s} />
                </div>

                {/* Story */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{s.industry}</Badge>
                    <span className="text-xs font-medium text-faint">
                      {s.edition}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold leading-snug text-ink">
                    {s.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-ink">Challenge —</span>{" "}
                    {s.challenge}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-ink">Solution —</span>{" "}
                    {s.solution}
                  </p>

                  <figure className="mt-5 border-l-2 border-line-strong pl-4">
                    <blockquote className="text-base italic leading-relaxed text-muted">
                      &ldquo;{s.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-2 flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-fg">
                        {s.person.initials}
                      </span>
                      <span className="text-xs text-muted">
                        <span className="font-semibold text-ink">
                          {s.person.role}
                        </span>
                        {" · "}
                        {s.org}
                      </span>
                    </figcaption>
                  </figure>

                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
                    {s.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-2xl font-bold text-accent">
                          {m.value}
                        </dt>
                        <dd className="mt-0.5 text-xs leading-tight text-muted">
                          {m.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={`/case-studies/${s.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5"
                  >
                    Read the full case study
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * Branded story panel: the sector illustration (from the official company
 * profile, when supplied) across the top, then the org, edition and headline
 * metric on a navy panel beneath. Falls back to the panel alone when a story
 * has no image.
 */
export function StoryVisual({ story, compact = false }: { story: CustomerStory; compact?: boolean }) {
  const hero = story.metrics[0];
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden bg-brand-900 shadow-md ${
        compact ? "rounded-none" : "rounded-lg"
      }`}
    >
      {story.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={story.image}
          alt={story.imageAlt}
          width={1200}
          height={345}
          className={`block w-full object-cover ${compact ? "max-h-40" : ""}`}
        />
      )}
      {/* grid + glow motifs */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-brand-500/25 blur-3xl"
      />
      <div className={`relative flex flex-col justify-between gap-6 ${compact ? "p-5" : "p-6 sm:p-8"}`}>
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">
            <Icon name={SECTOR_ICON[story.industry] ?? "Building2"} className="h-6 w-6" />
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15">
            {story.edition}
          </span>
        </div>
        <div>
          <p className="eyebrow text-brand-100">
            {story.industry}
          </p>
          <p className={`mt-1 font-bold leading-snug text-white ${compact ? "text-base" : "text-xl"}`}>
            {story.org}
          </p>
          {story.note && !compact && (
            <p className="mt-1 text-xs text-white/60">{story.note}</p>
          )}
          {hero && !compact && (
            <p className="mt-4 text-4xl font-bold text-white">
              {hero.value}{" "}
              <span className="text-base font-medium text-brand-100">
                {hero.label}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
