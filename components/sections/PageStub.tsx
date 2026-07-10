import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";

/**
 * Polished placeholder for pages scheduled in a later build pass.
 * Keeps navigation working and the site feeling intentional.
 */
export function PageStub({
  eyebrow,
  title,
  description,
  bullets,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <Container className="relative">
          <div className="max-w-3xl py-20 sm:py-28">
            <Badge tone="accent" className="bg-white/10 text-white ring-1 ring-inset ring-white/15">
              {eyebrow}
            </Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              {description}
            </p>
            {bullets && bullets.length > 0 && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-white/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" size="lg" variant="white">
                Book a Demo
              </Button>
              <Button
                href="/"
                size="lg"
                className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15"
              >
                Back to Home
              </Button>
            </div>
            <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Full page in active design — next build pass.
            </p>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
