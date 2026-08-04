import type { MetadataRoute } from "next";
import { listarPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const paginas: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: agora, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/cursos`, lastModified: agora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/teste-de-nivel`, lastModified: agora, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/metodologia`, lastModified: agora, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/professores`, lastModified: agora, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/a-escola`, lastModified: agora, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/contato`, lastModified: agora, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: agora, changeFrequency: "weekly", priority: 0.6 },
  ];

  const posts: MetadataRoute.Sitemap = listarPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...paginas, ...posts];
}
