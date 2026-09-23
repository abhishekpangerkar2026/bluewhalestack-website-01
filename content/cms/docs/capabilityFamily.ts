import { defineDoc, f, type InferDoc } from "../spec";

/** The nine capability families — name, blurb, icon and the optional tile picture. */
export const capabilityFamilySpec = defineDoc(
  "capabilityFamily",
  "Capability family",
  {
    key: f.str("Family key (code)", { description: "management · whalenomics · security · governance · ai · migration · observability · tenancy · sovereign — matched by the module catalog, do not change" }),
    name: f.str("Family name"),
    blurb: f.text("One-line description"),
    icon: f.str("Icon (lucide name)"),
    tile: f.image("Tile picture (replaces the built-in illustration)"),
  },
  {
    keyField: "key",
    locations: [
      { title: "Platform overview", href: "/platform" },
      { title: "Modules", href: "/modules" },
      { title: "Home page", href: "/" },
    ],
  },
);
capabilityFamilySpec.preview = { title: "name", subtitle: "key", media: "tile" };

export type CapabilityFamily = InferDoc<typeof capabilityFamilySpec>;
