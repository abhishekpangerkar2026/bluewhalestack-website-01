import type { Metadata } from "next";
import "../globals.css";
import { fontClass } from "@/lib/fonts";

export const metadata: Metadata = {
  title: { default: "Website builder", template: "%s · Website builder" },
  robots: { index: false, follow: false },
};

/** The builder's own shell — no site header, footer or chat widget. */
export default function BuilderRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClass} data-theme="light" suppressHydrationWarning>
      <body className="min-h-screen bg-[#f4f7fc] font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
