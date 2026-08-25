"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { editions } from "@/content/editions";
import { industries } from "@/content/industries";

// Option lists come straight from the canonical content so the form can never
// drift from the editions/industries the site actually sells.
const INDUSTRIES = [...industries.map((i) => i.name), "Other"];
const EDITIONS = [...editions.map((e) => e.name), "Not sure yet"];

const inputCls =
  "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-faint focus:border-[var(--border-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--bg-active)]";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function ContactForm({
  submitLabel = "Book a demo",
  intent = "demo",
  resource,
}: {
  submitLabel?: string;
  /** Which CTA sent the visitor here — forwarded to the sales inbox. */
  intent?: string;
  /** Resource slug when the visitor asked for a gated document. */
  resource?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.consent = fd.get("consent") ? "true" : "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setReference(json.reference);
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[var(--success-border)] bg-[var(--success-bg)] p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--success-fg)]" />
        <h3 className="mt-4 text-xl font-bold text-ink">
          Thanks — we&apos;ve got your request
        </h3>
        <p className="mt-2 text-sm text-muted">
          A solutions architect will reach out within one business day. Your
          reference is{" "}
          <span className="font-semibold text-ink">{reference}</span>.
        </p>
      </div>
    );
  }

  return (
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
      {/* routing context — tells the sales inbox which CTA this came from */}
      <input type="hidden" name="intent" value={intent} />
      {resource && <input type="hidden" name="resource" value={resource} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="firstName">First name *</label>
          <input id="firstName" name="firstName" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="lastName">Last name *</label>
          <input id="lastName" name="lastName" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Work email *</label>
          <input id="email" name="email" type="email" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="company">Company *</label>
          <input id="company" name="company" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="jobTitle">Job title</label>
          <input id="jobTitle" name="jobTitle" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="industry">Industry</label>
          <select id="industry" name="industry" className={inputCls} defaultValue="">
            <option value="" disabled>Select…</option>
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="edition">Edition of interest</label>
          <select id="edition" name="edition" className={inputCls} defaultValue="">
            <option value="" disabled>Select…</option>
            {EDITIONS.map((e) => <option key={e}>{e}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls} htmlFor="message">How can we help?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-[var(--border-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--bg-active)]"
        />
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-sm text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-line-strong accent-[var(--primary-bg)]"
        />
        <span>I agree to be contacted about BlueWhale Stack and accept the privacy policy. *</span>
      </label>

      {status === "error" && (
        <p className="mt-4 rounded-md bg-[var(--danger-bg)] px-3 py-2 text-sm text-[var(--danger-fg)]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 font-medium text-primary-fg transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
