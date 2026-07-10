"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const INDUSTRIES = [
  "Government",
  "Telco & MSP",
  "BFSI",
  "Healthcare",
  "Manufacturing",
  "Energy & Utilities",
  "Media",
  "Enterprise SaaS",
  "Other",
];
const EDITIONS = [
  "Standard",
  "Enterprise",
  "Datacenter",
  "Government",
  "Telco & MSP",
  "Not sure yet",
];

const inputCls =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-700";

export function ContactForm({ submitLabel = "Book a demo" }: { submitLabel?: string }) {
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
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
        <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
          Thanks — we&apos;ve got your request
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          A solutions architect will reach out within one business day. Your
          reference is{" "}
          <span className="font-semibold text-slate-900">{reference}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
    >
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
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-sm text-slate-600">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
        <span>I agree to be contacted about BlueWhale Stack and accept the privacy policy. *</span>
      </label>

      {status === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 font-medium text-white shadow-brand transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
