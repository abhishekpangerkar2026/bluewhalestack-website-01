import { objectTypes } from "./objects";
import { homePage, pageHero } from "./pages";
import { documentTypes } from "./catalog";
import { compileDoc, compileObject } from "./fromSpec";
import { allDocSpecs, sharedObjectSpecs } from "../../content/cms/index";
import { homePageExtras } from "../../content/cms/docs/homePage";
import { collectObjects } from "../../content/cms/spec";

/**
 * Object types reachable from any spec-driven document (page documents,
 * collections, the home-page extras) — compiled once each.
 */
const reachable = collectObjects([...allDocSpecs, { name: "homePageExtras", title: "", fields: homePageExtras }]);
const specObjects = [...sharedObjectSpecs, ...reachable.filter((o) => !sharedObjectSpecs.some((s) => s.name === o.name))].map(compileObject);
const specDocs = allDocSpecs.map(compileDoc);

export const schemaTypes = [...objectTypes, ...specObjects, homePage, pageHero, ...documentTypes, ...specDocs];
