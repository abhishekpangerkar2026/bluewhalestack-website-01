import { defineField, defineType, type FieldDefinition } from "sanity";
import type { AnyField, DocSpec, Fields, ObjSpec, Preview } from "../../content/cms/spec";

/**
 * Compiles the shared content spec (content/cms/spec.ts) into Sanity schema
 * types. The same spec drives the seed script and the site's typed getters,
 * so a field added here is automatically seeded, fetched and typed.
 */
export function compileFields(fields: Fields): FieldDefinition[] {
  return Object.entries(fields).map(([name, field]) => compileField(name, field));
}

function compileField(name: string, field: AnyField): FieldDefinition {
  const base = { name, title: field.title, description: field.description, group: field.group };
  switch (field.kind) {
    case "string":
      return defineField({ ...base, type: "string", options: field.list ? { list: [...field.list] } : undefined });
    case "text":
      return defineField({ ...base, type: "text", rows: field.rows ?? 3 });
    case "slug":
      return defineField({ ...base, type: "slug", options: { maxLength: 80 }, validation: (r) => r.required() });
    case "number":
      return defineField({ ...base, type: "number" });
    case "boolean":
      return defineField({ ...base, type: "boolean" });
    case "url":
      return defineField({ ...base, type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }) });
    case "strings":
      return defineField({ ...base, type: "array", of: [{ type: "string" }] });
    case "image":
      return defineField({
        ...base,
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", title: "Alt text (describe the picture)", type: "string" })],
      });
    case "object":
      return defineField({ ...base, type: "object", fields: compileFields(field.fields), options: { collapsible: true, collapsed: false } });
    case "array":
      return defineField({ ...base, type: "array", of: [{ type: field.of.name }], validation: field.max ? (r) => r.max(field.max!) : undefined });
    case "union":
      return defineField({ ...base, type: "array", of: field.of.map((o) => ({ type: o.name })) });
  }
}

const preview = (p?: Preview) => (p ? { select: { title: p.title ?? "", subtitle: p.subtitle ?? "", media: p.media ?? "" } } : undefined);

export function compileObject(spec: ObjSpec) {
  return defineType({ name: spec.name, title: spec.title, type: "object", fields: compileFields(spec.fields), preview: preview(spec.preview) });
}

export function compileDoc(spec: DocSpec) {
  const fields = compileFields(spec.fields);
  if (!spec.singleton && !("order" in spec.fields)) {
    fields.push(defineField({ name: "order", title: "Sort order", type: "number", description: "Lower numbers first" }));
  }
  return defineType({
    name: spec.name,
    title: spec.title,
    type: "document",
    groups: spec.groups,
    fields,
    preview: spec.singleton ? { prepare: () => ({ title: spec.title }) } : preview(spec.preview),
  });
}
