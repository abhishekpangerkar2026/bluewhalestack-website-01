import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SceneThumb } from "@/components/scenes/ProductScene";

const STORIES = [
  { key: "estate", title: "Every estate, one control plane", body: "Public clouds, virtualized infrastructure and edge sites connected through one resource model.", href: "/platform" },
  { key: "architecture", title: "Six layers, one platform build", body: "A shared architecture from the industry experience to the infrastructure it governs.", href: "/platform#architecture" },
  { key: "whale-ai", title: "Whale AI, inside the perimeter", body: "Intelligence grounded in your inventory, billing and tickets, with an offline deployment option.", href: "/products/whale-ai" },
];

/** Architecture stories replace the decorative looping scene videos. */
export function MotionStrip() {
  return (
    <section className="border-y border-line bg-sunken py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal><SectionHeading eyebrow="Explore the architecture" title="See how it fits together." description="Three views of the platform: the infrastructure it connects, the layers it shares, and the intelligence that works across them." /></Reveal>
          <Reveal delay={80}><Link href="/resources" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">Technical resources <ArrowRight className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {STORIES.map((story, i) => (
            <Reveal key={story.key} delay={i * 70}>
              <Link href={story.href} className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4">
                <SceneThumb scene={story.key} />
                <div className="pt-6">
                  <p className="text-xs font-medium tracking-widest text-faint">0{i + 1} / PLATFORM GUIDE</p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink group-hover:text-accent">{story.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{story.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">Explore <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
