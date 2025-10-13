"use client";

import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types/event";
import { CalendarDays, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { getEventStatus } from "@/lib/calendar-utils";
import { formatEventDate } from "@/lib/date-utils";

import EventBadges from "../event-badges";

interface EventCardCompactProps {
  event: Event;
}

export default function EventCardCompact({ event }: EventCardCompactProps) {
  const t = useTranslations("Events");
  const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);

  return (
    <Link href={event.registrationUrl} target="_blank" rel="noreferrer" className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-white/5 transition hover:translate-y-[-4px] hover:bg-white/10">
        <div className="relative h-24 w-full flex-shrink-0 overflow-hidden">
          <Image
            src={event.image ?? "/images/tech-events-1.jpg"}
            alt={event.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-60" />

          <EventBadges type={event.type} status={dynamicStatus} />
        </div>

        <div className="flex flex-1 flex-col justify-between p-3">
          <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-sky-200">
            {event.title}
          </h3>

          <div className="mt-2 flex items-end justify-between gap-3">
            <div className="grid flex-1 gap-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3 flex-shrink-0 text-sky-300" aria-hidden />
                <span className="truncate">{formatEventDate(event.startDateTime)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 flex-shrink-0 text-sky-300" aria-hidden />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            <span className="text-xs whitespace-nowrap text-sky-300 hover:text-sky-200">
              {t("details")} →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
