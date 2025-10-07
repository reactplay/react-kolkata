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

import EventCard from "./event-card";
import EventFiltersComponent from "./event-filters";

export default function EventsSection() {
  const t = useTranslations("Events");
  const [filters, setFilters] = useState<EventFilters>({
    status: EVENT_STATUS.ALL,
    type: EVENT_TYPES.ALL,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter events based on selected filters with dynamic status calculation
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);
      const statusMatch = filters.status === EVENT_STATUS.ALL || dynamicStatus === filters.status;
      const typeMatch = filters.type === EVENT_TYPES.ALL || event.type === filters.type;
      return statusMatch && typeMatch;
    });
  }, [filters]);

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
            <p className="mt-2 text-slate-300">{t("description")}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            >
              <Filter className="mr-2 h-4 w-4" />
              {t("filter")}
            </Button>
            <Link
              href="https://luma.com/reactkolkata"
              className="text-sm text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("view_all")}
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
            filteredCount={filteredEvents.length}
          />
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
