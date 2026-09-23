import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { legalSectionsFromCms, termsPage } from "@/content/sections/legalPages";
import { getLegalPage } from "@/lib/content";

/** The CMS "Legal page" row for this route, or the code's copy if it is missing. */
const getContent = async () => (await getLegalPage("terms")) ?? termsPage;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContent();
  return { title: page.seoTitle, description: page.seoDescription };
}

export default async function TermsPage() {
  const page = await getContent();
  return (
    <InnerPage category="legal" current="/legal/terms" document>
      <LegalDoc
        title={page.title}
        intro={page.intro}
        lastUpdated={page.lastUpdated}
        sections={legalSectionsFromCms(page.sections)}
      />
    </InnerPage>
  );
}
