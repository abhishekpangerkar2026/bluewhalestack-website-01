import { cn } from "@/lib/utils";
import styles from "./LayerStack.module.css";

/**
 * The six-layer platform architecture as an animated isometric stack — the
 * "3D product architecture" from the Product Overview, drawn natively so it
 * stays crisp, on-brand and readable at any size. Read top-down, the way
 * value flows; a gold light travels the beam from segments to deployment.
 */
export const LAYERS = [
  { n: "01", name: "Industry segments", sub: "Enterprise · Datacenter · Telco · Government · SMB" },
  { n: "02", name: "Digital Experience Layer", sub: "White-label portals · catalog & marketplace · self-service · per-tenant metering · SLA" },
  { n: "03", name: "Unified Platform Core", sub: "Nine capability families · 54 capabilities · one console, one identity, one policy, one bill" },
  { n: "04", name: "Integrations", sub: "OSS/BSS · ServiceNow · Jira · billing & invoicing · identity & SSO · API" },
  { n: "05", name: "Every estate", sub: "Six public clouds · private & virtualization · hybrid & sovereign stacks · air-gapped · edge" },
  { n: "06", name: "Deployment modes", sub: "SaaS · BYOC · on-premise · sovereign air-gapped · edge" },
] as const;

const GAP = 60;

function Decor({ i }: { i: number }) {
  switch (i) {
    case 0:
      return (
        <div className={styles.chips} aria-hidden>
          {[72, 84, 58, 92, 50, 66, 78].map((w, k) => <i key={k} style={{ width: w }} />)}
        </div>
      );
    case 1:
      return <div className={styles.screen} aria-hidden><i /><i /><i /><i /></div>;
    case 2:
      return (
        <div className={styles.nodes} aria-hidden>
          {Array.from({ length: 9 }, (_, k) => <i key={k} style={{ ["--d" as string]: (k % 3) + Math.floor(k / 3) }} />)}
        </div>
      );
    case 3:
      return <div className={styles.rings} aria-hidden>{Array.from({ length: 6 }, (_, k) => <i key={k} />)}</div>;
    case 4:
      return <div className={styles.blocks} aria-hidden>{Array.from({ length: 6 }, (_, k) => <i key={k} />)}</div>;
    default:
      return (
        <div className={styles.pills} aria-hidden>
          {[64, 78, 96, 118, 74].map((w, k) => <i key={k} style={{ width: w }} />)}
        </div>
      );
  }
}

export function LayerStack({ className }: { className?: string }) {
  return (
    <div className={cn(styles.scene, className)} role="img" aria-label="The platform architecture as six stacked layers: industry segments, the Digital Experience Layer, the Unified Platform Core, integrations, every estate, and the deployment modes.">
      <div className={styles.stack}>
        {LAYERS.map((l, i) => (
          <div key={l.n} className={styles.slabPos} style={{ ["--z" as string]: (LAYERS.length - 1 - i) * GAP, ["--i" as string]: i }}>
            <div className={cn(styles.slab, i === 2 && styles.core)} style={{ ["--i" as string]: i }}>
              <Decor i={i} />
            </div>
            <div className={cn(styles.tag, i === 2 && styles.tagCore)}>
              <span>{l.n}</span>
              {l.name}
            </div>
          </div>
        ))}
        <div className={styles.beam} aria-hidden>
          <i style={{ ["--d" as string]: 0 }} />
          <i style={{ ["--d" as string]: 1 }} />
          <i style={{ ["--d" as string]: 2 }} />
        </div>
      </div>
    </div>
  );
}

/** The same six layers as a readable list — pairs with the stack on wide screens. */
export function LayerList({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <ol className={cn("divide-y", inverse ? "divide-white/10" : "divide-line", className)}>
      {LAYERS.map((l) => (
        <li key={l.n} className="flex gap-4 py-3.5">
          <span className={cn("num mt-0.5 w-7 shrink-0 text-[13px] font-extrabold", inverse ? "text-[var(--gold)]" : "text-gold-text")}>{l.n}</span>
          <div>
            <p className={cn("text-[15px] font-bold", inverse ? "text-white" : "text-ink")}>{l.name}</p>
            <p className={cn("mt-0.5 text-[13px] leading-relaxed", inverse ? "text-white/60" : "text-muted")}>{l.sub}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
