"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "user"; text: string };

const INTENTS: { keys: string[]; reply: string }[] = [
  {
    keys: ["price", "pricing", "cost", "edition"],
    reply:
      "We offer 5 editions — Community (free), Standard (from ~$24K/yr), Enterprise (from ~$120K/yr), Enterprise Plus, and Sovereign. See /pricing for the full comparison.",
  },
  {
    keys: ["finops", "saving", "spend", "chargeback"],
    reply:
      "The FinOps module gives you real-time cost visibility, rightsizing recommendations, and chargeback across all connected clouds. Explore /modules/finops.",
  },
  {
    keys: ["government", "sovereign", "air-gap", "compliance"],
    reply:
      "The Sovereign edition runs air-gapped with in-region AI and centralised governance — designed for regulated and government workloads. See /editions/sovereign.",
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
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-fg">
            <span className="text-sm font-semibold">
              BlueWhale Assistant
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm",
                  m.from === "bot"
                    ? "bg-sunken text-muted"
                    : "ml-auto bg-primary text-primary-fg",
                )}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 px-3 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-line px-2.5 py-1 text-xs text-muted hover:border-line-strong hover:text-accent"
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
            className="flex items-center gap-2 border-t border-line p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="h-9 flex-1 rounded-lg border border-line px-3 text-sm text-ink focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-fg hover:opacity-90"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-fg shadow-lg transition-transform hover:scale-105"
        aria-label="Open chat assistant"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </>
  );
}
