"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageSquare, X, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "user"; text: string };

const INTENTS: { keys: string[]; reply: string }[] = [
  {
    keys: ["price", "pricing", "cost", "edition"],
    reply:
      "We offer 4 editions — Standard ($24K/yr), Enterprise ($120K/yr), Telco & Datacenter (contact sales), and Government (contact sales). See /pricing for the full comparison.",
  },
  {
    keys: ["finops", "saving", "spend", "chargeback"],
    reply:
      "Whalenomics — the FinOps family — gives you budgets, forecasts, chargeback and continuous optimization, with spend decomposed to workload, department or tenant across every connected estate. Explore /modules/finops.",
  },
  {
    keys: ["government", "sovereign", "air-gap", "compliance"],
    reply:
      "The Government edition runs air-gapped with in-region AI and centralised governance — designed for regulated and government workloads. See /editions/government.",
  },
  {
    keys: ["migration", "migrate"],
    reply:
      "The Migration Engine supports structured cloud migrations with runbooks and rollback across 6Rs. See /solutions/cloud-migration.",
  },
  {
    keys: ["demo", "contact", "sales", "talk"],
    reply: "Happy to help — book a demo at /contact and a solutions architect will reach out within one business day.",
  },
];

const SUGGESTIONS = ["Pricing & editions", "Book a demo", "Sovereign cloud"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I'm the BlueWhale assistant. Ask me about editions, modules, migration, or book a demo.",
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, open]);

  function close() { setOpen(false); toggleRef.current?.focus(); }

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const match = INTENTS.find((i) =>
      i.keys.some((k) => q.toLowerCase().includes(k)),
    );
    const reply =
      match?.reply ??
      "Great question — our team can help directly. Visit /contact or /docs and we'll point you to the right place.";
    setMessages((m) => [...m, { from: "user", text: q }, { from: "bot", text: reply }]);
    setInput("");
  }

  return (
    <>
      {open && (
        <div id="bluewhale-assistant" role="dialog" aria-labelledby="assistant-title" onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); close(); } }} className="fixed bottom-24 right-4 z-50 flex h-[29rem] max-h-[calc(100dvh-7rem)] w-[23rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-xl sm:right-6">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0a1530] px-5 py-4 text-white">
            <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10"><MessageSquare aria-hidden className="h-4 w-4 text-[#83d9ee]" /></span><div><p id="assistant-title" className="text-sm font-semibold">BlueWhale Assistant</p><p className="mt-0.5 text-[10px] text-slate-400">Find your next step</p></div></div>
            <button type="button" onClick={close} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10">
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>
          <div ref={messagesRef} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[90%] rounded-xl px-3.5 py-3 text-[13px] leading-relaxed",
                  m.from === "bot"
                    ? "bg-sunken text-muted"
                    : "ml-auto bg-primary text-primary-fg",
                )}
              >
                {m.from === "bot" ? m.text.split(/(\/[a-z0-9]+(?:[/-][a-z0-9]+)*)/gi).map((part, index) => part.startsWith("/") ? <Link key={index} href={part} onClick={close} className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">{part}</Link> : part) : m.text}
              </div>
            ))}
          </div>
          <div className="flex shrink-0 flex-wrap gap-1.5 px-4 pb-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-md border border-line px-2.5 py-1.5 text-[10px] font-medium text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-line bg-sunken/50 p-3"
          >
            <input
              ref={inputRef}
              aria-label="Your question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-faint focus:border-accent"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-fg hover:opacity-90 disabled:opacity-40"
              aria-label="Send"
            >
              <ArrowUp aria-hidden className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-40 inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/15 bg-[#0a1530] px-4 text-white shadow-lg transition-transform hover:-translate-y-0.5 motion-reduce:transform-none sm:right-6"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        aria-controls="bluewhale-assistant"
      >
        {open ? <X aria-hidden className="h-4 w-4" /> : <MessageSquare aria-hidden className="h-4 w-4" />}<span className="hidden text-xs font-medium sm:inline">Ask BlueWhale</span>
      </button>
    </>
  );
}
