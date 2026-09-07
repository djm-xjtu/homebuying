import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    "",
    "/calculator",
    "/checklist",
    "/documents",
    "/guides",
    "/broker-introduction",
    "/valuation-report",
    "/about",
    "/privacy",
    ...Object.keys(GUIDES).map(s => `/guides/${s}`),
  ].map(url => ({
    url: base + url,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: url === "" ? 1 : 0.7,
  }));
}
