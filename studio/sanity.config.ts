import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure, SINGLETONS } from "./structure";

/**
 * The editing screen for the BlueWhale Stack website. Hosted separately from
 * the site (https://<host>.sanity.studio); the site reads published content
 * through @sanity/client and falls back to its typed content files whenever
 * a document is missing, so the CMS can be filled in one page at a time.
 */
export default defineConfig({
  name: "bluewhale-stack",
  title: "BlueWhale Stack Website",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: "2025-09-01" })],
  schema: { types: schemaTypes },
  document: {
    // singletons are opened from the sidebar, never created twice
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global" ? prev.filter((t) => !SINGLETONS.has(t.templateId)) : prev,
    actions: (prev, { schemaType }) =>
      SINGLETONS.has(schemaType) ? prev.filter((a) => !["unpublish", "delete", "duplicate"].includes(a.action ?? "")) : prev,
  },
});
