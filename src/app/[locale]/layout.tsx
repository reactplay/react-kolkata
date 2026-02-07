import React from "react";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { siteConfig } from "@/modules/home/meta/site";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/config/i18n/navigation";
import { inter, poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { JumpToTop } from "@/components/custom/jump-to-top";
import AppProvider from "@/components/providers";

import "@/base/styles/globals.css";

export const metadata: Metadata = siteConfig;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "React Kolkata",
  url: "https://reactkolkata.com",
  logo: "https://reactkolkata.com/logo.svg",
  sameAs: [
    "https://x.com/reactkolkata",
    "https://github.com/reactplay/react-kolkata",
    "https://www.linkedin.com/showcase/react-kolkata",
    "https://www.youtube.com/@ReactPlayIO",
  ],
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) notFound();

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
          <AppProvider>
            {children}
            <JumpToTop />
          </AppProvider>
        </NextIntlClientProvider>

        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}

        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
