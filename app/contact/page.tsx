import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { CTASection } from "@/components/sections/CTASection";
import { company, offices } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the BlueWhale Stack team — book a demo, discuss your cloud strategy, or reach sales.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;
  const isSales = intent === "sales";

  const hero = isSales
    ? {
        eyebrow: "Contact Sales",
        title: "Let's talk about your cloud strategy",
        body: "Reach our sales team for pricing, editions, and a tailored evaluation for your environment. We reply within one business day.",
        formTitle: "Talk to sales",
        formBody: "Tell us about your organisation and what you're looking to solve.",
        submitLabel: "Contact sales",
      }
    : {
        eyebrow: "Contact Us",
        title: "Let's talk cloud transformation",
        body: "Book a guided demo, discuss your cloud strategy, or get a tailored evaluation. Our solutions team replies within one business day.",
        formTitle: "Book a demo",
        formBody: "Tell us a little about your environment and goals.",
        submitLabel: "Book a demo",
      };

  return (
    <>
      {/* ── Hero + form: editorial split, dark statement column meets the form ── */}
      <section className="relative overflow-hidden bg-brand-900">
        <Container className="relative">
          <div className="grid gap-x-16 gap-y-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.05fr]">
            {/* Statement + channels (dark) */}
            <div className="lg:py-4">
              <div className="mb-5 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-white/40" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {hero.eyebrow}
                </span>
              </div>
              <h1 className="text-[2.4rem] font-bold leading-[1.03] tracking-tight text-white sm:text-5xl">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                {hero.body}
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
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
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
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
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Form (light card, lifted onto the dark band) */}
            <div className="lg:-mb-20 lg:translate-y-4">
              <div className="rounded-xl border border-line bg-surface p-7 shadow-lg sm:p-9">
                <h2 className="text-2xl font-bold text-ink">
                  {hero.formTitle}
                </h2>
                <p className="mt-2 text-muted">{hero.formBody}</p>
                <div className="mt-6">
                  <ContactForm submitLabel={hero.submitLabel} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* spacer to clear the lifted form card */}
      <div className="h-12 sm:h-20" aria-hidden />

      <CTASection />
    </>
  );
}
