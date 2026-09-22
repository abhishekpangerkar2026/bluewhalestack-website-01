import type { ComponentProps } from "react";
import { PhotoHero } from "./PhotoHero";
import { getPageHero } from "@/lib/content";

type Props = ComponentProps<typeof PhotoHero> & {
  /** the page path the editor's "Page hero" document is keyed by, e.g. "/platform" */
  route: string;
};

/**
 * PhotoHero with the CMS on top: whatever an editor has filled in for this
 * route (headline, description, photograph, video) overrides the props; the
 * props remain the fallback, so the page renders identically until then.
 */
export async function CmsPhotoHero({ route, ...props }: Props) {
  const cms = await getPageHero(route);
  if (!cms) return <PhotoHero {...props} />;
  const title = cms.title
    ? cms.titleAccent
      ? <>{cms.title} <span className="text-accent">{cms.titleAccent}</span></>
      : cms.title
    : props.title;
  return (
    <PhotoHero
      {...props}
      eyebrow={cms.eyebrow ?? props.eyebrow}
      title={title}
      description={cms.description ?? props.description}
      image={cms.image ?? props.image}
      video={cms.video ?? props.video}
    />
  );
}
