"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { EVENT_STATUS } from "@/types/event";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale, useTranslations } from "next-intl";

import { getEventStatus } from "@/lib/calendar-utils";
import AnimatedSection from "@/components/custom/animated-section";
import { events } from "@/base/data/dummy";

import ComingSoonCard from "./coming-soon-card";
import EventCard from "./event-card";
import LumaEmbed from "./luma-embed";

export default function EventsSection() {
  const locale = useLocale();
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
      const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);
      return dynamicStatus === EVENT_STATUS.UPCOMING || dynamicStatus === EVENT_STATUS.ONGOING;
    });
  }, []);

  return (
    <AnimatedSection className="relative">
      <div className="absolute top-1/4 -right-20 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 -z-10 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />

      <div
        ref={containerRef}
        className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="mb-8 text-5xl leading-[1.1] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-slate-400 sm:text-xl">
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
            <div
              className={`event-cards-container grid gap-6 ${
                upcomingEvents.length === 1
                  ? "mx-auto w-full max-w-5xl"
                  : upcomingEvents.length === 2
                    ? "mx-auto w-full max-w-5xl sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {upcomingEvents.map((event) =>
                event.id.startsWith("evt-") ? (
                  <LumaEmbed key={event.id} eventId={event.id} />
                ) : (
                  <EventCard key={event.id} event={event} />
                )
              )}
            </div>
          ) : (
            <div className="event-cards-container mx-auto grid w-full max-w-5xl gap-6">
              <ComingSoonCard />
            </div>
          )}
        </section>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/events`}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
          >
            {t("view_all_past_events")}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
