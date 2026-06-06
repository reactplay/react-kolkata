"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarEvent, Event, EVENT_STATUS } from "@/types/event";
import { useTranslations } from "next-intl";
import { LuCalendarDays, LuClock3, LuFileText, LuMapPin } from "react-icons/lu";
import { SiYoutube } from "react-icons/si";

import { getEventStatus } from "@/lib/calendar-utils";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

import CalendarButtons from "../calendar-buttons";
import EventBadges from "../event-badges";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const t = useTranslations("Events");
  const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);
  const [imgSrc, setImgSrc] = useState(event.image ?? "/images/kolkata-hero.jpg");

  const calendarEvent: CalendarEvent = {
    title: event.title,
    description: event.description,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    location: event.location?.address || event.venue,
  };

  return (
    <Card className="event-card group relative h-full gap-0 overflow-hidden rounded-2xl border border-white/5 bg-[#0B1220]/50 py-0 shadow-none backdrop-blur-md transition-all hover:bg-white/5">
      <ArchitecturalCorner />

      <div className="relative h-44 w-full flex-shrink-0 overflow-hidden">
        <Image
          src={imgSrc}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 67vw, 800px"
          className="object-cover transition duration-500 group-hover:scale-105"
          onError={() => setImgSrc("/images/kolkata-hero.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-80" />

        <EventBadges type={event.type} status={dynamicStatus} />
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-white">
          {event.title}
        </h3>
        <div className="mt-2 grid gap-1 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <LuCalendarDays className="h-4 w-4 text-slate-500" aria-hidden />
            <span>{formatEventDate(event.startDateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuClock3 className="h-4 w-4 text-slate-500" aria-hidden />
            <span>{formatEventTime(event.startDateTime, event.endDateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuMapPin className="h-4 w-4 text-slate-500" aria-hidden />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-slate-400">{event.description}</p>

        <div className="mt-auto space-y-2 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {dynamicStatus === EVENT_STATUS.PAST && (event.recordingUrl || event.slidesUrl) ? (
                <>
                  {event.recordingUrl && (
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="border-white/10 hover:bg-white"
                      style={{ backgroundColor: "white" }}
                      title={t("watch_recording")}
                    >
                      <Link href={event.recordingUrl} target="_blank" rel="noreferrer">
                        <SiYoutube className="h-4 w-4 text-[#FF0000]" />
                      </Link>
                    </Button>
                  )}
                  {event.slidesUrl && (
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                      title={t("view_slides")}
                    >
                      <Link href={event.slidesUrl} target="_blank" rel="noreferrer">
                        <LuFileText className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="flex-1 bg-white text-slate-900 hover:bg-slate-200"
                >
                  <Link href={event.registrationUrl} target="_blank" rel="noreferrer">
                    {t("register")}
                  </Link>
                </Button>
              )}
            </div>
            <Link
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2 text-xs text-slate-300 underline-offset-4 hover:text-slate-100 hover:underline"
            >
              {t("details")}
            </Link>
          </div>

          {dynamicStatus !== EVENT_STATUS.PAST && <CalendarButtons event={calendarEvent} />}
        </div>
      </CardContent>
    </Card>
  );
}
