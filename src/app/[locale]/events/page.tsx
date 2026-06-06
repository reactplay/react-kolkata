import { Metadata } from "next";
import Script from "next/script";
import { getTranslations } from "next-intl/server";

import { events } from "@/base/data/dummy";

import EventsPageClient from "./events-page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });

  const pageTitle = t("title");
  const pageDescription = t("description");

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `/${locale}/events`,
      languages: {
        en: "/en/events",
        bn: "/bn/events",
        hi: "/hi/events",
        es: "/es/events",
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/${locale}/events`,
      siteName: "React Kolkata",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default function EventsPage() {
  // Generate Event Schema dynamically
  const eventSchemas = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDateTime,
    endDate: event.endDateTime,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
    },
    image: [event.image],
    organizer: {
      "@type": "Organization",
      name: "React Kolkata",
      url: "https://reactkolkata.com",
    },
  }));

  return (
    <>
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchemas) }}
      />
      <EventsPageClient events={events} />
    </>
  );
}
