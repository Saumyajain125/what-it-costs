import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-06-09"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
