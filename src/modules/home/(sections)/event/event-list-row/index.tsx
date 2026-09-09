"use client";

import Link from "next/link";
import { Event } from "@/types/event";
import { useTranslations } from "next-intl";
import { LuCalendarDays, LuMapPin, LuUsers } from "react-icons/lu";

import { getEventStatus } from "@/lib/calendar-utils";
import { formatEventDate } from "@/lib/date-utils";

import EventBadges from "../event-badges";
import EventMedia from "../event-media";

interface EventListRowProps {
  event: Event;
}

export default function EventListRow({ event }: EventListRowProps) {
  const t = useTranslations("Events");
  const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);

  return (
    <article className="group grid overflow-hidden rounded-none border border-white/10 bg-[#101828] transition-colors hover:border-white/20 hover:shadow-xl hover:shadow-black/30 sm:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="relative h-48 overflow-hidden sm:h-full sm:min-h-56">
        <EventMedia
          src={event.image}
          alt={event.title}
          sizes="(max-width: 640px) 100vw, 280px"
          className="transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/70 via-transparent to-transparent" />
        <EventBadges type={event.type} status={dynamicStatus} />
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase">
          <LuCalendarDays className="h-3.5 w-3.5" aria-hidden />
          {formatEventDate(event.startDateTime)}
        </p>

        <h3 className="mt-2 text-xl leading-snug font-bold text-balance text-white sm:text-2xl">
          <Link
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors group-hover:text-amber-50"
          >
            {event.title}
          </Link>
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-300">
          <LuUsers className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
          React Kolkata
        </p>

        <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-relaxed text-slate-400">
          {event.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          {event.recordingUrl ? (
            <Link
              href={event.recordingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              {t("watch_recording")} →
            </Link>
          ) : (
            <Link
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              {t("details")} →
            </Link>
          )}
          <span className="inline-flex max-w-40 items-center gap-1.5 truncate rounded-none border border-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-slate-300 uppercase sm:max-w-56">
            <LuMapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">{event.venue}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
