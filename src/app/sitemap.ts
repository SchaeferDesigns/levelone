import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/training/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/kurse/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/wellness/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/mitgliedschaft/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/mitglied-werden/", priority: 1, changeFrequency: "monthly" },
  { path: "/studio/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/probetraining/", priority: 1, changeFrequency: "monthly" },
  { path: "/kontakt/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/impressum/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/datenschutz/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/agb/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/widerruf/", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
