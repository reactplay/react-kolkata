import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/config/i18n/navigation";
import { inter, poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/meta/site";

import "@/base/styles/globals.css";

import AppProvider from "./providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: siteConfig.icons,
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();
  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-[#0B1220] text-slate-100 antialiased",
          inter.variable,
          poppins.variable
        )}
      >
        <AppProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
