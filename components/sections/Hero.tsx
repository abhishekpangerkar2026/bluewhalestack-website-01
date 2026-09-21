import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { EstateTicker } from "./EstateTicker";
import { hero } from "@/content/home";
import { photos, photoSrc, photoSrcSet } from "@/content/photos";
import { cn } from "@/lib/utils";
import styles from "./Home.module.css";

const PHOTO = "platform-stack" as const;
const LINE_ONE = ["Every", "cloud."];
const LINE_TWO = ["One", "control", "plane."];

export function Hero() {
  const p = photos[PHOTO];
  let wordIndex = 0;
  const word = (w: string, accent: boolean) => {
    const delay = 140 + wordIndex++ * 95;
    return (
      <span key={w + delay} className={cn("word-in", styles.word, accent && styles.accent)} style={{ animationDelay: `${delay}ms` }}>
        {w}
      </span>
    );
  };
  return (
    <section className={styles.hero}>
      <div className={styles.heroPhoto} aria-hidden>
        <img
          src={photoSrc(PHOTO, 1536)}
          srcSet={photoSrcSet(PHOTO)}
          sizes="58vw"
          alt=""
          width={p.width}
          height={p.height}
          fetchPriority="high"
          decoding="sync"
          className="photo-drift"
        />
      </div>
      <Container>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span /> {hero.badge}</p>
            <h1 className={styles.heroTitle}>
              {LINE_ONE.map((w) => word(w, false))}
              <br />
              {LINE_TWO.map((w) => word(w, true))}
            </h1>
            <p className={cn(styles.heroDescription, "animate-fade-up")} style={{ animationDelay: "560ms" }}>{hero.description}</p>
            <div className={cn(styles.heroActions, "animate-fade-up")} style={{ animationDelay: "680ms" }}>
              <Button href={hero.primaryCta.href} size="lg">{hero.primaryCta.label}<ArrowUpRight size={18} /></Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="outline">{hero.secondaryCta.label}<ArrowRight size={17} /></Button>
            </div>
            <p className={cn(styles.heroNote, "animate-fade-up")} style={{ animationDelay: "760ms" }}><ShieldCheck size={15} />{hero.primaryNote}</p>
            <ul className={cn(styles.heroFacts, "animate-fade-up")} style={{ animationDelay: "860ms" }}>
              {hero.facts.map((f) => (
                <li key={f.label}>
                  <strong><CountUp value={f.value} /></strong>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <figure className={styles.heroMobile}>
          <img src={photoSrc(PHOTO, 1024)} srcSet={photoSrcSet(PHOTO)} sizes="100vw" alt={p.alt} width={p.width} height={p.height} />
        </figure>
      </Container>
      <div className={styles.tickerWrap}>
        <EstateTicker />
      </div>
    </section>
  );
}
