import type { Metadata } from "next";
import { LandingPage } from "@/features/marketing/components/landing-page";
import { SITE_TITLE, SITE_DESCRIPTION, siteStructuredData } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: SITE_TITLE, description: SITE_DESCRIPTION, alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData()).replace(/</g, "\\u003c") }} /><LandingPage /></>;
}
