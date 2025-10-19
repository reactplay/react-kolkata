"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EVENT_STATUS, EVENT_TYPES, EventFilters } from "@/types/event";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";

import { getEventStatus } from "@/lib/calendar-utils";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/custom/animated-section";
import { events } from "@/base/data/dummy";

import CfpCard from "./cfp-card";
import ComingSoonCard from "./coming-soon-card";
import EventCard from "./event-card";
import EventCardCompact from "./event-card-compact";
import EventFiltersComponent from "./event-filters";
import VolunteerCard from "./volunteer-card";

export default function EventsSection() {
  const t = useTranslations("Events");
  const [filters, setFilters] = useState<EventFilters>({
    status: EVENT_STATUS.ALL,
    type: EVENT_TYPES.ALL,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Separate events into upcoming and past
  const { upcomingEvents, pastEvents } = useMemo(() => {
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
  }, []);

  // Filter events based on selected filters with dynamic status calculation
  const filteredUpcomingEvents = useMemo(() => {
    return upcomingEvents.filter((event) => {
      const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);
      const statusMatch = filters.status === EVENT_STATUS.ALL || dynamicStatus === filters.status;
      const typeMatch = filters.type === EVENT_TYPES.ALL || event.type === filters.type;
      return statusMatch && typeMatch;
    });
  }, [upcomingEvents, filters]);

  const filteredPastEvents = useMemo(() => {
    return pastEvents.filter((event) => {
      const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);
      const statusMatch = filters.status === EVENT_STATUS.ALL || dynamicStatus === filters.status;
      const typeMatch = filters.type === EVENT_TYPES.ALL || event.type === filters.type;
      return statusMatch && typeMatch;
    });
  }, [pastEvents, filters]);

  const updateFilter = (key: keyof EventFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ status: EVENT_STATUS.ALL, type: EVENT_TYPES.ALL });
  };

  return (
    <AnimatedSection className="relative">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("title")}
            </h2>
            <p className="text-muted-foreground mt-2">{t("description")}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-border bg-background text-foreground hover:bg-background/10"
            >
              <Filter className="mr-2 h-4 w-4" />
              {t("filter")}
            </Button>
            <Link
              href="/events"
              className="text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
            >
              {t("view_all_events")}
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        {showFilters && (
          <EventFiltersComponent
            filters={filters}
            onUpdateFilter={updateFilter}
            onClearFilters={clearFilters}
            totalEvents={events.length}
            filteredCount={filteredUpcomingEvents.length + filteredPastEvents.length}
          />
        )}

        {/* Upcoming Events Section - Only show when not filtering for past events */}
        {(filters.status === EVENT_STATUS.ALL ||
          filters.status === EVENT_STATUS.UPCOMING ||
          filters.status === EVENT_STATUS.ONGOING) && (
          <section className="space-y-6">
            <h3
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("upcoming_events")}
            </h3>

            {/* Wireframe layout: Large upcoming event card + 2 smaller CFP/Volunteer cards */}
            {filteredUpcomingEvents.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
                {/* Large upcoming event card - takes 2 columns */}
                <div className="lg:col-span-2">
                  {filteredUpcomingEvents.slice(0, 1).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {/* CFP and Volunteer Cards - stacked vertically, matching left card height */}
                <div className="flex flex-col gap-6 lg:h-full">
                  <CfpCard />
                  <VolunteerCard />
                </div>
              </div>
            ) : (
              /* Show only Coming Soon card when no upcoming events */
              <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
                <div className="lg:col-span-2">
                  <ComingSoonCard />
                </div>
              </div>
            )}
          </section>
        )}

        {/* Past Events Section - Only show when not filtering for upcoming events */}
        {(filters.status === EVENT_STATUS.ALL || filters.status === EVENT_STATUS.PAST) &&
          filteredPastEvents.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3
                  className="text-2xl font-semibold tracking-tight"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {t("past_events")}
                </h3>
                <Link
                  href="/events"
                  className="text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
                >
                  {t("view_all_past_events")}
                </Link>
              </div>

              {/* Wireframe layout: Large past event card + 2 smaller compact past event cards stacked */}
              <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
                {/* Large past event card - takes 2 columns */}
                <div className="lg:col-span-2">
                  {filteredPastEvents.slice(0, 1).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {/* Two compact past event cards - stacked vertically, matching left card height */}
                <div className="flex flex-col gap-6 lg:h-full">
                  {filteredPastEvents.slice(1, 3).map((event) => (
                    <EventCardCompact key={event.id} event={event} />
                  ))}
                </div>
              </div>

              {/* Show remaining past events if any (more than 3) */}
              {filteredPastEvents.length > 3 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPastEvents.slice(3).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </section>
          )}

        {/* No events message */}
        {filteredUpcomingEvents.length === 0 && filteredPastEvents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-300">No events found matching your filters.</p>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
