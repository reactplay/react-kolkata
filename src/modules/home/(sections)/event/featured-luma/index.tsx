"use client";

import { useEffect, useState } from "react";
import { getActiveLumaEventId } from "@/queries/featured-event";

import LumaEmbed from "../luma-embed";
import NoUpcomingEvents from "../no-upcoming-events";

export default function FeaturedLumaEvent() {
  const [eventId, setEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getActiveLumaEventId()
      .then((liveId) => {
        if (isMounted) setEventId(liveId);
      })
      .catch(() => {
        if (isMounted) setEventId(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading event"
        className="event-card mx-auto w-full max-w-5xl animate-pulse border border-white/10 bg-white/5 p-8 sm:p-12"
      >
        <div className="mx-auto h-8 max-w-md bg-white/10" />
        <div className="mx-auto mt-4 h-4 max-w-sm bg-white/5" />
      </div>
    );
  }

  if (!eventId) return <NoUpcomingEvents />;

  return (
    <div className="event-cards-container mx-auto grid w-full max-w-5xl gap-6">
      <LumaEmbed eventId={eventId} />
    </div>
  );
}
