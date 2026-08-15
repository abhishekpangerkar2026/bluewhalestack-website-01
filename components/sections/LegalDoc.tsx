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
      <section className="relative overflow-hidden bg-brand-900 py-16 text-white sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/30 blur-[110px]"
        />
        <Container className="relative">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-white/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Legal
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            {intro}
          </p>
          <p className="mt-4 text-sm text-white/50">Last updated: {lastUpdated}</p>
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
                      className="flex items-center gap-2.5 text-muted transition-colors hover:text-accent"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--bg-active)] text-[10px] font-bold text-accent">
                        {i + 1}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Body */}
            <div className="max-w-3xl">
              {sections.map((s, i) => (
                <div key={s.heading} id={`section-${i + 1}`} className="scroll-mt-24">
                  <div className="mt-10 flex items-center gap-3.5 first:mt-0">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--bg-active)] text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-ink">{s.heading}</h2>
                  </div>
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
