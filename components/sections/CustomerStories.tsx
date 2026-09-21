import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { customerStories, type CustomerStory } from "@/content/customers";
import styles from "./CustomerStories.module.css";

const SECTOR_ICON: Record<string, string> = {
  BFSI: "Banknote", Government: "Landmark", "Telco & Datacenter": "Server", Media: "Clapperboard",
};

export function CustomerStories() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <SectionHeading eyebrow="05 / Delivered in the real world" title="Complex estates. Measurable change." description="Delivered engagements in the regulated, multi-cloud environments BlueWhale Stack is built for — anonymized under confidentiality, real in every outcome." />
          <Button href="/customers" variant="outline">All success stories <ArrowUpRight size={16} /></Button>
        </div>
        <div className={styles.grid}>
          {customerStories.map((story, i) => (
            <Reveal key={story.slug} delay={(i % 2) * 60}>
              <article className={styles.card}>
                <StoryVisual story={story} compact />
                <div className={styles.body}>
                  <p className={styles.edition}>{story.edition}</p>
                  <h3><Link href={`/case-studies/${story.slug}`}>{story.headline}</Link></h3>
                  <p className={styles.summary}>{story.summary}</p>
                  <Link href={`/case-studies/${story.slug}`} className={styles.link}>Read the case study <ArrowUpRight size={16} /></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className={styles.footnote}>Client identities are withheld under confidentiality. <Link href="/case-studies">Explore the documented engagements <ArrowUpRight size={13} /></Link></p>
      </Container>
    </section>
  );
}

/** The outcome itself is the visual: readable type, a sector sigil and case metrics. */
export function StoryVisual({ story, compact = false }: { story: CustomerStory; compact?: boolean }) {
  const metric = story.metrics[0];
  return (
    <div className={`${styles.visual} ${compact ? styles.compact : ""}`} data-sector={story.industry}>
      <div className={styles.visualTop}><span><Icon name={SECTOR_ICON[story.industry] ?? "Building2"} className="h-4 w-4" />{story.industry}</span><span className={styles.visualLabel}>Delivered engagement</span></div>
      <div className={styles.metric}>
        {metric && <><strong>{metric.value}</strong><span>{metric.label}</span></>}
      </div>
      <div className={styles.visualBottom}><p>{story.org}</p><ArrowUpRight size={20} aria-hidden /></div>
      {!compact && story.note && <p className={styles.note}>{story.note}</p>}
    </div>
  );
}