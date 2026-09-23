/**
 * Turns typed fallback content into a Sanity document body using its spec:
 * array items get `_key` and `_type`, slugs become slug objects, unions keep
 * the `_type` the content already carries. Used by scripts/sanity/seed.ts.
 */
import type { AnyField, Fields, ObjSpec } from "./spec";

const keyed = (i: number) => `k${i}`;

/** Deterministic document id for a collection item (seed and site agree on it). */
export const collectionId = (type: string, key: string) => `${type}-${key.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`;

export function annotate(fields: Fields, value: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [name, field] of Object.entries(fields)) {
    const v = value[name];
    if (v === undefined || v === null) continue;
    out[name] = annotateField(field, v);
  }
  return out;
}

function annotateField(field: AnyField, v: unknown): unknown {
  switch (field.kind) {
    case "slug":
      return { _type: "slug", current: String(v) };
    case "object":
      return annotate(field.fields, v as Record<string, unknown>);
    case "array":
      return (v as Record<string, unknown>[]).map((item, i) => ({ _key: keyed(i), _type: field.of.name, ...annotate(field.of.fields, item) }));
    case "union":
      return (v as (Record<string, unknown> & { _type: string })[]).map((item, i) => {
        const member = (field.of as readonly ObjSpec[]).find((o) => o.name === item._type);
        if (!member) throw new Error(`annotate: unknown union member "${item._type}" (expected one of ${field.of.map((o) => o.name).join(", ")})`);
        return { _key: keyed(i), _type: member.name, ...annotate(member.fields, item) };
      });
    case "image":
      return undefined; // pictures are uploaded by editors, never seeded from page content
    case "strings":
      return [...(v as string[])];
    default:
      return v;
  }
}
