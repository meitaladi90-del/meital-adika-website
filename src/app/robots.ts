import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.meitaladika.co.il";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/workshop/success"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
