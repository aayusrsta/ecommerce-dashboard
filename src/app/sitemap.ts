import { getProducts } from "@/lib/api";
import type { MetadataRoute } from "next";
import { Product } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await getProducts();

  const productUrls = products?.map((p: Product) => ({
    url: `https://ecommerce-dashboard-five-omega.vercel.app/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  })) ?? [];

  return [
    {
      url: "https://ecommerce-dashboard-five-omega.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://ecommerce-dashboard-five-omega.vercel.app/products",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productUrls,
  ];
}