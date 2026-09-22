/** Shapes the CMS adds to content — an image or video chosen by an editor. */

export interface CmsImage {
  /** absolute URL on the Sanity CDN (add ?w= for a size) */
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  /** the editor's hotspot, as CSS object-position ("52% 40%") */
  focal?: string;
}

export interface CmsVideo {
  src: string;
}
