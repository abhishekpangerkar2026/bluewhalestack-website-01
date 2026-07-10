import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { customerStories, type CustomerStory } from "@/content/customers";

/** Customer stories — alternating image + story, with metric rows. */
export function CustomerStories() {
  return (
    <section className="bg-canvas py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Customer outcomes"
            title="Trusted across governments, telcos & enterprises"
            description="Representative outcomes from the kind of regulated, multi-cloud environments BlueWhale Stack is built for."
          />
        </Reveal>

        <div className="mt-14 space-y-12">
          {customerStories.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 80}>
              <article className="grid items-center gap-8 lg:grid-cols-2">
                {/* Image / visual */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  {s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      className="aspect-[16/10] w-full rounded-lg object-cover shadow-md"
                    />
                  ) : (
                    <StoryVisual story={s} />
                  )}
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
                    <blockquote className="text-[0.95rem] italic leading-relaxed text-muted">
                      &ldquo;{s.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-2 flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-fg">
                        {s.person.initials}
                      </span>
                      <span className="text-xs text-faint">
                        <span className="font-semibold text-ink">
                          {s.person.name}
                        </span>{" "}
                        · {s.person.role}, {s.org}
                      </span>
                    </figcaption>
                  </figure>

                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
                    {s.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="text-2xl font-bold text-accent">
                          {m.value}
                        </dt>
                        <dd className="mt-0.5 text-[11px] leading-tight text-faint">
                          {m.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
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
 * On-brand code-rendered visual used when a story has no supplied photo.
 * Shows the org monogram, sector/edition, and the headline metric over a
 * branded panel — no external image asset required.
 */
function StoryVisual({ story }: { story: CustomerStory }) {
  const hero = story.metrics[0];
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-brand-900 shadow-md">
      {/* grid + glow motifs */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-500/25 blur-3xl"
      />
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/15 text-lg font-bold text-white ring-1 ring-white/25 backdrop-blur">
            {story.person.initials}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15">
            {story.edition}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-brand-100">
            {story.industry}
          </p>
          <p className="mt-1 text-xl font-bold leading-snug text-white">
            {story.org}
          </p>
          {hero && (
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
