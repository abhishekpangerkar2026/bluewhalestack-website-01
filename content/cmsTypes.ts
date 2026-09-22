/** Shapes the CMS adds to content — an image or video chosen by an editor. */

/** Where a value lives in the CMS: the document and the field path (for click-to-edit). */
export interface CmsRef {
  id: string;
  type: string;
  path: string;
}

export interface CmsImage {
  /** absolute URL on the Sanity CDN (add ?w= for a size) */
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  /** the editor's hotspot, as CSS object-position ("52% 40%") */
  focal?: string;
  /** the field this image came from — clicking the picture in preview opens it */
  sanity?: CmsRef;
}

export interface CmsVideo {
  src: string;
  sanity?: CmsRef;
}
