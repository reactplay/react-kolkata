"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types/event";
import { CalendarDays, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { getEventStatus } from "@/lib/calendar-utils";
import { formatEventDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

import EventBadges from "../event-badges";

interface EventCardCompactProps {
  event: Event;
  className?: string;
}

export default function EventCardCompact({ event, className }: EventCardCompactProps) {
  const t = useTranslations("Events");
  const dynamicStatus = getEventStatus(event.startDateTime, event.endDateTime);
  const [imgSrc, setImgSrc] = useState(event.image ?? "/images/kolkata-hero.jpg");

  return (
    <Link
      href={event.registrationUrl}
      target="_blank"
      rel="noreferrer"
      className={cn("h-full", className)}
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-white/5 transition hover:translate-y-[-4px] hover:bg-white/10">
        <ArchitecturalCorner />
        <div className="relative h-24 w-full flex-shrink-0 overflow-hidden">
          <Image
            src={imgSrc}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImgSrc("/images/kolkata-hero.jpg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-60" />

          <EventBadges type={event.type} status={dynamicStatus} />
        </div>

        <div className="flex flex-1 flex-col justify-between p-3">
          <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white transition-colors group-hover:text-white">
            {event.title}
          </h3>

          <div className="mt-2 flex items-end justify-between gap-3">
            <div className="grid flex-1 gap-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3 flex-shrink-0 text-slate-500" aria-hidden />
                <span className="truncate">{formatEventDate(event.startDateTime)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 flex-shrink-0 text-slate-500" aria-hidden />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            <span className="text-xs whitespace-nowrap text-white hover:text-slate-300">
              {t("details")} →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
