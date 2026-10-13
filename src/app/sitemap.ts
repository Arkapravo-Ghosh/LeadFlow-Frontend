import type { MetadataRoute } from "next";
import { siteOrigin, SOCIAL_IMAGE } from "@/lib/site-metadata";

/** Only the public landing page is intended for search results. */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return [{ url: `${origin}/`, images: [`${origin}${SOCIAL_IMAGE.url}`] }];
}
