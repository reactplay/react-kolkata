"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { EVENT_STATUS } from "@/types/event";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import { getEventStatus } from "@/lib/calendar-utils";
import AnimatedSection from "@/components/custom/animated-section";
import { events } from "@/base/data/dummy";

import EventCard from "./event-card";
import FeaturedLumaEvent from "./featured-luma";
import LumaEmbed from "./luma-embed";

const isLumaEvent = (id: string) => id.startsWith("evt-");

export default function EventsSection() {
  const t = useTranslations("Events");
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".event-card",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".event-cards-container",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const upcomingEvents = useMemo(() => {
    return events.filter((event) => {
      const status = getEventStatus(event.startDateTime, event.endDateTime);
      return status === EVENT_STATUS.UPCOMING || status === EVENT_STATUS.ONGOING;
    });
  }, []);

  const gridClassName =
    upcomingEvents.length <= 2
      ? "mx-auto w-full max-w-5xl sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <AnimatedSection id="events" className="relative scroll-mt-24">
      <div className="absolute top-1/4 -right-20 -z-10 h-96 w-96 rounded-none bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 -z-10 h-96 w-96 rounded-none bg-sky-500/10 blur-[120px]" />

      <div
        ref={containerRef}
        className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
            {t("upcoming_events")}
          </p>
          <h2 className="font-display mt-4 text-5xl leading-[1.05] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
            Meetups, workshops & <span className="text-sky-400">community events</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            {t("description")}
          </p>
        </div>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <h3 className="text-xs font-bold tracking-[0.3em] text-sky-400 uppercase">
              {t("upcoming_events")}
            </h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {upcomingEvents.length > 0 ? (
            <div className={`event-cards-container grid gap-6 ${gridClassName}`}>
              {upcomingEvents.map((event) =>
                isLumaEvent(event.id) ? (
                  <LumaEmbed key={event.id} eventId={event.id} />
                ) : (
                  <EventCard key={event.id} event={event} />
                )
              )}
            </div>
          ) : (
            <FeaturedLumaEvent />
          )}
        </section>
      </div>
    </AnimatedSection>
  );
}
