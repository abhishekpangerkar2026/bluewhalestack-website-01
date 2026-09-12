import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { prototypeOffer } from "@/content/platform";

/**
 * "The 90-day prototype — the standing offer": discovery workshop →
 * prototype → evidence review → scale. Shared by Home and Platform.
 */
export function PrototypeOffer({ tinted = false }: { tinted?: boolean }) {
  const o = prototypeOffer;
  return (
    <section
      id="prototype"
      className={`scroll-mt-20 border-y border-line py-20 sm:py-24 ${tinted ? "bg-sunken" : "bg-canvas"}`}
    >
      <Container>
        <Reveal>
          <SectionHeading eyebrow={o.eyebrow} title={o.title} description={o.description} />
        </Reveal>

        {/* Four-step track: a rail with numbered stations, steps hanging below */}
        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-5 hidden h-px bg-line-strong lg:block"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {o.steps.map((s, i) => {
              const last = i === o.steps.length - 1;
              return (
                <Reveal key={s.title} delay={i * 90}>
                  <div className="relative">
                    <span
                      className={`relative z-10 grid h-10 w-10 place-items-center rounded-full ring-4 ring-[var(--bg-canvas)] ${
                        last ? "bg-amber-400 text-brand-900" : "bg-primary text-primary-fg"
                      }`}
                    >
                      <Icon name={s.icon} className="h-4.5 w-4.5" />
                    </span>
                    <div
                      className={`mt-5 rounded-lg border bg-surface p-5 shadow-sm ${
                        last ? "border-amber-300" : "border-line"
                      }`}
                    >
                      <p className="num text-xs font-bold text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-ink">{s.title}</h3>
                      <p
                        className={`mt-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                          last ? "text-amber-600" : "text-accent"
                        }`}
                      >
                        {s.when}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col gap-6 rounded-xl border-l-4 border-amber-400 bg-surface p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-base font-bold text-ink">{o.cta.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{o.cta.body}</p>
            </div>
            <Button href={o.cta.href} size="lg" className="shrink-0">
              {o.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
