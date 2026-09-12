import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Short looping films of the product scenes (rendered by scripts/capture-video.mjs
 * into public/media/scenes). Muted, autoplaying, with a poster frame so the
 * strip is complete before the video arrives.
 */
const CLIPS = [
  { key: "estate", title: "Every estate, one control plane", body: "Six public clouds, your virtualised estate and your edge sites, cabled into one console.", href: "/platform" },
  { key: "architecture", title: "Six layers, one platform build", body: "Industry segments down to deployment modes — the same architecture in every edition.", href: "/platform#architecture" },
  { key: "whale-ai", title: "Whale AI, inside the perimeter", body: "50+ grounded use cases across every family, including fully offline.", href: "/products/whale-ai" },
];

export function MotionStrip() {
  return (
    <section className="border-y border-line bg-sunken py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="The platform in motion"
              title="Three short films of the product"
              description="Rendered from the same 3D scenes you can rotate on every product page. Each loops in five seconds; the download pack has all nine in MP4 and WebM."
            />
          </Reveal>
          <Reveal delay={80}>
            <Link href="/resources" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5">
              Request the media pack <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CLIPS.map((c, i) => (
            <Reveal key={c.key} delay={i * 80}>
              <Link href={c.href} className="group block h-full overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-[#eef3ff]">
                  <video
                    className="block h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={`/media/scenes/${c.key}.jpg`}
                    aria-label={`${c.title} — product film`}
                  >
                    <source src={`/media/scenes/${c.key}.webm`} type="video/webm" />
                    <source src={`/media/scenes/${c.key}.mp4`} type="video/mp4" />
                  </video>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-ink group-hover:text-accent">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
