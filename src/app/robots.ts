import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/workspace", "/login", "/signup", "/api/", "/health"] },
    sitemap: `${siteOrigin()}/sitemap.xml`,
  };
}
