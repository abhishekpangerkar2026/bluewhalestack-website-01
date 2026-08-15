"use client";

import { useEffect, useState } from "react";
import { Check, Download, Loader2, Lock, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CertBadge } from "@/components/brand/CertBadge";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { certCategories, type Certification, type CertCategory } from "@/content/trust";

const CATEGORY_ORDER: CertCategory[] = [
  "information-security",
  "cloud-security",
  "privacy",
  "business-continuity",
  "compliance",
];

const UNLOCK_KEY = "bws_trust_unlocked";

const inputCls =
  "h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-[var(--bg-active)]";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

const statusTones: Record<string, string> = {
  success: "bg-[var(--success-bg)] text-[var(--success-fg)]",
  neutral: "bg-sunken text-muted",
  warning: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
};

function triggerDownload(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function CertificateVault({ certifications }: { certifications: Certification[] }) {
  const [unlocked, setUnlocked] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingCertId, setPendingCertId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
  }, []);

  const downloadableCerts = certifications.filter((c) => c.downloadable);

  function openGate(certId: string | null) {
    if (unlocked) {
      if (certId) triggerDownload(`/api/trust/certificate/${certId}`);
      return;
    }
    setPendingCertId(certId);
    setError("");
    setFormOpen(true);
  }

  function downloadAll() {
    downloadableCerts.forEach((c, i) =>
      setTimeout(() => triggerDownload(`/api/trust/certificate/${c.id}`), i * 350),
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.consent = fd.get("consent") ? "true" : "";
    payload.certId = pendingCertId ?? "";
    try {
      const res = await fetch("/api/trust/certificate-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setUnlocked(true);
      sessionStorage.setItem(UNLOCK_KEY, "1");
      setFormOpen(false);
      setSubmitting(false);
      if (pendingCertId) triggerDownload(`/api/trust/certificate/${pendingCertId}`);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    meta: certCategories[cat],
    items: certifications.filter((c) => c.category === cat),
  }));

  return (
    <div>
      {/* Gate banner */}
      {unlocked ? (
        <div className="mb-10 flex flex-col items-start gap-4 rounded-lg border border-[var(--success-border)] bg-[var(--success-bg)] p-5 text-[var(--success-fg)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Check className="h-5 w-5 shrink-0" />
            <p className="text-sm font-semibold">
              Unlocked — download any certificate below, or grab all {downloadableCerts.length} at once.
            </p>
          </div>
          <Button type="button" variant="white" size="sm" onClick={downloadAll}>
            <Download className="h-3.5 w-3.5" />
            Download all
          </Button>
        </div>
      ) : (
        <div className="mb-10 flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--bg-active)] text-accent">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Unlock certificate PDFs</p>
              <p className="text-sm text-muted">
                Share your details once to download all {downloadableCerts.length} signed certificates.
              </p>
            </div>
          </div>
          <Button type="button" size="md" onClick={() => openGate(null)}>
            Unlock downloads
          </Button>
        </div>
      )}

      <div className="space-y-16">
        {grouped.map(({ cat, meta, items }) =>
          items.length === 0 ? null : (
            <Reveal key={cat}>
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="text-lg font-bold text-ink">{meta.label}</h2>
                  <span className="h-px flex-1 bg-line" />
                  <Badge tone="neutral">{items.length}</Badge>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {items.map((cert, i) => (
                    <Reveal key={cert.id} delay={i * 70}>
                      <Card className="flex h-full flex-col">
                        <div className="flex items-start gap-4">
                          <div className="w-16 shrink-0">
                            <CertBadge certId={cert.id} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-bold text-ink">{cert.name}</h3>
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                  statusTones[cert.statusTone ?? "success"],
                                )}
                              >
                                <Check className="h-3 w-3" />
                                {cert.statusLabel ?? "Certified"}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-faint">{cert.fullName}</p>
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-muted">{cert.description}</p>

                        <dl className="mt-5 grid gap-3 border-t border-line pt-4 text-xs sm:grid-cols-2">
                          <div>
                            <dt className="font-semibold text-ink">Scope</dt>
                            <dd className="mt-1 text-muted">{cert.scope}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-ink">Audit cycle</dt>
                            <dd className="mt-1 text-muted">{cert.cycle}</dd>
                          </div>
                        </dl>

                        {cert.certNumber && (
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                            <p className="text-xs text-faint">
                              <span className="font-semibold text-muted">No. {cert.certNumber}</span>
                              {cert.validUntil && (
                                <>
                                  {" "}
                                  · {cert.validLabel ?? "Valid until"} {cert.validUntil}
                                </>
                              )}
                            </p>
                            {cert.downloadable && (
                              <button
                                type="button"
                                onClick={() => openGate(cert.id)}
                                className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                              >
                                {unlocked ? (
                                  <Download className="h-3.5 w-3.5" />
                                ) : (
                                  <Lock className="h-3.5 w-3.5" />
                                )}
                                Download PDF
                              </button>
                            )}
                          </div>
                        )}
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ),
        )}
      </div>

      {/* Gate form */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !submitting && setFormOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-lg sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-ink">Unlock certificate downloads</h3>
                <p className="mt-1 text-sm text-muted">
                  Tell us a bit about you — we&apos;ll also send a copy to your inbox.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Close"
                className="text-faint hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onSubmit}>
              {/* honeypot */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="tc-firstName">
                    First name *
                  </label>
                  <input id="tc-firstName" name="firstName" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="tc-lastName">
                    Last name *
                  </label>
                  <input id="tc-lastName" name="lastName" required className={inputCls} />
                </div>
              </div>
              <div className="mt-4">
                <label className={labelCls} htmlFor="tc-email">
                  Work email *
                </label>
                <input id="tc-email" name="email" type="email" required className={inputCls} />
              </div>
              <div className="mt-4">
                <label className={labelCls} htmlFor="tc-company">
                  Company *
                </label>
                <input id="tc-company" name="company" required className={inputCls} />
              </div>

              <label className="mt-4 flex items-start gap-2.5 text-xs text-muted">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-line text-accent focus:ring-accent"
                />
                <span>I agree to be contacted about BlueWhale Stack and accept the privacy policy. *</span>
              </label>

              {error && (
                <p className="mt-4 rounded-lg bg-[var(--warning-bg)] px-3 py-2 text-sm text-[var(--warning-fg)]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-fg transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Unlocking…" : "Unlock & download"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
