import { imageProjection, videoProjection } from "./cms";
import { projection } from "./cms-page";
import { homePageExtras } from "@/content/cms/docs/homePage";

const img = imageProjection("image");
const slug = `"slug": slug.current`;
const faq = `faq[]{q, a}`;
const facts = (f: string) => `${f}[]{value, label}`;
const titled = (f: string) => `${f}[]{title, body}`;

export const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0]{
  _id, badge, title, titleAccent, description, primaryCta{label, href}, primaryNote, secondaryCta{label, href},
  ${facts("facts")}, ${img}, ${videoProjection},
  storyEyebrow, storyHook, storyProblem, storyTurn,
  problems[]{icon, title, body, cost},
  proof[]{value, label, source, href},
  differentEyebrow, differentTitle, differentDescription,
  differentiators[]{icon, title, body},
  portfolioEyebrow, portfolioTitle, portfolioDescription, portfolioNote,
  products[]{_key, name, role, body, status, href, ${img}},
  ${projection(homePageExtras)}
}`;

export const pageHeroQuery = `*[_type == "pageHero" && route == $route][0]{
  _id, route, eyebrow, title, titleAccent, description, ${img}, ${videoProjection}
}`;

export const editionsQuery = `*[_type == "edition"] | order(order asc, _createdAt asc){
  _id, ${slug}, name, badge, tagline, headline, positioning, summary, audience, outcome, fits, buyWhen,
  includes, deploy, priceAnchor, priceSub, aiTier, highlights, modules, featured, comingSoon, gaTarget,
  diagram, architectureId, fitFor, notFor, ${faq}, ${img},
  operatorProfiles[]{audience, proposition, revenueStreams[]{name, body, character}, phases[]{name, timeframe, body}}
}`;

export const modulesQuery = `*[_type == "module"] | order(order asc, _createdAt asc){
  _id, ${slug}, name, group, icon, tagline, description, features, ${img},
  status{label, tone}, summary, ${facts("facts")}, ${titled("capabilities")}, ${titled("howItWorks")}, ${faq}
}`;

export const industriesQuery = `*[_type == "industry"] | order(order asc, _createdAt asc){
  _id, ${slug}, name, icon, title, description, ${img}, edition, outcome, story, architectureId,
  ${facts("kpis")}, why, targets, compliance, regimes[]{name, demands, control}, useCases[]{title, body, modules}, ${faq}
}`;

export const solutionsQuery = `*[_type == "solution"] | order(order asc, _createdAt asc){
  _id, ${slug}, name, icon, summary, description, ${img}, problem, symptoms, features, ${facts("facts")},
  audience, modules, flow, editions, architectureId, story, ${faq}
}`;

export const customerStoriesQuery = `*[_type == "customerStory"] | order(order asc, _createdAt asc){
  _id, ${slug}, org, note, industry, edition, ${img}, headline, summary, challenge, solution, quote,
  person{name, role, initials}, ${facts("metrics")}
}`;

export const teamQuery = `*[_type == "teamMember"] | order(order asc, _createdAt asc){
  _id, name, role, bio, linkedin, ${img}
}`;

export const postsQuery = `*[_type == "post"] | order(date desc){
  _id, title, ${slug}, date, category, badge, body, href, ${img}
}`;

export const collateralQuery = `*[_type == "collateralDoc"] | order(order asc, _createdAt asc){
  _id, title, kind, blurb, "url": file.asset->url, "size": file.asset->size
}`;
