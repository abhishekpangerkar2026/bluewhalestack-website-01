import Link from "next/link";
import { ArrowUpRight, Globe2, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { footerNav, company, compliance } from "@/content/company";

export function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden border-t border-white/10 bg-[#0a1530] text-white/70">
      <div className="container-x relative pt-14 sm:pt-20">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:pb-16 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <div>
            <Logo inverse className="h-11 sm:h-12" />
            <p className="mt-7 max-w-md font-display text-2xl font-medium leading-snug tracking-[-0.035em] text-white sm:text-3xl">Every cloud. One control plane.</p>
            <p className="mt-4 max-w-md text-sm leading-[1.8] text-slate-400">Unified inventory, AI-native provisioning, observability, migration, and governance across public cloud, on-prem, and hybrid.</p>
            <a href={company.social.linkedin} className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-white/80 transition-colors hover:text-white">Follow our progress on LinkedIn <ArrowUpRight aria-hidden className="h-3.5 w-3.5" /></a>
          </div>
          <div className="max-w-md lg:ml-auto lg:w-full">
            <div className="flex items-center gap-2.5"><Globe2 aria-hidden className="h-4 w-4 text-[#83d9ee]" /><span className="eyebrow text-slate-400">Connected thinking</span></div>
            <p className="mt-4 font-display text-xl font-medium tracking-tight text-white">A clearer view of the cloud.</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Platform updates and ideas for the teams running modern infrastructure.</p>
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:py-14 lg:grid-cols-4 lg:gap-14">
          {footerNav.map((column) => (
            <div key={column.heading}>
              <h2 className="text-xs font-semibold tracking-wide text-white">{column.heading}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => <li key={link.href}><Link href={link.href} className="text-[13px] leading-relaxed text-slate-400 transition-colors hover:text-white">{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-5 border-y border-white/10 py-6 sm:flex-row sm:items-start sm:gap-10">
          <Link href="/trust" className="inline-flex shrink-0 items-center gap-2 text-xs font-medium text-white/85"><ShieldCheck aria-hidden className="h-4 w-4 text-[#83d9ee]" />Trust, by design <ArrowUpRight aria-hidden className="h-3 w-3" /></Link>
          <div className="flex flex-wrap gap-x-5 gap-y-2">{compliance.map((item) => <span key={item} className="text-[10px] font-medium tracking-wide text-slate-400">{item}</span>)}</div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[11px] leading-relaxed text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl">© {new Date().getFullYear()} {company.name}. BlueWhale Stack is a registered trademark. All rights reserved.</p>
          <div className="flex shrink-0 gap-6"><Link href="/legal/privacy" className="hover:text-white">Privacy policy</Link><Link href="/legal/terms" className="hover:text-white">Terms of service</Link></div>
        </div>
      </div>
    </footer>
  );
}
