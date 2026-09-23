import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CmsPhotoHero } from "@/components/sections/CmsPhotoHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { careersPageSpec } from "@/content/cms/docs/careersPage";
import { careersPage } from "@/content/sections/careersPage";
import { cld, publicIdFromPath } from "@/lib/cloudinary";
import { imageUrl } from "@/lib/cms";
import { getPageDoc } from "@/lib/cms-page";
import { getJobs, getSiteSettings, getTeam } from "@/lib/content";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(careersPageSpec, careersPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/careers");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function CareersPage() {
  const built = await builtPage("/careers");
  if (built) return built;
  const [c, settings, jobs, roster] = await Promise.all([getContent(), getSiteSettings(), getJobs(), getTeam()]);
  const team = roster.filter((l) => l.name && (l.image || l.cmsImage));
  const careersEmail = settings.company.emails.careers;
  const applyHref = (title: string) =>
    `mailto:${careersEmail}?subject=${encodeURIComponent(`Application: ${title}`)}`;
  return (
    <InnerPage category="company" current="/careers">
      {/* ── Hero: editorial split, oversized statement left ── */}
      <CmsPhotoHero
        route="/careers"
        photo="datacenter-tray"
        eyebrow="Careers"
        title="Build the control plane that banks, ministries and operators run on."
        description="We are engineers, architects and product people in Mumbai, Ajman and Wilmington, building one platform across six public clouds, virtualised estates and air-gapped sites. The work is concrete — connectors, discovery engines, policy evaluation, an AI layer that runs offline — and it ships quarterly to customers who audit what we build."
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
      <section className="border-b border-line bg-surface pb-12">
        <Container>

          {/* the people you'd work with — real headshots from the leadership roster */}
          {team.length > 0 && (
            <Reveal delay={140}>
              <Link
                href={c.team.link.href}
                className="group mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-lg border border-line bg-canvas p-5 transition-colors hover:border-line-strong sm:p-6"
              >
                <div className="flex -space-x-3">
                  {team.map((m) => (
                    <span
                      key={m.name}
                      className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-surface"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- may resolve to an external Cloudinary URL */}
                      <img
                        src={m.cmsImage ? imageUrl(m.cmsImage.src, 112) : cld(publicIdFromPath(m.image!, "team"), m.image!, 112)}
                        alt={m.name!}
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                      />
                    </span>
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">
                    {c.team.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    {c.team.body}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {c.team.link.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          )}
        </Container>
      </section>

      {/* ── Perks: bold heading + bordered grid ── */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionHeading {...c.perks.heading} />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {c.perks.items.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 60}>
                <div className="h-full bg-surface p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--bg-active)] text-accent">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Roles: dark statement band, split heading + role list ── */}
      <section
        id="roles"
        className="relative scroll-mt-24 overflow-hidden border-b border-white/10 bg-brand-900 py-24 text-white sm:py-32"
      >
        <Container className="relative">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading {...c.roles.heading} inverse />
                <p className="mt-8 text-sm text-white/70">
                  {c.roles.cvLead}{" "}
                  <a
                    href={`mailto:${careersEmail}?subject=${encodeURIComponent("General application")}`}
                    className="font-semibold text-white hover:text-white/80"
                  >
                    {c.roles.cvLinkLabel}
                  </a>{" "}
                  {c.roles.cvTrail}
                </p>
              </div>
            </Reveal>
            <div className="flex flex-col divide-y divide-white/10">
              {jobs.map((j, i) => (
                <Reveal key={j.title} delay={(i % 6) * 40}>
                  <div className="group flex flex-col gap-3 py-5 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white transition-colors group-hover:text-white/80">
                        {j.title}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
                        <span className="font-semibold text-white/90">
                          {j.department}
                        </span>
                        <span aria-hidden className="text-white/20">
                          /
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {j.location}
                        </span>
                        <span>{j.type}</span>
                        <span>{j.remote}</span>
                      </div>
                    </div>
                    <Button
                      href={j.applyUrl || applyHref(j.title)}
                      variant="white"
                      size="sm"
                      className="shrink-0 self-start sm:self-auto"
                    >
                      {c.roles.applyLabel}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
