import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: React.ReactNode;
  a: React.ReactNode;
}

/**
 * Objection-handling FAQ for detail pages: split layout (sticky heading
 * left, numbered answers right) plus FAQPage JSON-LD. Answers are plain
 * text so the same content can be rendered in the structured data.
 */
export function FAQ({
  items,
  eyebrow = "Questions",
  title,
  description,
  tinted = false,
  id = "faq",
}: {
  items: FaqItem[];
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  tinted?: boolean;
  id?: string;
}) {
  if (!items.length) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // structured data only for plain-text answers (inline editing hands the block React nodes)
    mainEntity: items.filter((f) => typeof f.q === "string" && typeof f.a === "string").map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id={id}
      className={cn("scroll-mt-20 border-t border-line py-20 sm:py-24", tinted ? "bg-sunken" : "bg-canvas")}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading eyebrow={eyebrow} title={title} description={description} />
            </div>
          </Reveal>
          <div className="flex flex-col">
            {items.map((f, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex items-start gap-5 border-t border-line py-6 first:border-t-0 first:pt-0 sm:gap-6">
                  <span className="num pt-0.5 text-lg font-bold text-accent/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-ink">{f.q}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
