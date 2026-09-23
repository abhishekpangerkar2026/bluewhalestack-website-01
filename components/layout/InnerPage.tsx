import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { contextNavFallback } from "@/content/sections/siteSettings";
import { getSiteSettings } from "@/lib/content";
import styles from "./InnerPage.module.css";

export type PageCategory = "platform" | "solutions" | "resources" | "company" | "pricing" | "legal";

/** A shared editorial frame keeps the extensive catalogue easy to navigate. */
export async function InnerPage({ children, category, current, document = false }: {
  children: ReactNode;
  category: PageCategory;
  current: string;
  document?: boolean;
}) {
  const settings = await getSiteSettings();
  const section = settings.contextNav.find((s) => s.key === category) ?? contextNavFallback.find((s) => s.key === category)!;
  const action = settings.contextAction;
  return (
    <div className={`${styles.page} ${document ? styles.document : ""}`} data-page={current}>
      <div className={styles.contextBar}>
        <Container className={styles.contextInner}>
          <span className={styles.contextLabel}><span aria-hidden className={styles.contextDot} />{section.label}</span>
          <nav aria-label={`${section.label} navigation`} className={styles.contextNav}>
            {section.links.map(({ label, href }) => (
              <Link key={href} href={href} aria-current={current === href ? "page" : undefined}>{label}</Link>
            ))}
          </nav>
          {current !== "/contact" && <Link href={action.href} className={styles.contextAction}>{action.label} <ArrowUpRight size={13} /></Link>}
        </Container>
      </div>
      {children}
    </div>
  );
}

export function IntroPanel({ eyebrow, children, dark = false }: { eyebrow: string; children: ReactNode; dark?: boolean }) {
  return <aside className={`${styles.introPanel} ${dark ? styles.panelDark : ""}`}>
    <p className={styles.panelEyebrow}><span aria-hidden />{eyebrow}</p>
    {children}
  </aside>;
}

export function IntroPanelLink({ href, title, description, index }: { href: string; title: string; description: string; index: string }) {
  return <Link href={href} className={styles.panelLink}>
    <span className={styles.panelIndex}>{index}</span>
    <span><strong>{title}</strong><small>{description}</small></span>
    <ArrowUpRight size={18} aria-hidden />
  </Link>;
}

export function IntroPanelStat({ value, label, detail }: { value: string; label: string; detail?: string }) {
  return <div className={styles.panelStat}>
    <p>{label}</p><strong>{value}</strong>{detail && <span>{detail}</span>}
  </div>;
}

export function PageIndex({ items }: { items: { label: string; href: string }[] }) {
  return <nav className={styles.pageIndex} aria-label="On this page">
    <Container className={styles.pageIndexInner}>
      <span className={styles.contextLabel}>On this page</span>
      {items.map((item, i) => <a key={item.href} href={item.href}><span>{String(i + 1).padStart(2, "0")}</span>{item.label}</a>)}
    </Container>
  </nav>;
}
