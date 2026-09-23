import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { resourcesFrom } from "@/content/resources";
import { contactPageSpec } from "@/content/cms/docs/contactPage";
import { contactPage } from "@/content/sections/contactPage";
import { getPageDoc } from "@/lib/cms-page";
import { getDocuments, getSiteSettings } from "@/lib/content";
import { builtMetadata, builtPage } from "@/lib/builder/render";

const getContent = () => getPageDoc(contactPageSpec, contactPage);

export async function generateMetadata(): Promise<Metadata> {
  const builtMeta = await builtMetadata("/contact");
  if (builtMeta) return builtMeta;
  const c = await getContent();
  return { title: c.seoTitle, description: c.seoDescription };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; resource?: string }>;
}) {
  const built = await builtPage("/contact");
  if (built) return built;
  const [c, settings] = await Promise.all([getContent(), getSiteSettings()]);
  const { company, offices } = settings;
  const { intent = "demo", resource } = await searchParams;
  const requestedResource = resource
    ? resourcesFrom(await getDocuments()).find((r) => r.slug === resource)
    : undefined;

  // the variant for ?intent=…; an unknown intent renders the working-session (demo) variant
  const variant =
    c.intents.find((i) => i.key === intent) ?? c.intents.find((i) => i.key === "demo") ?? contactPage.intents[0];
  const hero = {
    ...variant,
    // the resource variant names the requested document when the page is opened with ?resource=<slug>
    title:
      requestedResource && variant.titleWithResourceBefore != null
        ? `${variant.titleWithResourceBefore}${requestedResource.title}${variant.titleWithResourceAfter ?? ""}`
        : variant.title,
    formBody:
      requestedResource && variant.formBodyWithResourceBefore != null
        ? `${variant.formBodyWithResourceBefore}${requestedResource.title} (${requestedResource.type})${variant.formBodyWithResourceAfter ?? ""}`
        : variant.formBody,
  };

  return (
    <InnerPage category="company" current="/contact">
      {/* ── Hero + form: editorial split, dark statement column meets the form ── */}
      <section className="relative overflow-hidden bg-brand-900">
        <Container className="relative">
          <div className="grid items-start gap-x-20 gap-y-12 py-16 sm:py-24 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Statement + channels (dark) */}
            <div className="lg:sticky lg:top-28 lg:py-4">
              <div className="mb-5 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-white/40" />
                <span className="eyebrow text-[var(--gold)]">
                  {hero.eyebrow}
                </span>
              </div>
              <h1 className="display-1 text-white">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                {hero.body}
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="eyebrow text-[var(--gold)]">
                    {c.channels.reachLabel}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                      <div>
                        <div className="text-sm font-medium text-white">{c.channels.salesLabel}</div>
                        <a
                          href={`mailto:${company.emails.sales}`}
                          className="text-sm text-white/70 hover:text-white"
                        >
                          {company.emails.sales}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                      <div>
                        <div className="text-sm font-medium text-white">{c.channels.generalLabel}</div>
                        <a
                          href={`mailto:${company.emails.contact}`}
                          className="text-sm text-white/70 hover:text-white"
                        >
                          {company.emails.contact}
                        </a>
                      </div>
                    </li>
                    {company.phones.map((p) => (
                      <li key={p.region} className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {p.region}
                          </div>
                          <div className="text-sm text-white/70">{p.number}</div>
                          <div className="text-xs text-white/50">{p.hours}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="eyebrow text-[var(--gold)]">
                    {c.channels.officesLabel}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {offices.map((o) => (
                      <li key={o.city} className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                        <div>
                          <div className="text-sm font-medium text-white">
                            {o.city} · {o.label}
                          </div>
                          <div className="text-sm text-white/70">{o.address}</div>
                          <div className="mt-0.5 text-xs text-white/60">{o.entity}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Form (light card on the dark band) */}
            <div>
              <div className="rounded-2xl border border-line bg-surface p-7 shadow-xl sm:p-10">
                <h2 className="text-2xl font-bold text-ink">
                  {hero.formTitle}
                </h2>
                <p className="mt-2 text-muted">{hero.formBody}</p>
                <div className="mt-6">
                  <ContactForm
                    submitLabel={hero.submitLabel}
                    intent={intent}
                    resource={requestedResource?.slug}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </InnerPage>
  );
}
