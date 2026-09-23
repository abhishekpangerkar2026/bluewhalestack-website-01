import type { ComponentConfig, Slot } from "@puckeditor/core";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Quote as QuoteIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/components/sections/FAQ";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { CountUp } from "@/components/ui/CountUp";
import { cn } from "@/lib/utils";
import { ALIGN, BACKGROUND, COLUMNS, PADDING, WIDTH, bool, ctaPath, headingFields, icon, image, items, link, radio, richtext, select, text, textarea, url, video, type MediaValue } from "../fields";
import { Band, Rich, bgClass, isDark, padClass, str, widthClass, type Txt } from "./shared";

type Heading = { eyebrow?: Txt; title?: Txt; description?: Txt };
const HeadingRow = ({ h, inverse, align, right }: { h: Heading; inverse?: boolean; align?: string; right?: React.ReactNode }) =>
  h.title || h.eyebrow ? (
    <div className={cn("flex flex-col gap-6", right && "sm:flex-row sm:items-end sm:justify-between")}>
      <SectionHeading eyebrow={h.eyebrow || undefined} title={h.title ?? ""} description={h.description || undefined} inverse={inverse} align={align === "center" ? "center" : "left"} />
      {right}
    </div>
  ) : null;

// ── Hero ────────────────────────────────────────────────────────
export type HeroProps = {
  eyebrow: Txt; title: Txt; titleAccent: Txt; description: Txt; tone: "light" | "dark";
  image?: MediaValue; video?: MediaValue;
  primary: { label: string; href: string; note?: string }; secondary: { label: string; href: string; note?: string };
  stats: { value: string; label: string }[];
};
export const Hero: ComponentConfig<HeroProps> = {
  label: "Hero (photo + headline)",
  fields: {
    eyebrow: text("Kicker (small gold label)"),
    title: text("Headline"),
    titleAccent: text("Headline — highlighted part (blue / gold)"),
    description: textarea("Description"),
    tone: radio("Colour", [{ label: "Light", value: "light" }, { label: "Dark (brand gradient)", value: "dark" }]),
    image: image("Photograph"),
    video: video("Video (plays instead of the photograph)"),
    primary: ctaPath("Primary button"),
    secondary: ctaPath("Secondary button"),
    stats: items("Numbers strip under the hero", { value: text("Value"), label: text("Label") }, { value: "54", label: "Capabilities" }, "label"),
  },
  defaultProps: {
    eyebrow: "Kicker", title: "A headline that states the outcome,", titleAccent: "in one line.", description: "One or two sentences that say what this page is about and who it is for.",
    tone: "light", primary: { label: "Book a demo", href: "/contact?intent=demo", note: "" }, secondary: { label: "Learn more", href: "#more", note: "" }, stats: [],
  },
  render: ({ eyebrow, title, titleAccent, description, tone, image, video, primary, secondary, stats }) => {
    const dark = tone === "dark";
    const media = (mobile: boolean) =>
      video?.url ? (
        <video src={video.url} poster={image?.url} autoPlay muted loop playsInline aria-hidden className={cn("h-full w-full object-cover", mobile && "aspect-[3/2]")} />
      ) : image?.url ? (
        // eslint-disable-next-line @next/next/no-img-element -- editor-supplied picture
        <img src={image.url} alt={mobile ? image.alt ?? "" : ""} width={image.width} height={image.height} className={cn(mobile ? "aspect-[3/2] w-full object-cover" : "photo-drift h-full w-full object-cover", mobile && dark && "[mask-image:linear-gradient(to_bottom,transparent,black_25%)]")} />
      ) : null;
    return (
      <section className={cn("relative overflow-hidden", dark ? "bg-brand-gradient text-white sheen" : "border-b border-line bg-white")}>
        <div className="relative">
          {(image?.url || video?.url) && (
            <div aria-hidden className={cn("pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block", dark ? "[mask-image:linear-gradient(to_right,transparent_0%,black_30%)]" : "[mask-image:linear-gradient(to_right,transparent_0%,black_26%)]")}>
              {media(false)}
              {!dark && <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />}
            </div>
          )}
          <Container className="relative flex min-h-[520px] flex-col justify-center lg:min-h-[640px]">
            <div className="py-14 sm:py-20 lg:max-w-[46%]">
              {eyebrow && (
                <p className={cn("eyebrow mb-5 flex items-center gap-3", dark && "text-[var(--gold)]")}>
                  <span aria-hidden className="h-px w-8 bg-[var(--gold)]" />
                  {eyebrow}
                </p>
              )}
              <h1 className={cn("display-1", dark ? "text-white" : "text-ink")}>
                {title} {titleAccent && <span className={dark ? "text-[var(--gold)]" : "text-accent"}>{titleAccent}</span>}
              </h1>
              {description && <p className={cn("mt-6 max-w-xl text-lg leading-relaxed", dark ? "text-white/78" : "text-muted")}>{description}</p>}
              {(primary?.label || secondary?.label) && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {primary?.label && (
                    <div>
                      <Button href={primary.href || "#"} size="lg" variant={dark ? "white" : "primary"}>{primary.label}<ArrowRight className="h-4 w-4" /></Button>
                      {primary.note && <p className={cn("mt-2 text-xs", dark ? "text-white/50" : "text-faint")}>{primary.note}</p>}
                    </div>
                  )}
                  {secondary?.label && (
                    <Button href={secondary.href || "#"} size="lg" variant="outline" className={dark ? "border-white/30 text-white hover:border-white hover:bg-white/10 hover:text-white" : undefined}>{secondary.label}</Button>
                  )}
                </div>
              )}
            </div>
            {(image?.url || video?.url) && <figure className="-mx-5 mb-2 sm:-mx-10 lg:hidden">{media(true)}</figure>}
          </Container>
        </div>
        {stats?.length > 0 && (
          <div className={cn("border-t", dark ? "border-white/10 bg-black/10" : "border-line bg-sunken")}>
            <Container>
              <div className={cn("grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x", dark ? "sm:divide-white/10" : "sm:divide-line")}>
                {stats.map((s, i) => (
                  <div key={i} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                    <p className={cn("num text-3xl font-extrabold sm:text-4xl", dark ? "text-[var(--gold)]" : "text-accent")}>{typeof s.value === "string" ? <CountUp value={s.value} /> : s.value}</p>
                    <p className={cn("mt-1 text-sm leading-snug", dark ? "text-white/70" : "text-muted")}>{s.label}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        )}
      </section>
    );
  },
};

// ── Section (band with a drop zone) ─────────────────────────────
export type SectionProps = { background: string; padding: string; border: boolean; content: Slot };
export const Section: ComponentConfig<SectionProps> = {
  label: "Section (background band)",
  fields: {
    background: select("Background", BACKGROUND),
    padding: select("Vertical spacing", PADDING),
    border: bool("Hairline on top"),
    content: { type: "slot", label: "Contents" },
  },
  defaultProps: { background: "white", padding: "md", border: false, content: [] },
  render: ({ background, padding, border, content: Content }) => (
    <section className={cn("relative", bgClass(background), padClass(padding), border && (isDark(background) ? "border-t border-white/10" : "border-t border-line"))}>
      <Container><Content /></Container>
    </section>
  ),
};

// ── Columns ─────────────────────────────────────────────────────
export type ColumnsProps = { count: number; gap: string; a: Slot; b: Slot; c: Slot; d: Slot };
export const Columns: ComponentConfig<ColumnsProps> = {
  label: "Columns",
  fields: {
    count: select("Number of columns", COLUMNS),
    gap: select("Gap", [{ label: "Tight", value: "gap-4" }, { label: "Normal", value: "gap-8" }, { label: "Wide", value: "gap-12" }]),
    a: { type: "slot", label: "Column 1" }, b: { type: "slot", label: "Column 2" }, c: { type: "slot", label: "Column 3" }, d: { type: "slot", label: "Column 4" },
  },
  defaultProps: { count: 2, gap: "gap-8", a: [], b: [], c: [], d: [] },
  render: ({ count, gap, a: A, b: B, c: C, d: D }) => (
    <div className={cn("grid", gap, count >= 4 ? "md:grid-cols-2 lg:grid-cols-4" : count === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
      <A /><B />{count >= 3 && <C />}{count >= 4 && <D />}
    </div>
  ),
};

// ── Heading ─────────────────────────────────────────────────────
export type HeadingProps = Heading & { align: string; inverse: boolean };
export const HeadingBlock: ComponentConfig<HeadingProps> = {
  label: "Section heading",
  fields: { ...headingFields, align: radio("Align", ALIGN), inverse: bool("On a dark background") },
  defaultProps: { eyebrow: "Kicker", title: "A section title", description: "One sentence that says what the section shows.", align: "left", inverse: false },
  render: ({ align, inverse, ...h }) => <HeadingRow h={h} inverse={inverse} align={align} />,
};

// ── Text ────────────────────────────────────────────────────────
export type TextProps = { content: unknown; width: string; align: string };
export const TextBlock: ComponentConfig<TextProps> = {
  label: "Text",
  fields: { content: richtext("Text"), width: select("Width", WIDTH), align: radio("Align", ALIGN) },
  defaultProps: { content: "<p>Write here. Use the toolbar for headings, bold text, links and lists.</p>", width: "normal", align: "left" },
  render: ({ content, width, align }) => <Rich content={content} className={cn(widthClass(width), align === "center" && "mx-auto text-center")} />,
};

// ── Cards ───────────────────────────────────────────────────────
export type CardsProps = Heading & { style: string; columns: number; linkLabel: Txt; items: { icon: string; title: string; body: string; href: string }[] };
export const Cards: ComponentConfig<CardsProps> = {
  label: "Cards (icon + title + text)",
  fields: {
    ...headingFields,
    style: select("Card style", [{ label: "Icon cards", value: "icon" }, { label: "Numbered", value: "numbered" }, { label: "Plain grid", value: "plain" }]),
    columns: select("Columns", COLUMNS),
    linkLabel: text("Link label on cards that have a link"),
    items: items("Cards", { icon: icon(), title: text("Title"), body: textarea("Text"), href: url("Link (optional)") }, { icon: "Sparkles", title: "Card title", body: "A sentence or two.", href: "" }, "title"),
  },
  defaultProps: {
    eyebrow: "", title: "", description: "", style: "icon", columns: 3, linkLabel: "Learn more",
    items: [
      { icon: "Layers", title: "One inventory", body: "Every estate reports into one live map.", href: "" },
      { icon: "ShieldCheck", title: "One policy", body: "Written once, evaluated continuously.", href: "" },
      { icon: "Wallet", title: "One bill", body: "Spend resolves to a workload and an owner.", href: "" },
    ],
  },
  render: ({ style, columns, linkLabel, items: cards, ...h }) => (
    <div>
      <HeadingRow h={h} />
      <div className={cn("grid gap-5", h.title && "mt-12", columns >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
        {(cards ?? []).map((c, i) => {
          const body = (
            <Card interactive={Boolean(c.href)} className="flex h-full flex-col">
              {style === "icon" && (
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--bg-active)] text-accent"><Icon name={c.icon || "Sparkles"} className="h-5 w-5" /></span>
              )}
              {style === "numbered" && <span className="num text-sm font-bold text-faint">{String(i + 1).padStart(2, "0")}</span>}
              <h3 className="mt-4 text-lg font-bold text-ink">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.body}</p>
              {c.href && <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">{linkLabel} <ArrowRight className="h-3.5 w-3.5" /></span>}
            </Card>
          );
          return (
            <Reveal key={i} delay={(i % (columns || 3)) * 70}>
              {c.href ? <Link href={c.href} className="block h-full">{body}</Link> : body}
            </Reveal>
          );
        })}
      </div>
    </div>
  ),
};

// ── Checklist ───────────────────────────────────────────────────
export type ChecklistProps = Heading & { columns: number; items: { text: string }[] };
export const Checklist: ComponentConfig<ChecklistProps> = {
  label: "Checklist",
  fields: { ...headingFields, columns: select("Columns", [{ label: "1", value: 1 }, { label: "2", value: 2 }]), items: items("Items", { text: text("Text") }, { text: "A point worth ticking off" }, "text") },
  defaultProps: { eyebrow: "", title: "", description: "", columns: 1, items: [{ text: "Read-only credentials for one cloud account" }, { text: "Nothing installed on your side" }] },
  render: ({ columns, items: list, ...h }) => (
    <div>
      <HeadingRow h={h} />
      <ul className={cn("grid gap-3", h.title && "mt-10", columns === 2 && "sm:grid-cols-2")}>
        {(list ?? []).map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--bg-active)] text-accent"><Check className="h-3 w-3" /></span>
            <span className="text-sm leading-relaxed text-ink">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
};

// ── Stats ───────────────────────────────────────────────────────
export type StatsProps = { style: string; items: { value: string; label: string }[] };
export const Stats: ComponentConfig<StatsProps> = {
  label: "Numbers",
  fields: { style: select("Style", [{ label: "Strip", value: "strip" }, { label: "Cards", value: "cards" }, { label: "On dark", value: "dark" }]), items: items("Numbers", { value: text("Value"), label: text("Label") }, { value: "54", label: "Capabilities shipped" }, "label") },
  defaultProps: { style: "strip", items: [{ value: "54", label: "Capabilities" }, { value: "9", label: "Families" }, { value: "4", label: "Editions" }, { value: "6", label: "Platform classes" }] },
  render: ({ style, items: list }) => (
    <div className={cn("grid grid-cols-2 gap-6 lg:grid-cols-4", style === "strip" && "sm:divide-x sm:divide-line")}>
      {(list ?? []).map((s, i) => (
        <div key={i} className={cn(style === "cards" && "rounded-xl border border-line bg-surface p-6 shadow-sm", style === "strip" && "sm:px-6 sm:first:pl-0 sm:last:pr-0")}>
          <p className={cn("num text-3xl font-extrabold sm:text-4xl", style === "dark" ? "text-[var(--gold)]" : "text-accent")}>{typeof s.value === "string" ? <CountUp value={s.value} /> : s.value}</p>
          <p className={cn("mt-1 text-sm leading-snug", style === "dark" ? "text-white/70" : "text-muted")}>{s.label}</p>
        </div>
      ))}
    </div>
  ),
};

// ── FAQ ─────────────────────────────────────────────────────────
export type FaqProps = Heading & { tinted: boolean; items: { q: string; a: string }[] };
export const Faq: ComponentConfig<FaqProps> = {
  label: "FAQ",
  fields: { ...headingFields, tinted: bool("Grey background"), items: items("Questions", { q: text("Question"), a: textarea("Answer") }, { q: "A question buyers ask?", a: "The straight answer." }, "q") },
  defaultProps: { eyebrow: "Questions", title: "What buyers ask", description: "", tinted: true, items: [{ q: "What do you need from us to start?", a: "Read-only credentials for one cloud account." }] },
  render: ({ eyebrow, title, description, tinted, items: list }) => (
    <FAQ items={(list ?? []).map((i) => ({ q: i.q, a: i.a }))} eyebrow={eyebrow || undefined} title={title ?? ""} description={description || undefined} tinted={tinted} />
  ),
};

// ── Closing CTA ─────────────────────────────────────────────────
export type ClosingProps = { eyebrow: string; title: string; body: string; variant: "dark" | "light"; primary: { label: string; href: string; note?: string }; secondary: { label: string; href: string; note?: string }; tertiary: { label: string; href: string; note?: string } };
export const Closing: ComponentConfig<ClosingProps> = {
  label: "Closing call to action",
  fields: { eyebrow: text("Kicker"), title: text("Title"), body: textarea("Body"), variant: radio("Colour", [{ label: "Dark", value: "dark" }, { label: "Light", value: "light" }]), primary: ctaPath("Primary button"), secondary: ctaPath("Secondary link"), tertiary: ctaPath("Small link") },
  defaultProps: {
    eyebrow: "Next step", title: "See the platform on one of your own accounts.", body: "A 45-minute working session with a solutions engineer, on your real resources.", variant: "dark",
    primary: { label: "Book a working session", href: "/contact?intent=demo", note: "45 minutes · read-only credentials" }, secondary: { label: "", href: "", note: "" }, tertiary: { label: "", href: "", note: "" },
  },
  render: ({ eyebrow, title, body, variant, primary, secondary, tertiary }) => (
    <ClosingCTA eyebrow={eyebrow} title={title} body={body} variant={variant} primary={{ label: primary?.label, href: primary?.href || "#", note: primary?.note || undefined }}
      secondary={secondary?.label ? { label: secondary.label, href: secondary.href || "#", note: secondary.note || undefined } : undefined}
      tertiary={tertiary?.label ? { label: tertiary.label, href: tertiary.href || "#", note: tertiary.note || undefined } : undefined} />
  ),
};

// ── Buttons ─────────────────────────────────────────────────────
export type ButtonsProps = { align: string; items: { label: string; href: string; variant: string; external: boolean }[] };
export const Buttons: ComponentConfig<ButtonsProps> = {
  label: "Buttons",
  fields: {
    align: radio("Align", ALIGN),
    items: items("Buttons", {
      label: text("Label"), href: url(),
      variant: select("Style", [{ label: "Primary (blue)", value: "primary" }, { label: "Secondary", value: "secondary" }, { label: "Outline", value: "outline" }, { label: "White (on dark)", value: "white" }]),
      external: bool("Open in a new tab"),
    }, { label: "Book a demo", href: "/contact?intent=demo", variant: "primary", external: false }, "label"),
  },
  defaultProps: { align: "left", items: [{ label: "Book a demo", href: "/contact?intent=demo", variant: "primary", external: false }] },
  render: ({ align, items: list }) => (
    <div className={cn("flex flex-wrap gap-3", align === "center" && "justify-center")}>
      {(list ?? []).map((b, i) => (
        <Button key={i} href={b.href || "#"} size="lg" variant={(b.variant as "primary" | "secondary" | "outline" | "white") || "primary"} external={b.external}>{b.label}{b.external ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</Button>
      ))}
    </div>
  ),
};

// ── Image ───────────────────────────────────────────────────────
export type ImageProps = { image?: MediaValue; width: string; align: string; rounded: boolean; caption: Txt; href: string };
export const ImageBlock: ComponentConfig<ImageProps> = {
  label: "Picture",
  fields: { image: image(), width: select("Width", WIDTH), align: radio("Align", ALIGN), rounded: bool("Rounded corners and shadow"), caption: text("Caption (optional)"), href: url("Link (optional)") },
  defaultProps: { width: "normal", align: "left", rounded: true, caption: "", href: "" },
  render: ({ image: img, width, align, rounded, caption, href }) => {
    if (!img?.url) return <div className="grid h-40 place-items-center rounded-xl border border-dashed border-line-strong text-sm text-faint">Choose a picture in the panel on the right</div>;
    // eslint-disable-next-line @next/next/no-img-element -- editor-supplied picture
    const pic = <img src={img.url} alt={img.alt ?? ""} width={img.width} height={img.height} loading="lazy" className={cn("w-full", rounded && "rounded-2xl border border-line shadow-lg")} />;
    return (
      <figure className={cn(widthClass(width), align === "center" && "mx-auto")}>
        {href ? <Link href={href}>{pic}</Link> : pic}
        {caption && <figcaption className="mt-3 text-xs text-faint">{caption}</figcaption>}
      </figure>
    );
  },
};

// ── Video ───────────────────────────────────────────────────────
export type VideoProps = { video?: MediaValue; poster?: MediaValue; autoplay: boolean; loop: boolean; controls: boolean; width: string; align: string; caption: Txt };
export const VideoBlock: ComponentConfig<VideoProps> = {
  label: "Video",
  fields: { video: video(), poster: image("Poster frame (optional)"), autoplay: bool("Autoplay (muted)"), loop: bool("Loop"), controls: bool("Show player controls"), width: select("Width", WIDTH), align: radio("Align", ALIGN), caption: text("Caption (optional)") },
  defaultProps: { autoplay: true, loop: true, controls: false, width: "wide", align: "center", caption: "" },
  render: ({ video: v, poster, autoplay, loop, controls, width, align, caption }) => {
    if (!v?.url) return <div className="grid h-48 place-items-center rounded-xl border border-dashed border-line-strong text-sm text-faint">Upload or link a video in the panel on the right</div>;
    return (
      <figure className={cn(widthClass(width), align === "center" && "mx-auto")}>
        <video src={v.url} poster={poster?.url} autoPlay={autoplay} muted={autoplay || !controls} loop={loop} controls={controls} playsInline className="w-full rounded-2xl border border-line bg-black shadow-lg" />
        {caption && <figcaption className="mt-3 text-xs text-faint">{caption}</figcaption>}
      </figure>
    );
  },
};

// ── Embed (YouTube, Vimeo, maps…) ───────────────────────────────
export type EmbedProps = { url: string; ratio: string; title: string; width: string };
const embedSrc = (u: string) => {
  const yt = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return u;
};
export const Embed: ComponentConfig<EmbedProps> = {
  label: "Embed (YouTube / Vimeo / map)",
  fields: { url: { type: "text", label: "Link", placeholder: "https://www.youtube.com/watch?v=…" }, ratio: select("Shape", [{ label: "16:9", value: "16/9" }, { label: "4:3", value: "4/3" }, { label: "Square", value: "1/1" }]), title: text("Title (for accessibility)"), width: select("Width", WIDTH) },
  defaultProps: { url: "", ratio: "16/9", title: "Embedded video", width: "wide" },
  render: ({ url: u, ratio, title, width }) =>
    u ? (
      <div className={cn("mx-auto overflow-hidden rounded-2xl border border-line bg-black shadow-lg", widthClass(width))} style={{ aspectRatio: ratio }}>
        <iframe src={embedSrc(u)} title={str(title) || "Embedded content"} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
      </div>
    ) : (
      <div className="grid h-48 place-items-center rounded-xl border border-dashed border-line-strong text-sm text-faint">Paste a YouTube, Vimeo or map link in the panel on the right</div>
    ),
};

// ── Feature (picture beside text) ───────────────────────────────
export type FeatureProps = Heading & { content: unknown; image?: MediaValue; imageSide: string; bullets: { text: string }[]; button: { label: string; href: string } };
export const Feature: ComponentConfig<FeatureProps> = {
  label: "Picture beside text",
  fields: { ...headingFields, content: richtext("Text"), image: image(), imageSide: radio("Picture on the", [{ label: "Right", value: "right" }, { label: "Left", value: "left" }]), bullets: items("Bullet points", { text: text("Text") }, { text: "A benefit" }, "text"), button: link("Button (optional)") },
  defaultProps: { eyebrow: "", title: "A feature worth a picture", description: "", content: "", imageSide: "right", bullets: [], button: { label: "", href: "" } },
  render: ({ content, image: img, imageSide, bullets, button, ...h }) => (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cn(imageSide === "left" && "lg:order-2")}>
        <HeadingRow h={h} />
        {content ? <Rich content={content} className="mt-6" /> : null}
        {bullets?.length > 0 && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--bg-active)] text-accent"><Check className="h-3 w-3" /></span><span className="text-sm leading-relaxed text-ink">{b.text}</span></li>
            ))}
          </ul>
        )}
        {button?.label && <Button href={button.href || "#"} className="mt-8" size="lg">{button.label}<ArrowRight className="h-4 w-4" /></Button>}
      </div>
      <div className={cn(imageSide === "left" && "lg:order-1")}>
        {img?.url ? (
          // eslint-disable-next-line @next/next/no-img-element -- editor-supplied picture
          <img src={img.url} alt={img.alt ?? ""} width={img.width} height={img.height} loading="lazy" className="w-full rounded-2xl border border-line shadow-lg" />
        ) : (
          <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-line-strong text-sm text-faint">Choose a picture</div>
        )}
      </div>
    </div>
  ),
};

// ── Quote ───────────────────────────────────────────────────────
export type QuoteProps = { text: Txt; by: Txt };
export const QuoteBlock: ComponentConfig<QuoteProps> = {
  label: "Quote",
  fields: { text: textarea("Quote"), by: text("Who said it") },
  defaultProps: { text: "The platform paid for itself in the first audit cycle.", by: "Head of Infrastructure, a bank under two regulators" },
  render: ({ text: t, by }) => (
    <blockquote className="mx-auto max-w-3xl rounded-2xl border border-line bg-surface p-8 shadow-sm">
      <QuoteIcon className="h-6 w-6 text-[var(--gold)]" />
      <p className="mt-4 text-xl font-semibold leading-snug text-ink">{t}</p>
      {by && <footer className="mt-4 text-sm text-muted">— {by}</footer>}
    </blockquote>
  ),
};

// ── Table ───────────────────────────────────────────────────────
export type TableProps = { columns: { text: string }[]; rows: { cells: { text: string }[] }[]; note: Txt };
export const Table: ComponentConfig<TableProps> = {
  label: "Table",
  fields: {
    columns: items("Column headings", { text: text("Heading") }, { text: "Column" }, "text"),
    rows: { type: "array", label: "Rows", arrayFields: { cells: items("Cells (one per column)", { text: text("Cell") }, { text: "" }, "text") }, defaultItemProps: { cells: [{ text: "" }, { text: "" }] }, getItemSummary: (row: { cells: { text: string }[] }) => row.cells?.[0]?.text || "Row" },
    note: text("Note under the table (optional)"),
  },
  defaultProps: { columns: [{ text: "You run today" }, { text: "In BlueWhale Stack" }], rows: [{ cells: [{ text: "Cloud cost tool" }, { text: "Whalenomics" }] }], note: "" },
  render: ({ columns, rows, note }) => (
    <div>
      <div className="overflow-x-auto rounded-lg border border-line bg-surface shadow-sm">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead><tr className="bg-primary text-left text-primary-fg">{(columns ?? []).map((c, i) => <th key={i} className="px-5 py-3 font-semibold">{c.text}</th>)}</tr></thead>
          <tbody className="divide-y divide-line">
            {(rows ?? []).map((r, i) => (
              <tr key={i} className="align-top">{(r.cells ?? []).map((c, j) => <td key={j} className={cn("px-5 py-3.5 leading-relaxed", j === 0 ? "font-semibold text-ink" : "text-muted")}>{c.text}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-3 text-xs text-faint">{note}</p>}
    </div>
  ),
};

// ── Steps / timeline ────────────────────────────────────────────
export type StepsProps = Heading & { items: { when: string; title: string; body: string }[] };
export const Steps: ComponentConfig<StepsProps> = {
  label: "Steps / timeline",
  fields: { ...headingFields, items: items("Steps", { when: text("Timing / label"), title: text("Title"), body: textarea("Text") }, { when: "Week 1", title: "Step", body: "What happens." }, "title") },
  defaultProps: { eyebrow: "", title: "", description: "", items: [{ when: "Half day", title: "Discovery workshop", body: "Success criteria agreed with technology and finance." }, { when: "90 days", title: "Prototype", body: "On your own estate, no licence cost." }, { when: "Day 90", title: "Evidence review", body: "Scored on the agreed criteria." }] },
  render: ({ items: list, ...h }) => (
    <div>
      <HeadingRow h={h} />
      <ol className={cn("grid gap-8 md:grid-cols-2 lg:grid-cols-4", h.title && "mt-12")}>
        {(list ?? []).map((s, i) => (
          <li key={i} className="border-t-2 border-ink pt-5">
            <span className="num text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}{s.when ? ` · ${s.when}` : ""}</span>
            <h3 className="mt-2 text-lg font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  ),
};

// ── Chips ───────────────────────────────────────────────────────
export type ChipsProps = { label: Txt; items: { text: string }[] };
export const Chips: ComponentConfig<ChipsProps> = {
  label: "Chips (badges)",
  fields: { label: text("Label above (optional)"), items: items("Chips", { text: text("Text") }, { text: "ISO 27001:2022" }, "text") },
  defaultProps: { label: "Compliance frameworks", items: [{ text: "ISO 27001:2022" }, { text: "ISO 27017" }, { text: "ISO 27018" }, { text: "ISO 27701" }, { text: "ISO 22301" }] },
  render: ({ label, items: list }) => (
    <div>
      {label && <p className="eyebrow">{label}</p>}
      <div className="mt-4 flex flex-wrap gap-2">{(list ?? []).map((c, i) => <span key={i} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">{c.text}</span>)}</div>
    </div>
  ),
};

// ── Spacer / divider ────────────────────────────────────────────
export const Spacer: ComponentConfig<{ size: string }> = {
  label: "Space",
  fields: { size: select("Height", [{ label: "Small", value: "h-6" }, { label: "Medium", value: "h-12" }, { label: "Large", value: "h-24" }]) },
  defaultProps: { size: "h-12" },
  render: ({ size }) => <div className={size} aria-hidden />,
};
export const Divider: ComponentConfig<{ gold: boolean }> = {
  label: "Divider line",
  fields: { gold: bool("Short gold rule instead of a full line") },
  defaultProps: { gold: false },
  render: ({ gold }) => (gold ? <span className="gold-rule block" aria-hidden /> : <hr className="border-line" />),
};

/** Blocks that own their own outer band (heroes, FAQ, closing) versus blocks that sit inside a Section. */
export const basicBlocks = { Hero, Section, Columns, Heading: HeadingBlock, Text: TextBlock, Cards, Checklist, Stats, Faq, Closing, Buttons, Image: ImageBlock, Video: VideoBlock, Embed, Feature, Quote: QuoteBlock, Table, Steps, Chips, Spacer, Divider };
export { Band };
