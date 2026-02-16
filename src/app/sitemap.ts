import type { MetadataRoute } from "next";

const siteUrl = "https://performancepeak.com";

const routes = ["/", "/privacy", "/cookies", "/terms"];

const priorityByPath: Record<string, number> = {
  "/": 1.0,
  "/privacy": 0.6,
  "/cookies": 0.6,
  "/terms": 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: priorityByPath[path] ?? 0.5,
  }));
}
