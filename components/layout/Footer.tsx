import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { footerNav, company, compliance } from "@/content/company";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--brand-ink)] text-white/70">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <Logo inverse />
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Every cloud, one control plane — unified inventory, AI-native
              provisioning, observability, migration, and governance across
              public cloud, on-prem, and hybrid.
            </p>
            <NewsletterForm />
          </div>

          {/* Link columns */}
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance row */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-8">
          {compliance.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. BlueWhale Stack is a
            registered trademark. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/legal/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-white">
              Terms
            </Link>
            <a href={company.social.linkedin} className="hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
