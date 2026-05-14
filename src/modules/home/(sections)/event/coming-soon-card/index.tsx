"use client";

import { Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "@/components/ui/card";
import { ArchitecturalCorner } from "@/components/custom/architectural-corner";

export default function ComingSoonCard() {
  const t = useTranslations("Events");

  return (
    <Card className="event-card relative flex flex-1 flex-col gap-0 overflow-hidden rounded-none border border-white/5 bg-[#0B1220]/50 py-0 shadow-none backdrop-blur-md transition-all hover:bg-white/5">
      <ArchitecturalCorner />
      <div className="relative h-44 w-full flex-shrink-0 overflow-hidden bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-80" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4">
            <Clock className="h-12 w-12 text-slate-400" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Calendar className="h-8 w-8 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-white">
            {t("coming_soon")}
          </h3>

          <div className="mt-2 space-y-1 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" aria-hidden />
              <span>More events on the way</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" aria-hidden />
              <span>Stay tuned for updates</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="mt-6">
          <div className="w-full rounded-none border border-white/10 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs font-medium tracking-widest text-white uppercase">
              {t("coming_soon")}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
