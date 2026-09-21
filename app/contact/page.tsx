import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { company, offices } from "@/content/company";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the BlueWhale Stack team — book a demo, discuss your cloud strategy, or reach sales.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; resource?: string }>;
}) {
  const { intent = "demo", resource } = await searchParams;
  const requestedResource = resource
    ? resources.find((r) => r.slug === resource)
    : undefined;

  const hero =
    intent === "sales"
      ? {
          eyebrow: "Contact Sales",
          title: "Let's talk about your cloud strategy",
          body: "Reach our sales team for pricing, editions, and a tailored evaluation for your environment. We reply within one business day.",
          formTitle: "Talk to sales",
          formBody: "Tell us about your organisation and what you're looking to solve.",
          submitLabel: "Contact sales",
        }
      : intent === "resource"
        ? {
            eyebrow: "Resource access",
            title: requestedResource
              ? `Request “${requestedResource.title}”`
              : "Request a resource or control mapping",
            body: "Tell us who you are and which document or regime mapping you need. We send it directly — usually within one business day.",
            formTitle: "Request access",
            formBody: requestedResource
              ? `You're requesting: ${requestedResource.title} (${requestedResource.type}).`
              : "Tell us which resource, datasheet or regime control mapping you're after.",
            submitLabel: "Request access",
          }
        : intent === "preview"
          ? {
              eyebrow: "Preview programme",
              title: "Join the Telco & Datacenter Edition preview",
              body: "Design partners deploy the edition on their own infrastructure with BlueWhale engineers, run it on real tenants, and move to general-availability licensing (Q4 2026) on a pre-agreed basis.",
              formTitle: "Apply for the preview",
              formBody: "Tell us about your facilities, network and the tenants you would run first.",
              submitLabel: "Apply for the preview",
            }
          : {
              eyebrow: "Working session",
              title: "See the platform on one of your own accounts",
              body: "A 45-minute working session with a solutions engineer: one cloud account connected read-only, the inventory, cost and audit screens on your real resources, and the export left with you. Nothing is installed on your side.",
              formTitle: "Book a working session",
              formBody: "Tell us which clouds you run and what you would like to see first.",
              submitLabel: "Book a working session",
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
                <span className="eyebrow text-white/80">
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
                  <h3 className="eyebrow text-white/80">
                    Reach us directly
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-white/70" />
                      <div>
                        <div className="text-sm font-medium text-white">Sales</div>
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
                        <div className="text-sm font-medium text-white">General</div>
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
                  <h3 className="eyebrow text-white/80">
                    Offices
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
