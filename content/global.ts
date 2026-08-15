/** Global infrastructure — regions, compliance, and global-scale stats. */

export interface RegionNode {
  code: string;
  city: string;
  country: string;
  /** [latitude, longitude] for the globe marker */
  coords: [number, number];
  compliance: string[];
  serves: string;
}

export const globalRegions: RegionNode[] = [
  {
    code: "SIN",
    city: "Singapore",
    country: "Singapore",
    coords: [1.35, 103.82],
    compliance: ["SaaS region", "Data residency"],
    serves: "APAC & ASEAN",
  },
  {
    code: "FRA",
    city: "Frankfurt",
    country: "Germany",
    coords: [50.11, 8.68],
    compliance: ["GDPR", "Data residency"],
    serves: "Europe",
  },
  {
    code: "BOM",
    city: "Mumbai",
    country: "India",
    coords: [19.08, 72.88],
    compliance: ["DPDP Act", "In-country residency"],
    serves: "India & South Asia",
  },
  {
    code: "LAX",
    city: "Los Angeles",
    country: "United States",
    coords: [34.05, -118.24],
    compliance: ["SOC 2 (readiness)", "Data residency"],
    serves: "Americas",
  },
];

export const globalStats = [
  { value: "4", label: "Deployment regions" },
  { value: "6", label: "Public clouds + on-prem" },
  { value: "3", label: "Deployment models (SaaS · BYOC · Sovereign)" },
  { value: "In-region", label: "Data residency" },
];

export const globalIntro = {
  eyebrow: "Global infrastructure",
  title: "One platform, operated across the globe",
  description:
    "Run BlueWhale Stack from regions in Singapore, Mumbai, Frankfurt and Los Angeles — as managed SaaS, in your own cloud (BYOC), or fully air-gapped and sovereign. Data stays where it must, with in-region residency built in.",
};
