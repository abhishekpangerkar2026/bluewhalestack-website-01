import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerTrackVisual } from "@/components/diagrams/PartnerTrackVisual";
import { tracks } from "@/content/partners";
import { partnerPortal } from "@/content/company";

/** The three partner tracks — alternating visual + detail, like a product showcase. */
export function PartnerTracks() {
  return (
    <section id="tracks" className="scroll-mt-24 bg-sunken py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Three ways to partner"
            title="Pick the track that matches how you work"
            description="Resell licenses, deliver implementations, or operate a territory — each track has its own agreement, enablement and portal access."
          />
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
                      Track 0{i + 1}
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
                    <span className="font-semibold text-ink">Ideal for — </span>
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
                    <Button href={partnerPortal.register} external variant="secondary">
                      Apply as a {t.shortName} partner
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
