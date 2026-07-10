import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ModuleDiagram } from "@/components/diagrams/ModuleDiagram";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getModules, getModule } from "@/lib/content";
import { moduleGroups } from "@/content/modules";
import { editions } from "@/content/editions";

export function generateStaticParams() {
  return getModules().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) return {};
  return { title: m.name, description: m.tagline };
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const inEditions = editions.filter((e) => e.modules.includes(slug));

  return (
    <>
      {/* ── Hero: light band, big icon + oversized title ── */}
      <section className="border-b border-line bg-sunken py-20 sm:py-24">
        <Container>
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-accent num">
              {moduleGroups[mod.group]}
            </span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
          </div>
          <div className="mt-6 flex items-start gap-5">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-primary text-primary-fg shadow-sm">
              <Icon name={mod.icon} className="h-8 w-8" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {mod.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
                {mod.tagline}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Body: asymmetric — narrative + features left, sticky diagram right ── */}
      <section className="bg-canvas py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <div>
                <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">
                  {mod.description}
                </p>

                <div className="mt-12 flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-accent num">
                    01
                  </span>
                  <span aria-hidden className="h-px w-8 bg-line-strong" />
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Key features
                  </h2>
                </div>
                <ul className="mt-6 flex flex-col">
                  {mod.features.map((f, i) => (
                    <li
                      key={f}
                      className="flex items-start gap-4 border-t border-line py-4 first:border-t-0 first:pt-0"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-base leading-relaxed text-muted">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-accent num">
                    02
                  </span>
                  <span aria-hidden className="h-px w-8 bg-line-strong" />
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Available in
                  </h2>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {inEditions.map((e) => (
                    <Badge key={e.slug} tone="brand">
                      {e.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28">
                <ModuleDiagram module={mod} />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/contact">Book a Demo</Button>
                  <Button href="/modules" variant="secondary">
                    All modules
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
