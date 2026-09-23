/**
 * The website builder's block library — every section an editor can drop on
 * a page, in the site's own design. Shared by the editor (client) and the
 * page renderer (server).
 */
import type { Config } from "@puckeditor/core";
import { basicBlocks } from "./blocks/basics";
import { siteBlocks } from "./blocks/site";
import { catalogBlocks } from "./blocks/catalog";
import { bool, text, textarea } from "./fields";

export const config = {
  categories: {
    sections: { title: "Page sections", components: ["Hero", "Heading", "Text", "Cards", "Feature", "Checklist", "Stats", "Steps", "Table", "Quote", "Chips", "Buttons", "Faq", "Closing"], defaultExpanded: true },
    media: { title: "Pictures & video", components: ["Image", "Video", "Embed"] },
    layout: { title: "Layout", components: ["Section", "Columns", "Spacer", "Divider"] },
    special: { title: "BlueWhale specials", components: ["Architecture", "ControlPlane", "ConsoleShowcase", "Ticker", "Prototype", "Global", "Contact", "Newsletter"] },
    catalog: { title: "From the catalog (live data)", components: ["Editions", "Families", "Modules", "Industries", "Solutions", "Stories", "Team", "Jobs", "Certifications", "Collateral", "Newsroom", "Resources"] },
  },
  components: { ...basicBlocks, ...siteBlocks, ...catalogBlocks },
  root: {
    label: "Page",
    fields: {
      title: text("Page title (browser tab and search results)"),
      description: textarea("Search description"),
      noindex: bool("Hide from search engines"),
    },
    defaultProps: { title: "New page", description: "", noindex: false },
    render: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  },
} as Config;

export type BuilderConfig = typeof config;
