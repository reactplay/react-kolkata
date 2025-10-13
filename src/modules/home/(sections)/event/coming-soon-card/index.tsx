"use client";

import { Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ComingSoonCard() {
  const t = useTranslations("Events");

  return (
    <article className="group relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/5 bg-white/5 transition hover:translate-y-[-4px] hover:bg-white/10">
      <div className="relative h-44 w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-sky-600/20 to-blue-600/20">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-60" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4">
            <Clock className="h-12 w-12 text-sky-400" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Calendar className="h-8 w-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="text-sm font-semibold text-sky-200">{t("coming_soon")}</h3>

          <div className="mt-2 space-y-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-sky-300" aria-hidden />
              <span>More events on the way</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-sky-300" aria-hidden />
              <span>Stay tuned for updates</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="mt-3">
          <div className="w-full rounded-md bg-gradient-to-r from-sky-600/20 to-blue-600/20 px-3 py-2 text-center">
            <span className="text-xs font-medium text-sky-300">{t("coming_soon")}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
