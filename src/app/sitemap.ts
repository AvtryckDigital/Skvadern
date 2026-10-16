import type { MetadataRoute } from "next";
import { getSongs } from "@/lib/songs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skvadern.net";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/evenemang`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kalender`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sangbok`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bli-en-skvader`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bilder`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/historia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let songRoutes: MetadataRoute.Sitemap = [];
  try {
    const songs = await getSongs();
    songRoutes = songs.map((song) => ({
      url: `${baseUrl}/sangbok/${song.slug}`,
      lastModified: song.created_at ? new Date(song.created_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    songRoutes = [];
  }

  return [...staticRoutes, ...songRoutes];
}
