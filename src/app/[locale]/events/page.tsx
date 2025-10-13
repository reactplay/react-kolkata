import CfpCard from "@/modules/home/(sections)/event/cfp-card";
import ComingSoonCard from "@/modules/home/(sections)/event/coming-soon-card";
import EventCard from "@/modules/home/(sections)/event/event-card";
import EventCardCompact from "@/modules/home/(sections)/event/event-card-compact";
import VolunteerCard from "@/modules/home/(sections)/event/volunteer-card";
import { EVENT_STATUS } from "@/types/event";
import { useTranslations } from "next-intl";

import { getEventStatus } from "@/lib/calendar-utils";
import AnimatedSection from "@/components/custom/animated-section";
import { events } from "@/base/data/dummy";

export default function EventsPage() {
  const t = useTranslations("Events");

  const { upcomingEvents, pastEvents } = (() => {
    const upcoming: typeof events = [];
    const past: typeof events = [];

    events.forEach((event) => {
      const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);
      if (dynamicStatus === EVENT_STATUS.UPCOMING || dynamicStatus === EVENT_STATUS.ONGOING) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });

    return {
      upcomingEvents: upcoming,
      pastEvents: past,
    };
  })();

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

        {/* Upcoming Events Section */}
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
                <VolunteerCard />
              </div>
            </div>
          ) : (
            /* Show only Coming Soon card when no upcoming events */
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

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <section className="space-y-6">
            <h2
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("past_events")}
            </h2>

            <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
              {/* Large past event card - takes 2 columns */}
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

        {/* No events message */}
        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-300">No events found.</p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
