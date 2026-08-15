/** Careers content. */

export const perks = [
  { icon: "Wallet", title: "Competitive pay", body: "Market-leading salaries, performance bonuses and meaningful equity." },
  { icon: "Cloud", title: "Remote-friendly", body: "Work from our India or UAE offices, or remote-first where you're most productive." },
  { icon: "GraduationCap", title: "Learning budget", body: "Annual budget for courses, certifications and conferences." },
  { icon: "HeartPulse", title: "Health & wellness", body: "Comprehensive medical cover for you and your family." },
  { icon: "Sparkles", title: "Generous PTO", body: "30 days paid time off plus regional public holidays." },
  { icon: "Users", title: "Parental leave", body: "26 weeks fully paid for primary caregivers." },
  { icon: "HardDrive", title: "Top equipment", body: "A high-spec laptop and a home-office setup allowance." },
  { icon: "Landmark", title: "Global mobility", body: "Opportunities to work across our international offices." },
];

export interface Job {
  title: string;
  department: string;
  location: string;
  type: string;
  remote: string;
}

export const departments = [
  "Engineering",
  "Product",
  "Sales",
  "Marketing",
  "Customer Success",
  "Operations",
];

export const jobs: Job[] = [
  { title: "Senior Backend Engineer (Platform)", department: "Engineering", location: "Mumbai, India", type: "Full-time", remote: "Hybrid" },
  { title: "Frontend Engineer (React/Next.js)", department: "Engineering", location: "Remote", type: "Full-time", remote: "Remote" },
  { title: "DevOps / SRE Engineer", department: "Engineering", location: "Mumbai, India", type: "Full-time", remote: "Hybrid" },
  { title: "Cloud Security Engineer", department: "Engineering", location: "Remote", type: "Full-time", remote: "Remote" },
  { title: "Product Manager (FinOps)", department: "Product", location: "Mumbai, India", type: "Full-time", remote: "Hybrid" },
  { title: "Enterprise Account Executive — Middle East", department: "Sales", location: "Ajman, UAE", type: "Full-time", remote: "Onsite" },
  { title: "Solutions Architect (Pre-sales)", department: "Sales", location: "Remote", type: "Full-time", remote: "Remote" },
  { title: "Product Marketing Manager", department: "Marketing", location: "Mumbai, India", type: "Full-time", remote: "Hybrid" },
  { title: "Customer Success Manager", department: "Customer Success", location: "Remote", type: "Full-time", remote: "Remote" },
  { title: "Partner Operations Lead", department: "Operations", location: "Ajman, UAE", type: "Full-time", remote: "Onsite" },
];
