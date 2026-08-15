import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    { url: SITE_URL, lastModified: agora, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/cursos`, lastModified: agora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/teste-de-nivel`, lastModified: agora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/metodologia`, lastModified: agora, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/professores`, lastModified: agora, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/a-escola`, lastModified: agora, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/contato`, lastModified: agora, changeFrequency: "yearly", priority: 0.8 },
  ];
}
