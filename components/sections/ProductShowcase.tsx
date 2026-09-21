"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Wallet, Boxes, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FinOpsView } from "@/components/sections/ProductMockup";
import { AppWindow } from "@/components/sections/mockups/AppWindow";
import { InventoryMockup } from "@/components/sections/mockups/InventoryMockup";
import { SecurityMockup } from "@/components/sections/mockups/SecurityMockup";
import styles from "./ProductShowcase.module.css";

const TABS = [
  { key: "finops", label: "Control your spend", name: "FinOps", icon: Wallet, caption: "See, forecast and charge back every dollar across clouds.", href: "/modules/finops", render: () => <AppWindow active="FinOps"><FinOpsView /></AppWindow> },
  { key: "inventory", label: "Know your estate", name: "Inventory", icon: Boxes, caption: "A live, unified map of every resource and its dependencies.", href: "/modules/inventory", render: () => <InventoryMockup /> },
  { key: "security", label: "Strengthen your posture", name: "Security", icon: ShieldCheck, caption: "Continuous CSPM and compliance posture in one view.", href: "/solutions/security-compliance", render: () => <SecurityMockup /> },
] as const;

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = TABS[active];
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % TABS.length : event.key === "ArrowLeft" ? (index + TABS.length - 1) % TABS.length : event.key === "Home" ? 0 : event.key === "End" ? TABS.length - 1 : null;
    if (next === null) return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus();
  }
  return <div className={styles.showcase}>
    <div className={styles.tabs} role="tablist" aria-label="Explore the console by job">
      {TABS.map((tab, i) => <button key={tab.key} ref={(el) => { tabs.current[i] = el; }} id={`${id}-tab-${i}`} type="button" role="tab" aria-selected={active === i} aria-controls={`${id}-panel`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={(event) => onKeyDown(event, i)}>
        <span className={styles.tabNumber}>0{i + 1}</span><tab.icon size={18} /><span><strong>{tab.label}</strong><small>{tab.name}</small></span><ArrowUpRight className={styles.tabArrow} size={17} />
      </button>)}
    </div>
    <div className={styles.stage} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
      <div className={styles.stageHeader}><p><span aria-hidden />BLUEWHALE STACK / {current.name.toUpperCase()}</p><span>Illustrative interface · sample data</span></div>
      <div className={styles.screen} key={current.key}>{current.render()}</div>
      <div className={styles.stageFooter}><p>{current.caption}</p><Link href={current.href}>Explore {current.name} <ArrowUpRight size={15} /></Link></div>
    </div>
  </div>;
}