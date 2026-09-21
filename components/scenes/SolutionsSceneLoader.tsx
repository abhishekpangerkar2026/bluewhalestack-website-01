import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductScene } from "./ProductScene";

const SOLUTIONS = [
  ["Inventory", "unified-cloud-inventory"],
  ["Provisioning", "ai-native-provisioning"],
  ["Observability", "bundled-observability"],
  ["Migration", "cloud-migration"],
  ["Security", "security-compliance"],
  ["Sovereign cloud", "sovereign-cloud"],
];

/** Native architecture diagram with direct, keyboard-accessible solution routes. */
export function SolutionsSceneLoader() {
  return (
    <div className="mx-auto w-full max-w-[720px]">
      <ProductScene scene="estate" />
      <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Explore platform solutions">
        {SOLUTIONS.map(([label, slug]) => <Link key={slug} href={`/solutions/${slug}`} className="inline-flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-3 py-3 text-xs font-medium text-ink transition-colors hover:border-line-strong hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{label}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /></Link>)}
      </nav>
    </div>
  );
}
