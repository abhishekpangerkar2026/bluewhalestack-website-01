import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerTrackVisual } from "@/components/diagrams/PartnerTrackVisual";
import type { PartnerTrack } from "@/content/partners";
import type { PartnersPage } from "@/content/cms/docs/partnersPage";

/** The three partner tracks — alternating visual + detail, like a product showcase. */
export function PartnerTracks({
  tracks,
  labels,
  registerHref,
}: {
  tracks: PartnerTrack[];
  /** the section heading and the small labels around each track (from the Partners page document) */
  labels: PartnersPage["tracks"];
  /** where "Apply for the … track" goes — the Partner Portal registration */
  registerHref: string;
}) {
  return (
    <section id="tracks" className="scroll-mt-24 bg-sunken py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading {...labels.heading} />
        </Reveal>

        <div className="mt-16 space-y-16 sm:space-y-20">
          {tracks.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 2) * 60}>
              <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <PartnerTrackVisual track={t} />
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-fg">
                      <Icon name={t.icon} className="h-5 w-5" />
                    </span>
                    <span className="num text-sm font-bold text-faint">
                      {labels.trackLabel} 0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold leading-snug text-ink sm:text-3xl">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-lg font-medium leading-snug text-accent">
                    {t.tagline}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">
                    {t.description}
                  </p>
                  <p className="mt-4 text-sm">
                    <span className="font-semibold text-ink">{labels.idealForLabel}{" "}</span>
                    <span className="text-muted">{t.idealFor}</span>
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-line pt-6">
                    {t.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <Button href={registerHref} external variant="secondary">
                      {labels.applyLead} {t.shortName} {labels.applyTrail}
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
