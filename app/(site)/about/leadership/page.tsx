import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LocationVisual } from "@/components/diagrams/LocationVisual";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { LeadershipFeature, LeadershipSpotlight, LeadershipTile } from "@/components/sections/LeadershipCard";
import { leadershipPageSpec } from "@/content/cms/docs/leadershipPage";
import { leadershipPage } from "@/content/sections/leadershipPage";
import { getPageDoc } from "@/lib/cms-page";
import { getSiteSettings, getTeam } from "@/lib/content";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(leadershipPageSpec, leadershipPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/about/leadership");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function LeadershipPage() {
  const built = await builtPage("/about/leadership");
  if (built) return built;
  const [c, settings, leadership] = await Promise.all([getContent(), getSiteSettings(), getTeam()]);
  const { offices } = settings;
  const announcedLeaders = leadership.filter((l) => l.name);
  const unannouncedRoles = leadership.filter((l) => !l.name);
  // The founder gets the full-width feature; everyone else fills a balanced grid.
  const [founder, ...team] = announcedLeaders;
  return (
    <InnerPage category="company" current="/about/leadership">
      {/* ── Hero ── */}
      <section className="border-b border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <Reveal>
              <div className="max-w-2xl">
                <div className="mb-5 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-accent/50" />
                  <span className="eyebrow">
                    {c.hero.kicker}
                  </span>
                </div>
                <h1 className="display-1 text-ink">
                  {c.hero.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  {c.hero.description}
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="lg:pb-2">
                <div className="flex flex-wrap gap-3">
                  <Button href={c.hero.primary.href} size="lg">
                    {c.hero.primary.label}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href={c.hero.secondary.href} size="lg" variant="secondary">
                    {c.hero.secondary.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Leadership roster ── */}
      <section className="pb-20 pt-24 sm:pb-24 sm:pt-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.roster.heading} />
          </Reveal>
          <div className="mt-14">
            {founder && (
              <Reveal>
                <LeadershipFeature member={founder} />
              </Reveal>
            )}
            {team.length > 0 && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {team.map((l, i) => (
                  <Reveal key={l.name} delay={(i % 4) * 70} className="h-full">
                    <LeadershipSpotlight member={l} />
                  </Reveal>
                ))}
              </div>
            )}
            {unannouncedRoles.length > 0 && (
              <div
                className={`grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 ${
                  announcedLeaders.length > 0 ? "mt-6" : ""
                }`}
              >
                {unannouncedRoles.map((l, i) => (
                  <Reveal key={l.role} delay={(i % 4) * 70}>
                    <LeadershipTile member={l} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Departments ── */}
      <section className="border-t border-line bg-surface py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.departments.heading} />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {c.departments.items.map((d, i) => (
              <Reveal key={d.name} delay={(i % 2) * 60}>
                <Card className="flex h-full flex-col gap-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                      <Icon name={d.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-ink">{d.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{d.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {d.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-sunken px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Principles ── */}
      <section className="border-y border-line bg-sunken py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.values.heading} />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {c.values.items.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 60}>
                <div className="h-full bg-surface p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={v.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Where we are ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.presence.heading} />
          </Reveal>
          <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((o, i) => (
              <Reveal key={o.city} delay={i * 80} className="h-full">
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <LocationVisual city={o.city} className="aspect-[20/9]" />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-ink">{o.city}</h3>
                      <span className="shrink-0 rounded-full bg-[var(--bg-active)] px-3 py-1 text-xs font-semibold text-accent">
                        {o.label}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{o.blurb}</p>
                    <p className="mt-auto border-t border-line pt-3 text-xs leading-relaxed text-faint">
                      {o.address}
                      <br />
                      {o.entity}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Hiring CTA ── */}
      <section className="relative overflow-hidden bg-brand-900 py-20 text-white sm:py-24">
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow text-[var(--gold)]">
                  {c.hiring.kicker}
                </p>
                <h2 className="display-2 mt-5 text-white">
                  {c.hiring.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  {c.hiring.body}
                </p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button href={c.hiring.primary.href} size="lg" variant="white">
                  {c.hiring.primary.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={c.hiring.secondary.href} size="lg" className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15">
                  {c.hiring.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
