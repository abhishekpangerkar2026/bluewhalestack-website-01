import { Globe2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { Reveal } from "@/components/ui/Reveal";
import { globalRegions, globalStats, globalIntro } from "@/content/global";
import styles from "./EditorialSections.module.css";

/** A regional directory: no client-side canvas or continuous rendering. */
export function GlobalInfra() {
  return (
    <section id="global-infrastructure" className={`${styles.global} py-20 sm:py-28`}>
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <Reveal>
            <SectionHeading inverse eyebrow={globalIntro.eyebrow} title={globalIntro.title} description={globalIntro.description} />
            <div aria-hidden className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
              <Globe2 className="h-5 w-5 text-[#e6c06a]" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.12em] text-slate-400">
                {globalRegions.map((region, index) => <span key={region.code} className="inline-flex items-center gap-4">{region.code}{index < globalRegions.length - 1 && <span className="h-px w-5 bg-white/20" />}</span>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mb-2 flex justify-between pl-7 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400"><span>Region directory</span><span>{String(globalRegions.length).padStart(2, "0")} locations</span></div>
            <ol className={styles.regionList}>
              {globalRegions.map((region) => (
                <li key={region.code} className={styles.region}>
                  <span className="pt-1 font-mono text-base font-medium tracking-tight text-[#e6c06a]">{region.code}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.03em] text-white">{region.city}</h3>
                    <p className="mt-1 text-xs text-slate-400">{region.country} <span className="mx-1 text-white/20">/</span> {region.serves}</p>
                    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-300">{region.compliance.map((item) => <span key={item}>{item}</span>)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/15 pt-9 sm:mt-20 lg:grid-cols-4">
          {globalStats.map((stat) => <Stat key={stat.label} value={stat.value} label={stat.label} inverse />)}
        </div>
      </Container>
    </section>
  );
}
