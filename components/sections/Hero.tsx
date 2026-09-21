import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CloudLogo } from "@/components/brand/CloudLogos";
import { HeroProductVisual } from "./HeroProductVisual";
import { hero } from "@/content/home";
import styles from "./Home.module.css";

const CLOUDS = ["aws", "azure", "gcp", "oracle", "alibaba", "huawei"];

export function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span /> DIGITAL EXPERIENCE PLATFORM</p>
            <h1 className={styles.heroTitle}>Every cloud.<br /><span>One control<br className={styles.desktopBreak} /> plane.</span></h1>
            <p className={styles.heroDescription}>{hero.description}</p>
            <div className={styles.heroActions}>
              <Button href={hero.primaryCta.href} size="lg">{hero.primaryCta.label}<ArrowUpRight size={18} /></Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="ghost">{hero.secondaryCta.label}<ArrowRight size={17} /></Button>
            </div>
            <p className={styles.heroNote}><ShieldCheck size={14} />{hero.primaryNote}</p>
          </div>
          <div className={styles.heroArt}>
            <div className={styles.artIndex}><span>LIVE PRODUCT VIEW</span><span>Illustrative interface · sample data</span></div>
            <HeroProductVisual />
            <div className={styles.artFoot}><span>54 capabilities</span><span>9 families</span><span>4 editions</span></div>
          </div>
        </div>
        <div className={styles.integrations}>
          <p>Built for your cloud.<br /><strong>And everything beyond it.</strong></p>
          <div>{CLOUDS.map((c) => <CloudLogo key={c} name={c} className={styles.cloudLogo} />)}</div>
        </div>
      </Container>
    </section>
  );
}
