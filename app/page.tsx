import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, Sparkles, Server, ShieldCheck, Plug, KeyRound, PackagePlus, Layers, Building2, RadioTower, Landmark } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { GlobalInfra } from "@/components/sections/GlobalInfra";
import { StoryVisual } from "@/components/sections/CustomerStories";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { proofStrip, whyBluewhale, howItWorks } from "@/content/home";
import { customerStories } from "@/content/customers";
import { getEditions } from "@/lib/content";
import editorial from "@/components/sections/EditorialSections.module.css";
import styles from "@/components/sections/Home.module.css";

const spotlight = customerStories.find((s) => s.slug === "bfsi-singapore-qatar") ?? customerStories[0];
const steps = howItWorks.slice(0, 3);

/** Short, hand-written teasers for the facts row under the console — deliberately one line, not the full pillar body. */
const CONSOLE_FACTS = [
  { icon: Boxes, title: "Nine families, one inventory", body: "A cost anomaly, a finding and a ticket point at the same workload and owner." },
  { icon: Sparkles, title: "Whale AI in every family", body: "50+ grounded use cases, including fully offline inside the perimeter." },
  { icon: Server, title: "Six clouds, one datacenter floor", body: "Public cloud by API; VMware, Hyper-V and Nutanix by Edge Agent." },
  { icon: ShieldCheck, title: "Sovereign by architecture", body: "SaaS, BYOC, on-premises or fully air-gapped — the same build, every mode." },
];

const STEP_ICONS = [Plug, KeyRound, PackagePlus];
const EDITION_ICONS: Record<string, typeof Layers> = { standard: Layers, enterprise: Building2, "telco-datacenter": RadioTower, government: Landmark };

export default function HomePage() {
  const editions = getEditions();
  return (
    <>
      <Hero />

      {/* 01 — proof: outcomes from delivered engagements */}
      <section className={styles.proofStrip}><Container>
        <div className={styles.proofIntro}>
          <p>FROM DELIVERED ENGAGEMENTS · ANONYMIZED UNDER CONFIDENTIALITY</p>
          <Link className={styles.sectionLink} href="/case-studies">The outcomes <ArrowUpRight size={15} /></Link>
        </div>
        <div className={styles.proofGrid}>{proofStrip.map((p) => <Link key={p.href} href={p.href} className={styles.proofItem}><strong>{p.value}</strong><p>{p.label}</p><span>{p.source}</span></Link>)}</div>
      </Container></section>

      {/* 02 — see the product: the real console, by job, not another icon grid */}
      <section className={styles.section} id="product"><Container>
        <div className={styles.sectionHeader}>
          <SectionHeading eyebrow="02 / See the product" title="One console. Every job." description={whyBluewhale.description} />
          <Link href="/modules" className={styles.sectionLink}>Explore all modules <ArrowUpRight size={17} /></Link>
        </div>
        <ProductShowcase />
        <div className={styles.factRow}>
          {CONSOLE_FACTS.map((f) => (
            <div key={f.title} className={styles.fact}>
              <span className={styles.factIcon}><f.icon aria-hidden size={15} /></span>
              <div><strong>{f.title}</strong><span>{f.body}</span></div>
            </div>
          ))}
        </div>
      </Container></section>

      {/* 03 — how it works: a track of large numerals, not bordered boxes */}
      <section className={`${styles.section} ${styles.sectionTint}`}><Container>
        <SectionHeading eyebrow="03 / How it works" title="Connect, govern, provision." description="Read-only credentials in, one system of record out. The mechanics — ports, permissions, timings — are the ones the docs describe." />
        <ol className={`${editorial.timeline} ${styles.timeline3}`}>
          {steps.map((s, i) => {
            const StepIcon = STEP_ICONS[i] ?? Plug;
            return (
            <li key={s.step} className={editorial.step}>
              <span aria-hidden className={editorial.stepNumber}>{s.step}</span>
              <div>
                <div aria-hidden className={editorial.stepTrack} />
                <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.025em] text-ink"><span className={styles.stepIcon}><StepIcon aria-hidden size={14} /></span>{s.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.85] text-muted">{s.body}</p>
                <small className="mt-4 block text-[11px] leading-relaxed text-faint">{s.detail}</small>
              </div>
            </li>
          );})}
        </ol>
        <Link href="/docs/quick-start" className={`${styles.sectionLink} mt-9`}>Read the quick start <ArrowRight size={15} /></Link>
      </Container></section>

      {/* 04 — one deep case study, not a grid of four */}
      <section className={styles.section}><Container>
        <div className={styles.sectionHeader}>
          <SectionHeading eyebrow="04 / Delivered in the real world" title="One estate, told in full." description="Anonymized under confidentiality; every figure is as briefed by BlueWhale Stack, not illustrative." />
          <Link href="/case-studies" className={styles.sectionLink}>All engagements <ArrowUpRight size={17} /></Link>
        </div>
        <div className={styles.caseSpotlight}>
          <div>
            <p className="eyebrow text-accent">{spotlight.industry} · {spotlight.edition}</p>
            <h3 className="mt-4">{spotlight.headline}</h3>
            <p className={styles.caseQuote}>{spotlight.summary}</p>
            <div className={styles.caseMeta}><strong>{spotlight.org}</strong><span>{spotlight.note}</span></div>
            <div className={styles.caseLinks}>
              <Link href={`/case-studies/${spotlight.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent">Read the full case study <ArrowUpRight size={15} /></Link>
              <Link href="/customers" className="inline-flex items-center gap-2 text-sm font-semibold text-ink">All success stories <ArrowRight size={15} /></Link>
            </div>
          </div>
          <StoryVisual story={spotlight} />
        </div>
      </Container></section>

      {/* 05 — editions: one comparison list, not four floating cards */}
      <section className={`${styles.section} ${styles.sectionTint}`}><Container>
        <div className={styles.sectionHeader}>
          <SectionHeading eyebrow="05 / Editions" title="Four editions. One architecture." description="Standard and Enterprise carry published prices; the operator and government editions are shaped to the estate. Moving up is a licence change on the same deployment." />
          <Link href="/editions" className={styles.sectionLink}>Compare in full <ArrowUpRight size={17} /></Link>
        </div>
        <div className={styles.editionCompare}>
          {editions.map((e) => (
            <Link key={e.slug} href={`/editions/${e.slug}`} className={styles.editionRow}>
              <div className={styles.editionRowName}>
                <strong><span className={styles.editionIcon}>{(() => { const I = EDITION_ICONS[e.slug] ?? Layers; return <I aria-hidden size={14} />; })()}</span>{e.name}{e.featured && " ★"}</strong>
                <span>{e.comingSoon ? `Preview · GA ${e.gaTarget}` : "Available now"}</span>
              </div>
              <p className={styles.editionRowFit}>{e.audience}</p>
              <p className={styles.editionRowPrice}>{e.priceAnchor}</p>
              <span className={styles.editionRowLink}>Explore <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-faint">
          Telco &amp; Datacenter Edition is also what BlueWhale Stack Fabric runs on — a market&apos;s datacenter
          capacity, every operator and tier, consumed as one sovereign cloud. <Link href="/fabric" className="font-semibold text-accent">Explore the Fabric <ArrowRight className="inline h-3 w-3" /></Link>
        </p>
      </Container></section>

      {/* 06 — deployment and trust: where it runs, in region */}
      <GlobalInfra />

      <ClosingCTA
        eyebrow="Your next chapter"
        title="See the platform on one of your own accounts."
        body="A 45-minute working session with a solutions engineer: we connect one cloud account read-only, walk the inventory, cost and audit screens on your real resources, and leave you with the export. No slides."
        primary={{ label: "Book a working session", href: "/contact?intent=demo", note: "45 minutes · read-only credentials · nothing installed on your side" }}
        secondary={{ label: "Start the 90-day prototype", href: "/platform#prototype", note: "Half-day discovery workshop, then 90 days on your estate with no licence cost." }}
        tertiary={{ label: "Published pricing", href: "/pricing", note: "Standard $24,000 · Enterprise $120,000 a year" }}
      />
    </>
  );
}
