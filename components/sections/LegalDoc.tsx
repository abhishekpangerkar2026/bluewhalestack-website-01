import { Container } from "@/components/ui/Container";

export type LegalSection = {
  heading: string;
  /** Paragraphs and/or bullet lists, in order. */
  body: Array<string | string[]>;
};

/**
 * Shared layout for legal documents (Privacy, Terms). Renders a titled hero,
 * a "last updated" line, and clean prose sections with anchored headings.
 */
export function LegalDoc({
  title,
  intro,
  lastUpdated,
  sections,
}: {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="border-b border-line bg-sunken py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
          <p className="mt-4 text-sm text-faint">Last updated: {lastUpdated}</p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            {/* TOC */}
            <nav className="hidden lg:block" aria-label="On this page">
              <ul className="sticky top-24 space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#section-${i + 1}`}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Body */}
            <div className="max-w-3xl">
              {sections.map((s, i) => (
                <div key={s.heading} id={`section-${i + 1}`} className="scroll-mt-24">
                  <h2 className="mt-10 text-2xl font-bold text-ink first:mt-0">
                    {i + 1}. {s.heading}
                  </h2>
                  {s.body.map((block, j) =>
                    Array.isArray(block) ? (
                      <ul
                        key={j}
                        className="mt-4 space-y-2 text-[0.97rem] leading-relaxed text-muted"
                      >
                        {block.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        key={j}
                        className="mt-4 text-[0.97rem] leading-relaxed text-muted"
                      >
                        {block}
                      </p>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
