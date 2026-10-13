"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LuBellRing, LuHistory } from "react-icons/lu";

import { LUMA_CALENDAR_URL, LUMA_PAST_EVENTS_URL } from "@/base/constants/event";

export default function NoUpcomingEvents() {
  const t = useTranslations("Events");

  return (
    <div className="event-card mx-auto w-full max-w-5xl border border-white/10 bg-[#0B1220]/60 p-8 text-center backdrop-blur-md sm:p-12">
      <h3 className="font-display mx-auto max-w-2xl text-3xl leading-tight text-balance text-white sm:text-4xl">
        {t("empty_title")}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-400">
        {t("empty_description")}
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={LUMA_CALENDAR_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 sm:w-auto"
        >
          <LuBellRing className="h-4 w-4" aria-hidden />
          {t("notify_cta")}
        </Link>
        <Link
          href={LUMA_PAST_EVENTS_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/10 sm:w-auto"
        >
          <LuHistory className="h-4 w-4" aria-hidden />
          {t("check_all_past_events")}
        </Link>
      </div>
    </div>
  );
}
