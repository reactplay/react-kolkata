import { getRequestConfig } from "next-intl/server";

import { routing } from "./navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale; // Fallback to default locale
  }

  const messages = (await import(`./content/${locale}.json`)).default;

  return {
    locale, // Return the validated locale
    messages,
  };
});
