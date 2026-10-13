import "server-only";
import type { Metadata } from "next";

export const SITE_TITLE = "LeadFlow | Leads, conversations and follow-ups";
export const SITE_DESCRIPTION = "Keep your leads, discussion history and follow-up dates together. Create a private LeadFlow workspace and make your next step clear.";
export const SOCIAL_IMAGE = { url: "/leadflow-social.png", width: 3584, height: 1880, alt: "LeadFlow landing page in dark mode, showing leads, conversations and follow-ups." };

/** Public URLs are configured at build time; private API configuration stays separate. */
export function siteOrigin(): string {
  const url = new URL(process.env.APP_URL || "http://localhost:3000");
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("APP_URL must be a public HTTP(S) origin without credentials.");
  }
  return url.origin;
}

/** Shared preview metadata; only the landing page opts into search indexing. */
export function siteMetadata(): Metadata {
  return {
    metadataBase: new URL(siteOrigin()), title: SITE_TITLE, description: SITE_DESCRIPTION,
    applicationName: "LeadFlow", robots: { index: false, follow: false },
    openGraph: { type: "website", siteName: "LeadFlow", locale: "en_IN", url: "/", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [SOCIAL_IMAGE] },
    twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [SOCIAL_IMAGE] },
  };
}

/** Describe the shipped product without invented pricing, reviews or ratings. */
export function siteStructuredData() {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebSite", "@id": `${origin}/#website`, name: "LeadFlow", url: `${origin}/`, inLanguage: "en" },
      { "@type": "WebApplication", "@id": `${origin}/#application`, name: "LeadFlow", url: `${origin}/`,
        description: SITE_DESCRIPTION, applicationCategory: "BusinessApplication", operatingSystem: "Web browser",
        image: `${origin}${SOCIAL_IMAGE.url}`, featureList: ["Private lead workspace", "Discussion timeline", "Follow-up scheduling", "Lead search and status filters"] },
    ],
  };
}
