import React from "react";
import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { siteConfig } from "@/modules/home/meta/site";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/config/i18n/navigation";
import { GeistMono, GeistSans } from "@/lib/fonts";
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
  alternateName: "ReactJS Kolkata",
  url: "https://reactkolkata.com",
  logo: "https://reactkolkata.com/images/React_Kolkata_Logo.svg",
  description:
    "A modern hub for React developers in Kolkata. Join our meetups, talks, and workshops to grow your skills and network with the community.",
  email: "reactkolkata@gmail.com",
  sameAs: [
    "https://x.com/reactkolkata",
    "https://github.com/reactplay/react-kolkata",
    "https://www.linkedin.com/showcase/react-kolkata",
    "https://www.youtube.com/@ReactPlayIO",
    "https://www.instagram.com/reactkolkata",
  ],
  location: {
    "@type": "Place",
    name: "Kolkata, West Bengal",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "reactkolkata@gmail.com",
    contactType: "Community Support",
  },
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
          GeistSans.variable,
          GeistMono.variable
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
        <Script
          src="https://t.raah.dev/script.js"
          data-pid="proj_o9zywklqce9tgqrm"
          data-domain="reactkolkata.com"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
