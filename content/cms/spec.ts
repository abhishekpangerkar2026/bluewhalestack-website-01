/**
 * The content spec DSL — one plain-data description of every editable
 * document, shared by three consumers so they can never drift:
 *
 *  - studio/schemaTypes/fromSpec.ts compiles a spec into Sanity schema types;
 *  - content/cms/annotate.ts turns the typed fallback content into Sanity
 *    documents for the seed script (adds _type/_key, slugs);
 *  - lib/cms-page.ts builds the GROQ projection from it and types the getter
 *    result via `Infer<>`, so the fallback content in content/sections/*.ts is
 *    type-checked against the exact shape editors see in the Studio.
 *
 * No imports from `sanity` here: the Studio workspace and the Next app both
 * import this file.
 */
import type { CmsImage } from "../cmsTypes";

export interface FieldMeta {
  title: string;
  description?: string;
  /** Studio field group (declared on the document) */
  group?: string;
  /** typed as `?:` in the fallback content */
  optional?: boolean;
}
export interface StrField extends FieldMeta { kind: "string"; list?: readonly string[] }
export interface TextField extends FieldMeta { kind: "text"; rows?: number }
export interface SlugField extends FieldMeta { kind: "slug" }
export interface NumField extends FieldMeta { kind: "number" }
export interface BoolField extends FieldMeta { kind: "boolean" }
export interface UrlField extends FieldMeta { kind: "url" }
export interface StringsField extends FieldMeta { kind: "strings" }
export interface ImageField extends FieldMeta { kind: "image" }
export interface ObjField<F extends Fields = Fields> extends FieldMeta { kind: "object"; fields: F }
export interface ArrField<O extends ObjSpec = ObjSpec> extends FieldMeta { kind: "array"; of: O; max?: number }
export interface UnionField<O extends readonly ObjSpec[] = readonly ObjSpec[]> extends FieldMeta { kind: "union"; of: O }

export type AnyField =
  | StrField | TextField | SlugField | NumField | BoolField | UrlField | StringsField | ImageField
  | ObjField<Fields> | ArrField<ObjSpec> | UnionField<readonly ObjSpec[]>;
export type Fields = Record<string, AnyField>;

export interface Preview { title?: string; subtitle?: string; media?: string }

/** A named object type — required for anything that lives in an array. */
export interface ObjSpec<F extends Fields = Fields, N extends string = string> {
  name: N;
  title: string;
  fields: F;
  preview?: Preview;
}

export interface DocSpec<F extends Fields = Fields, N extends string = string> extends ObjSpec<F, N> {
  /** exactly one document, with `_id === name` */
  singleton?: boolean;
  groups?: { name: string; title: string; default?: boolean }[];
  /** the website page(s) the document appears on (Presentation tool) */
  locations?: { title: string; href: string }[];
  /** for collections: the field that identifies an item ("slug" or "key") */
  keyField?: string;
  /** for collections: route pattern of the detail page, e.g. "/docs/:slug" */
  detailRoute?: string;
}

// ── type inference ──────────────────────────────────────────────
type RequiredKeys<F extends Fields> = { [K in keyof F]: F[K] extends { optional: true } ? never : K }[keyof F];
type OptionalKeys<F extends Fields> = { [K in keyof F]: F[K] extends { optional: true } ? K : never }[keyof F];
type Simplify<T> = { [K in keyof T]: T[K] } & {};

export type Infer<F extends Fields> = Simplify<
  { [K in RequiredKeys<F>]: InferField<F[K]> } & { [K in OptionalKeys<F>]?: InferField<F[K]> }
>;

export type InferField<T> =
  T extends StrField | TextField | SlugField | UrlField ? string :
  T extends NumField ? number :
  T extends BoolField ? boolean :
  T extends StringsField ? string[] :
  T extends ImageField ? CmsImage | undefined :
  T extends ObjField<infer G> ? Infer<G> :
  T extends ArrField<infer O> ? (O extends ObjSpec<infer G> ? Infer<G>[] : never) :
  T extends UnionField<infer Os> ? InferUnion<Os>[] :
  never;

type InferUnion<Os extends readonly ObjSpec[]> = {
  [I in keyof Os]: Os[I] extends ObjSpec<infer G, infer N> ? Simplify<Infer<G> & { _type: N }> : never;
}[number];

export type InferDoc<D extends DocSpec> = D extends DocSpec<infer F> ? Infer<F> : never;

// ── builders ────────────────────────────────────────────────────
// NoInfer: an omitted options argument must not pick O up from the contextual
// return type (the AnyField union) — that widened array item types.
// Options never include `fields`/`of`: an omitted options argument must not
// widen the structural generics (F, S) through the constraint.
type Opts<T extends FieldMeta> = Partial<Omit<T, "kind" | "title" | "fields" | "of">>;

export const f = {
  str: <O extends Opts<StrField> = {}>(title: string, o?: O) => ({ kind: "string", title, ...(o as O) }) as StrField & NoInfer<O>,
  text: <O extends Opts<TextField> = {}>(title: string, o?: O) => ({ kind: "text", title, rows: 3, ...(o as O) }) as TextField & NoInfer<O>,
  slug: <O extends Opts<SlugField> = {}>(title: string, o?: O) => ({ kind: "slug", title, ...(o as O) }) as SlugField & NoInfer<O>,
  num: <O extends Opts<NumField> = {}>(title: string, o?: O) => ({ kind: "number", title, ...(o as O) }) as NumField & NoInfer<O>,
  bool: <O extends Opts<BoolField> = {}>(title: string, o?: O) => ({ kind: "boolean", title, ...(o as O) }) as BoolField & NoInfer<O>,
  url: <O extends Opts<UrlField> = {}>(title: string, o?: O) => ({ kind: "url", title, ...(o as O) }) as UrlField & NoInfer<O>,
  strings: <O extends Opts<StringsField> = {}>(title: string, o?: O) => ({ kind: "strings", title, ...(o as O) }) as StringsField & NoInfer<O>,
  image: <O extends Opts<ImageField> = {}>(title: string, o?: O) => ({ kind: "image", title, optional: true, ...(o as O) }) as ImageField & { optional: true } & NoInfer<O>,
  obj: <F extends Fields, O extends Opts<ObjField> = {}>(title: string, fields: F, o?: O) => ({ kind: "object", title, fields, ...(o as O) }) as ObjField<F> & NoInfer<O>,
  arr: <S extends ObjSpec, O extends Opts<ArrField> = {}>(title: string, of: S, o?: O) => ({ kind: "array", title, of, ...(o as O) }) as ArrField<S> & NoInfer<O>,
  union: <S extends readonly ObjSpec[], O extends Opts<UnionField> = {}>(title: string, of: S, o?: O) => ({ kind: "union", title, of, ...(o as O) }) as UnionField<S> & NoInfer<O>,
};

export function defineObject<F extends Fields, N extends string>(name: N, title: string, fields: F, preview?: Preview): ObjSpec<F, N> {
  return { name, title, fields, preview };
}

export function defineDoc<F extends Fields, N extends string>(
  name: N,
  title: string,
  fields: F,
  opts: Omit<DocSpec, "name" | "title" | "fields"> = {},
): DocSpec<F, N> {
  return { name, title, fields, ...opts };
}

/** Every named object reachable from a set of specs (deduplicated by name). */
export function collectObjects(specs: readonly ObjSpec[]): ObjSpec[] {
  const seen = new Map<string, ObjSpec>();
  const walk = (fields: Fields) => {
    for (const field of Object.values(fields)) {
      if (field.kind === "object") walk(field.fields);
      else if (field.kind === "array") add(field.of);
      else if (field.kind === "union") field.of.forEach(add);
    }
  };
  const add = (o: ObjSpec) => {
    if (seen.has(o.name)) return;
    seen.set(o.name, o);
    walk(o.fields);
  };
  for (const s of specs) walk(s.fields);
  return [...seen.values()];
}
