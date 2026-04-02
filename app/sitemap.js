import { ciudades } from "./ciudades/ciudades";

export default function sitemap() {
  const ciudadesUrls = ciudades.map(c => ({
    url: `https://goflatt.vercel.app/ciudad/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://goflatt.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://goflatt.vercel.app/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...ciudadesUrls,
  ];
}