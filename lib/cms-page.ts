/**
 * Page-document getters built on the content spec (content/cms/spec.ts):
 * the GROQ projection is generated from the spec, the CMS row is merged over
 * the typed fallback (so a field an editor has not filled in, or a document
 * that has not been seeded yet, renders exactly what the code renders today),
 * and image fields become CmsImage values with click-to-edit pointers.
 */
import type { AnyField, DocSpec, Fields, InferDoc, ObjSpec } from "@/content/cms/spec";
import { cmsFetch, imageProjection, ref, toCmsImage } from "@/lib/cms";
export { collectionId } from "@/content/cms/annotate";

export type WithCms<T> = T & { cmsId?: string };

// ── projection ──────────────────────────────────────────────────
export function projection(fields: Fields): string {
  const parts: string[] = [];
  for (const [name, field] of Object.entries(fields)) {
    switch (field.kind) {
      case "slug": parts.push(`"${name}": ${name}.current`); break;
      case "image": parts.push(imageProjection(name)); break;
      case "object": parts.push(`${name}{${projection(field.fields)}}`); break;
      case "array": parts.push(`${name}[]{_key, ${projection(field.of.fields)}}`); break;
      case "union": {
        const members = (field.of as readonly ObjSpec[]).map((o) => `_type == "${o.name}" => {${projection(o.fields)}}`);
        parts.push(`${name}[]{_key, _type, ${members.join(", ")}}`);
        break;
      }
      default: parts.push(name);
    }
  }
  return parts.join(", ");
}

// ── merge ───────────────────────────────────────────────────────
type Rec = Record<string, unknown>;
const isObj = (v: unknown): v is Rec => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * CMS value over fallback value, recursively. `null`/`undefined` in the CMS
 * means "not filled in" → fallback; an empty string or empty array is kept
 * (what the editor sees is what renders). Array items are merged with the
 * fallback item at the same position so a field missing from an older
 * document (say, an icon added to the schema later) still has a value.
 */
export function mergeContent<T>(fallback: T, cms: unknown): T {
  if (cms === null || cms === undefined) return fallback;
  if (Array.isArray(fallback)) {
    if (!Array.isArray(cms)) return fallback;
    return cms.map((item, i) => {
      const fb = (fallback as unknown[])[i] ?? (fallback as unknown[])[0];
      if (isObj(item) && isObj(fb) && item._type && fb._type && item._type !== fb._type) return item;
      return fb === undefined ? item : mergeContent(fb, item);
    }) as T;
  }
  if (isObj(fallback)) {
    if (!isObj(cms)) return fallback;
    const out: Rec = { ...fallback };
    for (const [k, v] of Object.entries(cms)) {
      if (k === "_id" || k === "_rev" || k === "_createdAt" || k === "_updatedAt") continue;
      out[k] = k in fallback ? mergeContent((fallback as Rec)[k], v) : v;
    }
    return out as T;
  }
  if (typeof fallback === "number") {
    if (typeof cms === "number") return cms as T;
    if (typeof cms === "string" && cms.trim() !== "" && !Number.isNaN(Number(cms))) return Number(cms) as T;
    return fallback;
  }
  if (typeof fallback === "boolean") return (typeof cms === "boolean" ? cms : fallback) as T;
  if (typeof fallback === "string") return (typeof cms === "string" ? cms : fallback) as T;
  return (cms as T) ?? fallback;
}

// ── images → CmsImage with edit pointers ────────────────────────
function hydrate(fields: Fields, value: Rec, docId: string, docType: string, path: string): Rec {
  const out: Rec = { ...value };
  for (const [name, field] of Object.entries(fields)) {
    const v = value[name];
    if (v === undefined || v === null) continue;
    out[name] = hydrateField(field, v, docId, docType, path ? `${path}.${name}` : name);
  }
  return out;
}
function hydrateField(field: AnyField, v: unknown, docId: string, docType: string, path: string): unknown {
  switch (field.kind) {
    case "image": {
      if (typeof v !== "object") return undefined;
      return toCmsImage(v as Parameters<typeof toCmsImage>[0], ref(docId, docType, path));
    }
    case "object":
      return isObj(v) ? hydrate(field.fields, v, docId, docType, path) : v;
    case "array":
      return Array.isArray(v)
        ? v.map((item, i) => (isObj(item) ? hydrate(field.of.fields, item, docId, docType, item._key ? `${path}[_key=="${item._key}"]` : `${path}[${i}]`) : item))
        : v;
    case "union":
      return Array.isArray(v)
        ? v.map((item, i) => {
            if (!isObj(item)) return item;
            const member = (field.of as readonly ObjSpec[]).find((o) => o.name === item._type);
            return member ? hydrate(member.fields, item, docId, docType, item._key ? `${path}[_key=="${item._key}"]` : `${path}[${i}]`) : item;
          })
        : v;
    default:
      return v;
  }
}

// ── getters ─────────────────────────────────────────────────────
/** A singleton page document (`_id === spec.name`), merged over its typed fallback. */
export async function getPageDoc<D extends DocSpec>(spec: D, fallback: InferDoc<D>): Promise<WithCms<InferDoc<D>>> {
  const row = await cmsFetch<Rec | null>(
    `*[_type == $type && _id == $id][0]{ ${projection(spec.fields)} }`,
    { type: spec.name, id: spec.name },
    [spec.name],
  );
  if (!row) return fallback;
  const merged = mergeContent(fallback as Rec, row);
  return { ...(hydrate(spec.fields, merged, spec.name, spec.name, "") as InferDoc<D>), cmsId: spec.name };
}

/**
 * A collection (certifications, jobs, legal pages…). Rows come back in
 * `order`; each is merged over the fallback item with the same key. When the
 * CMS is off, unreachable, or the collection has not been seeded yet, the
 * fallback list renders.
 */
export async function getCollection<D extends DocSpec>(
  spec: D,
  fallback: InferDoc<D>[],
  keyOf: (item: InferDoc<D>) => string,
): Promise<WithCms<InferDoc<D>>[]> {
  const rows = await cmsFetch<(Rec & { _id: string })[] | null>(
    `*[_type == $type] | order(order asc, _createdAt asc){ _id, ${projection(spec.fields)} }`,
    { type: spec.name },
    [spec.name],
  );
  if (!rows || rows.length === 0) return fallback;
  return rows.map((row) => {
    const fb = fallback.find((item) => keyOf(item) === keyOf(row as unknown as InferDoc<D>));
    const merged = fb ? mergeContent(fb as Rec, row) : row;
    return { ...(hydrate(spec.fields, merged, row._id, spec.name, "") as InferDoc<D>), cmsId: row._id };
  });
}

