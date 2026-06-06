"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LuCalendar, LuHeart } from "react-icons/lu";

import { Button } from "@/components/ui/button";

import bgImage from "../../../../../../public/images/kolkata_image_1.png";

export default function ChampionCard() {
  const t = useTranslations("Events");

  return (
    <article className="group relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/5 bg-white/5 transition hover:translate-y-[-4px] hover:bg-white/10">
      <div className="relative h-20 w-full flex-shrink-0 overflow-hidden">
        <Image
          src={bgImage}
          alt="Call for Champions"
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent opacity-60" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="text-sm font-bold text-white transition-colors group-hover:text-white">
            {t("call_for_champions")}
          </h3>

          <div className="mt-2 space-y-1 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <LuHeart className="h-3 w-3 text-slate-500" aria-hidden />
              <span>Make a difference</span>
            </div>
            <div className="flex items-center gap-2">
              <LuCalendar className="h-3 w-3 text-slate-500" aria-hidden />
              <span>Help organize events</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3">
          <Button asChild size="sm" className="w-full bg-white text-slate-900 hover:bg-slate-200">
            <Link href="#" target="_blank" rel="noreferrer">
              {t("call_for_champions")}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
