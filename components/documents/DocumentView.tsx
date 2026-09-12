import { cn } from "@/lib/utils";
import type { DocSection, DocumentDef } from "@/content/documents";

/**
 * Renders a document's sections — shared by the reading page (/resources/[slug])
 * and the print layout (/print/[slug]). `print` tightens spacing and keeps
 * blocks together across page breaks.
 */
export function sectionId(i: number) {
  return `s-${i + 1}`;
}

export function sectionHeading(s: DocSection): string | undefined {
  if ("heading" in s) return s.heading;
  if (s.kind === "callout") return s.title;
  return undefined;
}

export function DocumentView({ doc, print = false }: { doc: DocumentDef; print?: boolean }) {
  const h2 = cn("font-bold tracking-tight text-ink", print ? "mt-7 text-[15pt] leading-tight" : "mt-12 text-2xl");
  const p = cn("leading-relaxed text-muted", print ? "text-[10.5pt]" : "text-base");
  const avoid = print ? "break-inside-avoid" : "";

  return (
    <div className={cn("doc", print && "doc-print")}>
      {doc.sections.map((s, i) => {
        const id = sectionId(i);
        switch (s.kind) {
          case "lead":
            return (
              <p key={id} id={id} className={cn("font-medium leading-relaxed text-ink", print ? "text-[12pt]" : "text-xl")}>
                {s.text}
              </p>
            );
          case "paragraphs":
            return (
              <section key={id} id={id} className={avoid}>
                {s.heading && <h2 className={h2}>{s.heading}</h2>}
                {s.text.map((t, k) => (
                  <p key={k} className={cn(p, "mt-3")}>{t}</p>
                ))}
              </section>
            );
          case "bullets":
            return (
              <section key={id} id={id} className={avoid}>
                {s.heading && <h2 className={h2}>{s.heading}</h2>}
                <ul className={cn("mt-3 space-y-1.5", p)}>
                  {s.items.map((it, k) => (
                    <li key={k} className="flex gap-3">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          case "facts":
            return (
              <section key={id} id={id} className={avoid}>
                {s.heading && <h2 className={h2}>{s.heading}</h2>}
                <dl className={cn("mt-4 grid gap-px overflow-hidden rounded-lg border border-line bg-line", s.items.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3")}>
                  {s.items.map((f, k) => (
                    <div key={k} className={cn("bg-surface", print ? "px-3 py-2.5" : "px-4 py-4")}>
                      <dt className={cn("font-bold text-ink", print ? "text-[12pt]" : "text-lg")}>{f.value}</dt>
                      <dd className={cn("mt-0.5 leading-snug text-muted", print ? "text-[9pt]" : "text-sm")}>{f.label}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          case "table":
            return (
              <section key={id} id={id}>
                {s.heading && <h2 className={h2}>{s.heading}</h2>}
                <div className={cn("mt-4 overflow-x-auto rounded-lg border border-line", !print && "shadow-sm")}>
                  <table className={cn("w-full border-collapse text-left", print ? "text-[9.5pt]" : "text-sm")}>
                    <thead>
                      <tr className="bg-primary text-primary-fg">
                        {s.columns.map((c) => (
                          <th key={c} className={cn("font-semibold", print ? "px-3 py-1.5" : "px-4 py-2.5")}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {s.rows.map((r, k) => (
                        <tr key={k} className={cn("align-top", print && "break-inside-avoid")}>
                          {r.map((cell, j) => (
                            <td key={j} className={cn(print ? "px-3 py-1.5" : "px-4 py-2.5", j === 0 ? "font-semibold text-ink" : "text-muted")}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {s.note && <p className={cn("mt-2 text-faint", print ? "text-[8.5pt]" : "text-xs")}>{s.note}</p>}
              </section>
            );
          case "steps":
            return (
              <section key={id} id={id}>
                {s.heading && <h2 className={h2}>{s.heading}</h2>}
                <ol className="mt-4 space-y-3">
                  {s.items.map((it, k) => (
                    <li key={k} className={cn("flex gap-4", avoid)}>
                      <span className={cn("grid shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-fg", print ? "h-6 w-6 text-[9pt]" : "h-8 w-8 text-sm")}>{k + 1}</span>
                      <div>
                        <p className={cn("font-bold text-ink", print ? "text-[10.5pt]" : "text-base")}>{it.title}</p>
                        <p className={cn(p, "mt-0.5")}>{it.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "cards":
            return (
              <section key={id} id={id}>
                {s.heading && <h2 className={h2}>{s.heading}</h2>}
                <div className={cn("mt-4 grid gap-px overflow-hidden rounded-lg border border-line bg-line", print ? "grid-cols-2" : "sm:grid-cols-2")}>
                  {s.items.map((it, k) => (
                    <div key={k} className={cn("bg-surface", print ? "break-inside-avoid px-3 py-2.5" : "p-5")}>
                      <p className={cn("font-bold text-ink", print ? "text-[10.5pt]" : "text-base")}>{it.title}</p>
                      <p className={cn(p, "mt-1", print ? "text-[9.5pt]" : "text-sm")}>{it.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          case "faq":
            return (
              <section key={id} id={id}>
                {s.heading && <h2 className={h2}>{s.heading}</h2>}
                <div className="mt-3 divide-y divide-line">
                  {s.items.map((f, k) => (
                    <div key={k} className={cn("flex gap-4", print ? "break-inside-avoid py-2.5" : "py-4")}>
                      <span className={cn("num font-bold text-accent/60", print ? "text-[10pt]" : "text-base")}>{String(k + 1).padStart(2, "0")}</span>
                      <div>
                        <p className={cn("font-bold text-ink", print ? "text-[10.5pt]" : "text-base")}>{f.q}</p>
                        <p className={cn(p, "mt-1")}>{f.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          case "callout":
            return (
              <aside key={id} id={id} className={cn("rounded-lg border-l-4 border-amber-400 bg-sunken", print ? "mt-6 break-inside-avoid px-4 py-3" : "mt-8 p-5")}>
                <p className={cn("font-bold text-ink", print ? "text-[10.5pt]" : "text-base")}>{s.title}</p>
                <p className={cn(p, "mt-1")}>{s.body}</p>
              </aside>
            );
          case "quote":
            return (
              <figure key={id} id={id} className={cn("border-l-2 border-line-strong pl-4", print ? "mt-5 break-inside-avoid" : "mt-8")}>
                <blockquote className={cn("italic leading-relaxed text-ink", print ? "text-[11pt]" : "text-lg")}>&ldquo;{s.text}&rdquo;</blockquote>
                <figcaption className={cn("mt-1 text-muted", print ? "text-[9pt]" : "text-sm")}>{s.by}</figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
}
