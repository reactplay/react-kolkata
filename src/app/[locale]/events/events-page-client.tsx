"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EventCard from "@/modules/home/(sections)/event/event-card";
import EventListRow from "@/modules/home/(sections)/event/event-list-row";
import LumaEmbed from "@/modules/home/(sections)/event/luma-embed";
import { Event, EVENT_STATUS } from "@/types/event";
import { useTranslations } from "next-intl";
import { LuArrowUpRight, LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { getEventStatus } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

interface EventsPageClientProps {
  events: Event[];
}

const WHATSAPP_URL = "https://chat.whatsapp.com/JmCp4Za9ap0DpER0Gd4hAs";
const LUMA_URL = "https://lu.ma/reactkolkata";
const PAGE_SIZE = 6;

function isLive(event: Event): boolean {
  const status = getEventStatus(event.startDateTime, event.endDateTime);
  return status === EVENT_STATUS.UPCOMING || status === EVENT_STATUS.ONGOING;
}

function renderEventCard(event: Event) {
  return event.id.startsWith("evt-") ? (
    <LumaEmbed key={event.id} eventId={event.id} />
  ) : (
    <EventCard key={event.id} event={event} />
  );
}

function getVisiblePages(page: number, totalPages: number): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const window = [page - 1, page, page + 1].filter((p) => p > 1 && p < totalPages);
  return [1, ...window, totalPages];
}

interface PaginationProps {
  page: number;
  totalPages: number;
  sectionId: string;
  onChange: (page: number) => void;
  prevLabel: string;
  nextLabel: string;
  pageLabel: (page: number) => string;
}

function Pagination({
  page,
  totalPages,
  sectionId,
  onChange,
  prevLabel,
  nextLabel,
  pageLabel,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const goTo = (next: number) => {
    onChange(next);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buttonClassName =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-none border border-white/10 px-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-slate-300";

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label={prevLabel}
        className={buttonClassName}
      >
        <LuChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      {getVisiblePages(page, totalPages).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => goTo(p)}
          aria-label={pageLabel(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            buttonClassName,
            p === page &&
              "border-white bg-white font-semibold text-slate-900 hover:bg-slate-200 hover:text-slate-900"
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label={nextLabel}
        className={buttonClassName}
      >
        <LuChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </nav>
  );
}

export default function EventsPageClient({ events }: EventsPageClientProps) {
  const t = useTranslations("Events");
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  const upcomingEvents = useMemo(
    () =>
      events.filter(isLive).sort((a, b) => +new Date(a.startDateTime) - +new Date(b.startDateTime)),
    [events]
  );
  const pastEvents = useMemo(
    () =>
      events
        .filter((event) => !isLive(event))
        .sort((a, b) => +new Date(b.startDateTime) - +new Date(a.startDateTime)),
    [events]
  );

  const upcomingTotalPages = Math.max(1, Math.ceil(upcomingEvents.length / PAGE_SIZE));
  const pastTotalPages = Math.max(1, Math.ceil(pastEvents.length / PAGE_SIZE));
  const visibleUpcoming = upcomingEvents.slice(
    (upcomingPage - 1) * PAGE_SIZE,
    upcomingPage * PAGE_SIZE
  );
  const visiblePast = pastEvents.slice((pastPage - 1) * PAGE_SIZE, pastPage * PAGE_SIZE);

  return (
    <main className="min-h-screen bg-[#0B1220] pb-24">
      <section className="relative overflow-hidden pt-36 sm:pt-44">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-none bg-sky-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-slate-300 uppercase">
            <span
              className={`h-1.5 w-1.5 rounded-none ${upcomingEvents.length > 0 ? "animate-pulse bg-emerald-400" : "bg-slate-500"}`}
            />
            {t("page_eyebrow")} ·{" "}
            {upcomingEvents.length > 0 ? t("registrations_open") : t("registrations_closed")}
          </p>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
            {t("page_title")}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
            {t("page_subtitle")}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-none bg-white px-7 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200"
            >
              {t("join_community")}
              <LuArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={LUMA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-none border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("follow_luma")}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {upcomingEvents.length > 0 && (
          <section
            id="upcoming-events"
            className="mt-20 scroll-mt-24 space-y-8"
            aria-labelledby="upcoming-heading"
          >
            <div className="flex items-center gap-4">
              <h2
                id="upcoming-heading"
                className="shrink-0 text-xs font-bold tracking-[0.3em] text-sky-400 uppercase"
              >
                {t("upcoming_events")} · {upcomingEvents.length}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleUpcoming.map(renderEventCard)}
            </div>
            <Pagination
              page={Math.min(upcomingPage, upcomingTotalPages)}
              totalPages={upcomingTotalPages}
              sectionId="upcoming-events"
              onChange={setUpcomingPage}
              prevLabel={t("pagination_prev")}
              nextLabel={t("pagination_next")}
              pageLabel={(pageNumber) => t("pagination_page", { page: pageNumber })}
            />
          </section>
        )}

        {pastEvents.length > 0 && (
          <section
            id="past-events"
            className="mt-20 scroll-mt-24 space-y-8"
            aria-labelledby="past-heading"
          >
            <div className="flex items-center gap-4">
              <h2
                id="past-heading"
                className="shrink-0 text-xs font-bold tracking-[0.3em] text-slate-500 uppercase"
              >
                {t("past_events")} · {pastEvents.length}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="flex flex-col gap-5">
              {visiblePast.map((event) => (
                <EventListRow key={event.id} event={event} />
              ))}
            </div>
            <Pagination
              page={Math.min(pastPage, pastTotalPages)}
              totalPages={pastTotalPages}
              sectionId="past-events"
              onChange={setPastPage}
              prevLabel={t("pagination_prev")}
              nextLabel={t("pagination_next")}
              pageLabel={(pageNumber) => t("pagination_page", { page: pageNumber })}
            />
          </section>
        )}

        {events.length === 0 && (
          <div className="mt-20 rounded-none border border-white/10 bg-white/[0.02] px-6 py-20 text-center">
            <p className="text-xl font-medium text-slate-300">{t("no_events_title")}</p>
            <p className="mt-2 text-sm text-slate-500">{t("page_subtitle")}</p>
          </div>
        )}
      </div>
    </main>
  );
}
