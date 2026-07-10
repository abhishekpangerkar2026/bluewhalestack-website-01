import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { company, offices } from "@/content/company";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-src",
  display: "swap",
});

/** Apply the saved theme before first paint to avoid a flash. */
const themeInit = `(function(){try{var t=localStorage.getItem('bws-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bluewhalestack.com"),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s · ${company.name}`,
  },
  description: company.metaDescription,
  applicationName: company.name,
  keywords: [
    "cloud management platform",
    "CMP",
    "multi-cloud governance",
    "FinOps",
    "cloud cost optimization",
    "cloud migration",
    "CSPM",
    "cloud security & compliance",
    "DCIM",
    "sovereign cloud",
    "hybrid cloud",
    "AWS Azure GCP management",
    "BlueWhale Stack",
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: `${company.name} — ${company.tagline}`,
    description: company.metaDescription,
    siteName: company.name,
    url: "https://www.bluewhalestack.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.tagline}`,
    description: company.metaDescription,
    site: "@bluewhalestack",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: "https://www.bluewhalestack.com",
  description: company.metaDescription,
  sameAs: [company.social.linkedin, company.social.twitter],
  email: company.emails.contact,
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    name: o.label,
    streetAddress: o.address,
    addressLocality: o.city,
  })),
  contactPoint: company.phones.map((p) => ({
    "@type": "ContactPoint",
    telephone: p.number,
    contactType: "sales",
    areaServed: p.region,
    availableLanguage: ["en"],
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.name,
  url: "https://www.bluewhalestack.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
