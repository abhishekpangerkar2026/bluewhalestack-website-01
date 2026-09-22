import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { EstateTicker } from "./EstateTicker";
import type { HomeContent } from "@/lib/content";
import { photos, photoSrc, photoSrcSet } from "@/content/photos";
import { imageSrcSet, imageUrl } from "@/lib/cms";
import { cn } from "@/lib/utils";
import styles from "./Home.module.css";

const PHOTO = "platform-stack" as const;

/** Split the headline into two lines: the editor's fields, or the classic "Every cloud. / One control plane." */
function lines(title: string, accent?: string): [string[], string[]] {
  if (accent) return [title.split(/\s+/), accent.split(/\s+/)];
  const [first, ...rest] = title.split(/(?<=\.)\s+/);
  return rest.length ? [first.split(/\s+/), rest.join(" ").split(/\s+/)] : [["Every", "cloud."], ["One", "control", "plane."]];
}

export function Hero({ data }: { data: HomeContent["hero"] }) {
  const p = photos[PHOTO];
  const [lineOne, lineTwo] = lines(data.title, data.titleAccent);
  const pic = data.image
    ? { src: imageUrl(data.image.src, 1536), srcSet: imageSrcSet(data.image.src), mobile: imageUrl(data.image.src, 1024), alt: data.image.alt ?? "", width: data.image.width ?? 1536, height: data.image.height ?? 1024, focal: data.image.focal ?? "50% 46%" }
    : { src: photoSrc(PHOTO, 1536), srcSet: photoSrcSet(PHOTO), mobile: photoSrc(PHOTO, 1024), alt: p.alt, width: p.width, height: p.height, focal: "50% 46%" };

  let wordIndex = 0;
  const word = (w: string, accent: boolean) => {
    const delay = 140 + wordIndex++ * 95;
    return (
      <span key={w + delay} className={cn("word-in", styles.word, accent && styles.accent)} style={{ animationDelay: `${delay}ms` }}>
        {w}
      </span>
    );
  };

  const media = (mobile: boolean) =>
    data.video ? (
      <video src={data.video.src} poster={mobile ? pic.mobile : pic.src} autoPlay muted loop playsInline preload={mobile ? "metadata" : "auto"} aria-hidden style={{ objectPosition: pic.focal }} />
    ) : (
      <img
        src={mobile ? pic.mobile : pic.src}
        srcSet={pic.srcSet}
        sizes={mobile ? "100vw" : "58vw"}
        alt={mobile ? pic.alt : ""}
        width={pic.width}
        height={pic.height}
        fetchPriority={mobile ? undefined : "high"}
        decoding="sync"
        className={mobile ? undefined : "photo-drift"}
        style={{ objectPosition: pic.focal }}
      />
    );

  return (
    <section className={styles.hero}>
      <div className={styles.heroPhoto} aria-hidden>{media(false)}</div>
      <Container>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span /> {data.badge}</p>
            <h1 className={styles.heroTitle}>
              {lineOne.map((w) => word(w, false))}
              <br />
              {lineTwo.map((w) => word(w, true))}
            </h1>
            <p className={cn(styles.heroDescription, "animate-fade-up")} style={{ animationDelay: "560ms" }}>{data.description}</p>
            <div className={cn(styles.heroActions, "animate-fade-up")} style={{ animationDelay: "680ms" }}>
              <Button href={data.primaryCta.href} size="lg">{data.primaryCta.label}<ArrowUpRight size={18} /></Button>
              <Button href={data.secondaryCta.href} size="lg" variant="outline">{data.secondaryCta.label}<ArrowRight size={17} /></Button>
            </div>
            <p className={cn(styles.heroNote, "animate-fade-up")} style={{ animationDelay: "760ms" }}><ShieldCheck size={15} />{data.primaryNote}</p>
            <ul className={cn(styles.heroFacts, "animate-fade-up")} style={{ animationDelay: "860ms" }}>
              {data.facts.map((f) => (
                <li key={f.label}>
                  <strong><CountUp value={f.value} /></strong>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <figure className={styles.heroMobile}>{media(true)}</figure>
      </Container>
      <div className={styles.tickerWrap}>
        <EstateTicker />
      </div>
    </section>
  );
}
