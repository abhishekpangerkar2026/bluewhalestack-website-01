import { InnerPage } from "@/components/layout/InnerPage";
import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { legalSectionsFromCms, privacyPage } from "@/content/sections/legalPages";
import { getLegalPage } from "@/lib/content";

/** The CMS "Legal page" row for this route, or the code's copy if it is missing. */
const getContent = async () => (await getLegalPage("privacy")) ?? privacyPage;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContent();
  return { title: page.seoTitle, description: page.seoDescription };
}

export default async function PrivacyPage() {
  const page = await getContent();
  return (
    <InnerPage category="legal" current="/legal/privacy" document>
      <LegalDoc
        title={page.title}
        intro={page.intro}
        lastUpdated={page.lastUpdated}
        sections={legalSectionsFromCms(page.sections)}
      />
    </InnerPage>
  );
}
