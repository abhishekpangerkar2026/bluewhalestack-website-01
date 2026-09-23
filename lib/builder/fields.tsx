/** Small helpers so block field definitions read like a form description. */
import type { Field } from "@puckeditor/core";
import { MediaPicker, type MediaValue } from "./fields/MediaField";

/** A Puck custom field: upload, pick from the library, or paste a link (the picker itself is a client component). */
export const mediaField = (label: string, kind: "image" | "video"): Field => ({
  type: "custom",
  label,
  render: ({ value, onChange }) => <MediaPicker value={value as MediaValue | undefined} onChange={(v) => onChange(v)} kind={kind} label={label} />,
});

export const text = (label: string, extra: Partial<Extract<Field, { type: "text" }>> = {}): Field => ({ type: "text", label, contentEditable: true, ...extra });
export const textarea = (label: string): Field => ({ type: "textarea", label, contentEditable: true });
export const richtext = (label: string): Field => ({ type: "richtext", label, contentEditable: true });
export const number = (label: string, extra: Partial<Extract<Field, { type: "number" }>> = {}): Field => ({ type: "number", label, ...extra });
export const select = (label: string, options: { label: string; value: string | number | boolean }[]): Field => ({ type: "select", label, options });
export const radio = (label: string, options: { label: string; value: string | number | boolean }[]): Field => ({ type: "radio", label, options });
export const bool = (label: string): Field => radio(label, [{ label: "Yes", value: true }, { label: "No", value: false }]);
/** A prop the block fills in itself (resolved data) — never shown in the panel. */
export const hidden = (): Field => ({ type: "custom", visible: false, render: () => <></> });
export const url = (label = "Link"): Field => ({ type: "text", label, placeholder: "/contact or https://…" });
export const icon = (label = "Icon"): Field => ({ type: "text", label, placeholder: "Lucide icon name, e.g. ShieldCheck, Cloud, Sparkles" });

export const link = (label: string): Field => ({ type: "object", label, objectFields: { label: text("Label"), href: url() } });
export const ctaPath = (label: string): Field => ({ type: "object", label, objectFields: { label: text("Label"), href: url(), note: text("Note under it (optional)") } });

export const image = (label = "Picture"): Field => mediaField(label, "image");
export const video = (label = "Video"): Field => mediaField(label, "video");

export const items = <T extends Record<string, unknown>>(label: string, arrayFields: Record<keyof T & string, Field>, defaultItemProps: T, summary: keyof T & string): Field =>
  ({ type: "array", label, arrayFields, defaultItemProps, getItemSummary: (item: T) => String(item[summary] ?? label) }) as Field;

export const headingFields = { eyebrow: text("Kicker (small gold label)"), title: text("Title"), description: textarea("Description") };

export type { MediaValue };

export const ALIGN = [{ label: "Left", value: "left" }, { label: "Center", value: "center" }];
export const WIDTH = [{ label: "Narrow", value: "narrow" }, { label: "Normal", value: "normal" }, { label: "Wide", value: "wide" }, { label: "Full width", value: "full" }];
export const COLUMNS = [{ label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }];
export const BACKGROUND = [
  { label: "White", value: "white" },
  { label: "Light grey", value: "sunken" },
  { label: "Light blue", value: "sky" },
  { label: "Navy", value: "dark" },
  { label: "Brand gradient", value: "gradient" },
  { label: "Deck (paper)", value: "deck" },
];
export const PADDING = [{ label: "None", value: "none" }, { label: "Small", value: "sm" }, { label: "Normal", value: "md" }, { label: "Large", value: "lg" }];
