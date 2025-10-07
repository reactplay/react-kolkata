import Image from "next/image";
import Link from "next/link";
import { CalendarEvent, Event, EVENT_STATUS } from "@/types/event";
import { CalendarDays, Clock3, FileText, MapPin, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";

import { getEventStatus } from "@/lib/calendar-utils";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";
import { Button } from "@/components/ui/button";

import CalendarButtons from "../calendar-buttons";
import EventBadges from "../event-badges";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const t = useTranslations("Events");
  const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);

  const calendarEvent: CalendarEvent = {
    title: event.title,
    description: event.description,
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    location: event.location?.address || event.venue,
  };

  const expired = DATE_UTILS.isEventExpired(event.endDateTime);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 transition hover:translate-y-[-4px] hover:bg-white/10">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={event.image ?? "/images/tech-events-1.jpg"}
          alt={event.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-60" />

        <EventBadges type={event.type} status={dynamicStatus} />
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-lg font-semibold text-sky-200">{event.title}</h3>
        <div className="mt-2 grid gap-1 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-sky-300" aria-hidden />
            <span>{formatEventDate(event.startDateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-sky-300" aria-hidden />
            <span>{formatEventTime(event.startDateTime, event.endDateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-sky-300" aria-hidden />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-slate-300">{event.description}</p>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* For past events with recordings/slides, show icon buttons */}
              {dynamicStatus === EVENT_STATUS.PAST && (event.recordingUrl || event.slidesUrl) ? (
                <>
                  {event.recordingUrl && (
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="hover:bg-white"
                      style={{ backgroundColor: "#white" }}
                      title={t("watch_recording")}
                    >
                      <Link href={event.recordingUrl} target="_blank" rel="noreferrer">
                        <Youtube className="h-4 w-4" color="#FF0000" />
                      </Link>
                    </Button>
                  )}
                  {event.slidesUrl && (
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="border-green-500/20 bg-green-500/10 text-green-300 hover:bg-green-500/20 hover:text-green-200"
                      title={t("view_slides")}
                    >
                      <Link href={event.slidesUrl} target="_blank" rel="noreferrer">
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </>
              ) : (
                /* For upcoming/ongoing events, show register button */
                <Button
                  asChild
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400"
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

          {/* Calendar Integration */}
          <CalendarButtons event={calendarEvent} />
        </div>
      </div>
    </article>
  );
}
