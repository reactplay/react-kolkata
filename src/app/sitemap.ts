import { MetadataRoute } from "next";

import { getLocalizedPath, routing } from "@/config/i18n/navigation";

const host = "https://reactkolkata.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/events", "/contributors", "/blog", "/code-of-conduct", "/media-kit"];

  return routes.map((route) => {
    const alternates: { languages: Record<string, string> } = {
      languages: {},
    };

    routing.locales.forEach((locale) => {
      alternates.languages[locale] = `${host}${getLocalizedPath(route, locale)}`;
    });

    return {
      url: `${host}${getLocalizedPath(route, routing.defaultLocale)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
      alternates,
    };
  });
}
