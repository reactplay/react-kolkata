import React from "react";
import { notFound } from "next/navigation";
import { siteConfig } from "@/modules/home/meta/site";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/config/i18n/navigation";
import { inter, poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import AppProvider from "@/components/providers";

import "@/base/styles/globals.css";

export const metadata = siteConfig;

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) notFound();

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
        <NextIntlClientProvider messages={messages}>
          <AppProvider>{children}</AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
