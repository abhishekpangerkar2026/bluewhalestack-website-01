import { objectTypes } from "./objects";
import { homePage, pageHero } from "./pages";
import { documentTypes } from "./catalog";

export const schemaTypes = [...objectTypes, homePage, pageHero, ...documentTypes];
