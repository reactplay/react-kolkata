import { Metadata } from "next";
import CfpCard from "@/modules/home/(sections)/event/cfp-card";
import ChampionCard from "@/modules/home/(sections)/event/champion-card";
import ComingSoonCard from "@/modules/home/(sections)/event/coming-soon-card";
import EventCard from "@/modules/home/(sections)/event/event-card";
import EventCardCompact from "@/modules/home/(sections)/event/event-card-compact";
import { EVENT_STATUS } from "@/types/event";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { getEventStatus } from "@/lib/calendar-utils";
import AnimatedSection from "@/components/custom/animated-section";
import { events } from "@/base/data/dummy";

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
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/${locale}/events`,
      siteName: "React Kolkata",
      locale: locale,
      type: "website",
      // Optional: can add a specific image
      // images: ['/images/events-og.jpg'],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      // Optional: can add a specific image
      // images: ['/images/events-twitter.jpg'],
    },
  };
}

export default function EventsPage({ searchParams }: { searchParams: { search?: string } }) {
  const t = useTranslations("Events");
  const searchQuery = searchParams?.search?.toLowerCase() || "";

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery) ||
      event.description?.toLowerCase().includes(searchQuery);

    return matchesSearch;
  });

  const upcomingEvents = filteredEvents.filter((event) => {
    const status = getEventStatus(event.startDateTime, event.endDateTime);
    return status === EVENT_STATUS.UPCOMING || status === EVENT_STATUS.ONGOING;
  });

  const pastEvents = filteredEvents.filter((event) => {
    const status = getEventStatus(event.startDateTime, event.endDateTime);
    return status === EVENT_STATUS.PAST;
  });

  return (
    <AnimatedSection className="relative">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h1
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("title")}
            </h1>
            <p className="mt-2 text-slate-300">{t("description")}</p>
          </div>
        </div>

        <section className="space-y-6">
          <h2
            className="text-2xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("upcoming_events")}
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {upcomingEvents.slice(0, 1).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <CfpCard />
                <ChampionCard />
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ComingSoonCard />
              </div>
            </div>
          )}

          {upcomingEvents.length > 1 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.slice(1).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        {pastEvents.length > 0 && (
          <section className="space-y-6">
            <h2
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("past_events")}
            </h2>

            <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2">
                {pastEvents.slice(0, 1).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <div className="flex flex-col gap-6 lg:h-full">
                {pastEvents.slice(1, 3).map((event) => (
                  <EventCardCompact key={event.id} event={event} />
                ))}
              </div>
            </div>

            {pastEvents.length > 3 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.slice(3).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>
        )}

        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <div className="py-12 text-center">
            {searchQuery ? (
              <p className="text-slate-300">
                No results found for "<span className="text-sky-400">{searchQuery}</span>"
              </p>
            ) : (
              <p className="text-slate-300">No events found.</p>
            )}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
