import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { builtMetadata, builtPage } from "@/lib/builder/render";

/** Pages created in the website builder that have no coded route of their own. */
export const dynamicParams = true;

const pathOf = async (params: Promise<{ slug: string[] }>) => "/" + (await params).slug.map((s) => decodeURIComponent(s)).join("/");

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  return (await builtMetadata(await pathOf(params))) ?? {};
}

export default async function BuiltRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const built = await builtPage(await pathOf(params));
  if (!built) notFound();
  return built;
}
