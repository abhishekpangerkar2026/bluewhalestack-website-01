import "server-only";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { Render } from "@puckeditor/core/rsc";
import { resolveAllData, type Data } from "@puckeditor/core";
import { getStore } from "./store";
import { config } from "./config";

/** The published composition for a path, cached until the builder publishes again. */
export async function getPublishedPage(path: string): Promise<Data | null> {
  const load = unstable_cache(
    async () => {
      try {
        const page = await getStore().getPage(path);
        return page?.published ?? null;
      } catch (error) {
        console.error("[builder] reading the published page failed", error);
        return null;
      }
    },
    ["builder-page", path],
    { tags: ["builder", `builder:${path}`], revalidate: 3600 },
  );
  return load();
}

/** Renders a builder composition with every data block resolved (catalog, settings…). */
export async function RenderPage({ data }: { data: Data }) {
  const resolved = await resolveAllData(data, config);
  return <Render config={config} data={resolved} />;
}

/**
 * Drop-in for existing pages: `const built = await builtPage("/about"); if (built) return built;`
 * — once the team has published a builder version of a route, it replaces the coded page.
 */
export async function builtPage(path: string) {
  const data = await getPublishedPage(path);
  return data ? <RenderPage data={data} /> : null;
}

export async function builtMetadata(path: string): Promise<Metadata | null> {
  const data = await getPublishedPage(path);
  if (!data) return null;
  const props = (data.root?.props ?? {}) as { title?: string; description?: string; noindex?: boolean };
  return {
    title: props.title || undefined,
    description: props.description || undefined,
    robots: props.noindex ? { index: false, follow: false } : undefined,
  };
}
