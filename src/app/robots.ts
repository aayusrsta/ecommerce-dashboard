import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/cart",
    },
    sitemap: "https://kinmel.vercel.app/sitemap.xml",
  };
}