import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bn", "hi", "es"],

  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

type Locale = (typeof routing.locales)[number];

export function getLocalizedPath(route: string, locale: string): string {
  const normalizedRoute = route === "" ? "" : route.startsWith("/") ? route : `/${route}`;
  if ((locale as Locale) === routing.defaultLocale) {
    return normalizedRoute === "" ? "/" : normalizedRoute;
  }
  return `/${locale}${normalizedRoute}`;
}
