/**
 * The registry of every spec-driven document. The Studio compiles its
 * schema from this list, the seed script fills the dataset from it (paired
 * with the fallback content in content/sections/registry.ts), and the
 * Presentation tool derives its page locations from it.
 */
import type { DocSpec, ObjSpec } from "./spec";
import * as shared from "./objects";
import { siteSettingsSpec } from "./docs/siteSettings";
import { capabilityFamilySpec } from "./docs/capabilityFamily";
import { builderMediaSpec, builderPageSpec, builderUserSpec, certificationSpec, docPageSpec, jobOpeningSpec, legalPageSpec, partnerTrackSpec } from "./docs/collections";
import { platformPageSpec } from "./docs/platformPage";
import { pageDocSpecs } from "./docs/pages";

/** One document per page (`_id === name`). */
export const singletonSpecs: DocSpec[] = [siteSettingsSpec, platformPageSpec, ...pageDocSpecs];

/** Many documents per type. */
export const collectionSpecs: DocSpec[] = [capabilityFamilySpec, certificationSpec, jobOpeningSpec, partnerTrackSpec, legalPageSpec, docPageSpec];

/** The website builder's own storage — registered so the Studio knows the types, listed under their own heading. */
export const builderSpecs: DocSpec[] = [builderPageSpec, builderMediaSpec, builderUserSpec];

export const allDocSpecs: DocSpec[] = [...singletonSpecs, ...collectionSpecs, ...builderSpecs];

/** The shared object types — always registered, even when no spec-driven document uses one yet (the hand-written catalog types reference them by name). */
export const sharedObjectSpecs: ObjSpec[] = Object.values(shared) as unknown as ObjSpec[];
