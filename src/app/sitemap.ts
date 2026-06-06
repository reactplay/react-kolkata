import { MetadataRoute } from "next";

import { routing } from "@/config/i18n/navigation";

const host = "https://reactkolkata.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/events", "/contributors", "/blog"];

  return routes.map((route) => {
    const alternates: { languages: Record<string, string> } = {
      languages: {},
    };

    // Generate alternates for all supported locales
    routing.locales.forEach((locale) => {
      alternates.languages[locale] = `${host}/${locale}${route}`;
    });

    return {
      // We use the default locale for the primary URL of the sitemap entry
      url: `${host}/${routing.defaultLocale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
      alternates,
    };
  });
}
