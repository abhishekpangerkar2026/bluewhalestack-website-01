/**
 * The page documents' fallback content, paired with their specs — what the
 * seed script loads (mirrors content/cms/docs/pages.ts).
 */
import type { SingletonEntry } from "./registry";
import { productsPageSpec } from "@/content/cms/docs/productsPage";
import { editionsPageSpec } from "@/content/cms/docs/editionsPage";
import { modulesPageSpec } from "@/content/cms/docs/modulesPage";
import { whaleAiPageSpec } from "@/content/cms/docs/whaleAiPage";
import { whaleForgePageSpec } from "@/content/cms/docs/whaleForgePage";
import { fabricPageSpec } from "@/content/cms/docs/fabricPage";
import { pricingPageSpec } from "@/content/cms/docs/pricingPage";
import { solutionsPageSpec } from "@/content/cms/docs/solutionsPage";
import { industriesPageSpec } from "@/content/cms/docs/industriesPage";
import { customersPageSpec } from "@/content/cms/docs/customersPage";
import { caseStudiesPageSpec } from "@/content/cms/docs/caseStudiesPage";
import { resourcesPageSpec } from "@/content/cms/docs/resourcesPage";
import { docsPageSpec } from "@/content/cms/docs/docsPage";
import { trustPageSpec } from "@/content/cms/docs/trustPage";
import { aboutPageSpec } from "@/content/cms/docs/aboutPage";
import { leadershipPageSpec } from "@/content/cms/docs/leadershipPage";
import { partnersPageSpec } from "@/content/cms/docs/partnersPage";
import { careersPageSpec } from "@/content/cms/docs/careersPage";
import { newsroomPageSpec } from "@/content/cms/docs/newsroomPage";
import { contactPageSpec } from "@/content/cms/docs/contactPage";
import { productsPage } from "./productsPage";
import { editionsPage } from "./editionsPage";
import { modulesPage } from "./modulesPage";
import { whaleAiPage } from "./whaleAiPage";
import { whaleForgePage } from "./whaleForgePage";
import { fabricPage } from "./fabricPage";
import { pricingPage } from "./pricingPage";
import { solutionsPage } from "./solutionsPage";
import { industriesPage } from "./industriesPage";
import { customersPage } from "./customersPage";
import { caseStudiesPage } from "./caseStudiesPage";
import { resourcesPage } from "./resourcesPage";
import { docsPage } from "./docsPage";
import { trustPage } from "./trustPage";
import { aboutPage } from "./aboutPage";
import { leadershipPage } from "./leadershipPage";
import { partnersPage } from "./partnersPage";
import { careersPage } from "./careersPage";
import { newsroomPage } from "./newsroomPage";
import { contactPage } from "./contactPage";

export const pageContent: SingletonEntry[] = [
  { spec: productsPageSpec, content: productsPage },
  { spec: editionsPageSpec, content: editionsPage },
  { spec: modulesPageSpec, content: modulesPage },
  { spec: whaleAiPageSpec, content: whaleAiPage },
  { spec: whaleForgePageSpec, content: whaleForgePage },
  { spec: fabricPageSpec, content: fabricPage },
  { spec: pricingPageSpec, content: pricingPage },
  { spec: solutionsPageSpec, content: solutionsPage },
  { spec: industriesPageSpec, content: industriesPage },
  { spec: customersPageSpec, content: customersPage },
  { spec: caseStudiesPageSpec, content: caseStudiesPage },
  { spec: resourcesPageSpec, content: resourcesPage },
  { spec: docsPageSpec, content: docsPage },
  { spec: trustPageSpec, content: trustPage },
  { spec: aboutPageSpec, content: aboutPage },
  { spec: leadershipPageSpec, content: leadershipPage },
  { spec: partnersPageSpec, content: partnersPage },
  { spec: careersPageSpec, content: careersPage },
  { spec: newsroomPageSpec, content: newsroomPage },
  { spec: contactPageSpec, content: contactPage },
];
